import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveHubCollision} from '../three-js/src/hub-collision.js';

test('hub circle colliders push the player outside solid props',()=>{
  const p={x:10.2,z:20},origin={x:10,z:20};
  assert.equal(resolveHubCollision(p,[{kind:'circle',x:0,z:0,radius:1}],origin,.5),true);
  assert.ok(Math.hypot(p.x-10,p.z-20)>=1.5-1e-6);
});

test('rotated hub boxes block their full footprint and leave clear points alone',()=>{
  const collider={kind:'box',x:2,z:-1,width:5,depth:2,turn:Math.PI/4},origin={x:100,z:50};
  const blocked={x:102,z:49},clear={x:110,z:60};
  assert.equal(resolveHubCollision(blocked,[collider],origin,.6),true);
  assert.equal(resolveHubCollision(clear,[collider],origin,.6),false);
  assert.deepEqual(clear,{x:110,z:60});
});
