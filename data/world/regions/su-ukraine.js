import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const UKRAINE_REGION = land({
  "id": "ua",
  "name": "Ukrainian SSR",
  "country": "UA",
  "bbox": {
    "minLon": 20.79,
    "maxLon": 40.82,
    "minLat": 43.12,
    "maxLat": 53.0
  },
  "notes": "Atlas only. Twenty-five oblasts plus Kiev city. Crimea is an oblast of Ukraine. Voroshilovgrad has not returned to Lugansk. The Kiev oblast pin is Belaya Tserkov because the oblast center sat in the city. Sevastopol is the fleet port. No Kerch bridge. Occupied and off the week-0 march.",
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
      "id": "UA-KC",
      "name": "Kiev City",
      "kind": "city",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-KV",
      "name": "Kiev",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-CK",
      "name": "Cherkassy",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-CH",
      "name": "Chernigov",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-CV",
      "name": "Chernovtsy",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-CR",
      "name": "Crimea",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-DP",
      "name": "Dnepropetrovsk",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-DN",
      "name": "Donetsk",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-IF",
      "name": "Ivano-Frankovsk",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-KK",
      "name": "Kharkov",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-KS",
      "name": "Kherson",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-KM",
      "name": "Khmelnitsky",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-KI",
      "name": "Kirovograd",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-VG",
      "name": "Voroshilovgrad",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-LV",
      "name": "Lvov",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-NI",
      "name": "Nikolaev",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-OD",
      "name": "Odessa",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-PL",
      "name": "Poltava",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-RV",
      "name": "Rovno",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-SU",
      "name": "Sumy",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-TE",
      "name": "Ternopol",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-VI",
      "name": "Vinnitsa",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-VO",
      "name": "Volyn",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-ZK",
      "name": "Zakarpattya",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-ZP",
      "name": "Zaporozhye",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    },
    {
      "id": "UA-ZT",
      "name": "Zhitomir",
      "kind": "oblast",
      "group": "Ukrainian SSR"
    }
  ],
  "cities": [
    [
      "kiev",
      "Kiev",
      "UA-KC",
      50.45,
      30.52,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "belaya_tserkov",
      "Belaya Tserkov",
      "UA-KV",
      49.8,
      30.12,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "cherkassy",
      "Cherkassy",
      "UA-CK",
      49.44,
      32.06,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "chernigov",
      "Chernigov",
      "UA-CH",
      51.5,
      31.28,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "chernovtsy",
      "Chernovtsy",
      "UA-CV",
      48.29,
      25.94,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "simferopol",
      "Simferopol",
      "UA-CR",
      44.95,
      34.1,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dnepropetrovsk",
      "Dnepropetrovsk",
      "UA-DP",
      48.46,
      35.05,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "donetsk",
      "Donetsk",
      "UA-DN",
      48.0,
      37.8,
      "capital",
      [
        "coal",
        "steel"
      ]
    ],
    [
      "ivano_frankovsk",
      "Ivano-Frankovsk",
      "UA-IF",
      48.92,
      24.71,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kharkov",
      "Kharkov",
      "UA-KK",
      49.99,
      36.23,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kherson",
      "Kherson",
      "UA-KS",
      46.64,
      32.62,
      "capital",
      [
        "wheat",
        "port"
      ]
    ],
    [
      "khmelnitsky",
      "Khmelnitsky",
      "UA-KM",
      49.42,
      26.99,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kirovograd",
      "Kirovograd",
      "UA-KI",
      48.51,
      32.26,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "voroshilovgrad",
      "Voroshilovgrad",
      "UA-VG",
      48.57,
      39.32,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "lvov",
      "Lvov",
      "UA-LV",
      49.84,
      24.03,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nikolaev",
      "Nikolaev",
      "UA-NI",
      46.97,
      32.0,
      "capital",
      [
        "port"
      ]
    ],
    [
      "odessa",
      "Odessa",
      "UA-OD",
      46.48,
      30.73,
      "capital",
      [
        "port"
      ]
    ],
    [
      "poltava",
      "Poltava",
      "UA-PL",
      49.59,
      34.55,
      "capital",
      [
        "natural_gas",
        "wheat"
      ]
    ],
    [
      "rovno",
      "Rovno",
      "UA-RV",
      50.62,
      26.25,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sumy",
      "Sumy",
      "UA-SU",
      50.91,
      34.8,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ternopol",
      "Ternopol",
      "UA-TE",
      49.55,
      25.59,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "vinnitsa",
      "Vinnitsa",
      "UA-VI",
      49.23,
      28.47,
      "capital",
      [
        "sugar_beets"
      ]
    ],
    [
      "lutsk",
      "Lutsk",
      "UA-VO",
      50.75,
      25.34,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "uzhgorod",
      "Uzhgorod",
      "UA-ZK",
      48.62,
      22.29,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zaporozhye",
      "Zaporozhye",
      "UA-ZP",
      47.84,
      35.14,
      "capital",
      [
        "steel",
        "hydro"
      ]
    ],
    [
      "zhitomir",
      "Zhitomir",
      "UA-ZT",
      50.25,
      28.66,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "krivoy_rog",
      "Krivoy Rog",
      "UA-DP",
      47.91,
      33.39,
      "city",
      [
        "iron"
      ]
    ],
    [
      "sevastopol",
      "Sevastopol",
      "UA-CR",
      44.62,
      33.53,
      "city",
      [
        "port"
      ]
    ],
    [
      "mariupol",
      "Mariupol",
      "UA-DN",
      47.1,
      37.54,
      "city",
      [
        "steel",
        "port"
      ]
    ]
  ],
  "links": [
    [
      "belaya_tserkov",
      "cherkassy",
      "road",
      "local road"
    ],
    [
      "belaya_tserkov",
      "kiev",
      "road",
      "M5"
    ],
    [
      "belaya_tserkov",
      "zhitomir",
      "road",
      "local road"
    ],
    [
      "cherkassy",
      "kirovograd",
      "road",
      "local road"
    ],
    [
      "cherkassy",
      "poltava",
      "road",
      "local road"
    ],
    [
      "chernigov",
      "kiev",
      "road",
      "local road"
    ],
    [
      "chernovtsy",
      "ivano_frankovsk",
      "road",
      "local road"
    ],
    [
      "dnepropetrovsk",
      "krivoy_rog",
      "road",
      "local road"
    ],
    [
      "dnepropetrovsk",
      "poltava",
      "road",
      "local road"
    ],
    [
      "dnepropetrovsk",
      "zaporozhye",
      "road",
      "local road"
    ],
    [
      "donetsk",
      "kharkov",
      "road",
      "M4"
    ],
    [
      "donetsk",
      "mariupol",
      "road",
      "local road"
    ],
    [
      "donetsk",
      "voroshilovgrad",
      "road",
      "local road"
    ],
    [
      "donetsk",
      "zaporozhye",
      "road",
      "M18"
    ],
    [
      "ivano_frankovsk",
      "lvov",
      "road",
      "local road"
    ],
    [
      "ivano_frankovsk",
      "ternopol",
      "road",
      "local road"
    ],
    [
      "ivano_frankovsk",
      "uzhgorod",
      "road",
      "local road"
    ],
    [
      "kharkov",
      "kiev",
      "road",
      "M3"
    ],
    [
      "kharkov",
      "poltava",
      "road",
      "local road"
    ],
    [
      "kharkov",
      "sumy",
      "road",
      "local road"
    ],
    [
      "kherson",
      "nikolaev",
      "road",
      "local road"
    ],
    [
      "kherson",
      "simferopol",
      "road",
      "Perekop isthmus"
    ],
    [
      "khmelnitsky",
      "ternopol",
      "road",
      "local road"
    ],
    [
      "khmelnitsky",
      "vinnitsa",
      "road",
      "local road"
    ],
    [
      "kiev",
      "lvov",
      "road",
      "M17"
    ],
    [
      "kiev",
      "odessa",
      "road",
      "M5"
    ],
    [
      "kirovograd",
      "nikolaev",
      "road",
      "local road"
    ],
    [
      "lutsk",
      "rovno",
      "road",
      "local road"
    ],
    [
      "lvov",
      "uzhgorod",
      "road",
      "M06"
    ],
    [
      "nikolaev",
      "odessa",
      "road",
      "M14"
    ],
    [
      "rovno",
      "ternopol",
      "road",
      "local road"
    ],
    [
      "sevastopol",
      "simferopol",
      "road",
      "local road"
    ],
    [
      "vinnitsa",
      "zhitomir",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "ua_head",
    "name": "Vasyl Bondarenko",
    "title": "Chairman of the Ukrainian Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 42,
    "int": 64,
    "pol": 70,
    "chr": 48,
    "personality": "diplomat",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "ua.kiev"
  },
  {
    "id": "ua_def",
    "name": "Hryhorii Melnyk",
    "title": "Kiev Military District",
    "rank": "General-polkovnik",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 72,
    "int": 60,
    "pol": 44,
    "chr": 38,
    "personality": "loyalist",
    "bio": "Fictional defense minister.",
    "region": "ua.kiev"
  },
  {
    "id": "ua_chief",
    "name": "Oksana Kravchenko",
    "title": "Chief of Staff, Kiev Military District",
    "rank": "General-leytenant",
    "branch": "Soviet Army",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 72,
    "pol": 46,
    "chr": 50,
    "personality": "cautious",
    "bio": "Fictional chief of staff.",
    "region": "ua.kiev"
  },
  {
    "id": "ua_f0",
    "name": "Taras Danyluk",
    "title": "Carpathian Military District",
    "rank": "General-mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 64,
    "int": 58,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional front commander.",
    "region": "ua.lvov"
  },
  {
    "id": "ua_field",
    "name": "Lesia Romaniuk",
    "title": "Kiev garrison",
    "rank": "Polkovnyk",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 56,
    "int": 66,
    "pol": 52,
    "chr": 54,
    "personality": "ambitious",
    "bio": "Fictional field officer.",
    "region": "ua.kiev"
  },
  {
    "id": "ua_f1",
    "name": "Bohdan Savchuk",
    "title": "Odessa Military District",
    "rank": "General-mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 66,
    "int": 52,
    "pol": 32,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional front commander.",
    "region": "ua.odessa"
  },
  {
    "id": "ua_f2",
    "name": "Ihor Pavlenko",
    "title": "Black Sea Fleet",
    "rank": "Vitse-admiral",
    "branch": "Soviet Navy",
    "slot": "front_commander",
    "war": 62,
    "int": 60,
    "pol": 34,
    "chr": 42,
    "personality": "merchant",
    "bio": "Fictional front commander.",
    "region": "ua.sevastopol"
  }
])
});
