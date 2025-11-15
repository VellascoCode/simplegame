export type TileInfo = { id: number; label: string; image: string };

export type TileManifest = {
  ground: TileInfo[];
  details: TileInfo[];
  buildings: TileInfo[];
};
