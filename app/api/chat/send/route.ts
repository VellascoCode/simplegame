import { sendMessage } from "@/api/chat/service";
import { error, ok } from "@/lib/apiResponse";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const message = await sendMessage(payload);
    return ok(message, 201);
  } catch (err) {
    return error(getMessage(err), 400);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao enviar mensagem";
}
