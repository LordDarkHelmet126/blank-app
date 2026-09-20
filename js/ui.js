import {
  createNewGame,
  listActions,
  act,
  battleCmd,
  visibleOfficers,
  playerOf,
  playerGenerals,
  rankOf,
  rankLabel,
  apMax,
  regionOf,
  factionOf,
  getRelation,
  hireCandidates,
  attackCandidates,
  neighborRegions,
  serialize,
  deserialize,
  createCustomOfficer,
  autoplayWeek,
  MAX_GENERALS,
} from "./engine.js";

const SAVE_KEY = "northern-front-v01";
let content;
let state;
let selectedRegion = "bethel";
let hoverRegion = null;

const $ = (id) => document.getElementById(id);

export function boot(loaded) {
  content = loaded;
  bindChrome();
  $("app").hidden = false;
  $("boot").hidden = true;
  const params = new URLSearchParams(location.search);
  if (params.get("demo") === "slice") {
    state = createNewGame(content, {
      name: "Alex Rourke",
      background: "scout",
      difficulty: "normal",
      seed: 7,
    });
    act(state, content, "raise_banner");
    selectedRegion = "bethel";
    hideModal();
    render();
    return;
  }
  if (params.get("demo") === "week") {
    state = createNewGame(content, {
      name: "Alex Rourke",
      background: "scout",
      difficulty: "normal",
      seed: 7,
    });
    act(state, content, "raise_banner");
    autoplayWeek(state, content);
    autoplayWeek(state, content);
    selectedRegion = playerOf(state).region;
    hideModal();
    render();
    return;
  }
  const saved = localStorage.getItem(SAVE_KEY);
  showModal(titleScreenHtml(!!saved));
}

function bindChrome() {
  $("btn-end").onclick = () => run("end_week");
  $("btn-save").onclick = saveGame;
  $("btn-load").onclick = () => {
    showModal(loadMenuHtml());
    wireAfterRender();
  };
  $("btn-help").onclick = () => showModal(helpHtml());
  $("btn-officers").onclick = () => {
    showModal(officersHtml());
    wireAfterRender();
  };
  $("btn-factions").onclick = () => showModal(factionsHtml());
  $("modal").onclick = (e) => {
    if (e.target.id === "modal") hideModal();
  };
  $("ploy-rally").onclick = () => doBattle("ploy", { kind: "rally" });
  $("ploy-ambush").onclick = () => doBattle("ploy", { kind: "ambush" });
  $("ploy-rumor").onclick = () => doBattle("ploy", { kind: "rumor" });
  $("battle-end-turn").onclick = () => doBattle("endTurn");
  $("battle-auto").onclick = () => doBattle("auto");
  const canvas = $("map");
  canvas.addEventListener("click", onMapClick);
  canvas.addEventListener("mousemove", onMapMove);
  const bc = $("battle-canvas");
  bc.addEventListener("click", onBattleClick);
  window.addEventListener("keydown", (e) => {
    if (e.key === "e" && state && state.phase === "strategy") run("end_week");
  });
}

function titleScreenHtml(hasSave) {
  return `
    <p class="muted">Original IP. Alaska-first officer sandbox. Not affiliated with any licensed war film or Koei title.</p>
    <h1>NORTHERN FRONT</h1>
    <p>Invasion week 0. You are one person in the Kuskokwim Lowlands. Raise a banner, hire up to five generals, or stay a ghost. Occupiers already hold Anchorage, the Slope, Kenai, and Kodiak.</p>
    <div class="field"><label>Officer name</label><input id="ng-name" maxlength="28" value="Alex Rourke" /></div>
    <p>Background</p>
    <div class="choices" id="ng-bg">
      ${content.officers.backgrounds.map((b, i) => `<button type="button" data-bg="${b.id}" class="${i === 0 ? "primary" : ""}">${b.name}<small style="display:block;color:var(--ice-dim)">${b.blurb}</small></button>`).join("")}
    </div>
    <p>Difficulty (starting pressure)</p>
    <div class="choices" id="ng-diff">
      <button type="button" data-d="easy">Easy</button>
      <button type="button" data-d="normal" class="primary">Normal</button>
      <button type="button" data-d="hard">Hard</button>
    </div>
    <div class="choices">
      <button type="button" class="primary" id="ng-start">Begin week 0</button>
      ${hasSave ? `<button type="button" id="ng-continue">Continue last save</button>` : ""}
    </div>
  `;
}

