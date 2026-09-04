import fs from 'node:fs';
for (const name of fs.readdirSync('reference/assets').filter(n=>n.endsWith('.glb'))) {
  const buffer=fs.readFileSync('reference/assets/'+name);
  const length=buffer.readUInt32LE(12);
  const data=JSON.parse(buffer.subarray(20,20+length).toString());
  console.log(name,JSON.stringify({generator:data.asset?.generator,meshes:data.meshes?.map(m=>m.name),nodes:data.nodes?.map(n=>n.name)}));
}
