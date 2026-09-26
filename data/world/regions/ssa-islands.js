/** Madagascar and the island states, 1985-89. Reunion and Mayotte are French. */
import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const MADAGASCAR_REGION = land({
  "id": "mg",
  "name": "Madagascar",
  "country": "MG",
  "bbox": {
    "minLon": 42.92,
    "maxLon": 50.15,
    "minLat": -24.1,
    "maxLat": -11.53
  },
  "notes": "Atlas only. Six provinces, the first-level map until 2004. Coffee and rice are the yields. Vanilla and cloves are not separate resources. Occupied and off the week-0 march.",
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
      "id": "MG-AV",
      "name": "Antananarivo",
      "kind": "province",
      "group": null
    },
    {
      "id": "MG-AS",
      "name": "Antsiranana",
      "kind": "province",
      "group": null
    },
    {
      "id": "MG-FI",
      "name": "Fianarantsoa",
      "kind": "province",
      "group": null
    },
    {
      "id": "MG-MJ",
      "name": "Mahajanga",
      "kind": "province",
      "group": null
    },
    {
      "id": "MG-TM",
      "name": "Toamasina",
      "kind": "province",
      "group": null
    },
    {
      "id": "MG-TL",
      "name": "Toliara",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "antananarivo",
      "Antananarivo",
      "MG-AV",
      -18.91,
      47.53,
      "capital",
      [
        "administration",
        "rice"
      ]
    ],
    [
      "antsiranana",
      "Antsiranana",
      "MG-AS",
      -12.28,
      49.29,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "fianarantsoa",
      "Fianarantsoa",
      "MG-FI",
      -21.45,
      47.09,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "mahajanga",
      "Mahajanga",
      "MG-MJ",
      -15.72,
      46.32,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "toamasina",
      "Toamasina",
      "MG-TM",
      -18.15,
      49.4,
      "capital",
      [
        "port"
      ]
    ],
    [
      "toliara",
      "Toliara",
      "MG-TL",
      -23.35,
      43.67,
      "capital",
      [
        "fisheries",
        "cattle"
      ]
    ]
  ],
  "links": [
    [
      "antananarivo",
      "toamasina",
      "road",
      "national road"
    ],
    [
      "antananarivo",
      "fianarantsoa",
      "road",
      "national road"
    ],
    [
      "antananarivo",
      "mahajanga",
      "road",
      "national road"
    ],
    [
      "fianarantsoa",
      "toliara",
      "road",
      "national road"
    ],
    [
      "mahajanga",
      "antsiranana",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "mg_0",
    "name": "Hery Rakoto",
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
    "region": "mg.antananarivo"
  },
  {
    "id": "mg_1",
    "name": "Voahangy Rabe",
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
    "region": "mg.antsiranana"
  },
  {
    "id": "mg_2",
    "name": "Rado Rasoa",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mg.fianarantsoa"
  }
])
});

export const COMOROS_REGION = land({
  "id": "km",
  "name": "Comoros",
  "country": "KM",
  "bbox": {
    "minLon": 42.51,
    "maxLon": 45.15,
    "minLat": -13.03,
    "maxLat": -10.95
  },
  "notes": "Atlas only. Three islands: Grande Comore, Anjouan, and Moheli. Mayotte is not a Comorian island. Ylang and cloves are not separate yields. Occupied and off the week-0 march.",
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
      "id": "KM-GC",
      "name": "Grande Comore",
      "kind": "island",
      "group": null
    },
    {
      "id": "KM-AN",
      "name": "Anjouan",
      "kind": "island",
      "group": null
    },
    {
      "id": "KM-MO",
      "name": "Moheli",
      "kind": "island",
      "group": null
    }
  ],
  "cities": [
    [
      "moroni",
      "Moroni",
      "KM-GC",
      -11.7,
      43.26,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "mutsamudu",
      "Mutsamudu",
      "KM-AN",
      -12.17,
      44.4,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "fomboni",
      "Fomboni",
      "KM-MO",
      -12.28,
      43.74,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "moroni",
      "mutsamudu",
      "sea",
      "inter-island"
    ],
    [
      "moroni",
      "fomboni",
      "sea",
      "inter-island"
    ]
  ],
  "officers": staff([
  {
    "id": "km_0",
    "name": "Abdoul Hamadi",
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
    "region": "km.moroni"
  },
  {
    "id": "km_1",
    "name": "Fatima Said",
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
    "region": "km.fomboni"
  },
  {
    "id": "km_2",
    "name": "Harouna Abdou",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "km.mutsamudu"
  }
])
});

