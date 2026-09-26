/** Southeast Asia, 1985-89. Burma keeps that name. Cambodia is the PRK. East Timor is occupied. */
import { buildRegion, staff } from "../build-region.js";
function land(spec) {
  const { defaultBiome, climate, biome, ...rest } = spec;
  return buildRegion({ defaultBiome, climate, biome, ...rest });
}

export const VIETNAM_REGION = land({
  "id": "vn",
  "name": "Vietnam",
  "country": "VN",
  "bbox": {
    "minLon": 102.4,
    "maxLon": 109.97,
    "minLat": 8.43,
    "maxLat": 23.57
  },
  "notes": "Atlas only. Merged late-1980s provinces, including Ha Son Binh, Vinh Phu, Nghe Tinh, Binh Tri Thien, Quang Nam-Da Nang, Nghia Binh, Phu Khanh, Gia Lai-Kon Tum, and the Mekong mergers. Binh Tri Thien, Nghia Binh, and Phu Khanh split in 1989; the others split in the 1990s. This sheet keeps the merged names for the whole window. Coal is Quang Ninh. Bach Ho oil is at Vung Tau, late in the window. Coffee is Dac Lac. Highway 1 enters Cambodia. Friendship Pass enters Guangxi. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "VN-HN",
      "name": "Hanoi",
      "kind": "city",
      "group": null
    },
    {
      "id": "VN-HP",
      "name": "Haiphong",
      "kind": "city",
      "group": null
    },
    {
      "id": "VN-HC",
      "name": "Ho Chi Minh City",
      "kind": "city",
      "group": null
    },
    {
      "id": "VN-HB",
      "name": "Ha Son Binh",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-VP",
      "name": "Vinh Phu",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-HT",
      "name": "Ha Tuyen",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-HL",
      "name": "Hoang Lien Son",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-CB",
      "name": "Cao Bang",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-LS",
      "name": "Lang Son",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-BT",
      "name": "Bac Thai",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-QN",
      "name": "Quang Ninh",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-HG",
      "name": "Ha Bac",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-HH",
      "name": "Hai Hung",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-TB",
      "name": "Thai Binh",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-HM",
      "name": "Ha Nam Ninh",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-TH",
      "name": "Thanh Hoa",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-NT",
      "name": "Nghe Tinh",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-B3",
      "name": "Binh Tri Thien",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-QD",
      "name": "Quang Nam-Da Nang",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-NB",
      "name": "Nghia Binh",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-PK",
      "name": "Phu Khanh",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-TU",
      "name": "Thuan Hai",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-GK",
      "name": "Gia Lai-Kon Tum",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-DL",
      "name": "Dac Lac",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-LD",
      "name": "Lam Dong",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-SB",
      "name": "Song Be",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-TN",
      "name": "Tay Ninh",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-DN",
      "name": "Dong Nai",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-LA",
      "name": "Long An",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-TG",
      "name": "Tien Giang",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-BE",
      "name": "Ben Tre",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-DT",
      "name": "Dong Thap",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-AG",
      "name": "An Giang",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-CL",
      "name": "Cuu Long",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-HU",
      "name": "Hau Giang",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-KG",
      "name": "Kien Giang",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-MH",
      "name": "Minh Hai",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-VT",
      "name": "Vung Tau-Con Dao",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-LC",
      "name": "Lai Chau",
      "kind": "province",
      "group": null
    },
    {
      "id": "VN-SL",
      "name": "Son La",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "hanoi",
      "Hanoi",
      "VN-HN",
      21.03,
      105.85,
      "capital",
      [
        "administration",
        "rice"
      ]
    ],
    [
      "haiphong",
      "Haiphong",
      "VN-HP",
      20.84,
      106.69,
      "capital",
      [
        "port",
        "coal"
      ]
    ],
    [
      "ho_chi_minh",
      "Ho Chi Minh City",
      "VN-HC",
      10.82,
      106.63,
      "capital",
      [
        "port",
        "rice"
      ]
    ],
    [
      "ha_dong",
      "Ha Dong",
      "VN-HB",
      20.97,
      105.78,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "viet_tri",
      "Viet Tri",
      "VN-VP",
      21.3,
      105.43,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "ha_giang",
      "Ha Giang",
      "VN-HT",
      22.82,
      104.98,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "lao_cai",
      "Lao Cai",
      "VN-HL",
      22.48,
      103.97,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "cao_bang",
      "Cao Bang",
      "VN-CB",
      22.67,
      106.25,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "lang_son",
      "Lang Son",
      "VN-LS",
      21.85,
      106.76,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "thai_nguyen",
      "Thai Nguyen",
      "VN-BT",
      21.59,
      105.84,
      "capital",
      [
        "steel",
        "coal"
      ]
    ],
    [
      "ha_long",
      "Ha Long",
      "VN-QN",
      20.95,
      107.07,
      "capital",
      [
        "coal",
        "port"
      ]
    ],
    [
      "bac_giang",
      "Bac Giang",
      "VN-HG",
      21.27,
      106.19,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "hai_duong",
      "Hai Duong",
      "VN-HH",
      20.94,
      106.33,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "thai_binh",
      "Thai Binh",
      "VN-TB",
      20.45,
      106.34,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nam_dinh",
      "Nam Dinh",
      "VN-HM",
      20.42,
      106.17,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "thanh_hoa",
      "Thanh Hoa",
      "VN-TH",
      19.81,
      105.78,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "vinh",
      "Vinh",
      "VN-NT",
      18.68,
      105.68,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "hue",
      "Hue",
      "VN-B3",
      16.46,
      107.59,
      "capital",
      [
        "rice",
        "port"
      ]
    ],
    [
      "da_nang",
      "Da Nang",
      "VN-QD",
      16.05,
      108.2,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "quy_nhon",
      "Quy Nhon",
      "VN-NB",
      13.77,
      109.22,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "nha_trang",
      "Nha Trang",
      "VN-PK",
      12.24,
      109.2,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "phan_thiet",
      "Phan Thiet",
      "VN-TU",
      10.93,
      108.1,
      "capital",
      [
        "fisheries",
        "salt"
      ]
    ],
    [
      "pleiku",
      "Pleiku",
      "VN-GK",
      14.0,
      108.0,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "buon_ma_thuot",
      "Buon Ma Thuot",
      "VN-DL",
      12.67,
      108.05,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "da_lat",
      "Da Lat",
      "VN-LD",
      11.94,
      108.44,
      "capital",
      [
        "coffee",
        "vegetables"
      ]
    ],
    [
      "thu_dau_mot",
      "Thu Dau Mot",
      "VN-SB",
      10.98,
      106.65,
      "capital",
      [
        "timber",
        "rice"
      ]
    ],
    [
      "tay_ninh",
      "Tay Ninh",
      "VN-TN",
      11.31,
      106.1,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "bien_hoa",
      "Bien Hoa",
      "VN-DN",
      10.95,
      106.82,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "tan_an",
      "Tan An",
      "VN-LA",
      10.54,
      106.41,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "my_tho",
      "My Tho",
      "VN-TG",
      10.36,
      106.36,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "ben_tre",
      "Ben Tre",
      "VN-BE",
      10.24,
      106.38,
      "capital",
      [
        "rice",
        "vegetables"
      ]
    ],
    [
      "cao_lanh",
      "Cao Lanh",
      "VN-DT",
      10.46,
      105.63,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "long_xuyen",
      "Long Xuyen",
      "VN-AG",
      10.39,
      105.44,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "vinh_long",
      "Vinh Long",
      "VN-CL",
      10.25,
      105.97,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "can_tho",
      "Can Tho",
      "VN-HU",
      10.03,
      105.79,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "rach_gia",
      "Rach Gia",
      "VN-KG",
      10.01,
      105.08,
      "capital",
      [
        "rice",
        "fisheries"
      ]
    ],
    [
      "ca_mau",
      "Ca Mau",
      "VN-MH",
      9.18,
      105.15,
      "capital",
      [
        "rice",
        "fisheries"
      ]
    ],
    [
      "vung_tau",
      "Vung Tau",
      "VN-VT",
      10.35,
      107.08,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "lai_chau",
      "Lai Chau",
      "VN-LC",
      22.07,
      103.15,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "son_la",
      "Son La",
      "VN-SL",
      21.33,
      103.91,
      "capital",
      [
        "timber",
        "coffee"
      ]
    ],
    [
      "dong_ha",
      "Dong Ha",
      "VN-B3",
      16.82,
      107.1,
      "city",
      [
        "rice"
      ]
    ]
  ],
  "links": [
    [
      "hanoi",
      "ha_dong",
      "road",
      "National road"
    ],
    [
      "my_tho",
      "ben_tre",
      "road",
      "National road"
    ],
    [
      "ho_chi_minh",
      "thu_dau_mot",
      "road",
      "National road"
    ],
    [
      "thu_dau_mot",
      "bien_hoa",
      "road",
      "National road"
    ],
    [
      "thai_binh",
      "nam_dinh",
      "road",
      "National road"
    ],
    [
      "tan_an",
      "my_tho",
      "road",
      "National road"
    ],
    [
      "cao_lanh",
      "long_xuyen",
      "road",
      "National road"
    ],
    [
      "vinh_long",
      "can_tho",
      "road",
      "National road"
    ],
    [
      "ho_chi_minh",
      "tan_an",
      "road",
      "National road"
    ],
    [
      "bac_giang",
      "hai_duong",
      "road",
      "National road"
    ],
    [
      "haiphong",
      "hai_duong",
      "road",
      "National road"
    ],
    [
      "haiphong",
      "ha_long",
      "road",
      "National road"
    ],
    [
      "cao_lanh",
      "vinh_long",
      "road",
      "National road"
    ],
    [
      "my_tho",
      "vinh_long",
      "road",
      "National road"
    ],
    [
      "hanoi",
      "bac_giang",
      "road",
      "National road"
    ],
    [
      "thai_nguyen",
      "bac_giang",
      "road",
      "National road"
    ],
    [
      "ha_dong",
      "viet_tri",
      "road",
      "National road"
    ],
    [
      "hai_duong",
      "thai_binh",
      "road",
      "National road"
    ],
    [
      "long_xuyen",
      "rach_gia",
      "road",
      "National road"
    ],
    [
      "hue",
      "dong_ha",
      "road",
      "National road"
    ],
    [
      "thu_dau_mot",
      "tay_ninh",
      "road",
      "National road"
    ],
    [
      "ho_chi_minh",
      "vung_tau",
      "road",
      "National road"
    ],
    [
      "nam_dinh",
      "thanh_hoa",
      "road",
      "National road"
    ],
    [
      "hue",
      "da_nang",
      "road",
      "National road"
    ],
    [
      "lang_son",
      "bac_giang",
      "road",
      "National road"
    ],
    [
      "nha_trang",
      "da_lat",
      "road",
      "National road"
    ],
    [
      "buon_ma_thuot",
      "da_lat",
      "road",
      "National road"
    ],
    [
      "rach_gia",
      "ca_mau",
      "road",
      "National road"
    ],
    [
      "lao_cai",
      "lai_chau",
      "road",
      "National road"
    ],
    [
      "cao_bang",
      "lang_son",
      "road",
      "National road"
    ],
    [
      "lai_chau",
      "son_la",
      "road",
      "National road"
    ],
    [
      "phan_thiet",
      "da_lat",
      "road",
      "National road"
    ],
    [
      "ha_giang",
      "lao_cai",
      "road",
      "National road"
    ],
    [
      "thanh_hoa",
      "vinh",
      "road",
      "National road"
    ],
    [
      "phan_thiet",
      "vung_tau",
      "road",
      "National road"
    ],
    [
      "quy_nhon",
      "pleiku",
      "road",
      "National road"
    ],
    [
      "ha_giang",
      "cao_bang",
      "road",
      "National road"
    ],
    [
      "pleiku",
      "buon_ma_thuot",
      "road",
      "National road"
    ],
    [
      "da_nang",
      "pleiku",
      "road",
      "National road"
    ],
    [
      "vinh",
      "dong_ha",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "vn_0",
    "name": "Duc Tran",
    "title": "President",
    "rank": "President",
    "branch": "Vietnam People's Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Vietnam, posted at hanoi (vn_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "vn.hanoi"
  },
  {
    "id": "vn_1",
    "name": "Hung Le",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Vietnam People's Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Vietnam, posted at haiphong (vn_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "vn.haiphong"
  },
  {
    "id": "vn_2",
    "name": "Quan Pham",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Vietnam People's Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Vietnam, posted at ho chi minh (vn_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "vn.ho_chi_minh"
  },
  {
    "id": "vn_3",
    "name": "Tuan Vu",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Vietnam People's Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Vietnam, posted at ha dong (vn_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "vn.ha_dong"
  },
  {
    "id": "vn_4",
    "name": "Hieu Dang",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Vietnam People's Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Vietnam, posted at viet tri (vn_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "vn.viet_tri"
  },
  {
    "id": "vn_5",
    "name": "Long Bui",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Vietnam People's Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Vietnam, posted at ha giang (vn_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "vn.ha_giang"
  },
  {
    "id": "vn_6",
    "name": "Phuc Do",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Vietnam People's Army",
    "slot": "front_commander",
    "war": 76,
    "int": 47,
    "pol": 38,
    "chr": 38,
    "personality": "ambitious",
    "bio": "Fictional Front commander of Vietnam, posted at lao cai (vn_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "vn.lao_cai"
  },
  {
    "id": "vn_7",
    "name": "Khoa Ngo",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Vietnam People's Army",
    "slot": "front_commander",
    "war": 79,
    "int": 52,
    "pol": 36,
    "chr": 35,
    "personality": "recluse",
    "bio": "Fictional Front commander of Vietnam, posted at cao bang (vn_7). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "vn.cao_bang"
  }
])
});

