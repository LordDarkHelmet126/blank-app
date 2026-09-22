/**
 * Yard duel — 1v1 officer challenge. Strike / Guard / Special with a
 * timing window. Default clock is ~99s (11 exchanges × 9s), not a
 * fighting-game combo engine. Original IP only.
 */

export const DUEL_MOVES = [
  { id: "strike", label: "Strike", beats: "special", verb: "cuts through" },
  { id: "guard", label: "Guard", beats: "strike", verb: "turns aside" },
  { id: "special", label: "Special", beats: "guard", verb: "breaks" },
];

/** Wall-clock target when both fighters stay up. */
export const DUEL_CLOCK_S = 99;
/** Pick window per exchange (ms). */
export const DUEL_PICK_MS = 7500;
/** Result flash per exchange (ms). */
export const DUEL_RESOLVE_MS = 1500;
/** 11 × (7.5s + 1.5s) = 99s. */
export const DUEL_MAX_EXCHANGES = 11;
/** Foe WAR − you WAR at or above this is David vs Goliath. */
export const GOLIATH_WAR_GAP = 18;

const MOVE_IDS = DUEL_MOVES.map((m) => m.id);

export function moveOf(id) {
  return DUEL_MOVES.find((m) => m.id === id) || null;
}

export function beats(a, b) {
  const m = moveOf(a);
  return !!(m && b && m.beats === b);
}

export function officerPower(stats) {
  const war = Number(stats?.war) || 50;
  const intel = Number(stats?.int) || 50;
  return war + Math.floor(intel / 8);
}

export function isUnderdog(youStats, foeStats) {
  const gap = (foeStats?.war || 50) - (youStats?.war || 50);
  const pGap = officerPower(foeStats) - officerPower(youStats);
  return gap >= GOLIATH_WAR_GAP || pGap >= 16;
}

export function duelHp(stats) {
  return 40 + Math.floor((stats?.war || 50) / 5);
}

export function greenWindow(underdog) {
  return underdog ? [0.32, 0.7] : [0.46, 0.62];
}

