import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const LIBYA_REGION = land({
  "id": "ly",
  "name": "Libya",
  "country": "LY",
  "bbox": {
    "minLon": 8.0,
    "maxLon": 25.48,
    "minLat": 22.68,
    "maxLat": 34.43
  },
  "notes": "Atlas only. The 46 baladiyat of 1983, which cover 1985 through the 1987 reduction. Oil is the Sirte basin. The 25-baladiyah map of 1988 is not drawn. Occupied and off the week-0 march.",
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
      "id": "LY-01",
      "name": "Ajdabiya",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-02",
      "name": "Al Abyar",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-03",
      "name": "Al Aziziyah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-04",
      "name": "Al Bayda",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-05",
      "name": "Al Jufrah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-06",
      "name": "Al Jumayl",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-07",
      "name": "Al Khums",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-08",
      "name": "Al Kufrah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-09",
      "name": "Al Marj",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-10",
      "name": "Al Qarabulli",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-11",
      "name": "Al Qubbah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-12",
      "name": "Al Ujaylat",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-13",
      "name": "Ash Shati",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-14",
      "name": "Awbari",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-15",
      "name": "Az Zahra",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-16",
      "name": "Az Zawiyah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-18",
      "name": "Bani Walid",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-17",
      "name": "Benghazi",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-19",
      "name": "Bin Jawwad",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-20",
      "name": "Derna",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-21",
      "name": "Ghadamis",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-22",
      "name": "Gharyan",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-23",
      "name": "Ghat",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-24",
      "name": "Jadu",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-25",
      "name": "Jalu",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-26",
      "name": "Janzur",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-27",
      "name": "Masallatah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-28",
      "name": "Misratah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-29",
      "name": "Mizdah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-30",
      "name": "Murzuq",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-31",
      "name": "Nalut",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-32",
      "name": "Qaminis",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-33",
      "name": "Qasr Bin Ghashir",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-34",
      "name": "Sabha",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-35",
      "name": "Sabratah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-36",
      "name": "Shahhat",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-37",
      "name": "Surman",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-38",
      "name": "Surt",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-39",
      "name": "Tajura",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-41",
      "name": "Tarhunah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-42",
      "name": "Tobruk",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-40",
      "name": "Tripoli",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-43",
      "name": "Tukrah",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-44",
      "name": "Yafran",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-45",
      "name": "Zlitan",
      "kind": "baladiyah",
      "group": null
    },
    {
      "id": "LY-46",
      "name": "Zuwarah",
      "kind": "baladiyah",
      "group": null
    }
  ],
  "cities": [
    [
      "ajdabiya",
      "Ajdabiya",
      "LY-01",
      30.76,
      20.22,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "al_abyar",
      "Al Abyar",
      "LY-02",
      32.19,
      20.6,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "aziziyah",
      "Al Aziziyah",
      "LY-03",
      32.53,
      13.02,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bayda",
      "Al Bayda",
      "LY-04",
      32.76,
      21.76,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "waddan",
      "Waddan",
      "LY-05",
      29.16,
      16.14,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jumayl",
      "Al Jumayl",
      "LY-06",
      32.85,
      12.06,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "khums",
      "Al Khums",
      "LY-07",
      32.65,
      14.26,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kufrah",
      "Al Kufrah",
      "LY-08",
      24.18,
      23.31,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "marj",
      "Al Marj",
      "LY-09",
      32.49,
      20.83,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "qarabulli",
      "Al Qarabulli",
      "LY-10",
      32.75,
      13.72,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "qubbah",
      "Al Qubbah",
      "LY-11",
      32.77,
      22.24,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ujaylat",
      "Al Ujaylat",
      "LY-12",
      32.76,
      12.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "birak",
      "Birak",
      "LY-13",
      27.55,
      14.27,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "awbari",
      "Awbari",
      "LY-14",
      26.59,
      12.78,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zahra",
      "Az Zahra",
      "LY-15",
      32.78,
      12.96,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zawiyah",
      "Az Zawiyah",
      "LY-16",
      32.75,
      12.73,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bani_walid",
      "Bani Walid",
      "LY-18",
      31.76,
      13.99,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "benghazi",
      "Benghazi",
      "LY-17",
      32.12,
      20.07,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "bin_jawwad",
      "Bin Jawwad",
      "LY-19",
      30.8,
      18.08,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "derna",
      "Derna",
      "LY-20",
      32.76,
      22.64,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ghadamis",
      "Ghadamis",
      "LY-21",
      30.13,
      9.5,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gharyan",
      "Gharyan",
      "LY-22",
      32.17,
      13.02,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ghat",
      "Ghat",
      "LY-23",
      24.96,
      10.18,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jadu",
      "Jadu",
      "LY-24",
      31.95,
      12.02,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jalu",
      "Jalu",
      "LY-25",
      29.03,
      21.55,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "janzur",
      "Janzur",
      "LY-26",
      32.82,
      13.02,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "masallatah",
      "Masallatah",
      "LY-27",
      32.58,
      14.04,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "misratah",
      "Misratah",
      "LY-28",
      32.38,
      15.09,
      "capital",
      [
        "port",
        "steel"
      ]
    ],
    [
      "mizdah",
      "Mizdah",
      "LY-29",
      31.45,
      12.98,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "murzuq",
      "Murzuq",
      "LY-30",
      25.92,
      13.92,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nalut",
      "Nalut",
      "LY-31",
      31.87,
      10.98,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "qaminis",
      "Qaminis",
      "LY-32",
      31.66,
      20.01,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bin_ghashir",
      "Qasr Bin Ghashir",
      "LY-33",
      32.68,
      13.18,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sabha",
      "Sabha",
      "LY-34",
      27.04,
      14.43,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sabratah",
      "Sabratah",
      "LY-35",
      32.79,
      12.49,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "shahhat",
      "Shahhat",
      "LY-36",
      32.83,
      21.86,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "surman",
      "Surman",
      "LY-37",
      32.76,
      12.57,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "surt",
      "Surt",
      "LY-38",
      31.2,
      16.59,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "tajura",
      "Tajura",
      "LY-39",
      32.88,
      13.35,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tarhunah",
      "Tarhunah",
      "LY-41",
      32.43,
      13.63,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tobruk",
      "Tobruk",
      "LY-42",
      32.08,
      23.98,
      "capital",
      [
        "port"
      ]
    ],
    [
      "tripoli",
      "Tripoli",
      "LY-40",
      32.89,
      13.19,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "tukrah",
      "Tukrah",
      "LY-43",
      32.53,
      20.58,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "yafran",
      "Yafran",
      "LY-44",
      32.06,
      12.53,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zlitan",
      "Zlitan",
      "LY-45",
      32.47,
      14.57,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zuwarah",
      "Zuwarah",
      "LY-46",
      32.93,
      12.08,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "zahra",
      "janzur",
      "road",
      "highway"
    ],
    [
      "sabratah",
      "surman",
      "road",
      "highway"
    ],
    [
      "jumayl",
      "zuwarah",
      "road",
      "highway"
    ],
    [
      "ujaylat",
      "sabratah",
      "road",
      "highway"
    ],
    [
      "bayda",
      "shahhat",
      "road",
      "highway"
    ],
    [
      "tajura",
      "tripoli",
      "road",
      "highway"
    ],
    [
      "zawiyah",
      "surman",
      "road",
      "highway"
    ],
    [
      "janzur",
      "tripoli",
      "road",
      "highway"
    ],
    [
      "janzur",
      "bin_ghashir",
      "road",
      "highway"
    ],
    [
      "zahra",
      "zawiyah",
      "road",
      "highway"
    ],
    [
      "khums",
      "masallatah",
      "road",
      "highway"
    ],
    [
      "aziziyah",
      "bin_ghashir",
      "road",
      "highway"
    ],
    [
      "marj",
      "tukrah",
      "road",
      "highway"
    ],
    [
      "jumayl",
      "ujaylat",
      "road",
      "highway"
    ],
    [
      "khums",
      "zlitan",
      "road",
      "highway"
    ],
    [
      "qarabulli",
      "masallatah",
      "road",
      "highway"
    ],
    [
      "qubbah",
      "shahhat",
      "road",
      "highway"
    ],
    [
      "qarabulli",
      "tarhunah",
      "road",
      "highway"
    ],
    [
      "qubbah",
      "derna",
      "road",
      "highway"
    ],
    [
      "qarabulli",
      "tajura",
      "road",
      "highway"
    ],
    [
      "al_abyar",
      "tukrah",
      "road",
      "highway"
    ],
    [
      "aziziyah",
      "gharyan",
      "road",
      "highway"
    ],
    [
      "gharyan",
      "yafran",
      "road",
      "highway"
    ],
    [
      "jadu",
      "yafran",
      "road",
      "highway"
    ],
    [
      "misratah",
      "zlitan",
      "road",
      "highway"
    ],
    [
      "al_abyar",
      "benghazi",
      "road",
      "highway"
    ],
    [
      "benghazi",
      "qaminis",
      "road",
      "highway"
    ],
    [
      "birak",
      "sabha",
      "road",
      "highway"
    ],
    [
      "mizdah",
      "yafran",
      "road",
      "highway"
    ],
    [
      "bani_walid",
      "tarhunah",
      "road",
      "highway"
    ],
    [
      "bayda",
      "marj",
      "road",
      "highway"
    ],
    [
      "jadu",
      "nalut",
      "road",
      "highway"
    ],
    [
      "ajdabiya",
      "qaminis",
      "road",
      "highway"
    ],
    [
      "murzuq",
      "sabha",
      "road",
      "highway"
    ],
    [
      "awbari",
      "murzuq",
      "road",
      "highway"
    ],
    [
      "derna",
      "tobruk",
      "road",
      "highway"
    ],
    [
      "bin_jawwad",
      "surt",
      "road",
      "highway"
    ],
    [
      "misratah",
      "surt",
      "road",
      "highway"
    ],
    [
      "ajdabiya",
      "bin_jawwad",
      "road",
      "highway"
    ],
    [
      "waddan",
      "surt",
      "road",
      "highway"
    ],
    [
      "ajdabiya",
      "jalu",
      "road",
      "highway"
    ],
    [
      "ghadamis",
      "nalut",
      "road",
      "highway"
    ],
    [
      "waddan",
      "birak",
      "road",
      "highway"
    ],
    [
      "awbari",
      "ghat",
      "road",
      "highway"
    ],
    [
      "kufrah",
      "jalu",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "ly_0",
    "name": "Bashir El-Fituri",
    "title": "Secretary of the General People's Congress",
    "rank": "Secretary",
    "branch": "General People's Congress",
    "slot": "head_of_state",
    "war": 36,
    "int": 58,
    "pol": 66,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ly.tripoli"
  },
  {
    "id": "ly_1",
    "name": "Salem Bu Zayd",
    "title": "Secretary of Defense",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 70,
    "int": 42,
    "pol": 34,
    "chr": 30,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ly.ajdabiya"
  },
  {
    "id": "ly_2",
    "name": "Hanan Bu Sneina",
    "title": "Chief of Staff",
    "rank": "Muqaddam",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 56,
    "int": 50,
    "pol": 38,
    "chr": 36,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ly.al_abyar"
  },
  {
    "id": "ly_3",
    "name": "Mabrouka El-Ghariani",
    "title": "Front commander",
    "rank": "Ra'id",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 64,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ly.aziziyah"
  },
  {
    "id": "ly_4",
    "name": "Faraj El-Baruni",
    "title": "Sirte sector",
    "rank": "Ra'id",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 48,
    "int": 44,
    "pol": 36,
    "chr": 42,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ly.bayda"
  },
  {
    "id": "ly_5",
    "name": "Omar El-Hassi",
    "title": "Front commander",
    "rank": "Ra'id",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ly.waddan"
  },
  {
    "id": "ly_6",
    "name": "Zeinab Tuati",
    "title": "Front commander",
    "rank": "Ra'id",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 70,
    "int": 38,
    "pol": 28,
    "chr": 32,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ly.jumayl"
  },
  {
    "id": "ly_7",
    "name": "Adel Suwayhili",
    "title": "Front commander",
    "rank": "Ra'id",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 55,
    "int": 48,
    "pol": 44,
    "chr": 46,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ly.khums"
  }
])
});

