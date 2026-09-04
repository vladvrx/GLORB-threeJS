# glorb

Playable **Three.js r150** island: intro boat, GO GO GO, dialogue, then a square of land in the water that you paint. There is no phone and no map.

This tree only keeps files that slice loads. Unused islands, scenery GLBs, partner art, dump pages, and duplicate bundles are gone.

## Run locally

```bash
npm run dev
```

Open [http://127.0.0.1:43219/three-js](http://127.0.0.1:43219/three-js) (or `/`).

## What you play

1. Preloader with the glorb mark, then **GO GO GO**.
2. Intro camera down to the red/yellow boat and the Hello / Yes / No thanks graph.
3. Boat to **GLORB** (`IslandWest`): one solid square of land. Walking paints it. The bottom bar is coverage; **100%** ends the game.
4. Header, mute, centered talk bubbles, bottom hints.
5. **Jump** with Space or the small button in the bottom-right.
6. **Dance** with E or the matching button in the bottom-left. Hold it for the original interact animation.

Decorating belongs in **Glorb Studio** (`studio/`), not this game.

## Studio

```bash
npm install --prefix studio
npm run studio
```

Open [http://127.0.0.1:43180](http://127.0.0.1:43180). The only editable maps are **Island West** and the **paint square**.

## Jam packaging

`npm run zip` writes `glorb.zip` (under 35MB):

- Root `index.html` holds **all** JS and CSS (engine, HUD, shaders, Draco decoder text).
- `reference/` holds the hashed GLBs, audio, fonts, UI images, and `draco_decoder.wasm`.
- `direct-port/` holds `site.json` (GO GO GO) and recovered CSS.

On phones the zip adds `html.phone` and tries `screen.orientation.lock('portrait')`.

## Layout

| Path | Role |
| --- | --- |
| `index.html` | Preloader + boot (zip / `/`) |
| `three-js/` | HUD, boot, engine glue, paint square |
| `vendor/` | `loadWebGL` + Vue plugin vendor |
| `reference/assets/` | Intro + square-island GLBs, character, audio, UI |
| `direct-port/` | `site.json`, recovered CSS |
| `studio/` | Glorb Studio — Island West + paint square editor |
| `scripts/prune-to-paint-map.mjs` | Keep-list for this slice |
