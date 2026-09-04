import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
await fs.mkdir('test-results-runner',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:320,height:568},hasTouch:true,isMobile:true});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try {
  await page.addInitScript(()=>{
    window.__toneEvents=[];
    const make=AudioContext.prototype.createOscillator;
    AudioContext.prototype.createOscillator=function(){
      const oscillator=make.call(this),start=oscillator.start;
      oscillator.start=function(...args){window.__toneEvents.push(this.frequency.value);return start.apply(this,args);};
      return oscillator;
    };
  });
  await page.goto(process.env.GLORB_URL||'http://127.0.0.1:43220/three-js');
  await expect(page.locator('#preloader')).toBeHidden({timeout:90000});
  await page.evaluate(async()=>{
    const a=window.__THREE_JS_GAME__.app;
    await a.$webgl.scenes.teleportTo('IslandWest',{noAnimation:true,noAnimations:true,point:'Spawn'});
    await a.$router.replace({name:'Home'});const s=a.$webgl.scenes.current;s.isEntered=true;s.setState('Playing');
    Object.assign(a.$store,{isTransitionActive:false,isCinematicActive:false,isDialogVisible:false,isAudioMuted:false});
  });
  await page.getByRole('button',{name:'02 / Temple Dash',exact:true}).click();
  const snapshot=()=>page.evaluate(()=>{
    const a=window.__THREE_JS_GAME__.app,r=a.__runner.run,m=a.__runner.scene.base.getObjectByName('glorb-runner-sparkles');
    return {phase:r.phase,coins:r.coins,distance:r.distance,tones:window.__toneEvents.length,vertices:m?.geometry.drawRange.count||0,context:a.$webgl.audio.getContext()?.state,muted:a.$store.isAudioMuted};
  });
  await expect.poll(async()=>(await snapshot()).coins,{timeout:15000,intervals:[20]}).toBe(1);
  const coin=await snapshot();assert.ok(coin.vertices>0);assert.ok(coin.tones>=5);assert.equal(coin.context,'running');
  await page.screenshot({path:'test-results-runner/feedback-small-portrait.png'});
  await page.getByRole('button',{name:'Mute Temple Dash sound',exact:true}).click();
  const muted=await snapshot();assert.equal(muted.muted,true);
  await expect.poll(async()=>(await snapshot()).coins,{timeout:3000,intervals:[20]}).toBeGreaterThanOrEqual(3);
  const silent=await snapshot();assert.equal(silent.tones,muted.tones,'muted pickups schedule no tones');assert.ok(silent.vertices>0,'muting leaves visual feedback enabled');
  await page.keyboard.press('Escape');const paused=await snapshot();await page.waitForTimeout(150);assert.deepEqual(await snapshot(),paused);
  await page.getByRole('button',{name:'BACK TO HUB',exact:true}).click();
  assert.equal(await page.evaluate(()=>window.__THREE_JS_GAME__.app.$webgl.scenes.current.base.getObjectByName('glorb-runner-sparkles')===undefined),true);
  // Reduced motion uses a brief fade, still starts automatically, and can pause
  // safely if the player rotates the phone while entering.
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
  await expect(page.locator('#preloader')).toBeHidden({timeout:90000});
  await page.evaluate(async()=>{const a=window.__THREE_JS_GAME__.app;await a.$webgl.scenes.teleportTo('IslandWest',{noAnimation:true,noAnimations:true,point:'Spawn'});await a.$router.replace({name:'Home'});const s=a.$webgl.scenes.current;s.isEntered=true;s.setState('Playing');Object.assign(a.$store,{isTransitionActive:false,isCinematicActive:false,isDialogVisible:false});});
  await page.getByRole('button',{name:'02 / Temple Dash',exact:true}).click();
  assert.equal(await page.evaluate(()=>window.__THREE_JS_GAME__.app.__runner.introDuration),.8);
  await page.setViewportSize({width:568,height:320});
  await expect.poll(async()=>(await snapshot()).phase).toBe('paused');
  await page.setViewportSize({width:320,height:568});
  await page.getByRole('button',{name:'Continue run',exact:true}).click();
  await expect.poll(async()=>(await snapshot()).phase).toBe('running');
  await page.keyboard.press('ArrowLeft');await page.waitForTimeout(200);
  assert.equal(await page.evaluate(()=>window.__THREE_JS_GAME__.app.__runner.camera.state.roll),0);
  assert.deepEqual(errors,[]);console.log(JSON.stringify({coin,muted,silent,reducedMotion:true,errors},null,2));
} finally {await browser.close();}
