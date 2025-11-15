import { error, ok } from "@/lib/apiResponse";
import { getQuickSlots, saveQuickSlots } from "@/lib/repositories";
import { getOwnerIdFromSession } from "@/lib/authSession";

export async function GET() {
  const ownerId = await getOwnerIdFromSession();
  if (!ownerId) {
    return error("Sessão expirada", 401);
  }
  const slots = await getQuickSlots(ownerId);
  return ok({ slots });
}

export async function POST(request: Request) {
  const ownerId = await getOwnerIdFromSession();
  if (!ownerId) {
    return error("Sessão expirada", 401);
  }
  const body = await request.json();
  const slotsInput = Array.isArray(body.slots) ? body.slots : [];
  if (slotsInput.length !== 4) {
    return error("slots deve conter 4 itens", 400);
  }
  const normalized = (slotsInput as Array<string | null | undefined>).map((slot) => {
    if (slot === null || slot === undefined) return null;
    return typeof slot === "string" && slot.trim().length > 0 ? slot : null;
  });
  const slots = await saveQuickSlots(ownerId, normalized);
  return ok({ slots });
}
