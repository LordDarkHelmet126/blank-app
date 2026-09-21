# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-21 — ROTK7-style command column + event scenes (original art).

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice`, `/?demo=orders`, `/?demo=legend`, `/?demo=week`.
Officers: `/?demo=slice&panel=officers`. Spy event: `/?demo=slice&panel=spy`.

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- Left command column: large commander portrait, name, AP/week/season/city, then city GOLD/FOOD/POP/DEF, then Domestic / Plot / Military tabs
- Action buttons carry council or spy vignette thumbs. Spy / Hire / Alliance / Seek / plots open an Event Scene (vignette + portrait + copy)
- Original art wired: `art/portraits/portrait-commander.png`, `art/scenes/scene-council.png`, `art/scenes/scene-spy.png`
- Pixel HUD, walkable roads, AP loop, orders, custom officers, Yukon/Bering unchanged

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
