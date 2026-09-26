/** The Horn and East Africa, 1985-89. Ethiopia includes Eritrea. */
import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const ETHIOPIA_REGION = land({
  "id": "et",
  "name": "Ethiopia",
  "country": "ET",
  "bbox": {
    "minLon": 34.83,
    "maxLon": 43.55,
    "minLat": 2.8,
    "maxLat": 16.36
  },
  "notes": "Atlas only. Fourteen Derg-era provinces. Eritrea is a province, not a country. The PDRE regions of late 1987 are not drawn. The Franco-Ethiopian railway runs Addis Ababa-Dire Dawa-Djibouti and is not also a road. Massawa and Assab are the Red Sea ports. Coffee is Kefa and Sidamo. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "ET-AR",
      "name": "Arsi",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-BA",
      "name": "Bale",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-ER",
      "name": "Eritrea",
      "kind": "province",
      "group": "Eritrea (Derg province)"
    },
    {
      "id": "ET-GG",
      "name": "Gamu-Gofa",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-GO",
      "name": "Gojjam",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-GD",
      "name": "Gondar",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-HA",
      "name": "Hararghe",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-IL",
      "name": "Illubabor",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-KE",
      "name": "Kefa",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-SH",
      "name": "Shewa",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-SI",
      "name": "Sidamo",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-TI",
      "name": "Tigray",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-WE",
      "name": "Welega",
      "kind": "province",
      "group": null
    },
    {
      "id": "ET-WL",
      "name": "Welo",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "asella",
      "Asella",
      "ET-AR",
      7.95,
      39.14,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "goba",
      "Goba",
      "ET-BA",
      7.01,
      39.97,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "asmara",
      "Asmara",
      "ET-ER",
      15.34,
      38.93,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "massawa",
      "Massawa",
      "ET-ER",
      15.61,
      39.45,
      "city",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "assab",
      "Assab",
      "ET-ER",
      13.01,
      42.74,
      "city",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "arba_minch",
      "Arba Minch",
      "ET-GG",
      6.03,
      37.55,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "debre_markos",
      "Debre Markos",
      "ET-GO",
      10.33,
      37.73,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "gondar",
      "Gondar",
      "ET-GD",
      12.6,
      37.47,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "humera",
      "Humera",
      "ET-GD",
      14.27,
      36.62,
      "city",
      [
        "sorghum",
        "cattle"
      ]
    ],
    [
      "harar",
      "Harar",
      "ET-HA",
      9.31,
      42.12,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "dire_dawa",
      "Dire Dawa",
      "ET-HA",
      9.59,
      41.87,
      "city",
      [
        "administration"
      ]
    ],
    [
      "jijiga",
      "Jijiga",
      "ET-HA",
      9.35,
      42.8,
      "city",
      [
        "cattle"
      ]
    ],
    [
      "metu",
      "Metu",
      "ET-IL",
      8.3,
      35.58,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "jimma",
      "Jimma",
      "ET-KE",
      7.67,
      36.83,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "addis",
      "Addis Ababa",
      "ET-SH",
      9.03,
      38.74,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "awasa",
      "Awasa",
      "ET-SI",
      7.05,
      38.47,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "moyale",
      "Moyale",
      "ET-SI",
      3.55,
      39.05,
      "city",
      [
        "cattle"
      ]
    ],
    [
      "mekelle",
      "Mekelle",
      "ET-TI",
      13.5,
      39.47,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nekemte",
      "Nekemte",
      "ET-WE",
      9.09,
      36.55,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "dessie",
      "Dessie",
      "ET-WL",
      11.13,
      39.63,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "addis",
      "dire_dawa",
      "rail",
      "Franco-Ethiopian railway"
    ],
    [
      "asmara",
      "massawa",
      "road",
      "Massawa road"
    ],
    [
      "asmara",
      "assab",
      "road",
      "Assab road"
    ],
    [
      "gondar",
      "humera",
      "road",
      "Humera road"
    ],
    [
      "addis",
      "dessie",
      "road",
      "north road"
    ],
    [
      "dessie",
      "mekelle",
      "road",
      "north road"
    ],
    [
      "mekelle",
      "asmara",
      "road",
      "north road"
    ],
    [
      "addis",
      "awasa",
      "road",
      "south road"
    ],
    [
      "awasa",
      "moyale",
      "road",
      "Moyale road"
    ],
    [
      "harar",
      "jijiga",
      "road",
      "Harar-Jijiga"
    ],
    [
      "dire_dawa",
      "harar",
      "road",
      "Harar road"
    ],
    [
      "asella",
      "awasa",
      "road",
      "national road"
    ],
    [
      "metu",
      "nekemte",
      "road",
      "national road"
    ],
    [
      "asella",
      "goba",
      "road",
      "national road"
    ],
    [
      "awasa",
      "arba_minch",
      "road",
      "national road"
    ],
    [
      "metu",
      "jimma",
      "road",
      "national road"
    ],
    [
      "addis",
      "debre_markos",
      "road",
      "national road"
    ],
    [
      "debre_markos",
      "nekemte",
      "road",
      "national road"
    ],
    [
      "mekelle",
      "gondar",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "et_0",
    "name": "Almaz Tadesse",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "et.addis"
  },
  {
    "id": "et_1",
    "name": "Tesfaye Alemu",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "et.arba_minch"
  },
  {
    "id": "et_2",
    "name": "Worknesh Gebre",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "et.asella"
  },
  {
    "id": "et_3",
    "name": "Bekele Asfaw",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "et.asmara"
  },
  {
    "id": "et_4",
    "name": "Hirut Desta",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "et.assab"
  },
  {
    "id": "et_5",
    "name": "Girma Hailu",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "et.awasa"
  }
])
});

