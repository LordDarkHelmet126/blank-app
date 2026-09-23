import { nextFloat, nextInt, pick, chance, jitter } from "./rng.js";
import {
  createBattle,
  battleSelect,
  battleClickCell,
  battlePloy,
  endTacticalTurn,
  autoResolveBattle,
  remainingRatio,
} from "./battle.js";
import {
  hydrateLife,
  tickLife,
  buildChronicle,
  doCourt,
  courtCandidates,
  sampleChronicle,
  calendarYear,
  seasonPalette,
} from "./chronicle.js";
import {
  MISSION_TEMPLATES,
  refreshMissionBoard,
  resolveMission,
  pickStandingJob,
  openMissions,
  seedDemoMissions,
  missionCopy,
  missionById,
  templateOf,
} from "./missions.js";
import {
  createDuel,
  resolveExchange,
  advanceBeat,
  autoResolveDuel,
  finishOnClock,
  aiMove,
  isUnderdog,
  DUEL_CLOCK_S,
  DUEL_MAX_EXCHANGES,
} from "./duel.js";

export { courtCandidates, sampleChronicle, calendarYear, seasonPalette };
export { MISSION_TEMPLATES, openMissions, seedDemoMissions, missionCopy, refreshMissionBoard };
export {
  createDuel,
  autoResolveDuel,
  isUnderdog,
  DUEL_CLOCK_S,
  DUEL_MAX_EXCHANGES,
  aiMove,
};

export const GAME_VERSION = 2;
export const MAX_GENERALS = 5;
export const GENERAL_ORDERS = [
  { id: "auto", label: "By personality" },
  { id: "drill", label: "Drill" },
  { id: "commerce", label: "Commerce" },
  { id: "cultivate", label: "Cultivate" },
  { id: "fortify", label: "Fortify" },
  { id: "safety", label: "Safety" },
  { id: "spy", label: "Spy" },
  { id: "hide", label: "Hide" },
  { id: "research", label: "Salvage" },
  { id: "mission", label: "Side mission" },
];

export const LEGENDS = [
  {
    id: "karr",
    regionId: "arctic_slope",
    huntKey: "legendHunt",
    short: "Ilya Karr, Slope Ghost",
    travel: "Travel to Arctic Slope (via Fairbanks) and Seek Legend.",
  },
  {
    id: "silo",
    regionId: "yukon_road",
    huntKey: "siloHunt",
    short: "Nils Silo, Yukon Radio Ghost",
    travel: "Travel the Yukon Road (via Fairbanks) and Seek Legend.",
  },
  {
    id: "marsh",
    regionId: "kenai",
    huntKey: "marshHunt",
    short: "Cal Marsh, Ranch Marshal",
    travel: "Travel to Kenai (western foothills) and Seek Legend.",
  },
];
export const PERSONALITY_SKILLS = {
  aggressive: ["drill", "fortify", "safety"],
  cautious: ["fortify", "safety", "hide", "cultivate"],
  diplomat: ["commerce", "safety", "research"],
  schemer: ["spy", "hide", "research"],
  merchant: ["commerce", "cultivate", "research"],
  loyalist: ["drill", "fortify", "safety", "cultivate"],
  ambitious: ["drill", "commerce", "spy"],
  recluse: ["hide", "cultivate", "safety", "research"],
};
export const CUSTOM_STAT_MIN = 30;
export const CUSTOM_STAT_MAX = 80;
export const CUSTOM_STAT_BUDGET = 220;
const LOG_CAP = 240;

const DIFFICULTY = {
  easy: {
    gold: 150,
    food: 70,
    retinue: 16,
    pressure: 0.14,
    garrisonMul: 0.78,
    apBonus: 1,
    grace: 10,
    spyBonus: 8,
  },
  normal: {
    gold: 90,
    food: 42,
    retinue: 10,
    pressure: 0.28,
    garrisonMul: 1,
    apBonus: 0,
    grace: 6,
    spyBonus: 0,
  },
  hard: {
    gold: 48,
    food: 24,
    retinue: 6,
    pressure: 0.5,
    garrisonMul: 1.32,
    apBonus: 0,
    grace: 3,
    spyBonus: -6,
  },
};

function deep(v) {
  return JSON.parse(JSON.stringify(v));
}

function pushLog(state, text, kind = "info") {
  state.log.unshift({ id: state.logSeq++, week: state.week, text, kind });
  if (state.log.length > LOG_CAP) state.log.pop();
}

export function officerOf(state, id) {
  return state.officers.find((o) => o.id === id);
}
export function regionOf(state, id) {
  return state.regions.find((r) => r.id === id);
}

export function mapRoads(regions) {
  const list = regions || [];
  const byId = Object.fromEntries(list.map((r) => [r.id, r]));
  const seen = new Set();
  const roads = [];
  list.forEach((r) => {
    (r.neighbors || []).forEach((nid) => {
      const key = r.id < nid ? `${r.id}|${nid}` : `${nid}|${r.id}`;
      if (seen.has(key)) return;
      seen.add(key);
      const o = byId[nid];
      if (!o) return;
      roads.push({
        from: r.id,
        to: o.id,
        a: r.city || r.label,
        b: o.city || o.label,
      });
    });
  });
  return roads;
}
export function factionOf(state, id) {
  return state.factions.find((f) => f.id === id);
}
export function isOnMapFaction(f) {
  return !!(f && f.onMap);
}
export function playerOf(state) {
  return officerOf(state, state.playerOfficerId);
}

export function livingOfficers(state) {
  return state.officers.filter((o) => o.alive !== false);
}

export function isVisibleOfficer(state, off) {
  if (off.alive === false || off.retired) return false;
  if (off.child && (off.age || 0) < 16) return false;
  if (!off.hidden) return true;
  return state.discovered.includes(off.id);
}

export function visibleOfficers(state) {
  return livingOfficers(state).filter((o) => isVisibleOfficer(state, o));
}

export function playerCourt(state) {
  const p = playerOf(state);
  if (!p?.faction) return [];
  return livingOfficers(state).filter((o) => o.faction === p.faction && o.id !== p.id && !o.retired);
}

function ensureStaff(state) {
  const court = playerCourt(state);
  const appointed = court.filter((o) => o.isGeneral);
  if (appointed.length === 0 && court.length) {
    court.slice(0, MAX_GENERALS).forEach((o) => {
      o.isGeneral = true;
    });
  }
}

export function playerGenerals(state) {
  ensureStaff(state);
  return playerCourt(state).filter((o) => o.isGeneral);
}

export function appointCandidates(state) {
  ensureStaff(state);
  return playerCourt(state).filter((o) => !o.isGeneral);
}

function joinBanner(state, off, preferGeneral) {
  const p = playerOf(state);
  off.faction = p.faction;
  off.standingOrder = off.standingOrder || "auto";
  const gens = playerCourt(state).filter((o) => o.isGeneral && o.id !== off.id);
  if (preferGeneral !== false && gens.length < MAX_GENERALS) {
    off.isGeneral = true;
  } else {
    off.isGeneral = !!off.isGeneral && gens.length < MAX_GENERALS;
  }
  return off.isGeneral;
}

export function orderLabel(id) {
  return GENERAL_ORDERS.find((o) => o.id === id)?.label || "By personality";
}

export function skillsForPersonality(personality) {
  return PERSONALITY_SKILLS[personality] || PERSONALITY_SKILLS.loyalist;
}

export function portraitInitials(name) {
  const parts = String(name || "CO").trim().split(/\s+/).filter(Boolean);
  const letters = parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}` : (parts[0] || "CO").slice(0, 2);
  return letters.toUpperCase();
}

export function ordersForOfficer(off) {
  const allowed = new Set(["auto", "mission", ...(off?.skills || skillsForPersonality(off?.personality))]);
  return GENERAL_ORDERS.filter((o) => allowed.has(o.id));
}

export function setGeneralOrder(state, officerId, orderId) {
  if (state.phase === "battle" || state.phase === "duel") return { ok: false, message: "Finish the yard first." };
  const g = playerGenerals(state).find((o) => o.id === officerId);
  if (!g) return { ok: false, message: "Not one of your generals." };
  if (!ordersForOfficer(g).some((o) => o.id === orderId)) {
    return { ok: false, message: `${g.name}'s type (${g.personality}) cannot take that skill.` };
  }
  g.standingOrder = orderId;
  const msg = `${g.name} is ordered: ${orderLabel(orderId)}.`;
  pushLog(state, msg, "player");
  return { ok: true, message: msg };
}

export function regionsOfFaction(state, fid) {
  return state.regions.filter((r) => r.owner === fid);
}

export function rankOf(state, off) {
  if (!off.faction) return "free";
  if (off.id === state.playerOfficerId && ensureCampaign(state).nationalLeader) return "national";
  const fac = factionOf(state, off.faction);
  if (fac && fac.ruler === off.id) {
    const n = regionsOfFaction(state, off.faction).length;
    if (n >= 3) return "governor";
    return "warlord";
  }
  if (state.regions.some((r) => r.prefect === off.id)) return "prefect";
  return "officer";
}

export function rankLabel(rank) {
  return {
    free: "Free officer",
    officer: "Serving officer",
    prefect: "Prefect",
    warlord: "Warlord",
    governor: "Governor",
    national: "National leader",
  }[rank] || rank;
}

export function seasonOf(week) {
  const w = ((week % 52) + 52) % 52;
  if (w < 13) return { id: "winter", name: "Winter", weather: "snow", commerce: 0.68, food: 0.72, march: 0.8 };
  if (w < 26) return { id: "spring", name: "Spring", weather: "fog", commerce: 0.9, food: 1.0, march: 0.95 };
  if (w < 39) return { id: "summer", name: "Summer", weather: "clear", commerce: 1.12, food: 1.16, march: 1 };
  return { id: "fall", name: "Fall", weather: "wind", commerce: 0.84, food: 0.9, march: 0.9 };
}

export function apMax(state) {
  const p = playerOf(state);
  const rank = rankOf(state, p);
  let ap = 3;
  if (rank === "prefect") ap = 4;
  if (rank === "warlord") ap = 5;
  if (rank === "governor") ap = 6;
  if (rank === "national") ap = 7;
  ap += Math.min(MAX_GENERALS, playerGenerals(state).length);
  ap += DIFFICULTY[state.difficulty].apBonus;
  if (ensureCampaign(state).nationalLeader) ap += 1;
  return Math.min(10, ap);
}

export function relationKey(a, b) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

export function getRelation(state, a, b) {
  if (!a || !b || a === b) return 100;
  const k = relationKey(a, b);
  if (state.relations[k] == null) {
    const fa = factionOf(state, a);
    const fb = factionOf(state, b);
    const base = Math.round(((fa?.relationsDefault ?? 40) + (fb?.relationsDefault ?? 40)) / 2);
    state.relations[k] = base;
  }
  return state.relations[k];
}

export function setRelation(state, a, b, v) {
  state.relations[relationKey(a, b)] = Math.max(0, Math.min(100, v));
}

export function addBond(state, oid, delta) {
  state.bonds[oid] = Math.max(0, Math.min(100, (state.bonds[oid] || 40) + delta));
}

function applyDifficultyGarrisons(state) {
  const mul = DIFFICULTY[state.difficulty].garrisonMul;
  state.regions.forEach((r) => {
    if (r.owner === "pof" || r.owner === "banner") {
      r.garrison = Math.round(r.garrison * mul);
    }
  });
}

function attachSeason(state) {
  state._season = seasonOf(state.week);
}

export function unlockedTech(state, content) {
  return content.tech.tracks.filter((t) => state.research.unlocked.includes(t.id));
}

export function techAtkBonus(state, content) {
  return unlockedTech(state, content).reduce((s, t) => s + (t.battle?.atk || 0), 0);
}

