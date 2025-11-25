import { ok } from "@/lib/apiResponse";
import { getOwnerIdFromSession } from "@/lib/authSession";
import { clearPlayerSession } from "@/lib/repositories";

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
