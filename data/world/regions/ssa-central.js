/** Central Africa, 1985-89. Zaire keeps that name. */
import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const NIGERIA_REGION = land({
  "id": "ng",
  "name": "Nigeria",
  "country": "NG",
  "bbox": {
    "minLon": 2.6,
    "maxLon": 13.91,
    "minLat": 4.07,
    "maxLat": 13.81
  },
  "notes": "Atlas only. Nineteen states of 1976, the Federal Capital Territory, and Akwa Ibom and Katsina from 23 September 1987. Lagos remains the national capital until 1991. Bendel, Gongola, and the old Anambra and Imo stay. Delta, Ebonyi, and Zamfara are not states yet. Oil is the delta and the southeast coast. Tin is the Jos plateau. Occupied and off the week-0 march.",
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
      "id": "NG-AN",
      "name": "Anambra",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-BA",
      "name": "Bauchi",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-BD",
      "name": "Bendel",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-BE",
      "name": "Benue",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-BO",
      "name": "Borno",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-CR",
      "name": "Cross River",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-GO",
      "name": "Gongola",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-IM",
      "name": "Imo",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-KD",
      "name": "Kaduna",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-KN",
      "name": "Kano",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-KW",
      "name": "Kwara",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-LA",
      "name": "Lagos",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-NI",
      "name": "Niger",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-OG",
      "name": "Ogun",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-ON",
      "name": "Ondo",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-OY",
      "name": "Oyo",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-PL",
      "name": "Plateau",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-RI",
      "name": "Rivers",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-SO",
      "name": "Sokoto",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-FC",
      "name": "Federal Capital Territory",
      "kind": "capital_territory",
      "group": null
    },
    {
      "id": "NG-AK",
      "name": "Akwa Ibom",
      "kind": "state",
      "group": null
    },
    {
      "id": "NG-KT",
      "name": "Katsina",
      "kind": "state",
      "group": null
    }
  ],
  "cities": [
    [
      "enugu",
      "Enugu",
      "NG-AN",
      6.44,
      7.51,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "onitsha",
      "Onitsha",
      "NG-AN",
      6.15,
      6.79,
      "city",
      [
        "administration"
      ]
    ],
    [
      "bauchi",
      "Bauchi",
      "NG-BA",
      10.31,
      9.84,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "benin",
      "Benin City",
      "NG-BD",
      6.34,
      5.63,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "warri",
      "Warri",
      "NG-BD",
      5.52,
      5.75,
      "city",
      [
        "oil",
        "port"
      ]
    ],
    [
      "makurdi",
      "Makurdi",
      "NG-BE",
      7.73,
      8.54,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "maiduguri",
      "Maiduguri",
      "NG-BO",
      11.85,
      13.16,
      "capital",
      [
        "cattle",
        "sorghum"
      ]
    ],
    [
      "calabar",
      "Calabar",
      "NG-CR",
      4.98,
      8.33,
      "capital",
      [
        "port",
        "oil"
      ]
    ],
    [
      "yola",
      "Yola",
      "NG-GO",
      9.2,
      12.48,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "owerri",
      "Owerri",
      "NG-IM",
      5.48,
      7.03,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "kaduna",
      "Kaduna",
      "NG-KD",
      10.52,
      7.44,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "kano",
      "Kano",
      "NG-KN",
      12.0,
      8.52,
      "capital",
      [
        "peanuts",
        "cotton"
      ]
    ],
    [
      "ilorin",
      "Ilorin",
      "NG-KW",
      8.5,
      4.55,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "lagos",
      "Lagos",
      "NG-LA",
      6.45,
      3.4,
      "capital",
      [
        "administration",
        "port",
        "oil"
      ]
    ],
    [
      "minna",
      "Minna",
      "NG-NI",
      9.61,
      6.56,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "abeokuta",
      "Abeokuta",
      "NG-OG",
      7.16,
      3.35,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "akure",
      "Akure",
      "NG-ON",
      7.25,
      5.19,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "ibadan",
      "Ibadan",
      "NG-OY",
      7.38,
      3.9,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "jos",
      "Jos",
      "NG-PL",
      9.93,
      8.89,
      "capital",
      [
        "tin"
      ]
    ],
    [
      "port_harcourt",
      "Port Harcourt",
      "NG-RI",
      4.82,
      7.0,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "sokoto",
      "Sokoto",
      "NG-SO",
      13.06,
      5.24,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "abuja",
      "Abuja",
      "NG-FC",
      9.06,
      7.49,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "uyo",
      "Uyo",
      "NG-AK",
      5.05,
      7.93,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "katsina",
      "Katsina",
      "NG-KT",
      12.99,
      7.6,
      "capital",
      [
        "cotton"
      ]
    ]
  ],
  "links": [
    [
      "calabar",
      "uyo",
      "road",
      "national road"
    ],
    [
      "abeokuta",
      "ibadan",
      "road",
      "national road"
    ],
    [
      "owerri",
      "port_harcourt",
      "road",
      "national road"
    ],
    [
      "onitsha",
      "owerri",
      "road",
      "national road"
    ],
    [
      "lagos",
      "abeokuta",
      "road",
      "national road"
    ],
    [
      "enugu",
      "onitsha",
      "road",
      "national road"
    ],
    [
      "benin",
      "warri",
      "road",
      "national road"
    ],
    [
      "port_harcourt",
      "uyo",
      "road",
      "national road"
    ],
    [
      "benin",
      "akure",
      "road",
      "national road"
    ],
    [
      "bauchi",
      "jos",
      "road",
      "national road"
    ],
    [
      "minna",
      "abuja",
      "road",
      "national road"
    ],
    [
      "onitsha",
      "benin",
      "road",
      "national road"
    ],
    [
      "kaduna",
      "minna",
      "road",
      "national road"
    ],
    [
      "ilorin",
      "ibadan",
      "road",
      "national road"
    ],
    [
      "akure",
      "ibadan",
      "road",
      "national road"
    ],
    [
      "kano",
      "katsina",
      "road",
      "national road"
    ],
    [
      "jos",
      "kaduna",
      "road",
      "national road"
    ],
    [
      "enugu",
      "makurdi",
      "road",
      "national road"
    ],
    [
      "makurdi",
      "abuja",
      "road",
      "national road"
    ],
    [
      "kaduna",
      "kano",
      "road",
      "national road"
    ],
    [
      "katsina",
      "sokoto",
      "road",
      "national road"
    ],
    [
      "maiduguri",
      "yola",
      "road",
      "national road"
    ],
    [
      "bauchi",
      "yola",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "ng_0",
    "name": "Chinedu Okonkwo",
    "title": "President",
    "rank": "President",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional President of Nigeria, posted at lagos (ng_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ng.lagos"
  },
  {
    "id": "ng_1",
    "name": "Amina Bello",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Nigeria, posted at abeokuta (ng_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ng.abeokuta"
  },
  {
    "id": "ng_2",
    "name": "Ngozi Adeyemi",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Nigeria, posted at abuja (ng_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ng.abuja"
  },
  {
    "id": "ng_3",
    "name": "Ibrahim Danjuma",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Nigeria, posted at akure (ng_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ng.akure"
  },
  {
    "id": "ng_4",
    "name": "Funmilayo Nwosu",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Nigeria, posted at bauchi (ng_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ng.bauchi"
  },
  {
    "id": "ng_5",
    "name": "Yusuf Abdullahi",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional Front commander of Nigeria, posted at benin (ng_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ng.benin"
  }
])
});

export const CAMEROON_REGION = land({
  "id": "cm",
  "name": "Cameroon",
  "country": "CM",
  "bbox": {
    "minLon": 8.48,
    "maxLon": 15.07,
    "minLat": 2.17,
    "maxLat": 11.34
  },
  "notes": "Atlas only. Ten provinces since the 1983 split that created Adamawa and Extreme North. Oil is the coast. Not every department is drawn. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "CM-AD",
      "name": "Adamawa",
      "kind": "province",
      "group": null
    },
    {
      "id": "CM-CE",
      "name": "Centre",
      "kind": "province",
      "group": null
    },
    {
      "id": "CM-ES",
      "name": "East",
      "kind": "province",
      "group": null
    },
    {
      "id": "CM-EN",
      "name": "Extreme North",
      "kind": "province",
      "group": null
    },
    {
      "id": "CM-LT",
      "name": "Littoral",
      "kind": "province",
      "group": null
    },
    {
      "id": "CM-NO",
      "name": "North",
      "kind": "province",
      "group": null
    },
    {
      "id": "CM-NW",
      "name": "Northwest",
      "kind": "province",
      "group": null
    },
    {
      "id": "CM-OU",
      "name": "West",
      "kind": "province",
      "group": null
    },
    {
      "id": "CM-SU",
      "name": "South",
      "kind": "province",
      "group": null
    },
    {
      "id": "CM-SW",
      "name": "Southwest",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "ngaoundere",
      "Ngaoundere",
      "CM-AD",
      7.32,
      13.58,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "yaounde",
      "Yaounde",
      "CM-CE",
      3.87,
      11.52,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bertoua",
      "Bertoua",
      "CM-ES",
      4.58,
      13.68,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "maroua",
      "Maroua",
      "CM-EN",
      10.59,
      14.32,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "douala",
      "Douala",
      "CM-LT",
      4.05,
      9.7,
      "capital",
      [
        "port",
        "oil"
      ]
    ],
    [
      "garoua",
      "Garoua",
      "CM-NO",
      9.3,
      13.4,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "bamenda",
      "Bamenda",
      "CM-NW",
      5.96,
      10.15,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "bafoussam",
      "Bafoussam",
      "CM-OU",
      5.48,
      10.42,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "ebolowa",
      "Ebolowa",
      "CM-SU",
      2.92,
      11.15,
      "capital",
      [
        "cocoa",
        "timber"
      ]
    ],
    [
      "buea",
      "Buea",
      "CM-SW",
      4.15,
      9.23,
      "capital",
      [
        "oil"
      ]
    ]
  ],
  "links": [
    [
      "douala",
      "buea",
      "road",
      "national road"
    ],
    [
      "bamenda",
      "bafoussam",
      "road",
      "national road"
    ],
    [
      "yaounde",
      "ebolowa",
      "road",
      "national road"
    ],
    [
      "maroua",
      "garoua",
      "road",
      "national road"
    ],
    [
      "douala",
      "bafoussam",
      "road",
      "national road"
    ],
    [
      "yaounde",
      "douala",
      "road",
      "national road"
    ],
    [
      "ngaoundere",
      "garoua",
      "road",
      "national road"
    ],
    [
      "yaounde",
      "bertoua",
      "road",
      "national road"
    ],
    [
      "ngaoundere",
      "bertoua",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "cm_0",
    "name": "Marie Essomba",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Cameroon, posted at yaounde (cm_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cm.yaounde"
  },
  {
    "id": "cm_1",
    "name": "Jean Mbarga",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Cameroon, posted at bafoussam (cm_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cm.bafoussam"
  },
  {
    "id": "cm_2",
    "name": "Claire Ngo",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Cameroon, posted at bamenda (cm_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cm.bamenda"
  },
  {
    "id": "cm_3",
    "name": "Paul Atangana",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Cameroon, posted at bertoua (cm_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cm.bertoua"
  },
  {
    "id": "cm_4",
    "name": "Esther Foning",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Cameroon, posted at buea (cm_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cm.buea"
  }
])
});

export const CHAD_REGION = land({
  "id": "td",
  "name": "Chad",
  "country": "TD",
  "bbox": {
    "minLon": 13.96,
    "maxLon": 21.67,
    "minLat": 7.82,
    "maxLat": 18.68
  },
  "notes": "Atlas only. Fourteen prefectures. Borkou-Ennedi-Tibesti stays one prefecture, seated at Faya-Largeau. The Aouzou strip is a trail from Murzuq, disputed until 1987, not an open highway. Cotton is the south. There is no Doba oil yet. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 5,
      "weather": 1
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "TD-BA",
      "name": "Batha",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-BI",
      "name": "Biltine",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-BET",
      "name": "Borkou-Ennedi-Tibesti",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-CB",
      "name": "Chari-Baguirmi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-GU",
      "name": "Guera",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-KA",
      "name": "Kanem",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-LC",
      "name": "Lac",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-LO",
      "name": "Logone Occidental",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-LR",
      "name": "Logone Oriental",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-MK",
      "name": "Mayo-Kebbi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-MC",
      "name": "Moyen-Chari",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-OU",
      "name": "Ouaddai",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-SA",
      "name": "Salamat",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "TD-TJ",
      "name": "Tandjile",
      "kind": "prefecture",
      "group": null
    }
  ],
  "cities": [
    [
      "ati",
      "Ati",
      "TD-BA",
      13.21,
      18.34,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "biltine",
      "Biltine",
      "TD-BI",
      14.53,
      20.92,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "faya",
      "Faya-Largeau",
      "TD-BET",
      17.93,
      19.1,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ndjamena",
      "N'Djamena",
      "TD-CB",
      12.11,
      15.04,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mongo",
      "Mongo",
      "TD-GU",
      12.18,
      18.69,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "mao",
      "Mao",
      "TD-KA",
      14.12,
      15.31,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "bol",
      "Bol",
      "TD-LC",
      13.46,
      14.71,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "moundou",
      "Moundou",
      "TD-LO",
      8.57,
      16.08,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "doba",
      "Doba",
      "TD-LR",
      8.66,
      16.85,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "bongor",
      "Bongor",
      "TD-MK",
      10.28,
      15.37,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "sarh",
      "Sarh",
      "TD-MC",
      9.14,
      18.39,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "abeche",
      "Abeche",
      "TD-OU",
      13.83,
      20.83,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "am_timan",
      "Am Timan",
      "TD-SA",
      11.04,
      20.28,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "lai",
      "Lai",
      "TD-TJ",
      9.4,
      16.3,
      "capital",
      [
        "cotton"
      ]
    ]
  ],
  "links": [
    [
      "biltine",
      "abeche",
      "road",
      "national road"
    ],
    [
      "moundou",
      "doba",
      "road",
      "national road"
    ],
    [
      "moundou",
      "lai",
      "road",
      "national road"
    ],
    [
      "mao",
      "bol",
      "road",
      "national road"
    ],
    [
      "ati",
      "mongo",
      "road",
      "national road"
    ],
    [
      "lai",
      "bongor",
      "road",
      "national road"
    ],
    [
      "ndjamena",
      "bol",
      "road",
      "national road"
    ],
    [
      "doba",
      "sarh",
      "road",
      "national road"
    ],
    [
      "ndjamena",
      "bongor",
      "road",
      "national road"
    ],
    [
      "mongo",
      "am_timan",
      "road",
      "national road"
    ],
    [
      "ati",
      "abeche",
      "road",
      "national road"
    ],
    [
      "am_timan",
      "sarh",
      "road",
      "national road"
    ],
    [
      "biltine",
      "faya",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "td_0",
    "name": "Ache Mahamat",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Chad, posted at ndjamena (td_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "td.ndjamena"
  },
  {
    "id": "td_1",
    "name": "Fatime Hassan",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Chad, posted at abeche (td_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "td.abeche"
  },
  {
    "id": "td_2",
    "name": "Hissein Abakar",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Chad, posted at am timan (td_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "td.am_timan"
  },
  {
    "id": "td_3",
    "name": "Khadija Youssouf",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Chad, posted at ati (td_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "td.ati"
  },
  {
    "id": "td_4",
    "name": "Oumar Adoum",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Chad, posted at biltine (td_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "td.biltine"
  }
])
});

export const CENTRAL_AFRICAN_REGION = land({
  "id": "cf",
  "name": "Central African Republic",
  "country": "CF",
  "bbox": {
    "minLon": 14.85,
    "maxLon": 27.24,
    "minLat": 2.78,
    "maxLat": 11.03
  },
  "notes": "Atlas only. Sixteen prefectures plus the Bangui commune. Diamonds are the southwest. Not every sub-prefecture is drawn. Occupied and off the week-0 march.",
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
      "id": "CF-BG",
      "name": "Bangui",
      "kind": "commune",
      "group": null
    },
    {
      "id": "CF-BB",
      "name": "Bamingui-Bangoran",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-BK",
      "name": "Basse-Kotto",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-HK",
      "name": "Haute-Kotto",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-HM",
      "name": "Haut-Mbomou",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-KG",
      "name": "Kemo",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-LB",
      "name": "Lobaye",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-MK",
      "name": "Mambere-Kadei",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-MB",
      "name": "Mbomou",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-NG",
      "name": "Nana-Grebizi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-NM",
      "name": "Nana-Mambere",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-MP",
      "name": "Ombella-Mpoko",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-UK",
      "name": "Ouaka",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-UH",
      "name": "Ouham",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-UP",
      "name": "Ouham-Pende",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-SG",
      "name": "Sangha-Mbaere",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "CF-VK",
      "name": "Vakaga",
      "kind": "prefecture",
      "group": null
    }
  ],
  "cities": [
    [
      "bangui",
      "Bangui",
      "CF-BG",
      4.36,
      18.56,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "ndele",
      "Ndele",
      "CF-BB",
      8.41,
      20.65,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "mobaye",
      "Mobaye",
      "CF-BK",
      4.32,
      21.18,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "bria",
      "Bria",
      "CF-HK",
      6.54,
      21.99,
      "capital",
      [
        "diamonds"
      ]
    ],
    [
      "obo",
      "Obo",
      "CF-HM",
      5.4,
      26.49,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "sibut",
      "Sibut",
      "CF-KG",
      5.74,
      19.08,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "mbaiki",
      "Mbaiki",
      "CF-LB",
      3.89,
      18.0,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "berberati",
      "Berberati",
      "CF-MK",
      4.26,
      15.79,
      "capital",
      [
        "diamonds",
        "coffee"
      ]
    ],
    [
      "bangassou",
      "Bangassou",
      "CF-MB",
      4.74,
      22.82,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kaga",
      "Kaga-Bandoro",
      "CF-NG",
      6.99,
      19.18,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "bouar",
      "Bouar",
      "CF-NM",
      5.93,
      15.6,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "bimbo",
      "Bimbo",
      "CF-MP",
      4.26,
      18.4,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bambari",
      "Bambari",
      "CF-UK",
      5.76,
      20.67,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "bossangoa",
      "Bossangoa",
      "CF-UH",
      6.49,
      17.45,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "paoua",
      "Paoua",
      "CF-UP",
      7.24,
      16.44,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "nola",
      "Nola",
      "CF-SG",
      3.53,
      16.07,
      "capital",
      [
        "diamonds",
        "timber"
      ]
    ],
    [
      "birao",
      "Birao",
      "CF-VK",
      10.28,
      22.78,
      "capital",
      [
        "cattle"
      ]
    ]
  ],
  "links": [
    [
      "bangui",
      "bimbo",
      "road",
      "national road"
    ],
    [
      "bimbo",
      "mbaiki",
      "road",
      "national road"
    ],
    [
      "berberati",
      "nola",
      "road",
      "national road"
    ],
    [
      "sibut",
      "kaga",
      "road",
      "national road"
    ],
    [
      "bossangoa",
      "paoua",
      "road",
      "national road"
    ],
    [
      "bangui",
      "sibut",
      "road",
      "national road"
    ],
    [
      "mobaye",
      "bambari",
      "road",
      "national road"
    ],
    [
      "bambari",
      "bria",
      "road",
      "national road"
    ],
    [
      "bouar",
      "paoua",
      "road",
      "national road"
    ],
    [
      "sibut",
      "bambari",
      "road",
      "national road"
    ],
    [
      "berberati",
      "bouar",
      "road",
      "national road"
    ],
    [
      "mobaye",
      "bangassou",
      "road",
      "national road"
    ],
    [
      "sibut",
      "bossangoa",
      "road",
      "national road"
    ],
    [
      "kaga",
      "ndele",
      "road",
      "national road"
    ],
    [
      "ndele",
      "birao",
      "road",
      "national road"
    ],
    [
      "bangassou",
      "obo",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "cf_0",
    "name": "Marie Yakete",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Central African Republic, posted at bangui (cf_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cf.bangui"
  },
  {
    "id": "cf_1",
    "name": "Jean Koyamba",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Central African Republic, posted at bambari (cf_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cf.bambari"
  },
  {
    "id": "cf_2",
    "name": "Claire Ngombe",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Central African Republic, posted at bangassou (cf_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cf.bangassou"
  },
  {
    "id": "cf_3",
    "name": "Pierre Gonda",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Central African Republic, posted at berberati (cf_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cf.berberati"
  },
  {
    "id": "cf_4",
    "name": "Esther Baloukou",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Central African Republic, posted at bimbo (cf_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cf.bimbo"
  },
  {
    "id": "cf_5",
    "name": "Andre Mossoro",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional Front commander of Central African Republic, posted at birao (cf_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cf.birao"
  }
])
});

export const EQUATORIAL_GUINEA_REGION = land({
  "id": "gq",
  "name": "Equatorial Guinea",
  "country": "GQ",
  "bbox": {
    "minLon": 4.88,
    "maxLon": 12.08,
    "minLat": -2.16,
    "maxLat": 4.5
  },
  "notes": "Atlas only. Seven provinces. Bioko and Annobon are reached by sea. Oil is the coastal find of the late 1980s, still small beside the later deepwater fields. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "GQ-AN",
      "name": "Annobon",
      "kind": "province",
      "group": null
    },
    {
      "id": "GQ-BN",
      "name": "Bioko Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "GQ-BS",
      "name": "Bioko Sur",
      "kind": "province",
      "group": null
    },
    {
      "id": "GQ-CS",
      "name": "Centro Sur",
      "kind": "province",
      "group": null
    },
    {
      "id": "GQ-KN",
      "name": "Kie-Ntem",
      "kind": "province",
      "group": null
    },
    {
      "id": "GQ-LI",
      "name": "Litoral",
      "kind": "province",
      "group": null
    },
    {
      "id": "GQ-WN",
      "name": "Wele-Nzas",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "pale",
      "Pale",
      "GQ-AN",
      -1.41,
      5.63,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "malabo",
      "Malabo",
      "GQ-BN",
      3.75,
      8.78,
      "capital",
      [
        "administration",
        "port",
        "oil"
      ]
    ],
    [
      "luba",
      "Luba",
      "GQ-BS",
      3.45,
      8.55,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "evinayong",
      "Evinayong",
      "GQ-CS",
      1.45,
      10.55,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "ebebiyin",
      "Ebebiyin",
      "GQ-KN",
      2.15,
      11.33,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "bata",
      "Bata",
      "GQ-LI",
      1.86,
      9.77,
      "capital",
      [
        "port",
        "cocoa",
        "timber"
      ]
    ],
    [
      "mongomo",
      "Mongomo",
      "GQ-WN",
      1.63,
      11.32,
      "capital",
      [
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "malabo",
      "bata",
      "sea",
      "Gulf of Guinea"
    ],
    [
      "bata",
      "pale",
      "sea",
      "Gulf of Guinea"
    ],
    [
      "malabo",
      "luba",
      "road",
      "national road"
    ],
    [
      "ebebiyin",
      "mongomo",
      "road",
      "national road"
    ],
    [
      "evinayong",
      "mongomo",
      "road",
      "national road"
    ],
    [
      "evinayong",
      "bata",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "gq_0",
    "name": "Carmen Ela",
    "title": "President",
    "rank": "President",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional President of Equatorial Guinea, posted at malabo (gq_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gq.malabo"
  },
  {
    "id": "gq_1",
    "name": "Manuel Ndong",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Equatorial Guinea, posted at bata (gq_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gq.bata"
  },
  {
    "id": "gq_2",
    "name": "Isabel Mangue",
    "title": "Field officer",
    "rank": "Capitán",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional Field officer of Equatorial Guinea, posted at ebebiyin (gq_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gq.ebebiyin"
  }
])
});

export const GABON_REGION = land({
  "id": "ga",
  "name": "Gabon",
  "country": "GA",
  "bbox": {
    "minLon": 8.03,
    "maxLon": 14.33,
    "minLat": -3.68,
    "maxLat": 2.37
  },
  "notes": "Atlas only. Nine provinces. Oil is Port-Gentil and the Ogooue-Maritime coast. The Transgabonais is a railway to Franceville. Subdivision ids are GA- so they do not match Georgia. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "GA-ES",
      "name": "Estuaire",
      "kind": "province",
      "group": null
    },
    {
      "id": "GA-HO",
      "name": "Haut-Ogooue",
      "kind": "province",
      "group": null
    },
    {
      "id": "GA-MO",
      "name": "Moyen-Ogooue",
      "kind": "province",
      "group": null
    },
    {
      "id": "GA-NG",
      "name": "Ngounie",
      "kind": "province",
      "group": null
    },
    {
      "id": "GA-NY",
      "name": "Nyanga",
      "kind": "province",
      "group": null
    },
    {
      "id": "GA-OI",
      "name": "Ogooue-Ivindo",
      "kind": "province",
      "group": null
    },
    {
      "id": "GA-OL",
      "name": "Ogooue-Lolo",
      "kind": "province",
      "group": null
    },
    {
      "id": "GA-OM",
      "name": "Ogooue-Maritime",
      "kind": "province",
      "group": null
    },
    {
      "id": "GA-WN",
      "name": "Woleu-Ntem",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "libreville",
      "Libreville",
      "GA-ES",
      0.39,
      9.45,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "franceville",
      "Franceville",
      "GA-HO",
      -1.63,
      13.58,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "lambarene",
      "Lambarene",
      "GA-MO",
      -0.7,
      10.23,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "mouila",
      "Mouila",
      "GA-NG",
      -1.87,
      11.06,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "tchibanga",
      "Tchibanga",
      "GA-NY",
      -2.93,
      11.0,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "makokou",
      "Makokou",
      "GA-OI",
      0.57,
      12.86,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "koulamoutou",
      "Koulamoutou",
      "GA-OL",
      -1.13,
      12.47,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "port_gentil",
      "Port-Gentil",
      "GA-OM",
      -0.72,
      8.78,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "oyem",
      "Oyem",
      "GA-WN",
      1.62,
      11.58,
      "capital",
      [
        "cocoa"
      ]
    ]
  ],
  "links": [
    [
      "libreville",
      "franceville",
      "rail",
      "Transgabonais"
    ],
    [
      "libreville",
      "port_gentil",
      "sea",
      "Ogooue"
    ],
    [
      "mouila",
      "tchibanga",
      "road",
      "national road"
    ],
    [
      "franceville",
      "koulamoutou",
      "road",
      "national road"
    ],
    [
      "libreville",
      "lambarene",
      "road",
      "national road"
    ],
    [
      "lambarene",
      "mouila",
      "road",
      "national road"
    ],
    [
      "makokou",
      "oyem",
      "road",
      "national road"
    ],
    [
      "koulamoutou",
      "makokou",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "ga_0",
    "name": "Marie Ondo",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Gabon, posted at libreville (ga_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ga.libreville"
  },
  {
    "id": "ga_1",
    "name": "Jean Bekale",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Gabon, posted at franceville (ga_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ga.franceville"
  },
  {
    "id": "ga_2",
    "name": "Claire Mba",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Gabon, posted at koulamoutou (ga_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ga.koulamoutou"
  },
  {
    "id": "ga_3",
    "name": "Paul Moussavou",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Gabon, posted at lambarene (ga_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ga.lambarene"
  },
  {
    "id": "ga_4",
    "name": "Esther Mintsa",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Gabon, posted at makokou (ga_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ga.makokou"
  }
])
});

export const CONGO_REGION = land({
  "id": "cg",
  "name": "Congo",
  "country": "CG",
  "bbox": {
    "minLon": 11.11,
    "maxLon": 18.82,
    "minLat": -5.53,
    "maxLat": 2.37
  },
  "notes": "Atlas only. The People's Republic of the Congo, seated at Brazzaville, not Zaire. Ten regions, including the Brazzaville commune. Cuvette-Ouest is later. Oil is Pointe-Noire. The Congo-Ocean railway links the capital to the port. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "CG-BZ",
      "name": "Brazzaville",
      "kind": "commune",
      "group": null
    },
    {
      "id": "CG-KL",
      "name": "Kouilou",
      "kind": "region",
      "group": null
    },
    {
      "id": "CG-NI",
      "name": "Niari",
      "kind": "region",
      "group": null
    },
    {
      "id": "CG-LE",
      "name": "Lekoumou",
      "kind": "region",
      "group": null
    },
    {
      "id": "CG-BO",
      "name": "Bouenza",
      "kind": "region",
      "group": null
    },
    {
      "id": "CG-PO",
      "name": "Pool",
      "kind": "region",
      "group": null
    },
    {
      "id": "CG-PL",
      "name": "Plateaux",
      "kind": "region",
      "group": null
    },
    {
      "id": "CG-CU",
      "name": "Cuvette",
      "kind": "region",
      "group": null
    },
    {
      "id": "CG-SA",
      "name": "Sangha",
      "kind": "region",
      "group": null
    },
    {
      "id": "CG-LI",
      "name": "Likouala",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "brazzaville",
      "Brazzaville",
      "CG-BZ",
      -4.27,
      15.28,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pointe_noire",
      "Pointe-Noire",
      "CG-KL",
      -4.78,
      11.86,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "dolisie",
      "Dolisie",
      "CG-NI",
      -4.2,
      12.67,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "sibiti",
      "Sibiti",
      "CG-LE",
      -3.69,
      13.35,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "madingou",
      "Madingou",
      "CG-BO",
      -4.16,
      13.55,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "kinkala",
      "Kinkala",
      "CG-PO",
      -4.36,
      14.76,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "djambala",
      "Djambala",
      "CG-PL",
      -2.54,
      14.75,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "owando",
      "Owando",
      "CG-CU",
      -0.48,
      15.9,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "ouesso",
      "Ouesso",
      "CG-SA",
      1.61,
      16.05,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "impfondo",
      "Impfondo",
      "CG-LI",
      1.62,
      18.07,
      "capital",
      [
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "brazzaville",
      "pointe_noire",
      "rail",
      "Congo-Ocean"
    ],
    [
      "sibiti",
      "madingou",
      "road",
      "national road"
    ],
    [
      "brazzaville",
      "kinkala",
      "road",
      "national road"
    ],
    [
      "dolisie",
      "sibiti",
      "road",
      "national road"
    ],
    [
      "pointe_noire",
      "dolisie",
      "road",
      "national road"
    ],
    [
      "brazzaville",
      "djambala",
      "road",
      "national road"
    ],
    [
      "ouesso",
      "impfondo",
      "road",
      "national road"
    ],
    [
      "owando",
      "ouesso",
      "road",
      "national road"
    ],
    [
      "djambala",
      "owando",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "cg_0",
    "name": "Marie Okemba",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Congo, posted at brazzaville (cg_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cg.brazzaville"
  },
  {
    "id": "cg_1",
    "name": "Jean Goma",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Congo, posted at djambala (cg_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cg.djambala"
  },
  {
    "id": "cg_2",
    "name": "Claire Ndinga",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Congo, posted at dolisie (cg_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cg.dolisie"
  },
  {
    "id": "cg_3",
    "name": "Paul Elenga",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Congo, posted at impfondo (cg_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cg.impfondo"
  },
  {
    "id": "cg_4",
    "name": "Esther Kimbembe",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Congo, posted at kinkala (cg_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cg.kinkala"
  }
])
});

export const ZAIRE_REGION = land({
  "id": "zr",
  "name": "Zaire",
  "country": "ZR",
  "bbox": {
    "minLon": 12.7,
    "maxLon": 31.0,
    "minLat": -12.41,
    "maxLat": 5.1
  },
  "notes": "Atlas only. The country is still Zaire. Eight regions plus Kinshasa. Kivu is not split: Nord-Kivu, Sud-Kivu, and Maniema date from July 1988 and are not drawn. Shaba has not been renamed Katanga. Copper and cobalt are Kolwezi and Lubumbashi. Diamonds are the Kasai. Inga hydro is pinned on Matadi. The Benguela railway enters at Dilolo. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "ZR-KN",
      "name": "Kinshasa",
      "kind": "region",
      "group": null
    },
    {
      "id": "ZR-BZ",
      "name": "Bas-Zaire",
      "kind": "region",
      "group": null
    },
    {
      "id": "ZR-BN",
      "name": "Bandundu",
      "kind": "region",
      "group": null
    },
    {
      "id": "ZR-EQ",
      "name": "Equateur",
      "kind": "region",
      "group": null
    },
    {
      "id": "ZR-HZ",
      "name": "Haut-Zaire",
      "kind": "region",
      "group": null
    },
    {
      "id": "ZR-KV",
      "name": "Kivu",
      "kind": "region",
      "group": null
    },
    {
      "id": "ZR-SH",
      "name": "Shaba",
      "kind": "region",
      "group": null
    },
    {
      "id": "ZR-KO",
      "name": "Kasai-Oriental",
      "kind": "region",
      "group": null
    },
    {
      "id": "ZR-KC",
      "name": "Kasai-Occidental",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "kinshasa",
      "Kinshasa",
      "ZR-KN",
      -4.32,
      15.31,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "matadi",
      "Matadi",
      "ZR-BZ",
      -5.82,
      13.45,
      "capital",
      [
        "port",
        "hydro"
      ]
    ],
    [
      "bandundu",
      "Bandundu",
      "ZR-BN",
      -3.31,
      17.38,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mbandaka",
      "Mbandaka",
      "ZR-EQ",
      0.05,
      18.26,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "zongo",
      "Zongo",
      "ZR-EQ",
      4.35,
      18.6,
      "city",
      [
        "administration"
      ]
    ],
    [
      "kisangani",
      "Kisangani",
      "ZR-HZ",
      0.52,
      25.19,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "aba",
      "Aba",
      "ZR-HZ",
      3.87,
      30.25,
      "city",
      [
        "coffee"
      ]
    ],
    [
      "bukavu",
      "Bukavu",
      "ZR-KV",
      -2.51,
      28.86,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "goma",
      "Goma",
      "ZR-KV",
      -1.68,
      29.22,
      "city",
      [
        "administration"
      ]
    ],
    [
      "lubumbashi",
      "Lubumbashi",
      "ZR-SH",
      -11.66,
      27.48,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "kolwezi",
      "Kolwezi",
      "ZR-SH",
      -10.71,
      25.47,
      "city",
      [
        "copper",
        "cobalt"
      ]
    ],
    [
      "mbuji_mayi",
      "Mbuji-Mayi",
      "ZR-KO",
      -6.15,
      23.59,
      "capital",
      [
        "diamonds"
      ]
    ],
    [
      "kananga",
      "Kananga",
      "ZR-KC",
      -5.9,
      22.42,
      "capital",
      [
        "diamonds"
      ]
    ]
  ],
  "links": [
    [
      "kinshasa",
      "matadi",
      "rail",
      "Matadi railway"
    ],
    [
      "kinshasa",
      "mbandaka",
      "sea",
      "Congo river"
    ],
    [
      "mbandaka",
      "kisangani",
      "sea",
      "Congo river"
    ],
    [
      "lubumbashi",
      "kolwezi",
      "rail",
      "Benguela railway"
    ],
    [
      "kisangani",
      "aba",
      "road",
      "Aba road"
    ],
    [
      "mbandaka",
      "zongo",
      "road",
      "Ubangi road"
    ],
    [
      "bukavu",
      "goma",
      "road",
      "Kivu road"
    ],
    [
      "mbuji_mayi",
      "kananga",
      "road",
      "national road"
    ],
    [
      "kinshasa",
      "bandundu",
      "road",
      "national road"
    ],
    [
      "kisangani",
      "goma",
      "road",
      "national road"
    ],
    [
      "kolwezi",
      "mbuji_mayi",
      "road",
      "national road"
    ],
    [
      "bandundu",
      "kananga",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "zr_0",
    "name": "Pascal Ilunga",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Zaire, posted at kinshasa (zr_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "zr.kinshasa"
  },
  {
    "id": "zr_1",
    "name": "Nicole Kabasele",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Zaire, posted at aba (zr_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "zr.aba"
  },
  {
    "id": "zr_2",
    "name": "Joseph Mujinga",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Zaire, posted at bandundu (zr_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "zr.bandundu"
  },
  {
    "id": "zr_3",
    "name": "Beatrice Tshibangu",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Zaire, posted at bukavu (zr_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "zr.bukavu"
  },
  {
    "id": "zr_4",
    "name": "Andre Lumbu",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Zaire, posted at goma (zr_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "zr.goma"
  }
])
});

export const SAO_TOME_REGION = land({
  "id": "st",
  "name": "São Tomé and Príncipe",
  "country": "ST",
  "bbox": {
    "minLon": 5.98,
    "maxLon": 8.17,
    "minLat": -0.41,
    "maxLat": 2.39
  },
  "notes": "Atlas only. Two islands, linked by sea. Cocoa is the historic yield. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "ST-ST",
      "name": "Sao Tome",
      "kind": "island",
      "group": null
    },
    {
      "id": "ST-PR",
      "name": "Principe",
      "kind": "island",
      "group": null
    }
  ],
  "cities": [
    [
      "sao_tome",
      "Sao Tome",
      "ST-ST",
      0.34,
      6.73,
      "capital",
      [
        "administration",
        "port",
        "cocoa"
      ]
    ],
    [
      "principe",
      "Santo Antonio",
      "ST-PR",
      1.64,
      7.42,
      "capital",
      [
        "cocoa",
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "sao_tome",
      "principe",
      "sea",
      "Sao Tome channel"
    ]
  ],
  "officers": staff([
  {
    "id": "st_0",
    "name": "Maria Braganca",
    "title": "President",
    "rank": "President",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional President of São Tomé and Príncipe, posted at sao tome (st_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "st.sao_tome"
  },
  {
    "id": "st_1",
    "name": "Joao da Costa",
    "title": "Field officer",
    "rank": "Capitão",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 63,
    "int": 39,
    "pol": 29,
    "chr": 32,
    "personality": "cautious",
    "bio": "Fictional Field officer of São Tomé and Príncipe, posted at principe (st_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "st.principe"
  }
])
});

