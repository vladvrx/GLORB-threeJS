// The rules of one run. No browser or renderer is needed to exercise this model.
export const RULES = Object.freeze({
  duration: 360, target: 0.65, shrineCost: 18, podYield: 24,
  podRegrow: 22, pigmentCap: 150, paintCost: 0.18, pulseCost: 5,
  trailLifetime: 12, trailInterval: 0.3, trailRadius: 1.35, trailCapacity: 480,
});

export const UPGRADES = Object.freeze({
  brush: { name: "Wide brush", costs: [20, 32], description: "Paint a wider path with every step." },
  boots: { name: "Spring boots", costs: [18, 28], description: "Move faster and gather pods from farther away." },
  lining: { name: "Protective lining", costs: [16, 26], description: "Take less blight damage. Heal faster at shrines." },
});

const POD_POSITIONS = [[12, 2], [-9, 4], [-26, -16], [-36, -34], [15, -24], [34, -29], [35, 23], [22, 41], [-22, 34], [-38, 9], [0, -40], [0, 38]];
const SHRINE_POSITIONS = [[6, 10], [-29, -29], [31, 30]];
const BLIGHT_POSITIONS = [[-43, -45], [43, -45], [-43, 45], [43, 45], [-42, -10], [43, 6]];
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export function createRun() {
  return {
    phase: "briefing", elapsed: 0, health: 100, pigment: 28, coverage: 0,
    stage: 1, upgrades: { brush: 0, boots: 0, lining: 0 }, pulseCooldown: 0,
    collected: 0, spent: 0, restored: 0, damageTaken: 0, paintedCells: 0,
    pods: POD_POSITIONS.map(([x, z], id) => ({ id, x, z, cooldown: 0 })),
    shrines: SHRINE_POSITIONS.map(([x, z], id) => ({ id, x, z, restored: false })),
    blights: BLIGHT_POSITIONS.map(([x, z], id) => ({ id, x, z, radius: 2, suppressed: 0 })),
    wisps: [], trails: [], nextWisp: 25, events: [], endReason: "", revision: 0,
  };
}

export function signal(run, type, text, details = {}) {
  run.events.push({ type, text, ...details });
  run.revision++;
}

export function startRun(run) {
  if (run.phase !== "briefing") return false;
  run.phase = "playing";
  signal(run, "start", "Gather gold pods. Restore the nearby shrine for 18 PAINT.");
  return true;
}

export function pauseRun(run) {
  if (run.phase !== "playing") return false;
  run.phase = "paused";
  run.revision++;
  return true;
}

export function resumeRun(run) {
  if (run.phase !== "paused") return false;
  run.phase = "playing";
  run.revision++;
  return true;
}

export function spend(run, cost) {
  if (run.pigment + 1e-8 < cost) return false;
  run.pigment = Math.max(0, run.pigment - cost);
  run.spent += cost;
  run.revision++;
  return true;
}

export function purchase(run, key) {
  const item = UPGRADES[key];
  if (!item || !["playing", "paused"].includes(run.phase)) return false;
  const level = run.upgrades[key];
  const cost = item.costs[level];
  if (cost === undefined || !spend(run, cost)) return false;
  run.upgrades[key]++;
  signal(run, "upgrade", `${item.name} upgraded to level ${level + 1}.`, { key });
  return true;
}

export function restoreShrine(run, player) {
  if (run.phase !== "playing") return false;
  const shrine = run.shrines.find(s => !s.restored && distance(s, player) <= 5.5);
  if (!shrine || !spend(run, RULES.shrineCost)) return false;
  shrine.restored = true;
  run.trails = run.trails.filter(t => !protectedAt(run, t));
  run.restored++;
  run.health = Math.min(100, run.health + 18);
  signal(run, "shrine", `Shrine ${shrine.id + 1} restored. This is a healing zone.`, { id: shrine.id });
  return shrine;
}

export function pulse(run, player) {
  if (run.phase !== "playing" || run.pulseCooldown > 0 || !spend(run, RULES.pulseCost)) return false;
  const radius = 11 + run.upgrades.brush * 2;
  run.pulseCooldown = 3;
  for (const patch of run.blights) if (distance(patch, player) < radius + patch.radius) patch.suppressed = 18;
  run.wisps = run.wisps.filter(w => distance(w, player) > radius);
  run.trails = run.trails.filter(t => distance(t, player) > radius + trailRadius(run, t));
  signal(run, "pulse", "Cleansing pulse! Blight pushed back.", { x: player.x, z: player.z, radius });
  return true;
}

export function protectedAt(run, player) {
  return run.shrines.some(s => s.restored && distance(s, player) < 10);
}

