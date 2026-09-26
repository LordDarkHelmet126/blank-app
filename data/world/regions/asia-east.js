/** East Asia, 1985-89. Hong Kong is British. Macau is Portuguese. Taiwan is the ROC. */
import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const CHINA_REGION = land({
  "id": "cn",
  "name": "China",
  "country": "CN",
  "bbox": {
    "minLon": 75.24,
    "maxLon": 131.9,
    "minLat": 19.29,
    "maxLat": 50.99
  },
  "notes": "Atlas only. Winter 1985 start: 21 administered provinces, five autonomous regions, and the municipalities of Beijing, Tianjin, and Shanghai. Hainan is still part of Guangdong; it was split off as a province in April 1988. Tibet is the Xizang autonomous region. Chongqing is a city in Sichuan, not a municipality. Taiwan is not a PRC province; it is the Republic of China on this sheet. Hong Kong is British and Macau is Portuguese. The Amur crossing at Heihe is a ferry. Nathu La is a closed trail. The main trunks are rail and are not also roads. Occupied and off the week-0 march.",
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
      "id": "CN-AH",
      "name": "Anhui",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-FJ",
      "name": "Fujian",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-GS",
      "name": "Gansu",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-GD",
      "name": "Guangdong",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-GZ",
      "name": "Guizhou",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-HE",
      "name": "Hebei",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-HL",
      "name": "Heilongjiang",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-HA",
      "name": "Henan",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-HB",
      "name": "Hubei",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-HN",
      "name": "Hunan",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-JS",
      "name": "Jiangsu",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-JX",
      "name": "Jiangxi",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-JL",
      "name": "Jilin",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-LN",
      "name": "Liaoning",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-QH",
      "name": "Qinghai",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-SN",
      "name": "Shaanxi",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-SD",
      "name": "Shandong",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-SX",
      "name": "Shanxi",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-SC",
      "name": "Sichuan",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-YN",
      "name": "Yunnan",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-ZJ",
      "name": "Zhejiang",
      "kind": "province",
      "group": null
    },
    {
      "id": "CN-GX",
      "name": "Guangxi",
      "kind": "autonomous region",
      "group": null
    },
    {
      "id": "CN-NM",
      "name": "Nei Mongol",
      "kind": "autonomous region",
      "group": null
    },
    {
      "id": "CN-NX",
      "name": "Ningxia",
      "kind": "autonomous region",
      "group": null
    },
    {
      "id": "CN-XJ",
      "name": "Xinjiang",
      "kind": "autonomous region",
      "group": null
    },
    {
      "id": "CN-XZ",
      "name": "Xizang",
      "kind": "autonomous region",
      "group": null
    },
    {
      "id": "CN-BJ",
      "name": "Beijing",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "CN-TJ",
      "name": "Tianjin",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "CN-SH",
      "name": "Shanghai",
      "kind": "municipality",
      "group": null
    }
  ],
  "cities": [
    [
      "hefei",
      "Hefei",
      "CN-AH",
      31.82,
      117.23,
      "capital",
      [
        "rice",
        "coal"
      ]
    ],
    [
      "fuzhou",
      "Fuzhou",
      "CN-FJ",
      26.07,
      119.3,
      "capital",
      [
        "rice",
        "port"
      ]
    ],
    [
      "lanzhou",
      "Lanzhou",
      "CN-GS",
      36.06,
      103.83,
      "capital",
      [
        "oil",
        "wheat"
      ]
    ],
    [
      "guangzhou",
      "Guangzhou",
      "CN-GD",
      23.13,
      113.26,
      "capital",
      [
        "port",
        "rice",
        "administration"
      ]
    ],
    [
      "guiyang",
      "Guiyang",
      "CN-GZ",
      26.65,
      106.63,
      "capital",
      [
        "coal",
        "tobacco"
      ]
    ],
    [
      "haikou",
      "Haikou",
      "CN-GD",
      20.04,
      110.32,
      "port",
      [
        "port",
        "timber",
        "iron"
      ]
    ],
    [
      "shijiazhuang",
      "Shijiazhuang",
      "CN-HE",
      38.04,
      114.51,
      "capital",
      [
        "wheat",
        "coal"
      ]
    ],
    [
      "harbin",
      "Harbin",
      "CN-HL",
      45.75,
      126.65,
      "capital",
      [
        "wheat",
        "oil",
        "coal"
      ]
    ],
    [
      "zhengzhou",
      "Zhengzhou",
      "CN-HA",
      34.75,
      113.63,
      "capital",
      [
        "wheat",
        "coal"
      ]
    ],
    [
      "wuhan",
      "Wuhan",
      "CN-HB",
      30.59,
      114.31,
      "capital",
      [
        "steel",
        "rice",
        "port"
      ]
    ],
    [
      "changsha",
      "Changsha",
      "CN-HN",
      28.23,
      112.94,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "nanjing",
      "Nanjing",
      "CN-JS",
      32.06,
      118.8,
      "capital",
      [
        "rice",
        "port"
      ]
    ],
    [
      "nanchang",
      "Nanchang",
      "CN-JX",
      28.68,
      115.86,
      "capital",
      [
        "rice",
        "copper"
      ]
    ],
    [
      "changchun",
      "Changchun",
      "CN-JL",
      43.82,
      125.32,
      "capital",
      [
        "autos",
        "corn",
        "coal"
      ]
    ],
    [
      "shenyang",
      "Shenyang",
      "CN-LN",
      41.8,
      123.43,
      "capital",
      [
        "steel",
        "coal",
        "iron"
      ]
    ],
    [
      "xining",
      "Xining",
      "CN-QH",
      36.62,
      101.78,
      "capital",
      [
        "salt",
        "oil",
        "hydro"
      ]
    ],
    [
      "xian",
      "Xi'an",
      "CN-SN",
      34.34,
      108.94,
      "capital",
      [
        "wheat",
        "coal"
      ]
    ],
    [
      "jinan",
      "Jinan",
      "CN-SD",
      36.67,
      117.0,
      "capital",
      [
        "wheat",
        "oil"
      ]
    ],
    [
      "taiyuan",
      "Taiyuan",
      "CN-SX",
      37.87,
      112.55,
      "capital",
      [
        "coal",
        "steel"
      ]
    ],
    [
      "chengdu",
      "Chengdu",
      "CN-SC",
      30.66,
      104.07,
      "capital",
      [
        "rice",
        "natural_gas"
      ]
    ],
    [
      "kunming",
      "Kunming",
      "CN-YN",
      25.04,
      102.71,
      "capital",
      [
        "tin",
        "tobacco",
        "copper"
      ]
    ],
    [
      "hangzhou",
      "Hangzhou",
      "CN-ZJ",
      30.27,
      120.16,
      "capital",
      [
        "rice",
        "port",
        "fisheries"
      ]
    ],
    [
      "nanning",
      "Nanning",
      "CN-GX",
      22.82,
      108.32,
      "capital",
      [
        "sugarcane",
        "bauxite"
      ]
    ],
    [
      "hohhot",
      "Hohhot",
      "CN-NM",
      40.84,
      111.75,
      "capital",
      [
        "coal",
        "wool",
        "cattle"
      ]
    ],
    [
      "yinchuan",
      "Yinchuan",
      "CN-NX",
      38.49,
      106.23,
      "capital",
      [
        "coal",
        "wheat"
      ]
    ],
    [
      "urumqi",
      "Urumqi",
      "CN-XJ",
      43.83,
      87.62,
      "capital",
      [
        "oil",
        "cotton",
        "coal"
      ]
    ],
    [
      "lhasa",
      "Lhasa",
      "CN-XZ",
      29.65,
      91.12,
      "capital",
      [
        "wool",
        "hydro",
        "administration"
      ]
    ],
    [
      "beijing",
      "Beijing",
      "CN-BJ",
      39.9,
      116.41,
      "capital",
      [
        "administration",
        "steel",
        "coal"
      ]
    ],
    [
      "tianjin",
      "Tianjin",
      "CN-TJ",
      39.14,
      117.18,
      "capital",
      [
        "port",
        "steel",
        "salt"
      ]
    ],
    [
      "shanghai",
      "Shanghai",
      "CN-SH",
      31.23,
      121.47,
      "capital",
      [
        "port",
        "steel",
        "autos"
      ]
    ],
    [
      "xiamen",
      "Xiamen",
      "CN-FJ",
      24.48,
      118.09,
      "city",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "dalian",
      "Dalian",
      "CN-LN",
      38.91,
      121.6,
      "city",
      [
        "port",
        "steel"
      ]
    ],
    [
      "qingdao",
      "Qingdao",
      "CN-SD",
      36.07,
      120.38,
      "city",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "chongqing",
      "Chongqing",
      "CN-SC",
      29.56,
      106.55,
      "city",
      [
        "steel",
        "port"
      ]
    ],
    [
      "baotou",
      "Baotou",
      "CN-NM",
      40.66,
      109.84,
      "city",
      [
        "steel",
        "iron"
      ]
    ],
    [
      "heihe",
      "Heihe",
      "CN-HL",
      50.24,
      127.49,
      "city",
      [
        "port",
        "wheat"
      ]
    ],
    [
      "suifenhe",
      "Suifenhe",
      "CN-HL",
      44.4,
      131.15,
      "city",
      [
        "coal",
        "timber"
      ]
    ],
    [
      "manzhouli",
      "Manzhouli",
      "CN-NM",
      49.6,
      117.43,
      "city",
      [
        "coal",
        "port"
      ]
    ],
    [
      "dandong",
      "Dandong",
      "CN-LN",
      40.13,
      124.39,
      "city",
      [
        "port",
        "steel"
      ]
    ],
    [
      "erenhot",
      "Erenhot",
      "CN-NM",
      43.65,
      111.98,
      "city",
      [
        "wool",
        "coal"
      ]
    ],
    [
      "kashgar",
      "Kashgar",
      "CN-XJ",
      39.47,
      75.99,
      "city",
      [
        "cotton",
        "wheat"
      ]
    ],
    [
      "pingxiang",
      "Pingxiang",
      "CN-GX",
      22.1,
      106.77,
      "city",
      [
        "sugarcane"
      ]
    ],
    [
      "tangshan",
      "Tangshan",
      "CN-HE",
      39.63,
      118.18,
      "city",
      [
        "steel",
        "coal"
      ]
    ],
    [
      "daqing",
      "Daqing",
      "CN-HL",
      46.59,
      125.1,
      "city",
      [
        "oil"
      ]
    ]
  ],
  "links": [
    [
      "beijing",
      "tianjin",
      "rail",
      "Jingshan railway"
    ],
    [
      "tianjin",
      "jinan",
      "rail",
      "Jinghu railway"
    ],
    [
      "jinan",
      "qingdao",
      "rail",
      "Jiaoji railway"
    ],
    [
      "beijing",
      "shijiazhuang",
      "rail",
      "Jingguang railway"
    ],
    [
      "shijiazhuang",
      "zhengzhou",
      "rail",
      "Jingguang railway"
    ],
    [
      "zhengzhou",
      "wuhan",
      "rail",
      "Jingguang railway"
    ],
    [
      "wuhan",
      "changsha",
      "rail",
      "Jingguang railway"
    ],
    [
      "changsha",
      "guangzhou",
      "rail",
      "Jingguang railway"
    ],
    [
      "zhengzhou",
      "xian",
      "rail",
      "Longhai railway"
    ],
    [
      "xian",
      "lanzhou",
      "rail",
      "Longhai railway"
    ],
    [
      "lanzhou",
      "urumqi",
      "rail",
      "Lanzhou-Xinjiang railway"
    ],
    [
      "lanzhou",
      "xining",
      "rail",
      "Lanzhou-Qinghai railway"
    ],
    [
      "xian",
      "chengdu",
      "rail",
      "Baoji-Chengdu railway"
    ],
    [
      "chengdu",
      "chongqing",
      "rail",
      "Chengyu railway"
    ],
    [
      "chengdu",
      "kunming",
      "rail",
      "Chengkun railway"
    ],
    [
      "beijing",
      "hohhot",
      "rail",
      "Jingbao railway"
    ],
    [
      "hohhot",
      "baotou",
      "rail",
      "Jingbao railway"
    ],
    [
      "hohhot",
      "erenhot",
      "rail",
      "Jining-Erenhot railway"
    ],
    [
      "beijing",
      "shenyang",
      "rail",
      "Jingha railway"
    ],
    [
      "shenyang",
      "changchun",
      "rail",
      "Jingha railway"
    ],
    [
      "changchun",
      "harbin",
      "rail",
      "Jingha railway"
    ],
    [
      "harbin",
      "suifenhe",
      "rail",
      "Chinese Eastern Railway"
    ],
    [
      "harbin",
      "manzhouli",
      "rail",
      "Chinese Eastern Railway"
    ],
    [
      "shenyang",
      "dalian",
      "rail",
      "Shenda railway"
    ],
    [
      "shenyang",
      "dandong",
      "rail",
      "Shendan railway"
    ],
    [
      "shanghai",
      "nanjing",
      "rail",
      "Jinghu railway"
    ],
    [
      "shanghai",
      "hangzhou",
      "rail",
      "Huhang railway"
    ],
    [
      "shijiazhuang",
      "taiyuan",
      "rail",
      "Shitai railway"
    ],
    [
      "nanning",
      "pingxiang",
      "rail",
      "Xianggui railway"
    ],
    [
      "guangzhou",
      "haikou",
      "sea",
      "Qiongzhou Strait"
    ],
    [
      "tianjin",
      "tangshan",
      "road",
      "National road"
    ],
    [
      "hefei",
      "nanjing",
      "road",
      "National road"
    ],
    [
      "harbin",
      "daqing",
      "road",
      "National road"
    ],
    [
      "fuzhou",
      "xiamen",
      "road",
      "National road"
    ],
    [
      "wuhan",
      "nanchang",
      "road",
      "National road"
    ],
    [
      "guiyang",
      "chongqing",
      "road",
      "National road"
    ],
    [
      "hefei",
      "wuhan",
      "road",
      "National road"
    ],
    [
      "lanzhou",
      "yinchuan",
      "road",
      "National road"
    ],
    [
      "guiyang",
      "nanning",
      "road",
      "National road"
    ],
    [
      "fuzhou",
      "hangzhou",
      "road",
      "National road"
    ],
    [
      "heihe",
      "daqing",
      "road",
      "National road"
    ],
    [
      "urumqi",
      "kashgar",
      "road",
      "National road"
    ],
    [
      "kunming",
      "lhasa",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "cn_0",
    "name": "Liang Chen",
    "title": "President",
    "rank": "President",
    "branch": "People's Liberation Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of China, posted at hefei (cn_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cn.hefei"
  },
  {
    "id": "cn_1",
    "name": "Hao Lin",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "People's Liberation Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of China, posted at fuzhou (cn_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cn.fuzhou"
  },
  {
    "id": "cn_2",
    "name": "Jun Huang",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "People's Liberation Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of China, posted at lanzhou (cn_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cn.lanzhou"
  },
  {
    "id": "cn_3",
    "name": "Feng Wu",
    "title": "Front commander",
    "rank": "Senior Colonel",
    "branch": "People's Liberation Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of China, posted at guangzhou (cn_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cn.guangzhou"
  },
  {
    "id": "cn_4",
    "name": "Tao Xu",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "People's Liberation Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of China, posted at guiyang (cn_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cn.guiyang"
  },
  {
    "id": "cn_5",
    "name": "Bo Sun",
    "title": "Front commander",
    "rank": "Senior Colonel",
    "branch": "People's Liberation Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of China, posted at haikou (cn_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cn.haikou"
  },
  {
    "id": "cn_6",
    "name": "Cheng Ma",
    "title": "Front commander",
    "rank": "Senior Colonel",
    "branch": "People's Liberation Army",
    "slot": "front_commander",
    "war": 76,
    "int": 47,
    "pol": 38,
    "chr": 38,
    "personality": "ambitious",
    "bio": "Fictional Front commander of China, posted at shijiazhuang (cn_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cn.shijiazhuang"
  },
  {
    "id": "cn_7",
    "name": "Ming Gao",
    "title": "Front commander",
    "rank": "Senior Colonel",
    "branch": "People's Liberation Army",
    "slot": "front_commander",
    "war": 79,
    "int": 52,
    "pol": 36,
    "chr": 35,
    "personality": "recluse",
    "bio": "Fictional Front commander of China, posted at harbin (cn_7). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "cn.harbin"
  }
])
});

