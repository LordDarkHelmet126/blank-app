import { readFileSync } from "node:fs";
import { loadContent } from "../js/content.js";
import { validateWorld, worldCatalog, worldCounts, toOfficerRecords } from "../js/world.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const officers = JSON.parse(readFileSync(new URL("../data/officers.json", import.meta.url), "utf8"));
const regions = JSON.parse(readFileSync(new URL("../data/regions.json", import.meta.url), "utf8"));
const personalities = new Set(Object.keys(officers.personalities || {}));
const officerNames = new Set(officers.officers.map((o) => o.name));
const campaignIds = new Set(regions.regions.map((r) => r.id));

const catalog = worldCatalog();
const errors = validateWorld(catalog, { personalities, officerNames, campaignIds });
if (errors.length) {
  console.error(errors.join("\n"));
  throw new Error(`world catalog failed ${errors.length} checks`);
}

const counts = worldCounts(catalog);
assert(counts.length >= 1, "at least one world region");
const us = counts.find((c) => c.id === "us");
assert(us, "United States region");
assert(us.states === 50, `50 states, got ${us.states}`);
assert(us.districts === 1, `DC counted apart from states, got ${us.districts}`);
assert(us.subdivisions === 51, `50 states + DC, got ${us.subdivisions}`);
assert(us.territories >= 100, `major-city atlas, got ${us.territories}`);
assert(us.officers >= 10, `command roster, got ${us.officers}`);
assert(us.playable === 0, "atlas cities stay unplayable until a later reach");

const content = await loadContent();
assert(content.world.regions.find((r) => r.id === "us"), "loadContent attaches the world catalog");
assert(content.officers.officers.length === officers.officers.length, "world officers stay off the week-0 roster");
const dormant = toOfficerRecords(content.world.regions[0]);
assert(dormant.every((o) => o.dormant && o.world && o.fictional && o.faction == null), "dormant officer shape");
assert(dormant.every((o) => personalities.has(o.personality)), "personalities slot into the officer system");

const ia = content.world.regions[0].territories.find((t) => t.id === "us.des_moines");
assert(ia.yields.includes("corn") && ia.yields.includes("hogs"), "Iowa is corn and hogs");
const wy = content.world.regions[0].territories.find((t) => t.id === "us.cheyenne");
assert(wy.yields.includes("coal") && wy.yields.includes("oil") && wy.yields.includes("cattle"), "Wyoming is coal, oil, and cattle");
const nome = content.world.regions[0].territories.find((t) => t.id === "us.nome");
assert(!nome.neighbors.some((n) => n.kind === "road"), "Nome has no invented highway");
const juneau = content.world.regions[0].territories.find((t) => t.id === "us.juneau");
assert(juneau.neighbors.some((n) => n.id === "us.seattle" && n.kind === "sea"), "Juneau–Seattle is a sea lane");
assert(!content.world.regions[0].territories.some((t) => t.neighbors.some((n) => n.id.includes("cuba"))), "Cuba sealift stays on the campaign desk");

console.log("ok world catalog");
counts.forEach((c) => {
  console.log(`  ${c.name}: ${c.states} states, ${c.districts} other units, ${c.territories} territories, ${c.officers} officers`);
});
