"use client";

import { useEffect, useState } from "react";
import { getJSON } from "@/lib/clientApi";
import type { InventoryItem } from "@/lib/models";
import { InventoryPanel } from "@/components/InventoryPanel";

const iconMap: Record<string, string> = {
  item1: "/itens/item1.png",
  item10: "/itens/item10.png"
};

export function InventorySummary({
  ownerId,
  onItemUsed
}: {
  ownerId: string;
  onItemUsed?: (itemId: string) => void;
}) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ownerId) {
      setItems([]);
      return;
    }
    void load();

    async function load() {
      try {
        const response = await getJSON<InventoryItem[]>(`/api/inventory/get?ownerId=${ownerId}`);
        setItems(response);
      } catch {
        setItems([]);
      }
    }
  }, [ownerId]);

  const topItems = items.slice(0, 5);

  return (
    <div className="inventory-summary">
      <h4>Itens Rápidos</h4>
      <div className="inventory-summary-stack">
        {topItems.map((item) => {
          const icon = iconMap[item.id];
          return (
            <div key={item.id} className="inventory-summary-card">
              <div className="inventory-mini-slot">
                {icon ? <img src={icon} alt={item.name} /> : <span>{item.name}</span>}
                <span className="quantity">{item.quantity}</span>
              </div>
              <p className="text-xs text-amber-100/80">{item.name}</p>
            </div>
          );
        })}
        {topItems.length === 0 &&
          Array.from({ length: 5 }).map((_, index) => (
            <div key={`empty-${index}`} className="inventory-summary-card">
              <div className="inventory-mini-slot empty" />
            </div>
          ))}
      </div>
      <button className="button" type="button" onClick={() => setOpen(true)}>
        Ver inventário
      </button>

      <div className={`inventory-drawer ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <div className="inventory-drawer-card" onClick={(event) => event.stopPropagation()}>
          <button className="inventory-drawer-close" type="button" onClick={() => setOpen(false)}>
            ×
          </button>
          <InventoryPanel ownerId={ownerId} onItemsChange={setItems} onItemUsed={onItemUsed} />
        </div>
      </div>
    </div>
  );
}