function wireTitle() {
  let bg = content.officers.backgrounds[0].id;
  let diff = "normal";
  $("modal-card").querySelectorAll("#ng-bg button").forEach((btn) => {
    btn.onclick = () => {
      bg = btn.dataset.bg;
      $("modal-card").querySelectorAll("#ng-bg button").forEach((b) => b.classList.toggle("primary", b === btn));
    };
  });
  $("modal-card").querySelectorAll("#ng-diff button").forEach((btn) => {
    btn.onclick = () => {
      diff = btn.dataset.d;
      $("modal-card").querySelectorAll("#ng-diff button").forEach((b) => b.classList.toggle("primary", b === btn));
    };
  });
  const start = $("modal-card").querySelector("#ng-start");
  if (start) {
    start.onclick = () => {
      const name = $("modal-card").querySelector("#ng-name").value;
      state = createNewGame(content, { name, background: bg, difficulty: diff });
      selectedRegion = "bethel";
      hideModal();
      render();
    };
  }
  const cont = $("modal-card").querySelector("#ng-continue");
  if (cont) cont.onclick = () => loadFromStorage();
}

function showModal(html, opts = {}) {
  $("modal-card").className = "modal-card" + (opts.kind === "week" ? " week-card" : "");
  $("modal-card").innerHTML = html;
  $("modal").hidden = false;
  wireTitle();
  wireAfterRender();
  const close = $("modal-card").querySelector("[data-close]");
  if (close) close.onclick = hideModal;
}

function hideModal() {
  $("modal").hidden = true;
  $("modal-card").className = "modal-card";
}

function helpHtml() {
  return `
    <h2>How to play</h2>
    <p>Each turn is <strong>one week</strong>. Spend AP, then End Week. AI officers act according to personality (aggressive, cautious, diplomat, schemer, merchant, loyalist, ambitious, recluse).</p>
    <ul>
      <li>Raise Banner in uncontrolled Bethel to found Northern Front.</li>
      <li>Domestic actions need a region you hold.</li>
      <li>Hire free officers in your region (max 5 generals).</li>
      <li>Spy, rumor, persuade, hide, and alliances are always on the board.</li>
      <li>March/Attack opens a short grid battle (or auto-resolve).</li>
      <li>Tech is salvage + calendar. No leapfrog.</li>
    </ul>
    <p class="muted">Saves use this browser's localStorage and can be downloaded as JSON.</p>
    <button type="button" data-close>Close</button>
  `;
}

function officersHtml() {
  if (!state) return `<p>No game.</p>`;
  const rows = visibleOfficers(state)
    .map((o) => {
      const fac = o.faction ? factionOf(state, o.faction)?.short : "free";
      const loc = regionOf(state, o.region)?.short || "?";
      return `<button type="button" class="list-btn" data-off="${o.id}"><strong>${o.name}</strong> · ${o.title} · ${fac} · ${loc}<br><span class="muted">${o.personality} · WAR ${o.war} INT ${o.int} POL ${o.pol} CHR ${o.chr} · loy ${o.loyalty}${o.legend ? " · LEGEND" : ""}</span></button>`;
    })
    .join("");
  return `<h2>Officers (${visibleOfficers(state).length} visible)</h2><p class="muted">Roster is data-driven (cap ${state.contentMeta.rosterCap}). Hidden legends stay off this list until found.</p>${rows}
    <hr />
    <h2>Add custom officer (${state.customSlotsUsed}/${state.contentMeta.customOfficerSlots})</h2>
    <div class="field"><label>Name</label><input id="c-name" value="Riley Cho" /></div>
    <button type="button" id="c-add">Add free officer here</button>
    <p></p><button type="button" data-close>Close</button>`;
}

function factionsHtml() {
  if (!state) return `<p>No game.</p>`;
  const p = playerOf(state);
  const rows = state.factions
    .filter((f) => f.id !== "northern_front" || f.alive)
    .map((f) => {
      const rel = p.faction ? getRelation(state, p.faction, f.id) : f.relationsDefault;
      const held = state.regions.filter((r) => r.owner === f.id).map((r) => r.short).join(", ") || "none";
      return `<div class="card" style="margin:8px 0"><h2 style="color:${f.color}">${f.name}</h2>
        <p>${f.alignment} · held: ${held} · rel ${rel}</p>
        <p class="plus">+ ${f.plus.join(" · ")}</p>
        <p class="minus">− ${f.minus.join(" · ")}</p></div>`;
    })
    .join("");
  return `<h2>Factions</h2>${rows}<button type="button" data-close>Close</button>`;
}

