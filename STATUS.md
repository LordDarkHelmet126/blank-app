# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-23 — California and Nevada cities are on the silhouette. A new game starts in Cheyenne.

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

**Theater look:** `/?demo=look` or `/?demo=terrain` (Denver selected, Cheyenne–Denver pulse). California frame: `/?demo=look&view=ca`. Cold new game: `/?demo=start`. Globe: `/?demo=look&view=world`.

## US silhouette (this pass)

The lower 48 is one connected coastline — Florida, Texas, California, the Great Lakes, and New England. State borders are drawn inside that mask (a political map). Biomes are soft texture, not land tiles. Faction washes use each banner’s color: dark edge occupied, light edge contested, gold edge held. States with no cities east of the Cheyenne–Kansas–Missouri stall, including the Gulf and Texas, wash occupied in the existing invader red. Arizona and New Mexico stay unwash. California and Nevada wash from Sacramento, Los Angeles, Reno, and Las Vegas. A dashed stall line runs only on existing roads from Cheyenne through Kansas to St. Louis. Prairie Fire, Gulf, Border Fury, and Bering are names in the Banners panel (L), not plates on the land. Subtle arrows mark the Bering and the Rio Grande. Nuke scars are unlabeled crater marks at DC, Manhattan, Kansas City, Offutt, Minot, Grand Forks, and Ellsworth. The Occupied / Contested / Held key is in the theater header. Alaska is the real outline; Yukon is the northwest spur. Banners sit in the side column, hidden until L or the Banners button — never on the land. `/?demo=look` hides the side column, court, and chronicle so the theater fills the pane. The look demo still opens on the Cheyenne–Denver road. A real new game also starts in Cheyenne: the city is unowned, Raise Banner founds Northern Front there, and the here chip is not Bethel. Cold start: `/?demo=start`. Every lower-48 postal is labeled, including CA and NV. Sacramento, Los Angeles, Reno, and Las Vegas sit on the land with original 80s marks (elevator, street, ranch, tower). Roads are neighbor-only: Eugene–Sacramento, Sacramento–Los Angeles, Sacramento–Reno, Los Angeles–Las Vegas, Reno–Las Vegas, Salt Lake–Las Vegas, plus the shared-border set Spokane–Portland, Spokane–Bend, Boise–Missoula, Boise–Jackson, Cheyenne–Salt Lake, Cheyenne–Lincoln, Denver–Lincoln, Reno–Salt Lake, Lincoln–Wichita, and Topeka–St. Louis. Gulf Sealift (`gulf_passage`) is painted on the gulf from week 0. Travel stays locked until phase 3: St. Louis → Gulf Sealift → Cuba → Nicaragua. `/?demo=look&view=gulf` frames that marker. Russia stays Nome → Bering. No leap edges. Land is a light political field: faction washes and state outlines, no tree or mesa stamps. Wheel, +/−, and drag pan the theater. `/?demo=look&view=world` is a full-globe faction wash (Soviet, bloc, allies, neutrals) on real coasts, with unlabeled strike marks and a header key. On the world view the lower 48 stays the state-line silhouette, with the sea card lifted so the faction coasts show around it. `/?demo=look&view=near` pulls in so that silhouette is readable beside Canada, the Gulf, and Cuba. Sea marks only: Bering→Russia and the Gulf approach→Cuba/Nicaragua. No new roads. The lower 48 stays the state plate. `/?demo=look&view=ca` frames California and Nevada.

Terrain paints at 1000×620 (one pixel per map unit). Coasts are a hard cream rim. Roads are a thin gold line. 1980s marks stay ranch, elevator, street, mill, tower, bunker, pump. HUD type is 16px; nameplates and state codes sit on solid high-contrast plates. Ownership wash is stronger, with a dark edge under the faction color. Selection and road pulses are steady or slow — no strobe.

PNW still reads on the look demo: wet Sound forest, a Cascades ridge toward Spokane, Seattle as main-street. The new-game here chip is Cheyenne, not Bethel.
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

## Geo tags (weekly yields)

Each territory has farm / mine / fuel / water / sun / weather / defense (0–3). Held ground pays food and gold at End Week. Cultivate hits harder on farm/sun/water; commerce on mine/fuel/water; drill gets a sun bonus; fortify uses defense; harsh weather cuts yields. City report and States board show the tags.

Examples: Lincoln/Topeka **Farm 3**; Arctic Slope **Fuel 3 + Weather 3**; Klondike **Mine 3**; Grand Junction **Farm 3 + Sun 2**; Kodiak **Water 3 + Defense 2**.

## Campaign (unchanged)

Phase 1 liberate states. Phase 2 at **8** west-bloc US states (national leader). Phase 3 Russia/Cuba/Nicaragua stubs. Phase 4 sponsor can add Korea.

## Counts (exact)

- **US states: 13** · **Yukon: 1** · **territories on those units: 37** · **foreign stubs: 4** · **total nodes: 41**
- On-map factions: **17** · AI officers: **153** · legends: **3**
- Duel clock: **99s** / **11** exchanges

## Blockers

- None for running v0.1
- No licensed IP names (no Wolverines / Koei assets)
