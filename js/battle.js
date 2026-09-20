import { nextInt, nextFloat, chance } from "./rng.js";

const COLS = 8;
const ROWS = 6;

const UNIT_STATS = {
  militia: { hp: 8, atk: 3, def: 2, move: 2, label: "Militia" },
  regular: { hp: 10, atk: 4, def: 3, move: 2, label: "Regulars" },
  technical: { hp: 12, atk: 6, def: 3, move: 3, label: "Technical" },
};

function terrainForRegion(region, season, x, y) {
  const bias = region.terrainBias;
  if (season.weather === "snow" && (y === 0 || y === ROWS - 1)) return "ice";
  if (bias === "urban") return x === 3 || x === 4 ? "urban" : y % 2 === 0 ? "plains" : "urban";
  if (bias === "forest") return (x + y) % 3 === 0 ? "plains" : "forest";
  if (bias === "ice") return y < 2 || (x + y) % 2 === 0 ? "ice" : "hills";
  if (bias === "coast") return y === ROWS - 1 || x === 0 ? "ice" : "hills";
  if (bias === "tundra") return (x + y) % 4 === 0 ? "hills" : "plains";
  return (x + y) % 5 === 0 ? "hills" : "plains";
}

function terrainDef(t) {
  if (t === "forest") return 1;
  if (t === "hills") return 2;
  if (t === "urban") return 2;
  if (t === "ice") return -1;
  return 0;
}

function countUnits(troops, unlocked) {
  const n = Math.max(1, Math.min(6, Math.round(troops / 18)));
  const units = [];
  for (let i = 0; i < n; i++) {
    let type = troops >= 40 ? "regular" : "militia";
    if (unlocked.includes("technical") && i === n - 1 && troops >= 50) type = "technical";
    units.push(type);
  }
  return units;
}

function place(types, side, atkBonus) {
  const units = [];
  types.forEach((type, i) => {
    const st = UNIT_STATS[type];
    const x = side === "atk" ? 0 + (i % 2) : COLS - 1 - (i % 2);
    const y = 1 + Math.floor(i / 2);
    units.push({
      id: `${side}${i}`,
      side,
      type,
      label: st.label,
      x,
      y: Math.min(ROWS - 1, y),
      hp: st.hp,
      maxHp: st.hp,
      atk: st.atk + atkBonus,
      def: st.def,
      move: st.move,
      moved: false,
      acted: false,
    });
  });
  return units;
}

export function createBattle(state, content, fromId, toId, commit, techAtk) {
  const dest = state.regions.find((r) => r.id === toId);
  const season = state._season;
  const grid = [];
  for (let y = 0; y < ROWS; y++) {
    const row = [];
    for (let x = 0; x < COLS; x++) row.push(terrainForRegion(dest, season, x, y));
    grid.push(row);
  }
  const unlocked = state.research.unlocked;
  const defTroops = Math.max(6, dest.garrison);
  const atkTypes = countUnits(commit, unlocked);
  const defTypes = countUnits(defTroops, unlocked);
  const units = [
    ...place(atkTypes, "atk", techAtk),
    ...place(defTypes, "def", dest.owner === "pof" || dest.owner === "banner" ? 1 : 0),
  ];
  const morale = {
    atk: 55 + Math.min(20, Math.floor(commit / 8)),
    def: 50 + Math.min(25, dest.walls),
  };
  const weather = season.weather;
  if (weather === "snow") {
    morale.atk -= 6;
    morale.def += 2;
  }
  return {
    fromId,
    toId,
    commit,
    round: 1,
    maxRounds: 8,
    turn: "atk",
    weather,
    grid,
    units,
    morale,
    log: [`${weatherLabel(weather)} over ${dest.name}.`],
    ployUsed: false,
    selected: null,
    result: null,
    cols: COLS,
    rows: ROWS,
  };
}

function weatherLabel(w) {
  if (w === "snow") return "Driving snow";
  if (w === "fog") return "Ice fog";
  if (w === "wind") return "Katabatic wind";
  return "Clear cold";
}

function unitAt(battle, x, y) {
  return battle.units.find((u) => u.hp > 0 && u.x === x && u.y === y);
}

