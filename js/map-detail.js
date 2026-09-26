/** Close-up map layers. Overview stays as drawn. Zoomed theater drops the extras. */

/** The ×1.2 button from the full theater stays the overview. Clean labels start on the next step. */
export const CLOSE_ZOOM = 1.25;
export const MAP_DETAIL_KEY = "northern-front-v01-map-detail";
/** City names stay readable. Screen pixels, not world units. */
export const LABEL_MIN_SCREEN = 8;

/**
 * What the canvas should paint.
 * `extras` is the clutter layer: yield marks, props, flags, chips, nameplates.
 * Clean close-up keeps terrain, ownership, cities, roads, and the player's mark.
 * A foreign frame (Bering, Cuba, Korea) keeps its desk captions.
 */
export function mapLayerVisibility(z, detailOn, focus) {
  const close = !focus && z >= CLOSE_ZOOM;
  const extras = !close || !!detailOn;
  return {
    close,
    extras,
    props: extras,
    plates: extras,
    chips: extras,
    badges: extras,
    yieldMarks: extras,
    roads: true,
    clearRoads: close && !detailOn,
    cities: true,
    stateLabels: true,
    ownership: true,
  };
}

export function stampMapDetail(state, on) {
  const value = !!on;
  if (state) state.mapDetail = value;
  return value ? "1" : "0";
}

/**
 * The live preference wins. A save may still carry mapDetail from an older build,
 * but Continue must not put that value back over the setting the player just chose.
 */
export function mapDetailFromSave(_saved, fallback) {
  return !!fallback;
}

/**
 * Pan by a drag delta. Zoom is copied through unchanged.
 */
export function applyMapDrag(view, dx, dy) {
  return { z: view.z, x: view.x + dx, y: view.y + dy };
}

/**
 * Slide a marker that would be cut by the view fully inside.
 * A centre just outside still counts when its marker meets the frame, and that marker is slid in.
 * A centre farther out than the marker body stays off the canvas (null). Zoom is not part of the result.
 */
export function insetMarkerCenter(x, y, half, view) {
  const centerIn = x >= view.x0 && x <= view.x1 && y >= view.y0 && y <= view.y1;
  const minX = view.x0 + half;
  const maxX = view.x1 - half;
  const minY = view.y0 + half;
  const maxY = view.y1 - half;
  if (!(maxX > minX && maxY > minY)) return centerIn ? [x, y] : null;
  const nx = Math.min(maxX, Math.max(minX, x));
  const ny = Math.min(maxY, Math.max(minY, y));
  if (!centerIn) {
    const markerRadius = Math.max(0, half - 2);
    if (Math.hypot(nx - x, ny - y) > half + markerRadius + 0.01) return null;
  }
  return [nx, ny];
}

/**
 * World-unit cap for a callout. About four marker widths, and never more than 60 screen px.
 */
export function calloutCap(marker, z, cssScale = 1) {
  const zSafe = Math.max(0.2, Number(z) || 1);
  const scale = Math.max(0.05, Number(cssScale) || 1);
  const width = Math.max(1, Number(marker) || 1);
  return Math.min(width * 4, 60 / (zSafe * scale));
}

/**
 * Where a leader from (x1, y1) meets the label box.
 * The box entry is the farther slab crossing. If that point misses the perimeter,
 * use the nearest point on the perimeter instead.
 */
