import { saveHouse } from "@/api/house/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const house = await saveHouse(payload);
    return ok(house);
  } catch (err) {
    return error(getMessage(err), 400);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao atualizar casa";
}
