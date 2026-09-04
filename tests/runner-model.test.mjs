import test from 'node:test';
import assert from 'node:assert/strict';
import { RUNNER, createRunner, runnerAction, stepRunner, runnerScore } from '../three-js/src/runner-model.js';

function advance(r,seconds){for(let t=0;t<seconds;t+=1/120)stepRunner(r,1/120);}
function obstacle(kind){const r=createRunner();r.phase='running';r.nextRow=1000;r.objects=[{id:1,kind,lane:0,at:6,done:false}];return r;}
test('jump and slide avoid their obstacle; standing collides',()=>{
  for(const [kind,action] of [['jump','jump'],['slide','slide']]) {
    const clear=obstacle(kind);runnerAction(clear,action);advance(clear,.7);assert.equal(clear.phase,'running');
    const hit=obstacle(kind);advance(hit,.7);assert.equal(hit.phase,'over');
  }
});
test('lane changes dodge walls, coins score once, paused run freezes',()=>{
  const r=obstacle('wall');runnerAction(r,'left');advance(r,.7);assert.equal(r.phase,'running');
  r.objects=[{id:2,kind:'coin',lane:-1,at:r.distance+2,done:false}];advance(r,.5);assert.equal(r.coins,1);
  advance(r,.5);assert.equal(r.coins,1);assert.equal(runnerScore(r),Math.floor(r.distance)+25);
  r.phase='paused';const snapshot=structuredClone(r);advance(r,2);assert.deepEqual(r,snapshot);
});
test('speed ramps with distance and coin progress, with a mobile-friendly cap',()=>{
  function speedAt(distance,coins=0){const r=createRunner();Object.assign(r,{phase:'running',distance,coins,nextRow:10000});stepRunner(r,1/120);return r.speed;}
  assert.equal(speedAt(0),12);
  assert.ok(speedAt(200)>16);
  assert.ok(speedAt(400)>21);
  assert.equal(speedAt(600),26);
  assert.equal(speedAt(2000),26);
  assert.equal(speedAt(2000,150),26);
  assert.ok(speedAt(0,35)>speedAt(0));
});

test('fifty coins completes the milestone while running, controls and scoring continue',()=>{
  const r=obstacle('coin');r.coins=RUNNER.coinGoal-1;
  assert.equal(r.missionComplete,false);
  advance(r,.3);
  assert.equal(r.phase,'running');assert.equal(r.coins,50);
  assert.equal(r.missionComplete,true);assert.equal(r.reason,'');
  const distance=r.distance;
  r.objects.push({id:2,kind:'coin',lane:0,at:distance+2,done:false});
  advance(r,.2);
  assert.ok(r.distance>distance);assert.equal(r.coins,51);
  assert.equal(r.missionComplete,true);assert.equal(r.phase,'running');
  assert.equal(runnerScore(r),Math.floor(r.distance)+51*25);
  assert.equal(runnerAction(r,'left'),true);
  advance(r,.4);assert.equal(r.lanePosition,-1);
  assert.equal(runnerAction(r,'jump'),true);
  advance(r,1.1);assert.equal(r.phase,'running');
  assert.equal(runnerAction(r,'slide'),true);
  // Completing the milestone does not protect the player from later hazards.
  r.objects=[{id:3,kind:'wall',lane:-1,at:r.distance+3,done:false}];
  advance(r,.3);assert.equal(r.phase,'over');
  const snapshot=structuredClone(r);
  for(const action of ['left','right','jump','slide']) assert.equal(runnerAction(r,action),false);
  advance(r,3);assert.deepEqual(r,snapshot);
  assert.equal(createRunner().missionComplete,false);
});

test('seeded rows progress to reachable pairs while staying inside visual pools',()=>{
  const a=createRunner(92),b=createRunner(92);a.phase=b.phase='running';stepRunner(a,.1);stepRunner(b,.1);assert.deepEqual(a,b);
  const rows=new Map();
  function inspect(r) {
    for(const o of r.objects) {
      if(!rows.has(o.row))rows.set(o.row,new Map());
      rows.get(o.row).set(o.id,{...o});
    }
    assert.ok(r.objects.filter(o=>o.kind==='coin').length<=32);
    for(const kind of ['wall','jump','slide']) assert.ok(r.objects.filter(o=>o.kind===kind).length<=8,kind+' pool exceeded');
  }
  inspect(a);
  for(let i=0;i<8000;i++) {
    // Ignore collisions and pickups only in this scheduling soak. Objects still
    // age out normally, exercising real generation and pool storage limits.
    for(const o of a.objects)o.done=true;
    stepRunner(a,1/60);
    inspect(a);
  }
  assert.equal(a.phase,'running');assert.ok(a.distance>2500);assert.equal(a.speed,26);
  const all=[...rows.values()].map(row=>[...row.values()]);
  const obstacles=all.map(row=>row.filter(o=>o.kind!=='coin'));
  assert.deepEqual(obstacles.slice(0,3).map(row=>row.map(o=>o.kind)),[['jump'],['slide'],['wall']]);
  let pairs=0,lateRows=0;
  for(let i=0;i<obstacles.length;i++) {
    const row=obstacles[i];assert.ok(row.length>=1&&row.length<=2);
    assert.equal(new Set(row.map(o=>o.lane)).size,row.length);
    assert.equal(new Set(row.map(o=>o.kind)).size,row.length);
    const safe=[-1,0,1].filter(lane=>!row.some(o=>o.lane===lane));
    assert.ok(safe.length>=1);
    if(i>0) for(const coin of all[i].filter(o=>o.kind==='coin'))assert.ok(safe.includes(coin.lane));
    if(row.length===2)pairs++;
    if(i&&obstacles[i-1][0].at>=600) {
      const gap=row[0].at-obstacles[i-1][0].at;
      assert.ok(gap>=20&&gap<=24);
      // Even crossing both lanes fits comfortably between maximum-speed rows.
      assert.ok(gap/26>2/7+.4);
      lateRows++;
    }
  }
  assert.ok(pairs>20);assert.ok(lateRows>40);
});
