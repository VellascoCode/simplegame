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
  quickSlots: []
};

export function getMemoryDB() {
  return memoryDb;
}
