import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const UZBEKISTAN_REGION = land({
  "id": "uz",
  "name": "Uzbek SSR",
  "country": "UZ",
  "bbox": {
    "minLon": 58.1,
    "maxLon": 73.84,
    "minLat": 35.72,
    "maxLat": 43.96
  },
  "notes": "Atlas only. Twelve oblasts plus the Karakalpak ASSR. Navoi exists from 1982. Cotton is the Fergana, Khorezm, and Karakalpak yield. Tashkent city is not split from the oblast. Occupied and off the week-0 march.",
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
      "id": "UZ-AN",
      "name": "Andijan",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-BU",
      "name": "Bukhara",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-FA",
      "name": "Fergana",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-JI",
      "name": "Jizzakh",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-QA",
      "name": "Kashkadarya",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-XO",
      "name": "Khorezm",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-NG",
      "name": "Namangan",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-NW",
      "name": "Navoi",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-SA",
      "name": "Samarkand",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-SU",
      "name": "Surkhandarya",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-SI",
      "name": "Syrdarya",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-TO",
      "name": "Tashkent",
      "kind": "oblast",
      "group": "Uzbek SSR"
    },
    {
      "id": "UZ-QR",
      "name": "Karakalpak ASSR",
      "kind": "assr",
      "group": "Uzbek SSR"
    }
  ],
  "cities": [
    [
      "andijan",
      "Andijan",
      "UZ-AN",
      40.78,
      72.34,
      "capital",
      [
        "cotton",
        "oil"
      ]
    ],
    [
      "bukhara",
      "Bukhara",
      "UZ-BU",
      39.77,
      64.42,
      "capital",
      [
        "natural_gas"
      ]
    ],
    [
      "fergana",
      "Fergana",
      "UZ-FA",
      40.39,
      71.79,
      "capital",
      [
        "cotton",
        "oil"
      ]
    ],
    [
      "jizzakh",
      "Jizzakh",
      "UZ-JI",
      40.12,
      67.84,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "karshi",
      "Karshi",
      "UZ-QA",
      38.86,
      65.8,
      "capital",
      [
        "natural_gas"
      ]
    ],
    [
      "urgench",
      "Urgench",
      "UZ-XO",
      41.55,
      60.63,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "namangan",
      "Namangan",
      "UZ-NG",
      40.1,
      71.67,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "navoi",
      "Navoi",
      "UZ-NW",
      40.1,
      65.38,
      "capital",
      [
        "gold"
      ]
    ],
    [
      "samarkand",
      "Samarkand",
      "UZ-SA",
      39.65,
      66.96,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "termez",
      "Termez",
      "UZ-SU",
      37.22,
      67.28,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "gulistan",
      "Gulistan",
      "UZ-SI",
      40.49,
      68.78,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "tashkent",
      "Tashkent",
      "UZ-TO",
      41.3,
      69.24,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nukus",
      "Nukus",
      "UZ-QR",
      42.46,
      59.6,
      "capital",
      [
        "cotton"
      ]
    ]
  ],
  "links": [
    [
      "andijan",
      "fergana",
      "road",
      "Fergana Valley"
    ],
    [
      "bukhara",
      "navoi",
      "road",
      "M37"
    ],
    [
      "bukhara",
      "samarkand",
      "road",
      "M37"
    ],
    [
      "bukhara",
      "urgench",
      "road",
      "local road"
    ],
    [
      "fergana",
      "namangan",
      "road",
      "Fergana Valley"
    ],
    [
      "fergana",
      "tashkent",
      "road",
      "Fergana Valley"
    ],
    [
      "gulistan",
      "jizzakh",
      "road",
      "local road"
    ],
    [
      "gulistan",
      "tashkent",
      "road",
      "local road"
    ],
    [
      "jizzakh",
      "samarkand",
      "road",
      "local road"
    ],
    [
      "karshi",
      "navoi",
      "road",
      "local road"
    ],
    [
      "karshi",
      "samarkand",
      "road",
      "M39"
    ],
    [
      "karshi",
      "termez",
      "road",
      "M39"
    ],
    [
      "nukus",
      "urgench",
      "road",
      "Khorezm road"
    ],
    [
      "samarkand",
      "tashkent",
      "road",
      "M39"
    ]
  ]
