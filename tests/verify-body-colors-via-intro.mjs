import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// no-op, just ensuring playwright resolves

const URL = process.env.GLORB_URL || "http://127.0.0.1:43219/three-js";
const OUT = "/opt/cursor/artifacts";
const LABELS = ["orange", "purple", "blue", "lime", "vermilion"];
const COLORS = ["character0", "character1", "character2", "character3", "character4"];

async function runtime(page) {
  return page.evaluate(() => {
    const app = window.__THREE_JS_GAME__?.app;
    const webgl = app?.$webgl;
    const scene = webgl?.scenes?.current;
    return {
      route: app?.$route?.name ?? null,
      scene: webgl?.scenes?.currentSceneID?.value ?? null,
      dialog: app?.$dialogs?.current?.node?.id ?? null,
      dialogVisible: !!app?.$store?.isDialogVisible,
      headerVisible: document.querySelector("#threejs-hud .app-header")?.classList.contains("is-visible") ?? false,
      sceneState: app?.$store?.sceneState ?? null,
      playingState: app?.$store?.sceneStates?.Playing ?? null,
      tutorialState: app?.$store?.sceneStates?.Tutorial ?? null,
      intro: webgl?.store?.intro
        ? {
            journeyStarted: webgl.store.intro.journeyStarted.value,
            startJourneyVisible: webgl.store.intro.startJourneyVisible.value,
          }
        : null,
      tutorialVisible: !!document.querySelector(".tutorial-container"),
      canMove: !!scene?.player?.canMove,
      playerColorId: scene?.player?.mesh?.colorId ?? null,
      playerUniform: scene?.player?.mesh?.material?.uniforms?.colorId?.value ?? null,
      hasPlayer: !!scene?.player,
      shaderPatch: !!scene?.player?.mesh?.material?.fragmentShader?.includes("colorId>26.5"),
      isCustomizing: !!webgl?.store?.isCustomizing?.value,
    };
  });
}

async function finishBubble(page, text) {
  const dialog = page.locator(".dialog-bubble").filter({ hasText: text }).last();
  await dialog.waitFor({ state: "visible", timeout: 40_000 });
  await page.waitForFunction((t) => {
    const nodes = [...document.querySelectorAll(".dialog-bubble")].filter((n) => n.textContent.includes(t));
    const last = nodes[nodes.length - 1];
    return !!last?.querySelector(".bubble.is-done");
  }, text, { timeout: 40_000 });
  await page.keyboard.press("Space");
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.setDefaultTimeout(120_000);
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  console.log("goto");
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#preloader", { state: "hidden", timeout: 90_000 });
  await page.waitForSelector(".start-btn", { timeout: 60_000 });
  console.log("before", await runtime(page));

  // Click the visible Vue start button (not HUD fallback)
  await page.locator(".page-intro .start-btn, .start-btn").first().click({ force: true });
  await page.waitForTimeout(1000);
  console.log("after click", await runtime(page));

  await finishBubble(page, "Welcome aboard");
  await finishBubble(page, "Glorbs found");
  await finishBubble(page, "can you help us");

  const yes = page.getByRole("button", { name: "Yes", exact: true });
  await yes.waitFor({ state: "visible", timeout: 20_000 });
  await yes.click();
  await finishBubble(page, "Cove Island");

  await page.waitForFunction(() => window.__THREE_JS_GAME__.app.$webgl.scenes.currentSceneID.value === "IslandWest", null, { timeout: 90_000 });
  await page.waitForFunction(() => window.__THREE_JS_GAME__.app.$route?.name === "Home", null, { timeout: 30_000 });
  await page.waitForFunction(() => !window.__THREE_JS_GAME__.app.$store.isTransitionActive, null, { timeout: 90_000 });

  let now = await runtime(page);
  console.log("after boat", now);
  if (Number(now.sceneState) < Number(now.playingState)) {
    await page.keyboard.down("KeyW");
    await page.waitForFunction(() => {
      const a = window.__THREE_JS_GAME__.app;
      return Number(a.$store.sceneState) >= Number(a.$store.sceneStates.Playing);
    }, null, { timeout: 120_000 });
    await page.keyboard.up("KeyW");
  }

  await page.waitForFunction(() => !!window.__THREE_JS_GAME__.app.$webgl.scenes.current?.player?.canMove, null, { timeout: 30_000 });
  await page.waitForFunction(() => document.querySelector("#threejs-hud .app-header")?.classList.contains("is-visible"), null, { timeout: 30_000 });
  console.log("playing", await runtime(page));

  // Open customize
  await page.locator("#threejs-hud .app-header [aria-label]").first().click();
  await page.waitForFunction(() => window.__THREE_JS_GAME__.app.$route?.name === "Customize", null, { timeout: 15_000 });
  await page.waitForTimeout(1500);
  console.log("customize", await runtime(page));

  const results = [];
  for (let i = 0; i < COLORS.length; i++) {
    await page.evaluate((color) => {
      const app = window.__THREE_JS_GAME__.app;
      app.$savestate.game.player.color = color;
      app.$webgl.store.updatePlayerAttributes.emit();
    }, COLORS[i]);
    // also click the swatch for good measure
    const swatch = page.locator(`.color-${i}`).first();
    if (await swatch.count()) await swatch.click({ force: true }).catch(() => {});
    await page.waitForTimeout(1000);
    const state = await runtime(page);
    const shot = path.join(OUT, `body-${LABELS[i]}.png`);
    await page.screenshot({ path: shot, fullPage: false });
    results.push({ label: LABELS[i], shot, ...state });
    console.log(LABELS[i], { colorId: state.playerColorId, uniform: state.playerUniform, shaderPatch: state.shaderPatch });
  }

  await fs.writeFile(path.join(OUT, "body-color-results.json"), JSON.stringify({ results, errors }, null, 2));
  await browser.close();
  console.log("done", errors);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
