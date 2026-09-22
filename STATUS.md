# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — low-grade travel/battle loops + western Colorado Rockies vignettes.

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

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- Map travel: 2–4 frame jeep pickup, M113 APC, and militia horse scout hop along gold roads (~2.4s; demo loops)
- Battle + travel event scenes: scrolling ranch-road charge strip over a western Colorado foothills backdrop (mountains, pine, dry grass). Arctic Slope / Bering keep ice vignettes
- Pixel scene painters default to Rockies/West; spy/seek/hide stay arctic. Alaska map nodes unchanged
- Demo aliases `demo=fx=travel` / `demo=fx=battle` (malformed query still works) plus `demo=travel` / `demo=battle`
- Copy is original IP: partisan/militia cavalry and jeep columns. No licensed film unit names
- 1985–89 kit lock, pixel HUD, weekly AP loop, coach/playability kept

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
