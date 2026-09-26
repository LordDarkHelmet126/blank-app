/** South Asia, 1985-89. India is the end-1987 map. */
import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const PAKISTAN_REGION = land({
  "id": "pk",
  "name": "Pakistan",
  "country": "PK",
  "bbox": {
    "minLon": 66.24,
    "maxLon": 75.09,
    "minLat": 24.11,
    "maxLat": 36.67
  },
  "notes": "Atlas only. Four provinces plus the Islamabad Capital Territory, FATA, and the Northern Areas. Azad Kashmir is a zone on the Line of Control. The Khyber Pass meets Jalalabad, Chaman meets Kandahar, and Taftan meets Zahedan. Sui gas is in Balochistan. Occupied and off the week-0 march.",
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
      "id": "PK-PB",
      "name": "Punjab",
      "kind": "province",
      "group": null
    },
    {
      "id": "PK-SD",
      "name": "Sindh",
      "kind": "province",
      "group": null
    },
    {
      "id": "PK-NW",
      "name": "North-West Frontier",
      "kind": "province",
      "group": null
    },
    {
      "id": "PK-BA",
      "name": "Balochistan",
      "kind": "province",
      "group": null
    },
    {
      "id": "PK-IS",
      "name": "Islamabad Capital Territory",
      "kind": "territory",
      "group": null
    },
    {
      "id": "PK-FT",
      "name": "FATA",
      "kind": "tribal area",
      "group": null
    },
    {
      "id": "PK-NA",
      "name": "Northern Areas",
      "kind": "territory",
      "group": null
    },
    {
      "id": "PK-AK",
      "name": "Azad Kashmir",
      "kind": "zone",
      "group": "Line of Control"
    }
  ],
  "cities": [
    [
      "lahore",
      "Lahore",
      "PK-PB",
      31.55,
      74.34,
      "capital",
      [
        "wheat",
        "cotton",
        "administration"
      ]
    ],
    [
      "karachi",
      "Karachi",
      "PK-SD",
      24.86,
      67.01,
      "capital",
      [
        "port",
        "cotton",
        "fisheries"
      ]
    ],
    [
      "peshawar",
      "Peshawar",
      "PK-NW",
      34.01,
      71.58,
      "capital",
      [
        "wheat",
        "timber"
      ]
    ],
    [
      "quetta",
      "Quetta",
      "PK-BA",
      30.18,
      66.99,
      "capital",
      [
        "wheat",
        "cattle"
      ]
    ],
    [
      "sui",
      "Sui",
      "PK-BA",
      28.63,
      69.18,
      "city",
      [
        "natural_gas"
      ]
    ],
    [
      "islamabad",
      "Islamabad",
      "PK-IS",
      33.69,
      73.06,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "miranshah",
      "Miranshah",
      "PK-FT",
      32.99,
      70.07,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "gilgit",
      "Gilgit",
      "PK-NA",
      35.92,
      74.31,
      "capital",
      [
        "hydro"
      ]
    ],
    [
      "muzaffarabad",
      "Muzaffarabad",
      "PK-AK",
      34.37,
      73.47,
      "capital",
      [
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "gilgit",
      "islamabad",
      "road",
      "Karakoram Highway"
    ],
    [
      "islamabad",
      "muzaffarabad",
      "road",
      "National road"
    ],
    [
      "peshawar",
      "islamabad",
      "road",
      "National road"
    ],
    [
      "peshawar",
      "miranshah",
      "road",
      "National road"
    ],
    [
      "lahore",
      "islamabad",
      "road",
      "National road"
    ],
    [
      "quetta",
      "sui",
      "road",
      "National road"
    ],
    [
      "quetta",
      "miranshah",
      "road",
      "National road"
    ],
    [
      "karachi",
      "sui",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "pk_0",
    "name": "Farooq Qureshi",
    "title": "President",
    "rank": "President",
    "branch": "Pakistan Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Pakistan, posted at lahore (pk_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pk.lahore"
  },
  {
    "id": "pk_1",
    "name": "Imtiaz Abbasi",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Pakistan Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Pakistan, posted at karachi (pk_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pk.karachi"
  },
  {
    "id": "pk_2",
    "name": "Nadeem Chaudhry",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Pakistan Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Pakistan, posted at peshawar (pk_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pk.peshawar"
  },
  {
    "id": "pk_3",
    "name": "Shahid Malik",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Pakistan Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Pakistan, posted at quetta (pk_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pk.quetta"
  },
  {
    "id": "pk_4",
    "name": "Tariq Hashmi",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Pakistan Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Pakistan, posted at sui (pk_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pk.sui"
  }
])
});

export const INDIA_REGION = land({
  "id": "in",
  "name": "India",
  "country": "IN",
  "bbox": {
    "minLon": 71.89,
    "maxLon": 94.86,
    "minLat": 7.77,
    "maxLat": 34.83
  },
  "notes": "Atlas only. End-1987 map: 25 states and 7 union territories. Mizoram and Arunachal Pradesh became states in February 1987, and Goa in May 1987, when Daman and Diu became its own union territory. Delhi is still a union territory. Chandigarh is a union territory and the shared capital; Haryana is pinned at Karnal and Punjab at Amritsar. No Chhattisgarh, Uttarakhand, Jharkhand, or Telangana. Period names stay Bombay, Madras, Calcutta, Orissa, and Pondicherry. Assam tea is mapped as coffee. Nathu La is closed. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "IN-AP",
      "name": "Andhra Pradesh",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-AR",
      "name": "Arunachal Pradesh",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-AS",
      "name": "Assam",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-BR",
      "name": "Bihar",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-GA",
      "name": "Goa",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-GJ",
      "name": "Gujarat",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-HR",
      "name": "Haryana",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-HP",
      "name": "Himachal Pradesh",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-JK",
      "name": "Jammu and Kashmir",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-KA",
      "name": "Karnataka",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-KL",
      "name": "Kerala",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-MP",
      "name": "Madhya Pradesh",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-MH",
      "name": "Maharashtra",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-MN",
      "name": "Manipur",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-ML",
      "name": "Meghalaya",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-MZ",
      "name": "Mizoram",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-NL",
      "name": "Nagaland",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-OR",
      "name": "Orissa",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-PB",
      "name": "Punjab",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-RJ",
      "name": "Rajasthan",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-SK",
      "name": "Sikkim",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-TN",
      "name": "Tamil Nadu",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-TR",
      "name": "Tripura",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-UP",
      "name": "Uttar Pradesh",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-WB",
      "name": "West Bengal",
      "kind": "state",
      "group": null
    },
    {
      "id": "IN-AN",
      "name": "Andaman and Nicobar Islands",
      "kind": "territory",
      "group": null
    },
    {
      "id": "IN-CH",
      "name": "Chandigarh",
      "kind": "territory",
      "group": null
    },
    {
      "id": "IN-DN",
      "name": "Dadra and Nagar Haveli",
      "kind": "territory",
      "group": null
    },
    {
      "id": "IN-DD",
      "name": "Daman and Diu",
      "kind": "territory",
      "group": null
    },
    {
      "id": "IN-DL",
      "name": "Delhi",
      "kind": "territory",
      "group": null
    },
    {
      "id": "IN-LD",
      "name": "Lakshadweep",
      "kind": "territory",
      "group": null
    },
    {
      "id": "IN-PY",
      "name": "Pondicherry",
      "kind": "territory",
      "group": null
    }
  ],
  "cities": [
    [
      "hyderabad",
      "Hyderabad",
      "IN-AP",
      17.39,
      78.49,
      "capital",
      [
        "rice",
        "cotton"
      ]
    ],
    [
      "itanagar",
      "Itanagar",
      "IN-AR",
      27.08,
      93.61,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "guwahati",
      "Guwahati",
      "IN-AS",
      26.14,
      91.74,
      "capital",
      [
        "coffee",
        "oil",
        "rice"
      ]
    ],
    [
      "patna",
      "Patna",
      "IN-BR",
      25.59,
      85.14,
      "capital",
      [
        "rice",
        "wheat"
      ]
    ],
    [
      "panaji",
      "Panaji",
      "IN-GA",
      15.49,
      73.83,
      "capital",
      [
        "port",
        "iron"
      ]
    ],
    [
      "gandhinagar",
      "Gandhinagar",
      "IN-GJ",
      23.22,
      72.65,
      "capital",
      [
        "cotton",
        "salt"
      ]
    ],
    [
      "karnal",
      "Karnal",
      "IN-HR",
      29.69,
      76.98,
      "capital",
      [
        "wheat",
        "dairy"
      ]
    ],
    [
      "shimla",
      "Shimla",
      "IN-HP",
      31.1,
      77.17,
      "capital",
      [
        "apples",
        "hydro"
      ]
    ],
    [
      "srinagar",
      "Srinagar",
      "IN-JK",
      34.08,
      74.8,
      "capital",
      [
        "timber",
        "apples"
      ]
    ],
    [
      "bangalore",
      "Bangalore",
      "IN-KA",
      12.97,
      77.59,
      "capital",
      [
        "coffee",
        "iron"
      ]
    ],
    [
      "trivandrum",
      "Trivandrum",
      "IN-KL",
      8.52,
      76.94,
      "capital",
      [
        "fisheries",
        "port",
        "coffee"
      ]
    ],
    [
      "bhopal",
      "Bhopal",
      "IN-MP",
      23.26,
      77.41,
      "capital",
      [
        "wheat",
        "coal"
      ]
    ],
    [
      "bombay",
      "Bombay",
      "IN-MH",
      19.08,
      72.88,
      "capital",
      [
        "port",
        "cotton",
        "administration"
      ]
    ],
    [
      "imphal",
      "Imphal",
      "IN-MN",
      24.82,
      93.94,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "shillong",
      "Shillong",
      "IN-ML",
      25.57,
      91.88,
      "capital",
      [
        "coal",
        "timber"
      ]
    ],
    [
      "aizawl",
      "Aizawl",
      "IN-MZ",
      23.73,
      92.72,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "kohima",
      "Kohima",
      "IN-NL",
      25.67,
      94.11,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "bhubaneswar",
      "Bhubaneswar",
      "IN-OR",
      20.27,
      85.84,
      "capital",
      [
        "iron",
        "rice"
      ]
    ],
    [
      "amritsar",
      "Amritsar",
      "IN-PB",
      31.63,
      74.87,
      "capital",
      [
        "wheat",
        "cotton"
      ]
    ],
    [
      "jaipur",
      "Jaipur",
      "IN-RJ",
      26.91,
      75.79,
      "capital",
      [
        "wheat",
        "stone"
      ]
    ],
    [
      "gangtok",
      "Gangtok",
      "IN-SK",
      27.33,
      88.61,
      "capital",
      [
        "hydro",
        "coffee"
      ]
    ],
    [
      "madras",
      "Madras",
      "IN-TN",
      13.08,
      80.27,
      "capital",
      [
        "port",
        "cotton"
      ]
    ],
    [
      "agartala",
      "Agartala",
      "IN-TR",
      23.83,
      91.28,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "lucknow",
      "Lucknow",
      "IN-UP",
      26.85,
      80.95,
      "capital",
      [
        "wheat",
        "sugarcane"
      ]
    ],
    [
      "calcutta",
      "Calcutta",
      "IN-WB",
      22.57,
      88.36,
      "capital",
      [
        "port",
        "rice",
        "coal"
      ]
    ],
    [
      "port_blair",
      "Port Blair",
      "IN-AN",
      11.67,
      92.74,
      "capital",
      [
        "fisheries",
        "timber"
      ]
    ],
    [
      "chandigarh",
      "Chandigarh",
      "IN-CH",
      30.73,
      76.78,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "silvassa",
      "Silvassa",
      "IN-DN",
      20.27,
      73.02,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "daman",
      "Daman",
      "IN-DD",
      20.4,
      72.83,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "delhi",
      "Delhi",
      "IN-DL",
      28.61,
      77.21,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kavaratti",
      "Kavaratti",
      "IN-LD",
      10.57,
      72.64,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "pondicherry",
      "Pondicherry",
      "IN-PY",
      11.94,
      79.83,
      "capital",
      [
        "port",
        "rice"
      ]
    ],
    [
      "siliguri",
      "Siliguri",
      "IN-WB",
      26.73,
      88.44,
      "city",
      [
        "coffee",
        "timber"
      ]
    ],
    [
      "dhanbad",
      "Dhanbad",
      "IN-BR",
      23.8,
      86.43,
      "city",
      [
        "coal"
      ]
    ]
  ],
  "links": [
    [
      "port_blair",
      "madras",
      "sea",
      "Andaman Sea"
    ],
    [
      "kavaratti",
      "trivandrum",
      "sea",
      "Arabian Sea"
    ],
    [
      "silvassa",
      "daman",
      "road",
      "National road"
    ],
    [
      "shimla",
      "chandigarh",
      "road",
      "National road"
    ],
    [
      "guwahati",
      "shillong",
      "road",
      "National road"
    ],
    [
      "gangtok",
      "siliguri",
      "road",
      "National road"
    ],
    [
      "imphal",
      "kohima",
      "road",
      "National road"
    ],
    [
      "karnal",
      "chandigarh",
      "road",
      "National road"
    ],
    [
      "karnal",
      "delhi",
      "road",
      "National road"
    ],
    [
      "bombay",
      "silvassa",
      "road",
      "National road"
    ],
    [
      "madras",
      "pondicherry",
      "road",
      "National road"
    ],
    [
      "aizawl",
      "agartala",
      "road",
      "National road"
    ],
    [
      "itanagar",
      "kohima",
      "road",
      "National road"
    ],
    [
      "imphal",
      "aizawl",
      "road",
      "National road"
    ],
    [
      "shillong",
      "agartala",
      "road",
      "National road"
    ],
    [
      "amritsar",
      "chandigarh",
      "road",
      "National road"
    ],
    [
      "patna",
      "dhanbad",
      "road",
      "National road"
    ],
    [
      "jaipur",
      "delhi",
      "road",
      "National road"
    ],
    [
      "calcutta",
      "dhanbad",
      "road",
      "National road"
    ],
    [
      "srinagar",
      "amritsar",
      "road",
      "National road"
    ],
    [
      "bangalore",
      "pondicherry",
      "road",
      "National road"
    ],
    [
      "gandhinagar",
      "daman",
      "road",
      "National road"
    ],
    [
      "agartala",
      "calcutta",
      "road",
      "National road"
    ],
    [
      "guwahati",
      "gangtok",
      "road",
      "National road"
    ],
    [
      "bhubaneswar",
      "calcutta",
      "road",
      "National road"
    ],
    [
      "panaji",
      "bombay",
      "road",
      "National road"
    ],
    [
      "bhopal",
      "jaipur",
      "road",
      "National road"
    ],
    [
      "lucknow",
      "delhi",
      "road",
      "National road"
    ],
    [
      "patna",
      "lucknow",
      "road",
      "National road"
    ],
    [
      "trivandrum",
      "pondicherry",
      "road",
      "National road"
    ],
    [
      "hyderabad",
      "bangalore",
      "road",
      "National road"
    ],
    [
      "panaji",
      "bangalore",
      "road",
      "National road"
    ],
    [
      "gandhinagar",
      "bhopal",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "in_0",
    "name": "Vikram Iyer",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Indian Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional Prime Minister of India, posted at hyderabad (in_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "in.hyderabad"
  },
  {
    "id": "in_1",
    "name": "Rohit Nair",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Indian Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of India, posted at itanagar (in_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "in.itanagar"
  },
  {
    "id": "in_2",
    "name": "Sanjay Menon",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Indian Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of India, posted at guwahati (in_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "in.guwahati"
  },
  {
    "id": "in_3",
    "name": "Anil Reddy",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Indian Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of India, posted at patna (in_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "in.patna"
  },
  {
    "id": "in_4",
    "name": "Deepak Patel",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Indian Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of India, posted at panaji (in_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "in.panaji"
  },
  {
    "id": "in_5",
    "name": "Kiran Joshi",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Indian Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of India, posted at gandhinagar (in_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "in.gandhinagar"
  },
  {
    "id": "in_6",
    "name": "Nikhil Deshmukh",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Indian Army",
    "slot": "front_commander",
    "war": 76,
    "int": 47,
    "pol": 38,
    "chr": 38,
    "personality": "ambitious",
    "bio": "Fictional Front commander of India, posted at karnal (in_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "in.karnal"
  }
])
});

export const SRI_LANKA_REGION = land({
  "id": "lk",
  "name": "Sri Lanka",
  "country": "LK",
  "bbox": {
    "minLon": 79.1,
    "maxLon": 81.98,
    "minLat": 5.28,
    "maxLat": 10.41
  },
  "notes": "Atlas only. Nine provinces. The Northern and Eastern provinces are the civil-war front, with the Indian Peace Keeping Force marked from July 1987. Tea is mapped as coffee. The Palk Strait to Madras is a sea lane. The whole country stays dormant.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "LK-WE",
      "name": "Western",
      "kind": "province",
      "group": null
    },
    {
      "id": "LK-CE",
      "name": "Central",
      "kind": "province",
      "group": null
    },
    {
      "id": "LK-SO",
      "name": "Southern",
      "kind": "province",
      "group": null
    },
    {
      "id": "LK-NO",
      "name": "Northern",
      "kind": "province",
      "group": "Sri Lankan civil war / IPKF"
    },
    {
      "id": "LK-EA",
      "name": "Eastern",
      "kind": "province",
      "group": "Sri Lankan civil war / IPKF"
    },
    {
      "id": "LK-NW",
      "name": "North Western",
      "kind": "province",
      "group": null
    },
    {
      "id": "LK-NC",
      "name": "North Central",
      "kind": "province",
      "group": null
    },
    {
      "id": "LK-UV",
      "name": "Uva",
      "kind": "province",
      "group": null
    },
    {
      "id": "LK-SA",
      "name": "Sabaragamuwa",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "colombo",
      "Colombo",
      "LK-WE",
      6.93,
      79.85,
      "capital",
      [
        "port",
        "administration",
        "coffee"
      ]
    ],
    [
      "kandy",
      "Kandy",
      "LK-CE",
      7.29,
      80.63,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "galle",
      "Galle",
      "LK-SO",
      6.03,
      80.22,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "jaffna",
      "Jaffna",
      "LK-NO",
      9.66,
      80.01,
      "capital",
      [
        "fisheries",
        "rice"
      ]
    ],
    [
      "trincomalee",
      "Trincomalee",
      "LK-EA",
      8.59,
      81.23,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "kurunegala",
      "Kurunegala",
      "LK-NW",
      7.49,
      80.36,
      "capital",
      [
        "rice",
        "vegetables"
      ]
    ],
    [
      "anuradhapura",
      "Anuradhapura",
      "LK-NC",
      8.31,
      80.4,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "badulla",
      "Badulla",
      "LK-UV",
      6.99,
      81.06,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "ratnapura",
      "Ratnapura",
      "LK-SA",
      6.68,
      80.4,
      "capital",
      [
        "stone",
        "coffee"
      ]
    ]
  ],
  "links": [
    [
      "kandy",
      "kurunegala",
      "road",
      "National road"
    ],
    [
      "kandy",
      "badulla",
      "road",
      "National road"
    ],
    [
      "colombo",
      "ratnapura",
      "road",
      "National road"
    ],
    [
      "kandy",
      "ratnapura",
      "road",
      "National road"
    ],
    [
      "galle",
      "ratnapura",
      "road",
      "National road"
    ],
    [
      "kurunegala",
      "anuradhapura",
      "road",
      "National road"
    ],
    [
      "trincomalee",
      "anuradhapura",
      "road",
      "National road"
    ],
    [
      "jaffna",
      "anuradhapura",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "lk_0",
    "name": "Alden Perera",
    "title": "President",
    "rank": "President",
    "branch": "Sri Lanka Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Sri Lanka, posted at colombo (lk_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lk.colombo"
  },
  {
    "id": "lk_1",
    "name": "Bram Fernando",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Sri Lanka Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Sri Lanka, posted at kandy (lk_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lk.kandy"
  },
  {
    "id": "lk_2",
    "name": "Corin Silva",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Sri Lanka Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Sri Lanka, posted at galle (lk_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lk.galle"
  },
  {
    "id": "lk_3",
    "name": "Davin Gunasekara",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Sri Lanka Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Sri Lanka, posted at jaffna (lk_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lk.jaffna"
  },
  {
    "id": "lk_4",
    "name": "Elric Wijesinghe",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Sri Lanka Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Sri Lanka, posted at trincomalee (lk_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lk.trincomalee"
  }
])
});

export const BANGLADESH_REGION = land({
  "id": "bd",
  "name": "Bangladesh",
  "country": "BD",
  "bbox": {
    "minLon": 87.85,
    "maxLon": 92.53,
    "minLat": 21.61,
    "maxLat": 25.12
  },
  "notes": "Atlas only. Four divisions: Dhaka, Chittagong, Rajshahi, and Khulna. Barisal and Sylhet are 1993 and are not split. Jute is mapped as cotton. Benapole and Akhaura are the Indian roads. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "BD-DH",
      "name": "Dhaka",
      "kind": "division",
      "group": null
    },
    {
      "id": "BD-CG",
      "name": "Chittagong",
      "kind": "division",
      "group": null
    },
    {
      "id": "BD-RJ",
      "name": "Rajshahi",
      "kind": "division",
      "group": null
    },
    {
      "id": "BD-KH",
      "name": "Khulna",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "dhaka",
      "Dhaka",
      "BD-DH",
      23.81,
      90.41,
      "capital",
      [
        "rice",
        "cotton",
        "administration"
      ]
    ],
    [
      "chittagong",
      "Chittagong",
      "BD-CG",
      22.36,
      91.78,
      "capital",
      [
        "port",
        "natural_gas"
      ]
    ],
    [
      "rajshahi",
      "Rajshahi",
      "BD-RJ",
      24.37,
      88.6,
      "capital",
      [
        "rice",
        "wheat"
      ]
    ],
    [
      "khulna",
      "Khulna",
      "BD-KH",
      22.85,
      89.54,
      "capital",
      [
        "rice",
        "fisheries",
        "port"
      ]
    ]
  ],
  "links": [
    [
      "dhaka",
      "khulna",
      "road",
      "National road"
    ],
    [
      "rajshahi",
      "khulna",
      "road",
      "National road"
    ],
    [
      "dhaka",
      "chittagong",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "bd_0",
    "name": "Alden Chowdhury",
    "title": "President",
    "rank": "President",
    "branch": "Bangladesh Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Bangladesh, posted at dhaka (bd_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bd.dhaka"
  },
  {
    "id": "bd_1",
    "name": "Bram Ahmed",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Bangladesh Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Bangladesh, posted at chittagong (bd_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bd.chittagong"
  },
  {
    "id": "bd_2",
    "name": "Corin Hossain",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Bangladesh Army",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional Field officer of Bangladesh, posted at rajshahi (bd_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bd.rajshahi"
  }
])
});

export const NEPAL_REGION = land({
  "id": "np",
  "name": "Nepal",
  "country": "NP",
  "bbox": {
    "minLon": 79.43,
    "maxLon": 88.68,
    "minLat": 25.7,
    "maxLat": 30.02
  },
  "notes": "Atlas only. Fourteen anchal, the zone map of the 1980s, not the later provinces. Kathmandu meets Lhasa on the Araniko road. Birgunj meets Patna at Raxaul. Hydro, timber, and rice. Occupied and off the week-0 march.",
  "defaultBiome": "alpine",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "NP-ME",
      "name": "Mechi",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-KO",
      "name": "Koshi",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-SA",
      "name": "Sagarmatha",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-JA",
      "name": "Janakpur",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-BA",
      "name": "Bagmati",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-NA",
      "name": "Narayani",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-GA",
      "name": "Gandaki",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-LU",
      "name": "Lumbini",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-DH",
      "name": "Dhaulagiri",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-RA",
      "name": "Rapti",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-KA",
      "name": "Karnali",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-BH",
      "name": "Bheri",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-SE",
      "name": "Seti",
      "kind": "zone",
      "group": null
    },
    {
      "id": "NP-MA",
      "name": "Mahakali",
      "kind": "zone",
      "group": null
    }
  ],
  "cities": [
    [
      "ilam",
      "Ilam",
      "NP-ME",
      26.91,
      87.93,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "biratnagar",
      "Biratnagar",
      "NP-KO",
      26.45,
      87.27,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "rajbiraj",
      "Rajbiraj",
      "NP-SA",
      26.54,
      86.75,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "janakpur",
      "Janakpur",
      "NP-JA",
      26.73,
      85.92,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "kathmandu",
      "Kathmandu",
      "NP-BA",
      27.72,
      85.32,
      "capital",
      [
        "administration",
        "hydro"
      ]
    ],
    [
      "birgunj",
      "Birgunj",
      "NP-NA",
      27.0,
      84.87,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "pokhara",
      "Pokhara",
      "NP-GA",
      28.21,
      83.99,
      "capital",
      [
        "hydro",
        "timber"
      ]
    ],
    [
      "butwal",
      "Butwal",
      "NP-LU",
      27.7,
      83.45,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "baglung",
      "Baglung",
      "NP-DH",
      28.27,
      83.59,
      "capital",
      [
        "hydro",
        "timber"
      ]
    ],
    [
      "tulsipur",
      "Tulsipur",
      "NP-RA",
      28.13,
      82.3,
      "capital",
      [
        "hydro",
        "timber"
      ]
    ],
    [
      "jumla",
      "Jumla",
      "NP-KA",
      29.27,
      82.18,
      "capital",
      [
        "hydro",
        "timber"
      ]
    ],
    [
      "nepalgunj",
      "Nepalgunj",
      "NP-BH",
      28.05,
      81.62,
      "capital",
      [
        "hydro",
        "timber"
      ]
    ],
    [
      "dhangadhi",
      "Dhangadhi",
      "NP-SE",
      28.69,
      80.59,
      "capital",
      [
        "hydro",
        "timber"
      ]
    ],
    [
      "mahendranagar",
      "Mahendranagar",
      "NP-MA",
      28.96,
      80.18,
      "capital",
      [
        "hydro",
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "pokhara",
      "baglung",
      "road",
      "National road"
    ],
    [
      "dhangadhi",
      "mahendranagar",
      "road",
      "National road"
    ],
    [
      "biratnagar",
      "rajbiraj",
      "road",
      "National road"
    ],
    [
      "butwal",
      "baglung",
      "road",
      "National road"
    ],
    [
      "tulsipur",
      "nepalgunj",
      "road",
      "National road"
    ],
    [
      "ilam",
      "biratnagar",
      "road",
      "National road"
    ],
    [
      "kathmandu",
      "birgunj",
      "road",
      "National road"
    ],
    [
      "rajbiraj",
      "janakpur",
      "road",
      "National road"
    ],
    [
      "janakpur",
      "birgunj",
      "road",
      "National road"
    ],
    [
      "tulsipur",
      "jumla",
      "road",
      "National road"
    ],
    [
      "nepalgunj",
      "dhangadhi",
      "road",
      "National road"
    ],
    [
      "butwal",
      "tulsipur",
      "road",
      "National road"
    ],
    [
      "kathmandu",
      "pokhara",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "np_0",
    "name": "Alden Thapa",
    "title": "King",
    "rank": "King",
    "branch": "Royal Nepalese Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional King of Nepal, posted at ilam (np_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "np.ilam"
  },
  {
    "id": "np_1",
    "name": "Bram Basnet",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Royal Nepalese Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Nepal, posted at biratnagar (np_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "np.biratnagar"
  },
  {
    "id": "np_2",
    "name": "Corin Adhikari",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Royal Nepalese Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Nepal, posted at rajbiraj (np_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "np.rajbiraj"
  },
  {
    "id": "np_3",
    "name": "Davin Gurung",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Royal Nepalese Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Nepal, posted at janakpur (np_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "np.janakpur"
  },
  {
    "id": "np_4",
    "name": "Elric Magar",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Royal Nepalese Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Nepal, posted at kathmandu (np_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "np.kathmandu"
  }
])
});

export const BHUTAN_REGION = land({
  "id": "bt",
  "name": "Bhutan",
  "country": "BT",
  "bbox": {
    "minLon": 88.35,
    "maxLon": 92.3,
    "minLat": 26.05,
    "maxLat": 28.42
  },
  "notes": "Atlas only. Eighteen dzongkhags. Gasa and Trashiyangtse are 1992 and are not drawn. Phuentsholing meets Siliguri at Jaigaon. Hydro, timber, and rice. Occupied and off the week-0 march.",
  "defaultBiome": "alpine",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "BT-BU",
      "name": "Bumthang",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-CK",
      "name": "Chhukha",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-DA",
      "name": "Dagana",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-PU",
      "name": "Punakha",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-TH",
      "name": "Thimphu",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-TG",
      "name": "Trashigang",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-MO",
      "name": "Mongar",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-PR",
      "name": "Paro",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-SJ",
      "name": "Samdrup Jongkhar",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-SM",
      "name": "Samtse",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-SP",
      "name": "Sarpang",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-TS",
      "name": "Tsirang",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-WP",
      "name": "Wangdue Phodrang",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-ZH",
      "name": "Zhemgang",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-LH",
      "name": "Lhuntse",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-PE",
      "name": "Pemagatshel",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-TR",
      "name": "Trongsa",
      "kind": "dzongkhag",
      "group": null
    },
    {
      "id": "BT-HA",
      "name": "Haa",
      "kind": "dzongkhag",
      "group": null
    }
  ],
  "cities": [
    [
      "jakar",
      "Jakar",
      "BT-BU",
      27.55,
      90.73,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "phuentsholing",
      "Phuentsholing",
      "BT-CK",
      26.86,
      89.39,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "dagana",
      "Dagana",
      "BT-DA",
      27.1,
      89.88,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "punakha",
      "Punakha",
      "BT-PU",
      27.59,
      89.86,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "thimphu",
      "Thimphu",
      "BT-TH",
      27.47,
      89.64,
      "capital",
      [
        "administration",
        "hydro"
      ]
    ],
    [
      "trashigang",
      "Trashigang",
      "BT-TG",
      27.33,
      91.55,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "mongar",
      "Mongar",
      "BT-MO",
      27.28,
      91.24,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "paro",
      "Paro",
      "BT-PR",
      27.43,
      89.41,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "samdrup_jongkhar",
      "Samdrup Jongkhar",
      "BT-SJ",
      26.8,
      91.51,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "samtse",
      "Samtse",
      "BT-SM",
      26.9,
      89.1,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "sarpang",
      "Sarpang",
      "BT-SP",
      26.87,
      90.27,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "damphu",
      "Damphu",
      "BT-TS",
      27.0,
      90.12,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "wangdue",
      "Wangdue",
      "BT-WP",
      27.49,
      89.9,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "zhemgang",
      "Zhemgang",
      "BT-ZH",
      27.22,
      90.66,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "lhuntse",
      "Lhuntse",
      "BT-LH",
      27.67,
      91.18,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "pemagatshel",
      "Pemagatshel",
      "BT-PE",
      27.04,
      91.4,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "trongsa",
      "Trongsa",
      "BT-TR",
      27.5,
      90.51,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ],
    [
      "haa",
      "Haa",
      "BT-HA",
      27.37,
      89.29,
      "capital",
      [
        "hydro",
        "timber",
        "rice"
      ]
    ]
  ],
  "links": [
    [
      "punakha",
      "wangdue",
      "road",
      "National road"
    ],
    [
      "paro",
      "haa",
      "road",
      "National road"
    ],
    [
      "sarpang",
      "damphu",
      "road",
      "National road"
    ],
    [
      "jakar",
      "trongsa",
      "road",
      "National road"
    ],
    [
      "thimphu",
      "paro",
      "road",
      "National road"
    ],
    [
      "punakha",
      "thimphu",
      "road",
      "National road"
    ],
    [
      "dagana",
      "damphu",
      "road",
      "National road"
    ],
    [
      "samdrup_jongkhar",
      "pemagatshel",
      "road",
      "National road"
    ],
    [
      "mongar",
      "pemagatshel",
      "road",
      "National road"
    ],
    [
      "phuentsholing",
      "samtse",
      "road",
      "National road"
    ],
    [
      "trashigang",
      "mongar",
      "road",
      "National road"
    ],
    [
      "zhemgang",
      "trongsa",
      "road",
      "National road"
    ],
    [
      "dagana",
      "wangdue",
      "road",
      "National road"
    ],
    [
      "mongar",
      "lhuntse",
      "road",
      "National road"
    ],
    [
      "jakar",
      "lhuntse",
      "road",
      "National road"
    ],
    [
      "samtse",
      "haa",
      "road",
      "National road"
    ],
    [
      "sarpang",
      "zhemgang",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "bt_0",
    "name": "Alden Lhendup",
    "title": "King",
    "rank": "King",
    "branch": "Royal Bhutan Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional King of Bhutan, posted at jakar (bt_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bt.jakar"
  },
  {
    "id": "bt_1",
    "name": "Bram Kezang",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Royal Bhutan Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Bhutan, posted at phuentsholing (bt_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bt.phuentsholing"
  },
  {
    "id": "bt_2",
    "name": "Corin Norbu",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Royal Bhutan Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Bhutan, posted at dagana (bt_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bt.dagana"
  },
  {
    "id": "bt_3",
    "name": "Davin Gyeltshen",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Royal Bhutan Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Bhutan, posted at punakha (bt_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bt.punakha"
  },
  {
    "id": "bt_4",
    "name": "Elric Chophel",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Royal Bhutan Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Bhutan, posted at thimphu (bt_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bt.thimphu"
  },
  {
    "id": "bt_5",
    "name": "Fenn Dendup",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Royal Bhutan Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Bhutan, posted at trashigang (bt_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bt.trashigang"
  }
])
});

export const MALDIVES_REGION = land({
  "id": "mv",
  "name": "Maldives",
  "country": "MV",
  "bbox": {
    "minLon": 72.14,
    "maxLon": 74.33,
    "minLat": -1.35,
    "maxLat": 7.64
  },
  "notes": "Atlas only. Twenty administrative atolls, each reached by sea. Fisheries. Male meets Colombo by sea. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "MV-HA",
      "name": "Haa Alif",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-HD",
      "name": "Haa Dhaalu",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-SH",
      "name": "Shaviyani",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-NO",
      "name": "Noonu",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-RA",
      "name": "Raa",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-LH",
      "name": "Lhaviyani",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-BA",
      "name": "Baa",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-AA",
      "name": "Alif Alif",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-KA",
      "name": "Kaafu",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-AD",
      "name": "Alif Dhaal",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-VA",
      "name": "Vaavu",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-FA",
      "name": "Faafu",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-ME",
      "name": "Meemu",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-DH",
      "name": "Dhaalu",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-TH",
      "name": "Thaa",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-LA",
      "name": "Laamu",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-GA",
      "name": "Gaafu Alif",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-GD",
      "name": "Gaafu Dhaalu",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-GN",
      "name": "Gnaviyani",
      "kind": "atoll",
      "group": null
    },
    {
      "id": "MV-SE",
      "name": "Seenu",
      "kind": "atoll",
      "group": null
    }
  ],
  "cities": [
    [
      "dhidhdhoo",
      "Dhidhdhoo",
      "MV-HA",
      6.89,
      73.11,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "kulhudhuffushi",
      "Kulhudhuffushi",
      "MV-HD",
      6.62,
      73.07,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "funadhoo",
      "Funadhoo",
      "MV-SH",
      6.15,
      73.29,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "manadhoo",
      "Manadhoo",
      "MV-NO",
      5.77,
      73.41,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ungoofaaru",
      "Ungoofaaru",
      "MV-RA",
      5.67,
      73.03,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "naifaru",
      "Naifaru",
      "MV-LH",
      5.44,
      73.37,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "eydhafushi",
      "Eydhafushi",
      "MV-BA",
      5.1,
      73.07,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "rasdhoo",
      "Rasdhoo",
      "MV-AA",
      4.26,
      72.99,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "male",
      "Male",
      "MV-KA",
      4.18,
      73.51,
      "capital",
      [
        "administration",
        "fisheries",
        "port"
      ]
    ],
    [
      "mahibadhoo",
      "Mahibadhoo",
      "MV-AD",
      3.76,
      72.97,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "felidhoo",
      "Felidhoo",
      "MV-VA",
      3.47,
      73.55,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "nilandhoo",
      "Nilandhoo",
      "MV-FA",
      3.06,
      72.89,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "muli",
      "Muli",
      "MV-ME",
      2.92,
      73.58,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "kudahuvadhoo",
      "Kudahuvadhoo",
      "MV-DH",
      2.67,
      72.89,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "veymandoo",
      "Veymandoo",
      "MV-TH",
      2.19,
      73.1,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "fonadhoo",
      "Fonadhoo",
      "MV-LA",
      1.83,
      73.5,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "vilingili",
      "Vilingili",
      "MV-GA",
      0.76,
      73.43,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "thinadhoo",
      "Thinadhoo",
      "MV-GD",
      0.53,
      73.0,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "fuvahmulah",
      "Fuvahmulah",
      "MV-GN",
      -0.3,
      73.42,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "hithadhoo",
      "Hithadhoo",
      "MV-SE",
      -0.6,
      73.08,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "dhidhdhoo",
      "kulhudhuffushi",
      "sea",
      "Maldivian channel"
    ],
    [
      "kulhudhuffushi",
      "funadhoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "funadhoo",
      "manadhoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "manadhoo",
      "ungoofaaru",
      "sea",
      "Maldivian channel"
    ],
    [
      "ungoofaaru",
      "naifaru",
      "sea",
      "Maldivian channel"
    ],
    [
      "naifaru",
      "eydhafushi",
      "sea",
      "Maldivian channel"
    ],
    [
      "eydhafushi",
      "rasdhoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "rasdhoo",
      "male",
      "sea",
      "Maldivian channel"
    ],
    [
      "male",
      "mahibadhoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "mahibadhoo",
      "felidhoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "felidhoo",
      "nilandhoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "nilandhoo",
      "muli",
      "sea",
      "Maldivian channel"
    ],
    [
      "muli",
      "kudahuvadhoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "kudahuvadhoo",
      "veymandoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "veymandoo",
      "fonadhoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "fonadhoo",
      "vilingili",
      "sea",
      "Maldivian channel"
    ],
    [
      "vilingili",
      "thinadhoo",
      "sea",
      "Maldivian channel"
    ],
    [
      "thinadhoo",
      "fuvahmulah",
      "sea",
      "Maldivian channel"
    ],
    [
      "fuvahmulah",
      "hithadhoo",
      "sea",
      "Maldivian channel"
    ]
  ],
  "officers": staff([
  {
    "id": "mv_0",
    "name": "Alden Waheed",
    "title": "Head of state",
    "rank": "Colonel",
    "branch": "National Security Service",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional Head of state of Maldives, posted at dhidhdhoo (mv_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mv.dhidhdhoo"
  },
  {
    "id": "mv_1",
    "name": "Bram Nasir",
    "title": "Defense minister",
    "rank": "Lieutenant Colonel",
    "branch": "National Security Service",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Maldives, posted at kulhudhuffushi (mv_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mv.kulhudhuffushi"
  },
  {
    "id": "mv_2",
    "name": "Corin Rasheed",
    "title": "Chief of staff",
    "rank": "Major",
    "branch": "National Security Service",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Maldives, posted at funadhoo (mv_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mv.funadhoo"
  },
  {
    "id": "mv_3",
    "name": "Davin Hameed",
    "title": "Front commander",
    "rank": "Major",
    "branch": "National Security Service",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Maldives, posted at manadhoo (mv_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mv.manadhoo"
  },
  {
    "id": "mv_4",
    "name": "Elric Shihab",
    "title": "Field officer",
    "rank": "Captain",
    "branch": "National Security Service",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Maldives, posted at ungoofaaru (mv_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mv.ungoofaaru"
  },
  {
    "id": "mv_5",
    "name": "Fenn Jameel",
    "title": "Front commander",
    "rank": "Major",
    "branch": "National Security Service",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Maldives, posted at naifaru (mv_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mv.naifaru"
  }
])
});
