import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const IRAQ_REGION = land({
  "id": "iq",
  "name": "Iraq",
  "country": "IQ",
  "bbox": {
    "minLon": 38.78,
    "maxLon": 49.43,
    "minLat": 28.53,
    "maxLat": 38.64
  },
  "notes": "Atlas only. Eighteen governorates. Kirkuk province is still At-Ta'mim. Basra, Maysan, Wasit, Diyala, and Sulaymaniyah are marked as the Iran-Iraq front and stay dormant. Halabja is not a governorate. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "IQ-BG",
      "name": "Baghdad",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-BA",
      "name": "Basra",
      "kind": "governorate",
      "group": "Iran-Iraq front"
    },
    {
      "id": "IQ-NI",
      "name": "Nineveh",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-AN",
      "name": "Anbar",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-BB",
      "name": "Babylon",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-DQ",
      "name": "Dhi Qar",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-DI",
      "name": "Diyala",
      "kind": "governorate",
      "group": "Iran-Iraq front"
    },
    {
      "id": "IQ-KA",
      "name": "Karbala",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-TM",
      "name": "At-Ta'mim",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-MA",
      "name": "Maysan",
      "kind": "governorate",
      "group": "Iran-Iraq front"
    },
    {
      "id": "IQ-MU",
      "name": "Muthanna",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-NA",
      "name": "Najaf",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-QA",
      "name": "Qadisiyyah",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-SD",
      "name": "Salah ad-Din",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-SU",
      "name": "Sulaymaniyah",
      "kind": "governorate",
      "group": "Iran-Iraq front"
    },
    {
      "id": "IQ-WA",
      "name": "Wasit",
      "kind": "governorate",
      "group": "Iran-Iraq front"
    },
    {
      "id": "IQ-AR",
      "name": "Erbil",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "IQ-DA",
      "name": "Dohuk",
      "kind": "governorate",
      "group": null
    }
  ],
  "cities": [
    [
      "baghdad",
      "Baghdad",
      "IQ-BG",
      33.34,
      44.4,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "basra",
      "Basra",
      "IQ-BA",
      30.51,
      47.81,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "umm_qasr",
      "Umm Qasr",
      "IQ-BA",
      30.03,
      47.93,
      "city",
      [
        "port"
      ]
    ],
    [
      "mosul",
      "Mosul",
      "IQ-NI",
      36.34,
      43.13,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "ramadi",
      "Ramadi",
      "IQ-AN",
      33.43,
      43.3,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "rutba",
      "Rutba",
      "IQ-AN",
      33.04,
      40.28,
      "city",
      [
        "administration"
      ]
    ],
    [
      "al_qaim",
      "Al Qaim",
      "IQ-AN",
      34.39,
      41.0,
      "city",
      [
        "administration"
      ]
    ],
    [
      "hillah",
      "Hillah",
      "IQ-BB",
      32.48,
      44.43,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nasiriyah",
      "Nasiriyah",
      "IQ-DQ",
      31.05,
      46.26,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "baqubah",
      "Baqubah",
      "IQ-DI",
      33.75,
      44.64,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "karbala",
      "Karbala",
      "IQ-KA",
      32.62,
      44.02,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kirkuk",
      "Kirkuk",
      "IQ-TM",
      35.47,
      44.39,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "amarah",
      "Amarah",
      "IQ-MA",
      31.84,
      47.14,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "samawah",
      "Samawah",
      "IQ-MU",
      31.33,
      45.29,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "najaf",
      "Najaf",
      "IQ-NA",
      32.0,
      44.34,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "diwaniyah",
      "Diwaniyah",
      "IQ-QA",
      31.99,
      44.92,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tikrit",
      "Tikrit",
      "IQ-SD",
      34.6,
      43.68,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sulaymaniyah",
      "Sulaymaniyah",
      "IQ-SU",
      35.56,
      45.43,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kut",
      "Kut",
      "IQ-WA",
      32.51,
      45.82,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "erbil",
      "Erbil",
      "IQ-AR",
      36.19,
      44.01,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dohuk",
      "Dohuk",
      "IQ-DA",
      36.87,
      43.0,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zakho",
      "Zakho",
      "IQ-DA",
      37.14,
      42.68,
      "city",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "dohuk",
      "zakho",
      "road",
      "highway"
    ],
    [
      "hillah",
      "karbala",
      "road",
      "highway"
    ],
    [
      "baghdad",
      "baqubah",
      "road",
      "highway"
    ],
    [
      "hillah",
      "najaf",
      "road",
      "highway"
    ],
    [
      "basra",
      "umm_qasr",
      "road",
      "highway"
    ],
    [
      "najaf",
      "diwaniyah",
      "road",
      "highway"
    ],
    [
      "mosul",
      "dohuk",
      "road",
      "highway"
    ],
    [
      "mosul",
      "erbil",
      "road",
      "highway"
    ],
    [
      "samawah",
      "diwaniyah",
      "road",
      "highway"
    ],
    [
      "kirkuk",
      "erbil",
      "road",
      "highway"
    ],
    [
      "baghdad",
      "karbala",
      "road",
      "highway"
    ],
    [
      "kirkuk",
      "sulaymaniyah",
      "road",
      "highway"
    ],
    [
      "nasiriyah",
      "samawah",
      "road",
      "highway"
    ],
    [
      "diwaniyah",
      "kut",
      "road",
      "highway"
    ],
    [
      "baghdad",
      "ramadi",
      "road",
      "highway"
    ],
    [
      "kirkuk",
      "tikrit",
      "road",
      "highway"
    ],
    [
      "nasiriyah",
      "amarah",
      "road",
      "highway"
    ],
    [
      "baqubah",
      "tikrit",
      "road",
      "highway"
    ],
    [
      "basra",
      "nasiriyah",
      "road",
      "highway"
    ],
    [
      "rutba",
      "al_qaim",
      "road",
      "highway"
    ],
    [
      "ramadi",
      "al_qaim",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "iq_0",
    "name": "Karim Al-Janabi",
    "title": "President",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 48,
    "int": 55,
    "pol": 60,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional President of Iraq, posted at baghdad (iq_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "iq.baghdad"
  },
  {
    "id": "iq_1",
    "name": "Widad Al-Saadi",
    "title": "Minister of Defense",
    "rank": "Fariq",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 62,
    "int": 58,
    "pol": 50,
    "chr": 36,
    "personality": "schemer",
    "bio": "Fictional Minister of Defense of Iraq, posted at basra (iq_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "iq.basra"
  },
  {
    "id": "iq_2",
    "name": "Hazem Al-Dulaimi",
    "title": "Chief of Staff",
    "rank": "Liwa",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 68,
    "int": 46,
    "pol": 38,
    "chr": 32,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Iraq, posted at umm qasr (iq_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "iq.umm_qasr"
  },
  {
    "id": "iq_3",
    "name": "Raad Al-Samarrai",
    "title": "Front commander",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Iraq, posted at mosul (iq_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "iq.mosul"
  },
  {
    "id": "iq_4",
    "name": "Suha Al-Bayati",
    "title": "Southern front",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 58,
    "int": 50,
    "pol": 34,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional Southern front of Iraq, posted at ramadi (iq_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "iq.ramadi"
  },
  {
    "id": "iq_5",
    "name": "Lamia Al-Mosuli",
    "title": "Front commander",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional Front commander of Iraq, posted at rutba (iq_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "iq.rutba"
  }
])
});

export const KUWAIT_REGION = land({
  "id": "kw",
  "name": "Kuwait",
  "country": "KW",
  "bbox": {
    "minLon": 46.16,
    "maxLon": 49.58,
    "minLat": 27.58,
    "maxLat": 30.87
  },
  "notes": "Atlas only. Four governorates. Farwaniya is not split until 1988. Oil is the yield. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "KW-KU",
      "name": "Capital",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "KW-HA",
      "name": "Hawalli",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "KW-AH",
      "name": "Ahmadi",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "KW-JA",
      "name": "Jahra",
      "kind": "governorate",
      "group": null
    }
  ],
  "cities": [
    [
      "kuwait",
      "Kuwait",
      "KW-KU",
      29.37,
      47.98,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "hawalli",
      "Hawalli",
      "KW-HA",
      29.33,
      48.03,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ahmadi",
      "Ahmadi",
      "KW-AH",
      29.08,
      48.08,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "jahra",
      "Jahra",
      "KW-JA",
      29.34,
      47.66,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "kuwait",
      "hawalli",
      "road",
      "highway"
    ],
    [
      "hawalli",
      "ahmadi",
      "road",
      "highway"
    ],
    [
      "kuwait",
      "jahra",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "kw_0",
    "name": "Bader Al-Mutairi",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 30,
    "int": 58,
    "pol": 64,
    "chr": 60,
    "personality": "merchant",
    "bio": "Fictional Prime Minister of Kuwait, posted at kuwait (kw_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kw.kuwait"
  },
  {
    "id": "kw_1",
    "name": "Noura Al-Rashidi",
    "title": "Minister of Defense",
    "rank": "Fariq",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 52,
    "int": 50,
    "pol": 44,
    "chr": 48,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Kuwait, posted at hawalli (kw_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kw.hawalli"
  },
  {
    "id": "kw_2",
    "name": "Hamad Al-Ajmi",
    "title": "Harbor command",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 48,
    "int": 46,
    "pol": 40,
    "chr": 42,
    "personality": "loyalist",
    "bio": "Fictional Harbor command of Kuwait, posted at ahmadi (kw_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kw.ahmadi"
  }
])
});

