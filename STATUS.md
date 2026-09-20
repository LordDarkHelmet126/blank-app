# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-20 — ~40 original factions in JSON; six wired into Alaska.

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice`, `/?demo=orders`, `/?demo=legend` (Slope selected, rumor + ? mark), `/?demo=week`.

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- `data/factions.json` now has **40 original groups**, each with name, short bio, pluses/minuses, and a personality lean
- **Sandbox subset stays the original six** (Front, POF, Holdouts, Compact, AURORA, Banner) so the eight-region map is not restacked
- The other 34 load into state as off-map / later-theater data (Yukon, Bering, Aleutians, Pacific, civic, mercenary). Ally UI, map legend, and AI pacts ignore them
- Seek Legend, standing orders, Command/Town strips unchanged. Godot still not installed — skipped

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