export function createNewGame(content, opts = {}) {
  const difficulty = DIFFICULTY[opts.difficulty] ? opts.difficulty : "normal";
  const seed = opts.seed ?? (Math.floor(Math.random() * 1e9) + 1);
  const bg = (content.officers.backgrounds || []).find((b) => b.id === opts.background) || content.officers.backgrounds[0];
  const tpl = content.officers.playerTemplate;
  const name = (opts.name || "Alex Rourke").trim().slice(0, 28) || "Alex Rourke";

  const factions = content.factions.factions.map((f) => ({
    ...deep(f),
    ruler: null,
    onMap: f.sandbox === true,
    alive: true,
  }));
  const regions = content.regions.regions.map((r) => ({
    id: r.id,
    name: r.name,
    short: r.short,
    type: r.type,
    plus: r.plus,
    minus: r.minus,
    neighbors: r.neighbors,
    owner: r.startOwner,
    garrison: r.garrison,
    economy: r.economy,
    food: r.food,
    walls: r.walls,
    order: r.order,
    population: r.population,
    terrainBias: r.terrainBias,
    polygon: r.polygon,
    label: r.label,
    city: r.city || r.label,
    stateCode: r.state || r.stateCode || null,
    unlockWeek: r.unlockWeek || 0,
    unlockPhase: r.unlockPhase || 0,
    plate: r.plate || "below",
    geo: r.geo || { farm: 0, mine: 0, fuel: 0, water: 0, sun: 0, weather: 0, defense: 0 },
    scar: r.scar || null,
    prefect: null,
    intel: 0,
  }));
  const officers = content.officers.officers.map((o) => ({
    ...deep(o),
    alive: true,
    retinue: o.retinue || 0,
    fame: o.legend ? 70 : 20,
    standingOrder: "auto",
  }));

  const player = {
    id: "player",
    name,
    title: bg.name,
    war: clampStat(tpl.war + (bg.war || 0)),
    int: clampStat(tpl.int + (bg.int || 0)),
    pol: clampStat(tpl.pol + (bg.pol || 0)),
    chr: clampStat(tpl.chr + (bg.chr || 0)),
    personality: tpl.personality,
    faction: null,
    region: "bethel",
    loyalty: 100,
    ambition: tpl.ambition,
    hidden: false,
    legend: false,
    alive: true,
    retinue: DIFFICULTY[difficulty].retinue,
    fame: 8,
    bio: `${tpl.bio} Background: ${bg.blurb}`,
    background: bg.id,
    custom: false,
    age: 34,
    spouseId: null,
    courtingId: null,
  };
  officers.unshift(player);

  const pof = factions.find((f) => f.id === "pof");
  const banner = factions.find((f) => f.id === "banner");
  const interior = factions.find((f) => f.id === "interior");
  const compact = factions.find((f) => f.id === "compact");
  const aurora = factions.find((f) => f.id === "aurora");
  const front = factions.find((f) => f.id === "northern_front");
  pof.ruler = "voss";
  banner.ruler = "brant";
  interior.ruler = "pike";
  compact.ruler = "solano";
  aurora.ruler = "solen";
  const relay = factions.find((f) => f.id === "yukon_relay");
  const watch = factions.find((f) => f.id === "klondike_watch");
  const pact = factions.find((f) => f.id === "bering_pact");
  if (relay) relay.ruler = "haro";
  if (watch) watch.ruler = "tagg";
  if (pact) pact.ruler = "yarrow";
  const wharf = factions.find((f) => f.id === "red_wharf");
  const spine = factions.find((f) => f.id === "pacific_spine");
  const timber = factions.find((f) => f.id === "timberline");
  const copper = factions.find((f) => f.id === "copper_road");
  const rail = factions.find((f) => f.id === "rail_brotherhood");
  const airlift = factions.find((f) => f.id === "pale_airlift");
  const idle = factions.find((f) => f.id === "idle_hour");
  const ember = factions.find((f) => f.id === "ember_campus");
  if (wharf) wharf.ruler = "quay";
  if (spine) spine.ruler = "volta";
  if (timber) timber.ruler = "saw";
  if (copper) copper.ruler = "cim";
  if (rail) rail.ruler = "duran";
  if (airlift) airlift.ruler = "range";
  if (idle) idle.ruler = "jct";
  if (ember) ember.ruler = "front";
  front.ruler = null;
  front.alive = false;

  const state = {
    version: GAME_VERSION,
    title: "Northern Front",
    week: 0,
    difficulty,
    seed,
    playerOfficerId: "player",
    gold: DIFFICULTY[difficulty].gold,
    food: DIFFICULTY[difficulty].food,
    fame: 8,
    ap: 0,
    factions,
    regions,
    officers,
    relations: {},
    bonds: { hart: 55, quinn: 30 },
    discovered: [],
    legendHunt: 0,
    siloHunt: 0,
    marshHunt: 0,
    stash: [],
    missions: { board: [], seq: 0, lastRefresh: -1 },
    research: { points: 0, unlocked: ["small_arms"] },
    log: [],
    logSeq: 1,
    weekReport: [],
    phase: "strategy",
    battle: null,
    selectedRegion: "bethel",
    gameOver: null,
    ending: null,
    customSlotsUsed: 0,
    coast: content.regions.coast,
    mainland: content.regions.mainland || null,
    stateTheaters: content.regions.states || [],
    campaignSpec: content.regions.campaign || {},
    campaign: initCampaign(content.regions.campaign || {}),
    contentMeta: {
      rosterCap: content.officers.meta.rosterCap,
      customOfficerSlots: content.officers.meta.customOfficerSlots,
    },
  };

  applyDifficultyGarrisons(state);
  attachSeason(state);
  hydrateLife(state);
  refreshMissionBoard(state);
  state.ap = apMax(state);

  setRelation(state, "pof", "banner", 62);
  setRelation(state, "pof", "interior", 12);
  setRelation(state, "pof", "compact", 22);
  setRelation(state, "pof", "aurora", 18);
  setRelation(state, "interior", "compact", 58);
  setRelation(state, "interior", "aurora", 50);
  setRelation(state, "compact", "aurora", 64);
  setRelation(state, "banner", "compact", 20);
  setRelation(state, "banner", "interior", 14);
  setRelation(state, "pof", "red_wharf", 70);
  setRelation(state, "pof", "pale_airlift", 66);
  setRelation(state, "red_wharf", "pale_airlift", 60);
  setRelation(state, "pacific_spine", "timberline", 48);
  setRelation(state, "timberline", "interior", 52);
  setRelation(state, "rail_brotherhood", "idle_hour", 56);
  setRelation(state, "ember_campus", "idle_hour", 58);
  setRelation(state, "copper_road", "timberline", 28);
  setRelation(state, "copper_road", "pof", 16);

  pushLog(state, `Week 0. Invasion landings at Anchorage and the Slope. The map already shows Washington through Colorado — roads south of Juneau and the Yukon are open.`, "alert");
  pushLog(state, `${name} (${bg.name}) — WAR ${player.war} INT ${player.int} POL ${player.pol} CHR ${player.chr}.`, "info");
  return state;
}

function clampStat(n) {
  return Math.max(15, Math.min(99, n));
}

export function serialize(state) {
  const copy = deep(state);
  delete copy._season;
  return JSON.stringify(copy);
}

export function deserialize(raw) {
  const state = typeof raw === "string" ? JSON.parse(raw) : raw;
  attachSeason(state);
  if (!state.log) state.log = [];
  (state.regions || []).forEach((r) => {
    if (!r.city) r.city = r.label;
    if (r.stateCode == null && r.state) r.stateCode = r.state;
    if (r.unlockWeek == null) r.unlockWeek = 0;
    if (r.unlockPhase == null) r.unlockPhase = 0;
    if (!r.geo) r.geo = { farm: 0, mine: 0, fuel: 0, water: 0, sun: 0, weather: 0, defense: 0 };
  });
  ensureCampaign(state);
  (state.officers || []).forEach((o) => {
    if (!o.standingOrder) o.standingOrder = "auto";
    if (!o.skills) o.skills = skillsForPersonality(o.personality);
    if (!o.portrait) o.portrait = portraitInitials(o.name);
  });
  hydrateLife(state);
  if (state.customSlotsUsed == null) {
    state.customSlotsUsed = (state.officers || []).filter((o) => o.custom).length;
  }
  if (state.legendHunt == null) state.legendHunt = state.discovered?.includes("karr") ? 2 : 0;
  if (state.siloHunt == null) state.siloHunt = state.discovered?.includes("silo") ? 2 : 0;
  if (state.marshHunt == null) state.marshHunt = state.discovered?.includes("marsh") ? 2 : 0;
  if (!state.stash) state.stash = [];
  if (!state.missions) state.missions = { board: [], seq: 0, lastRefresh: -1 };
  ensureStaff(state);
  (state.factions || []).forEach((f) => {
    if (f.onMap == null) f.onMap = f.sandbox === true;
    if (!f.bio) f.bio = "";
    if (!f.personalityLean) f.personalityLean = "loyalist";
  });
  return state;
}

function currentRegion(state) {
  return regionOf(state, playerOf(state).region);
}

function ownedByPlayer(state, region) {
  const p = playerOf(state);
  return p.faction && region.owner === p.faction;
}

function occupiedByInvader(region) {
  return region.owner === "pof" || region.owner === "banner";
}

export function actingStats(state, off) {
  const fac = off.faction ? factionOf(state, off.faction) : null;
  const m = fac?.mods || {};
  const frail = off.frail || (off.age || 0) >= 60 ? -6 : 0;
  const wound = off.wound ? -8 : 0;
  return {
    war: clampStat(off.war + (m.war || 0) + frail + wound),
    int: clampStat(off.int + (m.int || 0)),
    pol: clampStat(off.pol + (m.pol || 0) + Math.min(0, frail + 2)),
    chr: clampStat(off.chr + (m.chr || 0)),
  };
}

function spend(state, ap) {
  if (state.ap < ap) return false;
  state.ap -= ap;
  return true;
}

export function legendDef(id) {
  return LEGENDS.find((d) => d.id === id) || LEGENDS[0];
}

export function legendStatus(state, id = "karr") {
  const def = legendDef(id);
  const k = officerOf(state, def.id);
  const revealed = !!(k && isVisibleOfficer(state, k));
  const hunt = revealed ? 2 : state[def.huntKey] || 0;
  let rumor;
  if (revealed) rumor = `${k.name}, ${k.title}, is listed. ${k.bio}`;
  else if (hunt >= 1) rumor = `Named: ${def.short}. ${def.travel}`;
  else rumor = `Rumor: an unlisted name still walks ${regionOf(state, def.regionId)?.short || def.regionId}. Seek Legend.`;
  return {
    id: def.id,
    hunt,
    revealed,
    regionId: def.regionId,
    rumor,
    mapMark: !revealed,
    short: def.short,
    travel: def.travel,
  };
}

export function legendBoard(state) {
  return LEGENDS.map((d) => legendStatus(state, d.id));
}

function noteLegendRumor(state, id = "karr") {
  const st = legendStatus(state, id);
  if (st.revealed) return false;
  const def = legendDef(id);
  if ((state[def.huntKey] || 0) >= 1) return false;
  state[def.huntKey] = 1;
  pushLog(state, `A name surfaces: ${def.short}. ${def.travel}`, "legend");
  return true;
}

function noteKarrRumor(state) {
  return noteLegendRumor(state, "karr");
}

function noteAnyLegendRumor(state) {
  const hidden = legendBoard(state).find((h) => !h.revealed);
  if (!hidden) return false;
  return noteLegendRumor(state, hidden.id);
}

function revealLegend(state, id) {
  const def = legendDef(id);
  const k = officerOf(state, def.id);
  if (!k) return false;
  if (state.discovered.includes(def.id) && !k.hidden) {
    state[def.huntKey] = 2;
    return false;
  }
  if (!state.discovered.includes(def.id)) state.discovered.push(def.id);
  k.hidden = false;
  state[def.huntKey] = 2;
  pushLog(state, `Legend found: ${k.name}, ${k.title}. ${k.bio} Hire them if you share ${regionOf(state, def.regionId)?.short || "their ground"}.`, "legend");
  return true;
}

function revealKarr(state) {
  return revealLegend(state, "karr");
}

function advanceHunt(state, id, onSite) {
  if (legendStatus(state, id).revealed) return { revealed: false, already: true, id };
  if (onSite) {
    const fresh = revealLegend(state, id);
    return { revealed: fresh, rumored: false, id };
  }
  const rumored = noteLegendRumor(state, id);
  return { revealed: false, rumored, id };
}

function advanceKarrHunt(state, onSlope) {
  return advanceHunt(state, "karr", onSlope);
}

function discoverCheck(state, regionId) {
  const def = LEGENDS.find((d) => d.regionId === regionId);
  if (def) {
    const onSite = playerOf(state).region === regionId;
    return advanceHunt(state, def.id, onSite);
  }
  const hidden = livingOfficers(state).filter((o) => o.hidden && o.region === regionId && !state.discovered.includes(o.id));
  hidden.forEach((o) => {
    if (chance(state, 0.35) || state.week >= 10) {
      state.discovered.push(o.id);
      o.hidden = false;
      pushLog(state, `Hidden name: ${o.name}, ${o.title}, is real. ${o.bio}`, "legend");
    }
  });
  return { revealed: false };
}

