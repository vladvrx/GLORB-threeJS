#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STAND_RE = /\b(StandFair|StandA|underStand|StandCheese|StandNeutral05|StandAven|StandBrigit|StandPomelo|StandZenda|StandTechCompany|FintechStandGround|PartnerStandGround)\b/;

function fail(message) {
  console.error(message);
  process.exit(1);
}

function scanJson(value) {
  const hits = [];
  JSON.stringify(value, (key, next) => {
    if (typeof next === "string" && STAND_RE.test(next) && key !== "file" && !next.endsWith(".glb")) {
      if (key === "uid" || key === "id" || key === "type" || key === "actorType" || key === "asset" || key === "className") {
        hits.push(`${key}:${next}`);
      }
    }
    return next;
  });
  return hits;
}

const pack = JSON.parse(fs.readFileSync(path.join(ROOT, "reference/assets/studio-game-pack.json"), "utf8"));
const packHits = scanJson(pack.scenes);
if (packHits.length) fail(`studio-game-pack still has booths: ${packHits.join(", ")}`);

const bridge = fs.readFileSync(path.join(ROOT, "reference/assets/studio-bridge.js"), "utf8");
if (STAND_RE.test(bridge)) fail("studio-bridge.js still contains StandFair / stand booths");

const vendor = fs.readFileSync(path.join(ROOT, "vendor/vendor.75f6e6ae65453426.js"), "utf8");
const islandNeedle = 'JSON.parse(\'{"name":"IslandWest"';
const islandStart = vendor.indexOf(islandNeedle);
if (islandStart < 0) fail("IslandWest manifest missing from vendor bundle");
let islandEnd = islandStart;
for (let i = islandStart + "JSON.parse('".length; i < vendor.length; i += 1) {
  if (vendor[i] === "\\") {
    i += 1;
    continue;
  }
  if (vendor[i] === "'") {
    islandEnd = i;
    break;
  }
}
const island = JSON.parse(vendor.slice(islandStart + "JSON.parse('".length, islandEnd).replaceAll("\\'", "'"));
const vendorHits = scanJson(island);
if (vendorHits.length) fail(`vendor IslandWest still has booths: ${vendorHits.join(", ")}`);
if ((island.props || []).length) fail("vendor IslandWest still has scenery props");
if ((island.assets || []).length) fail("vendor IslandWest still lists scenery assets");

console.log("ok: no StandFair booths in shipped scenes");
