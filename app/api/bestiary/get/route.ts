import { loadBestiary } from "@/api/bestiary/service";
import { error, ok } from "@/lib/apiResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get("ownerId");
  const characterId = searchParams.get("characterId");
  try {
    const entries = await loadBestiary({ ownerId, characterId });
    return ok(entries);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Falha ao carregar bestiário", 400);
  }
}
