import { RESOURCE_IDS, RESOURCES } from "../data/world/resources.js";
import { BORDER_LINKS } from "../data/world/borders.js";
import { US_REGION } from "../data/world/regions/us.js";
import { CA_REGION } from "../data/world/regions/ca.js";
import { MEXICO_REGION } from "../data/world/regions/mexico.js";
import { CENTRAL_AMERICA } from "../data/world/regions/central-america.js";
import { CARIBBEAN } from "../data/world/regions/caribbean.js";

function modesFor(kind) {
  if (kind === "sea") return ["sea"];
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
]);

const COMMAND_SLOTS = ["head_of_state", "defense_minister", "chief_of_staff", "front_commander", "field_officer"];
const STATUSES = new Set(["neutral", "occupied", "held"]);
const LINK_KINDS = new Set(["road", "rail", "sea", "trail"]);

export function worldCatalog() {
  return { resources: RESOURCES, regions: WORLD_REGIONS };
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
  COMMAND_SLOTS.forEach((slot) => {
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
