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
    store.isHeaderVisible = true;
    if (app.$route?.name !== "Home") await app.$router.replace({ name: "Home" });
  });
  await page.waitForFunction(() => {
    const app = window.__THREE_JS_GAME__?.app;
    const scenes = app?.$webgl?.scenes;
    const id = scenes?.currentSceneID?.value || scenes?.current?.id;
    const player = scenes?.current?.player;
    return id === "IslandWest" && !!player && Number(app.$store.sceneState) >= Number(app.$store.sceneStates.Playing);
  }, null, { timeout: 90_000 });
  await page.waitForTimeout(800);
}

test("dance button matches jump size on the bottom left", async ({ page }) => {
  await waitForGame(page);
  await enterWestPlaying(page);

  const dance = page.locator("#threejs-hud .dance-button");
  const jump = page.locator("#threejs-hud .jump-button");
  await expect.poll(async () => dance.evaluate((node) => node.classList.contains("is-visible")), { timeout: 10_000 }).toBe(true);
  await expect(dance.locator("button")).toHaveAttribute("aria-label", "Dance");
  await expect(dance.locator("button [data-icon='dance']")).toHaveCount(1);

  const danceBox = await dance.boundingBox();
  const jumpBox = await jump.boundingBox();
  expect(danceBox).toBeTruthy();
  expect(jumpBox).toBeTruthy();
  expect(danceBox.x).toBeLessThan(160);
  expect(danceBox.y + danceBox.height).toBeGreaterThan(720 - 160);
  expect(Math.abs(danceBox.width - jumpBox.width)).toBeLessThan(2);
  expect(Math.abs(danceBox.height - jumpBox.height)).toBeLessThan(2);
});

test("holding the dance button plays the interact Action clip", async ({ page }) => {
  await waitForGame(page);
  await enterWestPlaying(page);

  const button = page.locator("#threejs-hud .dance-button button");
  await expect(button).toBeVisible();

  await button.dispatchEvent("pointerdown", { pointerId: 1, button: 0, pointerType: "mouse" });
  await expect.poll(async () => page.evaluate(() => {
    const app = window.__THREE_JS_GAME__.app;
    const player = app.$webgl?.scenes?.current?.player;
    return {
      holding: !!app.__danceState?.holding,
      clip: player?.animation?.animationID || player?.currentAnimation || null,
      pressed: document.querySelector("#threejs-hud .dance-button button")?.getAttribute("aria-pressed"),
    };
  }), { timeout: 8_000 }).toMatchObject({ holding: true, clip: "Action", pressed: "true" });

  await page.waitForTimeout(120);
  const playback = await page.evaluate(() => {
    const player = window.__THREE_JS_GAME__.app.$webgl?.scenes?.current?.player;
    const action = player?.animations?.Action;
    return {
      clip: player?.animation?.animationID || player?.currentAnimation || null,
      timeScale: Number(action?.timeScale ?? 1),
      weight: Number(action?.weight ?? action?.currentWeight ?? 0),
    };
  });
  expect(playback.clip).toBe("Action");
  expect(playback.timeScale).toBeCloseTo(1, 5);
  expect(playback.weight).toBeGreaterThan(0.5);

  await button.dispatchEvent("pointerup", { pointerId: 1, button: 0, pointerType: "mouse" });
  await expect.poll(async () => page.evaluate(() => {
    const app = window.__THREE_JS_GAME__.app;
    const player = app.$webgl?.scenes?.current?.player;
    const clip = player?.animation?.animationID || player?.currentAnimation || null;
    return {
      holding: !!app.__danceState?.holding,
      idle: !clip || clip === "T-Pose" || clip === "Idle" || clip === "Action",
      actionWeight: Number(player?.animations?.Action?.weight || 0),
      pressed: document.querySelector("#threejs-hud .dance-button button")?.getAttribute("aria-pressed"),
    };
  }), { timeout: 8_000 }).toMatchObject({ holding: false, pressed: "false" });

  await expect.poll(async () => page.evaluate(() => {
    const player = window.__THREE_JS_GAME__.app.$webgl?.scenes?.current?.player;
    const clip = player?.animation?.animationID || player?.currentAnimation || null;
    return clip !== "Action" || Number(player?.animations?.Action?.currentWeight || 0) < 0.4;
  }), { timeout: 8_000 }).toBe(true);
});
