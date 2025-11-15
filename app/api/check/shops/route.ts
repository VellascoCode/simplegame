import { checkShops } from "@/api/check/shops";
import { ok } from "@/lib/apiResponse";

export function GET() {
  return ok(checkShops());
}