export const CAMBODIA_REGION = land({
  "id": "kh",
  "name": "Kampuchea (PRK)",
  "country": "KH",
  "bbox": {
    "minLon": 101.81,
    "maxLon": 107.94,
    "minLat": 9.86,
    "maxLat": 14.57
  },
  "notes": "Atlas only. The People's Republic of Kampuchea under Vietnamese occupation. Not a second Khmer Rouge state. Banteay Meanchey and Oddar Meanchey are not split. Battambang and Siem Reap mark the western front. Poipet stays in Battambang. Kampong Som is the port. Rice, fisheries, and timber. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "KH-PP",
      "name": "Phnom Penh",
      "kind": "municipality",
      "group": null
    },
    {
      "id": "KH-KD",
      "name": "Kandal",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-KC",
      "name": "Kampong Cham",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-KN",
      "name": "Kampong Chhnang",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-KS",
      "name": "Kampong Speu",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-KT",
      "name": "Kampong Thom",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-KP",
      "name": "Kampot",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-KM",
      "name": "Kampong Som",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-KK",
      "name": "Koh Kong",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-KR",
      "name": "Kratie",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-MK",
      "name": "Mondulkiri",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-PV",
      "name": "Prey Veng",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-PU",
      "name": "Pursat",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-RK",
      "name": "Ratanakiri",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-SR",
      "name": "Siem Reap",
      "kind": "province",
      "group": "PRK / Vietnamese occupation"
    },
    {
      "id": "KH-PH",
      "name": "Preah Vihear",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-ST",
      "name": "Stung Treng",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-SV",
      "name": "Svay Rieng",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-TK",
      "name": "Takeo",
      "kind": "province",
      "group": null
    },
    {
      "id": "KH-BB",
      "name": "Battambang",
      "kind": "province",
      "group": "PRK / Vietnamese occupation"
    }
  ],
  "cities": [
    [
      "phnom_penh",
      "Phnom Penh",
      "KH-PP",
      11.56,
      104.93,
      "capital",
      [
        "administration",
        "rice"
      ]
    ],
    [
      "ta_khmau",
      "Ta Khmau",
      "KH-KD",
      11.48,
      104.95,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kampong_cham",
      "Kampong Cham",
      "KH-KC",
      12.0,
      105.46,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kampong_chhnang",
      "Kampong Chhnang",
      "KH-KN",
      12.25,
      104.67,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "kampong_speu",
      "Kampong Speu",
      "KH-KS",
      11.45,
      104.52,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kampong_thom",
      "Kampong Thom",
      "KH-KT",
      12.71,
      104.89,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "kampot",
      "Kampot",
      "KH-KP",
      10.61,
      104.18,
      "capital",
      [
        "rice",
        "fisheries"
      ]
    ],
    [
      "kampong_som",
      "Kampong Som",
      "KH-KM",
      10.63,
      103.52,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "koh_kong",
      "Koh Kong",
      "KH-KK",
      11.62,
      102.98,
      "capital",
      [
        "timber",
        "fisheries"
      ]
    ],
    [
      "kratie",
      "Kratie",
      "KH-KR",
      12.49,
      106.02,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "sen_monorom",
      "Sen Monorom",
      "KH-MK",
      12.46,
      107.19,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "prey_veng",
      "Prey Veng",
      "KH-PV",
      11.49,
      105.33,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "pursat",
      "Pursat",
      "KH-PU",
      12.54,
      103.92,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "banlung",
      "Banlung",
      "KH-RK",
      13.74,
      106.99,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "siem_reap",
      "Siem Reap",
      "KH-SR",
      13.36,
      103.86,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "tbeng_meanchey",
      "Tbeng Meanchey",
      "KH-PH",
      13.82,
      104.97,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "stung_treng",
      "Stung Treng",
      "KH-ST",
      13.53,
      105.97,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "svay_rieng",
      "Svay Rieng",
      "KH-SV",
      11.09,
      105.8,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "takeo",
      "Takeo",
      "KH-TK",
      10.99,
      104.78,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "battambang",
      "Battambang",
      "KH-BB",
      13.1,
      103.2,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "poipet",
      "Poipet",
      "KH-BB",
      13.66,
      102.56,
      "city",
      [
        "rice"
      ]
    ]
  ],
  "links": [
    [
      "phnom_penh",
      "ta_khmau",
      "road",
      "National road"
    ],
    [
      "ta_khmau",
      "prey_veng",
      "road",
      "National road"
    ],
    [
      "phnom_penh",
      "kampong_speu",
      "road",
      "National road"
    ],
    [
      "kampong_chhnang",
      "kampong_thom",
      "road",
      "National road"
    ],
    [
      "ta_khmau",
      "takeo",
      "road",
      "National road"
    ],
    [
      "kampong_cham",
      "prey_veng",
      "road",
      "National road"
    ],
    [
      "prey_veng",
      "svay_rieng",
      "road",
      "National road"
    ],
    [
      "kampot",
      "kampong_som",
      "road",
      "National road"
    ],
    [
      "siem_reap",
      "battambang",
      "road",
      "National road"
    ],
    [
      "kampot",
      "takeo",
      "road",
      "National road"
    ],
    [
      "phnom_penh",
      "kampong_chhnang",
      "road",
      "National road"
    ],
    [
      "kampong_cham",
      "kratie",
      "road",
      "National road"
    ],
    [
      "kampong_chhnang",
      "pursat",
      "road",
      "National road"
    ],
    [
      "pursat",
      "siem_reap",
      "road",
      "National road"
    ],
    [
      "battambang",
      "poipet",
      "road",
      "National road"
    ],
    [
      "kratie",
      "stung_treng",
      "road",
      "National road"
    ],
    [
      "tbeng_meanchey",
      "stung_treng",
      "road",
      "National road"
    ],
    [
      "banlung",
      "stung_treng",
      "road",
      "National road"
    ],
    [
      "kampong_som",
      "koh_kong",
      "road",
      "National road"
    ],
    [
      "kratie",
      "sen_monorom",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "kh_0",
    "name": "Alden Chea",
    "title": "President",
    "rank": "President",
    "branch": "Kampuchean People's Revolutionary Armed Forces",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Kampuchea (PRK), posted at phnom penh (kh_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kh.phnom_penh"
  },
  {
    "id": "kh_1",
    "name": "Bram Kim",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Kampuchean People's Revolutionary Armed Forces",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Kampuchea (PRK), posted at ta khmau (kh_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kh.ta_khmau"
  },
  {
    "id": "kh_2",
    "name": "Corin Ouk",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Kampuchean People's Revolutionary Armed Forces",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Kampuchea (PRK), posted at kampong cham (kh_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kh.kampong_cham"
  },
  {
    "id": "kh_3",
    "name": "Davin Meas",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Kampuchean People's Revolutionary Armed Forces",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Kampuchea (PRK), posted at kampong chhnang (kh_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kh.kampong_chhnang"
  },
  {
    "id": "kh_4",
    "name": "Elric Sok",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Kampuchean People's Revolutionary Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Kampuchea (PRK), posted at kampong speu (kh_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kh.kampong_speu"
  },
  {
    "id": "kh_5",
    "name": "Fenn Tep",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Kampuchean People's Revolutionary Armed Forces",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Kampuchea (PRK), posted at kampong thom (kh_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "kh.kampong_thom"
  }
])
});

export const LAOS_REGION = land({
  "id": "la",
  "name": "Laos",
  "country": "LA",
  "bbox": {
    "minLon": 99.66,
    "maxLon": 107.58,
    "minLat": 14.06,
    "maxLat": 22.43
  },
  "notes": "Atlas only. Late-1980s provinces, including Sekong (1984) and Bolikhamxai (1986). Vientiane prefecture is separate from Vientiane province. The Mekong crossing at Nong Khai is a ferry; the Friendship Bridge opens in 1994 and is not a road. Timber, tin, hydro, and coffee. Occupied and off the week-0 march.",
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
      "id": "LA-VT",
      "name": "Vientiane Prefecture",
      "kind": "prefecture",
      "group": null
    },
    {
      "id": "LA-VP",
      "name": "Vientiane",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-AT",
      "name": "Attapeu",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-BK",
      "name": "Bokeo",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-BL",
      "name": "Bolikhamxai",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-CH",
      "name": "Champasak",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-HO",
      "name": "Houaphanh",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-KH",
      "name": "Khammouane",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-LN",
      "name": "Luang Namtha",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-LP",
      "name": "Luang Prabang",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-OU",
      "name": "Oudomxay",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-PH",
      "name": "Phongsaly",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-SL",
      "name": "Salavan",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-SV",
      "name": "Savannakhet",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-SK",
      "name": "Sekong",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-XA",
      "name": "Xaignabouli",
      "kind": "province",
      "group": null
    },
    {
      "id": "LA-XI",
      "name": "Xiangkhouang",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "vientiane",
      "Vientiane",
      "LA-VT",
      17.97,
      102.63,
      "capital",
      [
        "administration",
        "hydro"
      ]
    ],
    [
      "phonhong",
      "Phonhong",
      "LA-VP",
      18.5,
      102.41,
      "capital",
      [
        "hydro",
        "rice"
      ]
    ],
    [
      "attapeu",
      "Attapeu",
      "LA-AT",
      14.81,
      106.83,
      "capital",
      [
        "coffee",
        "timber"
      ]
    ],
    [
      "huay_xai",
      "Huay Xai",
      "LA-BK",
      20.28,
      100.41,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "pakxan",
      "Pakxan",
      "LA-BL",
      18.39,
      103.66,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "pakse",
      "Pakse",
      "LA-CH",
      15.12,
      105.8,
      "capital",
      [
        "coffee",
        "timber"
      ]
    ],
    [
      "xam_neua",
      "Xam Neua",
      "LA-HO",
      20.42,
      104.05,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "thakhek",
      "Thakhek",
      "LA-KH",
      17.41,
      104.83,
      "capital",
      [
        "tin",
        "timber"
      ]
    ],
    [
      "luang_namtha",
      "Luang Namtha",
      "LA-LN",
      20.95,
      101.4,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "luang_prabang",
      "Luang Prabang",
      "LA-LP",
      19.89,
      102.14,
      "capital",
      [
        "timber",
        "administration"
      ]
    ],
    [
      "muang_xay",
      "Muang Xay",
      "LA-OU",
      20.69,
      101.98,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "phongsaly",
      "Phongsaly",
      "LA-PH",
      21.68,
      102.1,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "salavan",
      "Salavan",
      "LA-SL",
      15.72,
      106.42,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "savannakhet",
      "Savannakhet",
      "LA-SV",
      16.56,
      104.75,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "sekong",
      "Sekong",
      "LA-SK",
      15.35,
      106.73,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "xaignabouli",
      "Xaignabouli",
      "LA-XA",
      19.26,
      101.71,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "phonsavan",
      "Phonsavan",
      "LA-XI",
      19.45,
      103.18,
      "capital",
      [
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "salavan",
      "sekong",
      "road",
      "National road"
    ],
    [
      "attapeu",
      "sekong",
      "road",
      "National road"
    ],
    [
      "vientiane",
      "phonhong",
      "road",
      "National road"
    ],
    [
      "luang_namtha",
      "muang_xay",
      "road",
      "National road"
    ],
    [
      "luang_prabang",
      "xaignabouli",
      "road",
      "National road"
    ],
    [
      "luang_prabang",
      "muang_xay",
      "road",
      "National road"
    ],
    [
      "thakhek",
      "savannakhet",
      "road",
      "National road"
    ],
    [
      "pakse",
      "salavan",
      "road",
      "National road"
    ],
    [
      "muang_xay",
      "phongsaly",
      "road",
      "National road"
    ],
    [
      "phonhong",
      "xaignabouli",
      "road",
      "National road"
    ],
    [
      "vientiane",
      "pakxan",
      "road",
      "National road"
    ],
    [
      "luang_prabang",
      "phonsavan",
      "road",
      "National road"
    ],
    [
      "huay_xai",
      "luang_namtha",
      "road",
      "National road"
    ],
    [
      "xam_neua",
      "phonsavan",
      "road",
      "National road"
    ],
    [
      "pakxan",
      "thakhek",
      "road",
      "National road"
    ],
    [
      "pakse",
      "savannakhet",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "la_0",
    "name": "Alden Phommasane",
    "title": "President",
    "rank": "President",
    "branch": "Lao People's Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Laos, posted at vientiane (la_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "la.vientiane"
  },
  {
    "id": "la_1",
    "name": "Bram Keovongsy",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Lao People's Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Laos, posted at phonhong (la_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "la.phonhong"
  },
  {
    "id": "la_2",
    "name": "Corin Inthavong",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Lao People's Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Laos, posted at attapeu (la_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "la.attapeu"
  },
  {
    "id": "la_3",
    "name": "Davin Souliyavong",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Lao People's Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Laos, posted at huay xai (la_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "la.huay_xai"
  },
  {
    "id": "la_4",
    "name": "Elric Chanthavong",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Lao People's Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Laos, posted at pakxan (la_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "la.pakxan"
  },
  {
    "id": "la_5",
    "name": "Fenn Phimmasone",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Lao People's Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Laos, posted at pakse (la_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "la.pakse"
  }
])
});

