import { listInventory } from "@/api/inventory/service";
import { error, ok } from "@/lib/apiResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get("ownerId");
  if (!ownerId) {
    return error("ownerId obrigatório", 400);
  }

  const items = await listInventory(ownerId);
  return ok(items);
}
