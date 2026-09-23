/**
 * Painterly western theater + 1980s American markers.
 * Original IP only — no Koei / licensed portraits, roofs, or chrome.
 *
 * Land is a continental US silhouette plus an Alaska/Yukon spur.
 * Biomes: AK ice, WA evergreen, Rockies, UT desert, plains farms, eastern forest.
 * City marks are bunkers, ranch houses, grain elevators, oil pumps, radio towers, main-street blocks.
 */

const TW = 1000;
const TH = 620;
const MAP_S = 1;
const ELEV = 14;

const BIOME = {
  sea: 0,
  ice: 1,
  tundra: 2,
  coast: 3,
  forest: 4,
  pine: 5,
  hills: 6,
  rockies: 7,
  desert: 8,
  plains: 9,
  farm: 10,
  urban: 11,
  wetforest: 12,
};

const STATE_BIOME = {
  ak: BIOME.ice,
  yt: BIOME.pine,
  wa: BIOME.wetforest,
  or: BIOME.forest,
  id: BIOME.pine,
  mt: BIOME.hills,
  wy: BIOME.rockies,
  ut: BIOME.desert,
  co: BIOME.rockies,
  ne: BIOME.farm,
  ks: BIOME.farm,
  mo: BIOME.plains,
};

const BIAS_BIOME = {
  ice: BIOME.ice,
  tundra: BIOME.tundra,
  coast: BIOME.coast,
  forest: BIOME.forest,
  hills: BIOME.hills,
  plains: BIOME.plains,
  urban: BIOME.urban,
};

const PAL = {
  [BIOME.sea]: ["#2a6080", "#3a78a0", "#1a4870"],
  [BIOME.ice]: ["#c8d4dc", "#9aacb8", "#6a8494", "#e8f0f4"],
  [BIOME.tundra]: ["#7a8a68", "#9aa880", "#5a6850", "#b0b898"],
  [BIOME.coast]: ["#5a8a68", "#78a880", "#3a6850", "#98c0a0"],
  [BIOME.forest]: ["#3a6840", "#4a7850", "#2a4830", "#5a8860"],
  [BIOME.wetforest]: ["#143828", "#1c4834", "#0c241c", "#2a5840"],
  [BIOME.pine]: ["#4a7048", "#5a8858", "#385838", "#6a9868"],
  [BIOME.hills]: ["#8a7848", "#a09058", "#6a5838", "#c0b070"],
  [BIOME.rockies]: ["#5e635c", "#7e847c", "#3a4048", "#f4f7fb"],
  [BIOME.desert]: ["#d09848", "#e8b868", "#9a5420", "#f0d090"],
  [BIOME.plains]: ["#7f9440", "#a4b858", "#4e6228", "#d0dc78"],
  [BIOME.farm]: ["#d4b44a", "#ecd070", "#7a5c20", "#f4e090"],
  [BIOME.urban]: ["#7a7a68", "#9a9a88", "#5a5a50", "#b0b0a0"],
};

const FACE_KITS = [
  { hat: "#c8a038", coat: "#385028", hair: "#3a2010", skin: "#c8a078" },
  { hat: "#686860", coat: "#304878", hair: "#201810", skin: "#d0b088" },
  { hat: "#f8d800", coat: "#507040", hair: "#684028", skin: "#c09070" },
  { hat: "#a03020", coat: "#2a3820", hair: "#3a2010", skin: "#b88860" },
  { hat: "#d0d8e0", coat: "#405060", hair: "#f0e8d8", skin: "#e0c8b0" },
  { hat: "#886038", coat: "#684028", hair: "#201810", skin: "#c8a078" },
  { hat: "#304878", coat: "#101050", hair: "#3a2010", skin: "#d8b898" },
  { hat: "#c8a038", coat: "#803010", hair: "#886038", skin: "#d0a878" },
  { hat: "#507040", coat: "#184828", hair: "#201810", skin: "#b89068" },
  { hat: "#e0c060", coat: "#687038", hair: "#c8a038", skin: "#e8d0b0" },
  { hat: "#404040", coat: "#686868", hair: "#201810", skin: "#c8a078" },
  { hat: "#f8f8f8", coat: "#385028", hair: "#684028", skin: "#d8b890" },
  { hat: "#c07840", coat: "#5a4830", hair: "#3a2010", skin: "#c09070" },
  { hat: "#80a0b0", coat: "#487088", hair: "#d0d8e0", skin: "#e8e0d0" },
  { hat: "#a07840", coat: "#684828", hair: "#201810", skin: "#c8a078" },
  { hat: "#f8d800", coat: "#304878", hair: "#3a2010", skin: "#d0b088" },
];

let terrainCache = null;
let faceCache = null;

function hash2(x, y) {
  let n = (x * 374761393 + y * 668265263) >>> 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177) >>> 0;
  return (n >>> 0) / 4294967296;
}

function noise(x, y) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const a = hash2(x0, y0);
  const b = hash2(x0 + 1, y0);
  const c = hash2(x0, y0 + 1);
  const d = hash2(x0 + 1, y0 + 1);
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x, y) {
  return noise(x, y) * 0.55 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.15;
}

function lowPt(p) {
  return [Math.floor(p[0] / MAP_S), Math.floor(p[1] / MAP_S)];
}

