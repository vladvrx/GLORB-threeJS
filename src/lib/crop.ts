import * as THREE from "three";
import { GAME_TO_WORLD, gamePosToWorld, worldPosToGame } from "@/lib/coords";
import type { EditorObject, PathCurve, SceneData, Vec3 } from "@/lib/types";

const EDGE = 1.5;

export type GameAabb = [Vec3, Vec3];

export function copyAabb(box: GameAabb | null | undefined): GameAabb | null {
  if (!box) return null;
  return [
    [box[0][0], box[0][1], box[0][2]],
    [box[1][0], box[1][1], box[1][2]],
  ];
}

export function aabbSize(box: GameAabb) {
  return {
    x: box[1][0] - box[0][0],
    y: box[1][1] - box[0][1],
    z: box[1][2] - box[0][2],
  };
}

export function aabbVolume(box: GameAabb) {
  const size = aabbSize(box);
  return Math.max(0, size.x) * Math.max(0, size.z);
}

export function sceneFullBounds(scene: SceneData): GameAabb | null {
  return copyAabb(scene.fullBounds ?? scene.bounds);
}

export function sceneCrop(scene?: SceneData | null): GameAabb | null {
  if (!scene) return null;
  return copyAabb(scene.bounds ?? scene.fullBounds);
}

export function aabbAlmostEqual(a: GameAabb | null, b: GameAabb | null, epsilon = 0.4) {
  if (!a || !b) return a === b;
  for (let corner = 0; corner < 2; corner += 1) {
    for (let axis = 0; axis < 3; axis += 1) {
      if (Math.abs(a[corner][axis] - b[corner][axis]) > epsilon) return false;
    }
  }
  return true;
}

export function clampAabb(crop: GameAabb, full: GameAabb): GameAabb {
  const min: Vec3 = [
    Math.max(full[0][0], Math.min(crop[0][0], crop[1][0])),
    full[0][1],
    Math.max(full[0][2], Math.min(crop[0][2], crop[1][2])),
  ];
  const max: Vec3 = [
    Math.min(full[1][0], Math.max(crop[0][0], crop[1][0])),
    full[1][1],
    Math.min(full[1][2], Math.max(crop[0][2], crop[1][2])),
  ];
  if (max[0] - min[0] < 8) {
    const mid = (min[0] + max[0]) / 2;
    min[0] = mid - 4;
    max[0] = mid + 4;
  }
  if (max[2] - min[2] < 8) {
    const mid = (min[2] + max[2]) / 2;
    min[2] = mid - 4;
    max[2] = mid + 4;
  }
  min[0] = Math.max(full[0][0], min[0]);
  max[0] = Math.min(full[1][0], max[0]);
  min[2] = Math.max(full[0][2], min[2]);
  max[2] = Math.min(full[1][2], max[2]);
  return [min, max];
}

export function gamePointInside(point: Vec3, crop: GameAabb, padding = 0) {
  return (
    point[0] >= crop[0][0] - padding &&
    point[0] <= crop[1][0] + padding &&
    point[2] >= crop[0][2] - padding &&
    point[2] <= crop[1][2] + padding
  );
}

export function objectInsideCrop(object: EditorObject, crop: GameAabb, padding = EDGE) {
  if (object.kind === "point") return true;
  return gamePointInside([object.transform[0], object.transform[1], object.transform[2]], crop, padding);
}

export function countOutsideCrop(scene: SceneData) {
  const crop = sceneCrop(scene);
  if (!crop) return { props: 0, actors: 0, areas: 0, total: 0 };
  let props = 0;
  let actors = 0;
  let areas = 0;
  for (const object of scene.objects) {
    if (objectInsideCrop(object, crop)) continue;
    if (object.kind === "prop") props += 1;
    else if (object.kind === "actor") actors += 1;
    else if (object.kind === "area") areas += 1;
  }
  return { props, actors, areas, total: props + actors + areas };
}

export function trimCurveToCrop(curve: PathCurve, crop: GameAabb): PathCurve | null {
  const points = curve.points.filter((point) => gamePointInside(point, crop, EDGE * 2));
  if (points.length < 2) return null;
  return { ...curve, points };
}

