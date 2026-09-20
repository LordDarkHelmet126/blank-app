# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-20 — player-assignable standing orders for recruited generals.

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice` (banner raised), `/?demo=orders` (Eli Hart hired with Drill order), `/?demo=week` (two autoplay weeks).

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- Recruited generals (up to 5) have a **standing order** on the You card: By personality, Drill, Commerce, Cultivate, Fortify, Safety, Spy, Hide, Salvage
- Orders cost no AP; they fire at **End Week**. Assigned work is tagged `— ordered.` in the log
- Player staff no longer launch independent attacks; Command strip **March/Attack** is still the player's war button
- Save/load keeps standing orders

## What’s next (small bursts)

1. One more Alaska event + reveal path for legend Ilya Karr that’s obvious in-UI
2. Town & plots: show at least one domestic row without looking collapsed on short windows
3. Later (not this burst): grow JSON roster; Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
