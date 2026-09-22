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

export { courtCandidates, sampleChronicle, calendarYear, seasonPalette };

export const GAME_VERSION = 1;
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

export function playerGenerals(state) {
  const p = playerOf(state);
  if (!p.faction) return [];
  return livingOfficers(state).filter((o) => o.faction === p.faction && o.id !== p.id);
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
  const allowed = new Set(["auto", ...(off?.skills || skillsForPersonality(off?.personality))]);
  return GENERAL_ORDERS.filter((o) => allowed.has(o.id));
}

export function setGeneralOrder(state, officerId, orderId) {
  if (state.phase === "battle") return { ok: false, message: "Finish the field first." };
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
  ap += Math.min(MAX_GENERALS, playerGenerals(state).length);
  ap += DIFFICULTY[state.difficulty].apBonus;
  return Math.min(9, ap);
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
    contentMeta: {
      rosterCap: content.officers.meta.rosterCap,
      customOfficerSlots: content.officers.meta.customOfficerSlots,
    },
  };

  applyDifficultyGarrisons(state);
  attachSeason(state);
  hydrateLife(state);
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

  pushLog(state, `Week 0. Invasion landings at Anchorage and the Slope. You are alone in the Kuskokwim Lowlands.`, "alert");
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
  });
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

function actingStats(state, off) {
  const fac = off.faction ? factionOf(state, off.faction) : null;
  const m = fac?.mods || {};
  const frail = off.frail || (off.age || 0) >= 60 ? -6 : 0;
  return {
    war: clampStat(off.war + (m.war || 0) + frail),
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

export function legendStatus(state) {
  const k = officerOf(state, "karr");
  const revealed = !!(k && isVisibleOfficer(state, k));
  const hunt = revealed ? 2 : state.legendHunt || 0;
  let rumor;
  if (revealed) rumor = `${k.name}, ${k.title}, is listed. He still keeps to the Slope.`;
  else if (hunt >= 1) rumor = "Named: Ilya Karr, Slope Ghost. Travel to Arctic Slope (via Fairbanks) and Seek Legend.";
  else rumor = "Rumor: an unlisted trapline hand still walks Slope country. Seek Legend or Spy the Arctic Slope.";
  return {
    id: "karr",
    hunt,
    revealed,
    regionId: "arctic_slope",
    rumor,
    mapMark: !revealed,
  };
}

function noteKarrRumor(state) {
  if (legendStatus(state).revealed) return false;
  if ((state.legendHunt || 0) >= 1) return false;
  state.legendHunt = 1;
  pushLog(state, "A name surfaces: Ilya Karr, the Slope Ghost. Travel to Arctic Slope and Seek Legend to make contact.", "legend");
  return true;
}

function revealKarr(state) {
  const k = officerOf(state, "karr");
  if (!k) return false;
  if (state.discovered.includes("karr") && !k.hidden) {
    state.legendHunt = 2;
    return false;
  }
  if (!state.discovered.includes("karr")) state.discovered.push("karr");
  k.hidden = false;
  state.legendHunt = 2;
  pushLog(state, `Legend found: ${k.name}, ${k.title}. ${k.bio} He can be hired if you share the Slope.`, "legend");
  return true;
}

function advanceKarrHunt(state, onSlope) {
  if (legendStatus(state).revealed) return { revealed: false, already: true };
  if (onSlope) {
    const fresh = revealKarr(state);
    return { revealed: fresh, rumored: false };
  }
  const rumored = noteKarrRumor(state);
  return { revealed: false, rumored };
}

function discoverCheck(state, regionId) {
  if (regionId === "arctic_slope") {
    const onSlope = playerOf(state).region === "arctic_slope";
    return advanceKarrHunt(state, onSlope);
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
  if (state.phase === "battle") return [];
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
  actions.push({
    id: "seek_legend",
    label: hunt.hunt >= 1 && p.region === "arctic_slope" ? "Contact Legend" : "Seek Legend",
    ap: hunt.hunt >= 1 && p.region !== "arctic_slope" ? 0 : 1,
    group: "spy",
    enabled: !hunt.revealed,
    hint: hunt.revealed
      ? "Ilya Karr is listed."
      : hunt.hunt >= 1
        ? "Travel to Arctic Slope (via Fairbanks) and seek again to make contact."
        : "Follow Slope trapline rumors. A hidden officer may be walking the ice.",
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
    enabled: hasBanner && gens < MAX_GENERALS,
    hint: gens >= MAX_GENERALS ? "Command staff full (5 generals)." : "Recruit a free officer in this region.",
    needs: "hire",
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
    enabled: hasBanner && gens < MAX_GENERALS,
    hint: "Talk a wavering officer into your color.",
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
    hint: "Move to a neighboring region.",
    needs: "neighbor",
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

export function attackCandidates(state) {
  const here = currentRegion(state);
  const p = playerOf(state);
  return here.neighbors
    .map((id) => regionOf(state, id))
    .filter((r) => r && r.owner !== p.faction);
}

export function neighborRegions(state) {
  const here = currentRegion(state);
  return here.neighbors.map((id) => regionOf(state, id)).filter(Boolean);
}

function alliedFactions(state) {
  const p = playerOf(state);
  if (!p.faction) return [];
  return state.factions.filter((f) => f.onMap && f.id !== p.faction && f.alive !== false && getRelation(state, p.faction, f.id) >= 70);
}

export function act(state, content, actionId, extra = {}) {
  attachSeason(state);
  if (state.gameOver) return { ok: false, message: "The campaign is finished." };
  if (state.phase === "battle" && actionId !== "battle") return { ok: false, message: "Finish the field first." };

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
  if (actionId === "ally") return doAlly(state, extra.factionId, stats);
  if (actionId === "break_ally") return doBreak(state, extra.factionId);
  if (actionId === "rumor") return doRumor(state, extra.officerId, stats);
  if (actionId === "persuade") return doPersuade(state, extra.officerId, stats);
  if (actionId === "court") {
    if (!spend(state, 1)) return { ok: false, message: "No AP." };
    return doCourt(state, extra.officerId, stats);
  }
  if (actionId === "travel") return doTravel(state, extra.regionId);
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
    const gain = 3 + Math.floor(stats.war / 18) + nextInt(state, 0, 3);
    here.garrison = Math.min(280, here.garrison + gain);
    here.order = Math.min(100, here.order + 1);
    msg = `Drill in ${here.short}: garrison +${gain} (now ${here.garrison}).`;
  } else if (kind === "commerce") {
    const gain = Math.max(2, Math.round((4 + stats.pol / 12) * season.commerce) + nextInt(state, 0, 3));
    state.gold += gain;
    here.economy = Math.min(100, here.economy + 1);
    msg = `Commerce in ${here.short}: +${gain} gold (treasury ${state.gold}).`;
  } else if (kind === "cultivate") {
    const gain = Math.max(2, Math.round((5 + stats.pol / 14) * season.food) + nextInt(state, 0, 2));
    state.food += gain;
    here.food = Math.min(100, here.food + 2);
    msg = `Cultivate in ${here.short}: +${gain} stores (food ${state.food}).`;
  } else if (kind === "fortify") {
    const gain = 2 + Math.floor(stats.war / 25) + (here.type === "naval" ? 1 : 0);
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
  const st = legendStatus(state);
  if (st.revealed) return { ok: false, message: "Ilya Karr is already listed." };
  const onSlope = playerOf(state).region === "arctic_slope";
  if (st.hunt >= 1 && !onSlope) {
    const msg = "The name is Ilya Karr. Travel to Arctic Slope (Fairbanks → Slope) and Seek Legend again.";
    pushLog(state, msg, "legend");
    return { ok: true, message: msg };
  }
  if (!spend(state, 1)) return { ok: false, message: "No AP." };
  if (onSlope) {
    revealKarr(state);
    const k = officerOf(state, "karr");
    return {
      ok: true,
      message: `${k.name} steps out of the weather. Legend listed.`,
      revealed: true,
      officerName: k.name,
    };
  }
  noteKarrRumor(state);
  return {
    ok: true,
    message: "Trapline talk names Ilya Karr, Slope Ghost. Go north to Arctic Slope to make contact.",
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
  if (hunt?.revealed) return { ok: true, message: msg, revealed: true, officerName: "Ilya Karr" };
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
  if (hunt?.revealed) return { ok: true, message: msg, revealed: true, officerName: "Ilya Karr" };
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
  if (playerGenerals(state).length >= MAX_GENERALS) return { ok: false, message: "Five generals already." };
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
    return { ok: true, message: msg };
  }
  state.gold -= cost;
  t.faction = p.faction;
  t.loyalty = Math.min(90, 55 + Math.floor(stats.chr / 8));
  t.standingOrder = t.standingOrder || "auto";
  addBond(state, t.id, 12);
  p.fame += 4;
  const msg = `${t.name} takes your color as general ${playerGenerals(state).length}/${MAX_GENERALS}.`;
  pushLog(state, msg, "alert");
  state.ap = Math.min(apMax(state), state.ap + 1);
  return { ok: true, message: msg };
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
  if (playerGenerals(state).length >= MAX_GENERALS) return { ok: false, message: "Staff is full." };
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
  t.faction = p.faction;
  t.loyalty = 50 + Math.floor(stats.chr / 10);
  t.standingOrder = t.standingOrder || "auto";
  addBond(state, t.id, 10);
  const msg = `${t.name} crosses the floor to Northern Front.`;
  pushLog(state, msg, "alert");
  return { ok: true, message: msg };
}

function doTravel(state, regionId) {
  const here = currentRegion(state);
  if (!here.neighbors.includes(regionId)) return { ok: false, message: "Not adjacent." };
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

function doAttack(state, content, extra) {
  const p = playerOf(state);
  const here = currentRegion(state);
  const dest = regionOf(state, extra.regionId);
  if (!dest || !here.neighbors.includes(dest.id)) return { ok: false, message: "Pick a neighboring region." };
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
  const held = regionsOfFaction(state, p.faction).length;
  const total = state.regions.length;
  if (held >= total) {
    state.gameOver = "win";
    state.ending = "Alaska theater is under one color. The rest of the west still burns, but this map is done.";
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
  region && (region.order = Math.min(100, region.order + 1));
  return { personality: off.personality, text: `${tag} hides stores and waits.${suffix}` };
}

function officerActAI(state, content, off) {
  if (off.id === "player" || off.alive === false) return null;
  if (off.hidden && !state.discovered.includes(off.id) && off.legend) {
    if (state.week >= 6 && chance(state, 0.2)) {
      noteKarrRumor(state);
      return { personality: off.personality, text: "Slope talk: traplines are being walked by someone who will not take a radio." };
    }
    return null;
  }
  const fac = off.faction ? factionOf(state, off.faction) : null;
  const region = regionOf(state, off.region);
  const p = playerOf(state);
  const servingPlayer = !!(p.faction && off.faction === p.faction && off.id !== p.id);
  if (servingPlayer) {
    let choice = off.standingOrder && off.standingOrder !== "auto" ? off.standingOrder : null;
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
      .filter((r) => r && r.owner !== fac.id);
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
  held.forEach((r) => {
    r.food = Math.min(100, r.food + Math.round(2 * season.food));
    if (r.order < 30) r.garrison = Math.max(0, r.garrison - 1);
  });
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
  if (roll < 36 && !legendStatus(state).revealed && state.week >= 4) {
    noteKarrRumor(state);
    return "A trapper south of the Brooks talks about Ilya Karr still walking the Slope. Seek Legend when you can go north.";
  }
  return null;
}

export function endWeek(state, content) {
  if (state.phase === "battle") return { ok: false, message: "Battle still open." };
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
  tryUnlockTech(state, content, true);
  state.ap = apMax(state);
  playerOf(state).fame = Math.min(100, playerOf(state).fame + (playerOf(state).faction ? 1 : 0));

  const p = playerOf(state);
  if (p.faction && !regionsOfFaction(state, p.faction).length && !state.regions.some((r) => !r.owner)) {
    const refuge = state.regions.find((r) => r.id === "bethel") || state.regions[0];
    p.region = refuge.id;
  }

  report.unshift(`Week ${state.week} — ${state._season.name} ${calendarYear(state.week)}. AP restored to ${state.ap}.`);
  state.weekReport = report;
  notes.forEach((n) => pushLog(state, n, "week"));
  if (ev) pushLog(state, ev, "week");
  chronicle.forEach((c) => {
    if (c.kind !== "season") pushLog(state, c.text, "week");
  });
  pushLog(state, `Calendar: week ${state.week}, ${state._season.name} ${calendarYear(state.week)}.`, "week");
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
    age: 28,
    spouseId: null,
    courtingId: null,
  });
  state.customSlotsUsed += 1;
  pushLog(state, `${name} [${personality}] added to the free roster in ${currentRegion(state).short}.`, "info");
  return { ok: true, id, skills, portrait };
}

export { DIFFICULTY, alliedFactions };
