import { s as createSpring, w as watch } from "../../../vendor/vendor.75f6e6ae65453426.js";
import { circleButton, ctaButton, el, lazyImg, playUiSound, svgIcon, unwrap } from "../dom.js";
import { iconUrl } from "../icons.js";

function flag(value) {
  return !!unwrap(value);
}

function canOpenMenu(app) {
  const store = app.$store;
  const playing = unwrap(store.sceneStates?.Playing);
  const state = unwrap(store.sceneState);
  return Number(state) >= Number(playing)
    && !flag(store.isDialogVisible)
    && !flag(store.isTransitionActive)
    && !flag(store.isCinematicActive);
}

function installSoundButton(app, { tone, extraClass = "" } = {}) {
  const button = circleButton({
    label: app.$l("arialabel.sound"),
    icon: flag(app.$store.isAudioMuted) ? "sound-off" : "sound-on",
    tone,
    extraClass: `pointer sound-toggle ${extraClass}`.trim(),
    onClick: () => {
      app.$store.isAudioMuted = !flag(app.$store.isAudioMuted);
    },
  });
  button.setAttribute("data-sound-toggle", "");
  const paint = () => {
    const muted = flag(app.$store.isAudioMuted);
    const wrap = el("div", { class: "sound", "data-v-272a9e1b": "", "data-v-1a897dbc": "" });
    wrap.append(svgIcon(muted ? "sound-off" : "sound-on"));
    const content = button.querySelector(".button-content");
    content.replaceChildren(wrap);
    button.classList.toggle("muted", muted);
    button.setAttribute("aria-pressed", muted ? "true" : "false");
  };
  watch(() => flag(app.$store.isAudioMuted), paint, { immediate: true });
  return button;
}

function installHeader(app, host) {
  const header = el("header", { class: "app-header", "data-v-08688f2d": "" });
  const logo = el("div", {
    class: "logo white pointer",
    "data-v-08688f2d": "",
    tabindex: "-1",
    onClick: () => {
      if (!canOpenMenu(app)) return;
      app.$store.isMenuOpen = true;
    },
  });
  logo.append(el("img", { src: "./reference/assets/databeach-logo.png?v=glorb", alt: "glorb", class: "logo-mark", width: "1515", height: "563" }));
  const buttons = el("div", { class: "buttons", "data-v-08688f2d": "" });
  buttons.append(
    circleButton({
      label: app.$l("arialabel.customize"),
      icon: "profile",
      tone: "bordered",
      extraClass: "pointer",
      onClick: () => {
        playUiSound(app, "sfx_phone_click_soft");
        app.$store.isCustomizeOpen = true;
        app.$router.push({ name: "Customize" });
      },
    }),
    installSoundButton(app, { tone: "bordered" }),
  );
  for (const node of buttons.children) node.setAttribute("data-v-08688f2d", "");
  header.append(logo, buttons);
  host.append(header);

  const visible = () => {
    const store = app.$store;
    const sceneState = unwrap(store.sceneState);
    const playing = unwrap(store.sceneStates?.Playing);
    const width = Number(unwrap(app.$viewport?.width) || window.innerWidth);
    const topNotif = flag(app.$notifs?.isTopActive);
    return flag(store.isHeaderVisible)
      && !flag(store.isTransitionActive)
      && !flag(store.isMenuOpen)
      && !flag(store.isCustomizeOpen)
      && !flag(store.isDialogVisible)
      && !flag(store.isApiErrorVisible)
      && !flag(store.isOverlayVisible)
      && !(width < 750 && topNotif)
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
      flag(app.$notifs?.isTopActive),
      unwrap(app.$viewport?.width),
      flag(app.$store.isTelescopeActiveDelayed),
      unwrap(app.$store.currentFullscreenVideo),
      flag(app.$store.isCinematicActive),
    ],
    () => {
      const show = visible();
      header.classList.toggle("is-visible", show);
      header.inert = !show;
      logo.tabIndex = show ? 0 : -1;
    },
    { immediate: true },
  );
}

function clampDpr() {
  return Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
}

