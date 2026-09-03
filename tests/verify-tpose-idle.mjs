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
  () => !!window.__THREE_JS_GAME__?.app?.$webgl?.scenes?.current?.player,
  null,
  { timeout: 60_000 },
);
await page.waitForTimeout(1200);

const dump = await page.evaluate(() => {
  const p = window.__THREE_JS_GAME__.app.$webgl.scenes.current.player;
  const bag = { ...(p.allAnims || {}), ...(p.animations || {}) };
  const actions = Object.entries(bag)
    .filter(([, a]) => a)
    .map(([k, a]) => ({
      name: k,
      animationID: a.animationID,
      weight: Number((a.weight || 0).toFixed(4)),
      currentWeight: Number((a.currentWeight || 0).toFixed(4)),
    }))
    .sort((a, b) => b.weight - a.weight || b.currentWeight - a.currentWeight);
  return {
    animationID: p.animation?.animationID ?? null,
    forcedIdle: p.forcedIdle ?? null,
    top: actions.filter((a) => a.weight > 0.01 || a.currentWeight > 0.01).slice(0, 6),
  };
});

await page.screenshot({ path: "/opt/cursor/artifacts/verified-tpose-idle.png" });
console.log(JSON.stringify(dump, null, 2));
await browser.close();

const playing = dump.animationID === "T-Pose" || dump.top?.[0]?.name === "T-Pose";
if (!playing) {
  console.error("expected T-Pose idle, got", dump);
  process.exit(1);
}
