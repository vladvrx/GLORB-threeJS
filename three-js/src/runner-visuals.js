import { a$ as MeshBasicMaterial, b5 as Mesh, b7 as BufferGeometry, b6 as BufferAttribute, cd as Group } from '../../vendor/vendor.75f6e6ae65453426.js';
import { RUNNER } from './runner-model.js';

// Original, texture-free temple art. Vertex shading is baked, so the many small
// carvings and plants need neither extra materials nor realtime lights.
const C = { stone:0x74978e, pale:0xb7c9b0, dark:0x385f59, deep:0x214a46,
  sand:0xdfcc9c, cream:0xf1dfaf, grout:0x9e996e, moss:0x467c57,
  leaf:0x4d9a68, bright:0x87bd76, gold:0xe9ad43, glow:0xffe790,
  purple:0x9162b9, lilac:0xd3a6ef, ink:0x503871, bark:0x806d50 };
const linear = c => { c/=255; return c<=.04045 ? c/12.92 : ((c+.055)/1.055)**2.4; };
const palette = new Map();
function color(hex) {
  if (!palette.has(hex)) palette.set(hex,[linear(hex>>16&255),linear(hex>>8&255),linear(hex&255)]);
  return palette.get(hex);
}
function builder() {
  const positions=[], colors=[];
  const tri=(a,b,c,hex,shade=1)=>{
    const rgb=color(hex);
    for(const p of [a,b,c]) {positions.push(...p);colors.push(rgb[0]*shade,rgb[1]*shade,rgb[2]*shade);}
  };
  const quad=(a,b,c,d,hex,shade=1)=>{tri(a,b,c,hex,shade);tri(a,c,d,hex,shade);};
  function box(x,y,z,w,h,d,hex,turn=0,tilt=0) {
    const cy=Math.cos(turn),sy=Math.sin(turn),cz=Math.cos(tilt),sz=Math.sin(tilt);
    const p=Array.from({length:8},(_,i)=>{
      const px=(i&1?1:-1)*w/2,py=(i&2?1:-1)*h/2,pz=(i&4?1:-1)*d/2;
      const tx=px*cz-py*sz,ty=px*sz+py*cz;
      return [x+tx*cy+pz*sy,y+ty,z-tx*sy+pz*cy];
    });
    [[0,4,6,2,.73],[1,3,7,5,.84],[0,1,5,4,.62],[2,6,7,3,1],[0,2,3,1,.9],[4,5,7,6,.77]].forEach(([a,b,c,d,s])=>quad(p[a],p[b],p[c],p[d],hex,s));
  }
  function column(x,y,z,bottom,top,h,hex,n=8) {
    for(let i=0;i<n;i++) {
      const a=i*Math.PI*2/n,b=(i+1)*Math.PI*2/n;
      const lo=[x+Math.cos(a)*bottom,y-h/2,z+Math.sin(a)*bottom],lo2=[x+Math.cos(b)*bottom,y-h/2,z+Math.sin(b)*bottom];
      const hi=[x+Math.cos(a)*top,y+h/2,z+Math.sin(a)*top],hi2=[x+Math.cos(b)*top,y+h/2,z+Math.sin(b)*top];
      quad(lo,lo2,hi2,hi,hex,.76+.19*(.5+.5*Math.sin(a)));
      tri([x,y+h/2,z],hi,hi2,hex,1);
      tri([x,y-h/2,z],lo2,lo,hex,.6);
    }
  }
  function leaf(x,y,z,angle,length,width,droop,hex) {
    const dx=Math.cos(angle),dz=Math.sin(angle),px=-dz*width,pz=dx*width;
    const a=[x,y,z],tip=[x+dx*length,y-droop,z+dz*length];
    const mid=[x+dx*length*.48,y+.24,z+dz*length*.48];
    const left=[mid[0]+px,mid[1]-.12,mid[2]+pz],right=[mid[0]-px,mid[1]-.12,mid[2]-pz];
    tri(a,left,mid,hex,.82);tri(left,tip,mid,hex,.87);tri(a,mid,right,hex,1);tri(mid,tip,right,hex,.94);
  }
  function gem(x,y,z,w,h,d,hex) {
    const ring=[[x-w,y,z],[x,y,z-d],[x+w,y,z],[x,y,z+d]];
    for(let i=0;i<4;i++) {tri([x,y+h,z],ring[i],ring[(i+1)%4],hex,.78+i*.07);tri([x,y-h*.45,z],ring[(i+1)%4],ring[i],hex,.6+i*.06);}
  }
  return {positions,colors,box,column,leaf,gem,quad,tri};
}
function geometry(b) {
  const g=new BufferGeometry();
  g.setAttribute('position',new BufferAttribute(new Float32Array(b.positions),3));
  g.setAttribute('color',new BufferAttribute(new Float32Array(b.colors),3));
  g.computeBoundingSphere();return g;
}