export const THAILAND_REGION = land({
  "id": "th",
  "name": "Thailand",
  "country": "TH",
  "bbox": {
    "minLon": 97.22,
    "maxLon": 105.6,
    "minLat": 5.68,
    "maxLat": 20.66
  },
  "notes": "Atlas only. Seventy-three provinces. The 1989 factbook count is 73; its printed name list omits Mukdahan, which has existed since September 1982, so Mukdahan is included. Sa Kaeo, Nong Bua Lamphu, Amnat Charoen, and Bueng Kan are later and are not drawn. Bangkok is Krung Thep Mahanakhon. Aranyaprathet stays inside Prachin Buri. Tin is Phuket and Phangnga. The Mekong crossing is a ferry. Occupied and off the week-0 march.",
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
      "id": "TH-01",
      "name": "Ang Thong",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-02",
      "name": "Buriram",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-03",
      "name": "Chachoengsao",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-04",
      "name": "Chai Nat",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-05",
      "name": "Chaiyaphum",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-06",
      "name": "Chanthaburi",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-07",
      "name": "Chiang Mai",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-08",
      "name": "Chiang Rai",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-09",
      "name": "Chon Buri",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-10",
      "name": "Chumphon",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-11",
      "name": "Kalasin",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-12",
      "name": "Kamphaeng Phet",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-13",
      "name": "Kanchanaburi",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-14",
      "name": "Khon Kaen",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-15",
      "name": "Krabi",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-16",
      "name": "Krung Thep Mahanakhon",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-17",
      "name": "Lampang",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-18",
      "name": "Lamphun",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-19",
      "name": "Loei",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-20",
      "name": "Lop Buri",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-21",
      "name": "Mae Hong Son",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-22",
      "name": "Maha Sarakham",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-23",
      "name": "Mukdahan",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-24",
      "name": "Nakhon Nayok",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-25",
      "name": "Nakhon Pathom",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-26",
      "name": "Nakhon Phanom",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-27",
      "name": "Nakhon Ratchasima",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-28",
      "name": "Nakhon Sawan",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-29",
      "name": "Nakhon Si Thammarat",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-30",
      "name": "Nan",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-31",
      "name": "Narathiwat",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-32",
      "name": "Nong Khai",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-33",
      "name": "Nonthaburi",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-34",
      "name": "Pathum Thani",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-35",
      "name": "Pattani",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-36",
      "name": "Phangnga",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-37",
      "name": "Phatthalung",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-38",
      "name": "Phayao",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-39",
      "name": "Phetchabun",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-40",
      "name": "Phetchaburi",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-41",
      "name": "Phichit",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-42",
      "name": "Phitsanulok",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-43",
      "name": "Phra Nakhon Si Ayutthaya",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-44",
      "name": "Phrae",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-45",
      "name": "Phuket",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-46",
      "name": "Prachin Buri",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-47",
      "name": "Prachuap Khiri Khan",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-48",
      "name": "Ranong",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-49",
      "name": "Ratchaburi",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-50",
      "name": "Rayong",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-51",
      "name": "Roi Et",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-52",
      "name": "Sakon Nakhon",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-53",
      "name": "Samut Prakan",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-54",
      "name": "Samut Sakhon",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-55",
      "name": "Samut Songkhram",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-56",
      "name": "Sara Buri",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-57",
      "name": "Satun",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-58",
      "name": "Sing Buri",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-59",
      "name": "Sisaket",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-60",
      "name": "Songkhla",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-61",
      "name": "Sukhothai",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-62",
      "name": "Suphan Buri",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-63",
      "name": "Surat Thani",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-64",
      "name": "Surin",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-65",
      "name": "Tak",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-66",
      "name": "Trang",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-67",
      "name": "Trat",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-68",
      "name": "Ubon Ratchathani",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-69",
      "name": "Udon Thani",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-70",
      "name": "Uthai Thani",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-71",
      "name": "Uttaradit",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-72",
      "name": "Yala",
      "kind": "province",
      "group": null
    },
    {
      "id": "TH-73",
      "name": "Yasothon",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "ang_thong",
      "Ang Thong",
      "TH-01",
      14.59,
      100.45,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "buriram",
      "Buriram",
      "TH-02",
      14.99,
      103.1,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "chachoengsao",
      "Chachoengsao",
      "TH-03",
      13.69,
      101.07,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "chai_nat",
      "Chai Nat",
      "TH-04",
      15.19,
      100.12,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "chaiyaphum",
      "Chaiyaphum",
      "TH-05",
      15.81,
      102.03,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "chanthaburi",
      "Chanthaburi",
      "TH-06",
      12.61,
      102.1,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "chiang_mai",
      "Chiang Mai",
      "TH-07",
      18.79,
      98.98,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "chiang_rai",
      "Chiang Rai",
      "TH-08",
      19.91,
      99.83,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "chon_buri",
      "Chon Buri",
      "TH-09",
      13.36,
      100.98,
      "capital",
      [
        "natural_gas",
        "port"
      ]
    ],
    [
      "chumphon",
      "Chumphon",
      "TH-10",
      10.49,
      99.18,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kalasin",
      "Kalasin",
      "TH-11",
      16.43,
      103.51,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kamphaeng_phet",
      "Kamphaeng Phet",
      "TH-12",
      16.48,
      99.52,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kanchanaburi",
      "Kanchanaburi",
      "TH-13",
      14.02,
      99.53,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "khon_kaen",
      "Khon Kaen",
      "TH-14",
      16.44,
      102.84,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "krabi",
      "Krabi",
      "TH-15",
      8.09,
      98.91,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "bangkok",
      "Bangkok",
      "TH-16",
      13.76,
      100.5,
      "capital",
      [
        "port",
        "administration",
        "rice"
      ]
    ],
    [
      "lampang",
      "Lampang",
      "TH-17",
      18.29,
      99.5,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "lamphun",
      "Lamphun",
      "TH-18",
      18.58,
      99.01,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "loei",
      "Loei",
      "TH-19",
      17.49,
      101.73,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "lop_buri",
      "Lop Buri",
      "TH-20",
      14.8,
      100.65,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "mae_hong_son",
      "Mae Hong Son",
      "TH-21",
      19.3,
      97.97,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "maha_sarakham",
      "Maha Sarakham",
      "TH-22",
      16.18,
      103.3,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "mukdahan",
      "Mukdahan",
      "TH-23",
      16.54,
      104.72,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nakhon_nayok",
      "Nakhon Nayok",
      "TH-24",
      14.2,
      101.21,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nakhon_pathom",
      "Nakhon Pathom",
      "TH-25",
      13.82,
      100.06,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nakhon_phanom",
      "Nakhon Phanom",
      "TH-26",
      17.41,
      104.78,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nakhon_ratchasima",
      "Nakhon Ratchasima",
      "TH-27",
      14.98,
      102.1,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nakhon_sawan",
      "Nakhon Sawan",
      "TH-28",
      15.7,
      100.14,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nakhon_si_thammarat",
      "Nakhon Si Thammarat",
      "TH-29",
      8.43,
      99.96,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nan",
      "Nan",
      "TH-30",
      18.78,
      100.77,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "narathiwat",
      "Narathiwat",
      "TH-31",
      6.43,
      101.82,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nong_khai",
      "Nong Khai",
      "TH-32",
      17.88,
      102.74,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "nonthaburi",
      "Nonthaburi",
      "TH-33",
      13.86,
      100.51,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "pathum_thani",
      "Pathum Thani",
      "TH-34",
      14.02,
      100.53,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "pattani",
      "Pattani",
      "TH-35",
      6.87,
      101.25,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "phangnga",
      "Phangnga",
      "TH-36",
      8.45,
      98.53,
      "capital",
      [
        "tin",
        "fisheries"
      ]
    ],
    [
      "phatthalung",
      "Phatthalung",
      "TH-37",
      7.62,
      100.08,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "phayao",
      "Phayao",
      "TH-38",
      19.17,
      99.9,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "phetchabun",
      "Phetchabun",
      "TH-39",
      16.42,
      101.16,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "phetchaburi",
      "Phetchaburi",
      "TH-40",
      13.11,
      99.94,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "phichit",
      "Phichit",
      "TH-41",
      16.44,
      100.35,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "phitsanulok",
      "Phitsanulok",
      "TH-42",
      16.82,
      100.26,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "phra_nakhon_si_ayutthaya",
      "Phra Nakhon Si Ayutthaya",
      "TH-43",
      14.35,
      100.57,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "phrae",
      "Phrae",
      "TH-44",
      18.14,
      100.14,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "phuket",
      "Phuket",
      "TH-45",
      7.88,
      98.39,
      "capital",
      [
        "tin",
        "port",
        "fisheries"
      ]
    ],
    [
      "prachin_buri",
      "Prachin Buri",
      "TH-46",
      14.05,
      101.37,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "prachuap_khiri_khan",
      "Prachuap Khiri Khan",
      "TH-47",
      11.81,
      99.8,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "ranong",
      "Ranong",
      "TH-48",
      9.96,
      98.63,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "ratchaburi",
      "Ratchaburi",
      "TH-49",
      13.54,
      99.81,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "rayong",
      "Rayong",
      "TH-50",
      12.68,
      101.28,
      "capital",
      [
        "natural_gas",
        "port"
      ]
    ],
    [
      "roi_et",
      "Roi Et",
      "TH-51",
      16.05,
      103.65,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "sakon_nakhon",
      "Sakon Nakhon",
      "TH-52",
      17.15,
      104.15,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "samut_prakan",
      "Samut Prakan",
      "TH-53",
      13.6,
      100.6,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "samut_sakhon",
      "Samut Sakhon",
      "TH-54",
      13.55,
      100.27,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "samut_songkhram",
      "Samut Songkhram",
      "TH-55",
      13.41,
      100.0,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "sara_buri",
      "Sara Buri",
      "TH-56",
      14.53,
      100.91,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "satun",
      "Satun",
      "TH-57",
      6.62,
      100.07,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "sing_buri",
      "Sing Buri",
      "TH-58",
      14.89,
      100.4,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "sisaket",
      "Sisaket",
      "TH-59",
      15.12,
      104.32,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "songkhla",
      "Songkhla",
      "TH-60",
      7.2,
      100.6,
      "capital",
      [
        "port",
        "fisheries",
        "rice"
      ]
    ],
    [
      "sukhothai",
      "Sukhothai",
      "TH-61",
      17.01,
      99.82,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "suphan_buri",
      "Suphan Buri",
      "TH-62",
      14.47,
      100.12,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "surat_thani",
      "Surat Thani",
      "TH-63",
      9.14,
      99.33,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "surin",
      "Surin",
      "TH-64",
      14.88,
      103.49,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "tak",
      "Tak",
      "TH-65",
      16.88,
      99.13,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "trang",
      "Trang",
      "TH-66",
      7.56,
      99.61,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "trat",
      "Trat",
      "TH-67",
      12.24,
      102.51,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "ubon_ratchathani",
      "Ubon Ratchathani",
      "TH-68",
      15.24,
      104.85,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "udon_thani",
      "Udon Thani",
      "TH-69",
      17.41,
      102.79,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "uthai_thani",
      "Uthai Thani",
      "TH-70",
      15.38,
      100.02,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "uttaradit",
      "Uttaradit",
      "TH-71",
      17.63,
      100.1,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "yala",
      "Yala",
      "TH-72",
      6.54,
      101.28,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "yasothon",
      "Yasothon",
      "TH-73",
      15.8,
      104.14,
      "capital",
      [
        "rice"
      ]
    ]
  ],
  "links": [
    [
      "bangkok",
      "nonthaburi",
      "road",
      "National road"
    ],
    [
      "nonthaburi",
      "pathum_thani",
      "road",
      "National road"
    ],
    [
      "bangkok",
      "samut_prakan",
      "road",
      "National road"
    ],
    [
      "chiang_mai",
      "lamphun",
      "road",
      "National road"
    ],
    [
      "chai_nat",
      "uthai_thani",
      "road",
      "National road"
    ],
    [
      "nakhon_nayok",
      "prachin_buri",
      "road",
      "National road"
    ],
    [
      "ratchaburi",
      "samut_songkhram",
      "road",
      "National road"
    ],
    [
      "lop_buri",
      "sing_buri",
      "road",
      "National road"
    ],
    [
      "ang_thong",
      "phra_nakhon_si_ayutthaya",
      "road",
      "National road"
    ],
    [
      "ang_thong",
      "lop_buri",
      "road",
      "National road"
    ],
    [
      "samut_sakhon",
      "samut_songkhram",
      "road",
      "National road"
    ],
    [
      "phetchaburi",
      "samut_songkhram",
      "road",
      "National road"
    ],
    [
      "bangkok",
      "samut_sakhon",
      "road",
      "National road"
    ],
    [
      "kalasin",
      "maha_sarakham",
      "road",
      "National road"
    ],
    [
      "pattani",
      "yala",
      "road",
      "National road"
    ],
    [
      "pathum_thani",
      "phra_nakhon_si_ayutthaya",
      "road",
      "National road"
    ],
    [
      "nakhon_sawan",
      "uthai_thani",
      "road",
      "National road"
    ],
    [
      "nakhon_pathom",
      "samut_sakhon",
      "road",
      "National road"
    ],
    [
      "chachoengsao",
      "chon_buri",
      "road",
      "National road"
    ],
    [
      "ang_thong",
      "suphan_buri",
      "road",
      "National road"
    ],
    [
      "maha_sarakham",
      "roi_et",
      "road",
      "National road"
    ],
    [
      "lop_buri",
      "sara_buri",
      "road",
      "National road"
    ],
    [
      "phichit",
      "phitsanulok",
      "road",
      "National road"
    ],
    [
      "buriram",
      "surin",
      "road",
      "National road"
    ],
    [
      "chai_nat",
      "sing_buri",
      "road",
      "National road"
    ],
    [
      "nakhon_nayok",
      "sara_buri",
      "road",
      "National road"
    ],
    [
      "chon_buri",
      "samut_prakan",
      "road",
      "National road"
    ],
    [
      "nong_khai",
      "udon_thani",
      "road",
      "National road"
    ],
    [
      "phatthalung",
      "trang",
      "road",
      "National road"
    ],
    [
      "phitsanulok",
      "sukhothai",
      "road",
      "National road"
    ],
    [
      "phrae",
      "uttaradit",
      "road",
      "National road"
    ],
    [
      "krabi",
      "phangnga",
      "road",
      "National road"
    ],
    [
      "khon_kaen",
      "maha_sarakham",
      "road",
      "National road"
    ],
    [
      "sisaket",
      "ubon_ratchathani",
      "road",
      "National road"
    ],
    [
      "roi_et",
      "yasothon",
      "road",
      "National road"
    ],
    [
      "narathiwat",
      "yala",
      "road",
      "National road"
    ],
    [
      "chanthaburi",
      "trat",
      "road",
      "National road"
    ],
    [
      "kanchanaburi",
      "ratchaburi",
      "road",
      "National road"
    ],
    [
      "kamphaeng_phet",
      "tak",
      "road",
      "National road"
    ],
    [
      "krabi",
      "phuket",
      "road",
      "National road"
    ],
    [
      "lampang",
      "lamphun",
      "road",
      "National road"
    ],
    [
      "kamphaeng_phet",
      "sukhothai",
      "road",
      "National road"
    ],
    [
      "lampang",
      "phrae",
      "road",
      "National road"
    ],
    [
      "phatthalung",
      "songkhla",
      "road",
      "National road"
    ],
    [
      "sukhothai",
      "uttaradit",
      "road",
      "National road"
    ],
    [
      "nakhon_phanom",
      "sakon_nakhon",
      "road",
      "National road"
    ],
    [
      "sisaket",
      "yasothon",
      "road",
      "National road"
    ],
    [
      "pattani",
      "songkhla",
      "road",
      "National road"
    ],
    [
      "chon_buri",
      "rayong",
      "road",
      "National road"
    ],
    [
      "chiang_rai",
      "phayao",
      "road",
      "National road"
    ],
    [
      "chumphon",
      "ranong",
      "road",
      "National road"
    ],
    [
      "nakhon_sawan",
      "phichit",
      "road",
      "National road"
    ],
    [
      "satun",
      "songkhla",
      "road",
      "National road"
    ],
    [
      "phetchabun",
      "phichit",
      "road",
      "National road"
    ],
    [
      "nakhon_si_thammarat",
      "phatthalung",
      "road",
      "National road"
    ],
    [
      "chanthaburi",
      "rayong",
      "road",
      "National road"
    ],
    [
      "chaiyaphum",
      "nakhon_ratchasima",
      "road",
      "National road"
    ],
    [
      "mukdahan",
      "sakon_nakhon",
      "road",
      "National road"
    ],
    [
      "sisaket",
      "surin",
      "road",
      "National road"
    ],
    [
      "krabi",
      "trang",
      "road",
      "National road"
    ],
    [
      "nan",
      "phrae",
      "road",
      "National road"
    ],
    [
      "mukdahan",
      "yasothon",
      "road",
      "National road"
    ],
    [
      "nakhon_si_thammarat",
      "surat_thani",
      "road",
      "National road"
    ],
    [
      "nan",
      "phayao",
      "road",
      "National road"
    ],
    [
      "khon_kaen",
      "udon_thani",
      "road",
      "National road"
    ],
    [
      "buriram",
      "nakhon_ratchasima",
      "road",
      "National road"
    ],
    [
      "chaiyaphum",
      "phetchabun",
      "road",
      "National road"
    ],
    [
      "loei",
      "udon_thani",
      "road",
      "National road"
    ],
    [
      "ranong",
      "surat_thani",
      "road",
      "National road"
    ],
    [
      "chiang_mai",
      "mae_hong_son",
      "road",
      "National road"
    ],
    [
      "phetchaburi",
      "prachuap_khiri_khan",
      "road",
      "National road"
    ],
    [
      "chumphon",
      "prachuap_khiri_khan",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "th_0",
    "name": "Prasert Saetang",
    "title": "King",
    "rank": "King",
    "branch": "Royal Thai Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional King of Thailand, posted at ang thong (th_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "th.ang_thong"
  },
  {
    "id": "th_1",
    "name": "Niran Wongsuwan",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Royal Thai Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Thailand, posted at buriram (th_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "th.buriram"
  },
  {
    "id": "th_2",
    "name": "Chai Rattanakul",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Royal Thai Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Thailand, posted at chachoengsao (th_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "th.chachoengsao"
  },
  {
    "id": "th_3",
    "name": "Somsak Charoensuk",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Royal Thai Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Thailand, posted at chai nat (th_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "th.chai_nat"
  },
  {
    "id": "th_4",
    "name": "Anan Boonmee",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Royal Thai Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Thailand, posted at chaiyaphum (th_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "th.chaiyaphum"
  },
  {
    "id": "th_5",
    "name": "Viroj Srisuk",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Royal Thai Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Thailand, posted at chanthaburi (th_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "th.chanthaburi"
  },
  {
    "id": "th_6",
    "name": "Preecha Kaewmanee",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Royal Thai Army",
    "slot": "front_commander",
    "war": 76,
    "int": 47,
    "pol": 38,
    "chr": 38,
    "personality": "ambitious",
    "bio": "Fictional Front commander of Thailand, posted at chiang mai (th_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "th.chiang_mai"
  },
  {
    "id": "th_7",
    "name": "Thongchai Phromphan",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Royal Thai Army",
    "slot": "front_commander",
    "war": 79,
    "int": 52,
    "pol": 36,
    "chr": 35,
    "personality": "recluse",
    "bio": "Fictional Front commander of Thailand, posted at chiang rai (th_7). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "th.chiang_rai"
  }
])
});

export const BURMA_REGION = land({
  "id": "mm",
  "name": "Burma",
  "country": "MM",
  "bbox": {
    "minLon": 92.15,
    "maxLon": 98.95,
    "minLat": 13.34,
    "maxLat": 26.13
  },
  "notes": "Atlas only. The name is Burma, not Myanmar. Seven divisions and seven states. The capital is Rangoon. Period names stay Moulmein, Bassein, Pegu, Akyab, and Tavoy. Rice, teak as timber, oil, and tin. The Burma Road meets Kunming at Muse. Moreh-Tamu meets Imphal. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "MM-RG",
      "name": "Rangoon",
      "kind": "division",
      "group": null
    },
    {
      "id": "MM-MD",
      "name": "Mandalay",
      "kind": "division",
      "group": null
    },
    {
      "id": "MM-MG",
      "name": "Magwe",
      "kind": "division",
      "group": null
    },
    {
      "id": "MM-PG",
      "name": "Pegu",
      "kind": "division",
      "group": null
    },
    {
      "id": "MM-IR",
      "name": "Irrawaddy",
      "kind": "division",
      "group": null
    },
    {
      "id": "MM-SG",
      "name": "Sagaing",
      "kind": "division",
      "group": null
    },
    {
      "id": "MM-TN",
      "name": "Tenasserim",
      "kind": "division",
      "group": null
    },
    {
      "id": "MM-SH",
      "name": "Shan",
      "kind": "state",
      "group": null
    },
    {
      "id": "MM-KC",
      "name": "Kachin",
      "kind": "state",
      "group": null
    },
    {
      "id": "MM-KH",
      "name": "Kayah",
      "kind": "state",
      "group": null
    },
    {
      "id": "MM-KN",
      "name": "Karen",
      "kind": "state",
      "group": null
    },
    {
      "id": "MM-MO",
      "name": "Mon",
      "kind": "state",
      "group": null
    },
    {
      "id": "MM-CH",
      "name": "Chin",
      "kind": "state",
      "group": null
    },
    {
      "id": "MM-RK",
      "name": "Rakhine",
      "kind": "state",
      "group": null
    }
  ],
  "cities": [
    [
      "rangoon",
      "Rangoon",
      "MM-RG",
      16.84,
      96.17,
      "capital",
      [
        "port",
        "rice",
        "administration"
      ]
    ],
    [
      "mandalay",
      "Mandalay",
      "MM-MD",
      21.98,
      96.08,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "magwe",
      "Magwe",
      "MM-MG",
      20.15,
      94.95,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "pegu",
      "Pegu",
      "MM-PG",
      17.34,
      96.48,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "bassein",
      "Bassein",
      "MM-IR",
      16.78,
      94.73,
      "capital",
      [
        "rice",
        "fisheries"
      ]
    ],
    [
      "sagaing",
      "Sagaing",
      "MM-SG",
      21.88,
      95.98,
      "capital",
      [
        "rice",
        "timber"
      ]
    ],
    [
      "tavoy",
      "Tavoy",
      "MM-TN",
      14.09,
      98.2,
      "capital",
      [
        "tin",
        "fisheries"
      ]
    ],
    [
      "taunggyi",
      "Taunggyi",
      "MM-SH",
      20.79,
      97.04,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "myitkyina",
      "Myitkyina",
      "MM-KC",
      25.38,
      97.4,
      "capital",
      [
        "timber",
        "stone"
      ]
    ],
    [
      "loikaw",
      "Loikaw",
      "MM-KH",
      19.67,
      97.21,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "pa_an",
      "Pa-an",
      "MM-KN",
      16.89,
      97.63,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "moulmein",
      "Moulmein",
      "MM-MO",
      16.49,
      97.63,
      "capital",
      [
        "port",
        "rice"
      ]
    ],
    [
      "hakha",
      "Hakha",
      "MM-CH",
      22.64,
      93.61,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "akyab",
      "Akyab",
      "MM-RK",
      20.15,
      92.9,
      "capital",
      [
        "rice",
        "fisheries"
      ]
    ],
    [
      "lashio",
      "Lashio",
      "MM-SH",
      22.93,
      97.75,
      "city",
      [
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "mandalay",
      "sagaing",
      "road",
      "National road"
    ],
    [
      "pa_an",
      "moulmein",
      "road",
      "National road"
    ],
    [
      "rangoon",
      "pegu",
      "road",
      "National road"
    ],
    [
      "taunggyi",
      "loikaw",
      "road",
      "National road"
    ],
    [
      "pegu",
      "pa_an",
      "road",
      "National road"
    ],
    [
      "rangoon",
      "bassein",
      "road",
      "National road"
    ],
    [
      "sagaing",
      "taunggyi",
      "road",
      "National road"
    ],
    [
      "mandalay",
      "lashio",
      "road",
      "National road"
    ],
    [
      "magwe",
      "sagaing",
      "road",
      "National road"
    ],
    [
      "magwe",
      "akyab",
      "road",
      "National road"
    ],
    [
      "pegu",
      "loikaw",
      "road",
      "National road"
    ],
    [
      "tavoy",
      "moulmein",
      "road",
      "National road"
    ],
    [
      "myitkyina",
      "lashio",
      "road",
      "National road"
    ],
    [
      "sagaing",
      "hakha",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "mm_0",
    "name": "Alden Kyaw",
    "title": "President",
    "rank": "President",
    "branch": "Burmese Army",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Burma, posted at rangoon (mm_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mm.rangoon"
  },
  {
    "id": "mm_1",
    "name": "Bram Thu",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Burmese Army",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Burma, posted at mandalay (mm_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mm.mandalay"
  },
  {
    "id": "mm_2",
    "name": "Corin Win",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Burmese Army",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Burma, posted at magwe (mm_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mm.magwe"
  },
  {
    "id": "mm_3",
    "name": "Davin Myint",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Burmese Army",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Burma, posted at pegu (mm_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mm.pegu"
  },
  {
    "id": "mm_4",
    "name": "Elric Zin",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Burmese Army",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Burma, posted at bassein (mm_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mm.bassein"
  },
  {
    "id": "mm_5",
    "name": "Fenn Lwin",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Burmese Army",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Burma, posted at sagaing (mm_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "mm.sagaing"
  }
])
});

export const MALAYSIA_REGION = land({
  "id": "my",
  "name": "Malaysia",
  "country": "MY",
  "bbox": {
    "minLon": 99.45,
    "maxLon": 116.82,
    "minLat": 0.74,
    "maxLat": 7.19
  },
  "notes": "Atlas only. Thirteen states plus the Kuala Lumpur federal territory (1974) and Labuan (1984). No Putrajaya. Shah Alam is the Selangor capital. Tin is Perak. Oil and gas are Terengganu, Sarawak, and Sabah. Labuan is reached by sea. The Johor-Singapore Causeway is a road. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "MY-JH",
      "name": "Johor",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-KD",
      "name": "Kedah",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-KL",
      "name": "Kelantan",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-ML",
      "name": "Malacca",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-NS",
      "name": "Negeri Sembilan",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-PH",
      "name": "Pahang",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-PN",
      "name": "Penang",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-PR",
      "name": "Perak",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-PS",
      "name": "Perlis",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-SB",
      "name": "Sabah",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-SW",
      "name": "Sarawak",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-SL",
      "name": "Selangor",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-TR",
      "name": "Terengganu",
      "kind": "state",
      "group": null
    },
    {
      "id": "MY-FT",
      "name": "Kuala Lumpur",
      "kind": "territory",
      "group": null
    },
    {
      "id": "MY-LB",
      "name": "Labuan",
      "kind": "territory",
      "group": null
    }
  ],
  "cities": [
    [
      "johor_bahru",
      "Johor Bahru",
      "MY-JH",
      1.49,
      103.74,
      "capital",
      [
        "port",
        "oil"
      ]
    ],
    [
      "alor_setar",
      "Alor Setar",
      "MY-KD",
      6.12,
      100.37,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kota_bharu",
      "Kota Bharu",
      "MY-KL",
      6.13,
      102.24,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "malacca",
      "Malacca",
      "MY-ML",
      2.19,
      102.25,
      "capital",
      [
        "port"
      ]
    ],
    [
      "seremban",
      "Seremban",
      "MY-NS",
      2.73,
      101.94,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kuantan",
      "Kuantan",
      "MY-PH",
      3.81,
      103.33,
      "capital",
      [
        "timber",
        "port"
      ]
    ],
    [
      "georgetown",
      "George Town",
      "MY-PN",
      5.41,
      100.34,
      "capital",
      [
        "port",
        "fisheries"
      ]
    ],
    [
      "ipoh",
      "Ipoh",
      "MY-PR",
      4.6,
      101.09,
      "capital",
      [
        "tin"
      ]
    ],
    [
      "kangar",
      "Kangar",
      "MY-PS",
      6.44,
      100.2,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kota_kinabalu",
      "Kota Kinabalu",
      "MY-SB",
      5.98,
      116.07,
      "capital",
      [
        "oil",
        "timber",
        "cocoa"
      ]
    ],
    [
      "kuching",
      "Kuching",
      "MY-SW",
      1.55,
      110.34,
      "capital",
      [
        "oil",
        "timber",
        "natural_gas"
      ]
    ],
    [
      "shah_alam",
      "Shah Alam",
      "MY-SL",
      3.07,
      101.52,
      "capital",
      [
        "tin",
        "port"
      ]
    ],
    [
      "kuala_terengganu",
      "Kuala Terengganu",
      "MY-TR",
      5.33,
      103.14,
      "capital",
      [
        "oil",
        "natural_gas"
      ]
    ],
    [
      "kuala_lumpur",
      "Kuala Lumpur",
      "MY-FT",
      3.14,
      101.69,
      "capital",
      [
        "administration",
        "tin"
      ]
    ],
    [
      "labuan",
      "Labuan",
      "MY-LB",
      5.28,
      115.24,
      "capital",
      [
        "oil",
        "port"
      ]
    ],
    [
      "miri",
      "Miri",
      "MY-SW",
      4.4,
      113.99,
      "city",
      [
        "oil",
        "natural_gas"
      ]
    ]
  ],
  "links": [
    [
      "labuan",
      "kota_kinabalu",
      "sea",
      "Brunei Bay"
    ],
    [
      "kuantan",
      "kota_kinabalu",
      "sea",
      "South China Sea"
    ],
    [
      "shah_alam",
      "kuala_lumpur",
      "road",
      "National road"
    ],
    [
      "alor_setar",
      "kangar",
      "road",
      "National road"
    ],
    [
      "seremban",
      "kuala_lumpur",
      "road",
      "National road"
    ],
    [
      "malacca",
      "seremban",
      "road",
      "National road"
    ],
    [
      "alor_setar",
      "georgetown",
      "road",
      "National road"
    ],
    [
      "georgetown",
      "ipoh",
      "road",
      "National road"
    ],
    [
      "kota_bharu",
      "kuala_terengganu",
      "road",
      "National road"
    ],
    [
      "kuantan",
      "kuala_terengganu",
      "road",
      "National road"
    ],
    [
      "ipoh",
      "kuala_lumpur",
      "road",
      "National road"
    ],
    [
      "johor_bahru",
      "malacca",
      "road",
      "National road"
    ],
    [
      "seremban",
      "kuantan",
      "road",
      "National road"
    ],
    [
      "kota_kinabalu",
      "miri",
      "road",
      "National road"
    ],
    [
      "kuching",
      "miri",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "my_0",
    "name": "Alden Abdullah",
    "title": "Prime Minister",
    "rank": "Prime Minister",
    "branch": "Malaysian Armed Forces",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional Prime Minister of Malaysia, posted at johor bahru (my_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "my.johor_bahru"
  },
  {
    "id": "my_1",
    "name": "Bram Ismail",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Malaysian Armed Forces",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Malaysia, posted at alor setar (my_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "my.alor_setar"
  },
  {
    "id": "my_2",
    "name": "Corin Hassan",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Malaysian Armed Forces",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Malaysia, posted at kota bharu (my_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "my.kota_bharu"
  },
  {
    "id": "my_3",
    "name": "Davin Yusof",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Malaysian Armed Forces",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Malaysia, posted at malacca (my_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "my.malacca"
  },
  {
    "id": "my_4",
    "name": "Elric Hamid",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Malaysian Armed Forces",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Malaysia, posted at seremban (my_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "my.seremban"
  },
  {
    "id": "my_5",
    "name": "Fenn Osman",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Malaysian Armed Forces",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Malaysia, posted at kuantan (my_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "my.kuantan"
  }
])
});

