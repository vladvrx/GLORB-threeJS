"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PlayHud } from "@/components/editor/play-hud";
import { ViewportEngine } from "@/lib/runtime/viewport-engine";
import { useEditor } from "@/lib/store";

export function EditorViewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ViewportEngine | null>(null);
  const [engineGen, setEngineGen] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState("Starting 3D view…");
  const [fatal, setFatal] = useState<string | null>(null);
  const [dropping, setDropping] = useState(false);
  const catalog = useEditor((state) => state.catalog);
  const project = useEditor((state) => state.project);
  const selectedId = useEditor((state) => state.selectedId);
  const tool = useEditor((state) => state.tool);
  const showGrid = useEditor((state) => state.showGrid);
  const showTerrain = useEditor((state) => state.showTerrain);
  const showWater = useEditor((state) => state.showWater);
  const layerProps = useEditor((state) => state.layerProps);
  const layerActors = useEditor((state) => state.layerActors);
  const layerHelpers = useEditor((state) => state.layerHelpers);
  const playing = useEditor((state) => state.playing);
  const importMeshes = useEditor((state) => state.importMeshes);
  const scene = project?.scenes[project.activeSceneId];
  const sceneId = scene?.id ?? "";
  const objectSignature = scene
    ? `${scene.glb}|${scene.objects.map((object) => `${object.id}:${object.asset}`).join(",")}`
    : "";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const initial = useEditor.getState().catalog;
    if (initial.length === 0) return;
    try {
      const engine = new ViewportEngine(canvas, initial);
      engineRef.current = engine;
      setEngineGen((value) => value + 1);
      setFatal(null);
      const observer = new ResizeObserver(() => engine.resize());
      if (canvas.parentElement) observer.observe(canvas.parentElement);
      return () => {
        observer.disconnect();
        engine.dispose();
        if (engineRef.current === engine) engineRef.current = null;
      };
    } catch (error) {
      setFatal(error instanceof Error ? error.message : "Could not start WebGL.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    engineRef.current?.registerAssets(catalog);
  }, [catalog, engineGen]);

  useEffect(() => {
    const engine = engineRef.current;
    const liveScene = useEditor.getState().project?.scenes[
      useEditor.getState().project?.activeSceneId ?? ""
    ];
    if (!engine || !liveScene || engineGen === 0) return;
    let cancelled = false;
    setLoading(true);
    setProgress("Placing island objects…");
    engine
      .syncScene(liveScene, (message) => {
        if (!cancelled) setProgress(message);
      })
      .then(() => {
        if (!cancelled) setLoading(false);
      })
      .catch((error: unknown) => {
        console.error(error);
        if (!cancelled) {
          setProgress(error instanceof Error ? error.message : "Scene failed to load");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [engineGen, sceneId, objectSignature]);

  useEffect(() => {
    if (loading || !scene || playing) return;
    engineRef.current?.applyLiveTransforms?.(scene);
  }, [scene, loading, playing]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine || engineGen === 0) return;
    if (playing) engine.enterPlay();
    else engine.exitPlay();
  }, [playing, engineGen]);

  useEffect(() => {
    if (playing) return;
    engineRef.current?.attach(selectedId, tool);
  }, [selectedId, tool, loading, playing]);

  useEffect(() => {
    engineRef.current?.setLayers({
      showGrid: playing ? false : showGrid,
      showTerrain,
      showWater,
      layerProps: playing ? true : layerProps,
      layerActors: playing ? true : layerActors,
      layerHelpers: playing ? false : layerHelpers,
    });
  }, [showGrid, showTerrain, showWater, layerProps, layerActors, layerHelpers, loading, playing]);

  async function handleDrop(files: FileList | null) {
    const meshes = [...(files ?? [])].filter((file) => /\.(glb|gltf|fbx)$/i.test(file.name));
    if (meshes.length === 0) return;
    try {
      const imported = await importMeshes(meshes);
      toast.success(`Imported ${imported.map((item) => item.name).join(", ")}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not import mesh");
    }
  }

  return (
    <div
      className="relative min-h-[280px] min-w-0 flex-1 overflow-hidden bg-[#07202b]"
      onDragOver={(event) => {
        event.preventDefault();
        setDropping(true);
      }}
      onDragLeave={() => setDropping(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDropping(false);
        void handleDrop(event.dataTransfer.files);
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {fatal ? (
        <div className="absolute inset-0 grid place-items-center bg-[#07202b] p-6 text-center text-sm text-teal-50">
          <p>{fatal}</p>
        </div>
      ) : null}
      {dropping ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-teal-950/55 text-sm text-teal-50">
          Drop GLB or FBX to import
        </div>
      ) : null}
      {playing ? <PlayHud /> : null}
      {loading && !playing ? (
        <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-center text-sm text-teal-50">
          <p>{progress}</p>
        </div>
      ) : progress.startsWith("Loading models") && !playing ? (
        <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 rounded-md bg-black/45 px-3 py-1.5 text-xs text-teal-100/80">
          {progress}
        </div>
      ) : null}
      {playing ? null : (
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] tracking-wide text-teal-100/80 uppercase">
          Z up · drop GLB/FBX to import
        </div>
      )}
    </div>
  );
}
