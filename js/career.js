/** Officer career: status ladder, month cadence, orders from above, service record.
 * Original Northern Front terms. No licensed rank lists. */

export const STATUS_ORDER = ["free", "member", "leader", "opschief", "commander", "governor", "chair"];

const STATUS_INDEX = Object.fromEntries(STATUS_ORDER.map((id, i) => [id, i]));

export const STATUS_ALIAS = {
  free: "free",
  officer: "member",
  member: "member",
  prefect: "leader",
  leader: "leader",
  opschief: "opschief",
  warlord: "commander",
  commander: "commander",
  governor: "governor",
  national: "chair",
  chair: "chair",
};

const STATUS_LABEL = {
  free: "Free Volunteer",
  member: "Cell Member",
  leader: "Cell Leader",
  opschief: "Operations Chief",
  commander: "Front Commander",
  governor: "Provisional Governor",
  chair: "Chair of the Provisional Government",
};

const STATUS_SHORT = {
  free: "Volunteer",
  member: "Member",
  leader: "Leader",
  opschief: "Ops Chief",
  commander: "Commander",
  governor: "Governor",
  chair: "Chair",
};

/** Base AP per week before generals and difficulty. Placeholders from the career spec. */
export const STATUS_AP = {
  free: 3,
  member: 4,
  leader: 5,
  opschief: 5,
  commander: 6,
  governor: 7,
  chair: 8,
};

/** Grade 5 is the bottom of the ladder. Grade 1 is the top. */
export const GRADE_PAY = { 1: 36, 2: 24, 3: 16, 4: 10, 5: 6 };
export const GRADE_LEVY = { 1: 64, 2: 44, 3: 28, 4: 16, 5: 8 };
const DEEDS_FOR_GRADE = { 1: 64, 2: 40, 3: 22, 4: 8, 5: 0 };

export const COMMISSIONS = [
  { id: "squad", label: "Squad Lead", minFame: 0, tp: 1 },
  { id: "section", label: "Section Lead", minFame: 15, tp: 2 },
  { id: "company", label: "Company Captain", minFame: 30, tp: 2 },
  { id: "sector", label: "Sector Captain", minFame: 45, tp: 3 },
  { id: "battalion", label: "Battalion Chief", minFame: 60, tp: 3 },
  { id: "theater", label: "Theater Marshal", minFame: 80, tp: 4 },
];

const GRANT_CAP = {
  free: "squad",
  member: "squad",
  leader: "section",
  opschief: "company",
  commander: "sector",
  governor: "battalion",
  chair: "theater",
};

export const COMMAND_TABS = [
  { id: "personal", label: "Personal" },
  { id: "social", label: "Social" },
  { id: "trade", label: "Trade" },
  { id: "domestic", label: "Domestic" },
  { id: "military", label: "Military" },
  { id: "personnel", label: "People" },
  { id: "plot", label: "Plot" },
  { id: "command", label: "Command" },
];

const COOP_TASKS = new Set(["cultivate", "commerce", "safety", "fortify", "research", "drill"]);

