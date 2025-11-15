import { register } from "@/api/auth/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = await register(payload);
    return ok(data, 201);
  } catch (err) {
    return error(getMessage(err), 400);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao registrar usuário";
}
