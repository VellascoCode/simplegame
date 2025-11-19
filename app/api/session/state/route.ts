import { error, ok } from "@/lib/apiResponse";
import { findCharacterById, getPlayerSession, savePlayerSession } from "@/lib/repositories";
import { getOwnerIdFromSession } from "@/lib/authSession";
import { defaultSprite } from "@/lib/characterSpriteOptions";
import { defaultSpriteColor } from "@/lib/characterSpriteOptions";
import { defaultSpiritId } from "@/lib/characterSpirits";

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
      characterSprite: defaultSprite,
      spriteColor: defaultSpriteColor,
      spiritId: defaultSpiritId,
      map: "cidadecentral",
      position: { x: 4, y: 4 },
      updatedAt: new Date().toISOString(),
      stats: { hp: 100, energy: 100, xp: 0, level: 1 }
    });
  }
  let characterName = session.characterName ?? "";
  let characterSprite = session.characterSprite ?? defaultSprite;
  let spriteColor = session.spriteColor ?? defaultSpriteColor;
  let spiritId = session.spiritId ?? defaultSpiritId;
  let stats: { hp: number; energy: number; xp: number; level: number } | null = session.stats ?? null;
  if (session.characterId) {
    try {
      const character = await findCharacterById(ownerId, session.characterId);
      if (character) {
        characterName = character.name;
        characterSprite = (character.sprite ?? defaultSprite) as typeof defaultSprite;
        spriteColor = character.spriteColor ?? defaultSpriteColor;
        spiritId = character.spiritId ?? defaultSpiritId;
        stats = character.stats;
        await savePlayerSession({
          ...session,
          characterName,
          characterSprite,
          spriteColor,
          spiritId,
          position: session.position ?? { x: 4, y: 4 }
        });
      }
    } catch (error) {
      console.warn("Failed to hydrate character from DB", error);
    }
  }
  const defaultStats = { hp: 100, energy: 100, xp: 0, level: 1 };
  return ok({
    ...session,
    map: session.map || "cidadecentral",
    position: session.position ?? { x: 4, y: 4 },
    characterName,
    characterSprite,
    spriteColor,
    spiritId,
    stats: stats ?? defaultStats
  });
}
