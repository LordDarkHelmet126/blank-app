# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-21 — uniform pixel chrome, photo tiles on every command, short flashes.

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice`, `/?demo=orders`, `/?demo=legend`, `/?demo=week`.
Domestic photos: `/?demo=slice&cat=domestic`. Military tiles: `/?demo=slice&cat=military`.
Spy event: `/?demo=slice&panel=spy`. Drill scene: `/?demo=slice&panel=drill`.
Road pulse: `/?demo=slice&fx=travel`. Hit flash: `/?demo=slice&fx=battle`.

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- One chrome token on HUD boxes, dropdowns, textareas, checkboxes, scene frames, and battle bar
- Every Domestic / Plot / Military action is a photo tile (tinted council/spy stills or 2× pixel scenes). No empty 32px thumbs
- Short motion: gold button press, 4-step scene fade, longer road pulse + pip hop, battle cell strobe
- 1985–89 kit lock kept (M16A2, Jeeps, M113s, Hueys). Roads, AP loop, orders unchanged

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
