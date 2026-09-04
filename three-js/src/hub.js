import { a$ as MeshBasicMaterial, b5 as Mesh, b7 as BufferGeometry, b6 as BufferAttribute, cd as Group } from '../../vendor/vendor.75f6e6ae65453426.js';
import { GLORB_ISLAND as island } from './island.js';
import { el } from './dom.js';

// The hub and Level One share the recovered controller and collision floor.
// Only this additive scenery layer is toggled; Level One's assets stay intact.
function buildHub(scene) {
  const group = new Group();
  group.name = 'glorb-hub';
  group.position.set(island.cx, island.floorY, island.cz);
  const positions = [], colors = [];
  function triangle(a, b, c, color, shade = 1) {
    for (const p of [a, b, c]) {
      positions.push(...p);
      colors.push(((color >> 16) & 255) / 255 * shade, ((color >> 8) & 255) / 255 * shade, (color & 255) / 255 * shade);
    }
  }
  function box(x, y, z, w, h, d, color) {
    const p = Array.from({ length: 8 }, (_, i) => [x + (i & 1 ? 1 : -1) * w / 2, y + (i & 2 ? 1 : -1) * h / 2, z + (i & 4 ? 1 : -1) * d / 2]);
    [[0,4,6,2],[1,3,7,5],[0,1,5,4],[2,6,7,3],[0,2,3,1],[4,5,7,6]].forEach(([a,b,c,d], i) => {
      triangle(p[a], p[b], p[c], color, .72 + i * .05);
      triangle(p[a], p[c], p[d], color, .72 + i * .05);
    });
  }
  function disc(x, z, rx, rz, color, y = .055) {
    for (let i = 0; i < 48; i++) {
      const a = i / 48 * Math.PI * 2, b = (i + 1) / 48 * Math.PI * 2;
      triangle([x,y,z], [x + Math.cos(b)*rx,y,z + Math.sin(b)*rz], [x + Math.cos(a)*rx,y,z + Math.sin(a)*rz], color);
    }
  }
  box(0, .015, 0, 104, .025, 112, 0xf3dba0);
  disc(0, 0, 46, 50, 0x83c99c);
  disc(0, 2, 20, 22, 0xf8e5b2, .07);
  box(3, .09, 8, 9, .025, 57, 0xf8e5b2);
  box(17, .1, 10, 45, .025, 7, 0xf8e5b2);
  disc(0, 3, 8, 8, 0xe2b875, .12);
  disc(0, 3, 6.8, 6.8, 0xfaf1d2, .13);
  function palm(x,z,h,turn) {
    box(x,h/2,z,.85,h,.85,0xa98459);
    for(let i=0;i<7;i++) {
      const a=turn+i*Math.PI*2/7;
      triangle([x,h,z], [x+Math.cos(a-.4)*3.1,h+1.2,z+Math.sin(a-.4)*3.1], [x+Math.cos(a)*6,h-1,z+Math.sin(a)*6], 0x429d71, .8+i*.025);
      triangle([x,h,z], [x+Math.cos(a)*6,h-1,z+Math.sin(a)*6], [x+Math.cos(a+.4)*3.1,h+1.2,z+Math.sin(a+.4)*3.1], 0x62bc78, .8+i*.025);
    }
    disc(x,z,3.2,2.1,0x69b28c,.075);
  }
  [[-28,-28],[-16,-37],[18,-34],[33,-23],[36,4],[29,30],[13,39],[-17,36],[-34,22],[-36,-4],[-27,5],[24,-12]].forEach(([x,z],i)=>palm(x,z,8+i%3*1.5,i));
  for(let i=0;i<16;i++) {
    const a=i*2.4, x=Math.cos(a)*40, z=Math.sin(a)*43;
    box(x,.65,z,2+i%3,.95+i%2,2.3,0x8caaa5);
    disc(x+2,z+1,1.6,1.1,0xd1e89e,.08);
  }
  // The entrance is a mint arch opening toward the arrival plaza.
  box(30,4,5,2.4,8,1.8,0xf5edcf);
  box(30,4,15,2.4,8,1.8,0xf5edcf);
  box(30,8,10,2.4,2,12,0x53cba9);
  box(30,9.5,10,2,1,7,0xffd55d);
  box(28.7,8,10,.15,1.4,.5,0x286b58);
  disc(30,10,3,5,0x85e7d3,.14);
  // Low benches and a small garden leave the paths clear.
  for(const x of [-14,17]) {
    box(x,1,21,5,.7,1.8,0xc49163);
    box(x-1.7,.5,21,.5,1,1.2,0x775e52);
    box(x+1.7,.5,21,.5,1,1.2,0x775e52);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position',new BufferAttribute(new Float32Array(positions),3));
  geometry.setAttribute('color',new BufferAttribute(new Float32Array(colors),3));
  geometry.computeVertexNormals();
  group.add(new Mesh(geometry,new MeshBasicMaterial({vertexColors:true,side:2,fog:true})));
  scene.base.add(group);
  return group;
}

export function installHub(app) {
  if (app.__hub) return app.__hub;
  const c = { active:false, scene:null, group:null, busy:false, savedPhase:'briefing', savedPage:'briefing', levelPosition:null };
  app.__hub = c;
  const style = el('style', {text: `
    .hub-ui{position:fixed;inset:0;z-index:65;pointer-events:none;font-family:Gilmer,sans-serif;color:#163e39}
    .hub-ui[hidden],.hub-ui [hidden]{display:none!important}
    .hub-location{position:absolute;top:calc(env(safe-area-inset-top) + 84px);left:18px;right:18px;text-align:center;font-weight:700;letter-spacing:.18em;font-size:12px;color:#fff8e8;text-shadow:0 2px 8px #163e3999}
    .hub-location strong{display:block;font-size:25px;letter-spacing:-.03em;margin-top:5px}
    .hub-panel{position:absolute;bottom:calc(env(safe-area-inset-bottom) + 92px);left:22px;right:22px;max-width:380px;margin:auto;background:#fff8e8ed;border:2px solid #fff9e7;border-radius:22px;padding:16px 18px;box-shadow:0 6px 0 #28685e20}
    .hub-panel p{margin:0 0 10px;font-size:13px;line-height:1.45}.hub-panel h2{font-size:22px;margin:0 0 5px}
    .hub-ui button{pointer-events:auto;cursor:pointer;border:0;font:700 15px Gilmer,sans-serif;border-radius:14px;background:#256956;color:#fff;padding:14px 18px;min-height:46px;width:100%}
    .hub-ui button:focus-visible{outline:3px solid #ffc64b;outline-offset:4px}
    .hub-return{position:absolute;bottom:calc(env(safe-area-inset-bottom) + 48px);left:14px;width:auto!important;font-size:12px!important;padding:10px 14px!important;background:#fff8e8!important;color:#256956!important}
    html.glorb-in-hub .survival-hud,html.glorb-in-hub .survival-modal,html.glorb-in-hub .paint-progress,html.glorb-in-hub .dance-button{display:none!important}
  `});
  document.head.append(style);
  const label = el('div',{class:'hub-location'},['GLORB',el('strong',{text:'The Hub'})]);
  const title = el('h2',{text:'01 / The paint square'});
  const info = el('p',{text:'A little land. A lot of colour. Head through the mint arch to begin.'});
  const enter = el('button',{text:'Enter Level One',type:'button'});
  const panel = el('div',{class:'hub-panel'},[title,info,enter]);
  const back = el('button',{class:'hub-return',text:'← Hub',type:'button','aria-label':'Return to hub',hidden:true});
  const ui = el('section',{class:'hub-ui',hidden:true,'aria-label':'World navigation'},[label,panel,back]);
  document.body.append(ui);
  for(const root of [panel,back]) for(const event of ['pointerdown','touchstart','mousedown']) root.addEventListener(event,e=>e.stopPropagation(),{passive:true});
  function paint() {
    ui.hidden = !c.scene;
    label.hidden = panel.hidden = !c.active;
    back.hidden = c.active;
    document.documentElement.classList.toggle('glorb-in-hub',c.active);
    document.documentElement.classList.remove('survival-blocked','glorb-hurt');
    if(app.__survival?.visuals) app.__survival.visuals.group.visible = !c.active;
    if(app.__paintState?.mesh) app.__paintState.mesh.visible = !c.active;
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
    });
  },50);
  return c;
}