export const SOMALIA_REGION = land({
  "id": "so",
  "name": "Somalia",
  "country": "SO",
  "bbox": {
    "minLon": 41.47,
    "maxLon": 49.93,
    "minLat": -1.11,
    "maxLat": 12.03
  },
  "notes": "Atlas only. Eighteen regions, undivided. Awdal and Sool date from 1984. Somaliland is not a country. Berbera is the northern port. The Ogaden frontier is a trail, not an open road. There is no open road into Djibouti. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "SO-AW",
      "name": "Awdal",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-BK",
      "name": "Bakool",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-BN",
      "name": "Banaadir",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-BR",
      "name": "Bari",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-BY",
      "name": "Bay",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-GA",
      "name": "Galguduud",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-GE",
      "name": "Gedo",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-HI",
      "name": "Hiiraan",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-JH",
      "name": "Lower Juba",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-SH",
      "name": "Lower Shabelle",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-JD",
      "name": "Middle Juba",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-SD",
      "name": "Middle Shabelle",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-MU",
      "name": "Mudug",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-NU",
      "name": "Nugaal",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-SA",
      "name": "Sanaag",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-SL",
      "name": "Sool",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-TO",
      "name": "Togdheer",
      "kind": "region",
      "group": null
    },
    {
      "id": "SO-WO",
      "name": "Woqooyi Galbeed",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "borama",
      "Borama",
      "SO-AW",
      9.94,
      43.18,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "xuddur",
      "Xuddur",
      "SO-BK",
      4.12,
      43.89,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "mogadishu",
      "Mogadishu",
      "SO-BN",
      2.05,
      45.34,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "bosaso",
      "Bosaso",
      "SO-BR",
      11.28,
      49.18,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "baidoa",
      "Baidoa",
      "SO-BY",
      3.12,
      43.65,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "dhusamareb",
      "Dhusamareb",
      "SO-GA",
      5.54,
      46.39,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "garba",
      "Garbahaarrey",
      "SO-GE",
      3.33,
      42.22,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "beledweyne",
      "Beledweyne",
      "SO-HI",
      4.74,
      45.2,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "kismayo",
      "Kismayo",
      "SO-JH",
      -0.36,
      42.55,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "merca",
      "Merca",
      "SO-SH",
      1.71,
      44.77,
      "capital",
      [
        "bananas"
      ]
    ],
    [
      "buale",
      "Buale",
      "SO-JD",
      1.08,
      42.59,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "jowhar",
      "Jowhar",
      "SO-SD",
      2.78,
      45.5,
      "capital",
      [
        "bananas"
      ]
    ],
    [
      "galkayo",
      "Galkayo",
      "SO-MU",
      6.77,
      47.43,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "garowe",
      "Garowe",
      "SO-NU",
      8.41,
      48.48,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "erigavo",
      "Erigavo",
      "SO-SA",
      10.62,
      47.37,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "las_anod",
      "Las Anod",
      "SO-SL",
      8.48,
      47.36,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "burao",
      "Burao",
      "SO-TO",
      9.52,
      45.53,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "hargeisa",
      "Hargeisa",
      "SO-WO",
      9.56,
      44.07,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "berbera",
      "Berbera",
      "SO-WO",
      10.44,
      45.01,
      "city",
      [
        "port",
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "mogadishu",
      "merca",
      "road",
      "national road"
    ],
    [
      "mogadishu",
      "jowhar",
      "road",
      "national road"
    ],
    [
      "borama",
      "hargeisa",
      "road",
      "national road"
    ],
    [
      "xuddur",
      "baidoa",
      "road",
      "national road"
    ],
    [
      "burao",
      "berbera",
      "road",
      "national road"
    ],
    [
      "garowe",
      "las_anod",
      "road",
      "national road"
    ],
    [
      "hargeisa",
      "berbera",
      "road",
      "national road"
    ],
    [
      "dhusamareb",
      "beledweyne",
      "road",
      "national road"
    ],
    [
      "kismayo",
      "buale",
      "road",
      "national road"
    ],
    [
      "baidoa",
      "garba",
      "road",
      "national road"
    ],
    [
      "xuddur",
      "beledweyne",
      "road",
      "national road"
    ],
    [
      "dhusamareb",
      "galkayo",
      "road",
      "national road"
    ],
    [
      "galkayo",
      "las_anod",
      "road",
      "national road"
    ],
    [
      "baidoa",
      "merca",
      "road",
      "national road"
    ],
    [
      "bosaso",
      "erigavo",
      "road",
      "national road"
    ],
    [
      "burao",
      "las_anod",
      "road",
      "national road"
    ],
    [
      "las_anod",
      "erigavo",
      "road",
      "national road"
    ],
    [
      "merca",
      "buale",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "so_0",
    "name": "Amina Farah",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "so.mogadishu"
  },
  {
    "id": "so_1",
    "name": "Hassan Ali",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "so.baidoa"
  },
  {
    "id": "so_2",
    "name": "Fadumo Warsame",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "so.beledweyne"
  },
  {
    "id": "so_3",
    "name": "Abdi Nur",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "so.berbera"
  },
  {
    "id": "so_4",
    "name": "Hodan Elmi",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "so.borama"
  },
  {
    "id": "so_5",
    "name": "Yusuf Osman",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "so.bosaso"
  }
])
});

