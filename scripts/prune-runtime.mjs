// Mechanical, dependency-aware cleanup of the supplied two-scene runtime.
// Removed declarations and registry entries are recorded for review.
import fs from 'node:fs';
import path from 'node:path';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
const traverse=traverseModule.default,generate=generatorModule.default;
const MAIN='vendor/vendor.75f6e6ae65453426.js',WEB='vendor/webgl.3250e36a65453426.js';
const trees=new Map([MAIN,WEB].map(f=>[f,parse(fs.readFileSync(f,'utf8'),{sourceType:'module'})]));
const removed=[];
const key=p=>p.key?.name||p.key?.value;
traverse(trees.get(MAIN),{
  VariableDeclarator(p){
    if(p.node.id.name==='FU') {p.node.init.properties=p.node.init.properties.filter(v=>{const keep=['IslandWest','IslandIntro'].includes(key(v));if(!keep)removed.push('scene '+key(v));return keep;});}
    if(p.node.id.name==='bz') {const object=p.node.init.arguments[0];object.properties=object.properties.filter(v=>{const keep=key(v)==='./NPC/NPCIntroActor.js';if(!keep)removed.push('actor '+key(v));return keep;});}
  },
  ObjectProperty(p){
    const k=key(p.node);
    if(typeof k!=='string'||!k.startsWith('/blender/Exports/'))return;
    let value=p.node.value;
    if(value.type==='Identifier')value=p.scope.getBinding(value.name)?.path?.node?.init;
    if(value?.type==='StringLiteral') {
      const file=value.value.split('?')[0];
      const denied=/Asset_(Taxi|TaxiRaw|JoystickRaw)|_ao[_.]|Scene_(Circuit|Test|Easter)/.test(k);
      if(denied||!fs.existsSync(path.resolve(file))) {removed.push('asset reference '+k);p.remove();}
    } else if(/Scene_(?!IslandIntro[._]|IslandWest[._])/.test(k)) {removed.push('scene data '+k);p.remove();}
  },
});
// These transition components no longer have a caller after restricting travel
// to the retained UFO. Drop their implementations rather than stub them.
traverse(trees.get(WEB),{ClassDeclaration(p){if(['So','Co'].includes(p.node.id.name)){removed.push('transition '+p.node.id.name);p.remove();}}});
const webExports=trees.get(WEB).program.body.filter(n=>n.type==='ExportNamedDeclaration');
for(const n of webExports)n.specifiers=n.specifiers.filter(s=>s.exported.name==='loadWebGL');
function isPure(p) {
  if(!p?.node)return true;
  if(p.isPure())return true;
  if(p.isCallExpression()) {
    const n=p.node,c=n.callee;
    if(c.type==='MemberExpression'&&c.object.name==='Object'&&['freeze','defineProperty','assign'].includes(c.property.name)&&n.arguments[0]?.type==='ObjectExpression')return true;
    if(c.type==='Identifier'&&['WL','te'].includes(c.name))return true;
  }
  return false;
}
function trim(file) {
  const tree=trees.get(file);let count=0;
  traverse(tree,{Program(p){
    p.scope.crawl();
    for(const [name,b] of Object.entries(p.scope.bindings)) {
      const prep=b.referencePaths.filter(r=>r.parentPath.isMemberExpression()&&r.parent.property.name==='prepare'&&r.parentPath.parentPath.isAssignmentExpression()&&r.parentPath.parentPath.parentPath.isExpressionStatement());
      if(b.referencePaths.length!==prep.length)continue;
      if(b.constantViolations.length)continue;
      const def=b.path;
      // A destructured declaration can own several live bindings. Never remove
      // the whole declaration because only one destructured name is unused.
      if(def.isVariableDeclarator() && def.node.id.type!=='Identifier') continue;
      if(def.isImportSpecifier()||def.isImportDefaultSpecifier()){def.remove();count++;continue;}
      if(!def.isFunctionDeclaration()&&!def.isClassDeclaration()&&!(def.isVariableDeclarator()&&isPure(def.get('init'))))continue;
      prep.forEach(r=>r.parentPath.parentPath.parentPath.remove());
      removed.push(file+': '+name);def.remove();count++;
    }
  }});
  return count;
}
function runtimeFiles(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?runtimeFiles(path.join(dir,e.name)):e.name.endsWith('.js')?[path.join(dir,e.name)]:[]);}
const consumers=runtimeFiles('three-js/src').map(f=>parse(fs.readFileSync(f,'utf8'),{sourceType:'module'}));
for(let iteration=0;iteration<30;iteration++) {
  let count=trim(WEB);
  const exportsNeeded=new Set();
  for(const tree of [trees.get(WEB),...consumers])for(const node of tree.program.body)if(node.type==='ImportDeclaration'&&node.source.value.includes('vendor.75f6'))for(const spec of node.specifiers)exportsNeeded.add(spec.imported.name);
  for(const node of trees.get(MAIN).program.body.filter(n=>n.type==='ExportNamedDeclaration')) node.specifiers=node.specifiers.filter(s=>exportsNeeded.has(s.exported.name));
  count+=trim(MAIN);
  if(!count)break;
}
for(const [file,tree] of trees)fs.writeFileSync(file,generate(tree,{compact:false,comments:true}).code+'\n');
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/runtime-removals.json',JSON.stringify(removed,null,2)+'\n');
console.log('Removed '+removed.length+' registry entries / unused declarations.');