/** min = lowest status that may use the row. max = highest (resign stops at Ops Chief). */
const ACTION_RULES = {
  raise_banner: { tab: "personal", min: "free" },
  hide: { tab: "personal", min: "free" },
  rest: { tab: "personal", min: "free" },
  seek_legend: { tab: "personal", min: "free" },
  enlist: { tab: "personal", min: "free" },
  resign: { tab: "personal", min: "member", max: "opschief", maxReason: "A Front Commander keeps the banner." },
  train: { tab: "personal", placeholder: true, reason: "Train waits on the skills pass." },
  patrol: { tab: "personal", placeholder: true, reason: "Patrol waits on the territory pass." },
  court: { tab: "social", min: "free" },
  note: { tab: "social", placeholder: true, reason: "Dead-drop notes wait on the social pass." },
  visit: { tab: "social", placeholder: true, reason: "Porch visits wait on the social pass." },
  donate: { tab: "trade", min: "free" },
  swap_meet: { tab: "trade", placeholder: true, reason: "No swap meet this month." },
  cultivate: { tab: "domestic", min: "member", memberTask: true },
  commerce: { tab: "domestic", min: "member", memberTask: true },
  safety: { tab: "domestic", min: "member", memberTask: true },
  fortify: { tab: "domestic", min: "member", memberTask: true },
  research: { tab: "domestic", min: "member", memberTask: true },
  drill: { tab: "military", min: "member", memberTask: true },
  travel: { tab: "military", min: "free" },
  attack: { tab: "military", min: "leader" },
  mission: { tab: "military", min: "leader" },
  challenge: { tab: "military", min: "leader" },
  hire: { tab: "personnel", min: "leader" },
  promote: { tab: "personnel", min: "commander" },
  spy: { tab: "plot", min: "free" },
  rumor: { tab: "plot", min: "member" },
  persuade: { tab: "plot", min: "member" },
  ally: { tab: "command", min: "leader" },
  break_ally: { tab: "command", min: "commander" },
  appoint: { tab: "command", min: "commander" },
  war_council: { tab: "command", min: "chair" },
};

export const ORDER_TASKS = {
  cultivate: {
    label: "Cultivate",
    stat: "POL",
    short: (city) => `Work the ${city} elevator`,
    line: (city) => `${city}'s grain co-op is short. Take a shift at the elevator this month.`,
  },
  commerce: {
    label: "Commerce",
    stat: "POL",
    short: (city) => `Sit the ${city} scrip table`,
    line: (city) => `The scrip table in ${city} is thin. Sit the market this month.`,
  },
  safety: {
    label: "Safety",
    stat: "POL",
    short: (city) => `Quiet rumors in ${city}`,
    line: (city) => `Rumors are walking ${city}. Walk them down this month.`,
  },
  drill: {
    label: "Drill",
    stat: "WAR",
    short: (city) => `Drill the ${city} levy`,
    line: (city) => `The levy in ${city} is soft. Run a drill this month.`,
  },
  fortify: {
    label: "Fortify",
    stat: "WAR",
    short: (city) => `Sandbag ${city}`,
    line: (city) => `Sandbags on the ${city} edge are low. Fortify this month.`,
  },
  research: {
    label: "Salvage",
    stat: "INT",
    short: (city) => `Salvage hours in ${city}`,
    line: (city) => `The salvage shed in ${city} needs hours. Workshop this month.`,
  },
  spy: {
    label: "Spy",
    stat: "INT",
    short: (city) => `Scout the road out of ${city}`,
    line: (city) => `We need eyes on the next road out of ${city}. Scout it this month.`,
  },
};

const PROPOSE_TASKS = ["cultivate", "commerce", "safety", "drill", "fortify", "research", "spy"];

export function normalizeStatus(id) {
  if (!id) return null;
  return STATUS_ALIAS[id] || null;
}

export function statusLabel(id) {
  const key = normalizeStatus(id) || id;
  return STATUS_LABEL[key] || STATUS_LABEL.free;
}

export function statusShort(id) {
  const key = normalizeStatus(id) || id;
  return STATUS_SHORT[key] || STATUS_SHORT.free;
}

export function statusIndex(id) {
  const key = normalizeStatus(id) || "free";
  return STATUS_INDEX[key] ?? 0;
}

export function monthIndex(week) {
  return Math.floor(((week || 0) + 0) / 4);
}

/** 1–12 inside the year. The 13th four-week block stays month 12 until the year rolls. Week 0 is month 1. Week 15 is month 4. */
export function monthLabel(week) {
  const n = (monthIndex(week) % 13) + 1;
  return n > 12 ? 12 : n;
}

export function gradeForDeeds(deeds) {
  const n = deeds || 0;
  if (n >= DEEDS_FOR_GRADE[1]) return 1;
  if (n >= DEEDS_FOR_GRADE[2]) return 2;
  if (n >= DEEDS_FOR_GRADE[3]) return 3;
  if (n >= DEEDS_FOR_GRADE[4]) return 4;
  return 5;
}

