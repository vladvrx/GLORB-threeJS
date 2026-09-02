#!/usr/bin/env node

import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const GAME_REPO = process.env.DATAB_EACH_REPO || "https://github.com/vladvrx/DATAB-EACH.git";
const DEFAULT_ROOT = process.env.DATAB_EACH_ROOT || "/tmp/datab-each";
const GAME_PORT = Number(process.env.DATAB_EACH_PORT || 43173);
const TMUX_CONF = "/exec-daemon/tmux.portal.conf";

const WEBGL_HOOKS = [
  {
    before: "}}}}})));const v=c.ao[a];",
    after:
      '}}}};window.__STUDIO_APPLY__&&window.__STUDIO_APPLY__(a,h,u,"props")}})));window.__STUDIO_APPLY__&&window.__STUDIO_APPLY__(a,h,u,"manifest");const v=c.ao[a];',
  },
  {
    before: `        }
      }
    })));
    const v = c.ao[a];`,
    after: `        }
        window.__STUDIO_APPLY__ && window.__STUDIO_APPLY__(a, h, u, "props");
      }
    })));
    window.__STUDIO_APPLY__ && window.__STUDIO_APPLY__(a, h, u, "manifest");
    const v = c.ao[a];`,
  },
  {
    before: "const e = [...l.props, ...r.props];",
    after: "const e = [...(l.props || []), ...(r.props || [])];",
  },
  {
    before: "const e=[...l.props,...r.props];",
    after: "const e=[...l.props||[],...r.props||[]];",
  },
  {
    before: "let n = await t.supercache.get(o + kr);",
    after: "let n = window.__STUDIO_OVERLAY__ ? null : await t.supercache.get(o + kr);",
  },
  {
    before: "let n=await t.supercache.get(o+kr);",
    after: "let n=window.__STUDIO_OVERLAY__?null:await t.supercache.get(o+kr);",
  },
];

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(stderr.trim() || stdout.trim() || `${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

function replaceOnce(source, before, after, label) {
  if (source.includes(after)) return source;
  const first = source.indexOf(before);
  if (first < 0) throw new Error(`Could not patch ${label}: missing marker`);
  if (source.indexOf(before, first + before.length) >= 0) {
    throw new Error(`Could not patch ${label}: marker is not unique`);
  }
  return source.slice(0, first) + after + source.slice(first + before.length);
}

function jsStringEnd(source, jsonStart) {
  for (let index = jsonStart; index < source.length; index += 1) {
    if (source[index] === "\\") {
      index += 1;
      continue;
    }
    if (source[index] === "'") return index;
  }
  return -1;
}

function isCustomAsset(name) {
  return !name || String(name).startsWith("mesh-");
}

function sceneIdFromPackKey(key) {
  return key.startsWith("Scene_") ? key.slice("Scene_".length) : key;
}

function shippedScene(scene) {
  const props = (scene.props ?? []).filter((item) => !isCustomAsset(item.asset));
  const assets = [...new Set((scene.assets ?? []).filter((item) => !isCustomAsset(item)))];
  const actors = (scene.actors ?? []).filter((item) => !isCustomAsset(item.type));
  return { ...scene, props, assets, actors };
}

function asMap(value, idKey = "id") {
  if (!value) return {};
  if (Array.isArray(value)) {
    return Object.fromEntries(value.map((item) => [item[idKey], item]));
  }
  return value;
}

function serializeDialogs(scripts) {
  if (!scripts) return {};
  if (!Array.isArray(scripts)) return scripts;
  const out = {};
  for (const script of scripts) {
    const packed = { __first__: script.first };
    for (const node of script.nodes ?? []) {
      const body = { id: node.id };
      if (node.isPrompt) {
        body.isPrompt = true;
        body.choices = Object.fromEntries(
          (node.choices ?? []).map((choice) => [
            choice.id,
            { id: choice.id, value: choice.value, next: choice.next },
          ]),
        );
      } else {
        body.isSpeak = true;
        body.bubbles = node.bubbles ?? [];
        if (node.before?.length) body.before = node.before;
        body.next = node.next ?? [];
      }
      packed[node.id] = body;
    }
    out[script.id] = packed;
  }
  return out;
}

function sceneFromRaw(raw, id) {
  if (Array.isArray(raw.objects)) {
    const props = raw.objects
      .filter((object) => object.kind === "prop")
      .map((object) => ({
        asset: object.asset,
        traversable: Boolean(object.traversable),
        transforms: object.transform,
      }));
    const actors = raw.objects
      .filter((object) => object.kind === "actor")
      .map((object) => ({
        uid: object.id,
        type: object.actorType ?? "NPC",
        params: object.params ?? {},
        transforms: object.transform,
      }));
    const points = {};
    for (const object of raw.objects.filter((item) => item.kind === "point")) {
      points[object.name] = object.transform;
    }
    const areas = {};
    for (const object of raw.objects.filter((item) => item.kind === "area")) {
      areas[object.name] = {
        position: [object.transform[0], object.transform[1], object.transform[2]],
        size: object.transform[3],
      };
    }
    const curves = {};
    for (const curve of raw.curves ?? []) {
      curves[curve.id] = { type: curve.type, closed: curve.closed, points: curve.points };
    }
    return shippedScene({
      name: raw.name ?? id,
      bounds: raw.bounds,
      useBaseAsCollider: raw.useBaseAsCollider,
      dataBeachIslandOffset: raw.dataBeachIslandOffset,
      points,
      areas,
      curves,
      assets: [...new Set(raw.objects.filter((item) => item.asset).map((item) => item.asset))],
      actors,
      props,
    });
  }

  const curves =
    Array.isArray(raw.curves)
      ? Object.fromEntries(
          raw.curves.map((curve) => [curve.id, { type: curve.type, closed: curve.closed, points: curve.points }]),
        )
      : (raw.curves ?? {});

  return shippedScene({
    name: raw.name ?? id,
    bounds: raw.bounds,
    useBaseAsCollider: raw.useBaseAsCollider,
    dataBeachIslandOffset: raw.dataBeachIslandOffset,
    points: raw.points ?? {},
    areas: raw.areas ?? {},
    curves,
    assets: raw.assetList ?? raw.assets ?? [],
    actors: raw.actors ?? [],
    props: (raw.props ?? []).map((item) => ({
      asset: item.asset,
      traversable: Boolean(item.traversable),
      transforms: item.transforms,
    })),
  });
}

export function packFromUnknown(input) {
  if (input.quests_en && input.scenes && input.format === "datab-each-game-pack-v1") {
    const scenes = {};
    for (const [key, scene] of Object.entries(input.scenes)) {
      scenes[key] = sceneFromRaw(scene, sceneIdFromPackKey(key));
    }
    return { ...input, scenes };
  }

  const scenes = {};
  for (const [id, raw] of Object.entries(input.scenes ?? {})) {
    const sceneId = sceneIdFromPackKey(id);
    scenes[`Scene_${sceneId}`] = sceneFromRaw(raw, sceneId);
  }

  const characters = input.characters_en ?? input.characters;
  const npcs = Array.isArray(input.characters)
    ? Object.fromEntries(
        input.characters.map((npc) => [
          npc.id,
          {
            gradientID: npc.gradientID,
            face: npc.face,
            script: npc.script,
            scriptArgs: npc.scriptArgs,
          },
        ]),
      )
    : (characters?.npcs ?? characters ?? {});

  return {
    format: "datab-each-game-pack-v1",
    scenes,
    quests_en: input.quests_en ?? asMap(input.quests),
    characters_en: {
      npcs,
      colors: input.characterColors ?? characters?.colors ?? {},
    },
    dialogs_en: input.dialogs_en ?? serializeDialogs(input.dialogs),
    notifications: input.notifications,
  };
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function listHashed(dir, prefix) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.startsWith(prefix) && name.endsWith(".js") && !name.endsWith(".map.js") && !name.includes(".map"))
    .map((name) => path.join(dir, name));
}

const WATER_COLOR_SWAPS = [
  ["#3fbfff", "#39ff14"],
  ["#6db6e4", "#00e83a"],
  ["#4189fd", "#39ff14"],
  ["#7992ff", "#00e83a"],
  ["#0a2a52", "#39ff14"],
  ["#164a73", "#00e83a"],
  ["#0ad64a", "#39ff14"],
  ["#00b83a", "#00e83a"],
  ["#07162f", "#39ff14"],
  ["#193a61", "#00e83a"],
  ["#183968", "#00e83a"],
];

function patchWaterColors(source) {
  let next = source;
  for (const [from, to] of WATER_COLOR_SWAPS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function patchWebgl(file) {
  if (!fs.existsSync(file)) return false;
  const original = fs.readFileSync(file, "utf8");
  let source = original;
  for (const hook of WEBGL_HOOKS) {
    if (source.includes(hook.after)) continue;
    if (!source.includes(hook.before)) continue;
    source = replaceOnce(source, hook.before, hook.after, path.basename(file));
  }
  if (!source.includes("__STUDIO_APPLY__")) {
    throw new Error(`Could not patch ${path.basename(file)}: missing scene-load marker`);
  }
  source = patchWaterColors(source);
  if (source !== original) fs.writeFileSync(file, source);
  return true;
}

function replaceSceneManifest(source, sceneName, overlay) {
  const needle = `JSON.parse('{"name":"${sceneName}"`;
  const start = source.indexOf(needle);
  if (start < 0) return source;
  const jsonStart = start + "JSON.parse('".length;
  const jsonEnd = jsStringEnd(source, jsonStart);
  if (jsonEnd < 0) throw new Error(`Unclosed scene manifest for ${sceneName}`);
  const current = JSON.parse(source.slice(jsonStart, jsonEnd).replaceAll("\\'", "'"));
  if (overlay.actors && overlay.actors.length) current.actors = overlay.actors;
  if (overlay.points && Object.keys(overlay.points).length) current.points = overlay.points;
  if (overlay.areas) current.areas = overlay.areas;
  if (overlay.curves) current.curves = overlay.curves;
  if (overlay.assets) current.assets = overlay.assets;
  if (overlay.bounds) current.bounds = overlay.bounds;
  if (overlay.dataBeachIslandOffset) current.dataBeachIslandOffset = overlay.dataBeachIslandOffset;
  if (overlay.props && overlay.props.length) current.props = overlay.props;
  const encoded = JSON.stringify(current).replaceAll("'", "\\'");
  return source.slice(0, jsonStart) + encoded + source.slice(jsonEnd);
}

function bustWebglImport(source) {
  return source.replace(
    /import\("(\.\/webgl\.[a-z0-9]+)\.js(?:\?[^"]*)?"\)/g,
    'import("$1.js?v=neon-water")',
  );
}

