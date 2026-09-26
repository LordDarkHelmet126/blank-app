/** Southern Africa, 1985-89. South West Africa stays South African. */
import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const ANGOLA_REGION = land({
  "id": "ao",
  "name": "Angola",
  "country": "AO",
  "bbox": {
    "minLon": 11.4,
    "maxLon": 22.98,
    "minLat": -17.82,
    "maxLat": -4.8
  },
  "notes": "Atlas only. Eighteen provinces, including Bengo since 1980 and the Lunda split. Cabinda is an exclave reached by sea, not by a road through Zaire. The Benguela railway is Lobito-Benguela-Huambo-Kuito-Luena-Dilolo and on to Kolwezi; the eastern stretch was interdicted for much of the decade and the country stays dormant. Front provinces are Cuando Cubango, Moxico, Huambo, Bie, Huila, and Cunene. Oil is Cabinda and Soyo. Diamonds are the Lundas. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "AO-BGO",
      "name": "Bengo",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-BGU",
      "name": "Benguela",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-BIE",
      "name": "Bie",
      "kind": "province",
      "group": "Angolan civil war"
    },
    {
      "id": "AO-CAB",
      "name": "Cabinda",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-CCU",
      "name": "Cuando Cubango",
      "kind": "province",
      "group": "Angolan civil war"
    },
    {
      "id": "AO-CNO",
      "name": "Cuanza Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-CSU",
      "name": "Cuanza Sul",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-CNN",
      "name": "Cunene",
      "kind": "province",
      "group": "Angolan civil war"
    },
    {
      "id": "AO-HUA",
      "name": "Huambo",
      "kind": "province",
      "group": "Angolan civil war"
    },
    {
      "id": "AO-HUI",
      "name": "Huila",
      "kind": "province",
      "group": "Angolan civil war"
    },
    {
      "id": "AO-LUA",
      "name": "Luanda",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-LNO",
      "name": "Lunda Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-LSU",
      "name": "Lunda Sul",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-MAL",
      "name": "Malanje",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-MOX",
      "name": "Moxico",
      "kind": "province",
      "group": "Angolan civil war"
    },
    {
      "id": "AO-NAM",
      "name": "Namibe",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-UIG",
      "name": "Uige",
      "kind": "province",
      "group": null
    },
    {
      "id": "AO-ZAI",
      "name": "Zaire",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "caxito",
      "Caxito",
      "AO-BGO",
      -8.58,
      13.66,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "benguela",
      "Benguela",
      "AO-BGU",
      -12.58,
      13.41,
      "capital",
      [
        "port"
      ]
    ],
    [
      "lobito",
      "Lobito",
      "AO-BGU",
      -12.36,
      13.54,
      "city",
      [
        "port"
      ]
    ],
    [
      "kuito",
      "Kuito",
      "AO-BIE",
      -12.38,
      16.94,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "cabinda",
      "Cabinda",
      "AO-CAB",
      -5.55,
      12.2,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "menongue",
      "Menongue",
      "AO-CCU",
      -14.66,
      17.69,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "ndalatando",
      "Ndalatando",
      "AO-CNO",
      -9.3,
      14.91,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "sumbe",
      "Sumbe",
      "AO-CSU",
      -11.21,
      13.84,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "ondjiva",
      "Ondjiva",
      "AO-CNN",
      -17.07,
      15.73,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "huambo",
      "Huambo",
      "AO-HUA",
      -12.78,
      15.74,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "lubango",
      "Lubango",
      "AO-HUI",
      -14.92,
      13.49,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "luanda",
      "Luanda",
      "AO-LUA",
      -8.84,
      13.23,
      "capital",
      [
        "administration",
        "port",
        "oil"
      ]
    ],
    [
      "dundo",
      "Dundo",
      "AO-LNO",
      -7.38,
      20.83,
      "capital",
      [
        "diamonds"
      ]
    ],
    [
      "saurimo",
      "Saurimo",
      "AO-LSU",
      -9.66,
      20.39,
      "capital",
      [
        "diamonds"
      ]
    ],
    [
      "malanje",
      "Malanje",
      "AO-MAL",
      -9.54,
      16.34,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "luena",
      "Luena",
      "AO-MOX",
      -11.79,
      19.9,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "dilolo",
      "Dilolo",
      "AO-MOX",
      -10.7,
      22.23,
      "city",
      [
        "administration"
      ]
    ],
    [
      "namibe",
      "Namibe",
      "AO-NAM",
      -15.2,
      12.15,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "uige",
      "Uige",
      "AO-UIG",
      -7.62,
      15.06,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "mbanza",
      "Mbanza Kongo",
      "AO-ZAI",
      -6.27,
      14.24,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "soyo",
      "Soyo",
      "AO-ZAI",
      -6.13,
      12.37,
      "city",
      [
        "oil",
        "port"
      ]
    ]
  ],
  "links": [
    [
      "lobito",
      "benguela",
      "rail",
      "Benguela railway"
    ],
    [
      "benguela",
      "huambo",
      "rail",
      "Benguela railway"
    ],
    [
      "huambo",
      "kuito",
      "rail",
      "Benguela railway"
    ],
    [
      "kuito",
      "luena",
      "rail",
      "Benguela railway"
    ],
    [
      "luena",
      "dilolo",
      "rail",
      "Benguela railway"
    ],
    [
      "cabinda",
      "luanda",
      "sea",
      "Cabinda lane"
    ],
    [
      "cabinda",
      "soyo",
      "sea",
      "Cabinda lane"
    ],
    [
      "caxito",
      "luanda",
      "road",
      "national road"
    ],
    [
      "lobito",
      "sumbe",
      "road",
      "national road"
    ],
    [
      "lubango",
      "namibe",
      "road",
      "national road"
    ],
    [
      "caxito",
      "ndalatando",
      "road",
      "national road"
    ],
    [
      "ndalatando",
      "malanje",
      "road",
      "national road"
    ],
    [
      "uige",
      "mbanza",
      "road",
      "national road"
    ],
    [
      "ndalatando",
      "uige",
      "road",
      "national road"
    ],
    [
      "dilolo",
      "saurimo",
      "road",
      "national road"
    ],
    [
      "ndalatando",
      "sumbe",
      "road",
      "national road"
    ],
    [
      "saurimo",
      "dundo",
      "road",
      "national road"
    ],
    [
      "benguela",
      "lubango",
      "road",
      "national road"
    ],
    [
      "kuito",
      "menongue",
      "road",
      "national road"
    ],
    [
      "lubango",
      "ondjiva",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "ao_0",
    "name": "Maria Fernandes",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ao.luanda"
  },
  {
    "id": "ao_1",
    "name": "Pedro Lopes",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ao.benguela"
  },
  {
    "id": "ao_2",
    "name": "Ana Carvalho",
    "title": "Chief of Staff",
    "rank": "Coronel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ao.cabinda"
  },
  {
    "id": "ao_3",
    "name": "Joaquim Henriques",
    "title": "Front commander",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ao.caxito"
  },
  {
    "id": "ao_4",
    "name": "Beatriz Domingos",
    "title": "Field officer",
    "rank": "Capitão",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ao.dilolo"
  },
  {
    "id": "ao_5",
    "name": "Carlos Miguel",
    "title": "Front commander",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ao.dundo"
  }
])
});

