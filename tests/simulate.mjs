import { readFileSync } from "node:fs";
import { loadContent } from "../js/content.js";
import {
  createNewGame,
  act,
  autoplayWeek,
  serialize,
  deserialize,
  personalityHistogram,
  playerOf,
  regionOf,
  visibleOfficers,
  playerGenerals,
  listActions,
  createCustomOfficer,
  setGeneralOrder,
  legendStatus,
  mapRoads,
  sampleChronicle,
  courtCandidates,
  calendarYear,
  seasonOf,
  MAX_GENERALS,
  MISSION_TEMPLATES,
  openMissions,
  seedDemoMissions,
  appointCandidates,
  playerCourt,
  duelCmd,
  battleCmd,
  challengeCandidates,
  hireCandidates,
  ladderRankOf,
  ladderLabel,
  ladderRoster,
  promotedInCity,
  actingStats,
  weekTease,
  stateControl,
  tickCampaign,
  fireSponsor,
  travelUnlocked,
  isAdjacent,
  approachRoads,
  approachTrail,
  roadLabel,
  deskControl,
  geoOf,
  geoYield,
  geoTags,
  startInlandBattle,
} from "../js/engine.js";
import { CLOSE_ZOOM, LABEL_ANCHOR, LABEL_MIN_SCREEN, chordIsMisleading, cityLabelSizes, closeRoadWidth, insetMarkerCenter, letterboxCanvasPoint, letterboxContains, mapDetailFromSave, mapLayerVisibility, stampMapDetail } from "../js/map-detail.js";
import { createBattle, autoResolveBattle } from "../js/battle.js";
import { INLAND_IDS, inlandDesk, inlandLook, stampBattleDesk, stampCourtDesk, stampMissionDesk } from "../js/inland.js";
import {
  regionIsSiege,
  createSiege,
  applySiegePloy,
  siegeCoach,
  siegeRecommend,
  SIEGE_PLOYS,
  RUSH_WORKS_MAX,
} from "../js/siege.js";
import {
  createDuel,
  resolveExchange,
  autoResolveDuel,
  isUnderdog,
  beats,
  DUEL_CLOCK_S,
  DUEL_MAX_EXCHANGES,
  expectedDuelSeconds,
  greenWindow,
  inGreen,
  DUEL_STYLES,
  DUEL_ARENAS,
  DUEL_OUTFITS,
  pickStyle,
  pickArena,
  pickOutfit,
} from "../js/duel.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const content = await loadContent();
const techBlob = `${content.tech.meta?.notes || ""} ${content.tech.tracks.map((t) => `${t.name} ${t.summary}`).join(" ")}`;
assert(/1985/.test(techBlob) && /M16A2/.test(techBlob) && /Jeep/.test(techBlob) && /Huey/.test(techBlob), "tech copy must name 1985–89 kit");
assert(content.tech.tracks.every((t) => !/^(F-35|JLTV|MRAP|drone)/i.test(t.name)), "tech track names must not be 2020s kit");
assert(content.tech.tracks.reduce((s, t) => s + (t.battle?.atk || 0), 0) === 14, "1980s tracks keep the original salvage ATK cap");
const aiCount = content.officers.officers.length;
assert(aiCount >= 110 && aiCount <= 160, `AI roster should jump well past ~50 toward 500, got ${aiCount}`);
const officerIds = content.officers.officers.map((o) => o.id);
assert(new Set(officerIds).size === officerIds.length, "duplicate officer ids");
assert(content.officers.officers.every((o) => o.name && o.bio && o.personality && o.region), "every officer needs name/bio/personality/region");
const legends = content.officers.officers.filter((o) => o.legend).map((o) => o.id).sort();
assert(legends.join() === "karr,marsh,silo", `three original legends (Karr, Silo, Marsh), got ${legends}`);
assert(content.officers.officers.filter((o) => o.elite).length >= 3, "need a few elites (Brack, Lumen, Stave, legends)");
assert(content.factions.factions.length >= 36 && content.factions.factions.length <= 44, `Need ~40 original factions, got ${content.factions.factions.length}`);
const facIds = content.factions.factions.map((f) => f.id);
assert(new Set(facIds).size === facIds.length, "duplicate faction ids");
assert(
  content.factions.factions.every((f) => f.name && f.bio && f.plus?.length && f.minus?.length && f.personalityLean),
  "every faction needs name, bio, pluses/minuses, personality lean"
);
const sandboxIds = content.factions.factions.filter((f) => f.sandbox).map((f) => f.id).sort();
assert(sandboxIds.includes("yukon_relay") && sandboxIds.includes("klondike_watch") && sandboxIds.includes("bering_pact"), "Yukon/Bering factions must be sandbox");
assert(
  [
    "aurora",
    "banner",
    "bering_pact",
    "compact",
    "copper_road",
    "ember_campus",
    "idle_hour",
    "interior",
    "klondike_watch",
    "northern_front",
    "pacific_spine",
    "pale_airlift",
    "pof",
    "rail_brotherhood",
    "red_wharf",
    "timberline",
    "yukon_relay",
  ].join() === sandboxIds.join(),
  `sandbox set mismatch: ${sandboxIds}`
);
const officerFacs = new Set(content.officers.officers.map((o) => o.faction).filter(Boolean));
assert([...officerFacs].every((id) => sandboxIds.includes(id)), "officers may only serve sandbox factions");
const cities = content.regions.regions;
assert(cities.length >= 32 && cities.length <= 48, `Need Alaska + west + east-approach + foreign stubs, got ${cities.length}`);
const stateCodes = [...new Set(cities.map((r) => r.state))].sort();
assert(["AK", "CA", "CO", "ID", "KS", "MO", "MT", "NE", "NV", "OR", "UT", "WA", "WY", "YT"].every((s) => stateCodes.includes(s)), `missing states: ${stateCodes}`);
assert(cities.filter((r) => r.state === "CO").map((r) => r.id).sort().join() === "colorado_springs,denver,grand_junction", "Colorado city cluster");
assert(cities.every((r) => (r.unlockWeek || 0) === 0), "no week lock on the US theater");
assert(cities.find((r) => r.id === "juneau").neighbors.includes("seattle"), "Juneau ferry into Washington");
assert(cities.find((r) => r.id === "yukon_road").neighbors.includes("missoula"), "ALCAN into Montana");
assert(cities.find((r) => r.id === "denver").neighbors.includes("omaha"), "Colorado opens the plains east");
assert(cities.find((r) => r.id === "st_louis"), "east-approach St. Louis");
assert(content.regions.mainland?.length >= 80, "lower-48 coastline is a real US outline");
assert(content.regions.coast?.length >= 40, "Alaska spur is a real coastline");
assert(Array.isArray(content.regions.lakes) && content.regions.lakes.length >= 5, "Great Lakes cut the silhouette");
assert(Array.isArray(content.regions.stateLines) && content.regions.stateLines.length >= 48, "state outlines for the political map");
assert((content.regions.states || []).filter((s) => s.kind === "us").length === 13, "13 US states once California and Nevada are on the board");
assert(content.regions.campaign?.restoreThreshold === 8, "Phase 2 at 8 liberated US states");
assert(["far_russia", "far_cuba", "far_nicaragua", "far_korea"].every((id) => cities.some((r) => r.id === id)), "foreign theater stubs");
const fairbanks = content.regions.regions.find((r) => r.id === "fairbanks");
const nome = content.regions.regions.find((r) => r.id === "nome");
const yukon = content.regions.regions.find((r) => r.id === "yukon_road");
const klondike = content.regions.regions.find((r) => r.id === "klondike");
const bering = content.regions.regions.find((r) => r.id === "bering_strait");
assert(yukon && yukon.startOwner === "yukon_relay", "Yukon node for Whitehorse Relay");
assert(klondike && klondike.startOwner === "klondike_watch", "Klondike node for Watch");
assert(bering && bering.startOwner === "bering_pact", "Bering node for Ice Pact");
assert(fairbanks.neighbors.includes("yukon_road") && yukon.neighbors.includes("fairbanks"), "Yukon attached through Fairbanks");
assert(yukon.neighbors.includes("klondike") && klondike.neighbors.includes("yukon_road"), "Klondike behind the Relay");
assert(nome.neighbors.includes("bering_strait") && bering.neighbors.includes("nome"), "Bering attached through Nome");
assert(!fairbanks.neighbors.includes("klondike"), "Klondike must not skip the Yukon spur");
assert(content.regions.regions.find((r) => r.id === "arctic_slope").neighbors.includes("yukon_road"), "Slope shares an edge with Yukon and must be walkable");
assert(!content.regions.regions.find((r) => r.id === "bethel").neighbors.includes("yukon_road"), "Bethel must not neighbor Yukon");
assert(cities.every((r) => r.geo && typeof r.geo.farm === "number"), "every territory needs geo tags");
assert(cities.find((r) => r.id === "lincoln").geo.farm >= 3, "Lincoln is a farm belt");
assert(cities.find((r) => r.id === "arctic_slope").geo.fuel >= 3 && cities.find((r) => r.id === "arctic_slope").geo.weather >= 3, "Slope is fuel + harsh ice");
assert(cities.find((r) => r.id === "grand_junction").geo.farm >= 3, "Junction orchards");
assert(cities.find((r) => r.id === "klondike").geo.mine >= 3, "Klondike mining");
const jackson = cities.find((r) => r.id === "jackson");
const denver = cities.find((r) => r.id === "denver");
assert(jackson.neighbors.includes("denver") && denver.neighbors.includes("jackson"), "Rockies pass Jackson–Denver");
assert(cities.find((r) => r.id === "billings").neighbors.includes("omaha"), "plains alternate Billings–Omaha");
assert(cities.find((r) => r.id === "anchorage").neighbors.includes("yukon_road"), "interior cut-off Anchorage–Yukon");
assert((content.regions.alternateRoutes || []).length >= 6, "documented alternate routes");
content.regions.regions.forEach((r) => {
  r.neighbors.forEach((n) => {
    const o = content.regions.regions.find((x) => x.id === n);
    assert(o, `${r.id} lists missing neighbor ${n}`);
    assert(o.neighbors.includes(r.id), `one-way edge ${r.id}→${n}`);
  });
});
const roads = mapRoads(content.regions.regions);
const roadKeys = new Set(roads.map((rd) => [rd.from, rd.to].sort().join("|")));
let edgeCount = 0;
content.regions.regions.forEach((r) => {
  r.neighbors.forEach((n) => {
    if (r.id < n) {
      edgeCount += 1;
      assert(roadKeys.has(`${r.id}|${n}`), `travel ${r.id}–${n} has no drawn road`);
    }
  });
});
assert(roads.length === edgeCount, "every drawn road must be a travel edge");
assert(roads.every((rd) => rd.a && rd.b), "roads need city markers");

for (const diff of ["easy", "normal", "hard"]) {
  const state = createNewGame(content, { seed: 42 + diff.length, difficulty: diff, name: "Casey Flint", background: "scout" });
  assert(state.week === 0, "start week 0");
  assert(playerOf(state).region === "cheyenne", "start in Cheyenne");
  assert(!playerOf(state).faction, "start alone / no banner");
  assert(listActions(state).some((a) => a.id === "end_week" && a.enabled), "End Week always available");
  assert(state.factions.length === content.factions.factions.length, "unused factions still load into state");
  assert(state.factions.filter((f) => f.onMap).length === 17, "Alaska/Yukon/Bering plus eight western banners on-map");
  assert(state.regions.every((r) => !r.owner || state.factions.find((f) => f.id === r.owner && f.onMap)), "no off-map region owner");

  for (let i = 0; i < 12; i++) {
    const res = autoplayWeek(state, content);
    assert(res.ok, `week ${i} autoplay failed: ${res.message}`);
    assert(state.phase === "strategy", "soft-lock: stuck in battle");
    assert(state.ap > 0, "AP should refresh");
  }
  assert(state.week === 12, `expected week 12, got ${state.week}`);
  const hist = personalityHistogram(state);
  const keys = Object.keys(hist);
  assert(keys.length >= 4, `${diff}: expected multiple personality tags in AI log, got ${JSON.stringify(hist)}`);
  assert(visibleOfficers(state).length >= 8, "visible officers vanished");

  const raw = serialize(state);
  const loaded = deserialize(raw);
  assert(loaded.week === 12, "save/load week");
  assert(playerOf(loaded).name === "Casey Flint", "save/load name");
  console.log(`ok ${diff}: 12 weeks, personalities=${keys.join(",")}`);
}

const battleState = createNewGame(content, { seed: 7, difficulty: "easy", name: "Riley Cho", background: "fighter" });
let res = act(battleState, content, "raise_banner");
assert(res.ok, `raise banner: ${res.message}`);
assert(playerOf(battleState).faction === "northern_front", "banner founded");
const home = regionOf(battleState, "cheyenne");
home.garrison = 90;
res = act(battleState, content, "attack", { regionId: "denver", auto: true });
assert(res.ok, `attack: ${res.message}`);
assert(res.battleEnd === "atk" || res.battleEnd === "def", "battle must resolve");
assert(battleState.phase === "strategy", "returned from battle");
assert(battleState.log.some((l) => l.kind === "war"), "war log");
console.log(`ok battle: ${res.message}`);

const hullTrack = content.tech.tracks.find((t) => t.id === "tracked_hulls");
assert(hullTrack?.battle?.unlockUnit === "ifv", "M113 tech unlocks unit ifv");
function sideTypes(battle, side) {
  return battle.units.filter((u) => u.side === side).map((u) => u.type);
}
const plainBattle = createNewGame(content, { seed: 7, difficulty: "easy", name: "Riley Cho", background: "fighter" });
const noHull = createBattle(plainBattle, content, "bethel", "nome", 90, 0);
assert(sideTypes(noHull, "atk").every((t) => t === "regular"), "90 troops without unlock stay regulars");
assert(!noHull.units.some((u) => u.type === "ifv" || u.type === "technical"), "no M113 or jeep without those unlocks");
const militiaBattle = createBattle(plainBattle, content, "bethel", "nome", 20, 0);
assert(sideTypes(militiaBattle, "atk").every((t) => t === "militia"), "small levy stays militia");
const jeepOnly = createNewGame(content, { seed: 7, difficulty: "easy", name: "Riley Cho", background: "fighter" });
jeepOnly.research.unlocked = ["small_arms", "technical"];
const jeepBattle = createBattle(jeepOnly, content, "bethel", "nome", 90, 0);
assert(sideTypes(jeepBattle, "atk").filter((t) => t === "technical").length === 1, "jeep still takes the last slot");
assert(!jeepBattle.units.some((u) => u.type === "ifv"), "jeep unlock does not field an M113");
const thinHull = createNewGame(content, { seed: 8, difficulty: "easy", name: "Riley Cho", background: "fighter" });
thinHull.research.unlocked = ["small_arms", "tracked_hulls"];
const underCrew = createBattle(thinHull, content, "bethel", "nome", 50, 0);
assert(!underCrew.units.some((u) => u.type === "ifv"), "M113 waits until the levy can crew a hull");
assert(sideTypes(underCrew, "atk").every((t) => t === "regular"), "50 troops with only tracked hulls stay regulars");
const hullGame = createNewGame(content, { seed: 8, difficulty: "easy", name: "Riley Cho", background: "fighter" });
hullGame.research.unlocked = ["small_arms", "tracked_hulls"];
regionOf(hullGame, "nome").garrison = 80;
const hullBattle = createBattle(hullGame, content, "bethel", "nome", 90, 0);
const atkHull = hullBattle.units.filter((u) => u.side === "atk" && u.type === "ifv");
const defHull = hullBattle.units.filter((u) => u.side === "def" && u.type === "ifv");
assert(atkHull.length === 1 && defHull.length === 1, "one M113 per side when tracked_hulls is unlocked");
assert(atkHull[0].label === "M113" && atkHull[0].maxHp === 18 && atkHull[0].atk === 7 && atkHull[0].def === 5 && atkHull[0].move === 3, "M113 salvage stats");
assert(sideTypes(hullBattle, "atk").filter((t) => t === "regular").length >= 1, "foot regulars still deploy with the hull");
assert(hullBattle.weather === "snow", "week-0 field is snow");
const hullEnd = autoResolveBattle(hullGame, hullBattle, "loyalist");
assert(hullEnd === "atk" || hullEnd === "def", "M113 battle auto-resolves");
const mixed = createNewGame(content, { seed: 8, difficulty: "easy", name: "Riley Cho", background: "fighter" });
mixed.research.unlocked = ["small_arms", "technical", "tracked_hulls"];
const mixedBattle = createBattle(mixed, content, "bethel", "nome", 90, 0);
const mixedAtk = sideTypes(mixedBattle, "atk");
assert(mixedAtk.filter((t) => t === "technical").length === 1, "jeep survives beside the M113");
assert(mixedAtk.filter((t) => t === "ifv").length === 1, "M113 takes the slot ahead of the jeep");
assert(mixedAtk.at(-1) === "technical" && mixedAtk.at(-2) === "ifv", "jeep keeps the last slot");
const liveHull = createNewGame(content, { seed: 8, difficulty: "easy", name: "Riley Cho", background: "fighter" });
playerOf(liveHull).region = "bethel";
act(liveHull, content, "raise_banner");
regionOf(liveHull, "bethel").garrison = 120;
liveHull.research.unlocked.push("tracked_hulls");
liveHull.ap = 4;
res = act(liveHull, content, "attack", { regionId: "nome", auto: true, troops: 90 });
assert(res.ok && (res.battleEnd === "atk" || res.battleEnd === "def"), `live M113 attack: ${res.message}`);
assert(liveHull.phase === "strategy", "M113 auto-resolve returns to the map");
const fieldSrc = readFileSync(new URL("../js/terrain.js", import.meta.url), "utf8") + readFileSync(new URL("../js/ui.js", import.meta.url), "utf8");
assert(/u\.type === "ifv"/.test(fieldSrc) && /fillText\("113"/.test(fieldSrc) && /type === "ifv"\) return "113"/.test(fieldSrc), "M113 reads as a tracked hull marked 113");
assert(/get\("hull"\) === "1"/.test(fieldSrc), "demo battle hull=1 fields the M113");
console.log("ok M113 field spawn");