function templeSection(variant) {
  const b=builder();
  // Three clear lanes: the dark joints and staggered inset stones add scale,
  // while all decorative planting stays beyond the playable causeway.
  for(let row=0;row<8;row++) for(let lane=-1;lane<=1;lane++) {
    const x=row*4-14,z=lane*3.2;
    b.box(x,-.075,z,3.86,.19,3.06,(row+lane+variant)%3===0?C.cream:C.sand);
    if((row+lane+variant)%4===0) {
      b.box(x,.023,z,2.6,.014,.075,C.grout);
      b.box(x,.025,z,.075,.014,1.92,C.grout);
      b.box(x,.035,z,.38,.02,.38,C.pale,Math.PI/4);
    }
  }
  for(const side of [-1,1]) {
    const z=side*5.38;
    b.box(0,-.28,z,32,.65,.62,C.dark);
    b.box(0,.1,z,32,.18,.72,C.pale);
    for(let i=0;i<8;i++) {
      const x=i*4-14;
      b.box(x,.21,z,3.65,.15,.56,i%3===0?C.moss:C.sand);
      if(i%2===0) {
        b.box(x,.58,z,1.05,.6,.85,C.stone);
        b.box(x,.93,z,1.2,.15,1.02,C.cream);
      }
    }
    for(let p=0;p<2;p++) {
      const x=p*16-8,pz=side*7.45;
      b.box(x,-.2,pz,3.7,.75,3.7,C.deep);
      b.box(x,.3,pz,3.3,.34,3.3,C.stone);
      b.box(x,.61,pz,2.8,.3,2.8,C.sand);
      b.column(x,3.9,pz,1.05,.85,6.3,C.stone);
      for(const y of [1.1,2.7,5.8,6.8]) b.column(x,y,pz,1.13,1.13,.2,y===2.7?C.dark:C.pale);
      // Carved face panel visible from the approach.
      b.box(x-1.04,4,pz,.08,1.72,1.13,C.dark);
      for(const dz of [-.33,.33]) b.box(x-1.1,4.24,pz+dz,.1,.23,.27,C.glow);
      b.box(x-1.11,3.77,pz,.12,.15,.61,C.pale);
      b.box(x,7.1,pz,2.4,.35,2.4,C.sand);
      b.box(x,7.45,pz,2.95,.35,2.95,C.pale);
      b.box(x,7.76,pz,2.2,.27,2.2,C.moss);
      if((variant+p)%3!==0) b.gem(x,8,pz,.77,.88,.77,C.stone);
      // Hanging segmented vines, with actual leaf silhouettes.
      for(let j=0;j<5;j++) {
        const vx=x+.52+Math.sin(j*1.8)*.17,vy=7.35-j*.56,vz=pz-side*1.04;
        b.box(vx,vy,vz,.1,.64,.1,C.moss);
        b.leaf(vx,vy,vz,side+j%2,.58,.18,.22,j%2?C.bright:C.leaf);
      }
      // Warm lanterns are opaque emissive-looking geometry, not point lights.
      b.box(x-2.4,1,pz-side*.6,.54,2,.54,C.dark);
      b.column(x-2.4,2.1,pz-side*.6,.46,.32,.22,C.gold,6);
      b.gem(x-2.4,2.4,pz-side*.6,.24,.5,.24,C.glow);
      b.box(x-2.4,2.94,pz-side*.6,.64,.13,.64,C.stone);
    }
    // Tropical silhouettes, differing heights and foliage shapes break repetition.
    for(let j=0;j<3;j++) {
      const x=j*10-10+variant*.3,pz=side*(11.8+(j%2)*2.3),h=4.1+(variant+j)%3;
      b.column(x,h/2,pz,.31,.18,h,C.bark,6);
      for(let f=0;f<7;f++) b.leaf(x,h,pz,f*Math.PI*2/7+j,2.8+(f%2)*.7,.44,1.25,f%2?C.leaf:C.bright);
      b.gem(x-.2,.38,pz-side*1.5,1.65,1.2,1.35,C.deep);
      for(let f=0;f<5;f++) b.leaf(x,.4,pz-side*2,f*1.26+j,1.65,.35,-.1,f%2?C.leaf:C.moss);
      b.gem(x+2,.1,pz-side*1.7,.85,.65,.7,C.stone);
    }
  }
  // Every third colonnade has an open, high lintel. Its lowest stone is 8.3m,
  // well above the player, gold jump barriers, and purple slide gates.
  if(variant%3===0) {
    b.box(-8,8.6,0,2,.6,17.1,C.dark);
    b.box(-8,9.05,0,2.7,.32,17.9,C.sand);
    b.box(-8,9.34,0,2.35,.24,17.4,C.pale);
    for(const z of [-5,-2.5,0,2.5,5]) b.box(-9.06,8.64,z,.16,.28,1.05,C.gold);
    b.box(-8,9.67,0,2.6,.45,3.9,C.stone);
    b.gem(-8,10,0,.7,.7,.7,C.gold);
  }
  return b;
}

