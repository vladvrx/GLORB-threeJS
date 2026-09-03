import { w as watch } from "../../vendor/vendor.75f6e6ae65453426.js";
import { circleButton, unwrap } from "./dom.js";

const HIP_SPREAD = 1.05;
const KNEE_BEND = 0.22;
const MIN_AIR_MS = 180;
const MAX_AIR_MS = 2200;
const FLOOR_LEAVE = 0.22;
const FLOOR_LAND = 0.14;

function flag(value) {
  return !!unwrap(value);
}

export function getIslandPlayer(app) {
  const scenes = app?.$webgl?.scenes;
  return scenes?.current?.player || scenes?.list?.IslandWest?.player || null;
}

function typingTarget(event) {
  const node = event.target;
  if (!node || node === document.body || node === document.documentElement) return false;
  const tag = node.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return !!node.isContentEditable;
}

function playBlocked(app) {
  const store = app.$store;
  if (!store) return true;
  if (flag(store.isDialogVisible)) return true;
  if (flag(store.isCustomizeOpen)) return true;
  if (flag(store.isTransitionActive)) return true;
  if (flag(store.isOverlayVisible)) return true;
  if (flag(store.isApiErrorVisible)) return true;
  if (flag(store.isCinematicActive)) return true;
  if (flag(store.isMenuOpen)) return true;
  return false;
}

function findBone(bones, suffix) {
  for (let i = 0; i < bones.length; i += 1) {
    const bone = bones[i];
    if (bone?.name?.endsWith(suffix)) return bone;
  }
  return null;
}

function jumpBones(player) {
  if (player.__jumpBones) return player.__jumpBones;
  const bones = player.mesh?.skeleton?.bones;
  if (!bones?.length) return null;
  const map = {
    hipL: findBone(bones, "Hip_L"),
    hipR: findBone(bones, "Hip_R"),
    kneeL: findBone(bones, "Knee_L"),
    kneeR: findBone(bones, "Knee_R"),
  };
  if (!map.hipL || !map.hipR) return null;
  player.__jumpBones = map;
  return map;
}

function applyStarPose(player, amount) {
  if (amount <= 0) return;
  const bones = jumpBones(player);
  if (!bones) return;
  const spread = HIP_SPREAD * amount;
  const bend = KNEE_BEND * amount;
  bones.hipL.rotateY(spread);
  bones.hipR.rotateY(-spread);
  if (bones.kneeL) bones.kneeL.rotateX(-bend);
  if (bones.kneeR) bones.kneeR.rotateX(-bend);
}

function hookPlayer(player, state) {
  if (!player || player.__jumpHooked) return;
  player.__jumpHooked = true;
  const trigger = player.triggerUpdate?.bind(player);
  if (trigger) {
    player.triggerUpdate = function jumpTriggerUpdate() {
      if (state.airborne) {
        this.timeNotOnFloor = 2000;
        this.isOnFloorDebounced = false;
      }
      trigger();
    };
  }
  const after = player.afterUpdate?.bind(player);
  if (after) {
    player.afterUpdate = function jumpAfterUpdate() {
      if (state.pendingImpulse && this.joystick) this.joystick.direction.y = 1;
      after();
      if (state.pendingImpulse) {
        if (this.joystick) {
          this.joystick.direction.y = 0;
          this.joystick.directionTarget.y = 0;
        }
        state.pendingImpulse = false;
      }
      tickJump(this, state);
    };
  }
}

function tickJump(player, state) {
  const physics = player.scene?.physics;
  if (!physics) return;
  const dist = Number(physics.playerDistanceFromFloor || 0);
  const now = performance.now();
  if (state.airborne) {
    if (!state.leftFloor && dist > FLOOR_LEAVE) state.leftFloor = true;
    const elapsed = now - state.startedAt;
    if (state.leftFloor && dist < FLOOR_LAND && elapsed > MIN_AIR_MS) {
      state.airborne = false;
      state.leftFloor = false;
    } else if (elapsed > MAX_AIR_MS) {
      state.airborne = false;
      state.leftFloor = false;
    }
  }
  const dt = Number(player.webgl?.time?.dt || 16.67);
  const target = state.airborne ? 1 : 0;
  const rate = state.airborne ? 0.32 : 0.2;
  state.pose += (target - state.pose) * Math.min(1, rate * (dt / 16.67));
  if (state.pose < 0.01 && !state.airborne) {
    state.pose = 0;
    return;
  }
  applyStarPose(player, state.pose);
}

