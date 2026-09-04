import { w as watch } from "../../../vendor/vendor.75f6e6ae65453426.js";
import { ctaButton, el, playUiSound, unwrap } from "../dom.js";

function sceneId(app) {
  const scenes = app.$webgl?.scenes;
  return unwrap(scenes?.currentSceneID) || scenes?.current?.id || null;
}

function playingOnIsland(app) {
  if (sceneId(app) !== "IslandWest") return false;
  const store = app.$store;
  if (!store) return false;
  const tutorial = Number(unwrap(store.sceneStates?.Tutorial) ?? 0);
  return Number(unwrap(store.sceneState)) >= tutorial;
}

function syncIntroLogo(app) {
  const intro = app.$webgl?.store?.intro;
  if (playingOnIsland(app) && intro && !unwrap(intro.journeyStarted)) {
    intro.journeyStarted.set(true);
  }
  const show = !!intro
    && unwrap(intro.startJourneyVisible)
    && !unwrap(intro.journeyStarted)
    && !playingOnIsland(app);
  document.documentElement.classList.toggle("intro-cta-visible", show);
  document.documentElement.classList.toggle("journey-started", !!unwrap(intro?.journeyStarted) || playingOnIsland(app));
  document.documentElement.classList.toggle("glorb-playing", playingOnIsland(app));
  if (!show) document.querySelector(".databeach-home-logo")?.remove();
}

function startJourney(app) {
  const intro = app.$webgl?.store?.intro;
  if (!intro || unwrap(intro.journeyStarted)) return false;
  intro.journeyStarted.set(true);
  syncIntroLogo(app);
  playUiSound(app, "sfx_UI_Dialog_CameraMove_In", { delay: 200 });
  return true;
}

function vueStartButton() {
  return [...document.querySelectorAll(".page-intro .start-btn")].find((node) => !node.closest("#threejs-hud"));
}

export function installStartScreen(app, host) {
  const layer = el("div", {
    class: "start",
    "data-v-a8ff0715": "",
    hidden: true,
  });
  const button = ctaButton({
    text: app.$l("cta.start"),
    color: "white",
    extraClass: "start-btn pointer",
    onClick: () => startJourney(app),
  });
  button.setAttribute("data-v-a8ff0715", "");
  layer.append(button);

  const page = el("div", { class: "page page-intro threejs-start-fallback", "data-v-366b880d": "" });
  page.hidden = true;
  page.inert = true;
  page.append(layer);
  host.prepend(page);

  const sync = () => {
    syncIntroLogo(app);
    const intro = app.$webgl?.store?.intro;
    const vueStart = vueStartButton();
    const visible = !!intro
      && unwrap(intro.startJourneyVisible)
      && !unwrap(intro.journeyStarted)
      && !playingOnIsland(app)
      && !vueStart;
    layer.hidden = !visible;
    page.hidden = !visible;
    page.inert = !visible;
  };

  const bind = () => {
    const intro = app.$webgl?.store?.intro;
    if (!intro?.startJourneyVisible?.watchImmediate) return false;
    intro.startJourneyVisible.watchImmediate(() => { sync(); });
    intro.journeyStarted.watchImmediate(() => { sync(); });
    watch(() => [sceneId(app), unwrap(app.$store?.sceneState)], () => sync());
    return true;
  };
  if (!bind()) {
    const timer = window.setInterval(() => { if (bind()) window.clearInterval(timer); }, 200);
  }

  new MutationObserver(sync).observe(document.querySelector("main.ui") ?? document.body, {
    childList: true,
    subtree: true,
  });
}
