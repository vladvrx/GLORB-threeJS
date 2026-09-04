import { a$ as MeshBasicMaterial, b5 as Mesh, b7 as BufferGeometry, b6 as BufferAttribute } from '../../vendor/vendor.75f6e6ae65453426.js';
import { RUNNER, jumpHeight } from './runner-model.js';

// Original synthesized audio and a fixed particle pool. No fetched sounds,
// textures, new audio context, or per-frame scene objects are needed.
export function createRunnerFeedback(app, scene) {
  const capacity = 96, verticesPerParticle = 12;
  const particles = Array.from({ length: capacity }, () => ({ life: 0 }));
  const positions = new Float32Array(capacity * verticesPerParticle * 3);
  const colors = new Float32Array(positions.length);
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  geometry.setDrawRange(0, 0);
  const material = new MeshBasicMaterial({ vertexColors: true, fog: true, side: 2 });
  const mesh = new Mesh(geometry, material);
  mesh.name = 'glorb-runner-sparkles';
  mesh.frustumCulled = false;
  scene.base.add(mesh);
  const origin = scene.getPoint('Spawn').position.clone();
  let cursor = 0, previous = null, pendingCue = true, destroyed = false;
  let context = null, bus = null, noiseBuffer = null, lastCoinTime = -1, busTarget = 0;
  const voices = new Set();
  const linear = value => { value /= 255; return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4; };
  const palette = [0xffdc69, 0xfff0b2, 0xecc473, 0xded5b3, 0xa0c1ac, 0xb790d5]
    .map(hex => [linear(hex >> 16 & 255), linear(hex >> 8 & 255), linear(hex & 255)]);
  const offsets = [[0, 1.8, 0], [-1, -1, -1], [1, -1, -1], [0, -1, 1]];
  const faces = [0, 1, 2, 0, 2, 3, 0, 3, 1, 1, 3, 2];
  const value = flag => flag && typeof flag === 'object' && 'value' in flag ? flag.value : flag;
  const muted = () => !!(value(app.$store?.isAudioMuted) || value(app.$store?.isVideoPlaying) || document.hidden || value(app.$webgl?.audio?.muted));

  function connectAudio() {
    if (destroyed) return false;
    const audio = app.$webgl?.audio, next = audio?.getContext?.(), input = audio?.getInput?.();
    if (!next || !input || next.state === 'closed') return false;
    if (context !== next) {
      stopVoices();
      bus?.disconnect();
      context = next;
      bus = context.createGain();
      bus.gain.value = 0;
      busTarget = 0;
      bus.connect(input); // Existing game master controls mute and visibility.
      noiseBuffer = context.createBuffer(1, Math.floor(context.sampleRate * .36), context.sampleRate);
      const samples = noiseBuffer.getChannelData(0);
      for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    }
    return context.state === 'running';
  }
  function unlock() {
    connectAudio();
    if (!muted() && context?.state === 'suspended') context.resume().catch(() => {});
  }
  window.addEventListener('pointerdown', unlock, { capture: true, passive: true });
  window.addEventListener('keydown', unlock, true);

  function stopVoices() {
    for (const voice of voices) {
      try { voice.source.stop(); } catch {}
      voice.source.disconnect(); voice.gain.disconnect(); voice.filter?.disconnect();
    }
    voices.clear();
  }
  function sound(frequency, endFrequency, duration, level, type = 'sine', delay = 0) {
    if (!context || context.state !== 'running' || muted() || voices.size >= 18) return;
    const now = context.currentTime + delay, gain = context.createGain();
    let source, filter;
    if (type === 'noise') {
      source = context.createBufferSource(); source.buffer = noiseBuffer;
      filter = context.createBiquadFilter(); filter.type = 'bandpass'; filter.Q.value = .7;
      filter.frequency.setValueAtTime(frequency, now);
      filter.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
      source.connect(filter); filter.connect(gain);
    } else {
      source = context.createOscillator(); source.type = type;
      source.frequency.setValueAtTime(frequency, now);
      source.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
      source.connect(gain);
    }
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level, now + .008);
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    gain.connect(bus);
    const voice = { source, gain, filter }; voices.add(voice);
    source.onended = () => { source.disconnect(); gain.disconnect(); filter?.disconnect(); voices.delete(voice); };
    source.start(now); source.stop(now + duration + .015);
  }
  function cue() {
    sound(392, 392, .16, .15, 'triangle');
    sound(587.33, 587.33, .2, .14, 'sine', .09);
    sound(783.99, 783.99, .24, .13, 'sine', .19);
  }
  function burst(run, kind, count) {
    const coin = kind === 'coin', impact = kind === 'impact';
    for (let i = 0; i < count; i++) {
      const p = particles[cursor++ % capacity], angle = Math.PI * 2 * i / count + Math.random() * .3;
      p.life = p.total = coin ? .44 + Math.random() * .17 : impact ? .6 + Math.random() * .25 : .24 + Math.random() * .15;
      p.x = origin.x + .25; p.z = origin.z + run.lanePosition * RUNNER.laneWidth;
      p.y = origin.y + (coin ? 1.8 + jumpHeight(run) * .35 : impact ? 1 : .08);
      const speed = coin ? 3.6 : impact ? 5.2 : 2.1;
      p.vx = Math.cos(angle) * speed - run.speed * .24;
      p.vz = Math.sin(angle) * speed;
      p.vy = coin ? 2.6 + Math.random() * 2 : impact ? 3 + Math.random() * 3 : .55 + Math.random() * .5;
      p.size = coin ? .11 + Math.random() * .09 : impact ? .15 + Math.random() * .1 : .13;
      p.color = coin ? palette[i % 3] : impact ? palette[3 + i % 3] : palette[3];
      p.gravity = coin ? 7 : impact ? 12 : 2;
    }
  }
  function draw(dt) {
    let count = 0;
    for (const p of particles) {
      if (p.life <= 0) continue;
      p.life = Math.max(0, p.life - dt);
      if (!p.life) continue;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.vy -= p.gravity * dt;
      const size = p.size * Math.min(1, p.life / p.total * 2.5);
      // Four faces form a small faceted sparkle visible from the chase camera.
      for (const index of faces) {
        const offset = offsets[index], at = count * 3;
        positions[at] = p.x + offset[0] * size;
        positions[at + 1] = p.y + offset[1] * size;
        positions[at + 2] = p.z + offset[2] * size;
        colors.set(p.color, at); count++;
      }
    }
    geometry.setDrawRange(0, count);
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    mesh.visible = count > 0;
  }
  function start() {
    previous = null; pendingCue = true; lastCoinTime = -1;
    for (const p of particles) p.life = 0;
    geometry.setDrawRange(0, 0); mesh.visible = false;
    stopVoices();
  }
  function update(run, dt) {
    if (destroyed) return;
    connectAudio();
    const frozen = !['running', 'over'].includes(run.phase) || document.hidden;
    const target = muted() || frozen ? 0 : .28;
    if (bus && busTarget !== target) {
      busTarget = target;
      bus.gain.setTargetAtTime(target, context.currentTime, .012);
    }
    if (frozen) return; // Preserve particles and transition history across pauses.
    if (pendingCue && run.phase === 'running') { cue(); pendingCue = false; }
    if (previous) {
      if (run.coins > previous.coins) {
        burst(run, 'coin', Math.min(30, (run.coins - previous.coins) * 12));
        if (context && context.currentTime - lastCoinTime > .055) {
          const frequency = [783.99, 880, 987.77, 1174.66, 1318.51][run.coins % 5];
          sound(frequency, frequency * 1.02, .15, .17);
          sound(frequency * 1.5, frequency * 1.5, .19, .095, 'sine', .045);
          lastCoinTime = context.currentTime;
        }
      }
      if (run.jump > previous.jump + .1) { sound(450, 1350, .2, .15, 'noise'); sound(220, 390, .16, .055, 'sine'); }
      if (run.slide > previous.slide + .1) { sound(1700, 280, .28, .2, 'noise'); burst(run, 'dust', 6); }
      if (previous.jump > 0 && run.jump <= 0 && run.phase === 'running') { burst(run, 'dust', 9); sound(160, 65, .105, .14, 'triangle'); }
      if (previous.phase === 'running' && run.phase === 'over') {
        burst(run, 'impact', 26); sound(150, 45, .24, .22, 'triangle'); sound(950, 180, .23, .22, 'noise');
      }
      if (!previous.missionComplete && run.missionComplete) {
        burst(run, 'coin', 48);
        sound(523.25, 523.25, .22, .15, 'triangle');
        sound(659.25, 659.25, .26, .14, 'sine', .12);
        sound(783.99, 783.99, .32, .14, 'sine', .24);
        sound(1046.5, 1046.5, .45, .12, 'sine', .36);
      }
    }
    previous = { coins: run.coins, jump: run.jump, slide: run.slide, phase: run.phase, missionComplete:run.missionComplete };
    draw(Math.max(0, Math.min(dt, .05)));
  }
  function destroy() {
    destroyed = true; stopVoices(); bus?.disconnect();
    window.removeEventListener('pointerdown', unlock, true); window.removeEventListener('keydown', unlock, true);
    mesh.removeFromParent(); geometry.dispose(); material.dispose();
  }
  start();
  return { update, start, destroy };
}
