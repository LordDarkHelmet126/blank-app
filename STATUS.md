# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-20 — data-driven officer roster grown to 52 original AI officers.

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

- `data/officers.json` now has **52 original AI officers** (was 14): varied personalities, stats, and factions across Alaska plus nearby Bering / Aleutian / south-pass pressure
- Not a 500-name dump. Ilya Karr remains the only hidden legend. Seek Legend, standing orders, and Command strip unchanged
- Tests expect a 40–60 original roster and still cover 12-week autoplay, battle, hire, orders, and the Karr path

## What’s next (small bursts)

1. Later (not this burst): Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
