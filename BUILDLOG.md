# glorb build log

## Pass 1 — constraints

Competition rules first: single-player, portrait-only, offline zip, all game code in `index.html`, libraries in `vendor/`. The recovered Vue HUD, notification toasts, phone, and map are out. The playable game is Three.js only.

## Pass 2 — core loop

Survival & Resource Management, one island, one session:

1. Gather cyan shards (resource).
2. Convert six shards into a restored pylon (craft / upgrade).
3. Corruption and purple storms escalate (threat).
4. Restore three pylons to win, or fill the bar and lose, then play again.

Talk bubbles are in-world briefing, not a notification system. Meters and the restore button are the live feedback.

## Pass 3 — packaging

`scripts/build.mjs` copies `src/glorb.js` into `src/shell.html`. `scripts/zip.mjs` emits `glorb.zip` with only `index.html` and `vendor/`. No CDN, no webfonts, no image services. Audio is generated in the Web Audio API.

## Pass 4 — verify

Play in the 9:16 frame: start → gather → restore at least one pylon → storm corrupts shards → win or lose → play again. Confirm the zip is under 35MB and contains `index.html` plus `vendor/three.module.min.js` and `vendor/three.core.min.js`. Game function names stay readable.
