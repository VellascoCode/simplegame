"use client";

import { useState } from "react";

import { postJSON } from "@/lib/clientApi";

export default function ForestPage() {
  const [ownerId, setOwnerId] = useState("");
  const [log, setLog] = useState<string | null>(null);

  async function handleKill() {
    if (!ownerId) {
      setLog("Informe o ownerId.");
      return;
    }
    try {
      const result = await postJSON<{ reward: { name: string } }>("/api/forest/kill", { ownerId });
      setLog(`Criatura derrotada. Loot: ${result.reward.name}`);
    } catch (err) {
      setLog(getMessage(err));
    }
  }

  return (
    <section>
      <div className="card">
        <h2>Etapa 4 — Floresta</h2>
        <p>Matar a criatura básica gera uma recompensa simples adicionada ao inventário.</p>
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
            void handleKill();
          }}
        >
          Matar Criatura
        </button>
        {log && <p>{log}</p>}
      </div>
    </section>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha na floresta";
}
