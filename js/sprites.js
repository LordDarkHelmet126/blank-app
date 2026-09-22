/**
 * Cheap 2–4 frame pixel sprites. Original IP: partisan/militia horse scouts,
 * 1980s jeep pickups, M113 APCs. No licensed names or kit past 1989.
 */

const C = {
  ink: "#000018",
  olive: "#385028",
  olive2: "#507040",
  cab: "#2a3820",
  window: "#88b0c8",
  steel: "#686860",
  wheel: "#201810",
  gold: "#f8d800",
  horse: "#684028",
  horse2: "#886038",
  mane: "#3a2010",
  hat: "#c8a038",
  skin: "#c8a078",
  sky: "#3a68a0",
  sky2: "#78a0c8",
  dusk: "#201828",
  mtFar: "#3a4858",
  mtNear: "#4a5868",
  pine: "#184828",
  pine2: "#306830",
  grass: "#8a7840",
  grass2: "#c8a048",
  dirt: "#6a5030",
  road: "#503010",
  snow: "#d0d8e0",
  snow2: "#a0b0c0",
  iceSky: "#182838",
  iceMt: "#405060",
};

export function isArcticRegion(r) {
  if (!r) return false;
  if (r.id === "arctic_slope" || r.id === "bering_strait") return true;
  return r.terrainBias === "ice";
}

export function frameAt(now, ms, n) {
  return Math.floor(now / ms) % n;
}

function blit(ctx, ox, oy, scale, flip, cells) {
  const s = scale || 1;
  for (let i = 0; i < cells.length; i++) {
    const [x, y, w, h, c] = cells[i];
    const dx = flip ? -x - w : x;
    ctx.fillStyle = c;
    ctx.fillRect(ox + dx * s, oy - (y + h) * s, w * s, h * s);
  }
}

/** Jeep pickup, 1980s civilian/militia gun-truck. x,y = ground contact. */
export function drawJeep(ctx, x, y, frame, scale, flip) {
  const hop = frame % 2;
  const wheelShift = hop;
  blit(ctx, x, y - hop * (scale || 1), scale, flip, [
    [2 + wheelShift, 0, 2, 2, C.wheel],
    [8 + wheelShift, 0, 2, 2, C.wheel],
    [1, 2, 10, 3, C.olive],
    [1, 3, 5, 2, C.olive2],
    [6, 4, 5, 3, C.cab],
    [8, 5, 2, 2, C.window],
    [11, 2, 1, 2, C.steel],
    [0, 2, 1, 2, C.gold],
    [4, 5, 2, 1, C.ink],
  ]);
}

/** M113 APC (tracked hull). */
export function drawM113(ctx, x, y, frame, scale, flip) {
  const hop = frame % 2;
  blit(ctx, x, y - hop * (scale || 1), scale, flip, [
    [hop, 0, 13, 2, C.ink],
    [1, 2, 12, 4, C.olive],
    [1, 3, 12, 1, C.olive2],
    [2, 2, 2, 2, C.ink],
    [5, 6, 4, 2, C.olive2],
    [9, 7, 5, 1, C.steel],
    [12, 5, 2, 1, C.gold],
  ]);
}

/** Militia horse scout — partisan cavalry, not a licensed unit. */
export function drawHorse(ctx, x, y, frame, scale, flip) {
  const f = frame % 4;
  const legs =
    f === 0
      ? [
          [2, 0, 1, 3, C.mane],
          [5, 0, 1, 3, C.mane],
        ]
      : f === 1
        ? [
            [1, 0, 1, 3, C.mane],
            [6, 0, 1, 3, C.mane],
          ]
        : f === 2
          ? [
              [3, 0, 1, 3, C.mane],
              [4, 0, 1, 2, C.mane],
            ]
          : [
              [2, 0, 1, 2, C.mane],
              [6, 0, 1, 3, C.mane],
            ];
  blit(ctx, x, y, scale, flip, [
    ...legs,
    [1, 3, 6, 3, C.horse],
    [2, 4, 4, 1, C.horse2],
    [6, 5, 2, 3, C.horse],
    [7, 7, 3, 2, C.horse2],
    [9, 9, 1, 1, C.mane],
    [7, 6, 2, 1, C.mane],
    [3, 6, 2, 3, C.olive],
    [3, 9, 2, 1, C.hat],
    [3, 8, 2, 1, C.skin],
    [5, 7, 1, 2, C.gold],
  ]);
}

