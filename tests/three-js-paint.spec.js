const { test, expect } = require("@playwright/test");

test.use({
  channel: "chrome",
  headless: true,
  viewport: { width: 1280, height: 720 },
});
test.setTimeout(180_000);

const THREE_JS_URL = process.env.GLORB_URL || "http://127.0.0.1:43219/three-js";

async function waitForGame(page) {
  await page.goto(THREE_JS_URL, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#preloader")).toBeHidden({ timeout: 90_000 });
  await page.waitForFunction(() => !!window.__THREE_JS_GAME__?.app?.$webgl?.store, null, { timeout: 60_000 });
}

async function enterWestPlaying(page) {
  await page.evaluate(async () => {
    const app = window.__THREE_JS_GAME__.app;
    const store = app.$store;
    store.isDialogVisible = false;
    store.isDialogVisibleDelayed = false;
    store.isMenuOpen = false;
    store.isFormOpen = false;
    store.isCinematicActive = false;
    store.isApiErrorVisible = false;
    store.isInteractionDone = false;
    store.isNotHomeDelayed = false;
    const scenes = app.$webgl?.scenes;
    const id = scenes?.currentSceneID?.value || scenes?.current?.id;
    if (id !== "IslandWest") {
      await scenes.teleportTo("IslandWest", { noAnimation: true, noAnimations: true, point: "Spawn" });
    }
    store.isTransitionActive = false;
    store.isTransitionActiveDelayed = false;
    const scene = scenes?.current;
    if (scene?.setState) scene.setState("Playing");
    else store.sceneState = store.sceneStates.Playing;
    if (scene) scene.isEntered = true;
    if (app.$route?.name !== "Home") await app.$router.replace({ name: "Home" });
  });
  await page.waitForFunction(() => {
    const app = window.__THREE_JS_GAME__?.app;
    const scenes = app?.$webgl?.scenes;
    const id = scenes?.currentSceneID?.value || scenes?.current?.id;
    const player = scenes?.current?.player;
    return id === "IslandWest" && !!player?.canMove && !!app.__paintState;
  }, null, { timeout: 90_000 });
  await page.waitForTimeout(800);
}

test("standing on GLORB paints the ground and fills the paint bar", async ({ page }) => {
  await waitForGame(page);
  await enterWestPlaying(page);

  await expect.poll(async () => page.evaluate(() => {
    const app = window.__THREE_JS_GAME__?.app;
    const meter = document.querySelector("#threejs-hud .paint-meter");
    return {
      visible: meter?.classList.contains("is-visible") || false,
      painted: app?.__paintState?.painted ?? 0,
      ready: !!app?.__paintState?.ready,
      percent: app?.__paintState?.percent ?? 0,
    };
  }), { timeout: 30_000 }).toMatchObject({ visible: true });

  await expect.poll(async () => page.evaluate(() => window.__THREE_JS_GAME__.app.__paintState?.painted || 0), {
    timeout: 15_000,
  }).toBeGreaterThan(0);

  await expect.poll(async () => page.evaluate(() => {
    const state = window.__THREE_JS_GAME__.app.__paintState;
    return !!state?.ready && state.percent > 0;
  }), { timeout: 20_000 }).toBe(true);

  const hud = await page.evaluate(() => {
    const percent = document.querySelector("#threejs-hud .paint-meter-percent")?.textContent;
    const fill = document.querySelector("#threejs-hud .paint-meter-fill")?.style.width;
    return { percent, fill };
  });
  expect(hud.percent).toMatch(/^[1-9]\d*%$/);
  expect(Number.parseFloat(hud.fill)).toBeGreaterThan(0);

  const coverage = await page.evaluate(() => {
    const state = window.__THREE_JS_GAME__.app.__paintState;
    const meter = document.querySelector("#threejs-hud .paint-meter");
    const rect = meter?.getBoundingClientRect();
    return {
      complete: !!state?.complete,
      total: state?.total ?? 0,
      painted: state?.painted ?? 0,
      frozen: Number(window.__THREE_JS_GAME__.app.$webgl?.store?.frozenPlayerDelay) || 0,
      meterTop: rect?.top ?? 0,
      viewport: window.innerHeight,
    };
  });
  expect(coverage.complete).toBe(false);
  expect(coverage.total).toBeGreaterThan(80);
  expect(coverage.painted).toBeLessThan(coverage.total);
  expect(coverage.frozen).toBe(0);
  expect(coverage.meterTop).toBeGreaterThan(coverage.viewport * 0.55);
});

test("covering the island shows Painted and ends the game", async ({ page }) => {
  await waitForGame(page);
  await enterWestPlaying(page);

  await page.waitForFunction(() => {
    const paint = window.__THREE_JS_GAME__?.app?.__paintState;
    return !!paint && paint.ready && paint.total > 80;
  }, null, { timeout: 30_000 });

  await page.evaluate(() => {
    window.__THREE_JS_GAME__.app.__paintFillAll();
  });

  await expect(page.locator("#threejs-hud .paint-complete-overlay")).toBeVisible({ timeout: 10_000 });
  await expect(page.locator("#threejs-hud .paint-complete-title")).toHaveText("Painted!");
  await expect.poll(async () => page.evaluate(() => window.__THREE_JS_GAME__.app.__paintState?.percent)).toBe(100);
  await expect.poll(async () => page.evaluate(() => {
    const player = window.__THREE_JS_GAME__.app.$webgl?.scenes?.current?.player;
    return player?.canMove === false || Number(window.__THREE_JS_GAME__.app.$webgl?.store?.frozenPlayerDelay) > 0;
  })).toBe(true);
});
