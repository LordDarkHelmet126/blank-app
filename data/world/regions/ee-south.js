import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const BULGARIA_REGION = land({
  "id": "bg",
  "name": "Bulgaria",
  "country": "BG",
  "bbox": {
    "minLon": 21.38,
    "maxLon": 29.41,
    "minLat": 40.27,
    "maxLat": 45.49
  },
  "notes": "Atlas only. The nine oblasti created in August 1987, not the 28 okrugs and not the 1999 provinces. Mikhailovgrad is not yet Montana. Sofia City is its own oblast; Sofia Oblast is pinned at Pernik because the oblast center sat in the capital. Ruse, Vidin, Svilengrad, and Blagoevgrad are the border towns. Occupied and off the week-0 march.",
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
      "id": "BG-BR",
      "name": "Burgas",
      "kind": "oblast",
      "group": null
    },
    {
      "id": "BG-HA",
      "name": "Haskovo",
      "kind": "oblast",
      "group": null
    },
    {
      "id": "BG-LV",
      "name": "Lovech",
      "kind": "oblast",
      "group": null
    },
    {
      "id": "BG-MH",
      "name": "Mikhailovgrad",
      "kind": "oblast",
      "group": null
    },
    {
      "id": "BG-PV",
      "name": "Plovdiv",
      "kind": "oblast",
      "group": null
    },
    {
      "id": "BG-RZ",
      "name": "Razgrad",
      "kind": "oblast",
      "group": null
    },
    {
      "id": "BG-SF",
      "name": "Sofia City",
      "kind": "oblast",
      "group": null
    },
    {
      "id": "BG-SO",
      "name": "Sofia",
      "kind": "oblast",
      "group": null
    },
    {
      "id": "BG-VN",
      "name": "Varna",
      "kind": "oblast",
      "group": null
    }
  ],
  "cities": [
    [
      "burgas",
      "Burgas",
      "BG-BR",
      42.5,
      27.47,
      "capital",
      [
        "port",
        "oil"
      ]
    ],
    [
      "haskovo",
      "Haskovo",
      "BG-HA",
      41.93,
      25.56,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "lovech",
      "Lovech",
      "BG-LV",
      43.14,
      24.72,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mikhailovgrad",
      "Mikhailovgrad",
      "BG-MH",
      43.41,
      23.22,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "plovdiv",
      "Plovdiv",
      "BG-PV",
      42.15,
      24.75,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "razgrad",
      "Razgrad",
      "BG-RZ",
      43.53,
      26.52,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sofia",
      "Sofia",
      "BG-SF",
      42.7,
      23.32,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pernik",
      "Pernik",
      "BG-SO",
      42.61,
      23.03,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "varna",
      "Varna",
      "BG-VN",
      43.21,
      27.91,
      "capital",
      [
        "port"
      ]
    ],
    [
      "blagoevgrad",
      "Blagoevgrad",
      "BG-SO",
      42.02,
      23.1,
      "city",
      [
        "tobacco"
      ]
    ],
    [
      "svilengrad",
      "Svilengrad",
      "BG-HA",
      41.77,
      26.2,
      "city",
      [
        "wheat"
      ]
    ],
    [
      "vidin",
      "Vidin",
      "BG-MH",
      43.99,
      22.88,
      "city",
      [
        "port"
      ]
    ],
    [
      "ruse",
      "Ruse",
      "BG-RZ",
      43.85,
      25.97,
      "city",
      [
        "port"
      ]
    ],
    [
      "stara_zagora",
      "Stara Zagora",
      "BG-HA",
      42.43,
      25.63,
      "city",
      [
        "coal"
      ]
    ],
    [
      "pleven",
      "Pleven",
      "BG-LV",
      43.42,
      24.62,
      "city",
      [
        "wheat"
      ]
    ]
  ],
  "links": [
    [
      "blagoevgrad",
      "pernik",
      "road",
      "local road"
    ],
    [
      "burgas",
      "stara_zagora",
      "road",
      "E773"
    ],
    [
      "burgas",
      "varna",
      "road",
      "E87"
    ],
    [
      "haskovo",
      "plovdiv",
      "road",
      "local road"
    ],
    [
      "haskovo",
      "stara_zagora",
      "road",
      "local road"
    ],
    [
      "haskovo",
      "svilengrad",
      "road",
      "local road"
    ],
    [
      "lovech",
      "pleven",
      "road",
      "local road"
    ],
    [
      "lovech",
      "plovdiv",
      "road",
      "local road"
    ],
    [
      "lovech",
      "razgrad",
      "road",
      "local road"
    ],
    [
      "lovech",
      "sofia",
      "road",
      "local road"
    ],
    [
      "mikhailovgrad",
      "sofia",
      "road",
      "local road"
    ],
    [
      "mikhailovgrad",
      "vidin",
      "road",
      "local road"
    ],
    [
      "pernik",
      "sofia",
      "road",
      "E80"
    ],
    [
      "pleven",
      "ruse",
      "road",
      "E83"
    ],
    [
      "pleven",
      "sofia",
      "road",
      "E83"
    ],
    [
      "plovdiv",
      "sofia",
      "road",
      "E80"
    ],
    [
      "plovdiv",
      "stara_zagora",
      "road",
      "E80"
    ],
    [
      "razgrad",
      "ruse",
      "road",
      "local road"
    ],
    [
      "razgrad",
      "varna",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "bg_head",
    "name": "Boris Angelov",
    "title": "Chairman of the Council of Ministers",
    "rank": "Chairman",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 40,
    "int": 58,
    "pol": 72,
    "chr": 36,
    "personality": "loyalist",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "bg.sofia"
  },
  {
    "id": "bg_def",
    "name": "Nadezhda Koleva",
    "title": "Minister of National Defence",
    "rank": "General-polkovnik",
    "branch": "Bulgarian People's Army",
    "slot": "defense_minister",
    "war": 64,
    "int": 66,
    "pol": 48,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional defense minister.",
    "region": "bg.sofia"
  },
  {
    "id": "bg_chief",
    "name": "Dimitar Valev",
    "title": "Chief of the General Staff",
    "rank": "General-leytenant",
    "branch": "Bulgarian People's Army",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 70,
    "pol": 55,
    "chr": 32,
    "personality": "schemer",
    "bio": "Fictional chief of staff.",
    "region": "bg.sofia"
  },
  {
    "id": "bg_f0",
    "name": "Stefan Iliev",
    "title": "1st Army",
    "rank": "General-mayor",
    "branch": "Bulgarian People's Army",
    "slot": "front_commander",
    "war": 66,
    "int": 50,
    "pol": 34,
    "chr": 32,
    "personality": "aggressive",
    "bio": "Fictional front commander.",
    "region": "bg.sofia"
  },
  {
    "id": "bg_field",
    "name": "Petar Milanov",
    "title": "Sofia garrison",
    "rank": "Polkovnik",
    "branch": "Bulgarian People's Army",
    "slot": "field_officer",
    "war": 54,
    "int": 56,
    "pol": 44,
    "chr": 46,
    "personality": "loyalist",
    "bio": "Fictional field officer.",
    "region": "bg.sofia"
  },
  {
    "id": "bg_f1",
    "name": "Raina Petrova",
    "title": "Black Sea fleet",
    "rank": "Polkovnik",
    "branch": "Bulgarian Navy",
    "slot": "front_commander",
    "war": 52,
    "int": 60,
    "pol": 40,
    "chr": 48,
    "personality": "merchant",
    "bio": "Fictional front commander.",
    "region": "bg.varna"
  }
])
});
export const YUGOSLAVIA_REGION = land({
  "id": "yu",
  "name": "Yugoslavia",
  "country": "YU",
  "bbox": {
    "minLon": 12.23,
    "maxLon": 24.0,
    "minLat": 39.53,
    "maxLat": 48.06
  },
  "notes": "Atlas only. The Socialist Federal Republic: six republics plus Vojvodina and Kosovo, which remain autonomous provinces inside Serbia. Pins are regional seats, not every opština. Titograd has not gone back to Podgorica. The Karawanks road tunnel opens in 1991, so the Austrian crossing is the Loibl pass. The coast road clips Bosnia at Neum. Occupied and off the week-0 march.",
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
      "id": "YU-LJ",
      "name": "Ljubljana",
      "kind": "region",
      "group": "Slovenia"
    },
    {
      "id": "YU-MB",
      "name": "Maribor",
      "kind": "region",
      "group": "Slovenia"
    },
    {
      "id": "YU-KP",
      "name": "Koper",
      "kind": "region",
      "group": "Slovenia"
    },
    {
      "id": "YU-KJ",
      "name": "Kranj",
      "kind": "region",
      "group": "Slovenia"
    },
    {
      "id": "YU-CE",
      "name": "Celje",
      "kind": "region",
      "group": "Slovenia"
    },
    {
      "id": "YU-NM",
      "name": "Novo Mesto",
      "kind": "region",
      "group": "Slovenia"
    },
    {
      "id": "YU-ZG",
      "name": "Zagreb",
      "kind": "region",
      "group": "Croatia"
    },
    {
      "id": "YU-ST",
      "name": "Split",
      "kind": "region",
      "group": "Croatia"
    },
    {
      "id": "YU-RI",
      "name": "Rijeka",
      "kind": "region",
      "group": "Croatia"
    },
    {
      "id": "YU-OS",
      "name": "Osijek",
      "kind": "region",
      "group": "Croatia"
    },
    {
      "id": "YU-ZD",
      "name": "Zadar",
      "kind": "region",
      "group": "Croatia"
    },
    {
      "id": "YU-KA",
      "name": "Karlovac",
      "kind": "region",
      "group": "Croatia"
    },
    {
      "id": "YU-DU",
      "name": "Dubrovnik",
      "kind": "region",
      "group": "Croatia"
    },
    {
      "id": "YU-SA",
      "name": "Sarajevo",
      "kind": "region",
      "group": "Bosnia and Herzegovina"
    },
    {
      "id": "YU-BL",
      "name": "Banja Luka",
      "kind": "region",
      "group": "Bosnia and Herzegovina"
    },
    {
      "id": "YU-TZ",
      "name": "Tuzla",
      "kind": "region",
      "group": "Bosnia and Herzegovina"
    },
    {
      "id": "YU-MO",
      "name": "Mostar",
      "kind": "region",
      "group": "Bosnia and Herzegovina"
    },
    {
      "id": "YU-ZE",
      "name": "Zenica",
      "kind": "region",
      "group": "Bosnia and Herzegovina"
    },
    {
      "id": "YU-BI",
      "name": "Bihać",
      "kind": "region",
      "group": "Bosnia and Herzegovina"
    },
    {
      "id": "YU-BG",
      "name": "Belgrade",
      "kind": "region",
      "group": "Serbia"
    },
    {
      "id": "YU-NI",
      "name": "Niš",
      "kind": "region",
      "group": "Serbia"
    },
    {
      "id": "YU-KG",
      "name": "Kragujevac",
      "kind": "region",
      "group": "Serbia"
    },
    {
      "id": "YU-UZ",
      "name": "Užice",
      "kind": "region",
      "group": "Serbia"
    },
    {
      "id": "YU-BO",
      "name": "Bor",
      "kind": "region",
      "group": "Serbia"
    },
    {
      "id": "YU-NS",
      "name": "Novi Sad",
      "kind": "region",
      "group": "Serbia — Vojvodina"
    },
    {
      "id": "YU-SU",
      "name": "Subotica",
      "kind": "region",
      "group": "Serbia — Vojvodina"
    },
    {
      "id": "YU-ZR",
      "name": "Zrenjanin",
      "kind": "region",
      "group": "Serbia — Vojvodina"
    },
    {
      "id": "YU-PA",
      "name": "Pančevo",
      "kind": "region",
      "group": "Serbia — Vojvodina"
    },
    {
      "id": "YU-PR",
      "name": "Priština",
      "kind": "region",
      "group": "Serbia — Kosovo"
    },
    {
      "id": "YU-PZ",
      "name": "Prizren",
      "kind": "region",
      "group": "Serbia — Kosovo"
    },
    {
      "id": "YU-PE",
      "name": "Peć",
      "kind": "region",
      "group": "Serbia — Kosovo"
    },
    {
      "id": "YU-MT",
      "name": "Kosovska Mitrovica",
      "kind": "region",
      "group": "Serbia — Kosovo"
    },
    {
      "id": "YU-TG",
      "name": "Titograd",
      "kind": "region",
      "group": "Montenegro"
    },
    {
      "id": "YU-NK",
      "name": "Nikšić",
      "kind": "region",
      "group": "Montenegro"
    },
    {
      "id": "YU-CT",
      "name": "Cetinje",
      "kind": "region",
      "group": "Montenegro"
    },
    {
      "id": "YU-BR",
      "name": "Bar",
      "kind": "region",
      "group": "Montenegro"
    },
    {
      "id": "YU-SK",
      "name": "Skopje",
      "kind": "region",
      "group": "Macedonia"
    },
    {
      "id": "YU-BT",
      "name": "Bitola",
      "kind": "region",
      "group": "Macedonia"
    },
    {
      "id": "YU-KU",
      "name": "Kumanovo",
      "kind": "region",
      "group": "Macedonia"
    },
    {
      "id": "YU-OH",
      "name": "Ohrid",
      "kind": "region",
      "group": "Macedonia"
    },
    {
      "id": "YU-SP",
      "name": "Štip",
      "kind": "region",
      "group": "Macedonia"
    }
  ],
  "cities": [
    [
      "ljubljana",
      "Ljubljana",
      "YU-LJ",
      46.06,
      14.51,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "maribor",
      "Maribor",
      "YU-MB",
      46.56,
      15.65,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "koper",
      "Koper",
      "YU-KP",
      45.55,
      13.73,
      "capital",
      [
        "port"
      ]
    ],
    [
      "kranj",
      "Kranj",
      "YU-KJ",
      46.24,
      14.36,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "celje",
      "Celje",
      "YU-CE",
      46.24,
      15.27,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "novo_mesto",
      "Novo Mesto",
      "YU-NM",
      45.8,
      15.17,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zagreb",
      "Zagreb",
      "YU-ZG",
      45.81,
      15.98,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "split",
      "Split",
      "YU-ST",
      43.51,
      16.44,
      "capital",
      [
        "port"
      ]
    ],
    [
      "rijeka",
      "Rijeka",
      "YU-RI",
      45.33,
      14.44,
      "capital",
      [
        "port"
      ]
    ],
    [
      "osijek",
      "Osijek",
      "YU-OS",
      45.55,
      18.69,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "zadar",
      "Zadar",
      "YU-ZD",
      44.12,
      15.23,
      "capital",
      [
        "port"
      ]
    ],
    [
      "karlovac",
      "Karlovac",
      "YU-KA",
      45.49,
      15.55,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dubrovnik",
      "Dubrovnik",
      "YU-DU",
      42.65,
      18.09,
      "capital",
      [
        "port"
      ]
    ],
    [
      "sarajevo",
      "Sarajevo",
      "YU-SA",
      43.86,
      18.41,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "banja_luka",
      "Banja Luka",
      "YU-BL",
      44.77,
      17.19,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tuzla",
      "Tuzla",
      "YU-TZ",
      44.54,
      18.68,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "mostar",
      "Mostar",
      "YU-MO",
      43.34,
      17.81,
      "capital",
      [
        "bauxite",
        "aluminum"
      ]
    ],
    [
      "zenica",
      "Zenica",
      "YU-ZE",
      44.2,
      17.91,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "bihac",
      "Bihać",
      "YU-BI",
      44.82,
      15.87,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "belgrade",
      "Belgrade",
      "YU-BG",
      44.82,
      20.46,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nis",
      "Niš",
      "YU-NI",
      43.32,
      21.9,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kragujevac",
      "Kragujevac",
      "YU-KG",
      44.01,
      20.91,
      "capital",
      [
        "autos"
      ]
    ],
    [
      "uzice",
      "Užice",
      "YU-UZ",
      43.86,
      19.84,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bor",
      "Bor",
      "YU-BO",
      44.08,
      22.1,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "novi_sad",
      "Novi Sad",
      "YU-NS",
      45.27,
      19.83,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "subotica",
      "Subotica",
      "YU-SU",
      46.1,
      19.67,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "zrenjanin",
      "Zrenjanin",
      "YU-ZR",
      45.38,
      20.39,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pancevo",
      "Pančevo",
      "YU-PA",
      44.87,
      20.64,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "pristina",
      "Priština",
      "YU-PR",
      42.66,
      21.17,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "prizren",
      "Prizren",
      "YU-PZ",
      42.21,
      20.74,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pec",
      "Peć",
      "YU-PE",
      42.66,
      20.29,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mitrovica",
      "Kosovska Mitrovica",
      "YU-MT",
      42.89,
      20.87,
      "capital",
      [
        "lead",
        "zinc",
        "lignite"
      ]
    ],
    [
      "titograd",
      "Titograd",
      "YU-TG",
      42.44,
      19.26,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "niksic",
      "Nikšić",
      "YU-NK",
      42.77,
      18.94,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "cetinje",
      "Cetinje",
      "YU-CT",
      42.39,
      18.92,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bar",
      "Bar",
      "YU-BR",
      42.1,
      19.09,
      "capital",
      [
        "port"
      ]
    ],
    [
      "skopje",
      "Skopje",
      "YU-SK",
      42.0,
      21.43,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bitola",
      "Bitola",
      "YU-BT",
      41.03,
      21.33,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kumanovo",
      "Kumanovo",
      "YU-KU",
      42.13,
      21.71,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ohrid",
      "Ohrid",
      "YU-OH",
      41.12,
      20.8,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "stip",
      "Štip",
      "YU-SP",
      41.75,
      22.2,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gevgelija",
      "Gevgelija",
      "YU-SK",
      41.14,
      22.5,
      "city",
      [
        "wheat"
      ]
    ]
  ],
  "links": [
    [
      "banja_luka",
      "bihac",
      "road",
      "local road"
    ],
    [
      "banja_luka",
      "sarajevo",
      "road",
      "M5"
    ],
    [
      "banja_luka",
      "zagreb",
      "road",
      "E661"
    ],
    [
      "banja_luka",
      "zenica",
      "road",
      "local road"
    ],
    [
      "bar",
      "cetinje",
      "road",
      "local road"
    ],
    [
      "bar",
      "titograd",
      "road",
      "E65"
    ],
    [
      "belgrade",
      "kragujevac",
      "road",
      "local road"
    ],
    [
      "belgrade",
      "nis",
      "road",
      "E75"
    ],
    [
      "belgrade",
      "novi_sad",
      "road",
      "E75"
    ],
    [
      "belgrade",
      "pancevo",
      "road",
      "local road"
    ],
    [
      "belgrade",
      "sarajevo",
      "road",
      "M5"
    ],
    [
      "belgrade",
      "titograd",
      "road",
      "E763"
    ],
    [
      "bihac",
      "karlovac",
      "road",
      "local road"
    ],
    [
      "bihac",
      "zadar",
      "road",
      "local road"
    ],
    [
      "bitola",
      "ohrid",
      "road",
      "local road"
    ],
    [
      "bitola",
      "skopje",
      "road",
      "M5"
    ],
    [
      "bitola",
      "stip",
      "road",
      "local road"
    ],
    [
      "bor",
      "kragujevac",
      "road",
      "local road"
    ],
    [
      "bor",
      "nis",
      "road",
      "local road"
    ],
    [
      "celje",
      "maribor",
      "road",
      "local road"
    ],
    [
      "celje",
      "novo_mesto",
      "road",
      "local road"
    ],
    [
      "cetinje",
      "niksic",
      "road",
      "local road"
    ],
    [
      "cetinje",
      "titograd",
      "road",
      "local road"
    ],
    [
      "dubrovnik",
      "mostar",
      "road",
      "local road"
    ],
    [
      "dubrovnik",
      "niksic",
      "road",
      "local road"
    ],
    [
      "dubrovnik",
      "split",
      "road",
      "Adriatic highway (Neum transit)"
    ],
    [
      "gevgelija",
      "skopje",
      "road",
      "local road"
    ],
    [
      "karlovac",
      "novo_mesto",
      "road",
      "local road"
    ],
    [
      "karlovac",
      "zagreb",
      "road",
      "local road"
    ],
    [
      "koper",
      "ljubljana",
      "road",
      "Adriatic highway"
    ],
    [
      "koper",
      "rijeka",
      "road",
      "local road"
    ],
    [
      "kragujevac",
      "uzice",
      "road",
      "local road"
    ],
    [
      "kranj",
      "ljubljana",
      "road",
      "local road"
    ],
    [
      "kumanovo",
      "skopje",
      "road",
      "local road"
    ],
    [
      "kumanovo",
      "stip",
      "road",
      "local road"
    ],
    [
      "ljubljana",
      "maribor",
      "road",
      "E57"
    ],
    [
      "ljubljana",
      "novo_mesto",
      "road",
      "local road"
    ],
    [
      "ljubljana",
      "zagreb",
      "road",
      "E70"
    ],
    [
      "mitrovica",
      "pec",
      "road",
      "local road"
    ],
    [
      "mitrovica",
      "pristina",
      "road",
      "local road"
    ],
    [
      "mostar",
      "sarajevo",
      "road",
      "M17"
    ],
    [
      "mostar",
      "split",
      "road",
      "local road"
    ],
    [
      "nis",
      "pristina",
      "road",
      "E80"
    ],
    [
      "novi_sad",
      "osijek",
      "road",
      "local road"
    ],
    [
      "novi_sad",
      "subotica",
      "road",
      "E75"
    ],
    [
      "novi_sad",
      "zrenjanin",
      "road",
      "local road"
    ],
    [
      "novo_mesto",
      "rijeka",
      "road",
      "local road"
    ],
    [
      "osijek",
      "zagreb",
      "road",
      "E73"
    ],
    [
      "pancevo",
      "zrenjanin",
      "road",
      "local road"
    ],
    [
      "pec",
      "titograd",
      "road",
      "local road"
    ],
    [
      "pristina",
      "prizren",
      "road",
      "M25"
    ],
    [
      "pristina",
      "skopje",
      "road",
      "E65"
    ],
    [
      "prizren",
      "skopje",
      "road",
      "local road"
    ],
    [
      "rijeka",
      "zadar",
      "road",
      "Adriatic highway"
    ],
    [
      "rijeka",
      "zagreb",
      "road",
      "E65"
    ],
    [
      "sarajevo",
      "zenica",
      "road",
      "M17"
    ],
    [
      "split",
      "zadar",
      "road",
      "Adriatic highway"
    ],
    [
      "tuzla",
      "zenica",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "yu_head",
    "name": "Milan Kovačević",
    "title": "President of the Presidency",
    "rank": "President",
    "branch": "Presidency of the SFRY",
    "slot": "head_of_state",
    "war": 44,
    "int": 66,
    "pol": 70,
    "chr": 50,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "yu.belgrade"
  },
  {
    "id": "yu_def",
    "name": "Dušan Marković",
    "title": "Federal Secretary for National Defence",
    "rank": "General-pukovnik",
    "branch": "Yugoslav People's Army",
    "slot": "defense_minister",
    "war": 72,
    "int": 60,
    "pol": 46,
    "chr": 40,
    "personality": "loyalist",
    "bio": "Fictional defense minister.",
    "region": "yu.belgrade"
  },
  {
    "id": "yu_chief",
    "name": "Ankica Horvat",
    "title": "Chief of the General Staff",
    "rank": "General-potpukovnik",
    "branch": "Yugoslav People's Army",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 70,
    "pol": 42,
    "chr": 48,
    "personality": "cautious",
    "bio": "Fictional chief of staff.",
    "region": "yu.belgrade"
  },
  {
    "id": "yu_f0",
    "name": "Svetozar Jovanović",
    "title": "1st Army",
    "rank": "General-major",
    "branch": "Yugoslav People's Army",
    "slot": "front_commander",
    "war": 64,
    "int": 56,
    "pol": 40,
    "chr": 42,
    "personality": "loyalist",
    "bio": "Fictional front commander.",
    "region": "yu.belgrade"
  },
  {
    "id": "yu_field",
    "name": "Vesna Kralj",
    "title": "Belgrade garrison",
    "rank": "Pukovnik",
    "branch": "Yugoslav People's Army",
    "slot": "field_officer",
    "war": 56,
    "int": 62,
    "pol": 50,
    "chr": 44,
    "personality": "ambitious",
    "bio": "Fictional field officer.",
    "region": "yu.belgrade"
  },
  {
    "id": "yu_f1",
    "name": "Bojan Petrić",
    "title": "Navy",
    "rank": "Admiral",
    "branch": "Yugoslav Navy",
    "slot": "front_commander",
    "war": 60,
    "int": 62,
    "pol": 38,
    "chr": 44,
    "personality": "merchant",
    "bio": "Fictional front commander.",
    "region": "yu.split"
  },
  {
    "id": "yu_f2",
    "name": "Stjepan Novak",
    "title": "Zagreb corps",
    "rank": "General-major",
    "branch": "Yugoslav People's Army",
    "slot": "front_commander",
    "war": 58,
    "int": 64,
    "pol": 48,
    "chr": 46,
    "personality": "diplomat",
    "bio": "Fictional front commander.",
    "region": "yu.zagreb"
  },
  {
    "id": "yu_f3",
    "name": "Dragan Ilić",
    "title": "Skopje corps",
    "rank": "General-major",
    "branch": "Yugoslav People's Army",
    "slot": "front_commander",
    "war": 62,
    "int": 54,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional front commander.",
    "region": "yu.skopje"
  }
])
});
export const ALBANIA_REGION = land({
  "id": "al",
  "name": "Albania",
  "country": "AL",
  "bbox": {
    "minLon": 17.95,
    "maxLon": 22.28,
    "minLat": 38.37,
    "maxLat": 43.86
  },
  "notes": "Atlas only. Twenty-six rrethe, the district map used through the 1980s, not the later counties. Kukës and Pogradec are chrome, Fier and Vlorë are oil, Durrës is the port. Albania is not a Warsaw Pact member. Occupied and off the week-0 march.",
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
      "id": "AL-BR",
      "name": "Berat",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-DI",
      "name": "Dibër",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-DR",
      "name": "Durrës",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-EL",
      "name": "Elbasan",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-FR",
      "name": "Fier",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-GJ",
      "name": "Gjirokastër",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-GR",
      "name": "Gramsh",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-KO",
      "name": "Kolonjë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-KC",
      "name": "Korçë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-KR",
      "name": "Krujë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-KU",
      "name": "Kukës",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-LE",
      "name": "Lezhë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-LB",
      "name": "Librazhd",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-LU",
      "name": "Lushnjë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-MA",
      "name": "Mat",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-MR",
      "name": "Mirditë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-PR",
      "name": "Përmet",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-PG",
      "name": "Pogradec",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-PU",
      "name": "Pukë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-SR",
      "name": "Sarandë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-SH",
      "name": "Shkodër",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-SK",
      "name": "Skrapar",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-TE",
      "name": "Tepelenë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-TR",
      "name": "Tirana",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-TP",
      "name": "Tropojë",
      "kind": "district",
      "group": null
    },
    {
      "id": "AL-VL",
      "name": "Vlorë",
      "kind": "district",
      "group": null
    }
  ],
  "cities": [
    [
      "berat",
      "Berat",
      "AL-BR",
      40.71,
      19.95,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "peshkopi",
      "Peshkopi",
      "AL-DI",
      41.69,
      20.43,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "durres",
      "Durrës",
      "AL-DR",
      41.32,
      19.45,
      "capital",
      [
        "port"
      ]
    ],
    [
      "elbasan",
      "Elbasan",
      "AL-EL",
      41.11,
      20.08,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "fier",
      "Fier",
      "AL-FR",
      40.72,
      19.56,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "gjirokaster",
      "Gjirokastër",
      "AL-GJ",
      40.08,
      20.14,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gramsh",
      "Gramsh",
      "AL-GR",
      40.87,
      20.18,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "erseke",
      "Ersekë",
      "AL-KO",
      40.34,
      20.68,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "korce",
      "Korçë",
      "AL-KC",
      40.61,
      20.78,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kruje",
      "Krujë",
      "AL-KR",
      41.51,
      19.79,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kukes",
      "Kukës",
      "AL-KU",
      42.08,
      20.42,
      "capital",
      [
        "chrome"
      ]
    ],
    [
      "lezhe",
      "Lezhë",
      "AL-LE",
      41.78,
      19.64,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "librazhd",
      "Librazhd",
      "AL-LB",
      41.18,
      20.32,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "lushnje",
      "Lushnjë",
      "AL-LU",
      40.94,
      19.7,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "burrel",
      "Burrel",
      "AL-MA",
      41.61,
      20.01,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "rreshen",
      "Rrëshen",
      "AL-MR",
      41.77,
      19.88,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "permet",
      "Përmet",
      "AL-PR",
      40.23,
      20.35,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pogradec",
      "Pogradec",
      "AL-PG",
      40.9,
      20.65,
      "capital",
      [
        "chrome"
      ]
    ],
    [
      "puke",
      "Pukë",
      "AL-PU",
      42.04,
      19.9,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sarande",
      "Sarandë",
      "AL-SR",
      39.87,
      20.0,
      "capital",
      [
        "port"
      ]
    ],
    [
      "shkoder",
      "Shkodër",
      "AL-SH",
      42.07,
      19.51,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "corovode",
      "Çorovodë",
      "AL-SK",
      40.5,
      20.23,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tepelene",
      "Tepelenë",
      "AL-TE",
      40.3,
      20.02,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tirana",
      "Tirana",
      "AL-TR",
      41.33,
      19.82,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bajram",
      "Bajram Curri",
      "AL-TP",
      42.36,
      20.08,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "vlore",
      "Vlorë",
      "AL-VL",
      40.47,
      19.49,
      "capital",
      [
        "port",
        "oil"
      ]
    ]
  ],
  "links": [
    [
      "bajram",
      "kukes",
      "road",
      "local road"
    ],
    [
      "bajram",
      "puke",
      "road",
      "local road"
    ],
    [
      "berat",
      "corovode",
      "road",
      "local road"
    ],
    [
      "berat",
      "fier",
      "road",
      "local road"
    ],
    [
      "berat",
      "gramsh",
      "road",
      "local road"
    ],
    [
      "burrel",
      "kruje",
      "road",
      "local road"
    ],
    [
      "burrel",
      "peshkopi",
      "road",
      "local road"
    ],
    [
      "burrel",
      "rreshen",
      "road",
      "local road"
    ],
    [
      "corovode",
      "tepelene",
      "road",
      "local road"
    ],
    [
      "durres",
      "fier",
      "road",
      "SH4"
    ],
    [
      "durres",
      "tirana",
      "road",
      "SH2"
    ],
    [
      "elbasan",
      "gramsh",
      "road",
      "local road"
    ],
    [
      "elbasan",
      "korce",
      "road",
      "SH3"
    ],
    [
      "elbasan",
      "librazhd",
      "road",
      "local road"
    ],
    [
      "elbasan",
      "tirana",
      "road",
      "SH3"
    ],
    [
      "erseke",
      "korce",
      "road",
      "local road"
    ],
    [
      "erseke",
      "permet",
      "road",
      "local road"
    ],
    [
      "fier",
      "lushnje",
      "road",
      "local road"
    ],
    [
      "fier",
      "vlore",
      "road",
      "SH8"
    ],
    [
      "gjirokaster",
      "permet",
      "road",
      "local road"
    ],
    [
      "gjirokaster",
      "sarande",
      "road",
      "local road"
    ],
    [
      "gjirokaster",
      "tepelene",
      "road",
      "local road"
    ],
    [
      "gjirokaster",
      "vlore",
      "road",
      "SH4"
    ],
    [
      "korce",
      "pogradec",
      "road",
      "local road"
    ],
    [
      "kruje",
      "tirana",
      "road",
      "local road"
    ],
    [
      "kukes",
      "shkoder",
      "road",
      "SH5"
    ],
    [
      "lezhe",
      "rreshen",
      "road",
      "local road"
    ],
    [
      "puke",
      "rreshen",
      "road",
      "local road"
    ],
    [
      "puke",
      "shkoder",
      "road",
      "local road"
    ],
    [
      "shkoder",
      "tirana",
      "road",
      "SH1"
    ]
  ]
