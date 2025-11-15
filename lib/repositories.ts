import { ObjectId, type OptionalUnlessRequiredId } from "mongodb";
import { getCollection, hasMongoConnection } from "./db";
import { getMemoryDB } from "./memoryStore";
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

function normalizeCharacter(
  doc: CharacterDocument | (Character & { _id?: any })
): Character {
  const normalizedId =
    typeof doc._id === "string" ? doc._id : doc._id?.toString?.();
  return {
    ...(structuredCloneCharacter(doc)),
    _id: normalizedId
  };
}

function normalizeUser(doc: UserDocument): User {
  const normalizedId =
    typeof doc._id === "string" ? doc._id : doc._id?.toString?.();
  return {
    ...(structuredCloneUser(doc)),
    _id: normalizedId
  };
}

function structuredCloneCharacter(
  doc: CharacterDocument | (Character & { _id?: any })
): Character {
  const { _id, ...rest } = doc as Character;
  return { ...rest };
}

function structuredCloneUser(doc: UserDocument | (User & { _id?: any })): User {
  const { _id, ...rest } = doc as User;
  return { ...rest };
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
