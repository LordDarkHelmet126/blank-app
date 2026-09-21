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
  setGeneralOrder,
  ordersForOfficer,
  skillsForPersonality,
  portraitInitials,
  orderLabel,
  CUSTOM_STAT_MIN,
  CUSTOM_STAT_MAX,
  CUSTOM_STAT_BUDGET,
  legendStatus,
  autoplayWeek,
  MAX_GENERALS,
  mapRoads,
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
  if (params.get("demo") === "orders") {
    state = createNewGame(content, {
      name: "Alex Rourke",
      background: "scout",
      difficulty: "normal",
      seed: 7,
    });
    act(state, content, "raise_banner");
    const hart = state.officers.find((o) => o.id === "hart");
    if (hart) {
      hart.faction = "northern_front";
      hart.loyalty = 80;
      hart.standingOrder = "drill";
    }
    selectedRegion = "bethel";
    hideModal();
    render();
    return;
  }
  if (params.get("demo") === "legend") {
    state = createNewGame(content, {
      name: "Alex Rourke",
      background: "scout",
      difficulty: "normal",
      seed: 7,
    });
    act(state, content, "raise_banner");
    selectedRegion = "arctic_slope";
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
    showModal(officersHtml(), { kind: "officers" });
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
  const extra = opts.kind === "week" ? " week-card" : opts.kind === "officers" ? " officers-card" : "";
  $("modal-card").className = "modal-card" + extra;
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
    <p>Each turn is <strong>one week</strong>. Spend AP, then End Week. AI officers act by personality. Your generals follow standing orders on the You card.</p>
    <ul>
      <li>Raise Banner in uncontrolled Bethel to found Northern Front.</li>
      <li>Hire up to 5 generals, then set their standing order. Personality type gates skills (ROTK7-style). March/Attack stays on Command.</li>
      <li>Hidden legend: <strong>Seek Legend</strong> (or Spy the Arctic Slope) for the rumor, then travel Fairbanks → Slope and Seek again to list Ilya Karr.</li>
      <li>Spy, rumor, persuade, hide, and alliances are on Town &amp; plots.</li>
      <li>Tech is salvage + calendar. No leapfrog.</li>
    </ul>
    <p class="muted">Saves use this browser's localStorage and can be downloaded as JSON. Original IP — no licensed names.</p>
    <button type="button" data-close>Close</button>
  `;
}

function officersHtml() {
  if (!state) return `<p>No game.</p>`;
  const hunt = legendStatus(state);
  const locked = hunt.revealed
    ? ""
    : `<div class="card rumor-card"><h2>Unlisted legend</h2><p class="rumor">${esc(hunt.rumor)}</p><p class="muted">Use Seek Legend on Town &amp; plots. A ? mark sits on the Slope until he is listed.</p></div>`;
  const rows = visibleOfficers(state)
    .map((o) => {
      const fac = o.faction ? factionOf(state, o.faction)?.short : "free";
      const loc = regionOf(state, o.region)?.short || "?";
      const face = esc(o.portrait || portraitInitials(o.name));
      return `<button type="button" class="list-btn officer-row" data-off="${o.id}"><span class="portrait" aria-hidden="true">${face}</span><span class="officer-body"><span class="officer-name">${esc(o.name)}</span><span class="officer-sub">${esc(o.title)} · ${esc(fac)} · ${esc(loc)} · ${esc(o.personality)}</span><span class="officer-stats"><i>WAR ${o.war}</i><i>INT ${o.int}</i><i>POL ${o.pol}</i><i>CHR ${o.chr}</i><i>loy ${o.loyalty}</i>${o.legend ? '<i class="leg">LEGEND</i>' : ""}${o.custom ? "<i>CUSTOM</i>" : ""}</span></span></button>`;
    })
    .join("");
  const types = Object.entries(content.officers.personalities || {});
  const typeOpts = types
    .map(([id, p], i) => `<option value="${esc(id)}"${id === "loyalist" ? " selected" : ""}>${esc(p.label || id)}</option>`)
    .join("");
  const slots = state.contentMeta.customOfficerSlots || 10;
  const full = state.customSlotsUsed >= slots;
  return `<div class="chrome-head"><span class="chrome-tick"></span><h2>Officers (${visibleOfficers(state).length} visible)</h2><span class="chrome-tick"></span></div>${locked}<p class="muted">Roster is data-driven (cap ${state.contentMeta.rosterCap}). Hidden legends stay off this list until found.</p>${rows}
    <hr />
    <h2>Create officer (${state.customSlotsUsed}/${slots})</h2>
    <p class="muted">Original general — not licensed IP. Stats ${CUSTOM_STAT_MIN}–${CUSTOM_STAT_MAX} each, total ≤ ${CUSTOM_STAT_BUDGET}. Type gates skills the way ROTK7 aptitudes did.</p>
    <div class="creator">
      <div class="portrait portrait-lg" id="c-portrait" aria-hidden="true">RC</div>
      <div class="creator-fields">
        <div class="field"><label>Name</label><input id="c-name" maxlength="28" value="Riley Cho" /></div>
        <div class="field"><label>Title</label><input id="c-title" maxlength="24" value="Volunteer" /></div>
        <div class="field"><label>Type</label><select id="c-type">${typeOpts}</select></div>
        <p class="muted" id="c-skills"></p>
        <div class="creator-stats">
          <label>WAR <input id="c-war" type="number" min="${CUSTOM_STAT_MIN}" max="${CUSTOM_STAT_MAX}" value="55" /></label>
          <label>INT <input id="c-int" type="number" min="${CUSTOM_STAT_MIN}" max="${CUSTOM_STAT_MAX}" value="55" /></label>
          <label>POL <input id="c-pol" type="number" min="${CUSTOM_STAT_MIN}" max="${CUSTOM_STAT_MAX}" value="55" /></label>
          <label>CHR <input id="c-chr" type="number" min="${CUSTOM_STAT_MIN}" max="${CUSTOM_STAT_MAX}" value="55" /></label>
        </div>
        <p class="muted" id="c-budget">Budget 220/${CUSTOM_STAT_BUDGET}</p>
      </div>
    </div>
    <button type="button" id="c-add" class="primary"${full ? " disabled" : ""}>${full ? "Slots full" : "Add free officer here"}</button>
    <p></p><button type="button" data-close>Close</button>`;
}

function factionsHtml() {
  if (!state) return `<p>No game.</p>`;
  const p = playerOf(state);
  const row = (f) => {
    const rel = p.faction ? getRelation(state, p.faction, f.id) : f.relationsDefault;
    const held = state.regions.filter((r) => r.owner === f.id).map((r) => r.short).join(", ") || "none";
    const where = f.onMap ? `held: ${held}` : `off-map · ${esc(f.theater || "later")}`;
    return `<div class="card" style="margin:8px 0"><h2 style="color:${f.color}">${esc(f.name)}</h2>
        <p class="muted">${esc(f.bio || "")}</p>
        <p>${esc(f.alignment)} · ${esc(f.personalityLean || "loyalist")} lean · ${where} · rel ${rel}</p>
        <p class="plus">+ ${f.plus.join(" · ")}</p>
        <p class="minus">− ${f.minus.join(" · ")}</p></div>`;
  };
  const onMap = state.factions.filter((f) => f.onMap && (f.id !== "northern_front" || f.alive));
  const later = state.factions.filter((f) => !f.onMap);
  return `<h2>Factions on this map (${onMap.length})</h2>${onMap.map(row).join("")}
    <h2>Later theaters (${later.length})</h2>
    <p class="muted">Loaded from JSON. No land and no pacts on this board until a later expansion.</p>
    ${later.map(row).join("")}
    <button type="button" data-close>Close</button>`;
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
  if (res.revealed) {
    showModal(`<h2>Legend listed</h2>
      <p class="rumor">${esc(res.officerName || "Ilya Karr")} answers on the Arctic Slope.</p>
      <p>Original character — a hidden free officer, ROTK7-style. Hire him if you share the Slope (Command → Hire).</p>
      <button type="button" data-close class="primary">Continue</button>`);
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
  wireOrders();
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
    <p class="muted">Generals ${gens.length}/${MAX_GENERALS} · ${esc(state.difficulty)} · salvage ${state.research.points}</p>
    ${
      gens.length
        ? `<div class="gen-orders">${gens
            .map(
              (g) => `<label class="gen-row"><span>${esc(g.name)} <small>${esc(g.personality)}</small></span>
      <select data-order-gen="${g.id}">${ordersForOfficer(g)
        .map(
          (o) =>
            `<option value="${o.id}"${(g.standingOrder || "auto") === o.id ? " selected" : ""}>${esc(o.label)}</option>`
        )
        .join("")}</select></label>`
            )
            .join("")}</div>`
        : `<p class="muted">Hire from Command, then assign orders here.</p>`
    }
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
    ${r.id === "arctic_slope" ? `<p class="rumor">${esc(legendStatus(state).rumor)}</p>` : ""}
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
const PINNED_TOWN_IDS = ["seek_legend", "drill", "commerce", "cultivate"];

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
  const pinned = $("actions-pinned");
  const town = $("actions");
  const cmd = $("command-actions");
  pinned.innerHTML = "";
  town.innerHTML = "";
  cmd.innerHTML = "";
  const actions = listActions(state).filter((a) => a.id !== "end_week");
  COMMAND_IDS.forEach((id) => {
    const a = actions.find((x) => x.id === id);
    if (a) cmd.appendChild(actionButton(a));
  });
  const townActs = actions.filter((a) => !COMMAND_IDS.includes(a.id));
  PINNED_TOWN_IDS.forEach((id) => {
    const a = townActs.find((x) => x.id === id);
    if (a) pinned.appendChild(actionButton(a));
  });
  townActs.filter((a) => !PINNED_TOWN_IDS.includes(a.id)).forEach((a) => town.appendChild(actionButton(a)));
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
      if (!f.onMap) return false;
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
    .filter((f) => f.onMap && (f.id !== "northern_front" || f.alive))
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

function cityXY(r) {
  const p = r.city || r.label;
  return [p[0], p[1]];
}

function drawInkRoad(ctx, a, b) {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const cx = mx - dy * 0.07;
  const cy = my + dx * 0.07;
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.quadraticCurveTo(cx, cy, b[0], b[1]);
  ctx.strokeStyle = "#4a3014";
  ctx.lineWidth = 5.5;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.strokeStyle = "#d2b06a";
  ctx.lineWidth = 2.2;
  ctx.stroke();
}

function drawCityMark(ctx, r, selected, hover) {
  const [x, y] = cityXY(r);
  const fac = r.owner ? factionOf(state, r.owner) : null;
  const ink = selected ? "#5a2010" : hover ? "#3a2410" : "#2a1c10";
  const fill = fac ? fac.color : "#6a5a40";
  ctx.fillStyle = fill;
  ctx.strokeStyle = ink;
  ctx.lineWidth = selected ? 2.4 : 1.4;
  ctx.fillRect(x - 8, y - 10, 16, 13);
  ctx.strokeRect(x - 8, y - 10, 16, 13);
  ctx.beginPath();
  ctx.moveTo(x - 10, y - 10);
  ctx.lineTo(x, y - 19);
  ctx.lineTo(x + 10, y - 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#d8c490";
  ctx.fillRect(x - 5, y - 7, 4, 6);
  ctx.fillRect(x + 1, y - 7, 4, 6);
  ctx.strokeStyle = ink;
  ctx.strokeRect(x - 5, y - 7, 4, 6);
  ctx.strokeRect(x + 1, y - 7, 4, 6);

  ctx.fillStyle = fill;
  ctx.fillRect(x + 10, y - 18, 3, 16);
  ctx.beginPath();
  ctx.moveTo(x + 13, y - 18);
  ctx.lineTo(x + 24, y - 14);
  ctx.lineTo(x + 13, y - 9);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 1;
  ctx.stroke();

  const p = playerOf(state);
  const known = r.intel > 0 || (p.faction && r.owner === p.faction);
  const garr = known ? String(r.garrison) : "?";
  ctx.font = selected ? "bold 11px Palatino, Times New Roman, serif" : "bold 10px Palatino, Times New Roman, serif";
  const nameW = ctx.measureText(r.short).width;
  ctx.font = "9px Palatino, Times New Roman, serif";
  const garrW = ctx.measureText(garr).width;
  const pw = Math.max(62, nameW + garrW + 22);
  const ph = 20;
  let px = x - pw / 2;
  let py = y + 8;
  px = Math.max(4, Math.min(996 - pw, px));
  if (py + ph > 616) py = y - 40;

  ctx.fillStyle = selected ? "#efe0b8" : hover ? "#e6d4a8" : "#d8c490";
  ctx.fillRect(px, py, pw, ph);
  ctx.strokeStyle = ink;
  ctx.lineWidth = selected ? 2 : 1.3;
  ctx.strokeRect(px, py, pw, ph);
  ctx.strokeStyle = "#c4a060";
  ctx.lineWidth = 1;
  ctx.strokeRect(px + 2, py + 2, pw - 4, ph - 4);
  ctx.fillStyle = fill;
  ctx.fillRect(px + 3, py + 3, 4, ph - 6);
  ctx.fillStyle = "#2a1c10";
  ctx.font = selected ? "bold 11px Palatino, Times New Roman, serif" : "bold 10px Palatino, Times New Roman, serif";
  ctx.fillText(r.short, px + 10, py + 13);
  ctx.font = "9px Palatino, Times New Roman, serif";
  ctx.fillStyle = "#5a3a18";
  ctx.fillText(garr, px + pw - 6 - garrW, py + 14);

  if (p.region === r.id) {
    ctx.fillStyle = "#c9a227";
    ctx.beginPath();
    ctx.arc(x - 14, y - 16, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5a2010";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  if (r.id === "arctic_slope" && legendStatus(state).mapMark) {
    ctx.fillStyle = "#5a2a68";
    ctx.font = "bold 16px Palatino, serif";
    ctx.fillText("?", x + 26, y - 6);
  }
}

function drawMap() {
  const canvas = $("map");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#6d7a74";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(42, 28, 16, 0.08)";
  for (let i = 0; i < 40; i++) {
    ctx.fillRect((i * 97) % w, (i * 53) % h, 3, 2);
  }

  if (state.coast) {
    ctx.beginPath();
    state.coast.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
    ctx.fillStyle = "#d7c49a";
    ctx.fill();
    ctx.strokeStyle = "#3d2a14";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  state.regions.forEach((r) => {
    const fac = r.owner ? factionOf(state, r.owner) : null;
    ctx.beginPath();
    r.polygon.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
    ctx.fillStyle = fac ? fac.colorDark : "#b8a878";
    ctx.globalAlpha = 0.55;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = r.id === selectedRegion ? 2.6 : 1.2;
    ctx.strokeStyle = r.id === selectedRegion ? "#5a2010" : r.id === hoverRegion ? "#7a4a20" : "#4a3418";
    ctx.stroke();
  });

  mapRoads(state.regions).forEach((rd) => drawInkRoad(ctx, rd.a, rd.b));
  state.regions.forEach((r) => drawCityMark(ctx, r, r.id === selectedRegion, r.id === hoverRegion));

  ctx.fillStyle = "#3a2410";
  ctx.font = "12px Palatino, Times New Roman, serif";
  const hunt = legendStatus(state);
  ctx.fillText(
    hunt.revealed
      ? "Ink roads are march lines. Cities that touch are linked."
      : "Ink roads are march lines. ? on the Slope marks an unlisted legend.",
    16,
    22
  );
}

function openBattle() {
  $("battle").hidden = false;
  drawBattle();
}

let flashTimer = null;

function scheduleFlashClear(battle) {
  if (flashTimer) clearTimeout(flashTimer);
  flashTimer = setTimeout(() => {
    flashTimer = null;
    if (state?.battle === battle && battle.flash) {
      battle.flash = null;
      drawBattle();
    }
  }, 160);
}

function terrainFrameInk(t) {
  if (t === "forest") return "#3a4a28";
  if (t === "hills") return "#5a4020";
  if (t === "urban") return "#4a4038";
  if (t === "ice") return "#6a7878";
  return "#7a6840";
}

function drawTerrainGlyph(ctx, t, x, y) {
  ctx.strokeStyle = "rgba(42,28,16,0.55)";
  ctx.fillStyle = "rgba(42,28,16,0.28)";
  ctx.lineWidth = 1;
  if (t === "forest") {
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 14);
    ctx.lineTo(x + 14, y + 4);
    ctx.lineTo(x + 20, y + 14);
    ctx.closePath();
    ctx.fill();
  } else if (t === "hills") {
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 14);
    ctx.quadraticCurveTo(x + 12, y + 2, x + 22, y + 14);
    ctx.stroke();
  } else if (t === "urban") {
    ctx.fillRect(x + 6, y + 6, 6, 8);
    ctx.fillRect(x + 13, y + 4, 5, 10);
  } else if (t === "ice") {
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 6);
    ctx.lineTo(x + 14, y + 12);
    ctx.moveTo(x + 14, y + 6);
    ctx.lineTo(x + 8, y + 12);
    ctx.stroke();
  }
}

function unitAbbrev(u) {
  if (u.type === "technical") return "TRK";
  if (u.type === "regular") return "REG";
  if (u.type === "militia") return "MIL";
  return (u.label || "UNT").slice(0, 3).toUpperCase();
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
  const colors = { plains: "#c4b07a", forest: "#6a7a48", hills: "#8a7048", urban: "#8a7a68", ice: "#b8c4b8" };
  ctx.fillStyle = "#3a2a16";
  ctx.fillRect(0, 0, cw, ch);
  for (let y = 0; y < b.rows; y++) {
    for (let x = 0; x < b.cols; x++) {
      const t = b.grid[y][x];
      const rx = x * gw + 2;
      const ry = y * gh + 2;
      const rw = gw - 4;
      const rh = gh - 4;
      ctx.fillStyle = colors[t] || "#a89868";
      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeStyle = terrainFrameInk(t);
      ctx.lineWidth = 2;
      ctx.strokeRect(rx + 1, ry + 1, rw - 2, rh - 2);
      ctx.strokeStyle = "rgba(42,28,16,0.35)";
      ctx.lineWidth = 1;
      ctx.strokeRect(rx + 4, ry + 4, rw - 8, rh - 8);
      drawTerrainGlyph(ctx, t, rx, ry);
    }
  }
  if (b.flash) {
    const fx = b.flash.x * gw;
    const fy = b.flash.y * gh;
    ctx.fillStyle = "rgba(240, 208, 144, 0.5)";
    ctx.fillRect(fx + 3, fy + 3, gw - 6, gh - 6);
    ctx.strokeStyle = "#f0d090";
    ctx.lineWidth = 3;
    ctx.strokeRect(fx + 6, fy + 6, gw - 12, gh - 12);
    scheduleFlashClear(b);
  }
  b.units.forEach((u) => {
    if (u.hp <= 0) return;
    const cx = u.x * gw + gw / 2;
    const cy = u.y * gh + gh / 2;
    const col = u.side === "atk" ? "#c9a227" : "#8a3030";
    const face = u.side === "atk" ? "#3a2a14" : "#2a1010";
    const cwct = 46;
    const chct = 38;
    const ox = cx - cwct / 2;
    const oy = cy - chct / 2 - 2;
    if (b.selected === u.id) {
      ctx.strokeStyle = "#f0d090";
      ctx.lineWidth = 2;
      ctx.strokeRect(ox - 4, oy - 4, cwct + 8, chct + 8);
    }
    ctx.fillStyle = face;
    ctx.fillRect(ox, oy, cwct, chct);
    ctx.strokeStyle = col;
    ctx.lineWidth = 2.2;
    ctx.strokeRect(ox, oy, cwct, chct);
    ctx.strokeStyle = "#2a1c10";
    ctx.lineWidth = 1;
    ctx.strokeRect(ox + 2, oy + 2, cwct - 4, chct - 4);
    ctx.fillStyle = col;
    ctx.fillRect(ox + 3, oy + 3, 5, chct - 6);
    ctx.fillStyle = "#f3e6c8";
    ctx.font = "bold 11px Palatino, Times New Roman, serif";
    ctx.fillText(unitAbbrev(u), ox + 11, oy + 15);
    ctx.font = "bold 12px Palatino, Times New Roman, serif";
    ctx.fillText(String(Math.max(0, u.hp)), ox + 11, oy + 28);
    ctx.fillStyle = "#2a1c10";
    ctx.fillRect(ox + 3, oy + chct - 7, cwct - 6, 4);
    ctx.fillStyle = u.hp / u.maxHp > 0.35 ? "#4a6a32" : "#8a3030";
    ctx.fillRect(ox + 3, oy + chct - 7, (cwct - 6) * (u.hp / u.maxHp), 4);
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

function wireOrders() {
  document.querySelectorAll("[data-order-gen]").forEach((sel) => {
    sel.onchange = () => {
      const res = setGeneralOrder(state, sel.dataset.orderGen, sel.value);
      toast(res.message);
      render();
    };
  });
}

function refreshCreator() {
  const name = document.getElementById("c-name")?.value;
  const port = document.getElementById("c-portrait");
  if (port) port.textContent = portraitInitials(name);
  const sel = document.getElementById("c-type");
  const hint = document.getElementById("c-skills");
  if (sel && hint) {
    hint.textContent = `Skills: ${skillsForPersonality(sel.value).map((id) => orderLabel(id)).join(", ")}`;
  }
  const nums = ["c-war", "c-int", "c-pol", "c-chr"].map((id) => Number(document.getElementById(id)?.value || 0));
  const bud = document.getElementById("c-budget");
  if (bud) {
    const sum = nums.reduce((s, n) => s + n, 0);
    bud.textContent = `Budget ${sum}/${CUSTOM_STAT_BUDGET}`;
    bud.classList.toggle("minus", sum > CUSTOM_STAT_BUDGET);
  }
}

function wireAfterRender() {
  const add = document.getElementById("c-add");
  if (add) {
    refreshCreator();
    ["c-name", "c-type", "c-war", "c-int", "c-pol", "c-chr"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", refreshCreator);
        el.addEventListener("change", refreshCreator);
      }
    });
    add.onclick = () => {
      const name = document.getElementById("c-name").value;
      const res = createCustomOfficer(state, {
        name,
        title: document.getElementById("c-title")?.value,
        personality: document.getElementById("c-type")?.value,
        war: Number(document.getElementById("c-war")?.value),
        int: Number(document.getElementById("c-int")?.value),
        pol: Number(document.getElementById("c-pol")?.value),
        chr: Number(document.getElementById("c-chr")?.value),
      });
      toast(res.ok ? `${name} added to the free roster.` : res.message);
      showModal(officersHtml(), { kind: "officers" });
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
