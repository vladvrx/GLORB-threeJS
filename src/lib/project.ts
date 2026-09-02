import { uid } from "@/lib/ids";
import { identityTransform } from "@/lib/coords";
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
  AvenHouse: "TechCompany03HouseOff",
  FlagPole: "Flag",
  ShopForSale: "ShopForSaleBase",
  Speakers: "Speakers",
  FintechStandGround: "StandFair",
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
    name: raw.name,
    glb: raw.glb,
    terrain: raw.terrain,
    bounds: raw.bounds,
    fullBounds: raw.bounds,
    useBaseAsCollider: raw.useBaseAsCollider,
    objects,
    curves,
  };
}

export function withFullBounds(project: StudioProject, bundle?: StudioBundle | null): StudioProject {
  const scenes: Record<string, SceneData> = {};
  for (const [id, scene] of Object.entries(project.scenes)) {
    const shipped = bundle?.scenes[id]?.bounds ?? scene.fullBounds ?? scene.bounds;
    scenes[id] = {
      ...scene,
      fullBounds: scene.fullBounds ?? shipped ?? null,
      bounds: scene.bounds ?? shipped ?? null,
    };
  }
  return { ...project, scenes };
}

export function projectFromBundle(bundle: StudioBundle): StudioProject {
  const scenes: Record<string, SceneData> = {};
  for (const [id, raw] of Object.entries(bundle.scenes)) {
    scenes[id] = sceneFromRaw(raw);
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

  return {
    format: "datab-each-studio-v1",
    name: "Cove Island",
    activeSceneId: scenes.IslandWest ? "IslandWest" : Object.keys(scenes)[0],
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
  };
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
