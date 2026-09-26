import { geoFromYields } from "../resources.js";

/**
 * Canada atlas, 1985–89. Ten provinces and three territories.
 * Northwest Territories still includes the eastern Arctic (Nunavut is 1999).
 * Roads follow the Trans-Canada, the Yellowhead, the Alaska Highway, and
 * the Quebec autoroutes. Rail is CP or CN where the main line ran.
 * Ferries are sea links: Vancouver Island, PEI, Newfoundland.
 * Nothing here is on the week-0 march graph.
 */

const COUNTRY_BBOX = { minLon: -141.1, maxLon: -52.5, minLat: 41.6, maxLat: 83.2 };

/** [id, name, kind, minLon, minLat, maxLon, maxLat] */
const SUBS = [
  ["BC", "British Columbia", "province", -139.1, 48.2, -114.0, 60.0],
  ["AB", "Alberta", "province", -120.0, 49.0, -110.0, 60.0],
  ["SK", "Saskatchewan", "province", -110.0, 49.0, -101.4, 60.0],
  ["MB", "Manitoba", "province", -102.1, 49.0, -88.9, 60.0],
  ["ON", "Ontario", "province", -95.2, 41.6, -74.3, 56.9],
  ["QC", "Quebec", "province", -79.8, 44.9, -57.1, 62.6],
  ["NB", "New Brunswick", "province", -69.1, 44.5, -63.7, 48.1],
  ["NS", "Nova Scotia", "province", -66.4, 43.4, -59.6, 47.1],
  ["PE", "Prince Edward Island", "province", -64.5, 45.9, -61.9, 47.1],
  ["NL", "Newfoundland and Labrador", "province", -67.9, 46.5, -52.5, 60.5],
  ["YT", "Yukon", "territory", -141.1, 60.0, -123.8, 69.7],
  ["NT", "Northwest Territories", "territory", -136.5, 60.0, -61.0, 83.2],
];

const CLIMATE = {
  BC: { sun: 1, weather: 2 }, AB: { sun: 2, weather: 3 }, SK: { sun: 2, weather: 3 },
  MB: { sun: 2, weather: 3 }, ON: { sun: 1, weather: 2 }, QC: { sun: 1, weather: 3 },
  NB: { sun: 1, weather: 2 }, NS: { sun: 1, weather: 2 }, PE: { sun: 1, weather: 2 },
  NL: { sun: 1, weather: 3 }, YT: { sun: 1, weather: 3 }, NT: { sun: 0, weather: 3 },
};

const BIOME = {
  BC: "rainforest", AB: "prairie", SK: "prairie", MB: "prairie", ON: "hardwood",
  QC: "boreal", NB: "boreal", NS: "boreal", PE: "hardwood", NL: "boreal",
  YT: "boreal", NT: "tundra",
};

const BIOME_OVERRIDE = {
  victoria: "rainforest", vancouver: "rainforest", nanaimo: "rainforest",
  kelowna: "steppe", kamloops: "steppe", calgary: "prairie", lethbridge: "prairie",
  medicine_hat: "prairie", fernie: "alpine", fort_mcmurray: "boreal",
  iqaluit: "tundra", inuvik: "tundra", yellowknife: "boreal",
  windsor: "hardwood", toronto: "hardwood", ottawa: "hardwood",
};

