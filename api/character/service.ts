import { createDefaultSkills, ensureCharacterProgression } from "@/lib/characterProgression";
import { defaultSpiritId } from "@/lib/characterSpirits";
import { defaultSpriteColor } from "@/lib/characterSpriteOptions";
import {
  type Character,
  type CharacterAttributes,
  characterAttributesSchema,
  characterCreateSchema,
  characterGoldSchema,
  characterXpSchema
} from "@/lib/models";
import { resolveLevel } from "@/lib/progression";
import {
  countCharacters,
  findCharacterById,
  insertCharacter,
  listCharacters,
  updateCharacterCore,
  updateCharacterGold,
  updateCharacterStats
} from "@/lib/repositories";

export async function createCharacter(payload: unknown) {
  const data = characterCreateSchema.parse(payload);
  const existing = await countCharacters(data.ownerId);
  if (existing >= 4) {
    throw new Error("Limite de 4 personagens atingido para este usuário");
  }

  const now = new Date().toISOString();
  const spriteColor = data.spriteColor ?? defaultSpriteColor;
  const spiritId = data.spiritId ?? defaultSpiritId;
  const baseAttributes: CharacterAttributes = {
    strength: 10,
    dexterity: 10,
    intelligence: 10,
    constitution: 10,
    luck: 10
  };
  const attributes = {
    ...baseAttributes,
    ...(data.attributes ? characterAttributesSchema.parse(data.attributes) : {})
  };
  const attributePoints = data.attributePoints ?? 5;
  const character: Character = {
    ownerId: data.ownerId,
    name: data.name,
    classTier: 1,
    classBase: "Adventurer",
    classAdvanced: "",
    classElite: "",
    classLevel: 1,
    sprite: data.sprite,
    spriteColor,
    spiritId,
    attributes,
    attributePoints,
    inventory: [],
    stats: {
      level: 1,
      xp: 0,
      hp: 100,
      energy: 100
    },
    gold: 0,
    skills: createDefaultSkills(),
    createdAt: now,
    updatedAt: now
  };

  const stored = await insertCharacter(character);
  return stored;
}

export async function loadCharacters(ownerId: string) {
  const characters = await listCharacters(ownerId);
  return Promise.all(
    characters.map(async (character) => ensureHydratedCharacter(ownerId, character))
  );
}

export async function loadCharacterById(ownerId: string, characterId: string) {
  const character = await findCharacterById(ownerId, characterId);
  if (!character) {
    throw new Error("Personagem não encontrado");
  }
  return ensureHydratedCharacter(ownerId, character);
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

async function ensureHydratedCharacter(ownerId: string, character: Character) {
  const { character: normalized, changed } = ensureCharacterProgression(character);
  if (changed && normalized._id) {
    const { _id, ...payload } = normalized;
    return updateCharacterCore(ownerId, _id, payload);
  }
  return normalized;
}
