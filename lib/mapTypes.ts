export type TileMatrix = number[][];

export type CityMapData = {
  ground: TileMatrix;
  detail: TileMatrix;
  buildings: TileMatrix;
  tints: TileMatrix;
  collision: TileMatrix;
  cover: TileMatrix;
};
