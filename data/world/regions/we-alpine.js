import { buildRegion, staff } from "../build-region.js";

function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const SWITZERLAND_REGION = land({
  id: "ch",
  name: "Switzerland",
  country: "CH",
  bbox: {"minLon": 4.74, "maxLon": 10.93, "minLat": 44.43, "maxLat": 49.1},
  notes: "Atlas only. Twenty-six cantons. Jura has been a canton since 1979. The Gotthard road tunnel opened in 1980 and stays inside Switzerland. Great St Bernard, Simplon, and Chiasso are the Italian crossings. Neutral, occupied on this map, and off the week-0 march.",
  defaultBiome: "alpine",
  climate: {"_default": {"sun": 2, "weather": 3}},
  biome: {},
  subs: [
  {
    "id": "CH-ZH",
    "name": "Zürich",
    "kind": "canton"
  },
  {
    "id": "CH-BE",
    "name": "Bern",
    "kind": "canton"
  },
  {
    "id": "CH-LU",
    "name": "Lucerne",
    "kind": "canton"
  },
  {
    "id": "CH-UR",
    "name": "Uri",
    "kind": "canton"
  },
  {
    "id": "CH-SZ",
    "name": "Schwyz",
    "kind": "canton"
  },
  {
    "id": "CH-OW",
    "name": "Obwalden",
    "kind": "canton"
  },
  {
    "id": "CH-NW",
    "name": "Nidwalden",
    "kind": "canton"
  },
  {
    "id": "CH-GL",
    "name": "Glarus",
    "kind": "canton"
  },
  {
    "id": "CH-ZG",
    "name": "Zug",
    "kind": "canton"
  },
  {
    "id": "CH-FR",
    "name": "Fribourg",
    "kind": "canton"
  },
  {
    "id": "CH-SO",
    "name": "Solothurn",
    "kind": "canton"
  },
  {
    "id": "CH-BS",
    "name": "Basel-Stadt",
    "kind": "canton"
  },
  {
    "id": "CH-BL",
    "name": "Basel-Landschaft",
    "kind": "canton"
  },
  {
    "id": "CH-SH",
    "name": "Schaffhausen",
    "kind": "canton"
  },
  {
    "id": "CH-AR",
    "name": "Appenzell Ausserrhoden",
    "kind": "canton"
  },
  {
    "id": "CH-AI",
    "name": "Appenzell Innerrhoden",
    "kind": "canton"
  },
  {
    "id": "CH-SG",
    "name": "St. Gallen",
    "kind": "canton"
  },
  {
    "id": "CH-GR",
    "name": "Graubünden",
    "kind": "canton"
  },
  {
    "id": "CH-AG",
    "name": "Aargau",
    "kind": "canton"
  },
  {
    "id": "CH-TG",
    "name": "Thurgau",
    "kind": "canton"
  },
  {
    "id": "CH-TI",
    "name": "Ticino",
    "kind": "canton"
  },
  {
    "id": "CH-VD",
    "name": "Vaud",
    "kind": "canton"
  },
  {
    "id": "CH-VS",
    "name": "Valais",
    "kind": "canton"
  },
  {
    "id": "CH-NE",
    "name": "Neuchâtel",
    "kind": "canton"
  },
  {
    "id": "CH-GE",
    "name": "Geneva",
    "kind": "canton"
  },
  {
    "id": "CH-JU",
    "name": "Jura",
    "kind": "canton"
  }
],
  cities: [
  [
    "zurich",
    "Zürich",
    "CH-ZH",
    47.377,
    8.541,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bern",
    "Bern",
    "CH-BE",
    46.948,
    7.447,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lucerne",
    "Lucerne",
    "CH-LU",
    47.05,
    8.306,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "altdorf",
    "Altdorf",
    "CH-UR",
    46.88,
    8.644,
    "capital",
    [
      "hydro"
    ]
  ],
  [
    "schwyz",
    "Schwyz",
    "CH-SZ",
    47.021,
    8.653,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "sarnen",
    "Sarnen",
    "CH-OW",
    46.896,
    8.245,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "stans",
    "Stans",
    "CH-NW",
    46.958,
    8.366,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "glarus",
    "Glarus",
    "CH-GL",
    47.041,
    9.068,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "zug",
    "Zug",
    "CH-ZG",
    47.166,
    8.516,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "fribourg",
    "Fribourg",
    "CH-FR",
    46.806,
    7.162,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "solothurn",
    "Solothurn",
    "CH-SO",
    47.208,
    7.537,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "basel",
    "Basel",
    "CH-BS",
    47.56,
    7.589,
    "capital",
    [
      "port",
      "administration"
    ]
  ],
  [
    "liestal",
    "Liestal",
    "CH-BL",
    47.486,
    7.735,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "schaffhausen",
    "Schaffhausen",
    "CH-SH",
    47.697,
    8.634,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "herisau",
    "Herisau",
    "CH-AR",
    47.386,
    9.279,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "appenzell",
    "Appenzell",
    "CH-AI",
    47.331,
    9.409,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "stgallen",
    "St. Gallen",
    "CH-SG",
    47.424,
    9.376,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "chur",
    "Chur",
    "CH-GR",
    46.85,
    9.532,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "aarau",
    "Aarau",
    "CH-AG",
    47.392,
    8.044,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "frauenfeld",
    "Frauenfeld",
    "CH-TG",
    47.558,
    8.899,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bellinzona",
    "Bellinzona",
    "CH-TI",
    46.195,
    9.017,
    "capital",
    [
      "hydro"
    ]
  ],
  [
    "lausanne",
    "Lausanne",
    "CH-VD",
    46.519,
    6.633,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "sion",
    "Sion",
    "CH-VS",
    46.233,
    7.36,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "neuchatel",
    "Neuchâtel",
    "CH-NE",
    46.99,
    6.929,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "geneva",
    "Geneva",
    "CH-GE",
    46.204,
    6.143,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "delemont",
    "Delémont",
    "CH-JU",
    47.365,
    7.345,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "martigny",
    "Martigny",
    "CH-VS",
    46.103,
    7.073,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "brig",
    "Brig",
    "CH-VS",
    46.316,
    7.988,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "chiasso",
    "Chiasso",
    "CH-TI",
    45.832,
    9.031,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "sargans",
    "Sargans",
    "CH-SG",
    47.049,
    9.441,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "kreuzlingen",
    "Kreuzlingen",
    "CH-TG",
    47.65,
    9.175,
    "city",
    [
      "wheat"
    ]
  ]
],
  links: [
  [
    "zurich",
    "zug",
    "road",
    "cantonal road"
  ],
  [
    "zug",
    "schwyz",
    "road",
    "cantonal road"
  ],
  [
    "schwyz",
    "altdorf",
    "road",
    "cantonal road"
  ],
  [
    "zug",
    "lucerne",
    "road",
    "cantonal road"
  ],
  [
    "lucerne",
    "stans",
    "road",
    "cantonal road"
  ],
  [
    "stans",
    "sarnen",
    "road",
    "cantonal road"
  ],
  [
    "schwyz",
    "glarus",
    "road",
    "cantonal road"
  ],
  [
    "glarus",
    "sargans",
    "road",
    "cantonal road"
  ],
  [
    "sargans",
    "chur",
    "road",
    "cantonal road"
  ],
  [
    "sargans",
    "appenzell",
    "road",
    "cantonal road"
  ],
  [
    "appenzell",
    "stgallen",
    "road",
    "cantonal road"
  ],
  [
    "stgallen",
    "herisau",
    "road",
    "cantonal road"
  ],
  [
    "stgallen",
    "kreuzlingen",
    "road",
    "cantonal road"
  ],
  [
    "kreuzlingen",
    "frauenfeld",
    "road",
    "cantonal road"
  ],
  [
    "frauenfeld",
    "schaffhausen",
    "road",
    "cantonal road"
  ],
  [
    "zurich",
    "aarau",
    "road",
    "cantonal road"
  ],
  [
    "aarau",
    "liestal",
    "road",
    "cantonal road"
  ],
  [
    "liestal",
    "basel",
    "road",
    "cantonal road"
  ],
  [
    "basel",
    "delemont",
    "road",
    "cantonal road"
  ],
  [
    "delemont",
    "solothurn",
    "road",
    "cantonal road"
  ],
  [
    "solothurn",
    "bern",
    "road",
    "cantonal road"
  ],
  [
    "bern",
    "fribourg",
    "road",
    "cantonal road"
  ],
  [
    "fribourg",
    "neuchatel",
    "road",
    "cantonal road"
  ],
  [
    "fribourg",
    "lausanne",
    "road",
    "cantonal road"
  ],
  [
    "lausanne",
    "geneva",
    "road",
    "cantonal road"
  ],
  [
    "lausanne",
    "martigny",
    "road",
    "cantonal road"
  ],
  [
    "martigny",
    "sion",
    "road",
    "cantonal road"
  ],
  [
    "sion",
    "brig",
    "road",
    "cantonal road"
  ],
  [
    "altdorf",
    "bellinzona",
    "road",
    "cantonal road"
  ],
  [
    "bellinzona",
    "chiasso",
    "road",
    "cantonal road"
  ]
],
  officers: staff([
  {
    "id": "ch_pres",
    "name": "Urs Betschart",
    "title": "President of the Confederation",
    "rank": "Bundespräsident",
    "branch": "Federal Council",
    "slot": "head_of_state",
    "war": 24,
    "int": 74,
    "pol": 78,
    "chr": 66,
    "personality": "diplomat",
    "region": "ch.bern",
    "bio": "Fictional president for the rotating chair. Not a real federal councillor."
  },
  {
    "id": "ch_def",
    "name": "Klara Meier",
    "title": "Head of the Military Department",
    "rank": "Bundesrat",
    "branch": "Military Department",
    "slot": "defense_minister",
    "war": 36,
    "int": 68,
    "pol": 60,
    "chr": 54,
    "personality": "cautious",
    "region": "ch.bern",
    "bio": "Fictional head of the defence department."
  },
  {
    "id": "ch_chief",
    "name": "Hansjörg Ruf",
    "title": "Chief of the General Staff",
    "rank": "Korpskommandant",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 66,
    "pol": 30,
    "chr": 42,
    "personality": "loyalist",
    "region": "ch.bern",
    "bio": "Fictional chief of the general staff. The militia army is the plan."
  },
  {
    "id": "ch_alps",
    "name": "Madeleine Rochat",
    "title": "Alpine redoubt",
    "rank": "Divisionär",
    "branch": "Army",
    "slot": "front_commander",
    "war": 60,
    "int": 58,
    "pol": 28,
    "chr": 44,
    "personality": "recluse",
    "region": "ch.sion",
    "bio": "Fictional alpine commander. The passes are the map she keeps."
  },
  {
    "id": "ch_gotthard",
    "name": "Reto Gisler",
    "title": "Gotthard sector",
    "rank": "Oberst",
    "branch": "Fortress troops",
    "slot": "field_officer",
    "war": 52,
    "int": 54,
    "pol": 24,
    "chr": 36,
    "personality": "loyalist",
    "region": "ch.altdorf",
    "bio": "Fictional fortress colonel at the Gotthard."
  },
  {
    "id": "ch_rhine",
    "name": "Eva Steiner",
    "title": "Basel approaches",
    "rank": "Oberst",
    "branch": "Border troops",
    "slot": "field_officer",
    "war": 40,
    "int": 56,
    "pol": 32,
    "chr": 48,
    "personality": "merchant",
    "region": "ch.basel",
    "bio": "Fictional border colonel. Basel is the Rhine gate."
  },
  {
    "id": "ch_west",
    "name": "Luc Morand",
    "title": "Geneva sector",
    "rank": "Oberst",
    "branch": "Army",
    "slot": "field_officer",
    "war": 38,
    "int": 60,
    "pol": 36,
    "chr": 50,
    "personality": "diplomat",
    "region": "ch.geneva",
    "bio": "Fictional Geneva-sector colonel."
  },
  {
    "id": "ch_south",
    "name": "Giulia Bernasconi",
    "title": "Ticino frontier",
    "rank": "Oberst",
    "branch": "Border troops",
    "slot": "field_officer",
    "war": 44,
    "int": 52,
    "pol": 28,
    "chr": 40,
    "personality": "cautious",
    "region": "ch.chiasso",
    "bio": "Fictional colonel on the Chiasso road into Italy."
  }
]),
});
export const AUSTRIA_REGION = land({
  id: "at",
  name: "Austria",
  country: "AT",
  bbox: {"minLon": 8.2, "maxLon": 17.92, "minLat": 45.21, "maxLat": 49.71},
  notes: "Atlas only. Nine Bundesländer. Brenner, Reschen, and Tarvisio are the Italian passes; Kufstein and Salzburg take the German autobahns. No road is drawn into Czechoslovakia or Hungary. Neutral, occupied on this map, and off the week-0 march.",
  defaultBiome: "alpine",
  climate: {"_default": {"sun": 2, "weather": 3}},
  biome: {},
  subs: [
  {
    "id": "AT-9",
    "name": "Vienna",
    "kind": "state"
  },
  {
    "id": "AT-3",
    "name": "Lower Austria",
    "kind": "state"
  },
  {
    "id": "AT-4",
    "name": "Upper Austria",
    "kind": "state"
  },
  {
    "id": "AT-5",
    "name": "Salzburg",
    "kind": "state"
  },
  {
    "id": "AT-7",
    "name": "Tyrol",
    "kind": "state"
  },
  {
    "id": "AT-8",
    "name": "Vorarlberg",
    "kind": "state"
  },
  {
    "id": "AT-6",
    "name": "Styria",
    "kind": "state"
  },
  {
    "id": "AT-2",
    "name": "Carinthia",
    "kind": "state"
  },
  {
    "id": "AT-1",
    "name": "Burgenland",
    "kind": "state"
  }
],
  cities: [
  [
    "vienna",
    "Vienna",
    "AT-9",
    48.208,
    16.373,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "st_polten",
    "St. Pölten",
    "AT-3",
    48.204,
    15.625,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "linz",
    "Linz",
    "AT-4",
    48.306,
    14.286,
    "capital",
    [
      "steel"
    ]
  ],
  [
    "salzburg",
    "Salzburg",
    "AT-5",
    47.809,
    13.055,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "innsbruck",
    "Innsbruck",
    "AT-7",
    47.269,
    11.404,
    "capital",
    [
      "hydro"
    ]
  ],
  [
    "bregenz",
    "Bregenz",
    "AT-8",
    47.503,
    9.747,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "graz",
    "Graz",
    "AT-6",
    47.071,
    15.438,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "klagenfurt",
    "Klagenfurt",
    "AT-2",
    46.624,
    14.305,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "eisenstadt",
    "Eisenstadt",
    "AT-1",
    47.845,
    16.518,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kufstein",
    "Kufstein",
    "AT-7",
    47.583,
    12.167,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "landeck",
    "Landeck",
    "AT-7",
    47.14,
    10.566,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "villach",
    "Villach",
    "AT-2",
    46.611,
    13.856,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "feldkirch",
    "Feldkirch",
    "AT-8",
    47.238,
    9.6,
    "city",
    [
      "wheat"
    ]
  ]
],
  links: [
  [
    "vienna",
    "eisenstadt",
    "road",
    "Austrian road"
  ],
  [
    "vienna",
    "st_polten",
    "road",
    "Austrian road"
  ],
  [
    "st_polten",
    "linz",
    "road",
    "Austrian road"
  ],
  [
    "linz",
    "salzburg",
    "road",
    "Austrian road"
  ],
  [
    "salzburg",
    "kufstein",
    "road",
    "Austrian road"
  ],
  [
    "kufstein",
    "innsbruck",
    "road",
    "Austrian road"
  ],
  [
    "innsbruck",
    "landeck",
    "road",
    "Austrian road"
  ],
  [
    "landeck",
    "bregenz",
    "road",
    "Austrian road"
  ],
  [
    "bregenz",
    "feldkirch",
    "road",
    "Austrian road"
  ],
  [
    "eisenstadt",
    "graz",
    "road",
    "Austrian road"
  ],
  [
    "graz",
    "klagenfurt",
    "road",
    "Austrian road"
  ],
  [
    "klagenfurt",
    "villach",
    "road",
    "Austrian road"
  ]
],
  officers: staff([
  {
    "id": "at_chan",
    "name": "Helga Leitner",
    "title": "Federal Chancellor",
    "rank": "Bundeskanzler",
    "branch": "Chancellery",
    "slot": "head_of_state",
    "war": 22,
    "int": 74,
    "pol": 76,
    "chr": 68,
    "personality": "diplomat",
    "region": "at.vienna",
    "bio": "Fictional chancellor in Vienna. Not a real officeholder."
  },
  {
    "id": "at_def",
    "name": "Walter Gruber",
    "title": "Minister of Defence",
    "rank": "Bundesminister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 34,
    "int": 62,
    "pol": 54,
    "chr": 50,
    "personality": "cautious",
    "region": "at.vienna",
    "bio": "Fictional defence minister of a small neutral army."
  },
  {
    "id": "at_chief",
    "name": "Ingrid Pall",
    "title": "Chief of the General Staff",
    "rank": "General",
    "branch": "Bundesheer",
    "slot": "chief_of_staff",
    "war": 58,
    "int": 60,
    "pol": 30,
    "chr": 44,
    "personality": "loyalist",
    "region": "at.vienna",
    "bio": "Fictional chief of the general staff."
  },
  {
    "id": "at_tyrol",
    "name": "Franz Egger",
    "title": "Tyrol command",
    "rank": "Brigadier",
    "branch": "Bundesheer",
    "slot": "front_commander",
    "war": 56,
    "int": 52,
    "pol": 26,
    "chr": 42,
    "personality": "recluse",
    "region": "at.innsbruck",
    "bio": "Fictional brigadier for the Brenner and the Reschen."
  },
  {
    "id": "at_steel",
    "name": "Karl Huber",
    "title": "Danube district",
    "rank": "Oberst",
    "branch": "Bundesheer",
    "slot": "field_officer",
    "war": 42,
    "int": 48,
    "pol": 28,
    "chr": 40,
    "personality": "merchant",
    "region": "at.linz",
    "bio": "Fictional colonel around the Linz steel works."
  },
  {
    "id": "at_south",
    "name": "Maria Ortner",
    "title": "Carinthia frontier",
    "rank": "Oberst",
    "branch": "Bundesheer",
    "slot": "field_officer",
    "war": 40,
    "int": 50,
    "pol": 30,
    "chr": 44,
    "personality": "cautious",
    "region": "at.villach",
    "bio": "Fictional colonel at the Tarvisio road. The Yugoslav border is not opened on this map."
  }
]),
});
export const LIECHTENSTEIN_REGION = land({
  id: "li",
  name: "Liechtenstein",
  country: "LI",
  bbox: {"minLon": 8.11, "maxLon": 10.92, "minLat": 45.74, "maxLat": 48.56},
  notes: "Atlas only. Vaduz and Schaan stand for the municipalities. The road runs from Sargans to Feldkirch. No army of any size. Occupied on this map and off the week-0 march.",
  defaultBiome: "alpine",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "LI-VA",
    "name": "Vaduz",
    "kind": "municipality"
  },
  {
    "id": "LI-SC",
    "name": "Schaan",
    "kind": "municipality"
  }
],
  cities: [
  [
    "vaduz",
    "Vaduz",
    "LI-VA",
    47.141,
    9.521,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "schaan",
    "Schaan",
    "LI-SC",
    47.165,
    9.51,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "vaduz",
    "schaan",
    "road",
    "Landstrasse"
  ]
],
  officers: staff([
  {
    "id": "li_prince",
    "name": "Nikolaus von Falken",
    "title": "Reigning Prince",
    "rank": "Fürst",
    "branch": "Princely house",
    "slot": "head_of_state",
    "war": 18,
    "int": 64,
    "pol": 70,
    "chr": 72,
    "personality": "diplomat",
    "region": "li.vaduz",
    "bio": "Fictional sovereign. Not a member of the real princely family."
  },
  {
    "id": "li_police",
    "name": "Rita Kindle",
    "title": "National Police",
    "rank": "Major",
    "branch": "Police",
    "slot": "field_officer",
    "war": 28,
    "int": 46,
    "pol": 30,
    "chr": 48,
    "personality": "loyalist",
    "region": "li.schaan",
    "bio": "Fictional police major. Liechtenstein has no army."
  }
]),
});
export const ITALY_REGION = land({
  id: "it",
  name: "Italy",
  country: "IT",
  bbox: {"minLon": 5.3, "maxLon": 19.34, "minLat": 36.11, "maxLat": 48.07},
  notes: "Atlas only. Twenty regions, including Sicily and Sardinia. The Strait of Messina is a ferry, not a bridge. Sardinia is reached from Civitavecchia and Genoa. Alpine tunnels are Mont Blanc, Fréjus, Great St Bernard, Simplon, and the coastal road at Ventimiglia. No road enters Yugoslavia. Occupied and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 4, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "IT-23",
    "name": "Valle d'Aosta",
    "kind": "region"
  },
  {
    "id": "IT-21",
    "name": "Piedmont",
    "kind": "region"
  },
  {
    "id": "IT-42",
    "name": "Liguria",
    "kind": "region"
  },
  {
    "id": "IT-25",
    "name": "Lombardy",
    "kind": "region"
  },
  {
    "id": "IT-32",
    "name": "Trentino-Alto Adige",
    "kind": "region"
  },
  {
    "id": "IT-34",
    "name": "Veneto",
    "kind": "region"
  },
  {
    "id": "IT-36",
    "name": "Friuli-Venezia Giulia",
    "kind": "region"
  },
  {
    "id": "IT-45",
    "name": "Emilia-Romagna",
    "kind": "region"
  },
  {
    "id": "IT-52",
    "name": "Tuscany",
    "kind": "region"
  },
  {
    "id": "IT-55",
    "name": "Umbria",
    "kind": "region"
  },
  {
    "id": "IT-57",
    "name": "Marche",
    "kind": "region"
  },
  {
    "id": "IT-62",
    "name": "Lazio",
    "kind": "region"
  },
  {
    "id": "IT-65",
    "name": "Abruzzo",
    "kind": "region"
  },
  {
    "id": "IT-67",
    "name": "Molise",
    "kind": "region"
  },
  {
    "id": "IT-72",
    "name": "Campania",
    "kind": "region"
  },
  {
    "id": "IT-75",
    "name": "Apulia",
    "kind": "region"
  },
  {
    "id": "IT-77",
    "name": "Basilicata",
    "kind": "region"
  },
  {
    "id": "IT-78",
    "name": "Calabria",
    "kind": "region"
  },
  {
    "id": "IT-82",
    "name": "Sicily",
    "kind": "region"
  },
  {
    "id": "IT-88",
    "name": "Sardinia",
    "kind": "region"
  }
],
  cities: [
  [
    "aosta",
    "Aosta",
    "IT-23",
    45.737,
    7.32,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "turin",
    "Turin",
    "IT-21",
    45.07,
    7.687,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "genoa",
    "Genoa",
    "IT-42",
    44.406,
    8.934,
    "capital",
    [
      "port",
      "steel"
    ]
  ],
  [
    "milan",
    "Milan",
    "IT-25",
    45.464,
    9.19,
    "capital",
    [
      "autos",
      "administration"
    ]
  ],
  [
    "trento",
    "Trento",
    "IT-32",
    46.067,
    11.121,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "venice",
    "Venice",
    "IT-34",
    45.44,
    12.316,
    "capital",
    [
      "port"
    ]
  ],
  [
    "trieste",
    "Trieste",
    "IT-36",
    45.65,
    13.77,
    "capital",
    [
      "port"
    ]
  ],
  [
    "bologna",
    "Bologna",
    "IT-45",
    44.494,
    11.342,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "florence",
    "Florence",
    "IT-52",
    43.769,
    11.255,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "perugia",
    "Perugia",
    "IT-55",
    43.111,
    12.389,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ancona",
    "Ancona",
    "IT-57",
    43.616,
    13.519,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "rome",
    "Rome",
    "IT-62",
    41.902,
    12.496,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "laquila",
    "L'Aquila",
    "IT-65",
    42.35,
    13.399,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "campobasso",
    "Campobasso",
    "IT-67",
    41.561,
    14.668,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "naples",
    "Naples",
    "IT-72",
    40.852,
    14.268,
    "capital",
    [
      "port"
    ]
  ],
  [
    "bari",
    "Bari",
    "IT-75",
    41.118,
    16.871,
    "capital",
    [
      "port"
    ]
  ],
  [
    "potenza",
    "Potenza",
    "IT-77",
    40.64,
    15.806,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "catanzaro",
    "Catanzaro",
    "IT-78",
    38.91,
    16.587,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "palermo",
    "Palermo",
    "IT-82",
    38.116,
    13.361,
    "capital",
    [
      "citrus",
      "olives"
    ]
  ],
  [
    "cagliari",
    "Cagliari",
    "IT-88",
    39.223,
    9.121,
    "capital",
    [
      "port"
    ]
  ],
  [
    "courmayeur",
    "Courmayeur",
    "IT-23",
    45.819,
    6.968,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "bardonecchia",
    "Bardonecchia",
    "IT-21",
    45.078,
    6.702,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "domodossola",
    "Domodossola",
    "IT-21",
    46.116,
    8.292,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "ventimiglia",
    "Ventimiglia",
    "IT-42",
    43.791,
    7.608,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "bolzano",
    "Bolzano",
    "IT-32",
    46.498,
    11.355,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "merano",
    "Merano",
    "IT-32",
    46.668,
    11.159,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "tarvisio",
    "Tarvisio",
    "IT-36",
    46.506,
    13.586,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "rimini",
    "Rimini",
    "IT-45",
    44.06,
    12.566,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "civitavecchia",
    "Civitavecchia",
    "IT-62",
    42.093,
    11.796,
    "port",
    [
      "port"
    ]
  ],
  [
    "brindisi",
    "Brindisi",
    "IT-75",
    40.633,
    17.942,
    "port",
    [
      "port"
    ]
  ],
  [
    "reggio",
    "Reggio Calabria",
    "IT-78",
    38.111,
    15.647,
    "port",
    [
      "port"
    ]
  ],
  [
    "messina",
    "Messina",
    "IT-82",
    38.194,
    15.555,
    "port",
    [
      "port"
    ]
  ],
  [
    "catania",
    "Catania",
    "IT-82",
    37.507,
    15.083,
    "city",
    [
      "citrus"
    ]
  ],
  [
    "olbia",
    "Olbia",
    "IT-88",
    40.923,
    9.497,
    "port",
    [
      "port"
    ]
  ]
],
  links: [
  [
    "aosta",
    "courmayeur",
    "road",
    "autostrada"
  ],
  [
    "aosta",
    "turin",
    "road",
    "autostrada"
  ],
  [
    "turin",
    "bardonecchia",
    "road",
    "autostrada"
  ],
  [
    "aosta",
    "domodossola",
    "road",
    "autostrada"
  ],
  [
    "domodossola",
    "milan",
    "road",
    "autostrada"
  ],
  [
    "milan",
    "genoa",
    "road",
    "autostrada"
  ],
  [
    "genoa",
    "ventimiglia",
    "road",
    "autostrada"
  ],
  [
    "milan",
    "trento",
    "road",
    "autostrada"
  ],
  [
    "trento",
    "bolzano",
    "road",
    "autostrada"
  ],
  [
    "bolzano",
    "merano",
    "road",
    "autostrada"
  ],
  [
    "trento",
    "venice",
    "road",
    "autostrada"
  ],
  [
    "venice",
    "trieste",
    "road",
    "autostrada"
  ],
  [
    "trieste",
    "tarvisio",
    "road",
    "autostrada"
  ],
  [
    "venice",
    "bologna",
    "road",
    "autostrada"
  ],
  [
    "bologna",
    "florence",
    "road",
    "autostrada"
  ],
  [
    "bologna",
    "rimini",
    "road",
    "autostrada"
  ],
  [
    "rimini",
    "ancona",
    "road",
    "autostrada"
  ],
  [
    "rimini",
    "perugia",
    "road",
    "autostrada"
  ],
  [
    "perugia",
    "laquila",
    "road",
    "autostrada"
  ],
  [
    "laquila",
    "rome",
    "road",
    "autostrada"
  ],
  [
    "rome",
    "civitavecchia",
    "road",
    "autostrada"
  ],
  [
    "laquila",
    "campobasso",
    "road",
    "autostrada"
  ],
  [
    "campobasso",
    "naples",
    "road",
    "autostrada"
  ],
  [
    "naples",
    "potenza",
    "road",
    "autostrada"
  ],
  [
    "potenza",
    "bari",
    "road",
    "autostrada"
  ],
  [
    "bari",
    "brindisi",
    "road",
    "autostrada"
  ],
  [
    "potenza",
    "catanzaro",
    "road",
    "autostrada"
  ],
  [
    "catanzaro",
    "reggio",
    "road",
    "autostrada"
  ],
  [
    "palermo",
    "catania",
    "road",
    "Sicilian road"
  ],
  [
    "catania",
    "messina",
    "road",
    "Sicilian road"
  ],
  [
    "cagliari",
    "olbia",
    "road",
    "Sardinian road"
  ],
  [
    "messina",
    "reggio",
    "sea",
    "Strait of Messina ferry"
  ],
  [
    "olbia",
    "civitavecchia",
    "sea",
    "Olbia–Civitavecchia ferry"
  ],
  [
    "cagliari",
    "civitavecchia",
    "sea",
    "Cagliari–Civitavecchia ferry"
  ],
  [
    "genoa",
    "olbia",
    "sea",
    "Genoa–Olbia ferry"
  ]
],
  officers: staff([
  {
    "id": "it_pm",
    "name": "Giulia Ferretti",
    "title": "President of the Council",
    "rank": "Presidente del Consiglio",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 24,
    "int": 76,
    "pol": 78,
    "chr": 64,
    "personality": "diplomat",
    "region": "it.rome",
    "bio": "Fictional prime minister. Not a real officeholder of the period."
  },
  {
    "id": "it_def",
    "name": "Marco Bellandi",
    "title": "Minister of Defence",
    "rank": "Ministro",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 40,
    "int": 68,
    "pol": 56,
    "chr": 50,
    "personality": "cautious",
    "region": "it.rome",
    "bio": "Fictional defence minister."
  },
  {
    "id": "it_chief",
    "name": "Elena Croce",
    "title": "Chief of the Defence Staff",
    "rank": "Generale",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 66,
    "int": 64,
    "pol": 32,
    "chr": 44,
    "personality": "loyalist",
    "region": "it.rome",
    "bio": "Fictional chief of the defence staff."
  },
  {
    "id": "it_land",
    "name": "Paolo Righi",
    "title": "Land forces",
    "rank": "Generale di corpo d'armata",
    "branch": "Army",
    "slot": "front_commander",
    "war": 70,
    "int": 58,
    "pol": 28,
    "chr": 40,
    "personality": "aggressive",
    "region": "it.bologna",
    "bio": "Fictional army commander. The northeastern plain is the wartime problem."
  },
  {
    "id": "it_navy",
    "name": "Carla Esposito",
    "title": "Navy",
    "rank": "Ammiraglio",
    "branch": "Marina",
    "slot": "field_officer",
    "war": 62,
    "int": 60,
    "pol": 30,
    "chr": 46,
    "personality": "cautious",
    "region": "it.naples",
    "bio": "Fictional admiral. Naples and Taranto are the bases; Taranto is not a separate pin."
  },
  {
    "id": "it_north",
    "name": "Luca Ferrero",
    "title": "Northwest corps",
    "rank": "Generale",
    "branch": "Army",
    "slot": "field_officer",
    "war": 58,
    "int": 54,
    "pol": 34,
    "chr": 42,
    "personality": "merchant",
    "region": "it.milan",
    "bio": "Fictional northern commander. Milan and Turin build the vehicles."
  },
  {
    "id": "it_brenner",
    "name": "Hans Kugler",
    "title": "Alpine brigade",
    "rank": "Generale di brigata",
    "branch": "Army",
    "slot": "field_officer",
    "war": 54,
    "int": 50,
    "pol": 24,
    "chr": 38,
    "personality": "recluse",
    "region": "it.bolzano",
    "bio": "Fictional alpine brigadier on the Brenner."
  },
  {
    "id": "it_air",
    "name": "Silvia Conti",
    "title": "Air defence",
    "rank": "Generale",
    "branch": "Air force",
    "slot": "field_officer",
    "war": 48,
    "int": 66,
    "pol": 30,
    "chr": 44,
    "personality": "ambitious",
    "region": "it.rome",
    "bio": "Fictional air commander in Rome."
  },
  {
    "id": "it_sicily",
    "name": "Salvatore Greco",
    "title": "Sicily command",
    "rank": "Generale",
    "branch": "Army",
    "slot": "field_officer",
    "war": 52,
    "int": 48,
    "pol": 28,
    "chr": 40,
    "personality": "loyalist",
    "region": "it.palermo",
    "bio": "Fictional Sicilian commander. The strait is a ferry."
  },
  {
    "id": "it_sardinia",
    "name": "Maria Piras",
    "title": "Sardinia command",
    "rank": "Contrammiraglio",
    "branch": "Marina",
    "slot": "field_officer",
    "war": 46,
    "int": 52,
    "pol": 26,
    "chr": 42,
    "personality": "cautious",
    "region": "it.cagliari",
    "bio": "Fictional Sardinian commander. The island is supplied by sea."
  }
]),
});
export const SAN_MARINO_REGION = land({
  id: "sm",
  name: "San Marino",
  country: "SM",
  bbox: {"minLon": 11.05, "maxLon": 13.88, "minLat": 42.54, "maxLat": 45.37},
  notes: "Atlas only. Two of the nine castelli stand for the republic. The road drops to Rimini. No army beyond the guard. Occupied on this map and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "SM-SM",
    "name": "San Marino",
    "kind": "castle"
  },
  {
    "id": "SM-SE",
    "name": "Serravalle",
    "kind": "castle"
  }
],
  cities: [
  [
    "san_marino",
    "San Marino",
    "SM-SM",
    43.936,
    12.447,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "serravalle",
    "Serravalle",
    "SM-SE",
    43.969,
    12.481,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "san_marino",
    "serravalle",
    "road",
    "Superstrada"
  ]
],
  officers: staff([
  {
    "id": "sm_regent",
    "name": "Clara Guidi",
    "title": "Captain Regent",
    "rank": "Capitano Reggente",
    "branch": "Captains Regent",
    "slot": "head_of_state",
    "war": 16,
    "int": 62,
    "pol": 70,
    "chr": 68,
    "personality": "diplomat",
    "region": "sm.san_marino",
    "bio": "Fictional captain regent. Not a real officeholder."
  },
  {
    "id": "sm_guard",
    "name": "Leo Ugolini",
    "title": "Guard of the Rock",
    "rank": "Captain",
    "branch": "Guard",
    "slot": "field_officer",
    "war": 30,
    "int": 40,
    "pol": 24,
    "chr": 46,
    "personality": "loyalist",
    "region": "sm.serravalle",
    "bio": "Fictional captain of the small ceremonial guard."
  }
]),
});
export const VATICAN_REGION = land({
  id: "va",
  name: "Vatican City",
  country: "VA",
  bbox: {"minLon": 11.05, "maxLon": 13.85, "minLat": 40.5, "maxLat": 43.3},
  notes: "Atlas only. One city-state inside Rome. The pin is not a real pontiff's name. Occupied on this map and off the week-0 march.",
  defaultBiome: "mediterranean",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "VA-VC",
    "name": "Vatican City",
    "kind": "city-state"
  }
],
  cities: [
  [
    "vatican",
    "Vatican City",
    "VA-VC",
    41.902,
    12.453,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [],
  officers: staff([
  {
    "id": "va_gov",
    "name": "Paolo Venturi",
    "title": "Governor of the City",
    "rank": "Governor",
    "branch": "Pontifical Commission",
    "slot": "head_of_state",
    "war": 12,
    "int": 70,
    "pol": 74,
    "chr": 66,
    "personality": "recluse",
    "region": "va.vatican",
    "bio": "Fictional governor. Not a real pontiff or cardinal."
  },
  {
    "id": "va_guard",
    "name": "Matthias Keller",
    "title": "Swiss Guard",
    "rank": "Colonel",
    "branch": "Swiss Guard",
    "slot": "field_officer",
    "war": 36,
    "int": 48,
    "pol": 22,
    "chr": 50,
    "personality": "loyalist",
    "region": "va.vatican",
    "bio": "Fictional colonel of the Swiss Guard."
  }
]),
});
