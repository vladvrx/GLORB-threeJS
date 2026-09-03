#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 43217);

spawnSync(process.execPath, [path.join(ROOT, "scripts/build.mjs")], { stdio: "inherit" });

const MIME = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "127.0.0.1"}`);
  let filePath = path.normalize(path.join(ROOT, decodeURIComponent(url.pathname)));
  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("forbidden");
    return;
  }
  if (url.pathname === "/" || url.pathname === "/index.html") {
    spawnSync(process.execPath, [path.join(ROOT, "scripts/build.mjs")], { stdio: "ignore" });
    filePath = path.join(ROOT, "index.html");
  }
  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("not found");
      return;
    }
    const data = fs.readFileSync(filePath);
    response.writeHead(200, {
      "cache-control": "no-store",
      "content-type": MIME[path.extname(filePath)] || "application/octet-stream",
      "content-length": data.length,
    });
    response.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`glorb at http://127.0.0.1:${PORT}/`);
});
