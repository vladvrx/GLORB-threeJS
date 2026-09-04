import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const output='test-results-runner-mission';
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
const read=()=>page.evaluate(()=>{
  const a=window.__THREE_JS_GAME__.app,r=a.__runner.run;
  return {phase:r.phase,distance:r.distance,coins:r.coins,missionComplete:r.missionComplete,lane:r.lane,lanePosition:r.lanePosition,
    jump:r.jump,slide:r.slide,speed:r.speed,elapsed:r.elapsed,reason:r.reason,
    objects:r.objects.map(o=>({...o})),survivalElapsed:a.__survival.run.elapsed};
});

try {
  await page.goto(process.env.GLORB_URL||'http://127.0.0.1:43220/three-js');
  await expect(page.locator('#preloader')).toBeHidden({timeout:90000});
  // The original dialogue has its own public-flow test. Establish only the hub;
  // Everything from shrine selection through the 50-coin milestone and continued
  // running uses public inputs. No coin, distance, timing or phase injection.
  await page.evaluate(async()=>{
    const a=window.__THREE_JS_GAME__.app;
    await a.$webgl.scenes.teleportTo('IslandWest',{noAnimation:true,noAnimations:true,point:'Spawn'});
    await a.$router.replace({name:'Home'});
    const s=a.$webgl.scenes.current;s.isEntered=true;s.setState('Playing');
    Object.assign(a.$store,{isTransitionActive:false,isCinematicActive:false,isDialogVisible:false});
  });
  await expect(page.getByRole('button',{name:'02 / Temple Dash',exact:true})).toBeVisible({timeout:60000});
  await page.getByRole('button',{name:'02 / Temple Dash',exact:true}).click();
  await expect(page.getByRole('button',{name:'Start running',exact:true})).toHaveCount(0);
  await expect.poll(async()=>(await read()).phase,{timeout:10000}).toBe('running');
  const initial=await read(),rows=new Map(),actions={laneChanges:0,jumps:0,slides:0};
  assert.ok(initial.speed<14,'mission starts at the introductory pace');
  const progress=page.getByRole('progressbar',{name:'Mission coins'});
  await expect(progress).toHaveAttribute('aria-valuemax','50');

  let currentRow=null,nearGoalCaptured=false,milestone=null;
  const acted=new Set(),deadline=Date.now()+120000;
  while(Date.now()<deadline) {
    const r=await read();
    assert.equal(r.phase,'running',`Mission driver failed: ${JSON.stringify(r)}`);
    if(r.missionComplete&&!milestone) {
      milestone={coins:r.coins,distance:r.distance,elapsed:r.elapsed};
      assert.ok(r.coins>=50,'mission completes only after earning 50 coins');
      await expect(page.locator('.runner-milestone')).toBeVisible();
      await expect(page.locator('.runner-milestone')).toHaveText('Mission complete! Keep going!');
      await expect(page.locator('.runner-modal')).toBeHidden();
      await expect(page.getByRole('button',{name:'Run again',exact:true})).toHaveCount(0);
      await expect(progress).toHaveAttribute('aria-valuenow','50');
      await page.screenshot({path:`${output}/mission-milestone.png`});
    }
    if(r.coins>=54)break;
    for(const o of r.objects) {
      if(o.kind==='coin')continue;
      let row=rows.get(o.row);
      if(!row){row={at:o.at,hazards:new Map()};rows.set(o.row,row);}
      row.hazards.set(o.id,{kind:o.kind,lane:o.lane});
    }
    // Hold each coin line through its own obstacle row. Switching immediately
    // after its fourth coin would steer into the row we have not yet passed.
    if(currentRow===null||r.distance>rows.get(currentRow).at+1.35) {
      const next=r.objects.find(o=>o.kind==='coin'&&!o.done&&o.at>r.distance-1);
      if(next)currentRow=next.row;
    }
    const line=r.objects.find(o=>o.kind==='coin'&&o.row===currentRow);
    if(line) {
      const target=line.lane;
      if(r.lane!==target) {
        await page.keyboard.press(r.lane>target?'ArrowLeft':'ArrowRight');
        actions.laneChanges++;
      }
      const blocking=r.objects.filter(o=>o.kind!=='coin'&&!o.done&&o.row===currentRow&&o.lane===target);
      for(const hazard of blocking) {
        const ahead=hazard.at-r.distance;
        if(acted.has(hazard.id)||ahead<-.9||r.jump>0||r.slide>0)continue;
        if(hazard.kind==='jump'&&ahead<r.speed*.38) {
          await page.keyboard.press('Space');acted.add(hazard.id);actions.jumps++;
        } else if(hazard.kind==='slide'&&ahead<r.speed*.45) {
          await page.getByRole('button',{name:'Runner slide',exact:true}).click();
          acted.add(hazard.id);actions.slides++;
        } else if(hazard.kind==='wall'&&ahead<r.speed*.6) {
          const blocked=new Set(r.objects.filter(o=>o.row===currentRow&&o.kind!=='coin').map(o=>o.lane));
          const safe=[-1,0,1].find(lane=>!blocked.has(lane));
          assert.notEqual(safe,undefined,'every obstacle row leaves an open lane');
          if(r.lane!==safe)await page.keyboard.press(r.lane>safe?'ArrowLeft':'ArrowRight');
        }
      }
    }
    if(r.coins>=44&&!nearGoalCaptured&&Math.abs(r.lanePosition-r.lane)<.1) {
      await expect(progress).toHaveAttribute('aria-valuenow',String(r.coins));
      await page.screenshot({path:`${output}/mission-near-goal.png`});
      nearGoalCaptured=true;
    }
    await page.waitForTimeout(25);
  }

  const continued=await read();
  assert.ok(milestone,'50-coin milestone appears within two minutes');
  assert.equal(continued.phase,'running','earning 50 coins does not stop the run');
  assert.equal(continued.missionComplete,true);assert.ok(continued.coins>=54,'coins keep accumulating beyond 50');
  assert.ok(continued.distance>milestone.distance+2&&continued.elapsed>milestone.elapsed,'distance and time advance after mission completion');
  assert.ok(continued.speed>initial.speed+8,'pace rises materially during the mission');
  assert.ok(actions.jumps>0&&actions.laneChanges>0,'driver used real jumps and lane switches');
  assert.equal(continued.survivalElapsed,initial.survivalElapsed,'survival remains paused');
  const ordered=[...rows.values()].sort((a,b)=>a.at-b.at);
  const gaps=ordered.slice(1).map((row,i)=>row.at-ordered[i].at);
  assert.ok(Math.min(...gaps.slice(6))<Math.min(...gaps.slice(0,2)),'later obstacle rows become denser');
  assert.ok(ordered.some(row=>row.hazards.size===2),'later rows include paired hazards');
  for(const row of ordered)assert.ok(new Set([...row.hazards.values()].map(o=>o.lane)).size<3,'every observed row leaves an open lane');
  await expect(page.locator('.runner-modal')).toBeHidden();
  await expect(progress).toHaveAttribute('aria-valuenow','50');
  await page.screenshot({path:`${output}/mission-keep-running.png`});
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button',{name:'Continue run',exact:true})).toBeVisible();
  const paused=await read();assert.equal(paused.phase,'paused');
  await page.waitForTimeout(250);assert.equal((await read()).distance,paused.distance,'manual pause still freezes the continuing run');
  await page.getByRole('button',{name:'BACK TO HUB',exact:true}).click();
  await expect(page.getByRole('button',{name:'02 / Temple Dash',exact:true})).toBeVisible();
  const hub=await page.evaluate(()=>{
    const a=window.__THREE_JS_GAME__.app,s=a.$webgl.scenes.current;
    return {active:a.__hub.active,runner:a.__runner.active,elevation:s.player.cameraOptions.elevation,distance:s.player.cameraOptions.distance,fov:s.getCurrentCamera().cam.fov};
  });
  assert.equal(hub.active,true);assert.equal(hub.runner,false);
  assert.ok(hub.elevation>=3.7&&hub.elevation<4.1);assert.ok(hub.distance>=8&&hub.distance<=10.8);assert.ok(hub.fov>65);
  await page.getByRole('button',{name:'02 / Temple Dash',exact:true}).click();
  const fresh=await read();
  assert.equal(fresh.coins,0);assert.equal(fresh.missionComplete,false);assert.equal(fresh.distance,0);
  await expect.poll(async()=>(await read()).phase,{timeout:10000}).toBe('running');
  await expect(progress).toHaveAttribute('aria-valuenow','0');
  await expect(page.locator('.runner-milestone')).toBeHidden();
  await page.keyboard.press('Escape');await page.getByRole('button',{name:'BACK TO HUB',exact:true}).click();
  await expect(page.getByRole('button',{name:'02 / Temple Dash',exact:true})).toBeVisible();
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({milestone,continued:{coins:continued.coins,distance:continued.distance,speed:continued.speed,elapsed:continued.elapsed,phase:continued.phase,missionComplete:continued.missionComplete},actions,observedRows:rows.size,pairedRows:ordered.filter(r=>r.hazards.size===2).length,gaps:{early:gaps.slice(0,2),late:gaps.slice(-4)},hub,errors},null,2));
} catch(error) {
  await page.screenshot({path:`${output}/failure.png`});
  console.error('PAGE ERRORS',errors);throw error;
} finally {await browser.close();}
