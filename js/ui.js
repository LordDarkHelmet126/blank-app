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
  draw80sMarker,
  drawCityNode,
  drawFactionFlag,
  drawPixelRoadFull,
  drawPixelRoadHi,
  faceSrc,
  isoToCell,
  markerKind,
  originalFaceGrid,
  isoLayout,
  paintIsoField,
  paintTheaterTerrain,
  terrainSize,
} from "./terrain.js";
import { WORLD_LAND } from "./world-washes.js";
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
  playerCourt,
  appointCandidates,
  legendBoard,
  openMissions,
  seedDemoMissions,
  missionCopy,
  duelCmd,
  challengeCandidates,
  weekTease,
  stateControl,
  ensureCampaign,
  theaterVisible,
  isAdjacent,
  geoTags,
} from "./engine.js";
import { DUEL_CLOCK_S, DUEL_PICK_MS, DUEL_RESOLVE_MS } from "./duel.js";

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
  selectedRegion = "cheyenne";
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
      playerOf(state).region = "bethel";
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
    hideModal({ flush: false });
    render();
    showModal(weekReportHtml(state.weekReport || []), { kind: "week" });
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
    selectedRegion = "cheyenne";
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
  if (params.get("demo") === "states" || params.get("demo") === "map") {
    startSliceState();
    selectedRegion = "denver";
    hideModal();
    render();
    pulseTravel("juneau", "seattle", { loop: true });
    afterFonts();
    return;
  }
  if (params.get("demo") === "start") {
    state = createNewGame(content, {
      name: "Alex Rourke",
      background: "scout",
      difficulty: "normal",
      seed: 7,
    });
    selectedRegion = "denver";
    hideModal();
    render();
    afterFonts();
    return;
  }
  if (params.get("demo") === "look" || params.get("demo") === "terrain") {
    document.body.classList.add("look-map");
    startSliceState();
    selectedRegion = params.get("focus") || params.get("city") || "denver";
    commandCat = "domestic";
    hideModal();
    const battleFx = params.get("fx") === "battle";
    if (!battleFx) playerOf(state).region = "cheyenne";
    render();
    const view = params.get("view");
    if (view === "world") frameWorld();
    else if (view === "near") frameNear();
    else if (view === "ca") frameCa();
    else if (view === "gulf") frameGulf();
    if (!battleFx) pulseTravel("cheyenne", "denver", { loop: true });
    if (params.get("panel") === "officers") {
      showModal(officersHtml(), { kind: "officers" });
      wireAfterRender();
    }
    if (params.get("fx") === "battle") {
      const home = regionOf(state, "bethel");
      home.garrison = 90;
      playerOf(state).region = "bethel";
      const fight = act(state, content, "attack", { regionId: "nome" });
      if (fight.battle && state.battle) {
        state.battle.flash = { x: 3, y: 2, side: "atk", hold: true };
        openBattle();
      }
    }
    afterFonts();
    return;
  }
  if (params.get("demo") === "duel") {
    startSliceState();
    const goliath = params.get("goliath") === "1";
    const style = params.get("style");
    const arena = params.get("arena");
    let foe;
    if (goliath) {
      foe = state.officers.find((o) => o.id === "marsh");
      if (foe) {
        foe.hidden = false;
        foe.region = "bethel";
        if (!state.discovered.includes("marsh")) state.discovered.push("marsh");
        state.marshHunt = 2;
      }
    } else {
      foe = state.officers.find((o) => o.id === "hart");
    }
    if (foe) {
      const res = act(state, content, "challenge", {
        officerId: foe.id,
        youStyleId: style || undefined,
        arenaId: arena || undefined,
      });
      if (!res.ok) toast(res.message);
    }
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
  $("btn-states").onclick = () => showModal(campaignHtml());
  $("btn-legend").onclick = () => toggleLegend();
  $("btn-zoom-in").onclick = () => zoomBy(1.2);
  $("btn-zoom-out").onclick = () => zoomBy(1 / 1.2);
  $("btn-zoom-world").onclick = () => frameWorld();
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
  document.querySelectorAll("[data-duel-move]").forEach((btn) => {
    btn.onclick = () => pickDuelMove(btn.dataset.duelMove);
  });
  $("duel-continue").onclick = closeDuel;
  const canvas = $("map");
  canvas.addEventListener("pointermove", onMapPointerMove);
  canvas.addEventListener("pointerdown", onMapPointerDown);
  canvas.addEventListener("pointerup", onMapPointerUp);
  canvas.addEventListener("pointerleave", () => {
    mapView.drag = null;
  });
  canvas.addEventListener(
    "wheel",
    (e) => {
      if (!state) return;
      e.preventDefault();
      const [sx, sy] = canvasPoint(e, canvas);
      const next = Math.max(0.16, Math.min(3.2, mapView.z * (e.deltaY > 0 ? 0.88 : 1.14)));
      mapView.x = sx - ((sx - mapView.x) / mapView.z) * next;
      mapView.y = sy - ((sy - mapView.y) / mapView.z) * next;
      mapView.z = next;
      drawMap();
    },
    { passive: false },
  );
  const bc = $("battle-canvas");
  bc.addEventListener("click", onBattleClick);
  window.addEventListener("keydown", (e) => {
    if (state?.phase === "duel") {
      if (e.key === "1") pickDuelMove("strike");
      if (e.key === "2") pickDuelMove("guard");
      if (e.key === "3") pickDuelMove("special");
      return;
    }
    if (e.key === "e" && state && state.phase === "strategy") run("end_week");
    if ((e.key === "l" || e.key === "L") && state?.phase === "strategy" && e.target?.tagName !== "INPUT" && e.target?.tagName !== "TEXTAREA") {
      toggleLegend();
    }
  });
}

