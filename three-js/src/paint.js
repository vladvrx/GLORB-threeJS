import {
  a$ as MeshBasicMaterial,
  aU as Matrix4,
  b5 as Mesh,
  b6 as BufferAttribute,
  bz as CircleGeometry,
  w as watch,
} from "../../vendor/vendor.75f6e6ae65453426.js";
import { el, playUiSound, unwrap } from "./dom.js";
import { getIslandPlayer } from "./jump.js?v=jump-5";

const WEST_MIN_X = -217.414489;
const WEST_MAX_X = -90.303222;
const WEST_MIN_Z = -62.174738;
const WEST_MAX_Z = 89.309248;
const CELL = 1;
const WALK_RADIUS = 0.48;
const JUMP_RADIUS = 1.03;
const STAMP_SCALE = 0.72;
const STAMP_Y = 0.1;
const WATER_Y = 0.55;
const FLOOR_MAX = 0.32;
const PAINT_COLOR = 0x8fd4ff;
const DOUBLE_SIDE = 2;
const MIN_LAND = 80;
const LAND_CX = (WEST_MIN_X + WEST_MAX_X) * 0.5;
const LAND_CZ = (WEST_MIN_Z + WEST_MAX_Z) * 0.5;
const LAND_RX = ((WEST_MAX_X - WEST_MIN_X) * 0.5) * 0.78;
const LAND_RZ = ((WEST_MAX_Z - WEST_MIN_Z) * 0.5) * 0.7;

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
  const nx = (x - LAND_CX) / LAND_RX;
  const nz = (z - LAND_CZ) / LAND_RZ;
  return nx * nx + nz * nz <= 1;
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

