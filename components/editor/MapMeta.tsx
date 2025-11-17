"use client";

import React from "react";

interface MapMetaProps {
  mapName: string;
  status: string;
  onMapNameChange(value: string): void;
  onSave(): void;
  onSaveAs(): void;
}

export function MapMeta({ mapName, status, onMapNameChange, onSave, onSaveAs }: MapMetaProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/60" htmlFor="map-name">
          Nome do mapa
        </label>
        <span className="text-[10px] uppercase tracking-widest text-amber-300">{status}</span>
      </div>
      <input
        id="map-name"
        value={mapName}
        onChange={(event) => onMapNameChange(event.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/60"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSave}
          className="flex-1 rounded-lg bg-amber-500/80 px-3 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
        >
          Salvar mapa
        </button>
        <button
          type="button"
          onClick={onSaveAs}
          className="flex-1 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white transition hover:border-white/40"
        >
          Salvar como…
        </button>
      </div>
    </div>
  );
}
