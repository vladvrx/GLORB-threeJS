import type { GameTransform, SceneData, StudioProject, Vec3 } from "@/lib/types";

export const GLORB_ISLAND = {
  cx: -153.8588555,
  cz: 13.567255,
  rx: 52,
  rz: 56,
  floorY: 3.8,
  thickness: 2.4,
};

export const WEST_ORIGINAL_BOUNDS: [Vec3, Vec3] = [
  [-217.414489, -21.549696, -62.174738],
  [36.808045, 17.128553, 240.793234],
];

export const WEST_REMAINING_BOUNDS: [Vec3, Vec3] = [
  [-217.414489, -21.549696, -62.174738],
  [-90.303222, 17.128553, 89.309248],
];

export const PAINT_SQUARE_BOUNDS: [Vec3, Vec3] = [
  [
    GLORB_ISLAND.cx - GLORB_ISLAND.rx,
    GLORB_ISLAND.floorY - GLORB_ISLAND.thickness,
    GLORB_ISLAND.cz - GLORB_ISLAND.rz,
  ],
  [GLORB_ISLAND.cx + GLORB_ISLAND.rx, GLORB_ISLAND.floorY + 0.4, GLORB_ISLAND.cz + GLORB_ISLAND.rz],
];

export const WEST_SPAWN: GameTransform = [
  -144.80751, 3.800204, 23.634537, 1, 1, 1, 0, -0.70538, 0, 0.708829,
];

export const EDITABLE_SCENE_IDS = ["IslandWest", "PaintSquare"] as const;
export type EditableSceneId = (typeof EDITABLE_SCENE_IDS)[number];

export const SCENE_LABELS: Record<EditableSceneId, string> = {
  IslandWest: "Island West",
  PaintSquare: "Paint square",
};

export const APPLY_SCENE_ID = "IslandWest";

export function isEditableSceneId(id: string): id is EditableSceneId {
  return EDITABLE_SCENE_IDS.includes(id as EditableSceneId);
}

export function isPaintSquare(scene?: Pick<SceneData, "id"> | null) {
  return scene?.id === "PaintSquare";
}

export function slimProjectScenes(project: StudioProject): StudioProject {
  const scenes: StudioProject["scenes"] = {};
  for (const id of EDITABLE_SCENE_IDS) {
    const scene = project.scenes[id];
    if (scene) {
      scenes[id] = {
        ...scene,
        name: SCENE_LABELS[id],
        procedural: id === "PaintSquare" ? "paint-square" : scene.procedural,
      };
    }
  }
  const activeSceneId = isEditableSceneId(project.activeSceneId)
    ? project.activeSceneId
    : scenes.PaintSquare
      ? "PaintSquare"
      : "IslandWest";
  return {
    ...project,
    name: "GLORB",
    activeSceneId: scenes[activeSceneId] ? activeSceneId : Object.keys(scenes)[0] ?? project.activeSceneId,
    scenes,
  };
}
