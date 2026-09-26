import { RESOURCE_IDS, RESOURCES } from "../data/world/resources.js";
import { BORDER_LINKS } from "../data/world/borders.js";
import { US_REGION } from "../data/world/regions/us.js";
import { CA_REGION } from "../data/world/regions/ca.js";
import { MEXICO_REGION } from "../data/world/regions/mexico.js";
import { CENTRAL_AMERICA } from "../data/world/regions/central-america.js";
import { CARIBBEAN } from "../data/world/regions/caribbean.js";
import { SOUTH_AMERICA } from "../data/world/regions/south-america.js";
import { WESTERN_EUROPE } from "../data/world/regions/western-europe.js";
import { EASTERN_EUROPE } from "../data/world/regions/eastern-europe.js";
import { MIDDLE_EAST } from "../data/world/regions/middle-east.js";
import { SUB_SAHARAN_AFRICA } from "../data/world/regions/sub-saharan-africa.js";
import { ASIA_OCEANIA } from "../data/world/regions/asia-oceania.js";

function modesFor(kind) {
  if (kind === "sea") return ["sea"];
  if (kind === "air") return ["air"];
  if (kind === "trail") return ["trail"];
  if (kind === "rail") return ["rail", "road"];
  return ["road"];
}

/** Real border crossings are stored once and written onto both cities. */
function stitchBorders(regions) {
  const byId = new Map();
  regions.forEach((region) => region.territories.forEach((t) => byId.set(t.id, t)));
  BORDER_LINKS.forEach(([a, b, kind, via]) => {
    const A = byId.get(a);
    const B = byId.get(b);
    if (!A || !B) throw new Error(`border link ${a}–${b} is missing a city`);
    if (!A.neighbors.some((n) => n.id === b)) A.neighbors.push({ id: b, kind, via, modes: modesFor(kind) });
    if (!B.neighbors.some((n) => n.id === a)) B.neighbors.push({ id: a, kind, via, modes: modesFor(kind) });
  });
  return regions;
}

/** Regions ship one module at a time. Append the next country here. */
export const WORLD_REGIONS = stitchBorders([
  US_REGION,
  CA_REGION,
  MEXICO_REGION,
  ...CENTRAL_AMERICA,
  ...CARIBBEAN,
  ...SOUTH_AMERICA,
  ...WESTERN_EUROPE,
  ...EASTERN_EUROPE,
  ...MIDDLE_EAST,
  ...SUB_SAHARAN_AFRICA,
  ...ASIA_OCEANIA,
]);

const COMMAND_SLOTS = ["head_of_state", "defense_minister", "chief_of_staff", "front_commander", "field_officer"];

/** Roster size follows the country. A one-island post does not get a five-chair staff. */
export function requiredCommandSlots(territoryCount) {
  if (territoryCount <= 2) return ["head_of_state", "field_officer"];
  if (territoryCount <= 7) return ["head_of_state", "defense_minister", "field_officer"];
  return COMMAND_SLOTS;
}
const STATUSES = new Set(["neutral", "occupied", "held"]);
const LINK_KINDS = new Set(["road", "rail", "sea", "air", "trail"]);

/** Union republics and dependencies. The USSR itself is not a region. */
export const SOVEREIGN_OF = {
  ru: "su", ua: "su", by: "su", md: "su", ee: "su", lv: "su", lt: "su",
  ge: "su", am: "su", az: "su", kz: "su", uz: "su", kg: "su", tj: "su", tm: "su",
  hk: "gb", gi: "gb", fk: "gb", ai: "gb", vg: "gb", ms: "gb", pn: "gb",
  pr: "us", vi: "us", gu: "us", as: "us", mp: "us",
  re: "fr", yt: "fr", gf: "fr", gp: "fr", mq: "fr", pf: "fr", ncl: "fr", wf: "fr",
  mo: "pt",
  ck: "nz", nu: "nz", tk: "nz",
  pw: "tt",
};

let catalogCache = null;

export function worldCatalog() {
  if (!catalogCache) {
    catalogCache = {
      resources: RESOURCES,
      regions: WORLD_REGIONS.map((region) => ({
        ...region,
        sovereign: SOVEREIGN_OF[region.id] || null,
      })),
    };
  }
  return catalogCache;
}

