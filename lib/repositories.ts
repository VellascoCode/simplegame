import { ObjectId, type OptionalUnlessRequiredId } from "mongodb";

import type { BestiaryProfile } from "@/models/Bestiary";

import { resolveBestiaryTier } from "@/models/Bestiary";

import type {
  Character,
  CharacterStats,
  ChatMessage,
  FarmState,
  HouseState,
  InventoryItem,
  OnlinePresence,
  PlayerSessionState,
  QuickSlotLayout,
  User
} from "./models";

import { getCollection, hasMongoConnection } from "./db";
import { getMemoryDB } from "./memoryStore";

type CharacterDocument = Omit<Character, "_id"> & { _id: ObjectId };
type UserDocument = Omit<User, "_id"> & { _id: ObjectId };

export async function findUserByEmail(email: string) {
  if (hasMongoConnection()) {
    const users = await getCollection<UserDocument>("users");
    const doc = await users.findOne({ email });
    return doc ? normalizeUser(doc) : null;
  }

  const memory = getMemoryDB();
  return memory.users.find((user) => user.email === email) ?? null;
}

export async function insertUser(user: User) {
  if (hasMongoConnection()) {
    const users = await getCollection<UserDocument>("users");
    const { _id, ...doc } = user;
    void _id;
    const result = await users.insertOne(doc as OptionalUnlessRequiredId<UserDocument>);
    return { ...doc, _id: String(result.insertedId) };
  }

  const memory = getMemoryDB();
  const stored = { ...user, _id: new ObjectId().toHexString() };
  memory.users.push(stored);
  return stored;
}

export async function countCharacters(ownerId: string) {
  if (hasMongoConnection()) {
    const characters = await getCollection<CharacterDocument>("characters");
    return characters.countDocuments({ ownerId });
  }

  const memory = getMemoryDB();
  return memory.characters.filter((c) => c.ownerId === ownerId).length;
}

export async function insertCharacter(character: Character) {
  if (hasMongoConnection()) {
    const characters = await getCollection<CharacterDocument>("characters");
    const { _id, ...doc } = character;
    void _id;
    const result = await characters.insertOne(
      doc as OptionalUnlessRequiredId<CharacterDocument>
    );
    return { ...doc, _id: String(result.insertedId) };
  }

  const memory = getMemoryDB();
  const stored = { ...character, _id: new ObjectId().toHexString() };
  memory.characters.push(stored);
  return stored;
}

export async function listCharacters(ownerId: string) {
  if (hasMongoConnection()) {
    const characters = await getCollection<CharacterDocument>("characters");
    const docs = await characters
      .find({ ownerId })
      .sort({ createdAt: 1 })
      .limit(4)
      .toArray();
    return docs.map((doc) => normalizeCharacter(doc));
  }

  const memory = getMemoryDB();
  return memory.characters.filter((c) => c.ownerId === ownerId).map((c) => ({ ...c }));
}

export async function findCharacterById(ownerId: string, characterId: string) {
  if (hasMongoConnection()) {
    if (!ObjectId.isValid(characterId)) {
      return null;
    }
    const characters = await getCollection<CharacterDocument>("characters");
    const doc = await characters.findOne({ ownerId, _id: new ObjectId(characterId) });
    return doc ? normalizeCharacter(doc) : null;
  }

  const memory = getMemoryDB();
  const character = memory.characters.find(
    (c) => c.ownerId === ownerId && c._id === characterId
  );
  return character ? { ...character } : null;
}

export async function updateCharacterStats(
  ownerId: string,
  characterId: string,
  stats: CharacterStats
) {
  const payload = { ...stats };
  const updatedAt = new Date().toISOString();
  if (hasMongoConnection()) {
    if (!ObjectId.isValid(characterId)) {
      throw new Error("Personagem inválido");
    }
    const characters = await getCollection<CharacterDocument>("characters");
    await characters.updateOne(
      { ownerId, _id: new ObjectId(characterId) },
      { $set: { stats: payload, updatedAt } }
    );
    const updated = await characters.findOne({ ownerId, _id: new ObjectId(characterId) });
    if (!updated) {
      throw new Error("Personagem não encontrado");
    }
    return normalizeCharacter(updated);
  }

  const memory = getMemoryDB();
  const characterIndex = memory.characters.findIndex(
    (c) => c.ownerId === ownerId && c._id === characterId
  );
  if (characterIndex < 0) {
    throw new Error("Personagem não encontrado");
  }
  memory.characters[characterIndex] = {
    ...memory.characters[characterIndex],
    stats: payload,
    updatedAt
  };
  return { ...memory.characters[characterIndex] };
}