function loadMenuHtml() {
  return `
    <h2>Load</h2>
    <p><button type="button" id="load-ls">Load browser save</button></p>
    <div class="field"><label>Or paste / import JSON</label><textarea id="load-json" rows="8" style="width:100%;background:#0b1720;color:var(--ice);border:1px solid var(--line)"></textarea></div>
    <p><input type="file" id="load-file" accept="application/json" /></p>
    <button type="button" id="load-paste">Load pasted JSON</button>
    <button type="button" data-close>Close</button>
  `;
}

function saveGame() {
  if (!state) return;
  const raw = serialize(state);
  localStorage.setItem(SAVE_KEY, raw);
  const blob = new Blob([raw], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `northern-front-week-${state.week}.json`;
  a.click();
  toast("Saved to browser and download.");
}

function loadFromStorage() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return toast("No browser save.");
  applySave(raw);
}

function applySave(raw) {
  try {
    state = deserialize(raw);
    selectedRegion = playerOf(state).region;
    hideModal();
    render();
    toast(`Loaded week ${state.week}.`);
  } catch (err) {
    toast("Could not read save.");
    console.error(err);
  }
}

function toast(msg) {
  pushEphemeral(msg);
}

function pushEphemeral(msg) {
  if (!state) {
    $("boot").textContent = msg;
    return;
  }
  state.log.unshift({ id: "ui" + Date.now(), week: state.week, text: msg, kind: "info" });
  renderLog();
}

function run(id, extra) {
  if (!state) return;
  const res = act(state, content, id, extra || {});
  if (!res.ok) {
    toast(res.message);
    render();
    return;
  }
  if (res.battle) {
    hideModal();
    openBattle();
    return;
  }
  if (res.weekEnd) {
    showModal(weekReportHtml(res.report || []), { kind: "week" });
  }
  if (state.gameOver) {
    showModal(`<h2>Campaign closed</h2><p>${esc(state.ending || state.gameOver)}</p><button type="button" data-close>Close</button>`);
  }
  render();
}

