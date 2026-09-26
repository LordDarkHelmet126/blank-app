import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const KAZAKHSTAN_REGION = land({
  "id": "kz",
  "name": "Kazakh SSR",
  "country": "KZ",
  "bbox": {
    "minLon": 49.67,
    "maxLon": 84.11,
    "minLat": 40.82,
    "maxLat": 56.37
  },
  "notes": "Atlas only. Nineteen oblasts, the set used for most of 1985–89. Mangyshlak, Turgay, Dzhezkazgan, and Taldy-Kurgan were merged away in June 1988 and restored in 1990; they are drawn because they exist for most of this span. Alma-Ata, Tselinograd, and Shevchenko keep those names. The Trans-Siberian crosses at Petropavl. Occupied and off the week-0 march.",
  "defaultBiome": "steppe",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "KZ-AK",
      "name": "Aktyubinsk",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-AL",
      "name": "Alma-Ata",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-CH",
      "name": "Chimkent",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-DZ",
      "name": "Dzhambul",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-JE",
      "name": "Dzhezkazgan",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-EK",
      "name": "East Kazakhstan",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-GU",
      "name": "Guryev",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-KA",
      "name": "Karaganda",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-KO",
      "name": "Kokchetav",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-KU",
      "name": "Kustanay",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-KZ",
      "name": "Kzyl-Orda",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-MG",
      "name": "Mangyshlak",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-NK",
      "name": "North Kazakhstan",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-PA",
      "name": "Pavlodar",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-SE",
      "name": "Semipalatinsk",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-TK",
      "name": "Taldy-Kurgan",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-TS",
      "name": "Tselinograd",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-TU",
      "name": "Turgay",
      "kind": "oblast",
      "group": "Kazakh SSR"
    },
    {
      "id": "KZ-UR",
      "name": "Uralsk",
      "kind": "oblast",
      "group": "Kazakh SSR"
    }
  ],
  "cities": [
    [
      "aktyubinsk",
      "Aktyubinsk",
      "KZ-AK",
      50.28,
      57.21,
      "capital",
      [
        "chrome",
        "oil"
      ]
    ],
    [
      "alma_ata",
      "Alma-Ata",
      "KZ-AL",
      43.24,
      76.95,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "chimkent",
      "Chimkent",
      "KZ-CH",
      42.32,
      69.6,
      "capital",
      [
        "lead"
      ]
    ],
    [
      "dzhambul",
      "Dzhambul",
      "KZ-DZ",
      42.9,
      71.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dzhezkazgan",
      "Dzhezkazgan",
      "KZ-JE",
      47.8,
      67.71,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "ust_kamenogorsk",
      "Ust-Kamenogorsk",
      "KZ-EK",
      49.95,
      82.61,
      "capital",
      [
        "zinc",
        "lead"
      ]
    ],
    [
      "guryev",
      "Guryev",
      "KZ-GU",
      47.12,
      51.88,
      "capital",
      [
        "oil",
        "fisheries"
      ]
    ],
    [
      "karaganda",
      "Karaganda",
      "KZ-KA",
      49.8,
      73.1,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "kokchetav",
      "Kokchetav",
      "KZ-KO",
      53.28,
      69.4,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "kustanay",
      "Kustanay",
      "KZ-KU",
      53.21,
      63.62,
      "capital",
      [
        "iron",
        "wheat"
      ]
    ],
    [
      "kzyl_orda",
      "Kzyl-Orda",
      "KZ-KZ",
      44.85,
      65.51,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "shevchenko",
      "Shevchenko",
      "KZ-MG",
      43.65,
      51.17,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "petropavl",
      "Petropavl",
      "KZ-NK",
      54.87,
      69.14,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "pavlodar",
      "Pavlodar",
      "KZ-PA",
      52.29,
      76.95,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "semipalatinsk",
      "Semipalatinsk",
      "KZ-SE",
      50.41,
      80.23,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "taldy_kurgan",
      "Taldy-Kurgan",
      "KZ-TK",
      45.02,
      78.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tselinograd",
      "Tselinograd",
      "KZ-TS",
      51.17,
      71.45,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "arkalyk",
      "Arkalyk",
      "KZ-TU",
      50.25,
      66.91,
      "capital",
      [
        "bauxite"
      ]
    ],
    [
      "uralsk",
      "Uralsk",
      "KZ-UR",
      51.23,
      51.37,
      "capital",
      [
        "wheat"
      ]
    ]
  ],
  "links": [
    [
      "aktyubinsk",
      "kustanay",
      "road",
      "local road"
    ],
    [
      "aktyubinsk",
      "uralsk",
      "road",
      "M32"
    ],
    [
      "alma_ata",
      "chimkent",
      "road",
      "M39"
    ],
    [
      "alma_ata",
      "dzhambul",
      "road",
      "local road"
    ],
    [
      "alma_ata",
      "taldy_kurgan",
      "road",
      "Turkestan highway"
    ],
    [
      "arkalyk",
      "dzhezkazgan",
      "road",
      "local road"
    ],
    [
      "arkalyk",
      "tselinograd",
      "road",
      "local road"
    ],
    [
      "chimkent",
      "dzhambul",
      "road",
      "M39"
    ],
    [
      "chimkent",
      "kzyl_orda",
      "road",
      "local road"
    ],
    [
      "dzhezkazgan",
      "karaganda",
      "road",
      "steppe road"
    ],
    [
      "dzhezkazgan",
      "kzyl_orda",
      "road",
      "local road"
    ],
    [
      "guryev",
      "shevchenko",
      "road",
      "Mangyshlak road"
    ],
    [
      "guryev",
      "uralsk",
      "road",
      "local road"
    ],
    [
      "karaganda",
      "pavlodar",
      "road",
      "local road"
    ],
    [
      "karaganda",
      "tselinograd",
      "road",
      "M36"
    ],
    [
      "kokchetav",
      "kustanay",
      "road",
      "local road"
    ],
    [
      "kokchetav",
      "petropavl",
      "road",
      "M51"
    ],
    [
      "kokchetav",
      "tselinograd",
      "road",
      "M36"
    ],
    [
      "pavlodar",
      "semipalatinsk",
      "road",
      "M38"
    ],
    [
      "semipalatinsk",
      "ust_kamenogorsk",
      "road",
      "M38"
    ]
  ]
