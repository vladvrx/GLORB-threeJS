#!/usr/bin/env node
/**
 * Keep Glorb Studio on Island West + the paint square, and delete every
 * extra map, booth mesh, bike-circuit kit, and unused public file.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GAME = path.resolve(STUDIO, "..");

const GLORB_ISLAND = {
  cx: -153.8588555,
  cz: 13.567255,
  rx: 52,
  rz: 56,
  floorY: 3.8,
  thickness: 2.4,
};

const WEST_ORIGINAL_BOUNDS = [
  [-217.414489, -21.549696, -62.174738],
  [36.808045, 17.128553, 240.793234],
];

const WEST_REMAINING_BOUNDS = [
  [-217.414489, -21.549696, -62.174738],
  [-90.303222, 17.128553, 89.309248],
];

const PAINT_SQUARE_BOUNDS = [
  [
    GLORB_ISLAND.cx - GLORB_ISLAND.rx,
    GLORB_ISLAND.floorY - GLORB_ISLAND.thickness,
    GLORB_ISLAND.cz - GLORB_ISLAND.rz,
  ],
  [GLORB_ISLAND.cx + GLORB_ISLAND.rx, GLORB_ISLAND.floorY + 0.4, GLORB_ISLAND.cz + GLORB_ISLAND.rz],
];

const WEST_SPAWN = [-144.80751, 3.800204, 23.634537, 1, 1, 1, 0, -0.70538, 0, 0.708829];

const DROP_ASSET_RE = [
  /^Stand/i,
  /^underStand$/i,
  /^Bike/i,
  /^Circuit/i,
  /^Race/i,
  /^CarRace/i,
  /^BorderRace$/i,
  /^InitRace$/i,
  /^PitStop$/i,
  /^StartLine$/i,
  /^BoatRace/i,
  /Ufo/i,
  /^Easter/i,
];

function dropAsset(id) {
  return DROP_ASSET_RE.some((pattern) => pattern.test(id));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value)}\n`);
}

function spawnPoint(name) {
  return {
    id: `point:${name}`,
    name,
    kind: "point",
    asset: "",
    transform: [...WEST_SPAWN],
    visible: true,
  };
}

function emptyScene(id, name, glb, bounds, fullBounds) {
  return {
    id,
    name,
    glb,
    terrain: id === "IslandWest" ? "/game/textures/IslandWest_terrain.png" : null,
    bounds,
    useBaseAsCollider: true,
    points: {
      "Spawn.001": [...WEST_SPAWN],
      "PortSpawnB.001": [...WEST_SPAWN],
    },
    areas: {},
    curves: {},
    actors: [],
    props: [],
  };
}

const bundlePath = path.join(STUDIO, "public/game/data/bundle.json");
const bundle = readJson(bundlePath);
const catalog = (bundle.catalog ?? []).filter((asset) => !dropAsset(asset.id));
const keepIds = new Set(catalog.map((asset) => asset.id));

const gameDialogs = readJson(path.join(GAME, "reference/assets/dialogs_en.json"));
const gameCharacters = readJson(path.join(GAME, "reference/assets/characters_en.json"));
const locale = { ...(bundle.locale ?? {}) };
delete locale.phone;
if (locale.hint && typeof locale.hint === "object") {
  for (const key of ["customize", "map", "fintech", "enroll", "accessories"]) {
    delete locale.hint[key];
  }
}

const next = {
  format: "datab-each-studio-v1",
  upAxis: "z",
  gameUpAxis: "y",
  catalog,
  scenes: {
    IslandWest: emptyScene(
      "IslandWest",
      "Island West",
      "/game/scenes/IslandWest.glb",
      WEST_REMAINING_BOUNDS,
      WEST_ORIGINAL_BOUNDS,
    ),
    PaintSquare: {
      ...emptyScene("PaintSquare", "Paint square", "", PAINT_SQUARE_BOUNDS, PAINT_SQUARE_BOUNDS),
      procedural: "paint-square",
    },
  },
  quests: {},
  characters: {
    npcs: {
      Intro: gameCharacters.npcs?.Intro ?? {
        gradientID: 0,
        face: 1,
        script: "Intro",
        scriptArgs: { scene: "IslandWest", point: "PortSpawnB" },
      },
    },
    colors: gameCharacters.colors ?? bundle.characters?.colors ?? {},
  },
  dialogs: {
    Intro: gameDialogs.Intro,
    ...(gameDialogs.dev ? { dev: gameDialogs.dev } : {}),
  },
  items: {},
  fintechs: {},
  notifications: { hints: [], overlays: [] },
  locale,
  actorTypes: [
    "BrokenBridge",
    "Chest",
    "ChestBig",
    "CobbleHouse",
    "FlagPole",
    "GrowableTree",
    "Lighthouse",
    "NPC",
    "ShopForSale",
    "Speakers",
    "Tamtam",
    "Telescope",
    "Zipline",
  ],
};

next.scenes.IslandWest.fullBounds = WEST_ORIGINAL_BOUNDS;
next.scenes.PaintSquare.fullBounds = PAINT_SQUARE_BOUNDS;

writeJson(bundlePath, next);

const modelsDir = path.join(STUDIO, "public/game/models");
let removedModels = 0;
for (const name of fs.readdirSync(modelsDir)) {
  if (!name.endsWith(".glb") && !name.endsWith(".gltf")) continue;
  const id = name.replace(/\.(glb|gltf)$/i, "");
  if (keepIds.has(id)) continue;
  fs.unlinkSync(path.join(modelsDir, name));
  removedModels += 1;
}

const scenesDir = path.join(STUDIO, "public/game/scenes");
let removedScenes = 0;
for (const name of fs.readdirSync(scenesDir)) {
  if (name === "IslandWest.glb") continue;
  fs.unlinkSync(path.join(scenesDir, name));
  removedScenes += 1;
}

const texturesDir = path.join(STUDIO, "public/game/textures");
let removedTextures = 0;
for (const name of fs.readdirSync(texturesDir)) {
  if (name.startsWith("IslandWest_")) continue;
  fs.unlinkSync(path.join(texturesDir, name));
  removedTextures += 1;
}

const catalogPath = path.join(STUDIO, "public/game/data/catalog.json");
if (fs.existsSync(catalogPath)) fs.unlinkSync(catalogPath);

for (const name of ["file.svg", "globe.svg", "next.svg", "vercel.svg", "window.svg"]) {
  const file = path.join(STUDIO, "public", name);
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

for (const name of ["quest-editor.tsx", "notification-editor.tsx"]) {
  const file = path.join(STUDIO, "src/components/editor", name);
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

console.log(
  JSON.stringify(
    {
      scenes: Object.keys(next.scenes),
      catalog: catalog.length,
      dialogs: Object.keys(next.dialogs),
      npcs: Object.keys(next.characters.npcs),
      removedModels,
      removedScenes,
      removedTextures,
      spawn: spawnPoint("Spawn.001").id,
    },
    null,
    2,
  ),
);
