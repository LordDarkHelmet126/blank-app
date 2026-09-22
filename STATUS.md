# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — ROTK7-style layout rhythm (ruler plate, city report, command verbs, court strip, chronicle).

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

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- Officer-game chrome: status bar (calendar + treasury), **Ruler** medallion plate (name/age/loyalty/WAR INT POL CHR), **City report** (econ/stores/levy/walls/order + plus/minus), **Command** Domestic/Plot/Military as compact icon+label tiles, center **Theater** map with caption bar (not an overlay), **Court** strip of 5 general chairs, **Chronicle** dock.
- Cultural presentation (original IP): officer-first identity, loyalty bar, court appointments, standing orders, city report, year/season on the calendar, banner list. 1980s resistance voice — no Koei names or assets.
- Prior generals, missions, coach, chronicle, travel/battle sprites kept.
- Demo: `/?demo=layout`

## Counts

- General slots: **5** (court strip)
- Mission templates: **12**
- AI officers: **131**
- Hidden legends: **3** (karr, silo, marsh)
- Custom officer cap: **10**

## What’s next (small bursts)

1. Later: keep growing the roster toward ~500 named officers
2. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
