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

test("recovered HUD chrome is present without phone or map", async ({ page }) => {
  await waitForGame(page);

  await expect(page.locator(".vignetting")).toHaveCount(1);
  await expect(page.locator(".rotate-device")).toHaveCount(1);
  await expect(page.locator("#threejs-hud .interaction-button canvas")).toHaveCount(1);
  await expect(page.locator(".phone-hud")).toHaveCount(0);
  await expect(page.locator(".page-phone")).toHaveCount(0);

  const flags = await page.evaluate(() => {
    const app = window.__THREE_JS_GAME__.app;
    return {
      isGuest: !!app.$store.isGuest,
      isFormOpen: !!app.$store.isFormOpen,
      saveToken: app.$savestate?.saveToken || null,
      phoneVisible: !!app.$store.phone?.isVisible,
    };
  });
  expect(flags.isGuest).toBe(true);
  expect(flags.isFormOpen).toBe(false);
  expect(flags.saveToken).toBeFalsy();
  expect(flags.phoneVisible).toBe(false);
});

test("expired save overlay matches the original API notif", async ({ page }) => {
  await waitForGame(page);
  await page.waitForTimeout(2500);
  await page.evaluate(() => {
    window.__THREE_JS_GAME__.app.$notifs.setApiNotif("expiredSaveState");
  });
  const overlay = page.locator("#threejs-hud .api-notif");
  await expect(overlay).toBeVisible({ timeout: 5_000 });
  await expect(overlay.locator(".card-header")).toContainText("Oops!");
  await expect(overlay.locator(".cta")).toContainText("Reload");
  const visible = await page.evaluate(() => !!window.__THREE_JS_GAME__.app.$store.isApiErrorVisible);
  expect(visible).toBe(true);
});

test("header logo does not open the white pause tab", async ({ page }) => {
  await waitForGame(page);
  await enterPlaying(page);

  const header = page.locator("#threejs-hud .app-header");
  await expect.poll(async () => header.evaluate((node) => node.classList.contains("is-visible")), { timeout: 10_000 }).toBe(true);
  await page.locator("#threejs-hud .app-header .logo").click();
  await page.waitForTimeout(500);

  await expect(page.locator("#threejs-hud .menu")).toHaveCount(0);
  await expect(page.locator(".menu.is-open")).toHaveCount(0);
  await expect(page.getByText(/proudly brought to you/i)).toHaveCount(0);
  await expect(page.getByText(/Learn more/)).toHaveCount(0);
  expect(await page.evaluate(() => !!window.__THREE_JS_GAME__.app.$store.isMenuOpen)).toBe(false);
  await expect(header).toHaveClass(/is-visible/);
});

test("hold interaction fills the original ring and fires onDone", async ({ page }) => {
  await waitForGame(page);
  await enterPlaying(page);

  await page.evaluate(() => {
    window.__HOLD_DONE = false;
    const store = window.__THREE_JS_GAME__.app.$webgl.store;
    store.interactionButton.set({
      mode: "hold",
      speed: 80,
      icon: "interactions-yes",
      onDone() {
        window.__HOLD_DONE = true;
      },
      onStart() {},
      onStop() {},
      onProgress() {},
      onTap() {},
    });
  });

  const button = page.locator("#threejs-hud .interaction-button button");
  await expect(page.locator("#threejs-hud .interaction-button")).toHaveCSS("visibility", "visible");
  await expect(page.locator("#threejs-hud .interaction-button .wrapper")).toHaveClass(/mode-hold/);
  await button.dispatchEvent("mousedown");
  await expect.poll(async () => page.evaluate(() => !!window.__HOLD_DONE), { timeout: 15_000 }).toBe(true);
});
