import { buildRegion, staff } from "../build-region.js";

function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const DENMARK_REGION = land({
  id: "dk",
  name: "Denmark",
  country: "DK",
  bbox: {"minLon": -53.09, "maxLon": 16.11, "minLat": 53.26, "maxLat": 70.62},
  notes: "Atlas only. Fourteen counties plus the Copenhagen and Frederiksberg municipalities, the map used until the 2007 reform. Greenland (home rule 1979) and the Faroes (home rule 1948) are in the kingdom and linked by sea. The Little Belt is a road bridge. The Great Belt is still a ferry, and so is the Øresund. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 3}},
  biome: {},
  subs: [
  {
    "id": "DK-KH",
    "name": "Copenhagen",
    "kind": "municipality"
  },
  {
    "id": "DK-FB",
    "name": "Frederiksberg",
    "kind": "municipality"
  },
  {
    "id": "DK-KO",
    "name": "Copenhagen County",
    "kind": "county"
  },
  {
    "id": "DK-FR",
    "name": "Frederiksborg",
    "kind": "county"
  },
  {
    "id": "DK-RO",
    "name": "Roskilde",
    "kind": "county"
  },
  {
    "id": "DK-VS",
    "name": "West Zealand",
    "kind": "county"
  },
  {
    "id": "DK-ST",
    "name": "Storstrøm",
    "kind": "county"
  },
  {
    "id": "DK-BO",
    "name": "Bornholm",
    "kind": "county"
  },
  {
    "id": "DK-FY",
    "name": "Fyn",
    "kind": "county"
  },
  {
    "id": "DK-SJ",
    "name": "South Jutland",
    "kind": "county"
  },
  {
    "id": "DK-RB",
    "name": "Ribe",
    "kind": "county"
  },
  {
    "id": "DK-VE",
    "name": "Vejle",
    "kind": "county"
  },
  {
    "id": "DK-RK",
    "name": "Ringkjøbing",
    "kind": "county"
  },
  {
    "id": "DK-AR",
    "name": "Aarhus",
    "kind": "county"
  },
  {
    "id": "DK-VI",
    "name": "Viborg",
    "kind": "county"
  },
  {
    "id": "DK-NJ",
    "name": "North Jutland",
    "kind": "county"
  },
  {
    "id": "DK-GL",
    "name": "Greenland",
    "kind": "home rule"
  },
  {
    "id": "DK-FO",
    "name": "Faroe Islands",
    "kind": "home rule"
  }
],
  cities: [
  [
    "copenhagen",
    "Copenhagen",
    "DK-KH",
    55.676,
    12.568,
    "capital",
    [
      "administration",
      "port"
    ]
  ],
  [
    "frederiksberg",
    "Frederiksberg",
    "DK-FB",
    55.679,
    12.534,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "glostrup",
    "Glostrup",
    "DK-KO",
    55.666,
    12.399,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "hillerod",
    "Hillerød",
    "DK-FR",
    55.928,
    12.301,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "roskilde",
    "Roskilde",
    "DK-RO",
    55.641,
    12.08,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "soro",
    "Sorø",
    "DK-VS",
    55.432,
    11.555,
    "capital",
    [
      "wheat",
      "hogs"
    ]
  ],
  [
    "nykobing",
    "Nykøbing Falster",
    "DK-ST",
    54.765,
    11.875,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ronne",
    "Rønne",
    "DK-BO",
    55.098,
    14.707,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "odense",
    "Odense",
    "DK-FY",
    55.396,
    10.388,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "aabenraa",
    "Aabenraa",
    "DK-SJ",
    55.044,
    9.417,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ribe",
    "Ribe",
    "DK-RB",
    55.328,
    8.762,
    "capital",
    [
      "dairy",
      "hogs"
    ]
  ],
  [
    "vejle",
    "Vejle",
    "DK-VE",
    55.709,
    9.536,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ringkobing",
    "Ringkøbing",
    "DK-RK",
    56.09,
    8.244,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "aarhus",
    "Aarhus",
    "DK-AR",
    56.162,
    10.203,
    "capital",
    [
      "port"
    ]
  ],
  [
    "viborg",
    "Viborg",
    "DK-VI",
    56.453,
    9.402,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "aalborg",
    "Aalborg",
    "DK-NJ",
    57.048,
    9.919,
    "capital",
    [
      "port"
    ]
  ],
  [
    "nuuk",
    "Nuuk",
    "DK-GL",
    64.181,
    -51.694,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "torshavn",
    "Tórshavn",
    "DK-FO",
    62.01,
    -6.774,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "helsingor",
    "Helsingør",
    "DK-FR",
    56.036,
    12.614,
    "port",
    [
      "port"
    ]
  ],
  [
    "korsor",
    "Korsør",
    "DK-VS",
    55.33,
    11.139,
    "port",
    [
      "port"
    ]
  ],
  [
    "rodby",
    "Rødby",
    "DK-ST",
    54.656,
    11.352,
    "port",
    [
      "port"
    ]
  ],
  [
    "nyborg",
    "Nyborg",
    "DK-FY",
    55.313,
    10.79,
    "port",
    [
      "port"
    ]
  ],
  [
    "esbjerg",
    "Esbjerg",
    "DK-RB",
    55.467,
    8.452,
    "port",
    [
      "oil",
      "port",
      "fisheries"
    ]
  ],
  [
    "ilulissat",
    "Ilulissat",
    "DK-GL",
    69.22,
    -51.099,
    "city",
    [
      "fisheries"
    ]
  ]
],
  links: [
  [
    "aabenraa",
    "ribe",
    "road",
    "E45"
  ],
  [
    "ribe",
    "esbjerg",
    "road",
    "E45"
  ],
  [
    "esbjerg",
    "ringkobing",
    "road",
    "E45"
  ],
  [
    "aabenraa",
    "vejle",
    "road",
    "E45"
  ],
  [
    "vejle",
    "aarhus",
    "road",
    "E45"
  ],
  [
    "aarhus",
    "viborg",
    "road",
    "E45"
  ],
  [
    "viborg",
    "aalborg",
    "road",
    "E45"
  ],
  [
    "odense",
    "nyborg",
    "road",
    "Fyn road"
  ],
  [
    "copenhagen",
    "frederiksberg",
    "road",
    "E20"
  ],
  [
    "frederiksberg",
    "glostrup",
    "road",
    "E20"
  ],
  [
    "glostrup",
    "roskilde",
    "road",
    "E20"
  ],
  [
    "glostrup",
    "hillerod",
    "road",
    "E20"
  ],
  [
    "hillerod",
    "helsingor",
    "road",
    "E20"
  ],
  [
    "roskilde",
    "soro",
    "road",
    "E20"
  ],
  [
    "soro",
    "korsor",
    "road",
    "E20"
  ],
  [
    "korsor",
    "rodby",
    "road",
    "E20"
  ],
  [
    "rodby",
    "nykobing",
    "road",
    "E20"
  ],
  [
    "vejle",
    "odense",
    "road",
    "E20 Little Belt bridges"
  ],
  [
    "korsor",
    "nyborg",
    "sea",
    "Great Belt ferry"
  ],
  [
    "ronne",
    "copenhagen",
    "sea",
    "Bornholm ferry"
  ],
  [
    "nuuk",
    "copenhagen",
    "sea",
    "Greenland shipping"
  ],
  [
    "nuuk",
    "ilulissat",
    "sea",
    "Greenland coastal shipping"
  ],
  [
    "torshavn",
    "copenhagen",
    "sea",
    "Faroe shipping"
  ]
],
  officers: staff([
  {
    "id": "dk_pm",
    "name": "Morten Kjær",
    "title": "Prime Minister",
    "rank": "Statsminister",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 24,
    "int": 72,
    "pol": 74,
    "chr": 64,
    "personality": "diplomat",
    "region": "dk.copenhagen",
    "bio": "Fictional prime minister. Not a real officeholder."
  },
  {
    "id": "dk_def",
    "name": "Birthe Holst",
    "title": "Minister of Defence",
    "rank": "Forsvarsminister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 36,
    "int": 64,
    "pol": 54,
    "chr": 50,
    "personality": "cautious",
    "region": "dk.copenhagen",
    "bio": "Fictional defence minister."
  },
  {
    "id": "dk_chief",
    "name": "Lars Skov",
    "title": "Chief of Defence",
    "rank": "General",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 62,
    "int": 60,
    "pol": 30,
    "chr": 42,
    "personality": "loyalist",
    "region": "dk.copenhagen",
    "bio": "Fictional chief of defence. The straits are the wartime map."
  },
  {
    "id": "dk_navy",
    "name": "Anne Møller",
    "title": "Navy",
    "rank": "Kontreadmiral",
    "branch": "Navy",
    "slot": "front_commander",
    "war": 58,
    "int": 58,
    "pol": 28,
    "chr": 44,
    "personality": "cautious",
    "region": "dk.copenhagen",
    "bio": "Fictional admiral for the Belt and the Sound."
  },
  {
    "id": "dk_jutland",
    "name": "Søren Damgaard",
    "title": "Jutland division",
    "rank": "Generalmajor",
    "branch": "Army",
    "slot": "field_officer",
    "war": 56,
    "int": 48,
    "pol": 26,
    "chr": 38,
    "personality": "loyalist",
    "region": "dk.aabenraa",
    "bio": "Fictional Jutland commander on the German frontier."
  },
  {
    "id": "dk_oil",
    "name": "Helle Vang",
    "title": "North Sea port",
    "rank": "Kommandør",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 40,
    "int": 54,
    "pol": 32,
    "chr": 46,
    "personality": "merchant",
    "region": "dk.esbjerg",
    "bio": "Fictional commander at Esbjerg, the North Sea oil port."
  },
  {
    "id": "dk_greenland",
    "name": "Malik Petersen",
    "title": "Greenland command",
    "rank": "Oberst",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 34,
    "int": 50,
    "pol": 28,
    "chr": 44,
    "personality": "recluse",
    "region": "dk.nuuk",
    "bio": "Fictional Greenland commander. The link home is a sea lane."
  },
  {
    "id": "dk_faroe",
    "name": "Jógvan Djurhuus",
    "title": "Faroe command",
    "rank": "Orlogskaptajn",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 32,
    "int": 46,
    "pol": 24,
    "chr": 42,
    "personality": "loyalist",
    "region": "dk.torshavn",
    "bio": "Fictional Faroese naval captain."
  }
]),
});
export const NORWAY_REGION = land({
  id: "no",
  name: "Norway",
  country: "NO",
  bbox: {"minLon": 3.92, "maxLon": 31.15, "minLat": 56.75, "maxLat": 79.62},
  notes: "Atlas only. Nineteen fylker, the division used until the mergers after 2017. Svalbard is not a fylke; it is a separate territory, reached by sea from Tromsø. North Sea oil is at Stavanger. Occupied and off the week-0 march.",
  defaultBiome: "boreal",
  climate: {"_default": {"sun": 2, "weather": 3}},
  biome: {},
  subs: [
  {
    "id": "NO-01",
    "name": "Østfold",
    "kind": "county"
  },
  {
    "id": "NO-02",
    "name": "Akershus",
    "kind": "county"
  },
  {
    "id": "NO-03",
    "name": "Oslo",
    "kind": "county"
  },
  {
    "id": "NO-04",
    "name": "Hedmark",
    "kind": "county"
  },
  {
    "id": "NO-05",
    "name": "Oppland",
    "kind": "county"
  },
  {
    "id": "NO-06",
    "name": "Buskerud",
    "kind": "county"
  },
  {
    "id": "NO-07",
    "name": "Vestfold",
    "kind": "county"
  },
  {
    "id": "NO-08",
    "name": "Telemark",
    "kind": "county"
  },
  {
    "id": "NO-09",
    "name": "Aust-Agder",
    "kind": "county"
  },
  {
    "id": "NO-10",
    "name": "Vest-Agder",
    "kind": "county"
  },
  {
    "id": "NO-11",
    "name": "Rogaland",
    "kind": "county"
  },
  {
    "id": "NO-12",
    "name": "Hordaland",
    "kind": "county"
  },
  {
    "id": "NO-14",
    "name": "Sogn og Fjordane",
    "kind": "county"
  },
  {
    "id": "NO-15",
    "name": "Møre og Romsdal",
    "kind": "county"
  },
  {
    "id": "NO-16",
    "name": "Sør-Trøndelag",
    "kind": "county"
  },
  {
    "id": "NO-17",
    "name": "Nord-Trøndelag",
    "kind": "county"
  },
  {
    "id": "NO-18",
    "name": "Nordland",
    "kind": "county"
  },
  {
    "id": "NO-19",
    "name": "Troms",
    "kind": "county"
  },
  {
    "id": "NO-20",
    "name": "Finnmark",
    "kind": "county"
  },
  {
    "id": "NO-21",
    "name": "Svalbard",
    "kind": "territory"
  }
],
  cities: [
  [
    "moss",
    "Moss",
    "NO-01",
    59.434,
    10.658,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lillestrom",
    "Lillestrøm",
    "NO-02",
    59.956,
    11.05,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "oslo",
    "Oslo",
    "NO-03",
    59.913,
    10.752,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "hamar",
    "Hamar",
    "NO-04",
    60.794,
    11.068,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lillehammer",
    "Lillehammer",
    "NO-05",
    61.115,
    10.466,
    "capital",
    [
      "hydro"
    ]
  ],
  [
    "drammen",
    "Drammen",
    "NO-06",
    59.744,
    10.204,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "tonsberg",
    "Tønsberg",
    "NO-07",
    59.267,
    10.408,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "skien",
    "Skien",
    "NO-08",
    59.209,
    9.609,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "arendal",
    "Arendal",
    "NO-09",
    58.461,
    8.766,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kristiansand",
    "Kristiansand",
    "NO-10",
    58.147,
    7.996,
    "capital",
    [
      "port"
    ]
  ],
  [
    "stavanger",
    "Stavanger",
    "NO-11",
    58.97,
    5.733,
    "capital",
    [
      "oil",
      "port"
    ]
  ],
  [
    "bergen",
    "Bergen",
    "NO-12",
    60.391,
    5.322,
    "capital",
    [
      "fisheries",
      "port"
    ]
  ],
  [
    "leikanger",
    "Leikanger",
    "NO-14",
    61.185,
    6.808,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "molde",
    "Molde",
    "NO-15",
    62.737,
    7.159,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "trondheim",
    "Trondheim",
    "NO-16",
    63.431,
    10.395,
    "capital",
    [
      "port"
    ]
  ],
  [
    "steinkjer",
    "Steinkjer",
    "NO-17",
    64.015,
    11.495,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bodo",
    "Bodø",
    "NO-18",
    67.28,
    14.405,
    "capital",
    [
      "iron",
      "fisheries"
    ]
  ],
  [
    "tromso",
    "Tromsø",
    "NO-19",
    69.649,
    18.955,
    "capital",
    [
      "fisheries",
      "port"
    ]
  ],
  [
    "vadso",
    "Vadsø",
    "NO-20",
    70.074,
    29.749,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "longyearbyen",
    "Longyearbyen",
    "NO-21",
    78.223,
    15.626,
    "capital",
    [
      "coal"
    ]
  ],
  [
    "halden",
    "Halden",
    "NO-01",
    59.125,
    11.385,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "narvik",
    "Narvik",
    "NO-18",
    68.438,
    17.427,
    "port",
    [
      "port"
    ]
  ],
  [
    "karasjok",
    "Karasjok",
    "NO-20",
    69.472,
    25.511,
    "city",
    [
      "wheat"
    ]
  ]
],
  links: [
  [
    "moss",
    "tonsberg",
    "road",
    "E6"
  ],
  [
    "moss",
    "drammen",
    "road",
    "E6"
  ],
  [
    "drammen",
    "oslo",
    "road",
    "E6"
  ],
  [
    "oslo",
    "lillestrom",
    "road",
    "E6"
  ],
  [
    "tonsberg",
    "skien",
    "road",
    "E6"
  ],
  [
    "moss",
    "halden",
    "road",
    "E6"
  ],
  [
    "lillestrom",
    "hamar",
    "road",
    "E6"
  ],
  [
    "hamar",
    "lillehammer",
    "road",
    "E6"
  ],
  [
    "skien",
    "arendal",
    "road",
    "E6"
  ],
  [
    "arendal",
    "kristiansand",
    "road",
    "E6"
  ],
  [
    "kristiansand",
    "stavanger",
    "road",
    "E6"
  ],
  [
    "stavanger",
    "bergen",
    "road",
    "E6"
  ],
  [
    "bergen",
    "leikanger",
    "road",
    "E6"
  ],
  [
    "leikanger",
    "molde",
    "road",
    "E6"
  ],
  [
    "lillehammer",
    "trondheim",
    "road",
    "E6"
  ],
  [
    "trondheim",
    "steinkjer",
    "road",
    "E6"
  ],
  [
    "steinkjer",
    "bodo",
    "road",
    "E6"
  ],
  [
    "bodo",
    "narvik",
    "road",
    "E6"
  ],
  [
    "narvik",
    "tromso",
    "road",
    "E6"
  ],
  [
    "tromso",
    "karasjok",
    "road",
    "E6"
  ],
  [
    "karasjok",
    "vadso",
    "road",
    "E6"
  ],
  [
    "tromso",
    "longyearbyen",
    "sea",
    "Svalbard shipping"
  ]
],
  officers: staff([
  {
    "id": "no_pm",
    "name": "Sigrid Hauge",
    "title": "Prime Minister",
    "rank": "Statsminister",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 24,
    "int": 74,
    "pol": 76,
    "chr": 66,
    "personality": "diplomat",
    "region": "no.oslo",
    "bio": "Fictional prime minister. Not a real officeholder."
  },
  {
    "id": "no_def",
    "name": "Tor Erik Dahl",
    "title": "Minister of Defence",
    "rank": "Forsvarsminister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 40,
    "int": 66,
    "pol": 52,
    "chr": 48,
    "personality": "cautious",
    "region": "no.oslo",
    "bio": "Fictional defence minister."
  },
  {
    "id": "no_chief",
    "name": "Inger Solberg",
    "title": "Chief of Defence",
    "rank": "General",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 62,
    "pol": 30,
    "chr": 42,
    "personality": "loyalist",
    "region": "no.oslo",
    "bio": "Fictional chief of defence."
  },
  {
    "id": "no_navy",
    "name": "Knut Fjeld",
    "title": "Navy",
    "rank": "Kontreadmiral",
    "branch": "Navy",
    "slot": "front_commander",
    "war": 62,
    "int": 58,
    "pol": 26,
    "chr": 40,
    "personality": "aggressive",
    "region": "no.bergen",
    "bio": "Fictional admiral. The coast and the North Sea are the navy's map."
  },
  {
    "id": "no_oil",
    "name": "Marit Vagle",
    "title": "North Sea command",
    "rank": "Kommandør",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 44,
    "int": 56,
    "pol": 34,
    "chr": 48,
    "personality": "merchant",
    "region": "no.stavanger",
    "bio": "Fictional commander for the Stavanger oil fields."
  },
  {
    "id": "no_north",
    "name": "Ole Berg",
    "title": "Trøndelag command",
    "rank": "Generalmajor",
    "branch": "Army",
    "slot": "field_officer",
    "war": 56,
    "int": 50,
    "pol": 26,
    "chr": 38,
    "personality": "loyalist",
    "region": "no.trondheim",
    "bio": "Fictional northern army commander."
  },
  {
    "id": "no_arctic",
    "name": "Astrid Nilsen",
    "title": "Arctic command",
    "rank": "Generalmajor",
    "branch": "Army",
    "slot": "field_officer",
    "war": 52,
    "int": 54,
    "pol": 24,
    "chr": 40,
    "personality": "recluse",
    "region": "no.tromso",
    "bio": "Fictional arctic commander. Svalbard is a sea trip north."
  },
  {
    "id": "no_ore",
    "name": "Per Moen",
    "title": "Ofoten",
    "rank": "Oberst",
    "branch": "Army",
    "slot": "field_officer",
    "war": 46,
    "int": 48,
    "pol": 22,
    "chr": 36,
    "personality": "merchant",
    "region": "no.narvik",
    "bio": "Fictional colonel at Narvik, the port for the Swedish iron railway."
  }
]),
});
export const SWEDEN_REGION = land({
  id: "se",
  name: "Sweden",
  country: "SE",
  bbox: {"minLon": 10.57, "maxLon": 25.54, "minLat": 54.2, "maxLat": 69.26},
  notes: "Atlas only. Twenty-four counties under their 1980s names: Kristianstad and Malmöhus are not yet Skåne, Göteborg och Bohus, Älvsborg and Skaraborg are not yet Västra Götaland, and Kopparberg is not yet Dalarna. Gotland is a ferry. Occupied and off the week-0 march.",
  defaultBiome: "boreal",
  climate: {"_default": {"sun": 2, "weather": 3}},
  biome: {},
  subs: [
  {
    "id": "SE-AB",
    "name": "Stockholm",
    "kind": "county"
  },
  {
    "id": "SE-C",
    "name": "Uppsala",
    "kind": "county"
  },
  {
    "id": "SE-D",
    "name": "Södermanland",
    "kind": "county"
  },
  {
    "id": "SE-E",
    "name": "Östergötland",
    "kind": "county"
  },
  {
    "id": "SE-F",
    "name": "Jönköping",
    "kind": "county"
  },
  {
    "id": "SE-G",
    "name": "Kronoberg",
    "kind": "county"
  },
  {
    "id": "SE-H",
    "name": "Kalmar",
    "kind": "county"
  },
  {
    "id": "SE-I",
    "name": "Gotland",
    "kind": "county"
  },
  {
    "id": "SE-K",
    "name": "Blekinge",
    "kind": "county"
  },
  {
    "id": "SE-L",
    "name": "Kristianstad",
    "kind": "county"
  },
  {
    "id": "SE-M",
    "name": "Malmöhus",
    "kind": "county"
  },
  {
    "id": "SE-N",
    "name": "Halland",
    "kind": "county"
  },
  {
    "id": "SE-O",
    "name": "Göteborg och Bohus",
    "kind": "county"
  },
  {
    "id": "SE-P",
    "name": "Älvsborg",
    "kind": "county"
  },
  {
    "id": "SE-R",
    "name": "Skaraborg",
    "kind": "county"
  },
  {
    "id": "SE-S",
    "name": "Värmland",
    "kind": "county"
  },
  {
    "id": "SE-T",
    "name": "Örebro",
    "kind": "county"
  },
  {
    "id": "SE-U",
    "name": "Västmanland",
    "kind": "county"
  },
  {
    "id": "SE-W",
    "name": "Kopparberg",
    "kind": "county"
  },
  {
    "id": "SE-X",
    "name": "Gävleborg",
    "kind": "county"
  },
  {
    "id": "SE-Y",
    "name": "Västernorrland",
    "kind": "county"
  },
  {
    "id": "SE-Z",
    "name": "Jämtland",
    "kind": "county"
  },
  {
    "id": "SE-AC",
    "name": "Västerbotten",
    "kind": "county"
  },
  {
    "id": "SE-BD",
    "name": "Norrbotten",
    "kind": "county"
  }
],
  cities: [
  [
    "stockholm",
    "Stockholm",
    "SE-AB",
    59.329,
    18.069,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "uppsala",
    "Uppsala",
    "SE-C",
    59.859,
    17.639,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "nykoping",
    "Nyköping",
    "SE-D",
    58.753,
    17.008,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "linkoping",
    "Linköping",
    "SE-E",
    58.411,
    15.622,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "jonkoping",
    "Jönköping",
    "SE-F",
    57.782,
    14.161,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "vaxjo",
    "Växjö",
    "SE-G",
    56.879,
    14.806,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kalmar",
    "Kalmar",
    "SE-H",
    56.663,
    16.356,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "visby",
    "Visby",
    "SE-I",
    57.635,
    18.295,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "karlskrona",
    "Karlskrona",
    "SE-K",
    56.162,
    15.586,
    "capital",
    [
      "port"
    ]
  ],
  [
    "kristianstad",
    "Kristianstad",
    "SE-L",
    56.029,
    14.156,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "malmo",
    "Malmö",
    "SE-M",
    55.605,
    13.0,
    "capital",
    [
      "port"
    ]
  ],
  [
    "halmstad",
    "Halmstad",
    "SE-N",
    56.674,
    12.857,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "gothenburg",
    "Gothenburg",
    "SE-O",
    57.707,
    11.967,
    "capital",
    [
      "autos",
      "port"
    ]
  ],
  [
    "vanersborg",
    "Vänersborg",
    "SE-P",
    58.381,
    12.323,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mariestad",
    "Mariestad",
    "SE-R",
    58.71,
    13.823,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "karlstad",
    "Karlstad",
    "SE-S",
    59.379,
    13.504,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "orebro",
    "Örebro",
    "SE-T",
    59.275,
    15.214,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "vasteras",
    "Västerås",
    "SE-U",
    59.609,
    16.544,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "falun",
    "Falun",
    "SE-W",
    60.607,
    15.626,
    "capital",
    [
      "copper",
      "timber"
    ]
  ],
  [
    "gavle",
    "Gävle",
    "SE-X",
    60.675,
    17.142,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "harnosand",
    "Härnösand",
    "SE-Y",
    62.632,
    17.939,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ostersund",
    "Östersund",
    "SE-Z",
    63.179,
    14.636,
    "capital",
    [
      "timber",
      "hydro"
    ]
  ],
  [
    "umea",
    "Umeå",
    "SE-AC",
    63.826,
    20.263,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lulea",
    "Luleå",
    "SE-BD",
    65.584,
    22.155,
    "capital",
    [
      "steel",
      "port"
    ]
  ],
  [
    "kiruna",
    "Kiruna",
    "SE-BD",
    67.855,
    20.225,
    "city",
    [
      "iron"
    ]
  ],
  [
    "helsingborg",
    "Helsingborg",
    "SE-M",
    56.047,
    12.694,
    "port",
    [
      "port"
    ]
  ],
  [
    "haparanda",
    "Haparanda",
    "SE-BD",
    65.835,
    24.137,
    "city",
    [
      "wheat"
    ]
  ]
],
  links: [
  [
    "stockholm",
    "uppsala",
    "road",
    "E4"
  ],
  [
    "uppsala",
    "vasteras",
    "road",
    "E4"
  ],
  [
    "uppsala",
    "gavle",
    "road",
    "E4"
  ],
  [
    "vasteras",
    "nykoping",
    "road",
    "E4"
  ],
  [
    "vasteras",
    "orebro",
    "road",
    "E4"
  ],
  [
    "orebro",
    "linkoping",
    "road",
    "E4"
  ],
  [
    "gavle",
    "falun",
    "road",
    "E4"
  ],
  [
    "orebro",
    "mariestad",
    "road",
    "E4"
  ],
  [
    "mariestad",
    "karlstad",
    "road",
    "E4"
  ],
  [
    "mariestad",
    "jonkoping",
    "road",
    "E4"
  ],
  [
    "jonkoping",
    "vaxjo",
    "road",
    "E4"
  ],
  [
    "vaxjo",
    "karlskrona",
    "road",
    "E4"
  ],
  [
    "karlskrona",
    "kalmar",
    "road",
    "E4"
  ],
  [
    "vaxjo",
    "kristianstad",
    "road",
    "E4"
  ],
  [
    "kristianstad",
    "malmo",
    "road",
    "E4"
  ],
  [
    "malmo",
    "helsingborg",
    "road",
    "E4"
  ],
  [
    "helsingborg",
    "halmstad",
    "road",
    "E4"
  ],
  [
    "mariestad",
    "vanersborg",
    "road",
    "E4"
  ],
  [
    "vanersborg",
    "gothenburg",
    "road",
    "E4"
  ],
  [
    "gavle",
    "harnosand",
    "road",
    "E4"
  ],
  [
    "harnosand",
    "umea",
    "road",
    "E4"
  ],
  [
    "umea",
    "lulea",
    "road",
    "E4"
  ],
  [
    "lulea",
    "haparanda",
    "road",
    "E4"
  ],
  [
    "harnosand",
    "ostersund",
    "road",
    "E4"
  ],
  [
    "lulea",
    "kiruna",
    "road",
    "E4"
  ],
  [
    "visby",
    "stockholm",
    "sea",
    "Gotland ferry"
  ]
],
  officers: staff([
  {
    "id": "se_pm",
    "name": "Ingrid Blom",
    "title": "Prime Minister",
    "rank": "Statsminister",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 22,
    "int": 76,
    "pol": 78,
    "chr": 66,
    "personality": "diplomat",
    "region": "se.stockholm",
    "bio": "Fictional prime minister. Not a real officeholder."
  },
  {
    "id": "se_def",
    "name": "Erik Lindqvist",
    "title": "Minister of Defence",
    "rank": "Försvarsminister",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 38,
    "int": 66,
    "pol": 54,
    "chr": 48,
    "personality": "cautious",
    "region": "se.stockholm",
    "bio": "Fictional defence minister of a neutral country."
  },
  {
    "id": "se_chief",
    "name": "Karin Åkesson",
    "title": "Supreme Commander",
    "rank": "General",
    "branch": "Armed forces",
    "slot": "chief_of_staff",
    "war": 66,
    "int": 64,
    "pol": 30,
    "chr": 42,
    "personality": "loyalist",
    "region": "se.stockholm",
    "bio": "Fictional supreme commander."
  },
  {
    "id": "se_navy",
    "name": "Bo Ström",
    "title": "Navy",
    "rank": "Konteramiral",
    "branch": "Navy",
    "slot": "front_commander",
    "war": 58,
    "int": 56,
    "pol": 26,
    "chr": 40,
    "personality": "cautious",
    "region": "se.gothenburg",
    "bio": "Fictional admiral on the west coast."
  },
  {
    "id": "se_ore",
    "name": "Nils Pärsson",
    "title": "Norrbotten",
    "rank": "Överste",
    "branch": "Army",
    "slot": "field_officer",
    "war": 48,
    "int": 46,
    "pol": 22,
    "chr": 36,
    "personality": "merchant",
    "region": "se.kiruna",
    "bio": "Fictional colonel for the iron range. The ore railway runs to Narvik."
  },
  {
    "id": "se_volvo",
    "name": "Lena Krantz",
    "title": "Western command",
    "rank": "Generalmajor",
    "branch": "Army",
    "slot": "field_officer",
    "war": 44,
    "int": 52,
    "pol": 32,
    "chr": 46,
    "personality": "merchant",
    "region": "se.gothenburg",
    "bio": "Fictional western commander. Gothenburg builds the cars."
  },
  {
    "id": "se_sound",
    "name": "Maja Holm",
    "title": "Southern command",
    "rank": "Överste",
    "branch": "Army",
    "slot": "field_officer",
    "war": 40,
    "int": 50,
    "pol": 28,
    "chr": 44,
    "personality": "diplomat",
    "region": "se.malmo",
    "bio": "Fictional southern colonel. The Sound is still a ferry."
  },
  {
    "id": "se_north",
    "name": "Gustav Renberg",
    "title": "Upper Norrland",
    "rank": "Generalmajor",
    "branch": "Army",
    "slot": "field_officer",
    "war": 54,
    "int": 48,
    "pol": 24,
    "chr": 36,
    "personality": "recluse",
    "region": "se.lulea",
    "bio": "Fictional upper-Norrland commander, posted at Luleå."
  }
]),
});
export const FINLAND_REGION = land({
  id: "fi",
  name: "Finland",
  country: "FI",
  bbox: {"minLon": 18.54, "maxLon": 31.16, "minLat": 58.7, "maxLat": 70.31},
  notes: "Atlas only. Twelve lääni, the division used until 1997, including Åland. Åland is a ferry to Turku and to Stockholm. Vaalimaa, Niirala, and Raja-Jooseppi are the roads into the RSFSR, and Helsinki has ferries to Tallinn and Leningrad. Occupied and off the week-0 march.",
  defaultBiome: "boreal",
  climate: {"_default": {"sun": 2, "weather": 3}},
  biome: {},
  subs: [
  {
    "id": "FI-ES",
    "name": "Uusimaa",
    "kind": "province"
  },
  {
    "id": "FI-TU",
    "name": "Turku and Pori",
    "kind": "province"
  },
  {
    "id": "FI-AL",
    "name": "Åland",
    "kind": "province"
  },
  {
    "id": "FI-HA",
    "name": "Häme",
    "kind": "province"
  },
  {
    "id": "FI-KY",
    "name": "Kymi",
    "kind": "province"
  },
  {
    "id": "FI-MI",
    "name": "Mikkeli",
    "kind": "province"
  },
  {
    "id": "FI-KS",
    "name": "Central Finland",
    "kind": "province"
  },
  {
    "id": "FI-VA",
    "name": "Vaasa",
    "kind": "province"
  },
  {
    "id": "FI-KU",
    "name": "Kuopio",
    "kind": "province"
  },
  {
    "id": "FI-PK",
    "name": "North Karelia",
    "kind": "province"
  },
  {
    "id": "FI-OU",
    "name": "Oulu",
    "kind": "province"
  },
  {
    "id": "FI-LA",
    "name": "Lapland",
    "kind": "province"
  }
],
  cities: [
  [
    "helsinki",
    "Helsinki",
    "FI-ES",
    60.17,
    24.938,
    "capital",
    [
      "administration",
      "port"
    ]
  ],
  [
    "turku",
    "Turku",
    "FI-TU",
    60.451,
    22.267,
    "capital",
    [
      "port"
    ]
  ],
  [
    "mariehamn",
    "Mariehamn",
    "FI-AL",
    60.097,
    19.935,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "hameenlinna",
    "Hämeenlinna",
    "FI-HA",
    60.996,
    24.464,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "kouvola",
    "Kouvola",
    "FI-KY",
    60.868,
    26.704,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mikkeli",
    "Mikkeli",
    "FI-MI",
    61.688,
    27.272,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "jyvaskyla",
    "Jyväskylä",
    "FI-KS",
    62.242,
    25.747,
    "capital",
    [
      "timber"
    ]
  ],
  [
    "vaasa",
    "Vaasa",
    "FI-VA",
    63.096,
    21.616,
    "capital",
    [
      "port"
    ]
  ],
  [
    "kuopio",
    "Kuopio",
    "FI-KU",
    62.898,
    27.678,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "joensuu",
    "Joensuu",
    "FI-PK",
    62.601,
    29.763,
    "capital",
    [
      "copper"
    ]
  ],
  [
    "oulu",
    "Oulu",
    "FI-OU",
    65.012,
    25.472,
    "capital",
    [
      "port"
    ]
  ],
  [
    "rovaniemi",
    "Rovaniemi",
    "FI-LA",
    66.503,
    25.729,
    "capital",
    [
      "timber"
    ]
  ],
  [
    "tornio",
    "Tornio",
    "FI-LA",
    65.849,
    24.144,
    "city",
    [
      "steel"
    ]
  ],
  [
    "inari",
    "Inari",
    "FI-LA",
    68.906,
    27.028,
    "city",
    [
      "wheat"
    ]
  ]
],
  links: [
  [
    "helsinki",
    "hameenlinna",
    "road",
    "national road"
  ],
  [
    "helsinki",
    "kouvola",
    "road",
    "national road"
  ],
  [
    "kouvola",
    "mikkeli",
    "road",
    "national road"
  ],
  [
    "mikkeli",
    "jyvaskyla",
    "road",
    "national road"
  ],
  [
    "mikkeli",
    "kuopio",
    "road",
    "national road"
  ],
  [
    "kuopio",
    "joensuu",
    "road",
    "national road"
  ],
  [
    "hameenlinna",
    "turku",
    "road",
    "national road"
  ],
  [
    "kuopio",
    "oulu",
    "road",
    "national road"
  ],
  [
    "oulu",
    "tornio",
    "road",
    "national road"
  ],
  [
    "tornio",
    "rovaniemi",
    "road",
    "national road"
  ],
  [
    "rovaniemi",
    "inari",
    "road",
    "national road"
  ],
  [
    "turku",
    "vaasa",
    "road",
    "national road"
  ],
  [
    "mariehamn",
    "turku",
    "sea",
    "Åland ferry"
  ]
],
  officers: staff([
  {
    "id": "fi_pm",
    "name": "Aino Leppänen",
    "title": "Prime Minister",
    "rank": "Pääministeri",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 22,
    "int": 74,
    "pol": 76,
    "chr": 66,
    "personality": "diplomat",
    "region": "fi.helsinki",
    "bio": "Fictional prime minister. Not a real officeholder."
  },
  {
    "id": "fi_def",
    "name": "Mikko Rantanen",
    "title": "Minister of Defence",
    "rank": "Puolustusministeri",
    "branch": "Defence",
    "slot": "defense_minister",
    "war": 36,
    "int": 64,
    "pol": 52,
    "chr": 46,
    "personality": "cautious",
    "region": "fi.helsinki",
    "bio": "Fictional defence minister."
  },
  {
    "id": "fi_chief",
    "name": "Leena Saarinen",
    "title": "Chief of Defence",
    "rank": "Kenraali",
    "branch": "Defence forces",
    "slot": "chief_of_staff",
    "war": 62,
    "int": 60,
    "pol": 28,
    "chr": 42,
    "personality": "loyalist",
    "region": "fi.helsinki",
    "bio": "Fictional chief of defence."
  },
  {
    "id": "fi_east",
    "name": "Jari Nieminen",
    "title": "Southeastern command",
    "rank": "Kenraalimajuri",
    "branch": "Army",
    "slot": "front_commander",
    "war": 58,
    "int": 52,
    "pol": 26,
    "chr": 38,
    "personality": "recluse",
    "region": "fi.kouvola",
    "bio": "Fictional commander toward the eastern border, which is not linked onward."
  },
  {
    "id": "fi_lapland",
    "name": "Elsa Kinnunen",
    "title": "Lapland command",
    "rank": "Eversti",
    "branch": "Army",
    "slot": "field_officer",
    "war": 46,
    "int": 48,
    "pol": 24,
    "chr": 40,
    "personality": "loyalist",
    "region": "fi.rovaniemi",
    "bio": "Fictional Lapland colonel. Tornio meets Haparanda."
  },
  {
    "id": "fi_aland",
    "name": "Henrik Sund",
    "title": "Archipelago",
    "rank": "Kommodori",
    "branch": "Navy",
    "slot": "field_officer",
    "war": 40,
    "int": 50,
    "pol": 26,
    "chr": 44,
    "personality": "cautious",
    "region": "fi.turku",
    "bio": "Fictional naval officer for the Åland ferries."
  }
]),
});
export const ICELAND_REGION = land({
  id: "is",
  name: "Iceland",
  country: "IS",
  bbox: {"minLon": -24.52, "maxLon": -12.99, "minLat": 62.54, "maxLat": 67.48},
  notes: "Atlas only. Eight regions around the ring road, standing in for the sýslur. Fisheries, hydro, and the Straumsvík aluminum plant. A North Atlantic sea lane reaches Europe. Occupied and off the week-0 march.",
  defaultBiome: "arctic",
  climate: {"_default": {"sun": 1, "weather": 4}},
  biome: {},
  subs: [
  {
    "id": "IS-HO",
    "name": "Capital Region",
    "kind": "region"
  },
  {
    "id": "IS-SU",
    "name": "Southern Peninsula",
    "kind": "region"
  },
  {
    "id": "IS-VL",
    "name": "West",
    "kind": "region"
  },
  {
    "id": "IS-VF",
    "name": "Westfjords",
    "kind": "region"
  },
  {
    "id": "IS-NV",
    "name": "Northwest",
    "kind": "region"
  },
  {
    "id": "IS-NE",
    "name": "Northeast",
    "kind": "region"
  },
  {
    "id": "IS-AL",
    "name": "East",
    "kind": "region"
  },
  {
    "id": "IS-SL",
    "name": "South",
    "kind": "region"
  }
],
  cities: [
  [
    "reykjavik",
    "Reykjavík",
    "IS-HO",
    64.147,
    -21.94,
    "capital",
    [
      "administration",
      "fisheries",
      "aluminum"
    ]
  ],
  [
    "keflavik",
    "Keflavík",
    "IS-SU",
    64.005,
    -22.556,
    "capital",
    [
      "port"
    ]
  ],
  [
    "borgarnes",
    "Borgarnes",
    "IS-VL",
    64.556,
    -21.918,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "isafjordur",
    "Ísafjörður",
    "IS-VF",
    66.075,
    -23.124,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "saudarkrokur",
    "Sauðárkrókur",
    "IS-NV",
    65.746,
    -19.639,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "akureyri",
    "Akureyri",
    "IS-NE",
    65.688,
    -18.101,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "egilsstadir",
    "Egilsstaðir",
    "IS-AL",
    65.267,
    -14.395,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "selfoss",
    "Selfoss",
    "IS-SL",
    63.937,
    -21.0,
    "capital",
    [
      "hydro"
    ]
  ]
],
  links: [
  [
    "reykjavik",
    "borgarnes",
    "road",
    "Route 1"
  ],
  [
    "reykjavik",
    "keflavik",
    "road",
    "Route 1"
  ],
  [
    "reykjavik",
    "selfoss",
    "road",
    "Route 1"
  ],
  [
    "borgarnes",
    "isafjordur",
    "road",
    "Route 1"
  ],
  [
    "borgarnes",
    "saudarkrokur",
    "road",
    "Route 1"
  ],
  [
    "saudarkrokur",
    "akureyri",
    "road",
    "Route 1"
  ],
  [
    "akureyri",
    "egilsstadir",
    "road",
    "Route 1"
  ]
],
  officers: staff([
  {
    "id": "is_pm",
    "name": "Gunnar Ólafsson",
    "title": "Prime Minister",
    "rank": "Forsætisráðherra",
    "branch": "Cabinet",
    "slot": "head_of_state",
    "war": 20,
    "int": 70,
    "pol": 72,
    "chr": 64,
    "personality": "diplomat",
    "region": "is.reykjavik",
    "bio": "Fictional prime minister. Not a real officeholder."
  },
  {
    "id": "is_def",
    "name": "Sigrún Magnúsdóttir",
    "title": "Minister",
    "rank": "Ráðherra",
    "branch": "Justice and coast",
    "slot": "defense_minister",
    "war": 28,
    "int": 58,
    "pol": 48,
    "chr": 52,
    "personality": "cautious",
    "region": "is.reykjavik",
    "bio": "Fictional minister. Iceland has no army; the coast guard is the force."
  },
  {
    "id": "is_chief",
    "name": "Helgi Björnsson",
    "title": "Coast Guard",
    "rank": "Yfirforingi",
    "branch": "Coast Guard",
    "slot": "chief_of_staff",
    "war": 48,
    "int": 56,
    "pol": 30,
    "chr": 46,
    "personality": "loyalist",
    "region": "is.reykjavik",
    "bio": "Fictional coast-guard chief."
  },
  {
    "id": "is_air",
    "name": "Ásta Jónsdóttir",
    "title": "Keflavík station",
    "rank": "Major",
    "branch": "Liaison",
    "slot": "front_commander",
    "war": 36,
    "int": 54,
    "pol": 34,
    "chr": 44,
    "personality": "schemer",
    "region": "is.keflavik",
    "bio": "Fictional liaison at the Keflavík airfield. Not a real allied commander."
  },
  {
    "id": "is_north",
    "name": "Bjarni Eiríksson",
    "title": "Northern district",
    "rank": "Foringi",
    "branch": "Coast Guard",
    "slot": "field_officer",
    "war": 34,
    "int": 44,
    "pol": 24,
    "chr": 40,
    "personality": "merchant",
    "region": "is.akureyri",
    "bio": "Fictional northern fisheries officer."
  }
]),
});
