import { login } from "@/api/auth/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = await login(payload);
    return ok(data);
  } catch (err) {
    return error(getMessage(err), 401);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao autenticar";
}
