import { checkForest } from "@/api/check/forest";
import { ok } from "@/lib/apiResponse";

export function GET() {
  return ok(checkForest());
}
