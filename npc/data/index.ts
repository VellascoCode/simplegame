import type { NpcDefinition } from "./types";
import guardAmber from "./cidadecentral/guard-amber.json";
import guardAzure from "./cidadecentral/guard-azure.json";
import guardForest from "./cidadecentral/guard-forest.json";
import guardCrimson from "./cidadecentral/guard-crimson.json";
import villagerTyna from "./cidadecentral/villager-tyna.json";
import villagerArna from "./cidadecentral/villager-arna.json";
import villagerSolia from "./cidadecentral/villager-solia.json";
import villagerMaja from "./cidadecentral/villager-maja.json";

const RAW_NPCS = [guardAmber, guardAzure, guardForest, guardCrimson, villagerTyna, villagerArna, villagerSolia, villagerMaja];

export const NPC_DATA: NpcDefinition[] = RAW_NPCS.map((npc) => npc as NpcDefinition);

export function getNpcsForMap(mapName: string): NpcDefinition[] {
  const normalized = mapName.toLowerCase();
  return NPC_DATA.filter((npc) => npc.map.toLowerCase() === normalized);
}

export type { NpcDefinition };
