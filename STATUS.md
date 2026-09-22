# Northern Front — status

Cadence: ~15-minute bursts. After each chunk, keep the game runnable and update this file.

**Last checkpoint:** 2026-09-22 — Liberate the States mid-step + Phase 2–4 hooks.

## How to run

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

```bash
node tests/simulate.mjs
```

**Expanded theater:** `/?demo=states` or `/?demo=map` (Denver selected; Juneau–Seattle pulses).
**States board:** dock → States.

Do not open `index.html` as a `file://` page — ES modules + JSON `fetch` need HTTP.

## What landed (this burst)

- **Playable US mid-step:** Alaska → Yukon → PNW / Mountain West → plains east (Nebraska, Kansas, Missouri).
- **State control:** a US state is liberated when the player holds its key cities (not every hamlet). Gold state tags on the map; dock **States** board.
- **Phase 1** — Liberate the States (current play).
- **Phase 2** — **8 US states** (west bloc AK, WA, OR, ID, MT, WY, UT, CO) → national leader title, +AP, gold/food, war council unlock.
- **Phase 3** — Foreign thin nodes unlock: Russia (via Bering), Cuba, Nicaragua.
- **Phase 4** — Sponsor intervene event can add **Korea** as a takeable front.
- US/Yukon roads walkable week 0. Foreign nodes stay hidden until the matching phase.

## Counts (exact)

- **US states on the board: 11** (AK, WA, OR, ID, MT, WY, UT, CO, NE, KS, MO)
- **Territories: 1** (Yukon)
- **Political units labeled on-map: 12**
- **US/Yukon cities: 33** (Alaska 8 + Yukon 2 + Bering 1 + WA 3 + OR 3 + ID 2 + MT 2 + WY 2 + UT 2 + CO 3 + NE 2 + KS 2 + MO 1)
- **Foreign stub nodes: 4** (Russia, Cuba, Nicaragua, Korea)
- **Total map nodes: 37**
- On-map factions: **17**
- AI officers: **153**
- Hidden legends: **3**
- Phase 2 threshold: **8** US states
- Duel clock: **99s** / **11** exchanges

## What’s next (small bursts)

1. Flesh foreign theaters into their own maps
2. Later: keep growing the roster toward ~500 named officers

## Blockers

- None for running v0.1
- Godot 4 still not installed — stay on HTML/Canvas until that’s explicit
- No licensed IP names (no Wolverines / Koei assets)
