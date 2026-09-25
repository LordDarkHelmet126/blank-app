/**
 * Opt-in PixiJS v8 stage for the US theater map and the yard duel.
 * Loaded only when the page is opened with ?gfx=pixi. The canvas drawers stay in ui.js.
 * Vendored build: vendor/pixi.min.mjs (PixiJS 8.20.1, no CDN, no npm step).
 */

import {
  Application,
  Container,
  Filter,
  GlProgram,
  Graphics,
  Sprite,
  Text,
  Texture,
  defaultFilterVert,
} from "../vendor/pixi.min.mjs";
import { ensureTheaterTerrain } from "./terrain.js";
import { WORLD_LAND } from "./world-washes.js";
import { factionOf, isAdjacent, mapRoads, playerOf, regionOf, theaterVisible } from "./engine.js";
import { inlandDesk, inlandLook } from "./inland.js";

const MAP_W = 1000;
const MAP_H = 620;
const DUEL_W = 640;
const DUEL_H = 180;

const WORLD_OVERLAY = [
  {
    color: "#e57373",
    ring: [
      [10.9, 54.1], [12.2, 54.4], [14.2, 54.1], [14.6, 53.3], [14.8, 52.2],
      [14.9, 51.2], [14.2, 50.9], [12.5, 50.3], [11.6, 50.5], [10.6, 51.0],
      [10.4, 51.6], [10.9, 52.4], [10.5, 53.2], [10.9, 54.1],
    ],
  },
  {
    color: "#1565c0",
    ring: [
      [-160.2, 22.2], [-159.2, 22.2], [-157.8, 21.6], [-156.5, 20.9],
      [-155.1, 20.0], [-154.8, 19.4], [-155.6, 19.1], [-157.0, 20.2],
      [-158.4, 21.3], [-160.2, 22.2],
    ],
  },
];

const WORLD_DESKS = [
  { id: "bering_strait", lon: -168, lat: 65.6, color: "#7aa0b4" },
  { id: "far_russia", lon: 158, lat: 63, color: "#9a3b3b" },
  { id: "gulf_passage", lon: -90.5, lat: 23.8, color: "#8c4a4a" },
  { id: "far_cuba", lon: -79.5, lat: 21.6, color: "#8c4a4a" },
  { id: "far_nicaragua", lon: -85.2, lat: 12.4, color: "#8c4a4a" },
  { id: "far_korea", lon: 127.2, lat: 38.2, color: "#9a3b3b" },
];

const INLAND_DESKS = [
  { id: "kamchatka", lon: 159.6, lat: 56, color: "#9a3b3b" },
  { id: "siberia", lon: 148.5, lat: 61.5, color: "#9a3b3b" },
  { id: "havana", lon: -82.5, lat: 23.15, color: "#8c4a4a" },
  { id: "managua", lon: -86.3, lat: 12.1, color: "#8c4a4a" },
  { id: "sponsor_lane", lon: 128, lat: 46, color: "#7aa0b4" },
  { id: "kr_inland", lon: 127.5, lat: 36.5, color: "#9a3b3b" },
];

const WORLD_STRIKES = [
  [-0.1, 51.5], [2.3, 48.9], [10, 51], [13.4, 52.5], [19, 51], [30, 50],
  [37.6, 55.7], [44, 48], [68, 48], [104, 36], [114, 31], [121, 31],
  [127, 39], [139.7, 35.7], [37, 33],
];

const NUKE_SCARS = [
  { x: 813, y: 332 }, { x: 844, y: 304 }, { x: 528, y: 329 }, { x: 506, y: 290 },
  { x: 418, y: 155 }, { x: 488, y: 161 }, { x: 390, y: 233 },
];

const CAMPAIGN_ROADS = [
  ["spokane", "portland"], ["spokane", "bend"], ["boise", "missoula"], ["boise", "jackson"],
  ["cheyenne", "salt_lake"], ["cheyenne", "lincoln"], ["cheyenne", "denver"], ["denver", "lincoln"],
  ["reno", "salt_lake"], ["lincoln", "wichita"], ["topeka", "st_louis"],
];

const STALL_IDS = ["cheyenne", "omaha", "lincoln", "topeka", "wichita", "st_louis"];

const BIOME_RGB = {
  1: [196, 214, 222],
  2: [126, 146, 108],
  3: [90, 150, 112],
  4: [46, 108, 58],
  5: [62, 118, 72],
  6: [154, 128, 68],
  7: [108, 112, 116],
  8: [214, 146, 64],
  9: [132, 156, 72],
  10: [196, 170, 64],
  11: [122, 122, 108],
  12: [22, 78, 52],
};

let ready = false;
let mapApp = null;
let duelApp = null;
let mapCanvas = null;
let duelCanvas = null;

const mapLayers = {};
const duelLayers = {};
const textPool = [];
let textUsed = 0;
const fighterTex = new Map();
let hitFx = { id: "", until: 0, debt: 0, base: 0, sparks: [], muzzle: [] };

export function isReady() {
  return ready;
}

export async function initPixi(mapEl, duelEl) {
  mapCanvas = mapEl;
  duelCanvas = duelEl;
  mapApp = new Application();
  await mapApp.init({
    canvas: mapEl,
    width: MAP_W,
    height: MAP_H,
    preference: "webgl",
    resolution: 1,
    autoDensity: false,
    antialias: true,
    background: "#2a6890",
    preserveDrawingBuffer: true,
    hello: false,
    autoStart: false,
  });
  mapApp.ticker.stop();
  fitCanvas(mapEl, "100%", "100%");
  mapEl.dataset.pixi = "1";

  const world = new Container();
  const screen = new Container();
  mapApp.stage.eventMode = "none";
  mapApp.stage.addChild(world, screen);
  mapLayers.world = world;
  mapLayers.screen = screen;
  mapLayers.globe = new Graphics();
  mapLayers.globeStroke = new Graphics();
  mapLayers.under = new Graphics();
  mapLayers.terrain = new Sprite(Texture.EMPTY);
  mapLayers.wash = new Sprite(Texture.EMPTY);
  mapLayers.fog = new Sprite(Texture.EMPTY);
  mapLayers.over = new Graphics();
  mapLayers.plates = new Graphics();
  world.addChild(
    mapLayers.globe,
    mapLayers.globeStroke,
    mapLayers.under,
    mapLayers.terrain,
    mapLayers.wash,
    mapLayers.fog,
    mapLayers.over,
  );
  screen.addChild(mapLayers.plates);
  mapLayers.globeKey = "";
  mapLayers.strokeKey = "";
  mapLayers.terrainKey = "";
  mapLayers.washKey = "";
  mapLayers.fogKey = "";
  mapLayers.light = null;
  try {
    mapLayers.light = hillshadeFilter();
    mapLayers.terrain.filters = [mapLayers.light];
  } catch (err) {
    console.warn("pixi hillshade shader skipped", err);
    mapLayers.terrain.filters = null;
  }

  duelApp = new Application();
  await duelApp.init({
    canvas: duelEl,
    width: DUEL_W,
    height: DUEL_H,
    preference: "webgl",
    resolution: 1,
    autoDensity: false,
    antialias: false,
    background: "#082038",
    preserveDrawingBuffer: true,
    hello: false,
    autoStart: false,
  });
  duelApp.ticker.stop();
  fitCanvas(duelEl, "100%", "92px");
  duelEl.dataset.pixi = "1";
  const shake = new Container();
  duelApp.stage.eventMode = "none";
  duelApp.stage.addChild(shake);
  duelLayers.shake = shake;
  duelLayers.arena = new Graphics();
  duelLayers.fx = new Graphics();
  duelLayers.you = new Sprite(Texture.EMPTY);
  duelLayers.foe = new Sprite(Texture.EMPTY);
  duelLayers.you.pivot.set(12, 0);
  duelLayers.foe.pivot.set(12, 0);
  shake.addChild(duelLayers.arena, duelLayers.you, duelLayers.foe, duelLayers.fx);
  duelLayers.arenaKey = "";

  ready = true;
}

