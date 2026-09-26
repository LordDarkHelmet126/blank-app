import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const GEORGIA_SSR_REGION = land({
  "id": "ge",
  "name": "Georgian SSR",
  "country": "GE",
  "bbox": {
    "minLon": 39.52,
    "maxLon": 46.49,
    "minLat": 40.05,
    "maxLat": 44.5
  },
  "notes": "Atlas only. The Abkhaz ASSR, the Adjar ASSR, and the South Ossetian autonomous oblast, plus Georgia proper. The republic was not divided into oblasts; raions are not pinned. The Military Road arrives from Ordzhonikidze. Occupied and off the week-0 march.",
  "defaultBiome": "temperate",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "GE-TB",
      "name": "Georgia",
      "kind": "republic",
      "group": "Georgian SSR"
    },
    {
      "id": "GE-AB",
      "name": "Abkhaz ASSR",
      "kind": "assr",
      "group": "Georgian SSR"
    },
    {
      "id": "GE-AJ",
      "name": "Adjar ASSR",
      "kind": "assr",
      "group": "Georgian SSR"
    },
    {
      "id": "GE-SO",
      "name": "South Ossetian AO",
      "kind": "autonomous_oblast",
      "group": "Georgian SSR"
    }
  ],
  "cities": [
    [
      "tbilisi",
      "Tbilisi",
      "GE-TB",
      41.69,
      44.83,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sukhumi",
      "Sukhumi",
      "GE-AB",
      43.0,
      41.02,
      "capital",
      [
        "port"
      ]
    ],
    [
      "batumi",
      "Batumi",
      "GE-AJ",
      41.62,
      41.64,
      "capital",
      [
        "port"
      ]
    ],
    [
      "tskhinvali",
      "Tskhinvali",
      "GE-SO",
      42.23,
      43.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kutaisi",
      "Kutaisi",
      "GE-TB",
      42.27,
      42.7,
      "city",
      [
        "autos"
      ]
    ],
    [
      "rustavi",
      "Rustavi",
      "GE-TB",
      41.55,
      44.99,
      "city",
      [
        "steel"
      ]
    ]
  ],
  "links": [
    [
      "batumi",
      "sukhumi",
      "road",
      "local road"
    ],
    [
      "batumi",
      "tbilisi",
      "road",
      "Black Sea highway"
    ],
    [
      "batumi",
      "tskhinvali",
      "road",
      "local road"
    ],
    [
      "kutaisi",
      "tbilisi",
      "road",
      "local road"
    ],
    [
      "rustavi",
      "tbilisi",
      "road",
      "local road"
    ],
    [
      "sukhumi",
      "tbilisi",
      "road",
      "Black Sea highway"
    ],
    [
      "tbilisi",
      "tskhinvali",
      "road",
      "Ossetian road"
    ]
  ]