export function leaderEndOnLabel(x1, y1, lx, ly, w, h) {
  const cx = lx + w / 2;
  const cy = ly + h / 2;
  const dx = cx - x1;
  const dy = cy - y1;
  const ts = [];
  if (Math.abs(dx) > 1e-6) {
    const tx = dx > 0 ? (lx - x1) / dx : (lx + w - x1) / dx;
    if (tx > 0 && tx < 1) ts.push(tx);
  }
  if (Math.abs(dy) > 1e-6) {
    const ty = dy > 0 ? (ly - y1) / dy : (ly + h - y1) / dy;
    if (ty > 0 && ty < 1) ts.push(ty);
  }
  const onPerim = (x, y) => {
    const onX = x >= lx - 0.08 && x <= lx + w + 0.08;
    const onY = y >= ly - 0.08 && y <= ly + h + 0.08;
    const edge = Math.abs(x - lx) <= 0.08 || Math.abs(x - (lx + w)) <= 0.08
      || Math.abs(y - ly) <= 0.08 || Math.abs(y - (ly + h)) <= 0.08;
    return onX && onY && edge;
  };
  if (ts.length) {
    const t = Math.max(...ts);
    const x = x1 + dx * t;
    const y = y1 + dy * t;
    if (onPerim(x, y)) return [x, y];
  }
  const clampedX = Math.min(lx + w, Math.max(lx, x1));
  const clampedY = Math.min(ly + h, Math.max(ly, y1));
  const outside = x1 <= lx || x1 >= lx + w || y1 <= ly || y1 >= ly + h;
  if (outside) return [clampedX, clampedY];
  const dLeft = Math.abs(x1 - lx);
  const dRight = Math.abs(x1 - (lx + w));
  const dTop = Math.abs(y1 - ly);
  const dBot = Math.abs(y1 - (ly + h));
  const m = Math.min(dLeft, dRight, dTop, dBot);
  if (m === dLeft) return [lx, y1];
  if (m === dRight) return [lx + w, y1];
  if (m === dTop) return [x1, ly];
  return [x1, ly + h];
}

/**
 * How many CSS pixels one canvas pixel occupies for an `object-fit: contain` canvas.
 * A missing box (headless, not yet laid out) is 1, so the look view stays on canvas pixels.
 */
export function canvasDisplayScale(rect, canvasW, canvasH) {
  const rw = Number(rect?.width) || 0;
  const rh = Number(rect?.height) || 0;
  const cw = Number(canvasW) || 0;
  const ch = Number(canvasH) || 0;
  if (!(rw > 0 && rh > 0 && cw > 0 && ch > 0)) return 1;
  return Math.min(rw / cw, rh / ch) || 1;
}

/**
 * World font sizes for a city name.
 * Every size is at least LABEL_MIN_SCREEN CSS pixels, after the canvas-to-screen scale.
 */
export function cityLabelSizes(baseWorld, z, cssScale = 1) {
  const zSafe = Math.max(0.2, Number(z) || 1);
  const scale = Math.max(0.05, Number(cssScale) || 1);
  const minWorld = LABEL_MIN_SCREEN / (zSafe * scale);
  const base = Math.max(minWorld, Number(baseWorld) || minWorld);
  const sizes = [];
  [1, 0.86, 0.74, 0.64].forEach((factor) => {
    const sized = base * factor;
    if (sized * zSafe * scale >= LABEL_MIN_SCREEN - 0.05) sizes.push(sized);
  });
  if (!sizes.length) sizes.push(minWorld);
  return sizes;
}

/**
 * Pointer position in canvas pixels for an `object-fit: contain` canvas.
 * The drawn map is letterboxed inside the element; stretching the element box
 * drifts hits toward the edges.
 */
export function letterboxMetrics(rect, canvasW, canvasH) {
  const rw = Math.max(1, rect.width);
  const rh = Math.max(1, rect.height);
  const scale = Math.min(rw / canvasW, rh / canvasH);
  const ox = rect.left + (rw - canvasW * scale) / 2;
  const oy = rect.top + (rh - canvasH * scale) / 2;
  return { scale, ox, oy, dw: canvasW * scale, dh: canvasH * scale };
}

/** True when the pointer is on the drawn map, not the empty bars beside a letterboxed canvas. */
export function letterboxContains(clientX, clientY, rect, canvasW, canvasH) {
  const box = letterboxMetrics(rect, canvasW, canvasH);
  const x = clientX - box.ox;
  const y = clientY - box.oy;
  return x >= -0.5 && y >= -0.5 && x <= box.dw + 0.5 && y <= box.dh + 0.5;
}

export function letterboxCanvasPoint(clientX, clientY, rect, canvasW, canvasH) {
  const box = letterboxMetrics(rect, canvasW, canvasH);
  return [(clientX - box.ox) / box.scale, (clientY - box.oy) / box.scale];
}

/**
 * Close-zoom road width in world units.
 * The on-screen bar stays near 7px (about a third of the old close-zoom casing)
 * and the core stays narrower than the city marker.
 */
export function closeRoadWidth(z) {
  const zSafe = Math.max(0.2, Number(z) || 1);
  const screen = 7.2;
  return { casing: screen / zSafe, core: 3.2 / zSafe, screen };
}

/**
 * A long neighbor chord that spends its run in states that are neither end.
 * Empty samples (sea) are not foreign, so a water hop is not treated as a crossed state.
 */