export function worldPoliticalCounts(catalog = worldCatalog()) {
  const regions = catalog.regions || [];
  const dependencies = regions.filter((region) => region.sovereign);
  return {
    units: regions.length,
    sovereign: regions.length - dependencies.length,
    dependencies: dependencies.length,
  };
}

export function worldRegion(id) {
  return WORLD_REGIONS.find((r) => r.id === id) || null;
}

export function worldTerritory(id) {
  for (const region of WORLD_REGIONS) {
    const hit = region.territories.find((t) => t.id === id);
    if (hit) return { region, territory: hit };
  }
  return null;
}

/** Same record shape as data/officers.json, kept off the week-0 actor list. */
export function toOfficerRecords(region) {
  return (region?.officers || []).map((o) => ({
    id: o.id,
    name: o.name,
    title: o.title,
    rank: o.rank,
    branch: o.branch,
    slot: o.slot,
    war: o.war,
    int: o.int,
    pol: o.pol,
    chr: o.chr,
    personality: o.personality,
    faction: null,
    region: o.region,
    loyalty: o.loyalty,
    ambition: o.ambition,
    hidden: false,
    legend: false,
    dormant: true,
    world: true,
    fictional: true,
    bio: o.bio,
  }));
}

function insideBox(lon, lat, box, pad) {
  return lon >= box.minLon - pad && lon <= box.maxLon + pad && lat >= box.minLat - pad && lat <= box.maxLat + pad;
}

/**
 * Structural checks for one world region.
 * `opts.pad` is degrees of slack for a downtown pin on a river or shore.
 * `opts.personalities` limits officer personalities to the campaign set.
 * `opts.campaignIds` checks optional campaignId links.
 * `opts.officerNames` rejects a world name that copies the week-0 roster.
 */
