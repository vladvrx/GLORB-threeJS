# glorb — Three.js

Playable glorb on the original **Three.js r150** engine (`loadWebGL`) plus the recovered HUD. There is no in-game phone and no map.

**IslandWest** is the square paint island (`three-js/src/island.js`). Intro boat, character, taxi, palms, and the west scene mesh/splat textures stay; west scenery GLBs do not.

## Run

From the repo root:

```bash
npm run dev
```

Open [http://127.0.0.1:43219/three-js](http://127.0.0.1:43219/three-js) or `/`.

## What boots

1. Original Vue plugins so the Three.js runtime gets the same `app.$` contracts.
2. `loadWebGL` from `vendor/webgl.3250e36a65453426.js`.
3. Vanilla HUD in `src/hud/`: start overlay, dialogue, header, mute, joystick, jump, dance, paint bar.
