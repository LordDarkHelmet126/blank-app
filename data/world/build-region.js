import { geoFromYields } from "./resources.js";

function modesFor(kind) {
  if (kind === "sea") return ["sea"];
  if (kind === "air") return ["air"];
  if (kind === "trail") return ["trail"];
  if (kind === "rail") return ["rail", "road"];
  return ["road"];
}

function envelope(points, pad) {
  let minLon = Infinity;
  let minLat = Infinity;
  let maxLon = -Infinity;
  let maxLat = -Infinity;
  points.forEach((p) => {
    minLon = Math.min(minLon, p.lon);
    minLat = Math.min(minLat, p.lat);
    maxLon = Math.max(maxLon, p.lon);
    maxLat = Math.max(maxLat, p.lat);
  });
  return { minLon: minLon - pad, minLat: minLat - pad, maxLon: maxLon + pad, maxLat: maxLat + pad };
}

/**
 * One atlas country. Cities are [id, name, subdivision, lat, lon, role, yields].
 * Links are undirected [a, b, kind, via] and stay inside the country.
 * Cross-border edges belong in data/world/borders.js.
 */
export function buildRegion(spec) {
  const full = (cityId) => `${spec.id}.${cityId}`;
  const climate = spec.climate || {};
  const biome = spec.biome || {};
  const override = spec.biomeOverride || {};
  const campaign = new Set(spec.campaignIds || []);
  const cityIds = new Set(spec.cities.map((c) => c[0]));

  spec.links.forEach(([a, b]) => {
    if (!cityIds.has(a) || !cityIds.has(b)) {
      throw new Error(`${spec.id} link ${a}–${b} names a missing city`);
    }
  });

  const neighbors = new Map();
  const add = (from, to, kind, via) => {
    if (!neighbors.has(from)) neighbors.set(from, []);
    neighbors.get(from).push({ id: full(to), kind, via, modes: modesFor(kind) });
  };
  spec.links.forEach(([a, b, kind, via]) => {
    add(a, b, kind, via);
    add(b, a, kind, via);
  });

  const territories = spec.cities.map(([id, name, subdivision, lat, lon, role, yields]) => ({
    id: full(id),
    name,
    short: name,
    country: spec.country,
    subdivision,
    lat,
    lon,
    role,
    biome: override[id] || biome[subdivision] || spec.defaultBiome || "tropical",
    yields,
    geo: geoFromYields(yields, climate[subdivision] || climate._default || { sun: 2, weather: 1 }, role, subdivision),
    neighbors: neighbors.get(id) || [],
    status: "occupied",
    playable: false,
    reach: "later",
    campaignId: campaign.has(id) ? id : null,
  }));

  const bySub = new Map();
  territories.forEach((t) => {
    if (!bySub.has(t.subdivision)) bySub.set(t.subdivision, []);
    bySub.get(t.subdivision).push(t);
  });

  const subdivisions = spec.subs.map((sub) => {
    const pins = bySub.get(sub.id) || [];
    const capital = pins.find((t) => t.role === "capital") || pins[0];
    return {
      id: sub.id,
      name: sub.name,
      kind: sub.kind,
      group: sub.group || null,
      country: spec.country,
      biome: biome[sub.id] || spec.defaultBiome || "tropical",
      bbox: sub.bbox || envelope(pins, spec.subPad ?? 0.35),
      capital: capital?.id,
    };
  });

  return {
    id: spec.id,
    name: spec.name,
    country: spec.country,
    era: spec.era || "1985-1989",
    status: "occupied",
    playable: false,
    reach: "later",
    bbox: spec.bbox,
    notes: spec.notes,
    subdivisions,
    territories,
    officers: (spec.officers || []).map((o) => ({ ...o, fictional: true })),
  };
}

export function staff(rows) {
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    title: row.title,
    rank: row.rank,
    branch: row.branch,
    slot: row.slot,
    war: row.war,
    int: row.int,
    pol: row.pol,
    chr: row.chr,
    personality: row.personality,
    loyalty: row.loyalty ?? 74,
    ambition: row.ambition ?? 36,
    region: row.region,
    bio: row.bio,
    fictional: true,
  }));
}
