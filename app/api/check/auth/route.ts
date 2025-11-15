import { checkAuth } from "@/api/check/auth";
import { ok } from "@/lib/apiResponse";

export function GET() {
  return ok(checkAuth());
}