function fitCanvas(canvas, width, height) {
  canvas.style.width = width;
  canvas.style.height = height;
  canvas.style.display = "block";
}

function hillshadeFilter() {
  // Texel size is fixed to the 1000×620 theater bake. Declaring uInputSize here
  // fights the default filter vertex precision and the program fails to link.
  const fragment = `
in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main(void) {
  vec2 t = vec2(1.0 / 1000.0, 1.0 / 620.0);
  vec4 c = texture(uTexture, vTextureCoord);
  if (c.a < 0.04) { finalColor = c; return; }
  float l = dot(texture(uTexture, vTextureCoord + vec2(-t.x, -t.y)).rgb, vec3(0.30, 0.55, 0.15));
  float r = dot(texture(uTexture, vTextureCoord + vec2(t.x, t.y)).rgb, vec3(0.30, 0.55, 0.15));
  float lit = clamp(0.88 + (l - r) * 1.35, 0.62, 1.22);
  finalColor = vec4(c.rgb * lit, c.a);
}
`;
  return new Filter({
    glProgram: new GlProgram({ vertex: defaultFilterVert, fragment, name: "nf-hillshade" }),
  });
}

function projectLL(lon, lat, pacific) {
  let L = lon;
  if (pacific && L > 20) L -= 360;
  const x = 36 + ((L + 124.8) / 57.9) * 942;
  const y = 132 + ((49.45 - lat) / 25.05) * 476;
  return [x, y];
}

function coastParts(ring) {
  const parts = [];
  let part = [];
  ring.forEach((pt) => {
    if (part.length && Math.abs(pt[0] - part[part.length - 1][0]) > 180) {
      if (part.length > 2) parts.push(part);
      part = [pt];
    } else part.push(pt);
  });
  if (part.length > 2) parts.push(part);
  return parts;
}

function projectPart(part, pacific) {
  const pts = [];
  part.forEach((p) => {
    const [x, y] = projectLL(p[0], p[1], pacific);
    pts.push(x, y);
  });
  const a = part[0];
  const b = part[part.length - 1];
  if (a && b && Math.abs(a[0] - b[0]) > 40) {
    const pole = Math.min(a[1], b[1]) < 0 ? -90 : 90;
    const [x1, y1] = projectLL(b[0], pole, pacific);
    const [x2, y2] = projectLL(a[0], pole, pacific);
    pts.push(x1, y1, x2, y2);
  }
  return pts;
}

function fillParts(g, ring, color, pacific) {
  coastParts(ring).forEach((part) => {
    const pts = projectPart(part, pacific);
    if (pts.length >= 6) g.poly(pts, true).fill({ color });
  });
}

function strokeParts(g, ring, width, pacific) {
  coastParts(ring).forEach((part) => {
    const pts = projectPart(part, pacific);
    if (pts.length >= 4) g.poly(pts, true).stroke({ width, color: 0x1a140c, join: "round", cap: "round" });
  });
}

function rebuildGlobe(pacific) {
  const g = mapLayers.globe;
  g.clear();
  WORLD_LAND.concat(WORLD_OVERLAY).forEach((land) => fillParts(g, land.ring, land.color, pacific));
  mapLayers.globeKey = pacific ? "p" : "n";
}

function rebuildGlobeStroke(pacific, z) {
  const width = Math.max(1.5, 2.05 / Math.max(0.16, z));
  const g = mapLayers.globeStroke;
  g.clear();
  WORLD_LAND.concat(WORLD_OVERLAY).forEach((land) => strokeParts(g, land.ring, width, pacific));
  mapLayers.strokeKey = `${pacific ? "p" : "n"}|${Math.round(width)}`;
}

function hash2(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function bakeTerrain(state) {
  const cache = ensureTheaterTerrain(state);
  const { land, biome, height } = cache.fields;
  const full = document.createElement("canvas");
  full.width = MAP_W;
  full.height = MAP_H;
  const lift = document.createElement("canvas");
  lift.width = MAP_W;
  lift.height = MAP_H;
  const fx = full.getContext("2d", { willReadFrequently: true });
  fx.drawImage(cache.canvas, 0, 0);
  const src = fx.getImageData(0, 0, MAP_W, MAP_H);
  const img = fx.createImageData(MAP_W, MAP_H);
  const d = img.data;
  const s = src.data;
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const i = y * MAP_W + x;
      const o = i * 4;
      if (!land[i]) {
        // Keep the sea-card alpha. Pixels outside that card are transparent so
        // the globe and the stage ocean show through, same as the canvas plate.
        d[o] = s[o];
        d[o + 1] = s[o + 1];
        d[o + 2] = s[o + 2];
        d[o + 3] = s[o + 3];
        continue;
      }
      const base = BIOME_RGB[biome[i]] || [168, 156, 112];
      const grain = ((hash2(x, y) - 0.5) * 10) | 0;
      let shade = 1;
      if (x > 0 && x < MAP_W - 1 && y > 0 && y < MAP_H - 1) {
        const dzdx = (height[i + 1] - height[i - 1]) * 9;
        const dzdy = (height[i + MAP_W] - height[i - MAP_W]) * 9;
        const slope = Math.atan(Math.hypot(dzdx, dzdy));
        const aspect = Math.atan2(dzdy, -dzdx);
        const alt = 0.72;
        const az = 5.5;
        shade = Math.sin(alt) * Math.cos(slope) + Math.cos(alt) * Math.sin(slope) * Math.cos(az - aspect);
        shade = 0.58 + Math.max(0, Math.min(1, shade)) * 0.62;
      }
      if (height[i] > 0.84) shade = Math.min(1.25, shade + 0.18);
      let shore = 0;
      if (x === 0 || !land[i - 1]) shore += 1;
      if (x === MAP_W - 1 || !land[i + 1]) shore += 1;
      if (y === 0 || !land[i - MAP_W]) shore += 1;
      if (y === MAP_H - 1 || !land[i + MAP_W]) shore += 1;
      let r = base[0];
      let g = base[1];
      let b = base[2];
      if (shore) {
        r = 247;
        g = 243;
        b = 230;
        shade = 1;
      }
      d[o] = Math.max(0, Math.min(255, (r + grain) * shade));
      d[o + 1] = Math.max(0, Math.min(255, (g + grain) * shade));
      d[o + 2] = Math.max(0, Math.min(255, (b + grain) * shade));
      d[o + 3] = 255;
    }
  }
  fx.putImageData(img, 0, 0);
  scatterTrees(fx, land, biome, height);
  const lx = lift.getContext("2d", { willReadFrequently: true });
  lx.drawImage(full, 0, 0);
  const punched = lx.getImageData(0, 0, MAP_W, MAP_H);
  const p = punched.data;
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const i = y * MAP_W + x;
      const o = i * 4;
      if ((x < 268 && y < 136) || !land[i]) p[o + 3] = 0;
    }
  }
  lx.putImageData(punched, 0, 0);
  return { full, lift, key: cache.key };
}

