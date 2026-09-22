# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — yard duel polish (timing band, hit juice, style balance). Field battles / M113 spawn still parked.

## Yard duel polish

- Even green band is 30% of the pick bar (~2.3s), centered. Underdog band is 56% (~4.2s) and labeled WIDE. The needle and move keys light while the band is open. Clock reads `81s` and shifts white, then red, late.
- Hits show a damage number, a spark, and a style-colored stripe on Special. The log stays two short lines. Cards read `Special · {name}` plus a one-word hint. NEXT and the coach stay off the yard.
- Style pass: Haymaker is the spike (strike +1, not +2). Dust Feint steals 3, not 5. Dress-Right mends 2. Throw stuns and adds a shove. Spur Charge is +2 only after a real hit. Snare Line bites on the set and taxes the next Strike. Static Burst is +4 on a win, +8 only for a timed underdog finisher. Flash colors no longer share gold/blue.

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

**Theater:** `/?demo=states` or `/?demo=map` (Denver selected from Bethel — route locked).
**States board:** dock → States (state → territories held/key · geo tags · adjacent or locked).

## Hierarchy

**STATE → territories** (cities/nodes). Every territory is takeable and tagged with its state. Liberating a state still means holding its **key territories** (★ on the States board).

**No leaping.** Travel, attack, and mission travel only along **adjacent** roads. Seeing a city does not let you jump there. NEXT explains “Cannot leap — take an adjacent road (X, Y).”

## Alternate routes (examples)

- Inside Passage **Juneau–Seattle** vs ALCAN **Yukon–Missoula**
- Interior cut-off **Anchorage–Yukon** vs the Fairbanks hub
- High Rockies pass **Jackson–Denver** vs Cheyenne rail
- Plains grade **Billings–Omaha** vs Cheyenne yards
- High desert **Salt Lake–Jackson** vs Junction orchards
- Redrock sun road **Moab–Denver** vs Junction
- Front Range **Denver–Omaha** / **Denver–Topeka** vs the long river-bluff chain

## Geo tags (weekly yields)

Each territory has farm / mine / fuel / water / sun / weather / defense (0–3). Held ground pays food and gold at End Week. Cultivate hits harder on farm/sun/water; commerce on mine/fuel/water; drill gets a sun bonus; fortify uses defense; harsh weather cuts yields. City report and States board show the tags.

Examples: Lincoln/Topeka **Farm 3**; Arctic Slope **Fuel 3 + Weather 3**; Klondike **Mine 3**; Grand Junction **Farm 3 + Sun 2**; Kodiak **Water 3 + Defense 2**.

## Campaign (unchanged)

Phase 1 liberate states. Phase 2 at **8** west-bloc US states (national leader). Phase 3 Russia/Cuba/Nicaragua stubs. Phase 4 sponsor can add Korea.

## Counts (exact)

- **US states: 11** · **Yukon: 1** · **territories on those units: 33** · **foreign stubs: 4** · **total nodes: 37**
- On-map factions: **17** · AI officers: **153** · legends: **3**
- Duel clock: **99s** / **11** exchanges

## Blockers

- None for running v0.1
- No licensed IP names (no Wolverines / Koei assets)