export function tryJump(app) {
  const state = app.__jumpState;
  if (!state) return false;
  if (playBlocked(app)) return false;
  const player = getIslandPlayer(app);
  if (!player) return false;
  hookPlayer(player, state);
  if (!player.canMove || player.hidden) return false;
  if (state.airborne || state.pendingImpulse) return false;
  const physics = player.scene?.physics;
  if (!physics || physics.takeOver?.active) return false;
  const dist = Number(physics.playerDistanceFromFloor || 0);
  if (dist > 0.2 && !physics.playerIsCollidingGround) return false;
  state.pendingImpulse = true;
  state.airborne = true;
  state.leftFloor = false;
  state.startedAt = performance.now();
  player.timeNotOnFloor = 2000;
  player.isOnFloorDebounced = false;
  return true;
}

export function installJump(app) {
  if (app.__jumpState) return app.__tryJump;
  const state = {
    pendingImpulse: false,
    airborne: false,
    leftFloor: false,
    startedAt: 0,
    pose: 0,
  };
  app.__jumpState = state;
  const jump = () => tryJump(app);
  app.__tryJump = jump;

  const onKeyDown = (event) => {
    if (event.code !== "Space" && event.key !== " ") return;
    if (event.repeat) return;
    if (typingTarget(event)) return;
    if (playBlocked(app)) return;
    event.preventDefault();
    jump();
  };
  window.addEventListener("keydown", onKeyDown);

  const attach = () => {
    const player = getIslandPlayer(app);
    if (player) hookPlayer(player, state);
  };
  attach();
  const timer = window.setInterval(attach, 400);
  watch(() => {
    const scenes = app.$webgl?.scenes;
    return unwrap(scenes?.currentSceneID) || scenes?.current?.id || null;
  }, () => {
    state.airborne = false;
    state.leftFloor = false;
    state.pendingImpulse = false;
    state.pose = 0;
    attach();
  });
  window.addEventListener("beforeunload", () => window.clearInterval(timer));

  return jump;
}

export function installJumpButton(app, host) {
  const jump = app.__tryJump || installJump(app);
  const wrap = document.createElement("div");
  wrap.className = "jump-button";
  wrap.setAttribute("data-jump-button", "");
  const button = circleButton({
    label: "Jump",
    icon: "jump",
    tone: "white",
    extraClass: "pointer sm jump-circle",
    onClick: (event) => {
      event.preventDefault();
      jump();
    },
  });
  button.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    jump();
  });
  wrap.append(button);
  host.append(wrap);

  const visible = () => {
    const store = app.$store;
    const sceneState = unwrap(store.sceneState);
    const playing = unwrap(store.sceneStates?.Playing);
    return flag(store.isHeaderVisible)
      && !flag(store.isTransitionActive)
      && !flag(store.isMenuOpen)
      && !flag(store.isCustomizeOpen)
      && !flag(store.isDialogVisible)
      && !flag(store.isApiErrorVisible)
      && !flag(store.isOverlayVisible)
      && Number(sceneState) >= Number(playing)
      && !flag(store.isTelescopeActiveDelayed)
      && !unwrap(store.currentFullscreenVideo)
      && !flag(store.isCinematicActive);
  };

  watch(
    () => [
      app.$route?.name,
      unwrap(app.$store.sceneState),
      unwrap(app.$store.sceneStates?.Playing),
      flag(app.$store.isHeaderVisible),
      flag(app.$store.isTransitionActive),
      flag(app.$store.isMenuOpen),
      flag(app.$store.isCustomizeOpen),
      flag(app.$store.isDialogVisible),
      flag(app.$store.isApiErrorVisible),
      flag(app.$store.isOverlayVisible),
      flag(app.$store.isTelescopeActiveDelayed),
      unwrap(app.$store.currentFullscreenVideo),
      flag(app.$store.isCinematicActive),
    ],
    () => {
      const show = visible();
      wrap.classList.toggle("is-visible", show);
      wrap.toggleAttribute("hidden", !show);
      button.inert = !show;
    },
    { immediate: true },
  );
}
