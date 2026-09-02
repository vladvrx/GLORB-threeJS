"use client";

import { useEffect, useRef, useState } from "react";
import { ViewportEngine } from "@/lib/runtime/viewport-engine";
import { useEditor } from "@/lib/store";

export function EditorViewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ViewportEngine | null>(null);
  const [engineGen, setEngineGen] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState("Starting 3D view…");
  const [fatal, setFatal] = useState<string | null>(null);
  const catalog = useEditor((state) => state.catalog);
  const project = useEditor((state) => state.project);
  const selectedId = useEditor((state) => state.selectedId);
  const tool = useEditor((state) => state.tool);
  const focusRequest = useEditor((state) => state.focusRequest);
  const showGrid = useEditor((state) => state.showGrid);
  const showTerrain = useEditor((state) => state.showTerrain);
  const showWater = useEditor((state) => state.showWater);
  const layerProps = useEditor((state) => state.layerProps);
  const layerActors = useEditor((state) => state.layerActors);
  const layerHelpers = useEditor((state) => state.layerHelpers);
  const scene = project?.scenes[project.activeSceneId];
  const sceneId = scene?.id ?? "";
  const objectSignature = scene
    ? `${scene.glb}|${scene.objects.map((object) => `${object.id}:${object.asset}`).join(",")}`
    : "";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || catalog.length === 0) return;
    try {
      const engine = new ViewportEngine(canvas, catalog);
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
  }, [catalog]);

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
    if (loading || !scene) return;
    engineRef.current?.applyLiveTransforms(scene);
  }, [scene, loading]);

  useEffect(() => {
    engineRef.current?.attach(selectedId, tool);
  }, [selectedId, tool, loading]);

  useEffect(() => {
    engineRef.current?.setLayers({
      showGrid,
      showTerrain,
      showWater,
      layerProps,
      layerActors,
      layerHelpers,
    });
  }, [showGrid, showTerrain, showWater, layerProps, layerActors, layerHelpers, loading]);

  useEffect(() => {
    if (focusRequest > 0) engineRef.current?.focus(selectedId);
  }, [focusRequest, selectedId]);

  return (
    <div className="relative min-h-[280px] min-w-0 flex-1 overflow-hidden bg-[#07202b]">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {fatal ? (
        <div className="absolute inset-0 grid place-items-center bg-[#07202b] p-6 text-center text-sm text-teal-50">
          <p>{fatal}</p>
        </div>
      ) : null}
      {loading ? (
        <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-center text-sm text-teal-50">
          <p>{progress}</p>
        </div>
      ) : progress.startsWith("Loading models") ? (
        <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 rounded-md bg-black/45 px-3 py-1.5 text-xs text-teal-100/80">
          {progress}
        </div>
      ) : null}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] tracking-wide text-teal-100/80 uppercase">
        Z up · X red · Y green · Z blue
      </div>
    </div>
  );
}
