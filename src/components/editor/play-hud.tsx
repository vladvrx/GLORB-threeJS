"use client";

import { Button } from "@/components/ui/button";
import { nodeById } from "@/lib/play";
import { useEditor } from "@/lib/store";

export function PlayHud() {
  const project = useEditor((state) => state.project);
  const nearby = useEditor((state) => state.playNearby);
  const dialog = useEditor((state) => state.playDialog);
  const hints = useEditor((state) => state.playHints);
  const playAdvance = useEditor((state) => state.playAdvance);
  const playChoose = useEditor((state) => state.playChoose);
  const playInteract = useEditor((state) => state.playInteract);
  const dismissPlayHint = useEditor((state) => state.dismissPlayHint);
  const stopPlay = useEditor((state) => state.stopPlay);

  if (!project) return null;
  const script = dialog ? project.dialogs.find((item) => item.id === dialog.scriptId) : null;
  const node = script && dialog ? nodeById(script, dialog.nodeId) : null;
  const quests = project.quests.slice(0, 4);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-teal-50">
      <div className="pointer-events-auto absolute top-3 left-3 right-3 flex items-center gap-2">
        <Button onClick={stopPlay}>Stop</Button>
        <p className="rounded-md bg-black/45 px-2 py-1 text-[11px] text-teal-100/80">
          WASD move · mouse look · Space jump · Shift sprint · E talk · Esc stop
        </p>
      </div>

      <div className="absolute top-14 right-3 w-64 max-w-[calc(100%-1.5rem)] rounded-2xl border border-white/10 bg-[#0b242f]/92 p-3 shadow-xl">
        <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Quests</p>
        <ul className="mt-2 space-y-2">
          {quests.map((quest) => (
            <li key={quest.id}>
              <p className="text-sm font-medium">{quest.title}</p>
              <p className="text-[11px] leading-snug text-teal-200/70">{quest.description.replace(/<[^>]+>/g, " ")}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-24 left-1/2 flex w-[min(28rem,calc(100%-1.5rem))] -translate-x-1/2 flex-col gap-2">
        {hints.map((hint) => (
          <button
            key={hint.id}
            type="button"
            className="pointer-events-auto rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-left"
            onClick={() => dismissPlayHint(hint.id)}
          >
            <p className="text-sm font-medium">{hint.title}</p>
            <p className="text-[12px] text-teal-200/75">{hint.description}</p>
          </button>
        ))}
      </div>

      {node && dialog ? (
        <div className="pointer-events-auto absolute bottom-6 left-1/2 w-[min(34rem,calc(100%-1.5rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#102833]/95 p-4 shadow-2xl">
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
      ) : nearby?.scriptId ? (
        <button
          type="button"
          className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-teal-200/30 bg-black/65 px-4 py-2 text-sm"
          onClick={playInteract}
        >
          {nearby.scriptId ? `E · Talk with ${nearby.name}` : nearby.name}
        </button>
      ) : null}
    </div>
  );
}