export function listActions(state) {
  if (state.gameOver) return [];
  if (state.phase === "battle" || state.phase === "duel") return [];
  const p = playerOf(state);
  const here = currentRegion(state);
  const rank = rankOf(state, p);
  const gens = playerGenerals(state).length;
  const actions = [];

  const canDomestic = ownedByPlayer(state, here) || (!here.owner && p.region === here.id && p.faction);
  const hasBanner = !!p.faction;

  actions.push({
    id: "raise_banner",
    label: "Raise Banner",
    ap: 1,
    group: "command",
    enabled: !hasBanner && !here.owner,
    hint: hasBanner ? "You already fly a color." : here.owner ? "Cannot raise a banner in occupied ground." : "Found Northern Front and claim this region.",
  });
  const hunt = legendStatus(state);
  const hunts = legendBoard(state);
  const anyHidden = hunts.some((h) => !h.revealed);
  const localHunt = hunts.find((h) => h.regionId === p.region && !h.revealed);
  const rumoredOffSite = hunts.some((h) => !h.revealed && h.hunt >= 1 && h.regionId !== p.region);
  actions.push({
    id: "seek_legend",
    label: localHunt ? "Contact Legend" : "Seek Legend",
    ap: rumoredOffSite && !localHunt ? 0 : 1,
    group: "spy",
    enabled: anyHidden,
    hint: !anyHidden
      ? "Listed legends are found."
      : localHunt
        ? `Make contact here: ${localHunt.short}.`
        : rumoredOffSite
          ? hunts.find((h) => !h.revealed && h.hunt >= 1)?.travel || hunt.rumor
          : "Follow trapline, ranch, and radio rumors. Hidden officers may still walk this theater.",
  });
  actions.push({
    id: "drill",
    label: "Drill",
    ap: 1,
    group: "domestic",
    enabled: !!(hasBanner && ownedByPlayer(state, here)),
    hint: "Train a levy. Needs a region you hold.",
  });
  actions.push({
    id: "commerce",
    label: "Commerce",
    ap: 1,
    group: "domestic",
    enabled: !!(hasBanner && ownedByPlayer(state, here)),
    hint: "Markets, scrip, and quiet deals.",
  });
  actions.push({
    id: "cultivate",
    label: "Cultivate",
    ap: 1,
    group: "domestic",
    enabled: !!(hasBanner && ownedByPlayer(state, here)),
    hint: "Caches, nets, and winter gardens.",
  });
  actions.push({
    id: "fortify",
    label: "Fortify",
    ap: 1,
    group: "domestic",
    enabled: !!(hasBanner && ownedByPlayer(state, here)),
    hint: "Sandbags, ice walls, watched roads.",
  });
  actions.push({
    id: "safety",
    label: "Safety",
    ap: 1,
    group: "domestic",
    enabled: !!(hasBanner && ownedByPlayer(state, here)),
    hint: "Patrols and rumor control.",
  });
  actions.push({
    id: "research",
    label: "Salvage / Forge",
    ap: 1,
    group: "domestic",
    enabled: true,
    hint: "Workshop hours. Calendar still gates 1985–89 kit — M16A2, Jeeps, analog radios. No leapfrog.",
  });
  actions.push({
    id: "spy",
    label: "Spy",
    ap: 1,
    group: "spy",
    enabled: true,
    hint: "Scout a region. Schemers and high INT see more.",
    needs: "region",
  });
  actions.push({
    id: "hire",
    label: "Hire",
    ap: 1,
    group: "plot",
    enabled: hasBanner && hireCandidates(state).length > 0,
    hint: !hasBanner
      ? "Raise a banner first."
      : hireCandidates(state).length
        ? gens >= MAX_GENERALS
          ? "Recruit a free officer into court. Appoint later when a general slot opens (5 max)."
          : "Recruit a free officer in this region. They fill a general slot if one is open (5 max)."
        : "No free officer in this city. Travel, or Officers → Create (cap 10), then Hire.",
    needs: "hire",
  });
  actions.push({
    id: "appoint",
    label: "Appoint General",
    ap: 0,
    group: "plot",
    enabled: hasBanner && gens < MAX_GENERALS && appointCandidates(state).length > 0,
    hint: gens >= MAX_GENERALS
      ? "Command staff full (5 generals)."
      : appointCandidates(state).length
        ? "Promote a court officer into an empty general slot."
        : "Hire or create an officer first, then appoint them (5 slots).",
    needs: "appoint",
  });
  actions.push({
    id: "ally",
    label: "Seek Alliance",
    ap: 1,
    group: "plot",
    enabled: hasBanner,
    hint: "Petition another faction. Diplomats fare better.",
    needs: "faction",
  });
  actions.push({
    id: "break_ally",
    label: "Break Pact",
    ap: 1,
    group: "plot",
    enabled: hasBanner,
    hint: "Tear up a paper. Relations will drop.",
    needs: "ally",
  });
  actions.push({
    id: "rumor",
    label: "Plot: Rumor",
    ap: 1,
    group: "plot",
    enabled: true,
    hint: "Chip an officer's loyalty.",
    needs: "officer",
  });
  actions.push({
    id: "persuade",
    label: "Plot: Persuade",
    ap: 1,
    group: "plot",
    enabled: hasBanner,
    hint: "Talk a wavering officer into your color. They join court; empty general slots fill first.",
    needs: "officer",
  });
  const bound = !!p.spouseId;
  const suitors = courtCandidates(state);
  actions.push({
    id: "court",
    label: bound ? "Household" : p.courtingId ? "Marry / Court" : "Court / Marry",
    ap: 1,
    group: "plot",
    enabled: !bound && suitors.length > 0,
    hint: bound
      ? "You already keep house. Children may appear on the year roll."
      : suitors.length
        ? "Court a listed adult in this town. Visit twice to bind. Original households only."
        : "Need an unmarried adult in this town (Plot).",
    needs: "court",
  });
  actions.push({
    id: "hide",
    label: "Hide / Infiltrate",
    ap: 1,
    group: "spy",
    enabled: true,
    hint: "Go to ground. Harder to catch if the region falls.",
  });
  actions.push({
    id: "travel",
    label: "Travel",
    ap: 1,
    group: "command",
    enabled: true,
    hint: "Move to a neighboring city. Alaska → Juneau/Yukon → PNW → Rockies → plains east. US roads open week 0.",
    needs: "neighbor",
  });
  const camp = ensureCampaign(state);
  actions.push({
    id: "war_council",
    label: "War Council",
    ap: 0,
    group: "plot",
    enabled: camp.phase >= 2,
    hint: camp.phase >= 2
      ? "Foreign theaters: Russia, Cuba, Nicaragua. A sponsor may add another country."
      : `Liberate ${camp.restoreThreshold} US states (west bloc) to sit as national leader.`,
  });
  const attackOk =
    (hasBanner && ownedByPlayer(state, here) && here.garrison >= 8) ||
    (!hasBanner && (p.retinue || 0) >= 8);
  actions.push({
    id: "attack",
    label: "March / Attack",
    ap: 2,
    group: "command",
    enabled: attackOk,
    hint: attackOk
      ? "Commit a levy into a neighboring hostile region. A ronin who wins founds Northern Front."
      : "Need 8 garrison in a held region, or 8 personal retinue as a free officer.",
    needs: "attack",
  });
  const jobs = openMissions(state);
  actions.push({
    id: "mission",
    label: jobs.length ? `Side Mission (${jobs.length})` : "Side Mission",
    ap: 1,
    group: "command",
    enabled: hasBanner && jobs.length > 0,
    hint: !hasBanner
      ? "Raise a banner, then take optional jobs (Military → Side Mission)."
      : jobs.length
        ? "Optional jobs: scout, raid, escort, rescue, porch challenge. 1 AP, or set a general to Side mission."
        : "Board empty. End Week refreshes side missions.",
    needs: "mission",
  });
  const rivals = challengeCandidates(state);
  actions.push({
    id: "challenge",
    label: "Challenge",
    ap: 1,
    group: "plot",
    enabled: rivals.length > 0,
    hint: rivals.length
      ? "Call out an officer in this city. Yard duel — Strike / Guard / Special, ~99 seconds if both stay up."
      : "No listed officer in this city to call out.",
    needs: "challenge",
  });
  actions.push({
    id: "end_week",
    label: "End Week",
    ap: 0,
    group: "meta",
    enabled: true,
    hint: "Resolve AI, weather, and the next calendar week.",
  });

  void canDomestic;
  void rank;
  return actions;
}

export function hireCandidates(state) {
  const p = playerOf(state);
  if (!p.faction) return [];
  return visibleOfficers(state).filter(
    (o) => o.id !== p.id && !o.faction && o.region === p.region && o.alive !== false
  );
}

export function challengeCandidates(state) {
  const p = playerOf(state);
  if (!p) return [];
  return visibleOfficers(state).filter(
    (o) =>
      o.id !== p.id &&
      o.region === p.region &&
      o.alive !== false &&
      !o.retired &&
      !(o.child && (o.age || 0) < 16)
  );
}

function pickDuelFoe(state, regionId, actorId) {
  const pool = visibleOfficers(state).filter(
    (o) => o.id !== actorId && o.region === regionId && o.alive !== false && !o.retired
  );
  if (!pool.length) return null;
  pool.sort((a, b) => (b.legend ? 1 : 0) - (a.legend ? 1 : 0) || (b.war || 0) - (a.war || 0));
  return pool[0];
}

function beginDuel(state, actor, foe, extra = {}) {
  const youStats = actingStats(state, actor);
  const foeStats = actingStats(state, foe);
  const kind = extra.kind || (actor.faction && foe.faction === actor.faction ? "spar" : "challenge");
  const regionId = extra.regionId || actor.region || playerOf(state).region;
  state.phase = "duel";
  state.duel = createDuel({
    you: actor,
    youStats,
    foe,
    foeStats,
    jobId: extra.jobId || null,
    kind,
    regionId,
    seasonId: state._season?.id || "winter",
    arenaId: extra.arenaId || null,
    youStyleId: extra.youStyleId || extra.styleId || null,
    foeStyleId: extra.foeStyleId || null,
    jobTemplateId: extra.jobTemplateId || null,
  });
  state.duel.actorId = actor.id;
  return state.duel;
}

function doChallenge(state, extra = {}) {
  const officerId = extra.officerId || extra;
  const p = playerOf(state);
  const foe = officerOf(state, officerId);
  if (!foe) return { ok: false, message: "No such officer." };
  if (foe.region !== p.region) return { ok: false, message: "They are not in this city." };
  if (foe.id === p.id) return { ok: false, message: "Not yourself." };
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  beginDuel(state, p, foe, {
    kind: p.faction && foe.faction === p.faction ? "spar" : "challenge",
    arenaId: extra.arenaId,
    youStyleId: extra.youStyleId || extra.styleId,
    foeStyleId: extra.foeStyleId,
    regionId: extra.regionId || p.region,
  });
  const d = state.duel;
  const msg = d.underdog
    ? `David vs Goliath — ${foe.name} (WAR ${d.foe.stats.war}) vs you (WAR ${d.you.stats.war}). Green window is wider.`
    : `${foe.name} answers in the yard.`;
  pushLog(state, msg, "war");
  return { ok: true, duel: true, message: msg };
}

export function isAdjacent(state, fromId, toId) {
  const from = typeof fromId === "string" ? regionOf(state, fromId) : fromId;
  const to = typeof toId === "string" ? regionOf(state, toId) : toId;
  if (!from || !to) return false;
  return !!(from.neighbors || []).includes(to.id) && travelUnlocked(state, to);
}

function distancesFrom(state, originId) {
  const dist = new Map([[originId, 0]]);
  const q = [originId];
  while (q.length) {
    const id = q.shift();
    const node = regionOf(state, id);
    for (const n of node?.neighbors || []) {
      if (dist.has(n)) continue;
      dist.set(n, dist.get(id) + 1);
      q.push(n);
    }
  }
  return dist;
}

function shortestPath(state, fromId, toId) {
  if (fromId === toId) return [fromId];
  const prev = new Map([[fromId, null]]);
  const q = [fromId];
  while (q.length) {
    const id = q.shift();
    const node = regionOf(state, id);
    for (const n of node?.neighbors || []) {
      if (prev.has(n)) continue;
      prev.set(n, id);
      if (n === toId) {
        const path = [];
        let cur = toId;
        while (cur) {
          path.push(cur);
          cur = prev.get(cur);
        }
        path.reverse();
        return path;
      }
      q.push(n);
    }
  }
  return null;
}

function approachChain(state, from, to) {
  const path = shortestPath(state, from.id, to.id);
  if (!path || path.length < 2) {
    return (to.neighbors || [])
      .map((id) => regionOf(state, id))
      .filter((r) => r && r.id !== from.id)
      .slice(0, 3);
  }
  const chain = [];
  for (let i = path.length - 2; i >= 1; i--) {
    const node = regionOf(state, path[i]);
    if (!node) break;
    chain.push(node);
    if (!(node.unlockPhase > 0)) break;
  }
  return chain.reverse().slice(0, 3);
}

function pathNeighbors(state, from, to) {
  const dist = distancesFrom(state, to.id);
  const goal = dist.get(from.id);
  if (goal == null || goal <= 1) return [];
  const hops = [];
  for (const id of from.neighbors || []) {
    if (dist.get(id) !== goal - 1) continue;
    const node = regionOf(state, id);
    if (node && travelUnlocked(state, node)) hops.push(node);
  }
  return hops;
}

// Names for the no-leap NEXT line. A sea desk names its own roads (Gulf
// Sealift touches St. Louis and Cuba), not the player's home neighbors.
// Foreign desks use the destination approach (St. Louis → Gulf Sealift →
// Cuba). Domestic cities use the adjacent hop that actually shortens the
// road — not every neighbor of the player.
export function approachRoads(state, fromId, toId) {
  const from = typeof fromId === "string" ? regionOf(state, fromId) : fromId;
  const to = typeof toId === "string" ? regionOf(state, toId) : toId;
  if (!from || !to || from.id === to.id) return [];
  if (to.type === "sea") {
    return (to.neighbors || [])
      .map((id) => regionOf(state, id))
      .filter(Boolean)
      .slice(0, 3)
      .map((r) => r.short);
  }
  if (to.type === "foreign" || (to.unlockPhase || 0) > 0) {
    return approachChain(state, from, to).map((r) => r.short);
  }
  const hops = pathNeighbors(state, from, to);
  if (hops.length) return hops.slice(0, 3).map((r) => r.short);
  return (from.neighbors || [])
    .map((id) => regionOf(state, id)?.short)
    .filter(Boolean)
    .slice(0, 3);
}

export function attackCandidates(state) {
  const here = currentRegion(state);
  const p = playerOf(state);
  return here.neighbors
    .map((id) => regionOf(state, id))
    .filter((r) => r && r.owner !== p.faction && travelUnlocked(state, r));
}

