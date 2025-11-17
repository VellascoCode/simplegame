import { error, ok } from "@/lib/apiResponse";
import { getPlayerSession, savePlayerSession } from "@/lib/repositories";
import { getOwnerIdFromSession } from "@/lib/authSession";

export async function POST(request: Request) {
  const ownerId = await getOwnerIdFromSession();
  if (!ownerId) {
    return error("Sessão expirada", 401);
  }
  const session = await getPlayerSession(ownerId);
  if (!session) {
    return error("Personagem não selecionado", 404);
  }
  const raw = (await request.json()) as unknown;
  const input = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};
  const normalizeCoord = (value: unknown, fallback: number) => {
    if (typeof value === "number" && Number.isFinite(value)) {
      return Math.max(0, Math.round(value));
    }
    return Math.max(0, Math.round(fallback));
  };
  const normalizeMapName = (value: string | undefined, fallback: string) => {
    if (!value) return fallback;
    const normalized = value.replace(/[^a-z0-9_-]/gi, "").toLowerCase();
    if (normalized === "city") return "cidadecentral";
    return normalized || fallback;
  };
  const safePosition = session.position ?? { x: 4, y: 4 };
  const x = normalizeCoord(input.x, safePosition.x ?? 4);
  const y = normalizeCoord(input.y, safePosition.y ?? 4);
  const fallbackMap = session.map || "cidadecentral";
  const map = normalizeMapName(typeof input.map === "string" ? input.map : session.map, fallbackMap);
  const updated = await savePlayerSession({
    ...session,
    characterId: session.characterId,
    characterName: session.characterName,
    map,
    position: { x, y },
    updatedAt: new Date().toISOString()
  });
  return ok(updated);
}
