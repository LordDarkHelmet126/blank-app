import { bakeScenes, sceneUrl } from "./scenes.js";
import {
  drawTravelConvoy,
  isArcticRegion,
  paintBattleCharge,
  paintBattleSky,
  paintChargeVignette,
  paintSeasonVignette,
} from "./sprites.js";
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
  courtCandidates,
  sampleChronicle,
  calendarYear,
  seasonPalette,
  playerCourt,
  appointCandidates,
  legendBoard,
  openMissions,
  seedDemoMissions,
  missionCopy,
} from "./engine.js";

const SAVE_KEY = "northern-front-v01";
let content;
let state;
let selectedRegion = "bethel";
let hoverRegion = null;

const $ = (id) => document.getElementById(id);

function parseDemoFx(params) {
  const demo = params.get("demo") || "";
  const fx = params.get("fx") || "";
  if (fx === "travel" || demo === "travel" || demo === "fx=travel") return "travel";
  if (fx === "battle" || demo === "battle" || demo === "fx=battle") return "battle";
  return "";
}

function startSliceState() {
  state = createNewGame(content, {
    name: "Alex Rourke",
    background: "scout",
    difficulty: "normal",
    seed: 7,
  });
  act(state, content, "raise_banner");
  selectedRegion = "bethel";
  hideModal();
}

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
  const fxKind = parseDemoFx(params);
  if (params.get("demo") === "slice" || fxKind) {
    startSliceState();
    if (params.get("cat") === "domestic" || params.get("panel") === "drill") commandCat = "domestic";
    if (params.get("cat") === "military") commandCat = "military";
    render();
    if (params.get("panel") === "officers") showModal(officersHtml(), { kind: "officers" });
    if (params.get("panel") === "spy") {
      showEventScene({
        id: "spy",
        title: "Spy",
        text: "Glass on the next ridge. A scout marked the Slope garrison and the watch towers.",
        regionId: "arctic_slope",
      });
    }
    if (params.get("panel") === "drill") {
      showEventScene({
        id: "drill",
        title: "Drill",
        text: "Range time on dry grass. M16A2, AK-47, surplus webbing — not 2020s kit.",
      });
    }
    if (params.get("panel") === "travel") {
      showEventScene({
        id: "travel",
        title: "March",
        text: "Jeep pickups and militia horse scouts take the ranch road. Original partisan column — 1980s kit.",
        regionId: "bethel",
      });
    }
    if (fxKind === "travel") pulseTravel("bethel", "fairbanks", { loop: true });
    if (fxKind === "battle") {
      const home = regionOf(state, "bethel");
      home.garrison = 90;
      const fight = act(state, content, "attack", { regionId: "nome" });
      if (fight.battle && state.battle) {
        state.battle.flash = { x: 3, y: 2, side: "atk", hold: true };
        openBattle();
      }
    }
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
  if (params.get("demo") === "coach") {
    state = createNewGame(content, {
      name: "Alex Rourke",
      background: "scout",
      difficulty: "normal",
      seed: 7,
    });
    selectedRegion = "bethel";
    commandCat = "domestic";
    coachForced = true;
    coachOn = true;
    coachStep = 0;
    hideModal();
    render();
    openCoach();
    afterFonts();
    return;
  }
  if (params.get("demo") === "chronicle") {
    startSliceState();
    commandCat = "plot";
    const sample = sampleChronicle(state);
    state._season = { id: "summer", name: "Summer", weather: "clear", commerce: 1.12, food: 1.16, march: 1 };
    hideModal();
    render();
    openChronicle(sample.chronicle);
    afterFonts();
    return;
  }
  if (params.get("demo") === "season") {
    startSliceState();
    state.week = 13;
    state._season = { id: "spring", name: "Spring", weather: "fog", commerce: 0.9, food: 1, march: 0.95 };
    hideModal();
    render();
    openChronicle([
      {
        kind: "season",
        id: "season",
        title: "Spring 1985",
        text: "Week 13. Breakup mud and new grass in the foothills. The ranch road thaws.",
        season: "spring",
      },
    ]);
    afterFonts();
    return;
  }
  if (params.get("demo") === "generals") {
    startSliceState();
    ["hart", "cole", "nash"].forEach((id, i) => {
      const o = state.officers.find((x) => x.id === id);
      if (!o) return;
      o.faction = "northern_front";
      o.region = "bethel";
      o.loyalty = 80;
      o.isGeneral = true;
      o.standingOrder = i === 0 ? "drill" : i === 1 ? "mission" : "commerce";
    });
    selectedRegion = "bethel";
    commandCat = "plot";
    hideModal();
    render();
    afterFonts();
    return;
  }
  if (params.get("demo") === "missions") {
    startSliceState();
    seedDemoMissions(state);
    const hart = state.officers.find((o) => o.id === "hart");
    if (hart) {
      hart.faction = "northern_front";
      hart.loyalty = 80;
      hart.isGeneral = true;
      hart.standingOrder = "mission";
      hart.region = "bethel";
    }
    selectedRegion = "bethel";
    commandCat = "military";
    hideModal();
    render();
    showModal(missionsHtml(), { kind: "missions" });
    wireAfterRender();
    if (params.get("take") === "1") {
      const local = openMissions(state).find((j) => j.regionId === playerOf(state).region);
      if (local) run("mission", { jobId: local.id });
    }
    afterFonts();
    return;
  }
  if (params.get("demo") === "layout") {
    startSliceState();
    ["hart", "cole", "nash"].forEach((id, i) => {
      const o = state.officers.find((x) => x.id === id);
      if (!o) return;
      o.faction = "northern_front";
      o.region = "bethel";
      o.loyalty = 80;
      o.isGeneral = true;
      o.standingOrder = i === 0 ? "drill" : i === 1 ? "mission" : "commerce";
    });
    selectedRegion = "bethel";
    commandCat = "domestic";
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
  $("btn-coach").onclick = () => {
    coachOn = true;
    coachStep = 0;
    openCoach();
    render();
  };
  $("coach-next").onclick = () => {
    if (coachStep < COACH_STEPS.length - 1) {
      coachStep += 1;
      openCoach();
      render();
    } else {
      finishCoach(false);
    }
  };
  $("coach-skip").onclick = () => finishCoach(true);
  document.querySelectorAll("[data-tip]").forEach((el) => bindTip(el, el.getAttribute("data-tip")));
  $("btn-officers").onclick = () => {
    showModal(officersHtml(), { kind: "officers" });
    wireAfterRender();
  };
  $("btn-factions").onclick = () => showModal(factionsHtml());
  $("btn-missions").onclick = () => {
    showModal(missionsHtml(), { kind: "missions" });
    wireAfterRender();
  };
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
    <p class="muted">Original IP. Alaska officer sandbox. Not a licensed war film or Koei title.</p>
    <h1>NORTHERN FRONT</h1>
    <p><strong>Click Begin week 0.</strong> You start alone in Bethel. First job: raise a banner, spend AP, then End Week.</p>
    <p>Occupiers already hold Anchorage, the Slope, Kenai, and Kodiak. Hire up to five generals later, or stay a ghost.</p>
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
      commandCat = "domestic";
      hideModal();
      render();
      if (coachForced || localStorage.getItem(COACH_KEY) !== "skip") {
        coachOn = true;
        coachStep = 0;
        openCoach();
      }
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
  const helpCoach = $("modal-card").querySelector("#help-coach");
  if (helpCoach) {
    helpCoach.onclick = () => {
      hideModal();
      coachOn = true;
      coachStep = 0;
      openCoach();
      render();
    };
  }
}

function hideModal() {
  $("modal").hidden = true;
  $("modal-card").className = "modal-card";
}

function nextHint(st) {
  if (!st || st.gameOver) return "Campaign closed.";
  if (st.phase === "battle") return "BATTLE: click a yellow unit, then an adjacent tile to step or fire — or Auto-resolve.";
  const p = playerOf(st);
  const here = regionOf(st, p.region);
  const gens = playerGenerals(st);
  const jobs = openMissions(st);
  const localJob = jobs.find((j) => j.regionId === p.region);
  if (!p.faction) return "NEXT: Domestic → Raise Banner. Claims Bethel and founds Northern Front (1 AP).";
  if (st.ap <= 0) return "NEXT: End Week (top right). Neighbors act, then you get a fresh AP pool.";
  if (gens.length === 0) return "NEXT: Plot → Hire a free officer in this city. They fill general slot 1 of 5.";
  if (gens.length < MAX_GENERALS && hireCandidates(st).length) {
    return `NEXT: Plot → Hire (${gens.length}/5 generals). Empty ADD slots sit on the You card.`;
  }
  if (localJob) return `NEXT: Military → Side Mission: ${localJob.name} in this city (1 AP).`;
  if (jobs.length) return `NEXT: ${jobs.length} side missions on the board — Travel to the city, or set a general to Side mission.`;
  if (here && ownedHere(st, here) && here.garrison < 24) return "NEXT: Drill to raise the levy, or Military → Travel a gold road.";
  return `NEXT: ${st.ap} AP left — click a Command tile, or End Week.`;
}

function ownedHere(st, here) {
  const p = playerOf(st);
  return !!(p.faction && here && here.owner === p.faction);
}

function renderObjective() {
  const bar = $("objective");
  if (!state) {
    bar.hidden = true;
    return;
  }
  bar.hidden = false;
  $("obj-kicker").textContent = `WEEK ${state.week} · AP ${state.ap}/${apMax(state)}`;
  $("obj-text").textContent = nextHint(state);
}

function openCoach() {
  const step = COACH_STEPS[coachStep] || COACH_STEPS[0];
  if (step.cat) commandCat = step.cat;
  $("coach").hidden = false;
  $("coach-title").textContent = step.title;
  $("coach-text").textContent = step.body;
  $("coach-next").textContent = coachStep >= COACH_STEPS.length - 1 ? "Start playing" : "Got it";
  applyCoachRing();
}

function finishCoach(skipPersist) {
  $("coach").hidden = true;
  document.querySelectorAll(".coach-ring").forEach((el) => el.classList.remove("coach-ring"));
  if (skipPersist && !coachForced) localStorage.setItem(COACH_KEY, "skip");
  coachOn = !skipPersist;
  if (skipPersist) coachOn = false;
}

function applyCoachRing() {
  document.querySelectorAll(".coach-ring").forEach((el) => el.classList.remove("coach-ring"));
  if (!coachOn || $("coach").hidden) return;
  const step = COACH_STEPS[coachStep];
  if (!step?.target) return;
  const el = document.querySelector(step.target);
  if (el) el.classList.add("coach-ring");
}

function maybeAdvanceCoach(actionId) {
  if (!coachOn || $("coach").hidden) return;
  const step = COACH_STEPS[coachStep];
  if (!step) return;
  if (step.id === "banner" && actionId === "raise_banner") coachStep = Math.min(coachStep + 1, COACH_STEPS.length - 1);
  else if (step.id === "stores" && (actionId === "commerce" || actionId === "cultivate" || actionId === "drill")) {
    coachStep = Math.min(coachStep + 1, COACH_STEPS.length - 1);
  } else if (step.id === "end" && actionId === "end_week") {
    finishCoach(false);
    return;
  }
  openCoach();
}

function bindTip(el, text) {
  if (!el || !text) return;
  const show = (e) => {
    const tip = $("tip");
    tip.innerHTML = text;
    tip.hidden = false;
    const r = (e.currentTarget || el).getBoundingClientRect();
    const x = Math.max(8, Math.min(window.innerWidth - 288, r.left));
    const y = r.bottom + 6;
    tip.style.left = `${x}px`;
    tip.style.top = `${Math.min(window.innerHeight - 8, y)}px`;
  };
  const hide = () => {
    $("tip").hidden = true;
  };
  el.addEventListener("mouseenter", show);
  el.addEventListener("mouseleave", hide);
  el.addEventListener("focus", show);
  el.addEventListener("blur", hide);
}

function actionTipHtml(a) {
  const live = a.enabled && !(a.ap > 0 && state.ap < a.ap);
  const cost = live ? `<span class="tip-ap">${a.ap} AP</span>` : `<span class="tip-lock">${a.enabled ? "Need more AP" : "LOCKED"}</span>`;
  return `<strong>${esc(a.label)}</strong>${cost}<p>${esc(a.hint || "")}</p>`;
}

function helpHtml() {
  return `
    <h2>How to play</h2>
    <p>Each turn is <strong>one week</strong>. Yellow strip at the top always names the next click. Spend AP on Command tiles, then End Week.</p>
    <ul>
      <li><strong>Theater:</strong> center map. Click a city. Gold roads are walkable (Military → Travel).</li>
      <li><strong>Ruler plate:</strong> your name, age, loyalty, WAR/INT/POL/CHR. Treasury (gold/food/AP) lives in the top row.</li>
      <li><strong>Command:</strong> Domestic = hall work. Plot = people (hire, court, spy). Military = roads and missions.</li>
      <li><strong>Court:</strong> five general chairs under the map. Hire fills a chair; extras wait; Plot → Appoint. Standing orders run at End Week.</li>
      <li>Side missions: Military → Side Mission or Chronicle → Missions. 1 AP or a general's Side mission order.</li>
      <li>Hidden legends: Seek Legend on Plot. Karr on the Slope, Silo on the Yukon Road, Marsh in Kenai. Spy or Seek, then travel and Seek again.</li>
      <li>Tech is 1985–89 salvage + calendar (M16A2, AK-47, Jeeps, M113s, Hueys). No leapfrog, no drones.</li>
      <li>March columns: jeep pickups, M113s, and militia horse scouts on gold roads. Original partisan kit — not a licensed film unit.</li>
      <li>End Week can open a short chronicle: season tint, aging, courtship, a child seed. Plot → Court / Marry. Inspired by ROTK7 life ticks — original names only.</li>
    </ul>
    <p class="muted">Saves use this browser's localStorage and can be downloaded as JSON. Original IP — no licensed names.</p>
    <p><button type="button" id="help-coach" class="primary">Show week-1 coach</button></p>
    <button type="button" data-close>Close</button>
  `;
}

function officersHtml() {
  if (!state) return `<p>No game.</p>`;
  const hunts = legendBoard(state);
  const locked = hunts
    .filter((h) => !h.revealed)
    .map(
      (h) =>
        `<div class="card rumor-card"><h2>Unlisted: ${esc(h.short)}</h2><p class="rumor">${esc(h.rumor)}</p><p class="muted">Plot → Seek Legend. A ? mark sits on the map until they are listed.</p></div>`
    )
    .join("");
  const p = playerOf(state);
  const court = playerCourt(state);
  const gens = playerGenerals(state);
  const visible = visibleOfficers(state);
  const rows = visible
    .map((o) => {
      const fac = o.faction ? factionOf(state, o.faction)?.short : "free";
      const loc = regionOf(state, o.region)?.short || "?";
      const face = esc(o.portrait || portraitInitials(o.name));
      const staff =
        o.faction === p.faction && o.id !== p.id
          ? o.isGeneral
            ? " · GENERAL"
            : " · COURT"
          : "";
      return `<button type="button" class="list-btn officer-row" data-off="${o.id}"><span class="portrait" aria-hidden="true">${face}</span><span class="officer-body"><span class="officer-name">${esc(o.name)}</span><span class="officer-sub">${esc(o.title)} · AGE ${o.age || "?"} · ${esc(fac)} · ${esc(loc)} · ${esc(o.personality)}${staff}${o.spouseId ? " · bound" : ""}</span><span class="officer-stats"><i>WAR ${o.war}</i><i>INT ${o.int}</i><i>POL ${o.pol}</i><i>CHR ${o.chr}</i><i>loy ${o.loyalty}</i>${o.legend ? '<i class="leg">LEGEND</i>' : ""}${o.elite ? "<i>ELITE</i>" : ""}${o.custom ? "<i>CUSTOM</i>" : ""}${o.frail ? "<i>FRAIL</i>" : ""}</span></span></button>`;
    })
    .join("");
  const emptyAdd = visible.length
    ? ""
    : `<p class="muted">No listed officers here yet. Plot → Seek Legend, or Create below.</p>`;
  const addHow = `<p class="muted">ADD: Plot → Hire a free officer in this city · Appoint court into 5 general slots (${gens.length}/5) · Create custom (cap 10) · Rescue via side missions. Court ${court.length}.</p>`;
  const types = Object.entries(content.officers.personalities || {});
  const typeOpts = types
    .map(([id, per]) => `<option value="${esc(id)}"${id === "loyalist" ? " selected" : ""}>${esc(per.label || id)}</option>`)
    .join("");
  const slots = state.contentMeta.customOfficerSlots || 10;
  const full = state.customSlotsUsed >= slots;
  return `<h2>Officers (${visible.length} visible)</h2>${locked}${addHow}${emptyAdd}${rows}
    <hr />
    <h2>Create officer (${state.customSlotsUsed}/${slots})</h2>
    <p class="muted">Original general — not licensed IP. Stats ${CUSTOM_STAT_MIN}–${CUSTOM_STAT_MAX} each, total ≤ ${CUSTOM_STAT_BUDGET}. Adds to the free roster here; Plot → Hire to put them in court / a general slot.</p>
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
    <button type="button" id="c-add" class="primary"${full ? " disabled" : ""}>${full ? "Slots full (10)" : "Add free officer here"}</button>
    <p></p><button type="button" data-close>Close</button>`;
}

function missionsHtml() {
  if (!state) return `<p>No game.</p>`;
  const p = playerOf(state);
  const jobs = openMissions(state);
  const stash = (state.stash || []).slice(-8);
  const empty = jobs.length
    ? ""
    : `<p class="muted">No jobs on the board. Raise a banner, then End Week to refresh. Optional: scout road, raid depot, escort convoy, rescue officer, sabotage, radio run, cache, ford watch, airstrip, claim survey, ice listen, ranch relay.</p>`;
  const rows = jobs
    .map((j) => {
      const here = j.regionId === p.region;
      const loc = regionOf(state, j.regionId)?.short || j.regionId;
      const copy = missionCopy(j, j.regionId);
      return `<button type="button" class="list-btn mission-row" data-job="${j.id}" ${here ? "" : "data-travel='1'"}>
        <img class="cmd-thumb" src="${sceneArt(j.templateId)}" alt="" />
        <span><strong>${esc(j.name)}</strong> · ${esc(loc)} · 1 AP
        <small>${esc(copy)}</small>
        ${here ? "<small>You are here — click to take it.</small>" : "<small>Travel to this city first, or set a general to Side mission.</small>"}
        </span></button>`;
    })
    .join("");
  const loot = stash.length
    ? `<p class="muted">Stash: ${stash.map((s) => esc(s.name)).join(" · ")}</p>`
    : `<p class="muted">Stash empty. Missions can grant depot scrip, analog pads, ranch tokens.</p>`;
  return `<h2>Side missions (${jobs.length} open)</h2>
    <p class="muted">Optional jobs. Cost 1 AP here, or a general's standing order (Side mission) at End Week. Alaska + western Rockies copy on the vignette.</p>
    ${empty}${rows}${loot}
    <button type="button" data-close>Close</button>`;
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
    <div class="field"><label>Or paste / import JSON</label><textarea id="load-json" rows="8"></textarea></div>
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
  maybeAdvanceCoach(id);
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
      text: `${res.officerName || "A legend"} answers. Original character — a hidden free officer. Hire them if you share their ground.`,
      regionId: res.regionId || playerOf(state).region,
    });
  } else if (res.sceneId && !res.weekEnd) {
    showEventScene({
      id: res.sceneId,
      title: res.success === false ? "Mission slips" : "Side mission",
      text: `${res.flavor ? res.flavor + " " : ""}${res.message || ""}`,
      regionId: res.regionId || extra?.regionId || playerOf(state).region,
    });
  } else if (SCENE_ACTIONS.has(id) && !res.weekEnd) {
    const a = listActions(state).find((x) => x.id === id);
    showEventScene({
      id: res.sceneId || id,
      title: a?.label || id,
      text: res.message || "The room goes still.",
      regionId: extra?.regionId || playerOf(state).region,
    });
  }
  if (res.weekEnd) {
    if (res.chronicle && res.chronicle.length) openChronicle(res.chronicle, res.report);
    else showModal(weekReportHtml(res.report || []), { kind: "week" });
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
  $("season").textContent = `${state._season?.name || ""} ${calendarYear(state.week)}`;
  $("ap").textContent = `${state.ap}/${apMax(state)}`;
  $("gold").textContent = String(state.gold);
  $("food").textContent = String(state.food);
  $("fame").textContent = String(state.fame);
  $("rank").textContent = rankLabel(rankOf(state, p));
  $("officer-plate").innerHTML = officerHtml();
  $("city-stats").innerHTML = cityHtml();
  if ($("court-strip")) $("court-strip").innerHTML = courtHtml();
  renderActions();
  renderLog();
  renderLegend();
  renderObjective();
  renderMapCaption();
  drawMap();
  ensureMapPulse();
  wireOrders();
  wireAfterRender();
  applyCoachRing();
  if (state.phase === "battle") openBattle();
  else {
    $("battle").hidden = true;
    stopBattleLoop();
  }
}

