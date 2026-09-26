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
  faceLabel,
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
  startInlandBattle,
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
  ladderRoster,
  ladderRankOf,
  ladderLabel,
  promotedInCity,
  weekTease,
  stateControl,
  deskControl,
  ensureCampaign,
  theaterVisible,
  isAdjacent,
  geoTags,
  geoYield,
  approachRoads,
  approachTrail,
  sharesRoad,
  roadLabel,
} from "./engine.js";
import { DUEL_CLOCK_S, DUEL_PICK_MS, DUEL_RESOLVE_MS } from "./duel.js";
import { inlandDesk, inlandLook, stampBattleDesk, stampCourtDesk, stampDuelDesk, stampMissionDesk } from "./inland.js";
import { siegeCoach, siegeRecommend } from "./siege.js";
import { LABEL_ANCHOR, LABEL_MIN_SCREEN, MAP_DETAIL_KEY, applyMapDrag, calloutCap, canvasDisplayScale, chordIsMisleading, cityLabelSizes, closeRoadWidth, insetMarkerCenter, leaderEndOnLabel, letterboxCanvasPoint, letterboxContains, mapDetailFromSave, mapLayerVisibility, stampMapDetail } from "./map-detail.js";

const SAVE_KEY = "northern-front-v01";
let content;
export let state;
export let selectedRegion = "bethel";
export let hoverRegion = null;
let ladderNotice = "";
/** Presentation-only court/officers desk. Not saved and not a map node. */
const courtView = { deskId: null };
/** Presentation-only mission board desk. Not saved and not a map node. */
const missionView = { deskId: null };
let ladderKind = "rank";
let ladderFlashId = "";

const $ = (id) => document.getElementById(id);

function parseDemoFx(params) {
  const demo = params.get("demo") || "";
  const fx = params.get("fx") || "";
  if (fx === "travel" || demo === "travel" || demo === "fx=travel") return "travel";
  if (fx === "battle" || demo === "battle" || demo === "fx=battle") return "battle";
  return "";
}

function demoQuery() {
  return new URLSearchParams(location.search);
}

function openDemoDuel() {
  const params = demoQuery();
  startSliceState();
  const goliath = params.get("goliath") === "1";
  const style = params.get("style");
  const arena = params.get("arena");
  const node = params.get("node");
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
      deskId: node || undefined,
    });
    if (!res.ok) toast(res.message);
  }
  if (state?.duel) stampDuelDesk(state.duel, node);
  hideModal();
  render();
}

function standOnBethel(garrison) {
  const home = regionOf(state, "bethel");
  const player = playerOf(state);
  player.region = home.id;
  if (!player.faction && !home.owner) act(state, content, "raise_banner");
  if (player.faction && !home.owner) home.owner = player.faction;
  if (home.owner === player.faction) home.garrison = garrison;
  state.ap = Math.max(state.ap, 4);
  return home;
}

function openDemoSiege() {
  const params = demoQuery();
  const node = params.get("node");
  if (node) {
    const walls = Number(params.get("walls"));
    const fight = startInlandBattle(state, content, node, {
      troops: 80,
      walls: Number.isFinite(walls) && walls > 0 ? walls : 0,
    });
    if (!fight.ok) toast(fight.message || "Siege demo could not open.");
    if (fight.battle && state.battle) openBattle();
    return;
  }
  standOnBethel(100);
  const bowl = regionOf(state, "anchorage");
  const walls = Number(params.get("walls"));
  if (Number.isFinite(walls) && walls > 0) bowl.walls = Math.min(90, Math.round(walls));
  const fight = act(state, content, "attack", { regionId: "anchorage", troops: 80 });
  if (!fight.ok) toast(fight.message || "Siege demo could not march.");
  if (fight.battle && state.battle) openBattle();
}

function openDemoFight() {
  const node = demoQuery().get("node");
  if (!inlandLook(node)) {
    openDemoBattle(false);
    return;
  }
  const fight = startInlandBattle(state, content, node, { troops: 80, field: true });
  if (!fight.ok) toast(fight.message || "Fight demo could not open.");
  if (fight.battle && state.battle) {
    stampBattleDesk(state.battle, node);
    state.battle.liberation = true;
    state.battle.flash = { x: 3, y: 2, side: "atk", hold: true };
    openBattle();
  }
}

function openDemoBattle(withHull) {
  const node = demoQuery().get("node");
  if (inlandLook(node) && demoQuery().get("siege") !== "1") {
    const fight = startInlandBattle(state, content, node, { troops: withHull ? 90 : 80, field: true });
    if (!fight.ok) toast(fight.message || "Field demo could not open.");
    if (fight.battle && state.battle) {
      stampBattleDesk(state.battle, node);
      state.battle.flash = { x: 3, y: 2, side: "atk", hold: true };
      openBattle();
    }
    return;
  }
  standOnBethel(90);
  if (withHull) {
    if (!state.research.unlocked.includes("tracked_hulls")) state.research.unlocked.push("tracked_hulls");
    regionOf(state, "nome").garrison = 80;
  }
  const fight = act(state, content, "attack", {
    regionId: "nome",
    troops: withHull ? 90 : undefined,
  });
  if (!fight.ok) toast(fight.message || "Field demo could not march.");
  if (fight.battle && state.battle) {
    state.battle.flash = { x: 3, y: 2, side: "atk", hold: true };
    openBattle();
  }
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
  // Reveal the shell before scene photos. A hung image must not leave #boot up.
  $("app").hidden = false;
  $("boot").hidden = true;
  try {
    await bakeScenes();
  } catch (err) {
    console.warn("scene bake failed", err);
  }
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
      if (params.get("siege") === "1") openDemoSiege();
      else openDemoBattle(params.get("hull") === "1");
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
    const focus = params.get("focus");
    state = createNewGame(content, {
      name: "Alex Rourke",
      background: "scout",
      difficulty: "normal",
      seed: 7,
    });
    const siegeFocus = !!(focus && inlandSiegeCue(focus) && regionOf(state, focus));
    selectedRegion = siegeFocus ? focus : "cheyenne";
    commandCat = "domestic";
    coachForced = true;
    coachOn = true;
    coachStep = siegeFocus ? 1 : 0;
    hideModal();
    render();
    openCoach();
    if (siegeFocus) frameForInlandFocus(focus);
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
    stampMissionDesk(missionView, params.get("node"));
    hideModal();
    render();
    showModal(missionsHtml(), { kind: "missions" });
    wireAfterRender();
    if (params.get("take") === "1") {
      const local = openMissions(state).find((j) => j.regionId === playerOf(state).region);
      if (local) run("mission", { jobId: local.id, deskId: params.get("node") || undefined });
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
    const focus = params.get("focus");
    selectedRegion = focus && regionOf(state, focus) ? focus : "denver";
    hideModal();
    render();
    showModal(campaignHtml(), { kind: "states" });
    if (!focus) pulseTravel("juneau", "seattle", { loop: true });
    afterFonts();
    return;
  }
  if (params.get("demo") === "start") {
    document.body.classList.add("look-map");
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
    else if (view === "bering") frameBering();
    else if (view === "cuba") frameCuba();
    else if (view === "korea") frameKorea();
    if (!battleFx) pulseTravel("cheyenne", "denver", { loop: true });
    frameForInlandFocus(params.get("focus") || params.get("city") || "");
    if (params.get("panel") === "officers") {
      showModal(officersHtml(), { kind: "officers" });
      wireAfterRender();
    }
    if (params.get("fx") === "battle") {
      if (params.get("siege") === "1") openDemoSiege();
      else openDemoBattle(params.get("hull") === "1");
    }
    afterFonts();
    return;
  }
  if (params.get("demo") === "roster" || params.get("demo") === "ladder" || params.get("demo") === "officers") {
    startSliceState();
    const made = createCustomOfficer(state, {
      name: "Sam Ivers",
      title: "Friend",
      personality: "loyalist",
      portrait: "F1",
      war: 58,
      int: 52,
      pol: 48,
      chr: 62,
      ladder: "player",
    });
    const steps = Number(params.get("promote") || 0);
    if (made.ok && steps >= 1) {
      const r1 = act(state, content, "promote", { officerId: made.id });
      if (r1.rankChanged) {
        ladderNotice = r1.message;
        ladderKind = "rank";
        ladderFlashId = made.id;
      }
    }
    if (made.ok && steps >= 2) {
      const r2 = act(state, content, "promote", { officerId: made.id });
      if (r2.rankChanged) {
        ladderNotice = r2.message;
        ladderKind = "rank";
        ladderFlashId = made.id;
      }
    }
    selectedRegion = "bethel";
    commandCat = "plot";
    stampCourtDesk(courtView, params.get("node"));
    hideModal();
    render();
    showModal(officersHtml(), { kind: "officers" });
    afterFonts();
    return;
  }
  if (params.get("demo") === "court") {
    startSliceState();
    stampCourtDesk(courtView, params.get("node"));
    selectedRegion = "bethel";
    commandCat = "plot";
    hideModal();
    render();
    afterFonts();
    return;
  }
  if (params.get("demo") === "siege") {
    startSliceState();
    hideModal();
    render();
    openDemoSiege();
    afterFonts();
    return;
  }
  if (params.get("demo") === "duel") {
    openDemoDuel();
    afterFonts();
    return;
  }
  if (params.get("demo") === "fight") {
    startSliceState();
    hideModal();
    render();
    openDemoFight();
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
  $("btn-officers").onclick = () => openRoster();
  $("btn-roster").onclick = () => openRoster();
  $("btn-factions").onclick = () => showModal(factionsHtml());
  $("btn-states").onclick = () => showModal(campaignHtml());
  $("btn-legend").onclick = () => toggleLegend();
  $("btn-zoom-in").onclick = () => zoomBy(1.2);
  $("btn-zoom-out").onclick = () => zoomBy(1 / 1.2);
  $("btn-zoom-world").onclick = () => frameWorld();
  $("btn-map-detail").onclick = () => toggleMapDetail();
  $("btn-missions").onclick = () => {
    showModal(missionsHtml(), { kind: "missions" });
    wireAfterRender();
  };
  $("modal").onclick = (e) => {
    if (e.target.id === "modal") hideModal();
  };
  $("siege-cut").onclick = () => doBattle("siege", { kind: "cut" });
  $("siege-rake").onclick = () => doBattle("siege", { kind: "rake" });
  $("siege-rush").onclick = () => doBattle("siege", { kind: "rush" });
  $("siege-auto").onclick = () => doBattle("auto");
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
  bindMapPointer(canvas);
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
    const tag = e.target?.tagName || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target?.isContentEditable) return;
    if (state?.phase === "duel") {
      if (e.key === "1") pickDuelMove("strike");
      if (e.key === "2") pickDuelMove("guard");
      if (e.key === "3") pickDuelMove("special");
      return;
    }
    if (state?.battle?.siege && !state.battle.siege.closed) {
      if (e.key === "1") doBattle("siege", { kind: "cut" });
      if (e.key === "2") doBattle("siege", { kind: "rake" });
      if (e.key === "3") doBattle("siege", { kind: "rush" });
      return;
    }
    if (e.key === "e" && state && state.phase === "strategy") run("end_week");
    if ((e.key === "l" || e.key === "L") && state?.phase === "strategy" && e.target?.tagName !== "INPUT" && e.target?.tagName !== "TEXTAREA") {
      toggleLegend();
    }
    if ((e.key === "d" || e.key === "D") && !e.repeat && state?.phase === "strategy") {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (overlayBusy()) return;
      e.preventDefault();
      toggleMapDetail();
    }
  });
  syncMapDetailButton();
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
  clearDeskPaint(el.querySelector(".event-card"));
  const strip = $("event-desk");
  if (strip) strip.hidden = true;
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
  const extra =
    opts.kind === "week"
      ? " week-card"
      : opts.kind === "officers"
        ? " officers-card"
        : opts.kind === "states"
          ? " states-card"
          : opts.kind === "missions"
            ? " missions-card"
            : "";
  $("modal-card").className = "modal-card" + extra;
  $("modal-card").innerHTML = html;
  $("modal").hidden = false;
  if (opts.kind === "officers") {
    paintCourtDesk();
    $("modal-card").scrollTop = 0;
  } else if (opts.kind === "missions") {
    paintMissionDesk();
  } else clearDeskPaint($("modal-card"));
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

/** Campaign shorts. Siege flavor may say Lane / Inland Ridge; map labels stay Sponsor Lane and Sheds. */
const INLAND_SIEGE_CUES = {
  kamchatka: { label: "Kamchatka", flavor: "volcanic berm", demo: "/?demo=siege&node=kamchatka" },
  siberia: { label: "Siberia", flavor: "timber berm", demo: "/?demo=siege&node=siberia" },
  havana: { label: "Havana", flavor: "harbor wall", demo: "/?demo=siege&node=havana" },
  managua: { label: "Managua", flavor: "low block walls", demo: "/?demo=siege&node=managua" },
  sponsor_lane: { label: "Sponsor Lane", flavor: "checkpoint berm (Lane)", demo: "/?demo=siege&node=sponsor_lane" },
  kr_inland: { label: "Sheds", flavor: "ridge berm (Inland Ridge)", demo: "/?demo=siege&node=kr_inland" },
};

function inlandSiegeCue(id) {
  const row = INLAND_SIEGE_CUES[id];
  if (!row) return "";
  return `Siege desk: ${row.label} — ${row.flavor}. Cut the berm, Rake the parapet, Rush the gap. ${row.demo}`;
}

function arcBoard(st) {
  const camp = ensureCampaign(st);
  const board = stateControl(st);
  const west = camp.westBloc || [];
  const east = camp.eastApproach || [];
  const freed = (id) => !!board.find((s) => s.id === id)?.liberated;
  return {
    camp,
    board,
    west,
    east,
    westN: west.filter(freed).length,
    freed,
  };
}

/** One clause for a domestic state the player is inspecting. Foreign desks stay on the approach line. */
function stateArcClause(st, code) {
  if (!code) return "";
  const { camp, board, west, east, westN } = arcBoard(st);
  const row = board.find((s) => s.id === code);
  if (!row) return "";
  if (code === "YT") {
    return row.liberated
      ? "Yukon road is held. It is not one of the eight."
      : "Yukon frees with its ★ key. It is the road south, not one of the eight.";
  }
  if (east.includes(code)) {
    if (!row.liberated) {
      return camp.nationalLeader
        ? `Reunify: ${row.name} is next (NE–KS–MO). The title does not leap you.`
        : `Reunify: ${row.name} is the east walk (NE–KS–MO), still this road.`;
    }
    return `${row.name} is free. Reunify keeps walking NE–KS–MO.`;
  }
  if (!west.includes(code)) {
    return row.liberated ? `${row.name} is free.` : `${row.name} frees at ${row.held}/${row.need} ★.`;
  }
  if (!row.liberated) {
    return `${row.name} frees at ${row.held}/${row.need} ★. West bloc ${westN}/8. Eight name you national leader — not a leap.`;
  }
  if (!camp.nationalLeader) return `${row.name} is free. West bloc ${westN}/8 — adjacent roads only.`;
  return `${row.name} is free. You are national leader — a title, not a leap.`;
}

/** Standing NEXT while the west bloc or the east walk is still open. Empty once both are done. */
function campaignArcLine(st) {
  const { camp, board, westN, east, freed } = arcBoard(st);
  const here = regionOf(st, playerOf(st).region);
  const row = board.find((s) => s.id === here?.stateCode);
  if (!camp.nationalLeader) {
    const hereBit = row?.liberated
      ? `${row.name} is free (${westN}/8 west bloc).`
      : row
        ? `${row.name} ${row.held}/${row.need} ★ (${westN}/8 west bloc).`
        : `West bloc ${westN}/8.`;
    return `${hereBit} Hold the next ★ keys on an adjacent road. Eight name you national leader — not a leap.`;
  }
  const nextEast = east.find((id) => !freed(id));
  if (!nextEast) return "";
  const name = board.find((s) => s.id === nextEast)?.name || nextEast;
  return `National leader. Reunify: ${name} is next on NE–KS–MO, one adjacent road at a time. The title does not leap you.`;
}

function routeSentence(st) {
  if (!st) return "";
  const here = regionOf(st, playerOf(st).region);
  const sel = regionOf(st, selectedRegion);
  if (!sel || !here) return "";
  if (sel.id === here.id) return inlandSiegeCue(sel.id);
  const label = roadLabel(st, here.id, sel.id);
  const named = label ? ` — ${label}` : "";
  let line;
  if (isAdjacent(st, here, sel)) {
    line = `${sel.short} is adjacent${named}. Military → Travel or March. No leaping past it.`;
  } else if (sharesRoad(st, here, sel)) {
    const need = sel.unlockPhase || 0;
    const phase = ensureCampaign(st).phase || 1;
    const why = need > phase ? (need >= 4 ? ", locked until a sponsor" : ", locked until the foreign desks") : "";
    line = `${sel.short} is the next road${named}${why}. Cannot leap past it.`;
  } else {
    const via = approachRoads(st, here, sel);
    const desk = sel.type === "foreign" || sel.type === "sea" || (sel.unlockPhase || 0) > 0;
    if (desk) {
      const trail = approachTrail(st, here, sel)
        .map((r) => r.short)
        .join(" → ");
      const chain = trail || via.join(" → ");
      line = `Cannot leap to ${sel.short} (${sel.stateCode || "—"}). Approach: ${chain || "the gate on the board"}.`;
    } else {
      const hops = via.join(", ");
      line = `Cannot leap to ${sel.short} (${sel.stateCode || "—"}). Next road: ${hops || "an adjacent city"}.`;
    }
  }
  const foreignDesk = sel.type === "foreign" || sel.type === "sea" || (sel.unlockPhase || 0) > 0;
  if (!foreignDesk) {
    const arc = stateArcClause(st, sel.stateCode);
    if (arc) line = `${line} ${arc}`;
  }
  const cue = inlandSiegeCue(sel.id);
  return cue ? `${line}\n${cue}` : line;
}

