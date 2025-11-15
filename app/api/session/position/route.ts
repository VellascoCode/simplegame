import { error, ok } from "@/lib/apiResponse";
import { getPlayerSession, savePlayerSession } from "@/lib/repositories";
import { getOwnerIdFromSession } from "@/lib/authSession";

export async function POST(request: Request) {
  const ownerId = await getOwnerIdFromSession();
  if (!ownerId) {
    return error("Sessão expirada", 401);
  }
  const session = await getPlayerSession(ownerId);
  if (!session) {
    return error("Personagem não selecionado", 404);
  }
  const body = await request.json();
  const x = typeof body.x === "number" ? body.x : session.position.x;
  const y = typeof body.y === "number" ? body.y : session.position.y;
  const map = typeof body.map === "string" ? body.map : session.map;
  const updated = await savePlayerSession({
    ...session,
    characterId: session.characterId,
    map,
    position: { x, y },
    updatedAt: new Date().toISOString()
  });
  return ok(updated);
}
