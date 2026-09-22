/** Deterministic mulberry32 RNG stored on game state. */

export function nextFloat(state) {
  state.seed = (Math.imul(state.seed, 1664525) + 1013904223) | 0;
  return (state.seed >>> 0) / 4294967296;
}

export function nextInt(state, min, max) {
  return min + Math.floor(nextFloat(state) * (max - min + 1));
}

export function pick(state, list) {
  if (!list.length) return null;
  return list[nextInt(state, 0, list.length - 1)];
}

export function chance(state, p) {
  return nextFloat(state) < p;
}

export function jitter(state, base, spread) {
  return base + nextInt(state, -spread, spread);
}
