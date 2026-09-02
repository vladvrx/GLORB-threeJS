"use client";

import { useState } from "react";
import {
  BoxSelect,
  Download,
  Focus,
  FolderOpen,
  Move3d,
  Play,
  Redo2,
  RotateCcw,
  RotateCw,
  Save,
  Scaling,
  Square,
  Trash2,
  Undo2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { ToolMode } from "@/lib/types";

const tools: { id: ToolMode; label: string; shortcut: string; icon: typeof Move3d }[] = [
  { id: "select", label: "Select", shortcut: "Q", icon: BoxSelect },
  { id: "translate", label: "Move", shortcut: "W", icon: Move3d },
  { id: "rotate", label: "Rotate", shortcut: "E", icon: RotateCw },
  { id: "scale", label: "Scale", shortcut: "R", icon: Scaling },
];

export function EditorToolbar() {
  const project = useEditor((state) => state.project);
  const tool = useEditor((state) => state.tool);
  const setTool = useEditor((state) => state.setTool);
  const snap = useEditor((state) => state.snap);
  const setSnap = useEditor((state) => state.setSnap);
  const dirty = useEditor((state) => state.dirty);
  const persist = useEditor((state) => state.persist);
  const undo = useEditor((state) => state.undo);
  const redo = useEditor((state) => state.redo);
  const switchScene = useEditor((state) => state.switchScene);
  const deleteSelected = useEditor((state) => state.deleteSelected);
  const requestFocus = useEditor((state) => state.requestFocus);
  const exportStudio = useEditor((state) => state.exportStudio);
  const exportGamePack = useEditor((state) => state.exportGamePack);
  const applyToGame = useEditor((state) => state.applyToGame);
  const importStudio = useEditor((state) => state.importStudio);
  const resetToBundle = useEditor((state) => state.resetToBundle);
  const playing = useEditor((state) => state.playing);
  const startPlay = useEditor((state) => state.startPlay);
  const stopPlay = useEditor((state) => state.stopPlay);
  const [applying, setApplying] = useState(false);

  if (!project) return null;

  return (
    <header className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-[#061821] px-3 py-2">
      <div className="mr-2 min-w-0">
        <p className="truncate text-sm font-semibold tracking-tight text-teal-50">Data B-each Studio</p>
        <p className="text-[11px] text-teal-200/60">Z-up island editor · no AI required</p>
      </div>
      <select
        className="h-8 rounded-lg border border-white/10 bg-white/5 px-2 text-sm"
        value={project.activeSceneId}
        onChange={(event) => switchScene(event.target.value)}
      >
        {Object.values(project.scenes).map((scene) => (
          <option key={scene.id} value={scene.id}>
            {scene.name}
          </option>
        ))}
      </select>
      <div className="flex items-center rounded-lg bg-white/5 p-0.5">
        {tools.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              size="sm"
              variant={tool === item.id ? "secondary" : "ghost"}
              className={cn("gap-1", tool === item.id && "bg-teal-400/20 text-teal-50")}
              onClick={() => setTool(item.id)}
              title={`${item.label} (${item.shortcut})`}
            >
              <Icon className="size-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          );
        })}
      </div>
      <Button size="sm" variant={snap ? "secondary" : "ghost"} onClick={() => setSnap(!snap)}>
        Snap {snap ? "on" : "off"}
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={undo} title="Undo">
        <Undo2 />
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={redo} title="Redo">
        <Redo2 />
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={requestFocus} title="Focus selected (F)">
        <Focus />
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={deleteSelected} title="Delete">
        <Trash2 />
      </Button>
      <Button
        size="sm"
        className="bg-teal-400 text-[#062029] hover:bg-teal-300"
        onClick={() => (playing ? stopPlay() : startPlay())}
      >
        {playing ? <Square className="size-3.5" /> : <Play className="size-3.5" />}
        {playing ? "Stop" : "Start"}
      </Button>
      <div className="ml-auto flex flex-wrap items-center gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            persist();
            toast.success("Saved in this browser");
          }}
        >
          <Save className="size-3.5" />
          {dirty ? "Save" : "Saved"}
        </Button>
        <Button size="sm" variant="ghost" onClick={exportStudio}>
          <Download className="size-3.5" />
          Studio
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            exportGamePack();
            toast.success("Downloaded DATAB-EACH JSON pack");
          }}
        >
          <Download className="size-3.5" />
          Game pack
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="bg-teal-400/20"
          disabled={applying}
          onClick={async () => {
            setApplying(true);
            try {
              const result = await applyToGame();
              toast.success("Applied map, quests, and dialogue — opening a fresh game tab");
              window.open(result.gameUrl, "_blank", "noopener,noreferrer");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Apply failed");
            } finally {
              setApplying(false);
            }
          }}
        >
          <Upload className="size-3.5" />
          {applying ? "Applying…" : "Apply to game"}
        </Button>
        <label className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg px-2 text-sm hover:bg-white/10">
          <FolderOpen className="size-3.5" />
          Project
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (!file) return;
              try {
                await importStudio(file);
                toast.success("Project imported");
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Import failed");
              }
            }}
          />
        </label>
        <Button
          size="sm"
          variant="ghost"
          onClick={async () => {
            await resetToBundle();
            toast.message("Restored original Cove Island");
          }}
        >
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>
    </header>
  );
}
