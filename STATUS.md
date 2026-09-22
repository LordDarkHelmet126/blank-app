# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — duel variety: 8 arenas, 8 outfits, 8 fighting styles with named specials.

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

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- **Duel variety:** 8 arenas rotate by region/season/mission (ranch porch, snowy roadhouse, Colorado foothills, gravel airstrip, ice ford, gas-station lot, pine ridge, night radio tower). Not one repeated yard.
- **Outfits:** scout coat, gun-truck crew, APC crew, radio tech, ranch militia, officer dress, winter parka, fatigues — tied to title / type / region.
- **Fighting styles (8):** Brawler (Haymaker), Marksman (Aimed Shot pierce), Grappler (Throw stun), Cavalry (Spur Charge), Guerrilla (Dust Feint heal), Drill-Sergeant (Dress-Right), Trapper (Snare Line), Signals (Static Burst underdog finisher). Shown on the HUD; Special button uses the style name.
- Clock still **99s** / 11 exchanges. Underdog mode kept. Demos: `/?demo=duel`, `&style=brawler`, `&arena=foothills`, `&goliath=1`.

## Counts

- General slots: **5** (court strip)
- Mission templates: **13** (12 jobs + porch challenge duel)
- AI officers: **131**
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
