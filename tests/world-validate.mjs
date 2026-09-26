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

const usRegion = content.world.regions.find((r) => r.id === "us");
const byId = new Map(usRegion.territories.map((t) => [t.id, t]));
const attu = byId.get("us.attu");
assert(attu && attu.neighbors.every((n) => n.kind === "sea"), "Attu is sea-only");
assert(byId.get("us.adak").neighbors.every((n) => n.kind === "sea"), "Adak is sea-only");
assert(!byId.get("us.el_paso").neighbors.some((n) => n.id === "us.san_antonio"), "I-10 does not leap El Paso to San Antonio");
assert(byId.get("us.fort_stockton").neighbors.some((n) => n.id === "us.el_paso"), "Fort Stockton sits on I-10");
assert(!byId.get("us.jacksonville").neighbors.some((n) => n.id === "us.miami"), "I-95 does not leap Jacksonville to Miami");
assert(byId.get("us.viburnum").yields.includes("lead") && byId.get("us.joplin").yields.includes("lead"), "Missouri lead belt is on the map");
const areas = ["northeast", "southeast", "midwest", "plains", "mountain", "southwest", "pacific", "alaska_hawaii"];
areas.forEach((area) => {
  const n = usRegion.officers.filter((o) => o.area === area).length;
  assert(n >= 2, `${area} needs notable officers, got ${n}`);
});
assert(usRegion.officers.some((o) => o.service === "occupation"), "occupation command");
assert(usRegion.officers.filter((o) => o.service === "resistance").length >= 8, "resistance command");
assert(us.officers >= 40, `expanded US roster, got ${us.officers}`);

const ca = counts.find((c) => c.id === "ca");
assert(ca, "Canada region");
const caRegion = content.world.regions.find((r) => r.id === "ca");
assert(caRegion.subdivisions.filter((s) => s.kind === "province").length === 10, "10 provinces");
assert(caRegion.subdivisions.filter((s) => s.kind === "territory").length === 2, "Yukon and NWT; Nunavut is still inside NWT");
assert(!caRegion.subdivisions.some((s) => s.id === "NU"), "no separate Nunavut in the 1980s");
assert(ca.playable === 0, "Canada stays unplayable");
assert(ca.officers >= 10, "Canadian command roster");
const caBy = new Map(caRegion.territories.map((t) => [t.id, t]));
const calgary = caBy.get("ca.calgary");
assert(calgary.yields.includes("oil") && calgary.yields.includes("cattle") && calgary.yields.includes("wheat"), "Calgary oil, cattle, wheat");
assert(caBy.get("ca.edmonton").yields.includes("natural_gas"), "Edmonton gas");
const regina = caBy.get("ca.regina");
assert(regina.yields.includes("wheat") && regina.yields.includes("potash"), "Regina wheat and potash");
assert(caBy.get("ca.la_ronge").yields.includes("uranium"), "Saskatchewan uranium");
assert(caBy.get("ca.sudbury").yields.includes("nickel"), "Sudbury nickel");
assert(caBy.get("ca.saguenay").yields.includes("aluminum") && caBy.get("ca.saguenay").yields.includes("hydro"), "Saguenay aluminum and hydro");
assert(caBy.get("ca.thetford_mines").yields.includes("asbestos"), "Thetford asbestos");
assert(caBy.get("ca.vancouver").yields.includes("timber"), "BC timber");
assert(caBy.get("ca.sydney").yields.includes("coal"), "Cape Breton coal");
assert(caBy.get("ca.whitehorse").yields.includes("lead") && caBy.get("ca.dawson").yields.includes("gold"), "Yukon lead and gold");
const pei = caBy.get("ca.charlottetown");
assert(pei.neighbors.every((n) => n.kind === "sea"), "PEI is a ferry, not a road");
assert(caBy.get("ca.port_aux_basques").neighbors.some((n) => n.id === "ca.sydney" && n.kind === "sea"), "Newfoundland ferry");
assert(!caBy.get("ca.port_aux_basques").neighbors.some((n) => n.kind === "road" && n.id.startsWith("ca.sydney")), "no causeway to Newfoundland");
const windsor = caBy.get("ca.windsor");
assert(windsor.neighbors.some((n) => n.id === "us.detroit" && n.kind === "road"), "Detroit–Windsor bridge");
assert(byId.get("us.detroit").neighbors.some((n) => n.id === "ca.windsor" && n.kind === "road"), "bridge is symmetric");
assert(byId.get("us.seattle").neighbors.some((n) => n.id === "ca.vancouver"), "I-5 / BC-99");
assert(byId.get("us.tok").neighbors.some((n) => n.id === "ca.whitehorse" && n.kind === "road"), "Alaska Highway");
assert(caRegion.officers.some((o) => o.slot === "head_of_state" && o.region === "ca.ottawa"), "Canadian government in Ottawa");
const caDormant = toOfficerRecords(caRegion);
assert(caDormant.every((o) => o.dormant && o.world && o.fictional && o.faction == null), "Canadian officers stay dormant");

console.log("ok world catalog");
counts.forEach((c) => {
  console.log(`  ${c.name}: ${c.states} states, ${c.districts} other units, ${c.territories} territories, ${c.officers} officers`);
});
