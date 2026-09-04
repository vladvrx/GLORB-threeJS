#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const bundlePath = path.join(ROOT, "studio/public/game/data/bundle.json");

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!fs.existsSync(bundlePath)) fail("studio bundle is missing");
const bundle = JSON.parse(fs.readFileSync(bundlePath, "utf8"));
const ids = Object.keys(bundle.scenes ?? {});
if (ids.sort().join(",") !== "IslandWest,PaintSquare") {
  fail(`studio maps should be IslandWest + PaintSquare, got ${ids.join(", ")}`);
}

for (const drop of ["CircuitBike", "EasterEgg", "IslandIntro", "TestLab"]) {
  if (bundle.scenes[drop]) fail(`studio still ships ${drop}`);
}

const west = bundle.scenes.IslandWest;
const paint = bundle.scenes.PaintSquare;
if ((west.props || []).length || (west.actors || []).length) fail("Island West is not empty");
if ((paint.props || []).length || (paint.actors || []).length) fail("paint square is not empty");
if (paint.procedural !== "paint-square") fail("paint square is not a procedural slab");
if (!west.points?.["Spawn.001"] || !west.points?.["PortSpawnB.001"]) fail("Island West is missing spawns");
if (!paint.points?.["Spawn.001"]) fail("paint square is missing Spawn.001");

const catalog = bundle.catalog ?? [];
const blocked = catalog.filter((asset) =>
  /^(Stand|underStand|Bike|Circuit|Race|CarRace|BorderRace|InitRace|PitStop|StartLine|BoatRace)/i.test(asset.id) ||
  /Ufo/i.test(asset.id),
);
if (blocked.length) fail(`studio catalog still has ${blocked.map((item) => item.id).join(", ")}`);

const npcs = Object.keys(bundle.characters?.npcs ?? {});
if (npcs.join() !== "Intro") fail(`studio NPCs should be Intro only, got ${npcs.join(", ")}`);
if (Object.keys(bundle.quests ?? {}).length) fail("studio still has quests");
if ((bundle.notifications?.hints ?? []).length) fail("studio still has hint toasts");

const dialogs = Object.keys(bundle.dialogs ?? {});
if (!dialogs.includes("Intro") || !dialogs.includes("dev")) fail("studio is missing Intro/dev dialogue");

const scenesDir = path.join(ROOT, "studio/public/game/scenes");
const sceneFiles = fs.readdirSync(scenesDir);
if (sceneFiles.sort().join() !== "IslandWest.glb") fail(`unexpected studio scene files: ${sceneFiles.join(", ")}`);

console.log("studio maps: Island West + paint square");
