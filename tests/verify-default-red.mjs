import { chromium } from "playwright";

const URL = process.env.GLORB_URL || "http://127.0.0.1:43219/three-js";

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--use-gl=angle", "--use-angle=swiftshader-webgl"],
});
const page = await browser.newPage({ viewport: { width: 500, height: 900 } });
page.setDefaultTimeout(120_000);
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector("#preloader", { state: "hidden", timeout: 90_000 }).catch(() => {});
await page.waitForFunction(() => !!window.__THREE_JS_GAME__?.app, null, { timeout: 90_000 });
await page.evaluate(async () => {
  const app = window.__THREE_JS_GAME__.app;
  const webgl = app.$webgl;
  webgl.store.intro.journeyStarted.set(true);
  if (app.$store.sceneStates?.Playing != null) app.$store.sceneState = app.$store.sceneStates.Playing;
  await webgl.scenes.teleportTo("IslandWest", { noAnimations: true, noAnimation: true });
});
await page.waitForFunction(
  () => !!window.__THREE_JS_GAME__?.app?.$webgl?.scenes?.current?.player?.mesh,
  null,
  { timeout: 60_000 },
);
await page.waitForTimeout(800);

const dump = await page.evaluate(() => {
  const app = window.__THREE_JS_GAME__.app;
  const p = app.$webgl.scenes.current.player;
  return {
    saveColor: app.$savestate.game.player.color,
    colorId: p.mesh?.colorId ?? null,
    uniform: p.mesh?.material?.uniforms?.colorId?.value ?? null,
    gradientID: app.$characters?.colors?.[app.$savestate.game.player.color]?.gradientID ?? null,
    animationID: p.animation?.animationID ?? null,
  };
});

await page.screenshot({ path: "/opt/cursor/artifacts/verified-default-red.png" });
console.log(JSON.stringify(dump, null, 2));
await browser.close();

if (dump.saveColor !== "character4" || Number(dump.colorId) !== 31) {
  console.error("expected red character4 / colorId 31");
  process.exit(1);
}
