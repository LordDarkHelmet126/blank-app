/** Remote subdivisions stay dotted at world zoom, not only their capitals. */
const REMOTE = new Set(["AK", "HI", "YT", "NT"]);

/** Named capitals at world zoom. The rest stay dots so the northeast can be read. */
const WORLD_CAPS = new Set([
  "us.juneau",
  "us.honolulu",
  "ca.whitehorse",
  "ca.yellowknife",
  "ca.st_johns",
  "mx.mexico",
  "gt.guatemala",
  "cu.havana",
  "pa.panama",
  "co.bogota",
  "br.brasilia",
  "pe.lima",
  "ar.buenos_aires",
  "gb.london",
  "fr.paris",
  "de.bonn",
  "wb.west_berlin",
  "dd.east_berlin",
  "it.rome",
  "es.madrid",
  "se.stockholm",
  "gr.athens",
  "tr.ankara",
  "pl.warsaw",
  "cs.prague",
  "hu.budapest",
  "ro.bucharest",
  "bg.sofia",
  "yu.belgrade",
  "al.tirana",
  "ru.moscow",
  "ua.kiev",
  "by.minsk",
  "md.kishinev",
  "ee.tallinn",
  "lv.riga",
  "lt.vilnius",
  "ge.tbilisi",
  "am.yerevan",
  "az.baku",
  "kz.alma_ata",
  "uz.tashkent",
  "kg.frunze",
  "tj.dushanbe",
  "tm.ashkhabad",
  "ru.vladivostok",
  "ma.rabat",
  "dz.algiers",
  "eg.cairo",
  "sdn.khartoum",
  "il.jerusalem",
  "sa.riyadh",
  "ir.tehran",
  "iq.baghdad",
  "af.kabul",
  "sn.dakar",
  "ci.abidjan",
  "gh.accra",
  "bf.ouagadougou",
  "ng.lagos",
  "cm.yaounde",
  "zr.kinshasa",
  "et.addis",
  "so.mogadishu",
  "ke.nairobi",
  "tz.dar",
  "ao.luanda",
  "za.pretoria",
  "zw.harare",
  "mg.antananarivo",
  "pk.islamabad",
  "in.delhi",
  "bd.dhaka",
  "lk.colombo",
  "cn.beijing",
  "hk.central",
  "tw.taipei",
  "mn.ulaanbaatar",
  "kp.pyongyang",
  "kr.seoul",
  "jp.tokyo",
  "vn.hanoi",
  "th.bangkok",
  "mm.rangoon",
  "my.kuala_lumpur",
  "sg.singapore",
  "id.jakarta",
  "ph.manila",
  "au.canberra",
  "nz.wellington",
  "pg.port_moresby",
]);

const ATLAS_WORLD = new Set(["eu", "su", "me", "ssa", "asia", "world"]);

let catalog = null;
let territoryById = null;
let subdivisionById = null;
const collectCache = new Map();
const pointCache = new Map();

/** The validator imports world data itself. The game loads it on the first atlas view. */
export async function ensureWorldCatalog() {
  if (catalog) return catalog;
  const mod = await import("./world.js");
  catalog = mod.worldCatalog();
  territoryById = new Map();
  subdivisionById = new Map();
  catalog.regions.forEach((region) => {
    (region.subdivisions || []).forEach((sub) => subdivisionById.set(sub.id, sub));
    (region.territories || []).forEach((territory) => territoryById.set(territory.id, territory));
  });
  collectCache.clear();
  pointCache.clear();
  return catalog;
}

export function loadedCatalog() {
  return catalog;
}

/**
 * Atlas drawing is off in the live game. A demo frame code, or the debug flag
 * `atlasDebug`, is what turns it on. Zooming out does not.
 */
export function atlasMode(mapView) {
  if (!mapView || mapView.focus) return "off";
  if (ATLAS_WORLD.has(mapView.atlas)) return "world";
  if (mapView.atlasDebug && mapView.z < 0.55) return "world";
  if (mapView.atlas && mapView.atlas !== "us") return "state";
  return "off";
}

export function atlasSubdivision(code) {
  if (!code || !subdivisionById) return null;
  return subdivisionById.get(code) || null;
}