export const BAHRAIN_REGION = land({
  "id": "bh",
  "name": "Bahrain",
  "country": "BH",
  "bbox": {
    "minLon": 49.05,
    "maxLon": 52.12,
    "minLat": 24.63,
    "maxLat": 27.76
  },
  "notes": "Atlas only. Five municipalities of the 1980s, not every later block. The King Fahd Causeway opens in 1986. Oil is at Sitra. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "BH-MA",
      "name": "Manama",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "BH-MU",
      "name": "Muharraq",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "BH-RI",
      "name": "Riffa",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "BH-CE",
      "name": "Central",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "BH-SI",
      "name": "Sitra",
      "kind": "municipality",
      "group": null
    }
  ],
  "cities": [
    [
      "manama",
      "Manama",
      "BH-MA",
      26.23,
      50.58,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "muharraq",
      "Muharraq",
      "BH-MU",
      26.26,
      50.61,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "riffa",
      "Riffa",
      "BH-RI",
      26.13,
      50.55,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "isa_town",
      "Isa Town",
      "BH-CE",
      26.17,
      50.55,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sitra",
      "Sitra",
      "BH-SI",
      26.15,
      50.62,
      "capital",
      [
        "oil"
      ]
    ]
  ],
  "links": [
    [
      "riffa",
      "isa_town",
      "road",
      "highway"
    ],
    [
      "manama",
      "muharraq",
      "road",
      "highway"
    ],
    [
      "manama",
      "isa_town",
      "road",
      "highway"
    ],
    [
      "isa_town",
      "sitra",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "bh_0",
    "name": "Latifa Al-Dosari",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 32,
    "int": 60,
    "pol": 66,
    "chr": 58,
    "personality": "diplomat",
    "bio": "Fictional Prime Minister of Bahrain, posted at manama (bh_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bh.manama"
  },
  {
    "id": "bh_1",
    "name": "Yusuf Al-Arrayed",
    "title": "Minister of Defense",
    "rank": "Amid",
    "branch": "Defense Force",
    "slot": "defense_minister",
    "war": 50,
    "int": 48,
    "pol": 42,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Bahrain, posted at muharraq (bh_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bh.muharraq"
  },
  {
    "id": "bh_2",
    "name": "Mariam Al-Khal",
    "title": "Sitra command",
    "rank": "Ra'id",
    "branch": "Defense Force",
    "slot": "field_officer",
    "war": 36,
    "int": 44,
    "pol": 46,
    "chr": 50,
    "personality": "merchant",
    "bio": "Fictional Sitra command of Bahrain, posted at riffa (bh_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bh.riffa"
  }
])
});

