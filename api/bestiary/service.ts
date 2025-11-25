import { loadCharacterById } from "@/api/character/service";
import { getBestiaryProfile, incrementBestiaryKill } from "@/lib/repositories";
import { bestiaryGetSchema, bestiaryUpdateSchema } from "@/models/Bestiary";

async function ensureCharacter(ownerId: string, characterId: string) {
  const character = await loadCharacterById(ownerId, characterId);
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
