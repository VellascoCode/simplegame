import { loadFarm } from "@/api/farm/service";
import { error, ok } from "@/lib/apiResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get("ownerId");
  if (!ownerId) {
    return error("ownerId obrigatório", 400);
  }

  const farm = await loadFarm(ownerId);
  return ok(farm);
}
