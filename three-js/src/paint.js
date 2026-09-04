import {
  a$ as MeshBasicMaterial,
  aU as Matrix4,
  b5 as Mesh,
  b6 as BufferAttribute,
  bz as CircleGeometry,
  w as watch,
} from "../../vendor/vendor.75f6e6ae65453426.js";
import { unwrap } from "./dom.js";
import { getIslandPlayer } from "./jump.js?v=jump-6";
import { RULES, spend } from "./survival-model.js";
import {
  WEST_MAX_X,
  WEST_MAX_Z,
  WEST_MIN_X,
  WEST_MIN_Z,
  onIsland,
} from "./island.js?v=paint-11";

const CELL = 2;
const WALK_RADIUS = 2.6;
const JUMP_RADIUS = 5;
const STAMP_Y = 0.1;
const WATER_Y = 0.55;
const FLOOR_MAX = 0.32;
const PAINT_COLOR = 0x8fd4ff;
const DOUBLE_SIDE = 2;
const MIN_LAND = 80;
const GLOB_COUNT = 1;
const GLOB_RADII = [1.48];
const GLOB_SPREAD = [0];
const GLOB_SEGMENTS = 8;
const TAU = Math.PI * 2;
const SPLASH_SLOTS = 8;
const SPLASH_PARTS = 4;
const SPLASH_MS = 280;
const HIDDEN_Y = -40;

function flag(value) {
  return !!unwrap(value);
}

function sceneId(app) {
  const scenes = app.$webgl?.scenes;
  return unwrap(scenes?.currentSceneID) || scenes?.current?.id || null;
}

function westPlayable(app) {
  const store = app.$store;
  if (!store) return false;
  const sceneState = Number(unwrap(store.sceneState));
  const tutorial = Number(unwrap(store.sceneStates?.Tutorial) ?? 0);
  return sceneState >= tutorial;
}

function cellCount() {
  const cols = Math.ceil((WEST_MAX_X - WEST_MIN_X) / CELL);
  const rows = Math.ceil((WEST_MAX_Z - WEST_MIN_Z) / CELL);
  return { cols, rows, total: cols * rows };
}

function cellIndex(col, row, cols) {
  return row * cols + col;
}

function cellCenter(col, row) {
  return {
    x: WEST_MIN_X + (col + 0.5) * CELL,
    z: WEST_MIN_Z + (row + 0.5) * CELL,
  };
}

function colOf(x, cols) {
  return Math.max(0, Math.min(cols - 1, Math.floor((x - WEST_MIN_X) / CELL)));
}

function rowOf(z, rows) {
  return Math.max(0, Math.min(rows - 1, Math.floor((z - WEST_MIN_Z) / CELL)));
}

function inland(x, z) {
  return onIsland(x, z);
}

class PaintInstances extends Mesh {
  constructor(geometry, material, capacity) {
    super(geometry, material);
    this.isInstancedMesh = true;
    this.instanceMatrix = new BufferAttribute(new Float32Array(capacity * 16), 16);
    this.instanceMatrix.meshPerAttribute = 1;
    this.instanceMatrix.isInstancedBufferAttribute = true;
    this.instanceColor = null;
    this.count = 0;
    this.frustumCulled = false;
    this.capacity = capacity;
  }

  setMatrixAt(index, matrix) {
    matrix.toArray(this.instanceMatrix.array, index * 16);
  }
}

function makeStampMatrix(matrix, x, y, z, radius) {
  matrix.identity();
  const e = matrix.elements;
  e[0] = radius;
  e[5] = 1;
  e[10] = radius;
  matrix.setPosition(x, y, z);
  return matrix;
}

function hideInstance(mesh, matrix, index) {
  makeStampMatrix(matrix, 0, HIDDEN_Y, 0, 0.0001);
  mesh.setMatrixAt(index, matrix);
}

