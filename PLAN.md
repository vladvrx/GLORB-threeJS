# GLORB competition plan

Authoritative starting point: vladvrx/GLORB-threeJS, commit c3758c1.
Planned full-game structure: the existing hub, four minigames, and one final level that becomes playable after all four minigames are complete. The user will define the games and their completion conditions later.

Current work is planning and architecture only. Do not add required-game flags, completion tracking, locked entrances, new gameplay, or final-level behavior yet. See [Minigame and final-level architecture](docs/minigame-architecture.md) for the proposed module boundaries, lifecycle, save format, and implementation stages.

The checkout currently contains survival and Temple Dash. Neither is assigned to a planned slot by this document. The survival notes below describe existing gameplay, not a decision about the four future games. The separate Simulation & Management expansion remains on hold. The art-colony proposal and implementation were rejected and removed.

## Locked design

Keep the recovered `loadWebGL` world, HUD, and GLBs 1:1, including the existing Three.js r150 controller, red alien, UFO arrival, paint island, movement, jump, and dance animation. The original intro now arrives in a walkable hub; the current Level One is the survival paint square. The hub uses the original close camera; starting Level One raises the follow camera. The planned progression system must fit around this world.

The intro dialogue is locked to the supplied original, including wording and choices. All new gameplay instructions belong in the island briefing, not in the boat conversation.

A run lasts at most six active minutes. Gather PAINT from gold pods by walking into them. Walking spends PAINT to restore the white ground with blue paint. The HUD shows supply as a percentage of its 150-unit capacity. Use the same resource to craft a wider brush, faster boots, or protective lining; each upgrade has a recognizable icon. Invest PAINT at each of three shrines to establish a permanent safe zone. Blight grows across the island and damages GLORB on contact. Chasers leave purple trails for twelve seconds; pulses and restored shrines clear them. Dance releases a cleansing pulse at a PAINT cost. Jump makes a wider paint splash and avoids ground damage while airborne.

Win by restoring all three shrines and painting at least 65% of the island. Lose at zero health or when the six-minute storm arrives. Both result screens offer Play Again. Pausing, tab switching, customization, and portrait rotation must not consume the active session clock. Replay resets the run without replaying the boat intro.

The first shrine and PAINT pods teach the loop nearby. Subsequent shrines pull the player across the island. Escalation occurs every minute. Restored shrines heal nearby and suppress blight, making route planning and upgrade timing matter.

## Work and acceptance

1. Audit the repository, active scene data, module dependencies, assets, packaging and existing tests.
2. Implement and balance the resource, restoration, upgrade, threat, win/loss/replay and onboarding systems.
3. Verify actual movement, gathering, spending, paint, damage, healing, escalating threat, pause, win, loss and repeat play. Inspect portrait screenshots as well as programmatic state.
4. Remove unused scene files, meshes and references with a recorded keep-list. Preserve the active world's rendering and animation.
5. Package readable own game code into root index.html. Keep third-party libraries under vendor. Validate a clean extracted ZIP below 35,000,000 bytes with external requests blocked.
6. Produce the English anonymous design-intent DOCX using the official fixed sections, no more than 500 words; maintain BUILDLOG.md during the work.

## Evidence still required

- Browser performance observations and full touch-input playthrough. The keyboard-input full win, intro, HUD, trails and replay checks currently pass.
- Complete unused-source/asset cleanup and license/provenance audit; replaced models/audio are excluded from the ZIP but still retained in the source checkout.
- Final document generation/checks and a fresh package verification after any further changes.
- Existing assets are supplied by the repository. Repository access alone does not establish ownership; do not invent an ownership certification.

## Second deliverable — on hold

A separate Simulation & Management version is on hold per the entrant's latest instruction to keep the hub and survival minigame. Do not resume this expansion without a new request.