,
  officers: staff([
  {
    "id": "al_head",
    "name": "Besnik Leka",
    "title": "Chairman of the Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the People's Assembly",
    "slot": "head_of_state",
    "war": 34,
    "int": 50,
    "pol": 68,
    "chr": 28,
    "personality": "recluse",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "al.tirana"
  },
  {
    "id": "al_def",
    "name": "Agim Dervishi",
    "title": "Minister of People's Defence",
    "rank": "Gjeneral-kolonel",
    "branch": "Albanian People's Army",
    "slot": "defense_minister",
    "war": 66,
    "int": 48,
    "pol": 40,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional defense minister.",
    "region": "al.tirana"
  },
  {
    "id": "al_chief",
    "name": "Luan Hysa",
    "title": "Chief of the General Staff",
    "rank": "Gjeneral-lejtenant",
    "branch": "Albanian People's Army",
    "slot": "chief_of_staff",
    "war": 62,
    "int": 58,
    "pol": 36,
    "chr": 32,
    "personality": "cautious",
    "bio": "Fictional chief of staff.",
    "region": "al.tirana"
  },
  {
    "id": "al_f0",
    "name": "Arben Kola",
    "title": "Coastal corps",
    "rank": "Gjeneral-major",
    "branch": "Albanian People's Army",
    "slot": "front_commander",
    "war": 58,
    "int": 52,
    "pol": 30,
    "chr": 34,
    "personality": "cautious",
    "bio": "Fictional front commander.",
    "region": "al.durres"
  },
  {
    "id": "al_field",
    "name": "Dritan Shehu",
    "title": "Tirana garrison",
    "rank": "Kolonel",
    "branch": "Albanian People's Army",
    "slot": "field_officer",
    "war": 64,
    "int": 46,
    "pol": 34,
    "chr": 28,
    "personality": "aggressive",
    "bio": "Fictional field officer.",
    "region": "al.tirana"
  },
  {
    "id": "al_f1",
    "name": "Teuta Shala",
    "title": "Northern corps",
    "rank": "Gjeneral-major",
    "branch": "Albanian People's Army",
    "slot": "front_commander",
    "war": 60,
    "int": 48,
    "pol": 28,
    "chr": 30,
    "personality": "recluse",
    "bio": "Fictional front commander.",
    "region": "al.shkoder"
  },
  {
    "id": "al_f2",
    "name": "Mimoza Gjika",
    "title": "Korçë sector",
    "rank": "Kolonel",
    "branch": "Albanian People's Army",
    "slot": "front_commander",
    "war": 54,
    "int": 50,
    "pol": 32,
    "chr": 40,
    "personality": "loyalist",
    "bio": "Fictional front commander.",
    "region": "al.korce"
  }
])
});
