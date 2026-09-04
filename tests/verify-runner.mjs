import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
await fs.mkdir('test-results-runner',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try {
  await page.goto(process.env.GLORB_URL||'http://127.0.0.1:43220/three-js');
  await expect(page.locator('#preloader')).toBeHidden({timeout:90000});
  await page.evaluate(async()=>{
    const a=window.__THREE_JS_GAME__.app;
    await a.$webgl.scenes.teleportTo('IslandWest',{noAnimation:true,noAnimations:true,point:'Spawn'});
    await a.$router.replace({name:'Home'});const s=a.$webgl.scenes.current;s.isEntered=true;s.setState('Playing');
    Object.assign(a.$store,{isTransitionActive:false,isCinematicActive:false,isDialogVisible:false});
  });
  await expect(page.getByRole('button',{name:'02 / Temple Dash',exact:true})).toBeVisible({timeout:60000});
  await page.evaluate(()=>{
    // Record the actual shrine-entry projection: adaptive render scaling can
    // change rounded camera aspect while the player walks across the hub.
    const runner=window.__THREE_JS_GAME__.app.__runner,open=runner.open;
    runner.open=function(scene) {
      window.__RUNNER_ENTRY_CAMERA__={distance:scene.player.cameraOptions.distance,elevation:scene.player.cameraOptions.elevation,fov:scene.getCurrentCamera().cam.fov};
      runner.open=open;return open.apply(this,arguments);
    };
  });
  const cinematic=()=>page.evaluate(()=>{
    const c=window.__THREE_JS_GAME__.app.__runner,cam=c.scene.getCurrentCamera().cam;
    return {phase:c.run.phase,time:c.introTime,duration:c.introDuration,distance:c.run.distance,position:cam.getWorldPosition(cam.position.clone()).toArray(),fov:cam.fov,state:{...c.camera.state}};
  });
  await page.screenshot({path:'test-results-runner/hub-two-shrines.png'});
  // Walk to the physical purple shrine using the same camera-relative controls
  // as the player; no position or game-state injection for shrine entry.
  const held=new Set();
  for(let i=0;i<130;i++) {
    const s=await page.evaluate(()=>{
      const a=window.__THREE_JS_GAME__.app,scene=a.$webgl.scenes.current,p=scene.player.base.position;
      const f=scene.getCurrentCamera().cam.getWorldDirection(p.clone()),island=window.__GLORB_ISLAND__;
      return{x:p.x-island.cx,z:p.z-island.cz,fx:f.x,fz:f.z,active:a.__runner.active};
    });
    if(s.active)break;
    const dx=30-s.x,dz=-13-s.z,len=Math.hypot(s.fx,s.fz),fx=s.fx/len,fz=s.fz/len;
    const up=dx*fx+dz*fz,right=dx*(-fz)+dz*fx,next=new Set();
    if(Math.abs(up)>Math.abs(right)*.4)next.add(up>0?'KeyW':'KeyS');
    if(Math.abs(right)>Math.abs(up)*.4)next.add(right>0?'KeyD':'KeyA');
    for(const key of held)if(!next.has(key)){await page.keyboard.up(key);held.delete(key);}
    for(const key of next)if(!held.has(key)){await page.keyboard.down(key);held.add(key);}
    await page.waitForTimeout(120);
  }
  for(const key of held)await page.keyboard.up(key);
  const hubCamera=await page.evaluate(()=>window.__RUNNER_ENTRY_CAMERA__);
  assert.ok(hubCamera,'physical shrine entry captured the original hub camera');
  await expect(page.getByRole('button',{name:'Start running',exact:true})).toHaveCount(0);
  const entry=await cinematic();assert.equal(entry.phase,'intro');assert.equal(entry.distance,0);
  await page.waitForTimeout(180);
  const movingEntry=await cinematic();assert.equal(movingEntry.phase,'intro');assert.equal(movingEntry.distance,0);
  assert.ok(movingEntry.time>entry.time,'intro timeline advances automatically');
  assert.ok(Math.hypot(...movingEntry.position.map((v,i)=>v-entry.position[i]))>.01,'entry camera moves while distance is frozen');
  await page.screenshot({path:'test-results-runner/cinematic-entry.png'});
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button',{name:'Continue run',exact:true})).toBeVisible();
  const introPaused=await cinematic();assert.equal(introPaused.phase,'paused');
  await page.waitForTimeout(350);
  const stillPaused=await cinematic();assert.equal(stillPaused.time,introPaused.time);assert.equal(stillPaused.distance,0);
  await page.getByRole('button',{name:'Continue run',exact:true}).click();
  assert.equal((await cinematic()).phase,'intro','Continue resumes the cinematic before gameplay');
  await expect.poll(async()=>(await cinematic()).phase,{timeout:10000}).toBe('running');
  await expect(page.getByRole('button',{name:'Start running',exact:true})).toHaveCount(0);
  await expect(page.locator('.runner-note')).toHaveCount(0);
  const bones=()=>page.evaluate(()=>window.__THREE_JS_GAME__.app.__runner.scene.player.mesh.skeleton.bones.filter(b=>/Knee|Hip/.test(b.name)).map(b=>b.quaternion.toArray()));
  const pose=await bones();await page.waitForTimeout(180);assert.notDeepEqual(await bones(),pose,'Glorb uses animated running legs');
  await page.screenshot({path:'test-results-runner/running.png'});
  const touchSwipe=(x1,y1,x2,y2)=>page.evaluate(({x1,y1,x2,y2})=>{
    const start=document.elementFromPoint(x1,y1),end=document.elementFromPoint(x2,y2),options={bubbles:true,cancelable:true,pointerId:42,pointerType:'touch',isPrimary:true};
    start.dispatchEvent(new PointerEvent('pointerdown',{...options,clientX:x1,clientY:y1,buttons:1}));
    start.dispatchEvent(new PointerEvent('pointermove',{...options,clientX:x2,clientY:y2,buttons:1}));
    end.dispatchEvent(new PointerEvent('pointerup',{...options,clientX:x2,clientY:y2,buttons:0}));
  },{x1,y1,x2,y2});
  await touchSwipe(265,560,155,560);
  assert.equal(await page.evaluate(()=>window.__THREE_JS_GAME__.app.__runner.run.lane),-1);
  await page.waitForTimeout(170);
  const leftCamera=await cinematic();assert.ok(leftCamera.state.lane<-.01,'chase camera follows the left lane');assert.ok(Math.abs(leftCamera.state.roll)>.0001,'lane change banks the chase camera');
  await touchSwipe(155,560,265,560);
  assert.equal(await page.evaluate(()=>window.__THREE_JS_GAME__.app.__runner.run.lane),0);
  await touchSwipe(195,600,195,480);
  assert.ok(await page.evaluate(()=>window.__THREE_JS_GAME__.app.__runner.run.jump>0),'upward phone swipe jumps');
  await page.waitForTimeout(1050);
  await touchSwipe(195,480,195,600);
  assert.ok(await page.evaluate(()=>window.__THREE_JS_GAME__.app.__runner.run.slide>0),'downward phone swipe slides');
  await page.evaluate(()=>window.__THREE_JS_GAME__.app.__runner.start());
  const read=()=>page.evaluate(()=>{
    const a=window.__THREE_JS_GAME__.app,r=a.__runner.run;
    const next=r.objects.find(o=>o.kind!=='coin'&&!o.done&&o.at>r.distance);
    return {phase:r.phase,distance:r.distance,lane:r.lane,coins:r.coins,jump:r.jump,slide:r.slide,next,blocked:r.objects.filter(o=>o.kind!=='coin'&&!o.done&&o.at===next?.at).map(o=>o.lane),survival:a.__survival.run.elapsed,anim:a.__runner.scene.player.animation?.animationID};
  });
  const deadline=Date.now()+35000;let jumped=false,slid=false;
  while(Date.now()<deadline) {
    const r=await read();assert.equal(r.phase,'running',JSON.stringify(r));
    if(r.distance>205)break;
    const ahead=r.next?.at-r.distance;
    if(r.next?.kind==='jump'&&!jumped&&ahead<6.5) {await page.keyboard.press('Space');jumped=true;await page.waitForTimeout(70);assert.ok((await cinematic()).state.lift>.001,'chase camera responds to jumping');}
    else if(r.next?.kind==='slide'&&!slid&&ahead<6.5) {await page.getByRole('button',{name:'Runner slide',exact:true}).click();slid=true;await page.waitForTimeout(70);assert.ok((await cinematic()).state.duck>.001,'chase camera responds to sliding');await page.screenshot({path:'test-results-runner/slide.png'});}
    else if(r.next&&ahead<18&&(r.next.kind==='wall'||jumped&&slid)) {
      const target=[-1,0,1].find(lane=>!r.blocked.includes(lane));
      if(r.lane>target)await page.keyboard.press('ArrowLeft');
      else if(r.lane<target)await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(40);
  }
  const progressed=await read();assert.ok(jumped&&slid);assert.ok(progressed.distance>200);assert.ok(progressed.coins>0);assert.equal(progressed.survival,0);
  await page.getByRole('button',{name:'Pause Temple Dash'}).click();
  const paused=await read();await page.waitForTimeout(350);assert.equal((await read()).distance,paused.distance);
  await page.getByRole('button',{name:'Continue run',exact:true}).click();
  // Deliberately steer into the next stone block to verify an actual failure.
  for(let i=0;i<300;i++) {
    const r=await read();if(r.phase==='over')break;
    if(r.next&&r.next.at-r.distance<20) {
      if(r.lane>r.next.lane)await page.keyboard.press('ArrowLeft');
      if(r.lane<r.next.lane)await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(40);
  }
  await expect(page.getByRole('button',{name:'Run again',exact:true})).toBeVisible();
  await page.screenshot({path:'test-results-runner/result.png'});
  await page.getByRole('button',{name:'Run again',exact:true}).click();assert.ok((await read()).distance<2);assert.equal((await read()).phase,'running','retry starts immediately without repeating the cinematic');
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'BACK TO HUB',exact:true}).click();
  await expect(page.getByRole('button',{name:'02 / Temple Dash',exact:true})).toBeVisible();
  const back=await page.evaluate(()=>{const a=window.__THREE_JS_GAME__.app,s=a.$webgl.scenes.current;return{hub:a.__hub.active,runner:a.__runner.active,scale:s.player.base.scale.y,camera:s.player.cameraOptions.elevation,distance:s.player.cameraOptions.distance,fov:s.getCurrentCamera().cam.fov};});
  assert.equal(back.hub,true);assert.equal(back.runner,false);assert.ok(back.camera<4.1);
  assert.ok(Math.abs(back.camera-hubCamera.elevation)<.001,'hub camera elevation restores');
  assert.ok(Math.abs(back.distance-hubCamera.distance)<.001,'hub camera distance restores');
  assert.ok(Math.abs(back.fov-hubCamera.fov)<.001,'hub camera field of view restores');
  await page.getByRole('button',{name:'Enter Level One',exact:true}).click();await expect(page.getByRole('button',{name:"Let's paint",exact:true})).toBeVisible();
  assert.deepEqual(errors,[]);console.log(JSON.stringify({progressed,back,errors},null,2));
} catch(e) {await page.screenshot({path:'test-results-runner/failure.png'});console.log('PAGE ERRORS',errors);throw e;}
finally {await browser.close();}
