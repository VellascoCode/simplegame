import { error, ok } from "@/lib/apiResponse";
import { findCharacterById, getPlayerSession, savePlayerSession } from "@/lib/repositories";
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
      characterName: "",
      map: "cidadecentral",
      position: { x: 4, y: 4 },
      updatedAt: new Date().toISOString()
    });
  }
  let characterName = session.characterName ?? "";
  if (!characterName && session.characterId) {
    try {
      const character = await findCharacterById(ownerId, session.characterId);
      if (character) {
        characterName = character.name;
        await savePlayerSession({
          ...session,
          characterName,
          position: session.position ?? { x: 4, y: 4 }
        });
      }
    } catch (error) {
      console.warn("Failed to hydrate character name", error);
    }
  }
  return ok({
    ...session,
    map: session.map || "cidadecentral",
    position: session.position ?? { x: 4, y: 4 },
    characterName
  });
}