function obstacle(kind) {
  const b=builder();
  if(kind==='wall') {
    b.box(0,.14,0,2.65,.28,2.75,C.dark);
    for(let y=0;y<4;y++) {
      b.box(0,.68+y*.86,0,2.38,.8,2.66,y%2?C.stone:C.pale);
      b.box(-1.205,.68+y*.86,y%2?.58:-.58,.04,.8,.055,C.dark);
    }
    b.box(0,3.96,0,2.65,.28,2.75,C.sand);
    b.box(-1.22,2.12,0,.08,1.28,1.5,C.dark);
    for(const z of [-.44,.44]) b.box(-1.28,2.32,z,.1,.22,.31,C.glow);
    b.box(-1.28,1.83,0,.1,.16,.83,C.pale);
    b.box(0,4.16,0,2.3,.14,2.48,C.moss);
  } else if(kind==='jump') {
    b.box(0,.8,0,1.2,1.6,2.75,C.gold);
    b.box(0,1.64,0,1.35,.12,2.75,C.glow);
    b.box(-.615,.75,0,.05,.87,2.29,0x9b6835);
    for(const z of [-.84,0,.84]) {
      // Bright rising chevrons show the required jump at a glance.
      b.box(-.66,.8,z-.13,.05,.12,.46,C.glow,0,0);
      b.box(-.66,1.03,z,.05,.28,.12,C.glow);
    }
    for(const z of [-1.22,1.22]) b.box(-.63,.81,z,.06,1.4,.13,C.cream);
  } else if(kind==='slide') {
    // The beam's lower edge remains exactly 2.15; supports hug the lane edges.
    for(const z of [-1.39,1.39]) {
      b.box(0,1.62,z,.76,3.24,.2,C.pale);
      b.box(0,.16,z,.91,.32,.22,C.ink);
    }
    b.box(0,3.05,0,1.3,1.8,3,C.purple);
    b.box(0,4.06,0,1.55,.22,3,C.lilac);
    b.box(0,2.24,0,1.4,.18,3,C.lilac);
    b.box(-.66,3.1,0,.05,.99,2.4,C.ink);
    for(const z of [-.8,0,.8]) {
      b.box(-.7,3.22,z,.05,.34,.14,C.lilac);
      b.box(-.7,2.95,z,.05,.13,.46,C.lilac);
    }
  } else {
    // An eight-sided gold token facing the runner, with a raised diamond seal.
    const n=8,r=.48;
    for(let i=0;i<n;i++) {
      const a=i*2*Math.PI/n,bn=(i+1)*2*Math.PI/n;
      const p=[-.12,1.8+Math.cos(a)*r,Math.sin(a)*r],q=[-.12,1.8+Math.cos(bn)*r,Math.sin(bn)*r];
      b.tri([-.12,1.8,0],p,q,C.glow,.97);
      b.quad(p,[.12,p[1],p[2]],[.12,q[1],q[2]],q,C.gold,.76);
      b.tri([.12,1.8,0],[.12,q[1],q[2]],[.12,p[1],p[2]],C.gold,.9);
    }
    b.quad([-.14,2.07,0],[-.14,1.8,.17],[-.14,1.53,0],[-.14,1.8,-.17],C.gold);
  }
  return b;
}