export function payForGrade(grade) {
  return GRADE_PAY[grade] || GRADE_PAY[5];
}

export function levyForGrade(grade) {
  return GRADE_LEVY[grade] || GRADE_LEVY[5];
}

export function deedsToNextGrade(deeds, grade) {
  if (!grade || grade <= 1) return 0;
  const need = DEEDS_FOR_GRADE[grade - 1] || 0;
  return Math.max(0, need - (deeds || 0));
}

export function commissionById(id) {
  return COMMISSIONS.find((c) => c.id === id) || null;
}

export function commissionLabel(id) {
  return commissionById(id)?.label || "None";
}

export function tacticPointsOf(officer) {
  const row = commissionById(officer?.commission);
  return row ? row.tp : 1;
}

export function fameCapsCommission(fame) {
  let best = COMMISSIONS[0];
  COMMISSIONS.forEach((c) => {
    if ((fame || 0) >= c.minFame) best = c;
  });
  return best;
}

function player(state) {
  return (state.officers || []).find((o) => o.id === state.playerOfficerId) || null;
}

export function ensureCareer(state) {
  if (!state.service) {
    state.service = {
      deeds: 0,
      grade: 5,
      commission: null,
      monthTask: null,
      harvestBank: 0,
      completed: 0,
      refused: 0,
      failed: 0,
      donatedWeek: -1,
    };
  }
  const svc = state.service;
  if (svc.deeds == null) svc.deeds = 0;
  if (svc.grade == null) svc.grade = gradeForDeeds(svc.deeds);
  if (svc.harvestBank == null) svc.harvestBank = 0;
  if (svc.completed == null) svc.completed = 0;
  if (svc.refused == null) svc.refused = 0;
  if (svc.failed == null) svc.failed = 0;
  if (svc.donatedWeek == null) svc.donatedWeek = -1;
  if (!state.orders) {
    state.orders = { seq: 1, current: null, history: [], refusalsInRow: 0, missesInRow: 0, locked: [] };
  }
  const orders = state.orders;
  if (!orders.history) orders.history = [];
  if (orders.seq == null) orders.seq = orders.history.length + 1;
  if (orders.refusalsInRow == null) orders.refusalsInRow = 0;
  if (orders.missesInRow == null) orders.missesInRow = 0;
  if (!orders.locked) orders.locked = [];
  if (state.month == null) state.month = monthIndex(state.week || 0);
  (state.officers || []).forEach((o) => {
    if (!o.status) return;
    const n = normalizeStatus(o.status);
    if (!n) {
      delete o.status;
      return;
    }
    o.status = n;
  });
  const p = player(state);
  if (p) {
    if (p.deeds == null) p.deeds = svc.deeds;
    if (p.grade == null) p.grade = svc.grade;
    if (p.commission === undefined) p.commission = svc.commission;
  }
  return state;
}

export function mirrorCareer(state) {
  const p = player(state);
  const svc = state.service;
  if (!p || !svc) return;
  p.deeds = svc.deeds;
  p.grade = svc.grade;
  p.commission = svc.commission;
}

export function syncGrade(state) {
  const prev = state.service.grade;
  const next = gradeForDeeds(state.service.deeds);
  state.service.grade = next;
  mirrorCareer(state);
  return { prev, next, changed: prev !== next };
}

function bestGrant(issuerRank, fame) {
  const capId = GRANT_CAP[normalizeStatus(issuerRank) || "free"] || "squad";
  const capIdx = COMMISSIONS.findIndex((c) => c.id === capId);
  const fameBest = fameCapsCommission(fame);
  const fameIdx = COMMISSIONS.findIndex((c) => c.id === fameBest.id);
  return COMMISSIONS[Math.min(capIdx, fameIdx)] || COMMISSIONS[0];
}

