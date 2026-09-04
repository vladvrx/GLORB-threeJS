import { GLORB_ISLAND as island } from './island.js';
import { el } from './dom.js';
import { installRunner } from './runner.js';
import { buildHub } from './hub-visuals.js';
import { resolveHubCollision } from './hub-collision.js';

// The hub and Level One share the recovered controller and collision floor.
// Only this additive scenery layer is toggled; Level One's assets stay intact.
export function installHub(app) {
  if (app.__hub) return app.__hub;
  const c = { active:false, scene:null, group:null, busy:false, savedPhase:'briefing', savedPage:'briefing', levelPosition:null };
  app.__hub = c;
  installRunner(app);
  const style = el('style', {text: `
    .hub-ui{position:fixed;inset:0;z-index:65;pointer-events:none;font-family:Gilmer,sans-serif;color:#163e39}
    .hub-ui[hidden],.hub-ui [hidden]{display:none!important}
    .hub-location{position:absolute;top:calc(env(safe-area-inset-top) + 84px);left:18px;right:18px;text-align:center;font-weight:700;letter-spacing:.18em;font-size:12px;color:#fff8e8;text-shadow:0 2px 8px #163e3999}
    .hub-location strong{display:block;font-size:25px;letter-spacing:-.03em;margin-top:5px}
    .hub-panel{position:absolute;bottom:calc(env(safe-area-inset-bottom) + 92px);left:22px;right:22px;max-width:380px;margin:auto;background:#fff8e8ed;border:2px solid #fff9e7;border-radius:22px;padding:16px 18px;box-shadow:0 6px 0 #28685e20}
    .hub-panel p{margin:0 0 10px;font-size:12px;line-height:1.4}.hub-panel h2{font-size:18px;margin:0 0 5px}
    .hub-choices{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .hub-choices button{font-size:12px!important;padding:12px 8px!important}
    .hub-panel .hub-runner-entry{background:#79529b;color:#fff7e8}
    .hub-ui button{pointer-events:auto;cursor:pointer;border:0;font:700 15px Gilmer,sans-serif;border-radius:14px;background:#256956;color:#fff;padding:14px 18px;min-height:46px;width:100%}
    .hub-ui button:focus-visible{outline:3px solid #ffc64b;outline-offset:4px}
    .hub-return{position:absolute;bottom:calc(env(safe-area-inset-bottom) + 48px);left:14px;width:auto!important;font-size:12px!important;padding:10px 14px!important;background:#fff8e8!important;color:#256956!important}
    html.glorb-in-hub .survival-hud,html.glorb-in-hub .survival-modal,html.glorb-in-hub .paint-progress{display:none!important}
    html.glorb-in-hub #threejs-hud .dance-button{left:14px!important;right:auto!important}
  `});
  document.head.append(style);
  const label = el('div',{class:'hub-location'},['GLORB',el('strong',{text:'The Hub'})]);
  const title = el('h2',{text:'Choose a shrine'});
  const info = el('p',{text:'Walk into a shrine, or choose a game.'});
  const enter = el('button',{text:'Enter Level One',type:'button'});
  const runnerEnter = el('button',{class:'hub-runner-entry',text:'02 / Temple Dash',type:'button',onClick:()=>c.enterRunner()});
  const panel = el('div',{class:'hub-panel'},[title,info,el('div',{class:'hub-choices'},[enter,runnerEnter])]);
  const back = el('button',{class:'hub-return',text:'← Hub',type:'button','aria-label':'Return to hub',hidden:true});
  const ui = el('section',{class:'hub-ui',hidden:true,'aria-label':'World navigation'},[label,panel,back]);
  document.body.append(ui);
  for(const root of [panel,back]) for(const event of ['pointerdown','touchstart','mousedown']) root.addEventListener(event,e=>e.stopPropagation(),{passive:true});
  function paint() {
    ui.hidden = !c.scene || app.__runner?.active;
    label.hidden = panel.hidden = !c.active;
    back.hidden = c.active;
    document.documentElement.classList.toggle('glorb-in-hub',c.active);
    if(c.active) {
      const dance=document.querySelector('#threejs-hud .dance-button button');
      dance?.setAttribute('aria-label','Dance');
      dance?.setAttribute('data-caption','Dance');
    }
    document.documentElement.classList.remove('survival-blocked','glorb-hurt');
    if(app.__survival?.visuals) app.__survival.visuals.group.visible = !c.active && !app.__runner?.active;
    if(app.__paintState?.mesh) app.__paintState.mesh.visible = !c.active && !app.__runner?.active;
    c.group.visible = c.active;
    app.__survival?.ui?.paint(true);
  }
  async function relocate(position) {
    const player=c.scene.player;
    app.__stopDance?.();
    if(app.__jumpState) Object.assign(app.__jumpState,{airborne:false,pendingImpulse:false,leftFloor:false,pose:0});
    c.scene.physics.setGravity(30);
    player.options.spawnPosition.copy(position);
    await player.updateOptions();
    await c.scene.physics.respawnPlayer(true,true,true);
  }
  c.attach = scene => {
    if(c.scene===scene) return;
    c.scene=scene;
    scene.getCurrentCamera().updateCameraOptions();
    c.hubCamera = { ...scene.player.cameraOptions };
    c.group=buildHub(scene);
    c.resolvePlayerCollision=()=>{
      if(!c.active||c.busy||!c.group?.visible)return false;
      const player=c.scene.player,position=player.base.position;
      if(!resolveHubCollision(position,c.group.userData.colliders,c.group.position))return false;
      player.body?.position?.set(position.x,player.body.position.y,position.z);
      c.scene.physics.playerPosition?.set(position.x,c.scene.physics.playerPosition.y,position.z);
      player.updatePlayerPosUniforms?.();
      return true;
    };
    if(!scene.player.__hubCollisionHooked) {
      scene.player.__hubCollisionHooked=true;
      const after=scene.player.afterUpdate.bind(scene.player);
      scene.player.afterUpdate=function(){
        after();
        c.resolvePlayerCollision();
      };
    }
    c.active=true;
    const run=app.__survival.run;
    c.savedPhase=run.phase;
    c.savedPage=app.__survival.page;
    run.phase='hub';
    scene.getCurrentCamera().unlockPlayer('survival');
    paint();
  };
  c.enter = async () => {
    if(!c.active||c.busy) return;
    c.busy=true; enter.disabled=true;
    try {
      await relocate(c.levelPosition || c.scene.getPoint('Spawn').position);
      if(c.levelCamera) c.scene.player.updateOptions({},c.levelCamera);
      c.active=false;
      app.__survival.run.phase=c.savedPhase;
      app.__survival.page=c.savedPage;
      app.__survival.lastTime=performance.now();
      paint();
    } finally { c.busy=false; enter.disabled=false; }
  };
  c.return = async () => {
    if(app.__runner?.active) return c.returnFromRunner();
    if(c.active||c.busy||app.__survival.run.phase==='resetting') return;
    c.busy=true;
    c.levelPosition=c.scene.player.base.position.clone();
    c.levelCamera={...c.scene.player.cameraOptions};
    c.savedPhase=app.__survival.run.phase;
    c.savedPage=app.__survival.page;
    c.active=true;
    app.__survival.run.phase='hub';
    try {
      c.scene.player.updateOptions({},c.hubCamera);
      c.scene.getCurrentCamera().updateCameraOptions();
      await relocate(c.scene.getPoint('Spawn').position);
      c.scene.getCurrentCamera().unlockPlayer('survival');
      enter.textContent=c.savedPhase==='briefing'?'Enter Level One':'Continue Level One';
      info.textContent='Take your time here. Your Level One progress is kept while you explore.';
      paint();
    } finally { c.busy=false; }
  };
  c.enterRunner = async () => {
    if(!c.active||c.busy||app.$store.isCustomizeOpen) return;
    c.busy=true;
    try {
      await relocate(c.scene.getPoint('Spawn').position);
      c.active=false;
      app.__runner.open(c.scene);
      paint();
    } finally {c.busy=false;}
  };
  c.returnFromRunner = async () => {
    if(!app.__runner?.active||c.busy) return;
    c.busy=true;
    try {
      app.__runner.close();
      c.active=true;
      c.scene.player.updateOptions({},c.hubCamera);
      c.scene.getCurrentCamera().updateCameraOptions();
      await relocate(c.scene.getPoint('Spawn').position);
      paint();
    } finally {c.busy=false;}
  };
  enter.onclick=()=>c.enter();
  c.enterLevel=c.enter;
  back.onclick=()=>c.return();
  const timer=setInterval(()=>{
    if(!app.$webgl?.hooks?.beforeFrame?.watch) return;
    clearInterval(timer);
    app.$webgl.hooks.beforeFrame.watch(()=>{
      if(!c.active||c.busy) return;
      c.scene.getCurrentCamera().unlockPlayer('survival');
      const p=c.scene.player.base.position;
      if(Math.hypot(p.x-island.cx-30,p.z-island.cz-10)<3.8) c.enter();
      else if(Math.hypot(p.x-island.cx-30,p.z-island.cz+13)<3.8) c.enterRunner();
    });
  },50);
  return c;
}
