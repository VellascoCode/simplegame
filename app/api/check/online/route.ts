import { checkOnline } from "@/api/check/online";
import { ok } from "@/lib/apiResponse";

export function GET() {
  return ok(checkOnline());
}
