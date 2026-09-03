import { w as watch } from "../../../vendor/vendor.75f6e6ae65453426.js";
import { el, unwrap } from "../dom.js";
import { iconUrl } from "../icons.js";

function flag(value) {
  return !!unwrap(value);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function installHoldRing(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { setProgress() {}, dispose() {} };

  const TAU = Math.PI * 2;
  const START = -Math.PI / 2;
  let cssW = 1;
  let cssH = 1;
  let dpr = 1;
  let pixelW = 1;
  let pixelH = 1;
  let line = 8;
  let progress = 0;
  let gradient = null;

  const paint = (force = false) => {
    if (!force && pixelW < 1) return;
    ctx.clearRect(0, 0, pixelW, pixelH);
    ctx.beginPath();
    ctx.arc(pixelW * 0.5, pixelH * 0.5, 0.5 * (pixelW - line), 0, TAU);
    ctx.closePath();
    ctx.lineWidth = line - 1;
    ctx.lineCap = "round";
    ctx.strokeStyle = gradient || "#05ad90";
    ctx.stroke();
    if (progress > 0) {
      ctx.beginPath();
      ctx.arc(pixelW * 0.5, pixelH * 0.5, 0.5 * (pixelW - line), START, START + TAU * progress);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = line;
      ctx.stroke();
    }
  };

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    cssW = Math.max(1, bounds.width || canvas.parentElement?.clientWidth || 1);
    cssH = Math.max(1, bounds.height || canvas.parentElement?.clientHeight || 1);
    dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    pixelW = canvas.width = cssW * dpr;
    pixelH = canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    line = pixelW / 19;
    ctx.lineCap = "round";
    gradient = ctx.createLinearGradient(0, 0, 0, pixelH);
    gradient.addColorStop(0, "#05ad90");
    gradient.addColorStop(1, "#78e8c8");
    paint(true);
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas.parentElement || canvas);
  resize();

  return {
    setProgress(value) {
      progress = value;
      paint();
    },
    dispose() {
      observer.disconnect();
    },
  };
}

