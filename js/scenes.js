import { paintArcticBackdrop, paintWestBackdrop } from "./sprites.js";

const W = 80;
const H = 45;
const cache = {};

const PAL = {
  ink: "#000018",
  navy: "#101050",
  snow: "#d0d8e0",
  snow2: "#a0b0c0",
  pine: "#184828",
  pine2: "#306830",
  wood: "#684028",
  wood2: "#886038",
  gold: "#f8d800",
  skin: "#c8a078",
  olive: "#385028",
  olive2: "#507040",
  red: "#a03020",
  blue: "#304878",
  crate: "#c8a038",
  wheat: "#c8a038",
  wheat2: "#e0c060",
};

function px(ctx, x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

function skyGround(ctx, arctic, mood) {
  if (arctic) paintArcticBackdrop(ctx, W, H, 0);
  else paintWestBackdrop(ctx, W, H, 0, mood || "summer");
}

function pine(ctx, x, y) {
  px(ctx, x + 3, y, 2, 10, PAL.wood);
  px(ctx, x, y + 2, 8, 3, PAL.pine);
  px(ctx, x + 1, y - 2, 6, 4, PAL.pine2);
}

function fig(ctx, x, y, coat, hat) {
  px(ctx, x + 1, y, 4, 3, hat || coat);
  px(ctx, x + 1, y + 3, 4, 3, PAL.skin);
  px(ctx, x, y + 6, 6, 8, coat);
  px(ctx, x + 1, y + 14, 2, 4, PAL.ink);
  px(ctx, x + 3, y + 14, 2, 4, PAL.ink);
}

function frame(ctx) {
  px(ctx, 0, 0, W, 2, PAL.ink);
  px(ctx, 0, H - 2, W, 2, PAL.ink);
  px(ctx, 0, 0, 2, H, PAL.ink);
  px(ctx, W - 2, 0, 2, H, PAL.ink);
}

const PAINT = {
  drill(ctx) {
    skyGround(ctx);
    pine(ctx, 4, 16);
    pine(ctx, 68, 14);
    px(ctx, 50, 20, 10, 12, PAL.wood);
    px(ctx, 52, 22, 6, 6, PAL.red);
    fig(ctx, 18, 16, PAL.olive, PAL.olive2);
    fig(ctx, 28, 16, PAL.olive2, PAL.olive);
    fig(ctx, 38, 16, PAL.olive, PAL.gold);
    px(ctx, 24, 22, 8, 1, PAL.ink);
  },
  fortify(ctx) {
    skyGround(ctx);
    pine(ctx, 62, 12);
    px(ctx, 8, 24, 64, 6, PAL.wood);
    px(ctx, 10, 20, 60, 4, "#887868");
    px(ctx, 12, 16, 16, 4, "#a09070");
    px(ctx, 32, 16, 16, 4, "#a09070");
    px(ctx, 52, 16, 16, 4, "#a09070");
    fig(ctx, 22, 10, PAL.olive, PAL.olive2);
    px(ctx, 30, 20, 2, 8, PAL.wood2);
  },
  commerce(ctx) {
    skyGround(ctx);
    px(ctx, 18, 12, 44, 4, PAL.wood);
    px(ctx, 20, 16, 40, 16, PAL.wood2);
    px(ctx, 22, 18, 8, 6, PAL.crate);
    px(ctx, 32, 18, 8, 6, PAL.gold);
    px(ctx, 42, 18, 8, 6, PAL.crate);
    fig(ctx, 8, 16, PAL.blue, PAL.gold);
    fig(ctx, 58, 16, PAL.olive, PAL.olive2);
  },
  cultivate(ctx) {
    skyGround(ctx);
    pine(ctx, 6, 14);
    pine(ctx, 70, 12);
    px(ctx, 22, 18, 36, 4, PAL.wood);
    px(ctx, 24, 14, 4, 12, PAL.wheat);
    px(ctx, 32, 12, 4, 14, PAL.wheat2);
    px(ctx, 40, 14, 4, 12, PAL.wheat);
    px(ctx, 48, 13, 4, 13, PAL.wheat2);
    fig(ctx, 16, 16, PAL.olive2, PAL.olive);
    px(ctx, 28, 26, 12, 6, PAL.wood);
  },
  safety(ctx) {
    skyGround(ctx, false, "dusk");
    px(ctx, 10, 22, 60, 2, PAL.ink);
    px(ctx, 14, 18, 4, 12, PAL.ink);
    px(ctx, 38, 18, 4, 12, PAL.ink);
    px(ctx, 62, 18, 4, 12, PAL.ink);
    px(ctx, 20, 10, 6, 8, PAL.gold);
    px(ctx, 22, 8, 2, 2, "#fff8c0");
    fig(ctx, 28, 14, PAL.blue, PAL.gold);
    fig(ctx, 48, 14, PAL.olive, PAL.olive2);
  },
  attack(ctx) {
    skyGround(ctx);
    px(ctx, 36, 8, 40, 22, "#686860");
    px(ctx, 38, 6, 36, 4, "#888880");
    px(ctx, 48, 16, 10, 14, PAL.ink);
    px(ctx, 0, 30, W, 4, "#503010");
    px(ctx, 0, 31, W, 1, PAL.crate);
    px(ctx, 10, 22, 16, 8, PAL.olive);
    px(ctx, 20, 18, 8, 6, PAL.olive2);
    fig(ctx, 12, 14, PAL.olive2, PAL.gold);
    fig(ctx, 56, 10, PAL.red, PAL.ink);
  },
  travel(ctx) {
    skyGround(ctx);
    pine(ctx, 8, 12);
    pine(ctx, 64, 10);
    px(ctx, 0, 30, W, 4, "#503010");
    px(ctx, 0, 31, W, 1, PAL.gold);
    px(ctx, 36, 22, 8, 8, PAL.gold);
    px(ctx, 38, 24, 4, 4, PAL.ink);
  },
  research(ctx) {
    px(ctx, 0, 0, W, H, "#201810");
    px(ctx, 0, 28, W, 17, PAL.wood);
    px(ctx, 16, 18, 48, 14, PAL.wood2);
    px(ctx, 20, 12, 4, 10, PAL.gold);
    px(ctx, 21, 10, 2, 2, "#fff8c0");
    px(ctx, 30, 20, 16, 3, PAL.ink);
    px(ctx, 48, 20, 8, 6, PAL.crate);
    fig(ctx, 8, 14, PAL.olive, PAL.olive2);
  },
  raise_banner(ctx) {
    skyGround(ctx);
    px(ctx, 36, 6, 3, 28, PAL.wood);
    px(ctx, 39, 6, 18, 12, PAL.gold);
    px(ctx, 41, 8, 14, 8, PAL.navy);
    fig(ctx, 22, 16, PAL.olive, PAL.gold);
    fig(ctx, 48, 16, PAL.olive2, PAL.olive);
  },
  seek_legend(ctx) {
    skyGround(ctx, true);
    pine(ctx, 58, 10);
    px(ctx, 50, 20, 18, 10, PAL.blue);
    fig(ctx, 14, 14, PAL.ink, PAL.snow);
    px(ctx, 18, 18, 6, 3, PAL.ink);
    px(ctx, 62, 8, 4, 4, "#d080f8");
  },
  hire(ctx) {
    px(ctx, 0, 0, W, H, "#201810");
    px(ctx, 0, 28, W, 17, PAL.wood);
    px(ctx, 20, 16, 40, 16, PAL.wood2);
    fig(ctx, 16, 12, PAL.olive, PAL.gold);
    fig(ctx, 48, 12, PAL.blue, PAL.olive2);
    px(ctx, 34, 20, 10, 6, PAL.crate);
  },
  ally(ctx) {
    px(ctx, 0, 0, W, H, "#181828");
    px(ctx, 0, 28, W, 17, PAL.wood);
    px(ctx, 18, 18, 44, 14, PAL.wood2);
    fig(ctx, 14, 12, PAL.gold, PAL.navy);
    fig(ctx, 50, 12, PAL.red, PAL.ink);
    px(ctx, 36, 8, 8, 8, PAL.gold);
  },
  break_ally(ctx) {
    px(ctx, 0, 0, W, H, "#280808");
    px(ctx, 0, 28, W, 17, "#502018");
    px(ctx, 18, 18, 44, 14, PAL.wood2);
    fig(ctx, 14, 12, PAL.olive, PAL.gold);
    fig(ctx, 50, 12, PAL.red, PAL.ink);
    px(ctx, 34, 8, 12, 2, PAL.red);
  },
  rumor(ctx) {
    skyGround(ctx, false, "dusk");
    px(ctx, 24, 16, 8, 10, PAL.gold);
    fig(ctx, 18, 14, PAL.olive, PAL.olive2);
    fig(ctx, 46, 14, PAL.blue, PAL.ink);
    px(ctx, 40, 20, 6, 2, PAL.wheat);
  },
  persuade(ctx) {
    px(ctx, 0, 0, W, H, "#201828");
    px(ctx, 0, 28, W, 17, PAL.wood);
    px(ctx, 22, 18, 36, 12, PAL.wood2);
    fig(ctx, 16, 12, PAL.olive, PAL.gold);
    fig(ctx, 50, 12, PAL.blue, PAL.snow);
  },
  hide(ctx) {
    skyGround(ctx, true);
    pine(ctx, 50, 10);
    pine(ctx, 62, 14);
    fig(ctx, 12, 16, PAL.ink, PAL.snow2);
    px(ctx, 8, 28, 16, 6, PAL.ink);
  },
  spy(ctx) {
    skyGround(ctx, true);
    pine(ctx, 58, 10);
    px(ctx, 46, 22, 22, 10, PAL.blue);
    px(ctx, 52, 16, 8, 10, PAL.wood);
    fig(ctx, 10, 14, PAL.ink, PAL.snow);
    px(ctx, 14, 18, 6, 3, PAL.ink);
  },
  court(ctx) {
    skyGround(ctx);
    fig(ctx, 20, 14, PAL.olive, PAL.gold);
    fig(ctx, 48, 14, PAL.blue, PAL.wheat);
    px(ctx, 36, 20, 8, 2, PAL.gold);
  },
  marriage(ctx) {
    skyGround(ctx);
    px(ctx, 36, 6, 3, 22, PAL.wood);
    px(ctx, 39, 8, 14, 10, PAL.gold);
    fig(ctx, 18, 14, PAL.olive, PAL.gold);
    fig(ctx, 50, 14, PAL.blue, PAL.wheat);
  },
  birth(ctx) {
    skyGround(ctx);
    px(ctx, 24, 18, 32, 12, PAL.wood2);
    fig(ctx, 16, 12, PAL.olive, PAL.gold);
    fig(ctx, 52, 14, PAL.blue, PAL.wheat);
    px(ctx, 36, 22, 8, 6, PAL.crate);
  },
  age(ctx) {
    skyGround(ctx, false, "dusk");
    fig(ctx, 28, 12, PAL.olive, PAL.gold);
    px(ctx, 20, 28, 40, 4, PAL.wood);
  },
  funeral(ctx) {
    skyGround(ctx, false, "dusk");
    px(ctx, 36, 8, 4, 22, PAL.wood);
    fig(ctx, 22, 14, PAL.olive, PAL.ink);
    fig(ctx, 48, 14, PAL.blue, PAL.ink);
  },
  season(ctx) {
    skyGround(ctx);
    pine(ctx, 8, 12);
    pine(ctx, 64, 10);
  },
  appoint(ctx) {
    px(ctx, 0, 0, W, H, "#181828");
    px(ctx, 0, 28, W, 17, PAL.wood);
    fig(ctx, 14, 12, PAL.olive, PAL.gold);
    fig(ctx, 50, 12, PAL.olive2, PAL.navy);
    px(ctx, 36, 6, 3, 22, PAL.wood);
    px(ctx, 39, 6, 14, 10, PAL.gold);
  },
  mission(ctx) {
    skyGround(ctx);
    pine(ctx, 6, 14);
    px(ctx, 0, 30, W, 4, "#503010");
    px(ctx, 0, 31, W, 1, PAL.gold);
    fig(ctx, 18, 12, PAL.olive, PAL.gold);
    px(ctx, 42, 18, 16, 10, PAL.crate);
  },
  scout_road(ctx) {
    skyGround(ctx);
    pine(ctx, 8, 12);
    pine(ctx, 64, 10);
    px(ctx, 0, 30, W, 4, "#503010");
    px(ctx, 0, 31, W, 1, PAL.gold);
    fig(ctx, 22, 12, PAL.olive, PAL.olive2);
    px(ctx, 48, 20, 6, 4, PAL.ink);
  },
  raid_depot(ctx) {
    skyGround(ctx, false, "dusk");
    px(ctx, 28, 14, 28, 16, PAL.wood);
    px(ctx, 32, 18, 8, 8, PAL.crate);
    px(ctx, 44, 18, 8, 8, PAL.gold);
    fig(ctx, 10, 14, PAL.olive, PAL.ink);
  },
  escort_convoy(ctx) {
    skyGround(ctx);
    px(ctx, 0, 30, W, 4, "#503010");
    px(ctx, 0, 31, W, 1, PAL.gold);
    px(ctx, 16, 20, 14, 8, PAL.gold);
    px(ctx, 40, 18, 16, 10, PAL.olive);
    fig(ctx, 60, 12, PAL.olive2, PAL.gold);
  },
  rescue_officer(ctx) {
    skyGround(ctx, false, "dusk");
    px(ctx, 48, 12, 18, 18, PAL.wood);
    px(ctx, 54, 16, 6, 10, PAL.ink);
    fig(ctx, 16, 12, PAL.olive, PAL.gold);
    fig(ctx, 32, 14, PAL.blue, PAL.snow);
  },
  sabotage(ctx) {
    skyGround(ctx, false, "dusk");
    px(ctx, 24, 16, 20, 12, PAL.wood);
    px(ctx, 28, 20, 12, 4, PAL.red);
    fig(ctx, 8, 14, PAL.ink, PAL.olive);
  },
  radio_run(ctx) {
    px(ctx, 0, 0, W, H, "#201810");
    px(ctx, 20, 14, 40, 16, PAL.wood2);
    px(ctx, 24, 10, 4, 8, PAL.gold);
    px(ctx, 25, 8, 2, 2, "#fff8c0");
    fig(ctx, 8, 14, PAL.olive, PAL.olive2);
  },
  cache_pull(ctx) {
    skyGround(ctx);
    px(ctx, 22, 18, 36, 12, PAL.wood);
    px(ctx, 26, 20, 8, 8, PAL.crate);
    px(ctx, 38, 20, 8, 8, PAL.wheat);
    fig(ctx, 8, 14, PAL.olive2, PAL.olive);
  },
  ford_watch(ctx) {
    skyGround(ctx);
    px(ctx, 0, 26, W, 8, PAL.blue);
    px(ctx, 28, 22, 24, 4, PAL.gold);
    fig(ctx, 18, 10, PAL.olive, PAL.gold);
  },
  airstrip_mark(ctx) {
    skyGround(ctx);
    px(ctx, 8, 28, 64, 3, PAL.crate);
    px(ctx, 36, 12, 4, 16, PAL.gold);
    fig(ctx, 16, 14, PAL.olive, PAL.olive2);
  },
  claim_survey(ctx) {
    skyGround(ctx);
    px(ctx, 30, 8, 3, 22, PAL.wood);
    px(ctx, 20, 26, 40, 6, PAL.wood2);
    fig(ctx, 44, 12, PAL.olive, PAL.gold);
  },
  ice_listen(ctx) {
    skyGround(ctx, true);
    px(ctx, 10, 26, 60, 6, PAL.snow);
    px(ctx, 48, 16, 12, 8, PAL.blue);
    fig(ctx, 18, 12, PAL.ink, PAL.snow);
  },
  ranch_relay(ctx) {
    skyGround(ctx);
    px(ctx, 28, 12, 28, 16, PAL.wood);
    px(ctx, 32, 8, 8, 8, PAL.gold);
    fig(ctx, 8, 14, PAL.olive, PAL.gold);
    fig(ctx, 58, 14, PAL.olive2, PAL.wheat);
  },
  challenge(ctx) {
    skyGround(ctx);
    px(ctx, 0, 32, W, 13, "#503010");
    px(ctx, 0, 32, W, 2, PAL.gold);
    fig(ctx, 18, 10, PAL.olive, PAL.gold);
    fig(ctx, 50, 10, PAL.navy, PAL.red);
    px(ctx, 36, 18, 6, 2, PAL.gold);
  },
  promote_member(ctx) {
    skyGround(ctx, false, "summer");
    px(ctx, 0, 28, W, 17, "#6a5030");
    px(ctx, 0, 28, W, 2, PAL.wheat2);
    px(ctx, 4, 30, 10, 8, PAL.wheat);
    px(ctx, 16, 32, 8, 6, PAL.wheat2);
    px(ctx, 50, 4, 16, 26, PAL.wood);
    px(ctx, 46, 2, 24, 5, PAL.wood2);
    px(ctx, 54, 8, 8, 6, "#88b0c8");
    px(ctx, 54, 16, 8, 4, PAL.crate);
    px(ctx, 52, 22, 12, 3, PAL.gold);
    px(ctx, 6, 16, 22, 12, PAL.wood);
    px(ctx, 8, 18, 8, 6, "#88b0c8");
    px(ctx, 18, 18, 8, 6, "#c8a060");
    px(ctx, 10, 12, 2, 6, PAL.wood2);
    px(ctx, 8, 10, 6, 3, PAL.gold);
    px(ctx, 9, 8, 4, 2, "#fff2a0");
    fig(ctx, 30, 12, PAL.olive, PAL.gold);
    px(ctx, 36, 18, 5, 3, "#e8e0c8");
    px(ctx, 28, 30, 8, 6, PAL.wheat);
    px(ctx, 34, 32, 6, 5, PAL.crate);
    pine(ctx, 68, 14);
  },
  promote_leader(ctx) {
    px(ctx, 0, 0, W, 30, "#3a2818");
    px(ctx, 0, 30, W, 15, "#503010");
    px(ctx, 0, 26, W, 4, PAL.wood2);
    px(ctx, 4, 4, 18, 12, "#88b0c8");
    px(ctx, 6, 6, 14, 8, "#c8a048");
    px(ctx, 8, 8, 6, 4, PAL.pine);
    px(ctx, 14, 9, 4, 3, PAL.blue);
    px(ctx, 28, 4, 22, 10, "#2a2018");
    px(ctx, 30, 6, 18, 6, "#e8e0c8");
    px(ctx, 32, 7, 8, 1, PAL.ink);
    px(ctx, 32, 9, 12, 1, PAL.ink);
    px(ctx, 54, 3, 2, 10, PAL.wood2);
    px(ctx, 52, 1, 6, 3, PAL.gold);
    px(ctx, 53, 0, 4, 2, "#fff2a0");
    px(ctx, 8, 20, 64, 4, PAL.wood2);
    px(ctx, 12, 24, 2, 6, PAL.wood);
    px(ctx, 66, 24, 2, 6, PAL.wood);
    px(ctx, 18, 18, 8, 3, PAL.crate);
    px(ctx, 40, 18, 10, 3, "#c8c8d0");
    px(ctx, 54, 18, 6, 3, PAL.gold);
    fig(ctx, 4, 8, PAL.olive, PAL.olive2);
    fig(ctx, 36, 8, PAL.navy, PAL.gold);
    fig(ctx, 62, 8, PAL.olive2, PAL.ink);
    px(ctx, 24, 16, 8, 1, PAL.gold);
  },
  promote_opschief(ctx) {
    px(ctx, 0, 0, W, 16, "#182838");
    px(ctx, 0, 16, W, 14, "#3a2818");
    px(ctx, 0, 30, W, 15, "#503010");
    px(ctx, 58, 2, 2, 28, PAL.ink);
    px(ctx, 52, 2, 14, 2, PAL.red);
    px(ctx, 64, 2, 2, 2, PAL.gold);
    px(ctx, 56, 8, 6, 1, "#a0b0c0");
    px(ctx, 4, 6, 22, 12, "#101820");
    px(ctx, 6, 8, 8, 6, "#304878");
    px(ctx, 16, 8, 8, 6, "#88b0c8");
    px(ctx, 8, 18, 28, 12, PAL.wood);
    px(ctx, 10, 20, 24, 6, "#101830");
    px(ctx, 12, 21, 4, 4, PAL.gold);
    px(ctx, 18, 22, 6, 2, "#30c030");
    px(ctx, 26, 21, 6, 4, PAL.red);
    px(ctx, 12, 27, 20, 2, "#686860");
    fig(ctx, 40, 10, PAL.olive, PAL.gold);
    fig(ctx, 50, 12, PAL.olive2, PAL.navy);
    px(ctx, 46, 20, 6, 2, "#e8e0c8");
    px(ctx, 4, 32, 14, 6, PAL.wood2);
    px(ctx, 22, 34, 10, 4, PAL.crate);
    pine(ctx, 70, 18);
  },
  porch_challenge(ctx) {
    skyGround(ctx);
    px(ctx, 8, 10, 22, 16, PAL.wood);
    px(ctx, 0, 32, W, 13, "#503010");
    fig(ctx, 34, 12, PAL.olive, PAL.gold);
    fig(ctx, 52, 12, PAL.olive2, PAL.ink);
  },
};

function paintId(id) {
  const src = document.createElement("canvas");
  src.width = W;
  src.height = H;
  const ctx = src.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const fn = PAINT[id] || PAINT.travel;
  fn(ctx);
  frame(ctx);
  const out = document.createElement("canvas");
  out.width = W * 2;
  out.height = H * 2;
  const octx = out.getContext("2d");
  octx.imageSmoothingEnabled = false;
  octx.drawImage(src, 0, 0, W * 2, H * 2);
  return out.toDataURL("image/png");
}

const imageLoads = new Map();

function loadImg(src, timeoutMs = 4000) {
  const existing = imageLoads.get(src);
  if (existing) return existing;
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    let settled = false;
    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      img.onload = null;
      img.onerror = null;
      fn(value);
    };
    const timer = setTimeout(() => {
      finish(reject, new Error(`image load timed out: ${src}`));
      img.src = "";
    }, timeoutMs);
    img.onload = () => finish(resolve, img);
    img.onerror = () => finish(reject, new Error(`image load failed: ${src}`));
    img.src = src;
  });
  imageLoads.set(src, promise);
  promise.finally(() => {
    if (imageLoads.get(src) === promise) imageLoads.delete(src);
  });
  return promise;
}