export function maybePromote(state, rank) {
  const current = normalizeStatus(rank) || normalizeStatus(player(state)?.status) || "free";
  if (current === "commander" || current === "governor" || current === "chair") return null;
  const p = player(state);
  if (!p) return null;
  const deeds = state.service?.deeds || 0;
  if (current === "free" && deeds >= 8) {
    p.status = "member";
    const grant = bestGrant("member", state.fame || p.fame || 0);
    if (!state.service.commission) {
      state.service.commission = grant.id;
      p.commission = grant.id;
    }
    const grade = state.service.grade;
    return {
      from: "free",
      to: "member",
      tab: "domestic",
      unlocked: "Domestic",
      message: `Free Volunteer → Cell Member. The Domestic tab unlocks — one task a month. Commission: ${commissionLabel(state.service.commission)}. Pay grade ${grade}.`,
    };
  }
  if (rulesOwnBanner(state, p)) return null;
  const trust = trustWithSuperior(state);
  if (current === "member" && deeds >= 28 && trust >= 50) {
    p.status = "leader";
    return {
      from: "member",
      to: "leader",
      tab: "personnel",
      unlocked: "People",
      message: `Cell Member → Cell Leader. Deeds ${deeds} and trust ${trust} with your superior. People unlocks. You do not need a banner of your own.`,
    };
  }
  if (current === "leader" && deeds >= 48 && trust >= 70) {
    p.status = "opschief";
    return {
      from: "leader",
      to: "opschief",
      tab: "personnel",
      unlocked: "People",
      message: `Cell Leader → Operations Chief. Deeds ${deeds} and trust ${trust}. You advise the cell. A banner and its chairs still need a Front Commander.`,
    };
  }
  return null;
}

function rulesOwnBanner(state, p) {
  if (!p?.faction) return false;
  const fac = (state.factions || []).find((f) => f.id === p.faction);
  return !!(fac && fac.ruler === p.id);
}

function trustWithSuperior(state) {
  const id = state.service?.superiorId || state.orders?.current?.issuerId || state.orders?.history?.[0]?.issuerId;
  if (!id) return 40;
  return state.bonds?.[id] ?? 40;
}

function statusAllows(rank, rule) {
  const have = statusIndex(rank);
  const need = statusIndex(rule.min || "free");
  const cap = rule.max ? statusIndex(rule.max) : 99;
  if (have < need) {
    const reason =
      normalizeStatus(rank) === "opschief" && need >= statusIndex("commander")
        ? "Advise only — needs Front Commander."
        : `Needs ${statusLabel(rule.min || "free")}.`;
    return { ok: false, reason };
  }
  if (have > cap) return { ok: false, reason: rule.maxReason || "Not from this chair." };
  return { ok: true };
}

export function applyStatusGate(action, ctx) {
  const rule = ACTION_RULES[action.id] || { tab: action.tab || "personal", min: "free" };
  action.tab = rule.tab;
  if (action.id === "enlist") {
    if (ctx.hasFaction) {
      action.enabled = false;
      action.statusLocked = true;
      action.hint = "You already serve a banner.";
      return action;
    }
    const rank = normalizeStatus(ctx.rank) || "free";
    if (rank === "commander" || rank === "governor" || rank === "chair") {
      action.enabled = false;
      action.statusLocked = true;
      action.hint = "A Front Commander keeps their own banner.";
      return action;
    }
    action.enabled = true;
    action.statusLocked = false;
    action.hint = rank === "free"
      ? "Sign on with the Denver campus cell. You stay in Cheyenne as a Cell Member."
      : "Sign on with the Denver campus cell. You keep your rank and your deeds.";
    return action;
  }
  if (rule.placeholder || action.placeholder) {
    action.enabled = false;
    action.statusLocked = true;
    action.hint = rule.reason || action.hint || "Locked.";
    return action;
  }
  if (ctx.locked?.includes(action.id)) {
    action.enabled = false;
    action.statusLocked = true;
    action.hint = "That task is locked this month. The proposal did not match the ask.";
    return action;
  }
  const order = ctx.order;
  const live = order && (order.status === "accepted" || order.status === "proposed") && order.task === action.id;
  if (live) {
    action.enabled = true;
    action.ordered = true;
    action.statusLocked = false;
    action.hint = `Orders from above: ${order.short}. This writes your service record.`;
    return action;
  }
  const allow = statusAllows(ctx.rank, rule);
  if (!allow.ok) {
    action.enabled = false;
    action.statusLocked = true;
    action.hint = allow.reason;
    return action;
  }
  if (rule.memberTask && normalizeStatus(ctx.rank) === "member") {
    if (ctx.monthTask) {
      action.enabled = false;
      action.statusLocked = true;
      action.hint = "One task a month. This month is spent.";
      return action;
    }
    if (COOP_TASKS.has(action.id)) {
      action.enabled = true;
      action.hint = "Cell Member: one domestic or military task this month.";
    }
  }
  return action;
}

