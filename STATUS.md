# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-21 — parchment/ink PS-strategy look + walkable ink roads on every travel edge.

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

- Warm parchment HUD and ink map: city house-markers, double-line roads, period chrome. Battles use a still, banner-on-dirt field (no licensed sprites)
- Every neighbor pair has a drawn road; every road is a travel edge. Slope↔Yukon now walkable because those polygons share a border
- AP loop, Seek Legend, standing orders, custom officers, Yukon/Bering otherwise unchanged

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
