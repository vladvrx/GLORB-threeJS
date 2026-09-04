import { a$ as MeshBasicMaterial, b5 as Mesh, b7 as BufferGeometry, b6 as BufferAttribute, bz as CircleGeometry, cd as Group, aS as Vector3 } from "../../vendor/vendor.75f6e6ae65453426.js";
import { ZB as InstancedMesh, OM as Matrix4 } from "../../vendor/three-r150.js";
import { el, unwrap, playUiSound } from "./dom.js";
import { getIslandPlayer } from "./jump.js";
import { GLORB_ISLAND } from "./island.js";
import { createRun, startRun, stepRun, pauseRun, resumeRun, restoreShrine, pulse, purchase, blightAt, protectedAt, trailRadius, checkOutcome, RULES, UPGRADES } from "./survival-model.js";

const world = (p) => ({ x: p.x + GLORB_ISLAND.cx, z: p.z + GLORB_ISLAND.cz });
const local = (p) => ({ x: p.x - GLORB_ISLAND.cx, z: p.z - GLORB_ISLAND.cz });
const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const mmss = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

// Original inline art: no image downloads or font-dependent emoji glyphs.
const UPGRADE_ICONS = {
  brush: '<path d="M10 6h28v14H10z" fill="#8bdcff"/><path d="M10 6h28v14H10zM10 14h28M17 6v7m7-7v7m7-7v7"/><path d="M12 20h24v7l-8 4v10a4 4 0 0 1-8 0V31l-8-4z" fill="#ffc65a"/><path d="M12 20h24v7l-8 4v10a4 4 0 0 1-8 0V31l-8-4z"/>',
  boots: '<path d="M10 7h17v20l11 5v8H8V27h2z" fill="#ffba86"/><path d="M10 7h17v20l11 5v8H8V27h2zM10 14h17M9 34h28M19 21h8m-8 6h8M8 44h30"/>',
  lining: '<path d="M24 5 40 11v12c0 10-8 17-16 21C16 40 8 33 8 23V11z" fill="#b4e8c5"/><path d="M24 5 40 11v12c0 10-8 17-16 21C16 40 8 33 8 23V11z"/><path d="m16 24 6 6 11-13"/>',
};

