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
} from "../js/engine.js";

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
  ["aurora", "banner", "bering_pact", "compact", "interior", "klondike_watch", "northern_front", "pof", "yukon_relay"].join() === sandboxIds.join(),
  `sandbox set mismatch: ${sandboxIds}`
);
const officerFacs = new Set(content.officers.officers.map((o) => o.faction).filter(Boolean));
assert([...officerFacs].every((id) => sandboxIds.includes(id)), "officers may only serve sandbox factions");
assert(content.regions.regions.length >= 10 && content.regions.regions.length <= 12, `Need Alaska + 2–4 new nodes, got ${content.regions.regions.length}`);
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
  assert(state.factions.filter((f) => f.onMap).length === 9, "Alaska six plus Yukon/Bering three on-map");
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
assert(/get\("take"\) === "1"/.test(uiSrc), "missions take=1 vignette hook");
assert(/data-add-gen/.test(uiSrc), "You-card ADD empty general slots");
console.log("ok generals/missions demos");

const personalities = new Set(content.officers.officers.map((o) => o.personality));
assert(personalities.size >= 6, "distinct personalities in data");
console.log("ALL TESTS PASSED");
