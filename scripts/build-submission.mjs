#!/usr/bin/env node
// All application JS and CSS live in root index.html; only identified
// third-party code is emitted under vendor/. No runtime downloads are allowed.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {build} from 'esbuild';
const ROOT=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUTPUT=path.join(ROOT,'deliverables');
fs.mkdirSync(OUTPUT,{recursive:true});
const STAGE=fs.mkdtempSync(path.join(OUTPUT,'survival-stage-'));
const OUT=path.join(OUTPUT,'GLORB-Survival.zip');
const LIBRARIES=['vue-runtime-router.js','three-r150.js','crypto-js.js','font-observer-emitter.js','gltf-loader.js'];
const MODELS=new Set(['character.df6ab95f65453426.glb','Asset_BoatYellow.9ec7874765453426.glb','glorb-palm.glb','glorb-rock.glb','glorb-island.glb','glorb-arrival-island.glb']);
const AUDIO=new Set(['glorb-music.wav','glorb-sounds.wav','glorb-air.wav']);
const CSS=['reference/assets/vendor.a83843c365453426.css','direct-port/styles/recovered-game.css','reference/assets/game-cursor.css','direct-port/styles/direct-port-ui.css','three-js/styles.css','reference/assets/studio-preloader.css','three-js/survival.css'];
const slash=s=>s.split(path.sep).join('/');
const escapeScript=s=>s.replace(/<\/script/gi,'<\\/script');
const result=await build({
  absWorkingDir:ROOT,entryPoints:['scripts/jam-engine.js'],bundle:true,write:false,
  format:'esm',platform:'browser',target:['es2020'],minify:false,legalComments:'inline',
  treeShaking:true,metafile:true,
  plugins:[{name:'offline-paths',setup(b){
    b.onResolve({filter:/./},args=>{
      const bare=args.path.split('?')[0], name=path.basename(bare);
      if(LIBRARIES.includes(name)) return {path:'./vendor/'+name,external:true};
      if(bare!==args.path) return {path:path.resolve(args.resolveDir,bare)};
    });
  }}],
});
const code=result.outputFiles[0].text;
const css=CSS.map(file=>fs.readFileSync(path.join(ROOT,file),'utf8').replace(/url\((['"]?)([^'")]+)\1\)/g,(all,q,raw)=>{
  if(/^(data:|#|https?:)/.test(raw)) return all;
  return `url(${q}./${slash(path.relative(ROOT,path.resolve(ROOT,path.dirname(file),raw.split('?')[0])))}${q})`;
})).join('\n');
const studio=fs.readFileSync(path.join(ROOT,'reference/assets/studio-bridge.js'),'utf8');
const bootstrap=`
document.documentElement.classList.remove('no-js');
const dataResponse = await fetch('./direct-port/data/site.json');
if (!dataResponse.ok) throw new Error('Missing local game data');
window.__DATA = await dataResponse.json();
__DATA.project.basepath = new URL('./', document.baseURI).pathname;
__DATA.project.url = './';
__DATA.project.origin = location.origin;
__DATA.page.route.url = './';
`;
fs.mkdirSync(path.join(STAGE,'vendor'),{recursive:true});
for(const file of LIBRARIES) {
  const library=fs.readFileSync(path.join(ROOT,'vendor',file),'utf8').replaceAll('./reference/vendors/draco/','./vendor/draco/');
  fs.writeFileSync(path.join(STAGE,'vendor',file),library);
}
fs.cpSync(path.join(ROOT,'reference/vendors/draco'),path.join(STAGE,'vendor/draco'),{recursive:true});
for(const folder of ['reference/assets','direct-port/data']) fs.cpSync(path.join(ROOT,folder),path.join(STAGE,folder),{
  recursive:true,filter:p=>{
    if(!fs.statSync(p).isFile()) return true;
    const name=path.basename(p);
    if(/^rotate-background\./i.test(name)) return false;
    if(/\.(glb|gltf)$/i.test(name)) return MODELS.has(name);
    if(/\.(m4a|mp3|ogg|wav|flac)$/i.test(name)) return AUDIO.has(name);
    return !/\.(js|css|map|md|ts)$/.test(p);
  },
});
const html=`<!doctype html>
<html lang="en" class="no-js"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: blob:; connect-src 'self' blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:; frame-src 'none'; object-src 'none'">
<title>GLORB — Colour Against the Storm</title>
<link rel="icon" href="./reference/assets/databeach-logo.png">
<style>${css}</style>
</head><body>
<aside id="preloader" aria-live="polite"><img class="logo" src="./reference/assets/databeach-logo.png" alt="glorb"><div class="preloader-progress"><p class="preloader-counter">0</p><div class="preloader-baseline"><div class="preloader-spinner"></div></div></div><figure class="preloader-foreground"></figure><canvas class="waves"></canvas></aside>
<div id="app"></div><noscript>Enable JavaScript to play GLORB.</noscript>
<script>${escapeScript(studio)}</script>
<script type="module">
// Readable application source follows. Library implementations are external.
${escapeScript(bootstrap)}
${escapeScript(code)}
</script></body></html>`;
fs.writeFileSync(path.join(STAGE,'index.html'),html);
fs.writeFileSync(path.join(OUTPUT,'survival-bundle-inputs.json'),JSON.stringify(result.metafile,null,2));
// Exact generated ZIP target, no recursive deletion or shell interpolation.
const zip=spawnSync('powershell.exe',['-NoProfile','-Command',
  "$ErrorActionPreference='Stop'; Add-Type -AssemblyName System.IO.Compression.FileSystem; if(Test-Path -LiteralPath $env:GLORB_ZIP_OUTPUT){Remove-Item -LiteralPath $env:GLORB_ZIP_OUTPUT}; [IO.Compression.ZipFile]::CreateFromDirectory($env:GLORB_ZIP_STAGE,$env:GLORB_ZIP_OUTPUT)"],
  {env:{...process.env,GLORB_ZIP_STAGE:STAGE,GLORB_ZIP_OUTPUT:OUT},encoding:'utf8'});
if(zip.status!==0) throw Error(zip.stderr||zip.stdout||'ZIP creation failed');
const bytes=fs.statSync(OUT).size;
if(bytes>35_000_000) throw Error('Submission exceeds 35 MB');
console.log(JSON.stringify({zip:OUT,bytes,stage:STAGE,ownCodeBytes:code.length,libraries:LIBRARIES},null,2));
