import { isCropActive, objectInsideCrop, sceneCrop, trimCurveToCrop } from "@/lib/crop";
import { APPLY_SCENE_ID } from "@/lib/maps";
import { serializeDialogs } from "@/lib/project";
import type { EditorObject, SceneData, StudioProject } from "@/lib/types";

function gameSceneFromEditor(scene: SceneData) {
  const crop = sceneCrop(scene);
  const cropped = isCropActive(scene);
  const objects = cropped && crop
    ? scene.objects.filter((object) => objectInsideCrop(object, crop))
    : scene.objects;
  const curves = cropped && crop
    ? scene.curves.map((curve) => trimCurveToCrop(curve, crop)).filter((curve) => Boolean(curve))
    : scene.curves;

  const props = objects
    .filter((object) => object.kind === "prop")
    .map((object) => ({
      asset: object.asset,
      traversable: Boolean(object.traversable),
      transforms: object.transform,
    }));

  const actors = objects
    .filter((object) => object.kind === "actor")
    .map((object) => ({
      uid: object.id,
      type: object.actorType ?? "NPC",
      params: object.params ?? {},
      transforms: object.transform,
    }));

  const points: Record<string, EditorObject["transform"]> = {};
  for (const object of objects.filter((item) => item.kind === "point")) {
    points[object.name] = object.transform;
  }

  const areas: Record<string, { position: number[]; size: number }> = {};
  for (const object of objects.filter((item) => item.kind === "area")) {
    areas[object.name] = {
      position: [object.transform[0], object.transform[1], object.transform[2]],
      size: object.transform[3],
    };
  }

  const packedCurves: Record<string, { type: string; closed: boolean; points: number[][] }> = {};
  for (const curve of curves) {
    if (!curve) continue;
    packedCurves[curve.id] = {
      type: curve.type,
      closed: curve.closed,
      points: curve.points,
    };
  }

  const assets = [...new Set(objects.filter((item) => item.asset).map((item) => item.asset))];

  return {
    name: APPLY_SCENE_ID,
    bounds: scene.id === "PaintSquare" ? null : crop ?? scene.bounds,
    useBaseAsCollider: scene.useBaseAsCollider,
    points,
    areas,
    curves: packedCurves,
    assets,
    actors,
    props,
  };
}

function mergePackedScenes(
  west: ReturnType<typeof gameSceneFromEditor>,
  paint?: ReturnType<typeof gameSceneFromEditor>,
) {
  if (!paint) return west;
  return {
    ...west,
    points: { ...paint.points, ...west.points },
    areas: { ...paint.areas, ...west.areas },
    curves: { ...paint.curves, ...west.curves },
    assets: [...new Set([...west.assets, ...paint.assets])],
    actors: [...west.actors, ...paint.actors],
    props: [...west.props, ...paint.props],
  };
}

export function exportGamePack(project: StudioProject) {
  const west = project.scenes.IslandWest
    ? gameSceneFromEditor(project.scenes.IslandWest)
    : gameSceneFromEditor(project.scenes[project.activeSceneId]);
  const paint = project.scenes.PaintSquare
    ? gameSceneFromEditor(project.scenes.PaintSquare)
    : undefined;
  const packed = mergePackedScenes(west, paint);
  if (!packed.bounds && project.scenes.IslandWest?.bounds) {
    packed.bounds = project.scenes.IslandWest.bounds;
  }

  const npcs = Object.fromEntries(
    project.characters.map((npc) => [
      npc.id,
      {
        gradientID: npc.gradientID,
        face: npc.face,
        script: npc.script,
        scriptArgs: npc.scriptArgs,
      },
    ]),
  );

  return {
    format: "datab-each-game-pack-v1",
    note: "Studio writes Island West and paint-square props onto Scene_IslandWest. Intro stays the playable boat map.",
    scenes: {
      Scene_IslandWest: packed,
    },
    quests_en: {},
    characters_en: {
      npcs,
      colors: project.characterColors,
    },
    dialogs_en: serializeDialogs(project.dialogs),
    locale: project.locale ?? {},
    site_hints: {},
    notifications: [],
  };
}
