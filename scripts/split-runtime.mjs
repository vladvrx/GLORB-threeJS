// One-time mechanical extraction of identifiable third-party library ranges
// from the supplied recovered chunks. No gameplay code is classified as vendor.
import fs from 'node:fs';
import path from 'node:path';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
const traverse=traverseModule.default, generate=generatorModule.default;
const definitions=[
  {file:'vendor/vendor.75f6e6ae65453426.js', groups:[
    {name:'vue-runtime-router.js',start:'function t(e, t) {',end:'let eo, to;'},
    {name:'three-r150.js',start:'const Nx = 0,',end:'function mL(e, t, s = 0)'},
    {name:'crypto-js.js',start:'var wv = ',end:'const Xv = '},
    {name:'font-observer-emitter.js',start:'var xG = {',end:'export { fn as $,'},
  ]},
  {file:'vendor/webgl.3250e36a65453426.js',groups:[
    {name:'gltf-loader.js',start:'function Ta() {',end:'async function In('},
  ]},
];
for(const def of definitions) {
  const source=fs.readFileSync(def.file,'utf8');
  const tree=parse(source,{sourceType:'module'});
  const groups=def.groups.map(g=>({...g,a:source.indexOf(g.start),b:source.indexOf(g.end)}));
  for(const g of groups) if(g.a<0||g.b<g.a) throw Error(`Missing boundaries: ${g.name}`);
  const owner=n=>groups.find(g=>n.start>=g.a&&n.end<=g.b)?.name||'game';
  let scope;
  traverse(tree,{Program(p){scope=p.scope;}});
  const vars=new Map(Object.entries(scope.bindings).map(([name,binding])=>[name,{binding,owner:owner(binding.path.node)}]));
  const moves=[];
  for(const g of groups) {
    const body=tree.program.body.filter(n=>owner(n)===g.name);
    const names=[...vars].filter(([n,v])=>v.owner===g.name).map(([n])=>n);
    const imports=new Map();
    for(const [name,{binding,owner:own}] of vars) {
      if(own===g.name) continue;
      if(binding.referencePaths.some(p=>p.node.start>=g.a&&p.node.end<=g.b)) {
        const file=own==='game'?'./'+path.basename(def.file):'./'+own;
        if(!imports.has(file)) imports.set(file,[]);
        imports.get(file).push(name);
      }
    }
    console.log(g.name,{declarations:names.length,bytes:g.b-g.a,imports:Object.fromEntries(imports)});
    if(!process.argv.includes('--apply')) continue;
    const importText=[...imports].map(([file,names])=>`import { ${names.join(', ')} } from ${JSON.stringify(file)};`).join('\n');
    const library=`// Extracted third-party code from supplied GLORB base. See THIRD_PARTY.md.\n${importText}\n${generate({type:'File',program:{type:'Program',sourceType:'module',body}},{comments:true,compact:false}).code}\nexport { ${names.join(', ')} };\n`;
    fs.writeFileSync('vendor/'+g.name,library);
    moves.push({a:g.a,b:g.b,text:`import { ${names.join(', ')} } from './${g.name}';\n`});
  }
  if(process.argv.includes('--apply')) {
    // Dependencies needed by extracted code must remain named exports. Imported
    // aliases are exported too; their definitions still live in the pure libs.
    const needed=new Set();
    for(const [name,{binding,owner:own}] of vars) {
      if(own!=='game') continue;
      if(binding.referencePaths.some(p=>groups.some(g=>p.node.start>=g.a&&p.node.end<=g.b))) needed.add(name);
    }
    const existing=new Set(tree.program.body.filter(n=>n.type==='ExportNamedDeclaration').flatMap(n=>n.specifiers.map(s=>s.exported.name)));
    let output=source;
    for(const m of moves.sort((a,b)=>b.a-a.a)) output=output.slice(0,m.a)+m.text+output.slice(m.b);
    const extra=[...needed].filter(n=>!existing.has(n));
    if(extra.length) output+='\nexport { '+extra.join(', ')+' };\n';
    fs.writeFileSync(def.file,output);
  }
}