export function makeTemple(scene) {
  const root=new Group();root.name='glorb-temple-runner';
  root.position.copy(scene.getPoint('Spawn').position);
  const material=new MeshBasicMaterial({color:0xffffff,vertexColors:true,side:2,fog:true});
  const geometries=[],sections=[],batches=[];
  const mesh=b=>{const g=geometry(b);geometries.push(g);const m=new Mesh(g,material);root.add(m);return m;};
  const base=builder();base.box(70,-1.7,0,216,3,11.8,C.dark);base.box(70,-.2,0,216,.14,10.7,C.grout);mesh(base);
  for(let i=0;i<6;i++) sections.push(mesh(templeSection(i)));
  // Fixed GPU buffers, one draw per object kind. No mesh churn as rows pass.
  for(const kind of ['wall','jump','slide','coin']) {
    const template=obstacle(kind),count=kind==='coin'?32:8;
    const g=new BufferGeometry(),positions=new Float32Array(template.positions.length*count),colors=new Float32Array(template.colors.length*count);
    for(let i=0;i<count;i++) colors.set(template.colors,i*template.colors.length);
    g.setAttribute('position',new BufferAttribute(positions,3));g.setAttribute('color',new BufferAttribute(colors,3));g.setDrawRange(0,0);
    const m=new Mesh(g,material);m.frustumCulled=false;root.add(m);geometries.push(g);
    batches.push({kind,template,positions,geometry:g,capacity:count});
  }
  scene.base.add(root);
  function draw(r) {
    // Recycle only the section behind the camera. Modulo one section would
    // swap every carved/vegetated variant in view at once each 32 metres.
    for(let i=0;i<sections.length;i++) sections[i].position.x=((i*32-16-r.distance+32)%192+192)%192-32;
    for(const batch of batches) {
      let count=0;
      const src=batch.template.positions,dst=batch.positions;
      for(const o of r.objects) {
        if(o.kind!==batch.kind||o.done||count>=batch.capacity) continue;
        const x=o.at-r.distance,z=o.lane*RUNNER.laneWidth,start=count*src.length;
        const angle=o.kind==='coin'?Math.sin(r.elapsed*2.6+o.id*.5)*.5:0,cs=Math.cos(angle),sn=Math.sin(angle);
        for(let i=0;i<src.length;i+=3) {
          dst[start+i]=x+src[i]*cs+src[i+2]*sn;
          dst[start+i+1]=src[i+1];
          dst[start+i+2]=z-src[i]*sn+src[i+2]*cs;
        }
        count++;
      }
      batch.geometry.setDrawRange(0,count*src.length/3);
      batch.geometry.attributes.position.needsUpdate=true;
    }
  }
  root.userData.artBudget={sceneryDrawCalls:7,objectDrawCalls:4,maxDrawCalls:11,sceneryTriangles:geometries.slice(0,7).reduce((n,g)=>n+g.attributes.position.count/3,0)};
  return {root,draw,destroy(){root.removeFromParent();geometries.forEach(g=>g.dispose());material.dispose();}};
}
