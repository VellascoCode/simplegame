import { z } from "zod";

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  stackable?: boolean;
  maxStack?: number;
};

export type User = {
  _id?: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
};

export type CharacterStats = {
  level: number;
  xp: number;
  hp: number;
  energy: number;
};

export type Character = {
  _id?: string;
  ownerId: string;
  name: string;
  sprite: string;
  inventory: InventoryItem[];
  stats: CharacterStats;
  gold: number;
  createdAt: string;
  updatedAt: string;
};

export type HouseFurniture = {
  id: string;
  name: string;
  position: { x: number; y: number };
};

export type HouseState = {
  ownerId: string;
  furniture: HouseFurniture[];
};

export type FarmPlot = {
  id: string;
  seed: string | null;
  plantedAt: string | null;
  harvestReadyAt: string | null;
};

export type FarmState = {
  ownerId: string;
  plots: FarmPlot[];
};

export type ChatMessage = {
  id: string;
  ownerId: string;
  characterName?: string;
  message: string;
  createdAt: string;
};

export type OnlinePresence = {
  ownerId: string;
  lastPing: string;
};

export type PlayerSessionState = {
  ownerId: string;
  characterId: string;
  characterName?: string;
  map: string;
  position: { x: number; y: number };
  updatedAt: string;
};

export type QuickSlotLayout = {
  ownerId: string;
  slots: Array<string | null>;
  updatedAt: string;
};

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = registerSchema;

export const characterCreateSchema = z.object({
  ownerId: z.string().min(1),
  name: z.string().min(3).max(20),
  sprite: z.string().min(1)
});

export const characterGoldSchema = z.object({
  ownerId: z.string().min(1),
  characterId: z.string().min(1),
  amount: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER)
});

export const characterXpSchema = z.object({
  ownerId: z.string().min(1),
  characterId: z.string().min(1),
  amount: z.number().int().min(1).max(10000)
});

export const onlinePingSchema = z.object({
  ownerId: z.string().min(1)
});

export const inventoryItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().min(1),
  stackable: z.boolean().optional(),
  maxStack: z.number().int().min(1).optional()
});

export const inventoryAddSchema = z.object({
  ownerId: z.string().min(1),
  item: inventoryItemSchema
});

export const inventoryRemoveSchema = z.object({
  ownerId: z.string().min(1),
  itemId: z.string().min(1),
  quantity: z.number().int().min(1)
});

export const chatSendSchema = z.object({
  ownerId: z.string().min(1),
  name: z.string().min(1).max(20).optional(),
  message: z.string().min(1).max(280)
});

export const houseUpdateSchema = z.object({
  ownerId: z.string().min(1),
  furniture: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        position: z.object({
          x: z.number().min(0),
          y: z.number().min(0)
        })
      })
    )
    .max(4)
});

export const farmPlantSchema = z.object({
  ownerId: z.string().min(1),
  plotId: z.string().min(1),
  seed: z.string().min(1)
});

export const farmHarvestSchema = z.object({
  ownerId: z.string().min(1),
  plotId: z.string().min(1)
});

export const forestKillSchema = z.object({
  ownerId: z.string().min(1)
});