export const QATAR_REGION = land({
  "id": "qa",
  "name": "Qatar",
  "country": "QA",
  "bbox": {
    "minLon": 49.72,
    "maxLon": 53.1,
    "minLat": 23.67,
    "maxLat": 27.63
  },
  "notes": "Atlas only. Five municipalities. Later municipalities are not drawn. Oil and gas are at Doha. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "QA-DA",
      "name": "Doha",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "QA-RA",
      "name": "Al Rayyan",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "QA-WA",
      "name": "Al Wakrah",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "QA-KH",
      "name": "Al Khor",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "QA-MS",
      "name": "Madinat ash Shamal",
      "kind": "municipality",
      "group": null
    }
  ],
  "cities": [
    [
      "doha",
      "Doha",
      "QA-DA",
      25.29,
      51.53,
      "capital",
      [
        "oil",
        "natural_gas",
        "port"
      ]
    ],
    [
      "rayyan",
      "Al Rayyan",
      "QA-RA",
      25.29,
      51.42,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "wakrah",
      "Al Wakrah",
      "QA-WA",
      25.17,
      51.6,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "khor",
      "Al Khor",
      "QA-KH",
      25.68,
      51.5,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "shamal",
      "Madinat ash Shamal",
      "QA-MS",
      26.13,
      51.22,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "doha",
      "rayyan",
      "road",
      "highway"
    ],
    [
      "doha",
      "wakrah",
      "road",
      "highway"
    ],
    [
      "doha",
      "khor",
      "road",
      "highway"
    ],
    [
      "khor",
      "shamal",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "qa_0",
    "name": "Nasser Al-Kuwari",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 62,
    "pol": 68,
    "chr": 56,
    "personality": "merchant",
    "bio": "Fictional Prime Minister of Qatar, posted at doha (qa_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "qa.doha"
  },
  {
    "id": "qa_1",
    "name": "Amna Al-Suwaidi",
    "title": "Minister of Defense",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 40,
    "int": 56,
    "pol": 50,
    "chr": 54,
    "personality": "diplomat",
    "bio": "Fictional Minister of Defense of Qatar, posted at rayyan (qa_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "qa.rayyan"
  },
  {
    "id": "qa_2",
    "name": "Ghanem Al-Mohannadi",
    "title": "Gas sector",
    "rank": "Ra'id",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 42,
    "int": 50,
    "pol": 44,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional Gas sector of Qatar, posted at wakrah (qa_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "qa.wakrah"
  }
])
});

