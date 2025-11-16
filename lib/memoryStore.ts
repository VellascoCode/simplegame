import type {
  ChatMessage,
  Character,
  FarmState,
  HouseState,
  InventoryItem,
  OnlinePresence,
  PlayerSessionState,
  QuickSlotLayout,
  User
} from "./models";
import type { BestiaryProfile } from "@/models/Bestiary";

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
  bestiary: []
};

export function getMemoryDB() {
  return memoryDb;
}
