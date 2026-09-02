"use client";

import { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";

const KIND_LABEL = {
  prop: "Prop",
  actor: "Actor",
  point: "Point",
  area: "Area",
};

export function Outliner() {
  const project = useEditor((state) => state.project);
  const selectedId = useEditor((state) => state.selectedId);
  const search = useEditor((state) => state.search);
  const select = useEditor((state) => state.select);
  const setSearch = useEditor((state) => state.setSearch);

  const objects = useMemo(
    () => project?.scenes[project.activeSceneId]?.objects ?? [],
    [project],
  );
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return objects.filter((object) => {
      if (!query) return true;
      return (
        object.name.toLowerCase().includes(query) ||
        object.asset.toLowerCase().includes(query) ||
        object.kind.includes(query) ||
        (object.actorType ?? "").toLowerCase().includes(query)
      );
    });
  }, [objects, search]);

  const counts = objects.reduce<Record<string, number>>((acc, object) => {
    acc[object.kind] = (acc[object.kind] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-white/10 p-3">
        <p className="mb-2 text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">
          Outliner
        </p>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Filter objects"
        />
        <p className="mt-2 text-[11px] text-teal-200/55">
          {counts.prop ?? 0} props · {counts.actor ?? 0} actors · {counts.point ?? 0} points
        </p>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <ul className="p-1">
          {filtered.map((object) => (
            <li key={object.id}>
              <button
                type="button"
                onClick={() => select(object.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs hover:bg-white/8",
                  selectedId === object.id && "bg-teal-400/15 text-teal-50",
                )}
              >
                <span
                  className={cn(
                    "w-10 shrink-0 text-[10px] tracking-wide uppercase",
                    object.kind === "prop" && "text-sky-300",
                    object.kind === "actor" && "text-pink-300",
                    object.kind === "point" && "text-teal-300",
                    object.kind === "area" && "text-amber-300",
                  )}
                >
                  {KIND_LABEL[object.kind]}
                </span>
                <span className="min-w-0 flex-1 truncate">{object.name}</span>
                {object.asset ? (
                  <span className="max-w-[40%] truncate text-[10px] text-teal-200/45">
                    {object.asset}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
