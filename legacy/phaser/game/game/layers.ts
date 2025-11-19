import type * as PhaserType from "phaser";
import { MAP_TILE_SIZE } from "./constants";
import { getPhaserInstance } from "./phaserInstance";

export function createFloorTexture(
  scene: PhaserType.Scene,
  key: string,
  groundTiles: Array<{ id: number; image: string }>
) {
  if (scene.textures.exists(key)) return;
  const canvas = scene.textures.createCanvas(key, MAP_TILE_SIZE * groundTiles.length, MAP_TILE_SIZE);
  if (!canvas) return;
  const ctx = canvas.getContext();
  if (!ctx) return;
  groundTiles.forEach((tile, index) => {
    const texture = scene.textures.get(`ground-${tile.id}`);
    if (!texture) return;
    const sourceImage = texture.getSourceImage() as HTMLImageElement;
    ctx.drawImage(
      sourceImage,
      0,
      0,
      sourceImage.width,
      sourceImage.height,
      index * MAP_TILE_SIZE,
      0,
      MAP_TILE_SIZE,
      MAP_TILE_SIZE
    );
  });
  canvas.refresh();
}

export function renderDetails(
  scene: PhaserType.Scene,
  detailLayer: number[][],
  mapTileSize: number
) {
  detailLayer.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell <= 0) return;
      const textureKey = `detail-${cell}`;
      if (!scene.textures.exists(textureKey)) return;
      const sprite = scene.add.image(
        columnIndex * mapTileSize + mapTileSize / 2,
        rowIndex * mapTileSize + mapTileSize / 2,
        textureKey
      );
      sprite.setOrigin(0.5, 0.5);
      sprite.setDepth(10 + rowIndex);
    });
  });
}

export function renderBuildings(
  scene: PhaserType.Scene,
  buildings: number[][],
  lookup: Map<number, { id: number }>
) {
  buildings.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell <= 0) return;
      const def = lookup.get(cell);
      if (!def) return;
      const key = `building-${def.id}`;
      if (!scene.textures.exists(key)) return;
      const sprite = scene.add.image(
        columnIndex * MAP_TILE_SIZE + MAP_TILE_SIZE / 2,
        rowIndex * MAP_TILE_SIZE + MAP_TILE_SIZE,
        key
      );
      sprite.setOrigin(0.5, 1);
      sprite.setDepth(sprite.y);
    });
  });
}

export function buildCollisionZones(
  collision: number[][]
): PhaserType.Geom.Rectangle[] {
  const phaser = getPhaserInstance();
  const zones: PhaserType.Geom.Rectangle[] = [];
  collision.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value <= 0) return;
      zones.push(new phaser.Geom.Rectangle(columnIndex * MAP_TILE_SIZE, rowIndex * MAP_TILE_SIZE, MAP_TILE_SIZE, MAP_TILE_SIZE));
    });
  });
  return zones;
}
