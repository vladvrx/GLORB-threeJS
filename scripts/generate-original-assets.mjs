// Original procedural geometry and audio. No source mesh or audio samples are
// copied into these replacements. The entrant's character and UFO stay intact.
import fs from 'node:fs';
import path from 'node:path';
import {parse} from '@babel/parser';
const ROOT=path.resolve(import.meta.dirname,'..');
const ASSETS=path.join(ROOT,'reference/assets');
let seed=714021;
function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
function geometry(){return {position:[],normal:[],uv:[]};}
function triangle(g,a,b,c,uv=[.5,.5]) {
  const u=b.map((v,i)=>v-a[i]),v=c.map((v,i)=>v-a[i]);
  const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],len=Math.hypot(...n)||1;
  for(const p of [a,b,c]){g.position.push(...p);g.normal.push(...n.map(x=>x/len));g.uv.push(...uv);}
}
function box(g,c,size) {
  const points=Array.from({length:8},(_,i)=>c.map((x,j)=>x+size[j]*((i>>j&1)?0.5:-0.5)));
  for(const [a,b,c,d] of [[0,4,6,2],[1,3,7,5],[0,1,5,4],[2,6,7,3],[0,2,3,1],[4,5,7,6]]) {triangle(g,points[a],points[b],points[c]);triangle(g,points[a],points[c],points[d]);}
}
function column(g,c,radius,height,segments=12,topScale=1) {
  for(let i=0;i<segments;i++) {
    const a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2;
    const p=[c[0]+Math.cos(a)*radius,c[1],c[2]+Math.sin(a)*radius],q=[c[0]+Math.cos(b)*radius,c[1],c[2]+Math.sin(b)*radius];
    const r=[c[0]+Math.cos(a)*radius*topScale,c[1]+height,c[2]+Math.sin(a)*radius*topScale],s=[c[0]+Math.cos(b)*radius*topScale,c[1]+height,c[2]+Math.sin(b)*radius*topScale];
    triangle(g,p,r,q);triangle(g,q,r,s);triangle(g,r,[c[0],c[1]+height,c[2]],s);triangle(g,p,q,c);
  }
}
function glb(file,parts) {
  const binary=[],views=[],accessors=[],meshes=[],nodes=[];
  let offset=0;
  for(const [name,g] of parts) {
    const attributes={};
    for(const [key,type,components] of [['position','VEC3',3],['normal','VEC3',3],['uv','VEC2',2]]) {
      const array=new Float32Array(g[key]),buffer=Buffer.from(array.buffer);
      const view=views.length;views.push({buffer:0,byteOffset:offset,byteLength:buffer.length,target:34962});
      offset+=buffer.length;binary.push(buffer);
      const accessor={bufferView:view,componentType:5126,count:array.length/components,type};
      if(key==='position') {accessor.min=[Infinity,Infinity,Infinity];accessor.max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<array.length;i++){const j=i%3;accessor.min[j]=Math.min(accessor.min[j],array[i]);accessor.max[j]=Math.max(accessor.max[j],array[i]);}}
      attributes[key==='uv'?'TEXCOORD_0':key.toUpperCase()]=accessors.length;accessors.push(accessor);
    }
    // The recovered geometry merger requires an index even for unique vertices.
    const indices=new Uint32Array(g.position.length/3);
    for(let i=0;i<indices.length;i++) indices[i]=i;
    const indexBuffer=Buffer.from(indices.buffer),indexView=views.length;
    views.push({buffer:0,byteOffset:offset,byteLength:indexBuffer.length,target:34963});
    binary.push(indexBuffer);offset+=indexBuffer.length;
    const indexAccessor=accessors.length;
    accessors.push({bufferView:indexView,componentType:5125,count:indices.length,type:'SCALAR'});
    meshes.push({name,primitives:[{attributes,indices:indexAccessor,mode:4,material:0}]});nodes.push({name,mesh:meshes.length-1});
  }
  const data={asset:{version:'2.0',generator:'GLORB original procedural geometry'},scene:0,scenes:[{nodes:nodes.map((_,i)=>i)}],nodes,meshes,materials:[{pbrMetallicRoughness:{baseColorFactor:[.45,.85,.68,1],metallicFactor:0,roughnessFactor:1}}],buffers:[{byteLength:offset}],bufferViews:views,accessors};
  const raw=Buffer.from(JSON.stringify(data)),json=Buffer.alloc(Math.ceil(raw.length/4)*4,32);raw.copy(json);
  const bin=Buffer.concat(binary),out=Buffer.alloc(28+json.length+bin.length);
  out.writeUInt32LE(0x46546c67,0);out.writeUInt32LE(2,4);out.writeUInt32LE(out.length,8);
  out.writeUInt32LE(json.length,12);out.writeUInt32LE(0x4e4f534a,16);json.copy(out,20);
  out.writeUInt32LE(bin.length,20+json.length);out.writeUInt32LE(0x004e4942,24+json.length);bin.copy(out,28+json.length);
  fs.writeFileSync(path.join(ASSETS,file),out);
}
const palm=geometry();column(palm,[0,0,0],.19,2.7,7,.7);
for(let i=0;i<7;i++) {const a=i/7*Math.PI*2,tip=[Math.cos(a)*1.8,2.8,Math.sin(a)*1.8],left=[Math.cos(a+.45)*.85,3.3,Math.sin(a+.45)*.85],right=[Math.cos(a-.45)*.85,3.3,Math.sin(a-.45)*.85];triangle(palm,[0,2.7,0],left,tip);triangle(palm,[0,2.7,0],tip,right);triangle(palm,tip,left,[0,2.7,0]);triangle(palm,right,tip,[0,2.7,0]);}
glb('glorb-palm.glb',[['Mesh',palm]]);
const rock=geometry();column(rock,[0,-.15,0],.7,.6,7,.5);glb('glorb-rock.glb',[['Mesh',rock]]);
const west=geometry();box(west,[-153.8588555,2.6,13.567255],[104,2.4,112]);glb('glorb-island.glb',[['SceneBase',west]]);
const intro=geometry();
for(let i=0;i<32;i++) {
  const a=i/32*Math.PI*2,b=(i+1)/32*Math.PI*2;
  const p=[135+Math.cos(a)*(100+6*Math.sin(a*5)),1.4,-60+Math.sin(a)*120],q=[135+Math.cos(b)*(100+6*Math.sin(b*5)),1.4,-60+Math.sin(b)*120];
  triangle(intro,[135,1.4,-60],q,p);triangle(intro,p,q,[q[0],-6,q[2]]);triangle(intro,p,[q[0],-6,q[2]],[p[0],-6,p[2]]);
}
glb('glorb-arrival-island.glb',[['SceneBase',intro]]);