function scatterTrees(ctx, land, biome, height) {
  for (let y = 10; y < MAP_H - 8; y += 16) {
    for (let x = 10; x < MAP_W - 8; x += 16) {
      const i = y * MAP_W + x;
      if (!land[i]) continue;
      const n = hash2(x * 3, y * 5);
      const b = biome[i];
      if ((b === 12 || b === 4 || b === 5) && n > 0.62) {
        ctx.fillStyle = b === 12 ? "#0e3020" : "#184828";
        ctx.fillRect(x, y - 7, 1, 8);
        ctx.fillStyle = b === 12 ? "#1c5834" : "#2a7040";
        ctx.fillRect(x - 2, y - 8, 5, 3);
      } else if (b === 7 && height[i] > 0.7 && n > 0.55) {
        ctx.fillStyle = "#6a645c";
        ctx.fillRect(x - 3, y - 4, 7, 4);
        ctx.fillStyle = "#f4f7fb";
        ctx.fillRect(x - 1, y - 6, 3, 2);
      } else if (b === 8 && n > 0.7) {
        ctx.fillStyle = "#a86830";
        ctx.fillRect(x - 4, y - 3, 8, 3);
      } else if ((b === 9 || b === 10) && n > 0.78) {
        ctx.fillStyle = "#6a7030";
        ctx.fillRect(x, y, 5, 1);
      }
    }
  }
}

function polyPath(ctx, ring) {
  ctx.beginPath();
  ring.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  ctx.closePath();
}

