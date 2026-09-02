import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { applyGameTransform, GAME_TO_WORLD, readGameTransform, roundTo } from "@/lib/coords";
import { AssetLibrary } from "@/lib/runtime/assets";
import { useEditor } from "@/lib/store";
import type { AssetInfo, EditorObject, SceneData, ToolMode } from "@/lib/types";

const HELPER_COLORS = {
  point: 0x5eead4,
  area: 0xfbbf24,
  actor: 0xf472b6,
};

export let activeViewport: ViewportEngine | null = null;

function setActiveViewport(engine: ViewportEngine | null) {
  activeViewport = engine;
}

export class ViewportEngine {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly island = new THREE.Group();
  readonly helpers = new THREE.Group();
  readonly objects = new Map<string, THREE.Object3D>();
  readonly controls: OrbitControls;
  readonly transform: TransformControls;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly library: AssetLibrary;
  private frame = 0;
  private disposed = false;
  private sceneId: string | null = null;
  private terrain: THREE.Object3D | null = null;
  private water: THREE.Mesh | null = null;
  private grid: THREE.GridHelper;
  private dragging = false;
  private boundResize: () => void;
  private boundPointer = (event: PointerEvent) => this.onPointer(event);
  private boundKey = (event: KeyboardEvent) => this.onKey(event);

  constructor(
    private readonly canvas: HTMLCanvasElement,
    catalog: AssetInfo[],
  ) {
    this.library = new AssetLibrary(catalog);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.setClearColor(0x0b1c28, 1);

    this.camera = new THREE.PerspectiveCamera(50, 1, 0.2, 2500);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(48, -72, 38);

    this.scene.up.set(0, 0, 1);
    this.scene.fog = new THREE.Fog(0x0b1c28, 160, 520);
    this.island.quaternion.copy(GAME_TO_WORLD);
    this.scene.add(this.island);
    this.scene.add(this.helpers);

    const hemi = new THREE.HemisphereLight(0xb6e3ff, 0x3b2a1c, 1.05);
    this.scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff1d6, 1.35);
    sun.position.set(70, -40, 90);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -180;
    sun.shadow.camera.right = 180;
    sun.shadow.camera.top = 180;
    sun.shadow.camera.bottom = -180;
    this.scene.add(sun);

    this.grid = new THREE.GridHelper(400, 80, 0x3d6f7a, 0x1d3a46);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.screenSpacePanning = true;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.target.set(-90, 20, 6);

    this.transform = new TransformControls(this.camera, this.canvas);
    this.transform.setSpace("world");
    this.transform.addEventListener("dragging-changed", (event) => {
      const dragging = Boolean((event as { value: boolean }).value);
      this.dragging = dragging;
      this.controls.enabled = !dragging;
      if (!dragging) this.commitSelected();
    });
    this.transform.addEventListener("objectChange", () => {
      if (!this.snapEnabled()) return;
      const object = this.transform.object;
      if (!object) return;
      const step = useEditor.getState().snapSize;
      object.position.x = roundTo(object.position.x, step);
      object.position.y = roundTo(object.position.y, step);
      object.position.z = roundTo(object.position.z, step);
    });
    this.scene.add(this.transform.getHelper());
    setActiveViewport(this);

