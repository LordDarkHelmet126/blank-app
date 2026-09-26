import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const ISRAEL_REGION = land({
  "id": "il",
  "name": "Israel",
  "country": "IL",
  "bbox": {
    "minLon": 32.97,
    "maxLon": 37.19,
    "minLat": 28.06,
    "maxLat": 34.78
  },
  "notes": "Atlas only. Six districts. The West Bank, Gaza, and the Golan are occupation zones, not countries. Subdivision ids are IL- so they do not match Illinois. Sinai is not on this sheet. Occupied and off the week-0 march.",
  "defaultBiome": "mediterranean",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "IL-JM",
      "name": "Jerusalem",
      "kind": "district",
      "group": null
    },
    {
      "id": "IL-Z",
      "name": "Northern",
      "kind": "district",
      "group": null
    },
    {
      "id": "IL-HA",
      "name": "Haifa",
      "kind": "district",
      "group": null
    },
    {
      "id": "IL-M",
      "name": "Central",
      "kind": "district",
      "group": null
    },
    {
      "id": "IL-TA",
      "name": "Tel Aviv",
      "kind": "district",
      "group": null
    },
    {
      "id": "IL-D",
      "name": "Southern",
      "kind": "district",
      "group": null
    },
    {
      "id": "IL-WB",
      "name": "West Bank",
      "kind": "zone",
      "group": "Israeli occupation"
    },
    {
      "id": "IL-GZ",
      "name": "Gaza",
      "kind": "zone",
      "group": "Israeli occupation"
    },
    {
      "id": "IL-GL",
      "name": "Golan",
      "kind": "zone",
      "group": "Israeli occupation"
    }
  ],
  "cities": [
    [
      "jerusalem",
      "Jerusalem",
      "IL-JM",
      31.78,
      35.22,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nazareth",
      "Nazareth",
      "IL-Z",
      32.7,
      35.3,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "metula",
      "Metula",
      "IL-Z",
      33.28,
      35.58,
      "city",
      [
        "administration"
      ]
    ],
    [
      "haifa",
      "Haifa",
      "IL-HA",
      32.82,
      34.99,
      "capital",
      [
        "port",
        "steel"
      ]
    ],
    [
      "ramla",
      "Ramla",
      "IL-M",
      31.93,
      34.87,
      "capital",
      [
        "citrus"
      ]
    ],
    [
      "tel_aviv",
      "Tel Aviv",
      "IL-TA",
      32.08,
      34.78,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "beersheba",
      "Beersheba",
      "IL-D",
      31.25,
      34.79,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "eilat",
      "Eilat",
      "IL-D",
      29.56,
      34.95,
      "city",
      [
        "administration"
      ]
    ],
    [
      "ramallah",
      "Ramallah",
      "IL-WB",
      31.9,
      35.2,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jericho",
      "Jericho",
      "IL-WB",
      31.86,
      35.46,
      "city",
      [
        "administration"
      ]
    ],
    [
      "gaza",
      "Gaza",
      "IL-GZ",
      31.5,
      34.47,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "katzrin",
      "Katzrin",
      "IL-GL",
      32.99,
      35.69,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "jerusalem",
      "ramallah",
      "road",
      "highway"
    ],
    [
      "ramla",
      "tel_aviv",
      "road",
      "highway"
    ],
    [
      "jerusalem",
      "jericho",
      "road",
      "highway"
    ],
    [
      "ramla",
      "ramallah",
      "road",
      "highway"
    ],
    [
      "nazareth",
      "haifa",
      "road",
      "highway"
    ],
    [
      "metula",
      "katzrin",
      "road",
      "highway"
    ],
    [
      "beersheba",
      "gaza",
      "road",
      "highway"
    ],
    [
      "nazareth",
      "katzrin",
      "road",
      "highway"
    ],
    [
      "ramla",
      "gaza",
      "road",
      "highway"
    ],
    [
      "nazareth",
      "tel_aviv",
      "road",
      "highway"
    ],
    [
      "beersheba",
      "eilat",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "il_0",
    "name": "Yael Bar-On",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 36,
    "int": 68,
    "pol": 70,
    "chr": 60,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "il.jerusalem"
  },
  {
    "id": "il_1",
    "name": "Eitan Sharvit",
    "title": "Minister of Defense",
    "rank": "Aluf",
    "branch": "Israel Defense Forces",
    "slot": "defense_minister",
    "war": 64,
    "int": 56,
    "pol": 42,
    "chr": 38,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "il.nazareth"
  },
  {
    "id": "il_2",
    "name": "Noa Levi",
    "title": "Chief of Staff",
    "rank": "Aluf",
    "branch": "Israel Defense Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 58,
    "pol": 40,
    "chr": 44,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "il.metula"
  },
  {
    "id": "il_3",
    "name": "Miriam Azoulay",
    "title": "Front commander",
    "rank": "Aluf Mishne",
    "branch": "Israel Defense Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "il.haifa"
  },
  {
    "id": "il_4",
    "name": "Amos Peretz",
    "title": "Southern command",
    "rank": "Tat Aluf",
    "branch": "Israel Defense Forces",
    "slot": "field_officer",
    "war": 72,
    "int": 44,
    "pol": 30,
    "chr": 32,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "il.ramla"
  }
])
});

