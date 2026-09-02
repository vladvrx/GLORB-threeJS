import type { DialogAction, DialogNode, DialogScript, EditorObject, StudioProject } from "@/lib/types";

export type PlayNearby = {
  objectId: string;
  name: string;
  scriptId: string | null;
};

export type PlayDialogState = {
  scriptId: string;
  nodeId: string;
  speaker: string;
};

export function resolveActorDialog(
  project: StudioProject,
  object: EditorObject,
): DialogScript | null {
  const npcId = object.params?.subtype || object.name;
  const npc = project.characters.find((item) => item.id === npcId);
  const candidates = [npc?.script, object.params?.script, npcId, object.name];
  for (const id of candidates) {
    if (!id) continue;
    const script = project.dialogs.find((item) => item.id === id);
    if (script) return script;
  }
  return null;
}

export function nodeById(script: DialogScript, id: string) {
  return script.nodes.find((node) => node.id === id) ?? null;
}

function followActions(actions: DialogAction[], current: string | null) {
  let nodeId = current;
  for (const action of actions) {
    if (action.action === "GOTO" && action.node) nodeId = action.node;
    if (action.action === "END") nodeId = null;
  }
  return nodeId;
}

export function startDialog(script: DialogScript, speaker: string): PlayDialogState | null {
  if (!script.first) return null;
  return { scriptId: script.id, nodeId: script.first, speaker };
}

export function advanceDialog(
  _script: DialogScript,
  node: DialogNode,
): string | null {
  return followActions(node.next, null);
}

export function chooseDialog(
  script: DialogScript,
  node: DialogNode,
  choiceId: string,
): string | null {
  const choice = node.choices.find((item) => item.id === choiceId);
  if (!choice) return null;
  return followActions(choice.next, null);
}
