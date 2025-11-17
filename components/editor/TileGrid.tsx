"use client";

import React from "react";

interface TileGridProps {
  tiles: string[];
  selectedTile: string;
  onSelect(tile: string): void;
}

export function TileGrid({ tiles, selectedTile, onSelect }: TileGridProps) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
      {tiles.map((path) => (
        <button
          key={path}
          type="button"
          onClick={() => onSelect(path)}
          className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
            selectedTile === path
              ? "border-amber-400 ring-2 ring-amber-400/50"
              : "border-white/10 transition hover:border-amber-200/60"
          } bg-black/30`}
        >
          <img src={path} alt={path} className="h-10 w-10 object-contain" />
        </button>
      ))}
    </div>
  );
}
