import { worldCatalog } from "./world.js";

/** Remote subdivisions stay dotted at world zoom, not only their capitals. */
const REMOTE = new Set(["AK", "HI", "YT", "NT"]);

/** World zoom shows the whole atlas. A framed state or province shows its cities up close. */
export function atlasMode(mapView) {
  if (!mapView || mapView.focus) return "off";
  if (mapView.z < 0.55) return "world";
  if (mapView.atlas && mapView.atlas !== "us") return "state";
  return "off";
}

function allTerritories() {
  return worldCatalog().regions.flatMap((region) => region.territories);
}

export function atlasSubdivision(code) {
  for (const region of worldCatalog().regions) {
    const sub = region.subdivisions.find((s) => s.id === code);
    if (sub) return sub;
  }
  return null;
}

export function atlasTerritory(id) {
  if (!id) return null;
  return allTerritories().find((t) => t.id === id) || null;
}

function collect(mode, atlasCode) {
  const all = allTerritories();
  if (!all.length || mode === "off") return { cities: [], links: [] };
  const byId = new Map(all.map((t) => [t.id, t]));
  let cities = all;
  if (mode === "world") {
    cities = all.filter((t) => t.role === "capital" || REMOTE.has(t.subdivision));
  }
  if (mode === "state") {
    const states = new Set([atlasCode]);
    all.forEach((t) => {
      if (t.subdivision !== atlasCode) return;
      t.neighbors.forEach((n) => {
        const other = byId.get(n.id);
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
      const key = t.id < n.id ? `${t.id}|${n.id}` : `${n.id}|${t.id}`;
      if (seen.has(key)) return;
      const other = byId.get(n.id);
      if (!other) return;
      seen.add(key);
      links.push({ from: t, to: other, kind: n.kind });
    });
  });
  return { cities, links };
}

function nearCampaign(x, y, points) {
  return (points || []).some((p) => Math.hypot(p.x - x, p.y - y) < 42);
}

/**
 * Geographic atlas. Campaign markers stay on top of a close view;
 * a world city that sits on one of them is not drawn twice.
 */
function screenPx(mapView, px) {
  return px / (mapView.z || 1);
}

export function drawWorldAtlas(ctx, opts) {
  const { mapView, project, campaignPoints, selectedId, hoverId } = opts;
  const mode = atlasMode(mapView);
  if (mode === "off") return;
  const { cities, links } = collect(mode, mapView.atlas);
  const extra = [];
  if (selectedId) {
    const sel = atlasTerritory(selectedId);
    if (sel && !cities.some((c) => c.id === sel.id)) extra.push(sel);
  }
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  const casing = screenPx(mapView, mode === "state" ? 8 : 3.2);
  const core = screenPx(mapView, mode === "state" ? 4 : 1.6);
  links.forEach((link) => {
    const [x1, y1] = project(link.from.lon, link.from.lat);
    const [x2, y2] = project(link.to.lon, link.to.lat);
    const sea = link.kind === "sea";
    const rail = link.kind === "rail";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.setLineDash(sea ? [screenPx(mapView, 10), screenPx(mapView, 7)] : []);
    ctx.strokeStyle = "#1a0808";
    ctx.lineWidth = casing;
    ctx.stroke();
    ctx.strokeStyle = sea ? "#d5e6f2" : rail ? "#e2b84a" : "#fff6d0";
    ctx.lineWidth = core;
    ctx.stroke();
    ctx.setLineDash([]);
  });
  const drawDot = (city) => {
    const [x, y] = project(city.lon, city.lat);
    const selected = city.id === selectedId;
    const hover = city.id === hoverId;
    if (mode === "state" && nearCampaign(x, y, campaignPoints) && !selected && !hover) return;
    const rad = screenPx(mapView, selected || hover ? 9 : mode === "state" ? 7 : 5);
    ctx.fillStyle = "#f8d800";
    ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    ctx.fillStyle = selected ? "#f8d800" : "#9a3b3b";
    const inset = Math.max(screenPx(mapView, 1.5), rad * 0.28);
    ctx.fillRect(x - rad + inset, y - rad + inset, rad * 2 - inset * 2, rad * 2 - inset * 2);
  };
  cities.forEach(drawDot);
  extra.forEach(drawDot);
  ctx.restore();
}

/** Names sit above state plates. One line at world zoom, yields on a framed state. */
export function drawAtlasLabels(ctx, opts) {
  const { mapView, project, selectedId, hoverId } = opts;
  const mode = atlasMode(mapView);
  if (mode === "off") return;
  const { cities } = collect(mode, mapView.atlas);
  const list = cities.slice();
  if (selectedId && !list.some((c) => c.id === selectedId)) {
    const sel = atlasTerritory(selectedId);
    if (sel) list.push(sel);
  }
  ctx.save();
  list.forEach((city) => {
    const selected = city.id === selectedId;
    const hover = city.id === hoverId;
    const focused = mode === "state" && city.subdivision === mapView.atlas;
    const remoteCap = REMOTE.has(city.subdivision) && city.role === "capital";
    const canadaCap = city.country === "CA" && city.role === "capital";
    if (!selected && !hover && !focused && !(mode === "world" && (remoteCap || canadaCap))) return;
    const [x, y] = project(city.lon, city.lat);
    drawAtlasLabel(ctx, mapView, x, y, city, selected || hover || focused);
  });
  ctx.restore();
}

function drawAtlasLabel(ctx, mapView, x, y, city, detail) {
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
  const px = x + screenPx(mapView, 8);
  const py = y - h / 2;
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

export function pickAtlasCity(x, y, mapView, project) {
  const mode = atlasMode(mapView);
  if (mode === "off") return null;
  const { cities } = collect(mode, mapView.atlas);
  const radius = 14 / (mapView.z || 1);
  let best = null;
  let bestD = radius;
  cities.forEach((city) => {
    const [cx, cy] = project(city.lon, city.lat);
    const d = Math.hypot(cx - x, cy - y);
    if (d < bestD) {
      best = city;
      bestD = d;
    }
  });
  return best;
}