export function GEO_LABELS() {
  return {
    farm: "Farm",
    mine: "Mine",
    fuel: "Fuel",
    water: "Water",
    sun: "Sun",
    weather: "Weather",
    defense: "Defense",
  };
}

export function geoOf(region) {
  const g = region?.geo || {};
  return {
    farm: g.farm || 0,
    mine: g.mine || 0,
    fuel: g.fuel || 0,
    water: g.water || 0,
    sun: g.sun || 0,
    weather: g.weather || 0,
    defense: g.defense || 0,
  };
}

export function geoTags(region) {
  const g = geoOf(region);
  const labels = GEO_LABELS();
  const tags = Object.keys(labels)
    .filter((k) => g[k] > 0)
    .map((k) => ({ id: k, label: labels[k], n: g[k] }));
  if (region?.scar) tags.push({ id: "scar", label: "Scar", n: region.scar });
  return tags;
}

export function geoYield(region, season) {
  const g = geoOf(region);
  const harsh = Math.max(0.4, 1 - g.weather * 0.14);
  const foodMul = season?.food ?? 1;
  const goldMul = season?.commerce ?? 1;
  const food = Math.round((g.farm * 2 + g.water + g.sun) * foodMul * harsh);
  const gold = Math.round((g.mine * 2 + g.fuel * 2 + g.water) * goldMul * harsh);
  return { food, gold, harsh };
}

export function neighborRegions(state) {
  const here = currentRegion(state);
  return here.neighbors.map((id) => regionOf(state, id)).filter((r) => r && travelUnlocked(state, r));
}

function alliedFactions(state) {
  const p = playerOf(state);
  if (!p.faction) return [];
  return state.factions.filter((f) => f.onMap && f.id !== p.faction && f.alive !== false && getRelation(state, p.faction, f.id) >= 70);
}

export function act(state, content, actionId, extra = {}) {
  attachSeason(state);
  if (state.gameOver) return { ok: false, message: "The campaign is finished." };
  if ((state.phase === "battle" && actionId !== "battle") || (state.phase === "duel" && actionId !== "duel")) {
    return { ok: false, message: state.phase === "duel" ? "Finish the yard first." : "Finish the field first." };
  }

  const p = playerOf(state);
  const here = currentRegion(state);
  const stats = actingStats(state, p);
  const defn = listActions(state).find((a) => a.id === actionId);

  if (actionId === "end_week") {
    return endWeek(state, content);
  }

  if (!defn) return { ok: false, message: "Unknown action." };
  if (!defn.enabled) return { ok: false, message: defn.hint || "Action blocked." };
  if (defn.ap > 0 && state.ap < defn.ap) return { ok: false, message: "Not enough AP." };

  if (actionId === "raise_banner") return raiseBanner(state);
  if (actionId === "drill") return domestic(state, "drill", stats);
  if (actionId === "commerce") return domestic(state, "commerce", stats);
  if (actionId === "cultivate") return domestic(state, "cultivate", stats);
  if (actionId === "fortify") return domestic(state, "fortify", stats);
  if (actionId === "safety") return domestic(state, "safety", stats);
  if (actionId === "research") return doResearch(state, content, stats);
  if (actionId === "hide") return doHide(state, stats);
  if (actionId === "spy") return doSpy(state, extra.regionId, stats);
  if (actionId === "seek_legend") return doSeekLegend(state);
  if (actionId === "hire") return doHire(state, extra.officerId, stats);
  if (actionId === "appoint") return doAppoint(state, extra.officerId);
  if (actionId === "mission") return doMission(state, extra.jobId, extra.officerId);
  if (actionId === "challenge") return doChallenge(state, extra);
  if (actionId === "ally") return doAlly(state, extra.factionId, stats);
  if (actionId === "break_ally") return doBreak(state, extra.factionId);
  if (actionId === "rumor") return doRumor(state, extra.officerId, stats);
  if (actionId === "persuade") return doPersuade(state, extra.officerId, stats);
  if (actionId === "court") {
    if (!spend(state, 1)) return { ok: false, message: "No AP." };
    const res = doCourt(state, extra.officerId, stats);
    if (res.ok && (res.courting || res.married)) {
      addBond(state, extra.officerId, res.married ? 16 : 8);
      res.dings = res.married ? ["HOUSE BOUND", "+BOND"] : ["BOND TICK"];
    }
    return res;
  }
  if (actionId === "travel") return doTravel(state, extra.regionId);
  if (actionId === "war_council") {
    const camp = ensureCampaign(state);
    if (camp.phase < 2) return { ok: false, message: "Liberate the west bloc first." };
    return { ok: true, council: true, message: "War council. Far-shore desks are on the slate." };
  }
  if (actionId === "attack") return doAttack(state, content, extra);
  return { ok: false, message: "Not implemented." };
}

function foundNorthernFront(state, region, absorbRetinue) {
  const p = playerOf(state);
  const front = factionOf(state, "northern_front");
  front.alive = true;
  front.ruler = p.id;
  p.faction = "northern_front";
  region.owner = "northern_front";
  region.prefect = p.id;
  if (absorbRetinue) {
    region.garrison = Math.max(region.garrison, p.retinue || 0);
    p.retinue = 0;
  }
  p.fame += 12;
  state.fame += 12;
  pushLog(state, `Northern Front is declared in ${region.name}. You are warlord of a thin place.`, "alert");
  tickCampaign(state);
}

function raiseBanner(state) {
  const p = playerOf(state);
  const here = currentRegion(state);
  if (p.faction || here.owner) return { ok: false, message: "Cannot raise a banner here." };
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  foundNorthernFront(state, here, true);
  state.ap = Math.max(0, apMax(state) - 1);
  return { ok: true, message: `Banner raised over ${here.short}.` };
}

function domestic(state, kind, stats) {
  const here = currentRegion(state);
  if (!ownedByPlayer(state, here)) return { ok: false, message: "You do not hold this region." };
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  const season = state._season;
  let msg = "";
  if (kind === "drill") {
    const g = geoOf(here);
    const gain = 3 + Math.floor(stats.war / 18) + (g.sun ? 1 : 0) + nextInt(state, 0, 3);
    here.garrison = Math.min(280, here.garrison + gain);
    here.order = Math.min(100, here.order + 1);
    msg = `Drill in ${here.short}: garrison +${gain} (now ${here.garrison}).`;
  } else if (kind === "commerce") {
    const g = geoOf(here);
    const gain = Math.max(2, Math.round((4 + stats.pol / 12 + g.mine * 2 + g.fuel + g.water) * season.commerce) + nextInt(state, 0, 3));
    state.gold += gain;
    here.economy = Math.min(100, here.economy + 1);
    msg = `Commerce in ${here.short}: +${gain} gold (treasury ${state.gold}).`;
  } else if (kind === "cultivate") {
    const g = geoOf(here);
    const harsh = Math.max(0.4, 1 - g.weather * 0.14);
    const gain = Math.max(2, Math.round((5 + stats.pol / 14 + g.farm * 2 + g.sun + g.water) * season.food * harsh) + nextInt(state, 0, 2));
    state.food += gain;
    here.food = Math.min(100, here.food + 2 + g.farm);
    msg = `Cultivate in ${here.short}: +${gain} stores (food ${state.food}).`;
  } else if (kind === "fortify") {
    const g = geoOf(here);
    const gain = 2 + Math.floor(stats.war / 25) + (here.type === "naval" ? 1 : 0) + g.defense;
    here.walls = Math.min(90, here.walls + gain);
    msg = `Fortify ${here.short}: walls ${here.walls}.`;
  } else if (kind === "safety") {
    const gain = 3 + Math.floor(stats.chr / 20);
    here.order = Math.min(100, here.order + gain);
    msg = `Safety in ${here.short}: order ${here.order}.`;
  }
  pushLog(state, msg, "player");
  return { ok: true, message: msg };
}

function doResearch(state, content, stats) {
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  const gain = 1 + Math.floor(stats.int / 30) + (chance(state, 0.2) ? 1 : 0);
  state.research.points += gain;
  const msg = `Workshop hours: +${gain} salvage (pool ${state.research.points}). 1985–89 kit still waits on the calendar.`;
  pushLog(state, msg, "player");
  tryUnlockTech(state, content, true);
  return { ok: true, message: msg };
}

function tryUnlockTech(state, content, announce) {
  content.tech.tracks.forEach((t) => {
    if (state.research.unlocked.includes(t.id)) return;
    if (state.week >= t.week && state.research.points >= t.points) {
      state.research.unlocked.push(t.id);
      if (announce) pushLog(state, `Salvage threshold: ${t.name}. ${t.summary}`, "tech");
    }
  });
}

function doSeekLegend(state) {
  const hunts = legendBoard(state);
  const hidden = hunts.filter((h) => !h.revealed);
  if (!hidden.length) return { ok: false, message: "Listed legends are found." };
  const here = playerOf(state).region;
  const local = hidden.find((h) => h.regionId === here);
  if (local) {
    if (!spend(state, 1)) return { ok: false, message: "No AP." };
    revealLegend(state, local.id);
    const k = officerOf(state, local.id);
    return {
      ok: true,
      message: `${k.name} steps out of the weather. Legend listed.`,
      revealed: true,
      officerName: k.name,
      regionId: local.regionId,
    };
  }
  const rumored = hidden.find((h) => h.hunt >= 1);
  if (rumored) {
    const msg = `The name is ${rumored.short}. ${rumored.travel}`;
    pushLog(state, msg, "legend");
    return { ok: true, message: msg };
  }
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  const target = hidden[0];
  noteLegendRumor(state, target.id);
  return {
    ok: true,
    message: `Talk names ${target.short}. ${target.travel}`,
  };
}

function doHide(state, stats) {
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  const here = currentRegion(state);
  here.order = Math.min(100, here.order + 1);
  playerOf(state).fame = Math.max(0, playerOf(state).fame - 1);
  const bonus = stats.int >= 70 ? " Watchers lose your trail." : "";
  const msg = `You go to ground in ${here.short}.${bonus}`;
  pushLog(state, msg, "player");
  const hunt = discoverCheck(state, here.id);
  if (hunt?.revealed) {
    const name = officerOf(state, hunt.id)?.name || "a legend";
    return { ok: true, message: msg, revealed: true, officerName: name, regionId: here.id };
  }
  return { ok: true, message: msg };
}

function doSpy(state, regionId, stats) {
  const target = regionOf(state, regionId || currentRegion(state).id);
  if (!target) return { ok: false, message: "No such region." };
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  const diff = DIFFICULTY[state.difficulty];
  const roll = nextInt(state, 1, 100);
  const dc = 38 - Math.floor(stats.int / 8) - diff.spyBonus;
  target.intel = Math.min(3, target.intel + 1);
  let msg;
  if (roll >= dc) {
    msg = `Spy net over ${target.name}: garrison ${target.garrison}, walls ${target.walls}, order ${target.order}, owner ${ownerName(state, target)}.`;
  } else {
    msg = `Spy attempt over ${target.short} comes back thin. Intel tick only.`;
  }
  const hunt = discoverCheck(state, target.id);
  pushLog(state, msg, "spy");
  if (hunt?.revealed) {
    const name = officerOf(state, hunt.id)?.name || "a legend";
    return { ok: true, message: msg, revealed: true, officerName: name, regionId: target.id };
  }
  if (hunt?.rumored) return { ok: true, message: `${msg} Trapline rumor attached.` };
  return { ok: true, message: msg };
}

function ownerName(state, region) {
  if (!region.owner) return "uncontrolled";
  return factionOf(state, region.owner)?.short || region.owner;
}

function doHire(state, officerId, stats) {
  const p = playerOf(state);
  if (!p.faction) return { ok: false, message: "Raise a banner first." };
  const t = officerOf(state, officerId);
  if (!t || t.faction || t.region !== p.region || !isVisibleOfficer(state, t)) {
    return { ok: false, message: "No free officer here to hire." };
  }
  const cost = 16 + Math.floor(t.ambition / 4);
  if (state.gold < cost) return { ok: false, message: `Needs ${cost} gold.` };
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  const roll = nextInt(state, 1, 100) + Math.floor(stats.chr / 4) + Math.floor((state.bonds[t.id] || 40) / 8);
  const dc = 42 + Math.floor(t.ambition / 5);
  if (roll < dc) {
    state.gold -= Math.floor(cost / 3);
    addBond(state, t.id, 4);
    const msg = `${t.name} declines (${roll} vs ${dc}). A little gold is spent on the attempt.`;
    pushLog(state, msg, "player");
    return { ok: true, message: msg, dings: ["+BOND"] };
  }
  state.gold -= cost;
  const madeGeneral = joinBanner(state, t, true);
  t.loyalty = Math.min(90, 55 + Math.floor(stats.chr / 8));
  addBond(state, t.id, 12);
  p.fame += 4;
  const n = playerGenerals(state).length;
  const msg = madeGeneral
    ? `${t.name} takes your color as general ${n}/${MAX_GENERALS}.`
    : `${t.name} joins the court. Plot → Appoint puts them in an ADD chair (5 max).`;
  pushLog(state, msg, "alert");
  if (madeGeneral) state.ap = Math.min(apMax(state), state.ap + 1);
  return {
    ok: true,
    message: msg,
    chairFilled: madeGeneral,
    dings: madeGeneral ? ["CHAIR FILLED", "+4 FAME", "+BOND"] : ["COURT JOINS", "+4 FAME", "+BOND"],
  };
}