function titleScreenHtml(hasSave) {
  return `
    <p class="muted">Original IP. Alaska-first western theater. Not a licensed war film or Koei title.</p>
    <h1>NORTHERN FRONT</h1>
    <p><strong>Click Begin week 0.</strong> You start alone in Cheyenne. First job: raise a banner, spend AP, then End Week.</p>
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
      selectedRegion = "cheyenne";
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

let parkedCoach = false;
let queuedModal = null;

function overlayBusy() {
  const modal = $("modal");
  const scene = $("event-scene");
  const duel = $("duel");
  const battle = $("battle");
  return Boolean(
    (modal && !modal.hidden) ||
      (scene && !scene.hidden) ||
      (duel && !duel.hidden) ||
      (battle && !battle.hidden)
  );
}

function parkCoach() {
  const el = $("coach");
  if (el && !el.hidden) {
    el.hidden = true;
    parkedCoach = true;
    document.querySelectorAll(".coach-ring").forEach((n) => n.classList.remove("coach-ring"));
  } else if (coachOn && parkedCoach) {
    parkedCoach = true;
  }
}

function silentHideEvent() {
  const el = $("event-scene");
  if (!el) return;
  el.hidden = true;
  el.classList.remove("open");
  stopSceneFx();
}

function flushOverlays() {
  if (overlayBusy()) return;
  if (queuedModal) {
    const next = queuedModal;
    queuedModal = null;
    showModal(next.html, next.opts);
    return;
  }
  if (parkedCoach && coachOn) {
    parkedCoach = false;
    openCoach();
  }
}

function showModal(html, opts = {}) {
  const scene = $("event-scene");
  if (scene && !scene.hidden) {
    queuedModal = { html, opts };
    return;
  }
  parkCoach();
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

function hideModal(opts = {}) {
  $("modal").hidden = true;
  $("modal-card").className = "modal-card";
  if (opts.flush !== false) flushOverlays();
}

const HIRE_LINE = "Plot → Hire fills an ADD chair (5 generals). Extras wait — Plot → Appoint.";

function nextHint(st) {
  if (!st || st.gameOver) return "Campaign closed.";
  if (st.phase === "duel") {
    const spec = st.duel?.you?.style?.specialLabel;
    return spec
      ? `YARD: Strike / Guard / Special · ${spec}. Green window. Clock ~99s.`
      : "YARD: Strike / Guard / Special. Green window. Clock ~99s.";
  }
  const p = playerOf(st);
  const here = regionOf(st, p.region);
  const sel = regionOf(st, selectedRegion);
  const gens = playerGenerals(st);
  const jobs = openMissions(st);
  const localJob = jobs.find((j) => j.regionId === p.region);
  const wait = appointCandidates(st);
  if (sel && here && sel.id !== here.id && !isAdjacent(st, here, sel)) {
    const via = (here.neighbors || []).map((id) => regionOf(st, id)?.short).filter(Boolean).slice(0, 3).join(", ");
    return `NEXT: Cannot leap to ${sel.short} (${sel.stateCode || "—"}). Take an adjacent road${via ? ` (${via})` : ""} first.`;
  }
  if (sel && here && sel.id !== here.id && isAdjacent(st, here, sel)) {
    return `NEXT: ${sel.short} is adjacent — Military → Travel or March. No leaping past it.`;
  }
  if (!p.faction) return "NEXT: Domestic → Raise Banner (1 AP). Then Plot → Hire fills an ADD chair.";
  if (st.ap <= 0) return `NEXT: End Week. Next week may bring ${weekTease(st)}.`;
  if (gens.length === 0) return `NEXT: ${HIRE_LINE}`;
  if (gens.length < MAX_GENERALS && hireCandidates(st).length) {
    return `NEXT: Plot → Hire (${gens.length}/5). Same path as the ADD chairs.`;
  }
  if (gens.length < MAX_GENERALS && wait.length) {
    return `NEXT: Plot → Appoint ${wait[0].name} into an ADD chair (${gens.length}/5).`;
  }
  if (localJob) return `NEXT: ${st.ap} AP left — Military → Side Mission: ${localJob.name}, or one more tile.`;
  if (jobs.length) return `NEXT: ${st.ap} AP left — ${jobs.length} jobs on the board, or one more tile.`;
  const rivals = challengeCandidates(st);
  if (rivals.length) return `NEXT: ${st.ap} AP left — Plot → Challenge ${rivals[0].name}, or one more tile.`;
  if (here && ownedHere(st, here) && here.garrison < 24) {
    return `NEXT: ${st.ap} AP left — Drill, or one more tile before the week turns.`;
  }
  if (st.ap > 0) return `NEXT: ${st.ap} AP left — one more tile before the week turns.`;
  return `NEXT: End Week. Next week may bring ${weekTease(st)}.`;
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
  const end = $("btn-end");
  if (end) end.setAttribute("data-tip", `End Week. Next week may bring ${weekTease(state)}. Fresh AP.`);
}

function openCoach() {
  if (overlayBusy()) {
    parkedCoach = true;
    const el = $("coach");
    if (el) el.hidden = true;
    return;
  }
  const step = COACH_STEPS[coachStep] || COACH_STEPS[0];
  if (step.cat) commandCat = step.cat;
  parkedCoach = false;
  $("coach").hidden = false;
  $("coach-title").textContent = step.title;
  $("coach-text").textContent = step.body;
  $("coach-next").textContent = coachStep >= COACH_STEPS.length - 1 ? "Start playing" : "Got it";
  applyCoachRing();
}

function finishCoach(skipPersist) {
  $("coach").hidden = true;
  parkedCoach = false;
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
  else if (step.id === "hire" && (actionId === "hire" || actionId === "appoint")) {
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
      <li><strong>Theater:</strong> Continental US coastline plus an Alaska/Yukon spur. Biomes (wet forest, Rockies, desert, plains, eastern woods, AK ice) and 1980s American markers — ranch houses, grain elevators, oil pumps, bunkers, radio towers. Not Chinese roofs. STATE → territories. Adjacent roads only — no leaping. Farm/mine/fuel/water/sun/weather/defense change weekly yields. Alternate routes (ferry vs ALCAN, pass vs rail). 8 west-bloc states name a national leader.</li>
      <li><strong>Ruler plate:</strong> your name, age, loyalty, WAR/INT/POL/CHR. Treasury (gold/food/AP) lives in the top row.</li>
      <li><strong>Command:</strong> Domestic = hall work. Plot = people (hire, court, spy). Military = roads and missions.</li>
      <li><strong>Court:</strong> ${HIRE_LINE} Standing orders run at End Week.</li>
      <li><strong>Yard duel:</strong> Plot/Military → Challenge, or a Porch challenge mission. Keys 1/2/3: Strike / Guard / Special · style move (e.g. Special · Dust Feint). Press in the green window. Clock ~99s if both stay up.</li>
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
      const faceImg = faceSrc(o.portrait);
      const staff =
        o.faction === p.faction && o.id !== p.id
          ? o.isGeneral
            ? " · GENERAL"
            : " · COURT"
          : "";
      return `<button type="button" class="list-btn officer-row" data-off="${o.id}"><span class="portrait" aria-hidden="true">${faceImg ? `<img src="${faceImg}" alt="" />` : face}</span><span class="officer-body"><span class="officer-name">${esc(o.name)}</span><span class="officer-sub">${esc(o.title)} · AGE ${o.age || "?"} · ${esc(fac)} · ${esc(loc)} · ${esc(o.personality)}${staff}${o.spouseId ? " · bound" : ""}</span><span class="officer-stats"><i>WAR ${o.war}</i><i>INT ${o.int}</i><i>POL ${o.pol}</i><i>CHR ${o.chr}</i><i>loy ${o.loyalty}</i>${o.legend ? '<i class="leg">LEGEND</i>' : ""}${o.elite ? "<i>ELITE</i>" : ""}${o.custom ? "<i>CUSTOM</i>" : ""}${o.frail ? "<i>FRAIL</i>" : ""}</span></span></button>`;
    })
    .join("");
  const emptyAdd = visible.length
    ? ""
    : `<p class="muted">No listed officers here yet. Plot → Seek Legend, or Create below.</p>`;
  const addHow = `<p class="muted">${HIRE_LINE} Create custom (cap 10). Court ${court.length} · generals ${gens.length}/5.</p>`;
  const types = Object.entries(content.officers.personalities || {});
  const typeOpts = types
    .map(([id, per]) => `<option value="${esc(id)}"${id === "loyalist" ? " selected" : ""}>${esc(per.label || id)}</option>`)
    .join("");
  const slots = state.contentMeta.customOfficerSlots || 10;
  const full = state.customSlotsUsed >= slots;
  const createBlock = `
    <h2>Create officer (${state.customSlotsUsed}/${slots})</h2>
    <p class="muted">Original general — not licensed IP. Stats ${CUSTOM_STAT_MIN}–${CUSTOM_STAT_MAX} each, total ≤ ${CUSTOM_STAT_BUDGET}. Adds to the free roster here; Plot → Hire to put them in court / a general slot.</p>
    <p class="muted">Set the portrait — original faces only.</p>
    <div class="face-grid" id="c-faces">${originalFaceGrid()
      .map(
        (f, i) =>
          `<button type="button" class="face-tile${i === 0 ? " is-on" : ""}" data-face="${f.id}"><img src="${f.src}" alt="${f.id}" /></button>`
      )
      .join("")}</div>
    <input type="hidden" id="c-face" value="F0" />
    <div class="creator">
      <div class="portrait portrait-lg" id="c-portrait" aria-hidden="true"><img id="c-portrait-img" src="${faceSrc("F0")}" alt="" /></div>
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
    <button type="button" id="c-add" class="primary"${full ? " disabled" : ""}>${full ? "Slots full (10)" : "Add free officer here"}</button>`;
  return `<h2>Officers (${visible.length} visible)</h2>${addHow}${createBlock}
    <hr />
    ${locked}${emptyAdd}${rows}
    <p></p><button type="button" data-close>Close</button>`;
}

function missionsHtml() {
  if (!state) return `<p>No game.</p>`;
  const p = playerOf(state);
  const jobs = openMissions(state);
  const stash = (state.stash || []).slice(-8);
    const empty = jobs.length
    ? ""
    : `<p class="muted">No jobs. Raise a banner, then End Week. Scout, raid, escort, radio, cache, ford, strip, claim, ice, ranch, porch.</p>`;
  const rows = jobs
    .map((j) => {
      const dest = regionOf(state, j.regionId);
      const here = j.regionId === p.region;
      const adj = dest && isAdjacent(state, p.region, dest);
      const loc = dest?.short || j.regionId;
      const copy = missionCopy(j, j.regionId);
      const lock = !here && !adj;
      return `<button type="button" class="list-btn mission-row" data-job="${j.id}" ${here ? "" : adj ? "data-travel='1'" : "data-locked='1'"} ${lock ? "disabled" : ""}>
        <img class="cmd-thumb" src="${sceneArt(j.templateId)}" alt="" />
        <span><strong>${esc(j.name)}</strong> · ${esc(loc)}${dest?.stateCode ? ` · ${esc(dest.stateCode)}` : ""} · 1 AP
        <small>${esc(copy)}</small>
        ${here ? "<small>Here — take it.</small>" : adj ? "<small>Adjacent — travel the road first.</small>" : "<small>Route locked — not adjacent. Cannot leap.</small>"}
        </span></button>`;
    })
    .join("");
  const loot = stash.length
    ? `<p class="muted">Stash: ${stash.map((s) => esc(s.name)).join(" · ")}</p>`
    : `<p class="muted">Stash empty. Jobs can grant scrip, pads, ranch tokens.</p>`;
  return `<h2>Side missions (${jobs.length} open)</h2>
    <p class="muted">1 AP here, or a general's Side mission at End Week.</p>
    ${empty}${rows}${loot}
    <button type="button" data-close>Close</button>`;
}

function campaignHtml() {
  if (!state) return `<p>No game.</p>`;
  const camp = ensureCampaign(state);
  const here = regionOf(state, playerOf(state).region);
  const blocks = stateControl(state)
    .map((s) => {
      const mark = s.liberated ? "LIB" : `${s.held}/${s.need} key · ${s.heldTerr}/${s.totalTerr} terr`;
      const terr = (s.territories || [])
        .map((t) => {
          const tags = (t.geo || []).map((g) => g.label).join("/");
          const route = t.here ? "here" : t.adjacent ? "road open" : "route locked";
          return `<small>${esc(t.short)}${t.key ? " ★" : ""} · ${tags || "—"} · ${route}</small>`;
        })
        .join("");
      return `<div class="card" style="margin:8px 0">
        <h2>${esc(s.name)} · ${esc(s.id)}</h2>
        <p>${esc(mark)}</p>
        ${terr}
      </div>`;
    })
    .join("");
  const foreign = (camp.foreign || [])
    .map((f) => {
      const lock = f.unlocked ? (f.held ? "held" : "open") : `phase ${f.unlockPhase}`;
      return `<p>${esc(f.name)} — ${lock}</p>`;
    })
    .join("");
  return `
    <h2>States → territories</h2>
    <p class="muted">You are in ${esc(here?.short || "?")} (${esc(here?.stateCode || "—")}). Liberate a state by holding ★ key territories. No leaping — only adjacent roads. Farm/mine/fuel/water/sun/weather/defense change weekly yields.</p>
    <div class="city-grid">${stateControl(state)
      .map((s) => `<span class="pill"><span>${esc(s.id)}</span><strong>${s.liberated ? "LIB" : `${s.held}/${s.need}`}</strong></span>`)
      .join("")}</div>
    ${blocks}
    <h2>Foreign war council</h2>
    <p class="muted">After Phase 2 the far-shore desks unlock. A sponsor may add another country as a takeable front.</p>
    ${foreign || "<p class='muted'>No foreign desks yet.</p>"}
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

let chairFlashId = "";
let dingTimer = 0;

function markChairFlash(officerId) {
  chairFlashId = officerId || playerGenerals(state).slice(-1)[0]?.id || "";
  setTimeout(() => {
    chairFlashId = "";
    document.querySelectorAll(".court-chair.just-in").forEach((el) => el.classList.remove("just-in"));
  }, 1600);
}

function flashDing(text) {
  const el = $("ding");
  if (!el || !text) return;
  el.textContent = text;
  el.hidden = false;
  el.classList.remove("pop");
  void el.offsetWidth;
  el.classList.add("pop");
  if (dingTimer) clearTimeout(dingTimer);
  dingTimer = setTimeout(() => {
    el.hidden = true;
    el.classList.remove("pop");
  }, 1400);
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
    hideModal({ flush: false });
    maybeAdvanceCoach(id);
    openBattle();
    return;
  }
  if (res.duel) {
    hideModal({ flush: false });
    maybeAdvanceCoach(id);
    openDuel();
    return;
  }
  if (res.council) {
    showModal(campaignHtml());
    render();
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
    const title = res.chairFilled
      ? "Chair filled"
      : res.married
        ? "House bound"
        : res.courting
          ? "Bond ticks"
          : a?.label || id;
    showEventScene({
      id: res.sceneId || id,
      title,
      text: res.message || "The room goes still.",
      regionId: extra?.regionId || playerOf(state).region,
      celebrate: !!(res.chairFilled || res.married || res.dings),
    });
  }
  if (res.weekEnd) {
    if (res.chronicle && res.chronicle.length) openChronicle(res.chronicle, res.report);
    else showModal(weekReportHtml(res.report || []), { kind: "week" });
  }
  if (state.gameOver) {
    showModal(`<h2>Campaign closed</h2><p>${esc(state.ending || state.gameOver)}</p><button type="button" data-close>Close</button>`);
  }
  maybeAdvanceCoach(id);
  render();
  if (res.dings?.length) flashDing(res.dings.join("  ·  "));
  if (res.chairFilled) markChairFlash(extra?.officerId);
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
  $("app").dataset.season = state._season?.id || "";
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
  if (state.phase === "duel") openDuel();
  else if ($("duel") && !$("duel").hidden && !state.duel) {
    $("duel").hidden = true;
    stopDuelLoop();
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
  const stripe = fac?.color || "#607838";
  return `
    <div class="chrome-head">
      <span class="panel-title">Ruler</span>
      <span class="panel-why">Who holds this chair.</span>
    </div>
    <div class="plate-body">
      <i class="banner-stripe" style="background:${esc(stripe)}"></i>
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
  const fac = p.faction ? factionOf(state, p.faction) : null;
  const stripe = fac?.color || "#a0a0d0";
  const chairs = [];
  for (let i = 0; i < MAX_GENERALS; i++) {
    const g = gens[i];
    if (g) {
      chairs.push(`<div class="court-chair${chairFlashId === g.id ? " just-in" : ""}">
        <span class="mini" style="border-color:${esc(stripe)}">${esc(g.portrait || portraitInitials(g.name))}</span>
        <div class="who">
          <strong>${i + 1}. ${esc(g.name)}</strong>
          <small>AGE ${g.age || "?"} · LOY ${g.loyalty} · ${esc(g.title || "officer")}</small>
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
      if (!p.faction) hint = "Raise Banner, then Plot → Hire.";
      else if (wait[0]) hint = `Plot → Appoint ${esc(wait[0].name)}.`;
      else hint = "Plot → Hire fills this ADD chair.";
      chairs.push(`<button type="button" class="court-chair empty" data-add-gen="${i}">
        <span class="mini empty-mini">+</span>
        <div class="who"><strong>${i + 1}. ADD</strong><small>${hint}</small></div>
      </button>`);
    }
  }
  return `<div class="chrome-head"><span class="panel-title">Court</span><span class="panel-why">Five chairs. Orders at End Week.</span></div>${chairs.join("")}`;
}