export const HONG_KONG_REGION = land({
  "id": "hk",
  "name": "Hong Kong",
  "country": "HK",
  "bbox": {
    "minLon": 113.41,
    "maxLon": 114.94,
    "minLat": 21.53,
    "maxLat": 23.13
  },
  "notes": "Atlas only. British dependent territory until 1997. Three regions: Hong Kong Island, Kowloon, and the New Territories, not the later eighteen districts. The Kowloon-Canton Railway meets Guangzhou. A ferry runs to Macau. Occupied and off the week-0 march.",
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
      "id": "HK-IS",
      "name": "Hong Kong Island",
      "kind": "region",
      "group": null
    },
    {
      "id": "HK-KL",
      "name": "Kowloon",
      "kind": "region",
      "group": null
    },
    {
      "id": "HK-NT",
      "name": "New Territories",
      "kind": "region",
      "group": null
    }
  ],
  "cities": [
    [
      "central",
      "Hong Kong",
      "HK-IS",
      22.28,
      114.16,
      "capital",
      [
        "port",
        "administration"
      ]
    ],
    [
      "kowloon",
      "Kowloon",
      "HK-KL",
      22.32,
      114.17,
      "capital",
      [
        "port",
        "administration"
      ]
    ],
    [
      "shatin",
      "Sha Tin",
      "HK-NT",
      22.38,
      114.19,
      "capital",
      [
        "port"
      ]
    ]
  ],
  "links": [
    [
      "central",
      "kowloon",
      "road",
      "National road"
    ],
    [
      "kowloon",
      "shatin",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "hk_0",
    "name": "Alden Chan",
    "title": "Governor",
    "rank": "Governor",
    "branch": "Royal Hong Kong Regiment",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional Governor of Hong Kong, posted at central (hk_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "hk.central"
  },
  {
    "id": "hk_1",
    "name": "Bram Cheung",
    "title": "Chief secretary",
    "rank": "Commissioner",
    "branch": "Royal Hong Kong Regiment",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Chief secretary of Hong Kong, posted at kowloon (hk_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "hk.kowloon"
  },
  {
    "id": "hk_2",
    "name": "Corin Lam",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Royal Hong Kong Regiment",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional Field officer of Hong Kong, posted at shatin (hk_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "hk.shatin"
  }
])
});