function bakeWash(state, stateWash) {
  const c = document.createElement("canvas");
  c.width = MAP_W;
  c.height = MAP_H;
  const ctx = c.getContext("2d");
  const lines = state.stateLines || [];
  lines.forEach((line) => {
    const wash = stateWash(line.id);
    if (!wash || !line.ring) return;
    ctx.globalAlpha = wash.kind === "held" || wash.kind === "occupied" ? 0.32 : 0.18;
    ctx.fillStyle = wash.color;
    polyPath(ctx, line.ring);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  const strokeRing = (ring, color, width) => {
    if (!ring) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    polyPath(ctx, ring);
    ctx.stroke();
  };
  lines.forEach((line) => {
    if (!line.ring) return;
    strokeRing(line.ring, "#f7f3ea", 3.2);
    strokeRing(line.ring, "#120e0a", 1.7);
    const wash = stateWash(line.id);
    if (!wash || wash.kind === "local") return;
    const edge = wash.kind === "held" ? "#f8d800" : wash.kind === "occupied" ? "#2a0808" : "#f8f8f8";
    strokeRing(line.ring, edge, wash.kind === "occupied" ? 3 : 2);
  });
  if (state.mainland) {
    strokeRing(state.mainland, "#102018", 5);
    strokeRing(state.mainland, "#f4efe2", 2);
  }
  if (state.coast) {
    strokeRing(state.coast, "#102018", 4);
    strokeRing(state.coast, "#f4efe2", 2);
  }
  (state.spurs || []).forEach((poly) => {
    strokeRing(poly, "#102018", 3);
    strokeRing(poly, "#f4efe2", 2);
  });
  return c;
}

function bakeFog(state, stateWash) {
  const sharp = document.createElement("canvas");
  sharp.width = MAP_W;
  sharp.height = MAP_H;
  const sctx = sharp.getContext("2d", { willReadFrequently: true });
  (state.stateLines || []).forEach((line) => {
    if (!line.ring) return;
    const wash = stateWash(line.id);
    if (wash?.kind === "held") return;
    sctx.fillStyle = wash?.kind === "occupied" ? "rgba(150, 176, 196, 0.55)" : "rgba(186, 206, 220, 0.38)";
    polyPath(sctx, line.ring);
    sctx.fill();
  });
  const c = document.createElement("canvas");
  c.width = MAP_W;
  c.height = MAP_H;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.filter = "blur(7px)";
  ctx.drawImage(sharp, 0, 0);
  ctx.filter = "none";
  return c;
}

function washSignature(state, stateWash) {
  const camp = (state.campaign?.liberated || []).join(",");
  const owners = state.regions.map((r) => `${r.id}:${r.owner || ""}`).join("|");
  let kinds = "";
  (state.stateLines || []).forEach((line) => {
    const wash = stateWash(line.id);
    kinds += `${line.id}:${wash?.kind || "-"}:${wash?.color || ""};`;
  });
  return `${camp}#${owners}#${kinds}`;
}

function bindTexture(sprite, canvas, linear) {
  const tex = Texture.from(canvas);
  if (tex.source) tex.source.scaleMode = linear ? "linear" : "nearest";
  const prev = sprite.texture;
  sprite.texture = tex;
  if (prev && prev !== Texture.EMPTY) prev.destroy(true);
}

function cityXY(r) {
  const p = r.city || r.label;
  return [p[0], p[1]];
}

function sameRoad(a, b, c, d) {
  if (!c || !d) return false;
  const k = (p, q) => `${p[0] | 0},${p[1] | 0}|${q[0] | 0},${q[1] | 0}`;
  return k(a, b) === k(c, d) || k(a, b) === k(d, c);
}

function line(g, x0, y0, x1, y1, width, color) {
  g.moveTo(x0, y0).lineTo(x1, y1).stroke({ width, color, cap: "round", join: "round" });
}

function drawRoutes(g, state, mapView) {
  const focus = mapView.focus;
  if (mapView.z > 0.92 && !focus) return;
  const routes = [];
  const inland = [];
  if (focus === "bering") {
    routes.push({ color: "#d5e6f2", pts: [[-165.4, 64.5], [-168, 65.6], [178.5, 65.3], [170, 64.2], [158, 63]] });
    inland.push({ color: "#e4d7a4", pts: [[158, 63], [159.6, 56], [148.5, 61.5]] });
  } else if (focus === "korea") {
    routes.push({ color: "#d5e6f2", pts: [[158, 63], [128, 46], [127.2, 38.2]] });
    inland.push({ color: "#e4d7a4", pts: [[127.2, 38.2], [127.5, 36.5]] });
  } else {
    routes.push(
      { color: "#7aa0b4", pts: [[-168, 65.6], [-170, 76], [-78, 77]] },
      { color: "#7aa0b4", pts: [[-18, 76], [40, 74], [100, 70], [158, 63]] },
      { color: "#8c4a4a", pts: [[-90.5, 23.8], [-79.5, 21.6]] },
      { color: "#8c4a4a", pts: [[-90.5, 23.8], [-85.2, 12.4]] },
    );
    if (mapView.z >= 0.3 || focus === "cuba") routes.push({ color: "#8c4a4a", pts: [[-79.5, 21.6], [-85.2, 12.4]] });
    if (focus === "cuba") {
      inland.push(
        { color: "#e4d7a4", pts: [[-79.5, 21.6], [-82.5, 23.15]] },
        { color: "#e4d7a4", pts: [[-85.2, 12.4], [-86.3, 12.1]] },
      );
    }
  }
  const z = mapView.z || 1;
  const casing = focus ? Math.max(16, 12 / z) : Math.max(8, 7 / z);
  const core = focus ? Math.max(8, 6 / z) : Math.max(4, 3.6 / z);
  const paint = (list) => {
    list.forEach((route) => {
      const flat = [];
      route.pts.forEach((p) => {
        const [x, y] = projectLL(p[0], p[1], mapView.pacific);
        flat.push([x, y]);
      });
      for (let i = 1; i < flat.length; i++) {
        line(g, flat[i - 1][0], flat[i - 1][1], flat[i][0], flat[i][1], casing, 0x1a140c);
        line(g, flat[i - 1][0], flat[i - 1][1], flat[i][0], flat[i][1], core, route.color);
      }
    });
  };
  paint(routes);
  paint(inland);
}

function drawStrikes(g, mapView) {
  if (mapView.z > 0.92) return;
  const rad = Math.max(3.4, 3.1 / mapView.z);
  WORLD_STRIKES.forEach(([lon, lat]) => {
    const [x, y] = projectLL(lon, lat, mapView.pacific);
    g.circle(x, y, rad).fill({ color: 0x1a0808 });
    g.circle(x, y, rad).stroke({ width: Math.max(1.8, 1.6 / mapView.z), color: 0xe8a020 });
    g.circle(x, y, Math.max(2, rad * 0.34)).fill({ color: 0xf8d800 });
  });
}

function drawRoadSeg(g, a, b, casing, core) {
  line(g, a[0], a[1], b[0], b[1], casing, 0x201810);
  line(g, a[0], a[1], b[0], b[1], core, 0xf4efe2);
}

function roadEnds(a, b, z) {
  if (z < 0.45) return [a, b];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  if (len >= 160) return [a, b];
  const extra = Math.min(40, Math.max(18, (160 - len) * 0.55));
  const ux = dx / len;
  const uy = dy / len;
  return [
    [a[0] - ux * extra, a[1] - uy * extra],
    [b[0] + ux * extra, b[1] + uy * extra],
  ];
}

function drawCities(g, painted, state, selectedId, hoverId) {
  const you = playerOf(state);
  painted.forEach((r) => {
    const [x, y] = cityXY(r);
    const fac = r.owner ? factionOf(state, r.owner) : null;
    const fill = fac?.color || "#9aa7b0";
    const selected = r.id === selectedId;
    g.rect(x - 16, y - 6, 12, 8).fill({ color: fill });
    g.rect(x - 17, y - 9, 14, 4).fill({ color: 0x6a4030 });
    g.rect(x - 5, y - 5, 10, 10).fill({ color: 0x201810 });
    g.rect(x - 4, y - 4, 8, 8).fill({ color: 0xc8c4b8 });
    g.rect(x - 3, y - 3, 6, 6).fill({ color: selected || r.id === hoverId ? 0xf8d800 : 0xf8f8f0 });
    g.rect(x + 4, y - 24, 2, 24).fill({ color: selected ? 0xf8d800 : 0xd8d0c0 });
    g.rect(x + 6, y - 24, 16, 11).fill({ color: 0x201810 });
    g.rect(x + 7, y - 23, 14, 9).fill({ color: fill });
    g.rect(x + 7, y - 23, 14, 2).fill({ color: 0xfff8e0 });
    if (you?.region === r.id) g.rect(x - 12, y - 26, 5, 5).fill({ color: 0xf8d800 });
    if (selected) {
      g.rect(x - 18, y + 8, 22, 2).fill({ color: 0xf8d800 });
    }
  });
}

function drawScars(g) {
  NUKE_SCARS.forEach((s) => {
    g.circle(s.x, s.y, 7).fill({ color: 0x1a0808 });
    g.circle(s.x, s.y, 7).stroke({ width: 2, color: 0xe8a020 });
    g.circle(s.x, s.y, 2).fill({ color: 0xf8d800 });
  });
}

function drawAxes(g) {
  const axis = (a, b, color) => {
    line(g, a[0], a[1], b[0], b[1], 5, 0x1a0808);
    line(g, a[0], a[1], b[0], b[1], 2, color);
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const px = -uy;
    const py = ux;
    const bx = b[0] - ux * 16;
    const by = b[1] - uy * 16;
    g.poly([b[0], b[1], bx + px * 8, by + py * 8, bx - px * 8, by - py * 8], true).fill({ color });
  };
  axis([6, 34], [86, 86], 0x7aa0b4);
  axis([334, 467], [482, 579], 0x8c4a4a);
}

function drawStall(g, state, z) {
  let prev = null;
  STALL_IDS.forEach((id) => {
    const r = regionOf(state, id);
    if (!r) {
      prev = null;
      return;
    }
    if (prev && isAdjacent(state, prev, r)) {
      const a = cityXY(prev);
      const b = cityXY(r);
      const [p, q] = roadEnds(a, b, z);
      line(g, p[0], p[1], q[0], q[1], 7, 0x1a0808);
      const steps = 8;
      for (let i = 0; i < steps; i += 2) {
        const t0 = i / steps;
        const t1 = (i + 1) / steps;
        line(
          g,
          p[0] + (q[0] - p[0]) * t0,
          p[1] + (q[1] - p[1]) * t0,
          p[0] + (q[0] - p[0]) * t1,
          p[1] + (q[1] - p[1]) * t1,
          3,
          0xf8f8f8,
        );
      }
    }
    prev = r;
  });
}

function drawConvoy(g, mapFx, now) {
  if (!mapFx || mapFx.kind !== "travel" || !mapFx.a || !mapFx.b) return;
  const dur = mapFx.duration || 2400;
  let t = (now - mapFx.t0) / dur;
  t = mapFx.loop ? ((t % 1) + 1) % 1 : Math.min(1, Math.max(0, t));
  const [x0, y0] = mapFx.a;
  const [x1, y1] = mapFx.b;
  const hops = [0, 0.08, 0.16];
  const colors = [0x8a6840, 0x507040, 0x686860];
  hops.forEach((lag, i) => {
    const u = Math.max(0, Math.min(1, t - lag));
    const x = x0 + (x1 - x0) * u;
    const y = y0 + (y1 - y0) * u;
    const bob = Math.floor(now / 140 + i) % 2;
    g.rect(x - 8, y - 6 - bob, 16, 8).fill({ color: colors[i] });
    g.rect(x - 6, y - 10 - bob, 8, 4).fill({ color: 0xf8d800 });
    g.circle(x - 5, y + 3, 2).fill({ color: 0x201810 });
    g.circle(x + 5, y + 3, 2).fill({ color: 0x201810 });
  });
}

function screenOf(mapView, x, y) {
  return [x * mapView.z + mapView.x, y * mapView.z + mapView.y];
}

function takeText(str, x, y, size, fill) {
  let t = textPool[textUsed];
  if (!t) {
    t = new Text({
      text: str,
      style: {
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        fontSize: size,
        fill,
      },
    });
    t.resolution = 2;
    mapLayers.screen.addChild(t);
    textPool.push(t);
  }
  t.visible = true;
  if (t.text !== str) t.text = str;
  if (t.style.fontSize !== size) t.style.fontSize = size;
  if (t.style.fill !== fill) t.style.fill = fill;
  t.position.set(Math.round(x), Math.round(y));
  textUsed += 1;
  return t;
}

function endTexts() {
  for (let i = textUsed; i < textPool.length; i++) textPool[i].visible = false;
  textUsed = 0;
}

const measureCtx = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : null;

function measure(text, px) {
  if (!measureCtx) return text.length * px;
  measureCtx.font = `${px}px "Press Start 2P", "Courier New", monospace`;
  return measureCtx.measureText(text).width;
}

function ringCentroid(ring) {
  let x = 0;
  let y = 0;
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const c = ring[i][0] * ring[j][1] - ring[j][0] * ring[i][1];
    a += c;
    x += (ring[i][0] + ring[j][0]) * c;
    y += (ring[i][1] + ring[j][1]) * c;
  }
  a *= 0.5;
  if (Math.abs(a) < 1) {
    const n = ring.length || 1;
    return [ring.reduce((s, p) => s + p[0], 0) / n, ring.reduce((s, p) => s + p[1], 0) / n];
  }
  return [x / (6 * a), y / (6 * a)];
}

function drawStateLabels(state, mapView, plates) {
  if (mapView.z < 0.42) return;
  const size = Math.max(8, Math.round(16 * mapView.z));
  const items = [];
  (state.stateLines || []).forEach((line) => {
    const id = String(line.id || "");
    if (id.length !== 2 || id === "YT" || !line.ring?.length) return;
    const [cx, cy] = ringCentroid(line.ring);
    let minX = 1e9;
    let maxX = -1e9;
    let minY = 1e9;
    let maxY = -1e9;
    line.ring.forEach(([px, py]) => {
      minX = Math.min(minX, px);
      maxX = Math.max(maxX, px);
      minY = Math.min(minY, py);
      maxY = Math.max(maxY, py);
    });
    const w = Math.ceil(measure(id, 16)) + 10;
    const pinned = id === "CA" || id === "NV";
    items.push({
      id, x: cx, y: cy, ox: cx, oy: cy, w, h: 22,
      area: pinned ? 1e9 : Math.max(400, (maxX - minX) * (maxY - minY)),
      pinned,
    });
  });
  for (let n = 0; n < 28; n++) {
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        const overlapX = a.w / 2 + b.w / 2 + 4 - Math.abs(b.x - a.x);
        const overlapY = a.h / 2 + b.h / 2 + 2 - Math.abs(b.y - a.y);
        if (overlapX <= 0 || overlapY <= 0) continue;
        const dx = b.x - a.x || 1;
        const dy = b.y - a.y || 0.25;
        const len = Math.hypot(dx, dy) || 1;
        const wa = b.area / (a.area + b.area);
        const wb = a.area / (a.area + b.area);
        const push = Math.min(overlapX, overlapY) + 1;
        a.x -= (dx / len) * push * wa;
        a.y -= (dy / len) * push * wa;
        b.x += (dx / len) * push * wb;
        b.y += (dy / len) * push * wb;
      }
    }
  }
  items.forEach((a) => {
    if (a.pinned) {
      a.x = a.ox;
      a.y = a.oy;
    }
    const [sx, sy] = screenOf(mapView, a.x, a.y);
    const sw = Math.max(8, a.w * mapView.z);
    const sh = Math.max(8, a.h * mapView.z);
    const px = sx - sw / 2;
    const py = sy - sh / 2;
    if (a.pinned) plates.rect(px - 2, py - 2, sw + 4, sh + 4).fill({ color: 0xf8d800 });
    plates.rect(px - 1, py - 1, sw + 2, sh + 2).fill({ color: 0x000010 });
    plates.rect(px, py, sw, sh).fill({ color: 0xf8f8f8 });
    takeText(a.id, px + 4 * mapView.z, py + 2, size, "#000010");
  });
}

