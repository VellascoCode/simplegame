import { farmHarvestSchema, farmPlantSchema } from "@/lib/models";
import { getFarm, saveFarm } from "@/lib/repositories";

export async function loadFarm(ownerId: string) {
  return getFarm(ownerId);
}

export async function plant(payload: unknown) {
  const data = farmPlantSchema.parse(payload);
  const farm = await getFarm(data.ownerId);
  const plot = farm.plots.find((p) => p.id === data.plotId);
  if (!plot) {
    throw new Error("Talhão inválido");
  }
  if (plot.seed) {
    throw new Error("Talhão ocupado");
  }
  const plantedAt = new Date();
  plot.seed = data.seed;
  plot.plantedAt = plantedAt.toISOString();
  plot.harvestReadyAt = new Date(plantedAt.getTime() + 1000 * 60 * 5).toISOString();
  await saveFarm(farm);
  return farm;
}

export async function harvest(payload: unknown) {
  const data = farmHarvestSchema.parse(payload);
  const farm = await getFarm(data.ownerId);
  const plot = farm.plots.find((p) => p.id === data.plotId);
  if (!plot || !plot.seed) {
    throw new Error("Nada para colher");
  }
  plot.seed = null;
  plot.plantedAt = null;
  plot.harvestReadyAt = null;
  await saveFarm(farm);
  return farm;
}
