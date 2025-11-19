"use client";

import Image from "next/image";

export type TileGridProps = {
  size: number;
  tileSize: number;
  tilePath: string;
};

export function TileGrid({ size, tileSize, tilePath }: TileGridProps) {
  const totalTiles = size * size;
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, ${tileSize}px)` }}>
      {Array.from({ length: totalTiles }).map((_, index) => (
        <div key={index} className="border border-white/10">
          <Image src={tilePath} alt="tile" width={tileSize} height={tileSize} />
        </div>
      ))}
    </div>
  );
}
