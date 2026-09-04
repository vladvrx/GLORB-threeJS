// Remove the recovered currency presentation without touching intro dialogue.
import fs from 'node:fs';
import {parse} from '@babel/parser';
const file='vendor/vendor.75f6e6ae65453426.js';
let source=fs.readFileSync(file,'utf8');
const edits=[];
function visit(node) {
  if(!node || typeof node!=='object') return;
  if(node.type==='CallExpression' && node.callee.name==='rn' && ['M_','F_','ex'].includes(node.arguments[1]?.name)) {
    edits.push([node.start,node.end,'un("", !0)']);return;
  }
  if(node.type==='CallExpression' && node.callee.type==='MemberExpression' && node.callee.object.name==='s_' && node.callee.property.name==='get' && node.arguments[0]?.value==='phone-point') {
    edits.push([node.start,node.end,'null']);return;
  }
  for(const [key,value] of Object.entries(node)) {
    if(['loc','extra'].includes(key))continue;
    if(Array.isArray(value))value.forEach(visit);else if(value&&typeof value==='object')visit(value);
  }
}
visit(parse(source,{sourceType:'module'}));
for(const [start,end,value] of edits.sort((a,b)=>b[0]-a[0]))source=source.slice(0,start)+value+source.slice(end);
fs.writeFileSync(file,source);
console.log(`Removed ${edits.length} currency presentation expressions.`);
