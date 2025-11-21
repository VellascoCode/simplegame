"use client";

import { useState } from "react";

import type { HouseFurniture, HouseState } from "@/lib/models";

import { getJSON, postJSON } from "@/lib/clientApi";

export default function HousePage() {
  const [ownerId, setOwnerId] = useState("");
  const [house, setHouse] = useState<HouseState | null>(null);
  const [selectedId, setSelectedId] = useState("bed");
  const [position, setPosition] = useState({ x: 64, y: 64 });
  const [feedback, setFeedback] = useState<string | null>(null);

  async function load() {
    if (!ownerId) {
      setFeedback("Informe o ownerId.");
      return;
    }
    try {
      const state = await getJSON<HouseState>(`/api/house/get?ownerId=${ownerId}`);
      setHouse(state);
      if (state.furniture.length > 0) {
        setSelectedId(state.furniture[0].id);
        setPosition(state.furniture[0].position);
      }
      setFeedback(null);
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!house || !ownerId) {
      setFeedback("Carregue a casa antes de salvar.");
      return;
    }
    const updatedFurniture = updateFurniture(house.furniture, selectedId, position);
    try {
      const next = await postJSON<HouseState>("/api/house/update", {
        ownerId,
        furniture: updatedFurniture
      });
      setHouse(next);
      setFeedback("Mobília salva.");
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  return (
    <section>
      <div className="card">
        <h2>Etapa 4 — Casa do Jogador</h2>
        <p>Carregue a casa, ajuste as posições dos 4 móveis e salve as alterações.</p>
        <input
          placeholder="owner-123"
          value={ownerId}
          onChange={(event) => setOwnerId(event.target.value)}
        />
        <button
          className="button"
          style={{ marginTop: 12 }}
          type="button"
          onClick={() => {
            void load();
          }}
        >
          Carregar Casa
        </button>
        {feedback && <p>{feedback}</p>}
      </div>

      {house && (
        <div className="grid">
          <div className="card">
            <h3>Móveis em uso</h3>
            <ul className="list">
              {house.furniture.map((item) => (
                <li key={item.id}>
                  {item.name} — ({item.position.x}, {item.position.y})
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <form
              onSubmit={(event) => {
                void save(event);
              }}
            >
              <h3>Atualizar mobília</h3>
              <label htmlFor="furniture-id">Móvel</label>
              <select
                id="furniture-id"
                value={selectedId}
                onChange={(event) => setSelectedId(event.target.value)}
              >
                {house.furniture.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label htmlFor="pos-x">Posição X</label>
              <input
                id="pos-x"
                type="number"
                min={0}
                max={256}
                value={position.x}
                onChange={(event) => setPosition((prev) => ({ ...prev, x: Number(event.target.value) }))}
              />
              <label htmlFor="pos-y">Posição Y</label>
              <input
                id="pos-y"
                type="number"
                min={0}
                max={256}
                value={position.y}
                onChange={(event) => setPosition((prev) => ({ ...prev, y: Number(event.target.value) }))}
              />
              <button className="button">Salvar posição</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function updateFurniture(list: HouseFurniture[], targetId: string, position: { x: number; y: number }) {
  return list.map((item) => (item.id === targetId ? { ...item, position: { ...position } } : item));
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao carregar casa";
}
