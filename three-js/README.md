# glorb — Three.js

Playable glorb on the original **Three.js r150** engine (`loadWebGL`) plus the recovered HUD for the start screen, dialogue, and menus. There is no in-game phone and no map.

The island, shaders, splats, cameras, NPCs, and intro boat are the recovered WebGL runtime loading the hashed GLBs from `reference/assets`.

## Run

From the repo root:

```bash
npm run dev
```

Open [http://127.0.0.1:43219/three-js](http://127.0.0.1:43219/three-js) or `/`.

## What boots

1. Original Vue plugins (`savestate`, `manifest`, `quests`, `dialogs`, `items`, `characters`, `router`, `preloader`, `webgl`) so the Three.js runtime gets the same `app.$` contracts.
2. `loadWebGL` from `vendor/webgl.3250e36a65453426.js` — Three.js r150, original shaders, IslandIntro → IslandWest.
3. Vue `WebGL` wrapper, `NiceRouterView` (intro **LETS GO**), and `NotificationCenter`.
4. Vanilla HUD in `src/hud/` that talks to `$webgl.store`, `$dialogs`, and `$router`:
   - Start overlay if the intro route is late
   - Dialogue bubbles, typewriter, Yes / No thanks choices
   - Header, mute, joystick, interaction button, jump (Space or bottom-right button)

The competition zip inlines this tree into a single `index.html` via `npm run zip`. Dev still loads these modules separately.
