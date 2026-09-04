export const RUNNER = { laneWidth: 3.2, jumpDuration: .95, slideDuration: 1.05, coinGoal: 50 };

export function createRunner(seed = 731) {
  return { phase: 'ready', distance: 0, coins: 0, missionComplete: false, lane: 0, lanePosition: 0,
    jump: 0, slide: 0, speed: 12, objects: [], nextRow: 34, row: 0, seed,
    nextId: 0, reason: '', elapsed: 0 };
}
function random(r) {
  r.seed = (Math.imul(r.seed, 1664525) + 1013904223) >>> 0;
  return r.seed / 4294967296;
}
export function runnerAction(r, action) {
  if (r.phase !== 'running') return false;
  if (action === 'left') r.lane = Math.max(-1, r.lane - 1);
  else if (action === 'right') r.lane = Math.min(1, r.lane + 1);
  else if (action === 'jump' && r.jump <= 0 && r.slide <= 0) r.jump = RUNNER.jumpDuration;
  else if (action === 'slide' && r.jump <= 0 && r.slide <= 0) r.slide = RUNNER.slideDuration;
  else return false;
  return true;
}
export function jumpHeight(r) {
  return r.jump > 0 ? Math.sin(Math.PI * (1 - r.jump / RUNNER.jumpDuration)) * 3.5 : 0;
}
export function runnerScore(r) { return Math.floor(r.distance) + r.coins * 25; }
export function stepRunner(r, seconds) {
  if (r.phase !== 'running') return;
  // Small substeps make collisions and jump windows independent of frame rate.
  let remaining = Math.max(0, Math.min(seconds, .25));
  while (remaining > 0 && r.phase === 'running') {
    const dt = Math.min(remaining, 1 / 120);
    remaining -= dt;
    r.elapsed += dt;
    const difficulty=Math.min(1,Math.max(r.distance/600,r.coins/RUNNER.coinGoal*.8));
    r.speed = 12 + 14*difficulty;
    r.distance += r.speed * dt;
    r.jump = Math.max(0, r.jump - dt);
    r.slide = Math.max(0, r.slide - dt);
    r.lanePosition += Math.sign(r.lane - r.lanePosition) * Math.min(Math.abs(r.lane - r.lanePosition), dt * 7);
    // At least 135m of queued rows gives five seconds' warning at top speed.
    // This horizon also fits the existing pools: 32 coins / 8 of each obstacle.
    while (r.nextRow < r.distance + 135) {
      const rowDifficulty=Math.min(1,r.nextRow/600);
      const lane = r.row < 3 ? 0 : Math.floor(random(r) * 3) - 1;
      const kindIndex=r.row<3?r.row:Math.floor(random(r)*3);
      const kinds=['jump','slide','wall'];
      r.objects.push({ id: r.nextId++, kind:kinds[kindIndex], lane, at: r.nextRow, row:r.row, done: false });
      const openLanes=[-1,0,1].filter(l=>l!==lane);
      // Later pairs always have distinct lanes and types, leaving a full safe
      // lane and keeping each obstacle pool within its eight visible instances.
      if(r.row>=3&&r.nextRow>=180&&random(r)<.2+rowDifficulty*.4) {
        const secondLane=openLanes.splice(Math.floor(random(r)*2),1)[0];
        const secondKind=kinds[(kindIndex+1+Math.floor(random(r)*2))%3];
        r.objects.push({id:r.nextId++,kind:secondKind,lane:secondLane,at:r.nextRow,row:r.row,done:false});
      }
      const coinLane = r.row===0?0:openLanes[Math.floor(random(r)*openLanes.length)];
      for (let i = 0; i < 4; i++) r.objects.push({ id: r.nextId++, kind: 'coin', lane: coinLane, at: r.nextRow - 13 + i * 2.7, row:r.row, done: false });
      r.row++;
      r.nextRow += r.row<=3?29+random(r)*6:30-10*rowDifficulty+random(r)*4;
    }
    for (const o of r.objects) {
      if (o.done) continue;
      const delta = o.at - r.distance;
      if (Math.abs(delta) < (o.kind === 'coin' ? 1.1 : .9) && Math.abs(o.lane - r.lanePosition) < .56) {
        if (o.kind === 'coin') {
          o.done = true;
          r.coins++;
          if(!r.missionComplete&&r.coins>=RUNNER.coinGoal) r.missionComplete=true;
        }
        else if ((o.kind === 'jump' && jumpHeight(r) > 1.45) || (o.kind === 'slide' && r.slide > 0)) {
          // Keep checking until Glorb has passed the obstacle.
        } else {
          r.phase = 'over';
          r.reason = o.kind === 'jump' ? 'Jump over the low gold barriers.' : o.kind === 'slide' ? 'Slide under the purple beams.' : 'Switch lanes to avoid the stone blocks.';
          break;
        }
      }
      if (delta < -1.2) o.done = true;
    }
    r.objects = r.objects.filter(o => o.at > r.distance - 12);
  }
}