export const UAE_REGION = land({
  "id": "ae",
  "name": "United Arab Emirates",
  "country": "AE",
  "bbox": {
    "minLon": 52.88,
    "maxLon": 57.83,
    "minLat": 22.71,
    "maxLat": 27.29
  },
  "notes": "Atlas only. Seven emirates. Oil is Abu Dhabi. Al Ain is the Buraimi road into Oman. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "AE-AZ",
      "name": "Abu Dhabi",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "AE-DU",
      "name": "Dubai",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "AE-SH",
      "name": "Sharjah",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "AE-AJ",
      "name": "Ajman",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "AE-UQ",
      "name": "Umm al-Quwain",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "AE-RK",
      "name": "Ras al-Khaimah",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "AE-FU",
      "name": "Fujairah",
      "kind": "emirate",
      "group": null
    }
  ],
  "cities": [
    [
      "abu_dhabi",
      "Abu Dhabi",
      "AE-AZ",
      24.45,
      54.38,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "al_ain",
      "Al Ain",
      "AE-AZ",
      24.21,
      55.76,
      "city",
      [
        "administration"
      ]
    ],
    [
      "dubai",
      "Dubai",
      "AE-DU",
      25.2,
      55.27,
      "capital",
      [
        "port"
      ]
    ],
    [
      "sharjah",
      "Sharjah",
      "AE-SH",
      25.36,
      55.39,
      "capital",
      [
        "port"
      ]
    ],
    [
      "ajman",
      "Ajman",
      "AE-AJ",
      25.41,
      55.44,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "uaq",
      "Umm al-Quwain",
      "AE-UQ",
      25.56,
      55.55,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "rak",
      "Ras al-Khaimah",
      "AE-RK",
      25.79,
      55.94,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "fujairah",
      "Fujairah",
      "AE-FU",
      25.13,
      56.33,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "sharjah",
      "ajman",
      "road",
      "highway"
    ],
    [
      "ajman",
      "uaq",
      "road",
      "highway"
    ],
    [
      "dubai",
      "sharjah",
      "road",
      "highway"
    ],
    [
      "uaq",
      "rak",
      "road",
      "highway"
    ],
    [
      "rak",
      "fujairah",
      "road",
      "highway"
    ],
    [
      "al_ain",
      "fujairah",
      "road",
      "highway"
    ],
    [
      "abu_dhabi",
      "dubai",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "ae_0",
    "name": "Saeed Al-Mazrouei",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 36,
    "int": 64,
    "pol": 70,
    "chr": 60,
    "personality": "merchant",
    "bio": "Fictional Prime Minister of United Arab Emirates, posted at abu dhabi (ae_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ae.abu_dhabi"
  },
  {
    "id": "ae_1",
    "name": "Shamma Al-Nuaimi",
    "title": "Minister of Defense",
    "rank": "Fariq",
    "branch": "Union Defense Force",
    "slot": "defense_minister",
    "war": 38,
    "int": 58,
    "pol": 52,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Minister of Defense of United Arab Emirates, posted at al ain (ae_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ae.al_ain"
  },
  {
    "id": "ae_2",
    "name": "Sultan Al-Shamsi",
    "title": "Chief of Staff",
    "rank": "Liwa",
    "branch": "Union Defense Force",
    "slot": "chief_of_staff",
    "war": 55,
    "int": 48,
    "pol": 42,
    "chr": 40,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of United Arab Emirates, posted at dubai (ae_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ae.dubai"
  },
  {
    "id": "ae_3",
    "name": "Rashid Al-Falasi",
    "title": "Front commander",
    "rank": "Amid",
    "branch": "Union Defense Force",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of United Arab Emirates, posted at sharjah (ae_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ae.sharjah"
  },
  {
    "id": "ae_4",
    "name": "Aisha Al-Kaabi",
    "title": "Coast command",
    "rank": "Amid",
    "branch": "Union Defense Force",
    "slot": "field_officer",
    "war": 46,
    "int": 50,
    "pol": 40,
    "chr": 48,
    "personality": "cautious",
    "bio": "Fictional Coast command of United Arab Emirates, posted at ajman (ae_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ae.ajman"
  }
])
});