export const EGYPT_REGION = land({
  "id": "eg",
  "name": "Egypt",
  "country": "EG",
  "bbox": {
    "minLon": 25.75,
    "maxLon": 36.39,
    "minLat": 22.59,
    "maxLat": 32.92
  },
  "notes": "Atlas only. Twenty-six governorates. Sinai is Egyptian: North and South Sinai, returned in 1982, are not Israeli. The Suez Canal is a sea lane from Port Said to Suez, with the canal road through Ismailia. Occupied and off the week-0 march.",
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
      "id": "EG-C",
      "name": "Cairo",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-ALX",
      "name": "Alexandria",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-PTS",
      "name": "Port Said",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-SUZ",
      "name": "Suez",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-DT",
      "name": "Damietta",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-DK",
      "name": "Dakahlia",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-SHR",
      "name": "Sharqia",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-KB",
      "name": "Qalyubia",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-KFS",
      "name": "Kafr El Sheikh",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-GH",
      "name": "Gharbia",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-MNF",
      "name": "Monufia",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-BH",
      "name": "Beheira",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-IS",
      "name": "Ismailia",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-GZ",
      "name": "Giza",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-BNS",
      "name": "Beni Suef",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-FYM",
      "name": "Faiyum",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-MN",
      "name": "Minya",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-AST",
      "name": "Asyut",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-SHG",
      "name": "Sohag",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-KN",
      "name": "Qena",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-ASN",
      "name": "Aswan",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-BA",
      "name": "Red Sea",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-WAD",
      "name": "New Valley",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-MT",
      "name": "Matruh",
      "kind": "governorate",
      "group": null
    },
    {
      "id": "EG-SIN",
      "name": "North Sinai",
      "kind": "governorate",
      "group": "Sinai (returned 1982)"
    },
    {
      "id": "EG-JS",
      "name": "South Sinai",
      "kind": "governorate",
      "group": "Sinai (returned 1982)"
    }
  ],
  "cities": [
    [
      "cairo",
      "Cairo",
      "EG-C",
      30.04,
      31.24,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "alexandria",
      "Alexandria",
      "EG-ALX",
      31.2,
      29.92,
      "capital",
      [
        "port",
        "cotton"
      ]
    ],
    [
      "port_said",
      "Port Said",
      "EG-PTS",
      31.26,
      32.3,
      "capital",
      [
        "port"
      ]
    ],
    [
      "suez",
      "Suez",
      "EG-SUZ",
      29.97,
      32.55,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "damietta",
      "Damietta",
      "EG-DT",
      31.42,
      31.81,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mansoura",
      "Mansoura",
      "EG-DK",
      31.04,
      31.38,
      "capital",
      [
        "cotton",
        "rice"
      ]
    ],
    [
      "zagazig",
      "Zagazig",
      "EG-SHR",
      30.59,
      31.5,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "banha",
      "Banha",
      "EG-KB",
      30.46,
      31.18,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kafr_elsheikh",
      "Kafr El Sheikh",
      "EG-KFS",
      31.11,
      30.94,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tanta",
      "Tanta",
      "EG-GH",
      30.79,
      31.0,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "shibin",
      "Shibin El Kom",
      "EG-MNF",
      30.55,
      31.01,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "damanhur",
      "Damanhur",
      "EG-BH",
      31.03,
      30.47,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ismailia",
      "Ismailia",
      "EG-IS",
      30.6,
      32.27,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "giza",
      "Giza",
      "EG-GZ",
      30.01,
      31.21,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "beni_suef",
      "Beni Suef",
      "EG-BNS",
      29.07,
      31.1,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "faiyum",
      "Faiyum",
      "EG-FYM",
      29.31,
      30.84,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "minya",
      "Minya",
      "EG-MN",
      28.11,
      30.75,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "asyut",
      "Asyut",
      "EG-AST",
      27.18,
      31.18,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sohag",
      "Sohag",
      "EG-SHG",
      26.56,
      31.7,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "qena",
      "Qena",
      "EG-KN",
      26.16,
      32.72,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "aswan",
      "Aswan",
      "EG-ASN",
      24.09,
      32.9,
      "capital",
      [
        "hydro"
      ]
    ],
    [
      "hurghada",
      "Hurghada",
      "EG-BA",
      27.26,
      33.81,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "kharga",
      "Kharga",
      "EG-WAD",
      25.45,
      30.55,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mersa_matruh",
      "Mersa Matruh",
      "EG-MT",
      31.35,
      27.25,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "arish",
      "Arish",
      "EG-SIN",
      31.13,
      33.8,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "el_tor",
      "El Tor",
      "EG-JS",
      28.24,
      33.62,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "taba",
      "Taba",
      "EG-JS",
      29.49,
      34.89,
      "city",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "port_said",
      "suez",
      "sea",
      "Suez Canal"
    ],
    [
      "port_said",
      "ismailia",
      "road",
      "canal road"
    ],
    [
      "ismailia",
      "suez",
      "road",
      "canal road"
    ],
    [
      "cairo",
      "alexandria",
      "road",
      "Desert Road"
    ],
    [
      "cairo",
      "giza",
      "road",
      "highway"
    ],
    [
      "banha",
      "shibin",
      "road",
      "highway"
    ],
    [
      "tanta",
      "shibin",
      "road",
      "highway"
    ],
    [
      "zagazig",
      "banha",
      "road",
      "highway"
    ],
    [
      "kafr_elsheikh",
      "tanta",
      "road",
      "highway"
    ],
    [
      "beni_suef",
      "faiyum",
      "road",
      "highway"
    ],
    [
      "mansoura",
      "kafr_elsheikh",
      "road",
      "highway"
    ],
    [
      "kafr_elsheikh",
      "damanhur",
      "road",
      "highway"
    ],
    [
      "cairo",
      "banha",
      "road",
      "highway"
    ],
    [
      "port_said",
      "damietta",
      "road",
      "highway"
    ],
    [
      "damietta",
      "mansoura",
      "road",
      "highway"
    ],
    [
      "giza",
      "faiyum",
      "road",
      "highway"
    ],
    [
      "asyut",
      "sohag",
      "road",
      "highway"
    ],
    [
      "hurghada",
      "el_tor",
      "road",
      "highway"
    ],
    [
      "sohag",
      "qena",
      "road",
      "highway"
    ],
    [
      "minya",
      "asyut",
      "road",
      "highway"
    ],
    [
      "beni_suef",
      "minya",
      "road",
      "highway"
    ],
    [
      "port_said",
      "arish",
      "road",
      "highway"
    ],
    [
      "qena",
      "hurghada",
      "road",
      "highway"
    ],
    [
      "sohag",
      "kharga",
      "road",
      "highway"
    ],
    [
      "el_tor",
      "taba",
      "road",
      "highway"
    ],
    [
      "qena",
      "aswan",
      "road",
      "highway"
    ],
    [
      "alexandria",
      "mersa_matruh",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "eg_0",
    "name": "Tarek El-Masri",
    "title": "President",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 38,
    "int": 64,
    "pol": 72,
    "chr": 58,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "eg.cairo"
  },
  {
    "id": "eg_1",
    "name": "Hisham Fawzi",
    "title": "Minister of Defense",
    "rank": "Fariq",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 66,
    "int": 52,
    "pol": 40,
    "chr": 36,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "eg.alexandria"
  },
  {
    "id": "eg_2",
    "name": "Mona Abdel Nour",
    "title": "Chief of Staff",
    "rank": "Liwa",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 54,
    "int": 58,
    "pol": 46,
    "chr": 50,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "eg.port_said"
  },
  {
    "id": "eg_3",
    "name": "Layla Hamdy",
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
    "region": "eg.suez"
  },
  {
    "id": "eg_4",
    "name": "Youssef El-Shenawy",
    "title": "Canal command",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 46,
    "pol": 34,
    "chr": 32,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "eg.damietta"
  },
  {
    "id": "eg_5",
    "name": "Sherif Lotfy",
    "title": "Front commander",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 58,
    "int": 50,
    "pol": 36,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "eg.mansoura"
  },
  {
    "id": "eg_6",
    "name": "Nadia El-Sayed",
    "title": "Front commander",
    "rank": "Amid",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 70,
    "int": 38,
    "pol": 28,
    "chr": 32,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "eg.zagazig"
  }
])
});

