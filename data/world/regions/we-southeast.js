import { buildRegion, staff } from "../build-region.js";

function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const MALTA_REGION = land({
  id: "mt",
  name: "Malta",
  country: "MT",
  bbox: {"minLon": 12.84, "maxLon": 15.91, "minLat": 34.5, "maxLat": 37.44},
  notes: "Atlas only. Valletta and Victoria. Local councils arrive in 1993, so the two islands are the units. The Gozo channel is a ferry, and the Sicily ferry runs to Catania's coast. Occupied and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 5, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "MT-MA",
    "name": "Malta",
    "kind": "island"
  },
  {
    "id": "MT-GO",
    "name": "Gozo",
    "kind": "island"
  }
],
  cities: [
  [
    "valletta",
    "Valletta",
    "MT-MA",
    35.899,
    14.514,
    "capital",
    [
      "port",
      "administration"
    ]
  ],
  [
    "victoria",
    "Victoria",
    "MT-GO",
    36.044,
    14.24,
    "capital",
    [
      "fisheries"
    ]
  ]
],
  links: [
  [
    "valletta",
    "victoria",
    "sea",
    "Gozo ferry"
  ]
],
  officers: staff([
  {
    "id": "mt_pm",
    "name": "Carmel Borg",
    "title": "Prime Minister",
    "rank": "Prim Ministru",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 22,
    "int": 66,
    "pol": 70,
    "chr": 64,
    "personality": "diplomat",
    "region": "mt.valletta",
    "bio": "Fictional prime minister. Not a real officeholder."
  },
  {
    "id": "mt_guard",
    "name": "Rita Camilleri",
    "title": "Armed Forces",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 36,
    "int": 48,
    "pol": 28,
    "chr": 44,
    "personality": "loyalist",
    "region": "mt.valletta",
    "bio": "Fictional colonel of the small armed forces."
  }
]),
});
export const CYPRUS_REGION = land({
  id: "cy",
  name: "Cyprus",
  country: "CY",
  bbox: {"minLon": 31.02, "maxLon": 35.38, "minLat": 33.28, "maxLat": 36.57},
  notes: "Atlas only. The Republic's side of the 1974 division. Nicosia, Limassol, Larnaca, Paphos, and Paralimni for the free part of Famagusta district. There is no road or trail across the Green Line. Occupied and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 5, "weather": 1}},
  biome: {},
  subs: [
  {
    "id": "CY-NI",
    "name": "Nicosia",
    "kind": "district"
  },
  {
    "id": "CY-LI",
    "name": "Limassol",
    "kind": "district"
  },
  {
    "id": "CY-LA",
    "name": "Larnaca",
    "kind": "district"
  },
  {
    "id": "CY-PA",
    "name": "Paphos",
    "kind": "district"
  },
  {
    "id": "CY-FA",
    "name": "Free Famagusta",
    "kind": "district"
  }
],
  cities: [
  [
    "nicosia",
    "Nicosia",
    "CY-NI",
    35.175,
    33.365,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "limassol",
    "Limassol",
    "CY-LI",
    34.678,
    33.042,
    "capital",
    [
      "port"
    ]
  ],
  [
    "larnaca",
    "Larnaca",
    "CY-LA",
    34.922,
    33.623,
    "capital",
    [
      "port"
    ]
  ],
  [
    "paphos",
    "Paphos",
    "CY-PA",
    34.775,
    32.424,
    "capital",
    [
      "olives"
    ]
  ],
  [
    "paralimni",
    "Paralimni",
    "CY-FA",
    35.038,
    33.982,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "nicosia",
    "larnaca",
    "road",
    "south Cyprus road"
  ],
  [
    "larnaca",
    "paralimni",
    "road",
    "south Cyprus road"
  ],
  [
    "larnaca",
    "limassol",
    "road",
    "south Cyprus road"
  ],
  [
    "limassol",
    "paphos",
    "road",
    "south Cyprus road"
  ]
],
  officers: staff([
  {
    "id": "cy_pres",
    "name": "Petros Loizou",
    "title": "President",
    "rank": "President",
    "branch": "Republic",
    "slot": "head_of_state",
    "war": 28,
    "int": 70,
    "pol": 72,
    "chr": 60,
    "personality": "diplomat",
    "region": "cy.nicosia",
    "bio": "Fictional president. Not a real officeholder."
  },
  {
    "id": "cy_def",
    "name": "Maria Constantinou",
    "title": "Minister of Defence",
    "rank": "Minister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 36,
    "int": 60,
    "pol": 48,
    "chr": 46,
    "personality": "cautious",
    "region": "cy.nicosia",
    "bio": "Fictional defence minister. The Green Line is closed."
  },
  {
    "id": "cy_ng",
    "name": "Andreas Christoforou",
    "title": "National Guard",
    "rank": "Colonel",
    "branch": "National Guard",
    "slot": "field_officer",
    "war": 48,
    "int": 46,
    "pol": 26,
    "chr": 40,
    "personality": "loyalist",
    "region": "cy.limassol",
    "bio": "Fictional National Guard colonel at Limassol."
  }
]),
});
export const NORTH_CYPRUS_REGION = land({
  id: "nc",
  name: "Northern Cyprus",
  country: "NC",
  bbox: {"minLon": 31.59, "maxLon": 35.34, "minLat": 33.73, "maxLat": 36.74},
  notes: "Atlas only. The area north of the Green Line as it stood in the 1980s, recognised on this map only as the territory Turkey deals with. North Nicosia, Kyrenia, Famagusta, and Morphou. No crossing to the Republic. The sea lane runs to Mersin. Occupied and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 5, "weather": 1}},
  biome: {},
  subs: [
  {
    "id": "NC-NI",
    "name": "North Nicosia",
    "kind": "district"
  },
  {
    "id": "NC-KY",
    "name": "Kyrenia",
    "kind": "district"
  },
  {
    "id": "NC-FA",
    "name": "Famagusta",
    "kind": "district"
  },
  {
    "id": "NC-MO",
    "name": "Morphou",
    "kind": "district"
  }
],
  cities: [
  [
    "north_nicosia",
    "North Nicosia",
    "NC-NI",
    35.185,
    33.382,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kyrenia",
    "Kyrenia",
    "NC-KY",
    35.341,
    33.319,
    "capital",
    [
      "port"
    ]
  ],
  [
    "famagusta",
    "Famagusta",
    "NC-FA",
    35.125,
    33.94,
    "capital",
    [
      "port"
    ]
  ],
  [
    "morphou",
    "Morphou",
    "NC-MO",
    35.198,
    32.993,
    "capital",
    [
      "citrus"
    ]
  ]
],
  links: [
  [
    "north_nicosia",
    "kyrenia",
    "road",
    "north Cyprus road"
  ],
  [
    "kyrenia",
    "morphou",
    "road",
    "north Cyprus road"
  ],
  [
    "north_nicosia",
    "famagusta",
    "road",
    "north Cyprus road"
  ]
],
  officers: staff([
  {
    "id": "nc_lead",
    "name": "Osman Yılmaz",
    "title": "Community leader",
    "rank": "Leader",
    "branch": "Administration",
    "slot": "head_of_state",
    "war": 30,
    "int": 64,
    "pol": 68,
    "chr": 48,
    "personality": "schemer",
    "region": "nc.north_nicosia",
    "bio": "Fictional leader. Not a real officeholder."
  },
  {
    "id": "nc_def",
    "name": "Ayşe Demir",
    "title": "Security",
    "rank": "Colonel",
    "branch": "Security",
    "slot": "defense_minister",
    "war": 44,
    "int": 52,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "region": "nc.kyrenia",
    "bio": "Fictional security colonel. The port faces Mersin."
  },
  {
    "id": "nc_field",
    "name": "Hasan Ertürk",
    "title": "Famagusta sector",
    "rank": "Major",
    "branch": "Security",
    "slot": "field_officer",
    "war": 40,
    "int": 44,
    "pol": 26,
    "chr": 36,
    "personality": "loyalist",
    "region": "nc.famagusta",
    "bio": "Fictional major in the closed port of Famagusta."
  }
]),
});
export const GREECE_REGION = land({
  id: "gr",
  name: "Greece",
  country: "GR",
  bbox: {"minLon": 18.52, "maxLon": 29.62, "minLat": 33.79, "maxLat": 42.55},
  notes: "Atlas only. Fifty-one nomoi plus Mount Athos. The 1987 peripheries are not used. Islands are ferries; Lefkada keeps its causeway and Euboea keeps the Euripus bridge. Mount Athos is reached by boat. The land border with Turkey is the Evros road. No road enters Bulgaria. Occupied and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 5, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "GR-AT",
    "name": "Attica",
    "kind": "nomos"
  },
  {
    "id": "GR-VI",
    "name": "Boeotia",
    "kind": "nomos"
  },
  {
    "id": "GR-EV",
    "name": "Euboea",
    "kind": "nomos"
  },
  {
    "id": "GR-EU",
    "name": "Evrytania",
    "kind": "nomos"
  },
  {
    "id": "GR-FT",
    "name": "Phthiotis",
    "kind": "nomos"
  },
  {
    "id": "GR-FO",
    "name": "Phocis",
    "kind": "nomos"
  },
  {
    "id": "GR-AR",
    "name": "Argolis",
    "kind": "nomos"
  },
  {
    "id": "GR-AD",
    "name": "Arcadia",
    "kind": "nomos"
  },
  {
    "id": "GR-KO",
    "name": "Corinthia",
    "kind": "nomos"
  },
  {
    "id": "GR-LA",
    "name": "Laconia",
    "kind": "nomos"
  },
  {
    "id": "GR-ME",
    "name": "Messenia",
    "kind": "nomos"
  },
  {
    "id": "GR-AH",
    "name": "Achaea",
    "kind": "nomos"
  },
  {
    "id": "GR-IL",
    "name": "Elis",
    "kind": "nomos"
  },
  {
    "id": "GR-ET",
    "name": "Aetolia-Acarnania",
    "kind": "nomos"
  },
  {
    "id": "GR-AT2",
    "name": "Arta",
    "kind": "nomos"
  },
  {
    "id": "GR-IO",
    "name": "Ioannina",
    "kind": "nomos"
  },
  {
    "id": "GR-PR",
    "name": "Preveza",
    "kind": "nomos"
  },
  {
    "id": "GR-TH",
    "name": "Thesprotia",
    "kind": "nomos"
  },
  {
    "id": "GR-KA",
    "name": "Karditsa",
    "kind": "nomos"
  },
  {
    "id": "GR-LR",
    "name": "Larissa",
    "kind": "nomos"
  },
  {
    "id": "GR-MA",
    "name": "Magnesia",
    "kind": "nomos"
  },
  {
    "id": "GR-TR",
    "name": "Trikala",
    "kind": "nomos"
  },
  {
    "id": "GR-GR",
    "name": "Grevena",
    "kind": "nomos"
  },
  {
    "id": "GR-DR",
    "name": "Drama",
    "kind": "nomos"
  },
  {
    "id": "GR-IM",
    "name": "Imathia",
    "kind": "nomos"
  },
  {
    "id": "GR-SN",
    "name": "Thessaloniki",
    "kind": "nomos"
  },
  {
    "id": "GR-KV",
    "name": "Kavala",
    "kind": "nomos"
  },
  {
    "id": "GR-KS",
    "name": "Kastoria",
    "kind": "nomos"
  },
  {
    "id": "GR-KI",
    "name": "Kilkis",
    "kind": "nomos"
  },
  {
    "id": "GR-KZ",
    "name": "Kozani",
    "kind": "nomos"
  },
  {
    "id": "GR-PE",
    "name": "Pella",
    "kind": "nomos"
  },
  {
    "id": "GR-PI",
    "name": "Pieria",
    "kind": "nomos"
  },
  {
    "id": "GR-SR",
    "name": "Serres",
    "kind": "nomos"
  },
  {
    "id": "GR-CH",
    "name": "Chalkidiki",
    "kind": "nomos"
  },
  {
    "id": "GR-FL",
    "name": "Florina",
    "kind": "nomos"
  },
  {
    "id": "GR-EVR",
    "name": "Evros",
    "kind": "nomos"
  },
  {
    "id": "GR-RO",
    "name": "Rhodope",
    "kind": "nomos"
  },
  {
    "id": "GR-XA",
    "name": "Xanthi",
    "kind": "nomos"
  },
  {
    "id": "GR-KE",
    "name": "Corfu",
    "kind": "nomos"
  },
  {
    "id": "GR-KF",
    "name": "Kefalonia",
    "kind": "nomos"
  },
  {
    "id": "GR-LE",
    "name": "Lefkada",
    "kind": "nomos"
  },
  {
    "id": "GR-ZA",
    "name": "Zakynthos",
    "kind": "nomos"
  },
  {
    "id": "GR-KY",
    "name": "Cyclades",
    "kind": "nomos"
  },
  {
    "id": "GR-DO",
    "name": "Dodecanese",
    "kind": "nomos"
  },
  {
    "id": "GR-LS",
    "name": "Lesbos",
    "kind": "nomos"
  },
  {
    "id": "GR-SM",
    "name": "Samos",
    "kind": "nomos"
  },
  {
    "id": "GR-HI",
    "name": "Chios",
    "kind": "nomos"
  },
  {
    "id": "GR-HE",
    "name": "Heraklion",
    "kind": "nomos"
  },
  {
    "id": "GR-LT",
    "name": "Lasithi",
    "kind": "nomos"
  },
  {
    "id": "GR-RE",
    "name": "Rethymno",
    "kind": "nomos"
  },
  {
    "id": "GR-CN",
    "name": "Chania",
    "kind": "nomos"
  },
  {
    "id": "GR-AG",
    "name": "Mount Athos",
    "kind": "monastic state"
  }
],
  cities: [
  [
    "athens",
    "Athens",
    "GR-AT",
    37.984,
    23.728,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "livadeia",
    "Livadeia",
    "GR-VI",
    38.436,
    22.874,
    "capital",
    [
      "bauxite"
    ]
  ],
  [
    "chalcis",
    "Chalcis",
    "GR-EV",
    38.464,
    23.602,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "karpenisi",
    "Karpenisi",
    "GR-EU",
    38.912,
    21.793,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lamia",
    "Lamia",
    "GR-FT",
    38.9,
    22.434,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "amfissa",
    "Amfissa",
    "GR-FO",
    38.525,
    22.375,
    "capital",
    [
      "bauxite"
    ]
  ],
  [
    "nafplio",
    "Nafplio",
    "GR-AR",
    37.567,
    22.807,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "tripoli",
    "Tripoli",
    "GR-AD",
    37.508,
    22.379,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "corinth",
    "Corinth",
    "GR-KO",
    37.938,
    22.932,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "sparta",
    "Sparta",
    "GR-LA",
    37.074,
    22.43,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kalamata",
    "Kalamata",
    "GR-ME",
    37.039,
    22.114,
    "capital",
    [
      "olives"
    ]
  ],
  [
    "patras",
    "Patras",
    "GR-AH",
    38.246,
    21.735,
    "capital",
    [
      "port"
    ]
  ],
  [
    "pyrgos",
    "Pyrgos",
    "GR-IL",
    37.675,
    21.441,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mesolongi",
    "Mesolongi",
    "GR-ET",
    38.378,
    21.43,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "arta",
    "Arta",
    "GR-AT2",
    39.16,
    20.985,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ioannina",
    "Ioannina",
    "GR-IO",
    39.665,
    20.852,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "preveza",
    "Preveza",
    "GR-PR",
    38.957,
    20.751,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "igoumenitsa",
    "Igoumenitsa",
    "GR-TH",
    39.505,
    20.265,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "karditsa",
    "Karditsa",
    "GR-KA",
    39.364,
    21.922,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "larissa",
    "Larissa",
    "GR-LR",
    39.639,
    22.419,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "volos",
    "Volos",
    "GR-MA",
    39.362,
    22.942,
    "capital",
    [
      "port"
    ]
  ],
  [
    "trikala",
    "Trikala",
    "GR-TR",
    39.555,
    21.768,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "grevena",
    "Grevena",
    "GR-GR",
    40.084,
    21.427,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "drama",
    "Drama",
    "GR-DR",
    41.151,
    24.147,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "veria",
    "Veria",
    "GR-IM",
    40.524,
    22.202,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "thessaloniki",
    "Thessaloniki",
    "GR-SN",
    40.64,
    22.944,
    "capital",
    [
      "port"
    ]
  ],
  [
    "kavala",
    "Kavala",
    "GR-KV",
    40.939,
    24.412,
    "capital",
    [
      "port"
    ]
  ],
  [
    "kastoria",
    "Kastoria",
    "GR-KS",
    40.519,
    21.268,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kilkis",
    "Kilkis",
    "GR-KI",
    40.994,
    22.875,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kozani",
    "Kozani",
    "GR-KZ",
    40.301,
    21.788,
    "capital",
    [
      "lignite"
    ]
  ],
  [
    "edessa",
    "Edessa",
    "GR-PE",
    40.802,
    22.047,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "katerini",
    "Katerini",
    "GR-PI",
    40.272,
    22.509,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "serres",
    "Serres",
    "GR-SR",
    41.085,
    23.548,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "polygyros",
    "Polygyros",
    "GR-CH",
    40.377,
    23.441,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "florina",
    "Florina",
    "GR-FL",
    40.782,
    21.41,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "alexandroupoli",
    "Alexandroupoli",
    "GR-EVR",
    40.847,
    25.874,
    "capital",
    [
      "port"
    ]
  ],
  [
    "komotini",
    "Komotini",
    "GR-RO",
    41.122,
    25.406,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "xanthi",
    "Xanthi",
    "GR-XA",
    41.135,
    24.888,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "corfu",
    "Corfu",
    "GR-KE",
    39.624,
    19.922,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "argostoli",
    "Argostoli",
    "GR-KF",
    38.174,
    20.489,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lefkada",
    "Lefkada",
    "GR-LE",
    38.833,
    20.707,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "zakynthos",
    "Zakynthos",
    "GR-ZA",
    37.787,
    20.898,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ermoupoli",
    "Ermoupoli",
    "GR-KY",
    37.444,
    24.942,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "rhodes",
    "Rhodes",
    "GR-DO",
    36.434,
    28.217,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mytilene",
    "Mytilene",
    "GR-LS",
    39.106,
    26.555,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "samos",
    "Samos",
    "GR-SM",
    37.757,
    26.977,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "chios",
    "Chios",
    "GR-HI",
    38.368,
    26.137,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "heraklion",
    "Heraklion",
    "GR-HE",
    35.339,
    25.144,
    "capital",
    [
      "olives"
    ]
  ],
  [
    "agios_nikolaos",
    "Agios Nikolaos",
    "GR-LT",
    35.191,
    25.716,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "rethymno",
    "Rethymno",
    "GR-RE",
    35.368,
    24.474,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "chania",
    "Chania",
    "GR-CN",
    35.513,
    24.018,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "karyes",
    "Karyes",
    "GR-AG",
    40.257,
    24.245,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "piraeus",
    "Piraeus",
    "GR-AT",
    37.943,
    23.647,
    "port",
    [
      "port"
    ]
  ]
],
  links: [
  [
    "athens",
    "piraeus",
    "road",
    "national road"
  ],
  [
    "athens",
    "chalcis",
    "road",
    "national road"
  ],
  [
    "piraeus",
    "corinth",
    "road",
    "national road"
  ],
  [
    "corinth",
    "nafplio",
    "road",
    "national road"
  ],
  [
    "nafplio",
    "tripoli",
    "road",
    "national road"
  ],
  [
    "tripoli",
    "sparta",
    "road",
    "national road"
  ],
  [
    "sparta",
    "kalamata",
    "road",
    "national road"
  ],
  [
    "corinth",
    "livadeia",
    "road",
    "national road"
  ],
  [
    "livadeia",
    "amfissa",
    "road",
    "national road"
  ],
  [
    "amfissa",
    "lamia",
    "road",
    "national road"
  ],
  [
    "lamia",
    "karpenisi",
    "road",
    "national road"
  ],
  [
    "karpenisi",
    "karditsa",
    "road",
    "national road"
  ],
  [
    "karditsa",
    "trikala",
    "road",
    "national road"
  ],
  [
    "karditsa",
    "larissa",
    "road",
    "national road"
  ],
  [
    "larissa",
    "volos",
    "road",
    "national road"
  ],
  [
    "amfissa",
    "patras",
    "road",
    "national road"
  ],
  [
    "patras",
    "mesolongi",
    "road",
    "national road"
  ],
  [
    "trikala",
    "grevena",
    "road",
    "national road"
  ],
  [
    "grevena",
    "kozani",
    "road",
    "national road"
  ],
  [
    "kozani",
    "veria",
    "road",
    "national road"
  ],
  [
    "veria",
    "edessa",
    "road",
    "national road"
  ],
  [
    "veria",
    "katerini",
    "road",
    "national road"
  ],
  [
    "kozani",
    "kastoria",
    "road",
    "national road"
  ],
  [
    "kastoria",
    "florina",
    "road",
    "national road"
  ],
  [
    "katerini",
    "thessaloniki",
    "road",
    "national road"
  ],
  [
    "thessaloniki",
    "kilkis",
    "road",
    "national road"
  ],
  [
    "thessaloniki",
    "polygyros",
    "road",
    "national road"
  ],
  [
    "kilkis",
    "serres",
    "road",
    "national road"
  ],
  [
    "serres",
    "drama",
    "road",
    "national road"
  ],
  [
    "drama",
    "kavala",
    "road",
    "national road"
  ],
  [
    "kavala",
    "xanthi",
    "road",
    "national road"
  ],
  [
    "xanthi",
    "komotini",
    "road",
    "national road"
  ],
  [
    "komotini",
    "alexandroupoli",
    "road",
    "national road"
  ],
  [
    "grevena",
    "ioannina",
    "road",
    "national road"
  ],
  [
    "ioannina",
    "igoumenitsa",
    "road",
    "national road"
  ],
  [
    "ioannina",
    "arta",
    "road",
    "national road"
  ],
  [
    "arta",
    "preveza",
    "road",
    "national road"
  ],
  [
    "preveza",
    "lefkada",
    "road",
    "national road"
  ],
  [
    "patras",
    "pyrgos",
    "road",
    "national road"
  ],
  [
    "rethymno",
    "chania",
    "road",
    "Cretan road"
  ],
  [
    "rethymno",
    "heraklion",
    "road",
    "Cretan road"
  ],
  [
    "heraklion",
    "agios_nikolaos",
    "road",
    "Cretan road"
  ],
  [
    "corfu",
    "igoumenitsa",
    "sea",
    "Corfu ferry"
  ],
  [
    "argostoli",
    "patras",
    "sea",
    "Kefalonia ferry"
  ],
  [
    "zakynthos",
    "patras",
    "sea",
    "Zakynthos ferry"
  ],
  [
    "ermoupoli",
    "piraeus",
    "sea",
    "Cyclades ferry"
  ],
  [
    "rhodes",
    "piraeus",
    "sea",
    "Dodecanese ferry"
  ],
  [
    "mytilene",
    "piraeus",
    "sea",
    "Lesbos ferry"
  ],
  [
    "samos",
    "piraeus",
    "sea",
    "Samos ferry"
  ],
  [
    "chios",
    "piraeus",
    "sea",
    "Chios ferry"
  ],
  [
    "heraklion",
    "piraeus",
    "sea",
    "Crete ferry"
  ],
  [
    "karyes",
    "thessaloniki",
    "sea",
    "Mount Athos boat"
  ]
],
  officers: staff([
  {
    "id": "gr_pm",
    "name": "Nikos Vassiliou",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 28,
    "int": 74,
    "pol": 76,
    "chr": 62,
    "personality": "diplomat",
    "region": "gr.athens",
    "bio": "Fictional prime minister. Not a real officeholder."
  },
  {
    "id": "gr_def",
    "name": "Eleni Markou",
    "title": "Minister of Defence",
    "rank": "Minister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 40,
    "int": 66,
    "pol": 52,
    "chr": 48,
    "personality": "cautious",
    "region": "gr.athens",
    "bio": "Fictional defence minister."
  },
  {
    "id": "gr_chief",
    "name": "Dimitris Angelis",
    "title": "Chief of the Defence Staff",
    "rank": "General",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 66,
    "int": 60,
    "pol": 30,
    "chr": 42,
    "personality": "loyalist",
    "region": "gr.athens",
    "bio": "Fictional chief of defence."
  },
  {
    "id": "gr_north",
    "name": "Kostas Papadakis",
    "title": "Northern command",
    "rank": "Lieutenant General",
    "branch": "Army",
    "slot": "front_commander",
    "war": 64,
    "int": 54,
    "pol": 28,
    "chr": 40,
    "personality": "aggressive",
    "region": "gr.thessaloniki",
    "bio": "Fictional northern commander. The Evros is the land border."
  },
  {
    "id": "gr_navy",
    "name": "Marina Kostaki",
    "title": "Navy",
    "rank": "Vice Admiral",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 58,
    "int": 58,
    "pol": 26,
    "chr": 44,
    "personality": "cautious",
    "region": "gr.piraeus",
    "bio": "Fictional admiral. Piraeus is the ferry hub."
  },
  {
    "id": "gr_air",
    "name": "Giorgos Nikas",
    "title": "Air force",
    "rank": "Major General",
    "branch": "Air force",
    "slot": "field_officer",
    "war": 52,
    "int": 56,
    "pol": 28,
    "chr": 40,
    "personality": "ambitious",
    "region": "gr.larissa",
    "bio": "Fictional air commander in Thessaly."
  },
  {
    "id": "gr_crete",
    "name": "Ioanna Spirou",
    "title": "Crete command",
    "rank": "Brigadier",
    "branch": "Army",
    "slot": "field_officer",
    "war": 44,
    "int": 48,
    "pol": 24,
    "chr": 42,
    "personality": "loyalist",
    "region": "gr.heraklion",
    "bio": "Fictional Crete brigadier. The island is supplied by sea."
  },
  {
    "id": "gr_epirus",
    "name": "Takis Vlachos",
    "title": "Epirus command",
    "rank": "Brigadier",
    "branch": "Army",
    "slot": "field_officer",
    "war": 48,
    "int": 46,
    "pol": 24,
    "chr": 36,
    "personality": "recluse",
    "region": "gr.ioannina",
    "bio": "Fictional Epirus brigadier."
  }
]),
});
export const TURKEY_REGION = land({
  id: "tr",
  name: "Turkey",
  country: "TR",
  bbox: {"minLon": 25.01, "maxLon": 45.14, "minLat": 34.8, "maxLat": 43.43},
  notes: "Atlas only. Sixty-seven provinces, the list through early 1989. Aksaray, Bayburt, Karaman, and Kırıkkale are created in June 1989 and are left inside their parent provinces, as are later splits such as Batman. Istanbul keeps a European pin and Üsküdar on the Asian shore, joined by the Boğaziçi Bridge of 1973. The Bosporus and the Dardanelles are a sea lane. NATO, occupied on this map, and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 4, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "TR-01",
    "name": "Adana",
    "kind": "province"
  },
  {
    "id": "TR-02",
    "name": "Adıyaman",
    "kind": "province"
  },
  {
    "id": "TR-03",
    "name": "Afyon",
    "kind": "province"
  },
  {
    "id": "TR-04",
    "name": "Ağrı",
    "kind": "province"
  },
  {
    "id": "TR-05",
    "name": "Amasya",
    "kind": "province"
  },
  {
    "id": "TR-06",
    "name": "Ankara",
    "kind": "province"
  },
  {
    "id": "TR-07",
    "name": "Antalya",
    "kind": "province"
  },
  {
    "id": "TR-08",
    "name": "Artvin",
    "kind": "province"
  },
  {
    "id": "TR-09",
    "name": "Aydın",
    "kind": "province"
  },
  {
    "id": "TR-10",
    "name": "Balıkesir",
    "kind": "province"
  },
  {
    "id": "TR-11",
    "name": "Bilecik",
    "kind": "province"
  },
  {
    "id": "TR-12",
    "name": "Bingöl",
    "kind": "province"
  },
  {
    "id": "TR-13",
    "name": "Bitlis",
    "kind": "province"
  },
  {
    "id": "TR-14",
    "name": "Bolu",
    "kind": "province"
  },
  {
    "id": "TR-15",
    "name": "Burdur",
    "kind": "province"
  },
  {
    "id": "TR-16",
    "name": "Bursa",
    "kind": "province"
  },
  {
    "id": "TR-17",
    "name": "Çanakkale",
    "kind": "province"
  },
  {
    "id": "TR-18",
    "name": "Çankırı",
    "kind": "province"
  },
  {
    "id": "TR-19",
    "name": "Çorum",
    "kind": "province"
  },
  {
    "id": "TR-20",
    "name": "Denizli",
    "kind": "province"
  },
  {
    "id": "TR-21",
    "name": "Diyarbakır",
    "kind": "province"
  },
  {
    "id": "TR-22",
    "name": "Edirne",
    "kind": "province"
  },
  {
    "id": "TR-23",
    "name": "Elazığ",
    "kind": "province"
  },
  {
    "id": "TR-24",
    "name": "Erzincan",
    "kind": "province"
  },
  {
    "id": "TR-25",
    "name": "Erzurum",
    "kind": "province"
  },
  {
    "id": "TR-26",
    "name": "Eskişehir",
    "kind": "province"
  },
  {
    "id": "TR-27",
    "name": "Gaziantep",
    "kind": "province"
  },
  {
    "id": "TR-28",
    "name": "Giresun",
    "kind": "province"
  },
  {
    "id": "TR-29",
    "name": "Gümüşhane",
    "kind": "province"
  },
  {
    "id": "TR-30",
    "name": "Hakkari",
    "kind": "province"
  },
  {
    "id": "TR-31",
    "name": "Hatay",
    "kind": "province"
  },
  {
    "id": "TR-32",
    "name": "Isparta",
    "kind": "province"
  },
  {
    "id": "TR-33",
    "name": "İçel",
    "kind": "province"
  },
  {
    "id": "TR-34",
    "name": "Istanbul",
    "kind": "province"
  },
  {
    "id": "TR-35",
    "name": "İzmir",
    "kind": "province"
  },
  {
    "id": "TR-36",
    "name": "Kars",
    "kind": "province"
  },
  {
    "id": "TR-37",
    "name": "Kastamonu",
    "kind": "province"
  },
  {
    "id": "TR-38",
    "name": "Kayseri",
    "kind": "province"
  },
  {
    "id": "TR-39",
    "name": "Kırklareli",
    "kind": "province"
  },
  {
    "id": "TR-40",
    "name": "Kırşehir",
    "kind": "province"
  },
  {
    "id": "TR-41",
    "name": "Kocaeli",
    "kind": "province"
  },
  {
    "id": "TR-42",
    "name": "Konya",
    "kind": "province"
  },
  {
    "id": "TR-43",
    "name": "Kütahya",
    "kind": "province"
  },
  {
    "id": "TR-44",
    "name": "Malatya",
    "kind": "province"
  },
  {
    "id": "TR-45",
    "name": "Manisa",
    "kind": "province"
  },
  {
    "id": "TR-46",
    "name": "Kahramanmaraş",
    "kind": "province"
  },
  {
    "id": "TR-47",
    "name": "Mardin",
    "kind": "province"
  },
  {
    "id": "TR-48",
    "name": "Muğla",
    "kind": "province"
  },
  {
    "id": "TR-49",
    "name": "Muş",
    "kind": "province"
  },
  {
    "id": "TR-50",
    "name": "Nevşehir",
    "kind": "province"
  },
  {
    "id": "TR-51",
    "name": "Niğde",
    "kind": "province"
  },
  {
    "id": "TR-52",
    "name": "Ordu",
    "kind": "province"
  },
  {
    "id": "TR-53",
    "name": "Rize",
    "kind": "province"
  },
  {
    "id": "TR-54",
    "name": "Sakarya",
    "kind": "province"
  },
  {
    "id": "TR-55",
    "name": "Samsun",
    "kind": "province"
  },
  {
    "id": "TR-56",
    "name": "Siirt",
    "kind": "province"
  },
  {
    "id": "TR-57",
    "name": "Sinop",
    "kind": "province"
  },
  {
    "id": "TR-58",
    "name": "Sivas",
    "kind": "province"
  },
  {
    "id": "TR-59",
    "name": "Tekirdağ",
    "kind": "province"
  },
  {
    "id": "TR-60",
    "name": "Tokat",
    "kind": "province"
  },
  {
    "id": "TR-61",
    "name": "Trabzon",
    "kind": "province"
  },
  {
    "id": "TR-62",
    "name": "Tunceli",
    "kind": "province"
  },
  {
    "id": "TR-63",
    "name": "Şanlıurfa",
    "kind": "province"
  },
  {
    "id": "TR-64",
    "name": "Uşak",
    "kind": "province"
  },
  {
    "id": "TR-65",
    "name": "Van",
    "kind": "province"
  },
  {
    "id": "TR-66",
    "name": "Yozgat",
    "kind": "province"
  },
  {
    "id": "TR-67",
    "name": "Zonguldak",
    "kind": "province"
  }
],
  cities: [
  [
    "adana",
    "Adana",
    "TR-01",
    37.0,
    35.321,
    "capital",
    [
      "cotton"
    ]
  ],
  [
    "adiyaman",
    "Adıyaman",
    "TR-02",
    37.764,
    38.279,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "afyon",
    "Afyon",
    "TR-03",
    38.757,
    30.538,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "agri",
    "Ağrı",
    "TR-04",
    39.719,
    43.051,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "amasya",
    "Amasya",
    "TR-05",
    40.65,
    35.833,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ankara",
    "Ankara",
    "TR-06",
    39.933,
    32.86,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "antalya",
    "Antalya",
    "TR-07",
    36.897,
    30.713,
    "capital",
    [
      "citrus"
    ]
  ],
  [
    "artvin",
    "Artvin",
    "TR-08",
    41.183,
    41.819,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "aydin",
    "Aydın",
    "TR-09",
    37.845,
    27.84,
    "capital",
    [
      "olives"
    ]
  ],
  [
    "balikesir",
    "Balıkesir",
    "TR-10",
    39.648,
    27.883,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bilecik",
    "Bilecik",
    "TR-11",
    40.056,
    30.067,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bingol",
    "Bingöl",
    "TR-12",
    38.885,
    40.498,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bitlis",
    "Bitlis",
    "TR-13",
    38.401,
    42.109,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bolu",
    "Bolu",
    "TR-14",
    40.736,
    31.606,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "burdur",
    "Burdur",
    "TR-15",
    37.721,
    30.291,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bursa",
    "Bursa",
    "TR-16",
    40.195,
    29.06,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "canakkale",
    "Çanakkale",
    "TR-17",
    40.155,
    26.414,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "cankiri",
    "Çankırı",
    "TR-18",
    40.602,
    33.616,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "corum",
    "Çorum",
    "TR-19",
    40.55,
    34.956,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "denizli",
    "Denizli",
    "TR-20",
    37.776,
    29.086,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "diyarbakir",
    "Diyarbakır",
    "TR-21",
    37.915,
    40.231,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "edirne",
    "Edirne",
    "TR-22",
    41.677,
    26.556,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "elazig",
    "Elazığ",
    "TR-23",
    38.675,
    39.223,
    "capital",
    [
      "copper"
    ]
  ],
  [
    "erzincan",
    "Erzincan",
    "TR-24",
    39.75,
    39.493,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "erzurum",
    "Erzurum",
    "TR-25",
    39.905,
    41.265,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "eskisehir",
    "Eskişehir",
    "TR-26",
    39.777,
    30.52,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "gaziantep",
    "Gaziantep",
    "TR-27",
    37.066,
    37.383,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "giresun",
    "Giresun",
    "TR-28",
    40.917,
    38.39,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "gumushane",
    "Gümüşhane",
    "TR-29",
    40.46,
    39.481,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "hakkari",
    "Hakkari",
    "TR-30",
    37.574,
    43.741,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "antakya",
    "Antakya",
    "TR-31",
    36.202,
    36.161,
    "capital",
    [
      "steel"
    ]
  ],
  [
    "isparta",
    "Isparta",
    "TR-32",
    37.764,
    30.556,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mersin",
    "Mersin",
    "TR-33",
    36.812,
    34.641,
    "capital",
    [
      "port"
    ]
  ],
  [
    "istanbul",
    "Istanbul",
    "TR-34",
    41.008,
    28.978,
    "capital",
    [
      "port",
      "administration"
    ]
  ],
  [
    "izmir",
    "İzmir",
    "TR-35",
    38.424,
    27.143,
    "capital",
    [
      "port"
    ]
  ],
  [
    "kars",
    "Kars",
    "TR-36",
    40.602,
    43.098,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kastamonu",
    "Kastamonu",
    "TR-37",
    41.389,
    33.783,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kayseri",
    "Kayseri",
    "TR-38",
    38.732,
    35.485,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kirklareli",
    "Kırklareli",
    "TR-39",
    41.735,
    27.225,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kirsehir",
    "Kırşehir",
    "TR-40",
    39.146,
    34.16,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "izmit",
    "İzmit",
    "TR-41",
    40.765,
    29.94,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "konya",
    "Konya",
    "TR-42",
    37.874,
    32.493,
    "capital",
    [
      "wheat"
    ]
  ],
  [
    "kutahya",
    "Kütahya",
    "TR-43",
    39.42,
    29.983,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "malatya",
    "Malatya",
    "TR-44",
    38.355,
    38.309,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "manisa",
    "Manisa",
    "TR-45",
    38.614,
    27.429,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "maras",
    "Kahramanmaraş",
    "TR-46",
    37.585,
    36.937,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mardin",
    "Mardin",
    "TR-47",
    37.313,
    40.735,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mugla",
    "Muğla",
    "TR-48",
    37.215,
    28.364,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mus",
    "Muş",
    "TR-49",
    38.734,
    41.491,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "nevsehir",
    "Nevşehir",
    "TR-50",
    38.624,
    34.724,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "nigde",
    "Niğde",
    "TR-51",
    37.97,
    34.679,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ordu",
    "Ordu",
    "TR-52",
    40.984,
    37.878,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "rize",
    "Rize",
    "TR-53",
    41.02,
    40.523,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "adapazari",
    "Adapazarı",
    "TR-54",
    40.773,
    30.394,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "samsun",
    "Samsun",
    "TR-55",
    41.286,
    36.33,
    "capital",
    [
      "port"
    ]
  ],
  [
    "siirt",
    "Siirt",
    "TR-56",
    37.933,
    41.941,
    "capital",
    [
      "oil"
    ]
  ],
  [
    "sinop",
    "Sinop",
    "TR-57",
    42.027,
    35.151,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "sivas",
    "Sivas",
    "TR-58",
    39.748,
    37.016,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "tekirdag",
    "Tekirdağ",
    "TR-59",
    40.978,
    27.511,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "tokat",
    "Tokat",
    "TR-60",
    40.314,
    36.554,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "trabzon",
    "Trabzon",
    "TR-61",
    41.002,
    39.717,
    "capital",
    [
      "fisheries",
      "port"
    ]
  ],
  [
    "tunceli",
    "Tunceli",
    "TR-62",
    39.108,
    39.547,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "urfa",
    "Şanlıurfa",
    "TR-63",
    37.167,
    38.795,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "usak",
    "Uşak",
    "TR-64",
    38.674,
    29.405,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "van",
    "Van",
    "TR-65",
    38.494,
    43.38,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "yozgat",
    "Yozgat",
    "TR-66",
    39.818,
    34.815,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "zonguldak",
    "Zonguldak",
    "TR-67",
    41.456,
    31.799,
    "capital",
    [
      "coal"
    ]
  ],
  [
    "uskudar",
    "Üsküdar",
    "TR-34",
    41.023,
    29.015,
    "city",
    [
      "port"
    ]
  ]
],
  links: [
  [
    "edirne",
    "kirklareli",
    "road",
    "European road"
  ],
  [
    "kirklareli",
    "tekirdag",
    "road",
    "European road"
  ],
  [
    "tekirdag",
    "istanbul",
    "road",
    "European road"
  ],
  [
    "adana",
    "mersin",
    "road",
    "Anatolian road"
  ],
  [
    "adana",
    "antakya",
    "road",
    "Anatolian road"
  ],
  [
    "adana",
    "nigde",
    "road",
    "Anatolian road"
  ],
  [
    "nigde",
    "nevsehir",
    "road",
    "Anatolian road"
  ],
  [
    "nevsehir",
    "kayseri",
    "road",
    "Anatolian road"
  ],
  [
    "nevsehir",
    "kirsehir",
    "road",
    "Anatolian road"
  ],
  [
    "kirsehir",
    "yozgat",
    "road",
    "Anatolian road"
  ],
  [
    "yozgat",
    "corum",
    "road",
    "Anatolian road"
  ],
  [
    "corum",
    "amasya",
    "road",
    "Anatolian road"
  ],
  [
    "amasya",
    "tokat",
    "road",
    "Anatolian road"
  ],
  [
    "tokat",
    "sivas",
    "road",
    "Anatolian road"
  ],
  [
    "amasya",
    "samsun",
    "road",
    "Anatolian road"
  ],
  [
    "corum",
    "cankiri",
    "road",
    "Anatolian road"
  ],
  [
    "cankiri",
    "kastamonu",
    "road",
    "Anatolian road"
  ],
  [
    "cankiri",
    "ankara",
    "road",
    "Anatolian road"
  ],
  [
    "samsun",
    "sinop",
    "road",
    "Anatolian road"
  ],
  [
    "samsun",
    "ordu",
    "road",
    "Anatolian road"
  ],
  [
    "ordu",
    "giresun",
    "road",
    "Anatolian road"
  ],
  [
    "giresun",
    "gumushane",
    "road",
    "Anatolian road"
  ],
  [
    "gumushane",
    "trabzon",
    "road",
    "Anatolian road"
  ],
  [
    "trabzon",
    "rize",
    "road",
    "Anatolian road"
  ],
  [
    "gumushane",
    "erzincan",
    "road",
    "Anatolian road"
  ],
  [
    "erzincan",
    "tunceli",
    "road",
    "Anatolian road"
  ],
  [
    "tunceli",
    "elazig",
    "road",
    "Anatolian road"
  ],
  [
    "tunceli",
    "bingol",
    "road",
    "Anatolian road"
  ],
  [
    "bingol",
    "mus",
    "road",
    "Anatolian road"
  ],
  [
    "mus",
    "bitlis",
    "road",
    "Anatolian road"
  ],
  [
    "bitlis",
    "siirt",
    "road",
    "Anatolian road"
  ],
  [
    "elazig",
    "malatya",
    "road",
    "Anatolian road"
  ],
  [
    "malatya",
    "adiyaman",
    "road",
    "Anatolian road"
  ],
  [
    "adiyaman",
    "urfa",
    "road",
    "Anatolian road"
  ],
  [
    "bitlis",
    "van",
    "road",
    "Anatolian road"
  ],
  [
    "rize",
    "artvin",
    "road",
    "Anatolian road"
  ],
  [
    "adiyaman",
    "gaziantep",
    "road",
    "Anatolian road"
  ],
  [
    "gaziantep",
    "maras",
    "road",
    "Anatolian road"
  ],
  [
    "van",
    "hakkari",
    "road",
    "Anatolian road"
  ],
  [
    "bingol",
    "diyarbakir",
    "road",
    "Anatolian road"
  ],
  [
    "diyarbakir",
    "mardin",
    "road",
    "Anatolian road"
  ],
  [
    "artvin",
    "kars",
    "road",
    "Anatolian road"
  ],
  [
    "kars",
    "agri",
    "road",
    "Anatolian road"
  ],
  [
    "bingol",
    "erzurum",
    "road",
    "Anatolian road"
  ],
  [
    "ankara",
    "bolu",
    "road",
    "Anatolian road"
  ],
  [
    "bolu",
    "zonguldak",
    "road",
    "Anatolian road"
  ],
  [
    "bolu",
    "adapazari",
    "road",
    "Anatolian road"
  ],
  [
    "adapazari",
    "izmit",
    "road",
    "Anatolian road"
  ],
  [
    "izmit",
    "uskudar",
    "road",
    "Anatolian road"
  ],
  [
    "izmit",
    "bilecik",
    "road",
    "Anatolian road"
  ],
  [
    "bilecik",
    "eskisehir",
    "road",
    "Anatolian road"
  ],
  [
    "eskisehir",
    "kutahya",
    "road",
    "Anatolian road"
  ],
  [
    "bilecik",
    "bursa",
    "road",
    "Anatolian road"
  ],
  [
    "kutahya",
    "afyon",
    "road",
    "Anatolian road"
  ],
  [
    "afyon",
    "usak",
    "road",
    "Anatolian road"
  ],
  [
    "usak",
    "denizli",
    "road",
    "Anatolian road"
  ],
  [
    "denizli",
    "mugla",
    "road",
    "Anatolian road"
  ],
  [
    "mugla",
    "aydin",
    "road",
    "Anatolian road"
  ],
  [
    "aydin",
    "izmir",
    "road",
    "Anatolian road"
  ],
  [
    "izmir",
    "manisa",
    "road",
    "Anatolian road"
  ],
  [
    "denizli",
    "burdur",
    "road",
    "Anatolian road"
  ],
  [
    "burdur",
    "isparta",
    "road",
    "Anatolian road"
  ],
  [
    "isparta",
    "antalya",
    "road",
    "Anatolian road"
  ],
  [
    "bursa",
    "balikesir",
    "road",
    "Anatolian road"
  ],
  [
    "balikesir",
    "canakkale",
    "road",
    "Anatolian road"
  ],
  [
    "isparta",
    "konya",
    "road",
    "Anatolian road"
  ],
  [
    "istanbul",
    "uskudar",
    "road",
    "Boğaziçi Bridge (1973)"
  ],
  [
    "istanbul",
    "canakkale",
    "sea",
    "Bosporus and Dardanelles"
  ],
  [
    "istanbul",
    "samsun",
    "sea",
    "Black Sea shipping"
  ]
],
  officers: staff([
  {
    "id": "tr_pm",
    "name": "Necdet Arslan",
    "title": "Prime Minister",
    "rank": "Başbakan",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 30,
    "int": 72,
    "pol": 74,
    "chr": 56,
    "personality": "diplomat",
    "region": "tr.ankara",
    "bio": "Fictional prime minister. Not a real officeholder."
  },
  {
    "id": "tr_def",
    "name": "Selma Yücel",
    "title": "Minister of Defence",
    "rank": "Bakan",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 44,
    "int": 64,
    "pol": 50,
    "chr": 46,
    "personality": "cautious",
    "region": "tr.ankara",
    "bio": "Fictional defence minister."
  },
  {
    "id": "tr_chief",
    "name": "Kemal Ersoy",
    "title": "Chief of the General Staff",
    "rank": "Orgeneral",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 72,
    "int": 64,
    "pol": 36,
    "chr": 40,
    "personality": "loyalist",
    "region": "tr.ankara",
    "bio": "Fictional chief of the general staff."
  },
  {
    "id": "tr_thrace",
    "name": "Hakan Demirel",
    "title": "Thrace command",
    "rank": "Korgeneral",
    "branch": "Army",
    "slot": "front_commander",
    "war": 66,
    "int": 54,
    "pol": 28,
    "chr": 38,
    "personality": "aggressive",
    "region": "tr.edirne",
    "bio": "Fictional Thracian commander. The Evros road is the Greek border."
  },
  {
    "id": "tr_straits",
    "name": "Leyla Tan",
    "title": "Straits",
    "rank": "Oramiral",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 60,
    "int": 62,
    "pol": 30,
    "chr": 44,
    "personality": "cautious",
    "region": "tr.istanbul",
    "bio": "Fictional admiral for the Bosporus and the Dardanelles."
  },
  {
    "id": "tr_aegean",
    "name": "Burcu Aslan",
    "title": "Aegean command",
    "rank": "Korgeneral",
    "branch": "Army",
    "slot": "field_officer",
    "war": 58,
    "int": 52,
    "pol": 26,
    "chr": 40,
    "personality": "loyalist",
    "region": "tr.izmir",
    "bio": "Fictional Aegean commander at İzmir."
  },
  {
    "id": "tr_east",
    "name": "Serkan Yıldırım",
    "title": "Eastern command",
    "rank": "Korgeneral",
    "branch": "Army",
    "slot": "field_officer",
    "war": 64,
    "int": 50,
    "pol": 24,
    "chr": 36,
    "personality": "recluse",
    "region": "tr.erzurum",
    "bio": "Fictional eastern commander. No road continues into the Soviet Union."
  },
  {
    "id": "tr_se",
    "name": "Fatma Koç",
    "title": "Southeastern command",
    "rank": "Tümgeneral",
    "branch": "Army",
    "slot": "field_officer",
    "war": 52,
    "int": 48,
    "pol": 26,
    "chr": 38,
    "personality": "schemer",
    "region": "tr.diyarbakir",
    "bio": "Fictional southeastern commander."
  },
  {
    "id": "tr_cyprus",
    "name": "Emre Şahin",
    "title": "Mersin sea link",
    "rank": "Tuğamiral",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 48,
    "int": 54,
    "pol": 28,
    "chr": 40,
    "personality": "merchant",
    "region": "tr.mersin",
    "bio": "Fictional admiral on the ferry run to Kyrenia."
  },
  {
    "id": "tr_coal",
    "name": "Orhan Çetin",
    "title": "Black Sea mines",
    "rank": "Albay",
    "branch": "Gendarmerie",
    "slot": "field_officer",
    "war": 40,
    "int": 44,
    "pol": 24,
    "chr": 36,
    "personality": "merchant",
    "region": "tr.zonguldak",
    "bio": "Fictional colonel for the Zonguldak coal."
  }
]),
});
