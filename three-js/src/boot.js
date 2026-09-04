import { initializePageBehavior } from "../../direct-port/src/page-behavior.js";

const siteDataUrl = new URL("../../direct-port/data/site.json", import.meta.url);
const logoUrl = new URL("../../reference/assets/databeach-logo.png", import.meta.url);
const cursorUrl = new URL("../../reference/assets/ui/game-cursor-4k.png", import.meta.url);

let startPromise;

function routerBasePath() {
  const path = window.location.pathname;
  for (const mount of ["/three-js", "/three-port", "/direct-port"]) {
    if (path === mount || path.startsWith(`${mount}/`)) return `${mount}/`;
  }
  return "/";
}

async function loadSiteData() {
  const url = new URL(siteDataUrl);
  url.searchParams.set("v", "go-go-go");
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Site data returned HTTP ${response.status}`);
  const data = await response.json();
  data.project.basepath = routerBasePath();
  data.project.url = "./";
  data.project.origin = window.location.origin;
  data.page.route.url = "./";
  return data;
}

function pinVisualViewportScale() {
  const viewport = window.visualViewport;
  if (!viewport) return;
  try {
    Object.defineProperty(viewport, "scale", {
      configurable: true,
      enumerable: true,
      get() {
        return 1;
      },
    });
  } catch {
    /* some browsers freeze the native getter */
  }
}

function lockTouchViewport() {
  const meta = document.querySelector('meta[name="viewport"]');
  if (meta) {
    meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover");
  }
  const blockZoom = (event) => event.preventDefault();
  document.addEventListener("gesturestart", blockZoom, { passive: false });
  document.addEventListener("gesturechange", blockZoom, { passive: false });
  document.documentElement.style.touchAction = "none";
  if (document.body) document.body.style.touchAction = "none";
  pinVisualViewportScale();
}

async function boot() {
  lockTouchViewport();
  document.documentElement.classList.remove("no-js");
  initializePageBehavior({ logoUrl, cursorUrl });
  window.__DATA = await loadSiteData();
  const { startEngine } = await import("./engine.js?v=go-go-go");
  return startEngine();
}

export function startThreeJsGame() {
  startPromise ??= boot();
  return startPromise;
}
