# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-20 — Town & plots keeps a domestic row visible on short windows.

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

- Town & plots no longer collapses to a heading: **Seek Legend** plus **Drill / Commerce / Cultivate** stay pinned; extra plots scroll
- You + Region cards cap and scroll so they cannot eat the action strip; Field log may shrink on short windows
- Standing orders and Command March/Attack unchanged

## What’s next (small bursts)

1. Later (not this burst): grow JSON roster; Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