,
  officers: staff([
  {
    "id": "kz_head",
    "name": "Nurlan Beketay",
    "title": "Chairman of the Kazakh Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 42,
    "int": 64,
    "pol": 70,
    "chr": 48,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster kz_head.",
    "region": "kz.alma_ata"
  },
  {
    "id": "kz_def",
    "name": "Aigul Sarsenova",
    "title": "Central Asian Military District",
    "rank": "General-leytenant",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 62,
    "int": 66,
    "pol": 44,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional defense minister. Roster kz_def.",
    "region": "kz.alma_ata"
  },
  {
    "id": "kz_chief",
    "name": "Yerlan Mukhit",
    "title": "Chief of Staff",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "chief_of_staff",
    "war": 56,
    "int": 70,
    "pol": 50,
    "chr": 36,
    "personality": "schemer",
    "bio": "Fictional chief of staff. Roster kz_chief.",
    "region": "kz.alma_ata"
  },
  {
    "id": "kz_f0",
    "name": "Marat Zhunisov",
    "title": "Virgin Lands sector",
    "rank": "Podpolkovnik",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 50,
    "int": 58,
    "pol": 40,
    "chr": 44,
    "personality": "merchant",
    "bio": "Fictional front commander. Roster kz_f0.",
    "region": "kz.tselinograd"
  },
  {
    "id": "kz_field",
    "name": "Dana Tulegen",
    "title": "Alma-Ata garrison",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 52,
    "int": 60,
    "pol": 42,
    "chr": 50,
    "personality": "loyalist",
    "bio": "Fictional field officer. Roster kz_field.",
    "region": "kz.alma_ata"
  },
  {
    "id": "kz_f1",
    "name": "Aigerim Nurlanova",
    "title": "Karaganda sector",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 54,
    "int": 52,
    "pol": 36,
    "chr": 42,
    "personality": "loyalist",
    "bio": "Fictional front commander. Roster kz_f1.",
    "region": "kz.karaganda"
  }
])
});