export const SINGAPORE_REGION = land({
  "id": "sg",
  "name": "Singapore",
  "country": "SG",
  "bbox": {
    "minLon": 103.07,
    "maxLon": 104.57,
    "minLat": 0.6,
    "maxLat": 2.1
  },
  "notes": "Atlas only. One city-state. The causeway to Johor Bahru is a road. The Strait of Malacca, the Singapore Strait, and the South China Sea are sea lanes. Port, refining, and administration. Occupied and off the week-0 march.",
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
      "id": "SG-SG",
      "name": "Singapore",
      "kind": "city-state",
      "group": null
    }
  ],
  "cities": [
    [
      "singapore",
      "Singapore",
      "SG-SG",
      1.35,
      103.82,
      "capital",
      [
        "port",
        "oil",
        "administration"
      ]
    ]
  ],
  "links": [],
  "officers": staff([
  {
    "id": "sg_0",
    "name": "Wei Ming Tan",
    "title": "President",
    "rank": "President",
    "branch": "Singapore Armed Forces",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Singapore, posted at singapore (sg_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sg.singapore"
  },
  {
    "id": "sg_1",
    "name": "Wei Ming Lim",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Singapore Armed Forces",
    "slot": "field_officer",
    "war": 64,
    "int": 43,
    "pol": 37,
    "chr": 37,
    "personality": "cautious",
    "bio": "Fictional Field officer of Singapore, posted at singapore (sg_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "sg.singapore"
  }
])
});

