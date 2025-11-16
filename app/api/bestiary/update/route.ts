import { updateBestiary } from "@/api/bestiary/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const entries = await updateBestiary(payload);
    return ok(entries);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Falha ao atualizar bestiário");
  }
}
