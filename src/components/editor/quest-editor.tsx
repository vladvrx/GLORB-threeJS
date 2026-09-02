"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Field, NativeSelect } from "@/components/editor/fields";
import { emptyQuest } from "@/lib/project";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function QuestEditor() {
  const project = useEditor((state) => state.project);
  const updateProject = useEditor((state) => state.updateProject);
  const [selectedId, setSelectedId] = useState(project?.quests[0]?.id ?? "");
  if (!project) return null;
  const quest = project.quests.find((item) => item.id === selectedId) ?? project.quests[0];

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[220px_1fr_280px]">
      <div className="border-b border-white/10 md:border-r md:border-b-0">
        <div className="flex items-center justify-between p-3">
          <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Quests</p>
          <Button
            size="xs"
            onClick={() =>
              updateProject((next) => {
                const created = emptyQuest();
                next.quests.push(created);
                setSelectedId(created.id);
              })
            }
          >
            Add
          </Button>
        </div>
        <ScrollArea className="h-[240px] md:h-[calc(100%-44px)]">
          <ul className="p-1">
            {project.quests.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "w-full rounded-md px-2 py-2 text-left text-xs hover:bg-white/8",
                    quest?.id === item.id && "bg-teal-400/15",
                  )}
                >
                  <span className="block font-medium">{item.title}</span>
                  <span className="text-[10px] text-teal-200/50">
                    {item.type} · {item.reward} pts
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      {quest ? (
        <ScrollArea className="min-h-0">
          <div className="grid gap-3 p-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="ID">
                <Input
                  value={quest.id}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.quests.find((item) => item.id === quest.id);
                      if (current) current.id = event.target.value;
                      setSelectedId(event.target.value);
                    })
                  }
                />
              </Field>
              <Field label="Type">
                <NativeSelect
                  value={quest.type}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.quests.find((item) => item.id === quest.id);
                      if (current) current.type = event.target.value;
                    })
                  }
                >
                  <option>Fintech</option>
                  <option>Side</option>
                  <option>Main</option>
                  <option>Hidden</option>
                </NativeSelect>
              </Field>
            </div>
            <Field label="Title">
              <Input
                value={quest.title}
                onChange={(event) =>
                  updateProject((next) => {
                    const current = next.quests.find((item) => item.id === quest.id);
                    if (current) current.title = event.target.value;
                  })
                }
              />
            </Field>
            <Field label="Description (HTML ok)">
              <Textarea
                value={quest.description}
                onChange={(event) =>
                  updateProject((next) => {
                    const current = next.quests.find((item) => item.id === quest.id);
                    if (current) current.description = event.target.value;
                  })
                }
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Icon">
                <Input
                  value={quest.icon}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.quests.find((item) => item.id === quest.id);
                      if (current) current.icon = event.target.value;
                    })
                  }
                />
              </Field>
              <Field label="Item">
                <Input
                  value={quest.item ?? ""}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.quests.find((item) => item.id === quest.id);
                      if (current) current.item = event.target.value || null;
                    })
                  }
                />
              </Field>
              <Field label="Company ID">
                <Input
                  value={quest.fintechID ?? ""}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.quests.find((item) => item.id === quest.id);
                      if (current) current.fintechID = event.target.value || null;
                    })
                  }
                />
              </Field>
              <Field label="Reward points">
                <Input
                  type="number"
                  value={quest.reward}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.quests.find((item) => item.id === quest.id);
                      if (current) current.reward = Number(event.target.value) || 0;
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Unlock text">
              <Input
                value={quest.unlockText ?? ""}
                onChange={(event) =>
                  updateProject((next) => {
                    const current = next.quests.find((item) => item.id === quest.id);
                    if (current) current.unlockText = event.target.value || null;
                  })
                }
              />
            </Field>
            <Field label="Unlock condition">
              <Input
                value={quest.unlockCondition}
                onChange={(event) =>
                  updateProject((next) => {
                    const current = next.quests.find((item) => item.id === quest.id);
                    if (current) current.unlockCondition = event.target.value;
                  })
                }
              />
            </Field>
            <Field label="Reward text">
              <Textarea
                value={quest.rewardText}
                onChange={(event) =>
                  updateProject((next) => {
                    const current = next.quests.find((item) => item.id === quest.id);
                    if (current) current.rewardText = event.target.value;
                  })
                }
              />
            </Field>
            <Field label="Reward condition">
              <Input
                value={quest.rewardCondition}
                onChange={(event) =>
                  updateProject((next) => {
                    const current = next.quests.find((item) => item.id === quest.id);
                    if (current) current.rewardCondition = event.target.value;
                  })
                }
              />
            </Field>
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                updateProject((next) => {
                  next.quests = next.quests.filter((item) => item.id !== quest.id);
                })
              }
            >
              Delete quest
            </Button>
          </div>
        </ScrollArea>
      ) : (
        <p className="p-4 text-sm text-teal-200/60">Add a quest to start.</p>
      )}
      {quest ? (
        <div className="border-t border-white/10 bg-[#071c26] p-4 md:border-t-0 md:border-l">
          <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Phone preview</p>
          <div className="mt-3 rounded-[28px] border border-white/10 bg-[#102833] p-4 shadow-xl">
            <p className="text-[10px] tracking-widest text-teal-200/50 uppercase">Quests</p>
            <div className="mt-3 rounded-2xl bg-teal-300/10 p-3">
              <p className="text-[11px] text-pink-200">{quest.type}</p>
              <h3 className="text-base font-semibold">{quest.title}</h3>
              <p
                className="mt-2 text-sm leading-relaxed text-teal-50/80"
                dangerouslySetInnerHTML={{ __html: quest.description }}
              />
              <p className="mt-3 text-xs text-amber-200">{quest.reward} Data B-each Points</p>
            </div>
            {quest.unlockText ? (
              <p className="mt-3 text-xs text-teal-200/60">Locked: {quest.unlockText}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
