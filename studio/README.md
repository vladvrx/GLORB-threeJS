# Glorb Studio

Z-up editor for the two maps that still exist in GLORB: **Island West** and the **paint square**. Place the original island meshes, edit Intro dialogue, then Apply to game.

The playable game stays at `/three-js` (intro boat, then the white paint slab). Decorating happens here. Partner booths, bike circuit, easter egg, and test lab are gone.

## Run locally

From the repo root:

```bash
npm install --prefix studio
npm run studio
```

Or from `studio/`:

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43180](http://127.0.0.1:43180). The game itself is [http://127.0.0.1:43219/three-js](http://127.0.0.1:43219/three-js).

## Maps

| Map | What you edit |
| --- | --- |
| **Paint square** | The playable white slab (`GLORB_ISLAND`). Empty until you drop props. |
| **Island West** | Remaining west land. Terrain is the original west GLB, cropped to the current game bounds. Reset size to show the old peninsula. |

Intro is not an editable map. Apply keeps the boat scene as-is.

## What you can edit

- **World** — click to select. `W` move, `E` rotate, `R` scale. The asset tray places a mesh at the camera target. Drop a `.glb` / `.gltf` / `.fbx` to import a mesh for Studio playtest only.
- **Start** — walk the current map locally. WASD, mouse look, Space jump, E to talk. Esc or **Stop** returns to the editor.
- **Dialogue** — Intro / dev speak-prompt graphs.
- **Characters** — NPC ids for placing talkers on the two maps.

There is no phone, map, quest list, or notification toast editor.

## Apply to game

**Apply to game** writes Island West + paint-square props onto `Scene_IslandWest`, plus Intro dialogue and characters, into this checkout (`DATAB_EACH_ROOT`, default `/workspace`). The playable game still blanks west scenery unless you open it in Studio mode. Custom imported meshes stay in Studio playtest.

## Shortcuts

| Key | Action |
| --- | --- |
| Q / W / E / R | Select / move / rotate / scale |
| Start / Esc | Play / stop |
| WASD / mouse | Walk and look in play mode |
| Space | Jump (play) |
| E | Talk (play) |
| G | Toggle snap |
| Delete | Remove selected |
| Ctrl/Cmd+D | Duplicate |
| Ctrl/Cmd+S | Save to this browser |

Edits autosave in `localStorage`. **Studio** downloads the project JSON. **Game pack** is the Island West overlay JSON.