/** [id, name, subdivision, lat, lon, role, yields] */
const CITIES = [
  ["victoria", "Victoria", "BC", 48.4284, -123.3656, "capital", ["fisheries", "timber", "port"]],
  ["vancouver", "Vancouver", "BC", 49.2827, -123.1207, "city", ["port", "timber", "coal", "fisheries"]],
  ["nanaimo", "Nanaimo", "BC", 49.1659, -123.9401, "city", ["timber", "fisheries"]],
  ["kamloops", "Kamloops", "BC", 50.6745, -120.3273, "city", ["cattle", "copper", "timber"]],
  ["kelowna", "Kelowna", "BC", 49.888, -119.496, "city", ["apples", "timber"]],
  ["prince_george", "Prince George", "BC", 53.9171, -122.7497, "city", ["timber"]],
  ["dawson_creek", "Dawson Creek", "BC", 55.7596, -120.2377, "city", ["natural_gas", "wheat"]],
  ["fort_st_john", "Fort St. John", "BC", 56.2465, -120.8476, "city", ["natural_gas", "oil"]],
  ["fort_nelson", "Fort Nelson", "BC", 58.805, -122.6972, "city", ["natural_gas", "timber"]],
  ["prince_rupert", "Prince Rupert", "BC", 54.315, -130.3208, "city", ["port", "fisheries", "coal"]],
  ["kitimat", "Kitimat", "BC", 54.0549, -128.6577, "city", ["aluminum", "hydro"]],
  ["fernie", "Fernie", "BC", 49.5042, -115.0628, "city", ["coal", "timber"]],

  ["edmonton", "Edmonton", "AB", 53.5461, -113.4938, "capital", ["oil", "natural_gas", "cattle"]],
  ["calgary", "Calgary", "AB", 51.0447, -114.0719, "city", ["oil", "cattle", "wheat"]],
  ["lethbridge", "Lethbridge", "AB", 49.6956, -112.8451, "city", ["cattle", "wheat"]],
  ["red_deer", "Red Deer", "AB", 52.2681, -113.8112, "city", ["cattle", "oil"]],
  ["fort_mcmurray", "Fort McMurray", "AB", 56.7267, -111.379, "city", ["oil", "natural_gas"]],
  ["medicine_hat", "Medicine Hat", "AB", 50.0417, -110.6775, "city", ["natural_gas", "cattle"]],

  ["regina", "Regina", "SK", 50.4452, -104.6189, "capital", ["wheat", "potash", "oil"]],
  ["saskatoon", "Saskatoon", "SK", 52.1332, -106.67, "city", ["wheat", "potash", "uranium"]],
  ["prince_albert", "Prince Albert", "SK", 53.2033, -105.7531, "city", ["timber", "uranium"]],
  ["la_ronge", "La Ronge", "SK", 55.1001, -105.2842, "city", ["uranium"]],

  ["winnipeg", "Winnipeg", "MB", 49.8954, -97.1385, "capital", ["wheat", "cattle"]],
  ["brandon", "Brandon", "MB", 49.842, -99.953, "city", ["wheat", "cattle"]],
  ["thompson", "Thompson", "MB", 55.7435, -97.8553, "city", ["nickel"]],
  ["churchill", "Churchill", "MB", 58.7684, -94.165, "city", ["port", "wheat"]],

  ["toronto", "Toronto", "ON", 43.6532, -79.3832, "capital", ["autos", "steel", "port"]],
  ["ottawa", "Ottawa", "ON", 45.4215, -75.6972, "city", ["administration"]],
  ["hamilton", "Hamilton", "ON", 43.2557, -79.8711, "city", ["steel"]],
  ["windsor", "Windsor", "ON", 42.3149, -83.0364, "city", ["autos", "steel"]],
  ["london", "London", "ON", 42.9849, -81.2453, "city", ["autos", "corn"]],
  ["oshawa", "Oshawa", "ON", 43.8971, -78.8658, "city", ["autos"]],
  ["kingston", "Kingston", "ON", 44.2312, -76.486, "city", ["dairy", "stone"]],
  ["niagara_falls", "Niagara Falls", "ON", 43.0896, -79.0849, "city", ["hydro"]],
  ["fort_erie", "Fort Erie", "ON", 42.9001, -78.9329, "city", ["wheat", "dairy"]],
  ["sudbury", "Sudbury", "ON", 46.4917, -80.993, "city", ["nickel", "copper"]],
  ["timmins", "Timmins", "ON", 48.4758, -81.3305, "city", ["gold"]],
  ["north_bay", "North Bay", "ON", 46.3091, -79.4608, "city", ["timber"]],
  ["sault_ste_marie", "Sault Ste. Marie", "ON", 46.513, -84.3333, "city", ["steel", "timber"]],
  ["thunder_bay", "Thunder Bay", "ON", 48.3809, -89.2477, "city", ["port", "wheat", "timber"]],

  ["quebec", "Quebec City", "QC", 46.8139, -71.208, "capital", ["port", "timber"]],
  ["montreal", "Montreal", "QC", 45.5017, -73.5673, "city", ["port", "wheat", "dairy"]],
  ["trois_rivieres", "Trois-Rivières", "QC", 46.343, -72.5431, "city", ["timber", "hydro"]],
  ["sherbrooke", "Sherbrooke", "QC", 45.4042, -71.8929, "city", ["timber"]],
  ["thetford_mines", "Thetford Mines", "QC", 46.0937, -71.3054, "city", ["asbestos"]],
  ["saguenay", "Saguenay", "QC", 48.4281, -71.0686, "city", ["aluminum", "hydro", "timber"]],
  ["rouyn_noranda", "Rouyn-Noranda", "QC", 48.2398, -79.0283, "city", ["copper", "gold"]],
  ["radisson", "Radisson", "QC", 53.79, -77.62, "city", ["hydro"]],
  ["sept_iles", "Sept-Îles", "QC", 50.2001, -66.3756, "city", ["iron", "port"]],

  ["fredericton", "Fredericton", "NB", 45.9636, -66.6431, "capital", ["timber"]],
  ["saint_john", "Saint John", "NB", 45.2733, -66.0633, "city", ["port", "oil", "fisheries"]],
  ["moncton", "Moncton", "NB", 46.0878, -64.7782, "city", ["fisheries", "timber"]],

  ["halifax", "Halifax", "NS", 44.6488, -63.5752, "capital", ["port", "fisheries"]],
  ["sydney", "Sydney", "NS", 46.1368, -60.1942, "city", ["coal", "steel", "fisheries"]],

  ["charlottetown", "Charlottetown", "PE", 46.2382, -63.1311, "capital", ["potatoes", "fisheries"]],

  ["st_johns", "St. John's", "NL", 47.5615, -52.7126, "capital", ["fisheries", "port"]],
  ["gander", "Gander", "NL", 48.9569, -54.6089, "city", ["fisheries", "timber"]],
  ["corner_brook", "Corner Brook", "NL", 48.9484, -57.95, "city", ["timber", "fisheries"]],
  ["port_aux_basques", "Port aux Basques", "NL", 47.5702, -59.1367, "city", ["fisheries", "port"]],
  ["labrador_city", "Labrador City", "NL", 52.9463, -66.9114, "city", ["iron"]],
  ["churchill_falls", "Churchill Falls", "NL", 53.557, -64.008, "city", ["hydro"]],

  ["whitehorse", "Whitehorse", "YT", 60.7212, -135.0568, "capital", ["lead", "zinc", "gold"]],
  ["watson_lake", "Watson Lake", "YT", 60.0634, -128.7089, "city", ["timber", "zinc"]],
  ["dawson", "Dawson", "YT", 64.06, -139.432, "city", ["gold"]],

  ["yellowknife", "Yellowknife", "NT", 62.454, -114.3718, "capital", ["gold", "zinc"]],
  ["hay_river", "Hay River", "NT", 60.8156, -115.7999, "city", ["zinc", "lead"]],
  ["inuvik", "Inuvik", "NT", 68.3607, -133.723, "city", ["oil", "natural_gas"]],
  ["iqaluit", "Iqaluit", "NT", 63.7467, -68.517, "city", ["fisheries", "administration"]],
];

