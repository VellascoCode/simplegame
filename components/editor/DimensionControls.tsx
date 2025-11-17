"use client";

import React from "react";

interface DimensionControlsProps {
  cols: number;
  rows: number;
  onColsChange(value: number): void;
  onRowsChange(value: number): void;
}

export function DimensionControls({ cols, rows, onColsChange, onRowsChange }: DimensionControlsProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Dimensões</p>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          min={1}
          value={cols}
          onChange={(event) => onColsChange(Number(event.target.value))}
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/60"
        />
        <input
          type="number"
          min={1}
          value={rows}
          onChange={(event) => onRowsChange(Number(event.target.value))}
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/60"
        />
      </div>
    </div>
  );
}
