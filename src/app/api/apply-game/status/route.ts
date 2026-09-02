import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { GAME_ORIGIN, gamePortOpen } from "@/lib/apply-game";

export async function GET() {
  const root = process.env.DATAB_EACH_ROOT || "/tmp/datab-each";
  const ready = await gamePortOpen(43173);
  return NextResponse.json({
    gameUrl: GAME_ORIGIN,
    root,
    cloned: fs.existsSync(path.join(root, "reference", "assets")),
    patched: fs.existsSync(path.join(root, "reference", "assets", "studio-bridge.js")),
    ready,
  });
}
