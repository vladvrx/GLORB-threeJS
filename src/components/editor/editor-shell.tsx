"use client";

import { useEffect } from "react";
import { EditorToolbar } from "@/components/editor/toolbar";
import { EditorViewport } from "@/components/editor/viewport";
import { Outliner } from "@/components/editor/outliner";
import { Inspector } from "@/components/editor/inspector";
import { AssetBrowser } from "@/components/editor/asset-browser";
import { QuestEditor } from "@/components/editor/quest-editor";
import { DialogueEditor } from "@/components/editor/dialogue-editor";
import { CharacterEditor } from "@/components/editor/character-editor";
import { NotificationEditor } from "@/components/editor/notification-editor";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { EditorTab } from "@/lib/types";

const TABS: { id: EditorTab; label: string }[] = [
  { id: "world", label: "World" },
  { id: "quests", label: "Quests" },
  { id: "dialogue", label: "Dialogue" },
  { id: "characters", label: "Characters" },
  { id: "notifications", label: "Notifications" },
];

export function EditorShell() {
  const status = useEditor((state) => state.status);
  const error = useEditor((state) => state.error);
  const load = useEditor((state) => state.load);
  const tab = useEditor((state) => state.tab);
  const setTab = useEditor((state) => state.setTab);
  const persist = useEditor((state) => state.persist);
  const dirty = useEditor((state) => state.dirty);
  const showGrid = useEditor((state) => state.showGrid);
  const setShowGrid = useEditor((state) => state.setShowGrid);
  const showTerrain = useEditor((state) => state.showTerrain);
  const setShowTerrain = useEditor((state) => state.setShowTerrain);
  const showWater = useEditor((state) => state.showWater);
  const setShowWater = useEditor((state) => state.setShowWater);
  const layerProps = useEditor((state) => state.layerProps);
  const layerActors = useEditor((state) => state.layerActors);
  const layerHelpers = useEditor((state) => state.layerHelpers);
  const setLayer = useEditor((state) => state.setLayer);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!dirty) return;
    const timer = window.setTimeout(() => persist(), 2500);
    return () => window.clearTimeout(timer);
  }, [dirty, persist]);

  if (status === "loading") {
    return (
      <div className="grid h-dvh place-items-center bg-[#061821] px-6 text-center text-teal-50">
        <div>
          <p className="text-lg font-semibold">Loading the island pack…</p>
          <p className="mt-2 text-sm text-teal-200/70">Reading scenes, quests, and dialogue from the game data.</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="grid h-dvh place-items-center bg-[#061821] p-6 text-center text-teal-50">
        <div>
          <p className="text-lg font-semibold">Could not load the island pack.</p>
          <p className="mt-2 text-sm text-teal-200/70">{error}</p>
          <Button className="mt-4" onClick={() => void load()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col bg-[#061821] text-teal-50">
      <EditorToolbar />
      <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 px-2 py-1">
        {TABS.map((item) => (
          <Button
            key={item.id}
            size="sm"
            variant={tab === item.id ? "secondary" : "ghost"}
            className={cn(tab === item.id && "bg-teal-400/20")}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </Button>
        ))}
        {tab === "world" ? (
          <div className="ml-auto hidden items-center gap-2 text-[11px] text-teal-200/70 lg:flex">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} />
              Grid
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={showTerrain} onChange={(event) => setShowTerrain(event.target.checked)} />
              Terrain
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={showWater} onChange={(event) => setShowWater(event.target.checked)} />
              Water
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={layerProps}
                onChange={(event) => setLayer("layerProps", event.target.checked)}
              />
              Props
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={layerActors}
                onChange={(event) => setLayer("layerActors", event.target.checked)}
              />
              Actors
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={layerHelpers}
                onChange={(event) => setLayer("layerHelpers", event.target.checked)}
              />
              Helpers
            </label>
          </div>
        ) : null}
      </div>
      <div className={cn("min-h-0 flex-1", tab === "world" ? "flex flex-col lg:flex-row" : "hidden")}>
          <aside className="flex max-h-[40vh] w-full min-h-0 flex-col border-b border-white/10 lg:max-h-none lg:w-72 lg:border-r lg:border-b-0">
            <div className="min-h-0 flex-1">
              <Outliner />
            </div>
            <div className="h-56 min-h-0 lg:h-64">
              <AssetBrowser />
            </div>
          </aside>
          <EditorViewport />
          <aside className="max-h-[46vh] w-full overflow-y-auto border-t border-white/10 lg:max-h-none lg:w-80 lg:border-t-0 lg:border-l">
            <Inspector />
          </aside>
        </div>
      {tab === "quests" ? <QuestEditor /> : null}
      {tab === "dialogue" ? <DialogueEditor /> : null}
      {tab === "characters" ? <CharacterEditor /> : null}
      {tab === "notifications" ? <NotificationEditor /> : null}
    </div>
  );
}
