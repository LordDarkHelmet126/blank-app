/** Close-up map layers. Overview stays as drawn. Zoomed theater drops the extras. */

export const CLOSE_ZOOM = 1.15;
export const MAP_DETAIL_KEY = "northern-front-v01-map-detail";

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
