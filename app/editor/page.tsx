"use client";

import { useEffect, useMemo, useState } from "react";
import { getJSON, postJSON } from "@/lib/clientApi";
import type { CityMapData } from "@/lib/mapTypes";
import type { TileManifest } from "@/lib/tileManifest";

const PIN = "8989";
const DEFAULT_WIDTH = 32;
const DEFAULT_HEIGHT = 20;
const MIN_SIZE = 8;
const MAX_WIDTH = 64;
const MAX_HEIGHT = 40;
const PREVIEW_RADIUS = 3;

type LayerKey = "ground" | "detail" | "buildings" | "tints" | "collision" | "cover";
type Tool = "paint" | "erase";

type PaletteItem = {
  id: number;
  label: string;
  image?: string;
  color?: string;
  helper?: string;
};

type HoverCell = { row: number; column: number } | null;

const layerLabels: Record<LayerKey, string> = {
  ground: "Piso",
  detail: "Detalhes",
  buildings: "Construções",
  tints: "Tons",
  collision: "Bloqueio",
  cover: "Sobrepor"
};

const layerOrder: LayerKey[] = [
  "ground",
  "detail",
  "buildings",
  "tints",
  "collision",
  "cover"
];

const brushSizes = [1, 2, 3] as const;

type MapResponse = { map: CityMapData };

const tintPalette = [
  { id: 0, label: "Sem cor", color: "#ffffff" },
  { id: 1, label: "Quente", color: "#ffd1dc" },
  { id: 2, label: "Aqua", color: "#a6e7ff" },
  { id: 3, label: "Dourado", color: "#fff7c2" },
  { id: 4, label: "Violeta", color: "#d5b4ff" },
  { id: 5, label: "Verde", color: "#94f1a4" }
] as const;

const collisionPalette: PaletteItem[] = [
  { id: 0, label: "Livre", helper: "Sem bloqueio" },
  { id: 1, label: "Bloquear", helper: "Impede passagem" }
];

const coverPalette: PaletteItem[] = [
  { id: 0, label: "Em frente", helper: "Jogador passa na frente" },
  { id: 1, label: "Por trás", helper: "Jogador passa por trás" }
];