function createVisual(capacity, renderOrder) {
  const geometry = new CircleGeometry(1, 14);
  geometry.rotateX(-Math.PI / 2);
  const material = new MeshBasicMaterial({
    color: PAINT_COLOR,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    fog: true,
    side: DOUBLE_SIDE,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  const mesh = new PaintInstances(geometry, material, capacity);
  mesh.name = "glorb-paint";
  mesh.renderOrder = renderOrder;
  mesh.matrixAutoUpdate = true;
  mesh.frustumCulled = false;
  return mesh;
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
  if (state.complete) {
    state.ratio = 1;
    state.percent = 100;
    return;
  }
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
  state.percent = state.painted > 0 ? Math.max(1, Math.min(99, Math.round(state.ratio * 100))) : 0;
}

function attachVisual(state, scene) {
  if (!scene?.base || state.mesh?.parent === scene.base) return;
  detachVisual(state);
  const order = (scene.webgl?.store?.renderOrder?.grass ?? 8) + 1;
  const mesh = createVisual(state.cellCount, order);
  scene.base.add(mesh);
  state.mesh = mesh;
  state.scene = scene;
}

function detachVisual(state) {
  const mesh = state.mesh;
  if (!mesh) return;
  mesh.parent?.remove(mesh);
  mesh.geometry?.dispose?.();
  mesh.material?.dispose?.();
  state.mesh = null;
  state.scene = null;
}

function resetCoverage(state) {
  state.painted = 0;
  state.ratio = 0;
  state.percent = 0;
  state.complete = false;
  state.wasAirborne = false;
  state.marked.fill(0);
  state.heights.fill(0);
  if (state.mesh) state.mesh.count = 0;
  markLand(state);
}

function paintCell(state, index, y) {
  if (!state.land[index] || state.marked[index]) return false;
  state.marked[index] = 1;
  state.painted += 1;
  if (Number.isFinite(y)) state.heights[index] = y;
  const mesh = state.mesh;
  if (mesh && mesh.count < mesh.capacity) {
    const col = index % state.cols;
    const row = Math.floor(index / state.cols);
    const { x, z } = cellCenter(col, row);
    const stampY = (Number.isFinite(y) ? y : state.heights[index] || 0) + STAMP_Y;
    makeStampMatrix(state.matrix, x, stampY, z, CELL * STAMP_SCALE);
    mesh.setMatrixAt(mesh.count, state.matrix);
    mesh.count += 1;
    mesh.instanceMatrix.needsUpdate = true;
  }
  return true;
}

function stampAt(state, x, z, y, radius) {
  const reach = radius + CELL * 0.5;
  const reachSq = reach * reach;
  const minC = colOf(x - radius, state.cols);
  const maxC = colOf(x + radius, state.cols);
  const minR = rowOf(z - radius, state.rows);
  const maxR = rowOf(z + radius, state.rows);
  let added = 0;
  for (let row = minR; row <= maxR; row += 1) {
    for (let col = minC; col <= maxC; col += 1) {
      const { x: cx, z: cz } = cellCenter(col, row);
      const dx = cx - x;
      const dz = cz - z;
      if (dx * dx + dz * dz > reachSq) continue;
      if (paintCell(state, cellIndex(col, row, state.cols), y)) added += 1;
    }
  }
  return added;
}

function completePaint(app, state) {
  if (state.complete) return;
  if (!state.ready || state.total < MIN_LAND || state.painted < state.total) return;
  state.complete = true;
  state.ratio = 1;
  state.percent = 100;
  document.documentElement.classList.add("paint-complete");
  const player = getIslandPlayer(app);
  const scene = player?.scene || app.$webgl?.scenes?.current;
  try {
    scene?.getCurrentCamera?.()?.lockPlayer?.("paint-complete");
  } catch {
    /* camera lock is optional */
  }
  if (app.$webgl?.store) app.$webgl.store.frozenPlayerDelay = 60_000;
  try {
    player?.playEmote?.("Victory");
  } catch {
    /* emote clip may be missing */
  }
  playUiSound(app, "sfx_quest_inauguration");
}

function tickPaint(app, state) {
  if (state.complete) {
    if (app.$webgl?.store) app.$webgl.store.frozenPlayerDelay = 1000;
    publish(state);
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
  if (!westPlayable(app) || flag(app.$store?.isTransitionActive) || flag(app.$store?.isDialogVisible)) {
    publish(state);
    return;
  }
  if (!player || player.hidden || !player.canMove) {
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
    publish(state);
    return;
  }
  const jump = app.__jumpState;
  const airborne = !!jump?.airborne;
  const landed = state.wasAirborne && !airborne;
  state.wasAirborne = airborne;
  const onFloor = dist <= FLOOR_MAX || physics?.playerIsCollidingGround;
  if (airborne && dist > 0.55) {
    publish(state);
    return;
  }
  if (!onFloor && !landed) {
    publish(state);
    return;
  }
  stampAt(state, pos.x, pos.z, pos.y, landed ? JUMP_RADIUS : WALK_RADIUS);
  publish(state);
  if (state.ready && state.painted >= state.total) completePaint(app, state);
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
    complete: false,
    ready: false,
    wasAirborne: false,
    land: new Uint8Array(total),
    marked: new Uint8Array(total),
    heights: new Float32Array(total),
    mesh: null,
    scene: null,
    matrix: new Matrix4(),
  };
  markLand(state);
  app.__paintState = state;
  app.__paintFillAll = () => {
    attachVisual(state, getIslandPlayer(app)?.scene || app.$webgl?.scenes?.current);
    const y = getIslandPlayer(app)?.base?.position?.y;
    for (let i = 0; i < state.cellCount; i += 1) {
      if (!state.land[i] || state.marked[i]) continue;
      paintCell(state, i, y);
    }
    publish(state);
    completePaint(app, state);
  };

  bindFrame(app, state);
  watch(() => sceneId(app), (id) => {
    document.documentElement.classList.remove("paint-complete");
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

export function installPaintHud(app, host) {
  const meter = el("div", { class: "paint-meter", "data-paint-meter": "" });
  const copy = el("div", { class: "paint-meter-copy" });
  const label = el("span", { class: "paint-meter-label", text: "Paint" });
  const percent = el("span", { class: "paint-meter-percent", text: "0%" });
  copy.append(label, percent);
  const track = el("div", { class: "paint-meter-track", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": "0", "aria-label": "Island painted" });
  const fill = el("div", { class: "paint-meter-fill" });
  track.append(fill);
  meter.append(copy, track);
  host.append(meter);

  const overlay = el("div", { class: "paint-complete-overlay", hidden: true, role: "dialog", "aria-label": "Game over" });
  overlay.append(
    el("p", { class: "paint-complete-kicker", text: "GLORB" }),
    el("h1", { class: "paint-complete-title", text: "Painted!" }),
    el("p", { class: "paint-complete-body", text: "The whole island is light blue." }),
  );
  host.append(overlay);

  const meterVisible = () => {
    const store = app.$store;
    return sceneId(app) === "IslandWest"
      && westPlayable(app)
      && !flag(store?.isTransitionActive)
      && !flag(store?.isCustomizeOpen)
      && !flag(store?.isCinematicActive)
      && !flag(store?.isDialogVisible);
  };

  const paintHud = () => {
    const state = app.__paintState;
    const show = meterVisible() && !state?.complete;
    meter.classList.toggle("is-visible", show);
    meter.toggleAttribute("hidden", !show);
    const value = state?.percent ?? 0;
    percent.textContent = `${value}%`;
    const width = state?.complete ? 100 : (state?.painted ? Math.max(2.5, (state.ratio || 0) * 100) : 0);
    fill.style.width = `${Math.round(width * 10) / 10}%`;
    track.setAttribute("aria-valuenow", String(value));
    const done = !!state?.complete;
    overlay.hidden = !done;
    overlay.classList.toggle("is-visible", done);
  };

  const loop = () => {
    paintHud();
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
