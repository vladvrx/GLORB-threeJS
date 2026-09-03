import * as THREE from "three";

// glorb — portrait survival loop on a decaying data island.
// Gather shards, restore pylons, outrun corruption, play again.

const SHARD_COST = 6;
const SHARD_CAP = 8;
const PYLON_COUNT = 3;
const STORM_START = 18;
const MAX_SHARDS = 26;

const COLORS = {
  sky: 0x70bfe4,
  waterDeep: new THREE.Color("#0d8a55"),
  waterNeon: new THREE.Color("#3dff6a"),
  sand: new THREE.Color("#f2d48a"),
  grass: new THREE.Color("#3cb86a"),
  grassDark: new THREE.Color("#1f7a48"),
  body: 0x7cffb2,
  belly: 0xf4fff4,
  npc: 0x9d8cff,
  shard: 0x9af5fc,
  bad: 0x9d4edd,
  yellow: 0xf6d35f,
  red: 0xf54721,
  teal: 0x02c6a7,
  wood: 0x8b5a3c,
  boatRed: 0xf54721,
  boatYellow: 0xf6d35f,
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hash(x, z) {
  const n = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function noise(x, z) {
  const i = Math.floor(x);
  const j = Math.floor(z);
  const fx = x - i;
  const fz = z - j;
  const u = fx * fx * (3 - 2 * fx);
  const v = fz * fz * (3 - 2 * fz);
  const a = hash(i, j);
  const b = hash(i + 1, j);
  const c = hash(i, j + 1);
  const d = hash(i + 1, j + 1);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

function fbm(x, z) {
  return (
    noise(x, z) * 0.55 +
    noise(x * 2.03, z * 2.03) * 0.28 +
    noise(x * 4.07, z * 4.07) * 0.17
  );
}

function heightAt(x, z) {
  const ridge = Math.exp(-(x * x) / (21 * 21) - (z * z) / (36 * 36));
  const shore = THREE.MathUtils.smoothstep(0.16, 0.58, ridge);
  const n = fbm(x * 0.09, z * 0.08);
  return shore * (0.28 + n * 2.55);
}

function walkable(x, z) {
  return heightAt(x, z) > 0.16;
}

function damp(current, target, lambda, dt) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

// ---------------------------------------------------------------------------
// Audio — all tones are generated locally. Nothing is fetched.
// ---------------------------------------------------------------------------
const audio = {
  ctx: null,
  master: null,
  muted: false,
  musicTimer: 0,
  musicStep: 0,
};

function ensureAudio() {
  if (audio.ctx) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  audio.ctx = new Ctx();
  audio.master = audio.ctx.createGain();
  audio.master.gain.value = audio.muted ? 0 : 0.22;
  audio.master.connect(audio.ctx.destination);
}

function tone(freq, dur, type, gain, slide) {
  if (!audio.ctx || audio.muted) return;
  const t = audio.ctx.currentTime;
  const osc = audio.ctx.createOscillator();
  const amp = audio.ctx.createGain();
  osc.type = type || "triangle";
  osc.frequency.setValueAtTime(freq, t);
  if (slide) osc.frequency.exponentialRampToValueAtTime(slide, t + dur);
  amp.gain.setValueAtTime(gain || 0.12, t);
  amp.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.connect(amp);
  amp.connect(audio.master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function sfx(name) {
  ensureAudio();
  if (!audio.ctx) return;
  if (name === "pickup") {
    tone(740, 0.09, "triangle", 0.16, 1180);
  } else if (name === "bad") {
    tone(180, 0.2, "sawtooth", 0.1, 90);
  } else if (name === "restore") {
    tone(392, 0.18, "square", 0.1, 523);
    tone(523, 0.22, "triangle", 0.08, 784);
  } else if (name === "talk") {
    tone(520, 0.08, "square", 0.08);
    tone(640, 0.1, "square", 0.06);
  } else if (name === "win") {
    tone(392, 0.18, "triangle", 0.12, 523);
    tone(523, 0.2, "triangle", 0.1, 659);
    tone(784, 0.35, "triangle", 0.1);
  } else if (name === "lose") {
    tone(220, 0.4, "sawtooth", 0.08, 80);
  } else if (name === "click") {
    tone(880, 0.05, "square", 0.07);
  }
}

function tickMusic(dt) {
  if (!audio.ctx || audio.muted) return;
  audio.musicTimer -= dt;
  if (audio.musicTimer > 0) return;
  audio.musicTimer = 0.42;
  const scale = [196, 247, 294, 330, 392];
  const note = scale[audio.musicStep % scale.length];
  audio.musicStep += 1;
  tone(note, 0.3, "sine", 0.035);
}

function setMuted(muted) {
  audio.muted = muted;
  if (audio.master) audio.master.gain.value = muted ? 0 : 0.22;
}

// ---------------------------------------------------------------------------
// Input — on-screen joystick plus WASD for desk testing of the portrait frame.
// ---------------------------------------------------------------------------
const input = {
  x: 0,
  z: 0,
  action: false,
  actionHeld: false,
  keys: Object.create(null),
  pointerId: null,
};

function bindInput(stick, knob) {
  const rest = 37;
  const max = 36;

  function setKnob(dx, dy) {
    const len = Math.hypot(dx, dy) || 1;
    const clamped = Math.min(len, max);
    const nx = (dx / len) * clamped;
    const ny = (dy / len) * clamped;
    knob.style.left = `${rest + nx}px`;
    knob.style.top = `${rest + ny}px`;
    input.x = nx / max;
    input.z = ny / max;
  }

  function endStick() {
    input.pointerId = null;
    input.x = 0;
    input.z = 0;
    knob.style.left = `${rest}px`;
    knob.style.top = `${rest}px`;
  }

  stick.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    stick.setPointerCapture(event.pointerId);
    input.pointerId = event.pointerId;
    const rect = stick.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setKnob(event.clientX - rect.left - cx, event.clientY - rect.top - cy);
  });
  stick.addEventListener("pointermove", (event) => {
    if (input.pointerId !== event.pointerId) return;
    const rect = stick.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setKnob(event.clientX - rect.left - cx, event.clientY - rect.top - cy);
  });
  stick.addEventListener("pointerup", endStick);
  stick.addEventListener("pointercancel", endStick);

  window.addEventListener("keydown", (event) => {
    input.keys[event.code] = true;
    if (event.code === "KeyE" || event.code === "Space") input.action = true;
  });
  window.addEventListener("keyup", (event) => {
    input.keys[event.code] = false;
    if (event.code === "KeyE" || event.code === "Space") input.actionHeld = false;
  });
}

function pollKeys() {
  const ix = (input.keys.KeyD || input.keys.ArrowRight ? 1 : 0) - (input.keys.KeyA || input.keys.ArrowLeft ? 1 : 0);
  const iz = (input.keys.KeyS || input.keys.ArrowDown ? 1 : 0) - (input.keys.KeyW || input.keys.ArrowUp ? 1 : 0);
  if (ix || iz) {
    const len = Math.hypot(ix, iz) || 1;
    input.x = ix / len;
    input.z = iz / len;
  }
}

// ---------------------------------------------------------------------------
// Meshes
// ---------------------------------------------------------------------------
function mat(color, opts) {
  return new THREE.MeshLambertMaterial({ color, ...opts });
}

function makeGlorb(kind) {
  const root = new THREE.Group();
  const bodyColor = kind === "npc" ? COLORS.npc : COLORS.body;
  const torso = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), mat(bodyColor));
  torso.scale.set(0.85, 1.05, 0.7);
  torso.position.y = 0.72;
  torso.castShadow = true;
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), mat(COLORS.belly));
  belly.position.set(0, 0.62, 0.18);
  belly.scale.set(1, 0.9, 0.6);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 12), mat(bodyColor));
  head.position.y = 1.22;
  head.scale.set(1.05, 1.28, 0.95);
  head.castShadow = true;
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), mat(0x1b1740));
  const eyeR = eyeL.clone();
  eyeL.position.set(-0.12, 1.28, 0.28);
  eyeR.position.set(0.12, 1.28, 0.28);
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), mat(0x3b3777));
  mouth.scale.set(1.4, 0.45, 0.6);
  mouth.position.set(0, 1.1, 0.3);
  const legGeo = new THREE.CylinderGeometry(0.045, 0.06, 0.42, 6);
  const legMat = mat(bodyColor);
  const legL = new THREE.Mesh(legGeo, legMat);
  const legR = new THREE.Mesh(legGeo, legMat);
  legL.position.set(-0.12, 0.28, 0);
  legR.position.set(0.12, 0.28, 0);
  const footGeo = new THREE.ConeGeometry(0.13, 0.16, 3);
  const footL = new THREE.Mesh(footGeo, mat(0x2b2860));
  const footR = footL.clone();
  footL.rotation.x = Math.PI / 2;
  footR.rotation.x = Math.PI / 2;
  footL.position.set(-0.12, 0.08, 0.08);
  footR.position.set(0.12, 0.08, 0.08);
  root.add(torso, belly, head, eyeL, eyeR, mouth, legL, legR, footL, footR);
  root.userData.legs = [legL, legR];
  root.userData.head = head;
  return root;
}