    this.boundResize = () => this.resize();
    window.addEventListener("resize", this.boundResize);
    this.canvas.addEventListener("pointerdown", this.boundPointer);
    window.addEventListener("keydown", this.boundKey);
    this.resize();
    this.tick();
  }

  private snapEnabled() {
    return useEditor.getState().snap && useEditor.getState().tool === "translate";
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const width = parent.clientWidth || 1;
    const height = parent.clientHeight || 1;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private tick = () => {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.tick);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private onPointer(event: PointerEvent) {
    if (event.button !== 0 || this.dragging) return;
    if (this.transform.dragging || this.transform.axis) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const meshes: THREE.Object3D[] = [];
    for (const object of this.objects.values()) {
      if (object.visible) meshes.push(object);
    }
    const hits = this.raycaster.intersectObjects(meshes, true);
    const hit = hits.find((item) => {
      let node: THREE.Object3D | null = item.object;
      while (node) {
        if (node.userData.editorId) return true;
        node = node.parent;
      }
      return false;
    });
    if (!hit) {
      if (!event.shiftKey) useEditor.getState().select(null);
      return;
    }
    let node: THREE.Object3D | null = hit.object;
    while (node && !node.userData.editorId) node = node.parent;
    if (node?.userData.editorId) {
      useEditor.getState().select(node.userData.editorId);
    }
  }

  private onKey(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null;
    if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
    const editor = useEditor.getState();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      if (event.shiftKey) editor.redo();
      else editor.undo();
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d") {
      event.preventDefault();
      editor.duplicateSelected();
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      editor.persist();
      return;
    }
    switch (event.key.toLowerCase()) {
      case "q":
        editor.setTool("select");
        break;
      case "w":
        editor.setTool("translate");
        break;
      case "e":
        editor.setTool("rotate");
        break;
      case "r":
        editor.setTool("scale");
        break;
      case "f":
        editor.requestFocus();
        break;
      case "delete":
      case "backspace":
        editor.deleteSelected();
        break;
      case "escape":
        editor.select(null);
        break;
      case "g":
        editor.setSnap(!editor.snap);
        break;
    }
  }

  setTool(tool: ToolMode) {
    if (tool === "select") {
      this.transform.enabled = false;
      this.transform.getHelper().visible = false;
      return;
    }
    this.transform.enabled = true;
    this.transform.getHelper().visible = Boolean(this.transform.object);
    this.transform.setMode(tool);
  }

  setLayers(state: {
    showGrid: boolean;
    showTerrain: boolean;
    showWater: boolean;
    layerProps: boolean;
    layerActors: boolean;
    layerHelpers: boolean;
  }) {
    this.grid.visible = state.showGrid;
    if (this.terrain) this.terrain.visible = state.showTerrain;
    if (this.water) this.water.visible = state.showWater;
    for (const [id, object] of this.objects) {
      const kind = object.userData.kind as EditorObject["kind"];
      if (kind === "prop") object.visible = state.layerProps && object.userData.wantVisible !== false;
      if (kind === "actor") object.visible = state.layerActors && object.userData.wantVisible !== false;
      if (kind === "point" || kind === "area") {
        object.visible = state.layerHelpers && object.userData.wantVisible !== false;
      }
      void id;
    }
  }

  focus(id: string | null) {
    const object = id ? this.objects.get(id) : null;
    if (!object) return;
    const world = new THREE.Vector3();
    object.getWorldPosition(world);
    this.controls.target.copy(world);
    const offset = this.camera.position.clone().sub(this.controls.target);
    if (offset.length() < 4) offset.set(12, -16, 10);
    offset.setLength(Math.max(10, Math.min(offset.length(), 28)));
    this.camera.position.copy(world).add(offset);
  }

  private commitSelected() {
    const object = this.transform.object;
    if (!object?.userData.editorId) return;
    useEditor.getState().commitTransform(object.userData.editorId, readGameTransform(object));
  }

  private helperFor(object: EditorObject) {
    if (object.kind === "point") {
      const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.6, 2.2, 4),
        new THREE.MeshStandardMaterial({ color: HELPER_COLORS.point, emissive: 0x115e59 }),
      );
      mesh.rotation.x = Math.PI;
      mesh.position.y = 1.1;
      const group = new THREE.Group();
      group.add(mesh);
      return group;
    }
    if (object.kind === "area") {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 18, 12),
        new THREE.MeshStandardMaterial({
          color: HELPER_COLORS.area,
          transparent: true,
          opacity: 0.22,
          depthWrite: false,
        }),
      );
      return mesh;
    }
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.45, 1.1, 4, 8),
      new THREE.MeshStandardMaterial({ color: HELPER_COLORS.actor }),
    );
    body.position.y = 1;
    const group = new THREE.Group();
    group.add(body);
    return group;
  }

  private makeNode(object: EditorObject) {
    const root = new THREE.Group();
    root.userData.editorId = object.id;
    root.userData.kind = object.kind;
    root.userData.asset = object.asset;
    root.userData.wantVisible = object.visible;
    applyGameTransform(root, object.transform);
    if (object.kind === "prop" || (object.kind === "actor" && object.asset)) {
      root.add(this.library.instantiate(object.asset));
    } else {
      root.add(this.helperFor(object));
    }
    return root;
  }

  async syncScene(scene: SceneData) {
    const assets = scene.objects.map((item) => item.asset).filter(Boolean);
    await this.library.preload(assets);

    if (this.sceneId !== scene.id) {
      this.clearObjects();
      this.sceneId = scene.id;
      if (this.terrain) {
        this.island.remove(this.terrain);
        this.terrain = null;
      }
      try {
        this.terrain = await this.library.loadSceneBase(scene.glb);
        this.island.add(this.terrain);
      } catch {
        this.terrain = null;
      }
      if (!this.water) {
        const water = new THREE.Mesh(
          new THREE.CircleGeometry(220, 64),
          new THREE.MeshStandardMaterial({
            color: 0x1b7f92,
            roughness: 0.18,
            metalness: 0.12,
            transparent: true,
            opacity: 0.88,
          }),
        );
        water.rotation.x = -Math.PI / 2;
        water.position.y = 0.15;
        this.water = water;
        this.island.add(water);
      }
      const spawn = scene.objects.find((item) => item.kind === "point");
      if (spawn) {
        const world = new THREE.Vector3(
          spawn.transform[0],
          spawn.transform[1],
          spawn.transform[2],
        ).applyQuaternion(GAME_TO_WORLD);
        this.controls.target.copy(world);
        this.camera.position.set(world.x + 28, world.y - 36, world.z + 18);
      }
    }

    const incoming = new Set(scene.objects.map((item) => item.id));
    for (const [id, object] of this.objects) {
      if (!incoming.has(id)) {
        this.island.remove(object);
        this.objects.delete(id);
      }
    }

    for (const object of scene.objects) {
      const existing = this.objects.get(object.id);
      if (!existing) {
        const node = this.makeNode(object);
        this.objects.set(object.id, node);
        this.island.add(node);
        continue;
      }
      existing.userData.wantVisible = object.visible;
      existing.visible = object.visible;
      if (
        existing.userData.asset !== object.asset &&
        object.kind !== "point" &&
        object.kind !== "area"
      ) {
        this.island.remove(existing);
        const node = this.makeNode(object);
        this.objects.set(object.id, node);
        this.island.add(node);
        continue;
      }
      if (!this.dragging || this.transform.object !== existing) {
        applyGameTransform(existing, object.transform);
      }
      existing.userData.asset = object.asset;
    }
  }

  attach(id: string | null, tool: ToolMode) {
    if (!id) {
      this.transform.detach();
      this.transform.getHelper().visible = false;
      return;
    }
    const object = this.objects.get(id);
    if (!object) return;
    this.transform.attach(object);
    this.setTool(tool);
  }

  worldPointInFront() {
    const point = new THREE.Vector3();
    point.copy(this.controls.target);
    return { x: point.x, y: point.y, z: point.z };
  }

  private clearObjects() {
    for (const object of this.objects.values()) this.island.remove(object);
    this.objects.clear();
    this.transform.detach();
  }

  dispose() {
    this.disposed = true;
    if (activeViewport === this) setActiveViewport(null);
    cancelAnimationFrame(this.frame);
    window.removeEventListener("resize", this.boundResize);
    this.canvas.removeEventListener("pointerdown", this.boundPointer);
    window.removeEventListener("keydown", this.boundKey);
    this.controls.dispose();
    this.transform.dispose();
    this.renderer.dispose();
  }
}