export function inGreen(timing, green) {
  const t = Number(timing);
  if (!Number.isFinite(t)) return false;
  return t >= green[0] && t <= green[1];
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function snapshot(off, stats) {
  return {
    id: off.id,
    name: off.name,
    title: off.title || "Officer",
    age: off.age ?? "?",
    personality: off.personality || "loyalist",
    portrait: off.portrait || "",
    faction: off.faction || null,
    legend: !!off.legend,
    elite: !!off.elite,
    stats: {
      war: stats.war,
      int: stats.int,
      pol: stats.pol,
      chr: stats.chr,
    },
  };
}

export function createDuel({ you, youStats, foe, foeStats, jobId = null, kind = "challenge" }) {
  const underdog = isUnderdog(youStats, foeStats);
  const youMax = duelHp(youStats);
  const foeMax = duelHp(foeStats);
  const green = greenWindow(underdog);
  return {
    you: snapshot(you, youStats),
    foe: snapshot(foe, foeStats),
    youHp: youMax,
    foeHp: foeMax,
    youMax,
    foeMax,
    exchange: 1,
    maxExchanges: DUEL_MAX_EXCHANGES,
    clockS: DUEL_CLOCK_S,
    pickMs: DUEL_PICK_MS,
    resolveMs: DUEL_RESOLVE_MS,
    beat: "pick",
    green,
    underdog,
    jobId,
    kind,
    log: [
      underdog
        ? `UNDERDOG — ${you.name} (WAR ${youStats.war}) vs ${foe.name} (WAR ${foeStats.war}). Wider green window.`
        : `${you.name} faces ${foe.name} in the yard. Strike beats Special, Special beats Guard, Guard beats Strike.`,
    ],
    last: null,
    result: null,
    exchangesDone: 0,
  };
}

export function aiMove(duel, roll01) {
  const r = Number.isFinite(roll01) ? roll01 : 0.5;
  const p = duel.foe?.personality || "loyalist";
  let strike = 0.34;
  let guard = 0.33;
  let special = 0.33;
  if (p === "aggressive") {
    strike = 0.52;
    special = 0.28;
    guard = 0.2;
  } else if (p === "cautious") {
    guard = 0.5;
    strike = 0.25;
    special = 0.25;
  } else if (p === "schemer") {
    special = 0.46;
    guard = 0.28;
    strike = 0.26;
  } else if (p === "recluse") {
    special = 0.4;
    guard = 0.38;
    strike = 0.22;
  } else if (p === "loyalist") {
    guard = 0.38;
    strike = 0.36;
    special = 0.26;
  }
  if (r < strike) return "strike";
  if (r < strike + guard) return "guard";
  return "special";
}

function hitFor(attackerStats, defenderStats, move, timed, underdogSide) {
  const diff = Math.floor(((attackerStats.war || 50) - (defenderStats.war || 50)) / 8);
  let dmg = 5 + diff;
  if (move === "special") dmg += 2;
  if (move === "guard") dmg -= 1;
  if (timed) dmg += underdogSide ? 6 : 4;
  if (underdogSide) dmg += 1;
  return clamp(dmg, 2, 16);
}

/**
 * Resolve one exchange. `timing` is 0–1 along the pick bar.
 * Missing a move (`youMove` falsy) means you eat the hit.
 */
export function resolveExchange(duel, youMove, timing, foeMove) {
  if (!duel || duel.result) return duel;
  const youOk = MOVE_IDS.includes(youMove);
  const foeOk = MOVE_IDS.includes(foeMove);
  const timed = youOk && inGreen(timing, duel.green);
  const youStats = duel.you.stats;
  const foeStats = duel.foe.stats;
  let youDmg = 0;
  let foeDmg = 0;
  let line;

  if (!youOk && !foeOk) {
    line = "Neither commits. Dust.";
  } else if (!youOk) {
    youDmg = hitFor(foeStats, youStats, foeMove, false, false);
    line = `${duel.you.name} misses the window. ${duel.foe.name}'s ${foeMove} lands (${youDmg}).`;
  } else if (!foeOk) {
    foeDmg = hitFor(youStats, foeStats, youMove, timed, duel.underdog);
    line = `${duel.you.name} ${moveOf(youMove).verb} an empty yard (${foeDmg}${timed ? ", timed" : ""}).`;
  } else if (youMove === foeMove) {
    const chip = timed ? 2 : 4;
    youDmg = chip;
    foeDmg = chip;
    line = `Clash — both ${youMove}. Chip ${chip}.`;
  } else if (beats(youMove, foeMove)) {
    foeDmg = hitFor(youStats, foeStats, youMove, timed, duel.underdog);
    line = `${duel.you.name} ${moveOf(youMove).verb} ${foeMove} (${foeDmg}${timed ? ", green window" : ""}).`;
  } else {
    youDmg = hitFor(foeStats, youStats, foeMove, false, false);
    if (timed) youDmg = Math.max(1, youDmg - (duel.underdog ? 4 : 2));
    line = `${duel.foe.name} ${moveOf(foeMove).verb} ${youMove} (${youDmg}${timed ? ", you rolled with it" : ""}).`;
  }

  duel.youHp = Math.max(0, duel.youHp - youDmg);
  duel.foeHp = Math.max(0, duel.foeHp - foeDmg);
  duel.last = {
    youMove: youOk ? youMove : null,
    foeMove: foeOk ? foeMove : null,
    timing,
    timed,
    youDmg,
    foeDmg,
    line,
  };
  duel.log.push(`Ex ${duel.exchange}: ${line}`);
  duel.exchangesDone += 1;
  duel.beat = "resolve";

  if (duel.youHp <= 0 && duel.foeHp <= 0) {
    duel.result = "draw";
    duel.log.push("Both down. Draw.");
  } else if (duel.youHp <= 0) {
    duel.result = "foe";
    duel.log.push(`${duel.foe.name} holds the yard.`);
  } else if (duel.foeHp <= 0) {
    duel.result = "you";
    duel.log.push(`${duel.you.name} holds the yard.`);
  } else if (duel.exchangesDone >= duel.maxExchanges) {
    finishOnClock(duel);
  } else {
    duel.exchange += 1;
  }
  return duel;
}

export function finishOnClock(duel) {
  if (duel.result) return duel;
  if (duel.youHp > duel.foeHp) {
    duel.result = "you";
    duel.log.push(`Clock. ${duel.you.name} still standing (${duel.youHp}–${duel.foeHp}).`);
  } else if (duel.foeHp > duel.youHp) {
    duel.result = "foe";
    duel.log.push(`Clock. ${duel.foe.name} still standing (${duel.foeHp}–${duel.youHp}).`);
  } else {
    duel.result = "draw";
    duel.log.push(`Clock. Even dust (${duel.youHp}). Draw.`);
  }
  duel.beat = "done";
  return duel;
}

export function advanceBeat(duel) {
  if (!duel || duel.result) {
    if (duel) duel.beat = "done";
    return duel;
  }
  duel.beat = "pick";
  duel.last = duel.last;
  return duel;
}

export function autoResolveDuel(duel, rng) {
  const roll = typeof rng === "function" ? rng : () => 0.5;
  let guard = 0;
  while (!duel.result && guard++ < 24) {
    const youMove = aiMove({ ...duel, foe: { ...duel.you, personality: duel.you.personality } }, roll());
    const foeMove = aiMove(duel, roll());
    const timing = duel.underdog ? 0.5 : 0.35 + roll() * 0.4;
    resolveExchange(duel, youMove, timing, foeMove);
    if (!duel.result) advanceBeat(duel);
  }
  if (!duel.result) finishOnClock(duel);
  duel.beat = "done";
  return duel;
}

export function duelSecondsPerExchange() {
  return (DUEL_PICK_MS + DUEL_RESOLVE_MS) / 1000;
}

export function expectedDuelSeconds() {
  return DUEL_MAX_EXCHANGES * duelSecondsPerExchange();
}
