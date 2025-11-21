"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { InventoryItem } from "@/lib/models";

import { useXp } from "@/hooks/useXp";
import { getJSON, postJSON } from "@/lib/clientApi";

const SLOT_COUNT = 20;
const GRID_COLUMNS = 5;
const STACK_LIMIT = 10;

const itemDefinitions = {
  item1: { name: "Poção de Mana", icon: "/itens/item1.png", stackable: true, maxStack: STACK_LIMIT },
  item10: { name: "Poção de Vida", icon: "/itens/item10.png", stackable: true, maxStack: STACK_LIMIT },
  item30: {
    name: "Cristal pequeno de XP",
    icon: "/itens/item30.png",
    stackable: true,
    maxStack: STACK_LIMIT
  },
  item31: {
    name: "Cristal médio de XP",
    icon: "/itens/item31.png",
    stackable: true,
    maxStack: STACK_LIMIT
  }
} as const;

const presetItems = [
  { id: "item1", quantity: 1 },
  { id: "item10", quantity: 1 }
] satisfies Array<{ id: keyof typeof itemDefinitions; quantity: number }>;

const consumableXp: Record<string, number> = {
  item30: 25,
  item31: 60
};

export function InventoryPanel({
  ownerId,
  characterId,
  onItemsChange,
  onItemUsed
}: {
  ownerId: string;
  characterId?: string;
  onItemsChange?: (items: InventoryItem[]) => void;
  onItemUsed?: (itemId: string) => void;
}) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { grantXp } = useXp(ownerId, characterId);

  useEffect(() => {
    if (!ownerId) {
      setItems([]);
      return;
    }
    let cancelled = false;
    const fetchInventory = async () => {
      try {
        const response = await getJSON<InventoryItem[]>(`/api/inventory/get?ownerId=${ownerId}`);
        if (cancelled) return;
        setItems(response);
        setFeedback(null);
        onItemsChange?.(response);
      } catch (err) {
        if (!cancelled) {
          setFeedback(getMessage(err));
        }
      }
    };
    void fetchInventory();
    return () => {
      cancelled = true;
    };
  }, [ownerId, onItemsChange]);

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
      const xpAmount = consumableXp[itemId];
      if (xpAmount) {
        await grantXp(xpAmount);
      }
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
              onClick={() => {
                void handleConsume(slot.id);
              }}
            >
              {def?.icon ? <Image src={def.icon} alt={slot.name} width={48} height={48} /> : <span>{slot.name}</span>}
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
              onClick={() => {
                void handleQuickAdd(item);
              }}
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
