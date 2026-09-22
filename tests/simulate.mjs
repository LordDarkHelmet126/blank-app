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
  challengeCandidates,
  actingStats,
  weekTease,
  stateControl,
  tickCampaign,
  fireSponsor,
  travelUnlocked,
  isAdjacent,
  geoOf,
  geoYield,
  geoTags,
} from "../js/engine.js";
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
assert(cities.length >= 32 && cities.length <= 42, `Need Alaska + west + east-approach + foreign stubs, got ${cities.length}`);
const stateCodes = [...new Set(cities.map((r) => r.state))].sort();
assert(["AK", "CO", "ID", "KS", "MO", "MT", "NE", "OR", "UT", "WA", "WY", "YT"].every((s) => stateCodes.includes(s)), `missing states: ${stateCodes}`);
assert(cities.filter((r) => r.state === "CO").map((r) => r.id).sort().join() === "colorado_springs,denver,grand_junction", "Colorado city cluster");
assert(cities.every((r) => (r.unlockWeek || 0) === 0), "no week lock on the US theater");
assert(cities.find((r) => r.id === "juneau").neighbors.includes("seattle"), "Juneau ferry into Washington");
assert(cities.find((r) => r.id === "yukon_road").neighbors.includes("missoula"), "ALCAN into Montana");
assert(cities.find((r) => r.id === "denver").neighbors.includes("omaha"), "Colorado opens the plains east");
assert(cities.find((r) => r.id === "st_louis"), "east-approach St. Louis");
assert(content.regions.mainland?.length >= 6, "lower-48 landmass");
assert((content.regions.states || []).filter((s) => s.kind === "us").length === 11, "11 US states on this mid-step");
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
  assert(playerOf(state).region === "bethel", "start in Bethel");
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
const home = regionOf(battleState, "bethel");
home.garrison = 90;
res = act(battleState, content, "attack", { regionId: "nome", auto: true });
assert(res.ok, `attack: ${res.message}`);
assert(res.battleEnd === "atk" || res.battleEnd === "def", "battle must resolve");
assert(battleState.phase === "strategy", "returned from battle");
assert(battleState.log.some((l) => l.kind === "war"), "war log");
console.log(`ok battle: ${res.message}`);

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
hart.region = "bethel";
const beforeG = regionOf(orderState, "bethel").garrison;
const ordered = setGeneralOrder(orderState, "hart", "drill");
assert(ordered.ok, `set order: ${ordered.message}`);
assert(hart.standingOrder === "drill", "standing order persisted");
res = act(orderState, content, "end_week");
assert(res.ok, "end week after order");
assert(
  orderState.log.some((l) => l.text.includes("Eli Hart") && l.text.includes("drills") && l.text.includes("ordered")),
  "ordered general should drill at week end"
);
assert(regionOf(orderState, "bethel").garrison > beforeG, "drill should raise garrison");
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
res = act(leap, content, "travel", { regionId: "denver" });
assert(!res.ok && /leap|adjacent/i.test(res.message), `no leap Bethel→Denver: ${res.message}`);
res = act(leap, content, "travel", { regionId: "seattle" });
assert(!res.ok, "no leap Bethel→Seattle");
res = act(leap, content, "attack", { regionId: "denver", auto: true });
assert(!res.ok && /leap|adjacent|neighbor/i.test(res.message), `no leap attack: ${res.message}`);
assert(!isAdjacent(leap, "bethel", "denver"), "engine marks Denver non-adjacent from Bethel");
assert(isAdjacent(leap, "bethel", "anchorage"), "Anchorage is an adjacent road");
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
assert(stateControl(lib).every((s) => !s.liberated), "no state liberated from Bethel alone");
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
const local = openMissions(jobState).find((j) => j.regionId === "bethel");
assert(local, "demo board has a Bethel job");
const beforeGold = jobState.gold;
res = act(jobState, content, "mission", { jobId: local.id });
assert(res.ok, `mission: ${res.message}`);
assert(res.sceneId, "mission opens a vignette id");
assert(local.done, "accepted job is consumed");
const hartJob = jobState.officers.find((o) => o.id === "hart");
hartJob.faction = "northern_front";
hartJob.loyalty = 80;
hartJob.region = "bethel";
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
assert(challengeCandidates(yard).some((o) => o.id === "hart"), "Hart is a challenge in Bethel");
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
    regionId: "bethel",
    week: 0,
    ap: 1,
    done: false,
  },
];
res = act(porch, content, "mission", { jobId: "job_porch" });
assert(res.ok && res.duel && porch.phase === "duel", `porch mission opens duel: ${res.message}`);
assert(!porch.missions.board[0].done, "porch job waits until the yard closes");
res = duelCmd(porch, "auto");
assert(res.ok && porch.missions.board[0].done, "porch job consumed after duel");
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
assert(/--type:\s*10px/.test(readFileSync(new URL("../css/game.css", import.meta.url), "utf8")), "HUD type is 10px");
assert(!/militia horse scouts\. Original partisan kit/.test(missionSrc), "mission WEST copy shortened");
assert(/HIRE_LINE/.test(uiSrc) && /Plot → Hire fills an ADD chair/.test(uiSrc), "hire/ADD/coach share one path");
assert(/id: "hire"/.test(uiSrc) && /Fill an ADD chair/.test(uiSrc), "coach step 3 is hire into ADD chair");
assert(/plot: \["hire", "appoint", "court", "challenge"/.test(uiSrc), "plot tiles lead with hire/appoint");
assert(/slice\(-2\)/.test(uiSrc), "duel log is two lines");
assert(/max-height: 40px/.test(readFileSync(new URL("../css/game.css", import.meta.url), "utf8")), "duel log compact");
assert(/Next week may bring/.test(uiSrc), "week tease on NEXT and week report");
assert(/get\("demo"\) === "week"/.test(uiSrc) && /weekReportHtml/.test(uiSrc), "demo=week shows the week report");
assert(/get\("demo"\) === "states"/.test(uiSrc) && /demo"\) === "map"/.test(uiSrc), "demo=states / demo=map hook");
assert(/get\("demo"\) === "look"/.test(uiSrc) && /demo"\) === "terrain"/.test(uiSrc), "demo=look / demo=terrain hook");
const terrainSrc = readFileSync(new URL("../js/terrain.js", import.meta.url), "utf8");
assert(/get\("focus"\)/.test(uiSrc) && /"seattle"/.test(uiSrc) && /pulseTravel\("juneau", "seattle"/.test(uiSrc), "look demo defaults to Seattle + Juneau ferry pulse");
assert(/BIOME\.wetforest/.test(terrainSrc) && /WET_IDS/.test(terrainSrc) && /RAIN_SHADOW/.test(terrainSrc), "PNW wet forest / rain-shadow bands");
assert(/id === "seattle"/.test(terrainSrc) && /olympia/.test(terrainSrc) && /spokane/.test(terrainSrc), "PNW city marker kinds");
assert(/paintTheaterTerrain/.test(terrainSrc) && /draw80sMarker/.test(terrainSrc), "painterly terrain + 80s markers");
assert(/drawFactionFlag/.test(terrainSrc) && /drawCityNode/.test(terrainSrc), "city node + faction flag overlay");
assert(/#f0ece0/.test(terrainSrc) && /hazeCoast/.test(terrainSrc), "pale topo roads and coast haze");
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
const free = hired.officers.find((o) => !o.faction && o.region === "bethel" && !o.hidden);
if (free) {
  hired.gold = 200;
  const hr = act(hired, content, "hire", { officerId: free.id });
  assert(hr.ok && hr.dings && hr.dings.length, `hire dings: ${hr.message}`);
}
console.log("ok yard duel 99s");

const personalities = new Set(content.officers.officers.map((o) => o.personality));
assert(personalities.size >= 6, "distinct personalities in data");
console.log("ALL TESTS PASSED");
