#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { applyPack, packFromUnknown } from "./apply-to-datab-each.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};

const inputPath =
  value("--pack") ||
  value("--project") ||
  args.find((item) => item.endsWith(".json") && !item.startsWith("--"));
const root = value("--root") || ROOT;

if (!inputPath) {
  console.error("Usage: node scripts/apply-studio-locales.mjs <studio-project-or-pack.json> [--root DIR] [--keep-scenes]");
  process.exit(1);
}
if (!fs.existsSync(inputPath)) {
  console.error(`Studio project/pack not found: ${inputPath}`);
  process.exit(1);
}

const pack = packFromUnknown(JSON.parse(fs.readFileSync(inputPath, "utf8")));
if (flag("--keep-scenes")) {
  const currentPack = path.join(root, "reference", "assets", "studio-game-pack.json");
  if (fs.existsSync(currentPack)) {
    pack.scenes = JSON.parse(fs.readFileSync(currentPack, "utf8")).scenes ?? pack.scenes;
  }
}

const result = applyPack(root, pack);
console.log(JSON.stringify(result, null, 2));
