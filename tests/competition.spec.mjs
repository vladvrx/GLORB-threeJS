import { test, expect } from '@playwright/test';
const URL = process.env.GLORB_URL || 'http://127.0.0.1:43220/three-js';

async function launch(page) {
  const errors = [], external = [], missing = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) missing.push(r.url()); });
  await page.route('**/*', route => {
    const url = new globalThis.URL(route.request().url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) { external.push(url.href); return route.abort(); }
    return route.continue();
  });
  await page.goto(URL);
  await expect(page.locator('#preloader')).toBeHidden({timeout:90000});
  await page.waitForFunction(() => !!window.__THREE_JS_GAME__?.app?.$webgl?.scenes, null, {timeout:60000});
  return {errors, external, missing};
}

// Integration checks may enter the scene directly. The separate full-intro test
// verifies the public path; no test helper is shipped inside the game.
async function enterIsland(page) {
  await page.evaluate(async () => {
    const app = window.__THREE_JS_GAME__.app;
    await app.$webgl.scenes.teleportTo('IslandWest', {noAnimation:true,noAnimations:true,point:'Spawn'});
    await app.$router.replace({name:'Home'});
    const scene = app.$webgl.scenes.current;
    scene.isEntered = true; scene.setState('Playing');
    app.$store.isTransitionActive = false;
    app.$store.isCinematicActive = false;
    app.$store.isDialogVisible = false;
  });
  await enterLevelFromHub(page);
  await expect(page.getByRole('button',{name:"Let's paint",exact:true})).toBeVisible({timeout:60000});
}

