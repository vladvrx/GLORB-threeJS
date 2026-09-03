import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROJECT = process.argv[2] || "/home/ubuntu/Downloads/studio-project-live.json";

const BRAND = [
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

function remapText(value) {
  let next = value;
  for (const [from, to] of BRAND) next = next.split(from).join(to);
  next = next.replaceAll('"aven"', '"cobble"');
  next = next.replaceAll('"brigit"', '"trail"');
  next = next.replaceAll('"pomelo"', '"pylon"');
  next = next.replaceAll('"zenda"', '"salve"');
  return next;
}

function remap(value) {
  return JSON.parse(remapText(JSON.stringify(value)));
}

function serializeDialogs(scripts) {
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

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function deepMerge(target, source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return source;
  const out = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value) && target?.[key] && typeof target[key] === "object") {
      out[key] = deepMerge(target[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

const project = JSON.parse(fs.readFileSync(PROJECT, "utf8"));
const currentQuests = JSON.parse(fs.readFileSync(path.join(ROOT, "reference/assets/quests_en.json"), "utf8"));

const quests = remap(Object.fromEntries((project.quests ?? []).map((quest) => [quest.id, quest])));
for (const [id, quest] of Object.entries(quests)) {
  if (currentQuests[id]?.icon) quest.icon = currentQuests[id].icon;
}

const npcs = remap(
  Object.fromEntries(
    (project.characters ?? []).map((npc) => [
      npc.id,
      {
        gradientID: npc.gradientID,
        face: npc.face,
        script: npc.script,
        scriptArgs: npc.scriptArgs ?? {},
      },
    ]),
  ),
);
const colors = remap(project.characterColors ?? {});
const dialogs = remap(serializeDialogs(project.dialogs ?? []));
const notifications = remap(project.notifications ?? []);
const locale = remap(project.locale ?? {});

const assets = path.join(ROOT, "reference/assets");
writeJson(path.join(assets, "quests_en.json"), quests);
writeJson(path.join(assets, "characters_en.json"), { npcs, colors });
writeJson(path.join(assets, "dialogs_en.json"), dialogs);
writeJson(path.join(assets, "studio-notifications.json"), notifications);

const packPath = path.join(assets, "studio-game-pack.json");
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
pack.quests_en = quests;
pack.characters_en = { npcs, colors };
pack.dialogs_en = dialogs;
pack.notifications = notifications;
pack.site_hints = Object.fromEntries(
  notifications
    .filter((item) => item.type === "hint")
    .map((item) => [item.id, { title: item.title, description: item.description }]),
);
writeJson(packPath, pack);

const sitePath = path.join(ROOT, "direct-port/data/site.json");
const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
site.site = deepMerge(site.site, locale);
if (site.site.phone?.title?.fintech && !site.site.phone.title.partner) {
  site.site.phone.title.partner = site.site.phone.title.fintech;
}
if (site.site.phone?.desc?.fintech && !site.site.phone.desc.partner) {
  site.site.phone.desc.partner = site.site.phone.desc.fintech;
}
if (site.site.hint?.fintech) {
  site.site.hint.partner = site.site.hint.fintech;
}
for (const item of notifications) {
  if (item.type === "hint") {
    site.site.hint ??= {};
    const key = item.id === "fintech" ? "partner" : item.id;
    site.site.hint[key] = { title: item.title ?? "", description: item.description ?? "" };
  }
  if (item.id === "MainQuestCompleted") site.site.quest.end.title = item.title;
  if (item.id === "QuestCompleted") site.site.quest.completed = item.title;
  if (item.id === "QuestProgress") site.site.quest.progress = item.description || item.title;
}
writeJson(sitePath, site);

console.log(
  JSON.stringify(
    {
      quests: Object.keys(quests),
      dialogs: Object.keys(dialogs).length,
      npcs: Object.keys(npcs).length,
      intro: dialogs.Intro?.Hello?.bubbles?.[0] ?? null,
      cobbleTitle: quests.CobbleMain?.title ?? null,
      startCta: site.site.cta?.start ?? null,
    },
    null,
    2,
  ),
);
