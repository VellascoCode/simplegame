import { getMessages } from "@/api/chat/service";
import { ok } from "@/lib/apiResponse";

export async function GET() {
  const messages = await getMessages();
  return ok(messages);
}
