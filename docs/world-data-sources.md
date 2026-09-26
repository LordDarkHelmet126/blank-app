# World data sources

Northern Front’s atlas is original. Commodity picks are for **1985–89**, not the present day. Each region module under `data/world/regions/` names its cities, links, and yields. `tests/world-validate.mjs` checks the structure.

## Shared resource list

`data/world/resources.js` is the only legal yield vocabulary (corn, coal, oil, and the rest). A territory that names something else fails the validator.

## Region 1 — United States

| What | Where it comes from |
| --- | --- |
| State list | 50 states plus the District of Columbia. Rectangular bounding boxes follow the usual census extremes (including Alaska’s mainland and Aleutians as far as Dutch Harbor, and Hawaii). |
| City pins | Downtown coordinates for real cities. State capitals are marked `capital`. |
| Roads and rail | Interstate and U.S. highway corridors (I-5, I-10, I-35, I-40, I-70, I-80, I-90, I-94, I-95, and the shorter links named on each edge). A few transcontinental edges are tagged `rail` where a 1980s main line ran with the highway (Union Pacific on I-80, the northern route on I-90). |
| Sea lanes | Alaska Marine Highway (Juneau–Seattle and the inside-passage ferry to Anchorage’s gulf), Gulf of Alaska and Bering barge routes (Kodiak, Bethel, Nome, Dutch Harbor), and ordinary Pacific shipping (Honolulu to Seattle, San Francisco, and San Diego). Nome is not given a highway. |
| Crops and livestock | USDA *Agricultural Statistics* (mid-1980s editions) and the 1987 Census of Agriculture. Examples used on the map: Iowa corn, hogs, and soybeans; Nebraska and Kansas wheat and cattle; California rice, grapes, cotton, and citrus; Florida citrus, sugarcane, and vegetables; Hawaii sugarcane and pineapple (both still in commercial production, sugar already shrinking). |
| Minerals and fuels | USGS *Minerals Yearbook* area reports, 1985–89, and EIA petroleum and coal summaries for the same years. Examples: Wyoming coal, oil, and uranium; Texas and Louisiana oil and gas; Minnesota iron ore; Arizona and Utah copper; North Dakota lignite and the smaller pre-Bakken oil patch; Florida phosphate; Arkansas bauxite. |
| Steel and ports | Steel towns still pouring in the late 1980s (Chicago, Detroit, Cleveland, Pittsburgh, Birmingham, Baltimore, Buffalo). Ports follow the real harbors tagged `port` (Seattle, Los Angeles, Houston, New Orleans, Norfolk, New York, and the others). |
| Administration | The District of Columbia yields `administration`. It is not given a farm or a mine. |

Florida–Cuba and the Bering far shore are **not** new march edges. The campaign already has Gulf Sealift and the Bering desk. Those stay locked to their phases. The atlas does not add a Cuba node.

## Leadership

Command names in the region files are **fictional**. Ranks and branches match U.S. practice in 1985–89 (President, Secretary of Defense, Chairman of the Joint Chiefs, fleet and theater commanders, field grades). They use the same personality ids as `data/officers.json` and the same WAR / INT / POL / CHR stats, but they are not copied onto the week-0 actor list, so the Cheyenne campaign does not gain a new court.

## Later regions

The same resource list and validator apply. Country notes for Germany, Mexico, and the rest will be added on those region files, still from the public yearbooks above plus the CIA *World Factbook* editions of 1987, 1988, and 1989.
