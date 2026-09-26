import { buildRegion, staff } from "../build-region.js";

function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const UK_REGION = land({
  id: "gb",
  name: "United Kingdom",
  country: "GB",
  bbox: {"minLon": -9.04, "maxLon": 2.71, "minLat": 48.86, "maxLat": 61.55},
  notes: "Atlas only. England and Wales use the 1974 counties, including Greater London and the six metropolitan counties. Their councils in London and the metropolitan counties were abolished in 1986; the areas remain. Scotland uses the 1975 regions and three island areas. Northern Ireland uses its six counties. The Channel Tunnel is not open. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 1, "weather": 3}},
  biome: {},
  subs: [
  {
    "id": "GB-LND",
    "name": "Greater London",
    "kind": "county"
  },
  {
    "id": "GB-AVN",
    "name": "Avon",
    "kind": "county"
  },
  {
    "id": "GB-BDF",
    "name": "Bedfordshire",
    "kind": "county"
  },
  {
    "id": "GB-BRK",
    "name": "Berkshire",
    "kind": "county"
  },
  {
    "id": "GB-BKM",
    "name": "Buckinghamshire",
    "kind": "county"
  },
  {
    "id": "GB-CAM",
    "name": "Cambridgeshire",
    "kind": "county"
  },
  {
    "id": "GB-CHS",
    "name": "Cheshire",
    "kind": "county"
  },
  {
    "id": "GB-CLV",
    "name": "Cleveland",
    "kind": "county"
  },
  {
    "id": "GB-CON",
    "name": "Cornwall",
    "kind": "county"
  },
  {
    "id": "GB-CMA",
    "name": "Cumbria",
    "kind": "county"
  },
  {
    "id": "GB-DBY",
    "name": "Derbyshire",
    "kind": "county"
  },
  {
    "id": "GB-DEV",
    "name": "Devon",
    "kind": "county"
  },
  {
    "id": "GB-DOR",
    "name": "Dorset",
    "kind": "county"
  },
  {
    "id": "GB-DUR",
    "name": "Durham",
    "kind": "county"
  },
  {
    "id": "GB-ESX",
    "name": "East Sussex",
    "kind": "county"
  },
  {
    "id": "GB-ESS",
    "name": "Essex",
    "kind": "county"
  },
  {
    "id": "GB-GLS",
    "name": "Gloucestershire",
    "kind": "county"
  },
  {
    "id": "GB-HAM",
    "name": "Hampshire",
    "kind": "county"
  },
  {
    "id": "GB-HWR",
    "name": "Hereford and Worcester",
    "kind": "county"
  },
  {
    "id": "GB-HRT",
    "name": "Hertfordshire",
    "kind": "county"
  },
  {
    "id": "GB-HUM",
    "name": "Humberside",
    "kind": "county"
  },
  {
    "id": "GB-IOW",
    "name": "Isle of Wight",
    "kind": "county"
  },
  {
    "id": "GB-KEN",
    "name": "Kent",
    "kind": "county"
  },
  {
    "id": "GB-LAN",
    "name": "Lancashire",
    "kind": "county"
  },
  {
    "id": "GB-LEC",
    "name": "Leicestershire",
    "kind": "county"
  },
  {
    "id": "GB-LIN",
    "name": "Lincolnshire",
    "kind": "county"
  },
  {
    "id": "GB-NFK",
    "name": "Norfolk",
    "kind": "county"
  },
  {
    "id": "GB-NTH",
    "name": "Northamptonshire",
    "kind": "county"
  },
  {
    "id": "GB-NBL",
    "name": "Northumberland",
    "kind": "county"
  },
  {
    "id": "GB-NYK",
    "name": "North Yorkshire",
    "kind": "county"
  },
  {
    "id": "GB-NTT",
    "name": "Nottinghamshire",
    "kind": "county"
  },
  {
    "id": "GB-OXF",
    "name": "Oxfordshire",
    "kind": "county"
  },
  {
    "id": "GB-SHR",
    "name": "Shropshire",
    "kind": "county"
  },
  {
    "id": "GB-SOM",
    "name": "Somerset",
    "kind": "county"
  },
  {
    "id": "GB-STS",
    "name": "Staffordshire",
    "kind": "county"
  },
  {
    "id": "GB-SFK",
    "name": "Suffolk",
    "kind": "county"
  },
  {
    "id": "GB-SRY",
    "name": "Surrey",
    "kind": "county"
  },
  {
    "id": "GB-WAR",
    "name": "Warwickshire",
    "kind": "county"
  },
  {
    "id": "GB-WSX",
    "name": "West Sussex",
    "kind": "county"
  },
  {
    "id": "GB-WIL",
    "name": "Wiltshire",
    "kind": "county"
  },
  {
    "id": "GB-MAN",
    "name": "Greater Manchester",
    "kind": "county"
  },
  {
    "id": "GB-MSY",
    "name": "Merseyside",
    "kind": "county"
  },
  {
    "id": "GB-SYK",
    "name": "South Yorkshire",
    "kind": "county"
  },
  {
    "id": "GB-TWR",
    "name": "Tyne and Wear",
    "kind": "county"
  },
  {
    "id": "GB-WMD",
    "name": "West Midlands",
    "kind": "county"
  },
  {
    "id": "GB-WYK",
    "name": "West Yorkshire",
    "kind": "county"
  },
  {
    "id": "GB-CWD",
    "name": "Clwyd",
    "kind": "county"
  },
  {
    "id": "GB-DFD",
    "name": "Dyfed",
    "kind": "county"
  },
  {
    "id": "GB-GNT",
    "name": "Gwent",
    "kind": "county"
  },
  {
    "id": "GB-GWN",
    "name": "Gwynedd",
    "kind": "county"
  },
  {
    "id": "GB-MGM",
    "name": "Mid Glamorgan",
    "kind": "county"
  },
  {
    "id": "GB-POW",
    "name": "Powys",
    "kind": "county"
  },
  {
    "id": "GB-SGM",
    "name": "South Glamorgan",
    "kind": "county"
  },
  {
    "id": "GB-WGM",
    "name": "West Glamorgan",
    "kind": "county"
  },
  {
    "id": "GB-BOR",
    "name": "Borders",
    "kind": "region"
  },
  {
    "id": "GB-CTR",
    "name": "Central",
    "kind": "region"
  },
  {
    "id": "GB-DGY",
    "name": "Dumfries and Galloway",
    "kind": "region"
  },
  {
    "id": "GB-FIF",
    "name": "Fife",
    "kind": "region"
  },
  {
    "id": "GB-GMP",
    "name": "Grampian",
    "kind": "region"
  },
  {
    "id": "GB-HLD",
    "name": "Highland",
    "kind": "region"
  },
  {
    "id": "GB-LTN",
    "name": "Lothian",
    "kind": "region"
  },
  {
    "id": "GB-STD",
    "name": "Strathclyde",
    "kind": "region"
  },
  {
    "id": "GB-TAY",
    "name": "Tayside",
    "kind": "region"
  },
  {
    "id": "GB-ORK",
    "name": "Orkney",
    "kind": "region"
  },
  {
    "id": "GB-SHI",
    "name": "Shetland",
    "kind": "region"
  },
  {
    "id": "GB-WIS",
    "name": "Western Isles",
    "kind": "region"
  },
  {
    "id": "GB-ANT",
    "name": "Antrim",
    "kind": "county"
  },
  {
    "id": "GB-ARM",
    "name": "Armagh",
    "kind": "county"
  },
  {
    "id": "GB-DOW",
    "name": "Down",
    "kind": "county"
  },
  {
    "id": "GB-FER",
    "name": "Fermanagh",
    "kind": "county"
  },
  {
    "id": "GB-LDY",
    "name": "Londonderry",
    "kind": "county"
  },
  {
    "id": "GB-TYR",
    "name": "Tyrone",
    "kind": "county"
  }
],
  cities: [
  [
    "london",
    "London",
    "GB-LND",
    51.507,
    -0.128,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bristol",
    "Bristol",
    "GB-AVN",
    51.455,
    -2.587,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bedford",
    "Bedford",
    "GB-BDF",
    52.136,
    -0.467,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "reading",
    "Reading",
    "GB-BRK",
    51.454,
    -0.978,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "aylesbury",
    "Aylesbury",
    "GB-BKM",
    51.816,
    -0.813,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "cambridge",
    "Cambridge",
    "GB-CAM",
    52.205,
    0.119,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "chester",
    "Chester",
    "GB-CHS",
    53.191,
    -2.891,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "middlesbrough",
    "Middlesbrough",
    "GB-CLV",
    54.574,
    -1.235,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "truro",
    "Truro",
    "GB-CON",
    50.263,
    -5.051,
    "capital",
    [
      "tin"
    ]
  ],
  [
    "carlisle",
    "Carlisle",
    "GB-CMA",
    54.892,
    -2.944,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "derby",
    "Derby",
    "GB-DBY",
    52.922,
    -1.476,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "exeter",
    "Exeter",
    "GB-DEV",
    50.718,
    -3.534,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "plymouth",
    "Plymouth",
    "GB-DEV",
    50.372,
    -4.14,
    "port",
    [
      "port",
      "fisheries"
    ]
  ],
  [
    "dorchester",
    "Dorchester",
    "GB-DOR",
    50.715,
    -2.437,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "weymouth",
    "Weymouth",
    "GB-DOR",
    50.614,
    -2.457,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "durham",
    "Durham",
    "GB-DUR",
    54.776,
    -1.573,
    "capital",
    [
      "coal"
    ]
  ],
  [
    "lewes",
    "Lewes",
    "GB-ESX",
    50.873,
    0.011,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "chelmsford",
    "Chelmsford",
    "GB-ESS",
    51.736,
    0.479,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "harwich",
    "Harwich",
    "GB-ESS",
    51.946,
    1.289,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "gloucester",
    "Gloucester",
    "GB-GLS",
    51.864,
    -2.238,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "winchester",
    "Winchester",
    "GB-HAM",
    51.063,
    -1.308,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "southampton",
    "Southampton",
    "GB-HAM",
    50.91,
    -1.404,
    "port",
    [
      "port"
    ]
  ],
  [
    "portsmouth",
    "Portsmouth",
    "GB-HAM",
    50.819,
    -1.088,
    "port",
    [
      "port"
    ]
  ],
  [
    "worcester",
    "Worcester",
    "GB-HWR",
    52.193,
    -2.221,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "hertford",
    "Hertford",
    "GB-HRT",
    51.797,
    -0.078,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "beverley",
    "Beverley",
    "GB-HUM",
    53.842,
    -0.427,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "hull",
    "Hull",
    "GB-HUM",
    53.745,
    -0.338,
    "port",
    [
      "fisheries",
      "port"
    ]
  ],
  [
    "scunthorpe",
    "Scunthorpe",
    "GB-HUM",
    53.589,
    -0.654,
    "city",
    [
      "steel"
    ]
  ],
  [
    "newport_iow",
    "Newport",
    "GB-IOW",
    50.701,
    -1.293,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "maidstone",
    "Maidstone",
    "GB-KEN",
    51.272,
    0.529,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "dover",
    "Dover",
    "GB-KEN",
    51.127,
    1.313,
    "port",
    [
      "port"
    ]
  ],
  [
    "preston",
    "Preston",
    "GB-LAN",
    53.763,
    -2.703,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "leicester",
    "Leicester",
    "GB-LEC",
    52.636,
    -1.134,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lincoln",
    "Lincoln",
    "GB-LIN",
    53.23,
    -0.541,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "norwich",
    "Norwich",
    "GB-NFK",
    52.628,
    1.297,
    "capital",
    [
      "wheat",
      "barley"
    ]
  ],
  [
    "northampton",
    "Northampton",
    "GB-NTH",
    52.24,
    -0.902,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "morpeth",
    "Morpeth",
    "GB-NBL",
    55.167,
    -1.691,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "northallerton",
    "Northallerton",
    "GB-NYK",
    54.338,
    -1.435,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "nottingham",
    "Nottingham",
    "GB-NTT",
    52.954,
    -1.155,
    "capital",
    [
      "coal"
    ]
  ],
  [
    "oxford",
    "Oxford",
    "GB-OXF",
    51.752,
    -1.256,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "shrewsbury",
    "Shrewsbury",
    "GB-SHR",
    52.708,
    -2.754,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "taunton",
    "Taunton",
    "GB-SOM",
    51.015,
    -3.103,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "stafford",
    "Stafford",
    "GB-STS",
    52.807,
    -2.117,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ipswich",
    "Ipswich",
    "GB-SFK",
    52.056,
    1.148,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "guildford",
    "Guildford",
    "GB-SRY",
    51.236,
    -0.57,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "warwick",
    "Warwick",
    "GB-WAR",
    52.282,
    -1.584,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "chichester",
    "Chichester",
    "GB-WSX",
    50.837,
    -0.779,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "trowbridge",
    "Trowbridge",
    "GB-WIL",
    51.32,
    -2.208,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "manchester",
    "Manchester",
    "GB-MAN",
    53.481,
    -2.242,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "liverpool",
    "Liverpool",
    "GB-MSY",
    53.408,
    -2.992,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "barnsley",
    "Barnsley",
    "GB-SYK",
    53.553,
    -1.479,
    "capital",
    [
      "coal"
    ]
  ],
  [
    "sheffield",
    "Sheffield",
    "GB-SYK",
    53.381,
    -1.47,
    "city",
    [
      "steel",
      "coal"
    ]
  ],
  [
    "newcastle",
    "Newcastle",
    "GB-TWR",
    54.978,
    -1.618,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "birmingham",
    "Birmingham",
    "GB-WMD",
    52.486,
    -1.89,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "leeds",
    "Leeds",
    "GB-WYK",
    53.8,
    -1.549,
    "capital",
    [
      "wool"
    ]
  ],
  [
    "mold",
    "Mold",
    "GB-CWD",
    53.166,
    -3.141,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "carmarthen",
    "Carmarthen",
    "GB-DFD",
    51.856,
    -4.312,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "fishguard",
    "Fishguard",
    "GB-DFD",
    52.011,
    -4.977,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "cwmbran",
    "Cwmbran",
    "GB-GNT",
    51.654,
    -3.021,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "caernarfon",
    "Caernarfon",
    "GB-GWN",
    53.139,
    -4.273,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "holyhead",
    "Holyhead",
    "GB-GWN",
    53.308,
    -4.633,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "pontypridd",
    "Pontypridd",
    "GB-MGM",
    51.602,
    -3.342,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "llandrindod",
    "Llandrindod Wells",
    "GB-POW",
    52.241,
    -3.378,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "cardiff",
    "Cardiff",
    "GB-SGM",
    51.481,
    -3.179,
    "capital",
    [
      "administration",
      "coal"
    ]
  ],
  [
    "swansea",
    "Swansea",
    "GB-WGM",
    51.621,
    -3.943,
    "capital",
    [
      "steel",
      "port"
    ]
  ],
  [
    "newtown",
    "Newtown St Boswells",
    "GB-BOR",
    55.578,
    -2.673,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "stirling",
    "Stirling",
    "GB-CTR",
    56.116,
    -3.936,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "dumfries",
    "Dumfries",
    "GB-DGY",
    55.07,
    -3.605,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "stranraer",
    "Stranraer",
    "GB-DGY",
    54.902,
    -5.027,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "glenrothes",
    "Glenrothes",
    "GB-FIF",
    56.196,
    -3.173,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "aberdeen",
    "Aberdeen",
    "GB-GMP",
    57.15,
    -2.11,
    "capital",
    [
      "oil",
      "natural_gas",
      "fisheries"
    ]
  ],
  [
    "inverness",
    "Inverness",
    "GB-HLD",
    57.478,
    -4.224,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "edinburgh",
    "Edinburgh",
    "GB-LTN",
    55.953,
    -3.189,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "glasgow",
    "Glasgow",
    "GB-STD",
    55.864,
    -4.252,
    "capital",
    [
      "steel",
      "port"
    ]
  ],
  [
    "dundee",
    "Dundee",
    "GB-TAY",
    56.462,
    -2.971,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kirkwall",
    "Kirkwall",
    "GB-ORK",
    58.981,
    -2.96,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lerwick",
    "Lerwick",
    "GB-SHI",
    60.155,
    -1.145,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "stornoway",
    "Stornoway",
    "GB-WIS",
    58.209,
    -6.387,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "belfast",
    "Belfast",
    "GB-ANT",
    54.597,
    -5.93,
    "capital",
    [
      "administration",
      "port"
    ]
  ],
  [
    "larne",
    "Larne",
    "GB-ANT",
    54.851,
    -5.811,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "armagh",
    "Armagh",
    "GB-ARM",
    54.35,
    -6.652,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "newry",
    "Newry",
    "GB-ARM",
    54.176,
    -6.338,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "downpatrick",
    "Downpatrick",
    "GB-DOW",
    54.328,
    -5.716,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "enniskillen",
    "Enniskillen",
    "GB-FER",
    54.344,
    -7.641,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "derry",
    "Derry",
    "GB-LDY",
    54.996,
    -7.309,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "omagh",
    "Omagh",
    "GB-TYR",
    54.597,
    -7.31,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "london",
    "reading",
    "road",
    "M4"
  ],
  [
    "reading",
    "trowbridge",
    "road",
    "M4"
  ],
  [
    "trowbridge",
    "bristol",
    "road",
    "M4"
  ],
  [
    "bristol",
    "gloucester",
    "road",
    "M5"
  ],
  [
    "gloucester",
    "worcester",
    "road",
    "M5"
  ],
  [
    "worcester",
    "birmingham",
    "road",
    "M5"
  ],
  [
    "bristol",
    "taunton",
    "road",
    "M5"
  ],
  [
    "taunton",
    "exeter",
    "road",
    "M5"
  ],
  [
    "exeter",
    "plymouth",
    "road",
    "M5"
  ],
  [
    "exeter",
    "truro",
    "road",
    "A30"
  ],
  [
    "london",
    "winchester",
    "road",
    "M3"
  ],
  [
    "winchester",
    "southampton",
    "road",
    "M3"
  ],
  [
    "southampton",
    "portsmouth",
    "road",
    "M27"
  ],
  [
    "southampton",
    "dorchester",
    "road",
    "A35"
  ],
  [
    "dorchester",
    "exeter",
    "road",
    "A35"
  ],
  [
    "dorchester",
    "weymouth",
    "road",
    "A354"
  ],
  [
    "southampton",
    "newport_iow",
    "sea",
    "Wight ferry"
  ],
  [
    "london",
    "guildford",
    "road",
    "A24 / A27"
  ],
  [
    "guildford",
    "chichester",
    "road",
    "A24 / A27"
  ],
  [
    "london",
    "lewes",
    "road",
    "A23"
  ],
  [
    "london",
    "maidstone",
    "road",
    "M20"
  ],
  [
    "maidstone",
    "dover",
    "road",
    "M20"
  ],
  [
    "london",
    "cambridge",
    "road",
    "M11"
  ],
  [
    "cambridge",
    "norwich",
    "road",
    "M11"
  ],
  [
    "london",
    "chelmsford",
    "road",
    "A12"
  ],
  [
    "chelmsford",
    "ipswich",
    "road",
    "A12"
  ],
  [
    "chelmsford",
    "harwich",
    "road",
    "A120"
  ],
  [
    "london",
    "hertford",
    "road",
    "M1"
  ],
  [
    "hertford",
    "bedford",
    "road",
    "M1"
  ],
  [
    "bedford",
    "northampton",
    "road",
    "M1"
  ],
  [
    "northampton",
    "leicester",
    "road",
    "M1"
  ],
  [
    "leicester",
    "nottingham",
    "road",
    "M1"
  ],
  [
    "nottingham",
    "derby",
    "road",
    "M1"
  ],
  [
    "derby",
    "sheffield",
    "road",
    "M1"
  ],
  [
    "sheffield",
    "leeds",
    "road",
    "M1"
  ],
  [
    "leeds",
    "northallerton",
    "road",
    "A1"
  ],
  [
    "northallerton",
    "middlesbrough",
    "road",
    "A1"
  ],
  [
    "middlesbrough",
    "newcastle",
    "road",
    "A1"
  ],
  [
    "newcastle",
    "morpeth",
    "road",
    "A1"
  ],
  [
    "morpeth",
    "edinburgh",
    "road",
    "A1"
  ],
  [
    "durham",
    "newcastle",
    "road",
    "A690"
  ],
  [
    "leeds",
    "manchester",
    "road",
    "M62"
  ],
  [
    "manchester",
    "liverpool",
    "road",
    "M62"
  ],
  [
    "leeds",
    "hull",
    "road",
    "M62"
  ],
  [
    "sheffield",
    "barnsley",
    "road",
    "M18"
  ],
  [
    "barnsley",
    "leeds",
    "road",
    "M18"
  ],
  [
    "hull",
    "scunthorpe",
    "road",
    "M180"
  ],
  [
    "scunthorpe",
    "lincoln",
    "road",
    "M180"
  ],
  [
    "lincoln",
    "nottingham",
    "road",
    "A15"
  ],
  [
    "birmingham",
    "stafford",
    "road",
    "M6"
  ],
  [
    "stafford",
    "manchester",
    "road",
    "M6"
  ],
  [
    "manchester",
    "preston",
    "road",
    "M6"
  ],
  [
    "preston",
    "carlisle",
    "road",
    "M6"
  ],
  [
    "carlisle",
    "glasgow",
    "road",
    "M6"
  ],
  [
    "stafford",
    "chester",
    "road",
    "A51"
  ],
  [
    "leicester",
    "birmingham",
    "road",
    "M69"
  ],
  [
    "warwick",
    "birmingham",
    "road",
    "A46"
  ],
  [
    "london",
    "aylesbury",
    "road",
    "M40"
  ],
  [
    "aylesbury",
    "oxford",
    "road",
    "M40"
  ],
  [
    "oxford",
    "birmingham",
    "road",
    "M40"
  ],
  [
    "leicester",
    "lincoln",
    "road",
    "A46"
  ],
  [
    "worcester",
    "shrewsbury",
    "road",
    "A49"
  ],
  [
    "shrewsbury",
    "chester",
    "road",
    "A49"
  ],
  [
    "manchester",
    "chester",
    "road",
    "M56"
  ],
  [
    "chester",
    "mold",
    "road",
    "A55"
  ],
  [
    "mold",
    "caernarfon",
    "road",
    "A55"
  ],
  [
    "caernarfon",
    "holyhead",
    "road",
    "A55"
  ],
  [
    "carmarthen",
    "fishguard",
    "road",
    "A40"
  ],
  [
    "bristol",
    "cwmbran",
    "road",
    "M4"
  ],
  [
    "cwmbran",
    "cardiff",
    "road",
    "M4"
  ],
  [
    "cardiff",
    "pontypridd",
    "road",
    "M4"
  ],
  [
    "pontypridd",
    "swansea",
    "road",
    "M4"
  ],
  [
    "swansea",
    "carmarthen",
    "road",
    "M4"
  ],
  [
    "cardiff",
    "llandrindod",
    "road",
    "A470"
  ],
  [
    "llandrindod",
    "shrewsbury",
    "road",
    "A470"
  ],
  [
    "carlisle",
    "dumfries",
    "road",
    "A74"
  ],
  [
    "dumfries",
    "glasgow",
    "road",
    "A74"
  ],
  [
    "newcastle",
    "newtown",
    "road",
    "A68"
  ],
  [
    "newtown",
    "edinburgh",
    "road",
    "A68"
  ],
  [
    "edinburgh",
    "stirling",
    "road",
    "M8 / M9"
  ],
  [
    "stirling",
    "dundee",
    "road",
    "M8 / M9"
  ],
  [
    "dundee",
    "aberdeen",
    "road",
    "M8 / M9"
  ],
  [
    "aberdeen",
    "inverness",
    "road",
    "M8 / M9"
  ],
  [
    "edinburgh",
    "glenrothes",
    "road",
    "M90"
  ],
  [
    "glenrothes",
    "dundee",
    "road",
    "M90"
  ],
  [
    "edinburgh",
    "glasgow",
    "road",
    "M8"
  ],
  [
    "inverness",
    "kirkwall",
    "sea",
    "Scrabster–Stromness"
  ],
  [
    "aberdeen",
    "lerwick",
    "sea",
    "Aberdeen–Lerwick"
  ],
  [
    "inverness",
    "stornoway",
    "sea",
    "Ullapool–Stornoway"
  ],
  [
    "belfast",
    "larne",
    "road",
    "M1 / A1"
  ],
  [
    "belfast",
    "newry",
    "road",
    "A1"
  ],
  [
    "belfast",
    "armagh",
    "road",
    "A3"
  ],
  [
    "armagh",
    "omagh",
    "road",
    "A3"
  ],
  [
    "omagh",
    "enniskillen",
    "road",
    "A3"
  ],
  [
    "belfast",
    "derry",
    "road",
    "A6"
  ],
  [
    "derry",
    "omagh",
    "road",
    "A6"
  ],
  [
    "belfast",
    "downpatrick",
    "road",
    "A7"
  ],
  [
    "larne",
    "stranraer",
    "sea",
    "Larne–Stranraer"
  ],
  [
    "stranraer",
    "dumfries",
    "road",
    "A75"
  ],
  [
    "beverley",
    "hull",
    "road",
    "A1"
  ],
  [
    "derby",
    "barnsley",
    "road",
    "A61"
  ]
],
  officers: staff([
  {
    "id": "gb_pm",
    "name": "Helen Cartwright",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 22,
    "int": 78,
    "pol": 84,
    "chr": 70,
    "personality": "diplomat",
    "region": "gb.london",
    "bio": "Fictional head of government in Westminster. The defence reviews of the decade sit on her desk."
  },
  {
    "id": "gb_mod",
    "name": "Edmund Pryce",
    "title": "Secretary of State for Defence",
    "rank": "Secretary of State",
    "branch": "Ministry of Defence",
    "slot": "defense_minister",
    "war": 48,
    "int": 70,
    "pol": 62,
    "chr": 54,
    "personality": "cautious",
    "region": "gb.london",
    "bio": "Fictional defence secretary. Trident and the British Army of the Rhine are his brief."
  },
  {
    "id": "gb_cds",
    "name": "Alistair Fenwick",
    "title": "Chief of the Defence Staff",
    "rank": "Admiral of the Fleet",
    "branch": "Royal Navy",
    "slot": "chief_of_staff",
    "war": 72,
    "int": 68,
    "pol": 40,
    "chr": 48,
    "personality": "loyalist",
    "region": "gb.london",
    "bio": "Fictional CDS. Navy, Army, and Air Force report through him."
  },
  {
    "id": "gb_fleet",
    "name": "Clare Hocking",
    "title": "Commander-in-Chief Fleet",
    "rank": "Admiral",
    "branch": "Royal Navy",
    "slot": "front_commander",
    "war": 70,
    "int": 64,
    "pol": 28,
    "chr": 44,
    "personality": "aggressive",
    "region": "gb.portsmouth",
    "bio": "Fictional fleet commander at Portsmouth, with the North Atlantic as the wartime problem."
  },
  {
    "id": "gb_cgs",
    "name": "Edmund Harrow",
    "title": "Chief of the General Staff",
    "rank": "General",
    "branch": "British Army",
    "slot": "field_officer",
    "war": 74,
    "int": 60,
    "pol": 36,
    "chr": 42,
    "personality": "loyalist",
    "region": "gb.london",
    "bio": "Fictional CGS. BAOR in Germany is the army's main commitment."
  },
  {
    "id": "gb_scot",
    "name": "Fiona MacLeod",
    "title": "GOC Scotland",
    "rank": "Lieutenant General",
    "branch": "British Army",
    "slot": "field_officer",
    "war": 58,
    "int": 62,
    "pol": 44,
    "chr": 60,
    "personality": "diplomat",
    "region": "gb.edinburgh",
    "bio": "Fictional Scottish command, posted in Edinburgh."
  },
  {
    "id": "gb_ni",
    "name": "Patrick Devlin",
    "title": "GOC Northern Ireland",
    "rank": "Major General",
    "branch": "British Army",
    "slot": "field_officer",
    "war": 66,
    "int": 58,
    "pol": 30,
    "chr": 36,
    "personality": "cautious",
    "region": "gb.belfast",
    "bio": "Fictional commander for the Northern Ireland garrison. A political soldier, not a constable."
  },
  {
    "id": "gb_wales",
    "name": "Owen Griffiths",
    "title": "Wales District",
    "rank": "Brigadier",
    "branch": "British Army",
    "slot": "field_officer",
    "war": 52,
    "int": 54,
    "pol": 38,
    "chr": 58,
    "personality": "loyalist",
    "region": "gb.cardiff",
    "bio": "Fictional brigade commander for Wales, posted in Cardiff."
  },
  {
    "id": "gb_north",
    "name": "Ruth Calder",
    "title": "Flag Officer Scotland and Northern Ireland",
    "rank": "Rear Admiral",
    "branch": "Royal Navy",
    "slot": "field_officer",
    "war": 60,
    "int": 66,
    "pol": 34,
    "chr": 40,
    "personality": "merchant",
    "region": "gb.aberdeen",
    "bio": "Fictional admiral watching the North Sea oil ports."
  },
  {
    "id": "gb_mid",
    "name": "George Adey",
    "title": "West Midlands industry liaison",
    "rank": "Colonel",
    "branch": "British Army",
    "slot": "field_officer",
    "war": 40,
    "int": 58,
    "pol": 52,
    "chr": 48,
    "personality": "schemer",
    "region": "gb.birmingham",
    "bio": "Fictional staff colonel for the motor and metal towns."
  },
  {
    "id": "gb_west",
    "name": "Nancy Trethewey",
    "title": "Western fleet support",
    "rank": "Commodore",
    "branch": "Royal Navy",
    "slot": "field_officer",
    "war": 56,
    "int": 60,
    "pol": 32,
    "chr": 46,
    "personality": "cautious",
    "region": "gb.plymouth",
    "bio": "Fictional Devonport commodore."
  },
  {
    "id": "gb_channel",
    "name": "Hugh Pell",
    "title": "Channel ports",
    "rank": "Brigadier",
    "branch": "British Army",
    "slot": "field_officer",
    "war": 48,
    "int": 52,
    "pol": 36,
    "chr": 44,
    "personality": "loyalist",
    "region": "gb.dover",
    "bio": "Fictional brigadier for the Channel ferries. There is no tunnel yet."
  },
  {
    "id": "gb_northarmy",
    "name": "Ian Dobson",
    "title": "Northern Army District",
    "rank": "Major General",
    "branch": "British Army",
    "slot": "front_commander",
    "war": 64,
    "int": 56,
    "pol": 34,
    "chr": 40,
    "personality": "aggressive",
    "region": "gb.newcastle",
    "bio": "Fictional district commander from Tyne to the Tweed."
  },
  {
    "id": "gb_wool",
    "name": "Mary Hargreaves",
    "title": "Northeastern district",
    "rank": "Brigadier",
    "branch": "British Army",
    "slot": "field_officer",
    "war": 44,
    "int": 50,
    "pol": 42,
    "chr": 62,
    "personality": "diplomat",
    "region": "gb.leeds",
    "bio": "Fictional brigadier for the Yorkshire towns."
  }
]),
});
export const IRELAND_REGION = land({
  id: "ie",
  name: "Ireland",
  country: "IE",
  bbox: {"minLon": -11.1, "maxLon": -4.64, "minLat": 50.5, "maxLat": 56.23},
  notes: "Atlas only. The twenty-six counties of the Republic. County boroughs are not split off. Tipperary is still one county. Civilian government. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 1, "weather": 3}},
  biome: {},
  subs: [
  {
    "id": "IE-CW",
    "name": "Carlow",
    "kind": "county"
  },
  {
    "id": "IE-CN",
    "name": "Cavan",
    "kind": "county"
  },
  {
    "id": "IE-CE",
    "name": "Clare",
    "kind": "county"
  },
  {
    "id": "IE-CO",
    "name": "Cork",
    "kind": "county"
  },
  {
    "id": "IE-DL",
    "name": "Donegal",
    "kind": "county"
  },
  {
    "id": "IE-D",
    "name": "Dublin",
    "kind": "county"
  },
  {
    "id": "IE-G",
    "name": "Galway",
    "kind": "county"
  },
  {
    "id": "IE-KY",
    "name": "Kerry",
    "kind": "county"
  },
  {
    "id": "IE-KE",
    "name": "Kildare",
    "kind": "county"
  },
  {
    "id": "IE-KK",
    "name": "Kilkenny",
    "kind": "county"
  },
  {
    "id": "IE-LS",
    "name": "Laois",
    "kind": "county"
  },
  {
    "id": "IE-LM",
    "name": "Leitrim",
    "kind": "county"
  },
  {
    "id": "IE-LK",
    "name": "Limerick",
    "kind": "county"
  },
  {
    "id": "IE-LD",
    "name": "Longford",
    "kind": "county"
  },
  {
    "id": "IE-LH",
    "name": "Louth",
    "kind": "county"
  },
  {
    "id": "IE-MO",
    "name": "Mayo",
    "kind": "county"
  },
  {
    "id": "IE-MH",
    "name": "Meath",
    "kind": "county"
  },
  {
    "id": "IE-MN",
    "name": "Monaghan",
    "kind": "county"
  },
  {
    "id": "IE-OY",
    "name": "Offaly",
    "kind": "county"
  },
  {
    "id": "IE-RN",
    "name": "Roscommon",
    "kind": "county"
  },
  {
    "id": "IE-SO",
    "name": "Sligo",
    "kind": "county"
  },
  {
    "id": "IE-TA",
    "name": "Tipperary",
    "kind": "county"
  },
  {
    "id": "IE-WD",
    "name": "Waterford",
    "kind": "county"
  },
  {
    "id": "IE-WH",
    "name": "Westmeath",
    "kind": "county"
  },
  {
    "id": "IE-WX",
    "name": "Wexford",
    "kind": "county"
  },
  {
    "id": "IE-WW",
    "name": "Wicklow",
    "kind": "county"
  }
],
  cities: [
  [
    "carlow",
    "Carlow",
    "IE-CW",
    52.841,
    -6.926,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "cavan",
    "Cavan",
    "IE-CN",
    53.991,
    -7.361,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ennis",
    "Ennis",
    "IE-CE",
    52.846,
    -8.981,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "cork",
    "Cork",
    "IE-CO",
    51.898,
    -8.476,
    "capital",
    [
      "port",
      "autos"
    ]
  ],
  [
    "lifford",
    "Lifford",
    "IE-DL",
    54.832,
    -7.477,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "dublin",
    "Dublin",
    "IE-D",
    53.35,
    -6.26,
    "capital",
    [
      "administration",
      "port"
    ]
  ],
  [
    "galway",
    "Galway",
    "IE-G",
    53.27,
    -9.057,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "tralee",
    "Tralee",
    "IE-KY",
    52.271,
    -9.702,
    "capital",
    [
      "dairy"
    ]
  ],
  [
    "naas",
    "Naas",
    "IE-KE",
    53.216,
    -6.667,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kilkenny",
    "Kilkenny",
    "IE-KK",
    52.654,
    -7.244,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "portlaoise",
    "Portlaoise",
    "IE-LS",
    53.034,
    -7.3,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "carrick",
    "Carrick-on-Shannon",
    "IE-LM",
    53.946,
    -8.09,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "limerick",
    "Limerick",
    "IE-LK",
    52.664,
    -8.626,
    "capital",
    [
      "dairy"
    ]
  ],
  [
    "longford",
    "Longford",
    "IE-LD",
    53.727,
    -7.793,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "dundalk",
    "Dundalk",
    "IE-LH",
    54.004,
    -6.405,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "castlebar",
    "Castlebar",
    "IE-MO",
    53.856,
    -9.298,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "navan",
    "Navan",
    "IE-MH",
    53.653,
    -6.681,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "monaghan",
    "Monaghan",
    "IE-MN",
    54.249,
    -6.968,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "tullamore",
    "Tullamore",
    "IE-OY",
    53.274,
    -7.493,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "roscommon",
    "Roscommon",
    "IE-RN",
    53.628,
    -8.189,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "sligo",
    "Sligo",
    "IE-SO",
    54.277,
    -8.476,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "clonmel",
    "Clonmel",
    "IE-TA",
    52.355,
    -7.704,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "waterford",
    "Waterford",
    "IE-WD",
    52.259,
    -7.112,
    "capital",
    [
      "port"
    ]
  ],
  [
    "mullingar",
    "Mullingar",
    "IE-WH",
    53.526,
    -7.338,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "wexford",
    "Wexford",
    "IE-WX",
    52.337,
    -6.463,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "wicklow",
    "Wicklow",
    "IE-WW",
    52.981,
    -6.045,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "dublin",
    "wicklow",
    "road",
    "N11"
  ],
  [
    "wicklow",
    "wexford",
    "road",
    "N11"
  ],
  [
    "wexford",
    "waterford",
    "road",
    "N11"
  ],
  [
    "dublin",
    "naas",
    "road",
    "N7 / N8"
  ],
  [
    "naas",
    "portlaoise",
    "road",
    "N7 / N8"
  ],
  [
    "portlaoise",
    "kilkenny",
    "road",
    "N7 / N8"
  ],
  [
    "kilkenny",
    "clonmel",
    "road",
    "N7 / N8"
  ],
  [
    "clonmel",
    "cork",
    "road",
    "N7 / N8"
  ],
  [
    "kilkenny",
    "carlow",
    "road",
    "N9"
  ],
  [
    "carlow",
    "naas",
    "road",
    "N9"
  ],
  [
    "waterford",
    "cork",
    "road",
    "N25"
  ],
  [
    "cork",
    "tralee",
    "road",
    "N25"
  ],
  [
    "cork",
    "limerick",
    "road",
    "N20"
  ],
  [
    "limerick",
    "ennis",
    "road",
    "N20"
  ],
  [
    "ennis",
    "galway",
    "road",
    "N20"
  ],
  [
    "galway",
    "castlebar",
    "road",
    "N17"
  ],
  [
    "castlebar",
    "sligo",
    "road",
    "N17"
  ],
  [
    "sligo",
    "lifford",
    "road",
    "N15"
  ],
  [
    "dublin",
    "mullingar",
    "road",
    "N4"
  ],
  [
    "mullingar",
    "longford",
    "road",
    "N4"
  ],
  [
    "longford",
    "carrick",
    "road",
    "N4"
  ],
  [
    "carrick",
    "sligo",
    "road",
    "N4"
  ],
  [
    "dublin",
    "navan",
    "road",
    "N3"
  ],
  [
    "navan",
    "cavan",
    "road",
    "N3"
  ],
  [
    "cavan",
    "monaghan",
    "road",
    "N3"
  ],
  [
    "dublin",
    "dundalk",
    "road",
    "M1"
  ],
  [
    "cavan",
    "longford",
    "road",
    "N55"
  ],
  [
    "longford",
    "roscommon",
    "road",
    "N55"
  ],
  [
    "roscommon",
    "galway",
    "road",
    "N55"
  ],
  [
    "mullingar",
    "tullamore",
    "road",
    "N52"
  ],
  [
    "tullamore",
    "portlaoise",
    "road",
    "N52"
  ],
  [
    "tullamore",
    "roscommon",
    "road",
    "N62"
  ]
],
  officers: staff([
  {
    "id": "ie_taoiseach",
    "name": "Nuala Brennan",
    "title": "Taoiseach",
    "rank": "Taoiseach",
    "branch": "Government",
    "slot": "head_of_state",
    "war": 24,
    "int": 76,
    "pol": 80,
    "chr": 68,
    "personality": "diplomat",
    "region": "ie.dublin",
    "bio": "Fictional taoiseach. Ireland is neutral and civilian."
  },
  {
    "id": "ie_def",
    "name": "Cormac Daly",
    "title": "Minister for Defence",
    "rank": "Minister",
    "branch": "Department of Defence",
    "slot": "defense_minister",
    "war": 36,
    "int": 64,
    "pol": 58,
    "chr": 50,
    "personality": "cautious",
    "region": "ie.dublin",
    "bio": "Fictional defence minister. The Permanent Defence Force is small."
  },
  {
    "id": "ie_cos",
    "name": "Síle Ní Aodha",
    "title": "Chief of Staff",
    "rank": "Lieutenant General",
    "branch": "Defence Forces",
    "slot": "chief_of_staff",
    "war": 58,
    "int": 62,
    "pol": 34,
    "chr": 48,
    "personality": "loyalist",
    "region": "ie.dublin",
    "bio": "Fictional chief of staff of the Defence Forces."
  },
  {
    "id": "ie_south",
    "name": "Pádraig Ó Sé",
    "title": "Southern Command",
    "rank": "Colonel",
    "branch": "Army",
    "slot": "front_commander",
    "war": 52,
    "int": 50,
    "pol": 30,
    "chr": 44,
    "personality": "loyalist",
    "region": "ie.cork",
    "bio": "Fictional Southern Command in Cork."
  },
  {
    "id": "ie_east",
    "name": "Bríd Keane",
    "title": "Eastern Command",
    "rank": "Colonel",
    "branch": "Army",
    "slot": "field_officer",
    "war": 48,
    "int": 54,
    "pol": 36,
    "chr": 58,
    "personality": "diplomat",
    "region": "ie.dublin",
    "bio": "Fictional Eastern Command, posted in Dublin."
  },
  {
    "id": "ie_west",
    "name": "Máirtín Coyne",
    "title": "Western Command",
    "rank": "Colonel",
    "branch": "Army",
    "slot": "field_officer",
    "war": 50,
    "int": 48,
    "pol": 28,
    "chr": 46,
    "personality": "cautious",
    "region": "ie.galway",
    "bio": "Fictional Western Command in Galway."
  },
  {
    "id": "ie_dairy",
    "name": "Eileen Ruane",
    "title": "Curragh liaison",
    "rank": "Commandant",
    "branch": "Army",
    "slot": "field_officer",
    "war": 40,
    "int": 52,
    "pol": 32,
    "chr": 54,
    "personality": "merchant",
    "region": "ie.limerick",
    "bio": "Fictional staff officer for the midland garrisons."
  },
  {
    "id": "ie_border",
    "name": "Tomás Mac Gabhann",
    "title": "Border area",
    "rank": "Commandant",
    "branch": "Army",
    "slot": "field_officer",
    "war": 46,
    "int": 56,
    "pol": 26,
    "chr": 40,
    "personality": "cautious",
    "region": "ie.dundalk",
    "bio": "Fictional officer on the Dundalk side of the border. The crossing is a road, not a wall."
  }
]),
});
export const MAN_REGION = land({
  id: "im",
  name: "Isle of Man",
  country: "IM",
  bbox: {"minLon": -5.89, "maxLon": -3.09, "minLat": 52.75, "maxLat": 55.55},
  notes: "Atlas only. A Crown dependency, not part of the United Kingdom. Sea to Liverpool. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "IM-IM",
    "name": "Isle of Man",
    "kind": "dependency"
  }
],
  cities: [
  [
    "douglas",
    "Douglas",
    "IM-IM",
    54.152,
    -4.487,
    "capital",
    [
      "port",
      "fisheries"
    ]
  ]
],
  links: [],
  officers: staff([
  {
    "id": "im_gov",
    "name": "Edith Quayle",
    "title": "Lieutenant Governor",
    "rank": "Lieutenant Governor",
    "branch": "Crown",
    "slot": "head_of_state",
    "war": 20,
    "int": 60,
    "pol": 48,
    "chr": 55,
    "personality": "diplomat",
    "region": "im.douglas",
    "bio": "Fictional lieutenant governor. The island is not a UK county."
  },
  {
    "id": "im_field",
    "name": "Juan Kelly",
    "title": "Isle of Man Constabulary liaison",
    "rank": "Chief Inspector",
    "branch": "Constabulary",
    "slot": "field_officer",
    "war": 28,
    "int": 48,
    "pol": 30,
    "chr": 46,
    "personality": "loyalist",
    "region": "im.douglas",
    "bio": "Fictional police chief. There is no army on the island."
  }
]),
});
export const JERSEY_REGION = land({
  id: "je",
  name: "Jersey",
  country: "JE",
  bbox: {"minLon": -3.51, "maxLon": -0.71, "minLat": 47.79, "maxLat": 50.59},
  notes: "Atlas only. A Channel Island and Crown dependency. Bailiwick, not a UK county. Sea to Weymouth and to Saint-Malo. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "JE-JE",
    "name": "Jersey",
    "kind": "dependency"
  }
],
  cities: [
  [
    "saint_helier",
    "Saint Helier",
    "JE-JE",
    49.186,
    -2.107,
    "capital",
    [
      "port",
      "dairy"
    ]
  ]
],
  links: [],
  officers: staff([
  {
    "id": "je_bail",
    "name": "Margaretta Le Sueur",
    "title": "Bailiff",
    "rank": "Bailiff",
    "branch": "States of Jersey",
    "slot": "head_of_state",
    "war": 22,
    "int": 64,
    "pol": 58,
    "chr": 52,
    "personality": "diplomat",
    "region": "je.saint_helier",
    "bio": "Fictional bailiff. Jersey is a bailiwick, not a French department and not a UK county."
  },
  {
    "id": "je_field",
    "name": "Nicolas Hocquard",
    "title": "Royal Jersey Militia",
    "rank": "Major",
    "branch": "Militia",
    "slot": "field_officer",
    "war": 40,
    "int": 46,
    "pol": 28,
    "chr": 44,
    "personality": "loyalist",
    "region": "je.saint_helier",
    "bio": "Fictional militia major in Saint Helier."
  }
]),
});
export const GUERNSEY_REGION = land({
  id: "gg",
  name: "Guernsey",
  country: "GG",
  bbox: {"minLon": -3.94, "maxLon": -1.14, "minLat": 48.06, "maxLat": 50.86},
  notes: "Atlas only. A Channel Island and Crown dependency, with Alderney and Sark inside the bailiwick and not drawn apart. Sea to Weymouth. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "GG-GG",
    "name": "Guernsey",
    "kind": "dependency"
  }
],
  cities: [
  [
    "saint_peter_port",
    "Saint Peter Port",
    "GG-GG",
    49.456,
    -2.537,
    "capital",
    [
      "port",
      "dairy"
    ]
  ]
],
  links: [],
  officers: staff([
  {
    "id": "gg_bail",
    "name": "Rachel Martel",
    "title": "Bailiff",
    "rank": "Bailiff",
    "branch": "States of Guernsey",
    "slot": "head_of_state",
    "war": 20,
    "int": 62,
    "pol": 54,
    "chr": 58,
    "personality": "diplomat",
    "region": "gg.saint_peter_port",
    "bio": "Fictional bailiff of Guernsey."
  },
  {
    "id": "gg_field",
    "name": "Peter Le Page",
    "title": "Guernsey Militia",
    "rank": "Major",
    "branch": "Militia",
    "slot": "field_officer",
    "war": 38,
    "int": 44,
    "pol": 26,
    "chr": 42,
    "personality": "loyalist",
    "region": "gg.saint_peter_port",
    "bio": "Fictional militia major."
  }
]),
});
export const GIBRALTAR_REGION = land({
  id: "gi",
  name: "Gibraltar",
  country: "GI",
  bbox: {"minLon": -6.75, "maxLon": -3.95, "minLat": 34.74, "maxLat": 37.54},
  notes: "Atlas only. A British dependent territory. Spain reopened the land frontier in February 1985, so the road to La Línea is on this sheet. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "GI-GI",
    "name": "Gibraltar",
    "kind": "territory"
  }
],
  cities: [
  [
    "gibraltar",
    "Gibraltar",
    "GI-GI",
    36.14,
    -5.353,
    "capital",
    [
      "port",
      "administration"
    ]
  ]
],
  links: [],
  officers: staff([
  {
    "id": "gi_gov",
    "name": "Colin Ashworth",
    "title": "Governor",
    "rank": "Governor",
    "branch": "Colonial Office",
    "slot": "head_of_state",
    "war": 34,
    "int": 58,
    "pol": 46,
    "chr": 40,
    "personality": "loyalist",
    "region": "gi.gibraltar",
    "bio": "Fictional governor. Not a real officeholder of the decade."
  },
  {
    "id": "gi_rm",
    "name": "Sandra Pardo",
    "title": "Royal Marines detachment",
    "rank": "Major",
    "branch": "Royal Marines",
    "slot": "field_officer",
    "war": 56,
    "int": 48,
    "pol": 24,
    "chr": 42,
    "personality": "aggressive",
    "region": "gi.gibraltar",
    "bio": "Fictional Royal Marines major. The dockyard is still a naval place."
  }
]),
});
