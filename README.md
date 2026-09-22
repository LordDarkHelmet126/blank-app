# Northern Front

Working title for an original-IP, officer-first sandbox. Invasion week 0, Alaska theater. Romance of the Three Kingdoms VII–style weekly AP, not a licensed ROTK product and not a Red Dawn tie-in (no Wolverines, no Koei assets).

**v0.1 vertical slice** — playable loop, expandable JSON roster (not a fake 500-officer dump).

## Why HTML / Canvas (not Godot 4)

Godot 4 is the long-term target, but this environment has no Godot editor/export toolchain. A static **HTML + ES modules + Canvas** prototype:

- runs with the Python 3 standard library (no pip, no engine install)
- keeps officers/factions/regions/tech as plain JSON you can grow toward ~500 officers
- is easy to headlessly simulate (see tests) so a 10+ week loop can be proven without a GPU

The combat layer is a short grid between strategy weeks with cheap 2–4 frame jeep / M113 / militia-horse loops — the same scope a Godot 2D port would keep.

## Run (exact)

You need a local HTTP server. Chrome blocks ES module `fetch` of JSON from `file://`.

From the repository root:

```bash
python3 -m http.server 8765
```

Then open:

```
http://127.0.0.1:8765/
```

Equivalent:

```bash
npm start
```

(also serves on port **8765**.)

If Python is missing, any static server in this folder works (`npx serve .`, etc.) as long as `index.html` is the site root and `/data/*.json` is reachable.

### First session (what “done” looks like)

1. New game → **Begin week 0** (name + background + difficulty). A week-1 coach and a yellow **NEXT** strip name the first click.
2. You start **alone** in the **Kuskokwim Lowlands (Bethel)**. Command opens on **Domestic**.
3. **Raise Banner** to found Northern Front (max **5 generals** later via Hire / Persuade).
4. Spend leftover AP (Commerce / Cultivate), then **End Week**.
5. AI officers act; their log lines include personality tags such as `[aggressive]` or `[schemer]`.
6. March into a neighbor (Nome is the usual first fight) for a short grid battle, or check Auto-resolve.
7. **Save** writes `localStorage` and downloads JSON. **Load** reads the browser slot, a file, or pasted JSON.

Play 10+ weeks without the UI locking: **End Week** is always available in strategy phase. If gold and food both hit 0, a cache event keeps the campaign movable.

Coach QA URL while the server is running: `/?demo=coach` (fresh week 0 with the coach forced on). Replay from **Help → Show week-1 coach**.

## Data files (expand later)

| File | Role |
|------|------|
| `data/officers.json` | AI roster + personalities + player template. `rosterCap` 500, `customOfficerSlots` 10. |
| `data/factions.json` | ~40 original groups. Nine are on the current board (Alaska six + Yukon/Bering); the rest load for later maps. |
| `data/regions.json` | Alaska eight plus Yukon Road, Klondike, and Bering Ice. |
| `data/tech.json` | Slow 1985–89 salvage unlocks (M16A2, Jeeps, M113s, Hueys; calendar + research points). |

Add objects; the engine does not assume a fixed officer count.

v0.1 ships **52 original AI officers** with distinct personalities (aggressive, cautious, diplomat, schemer, merchant, loyalist, ambitious, recluse). One is a **hidden legend** (`Ilya Karr`) until intel or Seek Legend.

## Tests

```bash
node tests/simulate.mjs
```

or `npm test`. Proves 12 autoplay weeks on Easy/Normal/Hard, save/load, a resolved battle, spy/alliance, and personality-tagged AI logs.

Optional screenshot URLs while the server is running: `/?demo=slice` (banner already raised), `/?demo=coach` (week-1 coach on a fresh game), and `/?demo=week` (two autoplay weeks).

Travel column (jeep pickup, M113, militia horse scout on gold roads): `/?demo=fx=travel` or `/?demo=travel` or `/?demo=slice&fx=travel`.
Battle charge strip (Rockies foothills + looping sprites): `/?demo=fx=battle` or `/?demo=battle` or `/?demo=slice&fx=battle`.
Travel event vignette: `/?demo=slice&panel=travel`.
Between-turn chronicle (season + aging + marriage + child): `/?demo=chronicle`.
Season tint only: `/?demo=season`.

## Layout

```
index.html
css/game.css
js/          engine, battle, UI
data/        JSON content
tests/       headless simulation
```