async function enterLevelFromHub(page) {
  await expect(page.getByRole('button', {name:/^(Enter Level One|Let's paint)$/})).toBeVisible({timeout:90000});
  const enter = page.getByRole('button',{name:'Enter Level One',exact:true});
  if (await enter.isVisible()) await enter.click();
}

test('resources, controls, pause, crafting, portrait, and replay integrate with the real scene', async ({page}) => {
  const check = await launch(page);
  await enterIsland(page);
  await page.screenshot({path:'test-results/briefing.png'});
  await page.getByRole('button',{name:"Let's paint",exact:true}).click();
  await expect(page.locator('.survival-modal')).toBeHidden();
  const paintBar = page.getByRole('progressbar', {name:'PAINT supply', exact:true});
  await expect(paintBar).toBeVisible();
  await expect(page.locator('.paint-percent')).toHaveText(/\d+%/);
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(1800);
  await page.keyboard.up('KeyW');
  const state = await page.evaluate(() => {
    const app = window.__THREE_JS_GAME__.app;
    return {phase:app.__survival.run.phase, coverage:app.__paintState.ratio, collected:app.__survival.run.collected, pos:app.__survival.player()};
  });
  expect(state.phase).toBe('playing');
  expect(state.coverage).toBeGreaterThan(0);
  await page.getByRole('button',{name:'Craft upgrades',exact:true}).click();
  const time = await page.evaluate(() => window.__THREE_JS_GAME__.app.__survival.run.elapsed);
  await page.waitForTimeout(800);
  expect(await page.evaluate(() => window.__THREE_JS_GAME__.app.__survival.run.elapsed)).toBe(time);
  await expect(page.locator('.survival-upgrade-icon')).toHaveCount(3);
  for (const key of ['brush', 'boots', 'lining']) await expect(page.locator(`.survival-upgrade-icon[data-upgrade="${key}"]`)).toBeVisible();
  await expect(page.locator('.survival-card')).not.toContainText(/pigment/i);
  const supply = await page.evaluate(() => {
    const run = window.__THREE_JS_GAME__.app.__survival.run;
    return {expected:run.pigment / 150 * 100, actual:document.querySelector('.paint-supply-bar').value};
  });
  expect(supply.actual).toBeCloseTo(supply.expected, 2);
  await page.screenshot({path:'test-results/crafting.png'});
  await page.getByRole('button',{name:'Back to the island',exact:true}).click();
  await page.screenshot({path:'test-results/playing.png'});
  // Terminal-state injection checks result UI and reset only, not playability.
  await page.evaluate(() => { window.__THREE_JS_GAME__.app.__survival.run.health = 0; });
  await expect(page.getByRole('button',{name:'Play Again',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Play Again',exact:true}).click();
  await expect(page.getByRole('button',{name:"Let's paint",exact:true})).toBeVisible();
  const fresh = await page.evaluate(() => {
    const app = window.__THREE_JS_GAME__.app;
    return {elapsed:app.__survival.run.elapsed, health:app.__survival.run.health, coverage:app.__paintState.ratio, restored:app.__survival.run.restored};
  });
  expect(fresh).toEqual({elapsed:0,health:100,coverage:0,restored:0});
  expect(check.errors).toEqual([]);
  expect(check.external).toEqual([]);
  expect(check.missing).toEqual([]);
});

test('chasing blight leaves purple ground trails, and PAINT and icons fit a small portrait', async ({page}) => {
  const check = await launch(page);
  await enterIsland(page);
  await page.getByRole('button',{name:"Let's paint",exact:true}).click();
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(2200);
  await page.keyboard.up('KeyW');
  // Place one chaser near the player to check rendering without a long idle run.
  // Trail generation, movement and expiry still run through the real frame loop.
  await page.evaluate(() => {
    const c = window.__THREE_JS_GAME__.app.__survival, p = c.player();
    c.run.elapsed = 30; c.run.nextWisp = 999;
    c.run.wisps = [{id:1, x:p.x - 8, z:p.z - 5, age:0, trailClock:0}];
  });
  await page.waitForTimeout(1800);
  const trails = await page.evaluate(() => {
    const c = window.__THREE_JS_GAME__.app.__survival;
    return {count:c.run.trails.length, drawn:c.visuals.trails.count, colour:c.visuals.trails.material.color.getHexString(), instanced:c.visuals.trails.isInstancedMesh, first:c.run.trails[0], chaser:c.run.wisps[0]};
  });
  expect(trails.count).toBeGreaterThan(2);
  expect(trails.drawn).toBe(trails.count);
  expect(trails.instanced).toBe(true);
  expect(trails.colour).toBe('973bc5');
  expect(trails.first.x).toBeLessThan(trails.chaser.x);
  await page.screenshot({path:'test-results/blight-trails.png'});
  await page.getByRole('button',{name:'Cleansing pulse',exact:true}).click();
  await page.waitForTimeout(150);
  expect(await page.evaluate(() => window.__THREE_JS_GAME__.app.__survival.run.trails.length)).toBe(0);
  await page.setViewportSize({width:320, height:640});
  await page.getByRole('button',{name:'Craft upgrades',exact:true}).click();
  await expect(page.locator('.survival-upgrade-icon')).toHaveCount(3);
  const layout = await page.evaluate(() => {
    const stat = document.querySelector('.paint-stat').getBoundingClientRect();
    const goal = document.querySelector('.survival-goal').getBoundingClientRect();
    const card = document.querySelector('.survival-card');
    const icons = [...document.querySelectorAll('.survival-upgrade-icon')].map(i => i.getBoundingClientRect());
    return {overlap:stat.bottom > goal.top, overflow:card.scrollWidth > card.clientWidth, iconsInside:icons.every(i => i.left >= 0 && i.right <= innerWidth)};
  });
  expect(layout).toEqual({overlap:false,overflow:false,iconsInside:true});
  await page.screenshot({path:'test-results/crafting-small-portrait.png'});
  await page.getByRole('button', {name:'Back to the island',exact:true}).click();
  await expect(page.locator('.survival-modal')).toBeHidden();
  expect(check.errors).toEqual([]);
  expect(check.external).toEqual([]);
  expect(check.missing).toEqual([]);
});

test('public boat intro reaches the survival briefing', async ({page}) => {
  const shaderErrors=[];
  page.on('console',message=>{
    if(message.type()==='error'&&/shader error|VALIDATE_STATUS|COMPILE_STATUS|program not valid/i.test(message.text())) shaderErrors.push(message.text());
  });
  const check = await launch(page);
  const go=page.getByRole('button',{name:'GO GO GO',exact:true});
  await expect(go).toBeVisible({timeout:40000});
  await page.waitForFunction(()=>window.__THREE_JS_GAME__.app.$webgl.store.intro.descentDone.value);
  await page.screenshot({path:'test-results/intro-floating-arrival.png'});
  await go.click();
  for (const text of ['HELLO HELLO HELLO HELLO', 'WE FOUND MORE LAND TO PAINT', 'ARE YOU COMING']) {
    const bubble = page.locator('.dialog-bubble').filter({hasText:text}).last();
    await expect(bubble).toBeVisible({timeout:40000});
    await expect(bubble.locator('.bubble')).toHaveClass(/is-done/, {timeout:40000});
    if(text==='HELLO HELLO HELLO HELLO') {
      await page.screenshot({path:'test-results/intro-floating.png'});
      const heights=await page.evaluate(()=>{
        const s=window.__THREE_JS_GAME__.app.$webgl.scenes.current;
        return {ship:s.boat.base.position.y,glorb:s.npcIntro.base.position.y,camera:s.introCam.cam.position.y};
      });
      expect(heights.ship).toBeGreaterThan(20);
      expect(heights.glorb).toBeGreaterThan(heights.ship);
      expect(heights.camera).toBeGreaterThan(24);
    }
    await page.keyboard.press('Space');
  }
  await page.getByRole('button', {name:'YES YES YES',exact:true}).click();
  const final = page.locator('.dialog-bubble').filter({hasText:'GLORB'}).last();
  await expect(final.locator('.bubble')).toHaveClass(/is-done/, {timeout:40000});
  await page.keyboard.press('Space');
  await page.waitForFunction(()=>{
    const app=window.__THREE_JS_GAME__.app,t=app.$webgl.transitionScene;
    return app.$store.isSpinnerVisible&&t.bg.base.visible&&t.ground.base.visible&&t.bg.base.material.uniforms.sea.value>.99&&t.bg.base.material.uniforms.maskRadius.value<.001;
  },null,{timeout:40000});
  const flightColors=await page.evaluate(()=>{
    const t=window.__THREE_JS_GAME__.app.$webgl.transitionScene;
    return [t.bg.base.material,t.ground.base.material].map(m=>m.defines.WATER_TOP_COLOR);
  });
  expect(new Set(flightColors).size).toBe(1);
  const neon=flightColors[0].slice(flightColors[0].indexOf('(')+1,-1).split(',').map(Number);
  expect(neon[1]).toBeGreaterThan(.95);
  expect(neon[0]).toBeLessThan(.3);
  expect(neon[2]).toBeLessThan(.15);
  await page.screenshot({path:'test-results/intro-flight-neon.png'});
  await expect(page.getByRole('button',{name:'Enter Level One',exact:true})).toBeVisible({timeout:90000});
  await page.waitForFunction(()=>{
    const app=window.__THREE_JS_GAME__.app;
    return app.__hub?.active&&!app.$store.isTransitionActive&&!app.$webgl.transitionScene.bg.base.visible;
  },null,{timeout:40000});
  const hubWater=await page.evaluate(()=>window.__THREE_JS_GAME__.app.$webgl.store.biomes.default.defines.WATER_TOP_COLOR);
  expect(hubWater).not.toBe(flightColors[0]);
  await page.screenshot({path:'test-results/intro-hub-coastal.png'});
  await enterLevelFromHub(page);
  await expect(page.getByRole('button',{name:"Let's paint",exact:true})).toBeVisible({timeout:90000});
  expect(check.errors).toEqual([]);
  expect(check.external).toEqual([]);
  expect(check.missing).toEqual([]);
  expect(shaderErrors).toEqual([]);
});

// This driver only reads runtime state. Movement and actions use public input;
// no resource, position, time, coverage, or upgrade state is assigned.
async function snapshot(page) {
  return page.evaluate(() => {
    const a = window.__THREE_JS_GAME__.app, c = a.__survival;
    const cam = c.scene.getCurrentCamera().cam;
    const forward = cam.getWorldDirection(c.scene.player.base.position.clone());
    return { ...JSON.parse(JSON.stringify(c.run)), p:c.player(), forward:{x:forward.x,z:forward.z} };
  });
}

async function walkTo(page, target, pulse = false) {
  const held = new Set();
  for (let step = 0; step < 140; step++) {
    const s = await snapshot(page);
    if (s.phase !== 'playing') break;
    const dx=target.x-s.p.x, dz=target.z-s.p.z;
    if (Math.hypot(dx,dz)<2.1) break;
    const f=s.forward, len=Math.hypot(f.x,f.z), fx=f.x/len, fz=f.z/len;
    const up=dx*fx+dz*fz, right=dx*(-fz)+dz*fx;
    const next=new Set();
    if (Math.abs(up)>Math.abs(right)*0.4) next.add(up>0?'KeyW':'KeyS');
    if (Math.abs(right)>Math.abs(up)*0.4) next.add(right>0?'KeyD':'KeyA');
    for(const k of held) if(!next.has(k)) {await page.keyboard.up(k);held.delete(k);}
    for(const k of next) if(!held.has(k)) {await page.keyboard.down(k);held.add(k);}
    if(pulse && s.pulseCooldown===0 && s.pigment>=25) await page.keyboard.press('KeyE');
    await page.waitForTimeout(180);
  }
  for(const k of held) await page.keyboard.up(k);
}

test('a full run can be won using movement, gathering, crafting and pulses', async ({page}) => {
  test.setTimeout(480000);
  const check=await launch(page);
  await enterIsland(page);
  await page.getByRole('button',{name:"Let's paint",exact:true}).click();
  await page.keyboard.press('KeyE');
  let state=await snapshot(page);
  const route=[0,1,2,3,10,4,5,6,7,11,8,9];
  for(let lap=0;lap<5 && state.phase==='playing';lap++) {
    for(const id of route) {
      await walkTo(page,state.pods[id],lap>0);
      state=await snapshot(page);
      if(state.phase!=='playing') break;
      for(const shrine of state.shrines.filter(s=>!s.restored)) {
        if(state.pigment>=26 && Math.hypot(shrine.x-state.p.x,shrine.z-state.p.z)<18) {
          await walkTo(page,shrine);
          await page.keyboard.press('KeyE');
        }
      }
      state=await snapshot(page);
      for(const [key,cost] of [['brush',[20,32]],['boots',[18,28]],['lining',[16,26]]]) {
        if(state.upgrades[key]<2 && state.pigment>=cost[state.upgrades[key]]+24) {
          await page.getByRole('button',{name:'Craft upgrades',exact:true}).click();
          await page.locator('.survival-upgrade').filter({hasText:key==='brush'?'Wide brush':key==='boots'?'Spring boots':'Protective lining'}).getByRole('button').click();
          await page.getByRole('button',{name:'Back to the island',exact:true}).click();
          state=await snapshot(page);
        }
      }
      console.log('route',lap,id,JSON.stringify({phase:state.phase,t:Math.round(state.elapsed),paint:Math.round(state.coverage*100),pigment:Math.round(state.pigment),health:Math.round(state.health),shrines:state.restored,upgrades:state.upgrades,p:state.p}));
    }
  }
  await page.screenshot({path:'test-results/full-run.png'});
  console.log('FINAL',JSON.stringify({phase:state.phase, elapsed:state.elapsed, coverage:state.coverage, health:state.health, restored:state.restored, collected:state.collected, upgrades:state.upgrades, trails:state.trails.length}));
  expect(state.phase).toBe('won');
  await expect(page.getByRole('button',{name:'Play Again',exact:true})).toBeVisible();
  expect(check.errors).toEqual([]);
  expect(check.external).toEqual([]);
  expect(check.missing).toEqual([]);
});
