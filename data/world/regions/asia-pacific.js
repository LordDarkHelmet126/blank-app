/** Australia, New Zealand, and the Pacific, 1985-89. Palau is still the Trust Territory. */
import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const AUSTRALIA_REGION = land({
  "id": "au",
  "name": "Australia",
  "country": "AU",
  "bbox": {
    "minLon": 96.08,
    "maxLon": 168.71,
    "minLat": -43.63,
    "maxLat": -9.67
  },
  "notes": "Atlas only. Six states, the Northern Territory, and the Australian Capital Territory, plus the inhabited external territories of Christmas Island, the Cocos (Keeling) Islands, and Norfolk Island. Antarctica, the Coral Sea Islands, Heard Island, and Ashmore are not drawn. Tasmania is a sea crossing; there is no bridge. The Indian Pacific and the east-coast trunks are rail and are not also roads. Iron is the Pilbara, uranium and copper are Olympic Dam, bauxite is Weipa. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "AU-NSW",
      "name": "New South Wales",
      "kind": "state",
      "group": null
    },
    {
      "id": "AU-VIC",
      "name": "Victoria",
      "kind": "state",
      "group": null
    },
    {
      "id": "AU-QLD",
      "name": "Queensland",
      "kind": "state",
      "group": null
    },
    {
      "id": "AU-SA",
      "name": "South Australia",
      "kind": "state",
      "group": null
    },
    {
      "id": "AU-WA",
      "name": "Western Australia",
      "kind": "state",
      "group": null
    },
    {
      "id": "AU-TAS",
      "name": "Tasmania",
      "kind": "state",
      "group": null
    },
    {
      "id": "AU-NT",
      "name": "Northern Territory",
      "kind": "territory",
      "group": null
    },
    {
      "id": "AU-ACT",
      "name": "Australian Capital Territory",
      "kind": "territory",
      "group": null
    },
    {
      "id": "AU-CX",
      "name": "Christmas Island",
      "kind": "territory",
      "group": null
    },
    {
      "id": "AU-CC",
      "name": "Cocos (Keeling) Islands",
      "kind": "territory",
      "group": null
    },
    {
      "id": "AU-NF",
      "name": "Norfolk Island",
      "kind": "territory",
      "group": null
    }
  ],
  "cities": [
    [
      "sydney",
      "Sydney",
      "AU-NSW",
      -33.87,
      151.21,
      "capital",
      [
        "port",
        "coal",
        "wheat"
      ]
    ],
    [
      "melbourne",
      "Melbourne",
      "AU-VIC",
      -37.81,
      144.96,
      "capital",
      [
        "port",
        "autos",
        "dairy"
      ]
    ],
    [
      "brisbane",
      "Brisbane",
      "AU-QLD",
      -27.47,
      153.03,
      "capital",
      [
        "port",
        "coal",
        "sugarcane"
      ]
    ],
    [
      "adelaide",
      "Adelaide",
      "AU-SA",
      -34.93,
      138.6,
      "capital",
      [
        "wheat",
        "grapes"
      ]
    ],
    [
      "perth",
      "Perth",
      "AU-WA",
      -31.95,
      115.86,
      "capital",
      [
        "port",
        "gold",
        "wheat"
      ]
    ],
    [
      "hobart",
      "Hobart",
      "AU-TAS",
      -42.88,
      147.33,
      "capital",
      [
        "hydro",
        "zinc",
        "timber"
      ]
    ],
    [
      "darwin",
      "Darwin",
      "AU-NT",
      -12.46,
      130.84,
      "capital",
      [
        "uranium",
        "cattle",
        "port"
      ]
    ],
    [
      "canberra",
      "Canberra",
      "AU-ACT",
      -35.28,
      149.13,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "christmas",
      "Flying Fish Cove",
      "AU-CX",
      -10.42,
      105.68,
      "capital",
      [
        "phosphate"
      ]
    ],
    [
      "cocos",
      "West Island",
      "AU-CC",
      -12.19,
      96.83,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "norfolk",
      "Kingston",
      "AU-NF",
      -29.05,
      167.96,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "newcastle",
      "Newcastle",
      "AU-NSW",
      -32.93,
      151.78,
      "city",
      [
        "coal",
        "steel"
      ]
    ],
    [
      "cairns",
      "Cairns",
      "AU-QLD",
      -16.92,
      145.77,
      "city",
      [
        "sugarcane",
        "port"
      ]
    ],
    [
      "mount_isa",
      "Mount Isa",
      "AU-QLD",
      -20.73,
      139.49,
      "city",
      [
        "copper",
        "lead",
        "zinc"
      ]
    ],
    [
      "weipa",
      "Weipa",
      "AU-QLD",
      -12.63,
      141.88,
      "city",
      [
        "bauxite"
      ]
    ],
    [
      "roxby",
      "Roxby Downs",
      "AU-SA",
      -30.44,
      136.88,
      "city",
      [
        "uranium",
        "copper"
      ]
    ],
    [
      "kalgoorlie",
      "Kalgoorlie",
      "AU-WA",
      -30.75,
      121.47,
      "city",
      [
        "gold"
      ]
    ],
    [
      "port_hedland",
      "Port Hedland",
      "AU-WA",
      -20.31,
      118.58,
      "city",
      [
        "iron",
        "port"
      ]
    ],
    [
      "alice",
      "Alice Springs",
      "AU-NT",
      -23.7,
      133.88,
      "city",
      [
        "cattle"
      ]
    ]
  ],
  "links": [
    [
      "brisbane",
      "sydney",
      "rail",
      "East coast"
    ],
    [
      "sydney",
      "melbourne",
      "rail",
      "East coast"
    ],
    [
      "melbourne",
      "adelaide",
      "rail",
      "East coast"
    ],
    [
      "adelaide",
      "kalgoorlie",
      "rail",
      "Indian Pacific"
    ],
    [
      "kalgoorlie",
      "perth",
      "rail",
      "Indian Pacific"
    ],
    [
      "melbourne",
      "hobart",
      "sea",
      "Bass Strait"
    ],
    [
      "perth",
      "christmas",
      "sea",
      "Indian Ocean"
    ],
    [
      "christmas",
      "cocos",
      "sea",
      "Indian Ocean"
    ],
    [
      "brisbane",
      "norfolk",
      "sea",
      "Tasman Sea"
    ],
    [
      "sydney",
      "newcastle",
      "road",
      "National road"
    ],
    [
      "sydney",
      "canberra",
      "road",
      "National road"
    ],
    [
      "adelaide",
      "roxby",
      "road",
      "National road"
    ],
    [
      "cairns",
      "weipa",
      "road",
      "National road"
    ],
    [
      "mount_isa",
      "alice",
      "road",
      "National road"
    ],
    [
      "cairns",
      "mount_isa",
      "road",
      "National road"
    ],
    [
      "roxby",
      "alice",
      "road",
      "National road"
    ],
    [
      "kalgoorlie",
      "port_hedland",
      "road",
      "National road"
    ],
    [
      "darwin",
      "weipa",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "au_0",
    "name": "Malcolm Barrett",
    "title": "Head of state",
    "rank": "General",
    "branch": "Australian Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "au.sydney"
  },
  {
    "id": "au_1",
    "name": "Malcolm Cooper",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Australian Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "au.melbourne"
  },
  {
    "id": "au_2",
    "name": "Malcolm Walsh",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Australian Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "au.brisbane"
  },
  {
    "id": "au_3",
    "name": "Malcolm Murray",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Australian Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "au.adelaide"
  },
  {
    "id": "au_4",
    "name": "Malcolm Bennett",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Australian Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "au.perth"
  },
  {
    "id": "au_5",
    "name": "Malcolm Doyle",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Australian Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "au.hobart"
  }
])
});

