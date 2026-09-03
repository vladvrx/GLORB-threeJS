#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const KEEP = new Set(["Intro", "dev"]);

function fail(message) {
  console.error(message);
  process.exit(1);
}

const dialogs = JSON.parse(fs.readFileSync(path.join(ROOT, "reference/assets/dialogs_en.json"), "utf8"));
const extra = Object.keys(dialogs).filter((id) => !KEEP.has(id));
if (extra.length) fail(`dialogs_en.json still has ${extra.join(", ")}`);
if (!dialogs.Intro) fail("dialogs_en.json is missing Intro");
if (!dialogs.dev) fail("dialogs_en.json is missing dev");

const pack = JSON.parse(fs.readFileSync(path.join(ROOT, "reference/assets/studio-game-pack.json"), "utf8"));
const packExtra = Object.keys(pack.dialogs_en ?? {}).filter((id) => !KEEP.has(id));
if (packExtra.length) fail(`studio-game-pack dialogs_en still has ${packExtra.join(", ")}`);
if (!pack.dialogs_en?.Intro || !pack.dialogs_en?.dev) fail("studio-game-pack is missing Intro or dev");

const apply = fs.readFileSync(path.join(ROOT, "scripts/apply-to-datab-each.mjs"), "utf8");
if (!apply.includes("DROPPED_DIALOG_SCRIPTS")) {
  fail("apply-to-datab-each.mjs does not drop the extra dialogue scripts");
}

console.log("ok: only Intro and dev dialogue scripts remain");