export const ZAMBIA_REGION = land({
  "id": "zm",
  "name": "Zambia",
  "country": "ZM",
  "bbox": {
    "minLon": 22.4,
    "maxLon": 33.4,
    "minLat": -18.59,
    "maxLat": -9.46
  },
  "notes": "Atlas only. Nine provinces. Copper is the Copperbelt. TAZARA ends at Kapiri Mposhi, not Lusaka. Zambia Railways runs Kapiri Mposhi-Lusaka-Ndola and Ndola-Lubumbashi. Kariba hydro is pinned on Livingstone. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "ZM-CE",
      "name": "Central",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZM-CB",
      "name": "Copperbelt",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZM-EA",
      "name": "Eastern",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZM-LP",
      "name": "Luapula",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZM-LS",
      "name": "Lusaka",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZM-NO",
      "name": "Northern",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZM-NW",
      "name": "North-Western",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZM-SO",
      "name": "Southern",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZM-WE",
      "name": "Western",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "kabwe",
      "Kabwe",
      "ZM-CE",
      -14.45,
      28.45,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kapiri",
      "Kapiri Mposhi",
      "ZM-CE",
      -13.97,
      28.67,
      "city",
      [
        "administration"
      ]
    ],
    [
      "ndola",
      "Ndola",
      "ZM-CB",
      -12.97,
      28.63,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "kitwe",
      "Kitwe",
      "ZM-CB",
      -12.8,
      28.21,
      "city",
      [
        "copper"
      ]
    ],
    [
      "chipata",
      "Chipata",
      "ZM-EA",
      -13.63,
      32.65,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "mansa",
      "Mansa",
      "ZM-LP",
      -11.2,
      28.89,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "lusaka",
      "Lusaka",
      "ZM-LS",
      -15.42,
      28.28,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kasama",
      "Kasama",
      "ZM-NO",
      -10.21,
      31.18,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "solwezi",
      "Solwezi",
      "ZM-NW",
      -12.18,
      26.39,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "livingstone",
      "Livingstone",
      "ZM-SO",
      -17.84,
      25.86,
      "capital",
      [
        "hydro"
      ]
    ],
    [
      "mongu",
      "Mongu",
      "ZM-WE",
      -15.25,
      23.15,
      "capital",
      [
        "cattle"
      ]
    ]
  ],
  "links": [
    [
      "ndola",
      "kitwe",
      "road",
      "national road"
    ],
    [
      "kabwe",
      "kapiri",
      "road",
      "national road"
    ],
    [
      "kabwe",
      "lusaka",
      "road",
      "national road"
    ],
    [
      "kapiri",
      "ndola",
      "road",
      "national road"
    ],
    [
      "kitwe",
      "mansa",
      "road",
      "national road"
    ],
    [
      "kitwe",
      "solwezi",
      "road",
      "national road"
    ],
    [
      "mansa",
      "kasama",
      "road",
      "national road"
    ],
    [
      "lusaka",
      "livingstone",
      "road",
      "national road"
    ],
    [
      "kasama",
      "chipata",
      "road",
      "national road"
    ],
    [
      "livingstone",
      "mongu",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "zm_0",
    "name": "Mutale Phiri",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zm.lusaka"
  },
  {
    "id": "zm_1",
    "name": "Bwalya Zulu",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zm.chipata"
  },
  {
    "id": "zm_2",
    "name": "Chanda Mulenga",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zm.kabwe"
  },
  {
    "id": "zm_3",
    "name": "Mwansa Ngoma",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zm.kapiri"
  },
  {
    "id": "zm_4",
    "name": "Bupe Sakala",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zm.kasama"
  }
])
});

