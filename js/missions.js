import { nextInt, chance, pick } from "./rng.js";

export const MISSION_CAP = 4;
export const MISSION_TTL = 2;

const WEST =
  "Western foothills dust — ranch grade, jeep column, militia horse scouts. Original partisan kit.";

export const MISSION_TEMPLATES = [
  {
    id: "scout_road",
    name: "Scout the road",
    ap: 1,
    stat: "int",
    dc: 40,
    order: true,
    flavor: {
      default: `Glass the next gold-road washout. ${WEST}`,
      arctic_slope: "Trapline on the ice road. Mark drum caches before a column uses them.",
      yukon_road: "Whitehorse spur. Count southbound trucks that still think a border means something.",
      kenai: "Ranch grade in the western foothills. Horse scouts and pickups share the same dust.",
      bethel: "River road south of Bethel. Jeep tracks in breakup mud.",
    },
    ok: "Road sketched. A column can use it without guessing.",
    fail: "Fog and a wrong fork. The sketch is thin.",
    rewards: { gold: [6, 14], intel: 1 },
  },
  {
    id: "raid_depot",
    name: "Raid a depot",
    ap: 1,
    stat: "war",
    dc: 48,
    order: true,
    flavor: {
      default: `A fuel hut off the ranch road. Cut the lock, take drums, leave the rest. ${WEST}`,
      anchorage: "Occupation drums behind a wire. Quiet in, quieter out.",
      kodiak: "Beach hut with Banner stencil. Take stove oil, not a speech.",
      arctic_slope: "Slope cache under a tarp. Occupier paint still wet.",
    },
    ok: "Drums and scrip come home. The hut will notice at dawn.",
    fail: "A sentry coughs. You leave the lock and a little gold.",
    rewards: { gold: [12, 22], item: "depot_scrip" },
    riskGold: 4,
  },
  {
    id: "escort_convoy",
    name: "Escort a convoy",
    ap: 1,
    stat: "war",
    dc: 44,
    order: true,
    flavor: {
      default: `Jeep pickups and a militia horse scout take a ranch grade. Keep them on the gold road. ${WEST}`,
      yukon_road: "Relay trucks on the spur. Analog radios, no drones.",
      fairbanks: "Mill scrip and flour on the Interior road. Glass the next ridge.",
      kenai: "Ranch column — horse scouts on the flank, Jeeps in the dust.",
    },
    ok: "The column makes the next town. Scrip and stores change hands.",
    fail: "A washout eats a Jeep. You salvage a little flour.",
    rewards: { gold: [8, 16], food: [4, 10] },
  },
  {
    id: "rescue_officer",
    name: "Rescue an officer",
    ap: 1,
    stat: "chr",
    dc: 46,
    order: true,
    flavor: {
      default: "A listed name is held in a back room. Talk, cut, or buy the door.",
      kenai: "Ranch hall rumor: a marshal's cousin is in a shed. Western foothills, not a film unit.",
      nome: "Spit shack. Aurora tried; the lock is still there.",
      bethel: "A river name on a clipboard. The hall wants them back.",
    },
    ok: "A name walks out. Loyalty ticks; the roster grows friendlier.",
    fail: "The door stays shut. You leave a little gold on the table.",
    rewards: { loyalty: 8, bond: 10 },
    rescue: true,
  },
  {
    id: "sabotage",
    name: "Sabotage",
    ap: 1,
    stat: "int",
    dc: 50,
    order: true,
    flavor: {
      default: "Cut a wire, loosen a drum, leave no speech. Analog work.",
      anchorage: "Occupation generator behind the wire. A wrench, not a speech.",
      kodiak: "Banner beach pump. Salt and a short in the same night.",
      arctic_slope: "Slope watch tower. Ice and a sawed rung.",
    },
    ok: "Walls and garrison slip. They will count the damage at first light.",
    fail: "A dog, a light, a retreat. Thin work.",
    rewards: { walls: -3, garrison: -6, fame: 2 },
  },
  {
    id: "radio_run",
    name: "Deliver a radio message",
    ap: 1,
    stat: "int",
    dc: 42,
    order: true,
    flavor: {
      default: "One-time pad on paper. Analog set. No satellite, no 2020s kit.",
      yukon_road: "Dead microwave spur. Someone still answers on tubes.",
      nome: "Aurora weather net. CRT map and a callsign.",
      bering_strait: "Ice Pact listen. A pad, a skiff, a handshake on a cold dock.",
    },
    ok: "The pad is burned. The name on the other end is real.",
    fail: "Static. You keep the tubes and try next week.",
    rewards: { fame: 3, intel: 1, item: "analog_pad" },
  },
  {
    id: "cache_pull",
    name: "Pull a winter cache",
    ap: 1,
    stat: "pol",
    dc: 38,
    order: true,
    flavor: {
      default: "Drums under tundra or a ranch loft. Feed the week.",
      bethel: "River cache south of the hall. Fish and flour, not medals.",
      kenai: "Ranch loft in the western foothills. Hay, cans, and a locked trunk.",
      arctic_slope: "Ice-road drums. Occupier stencil, civilian stores.",
    },
    ok: "Stores come up. The week eats less of you.",
    fail: "A thaw, a hole, a thinner bag.",
    rewards: { food: [8, 16] },
  },
  {
    id: "ford_watch",
    name: "Watch the river ford",
    ap: 1,
    stat: "war",
    dc: 41,
    order: true,
    flavor: {
      default: "A gravel bar and a gold-road dip. Count who crosses.",
      bethel: "Kuskokwim ford. Jeep lights at odd hours.",
      yukon_road: "Spur ford toward the mine road. Relay stamps; you count hulls.",
      kenai: "Ranch creek. Horse scouts already know the rocks.",
    },
    ok: "Order ticks. A levy sleeps easier.",
    fail: "Fog. You count the wrong lights.",
    rewards: { order: 4, gold: [4, 10] },
  },
  {
    id: "airstrip_mark",
    name: "Mark a gravel strip",
    ap: 1,
    stat: "int",
    dc: 45,
    order: true,
    flavor: {
      default: "Paint drums and a wind sock. Hueys, if any, still use analog weather.",
      fairbanks: "Dirt strip off the mill road. 1985 kit, not a jet age.",
      nome: "Spit gravel. Aurora will not launch into a lie.",
      kenai: "Ranch strip in the foothills. Horse trail on one side, Jeep ruts on the other.",
    },
    ok: "The sock flies. Workshop hours tick.",
    fail: "Wind eats the paint. You keep the drums.",
    rewards: { research: 2, gold: [5, 12] },
  },
  {
    id: "claim_survey",
    name: "Survey a claim",
    ap: 1,
    stat: "pol",
    dc: 43,
    order: true,
    flavor: {
      default: "Stakes, a book, a handshake. Occupier scrip does not buy a claim.",
      klondike: "Mine road. Tagg's book is still the law here.",
      yukon_road: "Spur rumor of a still-open hut. Stamps before rifles.",
      fairbanks: "Mill timber claim. Interior paper, civilian ink.",
    },
    ok: "The stake holds. Gold and a quieter road.",
    fail: "A jumper, a spat, a thinner purse.",
    rewards: { gold: [10, 20] },
  },
  {
    id: "ice_listen",
    name: "Listen on the ice",
    ap: 1,
    stat: "int",
    dc: 47,
    order: true,
    flavor: {
      default: "Analog set on a cold dock. Hulls that do not belong.",
      bering_strait: "Ice Pact watch. A pad, a skiff, a name in static.",
      nome: "Spit net. Weather and rumor on the same band.",
      arctic_slope: "Slope talk. Traplines walked by someone who will not take a radio.",
    },
    ok: "A name in the static. Legend rumor, if any still hide.",
    fail: "Ice noise. You pack the set.",
    rewards: { intel: 1, rumor: true, fame: 2 },
  },
  {
    id: "ranch_relay",
    name: "Ranch radio relay",
    ap: 1,
    stat: "chr",
    dc: 44,
    order: true,
    flavor: {
      default: `A hall on the western ranch grade. Pass a callsign; take scrip and a handshake. ${WEST}`,
      kenai: "Ranch marshal country. Militia horse scouts on the porch, analog set on the table.",
      bethel: "River hall. Compact paper does not reach here; a handshake does.",
      juneau: "South-pass hall. Compact minutes and a borrowed ham set.",
    },
    ok: "The callsign sticks. Loyalty and a little gold.",
    fail: "They keep the tea and the silence.",
    rewards: { gold: [6, 14], loyalty: 6, item: "ranch_token" },
  },
  {
    id: "porch_challenge",
    name: "Porch challenge",
    ap: 1,
    stat: "war",
    dc: 50,
    order: true,
    duel: true,
    flavor: {
      default: `A yard behind the hall. No levy — two officers, Strike / Guard / Special, about ninety-nine seconds if both stay up. ${WEST}`,
      bethel: "River-hall porch. Call out whoever is in Bethel. Original partisan kit — not a licensed bout.",
      kenai: "Ranch yard in the western foothills. Horse scouts keep the circle.",
      nome: "Spit gravel. Aurora watches; you still throw the first Strike.",
    },
    ok: "The yard remembers the name that stood.",
    fail: "Dust and a split lip. Walk it off.",
    rewards: { gold: [8, 16], fame: 3 },
  },
];

