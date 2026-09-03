import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FORBIDDEN = [
  "Change your style",
  "Open the map to quickly navigate",
  "open the map &amp; find out",
  "open the map & find out",
  'hintType: "customize"',
  'hintType:"customize"',
  'hintType: "map"',
  'hintType:"map"',
  "hint.customize",
  "hint.map",
];

function fail(message) {
  console.error(message);
  process.exit(1);
}

function scan(label, text) {
  const hits = FORBIDDEN.filter((needle) => text.includes(needle));
  if (hits.length) fail(`${label} still mentions removed hints: ${hits.join(", ")}`);
}

const site = JSON.parse(fs.readFileSync(path.join(ROOT, "direct-port/data/site.json"), "utf8"));
if (site.site?.hint?.customize || site.site?.hint?.map) {
  fail("site.json still has customize or map hints");
}
scan("site.json", JSON.stringify(site.site?.hint ?? {}));

const notifications = JSON.parse(fs.readFileSync(path.join(ROOT, "reference/assets/studio-notifications.json"), "utf8"));
if (notifications.some((item) => item.id === "customize" || item.id === "map")) {
  fail("studio-notifications.json still has customize or map hints");
}
scan("studio-notifications.json", JSON.stringify(notifications));

const pack = JSON.parse(fs.readFileSync(path.join(ROOT, "reference/assets/studio-game-pack.json"), "utf8"));
scan("studio-game-pack notifications", JSON.stringify(pack.notifications ?? []));
scan("studio-game-pack site_hints", JSON.stringify(pack.site_hints ?? {}));
scan("studio-game-pack locale.hint", JSON.stringify(pack.locale?.hint ?? {}));

scan("vendor bundle", fs.readFileSync(path.join(ROOT, "vendor/vendor.75f6e6ae65453426.js"), "utf8"));
scan("assets vendor bundle", fs.readFileSync(path.join(ROOT, "reference/assets/vendor.75f6e6ae65453426.js"), "utf8"));

console.log("ok: customize and map hint copy is gone");
