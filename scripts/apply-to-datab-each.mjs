#!/usr/bin/env node

import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const GAME_REPO = process.env.DATAB_EACH_REPO || "https://github.com/vladvrx/DATAB-EACH.git";
const DEFAULT_ROOT = process.env.DATAB_EACH_ROOT || "/tmp/datab-each";
const TMUX_CONF = "/exec-daemon/tmux.portal.conf";

const BRAND = [
  ["Cove Island", "GLORB"],
  ["Island West", "GLORB"],
  ["Citizen_West_PomeloIslandHint", "Citizen_West_PylonIslandHint"],
  ["NPC_Citizen_West_PomeloIslandHint", "NPC_Citizen_West_PylonIslandHint"],
  ["AvenHouse", "CobbleHouse"],
  ["AvenMain", "CobbleMain"],
  ["AvenSide", "CobbleSide"],
  ["BrigitMain", "TrailMain"],
  ["BrigitSide", "TrailSide"],
  ["PomeloMain", "PylonMain"],
  ["ZendaMain", "SalveMain"],
  ["ZendaSide", "SalveSide"],
  ["Aven_", "Cobble_"],
  ["Brigit_", "Trail_"],
  ["Pomelo_", "Pylon_"],
  ["ZendaSick", "SalveSick"],
  ["Zenda_", "Salve_"],
  ["fintech-aven", "interactions-hammer"],
  ["fintech-brigit", "misc-bike"],
  ["fintech-pomelo", "interactions-screwdriver"],
  ["fintech-zenda", "interactions-stethoscope"],
];

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

const BLOCKED_ASSETS = new Set([
  "StandAven",
  "StandBrigit",
  "StandPomelo",
  "StandZenda",
  "StandFair",
  "StandA",
  "underStand",
  "StandCheese",
  "StandNeutral05",
]);

const BLOCKED_ACTORS = new Set(["FintechStandGround", "PartnerStandGround"]);

function isBlockedAsset(name) {
  if (!name) return false;
  if (BLOCKED_ASSETS.has(name)) return true;
  return String(name).startsWith("StandTechCompany");
}

function isBlockedActor(actor) {
  if (!actor || typeof actor !== "object") return false;
  const type = actor.type || actor.actorType || actor.className;
  if (BLOCKED_ACTORS.has(type)) return true;
  if (isBlockedAsset(actor.asset)) return true;
  const uid = String(actor.uid || actor.id || "");
  return uid.startsWith("FintechStandGround") || uid.startsWith("PartnerStandGround");
}

function sceneIdFromPackKey(key) {
  return key.startsWith("Scene_") ? key.slice("Scene_".length) : key;
}

function shippedScene(scene) {
  const props = (scene.props ?? []).filter((item) => !isCustomAsset(item.asset) && !isBlockedAsset(item.asset));
  const assets = [...new Set((scene.assets ?? []).filter((item) => !isCustomAsset(item) && !isBlockedAsset(item)))];
  const actors = (scene.actors ?? []).filter((item) => !isCustomAsset(item.type) && !isBlockedActor(item));
  return { ...scene, props, assets, actors };
}

function asMap(value, idKey = "id") {
  if (!value) return {};
  if (Array.isArray(value)) {
    return Object.fromEntries(value.map((item) => [item[idKey], item]));
  }
  return value;
}

function remapText(value) {
  let next = String(value);
  for (const [from, to] of BRAND) next = next.split(from).join(to);
  next = next.replaceAll('"aven"', '"cobble"');
  next = next.replaceAll('"brigit"', '"trail"');
  next = next.replaceAll('"pomelo"', '"pylon"');
  next = next.replaceAll('"zenda"', '"salve"');
  return next;
}

export function remap(value) {
  return JSON.parse(remapText(JSON.stringify(value)));
}

