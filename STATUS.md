# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-21 — mid/late-1980s authenticity pass (kit, copy, unlocks).

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice`, `/?demo=orders`, `/?demo=legend`, `/?demo=week`.
Domestic photos: `/?demo=slice&cat=domestic`. Spy event: `/?demo=slice&panel=spy`.
Drill scene: `/?demo=slice&panel=drill`. Road pulse: `/?demo=slice&fx=travel`.

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- Era lock **1985–89**: audited tech, officer/faction/region copy, battle labels, and HUD help
- Vehicles: Jeeps, F-series pickups, early Humvees, M113s, Bradleys late — no MRAPs/JLTVs
- Air: Hueys then early Apaches, one A-10 or F-14 — no F-35s/drones
- Weapons: M16A2, AK-47, M60, TOW, Stinger. Products: analog radios, CRT sets, cassette logs, typewriters, landlines
- Pixel HUD, roads, AP loop, orders, custom officers, Yukon/Bering unchanged

## What’s next (small bursts)

1. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
