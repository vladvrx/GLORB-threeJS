import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { exportGamePack } from "@/lib/export";
import type { StudioProject } from "@/lib/types";

export const GAME_ORIGIN = process.env.DATAB_EACH_ORIGIN || "http://127.0.0.1:43173";
const DEFAULT_ROOT = process.env.DATAB_EACH_ROOT || "/tmp/datab-each";
const APPLY_SCRIPT = path.join(process.cwd(), "scripts/apply-to-datab-each.mjs");

function run(command: string, args: string[], cwd?: string) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(command, args, { cwd, env: process.env });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(stderr.trim() || stdout.trim() || `${command} exited ${code}`));
    });
  });
}

export function gamePortOpen(port = 43173) {
  return new Promise<boolean>((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port }, () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
  });
}

export async function applyProjectToGame(project: StudioProject) {
  const root = DEFAULT_ROOT;
  const pack = exportGamePack(project);
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), "studio-pack-"));
  const packFile = path.join(temp, "pack.json");
  await fs.writeFile(packFile, JSON.stringify(pack));
  const { stdout } = await run("node", [
    APPLY_SCRIPT,
    "--root",
    root,
    "--pack",
    packFile,
    "--ensure",
    "--start",
  ]);
  let details: unknown = stdout.trim();
  try {
    details = JSON.parse(stdout);
  } catch {
    // keep raw stdout when the script prints a non-JSON warning first
  }
  return {
    gameUrl: `${GAME_ORIGIN}/three-js?applied=${Date.now()}`,
    root,
    details,
  };
}