export const MACAU_REGION = land({
  "id": "mo",
  "name": "Macau",
  "country": "MO",
  "bbox": {
    "minLon": 112.79,
    "maxLon": 114.31,
    "minLat": 21.41,
    "maxLat": 22.95
  },
  "notes": "Atlas only. Portuguese territory until 1999. Two concelhos: Macau and Ilhas. Not a Chinese subdivision. Gongbei is the road to Guangzhou, and the ferry runs to Hong Kong. Occupied and off the week-0 march.",
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
      "id": "MO-MC",
      "name": "Macau",
      "kind": "concelho",
      "group": null
    },
    {
      "id": "MO-IL",
      "name": "Ilhas",
      "kind": "concelho",
      "group": null
    }
  ],
  "cities": [
    [
      "macau",
      "Macau",
      "MO-MC",
      22.2,
      113.54,
      "capital",
      [
        "port",
        "administration"
      ]
    ],
    [
      "taipa",
      "Taipa",
      "MO-IL",
      22.16,
      113.56,
      "capital",
      [
        "port"
      ]
    ]
  ],
  "links": [
    [
      "macau",
      "taipa",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "mo_0",
    "name": "Ricardo Ribeiro",
    "title": "Governor",
    "rank": "Governor",
    "branch": "Portuguese Garrison",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional Governor of Macau, posted at macau (mo_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mo.macau"
  },
  {
    "id": "mo_1",
    "name": "Ricardo Carvalho",
    "title": "Field officer",
    "rank": "Capitao",
    "branch": "Portuguese Garrison",
    "slot": "field_officer",
    "war": 64,
    "int": 43,
    "pol": 37,
    "chr": 37,
    "personality": "cautious",
    "bio": "Fictional Field officer of Macau, posted at taipa (mo_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mo.taipa"
  }
])
});

