import type { NpcDefinition } from "./types";
import elisa from "./villagers/elisa.json";
import rafa from "./villagers/rafa.json";
import clara from "./villagers/clara.json";
import nico from "./villagers/nico.json";
import guardNorth from "./guards/guard-north.json";
import guardSouth from "./guards/guard-south.json";
import guardEast from "./guards/guard-east.json";
import guardWest from "./guards/guard-west.json";

const RAW_NPCS = [elisa, rafa, clara, nico, guardNorth, guardSouth, guardEast, guardWest];

export const NPC_DATA: NpcDefinition[] = RAW_NPCS.map((npc) => npc as NpcDefinition);

export function getNpcsForMap(mapName: string): NpcDefinition[] {
  const normalized = mapName.toLowerCase();
  return NPC_DATA.filter((npc) => npc.map.toLowerCase() === normalized);
}

export type { NpcDefinition };