export function drawTravelConvoy(ctx, fromXY, toXY, t, now, scale) {
  const s = scale || 1;
  const x0 = fromXY[0];
  const y0 = fromXY[1];
  const x1 = toXY[0];
  const y1 = toXY[1];
  const flip = x1 < x0;
  const horseF = frameAt(now, 120, 4);
  const hopF = frameAt(now, 140, 2);
  const kinds = ["horse", "jeep", "m113"];
  for (let i = 0; i < kinds.length; i++) {
    const u = Math.max(0, Math.min(1, t - i * 0.12));
    const x = Math.round(x0 + (x1 - x0) * u);
    const y = Math.round(y0 + (y1 - y0) * u);
    if (kinds[i] === "horse") drawHorse(ctx, x, y, horseF, s, flip);
    else if (kinds[i] === "jeep") drawJeep(ctx, x, y, hopF, s, flip);
    else drawM113(ctx, x, y, hopF, s, flip);
  }
}

function pine(ctx, x, y, h) {
  ctx.fillStyle = C.pine;
  ctx.fillRect(x + 3, y, 2, h);
  ctx.fillStyle = C.pine2;
  ctx.fillRect(x, y + 2, 8, 3);
  ctx.fillStyle = C.pine;
  ctx.fillRect(x + 1, y - 2, 6, 4);
}

function mountainRow(ctx, w, baseY, height, color, shift) {
  const span = Math.max(24, Math.floor(w / 3));
  for (let i = -1; i < Math.ceil(w / span) + 2; i++) {
    const x = ((i * span + shift) % (w + span)) - span / 2;
    ctx.fillStyle = color;
    ctx.fillRect(x + 4, baseY - height, span - 8, height);
    ctx.fillRect(x + span / 4, baseY - height - 6, span / 2, 8);
    ctx.fillStyle = "#e8e8e0";
    ctx.fillRect(x + span / 3, baseY - height - 6, 4, 3);
  }
}

/** Western Colorado foothills: high-country sky, pine, dry grass, ranch road. */
export function paintWestBackdrop(ctx, w, h, now, mood) {
  const t = now || 0;
  const dusk = mood === "dusk";
  ctx.fillStyle = dusk ? C.dusk : "#4a88c8";
  ctx.fillRect(0, 0, w, h);
  if (!dusk) {
    ctx.fillStyle = "#98c0e0";
    ctx.fillRect(0, Math.floor(h * 0.22), w, Math.floor(h * 0.4));
    ctx.fillStyle = C.gold;
    ctx.fillRect(w - 10, 4, 3, 3);
    ctx.fillStyle = "#f0e8d8";
    ctx.fillRect(8 + Math.floor((t / 180) % 12), 5, 10, 2);
  }
  const far = Math.floor(t / 220) % w;
  const near = Math.floor(t / 110) % w;
  mountainRow(ctx, w, Math.floor(h * 0.5), Math.floor(h * 0.22), C.mtFar, -far);
  mountainRow(ctx, w, Math.floor(h * 0.58), Math.floor(h * 0.16), C.mtNear, -near);
  const gy = Math.floor(h * 0.62);
  ctx.fillStyle = C.grass;
  ctx.fillRect(0, gy, w, h - gy);
  const gShift = Math.floor(t / 70);
  for (let x = 0; x < w; x += 2) {
    ctx.fillStyle = ((x + gShift) & 2) === 0 ? C.grass2 : C.dirt;
    ctx.fillRect(x, gy + ((x + gShift) % 3), 2, 2);
  }
  pine(ctx, 4 - (near % 12), gy - 10, 10);
  pine(ctx, w - 14 + (near % 8), gy - 12, 12);
  const roadY = Math.min(h - 5, gy + Math.floor((h - gy) * 0.45));
  ctx.fillStyle = C.road;
  ctx.fillRect(0, roadY, w, 4);
  ctx.fillStyle = C.gold;
  const dash = Math.floor(t / 50);
  for (let x = -((dash * 2) % 8); x < w; x += 8) ctx.fillRect(x, roadY + 1, 3, 1);
}

