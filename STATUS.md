# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-20 — custom officer creator (10 slots, fair caps, personality-gated skills).

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

- Officers panel **Create officer**: name, title, type, WAR/INT/POL/CHR (30–80 each, total ≤ 220), initials portrait placeholder
- Personality type gates standing-order skills (ROTK7-style aptitudes). Cap **10** custom originals. Save/load keeps them
- Map, Seek Legend, Command/Town strips unchanged

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
