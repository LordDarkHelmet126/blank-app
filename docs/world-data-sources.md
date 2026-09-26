# World data sources

Northern Front’s atlas is original. Commodity picks are for **1985–89**, not the present day. Each region module under `data/world/regions/` names its cities, links, and yields. `tests/world-validate.mjs` checks the structure.

## Shared resource list

`data/world/resources.js` is the only legal yield vocabulary (corn, coal, oil, and the rest). A territory that names something else fails the validator.

## Region 1 — United States

| What | Where it comes from |
| --- | --- |
| State list | 50 states plus the District of Columbia. Rectangular bounding boxes follow the usual census extremes, including the Aleutians through Attu and Hawaii. |
| City pins | Downtown coordinates for real cities. State capitals are marked `capital`. |
| Roads and rail | Interstate and U.S. highway corridors (I-5, I-10, I-35, I-40, I-70, I-80, I-90, I-94, I-95, and the shorter links named on each edge). Long hops are broken at real intermediate cities: I-10 at Fort Stockton and Kerrville, I-95 in Florida at Daytona Beach, Melbourne, and West Palm Beach, I-5 at Medford and Redding, I-90 in New York at Rochester and Syracuse, I-75 at Chattanooga and up to Sault Ste. Marie. A few transcontinental edges are tagged `rail` where a 1980s main line ran with the highway (Union Pacific on I-80, the northern route on I-90). |
| Sea lanes | Alaska Marine Highway (Juneau–Seattle, Juneau–Skagway, and the inside-passage ferry toward Anchorage’s gulf and Prince Rupert), Gulf of Alaska and Bering barge routes (Kodiak, Bethel, Nome, Dutch Harbor), Aleutian shipping west through Adak to Attu, and ordinary Pacific shipping (Honolulu to Seattle, San Francisco, and San Diego). Nome and Attu are not given highways. |
| Crops and livestock | USDA *Agricultural Statistics* (mid-1980s editions) and the 1987 Census of Agriculture. Examples used on the map: Iowa corn, hogs, and soybeans; Nebraska and Kansas wheat and cattle; California rice, grapes, cotton, and citrus; Florida citrus, sugarcane, and vegetables; Hawaii sugarcane and pineapple (both still in commercial production, sugar already shrinking). |
| Minerals and fuels | USGS *Minerals Yearbook* area reports, 1985–89, and EIA petroleum and coal summaries for the same years. Examples: Wyoming coal, oil, and uranium; Texas and Louisiana oil and gas, plus the Permian Basin at Midland; Minnesota iron ore; Arizona and Utah copper; North Dakota lignite and the smaller pre-Bakken oil patch; Florida phosphate; Arkansas bauxite; Missouri lead from the Viburnum Trend (Joplin stands for the older Tri-State district). |
| Steel and ports | Steel towns still pouring in the late 1980s (Chicago, Detroit, Cleveland, Pittsburgh, Birmingham, Baltimore, Buffalo). Ports follow the real harbors tagged `port` (Seattle, Los Angeles, Houston, New Orleans, Norfolk, New York, and the others). |
| Administration | The District of Columbia yields `administration`. It is not given a farm or a mine. |

Florida–Cuba and the Bering far shore are **not** new march edges. The campaign already has Gulf Sealift and the Bering desk. Those stay locked to their phases. The atlas does not add a Cuba node.

## Region 2 — Canada

| What | Where it comes from |
| --- | --- |
| Provinces and territories | Ten provinces. In 1985–89 there were two territories: Yukon and the Northwest Territories. Nunavut was still part of the Northwest Territories (it was created in 1999), so Iqaluit is an NWT city. CIA *World Factbook* 1987–89. |
| City pins | Downtown coordinates for real cities. Provincial and territorial capitals are marked `capital`. Ottawa is the national capital and is not the capital of Ontario. |
| Roads | Trans-Canada Highway, Yellowhead and Hwy 97 in British Columbia, Alaska Highway (Dawson Creek through Whitehorse to the Alaska line), Klondike Highway, Dempster Highway (open since 1979), Mackenzie Highway, Quebec’s Hwy 40 / 20 / 417 and the James Bay Road, Ontario’s 401 and QEW. Prince Edward Island is the Borden–Cape Tormentine ferry. The Confederation Bridge opened in 1997 and is not on this map. Newfoundland is Marine Atlantic from North Sydney (year-round to Port aux Basques, seasonal to Argentia). Vancouver Island is BC Ferries. |
| Rail | CP and CN main lines (Vancouver–Calgary, Regina–Winnipeg, Edmonton–Saskatoon–Winnipeg, Winnipeg–Thunder Bay), CN to Prince Rupert, the Quebec North Shore & Labrador railway to Labrador City, and the Hudson Bay Railway to Churchill. |
| Border crossings | Real roads only: Peace Arch (I-5 / BC-99), Sweetgrass–Coutts (I-15), Pembina–Emerson (I-29), the Sault International Bridge, the Ambassador Bridge, the Peace Bridge, Champlain–Lacolle (I-87 / A-15), Houlton–Woodstock (I-95 / NB-95), the Alaska Highway, and the Klondike Highway. Juneau–Prince Rupert reuses the Alaska Marine Highway. |
| Crops and fuels | Statistics Canada and the CIA *World Factbook* 1987–89, with the National Energy Board’s picture of the decade. Alberta: conventional oil, oil sands at Fort McMurray (Suncor and Syncrude were both producing), natural gas, cattle, and wheat. Saskatchewan: wheat, potash (the province dominated world potash), and Athabasca Basin uranium (Key Lake and Rabbit Lake), pinned at Saskatoon, Prince Albert, and La Ronge. |
| Minerals and industry | Natural Resources Canada and the USGS *Minerals Yearbook* world chapters, 1985–89. Ontario nickel at Sudbury (Inco) and Manitoba nickel at Thompson; Timmins gold; Quebec asbestos at Thetford Mines (Canada led world asbestos output); aluminum at Saguenay (Arvida) and Kitimat, both hydro-powered; James Bay hydro at Radisson; Labrador iron and Churchill Falls hydro; British Columbia timber, Elk Valley coal (Fernie), and Pacific salmon (mapped as `fisheries`); Cape Breton coal; Maritime and Newfoundland fisheries; Yukon gold and the Faro lead-zinc camp (reopened in 1986); Yellowknife gold and Pine Point lead-zinc (the mine closed in 1988, so Hay River still carries it for this span). Hibernia was discovered but not yet producing, so St. John’s is fisheries and a port, not oil. Autos are the Ontario industry yield (Windsor, Oshawa, Toronto). |

## Leadership

Command names in the region files are **fictional**. No real officeholders.

United States ranks follow 1985–89 practice: President, Secretary of Defense, Chairman of the Joint Chiefs, fleet and theater commanders, and field grades. The occupation prefecture and the resistance net are fictional commands on top of that continuity government. Notable officers are posted by region (Northeast, Southeast, Midwest, Plains, Mountain West, Southwest, Pacific, Alaska and Hawaii). Canadian ranks follow the unified Canadian Forces of the 1980s: Prime Minister, Minister of National Defence, Chief of the Defence Staff, Forces Mobile Command, Maritime Command, Air Command, and regional commanders. French and English names are used where the posting makes that ordinary. They use the same personality ids as `data/officers.json` and the same WAR / INT / POL / CHR stats, but they are not copied onto the week-0 actor list, so the Cheyenne campaign does not gain a new court.

## Later regions

The same resource list and validator apply. Country notes for Germany, Mexico, and the rest will be added on those region files, still from the public yearbooks above plus the CIA *World Factbook* editions of 1987, 1988, and 1989.
