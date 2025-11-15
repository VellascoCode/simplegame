import { checkCharacter } from "@/api/check/character";
import { ok } from "@/lib/apiResponse";

export function GET() {
  return ok(checkCharacter());
}
