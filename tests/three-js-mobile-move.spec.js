const { test, expect } = require("@playwright/test");

test.use({
  channel: "chrome",
  headless: true,
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
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
  await page.waitForTimeout(600);
}

test("phone drag walks the character without freezing on paint", async ({ page }) => {
  await waitForGame(page);
  await enterWestPlaying(page);

  const before = await page.evaluate(() => {
    const app = window.__THREE_JS_GAME__.app;
    const player = app.$webgl.scenes.current.player;
    const pos = player.base.position;
    return {
      x: pos.x,
      z: pos.z,
      canMove: !!player.canMove,
      complete: !!app.__paintState?.complete,
      total: app.__paintState?.total ?? 0,
      painted: app.__paintState?.painted ?? 0,
      scale: window.visualViewport ? window.visualViewport.scale : 1,
      frozen: Number(app.$webgl?.store?.frozenPlayerDelay) || 0,
      overlay: !document.querySelector("#threejs-hud .paint-complete-overlay")?.hidden,
      meterTop: document.querySelector("#threejs-hud .paint-meter")?.getBoundingClientRect().top ?? 0,
      viewport: window.innerHeight,
    };
  });
  expect(before.canMove).toBe(true);
  expect(before.complete).toBe(false);
  expect(before.total).toBeGreaterThan(80);
  expect(before.painted).toBeLessThan(before.total);
  expect(before.scale).toBe(1);
  expect(before.frozen).toBe(0);
  expect(before.overlay).toBe(false);
  expect(before.meterTop).toBeGreaterThan(before.viewport * 0.55);

  await page.evaluate(async (start) => {
    const startX = window.innerWidth * 0.46;
    const startY = window.innerHeight * 0.72;
    window.__glorbWalkStart = { x: start.x, z: start.z };
    const fire = (type, x, y, touching) => {
      const touch = new Touch({
        identifier: 11,
        target: document.body,
        clientX: x,
        clientY: y,
        radiusX: 2,
        radiusY: 2,
        rotationAngle: 0,
        force: 1,
      });
      window.dispatchEvent(new TouchEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        touches: touching ? [touch] : [],
        targetTouches: touching ? [touch] : [],
        changedTouches: [touch],
        view: window,
      }));
    };
    fire("touchstart", startX, startY, true);
    for (let i = 1; i <= 18; i += 1) {
      fire("touchmove", startX + i * 3, startY - i * 12, true);
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    fire("touchend", startX + 54, startY - 216, false);
  }, { x: before.x, z: before.z });

  await expect.poll(async () => page.evaluate(() => {
    const app = window.__THREE_JS_GAME__.app;
    const player = app.$webgl.scenes.current.player;
    const pos = player.base.position;
    const start = window.__glorbWalkStart || { x: pos.x, z: pos.z };
    return Math.hypot(pos.x - start.x, pos.z - start.z);
  }), { timeout: 10_000 }).toBeGreaterThan(0.35);

  const after = await page.evaluate(() => {
    const app = window.__THREE_JS_GAME__.app;
    const player = app.$webgl.scenes.current.player;
    return {
      canMove: !!player.canMove,
      complete: !!app.__paintState?.complete,
      frozen: Number(app.$webgl?.store?.frozenPlayerDelay) || 0,
    };
  });
  expect(after.canMove).toBe(true);
  expect(after.complete).toBe(false);
  expect(after.frozen).toBe(0);
});
