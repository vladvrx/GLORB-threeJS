import { jumpHeight, RUNNER } from './runner-model.js';

const mix=(a,b,t)=>a+(b-a)*t;
const ease=t=>t*t*(3-2*t);

// One reusable camera rig; all movement is visual and independent of collisions.
export function createRunnerCamera(scene, reducedMotion=false) {
  const camera=scene.getCurrentCamera(),cam=camera.cam;
  const origin=scene.getPoint('Spawn').position;
  const previousAfter=camera.afterUpdate,originalFov=cam.fov,originalAspect=cam.aspect;
  const {x:originalWidth,y:originalHeight}=scene.webgl.viewport.size.value;
  const target=origin.clone();
  const state={lane:0,lookLane:0,lift:0,duck:0,roll:0,fov:68,impact:0,progress:0,time:0};
  let previousJump=0,previousPhase='intro';
  const baseFov=()=>Math.min(70,Math.max(59,68-(cam.aspect-.46)*11));
  function reset(intro=true) {
    Object.assign(state,{lane:0,lookLane:0,lift:0,duck:0,roll:0,fov:baseFov(),impact:0,progress:intro?0:1,time:0});
    previousJump=0;previousPhase=intro?'intro':'running';
  }
  function update(run,dt,progress) {
    state.progress=progress;
    if(run.phase==='paused')return;
    const h=Math.max(0,Math.min(dt,.05)),follow=1-Math.exp(-6*h),settle=1-Math.exp(-9*h);
    const jump=jumpHeight(run),lane=run.lanePosition*RUNNER.laneWidth;
    if(previousJump>0&&jump===0)state.impact=.12;
    if(previousPhase==='running'&&run.phase==='over')state.impact=.32;
    previousJump=jump;previousPhase=run.phase;
    state.lane=mix(state.lane,lane*.64,follow);
    state.lookLane=mix(state.lookLane,lane*.82,settle);
    state.lift=mix(state.lift,jump*(reducedMotion?.08:.24),follow);
    state.duck=mix(state.duck,run.slide>0?1:0,settle);
    const lean=reducedMotion?0:Math.max(-.045,Math.min(.045,(lane*.64-state.lane)*-.045));
    state.roll=mix(state.roll,lean,settle);
    state.fov=mix(state.fov,baseFov()+(reducedMotion?0:(run.speed-12)*.34+state.duck*2),follow);
    state.impact=Math.max(0,state.impact-h*1.8);
    state.time+=run.phase==='running'?h:0;
  }
  function draw() {
    const p=ease(state.progress),opening=reducedMotion?0:1-p;
    const angle=opening*1.02,distance=6.2+opening*8.3;
    const impact=reducedMotion?0:Math.sin(state.time*42)*state.impact;
    cam.position.set(origin.x-Math.cos(angle)*distance,
      origin.y+3.7+opening*9.9+state.lift-state.duck*.5+impact,
      origin.z+Math.sin(angle)*distance+state.lane);
    target.set(origin.x+mix(1,4,p),origin.y+1.75+state.lift*.5-state.duck*.25,origin.z+state.lookLane);
    cam.lookAt(target);cam.rotateZ(state.roll);
    const fov=state.fov-opening*8;
    if(Math.abs(cam.fov-fov)>.001){cam.fov=fov;cam.updateProjectionMatrix();}
    cam.updateMatrixWorld();
  }
  // Apply after the recovered physics camera has updated for this frame.
  camera.afterUpdate=function(){previousAfter.call(this);draw();};
  reset();
  return {state,reset,update,draw,destroy(){
    camera.afterUpdate=previousAfter;
    const size=scene.webgl.viewport.size.value;
    if(size.x===originalWidth&&size.y===originalHeight) {
      // Adaptive render scale rounds buffer dimensions independently. It must
      // not change the restored projection when the actual viewport is unchanged.
      cam.fov=originalFov;cam.aspect=originalAspect;cam.updateProjectionMatrix();
      camera.updateCameraOptions();
    } else camera.resize(scene.webgl.renderer.drawingBufferSize.value);
  }};
}
