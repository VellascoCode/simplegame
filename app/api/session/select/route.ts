import { findCharacterById, getPlayerSession, savePlayerSession } from "@/lib/repositories";
import { error, ok } from "@/lib/apiResponse";
import { getOwnerIdFromSession } from "@/lib/authSession";

export async function POST(request: Request) {
  const ownerId = await getOwnerIdFromSession();
  if (!ownerId) {
    return error("Sessão expirada", 401);
  }

  const body = await request.json();
  const characterId = typeof body.characterId === "string" ? body.characterId : "";
  const map = typeof body.map === "string" ? body.map : "city";
  if (!characterId) {
    return error("characterId obrigatório", 400);
  }
  const character = await findCharacterById(ownerId, characterId);
  if (!character) {
    return error("Personagem não encontrado", 404);
  }
  const existing = (await getPlayerSession(ownerId)) ?? null;
  const session = await savePlayerSession({
    ownerId,
    characterId,
    map,
    position: existing?.position ?? { x: 0, y: 0 },
    updatedAt: new Date().toISOString()
  });
  return ok(session);
}
