import { a$ as MeshBasicMaterial, b5 as Mesh, b7 as BufferGeometry, b6 as BufferAttribute, cd as Group } from '../../vendor/vendor.75f6e6ae65453426.js';
import { GLORB_ISLAND as island } from './island.js';

// Static, baked vertex colors keep this entire garden at one draw call. Every
// shape is original geometry; no image textures, lights or per-frame work.
export function buildHub(scene) {
  const group = new Group();
  group.name = 'glorb-hub';
  group.position.set(island.cx, island.floorY, island.cz);
  const positions = [], colors = [];
  const colliders=[];
  const C = { floor:0x08090b, cream:0xffe7af, path:0x101216, grass:0x39e95a, moss:0x619c78, leaf:0x42936b, leafLight:0x79bc78, stone:0xc8d1bb, darkStone:0x97afaa, wood:0xa57854, bark:0xc69d69, mint:0x5ec5a8, violet:0x9474bd, gold:0xeebf62 };
  const circleCollider=(x,z,radius)=>colliders.push({kind:'circle',x,z,radius});
  const boxCollider=(x,z,width,depth,turn=0)=>colliders.push({kind:'box',x,z,width,depth,turn});
  function tri(a,b,c,color,shade=1) {
    for(const p of [a,b,c]) {
      positions.push(...p);
      colors.push(((color>>16)&255)/255*shade,((color>>8)&255)/255*shade,(color&255)/255*shade);
    }
  }
  function quad(a,b,c,d,color,shade=1) { tri(a,b,c,color,shade); tri(a,c,d,color,shade); }
  function polygon(points,y,color) {
    const center=points.reduce((a,p)=>[a[0]+p[0]/points.length,y,a[2]+p[1]/points.length],[0,y,0]);
    points.forEach((p,i)=>{const q=points[(i+1)%points.length];tri(center,[q[0],y,q[1]],[p[0],y,p[1]],color);});
  }
  function ring(x,z,rx,rz,n=20,turn=0) {
    return Array.from({length:n},(_,i)=>{const a=i/n*Math.PI*2+turn;return [x+Math.cos(a)*rx,z+Math.sin(a)*rz];});
  }
  function disc(x,z,rx,rz,color,y=.065,n=24) { polygon(ring(x,z,rx,rz,n),y,color); }
  function loft(bottom,top,y0,y1,color) {
    for(let i=0;i<bottom.length;i++) {
      const j=(i+1)%bottom.length;
      quad([bottom[i][0],y0,bottom[i][1]],[top[i][0],y1,top[i][1]],[top[j][0],y1,top[j][1]],[bottom[j][0],y0,bottom[j][1]],color,.77+.2*(.5+.5*Math.cos(i/bottom.length*Math.PI*2-.8)));
    }
    polygon(top,y1,color);
  }
  function bevelRing(x,z,w,d,b=.15,turn=0) {
    return [[-w/2+b,-d/2],[w/2-b,-d/2],[w/2,-d/2+b],[w/2,d/2-b],[w/2-b,d/2],[-w/2+b,d/2],[-w/2,d/2-b],[-w/2,-d/2+b]].map(([u,v])=>[x+u*Math.cos(turn)-v*Math.sin(turn),z+u*Math.sin(turn)+v*Math.cos(turn)]);
  }
  function block(x,y,z,w,h,d,color,b=.15,turn=0) {
    const inset=Math.min(.08,w*.16,d*.16), bevelHeight=Math.min(.06,h*.25);
    const r=bevelRing(x,z,w,d,Math.min(b,w*.24,d*.24),turn);
    const t=bevelRing(x,z,w-inset,d-inset,Math.min(b,w*.2,d*.2),turn);
    loft(r,r,y-h/2,y+h/2-bevelHeight,color);loft(r,t,y+h/2-bevelHeight,y+h/2,color);
  }
  function stone(x,y,z,w,h,d,color,turn=0) {
    const a=ring(x,z,w/2,d/2,7,turn), b=ring(x+.08*w,z-.06*d,w*.42,d*.41,7,turn);
    loft(a,b,y,y+h*.7,color);loft(b,ring(x+.1*w,z-.08*d,w*.22,d*.23,7,turn),y+h*.7,y+h,color);
  }
  function cylinder(x,y,z,r0,r1,h,color,n=8) { loft(ring(x,z,r0,r0,n),ring(x,z,r1,r1,n),y,y+h,color); }
  function diamond(x,y,z,rx,ry,rz,color) {
    const p=[[x-rx,y,z],[x,y,z+rz],[x+rx,y,z],[x,y,z-rz]];
    p.forEach((a,i)=>{tri(a,[x,y+ry,z],p[(i+1)%4],color,.84+i*.045);tri(a,p[(i+1)%4],[x,y-ry,z],color,.67+i*.05);});
  }
  // Preserve the full 104 x 112 walkable rectangle. The beach is layered inside
  // that boundary so there are no invisible cliffs at the recovered collision edge.
  block(0,-.05,0,104,.14,112,C.floor,.5);
  for(let i=0;i<3;i++) {
    const outline=bevelRing(0,0,101-i*3,109-i*3,10+i);
    polygon(outline,.035+i*.009,[0x101216,0x171a1f,0x20242a][i]);
  }
  const lawn=Array.from({length:64},(_,i)=>{const a=i/64*Math.PI*2;const bump=1+.024*Math.sin(a*7)+.016*Math.cos(a*11);return [Math.cos(a)*44*bump,Math.sin(a)*48*bump];});
  polygon(lawn,.07,C.grass);
  // Painted grass uses broad shapes and a few readable leaf marks instead of
  // noisy pixels. It is baked into the same mesh, with no texture or animation.
  const grassStart=positions.length;
  let grassSeed=491;
  const grassRandom=()=>{grassSeed=(Math.imul(grassSeed,1664525)+1013904223)>>>0;return grassSeed/4294967296;};
  function insideLawn(x,z,margin=0) {
    return (x/(42-margin))**2+(z/(46-margin))**2<1;
  }
  function clearGrass(x,z,margin=0) {
    if(!insideLawn(x,z,margin)) return false;
    if(((x-3)/(20.7+margin))**2+((z-6)/(22.7+margin))**2<1) return false;
    if(x>0-margin&&x<10+margin&&z>-31-margin&&z<29+margin) return false;
    for(const pathZ of [10,-13]) {
      if(x>-5-margin&&x<39+margin&&Math.abs(z-pathZ)<4.6+margin) return false;
      if(((x-30)/(6.6+margin))**2+((z-pathZ)/(7.6+margin))**2<1) return false;
    }
    return true;
  }
  // Patches sit below paving. Uneven, widely spaced edges avoid a tiled look.
  let grassPatches=0;
  for(let z=-40;z<=40;z+=8) for(let x=-40;x<=40;x+=8) {
    const px=x+(grassRandom()-.5)*2.5,pz=z+(grassRandom()-.5)*2.5;
    if(!insideLawn(px,pz,4)) continue;
    const rx=2.5+grassRandom()*1.5,rz=2.2+grassRandom()*1.4;
    const edge=Array.from({length:10},(_,j)=>{
      const a=j/10*Math.PI*2,r=.85+grassRandom()*.25;
      return [px+Math.cos(a)*rx*r,pz+Math.sin(a)*rz*r];
    });
    polygon(edge,.074,[0x27c947,0x4ff365,0x22db49,0x62f878][grassPatches%4]);
    grassPatches++;
  }
  // Short folded blades catch a bright face and a dark face at the fixed camera.
  // Rejection sampling leaves the arrival plaza and both shrine approaches clean.
  let grassTufts=0,cloverMarks=0;
  for(let i=0;i<1400&&grassTufts<290;i++) {
    const x=(grassRandom()-.5)*84,z=(grassRandom()-.5)*92;
    if(!clearGrass(x,z,.7)) continue;
    const turn=grassRandom()*Math.PI*2,size=.7+grassRandom()*.5;
    for(let j=0;j<3;j++) {
      const a=turn+(j-1)*.8,dx=Math.cos(a),dz=Math.sin(a);
      const height=(j===1?.56:.38)*size,bend=(j-1)*.1+.26;
      const root=[x,.081,z],tip=[x+dx*bend*size,height,z+dz*bend*size];
      const left=[x-dz*.105*size,.087,z+dx*.105*size];
      const right=[x+dz*.105*size,.087,z-dx*.105*size];
      tri(left,tip,root,grassTufts%3?0x13b43f:0x6dff82);
      tri(root,tip,right,grassTufts%3?0x52ef6d:0x9aff9a);
    }
    grassTufts++;
    if(grassTufts%5===0&&clearGrass(x+.85,z+.6,.7)) {
      const cx=x+.85,cz=z+.6;
      for(let j=0;j<3;j++) {
        const a=turn+j*Math.PI*2/3,dx=Math.cos(a),dz=Math.sin(a);
        const root=[cx,.082,cz],tip=[cx+dx*.4,.083,cz+dz*.4];
        const left=[cx+dx*.22-dz*.17,.083,cz+dz*.22+dx*.17];
        const right=[cx+dx*.22+dz*.17,.083,cz+dz*.22-dx*.17];
        tri(root,left,tip,0x9aff9a);tri(root,tip,right,0x72f57e);
      }
      cloverMarks++;
    }
  }
  const grassTriangles=(positions.length-grassStart)/9;
  // Warm garden beds frame a wide, level network of paths.
  disc(3,6,20,22,C.path,.085,48);
  block(5,.09,-1,8,.02,58,C.path,.6);
  block(17,.105,10,42,.025,7.8,C.path,.5);
  block(18,.105,-13,40,.025,7.8,C.path,.5);
  for(const z of [10,-13]) {
    for(let j=0;j<13;j++) {
      const x=5+j*2.05;
      for(const side of [-1,1]) block(x,.155,z+side*3.8,1.74,.16,.48,j%3?0xd8c39a:0xe4cfa9,.1);
      if(j%2===0) block(x,.13,z-.45+Math.sin(j)*.3,1.25,.055,2.25,0xe4cda5,.2,.09*Math.sin(j));
    }
  }
  // Arrival mosaic sits west of the spawn, leaving local (9,10) unobstructed.
  disc(-3,7,7.6,7.6,0xd2b389,.14,40);
  disc(-3,7,7.05,7.05,0xf7e9c7,.15,40);
  disc(-3,7,5.7,5.7,0xb8d7bc,.16,32);
  disc(-3,7,5.3,5.3,0xece3bc,.17,32);
  for(let i=0;i<12;i++) {
    const a=i/12*Math.PI*2;
    const x=-3+Math.cos(a)*6.3,z=7+Math.sin(a)*6.3;
    block(x,.18,z,.6,.025,.6,i%2?C.mint:C.gold,.12,a);
  }
  for(let i=0;i<8;i++) {
    const a=i*Math.PI/4;
    tri([-3,.185,7],[-3+Math.cos(a-.16)*3.5,.185,7+Math.sin(a-.16)*3.5],[-3+Math.cos(a+.16)*3.5,.185,7+Math.sin(a+.16)*3.5],i%2?C.mint:0x94b9a0);
  }
  function frond(x,y,z,a,length,width,color) {
    const left=[],right=[],spine=[];
    const arch=length>3?1.3:.5, droop=length>3?1.6:.08;
    for(let j=0;j<=5;j++) {
      const t=j/5,r=length*t,w=width*Math.sin(Math.PI*t)*(.9+.1*t);
      const p=[x+Math.cos(a)*r,y+Math.sin(t*Math.PI)*arch-t*t*droop,z+Math.sin(a)*r];
      spine.push([p[0],p[1]+w*.22,p[2]]);
      left.push([p[0]-Math.sin(a)*w,p[1],p[2]+Math.cos(a)*w]);
      right.push([p[0]+Math.sin(a)*w,p[1],p[2]-Math.cos(a)*w]);
    }
    for(let j=0;j<5;j++) {
      quad(left[j],spine[j],spine[j+1],left[j+1],color,.93);
      quad(spine[j],right[j],right[j+1],spine[j+1],color,.77);
    }
  }
  function palm(x,z,h,a) {
    circleCollider(x,z,.72);
    disc(x+.7,z+.4,3.2,2.5,0x70a67d,.082);
    const lean=1.4;
    for(let j=0;j<9;j++) {
      const t=j/9,u=(j+1)/9;
      const px=x+Math.cos(a)*t*t*lean,pz=z+Math.sin(a)*t*t*lean;
      const qx=x+Math.cos(a)*u*u*lean,qz=z+Math.sin(a)*u*u*lean;
      const r=.56-t*.25;
      loft(ring(px,pz,r,r,7,a),ring(qx,qz,r-.025,r-.025,7,a),t*h,u*h,j%2?C.bark:C.wood);
      cylinder(px,t*h+.035,pz,r+.045,r+.045,.10,0xcda776,7);
    }
    const tx=x+Math.cos(a)*lean,tz=z+Math.sin(a)*lean;
    for(let j=0;j<8;j++) frond(tx,h,tz,a+j*Math.PI/4,5.3+(j%3)*.4,.8+(j%2)*.22,j%2?C.leaf:C.leafLight);
    for(let j=0;j<3;j++) {
      const q=a+j*2.1;stone(tx+Math.cos(q)*.5,h-.55,tz+Math.sin(q)*.5,.65,.72,.65,0x816345,q);
    }
    for(let j=0;j<3;j++) frond(x,.18,z,a+j*2.1,1.5,.42,C.leaf);
  }
  [[-28,-28],[-14,-37],[14,-35],[38,-29],[39,0],[31,31],[12,39],[-16,35],[-34,22],[-35,-5],[-23,1],[19,25]].forEach(([x,z],i)=>palm(x,z,8.2+i%3*.85,i*1.8));
  function shrub(x,z,size,seed) {
    circleCollider(x,z,size*.82);
    disc(x,z,size*1.5,size*1.2,C.moss,.086,12);
    for(let j=0;j<5;j++) {
      const a=j*2.4+seed;
      stone(x+Math.cos(a)*size*.6,.12,z+Math.sin(a)*size*.55,size*1.45,size*.85,size*1.3,j%2?0x75ae74:0x568f69,a);
    }
  }
  function flower(x,z,seed) {
    const h=.5+(seed%3)*.13;
    cylinder(x,.08,z,.045,.035,h,0x649367,5);
    for(let j=0;j<5;j++) {
      const a=j*Math.PI*2/5;
      diamond(x+Math.cos(a)*.16,h,z+Math.sin(a)*.16,.17,.08,.17,[0xf4b8a0,0xffe4a5,0xd5bbdd][seed%3]);
    }
    diamond(x,h+.08,z,.10,.07,.10,C.gold);
  }
  for(let i=0;i<24;i++) {
    const a=i*2.4,x=Math.cos(a)*(34+i%3*2.5),z=Math.sin(a)*(39+i%3*2);
    // Keep both gateways and their straight approach lanes clear.
    if(x>19&&z>-22&&z<19) continue;
    const w=1.6+i%3*.65,d=1.5+i%3*.45;
    stone(x,.08,z,w,.8+i%2*.5,d,i%2?C.stone:C.darkStone,a);
    circleCollider(x,z,Math.max(w,d)*.42);
    if(i%3===0) shrub(x-2,z+1.4,1.2,a);
  }
  [[-14,-12],[-18,18],[15,20],[19,-23],[-11,-27],[28,23],[-27,27],[30,-29]].forEach(([x,z],i)=>{
    shrub(x,z,1.3,i);
    for(let j=0;j<7;j++) flower(x+Math.cos(j*2.4)*2.5,z+Math.sin(j*2.4)*2,i+j);
  });
  function bench(x,z,turn) {
    boxCollider(x,z,5.2,2.15,turn);
    const point=(u,v)=>[x+u*Math.cos(turn)-v*Math.sin(turn),z+u*Math.sin(turn)+v*Math.cos(turn)];
    for(const u of [-1.7,1.7]) {const p=point(u,0);block(p[0],.65,p[1],.48,1.3,1.55,0x6d7d6e,.08,turn);}
    for(let j=0;j<4;j++){const p=point(0,-.65+j*.43);block(p[0],1.3,p[1],5,.24,.34,C.wood,.08,turn);}
    for(const u of [-1.8,1.8]) {const p=point(u,.8);block(p[0],1.55,p[1],.24,2,.25,0x6d7d6e,.05,turn);}
    for(let j=0;j<2;j++){const p=point(0,.8);block(p[0],1.95+j*.42,p[1],5,.32,.23,C.bark,.06,turn);}
  }
  bench(-15,22,-.2);bench(12,25,.15);bench(-16,-18,.2);
  function lantern(x,z,color) {
    circleCollider(x,z,.62);
    block(x,.2,z,1.1,.4,1.1,C.darkStone,.13);
    cylinder(x,.4,z,.20,.14,1.4,C.wood,6);
    block(x,2,z,.78,.7,.78,0xffe6ad,.12);
    for(const u of [-.37,.37]) for(const v of [-.37,.37]) block(x+u,2,z+v,.09,.85,.09,C.wood,.015);
    loft(bevelRing(x,z,1.15,1.15,.12),bevelRing(x,z,.6,.6,.12),2.4,2.75,color);
    diamond(x,2.83,z,.13,.2,.13,C.gold);
  }
  function shrine(z,accent,isRunner) {
    const x=30;
    disc(x,z,6,7,C.moss,.12,32);
    disc(x,z,5.3,6.3,isRunner?0xc7b3d4:0xb6dec6,.145,32);
    disc(x,z,4.9,5.8,0xe6ddbe,.16,32);
    disc(x,z,3.2,4.1,accent,.185,24);
    disc(x,z,2.65,3.5,isRunner?0xc1a8d8:0x9cdac1,.20,24);
    // Pillar outlines remain outside the 3.8-unit entry radius.
    for(const side of [-1,1]) {
      const pz=z+side*5.1;
      boxCollider(x,pz,3.3,3.15);
      block(x,.3,pz,3.3,.6,3.15,C.darkStone,.3);
      block(x,.8,pz,2.8,.4,2.65,C.stone,.25);
      for(let j=0;j<5;j++) {
        block(x,1.45+j*1.12,pz,2.2-j*.05,1.03,2.05-j*.03,isRunner?0xccbd9f:0xd5dbc3,.17);
        if(j===1||j===3) block(x-1.125,1.45+j*1.12,pz,.065,.24,1.4,accent,.018);
      }
      block(x,6.72,pz,2.7,.45,2.6,accent,.2);
      block(x,7.13,pz,3,.37,2.8,C.cream,.22);
      // Diamond reliefs and inset colored flutes on the arrival-facing stones.
      diamond(x-1.15,4,pz,.08,.65,.48,accent);
      block(x-1.19,2.9,pz,.07,.09,1.1,C.gold,.015);
      shrub(x+1.2,pz+side*1.2,.85,side);
      lantern(x-4.3,pz+side*.7,accent);
    }
    block(x,7.65,z,3.2,.75,13.25,C.cream,.3);
    block(x-.02,8.18,z,3.55,.43,13.9,accent,.24);
    block(x,8.56,z,2.9,.35,12.8,accent,.2);
    block(x,8.88,z,2.35,.33,11.6,C.gold,.16);
    // Layered roof and corner finials give each gate a readable silhouette.
    loft(bevelRing(x,z,3.6,14.3,.3),bevelRing(x,z,1.6,8.3,.25),9.02,10.1,accent);
    block(x,10.18,z,1.8,.25,8.6,C.cream,.16);
    for(const side of [-1,1]) diamond(x,9.48,z+side*6.5,.42,.95,.42,C.gold);
    diamond(x,11.15,z,isRunner?.78:.64,1.0,.8,isRunner?C.gold:C.mint);
    // One mint diamond / two amber chevrons distinguish the games without text.
    block(x-1.88,8.14,z,.08,.86,2.7,isRunner?0x6d518f:0x398e78,.04);
    if(isRunner) for(const dz of [-.5,.5]) {
      quad([x-1.94,8.43,z+dz-.25],[x-1.94,8.43,z+dz+.03],[x-1.94,8.14,z+dz+.3],[x-1.94,8.14,z+dz+.02],C.cream);
      quad([x-1.94,8.14,z+dz+.02],[x-1.94,8.14,z+dz+.3],[x-1.94,7.85,z+dz+.03],[x-1.94,7.85,z+dz-.25],C.cream);
    } else diamond(x-1.95,8.14,z,.02,.32,.38,C.cream);
  }
  shrine(10,C.mint,false);
  shrine(-13,C.violet,true);
  for(const [x,z] of [[5,17],[5,-21],[-8,18]]) lantern(x,z,C.mint);
  // Small beach details use only a few triangles and stay away from pathways.
  for(let i=0;i<36;i++) {
    const a=i*2.4,x=Math.cos(a)*(47+i%2),z=Math.sin(a)*(51+i%2);
    stone(x,.07,z,.32+i%3*.12,.11,.28+i%3*.09,i%2?0xf9f0d4:0xd6c297,a);
  }
  const geometry=new BufferGeometry();
  geometry.setAttribute('position',new BufferAttribute(new Float32Array(positions),3));
  geometry.setAttribute('color',new BufferAttribute(new Float32Array(colors),3));
  geometry.computeBoundingSphere();
  const mesh=new Mesh(geometry,new MeshBasicMaterial({vertexColors:true,side:2,fog:true}));
  mesh.name='hub-garden-and-two-shrines-baked';
  group.add(mesh);
  group.userData.colliders=colliders;
  group.userData.artBudget={drawCalls:1,triangles:positions.length/9,vertexBytes:(positions.length+colors.length)*4,textures:0,grassTriangles,grassPatches,grassTufts,cloverMarks};
  scene.base.add(group);
  return group;
}
