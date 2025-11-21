"use client";

import Image from "next/image";

export type TileSelectProps = {
  groups: string[];
  selectedGroup: string;
  onGroupChange: (group: string) => void;
  tiles: string[];
  selectedTile: string;
  onSelect: (tilePath: string) => void;
};

const formatGroupLabel = (group: string) => {
  if (group === "root" || group === "all") return group.toUpperCase();
  return group.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export function TileSelect({ groups, selectedGroup, onGroupChange, tiles, selectedTile, onSelect }: TileSelectProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {groups.map((group) => {
          const active = group === selectedGroup;
          return (
            <button
              key={group}
              type="button"
              onClick={() => onGroupChange(group)}
              className={`rounded-full border px-3 py-1 text-xs uppercase tracking-widest ${
                active ? "border-amber-400 bg-amber-300/20 text-amber-200" : "border-white/15 text-white/60 hover:text-white"
              }`}
            >
              {formatGroupLabel(group)}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {tiles.map((tile) => {
          const active = tile === selectedTile;
          return (
            <button
              key={tile}
              type="button"
              className={`rounded-xl border p-2 transition ${
                active ? "border-amber-300 bg-amber-200/20" : "border-white/20 hover:border-white/40"
              }`}
              onClick={() => onSelect(tile)}
            >
              <div className="flex flex-col items-center gap-1">
                <Image src={tile} alt={tile} width={48} height={48} className="rounded-md border border-white/10 object-contain" />
                <span className="text-[10px] text-white/80">{tile.split("/").pop()}</span>
              </div>
            </button>
          );
        })}
        {tiles.length === 0 && <p className="col-span-4 text-center text-xs text-white/60">Nenhum tile neste grupo.</p>}
      </div>
    </div>
  );
}