export function templateOf(id) {
  return MISSION_TEMPLATES.find((t) => t.id === id) || MISSION_TEMPLATES[0];
}

export function missionCopy(job, regionId) {
  const t = templateOf(job.templateId || job.id);
  const map = t.flavor || {};
  return map[regionId] || map.default || t.name;
}

function openBoard(state) {
  if (!state.missions) state.missions = { board: [], seq: 0, lastRefresh: -1 };
  if (!Array.isArray(state.missions.board)) state.missions.board = [];
  if (state.missions.seq == null) state.missions.seq = 0;
  return state.missions;
}

function rollRange(state, pair) {
  if (!pair) return 0;
  if (!Array.isArray(pair)) return pair;
  return nextInt(state, pair[0], pair[1]);
}

export function regionFlavorId(region) {
  return region?.id || "bethel";
}

export function pickMissionRegion(state, template) {
  const regions = state.regions || [];
  const keyed = Object.keys(template.flavor || {}).filter((k) => k !== "default");
  const named = keyed.map((id) => regions.find((r) => r.id === id)).filter(Boolean);
  if (named.length && chance(state, 0.7)) return pick(state, named);
  return pick(state, regions) || regions[0];
}

export function refreshMissionBoard(state) {
  const box = openBoard(state);
  box.board = box.board.filter((j) => !j.done && state.week - (j.week || 0) < MISSION_TTL);
  const need = Math.max(0, MISSION_CAP - box.board.length);
  const used = new Set(box.board.map((j) => j.templateId));
  const pool = MISSION_TEMPLATES.filter((t) => !used.has(t.id));
  const pickFrom = pool.length ? pool : MISSION_TEMPLATES;
  for (let i = 0; i < need; i++) {
    const t = pick(state, pickFrom);
    if (!t) break;
    const region = pickMissionRegion(state, t);
    box.seq += 1;
    box.board.push({
      id: `job_${box.seq}`,
      templateId: t.id,
      name: t.name,
      regionId: region?.id || "bethel",
      week: state.week,
      ap: t.ap || 1,
      done: false,
    });
  }
  box.lastRefresh = state.week;
  return box.board;
}

