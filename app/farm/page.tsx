"use client";

import { useState } from "react";
import { getJSON, postJSON } from "@/lib/clientApi";
import type { FarmState } from "@/lib/models";

export default function FarmPage() {
  const [ownerId, setOwnerId] = useState("");
  const [farm, setFarm] = useState<FarmState | null>(null);
  const [plotId, setPlotId] = useState("plot-1");
  const [seed, setSeed] = useState("trigo");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function load() {
    if (!ownerId) {
      setFeedback("Informe um ownerId para carregar a fazenda.");
      return;
    }
    try {
      const data = await getJSON<FarmState>(`/api/farm/get?ownerId=${ownerId}`);
      setFarm(data);
      setPlotId(data.plots[0]?.id ?? "plot-1");
      setFeedback(null);
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  async function handlePlant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ownerId) return;
    try {
      const data = await postJSON<FarmState>("/api/farm/plant", { ownerId, plotId, seed });
      setFarm(data);
      setFeedback("Plantio registrado.");
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  async function handleHarvest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ownerId) return;
    try {
      const data = await postJSON<FarmState>("/api/farm/harvest", { ownerId, plotId });
      setFarm(data);
      setFeedback("Colheita concluída.");
    } catch (err) {
      setFeedback(getMessage(err));
    }
  }

  return (
    <section>
      <div className="card">
        <h2>Etapa 4 — Fazenda</h2>
        <p>Controle os 4 espaços de plantio, registrando plantios e colheitas.</p>
        <input
          placeholder="owner-123"
          value={ownerId}
          onChange={(event) => setOwnerId(event.target.value)}
        />
        <button className="button" style={{ marginTop: 12 }} type="button" onClick={load}>
          Carregar Fazenda
        </button>
        {feedback && <p>{feedback}</p>}
      </div>
      {farm && (
        <div className="grid">
          <div className="card">
            <h3>Plots</h3>
            <ul className="list">
              {farm.plots.map((plot) => (
                <li key={plot.id}>
                  {plot.id} — {plot.seed ? `Cultivando ${plot.seed}` : "Vazio"}{" "}
                  {plot.harvestReadyAt && (
                    <small>Pronto às {new Date(plot.harvestReadyAt).toLocaleTimeString()}</small>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <form onSubmit={handlePlant}>
              <h3>Plantar</h3>
              <label htmlFor="plot-select">Plot</label>
              <select
                id="plot-select"
                value={plotId}
                onChange={(event) => setPlotId(event.target.value)}
              >
                {farm.plots.map((plot) => (
                  <option key={plot.id}>{plot.id}</option>
                ))}
              </select>
              <label htmlFor="seed">Semente</label>
              <select id="seed" value={seed} onChange={(event) => setSeed(event.target.value)}>
                <option value="trigo">Trigo</option>
                <option value="cenoura">Cenoura</option>
                <option value="batata">Batata</option>
              </select>
              <button className="button">Plantar</button>
            </form>
          </div>
          <div className="card">
            <form onSubmit={handleHarvest}>
              <h3>Colher</h3>
              <p>Selecione o mesmo plot para liberar e coletar itens.</p>
              <label htmlFor="plot-select-harvest">Plot</label>
              <select
                id="plot-select-harvest"
                value={plotId}
                onChange={(event) => setPlotId(event.target.value)}
              >
                {farm.plots.map((plot) => (
                  <option key={plot.id}>{plot.id}</option>
                ))}
              </select>
              <button className="button">Colher</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha na fazenda";
}