export function installInteraction(app, host) {
  const aside = el("aside", { class: "interaction-button", "data-v-b03f534f": "" });
  aside.style.visibility = "hidden";
  const wrapper = el("div", { class: "wrapper hidden", "data-v-b03f534f": "" });
  const bounce = el("div", { class: "bounce", "data-v-b03f534f": "" });
  const button = el("button", { "data-v-b03f534f": "", type: "button" });
  const icon = el("img", { class: "icon lazy-img loaded", alt: "", draggable: "false" });
  icon.src = iconUrl("interactions-yes") || "";
  const canvas = el("canvas", { "data-v-b03f534f": "" });
  const round = el("figure", { class: "round", "data-v-b03f534f": "" });
  const hint = el("p", { "data-v-b03f534f": "", text: app.$l("cta.interaction.tap") });
  button.append(icon, canvas, round);
  bounce.append(button, hint);
  wrapper.append(bounce);
  aside.append(wrapper);
  host.append(aside);

  const ring = installHoldRing(canvas);
  const noop = () => {};
  const blank = {
    onDone: noop,
    onStart: noop,
    onProgress: noop,
    onStop: noop,
    onTap: noop,
  };
  let action = { active: false, mode: "tap", icon: "interactions-yes", ...blank };
  let speed = 1;
  let lastProgress = -1;
  let progress = 0;
  let velocity = 0;
  let pressed = false;
  let started = false;
  let done = true;
  let keyPressed = false;
  let entering = false;
  let leaving = true;
  let hideToken = 0;
  let skipHideDelay = true;
  const releaseEvents = ["mouseup", "touchend", "touchcancel"];

  const chromeHidden = () => {
    const store = app.$store;
    return flag(store.isDialogVisible)
      || flag(store.isNotHomeDelayed)
      || flag(store.isMenuOpen)
      || flag(app.$notifs?.isOverlayActive)
      || flag(app.$notifs?.isBottomActive)
      || flag(store.isFormOpen)
      || flag(store.isTransitionActive)
      || flag(store.isInteractionDone)
      || flag(store.isApiErrorVisible)
      || Number(unwrap(store.sceneState)) < Number(unwrap(store.sceneStates?.Playing))
      || unwrap(store.currentFullscreenVideo);
  };

  const visible = () => action.active && !done;

  const paintWrapper = () => {
    wrapper.className = [
      "wrapper",
      `mode-${action.mode}`,
      chromeHidden() ? "hidden" : "",
      entering ? "entering" : "",
      leaving ? "leaving" : "",
      progress < 0.1 ? "hintvisible" : "",
    ].filter(Boolean).join(" ");
    button.classList.toggle("keypressed", keyPressed);
    hint.textContent = action.mode === "hold" || action.mode === "hold-infinite"
      ? (app.$device?.type?.mobile ? app.$l("cta.interaction.touch") : app.$l("cta.interaction.click"))
      : app.$l("cta.interaction.tap");
  };

  const stopHold = () => {
    if (!started) return;
    started = false;
    action.onProgress?.(0);
    action.onStop?.();
  };

  const finish = () => {
    releaseHold();
    if (done) return;
    done = true;
    action.onDone?.();
    if (started) stopHold();
    action = { active: false, mode: action.mode, icon: action.icon, ...blank };
    applyActiveVisibility();
  };

  const releaseHold = () => {
    for (const type of releaseEvents) window.removeEventListener(type, onPointerUp, false);
  };

  function onPointerUp(event) {
    releaseHold();
    pressed = false;
    if (action.mode !== "click") event.preventDefault();
  }

  const onPointerDown = (event) => {
    if (leaving) return;
    const mode = action.mode;
    if (mode === "click") return;
    event.preventDefault();
    if (mode === "hold" || mode === "hold-infinite") {
      for (const type of releaseEvents) window.addEventListener(type, onPointerUp, false);
    }
    if (!pressed && mode === "tap") action.onTap?.();
    pressed = true;
  };

  const onClick = () => {
    if (leaving) return;
    if (action.mode === "click") finish();
  };

  const onKeyDown = (event) => {
    if (chromeHidden() || !visible() || leaving) return;
    if (event.code !== "Space" && event.code !== "Enter") return;
    event.preventDefault();
    event.stopPropagation();
    if (action.mode === "click") {
      finish();
      return;
    }
    if (action.mode === "tap" && !keyPressed) action.onTap?.();
    pressed = true;
    keyPressed = true;
    paintWrapper();
  };

  const onKeyUp = (event) => {
    if (chromeHidden() || !visible() || leaving) return;
    if (event.code !== "Space" && event.code !== "Enter") return;
    if (!keyPressed) return;
    event.preventDefault();
    event.stopPropagation();
    pressed = false;
    keyPressed = false;
    paintWrapper();
  };

  const bindKeys = () => {
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("keyup", onKeyUp, true);
  };

  const unbindKeys = () => {
    keyPressed = false;
    window.removeEventListener("keydown", onKeyDown, true);
    window.removeEventListener("keyup", onKeyUp, true);
  };

  const tick = () => {
    if (done) return;
    const mode = action.mode;
    const dt = Number(app.$webgl?.time?.dt || 16.67);
    const infinite = mode === "hold-infinite";
    if (mode === "click") return;
    if (mode === "hold" || infinite) {
      const step = dt * speed;
      if (pressed) {
        if (velocity < 0) velocity = 0;
        velocity = Math.min(0.05, 1.01 * velocity + 7e-6 * step);
      } else {
        velocity *= velocity > 0 ? 0.8 : 1.02;
        velocity = Math.max(-0.1, velocity - 1e-5 * step);
      }
    } else if (mode === "tap") {
      if (progress > 0.98) progress = 1;
      if (pressed) {
        velocity = 0.02 * speed;
        pressed = false;
      } else {
        velocity *= velocity > 0 ? 0.7 : 1.02;
        velocity = Math.max(-0.005, velocity - 3e-6 * dt);
      }
    }
    if (progress <= 1e-5 && velocity <= -0.05) return;
    progress = clamp(progress + velocity, 0, infinite ? 0.22 : 1);
    if (!infinite || progress < 1e-5) ring.setProgress(progress);
    if (!started && progress > 0) {
      started = true;
      action.onStart?.();
    }
    if (lastProgress !== progress) {
      lastProgress = progress;
      action.onProgress?.(progress);
    }
    if (started && progress <= 0) stopHold();
    if (progress >= 1) finish();
    paintWrapper();
  };

  const show = (next) => {
    releaseHold();
    if (next && !next.locked) {
      action = { active: true, mode: "tap", icon: "interactions-yes", ...blank, ...next };
      icon.src = iconUrl(action.icon || "interactions-yes") || icon.src;
      lastProgress = -1;
      progress = 0;
      velocity = 0;
      started = false;
      done = false;
      pressed = false;
      keyPressed = false;
      leaving = false;
      ring.setProgress(0);
      speed = next.speed || 1;
    } else {
      action = { active: false, mode: action.mode || "tap", icon: action.icon, ...blank };
      done = true;
    }
    applyActiveVisibility();
  };

  const applyActiveVisibility = () => {
    paintWrapper();
    const showButton = visible();
    if (showButton) {
      entering = true;
      leaving = false;
      app.$store.isInteractionButtonVisible = true;
      aside.style.visibility = "visible";
      skipHideDelay = false;
      bindKeys();
      paintWrapper();
      return;
    }
    const token = ++hideToken;
    entering = false;
    leaving = true;
    unbindKeys();
    paintWrapper();
    const hide = async () => {
      if (!skipHideDelay) await new Promise((resolve) => window.setTimeout(resolve, 600));
      if (token !== hideToken || !leaving) return;
      app.$store.isInteractionButtonVisible = false;
      if (!skipHideDelay) await new Promise((resolve) => window.setTimeout(resolve, 900));
      skipHideDelay = false;
      if (token !== hideToken || !leaving) return;
      aside.style.visibility = "hidden";
    };
    hide();
  };

  button.addEventListener("mousedown", onPointerDown);
  button.addEventListener("touchstart", onPointerDown, { passive: false });
  button.addEventListener("click", onClick);

  watch(() => chromeHidden(), paintWrapper, { immediate: true });
  applyActiveVisibility();

  const bindSignal = () => {
    const signal = app.$webgl?.store?.interactionButton;
    if (!signal?.watchImmediate) return false;
    signal.watchImmediate(show);
    const hooks = app.$webgl?.hooks?.beforeFrame;
    if (hooks?.watch) hooks.watch(tick);
    else {
      const loop = () => {
        tick();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
    return true;
  };
  if (!bindSignal()) {
    const timer = window.setInterval(() => {
      if (bindSignal()) window.clearInterval(timer);
    }, 200);
  }
}