export function missionById(state, jobId) {
  return openBoard(state).board.find((j) => j.id === jobId);
}

export function openMissions(state) {
  return openBoard(state).board.filter((j) => !j.done);
}

function grantItem(state, kind) {
  state.stash = state.stash || [];
  const names = {
    depot_scrip: "Depot scrip",
    analog_pad: "Analog one-time pad",
    ranch_token: "Ranch relay token",
  };
  state.stash.push({ id: kind, name: names[kind] || kind, week: state.week });
  return names[kind] || kind;
}

export function resolveMission(state, job, actor, helpers) {
  const t = templateOf(job.templateId);
  const region = helpers.regionOf(state, job.regionId);
  const stats = helpers.actingStats(state, actor);
  const stat = stats[t.stat] || 50;
  const roll = nextInt(state, 1, 100) + Math.floor(stat / 5);
  const dc = t.dc + (state.difficulty === "hard" ? 6 : state.difficulty === "easy" ? -4 : 0);
  const ok = roll >= dc;
  const bits = [];
  if (ok) {
    const g = rollRange(state, t.rewards?.gold);
    const f = rollRange(state, t.rewards?.food);
    if (g) {
      state.gold += g;
      bits.push(`+${g} gold`);
    }
    if (f) {
      state.food += f;
      bits.push(`+${f} food`);
    }
    if (t.rewards?.intel && region) {
      region.intel = Math.min(3, (region.intel || 0) + t.rewards.intel);
      bits.push("intel");
    }
    if (t.rewards?.order && region) {
      region.order = Math.min(100, (region.order || 0) + t.rewards.order);
      bits.push("order");
    }
    if (t.rewards?.walls && region) {
      region.walls = Math.max(0, (region.walls || 0) + t.rewards.walls);
      bits.push("walls slip");
    }
    if (t.rewards?.garrison && region) {
      region.garrison = Math.max(0, (region.garrison || 0) + t.rewards.garrison);
      bits.push("garrison slip");
    }
    if (t.rewards?.fame) {
      state.fame += t.rewards.fame;
      actor.fame = (actor.fame || 0) + t.rewards.fame;
      bits.push("fame");
    }
    if (t.rewards?.research) {
      state.research = state.research || { points: 0, unlocked: [] };
      state.research.points += t.rewards.research;
      bits.push(`+${t.rewards.research} salvage`);
    }
    if (t.rewards?.loyalty) {
      actor.loyalty = Math.min(100, (actor.loyalty || 50) + t.rewards.loyalty);
      bits.push("loyalty");
    }
    if (t.rewards?.bond) helpers.addBond(state, actor.id, t.rewards.bond);
    if (t.rewards?.item) bits.push(grantItem(state, t.rewards.item));
    if (t.rescue) {
      const rescued = helpers.rescueOfficer(state, job.regionId, actor);
      if (rescued) bits.push(`${rescued.name} listed / warmer`);
    }
    if (t.rewards?.rumor) helpers.noteAnyLegendRumor(state);
  } else if (t.riskGold) {
    const loss = Math.min(state.gold, t.riskGold);
    state.gold -= loss;
    if (loss) bits.push(`-${loss} gold`);
  }
  job.done = true;
  const copy = missionCopy(job, job.regionId);
  const line = `${actor.name} ${ok ? "clears" : "fails"} ${t.name} in ${region?.short || job.regionId} (${roll} vs ${dc})${bits.length ? `: ${bits.join(", ")}` : ""}.`;
  return {
    ok: true,
    success: ok,
    message: `${ok ? t.ok : t.fail} ${line}`,
    sceneId: t.id,
    regionId: job.regionId,
    flavor: copy,
    report: line,
  };
}

export function pickStandingJob(state, off) {
  const open = openMissions(state);
  if (!open.length) return null;
  const here = open.filter((j) => j.regionId === off.region);
  return here[0] || open[0];
}

export function seedDemoMissions(state) {
  const box = openBoard(state);
  const picks = [
    ["scout_road", "kenai"],
    ["escort_convoy", "bethel"],
    ["radio_run", "yukon_road"],
    ["rescue_officer", "bethel"],
    ["porch_challenge", "bethel"],
    ["ranch_relay", "kenai"],
    ["raid_depot", "nome"],
    ["cache_pull", "bethel"],
    ["ice_listen", "bering_strait"],
  ];
  box.board = picks.slice(0, MISSION_CAP).map((pair, i) => {
    const [templateId, regionId] = pair;
    const t = templateOf(templateId);
    return {
      id: `job_demo_${i + 1}`,
      templateId,
      name: t.name,
      regionId,
      week: state.week,
      ap: 1,
      done: false,
    };
  });
  box.seq = MISSION_CAP;
  box.lastRefresh = state.week;
  return box.board;
}
