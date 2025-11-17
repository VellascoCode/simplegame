import { removeItem } from "@/api/inventory/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const items = await removeItem(payload);
    return ok(items);
  } catch (err) {
    return error(getMessage(err), 400);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao remover item";
}
