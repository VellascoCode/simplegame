import { Rectangle, Texture } from "pixi.js";

export type OverlaySlice = "none" | "top" | "bottom";

type Matrix<T> = T[][];

export function createOverlayMatrix(rows: number, cols: number, fill: OverlaySlice = "none"): Matrix<OverlaySlice> {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
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

export function splitTexture(texture: Texture, slice: OverlaySlice, tileSize: number): { texture: Texture; height: number } {
  if (slice === "none") {
    return { texture, height: texture.height || tileSize };
  }
  const source = texture.source;
  const frame = texture.frame ?? new Rectangle(0, 0, texture.width || tileSize, texture.height || tileSize);
  const bottomHeight = Math.min(tileSize, frame.height);
  if (slice === "bottom") {
    const rect = new Rectangle(frame.x, frame.y + frame.height - bottomHeight, frame.width, bottomHeight);
    return { texture: new Texture({ source, frame: rect }), height: bottomHeight };
  }
  const topHeight = Math.max(0, frame.height - bottomHeight);
  if (topHeight <= 0) {
    return { texture, height: 0 };
  }
  const rect = new Rectangle(frame.x, frame.y, frame.width, topHeight);
  return { texture: new Texture({ source, frame: rect }), height: topHeight };
}
