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

async function enterPlaying(page) {
  await page.evaluate(async () => {
    const app = window.__THREE_JS_GAME__.app;
    const store = app.$store;
    store.isDialogVisible = false;
    store.isDialogVisibleDelayed = false;
    store.isMenuOpen = false;
    store.isFormOpen = false;
    store.isTransitionActive = false;
    store.isTransitionActiveDelayed = false;
    store.isCinematicActive = false;
    store.isApiErrorVisible = false;
    store.isInteractionDone = false;
    store.isNotHomeDelayed = false;
    store.sceneState = store.sceneStates.Playing;
    if (app.$route?.name !== "Home") await app.$router.replace({ name: "Home" });
  });
  await page.waitForTimeout(700);
}

test("jump button sits in the bottom right once playing", async ({ page }) => {
  await waitForGame(page);
  await enterPlaying(page);

  const wrap = page.locator("#threejs-hud .jump-button");
  await expect.poll(async () => wrap.evaluate((node) => node.classList.contains("is-visible")), { timeout: 10_000 }).toBe(true);
  await expect(wrap.locator("button")).toHaveAttribute("aria-label", "Jump");

  const box = await wrap.boundingBox();
  expect(box).toBeTruthy();
  expect(box.x + box.width).toBeGreaterThan(1280 - 160);
  expect(box.y + box.height).toBeGreaterThan(720 - 160);
});
