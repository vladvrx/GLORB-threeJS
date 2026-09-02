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

- **World** — Cove, intro, bike circuit, easter egg, and test lab. Click to select. `W` move, `E` rotate, `R` scale. The asset tray places a mesh at the camera target. Inspector numbers are world-space with Z up. Drop a `.glb`, `.gltf`, or `.fbx` onto the viewport or use **Import GLB / FBX** — the mesh is sized, added to the tray, and placed in the scene (kept in this browser).
- **Start** — Play the current island locally with your edits. WASD to walk, mouse to look, Space to jump, E to talk. Quests, hints, and dialogue come from the project. Esc or **Stop** returns to the editor.
- **Quests** — titles, copy, unlock/reward conditions, items, and point values, with a phone preview.
- **Dialogue** — speak/prompt graphs, bubbles, emotes, choices, and `GOTO` / `END` / `GIVE_QUEST_ITEM`.
- **Characters** — NPC ids, gradient, face, script, args, and “place in scene”.
- **Notifications** — hints and overlays, with a live toast/overlay preview.

## Shortcuts

| Key | Action |
| --- | --- |
| Q / W / E / R | Select / move / rotate / scale (editor) |
| Start / Esc | Play / stop the local game |
| WASD / mouse | Walk and look in play mode |
| Space | Jump (play) |
| E | Talk to a nearby character (play) |
| F | Frame selected |
| G | Toggle snap |
| Delete | Remove selected |
| Ctrl/Cmd+D | Duplicate |
| Ctrl/Cmd+Z | Undo |
| Ctrl/Cmd+S | Save to this browser |

## Files

Edits autosave in `localStorage`. **Apply to game** clones [DATAB-EACH](https://github.com/vladvrx/DATAB-EACH) if needed (`DATAB_EACH_ROOT`, default `/tmp/datab-each`), writes quests, dialogue, characters, actors, and island props into that copy, starts the real game on [http://127.0.0.1:43173](http://127.0.0.1:43173), and opens it. From a terminal you can do the same with `npm run apply-game`. **Studio** downloads the full project; **Game pack** is the raw JSON if you want to copy files yourself.

Custom imported GLB/FBX meshes stay in Studio playtest; the original game only knows its shipped Cove assets.

Meshes and Draco decoders live under `public/game` and `public/draco`.
