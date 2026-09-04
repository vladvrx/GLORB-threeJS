import fs from 'node:fs';
import {parse} from '@babel/parser';
for (const file of ['vendor/vendor.75f6e6ae65453426.js','vendor/webgl.3250e36a65453426.js']) {
  const source=fs.readFileSync(file,'utf8'), tree=parse(source,{sourceType:'module'});
  console.log(file);
  for (const n of tree.program.body) {
    const line=n.loc.start.line;
    if ((file.includes('/vendor.') && ((line>4120 && line<4300)||(line>25100&&line<25500)||(line>4800&&line<5500)||(line>7250&&line<8300)))) {
      console.log(line,n.loc.end.line,source.slice(n.start,n.start+130).replaceAll('\n',' '));
    }
  }
}
