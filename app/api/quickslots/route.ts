import { error, ok } from "@/lib/apiResponse";
import { getOwnerIdFromSession } from "@/lib/authSession";
import { getQuickSlots, saveQuickSlots } from "@/lib/repositories";

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
  const raw = (await request.json()) as unknown;
  const slotsValue =
    typeof raw === "object" && raw !== null && "slots" in raw ? (raw as { slots?: unknown }).slots : undefined;
  const slotsInput = Array.isArray(slotsValue) ? slotsValue : [];
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
