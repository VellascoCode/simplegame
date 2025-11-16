import { getFactionWarState, registerFactionDeath } from "@/lib/factionWar";
import { ok, error } from "@/lib/apiResponse";
import { z } from "zod";
import { FactionId } from "@/lib/factions";

const killSchema = z.object({
  faction: z.nativeEnum(FactionId)
});

export async function GET() {
  return ok(getFactionWarState());
}

export async function POST(request: Request) {
  try {
    const payload = killSchema.parse(await request.json());
    registerFactionDeath(payload.faction);
    return ok(getFactionWarState());
  } catch (err) {
    return error(err instanceof Error ? err.message : "Falha ao registrar batalha", 400);
  }
}