export async function updateCharacterGold(ownerId: string, characterId: string, gold: number) {
  const updatedAt = new Date().toISOString();
  if (hasMongoConnection()) {
    if (!ObjectId.isValid(characterId)) {
      throw new Error("Personagem inválido");
    }
    const characters = await getCollection<CharacterDocument>("characters");
    await characters.updateOne(
      { ownerId, _id: new ObjectId(characterId) },
      { $set: { gold, updatedAt } }
    );
    const updated = await characters.findOne({ ownerId, _id: new ObjectId(characterId) });
    if (!updated) {
      throw new Error("Personagem não encontrado");
    }
    return normalizeCharacter(updated);
  }

  const memory = getMemoryDB();
  const characterIndex = memory.characters.findIndex(
    (c) => c.ownerId === ownerId && c._id === characterId
  );
  if (characterIndex < 0) throw new Error("Personagem não encontrado");
  memory.characters[characterIndex] = {
    ...memory.characters[characterIndex],
    gold,
    updatedAt
  };
  return { ...memory.characters[characterIndex] };
}

export async function updateCharacterCore(
  ownerId: string,
  characterId: string,
  patch: Partial<Character>
) {
  const updatedAt = new Date().toISOString();
  const { _id: _ignoredId, ...rest } = patch;
  const payload = { ...rest, updatedAt };
  if (hasMongoConnection()) {
    if (!ObjectId.isValid(characterId)) {
      throw new Error("Personagem inválido");
    }
    const characters = await getCollection<CharacterDocument>("characters");
    await characters.updateOne(
      { ownerId, _id: new ObjectId(characterId) },
      { $set: payload as Partial<CharacterDocument> }
    );
    const updated = await characters.findOne({ ownerId, _id: new ObjectId(characterId) });
    if (!updated) {
      throw new Error("Personagem não encontrado");
    }
    return normalizeCharacter(updated);
  }

  const memory = getMemoryDB();
  const characterIndex = memory.characters.findIndex(
    (c) => c.ownerId === ownerId && c._id === characterId
  );
  if (characterIndex < 0) {
    throw new Error("Personagem não encontrado");
  }
  memory.characters[characterIndex] = {
    ...memory.characters[characterIndex],
    ...payload
  };
  return { ...memory.characters[characterIndex] };
}

type BestiaryDocument = Omit<BestiaryProfile, "_id"> & { _id?: ObjectId };

export async function getBestiaryProfile(ownerId: string, characterId: string) {
  if (hasMongoConnection()) {
    const collection = await getCollection<BestiaryDocument>("bestiary");
    const doc = await collection.findOne({ ownerId, characterId });
    return doc ?? null;
  }

  const memory = getMemoryDB();
  return (
    memory.bestiary.find(
      (entry) => entry.ownerId === ownerId && entry.characterId === characterId
    ) ?? null
  );
}

export async function incrementBestiaryKill(
  ownerId: string,
  characterId: string,
  monsterId: number
) {
  const updatedAt = new Date().toISOString();
  if (hasMongoConnection()) {
    const collection = await getCollection<BestiaryDocument>("bestiary");
    const existing = await collection.findOne({ ownerId, characterId });
    const profile: BestiaryProfile =
      existing ?? {
        ownerId,
        characterId,
        entries: [],
        updatedAt
      };
    profile.entries = bumpBestiaryEntry(profile.entries, monsterId);
    profile.updatedAt = updatedAt;
    await collection.updateOne(
      { ownerId, characterId },
      { $set: profile },
      { upsert: true }
    );
    return profile;
  }

  const memory = getMemoryDB();
  let profile = memory.bestiary.find(
    (entry) => entry.ownerId === ownerId && entry.characterId === characterId
  );
  if (!profile) {
    profile = {
      ownerId,
      characterId,
      entries: [],
      updatedAt
    };
    memory.bestiary.push(profile);
  }
  profile.entries = bumpBestiaryEntry(profile.entries, monsterId);
  profile.updatedAt = updatedAt;
  return { ...profile };
}

function bumpBestiaryEntry(entries: BestiaryProfile["entries"], monsterId: number) {
  const next = [...entries];
  const entry = next.find((item) => item.monsterId === monsterId);
  if (entry) {
    entry.kills += 1;
    entry.tier = resolveBestiaryTier(entry.kills);
    return next;
  }
  next.push({
    monsterId,
    kills: 1,
    tier: resolveBestiaryTier(1)
  });
  return next;
}

