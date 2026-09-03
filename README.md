# glorb

The playable game is the recovered **Three.js r150** island (`loadWebGL`): intro boat, LETS GO, dialogue, GLORB, neon water, original GLBs and HUD. There is no phone and no map.

This is the same glorb build we have been iterating — not a replacement loop and not a from-scratch island.

## Run locally

```bash
npm run dev
```

Open [http://127.0.0.1:43219/three-js](http://127.0.0.1:43219/three-js) (or `/`).

## What you play

1. Preloader with the glorb mark, then **LETS GO**.
2. Intro camera down to the red/yellow boat and the Hello / Yes / No thanks graph.
3. Boat to **GLORB** (`IslandWest`). Walk, talk, restore systems, complete quests.
4. Header, mute, centered talk bubbles, bottom hints.
5. **Jump** with Space or the small button in the bottom-right. In the air the character spreads their legs.

The playable world is the intro boat plus **GLORB**. The bike race, secret island, and test lab are gone, along with the GLBs and music they uniquely loaded.

## Jam packaging

`npm run zip` writes `glorb.zip` (under 35MB). The zip is this same recovered island, not a second game:

- Root `index.html` holds **all** JS and CSS (engine, HUD, shaders, Draco decoder text).
- `reference/` holds the hashed GLBs, audio, fonts, UI images, and `draco_decoder.wasm`.
- `direct-port/` holds `site.json` (LETS GO) and other JSON locale/data.

On phones the zip adds `html.phone` and tries `screen.orientation.lock('portrait')`. Landscape phones still get the original rotate overlay. Desktop HUD is unchanged.

The zip is gitignored. Rebuild with `npm run zip` (needs `zip` and will install `esbuild` if missing).

## Layout

| Path | Role |
| --- | --- |
| `index.html` | Preloader + boot (zip / `/`) |
| `three-js/` | HUD, boot, engine glue |
| `vendor/` | Original `loadWebGL` + Vue plugin vendor |
| `reference/assets/` | Island GLBs, character, audio, UI |
| `direct-port/` | `site.json` (LETS GO), recovered CSS |
