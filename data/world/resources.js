/** Shared commodity list for world regions. Yields must use these ids. */

export const RESOURCES = [
  { id: "corn", group: "farm", label: "Corn" },
  { id: "soybeans", group: "farm", label: "Soybeans" },
  { id: "wheat", group: "farm", label: "Wheat" },
  { id: "sorghum", group: "farm", label: "Sorghum" },
  { id: "barley", group: "farm", label: "Barley" },
  { id: "oats", group: "farm", label: "Oats" },
  { id: "cotton", group: "farm", label: "Cotton" },
  { id: "rice", group: "farm", label: "Rice" },
  { id: "hay", group: "farm", label: "Hay" },
  { id: "sugar_beets", group: "farm", label: "Sugar beets" },
  { id: "sugarcane", group: "farm", label: "Sugarcane" },
  { id: "citrus", group: "farm", label: "Citrus" },
  { id: "potatoes", group: "farm", label: "Potatoes" },
  { id: "dairy", group: "farm", label: "Dairy" },
  { id: "cattle", group: "farm", label: "Cattle" },
  { id: "hogs", group: "farm", label: "Hogs" },
  { id: "poultry", group: "farm", label: "Poultry" },
  { id: "tobacco", group: "farm", label: "Tobacco" },
  { id: "peanuts", group: "farm", label: "Peanuts" },
  { id: "apples", group: "farm", label: "Apples" },
  { id: "grapes", group: "farm", label: "Grapes" },
  { id: "vegetables", group: "farm", label: "Vegetables" },
  { id: "timber", group: "farm", label: "Timber" },
  { id: "pineapple", group: "farm", label: "Pineapple" },
  { id: "coal", group: "mine", label: "Coal" },
  { id: "lignite", group: "mine", label: "Lignite" },
  { id: "iron", group: "mine", label: "Iron ore" },
  { id: "copper", group: "mine", label: "Copper" },
  { id: "gold", group: "mine", label: "Gold" },
  { id: "silver", group: "mine", label: "Silver" },
  { id: "lead", group: "mine", label: "Lead" },
  { id: "zinc", group: "mine", label: "Zinc" },
  { id: "nickel", group: "mine", label: "Nickel" },
  { id: "asbestos", group: "mine", label: "Asbestos" },
  { id: "molybdenum", group: "mine", label: "Molybdenum" },
  { id: "phosphate", group: "mine", label: "Phosphate" },
  { id: "potash", group: "mine", label: "Potash" },
  { id: "uranium", group: "mine", label: "Uranium" },
  { id: "bauxite", group: "mine", label: "Bauxite" },
  { id: "salt", group: "mine", label: "Salt" },
  { id: "stone", group: "mine", label: "Stone" },
  { id: "sulfur", group: "mine", label: "Sulfur" },
  { id: "steel", group: "industry", label: "Steel" },
  { id: "aluminum", group: "industry", label: "Aluminum" },
  { id: "autos", group: "industry", label: "Autos" },
  { id: "oil", group: "fuel", label: "Oil" },
  { id: "natural_gas", group: "fuel", label: "Natural gas" },
  { id: "fisheries", group: "water", label: "Fisheries" },
  { id: "hydro", group: "water", label: "Hydro" },
  { id: "port", group: "water", label: "Port" },
  { id: "administration", group: "civic", label: "Administration" },
];

export const RESOURCE_IDS = new Set(RESOURCES.map((r) => r.id));

const FARM = new Set(RESOURCES.filter((r) => r.group === "farm").map((r) => r.id));
const MINE = new Set(RESOURCES.filter((r) => r.group === "mine" || r.group === "industry").map((r) => r.id));
const FUEL = new Set(RESOURCES.filter((r) => r.group === "fuel").map((r) => r.id));
const WATER = new Set(RESOURCES.filter((r) => r.group === "water").map((r) => r.id));

function tally(yields, set) {
  return Math.min(3, yields.filter((id) => set.has(id)).length);
}

/** Numeric tags the campaign already understands, derived from commodity yields. */
export function geoFromYields(yields, climate, role, subdivision) {
  const list = yields || [];
  let defense = 0;
  if (subdivision === "DC") defense = 3;
  else if (list.includes("port")) defense = 2;
  else if (role === "capital") defense = 1;
  return {
    farm: tally(list, FARM),
    mine: tally(list, MINE),
    fuel: tally(list, FUEL),
    water: tally(list, WATER),
    sun: climate?.sun ?? 1,
    weather: climate?.weather ?? 1,
    defense,
  };
}
