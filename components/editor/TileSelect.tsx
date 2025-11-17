"use client";

import React from "react";
import { TileGrid } from "./TileGrid";

interface TileSelectProps {
  groups: string[];
  selectedGroup: string;
  onGroupChange(group: string): void;
  tiles: string[];
  selectedTile: string;
  onSelect(tile: string): void;
}

export function TileSelect({
  groups,
  selectedGroup,
  onGroupChange,
  tiles,
  selectedTile,
  onSelect
}: TileSelectProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Tiles</p>
      <div className="mt-2 flex gap-2">
        <select
          value={selectedGroup}
          onChange={(event) => onGroupChange(event.target.value)}
          className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs uppercase tracking-wide text-white focus:outline-none focus:ring-2 focus:ring-amber-400/60"
        >
          <option value="all">Todos</option>
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <TileGrid tiles={tiles} selectedTile={selectedTile} onSelect={onSelect} />
    </div>
  );
}
