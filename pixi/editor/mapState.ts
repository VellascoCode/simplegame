import { createMatrix, cloneBlockMatrix, cloneOverlayMatrix, type Matrix } from "@/pixi/editor/sceneUtils";
import { createOverlayMatrix, type OverlaySlice } from "@/pixi/utils/overlay";

export type EditorMatrices = {
  layer0: Matrix<string>;
  layer1: Matrix<string>;
  layer2: Matrix<string>;
  overlay: Matrix<OverlaySlice>;
  blocks: Matrix<boolean>;
};

export function createDefaultEditorState(rows: number, cols: number, baseTile: string): EditorMatrices {
  return {
    layer0: createMatrix(rows, cols, baseTile),
    layer1: createMatrix(rows, cols, ""),
    layer2: createMatrix(rows, cols, ""),
    overlay: createOverlayMatrix(rows, cols, "none"),
    blocks: createMatrix(rows, cols, false)
  };
}

export function hydrateEditorState(
  payload: {
    cols: number;
    rows: number;
    tilesLayer0?: Matrix<string>;
    tilesLayer1?: Matrix<string>;
    tilesLayer2?: Matrix<string>;
    tiles?: Matrix<string>;
    buildingOverlay?: Matrix<OverlaySlice>;
    blocks?: Matrix<boolean>;
  },
  fallbackTile: string
): EditorMatrices {
  const { cols, rows } = payload;
  return {
    layer0: payload.tilesLayer0 ?? payload.tiles ?? createMatrix(rows, cols, fallbackTile),
    layer1: payload.tilesLayer1 ?? createMatrix(rows, cols, ""),
    layer2: payload.tilesLayer2 ?? createMatrix(rows, cols, ""),
    overlay: payload.buildingOverlay ?? createOverlayMatrix(rows, cols, "none"),
    blocks: payload.blocks ?? createMatrix(rows, cols, false)
  };
}

export function resizeEditorState(
  source: EditorMatrices,
  newCols: number,
  newRows: number,
  defaults: { ground: string; upper: string }
): EditorMatrices {
  const clampMatrix = <T>(matrix: Matrix<T>, fill: T) =>
    Array.from({ length: newRows }, (_, y) => Array.from({ length: newCols }, (_, x) => matrix[y]?.[x] ?? fill));
  return {
    layer0: clampMatrix(source.layer0, defaults.ground),
    layer1: clampMatrix(source.layer1, defaults.upper),
    layer2: clampMatrix(source.layer2, defaults.upper),
    overlay: cloneOverlayMatrix(source.overlay, newRows, newCols),
    blocks: cloneBlockMatrix(source.blocks, newRows, newCols)
  };
}