const PORTRAIT_SRC = "art/portraits/portrait-commander.png";

function loyBar(n) {
  const v = Math.max(0, Math.min(100, Number(n) || 0));
  const on = Math.round(v / 10);
  const ticks = Array.from({ length: 10 }, (_, i) => `<i${i < on ? ' class="on"' : ""}></i>`).join("");
  return `<span class="loy-row"><span>LOY ${v}</span><span class="loy-bar" aria-hidden="true">${ticks}</span></span>`;
}

function officerHtml() {
  const p = playerOf(state);
  const fac = p.faction ? factionOf(state, p.faction) : null;
  const here = regionOf(state, p.region);
  const rank = rankLabel(rankOf(state, p));
  return `
    <div class="chrome-head">
      <span class="panel-title">Ruler</span>
      <span class="panel-why">Name, age, loyalty — who holds this chair.</span>
    </div>
    <div class="plate-body">
      <div class="medallion">
        <i class="tick tl"></i><i class="tick tr"></i><i class="tick bl"></i><i class="tick br"></i>
        <img class="officer-face" src="${PORTRAIT_SRC}" alt="" />
      </div>
      <div class="officer-meta">
        <h2>${esc(p.name)}</h2>
        <p>${esc(p.title)} · ${esc(rank)} · ${fac ? esc(fac.short) : "FREE"}</p>
        <p class="muted">AGE ${p.age || "?"}${p.frail ? " FRAIL" : ""} · ${esc(here?.short || "?")} · AP ${state.ap}/${apMax(state)}</p>
        ${loyBar(p.loyalty)}
        <div class="stat-row">
          <span><b>WAR</b><strong>${p.war}</strong></span>
          <span><b>INT</b><strong>${p.int}</strong></span>
          <span><b>POL</b><strong>${p.pol}</strong></span>
          <span><b>CHR</b><strong>${p.chr}</strong></span>
        </div>
      </div>
    </div>
  `;
}

