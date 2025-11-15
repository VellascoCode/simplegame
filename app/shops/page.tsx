"use client";

import { useState } from "react";
import { postJSON } from "@/lib/clientApi";
import { InventoryPanel } from "@/components/InventoryPanel";

type ShopItem = {
  id: string;
  name: string;
  quantity: number;
};

const shops = [
  {
    id: "shop-tools",
    title: "Loja 1 — Ferramentas e Poções",
    items: [
      { id: "pocao-cura", name: "Poção de Cura", quantity: 1 },
      { id: "pocao-energia", name: "Poção de Energia", quantity: 1 },
      { id: "enxada", name: "Enxada Básica", quantity: 1 }
    ]
  },
  {
    id: "shop-weapons",
    title: "Loja 2 — Armas",
    items: [
      { id: "espada-ferro", name: "Espada de Ferro", quantity: 1 },
      { id: "arco-simples", name: "Arco Simples", quantity: 1 },
      { id: "cajado-luz", name: "Cajado de Luz", quantity: 1 }
    ]
  }
];

export default function ShopsPage() {
  const [ownerId, setOwnerId] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [sellId, setSellId] = useState("");
  const [sellQty, setSellQty] = useState(1);

  async function buy(item: ShopItem) {
    if (!ownerId) {
      setFeedback("Informe ownerId para comprar.");
      return;
    }
    try {
      await postJSON("/api/inventory/add", {
        ownerId,
        item
      });
      setFeedback(`${item.name} comprado e enviado ao inventário.`);
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  async function sell(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ownerId) {
      setFeedback("Informe ownerId para vender.");
      return;
    }
    try {
      await postJSON("/api/inventory/remove", {
        ownerId,
        itemId: sellId,
        quantity: sellQty
      });
      setFeedback("Item vendido e removido do inventário.");
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  return (
    <section>
      <div className="card">
        <h2>Etapa 4 — Lojas</h2>
        <p>
          Três lojas fixas controlam compra e venda de itens. Use o inventário compartilhado para
          validar as operações.
        </p>
        <input
          placeholder="owner-123"
          value={ownerId}
          onChange={(event) => setOwnerId(event.target.value)}
        />
        {feedback && <p>{feedback}</p>}
      </div>
      <div className="grid">
        {shops.map((shop) => (
          <div key={shop.id} className="card">
            <h3>{shop.title}</h3>
            <ul className="list">
              {shop.items.map((item) => (
                <li key={item.id}>
                  {item.name}{" "}
                  <button className="button" type="button" onClick={() => buy(item)}>
                    Comprar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="card">
          <h3>Loja 3 — Compra do Jogador</h3>
          <p>Informe o ID do item e quantidade para vender (remover do inventário).</p>
          <form onSubmit={sell}>
            <label htmlFor="sell-id">Item ID</label>
            <input
              id="sell-id"
              required
              value={sellId}
              onChange={(event) => setSellId(event.target.value)}
            />
            <label htmlFor="sell-qty">Quantidade</label>
            <input
              id="sell-qty"
              type="number"
              min={1}
              value={sellQty}
              onChange={(event) => setSellQty(Number(event.target.value))}
            />
            <button className="button">Vender</button>
          </form>
        </div>
      </div>
      <div className="card">
        <InventoryPanel ownerId={ownerId} />
      </div>
    </section>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha na loja";
}
