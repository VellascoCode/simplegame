"use client";

import Image from "next/image";

export type TileSelectProps = {
  tiles: { id: string; label: string; icon: string }[];
  onSelect?: (id: string) => void;
};

export function TileSelect({ tiles, onSelect }: TileSelectProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {tiles.map((tile) => (
        <button key={tile.id} type="button" className="rounded-xl border border-white/20 p-2" onClick={() => onSelect?.(tile.id)}>
          <Image src={tile.icon} alt={tile.label} width={40} height={40} />
          <span className="text-xs text-white">{tile.label}</span>
        </button>
      ))}
    </div>
  );
}
