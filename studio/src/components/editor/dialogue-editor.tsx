"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Field, NativeSelect } from "@/components/editor/fields";
import { emptyDialog, emptySpeakNode } from "@/lib/project";
import { uid } from "@/lib/ids";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { DialogNode, DialogScript } from "@/lib/types";

const EMOTES = [
  "Hello",
  "Neutral",
  "Thinking",
  "Gain",
  "Happy",
  "Sad",
  "Fear",
  "Eloquant",
  "Idle",
];

function walkPreview(script: DialogScript, nodeId: string, depth = 0): { speaker: string; text: string }[] {
  if (depth > 8) return [];
  const node = script.nodes.find((item) => item.id === nodeId);
  if (!node) return [];
  if (node.isPrompt) {
    return [
      {
        speaker: "You",
        text: node.choices.map((choice) => choice.value).join(" / ") || "…",
      },
    ];
  }
  const lines = node.bubbles.map((bubble) => ({ speaker: "NPC", text: bubble }));
  const next = node.next.find((action) => action.action === "GOTO")?.node;
  if (next) return [...lines, ...walkPreview(script, next, depth + 1)];
  return lines;
}

function updateNode(script: DialogScript, nodeId: string, recipe: (node: DialogNode) => void) {
  const node = script.nodes.find((item) => item.id === nodeId);
  if (node) recipe(node);
}

