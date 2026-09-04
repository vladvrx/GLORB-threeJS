// Mechanical alias relinking after extraction; pure vendor modules must not
// import the application whose code will live inside index.html.
import fs from 'node:fs';
import {parse} from '@babel/parser';
import generatorModule from '@babel/generator';
const generate=generatorModule.default;
const main=parse(fs.readFileSync('vendor/vendor.75f6e6ae65453426.js','utf8'),{sourceType:'module'});
const web=parse(fs.readFileSync('vendor/webgl.3250e36a65453426.js','utf8'),{sourceType:'module'});
const lib=parse(fs.readFileSync('vendor/gltf-loader.js','utf8'),{sourceType:'module'});
const exports=new Map(main.program.body.filter(n=>n.type==='ExportNamedDeclaration').flatMap(n=>n.specifiers.map(s=>[s.exported.name,s.local.name])));
const mainImports=new Map(main.program.body.filter(n=>n.type==='ImportDeclaration').flatMap(n=>n.specifiers.map(s=>[s.local.name,{file:n.source.value,name:s.imported.name}])));
const webImports=new Map(web.program.body.filter(n=>n.type==='ImportDeclaration').flatMap(n=>n.specifiers.map(s=>[s.local.name,s.imported.name])));
const imports=new Map();
const constants=[];
for(const node of lib.program.body.filter(n=>n.type==='ImportDeclaration')) {
  for(const spec of node.specifiers) {
    const original=exports.get(webImports.get(spec.local.name));
    const target=mainImports.get(original);
    if(!target) {
      // Identical primitive constant deduplicated by the recovered bundler.
      const declaration=main.program.body.flatMap(n=>n.declarations||[]).find(d=>d.id.name===original);
      if(!['NumericLiteral','StringLiteral','BooleanLiteral'].includes(declaration?.init?.type)) throw Error('Non-library dependency: '+original);
      console.log('Primitive',spec.local.name,original,declaration.init.value);
      constants.push(`const ${spec.local.name} = ${JSON.stringify(declaration.init.value)};`);
      continue;
    }
    if(!imports.has(target.file)) imports.set(target.file,[]);
    imports.get(target.file).push(`${target.name} as ${spec.local.name}`);
  }
}
console.log(Object.fromEntries(imports));
if(process.argv.includes('--apply')) {
  const header=[...imports].map(([file,names])=>`import { ${names.join(', ')} } from ${JSON.stringify(file)};`).join('\n');
  lib.program.body=lib.program.body.filter(n=>n.type!=='ImportDeclaration');
  fs.writeFileSync('vendor/gltf-loader.js',header+'\n'+constants.join('\n')+'\n'+generate(lib,{compact:false,comments:true}).code+'\n');
}
