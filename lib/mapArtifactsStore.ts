import type { ObjectId } from "mongodb";
import { getCollection, hasMongoConnection } from "@/lib/db";
import { getMemoryDB } from "@/lib/memoryStore";

export type CorpseArtifactRecord = {
  id: string;
  tile: { x: number; y: number };
  expiresAt: number;
};

export type LootArtifactRecord = {
  id: string;
  itemId: string;
  name: string;
  icon: string;
  tile: { x: number; y: number };
  quantity: number;
  expiresAt: number;
  stackable?: boolean;
  maxStack?: number;
};

export type MapArtifacts = {
  corpses: CorpseArtifactRecord[];
  loot: LootArtifactRecord[];
};

type MapArtifactDocument = MapArtifacts & {
  map: string;
  updatedAt: string;
};

const COLLECTION_NAME = "map_artifacts";

export async function loadMapArtifacts(map: string): Promise<MapArtifacts> {
  if (!map) return { corpses: [], loot: [] };
  if (hasMongoConnection()) {
    const collection = await getCollection<MapArtifactDocument & { _id: ObjectId }>(COLLECTION_NAME);
    const doc = await collection.findOne({ map });
    if (!doc) {
      return { corpses: [], loot: [] };
    }
    return {
      corpses: (doc.corpses ?? []).map((corpse) => ({ ...corpse })),
      loot: (doc.loot ?? []).map((loot) => ({ ...loot }))
    };
  }

  const memory = getMemoryDB();
  const snapshot = memory.mapArtifacts[map];
  if (!snapshot) {
    return { corpses: [], loot: [] };
  }
  return {
    corpses: snapshot.corpses.map((corpse) => ({ ...corpse })),
    loot: snapshot.loot.map((loot) => ({ ...loot }))
  };
}

export async function saveMapArtifacts(map: string, artifacts: MapArtifacts): Promise<void> {
  if (!map) return;
  const payload: MapArtifactDocument = {
    map,
    corpses: artifacts.corpses ?? [],
    loot: artifacts.loot ?? [],
    updatedAt: new Date().toISOString()
  };
  if (hasMongoConnection()) {
    const collection = await getCollection<MapArtifactDocument & { _id: ObjectId }>(COLLECTION_NAME);
    await collection.updateOne({ map }, { $set: payload }, { upsert: true });
    return;
  }

  const memory = getMemoryDB();
  memory.mapArtifacts[map] = {
    corpses: payload.corpses.map((corpse) => ({ ...corpse })),
    loot: payload.loot.map((loot) => ({ ...loot }))
  };
}
