# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-23 — California and Nevada are playable states on the silhouette. Week 0 starts in Cheyenne (`cheyenne`). Phase names stay on the dock. `/?demo=states`.

## Phase board (locked labels → our gates)

| Chip | When it is now | Gate already in the game |
|---|---|---|
| 1 Invasion Day | Always past at week 0. | Preface of phase 1. Bering + Rio Grande. Scar tag on Omaha only (Offutt glass). DC, Manhattan, Kansas City, and the Dakota sites are not nodes. |
| 2 Stall | Phase 1, before the failed offensive and before CO / KS / MO fall. | Cheyenne → Kansas / Missouri. Winter dig-in. Yukon stays a road. The line does not cross into Canada. |
| 3 Advent Crown | Phase 1, weeks 13–38, still before that breakout. | First offensive fails. Pressure on Seattle, Cheyenne, and St. Louis. |
| 4 Prairie Fire | CO, KS, or MO is held, before the eight-state leader. | West-to-east on states already on the board. Ridge Runners is Front Range copy, not a new owner. Eight west-bloc states still name a national leader. |
| 5 Gulf Hammer | National leader, Missouri not held yet. Subtitle: Long Rifle. | St. Louis is the gulf gate into Gulf Sealift. No new Gulf or Texas cities. |
| 6 Border Fury | Missouri is held and a state on this board is still short. | Clear the plains, California, and Nevada. |
| 7 Foreign desks | Every US state on this board is held. | Phase 3. Russia by Bering. Cuba and Nicaragua by Gulf Sealift. A sponsor may add Korea. |

Ground words, document only (map paint unchanged): **occupied** (invader), **contested** (local banner, empty ground, or a split state), **held** (your color, or a liberated state). Those washes track the fronts above. They are not a new paint pass.

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

**Theater look:** `/?demo=look` or `/?demo=terrain` (Seattle selected, Juneau–Seattle pulse). Focus: `/?demo=look&focus=seattle`. Phase 3 sealift: `/?demo=look&focus=gulf` (Gulf Sealift selected, St. Louis–Gulf–Cuba pulse). Officers: `/?demo=look&panel=officers`. Iso battle: `/?demo=look&fx=battle`.

## PNW polish (first theater pass)

WA–PNW is the hero biome on the look demo. West of the Cascades (Seattle / Olympia / Portland) is darker wet evergreen with Sound mist. A height ridge sits between the Sound and Spokane so the west→east road reads as a climb (no new leap edges). East WA is drier pine, still forest-family. Seattle mark is main-street; Olympia and Spokane are mills.

Look-demo paint fix: the “you are here” nameplate is a compact chip anchored above the home city. Week 0 home is Cheyenne, on the Front Range, not a chip pasted onto Seattle. Roads and selected plates stay large; ownership wash stays high contrast. Phase names are not stamped on the land.
**States board:** dock → States (state → territories held/key · geo tags · adjacent or locked).
**States demo:** `/?demo=states` or `/?demo=map` still works.

## Visual pivot (not licensed art)

Theater is a painted topo (olive plains, brown mountains, blue water, coast haze) with a **node + pale road + faction-flag** overlay. Cities keep small 1980s American marks (ranch, elevator, pump, tower, bunker) under a square node and colored flag — not Chinese roofs, not licensed banners. Semi-transparent ownership wash. Nameplates only on selected / here / hover. Field battles stay isometric with strength bars. City report still has portrait + AP. Create-officer uses an original face grid.

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
- Caribbean **St. Louis → Gulf Sealift → Cuba** (Phase 3). No direct leap. A later southern wire would still use that channel.

## Geo tags (weekly yields)

Each territory has farm / mine / fuel / water / sun / weather / defense (0–3). Held ground pays food and gold at End Week. Cultivate hits harder on farm/sun/water; commerce on mine/fuel/water; drill gets a sun bonus; fortify uses defense; harsh weather cuts yields. City report and States board show the tags.

Examples: Lincoln/Topeka **Farm 3**; Arctic Slope **Fuel 3 + Weather 3**; Klondike **Mine 3**; Grand Junction **Farm 3 + Sun 2**; Kodiak **Water 3 + Defense 2**.

## Campaign

Phase 1 is Stall, then Advent Crown. Phase 2 at **8** west-bloc US states (AK–CO, not CA/NV) is Prairie Fire — national leader — then Gulf Hammer and Border Fury while any state on this board is still short. Phase 3 Foreign desks: Russia by Bering, Cuba and Nicaragua only through Gulf Sealift. Phase 4 sponsor can add Korea. Graph is 42 nodes / 130 directed roads. Start region id: `cheyenne`. New node ids: `sacramento`, `los_angeles`, `reno`, `las_vegas`.

## Counts (exact)

- **US states: 13** · **Yukon: 1** · **California keys:** `sacramento`, `los_angeles` · **Nevada keys:** `reno`, `las_vegas` · **foreign stubs: 4** · **sea approach: 1** (Gulf Sealift) · **total nodes: 42**
- On-map factions: **17** · AI officers: **153** · legends: **3**
- Duel clock: **99s** / **11** exchanges

## Blockers

- None for running v0.1
- No licensed IP names (no Wolverines / Koei assets)