export const BRUNEI_REGION = land({
  "id": "bn",
  "name": "Brunei",
  "country": "BN",
  "bbox": {
    "minLon": 113.44,
    "maxLon": 115.82,
    "minLat": 3.83,
    "maxLat": 5.64
  },
  "notes": "Atlas only. Independent from 1984. Four districts: Brunei-Muara, Belait, Tutong, and Temburong. Temburong is reached across Brunei Bay by sea; the land link would cross Sarawak's Limbang and is not drawn as a Brunei road. Oil and gas. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "BN-BM",
      "name": "Brunei-Muara",
      "kind": "district",
      "group": null
    },
    {
      "id": "BN-BE",
      "name": "Belait",
      "kind": "district",
      "group": null
    },
    {
      "id": "BN-TU",
      "name": "Tutong",
      "kind": "district",
      "group": null
    },
    {
      "id": "BN-TE",
      "name": "Temburong",
      "kind": "district",
      "group": null
    }
  ],
  "cities": [
    [
      "bandar",
      "Bandar Seri Begawan",
      "BN-BM",
      4.89,
      114.94,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "kuala_belait",
      "Kuala Belait",
      "BN-BE",
      4.58,
      114.19,
      "capital",
      [
        "oil",
        "natural_gas"
      ]
    ],
    [
      "tutong",
      "Tutong",
      "BN-TU",
      4.8,
      114.65,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "bangar",
      "Bangar",
      "BN-TE",
      4.71,
      115.07,
      "capital",
      [
        "timber"
      ]
    ]
  ],
  "links": [
    [
      "bandar",
      "bangar",
      "sea",
      "Brunei Bay"
    ],
    [
      "bandar",
      "tutong",
      "road",
      "National road"
    ],
    [
      "kuala_belait",
      "tutong",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "bn_0",
    "name": "Alden Damit",
    "title": "President",
    "rank": "President",
    "branch": "Royal Brunei Armed Forces",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Brunei, posted at bandar (bn_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bn.bandar"
  },
  {
    "id": "bn_1",
    "name": "Bram Lampoh",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Royal Brunei Armed Forces",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Brunei, posted at kuala belait (bn_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bn.kuala_belait"
  },
  {
    "id": "bn_2",
    "name": "Corin Osman",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Royal Brunei Armed Forces",
    "slot": "field_officer",
    "war": 67,
    "int": 39,
    "pol": 35,
    "chr": 34,
    "personality": "diplomat",
    "bio": "Fictional Field officer of Brunei, posted at tutong (bn_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "bn.tutong"
  }
])
});