function frameForInlandFocus(id) {
  if (!id || !regionOf(state, id)) return;
  if (["havana", "far_cuba", "managua", "far_nicaragua", "gulf_passage"].includes(id)) frameCuba();
  else if (["kamchatka", "siberia", "far_russia", "bering_strait", "nome"].includes(id)) frameBering();
  else if (["sponsor_lane", "kr_inland", "far_korea"].includes(id)) frameKorea();
}

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
  if (sel && here && sel.id !== here.id) {
    const route = routeSentence(st);
    if (route) return `NEXT: ${route}`;
  }
  if (!p.faction) return "NEXT: Domestic → Raise Banner (1 AP). A state frees when its ★ keys are yours — Cheyenne frees Wyoming. Then Plot → Hire.";
  if (st.ap <= 0) return `NEXT: End Week. Next week may bring ${weekTease(st)}.`;
  const arc = campaignArcLine(st);
  if (arc) {
    const hire = gens.length === 0 && !ensureCampaign(st).nationalLeader ? " Then Plot → Hire." : "";
    return `NEXT: ${arc}${hire}`;
  }
  const rung = rosterRungHint(st, p);
  if (rung) return rung;
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
  const hint = nextHint(state);
  const breakAt = hint.indexOf("\n");
  $("obj-text").textContent = breakAt >= 0 ? hint.slice(0, breakAt) : hint;
  const objSiege = $("obj-siege");
  if (objSiege) {
    const tail = breakAt >= 0 ? hint.slice(breakAt + 1) : "";
    objSiege.textContent = tail;
    objSiege.hidden = !tail;
  }
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
  const onRoute = step.id === "city" || step.id === "banner";
  const route = onRoute ? routeSentence(state) : "";
  const siege = onRoute ? inlandSiegeCue(regionOf(state, selectedRegion)?.id) : "";
  const approach = siege && route.endsWith(`\n${siege}`) ? route.slice(0, -(siege.length + 1)) : siege && route === siege ? "" : route;
  const coachParts = [step.body];
  if (approach) coachParts.push(approach);
  $("coach-text").textContent = coachParts.join("\n\n");
  const siegeEl = $("coach-siege");
  if (siegeEl) {
    siegeEl.hidden = !siege;
    siegeEl.textContent = siege || "";
  }
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
      <li><strong>Theater:</strong> Continental US coastline plus an Alaska/Yukon spur. Biomes (wet forest, Rockies, desert, plains, eastern woods, AK ice) and 1980s American markers — ranch houses, grain elevators, oil pumps, bunkers, radio towers. Not Chinese roofs. STATE → territories. Adjacent roads only — no leaping. Farm/mine/fuel/water/sun/weather/defense change weekly yields. Alternate routes (ferry vs ALCAN, pass vs rail). A state frees when its ★ keys are yours. Eight west-bloc states (AK–CO; Yukon is only the road) name you national leader — a title, not a leap. Reunify is the east walk NE–KS–MO.</li>
      <li><strong>Close zoom:</strong> Cities and roads stay. Yield marks, flags, and nameplates move to the city report and the hover line. Detail (D) draws that layer again.</li>
      <li><strong>Ruler plate:</strong> your name, age, loyalty, WAR/INT/POL/CHR. Treasury (gold/food/AP) lives in the top row.</li>
      <li><strong>Command:</strong> Domestic = hall work. Plot = people (hire, court, spy). Military = roads and missions.</li>
      <li><strong>Court:</strong> ${HIRE_LINE} Standing orders run at End Week.</li>
      <li><strong>Roster:</strong> Dock → Roster. Create a friend at the top of that screen (they start as a player). Pick a named original face, then Promote to officer, then general. RANK CONFIRMED and NEXT name the rung. A promoted officer in this city can take the yard or lead a march.</li>
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

function rankBadge(rank) {
  const key = rank || "player";
  return `<span class="rank-badge rank-${esc(key)}">${esc(ladderLabel(key))}</span>`;
}

function rosterRungHint(st, p) {
  if (!st || !p?.faction) return "";
  const ladder = ladderRoster(st);
  const playerHere = ladder.player.find((o) => o.region === p.region);
  const officerHere = ladder.officer.find((o) => o.region === p.region);
  const gens = playerGenerals(st);
  if (playerHere) return `NEXT: Roster → Promote ${playerHere.name} (Player → Officer).`;
  if (officerHere && gens.length < MAX_GENERALS) return `NEXT: Roster → Promote ${officerHere.name} (Officer → General).`;
  if (officerHere) return `NEXT: Chairs are full (5/5). ${officerHere.name} holds Officer.`;
  if (ladder.player[0]) {
    return `NEXT: ${ladder.player[0].name} is a Player elsewhere. Bring them to your city, then promote.`;
  }
  return "";
}

function rosterModalNext() {
  const p = playerOf(state);
  const rung = rosterRungHint(state, p);
  if (rung) return rung;
  if (!p?.faction) return "NEXT: Raise a banner, then create a friend below.";
  return "NEXT: Create a friend below. They join as a Player. Then promote Player → Officer → General.";
}

function rosterFace(o) {
  const faceImg = faceSrc(o.portrait);
  const label = faceLabel(o.portrait) || portraitInitials(o.name);
  const face = esc(label);
  return `<span class="portrait" title="${face}" aria-label="${face}">${faceImg ? `<img src="${faceImg}" alt="${face}" />` : face}</span>`;
}

function rosterRow(o) {
  const rank = ladderRankOf(o);
  const city = regionOf(state, o.region)?.short || "?";
  const action =
    rank === "player"
      ? `<button type="button" class="roster-promote" data-promote="${o.id}">Promote to officer</button>`
      : rank === "officer"
        ? `<button type="button" class="roster-promote" data-promote="${o.id}">Promote to general</button>`
        : `<span class="roster-held">Rank held</span>`;
  const flash = o.id === ladderFlashId ? " just-ranked" : "";
  return `<div class="roster-row rung-${esc(rank)}${flash}"><i class="rank-stripe rank-${esc(rank)}"></i>${rosterFace(o)}${rankBadge(rank)}<span class="roster-who"><strong>${esc(o.name)}</strong><span>${esc(o.title || "Friend")} · ${esc(city)} · WAR ${o.war} · ${esc(o.personality)}</span></span>${action}</div>`;
}

function rosterChromeHtml() {
  const deskId = syncCourtDesk();
  const look = inlandLook(deskId);
  const desk = inlandDesk(deskId);
  const baseNext = rosterModalNext();
  const next = desk && look ? `NEXT: ${desk.line}. ${look.read}. ${baseNext.replace(/^NEXT:\s*/, "")}` : baseNext;
  const title = look ? `Roster — ${look.strip}` : "Roster ladder";
  const strip =
    look
      ? `<p class="officers-desk"><strong>${esc(look.strip)}</strong><span>${esc(look.read)}</span></p>`
      : "";
  const note = !ladderNotice
    ? ""
    : ladderKind === "friend"
      ? `<p class="roster-added" role="status"><strong>FRIEND ADDED</strong>${esc(ladderNotice)}</p>`
      : `<p class="roster-confirm" role="status"><strong>RANK CONFIRMED</strong>${esc(ladderNotice)}</p>`;
  return `${strip}<section class="roster-ladder roster-top">
    <div class="roster-head"><h2>${esc(title)}</h2><button type="button" data-close>Close</button></div>
    <p class="roster-lead">Friends join as players. Promote them here: Player → Officer → General.</p>
    ${note}
    <p class="roster-next" role="status">${esc(next)}</p>
  </section>`;
}

function rosterRungsHtml() {
  const ladder = ladderRoster(state);
  const block = (title, list, empty) =>
    `<h3>${title} (${list.length})</h3>${list.length ? list.map(rosterRow).join("") : `<p class="roster-empty">${empty}</p>`}`;
  return `<section class="roster-ladder roster-rungs">
    ${block("Players", ladder.player, "No friends yet. Create one above.")}
    ${block("Officers", ladder.officer, "No officers waiting. Promote a player.")}
    ${block("Generals", ladder.general, "No generals yet. Promote an officer into an open chair (5).")}
  </section>`;
}

