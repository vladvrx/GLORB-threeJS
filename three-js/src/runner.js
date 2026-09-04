import { makeTemple } from './runner-visuals.js';
import { el, svgIcon, unwrap } from './dom.js';
import { createRunner, runnerAction, stepRunner, jumpHeight, runnerScore, RUNNER } from './runner-model.js';
import { createRunnerCamera } from './runner-camera.js';
import { createRunnerFeedback } from './runner-feedback.js';

export function installRunner(app) {
  if(app.__runner) return app.__runner;
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const c={active:false,run:createRunner(),scene:null,visuals:null,camera:null,lastTime:0,best:0,introTime:0,introDuration:reducedMotion?.8:2.4};app.__runner=c;
  try {c.best=Number(localStorage.getItem('glorb-temple-best'))||0;}catch{}
  document.head.append(el('style',{text:`
    html.glorb-in-runner .hub-ui,html.glorb-in-runner #threejs-hud{display:none!important}
    .runner-ui{position:fixed;inset:0;z-index:80;color:#fff8e7;font-family:Gilmer,Arial,sans-serif;pointer-events:none}
    .runner-ui[hidden],.runner-ui [hidden]{display:none!important}
    .runner-top{position:absolute;top:calc(16px + env(safe-area-inset-top));left:16px;right:16px;display:flex;gap:8px;align-items:center;justify-content:flex-end}
    .runner-stat{flex:1;background:#183f36e8;border:1px solid #9bd4ad66;border-radius:14px;padding:10px;font-weight:700;font-size:13px;line-height:1.5}
    .runner-ui button{pointer-events:auto;cursor:pointer;border:0;border-radius:14px;background:#f6d781;color:#234739;padding:14px 16px;min-height:46px;font:700 14px Gilmer,Arial,sans-serif}
    .runner-ui button:focus-visible{outline:3px solid white;outline-offset:3px}
    .runner-sound{width:46px;padding:12px!important;flex-shrink:0}.runner-sound svg{display:block;width:22px;height:22px;fill:currentColor}
    .runner-stat[data-pickup=true]{border-color:#ffe19a;color:#ffe19a}
    .runner-goal{height:4px;margin-top:5px;border-radius:5px;overflow:hidden;background:#ffffff24}
    .runner-goal span{display:block;width:100%;height:100%;background:#ffdb70;transform:scaleX(0);transform-origin:left;transition:transform .18s ease}
    .runner-controls{position:absolute;bottom:calc(18px + env(safe-area-inset-bottom));left:16px;right:16px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px}
    .runner-controls button{padding:15px 6px;background:#1a4c3ce8;color:#fff8df;border:1px solid #d5e5bd88}
    .runner-modal{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#0a251b99;padding:22px;pointer-events:auto}
    .runner-card{width:100%;max-width:380px;max-height:90%;overflow:auto;background:#fff7e3;color:#234739;border-radius:24px;padding:25px}
    .runner-card h1{font-size:32px;line-height:1.05;margin:10px 0 16px;color:#234739}.runner-card p{font-size:14px;line-height:1.5;margin:0 0 16px}
    .runner-card small{letter-spacing:.13em;font-weight:700}.runner-actions{display:grid;gap:10px}.runner-actions .secondary{background:#dce8d8}
    .runner-milestone{position:absolute;top:153px;left:28px;right:28px;text-align:center;background:#fff0ba;color:#234739;border:2px solid #f6d781;border-radius:16px;padding:12px;font-size:15px;font-weight:700;box-shadow:0 4px 16px #173e3433}
    .runner-intro{position:absolute;inset:0;pointer-events:none;--intro:0;--veil:1}
    .runner-intro::before{content:'';position:absolute;inset:0;background:#ede5c9;opacity:var(--veil)}
    .runner-intro-title{position:absolute;left:20px;right:20px;top:15%;text-align:center;opacity:var(--intro);transform:translateY(calc((1 - var(--intro)) * 18px));text-shadow:0 3px 16px #173e3480}
    .runner-intro-title small{font-size:12px;letter-spacing:.22em;font-weight:700}
    .runner-intro-title h1{font-size:clamp(34px,10vw,48px);line-height:1;margin:12px 0}
    .runner-intro-cue{position:absolute;bottom:16%;left:28px;right:28px;text-align:center;opacity:var(--intro);font-size:13px;font-weight:700;color:#fff8df;background:#173e34df;border:1px solid #d5e5bd66;border-radius:18px;padding:16px;line-height:1.5}
    .runner-intro-cue strong{display:block;font-size:21px;letter-spacing:.1em;margin-bottom:4px}
  `}));
  const stats=el('div',{class:'runner-stat'}),pause=el('button',{text:'II','aria-label':'Pause Temple Dash'});
  const statLabel=el('div'),goalFill=el('span');
  const goal=el('div',{class:'runner-goal',role:'progressbar','aria-label':'Mission coins','aria-valuemin':'0','aria-valuemax':String(RUNNER.coinGoal)},[goalFill]);
  stats.append(statLabel,goal);
  const sound=el('button',{class:'runner-sound',onClick:()=>{app.$store.isAudioMuted=!unwrap(app.$store.isAudioMuted);paint();}});
  const top=el('div',{class:'runner-top'},[stats,sound,pause]);
  const controls=el('div',{class:'runner-controls'});
  for(const [action,label] of [['left','←'],['jump','Jump'],['slide','Slide'],['right','→']]) controls.append(el('button',{text:label,'aria-label':`Runner ${action}`,onClick:()=>runnerAction(c.run,action)}));
  const card=el('div',{class:'runner-card'}),modal=el('div',{class:'runner-modal',role:'dialog','aria-modal':'true','aria-label':'Temple Dash'},[card]);
  const intro=el('div',{class:'runner-intro',hidden:true,'aria-label':'Entering Temple Dash'},[
    el('div',{class:'runner-intro-title'},[el('small',{text:'SHRINE 02'}),el('h1',{text:'Temple Dash'})]),
    el('div',{class:'runner-intro-cue'},[el('strong',{text:'GET READY'}),'Swipe to dodge · Up to jump · Down to slide'])
  ]);
  const milestone=el('div',{class:'runner-milestone',role:'status',hidden:true,text:'Mission complete! Keep going!'});
  const ui=el('section',{class:'runner-ui',hidden:true,'aria-label':'Temple Dash minigame'},[top,controls,intro,milestone,modal]);document.body.append(ui);
  for(const element of [top,controls,modal]) for(const event of ['pointerdown','touchstart','mousedown']) element.addEventListener(event,e=>e.stopPropagation(),{passive:true});
  let screen='',lastStats='',lastMuted=null,lastCoins=0,pickupAt=-1,milestoneAt=-1,lastMission=false;
  function paint() {
    const r=c.run;ui.hidden=!c.active;
    const muted=!!unwrap(app.$store.isAudioMuted);
    if(muted!==lastMuted){lastMuted=muted;sound.replaceChildren(svgIcon(muted?'sound-off':'sound-on'));sound.setAttribute('aria-label',muted?'Enable Temple Dash sound':'Mute Temple Dash sound');sound.setAttribute('aria-pressed',String(muted));}
    if(r.coins>lastCoins)pickupAt=r.elapsed;
    lastCoins=r.coins;stats.dataset.pickup=String(pickupAt>=0&&r.elapsed-pickupAt<.28);
    if(r.missionComplete&&!lastMission)milestoneAt=r.elapsed;
    lastMission=!!r.missionComplete;
    milestone.hidden=r.phase!=='running'||milestoneAt<0||r.elapsed-milestoneAt>2.5;
    const nextStats=r.missionComplete?`${r.coins} coins ✓  ·  ${Math.floor(r.distance)} m`:`${r.coins} / ${RUNNER.coinGoal} coins  ·  ${Math.floor(r.distance)} m`;
    if(nextStats!==lastStats){statLabel.textContent=lastStats=nextStats;goal.setAttribute('aria-valuenow',String(Math.min(RUNNER.coinGoal,r.coins)));goalFill.style.transform=`scaleX(${Math.min(1,r.coins/RUNNER.coinGoal)})`;}
    modal.hidden=!['paused','over'].includes(r.phase);intro.hidden=r.phase!=='intro';
    controls.hidden=r.phase!=='running';top.hidden=!['running','intro'].includes(r.phase);stats.hidden=r.phase==='intro';
    if(r.phase==='intro') {
      const p=Math.min(1,c.introTime/c.introDuration);
      intro.style.setProperty('--veil',Math.max(0,1-p*6));
      intro.style.setProperty('--intro',Math.min(1,p*5)*Math.min(1,(1-p)*5));
    }
    if(screen===r.phase) return;
    screen=r.phase;
    card.replaceChildren(el('small',{text:'SHRINE 02 / GLORB'}));
    const actions=el('div',{class:'runner-actions'});
    const button=(text,fn,secondary=false)=>el('button',{text,class:secondary?'secondary':'',onClick:fn});
    if(r.phase==='paused') {card.append(el('h1',{text:'Take a breath.'}),el('p',{text:'Your run is paused.'}));actions.append(button('Continue run',()=>{r.phase=c.pausedPhase||'running';c.lastTime=performance.now();paint();}));}
    else if(r.phase==='over') {card.append(el('h1',{text:'One more run?'}),el('p',{text:r.reason}),el('p',{text:`${Math.floor(r.distance)} metres · ${r.coins} coins · ${runnerScore(r)} points. Best: ${c.best}.`}));actions.append(button('Run again',()=>c.start()));}
    actions.append(button('BACK TO HUB',()=>app.__hub.returnFromRunner(),true));card.append(actions);
    if(!modal.hidden) actions.querySelector('button')?.focus({preventScroll:true});
  }
  c.start=()=>{c.run=createRunner(Math.floor(Math.random()*100000));c.run.phase='running';c.introTime=c.introDuration;c.camera?.reset(false);c.feedback?.start();pickupAt=milestoneAt=-1;lastMission=false;c.lastTime=performance.now();paint();};
  c.pause=()=>{if(c.active&&['running','intro'].includes(c.run.phase)){c.pausedPhase=c.run.phase;c.run.phase='paused';paint();}};
  pause.onclick=c.pause;
  c.open=scene=>{
    c.scene=scene;c.active=true;c.run=createRunner();c.run.phase='intro';c.introTime=0;screen='';pickupAt=milestoneAt=-1;lastMission=false;
    c.originalMainVisible=scene.main.visible;scene.main.visible=false;
    c.visuals=makeTemple(scene);c.visuals.draw(c.run);
    c.originalScale=scene.player.base.scale.clone();
    scene.player.updateOptions({}, {distance:11,elevation:5.8,intersectGround:false});
    scene.getCurrentCamera().lockPlayer('runner');
    c.camera=createRunnerCamera(scene,reducedMotion);c.camera.draw();
    c.feedback=createRunnerFeedback(app,scene);
    document.documentElement.classList.add('glorb-in-runner');
    if(!scene.player.__runnerHooked) {
      scene.player.__runnerHooked=true;
      const after=scene.player.afterUpdate.bind(scene.player);
      scene.player.afterUpdate=function(){
        after();
        if(!c.active) return;
        const origin=c.scene.getPoint('Spawn').position;
        this.base.position.set(origin.x,origin.y+jumpHeight(c.run),origin.z+c.run.lanePosition*RUNNER.laneWidth);
        this.base.scale.copy(c.originalScale);this.base.scale.y*=c.run.slide>0?.42:1;
        this.base.rotation.y=Math.PI/2;
        // Locomotion clips live separately from emotes in the recovered rig.
        // Drive the original Run clip from runner time while physics is locked.
        if(this.moveAnims?.Run) {
          for(const action of Object.values(this.allAnims)) action.weight=0;
          const run=this.moveAnims.Run;
          run.enabled=true;run.weight=run.scalarWeight=1;run.play();
          run.time=((c.run.elapsed+c.introTime*.45)*1.35)%run.getClip().duration;
          this.animationMixer.update(0);
        }
      };
    }
    c.lastTime=performance.now();paint();
  };
  c.close=()=>{
    c.active=false;c.camera?.destroy();c.camera=null;c.feedback?.destroy();c.feedback=null;c.visuals?.destroy();c.visuals=null;
    c.scene.main.visible=c.originalMainVisible;
    c.scene.player.base.scale.copy(c.originalScale);c.scene.player.setIdleAnimation?.();
    c.scene.getCurrentCamera().unlockPlayer('runner');
    document.documentElement.classList.remove('glorb-in-runner');ui.hidden=true;
  };
  const timer=setInterval(()=>{
    if(!app.$webgl?.hooks?.beforeFrame?.watch)return;clearInterval(timer);
    app.$webgl.hooks.beforeFrame.watch(()=>{
      if(!c.active)return;
      const now=performance.now(),dt=(now-c.lastTime)/1000;c.lastTime=now;
      if(document.hidden||innerWidth>innerHeight)c.pause();
      const before=c.run.phase;
      if(before==='intro') {
        c.introTime=Math.min(c.introDuration,c.introTime+Math.min(dt,.05));
        if(c.introTime>=c.introDuration){c.run.phase='running';c.feedback.start();}
      } else stepRunner(c.run,dt);
      if(before==='running'&&c.run.phase==='over') {
        c.best=Math.max(c.best,runnerScore(c.run));
        try{localStorage.setItem('glorb-temple-best',String(c.best));}catch{}
      }
      c.camera.update(c.run,dt,Math.min(1,c.introTime/c.introDuration));
      c.feedback.update(c.run,dt);
      c.visuals.draw(c.run);paint();
    });
  },50);
  const keyActions={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',ArrowUp:'jump',Space:'jump',KeyW:'jump',ArrowDown:'slide',KeyS:'slide'};
  window.addEventListener('keydown',e=>{
    if(!c.active||/INPUT|TEXTAREA|SELECT/.test(e.target?.tagName)||e.target?.isContentEditable)return;
    if(e.code==='Escape'){e.preventDefault();e.stopImmediatePropagation();c.pause();return;}
    if(!keyActions[e.code]||c.run.phase!=='running')return;
    e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)runnerAction(c.run,keyActions[e.code]);
  },true);
  let swipe=null;
  window.addEventListener('pointerdown',e=>{
    if(!c.active||c.run.phase!=='running'||e.isPrimary===false||e.target.closest('button'))return;
    swipe={id:e.pointerId,x:e.clientX,y:e.clientY};
    if(e.cancelable)e.preventDefault();
  },{passive:false});
  window.addEventListener('pointermove',e=>{
    if(swipe?.id===e.pointerId&&e.cancelable)e.preventDefault();
  },{passive:false});
  window.addEventListener('pointerup',e=>{
    if(!swipe||swipe.id!==e.pointerId)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;swipe=null;
    const threshold=Math.max(18,Math.min(innerWidth,innerHeight)*.055);
    if(Math.max(Math.abs(dx),Math.abs(dy))<threshold)return;
    runnerAction(c.run,Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'slide':'jump');
  });
  window.addEventListener('pointercancel',e=>{if(swipe?.id===e.pointerId)swipe=null;});
  window.addEventListener('blur',c.pause);document.addEventListener('visibilitychange',()=>{if(document.hidden)c.pause();});
  modal.addEventListener('keydown',e=>{
    if(e.key!=='Tab')return;const buttons=[...card.querySelectorAll('button')];const i=buttons.indexOf(document.activeElement);
    e.preventDefault();buttons[(i+(e.shiftKey?-1:1)+buttons.length)%buttons.length]?.focus();
  });
  return c;
}
