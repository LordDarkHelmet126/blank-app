# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — generals (5 slots), side missions (12 templates), roster jump (~131 AI officers).

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

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- **5 general slots** on the You card with ADD empty states. Hire fills a slot; extras join court; Plot → Appoint promotes. Custom officers still cap 10 (Create → Hire).
- **131 original AI officers** (was ~54). New named staff across sandbox factions, more free hires per city (especially Bethel), elites Brack / Lumen / Stave, hidden legends **Nils Silo** (Yukon Road) and **Cal Marsh** (Kenai) plus Ilya Karr.
- **12 side-mission templates** (scout road, raid depot, escort convoy, rescue officer, sabotage, radio run, cache, ford watch, airstrip, claim survey, ice listen, ranch relay). Board refreshes on End Week. 1 AP or a general’s Side mission standing order. Event vignettes with Alaska + western Rockies copy. Missions dock + Military tile + NEXT-strip hints.
- Hire / seek / alliance paths still work with the new names. Rescue missions can add a free officer to court.
- Prior coach, chronicle, travel/battle sprites kept. Original IP (no Wolverines, no Koei names).

## Counts

- General slots: **5**
- Mission templates: **12**
- AI officers added this burst: **+77** (total **131**)
- Hidden legends: **3** (karr, silo, marsh)
- Custom officer cap: **10** (unchanged)

## What’s next (small bursts)

1. Later: keep growing the roster toward ~500 named officers
2. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