function esc(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

export function render() {
  if (!state) return;
  const p = playerOf(state);
  $("week").textContent = String(state.week);
  $("season").textContent = state._season?.name || "";
  $("ap").textContent = `${state.ap}/${apMax(state)}`;
  $("gold").textContent = String(state.gold);
  $("food").textContent = String(state.food);
  $("fame").textContent = String(state.fame);
  $("rank").textContent = rankLabel(rankOf(state, p));
  $("you-card").innerHTML = youHtml();
  $("region-card").innerHTML = regionHtml();
  renderActions();
  renderLog();
  renderLegend();
  drawMap();
  wireAfterRender();
  if (state.phase === "battle") openBattle();
  else $("battle").hidden = true;
}

function youHtml() {
  const p = playerOf(state);
  const gens = playerGenerals(state);
  const fac = p.faction ? factionOf(state, p.faction) : null;
  return `
    <h2>You</h2>
    <p><strong>${esc(p.name)}</strong> · ${esc(p.title)} · ${fac ? fac.short : "no banner"}</p>
    <div class="statrow">
      <span class="pill">WAR ${p.war}</span><span class="pill">INT ${p.int}</span>
      <span class="pill">POL ${p.pol}</span><span class="pill">CHR ${p.chr}</span>
    </div>
    <p class="muted">Generals ${gens.length}/${MAX_GENERALS}${gens.length ? ": " + gens.map((g) => g.name).join(", ") : ""} · ${esc(state.difficulty)} · salvage ${state.research.points}</p>
  `;
}

function regionHtml() {
  const r = regionOf(state, selectedRegion) || regionOf(state, playerOf(state).region);
  const f = r.owner ? factionOf(state, r.owner) : null;
  const known = r.intel > 0 || (playerOf(state).faction && r.owner === playerOf(state).faction);
  const garr = known ? r.garrison : "???";
  const present = visibleOfficers(state).filter((o) => o.region === r.id);
  return `
    <h2>Region</h2>
    <p><strong>${esc(r.name)}</strong> · ${r.type} · ${f ? f.short : "uncontrolled"}</p>
    <p class="plus">+ ${r.plus.join(" · ")}</p>
    <p class="minus">− ${r.minus.join(" · ")}</p>
    <div class="statrow">
      <span class="pill">Garrison ${garr}</span>
      <span class="pill">Walls ${known ? r.walls : "?"}</span>
      <span class="pill">Order ${known ? r.order : "?"}</span>
      <span class="pill">Econ ${r.economy}</span>
    </div>
    <p class="muted">Officers here: ${present.map((o) => o.name).join(", ") || "none visible"}</p>
  `;
}

function weekReportHtml(report) {
  const lines = report || [];
  const headline = lines[0] || `Week ${state.week}`;
  const ai = lines.filter((l) => /\[[a-z]+\]/.test(l)).slice(0, 6);
  const extra = Math.max(0, lines.length - 1 - ai.length);
  return `<h2>Week ${state.week}</h2>
    <p>${esc(headline)}</p>
    <ul class="week-ai">${ai.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
    <p class="muted">${extra ? `${extra} more in the field log. ` : ""}Personality tags are in [brackets].</p>
    <button type="button" data-close class="primary">Continue</button>`;
}

const COMMAND_IDS = ["raise_banner", "travel", "hire", "attack"];

function actionButton(a) {
  const b = document.createElement("button");
  b.type = "button";
  b.dataset.id = a.id;
  b.disabled = !a.enabled || (a.ap > 0 && state.ap < a.ap);
  b.innerHTML = `${esc(a.label)} <small>AP ${a.ap}${a.enabled ? "" : " · locked"}</small>`;
  b.title = a.hint;
  b.onclick = () => startAction(a);
  return b;
}

function renderActions() {
  const town = $("actions");
  const cmd = $("command-actions");
  town.innerHTML = "";
  cmd.innerHTML = "";
  const actions = listActions(state).filter((a) => a.id !== "end_week");
  COMMAND_IDS.forEach((id) => {
    const a = actions.find((x) => x.id === id);
    if (a) cmd.appendChild(actionButton(a));
  });
  actions.filter((a) => !COMMAND_IDS.includes(a.id)).forEach((a) => town.appendChild(actionButton(a)));
}

function startAction(a) {
  if (a.needs === "region" || a.needs === "neighbor") {
    const list = a.needs === "neighbor" ? neighborRegions(state) : state.regions;
    showModal(`<h2>${esc(a.label)}</h2>${list.map((r) => `<button class="list-btn" data-act="${a.id}" data-region="${r.id}">${esc(r.name)}</button>`).join("")}<button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-region]").forEach((btn) => {
      btn.onclick = () => {
        hideModal();
        run(a.id, { regionId: btn.dataset.region });
      };
    });
    return;
  }
  if (a.needs === "hire") {
    const cs = hireCandidates(state);
    if (!cs.length) return toast("No free officers in this region.");
    showModal(`<h2>Hire</h2>${cs.map((o) => `<button class="list-btn" data-hire="${o.id}">${esc(o.name)} · ${o.personality} · CHR check · ambition ${o.ambition}</button>`).join("")}<button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-hire]").forEach((btn) => {
      btn.onclick = () => {
        hideModal();
        run("hire", { officerId: btn.dataset.hire });
      };
    });
    return;
  }
  if (a.needs === "faction" || a.needs === "ally") {
    const p = playerOf(state);
    const list = state.factions.filter((f) => {
      if (!f.alive && f.id === "northern_front") return false;
      if (f.id === p.faction) return false;
      if (a.needs === "ally") return getRelation(state, p.faction, f.id) >= 70;
      return true;
    });
    if (!list.length) return toast("No valid faction.");
    showModal(`<h2>${esc(a.label)}</h2>${list.map((f) => `<button class="list-btn" data-fac="${f.id}">${esc(f.name)} · rel ${getRelation(state, p.faction, f.id)}</button>`).join("")}<button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-fac]").forEach((btn) => {
      btn.onclick = () => {
        hideModal();
        run(a.id, { factionId: btn.dataset.fac });
      };
    });
    return;
  }
  if (a.needs === "officer") {
    const p = playerOf(state);
    const list = visibleOfficers(state).filter((o) => o.id !== p.id);
    showModal(`<h2>${esc(a.label)}</h2>${list.map((o) => `<button class="list-btn" data-off="${o.id}">${esc(o.name)} · ${o.personality} · ${o.faction ? factionOf(state, o.faction)?.short : "free"} · loy ${o.loyalty}</button>`).join("")}<button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-off]").forEach((btn) => {
      btn.onclick = () => {
        hideModal();
        run(a.id, { officerId: btn.dataset.off });
      };
    });
    return;
  }
  if (a.needs === "attack") {
    const list = attackCandidates(state);
    if (!list.length) return toast("No adjacent hostile ground.");
    const here = regionOf(state, playerOf(state).region);
    showModal(`<h2>March / Attack</h2>
      <p>Commit troops from ${esc(here.short)} (garrison ${here.garrison}). Battle is a short grid; auto-resolve is allowed.</p>
      ${list.map((r) => `<button class="list-btn" data-atk="${r.id}">${esc(r.name)} · ${r.owner ? factionOf(state, r.owner)?.short : "open"} · garr ${r.intel || r.owner === playerOf(state).faction ? r.garrison : "?"}</button>`).join("")}
      <label class="muted"><input type="checkbox" id="atk-auto" /> Auto-resolve</label>
      <button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-atk]").forEach((btn) => {
      btn.onclick = () => {
        const auto = $("modal-card").querySelector("#atk-auto").checked;
        hideModal();
        run("attack", { regionId: btn.dataset.atk, auto });
      };
    });
    return;
  }
  run(a.id);
}

function renderLog() {
  $("log").innerHTML = state.log
    .slice(0, 40)
    .map((l) => `<li class="${l.kind}"><span class="w">w${l.week}</span>${esc(l.text)}</li>`)
    .join("");
}

function renderLegend() {
  $("legend").innerHTML = state.factions
    .filter((f) => f.id !== "northern_front" || f.alive)
    .map((f) => `<span><i style="background:${f.color}"></i>${esc(f.short)}</span>`)
    .join("") + `<span><i style="background:#5a6a72"></i>Open</span>`;
}

function regionAt(mx, my, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = ((mx - rect.left) / rect.width) * 1000;
  const y = ((my - rect.top) / rect.height) * 620;
  return state.regions.find((r) => hitPoly(r.polygon, x, y));
}

function hitPoly(poly, x, y) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0001) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function onMapClick(e) {
  if (!state) return;
  const r = regionAt(e.clientX, e.clientY, $("map"));
  if (!r) return;
  selectedRegion = r.id;
  render();
}

function onMapMove(e) {
  if (!state) return;
  const r = regionAt(e.clientX, e.clientY, $("map"));
  const id = r ? r.id : null;
  if (id !== hoverRegion) {
    hoverRegion = id;
    drawMap();
  }
}

function drawMap() {
  const canvas = $("map");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#08141c";
  ctx.fillRect(0, 0, w, h);

  if (state.coast) {
    ctx.beginPath();
    state.coast.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
    ctx.fillStyle = "#0d1e28";
    ctx.fill();
    ctx.strokeStyle = "#3d6a7a";
    ctx.stroke();
  }

  state.regions.forEach((r) => {
    const fac = r.owner ? factionOf(state, r.owner) : null;
    ctx.beginPath();
    r.polygon.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
    ctx.fillStyle = fac ? fac.colorDark : "#243038";
    ctx.globalAlpha = 0.92;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = r.id === selectedRegion ? 3 : 1;
    ctx.strokeStyle = r.id === selectedRegion ? "#f0d3a0" : r.id === hoverRegion ? "#c5dde8" : "#1c3340";
    ctx.stroke();
    ctx.fillStyle = "#e8f4f8";
    ctx.font = "12px Segoe UI, sans-serif";
    ctx.fillText(r.short, r.label[0] - 24, r.label[1]);
    const p = playerOf(state);
    if (p.region === r.id) {
      ctx.fillStyle = "#d4a056";
      ctx.beginPath();
      ctx.arc(r.label[0] + 36, r.label[1] - 6, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  ctx.fillStyle = "#8eacb8";
  ctx.font = "11px Segoe UI, sans-serif";
  ctx.fillText("Alaska theater (simplified) — click a region", 16, 20);
}

function openBattle() {
  $("battle").hidden = false;
  drawBattle();
}

function drawBattle() {
  const b = state.battle;
  if (!b) return;
  const dest = regionOf(state, b.toId);
  $("battle-title").textContent = `Field — ${dest.name}`;
  $("battle-meta").textContent = `${b.weather} · impulse ${b.round}/${b.maxRounds} · morale A ${b.morale.atk} / D ${b.morale.def} · ${b.turn === "atk" ? "your impulse" : "enemy impulse"}`;
  $("battle-log").innerHTML = b.log.slice(-12).map((l) => `<li>${esc(l)}</li>`).join("");
  const canvas = $("battle-canvas");
  const ctx = canvas.getContext("2d");
  const cw = canvas.width;
  const ch = canvas.height;
  const gw = cw / b.cols;
  const gh = ch / b.rows;
  const colors = { plains: "#2d4a3a", forest: "#1c3a2c", hills: "#3a4030", urban: "#3a3a42", ice: "#6a8a9a" };
  for (let y = 0; y < b.rows; y++) {
    for (let x = 0; x < b.cols; x++) {
      ctx.fillStyle = colors[b.grid[y][x]] || "#234";
      ctx.fillRect(x * gw, y * gh, gw - 1, gh - 1);
    }
  }
  b.units.forEach((u) => {
    if (u.hp <= 0) return;
    const px = u.x * gw + gw / 2;
    const py = u.y * gh + gh / 2;
    ctx.fillStyle = u.side === "atk" ? "#d4a056" : "#b04a4a";
    if (b.selected === u.id) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.strokeRect(u.x * gw + 6, u.y * gh + 6, gw - 12, gh - 12);
    }
    ctx.fillRect(px - 16, py - 16, 32, 32);
    ctx.fillStyle = "#081018";
    ctx.font = "11px sans-serif";
    ctx.fillText(u.label.slice(0, 4), px - 12, py + 4);
    ctx.fillStyle = "#7aa17b";
    ctx.fillRect(px - 16, py + 18, 32 * (u.hp / u.maxHp), 4);
  });
}

function onBattleClick(e) {
  if (!state?.battle) return;
  const canvas = $("battle-canvas");
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(((e.clientX - rect.left) / rect.width) * state.battle.cols);
  const y = Math.floor(((e.clientY - rect.top) / rect.height) * state.battle.rows);
  const unit = state.battle.units.find((u) => u.hp > 0 && u.x === x && u.y === y && u.side === "atk");
  if (unit && (!state.battle.selected || unit.id !== state.battle.selected && !enemyAt(x, y))) {
    battleCmd(state, content, "select", { unitId: unit.id });
    drawBattle();
    return;
  }
  doBattle("cell", { x, y });
}

function enemyAt(x, y) {
  return state.battle.units.some((u) => u.hp > 0 && u.x === x && u.y === y && u.side === "def");
}

function doBattle(cmd, extra) {
  const res = battleCmd(state, content, cmd, extra || {});
  if (!res.ok) toast(res.message);
  if (state.phase !== "battle") {
    $("battle").hidden = true;
    render();
    if (res.battleEnd) toast(res.message);
    return;
  }
  drawBattle();
}

function wireAfterRender() {
  const card = $("modal-card");
  if ($("modal").hidden) {
    // still wire officers modal buttons if we opened via dock after render
  }
  const add = document.getElementById("c-add");
  if (add) {
    add.onclick = () => {
      const name = document.getElementById("c-name").value;
      const res = createCustomOfficer(state, { name, personality: "loyalist" });
      toast(res.ok ? `${name} added to the free roster.` : res.message);
      showModal(officersHtml());
      wireDynamicModals();
      render();
    };
  }
  wireDynamicModals();
}

function wireDynamicModals() {
  const file = document.getElementById("load-file");
  if (file) {
    file.onchange = () => {
      const f = file.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => applySave(String(reader.result));
      reader.readAsText(f);
    };
  }
  const ls = document.getElementById("load-ls");
  if (ls) ls.onclick = loadFromStorage;
  const paste = document.getElementById("load-paste");
  if (paste) {
    paste.onclick = () => applySave(document.getElementById("load-json").value);
  }
  $("modal-card")?.querySelectorAll("[data-close]")?.forEach((b) => {
    b.onclick = hideModal;
  });
}
