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
assert(!regions.regions.some((r) => String(r.id).startsWith("cu.") || String(r.id).startsWith("mx.")), "atlas ids stay off the campaign board");
assert(campaignIds.has("havana") && campaignIds.has("far_cuba") && campaignIds.has("managua"), "sealift desks stay on the campaign board");

const usRegion = content.world.regions.find((r) => r.id === "us");
const byId = new Map(usRegion.territories.map((t) => [t.id, t]));
assert(byId.get("us.key_west").neighbors.some((n) => n.id === "cu.havana" && n.kind === "sea"), "Florida Straits use the Gulf Sealift desk");
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

const worldBy = new Map(content.world.regions.flatMap((r) => r.territories.map((t) => [t.id, t])));
const mx = content.world.regions.find((r) => r.id === "mx");
assert(mx.subdivisions.filter((s) => s.kind === "state").length === 31, "31 Mexican states");
assert(mx.subdivisions.some((s) => s.id === "MX-DIF" && s.kind === "district"), "Federal District");
assert(!mx.subdivisions.some((s) => s.id === "NL" || s.id === "BC"), "Mexican codes do not collide with Canada");
assert(worldBy.get("mx.campeche").yields.includes("oil") && worldBy.get("mx.carmen").yields.includes("oil"), "Campeche oil");
assert(worldBy.get("mx.villahermosa").yields.includes("oil") && worldBy.get("mx.veracruz").yields.includes("oil"), "Tabasco and Veracruz oil");
assert(worldBy.get("mx.zacatecas").yields.includes("silver") && worldBy.get("mx.guanajuato").yields.includes("silver"), "Zacatecas and Guanajuato silver");
assert(worldBy.get("mx.tuxtla").yields.includes("coffee"), "Chiapas coffee");
assert(worldBy.get("us.san_diego").neighbors.some((n) => n.id === "mx.tijuana" && n.kind === "road"), "San Ysidro");
assert(worldBy.get("us.nogales").neighbors.some((n) => n.id === "mx.nogales" && n.kind === "road"), "Nogales");
assert(worldBy.get("us.el_paso").neighbors.some((n) => n.id === "mx.juarez" && n.kind === "road"), "El Paso–Juárez");
assert(worldBy.get("us.laredo").neighbors.some((n) => n.id === "mx.nuevo_laredo" && n.kind === "road"), "Laredo");
assert(worldBy.get("us.brownsville").neighbors.some((n) => n.id === "mx.matamoros" && n.kind === "road"), "Brownsville–Matamoros");
assert(worldBy.get("mx.tijuana").neighbors.some((n) => n.id === "us.san_diego"), "border links are symmetric");

const cu = content.world.regions.find((r) => r.id === "cu");
assert(cu.subdivisions.filter((s) => s.kind === "province").length === 14, "14 Cuban provinces");
assert(cu.subdivisions.some((s) => s.id === "CU-IJ"), "Isla de la Juventud");
assert(!cu.subdivisions.some((s) => /artemisa|mayabeque/i.test(s.name)), "no 2011 Cuban provinces");
assert(worldBy.get("cu.moa").yields.includes("nickel"), "Moa nickel");
assert(worldBy.get("cu.pinar").yields.includes("tobacco"), "Pinar tobacco");
assert(worldBy.get("cu.matanzas").yields.includes("citrus"), "Matanzas citrus");
assert(worldBy.get("mx.progreso").neighbors.some((n) => n.id === "cu.pinar" && n.kind === "sea"), "Yucatán Channel");
assert(worldBy.get("cu.havana").campaignId === "havana", "Havana keeps the campaign id");
assert(worldBy.get("ni.managua").campaignId === "managua", "Managua keeps the campaign id");

assert(content.world.regions.find((r) => r.id === "gt").subdivisions.length === 22, "22 Guatemalan departments");
assert(content.world.regions.find((r) => r.id === "bz").subdivisions.length === 6, "6 Belize districts");
assert(content.world.regions.find((r) => r.id === "hn").subdivisions.length === 18, "18 Honduran departments");
assert(content.world.regions.find((r) => r.id === "sv").subdivisions.length === 14, "14 Salvadoran departments");
assert(content.world.regions.find((r) => r.id === "ni").subdivisions.some((s) => s.id === "NI-ZE"), "Zelaya is still one department");
assert(!content.world.regions.find((r) => r.id === "ni").subdivisions.some((s) => /RAAN|RAAS|Caribe/i.test(s.name)), "no split autonomous regions");
assert(content.world.regions.find((r) => r.id === "cr").subdivisions.length === 7, "7 Costa Rican provinces");
assert(content.world.regions.find((r) => r.id === "pa").subdivisions.some((s) => s.id === "PA-CZ"), "Canal Area");
assert(!worldBy.get("pa.yaviza").neighbors.some((n) => n.id.includes("colombia")), "no Darién road");
assert(worldBy.get("jm.mandeville").yields.includes("bauxite"), "Jamaica bauxite");
assert(worldBy.get("tt.point_fortin").yields.includes("oil") && worldBy.get("tt.mayaro").yields.includes("natural_gas"), "Trinidad oil and gas");
assert(worldBy.get("do.bonao").yields.includes("nickel") && worldBy.get("do.cotui").yields.includes("gold"), "Dominican nickel and gold");
assert(worldBy.get("do.san_pedro").yields.includes("sugarcane"), "Dominican sugar");
assert(content.world.regions.filter((r) => ["mx", "gt", "bz", "hn", "sv", "ni", "cr", "pa", "cu", "ht", "do", "jm", "pr", "bs", "vi", "vg", "ai", "kn", "ag", "ms", "gp", "dm", "mq", "lc", "vc", "bb", "gd", "tt"].includes(r.id)).every((r) => r.playable === false && r.officers.length >= 5), "Region 3 stays unplayable with a command staff");
const slots = ["head_of_state", "defense_minister", "chief_of_staff", "front_commander", "field_officer"];
content.world.regions.forEach((r) => {
  if (r.id === "us" || r.id === "ca") return;
  slots.forEach((slot) => assert(r.officers.some((o) => o.slot === slot), `${r.id} has ${slot}`));
  assert(toOfficerRecords(r).every((o) => o.dormant && o.world && o.fictional && o.faction == null), `${r.id} officers stay dormant`);
});

console.log("ok world catalog");
counts.forEach((c) => {
  console.log(`  ${c.name}: ${c.states} states, ${c.districts} other units, ${c.territories} territories, ${c.officers} officers`);
});