export function validateRegion(region, opts = {}) {
  const errors = [];
  const pad = opts.pad ?? 0.08;
  const personalities = opts.personalities || null;
  const campaignIds = opts.campaignIds || null;
  const officerNames = opts.officerNames || null;
  const external = opts.externalTerritories || new Map();
  const fail = (msg) => errors.push(`${region?.id || "?"}: ${msg}`);

  if (!region?.id || !region.name || !region.country) fail("region needs id, name, country");
  if (!STATUSES.has(region.status)) fail(`bad status ${region.status}`);
  if (region.playable !== false && region.reach === "later") fail("a later region must stay unplayable");
  const box = region.bbox;
  if (!box || ![box.minLon, box.maxLon, box.minLat, box.maxLat].every((n) => Number.isFinite(n))) {
    fail("country bbox missing");
  }

  const subs = new Map((region.subdivisions || []).map((s) => [s.id, s]));
  if (subs.size !== (region.subdivisions || []).length) fail("duplicate subdivision ids");
  subs.forEach((s) => {
    if (!s.name || !s.kind || !s.bbox) fail(`subdivision ${s.id} needs name, kind, bbox`);
    if (!s.capital) fail(`subdivision ${s.id} needs a capital`);
  });

  const terrs = region.territories || [];
  const byId = new Map();
  terrs.forEach((t) => {
    if (byId.has(t.id)) fail(`duplicate territory ${t.id}`);
    byId.set(t.id, t);
    if (!t.name || !t.country) fail(`${t.id} needs a name and country`);
    if (t.country !== region.country) fail(`${t.id} country ${t.country} ≠ ${region.country}`);
    const sub = subs.get(t.subdivision);
    if (!sub) fail(`${t.id} has no subdivision ${t.subdivision}`);
    if (!Number.isFinite(t.lat) || !Number.isFinite(t.lon)) fail(`${t.id} needs lat/long`);
    if (box && !insideBox(t.lon, t.lat, box, pad)) fail(`${t.id} outside country bbox`);
    if (sub && !insideBox(t.lon, t.lat, sub.bbox, pad)) fail(`${t.id} outside ${sub.id} bbox`);
    if (!STATUSES.has(t.status)) fail(`${t.id} bad status`);
    if (t.playable) fail(`${t.id} is playable; new atlas nodes stay unplayable until reached`);
    const yields = t.yields || [];
    if (!yields.length) fail(`${t.id} needs at least one yield`);
    yields.forEach((y) => {
      if (!RESOURCE_IDS.has(y)) fail(`${t.id} yield ${y} is not in the resource list`);
    });
    if (!t.geo) fail(`${t.id} needs geo tags`);
    ["farm", "mine", "fuel", "water", "sun", "weather", "defense"].forEach((k) => {
      if (!Number.isFinite(t.geo[k])) fail(`${t.id} geo.${k} missing`);
    });
    if (campaignIds && t.campaignId && !campaignIds.has(t.campaignId)) {
      fail(`${t.id} campaignId ${t.campaignId} is not on the campaign board`);
    }
  });

  subs.forEach((s) => {
    const capital = byId.get(s.capital.startsWith(`${region.id}.`) ? s.capital : `${region.id}.${s.capital}`);
    const cap = capital || byId.get(s.capital);
    if (!cap || cap.subdivision !== s.id) fail(`${s.id} capital is not one of its territories`);
  });

  const seen = new Set();
  terrs.forEach((t) => {
    const links = t.neighbors || [];
    if (!links.length) fail(`${t.id} is an orphan`);
    links.forEach((link) => {
      const other = byId.get(link.id) || external.get(link.id);
      if (!other) fail(`${t.id} lists missing neighbor ${link.id}`);
      if (!LINK_KINDS.has(link.kind)) fail(`${t.id}→${link.id} bad link kind ${link.kind}`);
      const back = other?.neighbors?.find((n) => n.id === t.id);
      if (other && !back) fail(`one-way edge ${t.id}→${link.id}`);
      if (back && back.kind !== link.kind) fail(`kind mismatch ${t.id}↔${link.id}`);
      const key = [t.id, link.id].sort().join("|");
      seen.add(key);
    });
  });

  if (terrs.length) {
    const start = terrs[0].id;
    const stack = [start];
    const hit = new Set([start]);
    while (stack.length) {
      const id = stack.pop();
      byId.get(id).neighbors.forEach((n) => {
        if (!byId.has(n.id) || hit.has(n.id)) return;
        hit.add(n.id);
        stack.push(n.id);
      });
    }
    if (hit.size !== terrs.length) fail(`graph is split (${hit.size}/${terrs.length} reached from ${start})`);
  }

  const officers = region.officers || [];
  const oids = new Set();
  const slots = new Set();
  officers.forEach((o) => {
    if (oids.has(o.id)) fail(`duplicate officer ${o.id}`);
    oids.add(o.id);
    if (!o.fictional) fail(`${o.id} must be marked fictional`);
    if (!o.name || !o.bio || !o.personality || !o.region || !o.rank || !o.branch || !o.slot) {
      fail(`${o.id || o.name} needs name, bio, personality, region, rank, branch, slot`);
    }
    if (!byId.has(o.region)) fail(`${o.id} stationed at missing territory ${o.region}`);
    if (!COMMAND_SLOTS.includes(o.slot)) fail(`${o.id} bad slot ${o.slot}`);
    slots.add(o.slot);
    ["war", "int", "pol", "chr"].forEach((k) => {
      if (!Number.isFinite(o[k]) || o[k] < 1 || o[k] > 99) fail(`${o.id} stat ${k}`);
    });
    if (personalities && o.personality && !personalities.has(o.personality)) {
      fail(`${o.id} personality ${o.personality} is not in the officer system`);
    }
    if (officerNames && o.name && officerNames.has(o.name)) fail(`${o.name} copies a campaign officer`);
  });
  requiredCommandSlots(terrs.length).forEach((slot) => {
    if (!slots.has(slot)) fail(`missing command slot ${slot}`);
  });

  return errors;
}

export function validateWorld(catalog, opts) {
  const errors = [];
  const ids = new Set((catalog.resources || []).map((r) => r.id));
  if (ids.size !== (catalog.resources || []).length) errors.push("duplicate resource ids");
  RESOURCE_IDS.forEach((id) => {
    if (!ids.has(id)) errors.push(`catalog missing resource ${id}`);
  });
  const all = new Map();
  (catalog.regions || []).forEach((region) => {
    (region.territories || []).forEach((t) => {
      if (all.has(t.id)) errors.push(`duplicate territory ${t.id}`);
      all.set(t.id, t);
    });
  });
  (catalog.regions || []).forEach((region) => {
    const external = new Map(all);
    (region.territories || []).forEach((t) => external.delete(t.id));
    validateRegion(region, { ...opts, externalTerritories: external }).forEach((e) => errors.push(e));
  });
  return errors;
}

