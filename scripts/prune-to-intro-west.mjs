#!/usr/bin/env node
/**
 * Keep only the playable slice: IslandIntro (boat) and IslandWest (GLORB).
 * Stub unused scene manifests, stop registering those scenes, drop their
 * JSON/overlay data, and delete GLBs / music those islands never load.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.argv[2] || process.cwd());
const KEEP_SCENES = new Set(["IslandIntro", "IslandWest"]);
const DROP_SCENES = ["CircuitBike", "EasterEgg", "TestLab"];
const KEEP_MUSIC = new Set(["music_island_west"]);
const KEEP_ASSETS = new Set([
  "Character",
  "Taxi",
  "TaxiRaw",
  "BoatYellow",
  "JoystickRaw",
  "ToolHammer",
  "ToolScissor",
  "ToolStethoscope",
  "ToolWateringCan",
  "ToolHeadset",
  "ToolLightbulb",
  "ToolCompass",
  "shears",
]);

const ACTOR_EXTRAS = {
  Chest: ["Chest", "ChestOn"],
  ChestBig: ["ChestBig", "ChestBigOn"],
  GrowableTree: ["GrowableTreeSmall", "GrowableTreeLarge"],
  LightTraffic: ["BuildingFOff", "BuildingF"],
  Lighthouse: ["BuildingFOff", "BuildingF"],
  BridgeOff: ["BridgeOff", "BridgeOn"],
  BrokenBridge: ["BridgeOff", "BridgeOn"],
  Telescope: ["Telescope", "TelescopeB"],
  CobbleHouse: ["CobbleHouseOff", "CobbleHouseOn"],
  FlagPole: ["Flag", "FlagOff", "FlagOn"],
  Speakers: ["Speakers", "SpeakersOn"],
  Tamtam: ["Tamtam"],
  Waterfall: ["Waterfall", "WaterfallParticles"],
  WaterfallParticles: ["WaterfallParticles"],
  Zipline: ["Zipline", "ZiplineBase", "ZipLineStroke", "ZiplineButtonOff", "ZiplineButtonOn"],
  Resort: ["ResortOff", "ResortOn"],
  BlueVineHouse: ["CoffeeShopOff", "CoffeeShopOn"],
  ShopForSale: ["ShopCroissant", "ShopClothes", "ShopGlasses"],
  NPC: ["Character"],
};

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

function parseOverlay(file) {
  const source = read(file);
  const marker = "window.__STUDIO_OVERLAY__=";
  const start = source.indexOf(marker);
  const applyAt = source.indexOf("window.__STUDIO_APPLY__");
  if (start < 0 || applyAt < 0) throw new Error("Could not parse studio overlay");
  let json = source.slice(start + marker.length, applyAt).trim();
  if (json.endsWith(";")) json = json.slice(0, -1);
  return { source, overlay: JSON.parse(json), apply: source.slice(applyAt) };
}

function collectScene(scene, usedAssets, usedActors, usedTypes) {
  if (!scene || typeof scene !== "object") return;
  for (const name of scene.assets || []) if (name) usedAssets.add(name);
  for (const extra of scene.extraAssets || []) if (extra) usedAssets.add(extra);
  for (const prop of scene.props || []) if (prop?.asset) usedAssets.add(prop.asset);
  const actors = [];
  if (Array.isArray(scene.actors)) actors.push(...scene.actors);
  else if (scene.actors && typeof scene.actors === "object") actors.push(...Object.values(scene.actors));
  if (Array.isArray(scene.extraActors)) actors.push(...scene.extraActors);
  for (const actor of actors) {
    if (!actor) continue;
    if (actor.mesh) usedAssets.add(actor.mesh);
    if (actor.type) {
      usedTypes.add(actor.type);
      usedAssets.add(actor.type);
      for (const extra of ACTOR_EXTRAS[actor.type] || []) usedAssets.add(extra);
    }
    const subtype = actor.params?.subtype || actor.subtype;
    if (subtype) usedActors.add(subtype.replace(/\.[0-9]+$/, ""));
    if (actor.type === "NPC" && subtype) usedActors.add(subtype.replace(/\.[0-9]+$/, ""));
  }
}

function replaceOnce(source, before, after, label) {
  if (source.includes(after)) return source;
  const first = source.indexOf(before);
  if (first < 0) throw new Error(`Could not patch ${label}: missing ${JSON.stringify(before).slice(0, 80)}`);
  if (source.indexOf(before, first + before.length) >= 0) {
    throw new Error(`Could not patch ${label}: marker is not unique`);
  }
  return source.slice(0, first) + after + source.slice(first + before.length);
}

function patchVendor(file, usedAssets) {
  let source = read(file);
  const original = source;
  if (source.includes("Object.keys(FU).filter(t=>t===\"IslandIntro\"||t===\"IslandWest\")")) {
    // already filtered
  } else if (source.includes("UU = Object.keys(FU).reduce((e, t) => {")) {
    source = replaceOnce(
      source,
      "UU = Object.keys(FU).reduce((e, t) => {",
      "UU = Object.keys(FU).filter(t=>t===\"IslandIntro\"||t===\"IslandWest\").reduce((e, t) => {",
      path.basename(file),
    );
  } else {
    source = replaceOnce(
      source,
      "Object.keys(FU).reduce(((e,t)=>{e[t]=Object.assign({},FU[t]);",
      "Object.keys(FU).filter(t=>t===\"IslandIntro\"||t===\"IslandWest\").reduce(((e,t)=>{e[t]=Object.assign({},FU[t]);",
      path.basename(file),
    );
  }

  const drop = '["CircuitBike","EasterEgg","TestLab"].forEach(n=>{delete t.scenes[n]});';
  if (!source.includes(drop)) {
    if (source.includes("}(t);\n  const s = {};\n  for (let i in t.scenes) {\n    const e = t.scenes[i];\n    if (!i.startsWith(\"Island\")) continue;")) {
      source = replaceOnce(
        source,
        "}(t);\n  const s = {};\n  for (let i in t.scenes) {\n    const e = t.scenes[i];\n    if (!i.startsWith(\"Island\")) continue;",
        `}(t);\n  ${drop}\n  const s = {};\n  for (let i in t.scenes) {\n    const e = t.scenes[i];\n    if (!i.startsWith("Island")) continue;`,
        path.basename(file),
      );
    } else {
      source = replaceOnce(
        source,
        "}(t);const s={};for(let i in t.scenes){",
        `}(t);${drop}const s={};for(let i in t.scenes){`,
        path.basename(file),
      );
    }
  }

  for (const name of DROP_SCENES) {
    source = replaceSceneJson(source, name, {
      name,
      assets: [],
      actors: [],
      props: [],
      points: {},
      areas: {},
      curves: {},
      bounds: [[0, 0, 0], [1, 1, 1]],
    });
  }

  if (source !== original) fs.writeFileSync(file, source);
  return source !== original;
}

function patchWebgl(file) {
  let source = read(file);
  const replacements = [
    ['"EasterEgg" === t.scenes.currentSceneID.value ? t.scenes.backToIsland() : t.scenes.teleportTo("EasterEgg")', "void 0"],
    ['"EasterEgg"===t.scenes.currentSceneID.value?t.scenes.backToIsland():t.scenes.teleportTo("EasterEgg")', "void 0"],
  ];
  let changed = false;
  for (const [before, after] of replacements) {
    if (source.includes(before)) {
      source = source.replace(before, after);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(file, source);
  return changed;
}

function keepDialogKey(key, usedActors) {
  if (key === "Intro") return true;
  if (key.startsWith("dev")) return false;
  if (key.includes("Easter_Egg") || key.includes("Test_ChatGpt")) return false;
  if (key === "Salve_Healed" && [...usedActors].some((id) => id.startsWith("Salve_"))) return true;
  for (const id of usedActors) {
    if (key === id || key.startsWith(`${id}_`)) return true;
  }
  return false;
}

const vendorPath = path.join(ROOT, "vendor/vendor.75f6e6ae65453426.js");
const overlayPath = path.join(ROOT, "reference/assets/studio-bridge.js");
const { source: overlaySource, overlay, apply: overlayApply } = parseOverlay(overlayPath);
const vendorSource = read(vendorPath);

const usedAssets = new Set(KEEP_ASSETS);
const usedActors = new Set(["Intro"]);
const usedTypes = new Set();

for (const name of KEEP_SCENES) {
  collectScene(overlay[name] || overlay[`Scene_${name}`], usedAssets, usedActors, usedTypes);
  collectScene(parseSceneJson(vendorSource, name), usedAssets, usedActors, usedTypes);
}

const keptOverlay = {};
for (const name of KEEP_SCENES) {
  const scene = overlay[name] || overlay[`Scene_${name}`];
  if (!scene) continue;
  keptOverlay[name] = scene;
  keptOverlay[`Scene_${name}`] = scene;
}
fs.writeFileSync(
  overlayPath,
  `window.noSupercache=true;\nwindow.__STUDIO_OVERLAY__=${JSON.stringify(keptOverlay)};\n${overlayApply}`,
);

for (const file of [
  path.join(ROOT, "vendor/vendor.75f6e6ae65453426.js"),
  path.join(ROOT, "reference/assets/vendor.75f6e6ae65453426.js"),
]) {
  if (fs.existsSync(file)) patchVendor(file, usedAssets);
}

for (const file of [
  path.join(ROOT, "vendor/webgl.3250e36a65453426.js"),
  path.join(ROOT, "reference/assets/webgl.3250e36a65453426.js"),
]) {
  if (fs.existsSync(file)) patchWebgl(file);
}

const packPath = path.join(ROOT, "reference/assets/studio-game-pack.json");
if (fs.existsSync(packPath)) {
  const pack = JSON.parse(read(packPath));
  if (pack.scenes) {
    pack.scenes = Object.fromEntries(
      Object.entries(pack.scenes).filter(([key]) => KEEP_SCENES.has(key.replace(/^Scene_/, ""))),
    );
  }
  if (pack.dialogs_en) {
    pack.dialogs_en = Object.fromEntries(
      Object.entries(pack.dialogs_en).filter(([key]) => keepDialogKey(key, usedActors)),
    );
  }
  if (pack.characters_en?.npcs) {
    pack.characters_en.npcs = Object.fromEntries(
      Object.entries(pack.characters_en.npcs).filter(([key]) => usedActors.has(key)),
    );
    if (pack.characters_en.npcs.Trail_Quest?.script === "MiniGame") {
      pack.characters_en.npcs.Trail_Quest.script = "Ambassador";
      pack.characters_en.npcs.Trail_Quest.scriptArgs = {
        ...(pack.characters_en.npcs.Trail_Quest.scriptArgs || {}),
        fintech: "trail",
      };
      delete pack.characters_en.npcs.Trail_Quest.scriptArgs.scene;
    }
  }
  writeJson(packPath, pack);
}

function filterJsonFile(file, keep) {
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(read(file));
  const next = keep(data);
  writeJson(file, next);
}

filterJsonFile(path.join(ROOT, "reference/assets/dialogs_en.json"), (data) =>
  Object.fromEntries(Object.entries(data).filter(([key]) => keepDialogKey(key, usedActors))),
);

filterJsonFile(path.join(ROOT, "reference/assets/characters_en.json"), (data) => {
  const npcs = Object.fromEntries(
    Object.entries(data.npcs || {}).filter(([key]) => usedActors.has(key)),
  );
  if (npcs.Trail_Quest?.script === "MiniGame") {
    npcs.Trail_Quest.script = "Ambassador";
    npcs.Trail_Quest.scriptArgs = { ...(npcs.Trail_Quest.scriptArgs || {}), fintech: "trail" };
    delete npcs.Trail_Quest.scriptArgs.scene;
  }
  return { ...data, npcs };
});

filterJsonFile(path.join(ROOT, "reference/assets/quests_en.json"), (data) =>
  Object.fromEntries(
    Object.entries(data).filter(([, quest]) => !JSON.stringify(quest).includes("CircuitBike")),
  ),
);

const sceneDir = path.join(ROOT, "direct-port/data/scenes");
if (fs.existsSync(sceneDir)) {
  for (const name of fs.readdirSync(sceneDir)) {
    if (!name.startsWith("Scene_") || !name.endsWith(".json")) continue;
    const id = name.slice("Scene_".length, -".json".length);
    if (!KEEP_SCENES.has(id)) fs.unlinkSync(path.join(sceneDir, name));
  }
  for (const name of KEEP_SCENES) {
    const scene = keptOverlay[name];
    if (scene) writeJson(path.join(sceneDir, `Scene_${name}.json`), scene);
  }
}

const applyPath = path.join(ROOT, "scripts/apply-to-datab-each.mjs");
let apply = read(applyPath);
if (!apply.includes("KEEP_PLAYABLE_SCENES")) {
  apply = apply.replace(
    'const BLOCKED_HINTS = new Set(["customize", "map", "fintech", "partner"]);',
    `const BLOCKED_HINTS = new Set(["customize", "map", "fintech", "partner"]);
const KEEP_PLAYABLE_SCENES = new Set(["IslandIntro", "IslandWest"]);`,
  );
  apply = apply.replace(
    `  if (pack.scenes) {
    for (const [key, scene] of Object.entries(pack.scenes)) {
      pack.scenes[key] = shippedScene(scene);
    }
  }`,
    `  if (pack.scenes) {
    for (const [key, scene] of Object.entries(pack.scenes)) {
      if (!KEEP_PLAYABLE_SCENES.has(sceneIdFromPackKey(key))) {
        delete pack.scenes[key];
        continue;
      }
      pack.scenes[key] = shippedScene(scene);
    }
  }`,
  );
  fs.writeFileSync(applyPath, apply);
}

const assetsDir = path.join(ROOT, "reference/assets");
const deleted = [];
const DROP_NAME_RE = /(?:CircuitBike|EasterEgg|TestLab|Sunfall|Miamivice|music_intro|music_minigame|music_secret)/i;

for (const file of fs.readdirSync(assetsDir)) {
  const full = path.join(assetsDir, file);
  if (!fs.statSync(full).isFile()) continue;

  const assetMatch = file.match(/^Asset_(.+)\.[^.]+$/);
  if (assetMatch) {
    const logical = assetMatch[1].replace(/\.[a-f0-9]{8,}$/i, "");
    if (!usedAssets.has(logical)) {
      fs.unlinkSync(full);
      deleted.push(file);
      continue;
    }
  }

  if (/^Scene_(CircuitBike|EasterEgg|TestLab)([._]|$)/.test(file)) {
    fs.unlinkSync(full);
    deleted.push(file);
    continue;
  }

  if (file.startsWith("jetski.") && file.endsWith(".glb")) {
    fs.unlinkSync(full);
    deleted.push(file);
    continue;
  }

  if (DROP_NAME_RE.test(file) && !file.includes("IslandIntro") && !file.includes("IslandWest")) {
    fs.unlinkSync(full);
    deleted.push(file);
  }
}

const report = {
  keptScenes: [...KEEP_SCENES],
  usedActors: [...usedActors].sort(),
  usedTypes: [...usedTypes].sort(),
  usedAssets: [...usedAssets].sort(),
  deletedCount: deleted.length,
  remainingGlb: fs.readdirSync(assetsDir).filter((name) => name.endsWith(".glb")).length,
};
fs.writeFileSync(path.join(ROOT, "scripts/prune-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ...report, deletedSample: deleted.slice(0, 40) }, null, 2));
