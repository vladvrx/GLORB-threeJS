#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const STAGE = fs.mkdtempSync(path.join(os.tmpdir(), "glorb-zip-"));
const OUT = path.join(ROOT, "glorb.zip");
const LIMIT = 35 * 1024 * 1024;
const CODE_EXT = new Set([".js", ".mjs", ".cjs", ".css", ".html", ".map", ".md", ".ts", ".glsl"]);

function ensureEsbuild() {
  try {
    return import("esbuild");
  } catch {
    const install = spawnSync("npm", ["install", "esbuild@0.25.9", "--no-save"], {
      cwd: ROOT,
      stdio: "inherit",
    });
    if (install.status !== 0) {
      throw new Error("esbuild is required to inline jam code into index.html");
    }
    return import("esbuild");
  }
}

function copyFiltered(from, to) {
  fs.cpSync(from, to, {
    recursive: true,
    filter: (source) => {
      const base = path.basename(source);
      if (base === ".DS_Store" || base === "analysis" || base === "src") return false;
      if (base.endsWith(".map")) return false;
      const ext = path.extname(source).toLowerCase();
      if (CODE_EXT.has(ext)) return false;
      return true;
    },
  });
}

function rewriteCssUrls(css, fromFile) {
  const dir = path.dirname(fromFile);
  return css.replace(/url\((['"]?)([^'")]+)\1\)/g, (match, quote, raw) => {
    const url = raw.trim();
    if (!url || url.startsWith("data:") || url.startsWith("#") || /^https?:/i.test(url)) return match;
    const abs = path.resolve(dir, url);
    const rel = path.relative(ROOT, abs).split(path.sep).join("/");
    return `url(${quote}./${rel}${quote})`;
  });
}

function collectCss() {
  const files = [
    "reference/assets/vendor.a83843c365453426.css",
    "direct-port/styles/recovered-game.css",
    "reference/assets/game-cursor.css",
    "direct-port/styles/direct-port-ui.css",
    "three-js/styles.css",
    "reference/assets/studio-preloader.css",
  ];
  return files.map((rel) => {
    const abs = path.join(ROOT, rel);
    return rewriteCssUrls(fs.readFileSync(abs, "utf8"), abs);
  }).join("\n");
}

function stripQueryPlugin() {
  return {
    name: "strip-query",
    setup(build) {
      build.onResolve({ filter: /./ }, (args) => {
        const q = args.path.indexOf("?");
        if (q < 0) return;
        const bare = args.path.slice(0, q);
        const abs = path.isAbsolute(bare) ? bare : path.join(args.resolveDir, bare);
        return { path: abs };
      });
    },
  };
}

async function bundleGame() {
  const esbuild = await ensureEsbuild();
  const result = await esbuild.build({
    absWorkingDir: ROOT,
    entryPoints: [path.join(ROOT, "scripts/jam-engine.js")],
    bundle: true,
    format: "iife",
    platform: "browser",
    target: ["es2020"],
    outfile: path.join(STAGE, "glorb.bundle.js"),
    write: true,
    legalComments: "none",
    logLevel: "warning",
    banner: { js: "window.__GLORB_START__=function(){" },
    footer: { js: "};" },
    plugins: [stripQueryPlugin()],
  });
  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.text).join("\n"));
  }
  const js = fs.readFileSync(path.join(STAGE, "glorb.bundle.js"), "utf8");
  fs.unlinkSync(path.join(STAGE, "glorb.bundle.js"));
  return js;
}

function escapeScript(text) {
  return text.replace(/<\/script/gi, "<\\/script");
}