export const KENYA_REGION = land({
  "id": "ke",
  "name": "Kenya",
  "country": "KE",
  "bbox": {
    "minLon": 33.6,
    "maxLon": 40.42,
    "minLat": -4.8,
    "maxLat": 4.95
  },
  "notes": "Atlas only. Eight provinces. Tea is mapped as coffee; there is no separate tea yield. The Uganda Railway is Mombasa-Nairobi-Nakuru-Kisumu. Lokichogio is the Sudan trail. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "KE-CE",
      "name": "Central",
      "kind": "province",
      "group": null
    },
    {
      "id": "KE-CO",
      "name": "Coast",
      "kind": "province",
      "group": null
    },
    {
      "id": "KE-EA",
      "name": "Eastern",
      "kind": "province",
      "group": null
    },
    {
      "id": "KE-NA",
      "name": "Nairobi",
      "kind": "province",
      "group": null
    },
    {
      "id": "KE-NE",
      "name": "North Eastern",
      "kind": "province",
      "group": null
    },
    {
      "id": "KE-NY",
      "name": "Nyanza",
      "kind": "province",
      "group": null
    },
    {
      "id": "KE-RV",
      "name": "Rift Valley",
      "kind": "province",
      "group": null
    },
    {
      "id": "KE-WE",
      "name": "Western",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "nyeri",
      "Nyeri",
      "KE-CE",
      -0.42,
      36.95,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "mombasa",
      "Mombasa",
      "KE-CO",
      -4.05,
      39.67,
      "capital",
      [
        "port"
      ]
    ],
    [
      "embu",
      "Embu",
      "KE-EA",
      -0.54,
      37.45,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "moyale",
      "Moyale",
      "KE-EA",
      3.52,
      39.06,
      "city",
      [
        "cattle"
      ]
    ],
    [
      "nairobi",
      "Nairobi",
      "KE-NA",
      -1.29,
      36.82,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "garissa",
      "Garissa",
      "KE-NE",
      -0.45,
      39.64,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "kisumu",
      "Kisumu",
      "KE-NY",
      -0.09,
      34.77,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "nakuru",
      "Nakuru",
      "KE-RV",
      -0.3,
      36.07,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "eldoret",
      "Eldoret",
      "KE-RV",
      0.52,
      35.27,
      "city",
      [
        "wheat"
      ]
    ],
    [
      "lokichogio",
      "Lokichogio",
      "KE-RV",
      4.2,
      34.35,
      "city",
      [
        "cattle"
      ]
    ],
    [
      "kakamega",
      "Kakamega",
      "KE-WE",
      0.28,
      34.75,
      "capital",
      [
        "sugarcane"
      ]
    ]
  ],
  "links": [
    [
      "mombasa",
      "nairobi",
      "rail",
      "Uganda Railway"
    ],
    [
      "nairobi",
      "nakuru",
      "rail",
      "Uganda Railway"
    ],
    [
      "nakuru",
      "kisumu",
      "rail",
      "Uganda Railway"
    ],
    [
      "eldoret",
      "lokichogio",
      "road",
      "Lodwar road"
    ],
    [
      "garissa",
      "moyale",
      "road",
      "A3"
    ],
    [
      "kisumu",
      "kakamega",
      "road",
      "national road"
    ],
    [
      "nyeri",
      "embu",
      "road",
      "national road"
    ],
    [
      "kakamega",
      "eldoret",
      "road",
      "national road"
    ],
    [
      "nyeri",
      "nairobi",
      "road",
      "national road"
    ],
    [
      "embu",
      "garissa",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "ke_0",
    "name": "Wanjiku Kamau",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ke.nairobi"
  },
  {
    "id": "ke_1",
    "name": "Otieno Odhiambo",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ke.eldoret"
  },
  {
    "id": "ke_2",
    "name": "Akinyi Atieno",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ke.embu"
  },
  {
    "id": "ke_3",
    "name": "Mwangi Kariuki",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ke.garissa"
  },
  {
    "id": "ke_4",
    "name": "Njeri Wanjala",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ke.kakamega"
  }
])
});

