import { bestiaryGetSchema, bestiaryUpdateSchema } from "@/models/Bestiary";
import { findCharacterById, getBestiaryProfile, incrementBestiaryKill } from "@/lib/repositories";

async function ensureCharacter(ownerId: string, characterId: string) {
  const character = await findCharacterById(ownerId, characterId);
  if (!character) {
    throw new Error("Personagem não encontrado");
  }
}

export async function loadBestiary(payload: unknown) {
  const data = bestiaryGetSchema.parse(payload);
  await ensureCharacter(data.ownerId, data.characterId);
  const profile = await getBestiaryProfile(data.ownerId, data.characterId);
  return profile?.entries ?? [];
}

export async function updateBestiary(payload: unknown) {
  const data = bestiaryUpdateSchema.parse(payload);
  await ensureCharacter(data.ownerId, data.characterId);
  const profile = await incrementBestiaryKill(data.ownerId, data.characterId, data.monsterId);
  return profile.entries;
}
