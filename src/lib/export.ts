import { serializeDialogs } from "@/lib/project";
import type { EditorObject, SceneData, StudioProject } from "@/lib/types";

function gameSceneFromEditor(scene: SceneData) {
  const props = scene.objects
    .filter((object) => object.kind === "prop")
    .map((object) => ({
      asset: object.asset,
      traversable: Boolean(object.traversable),
      transforms: object.transform,
    }));

  const actors = scene.objects
    .filter((object) => object.kind === "actor")
    .map((object) => ({
      uid: object.id,
      type: object.actorType ?? "NPC",
      params: object.params ?? {},
      transforms: object.transform,
    }));

  const points: Record<string, EditorObject["transform"]> = {};
  for (const object of scene.objects.filter((item) => item.kind === "point")) {
    points[object.name] = object.transform;
  }

  const areas: Record<string, { position: number[]; size: number }> = {};
  for (const object of scene.objects.filter((item) => item.kind === "area")) {
    areas[object.name] = {
      position: [object.transform[0], object.transform[1], object.transform[2]],
      size: object.transform[3],
    };
  }

  const curves: Record<string, { type: string; closed: boolean; points: number[][] }> = {};
  for (const curve of scene.curves) {
    curves[curve.id] = {
      type: curve.type,
      closed: curve.closed,
      points: curve.points,
    };
  }

  const assets = [...new Set(scene.objects.filter((item) => item.asset).map((item) => item.asset))];

  return {
    name: scene.name,
    bounds: scene.bounds,
    useBaseAsCollider: scene.useBaseAsCollider,
    points,
    areas,
    curves,
    assets,
    actors,
    props,
  };
}

export function exportGamePack(project: StudioProject) {
  const scenes: Record<string, unknown> = {};
  for (const scene of Object.values(project.scenes)) {
    scenes[`Scene_${scene.id}`] = gameSceneFromEditor(scene);
  }

  const quests = Object.fromEntries(project.quests.map((quest) => [quest.id, quest]));
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

  const hints = Object.fromEntries(
    project.notifications
      .filter((item) => item.type === "hint")
      .map((item) => [item.id, { title: item.title, description: item.description }]),
  );

  return {
    format: "datab-each-game-pack-v1",
    note: "Props are included as JSON. The original game baked props into Scene_*.glb; drop these files over the locale/scene JSON in DATAB-EACH or keep this pack as the authored source.",
    scenes,
    quests_en: quests,
    characters_en: {
      npcs,
      colors: project.characterColors,
    },
    dialogs_en: serializeDialogs(project.dialogs),
    notifications: project.notifications,
    site_hints: hints,
  };
}