export const MALAWI_REGION = land({
  "id": "mw",
  "name": "Malawi",
  "country": "MW",
  "bbox": {
    "minLon": 33.04,
    "maxLon": 36.07,
    "minLat": -16.54,
    "maxLat": -10.71
  },
  "notes": "Atlas only. Three regions. The 24 districts are not drawn. Tobacco is the central yield. Tea is mapped as coffee. Lilongwe is the capital. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "MW-NO",
      "name": "Northern",
      "kind": "region",
      "group": null
    },
    {
      "id": "MW-CE",
      "name": "Central",
      "kind": "region",
      "group": null
    },
    {
      "id": "MW-SO",
      "name": "Southern",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "mzuzu",
      "Mzuzu",
      "MW-NO",
      -11.46,
      34.02,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "lilongwe",
      "Lilongwe",
      "MW-CE",
      -13.96,
      33.79,
      "capital",
      [
        "administration",
        "tobacco"
      ]
    ],
    [
      "blantyre",
      "Blantyre",
      "MW-SO",
      -15.79,
      35.01,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zomba",
      "Zomba",
      "MW-SO",
      -15.38,
      35.32,
      "city",
      [
        "coffee"
      ]
    ]
  ],
  "links": [
    [
      "blantyre",
      "zomba",
      "road",
      "national road"
    ],
    [
      "lilongwe",
      "zomba",
      "road",
      "national road"
    ],
    [
      "mzuzu",
      "lilongwe",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "mw_0",
    "name": "Temwa Phiri",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mw.lilongwe"
  },
  {
    "id": "mw_1",
    "name": "Chimwemwe Chirwa",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mw.blantyre"
  },
  {
    "id": "mw_2",
    "name": "Thokozani Mvula",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mw.mzuzu"
  }
])
});

export const MOZAMBIQUE_REGION = land({
  "id": "mz",
  "name": "Mozambique",
  "country": "MZ",
  "bbox": {
    "minLon": 31.71,
    "maxLon": 41.42,
    "minLat": -26.72,
    "maxLat": -12.22
  },
  "notes": "Atlas only. Ten provinces plus Maputo city. Front provinces are Zambezia, Sofala, Manica, Tete, Inhambane, and Gaza, and the country stays dormant. The Beira corridor is the railway to Mutare. The Limpopo line leaves Maputo through Gaza. Ressano Garcia meets Komatipoort. Coal and Cahora Bassa hydro are pinned on Tete. Nacala is the northern port. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "MZ-CD",
      "name": "Cabo Delgado",
      "kind": "province",
      "group": null
    },
    {
      "id": "MZ-GA",
      "name": "Gaza",
      "kind": "province",
      "group": "Mozambican civil war"
    },
    {
      "id": "MZ-IN",
      "name": "Inhambane",
      "kind": "province",
      "group": "Mozambican civil war"
    },
    {
      "id": "MZ-MN",
      "name": "Manica",
      "kind": "province",
      "group": "Mozambican civil war"
    },
    {
      "id": "MZ-MP",
      "name": "Maputo",
      "kind": "province",
      "group": null
    },
    {
      "id": "MZ-MC",
      "name": "Maputo City",
      "kind": "province",
      "group": null
    },
    {
      "id": "MZ-NP",
      "name": "Nampula",
      "kind": "province",
      "group": null
    },
    {
      "id": "MZ-NS",
      "name": "Niassa",
      "kind": "province",
      "group": null
    },
    {
      "id": "MZ-SF",
      "name": "Sofala",
      "kind": "province",
      "group": "Mozambican civil war"
    },
    {
      "id": "MZ-TE",
      "name": "Tete",
      "kind": "province",
      "group": "Mozambican civil war"
    },
    {
      "id": "MZ-ZA",
      "name": "Zambezia",
      "kind": "province",
      "group": "Mozambican civil war"
    }
  ],
  "cities": [
    [
      "pemba",
      "Pemba",
      "MZ-CD",
      -12.97,
      40.52,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "xai_xai",
      "Xai-Xai",
      "MZ-GA",
      -25.05,
      33.64,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "inhambane",
      "Inhambane",
      "MZ-IN",
      -23.87,
      35.38,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "chimoio",
      "Chimoio",
      "MZ-MN",
      -19.12,
      33.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "matola",
      "Matola",
      "MZ-MP",
      -25.96,
      32.46,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "maputo",
      "Maputo",
      "MZ-MC",
      -25.97,
      32.58,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "nampula",
      "Nampula",
      "MZ-NP",
      -15.12,
      39.27,
      "capital",
      [
        "cotton"
      ]
    ],
    [
      "nacala",
      "Nacala",
      "MZ-NP",
      -14.54,
      40.67,
      "city",
      [
        "port"
      ]
    ],
    [
      "lichinga",
      "Lichinga",
      "MZ-NS",
      -13.31,
      35.24,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "beira",
      "Beira",
      "MZ-SF",
      -19.83,
      34.84,
      "capital",
      [
        "port"
      ]
    ],
    [
      "tete",
      "Tete",
      "MZ-TE",
      -16.17,
      33.59,
      "capital",
      [
        "coal",
        "hydro"
      ]
    ],
    [
      "quelimane",
      "Quelimane",
      "MZ-ZA",
      -17.88,
      36.89,
      "capital",
      [
        "port",
        "rice"
      ]
    ]
  ],
  "links": [
    [
      "maputo",
      "xai_xai",
      "rail",
      "Limpopo line"
    ],
    [
      "maputo",
      "matola",
      "road",
      "Matola road"
    ],
    [
      "beira",
      "chimoio",
      "rail",
      "Beira corridor"
    ],
    [
      "maputo",
      "beira",
      "sea",
      "Mozambique Channel"
    ],
    [
      "beira",
      "quelimane",
      "sea",
      "Mozambique Channel"
    ],
    [
      "quelimane",
      "nacala",
      "sea",
      "Mozambique Channel"
    ],
    [
      "nacala",
      "pemba",
      "sea",
      "Mozambique Channel"
    ],
    [
      "nampula",
      "nacala",
      "road",
      "Nacala road"
    ],
    [
      "xai_xai",
      "inhambane",
      "road",
      "national road"
    ],
    [
      "chimoio",
      "tete",
      "road",
      "national road"
    ],
    [
      "tete",
      "lichinga",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "mz_0",
    "name": "Maria Macuacua",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mz.maputo"
  },
  {
    "id": "mz_1",
    "name": "Pedro Langa",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mz.beira"
  },
  {
    "id": "mz_2",
    "name": "Ana Tembe",
    "title": "Chief of Staff",
    "rank": "Coronel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mz.chimoio"
  },
  {
    "id": "mz_3",
    "name": "Joaquim Cossa",
    "title": "Front commander",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mz.inhambane"
  },
  {
    "id": "mz_4",
    "name": "Beatriz Sitoe",
    "title": "Field officer",
    "rank": "Capitão",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "mz.lichinga"
  }
])
});

