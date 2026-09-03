import { initializePageBehavior } from "../direct-port/src/page-behavior.js";
import { startEngine } from "../three-js/src/engine.js";

function assetUrl(rel) {
  return new URL(rel, document.baseURI);
}

function routerBasePath() {
  try {
    return new URL("./", document.baseURI).pathname;
  } catch {
    return "/";
  }
}

function isMobile() {
  return window.matchMedia("(max-width: 1024px)").matches
    || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function lockPortrait() {
  if (!isMobile()) return;
  document.documentElement.classList.add("phone");
  const tryLock = () => {
    const orientation = screen.orientation;
    if (orientation && typeof orientation.lock === "function") {
      orientation.lock("portrait").catch(() => {});
    }
  };
  tryLock();
  window.addEventListener("pointerdown", tryLock, { once: true });
}

function patchDracoFetch() {
  const files = window.__GLORB_DRACO__ || {};
  if (!Object.keys(files).length) return;
  const original = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = String(input && input.url ? input.url : input);
    for (const [name, source] of Object.entries(files)) {
      if (url.includes(name) && url.includes("draco")) {
        return Promise.resolve(new Response(source, {
          headers: { "content-type": "text/javascript" },
        }));
      }
    }
    return original(input, init);
  };
}

async function loadSiteData() {
  const response = await fetch(new URL("./direct-port/data/site.json", document.baseURI));
  if (!response.ok) throw new Error(`Site data returned HTTP ${response.status}`);
  const data = await response.json();
  data.project.basepath = routerBasePath();
  data.project.url = "./";
  data.project.origin = window.location.origin;
  data.page.route.url = "./";
  return data;
}

async function boot() {
  lockPortrait();
  patchDracoFetch();
  document.documentElement.classList.remove("no-js");
  initializePageBehavior({
    logoUrl: assetUrl("./reference/assets/databeach-logo.png"),
    cursorUrl: assetUrl("./reference/assets/ui/game-cursor-4k.png"),
  });
  window.__DATA = await loadSiteData();
  return startEngine();
}

boot().catch((error) => {
  console.error("glorb Three.js could not start", error);
  document.documentElement.classList.add("game-start-failed");
  const counter = document.querySelector(".preloader-counter");
  if (counter) counter.textContent = "START ERROR";
});
