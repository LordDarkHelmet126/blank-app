# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-23 — Tip merge. Campaign coach siege cues sit on the live Combat siege board for the six locked inland ids. No new map nodes, roads, leaps, or terrain paint. Inland ids stay `kamchatka`, `siberia`, `havana`, `managua`, `sponsor_lane`, `kr_inland`. Week 0 is still Cheyenne. Phase names stay on the Banners dock.

## Coach → foreign siege

When the yellow NEXT strip or the Raise-a-banner coach focuses one of the six inland desks, a short siege line sits on the existing no-leap approach. Ploys stay **Cut the berm**, **Rake the parapet**, **Rush the gap**. Campaign map labels stay Kamchatka, Siberia, Havana, Managua, Sponsor Lane, and Sheds. The siege line may mirror Combat flavor lightly (Lane, Inland Ridge). Those demos open the live siege board.

| id | Campaign short | Siege demo |
|---|---|---|
| `kamchatka` | Kamchatka | `/?demo=siege&node=kamchatka` |
| `siberia` | Siberia | `/?demo=siege&node=siberia` |
| `havana` | Havana | `/?demo=siege&node=havana` |
| `managua` | Managua | `/?demo=siege&node=managua` |
| `sponsor_lane` | Sponsor Lane | `/?demo=siege&node=sponsor_lane` |
| `kr_inland` | Sheds | `/?demo=siege&node=kr_inland` |

Same board: `/?demo=battle&siege=1&node=<id>`. Field spawn (no siege board): `/?demo=battle&node=<id>`.

Coach with the cue: `/?demo=coach&focus=<id>` (Raise a banner). Map focus, NEXT only: `/?demo=look&focus=<id>`.

On the look demo the approach chain and the siege desk are separate blocks in the NEXT strip (the line break is kept). On the coach demo the Raise-a-banner copy scrolls in `#coach-text` while the siege desk line stays pinned under it.

## Inland siege hooks

Locked ids open the same siege board (WORKS / berm / parapet / Rush the gap) or the same field spawn. The hook is the id string. If Campaign has already set walls, those walls are WORKS. Opening SUPPRESS is the desk pressure preset.

| Id | Desk | Default WORKS | Opening pressure |
| --- | --- | --- | --- |
| kamchatka | Kamchatka Works | 56 | 0 |
| siberia | Siberia Column | 36 | 4 |
| havana | Havana Harbor | 48 | 16 |
| managua | Managua Works | 28 | 22 |
| sponsor_lane | Sponsor Lane | 32 | 8 |
| kr_inland | Inland Ridge | 40 | 12 |

Harder berm: `/?demo=siege&node=havana&walls=72`. Domestic siege stays `/?demo=siege` and `/?demo=battle&siege=1`.

## Combat polish

Yard duel stays **99s / 11 exchanges**. An amber **NEXT** line names the green-window press (1 Strike, 2 Guard, 3 Special · the style move) and turns green while the needle is in the band. Each fighter has a style stripe. Damage shows as **−N** on the card and over the yard.

Siege **WORKS** is red, **SUPPRESS** is amber, **LEVY** is white. The recommended ploy says **PRESS**; the others say **WAIT** or **LATER**. Meters, the amber NEXT line, and the ploy buttons stay stuck to the top so later impulses do not bury the controls. The siege log still lists every line.

Create-a-friend stays above the ladder. A new friend shows **FRIEND ADDED**. Promote still shows **RANK CONFIRMED**, and that row flashes. Rank stripes sit on the roster and the court chairs. Face names on the create grid are larger.

**Playtest:** `/?demo=duel` · `/?demo=officers` (`promote=1` / `promote=2`) · `/?demo=siege` (`walls=72`) · `/?demo=battle&siege=1` · `/?demo=look&fx=battle&hull=1`

## Officers final

Dock → **Roster** (same screen as Officers; also the Court strip button). The create-a-friend form is the first block in the modal. Each original face has a readable name (Nell Crowe and the rest — not F0–F15). Friends join as **Player**. Promote to **Officer**, then **General**. A yellow **RANK CONFIRMED** banner and a **NEXT** line name the rung. Rank badges on the roster and the court strip use large amber/white type. Promoted officers in your city can take the yard or lead a march.

**Playtest:** `/?demo=officers` (same screen as `/?demo=roster` and `/?demo=ladder`). Optional `promote=1` opens with Sam Ivers already an officer; `promote=2` opens with Sam already a general.

Campaign adjacency, leap rules, and the theater map are unchanged. Yard duel stays 99s / 11 exchanges.

## Siege board

Fortified bowls (walls ≥ 24, or urban) open a siege instead of treating walls as defender morale. You are the attacker. The garrison is the defender. **WORKS** is wall strength. Three ploys: **Cut the berm** (drops WORKS), **Rake the parapet** (fills SUPPRESS), **Rush the gap** (takes the place only when WORKS are low and the parapet is quiet). The amber NEXT line names the ploy. The siege log is one list on the battle scroller — older lines stay in the list. The siege **lifts** if the levy hits 0 or the watch runs out. Field fights, including the M113 spawn, stay on the isometric grid.

