import * as THREE from "three";
import type { GameTransform, Vec3 } from "@/lib/types";

/** Rotate game Y-up into editor world Z-up. */
export const GAME_TO_WORLD = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(1, 0, 0),
  Math.PI / 2,
);

const _pos = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _euler = new THREE.Euler();

export function identityTransform(): GameTransform {
  return [0, 0, 0, 1, 1, 1, 0, 0, 0, 1];
}

export function positionOf(t: GameTransform): Vec3 {
  return [t[0], t[1], t[2]];
}

export function scaleOf(t: GameTransform): Vec3 {
  return [t[3], t[4], t[5]];
}

export function quatOf(t: GameTransform): [number, number, number, number] {
  return [t[6], t[7], t[8], t[9]];
}

/** Game Y-up position → editor world Z-up (X, Y ground, Z height). */
export function gamePosToWorld(x: number, y: number, z: number): Vec3 {
  return [x, -z, y];
}

export function worldPosToGame(x: number, y: number, z: number): Vec3 {
  return [x, z, -y];
}

export function gameTransformToWorldPos(t: GameTransform): Vec3 {
  return gamePosToWorld(t[0], t[1], t[2]);
}

export function applyGameTransform(object: THREE.Object3D, t: GameTransform) {
  object.position.set(t[0], t[1], t[2]);
  object.scale.set(t[3], t[4], t[5]);
  object.quaternion.set(t[6], t[7], t[8], t[9]);
}

export function readGameTransform(object: THREE.Object3D): GameTransform {
  const p = object.position;
  const s = object.scale;
  const q = object.quaternion;
  return [p.x, p.y, p.z, s.x, s.y, s.z, q.x, q.y, q.z, q.w];
}

export function worldEulerDegreesFromGame(t: GameTransform): Vec3 {
  _quat.set(t[6], t[7], t[8], t[9]);
  _quat.premultiply(GAME_TO_WORLD);
  _euler.setFromQuaternion(_quat, "ZYX");
  return [
    THREE.MathUtils.radToDeg(_euler.x),
    THREE.MathUtils.radToDeg(_euler.y),
    THREE.MathUtils.radToDeg(_euler.z),
  ];
}

export function gameQuatFromWorldEuler(deg: Vec3): [number, number, number, number] {
  _euler.set(
    THREE.MathUtils.degToRad(deg[0]),
    THREE.MathUtils.degToRad(deg[1]),
    THREE.MathUtils.degToRad(deg[2]),
    "ZYX",
  );
  _quat.setFromEuler(_euler);
  _quat.premultiply(GAME_TO_WORLD.clone().invert());
  return [_quat.x, _quat.y, _quat.z, _quat.w];
}

export function roundTo(value: number, step: number) {
  if (step <= 0) return value;
  return Math.round(value / step) * step;
}

export function composeGameTransform(input: {
  position: Vec3;
  scale: Vec3;
  quaternion: [number, number, number, number];
}): GameTransform {
  return [
    input.position[0],
    input.position[1],
    input.position[2],
    input.scale[0],
    input.scale[1],
    input.scale[2],
    input.quaternion[0],
    input.quaternion[1],
    input.quaternion[2],
    input.quaternion[3],
  ];
}

export function formatAxis(value: number) {
  if (!Number.isFinite(value)) return "0";
  const rounded = Math.abs(value) < 0.0005 ? 0 : value;
  return rounded.toFixed(3).replace(/\.?0+$/, "") || "0";
}

export function lookAtFromTransform(t: GameTransform, camera: THREE.Camera) {
  const [x, y, z] = gameTransformToWorldPos(t);
  _pos.set(x, y, z);
  camera.lookAt(_pos);
}