function installMenuWipe(app, canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { setOpen() {}, dispose() {} };

  const OVERHANG = 60;
  const edge = createSpring({ initial: 0, mass: 1, friction: 0.6 });
  const bulge = createSpring({ initial: 0 });
  let panelWidth = 1;
  let extra = OVERHANG;
  let running = false;
  let raf = 0;

  const paint = (force = false) => {
    const dt = app.$webgl?.time?.dt || 16.67;
    edge.update(dt);
    bulge.update(dt);
    const left = (1 - edge.value) * panelWidth + extra;
    const ctrl = (1 - bulge.value) * panelWidth + extra;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(left, 0);
    ctx.quadraticCurveTo(ctrl, canvas.height * 0.5, left, canvas.height);
    ctx.lineTo(panelWidth + extra, canvas.height);
    ctx.lineTo(panelWidth + extra, 0);
    ctx.closePath();
    ctx.fill();
    if (!force && edge.stopped && bulge.stopped) running = false;
  };

  const tick = () => {
    raf = 0;
    if (!running) return;
    paint();
    if (running) raf = window.requestAnimationFrame(tick);
  };

  const start = () => {
    if (running) return;
    running = true;
    if (!raf) raf = window.requestAnimationFrame(tick);
  };

  const resize = () => {
    const bounds = canvas.parentElement?.getBoundingClientRect();
    const cssW = Math.max(1, bounds?.width || 400);
    const cssH = Math.max(1, bounds?.height || 400);
    const dpr = clampDpr();
    extra = OVERHANG * dpr;
    panelWidth = cssW * dpr;
    const layoutW = cssW + extra;
    canvas.width = layoutW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.marginLeft = `${-OVERHANG}px`;
    canvas.style.width = `${layoutW}px`;
    canvas.style.height = `${cssH}px`;
    paint(true);
  };

  const observer = new ResizeObserver(resize);
  if (canvas.parentElement) observer.observe(canvas.parentElement);
  resize();

  return {
    setOpen(open) {
      if (open) {
        edge.setTarget(1);
        bulge.setTarget(1);
        bulge.setMass(0.3);
        bulge.setFriction(0.15);
        bulge.setTension(0.02);
      } else {
        edge.setTarget(0);
        bulge.setTarget(0);
        bulge.setMass(1);
        bulge.setFriction(0.3);
        bulge.setTension(0.1);
      }
      start();
    },
    dispose() {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      observer.disconnect();
    },
  };
}

function installMenu(app, host) {
  const menu = el("aside", { class: "menu", "data-v-2fd699fb": "", tabindex: "-1" });
  const background = el("div", { class: "menu-background", "data-v-2fd699fb": "" });
  const canvas = el("canvas");
  background.append(canvas);
  const wipe = installMenuWipe(app, canvas);
  const container = el("div", { class: "menu-container", "data-v-2fd699fb": "" });
  const buttons = el("section", { class: "menu-buttons", "data-v-2fd699fb": "" });
  const close = () => { app.$store.isMenuOpen = false; };
  buttons.append(
    circleButton({
      label: app.$l("arialabel.close"),
      icon: "cross",
      tone: "green",
      extraClass: "pointer",
      onClick: close,
    }),
    installSoundButton(app, { tone: "white" }),
  );
  for (const node of buttons.children) node.setAttribute("data-v-2fd699fb", "");
  const infos = el("section", { class: "menu-infos", "data-v-2fd699fb": "" });
  infos.append(
    el("img", {
      src: "./reference/assets/databeach-logo.png?v=glorb",
      alt: "glorb",
      "data-v-2fd699fb": "",
      class: "menu-logo",
    }),
    el("p", { "data-v-2fd699fb": "", html: app.$l("global.baseline") }),
    ctaButton({
      text: app.$l("cta.discover"),
      color: "white",
      extraClass: "menu-cta pointer",
      href: app.$l("menu.islandlink"),
      onClick: () => app.$analytics.event({ event_category: "menu", event_action: "access_CCBUrl", event_value: "" }),
    }),
    ctaButton({
      text: app.$l("cta.start"),
      color: flag(app.$store.isGuest) ? "blue" : "gray",
      extraClass: "menu-cta pointer",
      onClick: () => {
        if (flag(app.$store.isGuest)) app.$savestate.clear();
        else {
          app.$store.isFormOpen = true;
          close();
        }
      },
    }),
  );
  for (const node of infos.querySelectorAll(".cta, .menu-cta")) node.setAttribute("data-v-2fd699fb", "");
  container.append(buttons, infos);
  const overlay = el("div", {
    class: "menu-overlay",
    "data-bypass-touch": "",
    "data-v-2fd699fb": "",
    hidden: true,
    onClick: close,
  });
  menu.append(background, container, overlay);
  menu.inert = true;
  host.append(menu);

  watch(() => flag(app.$store.isMenuOpen), (open) => {
    menu.classList.toggle("is-open", open);
    menu.tabIndex = open ? 0 : -1;
    overlay.hidden = !open;
    menu.inert = !open;
    wipe.setOpen(open);
    if (open) playUiSound(app, "sfx_phone_swipe");
  }, { immediate: true });

  watch(
    () => [
      unwrap(app.$store.sceneState),
      unwrap(app.$store.sceneStates?.Playing),
      flag(app.$store.isDialogVisible),
      flag(app.$store.isTransitionActive),
    ],
    () => {
      if (flag(app.$store.isMenuOpen) && !canOpenMenu(app)) app.$store.isMenuOpen = false;
    },
  );

  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && flag(app.$store.isMenuOpen)) close();
  });
}