function courtHtml() {
  const p = playerOf(state);
  const gens = playerGenerals(state);
  const wait = appointCandidates(state);
  const chairs = [];
  for (let i = 0; i < MAX_GENERALS; i++) {
    const g = gens[i];
    if (g) {
      chairs.push(`<div class="court-chair">
        <span class="mini">${esc(g.portrait || portraitInitials(g.name))}</span>
        <div class="who">
          <strong>${esc(g.name)}</strong>
          <small>AGE ${g.age || "?"} · LOY ${g.loyalty}</small>
          <select data-order-gen="${g.id}">${ordersForOfficer(g)
            .map(
              (o) =>
                `<option value="${o.id}"${(g.standingOrder || "auto") === o.id ? " selected" : ""}>${esc(o.label)}</option>`
            )
            .join("")}</select>
        </div>
      </div>`);
    } else {
      let hint;
      if (!p.faction) hint = "Raise a banner, then Hire.";
      else if (wait[0]) hint = `Appoint ${esc(wait[0].name)}.`;
      else hint = "Hire here, or Create (cap 10).";
      chairs.push(`<button type="button" class="court-chair empty" data-add-gen="${i}">
        <span class="mini empty-mini">+</span>
        <div class="who"><strong>${i + 1}. ADD</strong><small>${hint}</small></div>
      </button>`);
    }
  }
  return `<div class="chrome-head"><span class="panel-title">Court</span><span class="panel-why">Five chairs. Standing orders fire at End Week.</span></div>${chairs.join("")}`;
}

