import { persistCityMap, loadCityMap } from "@/api/city/service";
import { error, ok } from "@/lib/apiResponse";
import { z } from "zod";

const layerSchema = z.array(z.array(z.number().int().min(0).max(50)));
const mapSchema = z.object({
  ground: layerSchema,
  detail: layerSchema,
  buildings: layerSchema,
  tints: layerSchema,
  collision: layerSchema,
  cover: layerSchema
});

export async function GET() {
  const map = await loadCityMap();
  return ok({ map });
}

export async function POST(request: Request) {
  try {
    const raw = (await request.json()) as unknown;
    const parsed = mapSchema.parse(extractMapPayload(raw));
    const map = await persistCityMap(parsed);
    return ok({ map });
  } catch (err) {
    return error(getMessage(err), 400);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Mapa inválido";
}

function extractMapPayload(raw: unknown): unknown {
  if (typeof raw === "object" && raw !== null && "map" in raw) {
    const wrapper = raw as { map?: unknown };
    if (wrapper.map !== undefined) {
      return wrapper.map;
    }
  }
  return raw;
}
