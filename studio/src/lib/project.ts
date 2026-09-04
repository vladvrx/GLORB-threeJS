import { uid } from "@/lib/ids";
import { identityTransform } from "@/lib/coords";
import {
  APPLY_SCENE_ID,
  EDITABLE_SCENE_IDS,
  SCENE_LABELS,
  isEditableSceneId,
  slimProjectScenes,
} from "@/lib/maps";
import type {
  DialogNode,
  DialogScript,
  EditorObject,
  NpcCharacter,
  PathCurve,
  Quest,
  RawDialogScript,
  RawScene,
  SceneData,
  StudioBundle,
  StudioProject,
} from "@/lib/types";

export const ACTOR_ASSETS: Record<string, string> = {
  NPC: "Character",
  Chest: "Chest",
  ChestBig: "ChestBig",
  Telescope: "Telescope",
  GrowableTree: "GrowableTreeLarge",
  Zipline: "Zipline",
  Lighthouse: "LightTraffic",
  BrokenBridge: "BridgeOff",
  CobbleHouse: "TechCompany03HouseOff",
  FlagPole: "Flag",
  ShopForSale: "ShopForSaleBase",
  Speakers: "Speakers",
  Tamtam: "Tamtam",
};

export function emptyQuest(id = uid("quest")): Quest {
  return {
    id,
    type: "Side",
    icon: "interactions-chat",
    item: null,
    title: "New quest",
    description: "Describe what the player should do.",
    unlockText: null,
    unlockCondition: "",
    reward: 10,
    rewardItem: null,
    rewardText: "Nice work.",
    rewardCondition: "",
    fintechID: null,
  };
}

export function emptyNpc(id = uid("npc")): NpcCharacter {
  return {
    id,
    gradientID: 22,
    face: 0,
    script: "TalkingCitizen",
    scriptArgs: {},
  };
}

export function emptySpeakNode(id = uid("node")): DialogNode {
  return {
    id,
    isSpeak: true,
    bubbles: ["Hello there."],
    before: [{ action: "EMOTE", opts: ["Hello"] }],
    next: [{ action: "END" }],
    choices: [],
  };
}

export function emptyDialog(id = uid("dialog")): DialogScript {
  const node = emptySpeakNode("Start");
  return { id, first: node.id, nodes: [node] };
}

export function parseDialogs(raw: Record<string, RawDialogScript>): DialogScript[] {
  return Object.entries(raw).map(([id, script]) => {
    const first = typeof script.__first__ === "string" ? script.__first__ : "Start";
    const nodes: DialogNode[] = [];
    for (const [nodeId, value] of Object.entries(script)) {
      if (nodeId === "__first__" || !value || typeof value !== "object") continue;
      const node = value as Record<string, unknown>;
      const choicesRaw = (node.choices ?? {}) as Record<string, Record<string, unknown>>;
      nodes.push({
        id: String(node.id ?? nodeId),
        isSpeak: Boolean(node.isSpeak),
        isPrompt: Boolean(node.isPrompt),
        bubbles: Array.isArray(node.bubbles) ? node.bubbles.map(String) : [],
        before: Array.isArray(node.before) ? (node.before as DialogNode["before"]) : [],
        next: Array.isArray(node.next) ? (node.next as DialogNode["next"]) : [],
        choices: Object.values(choicesRaw).map((choice) => ({
          id: String(choice.id ?? ""),
          value: String(choice.value ?? ""),
          next: Array.isArray(choice.next) ? (choice.next as DialogNode["next"]) : [],
        })),
      });
    }
    return { id, first, nodes };
  });
}