export const TAIWAN_REGION = land({
  "id": "tw",
  "name": "Taiwan",
  "country": "TW",
  "bbox": {
    "minLon": 117.57,
    "maxLon": 122.5,
    "minLat": 21.88,
    "maxLat": 26.91
  },
  "notes": "Atlas only. The Republic of China, not a PRC province. Taipei and Kaohsiung are special municipalities. Taiwan Province keeps its 1980s counties. Kinmen and Lienchiang are ROC-held Fujian, reached by sea. Penghu is reached by sea. The Taiwan Strait is a sea lane, not a road. Occupied and off the week-0 march.",
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
      "id": "TW-TP",
      "name": "Taipei",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "TW-KH",
      "name": "Kaohsiung",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "TW-CG",
      "name": "Changhua",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-CY",
      "name": "Chiayi",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-HS",
      "name": "Hsinchu",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-HL",
      "name": "Hualien",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-YL",
      "name": "Yilan",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-KC",
      "name": "Kaohsiung County",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-MI",
      "name": "Miaoli",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-NT",
      "name": "Nantou",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-PH",
      "name": "Penghu",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-PT",
      "name": "Pingtung",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-TG",
      "name": "Taichung",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-TN",
      "name": "Tainan",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-TC",
      "name": "Taipei County",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-TT",
      "name": "Taitung",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-TY",
      "name": "Taoyuan",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-YU",
      "name": "Yunlin",
      "kind": "county",
      "group": null
    },
    {
      "id": "TW-KM",
      "name": "Kinmen",
      "kind": "county",
      "group": "Fujian (ROC-held)"
    },
    {
      "id": "TW-LK",
      "name": "Lienchiang",
      "kind": "county",
      "group": "Fujian (ROC-held)"
    }
  ],
  "cities": [
    [
      "taipei",
      "Taipei",
      "TW-TP",
      25.03,
      121.57,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "kaohsiung",
      "Kaohsiung",
      "TW-KH",
      22.63,
      120.3,
      "capital",
      [
        "port",
        "steel",
        "fisheries"
      ]
    ],
    [
      "changhua",
      "Changhua",
      "TW-CG",
      24.07,
      120.54,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "chiayi",
      "Chiayi",
      "TW-CY",
      23.48,
      120.45,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "hsinchu",
      "Hsinchu",
      "TW-HS",
      24.8,
      120.97,
      "capital",
      [
        "rice",
        "port"
      ]
    ],
    [
      "hualien",
      "Hualien",
      "TW-HL",
      23.98,
      121.61,
      "capital",
      [
        "stone",
        "port"
      ]
    ],
    [
      "yilan",
      "Yilan",
      "TW-YL",
      24.76,
      121.75,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "gangshan",
      "Gangshan",
      "TW-KC",
      22.78,
      120.29,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "miaoli",
      "Miaoli",
      "TW-MI",
      24.56,
      120.82,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nantou",
      "Nantou",
      "TW-NT",
      23.92,
      120.68,
      "capital",
      [
        "rice",
        "hydro"
      ]
    ],
    [
      "magong",
      "Magong",
      "TW-PH",
      23.57,
      119.58,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "pingtung",
      "Pingtung",
      "TW-PT",
      22.68,
      120.49,
      "capital",
      [
        "rice",
        "sugarcane"
      ]
    ],
    [
      "taichung",
      "Taichung",
      "TW-TG",
      24.15,
      120.67,
      "capital",
      [
        "rice",
        "administration"
      ]
    ],
    [
      "tainan",
      "Tainan",
      "TW-TN",
      22.99,
      120.21,
      "capital",
      [
        "rice",
        "salt"
      ]
    ],
    [
      "banqiao",
      "Banqiao",
      "TW-TC",
      25.01,
      121.46,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "taitung",
      "Taitung",
      "TW-TT",
      22.76,
      121.14,
      "capital",
      [
        "fisheries",
        "sugarcane"
      ]
    ],
    [
      "taoyuan",
      "Taoyuan",
      "TW-TY",
      24.99,
      121.31,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "douliu",
      "Douliu",
      "TW-YU",
      23.71,
      120.54,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "jincheng",
      "Jincheng",
      "TW-KM",
      24.44,
      118.32,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "nangan",
      "Nangan",
      "TW-LK",
      26.16,
      119.93,
      "capital",
      [
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "kaohsiung",
      "magong",
      "sea",
      "Penghu channel"
    ],
    [
      "tainan",
      "jincheng",
      "sea",
      "Taiwan Strait"
    ],
    [
      "taipei",
      "nangan",
      "sea",
      "Taiwan Strait"
    ],
    [
      "taipei",
      "banqiao",
      "road",
      "National road"
    ],
    [
      "kaohsiung",
      "gangshan",
      "road",
      "National road"
    ],
    [
      "banqiao",
      "taoyuan",
      "road",
      "National road"
    ],
    [
      "changhua",
      "taichung",
      "road",
      "National road"
    ],
    [
      "kaohsiung",
      "pingtung",
      "road",
      "National road"
    ],
    [
      "changhua",
      "nantou",
      "road",
      "National road"
    ],
    [
      "gangshan",
      "tainan",
      "road",
      "National road"
    ],
    [
      "chiayi",
      "douliu",
      "road",
      "National road"
    ],
    [
      "nantou",
      "douliu",
      "road",
      "National road"
    ],
    [
      "hsinchu",
      "miaoli",
      "road",
      "National road"
    ],
    [
      "taipei",
      "yilan",
      "road",
      "National road"
    ],
    [
      "hsinchu",
      "taoyuan",
      "road",
      "National road"
    ],
    [
      "miaoli",
      "taichung",
      "road",
      "National road"
    ],
    [
      "chiayi",
      "tainan",
      "road",
      "National road"
    ],
    [
      "pingtung",
      "taitung",
      "road",
      "National road"
    ],
    [
      "hualien",
      "yilan",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "tw_0",
    "name": "Alden Chen",
    "title": "President",
    "rank": "President",
    "branch": "Republic of China Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Taiwan, posted at taipei (tw_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "tw.taipei"
  },
  {
    "id": "tw_1",
    "name": "Bram Lin",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Republic of China Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Taiwan, posted at kaohsiung (tw_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "tw.kaohsiung"
  },
  {
    "id": "tw_2",
    "name": "Corin Huang",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Republic of China Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Taiwan, posted at changhua (tw_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "tw.changhua"
  },
  {
    "id": "tw_3",
    "name": "Davin Chang",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Republic of China Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Taiwan, posted at chiayi (tw_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "tw.chiayi"
  },
  {
    "id": "tw_4",
    "name": "Elric Wu",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Republic of China Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Taiwan, posted at hsinchu (tw_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "tw.hsinchu"
  },
  {
    "id": "tw_5",
    "name": "Fenn Tsai",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Republic of China Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Taiwan, posted at hualien (tw_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "tw.hualien"
  }
])
});

export const MONGOLIA_REGION = land({
  "id": "mn",
  "name": "Mongolia",
  "country": "MN",
  "bbox": {
    "minLon": 89.21,
    "maxLon": 115.29,
    "minLat": 42.82,
    "maxLat": 50.98
  },
  "notes": "Atlas only. The Mongolian People's Republic, Soviet-aligned. Eighteen aimags plus Ulan Bator. Govisumber and Orkhon are 1994 and are not split; Erdenet stays in Bulgan and Darkhan stays in Selenge. The Trans-Mongolian is rail from Sukhbaatar through Ulan Bator and Sainshand to Zamyn-Uud, and that rail is not also a road. Wool, cattle, coal, and copper. Occupied and off the week-0 march.",
  "defaultBiome": "steppe",
  "climate": {
    "_default": {
      "sun": 3,
      "weather": 2
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "MN-UB",
      "name": "Ulan Bator",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "MN-AR",
      "name": "Arkhangai",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-BO",
      "name": "Bayan-Olgii",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-BH",
      "name": "Bayankhongor",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-BU",
      "name": "Bulgan",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-DO",
      "name": "Dornod",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-DG",
      "name": "Dornogovi",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-DU",
      "name": "Dundgovi",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-GA",
      "name": "Govi-Altai",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-KH",
      "name": "Khentii",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-HO",
      "name": "Khovd",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-HG",
      "name": "Khovsgol",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-OG",
      "name": "Omnogovi",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-OH",
      "name": "Ovorkhangai",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-SE",
      "name": "Selenge",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-SU",
      "name": "Sukhbaatar",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-TO",
      "name": "Tov",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-UV",
      "name": "Uvs",
      "kind": "aimag",
      "group": null
    },
    {
      "id": "MN-ZA",
      "name": "Zavkhan",
      "kind": "aimag",
      "group": null
    }
  ],
  "cities": [
    [
      "ulaanbaatar",
      "Ulan Bator",
      "MN-UB",
      47.92,
      106.92,
      "capital",
      [
        "administration",
        "coal"
      ]
    ],
    [
      "tsetserleg",
      "Tsetserleg",
      "MN-AR",
      47.48,
      101.45,
      "capital",
      [
        "wool",
        "cattle"
      ]
    ],
    [
      "olgii",
      "Olgii",
      "MN-BO",
      48.97,
      89.96,
      "capital",
      [
        "wool",
        "cattle"
      ]
    ],
    [
      "bayankhongor",
      "Bayankhongor",
      "MN-BH",
      46.19,
      100.72,
      "capital",
      [
        "wool"
      ]
    ],
    [
      "bulgan",
      "Bulgan",
      "MN-BU",
      48.81,
      103.53,
      "capital",
      [
        "wool",
        "cattle"
      ]
    ],
    [
      "choibalsan",
      "Choibalsan",
      "MN-DO",
      48.07,
      114.54,
      "capital",
      [
        "coal",
        "cattle"
      ]
    ],
    [
      "sainshand",
      "Sainshand",
      "MN-DG",
      44.89,
      110.14,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "mandalgovi",
      "Mandalgovi",
      "MN-DU",
      45.76,
      106.27,
      "capital",
      [
        "wool"
      ]
    ],
    [
      "altai",
      "Altai",
      "MN-GA",
      46.37,
      96.26,
      "capital",
      [
        "wool"
      ]
    ],
    [
      "ondorkhaan",
      "Ondorkhaan",
      "MN-KH",
      47.32,
      110.66,
      "capital",
      [
        "timber",
        "cattle"
      ]
    ],
    [
      "khovd",
      "Khovd",
      "MN-HO",
      48.01,
      91.64,
      "capital",
      [
        "wool"
      ]
    ],
    [
      "moron",
      "Moron",
      "MN-HG",
      49.63,
      100.16,
      "capital",
      [
        "timber",
        "wool"
      ]
    ],
    [
      "dalanzadgad",
      "Dalanzadgad",
      "MN-OG",
      43.57,
      104.43,
      "capital",
      [
        "coal",
        "wool"
      ]
    ],
    [
      "arvaikheer",
      "Arvaikheer",
      "MN-OH",
      46.27,
      102.78,
      "capital",
      [
        "wool"
      ]
    ],
    [
      "sukhbaatar",
      "Sukhbaatar",
      "MN-SE",
      50.23,
      106.21,
      "capital",
      [
        "wheat",
        "timber"
      ]
    ],
    [
      "baruun_urt",
      "Baruun-Urt",
      "MN-SU",
      46.68,
      113.28,
      "capital",
      [
        "coal",
        "cattle"
      ]
    ],
    [
      "zuunmod",
      "Zuunmod",
      "MN-TO",
      47.71,
      106.95,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "ulaangom",
      "Ulaangom",
      "MN-UV",
      49.98,
      92.07,
      "capital",
      [
        "wool",
        "cattle"
      ]
    ],
    [
      "uliastai",
      "Uliastai",
      "MN-ZA",
      47.74,
      96.84,
      "capital",
      [
        "wool"
      ]
    ],
    [
      "erdenet",
      "Erdenet",
      "MN-BU",
      49.03,
      104.04,
      "city",
      [
        "copper"
      ]
    ],
    [
      "darkhan",
      "Darkhan",
      "MN-SE",
      49.49,
      105.92,
      "city",
      [
        "steel",
        "coal"
      ]
    ],
    [
      "zamyn_uud",
      "Zamyn-Uud",
      "MN-DG",
      43.72,
      111.9,
      "city",
      [
        "coal"
      ]
    ]
  ],
  "links": [
    [
      "sukhbaatar",
      "ulaanbaatar",
      "rail",
      "Trans-Mongolian"
    ],
    [
      "ulaanbaatar",
      "sainshand",
      "rail",
      "Trans-Mongolian"
    ],
    [
      "sainshand",
      "zamyn_uud",
      "rail",
      "Trans-Mongolian"
    ],
    [
      "ulaanbaatar",
      "zuunmod",
      "road",
      "National road"
    ],
    [
      "bulgan",
      "erdenet",
      "road",
      "National road"
    ],
    [
      "sukhbaatar",
      "darkhan",
      "road",
      "National road"
    ],
    [
      "tsetserleg",
      "bayankhongor",
      "road",
      "National road"
    ],
    [
      "altai",
      "uliastai",
      "road",
      "National road"
    ],
    [
      "tsetserleg",
      "arvaikheer",
      "road",
      "National road"
    ],
    [
      "choibalsan",
      "baruun_urt",
      "road",
      "National road"
    ],
    [
      "olgii",
      "khovd",
      "road",
      "National road"
    ],
    [
      "erdenet",
      "darkhan",
      "road",
      "National road"
    ],
    [
      "khovd",
      "ulaangom",
      "road",
      "National road"
    ],
    [
      "mandalgovi",
      "zuunmod",
      "road",
      "National road"
    ],
    [
      "tsetserleg",
      "bulgan",
      "road",
      "National road"
    ],
    [
      "sainshand",
      "ondorkhaan",
      "road",
      "National road"
    ],
    [
      "tsetserleg",
      "moron",
      "road",
      "National road"
    ],
    [
      "ondorkhaan",
      "baruun_urt",
      "road",
      "National road"
    ],
    [
      "mandalgovi",
      "dalanzadgad",
      "road",
      "National road"
    ],
    [
      "moron",
      "uliastai",
      "road",
      "National road"
    ],
    [
      "altai",
      "khovd",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "mn_0",
    "name": "Alden Ganbaatar",
    "title": "President",
    "rank": "President",
    "branch": "Mongolian People's Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Mongolia, posted at ulaanbaatar (mn_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mn.ulaanbaatar"
  },
  {
    "id": "mn_1",
    "name": "Bram Sukhbaatar",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Mongolian People's Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Mongolia, posted at tsetserleg (mn_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mn.tsetserleg"
  },
  {
    "id": "mn_2",
    "name": "Corin Dorj",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Mongolian People's Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Mongolia, posted at olgii (mn_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mn.olgii"
  },
  {
    "id": "mn_3",
    "name": "Gareth Belford",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Mongolian People's Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Mongolia, posted at bayankhongor (mn_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mn.bayankhongor"
  },
  {
    "id": "mn_4",
    "name": "Elric Altangerel",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Mongolian People's Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Mongolia, posted at bulgan (mn_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mn.bulgan"
  },
  {
    "id": "mn_5",
    "name": "Fenn Chimed",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Mongolian People's Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Mongolia, posted at choibalsan (mn_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mn.choibalsan"
  }
])
});

export const NORTH_KOREA_REGION = land({
  "id": "kp",
  "name": "North Korea",
  "country": "KP",
  "bbox": {
    "minLon": 123.65,
    "maxLon": 130.53,
    "minLat": 37.22,
    "maxLat": 42.55
  },
  "notes": "Atlas only. Nine provinces plus Pyongyang. Kaesong is pinned in South Hwanghae so the Demilitarized Zone can be marked; it is a trail at Panmunjom, not a road. The Yalu crossing to Dandong is rail. Chongjin meets Vladivostok on the Sea of Japan. This is not the campaign desk far_korea. Coal, steel, and iron. Occupied and off the week-0 march.",
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
      "id": "KP-PY",
      "name": "Pyongyang",
      "kind": "city",
      "group": null
    },
    {
      "id": "KP-SP",
      "name": "South Pyongan",
      "kind": "province",
      "group": null
    },
    {
      "id": "KP-NP",
      "name": "North Pyongan",
      "kind": "province",
      "group": null
    },
    {
      "id": "KP-CG",
      "name": "Chagang",
      "kind": "province",
      "group": null
    },
    {
      "id": "KP-SH",
      "name": "South Hwanghae",
      "kind": "province",
      "group": null
    },
    {
      "id": "KP-NH",
      "name": "North Hwanghae",
      "kind": "province",
      "group": null
    },
    {
      "id": "KP-KW",
      "name": "Kangwon",
      "kind": "province",
      "group": null
    },
    {
      "id": "KP-HG",
      "name": "South Hamgyong",
      "kind": "province",
      "group": null
    },
    {
      "id": "KP-HN",
      "name": "North Hamgyong",
      "kind": "province",
      "group": null
    },
    {
      "id": "KP-RG",
      "name": "Ryanggang",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "pyongyang",
      "Pyongyang",
      "KP-PY",
      39.03,
      125.75,
      "capital",
      [
        "administration",
        "coal"
      ]
    ],
    [
      "pyongsong",
      "Pyongsong",
      "KP-SP",
      39.25,
      125.86,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "sinuiju",
      "Sinuiju",
      "KP-NP",
      40.1,
      124.4,
      "capital",
      [
        "coal",
        "port"
      ]
    ],
    [
      "kanggye",
      "Kanggye",
      "KP-CG",
      40.97,
      126.59,
      "capital",
      [
        "timber",
        "hydro"
      ]
    ],
    [
      "haeju",
      "Haeju",
      "KP-SH",
      38.04,
      125.71,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "sariwon",
      "Sariwon",
      "KP-NH",
      38.51,
      125.76,
      "capital",
      [
        "rice",
        "coal"
      ]
    ],
    [
      "wonsan",
      "Wonsan",
      "KP-KW",
      39.15,
      127.44,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "hamhung",
      "Hamhung",
      "KP-HG",
      39.92,
      127.54,
      "capital",
      [
        "steel",
        "coal"
      ]
    ],
    [
      "chongjin",
      "Chongjin",
      "KP-HN",
      41.8,
      129.78,
      "capital",
      [
        "steel",
        "iron",
        "port"
      ]
    ],
    [
      "hyesan",
      "Hyesan",
      "KP-RG",
      41.39,
      128.17,
      "capital",
      [
        "timber",
        "copper"
      ]
    ],
    [
      "kaesong",
      "Kaesong",
      "KP-SH",
      37.97,
      126.55,
      "city",
      [
        "rice"
      ]
    ]
  ],
  "links": [
    [
      "pyongyang",
      "pyongsong",
      "road",
      "National road"
    ],
    [
      "haeju",
      "sariwon",
      "road",
      "National road"
    ],
    [
      "pyongyang",
      "sariwon",
      "road",
      "National road"
    ],
    [
      "wonsan",
      "hamhung",
      "road",
      "National road"
    ],
    [
      "haeju",
      "kaesong",
      "road",
      "National road"
    ],
    [
      "kanggye",
      "hamhung",
      "road",
      "National road"
    ],
    [
      "wonsan",
      "kaesong",
      "road",
      "National road"
    ],
    [
      "hamhung",
      "hyesan",
      "road",
      "National road"
    ],
    [
      "chongjin",
      "hyesan",
      "road",
      "National road"
    ],
    [
      "pyongsong",
      "sinuiju",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "kp_0",
    "name": "Chol Pak",
    "title": "President",
    "rank": "President",
    "branch": "Korean People's Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of North Korea, posted at pyongyang (kp_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kp.pyongyang"
  },
  {
    "id": "kp_1",
    "name": "Myong Ri",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Korean People's Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of North Korea, posted at pyongsong (kp_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kp.pyongsong"
  },
  {
    "id": "kp_2",
    "name": "Guk Choe",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Korean People's Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of North Korea, posted at sinuiju (kp_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kp.sinuiju"
  },
  {
    "id": "kp_3",
    "name": "Il Kang",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Korean People's Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of North Korea, posted at kanggye (kp_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kp.kanggye"
  },
  {
    "id": "kp_4",
    "name": "Song Hwang",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Korean People's Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of North Korea, posted at haeju (kp_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kp.haeju"
  }
])
});