export const NEW_ZEALAND_REGION = land({
  "id": "nz",
  "name": "New Zealand",
  "country": "NZ",
  "bbox": {
    "minLon": -177.31,
    "maxLon": 178.77,
    "minLat": -47.16,
    "maxLat": -34.98
  },
  "notes": "Atlas only. The regional councils created in November 1989. Before that the tier was counties and boroughs. Nelson-Marlborough is still one region; it splits in 1992. The Chatham Islands are a sea-linked territory, so the country box crosses the date line. Wool, dairy, timber, hydro, coal, gold, aluminum, gas, fisheries, and a port. Occupied and off the week-0 march.",
  "defaultBiome": "temperate",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "NZ-NL",
      "name": "Northland",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-AK",
      "name": "Auckland",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-WK",
      "name": "Waikato",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-BP",
      "name": "Bay of Plenty",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-GI",
      "name": "Gisborne",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-HB",
      "name": "Hawke's Bay",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-TK",
      "name": "Taranaki",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-MW",
      "name": "Manawatu-Wanganui",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-WG",
      "name": "Wellington",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-NM",
      "name": "Nelson-Marlborough",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-WC",
      "name": "West Coast",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-CA",
      "name": "Canterbury",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-OT",
      "name": "Otago",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-SL",
      "name": "Southland",
      "kind": "region",
      "group": null
    },
    {
      "id": "NZ-CI",
      "name": "Chatham Islands",
      "kind": "territory",
      "group": null
    }
  ],
  "cities": [
    [
      "whangarei",
      "Whangarei",
      "NZ-NL",
      -35.73,
      174.32,
      "capital",
      [
        "timber",
        "dairy"
      ]
    ],
    [
      "auckland",
      "Auckland",
      "NZ-AK",
      -36.85,
      174.76,
      "capital",
      [
        "port",
        "administration"
      ]
    ],
    [
      "hamilton",
      "Hamilton",
      "NZ-WK",
      -37.79,
      175.28,
      "capital",
      [
        "dairy"
      ]
    ],
    [
      "tauranga",
      "Tauranga",
      "NZ-BP",
      -37.69,
      176.17,
      "capital",
      [
        "port",
        "timber"
      ]
    ],
    [
      "gisborne",
      "Gisborne",
      "NZ-GI",
      -38.66,
      178.02,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "napier",
      "Napier",
      "NZ-HB",
      -39.49,
      176.91,
      "capital",
      [
        "apples",
        "wool"
      ]
    ],
    [
      "new_plymouth",
      "New Plymouth",
      "NZ-TK",
      -39.06,
      174.08,
      "capital",
      [
        "natural_gas",
        "dairy"
      ]
    ],
    [
      "palmerston",
      "Palmerston North",
      "NZ-MW",
      -40.35,
      175.61,
      "capital",
      [
        "wool",
        "dairy"
      ]
    ],
    [
      "wellington",
      "Wellington",
      "NZ-WG",
      -41.29,
      174.78,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "nelson",
      "Nelson",
      "NZ-NM",
      -41.27,
      173.28,
      "capital",
      [
        "fisheries",
        "grapes"
      ]
    ],
    [
      "greymouth",
      "Greymouth",
      "NZ-WC",
      -42.45,
      171.21,
      "capital",
      [
        "coal",
        "gold"
      ]
    ],
    [
      "christchurch",
      "Christchurch",
      "NZ-CA",
      -43.53,
      172.64,
      "capital",
      [
        "wheat",
        "dairy",
        "port"
      ]
    ],
    [
      "dunedin",
      "Dunedin",
      "NZ-OT",
      -45.87,
      170.5,
      "capital",
      [
        "wool",
        "gold",
        "port"
      ]
    ],
    [
      "invercargill",
      "Invercargill",
      "NZ-SL",
      -46.41,
      168.35,
      "capital",
      [
        "aluminum",
        "dairy",
        "wool"
      ]
    ],
    [
      "waitangi",
      "Waitangi",
      "NZ-CI",
      -43.95,
      -176.56,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "wellington",
      "nelson",
      "sea",
      "Cook Strait"
    ],
    [
      "christchurch",
      "waitangi",
      "sea",
      "Chatham rise"
    ],
    [
      "hamilton",
      "tauranga",
      "road",
      "National road"
    ],
    [
      "auckland",
      "hamilton",
      "road",
      "National road"
    ],
    [
      "whangarei",
      "auckland",
      "road",
      "National road"
    ],
    [
      "palmerston",
      "wellington",
      "road",
      "National road"
    ],
    [
      "gisborne",
      "napier",
      "road",
      "National road"
    ],
    [
      "napier",
      "palmerston",
      "road",
      "National road"
    ],
    [
      "hamilton",
      "new_plymouth",
      "road",
      "National road"
    ],
    [
      "tauranga",
      "napier",
      "road",
      "National road"
    ],
    [
      "greymouth",
      "christchurch",
      "road",
      "National road"
    ],
    [
      "dunedin",
      "invercargill",
      "road",
      "National road"
    ],
    [
      "nelson",
      "christchurch",
      "road",
      "National road"
    ],
    [
      "christchurch",
      "dunedin",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "nz_0",
    "name": "Graeme Bennett",
    "title": "Head of state",
    "rank": "General",
    "branch": "New Zealand Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nz.whangarei"
  },
  {
    "id": "nz_1",
    "name": "Graeme MacLeod",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "New Zealand Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nz.auckland"
  },
  {
    "id": "nz_2",
    "name": "Graeme Reid",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "New Zealand Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nz.hamilton"
  },
  {
    "id": "nz_3",
    "name": "Graeme Sutherland",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "New Zealand Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nz.tauranga"
  },
  {
    "id": "nz_4",
    "name": "Graeme Cameron",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "New Zealand Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nz.gisborne"
  },
  {
    "id": "nz_5",
    "name": "Graeme Blake",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "New Zealand Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nz.napier"
  }
])
});

export const FIJI_REGION = land({
  "id": "fj",
  "name": "Fiji",
  "country": "FJ",
  "bbox": {
    "minLon": 176.3,
    "maxLon": 180.12,
    "minLat": -18.89,
    "maxLat": -11.75
  },
  "notes": "Atlas only. Four divisions plus Rotuma. The 1987 coups are noted and the country stays one state. Sugar and gold. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "FJ-CE",
      "name": "Central",
      "kind": "division",
      "group": null
    },
    {
      "id": "FJ-WE",
      "name": "Western",
      "kind": "division",
      "group": null
    },
    {
      "id": "FJ-NO",
      "name": "Northern",
      "kind": "division",
      "group": null
    },
    {
      "id": "FJ-EA",
      "name": "Eastern",
      "kind": "division",
      "group": null
    },
    {
      "id": "FJ-RO",
      "name": "Rotuma",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "suva",
      "Suva",
      "FJ-CE",
      -18.14,
      178.44,
      "capital",
      [
        "administration",
        "sugarcane",
        "port"
      ]
    ],
    [
      "lautoka",
      "Lautoka",
      "FJ-WE",
      -17.62,
      177.45,
      "capital",
      [
        "sugarcane",
        "gold"
      ]
    ],
    [
      "labasa",
      "Labasa",
      "FJ-NO",
      -16.43,
      179.37,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "levuka",
      "Levuka",
      "FJ-EA",
      -17.68,
      178.83,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ahau",
      "Ahau",
      "FJ-RO",
      -12.5,
      177.05,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "suva",
      "labasa",
      "sea",
      "Fijian waters"
    ],
    [
      "suva",
      "levuka",
      "sea",
      "Fijian waters"
    ],
    [
      "suva",
      "ahau",
      "sea",
      "Fijian waters"
    ],
    [
      "suva",
      "lautoka",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "fj_0",
    "name": "Jone Rokotuivuna",
    "title": "Head of state",
    "rank": "General",
    "branch": "Royal Fiji Military Forces",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "fj.suva"
  },
  {
    "id": "fj_1",
    "name": "Jone Naisara",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Royal Fiji Military Forces",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "fj.lautoka"
  },
  {
    "id": "fj_2",
    "name": "Jone Vueti",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Royal Fiji Military Forces",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "fj.labasa"
  }
])
});

