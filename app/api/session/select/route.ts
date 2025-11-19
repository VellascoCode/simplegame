import { findCharacterById, getPlayerSession, savePlayerSession } from "@/lib/repositories";
import { error, ok } from "@/lib/apiResponse";
import { getOwnerIdFromSession } from "@/lib/authSession";
import type { SpriteOptionValue } from "@/lib/characterSpriteOptions";

export async function POST(request: Request) {
  const ownerId = await getOwnerIdFromSession();
  if (!ownerId) {
    return error("Sessão expirada", 401);
  }

  const payload = (await request.json()) as Record<string, unknown>;
  const sanitizeMapName = (value: string) => value.replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "cidadecentral";
  const rawCharacterId = payload.characterId;
  const rawMap = payload.map;
  const characterId = typeof rawCharacterId === "string" ? rawCharacterId : "";
  const map = typeof rawMap === "string" && rawMap.trim() ? sanitizeMapName(rawMap) : "cidadecentral";
  if (!characterId) {
    return error("characterId obrigatório", 400);
  }
  const character = await findCharacterById(ownerId, characterId);
  if (!character) {
    return error("Personagem não encontrado", 404);
  }
  const existing = (await getPlayerSession(ownerId)) ?? null;
  const defaultPosition = existing?.position ?? { x: 4, y: 4 };
  const session = await savePlayerSession({
    ownerId,
    characterId,
    characterName: character.name,
    characterSprite: (character.sprite ?? "warriorblue") as SpriteOptionValue,
    spriteColor: character.spriteColor,
    spiritId: character.spiritId,
    stats: character.stats,
    map,
    position: defaultPosition,
    updatedAt: new Date().toISOString()
  });
  return ok(session);
}
