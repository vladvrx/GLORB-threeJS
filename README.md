# glorb

A single-player, portrait Three.js prototype. You are a glorb on a cove that is dissolving. Gather data shards, restore three pylons, and keep corruption from eating the island.

Genre: **Survival & Resource Management**.

There is no Vue, no React, no phone, no map, and no notification toasts. The whole game is Three.js plus a small HTML layer for the start button, meters, and thumb controls.

## Play

```bash
node server.mjs
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217). The playfield is locked to a 9:16 frame.

- Drag the left pad to walk. WASD also works if you are on a desk.
- Walk into cyan shards to pick them up. Purple shards are poisoned — they raise corruption.
- Hold **RESTORE** near a dark pylon when you have 6 shards.
- Talk to the other glorb for the short briefing.
- Restore all three pylons to win. If the corruption bar fills, the island dissolves and you reset.

## Package for the competition

```bash
node scripts/zip.mjs
```

That writes `glorb.zip` with `index.html` at the top level and Three.js in `vendor/`. Game code is concatenated into `index.html` and is not minified. The zip stays under 35MB.

Unzip into a clean folder, serve it locally, open a private window, turn the network off, and play a full portrait session.

## Files

| Path | Role |
| --- | --- |
| `src/glorb.js` | Readable game source |
| `src/shell.html` | Portrait shell, HUD, import map |
| `scripts/build.mjs` | Assembles `index.html` |
| `vendor/three.module.min.js` | Three.js r185 WebGL build |
| `vendor/three.core.min.js` | Three.js r185 core (required sibling of the module build) |
| `index.html` | Built game (all game code, not minified) |