function createMaterial(opacity) {
  return new MeshBasicMaterial({
    color: PAINT_COLOR,
    transparent: true,
    opacity,
    depthWrite: false,
    fog: true,
    side: DOUBLE_SIDE,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
}

function createVisuals(paintCapacity, renderOrder) {
  const geometry = new CircleGeometry(1, GLOB_SEGMENTS);
  geometry.rotateX(-Math.PI / 2);
  const mesh = new PaintInstances(geometry, createMaterial(0.92), paintCapacity);
  mesh.name = "glorb-paint";
  mesh.renderOrder = renderOrder;
  mesh.matrixAutoUpdate = true;
  mesh.frustumCulled = false;
  const splash = new PaintInstances(geometry, createMaterial(0.5), SPLASH_SLOTS * SPLASH_PARTS);
  splash.name = "glorb-paint-splash";
  splash.renderOrder = renderOrder + 1;
  splash.matrixAutoUpdate = true;
  splash.frustumCulled = false;
  splash.count = splash.capacity;
  splash.visible = false;
  return { mesh, splash };
}

function markLand(state) {
  let count = 0;
  state.land.fill(0);
  for (let i = 0; i < state.cellCount; i += 1) {
    const col = i % state.cols;
    const row = Math.floor(i / state.cols);
    const { x, z } = cellCenter(col, row);
    if (!inland(x, z)) continue;
    state.land[i] = 1;
    count += 1;
  }
  state.total = count;
  state.ready = count >= MIN_LAND;
}

function publish(state) {
  if (!state.ready || state.total < MIN_LAND) {
    state.ratio = 0;
    state.percent = 0;
    return;
  }
  state.ratio = Math.min(1, state.painted / state.total);
  if (state.painted >= state.total) {
    state.percent = 100;
    state.ratio = 1;
    return;
  }
  state.percent = Math.min(99, Math.floor(state.ratio * 100));
}

function ensureLandMaterial(scene) {
  const mesh = scene?.main;
  if (!mesh || mesh.__glorbLand || window.__GLORB_STUDIO__) return;
  mesh.material = new MeshBasicMaterial({
    color: 0xffffff,
    fog: true,
  });
  mesh.__glorbLand = true;
}

function attachVisual(state, scene) {
  if (!scene?.base || state.mesh?.parent === scene.base) return;
  detachVisual(state);
  ensureLandMaterial(scene);
  const order = (scene.webgl?.store?.renderOrder?.grass ?? 8) + 1;
  const capacity = Math.max(state.total, MIN_LAND) * GLOB_COUNT;
  const { mesh, splash } = createVisuals(capacity, order);
  scene.base.add(mesh);
  scene.base.add(splash);
  state.mesh = mesh;
  state.splashMesh = splash;
  state.scene = scene;
  mesh.count = capacity;
  for (let index = 0; index < capacity; index++) hideInstance(mesh, state.matrix, index);
  mesh.instanceMatrix.needsUpdate = true;
  hideAllSplashes(state);
}

function detachVisual(state) {
  const mesh = state.mesh;
  const splash = state.splashMesh;
  mesh?.parent?.remove(mesh);
  splash?.parent?.remove(splash);
  mesh?.material?.dispose?.();
  splash?.material?.dispose?.();
  mesh?.geometry?.dispose?.();
  state.mesh = null;
  state.splashMesh = null;
  state.scene = null;
  state.splashLive = false;
}

function resetSplashes(state) {
  const now = performance.now();
  for (let i = 0; i < SPLASH_SLOTS; i += 1) {
    const slot = state.splashes[i];
    slot.born = 0;
    slot.x = 0;
    slot.y = 0;
    slot.z = 0;
    slot.big = 0;
  }
  state.splashClock = now;
  state.splashLive = false;
  hideAllSplashes(state);
}

function hideAllSplashes(state) {
  const mesh = state.splashMesh;
  if (!mesh) return;
  for (let i = 0; i < mesh.capacity; i += 1) hideInstance(mesh, state.matrix, i);
  mesh.instanceMatrix.needsUpdate = true;
  mesh.visible = false;
}

function resetCoverage(state) {
  state.painted = 0;
  state.ratio = 0;
  state.percent = 0;
  state.wasAirborne = false;
  state.lastCell = -1;
  state.marked.fill(0);
  state.heights.fill(0);
  if (state.mesh) {
    for (let index = 0; index < state.mesh.capacity; index++) hideInstance(state.mesh, state.matrix, index);
    state.mesh.instanceMatrix.needsUpdate = true;
  }
  resetSplashes(state);
  markLand(state);
}

function markCell(state, index, y) {
  if (!state.land[index] || state.marked[index]) return false;
  if (state.run && !state.freePaint && (state.run.phase !== "playing" || !spend(state.run, RULES.paintCost))) return false;
  state.marked[index] = 1;
  state.painted += 1;
  if (Number.isFinite(y)) state.heights[index] = y;
  const { x, z } = cellCenter(index % state.cols, Math.floor(index / state.cols));
  addThreeGlobs(state, x, z, y, index * 1.618, false);
  return true;
}

function addThreeGlobs(state, x, z, y, spin, flush) {
  const mesh = state.mesh;
  if (!mesh) return;
  const stampY = (Number.isFinite(y) ? y : 0) + STAMP_Y;
  const index = cellIndex(colOf(x, state.cols), rowOf(z, state.rows), state.cols);
  const n = GLOB_COUNT;
  for (let i = 0; i < n; i += 1) {
    const angle = spin + i * (TAU / 3);
    const spread = GLOB_SPREAD[i];
    makeStampMatrix(
      state.matrix,
      x + Math.cos(angle) * spread,
      stampY,
      z + Math.sin(angle) * spread,
      GLOB_RADII[i],
    );
    mesh.setMatrixAt(index * GLOB_COUNT + i, state.matrix);
  }
  if (flush !== false) mesh.instanceMatrix.needsUpdate = true;
}

function spawnSplash(state, x, z, y, big) {
  const slots = state.splashes;
  let pick = 0;
  let oldest = state.splashClock + 1;
  for (let i = 0; i < SPLASH_SLOTS; i += 1) {
    if (slots[i].born === 0) {
      pick = i;
      break;
    }
    if (slots[i].born < oldest) {
      oldest = slots[i].born;
      pick = i;
    }
  }
  const slot = slots[pick];
  slot.born = state.splashClock || performance.now();
  slot.x = x;
  slot.y = (Number.isFinite(y) ? y : 0) + STAMP_Y + 0.04;
  slot.z = z;
  slot.big = big ? 1 : 0;
  state.splashLive = true;
  if (state.splashMesh) state.splashMesh.visible = true;
}

function tickSplash(state) {
  const mesh = state.splashMesh;
  if (!mesh || !state.splashLive) return;
  const now = state.splashClock;
  let live = 0;
  for (let i = 0; i < SPLASH_SLOTS; i += 1) {
    const slot = state.splashes[i];
    const base = i * SPLASH_PARTS;
    if (slot.born === 0) {
      for (let p = 0; p < SPLASH_PARTS; p += 1) hideInstance(mesh, state.matrix, base + p);
      continue;
    }
    const age = (now - slot.born) / SPLASH_MS;
    if (age >= 1) {
      slot.born = 0;
      for (let p = 0; p < SPLASH_PARTS; p += 1) hideInstance(mesh, state.matrix, base + p);
      continue;
    }
    live += 1;
    const t = age * age;
    const grow = 1 - (1 - age) * (1 - age);
    const big = slot.big ? 1.35 : 1;
    const fade = 1 - t;
    makeStampMatrix(state.matrix, slot.x, slot.y, slot.z, (0.16 + grow * 0.62) * big * Math.max(0.08, fade));
    mesh.setMatrixAt(base, state.matrix);
    for (let d = 0; d < 3; d += 1) {
      const ang = slot.born * 0.012 + d * (TAU / 3);
      const dist = (0.06 + age * 0.38) * big;
      const dropR = 0.11 * (1 - t) * big;
      makeStampMatrix(
        state.matrix,
        slot.x + Math.cos(ang) * dist,
        slot.y + 0.05 + age * 0.16 - t * 0.2,
        slot.z + Math.sin(ang) * dist,
        Math.max(0.02, dropR),
      );
      mesh.setMatrixAt(base + 1 + d, state.matrix);
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (!live) {
    state.splashLive = false;
    mesh.visible = false;
  }
}

function stampAt(state, x, z, y, radius, splash) {
  const reach = radius + CELL * 0.35;
  const reachSq = reach * reach;
  const minC = colOf(x - radius, state.cols);
  const maxC = colOf(x + radius, state.cols);
  const minR = rowOf(z - radius, state.rows);
  const maxR = rowOf(z + radius, state.rows);
  let added = 0;
  let spinIndex = cellIndex(colOf(x, state.cols), rowOf(z, state.rows), state.cols);
  if (markCell(state, spinIndex, y)) added += 1;
  for (let row = minR; row <= maxR; row += 1) {
    for (let col = minC; col <= maxC; col += 1) {
      const { x: cx, z: cz } = cellCenter(col, row);
      const dx = cx - x;
      const dz = cz - z;
      if (dx * dx + dz * dz > reachSq) continue;
      const index = cellIndex(col, row, state.cols);
      if (markCell(state, index, y)) {
        added += 1;
        spinIndex = index;
      }
    }
  }
  if (!added) return 0;
  if (state.mesh) state.mesh.instanceMatrix.needsUpdate = true;
  if (splash) spawnSplash(state, x, z, y, radius > WALK_RADIUS);
  return added;
}

function tickPaint(app, state) {
  state.splashClock = performance.now();
  state.run = app.__survival?.run;
  if (state.run && state.run.phase !== "playing") {
    tickSplash(state);
    return;
  }
  if (sceneId(app) !== "IslandWest") {
    publish(state);
    return;
  }
  const player = getIslandPlayer(app);
  const scene = player?.scene || app.$webgl?.scenes?.current;
  if (!scene) return;
  attachVisual(state, scene);
  ensureLandMaterial(scene);
  if (!westPlayable(app) || flag(app.$store?.isTransitionActive) || flag(app.$store?.isDialogVisible)) {
    tickSplash(state);
    publish(state);
    return;
  }
  if (!player || player.hidden || !player.canMove) {
    tickSplash(state);
    publish(state);
    return;
  }
  const physics = player.scene?.physics;
  const dist = Number(physics?.playerDistanceFromFloor || 0);
  const pos = player.base?.position;
  if (!pos) {
    publish(state);
    return;
  }
  if (pos.y < WATER_Y + 0.2) {
    tickSplash(state);
    publish(state);
    return;
  }
  const jump = app.__jumpState;
  const airborne = !!jump?.airborne;
  const landed = state.wasAirborne && !airborne;
  state.wasAirborne = airborne;
  const onFloor = dist <= FLOOR_MAX || physics?.playerIsCollidingGround;
  if (airborne && dist > 0.55) {
    tickSplash(state);
    publish(state);
    return;
  }
  if (!onFloor && !landed) {
    tickSplash(state);
    publish(state);
    return;
  }
  const under = cellIndex(colOf(pos.x, state.cols), rowOf(pos.z, state.rows), state.cols);
  if (!landed && under === state.lastCell) {
    tickSplash(state);
    publish(state);
    return;
  }
  state.lastCell = under;
  const brush = state.run?.upgrades.brush || 0;
  stampAt(state, pos.x, pos.z, pos.y, (landed ? JUMP_RADIUS : WALK_RADIUS) + brush * 1.7, true);
  tickSplash(state);
  publish(state);
  if (state.run) state.run.coverage = state.ratio;
}

function bindFrame(app, state) {
  const run = () => {
    try {
      tickPaint(app, state);
    } catch (error) {
      console.warn("glorb paint tick failed", error);
    }
  };
  const bind = () => {
    const hooks = app.$webgl?.hooks?.beforeFrame;
    if (hooks?.watch) {
      hooks.watch(run);
      return true;
    }
    return false;
  };
  if (!bind()) {
    const timer = window.setInterval(() => {
      if (bind()) window.clearInterval(timer);
    }, 200);
    const loop = () => {
      if (!app.$webgl?.hooks?.beforeFrame?.watch) run();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

function makeSplashSlots() {
  const slots = new Array(SPLASH_SLOTS);
  for (let i = 0; i < SPLASH_SLOTS; i += 1) {
    slots[i] = { born: 0, x: 0, y: 0, z: 0, big: 0 };
  }
  return slots;
}

export function installPaint(app) {
  if (app.__paintState) return app.__paintState;
  const { cols, rows, total } = cellCount();
  const state = {
    cols,
    rows,
    cellCount: total,
    painted: 0,
    total: 0,
    ratio: 0,
    percent: 0,
    ready: false,
    wasAirborne: false,
    lastCell: -1,
    land: new Uint8Array(total),
    marked: new Uint8Array(total),
    heights: new Float32Array(total),
    mesh: null,
    splashMesh: null,
    scene: null,
    matrix: new Matrix4(),
    splashes: makeSplashSlots(),
    splashLive: false,
    splashClock: 0,
  };
  markLand(state);
  app.__paintState = state;
  app.__resetPaint = () => { resetCoverage(state); publish(state); };
  app.__paintArea = (x, z, radius, free = false) => {
    attachVisual(state, getIslandPlayer(app)?.scene || app.$webgl?.scenes?.current);
    state.freePaint = free;
    const added = stampAt(state, x, z, 3.8, radius, true);
    state.freePaint = false;
    publish(state);
    if (state.run) state.run.coverage = state.ratio;
    return added;
  };
  app.__erasePaint = (predicate) => {
    let changed = false;
    for (let i = 0; i < state.cellCount; i++) {
      if (!state.marked[i]) continue;
      const { x, z } = cellCenter(i % state.cols, Math.floor(i / state.cols));
      if (!predicate(x, z)) continue;
      state.marked[i] = 0;
      state.painted--;
      if (state.mesh) hideInstance(state.mesh, state.matrix, i);
      changed = true;
    }
    if (changed && state.mesh) state.mesh.instanceMatrix.needsUpdate = true;
    publish(state);
    if (state.run) state.run.coverage = state.ratio;
  };

  bindFrame(app, state);
  watch(() => sceneId(app), (id) => {
    detachVisual(state);
    resetCoverage(state);
    if (id === "IslandWest") {
      const scene = app.$webgl?.scenes?.current;
      if (scene) attachVisual(state, scene);
    }
    publish(state);
  });
  return state;
}
