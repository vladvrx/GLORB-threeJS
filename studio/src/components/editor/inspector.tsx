"use client";

import { IslandSizePanel } from "@/components/editor/island-panel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Field, NativeSelect } from "@/components/editor/fields";
import {
  formatAxis,
  gameQuatFromWorldEuler,
  gameTransformToWorldPos,
  scaleOf,
  worldEulerDegreesFromGame,
  worldPosToGame,
} from "@/lib/coords";
import { useEditor } from "@/lib/store";
import type { EditorObject } from "@/lib/types";

function NumberRow({
  labels,
  values,
  onCommit,
}: {
  labels: string[];
  values: number[];
  onCommit: (next: number[]) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {values.map((value, index) => (
        <label key={labels[index]} className="grid gap-1">
          <span className="text-[10px] text-teal-200/60">{labels[index]}</span>
          <Input
            defaultValue={formatAxis(value)}
            key={`${labels[index]}-${formatAxis(value)}`}
            onBlur={(event) => {
              const next = [...values];
              next[index] = Number(event.target.value);
              if (Number.isFinite(next[index])) onCommit(next);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") (event.target as HTMLInputElement).blur();
            }}
          />
        </label>
      ))}
    </div>
  );
}

export function Inspector() {
  const project = useEditor((state) => state.project);
  const selectedId = useEditor((state) => state.selectedId);
  const catalog = useEditor((state) => state.catalog);
  const actorTypes = useEditor((state) => state.actorTypes);
  const updateObject = useEditor((state) => state.updateObject);
  const duplicateSelected = useEditor((state) => state.duplicateSelected);
  const deleteSelected = useEditor((state) => state.deleteSelected);

  const scene = project?.scenes[project.activeSceneId];
  const object = scene?.objects.find((item) => item.id === selectedId);

  if (!object) {
    return (
      <div>
        <IslandSizePanel />
        <div className="p-4 text-sm text-teal-200/60">
          Select a prop, actor, spawn, or area. Move, rotate, and scale with the gizmos — Z is up.
        </div>
      </div>
    );
  }

  const world = gameTransformToWorldPos(object.transform);
  const euler = worldEulerDegreesFromGame(object.transform);
  const scale = scaleOf(object.transform);

  const writeTransform = (patch: Partial<{ pos: number[]; rot: number[]; scale: number[] }>) => {
    const next: EditorObject["transform"] = [...object.transform];
    if (patch.pos) {
      const game = worldPosToGame(patch.pos[0], patch.pos[1], patch.pos[2]);
      next[0] = game[0];
      next[1] = game[1];
      next[2] = game[2];
    }
    if (patch.rot) {
      const quat = gameQuatFromWorldEuler([patch.rot[0], patch.rot[1], patch.rot[2]]);
      next[6] = quat[0];
      next[7] = quat[1];
      next[8] = quat[2];
      next[9] = quat[3];
    }
    if (patch.scale) {
      next[3] = patch.scale[0];
      next[4] = patch.scale[1];
      next[5] = patch.scale[2];
    }
    updateObject(object.id, { transform: next });
  };

  return (
    <div>
      <IslandSizePanel />
      <div className="space-y-4 p-3">
      <div>
        <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Inspector</p>
        <h2 className="mt-1 truncate text-sm font-semibold">{object.name}</h2>
        <p className="text-[11px] text-teal-200/50">{object.id}</p>
      </div>
      <Field label="Display name">
        <Input
          value={object.name}
          onChange={(event) => updateObject(object.id, { name: event.target.value })}
        />
      </Field>
      {object.kind === "prop" || object.kind === "actor" ? (
        <Field label="Asset">
          <NativeSelect
            value={object.asset}
            onChange={(event) => updateObject(object.id, { asset: event.target.value, name: event.target.value })}
          >
            {catalog.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
      ) : null}
      {object.kind === "actor" ? (
        <>
          <Field label="Actor type">
            <NativeSelect
              value={object.actorType ?? "NPC"}
              onChange={(event) => updateObject(object.id, { actorType: event.target.value })}
            >
              {actorTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="NPC / subtype">
            <Input
              value={object.params?.subtype ?? ""}
              onChange={(event) =>
                updateObject(object.id, {
                  params: { ...object.params, subtype: event.target.value },
                })
              }
            />
          </Field>
        </>
      ) : null}
      {object.kind === "prop" ? (
        <div className="flex items-center justify-between rounded-lg border border-white/10 px-2 py-1.5">
          <span className="text-xs">Traversable</span>
          <Switch
            checked={Boolean(object.traversable)}
            onCheckedChange={(checked) => updateObject(object.id, { traversable: Boolean(checked) })}
          />
        </div>
      ) : null}
      <div className="flex items-center justify-between rounded-lg border border-white/10 px-2 py-1.5">
        <span className="text-xs">Visible</span>
        <Switch
          checked={object.visible}
          onCheckedChange={(checked) => updateObject(object.id, { visible: Boolean(checked) })}
        />
      </div>
      <Field label="Position (world, Z up)">
        <NumberRow labels={["X", "Y", "Z"]} values={world} onCommit={(pos) => writeTransform({ pos })} />
      </Field>
      <Field label="Rotation ° (world, Z up)">
        <NumberRow labels={["X", "Y", "Z"]} values={euler} onCommit={(rot) => writeTransform({ rot })} />
      </Field>
      <Field label="Scale">
        <NumberRow labels={["X", "Y", "Z"]} values={scale} onCommit={(next) => writeTransform({ scale: next })} />
      </Field>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={duplicateSelected}>
          Duplicate
        </Button>
        <Button size="sm" variant="destructive" onClick={deleteSelected}>
          Delete
        </Button>
      </div>
      </div>
    </div>
  );
}