**Demo:** `/?demo=siege` (Anchorage from Bethel). Harder berm: `/?demo=siege&walls=72`. Same board from the battle hook: `/?demo=battle&siege=1`. Field M113 check is still `/?demo=look&fx=battle&hull=1` (Nome, not a siege).

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

**Theater look:** `/?demo=look` or `/?demo=terrain` (Denver selected, Cheyenne–Denver pulse). California frame: `/?demo=look&view=ca`. Cold new game: `/?demo=start`. Globe: `/?demo=look&view=world`. Officers: `/?demo=look&panel=officers`. Iso battle: `/?demo=look&fx=battle`. M113 hulls: `/?demo=look&fx=battle&hull=1`.

## US silhouette (this pass)

The lower 48 is one connected coastline — Florida, Texas, California, the Great Lakes, and New England. State borders are drawn inside that mask (a political map). Biomes are soft texture, not land tiles. Faction washes use each banner’s color: dark edge occupied, light edge contested, gold edge held. States with no cities east of the Cheyenne–Kansas–Missouri stall, including the Gulf and Texas, wash occupied in the existing invader red. Arizona and New Mexico stay unwash. California and Nevada wash from Sacramento, Los Angeles, Reno, and Las Vegas. A dashed stall line runs only on existing roads from Cheyenne through Kansas to St. Louis. Prairie Fire, Gulf, Border Fury, and Bering are names in the Banners panel (L), not plates on the land. Subtle arrows mark the Bering and the Rio Grande. Nuke scars are unlabeled crater marks at DC, Manhattan, Kansas City, Offutt, Minot, Grand Forks, and Ellsworth. The Occupied / Contested / Held key is in the theater header. Alaska is the real outline; Yukon is the northwest spur. Banners sit in the side column, hidden until L or the Banners button — never on the land. `/?demo=look` and `/?demo=start` hide the side column, court, and chronicle, and compress the status strip so the theater leads. The theater caption uses its own line on those demos so season, route, and phase stay fully visible. Short stall links, the Cheyenne–Denver front, and the ten shared-border roads draw as a thicker stroke at US zoom. `/?demo=look&view=near` parks Cheyenne, Denver, Gulf Sealift, Cuba, and Nicaragua so those plates do not stack or run off the canvas. The look demo still opens on the Cheyenne–Denver road. A real new game also starts in Cheyenne: the city is unowned, Raise Banner founds Northern Front there, and the here chip is not Bethel. Cold start: `/?demo=start`. Every lower-48 postal is labeled, including CA and NV. Sacramento, Los Angeles, Reno, and Las Vegas sit on the land with original 80s marks (elevator, street, ranch, tower). Roads are neighbor-only: Eugene–Sacramento, Sacramento–Los Angeles, Sacramento–Reno, Los Angeles–Las Vegas, Reno–Las Vegas, Salt Lake–Las Vegas, plus the shared-border set Spokane–Portland, Spokane–Bend, Boise–Missoula, Boise–Jackson, Cheyenne–Salt Lake, Cheyenne–Lincoln, Denver–Lincoln, Reno–Salt Lake, Lincoln–Wichita, and Topeka–St. Louis. Gulf Sealift (`gulf_passage`) is painted on the gulf from week 0. Travel stays locked until phase 3: St. Louis → Gulf Sealift → Cuba → Nicaragua. `/?demo=look&view=gulf` frames that marker. Russia stays Nome → Bering. No leap edges. Land is a light political field: faction washes and state outlines, no tree or mesa stamps. Wheel, +/−, and drag pan the theater. `/?demo=look&view=world` is a full-globe faction wash (Soviet, bloc, allies, neutrals) on real coasts, with unlabeled strike marks and a header key. On the world view the lower 48 stays the state-line silhouette, with the sea card lifted so the faction coasts show around it. `/?demo=look&view=near` pulls in so that silhouette is readable beside Canada, the Gulf, and Cuba. `/?demo=look&view=bering` frames the strait so Nome, Bering, Russia, Kamchatka, and Siberia share one view, with Far East relief and the locked roads. `/?demo=look&view=cuba` frames Gulf Sealift, Cuba, Havana, Nicaragua, and Managua so those captions and the locked paths sit in the frame. `/?demo=look&view=korea` frames Sponsor Lane into Korea and the peninsula sheds. No direct Russia–Korea leap. Those zooms shade the coasts around the locked desks (`bering_strait`, `far_russia`, `gulf_passage`, `far_cuba`, `far_nicaragua`, `far_korea`). Arizona stays paint-only. No new inland or sponsor edges: Korea is a desk until Campaign unlocks the sponsor link. Sea marks only: Bering→Russia and the Gulf approach→Cuba/Nicaragua. No new roads. The lower 48 stays the state plate. `/?demo=look&view=ca` frames California and Nevada.

Terrain paints at 1000×620 (one pixel per map unit). Coasts are a hard cream rim. Roads are a cream line, and short stall and shared-border segments are drawn thicker. 1980s marks stay ranch, elevator, street, mill, tower, bunker, pump. HUD type is 16px; nameplates and state codes sit on solid high-contrast plates. Ownership wash is stronger, with a dark edge under the faction color. Selection and road pulses are steady or slow — no strobe.

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
