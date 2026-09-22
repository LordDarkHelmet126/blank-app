/**
 * ROTK7-inspired between-turn life: seasons, aging, marriage, children.
 * Original names only — no Koei portraits or licensed film units.
 */
import { nextInt, chance, pick } from "./rng.js";

export const YEAR_WEEKS = 52;
const GIVEN = ["Remy", "Ellis", "Juniper", "Nessa", "Oren", "Pia", "Theo", "Wren", "Moss", "Cal"];

function playerOf(state) {
  return (state.officers || []).find((o) => o.id === state.playerOfficerId);
}
function officerOf(state, id) {
  return (state.officers || []).find((o) => o.id === id);
}
function living(state) {
  return (state.officers || []).filter((o) => o.alive !== false);
}
function isListed(state, o) {
  if (o.alive === false || o.retired) return false;
  if (o.child && (o.age || 0) < 16) return false;
  if (!o.hidden) return true;
  return (state.discovered || []).includes(o.id);
}

export function calendarYear(week) {
  return 1985 + Math.floor(Math.max(0, week) / YEAR_WEEKS);
}

export function seasonPalette(id) {
  if (id === "winter") {
    return { sea: ["#082038", "#103048"], land: ["#3a5048", "#586860"], overlay: "#4a6888" };
  }
  if (id === "spring") {
    return { sea: ["#083848", "#185868"], land: ["#2a6830", "#489048"], overlay: "#40a060" };
  }
  if (id === "fall") {
    return { sea: ["#182030", "#283040"], land: ["#684828", "#a06830"], overlay: "#a05820" };
  }
  return { sea: ["#082038", "#103058"], land: ["#486030", "#607838"], overlay: "#88a040" };
}

function hashAge(id) {
  let h = 2166136261;
  const s = String(id || "x");
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return 24 + (h >>> 0) % 34;
}

export function ensureLife(o) {
  if (!o) return o;
  if (o.age == null) o.age = o.child ? 0 : o.id === "player" ? 34 : hashAge(o.id);
  if (o.spouseId === undefined) o.spouseId = null;
  if (o.courtingId === undefined) o.courtingId = null;
  if (o.parents === undefined) o.parents = null;
  if (o.frail == null) o.frail = o.age >= 60;
  if (o.retired == null) o.retired = false;
  return o;
}

export function hydrateLife(state) {
  (state.officers || []).forEach(ensureLife);
  return state;
}

export function courtCandidates(state) {
  const p = playerOf(state);
  if (!p || p.spouseId) return [];
  return living(state).filter((o) => {
    if (!isListed(state, o) || o.id === p.id) return false;
    if (o.spouseId || o.retired) return false;
    if ((o.age || 0) < 18 || (o.age || 0) > 62) return false;
    if (o.region !== p.region) return false;
    return true;
  });
}

function surnameOf(name) {
  const parts = String(name || "Rourke").trim().split(/\s+/);
  return parts[parts.length - 1] || "Rourke";
}

function bindMarriage(a, b) {
  a.spouseId = b.id;
  b.spouseId = a.id;
  a.courtingId = null;
  b.courtingId = null;
}

function tryBirth(state, a, b) {
  const slots = state.contentMeta?.customOfficerSlots || 10;
  if ((state.customSlotsUsed || 0) >= slots) {
    return {
      kind: "birth",
      id: "birth",
      title: "A child, off the books",
      text: `${a.name} and ${b.name} have a child sent to kin. Roster slots are full — analog paper, no spare bunk.`,
    };
  }
  if (state.officers.length >= (state.contentMeta?.rosterCap || 500)) return null;
  const given = pick(state, GIVEN);
  const name = `${given} ${surnameOf(a.name)}`;
  const id = `child_${state.customSlotsUsed + 1}`;
  const personality = pick(state, ["loyalist", "cautious", "merchant", "diplomat", "recluse"]);
  const last = surnameOf(a.name);
  state.officers.push({
    id,
    name,
    title: "Child",
    war: 40,
    int: 42,
    pol: 40,
    chr: 44,
    personality,
    faction: null,
    region: a.region || b.region,
    loyalty: 70,
    ambition: 20,
    hidden: true,
    legend: false,
    alive: true,
    retinue: 0,
    fame: 0,
    bio: `Child of ${a.name} and ${b.name}. A future officer seed — not a licensed general.`,
    custom: true,
    child: true,
    parents: [a.id, b.id],
    age: 0,
    spouseId: null,
    courtingId: null,
    standingOrder: "auto",
    portrait: `${given[0]}${last[0]}`.toUpperCase(),
  });
  state.customSlotsUsed = (state.customSlotsUsed || 0) + 1;
  return {
    kind: "birth",
    id: "birth",
    title: "A child is born",
    text: `${name} is born to ${a.name} and ${b.name}. Paper certificate, 1980s clinic. Listed when they come of age.`,
  };
}

