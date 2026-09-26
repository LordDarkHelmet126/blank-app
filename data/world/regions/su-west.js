import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const BELORUSSIA_REGION = land({
  "id": "by",
  "name": "Belorussian SSR",
  "country": "BY",
  "bbox": {
    "minLon": 22.19,
    "maxLon": 32.48,
    "minLat": 50.6,
    "maxLat": 56.69
  },
  "notes": "Atlas only. Six oblasts. The republic is still Belorussia. Occupied and off the week-0 march.",
  "defaultBiome": "continental",
  "climate": {
    "_default": {
      "sun": 2,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "BY-MI",
      "name": "Minsk",
      "kind": "oblast",
      "group": "Belorussian SSR"
    },
    {
      "id": "BY-BR",
      "name": "Brest",
      "kind": "oblast",
      "group": "Belorussian SSR"
    },
    {
      "id": "BY-HO",
      "name": "Gomel",
      "kind": "oblast",
      "group": "Belorussian SSR"
    },
    {
      "id": "BY-HR",
      "name": "Grodno",
      "kind": "oblast",
      "group": "Belorussian SSR"
    },
    {
      "id": "BY-MA",
      "name": "Mogilev",
      "kind": "oblast",
      "group": "Belorussian SSR"
    },
    {
      "id": "BY-VI",
      "name": "Vitebsk",
      "kind": "oblast",
      "group": "Belorussian SSR"
    }
  ],
  "cities": [
    [
      "minsk",
      "Minsk",
      "BY-MI",
      53.9,
      27.57,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "brest",
      "Brest",
      "BY-BR",
      52.1,
      23.69,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gomel",
      "Gomel",
      "BY-HO",
      52.43,
      30.98,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "grodno",
      "Grodno",
      "BY-HR",
      53.67,
      23.83,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mogilev",
      "Mogilev",
      "BY-MA",
      53.9,
      30.34,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "vitebsk",
      "Vitebsk",
      "BY-VI",
      55.19,
      30.2,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "brest",
      "grodno",
      "road",
      "local road"
    ],
    [
      "brest",
      "minsk",
      "road",
      "M1"
    ],
    [
      "gomel",
      "minsk",
      "road",
      "M5"
    ],
    [
      "gomel",
      "mogilev",
      "road",
      "local road"
    ],
    [
      "grodno",
      "minsk",
      "road",
      "local road"
    ],
    [
      "minsk",
      "mogilev",
      "road",
      "local road"
    ],
    [
      "minsk",
      "vitebsk",
      "road",
      "M3"
    ],
    [
      "mogilev",
      "vitebsk",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "by_head",
    "name": "Pavel Litvin",
    "title": "Chairman of the Belorussian Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 40,
    "int": 60,
    "pol": 68,
    "chr": 46,
    "personality": "loyalist",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster by_head.",
    "region": "by.minsk"
  },
  {
    "id": "by_def",
    "name": "Hanna Karal",
    "title": "Belorussian Military District",
    "rank": "General-leytenant",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 66,
    "int": 58,
    "pol": 40,
    "chr": 42,
    "personality": "cautious",
    "bio": "Fictional defense minister. Roster by_def.",
    "region": "by.minsk"
  },
  {
    "id": "by_field",
    "name": "Olga Baran",
    "title": "Minsk garrison",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 50,
    "int": 56,
    "pol": 42,
    "chr": 48,
    "personality": "loyalist",
    "bio": "Fictional field officer. Roster by_field.",
    "region": "by.minsk"
  }
])
});
export const MOLDAVIA_REGION = land({
  "id": "md",
  "name": "Moldavian SSR",
  "country": "MD",
  "bbox": {
    "minLon": 25.8,
    "maxLon": 31.11,
    "minLat": 44.41,
    "maxLat": 49.67
  },
  "notes": "Atlas only. The republic had raions, not oblasts. These twelve are the principal seats; the smaller raions are not pinned. Kishinev, Beltsy, Tiraspol, and Bendery are the cities. No separate Transnistrian republic. Occupied and off the week-0 march.",
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
      "id": "MD-KI",
      "name": "Kishinev",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-BE",
      "name": "Beltsy",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-TI",
      "name": "Tiraspol",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-BN",
      "name": "Bendery",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-OR",
      "name": "Orhei",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-SO",
      "name": "Soroca",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-CA",
      "name": "Cahul",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-UN",
      "name": "Ungheni",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-RY",
      "name": "Rybnitsa",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-CO",
      "name": "Comrat",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-DU",
      "name": "Dubossary",
      "kind": "raion",
      "group": "Moldavian SSR"
    },
    {
      "id": "MD-ED",
      "name": "Edinet",
      "kind": "raion",
      "group": "Moldavian SSR"
    }
  ],
  "cities": [
    [
      "kishinev",
      "Kishinev",
      "MD-KI",
      47.01,
      28.86,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "beltsy",
      "Beltsy",
      "MD-BE",
      47.76,
      27.93,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tiraspol",
      "Tiraspol",
      "MD-TI",
      46.84,
      29.61,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bendery",
      "Bendery",
      "MD-BN",
      46.83,
      29.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "orhei",
      "Orhei",
      "MD-OR",
      47.38,
      28.82,
      "capital",
      [
        "grapes"
      ]
    ],
    [
      "soroca",
      "Soroca",
      "MD-SO",
      48.16,
      28.3,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "cahul",
      "Cahul",
      "MD-CA",
      45.91,
      28.19,
      "capital",
      [
        "grapes"
      ]
    ],
    [
      "ungheni",
      "Ungheni",
      "MD-UN",
      47.21,
      27.8,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "rybnitsa",
      "Rybnitsa",
      "MD-RY",
      47.77,
      29.0,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "comrat",
      "Comrat",
      "MD-CO",
      46.3,
      28.66,
      "capital",
      [
        "grapes"
      ]
    ],
    [
      "dubossary",
      "Dubossary",
      "MD-DU",
      47.27,
      29.16,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "edinet",
      "Edinet",
      "MD-ED",
      48.17,
      27.3,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "beltsy",
      "edinet",
      "road",
      "local road"
    ],
    [
      "beltsy",
      "kishinev",
      "road",
      "M14"
    ],
    [
      "beltsy",
      "soroca",
      "road",
      "local road"
    ],
    [
      "beltsy",
      "ungheni",
      "road",
      "local road"
    ],
    [
      "bendery",
      "kishinev",
      "road",
      "local road"
    ],
    [
      "bendery",
      "tiraspol",
      "road",
      "local road"
    ],
    [
      "cahul",
      "comrat",
      "road",
      "local road"
    ],
    [
      "cahul",
      "kishinev",
      "road",
      "M3"
    ],
    [
      "comrat",
      "kishinev",
      "road",
      "local road"
    ],
    [
      "dubossary",
      "kishinev",
      "road",
      "local road"
    ],
    [
      "dubossary",
      "orhei",
      "road",
      "local road"
    ],
    [
      "kishinev",
      "tiraspol",
      "road",
      "M14"
    ],
    [
      "orhei",
      "rybnitsa",
      "road",
      "local road"
    ],
    [
      "rybnitsa",
      "soroca",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "md_head",
    "name": "Ion Ceban",
    "title": "Chairman of the Moldavian Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 38,
    "int": 60,
    "pol": 66,
    "chr": 48,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster md_head.",
    "region": "md.kishinev"
  },
  {
    "id": "md_def",
    "name": "Vera Lungu",
    "title": "Kishinev garrison",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 56,
    "int": 58,
    "pol": 40,
    "chr": 44,
    "personality": "cautious",
    "bio": "Fictional defense minister. Roster md_def.",
    "region": "md.kishinev"
  },
  {
    "id": "md_chief",
    "name": "Petru Racu",
    "title": "Chief of Staff",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "chief_of_staff",
    "war": 52,
    "int": 62,
    "pol": 42,
    "chr": 40,
    "personality": "loyalist",
    "bio": "Fictional chief of staff. Roster md_chief.",
    "region": "md.kishinev"
  },
  {
    "id": "md_f0",
    "name": "Sergiu Cojocaru",
    "title": "Tiraspol sector",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 54,
    "int": 52,
    "pol": 34,
    "chr": 36,
    "personality": "cautious",
    "bio": "Fictional front commander. Roster md_f0.",
    "region": "md.tiraspol"
  },
  {
    "id": "md_field",
    "name": "Ana Grecu",
    "title": "District officer",
    "rank": "Kapitan",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 48,
    "int": 64,
    "pol": 50,
    "chr": 46,
    "personality": "ambitious",
    "bio": "Fictional field officer. Roster md_field.",
    "region": "md.kishinev"
  }
])
});
export const ESTONIA_REGION = land({
  "id": "ee",
  "name": "Estonian SSR",
  "country": "EE",
  "bbox": {
    "minLon": 20.99,
    "maxLon": 29.69,
    "minLat": 56.28,
    "maxLat": 60.94
  },
  "notes": "Atlas only. Fifteen raions. The republic had no oblasts. Tallinn is the Harju seat. Saaremaa and Hiiumaa are ferries. Ida-Viru is oil shale, mapped as oil. Occupied and off the week-0 march.",
  "defaultBiome": "temperate",
  "climate": {
    "_default": {
      "sun": 2,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "EE-HA",
      "name": "Harju",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-HI",
      "name": "Hiiu",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-IV",
      "name": "Ida-Viru",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-JG",
      "name": "Jõgeva",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-JR",
      "name": "Järva",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-LN",
      "name": "Lääne",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-LV",
      "name": "Lääne-Viru",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-PL",
      "name": "Põlva",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-PR",
      "name": "Pärnu",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-RA",
      "name": "Rapla",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-SA",
      "name": "Saare",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-TA",
      "name": "Tartu",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-VG",
      "name": "Valga",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-VI",
      "name": "Viljandi",
      "kind": "raion",
      "group": "Estonian SSR"
    },
    {
      "id": "EE-VR",
      "name": "Võru",
      "kind": "raion",
      "group": "Estonian SSR"
    }
  ],
  "cities": [
    [
      "tallinn",
      "Tallinn",
      "EE-HA",
      59.44,
      24.75,
      "capital",
      [
        "port"
      ]
    ],
    [
      "kardla",
      "Kärdla",
      "EE-HI",
      58.99,
      22.75,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "johvi",
      "Jõhvi",
      "EE-IV",
      59.36,
      27.41,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "jogeva",
      "Jõgeva",
      "EE-JG",
      58.75,
      26.39,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "paide",
      "Paide",
      "EE-JR",
      58.89,
      25.56,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "haapsalu",
      "Haapsalu",
      "EE-LN",
      58.94,
      23.54,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "rakvere",
      "Rakvere",
      "EE-LV",
      59.35,
      26.36,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "polva",
      "Põlva",
      "EE-PL",
      58.06,
      27.05,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "parnu",
      "Pärnu",
      "EE-PR",
      58.39,
      24.5,
      "capital",
      [
        "port"
      ]
    ],
    [
      "rapla",
      "Rapla",
      "EE-RA",
      59.0,
      24.79,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kuressaare",
      "Kuressaare",
      "EE-SA",
      58.25,
      22.49,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "tartu",
      "Tartu",
      "EE-TA",
      58.38,
      26.73,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "valga",
      "Valga",
      "EE-VG",
      57.78,
      26.05,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "viljandi",
      "Viljandi",
      "EE-VI",
      58.36,
      25.6,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "voru",
      "Võru",
      "EE-VR",
      57.84,
      27.0,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "narva",
      "Narva",
      "EE-IV",
      59.38,
      28.19,
      "city",
      [
        "port"
      ]
    ]
  ],
  "links": [
    [
      "haapsalu",
      "kardla",
      "sea",
      "Hiiumaa ferry"
    ],
    [
      "haapsalu",
      "kuressaare",
      "sea",
      "Saaremaa ferry"
    ],
    [
      "haapsalu",
      "rapla",
      "road",
      "local road"
    ],
    [
      "jogeva",
      "paide",
      "road",
      "local road"
    ],
    [
      "jogeva",
      "rakvere",
      "road",
      "local road"
    ],
    [
      "jogeva",
      "tartu",
      "road",
      "local road"
    ],
    [
      "johvi",
      "narva",
      "road",
      "E20"
    ],
    [
      "johvi",
      "rakvere",
      "road",
      "local road"
    ],
    [
      "paide",
      "rapla",
      "road",
      "local road"
    ],
    [
      "paide",
      "viljandi",
      "road",
      "local road"
    ],
    [
      "parnu",
      "tallinn",
      "road",
      "Via Baltica"
    ],
    [
      "parnu",
      "viljandi",
      "road",
      "local road"
    ],
    [
      "polva",
      "tartu",
      "road",
      "local road"
    ],
    [
      "polva",
      "voru",
      "road",
      "local road"
    ],
    [
      "rapla",
      "tallinn",
      "road",
      "local road"
    ],
    [
      "tallinn",
      "tartu",
      "road",
      "E263"
    ],
    [
      "valga",
      "voru",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "ee_head",
    "name": "Tarmo Leht",
    "title": "Chairman of the Estonian Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 36,
    "int": 66,
    "pol": 64,
    "chr": 52,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster ee_head.",
    "region": "ee.tallinn"
  },
  {
    "id": "ee_def",
    "name": "Kadri Pärn",
    "title": "Tallinn garrison",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 54,
    "int": 62,
    "pol": 40,
    "chr": 50,
    "personality": "cautious",
    "bio": "Fictional defense minister. Roster ee_def.",
    "region": "ee.tallinn"
  },
  {
    "id": "ee_chief",
    "name": "Andres Kuusk",
    "title": "Chief of Staff",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "chief_of_staff",
    "war": 50,
    "int": 64,
    "pol": 42,
    "chr": 44,
    "personality": "loyalist",
    "bio": "Fictional chief of staff. Roster ee_chief.",
    "region": "ee.tallinn"
  },
  {
    "id": "ee_f0",
    "name": "Mart Kask",
    "title": "Northern corps",
    "rank": "Podpolkovnik",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 52,
    "int": 58,
    "pol": 30,
    "chr": 36,
    "personality": "recluse",
    "bio": "Fictional front commander. Roster ee_f0.",
    "region": "ee.tallinn"
  },
  {
    "id": "ee_field",
    "name": "Liis Rebane",
    "title": "Baltic Fleet liaison",
    "rank": "Kapitan",
    "branch": "Soviet Navy",
    "slot": "field_officer",
    "war": 48,
    "int": 60,
    "pol": 38,
    "chr": 56,
    "personality": "merchant",
    "bio": "Fictional field officer. Roster ee_field.",
    "region": "ee.tallinn"
  },
  {
    "id": "ee_f1",
    "name": "Kaja Tamm",
    "title": "Tartu sector",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 50,
    "int": 60,
    "pol": 36,
    "chr": 48,
    "personality": "loyalist",
    "bio": "Fictional front commander. Roster ee_f1.",
    "region": "ee.tartu"
  }
])
});
export const LATVIA_REGION = land({
  "id": "lv",
  "name": "Latvian SSR",
  "country": "LV",
  "bbox": {
    "minLon": 19.51,
    "maxLon": 29.22,
    "minLat": 54.37,
    "maxLat": 59.28
  },
  "notes": "Atlas only. Twenty-six raions. Stuchka has not been renamed Aizkraukle. Riga city is separate from the Riga raion, whose pin is Sigulda. Ventspils is the oil port. Occupied and off the week-0 march.",
  "defaultBiome": "temperate",
  "climate": {
    "_default": {
      "sun": 2,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "LV-RI",
      "name": "Riga",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-ST",
      "name": "Stuchka",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-AL",
      "name": "Alūksne",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-BL",
      "name": "Balvi",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-BA",
      "name": "Bauska",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-CE",
      "name": "Cēsis",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-DA",
      "name": "Daugavpils",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-DO",
      "name": "Dobele",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-GU",
      "name": "Gulbene",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-JE",
      "name": "Jēkabpils",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-JL",
      "name": "Jelgava",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-KR",
      "name": "Krāslava",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-KU",
      "name": "Kuldīga",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-LI",
      "name": "Liepāja",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-LM",
      "name": "Limbaži",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-LU",
      "name": "Ludza",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-MA",
      "name": "Madona",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-OG",
      "name": "Ogre",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-PR",
      "name": "Preiļi",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-RR",
      "name": "Riga Raion",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-SA",
      "name": "Saldus",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-TA",
      "name": "Talsi",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-TU",
      "name": "Tukums",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-VK",
      "name": "Valka",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-VM",
      "name": "Valmiera",
      "kind": "raion",
      "group": "Latvian SSR"
    },
    {
      "id": "LV-VE",
      "name": "Ventspils",
      "kind": "raion",
      "group": "Latvian SSR"
    }
  ],
  "cities": [
    [
      "riga",
      "Riga",
      "LV-RI",
      56.95,
      24.11,
      "capital",
      [
        "port"
      ]
    ],
    [
      "stuchka",
      "Stuchka",
      "LV-ST",
      56.6,
      25.26,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "aluksne",
      "Alūksne",
      "LV-AL",
      57.42,
      27.05,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "balvi",
      "Balvi",
      "LV-BL",
      57.13,
      27.27,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bauska",
      "Bauska",
      "LV-BA",
      56.41,
      24.19,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "cesis",
      "Cēsis",
      "LV-CE",
      57.31,
      25.27,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "daugavpils",
      "Daugavpils",
      "LV-DA",
      55.87,
      26.52,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dobele",
      "Dobele",
      "LV-DO",
      56.63,
      23.28,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gulbene",
      "Gulbene",
      "LV-GU",
      57.18,
      26.76,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jekabpils",
      "Jēkabpils",
      "LV-JE",
      56.5,
      25.86,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jelgava",
      "Jelgava",
      "LV-JL",
      56.65,
      23.71,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kraslava",
      "Krāslava",
      "LV-KR",
      55.9,
      27.16,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kuldiga",
      "Kuldīga",
      "LV-KU",
      57.0,
      21.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "liepaja",
      "Liepāja",
      "LV-LI",
      56.51,
      21.01,
      "capital",
      [
        "port"
      ]
    ],
    [
      "limbazi",
      "Limbaži",
      "LV-LM",
      57.51,
      24.72,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ludza",
      "Ludza",
      "LV-LU",
      56.54,
      27.72,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "madona",
      "Madona",
      "LV-MA",
      56.85,
      26.22,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ogre",
      "Ogre",
      "LV-OG",
      56.82,
      24.61,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "preili",
      "Preiļi",
      "LV-PR",
      56.29,
      26.72,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sigulda",
      "Sigulda",
      "LV-RR",
      57.15,
      24.85,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "saldus",
      "Saldus",
      "LV-SA",
      56.66,
      22.49,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "talsi",
      "Talsi",
      "LV-TA",
      57.25,
      22.59,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tukums",
      "Tukums",
      "LV-TU",
      56.97,
      23.15,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "valka",
      "Valka",
      "LV-VK",
      57.78,
      26.01,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "valmiera",
      "Valmiera",
      "LV-VM",
      57.54,
      25.43,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ventspils",
      "Ventspils",
      "LV-VE",
      57.39,
      21.56,
      "capital",
      [
        "port",
        "oil"
      ]
    ]
  ],
  "links": [
    [
      "aluksne",
      "gulbene",
      "road",
      "local road"
    ],
    [
      "balvi",
      "gulbene",
      "road",
      "local road"
    ],
    [
      "bauska",
      "jelgava",
      "road",
      "local road"
    ],
    [
      "cesis",
      "limbazi",
      "road",
      "local road"
    ],
    [
      "cesis",
      "sigulda",
      "road",
      "local road"
    ],
    [
      "cesis",
      "valmiera",
      "road",
      "local road"
    ],
    [
      "daugavpils",
      "kraslava",
      "road",
      "local road"
    ],
    [
      "daugavpils",
      "preili",
      "road",
      "local road"
    ],
    [
      "daugavpils",
      "riga",
      "road",
      "A6"
    ],
    [
      "dobele",
      "jelgava",
      "road",
      "local road"
    ],
    [
      "dobele",
      "saldus",
      "road",
      "local road"
    ],
    [
      "dobele",
      "tukums",
      "road",
      "local road"
    ],
    [
      "gulbene",
      "madona",
      "road",
      "local road"
    ],
    [
      "jekabpils",
      "madona",
      "road",
      "local road"
    ],
    [
      "jekabpils",
      "preili",
      "road",
      "local road"
    ],
    [
      "jekabpils",
      "stuchka",
      "road",
      "local road"
    ],
    [
      "jelgava",
      "riga",
      "road",
      "A8"
    ],
    [
      "kuldiga",
      "liepaja",
      "road",
      "local road"
    ],
    [
      "kuldiga",
      "talsi",
      "road",
      "local road"
    ],
    [
      "kuldiga",
      "ventspils",
      "road",
      "local road"
    ],
    [
      "liepaja",
      "ventspils",
      "road",
      "A10"
    ],
    [
      "ludza",
      "preili",
      "road",
      "local road"
    ],
    [
      "ogre",
      "riga",
      "road",
      "local road"
    ],
    [
      "ogre",
      "sigulda",
      "road",
      "local road"
    ],
    [
      "ogre",
      "stuchka",
      "road",
      "local road"
    ],
    [
      "riga",
      "sigulda",
      "road",
      "A2"
    ],
    [
      "talsi",
      "tukums",
      "road",
      "local road"
    ],
    [
      "valka",
      "valmiera",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "lv_head",
    "name": "Vilnis Kalniņš",
    "title": "Chairman of the Latvian Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 38,
    "int": 64,
    "pol": 66,
    "chr": 50,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster lv_head.",
    "region": "lv.riga"
  },
  {
    "id": "lv_def",
    "name": "Dace Bērziņa",
    "title": "Baltic Military District",
    "rank": "General-leytenant",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 64,
    "int": 66,
    "pol": 42,
    "chr": 44,
    "personality": "cautious",
    "bio": "Fictional defense minister. Roster lv_def.",
    "region": "lv.riga"
  },
  {
    "id": "lv_chief",
    "name": "Kārlis Eglītis",
    "title": "Chief of Staff",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "chief_of_staff",
    "war": 56,
    "int": 70,
    "pol": 48,
    "chr": 36,
    "personality": "schemer",
    "bio": "Fictional chief of staff. Roster lv_chief.",
    "region": "lv.riga"
  },
  {
    "id": "lv_f0",
    "name": "Jānis Kalns",
    "title": "Baltic Military District",
    "rank": "General-mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 62,
    "int": 58,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional front commander. Roster lv_f0.",
    "region": "lv.riga"
  },
  {
    "id": "lv_field",
    "name": "Ilze Priede",
    "title": "Riga garrison",
    "rank": "Kapitan",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 48,
    "int": 60,
    "pol": 40,
    "chr": 52,
    "personality": "loyalist",
    "bio": "Fictional field officer. Roster lv_field.",
    "region": "lv.riga"
  },
  {
    "id": "lv_f1",
    "name": "Līga Ozola",
    "title": "Liepāja naval base",
    "rank": "Polkovnik",
    "branch": "Soviet Navy",
    "slot": "front_commander",
    "war": 56,
    "int": 60,
    "pol": 34,
    "chr": 46,
    "personality": "merchant",
    "bio": "Fictional front commander. Roster lv_f1.",
    "region": "lv.liepaja"
  },
  {
    "id": "lv_f2",
    "name": "Edgars Vītols",
    "title": "Daugavpils sector",
    "rank": "Podpolkovnik",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 58,
    "int": 54,
    "pol": 32,
    "chr": 38,
    "personality": "loyalist",
    "bio": "Fictional front commander. Roster lv_f2.",
    "region": "lv.daugavpils"
  }
])
});
export const LITHUANIA_REGION = land({
  "id": "lt",
  "name": "Lithuanian SSR",
  "country": "LT",
  "bbox": {
    "minLon": 19.63,
    "maxLon": 27.75,
    "minLat": 52.71,
    "maxLat": 57.82
  },
  "notes": "Atlas only. Forty-four raions. Kapsukas has not been renamed Marijampolė. The republic had no oblasts. Klaipėda is the port. Occupied and off the week-0 march.",
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
      "id": "LT-AK",
      "name": "Akmenė",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-AL",
      "name": "Alytus",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-AN",
      "name": "Anykščiai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-BI",
      "name": "Biržai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-IG",
      "name": "Ignalina",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-JO",
      "name": "Jonava",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-JN",
      "name": "Joniškis",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-JU",
      "name": "Jurbarkas",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-KA",
      "name": "Kaišiadorys",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-KN",
      "name": "Kaunas",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-KP",
      "name": "Kapsukas",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-KE",
      "name": "Kėdainiai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-KL",
      "name": "Kelmė",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-CL",
      "name": "Klaipėda",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-KR",
      "name": "Kretinga",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-KU",
      "name": "Kupiškis",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-LA",
      "name": "Lazdijai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-MA",
      "name": "Mažeikiai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-MO",
      "name": "Molėtai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-PA",
      "name": "Pakruojis",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-PN",
      "name": "Panevėžys",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-PS",
      "name": "Pasvalys",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-PL",
      "name": "Plungė",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-PR",
      "name": "Prienai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-RA",
      "name": "Radviliškis",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-RS",
      "name": "Raseiniai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-RO",
      "name": "Rokiškis",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-SA",
      "name": "Šakiai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-SC",
      "name": "Šalčininkai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-SI",
      "name": "Šiauliai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-SL",
      "name": "Šilalė",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-SU",
      "name": "Šilutė",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-SV",
      "name": "Širvintos",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-SK",
      "name": "Skuodas",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-SE",
      "name": "Švenčionys",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-TA",
      "name": "Tauragė",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-TE",
      "name": "Telšiai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-TR",
      "name": "Trakai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-UK",
      "name": "Ukmergė",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-UT",
      "name": "Utena",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-VA",
      "name": "Varėna",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-VI",
      "name": "Vilkaviškis",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-VL",
      "name": "Vilnius",
      "kind": "raion",
      "group": "Lithuanian SSR"
    },
    {
      "id": "LT-ZA",
      "name": "Zarasai",
      "kind": "raion",
      "group": "Lithuanian SSR"
    }
  ],
  "cities": [
    [
      "akmene",
      "Akmenė",
      "LT-AK",
      56.25,
      22.75,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "alytus",
      "Alytus",
      "LT-AL",
      54.4,
      24.05,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "anyksciai",
      "Anykščiai",
      "LT-AN",
      55.53,
      25.11,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "birzai",
      "Biržai",
      "LT-BI",
      56.2,
      24.76,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ignalina",
      "Ignalina",
      "LT-IG",
      55.34,
      26.16,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jonava",
      "Jonava",
      "LT-JO",
      55.07,
      24.28,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "joniskis",
      "Joniškis",
      "LT-JN",
      56.24,
      23.62,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jurbarkas",
      "Jurbarkas",
      "LT-JU",
      55.08,
      22.77,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kaisiadorys",
      "Kaišiadorys",
      "LT-KA",
      54.87,
      24.45,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kaunas",
      "Kaunas",
      "LT-KN",
      54.9,
      23.9,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kapsukas",
      "Kapsukas",
      "LT-KP",
      54.56,
      23.35,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kedainiai",
      "Kėdainiai",
      "LT-KE",
      55.29,
      23.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kelme",
      "Kelmė",
      "LT-KL",
      55.63,
      22.93,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "klaipeda",
      "Klaipėda",
      "LT-CL",
      55.71,
      21.13,
      "capital",
      [
        "port"
      ]
    ],
    [
      "kretinga",
      "Kretinga",
      "LT-KR",
      55.89,
      21.24,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kupiskis",
      "Kupiškis",
      "LT-KU",
      55.84,
      24.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "lazdijai",
      "Lazdijai",
      "LT-LA",
      54.23,
      23.52,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mazeikiai",
      "Mažeikiai",
      "LT-MA",
      56.32,
      22.34,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "moletai",
      "Molėtai",
      "LT-MO",
      55.23,
      25.42,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pakruojis",
      "Pakruojis",
      "LT-PA",
      55.98,
      23.86,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "panevezys",
      "Panevėžys",
      "LT-PN",
      55.73,
      24.36,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pasvalys",
      "Pasvalys",
      "LT-PS",
      56.06,
      24.4,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "plunge",
      "Plungė",
      "LT-PL",
      55.91,
      21.85,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "prienai",
      "Prienai",
      "LT-PR",
      54.64,
      23.94,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "radviliskis",
      "Radviliškis",
      "LT-RA",
      55.81,
      23.54,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "raseiniai",
      "Raseiniai",
      "LT-RS",
      55.38,
      23.12,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "rokiskis",
      "Rokiškis",
      "LT-RO",
      55.96,
      25.59,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sakiai",
      "Šakiai",
      "LT-SA",
      54.95,
      23.05,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "salcininkai",
      "Šalčininkai",
      "LT-SC",
      54.31,
      25.38,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "siauliai",
      "Šiauliai",
      "LT-SI",
      55.93,
      23.31,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "silale",
      "Šilalė",
      "LT-SL",
      55.49,
      22.18,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "silute",
      "Šilutė",
      "LT-SU",
      55.35,
      21.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sirvintos",
      "Širvintos",
      "LT-SV",
      55.04,
      24.96,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "skuodas",
      "Skuodas",
      "LT-SK",
      56.27,
      21.53,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "svencionys",
      "Švenčionys",
      "LT-SE",
      55.13,
      26.16,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "taurage",
      "Tauragė",
      "LT-TA",
      55.25,
      22.29,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "telsiai",
      "Telšiai",
      "LT-TE",
      55.99,
      22.25,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "trakai",
      "Trakai",
      "LT-TR",
      54.64,
      24.93,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ukmerge",
      "Ukmergė",
      "LT-UK",
      55.25,
      24.76,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "utena",
      "Utena",
      "LT-UT",
      55.5,
      25.6,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "varena",
      "Varėna",
      "LT-VA",
      54.21,
      24.57,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "vilkaviskis",
      "Vilkaviškis",
      "LT-VI",
      54.65,
      23.03,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "vilnius",
      "Vilnius",
      "LT-VL",
      54.69,
      25.28,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zarasai",
      "Zarasai",
      "LT-ZA",
      55.73,
      26.25,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "akmene",
      "mazeikiai",
      "road",
      "local road"
    ],
    [
      "alytus",
      "prienai",
      "road",
      "local road"
    ],
    [
      "alytus",
      "varena",
      "road",
      "local road"
    ],
    [
      "anyksciai",
      "kupiskis",
      "road",
      "local road"
    ],
    [
      "anyksciai",
      "utena",
      "road",
      "local road"
    ],
    [
      "birzai",
      "pasvalys",
      "road",
      "local road"
    ],
    [
      "ignalina",
      "svencionys",
      "road",
      "local road"
    ],
    [
      "ignalina",
      "utena",
      "road",
      "local road"
    ],
    [
      "ignalina",
      "zarasai",
      "road",
      "local road"
    ],
    [
      "jonava",
      "kaisiadorys",
      "road",
      "local road"
    ],
    [
      "jonava",
      "kaunas",
      "road",
      "local road"
    ],
    [
      "jonava",
      "kedainiai",
      "road",
      "local road"
    ],
    [
      "jonava",
      "ukmerge",
      "road",
      "local road"
    ],
    [
      "joniskis",
      "pakruojis",
      "road",
      "local road"
    ],
    [
      "jurbarkas",
      "raseiniai",
      "road",
      "local road"
    ],
    [
      "jurbarkas",
      "sakiai",
      "road",
      "local road"
    ],
    [
      "jurbarkas",
      "taurage",
      "road",
      "local road"
    ],
    [
      "kaisiadorys",
      "trakai",
      "road",
      "local road"
    ],
    [
      "kapsukas",
      "lazdijai",
      "road",
      "local road"
    ],
    [
      "kapsukas",
      "prienai",
      "road",
      "local road"
    ],
    [
      "kapsukas",
      "vilkaviskis",
      "road",
      "local road"
    ],
    [
      "kaunas",
      "klaipeda",
      "road",
      "A1"
    ],
    [
      "kaunas",
      "prienai",
      "road",
      "local road"
    ],
    [
      "kaunas",
      "vilnius",
      "road",
      "A1"
    ],
    [
      "kelme",
      "raseiniai",
      "road",
      "local road"
    ],
    [
      "klaipeda",
      "kretinga",
      "road",
      "local road"
    ],
    [
      "klaipeda",
      "silute",
      "road",
      "local road"
    ],
    [
      "kretinga",
      "plunge",
      "road",
      "local road"
    ],
    [
      "kupiskis",
      "panevezys",
      "road",
      "local road"
    ],
    [
      "kupiskis",
      "rokiskis",
      "road",
      "local road"
    ],
    [
      "mazeikiai",
      "telsiai",
      "road",
      "local road"
    ],
    [
      "moletai",
      "sirvintos",
      "road",
      "local road"
    ],
    [
      "moletai",
      "utena",
      "road",
      "local road"
    ],
    [
      "pakruojis",
      "pasvalys",
      "road",
      "local road"
    ],
    [
      "pakruojis",
      "radviliskis",
      "road",
      "local road"
    ],
    [
      "panevezys",
      "pasvalys",
      "road",
      "local road"
    ],
    [
      "panevezys",
      "vilnius",
      "road",
      "A2"
    ],
    [
      "plunge",
      "skuodas",
      "road",
      "local road"
    ],
    [
      "plunge",
      "telsiai",
      "road",
      "local road"
    ],
    [
      "radviliskis",
      "siauliai",
      "road",
      "local road"
    ],
    [
      "sakiai",
      "vilkaviskis",
      "road",
      "local road"
    ],
    [
      "salcininkai",
      "vilnius",
      "road",
      "local road"
    ],
    [
      "silale",
      "silute",
      "road",
      "local road"
    ],
    [
      "silale",
      "taurage",
      "road",
      "local road"
    ],
    [
      "sirvintos",
      "ukmerge",
      "road",
      "local road"
    ],
    [
      "trakai",
      "vilnius",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "lt_head",
    "name": "Algirdas Varnas",
    "title": "Chairman of the Lithuanian Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 38,
    "int": 66,
    "pol": 68,
    "chr": 50,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster lt_head.",
    "region": "lt.vilnius"
  },
  {
    "id": "lt_def",
    "name": "Monika Šimkutė",
    "title": "Baltic Military District",
    "rank": "General-leytenant",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 64,
    "int": 68,
    "pol": 42,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional defense minister. Roster lt_def.",
    "region": "lt.vilnius"
  },
  {
    "id": "lt_chief",
    "name": "Darius Leita",
    "title": "Chief of Staff",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "chief_of_staff",
    "war": 58,
    "int": 72,
    "pol": 50,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional chief of staff. Roster lt_chief.",
    "region": "lt.vilnius"
  },
  {
    "id": "lt_f0",
    "name": "Rasa Jankauskaitė",
    "title": "Baltic Military District",
    "rank": "General-mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 60,
    "int": 62,
    "pol": 38,
    "chr": 44,
    "personality": "cautious",
    "bio": "Fictional front commander. Roster lt_f0.",
    "region": "lt.kaunas"
  },
  {
    "id": "lt_field",
    "name": "Eglė Barauskaitė",
    "title": "Vilnius garrison",
    "rank": "Kapitan",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 50,
    "int": 62,
    "pol": 44,
    "chr": 56,
    "personality": "loyalist",
    "bio": "Fictional field officer. Roster lt_field.",
    "region": "lt.vilnius"
  },
  {
    "id": "lt_f1",
    "name": "Tomas Petrauskas",
    "title": "Klaipėda naval base",
    "rank": "Polkovnik",
    "branch": "Soviet Navy",
    "slot": "front_commander",
    "war": 58,
    "int": 56,
    "pol": 34,
    "chr": 40,
    "personality": "merchant",
    "bio": "Fictional front commander. Roster lt_f1.",
    "region": "lt.klaipeda"
  },
  {
    "id": "lt_f2",
    "name": "Ieva Norkutė",
    "title": "Ignalina sector",
    "rank": "Podpolkovnik",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 52,
    "int": 64,
    "pol": 30,
    "chr": 36,
    "personality": "recluse",
    "bio": "Fictional front commander. Roster lt_f2.",
    "region": "lt.ignalina"
  },
  {
    "id": "lt_f3",
    "name": "Gintaras Vaitkus",
    "title": "Suwałki frontier",
    "rank": "Mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 56,
    "int": 50,
    "pol": 32,
    "chr": 38,
    "personality": "loyalist",
    "bio": "Fictional front commander. Roster lt_f3.",
    "region": "lt.lazdijai"
  }
])
});
