import { checkInventory } from "@/api/check/inventory";
import { ok } from "@/lib/apiResponse";

export function GET() {
  return ok(checkInventory());
}
