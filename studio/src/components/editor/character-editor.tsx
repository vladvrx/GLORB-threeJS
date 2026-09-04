"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Field, NativeSelect } from "@/components/editor/fields";
import { emptyNpc } from "@/lib/project";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";

const SCRIPTS = ["TalkingCitizen", "PassiveCitizen", "Intro"];

function colorFor(gradientID: number) {
  const hue = (gradientID * 37) % 360;
  return `hsl(${hue} 70% 58%)`;
}

export function CharacterEditor() {
  const project = useEditor((state) => state.project);
  const updateProject = useEditor((state) => state.updateProject);
  const addActor = useEditor((state) => state.addActor);
  const [selectedId, setSelectedId] = useState(project?.characters[0]?.id ?? "");
  if (!project) return null;
  const npc = project.characters.find((item) => item.id === selectedId) ?? project.characters[0];

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[240px_1fr]">
      <div className="border-b border-white/10 md:border-r md:border-b-0">
        <div className="flex items-center justify-between p-3">
          <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Characters</p>
          <Button
            size="xs"
            onClick={() =>
              updateProject((next) => {
                const created = emptyNpc();
                next.characters.push(created);
                setSelectedId(created.id);
              })
            }
          >
            Add
          </Button>
        </div>
        <ScrollArea className="h-[240px] md:h-[calc(100%-44px)]">
          <ul className="p-1">
            {project.characters.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs hover:bg-white/8",
                    npc?.id === item.id && "bg-teal-400/15",
                  )}
                >
                  <span
                    className="size-6 rounded-full border border-white/20"
                    style={{ background: colorFor(item.gradientID) }}
                  />
                  <span className="min-w-0 flex-1 truncate">{item.id}</span>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      {npc ? (
        <ScrollArea className="min-h-0">
          <div className="grid gap-3 p-4 md:grid-cols-[220px_1fr]">
            <div className="rounded-3xl border border-white/10 bg-[#102833] p-4 text-center">
              <div
                className="mx-auto grid size-28 place-items-center rounded-full border-4 border-white/20 text-3xl"
                style={{ background: colorFor(npc.gradientID) }}
              >
                {npc.face === 0 ? "♂" : "♀"}
              </div>
              <p className="mt-3 font-semibold">{npc.id}</p>
              <p className="text-xs text-teal-200/60">{npc.script}</p>
            </div>
            <div className="grid gap-3">
              <Field label="ID">
                <Input
                  value={npc.id}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.characters.find((item) => item.id === npc.id);
                      if (current) current.id = event.target.value;
                      setSelectedId(event.target.value);
                    })
                  }
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Gradient ID">
                  <Input
                    type="number"
                    value={npc.gradientID}
                    onChange={(event) =>
                      updateProject((next) => {
                        const current = next.characters.find((item) => item.id === npc.id);
                        if (current) current.gradientID = Number(event.target.value) || 0;
                      })
                    }
                  />
                </Field>
                <Field label="Face">
                  <NativeSelect
                    value={String(npc.face)}
                    onChange={(event) =>
                      updateProject((next) => {
                        const current = next.characters.find((item) => item.id === npc.id);
                        if (current) current.face = Number(event.target.value);
                      })
                    }
                  >
                    <option value="0">Face 0</option>
                    <option value="1">Face 1</option>
                  </NativeSelect>
                </Field>
              </div>
              <Field label="Script">
                <NativeSelect
                  value={npc.script}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.characters.find((item) => item.id === npc.id);
                      if (current) current.script = event.target.value;
                    })
                  }
                >
                  {SCRIPTS.concat(npc.script).filter((item, index, list) => list.indexOf(item) === index).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="Script args (JSON)">
                <Input
                  value={JSON.stringify(npc.scriptArgs)}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.characters.find((item) => item.id === npc.id);
                      if (!current) return;
                      try {
                        current.scriptArgs = JSON.parse(event.target.value) as Record<string, string>;
                      } catch {
                        // keep typing
                      }
                    })
                  }
                />
              </Field>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => addActor("NPC", npc.id)}>
                  Place in scene
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    updateProject((next) => {
                      next.characters = next.characters.filter((item) => item.id !== npc.id);
                    })
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      ) : (
        <p className="p-4 text-sm text-teal-200/60">Add a character to start.</p>
      )}
    </div>
  );
}
