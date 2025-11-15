import { ok } from "@/lib/apiResponse";
import { clearPlayerSession } from "@/lib/repositories";
import { getOwnerIdFromSession } from "@/lib/authSession";

export async function POST() {
  const ownerId = await getOwnerIdFromSession();
  if (ownerId) {
    await clearPlayerSession(ownerId);
  }
  return ok({ success: true });
}

export async function GET() {
  return POST();
}