export const LEBANON_REGION = land({
  "id": "lb",
  "name": "Lebanon",
  "country": "LB",
  "bbox": {
    "minLon": 33.7,
    "maxLon": 37.4,
    "minLat": 31.77,
    "maxLat": 35.94
  },
  "notes": "Atlas only. Civil-war governorates. The Israeli security zone is a zone inside Lebanon, not a country. The Beqaa is marked for the Syrian presence, still Lebanese. Occupied and off the week-0 march.",
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
      "id": "LB-BA",
      "name": "Beirut",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "LB-JL",
      "name": "Mount Lebanon",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "LB-AS",
      "name": "North Lebanon",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "LB-JA",
      "name": "South Lebanon",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "LB-BI",
      "name": "Beqaa",
      "kind": "governorate",
      "group": "Syrian presence"
    },
    {
      "id": "LB-NA",
      "name": "Nabatieh",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "LB-SZ",
      "name": "Israeli security zone",
      "kind": "zone",
      "group": "Israeli security zone"
    }
  ],
  "cities": [
    [
      "beirut",
      "Beirut",
      "LB-BA",
      33.89,
      35.5,
      "capital",
      [
        "port"
      ]
    ],
    [
      "baabda",
      "Baabda",
      "LB-JL",
      33.83,
      35.54,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tripoli",
      "Tripoli",
      "LB-AS",
      34.44,
      35.84,
      "capital",
      [
        "port"
      ]
    ],
    [
      "sidon",
      "Sidon",
      "LB-JA",
      33.56,
      35.37,
      "capital",
      [
        "citrus"
      ]
    ],
    [
      "zahle",
      "Zahle",
      "LB-BI",
      33.85,
      35.9,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nabatieh",
      "Nabatieh",
      "LB-NA",
      33.38,
      35.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "marjayoun",
      "Marjayoun",
      "LB-SZ",
      33.36,
      35.59,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tyre",
      "Tyre",
      "LB-SZ",
      33.27,
      35.2,
      "city",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "beirut",
      "baabda",
      "road",
      "highway"
    ],
    [
      "nabatieh",
      "marjayoun",
      "road",
      "highway"
    ],
    [
      "sidon",
      "nabatieh",
      "road",
      "highway"
    ],
    [
      "nabatieh",
      "tyre",
      "road",
      "highway"
    ],
    [
      "baabda",
      "zahle",
      "road",
      "highway"
    ],
    [
      "baabda",
      "sidon",
      "road",
      "highway"
    ],
    [
      "tripoli",
      "zahle",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "lb_0",
    "name": "Georges Nassar",
    "title": "President",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 34,
    "int": 60,
    "pol": 64,
    "chr": 48,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "lb.beirut"
  },
  {
    "id": "lb_1",
    "name": "Rima Chehab",
    "title": "Minister of Defense",
    "rank": "Amid",
    "branch": "Lebanese Army",
    "slot": "defense_minister",
    "war": 48,
    "int": 52,
    "pol": 46,
    "chr": 50,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "lb.baabda"
  },
  {
    "id": "lb_2",
    "name": "Walid Frem",
    "title": "Chief of Staff",
    "rank": "Aqid",
    "branch": "Lebanese Army",
    "slot": "chief_of_staff",
    "war": 55,
    "int": 44,
    "pol": 36,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "lb.tripoli"
  },
  {
    "id": "lb_3",
    "name": "Elias Haddad",
    "title": "Front commander",
    "rank": "Aqid",
    "branch": "Lebanese Army",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "lb.sidon"
  },
  {
    "id": "lb_4",
    "name": "Nadia Khoury",
    "title": "South command",
    "rank": "Ra'id",
    "branch": "Lebanese Army",
    "slot": "field_officer",
    "war": 48,
    "int": 46,
    "pol": 40,
    "chr": 44,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "lb.zahle"
  }
])
});