function doAppoint(state, officerId) {
  const p = playerOf(state);
  if (!p.faction) return { ok: false, message: "Raise a banner first." };
  if (playerGenerals(state).length >= MAX_GENERALS) return { ok: false, message: "Five generals already." };
  const t = officerOf(state, officerId);
  if (!t || t.faction !== p.faction || t.id === p.id) return { ok: false, message: "Pick a court officer." };
  if (t.isGeneral) return { ok: false, message: "Already a general." };
  t.isGeneral = true;
  t.standingOrder = t.standingOrder || "auto";
  const n = playerGenerals(state).length;
  const msg = `${t.name} is appointed general ${n}/${MAX_GENERALS}. Set a standing order on the court strip.`;
  pushLog(state, msg, "alert");
  state.ap = Math.min(apMax(state), state.ap);
  return { ok: true, message: msg, chairFilled: true, dings: ["CHAIR FILLED"] };
}

function missionHelpers() {
  return {
    regionOf,
    actingStats,
    addBond,
    rescueOfficer,
    noteAnyLegendRumor,
  };
}

function rescueOfficer(state, regionId, actor) {
  const p = playerOf(state);
  const hidden = livingOfficers(state).filter(
    (o) => o.hidden && o.region === regionId && !state.discovered.includes(o.id) && !o.legend
  );
  if (hidden.length) {
    const o = hidden[0];
    if (!state.discovered.includes(o.id)) state.discovered.push(o.id);
    o.hidden = false;
    o.loyalty = Math.min(90, (o.loyalty || 40) + 12);
    addBond(state, o.id, 8);
    return o;
  }
  const free = visibleOfficers(state).filter(
    (o) => o.id !== p.id && o.id !== actor.id && !o.faction && o.region === regionId
  );
  const t = free[0];
  if (!t) return null;
  t.loyalty = Math.min(90, (t.loyalty || 40) + 10);
  addBond(state, t.id, 8);
  if (p.faction) joinBanner(state, t, true);
  return t;
}

function doMission(state, jobId, officerId) {
  const p = playerOf(state);
  if (!p.faction) return { ok: false, message: "Raise a banner first." };
  const job = missionById(state, jobId);
  if (!job || job.done) return { ok: false, message: "That job is gone. End Week refreshes the board." };
  if (p.region !== job.regionId) {
    return { ok: false, message: `Travel to ${regionOf(state, job.regionId)?.short || job.regionId} first.` };
  }
  const t = templateOf(job.templateId);
  if (t.duel) {
    if (!spend(state, job.ap || 1)) return { ok: false, message: "No AP." };
    const actor = officerOf(state, officerId) || p;
    const foe = pickDuelFoe(state, job.regionId, actor.id);
    if (!foe) {
      const res = resolveMission(state, job, actor, missionHelpers());
      pushLog(state, res.report || res.message, "player");
      return { ...res, sceneId: res.sceneId || "mission" };
    }
    beginDuel(state, actor, foe, { jobId: job.id, kind: "mission", jobTemplateId: t.id, regionId: job.regionId });
    const msg = `Porch challenge: ${foe.name} in ${regionOf(state, job.regionId)?.short || "town"}.`;
    pushLog(state, msg, "war");
    return { ok: true, duel: true, message: msg, sceneId: "porch_challenge" };
  }
  if (!spend(state, job.ap || 1)) return { ok: false, message: "No AP." };
  const actor = officerOf(state, officerId) || p;
  const res = resolveMission(state, job, actor, missionHelpers());
  pushLog(state, res.report || res.message, "player");
  return { ...res, sceneId: res.sceneId || "mission" };
}

function runStandingMission(state, off) {
  const job = pickStandingJob(state, off);
  if (!job) return null;
  const t = templateOf(job.templateId);
  if (t.duel) {
    const foe = pickDuelFoe(state, job.regionId, off.id);
    if (!foe) {
      const res = resolveMission(state, job, off, missionHelpers());
      return { personality: off.personality, text: `${res.report} — ordered.` };
    }
    const duel = createDuel({
      you: off,
      youStats: actingStats(state, off),
      foe,
      foeStats: actingStats(state, foe),
      jobId: job.id,
      kind: "mission",
      regionId: job.regionId,
      seasonId: state._season?.id || "winter",
      jobTemplateId: t.id,
    });
    duel.actorId = off.id;
    autoResolveDuel(duel, () => nextFloat(state));
    const out = applyDuelOutcome(state, duel, { actor: off, silent: true });
    job.done = true;
    return { personality: off.personality, text: `${out.message} — ordered.` };
  }
  const res = resolveMission(state, job, off, missionHelpers());
  return { personality: off.personality, text: `${res.report} — ordered.` };
}

function doAlly(state, factionId, stats) {
  const p = playerOf(state);
  if (!p.faction) return { ok: false, message: "No banner, no treaty." };
  const f = factionOf(state, factionId);
  if (!f || f.id === p.faction || f.alive === false) return { ok: false, message: "Pick a living faction." };
  if (!f.onMap) return { ok: false, message: "That banner is off this theater." };
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  let rel = getRelation(state, p.faction, f.id);
  const invader = f.alignment === "invader";
  const roll = nextInt(state, 1, 100) + Math.floor(stats.chr / 3) + Math.floor(stats.pol / 5);
  const dc = invader ? 92 : 48;
  if (roll >= dc) {
    rel = Math.max(rel, 72);
    setRelation(state, p.faction, f.id, rel + 8);
    const msg = `${f.name} marks a working pact (rel ${getRelation(state, p.faction, f.id)}).`;
    pushLog(state, msg, "diplomacy");
    return { ok: true, message: msg };
  }
  setRelation(state, p.faction, f.id, rel - 4);
  const msg = `${f.short} tables the talk. ${invader ? "Occupiers do not sign with unnamed halls." : "Try again when you look less poor."}`;
  pushLog(state, msg, "diplomacy");
  return { ok: true, message: msg };
}

function doBreak(state, factionId) {
  const p = playerOf(state);
  const f = factionOf(state, factionId);
  if (!f) return { ok: false, message: "No such faction." };
  if (getRelation(state, p.faction, f.id) < 70) return { ok: false, message: "No pact to break." };
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  setRelation(state, p.faction, f.id, 28);
  const msg = `Pact with ${f.name} is torn.`;
  pushLog(state, msg, "diplomacy");
  return { ok: true, message: msg };
}

function doRumor(state, officerId, stats) {
  const t = officerOf(state, officerId);
  if (!t || t.id === "player" || !isVisibleOfficer(state, t)) return { ok: false, message: "No target." };
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  const drop = 6 + Math.floor(stats.int / 20) + (playerOf(state).personality === "schemer" ? 3 : 0);
  t.loyalty = Math.max(5, t.loyalty - drop);
  addBond(state, t.id, -4);
  let extra = "";
  if (t.loyalty < 25 && t.faction && chance(state, 0.4)) {
    const old = t.faction;
    t.faction = null;
    extra = ` ${t.name} walks from ${factionOf(state, old)?.short || old}.`;
  }
  const msg = `Rumors bite ${t.name}: loyalty ${t.loyalty}.${extra}`;
  pushLog(state, msg, "plot");
  return { ok: true, message: msg };
}

function doPersuade(state, officerId, stats) {
  const p = playerOf(state);
  if (!p.faction) return { ok: false, message: "Raise a banner first." };
  const t = officerOf(state, officerId);
  if (!t || t.id === p.id || !isVisibleOfficer(state, t)) return { ok: false, message: "No target." };
  if (t.faction === p.faction) return { ok: false, message: "Already yours." };
  if (t.region !== p.region) return { ok: false, message: "Must share a region." };
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  const roll = nextInt(state, 1, 100) + Math.floor(stats.chr / 3) + Math.floor((100 - t.loyalty) / 4);
  const dc = 55 + Math.floor(t.loyalty / 5);
  if (roll < dc) {
    const msg = `${t.name} is unmoved (${roll} vs ${dc}).`;
    pushLog(state, msg, "plot");
    return { ok: true, message: msg };
  }
  const madeGeneral = joinBanner(state, t, true);
  t.loyalty = 50 + Math.floor(stats.chr / 10);
  addBond(state, t.id, 10);
  const msg = madeGeneral
    ? `${t.name} crosses the floor as general ${playerGenerals(state).length}/${MAX_GENERALS}.`
    : `${t.name} crosses the floor to the court. Appoint them when a slot opens.`;
  pushLog(state, msg, "alert");
  return { ok: true, message: msg };
}

export function initCampaign(spec = {}) {
  return {
    phase: 1,
    nationalLeader: false,
    title: null,
    liberated: [],
    restoreThreshold: spec.restoreThreshold || 8,
    westBloc: spec.westBloc || ["AK", "WA", "OR", "ID", "MT", "WY", "UT", "CO"],
    eastApproach: spec.eastApproach || ["NE", "KS", "MO"],
    foreign: (spec.foreignTheaters || []).map((t) => ({
      id: t.id,
      name: t.name,
      short: t.short,
      unlockPhase: t.unlockPhase || 3,
      unlocked: false,
      held: false,
    })),
    sponsor: spec.sponsor || {
      id: "far_korea",
      name: "Peninsula — Korea",
      short: "Korea",
      copy: "A far-shore desk offers crates to the occupation. That country is now a takeable front.",
    },
    sponsorAdded: false,
    restoreWeek: null,
    seen: ["invasion"],
    loggedBeat: null,
  };
}

const BEAT_ORDER = ["invasion", "stall", "crown", "prairie", "gulf", "border", "desks"];

const CHRONOLOGY_FALLBACK = [
  {
    id: "invasion",
    mark: "1",
    name: "Invasion Day",
    phase: 1,
    scan: "Bering + Rio Grande. Omaha scar only.",
    coach: "Invasion Day is past. Bering and the Rio Grande. Omaha carries the only scar tag.",
    tick: "Invasion Day is past. Omaha keeps the scar tag.",
  },
  {
    id: "stall",
    mark: "2",
    name: "Stall",
    phase: 1,
    scan: "Cheyenne to Kansas and Missouri. No Canada.",
    coach: "Stall. Winter dig-in from Cheyenne into Kansas and Missouri. The line never crosses into Canada.",
    tick: "Stall. Winter dig-in from Cheyenne toward Kansas and Missouri.",
  },
  {
    id: "crown",
    mark: "3",
    name: "Advent Crown",
    phase: 1,
    scan: "First offensive fails. Seattle, Cheyenne, St. Louis.",
    coach: "Advent Crown. The first offensive fails and stalls. Pressure sits on Seattle, Cheyenne, and St. Louis.",
    tick: "Advent Crown. The first offensive fails. Seattle, Cheyenne, and St. Louis take the pressure.",
  },
  {
    id: "prairie",
    mark: "4",
    name: "Prairie Fire",
    phase: 2,
    scan: "West to east. Ridge Runners.",
    coach: "Prairie Fire. Ridge Runners break out west to east on the states already on this board.",
    tick: "Prairie Fire. Ridge Runners move with the west-to-east breakout.",
  },
  {
    id: "gulf",
    mark: "5",
    name: "Gulf Hammer",
    phase: 2,
    subtitle: "Long Rifle",
    scan: "St. Louis opens Gulf Sealift.",
    coach: "Gulf Hammer. Long Rifle. The gulf gate is St. Louis, then Gulf Sealift. No new coast cities.",
    tick: "Gulf Hammer. Long Rifle. St. Louis is the gulf gate.",
  },
  {
    id: "border",
    mark: "6",
    name: "Border Fury",
    phase: 2,
    scan: "Clear the states on this board.",
    coach: "Border Fury. Clear Nebraska, Kansas, and Missouri — the last states on this board.",
    tick: "Border Fury. Clear the last states on this board.",
  },
  {
    id: "desks",
    mark: "7",
    name: "Foreign desks",
    phase: 3,
    scan: "Russia via Bering. Cuba via Gulf Sealift.",
    coach: "Foreign desks. Russia by the Bering road. Cuba and Nicaragua by Gulf Sealift.",
    tick: "Foreign desks. Russia by the Bering road. Cuba and Nicaragua by Gulf Sealift.",
  },
];

function chronologyRows(state) {
  const spec = state?.campaignSpec?.chronology?.rows;
  const rows = Array.isArray(spec) && spec.length ? spec : CHRONOLOGY_FALLBACK;
  return rows.map((r) => ({
    id: r.id,
    mark: String(r.mark ?? ""),
    name: r.name,
    phase: r.phase || 1,
    scan: r.scan || "",
    subtitle: r.subtitle || "",
    coach: r.coach || r.scan || "",
    tick: r.tick || r.scan || r.name,
  }));
}