function cityHtml() {
  const r = regionOf(state, selectedRegion) || regionOf(state, playerOf(state).region);
  const f = r.owner ? factionOf(state, r.owner) : null;
  const known = r.intel > 0 || (playerOf(state).faction && r.owner === playerOf(state).faction);
  const garr = known ? r.garrison : "???";
  const walls = known ? r.walls : "?";
  const order = known ? r.order : "?";
  const econ = known ? r.economy : "?";
  const plus = (r.plus || []).join(" · ");
  const minus = (r.minus || []).join(" · ");
  return `
    <div class="chrome-head">
      <span class="panel-title">City report</span>
      <span class="panel-why">County seat under the glass.</span>
    </div>
    <div class="city-body">
      <h2>${esc(r.short)} · ${f ? esc(f.short) : "OPEN"}</h2>
      <div class="city-grid">
        <span class="pill"><span>ECON</span><strong>${econ}</strong></span>
        <span class="pill"><span>STORES</span><strong>${known ? r.food : "?"}</strong></span>
        <span class="pill"><span>POP</span><strong>${r.population || "?"}</strong></span>
        <span class="pill"><span>LEVY</span><strong>${garr}</strong></span>
        <span class="pill"><span>WALLS</span><strong>${walls}</strong></span>
        <span class="pill"><span>ORDER</span><strong>${order}</strong></span>
      </div>
      ${plus ? `<p class="plus">+ ${esc(plus)}</p>` : ""}
      ${minus ? `<p class="minus">− ${esc(minus)}</p>` : ""}
      ${legendBoard(state)
        .filter((h) => h.regionId === r.id)
        .map((h) => `<p class="rumor">${esc(h.rumor)}</p>`)
        .join("")}
    </div>
  `;
}

