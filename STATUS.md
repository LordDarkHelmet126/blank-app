# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-20 — command strip burst (March/Attack always on screen).

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice` (banner raised), `/?demo=week` (two autoplay weeks).

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- Pinned **Command** strip on the main UI: Raise Banner, Travel, Hire, and full-width **March/Attack** stay visible without scrolling
- Town/plot actions sit in a separate scrollable block above that strip
- Shorter week-report modal (headline + 6 personality lines; rest stays in the field log)

v0.1 loop is unchanged: Alaska map, weekly AP, 14 AI officers, 6 factions, battles, save/load.

## What’s next (small bursts)

1. Recruited generals: player-assignable orders instead of only AI auto-act
2. One more Alaska event + reveal path for legend Ilya Karr that’s obvious in-UI
3. Town & plots: show at least one domestic row without looking collapsed on short windows
4. Later (not this burst): grow JSON roster; Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