,
  officers: staff([
  {
    "id": "ge_head",
    "name": "Nino Beridze",
    "title": "Chairman of the Georgian Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 40,
    "int": 66,
    "pol": 68,
    "chr": 52,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "ge.tbilisi"
  },
  {
    "id": "ge_def",
    "name": "Giorgi Kapanadze",
    "title": "Transcaucasus Military District",
    "rank": "General-leytenant",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 66,
    "int": 60,
    "pol": 40,
    "chr": 42,
    "personality": "cautious",
    "bio": "Fictional defense minister.",
    "region": "ge.tbilisi"
  },
  {
    "id": "ge_field",
    "name": "Levan Abashidze",
    "title": "Tbilisi garrison",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 58,
    "int": 56,
    "pol": 36,
    "chr": 40,
    "personality": "loyalist",
    "bio": "Fictional field officer.",
    "region": "ge.tbilisi"
  }
])
});
export const ARMENIA_REGION = land({
  "id": "am",
  "name": "Armenian SSR",
  "country": "AM",
  "bbox": {
    "minLon": 42.35,
    "maxLon": 46.01,
    "minLat": 38.68,
    "maxLat": 42.31
  },
  "notes": "Atlas only. No oblasts. Leninakan and Kirovakan keep those names. Raions are not pinned. Occupied and off the week-0 march.",
  "defaultBiome": "continental",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "AM-ER",
      "name": "Armenia",
      "kind": "republic",
      "group": "Armenian SSR"
    }
  ],
  "cities": [
    [
      "yerevan",
      "Yerevan",
      "AM-ER",
      40.18,
      44.51,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "leninakan",
      "Leninakan",
      "AM-ER",
      40.79,
      43.85,
      "city",
      [
        "administration"
      ]
    ],
    [
      "kirovakan",
      "Kirovakan",
      "AM-ER",
      40.81,
      44.49,
      "city",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "kirovakan",
      "yerevan",
      "road",
      "local road"
    ],
    [
      "leninakan",
      "yerevan",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "am_head",
    "name": "Anahit Petrosyan",
    "title": "Chairman of the Armenian Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 38,
    "int": 68,
    "pol": 66,
    "chr": 54,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "am.yerevan"
  },
  {
    "id": "am_def",
    "name": "Armen Hakobyan",
    "title": "Yerevan garrison",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 60,
    "int": 58,
    "pol": 40,
    "chr": 42,
    "personality": "loyalist",
    "bio": "Fictional defense minister.",
    "region": "am.yerevan"
  },
  {
    "id": "am_field",
    "name": "Vardan Sargsyan",
    "title": "Leninakan sector",
    "rank": "Kapitan",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 56,
    "int": 54,
    "pol": 38,
    "chr": 36,
    "personality": "ambitious",
    "bio": "Fictional field officer.",
    "region": "am.yerevan"
  }
])
});
export const AZERBAIJAN_REGION = land({
  "id": "az",
  "name": "Azerbaijan SSR",
  "country": "AZ",
  "bbox": {
    "minLon": 43.91,
    "maxLon": 51.37,
    "minLat": 37.71,
    "maxLat": 42.18
  },
  "notes": "Atlas only. Azerbaijan proper, the Nakhichevan ASSR, and the Nagorno-Karabakh autonomous oblast. Nakhichevan is an exclave, linked by air because the land route leaves the republic. Kirovabad has not been renamed Ganja. Occupied and off the week-0 march.",
  "defaultBiome": "continental",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "AZ-BA",
      "name": "Azerbaijan",
      "kind": "republic",
      "group": "Azerbaijan SSR"
    },
    {
      "id": "AZ-NX",
      "name": "Nakhichevan ASSR",
      "kind": "assr",
      "group": "Azerbaijan SSR"
    },
    {
      "id": "AZ-NK",
      "name": "Nagorno-Karabakh AO",
      "kind": "autonomous_oblast",
      "group": "Azerbaijan SSR"
    }
  ],
  "cities": [
    [
      "baku",
      "Baku",
      "AZ-BA",
      40.41,
      49.87,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "nakhichevan",
      "Nakhichevan",
      "AZ-NX",
      39.21,
      45.41,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "stepanakert",
      "Stepanakert",
      "AZ-NK",
      39.82,
      46.75,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kirovabad",
      "Kirovabad",
      "AZ-BA",
      40.68,
      46.36,
      "city",
      [
        "administration"
      ]
    ],
    [
      "sumgait",
      "Sumgait",
      "AZ-BA",
      40.59,
      49.67,
      "city",
      [
        "steel"
      ]
    ]
  ],
  "links": [
    [
      "baku",
      "kirovabad",
      "road",
      "local road"
    ],
    [
      "baku",
      "nakhichevan",
      "air",
      "Baku–Nakhichevan flight"
    ],
    [
      "baku",
      "stepanakert",
      "road",
      "local road"
    ],
    [
      "baku",
      "sumgait",
      "road",
      "coast road"
    ],
    [
      "kirovabad",
      "stepanakert",
      "road",
      "Stepanakert–Agdam road"
    ]
  ]
,
  officers: staff([
  {
    "id": "az_head",
    "name": "Leyla Mammadova",
    "title": "Chairman of the Azerbaijan Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 40,
    "int": 66,
    "pol": 70,
    "chr": 48,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "az.baku"
  },
  {
    "id": "az_def",
    "name": "Rashad Guliyev",
    "title": "Baku garrison",
    "rank": "General-mayor",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 64,
    "int": 56,
    "pol": 42,
    "chr": 36,
    "personality": "loyalist",
    "bio": "Fictional defense minister.",
    "region": "az.baku"
  },
  {
    "id": "az_field",
    "name": "Elchin Rzayev",
    "title": "Sumgait sector",
    "rank": "Kapitan",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 54,
    "int": 60,
    "pol": 48,
    "chr": 34,
    "personality": "ambitious",
    "bio": "Fictional field officer.",
    "region": "az.baku"
  }
])
});