export function unownedWorkOk(rank, state, actionId) {
  const order = state.orders?.current;
  if (order && (order.status === "accepted" || order.status === "proposed") && order.task === actionId) return true;
  if (normalizeStatus(rank) === "member" && !state.service?.monthTask && COOP_TASKS.has(actionId)) return true;
  return false;
}

export function orderLead(state) {
  const o = state.orders?.current;
  if (!o) return "";
  const tab = COMMAND_TABS.find((t) => t.id === (ACTION_RULES[o.task]?.tab || "domestic"))?.label || "Domestic";
  if (o.status === "pending") {
    return `Orders from above. ${o.issuerName} asks you to ${o.short}. Accept, refuse, or propose.`;
  }
  if (o.status === "accepted" || o.status === "proposed") {
    return `Orders from above. Do ${o.short}. It is highlighted on the ${tab} tab.`;
  }
  return "";
}

export function nextPayrollWeek(week) {
  const w = week || 0;
  const rem = w % 13;
  if (rem === 0) return w + 13;
  return w + (13 - rem);
}

function nextMod(week, mod, target) {
  const w = week || 0;
  const m = ((w % mod) + mod) % mod;
  if (m <= target) return w + (target - m);
  return w + (mod - m + target);
}

export function cadenceLead(state) {
  const week = state.week || 0;
  const bits = [];
  const payIn = nextPayrollWeek(week) - week;
  if (payIn > 0 && payIn <= 4) bits.push(payIn === 1 ? "Payroll in 1 wk" : `Payroll in ${payIn} wks`);
  const fairIn = nextMod(week, 52, 27) - week;
  if (fairIn > 0 && fairIn <= 6) bits.push(fairIn === 1 ? "County fair in 1 wk" : `County fair in ${fairIn} wks`);
  const harvestIn = nextMod(week, 52, 34) - week;
  if (harvestIn > 0 && harvestIn <= 4) bits.push(harvestIn === 1 ? "Harvest in 1 wk" : `Harvest in ${harvestIn} wks`);
  const grade = state.service?.grade ?? 5;
  const need = deedsToNextGrade(state.service?.deeds || 0, grade);
  if (need > 0 && need <= 30) bits.push(`Grade ${grade - 1} at ${need} more Deeds`);
  return bits.slice(0, 2).join(". ");
}

function taskCopy(task, city) {
  const row = ORDER_TASKS[task] || ORDER_TASKS.cultivate;
  return {
    task: ORDER_TASKS[task] ? task : "cultivate",
    taskLabel: row.label,
    stat: row.stat,
    short: row.short(city),
    line: row.line(city),
  };
}

function pushHistory(state, order, status) {
  state.orders.history.unshift({
    id: order.id,
    issuerId: order.issuerId,
    issuerName: order.issuerName,
    task: order.task,
    taskLabel: order.taskLabel,
    short: order.short,
    status,
    week: state.week,
    month: monthLabel(state.week),
  });
  if (state.orders.history.length > 24) state.orders.history.pop();
}

