export type Vec3 = [number, number, number];
export type Quat = [number, number, number, number];

/** DATAB-EACH transform: px, py, pz, sx, sy, sz, qx, qy, qz, qw (game Y-up). */
export type GameTransform = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type AssetCategory =
  | "nature"
  | "buildings"
  | "beach"
  | "water"
  | "vehicles"
  | "terrain"
  | "props"
  | "characters"
  | "other";

export type AssetInfo = {
  id: string;
  name: string;
  file: string;
  bytes: number;
  category: AssetCategory;
  imported?: boolean;
  format?: "glb" | "gltf" | "fbx";
};

export type EditorObjectKind = "prop" | "actor" | "point" | "area";

export type EditorObject = {
  id: string;
  kind: EditorObjectKind;
  name: string;
  asset: string;
  traversable?: boolean;
  actorType?: string;
  params?: Record<string, string>;
  /** Game-space Y-up transform, matching DATAB-EACH. */
  transform: GameTransform;
  visible: boolean;
  locked?: boolean;
};

export type PathCurve = {
  id: string;
  type: string;
  closed: boolean;
  points: Vec3[];
};

export type SceneData = {
  id: string;
  name: string;
  glb: string;
  terrain: string | null;
  /** Current playable AABB in game Y-up space. */
  bounds: [Vec3, Vec3] | null;
  /** Original shipped AABB, used to reset a crop. */
  fullBounds?: [Vec3, Vec3] | null;
  useBaseAsCollider: boolean;
  objects: EditorObject[];
  curves: PathCurve[];
};

export type Quest = {
  id: string;
  type: string;
  icon: string;
  item: string | null;
  title: string;
  description: string;
  unlockText: string | null;
  unlockCondition: string;
  reward: number;
  rewardItem: string | null;
  rewardText: string;
  rewardCondition: string;
  fintechID: string | null;
};

export type NpcCharacter = {
  id: string;
  gradientID: number;
  face: number;
  script: string;
  scriptArgs: Record<string, string>;
};

export type DialogAction = {
  action: string;
  node?: string;
  opts?: string[];
};

export type DialogChoice = {
  id: string;
  value: string;
  next: DialogAction[];
};

export type DialogNode = {
  id: string;
  isSpeak?: boolean;
  isPrompt?: boolean;
  bubbles: string[];
  before: DialogAction[];
  next: DialogAction[];
  choices: DialogChoice[];
};

export type DialogScript = {
  id: string;
  first: string;
  nodes: DialogNode[];
};

export type NotificationItem = {
  id: string;
  type: "hint" | "mainQuest" | "quest" | "progress" | "coastalPoints" | "custom";
  title: string;
  description: string;
  delayMs?: number;
  icon?: string;
};

export type StudioProject = {
  format: "datab-each-studio-v1";
  name: string;
  activeSceneId: string;
  scenes: Record<string, SceneData>;
  quests: Quest[];
  characters: NpcCharacter[];
  characterColors: Record<string, { gradientID: number }>;
  dialogs: DialogScript[];
  notifications: NotificationItem[];
  locale: Record<string, unknown>;
};

export type StudioBundle = {
  format: string;
  upAxis: "z";
  gameUpAxis: "y";
  catalog: AssetInfo[];
  scenes: Record<string, RawScene>;
  quests: Record<string, Quest>;
  characters: {
    npcs: Record<string, Omit<NpcCharacter, "id">>;
    colors: Record<string, { gradientID: number }>;
  };
  dialogs: Record<string, RawDialogScript>;
  notifications: {
    hints: NotificationItem[];
    overlays: NotificationItem[];
  };
  locale: Record<string, unknown>;
  actorTypes: string[];
};

export type RawScene = {
  id: string;
  name: string;
  glb: string;
  terrain: string | null;
  bounds: [Vec3, Vec3] | null;
  useBaseAsCollider: boolean;
  points: Record<string, GameTransform>;
  areas: Record<string, { position: Vec3; size: number }>;
  curves: Record<string, { type: string; closed: boolean; points: Vec3[] }>;
  actors: {
    uid: string;
    type: string;
    params?: Record<string, unknown>;
    transforms: GameTransform;
  }[];
  props: {
    id: string;
    name: string;
    asset: string;
    traversable: boolean;
    transforms: GameTransform;
  }[];
};

export type RawDialogScript = {
  __first__?: string;
  [nodeId: string]: unknown;
};

export type ToolMode = "select" | "translate" | "rotate" | "scale";

export type EditorTab =
  | "world"
  | "quests"
  | "dialogue"
  | "characters"
  | "notifications";