function upgradeIcon(key) {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  for (const [name, value] of Object.entries({ viewBox: "0 0 48 48", class: "survival-upgrade-icon", "data-upgrade": key, "aria-hidden": "true", focusable: "false", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linejoin": "round", "stroke-linecap": "round" })) icon.setAttribute(name, value);
  icon.innerHTML = UPGRADE_ICONS[key];
  return icon;
}

function crystalGeometry() {
  const vertices = [[0, 1.8, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, -0.7, 0]];
  const faces = [[0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]];
  const positions = [], colors = [];
  faces.forEach((face, i) => face.forEach(index => {
    positions.push(...vertices[index]);
    const shade = 0.68 + (i % 4) * 0.1;
    colors.push(shade, shade, shade);
  }));
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute("color", new BufferAttribute(new Float32Array(colors), 3));
  geometry.computeVertexNormals();
  return geometry;
}

function makeVisuals(scene, run) {
  const group = new Group();
  group.name = "glorb-survival";
  const geometry = crystalGeometry();
  const disc = new CircleGeometry(1, 32);
  disc.rotateX(-Math.PI / 2);
  const materials = [];
  const material = (color, opacity = 1, vertexColors = false) => {
    const m = new MeshBasicMaterial({ color, opacity, vertexColors, transparent: opacity < 1, depthWrite: opacity === 1, fog: true, side: 2 });
    materials.push(m);
    return m;
  };
  const gold = material(0xffd65c, 1, true);
  const stone = material(0x454063, 1, true);
  const blue = material(0x88e7ff, 1, true);
  const purple = material(0x8e267e, 0.78);
  const wispMat = material(0xed5bbe, 1, true);
  const safeMat = material(0x54ebbb, 0.15);
  const haloMat = material(0xffe38c, 0.28);
  const pulseMat = material(0x93efff, 0.3);

  // Carved sockets make the resource sites readable without covering the paint
  // field. Every stone face and inlay shares one static vertex-colored mesh.
  const detailPositions = [], detailColors = [];
  function detailFace(a, b, c, color, shade = 1) {
    for (const p of [a, b, c]) {
      detailPositions.push(...p);
      detailColors.push(((color >> 16) & 255) / 255 * shade, ((color >> 8) & 255) / 255 * shade, (color & 255) / 255 * shade);
    }
  }
  function stoneRing(at, inner, outer, y, color, sides = 12) {
    for (let i = 0; i < sides; i++) {
      const a = i * Math.PI * 2 / sides, b = (i + 1) * Math.PI * 2 / sides;
      const p = (angle, radius) => [at.x + Math.cos(angle) * radius, y, at.z + Math.sin(angle) * radius];
      detailFace(p(a, inner), p(b, outer), p(a, outer), color);
      detailFace(p(a, inner), p(b, inner), p(b, outer), color);
    }
  }
  function plinth(p, size, shrine) {
    const at = world(p), bottom = GLORB_ISLAND.floorY + .03;
    const levels = shrine
      ? [[size * .88, 0], [size, .16], [size, .46], [size * .87, .68], [size * .87, .79]]
      : [[size * .86, 0], [size, .1], [size, .23], [size * .81, .36]];
    const sides = shrine ? 12 : 8;
    for (let j = 0; j < levels.length - 1; j++) {
      const [r0, y0] = levels[j], [r1, y1] = levels[j + 1];
      for (let i = 0; i < sides; i++) {
        const a = i * Math.PI * 2 / sides, b = (i + 1) * Math.PI * 2 / sides;
        const point = (angle, radius, y) => [at.x + Math.cos(angle) * radius, bottom + y, at.z + Math.sin(angle) * radius];
        const v = [point(a, r0, y0), point(b, r0, y0), point(b, r1, y1), point(a, r1, y1)];
        const color = j === 2 ? 0xa6a2b3 : 0x69647e;
        const shade = .77 + .2 * ((Math.cos(a - .8) + 1) / 2);
        detailFace(v[0], v[1], v[2], color, shade);
        detailFace(v[0], v[2], v[3], color, shade);
      }
    }
    const [topRadius, height] = levels[levels.length - 1], top = bottom + height;
    stoneRing(at, 0, topRadius, top, 0xe2d8bc, sides);
    stoneRing(at, topRadius * .82, topRadius * .9, top + .008, 0xeebf59, sides);
    stoneRing(at, 0, topRadius * .57, top + .012, 0x514d66, sides);
    if (shrine) {
      // Twelve shallow diamond inlays sit between the core and the gold rim.
      for (let i = 0; i < 12; i++) {
        const a = i * Math.PI / 6, radius = topRadius * .7;
        const point = (r, tangent) => [at.x + Math.cos(a) * r - Math.sin(a) * tangent, top + .014, at.z + Math.sin(a) * r + Math.cos(a) * tangent];
        const v = [point(radius - .19, 0), point(radius, .09), point(radius + .19, 0), point(radius, -.09)];
        detailFace(v[0], v[1], v[2], 0xbd9141);
        detailFace(v[0], v[2], v[3], 0xbd9141);
      }
    }
  }
  run.pods.forEach(p => plinth(p, 1.55, false));
  run.shrines.forEach(p => plinth(p, 3.15, true));
  const detailGeometry = new BufferGeometry();
  detailGeometry.setAttribute("position", new BufferAttribute(new Float32Array(detailPositions), 3));
  detailGeometry.setAttribute("color", new BufferAttribute(new Float32Array(detailColors), 3));
  detailGeometry.computeBoundingSphere();
  const details = new Mesh(detailGeometry, material(0xffffff, 1, true));
  details.name = "glorb-survival-carved-bases";
  group.add(details);
  // Replays already dispose the shared crystal geometry, which owns this batch.
  geometry.addEventListener("dispose", () => detailGeometry.dispose());

  function flat(p, radius, m, y = 3.93) {
    const mesh = new Mesh(disc, m);
    const at = world(p);
    mesh.position.set(at.x, y, at.z);
    mesh.scale.set(radius, 1, radius);
    mesh.renderOrder = 12;
    group.add(mesh);
    return mesh;
  }
  function gem(p, m, scale, y) {
    const mesh = new Mesh(geometry, m);
    const at = world(p);
    mesh.position.set(at.x, y, at.z);
    mesh.scale.setScalar(scale);
    group.add(mesh);
    return mesh;
  }
  const pods = run.pods.map(p => ({ gem: gem(p, gold, 1.1, 5.7), halo: flat(p, 2.2, haloMat) }));
  const shrines = run.shrines.map(p => {
    const base = gem(p, stone, 2.2, 4.9);
    base.scale.y = 0.6;
    const core = gem(p, blue, 1.4, 8.1);
    const safe = flat(p, 10, safeMat);
    const halo = flat(p, 4.4, haloMat);
    return { base, core, safe, halo };
  });
  const blights = run.blights.map(p => flat(p, p.radius, purple, 3.96));
  const wisps = Array.from({ length: 12 }, () => gem({ x: 0, z: 0 }, wispMat, 1.25, 5));
  // One draw call for all trails, with a fixed capacity even in the final storm.
  const trails = new InstancedMesh(disc, material(0x973bc5, 0.72), RULES.trailCapacity);
  trails.name = "glorb-blight-trails";
  trails.count = 0;
  trails.renderOrder = 13;
  group.add(trails);
  const wave = flat({ x: 0, z: 0 }, 1, pulseMat, 4.02);
  wave.visible = false;
  scene.base.add(group);
  return { group, pods, shrines, blights, wisps, trails, trailMatrix: new Matrix4(), wave, waveAt: -100, geometry, disc, materials, blue, stone };
}

function destroyVisuals(visuals) {
  if (!visuals) return;
  visuals.group.removeFromParent();
  visuals.trails.dispose();
  visuals.geometry.dispose();
  visuals.disc.dispose();
  visuals.materials.forEach(m => m.dispose());
}

export function installSurvival(app) {
  if (app.__survival) return app.__survival;
  const controller = { run: createRun(), visuals: null, scene: null, ui: null, eraseClock: 0, lastTime: performance.now(), page: "briefing", lastToast: "", toastUntil: 0 };
  app.__survival = controller;

  controller.player = () => {
    const pos = getIslandPlayer(app)?.base?.position;
    return pos ? { ...local(pos), airborne: !!app.__jumpState?.airborne } : null;
  };
  controller.toast = (text) => {
    controller.lastToast = text;
    controller.toastUntil = performance.now() + 3800;
  };
  controller.action = () => {
    const p = controller.player();
    const run = controller.run;
    if (!p || run.phase !== "playing") return false;
    const near = run.shrines.find(s => !s.restored && dist(s, p) < 5.5);
    if (near) {
      const result = restoreShrine(run, p);
      if (!result) controller.toast("Gather gold pods. Restoring a shrine costs 18 PAINT.");
      return !!result;
    }
    const done = pulse(run, p);
    if (!done) controller.toast(run.pulseCooldown > 0 ? "The pulse is recharging." : "You need 5 PAINT. Find a gold pod.");
    return done;
  };
  controller.pause = (page = "pause") => {
    if (!pauseRun(controller.run)) return;
    controller.page = page;
    app.__stopDance?.();
    controller.ui?.paint(true);
  };
  controller.resume = () => {
    if (!resumeRun(controller.run)) return;
    controller.scene?.player.updateOptions({}, { elevation: 22, distance: 25, intersectGround: false });
    controller.page = "";
    controller.lastTime = performance.now();
    controller.ui?.paint(true);
  };
  controller.start = () => {
    if (!startRun(controller.run)) return;
    // The close original camera is reserved for the hub. The level needs a
    // wider portrait view so its resource routes and pursuing blight are visible.
    controller.scene?.player.updateOptions({}, { elevation: 22, distance: 25, intersectGround: false });
    controller.page = "";
    controller.lastTime = performance.now();
    controller.ui?.paint(true);
  };
  controller.replay = async () => {
    controller.run.phase = "resetting";
    app.__stopDance?.();
    const player = getIslandPlayer(app);
    await player?.teleportToPoint("Spawn");
    app.__resetPaint?.();
    if (app.__jumpState) Object.assign(app.__jumpState, { airborne: false, pendingImpulse: false, leftFloor: false, pose: 0 });
    player?.scene?.physics?.setGravity(30);
    destroyVisuals(controller.visuals);
    controller.run = createRun();
    controller.visuals = makeVisuals(controller.scene, controller.run);
    controller.page = "briefing";
    controller.lastTime = performance.now();
    controller.eraseClock = 0;
    controller.ui?.paint(true);
  };

  function tick() {
    const now = performance.now();
    const dt = (now - controller.lastTime) / 1000;
    controller.lastTime = now;
    const scene = app.$webgl?.scenes?.current;
    const inWest = scene?.id === "IslandWest" || unwrap(app.$webgl?.scenes?.currentSceneID) === "IslandWest";
    const ready = inWest && scene?.player?.isBodyReady && app.$store.sceneState >= app.$store.sceneStates.Tutorial && !app.$store.isTransitionActive && !app.$store.isDialogVisible;
    if (!ready) return;
    if (controller.scene !== scene) {
      destroyVisuals(controller.visuals);
      controller.scene = scene;
      controller.run = createRun();
      controller.visuals = makeVisuals(scene, controller.run);
      controller.page = "briefing";
      // Our briefing replaces the old movement-only tutorial on this island.
      scene.setState("Playing");
      scene.isTutoNeeded = false;
      app.$savestate.setVariable?.("isTutoCompleted", true);
      controller.ui?.paint(true);
      app.__hub?.attach(scene);
    }
    if (app.__hub?.active || app.__runner?.active) {
      scene.getCurrentCamera().unlockPlayer("survival");
      document.documentElement.classList.remove("survival-blocked", "glorb-hurt");
      return;
    }
    const run = controller.run;
    const player = scene.player;
    const p = controller.player();
    if (!p) return;
    const blocked = document.hidden || window.innerWidth > window.innerHeight || app.$store.isCustomizeOpen;
    if (blocked && run.phase === "playing") controller.pause();
    const locked = run.phase !== "playing";
    const camera = scene.getCurrentCamera();
    if (locked) camera.lockPlayer("survival");
    else camera.unlockPlayer("survival");
    const speed = 9.1 * (1 + run.upgrades.boots * 0.22);
    if (player.options.speed !== speed) {
      player.options.speed = speed;
      if (player.effects?.feet) player.effects.feet.physicsSpeed = speed;
      scene.physics.setPlayerOptions(player.options);
    }
    const previousHealth = run.health;
    stepRun(run, dt, p);
    run.coverage = app.__paintState?.ratio || 0;
    checkOutcome(run);
    if (run.phase === "playing") {
      controller.eraseClock += dt;
      if (controller.eraseClock > 0.6) {
        controller.eraseClock = 0;
        app.__erasePaint?.((x, z) => blightAt(run, local({ x, z })));
      }
    }
    document.documentElement.classList.toggle("glorb-hurt", run.health < previousHealth);
    document.documentElement.classList.toggle("survival-blocked", run.phase !== "playing");
    const v = controller.visuals;
    v.pods.forEach((mesh, i) => {
      const pod = run.pods[i];
      mesh.gem.visible = pod.cooldown <= 0;
      mesh.halo.visible = pod.cooldown <= 0;
      mesh.gem.position.y = 5.6 + Math.sin(run.elapsed * 2 + i) * 0.35;
      mesh.gem.rotation.y = run.elapsed * 0.8 + i;
    });
    v.shrines.forEach((mesh, i) => {
      const active = run.shrines[i].restored;
      mesh.safe.visible = active;
      mesh.core.material = active ? v.blue : v.stone;
      mesh.core.rotation.y = run.elapsed * 0.4 + i;
      mesh.halo.visible = !active;
    });
    v.blights.forEach((mesh, i) => {
      const b = run.blights[i];
      mesh.visible = run.elapsed >= 20 && b.suppressed <= 0;
      mesh.scale.set(b.radius, 1, b.radius);
    });
    v.wisps.forEach((mesh, i) => {
      const w = run.wisps[i];
      mesh.visible = !!w;
      if (!w) return;
      const at = world(w);
      mesh.position.set(at.x, 5 + Math.sin(w.age * 5) * 0.6, at.z);
      mesh.rotation.y = w.age * 2;
    });
    v.trails.count = run.trails.length;
    run.trails.forEach((trail, i) => {
      const at = world(trail), radius = trailRadius(run, trail);
      v.trailMatrix.makeScale(radius, 1, radius);
      v.trailMatrix.setPosition(at.x, GLORB_ISLAND.floorY + 0.17, at.z);
      v.trails.setMatrixAt(i, v.trailMatrix);
    });
    v.trails.instanceMatrix.needsUpdate = true;
    const waveAge = run.elapsed - v.waveAt;
    v.wave.visible = waveAge >= 0 && waveAge < 0.6;
    if (v.wave.visible) {
      const radius = (11 + run.upgrades.brush * 2) * waveAge / 0.6;
      v.wave.scale.set(radius, 1, radius);
      v.wave.material.opacity = 0.5 * (1 - waveAge / 0.6);
    }
    for (const event of run.events.splice(0)) {
      controller.toast(event.text);
      if (event.type === "gather") playUiSound(app, "sfx_phone_click_soft");
      if (event.type === "upgrade" || event.type === "shrine") playUiSound(app, "sfx_quest_inauguration");
      if (event.type === "shrine") {
        const at = world(run.shrines[event.id]);
        app.__paintArea?.(at.x, at.z, 10, true);
      }
      if (event.type === "pulse") {
        const at = world(event);
        v.wave.position.set(at.x, 4.02, at.z);
        v.waveAt = run.elapsed;
        app.__paintArea?.(at.x, at.z, event.radius, true);
        playUiSound(app, "sfx_UI_Dialog_CameraMove_In");
      }
      if (event.type === "won" || event.type === "lost") {
        controller.page = "result";
        app.__stopDance?.();
        if (event.type === "won") player.playEmote?.("Victory");
        camera.lockPlayer("survival");
        controller.ui?.paint(true);
      }
    }
    controller.ui?.paint();
  }

  const bindTimer = window.setInterval(() => {
    if (!app.$webgl?.hooks?.beforeFrame?.watch) return;
    clearInterval(bindTimer);
    app.$webgl.hooks.beforeFrame.watch(tick);
  }, 50);
  window.addEventListener("keydown", event => {
    if (event.code === "Escape" && controller.scene) {
      event.preventDefault();
      if (controller.run.phase === "paused") controller.resume();
      else controller.pause();
    }
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) controller.pause(); });
  window.addEventListener("blur", () => controller.pause());
  return controller;
}

export function installSurvivalHud(app, host) {
  const c = installSurvival(app);
  const hud = el("section", { class: "survival-hud", hidden: true, "aria-label": "Survival status" });
  const stats = el("div", { class: "survival-stats" });
  const health = el("span", { class: "life-stat" });
  const paintStat = el("div", { class: "paint-stat" });
  const paintLabel = el("div", { class: "paint-label" });
  const paintPercent = el("span", { class: "paint-percent" });
  paintLabel.append(el("span", { text: "PAINT" }), paintPercent);
  const paintBar = el("progress", { class: "paint-supply-bar", max: 100, value: 0, "aria-label": "PAINT supply" });
  paintStat.append(paintLabel, paintBar);
  const time = el("span", { class: "time-stat" });
  stats.append(health, paintStat, time);
  const goal = el("div", { class: "survival-goal" });
  const bar = el("progress", { class: "island-coverage-bar", max: 65, value: 0, "aria-label": "Restored island toward 65 percent" });
  const toast = el("p", { class: "survival-toast", role: "status", "aria-live": "polite" });
  const guide = el("button", { class: "survival-guide", type: "button", "aria-label": "Switch guidance target" });
  let guideMode = "shrine";
  guide.onclick = () => { guideMode = guideMode === "shrine" ? "pod" : "shrine"; };
  const tools = el("button", { class: "survival-tools", text: "Craft upgrades", type: "button", onClick: () => c.pause("craft") });
  const pause = el("button", { class: "survival-pause", text: "II", type: "button", "aria-label": "Pause game", onClick: () => c.pause() });
    const hint = el("div", { class: "survival-hint", text: "Drag to move · E to pulse · Space to jump" });
  hud.append(stats, goal, bar, toast, guide, tools, pause, hint);
  host.append(hud);

  const modal = el("div", { class: "survival-modal", hidden: true, role: "dialog", "aria-modal": "true" });
  const card = el("div", { class: "survival-card" });
  modal.append(card);
  host.append(modal);
  // Actions above the world must not start the game's global joystick.
  for (const root of [hud, modal]) {
    root.addEventListener("pointerdown", e => e.stopPropagation());
    root.addEventListener("touchstart", e => e.stopPropagation(), { passive: true });
    root.addEventListener("mousedown", e => e.stopPropagation());
  }
  const button = (text, fn, extra = "") => el("button", { class: `survival-cta ${extra}`, text, type: "button", onClick: fn });
  let screenKey = "", lastHud = 0;
  function screen() {
    const r = c.run;
    const shown = !!c.scene && ["briefing", "paused", "won", "lost", "resetting"].includes(r.phase);
    modal.hidden = !shown;
    if (!shown) { screenKey = ""; return; }
    const key = `${r.phase}:${c.page}:${Object.values(r.upgrades).join()}:${Math.floor(r.pigment)}`;
    if (screenKey === key) return;
    screenKey = key;
    card.replaceChildren();
    card.append(el("p", { class: "survival-kicker", text: "GLORB / COLOUR AGAINST THE STORM" }));
    const title = el("h1", { id: "survival-title" });
    modal.setAttribute("aria-labelledby", "survival-title");
    card.append(title);
    if (r.phase === "briefing") {
      title.textContent = "Bring this island back.";
      card.append(el("p", { text: "Restore 3 shrines and paint 65% before the storm arrives in six minutes." }));
      const steps = el("ol");
      ["Walk into gold pods to gather PAINT. They regrow.", "Walking uses PAINT. Craft upgrades or restore a shrine for 18 PAINT.", "Blight and its purple trails hurt. Pulse to clear them. Restored shrines heal you."].forEach(text => steps.append(el("li", { text })));
      card.append(steps, el("p", { class: "survival-small", text: "Drag anywhere to move. WASD / arrows also work. E restores a nearby shrine or casts a pulse. Space jumps." }), button("Let's paint", () => c.start()));
    } else if (r.phase === "won" || r.phase === "lost") {
      title.textContent = r.phase === "won" ? "Colour wins!" : "The storm got us.";
      const resultActions = el("div", { class: "survival-result-actions" });
      resultActions.append(button("Play Again", () => c.replay()));
      if (r.phase === "won" && app.__hub) {
        resultActions.append(button("BACK TO HUB", async () => {
          await c.replay();
          await app.__hub.return();
        }, "secondary"));
      }
      card.append(el("p", { text: r.endReason }), el("p", { class: "survival-result", text: `${Math.floor(r.coverage * 100)}% painted · ${r.restored}/3 shrines · ${mmss(r.elapsed)}` }), el("p", { class: "survival-small", text: r.phase === "won" ? "Try another route or a different upgrade order." : "Tip: restore the first shrine early, then craft a wide brush. Return to shrines to heal." }), resultActions);
    } else if (r.phase === "resetting") {
      title.textContent = "Fresh paint, fresh start.";
    } else {
      title.textContent = c.page === "craft" ? "Craft your upgrades." : "Take a breather.";
      card.append(el("p", { text: `${Math.floor(r.pigment)} / ${RULES.pigmentCap} PAINT available. The storm is paused.` }));
      if (c.page === "craft") {
        for (const [key, item] of Object.entries(UPGRADES)) {
          const level = r.upgrades[key], cost = item.costs[level];
          const row = el("div", { class: "survival-upgrade" });
          const details = el("div", { class: "survival-upgrade-details" });
          details.append(el("strong", { text: `${item.name} · ${level}/2` }), el("p", { text: item.description }));
          const buy = button(cost === undefined ? "Fully crafted" : `Craft · ${cost} PAINT`, () => { purchase(r, key); screenKey = ""; paint(true); }, "small");
          buy.setAttribute("aria-label", cost === undefined ? `${item.name} fully crafted` : `Craft ${item.name}, level ${level + 1}, for ${cost} PAINT`);
          buy.disabled = cost === undefined || r.pigment < cost;
          details.append(buy);
          row.append(upgradeIcon(key), details);
          card.append(row);
        }
      } else card.append(button("Craft upgrades", () => { c.page = "craft"; paint(true); }, "secondary"));
      card.append(button("Back to the island", () => c.resume()));
    }
    queueMicrotask(() => card.querySelector("button:not(:disabled)")?.focus({ preventScroll: true }));
  }
  const project = new Vector3();
  function paint(force = false) {
    if (app.__hub?.active || app.__runner?.active) {
      hud.hidden = true;
      modal.hidden = true;
      screenKey = "";
      return;
    }
    const now = performance.now();
    if (!force && now - lastHud < 90) return;
    lastHud = now;
    const r = c.run, p = c.player();
    hud.hidden = !c.scene || app.$store.isCustomizeOpen;
    health.textContent = `Life ${Math.ceil(r.health)}`;
    const supply = Math.max(0, Math.min(100, r.pigment / RULES.pigmentCap * 100));
    paintPercent.textContent = `${Math.round(supply)}%`;
    paintBar.value = supply;
    paintBar.setAttribute("aria-valuetext", `${Math.floor(r.pigment)} of ${RULES.pigmentCap} PAINT (${Math.round(supply)}%)`);
    paintStat.title = `${Math.floor(r.pigment)} / ${RULES.pigmentCap} PAINT`;
    paintStat.classList.toggle("is-low", r.pigment < 5);
    time.textContent = `${mmss(Math.max(0, RULES.duration - r.elapsed))} · Storm ${r.stage}`;
    goal.textContent = `${r.restored}/3 shrines restored · ${Math.floor(r.coverage * 100)} / 65% painted`;
    bar.value = Math.min(65, r.coverage * 100);
    const message = now < c.toastUntil ? c.lastToast : (r.pigment < 5 ? "Low PAINT. Follow the gold pod marker." : "");
    if (toast.textContent !== message) toast.textContent = message;
    toast.hidden = !message;
    const action = host.querySelector(".dance-button button");
    if (action && p) {
      const nearby = r.shrines.some(s => !s.restored && dist(s, p) < 5.5);
      action.setAttribute("aria-label", nearby ? "Restore shrine" : "Cleansing pulse");
      action.setAttribute("data-caption", nearby ? "Restore · 18" : r.pulseCooldown > 0 ? `Pulse · ${Math.ceil(r.pulseCooldown)}s` : "Pulse · 5");
    }
    if (p && c.scene) {
      const mode = r.pigment < 18 || r.restored === 3 ? "pod" : guideMode;
      const candidates = mode === "pod" ? r.pods.filter(n => n.cooldown <= 0) : r.shrines.filter(s => !s.restored);
      const target = candidates.sort((a, b) => dist(a, p) - dist(b, p))[0];
      if (target) {
        const at = world(target);
        project.set(at.x, 5, at.z).project(c.scene.getCurrentCamera().cam);
        const angle = Math.atan2(project.x, project.y);
        const arrows = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];
        const index = (Math.round(angle / (Math.PI / 4)) + 8) % 8;
        guide.textContent = `${arrows[index]} ${mode === "pod" ? "Gold pod" : `Shrine ${target.id + 1}`} · ${Math.round(dist(target, p))}m`;
      } else guide.textContent = "Paint the remaining white ground";
      hint.textContent = protectedAt(r, p) ? "Healing zone · Restored shrines keep blight away" : "Drag to move · E to pulse · Space to jump";
    }
    screen();
  }
  c.ui = { paint };
  modal.addEventListener("keydown", event => {
    if (event.code !== "Tab") return;
    const buttons = [...card.querySelectorAll("button:not(:disabled)")];
    if (!buttons.length) return;
    const index = buttons.indexOf(document.activeElement);
    event.preventDefault();
    buttons[(index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
  });
  paint(true);
}