export function DialogueEditor() {
  const project = useEditor((state) => state.project);
  const updateProject = useEditor((state) => state.updateProject);
  const [scriptId, setScriptId] = useState(project?.dialogs[0]?.id ?? "");
  const [previewFrom, setPreviewFrom] = useState<string | null>(null);
  const script = project?.dialogs.find((item) => item.id === scriptId) ?? project?.dialogs[0];
  const preview = useMemo(
    () => (script ? walkPreview(script, previewFrom || script.first) : []),
    [script, previewFrom],
  );
  if (!project) return null;

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[200px_1fr_260px]">
      <div className="border-b border-white/10 lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between p-3">
          <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Scripts</p>
          <Button
            size="xs"
            onClick={() =>
              updateProject((next) => {
                const created = emptyDialog();
                next.dialogs.push(created);
                setScriptId(created.id);
              })
            }
          >
            Add
          </Button>
        </div>
        <ScrollArea className="h-[200px] lg:h-[calc(100%-44px)]">
          <ul className="p-1">
            {project.dialogs.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={cn(
                    "w-full truncate rounded-md px-2 py-2 text-left text-xs hover:bg-white/8",
                    script?.id === item.id && "bg-teal-400/15",
                  )}
                  onClick={() => {
                    setScriptId(item.id);
                    setPreviewFrom(null);
                  }}
                >
                  {item.id}
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      {script ? (
        <ScrollArea className="min-h-0">
          <div className="space-y-3 p-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Script ID">
                <Input
                  value={script.id}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.dialogs.find((item) => item.id === script.id);
                      if (current) current.id = event.target.value;
                      setScriptId(event.target.value);
                    })
                  }
                />
              </Field>
              <Field label="First node">
                <NativeSelect
                  value={script.first}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.dialogs.find((item) => item.id === script.id);
                      if (current) current.first = event.target.value;
                    })
                  }
                >
                  {script.nodes.map((node) => (
                    <option key={node.id}>{node.id}</option>
                  ))}
                </NativeSelect>
              </Field>
            </div>
            {script.nodes.map((node) => (
              <article key={node.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Input
                    className="h-7 max-w-40"
                    value={node.id}
                    onChange={(event) =>
                      updateProject((next) => {
                        const current = next.dialogs.find((item) => item.id === script.id);
                        if (!current) return;
                        const target = current.nodes.find((item) => item.id === node.id);
                        if (target) target.id = event.target.value;
                      })
                    }
                  />
                  <NativeSelect
                    className="w-28"
                    value={node.isPrompt ? "prompt" : "speak"}
                    onChange={(event) =>
                      updateProject((next) => {
                        const current = next.dialogs.find((item) => item.id === script.id);
                        if (!current) return;
                        updateNode(current, node.id, (target) => {
                          target.isPrompt = event.target.value === "prompt";
                          target.isSpeak = event.target.value !== "prompt";
                        });
                      })
                    }
                  >
                    <option value="speak">Speak</option>
                    <option value="prompt">Prompt</option>
                  </NativeSelect>
                  <Button size="xs" variant="ghost" onClick={() => setPreviewFrom(node.id)}>
                    Preview from here
                  </Button>
                  <Button
                    size="xs"
                    variant="destructive"
                    className="ml-auto"
                    onClick={() =>
                      updateProject((next) => {
                        const current = next.dialogs.find((item) => item.id === script.id);
                        if (current) current.nodes = current.nodes.filter((item) => item.id !== node.id);
                      })
                    }
                  >
                    Remove
                  </Button>
                </div>
                {node.isPrompt ? (
                  <div className="space-y-2">
                    {node.choices.map((choice, index) => (
                      <div key={choice.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                        <Input
                          value={choice.value}
                          onChange={(event) =>
                            updateProject((next) => {
                              const current = next.dialogs.find((item) => item.id === script.id);
                              if (!current) return;
                              updateNode(current, node.id, (target) => {
                                target.choices[index].value = event.target.value;
                              });
                            })
                          }
                        />
                        <Input
                          value={choice.next[0]?.node ?? ""}
                          placeholder="GOTO node"
                          onChange={(event) =>
                            updateProject((next) => {
                              const current = next.dialogs.find((item) => item.id === script.id);
                              if (!current) return;
                              updateNode(current, node.id, (target) => {
                                target.choices[index].next = event.target.value
                                  ? [{ action: "GOTO", node: event.target.value }]
                                  : [{ action: "END" }];
                              });
                            })
                          }
                        />
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() =>
                            updateProject((next) => {
                              const current = next.dialogs.find((item) => item.id === script.id);
                              if (!current) return;
                              updateNode(current, node.id, (target) => {
                                target.choices.splice(index, 1);
                              });
                            })
                          }
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() =>
                        updateProject((next) => {
                          const current = next.dialogs.find((item) => item.id === script.id);
                          if (!current) return;
                          updateNode(current, node.id, (target) => {
                            const id = uid("choice");
                            target.choices.push({
                              id,
                              value: "New choice",
                              next: [{ action: "END" }],
                            });
                          });
                        })
                      }
                    >
                      Add choice
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Textarea
                      value={node.bubbles.join("\n")}
                      onChange={(event) =>
                        updateProject((next) => {
                          const current = next.dialogs.find((item) => item.id === script.id);
                          if (!current) return;
                          updateNode(current, node.id, (target) => {
                            target.bubbles = event.target.value.split("\n");
                          });
                        })
                      }
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Emote">
                        <NativeSelect
                          value={node.before.find((item) => item.action.toUpperCase() === "EMOTE")?.opts?.[0] ?? ""}
                          onChange={(event) =>
                            updateProject((next) => {
                              const current = next.dialogs.find((item) => item.id === script.id);
                              if (!current) return;
                              updateNode(current, node.id, (target) => {
                                target.before = event.target.value
                                  ? [{ action: "EMOTE", opts: [event.target.value] }]
                                  : [];
                              });
                            })
                          }
                        >
                          <option value="">None</option>
                          {EMOTES.map((emote) => (
                            <option key={emote}>{emote}</option>
                          ))}
                        </NativeSelect>
                      </Field>
                      <Field label="Next">
                        <NativeSelect
                          value={node.next[0]?.action === "GOTO" ? node.next[0].node : node.next[0]?.action ?? "END"}
                          onChange={(event) =>
                            updateProject((next) => {
                              const current = next.dialogs.find((item) => item.id === script.id);
                              if (!current) return;
                              updateNode(current, node.id, (target) => {
                                if (event.target.value === "END" || event.target.value === "GIVE_QUEST_ITEM") {
                                  target.next = [{ action: event.target.value, opts: event.target.value === "GIVE_QUEST_ITEM" ? ["cobble"] : undefined }];
                                } else {
                                  target.next = [{ action: "GOTO", node: event.target.value }];
                                }
                              });
                            })
                          }
                        >
                          <option value="END">END</option>
                          <option value="GIVE_QUEST_ITEM">GIVE_QUEST_ITEM</option>
                          {script.nodes.map((item) => (
                            <option key={item.id} value={item.id}>
                              GOTO {item.id}
                            </option>
                          ))}
                        </NativeSelect>
                      </Field>
                    </div>
                  </div>
                )}
              </article>
            ))}
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                updateProject((next) => {
                  const current = next.dialogs.find((item) => item.id === script.id);
                  if (current) current.nodes.push(emptySpeakNode());
                })
              }
            >
              Add node
            </Button>
          </div>
        </ScrollArea>
      ) : null}
      <div className="border-t border-white/10 bg-[#071c26] p-4 lg:border-t-0 lg:border-l">
        <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Conversation preview</p>
        <div className="mt-3 space-y-2">
          {preview.map((line, index) => (
            <div
              key={`${line.text}-${index}`}
              className={cn(
                "max-w-[90%] rounded-2xl px-3 py-2 text-sm",
                line.speaker === "NPC" ? "bg-teal-300/15" : "ml-auto bg-white/10",
              )}
              dangerouslySetInnerHTML={{ __html: line.text }}
            />
          ))}
          {preview.length === 0 ? <p className="text-sm text-teal-200/50">Empty script.</p> : null}
        </div>
      </div>
    </div>
  );
}