export function serializeDialogs(scripts: DialogScript[]): Record<string, RawDialogScript> {
  const out: Record<string, RawDialogScript> = {};
  for (const script of scripts) {
    const packed: RawDialogScript = { __first__: script.first };
    for (const node of script.nodes) {
      const body: Record<string, unknown> = {
        id: node.id,
      };
      if (node.isPrompt) {
        body.isPrompt = true;
        body.choices = Object.fromEntries(
          node.choices.map((choice) => [
            choice.id,
            { id: choice.id, value: choice.value, next: choice.next },
          ]),
        );
      } else {
        body.isSpeak = true;
        body.bubbles = node.bubbles;
        if (node.before.length) body.before = node.before;
        body.next = node.next;
      }
      packed[node.id] = body;
    }
    out[script.id] = packed;
  }
  return out;
}

export function sceneFromRaw(raw: RawScene): SceneData {
  const objects: EditorObject[] = [];

  for (const prop of raw.props) {
    objects.push({
      id: prop.id,
      kind: "prop",
      name: prop.name || prop.asset,
      asset: prop.asset,
      traversable: prop.traversable,
      transform: prop.transforms,
      visible: true,
    });
  }

  for (const actor of raw.actors) {
    const subtype =
      actor.params && typeof actor.params.subtype === "string"
        ? actor.params.subtype
        : undefined;
    objects.push({
      id: actor.uid,
      kind: "actor",
      name: subtype || actor.uid,
      asset: ACTOR_ASSETS[actor.type] ?? "Character",
      actorType: actor.type,
      params: Object.fromEntries(
        Object.entries(actor.params ?? {}).map(([key, value]) => [key, String(value ?? "")]),
      ),
      transform: actor.transforms,
      visible: true,
    });
  }

  for (const [name, transform] of Object.entries(raw.points ?? {})) {
    objects.push({
      id: `point:${name}`,
      kind: "point",
      name,
      asset: "",
      transform,
      visible: true,
    });
  }

  for (const [name, area] of Object.entries(raw.areas ?? {})) {
    const size = area.size || 4;
    objects.push({
      id: `area:${name}`,
      kind: "area",
      name,
      asset: "",
      transform: [
        area.position[0],
        area.position[1],
        area.position[2],
        size,
        size,
        size,
        0,
        0,
        0,
        1,
      ],
      visible: true,
    });
  }

  const curves: PathCurve[] = Object.entries(raw.curves ?? {}).map(([id, curve]) => ({
    id,
    type: curve.type,
    closed: curve.closed,
    points: curve.points,
  }));

  return {
    id: raw.id,
    name: SCENE_LABELS[raw.id as keyof typeof SCENE_LABELS] ?? raw.name,
    glb: raw.glb,
    terrain: raw.terrain,
    bounds: raw.bounds,
    fullBounds: raw.fullBounds ?? raw.bounds,
    procedural: raw.procedural,
    useBaseAsCollider: raw.useBaseAsCollider,
    objects,
    curves,
  };
}

export function withFullBounds(project: StudioProject, bundle?: StudioBundle | null): StudioProject {
  const scenes: Record<string, SceneData> = {};
  for (const [id, scene] of Object.entries(project.scenes)) {
    const shipped = bundle?.scenes[id];
    scenes[id] = {
      ...scene,
      fullBounds: scene.fullBounds ?? shipped?.fullBounds ?? shipped?.bounds ?? scene.bounds ?? null,
      bounds: scene.bounds ?? shipped?.bounds ?? scene.fullBounds ?? null,
    };
  }
  return { ...project, scenes };
}