export const INDONESIA_REGION = land({
  "id": "id",
  "name": "Indonesia",
  "country": "ID",
  "bbox": {
    "minLon": 94.57,
    "maxLon": 141.47,
    "minLat": -10.92,
    "maxLat": 6.3
  },
  "notes": "Atlas only. Provinces of 1985-89. No Banten, Gorontalo, North Maluku, West Sulawesi, Riau Islands, Bangka-Belitung, North Kalimantan, or a separate West Papua. Irian Jaya keeps that name. Ujung Pandang keeps that name. Timor Timur is a province, group Occupied East Timor, not a country. Kupang and Dili share a road because the occupation map treats the island as Indonesian. The Sunda Strait and the Lombok Strait are sea lanes. Tin on Bangka stays with South Sumatra. Freeport copper and gold are at Timika. Dili is coffee, not oil. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "ID-AC",
      "name": "Aceh",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-SU",
      "name": "North Sumatra",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-SB",
      "name": "West Sumatra",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-RI",
      "name": "Riau",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-JA",
      "name": "Jambi",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-SS",
      "name": "South Sumatra",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-BE",
      "name": "Bengkulu",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-LA",
      "name": "Lampung",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-JK",
      "name": "Jakarta",
      "kind": "special region",
      "group": null
    },
    {
      "id": "ID-JB",
      "name": "West Java",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-JT",
      "name": "Central Java",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-YO",
      "name": "Yogyakarta",
      "kind": "special region",
      "group": null
    },
    {
      "id": "ID-JI",
      "name": "East Java",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-BA",
      "name": "Bali",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-NB",
      "name": "West Nusa Tenggara",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-NT",
      "name": "East Nusa Tenggara",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-TT",
      "name": "Timor Timur",
      "kind": "province",
      "group": "Occupied East Timor"
    },
    {
      "id": "ID-KB",
      "name": "West Kalimantan",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-KT",
      "name": "Central Kalimantan",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-KS",
      "name": "South Kalimantan",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-KI",
      "name": "East Kalimantan",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-SA",
      "name": "North Sulawesi",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-ST",
      "name": "Central Sulawesi",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-SN",
      "name": "South Sulawesi",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-SG",
      "name": "Southeast Sulawesi",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-MA",
      "name": "Maluku",
      "kind": "province",
      "group": null
    },
    {
      "id": "ID-IJ",
      "name": "Irian Jaya",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "banda_aceh",
      "Banda Aceh",
      "ID-AC",
      5.55,
      95.32,
      "capital",
      [
        "oil",
        "rice"
      ]
    ],
    [
      "medan",
      "Medan",
      "ID-SU",
      3.59,
      98.67,
      "capital",
      [
        "oil",
        "port",
        "tobacco"
      ]
    ],
    [
      "padang",
      "Padang",
      "ID-SB",
      -0.95,
      100.35,
      "capital",
      [
        "port",
        "coal"
      ]
    ],
    [
      "pekanbaru",
      "Pekanbaru",
      "ID-RI",
      0.51,
      101.45,
      "capital",
      [
        "oil"
      ]
    ],
    [
      "jambi",
      "Jambi",
      "ID-JA",
      -1.61,
      103.61,
      "capital",
      [
        "oil",
        "timber"
      ]
    ],
    [
      "palembang",
      "Palembang",
      "ID-SS",
      -2.99,
      104.76,
      "capital",
      [
        "oil",
        "tin"
      ]
    ],
    [
      "bengkulu",
      "Bengkulu",
      "ID-BE",
      -3.8,
      102.26,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "bandar_lampung",
      "Bandar Lampung",
      "ID-LA",
      -5.43,
      105.26,
      "capital",
      [
        "coffee",
        "rice"
      ]
    ],
    [
      "jakarta",
      "Jakarta",
      "ID-JK",
      -6.21,
      106.85,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "bandung",
      "Bandung",
      "ID-JB",
      -6.92,
      107.61,
      "capital",
      [
        "rice",
        "coffee"
      ]
    ],
    [
      "semarang",
      "Semarang",
      "ID-JT",
      -6.97,
      110.42,
      "capital",
      [
        "rice",
        "oil"
      ]
    ],
    [
      "yogyakarta",
      "Yogyakarta",
      "ID-YO",
      -7.8,
      110.36,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "surabaya",
      "Surabaya",
      "ID-JI",
      -7.25,
      112.75,
      "capital",
      [
        "port",
        "rice"
      ]
    ],
    [
      "denpasar",
      "Denpasar",
      "ID-BA",
      -8.65,
      115.22,
      "capital",
      [
        "rice",
        "fisheries"
      ]
    ],
    [
      "mataram",
      "Mataram",
      "ID-NB",
      -8.58,
      116.11,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "kupang",
      "Kupang",
      "ID-NT",
      -10.17,
      123.61,
      "capital",
      [
        "cattle",
        "fisheries"
      ]
    ],
    [
      "dili",
      "Dili",
      "ID-TT",
      -8.56,
      125.57,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "pontianak",
      "Pontianak",
      "ID-KB",
      -0.03,
      109.34,
      "capital",
      [
        "timber",
        "port"
      ]
    ],
    [
      "palangkaraya",
      "Palangkaraya",
      "ID-KT",
      -2.21,
      113.92,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "banjarmasin",
      "Banjarmasin",
      "ID-KS",
      -3.32,
      114.59,
      "capital",
      [
        "coal",
        "timber"
      ]
    ],
    [
      "samarinda",
      "Samarinda",
      "ID-KI",
      -0.5,
      117.14,
      "capital",
      [
        "oil",
        "coal",
        "timber"
      ]
    ],
    [
      "manado",
      "Manado",
      "ID-SA",
      1.47,
      124.84,
      "capital",
      [
        "fisheries",
        "port"
      ]
    ],
    [
      "palu",
      "Palu",
      "ID-ST",
      -0.9,
      119.87,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "ujung_pandang",
      "Ujung Pandang",
      "ID-SN",
      -5.15,
      119.43,
      "capital",
      [
        "port",
        "cocoa"
      ]
    ],
    [
      "kendari",
      "Kendari",
      "ID-SG",
      -3.99,
      122.51,
      "capital",
      [
        "nickel"
      ]
    ],
    [
      "ambon",
      "Ambon",
      "ID-MA",
      -3.7,
      128.18,
      "capital",
      [
        "nutmeg",
        "fisheries"
      ]
    ],
    [
      "jayapura",
      "Jayapura",
      "ID-IJ",
      -2.53,
      140.72,
      "capital",
      [
        "timber",
        "port"
      ]
    ],
    [
      "timika",
      "Timika",
      "ID-IJ",
      -4.54,
      136.89,
      "city",
      [
        "copper",
        "gold"
      ]
    ]
  ],
  "links": [
    [
      "bandar_lampung",
      "jakarta",
      "sea",
      "Sunda Strait"
    ],
    [
      "surabaya",
      "denpasar",
      "sea",
      "Bali Strait"
    ],
    [
      "denpasar",
      "mataram",
      "sea",
      "Lombok Strait"
    ],
    [
      "mataram",
      "kupang",
      "sea",
      "Flores Sea"
    ],
    [
      "palembang",
      "pontianak",
      "sea",
      "Karimata Strait"
    ],
    [
      "banjarmasin",
      "ujung_pandang",
      "sea",
      "Makassar Strait"
    ],
    [
      "ujung_pandang",
      "ambon",
      "sea",
      "Banda Sea"
    ],
    [
      "ambon",
      "jayapura",
      "sea",
      "Pacific"
    ],
    [
      "ambon",
      "timika",
      "sea",
      "Arafura Sea"
    ],
    [
      "jambi",
      "palembang",
      "road",
      "National road"
    ],
    [
      "padang",
      "pekanbaru",
      "road",
      "National road"
    ],
    [
      "palembang",
      "bandar_lampung",
      "road",
      "National road"
    ],
    [
      "jambi",
      "bengkulu",
      "road",
      "National road"
    ],
    [
      "pekanbaru",
      "jambi",
      "road",
      "National road"
    ],
    [
      "banda_aceh",
      "medan",
      "road",
      "National road"
    ],
    [
      "medan",
      "pekanbaru",
      "road",
      "National road"
    ],
    [
      "semarang",
      "yogyakarta",
      "road",
      "National road"
    ],
    [
      "jakarta",
      "bandung",
      "road",
      "National road"
    ],
    [
      "semarang",
      "surabaya",
      "road",
      "National road"
    ],
    [
      "bandung",
      "semarang",
      "road",
      "National road"
    ],
    [
      "kupang",
      "dili",
      "road",
      "National road"
    ],
    [
      "palangkaraya",
      "banjarmasin",
      "road",
      "National road"
    ],
    [
      "palangkaraya",
      "samarinda",
      "road",
      "National road"
    ],
    [
      "pontianak",
      "palangkaraya",
      "road",
      "National road"
    ],
    [
      "ujung_pandang",
      "kendari",
      "road",
      "National road"
    ],
    [
      "palu",
      "kendari",
      "road",
      "National road"
    ],
    [
      "manado",
      "palu",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "id_0",
    "name": "Bagas Santoso",
    "title": "President",
    "rank": "President",
    "branch": "Armed Forces of the Republic of Indonesia",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Indonesia, posted at banda aceh (id_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "id.banda_aceh"
  },
  {
    "id": "id_1",
    "name": "Dimas Wijaya",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Armed Forces of the Republic of Indonesia",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Indonesia, posted at medan (id_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "id.medan"
  },
  {
    "id": "id_2",
    "name": "Eko Saputra",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Armed Forces of the Republic of Indonesia",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Indonesia, posted at padang (id_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "id.padang"
  },
  {
    "id": "id_3",
    "name": "Fajar Pratama",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Armed Forces of the Republic of Indonesia",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Indonesia, posted at pekanbaru (id_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "id.pekanbaru"
  },
  {
    "id": "id_4",
    "name": "Gilang Nugroho",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Armed Forces of the Republic of Indonesia",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Indonesia, posted at jambi (id_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "id.jambi"
  },
  {
    "id": "id_5",
    "name": "Hendra Setiawan",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Armed Forces of the Republic of Indonesia",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Indonesia, posted at palembang (id_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "id.palembang"
  },
  {
    "id": "id_6",
    "name": "Irwan Kurniawan",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Armed Forces of the Republic of Indonesia",
    "slot": "front_commander",
    "war": 76,
    "int": 47,
    "pol": 38,
    "chr": 38,
    "personality": "ambitious",
    "bio": "Fictional Front commander of Indonesia, posted at bengkulu (id_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "id.bengkulu"
  }
])
});

