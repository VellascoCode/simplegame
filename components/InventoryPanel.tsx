"use client";

import { useEffect, useState } from "react";
import { getJSON, postJSON } from "@/lib/clientApi";
import type { InventoryItem } from "@/lib/models";

const SLOT_COUNT = 20;
const GRID_COLUMNS = 5;
const STACK_LIMIT = 10;

const itemDefinitions = {
  item1: { name: "Poção de Mana", icon: "/itens/item1.png", stackable: true, maxStack: STACK_LIMIT },
  item10: { name: "Poção de Vida", icon: "/itens/item10.png", stackable: true, maxStack: STACK_LIMIT }
} as const;

const presetItems = [
  { id: "item1", quantity: 1 },
  { id: "item10", quantity: 1 }
] satisfies Array<{ id: keyof typeof itemDefinitions; quantity: number }>;

export function InventoryPanel({
  ownerId,
  onItemsChange,
  onItemUsed
}: {
  ownerId: string;
  onItemsChange?: (items: InventoryItem[]) => void;
  onItemUsed?: (itemId: string) => void;
}) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!ownerId) {
      setItems([]);
      return;
    }
    loadInventory(ownerId);
  }, [ownerId]);

  async function loadInventory(id: string) {
    try {
      const response = await getJSON<InventoryItem[]>(`/api/inventory/get?ownerId=${id}`);
      setItems(response);
      setFeedback(null);
      onItemsChange?.(response);
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  async function handleQuickAdd(item: typeof presetItems[number]) {
    if (!ownerId) return;
    try {
      const response = await postJSON<InventoryItem[]>("/api/inventory/add", {
        ownerId,
        item: {
          id: item.id,
          name: itemDefinitions[item.id].name,
          quantity: item.quantity
        }
      });
      setItems(response);
      onItemsChange?.(response);
      setFeedback(`${itemDefinitions[item.id].name} adicionado.`);
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  async function handleConsume(itemId: string) {
    if (!ownerId) return;
    try {
      const response = await postJSON<InventoryItem[]>("/api/inventory/remove", {
        ownerId,
        itemId,
        quantity: 1
      });
      setItems(response);
      onItemsChange?.(response);
      onItemUsed?.(itemId);
      setFeedback("Item consumido.");
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  return (
    <div>
      <h3>Inventário</h3>
      {feedback && <p>{feedback}</p>}
      <div
        className="inventory-grid"
        style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, 64px)` }}
      >
        {buildSlotItems(items).map((slot, index) => {
          if (!slot) {
            return <div key={index} className="inventory-slot empty" />;
          }
          const def = itemDefinitions[slot.id as keyof typeof itemDefinitions];
          return (
            <button
              key={`${slot.id}-${index}`}
              className="inventory-slot"
              type="button"
              onClick={() => handleConsume(slot.id)}
            >
              {def?.icon ? <img src={def.icon} alt={slot.name} /> : <span>{slot.name}</span>}
              <span className="quantity">{slot.quantity}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 16 }}>
        <h4>Adicionar itens comuns</h4>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          {presetItems.map((item) => (
            <button
              key={item.id}
              className="button"
              type="button"
              onClick={() => handleQuickAdd(item)}
              style={{ textAlign: "center" }}
            >
              {itemDefinitions[item.id].name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Erro no inventário";
}

function buildSlotItems(items: InventoryItem[]) {
  const slots: Array<InventoryItem | null> = Array.from({ length: SLOT_COUNT }, () => null);
  let index = 0;
  for (const item of items) {
    if (index >= SLOT_COUNT) break;
    slots[index] = item;
    index += 1;
  }
  return slots;
}
