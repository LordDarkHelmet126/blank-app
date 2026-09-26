import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const POLAND_REGION = land({
  "id": "pl",
  "name": "Poland",
  "country": "PL",
  "bbox": {
    "minLon": 12.75,
    "maxLon": 24.97,
    "minLat": 48.12,
    "maxLat": 56.02
  },
  "notes": "Atlas only. The 49 voivodeships of the 1975 reform, kept until 1998. Katowice is Upper Silesian coal and steel, Legnica is Lubin copper, Tarnobrzeg is sulfur, Płock is the refinery, and Gdańsk, Gdynia, and Szczecin are the ports. Świnoujście, Słubice, and Zgorzelec are the East German crossings. Occupied and off the week-0 march.",
  "defaultBiome": "temperate",
  "climate": {
    "_default": {
      "sun": 2,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "PL-BP",
      "name": "Biała Podlaska",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-BL",
      "name": "Białystok",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-BB",
      "name": "Bielsko-Biała",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-BY",
      "name": "Bydgoszcz",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-CH",
      "name": "Chełm",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-CI",
      "name": "Ciechanów",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-CZ",
      "name": "Częstochowa",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-EL",
      "name": "Elbląg",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-GD",
      "name": "Gdańsk",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-GW",
      "name": "Gorzów Wielkopolski",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-JG",
      "name": "Jelenia Góra",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-KA",
      "name": "Kalisz",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-KT",
      "name": "Katowice",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-KI",
      "name": "Kielce",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-KN",
      "name": "Konin",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-KO",
      "name": "Koszalin",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-KR",
      "name": "Kraków",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-KS",
      "name": "Krosno",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-LG",
      "name": "Legnica",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-LE",
      "name": "Leszno",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-LU",
      "name": "Lublin",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-LM",
      "name": "Łomża",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-LD",
      "name": "Łódź",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-NS",
      "name": "Nowy Sącz",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-OL",
      "name": "Olsztyn",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-OP",
      "name": "Opole",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-OS",
      "name": "Ostrołęka",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-PI",
      "name": "Piła",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-PT",
      "name": "Piotrków Trybunalski",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-PL",
      "name": "Płock",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-PZ",
      "name": "Poznań",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-PR",
      "name": "Przemyśl",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-RA",
      "name": "Radom",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-RZ",
      "name": "Rzeszów",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-SI",
      "name": "Siedlce",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-SR",
      "name": "Sieradz",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-SK",
      "name": "Skierniewice",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-SL",
      "name": "Słupsk",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-SU",
      "name": "Suwałki",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-SZ",
      "name": "Szczecin",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-TB",
      "name": "Tarnobrzeg",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-TA",
      "name": "Tarnów",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-TO",
      "name": "Toruń",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-WB",
      "name": "Wałbrzych",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-WA",
      "name": "Warszawa",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-WL",
      "name": "Włocławek",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-WR",
      "name": "Wrocław",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-ZA",
      "name": "Zamość",
      "kind": "voivodeship",
      "group": null
    },
    {
      "id": "PL-ZG",
      "name": "Zielona Góra",
      "kind": "voivodeship",
      "group": null
    }
  ],
  "cities": [
    [
      "biala_podlaska",
      "Biała Podlaska",
      "PL-BP",
      52.03,
      23.12,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "bialystok",
      "Białystok",
      "PL-BL",
      53.13,
      23.16,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bielsko",
      "Bielsko-Biała",
      "PL-BB",
      49.82,
      19.06,
      "capital",
      [
        "autos"
      ]
    ],
    [
      "bydgoszcz",
      "Bydgoszcz",
      "PL-BY",
      53.12,
      18.0,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "chelm",
      "Chełm",
      "PL-CH",
      51.14,
      23.47,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "ciechanow",
      "Ciechanów",
      "PL-CI",
      52.88,
      20.62,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "czestochowa",
      "Częstochowa",
      "PL-CZ",
      50.81,
      19.12,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "elblag",
      "Elbląg",
      "PL-EL",
      54.16,
      19.4,
      "capital",
      [
        "port"
      ]
    ],
    [
      "gdansk",
      "Gdańsk",
      "PL-GD",
      54.35,
      18.65,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "gorzow",
      "Gorzów Wielkopolski",
      "PL-GW",
      52.74,
      15.23,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "jelenia_gora",
      "Jelenia Góra",
      "PL-JG",
      50.9,
      15.73,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "kalisz",
      "Kalisz",
      "PL-KA",
      51.76,
      18.09,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "katowice",
      "Katowice",
      "PL-KT",
      50.26,
      19.02,
      "capital",
      [
        "coal",
        "steel"
      ]
    ],
    [
      "kielce",
      "Kielce",
      "PL-KI",
      50.87,
      20.63,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "konin",
      "Konin",
      "PL-KN",
      52.22,
      18.25,
      "capital",
      [
        "lignite"
      ]
    ],
    [
      "koszalin",
      "Koszalin",
      "PL-KO",
      54.19,
      16.18,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "krakow",
      "Kraków",
      "PL-KR",
      50.06,
      19.94,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "krosno",
      "Krosno",
      "PL-KS",
      49.69,
      21.77,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "legnica",
      "Legnica",
      "PL-LG",
      51.21,
      16.16,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "leszno",
      "Leszno",
      "PL-LE",
      51.84,
      16.57,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "lublin",
      "Lublin",
      "PL-LU",
      51.25,
      22.57,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "lomza",
      "Łomża",
      "PL-LM",
      53.18,
      22.06,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "lodz",
      "Łódź",
      "PL-LD",
      51.76,
      19.46,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "nowy_sacz",
      "Nowy Sącz",
      "PL-NS",
      49.62,
      20.7,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "olsztyn",
      "Olsztyn",
      "PL-OL",
      53.78,
      20.49,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "opole",
      "Opole",
      "PL-OP",
      50.68,
      17.92,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ostroleka",
      "Ostrołęka",
      "PL-OS",
      53.09,
      21.57,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pila",
      "Piła",
      "PL-PI",
      53.15,
      16.74,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "piotrkow",
      "Piotrków Trybunalski",
      "PL-PT",
      51.41,
      19.7,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "plock",
      "Płock",
      "PL-PL",
      52.55,
      19.7,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "poznan",
      "Poznań",
      "PL-PZ",
      52.41,
      16.93,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "przemysl",
      "Przemyśl",
      "PL-PR",
      49.78,
      22.77,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "radom",
      "Radom",
      "PL-RA",
      51.4,
      21.15,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "rzeszow",
      "Rzeszów",
      "PL-RZ",
      50.04,
      22.0,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "siedlce",
      "Siedlce",
      "PL-SI",
      52.17,
      22.29,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "sieradz",
      "Sieradz",
      "PL-SR",
      51.6,
      18.73,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "skierniewice",
      "Skierniewice",
      "PL-SK",
      51.95,
      20.16,
      "capital",
      [
        "apples"
      ]
    ],
    [
      "slupsk",
      "Słupsk",
      "PL-SL",
      54.46,
      17.03,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "suwalki",
      "Suwałki",
      "PL-SU",
      54.11,
      22.93,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "szczecin",
      "Szczecin",
      "PL-SZ",
      53.43,
      14.55,
      "capital",
      [
        "port"
      ]
    ],
    [
      "tarnobrzeg",
      "Tarnobrzeg",
      "PL-TB",
      50.57,
      21.68,
      "capital",
      [
        "sulfur"
      ]
    ],
    [
      "tarnow",
      "Tarnów",
      "PL-TA",
      50.01,
      20.99,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "torun",
      "Toruń",
      "PL-TO",
      53.01,
      18.6,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "walbrzych",
      "Wałbrzych",
      "PL-WB",
      50.77,
      16.28,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "warsaw",
      "Warsaw",
      "PL-WA",
      52.23,
      21.01,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "wloclawek",
      "Włocławek",
      "PL-WL",
      52.65,
      19.07,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "wroclaw",
      "Wrocław",
      "PL-WR",
      51.11,
      17.04,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zamosc",
      "Zamość",
      "PL-ZA",
      50.72,
      23.25,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "zielona_gora",
      "Zielona Góra",
      "PL-ZG",
      51.94,
      15.51,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "slubice",
      "Słubice",
      "PL-GW",
      52.35,
      14.56,
      "city",
      [
        "wheat"
      ]
    ],
    [
      "zgorzelec",
      "Zgorzelec",
      "PL-JG",
      51.15,
      15.0,
      "city",
      [
        "wheat"
      ]
    ],
    [
      "swinoujscie",
      "Świnoujście",
      "PL-SZ",
      53.91,
      14.25,
      "city",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "gdynia",
      "Gdynia",
      "PL-GD",
      54.52,
      18.53,
      "city",
      [
        "port"
      ]
    ]
  ],
  "links": [
    [
      "biala_podlaska",
      "lublin",
      "road",
      "local road"
    ],
    [
      "biala_podlaska",
      "siedlce",
      "road",
      "local road"
    ],
    [
      "bialystok",
      "lomza",
      "road",
      "local road"
    ],
    [
      "bialystok",
      "suwalki",
      "road",
      "local road"
    ],
    [
      "bialystok",
      "warsaw",
      "road",
      "E67"
    ],
    [
      "bielsko",
      "katowice",
      "road",
      "local road"
    ],
    [
      "bielsko",
      "krakow",
      "road",
      "local road"
    ],
    [
      "bydgoszcz",
      "pila",
      "road",
      "local road"
    ],
    [
      "bydgoszcz",
      "torun",
      "road",
      "local road"
    ],
    [
      "chelm",
      "lublin",
      "road",
      "local road"
    ],
    [
      "chelm",
      "zamosc",
      "road",
      "local road"
    ],
    [
      "ciechanow",
      "olsztyn",
      "road",
      "local road"
    ],
    [
      "ciechanow",
      "ostroleka",
      "road",
      "local road"
    ],
    [
      "ciechanow",
      "plock",
      "road",
      "local road"
    ],
    [
      "czestochowa",
      "katowice",
      "road",
      "local road"
    ],
    [
      "czestochowa",
      "piotrkow",
      "road",
      "local road"
    ],
    [
      "elblag",
      "gdansk",
      "road",
      "local road"
    ],
    [
      "elblag",
      "olsztyn",
      "road",
      "local road"
    ],
    [
      "gdansk",
      "gdynia",
      "road",
      "local road"
    ],
    [
      "gdansk",
      "slupsk",
      "road",
      "local road"
    ],
    [
      "gdansk",
      "szczecin",
      "road",
      "E28"
    ],
    [
      "gdansk",
      "warsaw",
      "road",
      "E75"
    ],
    [
      "gorzow",
      "poznan",
      "road",
      "E30"
    ],
    [
      "gorzow",
      "slubice",
      "road",
      "E30"
    ],
    [
      "gorzow",
      "szczecin",
      "road",
      "local road"
    ],
    [
      "gorzow",
      "zielona_gora",
      "road",
      "local road"
    ],
    [
      "jelenia_gora",
      "legnica",
      "road",
      "local road"
    ],
    [
      "jelenia_gora",
      "walbrzych",
      "road",
      "local road"
    ],
    [
      "jelenia_gora",
      "zgorzelec",
      "road",
      "local road"
    ],
    [
      "kalisz",
      "konin",
      "road",
      "local road"
    ],
    [
      "kalisz",
      "sieradz",
      "road",
      "local road"
    ],
    [
      "katowice",
      "krakow",
      "road",
      "E40"
    ],
    [
      "katowice",
      "warsaw",
      "road",
      "E75"
    ],
    [
      "kielce",
      "radom",
      "road",
      "local road"
    ],
    [
      "kielce",
      "tarnobrzeg",
      "road",
      "local road"
    ],
    [
      "konin",
      "wloclawek",
      "road",
      "local road"
    ],
    [
      "koszalin",
      "slupsk",
      "road",
      "local road"
    ],
    [
      "krakow",
      "nowy_sacz",
      "road",
      "local road"
    ],
    [
      "krakow",
      "przemysl",
      "road",
      "E40"
    ],
    [
      "krakow",
      "wroclaw",
      "road",
      "E40"
    ],
    [
      "krosno",
      "rzeszow",
      "road",
      "local road"
    ],
    [
      "krosno",
      "tarnow",
      "road",
      "local road"
    ],
    [
      "legnica",
      "leszno",
      "road",
      "local road"
    ],
    [
      "legnica",
      "wroclaw",
      "road",
      "local road"
    ],
    [
      "leszno",
      "poznan",
      "road",
      "local road"
    ],
    [
      "leszno",
      "zielona_gora",
      "road",
      "local road"
    ],
    [
      "lodz",
      "piotrkow",
      "road",
      "local road"
    ],
    [
      "lodz",
      "sieradz",
      "road",
      "local road"
    ],
    [
      "lodz",
      "skierniewice",
      "road",
      "local road"
    ],
    [
      "lomza",
      "ostroleka",
      "road",
      "local road"
    ],
    [
      "nowy_sacz",
      "tarnow",
      "road",
      "local road"
    ],
    [
      "opole",
      "wroclaw",
      "road",
      "local road"
    ],
    [
      "pila",
      "poznan",
      "road",
      "local road"
    ],
    [
      "plock",
      "wloclawek",
      "road",
      "local road"
    ],
    [
      "poznan",
      "warsaw",
      "road",
      "E30"
    ],
    [
      "przemysl",
      "rzeszow",
      "road",
      "local road"
    ],
    [
      "rzeszow",
      "tarnobrzeg",
      "road",
      "local road"
    ],
    [
      "siedlce",
      "warsaw",
      "road",
      "local road"
    ],
    [
      "skierniewice",
      "warsaw",
      "road",
      "local road"
    ],
    [
      "swinoujscie",
      "szczecin",
      "road",
      "local road"
    ],
    [
      "torun",
      "wloclawek",
      "road",
      "local road"
    ],
    [
      "wroclaw",
      "zgorzelec",
      "road",
      "E40"
    ]
  ]
,
  officers: staff([
  {
    "id": "pl_head",
    "name": "Ryszard Bielecki",
    "title": "Chairman of the Council of State",
    "rank": "Chairman",
    "branch": "Council of State",
    "slot": "head_of_state",
    "war": 42,
    "int": 60,
    "pol": 74,
    "chr": 48,
    "personality": "loyalist",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "pl.warsaw"
  },
  {
    "id": "pl_def",
    "name": "Tomasz Wróblewski",
    "title": "Minister of National Defence",
    "rank": "Generał broni",
    "branch": "Polish People's Army",
    "slot": "defense_minister",
    "war": 72,
    "int": 54,
    "pol": 46,
    "chr": 36,
    "personality": "aggressive",
    "bio": "Fictional defense minister.",
    "region": "pl.warsaw"
  },
  {
    "id": "pl_chief",
    "name": "Ewa Sadowska",
    "title": "Chief of the General Staff",
    "rank": "Generał dywizji",
    "branch": "Polish People's Army",
    "slot": "chief_of_staff",
    "war": 66,
    "int": 70,
    "pol": 40,
    "chr": 44,
    "personality": "cautious",
    "bio": "Fictional chief of staff.",
    "region": "pl.warsaw"
  },
  {
    "id": "pl_f0",
    "name": "Halina Kwiatkowska",
    "title": "Pomeranian Military District",
    "rank": "Generał brygady",
    "branch": "Polish People's Army",
    "slot": "front_commander",
    "war": 62,
    "int": 58,
    "pol": 40,
    "chr": 44,
    "personality": "cautious",
    "bio": "Fictional front commander.",
    "region": "pl.gdansk"
  },
  {
    "id": "pl_field",
    "name": "Hanna Zielińska",
    "title": "Warsaw garrison",
    "rank": "Pułkownik",
    "branch": "Polish People's Army",
    "slot": "field_officer",
    "war": 54,
    "int": 58,
    "pol": 48,
    "chr": 52,
    "personality": "loyalist",
    "bio": "Fictional field officer.",
    "region": "pl.warsaw"
  },
  {
    "id": "pl_f1",
    "name": "Jerzy Kalinowski",
    "title": "Silesian Military District",
    "rank": "Generał brygady",
    "branch": "Polish People's Army",
    "slot": "front_commander",
    "war": 70,
    "int": 48,
    "pol": 36,
    "chr": 34,
    "personality": "aggressive",
    "bio": "Fictional front commander.",
    "region": "pl.katowice"
  },
  {
    "id": "pl_f2",
    "name": "Czesław Majewski",
    "title": "Warsaw Military District",
    "rank": "Generał brygady",
    "branch": "Polish People's Army",
    "slot": "front_commander",
    "war": 64,
    "int": 60,
    "pol": 50,
    "chr": 42,
    "personality": "loyalist",
    "bio": "Fictional front commander.",
    "region": "pl.warsaw"
  },
  {
    "id": "pl_f3",
    "name": "Andrzej Piotrowski",
    "title": "Polish Navy",
    "rank": "Kontradmirał",
    "branch": "Marynarka Wojenna",
    "slot": "front_commander",
    "war": 58,
    "int": 64,
    "pol": 38,
    "chr": 46,
    "personality": "merchant",
    "bio": "Fictional front commander.",
    "region": "pl.gdynia"
  }
])
});
