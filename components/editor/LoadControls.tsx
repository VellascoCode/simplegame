"use client";

import React from "react";

interface LoadControlsProps {
  maps: string[];
  selectedMap: string;
  onSelect: (value: string) => void;
  onLoad: () => void;
}

export function LoadControls({ maps, selectedMap, onSelect, onLoad }: LoadControlsProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Carregar mapa</p>
      <div className="flex gap-2">
        <select
          value={selectedMap}
          onChange={(event) => onSelect(event.target.value)}
          className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/60"
        >
          <option value="">Selecione</option>
          {maps.map((map) => (
            <option key={map} value={map}>
              {map}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onLoad}
          className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white transition hover:border-white/40"
        >
          Load
        </button>
      </div>
    </div>
  );
}
