# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — yard duel v0 (~99s clock, Strike/Guard/Special, David vs Goliath).

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

Optional: `/?demo=slice`, `/?demo=orders`, `/?demo=legend`, `/?demo=week`.
**Week-1 coach (forced):** `/?demo=coach`
Domestic photos: `/?demo=slice&cat=domestic`. Military tiles: `/?demo=slice&cat=military`.
Spy event: `/?demo=slice&panel=spy`. Drill scene: `/?demo=slice&panel=drill`.
Travel column (jeep / M113 / militia horse scout): `/?demo=fx=travel`, `/?demo=travel`, or `/?demo=slice&fx=travel`.
Battle charge (Rockies strip + 2–4 frame loops): `/?demo=fx=battle`, `/?demo=battle`, or `/?demo=slice&fx=battle`.
Travel vignette: `/?demo=slice&panel=travel`.
**Chronicle montage:** `/?demo=chronicle` (season + years + marriage + birth).
**Season tint:** `/?demo=season` (Spring 1985 map/vignette).
**Generals (5 slots + ADD):** `/?demo=generals`.
**Side missions board:** `/?demo=missions`.
**Mission vignette:** `/?demo=missions&take=1`.
**Layout (officer chrome):** `/?demo=layout`.
**Yard duel (~99s):** `/?demo=duel`.
**Underdog (Marsh):** `/?demo=duel&goliath=1`.

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- **Yard duel v0:** two officer cards (portrait, name/age/title, WAR-weighted stats, HP), Strike / Guard / Special with a green timing window, visible **99s countdown**. 11 exchanges × 9s (7.5s pick + 1.5s resolve) when both stay up. KO or clock → back to map with gold/fame/wound/loyalty.
- **David vs Goliath:** if foe WAR is much higher, UNDERDOG banner and a wider green window so skill can upset a legend.
- Entry: Plot/Military → **Challenge** (same city); mission template **Porch challenge** opens the yard instead of a roll. Standing orders auto-resolve the duel.
- Pixel navy HUD, original IP (no Tekken/SF/Koei/Wolverines). Coach, chronicle, missions, generals, layout chrome kept.
- Demo: `/?demo=duel` (Hart), `/?demo=duel&goliath=1` (Marsh). Tests auto-resolve (no 99s wait).

## Counts

- General slots: **5** (court strip)
- Mission templates: **13** (12 jobs + porch challenge duel)
- AI officers: **131**
- Hidden legends: **3** (karr, silo, marsh)
- Custom officer cap: **10**
- Duel clock: **99s** / **11** exchanges

## What’s next (small bursts)

1. Later: keep growing the roster toward ~500 named officers
2. Later: Godot 2D port if the toolchain exists

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
