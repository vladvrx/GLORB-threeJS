const { test, expect } = require("@playwright/test");

test.use({
  channel: "chrome",
  headless: true,
  viewport: { width: 1280, height: 720 },
});
test.setTimeout(180_000);

const THREE_JS_URL = process.env.GLORB_URL || "http://127.0.0.1:43219/three-js";

async function finishBubble(page, text) {
  const dialog = page.locator(".dialog-bubble").filter({ hasText: text }).last();
  await expect(dialog).toContainText(text, { timeout: 40_000 });
  await expect(dialog.locator(".bubble")).toHaveClass(/is-done/, { timeout: 40_000 });
  await page.keyboard.press("Space");
}

test("talk bubbles drive NPC mouths and Yes/No uses the original prompt chrome", async ({ page }) => {
  await page.goto(THREE_JS_URL, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#preloader")).toBeHidden({ timeout: 90_000 });
  await expect(page.locator(".start-btn").first()).toBeVisible({ timeout: 60_000 });
  await page.locator(".start-btn").first().click();

  const bubble = page.locator("#threejs-hud .dialog-bubble.visible .bubble").last();
  await expect(bubble).toBeVisible({ timeout: 40_000 });
  await expect(page.locator("#threejs-hud .dialog-bubble .badge.red")).toHaveCount(1);

  await expect.poll(async () => page.evaluate(() => {
    const speaker = window.__THREE_JS_GAME__?.app?.$dialogs?.current?.speaker;
    if (!speaker) return { present: false };
    return {
      present: true,
      isNPC: !!speaker.isNPC,
      mouth: speaker.overrideMouth,
    };
  }), { timeout: 20_000 }).toMatchObject({ present: true });

  const mouth = await page.evaluate(() => {
    const speaker = window.__THREE_JS_GAME__.app.$dialogs.current.speaker;
    return {
      isNPC: !!speaker?.isNPC,
      mouth: speaker?.overrideMouth ?? null,
    };
  });
  if (mouth.isNPC) {
    await expect.poll(async () => page.evaluate(() => (
      window.__THREE_JS_GAME__.app.$dialogs.current?.speaker?.overrideMouth
    )), { timeout: 15_000 }).not.toBeNull();
  }

  await finishBubble(page, "Welcome aboard");
  await finishBubble(page, "Glorbs found");
  await finishBubble(page, "can you help us");

  const prompt = page.locator("#threejs-hud .dialog-buttons .prompt");
  await expect(prompt).toBeVisible({ timeout: 20_000 });
  await expect(prompt.locator(".badge.blue")).toHaveCount(1);
  const yes = page.getByRole("button", { name: "Yes", exact: true });
  const no = page.getByRole("button", { name: "No thanks" });
  await expect(yes).toBeVisible();
  await expect(no).toBeVisible();
  await expect(yes).toHaveClass(/green/);
  await expect(yes).toHaveClass(/intro-choice-yes/);
  await expect(no).toHaveClass(/gray/);
  await expect(no).toHaveClass(/intro-choice-no/);
});
