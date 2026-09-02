"use client";

import { useEffect, useRef, useState } from "react";
import { ViewportEngine } from "@/lib/runtime/viewport-engine";
import { useEditor } from "@/lib/store";

export function EditorViewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ViewportEngine | null>(null);
  const engineSceneId = useRef<string | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || catalog.length === 0) return;
    const engine = new ViewportEngine(canvas, catalog);
    engineRef.current = engine;
    const onResize = () => engine.resize();
    const observer = new ResizeObserver(onResize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    return () => {
      observer.disconnect();
      engine.dispose();
      engineRef.current = null;
    };
  }, [catalog]);

  const scene = project?.scenes[project.activeSceneId];

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine || !scene) return;
    let cancelled = false;
    const switching = engineSceneId.current !== scene.id;
    if (switching) {
      setLoading(true);
      engineSceneId.current = scene.id;
    }
    engine.syncScene(scene).then(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [scene]);

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
    <div className="relative min-h-[280px] flex-1 overflow-hidden bg-[#07202b]">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {loading ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-[#07202b]/70 text-sm text-teal-50">
          Loading Cove meshes…
        </div>
      ) : null}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] tracking-wide text-teal-100/80 uppercase">
        Z up · X red · Y green · Z blue
      </div>
    </div>
  );
}
