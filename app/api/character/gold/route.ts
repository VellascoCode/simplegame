import { grantCharacterGold } from "@/api/character/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await grantCharacterGold(payload);
    return ok(result);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Falha ao atualizar ouro");
  }
}
