import { loadCharacterById, loadCharacters } from "@/api/character/service";
import { error, ok } from "@/lib/apiResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get("ownerId");
  if (!ownerId) {
    return error("ownerId obrigatório", 400);
  }

  const characterId = searchParams.get("characterId");

  try {
    if (characterId) {
      const character = await loadCharacterById(ownerId, characterId);
      return ok(character);
    }

    const characters = await loadCharacters(ownerId);
    return ok({ characters });
  } catch (err) {
    return error(getMessage(err), 404);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Personagem não encontrado";
}
