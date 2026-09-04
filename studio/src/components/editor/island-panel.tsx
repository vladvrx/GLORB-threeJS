"use client";

import { Scissors } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  aabbAlmostEqual,
  aabbSize,
  aabbVolume,
  countOutsideCrop,
  formatMeters,
  gameCropFromWorldGround,
  sceneCrop,
  sceneFullBounds,
  worldGroundFromGame,
} from "@/lib/crop";
import { formatAxis } from "@/lib/coords";
import { useEditor } from "@/lib/store";

export function IslandSizePanel() {
  const project = useEditor((state) => state.project);
  const setSceneBounds = useEditor((state) => state.setSceneBounds);
  const halveIsland = useEditor((state) => state.halveIsland);
  const resetIslandSize = useEditor((state) => state.resetIslandSize);
  const deleteOutsideCrop = useEditor((state) => state.deleteOutsideCrop);
  const scene = project?.scenes[project.activeSceneId];
  if (!scene) return null;

  const full = sceneFullBounds(scene);
  const crop = sceneCrop(scene);
  if (!full || !crop) {
    return (
      <div className="border-b border-white/10 p-3 text-sm text-teal-200/60">
        This scene has no island bounds to crop.
      </div>
    );
  }

  const ground = worldGroundFromGame(crop);
  const fullGround = worldGroundFromGame(full);
  const size = aabbSize(crop);
  const fullSize = aabbSize(full);
  const cropped = !aabbAlmostEqual(crop, full);
  const outside = countOutsideCrop(scene);
  const keptPct = Math.round((aabbVolume(crop) / Math.max(1, aabbVolume(full))) * 100);

  const commitGround = (next: { minX: number; maxX: number; minY: number; maxY: number }) => {
    setSceneBounds(gameCropFromWorldGround(full, next), false);
  };

  return (
    <div className="space-y-3 border-b border-white/10 p-3">
      <div>
        <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Island size</p>
        <h2 className="mt-1 text-sm font-semibold">{scene.name}</h2>
        <p className="text-[11px] text-teal-200/55">
          {scene.id === "PaintSquare"
            ? "Playable paint slab. Walking in the game paints this square."
            : "Original west land. Crop hides the unused peninsula."}
        </p>
        <p className="text-[11px] text-teal-200/55">
          {formatMeters(size.x)} × {formatMeters(size.z)} kept
          {cropped ? ` · ${keptPct}% of ${formatMeters(fullSize.x)} × ${formatMeters(fullSize.z)}` : " · full island"}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          className="bg-teal-400 text-[#062029] hover:bg-teal-300"
          onClick={() => {
            const result = halveIsland();
            toast.success(
              `Cut ${scene.id === "PaintSquare" ? "the paint square" : scene.name} in half and removed ${result.removed} objects. Undo if that was too much.`,
            );
          }}
        >
          <Scissors className="size-3.5" />
          Cut in half
        </Button>
        <Button size="sm" variant="secondary" onClick={() => resetIslandSize()} disabled={!cropped}>
          Reset size
        </Button>
      </div>
      <div className="grid gap-1">
        <span className="text-[10px] font-medium tracking-[0.14em] text-teal-200/70 uppercase">East–west (world X)</span>
        <div className="grid grid-cols-2 gap-1.5">
          <label className="grid gap-1">
            <span className="text-[10px] text-teal-200/60">Min</span>
            <Input
              key={`xmin-${formatAxis(ground.minX)}`}
              defaultValue={formatAxis(ground.minX)}
              onBlur={(event) => {
                const minX = Number(event.target.value);
                if (Number.isFinite(minX)) commitGround({ ...ground, minX });
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") (event.target as HTMLInputElement).blur();
              }}
            />
          </label>
          <label className="grid gap-1">
            <span className="text-[10px] text-teal-200/60">Max</span>
            <Input
              key={`xmax-${formatAxis(ground.maxX)}`}
              defaultValue={formatAxis(ground.maxX)}
              onBlur={(event) => {
                const maxX = Number(event.target.value);
                if (Number.isFinite(maxX)) commitGround({ ...ground, maxX });
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") (event.target as HTMLInputElement).blur();
              }}
            />
          </label>
        </div>
        <p className="text-[10px] text-teal-200/40">
          Full range {formatAxis(fullGround.minX)} to {formatAxis(fullGround.maxX)}
        </p>
      </div>
      <div className="grid gap-1">
        <span className="text-[10px] font-medium tracking-[0.14em] text-teal-200/70 uppercase">North–south (world Y)</span>
        <div className="grid grid-cols-2 gap-1.5">
          <label className="grid gap-1">
            <span className="text-[10px] text-teal-200/60">Min</span>
            <Input
              key={`ymin-${formatAxis(ground.minY)}`}
              defaultValue={formatAxis(ground.minY)}
              onBlur={(event) => {
                const minY = Number(event.target.value);
                if (Number.isFinite(minY)) commitGround({ ...ground, minY });
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") (event.target as HTMLInputElement).blur();
              }}
            />
          </label>
          <label className="grid gap-1">
            <span className="text-[10px] text-teal-200/60">Max</span>
            <Input
              key={`ymax-${formatAxis(ground.maxY)}`}
              defaultValue={formatAxis(ground.maxY)}
              onBlur={(event) => {
                const maxY = Number(event.target.value);
                if (Number.isFinite(maxY)) commitGround({ ...ground, maxY });
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") (event.target as HTMLInputElement).blur();
              }}
            />
          </label>
        </div>
        <p className="text-[10px] text-teal-200/40">
          Full range {formatAxis(fullGround.minY)} to {formatAxis(fullGround.maxY)}
        </p>
      </div>
      {outside.total > 0 ? (
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            const result = deleteOutsideCrop();
            toast.success(`Removed ${result.removed} objects outside the cut.`);
          }}
        >
          Delete {outside.total} outside ({outside.props} props)
        </Button>
      ) : cropped ? (
        <p className="text-[11px] text-teal-200/50">Nothing left outside this cut.</p>
      ) : (
        <p className="text-[11px] text-teal-200/50">
          Cut in half keeps the spawn side, hides the rest of the land, and deletes objects on the discarded half.
        </p>
      )}
    </div>
  );
}