function currentBeatId(state, camp) {
  const lib = new Set(camp.liberated || []);
  const has = (id) => lib.has(id);
  const west = camp.westBloc || [];
  const east = camp.eastApproach || ["NE", "KS", "MO"];
  const westDone = !!camp.nationalLeader || (west.length > 0 && west.every(has));
  const eastDone = east.length > 0 && east.every(has);
  const us = stateControl(state).filter((s) => s.kind === "us");
  const conusDone = us.length > 0 && us.every((s) => s.liberated);
  const prairieOn = has("CO") || has("KS") || has("MO") || westDone || (camp.phase || 1) >= 2;
  const week = state.week || 0;
  if (conusDone) return "desks";
  if (westDone && has("MO") && !conusDone) return "border";
  if (westDone && !eastDone) return "gulf";
  if (prairieOn && !westDone) return "prairie";
  if (!prairieOn && (camp.phase || 1) < 2 && week >= 13 && week < 39) return "crown";
  return "stall";
}

export function campaignBeat(state) {
  const camp = ensureCampaign(state);
  const rows = chronologyRows(state);
  const nowId = currentBeatId(state, camp);
  const order = BEAT_ORDER;
  const nowI = order.indexOf(nowId);
  const week = state.week || 0;
  const painted = rows.map((row) => {
    const rowI = order.indexOf(row.id);
    let status = "next";
    if (row.id === "invasion") status = "past";
    else if (row.id === nowId) status = "now";
    else if (row.id === "crown" && nowId === "stall" && week >= 39) status = "past";
    else if (rowI >= 0 && nowI >= 0 && rowI < nowI) status = "past";
    let scan = row.scan;
    if (row.id === "desks" && camp.sponsorAdded) {
      scan = "Korea is open. Russia stays on the Bering road. Cuba stays on Gulf Sealift.";
    }
    return { ...row, status, scan };
  });
  const now = painted.find((r) => r.status === "now") || painted.find((r) => r.id === "stall") || painted[0];
  return { now, rows: painted, phase: camp.phase || 1 };
}

function noteBeat(state, notes) {
  const camp = ensureCampaign(state);
  const beat = campaignBeat(state);
  const id = beat.now?.id;
  if (!id || camp.loggedBeat === id) return;
  camp.loggedBeat = id;
  if (beat.now.tick) notes.push(beat.now.tick);
}

export function springPushCard(state, seasonChanged) {
  if (!seasonChanged || state._season?.id !== "spring") return null;
  const camp = ensureCampaign(state);
  if (!camp.seen) camp.seen = ["invasion"];
  if (camp.seen.includes("spring")) return null;
  if ((camp.phase || 1) >= 2 || camp.nationalLeader) return null;
  if ((camp.liberated || []).some((id) => id === "CO" || id === "KS" || id === "MO")) return null;
  camp.seen.push("spring");
  const row = chronologyRows(state).find((r) => r.id === "crown");
  return {
    kind: "season",
    id: "season",
    title: row?.name || "Advent Crown",
    text: row?.coach || "Advent Crown. The first offensive fails. Seattle, Cheyenne, and St. Louis take the pressure.",
    season: "spring",
  };
}

export function holdWord(state, region) {
  if (!region) return "contested";
  const p = playerOf(state);
  if (p?.faction && region.owner === p.faction) return "held";
  if (!region.owner) return "contested";
  const fac = factionOf(state, region.owner);
  if (fac?.alignment === "invader") return "occupied";
  return "contested";
}

export function stateHoldWord(state, row) {
  if (!row) return "contested";
  if (row.liberated) return "held";
  const terrs = row.territories || [];
  if (!terrs.length) return "contested";
  const words = terrs.map((t) => holdWord(state, regionOf(state, t.id)));
  if (words.every((w) => w === "held")) return "held";
  if (words.every((w) => w === "occupied")) return "occupied";
  return "contested";
}

export function ensureCampaign(state) {
  if (!state.campaign) state.campaign = initCampaign(state.campaignSpec || {});
  return state.campaign;
}

export function theaterVisible(state, region) {
  if (!region) return false;
  const need = region.unlockPhase || 0;
  if (!need) return true;
  return (ensureCampaign(state).phase || 1) >= need;
}

export function travelUnlocked(state, region) {
  if (!region) return false;
  const gate = region.unlockWeek || 0;
  if ((state.week || 0) < gate) return false;
  return theaterVisible(state, region);
}

export function stateControl(state) {
  const p = playerOf(state);
  const here = currentRegion(state);
  const theaters = (state.stateTheaters || []).filter((st) => st.kind !== "foreign");
  return theaters.map((st) => {
    const code = st.short || String(st.id || "").toUpperCase();
    const keys = st.keyCities || state.regions.filter((r) => r.stateCode === code).map((r) => r.id);
    const terrs = state.regions.filter((r) => r.stateCode === code && !(r.unlockPhase > 0));
    const heldKeys = keys.filter((id) => {
      const r = regionOf(state, id);
      return !!(r && p?.faction && r.owner === p.faction);
    });
    const heldTerr = terrs.filter((r) => p?.faction && r.owner === p.faction);
    return {
      id: code,
      name: st.name,
      kind: st.kind || "us",
      held: heldKeys.length,
      need: keys.length,
      keys,
      territories: terrs.map((r) => ({
        id: r.id,
        short: r.short,
        key: keys.includes(r.id),
        owner: r.owner,
        geo: geoTags(r),
        adjacent: !!(here && isAdjacent(state, here, r)),
        here: here?.id === r.id,
      })),
      heldTerr: heldTerr.length,
      totalTerr: terrs.length,
      liberated: !!(p?.faction && keys.length && heldKeys.length === keys.length),
    };
  });
}

export function tickCampaign(state) {
  const camp = ensureCampaign(state);
  const p = playerOf(state);
  const notes = [];
  if (!p?.faction) return notes;
  const ctrl = stateControl(state);
  ctrl.forEach((row) => {
    if (row.liberated && !camp.liberated.includes(row.id)) {
      camp.liberated.push(row.id);
      notes.push(`Liberated ${row.name} (${row.id}). Key cities are under your color.`);
    }
    if (!row.liberated && camp.liberated.includes(row.id)) {
      camp.liberated = camp.liberated.filter((id) => id !== row.id);
      notes.push(`${row.name} slips — a key city changed hands.`);
    }
  });
  const usLib = ctrl.filter((r) => r.kind === "us" && camp.liberated.includes(r.id)).length;
  if (!camp.nationalLeader && usLib >= (camp.restoreThreshold || 8)) {
    camp.nationalLeader = true;
    camp.phase = Math.max(camp.phase, 2);
    camp.title = "National leader";
    camp.restoreWeek = state.week;
    p.title = "National Leader";
    state.gold += 24;
    state.food += 16;
    notes.push("Prairie Fire. West bloc is enough — you are named national leader.");
    camp.foreign.forEach((f) => {
      f.unlocked = true;
    });
    camp.phase = 3;
    notes.push("Foreign desks are on the slate: Russia by the Bering road, Cuba and Nicaragua by Gulf Sealift.");
  }
  noteBeat(state, notes);
  camp.foreign.forEach((f) => {
    const node = regionOf(state, f.id);
    if (node && p.faction && node.owner === p.faction) f.held = true;
  });
  if (camp.sponsorAdded) {
    const k = regionOf(state, camp.sponsor.id);
    const row = camp.foreign.find((f) => f.id === camp.sponsor.id);
    if (k && p.faction && k.owner === p.faction && row) row.held = true;
  }
  notes.forEach((n) => pushLog(state, n, "alert"));
  return notes;
}

export function fireSponsor(state) {
  const camp = ensureCampaign(state);
  if (camp.sponsorAdded || camp.phase < 2) return null;
  camp.sponsorAdded = true;
  camp.phase = 4;
  const spec = camp.sponsor;
  if (!camp.foreign.some((f) => f.id === spec.id)) {
    camp.foreign.push({
      id: spec.id,
      name: spec.name,
      short: spec.short,
      unlockPhase: 4,
      unlocked: true,
      held: false,
    });
  } else {
    camp.foreign.forEach((f) => {
      if (f.id === spec.id) f.unlocked = true;
    });
  }
  const node = regionOf(state, spec.id);
  if (node) node.unlockPhase = 4;
  const line = spec.copy
    ? `Foreign desks. ${spec.copy} Korea is a takeable front. The Bering road and Gulf Sealift stay the only approaches.`
    : "Foreign desks. A sponsor intervenes. Korea is now a takeable front.";
  pushLog(state, line, "alert");
  return line;
}

export function canTravelTo(state, from, regionId) {
  if (!from?.neighbors?.includes(regionId)) {
    return { ok: false, message: "Cannot leap — take an adjacent road." };
  }
  const dest = regionOf(state, regionId);
  if (!dest) return { ok: false, message: "Unknown city." };
  if (!travelUnlocked(state, dest)) {
    if ((dest.unlockPhase || 0) > (ensureCampaign(state).phase || 1)) {
      return { ok: false, message: `${dest.short} is a later foreign front.` };
    }
    return { ok: false, message: `${dest.short} opens week ${dest.unlockWeek}.` };
  }
  return { ok: true };
}

function doTravel(state, regionId) {
  const here = currentRegion(state);
  const gate = canTravelTo(state, here, regionId);
  if (!gate.ok) return gate;
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  const dest = regionOf(state, regionId);
  playerOf(state).region = dest.id;
  state.selectedRegion = dest.id;
  const msg = `You reach ${dest.name}.`;
  pushLog(state, msg, "player");
  return { ok: true, message: msg };
}

function defenderPersonality(state, region) {
  const defs = livingOfficers(state).filter((o) => o.faction === region.owner && o.region === region.id);
  if (defs.length) return defs.sort((a, b) => b.war - a.war)[0].personality;
  return "loyalist";
}

export function duelCmd(state, cmd, extra = {}) {
  if (state.phase !== "duel" || !state.duel) return { ok: false, message: "No yard." };
  const d = state.duel;
  if (cmd === "move") {
    if (d.result) return { ok: false, message: "Yard closed." };
    if (d.beat !== "pick") return { ok: false, message: "Wait the next beat." };
    const foeMove = aiMove(d, nextFloat(state));
    resolveExchange(d, extra.move || null, extra.timing ?? 1, foeMove);
    if (d.result) d.beat = "done";
    return { ok: true, pendingEnd: !!d.result, message: d.last?.line || "Exchange." };
  }
  if (cmd === "next") {
    if (d.result) {
      d.beat = "done";
      return { ok: true, pendingEnd: true, message: "Yard closed." };
    }
    advanceBeat(d);
    return { ok: true, message: `Exchange ${d.exchange}/${d.maxExchanges}.` };
  }
  if (cmd === "clock") {
    if (d.result) {
      d.beat = "done";
      return { ok: true, pendingEnd: true };
    }
    if (d.beat === "pick") {
      const foeMove = aiMove(d, nextFloat(state));
      resolveExchange(d, extra.move || null, extra.timing ?? 1, foeMove);
    }
    if (!d.result) finishOnClock(d);
    d.beat = "done";
    return { ok: true, pendingEnd: true, message: d.log[d.log.length - 1] };
  }
  if (cmd === "timeout") {
    if (d.result) return finishDuel(state);
    if (d.beat === "pick") {
      const foeMove = aiMove(d, nextFloat(state));
      resolveExchange(d, extra.move || null, extra.timing ?? 1, foeMove);
    }
    if (!d.result) finishOnClock(d);
    d.beat = "done";
    return finishDuel(state);
  }
  if (cmd === "close") {
    if (!d.result) finishOnClock(d);
    return finishDuel(state);
  }
  if (cmd === "auto") {
    autoResolveDuel(d, () => nextFloat(state));
    return finishDuel(state);
  }
  return { ok: false, message: "Unknown yard command." };
}

function finishDuel(state) {
  const d = state.duel;
  if (!d) return { ok: false, message: "No yard." };
  const actor = officerOf(state, d.actorId) || playerOf(state);
  const out = applyDuelOutcome(state, d, { actor });
  d.beat = "done";
  state.phase = "strategy";
  state.duel = null;
  pushLog(state, out.message, "war");
  return {
    ok: true,
    duelEnd: d.result,
    message: out.message,
    sceneId: d.kind === "mission" ? "porch_challenge" : "challenge",
    underdog: d.underdog,
    bits: out.bits,
  };
}

function applyDuelOutcome(state, d, { actor, silent } = {}) {
  const you = officerOf(state, d.you.id) || actor || playerOf(state);
  const foe = officerOf(state, d.foe.id);
  const bits = [];
  const gold = (n) => {
    if (n > 0) {
      state.gold += n;
      bits.push(`+${n} gold`);
    } else if (n < 0) {
      const loss = Math.min(state.gold, -n);
      state.gold -= loss;
      if (loss) bits.push(`-${loss} gold`);
    }
  };
  if (d.result === "you") {
    gold(d.underdog ? 18 : d.kind === "spar" ? 4 : 12);
    you.fame = (you.fame || 0) + (d.underdog ? 6 : 3);
    state.fame = Math.min(100, (state.fame || 0) + (d.underdog ? 4 : 2));
    bits.push("fame");
    if (foe) {
      foe.wound = true;
      if (d.kind === "spar") {
        foe.loyalty = Math.min(100, (foe.loyalty || 50) + 4);
        you.loyalty = Math.min(100, (you.loyalty || 50) + 2);
        bits.push("spar respect");
      } else {
        foe.loyalty = Math.max(0, (foe.loyalty || 50) - 8);
        addBond(state, foe.id, 6);
        bits.push(`${foe.name} wounded`);
      }
    }
    if (d.underdog) bits.push("upset");
  } else if (d.result === "foe") {
    gold(d.kind === "spar" ? 0 : -8);
    you.wound = true;
    you.loyalty = Math.max(20, (you.loyalty || 50) - 4);
    bits.push("you wounded");
    if (foe && d.kind !== "spar") addBond(state, foe.id, -4);
  } else {
    gold(2);
    bits.push("draw");
  }
  if (d.jobId) {
    const job = missionById(state, d.jobId);
    if (job && !job.done) {
      job.done = true;
      if (d.result === "you") {
        gold(8);
        bits.push("mission");
      }
    }
  }
  const verb = d.result === "you" ? "wins" : d.result === "foe" ? "falls in" : "draws";
  const message = `${you.name} ${verb} the yard vs ${d.foe.name}${bits.length ? ` (${bits.join(", ")})` : ""}.`;
  void silent;
  return { message, bits };
}