/** [a, b, kind, via] Undirected. */
const LINKS = [
  ["victoria", "nanaimo", "road", "Island Highway"],
  ["victoria", "vancouver", "sea", "BC Ferries (Swartz Bay–Tsawwassen)"],
  ["nanaimo", "vancouver", "sea", "BC Ferries (Departure Bay–Horseshoe Bay)"],
  ["vancouver", "kamloops", "rail", "CP / Trans-Canada"],
  ["kamloops", "kelowna", "road", "Hwy 97"],
  ["kamloops", "calgary", "rail", "CP"],
  ["kamloops", "prince_george", "road", "Hwy 97"],
  ["prince_george", "prince_rupert", "rail", "CN"],
  ["prince_rupert", "kitimat", "road", "Hwy 16"],
  ["prince_george", "dawson_creek", "road", "Hwy 97"],
  ["dawson_creek", "fort_st_john", "road", "Alaska Highway"],
  ["fort_st_john", "fort_nelson", "road", "Alaska Highway"],
  ["fort_nelson", "watson_lake", "road", "Alaska Highway"],
  ["dawson_creek", "edmonton", "road", "Hwy 43"],
  ["fernie", "lethbridge", "road", "Hwy 3 (Crowsnest)"],

  ["edmonton", "calgary", "road", "Hwy 2"],
  ["edmonton", "red_deer", "road", "Hwy 2"],
  ["red_deer", "calgary", "road", "Hwy 2"],
  ["calgary", "lethbridge", "road", "Hwy 2"],
  ["calgary", "medicine_hat", "road", "Trans-Canada"],
  ["medicine_hat", "regina", "road", "Trans-Canada"],
  ["edmonton", "fort_mcmurray", "road", "Hwy 63"],
  ["edmonton", "saskatoon", "rail", "CN"],
  ["edmonton", "hay_river", "road", "Mackenzie Highway"],

  ["regina", "saskatoon", "road", "Hwy 11"],
  ["saskatoon", "prince_albert", "road", "Hwy 2"],
  ["prince_albert", "la_ronge", "road", "Hwy 2"],
  ["regina", "brandon", "road", "Trans-Canada"],
  ["brandon", "winnipeg", "road", "Trans-Canada"],
  ["regina", "winnipeg", "rail", "CP"],
  ["saskatoon", "winnipeg", "rail", "CN"],
  ["winnipeg", "thompson", "road", "Hwy 6"],
  ["thompson", "churchill", "rail", "Hudson Bay Railway"],
  ["winnipeg", "thunder_bay", "rail", "CP / Trans-Canada"],

  ["thunder_bay", "sault_ste_marie", "road", "Trans-Canada"],
  ["sault_ste_marie", "sudbury", "road", "Trans-Canada"],
  ["sudbury", "north_bay", "road", "Trans-Canada"],
  ["north_bay", "ottawa", "road", "Trans-Canada"],
  ["sudbury", "timmins", "road", "Hwy 144"],
  ["sudbury", "toronto", "road", "Hwy 69 / 400"],
  ["ottawa", "montreal", "road", "Hwy 417"],
  ["ottawa", "toronto", "road", "Hwy 7"],
  ["montreal", "kingston", "road", "Hwy 20 / 401"],
  ["kingston", "oshawa", "road", "Hwy 401"],
  ["oshawa", "toronto", "road", "Hwy 401"],
  ["toronto", "hamilton", "road", "QEW"],
  ["hamilton", "london", "road", "Hwy 401"],
  ["london", "windsor", "road", "Hwy 401"],
  ["hamilton", "niagara_falls", "road", "QEW"],
  ["niagara_falls", "fort_erie", "road", "QEW"],

  ["montreal", "trois_rivieres", "road", "Hwy 40"],
  ["trois_rivieres", "quebec", "road", "Hwy 40"],
  ["montreal", "sherbrooke", "road", "Hwy 10"],
  ["sherbrooke", "thetford_mines", "road", "QC-112"],
  ["thetford_mines", "quebec", "road", "QC-112"],
  ["quebec", "saguenay", "road", "QC-175"],
  ["montreal", "rouyn_noranda", "road", "Hwy 117"],
  ["rouyn_noranda", "radisson", "road", "James Bay Road"],
  ["quebec", "sept_iles", "sea", "St. Lawrence ore boats"],
  ["sept_iles", "labrador_city", "rail", "QNS&L"],
  ["labrador_city", "churchill_falls", "road", "Labrador road"],
  ["quebec", "fredericton", "road", "Trans-Canada"],

  ["fredericton", "saint_john", "road", "Hwy 7"],
  ["fredericton", "moncton", "road", "Trans-Canada"],
  ["saint_john", "moncton", "road", "Hwy 1"],
  ["moncton", "halifax", "road", "Trans-Canada"],
  ["halifax", "sydney", "road", "Trans-Canada"],
  ["charlottetown", "moncton", "sea", "Borden–Cape Tormentine ferry"],
  ["port_aux_basques", "sydney", "sea", "Marine Atlantic (North Sydney)"],
  ["st_johns", "sydney", "sea", "Marine Atlantic (Argentia, seasonal)"],
  ["port_aux_basques", "corner_brook", "road", "Trans-Canada"],
  ["corner_brook", "gander", "road", "Trans-Canada"],
  ["gander", "st_johns", "road", "Trans-Canada"],

  ["watson_lake", "whitehorse", "road", "Alaska Highway"],
  ["whitehorse", "dawson", "road", "Klondike Highway"],
  ["dawson", "inuvik", "road", "Dempster Highway"],
  ["hay_river", "yellowknife", "road", "Hwy 3"],
  ["iqaluit", "montreal", "sea", "eastern Arctic sealift"],
];