export const SOLOMON_ISLANDS_REGION = land({
  "id": "sb",
  "name": "Solomon Islands",
  "country": "SB",
  "bbox": {
    "minLon": 156.09,
    "maxLon": 166.58,
    "minLat": -11.48,
    "maxLat": -7.35
  },
  "notes": "Atlas only. The 1980s provinces plus Honiara. Guadalcanal is seated at Aola so Honiara can be the capital territory. Timber, fisheries, and cocoa. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "SB-HO",
      "name": "Honiara",
      "kind": "division",
      "group": null
    },
    {
      "id": "SB-GU",
      "name": "Guadalcanal",
      "kind": "division",
      "group": null
    },
    {
      "id": "SB-WE",
      "name": "Western",
      "kind": "division",
      "group": null
    },
    {
      "id": "SB-IS",
      "name": "Isabel",
      "kind": "division",
      "group": null
    },
    {
      "id": "SB-CE",
      "name": "Central",
      "kind": "division",
      "group": null
    },
    {
      "id": "SB-ML",
      "name": "Malaita",
      "kind": "division",
      "group": null
    },
    {
      "id": "SB-MK",
      "name": "Makira-Ulawa",
      "kind": "division",
      "group": null
    },
    {
      "id": "SB-TE",
      "name": "Temotu",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "honiara",
      "Honiara",
      "SB-HO",
      -9.43,
      159.95,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "aola",
      "Aola",
      "SB-GU",
      -9.55,
      160.5,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "gizo",
      "Gizo",
      "SB-WE",
      -8.1,
      156.84,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "buala",
      "Buala",
      "SB-IS",
      -8.14,
      159.59,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "tulagi",
      "Tulagi",
      "SB-CE",
      -9.1,
      160.15,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "auki",
      "Auki",
      "SB-ML",
      -8.77,
      160.7,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "kirakira",
      "Kirakira",
      "SB-MK",
      -10.45,
      161.92,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "lata",
      "Lata",
      "SB-TE",
      -10.73,
      165.83,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "honiara",
      "gizo",
      "sea",
      "Solomon Sea"
    ],
    [
      "honiara",
      "buala",
      "sea",
      "Solomon Sea"
    ],
    [
      "honiara",
      "tulagi",
      "sea",
      "Solomon Sea"
    ],
    [
      "honiara",
      "auki",
      "sea",
      "Solomon Sea"
    ],
    [
      "honiara",
      "kirakira",
      "sea",
      "Solomon Sea"
    ],
    [
      "honiara",
      "lata",
      "sea",
      "Solomon Sea"
    ],
    [
      "honiara",
      "aola",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "sb_0",
    "name": "Francis Maelaua",
    "title": "Head of state",
    "rank": "General",
    "branch": "Royal Solomon Islands Police Force",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sb.honiara"
  },
  {
    "id": "sb_1",
    "name": "Francis Kuper",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Royal Solomon Islands Police Force",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sb.aola"
  },
  {
    "id": "sb_2",
    "name": "Francis Tosika",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Royal Solomon Islands Police Force",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sb.gizo"
  },
  {
    "id": "sb_3",
    "name": "Francis Lilo",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Royal Solomon Islands Police Force",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sb.buala"
  },
  {
    "id": "sb_4",
    "name": "Francis Hou",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Royal Solomon Islands Police Force",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sb.tulagi"
  }
])
});

export const VANUATU_REGION = land({
  "id": "vu",
  "name": "Vanuatu",
  "country": "VU",
  "bbox": {
    "minLon": 166.43,
    "maxLon": 170.02,
    "minLat": -20.29,
    "maxLat": -13.13
  },
  "notes": "Atlas only. Independent from 1980. The six provinces were formalized in 1994, so this sheet uses the 1980s island councils: Efate, Santo, Tanna, Malekula, Pentecost, and the Banks and Torres. Copra is not a separate yield. Fisheries and cocoa. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "VU-EF",
      "name": "Efate",
      "kind": "island",
      "group": null
    },
    {
      "id": "VU-SN",
      "name": "Santo",
      "kind": "island",
      "group": null
    },
    {
      "id": "VU-TA",
      "name": "Tanna",
      "kind": "island",
      "group": null
    },
    {
      "id": "VU-MK",
      "name": "Malekula",
      "kind": "island",
      "group": null
    },
    {
      "id": "VU-PE",
      "name": "Pentecost",
      "kind": "island",
      "group": null
    },
    {
      "id": "VU-BT",
      "name": "Banks and Torres",
      "kind": "island",
      "group": null
    }
  ],
  "cities": [
    [
      "port_vila",
      "Port Vila",
      "VU-EF",
      -17.73,
      168.32,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "luganville",
      "Luganville",
      "VU-SN",
      -15.52,
      167.18,
      "capital",
      [
        "cocoa",
        "cattle"
      ]
    ],
    [
      "isangel",
      "Isangel",
      "VU-TA",
      -19.54,
      169.27,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "lakatoro",
      "Lakatoro",
      "VU-MK",
      -16.1,
      167.42,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "lonorore",
      "Lonorore",
      "VU-PE",
      -15.76,
      168.18,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "sola",
      "Sola",
      "VU-BT",
      -13.88,
      167.55,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "port_vila",
      "luganville",
      "sea",
      "Vanuatu waters"
    ],
    [
      "port_vila",
      "isangel",
      "sea",
      "Vanuatu waters"
    ],
    [
      "port_vila",
      "lakatoro",
      "sea",
      "Vanuatu waters"
    ],
    [
      "port_vila",
      "lonorore",
      "sea",
      "Vanuatu waters"
    ],
    [
      "luganville",
      "sola",
      "sea",
      "Vanuatu waters"
    ]
  ],
  "officers": staff([
  {
    "id": "vu_0",
    "name": "Kalpoi Matai",
    "title": "Head of state",
    "rank": "General",
    "branch": "Vanuatu Mobile Force",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "vu.port_vila"
  },
  {
    "id": "vu_1",
    "name": "Kalpoi Kalsakau",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Vanuatu Mobile Force",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "vu.luganville"
  },
  {
    "id": "vu_2",
    "name": "Kalpoi Bule",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Vanuatu Mobile Force",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "vu.isangel"
  }
])
});

