import { createCharacter } from "@/api/character/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    const character = await createCharacter(payload);
    return ok(character, 201);
  } catch (err) {
    return error(getMessage(err), 400);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao criar personagem";
}