const OFFICERS = [
  {
    id: "ca_cmd_bedard",
    name: "Claire Bédard",
    title: "Prime Minister",
    rank: "Prime Minister",
    branch: "civilian",
    slot: "head_of_state",
    war: 30, int: 78, pol: 90, chr: 84,
    personality: "diplomat",
    loyalty: 82, ambition: 40,
    region: "ca.ottawa",
    bio: "Fictional head of government in Ottawa. She keeps the provinces on one telephone tree and does not pretend the west is already won.",
  },
  {
    id: "ca_cmd_macneil",
    name: "Iain MacNeil",
    title: "Minister of National Defence",
    rank: "Minister",
    branch: "civilian",
    slot: "defense_minister",
    war: 44, int: 86, pol: 76, chr: 58,
    personality: "cautious",
    loyalty: 80, ambition: 32,
    region: "ca.ottawa",
    bio: "Counts brigades, Aurora patrol days, and which port still has fuel. He will not spend a battalion on a rumor.",
  },
  {
    id: "ca_cmd_savoie",
    name: "Jean-Paul Savoie",
    title: "Chief of the Defence Staff",
    rank: "General",
    branch: "Canadian Forces",
    slot: "chief_of_staff",
    war: 86, int: 80, pol: 60, chr: 64,
    personality: "loyalist",
    loyalty: 90, ambition: 28,
    region: "ca.ottawa",
    bio: "Army CDS. He thinks in Mobile Command brigades, Maritime Command hulls, and Air Command wings, all still under 1980s unification.",
  },
  {
    id: "ca_cmd_caron",
    name: "Hélène Caron",
    title: "Forces Mobile Command",
    rank: "Lieutenant-General",
    branch: "Mobile Command",
    slot: "front_commander",
    war: 82, int: 74, pol: 56, chr: 62,
    personality: "loyalist",
    loyalty: 86, ambition: 36,
    region: "ca.montreal",
    bio: "Commands the land force from the St. Lawrence. She moves battalions by rail and highway and hates a leap across a province.",
  },
  {
    id: "ca_cmd_poirier",
    name: "Hugh Poirier",
    title: "Maritime Command",
    rank: "Rear-Admiral",
    branch: "Maritime Command",
    slot: "front_commander",
    war: 80, int: 76, pol: 48, chr: 58,
    personality: "cautious",
    loyalty: 84, ambition: 30,
    region: "ca.halifax",
    bio: "Flies his flag at Halifax. Destroyers, the Newfoundland ferry lane, and the Atlantic patrol are his map.",
  },
  {
    id: "ca_cmd_fedoruk",
    name: "Murray Fedoruk",
    title: "Air Command",
    rank: "Lieutenant-General",
    branch: "Air Command",
    slot: "front_commander",
    war: 78, int: 77, pol: 46, chr: 54,
    personality: "cautious",
    loyalty: 88, ambition: 26,
    region: "ca.winnipeg",
    bio: "Air Command on the prairies. Fighters, radar, and transport. He measures the north by runway length.",
  },
  {
    id: "ca_cmd_leung",
    name: "Colin Leung",
    title: "Pacific region",
    rank: "Major-General",
    branch: "Mobile Command",
    slot: "front_commander",
    war: 74, int: 72, pol: 58, chr: 68,
    personality: "diplomat",
    loyalty: 82, ambition: 38,
    region: "ca.vancouver",
    bio: "Pacific land commander. Vancouver, the Island ferries, and the highway to the interior. He does not pave the strait.",
  },
  {
    id: "ca_cmd_blake",
    name: "Nora Blake",
    title: "Northern region",
    rank: "Colonel",
    branch: "Canadian Forces",
    slot: "front_commander",
    war: 70, int: 73, pol: 42, chr: 50,
    personality: "recluse",
    loyalty: 86, ambition: 24,
    region: "ca.yellowknife",
    bio: "Northern colonel. The Mackenzie barge season and the Dempster are the whole year. Iqaluit is a sealift, not a road.",
  },
  {
    id: "ca_fld_gagnon",
    name: "Lucie Gagnon",
    title: "St. Lawrence infantry",
    rank: "Captain",
    branch: "Mobile Command",
    slot: "field_officer",
    war: 68, int: 64, pol: 44, chr: 66,
    personality: "loyalist",
    loyalty: 84, ambition: 34,
    region: "ca.quebec",
    bio: "Company commander on the Quebec garrison road. French is her working language, and the next town is as far as she marches.",
  },
  {
    id: "ca_fld_sidhu",
    name: "Hardeep Sidhu",
    title: "Pacific infantry",
    rank: "Major",
    branch: "Mobile Command",
    slot: "field_officer",
    war: 72, int: 66, pol: 48, chr: 60,
    personality: "ambitious",
    loyalty: 70, ambition: 68,
    region: "ca.vancouver",
    bio: "Vancouver major. Mills, the coal port, and the Island ferry clock. He wants a brigade and still waits for the boat.",
  },
  {
    id: "ca_fld_chisholm",
    name: "Megan Chisholm",
    title: "Atlantic patrol",
    rank: "Lieutenant-Commander",
    branch: "Maritime Command",
    slot: "field_officer",
    war: 64, int: 70, pol: 40, chr: 58,
    personality: "cautious",
    loyalty: 82, ambition: 30,
    region: "ca.halifax",
    bio: "Halifax watchkeeper. She knows the ferry to Port aux Basques and will not draw a causeway that has not been built.",
  },
  {
    id: "ca_fld_bouchard",
    name: "Yves Bouchard",
    title: "Quebec liaison",
    rank: "Major",
    branch: "Mobile Command",
    slot: "field_officer",
    war: 60, int: 74, pol: 68, chr: 72,
    personality: "diplomat",
    loyalty: 80, ambition: 42,
    region: "ca.montreal",
    bio: "Montreal liaison. Ports, grain, and the highway to Ottawa. He keeps the occupation rumor out of the orders.",
  },
  {
    id: "ca_fld_lang",
    name: "Edith Lang",
    title: "Prairie column",
    rank: "Colonel",
    branch: "Mobile Command",
    slot: "field_officer",
    war: 70, int: 62, pol: 50, chr: 64,
    personality: "loyalist",
    loyalty: 84, ambition: 32,
    region: "ca.edmonton",
    bio: "Edmonton colonel. Oil, cattle, and the Yellowhead. Fort McMurray is a highway, not a leap.",
  },
];

