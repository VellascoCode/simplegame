import { readCityMap, saveCityMap } from "@/lib/mapStore";
import type { CityMapData } from "@/lib/mapTypes";

export async function loadCityMap() {
  return readCityMap();
}

export async function persistCityMap(map: CityMapData) {
  return saveCityMap(map);
}