export const TONGA_REGION = land({
  "id": "to",
  "name": "Tonga",
  "country": "TO",
  "bbox": {
    "minLon": -175.95,
    "maxLon": -173.05,
    "minLat": -22.13,
    "maxLat": -15.2
  },
  "notes": "Atlas only. Five divisions, linked by sea. Fisheries. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "TO-TT",
      "name": "Tongatapu",
      "kind": "division",
      "group": null
    },
    {
      "id": "TO-VV",
      "name": "Vava'u",
      "kind": "division",
      "group": null
    },
    {
      "id": "TO-HP",
      "name": "Ha'apai",
      "kind": "division",
      "group": null
    },
    {
      "id": "TO-EU",
      "name": "'Eua",
      "kind": "division",
      "group": null
    },
    {
      "id": "TO-NI",
      "name": "Niuas",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "nukualofa",
      "Nuku'alofa",
      "TO-TT",
      -21.13,
      -175.2,
      "capital",
      [
        "administration",
        "fisheries"
      ]
    ],
    [
      "neiafu",
      "Neiafu",
      "TO-VV",
      -18.65,
      -173.98,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "pangai",
      "Pangai",
      "TO-HP",
      -19.81,
      -174.35,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "eua",
      "'Eua",
      "TO-EU",
      -21.38,
      -174.93,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "hihifo",
      "Hihifo",
      "TO-NI",
      -15.95,
      -173.8,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "nukualofa",
      "neiafu",
      "sea",
      "Tongan waters"
    ],
    [
      "nukualofa",
      "pangai",
      "sea",
      "Tongan waters"
    ],
    [
      "nukualofa",
      "eua",
      "sea",
      "Tongan waters"
    ],
    [
      "neiafu",
      "hihifo",
      "sea",
      "Tongan waters"
    ]
  ],
  "officers": staff([
  {
    "id": "to_0",
    "name": "Sione Tupou",
    "title": "Head of state",
    "rank": "General",
    "branch": "Tonga Defence Services",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "to.nukualofa"
  },
  {
    "id": "to_1",
    "name": "Sione Fakatava",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Tonga Defence Services",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "to.neiafu"
  },
  {
    "id": "to_2",
    "name": "Sione Manu",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Tonga Defence Services",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "to.pangai"
  }
])
});

export const WESTERN_SAMOA_REGION = land({
  "id": "wsm",
  "name": "Western Samoa",
  "country": "WS",
  "bbox": {
    "minLon": -173.38,
    "maxLon": -170.77,
    "minLat": -14.7,
    "maxLat": -12.47
  },
  "notes": "Atlas only. The name is Western Samoa; the later name Samoa is 1997. Eleven traditional districts. Upolu and Savai'i are separate road groups with a sea between them. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "WS-TU",
      "name": "Tuamasaga",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-AA",
      "name": "A'ana",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-AI",
      "name": "Aiga-i-le-Tai",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-AT",
      "name": "Atua",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-VF",
      "name": "Va'a-o-Fonoti",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-FA",
      "name": "Fa'asaleleaga",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-GE",
      "name": "Gaga'emauga",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-GF",
      "name": "Gagaifomauga",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-VS",
      "name": "Vaisigano",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-SP",
      "name": "Satupa'itea",
      "kind": "division",
      "group": null
    },
    {
      "id": "WS-PA",
      "name": "Palauli",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "apia",
      "Apia",
      "WS-TU",
      -13.83,
      -171.77,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "leulumoega",
      "Leulumoega",
      "WS-AA",
      -13.82,
      -171.96,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "mulifanua",
      "Mulifanua",
      "WS-AI",
      -13.83,
      -172.04,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "lufilufi",
      "Lufilufi",
      "WS-AT",
      -13.85,
      -171.58,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "samamea",
      "Samamea",
      "WS-VF",
      -13.95,
      -171.52,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "safotulafai",
      "Safotulafai",
      "WS-FA",
      -13.67,
      -172.4,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "saleaula",
      "Saleaula",
      "WS-GE",
      -13.45,
      -172.33,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "aopo",
      "Aopo",
      "WS-GF",
      -13.44,
      -172.55,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "asau",
      "Asau",
      "WS-VS",
      -13.22,
      -172.5,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "satupaitea",
      "Satupa'itea",
      "WS-SP",
      -13.75,
      -172.63,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "vailoa",
      "Vailoa",
      "WS-PA",
      -13.73,
      -172.3,
      "capital",
      [
        "cocoa"
      ]
    ]
  ],
  "links": [
    [
      "apia",
      "safotulafai",
      "sea",
      "Apolima Strait"
    ],
    [
      "leulumoega",
      "mulifanua",
      "road",
      "National road"
    ],
    [
      "lufilufi",
      "samamea",
      "road",
      "National road"
    ],
    [
      "apia",
      "leulumoega",
      "road",
      "National road"
    ],
    [
      "apia",
      "lufilufi",
      "road",
      "National road"
    ],
    [
      "safotulafai",
      "vailoa",
      "road",
      "National road"
    ],
    [
      "saleaula",
      "aopo",
      "road",
      "National road"
    ],
    [
      "aopo",
      "asau",
      "road",
      "National road"
    ],
    [
      "safotulafai",
      "saleaula",
      "road",
      "National road"
    ],
    [
      "safotulafai",
      "satupaitea",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "wsm_0",
    "name": "Tupuola Efi",
    "title": "Head of state",
    "rank": "General",
    "branch": "Western Samoa Police",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "wsm.apia"
  },
  {
    "id": "wsm_1",
    "name": "Tupuola Toleafoa",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Western Samoa Police",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "wsm.leulumoega"
  },
  {
    "id": "wsm_2",
    "name": "Tupuola Sailele",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Western Samoa Police",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "wsm.mulifanua"
  },
  {
    "id": "wsm_3",
    "name": "Tupuola Mataafa",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Western Samoa Police",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "wsm.lufilufi"
  },
  {
    "id": "wsm_4",
    "name": "Tupuola Alesana",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Western Samoa Police",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "wsm.samamea"
  }
])
});

export const KIRIBATI_REGION = land({
  "id": "ki",
  "name": "Kiribati",
  "country": "KI",
  "bbox": {
    "minLon": -172.43,
    "maxLon": 173.75,
    "minLat": -3.55,
    "maxLat": 2.74
  },
  "notes": "Atlas only. Three groups: the Gilberts at Tarawa, the Phoenix Islands at Kanton, and the Line Islands at Kiritimati. Kiritimati stays east of the date line, so the country box is wide and the sea lanes take the short arc. Fisheries. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "KI-GI",
      "name": "Gilbert Islands",
      "kind": "group",
      "group": null
    },
    {
      "id": "KI-PH",
      "name": "Phoenix Islands",
      "kind": "group",
      "group": null
    },
    {
      "id": "KI-LI",
      "name": "Line Islands",
      "kind": "group",
      "group": null
    }
  ],
  "cities": [
    [
      "tarawa",
      "Tarawa",
      "KI-GI",
      1.33,
      173.0,
      "capital",
      [
        "administration",
        "fisheries"
      ]
    ],
    [
      "kanton",
      "Kanton",
      "KI-PH",
      -2.8,
      -171.68,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "kiritimati",
      "Kiritimati",
      "KI-LI",
      1.99,
      -157.48,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "tarawa",
      "kanton",
      "sea",
      "Kiribati waters"
    ],
    [
      "kanton",
      "kiritimati",
      "sea",
      "Kiribati waters"
    ]
  ],
  "officers": staff([
  {
    "id": "ki_0",
    "name": "Ieremia Tito",
    "title": "Head of state",
    "rank": "General",
    "branch": "Kiribati Police",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ki.tarawa"
  },
  {
    "id": "ki_1",
    "name": "Ieremia Tong",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Kiribati Police",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ki.kanton"
  },
  {
    "id": "ki_2",
    "name": "Ieremia Bakaiea",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Kiribati Police",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ki.kiritimati"
  }
])
});

