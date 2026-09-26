import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const IRAN_REGION = land({
  "id": "ir",
  "name": "Iran",
  "country": "IR",
  "bbox": {
    "minLon": 43.02,
    "maxLon": 62.36,
    "minLat": 25.68,
    "maxLat": 40.8
  },
  "notes": "Atlas only. Twenty-four ostans of the 1986 census. Bakhtaran is the wartime name of Kermanshah. Ardabil, Qom, Qazvin, Golestan, and the later Khorasan splits are not drawn. Khuzestan, Ilam, Bakhtaran, and Kordestan are the Iran-Iraq front and stay dormant. Kharg is an oil island, reached by sea. Bandar-e Anzali keeps that name. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "IR-BK",
      "name": "Bakhtaran",
      "kind": "ostan",
      "group": "Iran-Iraq front"
    },
    {
      "id": "IR-KB",
      "name": "Kohgiluyeh and Boyer-Ahmad",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-BU",
      "name": "Bushehr",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-CM",
      "name": "Chahar Mahal and Bakhtiari",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-EA",
      "name": "East Azerbaijan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-ES",
      "name": "Isfahan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-FA",
      "name": "Fars",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-GI",
      "name": "Gilan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-HD",
      "name": "Hamadan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-HG",
      "name": "Hormozgan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-IL",
      "name": "Ilam",
      "kind": "ostan",
      "group": "Iran-Iraq front"
    },
    {
      "id": "IR-KE",
      "name": "Kerman",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-KH",
      "name": "Khorasan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-KZ",
      "name": "Khuzestan",
      "kind": "ostan",
      "group": "Iran-Iraq front"
    },
    {
      "id": "IR-KD",
      "name": "Kordestan",
      "kind": "ostan",
      "group": "Iran-Iraq front"
    },
    {
      "id": "IR-LO",
      "name": "Lorestan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-MK",
      "name": "Markazi",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-MZ",
      "name": "Mazandaran",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-SM",
      "name": "Semnan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-SB",
      "name": "Sistan and Baluchestan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-TH",
      "name": "Tehran",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-WA",
      "name": "West Azerbaijan",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-YA",
      "name": "Yazd",
      "kind": "ostan",
      "group": null
    },
    {
      "id": "IR-ZA",
      "name": "Zanjan",
      "kind": "ostan",
      "group": null
    }
  ],
  "cities": [
    [
      "bakhtaran",
      "Bakhtaran",
      "IR-BK",
      34.31,
      47.07,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "yasuj",
      "Yasuj",
      "IR-KB",
      30.67,
      51.59,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "bushehr",
      "Bushehr",
      "IR-BU",
      28.92,
      50.82,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "kharg",
      "Kharg",
      "IR-BU",
      29.24,
      50.33,
      "city",
      [
        "oil"
      ]
    ],
    [
      "shahr_e_kord",
      "Shahr-e Kord",
      "IR-CM",
      32.33,
      50.86,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tabriz",
      "Tabriz",
      "IR-EA",
      38.08,
      46.29,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jolfa",
      "Jolfa",
      "IR-EA",
      38.94,
      45.63,
      "city",
      [
        "administration"
      ]
    ],
    [
      "isfahan",
      "Isfahan",
      "IR-ES",
      32.65,
      51.67,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "shiraz",
      "Shiraz",
      "IR-FA",
      29.59,
      52.58,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "rasht",
      "Rasht",
      "IR-GI",
      37.28,
      49.59,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bandar_anzali",
      "Bandar-e Anzali",
      "IR-GI",
      37.47,
      49.47,
      "city",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "astara",
      "Astara",
      "IR-GI",
      38.43,
      48.87,
      "city",
      [
        "administration"
      ]
    ],
    [
      "hamadan",
      "Hamadan",
      "IR-HD",
      34.8,
      48.51,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bandar_abbas",
      "Bandar Abbas",
      "IR-HG",
      27.18,
      56.27,
      "capital",
      [
        "port"
      ]
    ],
    [
      "ilam",
      "Ilam",
      "IR-IL",
      33.64,
      46.42,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kerman",
      "Kerman",
      "IR-KE",
      30.28,
      57.08,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "mashhad",
      "Mashhad",
      "IR-KH",
      36.3,
      59.6,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ahvaz",
      "Ahvaz",
      "IR-KZ",
      31.32,
      48.67,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "abadan",
      "Abadan",
      "IR-KZ",
      30.34,
      48.3,
      "city",
      [
        "oil"
      ]
    ],
    [
      "khorramshahr",
      "Khorramshahr",
      "IR-KZ",
      30.44,
      48.17,
      "city",
      [
        "port",
        "oil"
      ]
    ],
    [
      "dezful",
      "Dezful",
      "IR-KZ",
      32.38,
      48.4,
      "city",
      [
        "administration"
      ]
    ],
    [
      "sanandaj",
      "Sanandaj",
      "IR-KD",
      35.31,
      46.99,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "khorramabad",
      "Khorramabad",
      "IR-LO",
      33.49,
      48.36,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "arak",
      "Arak",
      "IR-MK",
      34.09,
      49.69,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sari",
      "Sari",
      "IR-MZ",
      36.56,
      53.06,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "semnan",
      "Semnan",
      "IR-SM",
      35.57,
      53.39,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zahedan",
      "Zahedan",
      "IR-SB",
      29.5,
      60.86,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tehran",
      "Tehran",
      "IR-TH",
      35.69,
      51.39,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "orumiyeh",
      "Orumiyeh",
      "IR-WA",
      37.55,
      45.08,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "maku",
      "Maku",
      "IR-WA",
      39.3,
      44.52,
      "city",
      [
        "administration"
      ]
    ],
    [
      "yazd",
      "Yazd",
      "IR-YA",
      31.9,
      54.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zanjan",
      "Zanjan",
      "IR-ZA",
      36.67,
      48.48,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "rasht",
      "bandar_anzali",
      "road",
      "Caspian coast"
    ],
    [
      "rasht",
      "astara",
      "road",
      "Caspian coast"
    ],
    [
      "tabriz",
      "jolfa",
      "road",
      "Jolfa road"
    ],
    [
      "orumiyeh",
      "maku",
      "road",
      "Bazargan road"
    ],
    [
      "ahvaz",
      "abadan",
      "road",
      "Khuzestan road"
    ],
    [
      "abadan",
      "khorramshahr",
      "road",
      "Shatt al-Arab"
    ],
    [
      "ahvaz",
      "dezful",
      "road",
      "Khuzestan road"
    ],
    [
      "bushehr",
      "kharg",
      "sea",
      "Kharg oil terminal"
    ],
    [
      "shahr_e_kord",
      "isfahan",
      "road",
      "highway"
    ],
    [
      "bakhtaran",
      "ilam",
      "road",
      "highway"
    ],
    [
      "jolfa",
      "maku",
      "road",
      "highway"
    ],
    [
      "bakhtaran",
      "sanandaj",
      "road",
      "highway"
    ],
    [
      "sari",
      "semnan",
      "road",
      "highway"
    ],
    [
      "rasht",
      "zanjan",
      "road",
      "highway"
    ],
    [
      "dezful",
      "khorramabad",
      "road",
      "highway"
    ],
    [
      "hamadan",
      "arak",
      "road",
      "highway"
    ],
    [
      "khorramabad",
      "arak",
      "road",
      "highway"
    ],
    [
      "bakhtaran",
      "hamadan",
      "road",
      "highway"
    ],
    [
      "yasuj",
      "shiraz",
      "road",
      "highway"
    ],
    [
      "sari",
      "tehran",
      "road",
      "highway"
    ],
    [
      "bushehr",
      "shiraz",
      "road",
      "highway"
    ],
    [
      "yasuj",
      "shahr_e_kord",
      "road",
      "highway"
    ],
    [
      "sanandaj",
      "zanjan",
      "road",
      "highway"
    ],
    [
      "shahr_e_kord",
      "arak",
      "road",
      "highway"
    ],
    [
      "tabriz",
      "astara",
      "road",
      "highway"
    ],
    [
      "arak",
      "tehran",
      "road",
      "highway"
    ],
    [
      "isfahan",
      "yazd",
      "road",
      "highway"
    ],
    [
      "kerman",
      "yazd",
      "road",
      "highway"
    ],
    [
      "bandar_abbas",
      "kerman",
      "road",
      "highway"
    ],
    [
      "kerman",
      "zahedan",
      "road",
      "highway"
    ],
    [
      "mashhad",
      "semnan",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "ir_0",
    "name": "Dariush Mehraban",
    "title": "President",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 40,
    "int": 66,
    "pol": 70,
    "chr": 44,
    "personality": "schemer",
    "bio": "Fictional President of Iran, posted at tehran (ir_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ir.tehran"
  },
  {
    "id": "ir_1",
    "name": "Soraya Namdar",
    "title": "Minister of Defense",
    "rank": "Sarlashkar",
    "branch": "Artesh",
    "slot": "defense_minister",
    "war": 58,
    "int": 60,
    "pol": 48,
    "chr": 42,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Iran, posted at bakhtaran (ir_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ir.bakhtaran"
  },
  {
    "id": "ir_2",
    "name": "Reza Golshan",
    "title": "Chief of Staff",
    "rank": "Sartip",
    "branch": "Artesh",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 52,
    "pol": 40,
    "chr": 36,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Iran, posted at yasuj (ir_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ir.yasuj"
  },
  {
    "id": "ir_3",
    "name": "Kaveh Ardalan",
    "title": "Front commander",
    "rank": "Sarhang",
    "branch": "Artesh",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Iran, posted at bushehr (ir_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ir.bushehr"
  },
  {
    "id": "ir_4",
    "name": "Maryam Esfahani",
    "title": "Khuzestan front",
    "rank": "Sarhang",
    "branch": "Artesh",
    "slot": "field_officer",
    "war": 55,
    "int": 54,
    "pol": 32,
    "chr": 38,
    "personality": "recluse",
    "bio": "Fictional Khuzestan front of Iran, posted at kharg (ir_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ir.kharg"
  },
  {
    "id": "ir_5",
    "name": "Leila Bushehri",
    "title": "Front commander",
    "rank": "Sarhang",
    "branch": "Artesh",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional Front commander of Iran, posted at shahr e kord (ir_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ir.shahr_e_kord"
  },
  {
    "id": "ir_6",
    "name": "Navid Sanandaji",
    "title": "Front commander",
    "rank": "Sarhang",
    "branch": "Artesh",
    "slot": "front_commander",
    "war": 70,
    "int": 38,
    "pol": 28,
    "chr": 32,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Iran, posted at tabriz (ir_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ir.tabriz"
  }
])
});

export const AFGHANISTAN_REGION = land({
  "id": "af",
  "name": "Afghanistan",
  "country": "AF",
  "bbox": {
    "minLon": 60.36,
    "maxLon": 73.07,
    "minLat": 29.46,
    "maxLat": 38.72
  },
  "notes": "Atlas only. The Soviet-occupied Democratic Republic. Twenty-nine provinces of 1985-87. Sar-e Pol and Nuristan (1988) and Khost stay inside the older provinces. The Salang tunnel is the internal road from Charikar to Pul-i-Khumri. Hairatan is the Termez bridge. Pakistan is not on this sheet. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "AF-KAB",
      "name": "Kabul",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-PAR",
      "name": "Parwan",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-KAP",
      "name": "Kapisa",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-WAR",
      "name": "Wardak",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-LOG",
      "name": "Logar",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-GHA",
      "name": "Ghazni",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-PIA",
      "name": "Paktia",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-NAN",
      "name": "Nangarhar",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-LAG",
      "name": "Laghman",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-KNR",
      "name": "Kunar",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-BDS",
      "name": "Badakhshan",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-TAK",
      "name": "Takhar",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-BGL",
      "name": "Baghlan",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-KDZ",
      "name": "Kunduz",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-SAM",
      "name": "Samangan",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-BAL",
      "name": "Balkh",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-JOW",
      "name": "Jowzjan",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-FYB",
      "name": "Faryab",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-BDG",
      "name": "Badghis",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-HER",
      "name": "Herat",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-FRA",
      "name": "Farah",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-NIM",
      "name": "Nimruz",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-HEL",
      "name": "Helmand",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-KAN",
      "name": "Kandahar",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-ZAB",
      "name": "Zabul",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-URU",
      "name": "Uruzgan",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-GHO",
      "name": "Ghor",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-BAM",
      "name": "Bamyan",
      "kind": "province",
      "group": null
    },
    {
      "id": "AF-PKA",
      "name": "Paktika",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "kabul",
      "Kabul",
      "AF-KAB",
      34.53,
      69.17,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "charikar",
      "Charikar",
      "AF-PAR",
      35.01,
      69.17,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mahmud_raqi",
      "Mahmud-e Raqi",
      "AF-KAP",
      35.02,
      69.33,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "maidan",
      "Maidan Shahr",
      "AF-WAR",
      34.4,
      68.87,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pul_i_alam",
      "Pul-i-Alam",
      "AF-LOG",
      33.99,
      69.02,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ghazni",
      "Ghazni",
      "AF-GHA",
      33.55,
      68.42,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gardiz",
      "Gardiz",
      "AF-PIA",
      33.6,
      69.23,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jalalabad",
      "Jalalabad",
      "AF-NAN",
      34.43,
      70.45,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "mihtarlam",
      "Mihtarlam",
      "AF-LAG",
      34.67,
      70.21,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "asadabad",
      "Asadabad",
      "AF-KNR",
      34.87,
      71.15,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "fayzabad",
      "Fayzabad",
      "AF-BDS",
      37.12,
      70.58,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ishkashim",
      "Ishkashim",
      "AF-BDS",
      36.71,
      71.57,
      "city",
      [
        "administration"
      ]
    ],
    [
      "taloqan",
      "Taloqan",
      "AF-TAK",
      36.74,
      69.53,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "puli_khumri",
      "Pul-i-Khumri",
      "AF-BGL",
      35.95,
      68.71,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kunduz",
      "Kunduz",
      "AF-KDZ",
      36.73,
      68.86,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "sher_khan",
      "Sher Khan Bandar",
      "AF-KDZ",
      37.18,
      68.59,
      "city",
      [
        "administration"
      ]
    ],
    [
      "aybak",
      "Aybak",
      "AF-SAM",
      36.26,
      68.02,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mazar",
      "Mazar-i-Sharif",
      "AF-BAL",
      36.71,
      67.11,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "hairatan",
      "Hairatan",
      "AF-BAL",
      37.22,
      67.42,
      "city",
      [
        "port"
      ]
    ],
    [
      "sheberghan",
      "Sheberghan",
      "AF-JOW",
      36.67,
      65.75,
      "capital",
      [
        "natural_gas"
      ]
    ],
    [
      "maymana",
      "Maymana",
      "AF-FYB",
      35.92,
      64.78,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "qala_naw",
      "Qala-i-Naw",
      "AF-BDG",
      35.0,
      63.12,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "herat",
      "Herat",
      "AF-HER",
      34.34,
      62.2,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "torghundi",
      "Torghundi",
      "AF-HER",
      35.22,
      62.3,
      "city",
      [
        "administration"
      ]
    ],
    [
      "farah",
      "Farah",
      "AF-FRA",
      32.37,
      62.12,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zaranj",
      "Zaranj",
      "AF-NIM",
      30.96,
      61.86,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "lashkar_gah",
      "Lashkar Gah",
      "AF-HEL",
      31.59,
      64.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kandahar",
      "Kandahar",
      "AF-KAN",
      31.61,
      65.72,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "qalat",
      "Qalat",
      "AF-ZAB",
      32.11,
      66.91,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tarin_kowt",
      "Tarin Kowt",
      "AF-URU",
      32.63,
      65.87,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "chaghcharan",
      "Chaghcharan",
      "AF-GHO",
      34.52,
      65.25,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bamyan",
      "Bamyan",
      "AF-BAM",
      34.82,
      67.82,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sharana",
      "Sharana",
      "AF-PKA",
      32.85,
      68.42,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "kabul",
      "charikar",
      "road",
      "Salang road"
    ],
    [
      "charikar",
      "puli_khumri",
      "road",
      "Salang tunnel"
    ],
    [
      "puli_khumri",
      "aybak",
      "road",
      "Ring Road"
    ],
    [
      "aybak",
      "mazar",
      "road",
      "Ring Road"
    ],
    [
      "mazar",
      "sheberghan",
      "road",
      "Ring Road"
    ],
    [
      "sheberghan",
      "maymana",
      "road",
      "Ring Road"
    ],
    [
      "maymana",
      "qala_naw",
      "road",
      "Ring Road"
    ],
    [
      "qala_naw",
      "herat",
      "road",
      "Ring Road"
    ],
    [
      "herat",
      "farah",
      "road",
      "Ring Road"
    ],
    [
      "farah",
      "kandahar",
      "road",
      "Ring Road"
    ],
    [
      "kandahar",
      "ghazni",
      "road",
      "Ring Road"
    ],
    [
      "ghazni",
      "kabul",
      "road",
      "Ring Road"
    ],
    [
      "puli_khumri",
      "kunduz",
      "road",
      "Ring Road"
    ],
    [
      "mazar",
      "hairatan",
      "road",
      "Hairatan road"
    ],
    [
      "herat",
      "torghundi",
      "road",
      "Kushka road"
    ],
    [
      "kunduz",
      "sher_khan",
      "road",
      "Panj road"
    ],
    [
      "fayzabad",
      "ishkashim",
      "road",
      "Wakhan road"
    ],
    [
      "charikar",
      "mahmud_raqi",
      "road",
      "highway"
    ],
    [
      "kabul",
      "maidan",
      "road",
      "highway"
    ],
    [
      "jalalabad",
      "mihtarlam",
      "road",
      "highway"
    ],
    [
      "pul_i_alam",
      "gardiz",
      "road",
      "highway"
    ],
    [
      "maidan",
      "pul_i_alam",
      "road",
      "highway"
    ],
    [
      "taloqan",
      "kunduz",
      "road",
      "highway"
    ],
    [
      "ghazni",
      "sharana",
      "road",
      "highway"
    ],
    [
      "jalalabad",
      "asadabad",
      "road",
      "highway"
    ],
    [
      "mahmud_raqi",
      "mihtarlam",
      "road",
      "highway"
    ],
    [
      "fayzabad",
      "taloqan",
      "road",
      "highway"
    ],
    [
      "maidan",
      "bamyan",
      "road",
      "highway"
    ],
    [
      "qalat",
      "tarin_kowt",
      "road",
      "highway"
    ],
    [
      "kandahar",
      "tarin_kowt",
      "road",
      "highway"
    ],
    [
      "lashkar_gah",
      "kandahar",
      "road",
      "highway"
    ],
    [
      "farah",
      "zaranj",
      "road",
      "highway"
    ],
    [
      "maymana",
      "chaghcharan",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "af_0",
    "name": "Wajiha Rahimi",
    "title": "President of the Revolutionary Council",
    "rank": "President",
    "branch": "Revolutionary Council",
    "slot": "head_of_state",
    "war": 38,
    "int": 64,
    "pol": 66,
    "chr": 42,
    "personality": "schemer",
    "bio": "Fictional President of the Revolutionary Council of Afghanistan, posted at kabul (af_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "af.kabul"
  },
  {
    "id": "af_1",
    "name": "Farid Noori",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 60,
    "int": 48,
    "pol": 40,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Minister of Defense of Afghanistan, posted at charikar (af_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "af.charikar"
  },
  {
    "id": "af_2",
    "name": "Laila Sarwari",
    "title": "Chief of Staff",
    "rank": "Dagarwal",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 52,
    "int": 56,
    "pol": 44,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Chief of Staff of Afghanistan, posted at mahmud raqi (af_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "af.mahmud_raqi"
  },
  {
    "id": "af_3",
    "name": "Parwin Balkhi",
    "title": "Front commander",
    "rank": "Jagran",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Afghanistan, posted at maidan (af_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "af.maidan"
  },
  {
    "id": "af_4",
    "name": "Tariq Wardak",
    "title": "Salang sector",
    "rank": "Jagran",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 66,
    "int": 42,
    "pol": 28,
    "chr": 30,
    "personality": "recluse",
    "bio": "Fictional Salang sector of Afghanistan, posted at pul i alam (af_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "af.pul_i_alam"
  },
  {
    "id": "af_5",
    "name": "Ajmal Herawi",
    "title": "Front commander",
    "rank": "Jagran",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional Front commander of Afghanistan, posted at ghazni (af_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "af.ghazni"
  },
  {
    "id": "af_6",
    "name": "Shahla Kunari",
    "title": "Front commander",
    "rank": "Jagran",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 70,
    "int": 38,
    "pol": 28,
    "chr": 32,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Afghanistan, posted at gardiz (af_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "af.gardiz"
  }
])
});
