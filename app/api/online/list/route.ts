import { listPresences } from "@/api/online/service";
import { ok } from "@/lib/apiResponse";

export async function GET() {
  const list = await listPresences();
  return ok(list);
}
