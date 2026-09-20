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
} from "../js/engine.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const content = await loadContent();
const aiCount = content.officers.officers.length;
assert(aiCount >= 8 && aiCount <= 15, `AI roster should be 8–15, got ${aiCount}`);
assert(content.factions.factions.length >= 4 && content.factions.factions.length <= 6, "Need 4–6 factions");
assert(content.regions.regions.length >= 6, "Need an Alaska region set");

for (const diff of ["easy", "normal", "hard"]) {
  const state = createNewGame(content, { seed: 42 + diff.length, difficulty: diff, name: "Casey Flint", background: "scout" });
  assert(state.week === 0, "start week 0");
  assert(playerOf(state).region === "bethel", "start in Bethel");
  assert(!playerOf(state).faction, "start alone / no banner");
  assert(listActions(state).some((a) => a.id === "end_week" && a.enabled), "End Week always available");

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
const custom = createCustomOfficer(spyState, { name: "Pat Quinn", war: 55, personality: "merchant" });
assert(custom.ok, "custom officer slot");
assert(spyState.officers.some((o) => o.id === custom.id), "custom in roster");
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

const personalities = new Set(content.officers.officers.map((o) => o.personality));
assert(personalities.size >= 6, "distinct personalities in data");
console.log("ALL TESTS PASSED");