export const SOUTH_KOREA_REGION = land({
  "id": "kr",
  "name": "South Korea",
  "country": "KR",
  "bbox": {
    "minLon": 125.64,
    "maxLon": 129.83,
    "minLat": 32.75,
    "maxLat": 38.63
  },
  "notes": "Atlas only. Provinces of the 1980s plus the special cities Seoul, Pusan, Taegu, Inchon, and Kwangju. Taejon stays inside South Chungcheong; it became a direct city on 1 January 1989. Jeju is reached by sea. US forces are a note, not a separate territory. The Korea Strait to Fukuoka is a sea lane. This is not the campaign desk kr_inland. Occupied and off the week-0 march.",
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
      "id": "KR-SU",
      "name": "Seoul",
      "kind": "city",
      "group": null
    },
    {
      "id": "KR-PU",
      "name": "Pusan",
      "kind": "city",
      "group": null
    },
    {
      "id": "KR-TG",
      "name": "Taegu",
      "kind": "city",
      "group": null
    },
    {
      "id": "KR-IC",
      "name": "Inchon",
      "kind": "city",
      "group": null
    },
    {
      "id": "KR-KJ",
      "name": "Kwangju",
      "kind": "city",
      "group": null
    },
    {
      "id": "KR-GG",
      "name": "Gyeonggi",
      "kind": "province",
      "group": null
    },
    {
      "id": "KR-GW",
      "name": "Gangwon",
      "kind": "province",
      "group": null
    },
    {
      "id": "KR-NC",
      "name": "North Chungcheong",
      "kind": "province",
      "group": null
    },
    {
      "id": "KR-SC",
      "name": "South Chungcheong",
      "kind": "province",
      "group": null
    },
    {
      "id": "KR-NJ",
      "name": "North Jeolla",
      "kind": "province",
      "group": null
    },
    {
      "id": "KR-SJ",
      "name": "South Jeolla",
      "kind": "province",
      "group": null
    },
    {
      "id": "KR-NG",
      "name": "North Gyeongsang",
      "kind": "province",
      "group": null
    },
    {
      "id": "KR-SG",
      "name": "South Gyeongsang",
      "kind": "province",
      "group": null
    },
    {
      "id": "KR-JJ",
      "name": "Jeju",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "seoul",
      "Seoul",
      "KR-SU",
      37.57,
      126.98,
      "capital",
      [
        "administration",
        "steel"
      ]
    ],
    [
      "busan",
      "Pusan",
      "KR-PU",
      35.18,
      129.08,
      "capital",
      [
        "port",
        "steel"
      ]
    ],
    [
      "daegu",
      "Taegu",
      "KR-TG",
      35.87,
      128.6,
      "capital",
      [
        "steel",
        "administration"
      ]
    ],
    [
      "incheon",
      "Inchon",
      "KR-IC",
      37.46,
      126.71,
      "capital",
      [
        "port",
        "steel"
      ]
    ],
    [
      "gwangju",
      "Kwangju",
      "KR-KJ",
      35.16,
      126.85,
      "capital",
      [
        "administration",
        "rice"
      ]
    ],
    [
      "suwon",
      "Suwon",
      "KR-GG",
      37.26,
      127.03,
      "capital",
      [
        "rice",
        "administration"
      ]
    ],
    [
      "chuncheon",
      "Chuncheon",
      "KR-GW",
      37.88,
      127.73,
      "capital",
      [
        "timber",
        "hydro"
      ]
    ],
    [
      "cheongju",
      "Cheongju",
      "KR-NC",
      36.64,
      127.49,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "daejeon",
      "Taejon",
      "KR-SC",
      36.35,
      127.38,
      "capital",
      [
        "administration",
        "rice"
      ]
    ],
    [
      "jeonju",
      "Jeonju",
      "KR-NJ",
      35.82,
      127.15,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "mokpo",
      "Mokpo",
      "KR-SJ",
      34.81,
      126.39,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "andong",
      "Andong",
      "KR-NG",
      36.57,
      128.73,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "changwon",
      "Changwon",
      "KR-SG",
      35.23,
      128.68,
      "capital",
      [
        "steel",
        "port"
      ]
    ],
    [
      "jeju",
      "Jeju",
      "KR-JJ",
      33.5,
      126.53,
      "capital",
      [
        "citrus",
        "fisheries"
      ]
    ]
  ],
  "links": [
    [
      "mokpo",
      "jeju",
      "sea",
      "Jeju Strait"
    ],
    [
      "seoul",
      "incheon",
      "road",
      "National road"
    ],
    [
      "cheongju",
      "daejeon",
      "road",
      "National road"
    ],
    [
      "seoul",
      "suwon",
      "road",
      "National road"
    ],
    [
      "busan",
      "changwon",
      "road",
      "National road"
    ],
    [
      "daejeon",
      "jeonju",
      "road",
      "National road"
    ],
    [
      "gwangju",
      "mokpo",
      "road",
      "National road"
    ],
    [
      "daegu",
      "changwon",
      "road",
      "National road"
    ],
    [
      "daegu",
      "andong",
      "road",
      "National road"
    ],
    [
      "gwangju",
      "jeonju",
      "road",
      "National road"
    ],
    [
      "suwon",
      "cheongju",
      "road",
      "National road"
    ],
    [
      "seoul",
      "chuncheon",
      "road",
      "National road"
    ],
    [
      "cheongju",
      "andong",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "kr_0",
    "name": "Minjae Choi",
    "title": "President",
    "rank": "President",
    "branch": "Republic of Korea Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of South Korea, posted at seoul (kr_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kr.seoul"
  },
  {
    "id": "kr_1",
    "name": "Jisoo Jung",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Republic of Korea Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of South Korea, posted at busan (kr_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kr.busan"
  },
  {
    "id": "kr_2",
    "name": "Hyun Han",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Republic of Korea Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of South Korea, posted at daegu (kr_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kr.daegu"
  },
  {
    "id": "kr_3",
    "name": "Taeyang Yoon",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Republic of Korea Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of South Korea, posted at incheon (kr_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kr.incheon"
  },
  {
    "id": "kr_4",
    "name": "Seojun Jang",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Republic of Korea Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of South Korea, posted at gwangju (kr_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kr.gwangju"
  }
])
});

export const JAPAN_REGION = land({
  "id": "jp",
  "name": "Japan",
  "country": "JP",
  "bbox": {
    "minLon": 126.93,
    "maxLon": 142.1,
    "minLat": 25.46,
    "maxLat": 43.81
  },
  "notes": "Atlas only. All 47 prefectures. Saitama is seated at Urawa. Okinawa is marked for US bases at Kadena and Futenma and is reached by sea from Kagoshima. The Seikan Tunnel is rail from March 1988; before that the crossing was a ferry, and the pair is not also a road. The Seto Ohashi is rail from 1988. The Tokaido trunk is rail. The Kurils stay Soviet. Autos are Nagoya. Occupied and off the week-0 march.",
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
      "id": "JP-HKD",
      "name": "Hokkaido",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-AOM",
      "name": "Aomori",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-IWT",
      "name": "Iwate",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-MYG",
      "name": "Miyagi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-AKT",
      "name": "Akita",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-YGT",
      "name": "Yamagata",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-FKS",
      "name": "Fukushima",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-IBR",
      "name": "Ibaraki",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-TCG",
      "name": "Tochigi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-GNM",
      "name": "Gunma",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-STM",
      "name": "Saitama",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-CHB",
      "name": "Chiba",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-TKY",
      "name": "Tokyo",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-KNG",
      "name": "Kanagawa",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-NIG",
      "name": "Niigata",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-TYM",
      "name": "Toyama",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-ISK",
      "name": "Ishikawa",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-FKI",
      "name": "Fukui",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-YMN",
      "name": "Yamanashi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-NGN",
      "name": "Nagano",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-GIF",
      "name": "Gifu",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-SZO",
      "name": "Shizuoka",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-AIC",
      "name": "Aichi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-MIE",
      "name": "Mie",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-SHG",
      "name": "Shiga",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-KYT",
      "name": "Kyoto",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-OSK",
      "name": "Osaka",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-HYG",
      "name": "Hyogo",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-NRA",
      "name": "Nara",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-WKY",
      "name": "Wakayama",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-TTR",
      "name": "Tottori",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-SMN",
      "name": "Shimane",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-OKY",
      "name": "Okayama",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-HRS",
      "name": "Hiroshima",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-YMG",
      "name": "Yamaguchi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-TKS",
      "name": "Tokushima",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-KGW",
      "name": "Kagawa",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-EHM",
      "name": "Ehime",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-KCH",
      "name": "Kochi",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-FKO",
      "name": "Fukuoka",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-SAG",
      "name": "Saga",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-NGS",
      "name": "Nagasaki",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-KMM",
      "name": "Kumamoto",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-OIT",
      "name": "Oita",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-MYZ",
      "name": "Miyazaki",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-KGS",
      "name": "Kagoshima",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "JP-OKN",
      "name": "Okinawa",
      "kind": "prefecture",
      "group": "US bases"
    }
  ],
  "cities": [
    [
      "sapporo",
      "Sapporo",
      "JP-HKD",
      43.06,
      141.35,
      "capital",
      [
        "administration",
        "fisheries",
        "coal"
      ]
    ],
    [
      "aomori",
      "Aomori",
      "JP-AOM",
      40.82,
      140.74,
      "capital",
      [
        "apples",
        "fisheries"
      ]
    ],
    [
      "morioka",
      "Morioka",
      "JP-IWT",
      39.7,
      141.15,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "sendai",
      "Sendai",
      "JP-MYG",
      38.27,
      140.87,
      "capital",
      [
        "rice",
        "port"
      ]
    ],
    [
      "akita",
      "Akita",
      "JP-AKT",
      39.72,
      140.1,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "yamagata",
      "Yamagata",
      "JP-YGT",
      38.26,
      140.34,
      "capital",
      [
        "rice",
        "apples"
      ]
    ],
    [
      "fukushima",
      "Fukushima",
      "JP-FKS",
      37.75,
      140.47,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "mito",
      "Mito",
      "JP-IBR",
      36.37,
      140.47,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "utsunomiya",
      "Utsunomiya",
      "JP-TCG",
      36.56,
      139.88,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "maebashi",
      "Maebashi",
      "JP-GNM",
      36.39,
      139.06,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "urawa",
      "Urawa",
      "JP-STM",
      35.86,
      139.65,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "chiba",
      "Chiba",
      "JP-CHB",
      35.61,
      140.12,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "tokyo",
      "Tokyo",
      "JP-TKY",
      35.68,
      139.69,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "yokohama",
      "Yokohama",
      "JP-KNG",
      35.44,
      139.64,
      "capital",
      [
        "port",
        "steel"
      ]
    ],
    [
      "niigata",
      "Niigata",
      "JP-NIG",
      37.92,
      139.04,
      "capital",
      [
        "rice",
        "port"
      ]
    ],
    [
      "toyama",
      "Toyama",
      "JP-TYM",
      36.7,
      137.21,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kanazawa",
      "Kanazawa",
      "JP-ISK",
      36.56,
      136.66,
      "capital",
      [
        "rice",
        "port"
      ]
    ],
    [
      "fukui",
      "Fukui",
      "JP-FKI",
      36.07,
      136.22,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kofu",
      "Kofu",
      "JP-YMN",
      35.66,
      138.57,
      "capital",
      [
        "grapes"
      ]
    ],
    [
      "nagano",
      "Nagano",
      "JP-NGN",
      36.65,
      138.18,
      "capital",
      [
        "apples"
      ]
    ],
    [
      "gifu",
      "Gifu",
      "JP-GIF",
      35.42,
      136.76,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "shizuoka",
      "Shizuoka",
      "JP-SZO",
      34.98,
      138.38,
      "capital",
      [
        "citrus",
        "port"
      ]
    ],
    [
      "nagoya",
      "Nagoya",
      "JP-AIC",
      35.18,
      136.91,
      "capital",
      [
        "autos",
        "port",
        "steel"
      ]
    ],
    [
      "tsu",
      "Tsu",
      "JP-MIE",
      34.73,
      136.51,
      "capital",
      [
        "rice",
        "port"
      ]
    ],
    [
      "otsu",
      "Otsu",
      "JP-SHG",
      35.0,
      135.87,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kyoto",
      "Kyoto",
      "JP-KYT",
      35.01,
      135.77,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "osaka",
      "Osaka",
      "JP-OSK",
      34.69,
      135.5,
      "capital",
      [
        "port",
        "steel"
      ]
    ],
    [
      "kobe",
      "Kobe",
      "JP-HYG",
      34.69,
      135.2,
      "capital",
      [
        "port",
        "steel"
      ]
    ],
    [
      "nara",
      "Nara",
      "JP-NRA",
      34.69,
      135.8,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "wakayama",
      "Wakayama",
      "JP-WKY",
      34.23,
      135.17,
      "capital",
      [
        "citrus",
        "fisheries"
      ]
    ],
    [
      "tottori",
      "Tottori",
      "JP-TTR",
      35.5,
      134.24,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "matsue",
      "Matsue",
      "JP-SMN",
      35.47,
      133.05,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "okayama",
      "Okayama",
      "JP-OKY",
      34.66,
      133.93,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "hiroshima",
      "Hiroshima",
      "JP-HRS",
      34.39,
      132.46,
      "capital",
      [
        "autos",
        "steel",
        "port"
      ]
    ],
    [
      "yamaguchi",
      "Yamaguchi",
      "JP-YMG",
      34.19,
      131.47,
      "capital",
      [
        "coal"
      ]
    ],
    [
      "tokushima",
      "Tokushima",
      "JP-TKS",
      34.07,
      134.55,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "takamatsu",
      "Takamatsu",
      "JP-KGW",
      34.34,
      134.04,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "matsuyama",
      "Matsuyama",
      "JP-EHM",
      33.84,
      132.77,
      "capital",
      [
        "citrus"
      ]
    ],
    [
      "kochi",
      "Kochi",
      "JP-KCH",
      33.56,
      133.53,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "fukuoka",
      "Fukuoka",
      "JP-FKO",
      33.59,
      130.4,
      "capital",
      [
        "port",
        "steel"
      ]
    ],
    [
      "saga",
      "Saga",
      "JP-SAG",
      33.26,
      130.3,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nagasaki",
      "Nagasaki",
      "JP-NGS",
      32.75,
      129.88,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "kumamoto",
      "Kumamoto",
      "JP-KMM",
      32.8,
      130.71,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "oita",
      "Oita",
      "JP-OIT",
      33.24,
      131.61,
      "capital",
      [
        "steel"
      ]
    ],
    [
      "miyazaki",
      "Miyazaki",
      "JP-MYZ",
      31.91,
      131.42,
      "capital",
      [
        "vegetables"
      ]
    ],
    [
      "kagoshima",
      "Kagoshima",
      "JP-KGS",
      31.6,
      130.56,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "naha",
      "Naha",
      "JP-OKN",
      26.21,
      127.68,
      "capital",
      [
        "port",
        "administration"
      ]
    ]
  ],
  "links": [
    [
      "aomori",
      "sapporo",
      "rail",
      "Seikan Tunnel (1988)"
    ],
    [
      "okayama",
      "takamatsu",
      "rail",
      "Seto Ohashi (1988)"
    ],
    [
      "yamaguchi",
      "fukuoka",
      "road",
      "Kanmon Tunnel"
    ],
    [
      "tokyo",
      "yokohama",
      "rail",
      "Tokaido"
    ],
    [
      "yokohama",
      "shizuoka",
      "rail",
      "Tokaido"
    ],
    [
      "shizuoka",
      "nagoya",
      "rail",
      "Tokaido"
    ],
    [
      "nagoya",
      "kyoto",
      "rail",
      "Tokaido"
    ],
    [
      "kyoto",
      "osaka",
      "rail",
      "Tokaido"
    ],
    [
      "osaka",
      "kobe",
      "rail",
      "Tokaido"
    ],
    [
      "kagoshima",
      "naha",
      "sea",
      "Nansei ferry"
    ],
    [
      "otsu",
      "kyoto",
      "road",
      "National road"
    ],
    [
      "urawa",
      "tokyo",
      "road",
      "National road"
    ],
    [
      "gifu",
      "nagoya",
      "road",
      "National road"
    ],
    [
      "osaka",
      "nara",
      "road",
      "National road"
    ],
    [
      "chiba",
      "tokyo",
      "road",
      "National road"
    ],
    [
      "kobe",
      "wakayama",
      "road",
      "National road"
    ],
    [
      "yamagata",
      "fukushima",
      "road",
      "National road"
    ],
    [
      "sendai",
      "yamagata",
      "road",
      "National road"
    ],
    [
      "toyama",
      "kanazawa",
      "road",
      "National road"
    ],
    [
      "nagoya",
      "tsu",
      "road",
      "National road"
    ],
    [
      "mito",
      "utsunomiya",
      "road",
      "National road"
    ],
    [
      "kanazawa",
      "fukui",
      "road",
      "National road"
    ],
    [
      "kofu",
      "shizuoka",
      "road",
      "National road"
    ],
    [
      "utsunomiya",
      "urawa",
      "road",
      "National road"
    ],
    [
      "maebashi",
      "urawa",
      "road",
      "National road"
    ],
    [
      "fukui",
      "gifu",
      "road",
      "National road"
    ],
    [
      "tottori",
      "okayama",
      "road",
      "National road"
    ],
    [
      "maebashi",
      "nagano",
      "road",
      "National road"
    ],
    [
      "hiroshima",
      "yamaguchi",
      "road",
      "National road"
    ],
    [
      "morioka",
      "akita",
      "road",
      "National road"
    ],
    [
      "tottori",
      "matsue",
      "road",
      "National road"
    ],
    [
      "aomori",
      "morioka",
      "road",
      "National road"
    ],
    [
      "matsue",
      "hiroshima",
      "road",
      "National road"
    ],
    [
      "kobe",
      "tottori",
      "road",
      "National road"
    ],
    [
      "fukushima",
      "utsunomiya",
      "road",
      "National road"
    ],
    [
      "yamagata",
      "niigata",
      "road",
      "National road"
    ],
    [
      "morioka",
      "sendai",
      "road",
      "National road"
    ],
    [
      "fukuoka",
      "saga",
      "road",
      "National road"
    ],
    [
      "saga",
      "kumamoto",
      "road",
      "National road"
    ],
    [
      "saga",
      "nagasaki",
      "road",
      "National road"
    ],
    [
      "miyazaki",
      "kagoshima",
      "road",
      "National road"
    ],
    [
      "kumamoto",
      "oita",
      "road",
      "National road"
    ],
    [
      "kumamoto",
      "miyazaki",
      "road",
      "National road"
    ],
    [
      "tokushima",
      "takamatsu",
      "road",
      "National road"
    ],
    [
      "matsuyama",
      "kochi",
      "road",
      "National road"
    ],
    [
      "takamatsu",
      "kochi",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "jp_0",
    "name": "Haruto Sato",
    "title": "Emperor",
    "rank": "Emperor",
    "branch": "Ground Self-Defense Force",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional Emperor of Japan, posted at sapporo (jp_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "jp.sapporo"
  },
  {
    "id": "jp_1",
    "name": "Daichi Suzuki",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Ground Self-Defense Force",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Japan, posted at aomori (jp_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "jp.aomori"
  },
  {
    "id": "jp_2",
    "name": "Sota Takahashi",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Ground Self-Defense Force",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Japan, posted at morioka (jp_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "jp.morioka"
  },
  {
    "id": "jp_3",
    "name": "Riku Tanaka",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Ground Self-Defense Force",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Japan, posted at sendai (jp_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "jp.sendai"
  },
  {
    "id": "jp_4",
    "name": "Yuto Watanabe",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Ground Self-Defense Force",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Japan, posted at akita (jp_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "jp.akita"
  },
  {
    "id": "jp_5",
    "name": "Naoki Ito",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Ground Self-Defense Force",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Japan, posted at yamagata (jp_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "jp.yamagata"
  },
  {
    "id": "jp_6",
    "name": "Shun Yamamoto",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Ground Self-Defense Force",
    "slot": "front_commander",
    "war": 76,
    "int": 47,
    "pol": 38,
    "chr": 38,
    "personality": "ambitious",
    "bio": "Fictional Front commander of Japan, posted at fukushima (jp_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "jp.fukushima"
  },
  {
    "id": "jp_7",
    "name": "Kaito Nakamura",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Ground Self-Defense Force",
    "slot": "front_commander",
    "war": 79,
    "int": 52,
    "pol": 36,
    "chr": 35,
    "personality": "recluse",
    "bio": "Fictional Front commander of Japan, posted at mito (jp_7). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "jp.mito"
  }
])
});