export const PHILIPPINES_REGION = land({
  "id": "ph",
  "name": "Philippines",
  "country": "PH",
  "bbox": {
    "minLon": 117.99,
    "maxLon": 126.97,
    "minLat": 4.28,
    "maxLat": 21.2
  },
  "notes": "Atlas only. Seventy-three provinces of the 1987 factbook, with Kalinga-Apayao still one province, plus Metro Manila. Chartered cities are not first-level units. No Guimaras, Biliran, Sarangani, Compostela Valley, Zamboanga Sibugay, Dinagat, or Davao Occidental. Davao del Norte is the province the factbook lists as Davao. Clark stays in Pampanga and Subic stays in Zambales; both are marked as US bases and remain Philippine provinces. Luzon, the Visayas, and Mindanao are separate road groups with ferries, including Manila-Cebu and Batangas-Calapan. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "PH-01",
      "name": "Abra",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-02",
      "name": "Agusan del Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-03",
      "name": "Agusan del Sur",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-04",
      "name": "Aklan",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-05",
      "name": "Albay",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-06",
      "name": "Antique",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-07",
      "name": "Aurora",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-08",
      "name": "Basilan",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-09",
      "name": "Bataan",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-10",
      "name": "Batanes",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-11",
      "name": "Batangas",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-12",
      "name": "Benguet",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-13",
      "name": "Bohol",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-14",
      "name": "Bukidnon",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-15",
      "name": "Bulacan",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-16",
      "name": "Cagayan",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-17",
      "name": "Camarines Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-18",
      "name": "Camarines Sur",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-19",
      "name": "Camiguin",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-20",
      "name": "Capiz",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-21",
      "name": "Catanduanes",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-22",
      "name": "Cavite",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-23",
      "name": "Cebu",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-24",
      "name": "Davao del Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-25",
      "name": "Davao del Sur",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-26",
      "name": "Davao Oriental",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-27",
      "name": "Eastern Samar",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-28",
      "name": "Ifugao",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-29",
      "name": "Ilocos Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-30",
      "name": "Ilocos Sur",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-31",
      "name": "Iloilo",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-32",
      "name": "Isabela",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-33",
      "name": "Kalinga-Apayao",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-34",
      "name": "Laguna",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-35",
      "name": "Lanao del Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-36",
      "name": "Lanao del Sur",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-37",
      "name": "La Union",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-38",
      "name": "Leyte",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-39",
      "name": "Maguindanao",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-40",
      "name": "Marinduque",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-41",
      "name": "Masbate",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-42",
      "name": "Mindoro Occidental",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-43",
      "name": "Mindoro Oriental",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-44",
      "name": "Misamis Occidental",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-45",
      "name": "Misamis Oriental",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-46",
      "name": "Mountain Province",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-47",
      "name": "Negros Occidental",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-48",
      "name": "Negros Oriental",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-49",
      "name": "North Cotabato",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-50",
      "name": "Northern Samar",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-51",
      "name": "Nueva Ecija",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-52",
      "name": "Nueva Vizcaya",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-53",
      "name": "Palawan",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-54",
      "name": "Pampanga",
      "kind": "province",
      "group": "US bases (Clark)"
    },
    {
      "id": "PH-55",
      "name": "Pangasinan",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-56",
      "name": "Quezon",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-57",
      "name": "Quirino",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-58",
      "name": "Rizal",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-59",
      "name": "Romblon",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-60",
      "name": "Samar",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-61",
      "name": "Siquijor",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-62",
      "name": "Sorsogon",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-63",
      "name": "South Cotabato",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-64",
      "name": "Southern Leyte",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-65",
      "name": "Sultan Kudarat",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-66",
      "name": "Sulu",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-67",
      "name": "Surigao del Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-68",
      "name": "Surigao del Sur",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-69",
      "name": "Tarlac",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-70",
      "name": "Tawi-Tawi",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-71",
      "name": "Zambales",
      "kind": "province",
      "group": "US bases (Subic)"
    },
    {
      "id": "PH-72",
      "name": "Zamboanga del Norte",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-73",
      "name": "Zamboanga del Sur",
      "kind": "province",
      "group": null
    },
    {
      "id": "PH-NCR",
      "name": "Metro Manila",
      "kind": "territory",
      "group": null
    }
  ],
  "cities": [
    [
      "bangued",
      "Bangued",
      "PH-01",
      17.6,
      120.62,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "butuan",
      "Butuan",
      "PH-02",
      8.95,
      125.54,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "prosperidad",
      "Prosperidad",
      "PH-03",
      8.61,
      125.92,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "kalibo",
      "Kalibo",
      "PH-04",
      11.71,
      122.36,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "legazpi",
      "Legazpi",
      "PH-05",
      13.14,
      123.74,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "san_jose",
      "San Jose",
      "PH-06",
      10.74,
      121.94,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "baler",
      "Baler",
      "PH-07",
      15.76,
      121.56,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "isabela",
      "Isabela",
      "PH-08",
      6.7,
      121.97,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "balanga",
      "Balanga",
      "PH-09",
      14.68,
      120.54,
      "capital",
      [
        "port"
      ]
    ],
    [
      "basco",
      "Basco",
      "PH-10",
      20.45,
      121.97,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "batangas",
      "Batangas",
      "PH-11",
      13.76,
      121.06,
      "capital",
      [
        "port"
      ]
    ],
    [
      "la_trinidad",
      "La Trinidad",
      "PH-12",
      16.46,
      120.59,
      "capital",
      [
        "vegetables"
      ]
    ],
    [
      "tagbilaran",
      "Tagbilaran",
      "PH-13",
      9.65,
      123.85,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "malaybalay",
      "Malaybalay",
      "PH-14",
      8.16,
      125.13,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "malolos",
      "Malolos",
      "PH-15",
      14.84,
      120.81,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "tuguegarao",
      "Tuguegarao",
      "PH-16",
      17.61,
      121.73,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "daet",
      "Daet",
      "PH-17",
      14.11,
      122.96,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "pili",
      "Pili",
      "PH-18",
      13.58,
      123.27,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "mambajao",
      "Mambajao",
      "PH-19",
      9.25,
      124.72,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "roxas",
      "Roxas",
      "PH-20",
      11.59,
      122.75,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "virac",
      "Virac",
      "PH-21",
      13.58,
      124.23,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "trece_martires",
      "Trece Martires",
      "PH-22",
      14.28,
      120.87,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "cebu",
      "Cebu",
      "PH-23",
      10.32,
      123.89,
      "capital",
      [
        "port",
        "administration"
      ]
    ],
    [
      "tagum",
      "Tagum",
      "PH-24",
      7.45,
      125.81,
      "capital",
      [
        "bananas"
      ]
    ],
    [
      "digos",
      "Digos",
      "PH-25",
      6.75,
      125.36,
      "capital",
      [
        "bananas"
      ]
    ],
    [
      "mati",
      "Mati",
      "PH-26",
      6.95,
      126.22,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "borongan",
      "Borongan",
      "PH-27",
      11.61,
      125.43,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "lagawe",
      "Lagawe",
      "PH-28",
      16.8,
      121.12,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "laoag",
      "Laoag",
      "PH-29",
      18.2,
      120.59,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "vigan",
      "Vigan",
      "PH-30",
      17.57,
      120.39,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "iloilo",
      "Iloilo",
      "PH-31",
      10.72,
      122.56,
      "capital",
      [
        "port",
        "rice"
      ]
    ],
    [
      "ilagan",
      "Ilagan",
      "PH-32",
      17.15,
      121.89,
      "capital",
      [
        "rice",
        "corn"
      ]
    ],
    [
      "tabuk",
      "Tabuk",
      "PH-33",
      17.45,
      121.44,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "santa_cruz",
      "Santa Cruz",
      "PH-34",
      14.28,
      121.42,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "tubod",
      "Tubod",
      "PH-35",
      8.05,
      123.79,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "marawi",
      "Marawi",
      "PH-36",
      8.0,
      124.29,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "san_fernando",
      "San Fernando",
      "PH-37",
      16.62,
      120.32,
      "capital",
      [
        "port"
      ]
    ],
    [
      "tacloban",
      "Tacloban",
      "PH-38",
      11.24,
      125.0,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "shariff_aguak",
      "Shariff Aguak",
      "PH-39",
      6.86,
      124.44,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "boac",
      "Boac",
      "PH-40",
      13.45,
      121.84,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "masbate",
      "Masbate",
      "PH-41",
      12.37,
      123.62,
      "capital",
      [
        "cattle"
      ]
    ],
    [
      "mamburao",
      "Mamburao",
      "PH-42",
      13.22,
      120.6,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "calapan",
      "Calapan",
      "PH-43",
      13.41,
      121.18,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "oroquieta",
      "Oroquieta",
      "PH-44",
      8.49,
      123.8,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "cagayan_de_oro",
      "Cagayan de Oro",
      "PH-45",
      8.45,
      124.63,
      "capital",
      [
        "port"
      ]
    ],
    [
      "bontoc",
      "Bontoc",
      "PH-46",
      17.09,
      120.98,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "bacolod",
      "Bacolod",
      "PH-47",
      10.68,
      122.95,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "dumaguete",
      "Dumaguete",
      "PH-48",
      9.31,
      123.31,
      "capital",
      [
        "sugarcane"
      ]
    ],
    [
      "kidapawan",
      "Kidapawan",
      "PH-49",
      7.01,
      125.09,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "catarman",
      "Catarman",
      "PH-50",
      12.5,
      124.64,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "palayan",
      "Palayan",
      "PH-51",
      15.54,
      121.08,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "bayombong",
      "Bayombong",
      "PH-52",
      16.48,
      121.15,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "puerto_princesa",
      "Puerto Princesa",
      "PH-53",
      9.74,
      118.74,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "san_fernando_54",
      "San Fernando",
      "PH-54",
      15.03,
      120.69,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "lingayen",
      "Lingayen",
      "PH-55",
      16.02,
      120.23,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "lucena",
      "Lucena",
      "PH-56",
      13.94,
      121.62,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "cabarroguis",
      "Cabarroguis",
      "PH-57",
      16.51,
      121.52,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "pasig",
      "Pasig",
      "PH-58",
      14.56,
      121.08,
      "capital",
      [
        "administration"
      ]
    ],
    [
      "romblon",
      "Romblon",
      "PH-59",
      12.58,
      122.27,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "catbalogan",
      "Catbalogan",
      "PH-60",
      11.78,
      124.88,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "siquijor",
      "Siquijor",
      "PH-61",
      9.21,
      123.51,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "sorsogon",
      "Sorsogon",
      "PH-62",
      12.97,
      124.0,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "koronadal",
      "Koronadal",
      "PH-63",
      6.5,
      124.85,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "maasin",
      "Maasin",
      "PH-64",
      10.13,
      124.84,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "isulan",
      "Isulan",
      "PH-65",
      6.63,
      124.61,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "jolo",
      "Jolo",
      "PH-66",
      6.05,
      121.0,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "surigao",
      "Surigao",
      "PH-67",
      9.79,
      125.5,
      "capital",
      [
        "nickel"
      ]
    ],
    [
      "tandag",
      "Tandag",
      "PH-68",
      9.08,
      126.2,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "tarlac",
      "Tarlac",
      "PH-69",
      15.48,
      120.6,
      "capital",
      [
        "rice"
      ]
    ],
    [
      "bongao",
      "Bongao",
      "PH-70",
      5.03,
      119.77,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "iba",
      "Iba",
      "PH-71",
      15.33,
      119.98,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "dipolog",
      "Dipolog",
      "PH-72",
      8.59,
      123.34,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "pagadian",
      "Pagadian",
      "PH-73",
      7.83,
      123.44,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "manila",
      "Manila",
      "PH-NCR",
      14.6,
      120.98,
      "capital",
      [
        "administration",
        "port"
      ]
    ]
  ],
  "links": [
    [
      "laoag",
      "basco",
      "sea",
      "Luzon Strait"
    ],
    [
      "legazpi",
      "virac",
      "sea",
      "Maqueda Channel"
    ],
    [
      "lucena",
      "boac",
      "sea",
      "Sibuyan Sea"
    ],
    [
      "batangas",
      "calapan",
      "sea",
      "Batangas-Calapan ferry"
    ],
    [
      "batangas",
      "mamburao",
      "sea",
      "Verde Island Passage"
    ],
    [
      "batangas",
      "puerto_princesa",
      "sea",
      "Sulu Sea"
    ],
    [
      "sorsogon",
      "masbate",
      "sea",
      "Ticao Pass"
    ],
    [
      "masbate",
      "roxas",
      "sea",
      "Visayan Sea"
    ],
    [
      "romblon",
      "roxas",
      "sea",
      "Romblon Pass"
    ],
    [
      "iloilo",
      "bacolod",
      "sea",
      "Guimaras Strait"
    ],
    [
      "dumaguete",
      "cebu",
      "sea",
      "Tanon Strait"
    ],
    [
      "cebu",
      "tagbilaran",
      "sea",
      "Bohol Strait"
    ],
    [
      "dumaguete",
      "siquijor",
      "sea",
      "Bohol Sea"
    ],
    [
      "manila",
      "cebu",
      "sea",
      "Visayan ferry"
    ],
    [
      "cebu",
      "tacloban",
      "sea",
      "Visayan ferry"
    ],
    [
      "tacloban",
      "surigao",
      "sea",
      "Surigao Strait"
    ],
    [
      "cagayan_de_oro",
      "mambajao",
      "sea",
      "Bohol Sea"
    ],
    [
      "pagadian",
      "isabela",
      "sea",
      "Moro Gulf"
    ],
    [
      "isabela",
      "jolo",
      "sea",
      "Sulu Sea"
    ],
    [
      "jolo",
      "bongao",
      "sea",
      "Sulu Sea"
    ],
    [
      "pasig",
      "manila",
      "road",
      "National road"
    ],
    [
      "malolos",
      "san_fernando_54",
      "road",
      "National road"
    ],
    [
      "bangued",
      "vigan",
      "road",
      "National road"
    ],
    [
      "malolos",
      "manila",
      "road",
      "National road"
    ],
    [
      "legazpi",
      "sorsogon",
      "road",
      "National road"
    ],
    [
      "balanga",
      "malolos",
      "road",
      "National road"
    ],
    [
      "la_trinidad",
      "san_fernando",
      "road",
      "National road"
    ],
    [
      "lagawe",
      "bayombong",
      "road",
      "National road"
    ],
    [
      "lagawe",
      "bontoc",
      "road",
      "National road"
    ],
    [
      "tuguegarao",
      "tabuk",
      "road",
      "National road"
    ],
    [
      "trece_martires",
      "manila",
      "road",
      "National road"
    ],
    [
      "bayombong",
      "cabarroguis",
      "road",
      "National road"
    ],
    [
      "santa_cruz",
      "lucena",
      "road",
      "National road"
    ],
    [
      "santa_cruz",
      "pasig",
      "road",
      "National road"
    ],
    [
      "san_fernando_54",
      "tarlac",
      "road",
      "National road"
    ],
    [
      "palayan",
      "tarlac",
      "road",
      "National road"
    ],
    [
      "tuguegarao",
      "ilagan",
      "road",
      "National road"
    ],
    [
      "baler",
      "palayan",
      "road",
      "National road"
    ],
    [
      "batangas",
      "trece_martires",
      "road",
      "National road"
    ],
    [
      "la_trinidad",
      "bayombong",
      "road",
      "National road"
    ],
    [
      "la_trinidad",
      "lingayen",
      "road",
      "National road"
    ],
    [
      "tabuk",
      "bontoc",
      "road",
      "National road"
    ],
    [
      "bangued",
      "laoag",
      "road",
      "National road"
    ],
    [
      "daet",
      "pili",
      "road",
      "National road"
    ],
    [
      "bangued",
      "bontoc",
      "road",
      "National road"
    ],
    [
      "tarlac",
      "iba",
      "road",
      "National road"
    ],
    [
      "legazpi",
      "pili",
      "road",
      "National road"
    ],
    [
      "lingayen",
      "tarlac",
      "road",
      "National road"
    ],
    [
      "daet",
      "lucena",
      "road",
      "National road"
    ],
    [
      "koronadal",
      "isulan",
      "road",
      "National road"
    ],
    [
      "shariff_aguak",
      "isulan",
      "road",
      "National road"
    ],
    [
      "digos",
      "kidapawan",
      "road",
      "National road"
    ],
    [
      "tubod",
      "pagadian",
      "road",
      "National road"
    ],
    [
      "tubod",
      "oroquieta",
      "road",
      "National road"
    ],
    [
      "oroquieta",
      "dipolog",
      "road",
      "National road"
    ],
    [
      "tubod",
      "marawi",
      "road",
      "National road"
    ],
    [
      "butuan",
      "prosperidad",
      "road",
      "National road"
    ],
    [
      "prosperidad",
      "tandag",
      "road",
      "National road"
    ],
    [
      "kidapawan",
      "koronadal",
      "road",
      "National road"
    ],
    [
      "marawi",
      "cagayan_de_oro",
      "road",
      "National road"
    ],
    [
      "malaybalay",
      "cagayan_de_oro",
      "road",
      "National road"
    ],
    [
      "tagum",
      "mati",
      "road",
      "National road"
    ],
    [
      "tagum",
      "digos",
      "road",
      "National road"
    ],
    [
      "butuan",
      "surigao",
      "road",
      "National road"
    ],
    [
      "butuan",
      "malaybalay",
      "road",
      "National road"
    ],
    [
      "malaybalay",
      "tagum",
      "road",
      "National road"
    ],
    [
      "kalibo",
      "roxas",
      "road",
      "National road"
    ],
    [
      "san_jose",
      "iloilo",
      "road",
      "National road"
    ],
    [
      "roxas",
      "iloilo",
      "road",
      "National road"
    ],
    [
      "tacloban",
      "catbalogan",
      "road",
      "National road"
    ],
    [
      "borongan",
      "tacloban",
      "road",
      "National road"
    ],
    [
      "catarman",
      "catbalogan",
      "road",
      "National road"
    ],
    [
      "tacloban",
      "maasin",
      "road",
      "National road"
    ],
    [
      "mamburao",
      "calapan",
      "road",
      "National road"
    ],
    [
      "bacolod",
      "dumaguete",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "ph_0",
    "name": "Diego Santos",
    "title": "President",
    "rank": "President",
    "branch": "Armed Forces of the Philippines",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Philippines, posted at bangued (ph_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ph.bangued"
  },
  {
    "id": "ph_1",
    "name": "Andres Reyes",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Armed Forces of the Philippines",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Philippines, posted at butuan (ph_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ph.butuan"
  },
  {
    "id": "ph_2",
    "name": "Mateo Cruz",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Armed Forces of the Philippines",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Philippines, posted at prosperidad (ph_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ph.prosperidad"
  },
  {
    "id": "ph_3",
    "name": "Lorenzo Bautista",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Armed Forces of the Philippines",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Philippines, posted at kalibo (ph_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ph.kalibo"
  },
  {
    "id": "ph_4",
    "name": "Emilio Garcia",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Armed Forces of the Philippines",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Philippines, posted at legazpi (ph_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ph.legazpi"
  },
  {
    "id": "ph_5",
    "name": "Rafael Mendoza",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Armed Forces of the Philippines",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Philippines, posted at san jose (ph_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ph.san_jose"
  },
  {
    "id": "ph_6",
    "name": "Joaquin Villanueva",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Armed Forces of the Philippines",
    "slot": "front_commander",
    "war": 76,
    "int": 47,
    "pol": 38,
    "chr": 38,
    "personality": "ambitious",
    "bio": "Fictional Front commander of Philippines, posted at baler (ph_6). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ph.baler"
  },
  {
    "id": "ph_7",
    "name": "Esteban Castillo",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Armed Forces of the Philippines",
    "slot": "front_commander",
    "war": 79,
    "int": 52,
    "pol": 36,
    "chr": 35,
    "personality": "recluse",
    "bio": "Fictional Front commander of Philippines, posted at isabela (ph_7). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "ph.isabela"
  }
])
});

