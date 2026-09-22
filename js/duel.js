/**
 * Yard duel — 1v1 officer challenge. Strike / Guard / Special with a
 * timing window. Default clock is ~99s (11 exchanges × 9s).
 * Arenas, outfits, and named fighting styles are original IP only.
 */

export const DUEL_MOVES = [
  { id: "strike", label: "Strike", beats: "special", verb: "cuts through" },
  { id: "guard", label: "Guard", beats: "strike", verb: "turns aside" },
  { id: "special", label: "Special", beats: "guard", verb: "breaks" },
];

/** Wall-clock target when both fighters stay up. */
export const DUEL_CLOCK_S = 99;
export const DUEL_PICK_MS = 7500;
export const DUEL_RESOLVE_MS = 1500;
export const DUEL_MAX_EXCHANGES = 11;
export const GOLIATH_WAR_GAP = 18;

const MOVE_IDS = DUEL_MOVES.map((m) => m.id);

export const DUEL_STYLES = [
  {
    id: "brawler",
    label: "Brawler",
    flavor: "Closes the gap. Special · Haymaker.",
    special: { label: "Haymaker", verb: "haymakers", fx: "#f03030", effect: "extra" },
    bias: { strike: 0.48, guard: 0.18, special: 0.34 },
    strikeBonus: 2,
  },
  {
    id: "marksman",
    label: "Marksman",
    flavor: "Keeps a lane. Special · Aimed Shot chips Guard.",
    special: { label: "Aimed Shot", verb: "aims through", fx: "#f8d800", effect: "pierce" },
    bias: { strike: 0.28, guard: 0.28, special: 0.44 },
  },
  {
    id: "grappler",
    label: "Grappler",
    flavor: "Hands on cloth. Special · Throw stuns the next beat.",
    special: { label: "Throw", verb: "throws", fx: "#c8a038", effect: "stun" },
    bias: { strike: 0.3, guard: 0.4, special: 0.3 },
  },
  {
    id: "cavalry",
    label: "Cavalry",
    flavor: "Horse-scout spur. Special · Spur Charge after a win.",
    special: { label: "Spur Charge", verb: "charges", fx: "#886038", effect: "charge" },
    bias: { strike: 0.42, guard: 0.22, special: 0.36 },
    strikeBonus: 1,
  },
  {
    id: "guerrilla",
    label: "Guerrilla",
    flavor: "Dust and a feint. Special · Dust Feint steals a little HP.",
    special: { label: "Dust Feint", verb: "feints through", fx: "#88a040", effect: "heal" },
    bias: { strike: 0.32, guard: 0.36, special: 0.32 },
  },
  {
    id: "drill",
    label: "Drill-Sergeant",
    flavor: "Dress-right. Special · Dress-Right mends on Guard.",
    special: { label: "Dress-Right", verb: "dresses the line", fx: "#f8d800", effect: "rally" },
    bias: { strike: 0.28, guard: 0.48, special: 0.24 },
    guardBonus: 2,
  },
  {
    id: "trapper",
    label: "Trapper",
    flavor: "Snare on the porch. Special · Snare Line.",
    special: { label: "Snare Line", verb: "snares", fx: "#80d0f8", effect: "snare" },
    bias: { strike: 0.22, guard: 0.4, special: 0.38 },
  },
  {
    id: "signals",
    label: "Signals",
    flavor: "Analog burst. Special · Static Burst (underdog finisher).",
    special: { label: "Static Burst", verb: "bursts static", fx: "#80c0f8", effect: "finisher" },
    bias: { strike: 0.22, guard: 0.3, special: 0.48 },
  },
];