function patchVendor(file, scenes) {
  if (!fs.existsSync(file)) return false;
  let source = fs.readFileSync(file, "utf8");
  for (const [key, scene] of Object.entries(scenes)) {
    source = replaceSceneManifest(source, sceneIdFromPackKey(key), scene);
  }
  source = bustWebglImport(source);
  fs.writeFileSync(file, source);
  return true;
}

function writeBridge(file, scenes) {
  const overlay = {};
  for (const [key, scene] of Object.entries(scenes)) {
    const id = sceneIdFromPackKey(key);
    overlay[id] = scene;
    overlay[key] = scene;
  }
  const body = `window.noSupercache=true;
window.__STUDIO_OVERLAY__=${JSON.stringify(overlay)};
window.__STUDIO_APPLY__=function(id,manifest,runtime,phase){
  const scene=window.__STUDIO_OVERLAY__[id]||window.__STUDIO_OVERLAY__["Scene_"+id];
  if(!scene||!manifest)return;
  if(phase!=="props"){
    if(scene.actors&&scene.actors.length)manifest.actors=scene.actors;
    if(scene.points&&Object.keys(scene.points).length)manifest.points=scene.points;
    if(scene.areas)manifest.areas=scene.areas;
    if(scene.curves)manifest.curves=scene.curves;
    if(scene.assets)manifest.assets=scene.assets;
    if(scene.props&&scene.props.length)manifest.props=scene.props;
  }
  if(phase!=="manifest"&&runtime&&scene.props)runtime.props=[];
};
`;
  fs.writeFileSync(file, body);
}

