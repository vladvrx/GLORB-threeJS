import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FORBIDDEN = [
  "Change your style",
  "Open the map to quickly navigate",
  "open the map &amp; find out",
  "open the map & find out",
  "Head here first",
  "Click here to find out what you can visit",
  'hintType: "customize"',
  'hintType:"customize"',
  'hintType: "map"',
  'hintType:"map"',
  'hintType: "partner"',
  'hintType:"partner"',
  'hintType: "fintech"',
  'hintType:"fintech"',
  "hint.customize",
  "hint.map",
  "hint.partner",
  "hint.fintech",
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
if (site.site?.hint?.customize || site.site?.hint?.map || site.site?.hint?.partner || site.site?.hint?.fintech) {
  fail("site.json still has customize, map, partner, or fintech hints");
}
scan("site.json", JSON.stringify(site.site?.hint ?? {}));

const notifications = JSON.parse(fs.readFileSync(path.join(ROOT, "reference/assets/studio-notifications.json"), "utf8"));
if (notifications.some((item) => ["customize", "map", "fintech", "partner"].includes(item.id))) {
  fail("studio-notifications.json still has customize, map, partner, or fintech hints");
}
scan("studio-notifications.json", JSON.stringify(notifications));

const pack = JSON.parse(fs.readFileSync(path.join(ROOT, "reference/assets/studio-game-pack.json"), "utf8"));
scan("studio-game-pack notifications", JSON.stringify(pack.notifications ?? []));
scan("studio-game-pack site_hints", JSON.stringify(pack.site_hints ?? {}));
scan("studio-game-pack locale.hint", JSON.stringify(pack.locale?.hint ?? {}));
if (pack.site_hints?.fintech || pack.site_hints?.partner || pack.locale?.hint?.fintech || pack.locale?.hint?.partner) {
  fail("studio-game-pack still has fintech/partner hint copy");
}

const files = [
  ["vendor bundle", "vendor/vendor.75f6e6ae65453426.js"],
  ["assets vendor bundle", "reference/assets/vendor.75f6e6ae65453426.js"],
  ["index.html", "reference/index.html"],
  ["reference.html", "reference/reference.html"],
  ["engine.js", "three-js/src/engine.js"],
];
for (const [label, rel] of files) {
  scan(label, fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

const engine = fs.readFileSync(path.join(ROOT, "three-js/src/engine.js"), "utf8");
if (!/blocked = new Set\(\["customize", "map", "fintech", "partner"\]\)/.test(engine)) {
  fail("engine.js does not suppress fintech/partner hints");
}

const apply = fs.readFileSync(path.join(ROOT, "scripts/apply-to-datab-each.mjs"), "utf8");
if (!apply.includes('BLOCKED_HINTS = new Set(["customize", "map", "fintech", "partner"])')) {
  fail("apply-to-datab-each.mjs does not block fintech/partner hints");
}

console.log("ok: customize, map, and head-here-first hint copy is gone");
