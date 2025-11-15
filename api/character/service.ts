import { characterCreateSchema, type Character } from "@/lib/models";
import {
  countCharacters,
  findCharacterById,
  insertCharacter,
  listCharacters
} from "@/lib/repositories";

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
