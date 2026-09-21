# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-21 — city nameplates, officer/command console chrome, battle counters + terrain frames + brief attack flash.

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice`, `/?demo=orders`, `/?demo=legend`, `/?demo=week`.

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- City marks are keep + pennant plus a parchment nameplate (faction stripe, short name, garrison or `?`). Roads and travel edges unchanged
- Officer roster and Command strip use early-2000s console chrome: gold ticks, beveled plates, framed portraits, stat chips. Original art only
- Short battle view draws ink terrain frames, square unit counters (type + HP), and a 160ms attack flash on strike/ambush. Still low-animation
- AP loop, Seek Legend, standing orders, custom officers, Yukon/Bering otherwise unchanged

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
