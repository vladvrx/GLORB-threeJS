"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Field, NativeSelect } from "@/components/editor/fields";
import { uid } from "@/lib/ids";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { NotificationItem } from "@/lib/types";

const TYPES: NotificationItem["type"][] = [
  "hint",
  "mainQuest",
  "quest",
  "progress",
  "coastalPoints",
  "custom",
];

export function NotificationEditor() {
  const project = useEditor((state) => state.project);
  const updateProject = useEditor((state) => state.updateProject);
  const [selectedId, setSelectedId] = useState(project?.notifications[0]?.id ?? "");
  if (!project) return null;
  const item = project.notifications.find((entry) => entry.id === selectedId) ?? project.notifications[0];

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[220px_1fr_280px]">
      <div className="border-b border-white/10 md:border-r md:border-b-0">
        <div className="flex items-center justify-between p-3">
          <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Notifications</p>
          <Button
            size="xs"
            onClick={() =>
              updateProject((next) => {
                const created: NotificationItem = {
                  id: uid("notif"),
                  type: "custom",
                  title: "New ping",
                  description: "Write the copy players will see.",
                  delayMs: 4000,
                };
                next.notifications.push(created);
                setSelectedId(created.id);
              })
            }
          >
            Add
          </Button>
        </div>
        <ScrollArea className="h-[220px] md:h-[calc(100%-44px)]">
          <ul className="p-1">
            {project.notifications.map((entry) => (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(entry.id)}
                  className={cn(
                    "w-full rounded-md px-2 py-2 text-left text-xs hover:bg-white/8",
                    item?.id === entry.id && "bg-teal-400/15",
                  )}
                >
                  <span className="block font-medium">{entry.title || entry.id}</span>
                  <span className="text-[10px] text-teal-200/50">{entry.type}</span>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      {item ? (
        <ScrollArea className="min-h-0">
          <div className="grid gap-3 p-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="ID">
                <Input
                  value={item.id}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.notifications.find((entry) => entry.id === item.id);
                      if (current) current.id = event.target.value;
                      setSelectedId(event.target.value);
                    })
                  }
                />
              </Field>
              <Field label="Type">
                <NativeSelect
                  value={item.type}
                  onChange={(event) =>
                    updateProject((next) => {
                      const current = next.notifications.find((entry) => entry.id === item.id);
                      if (current) current.type = event.target.value as NotificationItem["type"];
                    })
                  }
                >
                  {TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </NativeSelect>
              </Field>
            </div>
            <Field label="Title">
              <Input
                value={item.title}
                onChange={(event) =>
                  updateProject((next) => {
                    const current = next.notifications.find((entry) => entry.id === item.id);
                    if (current) current.title = event.target.value;
                  })
                }
              />
            </Field>
            <Field label="Description">
              <Textarea
                value={item.description}
                onChange={(event) =>
                  updateProject((next) => {
                    const current = next.notifications.find((entry) => entry.id === item.id);
                    if (current) current.description = event.target.value;
                  })
                }
              />
            </Field>
            <Field label="Delay (ms)">
              <Input
                type="number"
                value={item.delayMs ?? 0}
                onChange={(event) =>
                  updateProject((next) => {
                    const current = next.notifications.find((entry) => entry.id === item.id);
                    if (current) current.delayMs = Number(event.target.value) || 0;
                  })
                }
              />
            </Field>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() =>
                  toast(item.title || "Notification", {
                    description: item.description.replace(/<[^>]+>/g, " "),
                    duration: item.delayMs || 4000,
                  })
                }
              >
                Play toast
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() =>
                  updateProject((next) => {
                    next.notifications = next.notifications.filter((entry) => entry.id !== item.id);
                  })
                }
              >
                Delete
              </Button>
            </div>
          </div>
        </ScrollArea>
      ) : (
        <p className="p-4 text-sm text-teal-200/60">Add a notification.</p>
      )}
      {item ? (
        <div className="border-t border-white/10 bg-[#071c26] p-4 md:border-t-0 md:border-l">
          <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Overlay preview</p>
          <div className="mt-4 rounded-2xl border border-teal-200/20 bg-[#12313c] p-4 shadow-2xl">
            <p className="text-[10px] tracking-[0.2em] text-amber-200 uppercase">{item.type}</p>
            <h3 className="mt-1 text-lg font-semibold">{item.title || "Untitled"}</h3>
            <p
              className="mt-2 text-sm leading-relaxed text-teal-50/80"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
