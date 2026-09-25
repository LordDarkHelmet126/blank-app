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
    line: "Kamchatka desk",
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
    line: "Siberia desk",
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
    line: "Havana desk",
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
    line: "Managua desk",
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
    line: "Sponsor Lane desk",
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
    line: "Inland Ridge desk",
    walls: 40,
    garrison: 58,
    pressure: 12,
    terrainBias: "hills",
    approach: "far_korea",
    flavor: "Ridge berm inland of the peninsula coast.",
  },
};

/**
 * Glance identity for the shared siege board. Presentation only.
 * Colors stay here so a missing id cannot borrow another theater.
 */
export const INLAND_LOOK = {
  kamchatka: {
    strip: "KAMCHATKA DESK",
    read: "Ice berm · far shore",
    bg: "#07141c",
    panel: "#0a1c28",
    edge: "#8fd4ea",
    stripBg: "#145068",
    ink: "#e8f8ff",
    readInk: "#b7e6f4",
    backdrop: "repeating-linear-gradient(90deg, #07141c 0 12px, #145068 12px 14px, #07141c 14px 28px)",
  },
  siberia: {
    strip: "SIBERIA DESK",
    read: "Timber berm · taiga",
    bg: "#0c140c",
    panel: "#101c10",
    edge: "#7cb342",
    stripBg: "#243818",
    ink: "#e4f6c8",
    readInk: "#b7d98a",
    backdrop: "repeating-linear-gradient(180deg, #0c140c 0 10px, #1e3418 10px 14px)",
  },
  havana: {
    strip: "HAVANA DESK",
    read: "Harbor wall · seawall",
    bg: "#06141c",
    panel: "#081820",
    edge: "#26c6b0",
    stripBg: "#0c3844",
    ink: "#d8fff8",
    readInk: "#8ee0d4",
    backdrop: "repeating-linear-gradient(180deg, #0c3844 0 16px, #06141c 16px 20px, #6a3018 20px 24px, #06141c 24px 44px)",
  },
  managua: {
    strip: "MANAGUA DESK",
    read: "Block wall · isthmus",
    bg: "#1a1008",
    panel: "#24160c",
    edge: "#f0b429",
    stripBg: "#4a3010",
    ink: "#ffe7a8",
    readInk: "#f0c56a",
    backdrop: "repeating-linear-gradient(90deg, #1a1008 0 16px, #4a3010 16px 20px, #1a1008 20px 24px, #2a1c0c 24px 40px)",
  },
  sponsor_lane: {
    strip: "SPONSOR LANE DESK",
    read: "Checkpoint · crate berm",
    bg: "#12160c",
    panel: "#161a0c",
    edge: "#e6ee55",
    stripBg: "#2a3010",
    ink: "#f7f7b0",
    readInk: "#d5dc78",
    backdrop: "repeating-linear-gradient(135deg, #12160c 0 10px, #2a3010 10px 12px, #12160c 12px 22px)",
  },
  kr_inland: {
    strip: "INLAND RIDGE DESK",
    read: "Ridge berm · peninsula",
    bg: "#120e18",
    panel: "#16101c",
    edge: "#c9a0e8",
    stripBg: "#2c2040",
    ink: "#f3e4ff",
    readInk: "#d2b4ea",
    backdrop: "repeating-linear-gradient(160deg, #120e18 0 14px, #3a2858 14px 18px, #120e18 18px 32px)",
  },
};

export function inlandDesk(id) {
  return INLAND_DESKS[id] || null;
}

export function inlandLook(id) {
  return INLAND_LOOK[id] || null;
}

/**
 * Presentation stamp for a yard already created. Unknown ids do nothing.
 * Does not touch clock, exchanges, HP, or the arena id used by domestic yards.
 */
export function stampDuelDesk(duel, id) {
  const desk = inlandDesk(id);
  const look = inlandLook(id);
  if (!duel || !desk || !look) return null;
  duel.deskId = id;
  const arena = duel.arena || { id: "porch", label: "Yard" };
  duel.arena = { ...arena, label: look.strip };
  if (Array.isArray(duel.log) && duel.log.length && !String(duel.log[0]).startsWith(desk.line)) {
    duel.log[0] = String(duel.log[0]).replace(/^.*? — /, `${desk.line} — `);
  }
  return id;
}

/**
 * Presentation stamp for a field already created. Unknown ids do nothing.
 * Does not touch grid, units, HP, morale, impulses, or siege state.
 */
export function stampBattleDesk(battle, id) {
  const desk = inlandDesk(id);
  const look = inlandLook(id);
  if (!battle || !desk || !look) return null;
  battle.deskId = id;
  return id;
}

/**
 * Presentation stamp for a court / officers view already opened.
 * Unknown ids do nothing. Does not touch officers, chairs, ranks, or the map.
 */
export function stampCourtDesk(view, id) {
  const desk = inlandDesk(id);
  const look = inlandLook(id);
  if (!view || !desk || !look) return null;
  view.deskId = id;
  return id;
}

/**
 * Presentation stamp for a mission board already opened.
 * Unknown ids do nothing. Does not touch jobs, AP, rewards, or the map.
 */
export function stampMissionDesk(view, id) {
  const desk = inlandDesk(id);
  const look = inlandLook(id);
  if (!view || !desk || !look) return null;
  view.deskId = id;
  return id;
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
    line: desk.line,
    owner: live?.owner ?? null,
    stateCode: live?.stateCode || live?.state || null,
  };
}
