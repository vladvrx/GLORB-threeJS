import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { applyGameTransform, GAME_TO_WORLD, readGameTransform, roundTo } from "@/lib/coords";
import { AssetLibrary } from "@/lib/runtime/assets";
import { resolveActorDialog } from "@/lib/play";
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
  private syncToken = 0;
  private playing = false;
  private player: THREE.Group | null = null;
  private readonly keys = new Set<string>();
  private yaw = 0;
  private pitch = 0.42;
  private vz = 0;
  private lastNearby = "";
  private grounded = true;
  private readonly clock = new THREE.Clock();
  private savedCam = new THREE.Vector3();
  private savedTarget = new THREE.Vector3();
  private boundResize: () => void;
  private boundPointer = (event: PointerEvent) => this.onPointer(event);
  private boundKey = (event: KeyboardEvent) => this.onKey(event);
  private boundKeyUp = (event: KeyboardEvent) => this.onKeyUp(event);
  private boundMouse = (event: MouseEvent) => this.onMouseMove(event);

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
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
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
    window.addEventListener("keyup", this.boundKeyUp);
    window.addEventListener("mousemove", this.boundMouse);
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

  registerAssets(catalog: AssetInfo[]) {
    this.library.addAssets(catalog);
  }

  primeAsset(asset: AssetInfo, root: THREE.Object3D) {
    this.library.prime(asset, root);
  }

  private tick = () => {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.tick);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    if (this.playing) this.updatePlay(dt);
    else this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private onPointer(event: PointerEvent) {
    if (this.playing) {
      if (event.button === 0) void this.canvas.requestPointerLock();
      return;
    }
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

  private onKeyUp(event: KeyboardEvent) {
    this.keys.delete(event.key.toLowerCase());
    if (event.code === "Space") this.keys.delete("space");
    if (event.key === "Shift") this.keys.delete("shift");
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.playing || document.pointerLockElement !== this.canvas) return;
    this.yaw -= event.movementX * 0.0024;
    this.pitch = THREE.MathUtils.clamp(this.pitch - event.movementY * 0.002, 0.08, 1.15);
  }

  private onKey(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null;
    if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
    const editor = useEditor.getState();
    this.keys.add(event.key.toLowerCase());
    if (event.code === "Space") this.keys.add("space");
    if (event.key === "Shift") this.keys.add("shift");

    if (editor.playing) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (editor.playDialog) editor.closePlayDialog();
        else editor.stopPlay();
      }
      if (event.key.toLowerCase() === "e") {
        event.preventDefault();
        editor.playInteract();
      }
      if (event.code === "Space") {
        event.preventDefault();
        if (editor.playDialog) editor.playAdvance();
      }
      return;
    }
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
    this.grid.visible = this.playing ? false : state.showGrid;
    if (this.terrain) this.terrain.visible = state.showTerrain;
    if (this.water) this.water.visible = state.showWater;
    for (const [id, object] of this.objects) {
      const kind = object.userData.kind as EditorObject["kind"];
      if (kind === "prop") object.visible = state.layerProps && object.userData.wantVisible !== false;
      if (kind === "actor") object.visible = state.layerActors && object.userData.wantVisible !== false;
      if (kind === "point" || kind === "area") {
        object.visible = this.playing ? false : state.layerHelpers && object.userData.wantVisible !== false;
      }
      void id;
    }
  }

  enterPlay() {
    const editor = useEditor.getState();
    const scene = editor.project?.scenes[editor.project.activeSceneId];
    if (!scene) return;
    this.playing = true;
    this.keys.clear();
    this.vz = 0;
    this.pitch = 0.42;
    this.savedCam.copy(this.camera.position);
    this.savedTarget.copy(this.controls.target);
    this.controls.enabled = false;
    this.transform.detach();
    this.transform.getHelper().visible = false;
    this.grid.visible = false;
    if (this.player) this.scene.remove(this.player);

    const player = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.42, 1.05, 4, 10),
      new THREE.MeshStandardMaterial({ color: 0x7ae0b8, roughness: 0.45 }),
    );
    body.rotation.x = Math.PI / 2;
    body.position.z = 0.95;
    player.add(body);
    const spawn =
      scene.objects.find((item) => item.kind === "point" && /spawn/i.test(item.name)) ??
      scene.objects.find((item) => item.kind === "point");
    if (spawn) {
      const world = new THREE.Vector3(spawn.transform[0], spawn.transform[1], spawn.transform[2]).applyQuaternion(
        GAME_TO_WORLD,
      );
      player.position.copy(world);
      player.position.z += 0.2;
    } else {
      player.position.copy(this.controls.target);
      player.position.z += 1;
    }
    this.player = player;
    this.scene.add(player);
    this.setLayers({
      showGrid: false,
      showTerrain: editor.showTerrain,
      showWater: editor.showWater,
      layerProps: true,
      layerActors: true,
      layerHelpers: false,
    });
    this.updatePlay(0);
  }

  exitPlay() {
    if (!this.playing && !this.player) return;
    this.playing = false;
    this.keys.clear();
    if (this.player) {
      this.scene.remove(this.player);
      this.player = null;
    }
    if (document.pointerLockElement === this.canvas) document.exitPointerLock();
    this.controls.enabled = true;
    this.camera.position.copy(this.savedCam);
    this.controls.target.copy(this.savedTarget);
    const editor = useEditor.getState();
    this.setLayers({
      showGrid: editor.showGrid,
      showTerrain: editor.showTerrain,
      showWater: editor.showWater,
      layerProps: editor.layerProps,
      layerActors: editor.layerActors,
      layerHelpers: editor.layerHelpers,
    });
  }

  private updatePlay(dt: number) {
    const player = this.player;
    if (!player) return;
    const editor = useEditor.getState();
    const locked = Boolean(editor.playDialog);
    const sprint = this.keys.has("shift");
    const speed = (sprint ? 14 : 7.2) * dt;
    let moveX = 0;
    let moveY = 0;
    if (!locked) {
      if (this.keys.has("w")) {
        moveX += Math.sin(this.yaw);
        moveY += Math.cos(this.yaw);
      }
      if (this.keys.has("s")) {
        moveX -= Math.sin(this.yaw);
        moveY -= Math.cos(this.yaw);
      }
      if (this.keys.has("a")) {
        moveX -= Math.cos(this.yaw);
        moveY += Math.sin(this.yaw);
      }
      if (this.keys.has("d")) {
        moveX += Math.cos(this.yaw);
        moveY -= Math.sin(this.yaw);
      }
    }
    const length = Math.hypot(moveX, moveY);
    if (length > 0) {
      player.position.x += (moveX / length) * speed;
      player.position.y += (moveY / length) * speed;
    }

    this.vz -= 28 * dt;
    if (!locked && this.keys.has("space") && this.grounded) {
      this.vz = 8.2;
      this.grounded = false;
    }
    player.position.z += this.vz * dt;

    const origin = player.position.clone();
    origin.z += 2.4;
    this.raycaster.set(origin, new THREE.Vector3(0, 0, -1));
    const ground: THREE.Object3D[] = [];
    if (this.terrain) ground.push(this.terrain);
    if (this.water) ground.push(this.water);
    const hits = ground.length ? this.raycaster.intersectObjects(ground, true) : [];
    const floor = hits[0]?.point.z ?? 0.15;
    if (player.position.z <= floor + 0.02) {
      player.position.z = floor + 0.02;
      this.vz = 0;
      this.grounded = true;
    }

    const dist = 7.4;
    this.camera.position.set(
      player.position.x + Math.sin(this.yaw) * Math.cos(this.pitch) * dist,
      player.position.y - Math.cos(this.yaw) * Math.cos(this.pitch) * dist,
      player.position.z + Math.sin(this.pitch) * dist + 1.4,
    );
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt(player.position.x, player.position.y, player.position.z + 1.15);
    this.controls.target.copy(player.position);

    const nearby = this.findNearbyActor();
    const signature = nearby ? `${nearby.objectId}:${nearby.scriptId ?? ""}` : "";
    if (signature !== this.lastNearby) {
      this.lastNearby = signature;
      editor.setPlayNearby(nearby);
    }
  }

  private findNearbyActor() {
    const player = this.player;
    const project = useEditor.getState().project;
    if (!player || !project) return null;
    let best: { objectId: string; name: string; scriptId: string | null; dist: number } | null = null;
    const here = new THREE.Vector3();
    for (const object of this.objects.values()) {
      if (object.userData.kind !== "actor") continue;
      object.getWorldPosition(here);
      const dist = here.distanceTo(player.position);
      if (dist > 4.2) continue;
      const sceneObject = project.scenes[project.activeSceneId]?.objects.find((item) => item.id === object.userData.editorId);
      if (!sceneObject) continue;
      const script = resolveActorDialog(project, sceneObject);
      const candidate = {
        objectId: sceneObject.id,
        name: sceneObject.name,
        scriptId: script?.id ?? null,
        dist,
      };
      if (!best || candidate.dist < best.dist) best = candidate;
    }
    if (!best) return null;
    return { objectId: best.objectId, name: best.name, scriptId: best.scriptId };
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
    this.setVisual(root, object);
    return root;
  }

  private setVisual(root: THREE.Object3D, object: EditorObject) {
    while (root.children.length > 0) root.remove(root.children[0]);
    if (object.kind === "prop" || (object.kind === "actor" && object.asset)) {
      root.add(this.library.instantiate(object.asset));
    } else {
      root.add(this.helperFor(object));
    }
    root.userData.readyAsset = this.library.isReady(object.asset) ? object.asset : "";
  }

  applyLiveTransforms(scene: SceneData) {
    if (this.sceneId !== scene.id) return;
    for (const object of scene.objects) {
      const existing = this.objects.get(object.id);
      if (!existing) continue;
      existing.userData.wantVisible = object.visible;
      existing.visible = object.visible;
      if (this.dragging && this.transform.object === existing) continue;
      applyGameTransform(existing, object.transform);
    }
  }

  async syncScene(
    scene: SceneData,
    onProgress?: (message: string) => void,
  ) {
    const token = ++this.syncToken;
    const stillCurrent = () => !this.disposed && this.syncToken === token;
    const yieldFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    if (this.sceneId !== scene.id) {
      this.clearObjects();
      this.sceneId = scene.id;
      if (this.terrain) {
        this.island.remove(this.terrain);
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
      void this.loadTerrain(scene, token);
    }

    const incoming = new Set(scene.objects.map((item) => item.id));
    for (const [id, object] of this.objects) {
      if (!incoming.has(id)) {
        this.island.remove(object);
        this.objects.delete(id);
      }
    }

    let added = 0;
    for (const object of scene.objects) {
      const existing = this.objects.get(object.id);
      if (!existing) {
        const node = this.makeNode(object);
        this.objects.set(object.id, node);
        this.island.add(node);
        added += 1;
        if (added % 40 === 0) {
          onProgress?.(`Placing ${this.objects.size}/${scene.objects.length}`);
          await yieldFrame();
          if (!stillCurrent()) return;
        }
        continue;
      }
      existing.userData.wantVisible = object.visible;
      existing.visible = object.visible;
      if (
        existing.userData.asset !== object.asset &&
        object.kind !== "point" &&
        object.kind !== "area"
      ) {
        existing.userData.asset = object.asset;
        this.setVisual(existing, object);
        continue;
      }
      if (!this.dragging || this.transform.object !== existing) {
        applyGameTransform(existing, object.transform);
      }
      existing.userData.asset = object.asset;
    }

    onProgress?.("Loading models…");
    void this.hydrateModels(scene, token, onProgress);
  }

  private async loadTerrain(scene: SceneData, token: number) {
    try {
      const terrain = await this.library.loadSceneBase(scene.glb);
      if (this.disposed || this.syncToken !== token || this.sceneId !== scene.id) return;
      if (this.terrain) this.island.remove(this.terrain);
      this.terrain = terrain;
      this.island.add(terrain);
    } catch (error) {
      console.warn("Terrain failed to load", error);
    }
  }

  private async hydrateModels(
    scene: SceneData,
    token: number,
    onProgress?: (message: string) => void,
  ) {
    const stillCurrent = () => !this.disposed && this.syncToken === token;
    const yieldFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const assets = [...new Set(scene.objects.map((item) => item.asset).filter(Boolean))];
    await this.library.preload(assets, (loaded, total) => {
      if (stillCurrent()) onProgress?.(`Loading models ${loaded}/${total}`);
    });
    if (!stillCurrent()) return;

    let upgraded = 0;
    for (const object of scene.objects) {
      if (!stillCurrent()) return;
      if (!object.asset || !this.library.isReady(object.asset)) continue;
      const node = this.objects.get(object.id);
      if (!node || node.userData.readyAsset === object.asset) continue;
      this.setVisual(node, object);
      upgraded += 1;
      if (upgraded % 24 === 0) await yieldFrame();
    }
    if (stillCurrent()) onProgress?.("");
  }

  attach(id: string | null, tool: ToolMode) {
    if (this.playing) return;
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
    window.removeEventListener("keyup", this.boundKeyUp);
    window.removeEventListener("mousemove", this.boundMouse);
    this.controls.dispose();
    this.transform.dispose();
    this.renderer.dispose();
  }
}
