# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — expand states: Alaska → Yukon → PNW / Mountain West (Colorado).

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice`, `/?demo=orders`, `/?demo=legend`, `/?demo=week`.
**Week-1 coach (forced):** `/?demo=coach`
Domestic photos: `/?demo=slice&cat=domestic`. Military tiles: `/?demo=slice&cat=military`.
Spy event: `/?demo=slice&panel=spy`. Drill scene: `/?demo=slice&panel=drill`.
Travel column (jeep / M113 / militia horse scout): `/?demo=fx=travel`, `/?demo=travel`, or `/?demo=slice&fx=travel`.
Battle charge (Rockies strip + 2–4 frame loops): `/?demo=fx=battle`, `/?demo=battle`, or `/?demo=slice&fx=battle`.
Travel vignette: `/?demo=slice&panel=travel`.
**Chronicle montage:** `/?demo=chronicle` (season + years + marriage + birth).
**Season tint:** `/?demo=season` (Spring 1985 map/vignette).
**Generals (5 slots + ADD):** `/?demo=generals`.
**Side missions board:** `/?demo=missions`.
**Mission vignette:** `/?demo=missions&take=1`.
**Layout (officer chrome):** `/?demo=layout`.
**Yard duel (~99s):** `/?demo=duel`.
**Underdog (Marsh):** `/?demo=duel&goliath=1`.
**Style:** `/?demo=duel&style=brawler` (or marksman, grappler, cavalry, guerrilla, drill, trapper, signals, cycle).
**Arena:** `/?demo=duel&arena=foothills` (porch, roadhouse, airstrip, iceford, gaslot, pineridge, radiotower).
**Expanded theater:** `/?demo=states` or `/?demo=map` (Denver selected; Juneau–Seattle pulses).

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- **Multi-state theater:** 28 cities in 9 states/territories — Alaska 8 + Yukon 2 + Bering 1 + WA 3 + OR 3 + ID 2 + MT 2 + WY 2 + UT 2 + CO 3.
- **Unlock:** all cities visible and walkable from week 0. No late-week gate. South roads: Anchorage → Juneau → Seattle (Inside Passage) and Fairbanks → Yukon → Missoula (ALCAN). Colorado via Salt Lake / Grand Junction or Cheyenne.
- **On-map banners:** 17 (prior 9 plus Pacific Spine, Timberline, Red Wharf, Pale Airlift, Rail Brotherhood, Copper Road, Idle Hour, Ember Campus).
- **Officers:** +17 western names (148 AI). Elites Vera Range (Springs) and Ivy Front (Denver). Three legends unchanged.
- Map paint: Alaska coast + lower-48 mainland, state tints/abbreviations, city plates, gold roads.
- Missions/duel arenas keyed for Seattle, Portland, Denver, Springs, Missoula, and other new cities.
- Demo: `/?demo=states` or `/?demo=map`.

## Counts

- States / territories on the board: **9** (AK, YT, WA, OR, ID, MT, WY, UT, CO)
- Cities / nodes: **28** (was 11; **+17**)
- On-map factions: **17** (was 9)
- General slots: **5** (court strip)
- Mission templates: **13** (12 jobs + porch challenge duel)
- AI officers: **148**
- Hidden legends: **3** (karr, silo, marsh)
- Custom officer cap: **10**
- Duel clock: **99s** / **11** exchanges

## What’s next (small bursts)

1. Later: keep growing the roster toward ~500 named officers
2. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
