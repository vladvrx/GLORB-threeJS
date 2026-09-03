import fs from "node:fs";
import path from "node:path";
import { packFromUnknown } from "../scripts/apply-to-datab-each.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const STAND_RE = /\b(StandFair|StandA|underStand|StandCheese|StandNeutral05|StandAven|StandBrigit|StandPomelo|StandZenda|StandTechCompany|FintechStandGround|PartnerStandGround)\b/;

function fail(message) {
  console.error(message);
  process.exit(1);
}

function scanJson(label, value) {
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
const packHits = scanJson("pack", pack.scenes);
if (packHits.length) fail(`studio-game-pack still has booths: ${packHits.join(", ")}`);

const bridge = fs.readFileSync(path.join(ROOT, "reference/assets/studio-bridge.js"), "utf8");
if (STAND_RE.test(bridge)) fail("studio-bridge.js still contains StandFair / stand booths");

const vendor = fs.readFileSync(path.join(ROOT, "vendor/vendor.75f6e6ae65453426.js"), "utf8");
const islandNeedle = 'JSON.parse(\'{"name":"IslandWest"';
const islandStart = vendor.indexOf(islandNeedle);
if (islandStart < 0) fail("IslandWest manifest missing from vendor bundle");
let islandEnd = islandStart;
for (let i = islandStart + "JSON.parse('".length; i < vendor.length; i += 1) {
  if (vendor[i] === "\\" ) {
    i += 1;
    continue;
  }
  if (vendor[i] === "'") {
    islandEnd = i;
    break;
  }
}
const island = JSON.parse(vendor.slice(islandStart + "JSON.parse('".length, islandEnd).replaceAll("\\'", "'"));
const vendorHits = scanJson("vendor IslandWest", island);
if (vendorHits.length) fail(`vendor IslandWest still has booths: ${vendorHits.join(", ")}`);

const studioBundlePath = "/tmp/glorb-studio/public/game/data/bundle.json";
if (fs.existsSync(studioBundlePath)) {
  const stripped = packFromUnknown(JSON.parse(fs.readFileSync(studioBundlePath, "utf8")));
  const west = stripped.scenes.Scene_IslandWest;
  const leftover = [
    ...(west.props ?? []).filter((item) => STAND_RE.test(item.asset || "")).map((item) => item.asset),
    ...(west.actors ?? []).filter((item) => STAND_RE.test(item.type || "") || STAND_RE.test(item.uid || "")).map((item) => item.uid),
  ];
  if (leftover.length) fail(`apply still ships booths from Studio: ${leftover.join(", ")}`);
}

console.log("ok: no StandFair booths in shipped scenes");