export function applyCropToScene(scene: SceneData, crop: GameAabb, removeOutside: boolean) {
  const full = sceneFullBounds(scene) ?? crop;
  const next = clampAabb(crop, full);
  scene.fullBounds = full;
  scene.bounds = next;
  if (!removeOutside) return { removed: 0, kept: scene.objects.length };
  const before = scene.objects.length;
  scene.objects = scene.objects.filter((object) => objectInsideCrop(object, next));
  scene.curves = scene.curves
    .map((curve) => trimCurveToCrop(curve, next))
    .filter((curve): curve is PathCurve => Boolean(curve));
  return { removed: before - scene.objects.length, kept: scene.objects.length };
}

function spawnGamePoint(scene: SceneData): Vec3 | null {
  const spawn =
    scene.objects.find((item) => item.kind === "point" && /spawn/i.test(item.name)) ??
    scene.objects.find((item) => item.kind === "point");
  if (!spawn) return null;
  return [spawn.transform[0], spawn.transform[1], spawn.transform[2]];
}

export function halvedCrop(scene: SceneData, axis: "auto" | "x" | "z" = "auto"): GameAabb | null {
  const crop = sceneCrop(scene);
  if (!crop) return null;
  const size = aabbSize(crop);
  const useX = axis === "x" || (axis === "auto" && size.x >= size.z);
  const spawn = spawnGamePoint(scene);
  if (useX) {
    const mid = (crop[0][0] + crop[1][0]) / 2;
    const keepLow = spawn ? spawn[0] <= mid : true;
    return keepLow
      ? [crop[0], [mid, crop[1][1], crop[1][2]]]
      : [[mid, crop[0][1], crop[0][2]], crop[1]];
  }
  const mid = (crop[0][2] + crop[1][2]) / 2;
  const keepLow = spawn ? spawn[2] <= mid : true;
  return keepLow
    ? [crop[0], [crop[1][0], crop[1][1], mid]]
    : [[crop[0][0], crop[0][1], mid], crop[1]];
}

export function worldGroundFromGame(box: GameAabb) {
  const min = gamePosToWorld(box[0][0], box[0][1], box[1][2]);
  const max = gamePosToWorld(box[1][0], box[1][1], box[0][2]);
  return {
    minX: Math.min(min[0], max[0]),
    maxX: Math.max(min[0], max[0]),
    minY: Math.min(min[1], max[1]),
    maxY: Math.max(min[1], max[1]),
  };
}

export function gameCropFromWorldGround(
  full: GameAabb,
  ground: { minX: number; maxX: number; minY: number; maxY: number },
): GameAabb {
  return clampAabb(
    [
      [ground.minX, full[0][1], -ground.maxY],
      [ground.maxX, full[1][1], -ground.minY],
    ],
    full,
  );
}

export function worldClipPlanes(crop: GameAabb) {
  const point = (x: number, y: number, z: number) =>
    new THREE.Vector3(x, y, z).applyQuaternion(GAME_TO_WORLD);
  const normal = (x: number, y: number, z: number) =>
    new THREE.Vector3(x, y, z).applyQuaternion(GAME_TO_WORLD).normalize();
  return [
    new THREE.Plane().setFromNormalAndCoplanarPoint(normal(1, 0, 0), point(crop[0][0], 0, 0)),
    new THREE.Plane().setFromNormalAndCoplanarPoint(normal(-1, 0, 0), point(crop[1][0], 0, 0)),
    new THREE.Plane().setFromNormalAndCoplanarPoint(normal(0, 0, 1), point(0, 0, crop[0][2])),
    new THREE.Plane().setFromNormalAndCoplanarPoint(normal(0, 0, -1), point(0, 0, crop[1][2])),
  ];
}

export function clampWorldToCrop(world: { x: number; y: number; z: number }, crop: GameAabb) {
  const game = worldPosToGame(world.x, world.y, world.z);
  game[0] = THREE.MathUtils.clamp(game[0], crop[0][0] + EDGE, crop[1][0] - EDGE);
  game[2] = THREE.MathUtils.clamp(game[2], crop[0][2] + EDGE, crop[1][2] - EDGE);
  const next = gamePosToWorld(game[0], game[1], game[2]);
  return { x: next[0], y: next[1], z: world.z };
}

export function worldPointInsideCrop(world: THREE.Vector3, crop: GameAabb, padding = EDGE) {
  const game = worldPosToGame(world.x, world.y, world.z);
  return gamePointInside(game, crop, padding);
}

export function formatMeters(value: number) {
  return `${Math.round(value)} m`;
}
