import { characterCreateSchema, characterGoldSchema, characterXpSchema, type Character } from "@/lib/models";
import {
  countCharacters,
  findCharacterById,
  insertCharacter,
  listCharacters,
  updateCharacterGold,
  updateCharacterStats
} from "@/lib/repositories";
import { resolveLevel } from "@/lib/progression";

export async function createCharacter(payload: unknown) {
  const data = characterCreateSchema.parse(payload);
  const existing = await countCharacters(data.ownerId);
  if (existing >= 4) {
    throw new Error("Limite de 4 personagens atingido para este usuário");
  }

  const now = new Date().toISOString();
  const character: Character = {
    ownerId: data.ownerId,
    name: data.name,
    sprite: data.sprite,
    inventory: [],
    stats: {
      level: 1,
      xp: 0,
      hp: 100,
      energy: 100
    },
    gold: 0,
    createdAt: now,
    updatedAt: now
  };

  const stored = await insertCharacter(character);
  return stored;
}

export async function loadCharacters(ownerId: string) {
  return listCharacters(ownerId);
}

export async function loadCharacterById(ownerId: string, characterId: string) {
  const character = await findCharacterById(ownerId, characterId);
  if (!character) {
    throw new Error("Personagem não encontrado");
  }
  return character;
}

export async function grantCharacterXp(payload: unknown) {
  const data = characterXpSchema.parse(payload);
  const character = await findCharacterById(data.ownerId, data.characterId);
  if (!character) {
    throw new Error("Personagem não encontrado");
  }
  const totalXp = Math.max(0, character.stats.xp + data.amount);
  const { level } = resolveLevel(totalXp);
  const stats = {
    ...character.stats,
    xp: totalXp,
    level
  };
  await updateCharacterStats(data.ownerId, data.characterId, stats);
  return stats;
}

export async function grantCharacterGold(payload: unknown) {
  const data = characterGoldSchema.parse(payload);
  const character = await findCharacterById(data.ownerId, data.characterId);
  if (!character) {
    throw new Error("Personagem não encontrado");
  }
  const currentGold = typeof character.gold === "number" ? character.gold : 0;
  const totalGold = Math.max(0, currentGold + data.amount);
  await updateCharacterGold(data.ownerId, data.characterId, totalGold);
  return { gold: totalGold };
}
