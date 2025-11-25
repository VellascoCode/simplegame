import type { Container } from "pixi.js";

import { Graphics, Sprite, Texture } from "pixi.js";

import { type OverlaySlice, splitTexture } from "@/pixi/utils/overlay";

export type Matrix<T> = T[][];

export type SceneContainers = {
  tileLayer0: Container;
  tileLayer1: Container;
  tileLayer2: Container;
  blockLayer: Container;
  previewLayer?: Container | null;
  buildingTopLayer?: Container | null;
};

export type SceneData = {
  tilesLayer0: Matrix<string>;
  tilesLayer1: Matrix<string>;
  tilesLayer2: Matrix<string>;
  overlayMatrix: Matrix<OverlaySlice>;
  blocks: Matrix<boolean>;
  rows: number;
  cols: number;
  tileSize: number;
  activeLayer: 0 | 1 | 2;
  textures: Record<string, Texture>;
};

export function createMatrix<T>(rows: number, cols: number, fill: T): Matrix<T> {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function hslToHex(h: number, s: number, l: number): number {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return (f(0) << 16) + (f(8) << 8) + f(4);
}

export function getBrushOffsets(brushSize: 1 | 2 | 3): Array<{ dx: number; dy: number }> {
  if (brushSize === 1) return [{ dx: 0, dy: 0 }];
  if (brushSize === 2) {
    return [
      { dx: 0, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 1, dy: 1 }
    ];
  }
  const offsets: Array<{ dx: number; dy: number }> = [];
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      offsets.push({ dx, dy });
    }
  }
  return offsets;
}

export function defaultTileForLayer(layer: 0 | 1 | 2, baseTile: string): string {
  return layer === 0 ? baseTile : "";
}

export function cloneLayerMatrix(source: Matrix<string>, fallback: string, rows: number, cols: number): Matrix<string> {
  return Array.from({ length: rows }, (_, rowIndex) => {
    const row = source[rowIndex];
    if (!row) return Array.from({ length: cols }, () => fallback);
    return Array.from({ length: cols }, (__, colIndex) => {
      const value = row[colIndex];
      return typeof value === "string" ? value : fallback;
    });
  });
}

export function cloneBlockMatrix(source: Matrix<boolean>, rows: number, cols: number): Matrix<boolean> {
  return Array.from({ length: rows }, (_, rowIndex) => {
    const row = source[rowIndex];
    if (!row) return Array.from({ length: cols }, () => false);
    return Array.from({ length: cols }, (__, colIndex) => Boolean(row[colIndex]));
  });
}

export function cloneOverlayMatrix(source: Matrix<OverlaySlice>, rows: number, cols: number): Matrix<OverlaySlice> {
  return Array.from({ length: rows }, (_, rowIndex) => {
    const row = source[rowIndex];
    if (!row) return Array.from({ length: cols }, () => "none");
    return Array.from({ length: cols }, (__, colIndex) => row[colIndex] ?? "none");
  });
}

export function applyBlockBrush(
  matrix: Matrix<boolean>,
  brushSize: 1 | 2 | 3,
  tileX: number,
  tileY: number,
  cols: number,
  rows: number,
  active: boolean
): Matrix<boolean> {
  const next = cloneBlockMatrix(matrix, rows, cols);
  const offsets = getBrushOffsets(brushSize);
  offsets.forEach(({ dx, dy }) => {
    const px = tileX + dx;
    const py = tileY + dy;
    if (px < 0 || py < 0 || px >= cols || py >= rows) return;
    next[py][px] = active;
  });
  return next;
}

export function paintTile(
  matrices: {
    layer0: Matrix<string>;
    layer1: Matrix<string>;
    layer2: Matrix<string>;
    overlay: Matrix<OverlaySlice>;
  },
  params: {
    tileX: number;
    tileY: number;
    tilePath: string;
    layer: 0 | 1 | 2;
    brushSize: 1 | 2 | 3;
    cols: number;
    rows: number;
    overlayEnabled: boolean;
    baseTile: string;
  }
) {
  const { layer0, layer1, layer2, overlay } = matrices;
  const { tileX, tileY, tilePath, layer, brushSize, cols, rows, overlayEnabled, baseTile } = params;
  const nextLayer0 = cloneLayerMatrix(layer0, baseTile, rows, cols);
  const nextLayer1 = cloneLayerMatrix(layer1, "", rows, cols);
  const nextLayer2 = cloneLayerMatrix(layer2, "", rows, cols);
  const nextOverlay = cloneOverlayMatrix(overlay, rows, cols);
  const targetLayer = layer === 0 ? nextLayer0 : layer === 1 ? nextLayer1 : nextLayer2;
  const offsets = getBrushOffsets(brushSize);
  offsets.forEach(({ dx, dy }) => {
    const px = tileX + dx;
    const py = tileY + dy;
    if (px < 0 || py < 0 || px >= cols || py >= rows) return;
    targetLayer[py][px] = tilePath;
    if (layer === 2) {
      nextOverlay[py][px] = overlayEnabled ? determineOverlaySlice(dy, brushSize) : "none";
    }
  });
  return {
    layer0: nextLayer0,
    layer1: nextLayer1,
    layer2: nextLayer2,
    overlay: nextOverlay
  };
}

