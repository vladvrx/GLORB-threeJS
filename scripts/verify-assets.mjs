import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const assets=path.join(root,'reference/assets');
const preserved=['character.df6ab95f65453426.glb','Asset_BoatYellow.9ec7874765453426.glb','databeach-logo.png'];
const report={preserved:{},generated:{},introMatchesOriginal:false};
for(const name of preserved) {
  const current=fs.readFileSync(path.join(assets,name));
  const original=execFileSync('git',['show','origin/main:reference/assets/'+name],{cwd:root,maxBuffer:10000000});
  assert(current.equals(original),name+' changed');
  report.preserved[name]=createHash('sha256').update(current).digest('hex');
}
const original=JSON.parse(execFileSync('git',['show','origin/main:reference/assets/dialogs_en.json'],{cwd:root}));
assert.deepEqual(JSON.parse(fs.readFileSync(path.join(assets,'dialogs_en.json'))).Intro,original.Intro);
report.introMatchesOriginal=true;
for(const name of fs.readdirSync(assets).filter(n=>/^glorb-.*\.(glb|wav)$/.test(n))) {
  const data=fs.readFileSync(path.join(assets,name));
  if(name.endsWith('.glb')) {
    const gltf=JSON.parse(data.subarray(20,20+data.readUInt32LE(12)));
    assert.equal(gltf.asset.generator,'GLORB original procedural geometry');
    for(const mesh of gltf.meshes)for(const primitive of mesh.primitives)assert.notEqual(primitive.indices,undefined);
    report.generated[name]={bytes:data.length,meshes:gltf.meshes.length};
  } else {
    assert.equal(data.toString('ascii',0,4),'RIFF');
    let peak=0,sum=0;
    for(let i=44;i<data.length;i+=2){const v=data.readInt16LE(i)/32768;peak=Math.max(peak,Math.abs(v));sum+=v*v;}
    assert(peak>0 && peak<1,'Silent or clipped audio: '+name);
    report.generated[name]={bytes:data.length,seconds:(data.length-44)/data.readUInt32LE(28),peak,rms:Math.sqrt(sum/((data.length-44)/2))};
  }
}
if(process.argv[2]) {
  const stage=path.resolve(process.argv[2]);
  const files=fs.readdirSync(path.join(stage,'reference/assets'),{recursive:true});
  const models=files.filter(n=>/\.(glb|gltf)$/i.test(n)).sort();
  assert.deepEqual(models,[...preserved.filter(n=>n.endsWith('.glb')),...Object.keys(report.generated).filter(n=>n.endsWith('.glb'))].sort());
  const audio=files.filter(n=>/\.(m4a|mp3|wav|ogg|flac)$/i.test(n)).sort();
  assert.deepEqual(audio,['glorb-air.wav','glorb-music.wav','glorb-sounds.wav']);
  for(const name of preserved)assert(fs.readFileSync(path.join(stage,'reference/assets',name)).equals(fs.readFileSync(path.join(assets,name))));
  const site=fs.readFileSync(path.join(stage,'direct-port/data/site.json'),'utf8');
  assert(!/coastal\s*points|data b-each points|"cp"\s*:/i.test(site));
  report.package={stage,models,audio};
}
fs.writeFileSync(path.join(root,'docs/asset-verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
