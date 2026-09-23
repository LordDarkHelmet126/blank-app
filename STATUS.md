# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-23 — Inland siege hooks for the locked foreign node ids. Combat only; map roads unchanged.

## Inland siege hooks

Locked ids open the same siege board (WORKS / berm / parapet / Rush the gap) or the same field spawn. The hook is the id string. Campaign still owns roads, leaps, and node paint. If the map node is missing, the demo still opens. If Campaign has already set walls, those walls are WORKS. Opening SUPPRESS is the desk pressure preset.

| Id | Desk | Default WORKS | Opening pressure |
| --- | --- | --- | --- |
| kamchatka | Kamchatka Works | 56 | 0 |
| siberia | Siberia Column | 36 | 4 |
| havana | Havana Harbor | 48 | 16 |
| managua | Managua Works | 28 | 22 |
| sponsor_lane | Sponsor Lane | 32 | 8 |
| kr_inland | Inland Ridge | 40 | 12 |

**Playtest (siege board):**

- `/?demo=siege&node=kamchatka`
- `/?demo=siege&node=siberia`
- `/?demo=siege&node=havana`
- `/?demo=siege&node=managua`
- `/?demo=siege&node=sponsor_lane`
- `/?demo=siege&node=kr_inland`

Same board from the battle hook: `/?demo=battle&siege=1&node=kamchatka` (and `siberia`, `havana`, `managua`, `sponsor_lane`, `kr_inland`).

Field spawn for the same ids (no siege board): `/?demo=battle&node=havana` (swap the id). Harder berm still works: `/?demo=siege&node=havana&walls=72`.

Prior yard / siege / court polish is unchanged. Domestic siege demo is still `/?demo=siege` and `/?demo=battle&siege=1`.

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

**Theater look:** `/?demo=look` or `/?demo=terrain` (Seattle selected, Juneau–Seattle pulse). Focus: `/?demo=look&focus=seattle`. Officers: `/?demo=look&panel=officers`. Iso battle: `/?demo=look&fx=battle`. M113 hulls: `/?demo=look&fx=battle&hull=1`.

## PNW polish (first theater pass)

WA–PNW is the hero biome on the look demo. West of the Cascades (Seattle / Olympia / Portland) is darker wet evergreen with Sound mist. A height ridge sits between the Sound and Spokane so the west→east road reads as a climb (no new leap edges). East WA is drier pine, still forest-family. Seattle mark is main-street; Olympia and Spokane are mills.

Look-demo paint fix: the “you are here” nameplate is a compact chip anchored above the home city (Bethel stays in AK, not on the Seattle box). Roads and selected plates are larger; ownership wash/edge is stronger.
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

- **US states: 11** · **Yukon: 1** · **territories on those units: 33** · **foreign stubs: 4** · **total nodes: 37**
- On-map factions: **17** · AI officers: **153** · legends: **3**
- Duel clock: **99s** / **11** exchanges

## Blockers

- None for running v0.1
- No licensed IP names (no Wolverines / Koei assets)