function doAttack(state, content, extra) {
  const p = playerOf(state);
  const here = currentRegion(state);
  const dest = regionOf(state, extra.regionId);
  const leap = canTravelTo(state, here, dest?.id);
  if (!leap.ok) return { ok: false, message: leap.message || "Cannot leap — take an adjacent road." };
  if (p.faction && dest.owner === p.faction) return { ok: false, message: "Already yours." };
  if (p.faction && dest.owner && getRelation(state, p.faction, dest.owner) >= 70) {
    return { ok: false, message: "Pact forbids it. Break the alliance first." };
  }
  const fromHold = !!(p.faction && ownedByPlayer(state, here));
  const pool = fromHold ? here.garrison : p.retinue || 0;
  let commit = extra.troops != null ? extra.troops : Math.min(pool, Math.max(8, Math.floor(pool * 0.6)));
  commit = Math.max(8, Math.min(pool, commit));
  if (pool < 8) return { ok: false, message: "Too few troops." };
  if (!spend(state, 2)) return { ok: false, message: "Need 2 AP to march." };
  if (fromHold) here.garrison -= commit;
  else p.retinue -= commit;
  const techAtk = techAtkBonus(state, content);
  const battle = createBattle(state, content, here.id, dest.id, commit, techAtk);
  battle.defenderPersonality = defenderPersonality(state, dest);
  battle.fromHold = fromHold;
  if (extra.auto) {
    autoResolveBattle(state, battle, battle.defenderPersonality);
    return resolveBattle(state, battle);
  }
  state.phase = "battle";
  state.battle = battle;
  pushLog(state, `March from ${here.short} into ${dest.name} with ${commit}. ${battle.log[0]}`, "war");
  return { ok: true, message: `Battle in ${dest.name}.`, battle: true };
}

export function battleCmd(state, content, cmd, extra = {}) {
  if (state.phase !== "battle" || !state.battle) return { ok: false, message: "No field." };
  const b = state.battle;
  if (cmd === "select") return battleSelect(b, extra.unitId);
  if (cmd === "cell") return battleClickCell(state, b, extra.x, extra.y);
  if (cmd === "ploy") return battlePloy(state, b, extra.kind, playerOf(state).int);
  if (cmd === "endTurn") {
    endTacticalTurn(state, b, b.defenderPersonality);
    if (b.result) return resolveBattle(state, b);
    return { ok: true };
  }
  if (cmd === "auto") {
    autoResolveBattle(state, b, b.defenderPersonality);
    return resolveBattle(state, b);
  }
  return { ok: false, message: "Unknown battle command." };
}

function resolveBattle(state, battle) {
  const dest = regionOf(state, battle.toId);
  const origin = regionOf(state, battle.fromId);
  const atkR = remainingRatio(battle, "atk");
  const defR = remainingRatio(battle, "def");
  const atkLeft = Math.max(0, Math.round(battle.commit * atkR));
  const defLeft = Math.max(0, Math.round(dest.garrison * defR));
  dest.garrison = defLeft;
  const p = playerOf(state);
  if (battle.result === "atk") {
    const old = dest.owner;
    if (!p.faction) foundNorthernFront(state, dest, false);
    dest.owner = p.faction;
    dest.prefect = p.id;
    dest.garrison = Math.max(6, atkLeft);
    dest.order = Math.max(10, dest.order - 12);
    p.region = dest.id;
    state.selectedRegion = dest.id;
    p.fame += 8;
    state.fame += 8;
    livingOfficers(state)
      .filter((o) => o.faction === old && o.region === dest.id)
      .forEach((o) => {
        o.region = pickFallbackRegion(state, old, dest.id);
      });
    pushLog(state, `Taken: ${dest.name}. Remaining levy ${dest.garrison}.`, "war");
    tickCampaign(state);
    checkEnding(state);
  } else {
    const survivors = Math.floor(atkLeft * 0.7);
    if (battle.fromHold) origin.garrison += survivors;
    else p.retinue += survivors;
    dest.garrison = Math.max(4, defLeft);
    pushLog(state, `Repulsed from ${dest.short}. Survivors limp back.`, "war");
  }
  state.phase = "strategy";
  state.battle = null;
  return { ok: true, message: battle.result === "atk" ? `Victory at ${dest.name}.` : `Defeat at ${dest.name}.`, battleEnd: battle.result };
}

function pickFallbackRegion(state, factionId, lostId) {
  const opts = state.regions.filter((r) => r.owner === factionId && r.id !== lostId);
  if (opts.length) return opts[0].id;
  const any = state.regions.find((r) => r.id !== lostId);
  return any ? any.id : lostId;
}

function checkEnding(state) {
  const p = playerOf(state);
  if (!p.faction) return;
  const camp = ensureCampaign(state);
  const us = state.regions.filter((r) => !r.unlockPhase);
  const usHeld = us.filter((r) => r.owner === p.faction).length;
  const foreignOpen = state.regions.filter((r) => r.unlockPhase && theaterVisible(state, r));
  const foreignHeld = foreignOpen.filter((r) => r.owner === p.faction).length;
  if (camp.phase >= 3 && foreignOpen.length && foreignHeld >= foreignOpen.length && usHeld >= us.length) {
    state.gameOver = "win";
    state.ending = "The restored United States holds the far-shore desks. The occupation's sponsors have no map left.";
    pushLog(state, state.ending, "alert");
  }
}

function aiWeights(content, personality) {
  return content.officers.personalities[personality]?.weights || content.officers.personalities.loyalist.weights;
}

function weightedPick(state, weights, allowed) {
  const entries = Object.entries(weights).filter(([k]) => allowed.includes(k));
  const sum = entries.reduce((s, [, w]) => s + w, 0) || 1;
  let roll = nextFloat(state) * sum;
  for (const [k, w] of entries) {
    roll -= w;
    if (roll <= 0) return k;
  }
  return entries[0]?.[0] || "hide";
}

function applyOfficerChoice(state, off, choice, playerStaff) {
  const fac = off.faction ? factionOf(state, off.faction) : null;
  const region = regionOf(state, off.region);
  const ordered = playerStaff && off.standingOrder && off.standingOrder !== "auto";
  const suffix = ordered ? " — ordered." : "";
  const tag = `${off.name} [${off.personality}]`;

  if (choice === "drill" && region && fac && region.owner === fac.id) {
    const g = 2 + Math.floor(off.war / 22);
    region.garrison = Math.min(280, region.garrison + g);
    return { personality: off.personality, text: `${tag} drills ${region.short} (+${g} garrison).${suffix}` };
  }
  if (choice === "commerce" && region && fac && region.owner === fac.id) {
    const g = 3 + Math.floor(off.pol / 20);
    fac.gold += g;
    if (playerStaff) state.gold += g;
    region.economy = Math.min(100, region.economy + 1);
    return { personality: off.personality, text: `${tag} works markets in ${region.short} (+${g} gold).${suffix}` };
  }
  if (choice === "cultivate" && region && fac && region.owner === fac.id) {
    region.food = Math.min(100, region.food + 3);
    if (playerStaff) state.food += 2 + Math.floor(off.pol / 25);
    return { personality: off.personality, text: `${tag} caches food in ${region.short}.${suffix}` };
  }
  if (choice === "fortify" && region && fac && region.owner === fac.id) {
    region.walls = Math.min(90, region.walls + 2);
    return { personality: off.personality, text: `${tag} fortifies ${region.short} (walls ${region.walls}).${suffix}` };
  }
  if (choice === "safety" && region && fac && region.owner === fac.id) {
    region.order = Math.min(100, region.order + 3);
    return { personality: off.personality, text: `${tag} runs safety in ${region.short}.${suffix}` };
  }
  if (choice === "spy") {
    const n = pick(state, state.regions);
    n.intel = Math.min(3, n.intel + (off.personality === "schemer" ? 1 : 0));
    if (n.id === "arctic_slope") discoverCheck(state, n.id);
    return { personality: off.personality, text: `${tag} runs a net over ${n.short}.${suffix}` };
  }
  if (choice === "ally" && fac && !playerStaff) {
    const others = state.factions.filter((f) => f.onMap && f.id !== fac.id && f.alive !== false && f.alignment !== "invader");
    const o = pick(state, others);
    if (o) {
      setRelation(state, fac.id, o.id, getRelation(state, fac.id, o.id) + (off.personality === "diplomat" ? 6 : 2));
      return { personality: off.personality, text: `${tag} talks to ${o.short} (rel ${getRelation(state, fac.id, o.id)}).` };
    }
  }
  if (choice === "rumor" && !playerStaff) {
    const t = pick(state, livingOfficers(state).filter((x) => x.id !== off.id && x.faction && x.faction !== off.faction));
    if (t) {
      t.loyalty = Math.max(5, t.loyalty - (off.personality === "schemer" || off.personality === "ambitious" ? 5 : 2));
      return { personality: off.personality, text: `${tag} spreads rumor against ${t.name} (loy ${t.loyalty}).` };
    }
  }
  if (choice === "persuade" && !playerStaff) {
    return { personality: off.personality, text: `${tag} tests loyalties in ${region?.short || "the dark"}.` };
  }
  if (choice === "research") {
    if (playerStaff) state.research.points += 1;
    return { personality: off.personality, text: `${tag} scrapes a workshop for parts.${suffix}` };
  }
  if (choice === "mission" && playerStaff) {
    const ran = runStandingMission(state, off);
    if (ran) return ran;
  }
  region && (region.order = Math.min(100, region.order + 1));
  return { personality: off.personality, text: `${tag} hides stores and waits.${suffix}` };
}

function officerActAI(state, content, off) {
  if (off.id === "player" || off.alive === false) return null;
  if (off.hidden && !state.discovered.includes(off.id) && off.legend) {
    if (state.week >= 6 && chance(state, 0.2)) {
      noteLegendRumor(state, off.id);
      return { personality: off.personality, text: `Talk names ${legendDef(off.id).short} — still unlisted.` };
    }
    return null;
  }
  const fac = off.faction ? factionOf(state, off.faction) : null;
  const region = regionOf(state, off.region);
  const p = playerOf(state);
  const servingPlayer = !!(p.faction && off.faction === p.faction && off.id !== p.id);
  if (servingPlayer) {
    let choice = off.isGeneral && off.standingOrder && off.standingOrder !== "auto" ? off.standingOrder : null;
    if (!choice) {
      const weights = { ...aiWeights(content, off.personality), attack: 0 };
      choice = weightedPick(state, weights, ["drill", "commerce", "cultivate", "fortify", "safety", "spy", "hide", "research"]);
    }
    return applyOfficerChoice(state, off, choice, true);
  }

  const weights = aiWeights(content, off.personality);
  const allowed = ["drill", "commerce", "cultivate", "fortify", "safety", "spy", "ally", "rumor", "persuade", "hide", "research", "attack"];
  let choice = weightedPick(state, weights, allowed);

  if (!fac || !region) choice = "hide";
  if (choice === "attack" && (!fac || fac.alignment === "civilian" || fac.alignment === "intel")) {
    if (!chance(state, 0.15)) choice = "fortify";
  }
  if (choice === "attack" && region && fac) {
    const targets = region.neighbors
      .map((id) => regionOf(state, id))
      .filter((r) => r && r.owner !== fac.id && travelUnlocked(state, r));
    const grace = DIFFICULTY[state.difficulty].grace;
    const filtered = targets.filter((r) => {
      if (p.faction && r.owner === p.faction && regionsOfFaction(state, p.faction).length <= 1 && state.week < grace) return false;
      if (!p.faction && (r.id === p.region || (!r.owner && r.id === "bethel")) && state.week < grace + 8) return false;
      if (r.owner && getRelation(state, fac.id, r.owner) >= 70) return false;
      return true;
    });
    if (!filtered.length || region.garrison < 16) choice = "drill";
    else {
      const t = pick(state, filtered);
      const commit = Math.min(region.garrison - 4, Math.max(8, Math.floor(region.garrison * 0.45)));
      const pressure = DIFFICULTY[state.difficulty].pressure;
      const will = chance(state, Math.min(0.85, pressure + (off.personality === "aggressive" ? 0.25 : 0)));
      if (will && commit >= 8) {
        const atkPower = commit + off.war + (occupiedByInvader(region) ? 8 : 0);
        const defPower = t.garrison + t.walls + (t.intel ? 0 : 6);
        region.garrison -= commit;
        if (atkPower + nextInt(state, 0, 20) > defPower + nextInt(state, 0, 20)) {
          const old = t.owner;
          t.owner = fac.id;
          t.garrison = Math.max(8, Math.floor(commit * 0.6));
          region.garrison += Math.floor(commit * 0.2);
          tickCampaign(state);
          return {
            personality: off.personality,
            text: `${off.name} [${off.personality}] takes ${t.short} from ${old ? factionOf(state, old)?.short : "no one"} (war).`,
          };
        }
        t.garrison = Math.max(4, t.garrison - 4);
        region.garrison += Math.floor(commit * 0.55);
        return {
          personality: off.personality,
          text: `${off.name} [${off.personality}] raids ${t.short} and is thrown back.`,
        };
      }
      choice = "drill";
    }
  }

  return applyOfficerChoice(state, off, choice, false);
}