function drawPlates(state, mapView, painted, selectedId, hoverId, plates) {
  const you = playerOf(state);
  const size = Math.max(9, Math.round(14 * Math.min(1.4, mapView.z)));
  painted.forEach((r) => {
    const selected = r.id === selectedId;
    const here = you?.region === r.id;
    const seaGate = r.id === "gulf_passage";
    if (seaGate && (mapView.z <= 0.92 || mapView.focus)) return;
    if (!selected && !here && r.id !== hoverId && !seaGate) return;
    const [x, y] = cityXY(r);
    const [sx, sy] = screenOf(mapView, x, y);
    const label = r.short || r.id;
    const known = r.intel > 0 || (you?.faction && r.owner === you.faction);
    const garr = seaGate ? "" : known ? String(r.garrison) : "?";
    const text = here && !selected ? label : garr ? `${label}  ${garr}` : label;
    const tw = measure(text, size) + 16;
    const th = size + 10;
    let px = sx - tw / 2;
    let py = here && !selected ? sy - th - 10 : sy + 16;
    plates.rect(px - 3, py - 3, tw + 6, th + 6).fill({ color: selected ? 0xf8d800 : 0x000018 });
    plates.rect(px, py, tw, th).fill({ color: 0x101050 });
    const fac = r.owner ? factionOf(state, r.owner) : null;
    plates.rect(px + 2, py + 2, 4, th - 4).fill({ color: fac?.color || 0x607838 });
    takeText(text, px + 8, py + 4, size, "#f8d800");
  });
}