export const DUEL_OUTFITS = {
  scout: { id: "scout", label: "Scout coat", coat: "#507040", hat: "#f8d800", pants: "#3a2010", accent: "#c8a038" },
  guntruck: { id: "guntruck", label: "Gun-truck crew", coat: "#3a4820", hat: "#686860", pants: "#201810", accent: "#f8d800", helmet: true },
  apc: { id: "apc", label: "APC crew", coat: "#686860", hat: "#404038", pants: "#201810", accent: "#88b0c8", helmet: true },
  radio: { id: "radio", label: "Radio tech", coat: "#304878", hat: "#101050", pants: "#000018", accent: "#80c0f8", headset: true },
  ranch: { id: "ranch", label: "Ranch militia", coat: "#886038", hat: "#c8a038", pants: "#3a2010", accent: "#f8d800", brim: true },
  dress: { id: "dress", label: "Officer dress", coat: "#101050", hat: "#f8d800", pants: "#000018", accent: "#f8d800" },
  parka: { id: "parka", label: "Winter parka", coat: "#d0d8e0", hat: "#a0b0c0", pants: "#3a4858", accent: "#f8d800" },
  crew: { id: "crew", label: "Fatigues", coat: "#385028", hat: "#507040", pants: "#201810", accent: "#c8a038" },
};

export const DUEL_ARENAS = {
  porch: { id: "porch", label: "Ranch porch" },
  roadhouse: { id: "roadhouse", label: "Snowy roadhouse" },
  foothills: { id: "foothills", label: "Colorado foothills" },
  airstrip: { id: "airstrip", label: "Gravel airstrip" },
  iceford: { id: "iceford", label: "Ice ford" },
  gaslot: { id: "gaslot", label: "Gas-station lot" },
  pineridge: { id: "pineridge", label: "Pine ridge" },
  radiotower: { id: "radiotower", label: "Night radio tower" },
};

const REGION_ARENA = {
  bethel: "porch",
  kenai: "foothills",
  arctic_slope: "roadhouse",
  bering_strait: "iceford",
  yukon_road: "radiotower",
  nome: "airstrip",
  fairbanks: "airstrip",
  anchorage: "gaslot",
  kodiak: "gaslot",
  juneau: "pineridge",
  klondike: "pineridge",
};

export function styleOf(id) {
  return DUEL_STYLES.find((s) => s.id === id) || DUEL_STYLES[0];
}

export function outfitOf(id) {
  return DUEL_OUTFITS[id] || DUEL_OUTFITS.crew;
}

export function arenaOf(id) {
  return DUEL_ARENAS[id] || DUEL_ARENAS.porch;
}

export function pickStyle(off, stats, overrideId) {
  if (overrideId && overrideId !== "cycle") {
    const hit = styleOf(overrideId);
    if (hit && hit.id === overrideId) return hit;
  }
  const title = `${off.title || ""} ${off.name || ""}`.toLowerCase();
  const pers = off.personality || "";
  const bg = off.background || "";
  if (/marshal|ranch|horse|cavalry/.test(title)) return styleOf("cavalry");
  if (/signal|radio|pilot/.test(title) || off.id === "silo") return styleOf("signals");
  if (/ghost|trap|guide/.test(title) || pers === "recluse") return styleOf("trapper");
  if (/armor|apc|nco/.test(title)) return styleOf("brawler");
  if (bg === "fighter" || pers === "aggressive") return styleOf("brawler");
  if (bg === "scout" || /scout/.test(title)) return styleOf("guerrilla");
  if (pers === "schemer" || pers === "cautious") return styleOf("marksman");
  if ((stats?.chr || 0) >= 70 && (stats?.war || 0) >= 55) return styleOf("grappler");
  if (pers === "loyalist" || /sergeant|volunteer/.test(title)) return styleOf("drill");
  if ((stats?.war || 0) >= 78) return styleOf("brawler");
  return styleOf("guerrilla");
}

export function pickOutfit(off, regionId, seasonId) {
  const title = `${off.title || ""} ${off.name || ""}`.toLowerCase();
  const pers = off.personality || "";
  const bg = off.background || "";
  const arctic = regionId === "arctic_slope" || regionId === "bering_strait" || seasonId === "winter";
  if (/signal|radio|pilot/.test(title) || off.id === "silo") return outfitOf("radio");
  if (/armor|apc/.test(title)) return outfitOf("apc");
  if (/marshal|ranch|horse/.test(title)) return outfitOf("ranch");
  if (/colonel|major|captain|warlord|commander/.test(title) || pers === "diplomat") return outfitOf("dress");
  if (/sergeant|nco|gun/.test(title) || pers === "aggressive") return outfitOf("guntruck");
  if (bg === "scout" || /scout|guide|ghost|trap/.test(title) || pers === "recluse") {
    return arctic ? outfitOf("parka") : outfitOf("scout");
  }
  if (arctic && (regionId === "arctic_slope" || regionId === "bering_strait")) return outfitOf("parka");
  if (bg === "fighter") return outfitOf("guntruck");
  if (bg === "organizer" || bg === "speaker") return outfitOf("dress");
  return outfitOf("crew");
}

