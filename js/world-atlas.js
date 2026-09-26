import { worldCatalog } from "./world.js";

/** World zoom shows the whole atlas. A framed state shows its cities up close. */
export function atlasMode(mapView) {
  if (!mapView || mapView.focus) return "off";
  if (mapView.z < 0.55) return "world";
  if (mapView.atlas && mapView.atlas !== "us") return "state";
  return "off";
}

function usRegion() {
  return worldCatalog().regions.find((r) => r.id === "us") || null;
}

export function atlasSubdivision(code) {
  return usRegion()?.subdivisions.find((s) => s.id === code) || null;
}

export function atlasTerritory(id) {
  if (!id) return null;
  return usRegion()?.territories.find((t) => t.id === id) || null;
}

function collect(mode, atlasCode) {
  const region = usRegion();
  if (!region || mode === "off") return { cities: [], links: [] };
  const byId = new Map(region.territories.map((t) => [t.id, t]));
  let cities = region.territories;
  if (mode === "world") cities = region.territories.filter((t) => t.role === "capital");
  if (mode === "state") {
    const states = new Set([atlasCode]);
    region.territories.forEach((t) => {
      if (t.subdivision !== atlasCode) return;
      t.neighbors.forEach((n) => {
        const other = byId.get(n.id);
        if (other) states.add(other.subdivision);
      });
    });
    cities = region.territories.filter((t) => states.has(t.subdivision));
  }
  const ids = new Set(cities.map((t) => t.id));
  const links = [];
  const seen = new Set();
  const source = mode === "world" ? region.territories : cities;
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
  links.forEach((link) => {
    const [x1, y1] = project(link.from.lon, link.from.lat);
    const [x2, y2] = project(link.to.lon, link.to.lat);
    const sea = link.kind === "sea";
    const rail = link.kind === "rail";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.setLineDash(sea ? [10 / mapView.z, 7 / mapView.z] : []);
    ctx.strokeStyle = sea ? "#1a140c" : "#1a0808";
    ctx.lineWidth = Math.max(2.2, 3.2 / mapView.z);
    ctx.stroke();
    ctx.strokeStyle = sea ? "#d5e6f2" : rail ? "#e2b84a" : "#f4e2b0";
    ctx.lineWidth = Math.max(1.1, 1.6 / mapView.z);
    ctx.stroke();
    ctx.setLineDash([]);
  });
  const drawDot = (city, forced) => {
    const [x, y] = project(city.lon, city.lat);
    const selected = city.id === selectedId;
    const hover = city.id === hoverId;
    if (!forced && mode === "state" && nearCampaign(x, y, campaignPoints) && !selected && !hover) return;
    const rad = Math.max(2.4, ((selected || hover ? 6 : 3.4) / mapView.z));
    ctx.fillStyle = "#1a0808";
    ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    ctx.fillStyle = selected ? "#f8d800" : hover ? "#f8f8f8" : "#9a3b3b";
    const inset = Math.max(0.8, rad * 0.22);
    ctx.fillRect(x - rad + inset, y - rad + inset, rad * 2 - inset * 2, rad * 2 - inset * 2);
    const focused = mode === "state" && city.subdivision === mapView.atlas && mapView.z >= 0.75;
    if (selected || hover || focused) drawAtlasLabel(ctx, mapView, x, y, city, selected || hover);
  };
  cities.forEach((city) => drawDot(city, false));
  extra.forEach((city) => drawDot(city, true));
  ctx.restore();
}

function drawAtlasLabel(ctx, mapView, x, y, city, detail) {
  const fontPx = mapView.z >= 1 ? 11 : Math.max(11, 12 / mapView.z);
  ctx.font = `${fontPx}px 'Press Start 2P', 'Courier New', monospace`;
  ctx.textBaseline = "top";
  const name = city.short || city.name;
  const sub = detail ? `${city.subdivision} · occupied` : city.subdivision;
  const yields = detail ? (city.yields || []).slice(0, 3).join(" · ") : "";
  const lines = [name, sub].concat(yields ? [yields] : []);
  const tw = Math.max(...lines.map((line) => ctx.measureText(line).width));
  const lh = fontPx + 3;
  const w = tw + 10;
  const h = lh * lines.length + 6;
  let px = x + Math.max(6, 8 / mapView.z);
  let py = y - h / 2;
  ctx.fillStyle = "#000018";
  ctx.fillRect(px - 2, py - 2, w + 4, h + 4);
  ctx.fillStyle = detail ? "#f8d800" : "#f8f8f8";
  ctx.fillRect(px, py, w, h);
  ctx.fillStyle = "#101050";
  lines.forEach((line, i) => {
    ctx.fillText(line, px + 5, py + 4 + i * lh);
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