function drawDeskLabelsPass(state, mapView) {
  if (mapView.z > 0.92 && !mapView.focus) return;
  const focus = mapView.focus;
  const screenPx = focus ? 18 : 12;
  const inland = focus === "bering" || focus === "cuba" || focus === "korea" ? INLAND_DESKS : [];
  const desks = (focus === "bering" ? [{ id: "nome", lon: -165.4, lat: 64.5, color: "#7aa0b4" }] : [])
    .concat(WORLD_DESKS)
    .concat(inland);
  const g = mapLayers.plates;
  const spots = [];
  desks.forEach((d) => {
    const node = regionOf(state, d.id);
    if (!node) return;
    if (mapView.z > 0.4 && mapView.z < 0.85 && d.id === "gulf_passage" && focus !== "cuba") return;
    const [x, y] = projectLL(d.lon, d.lat, mapView.pacific);
    const [sx, sy] = screenOf(mapView, x, y);
    const label = node.short;
    const tw = measure(label, screenPx) + 10;
    const th = screenPx + 8;
    spots.push({ sx, sy, label, tw, th, color: d.color || "#9a3b3b" });
  });
  spots.forEach((s) => {
    const rad = focus ? 7 : 5;
    g.circle(s.sx, s.sy, rad).fill({ color: s.color });
    g.circle(s.sx, s.sy, rad).stroke({ width: 2, color: 0xf8d800 });
    g.rect(s.sx + rad + 2, s.sy - s.th / 2, s.tw, s.th).fill({ color: 0x000018 });
  });
  spots.forEach((s) => {
    const rad = focus ? 7 : 5;
    takeText(s.label, s.sx + rad + 6, s.sy - s.th / 2 + 3, screenPx, "#f8d800");
  });
}

export function renderPixiMap(host) {
  if (!ready || !host?.state) return;
  const { state, mapView, selectedId, hoverId, mapFx, stateWash, syncWashKey } = host;
  const z = mapView.z || 1;
  mapApp.renderer.background.color = z < 0.5 ? 0xb7d4ea : 0x2a6890;
  mapLayers.world.position.set(mapView.x, mapView.y);
  mapLayers.world.scale.set(z);

  const pacific = mapView.pacific ? "p" : "n";
  if (mapLayers.globeKey !== pacific) rebuildGlobe(!!mapView.pacific);
  const strokeKey = `${pacific}|${Math.round(Math.max(1.5, 2.05 / z))}`;
  if (mapLayers.strokeKey !== strokeKey) rebuildGlobeStroke(!!mapView.pacific, z);

  const terrain = ensureTheaterTerrain(state);
  const season = state._season?.id || "";
  const tKey = `${terrain.key}|${season}`;
  if (mapLayers.terrainKey !== tKey) {
    const baked = bakeTerrain(state);
    const liftSea = z < 0.7 || mapView.focus === "cuba" || mapView.focus === "bering" || mapView.focus === "korea";
    mapLayers._full = baked.full;
    mapLayers._lift = baked.lift;
    mapLayers.terrainKey = tKey;
    bindTexture(mapLayers.terrain, liftSea ? baked.lift : baked.full, true);
    mapLayers._liftOn = liftSea;
  } else {
    const liftSea = z < 0.7 || mapView.focus === "cuba" || mapView.focus === "bering" || mapView.focus === "korea";
    if (liftSea !== mapLayers._liftOn && mapLayers._full) {
      bindTexture(mapLayers.terrain, liftSea ? mapLayers._lift : mapLayers._full, true);
      mapLayers._liftOn = liftSea;
    }
  }

  const sig = washSignature(state, stateWash);
  if (mapLayers.washKey !== sig) {
    bindTexture(mapLayers.wash, bakeWash(state, stateWash), true);
    bindTexture(mapLayers.fog, bakeFog(state, stateWash), true);
    mapLayers.washKey = sig;
    mapLayers.fogKey = sig;
  }

  const painted = state.regions.filter((r) => theaterVisible(state, r) || r.id === "gulf_passage");
  const now = performance.now();
  const pulseOn = mapFx?.kind === "travel" && Math.floor((now - mapFx.t0) / 420) % 2 === 0;

  mapLayers.under.clear();
  mapLayers.over.clear();
  const routeLayer = mapView.focus ? mapLayers.over : mapLayers.under;
  drawRoutes(routeLayer, state, mapView);
  drawStrikes(mapView.focus ? mapLayers.over : mapLayers.under, mapView);

  const roads = mapRoads(painted);
  roads.forEach((rd) => {
    const hot = pulseOn && sameRoad(rd.a, rd.b, mapFx.a, mapFx.b);
    line(mapLayers.over, rd.a[0], rd.a[1], rd.b[0], rd.b[1], 3.2, hot ? 0x5a3c08 : 0x201810);
    line(mapLayers.over, rd.a[0], rd.a[1], rd.b[0], rd.b[1], 1.3, hot ? 0xf8d800 : 0xf8f4e8);
  });
  if (z >= 0.45) {
    CAMPAIGN_ROADS.forEach(([aId, bId]) => {
      const a = regionOf(state, aId);
      const b = regionOf(state, bId);
      if (!a || !b || !isAdjacent(state, a, b)) return;
      const pa = cityXY(a);
      const pb = cityXY(b);
      const [p, q] = roadEnds(pa, pb, z);
      const len = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]) || 1;
      line(mapLayers.over, p[0], p[1], q[0], q[1], len < 110 ? 11 : 8, 0x1a0808);
      line(mapLayers.over, p[0], p[1], q[0], q[1], len < 110 ? 4 : 3, 0xfff6d0);
    });
  }
  drawStall(mapLayers.over, state, z);
  drawAxes(mapLayers.over);
  drawScars(mapLayers.over);
  drawConvoy(mapLayers.over, mapFx, now);
  drawCities(mapLayers.over, painted, state, selectedId, hoverId);

  ["far_russia", "far_cuba", "far_nicaragua"].forEach((id, i) => {
    const r = regionOf(state, id);
    if (!r || !theaterVisible(state, r)) return;
    const b = [[8, 72], [470, 568], [620, 572]][i];
    const [x, y] = cityXY(r);
    line(mapLayers.over, x, y, b[0], b[1], 10, i === 0 ? 0x7aa0b4 : 0x8c4a4a);
  });

  mapLayers.plates.clear();
  endTexts();
  drawStateLabels(state, mapView, mapLayers.plates);
  drawPlates(state, mapView, painted, selectedId, hoverId, mapLayers.plates);
  drawDeskLabelsPass(state, mapView);
  if (syncWashKey) syncWashKey();
  mapCanvas.dataset.z = z.toFixed(3);
  mapCanvas.dataset.pixi = "1";
  mapApp.render();
}

function px(g, x, y, w, h, color) {
  g.rect(x, y, w, h).fill({ color });
}

