import { bakeScenes, sceneUrl } from "./scenes.js";
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

export async function boot(loaded) {
  content = loaded;
  bindChrome();
  try {
    await bakeScenes();
  } catch (err) {
    console.warn("scene bake failed", err);
  }
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
    if (params.get("cat") === "domestic" || params.get("panel") === "drill") commandCat = "domestic";
    render();
    if (params.get("panel") === "officers") showModal(officersHtml(), { kind: "officers" });
    if (params.get("panel") === "spy") {
      showEventScene({
        id: "spy",
        title: "Spy",
        text: "Glass on the next ridge. A scout marked the Slope garrison and the watch towers.",
      });
    }
    if (params.get("panel") === "drill") {
      showEventScene({
        id: "drill",
        title: "Drill",
        text: "Range time on the snow. M16A2, AK-47, surplus webbing — not 2020s kit.",
      });
    }
    if (params.get("fx") === "travel") pulseTravel("bethel", "fairbanks");
    afterFonts();
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
    afterFonts();
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
    afterFonts();
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
    afterFonts();
    return;
  }
  const saved = localStorage.getItem(SAVE_KEY);
  showModal(titleScreenHtml(!!saved));
  afterFonts();
}

function afterFonts() {
  const again = () => {
    if (state) render();
  };
  if (document.fonts?.ready) document.fonts.ready.then(again).catch(() => {});
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
  $("event-close").onclick = hideEventScene;
  $("event-scene").onclick = (e) => {
    if (e.target.id === "event-scene") hideEventScene();
  };
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
      <li>Hire up to 5 generals, then set their standing order. Personality type gates skills (ROTK7-style). March/Attack is under Military.</li>
      <li>Hidden legend: <strong>Seek Legend</strong> on Plot (or Spy the Arctic Slope) for the rumor, then travel Fairbanks → Slope and Seek again to list Ilya Karr.</li>
      <li>Spy, rumor, persuade, hide, and alliances are under Plot. Drill and markets are Domestic.</li>
      <li>Tech is 1985–89 salvage + calendar (M16A2, AK-47, Jeeps, M113s, Hueys, A-10/F-14). No leapfrog, no drones.</li>
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
  return `<h2>Officers (${visibleOfficers(state).length} visible)</h2>${locked}<p class="muted">Roster is data-driven (cap ${state.contentMeta.rosterCap}). Hidden legends stay off this list until found.</p>${rows}
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
  const fromId = playerOf(state).region;
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
  if (id === "travel" && extra?.regionId) pulseTravel(fromId, extra.regionId);
  if (res.revealed) {
    showEventScene({
      id: "seek_legend",
      title: "Legend listed",
      text: `${res.officerName || "Ilya Karr"} answers on the Arctic Slope. Original character — a hidden free officer. Hire him if you share the Slope.`,
    });
  } else if (SCENE_ACTIONS.has(id) && !res.weekEnd) {
    const a = listActions(state).find((x) => x.id === id);
    showEventScene({
      id,
      title: a?.label || id,
      text: res.message || "The room goes still.",
    });
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
  $("officer-plate").innerHTML = officerHtml();
  $("city-stats").innerHTML = cityHtml();
  renderActions();
  renderLog();
  renderLegend();
  drawMap();
  wireOrders();
  wireAfterRender();
  if (state.phase === "battle") openBattle();
  else $("battle").hidden = true;
}

const PORTRAIT_SRC = "art/portraits/portrait-commander.png";

function officerHtml() {
  const p = playerOf(state);
  const gens = playerGenerals(state);
  const fac = p.faction ? factionOf(state, p.faction) : null;
  const here = regionOf(state, p.region);
  return `
    <img class="officer-face" src="${PORTRAIT_SRC}" alt="" />
    <div class="officer-meta">
      <h2>${esc(p.name)}</h2>
      <p>${esc(p.title)} · ${fac ? esc(fac.short) : "FREE"}</p>
      <div class="plate-stats">
        <span class="pill">AP ${state.ap}/${apMax(state)}</span>
        <span class="pill">W${state.week}</span>
        <span class="pill">${esc(state._season?.name || "")}</span>
        <span class="pill">${esc(here?.short || "?")}</span>
      </div>
      <p class="muted">WAR ${p.war} INT ${p.int} POL ${p.pol} CHR ${p.chr}</p>
      ${
        gens.length
          ? `<div class="gen-orders">${gens
              .map(
                (g) => `<label class="gen-row"><span>${esc(g.name)}</span>
        <select data-order-gen="${g.id}">${ordersForOfficer(g)
          .map(
            (o) =>
              `<option value="${o.id}"${(g.standingOrder || "auto") === o.id ? " selected" : ""}>${esc(o.label)}</option>`
          )
          .join("")}</select></label>`
              )
              .join("")}</div>`
          : `<p class="muted">Hire under Plot.</p>`
      }
    </div>
  `;
}

function cityHtml() {
  const r = regionOf(state, selectedRegion) || regionOf(state, playerOf(state).region);
  const f = r.owner ? factionOf(state, r.owner) : null;
  const known = r.intel > 0 || (playerOf(state).faction && r.owner === playerOf(state).faction);
  const garr = known ? r.garrison : "???";
  const walls = known ? r.walls : "?";
  return `
    <h2>${esc(r.short)} · ${f ? esc(f.short) : "OPEN"}</h2>
    <div class="city-grid">
      <span class="pill"><span>GOLD</span><strong>${state.gold}</strong></span>
      <span class="pill"><span>FOOD</span><strong>${state.food}</strong></span>
      <span class="pill"><span>POP</span><strong>${r.population || "?"}</strong></span>
      <span class="pill"><span>DEF</span><strong>${garr}/${walls}</strong></span>
    </div>
    ${r.id === "arctic_slope" ? `<p class="rumor">${esc(legendStatus(state).rumor)}</p>` : ""}
  `;
}

function weekReportHtml(report) {
  const lines = report || [];
  const headline = lines[0] || `Week ${state.week}`;
  const ai = lines.filter((l) => /\[[a-z]+\]/.test(l)).slice(0, 6);
  const extra = Math.max(0, lines.length - 1 - ai.length);
  return `<div class="event-art week-art"><img src="${sceneUrl("hire")}" alt="" /><img class="event-face" src="${PORTRAIT_SRC}" alt="" /></div>
    <h2>Week ${state.week}</h2>
    <p>${esc(headline)}</p>
    <ul class="week-ai">${ai.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
    <p class="muted">${extra ? `${extra} more in the field log. ` : ""}Personality tags are in [brackets].</p>
    <button type="button" data-close class="primary">Continue</button>`;
}

const ACTION_CATS = {
  domestic: ["raise_banner", "drill", "commerce", "cultivate", "fortify", "safety", "research"],
  plot: ["seek_legend", "spy", "hire", "ally", "break_ally", "rumor", "persuade", "hide"],
  military: ["travel", "attack"],
};
const SCENE_ACTIONS = new Set([
  "raise_banner",
  "drill",
  "commerce",
  "cultivate",
  "fortify",
  "safety",
  "research",
  "seek_legend",
  "spy",
  "hire",
  "ally",
  "break_ally",
  "rumor",
  "persuade",
  "hide",
  "travel",
]);
let commandCat = "plot";

function sceneArt(id) {
  return sceneUrl(id);
}

function actionButton(a) {
  const b = document.createElement("button");
  b.type = "button";
  b.dataset.id = a.id;
  b.disabled = !a.enabled || (a.ap > 0 && state.ap < a.ap);
  b.innerHTML = `<img class="cmd-thumb" src="${sceneArt(a.id)}" alt="" /><span>${esc(a.label)}<small>AP ${a.ap}${a.enabled ? "" : " · locked"}</small></span>`;
  b.title = a.hint;
  b.onclick = () => startAction(a);
  return b;
}

function renderActions() {
  const tabs = $("cmd-tabs");
  const box = $("cmd-actions");
  tabs.innerHTML = "";
  box.innerHTML = "";
  const actions = listActions(state).filter((a) => a.id !== "end_week");
  [
    ["domestic", "Domestic", "drill"],
    ["plot", "Plot", "spy"],
    ["military", "Military", "attack"],
  ].forEach(([id, label, artId]) => {
    const t = document.createElement("button");
    t.type = "button";
    t.className = "cmd-tab" + (commandCat === id ? " active" : "");
    t.innerHTML = `<img src="${sceneArt(artId)}" alt="" /><span>${label}</span>`;
    t.onclick = () => {
      commandCat = id;
      renderActions();
    };
    tabs.appendChild(t);
  });
  ACTION_CATS[commandCat].forEach((id) => {
    const a = actions.find((x) => x.id === id);
    if (a) box.appendChild(actionButton(a));
  });
}

function showEventScene(ev) {
  $("event-vignette").src = sceneArt(ev.id);
  $("event-portrait").src = PORTRAIT_SRC;
  $("event-title").textContent = ev.title || "Event";
  $("event-text").textContent = ev.text || "";
  const el = $("event-scene");
  el.hidden = false;
  el.classList.remove("open");
  void el.offsetWidth;
  el.classList.add("open");
}

function hideEventScene() {
  $("event-scene").hidden = true;
  $("event-scene").classList.remove("open");
}

function startAction(a) {
  if (a.needs === "region" || a.needs === "neighbor") {
    const list = a.needs === "neighbor" ? neighborRegions(state) : state.regions;
    showModal(`<h2>${esc(a.label)}</h2>${list.map((r) => `<button class="list-btn" data-act="${a.id}" data-region="${r.id}"><img class="cmd-thumb" src="${sceneArt(a.id)}" alt="" /><span>${esc(r.name)}</span></button>`).join("")}<button data-close>Cancel</button>`);
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
    showModal(`<h2>Hire</h2>${cs.map((o) => `<button class="list-btn" data-hire="${o.id}"><img class="cmd-thumb" src="${sceneArt("hire")}" alt="" /><span>${esc(o.name)} · ${o.personality} · CHR check · ambition ${o.ambition}</span></button>`).join("")}<button data-close>Cancel</button>`);
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
    showModal(`<h2>${esc(a.label)}</h2>${list.map((f) => `<button class="list-btn" data-fac="${f.id}"><img class="cmd-thumb" src="${sceneArt(a.id)}" alt="" /><span>${esc(f.name)} · rel ${getRelation(state, p.faction, f.id)}</span></button>`).join("")}<button data-close>Cancel</button>`);
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
    showModal(`<h2>${esc(a.label)}</h2>${list.map((o) => `<button class="list-btn" data-off="${o.id}"><img class="cmd-thumb" src="${sceneArt(a.id)}" alt="" /><span>${esc(o.name)} · ${o.personality} · ${o.faction ? factionOf(state, o.faction)?.short : "free"} · loy ${o.loyalty}</span></button>`).join("")}<button data-close>Cancel</button>`);
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
      ${list.map((r) => `<button class="list-btn" data-atk="${r.id}"><img class="cmd-thumb" src="${sceneArt("attack")}" alt="" /><span>${esc(r.name)} · ${r.owner ? factionOf(state, r.owner)?.short : "open"} · garr ${r.intel || r.owner === playerOf(state).faction ? r.garrison : "?"}</span></button>`).join("")}
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

const MAP_S = 4;
const LOW_W = 250;
const LOW_H = 155;
const PX_FONT = "8px 'Press Start 2P', 'Courier New', monospace";
const ditherCache = new Map();

function lowPt(p) {
  return [Math.floor(p[0] / MAP_S), Math.floor(p[1] / MAP_S)];
}

function dither(ctx, a, b) {
  const key = `${a}|${b}`;
  if (ditherCache.has(key)) return ditherCache.get(key);
  const c = document.createElement("canvas");
  c.width = 2;
  c.height = 2;
  const x = c.getContext("2d");
  x.fillStyle = a;
  x.fillRect(0, 0, 1, 1);
  x.fillRect(1, 1, 1, 1);
  x.fillStyle = b;
  x.fillRect(1, 0, 1, 1);
  x.fillRect(0, 1, 1, 1);
  const pat = ctx.createPattern(c, "repeat");
  ditherCache.set(key, pat);
  return pat;
}

function walkLine(x0, y0, x1, y1, plot) {
  x0 |= 0;
  y0 |= 0;
  x1 |= 0;
  y1 |= 0;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  for (;;) {
    plot(x0, y0);
    if (x0 === x1 && y0 === y1) break;
    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

function drawPixelRoad(ctx, a, b) {
  const [x0, y0] = lowPt(a);
  const [x1, y1] = lowPt(b);
  const pulse = mapFx?.kind === "travel" && sameRoad(a, b, mapFx.a, mapFx.b);
  const on = pulse && Math.floor((performance.now() - mapFx.t0) / 70) % 2 === 0;
  walkLine(x0, y0, x1, y1, (x, y) => {
    ctx.fillStyle = on ? "#f8d800" : "#503010";
    ctx.fillRect(x - 1, y - 1, 3, 3);
  });
  walkLine(x0, y0, x1, y1, (x, y) => {
    ctx.fillStyle = on ? "#f8f8f8" : "#c8a038";
    ctx.fillRect(x, y, 1, 1);
  });
}

function sameRoad(a, b, c, d) {
  if (!c || !d) return false;
  const k = (p, q) => `${p[0] | 0},${p[1] | 0}|${q[0] | 0},${q[1] | 0}`;
  return k(a, b) === k(c, d) || k(a, b) === k(d, c);
}

let mapFx = null;

function pulseTravel(fromId, toId) {
  const a = regionOf(state, fromId);
  const b = regionOf(state, toId);
  if (!a || !b) return;
  mapFx = { kind: "travel", a: cityXY(a), b: cityXY(b), hop: true, t0: performance.now() };
  const tick = () => {
    drawMap();
    if (mapFx && performance.now() - mapFx.t0 < 420) requestAnimationFrame(tick);
    else mapFx = null;
  };
  requestAnimationFrame(tick);
}

function drawCityMark(ctx, r, selected) {
  const [x, y] = lowPt(cityXY(r));
  const fac = r.owner ? factionOf(state, r.owner) : null;
  const fill = fac ? fac.color : "#607838";
  const ink = selected ? "#f8d800" : "#f8f8f8";
  ctx.fillStyle = "#000018";
  ctx.fillRect(x - 3, y - 4, 7, 7);
  ctx.fillStyle = fill;
  ctx.fillRect(x - 2, y - 3, 5, 5);
  ctx.fillStyle = ink;
  ctx.fillRect(x - 1, y - 2, 1, 1);
  ctx.fillRect(x + 1, y - 2, 1, 1);
  ctx.fillRect(x, y, 1, 1);
  ctx.fillStyle = fill;
  ctx.fillRect(x + 3, y - 5, 1, 4);
  ctx.fillRect(x + 4, y - 5, 2, 2);
  const p = playerOf(state);
  if (p.region === r.id) {
    const hop = mapFx?.hop && Math.floor((performance.now() - mapFx.t0) / 80) % 2 === 0 ? -2 : 0;
    ctx.fillStyle = "#f8d800";
    ctx.fillRect(x - 4, y - 5 + hop, 2, 2);
  }
  if (r.id === "arctic_slope" && legendStatus(state).mapMark) {
    ctx.fillStyle = "#d080f8";
    ctx.fillRect(x + 4, y - 1, 2, 2);
  }
}

function drawCityPlate(ctx, r, selected) {
  const [x, y] = cityXY(r);
  const fac = r.owner ? factionOf(state, r.owner) : null;
  const p = playerOf(state);
  const known = r.intel > 0 || (p.faction && r.owner === p.faction);
  const garr = known ? String(r.garrison) : "?";
  ctx.font = PX_FONT;
  const nameW = ctx.measureText(r.short).width;
  const garrW = ctx.measureText(garr).width;
  const pw = Math.max(72, Math.ceil((nameW + garrW + 20) / 4) * 4);
  const ph = 16;
  let px = Math.round(x - pw / 2);
  let py = Math.round(y + 16);
  px = Math.max(4, Math.min(996 - pw, px));
  if (py + ph > 616) py = Math.round(y - 36);
  ctx.fillStyle = "#000018";
  ctx.fillRect(px - 4, py - 4, pw + 8, ph + 8);
  ctx.fillStyle = selected ? "#f8d800" : "#f8f8f8";
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = "#101050";
  ctx.fillRect(px + 4, py + 4, pw - 8, ph - 8);
  ctx.fillStyle = fac ? fac.color : "#607838";
  ctx.fillRect(px + 4, py + 4, 4, ph - 8);
  ctx.fillStyle = "#f8d800";
  ctx.fillText(r.short, px + 10, py + 12);
  ctx.fillStyle = "#f8f8f8";
  ctx.fillText(garr, px + pw - 8 - garrW, py + 12);
}

function drawMap() {
  const canvas = $("map");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  if (!drawMap.off) {
    drawMap.off = document.createElement("canvas");
    drawMap.off.width = LOW_W;
    drawMap.off.height = LOW_H;
  }
  const o = drawMap.off.getContext("2d");
  o.imageSmoothingEnabled = false;
  for (let y = 0; y < LOW_H; y += 2) {
    for (let x = 0; x < LOW_W; x += 2) {
      o.fillStyle = ((x + y) >> 1) % 2 ? "#082038" : "#103058";
      o.fillRect(x, y, 2, 2);
    }
  }
  if (state.coast) {
    o.beginPath();
    state.coast.forEach((p, i) => {
      const [x, y] = lowPt(p);
      i ? o.lineTo(x, y) : o.moveTo(x, y);
    });
    o.closePath();
    o.fillStyle = dither(o, "#2a5028", "#386830");
    o.fill();
  }
  state.regions.forEach((r) => {
    const fac = r.owner ? factionOf(state, r.owner) : null;
    o.beginPath();
    r.polygon.forEach((p, i) => {
      const [x, y] = lowPt(p);
      i ? o.lineTo(x, y) : o.moveTo(x, y);
    });
    o.closePath();
    o.fillStyle = dither(o, fac ? fac.colorDark : "#486030", fac ? fac.color : "#607838");
    o.fill();
    o.lineWidth = 1;
    o.strokeStyle = r.id === selectedRegion ? "#f8d800" : r.id === hoverRegion ? "#f8f8f8" : "#203040";
    o.stroke();
  });
  mapRoads(state.regions).forEach((rd) => drawPixelRoad(o, rd.a, rd.b));
  state.regions.forEach((r) => drawCityMark(o, r, r.id === selectedRegion));

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(drawMap.off, 0, 0, 1000, 620);
  ctx.imageSmoothingEnabled = false;
  state.regions.forEach((r) => drawCityPlate(ctx, r, r.id === selectedRegion));
  ctx.fillStyle = "#f8d800";
  ctx.font = PX_FONT;
  const hunt = legendStatus(state);
  ctx.fillText(hunt.revealed ? "ROADS = MARCH LINES" : "ROADS = MARCH. ? = LEGEND", 12, 16);
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
  ctx.fillStyle = "#000018";
  if (t === "forest") {
    ctx.fillRect(x + 8, y + 4, 8, 4);
    ctx.fillRect(x + 12, y + 8, 4, 8);
  } else if (t === "hills") {
    ctx.fillRect(x + 4, y + 12, 16, 4);
    ctx.fillRect(x + 8, y + 8, 8, 4);
  } else if (t === "urban") {
    ctx.fillRect(x + 6, y + 8, 8, 8);
    ctx.fillRect(x + 16, y + 4, 6, 12);
  } else if (t === "ice") {
    ctx.fillRect(x + 8, y + 6, 4, 4);
    ctx.fillRect(x + 14, y + 10, 4, 4);
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
  const colors = {
    plains: ["#c0a050", "#887838"],
    forest: ["#306830", "#184818"],
    hills: ["#886838", "#503018"],
    urban: ["#686868", "#404040"],
    ice: ["#80a0b0", "#487088"],
  };
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#000018";
  ctx.fillRect(0, 0, cw, ch);
  for (let y = 0; y < b.rows; y++) {
    for (let x = 0; x < b.cols; x++) {
      const t = b.grid[y][x];
      const pair = colors[t] || ["#607838", "#304018"];
      const rx = Math.floor(x * gw);
      const ry = Math.floor(y * gh);
      const rw = Math.floor(gw);
      const rh = Math.floor(gh);
      for (let ty = 4; ty < rh - 4; ty += 8) {
        for (let tx = 4; tx < rw - 4; tx += 8) {
          ctx.fillStyle = ((tx + ty) >> 3) % 2 ? pair[0] : pair[1];
          ctx.fillRect(rx + tx, ry + ty, 8, 8);
        }
      }
      ctx.fillStyle = "#000018";
      ctx.fillRect(rx, ry, rw, 4);
      ctx.fillRect(rx, ry, 4, rh);
      ctx.fillRect(rx + rw - 4, ry, 4, rh);
      ctx.fillRect(rx, ry + rh - 4, rw, 4);
      ctx.fillStyle = terrainFrameInk(t);
      ctx.fillRect(rx + 4, ry + 4, rw - 8, 4);
      ctx.fillRect(rx + 4, ry + 4, 4, rh - 8);
      drawTerrainGlyph(ctx, t, rx, ry);
    }
  }
  if (b.flash) {
    const fx = Math.floor(b.flash.x * gw);
    const fy = Math.floor(b.flash.y * gh);
    ctx.fillStyle = Math.floor(Date.now() / 80) % 2 ? "#f8d800" : "#f8f8f8";
    ctx.fillRect(fx + 4, fy + 4, Math.floor(gw) - 8, Math.floor(gh) - 8);
    scheduleFlashClear(b);
  }
  b.units.forEach((u) => {
    if (u.hp <= 0) return;
    const cx = u.x * gw + gw / 2;
    const cy = u.y * gh + gh / 2;
    const col = u.side === "atk" ? "#f8d800" : "#f03030";
    const face = "#000030";
    const cwct = 48;
    const chct = 40;
    const ox = Math.round(cx - cwct / 2);
    const oy = Math.round(cy - chct / 2);
    if (b.selected === u.id) {
      ctx.fillStyle = "#f8f8f8";
      ctx.fillRect(ox - 8, oy - 8, cwct + 16, chct + 16);
    }
    ctx.fillStyle = "#000018";
    ctx.fillRect(ox - 4, oy - 4, cwct + 8, chct + 8);
    ctx.fillStyle = col;
    ctx.fillRect(ox, oy, cwct, chct);
    ctx.fillStyle = face;
    ctx.fillRect(ox + 4, oy + 4, cwct - 8, chct - 8);
    ctx.fillStyle = col;
    ctx.fillRect(ox + 4, oy + 4, 4, chct - 8);
    ctx.fillStyle = "#f8f8f8";
    ctx.font = PX_FONT;
    ctx.fillText(unitAbbrev(u), ox + 12, oy + 16);
    ctx.fillText(String(Math.max(0, u.hp)), ox + 12, oy + 28);
    ctx.fillStyle = "#000018";
    ctx.fillRect(ox + 4, oy + chct - 10, cwct - 8, 6);
    ctx.fillStyle = u.hp / u.maxHp > 0.35 ? "#30c030" : "#f03030";
    ctx.fillRect(ox + 4, oy + chct - 10, Math.floor((cwct - 8) * (u.hp / u.maxHp)), 6);
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