export const KEEP_DIALOG_SCRIPTS = new Set(["Intro", "dev"]);
export const DROPPED_DIALOG_SCRIPTS = new Set([
  "Aven_Ambassador_ComeBack",
  "Aven_Ambassador_FirstTime",
  "Aven_Quest_Before",
  "Aven_Quest_Completed",
  "Aven_Quest_SideCompleted",
  "Aven_Quest_Started",
  "Brigit_Ambassador_ComeBack",
  "Brigit_Ambassador_FirstTime",
  "Brigit_Quest_BeforeSide",
  "Brigit_Quest_ComeBack",
  "Brigit_Quest_FirstTime",
  "Brigit_Quest_SideCompleted",
  "Citizen_Easter_EggD",
  "Citizen_Easter_EggE",
  "Citizen_Easter_EggF",
  "Citizen_West_Beach",
  "Citizen_West_ChestHint",
  "Citizen_West_Forest",
  "Citizen_West_PomeloIslandHint",
  "Citizen_West_PylonIslandHint",
  "Citizen_West_StandingC",
  "Cobble_Ambassador_ComeBack",
  "Cobble_Ambassador_FirstTime",
  "Cobble_Quest_Before",
  "Cobble_Quest_Completed",
  "Cobble_Quest_SideCompleted",
  "Cobble_Quest_Started",
  "Pomelo_Ambassador_ComeBack",
  "Pomelo_Ambassador_FirstTime",
  "Pomelo_Quest_Before",
  "Pomelo_Quest_Completed",
  "Pomelo_Quest_Started",
  "Pylon_Ambassador_ComeBack",
  "Pylon_Ambassador_FirstTime",
  "Pylon_Quest_Before",
  "Pylon_Quest_Completed",
  "Pylon_Quest_Started",
  "Salve_Ambassador_ComeBack",
  "Salve_Ambassador_FirstTime",
  "Salve_Healed",
  "Salve_Quest_Before",
  "Salve_Quest_Completed",
  "Salve_Quest_SideCompleted",
  "Salve_Quest_Started",
  "Test_ChatGpt",
  "Trail_Ambassador_ComeBack",
  "Trail_Ambassador_FirstTime",
  "Trail_Quest_BeforeSide",
  "Trail_Quest_ComeBack",
  "Trail_Quest_FirstTime",
  "Trail_Quest_SideCompleted",
  "Zenda_Ambassador_ComeBack",
  "Zenda_Ambassador_FirstTime",
  "Zenda_Healed",
  "Zenda_Quest_Before",
  "Zenda_Quest_Completed",
  "Zenda_Quest_SideCompleted",
  "Zenda_Quest_Started",
  "dev_missing",
]);

export function keepOnlyIntroAndDevDialogs(project: StudioProject): StudioProject {
  project.dialogs = (project.dialogs ?? []).filter((item) => KEEP_DIALOG_SCRIPTS.has(item.id));
  return project;
}

export function slimStudioProject(project: StudioProject, bundle?: StudioBundle | null): StudioProject {
  let next = slimProjectScenes(withFullBounds(project, bundle));
  next = keepOnlyIntroAndDevDialogs(next);
  next.quests = [];
  next.notifications = [];
  next.characters = next.characters.filter((npc) => npc.id === "Intro" || !DROPPED_NPCS.has(npc.id));
  if (!next.characters.some((npc) => npc.id === "Intro") && bundle?.characters?.npcs?.Intro) {
    const intro = bundle.characters.npcs.Intro;
    next.characters.unshift({
      id: "Intro",
      gradientID: intro.gradientID,
      face: intro.face,
      script: intro.script,
      scriptArgs: Object.fromEntries(
        Object.entries(intro.scriptArgs ?? {}).map(([key, value]) => [key, String(value)]),
      ),
    });
  }
  if (!isEditableSceneId(next.activeSceneId) || !next.scenes[next.activeSceneId]) {
    next.activeSceneId = next.scenes.PaintSquare ? "PaintSquare" : APPLY_SCENE_ID;
  }
  return next;
}

