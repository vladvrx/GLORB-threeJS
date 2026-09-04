# Glorb hub

The existing intro conversation now arrives in the hub. The hub is a walkable garden island with palms, rocks, benches, sandy paths, and a mint entrance to Level One. The current survival paint square is Level One.

Walk through the entrance or select **Enter Level One**, then **Let's paint**. Use **Hub** to return. Level One's timer, health, paint, upgrades, and player position are retained during hub visits within the current session. Reloading does not save a run.

The hub uses the original responsive island camera. The raised survival view starts with gameplay and returns when continuing a run. Resizing preserves the camera appropriate to the current area.

`three-js/src/hub.js` adds a scenery group to the recovered scene, sharing its existing floor and player controller. Entering Level One hides the group and restores the square. Existing GLBs, intro dialogue, and world data are not rewritten by the hub. Scenery is decorative; the original floor supplies collision.

Run `node tests/verify-hub.mjs` with the local server on port 43220, or set `GLORB_URL`. This checks the public intro, hub movement, paused resources, Level One entry, returning and continuing, camera changes, resizing, and walking into the entrance. Screenshots are written to `test-results-hub`.
