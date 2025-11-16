import { grantCharacterXp } from "@/api/character/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const stats = await grantCharacterXp(payload);
    return ok(stats);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Falha ao aplicar XP");
  }
}