export default function EditorPage() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tilesError, setTilesError] = useState<string | null>(null);
  const [tileManifest, setTileManifest] = useState<TileManifest | null>(null);
  const [mapData, setMapData] = useState<CityMapData>(() =>
    createEmptyMap(DEFAULT_WIDTH, DEFAULT_HEIGHT)
  );
  const [gridWidth, setGridWidth] = useState(DEFAULT_WIDTH);
  const [gridHeight, setGridHeight] = useState(DEFAULT_HEIGHT);
  const [selectedTile, setSelectedTile] = useState(0);
  const [activeLayer, setActiveLayer] = useState<LayerKey>("ground");
  const [brushSize, setBrushSize] = useState<(typeof brushSizes)[number]>(1);
  const [tool, setTool] = useState<Tool>("paint");
  const [hoverCell, setHoverCell] = useState<HoverCell>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    let active = true;
    async function loadTiles() {
      try {
        const manifest = await getJSON<TileManifest>("/api/tiles");
        if (active) {
          setTileManifest(manifest);
          setTilesError(null);
        }
      } catch (err) {
        if (active) {
          setTilesError(getMessage(err));
        }
      }
    }
    void loadTiles();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    let active = true;
    async function loadFromServer() {
      try {
        const response = await getJSON<MapResponse>("/api/city/map");
        if (active) {
          setMapData(response.map);
          setGridWidth(response.map.ground[0]?.length ?? DEFAULT_WIDTH);
          setGridHeight(response.map.ground.length ?? DEFAULT_HEIGHT);
        }
      } catch (err) {
        if (active) setError(getMessage(err));
      }
    }
    void loadFromServer();
    return () => {
      active = false;
    };
  }, [unlocked]);

  const palette: PaletteItem[] = useMemo(() => {
    if (activeLayer === "ground") {
      return tileManifest?.ground?.map((tile) => ({ id: tile.id, label: tile.label, image: tile.image })) ?? [];
    }
    if (activeLayer === "detail") {
      return tileManifest?.details?.map((tile) => ({ id: tile.id, label: tile.label, image: tile.image })) ?? [];
    }
    if (activeLayer === "buildings") {
      return tileManifest?.buildings?.map((tile) => ({ id: tile.id, label: tile.label, image: tile.image })) ?? [];
    }
    if (activeLayer === "tints") {
      return tintPalette.map((item) => ({ id: item.id, label: item.label, color: item.color }));
    }
    if (activeLayer === "collision") {
      return collisionPalette;
    }
    if (activeLayer === "cover") {
      return coverPalette;
    }
    return [];
  }, [activeLayer, tileManifest]);

  useEffect(() => {
    if (palette.length === 0) return;
    if (!palette.some((item) => item.id === selectedTile)) {
      setSelectedTile(palette[0].id);
    }
  }, [palette, selectedTile]);

  const groundLookup = useMemo(() => new Map(tileManifest?.ground?.map((tile) => [tile.id, tile.image]) ?? []), [tileManifest]);
  const detailLookup = useMemo(() => new Map(tileManifest?.details?.map((tile) => [tile.id, tile.image]) ?? []), [tileManifest]);
  const buildingLookup = useMemo(() => new Map(tileManifest?.buildings?.map((tile) => [tile.id, tile.image]) ?? []), [tileManifest]);
  const tintLookup = useMemo(() => {
    const lookup = new Map<number, string>();
    tintPalette.forEach((item) => lookup.set(item.id, item.color));
    return lookup;
  }, []);

  const fallbackGround = tileManifest?.ground?.[0]?.image ?? "/tilesets/tile1.png";
  const fallbackDetail = tileManifest?.details?.[0]?.image ?? "/tilesets/details/d1.png";
  const fallbackBuilding = tileManifest?.buildings?.[0]?.image ?? "/tilesets/buildings/Tower_Blue.png";

  const previewCells = useMemo(() => {
    if (!hoverCell) return null;
    const cells: Array<Array<{
      row: number;
      column: number;
      ground: number;
      detail: number;
      building: number;
      tint: number;
      collision: number;
      cover: number;
    } | null>> = [];
    for (let row = hoverCell.row - PREVIEW_RADIUS; row <= hoverCell.row + PREVIEW_RADIUS; row += 1) {
      const line: Array<ReturnType<typeof buildPreviewCell>> = [];
      for (let column = hoverCell.column - PREVIEW_RADIUS; column <= hoverCell.column + PREVIEW_RADIUS; column += 1) {
        line.push(buildPreviewCell(mapData, row, column));
      }
      cells.push(line);
    }
    return cells;
  }, [hoverCell, mapData]);

  function authenticate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pin === PIN) {
      setUnlocked(true);
      setError(null);
    } else {
      setError("PIN inválido");
    }
  }

  function handleLayerChange(layer: LayerKey) {
    setActiveLayer(layer);
    setTool("paint");
    const preferred = getDefaultTileForLayer(layer, tileManifest);
    setSelectedTile(preferred);
  }

  function paintCell(rowIndex: number, columnIndex: number) {
    const value = tool === "erase" ? 0 : selectedTile;
    setMapData((previous) => ({
      ...previous,
      [activeLayer]: applyBrush(previous[activeLayer], rowIndex, columnIndex, brushSize, value)
    }));
  }

  function clearLayer() {
    setMapData((previous) => ({
      ...previous,
      [activeLayer]: previous[activeLayer].map((row) => row.map(() => 0))
    }));
  }

  function fillLayer() {
    const value = tool === "erase" ? 0 : selectedTile;
    setMapData((previous) => ({
      ...previous,
      [activeLayer]: previous[activeLayer].map((row) => row.map(() => value))
    }));
  }

  function handleDimensionChange(newWidth: number, newHeight: number) {
    const width = clamp(newWidth, MIN_SIZE, MAX_WIDTH);
    const height = clamp(newHeight, MIN_SIZE, MAX_HEIGHT);
    setMapData((previous) => resizeMap(previous, width, height));
    setGridWidth(width);
    setGridHeight(height);
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(JSON.stringify(mapData));
  }

  async function saveToServer() {
    setStatus("saving");
    try {
      await postJSON("/api/city/map", { map: mapData });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setError(getMessage(err));
    }
  }

  const grid = mapData[activeLayer];

  return (
    <section>
      <div className="card">
        <h2>Admin / Editor de Mapas</h2>
        <p>Restrito. Use o PIN <strong>8989</strong> para habilitar o editor.</p>
        {!unlocked && (
          <form onSubmit={authenticate}>
            <label htmlFor="pin">PIN</label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder="****"
            />
            {error && <p>{error}</p>}
            <button className="button">Entrar</button>
          </form>
        )}
        {unlocked && error && <p>{error}</p>}
        {tilesError && <p>{tilesError}</p>}
      </div>

      {unlocked && (
        <>
          <div className="card">
            <h3>Camadas, ferramentas e dimensões</h3>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
              <div>
                <p>Camada ativa</p>
                <div className="flex flex-wrap gap-4">
                  {layerOrder.map((layer) => (
                    <button
                      key={layer}
                      className="button"
                      type="button"
                      style={{ opacity: activeLayer === layer ? 1 : 0.5 }}
                      onClick={() => handleLayerChange(layer)}
                    >
                      {layerLabels[layer]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p>Ferramentas</p>
                <div className="flex gap-4">
                  <button
                    className="button"
                    type="button"
                    style={{ opacity: tool === "paint" ? 1 : 0.5 }}
                    onClick={() => setTool("paint")}
                  >
                    Pintar
                  </button>
                  <button
                    className="button"
                    type="button"
                    style={{ opacity: tool === "erase" ? 1 : 0.5 }}
                    onClick={() => setTool("erase")}
                  >
                    Borracha
                  </button>
                </div>
              </div>
              <div>
                <p>Pincéis</p>
                <div className="flex gap-4">
                  {brushSizes.map((size) => (
                    <button
                      key={size}
                      className="button"
                      type="button"
                      style={{ opacity: brushSize === size ? 1 : 0.5 }}
                      onClick={() => setBrushSize(size)}
                    >
                      {size}×{size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p>Dimensões</p>
                <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))" }}>
                  <label>
                    Largura
                    <input
                      type="number"
                      min={MIN_SIZE}
                      max={MAX_WIDTH}
                      value={gridWidth}
                      onChange={(event) => handleDimensionChange(Number(event.target.value), gridHeight)}
                    />
                  </label>
                  <label>
                    Altura
                    <input
                      type="number"
                      min={MIN_SIZE}
                      max={MAX_HEIGHT}
                      value={gridHeight}
                      onChange={(event) => handleDimensionChange(gridWidth, Number(event.target.value))}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Paleta ({layerLabels[activeLayer]})</h3>
            {palette.length === 0 && <p>Carregando paleta…</p>}
            <div className="flex flex-wrap gap-4">
              {palette.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="palette-button"
                  onClick={() => {
                    setTool("paint");
                    setSelectedTile(item.id);
                  }}
                  style={{
                    borderColor: selectedTile === item.id ? "#ffd27f" : "rgba(255,255,255,0.2)",
                    backgroundImage: item.image ? `url(${item.image})` : undefined,
                    backgroundColor: item.color
                  }}
                  title={item.helper ?? item.label}
                >
                  {!item.image && !item.color && <span className="palette-label">{item.label}</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Grid ({gridWidth} × {gridHeight})</h3>
            <p>Cada célula representa 64 px no jogo. Clique ou arraste para pintar, use a lupa para ver o resultado ampliado.</p>
            <div className="editor-workspace">
              <div
                className="editor-grid"
                style={{ gridTemplateColumns: `repeat(${gridWidth}, 24px)` }}
              >
                {grid.map((row, rowIndex) =>
                  row.map((value, columnIndex) => {
                    const groundTile = mapData.ground[rowIndex]?.[columnIndex] ?? 0;
                    const detailValue = mapData.detail[rowIndex]?.[columnIndex] ?? 0;
                    const buildingValue = mapData.buildings[rowIndex]?.[columnIndex] ?? 0;
                    const tintValue = mapData.tints[rowIndex]?.[columnIndex] ?? 0;
                    const collisionValue = mapData.collision[rowIndex]?.[columnIndex] ?? 0;
                    const coverValue = mapData.cover[rowIndex]?.[columnIndex] ?? 0;
                    const texture = groundLookup.get(groundTile) ?? fallbackGround;
                    const overlayValue =
                      activeLayer === "ground"
                        ? value
                        : activeLayer === "detail"
                          ? detailValue
                          : activeLayer === "buildings"
                            ? buildingValue
                            : activeLayer === "tints"
                              ? tintValue
                              : activeLayer === "collision"
                                ? collisionValue
                                : coverValue;

                    return (
                      <button
                        type="button"
                        key={`${rowIndex}-${columnIndex}`}
                        onClick={() => paintCell(rowIndex, columnIndex)}
                        onMouseEnter={() => setHoverCell({ row: rowIndex, column: columnIndex })}
                        onMouseLeave={() => setHoverCell(null)}
                        style={{
                          width: 24,
                          height: 24,
                          padding: 0,
                          borderRadius: 4,
                          border: "1px solid rgba(255,255,255,0.2)",
                          backgroundImage: `url(${texture})`,
                          backgroundSize: "cover",
                          position: "relative"
                        }}
                      >
                        {overlayValue > 0 && (
                          <span
                            className={`cell-overlay layer-${activeLayer}`}
                            style={{
                              backgroundColor:
                                activeLayer === "tints" && tintLookup.get(tintValue)
                                  ? tintLookup.get(tintValue)
                                  : undefined
                            }}
                          />
                        )}
                        {detailValue > 0 && <span className="cell-chip detail" />}
                        {buildingValue > 0 && <span className="cell-chip building" />}
                        {collisionValue > 0 && <span className="cell-chip collision" />}
                        {coverValue > 0 && <span className="cell-chip cover" />}
                      </button>
                    );
                  })
                )}
              </div>
              <div className="editor-preview">
                <h4>Lupa</h4>
                {previewCells ? (
                  <div
                    className="preview-grid"
                    style={{ gridTemplateColumns: `repeat(${previewCells[0].length}, 48px)` }}
                  >
                    {previewCells.map((row, rowIndex) =>
                      row.map((cell, columnIndex) => {
                        if (!cell) {
                          return <span key={`${rowIndex}-${columnIndex}`} className="preview-cell empty" />;
                        }
                        const ground = groundLookup.get(cell.ground) ?? fallbackGround;
                        const detail = cell.detail > 0 ? detailLookup.get(cell.detail) ?? fallbackDetail : null;
                        const building = cell.building > 0 ? buildingLookup.get(cell.building) ?? fallbackBuilding : null;
                        const tintColor = tintLookup.get(cell.tint ?? 0);

                        return (
                          <span
                            key={`${rowIndex}-${columnIndex}`}
                            className="preview-cell"
                            style={{ backgroundImage: `url(${ground})` }}
                          >
                            {detail && <span className="preview-layer" style={{ backgroundImage: `url(${detail})` }} />}
                            {building && (
                              <span className="preview-layer" style={{ backgroundImage: `url(${building})`, opacity: 0.85 }} />
                            )}
                            {cell.collision > 0 && <span className="preview-chip collision" />}
                            {cell.cover > 0 && <span className="preview-chip cover" />}
                            {tintColor && <span className="preview-chip tint" style={{ backgroundColor: tintColor }} />}
                          </span>
                        );
                      })
                    )}
                  </div>
                ) : (
                  <p>Passe o cursor sobre o grid para pré-visualizar.</p>
                )}
              </div>
            </div>
            <div className="editor-actions">
              <button className="button" type="button" onClick={clearLayer}>
                Limpar camada ({layerLabels[activeLayer]})
              </button>
              <button className="button" type="button" onClick={fillLayer}>
                Preencher camada
              </button>
              <button className="button" type="button" onClick={copyToClipboard}>
                Copiar JSON
              </button>
              <button className="button" type="button" onClick={saveToServer}>
                {status === "saving" ? "Salvando…" : status === "saved" ? "Mapa salvo!" : "Salvar mapa"}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function createEmptyMap(width: number, height: number): CityMapData {
  const buildLayer = () => Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
  return {
    ground: buildLayer(),
    detail: buildLayer(),
    buildings: buildLayer(),
    tints: buildLayer(),
    collision: buildLayer(),
    cover: buildLayer()
  };
}

function applyBrush(
  layer: number[][],
  rowIndex: number,
  columnIndex: number,
  size: number,
  value: number
) {
  return layer.map((row, r) =>
    row.map((current, c) => {
      if (r >= rowIndex && r < rowIndex + size && c >= columnIndex && c < columnIndex + size) {
        return value;
      }
      return current;
    })
  );
}

function resizeMap(map: CityMapData, width: number, height: number): CityMapData {
  return {
    ground: resizeLayer(map.ground, width, height),
    detail: resizeLayer(map.detail, width, height),
    buildings: resizeLayer(map.buildings, width, height),
    tints: resizeLayer(map.tints, width, height),
    collision: resizeLayer(map.collision, width, height),
    cover: resizeLayer(map.cover, width, height)
  };
}

function resizeLayer(layer: number[][], width: number, height: number) {
  return Array.from({ length: height }, (_, rowIndex) =>
    Array.from({ length: width }, (_, columnIndex) => layer[rowIndex]?.[columnIndex] ?? 0)
  );
}

function clamp(value: number, min: number, max: number) {
  const next = Number.isNaN(value) ? min : value;
  return Math.max(min, Math.min(max, next));
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha no editor";
}

function buildPreviewCell(map: CityMapData, row: number, column: number) {
  if (row < 0 || column < 0) return null;
  if (!map.ground[row] || typeof map.ground[row][column] === "undefined") return null;
  return {
    row,
    column,
    ground: map.ground[row][column],
    detail: map.detail[row]?.[column] ?? 0,
    building: map.buildings[row]?.[column] ?? 0,
    tint: map.tints[row]?.[column] ?? 0,
    collision: map.collision[row]?.[column] ?? 0,
    cover: map.cover[row]?.[column] ?? 0
  };
}

function getDefaultTileForLayer(layer: LayerKey, manifest: TileManifest | null) {
  if (layer === "ground") return manifest?.ground?.[0]?.id ?? 0;
  if (layer === "detail") return manifest?.details?.[0]?.id ?? 0;
  if (layer === "buildings") return manifest?.buildings?.[0]?.id ?? 0;
  if (layer === "tints") return tintPalette[0].id;
  if (layer === "collision") return collisionPalette[0].id;
  if (layer === "cover") return coverPalette[0].id;
  return 0;
}