,
  officers: staff([
  {
    "id": "uz_head",
    "name": "Dilshod Karimov",
    "title": "Chairman of the Uzbek Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 40,
    "int": 62,
    "pol": 72,
    "chr": 44,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster uz_head.",
    "region": "uz.tashkent"
  },
  {
    "id": "uz_def",
    "name": "Malika Yusupova",
    "title": "Turkestan Military District",
    "rank": "General-mayor",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 60,
    "int": 64,
    "pol": 42,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional defense minister. Roster uz_def.",
    "region": "uz.tashkent"
  },
  {
    "id": "uz_chief",
    "name": "Rustam Nazarov",
    "title": "Chief of Staff",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "chief_of_staff",
    "war": 56,
    "int": 70,
    "pol": 54,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional chief of staff. Roster uz_chief.",
    "region": "uz.tashkent"
  },
  {
    "id": "uz_f0",
    "name": "Jasur Tursunov",
    "title": "Fergana sector",
    "rank": "Podpolkovnik",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 52,
    "int": 56,
    "pol": 38,
    "chr": 40,
    "personality": "merchant",
    "bio": "Fictional front commander. Roster uz_f0.",
    "region": "uz.fergana"
  },
  {
    "id": "uz_field",
    "name": "Nodira Ismailova",
    "title": "Tashkent garrison",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 50,
    "int": 58,
    "pol": 44,
    "chr": 48,
    "personality": "loyalist",
    "bio": "Fictional field officer. Roster uz_field.",
    "region": "uz.tashkent"
  }
])
});
export const KIRGHIZIA_REGION = land({
  "id": "kg",
  "name": "Kirghiz SSR",
  "country": "KG",
  "bbox": {
    "minLon": 70.74,
    "maxLon": 79.89,
    "minLat": 39.03,
    "maxLat": 44.37
  },
  "notes": "Atlas only. Frunze and the oblasts of Osh, Issyk-Kul, Naryn, and Talas. Przhevalsk has not been renamed Karakol. The Pamir Highway leaves Osh for Khorog. Occupied and off the week-0 march.",
  "defaultBiome": "continental",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "KG-FR",
      "name": "Frunze",
      "kind": "city",
      "group": "Kirghiz SSR"
    },
    {
      "id": "KG-OS",
      "name": "Osh",
      "kind": "oblast",
      "group": "Kirghiz SSR"
    },
    {
      "id": "KG-IK",
      "name": "Issyk-Kul",
      "kind": "oblast",
      "group": "Kirghiz SSR"
    },
    {
      "id": "KG-NA",
      "name": "Naryn",
      "kind": "oblast",
      "group": "Kirghiz SSR"
    },
    {
      "id": "KG-TL",
      "name": "Talas",
      "kind": "oblast",
      "group": "Kirghiz SSR"
    }
  ],
  "cities": [
    [
      "frunze",
      "Frunze",
      "KG-FR",
      42.87,
      74.59,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "osh",
      "Osh",
      "KG-OS",
      40.53,
      72.8,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "przhevalsk",
      "Przhevalsk",
      "KG-IK",
      42.49,
      78.39,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "naryn",
      "Naryn",
      "KG-NA",
      41.43,
      76.0,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "talas",
      "Talas",
      "KG-TL",
      42.52,
      72.24,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "frunze",
      "naryn",
      "road",
      "local road"
    ],
    [
      "frunze",
      "talas",
      "road",
      "M41"
    ],
    [
      "naryn",
      "osh",
      "road",
      "mountain road"
    ],
    [
      "naryn",
      "przhevalsk",
      "road",
      "local road"
    ],
    [
      "osh",
      "talas",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "kg_head",
    "name": "Aida Toktogul",
    "title": "Chairman of the Kirghiz Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 38,
    "int": 66,
    "pol": 64,
    "chr": 52,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster kg_head.",
    "region": "kg.frunze"
  },
  {
    "id": "kg_def",
    "name": "Bakyt Eraliev",
    "title": "Frunze garrison",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 58,
    "int": 56,
    "pol": 40,
    "chr": 42,
    "personality": "loyalist",
    "bio": "Fictional defense minister. Roster kg_def.",
    "region": "kg.frunze"
  },
  {
    "id": "kg_field",
    "name": "Ermek Sadykov",
    "title": "Osh sector",
    "rank": "Kapitan",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 54,
    "int": 52,
    "pol": 36,
    "chr": 34,
    "personality": "ambitious",
    "bio": "Fictional field officer. Roster kg_field.",
    "region": "kg.frunze"
  }
])
});
export const TAJIKISTAN_REGION = land({
  "id": "tj",
  "name": "Tajik SSR",
  "country": "TJ",
  "bbox": {
    "minLon": 67.27,
    "maxLon": 73.05,
    "minLat": 35.99,
    "maxLat": 41.78
  },
  "notes": "Atlas only. Dushanbe, Leninabad, Kulyab, Kurgan-Tyube, and the Gorno-Badakhshan autonomous oblast. Leninabad is the city's name. The Anzob pass joins Dushanbe to the Fergana side, and the Pamir Highway reaches Khorog. Occupied and off the week-0 march.",
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
      "id": "TJ-DU",
      "name": "Dushanbe",
      "kind": "city",
      "group": "Tajik SSR"
    },
    {
      "id": "TJ-LE",
      "name": "Leninabad",
      "kind": "oblast",
      "group": "Tajik SSR"
    },
    {
      "id": "TJ-KU",
      "name": "Kulyab",
      "kind": "oblast",
      "group": "Tajik SSR"
    },
    {
      "id": "TJ-KT",
      "name": "Kurgan-Tyube",
      "kind": "oblast",
      "group": "Tajik SSR"
    },
    {
      "id": "TJ-GB",
      "name": "Gorno-Badakhshan",
      "kind": "autonomous_oblast",
      "group": "Tajik SSR"
    }
  ],
  "cities": [
    [
      "dushanbe",
      "Dushanbe",
      "TJ-DU",
      38.56,
      68.77,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "khujand",
      "Leninabad",
      "TJ-LE",
      40.28,
      69.62,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "kulyab",
      "Kulyab",
      "TJ-KU",
      37.91,
      69.78,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "kurgan_tyube",
      "Kurgan-Tyube",
      "TJ-KT",
      37.84,
      68.78,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "khorog",
      "Khorog",
      "TJ-GB",
      37.49,
      71.55,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "dushanbe",
      "khorog",
      "road",
      "M41 Pamir Highway"
    ],
    [
      "dushanbe",
      "khujand",
      "road",
      "Anzob Pass"
    ],
    [
      "dushanbe",
      "kurgan_tyube",
      "road",
      "M41"
    ],
    [
      "khorog",
      "kulyab",
      "road",
      "local road"
    ],
    [
      "kulyab",
      "kurgan_tyube",
      "road",
      "valley road"
    ]
  ]
