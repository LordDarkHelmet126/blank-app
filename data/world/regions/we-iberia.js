import { buildRegion, staff } from "../build-region.js";

function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const SPAIN_REGION = land({
  id: "es",
  name: "Spain",
  country: "ES",
  bbox: {"minLon": -17.65, "maxLon": 5.66, "minLat": 26.72, "maxLat": 44.86},
  notes: "Atlas only. Seventeen autonomous communities, in place by 1983, plus Ceuta and Melilla. Those two are still plazas de soberanía; they become autonomous cities only in 1995, and they are drawn because the strait and the African shore are part of this map. The Balearics and the Canaries are sea-linked. The Gibraltar land frontier reopened in February 1985. Occupied and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 4, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "ES-AN",
    "name": "Andalusia",
    "kind": "community"
  },
  {
    "id": "ES-AR",
    "name": "Aragon",
    "kind": "community"
  },
  {
    "id": "ES-AS",
    "name": "Asturias",
    "kind": "community"
  },
  {
    "id": "ES-IB",
    "name": "Balearic Islands",
    "kind": "community"
  },
  {
    "id": "ES-PV",
    "name": "Basque Country",
    "kind": "community"
  },
  {
    "id": "ES-CN",
    "name": "Canary Islands",
    "kind": "community"
  },
  {
    "id": "ES-CB",
    "name": "Cantabria",
    "kind": "community"
  },
  {
    "id": "ES-CL",
    "name": "Castile and León",
    "kind": "community"
  },
  {
    "id": "ES-CM",
    "name": "Castilla-La Mancha",
    "kind": "community"
  },
  {
    "id": "ES-CT",
    "name": "Catalonia",
    "kind": "community"
  },
  {
    "id": "ES-EX",
    "name": "Extremadura",
    "kind": "community"
  },
  {
    "id": "ES-GA",
    "name": "Galicia",
    "kind": "community"
  },
  {
    "id": "ES-RI",
    "name": "La Rioja",
    "kind": "community"
  },
  {
    "id": "ES-MD",
    "name": "Madrid",
    "kind": "community"
  },
  {
    "id": "ES-MC",
    "name": "Murcia",
    "kind": "community"
  },
  {
    "id": "ES-NC",
    "name": "Navarre",
    "kind": "community"
  },
  {
    "id": "ES-VC",
    "name": "Valencian Community",
    "kind": "community"
  },
  {
    "id": "ES-CE",
    "name": "Ceuta",
    "kind": "plaza"
  },
  {
    "id": "ES-ML",
    "name": "Melilla",
    "kind": "plaza"
  }
],
  cities: [
  [
    "seville",
    "Seville",
    "ES-AN",
    37.389,
    -5.984,
    "capital",
    [
      "olives"
    ]
  ],
  [
    "zaragoza",
    "Zaragoza",
    "ES-AR",
    41.649,
    -0.889,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "oviedo",
    "Oviedo",
    "ES-AS",
    43.362,
    -5.849,
    "capital",
    [
      "coal"
    ]
  ],
  [
    "palma",
    "Palma",
    "ES-IB",
    39.57,
    2.65,
    "capital",
    [
      "port"
    ]
  ],
  [
    "vitoria",
    "Vitoria-Gasteiz",
    "ES-PV",
    42.846,
    -2.672,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "las_palmas",
    "Las Palmas",
    "ES-CN",
    28.124,
    -15.43,
    "capital",
    [
      "port",
      "bananas"
    ]
  ],
  [
    "santander",
    "Santander",
    "ES-CB",
    43.462,
    -3.81,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "valladolid",
    "Valladolid",
    "ES-CL",
    41.652,
    -4.724,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "toledo",
    "Toledo",
    "ES-CM",
    39.862,
    -4.027,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "barcelona",
    "Barcelona",
    "ES-CT",
    41.387,
    2.168,
    "capital",
    [
      "autos",
      "port"
    ]
  ],
  [
    "merida",
    "Mérida",
    "ES-EX",
    38.916,
    -6.344,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "santiago",
    "Santiago de Compostela",
    "ES-GA",
    42.878,
    -8.544,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "logrono",
    "Logroño",
    "ES-RI",
    42.466,
    -2.445,
    "capital",
    [
      "grapes"
    ]
  ],
  [
    "madrid",
    "Madrid",
    "ES-MD",
    40.417,
    -3.704,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "murcia",
    "Murcia",
    "ES-MC",
    37.992,
    -1.131,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "pamplona",
    "Pamplona",
    "ES-NC",
    42.816,
    -1.644,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "valencia",
    "Valencia",
    "ES-VC",
    39.47,
    -0.376,
    "capital",
    [
      "citrus",
      "port"
    ]
  ],
  [
    "ceuta",
    "Ceuta",
    "ES-CE",
    35.889,
    -5.317,
    "capital",
    [
      "port"
    ]
  ],
  [
    "melilla",
    "Melilla",
    "ES-ML",
    35.292,
    -2.938,
    "capital",
    [
      "port"
    ]
  ],
  [
    "bilbao",
    "Bilbao",
    "ES-PV",
    43.263,
    -2.935,
    "port",
    [
      "steel",
      "port"
    ]
  ],
  [
    "irun",
    "Irun",
    "ES-PV",
    43.338,
    -1.789,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "jaca",
    "Jaca",
    "ES-AR",
    42.57,
    -0.55,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "huesca",
    "Huesca",
    "ES-AR",
    42.14,
    -0.409,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "girona",
    "Girona",
    "ES-CT",
    41.979,
    2.821,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "puigcerda",
    "Puigcerdà",
    "ES-CT",
    42.432,
    1.928,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "la_seu",
    "La Seu d'Urgell",
    "ES-CT",
    42.358,
    1.461,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "tarragona",
    "Tarragona",
    "ES-CT",
    41.119,
    1.245,
    "port",
    [
      "oil",
      "port"
    ]
  ],
  [
    "vigo",
    "Vigo",
    "ES-GA",
    42.24,
    -8.72,
    "port",
    [
      "fisheries",
      "port"
    ]
  ],
  [
    "algeciras",
    "Algeciras",
    "ES-AN",
    36.14,
    -5.453,
    "port",
    [
      "port"
    ]
  ],
  [
    "cadiz",
    "Cádiz",
    "ES-AN",
    36.527,
    -6.289,
    "port",
    [
      "port",
      "fisheries"
    ]
  ],
  [
    "malaga",
    "Málaga",
    "ES-AN",
    36.722,
    -4.421,
    "port",
    [
      "port"
    ]
  ],
  [
    "huelva",
    "Huelva",
    "ES-AN",
    37.262,
    -6.945,
    "city",
    [
      "copper"
    ]
  ],
  [
    "jerez",
    "Jerez",
    "ES-AN",
    36.685,
    -6.126,
    "city",
    [
      "grapes"
    ]
  ],
  [
    "badajoz",
    "Badajoz",
    "ES-EX",
    38.879,
    -6.97,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "zamora",
    "Zamora",
    "ES-CL",
    41.503,
    -5.747,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "salamanca",
    "Salamanca",
    "ES-CL",
    40.965,
    -5.664,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "santa_cruz",
    "Santa Cruz de Tenerife",
    "ES-CN",
    28.464,
    -16.252,
    "city",
    [
      "port"
    ]
  ],
  [
    "mahon",
    "Mahón",
    "ES-IB",
    39.889,
    4.264,
    "port",
    [
      "port"
    ]
  ],
  [
    "ibiza",
    "Ibiza",
    "ES-IB",
    38.909,
    1.433,
    "port",
    [
      "port"
    ]
  ]
],
  links: [
  [
    "seville",
    "huelva",
    "road",
    "national road"
  ],
  [
    "seville",
    "jerez",
    "road",
    "national road"
  ],
  [
    "jerez",
    "cadiz",
    "road",
    "national road"
  ],
  [
    "cadiz",
    "algeciras",
    "road",
    "national road"
  ],
  [
    "algeciras",
    "malaga",
    "road",
    "national road"
  ],
  [
    "seville",
    "merida",
    "road",
    "national road"
  ],
  [
    "merida",
    "badajoz",
    "road",
    "national road"
  ],
  [
    "merida",
    "toledo",
    "road",
    "national road"
  ],
  [
    "toledo",
    "madrid",
    "road",
    "national road"
  ],
  [
    "madrid",
    "valladolid",
    "road",
    "national road"
  ],
  [
    "valladolid",
    "zamora",
    "road",
    "national road"
  ],
  [
    "zamora",
    "salamanca",
    "road",
    "national road"
  ],
  [
    "valladolid",
    "logrono",
    "road",
    "national road"
  ],
  [
    "logrono",
    "vitoria",
    "road",
    "national road"
  ],
  [
    "vitoria",
    "bilbao",
    "road",
    "national road"
  ],
  [
    "bilbao",
    "santander",
    "road",
    "national road"
  ],
  [
    "logrono",
    "pamplona",
    "road",
    "national road"
  ],
  [
    "pamplona",
    "irun",
    "road",
    "national road"
  ],
  [
    "pamplona",
    "jaca",
    "road",
    "national road"
  ],
  [
    "jaca",
    "huesca",
    "road",
    "national road"
  ],
  [
    "huesca",
    "zaragoza",
    "road",
    "national road"
  ],
  [
    "huesca",
    "la_seu",
    "road",
    "national road"
  ],
  [
    "la_seu",
    "puigcerda",
    "road",
    "national road"
  ],
  [
    "puigcerda",
    "girona",
    "road",
    "national road"
  ],
  [
    "girona",
    "barcelona",
    "road",
    "national road"
  ],
  [
    "barcelona",
    "tarragona",
    "road",
    "national road"
  ],
  [
    "santander",
    "oviedo",
    "road",
    "national road"
  ],
  [
    "oviedo",
    "santiago",
    "road",
    "national road"
  ],
  [
    "santiago",
    "vigo",
    "road",
    "national road"
  ],
  [
    "tarragona",
    "valencia",
    "road",
    "national road"
  ],
  [
    "valencia",
    "murcia",
    "road",
    "national road"
  ],
  [
    "palma",
    "ibiza",
    "sea",
    "Balearic ferry"
  ],
  [
    "palma",
    "mahon",
    "sea",
    "Balearic ferry"
  ],
  [
    "las_palmas",
    "santa_cruz",
    "sea",
    "Canary ferry"
  ],
  [
    "palma",
    "barcelona",
    "sea",
    "Barcelona–Palma ferry"
  ],
  [
    "palma",
    "valencia",
    "sea",
    "Valencia–Palma ferry"
  ],
  [
    "cadiz",
    "las_palmas",
    "sea",
    "Cádiz–Canaries shipping"
  ],
  [
    "algeciras",
    "ceuta",
    "sea",
    "Strait of Gibraltar ferry"
  ],
  [
    "malaga",
    "melilla",
    "sea",
    "Málaga–Melilla ferry"
  ]
],
  officers: staff([
  {
    "id": "es_pm",
    "name": "Carmen Alarcón",
    "title": "President of the Government",
    "rank": "Presidente del Gobierno",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 26,
    "int": 76,
    "pol": 78,
    "chr": 64,
    "personality": "diplomat",
    "region": "es.madrid",
    "bio": "Fictional prime minister. Not a real officeholder."
  },
  {
    "id": "es_def",
    "name": "Rafael Montoya",
    "title": "Minister of Defence",
    "rank": "Ministro",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 42,
    "int": 66,
    "pol": 54,
    "chr": 48,
    "personality": "cautious",
    "region": "es.madrid",
    "bio": "Fictional defence minister. Roster es_def."
  },
  {
    "id": "es_jemad",
    "name": "Lucía Herrero",
    "title": "Chief of the Defence Staff",
    "rank": "General de ejército",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 62,
    "pol": 32,
    "chr": 44,
    "personality": "loyalist",
    "region": "es.madrid",
    "bio": "Fictional JEMAD."
  },
  {
    "id": "es_north",
    "name": "Ander Etxebarria",
    "title": "Northern command",
    "rank": "Teniente general",
    "branch": "Army",
    "slot": "front_commander",
    "war": 60,
    "int": 54,
    "pol": 28,
    "chr": 40,
    "personality": "aggressive",
    "region": "es.bilbao",
    "bio": "Fictional northern commander. The Pyrenees are the land gate."
  },
  {
    "id": "es_navy",
    "name": "Beatriz Soler",
    "title": "Fleet",
    "rank": "Almirante",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 58,
    "int": 60,
    "pol": 30,
    "chr": 46,
    "personality": "cautious",
    "region": "es.cadiz",
    "bio": "Fictional admiral. Cádiz, the strait, and the Canaries are her map."
  },
  {
    "id": "es_east",
    "name": "Jordi Pallarès",
    "title": "Eastern command",
    "rank": "General",
    "branch": "Army",
    "slot": "field_officer",
    "war": 48,
    "int": 56,
    "pol": 34,
    "chr": 50,
    "personality": "merchant",
    "region": "es.barcelona",
    "bio": "Fictional eastern commander. Barcelona builds and ships."
  },
  {
    "id": "es_south",
    "name": "Pilar Navarro",
    "title": "Southern command",
    "rank": "General",
    "branch": "Army",
    "slot": "field_officer",
    "war": 46,
    "int": 50,
    "pol": 30,
    "chr": 44,
    "personality": "loyalist",
    "region": "es.seville",
    "bio": "Fictional southern commander, including the Gibraltar frontier."
  },
  {
    "id": "es_canary",
    "name": "Miguel Quesada",
    "title": "Canary command",
    "rank": "General",
    "branch": "Army",
    "slot": "field_officer",
    "war": 44,
    "int": 48,
    "pol": 26,
    "chr": 40,
    "personality": "recluse",
    "region": "es.las_palmas",
    "bio": "Fictional Canary Islands commander. The islands are supplied by sea."
  },
  {
    "id": "es_ceuta",
    "name": "Sofía Rueda",
    "title": "Ceuta command",
    "rank": "Coronel",
    "branch": "Army",
    "slot": "field_officer",
    "war": 40,
    "int": 46,
    "pol": 24,
    "chr": 38,
    "personality": "loyalist",
    "region": "es.ceuta",
    "bio": "Fictional colonel in Ceuta."
  },
  {
    "id": "es_armor",
    "name": "Héctor Salinas",
    "title": "Armour",
    "rank": "General",
    "branch": "Army",
    "slot": "field_officer",
    "war": 56,
    "int": 48,
    "pol": 28,
    "chr": 36,
    "personality": "aggressive",
    "region": "es.valladolid",
    "bio": "Fictional armour commander on the Castilian plain."
  }
]),
});
export const PORTUGAL_REGION = land({
  id: "pt",
  name: "Portugal",
  country: "PT",
  bbox: {"minLon": -30.03, "maxLon": -5.36, "minLat": 31.25, "maxLat": 43.21},
  notes: "Atlas only. Eighteen continental districts plus the Azores and Madeira, autonomous regions since 1976. Both island groups are reached by sea from Lisbon. Porto wine is carried as grapes. Occupied and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 4, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "PT-01",
    "name": "Aveiro",
    "kind": "district"
  },
  {
    "id": "PT-02",
    "name": "Beja",
    "kind": "district"
  },
  {
    "id": "PT-03",
    "name": "Braga",
    "kind": "district"
  },
  {
    "id": "PT-04",
    "name": "Bragança",
    "kind": "district"
  },
  {
    "id": "PT-05",
    "name": "Castelo Branco",
    "kind": "district"
  },
  {
    "id": "PT-06",
    "name": "Coimbra",
    "kind": "district"
  },
  {
    "id": "PT-07",
    "name": "Évora",
    "kind": "district"
  },
  {
    "id": "PT-08",
    "name": "Faro",
    "kind": "district"
  },
  {
    "id": "PT-09",
    "name": "Guarda",
    "kind": "district"
  },
  {
    "id": "PT-10",
    "name": "Leiria",
    "kind": "district"
  },
  {
    "id": "PT-11",
    "name": "Lisbon",
    "kind": "district"
  },
  {
    "id": "PT-12",
    "name": "Portalegre",
    "kind": "district"
  },
  {
    "id": "PT-13",
    "name": "Porto",
    "kind": "district"
  },
  {
    "id": "PT-14",
    "name": "Santarém",
    "kind": "district"
  },
  {
    "id": "PT-15",
    "name": "Setúbal",
    "kind": "district"
  },
  {
    "id": "PT-16",
    "name": "Viana do Castelo",
    "kind": "district"
  },
  {
    "id": "PT-17",
    "name": "Vila Real",
    "kind": "district"
  },
  {
    "id": "PT-18",
    "name": "Viseu",
    "kind": "district"
  },
  {
    "id": "PT-20",
    "name": "Azores",
    "kind": "autonomous region"
  },
  {
    "id": "PT-30",
    "name": "Madeira",
    "kind": "autonomous region"
  }
],
  cities: [
  [
    "aveiro",
    "Aveiro",
    "PT-01",
    40.641,
    -8.654,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "beja",
    "Beja",
    "PT-02",
    38.016,
    -7.865,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "braga",
    "Braga",
    "PT-03",
    41.545,
    -8.426,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "braganca",
    "Bragança",
    "PT-04",
    41.806,
    -6.757,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "castelo_branco",
    "Castelo Branco",
    "PT-05",
    39.822,
    -7.493,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "coimbra",
    "Coimbra",
    "PT-06",
    40.203,
    -8.41,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "evora",
    "Évora",
    "PT-07",
    38.571,
    -7.909,
    "capital",
    [
      "timber",
      "olives"
    ]
  ],
  [
    "faro",
    "Faro",
    "PT-08",
    37.019,
    -7.932,
    "capital",
    [
      "fisheries",
      "port"
    ]
  ],
  [
    "guarda",
    "Guarda",
    "PT-09",
    40.537,
    -7.268,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "leiria",
    "Leiria",
    "PT-10",
    39.744,
    -8.807,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lisbon",
    "Lisbon",
    "PT-11",
    38.722,
    -9.139,
    "capital",
    [
      "port",
      "administration"
    ]
  ],
  [
    "portalegre",
    "Portalegre",
    "PT-12",
    39.291,
    -7.431,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "porto",
    "Porto",
    "PT-13",
    41.157,
    -8.629,
    "capital",
    [
      "grapes",
      "port"
    ]
  ],
  [
    "santarem",
    "Santarém",
    "PT-14",
    39.236,
    -8.686,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "setubal",
    "Setúbal",
    "PT-15",
    38.524,
    -8.888,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "viana",
    "Viana do Castelo",
    "PT-16",
    41.693,
    -8.832,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "vila_real",
    "Vila Real",
    "PT-17",
    41.296,
    -7.746,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "viseu",
    "Viseu",
    "PT-18",
    40.657,
    -7.914,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ponta_delgada",
    "Ponta Delgada",
    "PT-20",
    37.741,
    -25.668,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "funchal",
    "Funchal",
    "PT-30",
    32.651,
    -16.909,
    "capital",
    [
      "grapes",
      "bananas"
    ]
  ],
  [
    "sines",
    "Sines",
    "PT-15",
    37.956,
    -8.87,
    "port",
    [
      "oil",
      "port"
    ]
  ],
  [
    "angra",
    "Angra do Heroísmo",
    "PT-20",
    38.656,
    -27.22,
    "city",
    [
      "administration"
    ]
  ],
  [
    "horta",
    "Horta",
    "PT-20",
    38.537,
    -28.63,
    "port",
    [
      "port"
    ]
  ],
  [
    "porto_santo",
    "Porto Santo",
    "PT-30",
    33.064,
    -16.335,
    "city",
    [
      "fisheries"
    ]
  ]
],
  links: [
  [
    "aveiro",
    "coimbra",
    "road",
    "national road"
  ],
  [
    "aveiro",
    "porto",
    "road",
    "national road"
  ],
  [
    "porto",
    "braga",
    "road",
    "national road"
  ],
  [
    "braga",
    "viana",
    "road",
    "national road"
  ],
  [
    "aveiro",
    "viseu",
    "road",
    "national road"
  ],
  [
    "viseu",
    "guarda",
    "road",
    "national road"
  ],
  [
    "coimbra",
    "leiria",
    "road",
    "national road"
  ],
  [
    "leiria",
    "santarem",
    "road",
    "national road"
  ],
  [
    "braga",
    "vila_real",
    "road",
    "national road"
  ],
  [
    "santarem",
    "lisbon",
    "road",
    "national road"
  ],
  [
    "lisbon",
    "setubal",
    "road",
    "national road"
  ],
  [
    "setubal",
    "sines",
    "road",
    "national road"
  ],
  [
    "setubal",
    "evora",
    "road",
    "national road"
  ],
  [
    "evora",
    "beja",
    "road",
    "national road"
  ],
  [
    "guarda",
    "castelo_branco",
    "road",
    "national road"
  ],
  [
    "castelo_branco",
    "portalegre",
    "road",
    "national road"
  ],
  [
    "vila_real",
    "braganca",
    "road",
    "national road"
  ],
  [
    "beja",
    "faro",
    "road",
    "national road"
  ],
  [
    "ponta_delgada",
    "angra",
    "sea",
    "Azores ferry"
  ],
  [
    "angra",
    "horta",
    "sea",
    "Azores ferry"
  ],
  [
    "funchal",
    "porto_santo",
    "sea",
    "Madeira ferry"
  ],
  [
    "lisbon",
    "ponta_delgada",
    "sea",
    "Lisbon–Azores shipping"
  ],
  [
    "lisbon",
    "funchal",
    "sea",
    "Lisbon–Madeira shipping"
  ]
],
  officers: staff([
  {
    "id": "pt_pm",
    "name": "Manuel Queirós",
    "title": "Prime Minister",
    "rank": "Primeiro-Ministro",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 24,
    "int": 72,
    "pol": 74,
    "chr": 62,
    "personality": "diplomat",
    "region": "pt.lisbon",
    "bio": "Fictional prime minister. Not a real officeholder. Roster pt_pm."
  },
  {
    "id": "pt_def",
    "name": "Teresa Lacerda",
    "title": "Minister of Defence",
    "rank": "Ministra",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 36,
    "int": 64,
    "pol": 52,
    "chr": 50,
    "personality": "cautious",
    "region": "pt.lisbon",
    "bio": "Fictional defence minister. Roster pt_def."
  },
  {
    "id": "pt_chief",
    "name": "Rui Macedo",
    "title": "Chief of the General Staff",
    "rank": "General",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 60,
    "int": 58,
    "pol": 30,
    "chr": 42,
    "personality": "loyalist",
    "region": "pt.lisbon",
    "bio": "Fictional chief of the general staff. Roster pt_chief."
  },
  {
    "id": "pt_navy",
    "name": "Helena Costa",
    "title": "Navy",
    "rank": "Almirante",
    "branch": "Navy",
    "slot": "front_commander",
    "war": 56,
    "int": 60,
    "pol": 28,
    "chr": 46,
    "personality": "cautious",
    "region": "pt.lisbon",
    "bio": "Fictional admiral. Lisbon, the Azores, and Madeira are the naval problem."
  },
  {
    "id": "pt_north",
    "name": "João Pimentel",
    "title": "Northern command",
    "rank": "Brigadeiro",
    "branch": "Army",
    "slot": "field_officer",
    "war": 48,
    "int": 46,
    "pol": 26,
    "chr": 40,
    "personality": "merchant",
    "region": "pt.porto",
    "bio": "Fictional northern brigadier. The Douro yield is port wine."
  },
  {
    "id": "pt_azores",
    "name": "Filipe Gago",
    "title": "Azores command",
    "rank": "Coronel",
    "branch": "Air force",
    "slot": "field_officer",
    "war": 42,
    "int": 50,
    "pol": 24,
    "chr": 38,
    "personality": "recluse",
    "region": "pt.ponta_delgada",
    "bio": "Fictional Azores colonel. Lajes is the airfield in the group; the pin is Ponta Delgada."
  }
]),
});