export const ZIMBABWE_REGION = land({
  "id": "zw",
  "name": "Zimbabwe",
  "country": "ZW",
  "bbox": {
    "minLon": 25.08,
    "maxLon": 33.42,
    "minLat": -21.69,
    "maxLat": -16.55
  },
  "notes": "Atlas only. Zimbabwe since 1980, not Rhodesia. Eight provinces plus the cities of Harare and Bulawayo. Chrome and steel are the Midlands, coal is Hwange, tobacco is Mashonaland. The Beira corridor meets Mutare. The Victoria Falls Bridge meets Livingstone. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "ZW-HA",
      "name": "Harare",
      "kind": "city",
      "group": null
    },
    {
      "id": "ZW-BU",
      "name": "Bulawayo",
      "kind": "city",
      "group": null
    },
    {
      "id": "ZW-MN",
      "name": "Manicaland",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZW-MC",
      "name": "Mashonaland Central",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZW-ME",
      "name": "Mashonaland East",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZW-MW",
      "name": "Mashonaland West",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZW-MV",
      "name": "Masvingo",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZW-MT",
      "name": "Matabeleland North",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZW-MS",
      "name": "Matabeleland South",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZW-MD",
      "name": "Midlands",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "harare",
      "Harare",
      "ZW-HA",
      -17.83,
      31.05,
      "capital",
      [
        "administration",
        "tobacco"
      ]
    ],
    [
      "bulawayo",
      "Bulawayo",
      "ZW-BU",
      -20.15,
      28.58,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mutare",
      "Mutare",
      "ZW-MN",
      -18.97,
      32.67,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "bindura",
      "Bindura",
      "ZW-MC",
      -17.3,
      31.33,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "marondera",
      "Marondera",
      "ZW-ME",
      -18.19,
      31.55,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "chinhoyi",
      "Chinhoyi",
      "ZW-MW",
      -17.37,
      30.2,
      "capital",
      [
        "tobacco"
      ]
    ],
    [
      "masvingo",
      "Masvingo",
      "ZW-MV",
      -20.07,
      30.83,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "lupane",
      "Lupane",
      "ZW-MT",
      -18.93,
      27.77,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "victoria_falls",
      "Victoria Falls",
      "ZW-MT",
      -17.93,
      25.83,
      "city",
      [
        "administration"
      ]
    ],
    [
      "hwange",
      "Hwange",
      "ZW-MT",
      -18.37,
      26.5,
      "city",
      [
        "coal"
      ]
    ],
    [
      "gwanda",
      "Gwanda",
      "ZW-MS",
      -20.94,
      29.0,
      "capital",
      [
        "gold"
      ]
    ],
    [
      "gweru",
      "Gweru",
      "ZW-MD",
      -19.45,
      29.82,
      "capital",
      [
        "chrome",
        "steel"
      ]
    ]
  ],
  "links": [
    [
      "harare",
      "bulawayo",
      "road",
      "main road"
    ],
    [
      "harare",
      "mutare",
      "road",
      "main road"
    ],
    [
      "harare",
      "gweru",
      "road",
      "main road"
    ],
    [
      "gweru",
      "bulawayo",
      "road",
      "main road"
    ],
    [
      "bulawayo",
      "victoria_falls",
      "road",
      "main road"
    ],
    [
      "lupane",
      "hwange",
      "road",
      "Wankie road"
    ],
    [
      "hwange",
      "victoria_falls",
      "road",
      "Wankie road"
    ],
    [
      "harare",
      "bindura",
      "road",
      "national road"
    ],
    [
      "harare",
      "marondera",
      "road",
      "national road"
    ],
    [
      "bulawayo",
      "gwanda",
      "road",
      "national road"
    ],
    [
      "harare",
      "chinhoyi",
      "road",
      "national road"
    ],
    [
      "gweru",
      "masvingo",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "zw_0",
    "name": "Tendai Moyo",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zw.harare"
  },
  {
    "id": "zw_1",
    "name": "Rufaro Ncube",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zw.bindura"
  },
  {
    "id": "zw_2",
    "name": "Tawanda Dube",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zw.bulawayo"
  },
  {
    "id": "zw_3",
    "name": "Chipo Ndlovu",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zw.chinhoyi"
  },
  {
    "id": "zw_4",
    "name": "Farai Mpofu",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "zw.gwanda"
  }
])
});

