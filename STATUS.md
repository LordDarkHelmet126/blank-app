# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-21 — hard pivot to 8/16-bit pixel HUD (not parchment/presentation).

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice`, `/?demo=orders`, `/?demo=legend`, `/?demo=week`.
Officers panel: `/?demo=slice&panel=officers`.

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- Dropped parchment/serif chrome. HUD is navy SNES-style windows: 4px pixel borders, flat palette, Press Start 2P (local `fonts/PressStart2P.ttf`)
- Map draws at 250×155 then nearest-neighbor 4×: dithered sea/land tiles, block city icons, chunky Bresenham roads (same travel edges)
- Buttons are menu bricks (inset pixel shadow, gold hover), not cards. Battle field uses 8px dither tiles and block counters
- Gameplay, AP loop, Seek Legend, orders, custom officers, Yukon/Bering, road↔neighbor bijection unchanged

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
