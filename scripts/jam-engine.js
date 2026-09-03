import { initializePageBehavior } from "../direct-port/src/page-behavior.js";
import { startEngine } from "../three-js/src/engine.js";

function assetUrl(rel) {
  return new URL(rel, document.baseURI);
}

initializePageBehavior({
  logoUrl: assetUrl("./reference/assets/databeach-logo.png"),
  cursorUrl: assetUrl("./reference/assets/ui/game-cursor-4k.png"),
});

startEngine().catch((error) => {
  console.error("glorb Three.js could not start", error);
  document.documentElement.classList.add("game-start-failed");
  const counter = document.querySelector(".preloader-counter");
  if (counter) counter.textContent = "START ERROR";
});