export const BOTSWANA_REGION = land({
  "id": "bw",
  "name": "Botswana",
  "country": "BW",
  "bbox": {
    "minLon": 20.9,
    "maxLon": 28.26,
    "minLat": -26.77,
    "maxLat": -17.05
  },
  "notes": "Atlas only. Ten districts, including Chobe. Diamonds are the Orapa and Jwaneng belts, pinned on Serowe and Kanye. The Kazungula crossing is still a ferry. Occupied and off the week-0 march.",
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
      "id": "BW-CE",
      "name": "Central",
      "kind": "district",
      "group": null
    },
    {
      "id": "BW-GH",
      "name": "Ghanzi",
      "kind": "district",
      "group": null
    },
    {
      "id": "BW-KG",
      "name": "Kgalagadi",
      "kind": "district",
      "group": null
    },
    {
      "id": "BW-KT",
      "name": "Kgatleng",
      "kind": "district",
      "group": null
    },
    {
      "id": "BW-KW",
      "name": "Kweneng",
      "kind": "district",
      "group": null
    },
    {
      "id": "BW-NE",
      "name": "North-East",
      "kind": "district",
      "group": null
    },
    {
      "id": "BW-NW",
      "name": "North-West",
      "kind": "district",
      "group": null
    },
    {
      "id": "BW-SE",
      "name": "South-East",
      "kind": "district",
      "group": null
    },
    {
      "id": "BW-SO",
      "name": "Southern",
      "kind": "district",
      "group": null
    },
    {
      "id": "BW-CH",
      "name": "Chobe",
      "kind": "district",
      "group": null
    }
  ],
  "cities": [
    [
      "serowe",
      "Serowe",
      "BW-CE",
      -22.39,
      26.71,
      "capital",
      [
        "diamonds",
        "cattle"
      ]
    ],
    [
      "ghanzi",
      "Ghanzi",
      "BW-GH",
      -21.7,
      21.65,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "tsabong",
      "Tsabong",
      "BW-KG",
      -26.02,
      22.41,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "mochudi",
      "Mochudi",
      "BW-KT",
      -24.4,
      26.15,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "molepolole",
      "Molepolole",
      "BW-KW",
      -24.41,
      25.51,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "francistown",
      "Francistown",
      "BW-NE",
      -21.17,
      27.51,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "maun",
      "Maun",
      "BW-NW",
      -19.98,
      23.42,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "gaborone",
      "Gaborone",
      "BW-SE",
      -24.65,
      25.91,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kanye",
      "Kanye",
      "BW-SO",
      -24.98,
      25.35,
      "capital",
      [
        "diamonds"
      ]
    ],
    [
      "kasane",
      "Kasane",
      "BW-CH",
      -17.8,
      25.15,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "mochudi",
      "gaborone",
      "road",
      "national road"
    ],
    [
      "gaborone",
      "molepolole",
      "road",
      "national road"
    ],
    [
      "molepolole",
      "kanye",
      "road",
      "national road"
    ],
    [
      "serowe",
      "francistown",
      "road",
      "national road"
    ],
    [
      "serowe",
      "mochudi",
      "road",
      "national road"
    ],
    [
      "ghanzi",
      "maun",
      "road",
      "national road"
    ],
    [
      "maun",
      "kasane",
      "road",
      "national road"
    ],
    [
      "kanye",
      "tsabong",
      "road",
      "national road"
    ],
    [
      "serowe",
      "maun",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "bw_0",
    "name": "Kabelo Mogotsi",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bw.gaborone"
  },
  {
    "id": "bw_1",
    "name": "Mpho Sebego",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bw.francistown"
  },
  {
    "id": "bw_2",
    "name": "Lesedi Phiri",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bw.ghanzi"
  },
  {
    "id": "bw_3",
    "name": "Tiro Modise",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bw.kanye"
  },
  {
    "id": "bw_4",
    "name": "Boitumelo Keabetswe",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "bw.kasane"
  }
])
});