export const SYRIA_REGION = land({
  "id": "sy",
  "name": "Syria",
  "country": "SY",
  "bbox": {
    "minLon": 34.28,
    "maxLon": 42.72,
    "minLat": 31.12,
    "maxLat": 38.55
  },
  "notes": "Atlas only. Fourteen governorates, including Quneitra. Oil is at Deir ez-Zor. The Golan occupation is on the Israeli sheet; this Quneitra pin is the Syrian side of the line. Occupied and off the week-0 march.",
  "defaultBiome": "mediterranean",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "SY-DI",
      "name": "Damascus",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-RD",
      "name": "Rif Dimashq",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-HL",
      "name": "Aleppo",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-HM",
      "name": "Homs",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-HA",
      "name": "Hama",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-LA",
      "name": "Latakia",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-ID",
      "name": "Idlib",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-HI",
      "name": "Al-Hasakah",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-DY",
      "name": "Deir ez-Zor",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-TA",
      "name": "Tartus",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-RA",
      "name": "Raqqa",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-DR",
      "name": "Daraa",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-SU",
      "name": "As-Suwayda",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "SY-QU",
      "name": "Quneitra",
      "kind": "governorate",
      "group": null
    }
  ],
  "cities": [
    [
      "damascus",
      "Damascus",
      "SY-DI",
      33.51,
      36.29,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "douma",
      "Douma",
      "SY-RD",
      33.57,
      36.4,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "aleppo",
      "Aleppo",
      "SY-HL",
      36.2,
      37.16,
      "capital",
      [
        "wheat",
        "cotton"
      ]
    ],
    [
      "homs",
      "Homs",
      "SY-HM",
      34.73,
      36.71,
      "capital",
      [
        "oil",
        "wheat"
      ]
    ],
    [
      "hama",
      "Hama",
      "SY-HA",
      35.13,
      36.75,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "latakia",
      "Latakia",
      "SY-LA",
      35.53,
      35.78,
      "capital",
      [
        "port"
      ]
    ],
    [
      "idlib",
      "Idlib",
      "SY-ID",
      35.93,
      36.63,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "hasakah",
      "Hasakah",
      "SY-HI",
      36.5,
      40.75,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "qamishli",
      "Qamishli",
      "SY-HI",
      37.05,
      41.22,
      "city",
      [
        "administration"
      ]
    ],
    [
      "deir",
      "Deir ez-Zor",
      "SY-DY",
      35.34,
      40.14,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "bukamal",
      "Abu Kamal",
      "SY-DY",
      34.45,
      40.92,
      "city",
      [
        "administration"
      ]
    ],
    [
      "tartus",
      "Tartus",
      "SY-TA",
      34.89,
      35.89,
      "capital",
      [
        "port"
      ]
    ],
    [
      "raqqa",
      "Raqqa",
      "SY-RA",
      35.95,
      39.01,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "daraa",
      "Daraa",
      "SY-DR",
      32.62,
      36.1,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "suwayda",
      "As-Suwayda",
      "SY-SU",
      32.71,
      36.57,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "quneitra",
      "Quneitra",
      "SY-QU",
      33.13,
      35.82,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "damascus",
      "douma",
      "road",
      "highway"
    ],
    [
      "homs",
      "hama",
      "road",
      "highway"
    ],
    [
      "daraa",
      "suwayda",
      "road",
      "highway"
    ],
    [
      "aleppo",
      "idlib",
      "road",
      "highway"
    ],
    [
      "damascus",
      "quneitra",
      "road",
      "highway"
    ],
    [
      "daraa",
      "quneitra",
      "road",
      "highway"
    ],
    [
      "latakia",
      "tartus",
      "road",
      "highway"
    ],
    [
      "hasakah",
      "qamishli",
      "road",
      "highway"
    ],
    [
      "homs",
      "tartus",
      "road",
      "highway"
    ],
    [
      "latakia",
      "idlib",
      "road",
      "highway"
    ],
    [
      "deir",
      "bukamal",
      "road",
      "highway"
    ],
    [
      "deir",
      "raqqa",
      "road",
      "highway"
    ],
    [
      "douma",
      "homs",
      "road",
      "highway"
    ],
    [
      "hasakah",
      "deir",
      "road",
      "highway"
    ],
    [
      "aleppo",
      "raqqa",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "sy_0",
    "name": "Adnan Khoury",
    "title": "President",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 42,
    "int": 64,
    "pol": 72,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sy.damascus"
  },
  {
    "id": "sy_1",
    "name": "Bassam Darwish",
    "title": "Minister of Defense",
    "rank": "Imad",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 66,
    "int": 48,
    "pol": 44,
    "chr": 36,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sy.douma"
  },
  {
    "id": "sy_2",
    "name": "Huda Najjar",
    "title": "Chief of Staff",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 52,
    "int": 56,
    "pol": 46,
    "chr": 42,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sy.aleppo"
  },
  {
    "id": "sy_3",
    "name": "Lina Aswad",
    "title": "Front commander",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sy.homs"
  },
  {
    "id": "sy_4",
    "name": "Firas Qaddour",
    "title": "Eastern command",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 70,
    "int": 40,
    "pol": 28,
    "chr": 30,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sy.hama"
  },
  {
    "id": "sy_5",
    "name": "Hatem Sabbagh",
    "title": "Front commander",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sy.latakia"
  }
])
});

