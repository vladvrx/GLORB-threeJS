import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const URL = process.env.GLORB_URL || "http://127.0.0.1:43219/three-js";
const OUT = "/opt/cursor/artifacts";
const COLORS = ["character0", "character1", "character2", "character3", "character4"];
const LABELS = ["orange", "purple", "blue", "lime", "vermilion"];

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.setDefaultTimeout(120_000);

  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#preloader", { state: "hidden", timeout: 90_000 });
  await page.waitForFunction(() => !!window.__THREE_JS_GAME__?.app?.$webgl?.store, null, { timeout: 60_000 });

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
    store.isHeaderVisible = true;
    store.sceneState = store.sceneStates.Playing;
    if (app.$route?.name !== "Home") await app.$router.replace({ name: "Home" });
  });
  await page.waitForTimeout(800);

  await page.evaluate(async () => {
    const app = window.__THREE_JS_GAME__.app;
    app.$store.isCustomizeOpen = true;
    await app.$router.push({ name: "Customize" });
  });
  await page.waitForFunction(() => window.__THREE_JS_GAME__.app.$route?.name === "Customize", null, { timeout: 15_000 });
  await page.waitForTimeout(1500);

  const results = [];
  for (let i = 0; i < COLORS.length; i++) {
    await page.evaluate((color) => {
      const app = window.__THREE_JS_GAME__.app;
      app.$savestate.game.player.color = color;
      app.$webgl.store.updatePlayerAttributes.emit();
    }, COLORS[i]);
    await page.waitForTimeout(900);

    const sample = await page.evaluate(() => {
      const canvas = document.querySelector("canvas.webgl-canvas, .webgl-wrapper canvas, canvas");
      if (!canvas) return { error: "no canvas" };
      const app = window.__THREE_JS_GAME__.app;
      const colorId = app.$webgl?.world?.player?.mesh?.colorId
        ?? app.$webgl?.character?.player?.mesh?.colorId
        ?? null;
      // Sample a few pixels around screen center (customize character)
      const w = canvas.width;
      const h = canvas.height;
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      const points = [
        [0.5, 0.52],
        [0.5, 0.58],
        [0.5, 0.64],
        [0.46, 0.58],
        [0.54, 0.58],
      ];
      const pixels = [];
      if (gl) {
        for (const [nx, ny] of points) {
          const x = Math.floor(nx * w);
          const y = Math.floor((1 - ny) * h); // WebGL origin bottom-left
          const buf = new Uint8Array(4);
          gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf);
          pixels.push([buf[0], buf[1], buf[2], buf[3]]);
        }
      }
      return {
        color: app.$savestate.game.player.color,
        colorId,
        gradientID: app.$characters?.colors?.[app.$savestate.game.player.color]?.gradientID,
        pixels,
        canvas: { w, h },
      };
    });

    const shot = path.join(OUT, `customize-${LABELS[i]}.png`);
    await page.screenshot({ path: shot, fullPage: false });
    results.push({ label: LABELS[i], shot, ...sample });
    console.log(JSON.stringify(results[results.length - 1]));
  }

  await fs.writeFile(path.join(OUT, "player-color-verify.json"), JSON.stringify(results, null, 2));
  await browser.close();

  // Simple hue checks
  function classify(pixels) {
    const opaque = pixels.filter((p) => p[3] > 10 && (p[0] + p[1] + p[2]) > 40);
    if (!opaque.length) return "empty";
    const [r, g, b] = opaque.reduce((a, p) => [a[0] + p[0], a[1] + p[1], a[2] + p[2]], [0, 0, 0])
      .map((v) => v / opaque.length);
    if (g > r + 30 && g > b + 30 && g > 120) return "lime";
    if (r > 160 && g < 100 && b < 100) return "vermilion";
    if (r > 180 && g > 80 && g < 180 && b < 80) return "orange";
    if (r > 120 && b > 150 && g < 150) return "purple";
    if (b > r + 20 && b > g) return "blue";
    return `other(${r|0},${g|0},${b|0})`;
  }

  console.log("\n=== CLASSIFY ===");
  for (const row of results) {
    console.log(row.label, "=>", classify(row.pixels || []), "colorId", row.colorId, "grad", row.gradientID);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
