# Data B-each Studio

A Z-up level and content editor for the [DATAB-EACH](https://github.com/vladvrx/DATAB-EACH) Three.js island. Place, swap, move, rotate, and scale the original Cove meshes, then edit quests, notifications, characters, and dialogue without another AI pass.

The viewport treats **Z as up**. DATAB-EACH stores transforms in Three.js Y-up; the editor converts on the way in and out so exported JSON matches the game.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43180](http://127.0.0.1:43180).

## What you can edit

- **World** — Cove, intro, bike circuit, easter egg, and test lab. Click to select. `W` move, `E` rotate, `R` scale. The asset tray places a mesh at the camera target. Inspector numbers are world-space with Z up.
- **Quests** — titles, copy, unlock/reward conditions, items, and point values, with a phone preview.
- **Dialogue** — speak/prompt graphs, bubbles, emotes, choices, and `GOTO` / `END` / `GIVE_QUEST_ITEM`.
- **Characters** — NPC ids, gradient, face, script, args, and “place in scene”.
- **Notifications** — hints and overlays, with a live toast/overlay preview.

## Shortcuts

| Key | Action |
| --- | --- |
| Q / W / E / R | Select / move / rotate / scale |
| F | Frame selected |
| G | Toggle snap |
| Delete | Remove selected |
| Ctrl/Cmd+D | Duplicate |
| Ctrl/Cmd+Z | Undo |
| Ctrl/Cmd+S | Save to this browser |

## Files

Edits autosave in `localStorage`. Use **Studio** to download the full project and **Game pack** for DATAB-EACH-shaped JSON (`quests_en`, `characters_en`, `dialogs_en`, scene actors/points, plus a `props` array the original GLBs used to bake).

Original island props were extracted from `Scene_*.glb` (`extras.asset` on each instance). Swap/scale/rotate freely here; the game pack is the authored source if you later wire DATAB-EACH to read JSON props instead of the baked scene GLB.

Meshes and Draco decoders live under `public/game` and `public/draco`.