function paintArena(g, id, now, deskId) {
  const look = inlandLook(deskId);
  if (look) {
    px(g, 0, 0, DUEL_W, DUEL_H, look.bg);
    if (deskId === "kamchatka") {
      px(g, 0, 0, DUEL_W, DUEL_H, 0x07141c);
      px(g, 0, 56, DUEL_W, 16, 0x145068);
      px(g, 0, 78, DUEL_W, DUEL_H, 0x0a3044);
      px(g, 0, 78, DUEL_W, 6, 0x8fd4ea);
    } else if (deskId === "siberia") {
      px(g, 0, 48, DUEL_W, DUEL_H, 0x142010);
      px(g, 0, 124, DUEL_W, 14, 0x5a3a18);
    } else if (deskId === "havana") {
      px(g, 0, 0, DUEL_W, 70, 0x06303c);
      px(g, 0, 28, DUEL_W, 12, 0x26c6b0);
      px(g, 0, 70, DUEL_W, 16, 0x6a3018);
      px(g, 0, 86, DUEL_W, DUEL_H, 0xc4a574);
    } else if (deskId === "managua") {
      px(g, 0, 36, DUEL_W, DUEL_H, 0xc47830);
      px(g, 0, 118, DUEL_W, 18, 0x4a3010);
    } else if (deskId === "sponsor_lane") {
      px(g, 0, 40, DUEL_W, DUEL_H, 0x1c220e);
      px(g, 220, 70, 120, 10, 0xe6ee55);
    } else if (deskId === "kr_inland") {
      px(g, 0, 0, DUEL_W, 80, 0x1a1428);
      px(g, 0, 96, DUEL_W, DUEL_H, 0x120e18);
      px(g, 0, 96, DUEL_W, 6, 0xc9a0e8);
    }
    px(g, 0, 0, 10, DUEL_H, look.edge);
    px(g, DUEL_W - 10, 0, 10, DUEL_H, look.edge);
    return;
  }
  const twinkle = Math.floor(now / 800) % 2;
  if (id === "roadhouse") {
    px(g, 0, 0, DUEL_W, 56, 0x203040);
    px(g, 0, 56, DUEL_W, DUEL_H, 0xd0d8e0);
    px(g, 40, 20, 120, 70, 0x684028);
    px(g, 50, 30, 24, 20, 0x88b0c8);
    px(g, 200, 8, 80, 12, 0xf8d800);
    return;
  }
  if (id === "foothills") {
    px(g, 0, 0, DUEL_W, 50, 0x5a88b8);
    px(g, 0, 70, DUEL_W, DUEL_H, 0x8a7840);
    px(g, 80, 20, 200, 50, 0x3a4858);
    return;
  }
  if (id === "airstrip") {
    px(g, 0, 0, DUEL_W, 48, 0x78a0c8);
    px(g, 0, 48, DUEL_W, DUEL_H, 0x887868);
    px(g, 40, 90, DUEL_W, 16, 0xc8c8a0);
    px(g, 40, 96, DUEL_W, 4, 0xf8d800);
    return;
  }
  if (id === "iceford") {
    px(g, 0, 0, DUEL_W, 52, 0x103048);
    px(g, 0, 90, DUEL_W, DUEL_H, 0xd0d8e0);
    px(g, 0, 100, DUEL_W, 12, 0x88b0c8);
    return;
  }
  if (id === "gaslot") {
    px(g, 0, 0, DUEL_W, 44, 0x3a3028);
    px(g, 0, 44, DUEL_W, DUEL_H, 0x404038);
    px(g, 60, 20, 90, 50, 0xc8a038);
    if (twinkle) px(g, 78, 24, 8, 8, 0xf8d800);
    return;
  }
  if (id === "pineridge") {
    px(g, 0, 0, DUEL_W, 50, 0x3a68a0);
    px(g, 0, 50, DUEL_W, DUEL_H, 0x486030);
    return;
  }
  if (id === "radiotower") {
    px(g, 0, 0, DUEL_W, 70, 0x101028);
    px(g, 0, 70, DUEL_W, DUEL_H, 0x181830);
    px(g, 300, 8, 8, 90, 0x686860);
    px(g, 304, 6, 4, 8, twinkle ? 0xf03030 : 0xf8d800);
    return;
  }
  px(g, 0, 0, DUEL_W, 52, 0x5a88b8);
  px(g, 0, 52, DUEL_W, DUEL_H, 0x8a7840);
  px(g, 24, 20, 100, 70, 0x684028);
  px(g, 0, 120, DUEL_W, 60, 0x503010);
  px(g, 0, 120, DUEL_W, 3, 0xf8d800);
}

function fighterCanvas(outfit, pose, frame, hit, firearmOn) {
  const c = document.createElement("canvas");
  c.width = 56;
  c.height = 80;
  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const o = outfit || { coat: "#507040", hat: "#f8d800", pants: "#3a2010", accent: "#c8a038" };
  const hat = hit ? "#f8f8f8" : o.hat;
  const coat = hit ? "#f03030" : o.coat;
  const bob = pose === "idle" ? [0, 1, 0, -1][frame % 4] : 0;
  const x = 8;
  const y = 6 + bob;
  const blit = (px0, py0, w, h, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(px0, py0, w, h);
  };
  blit(x + 4, 70, 22, 3, "rgba(0,0,0,0.45)");
  const step = pose === "idle" && frame % 2 ? 2 : pose === "strike" ? 2 : 0;
  blit(x + 4, y + 46, 6, 16, o.pants || "#201810");
  blit(x + 14 + step, y + 46, 6, 16, o.pants || "#201810");
  const wide = o.helmet || o.id === "parka" ? 4 : 0;
  blit(x - wide, y + 18, 24 + wide * 2, 28, coat);
  blit(x + 2, y + 22, 4, 16, o.accent);
  blit(x + 4, y + 8, 16, 10, "#c8a078");
  if (o.headset) {
    blit(x + 2, y + 10, 4, 6, o.accent);
    blit(x + 18, y + 10, 4, 6, o.accent);
  }
  if (o.brim) blit(x, y + 4, 24, 4, hat);
  if (o.helmet) blit(x + 2, y - 2, 20, 10, hat);
  else blit(x + 4, y, 16, 8, hat);
  if (pose === "guard") {
    blit(x + 20, y + 20, 12, 6, o.accent);
    blit(x - 6, y + 20, 10, 6, o.accent);
  } else if (pose === "strike") {
    const ext = [8, 14, 18][frame % 3];
    blit(x + 20, y + 24, ext, 4, hat);
  } else if (pose === "special") {
    blit(x + 18, y + 6 - (frame % 2) * 3, 8, 8, o.accent);
  } else {
    blit(x + 20, y + 26 + (frame % 2), 6, 4, o.accent);
  }
  if (firearmOn && (pose === "strike" || pose === "special")) {
    const gunY = pose === "special" ? y + 12 : y + 22;
    blit(x + 22, gunY, 16, 3, "#201810");
    blit(x + 36, gunY - 1, 4, 5, "#686860");
    if (frame % 3 !== 1) blit(x + 40, gunY - 2, 6, 6, "#f8d800");
  }
  return c;
}