export function pickArena(regionId, seasonId, jobTemplateId, overrideId) {
  if (overrideId && DUEL_ARENAS[overrideId]) return arenaOf(overrideId);
  if (jobTemplateId === "porch_challenge" && regionId === "kenai") return arenaOf("porch");
  if (jobTemplateId === "airstrip_mark") return arenaOf("airstrip");
  if (jobTemplateId === "ice_listen" || jobTemplateId === "ford_watch") return arenaOf("iceford");
  if (jobTemplateId === "radio_run" || jobTemplateId === "ranch_relay") return arenaOf("radiotower");
  let id = REGION_ARENA[regionId] || "porch";
  if (seasonId === "winter" && (id === "porch" || id === "foothills")) id = "roadhouse";
  if (seasonId === "summer" && id === "roadhouse") id = "pineridge";
  return arenaOf(id);
}

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

function packStyle(s) {
  return {
    id: s.id,
    label: s.label,
    flavor: s.flavor,
    specialLabel: s.special.label,
    specialVerb: s.special.verb,
    fx: s.special.fx,
    effect: s.special.effect,
    bias: s.bias,
    strikeBonus: s.strikeBonus || 0,
    guardBonus: s.guardBonus || 0,
  };
}

export function specialName(fighter) {
  return fighter?.style?.specialLabel || "Special";
}

function snapshot(off, stats, regionId, seasonId, styleOverride) {
  const style = packStyle(pickStyle(off, stats, styleOverride));
  const outfit = pickOutfit(off, regionId, seasonId);
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
    background: off.background || null,
    style,
    outfit,
    stats: {
      war: stats.war,
      int: stats.int,
      pol: stats.pol,
      chr: stats.chr,
    },
  };
}

export function createDuel({
  you,
  youStats,
  foe,
  foeStats,
  jobId = null,
  kind = "challenge",
  regionId = "bethel",
  seasonId = "winter",
  arenaId = null,
  youStyleId = null,
  foeStyleId = null,
  jobTemplateId = null,
}) {
  const underdog = isUnderdog(youStats, foeStats);
  const youMax = duelHp(youStats);
  const foeMax = duelHp(foeStats);
  const green = greenWindow(underdog);
  const arena = pickArena(regionId, seasonId, jobTemplateId, arenaId);
  const youSnap = snapshot(you, youStats, regionId, seasonId, youStyleId);
  const foeSnap = snapshot(foe, foeStats, regionId, seasonId, foeStyleId);
  if (youStyleId === "cycle") youSnap.style = packStyle(styleOf("brawler"));
  return {
    you: youSnap,
    foe: foeSnap,
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
    arena,
    regionId,
    seasonId,
    youStun: false,
    foeStun: false,
    youSnare: false,
    foeSnare: false,
    log: [
      `${arena.label} — ${youSnap.name} [${youSnap.style.label}] vs ${foeSnap.name} [${foeSnap.style.label}].`,
      underdog
        ? `UNDERDOG — ${you.name} (WAR ${youStats.war}) vs ${foe.name} (WAR ${foeStats.war}). Wider green window.`
        : `Strike beats Special, Special beats Guard, Guard beats Strike. Special · ${youSnap.style.specialLabel} / Special · ${foeSnap.style.specialLabel}.`,
    ],
    last: null,
    result: null,
    exchangesDone: 0,
  };
}

export function aiMove(duel, roll01, side = "foe") {
  const r = Number.isFinite(roll01) ? roll01 : 0.5;
  const fighter = side === "you" ? duel.you : duel.foe;
  const bias = fighter?.style?.bias || { strike: 0.34, guard: 0.33, special: 0.33 };
  const strike = bias.strike || 0.34;
  const guard = bias.guard || 0.33;
  if (r < strike) return "strike";
  if (r < strike + guard) return "guard";
  return "special";
}

