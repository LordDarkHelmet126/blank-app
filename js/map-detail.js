/** Close-up map layers. Overview stays as drawn. Zoomed theater drops the extras. */

export const CLOSE_ZOOM = 1.15;
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
 * A marker whose centre is already outside is left off the canvas (null) so the camera is not pulled.
 * Zoom is not part of the result.
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
  if (!centerIn && Math.hypot(nx - x, ny - y) > half + 0.01) return null;
  return [nx, ny];
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
export function letterboxCanvasPoint(clientX, clientY, rect, canvasW, canvasH) {
  const rw = Math.max(1, rect.width);
  const rh = Math.max(1, rect.height);
  const scale = Math.min(rw / canvasW, rh / canvasH);
  const ox = rect.left + (rw - canvasW * scale) / 2;
  const oy = rect.top + (rh - canvasH * scale) / 2;
  return [(clientX - ox) / scale, (clientY - oy) / scale];
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