export const SUDAN_REGION = land({
  "id": "sdn",
  "name": "Sudan",
  "country": "SDN",
  "bbox": {
    "minLon": 23.85,
    "maxLon": 38.72,
    "minLat": 3.35,
    "maxLat": 23.3
  },
  "notes": "Atlas only. Nine regions of the undivided country, including Equatoria, Bahr al Ghazal, and Upper Nile. South Sudan is not a state. The 1994 map of 26 states is not drawn. Chevron had left the southern fields in 1984, so Malakal is sorghum and cattle, not oil. Subdivision ids are SDN- so they do not match South Dakota. Occupied and off the week-0 march.",
  "defaultBiome": "desert",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "SDN-KH",
      "name": "Khartoum",
      "kind": "region",
      "group": null
    },
    {
      "id": "SDN-NO",
      "name": "Northern",
      "kind": "region",
      "group": null
    },
    {
      "id": "SDN-EA",
      "name": "Eastern",
      "kind": "region",
      "group": null
    },
    {
      "id": "SDN-CE",
      "name": "Central",
      "kind": "region",
      "group": null
    },
    {
      "id": "SDN-KO",
      "name": "Kordofan",
      "kind": "region",
      "group": null
    },
    {
      "id": "SDN-DA",
      "name": "Darfur",
      "kind": "region",
      "group": null
    },
    {
      "id": "SDN-BG",
      "name": "Bahr al Ghazal",
      "kind": "region",
      "group": null
    },
    {
      "id": "SDN-EQ",
      "name": "Equatoria",
      "kind": "region",
      "group": null
    },
    {
      "id": "SDN-UN",
      "name": "Upper Nile",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "khartoum",
      "Khartoum",
      "SDN-KH",
      15.5,
      32.56,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "omdurman",
      "Omdurman",
      "SDN-KH",
      15.64,
      32.48,
      "city",
      [
        "administration"
      ]
    ],
    [
      "dongola",
      "Dongola",
      "SDN-NO",
      19.17,
      30.47,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "atbara",
      "Atbara",
      "SDN-NO",
      17.7,
      33.98,
      "city",
      [
        "wheat"
      ]
    ],
    [
      "wadi_halfa",
      "Wadi Halfa",
      "SDN-NO",
      21.8,
      31.35,
      "city",
      [
        "administration"
      ]
    ],
    [
      "kassala",
      "Kassala",
      "SDN-EA",
      15.45,
      36.4,
      "capital",
      [
        "gold",
        "cotton"
      ]
    ],
    [
      "port_sudan",
      "Port Sudan",
      "SDN-EA",
      19.62,
      37.22,
      "city",
      [
        "port"
      ]
    ],
    [
      "wad_madani",
      "Wad Madani",
      "SDN-CE",
      14.4,
      33.52,
      "capital",
      [
        "cotton",
        "sorghum"
      ]
    ],
    [
      "el_obeid",
      "El Obeid",
      "SDN-KO",
      13.18,
      30.22,
      "capital",
      [
        "sorghum",
        "cattle"
      ]
    ],
    [
      "el_fasher",
      "El Fasher",
      "SDN-DA",
      13.63,
      25.35,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "wau",
      "Wau",
      "SDN-BG",
      7.7,
      28.0,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "juba",
      "Juba",
      "SDN-EQ",
      4.85,
      31.6,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "malakal",
      "Malakal",
      "SDN-UN",
      9.53,
      31.66,
      "capital",
      [
        "sorghum",
        "cattle"
      ]
    ]
  ],
  "links": [
    [
      "khartoum",
      "omdurman",
      "road",
      "highway"
    ],
    [
      "khartoum",
      "wad_madani",
      "road",
      "highway"
    ],
    [
      "omdurman",
      "atbara",
      "road",
      "highway"
    ],
    [
      "dongola",
      "wadi_halfa",
      "road",
      "highway"
    ],
    [
      "kassala",
      "wad_madani",
      "road",
      "highway"
    ],
    [
      "khartoum",
      "el_obeid",
      "road",
      "highway"
    ],
    [
      "atbara",
      "port_sudan",
      "road",
      "highway"
    ],
    [
      "dongola",
      "atbara",
      "road",
      "highway"
    ],
    [
      "el_obeid",
      "malakal",
      "road",
      "highway"
    ],
    [
      "wau",
      "malakal",
      "road",
      "highway"
    ],
    [
      "wau",
      "juba",
      "road",
      "highway"
    ],
    [
      "el_obeid",
      "el_fasher",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "sdn_0",
    "name": "Ibrahim El-Fadil",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 32,
    "int": 60,
    "pol": 66,
    "chr": 54,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sdn.khartoum"
  },
  {
    "id": "sdn_1",
    "name": "Fatima Karrar",
    "title": "Minister of Defense",
    "rank": "Fariq",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 58,
    "int": 54,
    "pol": 42,
    "chr": 44,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sdn.omdurman"
  },
  {
    "id": "sdn_2",
    "name": "Peter Lado",
    "title": "Chief of Staff",
    "rank": "Liwa",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 36,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sdn.dongola"
  },
  {
    "id": "sdn_3",
    "name": "Asha Osman",
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
    "region": "sdn.atbara"
  },
  {
    "id": "sdn_4",
    "name": "Musa Deng",
    "title": "Equatoria sector",
    "rank": "Aqid",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 42,
    "pol": 28,
    "chr": 30,
    "personality": "recluse",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sdn.wadi_halfa"
  }
])
});