function weekReportHtml(report) {
  const lines = report || [];
  const headline = lines[0] || `Week ${state.week}`;
  const ai = lines.filter((l) => /\[[a-z]+\]/.test(l)).slice(0, 6);
  const extra = Math.max(0, lines.length - 1 - ai.length);
  return `<div class="event-art week-art"><img src="${sceneUrl("season")}" alt="" /><img class="event-face" src="${PORTRAIT_SRC}" alt="" /></div>
    <h2>Week ${state.week} · ${esc(state._season?.name || "")} ${calendarYear(state.week)}</h2>
    <p>${esc(headline)}</p>
    <p class="next-line">${esc(nextHint(state))}</p>
    <ul class="week-ai">${ai.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
    <p class="muted">${extra ? `${extra} more in the field log. ` : ""}Personality tags are in [brackets].</p>
    <button type="button" data-close class="primary">Continue</button>`;
}

const ACTION_CATS = {
  domestic: ["raise_banner", "drill", "commerce", "cultivate", "fortify", "safety", "research"],
  plot: ["seek_legend", "spy", "hire", "appoint", "court", "ally", "break_ally", "rumor", "persuade", "hide"],
  military: ["travel", "attack", "mission"],
};
const TAB_TIPS = {
  domestic: "<strong>Domestic</strong><p>Town work: raise a banner, food, gold, walls, salvage.</p>",
  plot: "<strong>Plot</strong><p>People work: hire, appoint generals, court, spy, rumor, alliance.</p>",
  military: "<strong>Military</strong><p>Move on gold roads, march, or take a side mission.</p>",
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
  "appoint",
  "ally",
  "break_ally",
  "rumor",
  "persuade",
  "hide",
  "travel",
  "court",
  "marriage",
  "birth",
  "age",
  "funeral",
  "season",
  "mission",
  "scout_road",
  "raid_depot",
  "escort_convoy",
  "rescue_officer",
  "sabotage",
  "radio_run",
  "cache_pull",
  "ford_watch",
  "airstrip_mark",
  "claim_survey",
  "ice_listen",
  "ranch_relay",
]);
let commandCat = "domestic";
const COACH_KEY = "northern-front-v01-coach";
let coachForced = false;
let coachOn = true;
let coachStep = 0;
let mapPulseTimer = null;

const COACH_STEPS = [
  {
    id: "city",
    title: "1 / 4  Your city",
    body: "Yellow nameplate = the city you have selected. Click a city on the map to inspect it. Gold roads between cities are walkable.",
    target: "#city-stats",
    cat: "domestic",
  },
  {
    id: "banner",
    title: "2 / 4  Raise a banner",
    body: "Domestic is town work. Click RAISE BANNER to claim Bethel as Northern Front. It costs 1 AP.",
    target: '[data-id="raise_banner"]',
    cat: "domestic",
  },
  {
    id: "stores",
    title: "3 / 4  Feed the week",
    body: "Spend leftover AP on COMMERCE (gold) or CULTIVATE (food). Hover a tile to read what it does and why it might be locked.",
    target: '[data-id="commerce"]',
    cat: "domestic",
  },
  {
    id: "end",
    title: "4 / 4  End the week",
    body: "When AP is gone — or you are done — click END WEEK at the top right. Neighbors act, then you get a fresh AP pool.",
    target: "#btn-end",
  },
];

