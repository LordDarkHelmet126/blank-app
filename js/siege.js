/**
 * Settlement siege — original 1985–89 resistance wording.
 * WORKS is wall strength. It is not folded into morale.
 * Field fights (including the M113 spawn) never attach this state.
 */

export const SIEGE_WORKS_LINE = 24;
export const RUSH_WORKS_MAX = 16;
export const RUSH_SUPPRESS_MIN = 36;
export const SIEGE_MAX_IMPULSES = 12;
export const SUPPRESS_DECAY = 8;

export const SIEGE_PLOYS = [
  { id: "cut", label: "Cut the berm", hint: "Drops WORKS" },
  { id: "rake", label: "Rake the parapet", hint: "Fills SUPPRESS" },
  { id: "rush", label: "Rush the gap", hint: "Takes the settlement" },
];

export function regionIsSiege(region) {
  if (!region) return false;
  return (region.walls || 0) >= SIEGE_WORKS_LINE || region.terrainBias === "urban";
}

export function cutBite(intStat) {
  return 10 + Math.floor((intStat || 40) / 20);
}

export function rakePin(intStat) {
  return 24 + Math.floor((intStat || 40) / 20);
}

export function createSiege(region, commit) {
  const works = Math.max(0, region?.walls || 0);
  const levy = Math.max(1, commit || 1);
  const garrison = Math.max(6, region?.garrison || 6);
  const pressure = Math.max(0, Math.min(100, region?.pressure || 0));
  const flavor = region?.flavor || "";
  const placeName = region?.name || "the settlement";
  const deskLine = region?.line || "";
  const around = deskLine ? `the ${deskLine}` : placeName;
  return {
    role: "atk",
    defender: "def",
    place: region?.short || placeName,
    works,
    worksMax: Math.max(works, 1),
    suppress: pressure,
    levy,
    levyMax: levy,
    garrison,
    garrison0: garrison,
    impulse: 1,
    maxImpulses: SIEGE_MAX_IMPULSES,
    closed: false,
    result: null,
    flavor,
    deskLine,
    log: [
      `Siege lines around ${around}. WORKS ${works}. You are the attacker. They hold the berm.${flavor ? ` ${flavor}` : ""}`,
    ],
  };
}

export function attachSiege(battle, region, force) {
  if (!battle) return battle;
  if (!region || (!force && !regionIsSiege(region))) {
    battle.siege = null;
    return battle;
  }
  battle.siege = createSiege(region, battle.commit);
  battle.log.push(battle.siege.log[0]);
  return battle;
}

export function siegeRecommend(siege) {
  if (!siege || siege.closed) return null;
  if (siege.works > RUSH_WORKS_MAX) return "cut";
  if (siege.suppress < RUSH_SUPPRESS_MIN) return "rake";
  return "rush";
}

export function siegeCoach(siege) {
  if (!siege) return "NEXT: No siege.";
  if (siege.result === "atk") {
    return siege.deskLine ? `TAKEN. ${siege.deskLine} is yours.` : "TAKEN. The settlement is yours.";
  }
  if (siege.result === "def" && siege.levy <= 0) {
    return siege.deskLine ? `LEVY SPENT. ${siege.deskLine} holds. The siege lifts.` : "LEVY SPENT. The siege lifts.";
  }
  if (siege.result === "def") {
    return siege.deskLine ? `WATCH RAN OUT. ${siege.deskLine} holds. The siege lifts.` : "WATCH RAN OUT. The siege lifts.";
  }
  const rec = siegeRecommend(siege);
  const where = siege.deskLine ? `${siege.deskLine}. ` : "";
  const scene = siege.flavor ? `${siege.flavor} ` : "";
  if (rec === "cut") return `NEXT: ${where}${scene}WORKS ${siege.works} still hold. Cut the berm. Do not rush.`;
  if (rec === "rake") return `NEXT: ${where}${scene}Berm is cut (WORKS ${siege.works}). Rake the parapet, then rush.`;
  return `NEXT: ${where}${scene}Gap is open and the parapet is quiet. Rush the gap.`;
}

function finishImpulse(siege) {
  if (siege.closed) return null;
  if (siege.levy <= 0) {
    siege.levy = 0;
    siege.result = "def";
    siege.closed = true;
    return "levy";
  }
  siege.suppress = Math.max(0, siege.suppress - SUPPRESS_DECAY);
  siege.impulse += 1;
  if (siege.impulse > siege.maxImpulses) {
    siege.result = "def";
    siege.closed = true;
    return "watch";
  }
  return null;
}

