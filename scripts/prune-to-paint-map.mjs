#!/usr/bin/env node
/**
 * Keep the playable square paint island plus the intro boat that reaches it.
 * Stub IslandWest scenery and delete every asset / source file that slice
 * does not load.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(process.argv[2] || path.dirname(path.dirname(fileURLToPath(import.meta.url))));

const KEEP_ASSET_GLBS = new Set([
  "PalmTree",
  "RockA",
  "Taxi",
  "TaxiRaw",
  "BoatYellow",
  "JoystickRaw",
]);

const KEEP_NAME_RE = [
  /^Scene_IslandIntro([._]|$)/,
  /^Scene_IslandWest([._]|$)/,
  /^character(\.|_)/,
  /^Character_Texture\./,
  /^Assets_Data\./,
  /^Assets_Gradients\./,
  /^SplattingPatterns\./,
  /^clouds\./,
  /^noise_perlin\./,
  /^sprites\./,
  /^audiosprites\./,
  /^music_island_west\./,
  /^sfx_amb_/,
  /^Gilmer-/,
  /^Comfortaa-/,
  /^RobotoMono-/,
  /^databeach-logo/,
  /^game-cursor/,
  /^compass\./,
  /^disk\./,
  /^flag\./,
  /^hammer\./,
  /^helmet\./,
  /^lightbulb\./,
  /^resortkey\./,
  /^scissor\./,
  /^screwdriver\./,
  /^shears\./,
  /^stethoscope\./,
  /^wateringcan\./,
  /^zipline\./,
  /^interactions-yes-/,
  /^interactions-no-/,
  /^blank-tech-company\./,
  /^studio-bridge\.js$/,
  /^studio-preloader\.css$/,
  /^studio-notifications\.json$/,
  /^studio-game-pack\.json$/,
  /^vendor\.a83843c365453426\.css$/,
  /^dialogs_en\.json$/,
  /^characters_en\.json$/,
  /^items_en\.json$/,
  /^partners_en\.json$/,
  /^quests_en\.json$/,
];

const KEEP_ASSET_FILES = new Set([
  "dialogs_en.json",
  "characters_en.json",
  "items_en.json",
  "partners_en.json",
  "quests_en.json",
  "studio-bridge.js",
  "studio-preloader.css",
  "studio-notifications.json",
  "studio-game-pack.json",
  "vendor.a83843c365453426.css",
  "game-cursor.css",
  "databeach-logo.png",
  "blank-tech-company.png",
]);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function writeJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
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

function parseSceneJson(source, sceneName) {
  const needle = `JSON.parse('{"name":"${sceneName}"`;
  const start = source.indexOf(needle);
  if (start < 0) return null;
  const jsonStart = start + "JSON.parse('".length;
  const jsonEnd = jsStringEnd(source, jsonStart);
  if (jsonEnd < 0) throw new Error(`Unclosed scene manifest for ${sceneName}`);
  return JSON.parse(source.slice(jsonStart, jsonEnd).replaceAll("\\'", "'"));
}

function replaceSceneJson(source, sceneName, next) {
  const needle = `JSON.parse('{"name":"${sceneName}"`;
  const start = source.indexOf(needle);
  if (start < 0) return source;
  const jsonStart = start + "JSON.parse('".length;
  const jsonEnd = jsStringEnd(source, jsonStart);
  if (jsonEnd < 0) throw new Error(`Unclosed scene manifest for ${sceneName}`);
  const encoded = JSON.stringify(next).replaceAll("'", "\\'");
  return source.slice(0, jsonStart) + encoded + source.slice(jsonEnd);
}

function stubWest(scene) {
  const points = {};
  for (const [key, value] of Object.entries(scene.points || {})) {
    if (/^(Spawn|PortSpawnB)/.test(key)) points[key] = value;
  }
  return {
    name: "IslandWest",
    bounds: scene.bounds,
    useBaseAsCollider: true,
    points,
    assets: [],
    actors: [],
    props: [],
    areas: {},
    curves: {},
  };
}

function keepAssetFile(name) {
  if (KEEP_ASSET_FILES.has(name)) return true;
  if (name.startsWith("Asset_")) {
    const logical = name.replace(/^Asset_/, "").replace(/\.[a-f0-9]{8,}.*$/i, "");
    return KEEP_ASSET_GLBS.has(logical);
  }
  return KEEP_NAME_RE.some((pattern) => pattern.test(name));
}

function rm(target) {
  if (!fs.existsSync(target)) return false;
  fs.rmSync(target, { recursive: true, force: true });
  return true;
}

function parseOverlay(file) {
  const source = read(file);
  const marker = "window.__STUDIO_OVERLAY__=";
  const start = source.indexOf(marker);
  const applyAt = source.indexOf("window.__STUDIO_APPLY__");
  if (start < 0 || applyAt < 0) throw new Error("Could not parse studio overlay");
  let json = source.slice(start + marker.length, applyAt).trim();
  if (json.endsWith(";")) json = json.slice(0, -1);
  return { overlay: JSON.parse(json), apply: source.slice(applyAt) };
}

const vendorPath = path.join(ROOT, "vendor/vendor.75f6e6ae65453426.js");
const overlayPath = path.join(ROOT, "reference/assets/studio-bridge.js");
const { overlay, apply } = parseOverlay(overlayPath);
const vendorSource = read(vendorPath);

const intro = overlay.IslandIntro || overlay.Scene_IslandIntro || parseSceneJson(vendorSource, "IslandIntro");
const westSource = overlay.IslandWest || overlay.Scene_IslandWest || parseSceneJson(vendorSource, "IslandWest");
const west = stubWest(westSource);

const keptOverlay = {
  IslandIntro: intro,
  Scene_IslandIntro: intro,
  IslandWest: west,
  Scene_IslandWest: west,
};
fs.writeFileSync(
  overlayPath,
  `window.noSupercache=true;\nwindow.__STUDIO_OVERLAY__=${JSON.stringify(keptOverlay)};\n${apply}`,
);

let vendor = vendorSource;
vendor = replaceSceneJson(vendor, "IslandWest", west);
if (vendor !== vendorSource) fs.writeFileSync(vendorPath, vendor);

const packPath = path.join(ROOT, "reference/assets/studio-game-pack.json");
if (fs.existsSync(packPath)) {
  const pack = JSON.parse(read(packPath));
  pack.scenes = {
    Scene_IslandIntro: intro,
    Scene_IslandWest: west,
  };
  writeJson(packPath, pack);
}

const sceneDir = path.join(ROOT, "direct-port/data/scenes");
if (fs.existsSync(sceneDir)) {
  writeJson(path.join(sceneDir, "Scene_IslandIntro.json"), intro);
  writeJson(path.join(sceneDir, "Scene_IslandWest.json"), west);
}

const deleted = [];
function recordDelete(rel) {
  deleted.push(rel);
}

const assetsDir = path.join(ROOT, "reference/assets");
for (const name of fs.readdirSync(assetsDir)) {
  const full = path.join(assetsDir, name);
  const stat = fs.statSync(full);
  if (stat.isDirectory()) {
    if (name === "ui") continue;
    rm(full);
    recordDelete(`reference/assets/${name}/`);
    continue;
  }
  if (!keepAssetFile(name)) {
    fs.unlinkSync(full);
    recordDelete(`reference/assets/${name}`);
  }
}

const uiDir = path.join(assetsDir, "ui");
if (fs.existsSync(uiDir)) {
  for (const name of fs.readdirSync(uiDir)) {
    if (name !== "game-cursor-4k.png") {
      fs.unlinkSync(path.join(uiDir, name));
      recordDelete(`reference/assets/ui/${name}`);
    }
  }
}

const dropPaths = [
  "reference/index.html",
  "reference/reference.html",
  "reference/MANIFEST.json",
  "reference/manifest.webmanifest",
  "reference/.gltf",
  "reference/README.md",
  "direct-port/index.html",
  "direct-port/README.md",
  "direct-port/EXTRACTED_MODULES.json",
  "direct-port/PORT_MANIFEST.json",
  "direct-port/analysis",
  "direct-port/src/bootstrap.js",
  "direct-port/src/shaders",
  "direct-port/data/audio-sprite-clips.json",
  "direct-port/data/character-animation-clips.json",
  "direct-port/data/scenes/timestamp.json",
  "scripts/apply-to-datab-each.mjs",
  "scripts/apply-studio-locales.mjs",
  "scripts/prune-to-intro-west.mjs",
  "vendor/main.35e6243a65453426.js",
  "vendor/main.35e6243a65453426.js.map",
  "vendor/vendor.75f6e6ae65453426.js.map",
  "vendor/webgl.3250e36a65453426.js.map",
  "BUILDLOG.md",
  "CLAUDE.md",
  "glorb.zip",
];
for (const rel of dropPaths) {
  if (rm(path.join(ROOT, rel))) recordDelete(rel);
}

const remaining = fs.readdirSync(assetsDir).filter((name) => fs.statSync(path.join(assetsDir, name)).isFile());
const report = {
  keptScenes: ["IslandIntro", "IslandWest"],
  keptGlbs: remaining.filter((name) => name.endsWith(".glb")).sort(),
  remainingAssetFiles: remaining.length,
  deletedCount: deleted.length,
};
console.log(JSON.stringify({ ...report, deletedSample: deleted.slice(0, 30) }, null, 2));