export function atlasTerritory(id) {
  if (!id || !territoryById) return null;
  return territoryById.get(id) || null;
}

function collect(mode, atlasCode) {
  const key = `${mode}|${atlasCode || ""}`;
  const cached = collectCache.get(key);
  if (cached) return cached;
  const all = catalog ? catalog.regions.flatMap((region) => region.territories) : [];
  if (!all.length || mode === "off") {
    const empty = { cities: [], links: [] };
    collectCache.set(key, empty);
    return empty;
  }
  let cities = all;
  if (mode === "world") {
    cities = all.filter((t) => t.role === "capital" || REMOTE.has(t.subdivision) || WORLD_CAPS.has(t.id));
  }
  if (mode === "state") {
    const states = new Set([atlasCode]);
    all.forEach((t) => {
      if (t.subdivision !== atlasCode) return;
      t.neighbors.forEach((n) => {
        const other = territoryById.get(n.id);
        if (other) states.add(other.subdivision);
      });
    });
    cities = all.filter((t) => states.has(t.subdivision));
  }
  const ids = new Set(cities.map((t) => t.id));
  const links = [];
  const seen = new Set();
  const source = mode === "world" ? all : cities;
  source.forEach((t) => {
    (t.neighbors || []).forEach((n) => {
      if (mode === "state" && (!ids.has(t.id) || !ids.has(n.id))) return;
      const pair = t.id < n.id ? `${t.id}|${n.id}` : `${n.id}|${t.id}`;
      if (seen.has(pair)) return;
      const other = territoryById.get(n.id);
      if (!other) return;
      seen.add(pair);
      links.push({ from: t, to: other, kind: n.kind });
    });
  });
  const packed = { cities, links };
  collectCache.set(key, packed);
  return packed;
}

function cityPoint(mode, atlasCode, pacific, project, city) {
  const key = `${mode}|${atlasCode || ""}|${pacific ? 1 : 0}`;
  let points = pointCache.get(key);
  if (!points) {
    points = new Map();
    pointCache.set(key, points);
  }
  let xy = points.get(city.id);
  if (!xy) {
    xy = project(city.lon, city.lat);
    points.set(city.id, xy);
  }
  return xy;
}

function nearCampaign(x, y, points) {
  return (points || []).some((p) => Math.hypot(p.x - x, p.y - y) < 42);
}

/** Screen-center longitude, so a date-line link can sit on the near side of the frame. */
function viewCenterLon(mapView) {
  const wx = (500 - mapView.x) / (mapView.z || 1);
  return ((wx - 36) / 942) * 57.9 - 124.8;
}

/**
 * The Bering Strait is a short hop. A straight line from Provideniya to Nome
 * would cross the whole atlas, so the segment is drawn on the copy nearest the view.
 */
function projectLink(project, mapView, from, to) {
  const lon1 = from.lon;
  const lon2 = to.lon;
  if (mapView.pacific || Math.abs(lon1 - lon2) <= 180) {
    const [x1, y1] = project(lon1, from.lat);
    const [x2, y2] = project(lon2, to.lat);
    return [x1, y1, x2, y2];
  }
  let a = lon1;
  let b = lon2;
  if (b - a > 180) b -= 360;
  else if (a - b > 180) a -= 360;
  const center = viewCenterLon(mapView);
  let bestA = a;
  let bestB = b;
  let bestD = Infinity;
  [-360, 0, 360].forEach((shift) => {
    const mid = (a + b) / 2 + shift;
    const d = Math.abs(mid - center);
    if (d < bestD) {
      bestD = d;
      bestA = a + shift;
      bestB = b + shift;
    }
  });
  const [x1, y1] = project(bestA, from.lat);
  const [x2, y2] = project(bestB, to.lat);
  return [x1, y1, x2, y2];
}

function screenPx(mapView, px) {
  return px / (mapView.z || 1);
}

function drawDot(ctx, mapView, x, y, selected, hover, mode) {
  const rad = screenPx(mapView, selected || hover ? 9 : mode === "state" ? 7 : 5);
  ctx.fillStyle = "#f8d800";
  ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  ctx.fillStyle = selected ? "#f8d800" : "#9a3b3b";
  const inset = Math.max(screenPx(mapView, 1.5), rad * 0.28);
  ctx.fillRect(x - rad + inset, y - rad + inset, rad * 2 - inset * 2, rad * 2 - inset * 2);
}