export function applySiegePloy(state, siege, kind, intStat) {
  void state;
  if (!siege) return { ok: false, message: "No siege." };
  if (siege.closed) return { ok: false, message: "Siege already closed." };
  const known = SIEGE_PLOYS.some((p) => p.id === kind);
  if (!known) return { ok: false, message: "Unknown siege ploy." };

  const int = intStat || 40;
  if (kind === "cut") {
    const bite = cutBite(int);
    siege.works = Math.max(0, siege.works - bite);
    const fire = siege.suppress >= 50 ? 1 : 4;
    siege.levy = Math.max(0, siege.levy - fire);
    const why = finishImpulse(siege);
    siege.log.push(
      why === "levy"
        ? `Cut the berm. WORKS ${siege.works}. Levy spent. The siege lifts.`
        : `Cut the berm. WORKS ${siege.works}. Return fire −${fire} levy. Defender holds the parapet.`
    );
    if (why === "watch") siege.log.push("Watch ran out. Relief is on the road. The siege lifts.");
  } else if (kind === "rake") {
    const pin = rakePin(int);
    siege.suppress = Math.min(100, siege.suppress + pin);
    siege.works = Math.max(0, siege.works - 2);
    const fire = siege.suppress >= 70 ? 0 : 2;
    siege.levy = Math.max(0, siege.levy - fire);
    const why = finishImpulse(siege);
    siege.log.push(
      why === "levy"
        ? `Rake the parapet. Levy spent. The siege lifts.`
        : `Rake the parapet. SUPPRESS ${siege.suppress}. Defender's guns dip, then creep back.`
    );
    if (why === "watch") siege.log.push("Watch ran out. Relief is on the road. The siege lifts.");
  } else {
    const open = siege.works <= RUSH_WORKS_MAX;
    const quiet = siege.suppress >= RUSH_SUPPRESS_MIN;
    if (open && quiet) {
      const loss = 6 + Math.floor(siege.works / 4);
      siege.levy = Math.max(1, siege.levy - loss);
      siege.garrison = Math.max(0, Math.floor(siege.garrison * 0.25));
      siege.result = "atk";
      siege.closed = true;
      siege.log.push(`Rush the gap. The settlement falls. Levy left ${siege.levy}. Defender yields.`);
    } else if (open && siege.works <= 6 && siege.levy > 12) {
      const loss = 10 + Math.floor((100 - siege.suppress) / 10);
      siege.levy = Math.max(1, siege.levy - loss);
      siege.garrison = Math.max(0, Math.floor(siege.garrison * 0.4));
      siege.result = "atk";
      siege.closed = true;
      siege.log.push(`Rush a dead berm under fire. The settlement falls. Levy left ${siege.levy}.`);
    } else {
      const loss = open ? 10 + Math.floor((100 - siege.suppress) / 8) : 14 + Math.floor(siege.works / 5);
      siege.levy = Math.max(0, siege.levy - loss);
      siege.suppress = Math.max(0, siege.suppress - 10);
      const why = finishImpulse(siege);
      if (siege.result === "atk") {
        /* closed above */
      } else if (why === "levy" || siege.levy <= 0) {
        siege.levy = 0;
        siege.result = "def";
        siege.closed = true;
        siege.log.push(`Rush bled the levy out. The siege lifts.`);
      } else if (why === "watch") {
        siege.log.push(`Rush fails. WORKS ${siege.works} still stand. Watch ran out. The siege lifts.`);
      } else {
        siege.log.push(
          open
            ? `Rush bounced. Parapet still live. Levy −${loss}. Defender refuses the gap.`
            : `Rush fails. WORKS ${siege.works} still stand. Levy −${loss}. Do not rush yet.`
        );
      }
    }
  }
  return { ok: true, coach: siegeCoach(siege), result: siege.result };
}

export function autoResolveSiege(state, battle, intStat = 50) {
  const siege = battle?.siege;
  if (!siege) return battle?.result || null;
  let guard = 0;
  while (!siege.closed && guard++ < siege.maxImpulses + 2) {
    const kind = siegeRecommend(siege) || "cut";
    applySiegePloy(state, siege, kind, intStat);
  }
  if (!siege.closed) {
    siege.result = "def";
    siege.closed = true;
    siege.log.push("Stalemate. The siege lifts.");
  }
  battle.result = siege.result;
  const last = siege.log[siege.log.length - 1];
  if (last) battle.log.push(last);
  return battle.result;
}

export function siegeCommand(state, battle, kind, intStat) {
  if (!battle?.siege || battle.siege.closed) return { ok: false, message: "No open siege." };
  const res = applySiegePloy(state, battle.siege, kind, intStat);
  const line = battle.siege.log[battle.siege.log.length - 1];
  if (line) battle.log.push(line);
  if (battle.siege.closed) battle.result = battle.siege.result;
  return res;
}