export const SOUTH_AFRICA_REGION = land({
  "id": "za",
  "name": "South Africa",
  "country": "ZA",
  "bbox": {
    "minLon": 13.09,
    "maxLon": 32.69,
    "minLat": -34.68,
    "maxLat": -16.75
  },
  "notes": "Atlas only. Four provinces: Cape, Natal, Transvaal, and the Orange Free State. The ten homelands are zones, not countries. South West Africa is South African-administered until 1990 and is not a separate country. Walvis Bay stays in the Cape Province. Pretoria is the executive capital. Gold and coal are the Witwatersrand, chrome stands for the Bushveld, diamonds are Kimberley and Luderitz, uranium is Rossing at Swakopmund. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "ZA-CP",
      "name": "Cape Province",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZA-NL",
      "name": "Natal",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZA-TV",
      "name": "Transvaal",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZA-OF",
      "name": "Orange Free State",
      "kind": "province",
      "group": null
    },
    {
      "id": "ZA-TK",
      "name": "Transkei",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-BP",
      "name": "Bophuthatswana",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-VD",
      "name": "Venda",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-CK",
      "name": "Ciskei",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-GZ",
      "name": "Gazankulu",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-KN",
      "name": "KaNgwane",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-KW",
      "name": "KwaNdebele",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-KZ",
      "name": "KwaZulu",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-LB",
      "name": "Lebowa",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-QW",
      "name": "QwaQwa",
      "kind": "zone",
      "group": "Homeland"
    },
    {
      "id": "ZA-WD",
      "name": "Windhoek",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-SW",
      "name": "Swakopmund",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-KH",
      "name": "Keetmanshoop",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-LU",
      "name": "Luderitz",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-TS",
      "name": "Tsumeb",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-GF",
      "name": "Grootfontein",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-GO",
      "name": "Gobabis",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-OW",
      "name": "Owambo",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-KV",
      "name": "Kavango",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-CA",
      "name": "Caprivi",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-KK",
      "name": "Kaokoland",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    },
    {
      "id": "ZA-HE",
      "name": "Hereroland",
      "kind": "district",
      "group": "South West Africa (South African administration)"
    }
  ],
  "cities": [
    [
      "cape_town",
      "Cape Town",
      "ZA-CP",
      -33.93,
      18.42,
      "capital",
      [
        "administration",
        "port",
        "fisheries"
      ]
    ],
    [
      "kimberley",
      "Kimberley",
      "ZA-CP",
      -28.74,
      24.76,
      "capital",
      [
        "diamonds"
      ]
    ],
    [
      "east_london",
      "East London",
      "ZA-CP",
      -33.02,
      27.91,
      "capital",
      [
        "port"
      ]
    ],
    [
      "upington",
      "Upington",
      "ZA-CP",
      -28.45,
      21.26,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "walvis_bay",
      "Walvis Bay",
      "ZA-CP",
      -22.96,
      14.51,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "pietermaritzburg",
      "Pietermaritzburg",
      "ZA-NL",
      -29.6,
      30.38,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "durban",
      "Durban",
      "ZA-NL",
      -29.86,
      31.02,
      "city",
      [
        "port",
        "sugarcane"
      ]
    ],
    [
      "pretoria",
      "Pretoria",
      "ZA-TV",
      -25.75,
      28.19,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "johannesburg",
      "Johannesburg",
      "ZA-TV",
      -26.2,
      28.05,
      "city",
      [
        "gold",
        "coal"
      ]
    ],
    [
      "pietersburg",
      "Pietersburg",
      "ZA-TV",
      -23.9,
      29.45,
      "capital",
      [
        "chrome"
      ]
    ],
    [
      "nelspruit",
      "Nelspruit",
      "ZA-TV",
      -25.47,
      30.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "komatipoort",
      "Komatipoort",
      "ZA-TV",
      -25.44,
      31.94,
      "city",
      [
        "administration"
      ]
    ],
    [
      "messina",
      "Messina",
      "ZA-TV",
      -22.35,
      30.04,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "bloemfontein",
      "Bloemfontein",
      "ZA-OF",
      -29.12,
      26.21,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "welkom",
      "Welkom",
      "ZA-OF",
      -27.98,
      26.73,
      "city",
      [
        "gold"
      ]
    ],
    [
      "umtata",
      "Umtata",
      "ZA-TK",
      -31.59,
      28.78,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mmabatho",
      "Mmabatho",
      "ZA-BP",
      -25.86,
      25.63,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "thohoyandou",
      "Thohoyandou",
      "ZA-VD",
      -22.95,
      30.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bisho",
      "Bisho",
      "ZA-CK",
      -32.84,
      27.44,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "giyani",
      "Giyani",
      "ZA-GZ",
      -23.3,
      30.72,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kanyamazane",
      "KaNyamazane",
      "ZA-KN",
      -25.48,
      31.1,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "siyabuswa",
      "Siyabuswa",
      "ZA-KW",
      -25.12,
      29.05,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ulundi",
      "Ulundi",
      "ZA-KZ",
      -28.34,
      31.42,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "lebowakgomo",
      "Lebowakgomo",
      "ZA-LB",
      -24.2,
      29.5,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "phuthaditjhaba",
      "Phuthaditjhaba",
      "ZA-QW",
      -28.53,
      28.82,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "windhoek",
      "Windhoek",
      "ZA-WD",
      -22.57,
      17.08,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "swakopmund",
      "Swakopmund",
      "ZA-SW",
      -22.68,
      14.53,
      "capital",
      [
        "uranium"
      ]
    ],
    [
      "keetmanshoop",
      "Keetmanshoop",
      "ZA-KH",
      -26.58,
      18.13,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "luderitz",
      "Luderitz",
      "ZA-LU",
      -26.65,
      15.16,
      "capital",
      [
        "diamonds"
      ]
    ],
    [
      "tsumeb",
      "Tsumeb",
      "ZA-TS",
      -19.23,
      17.71,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "grootfontein",
      "Grootfontein",
      "ZA-GF",
      -19.57,
      18.1,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "gobabis",
      "Gobabis",
      "ZA-GO",
      -22.45,
      18.97,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "oshakati",
      "Oshakati",
      "ZA-OW",
      -17.79,
      15.7,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "rundu",
      "Rundu",
      "ZA-KV",
      -17.92,
      19.77,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "katima",
      "Katima Mulilo",
      "ZA-CA",
      -17.5,
      24.27,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "opuwo",
      "Opuwo",
      "ZA-KK",
      -18.06,
      13.84,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "otjiwarongo",
      "Otjiwarongo",
      "ZA-HE",
      -20.46,
      16.65,
      "capital",
      [
        "cattle"
      ]
    ]
  ],
  "links": [
    [
      "pretoria",
      "johannesburg",
      "rail",
      "Pretoria-Johannesburg"
    ],
    [
      "johannesburg",
      "bloemfontein",
      "rail",
      "main line"
    ],
    [
      "bloemfontein",
      "cape_town",
      "rail",
      "main line"
    ],
    [
      "johannesburg",
      "durban",
      "rail",
      "main line"
    ],
    [
      "johannesburg",
      "komatipoort",
      "rail",
      "Ressano Garcia line"
    ],
    [
      "walvis_bay",
      "cape_town",
      "sea",
      "Cape route"
    ],
    [
      "cape_town",
      "durban",
      "sea",
      "Cape route"
    ],
    [
      "swakopmund",
      "walvis_bay",
      "road",
      "coast road"
    ],
    [
      "windhoek",
      "swakopmund",
      "road",
      "B2"
    ],
    [
      "windhoek",
      "otjiwarongo",
      "road",
      "B1"
    ],
    [
      "otjiwarongo",
      "tsumeb",
      "road",
      "B1"
    ],
    [
      "tsumeb",
      "oshakati",
      "road",
      "B1"
    ],
    [
      "tsumeb",
      "grootfontein",
      "road",
      "B8"
    ],
    [
      "grootfontein",
      "rundu",
      "road",
      "B8"
    ],
    [
      "rundu",
      "katima",
      "road",
      "Caprivi road"
    ],
    [
      "otjiwarongo",
      "opuwo",
      "road",
      "C41"
    ],
    [
      "windhoek",
      "gobabis",
      "road",
      "B6"
    ],
    [
      "windhoek",
      "keetmanshoop",
      "road",
      "B1"
    ],
    [
      "keetmanshoop",
      "luderitz",
      "road",
      "B4"
    ],
    [
      "keetmanshoop",
      "upington",
      "road",
      "B1"
    ],
    [
      "upington",
      "kimberley",
      "road",
      "N10"
    ],
    [
      "kimberley",
      "bloemfontein",
      "road",
      "N8"
    ],
    [
      "welkom",
      "bloemfontein",
      "road",
      "N1"
    ],
    [
      "cape_town",
      "east_london",
      "road",
      "N2"
    ],
    [
      "east_london",
      "durban",
      "road",
      "N2"
    ],
    [
      "durban",
      "pietermaritzburg",
      "road",
      "N3"
    ],
    [
      "pietermaritzburg",
      "ulundi",
      "road",
      "Ulundi road"
    ],
    [
      "east_london",
      "umtata",
      "road",
      "N2"
    ],
    [
      "east_london",
      "bisho",
      "road",
      "King Williams Town road"
    ],
    [
      "phuthaditjhaba",
      "bloemfontein",
      "road",
      "QwaQwa road"
    ],
    [
      "siyabuswa",
      "pretoria",
      "road",
      "KwaNdebele road"
    ],
    [
      "thohoyandou",
      "pietersburg",
      "road",
      "N1"
    ],
    [
      "lebowakgomo",
      "pietersburg",
      "road",
      "Lebowa road"
    ],
    [
      "giyani",
      "pietersburg",
      "road",
      "Gazankulu road"
    ],
    [
      "kanyamazane",
      "nelspruit",
      "road",
      "KaNgwane road"
    ],
    [
      "nelspruit",
      "komatipoort",
      "road",
      "N4"
    ],
    [
      "mmabatho",
      "johannesburg",
      "road",
      "Mafikeng road"
    ],
    [
      "pietersburg",
      "messina",
      "road",
      "N1"
    ],
    [
      "siyabuswa",
      "lebowakgomo",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "za_0",
    "name": "Pieter Venter",
    "title": "Head of state",
    "rank": "General",
    "branch": "State administration",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "za.pretoria"
  },
  {
    "id": "za_1",
    "name": "Nomsa Nkosi",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Defence Force",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "za.bisho"
  },
  {
    "id": "za_2",
    "name": "Hendrik Pretorius",
    "title": "Chief of Staff",
    "rank": "Lieutenant General",
    "branch": "Defence Force",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "za.bloemfontein"
  },
  {
    "id": "za_3",
    "name": "Thandi Mokoena",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Defence Force",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "za.cape_town"
  },
  {
    "id": "za_4",
    "name": "Johan van Wyk",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Defence Force",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "za.durban"
  },
  {
    "id": "za_5",
    "name": "Lindiwe Khumalo",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Defence Force",
    "slot": "front_commander",
    "war": 67,
    "int": 40,
    "pol": 32,
    "chr": 34,
    "personality": "schemer",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "za.east_london"
  },
  {
    "id": "za_6",
    "name": "Willem du Plessis",
    "title": "Front commander",
    "rank": "Commandant",
    "branch": "Defence Force",
    "slot": "front_commander",
    "war": 68,
    "int": 42,
    "pol": 30,
    "chr": 32,
    "personality": "merchant",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "za.giyani"
  }
])
});

