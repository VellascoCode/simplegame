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
    const body = await request.json();
    const parsed = mapSchema.parse(body.map ?? body);
    const map = await persistCityMap(parsed);
    return ok({ map });
  } catch (err) {
    return error(getMessage(err), 400);
  }
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Mapa inválido";
}
