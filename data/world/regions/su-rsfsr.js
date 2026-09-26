import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const RSFSR_REGION = land({
  "id": "ru",
  "name": "Russian SFSR",
  "country": "RU",
  "bbox": {
    "minLon": 18.41,
    "maxLon": 179.01,
    "minLat": 41.32,
    "maxLat": 70.91
  },
  "notes": "Atlas only. The RSFSR of 1985–89: oblasts, krais, ASSRs, autonomous oblasts, autonomous okrugs, and the cities of Moscow and Leningrad. Gorky, Kalinin, Kuibyshev, Sverdlovsk, and Ordzhonikidze keep those names. Chechen-Ingush is one ASSR. Chukotka is still inside Magadan Oblast, and Koryakia inside Kamchatka; the group names say so. Kaliningrad is an exclave, reached from Leningrad by sea. Sakhalin includes the Kurils. The Trans-Siberian and the BAM are drawn as roads. No road reaches China, Mongolia, or Japan. Occupied and off the week-0 march.",
  "defaultBiome": "continental",
  "climate": {
    "_default": {
      "sun": 2,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "RU-AMU",
      "name": "Amur",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-ARK",
      "name": "Arkhangelsk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-AST",
      "name": "Astrakhan",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-BEL",
      "name": "Belgorod",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-BRY",
      "name": "Bryansk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-CHE",
      "name": "Chelyabinsk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-CHI",
      "name": "Chita",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-GOR",
      "name": "Gorky",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-IRK",
      "name": "Irkutsk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-IVA",
      "name": "Ivanovo",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KGD",
      "name": "Kaliningrad",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KAL",
      "name": "Kalinin",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KLU",
      "name": "Kaluga",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KAM",
      "name": "Kamchatka",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KEM",
      "name": "Kemerovo",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KIR",
      "name": "Kirov",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KOS",
      "name": "Kostroma",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KUI",
      "name": "Kuibyshev",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KGN",
      "name": "Kurgan",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-KRS",
      "name": "Kursk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-LEN",
      "name": "Leningrad Oblast",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-LIP",
      "name": "Lipetsk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-MAG",
      "name": "Magadan",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-MOS",
      "name": "Moscow Oblast",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-MUR",
      "name": "Murmansk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-NGR",
      "name": "Novgorod",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-NVS",
      "name": "Novosibirsk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-OMS",
      "name": "Omsk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-ORL",
      "name": "Orel",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-ORE",
      "name": "Orenburg",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-PNZ",
      "name": "Penza",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-PER",
      "name": "Perm",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-PSK",
      "name": "Pskov",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-ROS",
      "name": "Rostov",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-RYA",
      "name": "Ryazan",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-SAK",
      "name": "Sakhalin",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-SAR",
      "name": "Saratov",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-SMO",
      "name": "Smolensk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-SVE",
      "name": "Sverdlovsk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-TAM",
      "name": "Tambov",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-TOM",
      "name": "Tomsk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-TUL",
      "name": "Tula",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-TYU",
      "name": "Tyumen",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-ULY",
      "name": "Ulyanovsk",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-VLA",
      "name": "Vladimir",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-VGG",
      "name": "Volgograd",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-VLG",
      "name": "Vologda",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-VOR",
      "name": "Voronezh",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-YAR",
      "name": "Yaroslavl",
      "kind": "oblast",
      "group": "RSFSR"
    },
    {
      "id": "RU-ALT",
      "name": "Altai",
      "kind": "krai",
      "group": "RSFSR"
    },
    {
      "id": "RU-KHA",
      "name": "Khabarovsk",
      "kind": "krai",
      "group": "RSFSR"
    },
    {
      "id": "RU-KDA",
      "name": "Krasnodar",
      "kind": "krai",
      "group": "RSFSR"
    },
    {
      "id": "RU-KYA",
      "name": "Krasnoyarsk",
      "kind": "krai",
      "group": "RSFSR"
    },
    {
      "id": "RU-PRI",
      "name": "Primorsky",
      "kind": "krai",
      "group": "RSFSR"
    },
    {
      "id": "RU-STA",
      "name": "Stavropol",
      "kind": "krai",
      "group": "RSFSR"
    },
    {
      "id": "RU-BA",
      "name": "Bashkir",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-BU",
      "name": "Buryat",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-CI",
      "name": "Chechen-Ingush",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-CU",
      "name": "Chuvash",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-DA",
      "name": "Dagestan",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-KB",
      "name": "Kabardino-Balkar",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-KL",
      "name": "Kalmyk",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-KR",
      "name": "Karelian",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-KO",
      "name": "Komi",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-ME",
      "name": "Mari",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-MO",
      "name": "Mordovian",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-SE",
      "name": "North Ossetian",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-TA",
      "name": "Tatar",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-TY",
      "name": "Tuva",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-UD",
      "name": "Udmurt",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-SA",
      "name": "Yakut",
      "kind": "assr",
      "group": "RSFSR"
    },
    {
      "id": "RU-AD",
      "name": "Adygei",
      "kind": "autonomous_oblast",
      "group": "Krasnodar Krai"
    },
    {
      "id": "RU-GA",
      "name": "Gorno-Altai",
      "kind": "autonomous_oblast",
      "group": "Altai Krai"
    },
    {
      "id": "RU-YEV",
      "name": "Jewish",
      "kind": "autonomous_oblast",
      "group": "Khabarovsk Krai"
    },
    {
      "id": "RU-KC",
      "name": "Karachay-Cherkess",
      "kind": "autonomous_oblast",
      "group": "Stavropol Krai"
    },
    {
      "id": "RU-KK",
      "name": "Khakass",
      "kind": "autonomous_oblast",
      "group": "Krasnoyarsk Krai"
    },
    {
      "id": "RU-AGB",
      "name": "Agin-Buryat",
      "kind": "autonomous_okrug",
      "group": "Chita Oblast"
    },
    {
      "id": "RU-CHU",
      "name": "Chukotka",
      "kind": "autonomous_okrug",
      "group": "Magadan Oblast"
    },
    {
      "id": "RU-EVE",
      "name": "Evenk",
      "kind": "autonomous_okrug",
      "group": "Krasnoyarsk Krai"
    },
    {
      "id": "RU-KHM",
      "name": "Khanty-Mansi",
      "kind": "autonomous_okrug",
      "group": "Tyumen Oblast"
    },
    {
      "id": "RU-KOP",
      "name": "Komi-Permyak",
      "kind": "autonomous_okrug",
      "group": "Perm Oblast"
    },
    {
      "id": "RU-KOR",
      "name": "Koryak",
      "kind": "autonomous_okrug",
      "group": "Kamchatka Oblast"
    },
    {
      "id": "RU-NEN",
      "name": "Nenets",
      "kind": "autonomous_okrug",
      "group": "Arkhangelsk Oblast"
    },
    {
      "id": "RU-TAY",
      "name": "Taymyr",
      "kind": "autonomous_okrug",
      "group": "Krasnoyarsk Krai"
    },
    {
      "id": "RU-UOB",
      "name": "Ust-Orda Buryat",
      "kind": "autonomous_okrug",
      "group": "Irkutsk Oblast"
    },
    {
      "id": "RU-YAN",
      "name": "Yamalo-Nenets",
      "kind": "autonomous_okrug",
      "group": "Tyumen Oblast"
    },
    {
      "id": "RU-MOW",
      "name": "Moscow",
      "kind": "city",
      "group": "RSFSR"
    },
    {
      "id": "RU-LDG",
      "name": "Leningrad",
      "kind": "city",
      "group": "RSFSR"
    }
  ],
  "cities": [
    [
      "blagoveshchensk",
      "Blagoveshchensk",
      "RU-AMU",
      50.29,
      127.54,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "arkhangelsk",
      "Arkhangelsk",
      "RU-ARK",
      64.54,
      40.54,
      "capital",
      [
        "timber",
        "port"
      ]
    ],
    [
      "astrakhan",
      "Astrakhan",
      "RU-AST",
      46.35,
      48.04,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "belgorod",
      "Belgorod",
      "RU-BEL",
      50.6,
      36.59,
      "capital",
      [
        "iron"
      ]
    ],
    [
      "bryansk",
      "Bryansk",
      "RU-BRY",
      53.25,
      34.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "chelyabinsk",
      "Chelyabinsk",
      "RU-CHE",
      55.16,
      61.4,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "chita",
      "Chita",
      "RU-CHI",
      52.03,
      113.5,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gorky",
      "Gorky",
      "RU-GOR",
      56.33,
      44.0,
      "capital",
      [
        "autos"
      ]
    ],
    [
      "irkutsk",
      "Irkutsk",
      "RU-IRK",
      52.29,
      104.3,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ivanovo",
      "Ivanovo",
      "RU-IVA",
      57.0,
      40.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kaliningrad",
      "Kaliningrad",
      "RU-KGD",
      54.71,
      20.51,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "kalinin",
      "Kalinin",
      "RU-KAL",
      56.86,
      35.92,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kaluga",
      "Kaluga",
      "RU-KLU",
      54.53,
      36.28,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "petropavlovsk",
      "Petropavlovsk-Kamchatsky",
      "RU-KAM",
      53.02,
      158.65,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "kemerovo",
      "Kemerovo",
      "RU-KEM",
      55.35,
      86.09,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "kirov",
      "Kirov",
      "RU-KIR",
      58.6,
      49.66,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kostroma",
      "Kostroma",
      "RU-KOS",
      57.77,
      40.93,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "kuibyshev",
      "Kuibyshev",
      "RU-KUI",
      53.2,
      50.15,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "kurgan",
      "Kurgan",
      "RU-KGN",
      55.44,
      65.34,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kursk",
      "Kursk",
      "RU-KRS",
      51.73,
      36.19,
      "capital",
      [
        "iron"
      ]
    ],
    [
      "gatchina",
      "Gatchina",
      "RU-LEN",
      59.57,
      30.12,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "lipetsk",
      "Lipetsk",
      "RU-LIP",
      52.61,
      39.59,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "magadan",
      "Magadan",
      "RU-MAG",
      59.56,
      150.8,
      "capital",
      [
        "gold"
      ]
    ],
    [
      "podolsk",
      "Podolsk",
      "RU-MOS",
      55.43,
      37.54,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "murmansk",
      "Murmansk",
      "RU-MUR",
      68.97,
      33.07,
      "capital",
      [
        "nickel",
        "phosphate",
        "port"
      ]
    ],
    [
      "novgorod",
      "Novgorod",
      "RU-NGR",
      58.52,
      31.27,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "novosibirsk",
      "Novosibirsk",
      "RU-NVS",
      55.03,
      82.92,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "omsk",
      "Omsk",
      "RU-OMS",
      54.99,
      73.37,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "orel",
      "Orel",
      "RU-ORL",
      52.97,
      36.07,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "orenburg",
      "Orenburg",
      "RU-ORE",
      51.77,
      55.1,
      "capital",
      [
        "natural_gas"
      ]
    ],
    [
      "penza",
      "Penza",
      "RU-PNZ",
      53.2,
      45.0,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "perm",
      "Perm",
      "RU-PER",
      58.01,
      56.25,
      "capital",
      [
        "potash"
      ]
    ],
    [
      "pskov",
      "Pskov",
      "RU-PSK",
      57.82,
      28.33,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "rostov",
      "Rostov-on-Don",
      "RU-ROS",
      47.23,
      39.72,
      "capital",
      [
        "wheat",
        "coal"
      ]
    ],
    [
      "ryazan",
      "Ryazan",
      "RU-RYA",
      54.63,
      39.74,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "yuzhno_sakhalinsk",
      "Yuzhno-Sakhalinsk",
      "RU-SAK",
      46.96,
      142.73,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "saratov",
      "Saratov",
      "RU-SAR",
      51.53,
      46.03,
      "capital",
      [
        "natural_gas",
        "wheat"
      ]
    ],
    [
      "smolensk",
      "Smolensk",
      "RU-SMO",
      54.78,
      32.04,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sverdlovsk",
      "Sverdlovsk",
      "RU-SVE",
      56.84,
      60.61,
      "capital",
      [
        "steel",
        "bauxite"
      ]
    ],
    [
      "tambov",
      "Tambov",
      "RU-TAM",
      52.72,
      41.45,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "tomsk",
      "Tomsk",
      "RU-TOM",
      56.5,
      84.97,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "tula",
      "Tula",
      "RU-TUL",
      54.2,
      37.62,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tyumen",
      "Tyumen",
      "RU-TYU",
      57.15,
      65.53,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "ulyanovsk",
      "Ulyanovsk",
      "RU-ULY",
      54.32,
      48.39,
      "capital",
      [
        "autos"
      ]
    ],
    [
      "vladimir",
      "Vladimir",
      "RU-VLA",
      56.14,
      40.4,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "volgograd",
      "Volgograd",
      "RU-VGG",
      48.71,
      44.51,
      "capital",
      [
        "steel",
        "hydro"
      ]
    ],
    [
      "vologda",
      "Vologda",
      "RU-VLG",
      59.22,
      39.89,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "voronezh",
      "Voronezh",
      "RU-VOR",
      51.67,
      39.18,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "yaroslavl",
      "Yaroslavl",
      "RU-YAR",
      57.63,
      39.87,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "barnaul",
      "Barnaul",
      "RU-ALT",
      53.35,
      83.78,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "khabarovsk",
      "Khabarovsk",
      "RU-KHA",
      48.48,
      135.07,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "krasnodar",
      "Krasnodar",
      "RU-KDA",
      45.04,
      38.98,
      "capital",
      [
        "wheat",
        "oil"
      ]
    ],
    [
      "krasnoyarsk",
      "Krasnoyarsk",
      "RU-KYA",
      56.02,
      92.87,
      "capital",
      [
        "hydro"
      ]
    ],
    [
      "vladivostok",
      "Vladivostok",
      "RU-PRI",
      43.12,
      131.89,
      "capital",
      [
        "port"
      ]
    ],
    [
      "stavropol",
      "Stavropol",
      "RU-STA",
      45.04,
      41.97,
      "capital",
      [
        "wheat",
        "natural_gas"
      ]
    ],
    [
      "ufa",
      "Ufa",
      "RU-BA",
      54.74,
      55.97,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "ulan_ude",
      "Ulan-Ude",
      "RU-BU",
      51.83,
      107.61,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "grozny",
      "Grozny",
      "RU-CI",
      43.32,
      45.69,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "cheboksary",
      "Cheboksary",
      "RU-CU",
      56.14,
      47.25,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "makhachkala",
      "Makhachkala",
      "RU-DA",
      42.98,
      47.5,
      "capital",
      [
        "port",
        "oil"
      ]
    ],
    [
      "nalchik",
      "Nalchik",
      "RU-KB",
      43.5,
      43.62,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "elista",
      "Elista",
      "RU-KL",
      46.31,
      44.27,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "petrozavodsk",
      "Petrozavodsk",
      "RU-KR",
      61.78,
      34.35,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "syktyvkar",
      "Syktyvkar",
      "RU-KO",
      61.67,
      50.81,
      "capital",
      [
        "coal",
        "timber"
      ]
    ],
    [
      "yoshkar_ola",
      "Yoshkar-Ola",
      "RU-ME",
      56.63,
      47.89,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "saransk",
      "Saransk",
      "RU-MO",
      54.18,
      45.17,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ordzhonikidze",
      "Ordzhonikidze",
      "RU-SE",
      43.02,
      44.68,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kazan",
      "Kazan",
      "RU-TA",
      55.8,
      49.11,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "kyzyl",
      "Kyzyl",
      "RU-TY",
      51.72,
      94.45,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "izhevsk",
      "Ustinov",
      "RU-UD",
      56.85,
      53.2,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "yakutsk",
      "Yakutsk",
      "RU-SA",
      62.03,
      129.73,
      "capital",
      [
        "gold"
      ]
    ],
    [
      "maykop",
      "Maykop",
      "RU-AD",
      44.61,
      40.11,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "gorno_altaysk",
      "Gorno-Altaysk",
      "RU-GA",
      51.96,
      85.96,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "birobidzhan",
      "Birobidzhan",
      "RU-YEV",
      48.79,
      132.92,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "cherkessk",
      "Cherkessk",
      "RU-KC",
      44.22,
      42.06,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "abakan",
      "Abakan",
      "RU-KK",
      53.72,
      91.43,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "aginskoye",
      "Aginskoye",
      "RU-AGB",
      51.1,
      114.53,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "anadyr",
      "Anadyr",
      "RU-CHU",
      64.73,
      177.51,
      "capital",
      [
        "gold",
        "port"
      ]
    ],
    [
      "tura",
      "Tura",
      "RU-EVE",
      64.27,
      100.22,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "khanty_mansiysk",
      "Khanty-Mansiysk",
      "RU-KHM",
      61.0,
      69.0,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "kudymkar",
      "Kudymkar",
      "RU-KOP",
      59.01,
      54.66,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "palana",
      "Palana",
      "RU-KOR",
      59.08,
      159.95,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "naryan_mar",
      "Naryan-Mar",
      "RU-NEN",
      67.64,
      53.01,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "dudinka",
      "Dudinka",
      "RU-TAY",
      69.41,
      86.18,
      "capital",
      [
        "port"
      ]
    ],
    [
      "ust_ordynsky",
      "Ust-Ordynsky",
      "RU-UOB",
      52.81,
      104.75,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "salekhard",
      "Salekhard",
      "RU-YAN",
      66.53,
      66.6,
      "capital",
      [
        "natural_gas"
      ]
    ],
    [
      "moscow",
      "Moscow",
      "RU-MOW",
      55.75,
      37.62,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "leningrad",
      "Leningrad",
      "RU-LDG",
      59.93,
      30.34,
      "capital",
      [
        "port"
      ]
    ],
    [
      "vyborg",
      "Vyborg",
      "RU-LEN",
      60.71,
      28.75,
      "city",
      [
        "port"
      ]
    ],
    [
      "kurilsk",
      "Kurilsk",
      "RU-SAK",
      45.23,
      147.88,
      "city",
      [
        "fisheries"
      ]
    ],
    [
      "provideniya",
      "Provideniya",
      "RU-CHU",
      64.42,
      173.23,
      "city",
      [
        "port"
      ]
    ],
    [
      "norilsk",
      "Norilsk",
      "RU-TAY",
      69.35,
      88.2,
      "city",
      [
        "nickel"
      ]
    ],
    [
      "surgut",
      "Surgut",
      "RU-KHM",
      61.25,
      73.4,
      "city",
      [
        "oil"
      ]
    ],
    [
      "novy_urengoy",
      "Novy Urengoy",
      "RU-YAN",
      66.08,
      76.68,
      "city",
      [
        "natural_gas"
      ]
    ],
    [
      "bratsk",
      "Bratsk",
      "RU-IRK",
      56.15,
      101.63,
      "city",
      [
        "hydro"
      ]
    ],
    [
      "taishet",
      "Taishet",
      "RU-IRK",
      55.93,
      98.0,
      "city",
      [
        "administration"
      ]
    ],
    [
      "severobaikalsk",
      "Severobaikalsk",
      "RU-BU",
      55.64,
      109.32,
      "city",
      [
        "administration"
      ]
    ],
    [
      "tynda",
      "Tynda",
      "RU-AMU",
      55.15,
      124.73,
      "city",
      [
        "administration"
      ]
    ],
    [
      "komsomolsk",
      "Komsomolsk-on-Amur",
      "RU-KHA",
      50.55,
      137.01,
      "city",
      [
        "steel"
      ]
    ],
    [
      "sovetskaya_gavan",
      "Sovetskaya Gavan",
      "RU-KHA",
      48.97,
      140.29,
      "city",
      [
        "port"
      ]
    ],
    [
      "tolyatti",
      "Tolyatti",
      "RU-KUI",
      53.51,
      49.42,
      "city",
      [
        "autos"
      ]
    ],
    [
      "mirny",
      "Mirny",
      "RU-SA",
      62.54,
      113.96,
      "city",
      [
        "diamonds"
      ]
    ],
    [
      "vorkuta",
      "Vorkuta",
      "RU-KO",
      67.5,
      64.0,
      "city",
      [
        "coal"
      ]
    ],
    [
      "nakhodka",
      "Nakhodka",
      "RU-PRI",
      42.82,
      132.87,
      "city",
      [
        "port"
      ]
    ],
    [
      "severodvinsk",
      "Severodvinsk",
      "RU-ARK",
      64.56,
      39.83,
      "city",
      [
        "port",
        "steel"
      ]
    ],
    [
      "novokuznetsk",
      "Novokuznetsk",
      "RU-KEM",
      53.76,
      87.11,
      "city",
      [
        "steel",
        "coal"
      ]
    ],
    [
      "magnitogorsk",
      "Magnitogorsk",
      "RU-CHE",
      53.41,
      59.05,
      "city",
      [
        "steel",
        "iron"
      ]
    ],
    [
      "baltiysk",
      "Baltiysk",
      "RU-KGD",
      54.65,
      19.91,
      "city",
      [
        "port"
      ]
    ],
    [
      "sortavala",
      "Sortavala",
      "RU-KR",
      61.7,
      30.69,
      "city",
      [
        "timber"
      ]
    ],
    [
      "novorossiysk",
      "Novorossiysk",
      "RU-KDA",
      44.72,
      37.77,
      "city",
      [
        "port"
      ]
    ]
  ],
  "links": [
    [
      "abakan",
      "kemerovo",
      "road",
      "local road"
    ],
    [
      "abakan",
      "krasnoyarsk",
      "road",
      "local road"
    ],
    [
      "abakan",
      "kyzyl",
      "road",
      "local road"
    ],
    [
      "aginskoye",
      "blagoveshchensk",
      "road",
      "winter road"
    ],
    [
      "aginskoye",
      "chita",
      "road",
      "local road"
    ],
    [
      "anadyr",
      "magadan",
      "sea",
      "Sea of Okhotsk"
    ],
    [
      "anadyr",
      "provideniya",
      "sea",
      "Gulf of Anadyr"
    ],
    [
      "arkhangelsk",
      "murmansk",
      "road",
      "local road"
    ],
    [
      "arkhangelsk",
      "naryan_mar",
      "sea",
      "White and Barents seas"
    ],
    [
      "arkhangelsk",
      "petrozavodsk",
      "road",
      "local road"
    ],
    [
      "arkhangelsk",
      "severodvinsk",
      "road",
      "local road"
    ],
    [
      "astrakhan",
      "elista",
      "road",
      "local road"
    ],
    [
      "baltiysk",
      "kaliningrad",
      "sea",
      "Kaliningrad lagoon"
    ],
    [
      "barnaul",
      "gorno_altaysk",
      "road",
      "Chuysky Trakt"
    ],
    [
      "barnaul",
      "novosibirsk",
      "road",
      "local road"
    ],
    [
      "belgorod",
      "kursk",
      "road",
      "local road"
    ],
    [
      "birobidzhan",
      "blagoveshchensk",
      "road",
      "local road"
    ],
    [
      "birobidzhan",
      "chita",
      "road",
      "Trans-Siberian"
    ],
    [
      "birobidzhan",
      "khabarovsk",
      "road",
      "Trans-Siberian"
    ],
    [
      "birobidzhan",
      "vladivostok",
      "road",
      "local road"
    ],
    [
      "blagoveshchensk",
      "tynda",
      "road",
      "BAM link to the Trans-Siberian"
    ],
    [
      "blagoveshchensk",
      "yakutsk",
      "road",
      "winter road"
    ],
    [
      "bratsk",
      "irkutsk",
      "road",
      "local road"
    ],
    [
      "bratsk",
      "severobaikalsk",
      "road",
      "BAM"
    ],
    [
      "bratsk",
      "taishet",
      "road",
      "BAM"
    ],
    [
      "bryansk",
      "orel",
      "road",
      "local road"
    ],
    [
      "bryansk",
      "smolensk",
      "road",
      "local road"
    ],
    [
      "cheboksary",
      "gorky",
      "road",
      "local road"
    ],
    [
      "cheboksary",
      "yoshkar_ola",
      "road",
      "local road"
    ],
    [
      "chelyabinsk",
      "kurgan",
      "road",
      "local road"
    ],
    [
      "chelyabinsk",
      "magnitogorsk",
      "road",
      "local road"
    ],
    [
      "chelyabinsk",
      "sverdlovsk",
      "road",
      "local road"
    ],
    [
      "chelyabinsk",
      "ufa",
      "road",
      "southern trunk"
    ],
    [
      "cherkessk",
      "nalchik",
      "road",
      "local road"
    ],
    [
      "cherkessk",
      "stavropol",
      "road",
      "local road"
    ],
    [
      "chita",
      "ulan_ude",
      "road",
      "Trans-Siberian"
    ],
    [
      "dudinka",
      "krasnoyarsk",
      "sea",
      "Yenisei"
    ],
    [
      "dudinka",
      "norilsk",
      "road",
      "Norilsk railway"
    ],
    [
      "elista",
      "stavropol",
      "road",
      "local road"
    ],
    [
      "elista",
      "volgograd",
      "road",
      "local road"
    ],
    [
      "gatchina",
      "leningrad",
      "road",
      "Kiev highway"
    ],
    [
      "gatchina",
      "novgorod",
      "road",
      "local road"
    ],
    [
      "gatchina",
      "vyborg",
      "road",
      "local road"
    ],
    [
      "gorky",
      "ivanovo",
      "road",
      "local road"
    ],
    [
      "grozny",
      "makhachkala",
      "road",
      "Caucasus highway"
    ],
    [
      "grozny",
      "nalchik",
      "road",
      "Caucasus highway"
    ],
    [
      "grozny",
      "ordzhonikidze",
      "road",
      "local road"
    ],
    [
      "irkutsk",
      "kyzyl",
      "road",
      "local road"
    ],
    [
      "irkutsk",
      "taishet",
      "road",
      "Trans-Siberian"
    ],
    [
      "irkutsk",
      "ulan_ude",
      "road",
      "Trans-Siberian"
    ],
    [
      "irkutsk",
      "ust_ordynsky",
      "road",
      "local road"
    ],
    [
      "ivanovo",
      "kostroma",
      "road",
      "local road"
    ],
    [
      "ivanovo",
      "vladimir",
      "road",
      "local road"
    ],
    [
      "izhevsk",
      "kazan",
      "road",
      "local road"
    ],
    [
      "izhevsk",
      "perm",
      "road",
      "local road"
    ],
    [
      "izhevsk",
      "ufa",
      "road",
      "local road"
    ],
    [
      "kalinin",
      "leningrad",
      "road",
      "M10"
    ],
    [
      "kalinin",
      "moscow",
      "road",
      "M10"
    ],
    [
      "kalinin",
      "novgorod",
      "road",
      "local road"
    ],
    [
      "kaliningrad",
      "leningrad",
      "sea",
      "Baltic"
    ],
    [
      "kaluga",
      "podolsk",
      "road",
      "local road"
    ],
    [
      "kaluga",
      "tula",
      "road",
      "local road"
    ],
    [
      "kazan",
      "ulyanovsk",
      "road",
      "local road"
    ],
    [
      "kazan",
      "yoshkar_ola",
      "road",
      "local road"
    ],
    [
      "kemerovo",
      "novokuznetsk",
      "road",
      "local road"
    ],
    [
      "kemerovo",
      "novosibirsk",
      "road",
      "local road"
    ],
    [
      "kemerovo",
      "tomsk",
      "road",
      "local road"
    ],
    [
      "khabarovsk",
      "komsomolsk",
      "road",
      "Volochaevka connector"
    ],
    [
      "khabarovsk",
      "sovetskaya_gavan",
      "road",
      "local road"
    ],
    [
      "khabarovsk",
      "vladivostok",
      "road",
      "Trans-Siberian"
    ],
    [
      "khanty_mansiysk",
      "salekhard",
      "sea",
      "Ob ferry"
    ],
    [
      "khanty_mansiysk",
      "surgut",
      "road",
      "local road"
    ],
    [
      "khanty_mansiysk",
      "tyumen",
      "road",
      "local road"
    ],
    [
      "kirov",
      "perm",
      "road",
      "Trans-Siberian"
    ],
    [
      "kirov",
      "syktyvkar",
      "road",
      "local road"
    ],
    [
      "kirov",
      "yaroslavl",
      "road",
      "Trans-Siberian"
    ],
    [
      "kirov",
      "yoshkar_ola",
      "road",
      "local road"
    ],
    [
      "komsomolsk",
      "sovetskaya_gavan",
      "road",
      "BAM"
    ],
    [
      "komsomolsk",
      "tynda",
      "road",
      "BAM"
    ],
    [
      "kostroma",
      "vologda",
      "road",
      "local road"
    ],
    [
      "kostroma",
      "yaroslavl",
      "road",
      "local road"
    ],
    [
      "krasnodar",
      "maykop",
      "road",
      "local road"
    ],
    [
      "krasnodar",
      "novorossiysk",
      "road",
      "local road"
    ],
    [
      "krasnodar",
      "rostov",
      "road",
      "M4"
    ],
    [
      "krasnoyarsk",
      "novosibirsk",
      "road",
      "Trans-Siberian"
    ],
    [
      "krasnoyarsk",
      "taishet",
      "road",
      "Trans-Siberian"
    ],
    [
      "krasnoyarsk",
      "tura",
      "road",
      "winter road"
    ],
    [
      "kudymkar",
      "perm",
      "road",
      "local road"
    ],
    [
      "kuibyshev",
      "penza",
      "road",
      "southern trunk"
    ],
    [
      "kuibyshev",
      "tolyatti",
      "road",
      "local road"
    ],
    [
      "kuibyshev",
      "ufa",
      "road",
      "southern trunk"
    ],
    [
      "kuibyshev",
      "ulyanovsk",
      "road",
      "local road"
    ],
    [
      "kurgan",
      "omsk",
      "road",
      "local road"
    ],
    [
      "kurgan",
      "tyumen",
      "road",
      "Trans-Siberian"
    ],
    [
      "kurilsk",
      "yuzhno_sakhalinsk",
      "sea",
      "Kuril strait"
    ],
    [
      "kursk",
      "orel",
      "road",
      "local road"
    ],
    [
      "kursk",
      "voronezh",
      "road",
      "local road"
    ],
    [
      "leningrad",
      "petrozavodsk",
      "road",
      "M18"
    ],
    [
      "lipetsk",
      "tambov",
      "road",
      "local road"
    ],
    [
      "lipetsk",
      "voronezh",
      "road",
      "local road"
    ],
    [
      "magadan",
      "petropavlovsk",
      "sea",
      "Sea of Okhotsk"
    ],
    [
      "magadan",
      "yakutsk",
      "road",
      "winter road"
    ],
    [
      "maykop",
      "stavropol",
      "road",
      "local road"
    ],
    [
      "mirny",
      "yakutsk",
      "road",
      "local road"
    ],
    [
      "moscow",
      "podolsk",
      "road",
      "M2"
    ],
    [
      "moscow",
      "ryazan",
      "road",
      "southern trunk"
    ],
    [
      "moscow",
      "yaroslavl",
      "road",
      "Trans-Siberian"
    ],
    [
      "murmansk",
      "petrozavodsk",
      "road",
      "M18"
    ],
    [
      "nakhodka",
      "vladivostok",
      "road",
      "local road"
    ],
    [
      "nalchik",
      "ordzhonikidze",
      "road",
      "Caucasus highway"
    ],
    [
      "novgorod",
      "pskov",
      "road",
      "local road"
    ],
    [
      "novosibirsk",
      "omsk",
      "road",
      "Trans-Siberian"
    ],
    [
      "novy_urengoy",
      "salekhard",
      "road",
      "local road"
    ],
    [
      "novy_urengoy",
      "surgut",
      "road",
      "Surgut–Urengoy railway"
    ],
    [
      "orel",
      "tula",
      "road",
      "local road"
    ],
    [
      "orenburg",
      "ufa",
      "road",
      "local road"
    ],
    [
      "palana",
      "petropavlovsk",
      "sea",
      "Shelekhov Gulf"
    ],
    [
      "penza",
      "ryazan",
      "road",
      "southern trunk"
    ],
    [
      "penza",
      "saransk",
      "road",
      "local road"
    ],
    [
      "penza",
      "saratov",
      "road",
      "local road"
    ],
    [
      "perm",
      "sverdlovsk",
      "road",
      "Trans-Siberian"
    ],
    [
      "petrozavodsk",
      "sortavala",
      "road",
      "local road"
    ],
    [
      "ryazan",
      "tula",
      "road",
      "local road"
    ],
    [
      "ryazan",
      "vladimir",
      "road",
      "local road"
    ],
    [
      "saransk",
      "ulyanovsk",
      "road",
      "local road"
    ],
    [
      "saratov",
      "volgograd",
      "road",
      "local road"
    ],
    [
      "severobaikalsk",
      "tynda",
      "road",
      "BAM"
    ],
    [
      "severobaikalsk",
      "ulan_ude",
      "road",
      "local road"
    ],
    [
      "sovetskaya_gavan",
      "yuzhno_sakhalinsk",
      "sea",
      "Vanino–Kholmsk ferry"
    ],
    [
      "sverdlovsk",
      "tyumen",
      "road",
      "Trans-Siberian"
    ],
    [
      "syktyvkar",
      "vorkuta",
      "road",
      "local road"
    ],
    [
      "ulan_ude",
      "ust_ordynsky",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "ru_head",
    "name": "Aleksei Voronin",
    "title": "Chairman of the RSFSR Presidium",
    "rank": "Chairman",
    "branch": "Presidium of the Supreme Soviet",
    "slot": "head_of_state",
    "war": 40,
    "int": 62,
    "pol": 74,
    "chr": 46,
    "personality": "loyalist",
    "bio": "Fictional head of this posting. Not a real officeholder. Roster ru_head.",
    "region": "ru.moscow"
  },
  {
    "id": "ru_def",
    "name": "Pavel Sorokin",
    "title": "Moscow Military District",
    "rank": "General armii",
    "branch": "Soviet Army",
    "slot": "defense_minister",
    "war": 76,
    "int": 68,
    "pol": 48,
    "chr": 40,
    "personality": "cautious",
    "bio": "Fictional defense minister. Roster ru_def.",
    "region": "ru.moscow"
  },
  {
    "id": "ru_chief",
    "name": "Irina Belkina",
    "title": "Chief of Staff, Moscow Military District",
    "rank": "General-polkovnik",
    "branch": "Soviet Army",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 78,
    "pol": 55,
    "chr": 36,
    "personality": "schemer",
    "bio": "Fictional chief of staff. Roster ru_chief.",
    "region": "ru.moscow"
  },
  {
    "id": "ru_f0",
    "name": "Viktor Belov",
    "title": "Leningrad Military District",
    "rank": "General-polkovnik",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 70,
    "int": 64,
    "pol": 40,
    "chr": 42,
    "personality": "cautious",
    "bio": "Fictional front commander. Roster ru_f0.",
    "region": "ru.leningrad"
  },
  {
    "id": "ru_field",
    "name": "Olga Morozova",
    "title": "Moscow garrison",
    "rank": "Polkovnik",
    "branch": "Soviet Army",
    "slot": "field_officer",
    "war": 52,
    "int": 70,
    "pol": 50,
    "chr": 58,
    "personality": "diplomat",
    "bio": "Fictional field officer. Roster ru_field.",
    "region": "ru.moscow"
  },
  {
    "id": "ru_f1",
    "name": "Sergei Yermakov",
    "title": "Far Eastern Military District",
    "rank": "General-polkovnik",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 74,
    "int": 58,
    "pol": 36,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional front commander. Roster ru_f1.",
    "region": "ru.khabarovsk"
  },
  {
    "id": "ru_f2",
    "name": "Boris Lapin",
    "title": "Siberian Military District",
    "rank": "General-leytenant",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 66,
    "int": 60,
    "pol": 38,
    "chr": 40,
    "personality": "loyalist",
    "bio": "Fictional front commander. Roster ru_f2.",
    "region": "ru.novosibirsk"
  },
  {
    "id": "ru_f3",
    "name": "Nikolai Grekov",
    "title": "North Caucasus Military District",
    "rank": "General-leytenant",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 68,
    "int": 52,
    "pol": 34,
    "chr": 32,
    "personality": "aggressive",
    "bio": "Fictional front commander. Roster ru_f3.",
    "region": "ru.rostov"
  },
  {
    "id": "ru_f4",
    "name": "Andrei Shubin",
    "title": "Transbaikal Military District",
    "rank": "General-mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 64,
    "int": 56,
    "pol": 30,
    "chr": 36,
    "personality": "cautious",
    "bio": "Fictional front commander. Roster ru_f4.",
    "region": "ru.chita"
  },
  {
    "id": "ru_f5",
    "name": "Gennady Reutov",
    "title": "Northern Fleet",
    "rank": "Vitse-admiral",
    "branch": "Soviet Navy",
    "slot": "front_commander",
    "war": 62,
    "int": 66,
    "pol": 34,
    "chr": 40,
    "personality": "merchant",
    "bio": "Fictional front commander. Roster ru_f5.",
    "region": "ru.murmansk"
  },
  {
    "id": "ru_f6",
    "name": "Pyotr Savin",
    "title": "Volga Military District",
    "rank": "General-leytenant",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 60,
    "int": 58,
    "pol": 42,
    "chr": 38,
    "personality": "loyalist",
    "bio": "Fictional front commander. Roster ru_f6.",
    "region": "ru.kuibyshev"
  },
  {
    "id": "ru_f7",
    "name": "Marina Volkova",
    "title": "Ural Military District",
    "rank": "General-mayor",
    "branch": "Soviet Army",
    "slot": "front_commander",
    "war": 58,
    "int": 64,
    "pol": 46,
    "chr": 48,
    "personality": "diplomat",
    "bio": "Fictional front commander. Roster ru_f7.",
    "region": "ru.sverdlovsk"
  }
])
});
