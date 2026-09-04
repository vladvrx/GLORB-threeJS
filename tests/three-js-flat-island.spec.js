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
    return id === "IslandWest" && !!player?.canMove;
  }, null, { timeout: 90_000 });
  await page.waitForTimeout(800);
}

test("GLORB is a flat empty island without a decorate tray", async ({ page }) => {
  await waitForGame(page);
  await enterWestPlaying(page);

  const info = await page.evaluate(() => {
    const app = window.__THREE_JS_GAME__.app;
    const scene = app.$webgl?.scenes?.current;
    const pos = scene?.player?.base?.position;
    const geo = scene?.main?.geometry;
    const res = app.$webgl?.resources?.scenes?.IslandWest;
    const island = window.__GLORB_ISLAND__;
    geo?.computeBoundingBox?.();
    res?.groundCollider?.computeBoundingBox?.();
    const topY = [];
    const arr = geo?.attributes?.position?.array;
    if (arr) {
      for (let i = 0; i < arr.length; i += 3) {
        if (Math.abs(arr[i + 1] - 3.8) < 0.05) topY.push(arr[i + 1]);
        if (topY.length >= 40) break;
      }
    }
    const vis = geo?.boundingBox;
    const col = res?.groundCollider?.boundingBox;
    return {
      scene: scene?.id,
      playerY: pos?.y ?? null,
      topMin: topY.length ? Math.min(...topY) : null,
      topMax: topY.length ? Math.max(...topY) : null,
      visMin: vis ? vis.min.toArray() : null,
      visMax: vis ? vis.max.toArray() : null,
      colMin: col ? col.min.toArray() : null,
      colMax: col ? col.max.toArray() : null,
      island,
      chunks: scene?.chunks?.length ?? 0,
      actors: Object.keys(scene?.actors || {}).length,
      tray: !!document.querySelector("[data-decorate-tray]"),
    };
  });

  expect(info.scene).toBe("IslandWest");
  expect(info.tray).toBe(false);
  expect(info.chunks).toBe(0);
  expect(info.actors).toBe(0);
  expect(info.playerY).toBeGreaterThan(3.5);
  expect(info.playerY).toBeLessThan(6.5);
  expect(info.topMin).toBeCloseTo(3.8, 1);
  expect(info.topMax).toBeCloseTo(3.8, 1);
  expect(info.visMin[0]).toBeCloseTo(info.colMin[0], 1);
  expect(info.visMax[0]).toBeCloseTo(info.colMax[0], 1);
  expect(info.visMin[2]).toBeCloseTo(info.colMin[2], 1);
  expect(info.visMax[2]).toBeCloseTo(info.colMax[2], 1);
  expect(info.visMax[1]).toBeCloseTo(info.colMax[1], 1);
});