assert(hullBattle.siege == null, "Nome field battle does not open a siege");
assert(!regionIsSiege(regionOf(hullGame, "nome")), "Nome coast stays a field fight");
assert(regionIsSiege(regionOf(hullGame, "anchorage")), "Anchorage bowl is a siege");
assert(SIEGE_PLOYS.map((p) => p.id).join(",") === "cut,rake,rush", "three siege ploys");

const siegeGame = createNewGame(content, { seed: 11, difficulty: "easy", name: "Riley Cho", background: "fighter" });
const bowl = createBattle(siegeGame, content, "bethel", "anchorage", 80, 0);
assert(bowl.siege && bowl.siege.works === regionOf(siegeGame, "anchorage").walls, "siege WORKS copies wall strength");
assert(bowl.siege.works > RUSH_WORKS_MAX, "Anchorage works start above the rush line");
assert(/Cut the berm/.test(siegeCoach(bowl.siege)) && /NEXT:/.test(siegeCoach(bowl.siege)), "coach names the next ploy");
assert(siegeCoach(bowl.siege).startsWith("NEXT: WORKS"), "domestic NEXT stays on the ploy");
assert(siegeRecommend(bowl.siege) === "cut", "high works recommend Cut the berm");
const rushed = createSiege({ name: "Bowl", short: "Bowl", walls: 40, garrison: 90 }, 80);
const rushLevy = rushed.levy;
applySiegePloy(siegeGame, rushed, "rush", 50);
assert(rushed.result !== "atk" && rushed.levy < rushLevy, "rush into standing works fails and costs levy");
assert(/Do not rush/.test(siegeCoach(rushed)), "coach still says do not rush");
const loud = createSiege({ name: "Bowl", short: "Bowl", walls: 10, garrison: 40 }, 80);
applySiegePloy(siegeGame, loud, "rush", 50);
assert(loud.result !== "atk", "open berm with a live parapet does not fall");
const quiet = createSiege({ name: "Bowl", short: "Bowl", walls: 10, garrison: 40 }, 80);
quiet.suppress = 40;
applySiegePloy(siegeGame, quiet, "rush", 50);
assert(quiet.result === "atk" && quiet.closed, "low WORKS and SUPPRESS take the settlement");

function cutsToOpen(walls) {
  const st = createNewGame(content, { seed: 4, difficulty: "easy", name: "Siege", background: "fighter" });
  const s = createSiege({ name: "Bowl", short: "Bowl", walls, garrison: 80 }, 200);
  let cuts = 0;
  let guard = 0;
  while (!s.closed && guard++ < 20) {
    const kind = siegeRecommend(s);
    if (kind === "cut") cuts += 1;
    applySiegePloy(st, s, kind, 50);
  }
  return { cuts, result: s.result };
}
const lightSiege = cutsToOpen(24);
const heavySiege = cutsToOpen(72);
assert(lightSiege.result === "atk" && heavySiege.result === "atk", "coach script takes light and heavy works");
assert(heavySiege.cuts > lightSiege.cuts, "higher walls need more berm cuts");

const held = createSiege({ name: "Bowl", short: "Bowl", walls: 80, garrison: 40 }, 400);
let holdSteps = 0;
while (!held.closed && holdSteps++ < 20) applySiegePloy(siegeGame, held, "rake", 50);
assert(held.result === "def" && /lifts/.test(held.log[held.log.length - 1]), "watch expiry lifts the siege");

const siegeEnd = autoResolveBattle(siegeGame, bowl, "loyalist");
assert(siegeEnd === "atk", "auto siege follows the coach and takes Anchorage");
assert(bowl.units.some((u) => u.side === "atk"), "siege still keeps the field roster for a later fight");

playerOf(siegeGame).region = "bethel";
act(siegeGame, content, "raise_banner");
regionOf(siegeGame, "bethel").garrison = 120;
siegeGame.ap = 4;
res = act(siegeGame, content, "attack", { regionId: "anchorage", troops: 80 });
assert(res.ok && siegeGame.phase === "battle" && siegeGame.battle.siege, `live siege open: ${res.message}`);
const worksBefore = siegeGame.battle.siege.works;
const cutRes = battleCmd(siegeGame, content, "siege", { kind: "cut" });
assert(cutRes.ok && siegeGame.battle.siege.works < worksBefore, "Cut the berm drops WORKS");
assert(/NEXT:/.test(cutRes.message), "siege command returns the next coach line");
const blocked = battleCmd(siegeGame, content, "endTurn");
assert(!blocked.ok, "field end-turn does not run during a siege");
res = battleCmd(siegeGame, content, "auto");
assert(res.battleEnd === "atk" || res.battleEnd === "def", `siege auto closes: ${res.message}`);
assert(siegeGame.phase === "strategy", "siege returns to the map");

