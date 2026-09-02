import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
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

function placeholderMesh(asset: string) {
  const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
  const material = new THREE.MeshStandardMaterial({
    color: PLACEHOLDER_COLORS[categoryOf(asset)],
    roughness: 0.62,
    metalness: 0.04,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.y = 0.6;
  const group = new THREE.Group();
  group.add(mesh);
  return group;
}

export class AssetLibrary {
  private readonly loader: GLTFLoader;
  private readonly catalog = new Map<string, AssetInfo>();
  private readonly templates = new Map<string, Promise<THREE.Object3D>>();
  private readonly resolved = new Map<string, THREE.Object3D>();

  constructor(catalog: AssetInfo[]) {
    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/");
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(draco);
    for (const asset of catalog) this.catalog.set(asset.id, asset);
  }

  fileFor(asset: string) {
    return this.catalog.get(asset)?.file;
  }

  private loadTemplate(asset: string) {
    const existing = this.templates.get(asset);
    if (existing) return existing;

    const file = this.fileFor(asset);
    const promise = (async () => {
      if (!file) {
        const fallback = placeholderMesh(asset);
        this.resolved.set(asset, fallback);
        return fallback;
      }
      try {
        const gltf = await this.loader.loadAsync(file);
        const root = gltf.scene;
        root.traverse((node) => {
          const name = (node.name || node.userData?.name || "").toLowerCase();
          if (name.includes("collider") || name.includes("bounds")) {
            node.visible = false;
            return;
          }
          const mesh = node as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = !/tree|bush|flower/.test(asset.toLowerCase());
            mesh.receiveShadow = true;
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((material) => {
                material.side = THREE.DoubleSide;
              });
            } else if (mesh.material) {
              mesh.material.side = THREE.DoubleSide;
            }
          }
        });
        this.resolved.set(asset, root);
        return root;
      } catch {
        const fallback = placeholderMesh(asset);
        this.resolved.set(asset, fallback);
        return fallback;
      }
    })();

    this.templates.set(asset, promise);
    return promise;
  }

  async preload(assets: string[]) {
    await Promise.all(assets.filter(Boolean).map((asset) => this.loadTemplate(asset)));
  }

  instantiate(asset: string) {
    const template = this.resolved.get(asset) ?? placeholderMesh(asset);
    return template.clone(true);
  }

  async loadSceneBase(url: string) {
    const gltf = await this.loader.loadAsync(url);
    const group = new THREE.Group();
    gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse((node) => {
      const name = (node.name || "").toLowerCase();
      const extras = (node.userData ?? {}) as { type?: string };
      const isBase =
        extras.type === "SceneBase" || name.endsWith("scenebase") || name.endsWith("base");
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