export const MAURITIUS_REGION = land({
  "id": "mu",
  "name": "Mauritius",
  "country": "MU",
  "bbox": {
    "minLon": 56.66,
    "maxLon": 64.17,
    "minLat": -21.27,
    "maxLat": -18.93
  },
  "notes": "Atlas only. Nine districts plus Rodrigues. Sugar is the main yield. Rodrigues is reached by sea. Occupied and off the week-0 march.",
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
      "id": "MU-BL",
      "name": "Black River",
      "kind": "district",
      "group": null
    },
    {
      "id": "MU-FL",
      "name": "Flacq",
      "kind": "district",
      "group": null
    },
    {
      "id": "MU-GP",
      "name": "Grand Port",
      "kind": "district",
      "group": null
    },
    {
      "id": "MU-MO",
      "name": "Moka",
      "kind": "district",
      "group": null
    },
    {
      "id": "MU-PA",
      "name": "Pamplemousses",
      "kind": "district",
      "group": null
    },
    {
      "id": "MU-PW",
      "name": "Plaines Wilhems",
      "kind": "district",
      "group": null
    },
    {
      "id": "MU-PL",
      "name": "Port Louis",
      "kind": "district",
      "group": null
    },
    {
      "id": "MU-RR",
      "name": "Riviere du Rempart",
      "kind": "district",
      "group": null
    },
    {
      "id": "MU-SA",
      "name": "Savanne",
      "kind": "district",
      "group": null
    },
    {
      "id": "MU-RO",
      "name": "Rodrigues",
      "kind": "district",
      "group": null
    }
  ],
  "cities": [
    [
      "bambous",
      "Bambous",
      "MU-BL",
      -20.26,
      57.41,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "flacq",
      "Centre de Flacq",
      "MU-FL",
      -20.19,
      57.72,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "mahebourg",
      "Mahebourg",
      "MU-GP",
      -20.41,
      57.7,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "moka",
      "Moka",
      "MU-MO",
      -20.22,
      57.5,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "pamplemousses",
      "Pamplemousses",
      "MU-PA",
      -20.11,
      57.58,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "curepipe",
      "Curepipe",
      "MU-PW",
      -20.32,
      57.52,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "port_louis",
      "Port Louis",
      "MU-PL",
      -20.16,
      57.5,
      "capital",
      [
        "administration",
        "port",
        "sugarcane"
      ]
    ],
    [
      "mapou",
      "Mapou",
      "MU-RR",
      -20.08,
      57.66,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "souillac",
      "Souillac",
      "MU-SA",
      -20.52,
      57.52,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "port_mathurin",
      "Port Mathurin",
      "MU-RO",
      -19.68,
      63.42,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "port_louis",
      "port_mathurin",
      "sea",
      "Rodrigues lane"
    ],
    [
      "moka",
      "port_louis",
      "road",
      "national road"
    ],
    [
      "pamplemousses",
      "mapou",
      "road",
      "national road"
    ],
    [
      "port_louis",
      "pamplemousses",
      "road",
      "national road"
    ],
    [
      "bambous",
      "moka",
      "road",
      "national road"
    ],
    [
      "moka",
      "curepipe",
      "road",
      "national road"
    ],
    [
      "mapou",
      "flacq",
      "road",
      "national road"
    ],
    [
      "curepipe",
      "souillac",
      "road",
      "national road"
    ],
    [
      "curepipe",
      "mahebourg",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "mu_0",
    "name": "Anil Ramdin",
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
    "region": "mu.port_louis"
  },
  {
    "id": "mu_1",
    "name": "Devi Chetty",
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
    "region": "mu.bambous"
  },
  {
    "id": "mu_2",
    "name": "Jean Baptiste",
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
    "region": "mu.curepipe"
  },
  {
    "id": "mu_3",
    "name": "Priya Gopal",
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
    "region": "mu.flacq"
  },
  {
    "id": "mu_4",
    "name": "Raj Laval",
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
    "region": "mu.mahebourg"
  }
])
});

