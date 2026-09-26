import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const MOROCCO_REGION = land({
  "id": "ma",
  "name": "Morocco",
  "country": "MA",
  "bbox": {
    "minLon": -17.43,
    "maxLon": 0.27,
    "minLat": 22.2,
    "maxLat": 37.28
  },
  "notes": "Atlas only. The provincial map at the end of the 1980s: 35 provinces and the wilayas of Casablanca and Rabat-Sale. Larache is not yet split out. Sidi Kacem is already a province. Western Sahara is not a separate state: Laayoune, Boujdour, Es Semara, and Oued Ed-Dahab are Moroccan provinces. The Algeria frontier is closed for most of 1985-89. Occupied and off the week-0 march.",
  "defaultBiome": "mediterranean",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "MA-AGD",
      "name": "Agadir",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-HOC",
      "name": "Al Hoceima",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-AZI",
      "name": "Azilal",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-BEM",
      "name": "Beni Mellal",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-BES",
      "name": "Ben Slimane",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-BOM",
      "name": "Boulemane",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-CAS",
      "name": "Casablanca",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "MA-CHE",
      "name": "Chaouen",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-JAD",
      "name": "El Jadida",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-KES",
      "name": "El Kelaa des Sraghna",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-ERR",
      "name": "Errachidia",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-ESS",
      "name": "Essaouira",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-FES",
      "name": "Fes",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-FIG",
      "name": "Figuig",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-GUE",
      "name": "Guelmim",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-IFR",
      "name": "Ifrane",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-KEN",
      "name": "Kenitra",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-KHE",
      "name": "Khemisset",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-KHN",
      "name": "Khenifra",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-KHO",
      "name": "Khouribga",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-LAA",
      "name": "Laayoune",
      "kind": "province",
      "group": "Western Sahara (Moroccan administration)"
    },
    {
      "id": "MA-MAR",
      "name": "Marrakech",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-MEK",
      "name": "Meknes",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-NAD",
      "name": "Nador",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-OUA",
      "name": "Ouarzazate",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-OUJ",
      "name": "Oujda",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-RAB",
      "name": "Rabat-Sale",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "MA-SAF",
      "name": "Safi",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-SET",
      "name": "Settat",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-SIK",
      "name": "Sidi Kacem",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-TNG",
      "name": "Tangier",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-TNT",
      "name": "Tan-Tan",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-TAO",
      "name": "Taounate",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-TAR",
      "name": "Taroudant",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-TAT",
      "name": "Tata",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-TAZ",
      "name": "Taza",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-TET",
      "name": "Tetouan",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-TIZ",
      "name": "Tiznit",
      "kind": "province",
      "group": null
    },
    {
      "id": "MA-BOD",
      "name": "Boujdour",
      "kind": "province",
      "group": "Western Sahara (Moroccan administration)"
    },
    {
      "id": "MA-ESM",
      "name": "Es Semara",
      "kind": "province",
      "group": "Western Sahara (Moroccan administration)"
    },
    {
      "id": "MA-OUD",
      "name": "Oued Ed-Dahab",
      "kind": "province",
      "group": "Western Sahara (Moroccan administration)"
    }
  ],
  "cities": [
    [
      "agadir",
      "Agadir",
      "MA-AGD",
      30.43,
      -9.6,
      "capital",
      [
        "fisheries",
        "citrus"
      ]
    ],
    [
      "hoceima",
      "Al Hoceima",
      "MA-HOC",
      35.25,
      -3.93,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "azilal",
      "Azilal",
      "MA-AZI",
      31.96,
      -6.57,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "beni_mellal",
      "Beni Mellal",
      "MA-BEM",
      32.34,
      -6.35,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ben_slimane",
      "Ben Slimane",
      "MA-BES",
      33.62,
      -7.12,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "boulemane",
      "Boulemane",
      "MA-BOM",
      33.36,
      -4.73,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "casablanca",
      "Casablanca",
      "MA-CAS",
      33.59,
      -7.62,
      "capital",
      [
        "port"
      ]
    ],
    [
      "chefchaouen",
      "Chefchaouen",
      "MA-CHE",
      35.17,
      -5.27,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "el_jadida",
      "El Jadida",
      "MA-JAD",
      33.23,
      -8.5,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kelaa",
      "El Kelaa des Sraghna",
      "MA-KES",
      32.05,
      -7.41,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "errachidia",
      "Errachidia",
      "MA-ERR",
      31.93,
      -4.43,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "essaouira",
      "Essaouira",
      "MA-ESS",
      31.51,
      -9.77,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "fes",
      "Fes",
      "MA-FES",
      34.03,
      -5.0,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "figuig",
      "Figuig",
      "MA-FIG",
      32.11,
      -1.23,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "guelmim",
      "Guelmim",
      "MA-GUE",
      28.99,
      -10.06,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ifrane",
      "Ifrane",
      "MA-IFR",
      33.53,
      -5.11,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kenitra",
      "Kenitra",
      "MA-KEN",
      34.26,
      -6.58,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "khemisset",
      "Khemisset",
      "MA-KHE",
      33.82,
      -6.07,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "khenifra",
      "Khenifra",
      "MA-KHN",
      32.94,
      -5.67,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "khouribga",
      "Khouribga",
      "MA-KHO",
      32.88,
      -6.91,
      "capital",
      [
        "phosphate"
      ]
    ],
    [
      "laayoune",
      "Laayoune",
      "MA-LAA",
      27.15,
      -13.2,
      "capital",
      [
        "phosphate",
        "fisheries"
      ]
    ],
    [
      "marrakech",
      "Marrakech",
      "MA-MAR",
      31.63,
      -8.01,
      "capital",
      [
        "olives"
      ]
    ],
    [
      "meknes",
      "Meknes",
      "MA-MEK",
      33.89,
      -5.55,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nador",
      "Nador",
      "MA-NAD",
      35.17,
      -2.93,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ouarzazate",
      "Ouarzazate",
      "MA-OUA",
      30.92,
      -6.91,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "oujda",
      "Oujda",
      "MA-OUJ",
      34.68,
      -1.91,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "rabat",
      "Rabat",
      "MA-RAB",
      34.02,
      -6.84,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "safi",
      "Safi",
      "MA-SAF",
      32.3,
      -9.24,
      "capital",
      [
        "phosphate",
        "port",
        "fisheries"
      ]
    ],
    [
      "settat",
      "Settat",
      "MA-SET",
      33.0,
      -7.62,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sidi_kacem",
      "Sidi Kacem",
      "MA-SIK",
      34.22,
      -5.71,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tangier",
      "Tangier",
      "MA-TNG",
      35.78,
      -5.8,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "tan_tan",
      "Tan-Tan",
      "MA-TNT",
      28.44,
      -11.1,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "taounate",
      "Taounate",
      "MA-TAO",
      34.54,
      -4.64,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "taroudant",
      "Taroudant",
      "MA-TAR",
      30.47,
      -8.88,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tata",
      "Tata",
      "MA-TAT",
      29.74,
      -7.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "taza",
      "Taza",
      "MA-TAZ",
      34.21,
      -4.01,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tetouan",
      "Tetouan",
      "MA-TET",
      35.57,
      -5.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tiznit",
      "Tiznit",
      "MA-TIZ",
      29.7,
      -9.73,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "boujdour",
      "Boujdour",
      "MA-BOD",
      26.13,
      -14.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "smara",
      "Smara",
      "MA-ESM",
      26.74,
      -11.67,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dakhla",
      "Dakhla",
      "MA-OUD",
      23.7,
      -15.93,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "kenitra",
      "rabat",
      "road",
      "highway"
    ],
    [
      "meknes",
      "sidi_kacem",
      "road",
      "highway"
    ],
    [
      "boulemane",
      "ifrane",
      "road",
      "highway"
    ],
    [
      "tangier",
      "tetouan",
      "road",
      "highway"
    ],
    [
      "chefchaouen",
      "tetouan",
      "road",
      "highway"
    ],
    [
      "ben_slimane",
      "casablanca",
      "road",
      "highway"
    ],
    [
      "azilal",
      "beni_mellal",
      "road",
      "highway"
    ],
    [
      "khemisset",
      "meknes",
      "road",
      "highway"
    ],
    [
      "ben_slimane",
      "rabat",
      "road",
      "highway"
    ],
    [
      "fes",
      "meknes",
      "road",
      "highway"
    ],
    [
      "fes",
      "ifrane",
      "road",
      "highway"
    ],
    [
      "casablanca",
      "settat",
      "road",
      "highway"
    ],
    [
      "fes",
      "taounate",
      "road",
      "highway"
    ],
    [
      "khouribga",
      "settat",
      "road",
      "highway"
    ],
    [
      "kenitra",
      "khemisset",
      "road",
      "highway"
    ],
    [
      "taounate",
      "taza",
      "road",
      "highway"
    ],
    [
      "agadir",
      "taroudant",
      "road",
      "highway"
    ],
    [
      "kelaa",
      "marrakech",
      "road",
      "highway"
    ],
    [
      "beni_mellal",
      "khouribga",
      "road",
      "highway"
    ],
    [
      "azilal",
      "kelaa",
      "road",
      "highway"
    ],
    [
      "agadir",
      "tiznit",
      "road",
      "highway"
    ],
    [
      "ifrane",
      "khenifra",
      "road",
      "highway"
    ],
    [
      "guelmim",
      "tiznit",
      "road",
      "highway"
    ],
    [
      "el_jadida",
      "settat",
      "road",
      "highway"
    ],
    [
      "chefchaouen",
      "taounate",
      "road",
      "highway"
    ],
    [
      "hoceima",
      "nador",
      "road",
      "highway"
    ],
    [
      "essaouira",
      "safi",
      "road",
      "highway"
    ],
    [
      "hoceima",
      "taounate",
      "road",
      "highway"
    ],
    [
      "nador",
      "oujda",
      "road",
      "highway"
    ],
    [
      "guelmim",
      "tan_tan",
      "road",
      "highway"
    ],
    [
      "taroudant",
      "tata",
      "road",
      "highway"
    ],
    [
      "azilal",
      "ouarzazate",
      "road",
      "highway"
    ],
    [
      "agadir",
      "essaouira",
      "road",
      "highway"
    ],
    [
      "el_jadida",
      "safi",
      "road",
      "highway"
    ],
    [
      "laayoune",
      "smara",
      "road",
      "highway"
    ],
    [
      "boulemane",
      "errachidia",
      "road",
      "highway"
    ],
    [
      "laayoune",
      "boujdour",
      "road",
      "highway"
    ],
    [
      "tan_tan",
      "smara",
      "road",
      "highway"
    ],
    [
      "figuig",
      "oujda",
      "road",
      "highway"
    ],
    [
      "boujdour",
      "dakhla",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "ma_0",
    "name": "Youssef Benkirane",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 30,
    "int": 66,
    "pol": 74,
    "chr": 62,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ma.rabat"
  },
  {
    "id": "ma_1",
    "name": "Khalid El Fassi",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Royal Armed Forces",
    "slot": "defense_minister",
    "war": 62,
    "int": 50,
    "pol": 42,
    "chr": 38,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ma.agadir"
  },
  {
    "id": "ma_2",
    "name": "Amal Squalli",
    "title": "Chief of Staff",
    "rank": "General",
    "branch": "Royal Armed Forces",
    "slot": "chief_of_staff",
    "war": 58,
    "int": 56,
    "pol": 44,
    "chr": 40,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ma.hoceima"
  },
  {
    "id": "ma_3",
    "name": "Rachid Bennis",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Royal Armed Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ma.azilal"
  },
  {
    "id": "ma_4",
    "name": "Driss Ouazzani",
    "title": "Southern command",
    "rank": "Colonel",
    "branch": "Royal Armed Forces",
    "slot": "field_officer",
    "war": 66,
    "int": 40,
    "pol": 32,
    "chr": 36,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ma.beni_mellal"
  },
  {
    "id": "ma_5",
    "name": "Amina Lahbabi",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Royal Armed Forces",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ma.ben_slimane"
  },
  {
    "id": "ma_6",
    "name": "Omar Cherkaoui",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Royal Armed Forces",
    "slot": "front_commander",
    "war": 70,
    "int": 38,
    "pol": 28,
    "chr": 32,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ma.boulemane"
  },
  {
    "id": "ma_7",
    "name": "Nadia Filali",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Royal Armed Forces",
    "slot": "front_commander",
    "war": 55,
    "int": 48,
    "pol": 44,
    "chr": 46,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ma.casablanca"
  }
])
});