function dist(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function resetActs(battle, side) {
  battle.units.forEach((u) => {
    if (u.side === side) {
      u.moved = false;
      u.acted = false;
    }
  });
}

function living(battle, side) {
  return battle.units.filter((u) => u.side === side && u.hp > 0);
}

function checkEnd(battle) {
  const atk = living(battle, "atk");
  const def = living(battle, "def");
  if (!atk.length) {
    battle.result = "def";
    battle.log.push("Attack collapses. The field is lost.");
    return true;
  }
  if (!def.length) {
    battle.result = "atk";
    battle.log.push("Defense breaks. The ground is yours.");
    return true;
  }
  if (battle.morale.atk <= 0) {
    battle.result = "def";
    battle.log.push("Attacker morale shatters. Withdrawal.");
    return true;
  }
  if (battle.morale.def <= 0) {
    battle.result = "atk";
    battle.log.push("Defenders throw down. The region yields.");
    return true;
  }
  return false;
}

function strike(state, battle, attacker, defender) {
  const terrain = battle.grid[defender.y][defender.x];
  const tdef = terrainDef(terrain);
  const snow = battle.weather === "snow" && attacker.type !== "technical" ? -1 : 0;
  const roll = nextInt(state, 1, 6);
  const dmg = Math.max(1, attacker.atk + roll + snow - defender.def - tdef);
  defender.hp -= dmg;
  battle.log.push(`${attacker.label} hit ${defender.label} for ${dmg} (${terrain}).`);
  if (defender.hp <= 0) {
    defender.hp = 0;
    battle.morale[defender.side] -= 8;
    battle.morale[attacker.side] += 3;
    battle.log.push(`${defender.label} is broken.`);
  }
}

export function battleSelect(battle, id) {
  const u = battle.units.find((x) => x.id === id && x.hp > 0);
  if (!u || u.side !== "atk" || battle.turn !== "atk") return { ok: false, message: "Not your unit." };
  battle.selected = id;
  return { ok: true };
}

export function battleClickCell(state, battle, x, y) {
  if (battle.result || battle.turn !== "atk") return { ok: false, message: "Wait your turn." };
  const sel = battle.units.find((u) => u.id === battle.selected && u.hp > 0);
  if (!sel) return { ok: false, message: "Select a unit." };
  if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return { ok: false, message: "Off map." };
  const occ = unitAt(battle, x, y);
  if (occ) {
    if (occ.side === sel.side) return { ok: false, message: "Friendly hex." };
    if (sel.acted) return { ok: false, message: "Already acted." };
    if (dist(sel, occ) !== 1) return { ok: false, message: "Must be adjacent to fire." };
    strike(state, battle, sel, occ);
    sel.acted = true;
    sel.moved = true;
    battle.selected = sel.hp > 0 ? sel.id : null;
    checkEnd(battle);
    return { ok: true };
  }
  if (sel.moved || sel.acted) return { ok: false, message: "Already moved." };
  const d = Math.abs(sel.x - x) + Math.abs(sel.y - y);
  if (d === 0 || d > sel.move) return { ok: false, message: "Out of step range." };
  sel.x = x;
  sel.y = y;
  sel.moved = true;
  return { ok: true };
}

export function battlePloy(state, battle, kind, intStat) {
  if (battle.ployUsed) return { ok: false, message: "Ploy already spent." };
  if (battle.turn !== "atk" || battle.result) return { ok: false, message: "Not now." };
  battle.ployUsed = true;
  if (kind === "rally") {
    const gain = 6 + Math.floor(intStat / 20);
    battle.morale.atk += gain;
    battle.log.push(`Rally: morale +${gain}.`);
  } else if (kind === "ambush") {
    const foes = living(battle, "def");
    const t = foes[nextInt(state, 0, foes.length - 1)];
    const dmg = 2 + Math.floor(intStat / 25);
    t.hp -= dmg;
    battle.log.push(`Ambush markers hit ${t.label} for ${dmg}.`);
    if (t.hp <= 0) {
      t.hp = 0;
      battle.morale.def -= 8;
    }
  } else {
    battle.morale.def -= 5;
    battle.log.push("Rumor ploy: defender morale -5.");
  }
  checkEnd(battle);
  return { ok: true };
}

function aiSide(state, battle, personality) {
  const mine = living(battle, "def");
  const foes = living(battle, "atk");
  mine.forEach((u) => {
    if (battle.result) return;
    let target = null;
    let best = 99;
    foes.forEach((f) => {
      const d = dist(u, f);
      if (d < best) {
        best = d;
        target = f;
      }
    });
    if (!target) return;
    if (best === 1) {
      strike(state, battle, u, target);
      return;
    }
    const aggressive = personality === "aggressive" || personality === "ambitious";
    const cautious = personality === "cautious" || personality === "recluse";
    if (cautious && u.x >= 5) return;
    const step = aggressive || best <= 3 ? 1 : 0;
    if (!step) return;
    const dx = Math.sign(target.x - u.x);
    const dy = Math.sign(target.y - u.y);
    let nx = u.x;
    let ny = u.y;
    if (dx && !unitAt(battle, u.x + dx, u.y) && u.x + dx >= 0 && u.x + dx < COLS) nx = u.x + dx;
    else if (dy && !unitAt(battle, u.x, u.y + dy) && u.y + dy >= 0 && u.y + dy < ROWS) ny = u.y + dy;
    u.x = nx;
    u.y = ny;
    const after = dist(u, target);
    if (after === 1) strike(state, battle, u, target);
  });
}

export function endTacticalTurn(state, battle, defenderPersonality) {
  if (battle.result) return { ok: true };
  if (battle.turn !== "atk") return { ok: false, message: "Not your impulse." };
  battle.turn = "def";
  battle.log.push("Defenders answer.");
  aiSide(state, battle, defenderPersonality || "loyalist");
  if (checkEnd(battle)) return { ok: true };
  battle.round += 1;
  if (battle.round > battle.maxRounds) {
    const ah = living(battle, "atk").reduce((s, u) => s + u.hp, 0);
    const dh = living(battle, "def").reduce((s, u) => s + u.hp, 0);
    battle.result = ah >= dh ? "atk" : "def";
    battle.log.push(battle.result === "atk" ? "Nightfall: attackers hold the field." : "Nightfall: attack stalls.");
    return { ok: true };
  }
  battle.turn = "atk";
  resetActs(battle, "atk");
  battle.log.push(`Impulse ${battle.round}.`);
  return { ok: true };
}

export function autoResolveBattle(state, battle, defenderPersonality) {
  let guard = 0;
  while (!battle.result && guard++ < 80) {
    const mine = living(battle, "atk");
    const foes = living(battle, "def");
    mine.forEach((u) => {
      if (battle.result) return;
      let target = null;
      let best = 99;
      foes.filter((f) => f.hp > 0).forEach((f) => {
        const d = dist(u, f);
        if (d < best) {
          best = d;
          target = f;
        }
      });
      if (!target) return;
      if (best === 1) strike(state, battle, u, target);
      else {
        const dx = Math.sign(target.x - u.x);
        const dy = Math.sign(target.y - u.y);
        if (dx && !unitAt(battle, u.x + dx, u.y)) u.x += dx;
        else if (dy && !unitAt(battle, u.x, u.y + dy)) u.y += dy;
        if (dist(u, target) === 1) strike(state, battle, u, target);
      }
    });
    if (checkEnd(battle)) break;
    endTacticalTurn(state, battle, defenderPersonality);
  }
  if (!battle.result) {
    battle.result = "def";
    battle.log.push("Stalemate — attack called off.");
  }
  return battle.result;
}

export function remainingRatio(battle, side) {
  const all = battle.units.filter((u) => u.side === side);
  const max = all.reduce((s, u) => s + u.maxHp, 0) || 1;
  const now = all.reduce((s, u) => s + Math.max(0, u.hp), 0);
  return now / max;
}

export function terrainGlyph(t) {
  if (t === "forest") return "pine";
  if (t === "hills") return "hill";
  if (t === "urban") return "block";
  if (t === "ice") return "ice";
  return "flat";
}

export { COLS, ROWS, nextFloat, chance };