export const SEYCHELLES_REGION = land({
  "id": "sc",
  "name": "Seychelles",
  "country": "SC",
  "bbox": {
    "minLon": 54.7,
    "maxLon": 56.58,
    "minLat": -5.37,
    "maxLat": -3.57
  },
  "notes": "Atlas only. Mahe, Praslin, and La Digue, linked by sea. The 23 districts are not drawn. Subdivision ids are SC- so they do not match South Carolina. Occupied and off the week-0 march.",
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
      "id": "SC-MA",
      "name": "Mahe",
      "kind": "island",
      "group": null
    },
    {
      "id": "SC-PR",
      "name": "Praslin",
      "kind": "island",
      "group": null
    },
    {
      "id": "SC-LD",
      "name": "La Digue",
      "kind": "island",
      "group": null
    }
  ],
  "cities": [
    [
      "victoria",
      "Victoria",
      "SC-MA",
      -4.62,
      55.45,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "grand_anse",
      "Grand Anse",
      "SC-PR",
      -4.32,
      55.74,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "la_passe",
      "La Passe",
      "SC-LD",
      -4.35,
      55.83,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "victoria",
      "grand_anse",
      "sea",
      "inter-island"
    ],
    [
      "grand_anse",
      "la_passe",
      "sea",
      "inter-island"
    ]
  ],
  "officers": staff([
  {
    "id": "sc_0",
    "name": "Jules Hoareau",
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
    "region": "sc.victoria"
  },
  {
    "id": "sc_1",
    "name": "Marie Payet",
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
    "region": "sc.grand_anse"
  },
  {
    "id": "sc_2",
    "name": "Alain Camille",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sc.la_passe"
  }
])
});

export const CAPE_VERDE_REGION = land({
  "id": "cv",
  "name": "Cape Verde",
  "country": "CV",
  "bbox": {
    "minLon": -25.81,
    "maxLon": -22.17,
    "minLat": 14.12,
    "maxLat": 17.93
  },
  "notes": "Atlas only. Nine inhabited islands, linked by sea. The concelhos are not drawn. Santa Luzia is uninhabited and is not pinned. The lane to Dakar is the mainland tie. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "CV-ST",
      "name": "Santiago",
      "kind": "island",
      "group": null
    },
    {
      "id": "CV-SV",
      "name": "Sao Vicente",
      "kind": "island",
      "group": null
    },
    {
      "id": "CV-SL",
      "name": "Sal",
      "kind": "island",
      "group": null
    },
    {
      "id": "CV-BV",
      "name": "Boa Vista",
      "kind": "island",
      "group": null
    },
    {
      "id": "CV-SN",
      "name": "Sao Nicolau",
      "kind": "island",
      "group": null
    },
    {
      "id": "CV-FG",
      "name": "Fogo",
      "kind": "island",
      "group": null
    },
    {
      "id": "CV-MA",
      "name": "Maio",
      "kind": "island",
      "group": null
    },
    {
      "id": "CV-SA",
      "name": "Santo Antao",
      "kind": "island",
      "group": null
    },
    {
      "id": "CV-BR",
      "name": "Brava",
      "kind": "island",
      "group": null
    }
  ],
  "cities": [
    [
      "praia",
      "Praia",
      "CV-ST",
      14.92,
      -23.51,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "mindelo",
      "Mindelo",
      "CV-SV",
      16.89,
      -24.99,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "espargos",
      "Espargos",
      "CV-SL",
      16.73,
      -22.94,
      "capital",
      [
        "port"
      ]
    ],
    [
      "sal_rei",
      "Sal Rei",
      "CV-BV",
      16.18,
      -22.92,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ribeira_brava",
      "Ribeira Brava",
      "CV-SN",
      16.62,
      -24.3,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "sao_filipe",
      "Sao Filipe",
      "CV-FG",
      14.9,
      -24.5,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "vila_do_maio",
      "Vila do Maio",
      "CV-MA",
      15.14,
      -23.21,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ribeira_grande",
      "Ribeira Grande",
      "CV-SA",
      17.18,
      -25.06,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "nova_sintra",
      "Nova Sintra",
      "CV-BR",
      14.87,
      -24.7,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "praia",
      "mindelo",
      "sea",
      "inter-island"
    ],
    [
      "praia",
      "vila_do_maio",
      "sea",
      "inter-island"
    ],
    [
      "praia",
      "sao_filipe",
      "sea",
      "inter-island"
    ],
    [
      "sao_filipe",
      "nova_sintra",
      "sea",
      "inter-island"
    ],
    [
      "mindelo",
      "ribeira_brava",
      "sea",
      "inter-island"
    ],
    [
      "mindelo",
      "ribeira_grande",
      "sea",
      "inter-island"
    ],
    [
      "mindelo",
      "espargos",
      "sea",
      "inter-island"
    ],
    [
      "espargos",
      "sal_rei",
      "sea",
      "inter-island"
    ]
  ],
  "officers": staff([
  {
    "id": "cv_0",
    "name": "Lidia Semedo",
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
    "region": "cv.praia"
  },
  {
    "id": "cv_1",
    "name": "Paulo Tavares",
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
    "region": "cv.espargos"
  },
  {
    "id": "cv_2",
    "name": "Celeste Correia",
    "title": "Chief of Staff",
    "rank": "Coronel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "cv.mindelo"
  },
  {
    "id": "cv_3",
    "name": "Duarte Monteiro",
    "title": "Front commander",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "cv.nova_sintra"
  },
  {
    "id": "cv_4",
    "name": "Ines Barbosa",
    "title": "Field officer",
    "rank": "Capitão",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "cv.ribeira_brava"
  }
])
});