export async function getInventory(ownerId: string) {
  if (hasMongoConnection()) {
    const inventory = await getCollection<{ ownerId: string; items: InventoryItem[] }>("inventory");
    const doc = await inventory.findOne({ ownerId });
    return doc?.items ?? [];
  }

  const memory = getMemoryDB();
  const items = memory.inventory[ownerId] ?? [];
  memory.inventory[ownerId] = items;
  return items;
}

export async function saveInventory(ownerId: string, items: InventoryItem[]) {
  if (hasMongoConnection()) {
    const inventory = await getCollection<{ ownerId: string; items: InventoryItem[] }>("inventory");
    await inventory.updateOne(
      { ownerId },
      { $set: { ownerId, items } },
      { upsert: true }
    );
    return items;
  }

  const memory = getMemoryDB();
  memory.inventory[ownerId] = items;
  return items;
}

export async function getHouse(ownerId: string): Promise<HouseState> {
  if (hasMongoConnection()) {
    const houses = await getCollection<HouseState>("houses");
    const doc = await houses.findOne({ ownerId });
    return (
      doc ?? {
        ownerId,
        furniture: defaultFurniture()
      }
    );
  }

  const memory = getMemoryDB();
  let house = memory.houses.find((h) => h.ownerId === ownerId);
  if (!house) {
    house = { ownerId, furniture: defaultFurniture() };
    memory.houses.push(house);
  }
  return house;
}

export async function updateHouse(ownerId: string, furniture: HouseState["furniture"]) {
  const state = { ownerId, furniture };
  if (hasMongoConnection()) {
    const houses = await getCollection<HouseState>("houses");
    await houses.updateOne({ ownerId }, { $set: state }, { upsert: true });
    return state;
  }

  const memory = getMemoryDB();
  const index = memory.houses.findIndex((h) => h.ownerId === ownerId);
  if (index >= 0) {
    memory.houses[index] = state;
    return state;
  }
  memory.houses.push(state);
  return state;
}

export async function getFarm(ownerId: string): Promise<FarmState> {
  if (hasMongoConnection()) {
    const farms = await getCollection<FarmState>("farms");
    const doc = await farms.findOne({ ownerId });
    return doc ?? { ownerId, plots: defaultFarmPlots() };
  }

  const memory = getMemoryDB();
  let farm = memory.farms.find((f) => f.ownerId === ownerId);
  if (!farm) {
    farm = { ownerId, plots: defaultFarmPlots() };
    memory.farms.push(farm);
  }
  return farm;
}

export async function saveFarm(state: FarmState) {
  if (hasMongoConnection()) {
    const farms = await getCollection<FarmState>("farms");
    await farms.updateOne({ ownerId: state.ownerId }, { $set: state }, { upsert: true });
    return state;
  }

  const memory = getMemoryDB();
  const index = memory.farms.findIndex((f) => f.ownerId === state.ownerId);
  if (index >= 0) {
    memory.farms[index] = state;
    return state;
  }
  memory.farms.push(state);
  return state;
}

export async function getPlayerSession(ownerId: string) {
  if (hasMongoConnection()) {
    const sessions = await getCollection<PlayerSessionState>("sessions");
    return sessions.findOne({ ownerId });
  }

  const memory = getMemoryDB();
  return memory.sessions.find((session) => session.ownerId === ownerId) ?? null;
}

export async function savePlayerSession(state: PlayerSessionState) {
  const payload = { ...state, updatedAt: new Date().toISOString() };
  if (hasMongoConnection()) {
    const sessions = await getCollection<PlayerSessionState>("sessions");
    await sessions.updateOne({ ownerId: state.ownerId }, { $set: payload }, { upsert: true });
    return payload;
  }

  const memory = getMemoryDB();
  const index = memory.sessions.findIndex((session) => session.ownerId === state.ownerId);
  if (index >= 0) {
    memory.sessions[index] = payload;
  } else {
    memory.sessions.push(payload);
  }
  return payload;
}

export async function clearPlayerSession(ownerId: string) {
  if (hasMongoConnection()) {
    const sessions = await getCollection<PlayerSessionState>("sessions");
    await sessions.deleteOne({ ownerId });
    return;
  }

  const memory = getMemoryDB();
  memory.sessions = memory.sessions.filter((session) => session.ownerId !== ownerId);
}