const DROPPED_NPCS = new Set([
  "Cobble_Quest",
  "Cobble_Ambassador",
  "Trail_Quest",
  "Trail_Ambassador",
  "Pylon_Quest",
  "Pylon_Ambassador",
  "Salve_Quest",
  "Salve_Ambassador",
  "Salve_Sick_WestA",
  "Salve_Sick_WestC",
  "Salve_Sick_WestD",
  "Zenda_Quest",
  "Zenda_Ambassador",
  "Aven_Quest",
  "Aven_Ambassador",
  "Brigit_Quest",
  "Brigit_Ambassador",
  "Pomelo_Quest",
  "Pomelo_Ambassador",
  "Citizen_West_PylonIslandHint",
  "Citizen_West_PomeloIslandHint",
  "Citizen_West_ChestHint",
  "Citizen_West_Forest",
  "Citizen_West_Beach",
  "Citizen_West_WalkingA",
  "Citizen_West_SwimmingA",
  "Citizen_West_SwimmingB",
  "Citizen_West_SwimmingC",
  "Citizen_West_TowelA",
  "Citizen_West_TowelB",
  "Citizen_West_SeatingA",
  "Citizen_West_SeatingB",
  "Citizen_West_SeatingC",
  "Citizen_West_SeatingD",
  "Citizen_West_BeachSeatingA",
  "Citizen_West_BeachSeatingB",
  "Citizen_West_StandingB",
  "Citizen_West_StandingE",
  "Citizen_West_StandingF",
  "Citizen_West_StandingC",
  "Citizen_Easter_EggA",
  "Citizen_Easter_EggB",
  "Citizen_Easter_EggC",
  "Citizen_Easter_EggD",
  "Citizen_Easter_EggE",
  "Citizen_Easter_EggF",
  "Test_ChatGpt",
]);

export function mergeShippedAnchors(project: StudioProject, bundle?: StudioBundle | null): StudioProject {
  const next = withFullBounds(project, bundle);
  if (!bundle) return next;
  for (const [id, raw] of Object.entries(bundle.scenes)) {
    const scene = next.scenes[id];
    if (!scene) continue;
    const shipped = sceneFromRaw(raw);
    const haveIds = new Set(scene.objects.map((object) => object.id));
    const havePointNames = new Set(
      scene.objects.filter((object) => object.kind === "point").map((object) => object.name),
    );
    const missing = shipped.objects.filter((object) => {
      if (object.kind === "actor") return !haveIds.has(object.id);
      if (object.kind === "point") return !haveIds.has(object.id) && !havePointNames.has(object.name);
      return false;
    });
    if (missing.length) {
      scene.objects = [...scene.objects, ...missing];
    }
  }
  return next;
}

export function projectFromBundle(bundle: StudioBundle): StudioProject {
  const scenes: Record<string, SceneData> = {};
  for (const id of EDITABLE_SCENE_IDS) {
    const raw = bundle.scenes[id];
    if (raw) scenes[id] = sceneFromRaw(raw);
  }

  const quests = Object.values(bundle.quests ?? {});
  const npcs = bundle.characters?.npcs ?? {};
  const characters = Object.entries(npcs).map(([id, npc]) => ({
    id,
    gradientID: npc.gradientID,
    face: npc.face,
    script: npc.script,
    scriptArgs: Object.fromEntries(
      Object.entries(npc.scriptArgs ?? {}).map(([key, value]) => [key, String(value)]),
    ),
  }));

  return slimStudioProject({
    format: "datab-each-studio-v1",
    name: "GLORB",
    activeSceneId: scenes.PaintSquare ? "PaintSquare" : Object.keys(scenes)[0],
    scenes,
    quests,
    characters,
    characterColors: bundle.characters?.colors ?? {},
    dialogs: parseDialogs(bundle.dialogs ?? {}),
    notifications: [
      ...(bundle.notifications?.hints ?? []),
      ...(bundle.notifications?.overlays ?? []),
    ],
    locale: bundle.locale ?? {},
  }, bundle);
}

export function newProp(asset: string, transform = identityTransform()): EditorObject {
  return {
    id: uid("prop"),
    kind: "prop",
    name: asset,
    asset,
    traversable: false,
    transform,
    visible: true,
  };
}

export function cloneObject(object: EditorObject): EditorObject {
  const copy = structuredClone(object);
  copy.id = uid(object.kind);
  copy.name = `${object.name} copy`;
  copy.transform = [...object.transform];
  copy.transform[0] += 2;
  return copy;
}
