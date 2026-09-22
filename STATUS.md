# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — playability pass (coach, labels, click feedback).

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
Road pulse: `/?demo=slice&fx=travel`. Hit flash: `/?demo=slice&fx=battle`.

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- Sticky **NEXT** strip names the next click (Raise Banner → spend AP → End Week)
- Dismissible week-1 coach with highlight rings; Help → Show week-1 coach. QA: `/?demo=coach`
- Panel titles + one-line purpose on You / City / Command / Map / Log / Scene / Battle
- Hover tooltips on command tiles (AP cost + lock reason). Live tiles lift; locked tiles grey
- Map caption + blinking selected city: click a city, gold roads are walkable
- After each action, the scene (and week report) suggests the next click
- 1985–89 kit lock kept. Roads, AP loop, orders unchanged

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
