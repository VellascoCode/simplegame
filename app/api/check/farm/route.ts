import { checkFarm } from "@/api/check/farm";
import { ok } from "@/lib/apiResponse";

export function GET() {
  return ok(checkFarm());
}