export function doCourt(state, officerId, stats) {
  const p = playerOf(state);
  ensureLife(p);
  const t = officerOf(state, officerId);
  if (!t || t.id === p.id) return { ok: false, message: "No one to court." };
  ensureLife(t);
  if (p.spouseId) return { ok: false, message: "Already bound." };
  if (t.spouseId) return { ok: false, message: "They already keep house." };
  if (t.region !== p.region) return { ok: false, message: "Must share a town." };
  if ((t.age || 0) < 18) return { ok: false, message: "Not of age." };

  if (p.courtingId === t.id) {
    bindMarriage(p, t);
    return {
      ok: true,
      message: `${p.name} and ${t.name} keep house. Hall speaker, paper forms — not a dating sim.`,
      sceneId: "marriage",
      married: true,
    };
  }

  const roll = (stats?.chr || p.chr) + nextInt(state, 0, 20);
  if (roll < 55) {
    p.courtingId = null;
    return { ok: true, message: `${t.name} declines the visit. Try another week.`, sceneId: "court" };
  }
  p.courtingId = t.id;
  t.courtingId = p.id;
  return {
    ok: true,
    message: `Courtship with ${t.name}. Visit again to bind the household.`,
    sceneId: "court",
    courting: true,
  };
}

export function tickLife(state, opts = {}) {
  hydrateLife(state);
  const events = [];
  const p = playerOf(state);
  const year = !!opts.year;
  const seasonChanged = !!opts.seasonChanged;

  if (year) {
    living(state).forEach((o) => {
      if (o.retired) return;
      o.age = (o.age || 0) + 1;
      if (o.age >= 60) o.frail = true;
      if (o.child && o.age >= 16 && o.hidden) {
        o.hidden = false;
        o.title = "Youth";
        events.push({
          kind: "age",
          id: "age",
          title: "Comes of age",
          text: `${o.name} is listed at 16. A future officer, still original IP.`,
        });
      }
    });
    events.push({
      kind: "age",
      id: "age",
      title: "Years",
      text: `${p.name} aged to ${p.age}${p.frail ? " — the years sit heavy." : "."} Typewritten log, analog calendar.`,
    });

    living(state).forEach((o) => {
      if (o.id === "player" || o.legend || o.retired) return;
      if ((state.factions || []).some((f) => f.ruler === o.id)) return;
      if (o.age >= 68 && chance(state, 0.22)) {
        o.alive = false;
        o.retired = true;
        o.faction = null;
        events.push({
          kind: "funeral",
          id: "funeral",
          title: "Laid down the kit",
          text: `${o.name} lays down the kit at ${o.age}. A short service in the hall.`,
        });
      }
    });

    if (p.spouseId) {
      const sp = officerOf(state, p.spouseId);
      if (sp && sp.alive !== false && chance(state, 0.4)) {
        const born = tryBirth(state, p, sp);
        if (born) events.push(born);
      }
    } else if (p.courtingId && chance(state, 0.45)) {
      const t = officerOf(state, p.courtingId);
      if (t && !t.spouseId && t.alive !== false) {
        bindMarriage(p, t);
        events.push({
          kind: "marriage",
          id: "marriage",
          title: "Bound",
          text: `${p.name} and ${t.name} keep house as the year turns.`,
        });
      }
    }
  } else if (seasonChanged && p.courtingId && !p.spouseId && chance(state, 0.28)) {
    const t = officerOf(state, p.courtingId);
    if (t && !t.spouseId && t.alive !== false) {
      bindMarriage(p, t);
      events.push({
        kind: "marriage",
        id: "marriage",
        title: "Bound",
        text: `${p.name} and ${t.name} keep house as the season turns.`,
      });
    }
  }

  return { events: events.slice(0, 2), year, seasonChanged };
}

export function seasonCard(state) {
  const s = state._season || { id: "winter", name: "Winter" };
  const y = calendarYear(state.week);
  const copy = {
    winter: "Snow on the ranch road. Stoves, parkas, analog radios.",
    spring: "Breakup mud and new grass in the foothills.",
    summer: "High-country gold grass. Long light, dry pine.",
    fall: "Aspen rust and a hard wind off the ridges.",
  };
  return {
    kind: "season",
    id: "season",
    title: `${s.name} ${y}`,
    text: `Week ${state.week}. ${copy[s.id] || copy.summer}`,
    season: s.id,
  };
}

export function buildChronicle(state, { year, seasonChanged, lifeEvents }) {
  const cards = [];
  if (seasonChanged || year) cards.push(seasonCard(state));
  (lifeEvents || []).forEach((e) => cards.push(e));
  return cards.slice(0, 3);
}

export function sampleChronicle(state) {
  hydrateLife(state);
  const p = playerOf(state);
  let hart = officerOf(state, "hart");
  if (!hart) hart = living(state).find((o) => o.id !== p.id && !o.hidden);
  ensureLife(hart);
  hart.region = p.region;
  hart.alive = true;
  hart.hidden = false;
  bindMarriage(p, hart);
  p.age = 51;
  p.frail = false;
  state.week = 26;
  const born = tryBirth(state, p, hart);
  const cards = [
    {
      kind: "season",
      id: "season",
      title: "Summer 1985",
      text: "High-country gold grass. The ranch road holds a jeep column and a household ledger.",
      season: "summer",
    },
    {
      kind: "age",
      id: "age",
      title: "Years",
      text: `${p.name} aged to 51. Typewritten log — analog calendar, no smartphone.`,
    },
    {
      kind: "marriage",
      id: "marriage",
      title: "Bound",
      text: `${p.name} and ${hart.name} keep house. Hall speaker and paper forms.`,
    },
  ];
  if (born) cards.push(born);
  return {
    week: 26,
    spouseId: hart.id,
    childId: state.officers.filter((o) => o.child).slice(-1)[0]?.id || null,
    chronicle: cards.slice(0, 4),
  };
}
