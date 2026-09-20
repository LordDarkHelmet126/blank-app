# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-20 — v0.1 Alaska slice is playable on `cursor/northern-front-v01-2330` (PR #1).

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

## What landed (v0.1)

- HTML/Canvas prototype (Godot 4 not available here; documented in README)
- Alaska map (8 regions), week-0 start alone in Bethel
- Weekly AP: domestic, spy, hire (max 5 generals), alliance, plots, march
- 14 AI officers / 8 personalities; 6 factions with pluses/minuses
- Short grid battles + auto-resolve
- Slow salvage tech, Easy/Normal/Hard, save/load
- Expandable JSON (`data/*.json`) — no fake 500 roster
- Headless 12-week tests pass; browser pass through week 3 + Nome fight + save

## What’s next (small bursts)

1. Sidebar: keep March/Attack and Hire visible without scrolling the action grid
2. Week-report modal: shorter, personality filter, don’t bury the map
3. Recruited generals: player-assignable orders instead of only AI auto-act
4. One more Alaska event + reveal path for legend Ilya Karr that’s obvious in-UI
5. Later (not this burst): grow JSON roster; Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