export const ALGERIA_REGION = land({
  "id": "dz",
  "name": "Algeria",
  "country": "DZ",
  "bbox": {
    "minLon": -9.65,
    "maxLon": 9.98,
    "minLat": 21.29,
    "maxLat": 38.4
  },
  "notes": "Atlas only. Forty-eight wilayas of the 1984 reform, not the later ten. Oil and gas are at Ouargla and Laghouat. The Moroccan frontier stays closed for most of the window. Occupied and off the week-0 march.",
  "defaultBiome": "mediterranean",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "DZ-01",
      "name": "Adrar",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-02",
      "name": "Chlef",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-03",
      "name": "Laghouat",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-04",
      "name": "Oum El Bouaghi",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-05",
      "name": "Batna",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-06",
      "name": "Bejaia",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-07",
      "name": "Biskra",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-08",
      "name": "Bechar",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-09",
      "name": "Blida",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-10",
      "name": "Bouira",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-11",
      "name": "Tamanrasset",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-12",
      "name": "Tebessa",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-13",
      "name": "Tlemcen",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-14",
      "name": "Tiaret",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-15",
      "name": "Tizi Ouzou",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-16",
      "name": "Algiers",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-17",
      "name": "Djelfa",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-18",
      "name": "Jijel",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-19",
      "name": "Setif",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-20",
      "name": "Saida",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-21",
      "name": "Skikda",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-22",
      "name": "Sidi Bel Abbes",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-23",
      "name": "Annaba",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-24",
      "name": "Guelma",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-25",
      "name": "Constantine",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-26",
      "name": "Medea",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-27",
      "name": "Mostaganem",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-28",
      "name": "M'Sila",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-29",
      "name": "Mascara",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-30",
      "name": "Ouargla",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-31",
      "name": "Oran",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-32",
      "name": "El Bayadh",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-33",
      "name": "Illizi",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-34",
      "name": "Bordj Bou Arreridj",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-35",
      "name": "Boumerdes",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-36",
      "name": "El Tarf",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-37",
      "name": "Tindouf",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-38",
      "name": "Tissemsilt",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-39",
      "name": "El Oued",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-40",
      "name": "Khenchela",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-41",
      "name": "Souk Ahras",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-42",
      "name": "Tipaza",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-43",
      "name": "Mila",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-44",
      "name": "Ain Defla",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-45",
      "name": "Naama",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-46",
      "name": "Ain Temouchent",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-47",
      "name": "Ghardaia",
      "kind": "wilaya",
      "group": null
    },
    {
      "id": "DZ-48",
      "name": "Relizane",
      "kind": "wilaya",
      "group": null
    }
  ],
  "cities": [
    [
      "adrar",
      "Adrar",
      "DZ-01",
      27.87,
      -0.28,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "chlef",
      "Chlef",
      "DZ-02",
      36.16,
      1.33,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "laghouat",
      "Laghouat",
      "DZ-03",
      33.8,
      2.86,
      "capital",
      [
        "natural_gas"
      ]
    ],
    [
      "oum_el_bouaghi",
      "Oum El Bouaghi",
      "DZ-04",
      35.88,
      7.11,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "batna",
      "Batna",
      "DZ-05",
      35.56,
      6.17,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bejaia",
      "Bejaia",
      "DZ-06",
      36.75,
      5.08,
      "capital",
      [
        "port",
        "oil"
      ]
    ],
    [
      "biskra",
      "Biskra",
      "DZ-07",
      34.85,
      5.73,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bechar",
      "Bechar",
      "DZ-08",
      31.62,
      -2.22,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "blida",
      "Blida",
      "DZ-09",
      36.47,
      2.83,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bouira",
      "Bouira",
      "DZ-10",
      36.37,
      3.9,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tamanrasset",
      "Tamanrasset",
      "DZ-11",
      22.79,
      5.52,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tebessa",
      "Tebessa",
      "DZ-12",
      35.4,
      8.12,
      "capital",
      [
        "phosphate",
        "iron"
      ]
    ],
    [
      "tlemcen",
      "Tlemcen",
      "DZ-13",
      34.88,
      -1.32,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tiaret",
      "Tiaret",
      "DZ-14",
      35.37,
      1.32,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tizi_ouzou",
      "Tizi Ouzou",
      "DZ-15",
      36.72,
      4.05,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "algiers",
      "Algiers",
      "DZ-16",
      36.75,
      3.06,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "djelfa",
      "Djelfa",
      "DZ-17",
      34.67,
      3.25,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jijel",
      "Jijel",
      "DZ-18",
      36.82,
      5.77,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "setif",
      "Setif",
      "DZ-19",
      36.19,
      5.41,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "saida",
      "Saida",
      "DZ-20",
      34.83,
      0.15,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "skikda",
      "Skikda",
      "DZ-21",
      36.88,
      6.91,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "sidi_bel_abbes",
      "Sidi Bel Abbes",
      "DZ-22",
      35.19,
      -0.64,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "annaba",
      "Annaba",
      "DZ-23",
      36.9,
      7.76,
      "capital",
      [
        "steel",
        "port"
      ]
    ],
    [
      "guelma",
      "Guelma",
      "DZ-24",
      36.46,
      7.43,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "constantine",
      "Constantine",
      "DZ-25",
      36.37,
      6.61,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "medea",
      "Medea",
      "DZ-26",
      36.26,
      2.75,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mostaganem",
      "Mostaganem",
      "DZ-27",
      35.93,
      0.09,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "msila",
      "M'Sila",
      "DZ-28",
      35.7,
      4.54,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mascara",
      "Mascara",
      "DZ-29",
      35.4,
      0.14,
      "capital",
      [
        "grapes"
      ]
    ],
    [
      "ouargla",
      "Ouargla",
      "DZ-30",
      31.95,
      5.32,
      "capital",
      [
        "oil",
        "natural_gas"
      ]
    ],
    [
      "oran",
      "Oran",
      "DZ-31",
      35.7,
      -0.63,
      "capital",
      [
        "port",
        "grapes"
      ]
    ],
    [
      "el_bayadh",
      "El Bayadh",
      "DZ-32",
      33.68,
      1.02,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "illizi",
      "Illizi",
      "DZ-33",
      26.51,
      8.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bordj",
      "Bordj Bou Arreridj",
      "DZ-34",
      36.07,
      4.76,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "boumerdes",
      "Boumerdes",
      "DZ-35",
      36.76,
      3.47,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "el_tarf",
      "El Tarf",
      "DZ-36",
      36.77,
      8.31,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tindouf",
      "Tindouf",
      "DZ-37",
      27.67,
      -8.15,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tissemsilt",
      "Tissemsilt",
      "DZ-38",
      35.61,
      1.81,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "el_oued",
      "El Oued",
      "DZ-39",
      33.37,
      6.86,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "khenchela",
      "Khenchela",
      "DZ-40",
      35.44,
      7.14,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "souk_ahras",
      "Souk Ahras",
      "DZ-41",
      36.29,
      7.95,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tipaza",
      "Tipaza",
      "DZ-42",
      36.59,
      2.45,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mila",
      "Mila",
      "DZ-43",
      36.45,
      6.26,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ain_defla",
      "Ain Defla",
      "DZ-44",
      36.26,
      1.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "naama",
      "Naama",
      "DZ-45",
      33.27,
      -0.31,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ain_temouchent",
      "Ain Temouchent",
      "DZ-46",
      35.3,
      -1.14,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ghardaia",
      "Ghardaia",
      "DZ-47",
      32.49,
      3.67,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "relizane",
      "Relizane",
      "DZ-48",
      35.74,
      0.56,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "blida",
      "medea",
      "road",
      "highway"
    ],
    [
      "constantine",
      "mila",
      "road",
      "highway"
    ],
    [
      "blida",
      "tipaza",
      "road",
      "highway"
    ],
    [
      "algiers",
      "boumerdes",
      "road",
      "highway"
    ],
    [
      "blida",
      "algiers",
      "road",
      "highway"
    ],
    [
      "bouira",
      "tizi_ouzou",
      "road",
      "highway"
    ],
    [
      "msila",
      "bordj",
      "road",
      "highway"
    ],
    [
      "sidi_bel_abbes",
      "ain_temouchent",
      "road",
      "highway"
    ],
    [
      "mostaganem",
      "relizane",
      "road",
      "highway"
    ],
    [
      "oum_el_bouaghi",
      "khenchela",
      "road",
      "highway"
    ],
    [
      "tlemcen",
      "ain_temouchent",
      "road",
      "highway"
    ],
    [
      "guelma",
      "souk_ahras",
      "road",
      "highway"
    ],
    [
      "annaba",
      "el_tarf",
      "road",
      "highway"
    ],
    [
      "tiaret",
      "tissemsilt",
      "road",
      "highway"
    ],
    [
      "tizi_ouzou",
      "boumerdes",
      "road",
      "highway"
    ],
    [
      "mascara",
      "relizane",
      "road",
      "highway"
    ],
    [
      "tipaza",
      "ain_defla",
      "road",
      "highway"
    ],
    [
      "sidi_bel_abbes",
      "oran",
      "road",
      "highway"
    ],
    [
      "annaba",
      "guelma",
      "road",
      "highway"
    ],
    [
      "chlef",
      "ain_defla",
      "road",
      "highway"
    ],
    [
      "setif",
      "bordj",
      "road",
      "highway"
    ],
    [
      "jijel",
      "mila",
      "road",
      "highway"
    ],
    [
      "bejaia",
      "jijel",
      "road",
      "highway"
    ],
    [
      "skikda",
      "constantine",
      "road",
      "highway"
    ],
    [
      "saida",
      "mascara",
      "road",
      "highway"
    ],
    [
      "skikda",
      "guelma",
      "road",
      "highway"
    ],
    [
      "bejaia",
      "setif",
      "road",
      "highway"
    ],
    [
      "mostaganem",
      "oran",
      "road",
      "highway"
    ],
    [
      "oum_el_bouaghi",
      "guelma",
      "road",
      "highway"
    ],
    [
      "tissemsilt",
      "ain_defla",
      "road",
      "highway"
    ],
    [
      "tiaret",
      "relizane",
      "road",
      "highway"
    ],
    [
      "bouira",
      "bordj",
      "road",
      "highway"
    ],
    [
      "batna",
      "biskra",
      "road",
      "highway"
    ],
    [
      "batna",
      "khenchela",
      "road",
      "highway"
    ],
    [
      "tebessa",
      "khenchela",
      "road",
      "highway"
    ],
    [
      "laghouat",
      "djelfa",
      "road",
      "highway"
    ],
    [
      "el_bayadh",
      "naama",
      "road",
      "highway"
    ],
    [
      "saida",
      "el_bayadh",
      "road",
      "highway"
    ],
    [
      "djelfa",
      "msila",
      "road",
      "highway"
    ],
    [
      "laghouat",
      "ghardaia",
      "road",
      "highway"
    ],
    [
      "ouargla",
      "ghardaia",
      "road",
      "highway"
    ],
    [
      "biskra",
      "el_oued",
      "road",
      "highway"
    ],
    [
      "bechar",
      "naama",
      "road",
      "highway"
    ],
    [
      "adrar",
      "bechar",
      "road",
      "highway"
    ],
    [
      "tamanrasset",
      "illizi",
      "road",
      "highway"
    ],
    [
      "ouargla",
      "illizi",
      "road",
      "highway"
    ],
    [
      "bechar",
      "tindouf",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "dz_0",
    "name": "Mourad Belkacem",
    "title": "President",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 40,
    "int": 62,
    "pol": 70,
    "chr": 48,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dz.algiers"
  },
  {
    "id": "dz_1",
    "name": "Samira Hadj",
    "title": "Minister of Defense",
    "rank": "Colonel",
    "branch": "National People's Army",
    "slot": "defense_minister",
    "war": 60,
    "int": 52,
    "pol": 40,
    "chr": 36,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dz.adrar"
  },
  {
    "id": "dz_2",
    "name": "Farid Khelifi",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "National People's Army",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dz.chlef"
  },
  {
    "id": "dz_3",
    "name": "Nassim Belkacem",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "National People's Army",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dz.laghouat"
  },
  {
    "id": "dz_4",
    "name": "Leila Mansouri",
    "title": "Sahara sector",
    "rank": "Commandant",
    "branch": "National People's Army",
    "slot": "field_officer",
    "war": 52,
    "int": 58,
    "pol": 30,
    "chr": 28,
    "personality": "recluse",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dz.oum_el_bouaghi"
  },
  {
    "id": "dz_5",
    "name": "Karima Zeroual",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "National People's Army",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dz.batna"
  },
  {
    "id": "dz_6",
    "name": "Hocine Mekki",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "National People's Army",
    "slot": "front_commander",
    "war": 70,
    "int": 38,
    "pol": 28,
    "chr": 32,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dz.bejaia"
  },
  {
    "id": "dz_7",
    "name": "Yamina Cherif",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "National People's Army",
    "slot": "front_commander",
    "war": 55,
    "int": 48,
    "pol": 44,
    "chr": 46,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dz.biskra"
  }
])
});

