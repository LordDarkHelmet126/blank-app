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
} from "../js/engine.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const content = await loadContent();
const aiCount = content.officers.officers.length;
assert(aiCount >= 40 && aiCount <= 60, `AI roster should be 40–60 original officers, got ${aiCount}`);
const officerIds = content.officers.officers.map((o) => o.id);
assert(new Set(officerIds).size === officerIds.length, "duplicate officer ids");
assert(content.officers.officers.every((o) => o.name && o.bio && o.personality && o.region), "every officer needs name/bio/personality/region");
assert(content.officers.officers.filter((o) => o.legend).map((o) => o.id).join() === "karr", "single original legend remains Ilya Karr");
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
assert(!content.regions.regions.find((r) => r.id === "arctic_slope").neighbors.includes("yukon_road"), "POF Slope must not neighbor Yukon");
assert(!content.regions.regions.find((r) => r.id === "bethel").neighbors.includes("yukon_road"), "Bethel must not neighbor Yukon");

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
playerOf(spur).region = "nome";
res = act(spur, content, "travel", { regionId: "bering_strait" });
assert(res.ok && playerOf(spur).region === "bering_strait", `travel Bering: ${res.message}`);
assert(visibleOfficers(spur).some((o) => o.id === "haro"), "Relay clerk on board");
assert(visibleOfficers(spur).some((o) => o.id === "yarrow" && o.faction === "bering_pact"), "Yarrow wired to Ice Pact");
console.log("ok Yukon/Bering spur");

const personalities = new Set(content.officers.officers.map((o) => o.personality));
assert(personalities.size >= 6, "distinct personalities in data");
console.log("ALL TESTS PASSED");
