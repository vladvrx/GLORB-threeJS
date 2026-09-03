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
  document.documentElement.classList.remove("no-js");
  window.__DATA = await loadSiteData();
  if (typeof window.__GLORB_START__ !== "function") {
    throw new Error("glorb engine did not load");
  }
  window.__GLORB_START__();
}

boot().catch((error) => {
  console.error("glorb Three.js could not start", error);
  document.documentElement.classList.add("game-start-failed");
  const counter = document.querySelector(".preloader-counter");
  if (counter) counter.textContent = "START ERROR";
});