function hitFor(attacker, defender, move, timed, underdogSide) {
  const diff = Math.floor(((attacker.stats.war || 50) - (defender.stats.war || 50)) / 8);
  let dmg = 5 + diff;
  if (move === "special") dmg += 2;
  if (move === "guard") dmg -= 1;
  if (move === "strike") dmg += attacker.style?.strikeBonus || 0;
  if (timed) dmg += underdogSide ? 6 : 4;
  if (underdogSide) dmg += 1;
  return clamp(dmg, 2, 16);
}

function moveLabel(fighter, move) {
  if (move === "special") return specialName(fighter);
  return move || "nothing";
}

/**
 * Resolve one exchange. `timing` is 0–1 along the pick bar.
 * Missing a move (`youMove` falsy) means you eat the hit.
 */
export function resolveExchange(duel, youMove, timing, foeMove) {
  if (!duel || duel.result) return duel;
  if (duel.youStun) {
    youMove = null;
    duel.youStun = false;
  }
  if (duel.foeStun) {
    foeMove = null;
    duel.foeStun = false;
  }
  const youOk = MOVE_IDS.includes(youMove);
  const foeOk = MOVE_IDS.includes(foeMove);
  const timed = youOk && inGreen(timing, duel.green);
  let youDmg = 0;
  let foeDmg = 0;
  let line;
  const you = duel.you;
  const foe = duel.foe;
  const youFx = youMove === "special" ? you.style?.fx : null;
  const foeFx = foeMove === "special" ? foe.style?.fx : null;

  if (duel.youSnare && youMove === "strike") {
    youDmg += 4;
    duel.youSnare = false;
  }
  if (duel.foeSnare && foeMove === "strike") {
    foeDmg += 4;
    duel.foeSnare = false;
  }

  if (!youOk && !foeOk) {
    line = "Neither commits. Dust.";
  } else if (!youOk) {
    youDmg += hitFor(foe, you, foeMove, false, false);
    line = `${you.name} misses the window. ${foe.name}'s ${moveLabel(foe, foeMove)} lands (${youDmg}).`;
  } else if (!foeOk) {
    foeDmg += hitFor(you, foe, youMove, timed, duel.underdog);
    line = `${you.name} ${verbFor(you, youMove)} an empty yard (${foeDmg}${timed ? ", timed" : ""}).`;
  } else if (youMove === foeMove) {
    const chip = timed ? 2 : 4;
    youDmg += chip;
    foeDmg += chip;
    line = `Clash — ${moveLabel(you, youMove)} vs ${moveLabel(foe, foeMove)}. Chip ${chip}.`;
  } else if (beats(youMove, foeMove)) {
    foeDmg += hitFor(you, foe, youMove, timed, duel.underdog);
    line = `${you.name} ${verbFor(you, youMove)} ${moveLabel(foe, foeMove)} (${foeDmg}${timed ? ", green window" : ""}).`;
  } else {
    youDmg += hitFor(foe, you, foeMove, false, false);
    if (timed) youDmg = Math.max(1, youDmg - (duel.underdog ? 4 : 2));
    line = `${foe.name} ${verbFor(foe, foeMove)} ${moveLabel(you, youMove)} (${youDmg}${timed ? ", you rolled with it" : ""}).`;
  }

  const hooks = applyStyleHooks(duel, {
    youMove,
    foeMove,
    youOk,
    foeOk,
    timed,
    youDmg,
    foeDmg,
  });
  youDmg = hooks.youDmg;
  foeDmg = hooks.foeDmg;
  if (hooks.note) line += ` ${hooks.note}`;

  if (you.style?.guardBonus && youMove === "guard") youDmg = Math.max(0, youDmg - you.style.guardBonus);
  if (foe.style?.guardBonus && foeMove === "guard") foeDmg = Math.max(0, foeDmg - foe.style.guardBonus);

  duel.youHp = Math.max(0, Math.min(duel.youMax, duel.youHp - youDmg + (hooks.youHeal || 0)));
  duel.foeHp = Math.max(0, Math.min(duel.foeMax, duel.foeHp - foeDmg + (hooks.foeHeal || 0)));
  duel.last = {
    youMove: youOk ? youMove : null,
    foeMove: foeOk ? foeMove : null,
    timing,
    timed,
    youDmg,
    foeDmg,
    youHeal: hooks.youHeal || 0,
    foeHeal: hooks.foeHeal || 0,
    youFx,
    foeFx,
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
    duel.log.push(`${foe.name} holds the ${duel.arena?.label || "yard"}.`);
  } else if (duel.foeHp <= 0) {
    duel.result = "you";
    duel.log.push(`${you.name} holds the ${duel.arena?.label || "yard"}.`);
  } else if (duel.exchangesDone >= duel.maxExchanges) {
    finishOnClock(duel);
  } else {
    duel.exchange += 1;
  }
  return duel;
}