// Shrink the last three seconds of a trail, keeping its hazard and visual aligned.
export function trailRadius(run, trail) {
  return RULES.trailRadius * Math.max(0, Math.min(1, (trail.expiresAt - run.elapsed) / 3));
}

export function blightAt(run, player) {
  if (run.elapsed < 20 || protectedAt(run, player)) return false;
  return run.blights.some(b => b.suppressed <= 0 && distance(b, player) < b.radius)
    || run.trails.some(t => (t.x - player.x) ** 2 + (t.z - player.z) ** 2 < trailRadius(run, t) ** 2);
}

export function finishRun(run, phase, reason) {
  if (run.phase !== "playing") return;
  run.phase = phase;
  run.endReason = reason;
  signal(run, phase, reason);
}

export function checkOutcome(run) {
  if (run.phase !== "playing") return;
  if (run.health <= 0) finishRun(run, "lost", "The blight drained your last bit of colour.");
  else if (run.restored === 3 && run.coverage >= RULES.target) finishRun(run, "won", "Three shrines restored. The island is alive again.");
  else if (run.elapsed >= RULES.duration) finishRun(run, "lost", "The final storm arrived before the island was restored.");
}

export function stepRun(run, dt, player) {
  if (run.phase !== "playing") return;
  // Clamp stalls; tab visibility explicitly pauses the run in the controller.
  dt = Math.max(0, Math.min(0.1, dt));
  run.elapsed = Math.min(RULES.duration, run.elapsed + dt);
  run.pulseCooldown = Math.max(0, run.pulseCooldown - dt);
  const stage = Math.min(6, 1 + Math.floor(run.elapsed / 60));
  if (stage !== run.stage) {
    run.stage = stage;
    signal(run, "storm", `Storm ${stage}: blight spreads faster. Keep moving.`);
  }
  for (const pod of run.pods) {
    pod.cooldown = Math.max(0, pod.cooldown - dt);
    if (pod.cooldown === 0 && distance(pod, player) < 3.4 + run.upgrades.boots * 0.9 && run.pigment < RULES.pigmentCap - 1) {
      const amount = Math.min(RULES.podYield, RULES.pigmentCap - run.pigment);
      run.pigment += amount;
      run.collected += amount;
      pod.cooldown = RULES.podRegrow;
      signal(run, "gather", `+${Math.round(amount)} PAINT`, { id: pod.id });
    }
  }
  for (const patch of run.blights) {
    patch.suppressed = Math.max(0, patch.suppressed - dt);
    patch.radius = Math.min(20, 2.5 + run.elapsed * 0.041 + (run.stage - 1) * 0.8);
  }
  if (run.elapsed >= run.nextWisp && run.wisps.length < 12) {
    const index = Math.floor(run.nextWisp / 10) % run.blights.length;
    const source = run.blights[index];
    run.wisps.push({ id: Math.round(run.nextWisp * 10), x: source.x, z: source.z, age: 0, trailClock: 0 });
    run.nextWisp = run.elapsed + Math.max(5, 17 - run.stage * 2);
  }
  const safe = protectedAt(run, player);
  run.trails = run.trails.filter(t => t.expiresAt > run.elapsed && !protectedAt(run, t));
  let hit = blightAt(run, player);
  for (const wisp of run.wisps) {
    wisp.age += dt;
    const d = distance(wisp, player);
    const direction = safe ? -1 : 1;
    const speed = 2.4 + run.stage * 0.38;
    if (d > 0.1) {
      wisp.x += direction * (player.x - wisp.x) / d * speed * dt;
      wisp.z += direction * (player.z - wisp.z) / d * speed * dt;
    }
    wisp.trailClock = (wisp.trailClock || 0) + dt;
    if (wisp.trailClock >= RULES.trailInterval) {
      wisp.trailClock %= RULES.trailInterval;
      if (!protectedAt(run, wisp) && Math.abs(wisp.x) <= 50.5 && Math.abs(wisp.z) <= 54.5) {
        run.trails.push({ x: wisp.x, z: wisp.z, expiresAt: run.elapsed + RULES.trailLifetime });
      }
    }
    if (!safe && d < 2.1) hit = true;
  }
  run.wisps = run.wisps.filter(w => w.age < 90 && Math.abs(w.x) < 58 && Math.abs(w.z) < 62);
  if (run.trails.length > RULES.trailCapacity) run.trails.splice(0, run.trails.length - RULES.trailCapacity);
  if (hit && !player.airborne) {
    const damage = (9 + run.stage * 2) * (1 - run.upgrades.lining * 0.28) * dt;
    run.health = Math.max(0, run.health - damage);
    run.damageTaken += damage;
  } else if (safe) {
    run.health = Math.min(100, run.health + dt * (5 + run.upgrades.lining * 2));
  }
  run.revision++;
  checkOutcome(run);
}