export const TUVALU_REGION = land({
  "id": "tv",
  "name": "Tuvalu",
  "country": "TV",
  "bbox": {
    "minLon": 175.37,
    "maxLon": 180.6,
    "minLat": -10.13,
    "maxLat": -4.92
  },
  "notes": "Atlas only. Eight island councils, linked by sea. Fisheries. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "TV-FN",
      "name": "Funafuti",
      "kind": "division",
      "group": null
    },
    {
      "id": "TV-NM",
      "name": "Nanumea",
      "kind": "division",
      "group": null
    },
    {
      "id": "TV-NG",
      "name": "Nanumanga",
      "kind": "division",
      "group": null
    },
    {
      "id": "TV-NT",
      "name": "Niutao",
      "kind": "division",
      "group": null
    },
    {
      "id": "TV-NU",
      "name": "Nui",
      "kind": "division",
      "group": null
    },
    {
      "id": "TV-VT",
      "name": "Vaitupu",
      "kind": "division",
      "group": null
    },
    {
      "id": "TV-NF",
      "name": "Nukufetau",
      "kind": "division",
      "group": null
    },
    {
      "id": "TV-NL",
      "name": "Nukulaelae",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "funafuti",
      "Funafuti",
      "TV-FN",
      -8.52,
      179.2,
      "capital",
      [
        "administration",
        "fisheries"
      ]
    ],
    [
      "nanumea",
      "Nanumea",
      "TV-NM",
      -5.67,
      176.12,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "nanumanga",
      "Nanumanga",
      "TV-NG",
      -6.29,
      176.32,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "niutao",
      "Niutao",
      "TV-NT",
      -6.11,
      177.34,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "nui",
      "Nui",
      "TV-NU",
      -7.22,
      177.16,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "vaitupu",
      "Vaitupu",
      "TV-VT",
      -7.48,
      178.68,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "nukufetau",
      "Nukufetau",
      "TV-NF",
      -8.03,
      178.31,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "nukulaelae",
      "Nukulaelae",
      "TV-NL",
      -9.38,
      179.85,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "funafuti",
      "nanumea",
      "sea",
      "Tuvalu waters"
    ],
    [
      "nanumea",
      "nanumanga",
      "sea",
      "Tuvalu waters"
    ],
    [
      "nanumanga",
      "niutao",
      "sea",
      "Tuvalu waters"
    ],
    [
      "niutao",
      "nui",
      "sea",
      "Tuvalu waters"
    ],
    [
      "nui",
      "vaitupu",
      "sea",
      "Tuvalu waters"
    ],
    [
      "vaitupu",
      "nukufetau",
      "sea",
      "Tuvalu waters"
    ],
    [
      "nukufetau",
      "nukulaelae",
      "sea",
      "Tuvalu waters"
    ]
  ],
  "officers": staff([
  {
    "id": "tv_0",
    "name": "Toaripi Lauti",
    "title": "Head of state",
    "rank": "General",
    "branch": "Tuvalu Police",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tv.funafuti"
  },
  {
    "id": "tv_1",
    "name": "Toaripi Paeniu",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Tuvalu Police",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tv.nanumea"
  },
  {
    "id": "tv_2",
    "name": "Toaripi Sopoaga",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Tuvalu Police",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tv.nanumanga"
  },
  {
    "id": "tv_3",
    "name": "Toaripi Talake",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Tuvalu Police",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tv.niutao"
  },
  {
    "id": "tv_4",
    "name": "Toaripi Ielemia",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Tuvalu Police",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tv.nui"
  }
])
});

export const NAURU_REGION = land({
  "id": "nr",
  "name": "Nauru",
  "country": "NR",
  "bbox": {
    "minLon": 166.17,
    "maxLon": 167.67,
    "minLat": -1.3,
    "maxLat": 0.2
  },
  "notes": "Atlas only. One island. Phosphate. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "NR-NR",
      "name": "Nauru",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "yaren",
      "Yaren",
      "NR-NR",
      -0.55,
      166.92,
      "capital",
      [
        "phosphate",
        "administration"
      ]
    ]
  ],
  "links": [],
  "officers": staff([
  {
    "id": "nr_0",
    "name": "Hammer Clodumar",
    "title": "Head of state",
    "rank": "General",
    "branch": "Nauru Police",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nr.yaren"
  },
  {
    "id": "nr_1",
    "name": "Hammer Harris",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Nauru Police",
    "slot": "field_officer",
    "war": 64,
    "int": 43,
    "pol": 37,
    "chr": 37,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nr.yaren"
  }
])
});

export const GUAM_REGION = land({
  "id": "gu",
  "name": "Guam",
  "country": "GU",
  "bbox": {
    "minLon": 144.0,
    "maxLon": 145.5,
    "minLat": 12.73,
    "maxLat": 14.23
  },
  "notes": "Atlas only. US unincorporated territory, not a US state and not inside the US atlas region. Andersen and the naval station are marked in the notes. Sea lanes run to Honolulu, the Aleutians, and Manila. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "GU-GU",
      "name": "Guam",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "hagatna",
      "Hagatna",
      "GU-GU",
      13.48,
      144.75,
      "capital",
      [
        "port",
        "administration"
      ]
    ]
  ],
  "links": [],
  "officers": staff([
  {
    "id": "gu_0",
    "name": "Antonio Cruz",
    "title": "Head of state",
    "rank": "General",
    "branch": "Guam National Guard",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "gu.hagatna"
  },
  {
    "id": "gu_1",
    "name": "Antonio Santos",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Guam National Guard",
    "slot": "field_officer",
    "war": 64,
    "int": 43,
    "pol": 37,
    "chr": 37,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "gu.hagatna"
  }
])
});

export const NORTHERN_MARIANAS_REGION = land({
  "id": "mp",
  "name": "Northern Mariana Islands",
  "country": "MP",
  "bbox": {
    "minLon": 144.46,
    "maxLon": 146.5,
    "minLat": 13.4,
    "maxLat": 15.93
  },
  "notes": "Atlas only. A commonwealth from 1986, formerly part of the Trust Territory of the Pacific Islands. Saipan, Tinian, and Rota, linked by sea. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "MP-SA",
      "name": "Saipan",
      "kind": "division",
      "group": null
    },
    {
      "id": "MP-TI",
      "name": "Tinian",
      "kind": "division",
      "group": null
    },
    {
      "id": "MP-RO",
      "name": "Rota",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "saipan",
      "Saipan",
      "MP-SA",
      15.18,
      145.75,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "tinian",
      "Tinian",
      "MP-TI",
      15.0,
      145.63,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "rota",
      "Rota",
      "MP-RO",
      14.15,
      145.21,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "saipan",
      "tinian",
      "sea",
      "Marianas channel"
    ],
    [
      "saipan",
      "rota",
      "sea",
      "Marianas channel"
    ]
  ],
  "officers": staff([
  {
    "id": "mp_0",
    "name": "Pedro Tenorio",
    "title": "Head of state",
    "rank": "General",
    "branch": "Commonwealth government",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mp.saipan"
  },
  {
    "id": "mp_1",
    "name": "Pedro Cabrera",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Commonwealth government",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mp.tinian"
  },
  {
    "id": "mp_2",
    "name": "Pedro Sablan",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Commonwealth government",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mp.rota"
  }
])
});

export const MICRONESIA_REGION = land({
  "id": "fm",
  "name": "Federated States of Micronesia",
  "country": "FM",
  "bbox": {
    "minLon": 137.38,
    "maxLon": 163.75,
    "minLat": 4.57,
    "maxLat": 10.26
  },
  "notes": "Atlas only. Four states. The Compact of Free Association is 1986; before that these were the Trust Territory of the Pacific Islands. Fisheries. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "FM-YA",
      "name": "Yap",
      "kind": "division",
      "group": null
    },
    {
      "id": "FM-CH",
      "name": "Chuuk",
      "kind": "division",
      "group": null
    },
    {
      "id": "FM-PO",
      "name": "Pohnpei",
      "kind": "division",
      "group": null
    },
    {
      "id": "FM-KO",
      "name": "Kosrae",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "yap",
      "Yap",
      "FM-YA",
      9.51,
      138.13,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "chuuk",
      "Chuuk",
      "FM-CH",
      7.45,
      151.85,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "pohnpei",
      "Pohnpei",
      "FM-PO",
      6.92,
      158.16,
      "capital",
      [
        "administration",
        "fisheries"
      ]
    ],
    [
      "kosrae",
      "Kosrae",
      "FM-KO",
      5.32,
      163.0,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "yap",
      "chuuk",
      "sea",
      "Micronesian waters"
    ],
    [
      "chuuk",
      "pohnpei",
      "sea",
      "Micronesian waters"
    ],
    [
      "pohnpei",
      "kosrae",
      "sea",
      "Micronesian waters"
    ]
  ],
  "officers": staff([
  {
    "id": "fm_0",
    "name": "John Haglelgam",
    "title": "Head of state",
    "rank": "General",
    "branch": "National Police",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "fm.yap"
  },
  {
    "id": "fm_1",
    "name": "John Falcam",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "National Police",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "fm.chuuk"
  },
  {
    "id": "fm_2",
    "name": "John Olter",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "National Police",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "fm.pohnpei"
  }
])
});

