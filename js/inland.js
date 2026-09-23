/**
 * Foreign inland combat desks — id hooks only.
 * Campaign owns roads and node paint. These strings are the locked ids.
 * A missing map node still opens the shared siege board or field spawn.
 */

export const INLAND_IDS = [
  "kamchatka",
  "siberia",
  "havana",
  "managua",
  "sponsor_lane",
  "kr_inland",
];

/** Default WORKS / opening parapet pressure. Live walls win when Campaign has painted them. */
export const INLAND_DESKS = {
  kamchatka: {
    name: "Kamchatka Works",
    short: "Kamchatka",
    walls: 56,
    garrison: 74,
    pressure: 0,
    terrainBias: "ice",
    approach: "far_russia",
    flavor: "Volcanic berm and ice revetment on the far shore.",
  },
  siberia: {
    name: "Siberia Column",
    short: "Siberia",
    walls: 36,
    garrison: 68,
    pressure: 4,
    terrainBias: "forest",
    approach: "far_russia",
    flavor: "Timber berm in the taiga, a long march from the strait.",
  },
  havana: {
    name: "Havana Harbor",
    short: "Havana",
    walls: 48,
    garrison: 66,
    pressure: 16,
    terrainBias: "urban",
    approach: "far_cuba",
    flavor: "Harbor wall and seawall sandbags.",
  },
  managua: {
    name: "Managua Works",
    short: "Managua",
    walls: 28,
    garrison: 50,
    pressure: 22,
    terrainBias: "urban",
    approach: "far_nicaragua",
    flavor: "Low block walls on the isthmus road.",
  },
  sponsor_lane: {
    name: "Sponsor Lane",
    short: "Lane",
    walls: 32,
    garrison: 42,
    pressure: 8,
    terrainBias: "hills",
    approach: "far_russia",
    flavor: "Checkpoint berm where the sponsor crates change hands.",
  },
  kr_inland: {
    name: "Inland Ridge",
    short: "Inland",
    walls: 40,
    garrison: 58,
    pressure: 12,
    terrainBias: "hills",
    approach: "far_korea",
    flavor: "Ridge berm inland of the peninsula desk.",
  },
};

export function inlandDesk(id) {
  return INLAND_DESKS[id] || null;
}

/**
 * Combat view for a locked id. Does not write neighbors, polygons, or biomes.
 * Painted walls (walls > 0) on a live node replace the desk preset.
 */
export function combatView(live, id, wallsOverride = 0) {
  const desk = inlandDesk(id);
  if (!desk) return live || null;
  const override = Number(wallsOverride);
  const walls =
    Number.isFinite(override) && override > 0
      ? Math.min(90, Math.round(override))
      : live && live.walls > 0
        ? live.walls
        : desk.walls;
  return {
    id,
    name: live?.name || desk.name,
    short: live?.short || desk.short,
    walls,
    garrison: live?.garrison > 0 ? live.garrison : desk.garrison,
    terrainBias: live?.terrainBias || desk.terrainBias,
    pressure: live?.pressure != null ? live.pressure : desk.pressure,
    flavor: desk.flavor,
    owner: live?.owner ?? null,
    stateCode: live?.stateCode || live?.state || null,
  };
}
