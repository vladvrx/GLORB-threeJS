import { NextResponse } from "next/server";
import { applyProjectToGame } from "@/lib/apply-game";
import type { StudioProject } from "@/lib/types";

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { project?: StudioProject };
    if (!body.project || body.project.format !== "datab-each-studio-v1") {
      return NextResponse.json({ error: "Send a Studio project." }, { status: 400 });
    }
    const result = await applyProjectToGame(body.project);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not apply to the game" },
      { status: 500 },
    );
  }
}