export const UGANDA_REGION = land({
  "id": "ug",
  "name": "Uganda",
  "country": "UG",
  "bbox": {
    "minLon": 29.24,
    "maxLon": 35.42,
    "minLat": -2.0,
    "maxLat": 4.4
  },
  "notes": "Atlas only. Principal districts of the late 1980s. Not every 1980 district, and no 1990s splits. Coffee is Bugisu, cotton is the north. The road to Juba crosses at Nimule. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "UG-KP",
      "name": "Kampala",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-JI",
      "name": "Jinja",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-MP",
      "name": "Mpigi",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-MU",
      "name": "Mukono",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-MS",
      "name": "Masaka",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-MB",
      "name": "Mbarara",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-KB",
      "name": "Kabarole",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-KK",
      "name": "Kabale",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-KS",
      "name": "Kasese",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-HO",
      "name": "Hoima",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-MD",
      "name": "Masindi",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-ML",
      "name": "Mbale",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-TR",
      "name": "Tororo",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-SR",
      "name": "Soroti",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-LR",
      "name": "Lira",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-GU",
      "name": "Gulu",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-AR",
      "name": "Arua",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-MO",
      "name": "Moroto",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-MU2",
      "name": "Mubende",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-IG",
      "name": "Iganga",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-KT",
      "name": "Kitgum",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-MY",
      "name": "Moyo",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-NB",
      "name": "Nebbi",
      "kind": "district",
      "group": null
    },
    {
      "id": "UG-KC",
      "name": "Kapchorwa",
      "kind": "district",
      "group": null
    }
  ],
  "cities": [
    [
      "kampala",
      "Kampala",
      "UG-KP",
      0.35,
      32.58,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jinja",
      "Jinja",
      "UG-JI",
      0.42,
      33.2,
      "capital",
      [
        "hydro"
      ]
    ],
    [
      "mpigi",
      "Mpigi",
      "UG-MP",
      0.23,
      32.33,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "mukono",
      "Mukono",
      "UG-MU",
      0.35,
      32.75,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "masaka",
      "Masaka",
      "UG-MS",
      -0.33,
      31.73,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "mbarara",
      "Mbarara",
      "UG-MB",
      -0.61,
      30.66,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "fort_portal",
      "Fort Portal",
      "UG-KB",
      0.67,
      30.27,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kabale",
      "Kabale",
      "UG-KK",
      -1.25,
      29.99,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kasese",
      "Kasese",
      "UG-KS",
      0.18,
      30.08,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "hoima",
      "Hoima",
      "UG-HO",
      1.43,
      31.35,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "masindi",
      "Masindi",
      "UG-MD",
      1.67,
      31.72,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "mbale",
      "Mbale",
      "UG-ML",
      1.08,
      34.18,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "tororo",
      "Tororo",
      "UG-TR",
      0.69,
      34.18,
      "capital",
      [
        "stone"
      ]
    ],
    [
      "soroti",
      "Soroti",
      "UG-SR",
      1.71,
      33.61,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "lira",
      "Lira",
      "UG-LR",
      2.25,
      32.9,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "gulu",
      "Gulu",
      "UG-GU",
      2.77,
      32.3,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "arua",
      "Arua",
      "UG-AR",
      3.03,
      30.91,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "moroto",
      "Moroto",
      "UG-MO",
      2.53,
      34.67,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "mubende",
      "Mubende",
      "UG-MU2",
      0.56,
      31.39,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "iganga",
      "Iganga",
      "UG-IG",
      0.61,
      33.47,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "kitgum",
      "Kitgum",
      "UG-KT",
      3.28,
      32.89,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "moyo",
      "Moyo",
      "UG-MY",
      3.65,
      31.72,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "nebbi",
      "Nebbi",
      "UG-NB",
      2.48,
      31.09,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "kapchorwa",
      "Kapchorwa",
      "UG-KC",
      1.4,
      34.45,
      "capital",
      [
        "coffee"
      ]
    ]
  ],
  "links": [
    [
      "kampala",
      "mukono",
      "road",
      "national road"
    ],
    [
      "kampala",
      "mpigi",
      "road",
      "national road"
    ],
    [
      "jinja",
      "iganga",
      "road",
      "national road"
    ],
    [
      "mbale",
      "tororo",
      "road",
      "national road"
    ],
    [
      "mbale",
      "kapchorwa",
      "road",
      "national road"
    ],
    [
      "hoima",
      "masindi",
      "road",
      "national road"
    ],
    [
      "mukono",
      "jinja",
      "road",
      "national road"
    ],
    [
      "fort_portal",
      "kasese",
      "road",
      "national road"
    ],
    [
      "arua",
      "nebbi",
      "road",
      "national road"
    ],
    [
      "iganga",
      "tororo",
      "road",
      "national road"
    ],
    [
      "gulu",
      "kitgum",
      "road",
      "national road"
    ],
    [
      "lira",
      "gulu",
      "road",
      "national road"
    ],
    [
      "mpigi",
      "masaka",
      "road",
      "national road"
    ],
    [
      "mbale",
      "soroti",
      "road",
      "national road"
    ],
    [
      "hoima",
      "mubende",
      "road",
      "national road"
    ],
    [
      "soroti",
      "lira",
      "road",
      "national road"
    ],
    [
      "mbarara",
      "kabale",
      "road",
      "national road"
    ],
    [
      "masaka",
      "mubende",
      "road",
      "national road"
    ],
    [
      "mbarara",
      "kasese",
      "road",
      "national road"
    ],
    [
      "arua",
      "moyo",
      "road",
      "national road"
    ],
    [
      "masindi",
      "nebbi",
      "road",
      "national road"
    ],
    [
      "masaka",
      "mbarara",
      "road",
      "national road"
    ],
    [
      "kapchorwa",
      "moroto",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "ug_0",
    "name": "Nakato Byaruhanga",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ug.kampala"
  },
  {
    "id": "ug_1",
    "name": "Wasswa Mugisha",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ug.arua"
  },
  {
    "id": "ug_2",
    "name": "Akello Atim",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ug.fort_portal"
  },
  {
    "id": "ug_3",
    "name": "Namuli Nabirye",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ug.gulu"
  },
  {
    "id": "ug_4",
    "name": "Opio Okwir",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ug.hoima"
  },
  {
    "id": "ug_5",
    "name": "Achen Adong",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ug.iganga"
  }
])
});

