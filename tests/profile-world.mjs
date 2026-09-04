import {chromium,expect} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const results={};
try {
  await page.goto(process.env.GLORB_URL||'http://127.0.0.1:43220/three-js');
  await expect(page.locator('#preloader')).toBeHidden({timeout:90000});
  await page.evaluate(async()=>{
    const a=window.__THREE_JS_GAME__.app;await a.$webgl.scenes.teleportTo('IslandWest',{noAnimation:true,noAnimations:true,point:'Spawn'});
    await a.$router.replace({name:'Home'});const s=a.$webgl.scenes.current;s.isEntered=true;s.setState('Playing');Object.assign(a.$store,{isTransitionActive:false,isCinematicActive:false,isDialogVisible:false});
  });
  await expect(page.getByRole('button',{name:'02 / Temple Dash',exact:true})).toBeVisible({timeout:60000});
  const profile=()=>page.evaluate(async()=>{
    const a=window.__THREE_JS_GAME__.app,renderer=a.$webgl.threeRenderer;
    const intervals=[],samples=[];let last=performance.now();
    for(let i=0;i<60;i++)await new Promise(resolve=>requestAnimationFrame(now=>{intervals.push(now-last);last=now;samples.push({...renderer.info.render});resolve();}));
    const sorted=intervals.slice(3).sort((a,b)=>a-b);
    return {frameMedianMs:sorted[Math.floor(sorted.length*.5)],frameP95Ms:sorted[Math.floor(sorted.length*.95)],render:samples.at(-1),autoReset:renderer.info.autoReset,memory:{...renderer.info.memory},pixelRatio:renderer.getPixelRatio(),canvas:{width:renderer.domElement.width,height:renderer.domElement.height}};
  });
  await page.waitForTimeout(450);results.hub=await profile();
  await page.getByRole('button',{name:'02 / Temple Dash',exact:true}).click();
  await expect(page.getByRole('button',{name:'Start running',exact:true})).toHaveCount(0);
  await expect.poll(()=>page.evaluate(()=>window.__THREE_JS_GAME__.app.__runner.run.phase),{timeout:10000}).toBe('running');
  results.runner=await profile();
  await page.keyboard.press('Escape');await page.getByRole('button',{name:'BACK TO HUB',exact:true}).click();
  await page.getByRole('button',{name:'Enter Level One',exact:true}).click();await page.getByRole('button',{name:"Let's paint",exact:true}).click();results.survival=await profile();
  console.log(JSON.stringify(results,null,2));
  if(process.env.GLORB_PROFILE_OUT)await fs.writeFile(process.env.GLORB_PROFILE_OUT,JSON.stringify(results,null,2));
} finally {await browser.close();}
