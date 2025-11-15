import { harvest } from "@/api/farm/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const farm = await harvest(payload);
    return ok(farm);
  } catch (err) {
    return error(getMessage(err), 400);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao colher";
}