export const MARSHALL_ISLANDS_REGION = land({
  "id": "mh",
  "name": "Marshall Islands",
  "country": "MH",
  "bbox": {
    "minLon": 166.98,
    "maxLon": 172.13,
    "minLat": 5.17,
    "maxLat": 10.2
  },
  "notes": "Atlas only. The Compact of Free Association is 1986; before that these were the Trust Territory of the Pacific Islands. Majuro is the capital. Kwajalein is marked as a US missile range and stays Marshallese, not a US country. The other atoll municipalities are not each a pin. Fisheries. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "MH-MJ",
      "name": "Majuro",
      "kind": "division",
      "group": null
    },
    {
      "id": "MH-KW",
      "name": "Kwajalein",
      "kind": "division",
      "group": "US missile range"
    },
    {
      "id": "MH-JA",
      "name": "Jaluit",
      "kind": "division",
      "group": null
    },
    {
      "id": "MH-WJ",
      "name": "Wotje",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "majuro",
      "Majuro",
      "MH-MJ",
      7.09,
      171.38,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "kwajalein",
      "Kwajalein",
      "MH-KW",
      8.72,
      167.73,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "jaluit",
      "Jaluit",
      "MH-JA",
      5.92,
      169.64,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "wotje",
      "Wotje",
      "MH-WJ",
      9.45,
      170.23,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "majuro",
      "kwajalein",
      "sea",
      "Marshallese waters"
    ],
    [
      "majuro",
      "jaluit",
      "sea",
      "Marshallese waters"
    ],
    [
      "majuro",
      "wotje",
      "sea",
      "Marshallese waters"
    ]
  ],
  "officers": staff([
  {
    "id": "mh_0",
    "name": "Amata Lemari",
    "title": "Head of state",
    "rank": "General",
    "branch": "Sea Patrol",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mh.majuro"
  },
  {
    "id": "mh_1",
    "name": "Amata DeBrum",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Sea Patrol",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mh.kwajalein"
  },
  {
    "id": "mh_2",
    "name": "Amata Tomeing",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Sea Patrol",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mh.jaluit"
  }
])
});

export const PALAU_REGION = land({
  "id": "pw",
  "name": "Palau",
  "country": "PW",
  "bbox": {
    "minLon": 130.37,
    "maxLon": 135.47,
    "minLat": 2.25,
    "maxLat": 8.83
  },
  "notes": "Atlas only. Still the Trust Territory of the Pacific Islands through 1989; the compact is 1994. Sixteen states. Babeldaob and Koror share roads; the Koror-Babeldaob bridge opened in 1977. Hatohobei and Sonsorol are reached by sea. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "PW-AM",
      "name": "Aimeliik",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-AR",
      "name": "Airai",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-KY",
      "name": "Kayangel",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-ME",
      "name": "Melekeok",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-ND",
      "name": "Ngaraard",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-NL",
      "name": "Ngarchelong",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-NM",
      "name": "Ngardmau",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-NP",
      "name": "Ngatpang",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-NC",
      "name": "Ngchesar",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-NR",
      "name": "Ngeremlengui",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-NW",
      "name": "Ngiwal",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-KO",
      "name": "Koror",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-AN",
      "name": "Angaur",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-PE",
      "name": "Peleliu",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-HA",
      "name": "Hatohobei",
      "kind": "state",
      "group": null
    },
    {
      "id": "PW-SO",
      "name": "Sonsorol",
      "kind": "state",
      "group": null
    }
  ],
  "cities": [
    [
      "aimeliik",
      "Aimeliik",
      "PW-AM",
      7.44,
      134.48,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "airai",
      "Airai",
      "PW-AR",
      7.37,
      134.55,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "kayangel",
      "Kayangel",
      "PW-KY",
      8.08,
      134.72,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "melekeok",
      "Melekeok",
      "PW-ME",
      7.5,
      134.62,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ngaraard",
      "Ngaraard",
      "PW-ND",
      7.62,
      134.64,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ngarchelong",
      "Ngarchelong",
      "PW-NL",
      7.7,
      134.63,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ngardmau",
      "Ngardmau",
      "PW-NM",
      7.61,
      134.56,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ngatpang",
      "Ngatpang",
      "PW-NP",
      7.47,
      134.52,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ngchesar",
      "Ngchesar",
      "PW-NC",
      7.47,
      134.61,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ngeremlengui",
      "Ngeremlengui",
      "PW-NR",
      7.53,
      134.54,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ngiwal",
      "Ngiwal",
      "PW-NW",
      7.56,
      134.64,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "koror",
      "Koror",
      "PW-KO",
      7.34,
      134.48,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "angaur",
      "Angaur",
      "PW-AN",
      6.91,
      134.14,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "peleliu",
      "Peleliu",
      "PW-PE",
      7.01,
      134.25,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "hatohobei",
      "Hatohobei",
      "PW-HA",
      3.0,
      131.12,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "sonsorol",
      "Sonsorol",
      "PW-SO",
      5.33,
      132.22,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "koror",
      "angaur",
      "sea",
      "Palauan waters"
    ],
    [
      "koror",
      "peleliu",
      "sea",
      "Palauan waters"
    ],
    [
      "koror",
      "hatohobei",
      "sea",
      "Palauan waters"
    ],
    [
      "koror",
      "sonsorol",
      "sea",
      "Palauan waters"
    ],
    [
      "melekeok",
      "ngchesar",
      "road",
      "National road"
    ],
    [
      "aimeliik",
      "ngatpang",
      "road",
      "National road"
    ],
    [
      "ngaraard",
      "ngiwal",
      "road",
      "National road"
    ],
    [
      "melekeok",
      "ngiwal",
      "road",
      "National road"
    ],
    [
      "ngatpang",
      "ngeremlengui",
      "road",
      "National road"
    ],
    [
      "airai",
      "koror",
      "road",
      "National road"
    ],
    [
      "ngaraard",
      "ngardmau",
      "road",
      "National road"
    ],
    [
      "ngaraard",
      "ngarchelong",
      "road",
      "National road"
    ],
    [
      "ngardmau",
      "ngeremlengui",
      "road",
      "National road"
    ],
    [
      "aimeliik",
      "airai",
      "road",
      "National road"
    ],
    [
      "kayangel",
      "ngarchelong",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "pw_0",
    "name": "Kuniwo Nakamura",
    "title": "Head of state",
    "rank": "General",
    "branch": "Trust Territory administration",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pw.aimeliik"
  },
  {
    "id": "pw_1",
    "name": "Kuniwo Remeliik",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Trust Territory administration",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pw.airai"
  },
  {
    "id": "pw_2",
    "name": "Kuniwo Etpison",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Trust Territory administration",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pw.kayangel"
  },
  {
    "id": "pw_3",
    "name": "Kuniwo Oiterong",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Trust Territory administration",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pw.melekeok"
  },
  {
    "id": "pw_4",
    "name": "Kuniwo Salii",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Trust Territory administration",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pw.ngaraard"
  },
  {
    "id": "pw_5",
    "name": "Kuniwo Toribiong",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Trust Territory administration",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pw.ngarchelong"
  }
])
});