const pageSrc = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const siegeCss = readFileSync(new URL("../css/game.css", import.meta.url), "utf8");
const siegeUi = readFileSync(new URL("../js/ui.js", import.meta.url), "utf8");
for (const ploy of SIEGE_PLOYS) assert(pageSrc.includes(ploy.label), `siege button ${ploy.label}`);
assert(/get\("demo"\) === "siege"/.test(siegeUi), "demo=siege hook");
assert(/get\("siege"\) === "1"/.test(siegeUi), "battle demo siege=1 hook");
assert(/\.siege-next \{[^}]*font-size:\s*16px/.test(siegeCss), "siege NEXT type is large");
assert(/\.siege-next \{[^}]*background:\s*#f8d800/.test(siegeCss), "siege NEXT is high-contrast amber");
assert(/\.siege-next \{[^}]*color:\s*#000000/.test(siegeCss), "siege NEXT text is black on amber");
assert(/\.siege-meter strong \{[^}]*font-size:\s*28px/.test(siegeCss), "siege meter numerals are large");
assert(/log\.innerHTML = list\.map/.test(siegeUi), "siege log renders every line");
assert(!/siege-log"\)\.innerHTML = s\.log\.slice\(/.test(siegeUi), "siege log does not drop older lines");
assert(/\.siege-log \{[^}]*overflow:\s*visible/.test(siegeCss), "siege log does not nest a second scroller");
assert(/\.siege-log \{[^}]*max-height:\s*none/.test(siegeCss), "siege log is not height-clipped");
assert(/siege-meter works/.test(pageSrc) && /siege-meter suppress/.test(pageSrc) && /siege-meter levy/.test(pageSrc), "WORKS SUPPRESS LEVY meters are marked");
assert(/siege-sticky/.test(pageSrc) && /position:\s*sticky/.test(siegeCss), "siege controls stay on screen after several ploys");
assert(/\.siege-meter\.works strong \{[^}]*#ff4040/.test(siegeCss), "WORKS numeral is red");
assert(/\.siege-meter\.suppress strong \{[^}]*#f8d800/.test(siegeCss), "SUPPRESS numeral stays amber");
assert(/\.siege-meter\.levy strong \{[^}]*#ffffff/.test(siegeCss), "LEVY numeral is white");
assert(/ploy-mark/.test(siegeUi) && /PRESS/.test(siegeUi), "ploy buttons name PRESS");
assert(/id="siege-last"/.test(pageSrc), "latest siege line stays with the buttons");
console.log("ok siege depth");

const inlandGame = createNewGame(content, { seed: 12, difficulty: "easy", name: "Riley Cho", background: "fighter" });
for (const id of INLAND_IDS) {
  assert(inlandDesk(id), `desk ${id}`);
  const live = regionOf(inlandGame, id);
  assert(live, `${id} stays a Campaign map node`);
  const neighborsBefore = live.neighbors.join(",");
  const regionCount = inlandGame.regions.length;
  const opened = startInlandBattle(inlandGame, content, id, { troops: 80 });
  const fight = inlandGame.battle;
  assert(opened.ok && fight?.siege, `${id} siege demo opens a board`);
  assert(!fight.deskOnly, `${id} uses the painted node`);
  assert(fight.siege.works === live.walls, `${id} WORKS uses painted walls`);
  assert(fight.siege.suppress === inlandDesk(id).pressure, `${id} opens at the pressure preset`);
  assert(/You are the attacker/.test(fight.siege.log[0]), `${id} siege log keeps the attacker line`);
  assert(/NEXT:/.test(siegeCoach(fight.siege)) && inlandDesk(id).flavor && siegeCoach(fight.siege).includes(inlandDesk(id).flavor), `${id} coach keeps NEXT and the desk line`);
  assert(siegeCoach(fight.siege).startsWith(`NEXT: ${inlandDesk(id).line}.`), `${id} NEXT leads with the desk`);
  assert(fight.siege.deskLine === inlandDesk(id).line, `${id} siege stores the desk line`);
  assert(fight.siege.log[0].includes(inlandDesk(id).line), `${id} opening log names the desk`);
  const look = inlandLook(id);
  assert(look && look.strip && look.read && look.edge && look.panel && look.backdrop, `${id} has a desk look`);
  assert(fight.units.some((u) => u.side === "atk") && fight.units.some((u) => u.side === "def"), `${id} keeps the field roster`);
  assert(inlandGame.regions.length === regionCount, `${id} siege does not insert a map node`);
  assert(regionOf(inlandGame, id).neighbors.join(",") === neighborsBefore, `${id} siege does not rewrite roads`);
  inlandGame.phase = "strategy";
  inlandGame.battle = null;
}
assert(inlandDesk("kamchatka").walls > inlandDesk("havana").walls, "Kamchatka berm preset is heavier than Havana");
assert(inlandDesk("havana").walls > inlandDesk("managua").walls, "Havana berm preset is heavier than Managua");
const havanaBoard = createBattle(inlandGame, content, "far_cuba", "havana", 80, 0, { forceSiege: true });
assert(havanaBoard.siege.works === regionOf(inlandGame, "havana").walls, "Havana WORKS copies the painted wall");
assert(siegeRecommend(havanaBoard.siege) === "rake", "Havana painted walls open on Rake the parapet");
const ghost = createNewGame(content, { seed: 12, difficulty: "easy", name: "Riley Cho", background: "fighter" });
ghost.regions = ghost.regions.filter((r) => r.id !== "havana");
const ghostFight = createBattle(ghost, content, "far_cuba", "havana", 80, 0);
assert(ghostFight.deskOnly && ghostFight.siege.works === inlandDesk("havana").walls, "a missing node still uses the Havana desk preset");
const inlandEnd = autoResolveBattle(
  inlandGame,
  createBattle(inlandGame, content, "far_russia", "kamchatka", 80, 0, { forceSiege: true }),
  "loyalist",
);
assert(inlandEnd === "atk", "coach script takes the Kamchatka board");
const managuaEnd = autoResolveBattle(
  inlandGame,
  createBattle(inlandGame, content, "far_nicaragua", "managua", 80, 0, { forceSiege: true }),
  "loyalist",
);
assert(managuaEnd === "atk", "coach script takes the Managua board");
const sibField = createBattle(inlandGame, content, "far_russia", "siberia", 80, 0, { field: true });
assert(sibField.siege == null && sibField.grid.some((row) => row.includes("ice")), "inland field spawn skips the siege board");
const painted = createNewGame(content, { seed: 13, difficulty: "easy", name: "Riley Cho", background: "fighter" });
const ridge = regionOf(painted, "kr_inland");
const ridgeNeighbors = ridge.neighbors.join(",");
ridge.walls = 30;
const paintedFight = createBattle(painted, content, "far_korea", "kr_inland", 80, 0);
assert(paintedFight.siege && paintedFight.siege.works === 30 && !paintedFight.deskOnly, "painted walls replace the desk preset");
assert(ridge.neighbors.join(",") === ridgeNeighbors, "combat hook does not add a road");
const managuaLive = regionOf(inlandGame, "managua");
assert(managuaLive.walls < 24 && managuaLive.terrainBias !== "urban", "Managua paint stays under the siege line");
assert(!createBattle(inlandGame, content, "far_nicaragua", "managua", 80, 0).siege, "authored low walls stay a field fight");
assert(createBattle(inlandGame, content, "far_nicaragua", "managua", 80, 0, { forceSiege: true }).siege, "siege demo can still force the board");
act(inlandGame, content, "raise_banner");
const laneCount = inlandGame.regions.length;
const laneNeighbors = regionOf(inlandGame, "sponsor_lane").neighbors.join(",");
const lane = startInlandBattle(inlandGame, content, "sponsor_lane", { troops: 80 });
assert(lane.ok && inlandGame.phase === "battle" && inlandGame.battle.siege, `sponsor lane siege: ${lane.message}`);
const laneWorks = inlandGame.battle.siege.works;
const laneCut = battleCmd(inlandGame, content, "siege", { kind: "cut" });
assert(laneCut.ok && inlandGame.battle.siege.works < laneWorks, "inland Cut the berm drops WORKS");
res = battleCmd(inlandGame, content, "auto");
assert(res.battleEnd === "atk" || res.battleEnd === "def", `inland siege auto closes: ${res.message}`);
assert(
  inlandGame.phase === "strategy" && inlandGame.regions.length === laneCount && regionOf(inlandGame, "sponsor_lane").neighbors.join(",") === laneNeighbors,
  "inland siege returns without adding a node or a road",
);
const lookStrips = new Set(INLAND_IDS.map((id) => inlandLook(id).strip));
const lookReads = new Set(INLAND_IDS.map((id) => inlandLook(id).read));
const lookEdges = new Set(INLAND_IDS.map((id) => inlandLook(id).edge));
const lookPanels = new Set(INLAND_IDS.map((id) => inlandLook(id).panel));
const lookBacks = new Set(INLAND_IDS.map((id) => inlandLook(id).backdrop));
assert(lookStrips.size === INLAND_IDS.length, "desk strip names differ");
assert(lookReads.size === INLAND_IDS.length, "desk reads differ");
assert(lookEdges.size === INLAND_IDS.length, "desk edges differ");
assert(lookPanels.size === INLAND_IDS.length, "desk panels differ");
assert(lookBacks.size === INLAND_IDS.length, "desk backdrops differ");
assert(!inlandLook("anchorage"), "domestic siege has no foreign desk tint");
assert(/id="siege-desk"/.test(pageSrc), "desk strip is on the siege board");
assert(/data-desk/.test(siegeCss) && /--desk-edge/.test(siegeCss) && /--desk-backdrop/.test(siegeCss), "siege board tints from the desk id");
assert(/dataset\.desk/.test(siegeUi) && /inlandLook/.test(siegeUi), "ui binds the desk id");
assert(/Cut the berm/.test(pageSrc) && /Rake the parapet/.test(pageSrc) && /Rush the gap/.test(pageSrc), "siege ploys stay on the board");
assert(/PRESS/.test(siegeUi) && /WAIT/.test(siegeUi), "PRESS and WAIT marks stay");
assert(/get\("node"\)/.test(siegeUi) && /startInlandBattle/.test(siegeUi), "demo node= starts an inland battle");
assert(/field: true/.test(siegeUi), "demo=battle&node= opens a field spawn");
assert(/function stampBattleDesk/.test(readFileSync(new URL("../js/inland.js", import.meta.url), "utf8")), "field stamp lives with the desk tokens");
assert(/stampBattleDesk\(battle, toId\)/.test(readFileSync(new URL("../js/battle.js", import.meta.url), "utf8")), "desk id is stamped after the field is created");
assert(/stampBattleDesk\(state\.battle, node\)/.test(siegeUi), "demo=battle stamps node= onto the field");
assert(/function activeFieldDesk/.test(siegeUi) && /function demoFieldNode/.test(siegeUi), "field chrome reads node= even if create dropped the desk");
assert(/function fieldNextLine/.test(siegeUi) && /look\.read/.test(siegeUi), "field NEXT leads with the desk read");
assert(/id="field-desk"/.test(pageSrc) && /id="field-next"/.test(pageSrc), "field desk strip and NEXT are on the battle chrome");
assert(/\.battle\[data-desk\]:not\(\.is-siege\)/.test(siegeCss) && /--desk-backdrop/.test(siegeCss), "field shell tints from the desk id");
assert(/\.field-next \{[^}]*background:\s*#f8d800/.test(siegeCss), "field NEXT stays amber");
assert(/\.field-next \{[^}]*color:\s*#000000/.test(siegeCss), "field NEXT text is black on amber");
assert(/inlandLook\(node\) && demoQuery\(\)\.get\("siege"\) !== "1"/.test(siegeUi), "unknown node= does not open a foreign field");
const nomeField = createBattle(inlandGame, content, "bethel", "nome", 80, 0);
assert(nomeField.deskId == null && nomeField.siege == null, "domestic Nome field has no desk");
assert(stampBattleDesk(nomeField, "not-a-desk") == null && nomeField.deskId == null, "unknown node= stays a domestic field");
for (const id of INLAND_IDS) {
  const field = createBattle(inlandGame, content, inlandDesk(id).approach, id, 80, 0, { field: true });
  const roster = field.units.map((u) => `${u.id}:${u.type}:${u.hp}`).join(",");
  const grid = field.grid.map((row) => row.join("")).join("|");
  assert(field.siege == null, `${id} field spawn skips the siege board`);
  assert(field.deskId === id, `${id} field stores the desk after create`);
  assert(stampBattleDesk(field, id) === id && field.deskId === id, `${id} field stamp sticks`);
  assert(field.units.map((u) => `${u.id}:${u.type}:${u.hp}`).join(",") === roster, `${id} stamp does not touch the roster`);
  assert(field.grid.map((row) => row.join("")).join("|") === grid, `${id} stamp does not touch the grid`);
  assert(field.round === 1 && field.maxRounds === 8, `${id} stamp does not touch the impulse clock`);
  assert(stampBattleDesk(field, "anchorage") == null && field.deskId === id, `${id} unknown stamp does not clear the desk`);
}
assert(
  /NEXT: \$\{desk\.line\}\. \$\{look\.read\}\. Yellow unit, then an adjacent diamond\./.test(siegeUi),
  "field NEXT names the desk then the existing order",
);
const havanaSiege = createBattle(inlandGame, content, "far_cuba", "havana", 80, 0, { forceSiege: true });
assert(havanaSiege.siege && havanaSiege.deskId === "havana", "siege hook still stores the Havana desk");
assert(siegeCoach(havanaSiege.siege).startsWith("NEXT: Havana desk."), "siege NEXT still leads with the desk");
const badField = startInlandBattle(createNewGame(content, { seed: 19, difficulty: "easy", name: "Riley Cho", background: "fighter" }), content, "nome", { field: true });
assert(!badField.ok, "a domestic id is not an inland field hook");
const statusSrc = readFileSync(new URL("../STATUS.md", import.meta.url), "utf8");
for (const id of INLAND_IDS) assert(statusSrc.includes(`node=${id}`), `STATUS documents ${id}`);
for (const id of INLAND_IDS) assert(statusSrc.includes(`demo=battle&node=${id}`), `STATUS documents field ${id}`);
assert(statusSrc.includes("demo=battle&siege=1&node="), "STATUS documents the battle siege hook");
assert(statusSrc.includes("Domestic field, unchanged: `/?demo=battle`"), "STATUS notes the default field");
assert(/function stampCourtDesk/.test(readFileSync(new URL("../js/inland.js", import.meta.url), "utf8")), "court stamp lives with the desk tokens");
assert(/stampCourtDesk\(courtView, params\.get\("node"\)\)/.test(siegeUi), "demo=officers and demo=court stamp node= onto the court view");
assert(/function activeCourtDesk/.test(siegeUi) && /function demoCourtNode/.test(siegeUi), "court chrome reads node= even if create dropped the desk");
assert(/Court — \$\{look\.strip\}/.test(siegeUi) && /Roster — \$\{look\.strip\}/.test(siegeUi), "court and roster titles use the siege strip");
assert(/class="court-desk"/.test(siegeUi) && /class="officers-desk"/.test(siegeUi), "court and officers strips name the desk");
assert(/NEXT: \$\{desk\.line\}\. \$\{look\.read\}\. \$\{courtBase\.replace/.test(siegeUi), "court NEXT names the desk then the existing order");
assert(/NEXT: \$\{desk\.line\}\. \$\{look\.read\}\. \$\{baseNext\.replace/.test(siegeUi), "roster NEXT names the desk then the existing order");
assert(/get\("demo"\) === "court"/.test(siegeUi), "demo=court hook");
assert(/demo === "battle" \|\| demo === "duel" \|\| demo === "siege"/.test(siegeUi), "field, yard, and siege demos do not tint the court");
assert(/\.court-strip\[data-desk\]/.test(siegeCss) && /\.modal-card\.officers-card\[data-desk\]/.test(siegeCss), "court and officers shells tint from the desk id");
assert(/\.court-strip\[data-desk\] \.court-next \{[^}]*background:\s*#f8d800/.test(siegeCss), "desk court NEXT stays amber");
assert(/officers-card\[data-desk\] \.roster-confirm[\s\S]*?#f8d800/.test(siegeCss), "RANK CONFIRMED stays amber on a desk");
assert(/officers-card\[data-desk\] \.roster-added[\s\S]*?#f8d800/.test(siegeCss), "FRIEND ADDED stays readable on a desk");
const courtHost = { chairs: 5 };
assert(stampCourtDesk(courtHost, "havana") === "havana" && courtHost.deskId === "havana" && courtHost.chairs === 5, "court stamp stores the desk and leaves the chairs");
assert(stampCourtDesk(courtHost, "anchorage") == null && courtHost.deskId === "havana", "unknown court node= does not clear the desk");
assert(stampCourtDesk({}, "nome") == null, "a domestic id is not a court desk");
for (const id of INLAND_IDS) {
  const host = {};
  assert(stampCourtDesk(host, id) === id && host.deskId === id, `${id} court stamp`);
  assert(inlandLook(id).strip && inlandDesk(id).line && inlandLook(id).read, `${id} court can read the siege look`);
}
for (const id of INLAND_IDS) assert(statusSrc.includes(`demo=officers&node=${id}`), `STATUS documents officers ${id}`);
for (const id of INLAND_IDS) assert(statusSrc.includes(`demo=court&node=${id}`), `STATUS documents court ${id}`);
assert(statusSrc.includes("Domestic officers, unchanged: `/?demo=officers`"), "STATUS notes the default officers screen");
assert(statusSrc.includes("Domestic court, unchanged: `/?demo=court`"), "STATUS notes the default court");
assert(/function stampMissionDesk/.test(readFileSync(new URL("../js/inland.js", import.meta.url), "utf8")), "mission stamp lives with the desk tokens");
assert(/stampMissionDesk\(missionView, params\.get\("node"\)\)/.test(siegeUi), "demo=missions stamps node= onto the mission board");
assert(/function activeMissionDesk/.test(siegeUi) && /function demoMissionNode/.test(siegeUi), "mission chrome reads node= even if create dropped the desk");
assert(/Missions — \$\{look\.strip\}/.test(siegeUi), "mission title uses the siege strip");
assert(/class="mission-desk"/.test(siegeUi) && /class="mission-next"/.test(siegeUi), "mission strip and NEXT name the desk");
assert(/NEXT: \$\{esc\(desk\.line\)\}\. \$\{esc\(look\.read\)\}\. 1 AP here/.test(siegeUi), "mission NEXT names the desk then the existing order");
assert(/Side missions \(\$\{jobs\.length\} open\)/.test(siegeUi), "domestic mission title stays when no desk is set");
assert(/<p class="muted">1 AP here, or a general's Side mission at End Week\.<\/p>/.test(siegeUi), "domestic mission lead stays the muted line");
assert(/get\("demo"\) === "missions"/.test(siegeUi), "demo=missions hook");
assert(/kind === "missions"/.test(siegeUi) && /paintMissionDesk/.test(siegeUi), "mission modal paints the desk host");
assert(/\.modal-card\.missions-card\[data-desk\]/.test(siegeCss), "mission shell tints from the desk id");
assert(/\.mission-next \{[^}]*background:\s*#f8d800/.test(siegeCss), "mission NEXT stays amber");
assert(/\.mission-next \{[^}]*color:\s*#000000/.test(siegeCss), "mission NEXT text is black");
assert(/id="event-desk"/.test(pageSrc), "mission result keeps a desk strip");
assert(/function paintEventDesk/.test(siegeUi) && /deskId: res\.deskId/.test(siegeUi), "mission result paints a returned desk id");
assert(/\.event-card\[data-desk\] \.next-line \{[^}]*background:\s*#f8d800/.test(siegeCss), "mission result NEXT stays amber");
const missionHost = { jobs: 4 };
assert(stampMissionDesk(missionHost, "havana") === "havana" && missionHost.deskId === "havana" && missionHost.jobs === 4, "mission stamp stores the desk and leaves the jobs");
assert(stampMissionDesk(missionHost, "anchorage") == null && missionHost.deskId === "havana", "unknown mission node= does not clear the desk");
assert(stampMissionDesk({}, "nome") == null, "a domestic id is not a mission desk");
for (const id of INLAND_IDS) {
  const host = {};
  assert(stampMissionDesk(host, id) === id && host.deskId === id, `${id} mission stamp`);
  assert(inlandLook(id).strip && inlandDesk(id).line && inlandLook(id).read, `${id} mission can read the siege look`);
}
assert(/function openDemoFight/.test(siegeUi) && /stampBattleDesk\(state\.battle, node\)/.test(siegeUi), "demo=fight stamps node= onto the field");
assert(/function activeFightDesk/.test(siegeUi) && /function demoFightNode/.test(siegeUi), "fight chrome reads node= even if create dropped the desk");
assert(/state\.battle\.liberation = true/.test(siegeUi), "liberation fight keeps the desk flag on the live board");
assert(/Fight — \$\{look\.strip\}/.test(siegeUi), "fight title uses the siege strip");
assert(/Liberation fight\. Yellow unit, then an adjacent diamond\./.test(siegeUi), "fight NEXT names the liberation fight then the field order");
assert(/get\("demo"\) === "fight"/.test(siegeUi), "demo=fight hook");
assert(/!inlandLook\(node\)/.test(siegeUi), "unknown fight node= does not open a foreign board");
assert(/demo === "fight" \|\| demo === "missions"/.test(siegeUi), "fight and mission demos do not tint the court");
const fightGame = createNewGame(content, { seed: 44, difficulty: "easy", name: "Riley Cho", background: "fighter" });
const openedFight = startInlandBattle(fightGame, content, "managua", { troops: 80, field: true });
const fightBoard = fightGame.battle;
const fightRoster = fightBoard.units.map((u) => `${u.id}:${u.type}:${u.hp}`).join(",");
fightBoard.liberation = true;
assert(openedFight.ok && fightBoard.siege == null && fightBoard.deskId === "managua", "liberation fight opens the Managua field");
assert(stampBattleDesk(fightBoard, "managua") === "managua" && fightBoard.liberation === true, "fight stamp sticks beside the liberation flag");
assert(fightBoard.units.map((u) => `${u.id}:${u.type}:${u.hp}`).join(",") === fightRoster, "fight stamp does not touch the roster");
assert(fightBoard.round === 1 && fightBoard.maxRounds === 8, "fight stamp does not touch the impulse clock");
for (const id of INLAND_IDS) assert(statusSrc.includes(`demo=missions&node=${id}`), `STATUS documents missions ${id}`);
for (const id of INLAND_IDS) assert(statusSrc.includes(`demo=fight&node=${id}`), `STATUS documents fight ${id}`);
assert(statusSrc.includes("Domestic missions, unchanged: `/?demo=missions`"), "STATUS notes the default mission board");
assert(statusSrc.includes("Domestic fight, unchanged: `/?demo=fight`"), "STATUS notes the default fight");
console.log("ok inland siege hooks");

const spyState = createNewGame(content, { seed: 9, difficulty: "normal", name: "Mara", background: "speaker" });
act(spyState, content, "raise_banner");
res = act(spyState, content, "spy", { regionId: "anchorage" });
assert(res.ok, `spy: ${res.message}`);
res = act(spyState, content, "ally", { factionId: "compact" });
assert(res.ok, `ally: ${res.message}`);
const beforeHire = playerGenerals(spyState).length;
act(spyState, content, "end_week");
act(spyState, content, "hire", { officerId: "hart" });
assert(playerGenerals(spyState).length === beforeHire || playerGenerals(spyState).length === beforeHire + 1, "hire attempted");
const custom = createCustomOfficer(spyState, { name: "Pat Quinn", war: 55, int: 55, pol: 55, chr: 55, personality: "merchant" });
assert(custom.ok, "custom officer slot");
assert(spyState.officers.some((o) => o.id === custom.id), "custom in roster");
const pat = spyState.officers.find((o) => o.id === custom.id);
assert(pat.custom && pat.portrait === "PQ", "placeholder portrait initials");
assert(pat.skills.includes("commerce") && !pat.skills.includes("drill"), "merchant type gates skills");
pat.faction = "northern_front";
pat.loyalty = 80;
pat.isGeneral = true;
assert(!setGeneralOrder(spyState, pat.id, "drill").ok, "gated skill rejected");
assert(setGeneralOrder(spyState, pat.id, "commerce").ok, "in-type skill allowed");
assert(!createCustomOfficer(spyState, { name: "Over", war: 80, int: 80, pol: 80, chr: 80, personality: "loyalist" }).ok, "stat budget cap");
assert(!createCustomOfficer(spyState, { name: "X", personality: "loyalist" }).ok, "name too short");
for (let i = spyState.customSlotsUsed; i < 10; i++) {
  const extra = createCustomOfficer(spyState, { name: `Slot ${i + 1}`, personality: "loyalist", war: 40, int: 40, pol: 40, chr: 40 });
  assert(extra.ok, `slot ${i + 1}`);
}
assert(!createCustomOfficer(spyState, { name: "Eleventh", personality: "loyalist" }).ok, "11th custom blocked");
const loadedCustom = deserialize(serialize(spyState));
const savedPat = loadedCustom.officers.find((o) => o.id === pat.id);
assert(savedPat && savedPat.custom && savedPat.skills.includes("commerce") && savedPat.portrait === "PQ", "custom survives save");
assert(loadedCustom.customSlotsUsed === 10, "slot count persists");
console.log("ok spy/ally/hire/custom");

const orderState = createNewGame(content, { seed: 11, difficulty: "easy", name: "Pat", background: "organizer" });
act(orderState, content, "raise_banner");
const hart = orderState.officers.find((o) => o.id === "hart");
hart.faction = "northern_front";
hart.loyalty = 80;
hart.region = "cheyenne";
const beforeG = regionOf(orderState, "cheyenne").garrison;
const ordered = setGeneralOrder(orderState, "hart", "drill");
assert(ordered.ok, `set order: ${ordered.message}`);
assert(hart.standingOrder === "drill", "standing order persisted");
res = act(orderState, content, "end_week");
assert(res.ok, "end week after order");
assert(
  orderState.log.some((l) => l.text.includes("Eli Hart") && l.text.includes("drills") && l.text.includes("ordered")),
  "ordered general should drill at week end"
);
assert(regionOf(orderState, "cheyenne").garrison > beforeG, "drill should raise garrison");
const loadedOrders = deserialize(serialize(orderState));
assert(loadedOrders.officers.find((o) => o.id === "hart").standingOrder === "drill", "order survives save");
console.log("ok general standing orders");

const huntState = createNewGame(content, { seed: 3, difficulty: "easy", name: "Scout", background: "scout" });
act(huntState, content, "raise_banner");
assert(!visibleOfficers(huntState).some((o) => o.id === "karr"), "Karr starts hidden");
assert(legendStatus(huntState).mapMark, "Slope should show a hunt mark");
assert(listActions(huntState).some((a) => a.id === "seek_legend" && a.enabled), "Seek Legend available");
res = act(huntState, content, "seek_legend");
assert(res.ok, `seek rumor: ${res.message}`);
assert(!res.revealed, "first seek from Bethel is rumor only");
assert(legendStatus(huntState).hunt === 1, "hunt stage 1 after rumor");
assert(!visibleOfficers(huntState).some((o) => o.id === "karr"), "still hidden after rumor");
playerOf(huntState).region = "arctic_slope";
res = act(huntState, content, "seek_legend");
assert(res.ok && res.revealed, `contact: ${res.message}`);
assert(visibleOfficers(huntState).some((o) => o.id === "karr"), "Karr listed after Slope contact");
assert(!legendStatus(huntState).mapMark, "hunt mark clears");
console.log("ok Ilya Karr reveal path");

const spur = createNewGame(content, { seed: 5, difficulty: "easy", name: "Scout", background: "scout" });
act(spur, content, "raise_banner");
playerOf(spur).region = "fairbanks";
res = act(spur, content, "travel", { regionId: "yukon_road" });
assert(res.ok && playerOf(spur).region === "yukon_road", `travel Yukon: ${res.message}`);
res = act(spur, content, "travel", { regionId: "klondike" });
assert(res.ok && playerOf(spur).region === "klondike", `travel Klondike: ${res.message}`);
playerOf(spur).region = "arctic_slope";
res = act(spur, content, "travel", { regionId: "yukon_road" });
assert(res.ok && playerOf(spur).region === "yukon_road", `travel Slope–Yukon road: ${res.message}`);
playerOf(spur).region = "nome";
res = act(spur, content, "travel", { regionId: "bering_strait" });
assert(res.ok && playerOf(spur).region === "bering_strait", `travel Bering: ${res.message}`);
assert(visibleOfficers(spur).some((o) => o.id === "haro"), "Relay clerk on board");
assert(visibleOfficers(spur).some((o) => o.id === "yarrow" && o.faction === "bering_pact"), "Yarrow wired to Ice Pact");
console.log("ok Yukon/Bering spur");

const westHop = createNewGame(content, { seed: 11, difficulty: "easy", name: "Scout", background: "scout" });
act(westHop, content, "raise_banner");
const hops = [
  ["bethel", "anchorage"],
  ["anchorage", "juneau"],
  ["juneau", "seattle"],
  ["seattle", "portland"],
  ["portland", "bend"],
  ["bend", "boise"],
  ["boise", "salt_lake"],
  ["salt_lake", "grand_junction"],
  ["grand_junction", "denver"],
];
for (const [from, to] of hops) {
  playerOf(westHop).region = from;
  westHop.ap = Math.max(westHop.ap, 2);
  res = act(westHop, content, "travel", { regionId: to });
  assert(res.ok && playerOf(westHop).region === to, `travel ${from}→${to}: ${res.message}`);
}
assert(regionOf(westHop, "denver").stateCode === "CO", "Denver tagged Colorado");
assert(visibleOfficers(westHop).some((o) => o.id === "front" && o.region === "denver"), "Campus dean in Denver");
assert(visibleOfficers(westHop).some((o) => o.id === "range" && o.region === "colorado_springs"), "Airlift major in Springs");
assert(visibleOfficers(westHop).some((o) => o.id === "quay" && o.faction === "red_wharf"), "Wharf clerk in Seattle");
playerOf(westHop).region = "denver";
westHop.ap = 2;
res = act(westHop, content, "travel", { regionId: "omaha" });
assert(res.ok && playerOf(westHop).region === "omaha", `travel Denver→Omaha: ${res.message}`);
playerOf(westHop).region = "wichita";
westHop.ap = 2;
res = act(westHop, content, "travel", { regionId: "st_louis" });
assert(res.ok && playerOf(westHop).region === "st_louis", `travel Wichita→St. Louis: ${res.message}`);
playerOf(westHop).region = "nome";
westHop.ap = 2;
res = act(westHop, content, "travel", { regionId: "bering_strait" });
assert(res.ok, "still walk Bering");
res = act(westHop, content, "travel", { regionId: "far_russia" });
assert(!res.ok, "Russia desk locked until Phase 3");
assert(!travelUnlocked(westHop, regionOf(westHop, "far_korea")), "Korea locked until sponsor");
console.log("ok Alaska→Colorado corridor");

const leap = createNewGame(content, { seed: 12, difficulty: "easy", name: "Scout", background: "scout" });
act(leap, content, "raise_banner");
leap.ap = 6;
res = act(leap, content, "travel", { regionId: "seattle" });
assert(!res.ok && /leap|adjacent/i.test(res.message), `no leap Cheyenne→Seattle: ${res.message}`);
res = act(leap, content, "travel", { regionId: "bethel" });
assert(!res.ok, "no leap Cheyenne→Bethel");
res = act(leap, content, "travel", { regionId: "sacramento" });
assert(!res.ok, "no leap Cheyenne→Sacramento");
res = act(leap, content, "attack", { regionId: "seattle", auto: true });
assert(!res.ok && /leap|adjacent|neighbor/i.test(res.message), `no leap attack: ${res.message}`);
assert(isAdjacent(leap, "cheyenne", "denver"), "Denver is the Front Range road from Cheyenne");
assert(!isAdjacent(leap, "cheyenne", "bethel"), "Cheyenne does not leap to Bethel");
assert(!isAdjacent(leap, "bethel", "denver"), "engine marks Denver non-adjacent from Bethel");
[
  ["eugene", "sacramento"],
  ["sacramento", "los_angeles"],
  ["sacramento", "reno"],
  ["los_angeles", "las_vegas"],
  ["reno", "las_vegas"],
  ["salt_lake", "las_vegas"],
  ["spokane", "portland"],
  ["spokane", "bend"],
  ["boise", "missoula"],
  ["boise", "jackson"],
  ["cheyenne", "salt_lake"],
  ["cheyenne", "lincoln"],
  ["denver", "lincoln"],
  ["reno", "salt_lake"],
  ["lincoln", "wichita"],
  ["topeka", "st_louis"],
].forEach(([a, b]) => {
  assert(isAdjacent(leap, a, b) && isAdjacent(leap, b, a), `${a}–${b} is a neighbor road`);
});
const gulf = regionOf(leap, "gulf_passage");
assert(gulf && gulf.type === "sea" && gulf.unlockPhase === 3, "Gulf Sealift is the phase-3 sea gate");
assert(!travelUnlocked(leap, gulf), "Gulf Sealift stays locked until the foreign desks open");
const nbrs = (id) => regionOf(leap, id).neighbors;
assert(nbrs("st_louis").includes("gulf_passage") && nbrs("gulf_passage").includes("st_louis") && nbrs("gulf_passage").includes("far_cuba") && nbrs("far_cuba").includes("gulf_passage") && nbrs("far_cuba").includes("far_nicaragua"), "Gulf approach is St. Louis → Gulf Sealift → Cuba → Nicaragua");
assert(!nbrs("st_louis").includes("far_cuba"), "Cuba is not a direct road from St. Louis");
assert(nbrs("nome").includes("bering_strait") && nbrs("bering_strait").includes("nome") && nbrs("bering_strait").includes("far_russia") && nbrs("far_russia").includes("bering_strait"), "Russia approach stays Nome → Bering");
["kamchatka", "siberia", "havana", "managua", "sponsor_lane", "kr_inland"].forEach((id) => {
  assert(regionOf(leap, id), `inland desk ${id} is on the board`);
});
assert(nbrs("far_russia").includes("kamchatka") && nbrs("kamchatka").includes("far_russia") && nbrs("kamchatka").includes("siberia") && nbrs("siberia").includes("kamchatka"), "Russia inland is far_russia → kamchatka → siberia");
assert(!nbrs("far_russia").includes("siberia") && !nbrs("bering_strait").includes("kamchatka"), "Siberia does not leap the Kamchatka road");
assert(nbrs("far_cuba").includes("havana") && nbrs("havana").includes("far_cuba") && !nbrs("gulf_passage").includes("havana"), "Havana is the Cuba inland road, not a gulf leap");
assert(nbrs("far_nicaragua").includes("managua") && nbrs("managua").includes("far_nicaragua") && !nbrs("far_cuba").includes("managua"), "Managua is the Nicaragua inland road");
assert(nbrs("far_russia").includes("sponsor_lane") && nbrs("sponsor_lane").includes("far_russia") && nbrs("sponsor_lane").includes("far_korea") && nbrs("far_korea").includes("sponsor_lane") && nbrs("far_korea").includes("kr_inland") && nbrs("kr_inland").includes("far_korea"), "Korea is far_russia → sponsor_lane → far_korea → kr_inland");
assert(!nbrs("far_russia").includes("far_korea") && !nbrs("sponsor_lane").includes("kr_inland"), "no direct Russia–Korea or sponsor–sheds leap");
assert(regionOf(leap, "sponsor_lane").type === "sea" && regionOf(leap, "sponsor_lane").unlockPhase === 4, "Sponsor Lane is the phase-4 sea");
assert(regionOf(leap, "siberia").unlockPhase === 3 && regionOf(leap, "havana").unlockPhase === 3 && regionOf(leap, "kr_inland").unlockPhase === 4, "inland phases match the locked gates");
assert(!content.regions.regions.some((r) => r.state === "MX" || r.state === "AZ" || r.id === "mexico" || r.id === "arizona"), "no Mexico or Arizona nodes");
assert(playerOf(leap).region === "cheyenne", "week 0 stays Cheyenne");
const hop = (id) => approachTrail(leap, "cheyenne", id).map((r) => r.short).join(" → ");
assert(hop("havana") === "St. Louis → Gulf Sealift → Cuba → Havana", `Havana chain: ${hop("havana")}`);
assert(hop("siberia") === "Nome → Bering → Russia → Kamchatka → Siberia", `Siberia chain: ${hop("siberia")}`);
assert(hop("managua") === "St. Louis → Gulf Sealift → Cuba → Nicaragua → Managua", `Managua chain: ${hop("managua")}`);
assert(hop("kamchatka") === "Nome → Bering → Russia → Kamchatka", `Kamchatka chain: ${hop("kamchatka")}`);
assert(hop("sponsor_lane") === "Nome → Bering → Russia → Sponsor Lane", `Sponsor chain: ${hop("sponsor_lane")}`);
assert(hop("kr_inland") === "Nome → Bering → Russia → Sponsor Lane → Korea → Sheds", `Korea inland chain: ${hop("kr_inland")}`);
assert(approachRoads(leap, "far_cuba", "havana").join(", ") === "Havana", "Havana from Cuba names itself");
assert(approachRoads(leap, "far_russia", "siberia").join(", ") === "Kamchatka", "Siberia from Russia names Kamchatka");
assert(approachRoads(leap, "cheyenne", "lincoln").join(", ") === "Lincoln", "adjacent I-80 names Lincoln");
assert(roadLabel(leap, "cheyenne", "lincoln") === "I-80 Stall", "I-80 Stall label");
assert(roadLabel(leap, "far_cuba", "havana") === "Havana road", "Havana road label");
assert(roadLabel(leap, "kamchatka", "siberia") === "Siberia road", "Siberia road label");
assert(roadLabel(leap, "far_nicaragua", "managua") === "Managua road", "Managua road label");
assert(roadLabel(leap, "far_russia", "sponsor_lane") === "Sponsor lane", "Sponsor lane label");
assert(roadLabel(leap, "far_korea", "kr_inland") === "Peninsula sheds", "Peninsula sheds label");
const desks = deskControl(leap);
assert(desks.find((s) => s.id === "RU")?.keys.includes("siberia"), "Siberia stays a Russia key");
assert(desks.find((s) => s.id === "CU")?.keys.includes("havana"), "Havana stays a Cuba key");
assert(desks.find((s) => s.id === "NI")?.keys.includes("managua"), "Managua stays a Nicaragua key");
assert(isAdjacent(leap, "bethel", "anchorage"), "Anchorage is an adjacent road");
playerOf(leap).region = "bethel";
leap.ap = 2;
res = act(leap, content, "travel", { regionId: "anchorage" });
assert(res.ok, `adjacent travel Bethel→Anchorage: ${res.message}`);
const farmY = geoYield(regionOf(leap, "lincoln"), { food: 1, commerce: 1 });
const iceY = geoYield(regionOf(leap, "arctic_slope"), { food: 1, commerce: 1 });
assert(farmY.food > iceY.food, `farm belt out-yields ice food (${farmY.food} vs ${iceY.food})`);
assert(iceY.gold >= farmY.gold, "Slope fuel/mine beats Lincoln gold");
assert(geoTags(regionOf(leap, "topeka")).some((t) => t.id === "farm"), "Topeka shows Farm tag");
const board = stateControl(leap);
const ak = board.find((s) => s.id === "AK");
assert(ak && ak.totalTerr >= 8 && ak.territories.some((t) => t.key && t.id === "anchorage"), "States board lists AK territories");
console.log("ok adjacency / geo yields");

const lib = createNewGame(content, { seed: 21, difficulty: "easy", name: "Scout", background: "scout" });
act(lib, content, "raise_banner");
const startBoard = stateControl(lib);
assert(startBoard.find((s) => s.id === "WY")?.liberated, "raising the banner in Cheyenne liberates Wyoming");
assert(startBoard.filter((s) => s.liberated).every((s) => s.id === "WY"), "only Wyoming is liberated from the Cheyenne start");
["denver", "colorado_springs"].forEach((id) => {
  regionOf(lib, id).owner = "northern_front";
});
tickCampaign(lib);
assert(lib.campaign.liberated.includes("CO"), "Colorado liberated when key cities held");
assert(!lib.campaign.nationalLeader, "one state is not enough for Phase 2");
const westKeys = ["anchorage", "fairbanks", "juneau", "seattle", "spokane", "portland", "bend", "boise", "missoula", "cheyenne", "salt_lake", "denver", "colorado_springs"];
westKeys.forEach((id) => {
  regionOf(lib, id).owner = "northern_front";
});
tickCampaign(lib);
assert(lib.campaign.nationalLeader && lib.campaign.phase >= 2, "8 west-bloc states name a national leader");
const leaderNote = lib.log.map((l) => l.text).find((t) => /national leader/.test(t));
assert(leaderNote && /not a leap/.test(leaderNote), `leader note is a title: ${leaderNote}`);
const reunifyNote = lib.log.map((l) => l.text).find((t) => /Reunify/.test(t));
assert(reunifyNote && /NE–KS–MO/.test(reunifyNote), `reunify note names the east walk: ${reunifyNote}`);
const coNote = lib.log.map((l) => l.text).find((t) => /Liberated Colorado/.test(t));
assert(coNote && /West bloc 2\/8/.test(coNote), `colorado frees into the west count: ${coNote}`);
assert(lib.campaign.phase >= 3, "Phase 3 foreign desks unlock with the council");
assert(travelUnlocked(lib, regionOf(lib, "far_russia")), "Russia walkable after restore");
const sponsorLine = fireSponsor(lib);
assert(sponsorLine && lib.campaign.phase === 4 && lib.campaign.sponsorAdded, "sponsor adds Korea front");
assert(travelUnlocked(lib, regionOf(lib, "far_korea")), "Korea walkable after sponsor");
console.log("ok campaign phases 1–4");

const fresh = createNewGame(content, { seed: 1, difficulty: "easy", name: "Casey Flint", background: "scout" });
const week0 = listActions(fresh);
const banner = week0.find((a) => a.id === "raise_banner");
const drill = week0.find((a) => a.id === "drill");
assert(banner && banner.enabled, "week 0 Raise Banner must be clickable");
assert(banner.hint && /Northern Front|claim/i.test(banner.hint), "Raise Banner needs a plain-English why");
assert(drill && !drill.enabled && drill.hint, "Drill must explain why it is locked before a banner");
assert(week0.find((a) => a.id === "end_week")?.enabled, "End Week always available");
console.log("ok week-0 action hints");

const spriteSrc = readFileSync(new URL("../js/sprites.js", import.meta.url), "utf8");
const uiSrc = readFileSync(new URL("../js/ui.js", import.meta.url), "utf8");
const sceneSrc = readFileSync(new URL("../js/scenes.js", import.meta.url), "utf8");
const hudSrc = spriteSrc + uiSrc + sceneSrc;
assert(!/wolverine/i.test(hudSrc), "copy must not use Wolverines trademark");
assert(/militia horse scout/.test(spriteSrc), "horse framed as militia scout");
assert(/drawJeep/.test(spriteSrc) && /drawM113/.test(spriteSrc) && /drawHorse/.test(spriteSrc), "jeep / M113 / horse painters");
assert(/paintWestBackdrop/.test(spriteSrc) && /paintChargeVignette/.test(spriteSrc), "west backdrop + charge strip");
assert(/parseDemoFx/.test(uiSrc) && /demo === "fx=travel"/.test(uiSrc), "demo=fx=travel alias");
assert(/arctic_slope/.test(spriteSrc) && /bering_strait/.test(spriteSrc), "arctic nodes keep ice look");
assert(/paintWestBackdrop/.test(sceneSrc), "event painters use west backdrop");
console.log("ok travel/battle fx + west vignettes");

const life = createNewGame(content, { seed: 11, difficulty: "easy", name: "Alex Rourke", background: "scout" });
assert(playerOf(life).age === 34, "player starts aged 34");
assert(life.officers.every((o) => o.age != null), "every officer has an age");
assert(seasonOf(0).name === "Winter" && seasonOf(13).name === "Spring", "season names are Winter/Spring/Summer/Fall");
assert(seasonOf(26).name === "Summer" && seasonOf(40).name === "Fall", "summer and fall map");
assert(calendarYear(0) === 1985 && calendarYear(52) === 1986, "year 1985 calendar");
act(life, content, "raise_banner");
const age0 = playerOf(life).age;
const court = courtCandidates(life);
assert(court.some((o) => o.id === "hart"), "Hart is a court candidate in Bethel");
res = act(life, content, "court", { officerId: "hart" });
assert(res.ok, `court: ${res.message}`);
if (playerOf(life).courtingId === "hart") {
  res = act(life, content, "court", { officerId: "hart" });
  assert(res.ok, `marry: ${res.message}`);
}
assert(playerOf(life).spouseId === "hart", "player bound to Hart");
assert(life.officers.find((o) => o.id === "hart").spouseId === "player", "spouse ids bind both ways");
for (let i = life.week; i < 52; i++) {
  const ended = act(life, content, "end_week");
  assert(ended.ok, `year roll week ${i}`);
}
assert(life.week === 52, "year roll lands on week 52");
assert(playerOf(life).age === age0 + 1, `aged one year, got ${playerOf(life).age}`);
assert(life._season.name === "Winter", "week 52 is winter again");
const sample = sampleChronicle(createNewGame(content, { seed: 3, name: "Alex Rourke", background: "scout" }));
assert(sample.chronicle.some((c) => c.kind === "season"), "demo chronicle has season");
assert(sample.chronicle.some((c) => c.kind === "marriage"), "demo chronicle has marriage");
assert(sample.chronicle.some((c) => c.kind === "birth" || c.kind === "age"), "demo chronicle has birth or years");
assert(!/wolverine/i.test(JSON.stringify(sample.chronicle)), "chronicle copy is original IP");
const lifeSrc = readFileSync(new URL("../js/chronicle.js", import.meta.url), "utf8") + uiSrc;
assert(/get\("demo"\) === "chronicle"/.test(uiSrc) && /get\("demo"\) === "season"/.test(uiSrc), "chronicle/season demo hooks");
assert(!/wolverine/i.test(lifeSrc), "life layer must not use Wolverines");
console.log("ok chronicle seasons/age/marriage");

assert(MAX_GENERALS === 5, "five general slots");
assert(MISSION_TEMPLATES.length >= 12, `need 12 side-mission templates, got ${MISSION_TEMPLATES.length}`);
const missionIds = MISSION_TEMPLATES.map((t) => t.id);
assert(new Set(missionIds).size === missionIds.length, "duplicate mission templates");
["scout_road", "raid_depot", "escort_convoy", "rescue_officer", "sabotage", "radio_run"].every((id) =>
  assert(missionIds.includes(id), `missing mission ${id}`)
);

const staff = createNewGame(content, { seed: 21, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(staff, content, "raise_banner");
assert(playerGenerals(staff).length === 0, "solo start — no generals");
assert(openMissions(staff).length >= 1, "mission board opens with a bannered week-0 game");
const hartStaff = staff.officers.find((o) => o.id === "hart");
hartStaff.faction = "northern_front";
hartStaff.loyalty = 80;
hartStaff.region = "bethel";
assert(playerGenerals(staff).some((o) => o.id === "hart"), "court assignment fills a general slot");
assert(playerGenerals(staff).length <= MAX_GENERALS, "not over 5 generals");
const extra = createCustomOfficer(staff, { name: "Pat Quinn", war: 55, int: 55, pol: 55, chr: 55, personality: "merchant" });
assert(extra.ok, "custom still adds");
const pat2 = staff.officers.find((o) => o.id === extra.id);
pat2.faction = "northern_front";
pat2.loyalty = 80;
pat2.isGeneral = false;
assert(appointCandidates(staff).some((o) => o.id === pat2.id), "custom in court waits for appoint");
res = act(staff, content, "appoint", { officerId: pat2.id });
assert(res.ok && pat2.isGeneral, `appoint: ${res.message}`);
assert(playerGenerals(staff).length === 2, "two generals after appoint");
console.log(`ok general slots ${playerGenerals(staff).length}/${MAX_GENERALS} court ${playerCourt(staff).length}`);

const jobState = createNewGame(content, { seed: 22, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(jobState, content, "raise_banner");
seedDemoMissions(jobState);
const local = openMissions(jobState).find((j) => j.regionId === "cheyenne");
assert(local, "demo board has a Cheyenne job");
const beforeGold = jobState.gold;
res = act(jobState, content, "mission", { jobId: local.id });
assert(res.ok, `mission: ${res.message}`);
assert(res.sceneId, "mission opens a vignette id");
assert(local.done, "accepted job is consumed");
const hartJob = jobState.officers.find((o) => o.id === "hart");
hartJob.faction = "northern_front";
hartJob.loyalty = 80;
hartJob.region = "cheyenne";
hartJob.isGeneral = true;
assert(setGeneralOrder(jobState, "hart", "mission").ok, "side mission standing order");
seedDemoMissions(jobState);
res = act(jobState, content, "end_week");
assert(res.ok, "end week after mission order");
assert(
  jobState.log.some((l) => /ordered/.test(l.text) && (l.text.includes("Eli Hart") || /mission|clears|fails/.test(l.text))),
  "ordered general should run a side mission"
);
void beforeGold;
console.log("ok side missions");

const moreHunt = createNewGame(content, { seed: 4, difficulty: "easy", name: "Scout", background: "scout" });
act(moreHunt, content, "raise_banner");
assert(!visibleOfficers(moreHunt).some((o) => o.id === "silo" || o.id === "marsh"), "Silo and Marsh start hidden");
playerOf(moreHunt).region = "yukon_road";
res = act(moreHunt, content, "seek_legend");
assert(res.ok && res.revealed && visibleOfficers(moreHunt).some((o) => o.id === "silo"), `Silo contact: ${res.message}`);
playerOf(moreHunt).region = "kenai";
res = act(moreHunt, content, "seek_legend");
assert(res.ok && res.revealed && visibleOfficers(moreHunt).some((o) => o.id === "marsh"), `Marsh contact: ${res.message}`);
console.log("ok Silo/Marsh legend paths");

const missionSrc = readFileSync(new URL("../js/missions.js", import.meta.url), "utf8");
assert(!/wolverine/i.test(missionSrc), "mission copy must not use Wolverines");
assert(/get\("demo"\) === "generals"/.test(uiSrc) && /get\("demo"\) === "missions"/.test(uiSrc), "generals/missions demo hooks");
assert(/get\("demo"\) === "layout"/.test(uiSrc), "layout demo hook");
assert(/panel-title">Ruler/.test(uiSrc) && /court-strip/.test(uiSrc), "ruler plate + court strip");
assert(/get\("take"\) === "1"/.test(uiSrc), "missions take=1 vignette hook");
assert(/data-add-gen/.test(uiSrc), "court-strip ADD empty general slots");
assert(!/You card/.test(uiSrc), "layout copy uses court strip, not You card");
console.log("ok generals/missions demos");

assert(DUEL_CLOCK_S === 99, "duel clock is 99 seconds");
assert(expectedDuelSeconds() === 99, `11 exchanges should total 99s, got ${expectedDuelSeconds()}`);
assert(DUEL_MAX_EXCHANGES === 11, "11 exchanges when both stay up");
assert(beats("strike", "special") && beats("special", "guard") && beats("guard", "strike"), "RPS triangle");
assert(!beats("strike", "guard"), "strike loses to guard");
assert(isUnderdog({ war: 50, int: 40 }, { war: 90, int: 80 }), "underdog vs high WAR");
assert(!isUnderdog({ war: 68, int: 70 }, { war: 66, int: 55 }), "even WAR is not underdog");
assert(inGreen(0.5, greenWindow(false)) && !inGreen(0.1, greenWindow(false)), "green window timing");
assert(greenWindow(true)[1] - greenWindow(true)[0] > greenWindow(false)[1] - greenWindow(false)[0], "underdog wider green");

const dEven = createDuel({
  you: { id: "a", name: "A", title: "Scout", age: 34, personality: "loyalist" },
  youStats: { war: 68, int: 70, pol: 56, chr: 63 },
  foe: { id: "b", name: "B", title: "Volunteer", age: 40, personality: "loyalist" },
  foeStats: { war: 66, int: 55, pol: 58, chr: 72 },
});
assert(!dEven.underdog, "Hart-range fight is not underdog");
let guardHits = 0;
for (let i = 0; i < 11; i++) {
  resolveExchange(dEven, "guard", 0.5, "strike");
  guardHits += 1;
  if (dEven.result) break;
}
assert(dEven.exchangesDone === 11 || dEven.result, "a defensive fight runs the full slate or KOs");
assert(expectedDuelSeconds() >= 90 && expectedDuelSeconds() <= 108, "pacing near 99s");

const dGoliath = createDuel({
  you: { id: "a", name: "A", title: "Scout", age: 34, personality: "loyalist" },
  youStats: { war: 48, int: 70, pol: 56, chr: 63 },
  foe: { id: "marsh", name: "Cal Marsh", title: "Ranch Marshal", age: 52, personality: "loyalist", legend: true },
  foeStats: { war: 91, int: 64, pol: 58, chr: 80 },
});
assert(dGoliath.underdog, "Marsh is Goliath");
autoResolveDuel(dGoliath, () => 0.5);
assert(["you", "foe", "draw"].includes(dGoliath.result), "auto-resolve ends");

const yard = createNewGame(content, { seed: 31, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(yard, content, "raise_banner");
const hartY = yard.officers.find((o) => o.id === "hart");
assert(challengeCandidates(yard).some((o) => o.id === "hart"), "Hart is a challenge in Cheyenne");
const gold0 = yard.gold;
res = act(yard, content, "challenge", { officerId: "hart" });
assert(res.ok && res.duel && yard.phase === "duel", `challenge opens yard: ${res.message}`);
assert(yard.duel.clockS === 99, "live duel stores 99s clock");
assert(yard.duel.maxExchanges === 11, "live duel has 11 exchanges");
res = duelCmd(yard, "auto");
assert(res.ok && res.duelEnd, `duel auto: ${res.message}`);
assert(yard.phase === "strategy", "yard returns to map");
assert(hartY.wound || playerOf(yard).wound || res.duelEnd === "draw", "someone is marked or it was a draw");

const porch = createNewGame(content, { seed: 32, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(porch, content, "raise_banner");
seedDemoMissions(porch);
porch.missions.board = [
  {
    id: "job_porch",
    templateId: "porch_challenge",
    name: "Porch challenge",
    regionId: "cheyenne",
    week: 0,
    ap: 1,
    done: false,
  },
];
res = act(porch, content, "mission", { jobId: "job_porch" });
assert(res.ok && res.duel && porch.phase === "duel", `porch mission opens duel: ${res.message}`);
assert(porch.duel.deskId == null, "porch mission without node= stays a domestic yard");
assert(!porch.missions.board[0].done, "porch job waits until the yard closes");
res = duelCmd(porch, "auto");
assert(res.ok && porch.missions.board[0].done, "porch job consumed after duel");
const porchDesk = createNewGame(content, { seed: 45, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(porchDesk, content, "raise_banner");
porchDesk.missions.board = [
  {
    id: "job_porch_desk",
    templateId: "porch_challenge",
    name: "Porch challenge",
    regionId: "cheyenne",
    week: 0,
    ap: 1,
    done: false,
  },
];
const porchRoads = regionOf(porchDesk, "havana").neighbors.join(",");
res = act(porchDesk, content, "mission", { jobId: "job_porch_desk", deskId: "havana" });
assert(res.ok && porchDesk.duel.deskId === "havana", `porch mission can open on a desk: ${res.message}`);
assert(porchDesk.duel.arena.label === "HAVANA DESK", "porch desk replaces the domestic yard title");
assert(porchDesk.duel.clockS === 99 && porchDesk.duel.maxExchanges === 11, "porch desk keeps 99s / 11");
assert(regionOf(porchDesk, "havana").neighbors.join(",") === porchRoads, "porch desk does not rewrite the Havana road");
res = duelCmd(porchDesk, "auto");
assert(res.ok && porchDesk.phase === "strategy", "porch desk returns to the map");
const plainJob = createNewGame(content, { seed: 22, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(plainJob, content, "raise_banner");
seedDemoMissions(plainJob);
const plainLocal = openMissions(plainJob).find((j) => j.regionId === "cheyenne");
const deskJob = createNewGame(content, { seed: 22, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(deskJob, content, "raise_banner");
seedDemoMissions(deskJob);
const deskLocal = openMissions(deskJob).find((j) => j.regionId === "cheyenne");
const plainRes = act(plainJob, content, "mission", { jobId: plainLocal.id });
const deskRes = act(deskJob, content, "mission", { jobId: deskLocal.id, deskId: "kr_inland" });
assert(plainRes.ok && deskRes.ok && plainRes.deskId == null && deskRes.deskId === "kr_inland", "mission result carries only a locked desk");
assert(plainJob.gold === deskJob.gold && plainJob.food === deskJob.food, "mission desk does not change the reward");
const badDesk = createNewGame(content, { seed: 22, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(badDesk, content, "raise_banner");
seedDemoMissions(badDesk);
const badLocal = openMissions(badDesk).find((j) => j.regionId === "cheyenne");
res = act(badDesk, content, "mission", { jobId: badLocal.id, deskId: "nome" });
assert(res.ok && res.deskId == null && badDesk.gold === plainJob.gold, "unknown mission node= stays a domestic job");
void gold0;
void actingStats;

const duelSrc = readFileSync(new URL("../js/duel.js", import.meta.url), "utf8");
assert(!/wolverine|tekken|street fighter/i.test(duelSrc + uiSrc), "duel copy is original IP");
assert(/get\("demo"\) === "duel"/.test(uiSrc), "demo=duel hook");
assert(/goliath/.test(uiSrc), "demo=duel&goliath=1 hook");
assert(MISSION_TEMPLATES.some((t) => t.id === "porch_challenge" && t.duel), "porch_challenge mission is a duel");
assert(DUEL_STYLES.length >= 8, "at least 8 fighting styles");
assert(new Set(DUEL_STYLES.map((s) => s.id)).size === DUEL_STYLES.length, "unique style ids");
assert(new Set(DUEL_STYLES.map((s) => s.special.label)).size === DUEL_STYLES.length, "distinct special names");
assert(Object.keys(DUEL_ARENAS).length >= 8, "at least 8 arenas");
assert(Object.keys(DUEL_OUTFITS).length >= 8, "at least 8 outfits");
assert(pickArena("bethel", "winter").id === "roadhouse", "Bethel winter uses snowy roadhouse");
assert(pickArena("kenai", "summer").id === "foothills", "Kenai summer is foothills");
assert(pickArena("yukon_road", "winter").id === "radiotower", "Yukon is night radio tower");
assert(pickArena("denver", "summer").id === "gaslot", "Denver yard is a gas-station lot");
assert(pickArena("colorado_springs", "summer").id === "airstrip", "Springs yard is the gravel strip");
assert(pickStyle({ title: "Ranch Marshal", personality: "loyalist" }).id === "cavalry", "Marsh-type is cavalry");
assert(pickStyle({ title: "Bush Scout", background: "scout", personality: "loyalist" }).id === "guerrilla", "scout is guerrilla");
assert(pickOutfit({ title: "Signals Hand" }, "nome").id === "radio", "signals kit");
assert(pickOutfit({ title: "Slope Ghost", personality: "recluse" }, "arctic_slope", "winter").id === "parka", "arctic parka");

const dPierce = createDuel({
  you: { id: "a", name: "A", title: "Scout", personality: "schemer" },
  youStats: { war: 60, int: 80, pol: 40, chr: 40 },
  foe: { id: "b", name: "B", title: "Volunteer", personality: "loyalist" },
  foeStats: { war: 60, int: 50, pol: 50, chr: 50 },
  youStyleId: "marksman",
});
assert(dPierce.you.style.effect === "pierce", "marksman Aimed Shot");
const hpBefore = dPierce.foeHp;
resolveExchange(dPierce, "special", 0.5, "strike");
assert(dPierce.foeHp < hpBefore, "Aimed Shot still chips when Strike beats Special");

const dStun = createDuel({
  you: { id: "a", name: "A", title: "Volunteer", personality: "loyalist" },
  youStats: { war: 70, int: 50, pol: 50, chr: 72 },
  foe: { id: "b", name: "B", title: "Scout", personality: "cautious" },
  foeStats: { war: 60, int: 50, pol: 50, chr: 50 },
  youStyleId: "grappler",
});
resolveExchange(dStun, "special", 0.5, "guard");
assert(dStun.foeStun, "Throw stuns next beat");
const foeHp = dStun.foeHp;
resolveExchange(dStun, "strike", 0.5, "strike");
assert(!dStun.foeStun, "stun consumed");
assert(dStun.foeHp < foeHp, "stunned foe ate the Strike");

assert(/get\("style"\)/.test(uiSrc) && /get\("arena"\)/.test(uiSrc), "demo=duel&style= and arena= hooks");
assert(/style=brawler|youStyleId/.test(uiSrc), "brawler demo style override");
assert(/Special · \$\{/.test(uiSrc), "duel HUD unifies Special · style move");
assert(/function parkCoach/.test(uiSrc) && /function flushOverlays/.test(uiSrc), "overlays queue: park coach, one at a time");
assert(/Korea is the Sponsor Lane, then Korea, then Sheds — Korea inland \(kr_inland\)/.test(uiSrc), "coach names Sheds, the Korea inland road");
assert(/Focus one of those inland desks and NEXT names its foreign siege board: Cut the berm, Rake the parapet, Rush the gap/.test(uiSrc), "Raise-a-banner coach names the siege ploys");
assert(/A state frees when its ★ keys are yours/.test(uiSrc), "coach names when a state frees");
assert(/Reunify is the east walk already on the board: NE–KS–MO/.test(uiSrc), "coach names reunify as the east walk");
assert(/a title, not a leap/.test(uiSrc), "national leader is a title in the coach");
assert(/function campaignArcLine/.test(uiSrc) && /Eight name you national leader — not a leap/.test(uiSrc), "standing NEXT sequences the west bloc to the title");
assert(/foreignDesk/.test(uiSrc) && /return cue \? `\$\{line\}\\n\$\{cue\}` : line/.test(uiSrc), "domestic arc stays off the foreign siege block");
["kamchatka", "siberia", "havana", "managua", "sponsor_lane", "kr_inland"].forEach((id) => {
  assert(uiSrc.includes(`/?demo=siege&node=${id}`), `siege NEXT binds /?demo=siege&node=${id}`);
});
assert(/function inlandSiegeCue/.test(uiSrc) && /Siege desk:/.test(uiSrc) && /inlandSiegeCue\(sel\.id\)/.test(uiSrc), "NEXT appends the inland siege cue after the approach");
assert(/id="coach-siege"/.test(readFileSync(new URL("../index.html", import.meta.url), "utf8")), "coach card has a siege line");
assert(/id="obj-siege"/.test(readFileSync(new URL("../index.html", import.meta.url), "utf8")), "look NEXT stacks the siege cue in its own block");
const gameCss = readFileSync(new URL("../css/game.css", import.meta.url), "utf8");
assert(/body\.look-map \.objective span \{[^}]*white-space:\s*pre-wrap/.test(gameCss), "look NEXT keeps the approach and siege line break");
assert(/#coach-text \{[^}]*overflow-y:\s*auto/.test(gameCss), "coach text scrolls while the siege line is pinned");
assert(/checkpoint berm \(Lane\)/.test(uiSrc) && /label: "Sponsor Lane"/.test(uiSrc), "Sponsor Lane stays the Campaign short; siege flavor may say Lane");
assert(/ridge berm \(Inland Ridge\)/.test(uiSrc) && /label: "Sheds"/.test(uiSrc), "Sheds stays the Campaign short; siege flavor may say Inland Ridge");
assert(/demo"\) === "coach"[\s\S]{0,400}get\("focus"\)/.test(uiSrc), "coach demo reads focus so an inland desk opens its siege cue");
assert(/Cut the berm, Rake the parapet, Rush the gap/.test(readFileSync(new URL("../js/engine.js", import.meta.url), "utf8")), "travel hint names the same siege ploys");
assert(/--type:\s*16px/.test(readFileSync(new URL("../css/game.css", import.meta.url), "utf8")), "HUD type is 16px");
assert(!/militia horse scouts\. Original partisan kit/.test(missionSrc), "mission WEST copy shortened");
assert(/HIRE_LINE/.test(uiSrc) && /Plot → Hire fills an ADD chair/.test(uiSrc), "hire/ADD/coach share one path");
assert(/id: "hire"/.test(uiSrc) && /Fill an ADD chair/.test(uiSrc), "coach step 3 is hire into ADD chair");
assert(/plot: \["hire", "appoint", "court", "challenge"/.test(uiSrc), "plot tiles lead with hire/appoint");
assert(/slice\(-2\)/.test(uiSrc), "duel log is two lines");
assert(/max-height: 40px/.test(readFileSync(new URL("../css/game.css", import.meta.url), "utf8")), "duel log compact");
assert(/id="duel-next"/.test(pageSrc), "duel NEXT coach line");
assert(/function duelNextLine/.test(uiSrc), "duel coach names the next press");
assert(/function openDemoDuel/.test(uiSrc) && /stampDuelDesk\(state\.duel, node\)/.test(uiSrc), "demo=duel stamps node= onto the yard");
assert(/function activeDuelDesk/.test(uiSrc) && /demoDuelNode/.test(uiSrc), "duel chrome reads node= even if create dropped the desk");
assert(/duelDeskPrefix/.test(uiSrc) && /look\.read/.test(uiSrc), "duel NEXT leads with the desk read");
assert(/deskId: node \|\| undefined/.test(uiSrc), "demo=duel&node= binds a desk");
assert(/id="duel-desk"/.test(pageSrc), "duel desk strip is on the yard");
assert(/\.duel\[data-desk\]/.test(siegeCss) && /--desk-edge/.test(siegeCss), "duel edge tints from the desk id");
assert(/paintInlandDuelYard/.test(uiSrc), "duel yard paints the inland backdrop");
assert(/\.duel-next \{[^}]*background:\s*#f8d800/.test(siegeCss), "foreign desk does not recolor the amber NEXT");
const homeDuel = createDuel({
  you: { id: "a", name: "A", title: "Scout", personality: "loyalist" },
  youStats: { war: 55, int: 50, pol: 50, chr: 50 },
  foe: { id: "b", name: "B", title: "Volunteer", personality: "loyalist" },
  foeStats: { war: 55, int: 50, pol: 50, chr: 50 },
  regionId: "bethel",
  seasonId: "summer",
});
const iceDuel = createDuel({
  you: { id: "a", name: "A", title: "Scout", personality: "loyalist" },
  youStats: { war: 55, int: 50, pol: 50, chr: 50 },
  foe: { id: "b", name: "B", title: "Volunteer", personality: "loyalist" },
  foeStats: { war: 55, int: 50, pol: 50, chr: 50 },
  regionId: "bethel",
  seasonId: "summer",
  deskId: "kamchatka",
});
assert(homeDuel.deskId == null, "domestic duel has no desk");
assert(iceDuel.deskId === "kamchatka", "kamchatka duel stores the desk");
assert(homeDuel.clockS === 99 && homeDuel.maxExchanges === 11, "domestic clock stays 99s / 11");
assert(iceDuel.clockS === homeDuel.clockS && iceDuel.maxExchanges === homeDuel.maxExchanges, "desk does not change the clock");
assert(iceDuel.youMax === homeDuel.youMax && iceDuel.foeMax === homeDuel.foeMax, "desk does not change HP");
assert(iceDuel.green[0] === homeDuel.green[0] && iceDuel.green[1] === homeDuel.green[1], "desk does not change the green window");
assert(iceDuel.arena.id === homeDuel.arena.id, "desk does not swap the arena id");
assert(iceDuel.arena.label === "KAMCHATKA DESK", "desk title uses the siege strip");
assert(iceDuel.log[0].startsWith("Kamchatka desk"), "opening line names the Kamchatka desk");
assert(!/Snowy roadhouse/.test(iceDuel.log[0] + iceDuel.arena.label), "desk yard does not keep the roadhouse name");
assert(homeDuel.log[0].startsWith(homeDuel.arena.label), "domestic opening line stays the arena");
const winterHome = createDuel({
  you: { id: "a", name: "A", title: "Scout", personality: "loyalist" },
  youStats: { war: 55, int: 50, pol: 50, chr: 50 },
  foe: { id: "b", name: "B", title: "Volunteer", personality: "loyalist" },
  foeStats: { war: 55, int: 50, pol: 50, chr: 50 },
  regionId: "bethel",
  seasonId: "winter",
});
const winterDesk = createDuel({
  you: { id: "a", name: "A", title: "Scout", personality: "loyalist" },
  youStats: { war: 55, int: 50, pol: 50, chr: 50 },
  foe: { id: "b", name: "B", title: "Volunteer", personality: "loyalist" },
  foeStats: { war: 55, int: 50, pol: 50, chr: 50 },
  regionId: "bethel",
  seasonId: "winter",
  deskId: "havana",
});
assert(winterHome.deskId == null && winterHome.arena.label === "Snowy roadhouse", "winter Bethel stays the snowy roadhouse");
assert(winterDesk.deskId === "havana" && winterDesk.arena.label === "HAVANA DESK", "winter desk duel replaces the roadhouse title");
assert(winterDesk.clockS === winterHome.clockS && winterDesk.maxExchanges === winterHome.maxExchanges, "winter desk keeps 99s / 11");
assert(winterDesk.youMax === winterHome.youMax && winterDesk.green[0] === winterHome.green[0], "winter desk does not change HP or the green window");
assert(createDuel({
  you: { id: "a", name: "A", title: "Scout", personality: "loyalist" },
  youStats: { war: 55, int: 40, pol: 40, chr: 40 },
  foe: { id: "b", name: "B", title: "Volunteer", personality: "loyalist" },
  foeStats: { war: 55, int: 40, pol: 40, chr: 40 },
  deskId: "anchorage",
}).deskId == null, "unknown desk stays a domestic yard");
for (const id of INLAND_IDS) {
  const d = createDuel({
    you: { id: "a", name: "A", title: "Scout", personality: "loyalist" },
    youStats: { war: 55, int: 40, pol: 40, chr: 40 },
    foe: { id: "b", name: "B", title: "Volunteer", personality: "loyalist" },
    foeStats: { war: 55, int: 40, pol: 40, chr: 40 },
    regionId: "bethel",
    seasonId: "summer",
    deskId: id,
  });
  assert(d.deskId === id && d.log[0].startsWith(`${inlandDesk(id).line} —`), `${id} duel names its desk`);
  assert(d.clockS === DUEL_CLOCK_S && d.maxExchanges === DUEL_MAX_EXCHANGES, `${id} duel keeps 99s / 11`);
  assert(inlandLook(id).edge && inlandLook(id).read, `${id} duel can read the siege look`);
}
const hitHome = createDuel({
  you: { id: "a", name: "A", title: "Scout", personality: "loyalist" },
  youStats: { war: 60, int: 50, pol: 50, chr: 50 },
  foe: { id: "b", name: "B", title: "Volunteer", personality: "loyalist" },
  foeStats: { war: 60, int: 50, pol: 50, chr: 50 },
  youStyleId: "brawler",
  foeStyleId: "drill",
});
const hitDesk = createDuel({
  you: { id: "a", name: "A", title: "Scout", personality: "loyalist" },
  youStats: { war: 60, int: 50, pol: 50, chr: 50 },
  foe: { id: "b", name: "B", title: "Volunteer", personality: "loyalist" },
  foeStats: { war: 60, int: 50, pol: 50, chr: 50 },
  youStyleId: "brawler",
  foeStyleId: "drill",
  deskId: "havana",
});
resolveExchange(hitHome, "strike", 0.52, "guard");
resolveExchange(hitDesk, "strike", 0.52, "guard");
assert(hitHome.youHp === hitDesk.youHp && hitHome.foeHp === hitDesk.foeHp, "desk tint does not change hit math");
hitDesk.foeHp = 1;
resolveExchange(hitDesk, "strike", 0.52, "special");
assert(hitDesk.result === "you" && hitDesk.log.some((l) => l.includes("holds the Havana desk")), "win line names the desk");
const deskYard = createNewGame(content, { seed: 41, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(deskYard, content, "raise_banner");
const deskHere = playerOf(deskYard).region;
const managuaRoads = regionOf(deskYard, "managua").neighbors.join(",");
res = act(deskYard, content, "challenge", { officerId: "hart", deskId: "managua" });
assert(res.ok && deskYard.duel.deskId === "managua", `challenge can open on a desk: ${res.message}`);
assert(
  playerOf(deskYard).region === deskHere && regionOf(deskYard, "managua").neighbors.join(",") === managuaRoads,
  "duel desk does not rewrite the Managua road",
);
assert(deskYard.duel.clockS === 99 && deskYard.duel.maxExchanges === 11, "live desk duel keeps the yard clock");
res = duelCmd(deskYard, "auto");
assert(res.ok && deskYard.phase === "strategy", "desk duel still returns to the map");
const plainYard = createNewGame(content, { seed: 42, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(plainYard, content, "raise_banner");
res = act(plainYard, content, "challenge", { officerId: "hart", deskId: "not-a-desk" });
assert(res.ok && plainYard.duel.deskId == null, "bad node= stays the domestic yard");
for (const id of INLAND_IDS) assert(statusSrc.includes(`demo=duel&node=${id}`), `STATUS documents duel ${id}`);
assert(statusSrc.includes("Domestic yard, unchanged: `/?demo=duel`"), "STATUS notes the default duel");
assert(/\.duel-next \{[^}]*background:\s*#f8d800/.test(siegeCss), "duel NEXT is amber");
assert(/\.duel-next \{[^}]*color:\s*#000000/.test(siegeCss), "duel NEXT text is black");
assert(/style-stripe/.test(pageSrc) && /duel-you-hit/.test(pageSrc), "duel style stripe and damage read");
assert(/Next week may bring/.test(uiSrc), "week tease on NEXT and week report");
assert(/get\("demo"\) === "week"/.test(uiSrc) && /weekReportHtml/.test(uiSrc), "demo=week shows the week report");
assert(/get\("demo"\) === "states"/.test(uiSrc) && /demo"\) === "map"/.test(uiSrc), "demo=states / demo=map hook");
assert(/get\("demo"\) === "look"/.test(uiSrc) && /demo"\) === "terrain"/.test(uiSrc), "demo=look / demo=terrain hook");
const terrainSrc = readFileSync(new URL("../js/terrain.js", import.meta.url), "utf8");
assert(/playerOf\(state\)\.region = "cheyenne"/.test(uiSrc) && /pulseTravel\("cheyenne", "denver"/.test(uiSrc), "look demo here-chip is Cheyenne and the pulse stays on the Front Range road");
["sacramento", "los_angeles", "reno", "las_vegas"].forEach((id) => {
  assert(content.regions.regions.some((r) => r.id === id), `campaign city ${id} is on the board`);
});
assert(content.regions.regions.find((r) => r.id === "cheyenne").startOwner == null, "Cheyenne starts unowned so a banner can rise");
assert(/get\("demo"\) === "start"/.test(uiSrc), "cold new-game demo leaves the here chip on Cheyenne");
assert(/los_angeles/.test(terrainSrc) && /las_vegas/.test(terrainSrc) && /reno/.test(terrainSrc) && /sacramento/.test(terrainSrc), "CA/NV cities use original 80s markers");
assert(/BIOME\.wetforest/.test(terrainSrc) && /WET_IDS/.test(terrainSrc) && /RAIN_SHADOW/.test(terrainSrc), "PNW wet forest / rain-shadow bands");
assert(/id === "seattle"/.test(terrainSrc) && /olympia/.test(terrainSrc) && /spokane/.test(terrainSrc), "PNW city marker kinds");
assert(/paintTheaterTerrain/.test(terrainSrc) && /draw80sMarker/.test(terrainSrc), "painterly terrain + 80s markers");
assert(/drawFactionFlag/.test(terrainSrc) && /drawCityNode/.test(terrainSrc), "city node + faction flag overlay");
assert(/#f8f4e8/.test(terrainSrc) && /hazeCoast/.test(terrainSrc), "pale topo roads and coast haze");
assert(/0\.28/.test(terrainSrc), "ownership wash stays light enough to read the coast");
assert(/const TW = 1000/.test(terrainSrc) && /const MAP_S = 1/.test(terrainSrc), "terrain paints at map resolution");
assert(/if \(state\.mainland\) fillPoly\(mx, state\.mainland\)/.test(terrainSrc), "mainland outline is the land fill");
assert(!/st\.polygon\) fillPoly\(mx/.test(terrainSrc), "state rectangles are not the land mask");
assert(/function landRgb/.test(terrainSrc) && /stateLines/.test(terrainSrc), "biomes are texture; state lines are borders");
assert(/id="legend-card" hidden/.test(readFileSync(new URL("../index.html", import.meta.url), "utf8")), "banner list is hidden and off the map");
assert(/look-map/.test(uiSrc) && /body\.look-map \.side/.test(readFileSync(new URL("../css/game.css", import.meta.url), "utf8")), "look demo gives the theater the pane");
assert(/body\.look-map \.map-caption \{[\s\S]*?text-overflow:\s*clip/.test(readFileSync(new URL("../css/game.css", import.meta.url), "utf8")) && /body\.look-map \.map-caption \{[\s\S]*?white-space:\s*normal/.test(readFileSync(new URL("../css/game.css", import.meta.url), "utf8")), "theater caption wraps instead of ellipsizing on the look pane");
assert(/demo"\) === "start"[\s\S]{0,80}look-map/.test(uiSrc), "cold start hides the side column so the map leads");
assert(/function drawCampaignRoads/.test(uiSrc) && /function roadEnds/.test(uiSrc), "short shared-border roads draw thicker than a one-pixel line");
assert(/e\.key === "l"/.test(uiSrc) && /function toggleLegend/.test(uiSrc), "L toggles banners without covering the Gulf");
assert(/drawStallFront/.test(uiSrc) && /isAdjacent\(state, prev, r\)/.test(uiSrc), "stall line follows existing roads only");
assert(/OCCUPIED_EAST/.test(uiSrc) && /#9a3b3b/.test(uiSrc) && !/OCCUPIED_EAST[\s\S]{0,80}CA /.test(uiSrc), "east of the stall washes occupied; CA stays bare");
assert(/function drawNukeScars/.test(uiSrc) && /Offutt/.test(uiSrc) && /Ellsworth/.test(uiSrc) && /Minot/.test(uiSrc), "nuke scars mark DC NY KC Offutt Minot GF Ellsworth");
assert(/function drawInvasionAxes/.test(uiSrc) && /Prairie Fire/.test(uiSrc) && /Border Fury/.test(uiSrc) && /Bering/.test(uiSrc), "phase names still exist for the banners panel");
assert(/state\.stateLines/.test(uiSrc) && /lower-48/.test(uiSrc), "every lower-48 postal is labeled on the theater");
assert(!/\n  scatterFeatures\(ctx, fields/.test(terrainSrc), "theater land does not stamp trees or mesas");
assert(/function frameWorld/.test(uiSrc) && /function drawGlobe/.test(uiSrc) && /btn-zoom-world/.test(readFileSync(new URL("../index.html", import.meta.url), "utf8")), "wheel and World button open a globe peek");
assert(/WORLD_DESKS/.test(uiSrc) && /far_russia/.test(uiSrc) && /far_cuba/.test(uiSrc) && /far_nicaragua/.test(uiSrc) && /function drawWorldCorridors/.test(uiSrc), "world view washes the foreign desks without new roads");
assert(/world-washes/.test(uiSrc) && /function drawWorldStrikes/.test(uiSrc) && /function frameNear/.test(uiSrc), "world coasts carry faction washes and unlabeled strike marks");
assert(/r\.id === "gulf_passage"/.test(uiSrc) && /function frameGulf/.test(uiSrc), "Gulf Sealift marker is painted on the gulf before travel unlocks");
assert(/function gulfDeskCaptionOn/.test(uiSrc) && /seaGate && gulfDeskCaptionOn\(\)/.test(uiSrc), "Gulf Sealift city plate yields when the desk caption is already up");
assert(/seaGate \? "" : \(known \? String\(r\.garrison\) : "\?"\)/.test(uiSrc), "Gulf Sealift plate does not add a garrison question chip");
assert(/=== "ca"/.test(uiSrc) && /=== "world"/.test(uiSrc), "look demo can frame California or the globe");
assert(/function frameBering/.test(uiSrc) && /function frameCuba/.test(uiSrc) && /=== "bering"/.test(uiSrc) && /=== "cuba"/.test(uiSrc), "look demo can frame the Bering and Cuba foreign theaters");
assert(/focus = "bering"/.test(uiSrc) && /focus = "cuba"/.test(uiSrc) && /function topoRgb/.test(uiSrc) && /178\.5, 65\.3/.test(uiSrc), "foreign close-ups keep relief, desk captions, and the locked sea paths in frame");
assert(/function frameKorea/.test(uiSrc) && /=== "korea"/.test(uiSrc) && /INLAND_DESKS/.test(uiSrc) && /kamchatka/.test(uiSrc) && /sponsor_lane/.test(uiSrc), "inland desks paint on the Bering, Cuba, and Korea close-ups");
assert(!/drawMapPlate\(/.test(uiSrc), "phase banners are not stamped on the land");
assert(/class="wash-key"/.test(readFileSync(new URL("../index.html", import.meta.url), "utf8")), "wash key sits in the header off the land");
assert(!/wolverine/i.test(uiSrc) && !/red dawn/i.test(uiSrc), "map copy stays original IP");
assert(/function drawHereChip/.test(uiSrc) && /plateAwayFromSelected/.test(uiSrc), "here chip stays off selected city");
assert(CLOSE_ZOOM > 1 && CLOSE_ZOOM < 1.4, "close zoom starts after the full-theater frame");
const cleanMid = mapLayerVisibility(1.7, false, null);
assert(cleanMid.close && cleanMid.clearRoads && cleanMid.cities && cleanMid.roads && !cleanMid.props && !cleanMid.plates && !cleanMid.yieldMarks && !cleanMid.chips, "mid close-up hides yield marks, plates, and chips");
const cleanClose = mapLayerVisibility(3.2, false, null);
assert(cleanClose.clearRoads && !cleanClose.badges && cleanClose.ownership && cleanClose.stateLabels, "closest zoom keeps ownership and state labels, drops badges");
const overview = mapLayerVisibility(1, false, null);
assert(!overview.close && overview.props && overview.plates && !overview.clearRoads, "full theater keeps the overview detail layer");
const world = mapLayerVisibility(0.22, false, null);
assert(!world.close && world.extras, "world zoom stays readable");
const detailOn = mapLayerVisibility(3.2, true, null);
assert(detailOn.close && detailOn.extras && detailOn.props && detailOn.plates && !detailOn.clearRoads, "detail toggle restores the close-up extras");
assert(mapLayerVisibility(2.4, false, "bering").extras && !mapLayerVisibility(2.4, false, "cuba").clearRoads, "foreign close-ups keep desk captions");
const detailGame = createNewGame(content, { seed: 9, difficulty: "easy", name: "Casey Flint", background: "scout" });
assert(stampMapDetail(detailGame, true) === "1" && detailGame.mapDetail === true, "detail toggle stamps the save");
const detailBack = deserialize(serialize(detailGame));
assert(detailBack.mapDetail === true && mapDetailFromSave(detailBack, false) === false && mapDetailFromSave(detailBack, true) === true, "the live detail preference wins over the save");
assert(mapDetailFromSave({}, false) === false && mapDetailFromSave({}, true) === true, "older saves stay on the current preference");
assert(/e\.key === "d"/.test(uiSrc) && /btn-map-detail/.test(readFileSync(new URL("../index.html", import.meta.url), "utf8")) && /MAP_DETAIL_KEY/.test(uiSrc), "D and the Detail button toggle close-up extras");
assert(/e\.ctrlKey \|\| e\.altKey \|\| e\.metaKey/.test(uiSrc) && /if \(overlayBusy\(\)\) return;/.test(uiSrc), "D ignores Ctrl Alt Meta and an open dialog");
assert(/stampMapDetail/.test(uiSrc) && /mapDetailFromSave/.test(uiSrc), "detail toggle is stamped on the save and the preference is what Continue keeps");
assert(/markerClaims/.test(uiSrc) && /chipClaims/.test(uiSrc) && /claimHits\(labelClaims/.test(uiSrc) && !/if \(soft\) return soft/.test(uiSrc) && !/relaxState/.test(uiSrc), "city labels treat markers, chips, and state tags as hard blocks");
assert(/cityLabelSizes/.test(uiSrc) && /drawLabelLeader/.test(uiSrc) && /closerToOwn/.test(uiSrc) && /mapCssScale/.test(uiSrc), "city labels shrink, lead, and stay nearer their own marker");
assert(/function drawCleanStallFront/.test(uiSrc) && /function drawCleanInvasionAxes/.test(uiSrc) && /function showTroopChip/.test(uiSrc), "clean close-up keeps a thin front, invasion arrows, and a troop badge");
assert(/function garrisonKnown/.test(uiSrc) && /garrisonKnown\(r\) \? String\(r\.garrison\) : "\?"/.test(uiSrc) && /function cityIsContested/.test(uiSrc), "a troop chip shows a number only when the tooltip would");
assert(!/stateWash\(r\.stateCode\)\?\.kind === "contested"/.test(uiSrc), "a split state alone does not reveal a garrison");
assert(!/clampCloseMarkers/.test(uiSrc) && !/mapView\.z = z2/.test(uiSrc) && /applyMapDrag/.test(uiSrc), "clean mode does not zoom the camera to fit markers");
{
  const gameScale = 0.448;
  const sizes = cityLabelSizes(14 / 3.2, 3.2, gameScale);
  assert(sizes.length > 0 && sizes.every((s) => s * 3.2 * gameScale >= LABEL_MIN_SCREEN - 0.05), "shrunk labels stay at least 8 screen px");
  const look = cityLabelSizes(14 / 3.2, 3.2, 1);
  assert(look.length > 0 && look.every((s) => s * 3.2 >= LABEL_MIN_SCREEN - 0.05) && look.some((s) => s * 3.2 * gameScale < LABEL_MIN_SCREEN - 0.05), "the 8px floor follows the canvas-to-CSS scale");
  const moveFn = uiSrc.slice(uiSrc.indexOf("function onMapPointerMove"), uiSrc.indexOf("function onMapPointerUp"));
  assert(/applyMapDrag/.test(moveFn) && !/mapView\.z\s*=/.test(moveFn), "the pointer handler pans without writing zoom");
  globalThis.localStorage = globalThis.localStorage || { getItem() { return null; }, setItem() {} };
  const mapEl = {
    width: 1000,
    height: 620,
    getBoundingClientRect() { return { left: 0, top: 0, width: 1000, height: 620 }; },
  };
  globalThis.document = {
    getElementById(id) { return id === "map" ? mapEl : null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    createElement() { return { width: 1, height: 1, getContext() { return {}; } }; },
    body: { classList: { add() {}, remove() {}, toggle() {} } },
    addEventListener() {},
  };
  const ui = await import("../js/ui.js");
  ui.mapView.z = 3.2;
  ui.mapView.x = -100;
  ui.mapView.y = 40;
  ui.mapView.drag = { sx: 0, sy: 0, x: -100, y: 40, moved: false };
  ui.onMapPointerMove({ clientX: 2, clientY: 1 });
  assert(ui.mapView.z === 3.2 && ui.mapView.x === -100 && ui.mapView.y === 40 && ui.mapView.drag.moved === false, "a short pointer move is not a drag");
  ui.onMapPointerMove({ clientX: 80, clientY: -25 });
  assert(ui.mapView.z === 3.2 && ui.mapView.x === -20 && ui.mapView.y === 15 && ui.mapView.drag.moved === true, "the pointer handler drags without changing zoom");
  const view = { x0: 0, y0: 0, x1: 312, y1: 194 };
  const slid = insetMarkerCenter(4, 90, 8, view);
  assert(slid && slid[0] >= 8 && slid[1] === 90, "a cut marker slides inside without a new zoom");
  const corner = insetMarkerCenter(1, 1, 8, view);
  assert(corner && corner[0] >= 8 && corner[1] >= 8, "a corner marker whose centre is in view slides inside");
  assert(insetMarkerCenter(-30, 90, 8, view) === null, "a marker whose centre is off-canvas is not used to move the camera");
}
assert(/letterboxCanvasPoint/.test(uiSrc) && /letterboxContains/.test(uiSrc), "map clicks use the drawn letterbox and ignore the empty bars");
{
  const rect = { left: 6, top: 171.2, width: 1428, height: 722.8 };
  const scale = Math.min(rect.width / 1000, rect.height / 620);
  const ox = rect.left + (rect.width - 1000 * scale) / 2;
  const oy = rect.top + (rect.height - 620 * scale) / 2;
  const clientX = ox + 352 * scale;
  const clientY = oy + 313 * scale;
  const [lx, ly] = letterboxCanvasPoint(clientX, clientY, rect, 1000, 620);
  const stretchX = ((clientX - rect.left) / rect.width) * 1000;
  const z = 3.2;
  const cheyenneX = 364 * z + (352 - 352 * z);
  assert(Math.abs(lx - 352) < 0.05 && Math.abs(ly - 313) < 0.05, "a click on drawn Denver stays on Denver");
  assert(Math.abs(stretchX - lx) > 20 && Math.abs(stretchX - cheyenneX) < Math.abs(stretchX - 352), "stretch mapping would drift that click toward Cheyenne");
  const fit = { left: 10, top: 20, width: 500, height: 310 };
  const [ax, ay] = letterboxCanvasPoint(110, 80, fit, 1000, 620);
  assert(Math.abs(ax - ((110 - 10) / 500) * 1000) < 0.05 && Math.abs(ay - ((80 - 20) / 310) * 620) < 0.05, "an unletterboxed canvas keeps the old click mapping");
  assert(letterboxContains(clientX, clientY, rect, 1000, 620), "a point on drawn Denver is inside the map");
  assert(!letterboxContains(rect.left + 4, oy + 200, rect, 1000, 620), "the empty bar left of the map is not a hit");
  assert(!letterboxContains(ox + 1000 * scale + 30, oy + 200, rect, 1000, 620), "the empty bar right of the map is not a hit");
  assert(/letterboxContains\(mx, my/.test(uiSrc), "hover and click ignore the letterbox bars");
}
assert(/territoryTipHtml/.test(uiSrc) && /Yield \+/.test(uiSrc) && /Works:/.test(uiSrc), "city report and hover keep levy yield and works");
const closeRoad = closeRoadWidth(3.2);
assert(Math.abs(closeRoad.casing * 3.2 - 7.2) < 0.05 && closeRoad.core < closeRoad.casing, "close roads shrink to about a third of the old cream bar");
assert(Math.abs(closeRoadWidth(1.7).casing * 1.7 - 7.2) < 0.05, "close road width scales with zoom");
assert(LABEL_ANCHOR === 1.5 && /LABEL_ANCHOR/.test(uiSrc) && /cityNamePx/.test(uiSrc), "city names stay within one and a half marker widths");
assert(/closeRoadWidth/.test(uiSrc) && /chordIsMisleading/.test(uiSrc), "close-up roads use the thin casing and the chord check");
assert(
  chordIsMisleading(230, ["MT", "MT", "WY", "WY", "SD", "SD", "SD", "SD", "", "NE", "NE", "IA"], "MT", "NE"),
  "a long chord across other states draws faint"
);
assert(!chordIsMisleading(154, ["WY", "WY", "NE", "NE", "NE", "", "IA"], "WY", "NE"), "a road that stays in its endpoint states stays solid");
assert(!chordIsMisleading(80, ["WA", "ID", "ID", "MT"], "WA", "MT"), "a short crossing stays solid");
assert(/BIOME\.forest/.test(terrainSrc) && /BIOME\.rockies/.test(terrainSrc) && /BIOME\.desert/.test(terrainSrc), "WA forest / Rockies / desert biomes");
assert(/paintIsoField/.test(terrainSrc) && /paintSiegeWall/.test(terrainSrc), "isometric field + siege wall");
assert(/originalFaceGrid/.test(terrainSrc) && /face-grid/.test(uiSrc), "original officer face grid");
assert(/city-oversee/.test(uiSrc), "city oversee portrait + AP");
assert(/selectedRegion = "denver"/.test(uiSrc), "states demo opens on Denver");
assert(/function campaignHtml/.test(uiSrc) && /btn-states/.test(uiSrc), "States dock + liberation board");
assert(/Cannot leap/.test(uiSrc) && /route locked/.test(uiSrc), "NEXT and board explain no-leap");
assert(/Geo:/.test(uiSrc), "city report shows geo tags");
assert(/id: "war_council"/.test(readFileSync(new URL("../js/engine.js", import.meta.url), "utf8")), "war council action");
assert(/flashDing/.test(uiSrc) && /CHAIR FILLED/.test(readFileSync(new URL("../js/engine.js", import.meta.url), "utf8")), "chair/fame ding");
const tease = weekTease(createNewGame(content, { seed: 3, difficulty: "easy", name: "Casey Flint", background: "scout" }));
assert(typeof tease === "string" && tease.length > 4, `weekTease: ${tease}`);
const hired = createNewGame(content, { seed: 3, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(hired, content, "raise_banner");
const free = hired.officers.find((o) => !o.faction && o.region === "cheyenne" && !o.hidden);
if (free) {
  hired.gold = 200;
  const hr = act(hired, content, "hire", { officerId: free.id });
  assert(hr.ok && hr.dings && hr.dings.length, `hire dings: ${hr.message}`);
}
console.log("ok yard duel 99s");

const personalities = new Set(content.officers.officers.map((o) => o.personality));
assert(personalities.size >= 6, "distinct personalities in data");

const lad = createNewGame(content, { seed: 31, difficulty: "easy", name: "Casey Flint", background: "scout" });
playerOf(lad).region = "bethel";
const hartLad = lad.officers.find((o) => o.id === "hart");
if (hartLad) hartLad.region = "bethel";
act(lad, content, "raise_banner");
assert(!createCustomOfficer(lad, { name: "Skip Rank", ladder: "general", personality: "loyalist" }).ok, "cannot create a general");
assert(
  !createCustomOfficer(lad, { name: "Over Budget", ladder: "player", war: 80, int: 80, pol: 80, chr: 80, personality: "loyalist" }).ok,
  "friend stats stay inside the budget"
);
const made = createCustomOfficer(lad, {
  name: "Sam Ivers",
  title: "Friend",
  personality: "loyalist",
  portrait: "F2",
  war: 58,
  int: 52,
  pol: 48,
  chr: 62,
  ladder: "player",
});
assert(made.ok && made.ladder === "player", "friend created as a player");
const sam = lad.officers.find((o) => o.id === made.id);
assert(sam.friend && sam.custom && sam.portrait === "F2" && sam.faction == null, "friend identity stored");
assert(ladderRankOf(sam) === "player" && ladderLabel("player") === "Player", "player rung");
assert(ladderRoster(lad).player.some((o) => o.id === sam.id), "roster lists the player rung");
assert(!hireCandidates(lad).some((o) => o.id === sam.id), "friends promote; they are not an RNG hire");
assert(!act(lad, content, "promote", { officerId: "player" }).ok, "commander is not promoted");
const hartFree = lad.officers.find((o) => o.id === "hart");
assert(!act(lad, content, "promote", { officerId: "hart" }).ok && hartFree.faction == null, "listed free officers still use hire");
regionOf(lad, "bethel").garrison = 90;
const blockedLead = act(lad, content, "attack", { regionId: "nome", auto: true, commanderId: sam.id });
assert(!blockedLead.ok && lad.phase === "strategy", `player cannot lead a march: ${blockedLead.message}`);
assert(regionOf(lad, "bethel").garrison === 90, "rejected lead does not spend the levy");
sam.region = "nome";
const away = act(lad, content, "promote", { officerId: sam.id });
assert(!away.ok && ladderRankOf(sam) === "player" && sam.region === "nome", "commission requires the same city");
sam.region = "bethel";
let step = act(lad, content, "promote", { officerId: sam.id });
assert(step.ok && step.rankChanged && step.from === "player" && step.to === "officer", step.message);
assert(step.message.includes("Player → Officer"), "officer confirmation");
assert(ladderRankOf(sam) === "officer" && sam.isGeneral === false, "officer rung is not a general");
assert(!playerGenerals(lad).some((o) => o.id === sam.id), "explicit officer is not auto-seated");
assert(promotedInCity(lad).some((o) => o.id === sam.id), "promoted officer can be selected in this city");
const yardRes = act(lad, content, "challenge", { officerId: "hart", actorId: sam.id });
assert(yardRes.ok && yardRes.duel && lad.duel.actorId === sam.id, `officer takes the yard: ${yardRes.message}`);
assert(lad.duel.you.id === sam.id, "yard fighter is the promoted officer");
const yardEnd = duelCmd(lad, "auto");
assert(yardEnd.ok && lad.phase === "strategy", "yard still closes");
step = act(lad, content, "promote", { officerId: sam.id });
assert(step.ok && step.to === "general" && step.rankChanged, step.message);
assert(/Officer → General \(1\/5\)/.test(step.message), "general confirmation counts the chair");
assert(sam.isGeneral && ladderRankOf(sam) === "general", "general rung");
assert(playerGenerals(lad).some((o) => o.id === sam.id), "general sits the court");
assert(!act(lad, content, "promote", { officerId: sam.id }).ok, "general does not promote again");
lad.ap = 8;
regionOf(lad, "bethel").garrison = 90;
const march = act(lad, content, "attack", { regionId: "nome", auto: true, commanderId: sam.id });
assert(march.ok, `general leads the field: ${march.message}`);
assert(
  lad.log.some((l) => l.text.includes("Sam Ivers") && l.text.includes("leads the column")),
  "field log names the promoted lead"
);
const kept = deserialize(serialize(lad));
const savedSam = kept.officers.find((o) => o.id === sam.id);
assert(savedSam.ladder === "general" && savedSam.friend && savedSam.isGeneral, "ladder survives save");

const bare = createNewGame(content, { seed: 32, difficulty: "normal", name: "Casey Flint", background: "scout" });
const barePal = createCustomOfficer(bare, {
  name: "Sam Ivers",
  ladder: "player",
  personality: "loyalist",
  war: 40,
  int: 40,
  pol: 40,
  chr: 40,
});
assert(barePal.ok, "friend can be created before a banner");
assert(!act(bare, content, "promote", { officerId: barePal.id }).ok, "promote waits for a banner");
assert(ladderRankOf(bare.officers.find((o) => o.id === barePal.id)) === "player", "still a player");

const capped = createNewGame(content, { seed: 33, difficulty: "easy", name: "Casey Flint", background: "scout" });
act(capped, content, "raise_banner");
capped.officers
  .filter((o) => o.id !== "player")
  .slice(0, 5)
  .forEach((o) => {
    o.faction = "northern_front";
    o.isGeneral = true;
    o.alive = true;
    o.retired = false;
  });
const sixth = createCustomOfficer(capped, {
  name: "Sam Ivers",
  ladder: "player",
  personality: "loyalist",
  war: 40,
  int: 40,
  pol: 40,
  chr: 40,
});
assert(act(capped, content, "promote", { officerId: sixth.id }).ok, "player still becomes an officer when chairs are full");
const sixthOff = capped.officers.find((o) => o.id === sixth.id);
assert(!act(capped, content, "promote", { officerId: sixth.id }).ok && !sixthOff.isGeneral, "sixth general is refused");
assert(playerGenerals(capped).length === 5, "cap stays at five");

const cssSrc = readFileSync(new URL("../css/game.css", import.meta.url), "utf8");
assert(/get\("demo"\) === "roster"/.test(uiSrc) && /=== "ladder"/.test(uiSrc), "demo=roster and demo=ladder");
assert(/get\("promote"\)/.test(uiSrc), "demo=roster&promote= hook");
assert(/id="btn-roster"/.test(readFileSync(new URL("../index.html", import.meta.url), "utf8")), "roster dock button");
assert(/data-promote/.test(uiSrc) && /roster-ladder/.test(uiSrc) && /roster-confirm/.test(uiSrc), "roster promote UI");
assert(/tag === "INPUT"/.test(uiSrc), "roster typing does not fire the End Week shortcut");
assert(/--type:\s*16px/.test(cssSrc), "HUD type stays 16px");
assert(/\.roster-ladder[\s\S]*font-size:\s*16px/.test(cssSrc) && /\.roster-confirm[\s\S]*#101010/.test(cssSrc), "roster type and contrast");
const officersFn = uiSrc.slice(uiSrc.indexOf("function officersHtml"), uiSrc.indexOf("function missionsHtml"));
assert(officersFn.includes('id="roster-create"') && officersFn.indexOf("roster-create") < officersFn.indexOf("rosterRungsHtml()"), "create-friend form is above the ladder lists");
assert(/demo"\) === "officers"/.test(uiSrc), "demo=officers final hook");
assert(/Nell Crowe/.test(terrainSrc) && /Jed Harrow/.test(terrainSrc) && /faceLabel/.test(terrainSrc), "faces have readable original names");
assert(/c-face-name/.test(uiSrc) && /f\.name/.test(uiSrc), "face picker shows the name");
assert(!/alt="\$\{f\.id\}"/.test(uiSrc), "face tiles are not labeled only F0–F15");
assert(/roster-next/.test(uiSrc) && /rank-badge rank-/.test(uiSrc) && /RANK CONFIRMED/.test(uiSrc), "roster NEXT, rank badges, and confirm banner");
assert(/\.court-strip \{[^}]*font-size:\s*13px/.test(cssSrc), "court strip type is larger");
assert(/\.court-next \{[^}]*#f8d800/.test(cssSrc) && /\.court-next \{[^}]*#000000/.test(cssSrc), "court NEXT is high contrast");
assert(/\.rank-badge\.rank-general[\s\S]*?#f8d800/.test(cssSrc) && /\.rank-badge\.rank-general[\s\S]*?#000000/.test(cssSrc), "general badge is high contrast");
assert(!/wolverine|tekken|street fighter|red dawn/i.test(terrainSrc), "face names stay original IP");
assert(/FRIEND ADDED/.test(uiSrc) && /just-ranked/.test(uiSrc) && /rank-stripe/.test(uiSrc), "friend added banner, rank flash, and rank stripe");
assert(/\.roster-create \.face-tile span \{[^}]*font-size:\s*12px/.test(cssSrc), "create face names are readable");
console.log("ok roster ladder");

console.log("ALL TESTS PASSED");