function deepMerge(target, source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return source;
  const out = { ...(target ?? {}) };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value) && target?.[key] && typeof target[key] === "object" && !Array.isArray(target[key])) {
      out[key] = deepMerge(target[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function isPackagedGlorb(root) {
  return fs.existsSync(path.join(root, "server.mjs")) && fs.existsSync(path.join(root, "three-js"));
}

export function resolveGamePort(root = DEFAULT_ROOT) {
  if (process.env.DATAB_EACH_PORT) return Number(process.env.DATAB_EACH_PORT);
  if (process.env.DATAB_EACH_ORIGIN) {
    try {
      const port = Number(new URL(process.env.DATAB_EACH_ORIGIN).port);
      if (Number.isFinite(port) && port > 0) return port;
    } catch {
      // fall through
    }
  }
  if (isPackagedGlorb(root)) return 43219;
  return 43173;
}

function preserveQuestIcons(root, quests) {
  const file = path.join(root, "reference", "assets", "quests_en.json");
  if (!quests || !fs.existsSync(file)) return quests;
  const current = readJson(file);
  for (const [id, quest] of Object.entries(quests)) {
    if (quest && (quest.icon == null || quest.icon === "") && current[id]?.icon) {
      quest.icon = current[id].icon;
    }
  }
  return quests;
}

const BLOCKED_HINTS = new Set(["customize", "map", "fintech", "partner"]);
const KEEP_PLAYABLE_SCENES = new Set(["IslandIntro", "IslandWest"]);

function stripMapMention(text) {
  if (typeof text !== "string") return text;
  return text
    .replaceAll("Click here to open the map &amp; find out what you can visit", "")
    .replaceAll("Click here to open the map & find out what you can visit", "")
    .replaceAll("Open the map to quickly navigate and discover places to go", "");
}

function stripBlockedHints(pack, site) {
  if (Array.isArray(pack?.notifications)) {
    pack.notifications = pack.notifications
      .filter((item) => !BLOCKED_HINTS.has(item.id))
      .map((item) => ({
        ...item,
        title: stripMapMention(item.title),
        description: stripMapMention(item.description),
      }));
  }
  if (pack?.site_hints) {
    for (const id of BLOCKED_HINTS) delete pack.site_hints[id];
    for (const hint of Object.values(pack.site_hints)) {
      if (!hint || typeof hint !== "object") continue;
      hint.title = stripMapMention(hint.title);
      hint.description = stripMapMention(hint.description);
    }
  }
  if (pack?.locale?.hint) {
    for (const id of BLOCKED_HINTS) delete pack.locale.hint[id];
    for (const hint of Object.values(pack.locale.hint)) {
      if (!hint || typeof hint !== "object") continue;
      hint.title = stripMapMention(hint.title);
      hint.description = stripMapMention(hint.description);
    }
  }
  if (site?.site?.hint) {
    for (const id of BLOCKED_HINTS) delete site.site.hint[id];
    for (const hint of Object.values(site.site.hint)) {
      if (!hint || typeof hint !== "object") continue;
      hint.title = stripMapMention(hint.title);
      hint.description = stripMapMention(hint.description);
    }
  }
}

function mergeSiteCopy(root, pack) {
  const sitePath = path.join(root, "direct-port", "data", "site.json");
  if (!fs.existsSync(sitePath)) return null;
  const site = readJson(sitePath);
  const locale = pack.locale ?? {};
  const notifications = Array.isArray(pack.notifications) ? pack.notifications : [];
  site.site = deepMerge(site.site ?? {}, locale);
  if (site.site.phone?.title?.fintech && !site.site.phone.title.partner) {
    site.site.phone.title.partner = site.site.phone.title.fintech;
  }
  if (site.site.phone?.desc?.fintech && !site.site.phone.desc.partner) {
    site.site.phone.desc.partner = site.site.phone.desc.fintech;
  }
  for (const item of notifications) {
    if (item.type === "hint") {
      if (BLOCKED_HINTS.has(item.id)) continue;
      site.site.hint ??= {};
      const key = item.id === "fintech" ? "partner" : item.id;
      if (BLOCKED_HINTS.has(key)) continue;
      site.site.hint[key] = { title: item.title ?? "", description: item.description ?? "" };
    }
    if (item.id === "MainQuestCompleted" && site.site.quest?.end) {
      site.site.quest.end.title = item.title;
    }
    if (item.id === "QuestCompleted" && site.site.quest) {
      site.site.quest.completed = item.title;
    }
    if (item.id === "QuestProgress" && site.site.quest) {
      site.site.quest.progress = item.description || item.title;
    }
  }
  stripBlockedHints(pack, site);
  writeJson(sitePath, site);
  return {
    startCta: site.site.cta?.start ?? null,
    questCompleted: site.site.quest?.completed ?? null,
  };
}

function bustJsonFetches(source, token) {
  return source
    .replace(/fetch\((\w+) \+ "\?v=[^"]*"\)/g, `fetch($1 + "?v=${token}")`)
    .replace(/fetch\((\w+)\+"\?v=[^"]*"\)/g, `fetch($1+"?v=${token}")`);
}

function patchBoot(file, token) {
  if (!fs.existsSync(file)) return false;
  const original = fs.readFileSync(file, "utf8");
  const source = original
    .replace(/searchParams\.set\(\s*"v"\s*,\s*"[^"]*"\s*\)/g, `searchParams.set("v", "${token}")`)
    .replace(/engine\.js\?v=[^"']+/g, `engine.js?v=${token}`);
  if (source !== original) fs.writeFileSync(file, source);
  return source !== original;
}

function bustGameCaches(root, token) {
  const patched = { vendorFetch: [], boot: [], html: [] };
  const vendorFiles = [...listHashed(path.join(root, "vendor"), "vendor."), ...listHashed(path.join(root, "reference", "assets"), "vendor.")];
  for (const file of vendorFiles) {
    if (!fs.existsSync(file)) continue;
    const original = fs.readFileSync(file, "utf8");
    const source = bustJsonFetches(original, token);
    if (source !== original) {
      fs.writeFileSync(file, source);
      patched.vendorFetch.push(path.relative(root, file));
    }
  }
  for (const rel of ["three-js/src/boot.js", "direct-port/src/bootstrap.js"]) {
    const file = path.join(root, rel);
    if (patchBoot(file, token)) patched.boot.push(rel);
  }
  return patched;
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
      .filter((object) => object.kind === "actor" && !isBlockedActor({
        type: object.actorType,
        actorType: object.actorType,
        asset: object.asset,
        uid: object.id,
        id: object.id,
      }))
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
    locale: input.locale ?? {},
    site_hints: input.site_hints,
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

const RUN_FX_SWAPS = [
  [
    "e.alphaFrom=1,e.alphaTo=1,e.colorFrom.copy(new V(16777215)).multiplyScalar(1),e.colorTo.copy(new V(7327214)).multiplyScalar(1)",
    "e.alphaFrom=1,e.alphaTo=1,e.colorFrom.copy(new V(6211839)).multiplyScalar(1),e.colorTo.copy(new V(2854890)).multiplyScalar(1)",
  ],
  [
    "e.alphaFrom = 1, e.alphaTo = 1, e.colorFrom.copy(new V(16777215)).multiplyScalar(1), e.colorTo.copy(new V(7327214)).multiplyScalar(1)",
    "e.alphaFrom = 1, e.alphaTo = 1, e.colorFrom.copy(new V(6211839)).multiplyScalar(1), e.colorTo.copy(new V(2854890)).multiplyScalar(1)",
  ],
  [
    "e.scaleFrom.copy(i),e.scaleTo.setScalar(0),e.alpha=1}",
    "e.scaleFrom.copy(i),e.scaleTo.setScalar(0),e.alpha=1,e.colorFrom.copy(new V(6211839)).multiplyScalar(1),e.colorTo.copy(new V(2854890)).multiplyScalar(1)}",
  ],
  [
    "e.scaleFrom.copy(i), e.scaleTo.setScalar(0), e.alpha = 1;",
    "e.scaleFrom.copy(i), e.scaleTo.setScalar(0), e.alpha = 1, e.colorFrom.copy(new V(6211839)).multiplyScalar(1), e.colorTo.copy(new V(2854890)).multiplyScalar(1);",
  ],
];

const INTRO_CAM_SWAPS = [
  [
    "introFrom:{position:[-7.900966,76.942503,124.816482],quaternion:[-.17203494,-.38932646,-.07426799,.90183876]},introTo:{position:[-39.199139,39.079015,-39.791217],quaternion:[-.06789136,-.70262188,-.06765479,.70507878]}",
    "introFrom:{position:[-55.296578,76.942503,-308.65067],quaternion:[.01040273,.98944982,.11040314,-.09323084]},introTo:{position:[-23.998405,39.079015,-144.042971],quaternion:[-.02222519,.94912906,.30646747,.06883137]}",
  ],
  [
    "introFrom:{position:[-55.296578,76.942503,-308.65067],quaternion:[-.07426799,.90183876,.17203494,.38932646]},introTo:{position:[-23.998405,39.079015,-144.042971],quaternion:[-.06765479,.70507878,.06789136,.70262188]}",
    "introFrom:{position:[-55.296578,76.942503,-308.65067],quaternion:[.01040273,.98944982,.11040314,-.09323084]},introTo:{position:[-23.998405,39.079015,-144.042971],quaternion:[-.02222519,.94912906,.30646747,.06883137]}",
  ],
  [
    `introFrom: {
    position: [-7.900966, 76.942503, 124.816482],
    quaternion: [-.17203494, -.38932646, -.07426799, .90183876]
  },
  introTo: {
    position: [-39.199139, 39.079015, -39.791217],
    quaternion: [-.06789136, -.70262188, -.06765479, .70507878]
  }`,
    `introFrom: {
    position: [-55.296578, 76.942503, -308.65067],
    quaternion: [.01040273, .98944982, .11040314, -.09323084]
  },
  introTo: {
    position: [-23.998405, 39.079015, -144.042971],
    quaternion: [-.02222519, .94912906, .30646747, .06883137]
  }`,
  ],
  [
    `introFrom: {
    position: [-55.296578, 76.942503, -308.65067],
    quaternion: [-.07426799, .90183876, .17203494, .38932646]
  },
  introTo: {
    position: [-23.998405, 39.079015, -144.042971],
    quaternion: [-.06765479, .70507878, .06789136, .70262188]
  }`,
    `introFrom: {
    position: [-55.296578, 76.942503, -308.65067],
    quaternion: [.01040273, .98944982, .11040314, -.09323084]
  },
  introTo: {
    position: [-23.998405, 39.079015, -144.042971],
    quaternion: [-.02222519, .94912906, .30646747, .06883137]
  }`,
  ],
];

function applySwaps(source, swaps) {
  let next = source;
  for (const [from, to] of swaps) {
    if (next.includes(to) || !next.includes(from)) continue;
    next = next.split(from).join(to);
  }
  return next;
}

function patchRunFx(source) {
  return applySwaps(source, RUN_FX_SWAPS);
}

function patchIntroCam(source) {
  return applySwaps(source, INTRO_CAM_SWAPS);
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
  source = patchRunFx(patchWaterColors(source));
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

function bustWebglImport(source, token = "neon-water-runfx") {
  return source.replace(
    /import\("(\.\/webgl\.[a-z0-9]+)\.js(?:\?[^"]*)?"\)/g,
    `import("$1.js?v=${token}")`,
  );
}

function patchVendor(file, scenes, token) {
  if (!fs.existsSync(file)) return false;
  let source = fs.readFileSync(file, "utf8");
  for (const [key, scene] of Object.entries(scenes)) {
    source = replaceSceneManifest(source, sceneIdFromPackKey(key), scene);
  }
  source = bustJsonFetches(bustWebglImport(patchIntroCam(source), token), token);
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

function patchIndex(file, stamp = Date.now()) {
  if (!fs.existsSync(file)) return false;
  let source = fs.readFileSync(file, "utf8");
  if (!source.includes("studio-bridge.js")) {
    const tag = `    <script src="./reference/assets/studio-bridge.js?v=${stamp}"></script>\n`;
    const next = source.includes("</head>")
      ? source.replace("</head>", `${tag}  </head>`)
      : source.replace('<div id="app"></div>', `<div id="app"></div>\n    ${tag}`);
    if (next === source) throw new Error("Could not inject studio-bridge.js into index.html");
    source = next;
  } else {
    source = source.replace(/studio-bridge\.js(?:\?v=[^"'\s]*)?/g, `studio-bridge.js?v=${stamp}`);
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
  source = source.replace(/webgl\.([a-z0-9]+)\.js(?:\?v=[^"'\s]*)?/g, `webgl.$1.js?v=${stamp}`);
  source = source.replace(/boot\.js(?:\?v=[^"'\s]*)?/g, `boot.js?v=${stamp}`);
  source = source.replace(/(vendor\.[a-z0-9]+\.js)(?:\?v=[^"'\s]*)?/g, `$1?v=${stamp}`);
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
  if (!next.includes("-p ")) next += ` -p ${resolveGamePort(path.dirname(file))}`;
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
  const gamePort = resolveGamePort(root);
  if (await portOpen(gamePort)) {
    return { started: false, url: `http://127.0.0.1:${gamePort}` };
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
    if (await portOpen(gamePort)) {
      return { started: true, url: `http://127.0.0.1:${gamePort}` };
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`DATAB-EACH did not listen on ${gamePort} after starting the dev server`);
}

export function applyPack(root, pack) {
  const assets = path.join(root, "reference", "assets");
  if (!fs.existsSync(assets)) {
    throw new Error(`DATAB-EACH assets folder not found at ${assets}`);
  }

  pack = remap(pack);
  stripBlockedHints(pack);
  if (pack.scenes) {
    for (const [key, scene] of Object.entries(pack.scenes)) {
      if (!KEEP_PLAYABLE_SCENES.has(sceneIdFromPackKey(key))) {
        delete pack.scenes[key];
        continue;
      }
      pack.scenes[key] = shippedScene(scene);
    }
  }
  pack.quests_en = preserveQuestIcons(root, pack.quests_en ?? {});
  pack.site_hints = Object.fromEntries(
    (Array.isArray(pack.notifications) ? pack.notifications : [])
      .filter((item) => item.type === "hint")
      .map((item) => [item.id, { title: item.title, description: item.description }]),
  );

  writeJson(path.join(assets, "quests_en.json"), pack.quests_en);
  writeJson(path.join(assets, "characters_en.json"), pack.characters_en);
  writeJson(path.join(assets, "dialogs_en.json"), pack.dialogs_en);
  writeJson(path.join(assets, "studio-game-pack.json"), pack);
  if (pack.notifications) writeJson(path.join(assets, "studio-notifications.json"), pack.notifications);
  writeBridge(path.join(assets, "studio-bridge.js"), pack.scenes ?? {});
  writePreloaderOverride(path.join(assets, "studio-preloader.css"));
  const site = mergeSiteCopy(root, pack);

  const stamp = Date.now();
  const token = `studio-apply-${stamp}`;
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
    if (patchVendor(file, pack.scenes ?? {}, token)) patched.vendor.push(path.relative(root, file));
    if (patchPreloaderWaves(file)) patched.preloader.push(path.relative(root, file));
  }
  const vendorCss = fs
    .readdirSync(assets)
    .filter((name) => name.startsWith("vendor.") && name.endsWith(".css"))
    .map((name) => path.join(assets, name));
  for (const file of vendorCss) {
    if (patchPreloaderCss(file)) patched.preloader.push(path.relative(root, file));
  }
  patchIndex(path.join(root, "index.html"), token);
  patchIndex(path.join(root, "three-js", "index.html"), token);
  patchNextConfig(path.join(root, "next.config.ts"));
  patchGamePackage(path.join(root, "package.json"));
  const caches = bustGameCaches(root, token);

  return {
    root,
    locales: ["quests_en.json", "characters_en.json", "dialogs_en.json", "studio-notifications.json"],
    scenes: Object.keys(pack.scenes ?? {}),
    intro: pack.dialogs_en?.Intro?.Hello?.bubbles?.[0] ?? null,
    startCta: site?.startCta ?? null,
    cacheToken: token,
    patched: { ...patched, ...caches },
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
          name: "GLORB",
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
      quests: [{ id: "AvenMain", title: "Demo quest", icon: "fintech-aven" }],
      characters: [{ id: "Intro", gradientID: 1, face: 0, script: "Intro", scriptArgs: {} }],
      dialogs: [{ id: "Intro", first: "Hello", nodes: [{ id: "Hello", bubbles: ["Welcome aboard, newcomer..."], next: [] }] }],
      locale: { cta: { start: "Start the journey" } },
      notifications: [{ id: "QuestCompleted", type: "quest", title: "Quest complete", description: "Completed quests" }],
    });
    if (sample.scenes.Scene_IslandWest.props[0].asset !== "Barrel") {
      throw new Error("self-test: prop conversion failed");
    }
    if (sample.scenes.Scene_IslandWest.actors[0].uid !== "NPC_A") {
      throw new Error("self-test: actor conversion failed");
    }
    const branded = remap(sample);
    if (!branded.quests_en.CobbleMain || branded.quests_en.AvenMain) {
      throw new Error("self-test: brand remap failed");
    }
    if (branded.quests_en.CobbleMain.icon !== "interactions-hammer") {
      throw new Error("self-test: quest icon remap failed");
    }
    if (branded.dialogs_en.Intro.Hello.bubbles[0] !== "Welcome aboard, newcomer...") {
      throw new Error("self-test: intro dialogue missing");
    }
    if (branded.locale?.cta?.start !== "Start the journey") {
      throw new Error("self-test: locale start CTA missing");
    }
    const withBooths = packFromUnknown({
      format: "datab-each-studio-v1",
      scenes: {
        IslandWest: {
          name: "GLORB",
          objects: [
            { kind: "prop", asset: "Barrel", traversable: false, transform: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1] },
            { kind: "prop", asset: "StandAven", traversable: false, transform: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1] },
            { kind: "prop", asset: "StandFair", traversable: false, transform: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1] },
            { kind: "prop", asset: "StandA", traversable: false, transform: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1] },
            {
              id: "FintechStandGround.004",
              kind: "actor",
              actorType: "FintechStandGround",
              params: { fintech: "salve" },
              transform: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1],
            },
            {
              id: "PartnerStandGround.001",
              kind: "actor",
              actorType: "PartnerStandGround",
              params: {},
              transform: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1],
            },
            {
              id: "NPC_A",
              kind: "actor",
              actorType: "NPC",
              params: { subtype: "Citizen_West_StandingA" },
              transform: [4, 5, 6, 1, 1, 1, 0, 0, 0, 1],
            },
          ],
          actors: [
            { uid: "FintechStandGround.005", type: "FintechStandGround", params: { fintech: "trail" }, transforms: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1] },
          ],
          curves: [],
        },
      },
    });
    if (withBooths.scenes.Scene_IslandWest.props.some((item) => String(item.asset).startsWith("Stand") || item.asset === "underStand")) {
      throw new Error("self-test: partner booths were not stripped");
    }
    if (withBooths.scenes.Scene_IslandWest.actors.some((item) => item.type === "FintechStandGround" || item.type === "PartnerStandGround")) {
      throw new Error("self-test: StandFair actors were not stripped");
    }
    if (withBooths.scenes.Scene_IslandWest.props[0].asset !== "Barrel") {
      throw new Error("self-test: non-booth props were stripped");
    }
    if (withBooths.scenes.Scene_IslandWest.actors[0].uid !== "NPC_A") {
      throw new Error("self-test: standing NPCs were stripped with booths");
    }
    const packedBooths = packFromUnknown({
      format: "datab-each-game-pack-v1",
      quests_en: {},
      scenes: {
        Scene_IslandWest: {
          name: "GLORB",
          props: [
            { asset: "Barrel", traversable: false, transforms: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1] },
            { asset: "StandFair", traversable: false, transforms: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1] },
          ],
          actors: [
            { uid: "FintechStandGround.005", type: "FintechStandGround", params: { fintech: "trail" }, transforms: [1, 2, 3, 1, 1, 1, 0, 0, 0, 1] },
            { uid: "NPC_Keep", type: "NPC", params: { subtype: "Citizen_West_StandingA" }, transforms: [4, 5, 6, 1, 1, 1, 0, 0, 0, 1] },
          ],
        },
      },
    });
    if (packedBooths.scenes.Scene_IslandWest.props.some((item) => item.asset === "StandFair")) {
      throw new Error("self-test: packed StandFair props were not stripped");
    }
    if (packedBooths.scenes.Scene_IslandWest.actors.some((item) => item.type === "FintechStandGround")) {
      throw new Error("self-test: packed StandFair actors were not stripped");
    }
    if (packedBooths.scenes.Scene_IslandWest.actors[0].uid !== "NPC_Keep") {
      throw new Error("self-test: packed standing NPCs were stripped with booths");
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
