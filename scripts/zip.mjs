#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const STAGE = fs.mkdtempSync(path.join(os.tmpdir(), "glorb-zip-"));
const OUT = path.join(ROOT, "glorb.zip");
const LIMIT = 35 * 1024 * 1024;

function copy(from, to) {
  fs.cpSync(from, to, {
    recursive: true,
    filter: (source) => {
      const base = path.basename(source);
      if (base.endsWith(".map")) return false;
      if (base === ".DS_Store") return false;
      return true;
    },
  });
}

fs.mkdirSync(path.join(STAGE, "vendor"), { recursive: true });
fs.copyFileSync(path.join(ROOT, "index.html"), path.join(STAGE, "index.html"));
fs.copyFileSync(
  path.join(ROOT, "vendor", "vendor.75f6e6ae65453426.js"),
  path.join(STAGE, "vendor", "vendor.75f6e6ae65453426.js"),
);
fs.copyFileSync(
  path.join(ROOT, "vendor", "webgl.3250e36a65453426.js"),
  path.join(STAGE, "vendor", "webgl.3250e36a65453426.js"),
);
copy(path.join(ROOT, "three-js"), path.join(STAGE, "three-js"));
copy(path.join(ROOT, "reference"), path.join(STAGE, "reference"));
copy(path.join(ROOT, "direct-port"), path.join(STAGE, "direct-port"));

const zip = spawnSync("zip", ["-r", "-q", OUT, "."], { cwd: STAGE, stdio: "inherit" });
fs.rmSync(STAGE, { recursive: true, force: true });
if (zip.status !== 0) {
  console.error("zip failed");
  process.exit(zip.status ?? 1);
}

const size = fs.statSync(OUT).size;
console.log(`glorb.zip ${(size / (1024 * 1024)).toFixed(2)} MB`);
if (size > LIMIT) {
  console.error(`zip is over 35MB (${size} bytes)`);
  process.exit(1);
}