const RATE=22050,TAU=Math.PI*2;
function wave(file,samples) {
  const out=Buffer.alloc(44+samples.length*2);out.write('RIFF',0);out.writeUInt32LE(out.length-8,4);out.write('WAVEfmt ',8);out.writeUInt32LE(16,16);out.writeUInt16LE(1,20);out.writeUInt16LE(1,22);out.writeUInt32LE(RATE,24);out.writeUInt32LE(RATE*2,28);out.writeUInt16LE(2,32);out.writeUInt16LE(16,34);out.write('data',36);out.writeUInt32LE(samples.length*2,40);
  for(let i=0;i<samples.length;i++)out.writeInt16LE(Math.round(Math.max(-.9,Math.min(.9,samples[i]))*32767),44+i*2);
  fs.writeFileSync(path.join(ASSETS,file),out);
}
const audioSourcePath=path.join(ROOT,'vendor/webgl.3250e36a65453426.js');
let audioSource=fs.readFileSync(audioSourcePath,'utf8');
const tree=parse(audioSource,{sourceType:'module'});
let audioLiteral;
function visit(node){if(!node||typeof node!=='object')return;if(node.type==='StringLiteral'&&node.value.startsWith('[["music_minigame_jingle"'))audioLiteral=node;for(const [key,value] of Object.entries(node)){if(['loc','extra'].includes(key))continue;if(Array.isArray(value))value.forEach(visit);else if(value&&typeof value==='object')visit(value);}}
visit(tree);
if(!audioLiteral)throw Error('Audio registry not found');
const oldCues=JSON.parse(audioLiteral.value),cues=[],tones=[];
let cursor=0;
for(const [id,variations] of oldCues) {
  const count=Array.isArray(variations)?variations.length:1,list=[];
  for(let k=0;k<count;k++) {
    const duration=id.includes('loop')?2:id.includes('syllab')?.15:id.includes('quest')||id.includes('finish')?1.1:id.includes('Camera')||id.includes('transition')?.42:.16;
    const start=cursor,end=start+duration;
    list.push([start,end,duration]);tones.push({id,k,start,duration});cursor=end+.05;
  }
  cues.push(Array.isArray(variations)?[id,list]:[id,...list[0]]);
}
const effects=new Float32Array(Math.ceil(cursor*RATE));
for(const cue of tones)for(let i=0;i<cue.duration*RATE;i++) {
  const t=i/RATE,p=t/cue.duration,frequency=cue.id.includes('loop')?85:cue.id.includes('syllab')?190+cue.k*27:440+(tones.indexOf(cue)%7)*65;
  const envelope=Math.min(1,t*180)*Math.pow(1-p,2),v=Math.sin(TAU*frequency*t+Math.sin(TAU*9*t)*.7);
  effects[Math.floor(cue.start*RATE)+i]+=.24*envelope*v;
}
wave('glorb-sounds.wav',effects);
const music=new Float32Array(RATE*32),roots=[130.8128,110,174.6141,146.8324],steps=[0,7,12,4,7,16,12,7];
for(let i=0;i<music.length;i++) {
  const t=i/RATE,bar=Math.floor(t/8),beat=Math.floor(t/.5),age=t%0.5,f=roots[bar]*2**(steps[beat%8]/12);
  const envelope=Math.min(1,age*100)*Math.exp(-age*7),edge=Math.min(1,t*2,(32-t)*2);
  music[i]=edge*(.12*envelope*Math.sin(TAU*f*t)+.045*Math.sin(TAU*roots[bar]*t));
}
wave('glorb-music.wav',music);
const air=new Float32Array(RATE*6);let low=0;
for(let i=0;i<air.length;i++){low=low*.98+(random()*2-1)*.02;const t=i/RATE;air[i]=low*.35*(.65+.35*Math.sin(TAU*t/6));}
wave('glorb-air.wav',air);