function fighterTexture(outfit, pose, frame, hit, firearmOn) {
  const key = `${outfit?.id || "crew"}|${pose}|${frame}|${hit ? 1 : 0}|${firearmOn ? 1 : 0}`;
  let tex = fighterTex.get(key);
  if (!tex) {
    tex = Texture.from(fighterCanvas(outfit, pose, frame, hit, firearmOn));
    if (tex.source) tex.source.scaleMode = "nearest";
    fighterTex.set(key, tex);
  }
  return tex;
}

function usesFirearm(fighter, move) {
  if (!move || move === "guard") return false;
  if (fighter?.style?.id === "marksman") return true;
  if (fighter?.outfit?.id === "guntruck") return move === "strike" || move === "special";
  return false;
}

function poseOf(move, beat) {
  if (beat === "resolve" && move) return move === "special" ? "special" : move;
  return "idle";
}

export function renderPixiDuel(host) {
  if (!ready || !host?.duel) return;
  const { now, duel, deskId, styleInk } = host;
  const arenaId = duel.arena?.id || "porch";
  const twinkle = Math.floor(now / 800) % 2;
  const aKey = `${deskId || ""}|${arenaId}|${twinkle}`;
  if (duelLayers.arenaKey !== aKey) {
    duelLayers.arena.clear();
    paintArena(duelLayers.arena, arenaId, now, deskId);
    duelLayers.arenaKey = aKey;
  }

  const flash = duel.last && duel.beat === "resolve";
  const youHit = !!(flash && duel.last.youDmg > 0);
  const foeHit = !!(flash && duel.last.foeDmg > 0);
  const sig = flash ? `${duel.exchange}|${duel.last.youDmg}|${duel.last.foeDmg}|${duel.last.youHeal}|${duel.last.foeHeal}` : "";
  if (sig && sig !== hitFx.id) {
    hitFx.id = sig;
    const heavy = (duel.last.youDmg || 0) + (duel.last.foeDmg || 0) > 0;
    if (heavy) {
      hitFx.base = now - hitFx.debt;
      hitFx.until = now + 100;
      hitFx.debt += 100;
    }
    hitFx.sparks = [];
    hitFx.muzzle = [];
    const burst = (x, y, color) => {
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI * 2 * i) / 8;
        hitFx.sparks.push({ x, y, vx: Math.cos(a) * 1.6, vy: Math.sin(a) * 1.2 - 0.4, life: 1, color });
      }
    };
    if (youHit) burst(168, 96, 0xf8d800);
    if (foeHit) burst(448, 96, 0xf03030);
    if (usesFirearm(duel.you, duel.last.youMove)) hitFx.muzzle.push({ x: 196, y: 100, life: 1 });
    if (usesFirearm(duel.foe, duel.last.foeMove)) hitFx.muzzle.push({ x: 410, y: 100, life: 1 });
  }
  if (!flash) hitFx.id = "";

  let visual = now - hitFx.debt;
  if (now < hitFx.until) visual = hitFx.base;
  const bob = Math.floor(visual / 280) % 2;
  const youPose = poseOf(duel.last?.youMove, duel.beat);
  const foePose = poseOf(duel.last?.foeMove, duel.beat);
  const youFrame = youPose === "idle" ? Math.floor(visual / 160) % 4 : Math.floor(visual / 90) % 3;
  const foeFrame = foePose === "idle" ? Math.floor(visual / 160 + 1) % 4 : Math.floor(visual / 90) % 3;
  const youY = 78 + (youPose === "idle" ? bob : 0);
  const foeY = 78 + (foePose === "idle" ? 1 - bob : 0);
  const youGun = usesFirearm(duel.you, youPose === "idle" ? null : youPose);
  const foeGun = usesFirearm(duel.foe, foePose === "idle" ? null : foePose);
  duelLayers.you.texture = fighterTexture(duel.you.outfit, youPose, youFrame, youHit, youGun);
  duelLayers.foe.texture = fighterTexture(duel.foe.outfit, foePose, foeFrame, foeHit, foeGun);
  duelLayers.you.scale.x = 1;
  duelLayers.foe.scale.x = -1;
  duelLayers.you.position.set(150 + 12, youY);
  duelLayers.foe.position.set(430 + 12, foeY);

  const dt = 0.35;
  hitFx.sparks.forEach((s) => {
    if (now < hitFx.until) return;
    s.x += s.vx * 4 * dt;
    s.y += s.vy * 4 * dt;
    s.vy += 0.15;
    s.life -= 0.04;
  });
  hitFx.sparks = hitFx.sparks.filter((s) => s.life > 0);
  hitFx.muzzle.forEach((m) => {
    if (now >= hitFx.until) m.life -= 0.08;
  });
  hitFx.muzzle = hitFx.muzzle.filter((m) => m.life > 0);

  duelLayers.fx.clear();
  const youInk = styleInk?.(duel.you.style) || "#f8d800";
  const foeInk = styleInk?.(duel.foe.style) || "#f8d800";
  px(duelLayers.fx, 146, youY + 64, 36, 8, 0x000000);
  px(duelLayers.fx, 148, youY + 66, 32, 4, youInk);
  px(duelLayers.fx, 426, foeY + 64, 36, 8, 0x000000);
  px(duelLayers.fx, 428, foeY + 66, 32, 4, foeInk);
  hitFx.muzzle.forEach((m) => {
    const rad = 5 + m.life * 8;
    duelLayers.fx.circle(m.x, m.y, rad).fill({ color: 0xfff2a0, alpha: 0.35 + m.life * 0.5 });
    duelLayers.fx.circle(m.x, m.y, rad * 0.45).fill({ color: 0xffffff, alpha: 0.9 });
  });
  hitFx.sparks.forEach((s) => {
    duelLayers.fx.rect(s.x, s.y, 3, 3).fill({ color: s.color, alpha: Math.max(0, s.life) });
  });
  if (flash && duel.last && (youHit || foeHit)) {
    const age = Math.min(1, (now - (hitFx.until - 100)) / 280);
    const alpha = Math.max(0, 0.22 * (1 - age));
    if (alpha > 0.02) {
      duelLayers.fx.rect(0, 0, DUEL_W, DUEL_H).fill({
        color: duel.last.youFx || duel.last.foeFx || 0xf8f8f8,
        alpha,
      });
    }
  }

  const shake = now < hitFx.until + 140 && (youHit || foeHit) ? (1 - Math.min(1, (now - (hitFx.until - 100)) / 240)) * 5 : 0;
  if (shake > 0.2) {
    const jx = Math.sin(now * 0.09) * shake;
    const jy = Math.cos(now * 0.13) * shake * 0.6;
    duelLayers.shake.position.set(jx, jy);
  } else {
    duelLayers.shake.position.set(0, 0);
  }

  if (deskId) {
    const look = inlandLook(deskId);
    const desk = inlandDesk(deskId);
    if (look && desk) {
      px(duelLayers.fx, 0, 0, DUEL_W, 18, look.stripBg);
    }
  }
  duelCanvas.dataset.pixi = "1";
  duelApp.render();
}
