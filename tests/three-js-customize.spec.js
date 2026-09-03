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

test("profile opens the original Customize color picker", async ({ page }) => {
  await waitForGame(page);
  await enterPlaying(page);

  const header = page.locator("#threejs-hud .app-header");
  await expect.poll(async () => header.evaluate((node) => node.classList.contains("is-visible")), { timeout: 10_000 }).toBe(true);

  await page.locator("#threejs-hud .app-header [aria-label]").first().click();

  await expect.poll(async () => page.evaluate(() => window.__THREE_JS_GAME__.app.$route?.name), { timeout: 10_000 }).toBe("Customize");
  await expect.poll(async () => page.evaluate(() => ({
    open: !!window.__THREE_JS_GAME__.app.$store.isCustomizeOpen,
    customizing: !!window.__THREE_JS_GAME__.app.$webgl?.store?.isCustomizing?.value,
  })), { timeout: 10_000 }).toMatchObject({ open: true, customizing: true });

  const picker = page.locator(".page-customize .color-picker, .color-picker").first();
  await expect(picker).toBeVisible({ timeout: 10_000 });
  await expect.poll(async () => picker.evaluate((node) => !node.classList.contains("hide")), { timeout: 10_000 }).toBe(true);

  await expect(page.locator(".page-phone")).toHaveCount(0);
  await expect(page.locator(".phone-hud")).toHaveCount(0);

  await page.locator(".page-customize .actions [aria-label]").first().click();
  await expect.poll(async () => page.evaluate(() => window.__THREE_JS_GAME__.app.$route?.name), { timeout: 10_000 }).toBe("Home");
  await expect.poll(async () => page.evaluate(() => !!window.__THREE_JS_GAME__.app.$store.isCustomizeOpen), { timeout: 10_000 }).toBe(false);
});