export const PAPUA_NEW_GUINEA_REGION = land({
  "id": "pg",
  "name": "Papua New Guinea",
  "country": "PG",
  "bbox": {
    "minLon": 140.55,
    "maxLon": 156.32,
    "minLat": -11.06,
    "maxLat": -1.27
  },
  "notes": "Atlas only. Nineteen provinces plus the National Capital District. North Solomons keeps that name. Panguna copper and gold produced through most of the window; the mine closed in 1989, and the province is marked for the 1988 conflict. East New Britain is seated at Rabaul. No Hela or Jiwaka. No Kutubu oil. Coffee, cocoa, copper, gold, and timber. Occupied and off the week-0 march.",
  "defaultBiome": "tropical",
  "climate": {
    "_default": {
      "sun": 4,
      "weather": 3
    }
  },
  "biome": {},
  "subs": [
    {
      "id": "PG-NCD",
      "name": "National Capital District",
      "kind": "district",
      "group": null
    },
    {
      "id": "PG-WE",
      "name": "Western",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-GU",
      "name": "Gulf",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-CE",
      "name": "Central",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-MB",
      "name": "Milne Bay",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-OR",
      "name": "Oro",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-MO",
      "name": "Morobe",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-MD",
      "name": "Madang",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-ES",
      "name": "East Sepik",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-WS",
      "name": "West Sepik",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-MN",
      "name": "Manus",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-NI",
      "name": "New Ireland",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-EN",
      "name": "East New Britain",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-WN",
      "name": "West New Britain",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-NS",
      "name": "North Solomons",
      "kind": "province",
      "group": "Bougainville conflict (1988)"
    },
    {
      "id": "PG-EG",
      "name": "Enga",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-SH",
      "name": "Southern Highlands",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-WH",
      "name": "Western Highlands",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-CH",
      "name": "Chimbu",
      "kind": "province",
      "group": null
    },
    {
      "id": "PG-EH",
      "name": "Eastern Highlands",
      "kind": "province",
      "group": null
    }
  ],
  "cities": [
    [
      "port_moresby",
      "Port Moresby",
      "PG-NCD",
      -9.48,
      147.19,
      "capital",
      [
        "administration",
        "port"
      ]
    ],
    [
      "daru",
      "Daru",
      "PG-WE",
      -9.08,
      143.21,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "kerema",
      "Kerema",
      "PG-GU",
      -7.96,
      145.77,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "kwikila",
      "Kwikila",
      "PG-CE",
      -9.82,
      147.72,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "alotau",
      "Alotau",
      "PG-MB",
      -10.31,
      150.46,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "popondetta",
      "Popondetta",
      "PG-OR",
      -8.77,
      148.23,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "lae",
      "Lae",
      "PG-MO",
      -6.73,
      147.0,
      "capital",
      [
        "port",
        "timber"
      ]
    ],
    [
      "madang",
      "Madang",
      "PG-MD",
      -5.22,
      145.79,
      "capital",
      [
        "port",
        "cocoa"
      ]
    ],
    [
      "wewak",
      "Wewak",
      "PG-ES",
      -3.55,
      143.64,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "vanimo",
      "Vanimo",
      "PG-WS",
      -2.67,
      141.3,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "lorengau",
      "Lorengau",
      "PG-MN",
      -2.02,
      147.27,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "kavieng",
      "Kavieng",
      "PG-NI",
      -2.58,
      150.8,
      "capital",
      [
        "fisheries"
      ]
    ],
    [
      "rabaul",
      "Rabaul",
      "PG-EN",
      -4.2,
      152.17,
      "capital",
      [
        "cocoa"
      ]
    ],
    [
      "kimbe",
      "Kimbe",
      "PG-WN",
      -5.55,
      150.14,
      "capital",
      [
        "timber"
      ]
    ],
    [
      "arawa",
      "Arawa",
      "PG-NS",
      -6.23,
      155.57,
      "capital",
      [
        "copper",
        "gold"
      ]
    ],
    [
      "wabag",
      "Wabag",
      "PG-EG",
      -5.49,
      143.72,
      "capital",
      [
        "gold"
      ]
    ],
    [
      "mendi",
      "Mendi",
      "PG-SH",
      -6.15,
      143.66,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "mount_hagen",
      "Mount Hagen",
      "PG-WH",
      -5.86,
      144.23,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "kundiawa",
      "Kundiawa",
      "PG-CH",
      -6.02,
      144.97,
      "capital",
      [
        "coffee"
      ]
    ],
    [
      "goroka",
      "Goroka",
      "PG-EH",
      -6.08,
      145.39,
      "capital",
      [
        "coffee"
      ]
    ]
  ],
  "links": [
    [
      "lae",
      "lorengau",
      "sea",
      "Bismarck Sea"
    ],
    [
      "lae",
      "kavieng",
      "sea",
      "Bismarck Sea"
    ],
    [
      "lae",
      "rabaul",
      "sea",
      "Bismarck Sea"
    ],
    [
      "rabaul",
      "kimbe",
      "sea",
      "Bismarck Sea"
    ],
    [
      "rabaul",
      "arawa",
      "sea",
      "Solomon Sea"
    ],
    [
      "madang",
      "wewak",
      "sea",
      "Bismarck Sea"
    ],
    [
      "kundiawa",
      "goroka",
      "road",
      "National road"
    ],
    [
      "port_moresby",
      "kwikila",
      "road",
      "National road"
    ],
    [
      "wabag",
      "mount_hagen",
      "road",
      "National road"
    ],
    [
      "mendi",
      "mount_hagen",
      "road",
      "National road"
    ],
    [
      "mount_hagen",
      "kundiawa",
      "road",
      "National road"
    ],
    [
      "madang",
      "goroka",
      "road",
      "National road"
    ],
    [
      "kwikila",
      "popondetta",
      "road",
      "National road"
    ],
    [
      "lae",
      "goroka",
      "road",
      "National road"
    ],
    [
      "kerema",
      "lae",
      "road",
      "National road"
    ],
    [
      "port_moresby",
      "kerema",
      "road",
      "National road"
    ],
    [
      "wewak",
      "vanimo",
      "road",
      "National road"
    ],
    [
      "alotau",
      "popondetta",
      "road",
      "National road"
    ],
    [
      "daru",
      "kerema",
      "road",
      "National road"
    ]
  ],
  "officers": staff([
  {
    "id": "pg_0",
    "name": "Alden Wagi",
    "title": "President",
    "rank": "President",
    "branch": "Papua New Guinea Defence Force",
    "slot": "head_of_state",
    "war": 43,
    "int": 60,
    "pol": 68,
    "chr": 63,
    "personality": "aggressive",
    "bio": "Fictional President of Papua New Guinea, posted at port moresby (pg_0). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pg.port_moresby"
  },
  {
    "id": "pg_1",
    "name": "Bram Malo",
    "title": "Defense minister",
    "rank": "Lieutenant General",
    "branch": "Papua New Guinea Defence Force",
    "slot": "defense_minister",
    "war": 68,
    "int": 55,
    "pol": 49,
    "chr": 41,
    "personality": "cautious",
    "bio": "Fictional Defense minister of Papua New Guinea, posted at daru (pg_1). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pg.daru"
  },
  {
    "id": "pg_2",
    "name": "Corin Pora",
    "title": "Chief of staff",
    "rank": "Major General",
    "branch": "Papua New Guinea Defence Force",
    "slot": "chief_of_staff",
    "war": 63,
    "int": 65,
    "pol": 45,
    "chr": 40,
    "personality": "diplomat",
    "bio": "Fictional Chief of staff of Papua New Guinea, posted at kerema (pg_2). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pg.kerema"
  },
  {
    "id": "pg_3",
    "name": "Davin Sine",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Papua New Guinea Defence Force",
    "slot": "front_commander",
    "war": 78,
    "int": 50,
    "pol": 35,
    "chr": 40,
    "personality": "schemer",
    "bio": "Fictional Front commander of Papua New Guinea, posted at kwikila (pg_3). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pg.kwikila"
  },
  {
    "id": "pg_4",
    "name": "Elric Ako",
    "title": "Field officer",
    "rank": "Colonel",
    "branch": "Papua New Guinea Defence Force",
    "slot": "field_officer",
    "war": 62,
    "int": 40,
    "pol": 31,
    "chr": 35,
    "personality": "merchant",
    "bio": "Fictional Field officer of Papua New Guinea, posted at alotau (pg_4). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pg.alotau"
  },
  {
    "id": "pg_5",
    "name": "Fenn Mero",
    "title": "Front commander",
    "rank": "Brigadier",
    "branch": "Papua New Guinea Defence Force",
    "slot": "front_commander",
    "war": 73,
    "int": 51,
    "pol": 40,
    "chr": 41,
    "personality": "loyalist",
    "bio": "Fictional Front commander of Papua New Guinea, posted at popondetta (pg_5). Files the border reports. Not a real officeholder of 1985-89.",
    "region": "pg.popondetta"
  }
])
});