export const OMAN_REGION = land({
  "id": "om",
  "name": "Oman",
  "country": "OM",
  "bbox": {
    "minLon": 52.59,
    "maxLon": 61.03,
    "minLat": 15.52,
    "maxLat": 27.68
  },
  "notes": "Atlas only. Muscat, Musandam, and Dhofar, plus the five regions. Not every wilayat. Musandam is reached by sea, not by a road across the Emirates. Oil is at Haima. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "OM-MA",
      "name": "Muscat",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "OM-BA",
      "name": "Al Batinah",
      "kind": "region",
      "group": null
    },
    {
      "id": "OM-MU",
      "name": "Musandam",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "OM-ZA",
      "name": "Ad Dhahirah",
      "kind": "region",
      "group": null
    },
    {
      "id": "OM-DA",
      "name": "Ad Dakhiliyah",
      "kind": "region",
      "group": null
    },
    {
      "id": "OM-SH",
      "name": "Ash Sharqiyah",
      "kind": "region",
      "group": null
    },
    {
      "id": "OM-WU",
      "name": "Al Wusta",
      "kind": "region",
      "group": null
    },
    {
      "id": "OM-ZU",
      "name": "Dhofar",
      "kind": "governorate",
      "group": null
    }
  ],
  "cities": [
    [
      "muscat",
      "Muscat",
      "OM-MA",
      23.59,
      58.41,
      "capital",
      [
        "port"
      ]
    ],
    [
      "sohar",
      "Sohar",
      "OM-BA",
      24.35,
      56.73,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "khasab",
      "Khasab",
      "OM-MU",
      26.18,
      56.25,
      "capital",
      [
        "port"
      ]
    ],
    [
      "ibri",
      "Ibri",
      "OM-ZA",
      23.23,
      56.52,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nizwa",
      "Nizwa",
      "OM-DA",
      22.93,
      57.53,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sur",
      "Sur",
      "OM-SH",
      22.57,
      59.53,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "haima",
      "Haima",
      "OM-WU",
      19.96,
      56.28,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "salalah",
      "Salalah",
      "OM-ZU",
      17.02,
      54.09,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "khasab",
      "muscat",
      "sea",
      "Gulf of Oman"
    ],
    [
      "ibri",
      "nizwa",
      "road",
      "highway"
    ],
    [
      "muscat",
      "nizwa",
      "road",
      "highway"
    ],
    [
      "sohar",
      "ibri",
      "road",
      "highway"
    ],
    [
      "muscat",
      "sur",
      "road",
      "highway"
    ],
    [
      "nizwa",
      "haima",
      "road",
      "highway"
    ],
    [
      "haima",
      "salalah",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "om_0",
    "name": "Elric Ashwell",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 60,
    "pol": 66,
    "chr": 52,
    "personality": "diplomat",
    "bio": "Fictional Prime Minister of Oman, posted at muscat (om_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "om.muscat"
  },
  {
    "id": "om_1",
    "name": "Azza Al-Hinai",
    "title": "Minister of Defense",
    "rank": "Liwa",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 52,
    "int": 54,
    "pol": 44,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Oman, posted at sohar (om_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "om.sohar"
  },
  {
    "id": "om_2",
    "name": "Salim Al-Rawahi",
    "title": "Chief of Staff",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 58,
    "int": 46,
    "pol": 38,
    "chr": 36,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Oman, posted at khasab (om_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "om.khasab"
  },
  {
    "id": "om_3",
    "name": "Tariq Al-Mahrouqi",
    "title": "Front commander",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Oman, posted at ibri (om_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "om.ibri"
  },
  {
    "id": "om_4",
    "name": "Maha Al-Balushi",
    "title": "Dhofar command",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 50,
    "int": 48,
    "pol": 32,
    "chr": 34,
    "personality": "recluse",
    "bio": "Fictional Dhofar command of Oman, posted at nizwa (om_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "om.nizwa"
  }
])
});

