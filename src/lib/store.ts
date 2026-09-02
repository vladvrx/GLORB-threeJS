import { create } from "zustand";
import { ACTOR_ASSETS, cloneObject, newProp, projectFromBundle } from "@/lib/project";
import { identityTransform, worldPosToGame } from "@/lib/coords";
import { exportGamePack } from "@/lib/export";
import { assetFromStored, deleteStoredMesh, importMeshFiles, loadStoredMeshes } from "@/lib/custom-assets";
import {
  advanceDialog,
  chooseDialog,
  nodeById,
  resolveActorDialog,
  startDialog,
  type PlayDialogState,
  type PlayNearby,
} from "@/lib/play";
import type {
  AssetInfo,
  EditorObject,
  EditorTab,
  NotificationItem,
  StudioBundle,
  StudioProject,
  ToolMode,
} from "@/lib/types";

const SAVE_KEY = "datab-each-studio-project";

type EditorState = {
  status: "loading" | "ready" | "error";
  error: string | null;
  catalog: AssetInfo[];
  actorTypes: string[];
  project: StudioProject | null;
  selectedId: string | null;
  tool: ToolMode;
  tab: EditorTab;
  snap: boolean;
  snapSize: number;
  showGrid: boolean;
  showTerrain: boolean;
  showWater: boolean;
  layerProps: boolean;
  layerActors: boolean;
  layerHelpers: boolean;
  search: string;
  assetFilter: string;
  dirty: boolean;
  past: string[];
  future: string[];
  load: () => Promise<void>;
  setTab: (tab: EditorTab) => void;
  setTool: (tool: ToolMode) => void;
  select: (id: string | null) => void;
  setSearch: (value: string) => void;
  setAssetFilter: (value: string) => void;
  setSnap: (value: boolean) => void;
  setShowGrid: (value: boolean) => void;
  setShowTerrain: (value: boolean) => void;
  setShowWater: (value: boolean) => void;
  setLayer: (layer: "layerProps" | "layerActors" | "layerHelpers", value: boolean) => void;
  switchScene: (id: string) => void;
  updateObject: (id: string, patch: Partial<EditorObject>, record?: boolean) => void;
  setTransformFromWorld: (id: string, world: { x: number; y: number; z: number }) => void;
  commitTransform: (id: string, transform: EditorObject["transform"]) => void;
  addAsset: (asset: string, worldHint?: { x: number; y: number; z: number }) => string;
  addActor: (actorType: string, npcId?: string) => string;
  duplicateSelected: () => void;
  deleteSelected: () => void;
  undo: () => void;
  redo: () => void;
  updateProject: (recipe: (project: StudioProject) => void) => void;
  persist: () => void;
  exportStudio: () => void;
  exportGamePack: () => void;
  importStudio: (file: File) => Promise<void>;
  resetToBundle: () => Promise<void>;
  applyToGame: () => Promise<{ gameUrl: string }>;
  importMeshes: (files: File[]) => Promise<AssetInfo[]>;
  removeImportedAsset: (id: string) => Promise<void>;
  playing: boolean;
  playNearby: PlayNearby | null;
  playDialog: PlayDialogState | null;
  playHints: NotificationItem[];
  startPlay: () => void;
  stopPlay: () => void;
  setPlayNearby: (nearby: PlayNearby | null) => void;
  playInteract: () => void;
  playAdvance: () => void;
  playChoose: (choiceId: string) => void;
  closePlayDialog: () => void;
  dismissPlayHint: (id: string) => void;
};

let bundleCache: StudioBundle | null = null;
let playTimers: number[] = [];

function clearPlayTimers() {
  for (const timer of playTimers) window.clearTimeout(timer);
  playTimers = [];
}

function snapshot(project: StudioProject) {
  return JSON.stringify(project);
}

