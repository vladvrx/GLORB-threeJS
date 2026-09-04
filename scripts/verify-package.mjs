import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {spawnSync,spawn} from 'node:child_process';
const ROOT=path.resolve(import.meta.dirname,'..');
const zip=path.join(ROOT,'deliverables/GLORB-Survival.zip');
if(fs.statSync(zip).size>35_000_000) throw Error('ZIP too large');
const extracted=fs.mkdtempSync(path.join(ROOT,'deliverables/verified-survival-'));
const result=spawnSync('powershell.exe',['-NoProfile','-Command',
  "$ErrorActionPreference='Stop'; Add-Type -AssemblyName System.IO.Compression.FileSystem; $archive=[IO.Compression.ZipFile]::OpenRead($env:GLORB_ZIP); foreach($entry in $archive.Entries){if($entry.FullName -match '(^[\\/]|(^|[\\/])\.\.([\\/]|$)|:)'){throw 'Unsafe ZIP entry'}}; $archive.Dispose(); [IO.Compression.ZipFile]::ExtractToDirectory($env:GLORB_ZIP,$env:GLORB_EXTRACT)"],
  {env:{...process.env,GLORB_ZIP:zip,GLORB_EXTRACT:extracted},encoding:'utf8'});
if(result.status!==0) throw Error(result.stderr||'Unpack failed');
const files=fs.readdirSync(extracted,{recursive:true}).filter(f=>fs.statSync(path.join(extracted,f)).isFile());
if(!files.includes('index.html')) throw Error('Missing root index.html');
for(const file of files) if(/\.(js|mjs|cjs)$/.test(file)&&!file.startsWith('vendor'+path.sep)) throw Error('Application JS outside index: '+file);
const index=fs.readFileSync(path.join(extracted,'index.html'),'utf8');
for(const name of ['createRun','stepRun','installSurvival','installPaint']) if(!index.includes(name)) throw Error('Missing inline gameplay: '+name);
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.wasm':'application/wasm','.glb':'model/gltf-binary','.png':'image/png','.m4a':'audio/mp4','.wav':'audio/wav','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file=path.resolve(extracted,'.'+(pathname==='/'?'/index.html':pathname));
    if(!file.startsWith(extracted+path.sep)){res.writeHead(403).end();return;}
    const data=fs.readFileSync(file);
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(data);
  } catch {res.writeHead(404).end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url=`http://127.0.0.1:${server.address().port}/`;
console.log('Testing actual unpacked ZIP',extracted,url);
const child=spawn(process.execPath,['node_modules/@playwright/test/cli.js','test',...process.argv.slice(2)],{cwd:ROOT,env:{...process.env,GLORB_URL:url},stdio:'inherit'});
const exit=await new Promise(resolve=>child.on('exit',resolve));
server.close();
fs.writeFileSync(path.join(ROOT,'deliverables/package-verification.json'),JSON.stringify({zip,bytes:fs.statSync(zip).size,extracted,files:files.length,testExitCode:exit,verifiedAt:new Date().toISOString()},null,2));
process.exitCode=exit||0;