export const SAUDI_REGION = land({
  "id": "sa",
  "name": "Saudi Arabia",
  "country": "SA",
  "bbox": {
    "minLon": 35.07,
    "maxLon": 51.6,
    "minLat": 15.39,
    "maxLat": 32.83
  },
  "notes": "Atlas only. Fourteen emirates: the thirteen later provinces plus Al Qurayyat, which merges into Al Jawf only in 1993. Oil is the Eastern Province. The Law of the Provinces is 1992; the emirates are already the map. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "SA-RI",
      "name": "Ar Riyad",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-MK",
      "name": "Makkah",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-MD",
      "name": "Al Madinah",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-SH",
      "name": "Eastern Province",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-QS",
      "name": "Al Qassim",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-AS",
      "name": "Asir",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-TB",
      "name": "Tabuk",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-HA",
      "name": "Ha'il",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-JZ",
      "name": "Jizan",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-NJ",
      "name": "Najran",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-HS",
      "name": "Northern Borders",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-JF",
      "name": "Al Jawf",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-BA",
      "name": "Al Baha",
      "kind": "emirate",
      "group": null
    },
    {
      "id": "SA-QY",
      "name": "Al Qurayyat",
      "kind": "emirate",
      "group": null
    }
  ],
  "cities": [
    [
      "riyadh",
      "Riyadh",
      "SA-RI",
      24.71,
      46.68,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mecca",
      "Mecca",
      "SA-MK",
      21.39,
      39.86,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jeddah",
      "Jeddah",
      "SA-MK",
      21.54,
      39.17,
      "city",
      [
        "port"
      ]
    ],
    [
      "medina",
      "Medina",
      "SA-MD",
      24.47,
      39.61,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dammam",
      "Dammam",
      "SA-SH",
      26.43,
      50.1,
      "capital",
      [
        "oil",
        "natural_gas",
        "port"
      ]
    ],
    [
      "buraidah",
      "Buraidah",
      "SA-QS",
      26.33,
      43.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "abha",
      "Abha",
      "SA-AS",
      18.22,
      42.51,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tabuk",
      "Tabuk",
      "SA-TB",
      28.38,
      36.57,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "hail",
      "Ha'il",
      "SA-HA",
      27.52,
      41.69,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jizan",
      "Jizan",
      "SA-JZ",
      16.89,
      42.55,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "najran",
      "Najran",
      "SA-NJ",
      17.49,
      44.13,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "arar",
      "Arar",
      "SA-HS",
      30.98,
      41.04,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sakaka",
      "Sakaka",
      "SA-JF",
      29.97,
      40.21,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "baha",
      "Al Baha",
      "SA-BA",
      20.01,
      41.47,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "qurayyat",
      "Qurayyat",
      "SA-QY",
      31.33,
      37.34,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "mecca",
      "jeddah",
      "road",
      "highway"
    ],
    [
      "arar",
      "sakaka",
      "road",
      "highway"
    ],
    [
      "abha",
      "jizan",
      "road",
      "highway"
    ],
    [
      "jizan",
      "najran",
      "road",
      "highway"
    ],
    [
      "abha",
      "baha",
      "road",
      "highway"
    ],
    [
      "mecca",
      "baha",
      "road",
      "highway"
    ],
    [
      "buraidah",
      "hail",
      "road",
      "highway"
    ],
    [
      "hail",
      "sakaka",
      "road",
      "highway"
    ],
    [
      "sakaka",
      "qurayyat",
      "road",
      "highway"
    ],
    [
      "riyadh",
      "buraidah",
      "road",
      "highway"
    ],
    [
      "jeddah",
      "medina",
      "road",
      "highway"
    ],
    [
      "tabuk",
      "qurayyat",
      "road",
      "highway"
    ],
    [
      "riyadh",
      "dammam",
      "road",
      "highway"
    ],
    [
      "medina",
      "hail",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "sa_0",
    "name": "Nawaf Al-Otaibi",
    "title": "Deputy Prime Minister",
    "rank": "Deputy Prime Minister",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 36,
    "int": 62,
    "pol": 72,
    "chr": 58,
    "personality": "diplomat",
    "bio": "Fictional Deputy Prime Minister of Saudi Arabia, posted at riyadh (sa_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sa.riyadh"
  },
  {
    "id": "sa_1",
    "name": "Bandar Al-Dosari",
    "title": "Minister of Defense",
    "rank": "Fariq",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 60,
    "int": 52,
    "pol": 46,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Saudi Arabia, posted at mecca (sa_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sa.mecca"
  },
  {
    "id": "sa_2",
    "name": "Hessa Al-Ghamdi",
    "title": "Chief of Staff",
    "rank": "Liwa",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 48,
    "int": 56,
    "pol": 44,
    "chr": 50,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Saudi Arabia, posted at jeddah (sa_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sa.jeddah"
  },
  {
    "id": "sa_3",
    "name": "Sultan Al-Anazi",
    "title": "Front commander",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Saudi Arabia, posted at medina (sa_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sa.medina"
  },
  {
    "id": "sa_4",
    "name": "Majid Al-Harbi",
    "title": "Eastern command",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 44,
    "int": 50,
    "pol": 48,
    "chr": 42,
    "personality": "merchant",
    "bio": "Fictional Eastern command of Saudi Arabia, posted at dammam (sa_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sa.dammam"
  },
  {
    "id": "sa_5",
    "name": "Lulwa Al-Shammari",
    "title": "Front commander",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional Front commander of Saudi Arabia, posted at buraidah (sa_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sa.buraidah"
  }
])
});

export const NORTH_YEMEN_REGION = land({
  "id": "ye",
  "name": "North Yemen",
  "country": "YE",
  "bbox": {
    "minLon": 41.45,
    "maxLon": 47.07,
    "minLat": 12.08,
    "maxLat": 18.44
  },
  "notes": "Atlas only. The Yemen Arab Republic, eleven governorates. Not united with Aden until May 1990. Marib oil starts to move late in the window. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "YE-SN",
      "name": "Sanaa",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-BA",
      "name": "Al Bayda",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-HU",
      "name": "Al Hudaydah",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-JA",
      "name": "Al Jawf",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-MW",
      "name": "Al Mahwit",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-DH",
      "name": "Dhamar",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-HJ",
      "name": "Hajjah",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-IB",
      "name": "Ibb",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-MA",
      "name": "Marib",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-SD",
      "name": "Saada",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YE-TA",
      "name": "Taiz",
      "kind": "governorate",
      "group": null
    }
  ],
  "cities": [
    [
      "sanaa",
      "Sanaa",
      "YE-SN",
      15.37,
      44.19,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bayda",
      "Al Bayda",
      "YE-BA",
      13.99,
      45.57,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "hodeidah",
      "Hodeidah",
      "YE-HU",
      14.8,
      42.95,
      "capital",
      [
        "port"
      ]
    ],
    [
      "hazm",
      "Al Hazm",
      "YE-JA",
      16.16,
      44.78,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mahwit",
      "Al Mahwit",
      "YE-MW",
      15.47,
      43.54,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dhamar",
      "Dhamar",
      "YE-DH",
      14.54,
      44.41,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "hajjah",
      "Hajjah",
      "YE-HJ",
      15.69,
      43.6,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ibb",
      "Ibb",
      "YE-IB",
      13.97,
      44.17,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "marib",
      "Marib",
      "YE-MA",
      15.46,
      45.33,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "saada",
      "Saada",
      "YE-SD",
      16.94,
      43.76,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "taiz",
      "Taiz",
      "YE-TA",
      13.58,
      44.02,
      "capital",
      [
        "coffee"
      ]
    ]
  ],
  "links": [
    [
      "mahwit",
      "hajjah",
      "road",
      "highway"
    ],
    [
      "ibb",
      "taiz",
      "road",
      "highway"
    ],
    [
      "dhamar",
      "ibb",
      "road",
      "highway"
    ],
    [
      "sanaa",
      "mahwit",
      "road",
      "highway"
    ],
    [
      "sanaa",
      "dhamar",
      "road",
      "highway"
    ],
    [
      "hazm",
      "marib",
      "road",
      "highway"
    ],
    [
      "hodeidah",
      "mahwit",
      "road",
      "highway"
    ],
    [
      "sanaa",
      "hazm",
      "road",
      "highway"
    ],
    [
      "hazm",
      "saada",
      "road",
      "highway"
    ],
    [
      "bayda",
      "dhamar",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "ye_0",
    "name": "Abdu Al-Maqtari",
    "title": "President",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 42,
    "int": 58,
    "pol": 64,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional President of North Yemen, posted at sanaa (ye_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ye.sanaa"
  },
  {
    "id": "ye_1",
    "name": "Najat Al-Iryani",
    "title": "Minister of Defense",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 54,
    "int": 50,
    "pol": 42,
    "chr": 44,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of North Yemen, posted at bayda (ye_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ye.bayda"
  },
  {
    "id": "ye_2",
    "name": "Qasim Al-Ansi",
    "title": "Chief of Staff",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 62,
    "int": 44,
    "pol": 36,
    "chr": 32,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of North Yemen, posted at hodeidah (ye_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ye.hodeidah"
  },
  {
    "id": "ye_3",
    "name": "Hamoud Al-Dhamari",
    "title": "Front commander",
    "rank": "Ra'id",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of North Yemen, posted at hazm (ye_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ye.hazm"
  },
  {
    "id": "ye_4",
    "name": "Bilqis Al-Hadrami",
    "title": "Marib sector",
    "rank": "Ra'id",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 50,
    "int": 48,
    "pol": 40,
    "chr": 46,
    "personality": "ambitious",
    "bio": "Fictional Marib sector of North Yemen, posted at mahwit (ye_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ye.mahwit"
  }
])
});

export const SOUTH_YEMEN_REGION = land({
  "id": "yd",
  "name": "South Yemen",
  "country": "YD",
  "bbox": {
    "minLon": 43.38,
    "maxLon": 55.42,
    "minLat": 11.0,
    "maxLat": 17.71
  },
  "notes": "Atlas only. The People's Democratic Republic, six governorates. Aden, Lahij, Abyan, Shabwah, Hadhramaut, and Al Mahrah. Socotra is a district of Aden, reached by sea. Unity with the north is May 1990. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "YD-AD",
      "name": "Aden",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YD-LA",
      "name": "Lahij",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YD-AB",
      "name": "Abyan",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YD-SH",
      "name": "Shabwah",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YD-HD",
      "name": "Hadhramaut",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "YD-MR",
      "name": "Al Mahrah",
      "kind": "governorate",
      "group": null
    }
  ],
  "cities": [
    [
      "aden",
      "Aden",
      "YD-AD",
      12.8,
      45.03,
      "capital",
      [
        "port"
      ]
    ],
    [
      "socotra",
      "Socotra",
      "YD-AD",
      12.5,
      53.92,
      "city",
      [
        "fisheries"
      ]
    ],
    [
      "hawtah",
      "Hawtah",
      "YD-LA",
      13.05,
      44.88,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zinjibar",
      "Zinjibar",
      "YD-AB",
      13.13,
      45.38,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ataq",
      "Ataq",
      "YD-SH",
      14.53,
      46.83,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "mukalla",
      "Mukalla",
      "YD-HD",
      14.54,
      49.12,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "ghaydah",
      "Al Ghaydah",
      "YD-MR",
      16.21,
      52.18,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "socotra",
      "aden",
      "sea",
      "Gulf of Aden"
    ],
    [
      "aden",
      "hawtah",
      "road",
      "highway"
    ],
    [
      "aden",
      "zinjibar",
      "road",
      "highway"
    ],
    [
      "zinjibar",
      "ataq",
      "road",
      "highway"
    ],
    [
      "ataq",
      "mukalla",
      "road",
      "highway"
    ],
    [
      "mukalla",
      "ghaydah",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "yd_0",
    "name": "Fawzia Baoum",
    "title": "Chair of the Presidium",
    "rank": "Chair",
    "branch": "Presidium",
    "slot": "head_of_state",
    "war": 40,
    "int": 62,
    "pol": 68,
    "chr": 44,
    "personality": "schemer",
    "bio": "Fictional Chair of the Presidium of South Yemen, posted at aden (yd_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "yd.aden"
  },
  {
    "id": "yd_1",
    "name": "Salem Ba Ras",
    "title": "Minister of Defense",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 58,
    "int": 46,
    "pol": 40,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Minister of Defense of South Yemen, posted at socotra (yd_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "yd.socotra"
  },
  {
    "id": "yd_2",
    "name": "Aisha Baharoon",
    "title": "Aden command",
    "rank": "Ra'id",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 36,
    "int": 50,
    "pol": 42,
    "chr": 48,
    "personality": "merchant",
    "bio": "Fictional Aden command of South Yemen, posted at hawtah (yd_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "yd.hawtah"
  }
])
});
