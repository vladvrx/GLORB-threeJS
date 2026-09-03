import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shell = fs.readFileSync(path.join(root, "src/shell.html"), "utf8");
const game = fs.readFileSync(path.join(root, "src/glorb.js"), "utf8");

if (!shell.includes("__GAME_CODE__")) {
  throw new Error("src/shell.html is missing the __GAME_CODE__ marker");
}

const html = shell.replace("__GAME_CODE__", game.trim());
fs.writeFileSync(path.join(root, "index.html"), html);
console.log("Wrote index.html");
