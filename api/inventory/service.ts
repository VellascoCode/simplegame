import {
  inventoryAddSchema,
  type InventoryItem,
  inventoryRemoveSchema
} from "@/lib/models";
import { getInventory, saveInventory } from "@/lib/repositories";

const STACK_LIMIT = 100;
const MAX_SLOTS = 20;

export async function listInventory(ownerId: string) {
  return getInventory(ownerId);
}

export async function addItem(payload: unknown) {
  const data = inventoryAddSchema.parse(payload);
  const current = await getInventory(data.ownerId);
  const stackable = data.item.stackable !== false;
  const slotLimit = stackable
    ? Math.min(STACK_LIMIT, data.item.maxStack ?? STACK_LIMIT)
    : 1;
  let remaining = data.item.quantity;

  if (stackable) {
    current.forEach((item, index) => {
      if (remaining <= 0) return;
      if (item.id !== data.item.id) return;
      const available = Math.max(0, slotLimit - item.quantity);
      if (available <= 0) return;
      const delta = Math.min(available, remaining);
      current[index] = { ...item, quantity: item.quantity + delta };
      remaining -= delta;
    });
  }

  while (remaining > 0) {
    if (current.length >= MAX_SLOTS) {
      throw new Error("Inventário cheio");
    }
    const amount = Math.min(slotLimit, remaining);
    current.push({
      ...data.item,
      quantity: amount,
      stackable
    });
    remaining -= amount;
    if (!stackable) {
      // itens únicos usam um slot por unidade
      // cada slot representa uma cópia da mesma arma/armadura
      continue;
    }
  }
  await saveInventory(data.ownerId, current);
  return current;
}

export async function removeItem(payload: unknown) {
  const data = inventoryRemoveSchema.parse(payload);
  const current = await getInventory(data.ownerId);
  let remaining = data.quantity;
  const next: InventoryItem[] = [];

  for (const item of current) {
    if (item.id !== data.itemId) {
      next.push(item);
      continue;
    }
    if (remaining <= 0) {
      next.push(item);
      continue;
    }
    if (item.quantity <= remaining) {
      remaining -= item.quantity;
      continue;
    }
    next.push({ ...item, quantity: item.quantity - remaining });
    remaining = 0;
  }

  if (remaining > 0) {
    throw new Error("Item insuficiente");
  }

  await saveInventory(data.ownerId, next);
  return next;
}
