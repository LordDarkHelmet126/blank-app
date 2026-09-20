# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-20 — in-UI reveal path for hidden legend Ilya Karr.

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

- ROTK7-style hidden officer: **Ilya Karr** (original Slope Ghost, not licensed IP)
- In-UI path: rumor on the Arctic Slope card + Officers list + **?** on the map; **Seek Legend** (Town & plots) names him; travel Fairbanks → Slope and Seek again to list him (Hire if you share the region)
- Spy/Hide on the Slope also advances the hunt; standing orders and Command March/Attack unchanged

## What’s next (small bursts)

1. Town & plots: show at least one domestic row without looking collapsed on short windows
2. Later (not this burst): grow JSON roster; Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
