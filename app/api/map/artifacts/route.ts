import { loadMapArtifacts, saveMapArtifacts } from "@/lib/mapArtifactsStore";
import { error, ok } from "@/lib/apiResponse";
import type { MapArtifacts } from "@/lib/mapArtifactsStore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const map = searchParams.get("map");
  if (!map) {
    return error("Mapa não informado", 400);
  }
  const artifacts = await loadMapArtifacts(map);
  return ok(artifacts);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as MapArtifacts & { map?: string };
    if (!payload.map || typeof payload.map !== "string") {
      return error("Mapa inválido", 400);
    }
    await saveMapArtifacts(payload.map, {
      corpses: payload.corpses ?? [],
      loot: payload.loot ?? []
    });
    return ok({ status: "saved" });
  } catch (err) {
    return error(err instanceof Error ? err.message : "Falha ao salvar artefatos", 500);
  }
}