function cityHtml() {
  const r = regionOf(state, selectedRegion) || regionOf(state, playerOf(state).region);
  const p = playerOf(state);
  const f = r.owner ? factionOf(state, r.owner) : null;
  const known = r.intel > 0 || (playerOf(state).faction && r.owner === playerOf(state).faction);
  const garr = known ? r.garrison : "???";
  const walls = known ? r.walls : "?";
  const order = known ? r.order : "?";
  const econ = known ? r.economy : "?";
  const plus = (r.plus || []).join(" · ");
  const minus = (r.minus || []).join(" · ");
  const kind = markerKind(r);
  return `
    <div class="chrome-head">
      <span class="panel-title">City report</span>
      <span class="panel-why">Selected city.</span>
    </div>
    <div class="city-oversee">
      <div class="medallion">
        <i class="tick tl"></i><i class="tick tr"></i><i class="tick bl"></i><i class="tick br"></i>
        <img class="officer-face" src="${PORTRAIT_SRC}" alt="" />
      </div>
      <div class="oversee-meta">
        <p class="oversee-ap">AP <strong>${state.ap}</strong>/${apMax(state)}</p>
        <h2><i class="banner-tick" style="background:${esc(f?.color || "#607838")}"></i>${esc(r.stateCode || "—")} → ${esc(r.short)}</h2>
        <p class="muted">${esc(p.name)} · ${kind} · ${f ? esc(f.short) : "OPEN"}</p>
      </div>
    </div>
    <div class="city-body">
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
      <p class="plus">Geo: ${geoTags(r).map((t) => `${t.label} ${t.n}`).join(" · ") || "none"}</p>
      ${(() => {
        const row = stateControl(state).find((s) => s.id === r.stateCode);
        const here = regionOf(state, playerOf(state).region);
        const adj = here && isAdjacent(state, here, r);
        const at = here?.id === r.id;
        const route = at ? "You are here" : adj ? "Adjacent road open" : "Route locked — not adjacent";
        const lib = row?.liberated ? `Liberated ${r.stateCode}` : `${r.stateCode || "—"} ${row ? `${row.heldTerr}/${row.totalTerr} territories · ${row.held}/${row.need} key` : ""}`;
        return `<p class="plus">${esc(lib)}</p><p class="minus">${esc(route)}</p>`;
      })()}
      ${legendBoard(state)
        .filter((h) => h.regionId === r.id)
        .map((h) => `<p class="rumor">${esc(h.rumor)}</p>`)
        .join("")}
    </div>
  `;
}

function weekReportHtml(report) {
  const lines = report || [];
  const headline = lines[0] || `Week ${state.week} turns.`;
  const payoff = lines.find((l) => /blizzard|scrip|pamphlets|legend|Seek|stores|gold|order/i.test(l) && l !== headline);
  const ai = lines.filter((l) => /\[[a-z]+\]/.test(l)).slice(0, 5);
  const extra = Math.max(0, lines.length - 1 - ai.length);
  const tease = weekTease(state);
  return `<div class="event-art week-art"><img src="${sceneUrl("season")}" alt="" /><img class="event-face" src="${PORTRAIT_SRC}" alt="" /></div>
    <h2>Week ${state.week} turns</h2>
    <p class="week-payoff">${esc(headline)}</p>
    ${payoff ? `<p>${esc(payoff)}</p>` : ""}
    <ul class="week-ai">${ai.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
    <p class="week-tease">Next week may bring ${esc(tease)}.</p>
    <p class="next-line">${esc(nextHint(state))}</p>
    <p class="muted">${extra ? `${extra} more in the field log. ` : ""}One more week?</p>
    <button type="button" data-close class="primary">Begin week ${state.week}</button>`;
}

