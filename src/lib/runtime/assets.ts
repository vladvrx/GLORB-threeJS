import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { normalizeImported } from "@/lib/custom-assets";
import type { AssetInfo } from "@/lib/types";

const PLACEHOLDER_COLORS: Record<string, number> = {
  nature: 0x4faf6e,
  buildings: 0xe08b73,
  beach: 0xf0c36a,
  water: 0x4eb6c9,
  vehicles: 0xd45d6a,
  terrain: 0x8a8678,
  props: 0xc9b48a,
  characters: 0x7ae0b8,
  other: 0x9aa7c2,
};

function categoryOf(name: string): keyof typeof PLACEHOLDER_COLORS {
  const n = name.toLowerCase();
  if (/tree|palm|bush|flower|plant|mushroom|coral|algae/.test(n)) return "nature";
  if (/house|building|shop|hospital|hotel|cabin|stand/.test(n)) return "buildings";
  if (/beach|towel|umbrella|chair|ball/.test(n)) return "beach";
  if (/boat|ship|pontoon|bridge|jetski/.test(n)) return "water";
  if (/bike|car|truck|ramp|race/.test(n)) return "vehicles";
  if (/rock|wall|pillar|ground|pavement|slope|stairs/.test(n)) return "terrain";
  if (/character|npc/.test(n)) return "characters";
  return "props";
}

const placeholderTemplates = new Map<string, THREE.Group>();

function placeholderMesh(asset: string) {
  const category = categoryOf(asset);
  let template = placeholderTemplates.get(category);
  if (!template) {
    const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const material = new THREE.MeshStandardMaterial({
      color: PLACEHOLDER_COLORS[category],
      roughness: 0.62,
      metalness: 0.04,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    mesh.position.y = 0.6;
    template = new THREE.Group();
    template.userData.placeholder = true;
    template.add(mesh);
    placeholderTemplates.set(category, template);
  }
  const clone = template.clone(true);
  clone.userData.placeholder = true;
  return clone;
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string) {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(`${label} timed out`)), ms);
    promise.then(
      (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function mapPool<T>(items: T[], limit: number, worker: (item: T) => Promise<void>) {
  let cursor = 0;
  const run = async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) || 1 }, () => run()));
}

export class AssetLibrary {
  private readonly loader: GLTFLoader;
  private readonly fbx: FBXLoader;
  private readonly catalog = new Map<string, AssetInfo>();
  private readonly templates = new Map<string, Promise<THREE.Object3D>>();
  private readonly resolved = new Map<string, THREE.Object3D>();

  constructor(catalog: AssetInfo[]) {
    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/");
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(draco);
    this.fbx = new FBXLoader();
    this.addAssets(catalog);
  }

  addAssets(catalog: AssetInfo[]) {
    for (const asset of catalog) {
      const previous = this.catalog.get(asset.id);
      this.catalog.set(asset.id, asset);
      if (previous && previous.file !== asset.file) {
        this.templates.delete(asset.id);
        this.resolved.delete(asset.id);
      }
    }
  }

  prime(asset: AssetInfo, root: THREE.Object3D) {
    this.catalog.set(asset.id, asset);
    root.userData.placeholder = false;
    this.resolved.set(asset.id, root);
    this.templates.set(asset.id, Promise.resolve(root));
  }

  fileFor(asset: string) {
    return this.catalog.get(asset)?.file;
  }

  private async loadRoot(asset: string) {
    const info = this.catalog.get(asset);
    const file = info?.file;
    if (!file) {
      const fallback = placeholderMesh(asset);
      fallback.userData.placeholder = true;
      this.resolved.set(asset, fallback);
      return fallback;
    }
    try {
      const format = info?.format ?? (file.toLowerCase().includes(".fbx") ? "fbx" : "glb");
      let root: THREE.Object3D;
      if (format === "fbx") {
        root = await withTimeout(this.fbx.loadAsync(file), 20000, asset);
        if (info?.imported) normalizeImported(root);
      } else {
        const gltf = await withTimeout(this.loader.loadAsync(file), 12000, asset);
        root = gltf.scene;
        if (info?.imported) normalizeImported(root);
      }
      root.userData.placeholder = false;
      root.traverse((node) => {
        const name = (node.name || node.userData?.name || "").toLowerCase();
        if (name.includes("collider") || name.includes("bounds")) {
          node.visible = false;
          return;
        }
        const mesh = node as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = false;
          mesh.receiveShadow = true;
        }
      });
      this.resolved.set(asset, root);
      return root;
    } catch {
      const fallback = placeholderMesh(asset);
      fallback.userData.placeholder = true;
      this.resolved.set(asset, fallback);
      return fallback;
    }
  }

  private loadTemplate(asset: string) {
    const existing = this.templates.get(asset);
    if (existing) return existing;
    const promise = this.loadRoot(asset);
    this.templates.set(asset, promise);
    return promise;
  }

  async preload(assets: string[], onProgress?: (done: number, total: number, asset: string) => void) {
    const unique = [...new Set(assets.filter(Boolean))];
    let done = 0;
    await mapPool(unique, 6, async (asset) => {
      await this.loadTemplate(asset);
      done += 1;
      onProgress?.(done, unique.length, asset);
    });
  }

  isReady(asset: string) {
    const template = this.resolved.get(asset);
    return Boolean(template && !template.userData.placeholder);
  }

  instantiate(asset: string) {
    const template = this.resolved.get(asset);
    if (template) return template.clone(true);
    const fallback = placeholderMesh(asset);
    fallback.userData.placeholder = true;
    return fallback;
  }

  async loadSceneBase(url: string) {
    const gltf = await withTimeout(this.loader.loadAsync(url), 15000, url);
    const group = new THREE.Group();
    gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse((node) => {
      const extras = (node.userData ?? {}) as { type?: string };
      const name = (node.name || "").toLowerCase();
      const isBase = extras.type === "SceneBase" || name === "scenebase";
      if (!isBase) return;
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;
      const cloned = mesh.clone();
      cloned.geometry = mesh.geometry.clone();
      cloned.geometry.applyMatrix4(mesh.matrixWorld);
      cloned.position.set(0, 0, 0);
      cloned.quaternion.identity();
      cloned.scale.set(1, 1, 1);
      cloned.receiveShadow = true;
      cloned.castShadow = false;
      group.add(cloned);
    });
    return group;
  }
}