/** Close a still-open order when the month turns. Pending lapses. Accepted work that was not done fails. */
export function closeMonthOrder(state) {
  const order = state.orders?.current;
  if (!order) return null;
  if (order.status !== "pending" && order.status !== "accepted" && order.status !== "proposed") {
    state.orders.current = null;
    return null;
  }
  if (order.status === "pending") {
    order.status = "lapsed";
    pushHistory(state, order, "lapsed");
    state.orders.current = null;
    state.orders.locked = [];
    return { log: `${order.issuerName}'s ask lapsed. The month turned before you answered.`, kind: "week" };
  }
  order.status = "failed";
  pushHistory(state, order, "failed");
  state.orders.current = null;
  state.orders.locked = [];
  state.service.failed += 1;
  state.orders.missesInRow += 1;
  const demotion = demoteForStreak(state, state.orders.missesInRow, "misses");
  return {
    log: demotion?.log || `Order failed: ${order.short}. Trust with ${order.issuerName} slips.`,
    bond: { id: order.issuerId, delta: -6 },
    fame: -1,
    demotion,
    kind: "alert",
  };
}

function demoteForStreak(state, streak, why) {
  if (streak < 3) return null;
  const p = player(state);
  if (!p) return null;
  const rank = normalizeStatus(p.status) || "free";
  if (rank === "leader" || rank === "opschief") {
    p.status = "member";
    state.orders.refusalsInRow = 0;
    state.orders.missesInRow = 0;
    return { from: rank, to: "member", log: `Three ${why} in a row. You drop to Cell Member.` };
  }
  if (rank === "member") {
    p.status = "free";
    p.faction = null;
    state.orders.refusalsInRow = 0;
    state.orders.missesInRow = 0;
    return { from: "member", to: "free", log: `Three ${why} in a row. You are a Free Volunteer again.` };
  }
  state.orders.refusalsInRow = 0;
  state.orders.missesInRow = 0;
  return null;
}

export function waiveOrder(state, why) {
  const order = state.orders?.current;
  if (!order) return null;
  if (order.status !== "pending" && order.status !== "accepted" && order.status !== "proposed") return null;
  order.status = "waived";
  pushHistory(state, order, "waived");
  state.orders.current = null;
  state.orders.locked = [];
  return { log: why || "Orders from above stop. You hold the banner." };
}

/**
 * Weighted, deterministic task. Territory need, the superior's skills, the player's rank,
 * and the last two orders. Does not touch the weekly RNG stream.
 */
export function pickOrderTask(state, superior) {
  const week = state.week || 0;
  const history = state.orders?.history || [];
  if (week === 0 && !history.length && superior?.id === "cole") return "cultivate";
  const recent = new Set(history.slice(0, 2).map((h) => h.task).filter(Boolean));
  const region = (state.regions || []).find((r) => r.id === superior?.regionId) || null;
  const skills = new Set((superior?.skills || []).filter((id) => ORDER_TASKS[id]));
  const rank = statusIndex(player(state)?.status || "free");
  const scored = PROPOSE_TASKS.map((task, i) => {
    let w = 2;
    if (skills.has(task)) w += 4;
    if (region) {
      if (task === "cultivate" && (region.food ?? 50) < 55) w += 3;
      if (task === "commerce" && (region.economy ?? 50) < 50) w += 3;
      if (task === "safety" && (region.order ?? 50) < 50) w += 3;
      if (task === "drill" && (region.garrison ?? 40) < 40) w += 3;
      if (task === "fortify" && (region.walls ?? 0) < 25) w += 3;
      if (task === "spy" && (region.intel ?? 0) < 25) w += 2;
    }
    if (task === "research" && rank < statusIndex("leader")) w += 1;
    if (task === "spy" && rank < statusIndex("member")) w += 1;
    if (recent.has(task)) w -= 8;
    const tie = (monthIndex(week) * 3 + i) % 5;
    return { task, w, tie };
  });
  scored.sort((a, b) => b.w - a.w || b.tie - a.tie || (a.task < b.task ? -1 : 1));
  return scored[0]?.task || "cultivate";
}