export const DJIBOUTI_REGION = land({
  "id": "dj",
  "name": "Djibouti",
  "country": "DJ",
  "bbox": {
    "minLon": 40.87,
    "maxLon": 44.79,
    "minLat": 9.6,
    "maxLat": 13.46
  },
  "notes": "Atlas only. Five districts, on the sheet so Bab-el-Mandeb has an African shore. Ethiopia, Eritrea, and Somalia are not started. Occupied and off the week-0 march.",
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
      "id": "DJ-DJ",
      "name": "Djibouti",
      "kind": "district",
      "group": null
    },
    {
      "id": "DJ-AS",
      "name": "Ali Sabieh",
      "kind": "district",
      "group": null
    },
    {
      "id": "DJ-DI",
      "name": "Dikhil",
      "kind": "district",
      "group": null
    },
    {
      "id": "DJ-TA",
      "name": "Tadjoura",
      "kind": "district",
      "group": null
    },
    {
      "id": "DJ-OB",
      "name": "Obock",
      "kind": "district",
      "group": null
    }
  ],
  "cities": [
    [
      "djibouti",
      "Djibouti",
      "DJ-DJ",
      11.59,
      43.15,
      "capital",
      [
        "port"
      ]
    ],
    [
      "ali_sabieh",
      "Ali Sabieh",
      "DJ-AS",
      11.16,
      42.71,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dikhil",
      "Dikhil",
      "DJ-DI",
      11.1,
      42.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tadjoura",
      "Tadjoura",
      "DJ-TA",
      11.79,
      42.88,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "obock",
      "Obock",
      "DJ-OB",
      11.96,
      43.29,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "djibouti",
      "tadjoura",
      "road",
      "highway"
    ],
    [
      "ali_sabieh",
      "dikhil",
      "road",
      "highway"
    ],
    [
      "djibouti",
      "obock",
      "road",
      "highway"
    ],
    [
      "djibouti",
      "ali_sabieh",
      "road",
      "highway"
    ]
  ],
  officers: staff([
  {
    "id": "dj_0",
    "name": "Amina Walalo",
    "title": "President",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 30,
    "int": 58,
    "pol": 64,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dj.djibouti"
  },
  {
    "id": "dj_1",
    "name": "Hassan Darar",
    "title": "Minister of Defense",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 52,
    "int": 48,
    "pol": 40,
    "chr": 38,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dj.ali_sabieh"
  },
  {
    "id": "dj_2",
    "name": "Idriss Ali",
    "title": "Harbor command",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 40,
    "int": 46,
    "pol": 44,
    "chr": 42,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "dj.dikhil"
  }
])
});
