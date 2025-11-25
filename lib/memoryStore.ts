import type { BestiaryProfile } from "@/models/Bestiary";

import type {
  Character,
  ChatMessage,
  FarmState,
  HouseState,
  InventoryItem,
  OnlinePresence,
  PlayerSessionState,
  QuickSlotLayout,
  User
} from "./models";

type MemoryDB = {
  users: User[];
  characters: Character[];
  inventory: Record<string, InventoryItem[]>;
  houses: HouseState[];
  farms: FarmState[];
  chat: ChatMessage[];
  online: OnlinePresence[];
  sessions: PlayerSessionState[];
  quickSlots: QuickSlotLayout[];
  bestiary: BestiaryProfile[];
  mapArtifacts: Record<
    string,
    {
      corpses: Array<{ id: string; tile: { x: number; y: number }; expiresAt: number }>;
      loot: Array<{
        id: string;
        itemId: string;
        name: string;
        icon: string;
        tile: { x: number; y: number };
        quantity: number;
        expiresAt: number;
        stackable?: boolean;
        maxStack?: number;
      }>;
    }
  >;
};

const memoryDb: MemoryDB = {
  users: [],
  characters: [],
  inventory: {},
  houses: [],
  farms: [],
  chat: [],
  online: [],
  sessions: [],
  quickSlots: [],
  bestiary: [],
  mapArtifacts: {}
};

export function getMemoryDB() {
  return memoryDb;
}