export const REUNION_REGION = land({
  "id": "re",
  "name": "Réunion",
  "country": "RE",
  "bbox": {
    "minLon": 54.52,
    "maxLon": 56.46,
    "minLat": -22.09,
    "maxLat": -20.13
  },
  "notes": "Atlas only. French overseas department. Four arrondissements. Sugar is the lowland yield. Not part of metropolitan France. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "RE-SD",
      "name": "Saint-Denis",
      "kind": "arrondissement",
      "group": null
    },
    {
      "id": "RE-SP",
      "name": "Saint-Pierre",
      "kind": "arrondissement",
      "group": null
    },
    {
      "id": "RE-SB",
      "name": "Saint-Benoit",
      "kind": "arrondissement",
      "group": null
    },
    {
      "id": "RE-PA",
      "name": "Saint-Paul",
      "kind": "arrondissement",
      "group": null
    }
  ],
  "cities": [
    [
      "saint_denis",
      "Saint-Denis",
      "RE-SD",
      -20.88,
      55.45,
      "capital",
      [
        "administration",
        "port",
        "sugarcane"
      ]
    ],
    [
      "saint_pierre",
      "Saint-Pierre",
      "RE-SP",
      -21.34,
      55.48,
      "capital",
      [
        "sugarcane",
        "port"
      ]
    ],
    [
      "saint_benoit",
      "Saint-Benoit",
      "RE-SB",
      -21.04,
      55.71,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "saint_paul",
      "Saint-Paul",
      "RE-PA",
      -21.01,
      55.27,
      "capital",
      [
        "sugarcane",
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "saint_denis",
      "saint_paul",
      "road",
      "national road"
    ],
    [
      "saint_denis",
      "saint_benoit",
      "road",
      "national road"
    ],
    [
      "saint_benoit",
      "saint_pierre",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "re_0",
    "name": "Pierre Morel",
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
    "region": "re.saint_denis"
  },
  {
    "id": "re_1",
    "name": "Marie Bernard",
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
    "region": "re.saint_benoit"
  },
  {
    "id": "re_2",
    "name": "Jean Roux",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "re.saint_paul"
  }
])
});

export const MAYOTTE_REGION = land({
  "id": "yt",
  "name": "Mayotte",
  "country": "YT",
  "bbox": {
    "minLon": 44.48,
    "maxLon": 46.01,
    "minLat": -13.54,
    "maxLat": -12.03
  },
  "notes": "Atlas only. French. Not a Comorian island. Mamoudzou is the capital; Dzaoudzi, the old seat, is reached by ferry. Subdivision ids are YT- so they do not match Yukon. Occupied and off the week-0 march.",
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
      "id": "YT-MY",
      "name": "Mayotte",
      "kind": "collectivity",
      "group": null
    }
  ],
  "cities": [
    [
      "mamoudzou",
      "Mamoudzou",
      "YT-MY",
      -12.78,
      45.23,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "dzaoudzi",
      "Dzaoudzi",
      "YT-MY",
      -12.79,
      45.26,
      "city",
      [
        "port"
      ]
    ]
  ],
  "links": [
    [
      "mamoudzou",
      "dzaoudzi",
      "sea",
      "Mamoudzou-Dzaoudzi ferry"
    ]
  ],
  "officers": staff([
  {
    "id": "yt_0",
    "name": "Amina Attoumani",
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
    "region": "yt.mamoudzou"
  },
  {
    "id": "yt_1",
    "name": "Jean-Baptiste Salim",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 63,
    "int": 39,
    "pol": 29,
    "chr": 32,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "yt.dzaoudzi"
  }
])
});