export const RWANDA_REGION = land({
  "id": "rw",
  "name": "Rwanda",
  "country": "RW",
  "bbox": {
    "minLon": 28.15,
    "maxLon": 31.29,
    "minLat": -3.35,
    "maxLat": -0.75
  },
  "notes": "Atlas only. Ten prefectures. Coffee is the highland yield. Gisenyi meets Goma. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "RW-BT",
      "name": "Butare",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "RW-BY",
      "name": "Byumba",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "RW-CY",
      "name": "Cyangugu",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "RW-GK",
      "name": "Gikongoro",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "RW-GS",
      "name": "Gisenyi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "RW-GT",
      "name": "Gitarama",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "RW-KB",
      "name": "Kibungo",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "RW-KY",
      "name": "Kibuye",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "RW-KG",
      "name": "Kigali",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "RW-RU",
      "name": "Ruhengeri",
      "kind": "prefecture",
      "group": null
    }
  ],
  "cities": [
    [
      "butare",
      "Butare",
      "RW-BT",
      -2.6,
      29.74,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "byumba",
      "Byumba",
      "RW-BY",
      -1.58,
      30.06,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "cyangugu",
      "Cyangugu",
      "RW-CY",
      -2.48,
      28.9,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "gikongoro",
      "Gikongoro",
      "RW-GK",
      -2.47,
      29.58,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "gisenyi",
      "Gisenyi",
      "RW-GS",
      -1.7,
      29.26,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "gitarama",
      "Gitarama",
      "RW-GT",
      -2.07,
      29.76,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kibungo",
      "Kibungo",
      "RW-KB",
      -2.16,
      30.54,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kibuye",
      "Kibuye",
      "RW-KY",
      -2.06,
      29.35,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kigali",
      "Kigali",
      "RW-KG",
      -1.94,
      30.06,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ruhengeri",
      "Ruhengeri",
      "RW-RU",
      -1.5,
      29.63,
      "capital",
      [
        "coffee"
      ]
    ]
  ],
  "links": [
    [
      "butare",
      "gikongoro",
      "road",
      "national road"
    ],
    [
      "gitarama",
      "kigali",
      "road",
      "national road"
    ],
    [
      "byumba",
      "kigali",
      "road",
      "national road"
    ],
    [
      "gisenyi",
      "kibuye",
      "road",
      "national road"
    ],
    [
      "gitarama",
      "kibuye",
      "road",
      "national road"
    ],
    [
      "gisenyi",
      "ruhengeri",
      "road",
      "national road"
    ],
    [
      "gikongoro",
      "gitarama",
      "road",
      "national road"
    ],
    [
      "kigali",
      "kibungo",
      "road",
      "national road"
    ],
    [
      "kibuye",
      "cyangugu",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "rw_0",
    "name": "Jean Habimana",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "rw.kigali"
  },
  {
    "id": "rw_1",
    "name": "Marie Mukamana",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "rw.butare"
  },
  {
    "id": "rw_2",
    "name": "Pierre Ndayisaba",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "rw.byumba"
  },
  {
    "id": "rw_3",
    "name": "Claire Uwimana",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "rw.cyangugu"
  },
  {
    "id": "rw_4",
    "name": "Emmanuel Niyonsaba",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "rw.gikongoro"
  }
])
});