function openRoster() {
  showModal(officersHtml(), { kind: "officers" });
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
      const face = esc(faceLabel(o.portrait) || portraitInitials(o.name));
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
    : `<p class="muted">No listed officers here yet. Plot → Seek Legend, or Create above.</p>`;
  const addHow = `<p class="muted">${HIRE_LINE} Create custom (cap 10). Court ${court.length} · generals ${gens.length}/5.</p>`;
  const types = Object.entries(content.officers.personalities || {});
  const typeOpts = types
    .map(([id, per]) => `<option value="${esc(id)}"${id === "loyalist" ? " selected" : ""}>${esc(per.label || id)}</option>`)
    .join("");
  const slots = state.contentMeta.customOfficerSlots || 10;
  const full = state.customSlotsUsed >= slots;
  const firstFace = originalFaceGrid()[0];
  const createBlock = `
    <section class="roster-create" id="roster-create">
    <h2>Create a friend (${state.customSlotsUsed}/${slots})</h2>
    <p class="roster-lead">Named face. Joins here as a Player. Stats ${CUSTOM_STAT_MIN}–${CUSTOM_STAT_MAX}, total ≤ ${CUSTOM_STAT_BUDGET}.</p>
    <div class="face-grid" id="c-faces">${originalFaceGrid()
      .map(
        (f, i) =>
          `<button type="button" class="face-tile${i === 0 ? " is-on" : ""}" data-face="${f.id}" aria-label="${esc(f.name)}"><img src="${f.src}" alt="" /><span>${esc(f.name)}</span></button>`
      )
      .join("")}</div>
    <input type="hidden" id="c-face" value="${firstFace?.id || "F0"}" />
    <div class="creator">
      <div class="portrait portrait-lg" id="c-portrait" aria-hidden="true"><img id="c-portrait-img" src="${faceSrc(firstFace?.id || "F0")}" alt="" /></div>
      <div class="creator-fields">
        <p class="face-name" id="c-face-name">Face: ${esc(firstFace?.name || "Nell Crowe")}</p>
        <div class="field"><label>Name</label><input id="c-name" maxlength="28" value="Riley Cho" /></div>
        <div class="field"><label>Title</label><input id="c-title" maxlength="24" value="Friend" /></div>
        <div class="field"><label>Type</label><select id="c-type">${typeOpts}</select></div>
        <p class="muted" id="c-skills"></p>
        <button type="button" id="c-add" class="primary roster-promote"${full ? " disabled" : ""}>${full ? "Slots full (10)" : "Add friend as player"}</button>
        <div class="creator-stats">
          <label>WAR <input id="c-war" type="number" min="${CUSTOM_STAT_MIN}" max="${CUSTOM_STAT_MAX}" value="55" /></label>
          <label>INT <input id="c-int" type="number" min="${CUSTOM_STAT_MIN}" max="${CUSTOM_STAT_MAX}" value="55" /></label>
          <label>POL <input id="c-pol" type="number" min="${CUSTOM_STAT_MIN}" max="${CUSTOM_STAT_MAX}" value="55" /></label>
          <label>CHR <input id="c-chr" type="number" min="${CUSTOM_STAT_MIN}" max="${CUSTOM_STAT_MAX}" value="55" /></label>
        </div>
        <p class="muted" id="c-budget">Budget 220/${CUSTOM_STAT_BUDGET}</p>
      </div>
    </div>
    </section>`;
  return `${rosterChromeHtml()}${createBlock}${rosterRungsHtml()}<hr /><h2>Officers (${visible.length} visible)</h2>${addHow}
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
  const deskId = syncMissionDesk();
  const look = inlandLook(deskId);
  const desk = inlandDesk(deskId);
  const title = look ? `Missions — ${look.strip}` : `Side missions (${jobs.length} open)`;
  const strip = look
    ? `<p class="mission-desk"><strong>${esc(look.strip)}</strong><span>${esc(look.read)}</span></p>`
    : "";
  const lead = look
    ? `<p class="mission-next" role="status">NEXT: ${esc(desk.line)}. ${esc(look.read)}. 1 AP here, or a general's Side mission at End Week.</p>`
    : `<p class="muted">1 AP here, or a general's Side mission at End Week.</p>`;
  return `${strip}<h2>${esc(title)}</h2>
    ${lead}
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
    <p class="muted">You are in ${esc(here?.short || "?")} (${esc(here?.stateCode || "—")}). A state frees when you hold its ★ keys. West chain, adjacent only: AK–YT–WA–OR–ID–MT–WY–UT–CO (${arcBoard(state).westN}/8 US states; Yukon is the road, not a ninth). ${arcBoard(state).camp.nationalLeader ? "You are national leader — a title, not a leap." : "Eight name you national leader — a title, not a leap."} Reunify is NE–KS–MO on the roads you have.</p>
    <div class="city-grid">${stateControl(state)
      .map((s) => `<span class="pill"><span>${esc(s.id)}</span><strong>${s.liberated ? "LIB" : `${s.held}/${s.need}`}</strong></span>`)
      .join("")}</div>
    ${blocks}
    <h2>Foreign war council</h2>
    <p class="muted">Russia by Bering, then Kamchatka and Siberia. Cuba by Gulf Sealift, then Havana. Nicaragua, then Managua. Korea by the Sponsor Lane after a sponsor. No leaping.</p>
    ${deskControl(state).map((s) => {
      const rows = (s.territories || []).map((t) => {
        const chip = t.here ? "here" : t.adjacent ? "adjacent" : t.key ? "key" : "locked";
        const trail = here ? approachTrail(state, here.id, t.id).map((r) => r.short).join(" → ") : "";
        const hop = t.here ? "here" : t.adjacent ? "adjacent road" : `Cannot leap. Approach: ${trail || "the gate"}`;
        const siege = inlandSiegeCue(t.id);
        return `<li><span class="mark-chip ${chip}${t.key ? " key" : ""}">${esc(t.short)}${t.key ? " ★" : ""}</span> <span>${esc(hop)}${siege ? `. ${esc(siege)}` : ""}</span></li>`;
      }).join("");
      return `<div class="card desk-card"><h2>${esc(s.name)} · ${esc(s.id)}</h2><ul class="desk-roads">${rows}</ul></div>`;
    }).join("")}
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
      deskId: res.deskId,
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
  syncMapDetailFromState();
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
  paintCourtDesk();
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
        <p class="officer-rankline"><span class="rank-badge rank-commander">${esc(rank)}</span>${esc(p.title)} · ${fac ? esc(fac.short) : "FREE"}</p>
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
  const rung = rosterRungHint(state, p);
  const deskId = syncCourtDesk();
  const look = inlandLook(deskId);
  const desk = inlandDesk(deskId);
  const courtBase = rung || "NEXT: Roster → Create a friend (they start as Player), or Plot → Hire fills an ADD chair.";
  const courtNext = desk && look ? `NEXT: ${desk.line}. ${look.read}. ${courtBase.replace(/^NEXT:\s*/, "")}` : courtBase;
  const courtTitle = look ? `Court — ${look.strip}` : "Court";
  const courtStrip = look
    ? `<p class="court-desk"><strong>${esc(look.strip)}</strong><span>${esc(look.read)}</span></p>`
    : "";
  const chairs = [];
  for (let i = 0; i < MAX_GENERALS; i++) {
    const g = gens[i];
    if (g) {
      const rank = ladderRankOf(g);
      chairs.push(`<div class="court-chair rung-${esc(rank)}${chairFlashId === g.id ? " just-in" : ""}">
        <i class="rank-stripe rank-${esc(rank)}"></i>
        <span class="mini" style="border-color:${esc(stripe)}">${faceSrc(g.portrait) ? `<img src="${faceSrc(g.portrait)}" alt="${esc(faceLabel(g.portrait) || portraitInitials(g.name))}" />` : esc(portraitInitials(g.name))}</span>
        <div class="who">
          ${rankBadge(rank)}
          <strong>${i + 1}. ${esc(g.name)}</strong>
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
      if (!p.faction) hint = "Raise Banner, then Plot → Hire.";
      else if (wait[0]) hint = `Plot → Appoint ${esc(wait[0].name)}.`;
      else if (ladderRoster(state).officer.some((o) => o.region === p.region) && gens.length < MAX_GENERALS) hint = "Roster → Promote an officer to general.";
      else if (ladderRoster(state).player.some((o) => o.region === p.region)) hint = "Roster → Promote a player to officer.";
      else hint = "Plot → Hire fills this ADD chair.";
      chairs.push(`<button type="button" class="court-chair empty" data-add-gen="${i}">
        <i class="rank-stripe rank-empty"></i>
        <span class="mini empty-mini">+</span>
        <div class="who"><strong>${i + 1}. ADD</strong><small>${hint}</small></div>
      </button>`);
    }
  }
  return `<div class="chrome-head"><span class="panel-title">${esc(courtTitle)}</span><button type="button" data-open-roster>Roster</button><span class="panel-why">Five chairs. Player → Officer → General.</span></div>${courtStrip}<p class="court-next">${esc(courtNext)}</p>${chairs.join("")}`;
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
  const yld = geoYield(r, state._season);
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
      <p class="plus">Yield +${yld.food} food, +${yld.gold} gold</p>
      <p class="muted">Works: ${esc(worksLabel(kind))}</p>
      ${(() => {
        const row = stateControl(state).find((s) => s.id === r.stateCode);
        const here = regionOf(state, playerOf(state).region);
        const adj = here && isAdjacent(state, here, r);
        const at = here?.id === r.id;
        const route = at ? "You are here" : routeSentence(state) || (adj ? "Adjacent road open" : "Route locked — not adjacent");
        const { westN, camp } = arcBoard(state);
        const lead = camp.nationalLeader ? " · national leader" : "";
        const lib = row?.liberated
          ? `Free ${r.stateCode} · west ${westN}/8${lead}`
          : `${r.stateCode || "—"} ${row ? `${row.held}/${row.need} ★ · west ${westN}/8` : ""}`;
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
    body: "Yellow nameplate = the city you have selected. Click a city on the map to inspect it. Gold roads between cities are walkable. A state frees when its ★ keys are yours.",
    target: "#city-stats",
    cat: "domestic",
  },
  {
    id: "banner",
    title: "2 / 4  Raise a banner",
    body: "Click RAISE BANNER (1 AP) to claim Cheyenne as Northern Front. That frees Wyoming. Eight west-bloc states (AK WA OR ID MT WY UT CO) name you national leader — a title, not a leap. Yukon is the road between, not a ninth. Reunify is the east walk already on the board: NE–KS–MO. Adjacent roads: Denver, Jackson, Billings, Omaha, Lincoln (I-80 Stall), Salt Lake (I-80 basin). No leap to Seattle. Cuba is Gulf Sealift, then Havana. Nicaragua opens Managua. Russia is Bering, then Kamchatka and Siberia. Korea is the Sponsor Lane, then Korea, then Sheds — Korea inland (kr_inland). Focus one of those inland desks and NEXT names its foreign siege board: Cut the berm, Rake the parapet, Rush the gap.",
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
  paintEventDesk(ev.deskId);
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
    const fighters = promotedInCity(state);
    const lead = fighters.length
      ? `<label class="roster-lead-pick">Who fights <select id="duel-actor"><option value="">You (${esc(playerOf(state).name)})</option>${fighters
          .map((o) => `<option value="${o.id}">${esc(ladderLabel(ladderRankOf(o)))} ${esc(o.name)}</option>`)
          .join("")}</select></label>`
      : "";
    showModal(`<h2>Challenge</h2><p class="muted">Yard duel in this city. Keys: 1 Strike, 2 Guard, 3 Special · your style move. Clock ~99s if both stay up. Green window is a timing bonus — not a combo game.</p>${lead}${cs.map((o) => `<button class="list-btn" data-challenge="${o.id}"><img class="cmd-thumb" src="${sceneArt("challenge")}" alt="" /><span>${esc(o.name)} · ${esc(o.title)} · AGE ${o.age || "?"} · WAR ${o.war}${ladderRankOf(o) ? ` · ${esc(ladderLabel(ladderRankOf(o)))}` : ""}${o.legend ? " · LEGEND" : ""}</span></button>`).join("")}<button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-challenge]").forEach((btn) => {
      btn.onclick = () => {
        const actorId = $("modal-card").querySelector("#duel-actor")?.value || "";
        if (actorId && actorId === btn.dataset.challenge) {
          toast("Pick a different foe.");
          return;
        }
        hideModal();
        run("challenge", { officerId: btn.dataset.challenge, actorId: actorId || undefined });
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
    const leaders = promotedInCity(state);
    const leadPick = leaders.length
      ? `<label class="roster-lead-pick">Field lead <select id="atk-lead"><option value="">You</option>${leaders
          .map((o) => `<option value="${o.id}">${esc(ladderLabel(ladderRankOf(o)))} ${esc(o.name)} · WAR ${o.war}</option>`)
          .join("")}</select></label>`
      : "";
    showModal(`<h2>March / Attack</h2>
      <p>Commit troops from ${esc(here.short)} (garrison ${here.garrison}). Battle is a short grid; auto-resolve is allowed.</p>
      ${leadPick}
      ${list.map((r) => `<button class="list-btn" data-atk="${r.id}"><img class="cmd-thumb" src="${sceneArt("attack")}" alt="" /><span>${esc(r.stateCode || "—")} → ${esc(r.short)} · ${r.owner ? factionOf(state, r.owner)?.short : "open"} · ${geoTags(r).map((t) => t.label).join("/") || "—"}</span></button>`).join("")}
      <label class="muted"><input type="checkbox" id="atk-auto" /> Auto-resolve</label>
      <button data-close>Cancel</button>`);
    $("modal-card").querySelectorAll("[data-atk]").forEach((btn) => {
      btn.onclick = () => {
        const auto = $("modal-card").querySelector("#atk-auto").checked;
        const commanderId = $("modal-card").querySelector("#atk-lead")?.value || "";
        hideModal();
        run("attack", { regionId: btn.dataset.atk, auto, commanderId: commanderId || undefined });
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

export const mapView = { z: 1, x: 0, y: 0, drag: null, pacific: false, focus: null };

let mapDetail = false;
try {
  mapDetail = localStorage.getItem(MAP_DETAIL_KEY) === "1";
} catch {
  mapDetail = false;
}

function mapLayers() {
  return mapLayerVisibility(mapView.z, mapDetail, mapView.focus);
}

function syncMapDetailButton() {
  const btn = $("btn-map-detail");
  if (!btn) return;
  btn.classList.toggle("on", mapDetail);
  btn.setAttribute("aria-pressed", mapDetail ? "true" : "false");
  btn.title = mapDetail ? "Hide map extras (D)" : "Show yield marks and plates (D)";
}

function syncMapDetailFromState() {
  mapDetail = mapDetailFromSave(state, mapDetail);
  if (state) stampMapDetail(state, mapDetail);
  try {
    localStorage.setItem(MAP_DETAIL_KEY, mapDetail ? "1" : "0");
  } catch {
    /* private window */
  }
  syncMapDetailButton();
}

function toggleMapDetail() {
  mapDetail = !mapDetail;
  if (state) stampMapDetail(state, mapDetail);
  try {
    localStorage.setItem(MAP_DETAIL_KEY, mapDetail ? "1" : "0");
  } catch {
    /* private window */
  }
  syncMapDetailButton();
  if (state) drawMap();
}

function canvasPoint(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return letterboxCanvasPoint(e.clientX, e.clientY, rect, canvas.width, canvas.height);
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

function clearForeignFrame() {
  mapView.pacific = false;
  mapView.focus = null;
}

function frameWorld() {
  clearForeignFrame();
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
  clearForeignFrame();
  mapView.z = 0.56;
  mapView.x = 48;
  mapView.y = 72;
  drawMap();
}

function frameCa() {
  clearForeignFrame();
  frameBox(20, 200, 300, 520);
}

function frameGulf() {
  clearForeignFrame();
  frameBox(470, 300, 760, 610);
}

function frameLonLat(lon0, lat0, lon1, lat1, pad) {
  const [xA, yA] = projectLL(lon0, lat0);
  const [xB, yB] = projectLL(lon1, lat1);
  const minX = Math.min(xA, xB);
  const maxX = Math.max(xA, xB);
  const minY = Math.min(yA, yB);
  const maxY = Math.max(yA, yB);
  const z = Math.min(1000 / (maxX - minX), 620 / (maxY - minY)) * (pad || 0.9);
  mapView.z = Math.max(0.16, Math.min(3.2, z));
  mapView.x = (1000 - (minX + maxX) * z) / 2;
  mapView.y = (620 - (minY + maxY) * z) / 2;
  drawMap();
}

/**
 * Strait close-up. Longitude wraps so Nome, Bering, Russia, Kamchatka,
 * and Siberia share one frame. The sponsor lane stays on the Korea frame.
 */
function frameBering() {
  mapView.pacific = true;
  mapView.focus = "bering";
  frameLonLat(136, 72, -154, 50, 0.88);
}

/** Gulf Sealift, Cuba, Havana, Nicaragua, and Managua. */
function frameCuba() {
  mapView.pacific = false;
  mapView.focus = "cuba";
  frameLonLat(-97, 29, -73, 8.2, 0.88);
}

/** Sponsor lane into Korea and the peninsula sheds. No direct Russia–Korea leap. */
function frameKorea() {
  mapView.pacific = false;
  mapView.focus = "korea";
  frameLonLat(118, 68, 170, 32, 0.88);
}

export function adoptMapState(next, selection) {
  state = next;
  if (selection) selectedRegion = selection;
  hoverRegion = null;
}

export function readMapPointer() {
  return { hover: hoverRegion, selected: selectedRegion };
}

export function bindMapPointer(canvas = $("map")) {
  if (!canvas || canvas.__mapBound) return;
  canvas.__mapBound = true;
  canvas.addEventListener("pointermove", onMapPointerMove);
  canvas.addEventListener("pointerdown", onMapPointerDown);
  canvas.addEventListener("pointerup", onMapPointerUp);
  canvas.addEventListener("pointerleave", () => {
    mapView.drag = null;
    hideMapTip();
  });
}

function onMapPointerDown(e) {
  const canvas = $("map");
  const [sx, sy] = canvasPoint(e, canvas);
  mapView.drag = { sx, sy, x: mapView.x, y: mapView.y, moved: false };
  canvas.setPointerCapture?.(e.pointerId);
}

export function onMapPointerMove(e) {
  if (!mapView.drag) {
    onMapMove(e);
    return;
  }
  const [sx, sy] = canvasPoint(e, $("map"));
  const dx = sx - mapView.drag.sx;
  const dy = sy - mapView.drag.sy;
  if (Math.hypot(dx, dy) > 3) mapView.drag.moved = true;
  if (!mapView.drag.moved) return;
  const next = applyMapDrag({ z: mapView.z, x: mapView.drag.x, y: mapView.drag.y }, dx, dy);
  mapView.x = next.x;
  mapView.y = next.y;
  drawMap();
}

function onMapPointerUp(e) {
  const moved = mapView.drag?.moved;
  mapView.drag = null;
  if (!moved) onMapClick(e);
}

function regionAt(mx, my, canvas) {
  const rect = canvas.getBoundingClientRect();
  if (!letterboxContains(mx, my, rect, canvas.width, canvas.height)) return null;
  const [sx, sy] = letterboxCanvasPoint(mx, my, rect, canvas.width, canvas.height);
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

function worksLabel(kind) {
  return {
    elevator: "Grain elevator",
    pump: "Oil pump",
    tower: "Radio tower",
    bunker: "Bunker",
    headframe: "Mine headframe",
    street: "Main street",
    mill: "Timber mill",
    ranch: "Ranch house",
  }[kind] || "Yard";
}

function territoryTipHtml(r) {
  const p = playerOf(state);
  const f = r.owner ? factionOf(state, r.owner) : null;
  const known = r.intel > 0 || (p.faction && r.owner === p.faction);
  const yld = geoYield(r, state._season);
  const here = regionOf(state, p.region);
  const at = here?.id === r.id;
  const adj = here && isAdjacent(state, here, r);
  const route = at ? "You are here" : adj ? "Adjacent road" : "Route locked";
  const target = r.id === selectedRegion && !at ? " · selected" : "";
  const geo = geoTags(r).map((t) => `${t.label} ${t.n}`).join(" · ") || "none";
  return `<strong>${esc(r.short)} · ${esc(r.stateCode || "—")}</strong><p>${esc(f ? f.short : "Open")}${target} · ${esc(route)}</p><p>Levy ${known ? r.garrison : "???"} · Walls ${known ? r.walls : "?"} · Order ${known ? r.order : "?"}</p><p>Yield +${yld.food} food, +${yld.gold} gold</p><p>${esc(worksLabel(markerKind(r)))} · ${esc(geo)}</p>`;
}

function placeMapTip(e, html) {
  const tip = $("tip");
  if (!tip) return;
  tip.dataset.kind = "map";
  tip.innerHTML = html;
  tip.hidden = false;
  const x = Math.max(8, Math.min(window.innerWidth - 300, e.clientX + 14));
  const y = Math.min(window.innerHeight - 8, e.clientY + 16);
  tip.style.left = `${x}px`;
  tip.style.top = `${y}px`;
}

function hideMapTip() {
  const tip = $("tip");
  if (!tip || tip.dataset.kind !== "map") return;
  tip.hidden = true;
  delete tip.dataset.kind;
}

function onMapMove(e) {
  if (!state) return;
  const r = regionAt(e.clientX, e.clientY, $("map"));
  const id = r ? r.id : null;
  $("map").style.cursor = r ? "pointer" : "crosshair";
  if (r) placeMapTip(e, territoryTipHtml(r));
  else hideMapTip();
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
  const hold = row ? `${row.held}/${row.need} ★` : "";
  const { westN } = arcBoard(state);
  const beat = camp.nationalLeader ? "national leader" : `west ${westN}/8`;
  cap.textContent = `${state._season?.name || ""} ${calendarYear(state.week)} · ${r?.stateCode || "—"} → ${r?.short || "?"} · ${hold} · ${beat} · ${route} · phase ${camp.phase}`;
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
function stateLabelFit() {
  return mapLayers().clearRoads ? Math.max(0.45, Math.min(1, 1.1 / mapView.z)) : 1;
}

function stateLabelPx() {
  return Math.max(8, Math.round(16 * stateLabelFit()));
}

/** CSS pixels per canvas pixel. Unlaid-out canvases count as 1:1. */
function mapCssScale() {
  const canvas = $("map");
  if (!canvas || !(canvas.width > 0) || !(canvas.height > 0) || !canvas.getBoundingClientRect) return 1;
  return canvasDisplayScale(canvas.getBoundingClientRect(), canvas.width, canvas.height);
}

/** City names stay smaller than the postal codes, and at least 8 CSS pixels. */
function cityNamePx() {
  const z = Math.max(0.2, mapView.z || 1);
  const scale = Math.max(0.05, mapCssScale());
  const floor = LABEL_MIN_SCREEN / (z * scale);
  return Math.max(floor, Math.min(stateLabelPx() - 2, 14 / z));
}

function viewWorldRect() {
  const z = mapView.z || 1;
  return {
    x0: -mapView.x / z,
    y0: -mapView.y / z,
    x1: (1000 - mapView.x) / z,
    y1: (620 - mapView.y) / z,
  };
}

/** Drawn centre of a close-up marker. Null when the city centre is already off-canvas. */
function closeMarkerAnchor(x, y, size) {
  return insetMarkerCenter(x, y, size / 2 + 2, viewWorldRect());
}

function closeMarkerSize() {
  const z = Math.max(0.2, mapView.z || 1);
  return Math.max(12, 20 / z);
}

function drawStateLabels(ctx) {
  const lines = state.stateLines || [];
  const fit = stateLabelFit();
  const fontPx = stateLabelPx();
  ctx.font = `${fontPx}px 'Press Start 2P', 'Courier New', monospace`;
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
    const w = Math.ceil(ctx.measureText(id).width) + Math.max(6, Math.round(10 * fit));
    const pinned = id === "CA" || id === "NV";
    items.push({
      id,
      x: cx,
      y: cy,
      ox: cx,
      oy: cy,
      w,
      h: Math.max(12, Math.round(22 * fit)),
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
    ctx.fillStyle = "#000010";
    ctx.fillRect(px - 2, py - 2, a.w + 4, a.h + 4);
    ctx.fillStyle = "#f8f8f8";
    ctx.fillRect(px, py, a.w, a.h);
    ctx.fillStyle = "#000010";
    ctx.fillText(a.id, px + Math.max(2, Math.round(5 * fit)), py + Math.max(8, Math.round(16 * fit)));
    if (mapLayers().clearRoads) labelClaims.push({ x: px - 2, y: py - 2, w: a.w + 4, h: a.h + 4 });
  });
  ctx.font = PX_FONT;
}

function projectLL(lon, lat) {
  if (mapView.pacific && lon > 20) lon -= 360;
  const x = 36 + ((lon + 124.8) / 57.9) * 942;
  const y = 132 + ((49.45 - lat) / 25.05) * 476;
  return [x, y];
}

/** Gate pins. Drawn on the world overview. Neighbor lists stay in the region data. */
const WORLD_DESKS = [
  { id: "bering_strait", lon: -168, lat: 65.6, color: "#7aa0b4" },
  { id: "far_russia", lon: 158, lat: 63, color: "#9a3b3b" },
  { id: "gulf_passage", lon: -90.5, lat: 23.8, color: "#8c4a4a" },
  { id: "far_cuba", lon: -79.5, lat: 21.6, color: "#8c4a4a" },
  { id: "far_nicaragua", lon: -85.2, lat: 12.4, color: "#8c4a4a" },
  { id: "far_korea", lon: 127.2, lat: 38.2, color: "#9a3b3b" },
];

/** Inland desks from the locked Campaign list. Close-ups only, so the world overview stays put. */
const INLAND_DESKS = [
  { id: "kamchatka", lon: 159.6, lat: 56, color: "#9a3b3b" },
  { id: "siberia", lon: 148.5, lat: 61.5, color: "#9a3b3b" },
  { id: "havana", lon: -82.5, lat: 23.15, color: "#8c4a4a" },
  { id: "managua", lon: -86.3, lat: 12.1, color: "#8c4a4a" },
  { id: "sponsor_lane", lon: 128, lat: 46, color: "#7aa0b4" },
  { id: "kr_inland", lon: 127.5, lat: 36.5, color: "#9a3b3b" },
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

function ringBox(ring) {
  let minLon = 1e9;
  let maxLon = -1e9;
  let minLat = 1e9;
  let maxLat = -1e9;
  ring.forEach(([lon, lat]) => {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  });
  return { minLon, maxLon, minLat, maxLat, w: maxLon - minLon, h: maxLat - minLat };
}

/** Involved desks only. Flat on the world overview so the faction read stays clean. */
function foreignTheaterKind(ring, color) {
  if (!mapView.focus && (mapView.z < 0.3 || mapView.z >= 0.92)) return null;
  const b = ringBox(ring);
  if (color === "#d32f2f" && b.maxLat > 70 && b.maxLon > 160 && b.minLon < 40) return "russia";
  if (color === "#e57373" && b.minLon < -110 && b.maxLat > 30 && b.minLat < 18 && b.w > 20) return "mexico";
  if (color === "#e57373" && b.minLon > -86 && b.maxLon < -73 && b.minLat > 19 && b.maxLat < 24) return "cuba";
  if (color === "#e57373" && b.minLat > 10 && b.maxLat < 16 && b.minLon > -90 && b.maxLon < -80 && b.w < 8) return "nicaragua";
  if (color === "#e57373" && b.minLat > 6 && b.maxLat < 19 && b.minLon > -93 && b.maxLon < -77 && b.w < 12) return "central";
  if (b.minLon > 123 && b.maxLon < 132 && b.minLat > 33 && b.maxLat < 44 && b.w < 8) return "korea";
  return null;
}

function reliefHeight(lon, lat, kind) {
  const n = Math.sin(lon * 0.17) * Math.cos(lat * 0.21) * 0.45 + Math.sin(lon * 0.37 + 1.7) * Math.cos(lat * 0.33) * 0.25;
  if (kind === "russia") {
    const ural = Math.exp(-((lon - 60) ** 2) / 22);
    const kam = Math.exp(-((lon - 159) ** 2) / 16) * Math.exp(-((lat - 56) ** 2) / 30);
    const koryak = Math.exp(-((lon - 167) ** 2) / 20) * Math.exp(-((lat - 62) ** 2) / 12);
    const chuk = Math.exp(-((lon - 176) ** 2) / 26) * Math.exp(-((lat - 66) ** 2) / 10);
    const stan = Math.exp(-((lon - 140) ** 2) / 80) * Math.exp(-((lat - 56) ** 2) / 7);
    const grain = Math.sin(lon * 0.55 + lat) * 0.08;
    return Math.max(0, Math.min(1, 0.2 + grain + ural * 0.34 + kam * 0.72 + koryak * 0.48 + chuk * 0.42 + stan * 0.4));
  }
  if (kind === "mexico") {
    const sierra = Math.exp(-((lon + 106) ** 2) / 26);
    return 0.36 + n * 0.14 + sierra * 0.4;
  }
  if (kind === "cuba") return 0.18 + Math.exp(-((lat - 21.8) ** 2) / 0.45) * 0.78 + Math.sin(lon * 0.9) * 0.06;
  if (kind === "nicaragua") return 0.16 + Math.exp(-((lon + 85.6) ** 2) / 0.7) * 0.8;
  if (kind === "central") return 0.2 + Math.exp(-((lon + 86.2) ** 2) / 1.6) * 0.7 + Math.sin(lat * 1.4) * 0.06;
  if (kind === "korea") return 0.32 + Math.exp(-((lon - 127.4) ** 2) / 1.3) * 0.5;
  return 0.5;
}

/** Far East close-up. Green lowland, tan ridge, pale high — not a flat red fill. */
function topoRgb(t) {
  const stops = [
    [0, [34, 96, 52]],
    [0.26, [86, 142, 62]],
    [0.46, [176, 158, 74]],
    [0.64, [166, 102, 52]],
    [0.82, [112, 72, 44]],
    [1, [226, 214, 186]],
  ];
  const u = Math.max(0, Math.min(1, t));
  let i = 0;
  while (i < stops.length - 2 && u > stops[i + 1][0]) i += 1;
  const a = stops[i];
  const b = stops[i + 1];
  const f = (u - a[0]) / ((b[0] - a[0]) || 1);
  const mix = (k) => Math.round(a[1][k] + (b[1][k] - a[1][k]) * f);
  return `rgb(${mix(0)},${mix(1)},${mix(2)})`;
}

function shadeWash(hex, t) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const u = Math.max(0, Math.min(1, t));
  if (!mapView.focus) {
    const lift = (u - 0.42) * 64;
    const c = (v) => Math.max(0, Math.min(255, Math.round(v + lift)));
    return `rgb(${c(r)},${c(g)},${c(b)})`;
  }
  let rr = r;
  let gg = g;
  let bb = b;
  if (u < 0.48) {
    const k = (0.48 - u) * 1.15;
    rr = r * (1 - k);
    gg = g * (1 - k * 0.85);
    bb = b * (1 - k * 0.55);
  } else {
    const k = Math.min(1, (u - 0.48) * 1.7);
    rr = r + (196 - r) * k;
    gg = g + (164 - g) * k;
    bb = b + (92 - b) * k;
  }
  const c = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return `rgb(${c(rr)},${c(gg)},${c(bb)})`;
}

function paintTheaterRelief(ctx, ring, color, kind) {
  const b = ringBox(ring);
  const close = mapView.focus === "bering" || mapView.focus === "cuba";
  const step = kind === "russia"
    ? (close ? 0.4 : 1.45)
    : kind === "mexico"
      ? (close ? 0.45 : 0.85)
      : close
        ? 0.16
        : 0.32;
  const view = mapViewRect();
  const pad = 40;
  ctx.save();
  ctx.beginPath();
  tracePart(ctx, ring);
  ctx.clip();
  for (let lat = b.minLat; lat < b.maxLat; lat += step) {
    for (let lon = b.minLon; lon < b.maxLon; lon += step) {
      const [xA, yA] = projectLL(lon, lat);
      const [xB, yB] = projectLL(lon + step, lat - step);
      const x = Math.min(xA, xB);
      const y = Math.min(yA, yB);
      const extra = close ? 0.8 : 0.6;
      const w = Math.abs(xB - xA) + extra;
      const h = Math.abs(yB - yA) + extra;
      if (close && (x > view.x1 + pad || x + w < view.x0 - pad || y > view.y1 + pad || y + h < view.y0 - pad)) continue;
      const hgt = reliefHeight(lon + step * 0.5, lat - step * 0.5, kind);
      ctx.fillStyle = kind === "russia" ? topoRgb(hgt) : shadeWash(color, hgt);
      ctx.fillRect(x, y, w, h);
    }
  }
  ctx.restore();
}

function drawGlobe(ctx) {
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineWidth = mapView.focus ? Math.max(2.6, 2.6 / mapView.z) : Math.max(1.5, 2.05 / mapView.z);
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
      const kind = foreignTheaterKind(part, land.color);
      if (kind) paintTheaterRelief(ctx, part, land.color, kind);
      ctx.beginPath();
      tracePart(ctx, part);
      ctx.stroke();
    });
  });
  drawWorldStrikes(ctx);
  if (!mapView.focus) {
    drawWorldCorridors(ctx);
    drawWorldDesks(ctx);
  }
  ctx.restore();
}

/**
 * Locked chains only.
 * nome → bering_strait → far_russia → kamchatka → siberia.
 * st_louis → gulf_passage → far_cuba → havana, and far_cuba → far_nicaragua → managua.
 * far_russia → sponsor_lane → far_korea → kr_inland. No direct far_russia–far_korea leap.
 * Inland strokes are close-ups only. The world overview keeps the sea approaches.
 */
function drawWorldCorridors(ctx) {
  const focus = mapView.focus;
  if (mapView.z > 0.92 && !focus) return;
  const routes = [];
  const inland = [];
  if (focus === "bering") {
    routes.push({
      color: "#d5e6f2",
      pts: [[-165.4, 64.5], [-168, 65.6], [178.5, 65.3], [170, 64.2], [158, 63]],
    });
    inland.push({ color: "#e4d7a4", pts: [[158, 63], [159.6, 56], [148.5, 61.5]] });
  } else if (focus === "korea") {
    routes.push({ color: "#d5e6f2", pts: [[158, 63], [128, 46], [127.2, 38.2]] });
    inland.push({ color: "#e4d7a4", pts: [[127.2, 38.2], [127.5, 36.5]] });
  } else {
    routes.push(
      { color: "#7aa0b4", pts: [[-168, 65.6], [-170, 76], [-78, 77]] },
      { color: "#7aa0b4", pts: [[-18, 76], [40, 74], [100, 70], [158, 63]] },
      { color: "#8c4a4a", pts: [[-90.5, 23.8], [-79.5, 21.6]] },
      { color: "#8c4a4a", pts: [[-90.5, 23.8], [-85.2, 12.4]] }
    );
    if (mapView.z >= 0.3 || focus === "cuba") routes.push({ color: "#8c4a4a", pts: [[-79.5, 21.6], [-85.2, 12.4]] });
    if (focus === "cuba") {
      inland.push(
        { color: "#e4d7a4", pts: [[-79.5, 21.6], [-82.5, 23.15]] },
        { color: "#e4d7a4", pts: [[-85.2, 12.4], [-86.3, 12.1]] }
      );
    }
  }
  const casing = focus ? Math.max(16, 12 / mapView.z) : Math.max(8, 7 / mapView.z);
  const core = focus ? Math.max(8, 6 / mapView.z) : Math.max(4, 3.6 / mapView.z);
  const paint = (list, dashed) => {
    ctx.save();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    if (dashed) ctx.setLineDash([14 / mapView.z, 9 / mapView.z]);
    list.forEach((route) => {
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
      draw(casing, "#1a140c");
      draw(core, route.color);
    });
    ctx.restore();
  };
  paint(routes, true);
  paint(inland, false);
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

function nearLabels() {
  return mapView.z > 0.4 && mapView.z < 0.85;
}

let labelClaims = [];
let cityClaims = [];
let leaderRoutes = [];

function mapViewRect() {
  const z = mapView.z || 1;
  return {
    x0: -mapView.x / z + 14 / z,
    y0: -mapView.y / z + 16 / z,
    x1: (1000 - mapView.x) / z - 14 / z,
    y1: (620 - mapView.y) / z - 14 / z,
  };
}

function hitsClaim(x, y, w, h) {
  const pad = 22;
  return labelClaims.some(
    (c) => x < c.x + c.w + pad && x + w + pad > c.x && y < c.y + c.h + pad && y + h + pad > c.y
  );
}

function placeNearPlate(pw, ph, candidates) {
  const v = mapViewRect();
  for (const [x0, y0] of candidates) {
    const x = Math.max(v.x0, Math.min(v.x1 - pw, x0));
    const y = Math.max(v.y0, Math.min(v.y1 - ph, y0));
    if (!hitsClaim(x, y, pw, ph)) {
      labelClaims.push({ x, y, w: pw, h: ph });
      return [Math.round(x), Math.round(y)];
    }
  }
  const x = Math.max(v.x0, Math.min(v.x1 - pw, candidates[0][0]));
  const y = Math.max(v.y0, Math.min(v.y1 - ph, candidates[0][1]));
  labelClaims.push({ x, y, w: pw, h: ph });
  return [Math.round(x), Math.round(y)];
}

function pinInView(x, y) {
  const v = mapViewRect();
  return x > v.x0 - 8 && x < v.x1 + 8 && y > v.y0 - 8 && y < v.y1 + 8;
}

function drawDeskPlate(ctx, x, y, boxW, boxH, label) {
  ctx.fillStyle = "#000018";
  ctx.fillRect(x, y, boxW, boxH);
  ctx.fillStyle = "#f8d800";
  ctx.fillText(label, x + 4, y + boxH / 2);
}

function drawWorldDesks(ctx) {
  if (mapView.z > 0.92 && !mapView.focus) return;
  const near = nearLabels();
  const focus = mapView.focus;
  const fontPx = focus
    ? Math.max(20, Math.round(22 / mapView.z))
    : near
      ? Math.max(16, Math.round(13 / mapView.z))
      : Math.max(18, Math.round(12 / mapView.z));
  ctx.font = `${fontPx}px 'Press Start 2P', 'Courier New', monospace`;
  ctx.textBaseline = "middle";
  const inland = focus === "bering" || focus === "cuba" || focus === "korea" ? INLAND_DESKS : [];
  const desks = (focus === "bering" ? [{ id: "nome", lon: -165.4, lat: 64.5, color: "#7aa0b4" }] : [])
    .concat(WORLD_DESKS)
    .concat(inland);
  desks.forEach((d) => {
    const node = regionOf(state, d.id);
    if (!node) return;
    if (near && d.id === "gulf_passage" && focus !== "cuba") return;
    const [x, y] = projectLL(d.lon, d.lat);
    const r = focus ? Math.max(9, 8 / mapView.z) : Math.max(8, 5 / mapView.z);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = d.color || "#9a3b3b";
    ctx.fill();
    ctx.lineWidth = Math.max(2, 1.5 / mapView.z);
    ctx.strokeStyle = "#f8d800";
    ctx.stroke();
    if (focus && !pinInView(x, y)) return;
    const label = node.short;
    const tw = ctx.measureText(label).width;
    const pad = 6 / mapView.z;
    const boxW = tw + pad + 4;
    const boxH = fontPx * 1.35;
    if (near && !focus && (d.id === "far_cuba" || d.id === "far_nicaragua")) {
      const [bx, by] = placeNearPlate(boxW, boxH, [
        [x - boxW / 2, y + r + 22 / mapView.z],
        [x + r + 16 / mapView.z, y - boxH / 2],
        [x - boxW - r - 16 / mapView.z, y + r],
      ]);
      drawDeskPlate(ctx, bx, by, boxW, boxH, label);
      return;
    }
    const placed = (focus === "bering" && (d.id === "nome" || d.id === "bering_strait" || d.id === "far_russia" || d.id === "kamchatka" || d.id === "siberia"))
      || (focus === "cuba" && (d.id === "gulf_passage" || d.id === "far_cuba" || d.id === "far_nicaragua" || d.id === "havana" || d.id === "managua"))
      || (focus === "korea" && (d.id === "far_russia" || d.id === "sponsor_lane" || d.id === "far_korea" || d.id === "kr_inland"));
    if (placed) {
      const prefs = {
        nome: [
          [x - boxW / 2, y - boxH - r - 16 / mapView.z],
          [x + r + 14 / mapView.z, y - boxH / 2],
        ],
        bering_strait: [
          [x - boxW / 2, y + r + 18 / mapView.z],
          [x - boxW - r - 14 / mapView.z, y - boxH / 2],
        ],
        far_russia: [
          [x - boxW - r - 16 / mapView.z, y - boxH / 2],
          [x - boxW / 2, y - boxH - r - 14 / mapView.z],
        ],
        gulf_passage: [
          [x - boxW - r - 12 / mapView.z, y - boxH / 2],
          [x - boxW / 2, y - boxH - r - 16 / mapView.z],
        ],
        far_cuba: [
          [x + r + 16 / mapView.z, y - boxH / 2],
          [x - boxW / 2, y - boxH - r - 16 / mapView.z],
        ],
        far_nicaragua: [
          [x + r + 18 / mapView.z, y - boxH - r - 8 / mapView.z],
          [x + r + 22 / mapView.z, y - boxH / 2],
          [x - boxW / 2, y - boxH - r - 28 / mapView.z],
        ],
        kamchatka: [
          [x + r + 14 / mapView.z, y - boxH / 2],
          [x - boxW / 2, y + r + 16 / mapView.z],
        ],
        siberia: [
          [x - boxW - r - 14 / mapView.z, y - boxH / 2],
          [x - boxW / 2, y - boxH - r - 12 / mapView.z],
        ],
        havana: [
          [x - boxW - r - 12 / mapView.z, y - boxH / 2],
          [x - boxW / 2, y - boxH - r - 14 / mapView.z],
        ],
        managua: [
          [x - boxW / 2, y + r + boxH + 26 / mapView.z],
          [x - boxW - r - 20 / mapView.z, y + r + 8 / mapView.z],
          [x + r + 18 / mapView.z, y + r + boxH],
        ],
        sponsor_lane: [
          [x - boxW / 2, y - boxH - r - 14 / mapView.z],
          [x + r + 12 / mapView.z, y - boxH / 2],
        ],
        far_korea: [
          [x + r + 14 / mapView.z, y - boxH / 2],
          [x - boxW / 2, y - boxH - r - 12 / mapView.z],
        ],
        kr_inland: [
          [x - boxW / 2, y + r + 16 / mapView.z],
          [x + r + 12 / mapView.z, y - boxH / 2],
        ],
      }[d.id] || [
        [x - boxW / 2, y + r + 22 / mapView.z],
        [x + r + 16 / mapView.z, y - boxH / 2],
      ];
      const [bx, by] = placeNearPlate(boxW, boxH, prefs);
      drawDeskPlate(ctx, bx, by, boxW, boxH, label);
      return;
    }
    const lx = x + r + 4 / mapView.z;
    const ly = y;
    ctx.fillStyle = "#000018";
    ctx.fillRect(lx - 2, ly - fontPx * 0.65, tw + pad, fontPx * 1.3);
    ctx.fillStyle = "#f8d800";
    ctx.fillText(label, lx, ly);
  });
}

/**
 * The world desk already paints "Gulf Sealift" on the Cuba close-up and the globe.
 * The city plate must not stack a second copy (or a garrison "?") on that caption.
 */
function gulfDeskCaptionOn() {
  if (mapView.z > 0.92 && !mapView.focus) return false;
  if (nearLabels() && mapView.focus !== "cuba") return false;
  return true;
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
  if (nearLabels()) {
    [px, py] = placeNearPlate(pw, ph, [
      [x - pw - 36, y - ph / 2],
      [x - pw / 2, y - ph - 56],
      [x + 36, y - ph / 2],
    ]);
  } else {
    px = Math.max(4, Math.min(996 - pw, px));
    [px, py] = plateAwayFromSelected(r, px, py, pw, ph);
    if (py < 4) py = Math.round(y + 18);
  }
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
  const seaGate = r.id === "gulf_passage";
  if (seaGate && gulfDeskCaptionOn()) return;
  const garr = seaGate ? "" : (known ? String(r.garrison) : "?");
  const keepGulf = seaGate;
  if (!selected && !here && r.id !== hoverRegion && !keepGulf) return;
  if (here && !selected) {
    drawHereChip(ctx, r, x, y);
    return;
  }
  ctx.font = PLATE_FONT;
  const nameW = ctx.measureText(r.short).width;
  const garrW = garr ? ctx.measureText(garr).width : 0;
  const pad = seaGate ? 28 : 40;
  const pw = Math.max(seaGate ? 64 : 120, Math.ceil((nameW + garrW + pad) / 4) * 4);
  const ph = 32;
  let px = Math.round(x - pw / 2);
  let py = r.plate === "above" ? Math.round(y - 44) : Math.round(y + 20);
  if (nearLabels()) {
    const prefs = selected
      ? [
          [x - pw / 2, y + 52],
          [x + 40, y + 18],
          [x - pw - 36, y - ph / 2],
        ]
      : [
          [x - pw - 36, y - ph / 2],
          [x - pw / 2, y + 48],
          [x + 36, y - ph / 2],
        ];
    [px, py] = placeNearPlate(pw, ph, prefs);
  } else {
    px = Math.max(4, Math.min(996 - pw, px));
    if (py < 4) py = Math.round(y + 20);
    if (py + ph > 616) py = Math.round(y - 44);
    [px, py] = plateAwayFromSelected(r, px, py, pw, ph);
  }
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
  if (garr) {
    ctx.fillStyle = "#f8f8f8";
    ctx.fillText(garr, px + pw - 12 - garrW, py + 23);
  }
}

function roadEnds(a, b) {
  if (mapView.z < 0.45) return [a, b];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  if (len >= 160) return [a, b];
  const extra = Math.min(40, Math.max(18, (160 - len) * 0.55));
  const ux = dx / len;
  const uy = dy / len;
  return [
    [a[0] - ux * extra, a[1] - uy * extra],
    [b[0] + ux * extra, b[1] + uy * extra],
  ];
}

function drawFrontSeg(ctx, a, b) {
  const [p, q] = roadEnds(a, b);
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const thick = mapView.z >= 0.45 && len < 160;
  ctx.save();
  ctx.lineCap = "butt";
  ctx.strokeStyle = "#1a0808";
  ctx.lineWidth = thick ? 11 : 7;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(p[0], p[1]);
  ctx.lineTo(q[0], q[1]);
  ctx.stroke();
  ctx.strokeStyle = "#f8f8f8";
  ctx.lineWidth = thick ? 5 : 3;
  ctx.setLineDash([8, 7]);
  ctx.beginPath();
  ctx.moveTo(p[0], p[1]);
  ctx.lineTo(q[0], q[1]);
  ctx.stroke();
  ctx.restore();
}

const CAMPAIGN_ROADS = [
  ["spokane", "portland"],
  ["spokane", "bend"],
  ["boise", "missoula"],
  ["boise", "jackson"],
  ["cheyenne", "salt_lake"],
  ["cheyenne", "lincoln"],
  ["cheyenne", "denver"],
  ["denver", "lincoln"],
  ["reno", "salt_lake"],
  ["lincoln", "wichita"],
  ["topeka", "st_louis"],
];

function drawCampaignRoads(ctx) {
  if (mapView.z < 0.45) return;
  CAMPAIGN_ROADS.forEach(([aId, bId]) => {
    const a = regionOf(state, aId);
    const b = regionOf(state, bId);
    if (!a || !b || !isAdjacent(state, a, b)) return;
    const [pa, pb] = [cityXY(a), cityXY(b)];
    const [p, q] = roadEnds(pa, pb);
    const len = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]) || 1;
    ctx.save();
    ctx.lineCap = "butt";
    ctx.strokeStyle = "#1a0808";
    ctx.lineWidth = len < 110 ? 15 : 11;
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    ctx.lineTo(q[0], q[1]);
    ctx.stroke();
    ctx.strokeStyle = "#fff6d0";
    ctx.lineWidth = len < 110 ? 7 : 5;
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    ctx.lineTo(q[0], q[1]);
    ctx.stroke();
    ctx.restore();
  });
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

const chordFaintCache = new Map();

function stateCodeAt(x, y) {
  const lines = state?.stateLines || [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.ring || !hitPoly(line.ring, x, y)) continue;
    return String(line.id || "");
  }
  return "";
}

/** Straight chords that cross other states stay on the neighbor list, drawn faint. */
function chordFaint(from, to, a, b, stateA, stateB) {
  if (!state?.stateLines?.length) return false;
  const key = from < to ? `${from}|${to}` : `${to}|${from}`;
  if (chordFaintCache.has(key)) return chordFaintCache.get(key);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const samples = [];
  const n = 12;
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    samples.push(stateCodeAt(a[0] + dx * t, a[1] + dy * t));
  }
  const faint = chordIsMisleading(len, samples, stateA || "", stateB || "");
  chordFaintCache.set(key, faint);
  return faint;
}

function drawClearRoad(ctx, a, b, hot, faint) {
  const width = closeRoadWidth(mapView.z);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const trim = Math.min(closeMarkerSize() / 2 + 1, len * 0.35);
  const ux = dx / len;
  const uy = dy / len;
  ctx.save();
  ctx.lineCap = "butt";
  ctx.lineJoin = "miter";
  ctx.globalAlpha = faint ? (hot ? 0.72 : 0.55) : 1;
  ctx.beginPath();
  ctx.moveTo(a[0] + ux * trim, a[1] + uy * trim);
  ctx.lineTo(b[0] - ux * trim, b[1] - uy * trim);
  ctx.strokeStyle = hot && !faint ? "#3a2e18" : "#241c12";
  ctx.lineWidth = width.casing * (faint ? 0.8 : 1);
  ctx.stroke();
  ctx.strokeStyle = hot && !faint ? "#f6e7b4" : "#f0e0b0";
  ctx.lineWidth = width.core * (faint ? 0.75 : 1);
  ctx.stroke();
  ctx.restore();
}

function drawClearRoads(ctx, painted) {
  const here = playerOf(state).region;
  const hotKey = here && selectedRegion && here !== selectedRegion ? [here, selectedRegion].sort().join("|") : "";
  const byId = new Map(painted.map((r) => [r.id, r]));
  const rows = mapRoads(painted).map((rd) => {
    const key = [rd.from, rd.to].sort().join("|");
    const pulse = mapFx?.kind === "travel" && sameRoad(rd.a, rd.b, mapFx.a, mapFx.b);
    const hot = (pulse && Math.floor((performance.now() - mapFx.t0) / 420) % 2 === 0) || key === hotKey;
    const ra = byId.get(rd.from);
    const rb = byId.get(rd.to);
    const faint = chordFaint(rd.from, rd.to, rd.a, rd.b, ra?.stateCode || "", rb?.stateCode || "");
    return { rd, hot, faint };
  });
  rows.filter((row) => row.faint).forEach((row) => drawClearRoad(ctx, row.rd.a, row.rd.b, row.hot, true));
  rows.filter((row) => !row.faint).forEach((row) => drawClearRoad(ctx, row.rd.a, row.rd.b, row.hot, false));
}

function drawCityMarkClean(ctx, r, selected) {
  const [gx, gy] = cityXY(r);
  const here = playerOf(state).region === r.id;
  const s = closeMarkerSize() * (here ? 1.28 : 1);
  const anchor = closeMarkerAnchor(gx, gy, s);
  if (!anchor) return;
  const [x, y] = anchor;
  const half = s / 2;
  const x0 = Math.round(x - half);
  const y0 = Math.round(y - half);
  const fac = r.owner ? factionOf(state, r.owner) : null;
  const fill = here ? "#f8d800" : fac ? fac.color : "#e4e0d4";
  ctx.fillStyle = "#140e08";
  ctx.fillRect(x0 - 1, y0 - 1, s + 2, s + 2);
  ctx.fillStyle = fill;
  ctx.fillRect(x0, y0, s, s);
  const pip = Math.max(2, Math.round(s * 0.34));
  ctx.fillStyle = here ? "#fff6c4" : "#f7f3ea";
  ctx.fillRect(Math.round(x - pip / 2), Math.round(y - pip / 2), pip, pip);
  if (here || selected) {
    ctx.strokeStyle = "#f8d800";
    ctx.lineWidth = Math.max(0.8, (here ? 2.6 : 1.6) / Math.max(0.2, mapView.z));
    const pad = here ? 2.2 : 1.4;
    ctx.strokeRect(x0 - pad, y0 - pad, s + pad * 2, s + pad * 2);
  }
  const dot = Math.round(x + half + 2);
  if (r.id === "arctic_slope" && legendStatus(state).mapMark) {
    ctx.fillStyle = "#d080f8";
    ctx.fillRect(dot, y0, 3, 3);
  }
  legendBoard(state).forEach((h) => {
    if (h.regionId !== r.id || !h.mapMark) return;
    ctx.fillStyle = "#d080f8";
    ctx.fillRect(dot, y0, 3, 3);
  });
  drawTroopBadge(ctx, r, x, y, s);
}

/** Same rule as the city tooltip and the city report. */
function garrisonKnown(r) {
  const p = playerOf(state);
  if (!r || !p) return false;
  return r.intel > 0 || !!(p.faction && r.owner === p.faction);
}

function troopChipLabel(r) {
  return garrisonKnown(r) ? String(r.garrison) : "?";
}

/**
 * A split state is only a contest the player can mark once they hold a city
 * there or have intel on this one. The starting political map is not enough.
 */
function cityIsContested(r) {
  if (!r || stateWash(r.stateCode)?.kind !== "contested") return false;
  const p = playerOf(state);
  if (!p) return false;
  if (r.intel > 0) return true;
  if (!p.faction) return false;
  return state.regions.some((c) => c.stateCode === r.stateCode && !(c.unlockPhase > 0) && c.owner === p.faction);
}

function showTroopChip(r) {
  if (!(r.garrison > 0)) return false;
  const player = playerOf(state);
  if (!player) return false;
  if (r.id === player.region) return true;
  if (player.faction && r.owner === player.faction) return true;
  if (r.intel > 0 && r.owner && r.owner !== player.faction) return true;
  return cityIsContested(r);
}

function troopChipBox(ctx, r, x, y, s) {
  if (!showTroopChip(r)) return null;
  const z = Math.max(0.2, mapView.z || 1);
  const label = troopChipLabel(r);
  const fontPx = Math.max(3, Math.min(cityNamePx() - 1, 8 / z));
  const prev = ctx.font;
  ctx.font = `${fontPx}px 'Press Start 2P', 'Courier New', monospace`;
  const bw = Math.max(8 / z, ctx.measureText(label).width + 2);
  const bh = Math.max(4, fontPx + 2);
  ctx.font = prev;
  const bx = Math.round(x + s * 0.15);
  const by = Math.round(y - s * 0.5 - bh - 1);
  return { id: r.id, x: bx - 1, y: by - 1, w: bw + 2, h: bh + 2, label, fontPx, bx, by, bw, bh };
}

function drawTroopBadge(ctx, r, x, y, s) {
  const box = troopChipBox(ctx, r, x, y, s);
  if (!box) return;
  ctx.save();
  ctx.font = `${box.fontPx}px 'Press Start 2P', 'Courier New', monospace`;
  ctx.fillStyle = "#140e08";
  ctx.fillRect(box.x, box.y, box.w, box.h);
  ctx.fillStyle = "#f8d800";
  ctx.fillRect(box.bx, box.by, box.bw, box.bh);
  ctx.fillStyle = "#140e08";
  ctx.textBaseline = "top";
  ctx.fillText(box.label, box.bx + 1, box.by + 1);
  ctx.restore();
}

function drawCleanStallFront(ctx) {
  const ids = ["cheyenne", "omaha", "lincoln", "topeka", "wichita", "st_louis"];
  const z = Math.max(0.2, mapView.z || 1);
  let prev = null;
  ids.forEach((id) => {
    const r = regionOf(state, id);
    if (!r) {
      prev = null;
      return;
    }
    if (prev && isAdjacent(state, prev, r)) {
      const a = cityXY(prev);
      const b = cityXY(r);
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const len = Math.hypot(dx, dy) || 1;
      const off = 6 / z;
      const ox = (-dy / len) * off;
      const oy = (dx / len) * off;
      ctx.save();
      ctx.lineCap = "butt";
      ctx.strokeStyle = "#1a120c";
      ctx.lineWidth = 4.2 / z;
      ctx.beginPath();
      ctx.moveTo(a[0] + ox, a[1] + oy);
      ctx.lineTo(b[0] + ox, b[1] + oy);
      ctx.stroke();
      ctx.strokeStyle = "#f8d800";
      ctx.lineWidth = 2.4 / z;
      ctx.setLineDash([8 / z, 5 / z]);
      ctx.beginPath();
      ctx.moveTo(a[0] + ox, a[1] + oy);
      ctx.lineTo(b[0] + ox, b[1] + oy);
      ctx.stroke();
      ctx.restore();
    }
    prev = r;
  });
  const end = regionOf(state, "st_louis");
  if (!end) return;
  const [x, y] = cityXY(end);
  const s = 8 / z;
  ctx.fillStyle = "#f4f4f4";
  ctx.beginPath();
  ctx.moveTo(x + s, y + s * 0.4);
  ctx.lineTo(x + s * 3.2, y + s * 2.2);
  ctx.lineTo(x + s * 1.2, y + s * 2.4);
  ctx.closePath();
  ctx.fill();
}

function drawCleanAxis(ctx, a, b, color) {
  const z = Math.max(0.2, mapView.z || 1);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const head = 10 / z;
  ctx.save();
  ctx.lineCap = "butt";
  ctx.strokeStyle = "#1a120c";
  ctx.lineWidth = 2.2 / z;
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(b[0], b[1]);
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.1 / z;
  ctx.stroke();
  const baseX = b[0] - ux * head;
  const baseY = b[1] - uy * head;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(b[0], b[1]);
  ctx.lineTo(baseX + px * head * 0.45, baseY + py * head * 0.45);
  ctx.lineTo(baseX - px * head * 0.45, baseY - py * head * 0.45);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawCleanInvasionAxes(ctx) {
  drawCleanAxis(ctx, [6, 34], [86, 86], "#7aa0b4");
  drawCleanAxis(ctx, [334, 467], [482, 579], "#8c4a4a");
}

/** Marker draw point for labels and chips. Cities whose centres are off-canvas are skipped. */
function cleanCitySpot(r, hereId) {
  const [x, y] = cityXY(r);
  const marker = closeMarkerSize() * (r.id === hereId ? 1.28 : 1);
  const anchor = closeMarkerAnchor(x, y, marker);
  if (!anchor) return null;
  return { r, x: anchor[0], y: anchor[1], gx: x, gy: y, marker };
}

function claimHits(list, x, y, w, h, pad) {
  return list.some((c) => x < c.x + c.w + pad && x + w + pad > c.x && y < c.y + c.h + pad && y + h + pad > c.y);
}

function markerOverlap(mx, my, marker, lx, ly, w, h) {
  const half = marker / 2;
  return lx < mx + half && lx + w > mx - half && ly < my + half && ly + h > my - half;
}

function labelGap(mx, my, marker, lx, ly, w, h) {
  const left = mx - marker / 2;
  const right = mx + marker / 2;
  const top = my - marker / 2;
  const bottom = my + marker / 2;
  const dx = lx + w < left ? left - (lx + w) : lx > right ? lx - right : 0;
  const dy = ly + h < top ? top - (ly + h) : ly > bottom ? ly - bottom : 0;
  return Math.hypot(dx, dy);
}

function closerToOwn(lx, ly, w, h, own, others) {
  const cx = lx + w / 2;
  const cy = ly + h / 2;
  const ownC = Math.hypot(cx - own.x, cy - own.y);
  const ownGap = labelGap(own.x, own.y, own.marker, lx, ly, w, h);
  for (let i = 0; i < others.length; i++) {
    const o = others[i];
    if (Math.hypot(cx - o.x, cy - o.y) <= ownC + 0.25) return false;
    if (labelGap(o.x, o.y, o.marker, lx, ly, w, h) + 0.25 < ownGap) return false;
  }
  return true;
}

function labelAngles(x, y, neighbors) {
  let away = -Math.PI / 2;
  let best = Infinity;
  neighbors.forEach((n) => {
    const d = Math.hypot(n.x - x, n.y - y);
    if (d < best) {
      best = d;
      away = Math.atan2(y - n.y, x - n.x);
    }
  });
  const dirs = [];
  for (let i = 0; i < 16; i++) {
    const step = Math.ceil(i / 2) * (Math.PI / 8);
    const ang = away + (i % 2 === 0 ? 1 : -1) * step;
    dirs.push(ang);
  }
  return dirs;
}

function cityLabelView() {
  const z = mapView.z || 1;
  const pad = 2 / z;
  return {
    x0: -mapView.x / z + pad,
    y0: -mapView.y / z + pad,
    x1: (1000 - mapView.x) / z - pad,
    y1: (620 - mapView.y) / z - pad,
  };
}

function cityLabelSlots(x, y, w, h, marker, neighbors, maxEdge) {
  const view = cityLabelView();
  const dirs = labelAngles(x, y, neighbors);
  const gaps = [];
  const gapEnd = maxEdge / Math.max(1, marker);
  for (let mult = 0.12; mult <= gapEnd + 0.01; mult += 0.22) gaps.push(mult);
  const nudges = [0, 0.4, -0.4, 0.9, -0.9, 1.45, -1.45];
  const slots = [];
  const seen = new Set();
  gaps.forEach((mult) => {
    const gap = Math.max(2, marker * mult);
    dirs.forEach((ang) => {
      const ux = Math.cos(ang);
      const uy = Math.sin(ang);
      nudges.forEach((nudge) => {
        const shift = nudge * Math.max(h, 6);
        const lx = Math.round(x + ux * (marker / 2 + gap) - w / 2 - uy * shift);
        const ly = Math.round(y + uy * (marker / 2 + gap) - h / 2 + ux * shift);
        if (lx < view.x0 || ly < view.y0 || lx + w > view.x1 || ly + h > view.y1) return;
        const key = `${lx}|${ly}`;
        if (seen.has(key)) return;
        seen.add(key);
        if (markerOverlap(x, y, marker, lx, ly, w, h)) return;
        const edge = labelGap(x, y, marker, lx, ly, w, h);
        if (edge > maxEdge) return;
        slots.push({ lx, ly, leader: edge > marker * LABEL_ANCHOR + 0.5 });
      });
    });
  });
  return slots;
}

function segmentsCross(ax, ay, bx, by, cx, cy, dx, dy) {
  const den = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx);
  if (Math.abs(den) < 1e-8) return false;
  const t = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / den;
  const u = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / den;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

function segmentHitsRect(x1, y1, x2, y2, rect) {
  const inside = (x, y) => x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
  if (inside(x1, y1) || inside(x2, y2)) return true;
  const r = rect.x;
  const b = rect.y;
  const rr = rect.x + rect.w;
  const bb = rect.y + rect.h;
  return segmentsCross(x1, y1, x2, y2, r, b, rr, b)
    || segmentsCross(x1, y1, x2, y2, rr, b, rr, bb)
    || segmentsCross(x1, y1, x2, y2, rr, bb, r, bb)
    || segmentsCross(x1, y1, x2, y2, r, bb, r, b);
}

function leaderLegs(route) {
  if (!route) return [];
  if (route.bend) {
    return [
      [route.x1, route.y1, route.bend[0], route.bend[1]],
      [route.bend[0], route.bend[1], route.x2, route.y2],
    ];
  }
  return [[route.x1, route.y1, route.x2, route.y2]];
}

function leaderCrosses(route, markers) {
  const legs = leaderLegs(route);
  return legs.some(([x1, y1, x2, y2]) => labelClaims.some((c) => segmentHitsRect(x1, y1, x2, y2, c))
    || cityClaims.some((c) => segmentHitsRect(x1, y1, x2, y2, c))
    || markers.some((c) => segmentHitsRect(x1, y1, x2, y2, c))
    || leaderRoutes.some((old) => leaderLegs(old).some(([ax, ay, bx, by]) => segmentsCross(x1, y1, x2, y2, ax, ay, bx, by))));
}

function boxHitsLeader(x, y, w, h) {
  return leaderRoutes.some((route) => leaderLegs(route).some(([x1, y1, x2, y2]) => segmentHitsRect(x1, y1, x2, y2, { x, y, w, h })));
}

function routeLeader(x, y, marker, lx, ly, w, h, markers) {
  const ang = Math.atan2(ly + h / 2 - y, lx + w / 2 - x);
  const x1 = x + Math.cos(ang) * (marker / 2 + 1.5);
  const y1 = y + Math.sin(ang) * (marker / 2 + 1.5);
  const end = leaderEndOnLabel(x1, y1, lx, ly, w, h);
  const straight = { x1, y1, x2: end[0], y2: end[1], bend: null };
  if (!leaderCrosses(straight, markers)) return straight;
  const mx = (x1 + end[0]) / 2;
  const my = (y1 + end[1]) / 2;
  const line = Math.atan2(end[1] - y1, end[0] - x1);
  const offs = [8, 16, 28, 44];
  for (let i = 0; i < offs.length; i++) {
    for (let dir = 1; dir >= -1; dir -= 2) {
      const bend = [
        mx + Math.cos(line + dir * Math.PI / 2) * offs[i],
        my + Math.sin(line + dir * Math.PI / 2) * offs[i],
      ];
      const bent = { x1, y1, x2: end[0], y2: end[1], bend };
      if (!leaderCrosses(bent, markers)) return bent;
    }
  }
  return null;
}

function firstLegalLabel(slots, x, y, w, h, marker, blocks, neighbors, markers, pads, mode) {
  const own = { x, y, marker };
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const beside = labelGap(x, y, marker, slot.lx, slot.ly, w, h) <= marker * LABEL_ANCHOR + 0.5;
    const ownOk = closerToOwn(slot.lx, slot.ly, w, h, own, neighbors);
    if (mode === "own" && !ownOk) continue;
    if (mode === "tight" && !ownOk && !beside) continue;
    if (claimHits(cityClaims, slot.lx, slot.ly, w, h, pads.city)) continue;
    if (claimHits(labelClaims, slot.lx, slot.ly, w, h, pads.state)) continue;
    if (claimHits(blocks, slot.lx, slot.ly, w, h, pads.block)) continue;
    if (boxHitsLeader(slot.lx, slot.ly, w, h)) continue;
    const needsLine = mode === "led" || slot.leader || !ownOk;
    if (needsLine) {
      const route = routeLeader(x, y, marker, slot.lx, slot.ly, w, h, markers);
      if (!route) continue;
      slot.leader = true;
      slot.route = route;
    }
    return slot;
  }
  return null;
}

function labelCap(marker, allowBeside) {
  const screen = calloutCap(marker, mapView.z, mapCssScale());
  return allowBeside ? Math.min(marker * LABEL_ANCHOR, screen) : screen;
}

function gridLabelSlots(x, y, w, h, marker, maxEdge) {
  const view = cityLabelView();
  const reach = marker / 2 + maxEdge + 2;
  const step = Math.max(2, Math.round(Math.min(w, h) * 0.34));
  const slots = [];
  const yStart = Math.max(view.y0, y - reach - h);
  const yEnd = Math.min(view.y1 - h, y + reach);
  const xStart = Math.max(view.x0, x - reach - w);
  const xEnd = Math.min(view.x1 - w, x + reach);
  for (let ly = yStart; ly <= yEnd; ly += step) {
    for (let lx = xStart; lx <= xEnd; lx += step) {
      const px = Math.round(lx);
      const py = Math.round(ly);
      if (markerOverlap(x, y, marker, px, py, w, h)) continue;
      const edge = labelGap(x, y, marker, px, py, w, h);
      if (edge > maxEdge) continue;
      slots.push({ lx: px, ly: py, leader: edge > marker * LABEL_ANCHOR + 0.5, edge });
    }
  }
  slots.sort((a, b) => a.edge - b.edge);
  return slots;
}

function pickCityLabel(x, y, w, h, marker, blocks, neighbors, markers, mode, grid) {
  const cap = mode === "tight" ? labelCap(marker, true) : labelCap(marker, false);
  const slots = grid
    ? gridLabelSlots(x, y, w, h, marker, cap)
    : cityLabelSlots(x, y, w, h, marker, neighbors, cap);
  const pads = { city: 0, state: 0, block: 0 };
  return firstLegalLabel(slots, x, y, w, h, marker, blocks, neighbors, markers, pads, mode);
}

function drawLabelLeader(ctx, x, y, marker, lx, ly, w, h, route) {
  const z = Math.max(0.2, mapView.z || 1);
  const path = route || routeLeader(x, y, marker, lx, ly, w, h, []);
  if (!path) return;
  ctx.save();
  ctx.strokeStyle = "#f4efe4";
  ctx.lineWidth = Math.max(0.6, 1.5 / z);
  ctx.beginPath();
  ctx.moveTo(path.x1, path.y1);
  if (path.bend) ctx.lineTo(path.bend[0], path.bend[1]);
  ctx.lineTo(path.x2, path.y2);
  ctx.stroke();
  ctx.restore();
}

function paintCityName(ctx, r, px, py, w, h, here, selected, placed, x, y, marker, sized) {
  const z = Math.max(0.2, mapView.z || 1);
  if (placed.leader) drawLabelLeader(ctx, x, y, marker, px, py, w, h, placed.route);
  ctx.fillStyle = selected ? "#f8d800" : "#0c0c16";
  ctx.fillRect(px, py, w, h);
  if (here && !selected) {
    ctx.strokeStyle = "#f8d800";
    ctx.lineWidth = Math.max(0.5, 1.2 / z);
    ctx.strokeRect(px + 0.5, py + 0.5, w - 1, h - 1);
  }
  ctx.fillStyle = selected ? "#000018" : here ? "#f8d800" : "#f4efe4";
  const lines = placed.lines;
  if (lines) {
    lines.forEach((line, i) => ctx.fillText(line, px + 2, py + 1 + i * (sized + 1)));
  } else {
    ctx.fillText(placed.text || r.short, px + 2, py + 1);
  }
}

function nameLines(short) {
  if (!short || short.length < 6) return null;
  const mid = Math.ceil(short.length / 2);
  return [short.slice(0, mid), short.slice(mid)];
}

function drawCleanCityLabels(ctx, painted) {
  const fontPx = cityNamePx();
  const z = mapView.z || 1;
  const hereId = playerOf(state).region;
  leaderRoutes = [];
  const spots = [];
  painted.forEach((r) => {
    if (!r.short) return;
    const spot = cleanCitySpot(r, hereId);
    if (spot) spots.push(spot);
  });
  const neighborsOf = (id) => spots.filter((s) => s.r.id !== id).map((s) => ({ x: s.x, y: s.y, marker: s.marker }));
  const markerClaims = spots.map((s) => ({
    id: s.r.id,
    x: s.x - s.marker / 2 - 1,
    y: s.y - s.marker / 2 - 1,
    w: s.marker + 2,
    h: s.marker + 2,
  }));
  const chipClaims = [];
  spots.forEach((s) => {
    const box = troopChipBox(ctx, s.r, s.x, s.y, s.marker);
    if (box) chipClaims.push(box);
  });
  const blocksFor = (id) => markerClaims.filter((c) => c.id !== id).concat(chipClaims);
  const markersFor = (id) => markerClaims.filter((c) => c.id !== id);
  const nearest = (s) => {
    let best = Infinity;
    spots.forEach((o) => {
      if (o.r.id === s.r.id) return;
      best = Math.min(best, Math.hypot(o.x - s.x, o.y - s.y));
    });
    return best;
  };
  const ranked = spots
    .map((s, i) => ({ s, i }))
    .sort((a, b) => {
      const rank = (r) => (r.id === hereId ? 3 : r.id === selectedRegion ? 2 : r.id === hoverRegion ? 1 : 0);
      return rank(b.s.r) - rank(a.s.r) || nearest(a.s) - nearest(b.s) || a.i - b.i;
    });
  const measureName = (item, sized, stack) => {
    ctx.font = `${sized}px 'Press Start 2P', 'Courier New', monospace`;
    const lines = stack ? nameLines(item.s.r.short) : null;
    if (!lines) {
      return {
        lines: null,
        w: Math.ceil(ctx.measureText(item.s.r.short).width) + 4,
        h: Math.ceil(sized + 3),
      };
    }
    const w = Math.max(...lines.map((line) => Math.ceil(ctx.measureText(line).width))) + 4;
    return { lines, w, h: Math.ceil(lines.length * (sized + 1) + 3) };
  };
  const placeList = (list, sized, mode, stack) => {
    const found = [];
    const next = [];
    list.forEach((item) => {
      const box = measureName(item, sized, stack);
      const blocks = blocksFor(item.s.r.id);
      const markers = markersFor(item.s.r.id);
      const neighbors = neighborsOf(item.s.r.id);
      let placed = pickCityLabel(item.s.x, item.s.y, box.w, box.h, item.s.marker, blocks, neighbors, markers, mode, false);
      if (!placed) placed = pickCityLabel(item.s.x, item.s.y, box.w, box.h, item.s.marker, blocks, neighbors, markers, mode, true);
      if (!placed) {
        next.push(item);
        return;
      }
      placed.lines = box.lines;
      cityClaims.push({ x: placed.lx, y: placed.ly, w: box.w, h: box.h, id: item.s.r.id });
      if (placed.route) leaderRoutes.push(placed.route);
      found.push({ ...item, w: box.w, h: box.h, sized, placed });
    });
    return { found, next };
  };
  let legendFrame = null;
  const placeLegend = (list, sized) => {
    if (!list.length) return [];
    ctx.font = `${sized}px 'Press Start 2P', 'Courier New', monospace`;
    const rowH = Math.ceil(sized + 3);
    const rows = list.map((item, index) => {
      const text = `${index + 1} ${item.s.r.short}`;
      return { item, text, w: Math.ceil(ctx.measureText(text).width) + 4, h: rowH, n: String(index + 1) };
    });
    const panelW = Math.max(...rows.map((row) => row.w));
    const gap = 2;
    const panelH = rows.reduce((sum, row) => sum + row.h + gap, 2);
    const view = cityLabelView();
    const corners = [
      [view.x1 - panelW, view.y0],
      [view.x0, view.y0],
      [view.x1 - panelW, view.y1 - panelH],
      [view.x0, view.y1 - panelH],
    ];
    const cornerClear = (x, y) => {
      let ly = y;
      return rows.every((row) => {
        const ok = ly + row.h <= view.y1 + 0.5
          && !claimHits(cityClaims, x, ly, panelW, row.h, 1)
          && !claimHits(labelClaims, x, ly, panelW, row.h, 1)
          && !claimHits(markerClaims, x, ly, panelW, row.h, 1)
          && !claimHits(chipClaims, x, ly, panelW, row.h, 1)
          && !boxHitsLeader(x, ly, panelW, row.h);
        ly += row.h + gap;
        return ok;
      });
    };
    const open = corners
      .filter(([x, y]) => x >= view.x0 && y >= view.y0 && cornerClear(x, y))
      .map(([x, y]) => {
        let near = Infinity;
        markerClaims.forEach((mark) => {
          near = Math.min(near, Math.hypot(x + panelW / 2 - (mark.x + mark.w / 2), y + panelH / 2 - (mark.y + mark.h / 2)));
        });
        return { x, y, near };
      })
      .sort((a, b) => b.near - a.near);
    const origin = open[0] ? [open[0].x, open[0].y] : null;
    if (!origin) return [];
    const found = [];
    let ly = origin[1];
    rows.forEach((row) => {
      const keyW = Math.ceil(ctx.measureText(row.n).width) + 4;
      const keyH = row.h;
      const key = pickCityLabel(row.item.s.x, row.item.s.y, keyW, keyH, row.item.s.marker, blocksFor(row.item.s.r.id), neighborsOf(row.item.s.r.id), markersFor(row.item.s.r.id), "tight", true);
      if (key) {
        key.text = row.n;
        cityClaims.push({ x: key.lx, y: key.ly, w: keyW, h: keyH, id: `${row.item.s.r.id}-key` });
        if (key.route) leaderRoutes.push(key.route);
        found.push({ ...row.item, w: keyW, h: keyH, sized, placed: key });
      }
      const placed = { lx: origin[0], ly, leader: false, text: row.text, lines: null };
      cityClaims.push({ x: placed.lx, y: placed.ly, w: row.w, h: row.h, id: `${row.item.s.r.id}-legend` });
      found.push({ ...row.item, w: row.w, h: row.h, sized, placed });
      ly += row.h + gap;
    });
    legendFrame = { x: origin[0] - 3, y: origin[1] - 3, w: panelW + 6, h: ly - origin[1] + 3 };
    return found;
  };
  ctx.save();
  ctx.textBaseline = "top";
  const sizes = cityLabelSizes(fontPx, z, mapCssScale());
  let pending = ranked;
  let found = [];
  sizes.forEach((sized) => {
    if (!pending.length) return;
    const pass = placeList(pending, sized, "tight", false);
    found = found.concat(pass.found);
    pending = pass.next;
  });
  if (pending.length) {
    const sized = sizes[sizes.length - 1];
    const stacked = placeList(pending, sized, "tight", true);
    found = found.concat(stacked.found);
    pending = stacked.next;
    const spread = placeList(pending, sized, "own", false);
    found = found.concat(spread.found);
    pending = spread.next;
    const led = placeList(pending, sized, "led", false);
    found = found.concat(led.found);
    pending = led.next;
    const spreadStack = placeList(pending, sized, "own", true);
    found = found.concat(spreadStack.found);
    pending = spreadStack.next;
    const ledStack = placeList(pending, sized, "led", true);
    found = found.concat(ledStack.found);
    pending = ledStack.next;
  }
  if (pending.length) found = found.concat(placeLegend(pending, sizes[sizes.length - 1]));
  if (legendFrame) {
    ctx.fillStyle = "#14100c";
    ctx.fillRect(legendFrame.x, legendFrame.y, legendFrame.w, legendFrame.h);
    ctx.strokeStyle = "#f4efe4";
    ctx.lineWidth = Math.max(0.6, 1.2 / z);
    ctx.strokeRect(legendFrame.x, legendFrame.y, legendFrame.w, legendFrame.h);
  }
  found.forEach(({ s, w, h, sized, placed }) => {
    ctx.font = `${sized}px 'Press Start 2P', 'Courier New', monospace`;
    paintCityName(ctx, s.r, placed.lx, placed.ly, w, h, s.r.id === hereId, s.r.id === selectedRegion, placed, s.x, s.y, s.marker, sized);
  });
  ctx.restore();
}

function drawMap() {
  if (!state) return;
  labelClaims = [];
  cityClaims = [];
  leaderRoutes = [];
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
  const layer = mapLayers();
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
  const liftSea = mapView.z < 0.7 || mapView.focus === "cuba" || mapView.focus === "bering" || mapView.focus === "korea";
  ctx.drawImage(liftSea ? theaterLandPlate() : drawMap.off, 0, 0);
  if (mapView.focus) {
    drawWorldCorridors(ctx);
    drawWorldDesks(ctx);
  }
  ctx.imageSmoothingEnabled = false;
  if (layer.clearRoads) {
    drawClearRoads(ctx, painted);
    drawCleanStallFront(ctx);
    drawCleanInvasionAxes(ctx);
  } else {
    mapRoads(painted).forEach((rd) => {
      const pulse = mapFx?.kind === "travel" && sameRoad(rd.a, rd.b, mapFx.a, mapFx.b);
      const on = pulse && Math.floor((performance.now() - mapFx.t0) / 420) % 2 === 0;
      drawPixelRoadFull(ctx, rd.a, rd.b, on);
    });
    drawCampaignRoads(ctx);
    drawStallFront(ctx);
  }
  if (layer.extras) {
    drawInvasionAxes(ctx);
    drawNukeScars(ctx);
  }
  if (mapFx?.kind === "travel" && mapFx.a && mapFx.b) {
    const now = performance.now();
    const dur = mapFx.duration || 2400;
    let t = (now - mapFx.t0) / dur;
    t = mapFx.loop ? ((t % 1) + 1) % 1 : Math.min(1, Math.max(0, t));
    drawTravelConvoy(ctx, mapFx.a, mapFx.b, t, now, 2);
  }
  if (layer.props) {
    painted.forEach((r) => drawCityMarkHi(ctx, r, r.id === selectedRegion));
    drawStateLabels(ctx);
    painted.forEach((r) => drawCityPlate(ctx, r, r.id === selectedRegion));
  } else {
    drawStateLabels(ctx);
    painted.forEach((r) => drawCityMarkClean(ctx, r, r.id === selectedRegion));
    drawCleanCityLabels(ctx, painted);
  }
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
  if (u.type === "ifv") return "113";
  if (u.type === "technical") return "TRK";
  if (u.type === "regular") return "REG";
  if (u.type === "militia") return "MIL";
  return (u.label || "UNT").slice(0, 3).toUpperCase();
}

function paintSiegeLog(lines) {
  const log = $("siege-log");
  if (!log) return;
  const list = lines || [];
  const sig = `${list.length}:${list[list.length - 1] || ""}`;
  if (log.dataset.sig === sig) return;
  log.dataset.sig = sig;
  log.innerHTML = list.map((l) => `<li>${esc(l)}</li>`).join("");
  const chip = $("siege-last");
  if (chip) chip.textContent = list.length ? list[list.length - 1] : "";
}

function pulseSiegeMeter(id, value) {
  const el = $(id);
  if (!el) return;
  const next = String(value);
  if (el.dataset.v != null && el.dataset.v !== next) {
    el.classList.remove("tick");
    void el.offsetWidth;
    el.classList.add("tick");
  }
  el.dataset.v = next;
}

const DESK_VARS = ["--desk-bg", "--desk-panel", "--desk-edge", "--desk-strip", "--desk-ink", "--desk-read", "--desk-backdrop"];

function clearDeskPaint(el) {
  if (!el) return;
  delete el.dataset.desk;
  DESK_VARS.forEach((name) => el.style.removeProperty(name));
}

function paintDeskHost(el, id) {
  if (!el) return;
  const look = inlandLook(id);
  if (!look) {
    clearDeskPaint(el);
    return;
  }
  el.dataset.desk = id;
  el.style.setProperty("--desk-bg", look.bg);
  el.style.setProperty("--desk-panel", look.panel);
  el.style.setProperty("--desk-edge", look.edge);
  el.style.setProperty("--desk-strip", look.stripBg);
  el.style.setProperty("--desk-ink", look.ink);
  el.style.setProperty("--desk-read", look.readInk);
  el.style.setProperty("--desk-backdrop", look.backdrop);
}

function demoCourtNode() {
  const params = demoQuery();
  const demo = params.get("demo");
  if (demo === "battle" || demo === "duel" || demo === "siege" || demo === "fight" || demo === "missions") return null;
  const courtish =
    demo === "officers" ||
    demo === "roster" ||
    demo === "ladder" ||
    demo === "court" ||
    params.get("panel") === "officers";
  if (!courtish) return null;
  const node = params.get("node");
  return inlandLook(node) ? node : null;
}

function activeCourtDesk() {
  const fromDemo = demoCourtNode();
  if (fromDemo) return fromDemo;
  if (inlandLook(courtView.deskId)) return courtView.deskId;
  return null;
}

function syncCourtDesk() {
  const id = activeCourtDesk();
  if (id) stampCourtDesk(courtView, id);
  return inlandLook(courtView.deskId) ? courtView.deskId : null;
}

function paintCourtDesk() {
  const id = syncCourtDesk();
  paintDeskHost($("court-strip"), id);
  const card = $("modal-card");
  if (card && card.classList.contains("officers-card")) paintDeskHost(card, id);
}

function hideFieldDesk() {
  const strip = $("field-desk");
  if (strip) strip.hidden = true;
  const next = $("field-next");
  if (next) next.hidden = true;
}

function clearSiegeDesk() {
  const battleEl = $("battle");
  if (!battleEl) return;
  delete battleEl.dataset.desk;
  DESK_VARS.forEach((name) => battleEl.style.removeProperty(name));
  const strip = $("siege-desk");
  if (strip) strip.hidden = true;
  hideFieldDesk();
}

function demoFieldNode() {
  const params = demoQuery();
  if (params.get("demo") !== "battle") return null;
  if (params.get("siege") === "1") return null;
  const node = params.get("node");
  return inlandLook(node) ? node : null;
}

function activeFieldDesk(b) {
  const fromDemo = demoFieldNode();
  if (fromDemo) return fromDemo;
  if (inlandLook(b?.deskId)) return b.deskId;
  if (inlandLook(b?.toId)) return b.toId;
  return null;
}

function syncFieldDesk(b) {
  const id = activeFieldDesk(b);
  if (b && id) stampBattleDesk(b, id);
  return id;
}

function fieldNextLine(id) {
  const desk = inlandDesk(id);
  const look = inlandLook(id);
  if (!desk || !look) return "";
  return `NEXT: ${desk.line}. ${look.read}. Yellow unit, then an adjacent diamond.`;
}

function demoFightNode() {
  const params = demoQuery();
  if (params.get("demo") !== "fight") return null;
  const node = params.get("node");
  return inlandLook(node) ? node : null;
}

function activeFightDesk(b) {
  const fromDemo = demoFightNode();
  if (fromDemo) return fromDemo;
  if (b?.liberation && inlandLook(b.deskId)) return b.deskId;
  return null;
}

function syncFightDesk(b) {
  const id = activeFightDesk(b);
  if (b && id) {
    stampBattleDesk(b, id);
    b.liberation = true;
  }
  return id;
}

function fightNextLine(id) {
  const desk = inlandDesk(id);
  const look = inlandLook(id);
  if (!desk || !look) return "";
  return `NEXT: ${desk.line}. ${look.read}. Liberation fight. Yellow unit, then an adjacent diamond.`;
}

function paintFightDesk(id) {
  const battleEl = $("battle");
  if (!battleEl) return;
  const look = inlandLook(id);
  const desk = inlandDesk(id);
  if (!look || !desk) return;
  paintDeskHost(battleEl, id);
  $("battle-title").textContent = `Fight — ${look.strip}`;
  const strip = $("field-desk");
  if (strip) {
    strip.hidden = false;
    const name = $("field-desk-name");
    const read = $("field-desk-read");
    if (name) name.textContent = look.strip;
    if (read) read.textContent = look.read;
  }
  const next = $("field-next");
  if (next) {
    next.hidden = false;
    next.textContent = fightNextLine(id);
  }
}

function demoMissionNode() {
  const params = demoQuery();
  if (params.get("demo") !== "missions") return null;
  const node = params.get("node");
  return inlandLook(node) ? node : null;
}

function activeMissionDesk() {
  const fromDemo = demoMissionNode();
  if (fromDemo) return fromDemo;
  if (inlandLook(missionView.deskId)) return missionView.deskId;
  return null;
}

function syncMissionDesk() {
  const id = activeMissionDesk();
  if (id) stampMissionDesk(missionView, id);
  return inlandLook(missionView.deskId) ? missionView.deskId : null;
}

function paintMissionDesk() {
  const id = syncMissionDesk();
  const card = $("modal-card");
  if (card && card.classList.contains("missions-card")) paintDeskHost(card, id);
}

function paintEventDesk(id) {
  const card = $("event-scene")?.querySelector(".event-card");
  const strip = $("event-desk");
  const look = inlandLook(id);
  const desk = inlandDesk(id);
  if (!card || !look || !desk) {
    clearDeskPaint(card);
    if (strip) strip.hidden = true;
    return;
  }
  paintDeskHost(card, id);
  if (strip) {
    strip.hidden = false;
    const name = $("event-desk-name");
    const read = $("event-desk-read");
    if (name) name.textContent = look.strip;
    if (read) read.textContent = look.read;
  }
  const title = $("event-title");
  if (title && !title.textContent.includes(look.strip)) title.textContent = `${title.textContent} — ${look.strip}`;
  const next = $("event-next");
  if (next && state) {
    const prefix = `${desk.line}. ${look.read}. `;
    let base = (next.textContent || nextHint(state)).replace(/^NEXT:\s*/, "");
    if (base.startsWith(prefix)) base = base.slice(prefix.length);
    next.textContent = `NEXT: ${prefix}${base}`;
  }
}

function paintFieldDesk(id) {
  const battleEl = $("battle");
  if (!battleEl) return;
  const look = inlandLook(id);
  const desk = inlandDesk(id);
  if (!look || !desk) {
    clearSiegeDesk();
    return;
  }
  battleEl.dataset.desk = id;
  battleEl.style.setProperty("--desk-bg", look.bg);
  battleEl.style.setProperty("--desk-panel", look.panel);
  battleEl.style.setProperty("--desk-edge", look.edge);
  battleEl.style.setProperty("--desk-strip", look.stripBg);
  battleEl.style.setProperty("--desk-ink", look.ink);
  battleEl.style.setProperty("--desk-read", look.readInk);
  battleEl.style.setProperty("--desk-backdrop", look.backdrop);
  $("battle-title").textContent = `Field — ${look.strip}`;
  const strip = $("field-desk");
  if (strip) {
    strip.hidden = false;
    const name = $("field-desk-name");
    const read = $("field-desk-read");
    if (name) name.textContent = look.strip;
    if (read) read.textContent = look.read;
  }
  const next = $("field-next");
  if (next) {
    next.hidden = false;
    next.textContent = fieldNextLine(id);
  }
}

function paintSiegeDesk(id) {
  const battleEl = $("battle");
  if (!battleEl) return;
  const look = inlandLook(id);
  if (!look) {
    if (battleEl.dataset.desk) clearSiegeDesk();
    return;
  }
  if (battleEl.dataset.desk === id) return;
  battleEl.dataset.desk = id;
  battleEl.style.setProperty("--desk-bg", look.bg);
  battleEl.style.setProperty("--desk-panel", look.panel);
  battleEl.style.setProperty("--desk-edge", look.edge);
  battleEl.style.setProperty("--desk-strip", look.stripBg);
  battleEl.style.setProperty("--desk-ink", look.ink);
  battleEl.style.setProperty("--desk-read", look.readInk);
  battleEl.style.setProperty("--desk-backdrop", look.backdrop);
  const strip = $("siege-desk");
  if (!strip) return;
  strip.hidden = false;
  const name = $("siege-desk-name");
  const read = $("siege-desk-read");
  if (name) name.textContent = look.strip;
  if (read) read.textContent = look.read;
}

function paintSiegeHud(b, dest) {
  const s = b.siege;
  const rec = siegeRecommend(s);
  const look = inlandLook(b.toId);
  const deskLine = inlandDesk(b.toId)?.line || "";
  paintSiegeDesk(b.toId);
  $("battle-title").textContent = look ? `Siege — ${look.strip}` : `Siege — ${dest?.name || s.place}`;
  $("battle-meta").textContent = `YOU attacker · THEY defender · WATCH ${s.impulse}/${s.maxImpulses}`;
  $("siege-roles").textContent = deskLine
    ? `YOU are the ATTACKER on the ${deskLine}. THEY are the DEFENDER — garrison ${s.garrison}.`
    : `YOU are the ATTACKER. THEY are the DEFENDER — ${dest?.short || s.place} garrison ${s.garrison}.`;
  $("siege-works-n").textContent = String(s.works);
  $("siege-suppress-n").textContent = String(s.suppress);
  $("siege-levy-n").textContent = String(s.levy);
  pulseSiegeMeter("siege-works-n", s.works);
  pulseSiegeMeter("siege-suppress-n", s.suppress);
  pulseSiegeMeter("siege-levy-n", s.levy);
  $("siege-works-bar").style.width = `${Math.round((s.works / Math.max(1, s.worksMax)) * 100)}%`;
  $("siege-suppress-bar").style.width = `${Math.max(0, Math.min(100, s.suppress))}%`;
  $("siege-levy-bar").style.width = `${Math.round((s.levy / Math.max(1, s.levyMax)) * 100)}%`;
  $("siege-next").textContent = siegeCoach(s);
  paintSiegeLog(s.log);
  [
    ["siege-cut", "cut"],
    ["siege-rake", "rake"],
    ["siege-rush", "rush"],
  ].forEach(([id, kind]) => {
    const btn = $(id);
    if (!btn) return;
    const pressed = kind === rec && !s.closed;
    btn.classList.toggle("is-next", pressed);
    btn.classList.toggle("is-wait", !s.closed && kind !== rec);
    btn.classList.toggle("is-fired", $("siege-board")?.dataset.fired === kind && !s.closed);
    btn.disabled = !!s.closed;
    const mark = btn.querySelector(".ploy-mark");
    if (mark) {
      if (s.closed) mark.textContent = "CLOSED";
      else if (pressed) mark.textContent = "PRESS";
      else if (kind === "rush") mark.textContent = "WAIT";
      else mark.textContent = "LATER";
    }
  });
}

function drawBattle(now = performance.now()) {
  const b = state.battle;
  if (!b) return;
  const dest = regionOf(state, b.toId) || b.deskRegion || { name: b.toId, short: b.toId };
  const arctic = isArcticRegion(dest);
  const siegeOn = !!(b.siege && !b.siege.closed);
  $("battle").classList.toggle("is-siege", siegeOn);
  if (siegeOn) {
    hideFieldDesk();
    paintSiegeHud(b, dest);
    return;
  }
  const fightId = syncFightDesk(b);
  if (fightId) paintFightDesk(fightId);
  else {
    const deskId = syncFieldDesk(b);
    if (deskId) paintFieldDesk(deskId);
    else {
      clearSiegeDesk();
      $("battle-title").textContent = `Field — ${dest.name}`;
    }
  }
  const lead = b.commanderName ? ` · led by ${b.commanderRank ? ladderLabel(b.commanderRank) + " " : ""}${b.commanderName}` : "";
  $("battle-meta").textContent = `${b.weather} · impulse ${b.round}/${b.maxRounds} · morale A ${b.morale.atk} / D ${b.morale.def} · ${b.turn === "atk" ? "your impulse" : "enemy impulse"}${lead}`;
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
  if (res.ok && cmd === "siege" && extra?.kind && $("siege-board")) {
    $("siege-board").dataset.fired = extra.kind;
  }
  if (!res.ok) toast(res.message);
  if (state.phase !== "battle") {
    $("battle").hidden = true;
    $("battle").classList.remove("is-siege");
    clearSiegeDesk();
    stopBattleLoop();
    selectedRegion = playerOf(state).region;
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
  $("duel-clock").classList.toggle("low", left > 0 && left <= 20 && !d.result);
  if (d.beat !== "pick") {
    $("duel-meter")?.classList.remove("in-green");
    $("duel-next")?.classList.remove("hot");
  }
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
    const clamped = Math.min(1, Math.max(0, t));
    $("duel-needle").style.left = `${clamped * 100}%`;
    const hot = clamped >= d.green[0] && clamped <= d.green[1];
    $("duel-meter")?.classList.toggle("in-green", hot);
    $("duel-next")?.classList.toggle("hot", hot);
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
    clearDuelDesk();
    stopDuelLoop();
    render();
    return;
  }
  const res = duelCmd(state, "close");
  $("duel").hidden = true;
  clearDuelDesk();
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

function styleInk(style) {
  const map = {
    brawler: "#f03030",
    marksman: "#f8d800",
    grappler: "#c8a038",
    cavalry: "#886038",
    guerrilla: "#88a040",
    drill: "#f8f8f8",
    trapper: "#80d0f8",
    signals: "#80c0f8",
  };
  return map[style?.id] || style?.fx || "#f8d800";
}

function paintStyleStripe(id, style) {
  const el = $(id);
  if (!el) return;
  el.style.background = styleInk(style);
}

function demoDuelNode() {
  const params = demoQuery();
  if (params.get("demo") !== "duel") return null;
  const node = params.get("node");
  return inlandLook(node) ? node : null;
}

function activeDuelDesk(d) {
  if (inlandLook(d?.deskId)) return d.deskId;
  return demoDuelNode();
}

function syncDuelDesk(d) {
  const id = activeDuelDesk(d);
  if (d && id) stampDuelDesk(d, id);
  return id;
}

function duelDeskPrefix(d) {
  const id = syncDuelDesk(d);
  const desk = inlandDesk(id);
  const look = inlandLook(id);
  if (!desk || !look) return "";
  return `${desk.line}. ${look.read}. `;
}

function duelNextLine(d) {
  const spec = d.you.style?.specialLabel || "Special";
  const where = duelDeskPrefix(d);
  if (d.result === "you") return `NEXT: ${where}You hold the yard. Back to map.`;
  if (d.result === "foe") return `NEXT: ${where}They hold the yard. Back to map.`;
  if (d.result) return `NEXT: ${where}Draw. Back to map.`;
  if (d.beat === "resolve" && d.last) {
    const you = d.last.youDmg ? `You -${d.last.youDmg}` : d.last.youHeal ? `You +${d.last.youHeal}` : "You clean";
    const foe = d.last.foeDmg ? `Foe -${d.last.foeDmg}` : d.last.foeHeal ? `Foe +${d.last.foeHeal}` : "Foe clean";
    return `HIT: ${where}${you} · ${foe}.${d.last.timed ? " Green window." : ""}`;
  }
  if (d.underdog) return `NEXT: ${where}Wider green. Press 1 Strike, 2 Guard, or 3 Special · ${spec} inside the band.`;
  return `NEXT: ${where}Needle in the green, then 1 Strike, 2 Guard, or 3 Special · ${spec}.`;
}

function paintDuelHit(id, dmg, heal, show) {
  const el = $(id);
  if (!el) return;
  const text = show && dmg ? `-${dmg}` : show && heal ? `+${heal}` : "";
  el.hidden = !text;
  el.textContent = text;
  el.classList.toggle("heal", !!(show && heal && !dmg));
}

function paintDuelStatic() {
  const d = state.duel;
  const you = d.you;
  const foe = d.foe;
  $("duel-you-face").src = PORTRAIT_SRC;
  $("duel-you-name").textContent = you.name;
  $("duel-you-style").textContent = `${you.style?.label || "Style"} · ${you.outfit?.label || "kit"}`;
  $("duel-you-style").style.borderLeftColor = styleInk(you.style);
  paintStyleStripe("duel-you-stripe", you.style);
  $("duel-you-meta").textContent = `AGE ${you.age} · ${you.title} · WAR ${you.stats.war}`;
  $("duel-you-stats").textContent = you.wound ? "WOUND — WAR cut" : `INT ${you.stats.int}  POL ${you.stats.pol}  CHR ${you.stats.chr}`;
  $("duel-foe-face").textContent = foe.portrait || portraitInitials(foe.name);
  $("duel-foe-name").textContent = foe.name;
  $("duel-foe-style").textContent = `${foe.style?.label || "Style"} · ${foe.outfit?.label || "kit"}`;
  $("duel-foe-style").style.borderLeftColor = styleInk(foe.style);
  paintStyleStripe("duel-foe-stripe", foe.style);
  $("duel-foe-meta").textContent = `AGE ${foe.age} · ${foe.title}${foe.legend ? " · LEGEND" : ""} · WAR ${foe.stats.war}`;
  $("duel-foe-stats").textContent = foe.wound ? "WOUND — WAR cut" : `INT ${foe.stats.int}  POL ${foe.stats.pol}  CHR ${foe.stats.chr}`;
  const deskId = syncDuelDesk(d);
  const look = inlandLook(deskId);
  if ($("duel-arena")) $("duel-arena").textContent = look?.strip || d.arena?.label || "Yard";
  paintDuelDesk(deskId);
}

function clearDuelDesk() {
  const el = $("duel");
  if (!el) return;
  delete el.dataset.desk;
  DESK_VARS.forEach((name) => el.style.removeProperty(name));
  const strip = $("duel-desk");
  if (strip) strip.hidden = true;
}

function paintDuelDesk(id) {
  const el = $("duel");
  if (!el) return;
  const look = inlandLook(id);
  if (!look) {
    if (el.dataset.desk) clearDuelDesk();
    return;
  }
  el.dataset.desk = id;
  el.style.setProperty("--desk-bg", look.bg);
  el.style.setProperty("--desk-panel", look.panel);
  el.style.setProperty("--desk-edge", look.edge);
  el.style.setProperty("--desk-strip", look.stripBg);
  el.style.setProperty("--desk-ink", look.ink);
  el.style.setProperty("--desk-read", look.readInk);
  el.style.setProperty("--desk-backdrop", look.backdrop);
  const strip = $("duel-desk");
  if (!strip) return;
  strip.hidden = false;
  const name = $("duel-desk-name");
  const read = $("duel-desk-read");
  if (name) name.textContent = look.strip;
  if (read) read.textContent = look.read;
}

function paintDuelHp() {
  const d = state.duel;
  if (!d) return;
  $("duel-you-hp").style.width = `${Math.round((d.youHp / d.youMax) * 100)}%`;
  $("duel-foe-hp").style.width = `${Math.round((d.foeHp / d.foeMax) * 100)}%`;
  const show = d.beat === "resolve" && d.last;
  $("duel-you-hp-n").textContent = `${d.youHp} / ${d.youMax}`;
  $("duel-foe-hp-n").textContent = `${d.foeHp} / ${d.foeMax}`;
  $("duel-you-hp-n").classList.toggle("hurt", !!(show && d.last.youDmg > 0));
  $("duel-foe-hp-n").classList.toggle("hurt", !!(show && d.last.foeDmg > 0));
  $("duel-you")?.classList.toggle("struck", !!(show && d.last.youDmg > 0));
  $("duel-foe")?.classList.toggle("struck", !!(show && d.last.foeDmg > 0));
  paintDuelHit("duel-you-hit", d.last?.youDmg, d.last?.youHeal, show);
  paintDuelHit("duel-foe-hit", d.last?.foeDmg, d.last?.foeHeal, show);
}

function paintDuelHud() {
  const d = state.duel;
  if (!d) return;
  $("duel-exchange").textContent = `EX ${Math.min(d.exchange, d.maxExchanges)} / ${d.maxExchanges}`;
  const specName = d.you.style?.specialLabel || "Special";
  $("duel-cue").textContent = d.result
    ? d.log[d.log.length - 1]
    : d.you?.wound
      ? `Wound cuts WAR. Strike beats Special · Special beats Guard · Guard beats Strike.`
      : "Strike beats Special · Special beats Guard · Guard beats Strike.";
  const next = $("duel-next");
  if (next) {
    next.textContent = duelNextLine(d);
    if (d.beat !== "pick") next.classList.remove("hot");
  }
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
  const deskId = syncDuelDesk(state.duel);
  if (!paintInlandDuelYard(ctx, w, h, deskId)) {
    paintDuelArena(ctx, w, h, state.duel.arena?.id || "porch", now);
  }
  const bob = Math.floor(now / 280) % 2;
  const flash = state.duel.last && state.duel.beat === "resolve";
  const youHit = flash && state.duel.last.youDmg > 0;
  const foeHit = flash && state.duel.last.foeDmg > 0;
  const youY = 78 + bob;
  const foeY = 78 + (1 - bob);
  drawDuelFighter(ctx, 150, youY, state.duel.you.outfit, false, youHit, state.duel.last?.youMove);
  drawDuelFighter(ctx, 430, foeY, state.duel.foe.outfit, true, foeHit, state.duel.last?.foeMove);
  paintStyleBar(ctx, 150, youY, styleInk(state.duel.you.style));
  paintStyleBar(ctx, 430, foeY, styleInk(state.duel.foe.style));
  if (flash && state.duel.last) {
    paintDuelDamage(ctx, 150, youY, state.duel.last.youDmg, state.duel.last.youHeal);
    paintDuelDamage(ctx, 430, foeY, state.duel.last.foeDmg, state.duel.last.foeHeal);
  }
  if (flash) {
    const fx = state.duel.last.youFx || state.duel.last.foeFx || "#f8f8f8";
    ctx.fillStyle = fx;
    ctx.globalAlpha = 0.28;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }
  if (deskId) paintDuelDeskPlate(ctx, w, deskId);
}

function paintStyleBar(ctx, x, y, color) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(x - 4, y + 64, 36, 8);
  ctx.fillStyle = color;
  ctx.fillRect(x - 2, y + 66, 32, 4);
}

function paintDuelDamage(ctx, x, y, dmg, heal) {
  const text = dmg ? `-${dmg}` : heal ? `+${heal}` : "";
  if (!text) return;
  ctx.font = "bold 18px monospace";
  ctx.textAlign = "center";
  const w = ctx.measureText(text).width + 12;
  ctx.fillStyle = "#000000";
  ctx.fillRect(x + 12 - w / 2, y - 28, w, 20);
  ctx.fillStyle = dmg ? "#f03030" : "#30c030";
  ctx.fillText(text, x + 12, y - 12);
}

function px(ctx, x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

function paintDuelDeskPlate(ctx, w, id) {
  const look = inlandLook(id);
  const desk = inlandDesk(id);
  if (!look || !desk) return;
  px(ctx, 0, 0, w, 42, look.stripBg);
  px(ctx, 0, 0, w, 4, look.edge);
  ctx.font = "bold 18px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = look.ink;
  ctx.fillText(look.strip, 16, 6);
  ctx.font = "13px monospace";
  ctx.fillStyle = look.readInk;
  ctx.fillText(look.read, 16, 26);
}

function paintInlandDuelYard(ctx, w, h, id) {
  const look = inlandLook(id);
  if (!look) return false;
  px(ctx, 0, 0, w, h, look.bg);
  if (id === "kamchatka") {
    px(ctx, 0, 0, w, h, "#07141c");
    px(ctx, 0, 56, w, 16, "#145068");
    px(ctx, 0, 78, w, h, "#0a3044");
    px(ctx, 0, 78, w, 6, "#8fd4ea");
    for (const x of [36, 140, 280, 420, 540]) px(ctx, x, 96, 36, 8, "#8fd4ea");
  } else if (id === "siberia") {
    px(ctx, 0, 48, w, h, "#142010");
    for (const x of [24, 80, 500, 560]) {
      px(ctx, x, 36, 10, 80, "#5a3a18");
      px(ctx, x - 16, 18, 42, 28, "#243818");
      px(ctx, x - 8, 6, 26, 16, "#7cb342");
    }
    px(ctx, 0, 124, w, 14, "#5a3a18");
  } else if (id === "havana") {
    px(ctx, 0, 0, w, 70, "#06303c");
    px(ctx, 0, 28, w, 12, "#26c6b0");
    px(ctx, 0, 48, w, 8, "#8ee0d4");
    px(ctx, 0, 70, w, 16, "#6a3018");
    px(ctx, 0, 86, w, h, "#c4a574");
    px(ctx, 220, 40, 90, 30, "#d8c0a0");
  } else if (id === "managua") {
    px(ctx, 0, 36, w, h, "#c47830");
    px(ctx, 20, 78, 36, 32, "#f0b429");
    px(ctx, 64, 90, 24, 20, "#6a4018");
    px(ctx, 500, 70, 48, 36, "#f0b429");
    px(ctx, 0, 118, w, 18, "#4a3010");
  } else if (id === "sponsor_lane") {
    px(ctx, 0, 40, w, h, "#1c220e");
    px(ctx, 48, 48, 48, 34, "#3a4018");
    px(ctx, 56, 56, 32, 10, "#e6ee55");
    px(ctx, 160, 40, 52, 40, "#2a3010");
    px(ctx, 168, 50, 36, 10, "#f7f7b0");
    px(ctx, 480, 36, 60, 46, "#3a4018");
    px(ctx, 220, 70, 120, 10, "#e6ee55");
    px(ctx, 0, 108, w, 8, "#e6ee55");
  } else if (id === "kr_inland") {
    px(ctx, 0, 0, w, 80, "#1a1428");
    px(ctx, 0, 46, 220, 50, "#3a2858");
    px(ctx, 160, 24, 260, 72, "#2c2040");
    px(ctx, 360, 14, 220, 80, "#3a2858");
    px(ctx, 0, 96, w, h, "#120e18");
    px(ctx, 0, 96, w, 6, "#c9a0e8");
  } else {
    px(ctx, 0, 40, w, h, look.panel);
  }
  px(ctx, 0, 0, 10, h, look.edge);
  px(ctx, w - 10, 0, 10, h, look.edge);
  return true;
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
      if (ladderRoster(state).player.some((o) => o.region === playerOf(state).region)) {
        openRoster();
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
      const deskId = syncMissionDesk();
      hideModal();
      run("mission", { jobId, deskId: deskId || undefined });
    };
  });
}

function refreshCreator() {
  const name = document.getElementById("c-name")?.value;
  const faceId = document.getElementById("c-face")?.value || "F0";
  const img = document.getElementById("c-portrait-img");
  if (img) img.src = faceSrc(faceId);
  const faceName = document.getElementById("c-face-name");
  if (faceName) faceName.textContent = `Face: ${faceLabel(faceId) || "Original face"}`;
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
        ladder: "player",
      });
      if (res.ok) {
        ladderNotice = `${name} joins as a Player. Promote them on this ladder.`;
        ladderKind = "friend";
        ladderFlashId = res.id;
      }
      toast(res.ok ? `${name} joins as a player. Promote them on the ladder.` : res.message);
      showModal(officersHtml(), { kind: "officers" });
      wireDynamicModals();
      render();
    };
  }
  document.querySelectorAll("[data-promote]").forEach((btn) => {
    btn.onclick = () => {
      const res = act(state, content, "promote", { officerId: btn.dataset.promote });
      if (res.ok && res.rankChanged) {
        ladderNotice = res.message;
        ladderKind = "rank";
        ladderFlashId = btn.dataset.promote;
        flashDing(`${ladderLabel(res.from)} → ${ladderLabel(res.to)}`);
      } else {
        toast(res.message);
      }
      openRoster();
      render();
    };
  });
  document.querySelectorAll("[data-open-roster]").forEach((btn) => {
    btn.onclick = () => openRoster();
  });
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

