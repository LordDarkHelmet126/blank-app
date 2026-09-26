import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const CZECHOSLOVAKIA_REGION = land({
  "id": "cs",
  "name": "Czechoslovakia",
  "country": "CS",
  "bbox": {
    "minLon": 11.88,
    "maxLon": 22.76,
    "minLat": 46.65,
    "maxLat": 52.16
  },
  "notes": "Atlas only. One federal state. The Czech Socialist Republic and the Slovak Socialist Republic are groups on the 1960 kraje, plus Prague and Bratislava as separate cities. Středočeský and Západoslovenský kept their offices in the republican capitals; the pins sit at Kladno and Trnava, inside the kraje. Příbram is the uranium camp. The country is not split. Occupied and off the week-0 march.",
  "defaultBiome": "temperate",
  "climate": {
    "_default": {
      "sun": 2,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "CS-PR",
      "name": "Prague",
      "kind": "city",
      "group": "Czech Socialist Republic"
    },
    {
      "id": "CS-SC",
      "name": "Středočeský",
      "kind": "kraj",
      "group": "Czech Socialist Republic"
    },
    {
      "id": "CS-JC",
      "name": "Jihočeský",
      "kind": "kraj",
      "group": "Czech Socialist Republic"
    },
    {
      "id": "CS-ZC",
      "name": "Západočeský",
      "kind": "kraj",
      "group": "Czech Socialist Republic"
    },
    {
      "id": "CS-NC",
      "name": "Severočeský",
      "kind": "kraj",
      "group": "Czech Socialist Republic"
    },
    {
      "id": "CS-EC",
      "name": "Východočeský",
      "kind": "kraj",
      "group": "Czech Socialist Republic"
    },
    {
      "id": "CS-JM",
      "name": "Jihomoravský",
      "kind": "kraj",
      "group": "Czech Socialist Republic"
    },
    {
      "id": "CS-SM",
      "name": "Severomoravský",
      "kind": "kraj",
      "group": "Czech Socialist Republic"
    },
    {
      "id": "CS-BA",
      "name": "Bratislava",
      "kind": "city",
      "group": "Slovak Socialist Republic"
    },
    {
      "id": "CS-ZS",
      "name": "Západoslovenský",
      "kind": "kraj",
      "group": "Slovak Socialist Republic"
    },
    {
      "id": "CS-SS",
      "name": "Stredoslovenský",
      "kind": "kraj",
      "group": "Slovak Socialist Republic"
    },
    {
      "id": "CS-VS",
      "name": "Východoslovenský",
      "kind": "kraj",
      "group": "Slovak Socialist Republic"
    }
  ],
  "cities": [
    [
      "prague",
      "Prague",
      "CS-PR",
      50.08,
      14.44,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kladno",
      "Kladno",
      "CS-SC",
      50.14,
      14.1,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "ceske_budejovice",
      "České Budějovice",
      "CS-JC",
      48.97,
      14.47,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "plzen",
      "Plzeň",
      "CS-ZC",
      49.75,
      13.38,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "usti",
      "Ústí nad Labem",
      "CS-NC",
      50.66,
      14.04,
      "capital",
      [
        "lignite"
      ]
    ],
    [
      "hradec",
      "Hradec Králové",
      "CS-EC",
      50.21,
      15.83,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "brno",
      "Brno",
      "CS-JM",
      49.2,
      16.61,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ostrava",
      "Ostrava",
      "CS-SM",
      49.82,
      18.26,
      "capital",
      [
        "coal",
        "steel"
      ]
    ],
    [
      "bratislava",
      "Bratislava",
      "CS-BA",
      48.15,
      17.11,
      "capital",
      [
        "port"
      ]
    ],
    [
      "trnava",
      "Trnava",
      "CS-ZS",
      48.38,
      17.59,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "banska",
      "Banská Bystrica",
      "CS-SS",
      48.74,
      19.15,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kosice",
      "Košice",
      "CS-VS",
      48.72,
      21.26,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "pribram",
      "Příbram",
      "CS-SC",
      49.69,
      14.01,
      "city",
      [
        "uranium"
      ]
    ]
  ],
  "links": [
    [
      "banska",
      "kosice",
      "road",
      "D1 corridor"
    ],
    [
      "banska",
      "ostrava",
      "road",
      "local road"
    ],
    [
      "banska",
      "trnava",
      "road",
      "I/51"
    ],
    [
      "bratislava",
      "brno",
      "road",
      "D2"
    ],
    [
      "bratislava",
      "trnava",
      "road",
      "D61"
    ],
    [
      "brno",
      "hradec",
      "road",
      "local road"
    ],
    [
      "brno",
      "ostrava",
      "road",
      "D1"
    ],
    [
      "brno",
      "prague",
      "road",
      "D1"
    ],
    [
      "brno",
      "trnava",
      "road",
      "local road"
    ],
    [
      "ceske_budejovice",
      "plzen",
      "road",
      "local road"
    ],
    [
      "ceske_budejovice",
      "prague",
      "road",
      "E55"
    ],
    [
      "hradec",
      "prague",
      "road",
      "D11"
    ],
    [
      "kladno",
      "plzen",
      "road",
      "local road"
    ],
    [
      "kladno",
      "prague",
      "road",
      "D7"
    ],
    [
      "kladno",
      "pribram",
      "road",
      "local road"
    ],
    [
      "kladno",
      "usti",
      "road",
      "local road"
    ],
    [
      "plzen",
      "prague",
      "road",
      "D5"
    ],
    [
      "prague",
      "usti",
      "road",
      "D8"
    ]
  ]
,
  officers: staff([
  {
    "id": "cs_head",
    "name": "Karel Dvořák",
    "title": "Chairman of the Federal Government",
    "rank": "Chairman",
    "branch": "Federal Government",
    "slot": "head_of_state",
    "war": 40,
    "int": 68,
    "pol": 72,
    "chr": 46,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "cs.prague"
  },
  {
    "id": "cs_def",
    "name": "Hana Svobodová",
    "title": "Minister of National Defence",
    "rank": "Generálplukovník",
    "branch": "Czechoslovak People's Army",
    "slot": "defense_minister",
    "war": 66,
    "int": 64,
    "pol": 42,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional defense minister.",
    "region": "cs.prague"
  },
  {
    "id": "cs_chief",
    "name": "Eva Horáková",
    "title": "Chief of the General Staff",
    "rank": "Generálporučík",
    "branch": "Czechoslovak People's Army",
    "slot": "chief_of_staff",
    "war": 58,
    "int": 72,
    "pol": 55,
    "chr": 36,
    "personality": "schemer",
    "bio": "Fictional chief of staff.",
    "region": "cs.prague"
  },
  {
    "id": "cs_f0",
    "name": "Jozef Kováč",
    "title": "Eastern Military District",
    "rank": "Generálmajor",
    "branch": "Czechoslovak People's Army",
    "slot": "front_commander",
    "war": 60,
    "int": 58,
    "pol": 44,
    "chr": 42,
    "personality": "loyalist",
    "bio": "Fictional front commander.",
    "region": "cs.kosice"
  },
  {
    "id": "cs_field",
    "name": "Pavel Říha",
    "title": "Prague garrison",
    "rank": "Plukovník",
    "branch": "Czechoslovak People's Army",
    "slot": "field_officer",
    "war": 52,
    "int": 60,
    "pol": 48,
    "chr": 50,
    "personality": "loyalist",
    "bio": "Fictional field officer.",
    "region": "cs.prague"
  }
])
});
export const HUNGARY_REGION = land({
  "id": "hu",
  "name": "Hungary",
  "country": "HU",
  "bbox": {
    "minLon": 15.09,
    "maxLon": 23.22,
    "minLat": 44.57,
    "maxLat": 49.6
  },
  "notes": "Atlas only. Nineteen megye plus Budapest. Győr-Sopron and Szabolcs-Szatmár still use those names; the later hyphens are 1990. Pest's council sat in Budapest, so the pin is Gödöllő. Veszprém is Bakony bauxite, Algyő oil is at Szeged, and Diósgyőr steel is at Miskolc. Occupied and off the week-0 march.",
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
      "id": "HU-BU",
      "name": "Budapest",
      "kind": "capital",
      "group": null
    },
    {
      "id": "HU-BA",
      "name": "Baranya",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-BK",
      "name": "Bács-Kiskun",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-BE",
      "name": "Békés",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-BZ",
      "name": "Borsod-Abaúj-Zemplén",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-CS",
      "name": "Csongrád",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-FE",
      "name": "Fejér",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-GS",
      "name": "Győr-Sopron",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-HB",
      "name": "Hajdú-Bihar",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-HE",
      "name": "Heves",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-KO",
      "name": "Komárom",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-NO",
      "name": "Nógrád",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-PE",
      "name": "Pest",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-SO",
      "name": "Somogy",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-SS",
      "name": "Szabolcs-Szatmár",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-SZ",
      "name": "Szolnok",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-TO",
      "name": "Tolna",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-VA",
      "name": "Vas",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-VE",
      "name": "Veszprém",
      "kind": "megye",
      "group": null
    },
    {
      "id": "HU-ZA",
      "name": "Zala",
      "kind": "megye",
      "group": null
    }
  ],
  "cities": [
    [
      "budapest",
      "Budapest",
      "HU-BU",
      47.5,
      19.04,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pecs",
      "Pécs",
      "HU-BA",
      46.07,
      18.23,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "kecskemet",
      "Kecskemét",
      "HU-BK",
      46.91,
      19.69,
      "capital",
      [
        "wheat",
        "apples"
      ]
    ],
    [
      "bekescsaba",
      "Békéscsaba",
      "HU-BE",
      46.68,
      21.09,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "miskolc",
      "Miskolc",
      "HU-BZ",
      48.1,
      20.78,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "szeged",
      "Szeged",
      "HU-CS",
      46.25,
      20.15,
      "capital",
      [
        "oil",
        "wheat"
      ]
    ],
    [
      "szekesfehervar",
      "Székesfehérvár",
      "HU-FE",
      47.19,
      18.41,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gyor",
      "Győr",
      "HU-GS",
      47.69,
      17.63,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "debrecen",
      "Debrecen",
      "HU-HB",
      47.53,
      21.63,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "eger",
      "Eger",
      "HU-HE",
      47.9,
      20.37,
      "capital",
      [
        "grapes"
      ]
    ],
    [
      "tatabanya",
      "Tatabánya",
      "HU-KO",
      47.59,
      18.39,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "salgotarjan",
      "Salgótarján",
      "HU-NO",
      48.1,
      19.79,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "godollo",
      "Gödöllő",
      "HU-PE",
      47.6,
      19.36,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kaposvar",
      "Kaposvár",
      "HU-SO",
      46.36,
      17.8,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nyiregyhaza",
      "Nyíregyháza",
      "HU-SS",
      47.96,
      21.72,
      "capital",
      [
        "apples",
        "wheat"
      ]
    ],
    [
      "szolnok",
      "Szolnok",
      "HU-SZ",
      47.17,
      20.18,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "szekszard",
      "Szekszárd",
      "HU-TO",
      46.35,
      18.7,
      "capital",
      [
        "grapes"
      ]
    ],
    [
      "szombathely",
      "Szombathely",
      "HU-VA",
      47.23,
      16.62,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "veszprem",
      "Veszprém",
      "HU-VE",
      47.09,
      17.91,
      "capital",
      [
        "bauxite"
      ]
    ],
    [
      "zalaegerszeg",
      "Zalaegerszeg",
      "HU-ZA",
      46.84,
      16.84,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "sopron",
      "Sopron",
      "HU-GS",
      47.68,
      16.59,
      "city",
      [
        "grapes"
      ]
    ]
  ],
  "links": [
    [
      "bekescsaba",
      "szeged",
      "road",
      "local road"
    ],
    [
      "budapest",
      "godollo",
      "road",
      "M3"
    ],
    [
      "budapest",
      "gyor",
      "road",
      "M1"
    ],
    [
      "budapest",
      "pecs",
      "road",
      "M6"
    ],
    [
      "budapest",
      "szeged",
      "road",
      "M5"
    ],
    [
      "budapest",
      "tatabanya",
      "road",
      "local road"
    ],
    [
      "budapest",
      "veszprem",
      "road",
      "M7"
    ],
    [
      "debrecen",
      "nyiregyhaza",
      "road",
      "E573"
    ],
    [
      "eger",
      "miskolc",
      "road",
      "local road"
    ],
    [
      "eger",
      "salgotarjan",
      "road",
      "local road"
    ],
    [
      "godollo",
      "miskolc",
      "road",
      "M3"
    ],
    [
      "godollo",
      "salgotarjan",
      "road",
      "local road"
    ],
    [
      "godollo",
      "szolnok",
      "road",
      "local road"
    ],
    [
      "gyor",
      "sopron",
      "road",
      "local road"
    ],
    [
      "gyor",
      "tatabanya",
      "road",
      "local road"
    ],
    [
      "kaposvar",
      "pecs",
      "road",
      "local road"
    ],
    [
      "kaposvar",
      "veszprem",
      "road",
      "local road"
    ],
    [
      "kecskemet",
      "szeged",
      "road",
      "local road"
    ],
    [
      "kecskemet",
      "szolnok",
      "road",
      "local road"
    ],
    [
      "miskolc",
      "nyiregyhaza",
      "road",
      "local road"
    ],
    [
      "pecs",
      "szekszard",
      "road",
      "local road"
    ],
    [
      "szekesfehervar",
      "tatabanya",
      "road",
      "local road"
    ],
    [
      "szekesfehervar",
      "veszprem",
      "road",
      "local road"
    ],
    [
      "szombathely",
      "zalaegerszeg",
      "road",
      "local road"
    ],
    [
      "veszprem",
      "zalaegerszeg",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "hu_head",
    "name": "László Fábián",
    "title": "Chairman of the Presidential Council",
    "rank": "Chairman",
    "branch": "Presidential Council",
    "slot": "head_of_state",
    "war": 38,
    "int": 64,
    "pol": 70,
    "chr": 52,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "hu.budapest"
  },
  {
    "id": "hu_def",
    "name": "Gábor Szilágyi",
    "title": "Minister of Defence",
    "rank": "Vezérezredes",
    "branch": "Hungarian People's Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 56,
    "pol": 48,
    "chr": 40,
    "personality": "loyalist",
    "bio": "Fictional defense minister.",
    "region": "hu.budapest"
  },
  {
    "id": "hu_chief",
    "name": "Ilona Varga",
    "title": "Chief of the General Staff",
    "rank": "Altábornagy",
    "branch": "Hungarian People's Army",
    "slot": "chief_of_staff",
    "war": 62,
    "int": 70,
    "pol": 42,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional chief of staff.",
    "region": "hu.budapest"
  },
  {
    "id": "hu_f0",
    "name": "Tamás Balogh",
    "title": "5th Army",
    "rank": "Vezérőrnagy",
    "branch": "Hungarian People's Army",
    "slot": "front_commander",
    "war": 60,
    "int": 58,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional front commander.",
    "region": "hu.szekesfehervar"
  },
  {
    "id": "hu_field",
    "name": "Bence Farkas",
    "title": "Budapest garrison",
    "rank": "Ezredes",
    "branch": "Hungarian People's Army",
    "slot": "field_officer",
    "war": 58,
    "int": 60,
    "pol": 55,
    "chr": 36,
    "personality": "ambitious",
    "bio": "Fictional field officer.",
    "region": "hu.budapest"
  },
  {
    "id": "hu_f1",
    "name": "Réka Németh",
    "title": "Danube flotilla",
    "rank": "Ezredes",
    "branch": "Hungarian People's Army",
    "slot": "front_commander",
    "war": 48,
    "int": 62,
    "pol": 44,
    "chr": 50,
    "personality": "merchant",
    "bio": "Fictional front commander.",
    "region": "hu.budapest"
  }
])
});
