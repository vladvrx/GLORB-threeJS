import {
  a$ as MeshBasicMaterial,
  aS as Vector3,
  aU as Matrix4,
  b5 as Mesh,
  b6 as BufferAttribute,
  bz as CircleGeometry,
  cV as Raycaster,
  w as watch,
} from "../../vendor/vendor.75f6e6ae65453426.js";
import { el, playUiSound, unwrap } from "./dom.js";
import { getIslandPlayer } from "./jump.js?v=jump-5";

const WEST_MIN_X = -217.414489;
const WEST_MAX_X = -90.303222;
const WEST_MIN_Z = -62.174738;
const WEST_MAX_Z = 89.309248;
const CELL = 3;
const WALK_RADIUS = 1.45;
const JUMP_RADIUS = 3.1;
const STAMP_Y = 0.1;
const WATER_Y = 0.55;
const FLOOR_MAX = 0.32;
const SCAN_BATCH = 96;
const PAINT_COLOR = 0x8fd4ff;
const DOUBLE_SIDE = 2;

function flag(value) {
  return !!unwrap(value);
}

function sceneId(app) {
  const scenes = app.$webgl?.scenes;
  return unwrap(scenes?.currentSceneID) || scenes?.current?.id || null;
}

function playing(app) {
  const store = app.$store;
  if (!store) return false;
  return Number(unwrap(store.sceneState)) >= Number(unwrap(store.sceneStates?.Playing));
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

function hitMeshes(scene) {
  const meshes = [];
  if (scene?.main?.isMesh) meshes.push(scene.main);
  const chunks = scene?.chunks;
  if (Array.isArray(chunks)) {
    for (let i = 0; i < chunks.length; i += 1) {
      const chunk = chunks[i];
      if (chunk?.isMesh) meshes.push(chunk);
    }
  }
  return meshes;
}

function scanCell(state, index) {
  const col = index % state.cols;
  const row = Math.floor(index / state.cols);
  const { x, z } = cellCenter(col, row);
  state.rayOrigin.set(x, 28, z);
  state.rayDir.set(0, -1, 0);
  state.raycaster.set(state.rayOrigin, state.rayDir);
  state.raycaster.near = 0;
  state.raycaster.far = 56;
  state.hits.length = 0;
  const meshes = state.meshes;
  for (let i = 0; i < meshes.length; i += 1) {
    state.raycaster.intersectObject(meshes[i], false, state.hits);
  }
  if (!state.hits.length) return;
  state.hits.sort((a, b) => a.distance - b.distance);
  const hit = state.hits[0];
  const y = hit.point?.y;
  const ny = hit.face?.normal?.y;
  if (!Number.isFinite(y) || y < WATER_Y) return;
  if (Number.isFinite(ny) && ny < 0.28) return;
  state.land[index] = 1;
  state.heights[index] = y;
}

function floodReachable(state, app) {
  const { cols, rows, total } = state;
  const reachable = state.reachable;
  reachable.fill(0);
  const player = getIslandPlayer(app);
  const pos = player?.base?.position;
  const startCol = pos ? colOf(pos.x, cols) : colOf(-144.80751, cols);
  const startRow = pos ? rowOf(pos.z, rows) : rowOf(23.634537, rows);
  let seed = cellIndex(startCol, startRow, cols);
  if (!state.land[seed]) {
    let best = -1;
    let bestDist = Infinity;
    for (let i = 0; i < total; i += 1) {
      if (!state.land[i]) continue;
      const c = i % cols;
      const r = Math.floor(i / cols);
      const dx = c - startCol;
      const dz = r - startRow;
      const d = dx * dx + dz * dz;
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    seed = best;
  }
  if (seed < 0) {
    state.total = 0;
    return;
  }
  const stack = [seed];
  reachable[seed] = 1;
  let count = 1;
  while (stack.length) {
    const i = stack.pop();
    const c = i % cols;
    const r = Math.floor(i / cols);
    for (let dr = -1; dr <= 1; dr += 1) {
      for (let dc = -1; dc <= 1; dc += 1) {
        if (!dc && !dr) continue;
        const nc = c + dc;
        const nr = r + dr;
        if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
        const n = cellIndex(nc, nr, cols);
        if (reachable[n] || !state.land[n]) continue;
        reachable[n] = 1;
        count += 1;
        stack.push(n);
      }
    }
  }
  state.total = count;
}

function publish(state) {
  if (state.complete) {
    state.ratio = 1;
    state.percent = 100;
    return;
  }
  if (!state.ready || state.total <= 0) {
    state.ratio = 0;
    state.percent = 0;
    return;
  }
  state.ratio = Math.min(1, state.painted / state.total);
  state.percent = state.painted >= state.total ? 100 : Math.min(99, Math.floor(state.ratio * 100));
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
  state.total = 0;
  state.ratio = 0;
  state.percent = 0;
  state.complete = false;
  state.ready = false;
  state.scanIndex = 0;
  state.land.fill(0);
  state.reachable.fill(0);
  state.marked.fill(0);
  state.heights.fill(0);
  state.wasAirborne = false;
  if (state.mesh) state.mesh.count = 0;
}

function paintCell(state, index, y) {
  if (state.marked[index]) return false;
  if (!state.reachable[index]) {
    state.reachable[index] = 1;
    state.land[index] = 1;
    state.total += 1;
  }
  state.marked[index] = 1;
  state.painted += 1;
  if (Number.isFinite(y)) state.heights[index] = y;
  const mesh = state.mesh;
  if (mesh && mesh.count < mesh.capacity) {
    const col = index % state.cols;
    const row = Math.floor(index / state.cols);
    const { x, z } = cellCenter(col, row);
    const stampY = (Number.isFinite(y) ? y : state.heights[index] || 0) + STAMP_Y;
    makeStampMatrix(state.matrix, x, stampY, z, CELL * 0.72);
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
      const index = cellIndex(col, row, state.cols);
      if (state.ready && !state.reachable[index] && !state.land[index]) continue;
      if (paintCell(state, index, y)) added += 1;
    }
  }
  return added;
}

function completePaint(app, state) {
  if (state.complete) return;
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

function tickScan(state, app) {
  if (state.ready) return;
  const scene = app.$webgl?.scenes?.current;
  if (!scene?.main && !scene?.chunks?.length) return;
  if (!state.meshes.length) state.meshes = hitMeshes(scene);
  if (!state.meshes.length) return;
  const end = Math.min(state.cellCount, state.scanIndex + SCAN_BATCH);
  for (let i = state.scanIndex; i < end; i += 1) scanCell(state, i);
  state.scanIndex = end;
  if (state.scanIndex < state.cellCount) return;
  floodReachable(state, app);
  for (let i = 0; i < state.cellCount; i += 1) {
    if (state.marked[i] && !state.reachable[i]) {
      state.reachable[i] = 1;
      state.total += 1;
    }
  }
  state.ready = true;
  if (state.total < 1) state.total = Math.max(1, state.painted);
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
  tickScan(state, app);
  if (!playing(app) || flag(app.$store?.isTransitionActive) || flag(app.$store?.isDialogVisible)) {
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
  const radius = landed ? JUMP_RADIUS : WALK_RADIUS;
  stampAt(state, pos.x, pos.z, pos.y, radius);
  publish(state);
  if (state.ready && state.total > 0 && state.painted >= state.total) completePaint(app, state);
}

function bindFrame(app, state) {
  const run = () => tickPaint(app, state);
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
    scanIndex: 0,
    wasAirborne: false,
    land: new Uint8Array(total),
    reachable: new Uint8Array(total),
    marked: new Uint8Array(total),
    heights: new Float32Array(total),
    mesh: null,
    scene: null,
    meshes: [],
    hits: [],
    matrix: new Matrix4(),
    raycaster: new Raycaster(),
    rayOrigin: new Vector3(),
    rayDir: new Vector3(0, -1, 0),
  };
  app.__paintState = state;
  app.__paintFillAll = () => {
    if (!state.ready) {
      state.scanIndex = state.cellCount;
      const scene = app.$webgl?.scenes?.current;
      state.meshes = hitMeshes(scene);
      for (let i = 0; i < state.cellCount; i += 1) scanCell(state, i);
      floodReachable(state, app);
      state.ready = true;
    }
    attachVisual(state, getIslandPlayer(app)?.scene || app.$webgl?.scenes?.current);
    for (let i = 0; i < state.cellCount; i += 1) {
      if (!state.reachable[i] || state.marked[i]) continue;
      paintCell(state, i, state.heights[i]);
    }
    publish(state);
    if (state.painted >= state.total) completePaint(app, state);
  };

  bindFrame(app, state);
  watch(() => sceneId(app), (id) => {
    document.documentElement.classList.remove("paint-complete");
    detachVisual(state);
    resetCoverage(state);
    state.meshes = [];
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
      && playing(app)
      && !flag(store?.isTransitionActive)
      && !flag(store?.isCustomizeOpen)
      && !flag(store?.isCinematicActive)
      && unwrap(app.$route?.name) === "Home";
  };

  const paintHud = () => {
    const state = app.__paintState;
    const show = meterVisible() && !state?.complete;
    meter.classList.toggle("is-visible", show);
    meter.toggleAttribute("hidden", !show);
    const value = state?.percent ?? 0;
    percent.textContent = `${value}%`;
    fill.style.width = `${Math.round((state?.ratio || 0) * 1000) / 10}%`;
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