function makePylon(color) {
  const root = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.42, 2.2, 6), mat(color));
  shaft.position.y = 1.2;
  shaft.castShadow = true;
  const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.55), mat(color, { emissive: color, emissiveIntensity: 0.15 }));
  crystal.position.y = 2.45;
  crystal.castShadow = true;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.07, 8, 16), mat(0xffffff));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.2;
  root.add(shaft, crystal, ring);
  root.userData.crystal = crystal;
  root.userData.shaft = shaft;
  return root;
}

function makeShard(corrupted) {
  const mesh = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.28),
    mat(corrupted ? COLORS.bad : COLORS.shard, {
      emissive: corrupted ? COLORS.bad : COLORS.shard,
      emissiveIntensity: 0.45,
    }),
  );
  mesh.castShadow = true;
  return mesh;
}

function makeTree() {
  const root = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.7, 5), mat(COLORS.wood));
  trunk.position.y = 0.35;
  trunk.castShadow = true;
  const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.1, 7), mat(COLORS.grassDark));
  leaf.position.y = 1.05;
  leaf.castShadow = true;
  root.add(trunk, leaf);
  return root;
}

function makeBoat() {
  const root = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.5, 0.28, 6), mat(COLORS.boatYellow));
  const cabin = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(COLORS.boatRed));
  cabin.position.y = 0.2;
  const stripe = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.08, 6, 12), mat(COLORS.boatRed));
  stripe.rotation.x = Math.PI / 2;
  stripe.position.y = 0.05;
  root.add(disc, cabin, stripe);
  return root;
}

