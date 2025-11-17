"use client";

import React from "react";

type LayerValue = 0 | 1 | 2;
type BrushValue = 1 | 2 | 3;

interface LayerControlsProps {
  activeLayer: LayerValue;
  onLayerChange(layer: LayerValue): void;
  brushSize: BrushValue;
  onBrushChange(size: BrushValue): void;
  eraserMode: boolean;
  onToggleEraser(): void;
}

const LAYER_LABELS: Record<LayerValue, string> = {
  0: "Layer 0 — Chão",
  1: "Layer 1 — Detalhes",
  2: "Layer 2 — Buildings"
};

const LAYER_OPTIONS: readonly LayerValue[] = [0, 1, 2];
const BRUSH_SIZES: readonly BrushValue[] = [1, 2, 3];

export function LayerControls({
  activeLayer,
  onLayerChange,
  brushSize,
  onBrushChange,
  eraserMode,
  onToggleEraser
}: LayerControlsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Layer ativa</p>
        <div className="grid grid-cols-1 gap-2">
          {LAYER_OPTIONS.map((layer) => (
            <button
              key={layer}
              type="button"
              onClick={() => onLayerChange(layer)}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                activeLayer === layer
                  ? "border-amber-400 bg-amber-400/20 text-amber-200"
                  : "border-white/15 bg-black/40 text-white/70 hover:border-amber-200/40"
              }`}
            >
              {LAYER_LABELS[layer]}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Brush</p>
        <div className="grid grid-cols-3 gap-2">
          {BRUSH_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onBrushChange(size)}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                brushSize === size
                  ? "border-amber-400 bg-amber-400/15 text-amber-100"
                  : "border-white/15 bg-black/40 text-white/70 hover:border-amber-200/40"
              }`}
            >
              {size}×{size}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onToggleEraser}
        className={`w-full rounded-lg border px-3 py-2 text-sm font-semibold transition ${
          eraserMode
            ? "border-red-400 bg-red-500/20 text-red-100 shadow-[0_0_12px_rgba(248,113,113,0.35)]"
            : "border-white/15 bg-black/40 text-white/70 hover:border-amber-200/40"
        }`}
      >
        Eraser: {eraserMode ? "ON" : "OFF"}
      </button>
    </div>
  );
}
