import { z } from "zod";

import { error, ok } from "@/lib/apiResponse";
import { FactionId } from "@/lib/factions";
import { getFactionWarState, registerFactionDeath } from "@/lib/factionWar";

const killSchema = z.object({
  faction: z.nativeEnum(FactionId)
});

export function GET() {
  return ok(getFactionWarState());
}

export async function POST(request: Request) {
  try {
    const raw = (await request.json()) as unknown;
    const payload = killSchema.parse(raw);
    registerFactionDeath(payload.faction);
    return ok(getFactionWarState());
  } catch (err) {
    return error(err instanceof Error ? err.message : "Falha ao registrar batalha", 400);
  }
}