export const JORDAN_REGION = land({
  "id": "jo",
  "name": "Jordan",
  "country": "JO",
  "bbox": {
    "minLon": 33.51,
    "maxLon": 37.71,
    "minLat": 28.03,
    "maxLat": 34.06
  },
  "notes": "Atlas only. Eight East Bank governorates. Tafilah was split from Karak in 1987 and stays on this map. Aqaba is still inside Ma'an. The West Bank is on the Israeli sheet, not a Jordanian governorate. Madaba, Jerash, and Ajloun are not split yet. Occupied and off the week-0 march.",
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
      "id": "JO-AM",
      "name": "Amman",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "JO-BA",
      "name": "Balqa",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "JO-IR",
      "name": "Irbid",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "JO-ZA",
      "name": "Zarqa",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "JO-MF",
      "name": "Mafraq",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "JO-KA",
      "name": "Karak",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "JO-AT",
      "name": "Tafilah",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "JO-MN",
      "name": "Ma'an",
      "kind": "governorate",
      "group": null
    }
  ],
  "cities": [
    [
      "amman",
      "Amman",
      "JO-AM",
      31.95,
      35.93,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "salt",
      "Salt",
      "JO-BA",
      32.04,
      35.73,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "irbid",
      "Irbid",
      "JO-IR",
      32.56,
      35.85,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "zarqa",
      "Zarqa",
      "JO-ZA",
      32.07,
      36.09,
      "capital",
      [
        "phosphate"
      ]
    ],
    [
      "mafraq",
      "Mafraq",
      "JO-MF",
      32.34,
      36.21,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "karak",
      "Karak",
      "JO-KA",
      31.18,
      35.7,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tafilah",
      "Tafilah",
      "JO-AT",
      30.83,
      35.6,
      "capital",
      [
        "phosphate"
      ]
    ],
    [
      "maan",
      "Ma'an",
      "JO-MN",
      30.19,
      35.73,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "aqaba",
      "Aqaba",
      "JO-MN",
      29.53,
      35.01,
      "city",
      [
        "port"
      ]
    ]
  ],
  "links": [
    [
      "amman",
      "zarqa",
      "road",
      "highway"
    ],
    [
      "amman",
      "salt",
      "road",
      "highway"
    ],
    [
      "zarqa",
      "mafraq",
      "road",
      "highway"
    ],
    [
      "karak",
      "tafilah",
      "road",
      "highway"
    ],
    [
      "irbid",
      "mafraq",
      "road",
      "highway"
    ],
    [
      "tafilah",
      "maan",
      "road",
      "highway"
    ],
    [
      "amman",
      "karak",
      "road",
      "highway"
    ],
    [
      "maan",
      "aqaba",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "jo_0",
    "name": "Rula Majali",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 32,
    "int": 62,
    "pol": 70,
    "chr": 64,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "jo.amman"
  },
  {
    "id": "jo_1",
    "name": "Fares Hindawi",
    "title": "Minister of Defense",
    "rank": "Fariq",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 60,
    "int": 50,
    "pol": 46,
    "chr": 42,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "jo.salt"
  },
  {
    "id": "jo_2",
    "name": "Sami Tarawneh",
    "title": "Chief of Staff",
    "rank": "Liwa",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 56,
    "int": 52,
    "pol": 40,
    "chr": 38,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "jo.irbid"
  },
  {
    "id": "jo_3",
    "name": "Zaid Naber",
    "title": "Front commander",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "jo.zarqa"
  },
  {
    "id": "jo_4",
    "name": "Hanan Abbadi",
    "title": "Aqaba command",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 44,
    "int": 48,
    "pol": 42,
    "chr": 50,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "jo.mafraq"
  }
])
});
