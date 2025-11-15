import { checkHouse } from "@/api/check/house";
import { ok } from "@/lib/apiResponse";

export function GET() {
  return ok(checkHouse());
}