function makeIsland() {
  const geo = new THREE.PlaneGeometry(78, 98, 78, 98);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const sand = COLORS.sand;
  const grass = COLORS.grass;
  const dark = COLORS.grassDark;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = heightAt(x, z);
    pos.setY(i, y);
    const t = clamp((y - 0.22) / 1.6, 0, 1);
    const c = t < 0.35 ? sand.clone().lerp(grass, t / 0.35) : grass.clone().lerp(dark, (t - 0.35) / 0.65);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshLambertMaterial({ vertexColors: true }),
  );
  mesh.receiveShadow = true;
  return mesh;
}

function makeWater() {
  const uniforms = {
    uTime: { value: 0 },
    uDeep: { value: COLORS.waterDeep },
    uNeon: { value: COLORS.waterNeon },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 uDeep;
      uniform vec3 uNeon;
      void main() {
        float w = sin(vUv.x * 42.0 + uTime * 1.4) * 0.08
                + sin(vUv.y * 30.0 - uTime * 1.1) * 0.08;
        vec3 color = mix(uDeep, uNeon, 0.52 + w);
        gl_FragColor = vec4(color, 0.9);
      }
    `,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(180, 180, 1, 1), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.02;
  mesh.userData.uniforms = uniforms;
  return mesh;
}

function makeStorm() {
  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(4.2, 0.55, 8, 24),
    mat(0x480ca7, { transparent: true, opacity: 0.72, emissive: 0x480ca7, emissiveIntensity: 0.5 }),
  );
  mesh.rotation.x = Math.PI / 2;
  mesh.visible = false;
  return mesh;
}

// ---------------------------------------------------------------------------
// Game
// ---------------------------------------------------------------------------
const host = document.getElementById("game");

const ui = {
  top: el("div", { id: "top", class: "layer" }),
  meter: null,
  fill: null,
  objective: null,
  shards: null,
  mute: null,
  speech: el("div", { id: "speech" }),
  bottom: el("div", { id: "bottom", class: "layer" }),
  stick: null,
  knob: null,
  act: null,
  cover: el("div", { id: "cover", class: "layer" }),
  title: null,
  copy: null,
  cta: null,
};

function el(tag, attrs, text) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (key === "class") node.className = value;
      else node.setAttribute(key, value);
    }
  }
  if (text) node.textContent = text;
  return node;
}

function buildUi() {
  ui.fill = el("span");
  ui.meter = el("div", { class: "meter" });
  ui.meter.append(ui.fill);
  const row = el("div", { class: "row" });
  ui.objective = el("div", {}, "Pylons 0/3");
  ui.shards = el("div", {}, "Shards 0/8");
  ui.mute = el("button", { id: "mute", class: "hit", type: "button" }, "🔊");
  row.append(ui.objective, ui.shards, ui.mute);
  ui.top.append(ui.meter, row);

  ui.stick = el("div", { id: "stick", class: "hit" });
  ui.knob = el("div", { id: "knob" });
  ui.stick.append(ui.knob);
  ui.act = el("button", { id: "act", class: "hit", type: "button" }, "TALK");
  ui.bottom.append(ui.stick, ui.act);

  ui.title = el("h1", { id: "end-title" }, "glorb");
  ui.copy = el("p", {}, "The island is dissolving. Gather shards, feed the pylons, and hold the cove together.");
  ui.cta = el("button", { class: "cta hit", type: "button" }, "LETS GO");
  ui.cover.append(ui.title, ui.copy, ui.cta);
  ui.cover.style.pointerEvents = "auto";

  host.append(ui.top, ui.speech, ui.bottom, ui.cover);

  ui.mute.addEventListener("click", () => {
    ensureAudio();
    setMuted(!audio.muted);
    ui.mute.textContent = audio.muted ? "🔇" : "🔊";
  });
  ui.act.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    input.action = true;
    input.actionHeld = true;
  });
  window.addEventListener("pointerup", () => {
    input.actionHeld = false;
  });
  ui.cta.addEventListener("click", () => {
    ensureAudio();
    audio.ctx?.resume();
    sfx("click");
    if (state.mode === "start" || state.mode === "win" || state.mode === "lose") startRun();
  });
}

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
host.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.sky);
scene.fog = new THREE.Fog(COLORS.sky, 28, 78);

const camera = new THREE.PerspectiveCamera(52, 9 / 16, 0.1, 200);
const clock = new THREE.Clock();

const hemi = new THREE.HemisphereLight(0xc8f4ff, 0x3a6b3a, 1.15);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff2c4, 1.35);
sun.position.set(18, 28, 12);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.near = 2;
sun.shadow.camera.far = 80;
sun.shadow.camera.left = -28;
sun.shadow.camera.right = 28;
sun.shadow.camera.top = 28;
sun.shadow.camera.bottom = -28;
scene.add(sun);

const island = makeIsland();
const water = makeWater();
const player = makeGlorb("player");
const npc = makeGlorb("npc");
const boat = makeBoat();
const storm = makeStorm();
scene.add(island, water, player, npc, boat, storm);

const pylons = [];
const shards = [];
const trees = [];

const pylonSpots = [
  { x: -4.5, z: 14, color: COLORS.yellow, name: "Sun pylon" },
  { x: 5.2, z: -2, color: COLORS.red, name: "Heart pylon" },
  { x: -2.4, z: -22, color: COLORS.teal, name: "Tide pylon" },
];

function placeOnGround(object, x, z, extraY) {
  object.position.set(x, heightAt(x, z) + (extraY || 0), z);
}

function scatterTrees() {
  for (const tree of trees) scene.remove(tree);
  trees.length = 0;
  for (let i = 0; i < 22; i += 1) {
    const x = (hash(i, 9) - 0.5) * 34;
    const z = (hash(i, 17) - 0.5) * 58;
    if (heightAt(x, z) < 1.05) continue;
    if (pylonSpots.some((spot) => Math.hypot(spot.x - x, spot.z - z) < 3.2)) continue;
    const tree = makeTree();
    placeOnGround(tree, x, z);
    tree.rotation.y = hash(i, 3) * Math.PI * 2;
    const s = 0.8 + hash(i, 4) * 0.7;
    tree.scale.setScalar(s);
    scene.add(tree);
    trees.push(tree);
  }
}

function spawnShards() {
  for (const shard of shards) scene.remove(shard.mesh);
  shards.length = 0;
  let placed = 0;
  let guard = 0;
  while (placed < MAX_SHARDS && guard < 400) {
    guard += 1;
    const x = (hash(guard, 21) - 0.5) * 32;
    const z = (hash(guard, 44) - 0.5) * 56;
    if (!walkable(x, z)) continue;
    if (Math.hypot(x - 0, z - 26) < 3) continue;
    const mesh = makeShard(false);
    placeOnGround(mesh, x, z, 0.55);
    scene.add(mesh);
    shards.push({ mesh, x, z, corrupted: false, taken: false, bob: hash(guard, 8) * Math.PI * 2 });
    placed += 1;
  }
  const starters = [
    [1.6, 22.4],
    [-2.2, 21.6],
    [2.8, 19.8],
    [-1.1, 18.7],
    [0.4, 16.9],
    [-3.4, 17.8],
  ];
  for (const [x, z] of starters) {
    if (!walkable(x, z)) continue;
    const mesh = makeShard(false);
    placeOnGround(mesh, x, z, 0.55);
    scene.add(mesh);
    shards.push({ mesh, x, z, corrupted: false, taken: false, bob: x + z });
  }
}

function resetPylons() {
  for (const pylon of pylons) scene.remove(pylon.root);
  pylons.length = 0;
  for (const spot of pylonSpots) {
    const root = makePylon(spot.color);
    placeOnGround(root, spot.x, spot.z);
    root.userData.shaft.material.color.setHex(0x4a4568);
    root.userData.crystal.material.emissiveIntensity = 0.05;
    scene.add(root);
    pylons.push({
      root,
      x: spot.x,
      z: spot.z,
      color: spot.color,
      name: spot.name,
      restored: false,
      hold: 0,
    });
  }
}

const state = {
  mode: "start",
  shards: 0,
  corruption: 10,
  restored: 0,
  time: 0,
  talked: false,
  speechT: 0,
  restoreHold: 0,
  stormT: 0,
  stormHits: 0,
  yaw: 0,
  camA: 0.6,
};

function showSpeech(text, seconds) {
  ui.speech.textContent = text;
  ui.speech.classList.add("visible");
  state.speechT = seconds;
}

function hideSpeech() {
  ui.speech.classList.remove("visible");
  state.speechT = 0;
}

function nearestPylon() {
  let best = null;
  let bestD = 2.3;
  for (const pylon of pylons) {
    const d = Math.hypot(player.position.x - pylon.x, player.position.z - pylon.z);
    if (d < bestD) {
      best = pylon;
      bestD = d;
    }
  }
  return best;
}

function nearNpc() {
  return Math.hypot(player.position.x - npc.position.x, player.position.z - npc.position.z) < 2.1;
}

function setAction(label, enabled) {
  if (!label) {
    ui.act.classList.remove("visible");
    return;
  }
  ui.act.classList.add("visible");
  ui.act.disabled = !enabled;
  ui.act.textContent = label;
}

function paintHud() {
  ui.fill.style.width = `${clamp(state.corruption, 0, 100)}%`;
  ui.objective.textContent = `Pylons ${state.restored}/${PYLON_COUNT}`;
  ui.shards.textContent = `Shards ${state.shards}/${SHARD_CAP}`;
}

function setMode(mode) {
  state.mode = mode;
  const playing = mode === "play";
  ui.top.classList.toggle("visible", playing);
  ui.bottom.classList.toggle("visible", playing);
  ui.cover.classList.toggle("hidden", playing);
  if (mode === "start") {
    ui.title.textContent = "glorb";
    ui.copy.textContent = "The island is dissolving. Gather shards, feed the pylons, and hold the cove together.";
    ui.cta.textContent = "LETS GO";
    ui.cta.classList.remove("again");
  } else if (mode === "win") {
    ui.title.textContent = "Island holds";
    ui.copy.textContent = "All three pylons are live. The cove is stable — for this session.";
    ui.cta.textContent = "PLAY AGAIN";
    ui.cta.classList.add("again");
    hideSpeech();
  } else if (mode === "lose") {
    ui.title.textContent = "Dissolved";
    ui.copy.textContent = "Corruption ate the shore. Reset and try a tighter gather-restore loop.";
    ui.cta.textContent = "TRY AGAIN";
    ui.cta.classList.add("again");
    hideSpeech();
  }
}

function startRun() {
  state.shards = 0;
  state.corruption = 10;
  state.restored = 0;
  state.time = 0;
  state.talked = false;
  state.restoreHold = 0;
  state.stormT = STORM_START;
  state.stormHits = 0;
  state.yaw = Math.PI;
  spawnShards();
  resetPylons();
  scatterTrees();
  placeOnGround(player, 0.2, 26.5);
  player.rotation.y = Math.PI;
  placeOnGround(npc, -1.8, 24.2);
  npc.rotation.y = 0.4;
  placeOnGround(boat, 6.5, 29.5, 0.1);
  boat.position.y = 0.18;
  storm.visible = false;
  setMode("play");
  paintHud();
  showSpeech("Shards feed pylons. Restore all three before the island dissolves.", 5.5);
  sfx("talk");
}

function collectShards() {
  for (const shard of shards) {
    if (shard.taken) continue;
    const d = Math.hypot(player.position.x - shard.mesh.position.x, player.position.z - shard.mesh.position.z);
    if (d > 1.15) continue;
    shard.taken = true;
    shard.mesh.visible = false;
    if (shard.corrupted) {
      state.corruption = clamp(state.corruption + 7, 0, 100);
      sfx("bad");
    } else if (state.shards < SHARD_CAP) {
      state.shards += 1;
      sfx("pickup");
    } else {
      shard.taken = false;
      shard.mesh.visible = true;
    }
  }
}

function restorePylon(pylon) {
  if (pylon.restored || state.shards < SHARD_COST) return;
  state.shards -= SHARD_COST;
  pylon.restored = true;
  state.restored += 1;
  state.corruption = clamp(state.corruption - 18, 0, 94);
  pylon.root.userData.shaft.material.color.setHex(pylon.color);
  pylon.root.userData.crystal.material.emissiveIntensity = 0.85;
  pylon.root.scale.setScalar(1.12);
  sfx("restore");
  paintHud();
  if (state.restored >= PYLON_COUNT) {
    setMode("win");
    sfx("win");
  }
}

function updateStorm(dt) {
  if (state.time < STORM_START) return;
  state.stormT -= dt;
  if (!storm.visible && state.stormT <= 0) {
    storm.visible = true;
    storm.position.set((hash(state.time, 1) - 0.5) * 10, 1.4, -34);
    state.stormHits = 0;
  }
  if (!storm.visible) return;
  storm.position.z += (10 + state.time * 0.04) * dt;
  storm.rotation.z += dt * 1.8;
  for (const shard of shards) {
    if (shard.taken || shard.corrupted) continue;
    if (Math.hypot(shard.mesh.position.x - storm.position.x, shard.mesh.position.z - storm.position.z) < 4.6) {
      shard.corrupted = true;
      shard.mesh.material.color.setHex(COLORS.bad);
      shard.mesh.material.emissive.setHex(COLORS.bad);
    }
  }
  if (Math.hypot(player.position.x - storm.position.x, player.position.z - storm.position.z) < 4.4 && state.stormHits === 0) {
    state.corruption = clamp(state.corruption + 8, 0, 100);
    state.stormHits = 1;
    sfx("bad");
  }
  if (storm.position.z > 38) {
    storm.visible = false;
    state.stormT = Math.max(9, 16 - state.time * 0.05);
  }
}

const _wish = new THREE.Vector3();
const _forward = new THREE.Vector3();

function updatePlayer(dt) {
  pollKeys();
  const moving = Math.hypot(input.x, input.z);
  if (moving > 0.08) {
    camera.getWorldDirection(_forward);
    _forward.y = 0;
    if (_forward.lengthSq() < 0.0001) _forward.set(0, 0, -1);
    _forward.normalize();
    const rightX = _forward.z;
    const rightZ = -_forward.x;
    _wish.set(
      _forward.x * -input.z + rightX * input.x,
      0,
      _forward.z * -input.z + rightZ * input.x,
    );
    if (_wish.lengthSq() > 0.0001) {
      _wish.normalize();
      state.yaw = Math.atan2(_wish.x, _wish.z);
      const speed = 6.4;
      const nx = player.position.x + _wish.x * speed * dt;
      const nz = player.position.z + _wish.z * speed * dt;
      if (walkable(nx, player.position.z)) player.position.x = nx;
      if (walkable(player.position.x, nz)) player.position.z = nz;
    }
  }
  player.position.y = heightAt(player.position.x, player.position.z);
  player.rotation.y = damp(player.rotation.y, state.yaw, 10, dt);
  const swing = moving > 0.08 ? Math.sin(state.time * 10) * 0.45 : 0;
  player.userData.legs[0].rotation.x = swing;
  player.userData.legs[1].rotation.x = -swing;
  player.userData.head.rotation.z = moving > 0.08 ? Math.sin(state.time * 6) * 0.08 : Math.sin(state.time * 2) * 0.05;

  collectShards();

  const pylon = nearestPylon();
  if (pylon && !pylon.restored) {
    const enough = state.shards >= SHARD_COST;
    setAction(enough ? "RESTORE" : `NEED ${SHARD_COST}`, enough);
    if (enough && (input.actionHeld || input.action)) {
      state.restoreHold += dt;
      if (state.restoreHold > 0.55) restorePylon(pylon);
    } else {
      state.restoreHold = 0;
    }
  } else if (nearNpc()) {
    setAction(state.talked ? "HI" : "TALK", true);
    if (input.action) {
      state.talked = true;
      showSpeech("Six shards each. Skip the purple ones — storms poison them.", 4.5);
      sfx("talk");
    }
  } else {
    setAction(null, false);
    state.restoreHold = 0;
  }
  input.action = false;
}

function updateCamera(dt) {
  if (state.mode !== "play") {
    state.camA += dt * 0.18;
    camera.position.set(Math.sin(state.camA) * 30, 16, Math.cos(state.camA) * 30);
    camera.lookAt(0, 1.2, 4);
    return;
  }
  const back = 8.4;
  const height = 6.2;
  const tx = player.position.x - Math.sin(state.yaw) * back;
  const tz = player.position.z - Math.cos(state.yaw) * back;
  camera.position.x = damp(camera.position.x, tx, 3.2, dt);
  camera.position.z = damp(camera.position.z, tz, 3.2, dt);
  camera.position.y = damp(camera.position.y, player.position.y + height, 3.2, dt);
  camera.lookAt(player.position.x, player.position.y + 1.35, player.position.z);
}

function decayRate() {
  let rate = 1.15;
  if (state.time > 40) rate = 1.55;
  if (state.time > 70) rate = 2.05;
  rate -= state.restored * 0.22;
  return Math.max(0.45, rate);
}

function resize() {
  const width = Math.max(1, host.clientWidth);
  const height = Math.max(1, host.clientHeight);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

function frame() {
  const dt = Math.min(0.05, clock.getDelta());
  water.userData.uniforms.uTime.value = clock.elapsedTime;
  boat.position.y = 0.16 + Math.sin(clock.elapsedTime * 1.4) * 0.05;
  boat.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.04;

  for (const shard of shards) {
    if (shard.taken) continue;
    shard.mesh.rotation.y += dt * 2.2;
    shard.mesh.position.y = heightAt(shard.x, shard.z) + 0.55 + Math.sin(clock.elapsedTime * 2 + shard.bob) * 0.12;
  }

  if (state.mode === "play") {
    state.time += dt;
    if (state.speechT > 0) {
      state.speechT -= dt;
      if (state.speechT <= 0) hideSpeech();
    }
    updatePlayer(dt);
    updateStorm(dt);
    state.corruption += decayRate() * dt;
    if (state.corruption >= 100) {
      state.corruption = 100;
      setMode("lose");
      sfx("lose");
    }
    paintHud();
    tickMusic(dt);
    const fogMix = clamp(state.corruption / 100, 0, 1);
    const fog = new THREE.Color(COLORS.sky).lerp(new THREE.Color("#2a1248"), fogMix * 0.7);
    scene.background.copy(fog);
    scene.fog.color.copy(fog);
  } else {
    scene.background.setHex(COLORS.sky);
    scene.fog.color.setHex(COLORS.sky);
  }

  npc.userData.head.rotation.z = Math.sin(clock.elapsedTime * 2) * 0.05;
  updateCamera(dt);
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

buildUi();
bindInput(ui.stick, ui.knob);
scatterTrees();
resetPylons();
spawnShards();
placeOnGround(player, 0.2, 26.5);
placeOnGround(npc, -1.8, 24.2);
placeOnGround(boat, 6.5, 29.5, 0.1);
boat.position.y = 0.18;
setMode("start");
resize();
window.addEventListener("resize", resize);
requestAnimationFrame(frame);