/** Snow/ice for explicitly arctic nodes only. */
export function paintArcticBackdrop(ctx, w, h, now) {
  const t = now || 0;
  ctx.fillStyle = C.iceSky;
  ctx.fillRect(0, 0, w, h);
  for (let x = 0; x < w; x += 2) {
    ctx.fillStyle = "#f8f8f8";
    ctx.fillRect(x, 4 + ((x + Math.floor(t / 90)) % 6), 1, 1);
  }
  mountainRow(ctx, w, Math.floor(h * 0.52), Math.floor(h * 0.2), C.iceMt, -Math.floor(t / 200) % w);
  const gy = Math.floor(h * 0.62);
  ctx.fillStyle = C.snow2;
  ctx.fillRect(0, gy, w, h - gy);
  for (let x = 0; x < w; x += 2) {
    ctx.fillStyle = (x >> 1) % 2 ? C.snow : "#c8d0d8";
    ctx.fillRect(x, gy + (x % 2), 2, 2);
  }
  const roadY = Math.min(h - 5, gy + 6);
  ctx.fillStyle = "#405060";
  ctx.fillRect(0, roadY, w, 3);
  ctx.fillStyle = C.snow;
  ctx.fillRect(0, roadY + 1, w, 1);
}

export function paintChargeVignette(dest, now, arctic) {
  const w = 160;
  const h = 50;
  if (!paintChargeVignette.off || paintChargeVignette.off.width !== w || paintChargeVignette.off.height !== h) {
    paintChargeVignette.off = document.createElement("canvas");
    paintChargeVignette.off.width = w;
    paintChargeVignette.off.height = h;
  }
  const c = paintChargeVignette.off;
  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  if (arctic) paintArcticBackdrop(ctx, w, h, now);
  else paintWestBackdrop(ctx, w, h, now);
  const t = now / 1000;
  const roadY = Math.floor(h * 0.62) + Math.floor((h * 0.38) * 0.45) + 6;
  const horseX = Math.floor(((t * 28) % (w + 48)) - 16);
  const jeepX = Math.floor(((t * 28 + 48) % (w + 48)) - 16);
  const apcX = Math.floor(((t * 28 + 88) % (w + 48)) - 16);
  const hf = frameAt(now, 120, 4);
  const vf = frameAt(now, 140, 2);
  drawHorse(ctx, horseX, roadY, hf, 2, false);
  drawJeep(ctx, jeepX, roadY, vf, 2, false);
  drawM113(ctx, apcX, roadY, vf, 2, false);
  dest.imageSmoothingEnabled = false;
  dest.clearRect(0, 0, dest.canvas.width, dest.canvas.height);
  dest.drawImage(c, 0, 0, dest.canvas.width, dest.canvas.height);
}

export function paintBattleSky(dest, now, arctic) {
  const w = 240;
  const h = 16;
  if (!paintBattleSky.off) {
    paintBattleSky.off = document.createElement("canvas");
    paintBattleSky.off.width = w;
    paintBattleSky.off.height = h;
  }
  const ctx = paintBattleSky.off.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  if (arctic) paintArcticBackdrop(ctx, w, h, now);
  else paintWestBackdrop(ctx, w, h, now);
  dest.imageSmoothingEnabled = false;
  dest.drawImage(paintBattleSky.off, 0, 0, dest.canvas.width, dest.canvas.height);
}

export function paintBattleCharge(dest, now, arctic) {
  const w = 240;
  const h = 24;
  if (!paintBattleCharge.off || paintBattleCharge.off.width !== w || paintBattleCharge.off.height !== h) {
    paintBattleCharge.off = document.createElement("canvas");
    paintBattleCharge.off.width = w;
    paintBattleCharge.off.height = h;
  }
  const ctx = paintBattleCharge.off.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  if (arctic) paintArcticBackdrop(ctx, w, h, now);
  else paintWestBackdrop(ctx, w, h, now);
  const t = now / 1000;
  const gy = h - 3;
  const hf = frameAt(now, 120, 4);
  const vf = frameAt(now, 140, 2);
  drawHorse(ctx, Math.floor(((t * 32) % (w + 50)) - 12), gy, hf, 2, false);
  drawJeep(ctx, Math.floor(((t * 32 + 50) % (w + 50)) - 12), gy, vf, 2, false);
  drawM113(ctx, Math.floor(((t * 32 + 96) % (w + 50)) - 12), gy, vf, 2, false);
  dest.imageSmoothingEnabled = false;
  dest.drawImage(paintBattleCharge.off, 0, 0, dest.canvas.width, dest.canvas.height);
}
