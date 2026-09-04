import { w as watch } from "../../../vendor/vendor.75f6e6ae65453426.js";
import { circleButton, el, playUiSound, svgIcon, unwrap } from "../dom.js";
import { installJumpButton } from "../jump.js?v=jump-5";
import { installPaintHud } from "../paint.js?v=paint-7";
import { installInteraction } from "./interaction.js";

function flag(value) {
  return !!unwrap(value);
}

function lockMenuClosed(app) {
  app.$store.isMenuOpen = false;
  watch(() => flag(app.$store.isMenuOpen), (open) => {
    if (open) app.$store.isMenuOpen = false;
  });
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
    onClick: (event) => {
      event.preventDefault();
      event.stopPropagation();
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
      logo.tabIndex = -1;
    },
    { immediate: true },
  );
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
      || unwrap(app.$route?.name) !== "Home"
      || store.isDialogVisibleDelayed
      || store.isInteractionButtonVisibleDelayed
      || store.isMenuOpen
      || store.isFormOpen
      || store.isTransitionActiveDelayed
      || store.sceneState < store.sceneStates.Playing;
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

function installRotateDevice(app) {
  const layer = el("div", { class: "rotate-device", "data-v-442a7017": "" });
  const picture = el("img", {
    src: "./reference/assets/rotate-background.70bb5a6b65453426.webp",
    alt: "",
    "data-v-442a7017": "",
  });
  const wrap = el("div", { class: "rotate-wrapper", "data-v-442a7017": "" });
  const icons = el("div", { class: "icon-wrapper", "data-v-442a7017": "" });
  const rotate = el("div", { class: "icon-rotate", "data-v-442a7017": "" });
  const left = svgIcon("arrow-rotate");
  left.setAttribute("class", "arrow-left");
  left.setAttribute("data-v-442a7017", "");
  const phone = svgIcon("mobile");
  phone.setAttribute("class", "rotate-mobile");
  phone.setAttribute("data-v-442a7017", "");
  const right = svgIcon("arrow-rotate");
  right.setAttribute("class", "arrow-right");
  right.setAttribute("data-v-442a7017", "");
  rotate.append(left, phone, right);
  icons.append(rotate);
  wrap.append(icons);
  layer.append(picture, wrap);
  document.body.append(layer);

  const media = window.matchMedia("only screen and (max-width: 1024px) and (orientation: landscape)");
  const sync = () => {
    const phone = !!app.$device?.type?.phone;
    const ready = flag(app.$preloader?.finished);
    layer.toggleAttribute("hidden", !(phone && ready && media.matches));
  };
  media.addEventListener("change", sync);
  watch(() => [!!app.$device?.type?.phone, flag(app.$preloader?.finished), unwrap(app.$viewport?.width)], sync, { immediate: true });
  window.addEventListener("orientationchange", sync);
}

export function installChrome(app, host) {
  lockMenuClosed(app);
  installHeader(app, host);
  installJoystick(app, host);
  installInteraction(app, host);
  try { installJumpButton(app, host); } catch (error) { console.error("Three.js jump button failed", error); }
  try { installPaintHud(app, host); } catch (error) { console.error("Three.js paint meter failed", error); }
  try { installRotateDevice(app); } catch (error) { console.error("Three.js rotate overlay failed", error); }
}
