import type { CityMapData } from "@/lib/mapTypes";

import { readCityMap, saveCityMap } from "@/lib/mapStore";

export async function loadCityMap() {
  return readCityMap();
}

export async function persistCityMap(map: CityMapData) {
  return saveCityMap(map);
}