export const LESOTHO_REGION = land({
  "id": "ls",
  "name": "Lesotho",
  "country": "LS",
  "bbox": {
    "minLon": 26.49,
    "maxLon": 29.82,
    "minLat": -31.15,
    "maxLat": -28.02
  },
  "notes": "Atlas only. Ten districts. The Maseru Bridge meets the Orange Free State. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "LS-BE",
      "name": "Berea",
      "kind": "district",
      "group": null
    },
    {
      "id": "LS-BB",
      "name": "Butha-Buthe",
      "kind": "district",
      "group": null
    },
    {
      "id": "LS-LE",
      "name": "Leribe",
      "kind": "district",
      "group": null
    },
    {
      "id": "LS-MF",
      "name": "Mafeteng",
      "kind": "district",
      "group": null
    },
    {
      "id": "LS-MS",
      "name": "Maseru",
      "kind": "district",
      "group": null
    },
    {
      "id": "LS-MH",
      "name": "Mohales Hoek",
      "kind": "district",
      "group": null
    },
    {
      "id": "LS-MK",
      "name": "Mokhotlong",
      "kind": "district",
      "group": null
    },
    {
      "id": "LS-QN",
      "name": "Qachas Nek",
      "kind": "district",
      "group": null
    },
    {
      "id": "LS-QT",
      "name": "Quthing",
      "kind": "district",
      "group": null
    },
    {
      "id": "LS-TT",
      "name": "Thaba-Tseka",
      "kind": "district",
      "group": null
    }
  ],
  "cities": [
    [
      "teyateyaneng",
      "Teyateyaneng",
      "LS-BE",
      -29.15,
      27.75,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "butha_buthe",
      "Butha-Buthe",
      "LS-BB",
      -28.77,
      28.25,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "hlotse",
      "Hlotse",
      "LS-LE",
      -28.87,
      28.05,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mafeteng",
      "Mafeteng",
      "LS-MF",
      -29.82,
      27.24,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "maseru",
      "Maseru",
      "LS-MS",
      -29.31,
      27.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mohales_hoek",
      "Mohales Hoek",
      "LS-MH",
      -30.15,
      27.48,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "mokhotlong",
      "Mokhotlong",
      "LS-MK",
      -29.29,
      29.07,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "qachas_nek",
      "Qachas Nek",
      "LS-QN",
      -30.12,
      28.69,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "quthing",
      "Quthing",
      "LS-QT",
      -30.4,
      27.7,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "thaba_tseka",
      "Thaba-Tseka",
      "LS-TT",
      -29.52,
      28.61,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "butha_buthe",
      "hlotse",
      "road",
      "national road"
    ],
    [
      "teyateyaneng",
      "maseru",
      "road",
      "national road"
    ],
    [
      "mohales_hoek",
      "quthing",
      "road",
      "national road"
    ],
    [
      "mafeteng",
      "mohales_hoek",
      "road",
      "national road"
    ],
    [
      "teyateyaneng",
      "hlotse",
      "road",
      "national road"
    ],
    [
      "mokhotlong",
      "thaba_tseka",
      "road",
      "national road"
    ],
    [
      "maseru",
      "mafeteng",
      "road",
      "national road"
    ],
    [
      "thaba_tseka",
      "qachas_nek",
      "road",
      "national road"
    ],
    [
      "butha_buthe",
      "thaba_tseka",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "ls_0",
    "name": "Palesa Mohapi",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ls.maseru"
  },
  {
    "id": "ls_1",
    "name": "Lehlohonolo Ralitsoele",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ls.butha_buthe"
  },
  {
    "id": "ls_2",
    "name": "Mpho Nkuebe",
    "title": "Chief of Staff",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 48,
    "pol": 38,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ls.hlotse"
  },
  {
    "id": "ls_3",
    "name": "Teboho Mokete",
    "title": "Front commander",
    "rank": "Colonel",
    "branch": "Armed Forces",
    "slot": "front_commander",
    "war": 69,
    "int": 42,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ls.mafeteng"
  },
  {
    "id": "ls_4",
    "name": "Lineo Sephiri",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 39,
    "pol": 29,
    "chr": 30,
    "personality": "ambitious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "ls.mohales_hoek"
  }
])
});

