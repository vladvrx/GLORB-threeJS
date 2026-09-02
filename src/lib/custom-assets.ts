import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { uid } from "@/lib/ids";
import type { AssetInfo } from "@/lib/types";

const DB_NAME = "datab-each-studio-meshes";
const STORE = "meshes";

export type StoredMesh = {
  id: string;
  name: string;
  filename: string;
  mime: string;
  format: "glb" | "gltf" | "fbx";
  bytes: number;
  blob: Blob;
};

const objectUrls = new Map<string, string>();

function guessFormat(file: File): "glb" | "gltf" | "fbx" | null {
  const name = file.name.toLowerCase();
  if (name.endsWith(".fbx")) return "fbx";
  if (name.endsWith(".glb")) return "glb";
  if (name.endsWith(".gltf")) return "gltf";
  if (file.type.includes("fbx")) return "fbx";
  if (file.type.includes("gltf") || file.type.includes("model")) return "glb";
  return null;
}

function prettyName(filename: string) {
  return filename.replace(/\.(glb|gltf|fbx)$/i, "").replace(/[_-]+/g, " ");
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB unavailable"));
  });
}

export async function saveStoredMesh(record: StoredMesh) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Could not save mesh"));
  });
  db.close();
}

export async function deleteStoredMesh(id: string) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Could not delete mesh"));
  });
  db.close();
  const url = objectUrls.get(id);
  if (url) {
    URL.revokeObjectURL(url);
    objectUrls.delete(id);
  }
}

export async function loadStoredMeshes(): Promise<StoredMesh[]> {
  const db = await openDb();
  const records = await new Promise<StoredMesh[]>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).getAll();
    request.onsuccess = () => resolve((request.result as StoredMesh[]) ?? []);
    request.onerror = () => reject(request.error ?? new Error("Could not read meshes"));
  });
  db.close();
  return records;
}

export function urlForMesh(record: StoredMesh) {
  const existing = objectUrls.get(record.id);
  if (existing) return existing;
  const url = URL.createObjectURL(record.blob);
  objectUrls.set(record.id, url);
  return url;
}

export function assetFromStored(record: StoredMesh): AssetInfo {
  return {
    id: record.id,
    name: record.name,
    file: urlForMesh(record),
    bytes: record.bytes,
    category: "other",
    imported: true,
    format: record.format,
  };
}

export function normalizeImported(root: THREE.Object3D) {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  if (!Number.isFinite(maxDim) || maxDim <= 0) return root;
  let scale = 1;
  if (maxDim > 8) scale = 3.2 / maxDim;
  else if (maxDim < 0.2) scale = 1.8 / maxDim;
  if (scale !== 1) root.scale.multiplyScalar(scale);
  root.updateMatrixWorld(true);
  const fitted = new THREE.Box3().setFromObject(root);
  const center = fitted.getCenter(new THREE.Vector3());
  root.position.x -= center.x;
  root.position.z -= center.z;
  root.position.y -= fitted.min.y;
  return root;
}

function makeLoaders() {
  const draco = new DRACOLoader();
  draco.setDecoderPath("/draco/");
  const gltf = new GLTFLoader();
  gltf.setDRACOLoader(draco);
  const fbx = new FBXLoader();
  return { gltf, fbx };
}

export async function parseMeshFile(file: File, format: "glb" | "gltf" | "fbx") {
  const url = URL.createObjectURL(file);
  const { gltf, fbx } = makeLoaders();
  try {
    if (format === "fbx") {
      const model = await fbx.loadAsync(url);
      return normalizeImported(model);
    }
    const parsed = await gltf.loadAsync(url);
    return normalizeImported(parsed.scene);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function importMeshFiles(files: File[]) {
  const imported: { asset: AssetInfo; root: THREE.Object3D }[] = [];
  for (const file of files) {
    const format = guessFormat(file);
    if (!format) {
      throw new Error(`${file.name} is not a .glb, .gltf, or .fbx file.`);
    }
    if (file.size > 80 * 1024 * 1024) {
      throw new Error(`${file.name} is larger than 80 MB.`);
    }
    const root = await parseMeshFile(file, format);
    const id = uid("mesh");
    const record: StoredMesh = {
      id,
      name: prettyName(file.name),
      filename: file.name,
      mime: file.type || "application/octet-stream",
      format,
      bytes: file.size,
      blob: file,
    };
    await saveStoredMesh(record);
    imported.push({ asset: assetFromStored(record), root });
  }
  return imported;
}
