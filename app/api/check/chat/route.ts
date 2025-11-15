import { checkChat } from "@/api/check/chat";
import { ok } from "@/lib/apiResponse";

export function GET() {
  return ok(checkChat());
}
