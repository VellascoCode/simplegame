import { loadHouse } from "@/api/house/service";
import { error, ok } from "@/lib/apiResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get("ownerId");
  if (!ownerId) {
    return error("ownerId obrigatório", 400);
  }

  const house = await loadHouse(ownerId);
  return ok(house);
}