function installJoystick(app, host) {
  const aside = el("aside", { class: "joystick", "data-v-b69952e5": "" });
  const indicator = el("div", { class: "indicator", "data-v-b69952e5": "" });
  const outer = el("div", { class: "outer-circle", "data-v-b69952e5": "" }, [el("div", { class: "circle-outer", "data-v-b69952e5": "" })]);
  const inner = el("div", { class: "inner-circle", "data-v-b69952e5": "" }, [el("div", { class: "circle-inner", "data-v-b69952e5": "" })]);
  aside.append(indicator, outer, inner);
  host.append(aside);

  const hidden = () => {
    const store = app.$store;
    const joy = unwrap(app.$webgl?.store?.joystickVisible);
    return joy
      || store.isDialogVisibleDelayed
      || store.isInteractionButtonVisibleDelayed
      || store.isMenuOpen
      || store.isFormOpen
      || store.isTransitionActiveDelayed
      || store.sceneState < store.sceneStates.Playing
      || unwrap(app.$route?.name) === "Phone";
  };
  watch(hidden, (isHidden) => indicator.classList.toggle("hidden", isHidden), { immediate: true });

  const move = () => {
    const touch = app.$webgl?.input?.touch?.value;
    if (!touch) return;
    const x = touch.relativePos?.x || 0;
    const y = touch.relativePos?.y || 0;
    const firstX = touch.firstPos?.x || 0;
    const firstY = touch.firstPos?.y || 0;
    outer.style.transform = `translate(${Math.round(firstX)}px, ${Math.round(firstY)}px)`;
    const length = Math.sqrt(x * x + y * y) || 1;
    const clamped = Math.min(length, 75);
    inner.style.transform = `translate(${Math.round(x / length * clamped + firstX)}px, ${Math.round(y / length * clamped + firstY)}px)`;
    aside.classList.toggle("active", !!(touch.isDown || touch.pressed));
  };
  const loop = () => {
    move();
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function installInteraction(app, host) {
  const aside = el("aside", { class: "interaction-button", "data-v-b03f534f": "", style: { visibility: "hidden" } });
  const wrapper = el("div", { class: "wrapper hidden", "data-v-b03f534f": "" });
  const bounce = el("div", { class: "bounce", "data-v-b03f534f": "" });
  const button = el("button", { class: "pointer", "data-v-b03f534f": "", type: "button" });
  const icon = lazyImg(iconUrl("interactions-yes"), "icon", "");
  const hint = el("p", { "data-v-b03f534f": "", text: app.$l("cta.interaction.tap") });
  button.append(icon, el("figure", { class: "round", "data-v-b03f534f": "" }));
  bounce.append(button, hint);
  wrapper.append(bounce);
  aside.append(wrapper);
  host.append(aside);

  let action = { active: false, mode: "tap", onTap() {}, onStart() {}, onStop() {}, onDone() {}, locked: false };

  const show = (next) => {
    action = { active: false, mode: "tap", onTap() {}, onStart() {}, onStop() {}, onDone() {}, locked: false, ...next };
    if (!next || next.locked) {
      wrapper.classList.add("hidden");
      app.$store.isInteractionButtonVisible = false;
      aside.style.visibility = "hidden";
      return;
    }
    action.active = true;
    icon.src = iconUrl(next.icon || "interactions-yes") || icon.src;
    wrapper.className = `wrapper mode-${action.mode}`;
    hint.textContent = action.mode === "hold" || action.mode === "hold-infinite"
      ? (app.$device.type.mobile ? app.$l("cta.interaction.touch") : app.$l("cta.interaction.click"))
      : app.$l("cta.interaction.tap");
    aside.style.visibility = "visible";
    app.$store.isInteractionButtonVisible = true;
  };

  const fire = () => {
    if (!action.active) return;
    if (action.mode === "tap" || action.mode === "click") action.onTap?.();
    else action.onStart?.();
  };
  const release = () => {
    if (action.mode === "hold" || action.mode === "hold-infinite") action.onStop?.();
  };
  button.addEventListener("mousedown", fire);
  button.addEventListener("touchstart", (event) => { event.preventDefault(); fire(); }, { passive: false });
  window.addEventListener("mouseup", release);
  window.addEventListener("touchend", release);

  const hideChrome = () => {
    const store = app.$store;
    return store.isDialogVisible
      || store.isMenuOpen
      || store.isFormOpen
      || store.isTransitionActive
      || store.isInteractionDone
      || store.sceneState < store.sceneStates.Playing
      || store.currentFullscreenVideo;
  };
  watch(hideChrome, (hidden) => wrapper.classList.toggle("hidden", hidden || !action.active));

  const ready = () => {
    const signal = app.$webgl?.store?.interactionButton;
    if (!signal?.watchImmediate) return false;
    signal.watchImmediate(show);
    return true;
  };
  if (!ready()) {
    const timer = window.setInterval(() => { if (ready()) window.clearInterval(timer); }, 200);
  }
}

export function installChrome(app, host) {
  installHeader(app, host);
  installMenu(app, host);
  installJoystick(app, host);
  installInteraction(app, host);
}