function sceneArt(id) {
  return sceneUrl(id);
}

function actionButton(a) {
  const b = document.createElement("button");
  b.type = "button";
  b.dataset.id = a.id;
  const live = a.enabled && !(a.ap > 0 && state.ap < a.ap);
  b.disabled = !live;
  const lock = !a.enabled ? "LOCKED" : state.ap < a.ap ? `NEED ${a.ap} AP` : `AP ${a.ap}`;
  b.innerHTML = `<img class="cmd-thumb" src="${sceneArt(a.id)}" alt="" /><span>${esc(a.label)}<small>${esc(lock)}</small></span>`;
  bindTip(b, actionTipHtml(a));
  b.onclick = () => {
    b.classList.add("is-press");
    setTimeout(() => b.classList.remove("is-press"), 140);
    startAction(a);
  };
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
    bindTip(t, TAB_TIPS[id]);
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

const CHARGE_SCENE_IDS = new Set(["travel", "attack"]);
const LIFE_SCENE_IDS = new Set(["court", "marriage", "birth", "age", "funeral", "season"]);
let sceneFxRaf = 0;
let chronicleQueue = [];
let pendingWeekReport = null;

function openChronicle(cards, weekReport) {
  chronicleQueue = (cards || []).slice();
  pendingWeekReport = weekReport || null;
  if (!chronicleQueue.length) {
    if (pendingWeekReport) {
      showModal(weekReportHtml(pendingWeekReport), { kind: "week" });
      pendingWeekReport = null;
    }
    return;
  }
  showNextChronicle();
}

function showNextChronicle() {
  const ev = chronicleQueue.shift();
  if (!ev) {
    const report = pendingWeekReport;
    pendingWeekReport = null;
    if (report) showModal(weekReportHtml(report), { kind: "week" });
    return;
  }
  showEventScene({
    id: ev.id,
    title: ev.title,
    text: ev.text,
    chronicle: true,
    season: ev.season || state._season?.id,
  });
}

function showEventScene(ev) {
  $("event-vignette").src = sceneArt(ev.id);
  $("event-portrait").src = PORTRAIT_SRC;
  $("event-title").textContent = ev.title || "Event";
  $("event-text").textContent = ev.text || "";
  const next = $("event-next");
  if (next) next.textContent = ev.chronicle ? "CONTINUE for the next chronicle beat." : state ? nextHint(state) : "";
  const el = $("event-scene");
  el.hidden = false;
  el.classList.remove("open");
  void el.offsetWidth;
  el.classList.add("open");
  if (ev.chronicle || LIFE_SCENE_IDS.has(ev.id)) {
    startSeasonFx(ev.season || state._season?.id);
  } else {
    const region = regionOf(state, ev.regionId || playerOf(state)?.region);
    startSceneFx(CHARGE_SCENE_IDS.has(ev.id), isArcticRegion(region));
  }
}

function hideEventScene() {
  $("event-scene").hidden = true;
  $("event-scene").classList.remove("open");
  stopSceneFx();
  if (chronicleQueue.length || pendingWeekReport) showNextChronicle();
}

function startSeasonFx(seasonId) {
  stopSceneFx();
  const fx = $("scene-fx");
  if (!fx) return;
  fx.hidden = false;
  const ctx = fx.getContext("2d");
  const sid = seasonId || "summer";
  const tick = (now) => {
    if ($("event-scene").hidden || fx.hidden) {
      sceneFxRaf = 0;
      return;
    }
    paintSeasonVignette(ctx, now, sid);
    sceneFxRaf = requestAnimationFrame(tick);
  };
  sceneFxRaf = requestAnimationFrame(tick);
}

function startSceneFx(on, arctic) {
  stopSceneFx();
  const fx = $("scene-fx");
  if (!fx) return;
  fx.hidden = !on;
  if (!on) return;
  const ctx = fx.getContext("2d");
  const tick = (now) => {
    if ($("event-scene").hidden || fx.hidden) {
      sceneFxRaf = 0;
      return;
    }
    paintChargeVignette(ctx, now, arctic);
    sceneFxRaf = requestAnimationFrame(tick);
  };
  sceneFxRaf = requestAnimationFrame(tick);
}

function stopSceneFx() {
  if (sceneFxRaf) cancelAnimationFrame(sceneFxRaf);
  sceneFxRaf = 0;
  const fx = $("scene-fx");
  if (fx) fx.hidden = true;
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
    if (!cs.length) return toast("No free officers in this region. Travel, or Officers → Create (cap 10).");
    showModal(`<h2>Hire into court / generals</h2><p class="muted">A free officer here joins your color. Empty general slots (5) fill first; extras wait in court for Appoint.</p>${cs.map((o) => `<button class="list-btn" data-hire="${o.id}"><img class="cmd-thumb" src="${sceneArt("hire")}" alt="" /><span>${esc(o.name)} · ${o.personality} · ambition ${o.ambition}${o.elite ? " · ELITE" : ""}${o.legend ? " · LEGEND" : ""}</span></button>`).join("")}<button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-hire]").forEach((btn) => {
      btn.onclick = () => {
        hideModal();
        run("hire", { officerId: btn.dataset.hire });
      };
    });
    return;
  }
  if (a.needs === "appoint") {
    const cs = appointCandidates(state);
    if (!cs.length) return toast("Court empty. Plot → Hire, or Officers → Create then Hire.");
    showModal(`<h2>Appoint general (${playerGenerals(state).length}/5)</h2><p class="muted">Promote a court officer into an empty You-card slot. Standing orders live on generals.</p>${cs.map((o) => `<button class="list-btn" data-appoint="${o.id}"><img class="cmd-thumb" src="${sceneArt("appoint")}" alt="" /><span>${esc(o.name)} · ${o.personality} · ${esc(o.title)}</span></button>`).join("")}<button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-appoint]").forEach((btn) => {
      btn.onclick = () => {
        hideModal();
        run("appoint", { officerId: btn.dataset.appoint });
      };
    });
    return;
  }
  if (a.needs === "mission") {
    showModal(missionsHtml(), { kind: "missions" });
    wireMissionButtons();
    return;
  }
  if (a.needs === "court") {
    const cs = courtCandidates(state);
    if (!cs.length) return toast("No unmarried adult in this town.");
    showModal(`<h2>Court / Marry</h2><p class="muted">Visit twice to keep house. Original households — not a licensed romance.</p>${cs.map((o) => `<button class="list-btn" data-court="${o.id}"><img class="cmd-thumb" src="${sceneArt("court")}" alt="" /><span>${esc(o.name)} · AGE ${o.age} · ${o.personality}${playerOf(state).courtingId === o.id ? " · courting" : ""}</span></button>`).join("")}<button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-court]").forEach((btn) => {
      btn.onclick = () => {
        hideModal();
        run("court", { officerId: btn.dataset.court });
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
  if (coachOn && !$("coach").hidden && COACH_STEPS[coachStep]?.id === "city") {
    coachStep = Math.min(coachStep + 1, COACH_STEPS.length - 1);
    openCoach();
  }
  render();
}

function onMapMove(e) {
  if (!state) return;
  const r = regionAt(e.clientX, e.clientY, $("map"));
  const id = r ? r.id : null;
  $("map").style.cursor = r ? "pointer" : "crosshair";
  if (id !== hoverRegion) {
    hoverRegion = id;
    drawMap();
  }
}

function renderMapCaption() {
  const cap = $("map-caption");
  if (!cap || !state) return;
  const r = regionOf(state, selectedRegion) || regionOf(state, playerOf(state).region);
  const you = regionOf(state, playerOf(state).region);
  cap.textContent = `${state._season?.name || ""} ${calendarYear(state.week)} · ${r?.short || "?"} selected · you are in ${you?.short || "?"} · gold roads = travel`;
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
  const on = pulse && Math.floor((performance.now() - mapFx.t0) / 90) % 2 === 0;
  walkLine(x0, y0, x1, y1, (x, y) => {
    ctx.fillStyle = pulse ? (on ? "#f8d800" : "#886028") : "#503010";
    ctx.fillRect(x - 1, y - 1, 3, 3);
  });
  walkLine(x0, y0, x1, y1, (x, y) => {
    ctx.fillStyle = pulse ? (on ? "#fff0a0" : "#c8a038") : "#c8a038";
    ctx.fillRect(x, y, 1, 1);
  });
}

function sameRoad(a, b, c, d) {
  if (!c || !d) return false;
  const k = (p, q) => `${p[0] | 0},${p[1] | 0}|${q[0] | 0},${q[1] | 0}`;
  return k(a, b) === k(c, d) || k(a, b) === k(d, c);
}

let mapFx = null;

function pulseTravel(fromId, toId, opts = {}) {
  const a = regionOf(state, fromId);
  const b = regionOf(state, toId);
  if (!a || !b) return;
  const duration = opts.loop ? 2800 : 2400;
  const t0 = performance.now();
  mapFx = { kind: "travel", a: cityXY(a), b: cityXY(b), hop: true, t0, duration, loop: !!opts.loop };
  const tick = () => {
    if (!mapFx || mapFx.t0 !== t0) return;
    drawMap();
    const elapsed = performance.now() - mapFx.t0;
    if (mapFx.loop || elapsed < duration) requestAnimationFrame(tick);
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
    const hop = mapFx?.hop && Math.floor((performance.now() - mapFx.t0) / 90) % 2 === 0 ? -4 : 0;
    ctx.fillStyle = "#f8d800";
    ctx.fillRect(x - 4, y - 5 + hop, 2, 2);
  }
  if (r.id === "arctic_slope" && legendStatus(state).mapMark) {
    ctx.fillStyle = "#d080f8";
    ctx.fillRect(x + 4, y - 1, 2, 2);
  }
  legendBoard(state).forEach((h) => {
    if (h.regionId !== r.id || !h.mapMark) return;
    ctx.fillStyle = "#d080f8";
    ctx.fillRect(x + 4, y - 1, 2, 2);
  });
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
  if (selected) {
    ctx.fillStyle = Math.floor(Date.now() / 240) % 2 === 0 ? "#f8d800" : "#f8f8f8";
    ctx.fillRect(px - 4, py - 4, pw + 8, ph + 8);
    ctx.fillStyle = "#000018";
    ctx.fillRect(px - 2, py - 2, pw + 4, ph + 4);
  }
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
  const pal = seasonPalette(state._season?.id);
  const sea = pal.sea || ["#082038", "#103058"];
  const land = pal.land || ["#486030", "#607838"];
  for (let y = 0; y < LOW_H; y += 2) {
    for (let x = 0; x < LOW_W; x += 2) {
      o.fillStyle = ((x + y) >> 1) % 2 ? sea[0] : sea[1];
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
    o.fillStyle = dither(o, land[0], land[1]);
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
    o.fillStyle = dither(o, fac ? fac.colorDark : land[0], fac ? fac.color : land[1]);
    o.fill();
    o.lineWidth = 1;
    o.strokeStyle = r.id === selectedRegion ? "#f8d800" : r.id === hoverRegion ? "#f8f8f8" : "#203040";
    o.stroke();
  });
  o.globalAlpha = 0.14;
  o.fillStyle = pal.overlay || "#88a040";
  o.fillRect(0, 0, LOW_W, LOW_H);
  o.globalAlpha = 1;
  mapRoads(state.regions).forEach((rd) => drawPixelRoad(o, rd.a, rd.b));
  if (mapFx?.kind === "travel" && mapFx.a && mapFx.b) {
    const now = performance.now();
    const dur = mapFx.duration || 2400;
    let t = (now - mapFx.t0) / dur;
    t = mapFx.loop ? ((t % 1) + 1) % 1 : Math.min(1, Math.max(0, t));
    const [x0, y0] = lowPt(mapFx.a);
    const [x1, y1] = lowPt(mapFx.b);
    drawTravelConvoy(o, [x0, y0], [x1, y1], t, now, 2);
  }
  state.regions.forEach((r) => drawCityMark(o, r, r.id === selectedRegion));

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(drawMap.off, 0, 0, 1000, 620);
  ctx.imageSmoothingEnabled = false;
  state.regions.forEach((r) => drawCityPlate(ctx, r, r.id === selectedRegion));
  ctx.fillStyle = "#f8d800";
  ctx.font = PX_FONT;
  const hunt = legendStatus(state);
  ctx.fillText(
    hunt.revealed
      ? `${(state._season?.name || "SEASON").toUpperCase()} ${calendarYear(state.week)} · ROADS = MARCH LINES`
      : `${(state._season?.name || "SEASON").toUpperCase()} ${calendarYear(state.week)} · GOLD ROADS = TRAVEL`,
    12,
    28
  );
}

function ensureMapPulse() {
  if (mapPulseTimer) return;
  mapPulseTimer = setInterval(() => {
    if (!state || state.phase !== "strategy") return;
    if ($("battle") && !$("battle").hidden) return;
    drawMap();
  }, 240);
}

function openBattle() {
  $("battle").hidden = false;
  startBattleLoop();
}

let battleRaf = 0;

function startBattleLoop() {
  if (battleRaf) return;
  const tick = (now) => {
    if (!state?.battle || $("battle").hidden) {
      battleRaf = 0;
      return;
    }
    drawBattle(now);
    battleRaf = requestAnimationFrame(tick);
  };
  battleRaf = requestAnimationFrame(tick);
}

function stopBattleLoop() {
  if (battleRaf) cancelAnimationFrame(battleRaf);
  battleRaf = 0;
}

let flashTimer = null;

function scheduleFlashClear(battle) {
  if (battle.flash?.hold) {
    requestAnimationFrame(() => {
      if (state?.battle === battle && battle.flash) drawBattle();
    });
    return;
  }
  if (flashTimer) clearTimeout(flashTimer);
  flashTimer = setTimeout(() => {
    flashTimer = null;
    if (state?.battle === battle && battle.flash) {
      battle.flash = null;
      drawBattle();
    }
  }, 280);
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

function drawBattle(now = performance.now()) {
  const b = state.battle;
  if (!b) return;
  const dest = regionOf(state, b.toId);
  const arctic = isArcticRegion(dest);
  $("battle-title").textContent = `Field — ${dest.name}`;
  $("battle-meta").textContent = `${b.weather} · impulse ${b.round}/${b.maxRounds} · morale A ${b.morale.atk} / D ${b.morale.def} · ${b.turn === "atk" ? "your impulse" : "enemy impulse"}`;
  $("battle-log").innerHTML = b.log.slice(-12).map((l) => `<li>${esc(l)}</li>`).join("");
  const sky = $("battle-sky");
  if (sky) {
    const sctx = sky.getContext("2d");
    sctx.imageSmoothingEnabled = false;
    paintBattleSky(sctx, now, arctic);
  }
  const charge = $("battle-charge");
  if (charge) {
    const cctx = charge.getContext("2d");
    cctx.imageSmoothingEnabled = false;
    paintBattleCharge(cctx, now, arctic);
  }
  const canvas = $("battle-canvas");
  const ctx = canvas.getContext("2d");
  const cw = canvas.width;
  const ch = canvas.height;
  const gw = cw / b.cols;
  const gh = ch / b.rows;
  const colors = {
    plains: arctic ? ["#c0a050", "#887838"] : ["#c8a048", "#8a7840"],
    forest: ["#306830", "#184818"],
    hills: arctic ? ["#886838", "#503018"] : ["#a07840", "#684828"],
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
    const fw = Math.floor(gw);
    const fh = Math.floor(gh);
    ctx.fillStyle = Math.floor(Date.now() / 70) % 2 ? "#f8d800" : "#f8f8f8";
    ctx.fillRect(fx, fy, fw, fh);
    ctx.fillStyle = "#000018";
    ctx.fillRect(fx + 4, fy + 4, fw - 8, fh - 8);
    ctx.fillStyle = Math.floor(Date.now() / 70) % 2 ? "#f8f8f8" : "#f03030";
    ctx.fillRect(fx + 8, fy + 8, fw - 16, fh - 16);
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
    stopBattleLoop();
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
  document.querySelectorAll("[data-add-gen]").forEach((btn) => {
    btn.onclick = () => {
      const wait = appointCandidates(state);
      if (wait.length) {
        commandCat = "plot";
        render();
        startAction(listActions(state).find((a) => a.id === "appoint") || { id: "appoint", needs: "appoint", label: "Appoint General" });
        return;
      }
      if (hireCandidates(state).length) {
        commandCat = "plot";
        render();
        startAction(listActions(state).find((a) => a.id === "hire") || { id: "hire", needs: "hire", label: "Hire" });
        return;
      }
      toast(playerOf(state).faction ? "No free officer in this city. Travel, or Officers → Create (cap 10)." : "Raise a banner first, then Plot → Hire.");
    };
  });
}

function wireMissionButtons() {
  $("modal-card")?.querySelectorAll("[data-job]")?.forEach((btn) => {
    btn.onclick = () => {
      const jobId = btn.dataset.job;
      hideModal();
      run("mission", { jobId });
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
      toast(res.ok ? `${name} added to the free roster. Plot → Hire to put them in court / a general slot.` : res.message);
      showModal(officersHtml(), { kind: "officers" });
      wireDynamicModals();
      render();
    };
  }
  wireMissionButtons();
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