function download(filename: string, text: string, type = "application/json") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export const useEditor = create<EditorState>((set, get) => {
  const pushHistory = () => {
    const { project, past } = get();
    if (!project) return;
    const nextPast = [...past, snapshot(project)].slice(-40);
    set({ past: nextPast, future: [], dirty: true });
  };

  return {
    status: "loading",
    error: null,
    catalog: [],
    actorTypes: [],
    project: null,
    selectedId: null,
    tool: "translate",
    tab: "world",
    snap: false,
    snapSize: 0.5,
    showGrid: true,
    showTerrain: true,
    showWater: true,
    layerProps: true,
    layerActors: true,
    layerHelpers: true,
    search: "",
    assetFilter: "all",
    dirty: false,
    past: [],
    future: [],
    playing: false,
    playNearby: null,
    playDialog: null,
    playHints: [],
    async load() {
      set({ status: "loading", error: null });
      try {
        const response = await fetch("/game/data/bundle.json", {
          cache: "no-store",
          signal: AbortSignal.timeout(20000),
        });
        if (!response.ok) throw new Error(`Could not load game bundle (${response.status})`);
        const bundle = (await response.json()) as StudioBundle;
        bundleCache = bundle;
        let project = projectFromBundle(bundle);
        const saved = localStorage.getItem(SAVE_KEY);
        if (saved) {
          try {
            const parsed = JSON.parse(saved) as StudioProject;
            if (parsed.format === "datab-each-studio-v1" && parsed.scenes) {
              project = parsed;
            }
          } catch {
            // keep shipped island
          }
        }
        const savedMeshes = await loadStoredMeshes().catch(() => []);
        const imported = savedMeshes.map(assetFromStored);
        set({
          status: "ready",
          catalog: [...bundle.catalog, ...imported],
          actorTypes: bundle.actorTypes,
          project,
          error: null,
        });
      } catch (error) {
        set({
          status: "error",
          error: error instanceof Error ? error.message : "Failed to load editor data",
        });
      }
    },
    setTab: (tab) => set({ tab }),
    setTool: (tool) => set({ tool }),
    select: (id) => set({ selectedId: id }),
    setSearch: (search) => set({ search }),
    setAssetFilter: (assetFilter) => set({ assetFilter }),
    setSnap: (snap) => set({ snap }),
    setShowGrid: (showGrid) => set({ showGrid }),
    setShowTerrain: (showTerrain) => set({ showTerrain }),
    setShowWater: (showWater) => set({ showWater }),
    setLayer: (layer, value) => set({ [layer]: value }),
    switchScene: (id) => {
      const { project } = get();
      if (!project || !project.scenes[id]) return;
      pushHistory();
      set({
        project: { ...project, activeSceneId: id },
        selectedId: null,
        dirty: true,
      });
    },
    updateObject: (id, patch, record = true) => {
      const { project } = get();
      if (!project) return;
      if (record) pushHistory();
      const scene = project.scenes[project.activeSceneId];
      const objects = scene.objects.map((object) =>
        object.id === id ? { ...object, ...patch } : object,
      );
      set({
        project: {
          ...project,
          scenes: {
            ...project.scenes,
            [scene.id]: { ...scene, objects },
          },
        },
        dirty: true,
      });
    },
    setTransformFromWorld: (id, world) => {
      const { project } = get();
      if (!project) return;
      const scene = project.scenes[project.activeSceneId];
      const object = scene.objects.find((item) => item.id === id);
      if (!object) return;
      const [x, y, z] = worldPosToGame(world.x, world.y, world.z);
      const transform = [...object.transform] as EditorObject["transform"];
      transform[0] = x;
      transform[1] = y;
      transform[2] = z;
      get().updateObject(id, { transform }, false);
    },
    commitTransform: (id, transform) => {
      pushHistory();
      get().updateObject(id, { transform }, false);
    },
    addAsset: (asset, worldHint) => {
      const { project } = get();
      if (!project) return "";
      pushHistory();
      const scene = project.scenes[project.activeSceneId];
      const object = newProp(asset);
      const info = get().catalog.find((item) => item.id === asset);
      if (info?.name) object.name = info.name;
      if (worldHint) {
        const [x, y, z] = worldPosToGame(worldHint.x, worldHint.y, worldHint.z);
        object.transform[0] = x;
        object.transform[1] = y;
        object.transform[2] = z;
      } else {
        const selected = scene.objects.find((item) => item.id === get().selectedId);
        if (selected) {
          object.transform = [...selected.transform];
          object.transform[0] += 3;
        } else {
          const spawn = scene.objects.find((item) => item.kind === "point" && /spawn/i.test(item.name));
          object.transform = spawn ? [...spawn.transform] : identityTransform();
        }
      }
      set({
        project: {
          ...project,
          scenes: {
            ...project.scenes,
            [scene.id]: { ...scene, objects: [...scene.objects, object] },
          },
        },
        selectedId: object.id,
        tool: "translate",
        tab: "world",
        dirty: true,
      });
      return object.id;
    },
    addActor: (actorType, npcId) => {
      const { project } = get();
      if (!project) return "";
      pushHistory();
      const scene = project.scenes[project.activeSceneId];
      const object: EditorObject = {
        id: `NPC_${npcId ?? actorType}.${Date.now().toString(36)}`,
        kind: "actor",
        name: npcId ?? actorType,
        asset: ACTOR_ASSETS[actorType] ?? "Character",
        actorType,
        params: npcId ? { subtype: npcId } : {},
        transform: identityTransform(),
        visible: true,
      };
      const spawn = scene.objects.find((item) => item.kind === "point");
      if (spawn) object.transform = [...spawn.transform];
      set({
        project: {
          ...project,
          scenes: {
            ...project.scenes,
            [scene.id]: { ...scene, objects: [...scene.objects, object] },
          },
        },
        selectedId: object.id,
        tab: "world",
        dirty: true,
      });
      return object.id;
    },
    duplicateSelected: () => {
      const { project, selectedId } = get();
      if (!project || !selectedId) return;
      const scene = project.scenes[project.activeSceneId];
      const object = scene.objects.find((item) => item.id === selectedId);
      if (!object) return;
      pushHistory();
      const copy = cloneObject(object);
      set({
        project: {
          ...project,
          scenes: {
            ...project.scenes,
            [scene.id]: { ...scene, objects: [...scene.objects, copy] },
          },
        },
        selectedId: copy.id,
        dirty: true,
      });
    },
    deleteSelected: () => {
      const { project, selectedId } = get();
      if (!project || !selectedId) return;
      const scene = project.scenes[project.activeSceneId];
      pushHistory();
      set({
        project: {
          ...project,
          scenes: {
            ...project.scenes,
            [scene.id]: {
              ...scene,
              objects: scene.objects.filter((item) => item.id !== selectedId),
            },
          },
        },
        selectedId: null,
        dirty: true,
      });
    },
    undo: () => {
      const { past, project, future } = get();
      if (!project || past.length === 0) return;
      const previous = past[past.length - 1];
      set({
        past: past.slice(0, -1),
        future: [snapshot(project), ...future].slice(0, 40),
        project: JSON.parse(previous) as StudioProject,
        dirty: true,
      });
    },
    redo: () => {
      const { future, project, past } = get();
      if (!project || future.length === 0) return;
      const next = future[0];
      set({
        future: future.slice(1),
        past: [...past, snapshot(project)].slice(-40),
        project: JSON.parse(next) as StudioProject,
        dirty: true,
      });
    },
    updateProject: (recipe) => {
      const { project } = get();
      if (!project) return;
      pushHistory();
      const next = structuredClone(project);
      recipe(next);
      set({ project: next, dirty: true });
    },
    persist: () => {
      const { project } = get();
      if (!project) return;
      localStorage.setItem(SAVE_KEY, snapshot(project));
      set({ dirty: false });
    },
    exportStudio: () => {
      const { project } = get();
      if (!project) return;
      download("datab-each-studio.json", JSON.stringify(project, null, 2));
    },
    exportGamePack: () => {
      const { project } = get();
      if (!project) return;
      download("datab-each-game-pack.json", JSON.stringify(exportGamePack(project), null, 2));
    },
    async importStudio(file) {
      const text = await file.text();
      const parsed = JSON.parse(text) as StudioProject;
      if (parsed.format !== "datab-each-studio-v1") {
        throw new Error("This file is not a Data B-each Studio project.");
      }
      set({ project: parsed, selectedId: null, dirty: true, past: [], future: [] });
    },
    async resetToBundle() {
      if (!bundleCache) {
        await get().load();
        return;
      }
      localStorage.removeItem(SAVE_KEY);
      set({
        project: projectFromBundle(bundleCache),
        selectedId: null,
        dirty: false,
        past: [],
        future: [],
      });
    },
    async applyToGame() {
      const { project } = get();
      if (!project) throw new Error("Nothing to apply.");
      get().persist();
      const response = await fetch("/api/apply-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project }),
      });
      const payload = (await response.json()) as { error?: string; gameUrl?: string };
      if (!response.ok) throw new Error(payload.error ?? "Could not apply to the game");
      return { gameUrl: payload.gameUrl ?? "http://127.0.0.1:43173" };
    },
    async importMeshes(files) {
      const imported = await importMeshFiles(files);
      const { activeViewport } = await import("@/lib/runtime/viewport-engine");
      for (const item of imported) activeViewport?.primeAsset(item.asset, item.root);
      set({ catalog: [...get().catalog, ...imported.map((item) => item.asset)] });
      const hint = activeViewport?.worldPointInFront();
      for (const [index, item] of imported.entries()) {
        const placed = hint
          ? { x: hint.x + index * 2.4, y: hint.y, z: hint.z }
          : undefined;
        get().addAsset(item.asset.id, placed);
      }
      return imported.map((item) => item.asset);
    },
    async removeImportedAsset(id) {
      await deleteStoredMesh(id);
      set({ catalog: get().catalog.filter((asset) => asset.id !== id) });
    },
    startPlay() {
      const { project } = get();
      if (!project) return;
      get().persist();
      clearPlayTimers();
      set({
        playing: true,
        tab: "world",
        selectedId: null,
        playDialog: null,
        playNearby: null,
        playHints: [],
      });
      const starters = project.notifications.filter(
        (item) => item.type === "hint" || item.type === "mainQuest" || item.type === "quest",
      );
      starters.slice(0, 5).forEach((item, index) => {
        const timer = window.setTimeout(() => {
          const { playing, playHints } = get();
          if (!playing) return;
          if (playHints.some((hint) => hint.id === item.id)) return;
          set({ playHints: [...playHints, item] });
        }, item.delayMs ?? 700 + index * 1600);
        playTimers.push(timer);
      });
    },
    stopPlay() {
      clearPlayTimers();
      set({ playing: false, playDialog: null, playNearby: null, playHints: [] });
    },
    setPlayNearby: (playNearby) => set({ playNearby }),
    playInteract() {
      const { playNearby, project, playDialog } = get();
      if (playDialog || !playNearby || !project) return;
      const object = project.scenes[project.activeSceneId]?.objects.find((item) => item.id === playNearby.objectId);
      if (!object) return;
      const script = resolveActorDialog(project, object);
      if (!script) return;
      set({ playDialog: startDialog(script, object.name) });
    },
    playAdvance() {
      const { playDialog, project } = get();
      if (!playDialog || !project) return;
      const script = project.dialogs.find((item) => item.id === playDialog.scriptId);
      const node = script ? nodeById(script, playDialog.nodeId) : null;
      if (!script || !node || node.isPrompt) return;
      const next = advanceDialog(script, node);
      set({ playDialog: next ? { ...playDialog, nodeId: next } : null });
    },
    playChoose(choiceId) {
      const { playDialog, project } = get();
      if (!playDialog || !project) return;
      const script = project.dialogs.find((item) => item.id === playDialog.scriptId);
      const node = script ? nodeById(script, playDialog.nodeId) : null;
      if (!script || !node) return;
      const next = chooseDialog(script, node, choiceId);
      set({ playDialog: next ? { ...playDialog, nodeId: next } : null });
    },
    closePlayDialog: () => set({ playDialog: null }),
    dismissPlayHint: (id) => set({ playHints: get().playHints.filter((item) => item.id !== id) }),
  };
});
