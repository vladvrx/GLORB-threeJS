import { create } from "zustand";
import { ACTOR_ASSETS, cloneObject, newProp, projectFromBundle } from "@/lib/project";
import { identityTransform, worldPosToGame } from "@/lib/coords";
import { exportGamePack } from "@/lib/export";
import type {
  AssetInfo,
  EditorObject,
  EditorTab,
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
  focusRequest: number;
  requestFocus: () => void;
  undo: () => void;
  redo: () => void;
  updateProject: (recipe: (project: StudioProject) => void) => void;
  persist: () => void;
  exportStudio: () => void;
  exportGamePack: () => void;
  importStudio: (file: File) => Promise<void>;
  resetToBundle: () => Promise<void>;
};

let bundleCache: StudioBundle | null = null;

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
    focusRequest: 0,
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
        set({
          status: "ready",
          catalog: bundle.catalog,
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
    requestFocus: () => set({ focusRequest: get().focusRequest + 1 }),
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
  };
});