const PRELOADER_WAVE_COLORS = [
  ["rgb(158, 155, 190)", "rgb(186, 226, 245)"],
  ["rgb(93, 89, 147)", "rgb(137, 206, 237)"],
  ["rgb(59, 55, 119)", "rgb(112, 191, 228)"],
];

const PRELOADER_CSS = `#preloader .preloader-foreground {
  background: #70bfe4 !important;
}

#preloader .preloader-progress {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  margin-top: 30px;
}

#preloader .preloader-counter,
#preloader .preloader-baseline .default {
  color: #0d4a6b;
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.35);
}

#preloader .preloader-progress .preloader-counter {
  margin-top: 0;
  height: auto;
  line-height: 1;
}

#preloader .preloader-progress .preloader-baseline {
  position: static;
  bottom: auto;
  padding: 0;
  font-size: inherit;
}

#preloader .logo {
  mix-blend-mode: normal !important;
  z-index: 3;
  width: min(84vw, 560px) !important;
  height: auto !important;
  padding: 1.35rem 1.8rem;
  border-radius: 1.5rem;
  background: #07182a;
  box-shadow: 0 18px 48px rgba(7, 24, 42, 0.38);
}

#preloader .preloader-spinner,
#preloader .preloader-spinner:after {
  width: 2.6em;
  height: 2.6em;
}

#preloader .preloader-spinner {
  margin: 0;
  font-size: 8px;
  border-top-color: rgba(13, 74, 107, 0.22) !important;
  border-right-color: rgba(13, 74, 107, 0.22) !important;
  border-bottom-color: rgba(13, 74, 107, 0.22) !important;
  border-left-color: #0d4a6b !important;
}
`;

