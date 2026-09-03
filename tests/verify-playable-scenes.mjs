#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const KEEP = new Set(["IslandIntro", "IslandWest"]);
const DROP = ["CircuitBike", "EasterEgg", "TestLab"];

function fail(message) {
  console.error(message);
  process.exit(1);
}

const overlay = fs.readFileSync(path.join(ROOT, "reference/assets/studio-bridge.js"), "utf8");
const marker = "window.__STUDIO_OVERLAY__=";
const applyAt = overlay.indexOf("window.__STUDIO_APPLY__");
let json = overlay.slice(overlay.indexOf(marker) + marker.length, applyAt).trim();
if (json.endsWith(";")) json = json.slice(0, -1);
const scenes = JSON.parse(json);
const overlayIds = [...new Set(Object.keys(scenes).map((key) => key.replace(/^Scene_/, "")))];
for (const id of overlayIds) {
  if (!KEEP.has(id)) fail(`studio overlay still has ${id}`);
}
for (const id of KEEP) {
  if (!scenes[id] && !scenes[`Scene_${id}`]) fail(`studio overlay missing ${id}`);
}

const vendor = fs.readFileSync(path.join(ROOT, "vendor/vendor.75f6e6ae65453426.js"), "utf8");
if (!vendor.includes('filter(t=>t==="IslandIntro"||t==="IslandWest")')) {
  fail("vendor scene list is not limited to IslandIntro and IslandWest");
}
for (const name of DROP) {
  const stub = `"name":"${name}","assets":[]`;
  if (!vendor.includes(stub) && !vendor.includes(`{"name":"${name}","assets":[]`)) {
    fail(`vendor still has a full ${name} scene manifest`);
  }
}

const assets = path.join(ROOT, "reference/assets");
for (const file of fs.readdirSync(assets)) {
  if (/^Scene_(CircuitBike|EasterEgg|TestLab)/.test(file)) fail(`unused scene file still on disk: ${file}`);
  if (/^music_(intro|minigame|secret)/.test(file)) fail(`unused music still on disk: ${file}`);
}

const pack = JSON.parse(fs.readFileSync(path.join(assets, "studio-game-pack.json"), "utf8"));
for (const key of Object.keys(pack.scenes || {})) {
  if (!KEEP.has(key.replace(/^Scene_/, ""))) fail(`studio-game-pack still has ${key}`);
}

console.log("playable slice is IslandIntro + IslandWest only");