// Bulk mechanical asset-reference migration; no original geometry/audio copied.
audioSource=audioSource.slice(0,audioLiteral.start)+JSON.stringify(JSON.stringify(cues))+audioSource.slice(audioLiteral.end);
audioSource=audioSource.replace(/\.\/reference\/assets\/audiosprites\.[a-z0-9]+\.m4a/g,'./reference/assets/glorb-sounds.wav').replace(/\.\/reference\/assets\/music_[a-z_]+\.[a-z0-9]+\.m4a/g,'./reference/assets/glorb-music.wav').replace(/\.\/reference\/assets\/sfx_amb_[a-zA-Z_]+\.[a-z0-9]+\.m4a/g,'./reference/assets/glorb-air.wav');
fs.writeFileSync(audioSourcePath,audioSource);
const mainPath=path.join(ROOT,'vendor/vendor.75f6e6ae65453426.js');
let main=fs.readFileSync(mainPath,'utf8');
const replacement={
  'Asset_PalmTree.f4a68a0e65453426.glb':'glorb-palm.glb',
  'Asset_RockA.3a9f348865453426.glb':'glorb-rock.glb',
  'Scene_IslandIntro.0c97e26b65453426.glb':'glorb-arrival-island.glb',
  'Scene_IslandWest.68c3fec765453426.glb':'glorb-island.glb',
};
for(const [old,next] of Object.entries(replacement)) main=main.replaceAll(old,next);
fs.writeFileSync(mainPath,main);
console.log('Generated four original meshes, synthesized music, ambient sound and '+cues.length+' sound cues.');