/**
 * Issue the month's order. `superior` is { id, name, personality, skills, rank } or null when the player has no one above them.
 * Task pick is deterministic so the weekly RNG stream stays put.
 */
export function issueMonthlyOrder(state, superior, cityName) {
  ensureCareer(state);
  state.orders.locked = [];
  state.service.monthTask = null;
  state.month = monthIndex(state.week || 0);
  if (!superior) {
    state.orders.current = null;
    return null;
  }
  state.service.superiorId = superior.id;
  const task = pickOrderTask(state, superior);
  const copy = taskCopy(task, cityName || "this city");
  const order = {
    id: `ord${state.orders.seq++}`,
    issuerId: superior.id,
    issuerName: superior.name,
    issuerRank: superior.rank || "leader",
    ...copy,
    regionId: superior.regionId || null,
    month: monthLabel(state.week || 0),
    week: state.week || 0,
    status: "pending",
  };
  state.orders.current = order;
  return {
    order,
    log: `${order.issuerName}: "${order.line}"`,
  };
}

export function proposalChoices(currentTask) {
  return PROPOSE_TASKS.filter((id) => id !== currentTask);
}

export function resolveOrderChoice(state, choice, taskId, ctx) {
  ensureCareer(state);
  const order = state.orders.current;
  if (!order || order.status !== "pending") return { ok: false, message: "No order is waiting." };
  const bondNow = state.bonds?.[order.issuerId] ?? 40;
  if (choice === "accept") {
    order.status = "accepted";
    state.orders.refusalsInRow = 0;
    return {
      ok: true,
      choice: "accept",
      tab: ACTION_RULES[order.task]?.tab || "domestic",
      bond: { id: order.issuerId, delta: 4 },
      log: `You accept ${order.issuerName}'s order: ${order.short}.`,
      message: `Accepted. ${order.short}. Trust with ${order.issuerName} ticks up.`,
    };
  }
  if (choice === "refuse") {
    order.status = "refused";
    pushHistory(state, order, "refused");
    state.orders.current = null;
    state.service.refused += 1;
    state.orders.refusalsInRow += 1;
    const demotion = demoteForStreak(state, state.orders.refusalsInRow, "refusals");
    return {
      ok: true,
      choice: "refuse",
      bond: { id: order.issuerId, delta: -8 },
      fame: -1,
      demotion,
      log: demotion?.log || `You refuse ${order.issuerName}. Trust slips.`,
      message: demotion?.log || `Refused. ${order.issuerName} will remember.`,
    };
  }
  if (choice === "propose") {
    const task = ORDER_TASKS[taskId] ? taskId : null;
    if (!task) return { ok: false, message: "Pick a task to propose." };
    const skills = new Set(ctx?.skills || []);
    const matches = skills.has(task);
    if (matches && bondNow >= 40) {
      const city = ctx?.city || "this city";
      const copy = taskCopy(task, city);
      Object.assign(order, copy);
      order.status = "proposed";
      return {
        ok: true,
        choice: "propose",
        approved: true,
        tab: ACTION_RULES[task]?.tab || "domestic",
        bond: { id: order.issuerId, delta: 2 },
        log: `${order.issuerName} approves your proposal: ${order.short}.`,
        message: `Approved. ${order.short}.`,
      };
    }
    if (!state.orders.locked.includes(task)) state.orders.locked.push(task);
    const why = !matches ? "It does not match the ask." : "Trust is too thin (need 40).";
    return {
      ok: true,
      choice: "propose",
      approved: false,
      locked: task,
      bond: { id: order.issuerId, delta: -2 },
      log: `${order.issuerName} locks ${ORDER_TASKS[task].label} this month. ${why}`,
      message: `${ORDER_TASKS[task].label} is locked this month. ${why}`,
    };
  }
  return { ok: false, message: "Answer accept, refuse, or propose." };
}