,
  officers: staff([
  {
    "id": "tj_head",
    "name": "Farzona Rahimova",
    "title": "Chairman of the Tajik Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 36,
    "int": 64,
    "pol": 68,
    "chr": 50,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster tj_head.",
    "region": "tj.dushanbe"
  },
  {
    "id": "tj_def",
    "name": "Davlat Sharipov",
    "title": "Dushanbe garrison",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 60,
    "int": 58,
    "pol": 38,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional defense minister. Roster tj_def.",
    "region": "tj.dushanbe"
  },
  {
    "id": "tj_field",
    "name": "Parviz Nurov",
    "title": "Pamir sector",
    "rank": "Kapitan",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 58,
    "int": 50,
    "pol": 28,
    "chr": 32,
    "personality": "recluse",
    "bio": "Fictional field officer. Roster tj_field.",
    "region": "tj.dushanbe"
  }
])
});
export const TURKMENISTAN_REGION = land({
  "id": "tm",
  "name": "Turkmen SSR",
  "country": "TM",
  "bbox": {
    "minLon": 51.47,
    "maxLon": 65.08,
    "minLat": 33.70,
    "maxLat": 43.33
  },
  "notes": "Atlas only. Five oblasts. Ashkhabad and Krasnovodsk keep those names. Krasnovodsk is the Caspian ferry to Baku. Mary is gas. Kushka is the Afghan border town. Occupied and off the week-0 march.",
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
      "id": "TM-AS",
      "name": "Ashkhabad",
      "kind": "oblast",
      "group": "Turkmen SSR"
    },
    {
      "id": "TM-KR",
      "name": "Krasnovodsk",
      "kind": "oblast",
      "group": "Turkmen SSR"
    },
    {
      "id": "TM-MA",
      "name": "Mary",
      "kind": "oblast",
      "group": "Turkmen SSR"
    },
    {
      "id": "TM-CH",
      "name": "Chardzhou",
      "kind": "oblast",
      "group": "Turkmen SSR"
    },
    {
      "id": "TM-TA",
      "name": "Tashauz",
      "kind": "oblast",
      "group": "Turkmen SSR"
    }
  ],
  "cities": [
    [
      "ashkhabad",
      "Ashkhabad",
      "TM-AS",
      37.96,
      58.33,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "krasnovodsk",
      "Krasnovodsk",
      "TM-KR",
      40.02,
      52.97,
      "capital",
      [
        "port",
        "oil"
      ]
    ],
    [
      "mary",
      "Mary",
      "TM-MA",
      37.59,
      61.83,
      "capital",
      [
        "natural_gas",
        "cotton"
      ]
    ],
    [
      "kushka",
      "Kushka",
      "TM-MA",
      35.28,
      62.35,
      "city",
      [
        "administration"
      ]
    ],
    [
      "chardzhou",
      "Chardzhou",
      "TM-CH",
      39.08,
      63.58,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "tashauz",
      "Tashauz",
      "TM-TA",
      41.83,
      59.97,
      "capital",
      [
        "cotton"
      ]
    ]
  ],
  "links": [
    [
      "ashkhabad",
      "krasnovodsk",
      "road",
      "Caspian highway"
    ],
    [
      "ashkhabad",
      "mary",
      "road",
      "M37"
    ],
    [
      "mary",
      "kushka",
      "road",
      "Kushka spur"
    ],
    [
      "chardzhou",
      "mary",
      "road",
      "M37"
    ],
    [
      "chardzhou",
      "tashauz",
      "road",
      "Amu Darya road"
    ]
  ]
,
  officers: staff([
  {
    "id": "tm_head",
    "name": "Oguljahan Berdiyeva",
    "title": "Chairman of the Turkmen Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 38,
    "int": 62,
    "pol": 66,
    "chr": 48,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster tm_head.",
    "region": "tm.ashkhabad"
  },
  {
    "id": "tm_def",
    "name": "Serdar Annayev",
    "title": "Ashkhabad garrison",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 58,
    "int": 54,
    "pol": 36,
    "chr": 40,
    "personality": "loyalist",
    "bio": "Fictional defense minister. Roster tm_def.",
    "region": "tm.ashkhabad"
  },
  {
    "id": "tm_field",
    "name": "Dowlet Orazov",
    "title": "Mary sector",
    "rank": "Kapitan",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 50,
    "int": 56,
    "pol": 34,
    "chr": 38,
    "personality": "cautious",
    "bio": "Fictional field officer. Roster tm_field.",
    "region": "tm.ashkhabad"
  }
])
});
