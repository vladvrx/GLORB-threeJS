# GLORB AI build log

## 2026-09-04: scope reset to hub plus survival

The entrant rejected the art-colony expansion and requested only the walkable hub plus survival minigame for now. Removed the draft colony simulation, scenery, UI, tests, and its design-intent generator/document. Restored the hub's original Level One panel and independent minigame entry/return flow. Simulation & Management work is on hold. Preserved the exact original intro dialogue, PAINT percentage bar, upgrade icons, purple blight trails, and the removal of the landscape background photograph. Eight unit tests pass. Rebuilt the offline ZIP at 12,539,310 bytes; browser verification is recorded below when complete. The entrant requested a GitHub push of this checkpoint.

Verification after rollback: all four browser tests passed against the extracted 12,539,310-byte ZIP with external requests blocked, including a public-control win at 86.22 active seconds, 65.87% coverage, three shrines and six upgrades. The separate hub test passed movement, entry/return, progress preservation and close/elevated camera switching with zero page errors; the restored hub screenshot was inspected. Asset checks also confirm the character, UFO, logo and Intro remain original. This checkpoint does not claim completion of the remaining licensing, documentation or source-cleanup requirements.

## 2026-09-04: competition work begins

AI tool: OpenAI Codex. The entrant requested a plan, implementation, code and asset cleanup, and an offline competition submission. The entrant then specified vladvrx/GLORB-threeJS as the sole codebase and requested no skills. Work continued directly from that repository and the supplied requirements.

Starting revision: c3758c1653f2c6b46fb26c064ae28688129805f2. Local branch: codex/competition-ready.

Audit findings: the current game paints a square island, has jump and dance controls, and ends at 100% coverage. It has no resource decisions, escalating threat, or replay flow. Existing tests force the island and completion state, so they do not establish that a player can finish a session. The ZIP builder embeds third-party libraries and Draco code into index.html, contrary to the supplied vendor-folder requirement. Studio includes models not used by the playable scenes.

Decision: extend the existing world with a Survival & Resource Management loop. Pigment powers painting, upgrades, shrine restoration and a cleansing dance pulse. Three shrines and 65% restoration win a six-minute run. Blight escalates within the run. Health loss and the final storm create lose states. The original island, character, camera and boat intro stay in the game.

Verification and final package measurements will be recorded after the actual checks run. No earlier AI build history or asset ownership is asserted by this log.

## 2026-09-04: playable systems and first checks

Implemented a renderer-independent session model and integrated pigment pods, three shrine investments, three two-level upgrades, spreading blight, chasing wisps, health/healing, pulse, pause, explicit results and replay into the existing island. Five model tests and the first real-scene integration test pass. Full-session and intro checks are still underway; these early passes are not claimed as final validation.

Visual check: raised the existing follow camera to make resource markers easier to see in portrait. This needs further visual tuning. The entrant explicitly locked the intro dialogue. An attempted dialogue rewrite was reverted to the original wording and choices; new instructional text remains only in the island briefing. Added a regression check for exact original intro data.

Scope addition: after finishing and verifying survival, create a separate Simulation & Management copy from the supplied base, with invest/harvest/upgrade decisions, visible growth and a thumb-reachable purchase drawer.

## 2026-09-04: chasing blight trails and readable upgrades

The entrant requested purple trails underneath chasing blight, PAINT instead of pigment, a percentage supply bar, and icons for craft upgrades. Added twelve-second purple ground trails using a bounded instanced mesh (one trail draw call). Their last three seconds shrink both the visible mark and its damage radius. Trails damage grounded players, erase paint like the other blight, pause with the run, and clear under a cleansing pulse or a restored shrine. Replay starts with no trails. The existing resource capacity and upgrade prices are unchanged; the HUD shows PAINT supply as a percentage of 150 and the craft drawer shows exact quantities and costs. Brush, boots, and shield artwork is original inline SVG with text labels retained.

Checks: eight Node tests pass, including trail lifetime/capacity/damage/cleansing and the complete original Intro JSON hash. The real-scene resource/UI test and focused trail/small-portrait test pass. Visually inspected the purple chase trail, PAINT meter, and all three upgrade icons at 390 x 844 and the craft drawer at 320 x 640. The focused render test injects one nearby chaser to isolate the effect; it is not claimed as a full survival playthrough. An initial test attempted Pulse beside a shrine, where the button correctly offered Restore; the test now walks away before testing Pulse.

Concurrent tasks: asset replacement and a walkable hub are being handled in their own user-requested tasks in the shared checkout. Added optional hub hooks without altering the intro dialogue. The level camera now changes on starting or resuming Level One, not on first island arrival. Final package verification will be repeated after those integrations settle; earlier ZIP verification does not cover unfinished integration.

Integrated checkpoint: after both tasks finished their changes, rebuilt `deliverables/GLORB-Survival.zip` at 12,640,819 bytes. All four browser checks passed against the actual extracted archive with external requests blocked: resource/control/crafting/replay integration; trails and small-portrait UI; the original public intro through the hub into Level One; and a full winning run using keyboard movement and public crafting/pulse controls. The archive run won in 76.9 active seconds with three shrines, 65.21% coverage, and all six upgrade purchases. The source run also passed. Asset verification confirmed only the six permitted/generated models and three synthesized WAV files are packaged, with original character/UFO/logo hashes and exact Intro unchanged. This is a playable checkpoint, not a claim that the remaining competition documentation, full source cleanup, or provenance work is complete.