export const SWAZILAND_REGION = land({
  "id": "sz",
  "name": "Swaziland",
  "country": "SZ",
  "bbox": {
    "minLon": 30.39,
    "maxLon": 32.7,
    "minLat": -27.87,
    "maxLat": -25.57
  },
  "notes": "Atlas only. Four districts. The name is still Swaziland. Sugar is the lowveld. Oshoek meets Nelspruit and the Goba road meets Maputo. Occupied and off the week-0 march.",
  "defaultBiome": "savanna",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "SZ-HH",
      "name": "Hhohho",
      "kind": "district",
      "group": null
    },
    {
      "id": "SZ-LU",
      "name": "Lubombo",
      "kind": "district",
      "group": null
    },
    {
      "id": "SZ-MA",
      "name": "Manzini",
      "kind": "district",
      "group": null
    },
    {
      "id": "SZ-SH",
      "name": "Shiselweni",
      "kind": "district",
      "group": null
    }
  ],
  "cities": [
    [
      "mbabane",
      "Mbabane",
      "SZ-HH",
      -26.32,
      31.14,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "siteki",
      "Siteki",
      "SZ-LU",
      -26.45,
      31.95,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "manzini",
      "Manzini",
      "SZ-MA",
      -26.5,
      31.38,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "nhlangano",
      "Nhlangano",
      "SZ-SH",
      -27.12,
      31.2,
      "capital",
      [
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "mbabane",
      "manzini",
      "road",
      "national road"
    ],
    [
      "manzini",
      "siteki",
      "road",
      "national road"
    ],
    [
      "manzini",
      "nhlangano",
      "road",
      "national road"
    ]
  ],
  "officers": staff([
  {
    "id": "sz_0",
    "name": "Themba Ginindza",
    "title": "Head of state",
    "rank": "General",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 34,
    "int": 64,
    "pol": 68,
    "chr": 56,
    "personality": "diplomat",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sz.mbabane"
  },
  {
    "id": "sz_1",
    "name": "Nomcebo Simelane",
    "title": "Minister of Defense",
    "rank": "General",
    "branch": "Armed Forces",
    "slot": "defense_minister",
    "war": 61,
    "int": 51,
    "pol": 41,
    "chr": 46,
    "personality": "cautious",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sz.manzini"
  },
  {
    "id": "sz_2",
    "name": "Sibusiso Hlophe",
    "title": "Field officer",
    "rank": "Major",
    "branch": "Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 38,
    "pol": 30,
    "chr": 30,
    "personality": "loyalist",
    "bio": "Fictional officer. Not a real officeholder of 1985-89.",
    "region": "sz.nhlangano"
  }
])
});

