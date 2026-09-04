"use client";

import { Button } from "@/components/ui/button";
import { nodeById } from "@/lib/play";
import { useEditor } from "@/lib/store";

export function PlayHud() {
  const nearby = useEditor((state) => state.playNearby);
  const dialog = useEditor((state) => state.playDialog);
  const playAdvance = useEditor((state) => state.playAdvance);
  const playChoose = useEditor((state) => state.playChoose);
  const stopPlay = useEditor((state) => state.stopPlay);
  const project = useEditor((state) => state.project);

  if (!project) return null;
  const script = dialog ? project.dialogs.find((item) => item.id === dialog.scriptId) : null;
  const node = script && dialog ? nodeById(script, dialog.nodeId) : null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-teal-50">
      <div className="pointer-events-auto absolute top-3 left-3 right-3 flex items-center gap-2">
        <Button onClick={stopPlay}>Stop</Button>
        <p className="rounded-md bg-black/45 px-2 py-1 text-[11px] text-teal-100/80">
          WASD move · mouse look · Space jump · Shift sprint · E talk · Esc stop
        </p>
      </div>

      {nearby && !dialog ? (
        <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm">
          E · talk to {nearby.name}
        </p>
      ) : null}

      {node && dialog ? (
        <div className="pointer-events-auto absolute top-1/2 left-1/2 w-[min(34rem,calc(100%-1.5rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#102833]/95 p-4 shadow-2xl">
          <p className="text-[10px] tracking-[0.16em] text-teal-200/70 uppercase">{dialog.speaker}</p>
          {node.isPrompt ? (
            <div className="mt-3 grid gap-2">
              {node.choices.map((choice) => (
                <Button key={choice.id} variant="secondary" onClick={() => playChoose(choice.id)}>
                  {choice.value}
                </Button>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-2 space-y-2 text-sm leading-relaxed">
                {node.bubbles.map((bubble) => (
                  <p key={bubble}>{bubble}</p>
                ))}
              </div>
              <Button className="mt-3" onClick={playAdvance}>
                Continue
              </Button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