export const BURUNDI_REGION = land({
  "id": "bi",
  "name": "Burundi",
  "country": "BI",
  "bbox": {
    "minLon": 28.37,
    "maxLon": 31.3,
    "minLat": -4.88,
    "maxLat": -1.83
  },
  "notes": "Atlas only. Fifteen provinces of the 1982 map. Coffee is the highland yield. Bujumbura meets Kigoma by the lake ferry. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "BI-BB",
      "name": "Bubanza",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-BJ",
      "name": "Bujumbura",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-BU",
      "name": "Bururi",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-CA",
      "name": "Cankuzo",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-CI",
      "name": "Cibitoke",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-GI",
      "name": "Gitega",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-KR",
      "name": "Karuzi",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-KY",
      "name": "Kayanza",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-KI",
      "name": "Kirundo",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-MK",
      "name": "Makamba",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-MU",
      "name": "Muramvya",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-MY",
      "name": "Muyinga",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-NG",
      "name": "Ngozi",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-RT",
      "name": "Rutana",
      "kind": "province",
      "group": null
    },
    {
      "id": "BI-RY",
      "name": "Ruyigi",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "bubanza",
      "Bubanza",
      "BI-BB",
      -3.08,
      29.39,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "bujumbura",
      "Bujumbura",
      "BI-BJ",
      -3.38,
      29.36,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "bururi",
      "Bururi",
      "BI-BU",
      -3.95,
      29.62,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "cankuzo",
      "Cankuzo",
      "BI-CA",
      -3.22,
      30.55,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "cibitoke",
      "Cibitoke",
      "BI-CI",
      -2.89,
      29.12,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "gitega",
      "Gitega",
      "BI-GI",
      -3.43,
      29.93,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "karuzi",
      "Karuzi",
      "BI-KR",
      -3.1,
      30.16,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kayanza",
      "Kayanza",
      "BI-KY",
      -2.92,
      29.63,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kirundo",
      "Kirundo",
      "BI-KI",
      -2.58,
      30.1,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "makamba",
      "Makamba",
      "BI-MK",
      -4.13,
      29.8,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "muramvya",
      "Muramvya",
      "BI-MU",
      -3.27,
      29.61,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "muyinga",
      "Muyinga",
      "BI-MY",
      -2.85,
      30.34,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "ngozi",
      "Ngozi",
      "BI-NG",
      -2.91,
      29.83,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "rutana",
      "Rutana",
      "BI-RT",
      -3.93,
      30.0,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "ruyigi",
      "Ruyigi",
      "BI-RY",
      -3.48,
      30.25,
      "capital",
      [
        "coffee"
      ]
    ]
  ],
  "links": [
    [
      "kayanza",
      "ngozi",
      "road",
      "national road"
    ],
    [
      "bururi",
      "makamba",
      "road",
      "national road"
    ],
    [
      "bujumbura",
      "muramvya",
      "road",
      "national road"
    ],
    [
      "makamba",
      "rutana",
      "road",
      "national road"
    ],
    [
      "bubanza",
      "kayanza",
      "road",
      "national road"
    ],
    [
      "bubanza",
      "muramvya",
      "road",
      "national road"
    ],
    [
      "karuzi",
      "muyinga",
      "road",
      "national road"
    ],
    [
      "gitega",
      "ruyigi",
      "road",
      "national road"
    ],
    [
      "bubanza",
      "cibitoke",
      "road",
      "national road"
    ],
    [
      "muramvya",
      "gitega",
      "road",
      "national road"
    ],
    [
      "muyinga",
      "kirundo",
      "road",
      "national road"
    ],
    [
      "ngozi",
      "karuzi",
      "road",
      "national road"
    ],
    [
      "ruyigi",
      "cankuzo",
      "road",
      "national road"
    ],
    [
      "gitega",
      "rutana",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "bi_0",
    "name": "Jean Niyongabo",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bi.bujumbura"
  },
  {
    "id": "bi_1",
    "name": "Marie Ndayishimiye",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bi.bubanza"
  },
  {
    "id": "bi_2",
    "name": "Pierre Niyonkuru",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bi.bururi"
  },
  {
    "id": "bi_3",
    "name": "Claire Nibigira",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bi.cankuzo"
  },
  {
    "id": "bi_4",
    "name": "Emmanuel Ndikumana",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bi.cibitoke"
  },
  {
    "id": "bi_5",
    "name": "Grace Niyonzima",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bi.gitega"
  }
])
});

