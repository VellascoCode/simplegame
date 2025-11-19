import type { MonsterDefinition } from "./types";
import sentinel from "./refugio/sentinel.json";
import emberGuardian from "./refugio/ember_guardian.json";
import frostGuardian from "./refugio/frost_guardian.json";
import verdantGuardian from "./refugio/verdant_guardian.json";
import shadowChampion from "./refugio/shadow_champion.json";
import ancientOverlord from "./refugio/ancient_overlord.json";

const RAW_MONSTERS = [sentinel, emberGuardian, frostGuardian, verdantGuardian, shadowChampion, ancientOverlord];

const MONSTER_DATA: MonsterDefinition[] = RAW_MONSTERS.map((entry) => entry as MonsterDefinition);

export function getMonstersForMap(mapName: string): MonsterDefinition[] {
  const normalized = mapName.toLowerCase();
  return MONSTER_DATA.filter((monster) => monster.map.toLowerCase() === normalized);
}

export type { MonsterDefinition };