function upkeep(state) {
  const p = playerOf(state);
  const held = p.faction ? regionsOfFaction(state, p.faction) : [];
  const troops = held.reduce((s, r) => s + r.garrison, 0) + (p.retinue || 0);
  const season = state._season;
  const foodNeed = Math.max(0, Math.round((troops / 10) * (2 - season.food)));
  const goldNeed = Math.max(0, Math.round(troops / 14));
  state.food -= foodNeed;
  state.gold -= goldNeed;
  let notes = [];
  if (state.food < 0) {
    held.forEach((r) => {
      const d = Math.max(1, Math.floor(r.garrison * 0.08));
      r.garrison = Math.max(0, r.garrison - d);
    });
    notes.push("Hunger desertion.");
    state.food = 0;
  }
  if (state.gold < 0) {
    notes.push("Pay in arrears.");
    state.gold = 0;
  }
  let yieldFood = 0;
  let yieldGold = 0;
  held.forEach((r) => {
    const y = geoYield(r, season);
    yieldFood += y.food;
    yieldGold += y.gold;
    r.food = Math.min(100, r.food + Math.round((2 + geoOf(r).farm) * season.food * y.harsh));
    if (r.order < 30) r.garrison = Math.max(0, r.garrison - 1);
  });
  if (yieldFood) state.food += yieldFood;
  if (yieldGold) state.gold += yieldGold;
  if (yieldFood || yieldGold) notes.push(`Ground yields +${yieldFood} food, +${yieldGold} gold from held territories.`);
  if (state.gold === 0 && state.food === 0) {
    const found = nextInt(state, 4, 12);
    state.food += found;
    notes.push(`A cache is cracked open (+${found} food). You are not allowed to starve out of the game.`);
  }
  if (!held.length && p.faction) {
    notes.push("No ground under the banner — you are a warlord in name. Hide, spy, or take a town.");
  }
  if (!p.faction) {
    p.retinue = Math.max(4, p.retinue);
  }
  return notes;
}

function invaderPressure(state) {
  const pressure = DIFFICULTY[state.difficulty].pressure;
  const lines = [];
  ["pof", "banner"].forEach((fid) => {
    const rooms = regionsOfFaction(state, fid);
    rooms.forEach((r) => {
      if (chance(state, pressure * 0.5)) {
        r.garrison = Math.min(300, r.garrison + 2 + nextInt(state, 0, 3));
      }
    });
  });
  if (chance(state, pressure * 0.35)) {
    const anch = regionOf(state, "anchorage");
    anch.garrison = Math.min(320, anch.garrison + 4);
    lines.push("POF flights top off Anchorage.");
  }
  return lines;
}

function randomEvent(state) {
  const roll = nextInt(state, 1, 100);
  if (roll < 12) {
    const hit = nextInt(state, 2, 6);
    state.food = Math.max(0, state.food - hit);
    return `Blizzard eats ${hit} stores.`;
  }
  if (roll < 22) {
    const g = nextInt(state, 5, 14);
    state.gold += g;
    return `A coastal skipper sells you unmarked fuel scrip (+${g} gold).`;
  }
  if (roll < 30) {
    const here = currentRegion(state);
    here.order = Math.max(0, here.order - 6);
    return `Pamphlets in ${here.short} — order slips.`;
  }
  if (roll < 36 && legendBoard(state).some((h) => !h.revealed) && state.week >= 4) {
    noteAnyLegendRumor(state);
    const h = legendBoard(state).find((x) => x.hunt >= 1 && !x.revealed);
    return h ? `Talk names ${h.short}. Seek Legend when you can travel.` : null;
  }
  const camp = ensureCampaign(state);
  if (
    !camp.sponsorAdded &&
    camp.phase >= 2 &&
    camp.restoreWeek != null &&
    state.week >= camp.restoreWeek + 1 &&
    roll < 48
  ) {
    return fireSponsor(state);
  }
  return null;
}

export function weekTease(state) {
  const bits = [];
  const p = playerOf(state);
  if ((state.week + 1) % 13 === 0) bits.push("a season turn");
  const jobs = openMissions(state);
  if (jobs.length) bits.push(`${jobs.length} side job${jobs.length === 1 ? "" : "s"}`);
  const empty = MAX_GENERALS - playerGenerals(state).length;
  if (p.faction && empty > 0 && hireCandidates(state).length) bits.push("a free officer for an ADD chair");
  if (p.courtingId) bits.push("another visit that may bind the house");
  const hunts = legendBoard(state);
  if (hunts.some((h) => !h.revealed && h.hunt >= 1)) bits.push("a name in the static");
  else if (hunts.some((h) => !h.revealed)) bits.push("a hidden name if you Seek Legend");
  if (livingOfficers(state).some((o) => o.wound && (o.id === p.id || o.faction === p.faction))) bits.push("a wound fading");
  const here = regionOf(state, p.region);
  if (here && (here.stateCode === "AK" || here.stateCode === "YT")) bits.push("south-pass roads into Washington and Colorado");
  if (here && here.stateCode === "CO") bits.push("plains roads east toward Nebraska and the river gate");
  if (!bits.length) bits.push("neighbors moving");
  bits.push("a fresh AP pool");
  return bits.slice(0, 3).join(" · ");
}

export function endWeek(state, content) {
  if (state.phase === "battle") return { ok: false, message: "Battle still open." };
  if (state.phase === "duel") return { ok: false, message: "Yard still open." };
  livingOfficers(state).forEach((o) => {
    if (o.wound) o.wound = false;
  });
  attachSeason(state);
  const prevSeason = state._season?.id;
  const report = [];
  const notes = upkeep(state);
  notes.forEach((n) => report.push(n));
  invaderPressure(state).forEach((n) => report.push(n));
  const ev = randomEvent(state);
  if (ev) report.push(ev);

  const aiLines = [];
  livingOfficers(state).forEach((off) => {
    if (off.id === "player") return;
    if (off.retired || (off.child && (off.age || 0) < 16)) return;
    const line = officerActAI(state, content, off);
    if (line) aiLines.push(line);
  });
  aiLines.forEach((l) => {
    report.push(l.text);
    pushLog(state, l.text, "ai");
  });

  state.week += 1;
  attachSeason(state);
  const year = state.week > 0 && state.week % 52 === 0;
  const seasonChanged = state._season?.id !== prevSeason;
  const life = tickLife(state, { year, seasonChanged });
  const chronicle = buildChronicle(state, { year, seasonChanged, lifeEvents: life.events });
  const spring = springPushCard(state, seasonChanged);
  if (spring) chronicle.push(spring);
  tryUnlockTech(state, content, true);
  refreshMissionBoard(state);
  state.ap = apMax(state);
  playerOf(state).fame = Math.min(100, playerOf(state).fame + (playerOf(state).faction ? 1 : 0));

  const p = playerOf(state);
  if (p.faction && !regionsOfFaction(state, p.faction).length && !state.regions.some((r) => !r.owner)) {
    const refuge = state.regions.find((r) => r.id === "bethel") || state.regions[0];
    p.region = refuge.id;
  }

  report.unshift(`Week ${state.week} turns. ${state._season.name} ${calendarYear(state.week)}. AP ${state.ap}.`);
  state.weekReport = report;
  notes.forEach((n) => pushLog(state, n, "week"));
  if (ev) pushLog(state, ev, "week");
  chronicle.forEach((c) => {
    if (c.kind !== "season") pushLog(state, c.text, "week");
  });
  pushLog(state, `Calendar: week ${state.week}, ${state._season.name} ${calendarYear(state.week)}.`, "week");
  tickCampaign(state).forEach((n) => report.push(n));
  checkEnding(state);
  return { ok: true, message: `Week ${state.week} begins.`, report, weekEnd: true, chronicle };
}

export function autoplayWeek(state, content) {
  attachSeason(state);
  const p = playerOf(state);
  const here = currentRegion(state);
  if (!p.faction && !here.owner) act(state, content, "raise_banner");
  const hires = hireCandidates(state);
  if (hires.length && playerGenerals(state).length < MAX_GENERALS && state.gold > 40 && state.ap > 1) {
    act(state, content, "hire", { officerId: hires[0].id });
  }
  const jobs = openMissions(state).filter((j) => j.regionId === playerOf(state).region);
  if (jobs.length && p.faction && state.ap > 1 && state.week >= 1) {
    act(state, content, "mission", { jobId: jobs[0].id });
    if (state.phase === "duel") duelCmd(state, "auto");
  }
  if (p.faction && ownedByPlayer(state, currentRegion(state))) {
    if (state.food < 20 && state.ap) act(state, content, "cultivate");
    if (state.gold < 30 && state.ap) act(state, content, "commerce");
    if (currentRegion(state).garrison < 40 && state.ap) act(state, content, "drill");
    if (state.ap) act(state, content, "fortify");
    const targets = attackCandidates(state);
    const weak = targets.filter((r) => r.garrison < currentRegion(state).garrison * 0.7);
    if (weak.length && currentRegion(state).garrison >= 24 && state.ap >= 2 && state.week >= 3) {
      act(state, content, "attack", { regionId: weak[0].id, auto: true });
    }
  } else if (state.ap) {
    act(state, content, "spy", { regionId: "anchorage" });
    if (state.ap) act(state, content, "hide");
  }
  let guard = 0;
  while (state.ap > 0 && state.phase === "strategy" && !state.gameOver && guard++ < 12) {
    const before = state.ap;
    const hereNow = currentRegion(state);
    if (p.faction && ownedByPlayer(state, hereNow)) act(state, content, "commerce");
    else act(state, content, "research");
    if (state.ap >= before) act(state, content, "hide");
    if (state.ap >= before) break;
  }
  if (state.phase === "battle") battleCmd(state, content, "auto");
  if (state.phase === "duel") duelCmd(state, "auto");
  return endWeek(state, content);
}

export function personalityHistogram(state) {
  const map = {};
  state.log
    .filter((l) => l.kind === "ai")
    .forEach((l) => {
      const m = l.text.match(/\[([a-z]+)\]/);
      if (!m) return;
      map[m[1]] = (map[m[1]] || 0) + 1;
    });
  return map;
}

export function createCustomOfficer(state, spec) {
  const slots = state.contentMeta.customOfficerSlots || 10;
  if (state.customSlotsUsed >= slots) {
    return { ok: false, message: "Custom officer slots full (10)." };
  }
  if (state.officers.length >= (state.contentMeta.rosterCap || 500)) {
    return { ok: false, message: "Roster cap (500) reached." };
  }
  const name = String(spec.name || "").trim().slice(0, 28);
  if (name.length < 2) return { ok: false, message: "Name needs at least two letters." };
  const personality = spec.personality || "loyalist";
  if (!PERSONALITY_SKILLS[personality]) return { ok: false, message: "Unknown personality type." };
  const war = Number(spec.war ?? 55);
  const intel = Number(spec.int ?? 55);
  const pol = Number(spec.pol ?? 55);
  const chr = Number(spec.chr ?? 55);
  const stats = [war, intel, pol, chr];
  if (stats.some((n) => Number.isNaN(n) || n < CUSTOM_STAT_MIN || n > CUSTOM_STAT_MAX)) {
    return { ok: false, message: `Each stat must be ${CUSTOM_STAT_MIN}–${CUSTOM_STAT_MAX}.` };
  }
  const total = stats.reduce((s, n) => s + n, 0);
  if (total > CUSTOM_STAT_BUDGET) {
    return { ok: false, message: `Stat total ${total} exceeds budget ${CUSTOM_STAT_BUDGET}.` };
  }
  const skills = skillsForPersonality(personality);
  const id = `custom_${state.customSlotsUsed + 1}`;
  const portrait = spec.portrait || portraitInitials(name);
  state.officers.push({
    id,
    name,
    title: (spec.title || "Volunteer").slice(0, 24),
    war,
    int: intel,
    pol,
    chr,
    personality,
    faction: null,
    region: playerOf(state).region,
    loyalty: 50,
    ambition: spec.ambition ?? 40,
    hidden: false,
    legend: false,
    alive: true,
    retinue: 0,
    fame: 10,
    bio: spec.bio || `${name} is an original volunteer. Type ${personality} gates ${skills.join(", ")}.`,
    custom: true,
    skills,
    portrait,
    standingOrder: "auto",
    isGeneral: false,
    age: 28,
    spouseId: null,
    courtingId: null,
  });
  state.customSlotsUsed += 1;
  pushLog(state, `${name} [${personality}] added to the free roster in ${currentRegion(state).short}.`, "info");
  return { ok: true, id, skills, portrait };
}

export { DIFFICULTY, alliedFactions };
