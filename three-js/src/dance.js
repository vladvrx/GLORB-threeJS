import { w as watch } from "../../vendor/vendor.75f6e6ae65453426.js";
import { circleButton, unwrap } from "./dom.js";
import { getIslandPlayer } from "./jump.js?v=jump-6";

function flag(value) {
  return !!unwrap(value);
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
  if (document.documentElement.classList.contains("paint-complete")) return true;
  return false;
}

function stillJoystick(player) {
  const stick = player?.joystick;
  if (!stick) return;
  stick.active = false;
  if (stick.direction?.setScalar) stick.direction.setScalar(0);
  if (stick.directionTarget?.setScalar) stick.directionTarget.setScalar(0);
}

function keepAction(player) {
  if (!player) return;
  const clip = player.animation?.animationID || player.currentAnimation;
  if (clip !== "Action" && clip !== "JetpackAction") {
    if (typeof player.actionStart === "function") player.actionStart("Default");
    else player.setAnimation?.("Action");
  }
}

function hookPlayer(player, state) {
  if (!player || player.__danceHooked) return;
  player.__danceHooked = true;
  const after = player.afterUpdate?.bind(player);
  if (!after) return;
  player.afterUpdate = function danceAfterUpdate() {
    if (state.holding) stillJoystick(this);
    after();
    if (state.holding) {
      stillJoystick(this);
      keepAction(this);
    }
  };
}

function paintHoldUi(holding) {
  const wrap = document.querySelector("#threejs-hud .dance-button");
  if (!wrap) return;
  wrap.classList.toggle("is-held", holding);
  const button = wrap.querySelector("button");
  if (button) button.setAttribute("aria-pressed", holding ? "true" : "false");
}

export function startDance(app) {
  const state = app.__danceState;
  if (!state) return false;
  if (playBlocked(app)) return false;
  const player = getIslandPlayer(app);
  if (!player || player.hidden) return false;
  hookPlayer(player, state);
  if (state.holding) {
    keepAction(player);
    paintHoldUi(true);
    return true;
  }
  stillJoystick(player);
  if (typeof player.actionStart === "function") player.actionStart("Default");
  else player.setAnimation?.("Action");
  state.holding = true;
  paintHoldUi(true);
  return true;
}

export function stopDance(app) {
  const state = app.__danceState;
  if (!state?.holding) {
    paintHoldUi(false);
    return false;
  }
  state.holding = false;
  paintHoldUi(false);
  const player = getIslandPlayer(app);
  if (!player) return true;
  if (app.__paintState?.complete) return true;
  if (typeof player.actionDone === "function") player.actionDone();
  else player.setIdleAnimation?.();
  return true;
}

export function installDance(app) {
  if (app.__danceState) return app.__tryDance;
  const state = { holding: false };
  app.__danceState = state;
  const start = () => startDance(app);
  const stop = () => stopDance(app);
  app.__tryDance = start;
  app.__stopDance = stop;

  const onKeyDown = (event) => {
    if (event.code !== "KeyE" && event.key !== "e" && event.key !== "E") return;
    if (event.repeat) return;
    if (typingTarget(event)) return;
    if (playBlocked(app)) return;
    event.preventDefault();
    start();
  };
  const onKeyUp = (event) => {
    if (event.code !== "KeyE" && event.key !== "e" && event.key !== "E") return;
    event.preventDefault();
    stop();
  };
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", stop);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });

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
    stop();
    attach();
  });
  window.addEventListener("beforeunload", () => window.clearInterval(timer));

  return start;
}

export function installDanceButton(app, host) {
  const start = app.__tryDance || installDance(app);
  const stop = app.__stopDance || (() => stopDance(app));
  const wrap = document.createElement("div");
  wrap.className = "dance-button";
  wrap.setAttribute("data-dance-button", "");
  const button = circleButton({
    label: "Dance",
    icon: "dance",
    tone: "white",
    extraClass: "pointer sm dance-circle",
  });
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  button.addEventListener("contextmenu", (event) => event.preventDefault());
  button.addEventListener("pointerdown", (event) => {
    if (event.button > 0) return;
    event.preventDefault();
    event.stopPropagation();
    try {
      button.setPointerCapture(event.pointerId);
    } catch {
      /* capture is optional */
    }
    const held = start();
    if (!held) {
      try {
        button.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    }
  });
  const release = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    stop();
  };
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("lostpointercapture", () => {
    if (app.__danceState?.holding) release();
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
      if (!show) release();
    },
    { immediate: true },
  );
}