export const AMERICAN_SAMOA_REGION = land({
  "id": "as",
  "name": "American Samoa",
  "country": "AS",
  "bbox": {
    "minLon": -171.83,
    "maxLon": -168.76,
    "minLat": -15.09,
    "maxLat": -10.31
  },
  "notes": "Atlas only. US territory. Eastern District, Western District, Manu'a, and Swains. Rose Atoll is uninhabited and is not drawn. Longitudes stay west of the date line. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "AS-EA",
      "name": "Eastern",
      "kind": "division",
      "group": null
    },
    {
      "id": "AS-WE",
      "name": "Western",
      "kind": "division",
      "group": null
    },
    {
      "id": "AS-MA",
      "name": "Manu'a",
      "kind": "division",
      "group": null
    },
    {
      "id": "AS-SW",
      "name": "Swains",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "pago_pago",
      "Pago Pago",
      "AS-EA",
      -14.28,
      -170.7,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "leone",
      "Leone",
      "AS-WE",
      -14.34,
      -170.78,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "tau",
      "Ta'u",
      "AS-MA",
      -14.23,
      -169.51,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "swains",
      "Swains Island",
      "AS-SW",
      -11.06,
      -171.08,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "pago_pago",
      "tau",
      "sea",
      "Samoan waters"
    ],
    [
      "pago_pago",
      "swains",
      "sea",
      "Samoan waters"
    ],
    [
      "pago_pago",
      "leone",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "as_0",
    "name": "Peter Coleman",
    "title": "Head of state",
    "rank": "General",
    "branch": "American Samoa government",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "as.pago_pago"
  },
  {
    "id": "as_1",
    "name": "Peter Sunia",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "American Samoa government",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "as.leone"
  },
  {
    "id": "as_2",
    "name": "Peter Tulafono",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "American Samoa government",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "as.tau"
  }
])
});

export const FRENCH_POLYNESIA_REGION = land({
  "id": "pf",
  "name": "French Polynesia",
  "country": "PF",
  "bbox": {
    "minLon": -152.19,
    "maxLon": -139.35,
    "minLat": -24.1,
    "maxLat": -8.16
  },
  "notes": "Atlas only. French territory, not merged into France. Five subdivisions: the Windward Islands, the Leeward Islands, the Tuamotu-Gambier, the Marquesas, and the Austral Islands. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "PF-WI",
      "name": "Windward Islands",
      "kind": "division",
      "group": null
    },
    {
      "id": "PF-LE",
      "name": "Leeward Islands",
      "kind": "division",
      "group": null
    },
    {
      "id": "PF-TG",
      "name": "Tuamotu-Gambier",
      "kind": "division",
      "group": null
    },
    {
      "id": "PF-MQ",
      "name": "Marquesas",
      "kind": "division",
      "group": null
    },
    {
      "id": "PF-AU",
      "name": "Austral Islands",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "papeete",
      "Papeete",
      "PF-WI",
      -17.53,
      -149.57,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "uturoa",
      "Uturoa",
      "PF-LE",
      -16.73,
      -151.44,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "rangiroa",
      "Rangiroa",
      "PF-TG",
      -15.0,
      -147.66,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "taiohae",
      "Taiohae",
      "PF-MQ",
      -8.91,
      -140.1,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "mataura",
      "Mataura",
      "PF-AU",
      -23.35,
      -149.48,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "papeete",
      "uturoa",
      "sea",
      "French Polynesian waters"
    ],
    [
      "papeete",
      "rangiroa",
      "sea",
      "French Polynesian waters"
    ],
    [
      "papeete",
      "taiohae",
      "sea",
      "French Polynesian waters"
    ],
    [
      "papeete",
      "mataura",
      "sea",
      "French Polynesian waters"
    ]
  ],
  "officers": staff([
  {
    "id": "pf_0",
    "name": "Gaston Leontieff",
    "title": "Head of state",
    "rank": "General",
    "branch": "French administration",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pf.papeete"
  },
  {
    "id": "pf_1",
    "name": "Gaston Temaru",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "French administration",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pf.uturoa"
  },
  {
    "id": "pf_2",
    "name": "Gaston Fritch",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "French administration",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pf.rangiroa"
  }
])
});

export const NEW_CALEDONIA_REGION = land({
  "id": "ncl",
  "name": "New Caledonia",
  "country": "NCL",
  "bbox": {
    "minLon": 164.11,
    "maxLon": 167.98,
    "minLat": -23.03,
    "maxLat": -20.17
  },
  "notes": "Atlas only. French territory. Not Northern Cyprus. The three provinces date from the Matignon process of 1988-89; before that the first level was the municipalities. Nickel. The Loyalty Islands are reached by sea. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "NCL-SU",
      "name": "Sud",
      "kind": "province",
      "group": null
    },
    {
      "id": "NCL-NO",
      "name": "Nord",
      "kind": "province",
      "group": null
    },
    {
      "id": "NCL-IL",
      "name": "Iles Loyaute",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "noumea",
      "Noumea",
      "NCL-SU",
      -22.28,
      166.46,
      "capital",
      [
        "nickel",
        "port",
        "administration"
      ]
    ],
    [
      "kone",
      "Kone",
      "NCL-NO",
      -21.06,
      164.86,
      "capital",
      [
        "nickel"
      ]
    ],
    [
      "lifou",
      "Lifou",
      "NCL-IL",
      -20.92,
      167.23,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "noumea",
      "lifou",
      "sea",
      "Coral Sea"
    ],
    [
      "noumea",
      "kone",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "ncl_0",
    "name": "Jacques Lemoine",
    "title": "Head of state",
    "rank": "General",
    "branch": "French administration",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ncl.noumea"
  },
  {
    "id": "ncl_1",
    "name": "Jacques Frogier",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "French administration",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ncl.kone"
  },
  {
    "id": "ncl_2",
    "name": "Jacques Martin",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "French administration",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ncl.lifou"
  }
])
});