export function chordIsMisleading(length, samples, stateA, stateB) {
  if (!(length >= 110) || !samples || !samples.length) return false;
  let foreign = 0;
  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i];
    if (sample && sample !== stateA && sample !== stateB) foreign += 1;
  }
  return foreign / samples.length >= 0.34;
}

/** A city name's near edge stays within this many marker widths of its marker. */
export const LABEL_ANCHOR = 1.5;

/** Another marker this close, in screen pixels, makes the name read as that city. */
export const LABEL_TOUCH_SCREEN = 5;

/** Edge-to-edge gap from a label box to a marker square. Zero means they touch. */
export function labelEdgeGap(mx, my, marker, lx, ly, w, h) {
  const half = (Number(marker) || 0) / 2;
  const left = mx - half;
  const right = mx + half;
  const top = my - half;
  const bottom = my + half;
  const dx = lx + w < left ? left - (lx + w) : lx > right ? lx - right : 0;
  const dy = ly + h < top ? top - (ly + h) : ly > bottom ? ly - bottom : 0;
  return Math.hypot(dx, dy);
}

/**
 * The label belongs to its own marker.
 * Reject a slot whose centre is nearer another marker, whose edge is nearer another marker,
 * or that touches another marker (within `touch` world px) even when a leader is drawn.
 */
export function labelOwnsMarker(lx, ly, w, h, own, others, touch = 4) {
  const cx = lx + w / 2;
  const cy = ly + h / 2;
  const ownC = Math.hypot(cx - own.x, cy - own.y);
  const ownGap = labelEdgeGap(own.x, own.y, own.marker, lx, ly, w, h);
  const touchLimit = Number.isFinite(Number(touch)) ? Number(touch) : 4;
  for (let i = 0; i < (others || []).length; i++) {
    const o = others[i];
    if (Math.hypot(cx - o.x, cy - o.y) <= ownC + 0.25) return false;
    const gap = labelEdgeGap(o.x, o.y, o.marker, lx, ly, w, h);
    if (gap <= ownGap + 0.01) return false;
    if (gap <= touchLimit) return false;
  }
  return true;
}

/**
 * Key city ids. A pan of 12 canvas px or less keeps the previous list, so hover and a small
 * nudge cannot renumber it. A new zoom (no previous list, or a longer pan) sorts by city id.
 */
export function stableKeyIds(previous, next, panPx) {
  const sorted = [...(next || [])].map(String).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  if (previous == null || !(Number(panPx) <= 12)) return sorted;
  return previous.slice();
}

/**
 * Rows actually drawn in the key. Invisible ids are dropped before numbering, then any city
 * that still has no name is appended. Numbers are always 1..n with no gaps.
 */
export function heldKeyRows(frozenIds, visibleIds, failedIds) {
  const visible = new Set((visibleIds || []).map(String));
  const shown = [];
  const have = new Set();
  (frozenIds || []).forEach((id) => {
    const key = String(id);
    if (!visible.has(key) || have.has(key)) return;
    shown.push(key);
    have.add(key);
  });
  (failedIds || []).forEach((id) => {
    const key = String(id);
    if (!visible.has(key) || have.has(key)) return;
    shown.push(key);
    have.add(key);
  });
  return shown.map((id, index) => ({ id, n: index + 1 }));
}

/**
 * Placement priority. 0 is the start city, 1 is adjacent to the start or the selection,
 * 2 is a front city or the next ring out, and everyone else is 3.
 */
export function labelPlaceRank(id, hereId, adjacentIds, nearIds) {
  if (id && id === hereId) return 0;
  if ((adjacentIds || []).includes(id)) return 1;
  if ((nearIds || []).includes(id)) return 2;
  return 3;
}

/**
 * World-unit inset for a keyed panel.
 * The frame pad plus half the stroke stays at least `marginCanvas` canvas px inside the map.
 */
export function keyPanelInset(z, framePad, strokeWorld, marginCanvas = 2) {
  const zSafe = Math.max(0.2, Number(z) || 1);
  const stroke = Math.max(0, Number(strokeWorld) || 0);
  const pad = Math.max(0, Number(framePad) || 0);
  const margin = Math.max(0, Number(marginCanvas) || 0);
  return (margin + (stroke * zSafe) / 2) / zSafe + pad;
}
