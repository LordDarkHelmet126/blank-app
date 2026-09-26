/** West Africa and the Sahel, 1985-89. */
import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const MAURITANIA_REGION = land({
  "id": "mr",
  "name": "Mauritania",
  "country": "MR",
  "bbox": {
    "minLon": -17.78,
    "maxLon": -6.5,
    "minLat": 14.41,
    "maxLat": 23.48
  },
  "notes": "Atlas only. Twelve regions plus the Nouakchott district. Iron is at Zouerat. The coastal road meets Western Sahara at Nouadhibou. Occupied and off the week-0 march.",
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
      "id": "MR-NO",
      "name": "Nouakchott",
      "kind": "district",
      "group": null
    },
    {
      "id": "MR-DN",
      "name": "Dakhlet Nouadhibou",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-AD",
      "name": "Adrar",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-AS",
      "name": "Assaba",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-BR",
      "name": "Brakna",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-GO",
      "name": "Gorgol",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-GU",
      "name": "Guidimaka",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-HC",
      "name": "Hodh Ech Chargui",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-HG",
      "name": "Hodh El Gharbi",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-IN",
      "name": "Inchiri",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-TG",
      "name": "Tagant",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-TZ",
      "name": "Tiris Zemmour",
      "kind": "region",
      "group": null
    },
    {
      "id": "MR-TR",
      "name": "Trarza",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "nouakchott",
      "Nouakchott",
      "MR-NO",
      18.07,
      -15.98,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "nouadhibou",
      "Nouadhibou",
      "MR-DN",
      20.93,
      -17.03,
      "capital",
      [
        "port",
        "fisheries",
        "iron"
      ]
    ],
    [
      "atar",
      "Atar",
      "MR-AD",
      20.52,
      -13.05,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kiffa",
      "Kiffa",
      "MR-AS",
      16.62,
      -11.4,
      "capital",
      [
        "cattle",
        "sorghum"
      ]
    ],
    [
      "aleg",
      "Aleg",
      "MR-BR",
      17.05,
      -13.91,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "kaedi",
      "Kaedi",
      "MR-GO",
      16.15,
      -13.51,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "selibaby",
      "Selibaby",
      "MR-GU",
      15.16,
      -12.18,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "nema",
      "Nema",
      "MR-HC",
      16.62,
      -7.25,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "aioun",
      "Aioun",
      "MR-HG",
      16.66,
      -9.61,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "akjoujt",
      "Akjoujt",
      "MR-IN",
      19.75,
      -14.38,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "tidjikja",
      "Tidjikja",
      "MR-TG",
      18.55,
      -11.43,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zouerat",
      "Zouerat",
      "MR-TZ",
      22.73,
      -12.47,
      "capital",
      [
        "iron"
      ]
    ],
    [
      "rosso",
      "Rosso",
      "MR-TR",
      16.51,
      -15.8,
      "capital",
      [
        "sorghum"
      ]
    ]
  ],
  "links": [
    [
      "aleg",
      "kaedi",
      "road",
      "national road"
    ],
    [
      "atar",
      "akjoujt",
      "road",
      "national road"
    ],
    [
      "nouakchott",
      "rosso",
      "road",
      "national road"
    ],
    [
      "kiffa",
      "selibaby",
      "road",
      "national road"
    ],
    [
      "selibaby",
      "kaedi",
      "road",
      "national road"
    ],
    [
      "kiffa",
      "aioun",
      "road",
      "national road"
    ],
    [
      "kiffa",
      "tidjikja",
      "road",
      "national road"
    ],
    [
      "rosso",
      "aleg",
      "road",
      "national road"
    ],
    [
      "atar",
      "zouerat",
      "road",
      "national road"
    ],
    [
      "nouakchott",
      "akjoujt",
      "road",
      "national road"
    ],
    [
      "aioun",
      "nema",
      "road",
      "national road"
    ],
    [
      "akjoujt",
      "nouadhibou",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "mr_0",
    "name": "Aminata Mint Salem",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Mauritania, posted at nouakchott (mr_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mr.nouakchott"
  },
  {
    "id": "mr_1",
    "name": "Sidi Ould Lemine",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Mauritania, posted at aioun (mr_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mr.aioun"
  },
  {
    "id": "mr_2",
    "name": "Fatimetou Mint Vall",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Mauritania, posted at akjoujt (mr_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mr.akjoujt"
  },
  {
    "id": "mr_3",
    "name": "Mohamed Ould Cheikh",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Mauritania, posted at aleg (mr_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mr.aleg"
  },
  {
    "id": "mr_4",
    "name": "Mariem Mint Ely",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Mauritania, posted at atar (mr_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mr.atar"
  }
])
});

export const SENEGAL_REGION = land({
  "id": "sn",
  "name": "Senegal",
  "country": "SN",
  "bbox": {
    "minLon": -18.22,
    "maxLon": -12.92,
    "minLat": 11.81,
    "maxLat": 16.77
  },
  "notes": "Atlas only. Ten regions. Fatick and Kolda date from 1984. Peanuts are the basin around Kaolack, phosphate is at Thies, and the Dakar-Niger railway runs inland toward Kayes. Occupied and off the week-0 march.",
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
      "id": "SN-DK",
      "name": "Dakar",
      "kind": "region",
      "group": null
    },
    {
      "id": "SN-DB",
      "name": "Diourbel",
      "kind": "region",
      "group": null
    },
    {
      "id": "SN-FK",
      "name": "Fatick",
      "kind": "region",
      "group": null
    },
    {
      "id": "SN-KL",
      "name": "Kaolack",
      "kind": "region",
      "group": null
    },
    {
      "id": "SN-KD",
      "name": "Kolda",
      "kind": "region",
      "group": null
    },
    {
      "id": "SN-LG",
      "name": "Louga",
      "kind": "region",
      "group": null
    },
    {
      "id": "SN-SL",
      "name": "Saint-Louis",
      "kind": "region",
      "group": null
    },
    {
      "id": "SN-TC",
      "name": "Tambacounda",
      "kind": "region",
      "group": null
    },
    {
      "id": "SN-TH",
      "name": "Thies",
      "kind": "region",
      "group": null
    },
    {
      "id": "SN-ZG",
      "name": "Ziguinchor",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "dakar",
      "Dakar",
      "SN-DK",
      14.72,
      -17.47,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "diourbel",
      "Diourbel",
      "SN-DB",
      14.65,
      -16.23,
      "capital",
      [
        "peanuts"
      ]
    ],
    [
      "fatick",
      "Fatick",
      "SN-FK",
      14.33,
      -16.41,
      "capital",
      [
        "peanuts"
      ]
    ],
    [
      "kaolack",
      "Kaolack",
      "SN-KL",
      14.15,
      -16.07,
      "capital",
      [
        "peanuts"
      ]
    ],
    [
      "kolda",
      "Kolda",
      "SN-KD",
      12.88,
      -14.95,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "louga",
      "Louga",
      "SN-LG",
      15.62,
      -16.22,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "saint_louis",
      "Saint-Louis",
      "SN-SL",
      16.02,
      -16.49,
      "capital",
      [
        "fisheries",
        "rice"
      ]
    ],
    [
      "tambacounda",
      "Tambacounda",
      "SN-TC",
      13.77,
      -13.67,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "thies",
      "Thies",
      "SN-TH",
      14.79,
      -16.93,
      "capital",
      [
        "phosphate"
      ]
    ],
    [
      "ziguinchor",
      "Ziguinchor",
      "SN-ZG",
      12.56,
      -16.27,
      "capital",
      [
        "rice",
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "dakar",
      "thies",
      "rail",
      "Dakar-Niger railway"
    ],
    [
      "thies",
      "tambacounda",
      "rail",
      "Dakar-Niger railway"
    ],
    [
      "diourbel",
      "fatick",
      "road",
      "national road"
    ],
    [
      "fatick",
      "kaolack",
      "road",
      "national road"
    ],
    [
      "louga",
      "saint_louis",
      "road",
      "national road"
    ],
    [
      "thies",
      "fatick",
      "road",
      "national road"
    ],
    [
      "diourbel",
      "louga",
      "road",
      "national road"
    ],
    [
      "kolda",
      "ziguinchor",
      "road",
      "national road"
    ],
    [
      "tambacounda",
      "kolda",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "sn_0",
    "name": "Aminata Ndiaye",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Senegal, posted at dakar (sn_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sn.dakar"
  },
  {
    "id": "sn_1",
    "name": "Ousmane Ba",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Senegal, posted at diourbel (sn_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sn.diourbel"
  },
  {
    "id": "sn_2",
    "name": "Fatou Diop",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Senegal, posted at fatick (sn_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sn.fatick"
  },
  {
    "id": "sn_3",
    "name": "Ibrahima Sow",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Senegal, posted at kaolack (sn_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sn.kaolack"
  },
  {
    "id": "sn_4",
    "name": "Mariam Cissoko",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Senegal, posted at kolda (sn_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sn.kolda"
  }
])
});

export const GAMBIA_REGION = land({
  "id": "gm",
  "name": "Gambia",
  "country": "GM",
  "bbox": {
    "minLon": -17.4,
    "maxLon": -13.47,
    "minLat": 12.52,
    "maxLat": 14.3
  },
  "notes": "Atlas only. Banjul, Western, North Bank, Lower River, MacCarthy Island, and Upper River. The MacCarthy Island seat is still Georgetown. Peanuts are the main yield. The Trans-Gambia road crosses at Farafenni. Occupied and off the week-0 march.",
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
      "id": "GM-BJ",
      "name": "Banjul",
      "kind": "division",
      "group": null
    },
    {
      "id": "GM-WE",
      "name": "Western",
      "kind": "division",
      "group": null
    },
    {
      "id": "GM-NB",
      "name": "North Bank",
      "kind": "division",
      "group": null
    },
    {
      "id": "GM-LR",
      "name": "Lower River",
      "kind": "division",
      "group": null
    },
    {
      "id": "GM-MC",
      "name": "MacCarthy Island",
      "kind": "division",
      "group": null
    },
    {
      "id": "GM-UR",
      "name": "Upper River",
      "kind": "division",
      "group": null
    }
  ],
  "cities": [
    [
      "banjul",
      "Banjul",
      "GM-BJ",
      13.45,
      -16.58,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "brikama",
      "Brikama",
      "GM-WE",
      13.27,
      -16.65,
      "capital",
      [
        "peanuts"
      ]
    ],
    [
      "kerewan",
      "Kerewan",
      "GM-NB",
      13.49,
      -16.09,
      "capital",
      [
        "peanuts"
      ]
    ],
    [
      "farafenni",
      "Farafenni",
      "GM-NB",
      13.55,
      -15.6,
      "city",
      [
        "peanuts"
      ]
    ],
    [
      "mansa_konko",
      "Mansa Konko",
      "GM-LR",
      13.44,
      -15.68,
      "capital",
      [
        "peanuts"
      ]
    ],
    [
      "georgetown",
      "Georgetown",
      "GM-MC",
      13.54,
      -14.77,
      "capital",
      [
        "peanuts"
      ]
    ],
    [
      "basse",
      "Basse",
      "GM-UR",
      13.31,
      -14.22,
      "capital",
      [
        "peanuts"
      ]
    ]
  ],
  "links": [
    [
      "farafenni",
      "mansa_konko",
      "road",
      "national road"
    ],
    [
      "banjul",
      "brikama",
      "road",
      "national road"
    ],
    [
      "kerewan",
      "mansa_konko",
      "road",
      "national road"
    ],
    [
      "banjul",
      "kerewan",
      "road",
      "national road"
    ],
    [
      "georgetown",
      "basse",
      "road",
      "national road"
    ],
    [
      "farafenni",
      "georgetown",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "gm_0",
    "name": "Kebba Jallow",
    "title": "President",
    "rank": "President",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional President of Gambia, posted at banjul (gm_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gm.banjul"
  },
  {
    "id": "gm_1",
    "name": "Fatou Colley",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Gambia, posted at basse (gm_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gm.basse"
  },
  {
    "id": "gm_2",
    "name": "Lamin Bojang",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional Field officer of Gambia, posted at brikama (gm_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gm.brikama"
  }
])
});

export const GUINEA_BISSAU_REGION = land({
  "id": "gw",
  "name": "Guinea-Bissau",
  "country": "GW",
  "bbox": {
    "minLon": -16.92,
    "maxLon": -13.47,
    "minLat": 10.53,
    "maxLat": 13.23
  },
  "notes": "Atlas only. Eight regions of the mid-1980s plus the Bissau sector. Biombo, split from Cacheu at the end of 1989, is not drawn. Cashew is mapped as peanuts. Occupied and off the week-0 march.",
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
      "id": "GW-BS",
      "name": "Bissau",
      "kind": "sector",
      "group": null
    },
    {
      "id": "GW-BA",
      "name": "Bafata",
      "kind": "region",
      "group": null
    },
    {
      "id": "GW-BL",
      "name": "Bolama",
      "kind": "region",
      "group": null
    },
    {
      "id": "GW-CA",
      "name": "Cacheu",
      "kind": "region",
      "group": null
    },
    {
      "id": "GW-GA",
      "name": "Gabu",
      "kind": "region",
      "group": null
    },
    {
      "id": "GW-OI",
      "name": "Oio",
      "kind": "region",
      "group": null
    },
    {
      "id": "GW-QU",
      "name": "Quinara",
      "kind": "region",
      "group": null
    },
    {
      "id": "GW-TO",
      "name": "Tombali",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "bissau",
      "Bissau",
      "GW-BS",
      11.86,
      -15.6,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "bafata",
      "Bafata",
      "GW-BA",
      12.17,
      -14.66,
      "capital",
      [
        "peanuts"
      ]
    ],
    [
      "bolama",
      "Bolama",
      "GW-BL",
      11.58,
      -15.48,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "cacheu",
      "Cacheu",
      "GW-CA",
      12.27,
      -16.17,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "gabu",
      "Gabu",
      "GW-GA",
      12.28,
      -14.22,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "farim",
      "Farim",
      "GW-OI",
      12.48,
      -15.22,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "buba",
      "Buba",
      "GW-QU",
      11.59,
      -15.0,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "catio",
      "Catio",
      "GW-TO",
      11.28,
      -15.25,
      "capital",
      [
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "bissau",
      "bolama",
      "road",
      "national road"
    ],
    [
      "bolama",
      "catio",
      "road",
      "national road"
    ],
    [
      "catio",
      "buba",
      "road",
      "national road"
    ],
    [
      "bafata",
      "gabu",
      "road",
      "national road"
    ],
    [
      "bafata",
      "farim",
      "road",
      "national road"
    ],
    [
      "buba",
      "bafata",
      "road",
      "national road"
    ],
    [
      "bissau",
      "cacheu",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "gw_0",
    "name": "Maria Correia",
    "title": "President",
    "rank": "President",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional President of Guinea-Bissau, posted at bissau (gw_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gw.bissau"
  },
  {
    "id": "gw_1",
    "name": "Carlos Semedo",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Guinea-Bissau, posted at bafata (gw_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gw.bafata"
  },
  {
    "id": "gw_2",
    "name": "Ana Tavares",
    "title": "Chief of Staff",
    "rank": "Coronel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Guinea-Bissau, posted at bolama (gw_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gw.bolama"
  },
  {
    "id": "gw_3",
    "name": "Joao Monteiro",
    "title": "Front commander",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Guinea-Bissau, posted at buba (gw_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gw.buba"
  },
  {
    "id": "gw_4",
    "name": "Lucia Barbosa",
    "title": "Field officer",
    "rank": "Capitão",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Guinea-Bissau, posted at cacheu (gw_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gw.cacheu"
  }
])
});

export const GUINEA_REGION = land({
  "id": "gn",
  "name": "Guinea",
  "country": "GN",
  "bbox": {
    "minLon": -15.04,
    "maxLon": -8.07,
    "minLat": 7.01,
    "maxLat": 12.07
  },
  "notes": "Atlas only. Eight regions, with Conakry the special zone. Bauxite is at Boke. Not every prefecture is drawn. Occupied and off the week-0 march.",
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
      "id": "GN-CO",
      "name": "Conakry",
      "kind": "region",
      "group": null
    },
    {
      "id": "GN-BK",
      "name": "Boke",
      "kind": "region",
      "group": null
    },
    {
      "id": "GN-FA",
      "name": "Faranah",
      "kind": "region",
      "group": null
    },
    {
      "id": "GN-KK",
      "name": "Kankan",
      "kind": "region",
      "group": null
    },
    {
      "id": "GN-KD",
      "name": "Kindia",
      "kind": "region",
      "group": null
    },
    {
      "id": "GN-LA",
      "name": "Labe",
      "kind": "region",
      "group": null
    },
    {
      "id": "GN-MA",
      "name": "Mamou",
      "kind": "region",
      "group": null
    },
    {
      "id": "GN-NZ",
      "name": "Nzerekore",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "conakry",
      "Conakry",
      "GN-CO",
      9.54,
      -13.68,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "boke",
      "Boke",
      "GN-BK",
      10.93,
      -14.29,
      "capital",
      [
        "bauxite",
        "port"
      ]
    ],
    [
      "faranah",
      "Faranah",
      "GN-FA",
      10.04,
      -10.74,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kankan",
      "Kankan",
      "GN-KK",
      10.39,
      -9.31,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kindia",
      "Kindia",
      "GN-KD",
      10.06,
      -12.87,
      "capital",
      [
        "bananas"
      ]
    ],
    [
      "labe",
      "Labe",
      "GN-LA",
      11.32,
      -12.28,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "mamou",
      "Mamou",
      "GN-MA",
      10.38,
      -12.09,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "nzerekore",
      "Nzerekore",
      "GN-NZ",
      7.76,
      -8.82,
      "capital",
      [
        "coffee",
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "kindia",
      "mamou",
      "road",
      "national road"
    ],
    [
      "mamou",
      "labe",
      "road",
      "national road"
    ],
    [
      "conakry",
      "kindia",
      "road",
      "national road"
    ],
    [
      "mamou",
      "faranah",
      "road",
      "national road"
    ],
    [
      "faranah",
      "kankan",
      "road",
      "national road"
    ],
    [
      "conakry",
      "boke",
      "road",
      "national road"
    ],
    [
      "kankan",
      "nzerekore",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "gn_0",
    "name": "Aissatou Camara",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Guinea, posted at conakry (gn_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gn.conakry"
  },
  {
    "id": "gn_1",
    "name": "Ibrahima Diallo",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Guinea, posted at boke (gn_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gn.boke"
  },
  {
    "id": "gn_2",
    "name": "Mariama Sow",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Guinea, posted at faranah (gn_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gn.faranah"
  },
  {
    "id": "gn_3",
    "name": "Boubacar Bah",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Guinea, posted at kankan (gn_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gn.kankan"
  },
  {
    "id": "gn_4",
    "name": "Fatoumata Barry",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Guinea, posted at kindia (gn_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gn.kindia"
  }
])
});

export const SIERRA_LEONE_REGION = land({
  "id": "sl",
  "name": "Sierra Leone",
  "country": "SL",
  "bbox": {
    "minLon": -13.98,
    "maxLon": -10.22,
    "minLat": 7.13,
    "maxLat": 9.63
  },
  "notes": "Atlas only. Three provinces plus the Western Area. Diamond digging is at Koidu. The 149 chiefdoms are not drawn. Occupied and off the week-0 march.",
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
      "id": "SL-WE",
      "name": "Western Area",
      "kind": "area",
      "group": null
    },
    {
      "id": "SL-NO",
      "name": "Northern",
      "kind": "province",
      "group": null
    },
    {
      "id": "SL-SO",
      "name": "Southern",
      "kind": "province",
      "group": null
    },
    {
      "id": "SL-EA",
      "name": "Eastern",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "freetown",
      "Freetown",
      "SL-WE",
      8.48,
      -13.23,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "makeni",
      "Makeni",
      "SL-NO",
      8.88,
      -12.04,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "bo",
      "Bo",
      "SL-SO",
      7.96,
      -11.74,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "kenema",
      "Kenema",
      "SL-EA",
      7.88,
      -11.19,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "koidu",
      "Koidu",
      "SL-EA",
      8.64,
      -10.97,
      "city",
      [
        "diamonds"
      ]
    ]
  ],
  "links": [
    [
      "bo",
      "kenema",
      "road",
      "national road"
    ],
    [
      "kenema",
      "koidu",
      "road",
      "national road"
    ],
    [
      "makeni",
      "bo",
      "road",
      "national road"
    ],
    [
      "freetown",
      "makeni",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "sl_0",
    "name": "Aminata Koroma",
    "title": "President",
    "rank": "President",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional President of Sierra Leone, posted at freetown (sl_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sl.freetown"
  },
  {
    "id": "sl_1",
    "name": "Ibrahim Sesay",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Sierra Leone, posted at bo (sl_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sl.bo"
  },
  {
    "id": "sl_2",
    "name": "Fatmata Bangura",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional Field officer of Sierra Leone, posted at kenema (sl_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sl.kenema"
  }
])
});

export const LIBERIA_REGION = land({
  "id": "lr",
  "name": "Liberia",
  "country": "LR",
  "bbox": {
    "minLon": -12.12,
    "maxLon": -6.97,
    "minLat": 3.63,
    "maxLat": 9.17
  },
  "notes": "Atlas only. Thirteen counties. Bomi, Grand Kru, Margibi, and Rivercess exist by 1985. River Gee and Gbarpolu are later and are not drawn. Iron is the Bong mines. Occupied and off the week-0 march.",
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
      "id": "LR-BM",
      "name": "Bomi",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-BG",
      "name": "Bong",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-GB",
      "name": "Grand Bassa",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-CM",
      "name": "Grand Cape Mount",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-GG",
      "name": "Grand Gedeh",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-GK",
      "name": "Grand Kru",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-LO",
      "name": "Lofa",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-MG",
      "name": "Margibi",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-MY",
      "name": "Maryland",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-MO",
      "name": "Montserrado",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-NI",
      "name": "Nimba",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-SI",
      "name": "Sinoe",
      "kind": "county",
      "group": null
    },
    {
      "id": "LR-RC",
      "name": "Rivercess",
      "kind": "county",
      "group": null
    }
  ],
  "cities": [
    [
      "tubmanburg",
      "Tubmanburg",
      "LR-BM",
      6.87,
      -10.82,
      "capital",
      [
        "iron"
      ]
    ],
    [
      "gbarnga",
      "Gbarnga",
      "LR-BG",
      6.99,
      -9.47,
      "capital",
      [
        "iron"
      ]
    ],
    [
      "buchanan",
      "Buchanan",
      "LR-GB",
      5.88,
      -10.05,
      "capital",
      [
        "port",
        "iron"
      ]
    ],
    [
      "robertsport",
      "Robertsport",
      "LR-CM",
      6.75,
      -11.37,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "zwedru",
      "Zwedru",
      "LR-GG",
      6.07,
      -8.13,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "barclayville",
      "Barclayville",
      "LR-GK",
      4.67,
      -8.23,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "voinjama",
      "Voinjama",
      "LR-LO",
      8.42,
      -9.75,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "kakata",
      "Kakata",
      "LR-MG",
      6.53,
      -10.35,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "harper",
      "Harper",
      "LR-MY",
      4.38,
      -7.72,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "monrovia",
      "Monrovia",
      "LR-MO",
      6.31,
      -10.8,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "sanniquellie",
      "Sanniquellie",
      "LR-NI",
      7.36,
      -8.71,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "greenville",
      "Greenville",
      "LR-SI",
      5.01,
      -9.04,
      "capital",
      [
        "timber",
        "port"
      ]
    ],
    [
      "river_cess",
      "River Cess",
      "LR-RC",
      5.46,
      -9.58,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "kakata",
      "monrovia",
      "road",
      "national road"
    ],
    [
      "tubmanburg",
      "monrovia",
      "road",
      "national road"
    ],
    [
      "tubmanburg",
      "robertsport",
      "road",
      "national road"
    ],
    [
      "barclayville",
      "harper",
      "road",
      "national road"
    ],
    [
      "buchanan",
      "river_cess",
      "road",
      "national road"
    ],
    [
      "river_cess",
      "greenville",
      "road",
      "national road"
    ],
    [
      "kakata",
      "buchanan",
      "road",
      "national road"
    ],
    [
      "gbarnga",
      "sanniquellie",
      "road",
      "national road"
    ],
    [
      "greenville",
      "barclayville",
      "road",
      "national road"
    ],
    [
      "kakata",
      "gbarnga",
      "road",
      "national road"
    ],
    [
      "greenville",
      "zwedru",
      "road",
      "national road"
    ],
    [
      "gbarnga",
      "voinjama",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "lr_0",
    "name": "Comfort Paye",
    "title": "President",
    "rank": "President",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional President of Liberia, posted at monrovia (lr_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lr.monrovia"
  },
  {
    "id": "lr_1",
    "name": "James Flomo",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Liberia, posted at barclayville (lr_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lr.barclayville"
  },
  {
    "id": "lr_2",
    "name": "Musu Kollie",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Liberia, posted at buchanan (lr_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lr.buchanan"
  },
  {
    "id": "lr_3",
    "name": "Thomas Kroma",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Liberia, posted at gbarnga (lr_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lr.gbarnga"
  },
  {
    "id": "lr_4",
    "name": "Martha Diggs",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Liberia, posted at greenville (lr_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "lr.greenville"
  }
])
});

export const COTE_DIVOIRE_REGION = land({
  "id": "ci",
  "name": "Côte d'Ivoire",
  "country": "CI",
  "bbox": {
    "minLon": -8.91,
    "maxLon": -2.05,
    "minLat": 3.67,
    "maxLat": 11.23
  },
  "notes": "Atlas only. Departements were the first-level units in 1985-89. The 1990s regions are not drawn. Yamoussoukro, the political capital from 1983, stays in the Bouake departement; its own departement is 1988 and is not split. San-Pedro is the Sassandra port. Cocoa is the southern belt. The Abidjan-Ouagadougou railway is the RAN. Occupied and off the week-0 march.",
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
      "id": "CI-ABJ",
      "name": "Abidjan",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-ABS",
      "name": "Aboisso",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-ABG",
      "name": "Abengourou",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-ADZ",
      "name": "Adzope",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-AGB",
      "name": "Agboville",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-BIA",
      "name": "Biankouma",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-BDK",
      "name": "Bondoukou",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-BFL",
      "name": "Bouafle",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-BKE",
      "name": "Bouake",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-BNA",
      "name": "Bouna",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-BDL",
      "name": "Boundiali",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-DBK",
      "name": "Dabakala",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-DLA",
      "name": "Daloa",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-DAN",
      "name": "Danane",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-DMK",
      "name": "Dimbokro",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-DIV",
      "name": "Divo",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-FER",
      "name": "Ferkessedougou",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-GAG",
      "name": "Gagnoa",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-GUI",
      "name": "Guiglo",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-ISS",
      "name": "Issia",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-KAT",
      "name": "Katiola",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-KOR",
      "name": "Korhogo",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-LAK",
      "name": "Lakota",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-MAN",
      "name": "Man",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-MNK",
      "name": "Mankono",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-ODI",
      "name": "Odienne",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-OUM",
      "name": "Oume",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-SAS",
      "name": "Sassandra",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-SEG",
      "name": "Seguela",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-SOU",
      "name": "Soubre",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-TAB",
      "name": "Tabou",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-TIN",
      "name": "Tingrela",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-TOU",
      "name": "Touba",
      "kind": "departement",
      "group": null
    },
    {
      "id": "CI-ZUE",
      "name": "Zuenoula",
      "kind": "departement",
      "group": null
    }
  ],
  "cities": [
    [
      "abidjan",
      "Abidjan",
      "CI-ABJ",
      5.36,
      -4.01,
      "capital",
      [
        "administration",
        "port",
        "cocoa"
      ]
    ],
    [
      "aboisso",
      "Aboisso",
      "CI-ABS",
      5.47,
      -3.21,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "abengourou",
      "Abengourou",
      "CI-ABG",
      6.73,
      -3.49,
      "capital",
      [
        "cocoa",
        "coffee"
      ]
    ],
    [
      "adzope",
      "Adzope",
      "CI-ADZ",
      6.11,
      -3.86,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "agboville",
      "Agboville",
      "CI-AGB",
      5.93,
      -4.22,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "biankouma",
      "Biankouma",
      "CI-BIA",
      7.74,
      -7.62,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "bondoukou",
      "Bondoukou",
      "CI-BDK",
      8.04,
      -2.8,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bouafle",
      "Bouafle",
      "CI-BFL",
      6.99,
      -5.75,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "bouake",
      "Bouake",
      "CI-BKE",
      7.69,
      -5.03,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "yamoussoukro",
      "Yamoussoukro",
      "CI-BKE",
      6.82,
      -5.28,
      "city",
      [
        "administration"
      ]
    ],
    [
      "bouna",
      "Bouna",
      "CI-BNA",
      9.27,
      -3.0,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "boundiali",
      "Boundiali",
      "CI-BDL",
      9.52,
      -6.49,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "dabakala",
      "Dabakala",
      "CI-DBK",
      8.36,
      -4.43,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "daloa",
      "Daloa",
      "CI-DLA",
      6.88,
      -6.45,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "danane",
      "Danane",
      "CI-DAN",
      7.26,
      -8.16,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "dimbokro",
      "Dimbokro",
      "CI-DMK",
      6.65,
      -4.71,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "divo",
      "Divo",
      "CI-DIV",
      5.84,
      -5.36,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "ferke",
      "Ferkessedougou",
      "CI-FER",
      9.59,
      -5.2,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "gagnoa",
      "Gagnoa",
      "CI-GAG",
      6.13,
      -5.95,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "guiglo",
      "Guiglo",
      "CI-GUI",
      6.54,
      -7.49,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "issia",
      "Issia",
      "CI-ISS",
      6.49,
      -6.59,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "katiola",
      "Katiola",
      "CI-KAT",
      8.14,
      -5.1,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "korhogo",
      "Korhogo",
      "CI-KOR",
      9.46,
      -5.63,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "lakota",
      "Lakota",
      "CI-LAK",
      5.85,
      -5.68,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "man",
      "Man",
      "CI-MAN",
      7.41,
      -7.55,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "mankono",
      "Mankono",
      "CI-MNK",
      8.06,
      -6.19,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "odienne",
      "Odienne",
      "CI-ODI",
      9.51,
      -7.56,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "oume",
      "Oume",
      "CI-OUM",
      6.38,
      -5.42,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "sassandra",
      "Sassandra",
      "CI-SAS",
      4.95,
      -6.08,
      "capital",
      [
        "cocoa",
        "fisheries"
      ]
    ],
    [
      "san_pedro",
      "San-Pedro",
      "CI-SAS",
      4.75,
      -6.64,
      "city",
      [
        "port",
        "cocoa"
      ]
    ],
    [
      "seguela",
      "Seguela",
      "CI-SEG",
      7.96,
      -6.67,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "soubre",
      "Soubre",
      "CI-SOU",
      5.79,
      -6.61,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "tabou",
      "Tabou",
      "CI-TAB",
      4.42,
      -7.35,
      "capital",
      [
        "timber",
        "fisheries"
      ]
    ],
    [
      "tingrela",
      "Tingrela",
      "CI-TIN",
      10.48,
      -6.41,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "touba",
      "Touba",
      "CI-TOU",
      8.28,
      -7.68,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "zuenoula",
      "Zuenoula",
      "CI-ZUE",
      7.43,
      -6.05,
      "capital",
      [
        "cotton"
      ]
    ]
  ],
  "links": [
    [
      "abidjan",
      "bouake",
      "rail",
      "RAN"
    ],
    [
      "bouake",
      "ferke",
      "rail",
      "RAN"
    ],
    [
      "divo",
      "lakota",
      "road",
      "national road"
    ],
    [
      "biankouma",
      "man",
      "road",
      "national road"
    ],
    [
      "lakota",
      "gagnoa",
      "road",
      "national road"
    ],
    [
      "adzope",
      "agboville",
      "road",
      "national road"
    ],
    [
      "daloa",
      "issia",
      "road",
      "national road"
    ],
    [
      "ferke",
      "korhogo",
      "road",
      "national road"
    ],
    [
      "bouake",
      "katiola",
      "road",
      "national road"
    ],
    [
      "yamoussoukro",
      "oume",
      "road",
      "national road"
    ],
    [
      "mankono",
      "seguela",
      "road",
      "national road"
    ],
    [
      "bouafle",
      "yamoussoukro",
      "road",
      "national road"
    ],
    [
      "bouafle",
      "zuenoula",
      "road",
      "national road"
    ],
    [
      "biankouma",
      "touba",
      "road",
      "national road"
    ],
    [
      "oume",
      "divo",
      "road",
      "national road"
    ],
    [
      "sassandra",
      "san_pedro",
      "road",
      "national road"
    ],
    [
      "yamoussoukro",
      "dimbokro",
      "road",
      "national road"
    ],
    [
      "abidjan",
      "agboville",
      "road",
      "national road"
    ],
    [
      "man",
      "danane",
      "road",
      "national road"
    ],
    [
      "zuenoula",
      "mankono",
      "road",
      "national road"
    ],
    [
      "zuenoula",
      "daloa",
      "road",
      "national road"
    ],
    [
      "issia",
      "soubre",
      "road",
      "national road"
    ],
    [
      "katiola",
      "dabakala",
      "road",
      "national road"
    ],
    [
      "adzope",
      "abengourou",
      "road",
      "national road"
    ],
    [
      "san_pedro",
      "tabou",
      "road",
      "national road"
    ],
    [
      "abidjan",
      "aboisso",
      "road",
      "national road"
    ],
    [
      "korhogo",
      "boundiali",
      "road",
      "national road"
    ],
    [
      "agboville",
      "dimbokro",
      "road",
      "national road"
    ],
    [
      "man",
      "guiglo",
      "road",
      "national road"
    ],
    [
      "issia",
      "guiglo",
      "road",
      "national road"
    ],
    [
      "boundiali",
      "tingrela",
      "road",
      "national road"
    ],
    [
      "lakota",
      "sassandra",
      "road",
      "national road"
    ],
    [
      "boundiali",
      "odienne",
      "road",
      "national road"
    ],
    [
      "bondoukou",
      "bouna",
      "road",
      "national road"
    ],
    [
      "abengourou",
      "bondoukou",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "ci_0",
    "name": "Aya Coulibaly",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Côte d'Ivoire, posted at abidjan (ci_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ci.abidjan"
  },
  {
    "id": "ci_1",
    "name": "Koffi Nguessan",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Côte d'Ivoire, posted at abengourou (ci_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ci.abengourou"
  },
  {
    "id": "ci_2",
    "name": "Adjoua Bamba",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Côte d'Ivoire, posted at aboisso (ci_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ci.aboisso"
  },
  {
    "id": "ci_3",
    "name": "Kouame Assi",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Côte d'Ivoire, posted at adzope (ci_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ci.adzope"
  },
  {
    "id": "ci_4",
    "name": "Affoue Gnahore",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Côte d'Ivoire, posted at agboville (ci_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ci.agboville"
  },
  {
    "id": "ci_5",
    "name": "Yao Kouadio",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional Front commander of Côte d'Ivoire, posted at biankouma (ci_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ci.biankouma"
  },
  {
    "id": "ci_6",
    "name": "Amoin Kone",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 68,
    "int": 42,
    "pol": 30,
    "chr": 32,
    "personality": "merchant",
    "bio": "Fictional Front commander of Côte d'Ivoire, posted at bondoukou (ci_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ci.bondoukou"
  }
])
});

export const GHANA_REGION = land({
  "id": "gh",
  "name": "Ghana",
  "country": "GH",
  "bbox": {
    "minLon": -3.25,
    "maxLon": 1.22,
    "minLat": 4.15,
    "maxLat": 11.54
  },
  "notes": "Atlas only. Ten regions. Upper West has existed since 1983. Cocoa and gold are Ashanti; Obuasi stands for the gold belt. Occupied and off the week-0 march.",
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
      "id": "GH-AS",
      "name": "Ashanti",
      "kind": "region",
      "group": null
    },
    {
      "id": "GH-BA",
      "name": "Brong-Ahafo",
      "kind": "region",
      "group": null
    },
    {
      "id": "GH-CE",
      "name": "Central",
      "kind": "region",
      "group": null
    },
    {
      "id": "GH-EA",
      "name": "Eastern",
      "kind": "region",
      "group": null
    },
    {
      "id": "GH-GA",
      "name": "Greater Accra",
      "kind": "region",
      "group": null
    },
    {
      "id": "GH-NO",
      "name": "Northern",
      "kind": "region",
      "group": null
    },
    {
      "id": "GH-UE",
      "name": "Upper East",
      "kind": "region",
      "group": null
    },
    {
      "id": "GH-UW",
      "name": "Upper West",
      "kind": "region",
      "group": null
    },
    {
      "id": "GH-VO",
      "name": "Volta",
      "kind": "region",
      "group": null
    },
    {
      "id": "GH-WE",
      "name": "Western",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "kumasi",
      "Kumasi",
      "GH-AS",
      6.69,
      -1.62,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "obuasi",
      "Obuasi",
      "GH-AS",
      6.2,
      -1.67,
      "city",
      [
        "gold"
      ]
    ],
    [
      "sunyani",
      "Sunyani",
      "GH-BA",
      7.34,
      -2.33,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "cape_coast",
      "Cape Coast",
      "GH-CE",
      5.1,
      -1.25,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "koforidua",
      "Koforidua",
      "GH-EA",
      6.09,
      -0.26,
      "capital",
      [
        "cocoa",
        "diamonds"
      ]
    ],
    [
      "accra",
      "Accra",
      "GH-GA",
      5.6,
      -0.19,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "tamale",
      "Tamale",
      "GH-NO",
      9.4,
      -0.84,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "bolgatanga",
      "Bolgatanga",
      "GH-UE",
      10.79,
      -0.85,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "wa",
      "Wa",
      "GH-UW",
      10.06,
      -2.5,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "ho",
      "Ho",
      "GH-VO",
      6.61,
      0.47,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "takoradi",
      "Takoradi",
      "GH-WE",
      4.9,
      -1.75,
      "capital",
      [
        "port",
        "cocoa"
      ]
    ]
  ],
  "links": [
    [
      "kumasi",
      "obuasi",
      "road",
      "national road"
    ],
    [
      "koforidua",
      "accra",
      "road",
      "national road"
    ],
    [
      "cape_coast",
      "takoradi",
      "road",
      "national road"
    ],
    [
      "koforidua",
      "ho",
      "road",
      "national road"
    ],
    [
      "kumasi",
      "sunyani",
      "road",
      "national road"
    ],
    [
      "cape_coast",
      "accra",
      "road",
      "national road"
    ],
    [
      "obuasi",
      "cape_coast",
      "road",
      "national road"
    ],
    [
      "tamale",
      "bolgatanga",
      "road",
      "national road"
    ],
    [
      "tamale",
      "wa",
      "road",
      "national road"
    ],
    [
      "sunyani",
      "tamale",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "gh_0",
    "name": "Akua Mensah",
    "title": "President",
    "rank": "President",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional President of Ghana, posted at accra (gh_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gh.accra"
  },
  {
    "id": "gh_1",
    "name": "Kofi Boateng",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Ghana, posted at bolgatanga (gh_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gh.bolgatanga"
  },
  {
    "id": "gh_2",
    "name": "Ama Owusu",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Ghana, posted at cape coast (gh_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gh.cape_coast"
  },
  {
    "id": "gh_3",
    "name": "Kwesi Asante",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Ghana, posted at ho (gh_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gh.ho"
  },
  {
    "id": "gh_4",
    "name": "Esi Darko",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Ghana, posted at koforidua (gh_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "gh.koforidua"
  }
])
});

export const TOGO_REGION = land({
  "id": "tg",
  "name": "Togo",
  "country": "TG",
  "bbox": {
    "minLon": -0.54,
    "maxLon": 1.98,
    "minLat": 5.42,
    "maxLat": 11.61
  },
  "notes": "Atlas only. Five regions. Kara has existed since 1981. Phosphate is the coastal belt. Occupied and off the week-0 march.",
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
      "id": "TG-MA",
      "name": "Maritime",
      "kind": "region",
      "group": null
    },
    {
      "id": "TG-PL",
      "name": "Plateaux",
      "kind": "region",
      "group": null
    },
    {
      "id": "TG-CE",
      "name": "Centrale",
      "kind": "region",
      "group": null
    },
    {
      "id": "TG-KA",
      "name": "Kara",
      "kind": "region",
      "group": null
    },
    {
      "id": "TG-SA",
      "name": "Savanes",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "lome",
      "Lome",
      "TG-MA",
      6.17,
      1.23,
      "capital",
      [
        "administration",
        "port",
        "phosphate"
      ]
    ],
    [
      "atakpame",
      "Atakpame",
      "TG-PL",
      7.53,
      1.13,
      "capital",
      [
        "cocoa",
        "coffee"
      ]
    ],
    [
      "sokode",
      "Sokode",
      "TG-CE",
      8.98,
      1.13,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "kara",
      "Kara",
      "TG-KA",
      9.55,
      1.19,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "dapaong",
      "Dapaong",
      "TG-SA",
      10.86,
      0.21,
      "capital",
      [
        "sorghum"
      ]
    ]
  ],
  "links": [
    [
      "sokode",
      "kara",
      "road",
      "national road"
    ],
    [
      "lome",
      "atakpame",
      "road",
      "national road"
    ],
    [
      "atakpame",
      "sokode",
      "road",
      "national road"
    ],
    [
      "kara",
      "dapaong",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "tg_0",
    "name": "Afiwa Dogbe",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Togo, posted at lome (tg_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "tg.lome"
  },
  {
    "id": "tg_1",
    "name": "Kodjo Agbeko",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Togo, posted at atakpame (tg_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "tg.atakpame"
  },
  {
    "id": "tg_2",
    "name": "Akossiwa Mensah",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional Field officer of Togo, posted at dapaong (tg_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "tg.dapaong"
  }
])
});

export const BENIN_REGION = land({
  "id": "bj",
  "name": "Benin",
  "country": "BJ",
  "bbox": {
    "minLon": 0.63,
    "maxLon": 3.38,
    "minLat": 5.62,
    "maxLat": 11.05
  },
  "notes": "Atlas only. Six departements. The 1999 split into twelve is not drawn. Porto-Novo is the capital and Cotonou is the port. Occupied and off the week-0 march.",
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
      "id": "BJ-AK",
      "name": "Atakora",
      "kind": "departement",
      "group": null
    },
    {
      "id": "BJ-AQ",
      "name": "Atlantique",
      "kind": "departement",
      "group": null
    },
    {
      "id": "BJ-BO",
      "name": "Borgou",
      "kind": "departement",
      "group": null
    },
    {
      "id": "BJ-MO",
      "name": "Mono",
      "kind": "departement",
      "group": null
    },
    {
      "id": "BJ-OU",
      "name": "Oueme",
      "kind": "departement",
      "group": null
    },
    {
      "id": "BJ-ZO",
      "name": "Zou",
      "kind": "departement",
      "group": null
    }
  ],
  "cities": [
    [
      "natitingou",
      "Natitingou",
      "BJ-AK",
      10.3,
      1.38,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "cotonou",
      "Cotonou",
      "BJ-AQ",
      6.37,
      2.43,
      "capital",
      [
        "port",
        "fisheries",
        "cotton"
      ]
    ],
    [
      "parakou",
      "Parakou",
      "BJ-BO",
      9.34,
      2.62,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "lokossa",
      "Lokossa",
      "BJ-MO",
      6.64,
      1.72,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "porto_novo",
      "Porto-Novo",
      "BJ-OU",
      6.5,
      2.63,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "abomey",
      "Abomey",
      "BJ-ZO",
      7.18,
      1.99,
      "capital",
      [
        "cotton"
      ]
    ]
  ],
  "links": [
    [
      "cotonou",
      "porto_novo",
      "road",
      "national road"
    ],
    [
      "lokossa",
      "abomey",
      "road",
      "national road"
    ],
    [
      "cotonou",
      "lokossa",
      "road",
      "national road"
    ],
    [
      "natitingou",
      "parakou",
      "road",
      "national road"
    ],
    [
      "parakou",
      "abomey",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "bj_0",
    "name": "Awa Sanni",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Benin, posted at porto novo (bj_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bj.porto_novo"
  },
  {
    "id": "bj_1",
    "name": "Codjo Gandonou",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Benin, posted at abomey (bj_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bj.abomey"
  },
  {
    "id": "bj_2",
    "name": "Rita Agossou",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional Field officer of Benin, posted at cotonou (bj_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bj.cotonou"
  }
])
});

export const BURKINA_FASO_REGION = land({
  "id": "bf",
  "name": "Burkina Faso",
  "country": "BF",
  "bbox": {
    "minLon": -5.66,
    "maxLon": 2.54,
    "minLat": 9.58,
    "maxLat": 15.19
  },
  "notes": "Atlas only. Upper Volta became Burkina Faso on 4 August 1984. Thirty provinces of 1984-96. The 45 provinces of 1997 are not drawn. Cotton is the west, and the RAN railway reaches Ouagadougou from Abidjan. Occupied and off the week-0 march.",
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
      "id": "BF-BAM",
      "name": "Bam",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-BAZ",
      "name": "Bazega",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-BGR",
      "name": "Bougouriba",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-BLG",
      "name": "Boulgou",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-BLK",
      "name": "Boulkiemde",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-COM",
      "name": "Comoe",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-GAN",
      "name": "Ganzourgou",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-GNA",
      "name": "Gnagna",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-GOU",
      "name": "Gourma",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-HOU",
      "name": "Houet",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-KAD",
      "name": "Kadiogo",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-KEN",
      "name": "Kenedougou",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-KOS",
      "name": "Kossi",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-KOU",
      "name": "Kouritenga",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-MOU",
      "name": "Mouhoun",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-NAH",
      "name": "Nahouri",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-NAM",
      "name": "Namentenga",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-OUB",
      "name": "Oubritenga",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-OUD",
      "name": "Oudalan",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-PAS",
      "name": "Passore",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-PON",
      "name": "Poni",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-SNG",
      "name": "Sanguie",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-SAN",
      "name": "Sanmatenga",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-SEN",
      "name": "Seno",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-SIS",
      "name": "Sissili",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-SOM",
      "name": "Soum",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-SOR",
      "name": "Sourou",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-TAP",
      "name": "Tapoa",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-YAT",
      "name": "Yatenga",
      "kind": "province",
      "group": null
    },
    {
      "id": "BF-ZOU",
      "name": "Zoundweogo",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "kongoussi",
      "Kongoussi",
      "BF-BAM",
      13.33,
      -1.53,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "kombissiri",
      "Kombissiri",
      "BF-BAZ",
      12.07,
      -1.33,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "diebougou",
      "Diebougou",
      "BF-BGR",
      10.97,
      -3.25,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "tenkodogo",
      "Tenkodogo",
      "BF-BLG",
      11.78,
      -0.37,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "koudougou",
      "Koudougou",
      "BF-BLK",
      12.25,
      -2.37,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "banfora",
      "Banfora",
      "BF-COM",
      10.63,
      -4.76,
      "capital",
      [
        "sugarcane",
        "cotton"
      ]
    ],
    [
      "zorgho",
      "Zorgho",
      "BF-GAN",
      12.25,
      -0.62,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "bogande",
      "Bogande",
      "BF-GNA",
      12.97,
      -0.14,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "fada",
      "Fada Ngourma",
      "BF-GOU",
      12.06,
      0.36,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "bobo",
      "Bobo-Dioulasso",
      "BF-HOU",
      11.18,
      -4.3,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "ouagadougou",
      "Ouagadougou",
      "BF-KAD",
      12.37,
      -1.52,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "orodara",
      "Orodara",
      "BF-KEN",
      10.98,
      -4.91,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "nouna",
      "Nouna",
      "BF-KOS",
      12.73,
      -3.86,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "koupela",
      "Koupela",
      "BF-KOU",
      12.18,
      -0.35,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "dedougou",
      "Dedougou",
      "BF-MOU",
      12.46,
      -3.46,
      "capital",
      [
        "cotton",
        "gold"
      ]
    ],
    [
      "po",
      "Po",
      "BF-NAH",
      11.17,
      -1.15,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "boulsa",
      "Boulsa",
      "BF-NAM",
      12.65,
      -0.58,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "ziniare",
      "Ziniare",
      "BF-OUB",
      12.58,
      -1.3,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "gorom",
      "Gorom-Gorom",
      "BF-OUD",
      14.44,
      -0.23,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "yako",
      "Yako",
      "BF-PAS",
      12.96,
      -2.27,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "gaoua",
      "Gaoua",
      "BF-PON",
      10.33,
      -3.18,
      "capital",
      [
        "gold"
      ]
    ],
    [
      "reo",
      "Reo",
      "BF-SNG",
      12.32,
      -2.47,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "kaya",
      "Kaya",
      "BF-SAN",
      13.09,
      -1.08,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "dori",
      "Dori",
      "BF-SEN",
      14.03,
      -0.03,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "leo",
      "Leo",
      "BF-SIS",
      11.1,
      -2.1,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "djibo",
      "Djibo",
      "BF-SOM",
      14.1,
      -1.63,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "tougan",
      "Tougan",
      "BF-SOR",
      13.07,
      -3.07,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "diapaga",
      "Diapaga",
      "BF-TAP",
      12.07,
      1.79,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "ouahigouya",
      "Ouahigouya",
      "BF-YAT",
      13.58,
      -2.42,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "manga",
      "Manga",
      "BF-ZOU",
      11.67,
      -1.07,
      "capital",
      [
        "sorghum"
      ]
    ]
  ],
  "links": [
    [
      "bobo",
      "ouagadougou",
      "rail",
      "RAN"
    ],
    [
      "koudougou",
      "reo",
      "road",
      "national road"
    ],
    [
      "zorgho",
      "koupela",
      "road",
      "national road"
    ],
    [
      "ouagadougou",
      "ziniare",
      "road",
      "national road"
    ],
    [
      "kombissiri",
      "ouagadougou",
      "road",
      "national road"
    ],
    [
      "banfora",
      "orodara",
      "road",
      "national road"
    ],
    [
      "tenkodogo",
      "koupela",
      "road",
      "national road"
    ],
    [
      "zorgho",
      "boulsa",
      "road",
      "national road"
    ],
    [
      "gorom",
      "dori",
      "road",
      "national road"
    ],
    [
      "kombissiri",
      "manga",
      "road",
      "national road"
    ],
    [
      "nouna",
      "dedougou",
      "road",
      "national road"
    ],
    [
      "manga",
      "po",
      "road",
      "national road"
    ],
    [
      "kongoussi",
      "kaya",
      "road",
      "national road"
    ],
    [
      "boulsa",
      "bogande",
      "road",
      "national road"
    ],
    [
      "kaya",
      "ziniare",
      "road",
      "national road"
    ],
    [
      "yako",
      "ouahigouya",
      "road",
      "national road"
    ],
    [
      "bobo",
      "orodara",
      "road",
      "national road"
    ],
    [
      "diebougou",
      "gaoua",
      "road",
      "national road"
    ],
    [
      "kaya",
      "boulsa",
      "road",
      "national road"
    ],
    [
      "reo",
      "yako",
      "road",
      "national road"
    ],
    [
      "koupela",
      "fada",
      "road",
      "national road"
    ],
    [
      "dedougou",
      "tougan",
      "road",
      "national road"
    ],
    [
      "kongoussi",
      "djibo",
      "road",
      "national road"
    ],
    [
      "yako",
      "tougan",
      "road",
      "national road"
    ],
    [
      "kongoussi",
      "yako",
      "road",
      "national road"
    ],
    [
      "po",
      "leo",
      "road",
      "national road"
    ],
    [
      "bogande",
      "dori",
      "road",
      "national road"
    ],
    [
      "bobo",
      "diebougou",
      "road",
      "national road"
    ],
    [
      "fada",
      "diapaga",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "bf_0",
    "name": "Awa Ouedraogo",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Burkina Faso, posted at ouagadougou (bf_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bf.ouagadougou"
  },
  {
    "id": "bf_1",
    "name": "Issa Sawadogo",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Burkina Faso, posted at banfora (bf_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bf.banfora"
  },
  {
    "id": "bf_2",
    "name": "Rasmata Ilboudo",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Burkina Faso, posted at bobo (bf_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bf.bobo"
  },
  {
    "id": "bf_3",
    "name": "Boureima Zongo",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Burkina Faso, posted at bogande (bf_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bf.bogande"
  },
  {
    "id": "bf_4",
    "name": "Fati Kabore",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Burkina Faso, posted at boulsa (bf_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bf.boulsa"
  },
  {
    "id": "bf_5",
    "name": "Salifou Zabre",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional Front commander of Burkina Faso, posted at dedougou (bf_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bf.dedougou"
  },
  {
    "id": "bf_6",
    "name": "Mariam Congo",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 68,
    "int": 42,
    "pol": 30,
    "chr": 32,
    "personality": "merchant",
    "bio": "Fictional Front commander of Burkina Faso, posted at diapaga (bf_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bf.diapaga"
  }
])
});

export const MALI_REGION = land({
  "id": "ml",
  "name": "Mali",
  "country": "ML",
  "bbox": {
    "minLon": -12.19,
    "maxLon": 0.7,
    "minLat": 10.57,
    "maxLat": 17.52
  },
  "notes": "Atlas only. Seven regions plus the Bamako district. Kidal stays inside Gao until 1991. The Dakar-Niger railway ends at Bamako. The Tanezrouft piste meets Tamanrasset. Occupied and off the week-0 march.",
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
      "id": "ML-BKO",
      "name": "Bamako",
      "kind": "district",
      "group": null
    },
    {
      "id": "ML-KY",
      "name": "Kayes",
      "kind": "region",
      "group": null
    },
    {
      "id": "ML-KL",
      "name": "Koulikoro",
      "kind": "region",
      "group": null
    },
    {
      "id": "ML-SK",
      "name": "Sikasso",
      "kind": "region",
      "group": null
    },
    {
      "id": "ML-SG",
      "name": "Segou",
      "kind": "region",
      "group": null
    },
    {
      "id": "ML-MO",
      "name": "Mopti",
      "kind": "region",
      "group": null
    },
    {
      "id": "ML-TB",
      "name": "Tombouctou",
      "kind": "region",
      "group": null
    },
    {
      "id": "ML-GA",
      "name": "Gao",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "bamako",
      "Bamako",
      "ML-BKO",
      12.64,
      -8.0,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kayes",
      "Kayes",
      "ML-KY",
      14.45,
      -11.44,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "koulikoro",
      "Koulikoro",
      "ML-KL",
      12.86,
      -7.56,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "sikasso",
      "Sikasso",
      "ML-SK",
      11.32,
      -5.67,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "segou",
      "Segou",
      "ML-SG",
      13.43,
      -6.27,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "mopti",
      "Mopti",
      "ML-MO",
      14.48,
      -4.18,
      "capital",
      [
        "rice",
        "cattle"
      ]
    ],
    [
      "timbuktu",
      "Timbuktu",
      "ML-TB",
      16.77,
      -3.01,
      "capital",
      [
        "salt"
      ]
    ],
    [
      "gao",
      "Gao",
      "ML-GA",
      16.27,
      -0.05,
      "capital",
      [
        "cattle"
      ]
    ]
  ],
  "links": [
    [
      "kayes",
      "bamako",
      "rail",
      "Dakar-Niger railway"
    ],
    [
      "bamako",
      "koulikoro",
      "road",
      "national road"
    ],
    [
      "koulikoro",
      "segou",
      "road",
      "national road"
    ],
    [
      "segou",
      "sikasso",
      "road",
      "national road"
    ],
    [
      "segou",
      "mopti",
      "road",
      "national road"
    ],
    [
      "mopti",
      "timbuktu",
      "road",
      "national road"
    ],
    [
      "timbuktu",
      "gao",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "ml_0",
    "name": "Awa Dembele",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Mali, posted at bamako (ml_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ml.bamako"
  },
  {
    "id": "ml_1",
    "name": "Modibo Coulibaly",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Mali, posted at gao (ml_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ml.gao"
  },
  {
    "id": "ml_2",
    "name": "Fatoumata Sidibe",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Mali, posted at kayes (ml_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ml.kayes"
  },
  {
    "id": "ml_3",
    "name": "Seydou Diarra",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Mali, posted at koulikoro (ml_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ml.koulikoro"
  },
  {
    "id": "ml_4",
    "name": "Oumou Sangare",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Mali, posted at mopti (ml_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ml.mopti"
  }
])
});

export const NIGER_REGION = land({
  "id": "ne",
  "name": "Niger",
  "country": "NE",
  "bbox": {
    "minLon": 1.38,
    "maxLon": 13.36,
    "minLat": 12.3,
    "maxLat": 19.49
  },
  "notes": "Atlas only. Seven departements. Tillaberi is not split from Niamey until the 1990s. Uranium is at Arlit. Subdivision ids are NE- so they do not match Nebraska. The Trans-Sahara road meets Tamanrasset at Arlit, and Ghat meets Agadez by the Madama road. Occupied and off the week-0 march.",
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
      "id": "NE-AG",
      "name": "Agadez",
      "kind": "departement",
      "group": null
    },
    {
      "id": "NE-DF",
      "name": "Diffa",
      "kind": "departement",
      "group": null
    },
    {
      "id": "NE-DS",
      "name": "Dosso",
      "kind": "departement",
      "group": null
    },
    {
      "id": "NE-MA",
      "name": "Maradi",
      "kind": "departement",
      "group": null
    },
    {
      "id": "NE-NI",
      "name": "Niamey",
      "kind": "departement",
      "group": null
    },
    {
      "id": "NE-TA",
      "name": "Tahoua",
      "kind": "departement",
      "group": null
    },
    {
      "id": "NE-ZI",
      "name": "Zinder",
      "kind": "departement",
      "group": null
    }
  ],
  "cities": [
    [
      "agadez",
      "Agadez",
      "NE-AG",
      16.97,
      7.99,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "arlit",
      "Arlit",
      "NE-AG",
      18.74,
      7.39,
      "city",
      [
        "uranium"
      ]
    ],
    [
      "diffa",
      "Diffa",
      "NE-DF",
      13.32,
      12.61,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "dosso",
      "Dosso",
      "NE-DS",
      13.05,
      3.19,
      "capital",
      [
        "sorghum"
      ]
    ],
    [
      "maradi",
      "Maradi",
      "NE-MA",
      13.49,
      7.1,
      "capital",
      [
        "peanuts"
      ]
    ],
    [
      "niamey",
      "Niamey",
      "NE-NI",
      13.51,
      2.13,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tahoua",
      "Tahoua",
      "NE-TA",
      14.89,
      5.27,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "zinder",
      "Zinder",
      "NE-ZI",
      13.81,
      8.99,
      "capital",
      [
        "peanuts"
      ]
    ]
  ],
  "links": [
    [
      "dosso",
      "niamey",
      "road",
      "national road"
    ],
    [
      "agadez",
      "arlit",
      "road",
      "national road"
    ],
    [
      "maradi",
      "zinder",
      "road",
      "national road"
    ],
    [
      "maradi",
      "tahoua",
      "road",
      "national road"
    ],
    [
      "dosso",
      "tahoua",
      "road",
      "national road"
    ],
    [
      "agadez",
      "zinder",
      "road",
      "national road"
    ],
    [
      "zinder",
      "diffa",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "ne_0",
    "name": "Amina Moussa",
    "title": "Head of state",
    "rank": "Général",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional Head of state of Niger, posted at niamey (ne_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ne.niamey"
  },
  {
    "id": "ne_1",
    "name": "Issoufou Adamou",
    "title": "Minister of Defense",
    "rank": "Général",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional Minister of Defense of Niger, posted at agadez (ne_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ne.agadez"
  },
  {
    "id": "ne_2",
    "name": "Fatima Seyni",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional Chief of Staff of Niger, posted at arlit (ne_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ne.arlit"
  },
  {
    "id": "ne_3",
    "name": "Boubacar Hama",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional Front commander of Niger, posted at diffa (ne_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ne.diffa"
  },
  {
    "id": "ne_4",
    "name": "Rakia Ousmane",
    "title": "Field officer",
    "rank": "Capitaine",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional Field officer of Niger, posted at dosso (ne_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ne.dosso"
  }
])
});