function writeIndex({ css, js, boot, studio, dracoDecoder, dracoWrapper }) {
  const html = `<!doctype html>
<html lang="en" class="no-js">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: blob:; base-uri 'self'; connect-src 'self'; font-src 'self' data:; frame-src 'none'; img-src 'self' data: blob:; media-src 'self' data: blob:; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:">
    <base href="./">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="theme-color" content="#70bfe4">
    <meta name="application-name" content="glorb">
    <meta name="apple-mobile-web-app-title" content="glorb">
    <meta name="description" content="Explore the islands, restore their systems, and complete quests.">
    <title>glorb</title>
    <link rel="icon" type="image/png" href="./reference/assets/databeach-logo.png">
    <style>${css}

@media (max-width: 1024px) and (orientation: landscape) {
  html.phone .rotate-device { display: block; }
}
</style>
  </head>
  <body>
    <aside id="preloader" aria-live="polite">
      <img class="logo" src="./reference/assets/databeach-logo.png" alt="glorb">
      <div class="preloader-progress">
        <p class="preloader-counter">0</p>
        <div class="preloader-baseline"><div class="preloader-spinner"></div></div>
      </div>
      <figure class="preloader-foreground"></figure>
      <canvas class="waves"></canvas>
    </aside>
    <div id="app"></div>
    <noscript>This game requires JavaScript.</noscript>
    <script>${escapeScript(studio)}</script>
    <script>
      window.__GLORB_DRACO__ = {
        "draco_decoder.js": ${JSON.stringify(dracoDecoder)},
        "draco_wasm_wrapper.js": ${JSON.stringify(dracoWrapper)}
      };
      (function () {
        const files = window.__GLORB_DRACO__ || {};
        function match(url) {
          const value = String(url || "");
          for (const [name, source] of Object.entries(files)) {
            if (value.includes(name) && /draco/i.test(value)) return source;
          }
          return null;
        }
        const originalFetch = window.fetch.bind(window);
        window.fetch = function (input, init) {
          const url = input && typeof input === "object" && "url" in input ? input.url : input;
          const source = match(url);
          if (source != null) {
            return Promise.resolve(new Response(source, {
              headers: { "content-type": "text/javascript" },
            }));
          }
          return originalFetch(input, init);
        };
      })();
    </script>
    <script>${escapeScript(js)}</script>
    <script>${escapeScript(boot)}</script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(STAGE, "index.html"), html);
}

function zipStage() {
  if (fs.existsSync(OUT)) fs.rmSync(OUT);
  const zip = spawnSync("zip", ["-r", "-q", "-X", OUT, "."], { cwd: STAGE, stdio: "inherit" });
  if (zip.status !== 0) {
    throw new Error("zip failed");
  }
}

const skipped = [];
copyFiltered(path.join(ROOT, "reference"), path.join(STAGE, "reference"));
copyFiltered(path.join(ROOT, "direct-port"), path.join(STAGE, "direct-port"));

const css = collectCss();
const studio = fs.readFileSync(path.join(ROOT, "reference/assets/studio-bridge.js"), "utf8");
const dracoDecoder = fs.readFileSync(path.join(ROOT, "reference/vendors/draco/draco_decoder.js"), "utf8");
const dracoWrapper = fs.readFileSync(path.join(ROOT, "reference/vendors/draco/draco_wasm_wrapper.js"), "utf8");

const js = await bundleGame();
const boot = fs.readFileSync(path.join(ROOT, "scripts/jam-entry.js"), "utf8");
writeIndex({ css, js, boot, studio, dracoDecoder, dracoWrapper });
zipStage();
fs.rmSync(STAGE, { recursive: true, force: true });

const size = fs.statSync(OUT).size;
console.log(`glorb.zip ${(size / (1024 * 1024)).toFixed(2)} MB`);
if (size > LIMIT) {
  console.error(`zip is over 35MB (${size} bytes)`);
  process.exit(1);
}

const listing = spawnSync("unzip", ["-l", OUT], { encoding: "utf8" });
const files = listing.stdout.split("\n").map((line) => line.trim()).filter(Boolean);
const names = files.filter((line) => /\.[a-z0-9]+$/i.test(line.split(/\s+/).pop() || ""));
const leftoverCode = names.filter((line) => {
  const name = line.split(/\s+/).pop() || "";
  return /\.(js|mjs|cjs|css)$/i.test(name);
});
if (leftoverCode.length) {
  console.error("zip still contains separate code files:\n" + leftoverCode.slice(0, 20).join("\n"));
  process.exit(1);
}
console.log("jam zip: all JS/CSS inlined into index.html");
void skipped;