const ACTION_CATS = {
  domestic: ["raise_banner", "drill", "commerce", "cultivate", "fortify", "safety", "research"],
  plot: ["hire", "appoint", "court", "challenge", "spy", "seek_legend", "ally", "rumor", "persuade", "hide", "break_ally"],
  military: ["travel", "attack", "mission", "challenge"],
};
const TAB_TIPS = {
  domestic: "<strong>Domestic</strong><p>Town work: raise a banner, food, gold, walls, salvage.</p>",
  plot: "<strong>Plot</strong><p>People work: hire, appoint generals, court, spy, rumor, alliance, challenge.</p>",
  military: "<strong>Military</strong><p>Move on gold roads, march, take a side mission, or challenge an officer in this city.</p>",
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
  "challenge",
  "porch_challenge",
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
    body: "Domestic is town work. Click RAISE BANNER to claim Cheyenne as Northern Front. It costs 1 AP.",
    target: '[data-id="raise_banner"]',
    cat: "domestic",
  },
  {
    id: "hire",
    title: "3 / 4  Fill an ADD chair",
    body: "Plot → Hire fills an ADD chair (5 generals). Extras wait — Plot → Appoint. Same words on the court strip.",
    target: '[data-id="hire"]',
    cat: "plot",
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
  const lock = !a.enabled ? "LOCK" : state.ap < a.ap ? `${a.ap}AP` : `${a.ap}`;
  b.innerHTML = `<img class="cmd-thumb" src="${sceneArt(a.id)}" alt="" /><span><b>${esc(a.label)}</b><small>${esc(lock)}</small></span>`;
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
  if ($("modal") && !$("modal").hidden) {
    $("modal").hidden = true;
    $("modal-card").className = "modal-card";
  }
  parkCoach();
  $("event-vignette").src = sceneArt(ev.id);
  $("event-portrait").src = PORTRAIT_SRC;
  $("event-title").textContent = ev.title || "Event";
  $("event-text").textContent = ev.text || "";
  const next = $("event-next");
  if (next) next.textContent = ev.chronicle ? "CONTINUE for the next chronicle beat." : state ? nextHint(state) : "";
  const el = $("event-scene");
  const card = el.querySelector(".event-card");
  if (card) card.classList.toggle("celebrate", !!ev.celebrate);
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
  silentHideEvent();
  if (chronicleQueue.length || pendingWeekReport) {
    showNextChronicle();
    return;
  }
  flushOverlays();
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
    showModal(`<h2>${esc(a.label)}</h2><p class="muted">Adjacent roads only. No leaping.</p>${list.map((r) => `<button class="list-btn" data-act="${a.id}" data-region="${r.id}"><img class="cmd-thumb" src="${sceneArt(a.id)}" alt="" /><span>${esc(r.stateCode || "—")} → ${esc(r.short)} · ${geoTags(r).map((t) => t.label).join("/") || "—"}</span></button>`).join("")}<button data-close>Cancel</button>`);
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
    showModal(`<h2>Hire into court / generals</h2><p class="muted">${HIRE_LINE}</p>${cs.map((o) => `<button class="list-btn" data-hire="${o.id}"><img class="cmd-thumb" src="${sceneArt("hire")}" alt="" /><span>${esc(o.name)} · ${o.personality} · ambition ${o.ambition}${o.elite ? " · ELITE" : ""}${o.legend ? " · LEGEND" : ""}</span></button>`).join("")}<button data-close>Cancel</button>`);
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
    if (!cs.length) return toast("Court empty. " + HIRE_LINE);
    showModal(`<h2>Appoint general (${playerGenerals(state).length}/5)</h2><p class="muted">Plot → Appoint puts a court officer in an ADD chair (5 max). Standing orders fire at End Week.</p>${cs.map((o) => `<button class="list-btn" data-appoint="${o.id}"><img class="cmd-thumb" src="${sceneArt("appoint")}" alt="" /><span>${esc(o.name)} · ${o.personality} · ${esc(o.title)}</span></button>`).join("")}<button data-close>Cancel</button>`);
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
  if (a.needs === "challenge") {
    const cs = challengeCandidates(state);
    if (!cs.length) return toast("No listed officer in this city.");
    showModal(`<h2>Challenge</h2><p class="muted">Yard duel in this city. Keys: 1 Strike, 2 Guard, 3 Special · your style move. Clock ~99s if both stay up. Green window is a timing bonus — not a combo game.</p>${cs.map((o) => `<button class="list-btn" data-challenge="${o.id}"><img class="cmd-thumb" src="${sceneArt("challenge")}" alt="" /><span>${esc(o.name)} · ${esc(o.title)} · AGE ${o.age || "?"} · WAR ${o.war}${o.legend ? " · LEGEND" : ""}</span></button>`).join("")}<button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-challenge]").forEach((btn) => {
      btn.onclick = () => {
        hideModal();
        run("challenge", { officerId: btn.dataset.challenge });
      };
    });
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
      ${list.map((r) => `<button class="list-btn" data-atk="${r.id}"><img class="cmd-thumb" src="${sceneArt("attack")}" alt="" /><span>${esc(r.stateCode || "—")} → ${esc(r.short)} · ${r.owner ? factionOf(state, r.owner)?.short : "open"} · ${geoTags(r).map((t) => t.label).join("/") || "—"}</span></button>`).join("")}
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

/** East and Gulf states have no cities. They read occupied up to the Cheyenne–KS/MO stall.
 *  AZ and NM stay bare. CA and NV wash from their real city owners. */
const OCCUPIED_EAST = new Set(
  "ND SD MN IA OK TX AR LA WI IL IN MI OH KY TN MS AL GA FL SC NC VA WV PA NY NJ DE MD CT RI MA VT NH ME".split(" "),
);

function stateWash(postal) {
  const code = String(postal || "").toUpperCase();
  const cities = state.regions.filter((r) => r.stateCode === code && !(r.unlockPhase > 0));
  if (!cities.length) {
    if (OCCUPIED_EAST.has(code)) return { color: "#9a3b3b", kind: "occupied" };
    return null;
  }
  const p = playerOf(state);
  const liberated = (ensureCampaign(state).liberated || []).includes(code);
  if (liberated || (p?.faction && cities.every((r) => r.owner === p.faction))) {
    const fac = p?.faction ? factionOf(state, p.faction) : null;
    return { color: fac?.color || "#d4a056", kind: "held" };
  }
  const counts = {};
  cities.forEach((r) => {
    if (r.owner) counts[r.owner] = (counts[r.owner] || 0) + 1;
  });
  const ids = Object.keys(counts);
  if (!ids.length) return null;
  ids.sort((a, b) => counts[b] - counts[a]);
  const top = factionOf(state, ids[0]);
  const invaderN = ids.reduce((n, id) => n + (factionOf(state, id)?.alignment === "invader" ? counts[id] : 0), 0);
  if (invaderN * 2 >= cities.length) {
    const inv = ids.map((id) => factionOf(state, id)).find((f) => f?.alignment === "invader");
    return { color: inv?.color || "#9a3b3b", kind: "occupied" };
  }
  if (ids.length > 1) return { color: top?.color || "#c9a06a", kind: "contested" };
  return { color: top?.color || "#6a8f5a", kind: "local" };
}

function foreignCorridors() {
  const out = [];
  const add = (id, b, color) => {
    const r = regionOf(state, id);
    if (!r || !theaterVisible(state, r)) return;
    out.push({ a: cityXY(r), b, color });
  };
  add("far_russia", [8, 72], "#7aa0b4");
  add("far_cuba", [470, 568], "#8c4a4a");
  add("far_nicaragua", [620, 572], "#8c4a4a");
  return out;
}

function toggleLegend() {
  const card = $("legend-card");
  if (!card) return;
  card.hidden = !card.hidden;
}

function renderLegend() {
  const phases = ["Prairie Fire", "Gulf", "Border Fury", "Bering"]
    .map((name) => `<span class="phase-line">${esc(name)}</span>`)
    .join("");
  const scars = NUKE_SCARS.map((s) => esc(s.name)).join(" ");
  const banners = state.factions
    .filter((f) => f.onMap && (f.id !== "northern_front" || f.alive))
    .map((f) => `<span><i style="background:${f.color}"></i>${esc(f.short)}</span>`)
    .join("");
  $("legend").innerHTML = `${phases}<span>Scars ${scars}</span>${banners}<span><i style="background:#5a6a72"></i>Open</span>`;
}

const mapView = { z: 1, x: 0, y: 0, drag: null };

function canvasPoint(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return [
    ((e.clientX - rect.left) / rect.width) * canvas.width,
    ((e.clientY - rect.top) / rect.height) * canvas.height,
  ];
}

function zoomBy(factor) {
  const sx = 500;
  const sy = 310;
  const next = Math.max(0.16, Math.min(3.2, mapView.z * factor));
  mapView.x = sx - ((sx - mapView.x) / mapView.z) * next;
  mapView.y = sy - ((sy - mapView.y) / mapView.z) * next;
  mapView.z = next;
  drawMap();
}

function frameBox(x0, y0, x1, y1) {
  const z = Math.min(1000 / (x1 - x0), 620 / (y1 - y0)) * 0.88;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  mapView.z = z;
  mapView.x = 500 - cx * z;
  mapView.y = 310 - cy * z;
  drawMap();
}

function frameWorld() {
  const [xWest, yNorth] = projectLL(-175, 78);
  const [xEast, ySouth] = projectLL(185, -56);
  const minX = Math.min(xWest, xEast) - 30;
  const maxX = Math.max(xWest, xEast) + 30;
  const minY = Math.min(yNorth, ySouth) - 24;
  const maxY = Math.max(yNorth, ySouth) + 24;
  const z = Math.min(1000 / (maxX - minX), 620 / (maxY - minY)) * 0.98;
  mapView.z = z;
  mapView.x = (1000 - (minX + maxX) * z) / 2;
  mapView.y = (620 - (minY + maxY) * z) / 2;
  drawMap();
}

function frameNear() {
  mapView.z = 0.56;
  mapView.x = 48;
  mapView.y = 18;
  drawMap();
}

function frameCa() {
  frameBox(20, 200, 300, 520);
}

function frameGulf() {
  frameBox(470, 300, 760, 610);
}

function onMapPointerDown(e) {
  const canvas = $("map");
  const [sx, sy] = canvasPoint(e, canvas);
  mapView.drag = { sx, sy, x: mapView.x, y: mapView.y, moved: false };
  canvas.setPointerCapture?.(e.pointerId);
}

function onMapPointerMove(e) {
  if (!mapView.drag) {
    onMapMove(e);
    return;
  }
  const [sx, sy] = canvasPoint(e, $("map"));
  const dx = sx - mapView.drag.sx;
  const dy = sy - mapView.drag.sy;
  if (Math.hypot(dx, dy) > 3) mapView.drag.moved = true;
  if (!mapView.drag.moved) return;
  mapView.x = mapView.drag.x + dx;
  mapView.y = mapView.drag.y + dy;
  drawMap();
}

function onMapPointerUp(e) {
  const moved = mapView.drag?.moved;
  mapView.drag = null;
  if (!moved) onMapClick(e);
}

function regionAt(mx, my, canvas) {
  const [sx, sy] = canvasPoint({ clientX: mx, clientY: my }, canvas);
  const x = (sx - mapView.x) / mapView.z;
  const y = (sy - mapView.y) / mapView.z;
  return state.regions.find((r) => theaterVisible(state, r) && hitPoly(r.polygon, x, y));
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

const WASH_KEY_US = `<span><i class="key-occ"></i>Occupied</span><span><i class="key-con"></i>Contested</span><span><i class="key-held"></i>Held</span>`;
const WASH_KEY_WORLD = `<span><i class="key-sov"></i>Soviet</span><span><i class="key-bloc"></i>Bloc</span><span><i class="key-ally"></i>Allies</span><span><i class="key-neu"></i>Neutral</span>`;

function syncWashKey() {
  const key = document.querySelector(".wash-key");
  if (!key) return;
  const mode = mapView.z < 0.5 ? "world" : "us";
  if (key.dataset.mode === mode) return;
  key.dataset.mode = mode;
  key.innerHTML = mode === "world" ? WASH_KEY_WORLD : WASH_KEY_US;
  key.setAttribute("aria-label", mode === "world" ? "Faction key" : "Wash key");
}

function renderMapCaption() {
  const cap = $("map-caption");
  if (!cap || !state) return;
  const r = regionOf(state, selectedRegion) || regionOf(state, playerOf(state).region);
  const you = regionOf(state, playerOf(state).region);
  const camp = ensureCampaign(state);
  const row = stateControl(state).find((s) => s.id === r?.stateCode);
  const here = you;
  const adj = r && here && isAdjacent(state, here, r);
  const at = r && here && r.id === here.id;
  const route = !r ? "" : at ? "here" : adj ? "adjacent" : "route locked";
  const hold = row ? `${row.heldTerr}/${row.totalTerr} terr · ${row.held}/${row.need} key` : "";
  cap.textContent = `${state._season?.name || ""} ${calendarYear(state.week)} · ${r?.stateCode || "—"} → ${r?.short || "?"} · ${hold} · ${route} · phase ${camp.phase}`;
}

function cityXY(r) {
  const p = r.city || r.label;
  return [p[0], p[1]];
}

const MAP_S = terrainSize().scale;
const LOW_W = terrainSize().w;
const LOW_H = terrainSize().h;
const PX_FONT = "16px 'Press Start 2P', 'Courier New', monospace";
const PLATE_FONT = "16px 'Press Start 2P', 'Courier New', monospace";
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
  const on = pulse && Math.floor((performance.now() - mapFx.t0) / 420) % 2 === 0;
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
  draw80sMarker(ctx, markerKind(r), x, y, selected, fill);
  const p = playerOf(state);
  if (p.region === r.id) {
    ctx.fillStyle = "#f8d800";
    ctx.fillRect(x - 8, y - 18, 4, 4);
  }
  if (r.id === "arctic_slope" && legendStatus(state).mapMark) {
    ctx.fillStyle = "#d080f8";
    ctx.fillRect(x + 8, y - 4, 2, 2);
  }
  legendBoard(state).forEach((h) => {
    if (h.regionId !== r.id || !h.mapMark) return;
    ctx.fillStyle = "#d080f8";
    ctx.fillRect(x + 8, y - 4, 2, 2);
  });
}

const STATE_FILL = {
  ak: "#4a7080",
  yt: "#6a8a50",
  wa: "#2f8a58",
  or: "#4a9a40",
  id: "#6a8a38",
  mt: "#8a9a58",
  wy: "#b89440",
  ut: "#b07a38",
  co: "#d49838",
  ne: "#c8b060",
  ks: "#b8a050",
  mo: "#9a8850",
};

function ringCentroid(ring) {
  let x = 0;
  let y = 0;
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const c = ring[i][0] * ring[j][1] - ring[j][0] * ring[i][1];
    a += c;
    x += (ring[i][0] + ring[j][0]) * c;
    y += (ring[i][1] + ring[j][1]) * c;
  }
  a *= 0.5;
  if (Math.abs(a) < 1) {
    const n = ring.length || 1;
    return [ring.reduce((s, p) => s + p[0], 0) / n, ring.reduce((s, p) => s + p[1], 0) / n];
  }
  return [x / (6 * a), y / (6 * a)];
}

/** Every lower-48 postal, plus Alaska. Small states nudge apart; none are dropped. */
function drawStateLabels(ctx) {
  const lines = state.stateLines || [];
  ctx.font = "16px 'Press Start 2P', 'Courier New', monospace";
  const items = [];
  lines.forEach((line) => {
    const id = String(line.id || "");
    if (id.length !== 2 || id === "YT" || !line.ring?.length) return;
    const [cx, cy] = ringCentroid(line.ring);
    let minX = 1e9;
    let maxX = -1e9;
    let minY = 1e9;
    let maxY = -1e9;
    line.ring.forEach(([px, py]) => {
      minX = Math.min(minX, px);
      maxX = Math.max(maxX, px);
      minY = Math.min(minY, py);
      maxY = Math.max(maxY, py);
    });
    const w = Math.ceil(ctx.measureText(id).width) + 10;
    const pinned = id === "CA" || id === "NV";
    items.push({
      id,
      x: cx,
      y: cy,
      ox: cx,
      oy: cy,
      w,
      h: 22,
      area: pinned ? 1e9 : Math.max(400, (maxX - minX) * (maxY - minY)),
      pinned,
    });
  });
  for (let n = 0; n < 40; n++) {
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        const overlapX = a.w / 2 + b.w / 2 + 4 - Math.abs(b.x - a.x);
        const overlapY = a.h / 2 + b.h / 2 + 2 - Math.abs(b.y - a.y);
        if (overlapX <= 0 || overlapY <= 0) continue;
        const dx = b.x - a.x || 1;
        const dy = b.y - a.y || 0.25;
        const len = Math.hypot(dx, dy) || 1;
        const wa = b.area / (a.area + b.area);
        const wb = a.area / (a.area + b.area);
        const push = Math.min(overlapX, overlapY) + 1;
        a.x -= (dx / len) * push * wa;
        a.y -= (dy / len) * push * wa;
        b.x += (dx / len) * push * wb;
        b.y += (dy / len) * push * wb;
      }
    }
  }
  items.forEach((a) => {
    if (a.pinned) {
      a.x = a.ox;
      a.y = a.oy;
    }
    a.x = Math.max(6 + a.w / 2, Math.min(994 - a.w / 2, a.x));
    a.y = Math.max(16, Math.min(604, a.y));
    const px = Math.round(a.x - a.w / 2);
    const py = Math.round(a.y - a.h / 2);
    if (a.pinned) {
      ctx.fillStyle = "#f8d800";
      ctx.fillRect(px - 3, py - 3, a.w + 6, a.h + 6);
    }
    ctx.fillStyle = "#000018";
    ctx.fillRect(px - 2, py - 2, a.w + 4, a.h + 4);
    ctx.fillStyle = "#f8f8f8";
    ctx.fillRect(px, py, a.w, a.h);
    ctx.fillStyle = "#101050";
    ctx.fillText(a.id, px + 5, py + 16);
  });
  ctx.font = PX_FONT;
}

function projectLL(lon, lat) {
  const x = 36 + ((lon + 124.8) / 57.9) * 942;
  const y = 132 + ((49.45 - lat) / 25.05) * 476;
  return [x, y];
}

/** Existing nodes only. Pins sit on the globe; neighbor lists stay put. */
const WORLD_DESKS = [
  { id: "bering_strait", lon: -168, lat: 65.6, color: "#7aa0b4" },
  { id: "far_russia", lon: 158, lat: 63, color: "#9a3b3b" },
  { id: "gulf_passage", lon: -90.5, lat: 23.8, color: "#8c4a4a" },
  { id: "far_cuba", lon: -79.5, lat: 21.6, color: "#8c4a4a" },
  { id: "far_nicaragua", lon: -85.2, lat: 12.4, color: "#8c4a4a" },
  { id: "far_korea", lon: 127.2, lat: 38.2, color: "#9a3b3b" },
];

/** Small overlays on top of the coast washes. Original shapes, not a copied atlas. */
const WORLD_OVERLAY = [
  {
    color: "#e57373",
    ring: [
      [10.9, 54.1], [12.2, 54.4], [14.2, 54.1], [14.6, 53.3], [14.8, 52.2],
      [14.9, 51.2], [14.2, 50.9], [12.5, 50.3], [11.6, 50.5], [10.6, 51.0],
      [10.4, 51.6], [10.9, 52.4], [10.5, 53.2], [10.9, 54.1],
    ],
  },
  {
    color: "#1565c0",
    ring: [
      [-160.2, 22.2], [-159.2, 22.2], [-157.8, 21.6], [-156.5, 20.9],
      [-155.1, 20.0], [-154.8, 19.4], [-155.6, 19.1], [-157.0, 20.2],
      [-158.4, 21.3], [-160.2, 22.2],
    ],
  },
];

function coastParts(ring) {
  const parts = [];
  let part = [];
  ring.forEach((pt) => {
    if (part.length && Math.abs(pt[0] - part[part.length - 1][0]) > 180) {
      if (part.length > 2) parts.push(part);
      part = [pt];
    } else part.push(pt);
  });
  if (part.length > 2) parts.push(part);
  return parts;
}

function tracePart(ctx, part) {
  part.forEach((p, i) => {
    const [x, y] = projectLL(p[0], p[1]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
}

function drawGlobe(ctx) {
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(1.5, 2.05 / mapView.z);
  ctx.strokeStyle = "#1a140c";
  WORLD_LAND.concat(WORLD_OVERLAY).forEach((land) => {
    coastParts(land.ring).forEach((part) => {
      ctx.beginPath();
      tracePart(ctx, part);
      const a = part[0];
      const b = part[part.length - 1];
      if (Math.abs(a[0] - b[0]) > 40) {
        const pole = Math.min(a[1], b[1]) < 0 ? -90 : 90;
        const [x1, y1] = projectLL(b[0], pole);
        const [x2, y2] = projectLL(a[0], pole);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.fillStyle = land.color;
      ctx.fill();
      ctx.beginPath();
      tracePart(ctx, part);
      ctx.stroke();
    });
  });
  drawWorldStrikes(ctx);
  drawWorldCorridors(ctx);
  drawWorldDesks(ctx);
  ctx.restore();
}

/**
 * Sea marks only — not roads.
 * Bering→Russia uses nome → bering_strait → far_russia.
 * Gulf uses st_louis → gulf_passage → far_cuba → far_nicaragua.
 */
function drawWorldCorridors(ctx) {
  if (mapView.z > 0.92) return;
  const routes = [
    { color: "#7aa0b4", pts: [[-168, 65.6], [-170, 76], [-78, 77]] },
    { color: "#7aa0b4", pts: [[-18, 76], [40, 74], [100, 70], [158, 63]] },
    { color: "#8c4a4a", pts: [[-90.5, 23.8], [-79.5, 21.6]] },
    { color: "#8c4a4a", pts: [[-90.5, 23.8], [-85.2, 12.4]] },
  ];
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.setLineDash([14 / mapView.z, 9 / mapView.z]);
  routes.forEach((route) => {
    const draw = (width, color) => {
      ctx.beginPath();
      route.pts.forEach((p, i) => {
        const [x, y] = projectLL(p[0], p[1]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.stroke();
    };
    draw(Math.max(8, 7 / mapView.z), "#1a140c");
    draw(Math.max(4, 3.6 / mapView.z), route.color);
  });
  ctx.restore();
}

/** Unlabeled strike marks. Same crater language as the US plate, not a copied legend. */
const WORLD_STRIKES = [
  [-0.1, 51.5],
  [2.3, 48.9],
  [10, 51],
  [13.4, 52.5],
  [19, 51],
  [30, 50],
  [37.6, 55.7],
  [44, 48],
  [68, 48],
  [104, 36],
  [114, 31],
  [121, 31],
  [127, 39],
  [139.7, 35.7],
  [37, 33],
];

function drawWorldStrikes(ctx) {
  if (mapView.z > 0.92) return;
  const rad = Math.max(3.4, 3.1 / mapView.z);
  WORLD_STRIKES.forEach(([lon, lat]) => {
    const [x, y] = projectLL(lon, lat);
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fillStyle = "#1a0808";
    ctx.fill();
    ctx.lineWidth = Math.max(1.8, 1.6 / mapView.z);
    ctx.strokeStyle = "#e8a020";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, Math.max(2, rad * 0.34), 0, Math.PI * 2);
    ctx.fillStyle = "#f8d800";
    ctx.fill();
  });
}

function drawWorldDesks(ctx) {
  if (mapView.z > 0.92) return;
  const fontPx = Math.max(18, Math.round(12 / mapView.z));
  ctx.font = `${fontPx}px 'Press Start 2P', 'Courier New', monospace`;
  ctx.textBaseline = "middle";
  WORLD_DESKS.forEach((d) => {
    const node = regionOf(state, d.id);
    if (!node) return;
    const [x, y] = projectLL(d.lon, d.lat);
    const r = Math.max(8, 5 / mapView.z);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = d.color || "#9a3b3b";
    ctx.fill();
    ctx.lineWidth = Math.max(2, 1.5 / mapView.z);
    ctx.strokeStyle = "#f8d800";
    ctx.stroke();
    const label = node.short;
    const tw = ctx.measureText(label).width;
    const pad = 6 / mapView.z;
    const lx = x + r + 4 / mapView.z;
    const ly = y;
    ctx.fillStyle = "#000018";
    ctx.fillRect(lx - 2, ly - fontPx * 0.65, tw + pad, fontPx * 1.3);
    ctx.fillStyle = "#f8d800";
    ctx.fillText(label, lx, ly);
  });
}

function plateAwayFromSelected(r, px, py, pw, ph) {
  const sel = regionOf(state, selectedRegion);
  if (!sel || sel.id === r.id) return [px, py];
  const [sx, sy] = cityXY(sel);
  const box = {
    x: px - 2,
    y: py - 2,
    w: pw + 4,
    h: ph + 4,
  };
  const hit =
    box.x < sx + 96 &&
    box.x + box.w > sx - 96 &&
    box.y < sy + 64 &&
    box.y + box.h > sy - 48;
  if (!hit) return [px, py];
  const [cx, cy] = cityXY(r);
  return [px, Math.max(4, Math.round(cy - ph - 14))];
}

function drawHereChip(ctx, r, x, y) {
  ctx.font = PLATE_FONT;
  const nameW = ctx.measureText(r.short).width;
  const pw = Math.max(64, Math.ceil((nameW + 24) / 4) * 4);
  const ph = 28;
  let px = Math.round(x - pw / 2);
  let py = Math.round(y - ph - 12);
  px = Math.max(4, Math.min(996 - pw, px));
  [px, py] = plateAwayFromSelected(r, px, py, pw, ph);
  if (py < 4) py = Math.round(y + 18);
  ctx.fillStyle = "#000018";
  ctx.fillRect(px - 3, py - 3, pw + 6, ph + 6);
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = "#101050";
  ctx.fillRect(px + 3, py + 3, pw - 6, ph - 6);
  ctx.fillStyle = "#f8d800";
  ctx.fillText(r.short, px + 8, py + 20);
}

function drawCityPlate(ctx, r, selected) {
  const [x, y] = cityXY(r);
  const fac = r.owner ? factionOf(state, r.owner) : null;
  const p = playerOf(state);
  const here = p.region === r.id;
  const known = r.intel > 0 || (p.faction && r.owner === p.faction);
  const garr = known ? String(r.garrison) : "?";
  const keepGulf = r.id === "gulf_passage";
  if (!selected && !here && r.id !== hoverRegion && !keepGulf) return;
  if (here && !selected) {
    drawHereChip(ctx, r, x, y);
    return;
  }
  ctx.font = PLATE_FONT;
  const nameW = ctx.measureText(r.short).width;
  const garrW = ctx.measureText(garr).width;
  const pw = Math.max(120, Math.ceil((nameW + garrW + 40) / 4) * 4);
  const ph = 32;
  let px = Math.round(x - pw / 2);
  let py = r.plate === "above" ? Math.round(y - 44) : Math.round(y + 20);
  px = Math.max(4, Math.min(996 - pw, px));
  if (py < 4) py = Math.round(y + 20);
  if (py + ph > 616) py = Math.round(y - 44);
  [px, py] = plateAwayFromSelected(r, px, py, pw, ph);
  ctx.fillStyle = "#000018";
  ctx.fillRect(px - 4, py - 4, pw + 8, ph + 8);
  if (selected) {
    ctx.fillStyle = "#f8d800";
    ctx.fillRect(px - 4, py - 4, pw + 8, ph + 8);
    ctx.fillStyle = "#000018";
    ctx.fillRect(px - 2, py - 2, pw + 4, ph + 4);
  }
  ctx.fillStyle = selected ? "#f8d800" : "#f8f8f8";
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = "#101050";
  ctx.fillRect(px + 4, py + 4, pw - 8, ph - 8);
  ctx.fillStyle = fac ? fac.color : "#607838";
  ctx.fillRect(px + 4, py + 4, 5, ph - 8);
  ctx.fillStyle = "#f8d800";
  ctx.fillText(r.short, px + 14, py + 23);
  ctx.fillStyle = "#f8f8f8";
  ctx.fillText(garr, px + pw - 12 - garrW, py + 23);
}

function drawFrontSeg(ctx, a, b) {
  ctx.save();
  ctx.lineCap = "butt";
  ctx.strokeStyle = "#1a0808";
  ctx.lineWidth = 7;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(b[0], b[1]);
  ctx.stroke();
  ctx.strokeStyle = "#f8f8f8";
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 7]);
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(b[0], b[1]);
  ctx.stroke();
  ctx.restore();
}

function drawAxis(ctx, a, b, color) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "#1a0808";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(b[0], b[1]);
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  const tip = b;
  const baseX = b[0] - ux * 18;
  const baseY = b[1] - uy * 18;
  ctx.fillStyle = "#1a0808";
  ctx.beginPath();
  ctx.moveTo(tip[0] + ux * 4, tip[1] + uy * 4);
  ctx.lineTo(baseX + px * 12, baseY + py * 12);
  ctx.lineTo(baseX - px * 12, baseY - py * 12);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(tip[0], tip[1]);
  ctx.lineTo(baseX + px * 8, baseY + py * 8);
  ctx.lineTo(baseX - px * 8, baseY - py * 8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/** Original geo marks. Dark crater, amber ring — not a copied cloud icon. */
const NUKE_SCARS = [
  { x: 813, y: 332, name: "DC" },
  { x: 844, y: 304, name: "NY" },
  { x: 528, y: 329, name: "KC" },
  { x: 506, y: 290, name: "Offutt" },
  { x: 418, y: 155, name: "Minot" },
  { x: 488, y: 161, name: "GF" },
  { x: 390, y: 233, name: "Ellsworth" },
];

function drawNukeScars(ctx) {
  NUKE_SCARS.forEach((s) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#1a0808";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e8a020";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#f8d800";
    ctx.fill();
  });
}

/** Visual axes only. Names stay in the Banners panel, not on the land. */
function drawInvasionAxes(ctx) {
  drawAxis(ctx, [6, 34], [86, 86], "#7aa0b4");
  drawAxis(ctx, [334, 467], [482, 579], "#8c4a4a");
}

function drawStallFront(ctx) {
  const ids = ["cheyenne", "omaha", "lincoln", "topeka", "wichita", "st_louis"];
  let prev = null;
  ids.forEach((id) => {
    const r = regionOf(state, id);
    if (!r) {
      prev = null;
      return;
    }
    if (prev && isAdjacent(state, prev, r)) drawFrontSeg(ctx, cityXY(prev), cityXY(r));
    prev = r;
  });
  const end = regionOf(state, "st_louis");
  if (!end) return;
  const [x, y] = cityXY(end);
  ctx.fillStyle = "#1a0808";
  ctx.beginPath();
  ctx.moveTo(x + 6, y + 4);
  ctx.lineTo(x + 28, y + 20);
  ctx.lineTo(x + 8, y + 22);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#f8f8f8";
  ctx.beginPath();
  ctx.moveTo(x + 10, y + 8);
  ctx.lineTo(x + 24, y + 18);
  ctx.lineTo(x + 12, y + 18);
  ctx.closePath();
  ctx.fill();
}

/** World zoom keeps the state silhouette and drops the sea card and Alaska inset. */
function theaterLandPlate() {
  const src = drawMap.off;
  const c = document.createElement("canvas");
  c.width = src.width;
  c.height = src.height;
  const g = c.getContext("2d");
  g.drawImage(src, 0, 0);
  const img = g.getImageData(0, 0, c.width, c.height);
  const d = img.data;
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const i = (y * c.width + x) * 4;
      if (x < 268 && y < 136) {
        d[i + 3] = 0;
        continue;
      }
      const r = d[i];
      const gc = d[i + 1];
      const b = d[i + 2];
      if (b > 110 && r < 80 && gc < 175 && b > r + 40) d[i + 3] = 0;
    }
  }
  g.putImageData(img, 0, 0);
  return c;
}

function drawMap() {
  const canvas = $("map");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  if (!drawMap.off || drawMap.off.width !== LOW_W) {
    drawMap.off = document.createElement("canvas");
    drawMap.off.width = LOW_W;
    drawMap.off.height = LOW_H;
  }
  const o = drawMap.off.getContext("2d");
  o.imageSmoothingEnabled = false;
  const painted = state.regions.filter((r) => theaterVisible(state, r) || r.id === "gulf_passage");
  paintTheaterTerrain(o, state, {
    painted,
    selectedId: selectedRegion,
    hoverId: hoverRegion,
    factionOf: (r) => (r.owner ? factionOf(state, r.owner) : null),
    stateWash,
    corridors: foreignCorridors(),
  });
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  syncWashKey();
  ctx.fillStyle = mapView.z < 0.5 ? "#b7d4ea" : "#2a6890";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(mapView.z, 0, 0, mapView.z, mapView.x, mapView.y);
  ctx.imageSmoothingEnabled = false;
  drawGlobe(ctx);
  ctx.drawImage(mapView.z < 0.7 ? theaterLandPlate() : drawMap.off, 0, 0);
  ctx.imageSmoothingEnabled = false;
  mapRoads(painted).forEach((rd) => {
    const pulse = mapFx?.kind === "travel" && sameRoad(rd.a, rd.b, mapFx.a, mapFx.b);
    const on = pulse && Math.floor((performance.now() - mapFx.t0) / 420) % 2 === 0;
    drawPixelRoadFull(ctx, rd.a, rd.b, on);
  });
  drawStallFront(ctx);
  drawInvasionAxes(ctx);
  drawNukeScars(ctx);
  if (mapFx?.kind === "travel" && mapFx.a && mapFx.b) {
    const now = performance.now();
    const dur = mapFx.duration || 2400;
    let t = (now - mapFx.t0) / dur;
    t = mapFx.loop ? ((t % 1) + 1) % 1 : Math.min(1, Math.max(0, t));
    drawTravelConvoy(ctx, mapFx.a, mapFx.b, t, now, 2);
  }
  painted.forEach((r) => drawCityMarkHi(ctx, r, r.id === selectedRegion));
  drawStateLabels(ctx);
  painted.forEach((r) => drawCityPlate(ctx, r, r.id === selectedRegion));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawCityMarkHi(ctx, r, selected) {
  const [x, y] = cityXY(r);
  const fac = r.owner ? factionOf(state, r.owner) : null;
  const fill = fac ? fac.color : "#9aa7b0";
  draw80sMarker(ctx, markerKind(r), x - 10, y + 2, selected, fill, 1.5);
  drawCityNode(ctx, x, y, selected);
  drawFactionFlag(ctx, x, y, fill, selected);
  const p = playerOf(state);
  if (p.region === r.id) {
    ctx.fillStyle = "#f8d800";
    ctx.fillRect(x - 12, y - 26, 5, 5);
  }
  if (r.id === "arctic_slope" && legendStatus(state).mapMark) {
    ctx.fillStyle = "#d080f8";
    ctx.fillRect(x + 16, y - 6, 3, 3);
  }
  legendBoard(state).forEach((h) => {
    if (h.regionId !== r.id || !h.mapMark) return;
    ctx.fillStyle = "#d080f8";
    ctx.fillRect(x + 16, y - 6, 3, 3);
  });
}

function ensureMapPulse() {
  if (mapPulseTimer) return;
  mapPulseTimer = setInterval(() => {
    if (!state || state.phase !== "strategy" || !mapFx) return;
    if ($("battle") && !$("battle").hidden) return;
    if ($("duel") && !$("duel").hidden) return;
    drawMap();
  }, 420);
}

function openBattle() {
  parkCoach();
  silentHideEvent();
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
  const siege = (dest.walls || 0) >= 12 || dest.terrainBias === "urban";
  $("battle-title").textContent = `${siege ? "Siege" : "Field"} — ${dest.name}`;
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
  ctx.imageSmoothingEnabled = false;
  paintIsoField(ctx, b, dest, now);
  if (b.flash) scheduleFlashClear(b);
}

function onBattleClick(e) {
  if (!state?.battle) return;
  const canvas = $("battle-canvas");
  const rect = canvas.getBoundingClientRect();
  const px = ((e.clientX - rect.left) / rect.width) * canvas.width;
  const py = ((e.clientY - rect.top) / rect.height) * canvas.height;
  const layout = isoLayout(state.battle.cols, state.battle.rows, canvas.width, canvas.height);
  const cell = isoToCell(px, py, layout, state.battle.cols, state.battle.rows);
  const x = cell ? cell[0] : Math.floor(((e.clientX - rect.left) / rect.width) * state.battle.cols);
  const y = cell ? cell[1] : Math.floor(((e.clientY - rect.top) / rect.height) * state.battle.rows);
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

let duelRaf = 0;

function openDuel() {
  if (!state?.duel) return;
  parkCoach();
  if ($("modal") && !$("modal").hidden) {
    $("modal").hidden = true;
    $("modal-card").className = "modal-card";
  }
  silentHideEvent();
  $("duel").hidden = false;
  const d = state.duel;
  if (!d.t0) d.t0 = performance.now();
  if (!d.beatT0) d.beatT0 = performance.now();
  $("duel-underdog").hidden = !d.underdog;
  const g = $("duel-green");
  g.style.left = `${d.green[0] * 100}%`;
  g.style.width = `${(d.green[1] - d.green[0]) * 100}%`;
  paintDuelStatic();
  paintDuelHud();
  $("duel-continue").hidden = !d.result;
  startDuelLoop();
}

function startDuelLoop() {
  if (duelRaf) return;
  const tick = (now) => {
    if (!state?.duel || $("duel").hidden) {
      duelRaf = 0;
      return;
    }
    stepDuel(now);
    duelRaf = requestAnimationFrame(tick);
  };
  duelRaf = requestAnimationFrame(tick);
}

function stopDuelLoop() {
  if (duelRaf) cancelAnimationFrame(duelRaf);
  duelRaf = 0;
}

function remainingClock(now) {
  const d = state.duel;
  if (!d) return 0;
  const elapsed = (now - (d.t0 || now)) / 1000;
  return Math.max(0, Math.ceil(DUEL_CLOCK_S - elapsed));
}

function stepDuel(now) {
  const d = state.duel;
  if (!d) return;
  const left = remainingClock(now);
  $("duel-clock").textContent = String(left);
  if (d.result) {
    d.beat = "done";
    paintDuelHud();
    drawDuelYard(now);
    $("duel-continue").hidden = false;
    document.querySelectorAll("[data-duel-move]").forEach((b) => {
      b.disabled = true;
    });
    return;
  }
  if (left <= 0) {
    duelCmd(state, "clock");
    paintDuelHud();
    drawDuelYard(now);
    return;
  }
  if (d.beat === "pick") {
    const t = (now - d.beatT0) / (d.pickMs || DUEL_PICK_MS);
    $("duel-needle").style.left = `${Math.min(1, Math.max(0, t)) * 100}%`;
    if (t >= 1) {
      duelCmd(state, "move", { move: null, timing: 1 });
      d.resolveUntil = now + (d.resolveMs || DUEL_RESOLVE_MS);
      paintDuelHud();
    }
  } else if (d.beat === "resolve") {
    if (!d.resolveUntil) d.resolveUntil = now + (d.resolveMs || DUEL_RESOLVE_MS);
    if (now >= d.resolveUntil) {
      duelCmd(state, "next");
      d.beatT0 = now;
      d.resolveUntil = 0;
      paintDuelHud();
    }
  }
  paintDuelHp();
  drawDuelYard(now);
}

function pickDuelMove(move) {
  if (!state?.duel || state.duel.beat !== "pick" || state.duel.result) return;
  const now = performance.now();
  const timing = (now - state.duel.beatT0) / (state.duel.pickMs || DUEL_PICK_MS);
  document.querySelectorAll("[data-duel-move]").forEach((b) => {
    b.classList.toggle("is-pick", b.dataset.duelMove === move);
  });
  duelCmd(state, "move", { move, timing });
  state.duel.resolveUntil = now + (state.duel.resolveMs || DUEL_RESOLVE_MS);
  paintDuelHud();
}

function closeDuel() {
  if (!state?.duel) {
    $("duel").hidden = true;
    stopDuelLoop();
    render();
    return;
  }
  const res = duelCmd(state, "close");
  $("duel").hidden = true;
  stopDuelLoop();
  render();
  if (res.ok) {
    showEventScene({
      id: res.sceneId || "challenge",
      title: res.duelEnd === "you" ? "Yard held" : res.duelEnd === "foe" ? "Yard lost" : "Dust settles",
      text: res.message,
      regionId: playerOf(state).region,
    });
  } else {
    flushOverlays();
  }
}

function paintDuelStatic() {
  const d = state.duel;
  const you = d.you;
  const foe = d.foe;
  $("duel-you-face").src = PORTRAIT_SRC;
  $("duel-you-name").textContent = you.name;
  $("duel-you-style").textContent = `${you.style?.label || "Style"} · ${you.outfit?.label || "kit"}`;
  $("duel-you-meta").textContent = `AGE ${you.age} · ${you.title} · WAR ${you.stats.war}`;
  $("duel-you-stats").textContent = you.wound ? "WOUND — WAR cut" : `INT ${you.stats.int}  POL ${you.stats.pol}  CHR ${you.stats.chr}`;
  $("duel-foe-face").textContent = foe.portrait || portraitInitials(foe.name);
  $("duel-foe-name").textContent = foe.name;
  $("duel-foe-style").textContent = `${foe.style?.label || "Style"} · ${foe.outfit?.label || "kit"}`;
  $("duel-foe-meta").textContent = `AGE ${foe.age} · ${foe.title}${foe.legend ? " · LEGEND" : ""} · WAR ${foe.stats.war}`;
  $("duel-foe-stats").textContent = foe.wound ? "WOUND — WAR cut" : `INT ${foe.stats.int}  POL ${foe.stats.pol}  CHR ${foe.stats.chr}`;
  if ($("duel-arena")) $("duel-arena").textContent = d.arena?.label || "Yard";
}

function paintDuelHp() {
  const d = state.duel;
  if (!d) return;
  $("duel-you-hp").style.width = `${Math.round((d.youHp / d.youMax) * 100)}%`;
  $("duel-foe-hp").style.width = `${Math.round((d.foeHp / d.foeMax) * 100)}%`;
  $("duel-you-hp-n").textContent = `${d.youHp} / ${d.youMax}`;
  $("duel-foe-hp-n").textContent = `${d.foeHp} / ${d.foeMax}`;
}

function paintDuelHud() {
  const d = state.duel;
  if (!d) return;
  $("duel-exchange").textContent = `EX ${Math.min(d.exchange, d.maxExchanges)} / ${d.maxExchanges}`;
  const specName = d.you.style?.specialLabel || "Special";
  const stakes = d.underdog
    ? `UNDERDOG — wider green. Winner: gold + fame.`
    : d.you?.wound
      ? `Wound cuts WAR. Special · ${specName}.`
      : `Stakes: gold, fame, a wound. Special · ${specName}.`;
  $("duel-cue").textContent = d.result ? d.log[d.log.length - 1] : stakes;
  const spec = $("duel-special");
  if (spec) {
    spec.innerHTML = `<b>3</b> Special · ${esc(specName)}<small>beats Guard</small>`;
  }
  $("duel-log").innerHTML = d.log.slice(-2).map((l) => `<li>${esc(l)}</li>`).join("");
  document.querySelectorAll("[data-duel-move]").forEach((b) => {
    b.disabled = d.beat !== "pick" || !!d.result;
    if (d.beat !== "pick") b.classList.remove("is-pick");
  });
  $("duel-continue").hidden = !d.result;
  paintDuelHp();
}

function drawDuelYard(now) {
  const canvas = $("duel-canvas");
  if (!canvas || !state?.duel) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.imageSmoothingEnabled = false;
  paintDuelArena(ctx, w, h, state.duel.arena?.id || "porch", now);
  const bob = Math.floor(now / 480) % 2;
  const flash = state.duel.last && state.duel.beat === "resolve";
  const youHit = flash && state.duel.last.youDmg > 0;
  const foeHit = flash && state.duel.last.foeDmg > 0;
  drawDuelFighter(ctx, 150, 78 + bob, state.duel.you.outfit, false, youHit, state.duel.last?.youMove);
  drawDuelFighter(ctx, 430, 78 + (1 - bob), state.duel.foe.outfit, true, foeHit, state.duel.last?.foeMove);
  if (flash) {
    const fx = state.duel.last.youFx || state.duel.last.foeFx || "#f8f8f8";
    ctx.fillStyle = fx;
    ctx.globalAlpha = 0.28;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }
}

function px(ctx, x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

function paintDuelArena(ctx, w, h, id, now) {
  const twinkle = Math.floor(now / 800) % 2;
  if (id === "roadhouse") {
    px(ctx, 0, 0, w, 56, "#203040");
    px(ctx, 0, 56, w, h, "#d0d8e0");
    px(ctx, 40, 20, 120, 70, "#684028");
    px(ctx, 50, 30, 24, 20, "#88b0c8");
    px(ctx, 90, 40, 18, 50, "#3a2010");
    px(ctx, 200, 8, 80, 12, "#f8d800");
    px(ctx, 0, 120, w, 8, "#f8f8f8");
    px(ctx, 12, 64, 6, 6, "#f8f8f8");
    px(ctx, 400, 70, 8, 8, "#f8f8f8");
    return;
  }
  if (id === "foothills") {
    px(ctx, 0, 0, w, 50, "#5a88b8");
    px(ctx, 0, 36, w, 40, "#4a5868");
    px(ctx, 80, 20, 200, 50, "#3a4858");
    px(ctx, 0, 70, w, h, "#8a7840");
    px(ctx, 20, 50, 10, 40, "#184828");
    px(ctx, 30, 40, 18, 20, "#306830");
    px(ctx, 540, 48, 10, 40, "#184828");
    px(ctx, 0, 130, w, 50, "#6a5030");
    px(ctx, 0, 130, w, 3, "#c8a048");
    return;
  }
  if (id === "airstrip") {
    px(ctx, 0, 0, w, 48, "#78a0c8");
    px(ctx, 0, 48, w, h, "#887868");
    px(ctx, 40, 90, w, 16, "#c8c8a0");
    px(ctx, 40, 96, w, 4, "#f8d800");
    px(ctx, 480, 40, 80, 28, "#686860");
    px(ctx, 500, 28, 8, 20, "#f8d800");
    px(ctx, 120, 70, 36, 16, "#2a3820");
    return;
  }
  if (id === "iceford") {
    px(ctx, 0, 0, w, 52, "#103048");
    px(ctx, 0, 52, w, 40, "#4a6888");
    px(ctx, 0, 90, w, h, "#d0d8e0");
    px(ctx, 0, 100, w, 12, "#88b0c8");
    px(ctx, 200, 108, 80, 6, "#f8f8f8");
    px(ctx, 40, 60, 16, 16, "#a0b0c0");
    return;
  }
  if (id === "gaslot") {
    px(ctx, 0, 0, w, 44, "#3a3028");
    px(ctx, 0, 44, w, h, "#404038");
    px(ctx, 0, 110, w, 70, "#2a2820");
    px(ctx, 60, 20, 90, 50, "#c8a038");
    px(ctx, 70, 28, 20, 16, "#f8d800");
    px(ctx, 400, 30, 70, 40, "#101050");
    px(ctx, 80, 70, 12, 40, "#686860");
    px(ctx, 200, 70, 12, 40, "#686860");
    if (twinkle) px(ctx, 78, 24, 8, 8, "#f8d800");
    return;
  }
  if (id === "pineridge") {
    px(ctx, 0, 0, w, 50, "#3a68a0");
    px(ctx, 80, 16, 180, 40, "#4a5868");
    px(ctx, 0, 50, w, h, "#486030");
    for (const x of [16, 48, 520, 560, 600]) {
      px(ctx, x, 40, 6, 50, "#3a2010");
      px(ctx, x - 8, 28, 22, 24, "#184828");
      px(ctx, x - 4, 16, 14, 16, "#306830");
    }
    px(ctx, 0, 130, w, 50, "#3a4820");
    return;
  }
  if (id === "radiotower") {
    px(ctx, 0, 0, w, 70, "#101028");
    px(ctx, 0, 70, w, h, "#181830");
    px(ctx, 300, 8, 8, 90, "#686860");
    px(ctx, 280, 20, 48, 6, "#686860");
    px(ctx, 304, 6, 4, 8, twinkle ? "#f03030" : "#f8d800");
    px(ctx, 40, 80, 70, 40, "#304878");
    px(ctx, 48, 88, 16, 12, "#80c0f8");
    px(ctx, 0, 128, w, 52, "#000018");
    if (twinkle) px(ctx, 80, 20, 2, 2, "#f8f8f8");
    px(ctx, 500, 24, 2, 2, "#f8f8f8");
    return;
  }
  px(ctx, 0, 0, w, 52, "#5a88b8");
  px(ctx, 0, 52, w, h, "#8a7840");
  px(ctx, 24, 20, 100, 70, "#684028");
  px(ctx, 34, 30, 22, 18, "#88b0c8");
  px(ctx, 70, 50, 16, 40, "#3a2010");
  px(ctx, 0, 120, w, 60, "#503010");
  px(ctx, 0, 120, w, 3, "#f8d800");
}

function drawDuelFighter(ctx, x, y, outfit, flip, hit, pose) {
  const o = outfit || { coat: "#507040", hat: "#f8d800", pants: "#3a2010", accent: "#c8a038" };
  const s = flip ? -1 : 1;
  const hat = hit ? "#f8f8f8" : o.hat;
  const coat = hit ? "#f03030" : o.coat;
  if (o.brim) px(ctx, x + s * 0, y + 4, 24, 4, hat);
  if (o.helmet) px(ctx, x + s * 2, y - 2, 20, 10, hat);
  else px(ctx, x + s * 4, y, 16, 8, hat);
  px(ctx, x + s * 4, y + 8, 16, 10, "#c8a078");
  if (o.headset) {
    px(ctx, x + s * 2, y + 10, 4, 6, o.accent);
    px(ctx, x + s * 18, y + 10, 4, 6, o.accent);
  }
  const wide = o.helmet || o.id === "parka" ? 4 : 0;
  px(ctx, x - wide, y + 18, 24 + wide * 2, 28, coat);
  px(ctx, x + 2, y + 22, 4, 16, o.accent);
  if (pose === "guard") px(ctx, x + s * 20, y + 22, 10, 6, o.accent);
  if (pose === "strike") px(ctx, x + s * 22, y + 20, 12, 4, hat);
  if (pose === "special") px(ctx, x + s * 18, y + 8, 8, 8, o.accent);
  px(ctx, x + 4, y + 46, 6, 16, o.pants || "#201810");
  px(ctx, x + 14, y + 46, 6, 16, o.pants || "#201810");
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
      toast(playerOf(state).faction ? "No free officer here. Travel, or Officers → Create, then Plot → Hire." : "Raise Banner, then Plot → Hire fills an ADD chair.");
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
  const faceId = document.getElementById("c-face")?.value || "F0";
  const img = document.getElementById("c-portrait-img");
  if (img) img.src = faceSrc(faceId);
  const port = document.getElementById("c-portrait");
  if (port && !img) port.textContent = portraitInitials(name);
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
    document.querySelectorAll("[data-face]").forEach((btn) => {
      btn.onclick = () => {
        const hid = document.getElementById("c-face");
        if (hid) hid.value = btn.dataset.face;
        document.querySelectorAll("[data-face]").forEach((b) => b.classList.toggle("is-on", b === btn));
        refreshCreator();
      };
    });
    add.onclick = () => {
      const name = document.getElementById("c-name").value;
      const res = createCustomOfficer(state, {
        name,
        title: document.getElementById("c-title")?.value,
        personality: document.getElementById("c-type")?.value,
        portrait: document.getElementById("c-face")?.value || portraitInitials(name),
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