export const COOK_ISLANDS_REGION = land({
  "id": "ck",
  "name": "Cook Islands",
  "country": "CK",
  "bbox": {
    "minLon": -166.59,
    "maxLon": -156.6,
    "minLat": -22.67,
    "maxLat": -8.25
  },
  "notes": "Atlas only. Self-governing in free association with New Zealand. The inhabited islands are pinned; Nassau and Suwarrow are omitted. Fisheries. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "CK-RA",
      "name": "Rarotonga",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-AI",
      "name": "Aitutaki",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-AT",
      "name": "Atiu",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-MG",
      "name": "Mangaia",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-MK",
      "name": "Mauke",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-MI",
      "name": "Mitiaro",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-PM",
      "name": "Palmerston",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-PU",
      "name": "Pukapuka",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-MH",
      "name": "Manihiki",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-RK",
      "name": "Rakahanga",
      "kind": "division",
      "group": null
    },
    {
      "id": "CK-PE",
      "name": "Penrhyn",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "rarotonga",
      "Avarua",
      "CK-RA",
      -21.21,
      -159.78,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "aitutaki",
      "Aitutaki",
      "CK-AI",
      -18.86,
      -159.79,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "atiu",
      "Atiu",
      "CK-AT",
      -20.0,
      -158.12,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "mangaia",
      "Mangaia",
      "CK-MG",
      -21.92,
      -157.95,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "mauke",
      "Mauke",
      "CK-MK",
      -20.16,
      -157.35,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "mitiaro",
      "Mitiaro",
      "CK-MI",
      -19.87,
      -157.7,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "palmerston",
      "Palmerston",
      "CK-PM",
      -18.05,
      -163.17,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "pukapuka",
      "Pukapuka",
      "CK-PU",
      -10.85,
      -165.84,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "manihiki",
      "Manihiki",
      "CK-MH",
      -10.43,
      -161.0,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "rakahanga",
      "Rakahanga",
      "CK-RK",
      -10.03,
      -161.09,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "penrhyn",
      "Penrhyn",
      "CK-PE",
      -9.0,
      -158.05,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "rarotonga",
      "aitutaki",
      "sea",
      "Cook Islands waters"
    ],
    [
      "rarotonga",
      "atiu",
      "sea",
      "Cook Islands waters"
    ],
    [
      "rarotonga",
      "mangaia",
      "sea",
      "Cook Islands waters"
    ],
    [
      "rarotonga",
      "mauke",
      "sea",
      "Cook Islands waters"
    ],
    [
      "rarotonga",
      "mitiaro",
      "sea",
      "Cook Islands waters"
    ],
    [
      "rarotonga",
      "palmerston",
      "sea",
      "Cook Islands waters"
    ],
    [
      "rarotonga",
      "pukapuka",
      "sea",
      "Cook Islands waters"
    ],
    [
      "pukapuka",
      "manihiki",
      "sea",
      "Cook Islands waters"
    ],
    [
      "manihiki",
      "rakahanga",
      "sea",
      "Cook Islands waters"
    ],
    [
      "rarotonga",
      "penrhyn",
      "sea",
      "Cook Islands waters"
    ]
  ],
  "officers": staff([
  {
    "id": "ck_0",
    "name": "Tom Davis",
    "title": "Head of state",
    "rank": "General",
    "branch": "Cook Islands Police",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ck.rarotonga"
  },
  {
    "id": "ck_1",
    "name": "Tom Henry",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Cook Islands Police",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ck.aitutaki"
  },
  {
    "id": "ck_2",
    "name": "Tom Robati",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Cook Islands Police",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ck.atiu"
  },
  {
    "id": "ck_3",
    "name": "Tom Akaruru",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Cook Islands Police",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ck.mangaia"
  },
  {
    "id": "ck_4",
    "name": "Tom Woonton",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Cook Islands Police",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ck.mauke"
  }
])
});

export const NIUE_REGION = land({
  "id": "nu",
  "name": "Niue",
  "country": "NU",
  "bbox": {
    "minLon": -170.67,
    "maxLon": -169.17,
    "minLat": -19.81,
    "maxLat": -18.31
  },
  "notes": "Atlas only. Self-governing in free association with New Zealand. One island. Not Nicaragua. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "NU-NU",
      "name": "Niue",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "alofi",
      "Alofi",
      "NU-NU",
      -19.06,
      -169.92,
      "capital",
      [
        "administration",
        "fisheries"
      ]
    ]
  ],
  "links": [],
  "officers": staff([
  {
    "id": "nu_0",
    "name": "Young Vivian",
    "title": "Head of state",
    "rank": "General",
    "branch": "Niue Police",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nu.alofi"
  },
  {
    "id": "nu_1",
    "name": "Young Lui",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Niue Police",
    "slot": "field_officer",
    "war": 64,
    "int": 43,
    "pol": 37,
    "chr": 37,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "nu.alofi"
  }
])
});

export const TOKELAU_REGION = land({
  "id": "tk",
  "name": "Tokelau",
  "country": "TK",
  "bbox": {
    "minLon": -173.25,
    "maxLon": -170.5,
    "minLat": -10.13,
    "maxLat": -7.8
  },
  "notes": "Atlas only. A New Zealand territory. Three atolls, linked by sea. Not Tajikistan. Fisheries. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "TK-AT",
      "name": "Atafu",
      "kind": "division",
      "group": null
    },
    {
      "id": "TK-NK",
      "name": "Nukunonu",
      "kind": "division",
      "group": null
    },
    {
      "id": "TK-FA",
      "name": "Fakaofo",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "atafu",
      "Atafu",
      "TK-AT",
      -8.55,
      -172.5,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "nukunonu",
      "Nukunonu",
      "TK-NK",
      -9.17,
      -171.82,
      "capital",
      [
        "administration",
        "fisheries"
      ]
    ],
    [
      "fakaofo",
      "Fakaofo",
      "TK-FA",
      -9.38,
      -171.25,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "atafu",
      "nukunonu",
      "sea",
      "Tokelau waters"
    ],
    [
      "nukunonu",
      "fakaofo",
      "sea",
      "Tokelau waters"
    ]
  ],
  "officers": staff([
  {
    "id": "tk_0",
    "name": "Kuresa Nasau",
    "title": "Head of state",
    "rank": "General",
    "branch": "Tokelau administration",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tk.atafu"
  },
  {
    "id": "tk_1",
    "name": "Kuresa Teao",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Tokelau administration",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tk.nukunonu"
  },
  {
    "id": "tk_2",
    "name": "Kuresa Lui",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Tokelau administration",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tk.fakaofo"
  }
])
});

export const WALLIS_AND_FUTUNA_REGION = land({
  "id": "wf",
  "name": "Wallis and Futuna",
  "country": "WF",
  "bbox": {
    "minLon": -178.91,
    "maxLon": -175.42,
    "minLat": -15.06,
    "maxLat": -12.53
  },
  "notes": "Atlas only. French territory. Three kingdoms: Uvea, Alo, and Sigave. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "WF-UV",
      "name": "Uvea",
      "kind": "division",
      "group": null
    },
    {
      "id": "WF-AL",
      "name": "Alo",
      "kind": "division",
      "group": null
    },
    {
      "id": "WF-SI",
      "name": "Sigave",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "mata_utu",
      "Mata-Utu",
      "WF-UV",
      -13.28,
      -176.17,
      "capital",
      [
        "administration",
        "fisheries"
      ]
    ],
    [
      "alo",
      "Alo",
      "WF-AL",
      -14.31,
      -178.11,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "sigave",
      "Sigave",
      "WF-SI",
      -14.29,
      -178.16,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "mata_utu",
      "alo",
      "sea",
      "Wallis channel"
    ],
    [
      "alo",
      "sigave",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "wf_0",
    "name": "Setefano Hanisi",
    "title": "Head of state",
    "rank": "General",
    "branch": "French administration",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "wf.mata_utu"
  },
  {
    "id": "wf_1",
    "name": "Setefano Malia",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "French administration",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "wf.alo"
  },
  {
    "id": "wf_2",
    "name": "Setefano Tialetagi",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "French administration",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "wf.sigave"
  }
])
});

export const PITCAIRN_REGION = land({
  "id": "pn",
  "name": "Pitcairn Islands",
  "country": "PN",
  "bbox": {
    "minLon": -130.85,
    "maxLon": -129.35,
    "minLat": -25.82,
    "maxLat": -24.32
  },
  "notes": "Atlas only. British territory. One inhabited island, Adamstown. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "PN-PN",
      "name": "Pitcairn",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "adamstown",
      "Adamstown",
      "PN-PN",
      -25.07,
      -130.1,
      "capital",
      [
        "fisheries",
        "administration"
      ]
    ]
  ],
  "links": [],
  "officers": staff([
  {
    "id": "pn_0",
    "name": "Brian Young",
    "title": "Head of state",
    "rank": "General",
    "branch": "Island Council",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pn.adamstown"
  },
  {
    "id": "pn_1",
    "name": "Brian Warren",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Island Council",
    "slot": "field_officer",
    "war": 64,
    "int": 43,
    "pol": 37,
    "chr": 37,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "pn.adamstown"
  }
])
});
