import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
spawnSync(process.execPath, [path.join(root, "scripts/build.mjs")], { stdio: "inherit" });

const staging = path.join(root, ".zip-stage");
fs.rmSync(staging, { recursive: true, force: true });
fs.mkdirSync(path.join(staging, "vendor"), { recursive: true });
fs.copyFileSync(path.join(root, "index.html"), path.join(staging, "index.html"));
fs.copyFileSync(path.join(root, "vendor/three.module.min.js"), path.join(staging, "vendor/three.module.min.js"));
fs.copyFileSync(path.join(root, "vendor/LICENSE-three.txt"), path.join(staging, "vendor/LICENSE-three.txt"));

const zipPath = path.join(root, "glorb.zip");
fs.rmSync(zipPath, { force: true });
const zipped = spawnSync("zip", ["-r", zipPath, "index.html", "vendor"], { cwd: staging, stdio: "inherit" });
if (zipped.status !== 0) throw new Error("zip failed");

const bytes = fs.statSync(zipPath).size;
const mb = bytes / (1024 * 1024);
console.log(`Wrote glorb.zip (${mb.toFixed(2)} MB)`);
if (bytes > 35 * 1024 * 1024) throw new Error("zip exceeds 35MB");
