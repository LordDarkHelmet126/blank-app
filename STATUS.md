# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-20 — Yukon + Bering nodes; three later-theater factions now on the board.

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

- Map adds **3 nodes** (max 4): Whitehorse Road, Klondike Interior, Bering Ice
- Wired **Whitehorse Relay**, **Klondike Watch**, and **Bering Ice Pact** onto them (civilian/cautious, modest garrisons). Path is Fairbanks→Yukon→Klondike and Nome→Bering — not a shortcut to Bethel or the Slope
- Inga Yarrow sits the Pact; Ellen Haro / Bo Tagg staff the Yukon spur. Alaska v0.1 loop, Seek Legend, standing orders, and UI strips unchanged

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