export const TUNISIA_REGION = land({
  "id": "tn",
  "name": "Tunisia",
  "country": "TN",
  "bbox": {
    "minLon": 6.63,
    "maxLon": 12.56,
    "minLat": 31.43,
    "maxLat": 38.77
  },
  "notes": "Atlas only. Twenty-three governorates. Ariana and Ben Arous date from 1983. Manouba is not split until 2000. Subdivision ids are TN- so they do not match Tennessee. Phosphate is at Gafsa, oil at Sfax. Occupied and off the week-0 march.",
  "defaultBiome": "mediterranean",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "TN-11",
      "name": "Tunis",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-12",
      "name": "Ariana",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-13",
      "name": "Ben Arous",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-21",
      "name": "Nabeul",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-22",
      "name": "Zaghouan",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-23",
      "name": "Bizerte",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-31",
      "name": "Beja",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-32",
      "name": "Jendouba",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-33",
      "name": "Le Kef",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-34",
      "name": "Siliana",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-41",
      "name": "Kairouan",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-42",
      "name": "Kasserine",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-43",
      "name": "Sidi Bouzid",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-51",
      "name": "Sousse",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-52",
      "name": "Monastir",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-53",
      "name": "Mahdia",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-61",
      "name": "Sfax",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-71",
      "name": "Gafsa",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-72",
      "name": "Tozeur",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-73",
      "name": "Kebili",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-81",
      "name": "Gabes",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-82",
      "name": "Medenine",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "TN-83",
      "name": "Tataouine",
      "kind": "governorate",
      "group": null
    }
  ],
  "cities": [
    [
      "tunis",
      "Tunis",
      "TN-11",
      36.81,
      10.18,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "ariana",
      "Ariana",
      "TN-12",
      36.86,
      10.19,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ben_arous",
      "Ben Arous",
      "TN-13",
      36.75,
      10.22,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nabeul",
      "Nabeul",
      "TN-21",
      36.46,
      10.74,
      "capital",
      [
        "citrus"
      ]
    ],
    [
      "zaghouan",
      "Zaghouan",
      "TN-22",
      36.4,
      10.14,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bizerte",
      "Bizerte",
      "TN-23",
      37.27,
      9.87,
      "capital",
      [
        "port",
        "steel"
      ]
    ],
    [
      "beja",
      "Beja",
      "TN-31",
      36.73,
      9.18,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jendouba",
      "Jendouba",
      "TN-32",
      36.5,
      8.78,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kef",
      "Le Kef",
      "TN-33",
      36.17,
      8.71,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "siliana",
      "Siliana",
      "TN-34",
      36.08,
      9.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kairouan",
      "Kairouan",
      "TN-41",
      35.68,
      10.1,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kasserine",
      "Kasserine",
      "TN-42",
      35.17,
      8.84,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sidi_bouzid",
      "Sidi Bouzid",
      "TN-43",
      35.04,
      9.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sousse",
      "Sousse",
      "TN-51",
      35.83,
      10.64,
      "capital",
      [
        "olives",
        "port"
      ]
    ],
    [
      "monastir",
      "Monastir",
      "TN-52",
      35.76,
      10.81,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mahdia",
      "Mahdia",
      "TN-53",
      35.5,
      11.06,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sfax",
      "Sfax",
      "TN-61",
      34.74,
      10.76,
      "capital",
      [
        "oil",
        "phosphate",
        "port"
      ]
    ],
    [
      "gafsa",
      "Gafsa",
      "TN-71",
      34.43,
      8.78,
      "capital",
      [
        "phosphate"
      ]
    ],
    [
      "tozeur",
      "Tozeur",
      "TN-72",
      33.92,
      8.13,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kebili",
      "Kebili",
      "TN-73",
      33.7,
      8.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gabes",
      "Gabes",
      "TN-81",
      33.88,
      10.1,
      "capital",
      [
        "phosphate",
        "port"
      ]
    ],
    [
      "medenine",
      "Medenine",
      "TN-82",
      33.35,
      10.49,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tataouine",
      "Tataouine",
      "TN-83",
      32.93,
      10.45,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "tunis",
      "ariana",
      "road",
      "highway"
    ],
    [
      "tunis",
      "ben_arous",
      "road",
      "highway"
    ],
    [
      "sousse",
      "monastir",
      "road",
      "highway"
    ],
    [
      "monastir",
      "mahdia",
      "road",
      "highway"
    ],
    [
      "jendouba",
      "kef",
      "road",
      "highway"
    ],
    [
      "ben_arous",
      "zaghouan",
      "road",
      "highway"
    ],
    [
      "beja",
      "jendouba",
      "road",
      "highway"
    ],
    [
      "medenine",
      "tataouine",
      "road",
      "highway"
    ],
    [
      "kairouan",
      "sousse",
      "road",
      "highway"
    ],
    [
      "ariana",
      "bizerte",
      "road",
      "highway"
    ],
    [
      "nabeul",
      "zaghouan",
      "road",
      "highway"
    ],
    [
      "kasserine",
      "sidi_bouzid",
      "road",
      "highway"
    ],
    [
      "kef",
      "siliana",
      "road",
      "highway"
    ],
    [
      "gabes",
      "medenine",
      "road",
      "highway"
    ],
    [
      "nabeul",
      "sousse",
      "road",
      "highway"
    ],
    [
      "zaghouan",
      "siliana",
      "road",
      "highway"
    ],
    [
      "tozeur",
      "kebili",
      "road",
      "highway"
    ],
    [
      "gafsa",
      "tozeur",
      "road",
      "highway"
    ],
    [
      "kasserine",
      "gafsa",
      "road",
      "highway"
    ],
    [
      "mahdia",
      "sfax",
      "road",
      "highway"
    ],
    [
      "kairouan",
      "sidi_bouzid",
      "road",
      "highway"
    ],
    [
      "kebili",
      "gabes",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "tn_0",
    "name": "Tahar Ben Youssef",
    "title": "President",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 34,
    "int": 60,
    "pol": 68,
    "chr": 55,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tn.tunis"
  },
  {
    "id": "tn_1",
    "name": "Sami Jaziri",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Tunisian Army",
    "slot": "defense_minister",
    "war": 58,
    "int": 50,
    "pol": 42,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tn.ariana"
  },
  {
    "id": "tn_2",
    "name": "Hela Trabelsi",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Tunisian Army",
    "slot": "chief_of_staff",
    "war": 50,
    "int": 54,
    "pol": 46,
    "chr": 48,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tn.ben_arous"
  },
  {
    "id": "tn_3",
    "name": "Rim Mejri",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Tunisian Army",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tn.nabeul"
  },
  {
    "id": "tn_4",
    "name": "Nizar Chaabane",
    "title": "Southern command",
    "rank": "Colonel",
    "branch": "Tunisian Army",
    "slot": "field_officer",
    "war": 42,
    "int": 48,
    "pol": 40,
    "chr": 44,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tn.zaghouan"
  },
  {
    "id": "tn_5",
    "name": "Lotfi Gharbi",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Tunisian Army",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "tn.bizerte"
  }
])
});
