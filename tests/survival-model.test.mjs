import test from 'node:test';
import assert from 'node:assert/strict';
import { createRun, startRun, pauseRun, resumeRun, stepRun, purchase, restoreShrine, pulse, blightAt, trailRadius, checkOutcome, RULES } from '../three-js/src/survival-model.js';

test('gathering, spending, cooldown and upgrades form a repeatable economy', () => {
  const run = createRun(); startRun(run);
  const pod = run.pods[0];
  stepRun(run, 0.1, pod);
  assert.equal(run.pigment, 52);
  stepRun(run, 0.1, pod);
  assert.equal(run.pigment, 52);
  assert.equal(purchase(run, 'brush'), true);
  assert.equal(run.pigment, 32);
  assert.equal(purchase(run, 'brush'), true);
  assert.equal(run.pigment, 0);
  assert.equal(purchase(run, 'brush'), false);
  assert.equal(purchase(run, 'boots'), false);
  for (let i = 0; i < 225; i++) stepRun(run, 0.1, pod);
  assert.equal(run.pigment, 24);
  assert.equal(run.upgrades.brush, 2);
});

test('shrines require proximity and resources, and heal only after investment', () => {
  const run = createRun(); startRun(run);
  assert.equal(restoreShrine(run, {x: 0,z: -40}), false);
  assert.ok(restoreShrine(run, run.shrines[0]));
  assert.equal(run.pigment, 10);
  assert.equal(restoreShrine(run, run.shrines[0]), false);
  run.health = 50;
  stepRun(run, 0.1, run.shrines[0]);
  assert.ok(run.health > 50);
  assert.equal(run.restored, 1);
});

test('pause freezes threat, resource timers and session time', () => {
  const run = createRun(); startRun(run);
  stepRun(run, 0.1, run.pods[0]);
  pauseRun(run);
  const before = structuredClone(run);
  for (let i = 0; i < 1000; i++) stepRun(run, 0.1, run.blights[0]);
  assert.deepEqual(run, before);
  resumeRun(run);
  stepRun(run, 0.1, {x: 0,z: 0});
  assert.ok(run.elapsed > before.elapsed);
});

test('threat escalates and pulse has cost, cooldown and suppression', () => {
  const run = createRun(); startRun(run);
  for (let i = 0; i < 610; i++) stepRun(run, 0.1, {x: 0,z: 0,airborne:true});
  assert.equal(run.stage, 2);
  assert.ok(run.wisps.length > 0);
  assert.ok(run.blights[0].radius > 2);
  const pigment = run.pigment;
  assert.equal(pulse(run, run.blights[0]), true);
  assert.equal(run.pigment, pigment - RULES.pulseCost);
  assert.equal(pulse(run, run.blights[0]), false);
  assert.equal(run.blights[0].suppressed, 18);
});

test('victory requires both goals, failure is terminal, replay state is clean', () => {
  const run = createRun(); startRun(run);
  run.coverage = 0.8; checkOutcome(run); assert.equal(run.phase, 'playing');
  run.restored = 3; checkOutcome(run); assert.equal(run.phase, 'won');
  const saved = structuredClone(run);
  stepRun(run, 0.1, {x:0,z:0}); assert.deepEqual(run, saved);
  const loss = createRun(); startRun(loss); loss.health = 0; checkOutcome(loss); assert.equal(loss.phase, 'lost');
  const timed = createRun(); startRun(timed); timed.elapsed = 360; checkOutcome(timed); assert.equal(timed.phase, 'lost');
  const replay = createRun(); assert.equal(replay.elapsed, 0); assert.equal(replay.restored, 0); assert.equal(replay.health, 100);
});

test('chasers leave bounded, temporary ground trails that pause and expire', () => {
  const run = createRun(); startRun(run);
  run.elapsed = 30; run.nextWisp = 999;
  run.wisps = [{ id: 1, x: 0, z: 0, age: 0, trailClock: 0 }];
  const player = { x: 15, z: 0, airborne: true };
  for (let i = 0; i < 10; i++) stepRun(run, 0.1, player);
  assert.ok(run.wisps[0].x > 0, 'wisp follows the player');
  assert.ok(run.trails.length >= 3);
  assert.ok(run.trails[0].x < run.wisps[0].x, 'trail remains behind its moving wisp');
  assert.equal(run.trails[0].z, 0);
  assert.equal(trailRadius(run, run.trails[0]), RULES.trailRadius);
  pauseRun(run);
  const paused = structuredClone(run);
  stepRun(run, 0.1, player);
  assert.deepEqual(run, paused);
  resumeRun(run);
  run.wisps = [];
  for (let i = 0; i < 121; i++) stepRun(run, 0.1, player);
  assert.equal(run.trails.length, 0, 'trails expire without needing another wisp');

  run.wisps = Array.from({length: 12}, (_, id) => ({id, x: id, z: 0, age: 0, trailClock: 0}));
  for (let i = 0; i < 150; i++) stepRun(run, 0.1, player);
  assert.ok(run.trails.length <= RULES.trailCapacity);
  assert.equal(createRun().trails.length, 0, 'replay starts without any trails');
});

test('purple trails harm on the ground, fade with their radius and clear with pulse or restoration', () => {
  const run = createRun(); startRun(run);
  run.elapsed = 30; run.nextWisp = 999;
  const player = {x: 0, z: 0};
  run.trails = [{...player, expiresAt: 42}];
  assert.equal(blightAt(run, player), true);
  stepRun(run, 0.1, player);
  assert.ok(run.health < 100);
  const health = run.health;
  stepRun(run, 0.1, {...player, airborne: true});
  assert.equal(run.health, health, 'jumping avoids ground trail damage');
  run.elapsed = 41;
  assert.ok(trailRadius(run, run.trails[0]) < RULES.trailRadius / 2);
  assert.equal(blightAt(run, {x: 1, z: 0}), false, 'shrunken visual has a shrunken hazard');
  assert.equal(pulse(run, player), true);
  assert.equal(run.trails.length, 0);
  assert.equal(blightAt(run, player), false);
  run.trails = [{...run.shrines[0], expiresAt: 53}];
  assert.ok(restoreShrine(run, run.shrines[0]));
  assert.equal(run.trails.length, 0, 'restoration clears trails inside the healing zone');
});
