import { buildRegion, staff } from "../build-region.js";

function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const NETHERLANDS_REGION = land({
  id: "nl",
  name: "Netherlands",
  country: "NL",
  bbox: {"minLon": 2.21, "maxLon": 7.97, "minLat": 49.45, "maxLat": 54.62},
  notes: "Atlas only. Twelve provinces. Flevoland became a province on 1 January 1986; it is drawn because it exists for most of this span. Groningen gas and Rotterdam are the strategic yields. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "NL-GR",
    "name": "Groningen",
    "kind": "province"
  },
  {
    "id": "NL-FR",
    "name": "Friesland",
    "kind": "province"
  },
  {
    "id": "NL-DR",
    "name": "Drenthe",
    "kind": "province"
  },
  {
    "id": "NL-OV",
    "name": "Overijssel",
    "kind": "province"
  },
  {
    "id": "NL-GE",
    "name": "Gelderland",
    "kind": "province"
  },
  {
    "id": "NL-UT",
    "name": "Utrecht",
    "kind": "province"
  },
  {
    "id": "NL-NH",
    "name": "North Holland",
    "kind": "province"
  },
  {
    "id": "NL-ZH",
    "name": "South Holland",
    "kind": "province"
  },
  {
    "id": "NL-ZE",
    "name": "Zeeland",
    "kind": "province"
  },
  {
    "id": "NL-NB",
    "name": "North Brabant",
    "kind": "province"
  },
  {
    "id": "NL-LI",
    "name": "Limburg",
    "kind": "province"
  },
  {
    "id": "NL-FL",
    "name": "Flevoland",
    "kind": "province"
  }
],
  cities: [
  [
    "groningen",
    "Groningen",
    "NL-GR",
    53.219,
    6.567,
    "capital",
    [
      "natural_gas"
    ]
  ],
  [
    "leeuwarden",
    "Leeuwarden",
    "NL-FR",
    53.202,
    5.799,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "assen",
    "Assen",
    "NL-DR",
    52.992,
    6.565,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "zwolle",
    "Zwolle",
    "NL-OV",
    52.516,
    6.083,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "arnhem",
    "Arnhem",
    "NL-GE",
    51.985,
    5.898,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "utrecht",
    "Utrecht",
    "NL-UT",
    52.091,
    5.122,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "haarlem",
    "Haarlem",
    "NL-NH",
    52.388,
    4.637,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "amsterdam",
    "Amsterdam",
    "NL-NH",
    52.37,
    4.895,
    "city",
    [
      "port",
      "administration"
    ]
  ],
  [
    "hague",
    "The Hague",
    "NL-ZH",
    52.07,
    4.3,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "rotterdam",
    "Rotterdam",
    "NL-ZH",
    51.922,
    4.479,
    "port",
    [
      "port",
      "oil"
    ]
  ],
  [
    "middelburg",
    "Middelburg",
    "NL-ZE",
    51.498,
    3.611,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "den_bosch",
    "'s-Hertogenbosch",
    "NL-NB",
    51.698,
    5.304,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "eindhoven",
    "Eindhoven",
    "NL-NB",
    51.441,
    5.47,
    "city",
    [
      "administration"
    ]
  ],
  [
    "maastricht",
    "Maastricht",
    "NL-LI",
    50.851,
    5.691,
    "capital",
    [
      "coal"
    ]
  ],
  [
    "lelystad",
    "Lelystad",
    "NL-FL",
    52.518,
    5.471,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "groningen",
    "leeuwarden",
    "road",
    "A7"
  ],
  [
    "groningen",
    "assen",
    "road",
    "A28"
  ],
  [
    "assen",
    "zwolle",
    "road",
    "A28"
  ],
  [
    "zwolle",
    "utrecht",
    "road",
    "A28"
  ],
  [
    "amsterdam",
    "utrecht",
    "road",
    "A1"
  ],
  [
    "utrecht",
    "arnhem",
    "road",
    "A1"
  ],
  [
    "utrecht",
    "den_bosch",
    "road",
    "A2"
  ],
  [
    "den_bosch",
    "eindhoven",
    "road",
    "A2"
  ],
  [
    "eindhoven",
    "maastricht",
    "road",
    "A2"
  ],
  [
    "amsterdam",
    "haarlem",
    "road",
    "A4"
  ],
  [
    "haarlem",
    "hague",
    "road",
    "A4"
  ],
  [
    "hague",
    "rotterdam",
    "road",
    "A4"
  ],
  [
    "rotterdam",
    "arnhem",
    "road",
    "A15"
  ],
  [
    "rotterdam",
    "middelburg",
    "road",
    "A58"
  ],
  [
    "amsterdam",
    "lelystad",
    "road",
    "A6"
  ],
  [
    "lelystad",
    "zwolle",
    "road",
    "A6"
  ],
  [
    "zwolle",
    "arnhem",
    "road",
    "A28"
  ]
],
  officers: staff([
  {
    "id": "nl_pm",
    "name": "Willem van Dorp",
    "title": "Prime Minister",
    "rank": "Minister-President",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 22,
    "int": 74,
    "pol": 76,
    "chr": 64,
    "personality": "diplomat",
    "region": "nl.hague",
    "bio": "Fictional prime minister in The Hague."
  },
  {
    "id": "nl_def",
    "name": "Els Kooistra",
    "title": "Minister of Defence",
    "rank": "Minister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 36,
    "int": 66,
    "pol": 58,
    "chr": 52,
    "personality": "cautious",
    "region": "nl.hague",
    "bio": "Fictional defence minister."
  },
  {
    "id": "nl_chs",
    "name": "Pieter van Zanten",
    "title": "Chief of Defence",
    "rank": "Generaal",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 62,
    "pol": 34,
    "chr": 44,
    "personality": "loyalist",
    "region": "nl.hague",
    "bio": "Fictional chief of defence. The army's wartime problem is the North German plain."
  },
  {
    "id": "nl_navy",
    "name": "Maaike de Groot",
    "title": "Commander of the Navy",
    "rank": "Viceadmiraal",
    "branch": "Royal Navy",
    "slot": "front_commander",
    "war": 60,
    "int": 64,
    "pol": 28,
    "chr": 46,
    "personality": "aggressive",
    "region": "nl.rotterdam",
    "bio": "Fictional naval commander. Rotterdam and Den Helder are the ports."
  },
  {
    "id": "nl_1corps",
    "name": "Hendrik Vos",
    "title": "I Corps",
    "rank": "Luitenant-generaal",
    "branch": "Army",
    "slot": "field_officer",
    "war": 66,
    "int": 54,
    "pol": 26,
    "chr": 40,
    "personality": "loyalist",
    "region": "nl.arnhem",
    "bio": "Fictional corps commander, the army that would move into Germany."
  },
  {
    "id": "nl_gas",
    "name": "Annelies Hofstra",
    "title": "Northern command",
    "rank": "Brigadegeneraal",
    "branch": "Army",
    "slot": "field_officer",
    "war": 40,
    "int": 52,
    "pol": 30,
    "chr": 48,
    "personality": "merchant",
    "region": "nl.groningen",
    "bio": "Fictional brigadier for the gas fields and the northern provinces."
  }
]),
});
export const BELGIUM_REGION = land({
  id: "be",
  name: "Belgium",
  country: "BE",
  bbox: {"minLon": 1.82, "maxLon": 7.21, "minLat": 48.28, "maxLat": 52.62},
  notes: "Atlas only. Nine provinces. Brussels is still inside Brabant; the Brussels-Capital Region is a 1989 statute and is not split off. Language regions exist, and the provinces remain the first-level map. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "BE-AN",
    "name": "Antwerp",
    "kind": "province"
  },
  {
    "id": "BE-BR",
    "name": "Brabant",
    "kind": "province"
  },
  {
    "id": "BE-WV",
    "name": "West Flanders",
    "kind": "province"
  },
  {
    "id": "BE-OV",
    "name": "East Flanders",
    "kind": "province"
  },
  {
    "id": "BE-HT",
    "name": "Hainaut",
    "kind": "province"
  },
  {
    "id": "BE-LG",
    "name": "Liège",
    "kind": "province"
  },
  {
    "id": "BE-LI",
    "name": "Limburg",
    "kind": "province"
  },
  {
    "id": "BE-LX",
    "name": "Luxembourg",
    "kind": "province"
  },
  {
    "id": "BE-NA",
    "name": "Namur",
    "kind": "province"
  }
],
  cities: [
  [
    "antwerp",
    "Antwerp",
    "BE-AN",
    51.221,
    4.4,
    "capital",
    [
      "port"
    ]
  ],
  [
    "brussels",
    "Brussels",
    "BE-BR",
    50.847,
    4.357,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "leuven",
    "Leuven",
    "BE-BR",
    50.88,
    4.701,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "bruges",
    "Bruges",
    "BE-WV",
    51.209,
    3.224,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ghent",
    "Ghent",
    "BE-OV",
    51.054,
    3.722,
    "capital",
    [
      "port"
    ]
  ],
  [
    "mons",
    "Mons",
    "BE-HT",
    50.454,
    3.952,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "charleroi",
    "Charleroi",
    "BE-HT",
    50.411,
    4.445,
    "city",
    [
      "steel",
      "coal"
    ]
  ],
  [
    "liege",
    "Liège",
    "BE-LG",
    50.633,
    5.567,
    "capital",
    [
      "steel"
    ]
  ],
  [
    "hasselt",
    "Hasselt",
    "BE-LI",
    50.93,
    5.338,
    "capital",
    [
      "coal"
    ]
  ],
  [
    "arlon",
    "Arlon",
    "BE-LX",
    49.684,
    5.811,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "namur",
    "Namur",
    "BE-NA",
    50.467,
    4.872,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "antwerp",
    "brussels",
    "road",
    "E19"
  ],
  [
    "brussels",
    "mons",
    "road",
    "E19"
  ],
  [
    "bruges",
    "ghent",
    "road",
    "E40"
  ],
  [
    "ghent",
    "brussels",
    "road",
    "E40"
  ],
  [
    "brussels",
    "leuven",
    "road",
    "E40"
  ],
  [
    "leuven",
    "liege",
    "road",
    "E40"
  ],
  [
    "mons",
    "charleroi",
    "road",
    "E42"
  ],
  [
    "charleroi",
    "namur",
    "road",
    "E42"
  ],
  [
    "namur",
    "liege",
    "road",
    "E42"
  ],
  [
    "antwerp",
    "hasselt",
    "road",
    "E313"
  ],
  [
    "hasselt",
    "liege",
    "road",
    "E313"
  ],
  [
    "brussels",
    "namur",
    "road",
    "E411"
  ],
  [
    "namur",
    "arlon",
    "road",
    "E411"
  ],
  [
    "antwerp",
    "ghent",
    "road",
    "E17"
  ]
],
  officers: staff([
  {
    "id": "be_pm",
    "name": "Éliane Vermeulen",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 24,
    "int": 76,
    "pol": 78,
    "chr": 66,
    "personality": "diplomat",
    "region": "be.brussels",
    "bio": "Fictional prime minister. The linguistic balance is the job."
  },
  {
    "id": "be_def",
    "name": "Marc Janssens",
    "title": "Minister of Defence",
    "rank": "Minister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 40,
    "int": 64,
    "pol": 56,
    "chr": 48,
    "personality": "cautious",
    "region": "be.brussels",
    "bio": "Fictional defence minister."
  },
  {
    "id": "be_chs",
    "name": "Koenraad Pieters",
    "title": "Chief of Defence",
    "rank": "Generaal",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 62,
    "int": 60,
    "pol": 32,
    "chr": 42,
    "personality": "loyalist",
    "region": "be.brussels",
    "bio": "Fictional chief of defence, with a corps earmarked for Germany."
  },
  {
    "id": "be_1corps",
    "name": "Hélène Lambert",
    "title": "I Corps",
    "rank": "Luitenant-generaal",
    "branch": "Army",
    "slot": "front_commander",
    "war": 64,
    "int": 56,
    "pol": 28,
    "chr": 40,
    "personality": "aggressive",
    "region": "be.liege",
    "bio": "Fictional corps commander in the Liège–Germany sector."
  },
  {
    "id": "be_navy",
    "name": "Filip Goossens",
    "title": "Naval component",
    "rank": "Admiraal",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 52,
    "int": 58,
    "pol": 30,
    "chr": 44,
    "personality": "merchant",
    "region": "be.antwerp",
    "bio": "Fictional admiral for the Scheldt."
  },
  {
    "id": "be_shape",
    "name": "Anne Dubois",
    "title": "Mons staff",
    "rank": "Colonel",
    "branch": "Army",
    "slot": "field_officer",
    "war": 36,
    "int": 62,
    "pol": 40,
    "chr": 50,
    "personality": "schemer",
    "region": "be.mons",
    "bio": "Fictional Belgian colonel at the Mons headquarters town. Not a real SHAPE officer."
  }
]),
});
export const LUXEMBOURG_REGION = land({
  id: "lu",
  name: "Luxembourg",
  country: "LU",
  bbox: {"minLon": 4.58, "maxLon": 7.84, "minLat": 48.1, "maxLat": 51.27},
  notes: "Atlas only. Three districts (Luxembourg, Diekirch, Grevenmacher), the division used until 2015. Steel at Esch, inside the Luxembourg district. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "LU-L",
    "name": "Luxembourg",
    "kind": "district"
  },
  {
    "id": "LU-D",
    "name": "Diekirch",
    "kind": "district"
  },
  {
    "id": "LU-G",
    "name": "Grevenmacher",
    "kind": "district"
  }
],
  cities: [
  [
    "luxembourg",
    "Luxembourg",
    "LU-L",
    49.611,
    6.132,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "esch",
    "Esch-sur-Alzette",
    "LU-L",
    49.496,
    5.981,
    "city",
    [
      "steel"
    ]
  ],
  [
    "diekirch",
    "Diekirch",
    "LU-D",
    49.868,
    6.156,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "grevenmacher",
    "Grevenmacher",
    "LU-G",
    49.68,
    6.441,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "luxembourg",
    "esch",
    "road",
    "A3"
  ],
  [
    "luxembourg",
    "diekirch",
    "road",
    "A7"
  ],
  [
    "luxembourg",
    "grevenmacher",
    "road",
    "N1"
  ]
],
  officers: staff([
  {
    "id": "lu_pm",
    "name": "Claire Welter",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Government",
    "slot": "head_of_state",
    "war": 18,
    "int": 70,
    "pol": 72,
    "chr": 68,
    "personality": "diplomat",
    "region": "lu.luxembourg",
    "bio": "Fictional prime minister. Luxembourg is in NATO and the Benelux."
  },
  {
    "id": "lu_def",
    "name": "Marc Schmit",
    "title": "Minister of Defence",
    "rank": "Minister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 28,
    "int": 58,
    "pol": 48,
    "chr": 50,
    "personality": "cautious",
    "region": "lu.luxembourg",
    "bio": "Fictional defence minister of a very small force."
  },
  {
    "id": "lu_army",
    "name": "Pol Weyland",
    "title": "Army",
    "rank": "Colonel",
    "branch": "Army",
    "slot": "field_officer",
    "war": 42,
    "int": 48,
    "pol": 30,
    "chr": 44,
    "personality": "loyalist",
    "region": "lu.diekirch",
    "bio": "Fictional colonel of the Luxembourg army, which has one regiment."
  }
]),
});
export const WEST_GERMANY_REGION = land({
  id: "de",
  name: "West Germany",
  country: "DE",
  bbox: {"minLon": 4.68, "maxLon": 13.5, "minLat": 46.15, "maxLat": 56.18},
  notes: "Atlas only. The ten Länder of the Federal Republic. Bonn is the capital and sits in North Rhine-Westphalia; it is not a Land of its own. West Berlin is a separate enclave, the unit many counts call the eleventh, under a special Allied status. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {"DE-BY": "alpine"},
  subs: [
  {
    "id": "DE-SH",
    "name": "Schleswig-Holstein",
    "kind": "state"
  },
  {
    "id": "DE-HH",
    "name": "Hamburg",
    "kind": "state"
  },
  {
    "id": "DE-NI",
    "name": "Lower Saxony",
    "kind": "state"
  },
  {
    "id": "DE-HB",
    "name": "Bremen",
    "kind": "state"
  },
  {
    "id": "DE-NW",
    "name": "North Rhine-Westphalia",
    "kind": "state"
  },
  {
    "id": "DE-HE",
    "name": "Hesse",
    "kind": "state"
  },
  {
    "id": "DE-RP",
    "name": "Rhineland-Palatinate",
    "kind": "state"
  },
  {
    "id": "DE-BW",
    "name": "Baden-Württemberg",
    "kind": "state"
  },
  {
    "id": "DE-BY",
    "name": "Bavaria",
    "kind": "state"
  },
  {
    "id": "DE-SL",
    "name": "Saarland",
    "kind": "state"
  }
],
  cities: [
  [
    "kiel",
    "Kiel",
    "DE-SH",
    54.323,
    10.139,
    "capital",
    [
      "port"
    ]
  ],
  [
    "flensburg",
    "Flensburg",
    "DE-SH",
    54.784,
    9.439,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "lubeck",
    "Lübeck",
    "DE-SH",
    53.866,
    10.687,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "puttgarden",
    "Puttgarden",
    "DE-SH",
    54.497,
    11.218,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "hamburg",
    "Hamburg",
    "DE-HH",
    53.551,
    9.994,
    "capital",
    [
      "port"
    ]
  ],
  [
    "hannover",
    "Hannover",
    "DE-NI",
    52.375,
    9.732,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "braunschweig",
    "Braunschweig",
    "DE-NI",
    52.269,
    10.521,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "helmstedt",
    "Helmstedt",
    "DE-NI",
    52.228,
    11.01,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "oldenburg",
    "Oldenburg",
    "DE-NI",
    53.143,
    8.214,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "osnabruck",
    "Osnabrück",
    "DE-NI",
    52.279,
    8.047,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "gottingen",
    "Göttingen",
    "DE-NI",
    51.541,
    9.915,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "bremen",
    "Bremen",
    "DE-HB",
    53.079,
    8.801,
    "capital",
    [
      "port"
    ]
  ],
  [
    "bremerhaven",
    "Bremerhaven",
    "DE-HB",
    53.539,
    8.58,
    "port",
    [
      "port",
      "fisheries"
    ]
  ],
  [
    "dusseldorf",
    "Düsseldorf",
    "DE-NW",
    51.227,
    6.773,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "cologne",
    "Cologne",
    "DE-NW",
    50.938,
    6.96,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "bonn",
    "Bonn",
    "DE-NW",
    50.737,
    7.098,
    "city",
    [
      "administration"
    ]
  ],
  [
    "essen",
    "Essen",
    "DE-NW",
    51.456,
    7.012,
    "city",
    [
      "coal",
      "steel"
    ]
  ],
  [
    "dortmund",
    "Dortmund",
    "DE-NW",
    51.514,
    7.465,
    "city",
    [
      "coal",
      "steel"
    ]
  ],
  [
    "duisburg",
    "Duisburg",
    "DE-NW",
    51.435,
    6.762,
    "city",
    [
      "steel",
      "port"
    ]
  ],
  [
    "aachen",
    "Aachen",
    "DE-NW",
    50.775,
    6.084,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "munster",
    "Münster",
    "DE-NW",
    51.961,
    7.628,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "bielefeld",
    "Bielefeld",
    "DE-NW",
    52.03,
    8.533,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "wiesbaden",
    "Wiesbaden",
    "DE-HE",
    50.082,
    8.24,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "frankfurt",
    "Frankfurt",
    "DE-HE",
    50.11,
    8.682,
    "city",
    [
      "administration"
    ]
  ],
  [
    "kassel",
    "Kassel",
    "DE-HE",
    51.312,
    9.479,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "fulda",
    "Fulda",
    "DE-HE",
    50.555,
    9.675,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "mainz",
    "Mainz",
    "DE-RP",
    49.993,
    8.247,
    "capital",
    [
      "grapes"
    ]
  ],
  [
    "koblenz",
    "Koblenz",
    "DE-RP",
    50.356,
    7.594,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "trier",
    "Trier",
    "DE-RP",
    49.75,
    6.637,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "stuttgart",
    "Stuttgart",
    "DE-BW",
    48.775,
    9.183,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "karlsruhe",
    "Karlsruhe",
    "DE-BW",
    49.007,
    8.404,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "mannheim",
    "Mannheim",
    "DE-BW",
    49.487,
    8.466,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "freiburg",
    "Freiburg",
    "DE-BW",
    47.999,
    7.842,
    "city",
    [
      "grapes"
    ]
  ],
  [
    "konstanz",
    "Konstanz",
    "DE-BW",
    47.663,
    9.175,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "ulm",
    "Ulm",
    "DE-BW",
    48.401,
    9.988,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "munich",
    "Munich",
    "DE-BY",
    48.137,
    11.575,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "nuremberg",
    "Nuremberg",
    "DE-BY",
    49.452,
    11.077,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "augsburg",
    "Augsburg",
    "DE-BY",
    48.371,
    10.898,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "wurzburg",
    "Würzburg",
    "DE-BY",
    49.794,
    9.929,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "regensburg",
    "Regensburg",
    "DE-BY",
    49.013,
    12.102,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "hof",
    "Hof",
    "DE-BY",
    50.317,
    11.912,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "lindau",
    "Lindau",
    "DE-BY",
    47.546,
    9.684,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "saarbrucken",
    "Saarbrücken",
    "DE-SL",
    49.24,
    6.997,
    "capital",
    [
      "coal",
      "steel"
    ]
  ]
],
  links: [
  [
    "flensburg",
    "kiel",
    "road",
    "A7"
  ],
  [
    "kiel",
    "hamburg",
    "road",
    "A7"
  ],
  [
    "hamburg",
    "hannover",
    "road",
    "A7"
  ],
  [
    "hannover",
    "gottingen",
    "road",
    "A7"
  ],
  [
    "gottingen",
    "kassel",
    "road",
    "A7"
  ],
  [
    "kassel",
    "fulda",
    "road",
    "A7"
  ],
  [
    "fulda",
    "wurzburg",
    "road",
    "A7"
  ],
  [
    "wurzburg",
    "ulm",
    "road",
    "A7"
  ],
  [
    "ulm",
    "augsburg",
    "road",
    "A7"
  ],
  [
    "augsburg",
    "munich",
    "road",
    "A7"
  ],
  [
    "kiel",
    "puttgarden",
    "road",
    "B207"
  ],
  [
    "lubeck",
    "hamburg",
    "road",
    "A1"
  ],
  [
    "hamburg",
    "bremen",
    "road",
    "A1"
  ],
  [
    "bremen",
    "osnabruck",
    "road",
    "A1"
  ],
  [
    "osnabruck",
    "munster",
    "road",
    "A1"
  ],
  [
    "munster",
    "dortmund",
    "road",
    "A1"
  ],
  [
    "dortmund",
    "cologne",
    "road",
    "A1"
  ],
  [
    "cologne",
    "koblenz",
    "road",
    "A1"
  ],
  [
    "koblenz",
    "trier",
    "road",
    "A1"
  ],
  [
    "trier",
    "saarbrucken",
    "road",
    "A1"
  ],
  [
    "bremen",
    "bremerhaven",
    "road",
    "A27"
  ],
  [
    "hannover",
    "braunschweig",
    "road",
    "A2"
  ],
  [
    "braunschweig",
    "helmstedt",
    "road",
    "A2"
  ],
  [
    "hannover",
    "bielefeld",
    "road",
    "A2"
  ],
  [
    "bielefeld",
    "dortmund",
    "road",
    "A2"
  ],
  [
    "dortmund",
    "essen",
    "road",
    "A2"
  ],
  [
    "essen",
    "duisburg",
    "road",
    "A2"
  ],
  [
    "duisburg",
    "dusseldorf",
    "road",
    "A2"
  ],
  [
    "dusseldorf",
    "cologne",
    "road",
    "A2"
  ],
  [
    "cologne",
    "bonn",
    "road",
    "A2"
  ],
  [
    "bonn",
    "frankfurt",
    "road",
    "A2"
  ],
  [
    "aachen",
    "cologne",
    "road",
    "A4"
  ],
  [
    "frankfurt",
    "wiesbaden",
    "road",
    "A66"
  ],
  [
    "wiesbaden",
    "mainz",
    "road",
    "A66"
  ],
  [
    "frankfurt",
    "mannheim",
    "road",
    "A5"
  ],
  [
    "mannheim",
    "karlsruhe",
    "road",
    "A5"
  ],
  [
    "karlsruhe",
    "freiburg",
    "road",
    "A5"
  ],
  [
    "karlsruhe",
    "stuttgart",
    "road",
    "A8"
  ],
  [
    "stuttgart",
    "ulm",
    "road",
    "A8"
  ],
  [
    "ulm",
    "munich",
    "road",
    "A8"
  ],
  [
    "freiburg",
    "konstanz",
    "road",
    "B33"
  ],
  [
    "lindau",
    "munich",
    "road",
    "A96"
  ],
  [
    "munich",
    "nuremberg",
    "road",
    "A9"
  ],
  [
    "nuremberg",
    "hof",
    "road",
    "A9"
  ],
  [
    "frankfurt",
    "wurzburg",
    "road",
    "A3"
  ],
  [
    "wurzburg",
    "nuremberg",
    "road",
    "A3"
  ],
  [
    "nuremberg",
    "regensburg",
    "road",
    "A3"
  ],
  [
    "regensburg",
    "munich",
    "road",
    "A3"
  ],
  [
    "mannheim",
    "saarbrucken",
    "road",
    "A6"
  ],
  [
    "dortmund",
    "frankfurt",
    "road",
    "A45"
  ],
  [
    "oldenburg",
    "bremen",
    "road",
    "A28"
  ]
],
  officers: staff([
  {
    "id": "de_chan",
    "name": "Karl Rehberg",
    "title": "Federal Chancellor",
    "rank": "Bundeskanzler",
    "branch": "Chancellery",
    "slot": "head_of_state",
    "war": 30,
    "int": 78,
    "pol": 80,
    "chr": 62,
    "personality": "diplomat",
    "region": "de.bonn",
    "bio": "Fictional chancellor in Bonn. Not a real officeholder."
  },
  {
    "id": "de_def",
    "name": "Ingrid Salzmann",
    "title": "Federal Minister of Defence",
    "rank": "Bundesminister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 40,
    "int": 70,
    "pol": 58,
    "chr": 54,
    "personality": "cautious",
    "region": "de.bonn",
    "bio": "Fictional defence minister."
  },
  {
    "id": "de_gen",
    "name": "Ulrich Herbst",
    "title": "Inspector General",
    "rank": "General",
    "branch": "Bundeswehr",
    "slot": "chief_of_staff",
    "war": 68,
    "int": 66,
    "pol": 34,
    "chr": 42,
    "personality": "loyalist",
    "region": "de.bonn",
    "bio": "Fictional Generalinspekteur der Bundeswehr."
  },
  {
    "id": "de_heer",
    "name": "Thomas Adler",
    "title": "Inspector of the Army",
    "rank": "Generalleutnant",
    "branch": "Heer",
    "slot": "front_commander",
    "war": 72,
    "int": 60,
    "pol": 28,
    "chr": 40,
    "personality": "aggressive",
    "region": "de.koblenz",
    "bio": "Fictional army inspector. The corps face east."
  },
  {
    "id": "de_navy",
    "name": "Greta Holm",
    "title": "Inspector of the Navy",
    "rank": "Vizeadmiral",
    "branch": "Bundesmarine",
    "slot": "field_officer",
    "war": 60,
    "int": 64,
    "pol": 30,
    "chr": 46,
    "personality": "cautious",
    "region": "de.hamburg",
    "bio": "Fictional naval inspector. The Baltic and the North Sea are both her problem."
  },
  {
    "id": "de_ruhr",
    "name": "Heinz Köhler",
    "title": "Ruhr district",
    "rank": "Generalmajor",
    "branch": "Heer",
    "slot": "field_officer",
    "war": 48,
    "int": 52,
    "pol": 36,
    "chr": 40,
    "personality": "merchant",
    "region": "de.essen",
    "bio": "Fictional general for the Ruhr. Coal and steel are still the yield."
  },
  {
    "id": "de_south",
    "name": "Lena Vogt",
    "title": "Southern corps",
    "rank": "Generalleutnant",
    "branch": "Heer",
    "slot": "field_officer",
    "war": 64,
    "int": 58,
    "pol": 30,
    "chr": 44,
    "personality": "loyalist",
    "region": "de.stuttgart",
    "bio": "Fictional southern commander, posted at Stuttgart."
  },
  {
    "id": "de_bav",
    "name": "Franz Eder",
    "title": "Bavarian district",
    "rank": "Generalmajor",
    "branch": "Heer",
    "slot": "field_officer",
    "war": 56,
    "int": 54,
    "pol": 38,
    "chr": 50,
    "personality": "diplomat",
    "region": "de.munich",
    "bio": "Fictional Bavarian district commander."
  },
  {
    "id": "de_baltic",
    "name": "Sönke Paulsen",
    "title": "Fleet",
    "rank": "Konteradmiral",
    "branch": "Bundesmarine",
    "slot": "field_officer",
    "war": 58,
    "int": 56,
    "pol": 26,
    "chr": 38,
    "personality": "aggressive",
    "region": "de.kiel",
    "bio": "Fictional Baltic flag officer at Kiel."
  },
  {
    "id": "de_air",
    "name": "Monika Bertram",
    "title": "Air corridors",
    "rank": "Generalmajor",
    "branch": "Luftwaffe",
    "slot": "field_officer",
    "war": 52,
    "int": 70,
    "pol": 32,
    "chr": 48,
    "personality": "cautious",
    "region": "de.frankfurt",
    "bio": "Fictional air officer for the three corridors into West Berlin."
  },
  {
    "id": "de_saar",
    "name": "Otto Klein",
    "title": "Saar brigade",
    "rank": "Brigadegeneral",
    "branch": "Heer",
    "slot": "field_officer",
    "war": 46,
    "int": 48,
    "pol": 28,
    "chr": 42,
    "personality": "loyalist",
    "region": "de.saarbrucken",
    "bio": "Fictional Saar commander."
  },
  {
    "id": "de_transit",
    "name": "Uwe Brandt",
    "title": "Helmstedt transit",
    "rank": "Oberst",
    "branch": "Bundesgrenzschutz",
    "slot": "field_officer",
    "war": 40,
    "int": 58,
    "pol": 34,
    "chr": 36,
    "personality": "schemer",
    "region": "de.helmstedt",
    "bio": "Fictional border-guard colonel at the central checkpoint. The road continues into the GDR."
  }
]),
});
export const EAST_GERMANY_REGION = land({
  id: "dd",
  name: "East Germany",
  country: "DD",
  bbox: {"minLon": 8.91, "maxLon": 15.95, "minLat": 49.01, "maxLat": 55.49},
  notes: "Atlas only. Fourteen Bezirke from the 1952 reform, plus East Berlin as the capital district. The five historic Länder are not restored until 1990. Karl-Marx-Stadt has not gone back to Chemnitz. Transit roads from the Federal Republic cross here and end at West Berlin. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "DD-RO",
    "name": "Rostock",
    "kind": "bezirk"
  },
  {
    "id": "DD-SN",
    "name": "Schwerin",
    "kind": "bezirk"
  },
  {
    "id": "DD-NB",
    "name": "Neubrandenburg",
    "kind": "bezirk"
  },
  {
    "id": "DD-PO",
    "name": "Potsdam",
    "kind": "bezirk"
  },
  {
    "id": "DD-EB",
    "name": "East Berlin",
    "kind": "bezirk"
  },
  {
    "id": "DD-FF",
    "name": "Frankfurt (Oder)",
    "kind": "bezirk"
  },
  {
    "id": "DD-CO",
    "name": "Cottbus",
    "kind": "bezirk"
  },
  {
    "id": "DD-MA",
    "name": "Magdeburg",
    "kind": "bezirk"
  },
  {
    "id": "DD-HA",
    "name": "Halle",
    "kind": "bezirk"
  },
  {
    "id": "DD-ER",
    "name": "Erfurt",
    "kind": "bezirk"
  },
  {
    "id": "DD-GE",
    "name": "Gera",
    "kind": "bezirk"
  },
  {
    "id": "DD-SU",
    "name": "Suhl",
    "kind": "bezirk"
  },
  {
    "id": "DD-DD",
    "name": "Dresden",
    "kind": "bezirk"
  },
  {
    "id": "DD-LE",
    "name": "Leipzig",
    "kind": "bezirk"
  },
  {
    "id": "DD-KM",
    "name": "Karl-Marx-Stadt",
    "kind": "bezirk"
  }
],
  cities: [
  [
    "rostock",
    "Rostock",
    "DD-RO",
    54.092,
    12.099,
    "capital",
    [
      "port"
    ]
  ],
  [
    "schwerin",
    "Schwerin",
    "DD-SN",
    53.629,
    11.415,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "zarrentin",
    "Zarrentin",
    "DD-SN",
    53.551,
    10.916,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "neubrandenburg",
    "Neubrandenburg",
    "DD-NB",
    53.557,
    13.261,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "potsdam",
    "Potsdam",
    "DD-PO",
    52.391,
    13.064,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "east_berlin",
    "East Berlin",
    "DD-EB",
    52.52,
    13.405,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "frankfurt_oder",
    "Frankfurt (Oder)",
    "DD-FF",
    52.341,
    14.551,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "cottbus",
    "Cottbus",
    "DD-CO",
    51.756,
    14.335,
    "capital",
    [
      "lignite"
    ]
  ],
  [
    "magdeburg",
    "Magdeburg",
    "DD-MA",
    52.131,
    11.64,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "marienborn",
    "Marienborn",
    "DD-MA",
    52.196,
    11.108,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "halle",
    "Halle",
    "DD-HA",
    51.482,
    11.97,
    "capital",
    [
      "potash"
    ]
  ],
  [
    "erfurt",
    "Erfurt",
    "DD-ER",
    50.978,
    11.029,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "eisenach",
    "Eisenach",
    "DD-ER",
    50.98,
    10.315,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "gera",
    "Gera",
    "DD-GE",
    50.878,
    12.082,
    "capital",
    [
      "uranium"
    ]
  ],
  [
    "hirschberg",
    "Hirschberg",
    "DD-GE",
    50.406,
    11.82,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "suhl",
    "Suhl",
    "DD-SU",
    50.61,
    10.694,
    "capital",
    [
      "potash"
    ]
  ],
  [
    "dresden",
    "Dresden",
    "DD-DD",
    51.05,
    13.737,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "leipzig",
    "Leipzig",
    "DD-LE",
    51.34,
    12.375,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "karl_marx_stadt",
    "Karl-Marx-Stadt",
    "DD-KM",
    50.832,
    12.925,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "rostock",
    "schwerin",
    "road",
    "F105"
  ],
  [
    "schwerin",
    "zarrentin",
    "road",
    "F105"
  ],
  [
    "rostock",
    "neubrandenburg",
    "road",
    "A19"
  ],
  [
    "neubrandenburg",
    "frankfurt_oder",
    "road",
    "A19"
  ],
  [
    "schwerin",
    "potsdam",
    "road",
    "A24"
  ],
  [
    "marienborn",
    "magdeburg",
    "road",
    "A2"
  ],
  [
    "magdeburg",
    "potsdam",
    "road",
    "A2"
  ],
  [
    "potsdam",
    "east_berlin",
    "road",
    "A2"
  ],
  [
    "hirschberg",
    "gera",
    "road",
    "A9"
  ],
  [
    "gera",
    "leipzig",
    "road",
    "A9"
  ],
  [
    "leipzig",
    "east_berlin",
    "road",
    "A9"
  ],
  [
    "eisenach",
    "erfurt",
    "road",
    "A4"
  ],
  [
    "erfurt",
    "gera",
    "road",
    "A4"
  ],
  [
    "gera",
    "karl_marx_stadt",
    "road",
    "A4"
  ],
  [
    "karl_marx_stadt",
    "dresden",
    "road",
    "A4"
  ],
  [
    "leipzig",
    "halle",
    "road",
    "A9"
  ],
  [
    "halle",
    "magdeburg",
    "road",
    "A9"
  ],
  [
    "east_berlin",
    "cottbus",
    "road",
    "A13"
  ],
  [
    "cottbus",
    "dresden",
    "road",
    "A13"
  ],
  [
    "erfurt",
    "suhl",
    "road",
    "A4"
  ],
  [
    "potsdam",
    "cottbus",
    "road",
    "F2"
  ]
],
  officers: staff([
  {
    "id": "dd_chair",
    "name": "Horst Keller",
    "title": "Chairman of the Council of State",
    "rank": "Vorsitzender",
    "branch": "State Council",
    "slot": "head_of_state",
    "war": 34,
    "int": 70,
    "pol": 72,
    "chr": 40,
    "personality": "schemer",
    "region": "dd.east_berlin",
    "bio": "Fictional chairman. Not a real party leader."
  },
  {
    "id": "dd_def",
    "name": "Armin Vogel",
    "title": "Minister of National Defence",
    "rank": "Armeegeneral",
    "branch": "NVA",
    "slot": "defense_minister",
    "war": 72,
    "int": 64,
    "pol": 48,
    "chr": 36,
    "personality": "loyalist",
    "region": "dd.east_berlin",
    "bio": "Fictional NVA minister."
  },
  {
    "id": "dd_staff",
    "name": "Ilse Krüger",
    "title": "Chief of the Main Staff",
    "rank": "Generaloberst",
    "branch": "NVA",
    "slot": "chief_of_staff",
    "war": 66,
    "int": 68,
    "pol": 40,
    "chr": 38,
    "personality": "cautious",
    "region": "dd.east_berlin",
    "bio": "Fictional chief of the main staff."
  },
  {
    "id": "dd_3army",
    "name": "Werner Pohl",
    "title": "3rd Army",
    "rank": "Generalleutnant",
    "branch": "Land forces",
    "slot": "front_commander",
    "war": 70,
    "int": 56,
    "pol": 30,
    "chr": 34,
    "personality": "aggressive",
    "region": "dd.potsdam",
    "bio": "Fictional army commander on the inner-German line."
  },
  {
    "id": "dd_volks",
    "name": "Günter Falk",
    "title": "Volksmarine",
    "rank": "Vizeadmiral",
    "branch": "Volksmarine",
    "slot": "field_officer",
    "war": 58,
    "int": 54,
    "pol": 28,
    "chr": 36,
    "personality": "loyalist",
    "region": "dd.rostock",
    "bio": "Fictional Baltic admiral at Rostock."
  },
  {
    "id": "dd_lignite",
    "name": "Helga Nitschke",
    "title": "Cottbus district",
    "rank": "Generalmajor",
    "branch": "Border troops",
    "slot": "field_officer",
    "war": 44,
    "int": 50,
    "pol": 32,
    "chr": 40,
    "personality": "merchant",
    "region": "dd.cottbus",
    "bio": "Fictional commander around the lignite pits."
  },
  {
    "id": "dd_gate",
    "name": "Rolf Hesse",
    "title": "Marienborn checkpoint",
    "rank": "Oberst",
    "branch": "Border troops",
    "slot": "field_officer",
    "war": 48,
    "int": 52,
    "pol": 26,
    "chr": 30,
    "personality": "schemer",
    "region": "dd.marienborn",
    "bio": "Fictional checkpoint commander on the Helmstedt road."
  },
  {
    "id": "dd_wismut",
    "name": "Petra Ulrich",
    "title": "Wismut security",
    "rank": "Oberst",
    "branch": "NVA",
    "slot": "field_officer",
    "war": 42,
    "int": 58,
    "pol": 34,
    "chr": 36,
    "personality": "recluse",
    "region": "dd.gera",
    "bio": "Fictional officer for the uranium works in the Gera Bezirk."
  }
]),
});
export const WEST_BERLIN_REGION = land({
  id: "wb",
  name: "West Berlin",
  country: "WB",
  bbox: {"minLon": 11.89, "maxLon": 14.8, "minLat": 51.07, "maxLat": 53.96},
  notes: "Atlas only. An enclave under Allied status, not a full Land of the Federal Republic. Three air corridors (Hamburg, Hannover, Frankfurt) and the transit roads across the GDR. Checkpoint Charlie is a controlled crossing, not an open road. Tegel and Tempelhof are the civil airfields; Gatow stays a military field and is not a separate pin. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "WB-BE",
    "name": "West Berlin",
    "kind": "enclave"
  }
],
  cities: [
  [
    "west_berlin",
    "West Berlin",
    "WB-BE",
    52.516,
    13.378,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "tegel",
    "Tegel",
    "WB-BE",
    52.56,
    13.288,
    "city",
    [
      "port"
    ]
  ],
  [
    "tempelhof",
    "Tempelhof",
    "WB-BE",
    52.473,
    13.404,
    "city",
    [
      "port"
    ]
  ]
],
  links: [
  [
    "west_berlin",
    "tegel",
    "road",
    "city road"
  ],
  [
    "west_berlin",
    "tempelhof",
    "road",
    "city road"
  ]
],
  officers: staff([
  {
    "id": "wb_gov",
    "name": "Renate Wolf",
    "title": "Governing Mayor",
    "rank": "Regierender Bürgermeister",
    "branch": "Senate",
    "slot": "head_of_state",
    "war": 26,
    "int": 72,
    "pol": 74,
    "chr": 68,
    "personality": "diplomat",
    "region": "wb.west_berlin",
    "bio": "Fictional governing mayor. The Allies still have reserved rights."
  },
  {
    "id": "wb_allied",
    "name": "James Cartwright",
    "title": "Allied liaison",
    "rank": "Brigadier",
    "branch": "Allied staff",
    "slot": "defense_minister",
    "war": 48,
    "int": 66,
    "pol": 40,
    "chr": 50,
    "personality": "cautious",
    "region": "wb.west_berlin",
    "bio": "Fictional Allied brigadier. The air corridors are his daily map."
  },
  {
    "id": "wb_field",
    "name": "Klaus Behrend",
    "title": "Berlin brigade",
    "rank": "Oberst",
    "branch": "Bundeswehr",
    "slot": "field_officer",
    "war": 52,
    "int": 54,
    "pol": 28,
    "chr": 42,
    "personality": "loyalist",
    "region": "wb.tegel",
    "bio": "Fictional colonel of the Berlin garrison, posted at Tegel."
  }
]),
});