function verbFor(fighter, move) {
  if (move === "special") return fighter.style?.specialVerb || "breaks";
  return moveOf(move)?.verb || "hits";
}

function applyStyleHooks(duel, ctx) {
  let { youDmg, foeDmg } = ctx;
  let youHeal = 0;
  let foeHeal = 0;
  const notes = [];
  const youWin = ctx.youOk && ctx.foeOk && beats(ctx.youMove, ctx.foeMove);
  const foeWin = ctx.youOk && ctx.foeOk && beats(ctx.foeMove, ctx.youMove);

  const run = (side) => {
    const self = side === "you" ? duel.you : duel.foe;
    const move = side === "you" ? ctx.youMove : ctx.foeMove;
    const win = side === "you" ? youWin : foeWin;
    const timed = side === "you" ? ctx.timed : false;
    const effect = self.style?.effect;
    if (move !== "special") return;
    if (effect === "extra" && win) {
      if (side === "you") foeDmg += 4;
      else youDmg += 4;
      notes.push("Haymaker extra");
    }
    if (effect === "pierce") {
      if (win && (side === "you" ? ctx.foeMove : ctx.youMove) === "guard") {
        if (side === "you") foeDmg += 3;
        else youDmg += 3;
        notes.push("Aimed Shot through Guard");
      }
      if (!win && (side === "you" ? ctx.foeMove : ctx.youMove) === "strike") {
        if (side === "you") foeDmg += 3;
        else youDmg += 3;
        notes.push("shot still chips");
      }
    }
    if (effect === "stun" && win) {
      if (side === "you") duel.foeStun = true;
      else duel.youStun = true;
      notes.push("Throw — stunned next beat");
    }
    if (effect === "charge") {
      const lastHit = side === "you" ? duel.last?.foeDmg : duel.last?.youDmg;
      if (lastHit > 0) {
        if (side === "you") foeDmg += 3;
        else youDmg += 3;
        notes.push("Spur Charge");
      }
    }
    if (effect === "heal") {
      if (side === "you") youHeal += 5;
      else foeHeal += 5;
      notes.push("Dust Feint mends");
    }
    if (effect === "rally") {
      if (side === "you") {
        youHeal += 3;
        youDmg = Math.max(0, youDmg - 2);
      } else {
        foeHeal += 3;
        foeDmg = Math.max(0, foeDmg - 2);
      }
      notes.push("Dress-Right");
    }
    if (effect === "snare" && win) {
      if (side === "you") duel.foeSnare = true;
      else duel.youSnare = true;
      notes.push("Snare set");
    }
    if (effect === "finisher") {
      const bonus = duel.underdog && timed && win ? 8 : win ? 2 : 0;
      if (bonus) {
        if (side === "you") foeDmg += bonus;
        else youDmg += bonus;
        notes.push(bonus >= 8 ? "Static Burst finisher" : "Static Burst");
      }
    }
  };
  run("you");
  run("foe");
  return { youDmg, foeDmg, youHeal, foeHeal, note: notes[0] || "" };
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
  return duel;
}

export function autoResolveDuel(duel, rng) {
  const roll = typeof rng === "function" ? rng : () => 0.5;
  let guard = 0;
  while (!duel.result && guard++ < 24) {
    const youMove = aiMove(duel, roll(), "you");
    const foeMove = aiMove(duel, roll(), "foe");
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
