import { killCreature } from "@/api/forest/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const reward = await killCreature(payload);
    return ok(reward);
  } catch (err) {
    return error(getMessage(err), 400);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao derrotar criatura";
}