/**
 * Geographic atlas. Campaign markers stay on top of a close view;
 * a world city that sits on one of them is not drawn twice.
 */
export function drawWorldAtlas(ctx, opts) {
  const { mapView, project, campaignPoints, selectedId, hoverId, linksOnly } = opts;
  const mode = atlasMode(mapView);
  if (mode === "off" || !catalog) return;
  const { cities, links } = collect(mode, mapView.atlas);
  const extra = [];
  if (selectedId) {
    const sel = atlasTerritory(selectedId);
    if (sel && !cities.some((c) => c.id === sel.id)) extra.push(sel);
  }
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  if (!linksOnly) {
    const casing = screenPx(mapView, mode === "state" ? 8 : 3.2);
    const core = screenPx(mapView, mode === "state" ? 4 : 1.6);
    links.forEach((link) => {
      const [x1, y1, x2, y2] = projectLink(project, mapView, link.from, link.to);
      const sea = link.kind === "sea" || link.kind === "air";
      const rail = link.kind === "rail";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.setLineDash(sea ? [screenPx(mapView, 10), screenPx(mapView, 7)] : []);
      ctx.strokeStyle = "#1a0808";
      ctx.lineWidth = casing;
      ctx.stroke();
      ctx.strokeStyle = link.kind === "air" ? "#e7d4ff" : link.kind === "sea" ? "#d5e6f2" : rail ? "#e2b84a" : "#fff6d0";
      ctx.lineWidth = core;
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }
  const drawCity = (city) => {
    const [x, y] = cityPoint(mode, mapView.atlas, mapView.pacific, project, city);
    const selected = city.id === selectedId;
    const hover = city.id === hoverId;
    if (mode === "state" && nearCampaign(x, y, campaignPoints) && !selected && !hover) return;
    drawDot(ctx, mapView, x, y, selected, hover, mode);
  };
  if (!linksOnly) {
    cities.forEach(drawCity);
    extra.forEach(drawCity);
  }
  ctx.restore();
}

function anchorInView(view, x, y) {
  if (!view) return true;
  return x >= view.x0 && x <= view.x1 && y >= view.y0 && y <= view.y1;
}

function rectHits(a, b, pad) {
  return a.x < b.x + b.w + pad && a.x + a.w + pad > b.x && a.y < b.y + b.h + pad && a.y + a.h + pad > b.y;
}

function labelBox(ctx, mapView, city, detail) {
  const fontPx = screenPx(mapView, detail ? 13 : 11);
  ctx.font = `${fontPx}px 'Press Start 2P', 'Courier New', monospace`;
  ctx.textBaseline = "top";
  const name = city.short || city.name;
  const lines = detail
    ? [name, `${city.subdivision} · occupied`, (city.yields || []).slice(0, 3).join(" · ")]
    : [name];
  const tw = Math.max(...lines.map((line) => ctx.measureText(line).width));
  const lh = fontPx + screenPx(mapView, 3);
  const w = tw + screenPx(mapView, 10);
  const h = lh * lines.length + screenPx(mapView, 6);
  return { fontPx, lines, lh, w, h };
}

function paintLabel(ctx, mapView, px, py, box) {
  const { fontPx, lines, lh, w, h } = box;
  ctx.font = `${fontPx}px 'Press Start 2P', 'Courier New', monospace`;
  ctx.textBaseline = "top";
  ctx.fillStyle = "#000018";
  ctx.fillRect(px - screenPx(mapView, 2), py - screenPx(mapView, 2), w + screenPx(mapView, 4), h + screenPx(mapView, 4));
  ctx.fillStyle = "#f8d800";
  ctx.fillRect(px, py, w, h);
  ctx.fillStyle = "#101050";
  lines.forEach((line, i) => {
    if (!line) return;
    ctx.fillText(line, px + screenPx(mapView, 5), py + screenPx(mapView, 4) + i * lh);
  });
}

/** Names sit above state plates. Plates stay inside the frame and off each other. */
export function drawAtlasLabels(ctx, opts) {
  const { mapView, project, selectedId, hoverId, view, blocked } = opts;
  const mode = atlasMode(mapView);
  if (mode === "off" || !catalog) return;
  const { cities } = collect(mode, mapView.atlas);
  const list = cities.slice();
  if (selectedId && !list.some((c) => c.id === selectedId)) {
    const sel = atlasTerritory(selectedId);
    if (sel) list.push(sel);
  }
  const ranked = list
    .map((city) => ({
      city,
      selected: city.id === selectedId,
      hover: city.id === hoverId,
    }))
    .filter((row) => row.selected || row.hover || mode === "state" || (mode === "world" && WORLD_CAPS.has(row.city.id)))
    .sort((a, b) => Number(b.selected) - Number(a.selected) || Number(b.hover) - Number(a.hover) || (a.city.id < b.city.id ? -1 : 1));
  const placed = [];
  const obstacles = (blocked || []).slice();
  const pad = screenPx(mapView, 3);
  ctx.save();
  ranked.forEach((row) => {
    const detail = row.selected || row.hover || mode === "state";
    const [x, y] = cityPoint(mode, mapView.atlas, mapView.pacific, project, row.city);
    if (!row.selected && !row.hover && !anchorInView(view, x, y)) return;
    const box = labelBox(ctx, mapView, row.city, detail);
    const gap = screenPx(mapView, 8);
    const prefs = [
      [x + gap, y - box.h / 2],
      [x - box.w - gap, y - box.h / 2],
      [x - box.w / 2, y - box.h - gap],
      [x - box.w / 2, y + gap],
      [x + gap, y - box.h - gap],
      [x - box.w - gap, y + gap],
    ];
    let spot = null;
    for (const [x0, y0] of prefs) {
      let px = x0;
      let py = y0;
      if (view) {
        px = Math.max(view.x0, Math.min(view.x1 - box.w, px));
        py = Math.max(view.y0, Math.min(view.y1 - box.h, py));
      }
      const rect = { x: px, y: py, w: box.w, h: box.h };
      if (placed.some((other) => rectHits(rect, other, pad))) continue;
      if (obstacles.some((other) => rectHits(rect, other, pad))) continue;
      spot = rect;
      break;
    }
    if (!spot && (row.selected || row.hover) && view) {
      spot = {
        x: Math.max(view.x0, Math.min(view.x1 - box.w, x + gap)),
        y: Math.max(view.y0, Math.min(view.y1 - box.h, y - box.h / 2)),
        w: box.w,
        h: box.h,
      };
    }
    if (!spot) return;
    placed.push(spot);
    paintLabel(ctx, mapView, spot.x, spot.y, box);
  });
  ctx.restore();
}

/** One city, painted over a cached frame when the pointer moves. */
export function drawAtlasHover(ctx, opts) {
  const { mapView, project, hoverId } = opts;
  const mode = atlasMode(mapView);
  if (mode === "off" || !catalog || !hoverId) return;
  const city = atlasTerritory(hoverId);
  if (!city) return;
  const [x, y] = cityPoint(mode, mapView.atlas, mapView.pacific, project, city);
  ctx.save();
  drawDot(ctx, mapView, x, y, false, true, mode);
  const box = labelBox(ctx, mapView, city, true);
  const gap = screenPx(mapView, 8);
  let px = x + gap;
  let py = y - box.h / 2;
  const view = opts.view;
  if (view) {
    px = Math.max(view.x0, Math.min(view.x1 - box.w, px));
    py = Math.max(view.y0, Math.min(view.y1 - box.h, py));
  }
  paintLabel(ctx, mapView, px, py, box);
  ctx.restore();
}

export function pickAtlasCity(x, y, mapView, project) {
  const mode = atlasMode(mapView);
  if (mode === "off" || !catalog) return null;
  const { cities } = collect(mode, mapView.atlas);
  const radius = 14 / (mapView.z || 1);
  let best = null;
  let bestD = radius;
  cities.forEach((city) => {
    const [cx, cy] = cityPoint(mode, mapView.atlas, mapView.pacific, project, city);
    const d = Math.hypot(cx - x, cy - y);
    if (d < bestD) {
      best = city;
      bestD = d;
    }
  });
  return best;
}
