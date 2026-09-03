const { test, expect } = require("@playwright/test");

test.use({
  channel: "chrome",
  headless: true,
  viewport: { width: 1280, height: 720 },
});
test.setTimeout(240_000);

const THREE_JS_URL = process.env.GLORB_URL || "http://127.0.0.1:43219/three-js";

async function runtime(page) {
  return page.evaluate(() => {
    const game = window.__THREE_JS_GAME__;
    const app = game?.app;
    const webgl = app?.$webgl;
    const scene = webgl?.scenes?.current;
    return {
      route: app?.$route?.name ?? null,
      scene: webgl?.scenes?.currentSceneID?.value ?? null,
      dialog: app?.$dialogs?.current?.node?.id ?? null,
      dialogVisible: !!app?.$store?.isDialogVisible,
      headerVisible: document.querySelector("#threejs-hud .app-header")?.classList.contains("is-visible") ?? false,
      menuOpen: !!document.querySelector("#threejs-hud .menu.is-open"),
      isHeaderVisible: !!app?.$store?.isHeaderVisible,
      isTransitionActive: !!app?.$store?.isTransitionActive,
      isMenuOpen: !!app?.$store?.isMenuOpen,
      isOverlayVisible: !!app?.$store?.isOverlayVisible,
      sceneState: app?.$store?.sceneState ?? null,
      playingState: app?.$store?.sceneStates?.Playing ?? null,
      tutorialState: app?.$store?.sceneStates?.Tutorial ?? null,
      intro: webgl?.store?.intro
        ? {
            journeyStarted: webgl.store.intro.journeyStarted.value,
            startJourneyVisible: webgl.store.intro.startJourneyVisible.value,
          }
        : null,
      tutorial: Number(app?.$store?.sceneState) === Number(app?.$store?.sceneStates?.Tutorial),
      tutorialVisible: !!document.querySelector(".tutorial-container"),
      muteVisible: !!document.querySelector("#threejs-hud [data-sound-toggle]")
        && document.querySelector("#threejs-hud .app-header")?.classList.contains("is-visible"),
      canMove: !!scene?.player?.canMove,
      introCamProgress: scene?.introCamProgress ?? null,
      isEntered: !!scene?.isEntered,
      isFormOpen: !!app?.$store?.isFormOpen,
      isGuest: !!app?.$store?.isGuest,
    };
  });
}

async function finishBubble(page, text) {
  const dialog = page.locator(".dialog-bubble").filter({ hasText: text }).last();
  await expect(dialog).toContainText(text, { timeout: 40_000 });
  await expect(dialog.locator(".bubble")).toHaveClass(/is-done/, { timeout: 40_000 });
  await page.keyboard.press("Space");
}

test("Three.js intro Yes choice boats the player to Cove Island", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.stack || error.message));

  await page.goto(THREE_JS_URL, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#preloader")).toBeHidden({ timeout: 90_000 });
  await expect(page.locator(".start-btn").first()).toBeVisible({ timeout: 60_000 });

  const before = await runtime(page);
  expect(before.route).toBe("Intro");
  expect(before.scene).toBe("IslandIntro");
  expect(before.headerVisible).toBe(false);
  expect(before.intro?.startJourneyVisible).toBe(true);

  await page.locator(".start-btn").first().click();
  await finishBubble(page, "HELLO WELCOME");
  await finishBubble(page, "Glorbs found");
  await finishBubble(page, "CAN YOU HELP US");

  const yes = page.getByRole("button", { name: "Yes", exact: true });
  const no = page.getByRole("button", { name: "No thanks" });
  await expect(yes).toBeVisible({ timeout: 20_000 });
  await expect(no).toBeVisible();
  await expect(yes).toHaveClass(/green/);
  await yes.click();

  await finishBubble(page, "Cove Island");

  await expect.poll(async () => (await runtime(page)).scene, { timeout: 90_000 }).toBe("IslandWest");
  await expect.poll(async () => (await runtime(page)).route, { timeout: 30_000 }).toBe("Home");
  await expect.poll(async () => !(await runtime(page)).isTransitionActive, { timeout: 90_000 }).toBe(true);

  await expect.poll(async () => {
    const now = await runtime(page);
    return Number(now.sceneState) >= Number(now.tutorialState);
  }, { timeout: 90_000 }).toBe(true);

  const afterBoat = await runtime(page);
  if (Number(afterBoat.sceneState) < Number(afterBoat.playingState)) {
    await expect.poll(async () => (await runtime(page)).tutorialVisible, { timeout: 20_000 }).toBe(true);
    expect((await runtime(page)).headerVisible).toBe(false);
    await expect(page.locator("#threejs-hud .app-header [data-sound-toggle]")).toBeHidden();
    await page.keyboard.down("KeyW");
    await expect.poll(async () => {
      const now = await runtime(page);
      return Number(now.sceneState) >= Number(now.playingState);
    }, { timeout: 120_000 }).toBe(true);
    await page.keyboard.up("KeyW");
  }

  await expect.poll(async () => (await runtime(page)).canMove, { timeout: 30_000 }).toBe(true);
  await expect.poll(async () => (await runtime(page)).headerVisible, { timeout: 30_000 }).toBe(true);
  await expect(page.locator("#threejs-hud .app-header [data-sound-toggle]")).toBeVisible();
  await expect.poll(async () => (await runtime(page)).tutorialVisible, { timeout: 5_000 }).toBe(false);

  const header = await runtime(page);
  expect(header.dialogVisible).toBe(false);
  expect(header.menuOpen).toBe(false);

  await page.locator("#threejs-hud .app-header .logo").click();
  await page.waitForTimeout(400);
  const afterLogo = await runtime(page);
  expect(afterLogo.menuOpen).toBe(false);
  expect(afterLogo.headerVisible).toBe(true);
  await expect(page.locator("#threejs-hud .menu")).toHaveCount(0);
  await expect(page.locator(".menu.is-open")).toHaveCount(0);
  await expect(page.getByText(/proudly brought to you/i)).toHaveCount(0);
  await expect(page.getByText(/tech company/i)).toHaveCount(0);
  await expect(page.getByRole("link", { name: /learn more/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /learn more/i })).toHaveCount(0);

  const after = await runtime(page);
  expect(after.dialogVisible).toBe(false);
  expect(after.menuOpen).toBe(false);
  expect(after.headerVisible).toBe(true);
  expect(errors).toEqual([]);
});