const RANK_PREFIX = /^(general|colonel|coronel|admiral|almirante|major|captain|capitán|capitan|lieutenant|teniente|brigadier|marshal|mariscal|commodore|sergeant|sargento)\b/i;

/** Full names of 1980s heads of state, heads of government, and service chiefs. */
const BLOCKED_FULL = [
  "ronald reagan", "george bush", "george h w bush", "caspar weinberger", "john vessey", "william crowe", "colin powell", "norman schwarzkopf",
  "mikhail gorbachev", "konstantin chernenko", "yuri andropov", "andrei gromyko", "dmitry ustinov", "dmitri ustinov", "sergei sokolov", "dmitry yazov", "dmitri yazov", "sergey akhromeyev", "sergei akhromeyev", "nikolai ogarkov", "viktor kulikov",
  "margaret thatcher", "michael heseltine", "george younger", "john nott", "edwin bramall",
  "francois mitterrand", "jacques chirac", "laurent fabius", "michel rocard", "charles hernu",
  "helmut kohl", "helmut schmidt", "hans-dietrich genscher", "manfred worner",
  "erich honecker", "egon krenz", "willi stoph", "heinz kessler",
  "wojciech jaruzelski", "gustav husak", "milos jakes", "lubomir strougal",
  "janos kadar", "karoly grosz", "nicolae ceausescu", "elena ceausescu", "todor zhivkov",
  "ramiz alia", "enver hoxha",
  "deng xiaoping", "zhao ziyang", "hu yaobang", "li xiannian", "yang shangkun",
  "yasuhiro nakasone", "noboru takeshita", "emperor hirohito",
  "rajiv gandhi", "indira gandhi", "zia-ul-haq", "muhammad zia-ul-haq", "benazir bhutto",
  "fidel castro", "daniel ortega", "manuel noriega", "augusto pinochet", "ferdinand marcos",
  "muammar qaddafi", "muammar gaddafi", "ruhollah khomeini", "saddam hussein", "hafez assad", "hafiz assad",
  "kim il-sung", "kim il sung", "mobutu sese seko", "pieter botha", "p w botha", "nelson mandela",
  "pedro tenorio", "john haglelgam", "tom davis", "toaripi lauti", "tupuola efi", "kuniwo nakamura",
  "peter coleman", "young vivian", "kuresa nasau", "brian young",
  "haruo remeliik", "lazarus salii", "ngiratkel etpison", "alfonso oiterong", "johnson toribiong",
  "bikenibeu paeniu", "saufatu sopoaga", "faimalaga luka", "kamuta latasi", "ionatana ionatana",
  "iulai ieremio", "apisa ielemia", "maatia toafa", "bikenibeu paeniu",
  "fiame mataafa", "tofilau etilesa", "tupuola efi", "vaai kolone",
  "bailey olter", "john haglelgam", "tosiwo nakayama",
  "amata kabua", "imata kabua", "litokwa tomeing",
  "tom davis", "pupuke robati", "robert woonton", "geoffrey henry",
  "gaston flosse", "gaston leontieff", "oscar temaru", "edouard fritch", "alexandre leontieff",
  "jacques lafleur", "pierre frogier", "jean leques",
  "hammer deroburt", "kennan adeang", "bernard dowiyogo", "lagumot harris", "hammer clodumar",
  "ieremia tabai", "ieremia tito", "teatao teannaki",
  "sione tupou", "taufa'ahau tupou", "fatafehi tupou",
  "batbayar batmunkh", "jambyn batmunkh", "celine grimaldi-sartre", "rainier grimaldi",
  "alvaro lins", "lisandro otero", "mateo bulnes", "harith al-busaidi", "paulo rondon",
  "sailele malielegaoi", "tuilaepa sailele", "tupuola tufuga",
];