function patchPreloaderWaves(file) {
  if (!fs.existsSync(file)) return false;
  let source = fs.readFileSync(file, "utf8");
  if (!source.includes("rgb(59, 55, 119)") && !source.includes("rgb(112, 191, 228)")) {
    return false;
  }
  if (source.includes("rgb(112, 191, 228)")) return true;
  for (const [before, after] of PRELOADER_WAVE_COLORS) {
    source = replaceOnce(source, before, after, `${path.basename(file)} preloader ${before}`);
  }
  fs.writeFileSync(file, source);
  return true;
}

function patchPreloaderCss(file) {
  if (!fs.existsSync(file)) return false;
  const marker = "#preloader .preloader-foreground{position:absolute;top:0;left:0;z-index:0;width:100%;height:100%;background:#3b3777}";
  const source = fs.readFileSync(file, "utf8");
  if (source.includes("background:#70bfe4") && source.includes("#preloader .preloader-foreground{position:absolute")) {
    return true;
  }
  if (!source.includes(marker)) return false;
  fs.writeFileSync(file, source.replace(marker, marker.replace("background:#3b3777", "background:#70bfe4")));
  return true;
}

function writePreloaderOverride(file) {
  fs.writeFileSync(file, PRELOADER_CSS);
}

function patchIndex(file) {
  if (!fs.existsSync(file)) return false;
  let source = fs.readFileSync(file, "utf8");
  const stamp = Date.now();
  if (!source.includes("studio-bridge.js")) {
    const tag = `    <script src="./reference/assets/studio-bridge.js?v=${stamp}"></script>\n`;
    const next = source.includes("</head>")
      ? source.replace("</head>", `${tag}  </head>`)
      : source.replace('<div id="app"></div>', `<div id="app"></div>\n    ${tag}`);
    if (next === source) throw new Error("Could not inject studio-bridge.js into index.html");
    source = next;
  } else {
    source = source.replace(/studio-bridge\.js(?:\?v=\d+)?/g, `studio-bridge.js?v=${stamp}`);
  }
  if (!source.includes("studio-preloader.css")) {
    const tag = `    <link rel="stylesheet" href="./reference/assets/studio-preloader.css?v=${stamp}">\n`;
    const next = source.includes("</head>")
      ? source.replace("</head>", `${tag}  </head>`)
      : source.replace('<div id="app"></div>', `<div id="app"></div>\n    ${tag}`);
    if (next === source) throw new Error("Could not inject studio-preloader.css into index.html");
    source = next;
  } else {
    source = source.replace(/studio-preloader\.css(?:\?v=[^"&\s]*)?/g, `studio-preloader.css?v=${stamp}`);
  }
  source = source.replace(/webgl\.([a-z0-9]+)\.js(?:\?v=\d+)?/g, `webgl.$1.js?v=${stamp}`);
  if (source.includes('content="#05051a"')) {
    source = source.replace('content="#05051a"', 'content="#70bfe4"');
  }
  fs.writeFileSync(file, source);
  return true;
}

function patchNextConfig(file) {
  if (!fs.existsSync(file)) return false;
  const source = fs.readFileSync(file, "utf8");
  if (source.includes("allowedDevOrigins")) return true;
  const next = source.replace(
    "const nextConfig: NextConfig = {",
    `const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.cursor.sh", "*.cursor.com", "*.cursorusercontent.com"],`,
  );
  if (next !== source) fs.writeFileSync(file, next);
  return next !== source;
}

function patchGamePackage(file) {
  if (!fs.existsSync(file)) return false;
  const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
  const current = pkg.scripts?.dev || "";
  if (!current.includes("next dev")) return false;
  let next = current;
  if (!next.includes("-H ")) next += " -H 0.0.0.0";
  if (!next.includes("-p ")) next += ` -p ${GAME_PORT}`;
  if (next === current) return false;
  pkg.scripts.dev = next;
  fs.writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
  return true;
}

export async function ensureGameRoot(root) {
  const assets = path.join(root, "reference", "assets");
  if (fs.existsSync(assets)) return { cloned: false, root };
  fs.mkdirSync(path.dirname(root), { recursive: true });
  await run("git", ["clone", "--depth", "1", GAME_REPO, root]);
  if (!fs.existsSync(assets)) {
    throw new Error(`Cloned DATAB-EACH but ${assets} is missing`);
  }
  return { cloned: true, root };
}

export async function ensureGameInstall(root) {
  const pkgPath = path.join(root, "package.json");
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json in ${root}`);
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const needsNext = String(pkg.scripts?.dev || "").includes("next");
  const hasDeps = Boolean(
    (pkg.dependencies && Object.keys(pkg.dependencies).length) ||
      (pkg.devDependencies && Object.keys(pkg.devDependencies).length),
  );
  if (!hasDeps) return { installed: false, skipped: true };
  const marker = needsNext
    ? path.join(root, "node_modules", "next", "package.json")
    : path.join(root, "node_modules");
  if (fs.existsSync(marker)) return { installed: false };
  const lock = path.join(root, "package-lock.json");
  if (fs.existsSync(lock)) {
    try {
      await run("npm", ["ci"], root);
    } catch {
      await run("npm", ["install"], root);
    }
  } else {
    await run("npm", ["install"], root);
  }
  return { installed: true };
}

function portOpen(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port }, () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
  });
}

function tmux(args) {
  const conf = fs.existsSync(TMUX_CONF) ? ["-f", TMUX_CONF] : [];
  return run("tmux", [...conf, ...args]);
}

export async function ensureGameServer(root) {
  if (await portOpen(GAME_PORT)) {
    return { started: false, url: `http://127.0.0.1:${GAME_PORT}` };
  }
  const session = "datab-each-game";
  let existed = true;
  try {
    await tmux(["has-session", "-t", `=${session}`]);
  } catch {
    existed = false;
    await tmux(["new-session", "-d", "-s", session, "-c", root, "--", process.env.SHELL || "bash", "-l"]);
  }
  if (existed) {
    await tmux(["send-keys", "-t", `${session}:0.0`, "C-c"]);
  }
  await tmux(["send-keys", "-t", `${session}:0.0`, `cd ${JSON.stringify(root)} && npm run dev`, "C-m"]);
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    if (await portOpen(GAME_PORT)) {
      return { started: true, url: `http://127.0.0.1:${GAME_PORT}` };
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`DATAB-EACH did not listen on ${GAME_PORT} after starting the dev server`);
}

export function applyPack(root, pack) {
  const assets = path.join(root, "reference", "assets");
  if (!fs.existsSync(assets)) {
    throw new Error(`DATAB-EACH assets folder not found at ${assets}`);
  }

  writeJson(path.join(assets, "quests_en.json"), pack.quests_en);
  writeJson(path.join(assets, "characters_en.json"), pack.characters_en);
  writeJson(path.join(assets, "dialogs_en.json"), pack.dialogs_en);
  writeJson(path.join(assets, "studio-game-pack.json"), pack);
  if (pack.notifications) writeJson(path.join(assets, "studio-notifications.json"), pack.notifications);
  writeBridge(path.join(assets, "studio-bridge.js"), pack.scenes ?? {});
  writePreloaderOverride(path.join(assets, "studio-preloader.css"));

  const webglFiles = [...listHashed(path.join(root, "vendor"), "webgl."), ...listHashed(assets, "webgl.")];
  const vendorFiles = [...listHashed(path.join(root, "vendor"), "vendor."), ...listHashed(assets, "vendor.")];
  const patched = { webgl: [], vendor: [], preloader: [] };
  for (const file of webglFiles) {
    if (patchWebgl(file)) patched.webgl.push(path.relative(root, file));
  }
  if (!patched.webgl.length) {
    throw new Error("No DATAB-EACH webgl bundle was patched");
  }
  for (const file of vendorFiles) {
    if (patchVendor(file, pack.scenes ?? {})) patched.vendor.push(path.relative(root, file));
    if (patchPreloaderWaves(file)) patched.preloader.push(path.relative(root, file));
  }
  const vendorCss = fs
    .readdirSync(assets)
    .filter((name) => name.startsWith("vendor.") && name.endsWith(".css"))
    .map((name) => path.join(assets, name));
  for (const file of vendorCss) {
    if (patchPreloaderCss(file)) patched.preloader.push(path.relative(root, file));
  }
  patchIndex(path.join(root, "index.html"));
  patchIndex(path.join(root, "three-js", "index.html"));
  patchNextConfig(path.join(root, "next.config.ts"));
  patchGamePackage(path.join(root, "package.json"));

  return {
    root,
    locales: ["quests_en.json", "characters_en.json", "dialogs_en.json"],
    scenes: Object.keys(pack.scenes ?? {}),
    patched,
  };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2);
  const flag = (name) => args.includes(name);
  const value = (name) => {
    const index = args.indexOf(name);
    return index >= 0 ? args[index + 1] : undefined;
  };
  const root = value("--root") || DEFAULT_ROOT;
  const packPath = value("--pack") || args.find((item) => item.endsWith(".json") && !item.startsWith("--"));
  const result = { root };

  if (flag("--self-test")) {
    const mini = WEBGL_HOOKS[0];
    const pretty = WEBGL_HOOKS[1];
    if (replaceOnce(mini.before, mini.before, mini.after, "mini") === mini.before) {
      throw new Error("self-test: minified hook failed");
    }
    if (replaceOnce(pretty.before, pretty.before, pretty.after, "pretty") === pretty.before) {
      throw new Error("self-test: pretty hook failed");
    }
    const sample = packFromUnknown({
      format: "datab-each-studio-v1",
      scenes: {
        IslandWest: {
          name: "Cove",
          objects: [
            {
              kind: "prop",
              asset: "Barrel",
              traversable: false,
              transform: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1],
            },
            {
              id: "NPC_A",
              kind: "actor",
              actorType: "NPC",
              params: { subtype: "Intro" },
              transform: [4, 5, 6, 1, 1, 1, 0, 0, 0, 1],
            },
          ],
          curves: [],
        },
      },
      quests: [{ id: "Demo", title: "Demo quest" }],
      characters: [{ id: "Intro", gradientID: 1, face: 0, script: "Intro", scriptArgs: {} }],
      dialogs: [{ id: "Intro", first: "Start", nodes: [{ id: "Start", bubbles: ["Hi"], next: [] }] }],
    });
    if (sample.scenes.Scene_IslandWest.props[0].asset !== "Barrel") {
      throw new Error("self-test: prop conversion failed");
    }
    if (sample.scenes.Scene_IslandWest.actors[0].uid !== "NPC_A") {
      throw new Error("self-test: actor conversion failed");
    }
    console.log(JSON.stringify({ ok: true, selfTest: true }, null, 2));
    process.exit(0);
  }

  (async () => {
    if (flag("--ensure")) {
      result.ensure = await ensureGameRoot(root);
      result.install = await ensureGameInstall(root);
    }
    if (packPath) {
      result.apply = applyPack(root, packFromUnknown(readJson(packPath)));
    } else if (!flag("--start")) {
      console.error("Usage: node scripts/apply-to-datab-each.mjs --root /tmp/datab-each --pack pack.json [--ensure] [--start]");
      process.exit(1);
    }
    if (flag("--start")) {
      result.server = await ensureGameServer(root);
    }
    console.log(JSON.stringify(result, null, 2));
  })().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
}
