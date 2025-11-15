import { houseUpdateSchema } from "@/lib/models";
import { getHouse, updateHouse } from "@/lib/repositories";

export async function loadHouse(ownerId: string) {
  return getHouse(ownerId);
}

export async function saveHouse(payload: unknown) {
  const data = houseUpdateSchema.parse(payload);
  return updateHouse(data.ownerId, data.furniture);
}
