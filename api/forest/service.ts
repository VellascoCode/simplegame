import { forestKillSchema } from "@/lib/models";
import { addItem } from "@/api/inventory/service";
import { randomUUID } from "crypto";

export async function killCreature(payload: unknown) {
  const data = forestKillSchema.parse(payload);
  const reward = {
    id: randomUUID(),
    name: "Essência da Floresta",
    quantity: 1
  };
  await addItem({ ownerId: data.ownerId, item: reward });
  return { reward };
}