function fillPoly(ctx, poly) {
  if (!poly || !poly.length) return;
  ctx.beginPath();
  poly.forEach((p, i) => {
    const [x, y] = lowPt(p);
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
}

function strokePoly(ctx, poly, color, width) {
  if (!poly || !poly.length) return;
  ctx.beginPath();
  poly.forEach((p, i) => {
    const [x, y] = lowPt(p);
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width || 1;
  ctx.stroke();
}

function rasterMask(poly) {
  const c = document.createElement("canvas");
  c.width = TW;
  c.height = TH;
  const x = c.getContext("2d");
  x.imageSmoothingEnabled = false;
  x.clearRect(0, 0, TW, TH);
  x.fillStyle = "#ffffff";
  fillPoly(x, poly);
  return x.getImageData(0, 0, TW, TH).data;
}

/** One canvas read for every territory, instead of a full-frame mask per polygon. */
function stampBiomeLayer(entries) {
  const biome = new Uint8Array(TW * TH);
  const band = new Uint8Array(TW * TH);
  if (!entries.length) return { biome, band };
  const c = document.createElement("canvas");
  c.width = TW;
  c.height = TH;
  const x = c.getContext("2d");
  x.imageSmoothingEnabled = false;
  x.clearRect(0, 0, TW, TH);
  entries.forEach((e, n) => {
    x.fillStyle = `rgb(${n + 1},0,0)`;
    fillPoly(x, e.polygon);
  });
  const pix = x.getImageData(0, 0, TW, TH).data;
  for (let i = 0; i < TW * TH; i++) {
    const id = pix[i * 4];
    if (!id || id > entries.length) continue;
    const e = entries[id - 1];
    biome[i] = e.biome;
    band[i] = e.band || 0;
  }
  return { biome, band };
}

function biomeOf(stateId, bias) {
  const id = String(stateId || "").toLowerCase();
  if (BIAS_BIOME[bias] != null && (bias === "ice" || bias === "coast" || bias === "urban" || bias === "tundra")) {
    return BIAS_BIOME[bias];
  }
  if (id === "ut") return BIOME.desert;
  if (id === "co" || id === "wy") {
    if (bias === "urban") return BIOME.urban;
    if (bias === "plains") return BIOME.hills;
    return BIOME.rockies;
  }
  if (id === "wa") return BIOME.wetforest;
  if (id === "or" && bias !== "hills" && bias !== "plains") return BIOME.wetforest;
  if ((id === "ne" || id === "ks") && bias !== "urban") return BIOME.farm;
  if (BIAS_BIOME[bias] != null) return BIAS_BIOME[bias];
  return STATE_BIOME[id] || BIOME.plains;
}

function baseHeight(biome) {
  if (biome === BIOME.rockies) return 0.78;
  if (biome === BIOME.ice) return 0.62;
  if (biome === BIOME.hills) return 0.55;
  if (biome === BIOME.desert) return 0.42;
  if (biome === BIOME.wetforest) return 0.32;
  if (biome === BIOME.pine || biome === BIOME.forest) return 0.38;
  if (biome === BIOME.tundra) return 0.34;
  if (biome === BIOME.coast) return 0.18;
  if (biome === BIOME.urban) return 0.22;
  if (biome === BIOME.farm || biome === BIOME.plains) return 0.16;
  return 0.1;
}

function hexRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const PAL_RGB = Object.fromEntries(
  Object.entries(PAL).map(([k, arr]) => [k, arr.map(hexRgb)]),
);
const SHORE_RGB = hexRgb("#f7f3e6");
const SNOW_A = hexRgb("#f7f8fc");
const SNOW_B = hexRgb("#d5dee8");
const FALL_A = hexRgb("#a05020");
const FALL_B = hexRgb("#d08830");
const PEAK_RGB = hexRgb("#d8d0c0");

function toneRgb(pal, n, high) {
  if (high && pal[3]) return pal[3];
  return pal[n % 3];
}

function mulRgb(rgb, slope) {
  const k = 1 + Math.max(-0.62, Math.min(0.42, slope * 3.1));
  return [
    Math.max(0, Math.min(255, (rgb[0] * k + 0.5) | 0)),
    Math.max(0, Math.min(255, (rgb[1] * k + 0.5) | 0)),
    Math.max(0, Math.min(255, (rgb[2] * k + 0.5) | 0)),
  ];
}

function pickTone(pal, n, high) {
  if (high && pal[3]) return pal[3];
  return pal[n % 3];
}

function cacheKey(state) {
  const season = state._season?.id || "summer";
  const n = (state.regions || []).length;
  return `v6|${season}|${n}|${(state.coast || []).length}|${(state.mainland || []).length}|${(state.lakes || []).length}`;
}

const US_BOX = { x0: 36, y0: 132, x1: 978, y1: 608, lon0: -124.8, lon1: -66.9, lat0: 49.45, lat1: 24.4 };

function lonLatOf(x, y) {
  const lon = US_BOX.lon0 + ((x - US_BOX.x0) / (US_BOX.x1 - US_BOX.x0)) * (US_BOX.lon1 - US_BOX.lon0);
  const lat = US_BOX.lat0 - ((y - US_BOX.y0) / (US_BOX.y1 - US_BOX.y0)) * (US_BOX.lat0 - US_BOX.lat1);
  return [lon, lat];
}

/** Geographic base so the whole outline reads — not only the eleven named states.
 *  Boundaries wander with low-frequency noise so biomes blend instead of tiling. */
function geoBiome(x, y) {
  if (y < 130) {
    if (y < 36 || x < 50) return BIOME.ice;
    if (x > 165 && y < 108) return BIOME.pine;
    if (y > 98) return BIOME.coast;
    return BIOME.tundra;
  }
  const wob = (fbm(x * 0.011, y * 0.011) - 0.5) * 40;
  const [lon, lat] = lonLatOf(x + wob, y + wob * 0.25);
  if (lat < 31.15 && lon > -88.2) return BIOME.coast;
  if (lat > 42.0 && lon < -121.0) return BIOME.wetforest;
  if (lat > 43.8 && lon < -116.0 && lon >= -121.0) return BIOME.pine;
  if (lon < -120.2 && lat <= 42.0 && lat > 33.8) return BIOME.hills;
  if (lat < 37.4 && lon < -108.8 && lon > -120.5) return BIOME.desert;
  if (lon >= -114.4 && lon <= -104.0 && lat >= 32.5 && lat <= 49.2) return BIOME.rockies;
  if (lat < 33.4 && lon >= -99.5 && lon <= -83.5) return BIOME.hills;
  if (lon > -89.5) return BIOME.forest;
  if (lon > -102.5 && lat > 35.5 && lat < 44.5) return BIOME.farm;
  return BIOME.plains;
}

const WET_IDS = new Set(["seattle", "olympia", "portland"]);
const RAIN_SHADOW_IDS = new Set(["spokane"]);

function pnwBandOf(r) {
  if (!r) return 0;
  if (WET_IDS.has(r.id)) return 1;
  if (RAIN_SHADOW_IDS.has(r.id)) return 3;
  return 0;
}

function paintCityBand(land, biome, pnw, r, mode, biomeId) {
  if (!r?.label) return;
  const [cx, cy] = r.label;
  const rad = 34;
  const r2 = rad * rad;
  for (let y = Math.max(0, cy - rad); y <= Math.min(TH - 1, cy + rad); y++) {
    for (let x = Math.max(0, cx - rad); x <= Math.min(TW - 1, cx + rad); x++) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy > r2) continue;
      const i = y * TW + x;
      if (!land[i]) continue;
      pnw[i] = mode;
      biome[i] = biomeId;
    }
  }
}

function buildFields(state) {
  const land = new Uint8Array(TW * TH);
  const biome = new Uint8Array(TW * TH);
  const height = new Float32Array(TW * TH);
  const pnw = new Uint8Array(TW * TH);
  const maskC = document.createElement("canvas");
  maskC.width = TW;
  maskC.height = TH;
  const mx = maskC.getContext("2d");
  mx.imageSmoothingEnabled = false;
  mx.fillStyle = "#000000";
  mx.fillRect(0, 0, TW, TH);
  mx.fillStyle = "#ffffff";
  // Land is the continental outline only — state rectangles are not land.
  if (state.coast) fillPoly(mx, state.coast);
  if (state.mainland) fillPoly(mx, state.mainland);
  (state.spurs || []).forEach((poly) => {
    if (poly) fillPoly(mx, poly);
  });
  mx.fillStyle = "#000000";
  (state.lakes || []).forEach((poly) => {
    if (poly) fillPoly(mx, poly);
  });
  const landPix = mx.getImageData(0, 0, TW, TH).data;
  for (let i = 0; i < TW * TH; i++) land[i] = landPix[i * 4] > 20 ? 1 : 0;

  for (let y = 0; y < TH; y++) {
    for (let x = 0; x < TW; x++) {
      const i = y * TW + x;
      if (land[i]) biome[i] = geoBiome(x, y);
    }
  }

  (state.regions || []).forEach((r) => {
    if (r.unlockPhase > 0) return;
    if (WET_IDS.has(r.id)) paintCityBand(land, biome, pnw, r, 1, BIOME.wetforest);
    else if (RAIN_SHADOW_IDS.has(r.id)) paintCityBand(land, biome, pnw, r, 3, BIOME.pine);
  });

  for (let y = 0; y < TH; y++) {
    for (let x = 0; x < TW; x++) {
      const i = y * TW + x;
      if (!land[i]) {
        biome[i] = BIOME.sea;
        height[i] = 0;
        continue;
      }
      const b = biome[i] || BIOME.plains;
      const n = fbm(x * 0.0075, y * 0.0085);
      let h = baseHeight(b) + (n - 0.5) * 0.14;
      if (b === BIOME.desert && n > 0.64) h += 0.14;
      if (b === BIOME.rockies) {
        h = Math.max(h, 0.74);
        if (n > 0.5) h += 0.16;
      }
      if (b === BIOME.ice && n > 0.55) h += 0.08;
      // Cascades: between the Sound and Spokane on the US projection.
      if (x >= 104 && x <= 132 && y >= 145 && y <= 200 && pnw[i] !== 1 && pnw[i] !== 3) {
        if (b === BIOME.wetforest || b === BIOME.forest || b === BIOME.pine || b === BIOME.hills) {
          pnw[i] = 2;
          h = Math.min(1, Math.max(h, 0.6) + 0.14 + (n - 0.45) * 0.1);
          biome[i] = BIOME.pine;
        }
      }
      if (pnw[i] === 3) h = Math.max(0.16, h - 0.08);
      if (b === BIOME.farm || b === BIOME.plains) h = Math.min(h, 0.2);
      height[i] = Math.max(0.02, Math.min(1, h));
    }
  }
  return { land, biome, height, pnw };
}

function paintBase(fields, seasonId) {
  const c = document.createElement("canvas");
  c.width = TW;
  c.height = TH;
  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const { land, biome, height, pnw } = fields;
  const img = ctx.createImageData(TW, TH);
  const data = img.data;
  const winter = seasonId === "winter";
  const fall = seasonId === "fall";

  for (let y = 0; y < TH; y++) {
    for (let x = 0; x < TW; x++) {
      const i = y * TW + x;
      const o = i * 4;
      if (!land[i]) {
        const wave = ((x + y + ((x * 3) ^ y)) & 3) === 0;
        data[o] = wave ? 0x3a : 0x2a;
        data[o + 1] = wave ? 0x80 : 0x68;
        data[o + 2] = wave ? 0xa8 : 0x90;
        data[o + 3] = 255;
        continue;
      }
      const b = biome[i];
      const pal = PAL_RGB[b] || PAL_RGB[BIOME.plains];
      const h = height[i];
      const se = height[Math.min(TW * TH - 1, i + TW + 1)] || h;
      const slope = h - se;
      const high = h > 0.72;
      let rgb = toneRgb(pal, (x + y * 3 + (h * 8) | 0) & 3, high);
      if (winter && (b === BIOME.ice || b === BIOME.tundra)) rgb = pal[3] || rgb;
      if (winter && high && (b === BIOME.rockies || b === BIOME.hills || (b === BIOME.pine && pnw[i] === 2))) rgb = pal[3] || rgb;
      if (fall && (b === BIOME.forest || b === BIOME.pine || b === BIOME.hills) && !high && b !== BIOME.wetforest && pnw[i] !== 1) {
        rgb = ((x + y) & 1) === 0 ? FALL_A : FALL_B;
      }
      if (b === BIOME.wetforest) rgb = toneRgb(PAL_RGB[BIOME.wetforest], (x + y * 2) & 3, false);
      if (pnw[i] === 2 && high) rgb = PEAK_RGB;
      if (b === BIOME.rockies && h > 0.84) rgb = (x + y) % 3 === 0 ? SNOW_A : SNOW_B;
      let shore = 0;
      if (x === 0 || !land[i - 1]) shore += 1;
      if (x === TW - 1 || !land[i + 1]) shore += 1;
      if (y === 0 || !land[i - TW]) shore += 1;
      if (y === TH - 1 || !land[i + TW]) shore += 1;
      if (shore) rgb = SHORE_RGB;
      const col = mulRgb(rgb, shore ? 0.15 : slope);
      data[o] = col[0];
      data[o + 1] = col[1];
      data[o + 2] = col[2];
      data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const elev = displaceLand(c, fields);
  scatterFeatures(elev.getContext("2d"), fields, seasonId);
  hazeCoast(elev, fields);
  return elev;
}

function liftFor(h, b) {
  if (b === BIOME.rockies) return Math.floor(h * 26);
  if (b === BIOME.desert) return Math.floor(h * 12);
  if (b === BIOME.hills || b === BIOME.ice) return Math.floor(h * 14);
  if (b === BIOME.farm || b === BIOME.plains) return Math.floor(h * 5);
  return Math.floor(h * ELEV);
}

function cliffRGB(b, band) {
  if (b === BIOME.desert) return [138, 68, 28];
  if (b === BIOME.ice) return [78, 102, 118];
  if (band === 2) return [42, 52, 40];
  if (b === BIOME.wetforest || b === BIOME.forest || b === BIOME.pine) return [12, 32, 20];
  if (b === BIOME.rockies) return [32, 36, 44];
  if (b === BIOME.farm || b === BIOME.plains) return [96, 78, 28];
  return [42, 36, 28];
}

function displaceLand(srcCanvas, fields) {
  const { land, biome, height, pnw } = fields;
  const srcCtx = typeof srcCanvas.getImageData === "function" ? srcCanvas : srcCanvas.getContext("2d");
  const src = srcCtx.getImageData(0, 0, TW, TH).data;
  const out = new Uint8ClampedArray(TW * TH * 4);
  for (let i = 0; i < TW * TH; i++) {
    if (land[i]) continue;
    const o = i * 4;
    out[o] = src[o];
    out[o + 1] = src[o + 1];
    out[o + 2] = src[o + 2];
    out[o + 3] = 255;
  }
  for (let y = 0; y < TH; y++) {
    for (let x = 0; x < TW; x++) {
      const i = y * TW + x;
      if (!land[i]) continue;
      const b = biome[i];
      const lift = liftFor(height[i], b);
      const dy = Math.max(0, y - lift);
      const [cr, cg, cb] = cliffRGB(b, pnw[i]);
      for (let yy = dy + 1; yy <= y; yy++) {
        const o = (yy * TW + x) * 4;
        out[o] = cr;
        out[o + 1] = cg;
        out[o + 2] = cb;
        out[o + 3] = 255;
      }
      const o = (dy * TW + x) * 4;
      const s = i * 4;
      out[o] = src[s];
      out[o + 1] = src[s + 1];
      out[o + 2] = src[s + 2];
      out[o + 3] = 255;
      if (height[i] > 0.82 && (b === BIOME.rockies || b === BIOME.ice || pnw[i] === 2) && dy > 0) {
        const so = ((dy - 1) * TW + x) * 4;
        out[so] = 244;
        out[so + 1] = 247;
        out[so + 2] = 252;
        out[so + 3] = 255;
      }
    }
  }
  const elev = document.createElement("canvas");
  elev.width = TW;
  elev.height = TH;
  const ex = elev.getContext("2d");
  ex.imageSmoothingEnabled = false;
  const img = ex.createImageData(TW, TH);
  img.data.set(out);
  ex.putImageData(img, 0, 0);
  return elev;
}

function hazeCoast(canvas, fields) {
  const { land, pnw } = fields;
  const ctx = canvas.getContext("2d");
  const pix = ctx.getImageData(0, 0, TW, TH);
  const d = pix.data;
  for (let y = 1; y < TH - 1; y++) {
    for (let x = 1; x < TW - 1; x++) {
      const i = y * TW + x;
      const o = i * 4;
      if (!land[i]) continue;
      const wet = pnw && pnw[i] === 1;
      let near = 0;
      if (!land[i - 1]) near += 1;
      if (!land[i + 1]) near += 1;
      if (!land[i - TW]) near += 1;
      if (!land[i + TW]) near += 1;
      if (near) {
        d[o] = 247;
        d[o + 1] = 243;
        d[o + 2] = 230;
        continue;
      }
      if (!wet) continue;
      const k = 0.18;
      d[o] = Math.round(d[o] * (1 - k) + 48 * k);
      d[o + 1] = Math.round(d[o + 1] * (1 - k) + 90 * k);
      d[o + 2] = Math.round(d[o + 2] * (1 - k) + 108 * k);
    }
  }
  ctx.putImageData(pix, 0, 0);
}

function scatterFeatures(ctx, fields, seasonId) {
  const { land, biome, height, pnw } = fields;
  for (let y = 8; y < TH - 8; y += 14) {
    for (let x = 8; x < TW - 8; x += 14) {
      const i = y * TW + x;
      if (!land[i]) continue;
      const n = hash2(x * 17, y * 13);
      const b = biome[i];
      const lift = liftFor(height[i], b);
      const py = y - lift;
      const band = pnw ? pnw[i] : 0;
      if (b === BIOME.wetforest || band === 1) {
        if (n > 0.18) fir(ctx, x - 3, py - 12, 11 + ((n * 7) | 0));
        if (n > 0.42) fir(ctx, x + 2, py - 9, 8);
        if (n > 0.7) {
          ctx.fillStyle = "#c8d8d8";
          ctx.fillRect(x, py - 4, 1, 3);
        }
      } else if (band === 2) {
        if (n > 0.4) peak(ctx, x, py, 7 + ((height[i] * 8) | 0));
        if (n > 0.62) pine(ctx, x - 1, py - 6, 6);
      } else if (band === 3 || (b === BIOME.pine && band !== 2)) {
        if (n > 0.48) dryPine(ctx, x - 2, py - 8, 7 + ((n * 4) | 0));
      } else if (b === BIOME.forest || b === BIOME.pine) {
        if (n > 0.28) pine(ctx, x - 3, py - 10, 9 + ((n * 6) | 0));
        if (n > 0.6) pine(ctx, x + 2, py - 8, 7);
      } else if (b === BIOME.rockies) {
        if (height[i] > 0.55 && n > 0.35) peak(ctx, x, py, 8 + ((height[i] * 10) | 0));
        else if (n > 0.7) pine(ctx, x - 1, py - 6, 6);
      } else if (b === BIOME.desert) {
        if (n > 0.55) mesa(ctx, x - 5, py - 5, 11, 6);
      } else if (b === BIOME.farm) {
        ctx.fillStyle = ((x + y) & 1) === 0 ? "#e8d888" : "#887830";
        ctx.fillRect(x - 3, py, 8, 2);
        ctx.fillRect(x - 3, py + 3, 8, 1);
      } else if (b === BIOME.plains && n > 0.55) {
        ctx.fillStyle = "#687038";
        ctx.fillRect(x, py, 4, 2);
      } else if ((b === BIOME.ice || b === BIOME.tundra) && n > 0.45) {
        ctx.fillStyle = "#f8f8f8";
        ctx.fillRect(x, py - 2, 2, 2);
        if (n > 0.75) peak(ctx, x, py, 6);
      } else if (b === BIOME.hills) {
        if (n > 0.4) peak(ctx, x, py, 6);
        if (n > 0.7) pine(ctx, x - 1, py - 5, 5);
      }
    }
  }
  void seasonId;
}

function peak(ctx, x, y, h) {
  ctx.fillStyle = "#5a4830";
  ctx.fillRect(x - 4, y - Math.floor(h / 2), 9, Math.floor(h / 2));
  ctx.fillRect(x - 2, y - h, 5, Math.floor(h / 2));
  ctx.fillStyle = "#f4f0e4";
  ctx.fillRect(x - 1, y - h - 1, 3, 2);
}

function pine(ctx, x, y, h) {
  ctx.fillStyle = "#143018";
  ctx.fillRect(x + 2, y, 1, h);
  ctx.fillStyle = "#246038";
  ctx.fillRect(x, y + 1, 5, 2);
  ctx.fillStyle = "#184828";
  ctx.fillRect(x + 1, y - 1, 3, 2);
}

function fir(ctx, x, y, h) {
  ctx.fillStyle = "#0a1810";
  ctx.fillRect(x + 2, y, 1, h);
  ctx.fillStyle = "#144830";
  ctx.fillRect(x, y + 1, 6, 3);
  ctx.fillStyle = "#0e3020";
  ctx.fillRect(x + 1, y - 2, 4, 3);
}

function dryPine(ctx, x, y, h) {
  ctx.fillStyle = "#2a3820";
  ctx.fillRect(x + 2, y, 1, h);
  ctx.fillStyle = "#5a7848";
  ctx.fillRect(x, y + 2, 5, 2);
  ctx.fillStyle = "#4a6838";
  ctx.fillRect(x + 1, y, 3, 2);
}

function mesa(ctx, x, y, w, h) {
  ctx.fillStyle = "#8a5028";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#e09858";
  ctx.fillRect(x + 1, y, w - 2, 1);
}

export function ensureTheaterTerrain(state) {
  const key = cacheKey(state);
  if (terrainCache && terrainCache.key === key) return terrainCache;
  const fields = buildFields(state);
  const canvas = paintBase(fields, state._season?.id);
  terrainCache = { key, fields, canvas };
  return terrainCache;
}

export function invalidateTerrain() {
  terrainCache = null;
}

export function markerKind(r) {
  if (r?.id === "seattle") return "street";
  if (r?.id === "olympia" || r?.id === "spokane") return "mill";
  const g = r.geo || {};
  if ((g.fuel || 0) >= 2) return "pump";
  if ((g.farm || 0) >= 2) return "elevator";
  if ((g.mine || 0) >= 2) return "headframe";
  if ((g.defense || 0) >= 2) return "bunker";
  const t = r.terrainBias;
  if (t === "urban") return "street";
  if (t === "coast") return "tower";
  if (t === "ice" || t === "tundra") return "bunker";
  if (t === "hills") return "ranch";
  if (t === "forest") return "mill";
  if (t === "plains") return "elevator";
  return "ranch";
}

function px(ctx, x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

/** 1980s American construction — isometric-ish pixel marks. */
export function draw80sMarker(ctx, kind, x, y, selected, fill, scale) {
  const ink = "#000018";
  const gold = selected ? "#f8d800" : "#f8f8f8";
  const body = fill || "#607838";
  const roof = "#6a4030";
  const conc = "#888880";
  const s = scale || 1;
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(s, s);
  px(ctx, -6, 2, 14, 2, "#000018");
  if (kind === "elevator") {
    px(ctx, -2, -16, 5, 16, conc);
    px(ctx, -3, -18, 7, 3, roof);
    px(ctx, 3, -10, 5, 10, body);
    px(ctx, 4, -8, 2, 2, gold);
    px(ctx, -1, -14, 3, 2, "#c8a038");
  } else if (kind === "pump") {
    px(ctx, -4, -3, 10, 3, conc);
    px(ctx, -1, -8, 3, 6, body);
    px(ctx, -8, -10, 12, 2, ink);
    px(ctx, -9, -13, 4, 4, gold);
    px(ctx, 3, -12, 3, 3, conc);
  } else if (kind === "tower") {
    px(ctx, 0, -18, 1, 18, conc);
    px(ctx, -3, -12, 7, 1, ink);
    px(ctx, -2, -8, 5, 1, ink);
    px(ctx, -1, -4, 3, 1, ink);
    px(ctx, -1, -20, 3, 2, "#f03030");
  } else if (kind === "bunker") {
    px(ctx, -7, -6, 14, 6, conc);
    px(ctx, -8, -3, 16, 4, "#5a5848");
    px(ctx, -2, -5, 4, 3, ink);
    px(ctx, -6, -8, 4, 2, body);
    px(ctx, 3, -9, 2, 3, gold);
  } else if (kind === "headframe") {
    px(ctx, -5, -14, 2, 14, conc);
    px(ctx, 3, -14, 2, 14, conc);
    px(ctx, -5, -15, 10, 2, ink);
    px(ctx, -2, -8, 4, 8, body);
    px(ctx, -1, -6, 2, 2, gold);
  } else if (kind === "street") {
    px(ctx, -7, -8, 8, 8, body);
    px(ctx, -8, -11, 10, 4, roof);
    px(ctx, 1, -12, 6, 12, conc);
    px(ctx, 2, -14, 5, 3, roof);
    px(ctx, -5, -6, 2, 2, gold);
    px(ctx, 3, -8, 2, 2, gold);
  } else if (kind === "mill") {
    px(ctx, -4, -8, 8, 8, roof);
    px(ctx, -3, -6, 6, 6, body);
    px(ctx, 4, -14, 2, 14, conc);
    px(ctx, 2, -12, 6, 2, ink);
    px(ctx, -1, -4, 2, 2, gold);
  } else {
    px(ctx, -6, -7, 12, 7, body);
    px(ctx, -7, -10, 14, 4, roof);
    px(ctx, -5, -12, 6, 3, roof);
    px(ctx, -3, -5, 3, 2, gold);
    px(ctx, 2, -4, 3, 3, "#3a3020");
  }
  if (selected) {
    px(ctx, -8, 3, 16, 1, gold);
    px(ctx, -8, -20, 1, 16, gold);
    px(ctx, 7, -20, 1, 16, gold);
  }
  ctx.restore();
}

export function drawPixelRoadFull(ctx, a, b, pulseOn) {
  const x0 = Math.round(a[0]);
  const y0 = Math.round(a[1]);
  const x1 = Math.round(b[0]);
  const y1 = Math.round(b[1]);
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let x = x0;
  let y = y0;
  let i = 0;
  for (;;) {
    ctx.fillStyle = pulseOn ? "#5a3c08" : "#201810";
    ctx.fillRect(x - 1, y - 1, 3, 3);
    ctx.fillStyle = pulseOn ? "#f8d800" : i % 6 < 4 ? "#f8f4e8" : "#e4d7a4";
    ctx.fillRect(x, y, 1, 1);
    if (x === x1 && y === y1) break;
    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
    i += 1;
  }
}

export function drawPixelRoadHi(ctx, a, b, pulseOn) {
  const [x0, y0] = [Math.round(a[0] / MAP_S), Math.round(a[1] / MAP_S)];
  const [x1, y1] = [Math.round(b[0] / MAP_S), Math.round(b[1] / MAP_S)];
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let x = x0;
  let y = y0;
  for (;;) {
    ctx.fillStyle = pulseOn ? "#886028" : "#3a2810";
    ctx.fillRect(x - 1, y - 1, 3, 3);
    ctx.fillStyle = pulseOn ? "#fff0a0" : "#c8a038";
    ctx.fillRect(x, y, 1, 1);
    if (x === x1 && y === y1) break;
    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}

export function paintTheaterTerrain(o, state, opts) {
  const cache = ensureTheaterTerrain(state);
  o.drawImage(cache.canvas, 0, 0);
  const painted = opts.painted || [];
  painted.forEach((r) => {
    const fac = opts.factionOf ? opts.factionOf(r) : null;
    if (!r.polygon) return;
    o.globalAlpha = fac ? 0.46 : 0.12;
    o.fillStyle = fac ? fac.color : "#607838";
    fillPoly(o, r.polygon);
    o.globalAlpha = 1;
    if (fac) {
      strokePoly(o, r.polygon, "#000018", 3);
      strokePoly(o, r.polygon, fac.color, 2);
    }
    if (r.id === opts.selectedId || r.id === opts.hoverId) {
      strokePoly(o, r.polygon, r.id === opts.selectedId ? "#f8d800" : "#f8f8f8", 2);
    }
  });
}

/** Square city node + faction color flag. Original kit — not a licensed banner. */
export function drawCityNode(ctx, x, y, selected) {
  const ink = selected ? "#f8d800" : "#f8f8f0";
  const fill = "#c8c4b8";
  px(ctx, x - 5, y - 5, 10, 10, "#201810");
  px(ctx, x - 4, y - 4, 8, 8, fill);
  px(ctx, x - 3, y - 3, 6, 6, ink);
  px(ctx, x - 2, y - 2, 4, 4, fill);
}

export function drawFactionFlag(ctx, x, y, color, selected) {
  const pole = selected ? "#f8d800" : "#d8d0c0";
  const fly = color || "#9aa7b0";
  px(ctx, x + 4, y - 24, 2, 24, pole);
  px(ctx, x + 6, y - 24, 16, 11, "#201810");
  px(ctx, x + 7, y - 23, 14, 9, fly);
  px(ctx, x + 7, y - 23, 14, 2, "#fff8e0");
}

export function terrainSize() {
  return { w: TW, h: TH, scale: MAP_S };
}

export function isoLayout(cols, rows, cw, ch) {
  const tw = Math.max(36, Math.floor((cw / (cols + rows)) * 2.15));
  const th = Math.max(18, Math.floor(tw * 0.52));
  return {
    tw,
    th,
    originX: Math.floor(cw / 2),
    originY: Math.floor(ch * 0.16),
  };
}

export function cellToIso(col, row, layout) {
  return [
    layout.originX + (col - row) * (layout.tw / 2),
    layout.originY + (col + row) * (layout.th / 2),
  ];
}

export function isoToCell(px, py, layout, cols, rows) {
  const u = (px - layout.originX) / (layout.tw / 2);
  const v = (py - layout.originY) / (layout.th / 2);
  const col = Math.round((u + v) / 2);
  const row = Math.round((v - u) / 2);
  if (col < 0 || row < 0 || col >= cols || row >= rows) return null;
  return [col, row];
}

function diamond(ctx, x, y, tw, th, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x, y - th / 2);
  ctx.lineTo(x + tw / 2, y);
  ctx.lineTo(x, y + th / 2);
  ctx.lineTo(x - tw / 2, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

const TILE_COL = {
  plains: ["#c8a048", "#8a7840"],
  forest: ["#306830", "#184818"],
  hills: ["#a07840", "#684828"],
  urban: ["#787870", "#484840"],
  ice: ["#80a0b0", "#487088"],
  desert: ["#e09858", "#c87840"],
};

export function tileColors(t, dest) {
  if (dest?.stateCode === "ut" && t === "plains") return TILE_COL.desert;
  if ((dest?.stateCode === "co" || dest?.stateCode === "wy") && t === "hills") return ["#b89858", "#5a4830"];
  if (dest?.stateCode === "wa" && t === "forest") return ["#246038", "#0e3018"];
  return TILE_COL[t] || TILE_COL.plains;
}

export function paintIsoField(ctx, battle, dest, now) {
  const cw = ctx.canvas.width;
  const ch = ctx.canvas.height;
  const layout = isoLayout(battle.cols, battle.rows, cw, ch);
  const siege = (dest?.walls || 0) >= 12 || dest?.terrainBias === "urban";
  ctx.fillStyle = "#102028";
  ctx.fillRect(0, 0, cw, ch);
  paintBattleGround(ctx, cw, ch, dest, now);
  if (siege) paintSiegeWall(ctx, layout, battle, dest);
  for (let y = 0; y < battle.rows; y++) {
    for (let x = 0; x < battle.cols; x++) {
      const t = battle.grid[y][x];
      const pair = tileColors(t, dest);
      const [ix, iy] = cellToIso(x, y, layout);
      const fill = ((x + y) & 1) === 0 ? pair[0] : pair[1];
      diamond(ctx, ix, iy, layout.tw - 2, layout.th - 1, fill, "#201810");
      if (t === "forest") {
        pine(ctx, ix - 3, iy - 10, 8);
        pine(ctx, ix + 2, iy - 8, 6);
      } else if (t === "hills") {
        ctx.fillStyle = "#5a4830";
        ctx.fillRect(ix - 6, iy - 6, 12, 4);
        ctx.fillRect(ix - 3, iy - 10, 6, 4);
      } else if (t === "urban") {
        draw80sMarker(ctx, "street", ix, iy + 2, false, "#686860");
      } else if (t === "ice") {
        ctx.fillStyle = "#f8f8f8";
        ctx.fillRect(ix, iy - 2, 2, 2);
      }
    }
  }
  if (battle.flash) {
    const [fx, fy] = cellToIso(battle.flash.x, battle.flash.y, layout);
    diamond(ctx, fx, fy, layout.tw, layout.th, Math.floor(now / 220) % 2 ? "#f8d800" : "#f8f8f8", "#f03030");
  }
  battle.units.forEach((u) => {
    if (u.hp <= 0) return;
    const [ix, iy] = cellToIso(u.x, u.y, layout);
    drawFieldUnit(ctx, u, ix, iy, battle.selected === u.id, now);
  });
  return layout;
}

function paintBattleGround(ctx, cw, ch, dest, now) {
  const code = dest?.stateCode;
  const bias = dest?.terrainBias;
  if (bias === "ice" || code === "ak") {
    ctx.fillStyle = "#182838";
    ctx.fillRect(0, 0, cw, ch);
    ctx.fillStyle = "#405060";
    ctx.fillRect(0, ch * 0.35, cw, ch);
    return;
  }
  if (code === "ut" || (bias === "plains" && (dest?.geo?.sun || 0) >= 2)) {
    ctx.fillStyle = "#c07840";
    ctx.fillRect(0, 0, cw, Math.floor(ch * 0.4));
    ctx.fillStyle = "#e09858";
    ctx.fillRect(0, ch * 0.4, cw, ch);
    return;
  }
  if (code === "wa" || bias === "forest") {
    ctx.fillStyle = "#3a6888";
    ctx.fillRect(0, 0, cw, Math.floor(ch * 0.32));
    ctx.fillStyle = "#184828";
    ctx.fillRect(0, ch * 0.32, cw, ch);
    return;
  }
  ctx.fillStyle = "#4a88c8";
  ctx.fillRect(0, 0, cw, Math.floor(ch * 0.34));
  ctx.fillStyle = "#8a7840";
  ctx.fillRect(0, ch * 0.34, cw, ch);
  void now;
}

function paintSiegeWall(ctx, layout, battle, dest) {
  const back = cellToIso(battle.cols - 1, 0, layout);
  const far = cellToIso(battle.cols - 1, battle.rows - 1, layout);
  ctx.fillStyle = "#686860";
  ctx.beginPath();
  ctx.moveTo(back[0] + 20, back[1] - 36);
  ctx.lineTo(far[0] + 28, far[1] - 8);
  ctx.lineTo(far[0] + 28, far[1] + 18);
  ctx.lineTo(back[0] + 20, back[1] + 8);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#888880";
  ctx.fillRect(back[0] + 8, back[1] - 28, 22, 8);
  ctx.fillStyle = "#3a3020";
  ctx.fillRect(far[0] + 10, far[1] - 4, 16, 14);
  ctx.fillStyle = "#000018";
  ctx.fillRect(far[0] + 14, far[1], 8, 10);
  void dest;
}

function drawFieldUnit(ctx, u, x, y, selected, now) {
  const col = u.side === "atk" ? "#f8d800" : "#f03030";
  const hop = Math.floor(now / 320) % 2 * 2;
  if (selected) {
    diamond(ctx, x, y + 8, 48, 22, "#f8f8f8", "#f8d800");
  }
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y - hop));
  ctx.scale(2, 2);
  if (u.type === "technical") {
    px(ctx, -8, -4, 16, 6, "#385028");
    px(ctx, 2, -8, 8, 5, "#2a3820");
    px(ctx, -6, 1, 3, 3, "#201810");
    px(ctx, 5, 1, 3, 3, "#201810");
    px(ctx, -8, -5, 2, 2, col);
  } else if (u.type === "regular") {
    px(ctx, -3, -14, 6, 4, "#686860");
    px(ctx, -4, -10, 8, 10, "#385028");
    px(ctx, -3, -8, 6, 3, "#c8a078");
    px(ctx, -5, -10, 2, 10, col);
  } else {
    px(ctx, -3, -12, 6, 3, "#c8a038");
    px(ctx, -4, -9, 8, 9, "#507040");
    px(ctx, -3, -7, 6, 3, "#c8a078");
    px(ctx, -5, -9, 2, 9, col);
  }
  ctx.restore();
  const ratio = Math.max(0, u.hp / u.maxHp);
  const bw = 36;
  px(ctx, x - 18, y - 40, bw, 8, "#000018");
  px(ctx, x - 16, y - 38, Math.floor((bw - 4) * ratio), 4, ratio > 0.35 ? "#30c030" : "#f03030");
  ctx.fillStyle = col;
  ctx.font = "8px 'Press Start 2P', monospace";
  ctx.fillText(String(Math.max(0, u.hp)), x - 8, y - 44);
}

export function paintBiomeBackdrop(ctx, w, h, now, dest) {
  paintBattleGround(ctx, w, h, dest, now);
  const code = dest?.stateCode;
  if (code === "co" || code === "wy") {
    ctx.fillStyle = "#4a5868";
    for (let i = 0; i < 4; i++) {
      const x = 10 + i * Math.floor(w / 4);
      ctx.fillRect(x, Math.floor(h * 0.2), Math.floor(w / 6), Math.floor(h * 0.28));
      ctx.fillStyle = "#e8e8e0";
      ctx.fillRect(x + 8, Math.floor(h * 0.16), 6, 6);
      ctx.fillStyle = "#4a5868";
    }
  }
  if (code === "wa") {
    pine(ctx, 8, Math.floor(h * 0.4), 12);
    pine(ctx, w - 16, Math.floor(h * 0.38), 14);
  }
}

function bakeFace(kit, initials) {
  const c = document.createElement("canvas");
  c.width = 48;
  c.height = 56;
  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  px(ctx, 0, 0, 48, 56, "#101028");
  px(ctx, 4, 4, 40, 48, "#000018");
  px(ctx, 12, 8, 24, 8, kit.hat);
  px(ctx, 14, 14, 20, 12, kit.skin);
  px(ctx, 16, 12, 16, 4, kit.hair);
  px(ctx, 16, 18, 4, 2, "#201810");
  px(ctx, 28, 18, 4, 2, "#201810");
  px(ctx, 10, 26, 28, 20, kit.coat);
  px(ctx, 12, 28, 6, 14, kit.hat);
  ctx.fillStyle = "#f8d800";
  ctx.font = "8px 'Press Start 2P', monospace";
  ctx.fillText((initials || "NF").slice(0, 2), 16, 50);
  px(ctx, 2, 2, 44, 2, "#f8d800");
  px(ctx, 2, 52, 44, 2, "#f8d800");
  px(ctx, 2, 2, 2, 52, "#f8d800");
  px(ctx, 44, 2, 2, 52, "#f8d800");
  return c.toDataURL("image/png");
}

export function originalFaceGrid() {
  if (faceCache) return faceCache;
  faceCache = FACE_KITS.map((kit, i) => ({
    id: `F${i}`,
    src: bakeFace(kit, `F${i.toString(16).toUpperCase()}`),
  }));
  return faceCache;
}

export function faceSrc(id) {
  const hit = originalFaceGrid().find((f) => f.id === id);
  return hit ? hit.src : "";
}

export function paintCityOversee(dest, now, destRegion) {
  const w = dest.canvas.width;
  const h = dest.canvas.height;
  dest.imageSmoothingEnabled = false;
  dest.fillStyle = "#102028";
  dest.fillRect(0, 0, w, h);
  paintBiomeBackdrop(dest, w, h, now, destRegion);
  draw80sMarker(dest, markerKind(destRegion || { terrainBias: "urban" }), Math.floor(w * 0.55), Math.floor(h * 0.72), false, "#607838");
  draw80sMarker(dest, "tower", Math.floor(w * 0.78), Math.floor(h * 0.7), false, "#686860");
}
