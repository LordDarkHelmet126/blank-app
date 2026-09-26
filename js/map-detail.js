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

/** A save that recorded the toggle wins. Older saves keep the settings default. */
export function mapDetailFromSave(saved, fallback) {
  if (saved && typeof saved.mapDetail === "boolean") return saved.mapDetail;
  return !!fallback;
}