/** Distinctive surnames. Common tokens (Kim, Hassan, Santos, Young, Davis) stay off this list. */
const BLOCKED_SURNAMES = new Set([
  "tenorio", "haglelgam", "lauti", "remeliik", "etpison", "salii", "batmunkh", "grimaldi", "tupou",
  "debrum", "clodumar", "paeniu", "ielemia", "mataafa", "alesana", "falcam", "frogier",
  "temaru", "fritch", "woonton", "robati", "nasau", "oiterong", "toribiong", "sopoaga", "talake",
  "olter", "lemari", "tomeing", "leontieff", "sailele", "busaidi", "lins", "bulnes", "rondon",
  "gorbachev", "honecker", "ceausescu", "jaruzelski", "pinochet", "noriega", "khomeini", "qaddafi",
  "gaddafi", "mobutu", "akhromeyev", "ogarkov", "yazov", "weinberger", "schwarzkopf", "zhivkov",
  "kadar", "nakasone", "mitterrand", "hoxha", "strougal",
]);

function foldName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function surnameTokens(name) {
  const folded = foldName(name);
  const parts = folded.split(" ").filter(Boolean);
  const last = parts[parts.length - 1] || "";
  return last.split("-").filter(Boolean);
}

export function classifyOfficerName(name) {
  const folded = foldName(name);
  const blockedFull = new Set(BLOCKED_FULL.map(foldName));
  return {
    folded,
    full: blockedFull.has(folded),
    surnames: surnameTokens(name).filter((token) => BLOCKED_SURNAMES.has(token)),
    rank: RANK_PREFIX.test(String(name || "").trim()),
  };
}

export function officerRosterIssues(catalog = worldCatalog()) {
  const errors = [];
  const byName = new Map();
  const blockedFull = new Set(BLOCKED_FULL.map(foldName));
  (catalog.regions || []).forEach((region) => {
    const given = new Map();
    (region.officers || []).forEach((officer) => {
      const folded = foldName(officer.name);
      if (!folded) return;
      if (blockedFull.has(folded)) errors.push(`${officer.id} uses a real name ${officer.name}`);
      surnameTokens(officer.name).forEach((token) => {
        if (BLOCKED_SURNAMES.has(token)) errors.push(`${officer.id} uses a blocked surname ${token}`);
      });
      if (RANK_PREFIX.test(String(officer.name || "").trim())) {
        errors.push(`${officer.id} starts with a rank: ${officer.name}`);
      }
      const key = folded;
      if (!byName.has(key)) byName.set(key, new Set());
      byName.get(key).add(region.id);
      const first = folded.split(" ")[0];
      given.set(first, (given.get(first) || 0) + 1);
    });
    const roster = region.officers || [];
    if (roster.length >= 3) {
      const only = [...given.values()];
      if (only.length === 1) errors.push(`${region.id} reuses one given name for every officer`);
    }
  });
  byName.forEach((regions, name) => {
    if (regions.size > 1) errors.push(`name ${name} is used in ${[...regions].sort().join(", ")}`);
  });
  const bios = new Map();
  (catalog.regions || []).forEach((region) => {
    (region.officers || []).forEach((officer) => {
      const bio = officer.bio || "";
      if (bio === "Fictional officer. Not a real officeholder of 1985-89.") {
        errors.push(`${officer.id} still uses the boilerplate bio`);
      }
      bios.set(bio, (bios.get(bio) || 0) + 1);
    });
  });
  bios.forEach((count, bio) => {
    if (count > 1) errors.push(`bio shared by ${count} officers: ${bio.slice(0, 80)}`);
  });
  return errors;
}

export function worldCounts(catalog = worldCatalog()) {
  return (catalog.regions || []).map((region) => {
    const states = (region.subdivisions || []).filter((s) => s.kind === "state").length;
    const districts = (region.subdivisions || []).filter((s) => s.kind !== "state").length;
    return {
      id: region.id,
      name: region.name,
      subdivisions: (region.subdivisions || []).length,
      states,
      districts,
      territories: (region.territories || []).length,
      officers: (region.officers || []).length,
      playable: (region.territories || []).filter((t) => t.playable).length,
    };
  });
}
