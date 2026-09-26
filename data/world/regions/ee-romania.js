import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}
export const ROMANIA_REGION = land({
  "id": "ro",
  "name": "Romania",
  "country": "RO",
  "bbox": {
    "minLon": 19.73,
    "maxLon": 30.3,
    "minLat": 42.4,
    "maxLat": 49.29
  },
  "notes": "Atlas only. Forty județe plus the Bucharest municipality, the 1981 map. Ilfov is not a județ again until 1997. Ploiești is oil, the Jiu valley coal sits with Hunedoara and Gorj, Constanța is the Black Sea port, and Galați is steel. The Calafat–Vidin crossing is still a ferry. Occupied and off the week-0 march.",
  "defaultBiome": "temperate",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "RO-AB",
      "name": "Alba",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-AR",
      "name": "Arad",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-AG",
      "name": "Argeș",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-BC",
      "name": "Bacău",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-BH",
      "name": "Bihor",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-BN",
      "name": "Bistrița-Năsăud",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-BT",
      "name": "Botoșani",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-BV",
      "name": "Brașov",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-BR",
      "name": "Brăila",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-BZ",
      "name": "Buzău",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-CS",
      "name": "Caraș-Severin",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-CL",
      "name": "Călărași",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-CJ",
      "name": "Cluj",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-CT",
      "name": "Constanța",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-CV",
      "name": "Covasna",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-DB",
      "name": "Dâmbovița",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-DJ",
      "name": "Dolj",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-GL",
      "name": "Galați",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-GR",
      "name": "Giurgiu",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-GJ",
      "name": "Gorj",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-HR",
      "name": "Harghita",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-HD",
      "name": "Hunedoara",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-IL",
      "name": "Ialomița",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-IS",
      "name": "Iași",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-MM",
      "name": "Maramureș",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-MH",
      "name": "Mehedinți",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-MS",
      "name": "Mureș",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-NT",
      "name": "Neamț",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-OT",
      "name": "Olt",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-PH",
      "name": "Prahova",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-SM",
      "name": "Satu Mare",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-SJ",
      "name": "Sălaj",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-SB",
      "name": "Sibiu",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-SV",
      "name": "Suceava",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-TR",
      "name": "Teleorman",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-TM",
      "name": "Timiș",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-TL",
      "name": "Tulcea",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-VS",
      "name": "Vaslui",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-VL",
      "name": "Vâlcea",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-VN",
      "name": "Vrancea",
      "kind": "judet",
      "group": null
    },
    {
      "id": "RO-B",
      "name": "Bucharest",
      "kind": "municipality",
      "group": null
    }
  ],
  "cities": [
    [
      "alba_iulia",
      "Alba Iulia",
      "RO-AB",
      46.07,
      23.58,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "arad",
      "Arad",
      "RO-AR",
      46.19,
      21.31,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "pitesti",
      "Pitești",
      "RO-AG",
      44.86,
      24.87,
      "capital",
      [
        "autos"
      ]
    ],
    [
      "bacau",
      "Bacău",
      "RO-BC",
      46.57,
      26.91,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "oradea",
      "Oradea",
      "RO-BH",
      47.05,
      21.94,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "bistrita",
      "Bistrița",
      "RO-BN",
      47.13,
      24.49,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "botosani",
      "Botoșani",
      "RO-BT",
      47.75,
      26.66,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "brasov",
      "Brașov",
      "RO-BV",
      45.64,
      25.59,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "braila",
      "Brăila",
      "RO-BR",
      45.27,
      27.97,
      "capital",
      [
        "port",
        "wheat"
      ]
    ],
    [
      "buzau",
      "Buzău",
      "RO-BZ",
      45.15,
      26.82,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "resita",
      "Reșița",
      "RO-CS",
      45.3,
      21.89,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "calarasi",
      "Călărași",
      "RO-CL",
      44.2,
      27.33,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "cluj",
      "Cluj-Napoca",
      "RO-CJ",
      46.77,
      23.59,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "constanta",
      "Constanța",
      "RO-CT",
      44.18,
      28.63,
      "capital",
      [
        "port",
        "oil"
      ]
    ],
    [
      "sfantu",
      "Sfântu Gheorghe",
      "RO-CV",
      45.86,
      25.79,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "targoviste",
      "Târgoviște",
      "RO-DB",
      44.93,
      25.46,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "craiova",
      "Craiova",
      "RO-DJ",
      44.32,
      23.8,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "galati",
      "Galați",
      "RO-GL",
      45.44,
      28.05,
      "capital",
      [
        "steel",
        "port"
      ]
    ],
    [
      "giurgiu",
      "Giurgiu",
      "RO-GR",
      43.9,
      25.97,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "targu_jiu",
      "Târgu Jiu",
      "RO-GJ",
      45.03,
      23.27,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "miercurea",
      "Miercurea Ciuc",
      "RO-HR",
      46.36,
      25.8,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "deva",
      "Deva",
      "RO-HD",
      45.88,
      22.91,
      "capital",
      [
        "coal",
        "steel"
      ]
    ],
    [
      "slobozia",
      "Slobozia",
      "RO-IL",
      44.56,
      27.36,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "iasi",
      "Iași",
      "RO-IS",
      47.16,
      27.59,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "baia_mare",
      "Baia Mare",
      "RO-MM",
      47.66,
      23.57,
      "capital",
      [
        "copper"
      ]
    ],
    [
      "drobeta",
      "Drobeta-Turnu Severin",
      "RO-MH",
      44.63,
      22.66,
      "capital",
      [
        "hydro"
      ]
    ],
    [
      "targu_mures",
      "Târgu Mureș",
      "RO-MS",
      46.54,
      24.56,
      "capital",
      [
        "natural_gas"
      ]
    ],
    [
      "piatra",
      "Piatra Neamț",
      "RO-NT",
      46.93,
      26.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "slatina",
      "Slatina",
      "RO-OT",
      44.43,
      24.36,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "ploiesti",
      "Ploiești",
      "RO-PH",
      44.94,
      26.02,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "satu_mare",
      "Satu Mare",
      "RO-SM",
      47.79,
      22.89,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "zalau",
      "Zalău",
      "RO-SJ",
      47.19,
      23.06,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "sibiu",
      "Sibiu",
      "RO-SB",
      45.8,
      24.15,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "suceava",
      "Suceava",
      "RO-SV",
      47.65,
      26.26,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "alexandria",
      "Alexandria",
      "RO-TR",
      43.97,
      25.33,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "timisoara",
      "Timișoara",
      "RO-TM",
      45.75,
      21.23,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "tulcea",
      "Tulcea",
      "RO-TL",
      45.18,
      28.8,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "vaslui",
      "Vaslui",
      "RO-VS",
      46.64,
      27.73,
      "capital",
      [
        "wheat"
      ]
    ],
    [
      "ramnicu",
      "Râmnicu Vâlcea",
      "RO-VL",
      45.1,
      24.37,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "focsani",
      "Focșani",
      "RO-VN",
      45.7,
      27.19,
      "capital",
      [
        "grapes"
      ]
    ],
    [
      "bucharest",
      "Bucharest",
      "RO-B",
      44.43,
      26.1,
      "capital",
      [
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "alba_iulia",
      "cluj",
      "road",
      "DN1"
    ],
    [
      "alba_iulia",
      "deva",
      "road",
      "local road"
    ],
    [
      "alba_iulia",
      "sibiu",
      "road",
      "DN1"
    ],
    [
      "alexandria",
      "giurgiu",
      "road",
      "local road"
    ],
    [
      "arad",
      "timisoara",
      "road",
      "DN69"
    ],
    [
      "bacau",
      "piatra",
      "road",
      "local road"
    ],
    [
      "bacau",
      "vaslui",
      "road",
      "local road"
    ],
    [
      "baia_mare",
      "satu_mare",
      "road",
      "local road"
    ],
    [
      "baia_mare",
      "zalau",
      "road",
      "local road"
    ],
    [
      "bistrita",
      "targu_mures",
      "road",
      "local road"
    ],
    [
      "botosani",
      "suceava",
      "road",
      "local road"
    ],
    [
      "braila",
      "galati",
      "road",
      "Danube bridge"
    ],
    [
      "brasov",
      "ploiesti",
      "road",
      "DN1"
    ],
    [
      "brasov",
      "sfantu",
      "road",
      "local road"
    ],
    [
      "brasov",
      "sibiu",
      "road",
      "DN1"
    ],
    [
      "brasov",
      "targoviste",
      "road",
      "local road"
    ],
    [
      "bucharest",
      "constanta",
      "road",
      "A2 corridor"
    ],
    [
      "bucharest",
      "giurgiu",
      "road",
      "DN5"
    ],
    [
      "bucharest",
      "ploiesti",
      "road",
      "DN1"
    ],
    [
      "buzau",
      "focsani",
      "road",
      "local road"
    ],
    [
      "buzau",
      "ploiesti",
      "road",
      "local road"
    ],
    [
      "buzau",
      "slobozia",
      "road",
      "local road"
    ],
    [
      "calarasi",
      "constanta",
      "road",
      "local road"
    ],
    [
      "calarasi",
      "slobozia",
      "road",
      "local road"
    ],
    [
      "cluj",
      "oradea",
      "road",
      "DN1"
    ],
    [
      "cluj",
      "targu_mures",
      "road",
      "local road"
    ],
    [
      "cluj",
      "zalau",
      "road",
      "local road"
    ],
    [
      "craiova",
      "slatina",
      "road",
      "local road"
    ],
    [
      "drobeta",
      "resita",
      "road",
      "local road"
    ],
    [
      "drobeta",
      "targu_jiu",
      "road",
      "local road"
    ],
    [
      "focsani",
      "galati",
      "road",
      "local road"
    ],
    [
      "galati",
      "tulcea",
      "road",
      "local road"
    ],
    [
      "iasi",
      "suceava",
      "road",
      "E85"
    ],
    [
      "iasi",
      "vaslui",
      "road",
      "local road"
    ],
    [
      "miercurea",
      "piatra",
      "road",
      "local road"
    ],
    [
      "miercurea",
      "sfantu",
      "road",
      "local road"
    ],
    [
      "oradea",
      "zalau",
      "road",
      "local road"
    ],
    [
      "piatra",
      "suceava",
      "road",
      "local road"
    ],
    [
      "pitesti",
      "ramnicu",
      "road",
      "local road"
    ],
    [
      "pitesti",
      "slatina",
      "road",
      "local road"
    ],
    [
      "pitesti",
      "targoviste",
      "road",
      "local road"
    ],
    [
      "ploiesti",
      "targoviste",
      "road",
      "local road"
    ],
    [
      "ramnicu",
      "sibiu",
      "road",
      "local road"
    ],
    [
      "ramnicu",
      "targu_jiu",
      "road",
      "local road"
    ],
    [
      "resita",
      "timisoara",
      "road",
      "local road"
    ]
  ]
,
  officers: staff([
  {
    "id": "ro_head",
    "name": "Radu Petrescu",
    "title": "Chairman of the Council of Ministers",
    "rank": "Chairman",
    "branch": "Council of Ministers",
    "slot": "head_of_state",
    "war": 36,
    "int": 62,
    "pol": 78,
    "chr": 30,
    "personality": "schemer",
    "bio": "Fictional head of this posting. Not a real officeholder.",
    "region": "ro.bucharest"
  },
  {
    "id": "ro_def",
    "name": "Mircea Dumitrescu",
    "title": "Minister of National Defence",
    "rank": "General de armată",
    "branch": "Romanian Land Forces",
    "slot": "defense_minister",
    "war": 70,
    "int": 52,
    "pol": 44,
    "chr": 34,
    "personality": "loyalist",
    "bio": "Fictional defense minister.",
    "region": "ro.bucharest"
  },
  {
    "id": "ro_chief",
    "name": "Elena Barbu",
    "title": "Chief of the General Staff",
    "rank": "General-colonel",
    "branch": "Romanian Land Forces",
    "slot": "chief_of_staff",
    "war": 64,
    "int": 68,
    "pol": 40,
    "chr": 42,
    "personality": "cautious",
    "bio": "Fictional chief of staff.",
    "region": "ro.bucharest"
  },
  {
    "id": "ro_f0",
    "name": "Victor Stan",
    "title": "2nd Army",
    "rank": "General-locotenent",
    "branch": "Romanian Land Forces",
    "slot": "front_commander",
    "war": 68,
    "int": 50,
    "pol": 34,
    "chr": 32,
    "personality": "aggressive",
    "bio": "Fictional front commander.",
    "region": "ro.bucharest"
  },
  {
    "id": "ro_field",
    "name": "Doina Marinescu",
    "title": "Bucharest garrison",
    "rank": "Colonel",
    "branch": "Romanian Land Forces",
    "slot": "field_officer",
    "war": 56,
    "int": 64,
    "pol": 58,
    "chr": 38,
    "personality": "ambitious",
    "bio": "Fictional field officer.",
    "region": "ro.bucharest"
  },
  {
    "id": "ro_f1",
    "name": "Constantin Enache",
    "title": "Navy",
    "rank": "Viceamiral",
    "branch": "Romanian Navy",
    "slot": "front_commander",
    "war": 60,
    "int": 58,
    "pol": 36,
    "chr": 40,
    "personality": "merchant",
    "bio": "Fictional front commander.",
    "region": "ro.constanta"
  },
  {
    "id": "ro_f2",
    "name": "Andrei Popa",
    "title": "4th Army",
    "rank": "General-maior",
    "branch": "Romanian Land Forces",
    "slot": "front_commander",
    "war": 62,
    "int": 56,
    "pol": 30,
    "chr": 34,
    "personality": "cautious",
    "bio": "Fictional front commander.",
    "region": "ro.cluj"
  },
  {
    "id": "ro_f3",
    "name": "Ioana Dragomir",
    "title": "Danube sector",
    "rank": "Colonel",
    "branch": "Romanian Land Forces",
    "slot": "front_commander",
    "war": 54,
    "int": 60,
    "pol": 42,
    "chr": 48,
    "personality": "loyalist",
    "bio": "Fictional front commander.",
    "region": "ro.galati"
  }
])
});
