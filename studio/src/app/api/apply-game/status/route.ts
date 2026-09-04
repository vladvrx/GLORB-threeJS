import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { GAME_ORIGIN, GAME_PORT, gamePortOpen } from "@/lib/apply-game";

export async function GET() {
  const root = process.env.DATAB_EACH_ROOT || "/workspace";
  const ready = await gamePortOpen(GAME_PORT);
  return NextResponse.json({
    gameUrl: `${GAME_ORIGIN}/three-js`,
    root,
    cloned: fs.existsSync(path.join(root, "reference", "assets")),
    patched: fs.existsSync(path.join(root, "reference", "assets", "studio-bridge.js")),
    ready,
  });
}