async function tintPhoto(src, color) {
  try {
    const img = await loadImg(src);
    const c = document.createElement("canvas");
    c.width = 160;
    c.height = 90;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, 160, 90);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(0, 0, 160, 90);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = PAL.ink;
    ctx.fillRect(0, 0, 160, 4);
    ctx.fillRect(0, 86, 160, 4);
    ctx.fillRect(0, 0, 4, 90);
    ctx.fillRect(156, 0, 4, 90);
    return c.toDataURL("image/png");
  } catch {
    return null;
  }
}

const PHOTO_TINTS = {
  hire: ["art/scenes/scene-council.png", "#c8a060"],
  ally: ["art/scenes/scene-council.png", "#f8d800"],
  persuade: ["art/scenes/scene-council.png", "#80c0a0"],
  rumor: ["art/scenes/scene-council.png", "#a04060"],
  break_ally: ["art/scenes/scene-council.png", "#c02020"],
  spy: ["art/scenes/scene-spy.png", "#4060a0"],
  hide: ["art/scenes/scene-spy.png", "#203040"],
  seek_legend: ["art/scenes/scene-spy.png", "#8040c0"],
  mission: ["art/scenes/scene-spy.png", "#c8a038"],
  radio_run: ["art/scenes/scene-spy.png", "#406080"],
  appoint: ["art/scenes/scene-council.png", "#f8d800"],
  challenge: ["art/scenes/scene-council.png", "#a03020"],
  porch_challenge: ["art/scenes/scene-council.png", "#c06020"],
};

export async function bakeScenes() {
  Object.keys(PAINT).forEach((id) => {
    cache[id] = paintId(id);
  });
  await Promise.all(
    Object.entries(PHOTO_TINTS).map(async ([id, [src, color]]) => {
      const tinted = await tintPhoto(src, color);
      if (tinted) cache[id] = tinted;
    })
  );
  return cache;
}

export function sceneUrl(id) {
  if (cache[id]) return cache[id];
  try {
    cache[id] = paintId(id);
    return cache[id];
  } catch {
    return cache.travel || cache.drill || "art/scenes/scene-council.png";
  }
}