export async function getQuickSlots(ownerId: string) {
  if (hasMongoConnection()) {
    const layout = await getCollection<QuickSlotLayout>("quickslots");
    const doc = await layout.findOne({ ownerId });
    return doc?.slots ?? defaultQuickSlots();
  }

  const memory = getMemoryDB();
  const existing = memory.quickSlots.find((slot) => slot.ownerId === ownerId);
  if (!existing) {
    const created = { ownerId, slots: defaultQuickSlots(), updatedAt: new Date().toISOString() };
    memory.quickSlots.push(created);
    return created.slots;
  }
  return existing.slots;
}

export async function saveQuickSlots(ownerId: string, slots: Array<string | null>) {
  const payload: QuickSlotLayout = {
    ownerId,
    slots,
    updatedAt: new Date().toISOString()
  };
  if (hasMongoConnection()) {
    const layout = await getCollection<QuickSlotLayout>("quickslots");
    await layout.updateOne({ ownerId }, { $set: payload }, { upsert: true });
    return payload.slots;
  }

  const memory = getMemoryDB();
  const index = memory.quickSlots.findIndex((slot) => slot.ownerId === ownerId);
  if (index >= 0) {
    memory.quickSlots[index] = payload;
  } else {
    memory.quickSlots.push(payload);
  }
  return payload.slots;
}

export async function addChatMessage(message: ChatMessage) {
  if (hasMongoConnection()) {
    const chat = await getCollection<ChatMessage>("chat");
    await chat.insertOne(message);
    return message;
  }

  const memory = getMemoryDB();
  memory.chat.push(message);
  memory.chat = memory.chat.slice(-50);
  return message;
}

export async function listChatMessages(limit = 20) {
  if (hasMongoConnection()) {
    const chat = await getCollection<ChatMessage>("chat");
    const docs = await chat.find({}, { sort: { createdAt: -1 } }).limit(limit).toArray();
    return docs.reverse();
  }

  const memory = getMemoryDB();
  return memory.chat.slice(-limit);
}

export async function pingOnline(ownerId: string) {
  const entry: OnlinePresence = { ownerId, lastPing: new Date().toISOString() };
  if (hasMongoConnection()) {
    const online = await getCollection<OnlinePresence>("online");
    await online.updateOne({ ownerId }, { $set: entry }, { upsert: true });
    return entry;
  }

  const memory = getMemoryDB();
  const index = memory.online.findIndex((o) => o.ownerId === ownerId);
  if (index >= 0) {
    memory.online[index] = entry;
  } else {
    memory.online.push(entry);
  }
  return entry;
}

export async function listOnline() {
  const cutoff = Date.now() - 1000 * 60;
  if (hasMongoConnection()) {
    const online = await getCollection<OnlinePresence>("online");
    const docs = await online
      .find({ lastPing: { $gte: new Date(cutoff).toISOString() } })
      .toArray();
    return docs;
  }

  const memory = getMemoryDB();
  return memory.online.filter((o) => new Date(o.lastPing).getTime() >= cutoff);
}

type DocumentId = string | ObjectId | undefined;

function normalizeDocumentId(id: DocumentId): string | undefined {
  if (typeof id === "string") {
    return id;
  }
  return id?.toString();
}

function normalizeCharacter(doc: CharacterDocument | Character): Character {
  const normalized = { ...(doc as Character) };
  normalized._id = normalizeDocumentId((doc as { _id?: DocumentId })._id);
  return normalized;
}

function normalizeUser(doc: UserDocument | User): User {
  const normalized = { ...(doc as User) };
  normalized._id = normalizeDocumentId((doc as { _id?: DocumentId })._id);
  return normalized;
}

function defaultFurniture() {
  return [
    { id: "bed", name: "Cama Simples", position: { x: 64, y: 32 } },
    { id: "table", name: "Mesa Madeira", position: { x: 32, y: 96 } },
    { id: "shelf", name: "Estante Pequena", position: { x: 96, y: 32 } },
    { id: "lamp", name: "Lamparina", position: { x: 128, y: 96 } }
  ];
}

function defaultQuickSlots(): Array<string | null> {
  return [null, null, null, null];
}

function defaultFarmPlots() {
  return Array.from({ length: 4 }).map((_, index) => ({
    id: `plot-${index + 1}`,
    seed: null,
    plantedAt: null,
    harvestReadyAt: null
  }));
}