export function determineOverlaySlice(dy: number, brush: 1 | 2 | 3): OverlaySlice {
  if (brush === 1) {
    return dy <= 0 ? "top" : "bottom";
  }
  if (brush === 2) {
    return dy === 0 ? "top" : "bottom";
  }
  return dy <= 0 ? "top" : "bottom";
}

export function rebuildScene(containers: SceneContainers, data: SceneData): void {
  const { tileLayer0, tileLayer1, tileLayer2, blockLayer, previewLayer, buildingTopLayer } = containers;
  const { tilesLayer0, tilesLayer1, tilesLayer2, overlayMatrix, blocks, rows, cols, tileSize, activeLayer, textures } = data;
  tileLayer0.removeChildren();
  tileLayer1.removeChildren();
  tileLayer2.removeChildren();
  previewLayer?.removeChildren();
  buildingTopLayer?.removeChildren();
  blockLayer.removeChildren();

  const overlayColors = {
    base: { color: 0x1e3a8a, alpha: 0.2 },
    details: { color: 0x7c3aed, alpha: 0.2 },
    buildings: { color: 0x5b21b6, alpha: 0.2 }
  };

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const tile0Path = tilesLayer0[y]?.[x];
      const tile1Path = tilesLayer1[y]?.[x];
      const tile2Path = tilesLayer2[y]?.[x];
      const grounding = resolveTexture(textures, tile0Path, "/tilesets/tile1.png");
      const sprite0 = new Sprite(grounding);
      sprite0.width = tileSize;
      sprite0.height = tileSize;
      sprite0.position.set(x * tileSize, y * tileSize);
      tileLayer0.addChild(sprite0);

      if (tile1Path) {
        const detailTexture = resolveTexture(textures, tile1Path, "");
        const sprite1 = new Sprite(detailTexture);
        sprite1.anchor.set(0, 1);
        sprite1.position.set(x * tileSize, (y + 1) * tileSize);
        tileLayer1.addChild(sprite1);
      }

      if (tile2Path) {
        const slice = overlayMatrix[y]?.[x] ?? "none";
        const fullTexture = resolveTexture(textures, tile2Path, "");
        const { texture, height } = splitTexture(fullTexture, slice, tileSize);
        const sprite2 = new Sprite(texture);
        sprite2.anchor.set(0, 1);
        sprite2.position.set(x * tileSize, (y + 1) * tileSize);
        if (slice === "top") {
          sprite2.height = height;
          buildingTopLayer?.addChild(sprite2);
        } else if (slice === "bottom") {
          sprite2.height = height;
          tileLayer2.addChild(sprite2);
        } else {
          sprite2.height = texture.height || tileSize;
          tileLayer2.addChild(sprite2);
        }
      }

      if (previewLayer) {
        if (activeLayer === 0) {
          if (tile1Path) {
            const overlay = new Graphics();
            overlay.rect(0, 0, tileSize, tileSize).fill(overlayColors.details);
            overlay.position.set(x * tileSize, y * tileSize);
            previewLayer.addChild(overlay);
          }
          if (tile2Path) {
            const overlay = new Graphics();
            overlay.rect(0, 0, tileSize, tileSize).fill(overlayColors.buildings);
            overlay.position.set(x * tileSize, y * tileSize);
            previewLayer.addChild(overlay);
          }
        } else if (activeLayer === 1) {
          const baseOverlay = new Graphics();
          baseOverlay.rect(0, 0, tileSize, tileSize).fill(overlayColors.base);
          baseOverlay.position.set(x * tileSize, y * tileSize);
          previewLayer.addChild(baseOverlay);
          if (tile2Path) {
            const overlay = new Graphics();
            overlay.rect(0, 0, tileSize, tileSize).fill(overlayColors.buildings);
            overlay.position.set(x * tileSize, y * tileSize);
            previewLayer.addChild(overlay);
          }
        } else if (activeLayer === 2) {
          const baseOverlay = new Graphics();
          baseOverlay.rect(0, 0, tileSize, tileSize).fill(overlayColors.base);
          baseOverlay.position.set(x * tileSize, y * tileSize);
          previewLayer.addChild(baseOverlay);
          if (tile1Path) {
            const overlay = new Graphics();
            overlay.rect(0, 0, tileSize, tileSize).fill(overlayColors.details);
            overlay.position.set(x * tileSize, y * tileSize);
            previewLayer.addChild(overlay);
          }
        }
      }

      const isBlocked = blocks[y]?.[x] ?? false;
      if (isBlocked) {
        const overlay = new Graphics();
        overlay.rect(0, 0, tileSize, tileSize).fill({ color: 0xff4d4f, alpha: 0.15 });
        overlay.position.set(x * tileSize, y * tileSize);
        blockLayer.addChild(overlay);
      }
    }
  }
}

function resolveTexture(cache: Record<string, Texture>, path: string | undefined, fallback: string) {
  const key = path || fallback;
  if (!key) return Texture.EMPTY;
  return cache[key] ?? Texture.from(key);
}
