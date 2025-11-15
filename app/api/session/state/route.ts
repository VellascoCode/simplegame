import { error, ok } from "@/lib/apiResponse";
import { getPlayerSession } from "@/lib/repositories";
import { getOwnerIdFromSession } from "@/lib/authSession";

export async function GET() {
  const ownerId = await getOwnerIdFromSession();
  if (!ownerId) {
    return error("Sessão não encontrada", 401);
  }
  const session = await getPlayerSession(ownerId);
  if (!session) {
    return ok({
      ownerId,
      characterId: "",
      map: "city",
      position: { x: 0, y: 0 },
      updatedAt: new Date().toISOString()
    });
  }
  return ok(session);
}