export const TANZANIA_REGION = land({
  "id": "tz",
  "name": "Tanzania",
  "country": "TZ",
  "bbox": {
    "minLon": 28.88,
    "maxLon": 40.93,
    "minLat": -11.43,
    "maxLat": -0.58
  },
  "notes": "Atlas only. Twenty mainland regions plus Zanzibar's five. Dodoma is the designated capital; Dar es Salaam is still the seat of government. TAZARA is the railway Dar es Salaam-Mbeya and on to Kapiri Mposhi. The Central Line is Dar-Morogoro-Dodoma-Tabora-Kigoma, with the Mwanza branch. Zanzibar and Pemba are reached by sea. Tea is mapped as coffee. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "TZ-AR",
      "name": "Arusha",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-DS",
      "name": "Dar es Salaam",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-DO",
      "name": "Dodoma",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-IR",
      "name": "Iringa",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-KG",
      "name": "Kagera",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-KI",
      "name": "Kigoma",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-KL",
      "name": "Kilimanjaro",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-LN",
      "name": "Lindi",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-MR",
      "name": "Mara",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-MB",
      "name": "Mbeya",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-MO",
      "name": "Morogoro",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-MT",
      "name": "Mtwara",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-MZ",
      "name": "Mwanza",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-PW",
      "name": "Pwani",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-RK",
      "name": "Rukwa",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-RV",
      "name": "Ruvuma",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-SH",
      "name": "Shinyanga",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-SI",
      "name": "Singida",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-TB",
      "name": "Tabora",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-TG",
      "name": "Tanga",
      "kind": "region",
      "group": null
    },
    {
      "id": "TZ-ZN",
      "name": "Zanzibar North",
      "kind": "region",
      "group": "Zanzibar"
    },
    {
      "id": "TZ-ZS",
      "name": "Zanzibar South",
      "kind": "region",
      "group": "Zanzibar"
    },
    {
      "id": "TZ-ZW",
      "name": "Zanzibar Urban West",
      "kind": "region",
      "group": "Zanzibar"
    },
    {
      "id": "TZ-PN",
      "name": "Pemba North",
      "kind": "region",
      "group": "Zanzibar"
    },
    {
      "id": "TZ-PS",
      "name": "Pemba South",
      "kind": "region",
      "group": "Zanzibar"
    }
  ],
  "cities": [
    [
      "arusha",
      "Arusha",
      "TZ-AR",
      -3.37,
      36.68,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "dar",
      "Dar es Salaam",
      "TZ-DS",
      -6.82,
      39.27,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "dodoma",
      "Dodoma",
      "TZ-DO",
      -6.17,
      35.74,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "iringa",
      "Iringa",
      "TZ-IR",
      -7.77,
      35.7,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "bukoba",
      "Bukoba",
      "TZ-KG",
      -1.33,
      31.81,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kigoma",
      "Kigoma",
      "TZ-KI",
      -4.88,
      29.63,
      "capital",
      [
        "port"
      ]
    ],
    [
      "moshi",
      "Moshi",
      "TZ-KL",
      -3.35,
      37.34,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "lindi",
      "Lindi",
      "TZ-LN",
      -9.99,
      39.71,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "musoma",
      "Musoma",
      "TZ-MR",
      -1.5,
      33.8,
      "capital",
      [
        "fisheries",
        "cotton"
      ]
    ],
    [
      "mbeya",
      "Mbeya",
      "TZ-MB",
      -8.9,
      33.45,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "morogoro",
      "Morogoro",
      "TZ-MO",
      -6.83,
      37.66,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "mtwara",
      "Mtwara",
      "TZ-MT",
      -10.27,
      40.18,
      "capital",
      [
        "port"
      ]
    ],
    [
      "mwanza",
      "Mwanza",
      "TZ-MZ",
      -2.52,
      32.9,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "kibaha",
      "Kibaha",
      "TZ-PW",
      -6.77,
      38.92,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sumbawanga",
      "Sumbawanga",
      "TZ-RK",
      -7.97,
      31.62,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "songea",
      "Songea",
      "TZ-RV",
      -10.68,
      35.65,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "shinyanga",
      "Shinyanga",
      "TZ-SH",
      -3.66,
      33.42,
      "capital",
      [
        "cotton",
        "diamonds"
      ]
    ],
    [
      "singida",
      "Singida",
      "TZ-SI",
      -4.82,
      34.75,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "tabora",
      "Tabora",
      "TZ-TB",
      -5.02,
      32.8,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "tanga",
      "Tanga",
      "TZ-TG",
      -5.07,
      39.1,
      "capital",
      [
        "port"
      ]
    ],
    [
      "mkokotoni",
      "Mkokotoni",
      "TZ-ZN",
      -5.88,
      39.27,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "koani",
      "Koani",
      "TZ-ZS",
      -6.13,
      39.28,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zanzibar",
      "Zanzibar",
      "TZ-ZW",
      -6.17,
      39.2,
      "capital",
      [
        "port"
      ]
    ],
    [
      "wete",
      "Wete",
      "TZ-PN",
      -5.06,
      39.73,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "mkoani",
      "Mkoani",
      "TZ-PS",
      -5.36,
      39.64,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "dar",
      "mbeya",
      "rail",
      "TAZARA"
    ],
    [
      "dar",
      "morogoro",
      "rail",
      "Central Line"
    ],
    [
      "morogoro",
      "dodoma",
      "rail",
      "Central Line"
    ],
    [
      "dodoma",
      "tabora",
      "rail",
      "Central Line"
    ],
    [
      "tabora",
      "kigoma",
      "rail",
      "Central Line"
    ],
    [
      "tabora",
      "mwanza",
      "rail",
      "Central Line"
    ],
    [
      "dar",
      "zanzibar",
      "sea",
      "Zanzibar Channel"
    ],
    [
      "zanzibar",
      "wete",
      "sea",
      "Pemba Channel"
    ],
    [
      "dar",
      "kibaha",
      "road",
      "national road"
    ],
    [
      "lindi",
      "mtwara",
      "road",
      "national road"
    ],
    [
      "arusha",
      "moshi",
      "road",
      "national road"
    ],
    [
      "mwanza",
      "shinyanga",
      "road",
      "national road"
    ],
    [
      "mwanza",
      "musoma",
      "road",
      "national road"
    ],
    [
      "dodoma",
      "iringa",
      "road",
      "national road"
    ],
    [
      "mwanza",
      "bukoba",
      "road",
      "national road"
    ],
    [
      "dodoma",
      "singida",
      "road",
      "national road"
    ],
    [
      "kibaha",
      "tanga",
      "road",
      "national road"
    ],
    [
      "mbeya",
      "sumbawanga",
      "road",
      "national road"
    ],
    [
      "arusha",
      "singida",
      "road",
      "national road"
    ],
    [
      "mbeya",
      "songea",
      "road",
      "national road"
    ],
    [
      "dar",
      "lindi",
      "road",
      "national road"
    ],
    [
      "koani",
      "zanzibar",
      "road",
      "national road"
    ],
    [
      "mkokotoni",
      "koani",
      "road",
      "national road"
    ],
    [
      "wete",
      "mkoani",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "tz_0",
    "name": "Asha Kimaro",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tz.dar"
  },
  {
    "id": "tz_1",
    "name": "Juma Lyimo",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tz.arusha"
  },
  {
    "id": "tz_2",
    "name": "Neema Ngowi",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tz.bukoba"
  },
  {
    "id": "tz_3",
    "name": "Baraka Swai",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tz.dodoma"
  },
  {
    "id": "tz_4",
    "name": "Rehema Kessy",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tz.iringa"
  },
  {
    "id": "tz_5",
    "name": "Hamisi Mushi",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tz.kibaha"
  },
  {
    "id": "tz_6",
    "name": "Zawadi Shao",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 68,
    "int": 42,
    "pol": 30,
    "chr": 32,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tz.kigoma"
  }
])
});

