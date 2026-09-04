# Asset replacement

The shipping build uses four generated scenery models and synthesized music,
ambience, and sound effects from `scripts/generate-original-assets.mjs`.
The original character, BoatYellow UFO, and GLORB logo match `origin/main`
byte for byte. The complete Intro dialogue object also matches that revision.

Original replaced files remain in the source checkout for recovery. The build
filters them out of the ZIP, including the unused taxi and joystick models.
Currency descriptions were removed from site data, and currency reward rows
were removed from the recovered notification renderers.

The generated meshes include indices required by the recovered geometry merger.
Scene preparation now reports failures rather than silently continuing, and
the scene cache serializer accepts null collider values.

Validation:

- `node scripts/verify-assets.mjs deliverables/verified-survival-D7foks`
- `node scripts/verify-package.mjs -g 'resources, controls|public boat intro' --output test-results-assets-final`
- Both browser checks passed on the extracted ZIP with external requests blocked.
- Asset audit: six GLBs, three WAVs, preserved asset hashes, exact Intro object,
  non-silent audio below clipping, and no old currency labels in site data.

Audio levels were checked numerically. Listening quality has not been assessed.
The UI and HUB tasks continue separately in the same checkout; this verification
applies to the ZIP produced during the asset replacement task.