function build() {
  const full = (id) => `ca.${id}`;
  const neighbors = new Map();
  const add = (from, to, kind, via) => {
    if (!neighbors.has(from)) neighbors.set(from, []);
    neighbors.get(from).push({
      id: full(to),
      kind,
      via,
      modes: kind === "sea" ? ["sea"] : kind === "trail" ? ["trail"] : kind === "rail" ? ["rail", "road"] : ["road"],
    });
  };
  LINKS.forEach(([a, b, kind, via]) => {
    add(a, b, kind, via);
    add(b, a, kind, via);
  });

  const territories = CITIES.map(([id, name, subdivision, lat, lon, role, yields]) => ({
    id: full(id),
    name,
    short: name,
    country: "CA",
    subdivision,
    lat,
    lon,
    role,
    biome: BIOME_OVERRIDE[id] || BIOME[subdivision] || "boreal",
    yields,
    geo: geoFromYields(yields, CLIMATE[subdivision], role, subdivision),
    neighbors: neighbors.get(id) || [],
    status: "occupied",
    playable: false,
    reach: "later",
    campaignId: null,
  }));

  const bySub = new Map();
  territories.forEach((t) => {
    if (t.role === "capital") bySub.set(t.subdivision, t.id);
  });

  const subdivisions = SUBS.map(([id, name, kind, minLon, minLat, maxLon, maxLat]) => ({
    id,
    name,
    kind,
    country: "CA",
    biome: BIOME[id] || "boreal",
    bbox: { minLon, minLat, maxLon, maxLat },
    capital: bySub.get(id),
  }));

  return {
    id: "ca",
    name: "Canada",
    country: "CA",
    era: "1985-1989",
    status: "occupied",
    playable: false,
    reach: "later",
    bbox: COUNTRY_BBOX,
    notes: "Atlas only. Ten provinces and three territories; the eastern Arctic is still the Northwest Territories. Occupied and off the week-0 march. Prince Edward Island and Newfoundland are ferries, not roads. The Confederation Bridge is not built yet.",
    subdivisions,
    territories,
    officers: OFFICERS.map((o) => ({ ...o, fictional: true })),
  };
}

export const CA_REGION = build();