export function recordServiceAction(state, actionId, extra, rank) {
  ensureCareer(state);
  const order = state.orders.current;
  const live = order && (order.status === "accepted" || order.status === "proposed") && order.task === actionId;
  let completed = null;
  if (live) {
    const hereOk = !order.regionId || !extra?.hereId || extra.hereId === order.regionId || actionId === "spy";
    if (hereOk) {
      order.status = "done";
      pushHistory(state, order, "done");
      state.orders.current = null;
      state.orders.refusalsInRow = 0;
      state.orders.missesInRow = 0;
      state.service.completed += 1;
      state.service.deeds += 10;
      state.service.monthTask = actionId;
      const grade = syncGrade(state);
      const promoted = maybePromote(state, rank);
      if (promoted) syncGrade(state);
      const dings = ["DEEDS +10"];
      if (grade.changed) dings.push(`GRADE ${state.service.grade}`);
      if (promoted) dings.push(statusShort(promoted.to).toUpperCase());
      completed = {
        message: `Order done. Deeds ${state.service.deeds}. Grade ${state.service.grade}.`,
        log: `Service record: ${order.short} done. Deeds ${state.service.deeds}, grade ${state.service.grade}.`,
        dings,
        bond: { id: order.issuerId, delta: 6 },
        fame: 3,
        promoted,
      };
    }
  }
  if (!completed && normalizeStatus(rank) === "member" && COOP_TASKS.has(actionId) && state.service.monthTask == null) {
    state.service.monthTask = actionId;
  }
  return completed;
}

export function noteDeeds(state, amount, rank) {
  ensureCareer(state);
  state.service.deeds = Math.max(0, (state.service.deeds || 0) + amount);
  const grade = syncGrade(state);
  const promoted = maybePromote(state, rank);
  if (promoted) syncGrade(state);
  return { grade, promoted };
}

/** Weekly food stays with the army. The late-summer payout is a separate, logged bonus. */
export function skimHarvest(_state, foodYield) {
  return foodYield || 0;
}

export function payoutHarvest(state) {
  ensureCareer(state);
  const bank = state.service.harvestBank || 0;
  const bonus = bank + 8;
  state.service.harvestBank = 0;
  state.food = (state.food || 0) + bonus;
  return `Late-summer harvest: +${bonus} stores from farm, water, and sun.`;
}

export function fairLine(city) {
  return `Fourth of July county fair in ${city}. A yard bracket and a call-in radio contest are posted on the grange board.`;
}

/** Pay the player when they are not the banner's chair. A ruler pays the court from the treasury instead. */
export function runPayroll(state, opts) {
  ensureCareer(state);
  const grade = state.service.grade || 5;
  const mine = payForGrade(grade);
  const ruler = !!opts?.ruler;
  if (!ruler) {
    state.gold = (state.gold || 0) + mine;
    mirrorCareer(state);
    return `Scrip payroll: grade ${grade} pays ${mine}.`;
  }
  const staff = opts?.staff || [];
  let paid = 0;
  let unpaid = 0;
  staff.forEach((o) => {
    const due = payForGrade(o.grade || 5);
    if ((state.gold || 0) >= due) {
      state.gold -= due;
      paid += 1;
    } else {
      o.loyalty = Math.max(0, (o.loyalty || 50) - 4);
      unpaid += 1;
    }
  });
  if (!staff.length) return `Scrip payroll: the banner draws its own grade ${grade} pay. No court to settle.`;
  if (unpaid) return `Scrip payroll short. ${unpaid} unpaid — loyalty slips. ${paid} settled.`;
  return `Scrip payroll: grade pays settled for ${paid} on the court.`;
}

export function tabForTask(task) {
  return ACTION_RULES[task]?.tab || "domestic";
}
