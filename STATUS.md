# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — ROTK7-inspired chronicle (seasons, aging, marriage, children).

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

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- Calendar is weekly; HUD season is Winter / Spring / Summer / Fall (year starts 1985). Map + west vignettes tint with the season. Alaska nodes stay.
- Officers have age (player 34). Each 52 weeks they age 1; log “Aged to X”; 60+ frail; 68+ non-rulers may retire
- Plot → Court / Marry (same town, visit twice). Year roll can birth a hidden child seed (counts toward 10 custom slots; listed at 16)
- End Week opens a short chronicle strip on season change / year / life events, then the week report. Reuses event-scene
- Prior travel/battle loops and Rockies charge strips kept
- Original IP copy (no Koei names, no Wolverines)

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
