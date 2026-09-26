import { buildRegion, staff } from "../build-region.js";

function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const FRANCE_REGION = land({
  id: "fr",
  name: "France",
  country: "FR",
  bbox: {"minLon": -5.5, "maxLon": 10.85, "minLat": 40.53, "maxLat": 52.44},
  notes: "Atlas only. Ninety-six metropolitan departments, grouped in the twenty-two regions of 1982. Corsica is two departments, linked by the T20 and by ferry. Overseas departments are already on the Caribbean and South American sheets. The Channel Tunnel is not open. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {"FR-74": "alpine", "FR-73": "alpine", "FR-05": "alpine", "FR-04": "alpine", "FR-2A": "mediterranean", "FR-2B": "mediterranean", "FR-13": "mediterranean", "FR-83": "mediterranean", "FR-06": "mediterranean", "FR-84": "mediterranean"},
  subs: [
  {
    "id": "FR-01",
    "name": "Ain",
    "kind": "department",
    "group": "Rhône-Alpes"
  },
  {
    "id": "FR-02",
    "name": "Aisne",
    "kind": "department",
    "group": "Picardie"
  },
  {
    "id": "FR-03",
    "name": "Allier",
    "kind": "department",
    "group": "Auvergne"
  },
  {
    "id": "FR-04",
    "name": "Alpes-de-Haute-Provence",
    "kind": "department",
    "group": "Provence-Alpes-Côte d'Azur"
  },
  {
    "id": "FR-05",
    "name": "Hautes-Alpes",
    "kind": "department",
    "group": "Provence-Alpes-Côte d'Azur"
  },
  {
    "id": "FR-06",
    "name": "Alpes-Maritimes",
    "kind": "department",
    "group": "Provence-Alpes-Côte d'Azur"
  },
  {
    "id": "FR-07",
    "name": "Ardèche",
    "kind": "department",
    "group": "Rhône-Alpes"
  },
  {
    "id": "FR-08",
    "name": "Ardennes",
    "kind": "department",
    "group": "Champagne-Ardenne"
  },
  {
    "id": "FR-09",
    "name": "Ariège",
    "kind": "department",
    "group": "Midi-Pyrénées"
  },
  {
    "id": "FR-10",
    "name": "Aube",
    "kind": "department",
    "group": "Champagne-Ardenne"
  },
  {
    "id": "FR-11",
    "name": "Aude",
    "kind": "department",
    "group": "Languedoc-Roussillon"
  },
  {
    "id": "FR-12",
    "name": "Aveyron",
    "kind": "department",
    "group": "Midi-Pyrénées"
  },
  {
    "id": "FR-13",
    "name": "Bouches-du-Rhône",
    "kind": "department",
    "group": "Provence-Alpes-Côte d'Azur"
  },
  {
    "id": "FR-14",
    "name": "Calvados",
    "kind": "department",
    "group": "Basse-Normandie"
  },
  {
    "id": "FR-15",
    "name": "Cantal",
    "kind": "department",
    "group": "Auvergne"
  },
  {
    "id": "FR-16",
    "name": "Charente",
    "kind": "department",
    "group": "Poitou-Charentes"
  },
  {
    "id": "FR-17",
    "name": "Charente-Maritime",
    "kind": "department",
    "group": "Poitou-Charentes"
  },
  {
    "id": "FR-18",
    "name": "Cher",
    "kind": "department",
    "group": "Centre"
  },
  {
    "id": "FR-19",
    "name": "Corrèze",
    "kind": "department",
    "group": "Limousin"
  },
  {
    "id": "FR-2A",
    "name": "Corse-du-Sud",
    "kind": "department",
    "group": "Corse"
  },
  {
    "id": "FR-2B",
    "name": "Haute-Corse",
    "kind": "department",
    "group": "Corse"
  },
  {
    "id": "FR-21",
    "name": "Côte-d'Or",
    "kind": "department",
    "group": "Bourgogne"
  },
  {
    "id": "FR-22",
    "name": "Côtes-d'Armor",
    "kind": "department",
    "group": "Bretagne"
  },
  {
    "id": "FR-23",
    "name": "Creuse",
    "kind": "department",
    "group": "Limousin"
  },
  {
    "id": "FR-24",
    "name": "Dordogne",
    "kind": "department",
    "group": "Aquitaine"
  },
  {
    "id": "FR-25",
    "name": "Doubs",
    "kind": "department",
    "group": "Franche-Comté"
  },
  {
    "id": "FR-26",
    "name": "Drôme",
    "kind": "department",
    "group": "Rhône-Alpes"
  },
  {
    "id": "FR-27",
    "name": "Eure",
    "kind": "department",
    "group": "Haute-Normandie"
  },
  {
    "id": "FR-28",
    "name": "Eure-et-Loir",
    "kind": "department",
    "group": "Centre"
  },
  {
    "id": "FR-29",
    "name": "Finistère",
    "kind": "department",
    "group": "Bretagne"
  },
  {
    "id": "FR-30",
    "name": "Gard",
    "kind": "department",
    "group": "Languedoc-Roussillon"
  },
  {
    "id": "FR-31",
    "name": "Haute-Garonne",
    "kind": "department",
    "group": "Midi-Pyrénées"
  },
  {
    "id": "FR-32",
    "name": "Gers",
    "kind": "department",
    "group": "Midi-Pyrénées"
  },
  {
    "id": "FR-33",
    "name": "Gironde",
    "kind": "department",
    "group": "Aquitaine"
  },
  {
    "id": "FR-34",
    "name": "Hérault",
    "kind": "department",
    "group": "Languedoc-Roussillon"
  },
  {
    "id": "FR-35",
    "name": "Ille-et-Vilaine",
    "kind": "department",
    "group": "Bretagne"
  },
  {
    "id": "FR-36",
    "name": "Indre",
    "kind": "department",
    "group": "Centre"
  },
  {
    "id": "FR-37",
    "name": "Indre-et-Loire",
    "kind": "department",
    "group": "Centre"
  },
  {
    "id": "FR-38",
    "name": "Isère",
    "kind": "department",
    "group": "Rhône-Alpes"
  },
  {
    "id": "FR-39",
    "name": "Jura",
    "kind": "department",
    "group": "Franche-Comté"
  },
  {
    "id": "FR-40",
    "name": "Landes",
    "kind": "department",
    "group": "Aquitaine"
  },
  {
    "id": "FR-41",
    "name": "Loir-et-Cher",
    "kind": "department",
    "group": "Centre"
  },
  {
    "id": "FR-42",
    "name": "Loire",
    "kind": "department",
    "group": "Rhône-Alpes"
  },
  {
    "id": "FR-43",
    "name": "Haute-Loire",
    "kind": "department",
    "group": "Auvergne"
  },
  {
    "id": "FR-44",
    "name": "Loire-Atlantique",
    "kind": "department",
    "group": "Pays de la Loire"
  },
  {
    "id": "FR-45",
    "name": "Loiret",
    "kind": "department",
    "group": "Centre"
  },
  {
    "id": "FR-46",
    "name": "Lot",
    "kind": "department",
    "group": "Midi-Pyrénées"
  },
  {
    "id": "FR-47",
    "name": "Lot-et-Garonne",
    "kind": "department",
    "group": "Aquitaine"
  },
  {
    "id": "FR-48",
    "name": "Lozère",
    "kind": "department",
    "group": "Languedoc-Roussillon"
  },
  {
    "id": "FR-49",
    "name": "Maine-et-Loire",
    "kind": "department",
    "group": "Pays de la Loire"
  },
  {
    "id": "FR-50",
    "name": "Manche",
    "kind": "department",
    "group": "Basse-Normandie"
  },
  {
    "id": "FR-51",
    "name": "Marne",
    "kind": "department",
    "group": "Champagne-Ardenne"
  },
  {
    "id": "FR-52",
    "name": "Haute-Marne",
    "kind": "department",
    "group": "Champagne-Ardenne"
  },
  {
    "id": "FR-53",
    "name": "Mayenne",
    "kind": "department",
    "group": "Pays de la Loire"
  },
  {
    "id": "FR-54",
    "name": "Meurthe-et-Moselle",
    "kind": "department",
    "group": "Lorraine"
  },
  {
    "id": "FR-55",
    "name": "Meuse",
    "kind": "department",
    "group": "Lorraine"
  },
  {
    "id": "FR-56",
    "name": "Morbihan",
    "kind": "department",
    "group": "Bretagne"
  },
  {
    "id": "FR-57",
    "name": "Moselle",
    "kind": "department",
    "group": "Lorraine"
  },
  {
    "id": "FR-58",
    "name": "Nièvre",
    "kind": "department",
    "group": "Bourgogne"
  },
  {
    "id": "FR-59",
    "name": "Nord",
    "kind": "department",
    "group": "Nord-Pas-de-Calais"
  },
  {
    "id": "FR-60",
    "name": "Oise",
    "kind": "department",
    "group": "Picardie"
  },
  {
    "id": "FR-61",
    "name": "Orne",
    "kind": "department",
    "group": "Basse-Normandie"
  },
  {
    "id": "FR-62",
    "name": "Pas-de-Calais",
    "kind": "department",
    "group": "Nord-Pas-de-Calais"
  },
  {
    "id": "FR-63",
    "name": "Puy-de-Dôme",
    "kind": "department",
    "group": "Auvergne"
  },
  {
    "id": "FR-64",
    "name": "Pyrénées-Atlantiques",
    "kind": "department",
    "group": "Aquitaine"
  },
  {
    "id": "FR-65",
    "name": "Hautes-Pyrénées",
    "kind": "department",
    "group": "Midi-Pyrénées"
  },
  {
    "id": "FR-66",
    "name": "Pyrénées-Orientales",
    "kind": "department",
    "group": "Languedoc-Roussillon"
  },
  {
    "id": "FR-67",
    "name": "Bas-Rhin",
    "kind": "department",
    "group": "Alsace"
  },
  {
    "id": "FR-68",
    "name": "Haut-Rhin",
    "kind": "department",
    "group": "Alsace"
  },
  {
    "id": "FR-69",
    "name": "Rhône",
    "kind": "department",
    "group": "Rhône-Alpes"
  },
  {
    "id": "FR-70",
    "name": "Haute-Saône",
    "kind": "department",
    "group": "Franche-Comté"
  },
  {
    "id": "FR-71",
    "name": "Saône-et-Loire",
    "kind": "department",
    "group": "Bourgogne"
  },
  {
    "id": "FR-72",
    "name": "Sarthe",
    "kind": "department",
    "group": "Pays de la Loire"
  },
  {
    "id": "FR-73",
    "name": "Savoie",
    "kind": "department",
    "group": "Rhône-Alpes"
  },
  {
    "id": "FR-74",
    "name": "Haute-Savoie",
    "kind": "department",
    "group": "Rhône-Alpes"
  },
  {
    "id": "FR-75",
    "name": "Paris",
    "kind": "department",
    "group": "Île-de-France"
  },
  {
    "id": "FR-76",
    "name": "Seine-Maritime",
    "kind": "department",
    "group": "Haute-Normandie"
  },
  {
    "id": "FR-77",
    "name": "Seine-et-Marne",
    "kind": "department",
    "group": "Île-de-France"
  },
  {
    "id": "FR-78",
    "name": "Yvelines",
    "kind": "department",
    "group": "Île-de-France"
  },
  {
    "id": "FR-79",
    "name": "Deux-Sèvres",
    "kind": "department",
    "group": "Poitou-Charentes"
  },
  {
    "id": "FR-80",
    "name": "Somme",
    "kind": "department",
    "group": "Picardie"
  },
  {
    "id": "FR-81",
    "name": "Tarn",
    "kind": "department",
    "group": "Midi-Pyrénées"
  },
  {
    "id": "FR-82",
    "name": "Tarn-et-Garonne",
    "kind": "department",
    "group": "Midi-Pyrénées"
  },
  {
    "id": "FR-83",
    "name": "Var",
    "kind": "department",
    "group": "Provence-Alpes-Côte d'Azur"
  },
  {
    "id": "FR-84",
    "name": "Vaucluse",
    "kind": "department",
    "group": "Provence-Alpes-Côte d'Azur"
  },
  {
    "id": "FR-85",
    "name": "Vendée",
    "kind": "department",
    "group": "Pays de la Loire"
  },
  {
    "id": "FR-86",
    "name": "Vienne",
    "kind": "department",
    "group": "Poitou-Charentes"
  },
  {
    "id": "FR-87",
    "name": "Haute-Vienne",
    "kind": "department",
    "group": "Limousin"
  },
  {
    "id": "FR-88",
    "name": "Vosges",
    "kind": "department",
    "group": "Lorraine"
  },
  {
    "id": "FR-89",
    "name": "Yonne",
    "kind": "department",
    "group": "Bourgogne"
  },
  {
    "id": "FR-90",
    "name": "Territoire de Belfort",
    "kind": "department",
    "group": "Franche-Comté"
  },
  {
    "id": "FR-91",
    "name": "Essonne",
    "kind": "department",
    "group": "Île-de-France"
  },
  {
    "id": "FR-92",
    "name": "Hauts-de-Seine",
    "kind": "department",
    "group": "Île-de-France"
  },
  {
    "id": "FR-93",
    "name": "Seine-Saint-Denis",
    "kind": "department",
    "group": "Île-de-France"
  },
  {
    "id": "FR-94",
    "name": "Val-de-Marne",
    "kind": "department",
    "group": "Île-de-France"
  },
  {
    "id": "FR-95",
    "name": "Val-d'Oise",
    "kind": "department",
    "group": "Île-de-France"
  }
],
  cities: [
  [
    "bourg",
    "Bourg-en-Bresse",
    "FR-01",
    46.205,
    5.226,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "laon",
    "Laon",
    "FR-02",
    49.564,
    3.62,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "moulins",
    "Moulins",
    "FR-03",
    46.568,
    3.332,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "digne",
    "Digne-les-Bains",
    "FR-04",
    44.092,
    6.236,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "gap",
    "Gap",
    "FR-05",
    44.56,
    6.079,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "nice",
    "Nice",
    "FR-06",
    43.71,
    7.262,
    "capital",
    [
      "port"
    ]
  ],
  [
    "privas",
    "Privas",
    "FR-07",
    44.735,
    4.599,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "charleville",
    "Charleville-Mézières",
    "FR-08",
    49.773,
    4.721,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "foix",
    "Foix",
    "FR-09",
    42.966,
    1.607,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "troyes",
    "Troyes",
    "FR-10",
    48.297,
    4.079,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "carcassonne",
    "Carcassonne",
    "FR-11",
    43.213,
    2.353,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "rodez",
    "Rodez",
    "FR-12",
    44.35,
    2.575,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "marseille",
    "Marseille",
    "FR-13",
    43.297,
    5.37,
    "capital",
    [
      "port",
      "oil"
    ]
  ],
  [
    "caen",
    "Caen",
    "FR-14",
    49.182,
    -0.371,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "aurillac",
    "Aurillac",
    "FR-15",
    44.928,
    2.444,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "angouleme",
    "Angoulême",
    "FR-16",
    45.649,
    0.156,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "la_rochelle",
    "La Rochelle",
    "FR-17",
    46.16,
    -1.152,
    "capital",
    [
      "fisheries",
      "port"
    ]
  ],
  [
    "bourges",
    "Bourges",
    "FR-18",
    47.081,
    2.399,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "tulle",
    "Tulle",
    "FR-19",
    45.267,
    1.77,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ajaccio",
    "Ajaccio",
    "FR-2A",
    41.926,
    8.737,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bastia",
    "Bastia",
    "FR-2B",
    42.698,
    9.448,
    "capital",
    [
      "port"
    ]
  ],
  [
    "dijon",
    "Dijon",
    "FR-21",
    47.322,
    5.041,
    "capital",
    [
      "grapes"
    ]
  ],
  [
    "saint_brieuc",
    "Saint-Brieuc",
    "FR-22",
    48.514,
    -2.765,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "gueret",
    "Guéret",
    "FR-23",
    46.171,
    1.872,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "perigueux",
    "Périgueux",
    "FR-24",
    45.184,
    0.721,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "besancon",
    "Besançon",
    "FR-25",
    47.238,
    6.024,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "valence",
    "Valence",
    "FR-26",
    44.933,
    4.892,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "evreux",
    "Évreux",
    "FR-27",
    49.024,
    1.151,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "chartres",
    "Chartres",
    "FR-28",
    48.444,
    1.49,
    "capital",
    [
      "wheat"
    ]
  ],
  [
    "quimper",
    "Quimper",
    "FR-29",
    47.996,
    -4.102,
    "capital",
    [
      "fisheries"
    ]
  ],
  [
    "nimes",
    "Nîmes",
    "FR-30",
    43.837,
    4.36,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "toulouse",
    "Toulouse",
    "FR-31",
    43.604,
    1.444,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "auch",
    "Auch",
    "FR-32",
    43.646,
    0.586,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bordeaux",
    "Bordeaux",
    "FR-33",
    44.838,
    -0.579,
    "capital",
    [
      "grapes",
      "port"
    ]
  ],
  [
    "montpellier",
    "Montpellier",
    "FR-34",
    43.611,
    3.877,
    "capital",
    [
      "grapes"
    ]
  ],
  [
    "rennes",
    "Rennes",
    "FR-35",
    48.117,
    -1.678,
    "capital",
    [
      "autos"
    ]
  ],
  [
    "chateauroux",
    "Châteauroux",
    "FR-36",
    46.811,
    1.691,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "tours",
    "Tours",
    "FR-37",
    47.394,
    0.689,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "grenoble",
    "Grenoble",
    "FR-38",
    45.188,
    5.724,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lons",
    "Lons-le-Saunier",
    "FR-39",
    46.675,
    5.554,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mont_de_marsan",
    "Mont-de-Marsan",
    "FR-40",
    43.89,
    -0.5,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "blois",
    "Blois",
    "FR-41",
    47.586,
    1.336,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "saint_etienne",
    "Saint-Étienne",
    "FR-42",
    45.44,
    4.387,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "le_puy",
    "Le Puy-en-Velay",
    "FR-43",
    45.043,
    3.885,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "nantes",
    "Nantes",
    "FR-44",
    47.218,
    -1.554,
    "capital",
    [
      "port",
      "wheat"
    ]
  ],
  [
    "orleans",
    "Orléans",
    "FR-45",
    47.902,
    1.909,
    "capital",
    [
      "wheat"
    ]
  ],
  [
    "cahors",
    "Cahors",
    "FR-46",
    44.448,
    1.441,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "agen",
    "Agen",
    "FR-47",
    44.203,
    0.621,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "mende",
    "Mende",
    "FR-48",
    44.518,
    3.499,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "angers",
    "Angers",
    "FR-49",
    47.478,
    -0.563,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "saint_lo",
    "Saint-Lô",
    "FR-50",
    49.116,
    -1.09,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "chalons",
    "Châlons-en-Champagne",
    "FR-51",
    48.957,
    4.365,
    "capital",
    [
      "grapes"
    ]
  ],
  [
    "chaumont",
    "Chaumont",
    "FR-52",
    48.111,
    5.139,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "laval",
    "Laval",
    "FR-53",
    48.073,
    -0.77,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "nancy",
    "Nancy",
    "FR-54",
    48.692,
    6.184,
    "capital",
    [
      "iron"
    ]
  ],
  [
    "bar_le_duc",
    "Bar-le-Duc",
    "FR-55",
    48.772,
    5.161,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "vannes",
    "Vannes",
    "FR-56",
    47.658,
    -2.76,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "metz",
    "Metz",
    "FR-57",
    49.12,
    6.177,
    "capital",
    [
      "iron",
      "steel"
    ]
  ],
  [
    "nevers",
    "Nevers",
    "FR-58",
    46.99,
    3.157,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "lille",
    "Lille",
    "FR-59",
    50.629,
    3.057,
    "capital",
    [
      "steel",
      "coal"
    ]
  ],
  [
    "beauvais",
    "Beauvais",
    "FR-60",
    49.429,
    2.081,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "alencon",
    "Alençon",
    "FR-61",
    48.431,
    0.093,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "arras",
    "Arras",
    "FR-62",
    50.292,
    2.78,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "clermont",
    "Clermont-Ferrand",
    "FR-63",
    45.777,
    3.087,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "pau",
    "Pau",
    "FR-64",
    43.295,
    -0.371,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "tarbes",
    "Tarbes",
    "FR-65",
    43.233,
    0.078,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "perpignan",
    "Perpignan",
    "FR-66",
    42.688,
    2.895,
    "capital",
    [
      "grapes"
    ]
  ],
  [
    "strasbourg",
    "Strasbourg",
    "FR-67",
    48.573,
    7.752,
    "capital",
    [
      "port",
      "administration"
    ]
  ],
  [
    "colmar",
    "Colmar",
    "FR-68",
    48.079,
    7.358,
    "capital",
    [
      "grapes",
      "potash"
    ]
  ],
  [
    "lyon",
    "Lyon",
    "FR-69",
    45.764,
    4.836,
    "capital",
    [
      "autos",
      "administration"
    ]
  ],
  [
    "vesoul",
    "Vesoul",
    "FR-70",
    47.62,
    6.156,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "macon",
    "Mâcon",
    "FR-71",
    46.306,
    4.828,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "le_mans",
    "Le Mans",
    "FR-72",
    48.007,
    0.199,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "chambery",
    "Chambéry",
    "FR-73",
    45.564,
    5.917,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "annecy",
    "Annecy",
    "FR-74",
    45.899,
    6.129,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "paris",
    "Paris",
    "FR-75",
    48.857,
    2.352,
    "capital",
    [
      "administration",
      "autos"
    ]
  ],
  [
    "rouen",
    "Rouen",
    "FR-76",
    49.443,
    1.099,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "melun",
    "Melun",
    "FR-77",
    48.54,
    2.66,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "versailles",
    "Versailles",
    "FR-78",
    48.805,
    2.135,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "niort",
    "Niort",
    "FR-79",
    46.323,
    -0.459,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "amiens",
    "Amiens",
    "FR-80",
    49.895,
    2.302,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "albi",
    "Albi",
    "FR-81",
    43.928,
    2.148,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "montauban",
    "Montauban",
    "FR-82",
    44.018,
    1.356,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "toulon",
    "Toulon",
    "FR-83",
    43.125,
    5.931,
    "capital",
    [
      "bauxite",
      "port"
    ]
  ],
  [
    "avignon",
    "Avignon",
    "FR-84",
    43.949,
    4.806,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "la_roche_sur_yon",
    "La Roche-sur-Yon",
    "FR-85",
    46.671,
    -1.427,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "poitiers",
    "Poitiers",
    "FR-86",
    46.58,
    0.34,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "limoges",
    "Limoges",
    "FR-87",
    45.833,
    1.262,
    "capital",
    [
      "uranium"
    ]
  ],
  [
    "epinal",
    "Épinal",
    "FR-88",
    48.175,
    6.451,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "auxerre",
    "Auxerre",
    "FR-89",
    47.798,
    3.567,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "belfort",
    "Belfort",
    "FR-90",
    47.638,
    6.863,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "evry",
    "Évry",
    "FR-91",
    48.624,
    2.443,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "nanterre",
    "Nanterre",
    "FR-92",
    48.892,
    2.207,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "bobigny",
    "Bobigny",
    "FR-93",
    48.91,
    2.44,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "creteil",
    "Créteil",
    "FR-94",
    48.79,
    2.455,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "pontoise",
    "Pontoise",
    "FR-95",
    49.051,
    2.101,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "le_havre",
    "Le Havre",
    "FR-76",
    49.494,
    0.108,
    "port",
    [
      "port",
      "oil"
    ]
  ],
  [
    "calais",
    "Calais",
    "FR-62",
    50.958,
    1.858,
    "port",
    [
      "port"
    ]
  ],
  [
    "dunkerque",
    "Dunkerque",
    "FR-59",
    51.038,
    2.377,
    "port",
    [
      "port",
      "steel"
    ]
  ],
  [
    "cherbourg",
    "Cherbourg",
    "FR-50",
    49.634,
    -1.622,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "saint_malo",
    "Saint-Malo",
    "FR-35",
    48.65,
    -2.026,
    "port",
    [
      "wheat"
    ]
  ],
  [
    "hendaye",
    "Hendaye",
    "FR-64",
    43.359,
    -1.775,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "chamonix",
    "Chamonix",
    "FR-74",
    45.923,
    6.869,
    "city",
    [
      "wheat"
    ]
  ],
  [
    "modane",
    "Modane",
    "FR-73",
    45.2,
    6.671,
    "city",
    [
      "wheat"
    ]
  ]
],
  links: [
  [
    "paris",
    "nanterre",
    "road",
    "boulevard"
  ],
  [
    "nanterre",
    "versailles",
    "road",
    "boulevard"
  ],
  [
    "versailles",
    "evreux",
    "road",
    "boulevard"
  ],
  [
    "evreux",
    "rouen",
    "road",
    "boulevard"
  ],
  [
    "rouen",
    "le_havre",
    "road",
    "boulevard"
  ],
  [
    "rouen",
    "caen",
    "road",
    "A13"
  ],
  [
    "caen",
    "saint_lo",
    "road",
    "A13"
  ],
  [
    "saint_lo",
    "cherbourg",
    "road",
    "A13"
  ],
  [
    "rouen",
    "alencon",
    "road",
    "A28"
  ],
  [
    "alencon",
    "le_mans",
    "road",
    "A28"
  ],
  [
    "le_mans",
    "angers",
    "road",
    "A28"
  ],
  [
    "angers",
    "nantes",
    "road",
    "A28"
  ],
  [
    "nantes",
    "vannes",
    "road",
    "N165"
  ],
  [
    "vannes",
    "quimper",
    "road",
    "N165"
  ],
  [
    "vannes",
    "rennes",
    "road",
    "N24"
  ],
  [
    "rennes",
    "saint_brieuc",
    "road",
    "N24"
  ],
  [
    "rennes",
    "saint_malo",
    "road",
    "N137"
  ],
  [
    "le_mans",
    "laval",
    "road",
    "A81"
  ],
  [
    "laval",
    "rennes",
    "road",
    "A81"
  ],
  [
    "paris",
    "chartres",
    "road",
    "A11"
  ],
  [
    "chartres",
    "le_mans",
    "road",
    "A11"
  ],
  [
    "paris",
    "orleans",
    "road",
    "A10"
  ],
  [
    "orleans",
    "blois",
    "road",
    "A10"
  ],
  [
    "blois",
    "tours",
    "road",
    "A10"
  ],
  [
    "tours",
    "poitiers",
    "road",
    "A10"
  ],
  [
    "poitiers",
    "angouleme",
    "road",
    "A10"
  ],
  [
    "angouleme",
    "bordeaux",
    "road",
    "A10"
  ],
  [
    "orleans",
    "bourges",
    "road",
    "A71"
  ],
  [
    "bourges",
    "clermont",
    "road",
    "A71"
  ],
  [
    "clermont",
    "montpellier",
    "road",
    "A71"
  ],
  [
    "orleans",
    "chateauroux",
    "road",
    "A20"
  ],
  [
    "chateauroux",
    "limoges",
    "road",
    "A20"
  ],
  [
    "limoges",
    "tulle",
    "road",
    "A20"
  ],
  [
    "tulle",
    "cahors",
    "road",
    "A20"
  ],
  [
    "cahors",
    "montauban",
    "road",
    "A20"
  ],
  [
    "montauban",
    "toulouse",
    "road",
    "A20"
  ],
  [
    "bourges",
    "moulins",
    "road",
    "A71"
  ],
  [
    "moulins",
    "clermont",
    "road",
    "A71"
  ],
  [
    "paris",
    "pontoise",
    "road",
    "N7"
  ],
  [
    "paris",
    "bobigny",
    "road",
    "A1"
  ],
  [
    "bobigny",
    "beauvais",
    "road",
    "A1"
  ],
  [
    "beauvais",
    "amiens",
    "road",
    "A1"
  ],
  [
    "amiens",
    "arras",
    "road",
    "A1"
  ],
  [
    "arras",
    "lille",
    "road",
    "A1"
  ],
  [
    "lille",
    "dunkerque",
    "road",
    "A1"
  ],
  [
    "arras",
    "calais",
    "road",
    "A26"
  ],
  [
    "arras",
    "laon",
    "road",
    "A26"
  ],
  [
    "paris",
    "creteil",
    "road",
    "A4"
  ],
  [
    "creteil",
    "melun",
    "road",
    "A4"
  ],
  [
    "melun",
    "troyes",
    "road",
    "A4"
  ],
  [
    "troyes",
    "chalons",
    "road",
    "A4"
  ],
  [
    "chalons",
    "chaumont",
    "road",
    "A4"
  ],
  [
    "chaumont",
    "nancy",
    "road",
    "A4"
  ],
  [
    "nancy",
    "metz",
    "road",
    "A4"
  ],
  [
    "metz",
    "charleville",
    "road",
    "A4"
  ],
  [
    "nancy",
    "strasbourg",
    "road",
    "A4"
  ],
  [
    "strasbourg",
    "colmar",
    "road",
    "A4"
  ],
  [
    "colmar",
    "belfort",
    "road",
    "A4"
  ],
  [
    "belfort",
    "besancon",
    "road",
    "A4"
  ],
  [
    "besancon",
    "dijon",
    "road",
    "A4"
  ],
  [
    "troyes",
    "chaumont",
    "road",
    "A5"
  ],
  [
    "paris",
    "evry",
    "road",
    "A6"
  ],
  [
    "evry",
    "auxerre",
    "road",
    "A6"
  ],
  [
    "auxerre",
    "dijon",
    "road",
    "A6"
  ],
  [
    "dijon",
    "macon",
    "road",
    "A6"
  ],
  [
    "macon",
    "lyon",
    "road",
    "A6"
  ],
  [
    "lyon",
    "bourg",
    "road",
    "A6"
  ],
  [
    "lyon",
    "valence",
    "road",
    "A7"
  ],
  [
    "valence",
    "avignon",
    "road",
    "A7"
  ],
  [
    "avignon",
    "marseille",
    "road",
    "A7"
  ],
  [
    "marseille",
    "toulon",
    "road",
    "A7"
  ],
  [
    "toulon",
    "nice",
    "road",
    "A7"
  ],
  [
    "gap",
    "digne",
    "road",
    "N85"
  ],
  [
    "digne",
    "nice",
    "road",
    "N85"
  ],
  [
    "lyon",
    "grenoble",
    "road",
    "A48"
  ],
  [
    "grenoble",
    "gap",
    "road",
    "A48"
  ],
  [
    "lyon",
    "chambery",
    "road",
    "A43"
  ],
  [
    "chambery",
    "modane",
    "road",
    "A43"
  ],
  [
    "chambery",
    "annecy",
    "road",
    "A41"
  ],
  [
    "annecy",
    "chamonix",
    "road",
    "A41"
  ],
  [
    "lyon",
    "saint_etienne",
    "road",
    "A47"
  ],
  [
    "saint_etienne",
    "le_puy",
    "road",
    "A47"
  ],
  [
    "le_puy",
    "mende",
    "road",
    "A47"
  ],
  [
    "mende",
    "rodez",
    "road",
    "A47"
  ],
  [
    "rodez",
    "albi",
    "road",
    "A47"
  ],
  [
    "albi",
    "toulouse",
    "road",
    "A47"
  ],
  [
    "le_puy",
    "clermont",
    "road",
    "N102"
  ],
  [
    "clermont",
    "aurillac",
    "road",
    "N102"
  ],
  [
    "aurillac",
    "rodez",
    "road",
    "N102"
  ],
  [
    "clermont",
    "limoges",
    "road",
    "A89"
  ],
  [
    "limoges",
    "perigueux",
    "road",
    "A20"
  ],
  [
    "perigueux",
    "bordeaux",
    "road",
    "A20"
  ],
  [
    "limoges",
    "gueret",
    "road",
    "N145"
  ],
  [
    "bordeaux",
    "agen",
    "road",
    "A62"
  ],
  [
    "agen",
    "toulouse",
    "road",
    "A62"
  ],
  [
    "toulouse",
    "foix",
    "road",
    "A62"
  ],
  [
    "bordeaux",
    "mont_de_marsan",
    "road",
    "A63"
  ],
  [
    "mont_de_marsan",
    "pau",
    "road",
    "A63"
  ],
  [
    "pau",
    "hendaye",
    "road",
    "A63"
  ],
  [
    "pau",
    "tarbes",
    "road",
    "A64"
  ],
  [
    "tarbes",
    "toulouse",
    "road",
    "A64"
  ],
  [
    "toulouse",
    "carcassonne",
    "road",
    "A61"
  ],
  [
    "nimes",
    "montpellier",
    "road",
    "A9"
  ],
  [
    "montpellier",
    "carcassonne",
    "road",
    "A9"
  ],
  [
    "carcassonne",
    "perpignan",
    "road",
    "A9"
  ],
  [
    "nimes",
    "avignon",
    "road",
    "A9"
  ],
  [
    "nimes",
    "mende",
    "road",
    "N106"
  ],
  [
    "poitiers",
    "niort",
    "road",
    "A10"
  ],
  [
    "niort",
    "la_rochelle",
    "road",
    "A10"
  ],
  [
    "niort",
    "la_roche_sur_yon",
    "road",
    "A83"
  ],
  [
    "la_roche_sur_yon",
    "nantes",
    "road",
    "A83"
  ],
  [
    "angouleme",
    "limoges",
    "road",
    "N141"
  ],
  [
    "nevers",
    "moulins",
    "road",
    "N7"
  ],
  [
    "lons",
    "besancon",
    "road",
    "N83"
  ],
  [
    "dijon",
    "lons",
    "road",
    "A39"
  ],
  [
    "besancon",
    "vesoul",
    "road",
    "N57"
  ],
  [
    "vesoul",
    "epinal",
    "road",
    "N57"
  ],
  [
    "epinal",
    "nancy",
    "road",
    "N57"
  ],
  [
    "bar_le_duc",
    "nancy",
    "road",
    "A4"
  ],
  [
    "valence",
    "privas",
    "road",
    "N86"
  ],
  [
    "toulouse",
    "auch",
    "road",
    "N21"
  ],
  [
    "marseille",
    "ajaccio",
    "sea",
    "Marseille–Ajaccio ferry"
  ],
  [
    "nice",
    "bastia",
    "sea",
    "Nice–Bastia ferry"
  ],
  [
    "ajaccio",
    "bastia",
    "road",
    "T20"
  ],
  [
    "auxerre",
    "orleans",
    "road",
    "N151"
  ],
  [
    "tours",
    "angers",
    "road",
    "A85"
  ]
],
  officers: staff([
  {
    "id": "fr_pres",
    "name": "Hélène Vasseur",
    "title": "President of the Republic",
    "rank": "President",
    "branch": "Presidency",
    "slot": "head_of_state",
    "war": 28,
    "int": 80,
    "pol": 74,
    "chr": 66,
    "personality": "diplomat",
    "region": "fr.paris",
    "bio": "Fictional president. The Fifth Republic's defence councils meet in Paris."
  },
  {
    "id": "fr_pm",
    "name": "Marc Duval",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Government",
    "slot": "field_officer",
    "war": 30,
    "int": 72,
    "pol": 78,
    "chr": 60,
    "personality": "schemer",
    "region": "fr.paris",
    "bio": "Fictional prime minister. Cohabitation is a live possibility in this decade, and he is not a real premier."
  },
  {
    "id": "fr_def",
    "name": "Paul Mercier",
    "title": "Minister of Defence",
    "rank": "Minister",
    "branch": "Ministry of Defence",
    "slot": "defense_minister",
    "war": 42,
    "int": 68,
    "pol": 60,
    "chr": 48,
    "personality": "cautious",
    "region": "fr.paris",
    "bio": "Fictional defence minister. The president, not this chair, holds the nuclear codes."
  },
  {
    "id": "fr_cema",
    "name": "Antoine Rivière",
    "title": "Chief of the Defence Staff",
    "rank": "Général d'armée",
    "branch": "Armée de terre",
    "slot": "chief_of_staff",
    "war": 70,
    "int": 68,
    "pol": 36,
    "chr": 44,
    "personality": "loyalist",
    "region": "fr.paris",
    "bio": "Fictional CEMA. The force de frappe is not his to advertise."
  },
  {
    "id": "fr_1ar",
    "name": "Luc Morel",
    "title": "Military governor, eastern region",
    "rank": "Général de corps d'armée",
    "branch": "Armée de terre",
    "slot": "front_commander",
    "war": 68,
    "int": 60,
    "pol": 32,
    "chr": 40,
    "personality": "cautious",
    "region": "fr.metz",
    "bio": "Fictional commander of the eastern military region, posted at Metz."
  },
  {
    "id": "fr_field",
    "name": "Claire Besnard",
    "title": "Chief of the Naval Staff",
    "rank": "Amiral",
    "branch": "Marine nationale",
    "slot": "field_officer",
    "war": 64,
    "int": 66,
    "pol": 30,
    "chr": 48,
    "personality": "aggressive",
    "region": "fr.paris",
    "bio": "Fictional naval chief. Toulon and Brest are the fleets."
  },
  {
    "id": "fr_se",
    "name": "Jean-Paul Favre",
    "title": "Southeastern military region",
    "rank": "Général",
    "branch": "Armée de terre",
    "slot": "field_officer",
    "war": 58,
    "int": 56,
    "pol": 34,
    "chr": 42,
    "personality": "loyalist",
    "region": "fr.lyon",
    "bio": "Fictional Lyon commander."
  },
  {
    "id": "fr_sw",
    "name": "Nadia Cazenave",
    "title": "Southwestern military region",
    "rank": "Général",
    "branch": "Armée de terre",
    "slot": "field_officer",
    "war": 52,
    "int": 54,
    "pol": 36,
    "chr": 50,
    "personality": "diplomat",
    "region": "fr.bordeaux",
    "bio": "Fictional Bordeaux commander."
  },
  {
    "id": "fr_nw",
    "name": "Yves Kermarrec",
    "title": "Northwestern military region",
    "rank": "Général",
    "branch": "Armée de terre",
    "slot": "field_officer",
    "war": 56,
    "int": 50,
    "pol": 28,
    "chr": 44,
    "personality": "cautious",
    "region": "fr.rennes",
    "bio": "Fictional Rennes commander, with the Atlantic ports."
  },
  {
    "id": "fr_n",
    "name": "Martine Leclercq",
    "title": "Northern military region",
    "rank": "Général",
    "branch": "Armée de terre",
    "slot": "field_officer",
    "war": 54,
    "int": 52,
    "pol": 30,
    "chr": 46,
    "personality": "loyalist",
    "region": "fr.lille",
    "bio": "Fictional Lille commander."
  },
  {
    "id": "fr_med",
    "name": "Karim Besson",
    "title": "Mediterranean squadron",
    "rank": "Vice-amiral",
    "branch": "Marine nationale",
    "slot": "front_commander",
    "war": 66,
    "int": 58,
    "pol": 26,
    "chr": 40,
    "personality": "aggressive",
    "region": "fr.marseille",
    "bio": "Fictional Mediterranean flag officer at Toulon, often in Marseille."
  },
  {
    "id": "fr_baux",
    "name": "Estelle Reynaud",
    "title": "Provence district",
    "rank": "Colonel",
    "branch": "Armée de terre",
    "slot": "field_officer",
    "war": 42,
    "int": 48,
    "pol": 28,
    "chr": 46,
    "personality": "merchant",
    "region": "fr.toulon",
    "bio": "Fictional colonel for the southern coast."
  },
  {
    "id": "fr_rhine",
    "name": "Hugo Weiss",
    "title": "Rhine brigade",
    "rank": "Général de brigade",
    "branch": "Armée de terre",
    "slot": "field_officer",
    "war": 60,
    "int": 54,
    "pol": 32,
    "chr": 38,
    "personality": "cautious",
    "region": "fr.strasbourg",
    "bio": "Fictional brigade commander on the Rhine. The name is Alsatian on purpose."
  },
  {
    "id": "fr_corse",
    "name": "Maria Colonna",
    "title": "Corsica command",
    "rank": "Colonel",
    "branch": "Armée de terre",
    "slot": "field_officer",
    "war": 48,
    "int": 50,
    "pol": 30,
    "chr": 52,
    "personality": "loyalist",
    "region": "fr.ajaccio",
    "bio": "Fictional Corsican command. The island is two departments, not a separate state."
  },
  {
    "id": "fr_air",
    "name": "Pierre Casteil",
    "title": "Air defence command",
    "rank": "Général",
    "branch": "Armée de l'air",
    "slot": "field_officer",
    "war": 62,
    "int": 64,
    "pol": 28,
    "chr": 36,
    "personality": "cautious",
    "region": "fr.toulouse",
    "bio": "Fictional air-defence general. Toulouse builds aircraft; the yield stays civic because the sheet has no airframe commodity."
  }
]),
});
export const MONACO_REGION = land({
  id: "mc",
  name: "Monaco",
  country: "MC",
  bbox: {"minLon": 6.02, "maxLon": 8.82, "minLat": 42.34, "maxLat": 45.14},
  notes: "Atlas only. A sovereign microstate on the French coast. One road into Nice. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "MC-MC",
    "name": "Monaco",
    "kind": "city"
  }
],
  cities: [
  [
    "monaco",
    "Monaco",
    "MC-MC",
    43.738,
    7.424,
    "capital",
    [
      "port",
      "administration"
    ]
  ]
],
  links: [],
  officers: staff([
  {
    "id": "mc_prince",
    "name": "Davin Ashmont",
    "title": "Sovereign",
    "rank": "Sovereign Prince",
    "branch": "Princely House",
    "slot": "head_of_state",
    "war": 18,
    "int": 60,
    "pol": 70,
    "chr": 72,
    "personality": "diplomat",
    "region": "mc.monaco",
    "bio": "Fictional sovereign. The name is not a real Grimaldi."
  },
  {
    "id": "mc_car",
    "name": "Lucien Carabinier",
    "title": "Compagnie des Carabiniers",
    "rank": "Colonel",
    "branch": "Carabiniers",
    "slot": "field_officer",
    "war": 36,
    "int": 44,
    "pol": 28,
    "chr": 40,
    "personality": "loyalist",
    "region": "mc.monaco",
    "bio": "Fictional commander of the Carabiniers du Prince."
  }
]),
});
export const ANDORRA_REGION = land({
  id: "ad",
  name: "Andorra",
  country: "AD",
  bbox: {"minLon": 0.09, "maxLon": 3.0, "minLat": 41.06, "maxLat": 43.97},
  notes: "Atlas only. Seven parishes. The passes run to France at Pas de la Casa and to Spain toward La Seu d'Urgell. Co-principality, no army. Occupied and off the week-0 march.",
  defaultBiome: "temperate",
  climate: {"_default": {"sun": 2, "weather": 2}},
  biome: {},
  subs: [
  {
    "id": "AD-CA",
    "name": "Canillo",
    "kind": "parish"
  },
  {
    "id": "AD-EN",
    "name": "Encamp",
    "kind": "parish"
  },
  {
    "id": "AD-OR",
    "name": "Ordino",
    "kind": "parish"
  },
  {
    "id": "AD-MA",
    "name": "La Massana",
    "kind": "parish"
  },
  {
    "id": "AD-AN",
    "name": "Andorra la Vella",
    "kind": "parish"
  },
  {
    "id": "AD-SJ",
    "name": "Sant Julià de Lòria",
    "kind": "parish"
  },
  {
    "id": "AD-EE",
    "name": "Escaldes-Engordany",
    "kind": "parish"
  }
],
  cities: [
  [
    "canillo",
    "Canillo",
    "AD-CA",
    42.567,
    1.598,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "encamp",
    "Encamp",
    "AD-EN",
    42.535,
    1.583,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "ordino",
    "Ordino",
    "AD-OR",
    42.556,
    1.533,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "la_massana",
    "La Massana",
    "AD-MA",
    42.545,
    1.514,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "andorra",
    "Andorra la Vella",
    "AD-AN",
    42.507,
    1.522,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "sant_julia",
    "Sant Julià de Lòria",
    "AD-SJ",
    42.463,
    1.491,
    "capital",
    [
      "administration"
    ]
  ],
  [
    "escaldes",
    "Escaldes-Engordany",
    "AD-EE",
    42.509,
    1.534,
    "capital",
    [
      "administration"
    ]
  ]
],
  links: [
  [
    "canillo",
    "encamp",
    "road",
    "CG-2"
  ],
  [
    "encamp",
    "escaldes",
    "road",
    "CG-1"
  ],
  [
    "escaldes",
    "andorra",
    "road",
    "CG-1"
  ],
  [
    "andorra",
    "sant_julia",
    "road",
    "CG-1"
  ],
  [
    "andorra",
    "la_massana",
    "road",
    "CG-3"
  ],
  [
    "la_massana",
    "ordino",
    "road",
    "CG-3"
  ]
],
  officers: staff([
  {
    "id": "ad_cap",
    "name": "Montserrat Picart",
    "title": "Cap de Govern",
    "rank": "Head of Government",
    "branch": "Government",
    "slot": "head_of_state",
    "war": 16,
    "int": 58,
    "pol": 64,
    "chr": 60,
    "personality": "diplomat",
    "region": "ad.andorra",
    "bio": "Fictional head of government. The co-princes stay off the sheet."
  },
  {
    "id": "ad_int",
    "name": "Jordi Ribes",
    "title": "Minister of the Interior",
    "rank": "Minister",
    "branch": "Interior",
    "slot": "defense_minister",
    "war": 22,
    "int": 48,
    "pol": 40,
    "chr": 44,
    "personality": "cautious",
    "region": "ad.andorra",
    "bio": "Fictional interior minister. Andorra has no army."
  },
  {
    "id": "ad_field",
    "name": "Núria Call",
    "title": "Police border post",
    "rank": "Comissari",
    "branch": "Police",
    "slot": "field_officer",
    "war": 24,
    "int": 42,
    "pol": 28,
    "chr": 46,
    "personality": "loyalist",
    "region": "ad.encamp",
    "bio": "Fictional officer at Encamp, covering Pas de la Casa."
  }
]),
});
