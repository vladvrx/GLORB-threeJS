# glorb build log

## What this is

The recovered glorb island — original Three.js r150 engine, hashed GLBs, intro boat, LETS GO, dialogue, GLORB, neon water. Phone and map stay removed.

## Jam constraints (packaging, not a new game)

- Single-player, portrait-first (original rotate overlay in landscape on phones)
- Offline zip under 35MB (`npm run zip`)
- `index.html` boots the game; `vendor/` holds the original engine libraries
- Survival / restore-the-island loop that already exists on GLORB (quests, systems, pickups)

No second notification stack. No from-scratch shard/pylon island.
