"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSprite, Application, Assets, Container, Graphics, Texture, type FederatedPointerEvent } from "pixi.js";
import { TileSelect } from "./editor/TileSelect";
import { LayerControls } from "./editor/LayerControls";
import { OverlayControls } from "./editor/OverlayControls";
import { BlockControls } from "./editor/BlockControls";
import { MapMeta } from "./editor/MapMeta";
import { LoadControls } from "./editor/LoadControls";
import { DimensionControls } from "./editor/DimensionControls";
import {
  applyBlockBrush as applyBlockMatrix,
  clamp,
  createMatrix,
  hslToHex,
  paintTile as paintTileMatrices,
  rebuildScene as rebuildStage,
  type Matrix,
  type SceneContainers
} from "@/pixi/editor/sceneUtils";
import { createDefaultEditorState, hydrateEditorState, resizeEditorState, type EditorMatrices } from "@/pixi/editor/mapState";
import type { OverlaySlice } from "@/pixi/utils/overlay";

const TILE_SIZE = 64;
const FIRE_FRAMES = Array.from({ length: 8 }, (_, index) => `/tester/fire/${index + 1}.png`);

type MapPayload = {
  name: string;
  cols: number;
  rows: number;
  tilesLayer0?: Matrix<string>;
  tilesLayer1?: Matrix<string>;
  tilesLayer2?: Matrix<string>;
  tiles?: Matrix<string>;
  blocks?: Matrix<boolean>;
  buildingOverlay?: Matrix<OverlaySlice>;
};

type MapListResponse = {
  maps?: string[];
  tiles?: string[];
};

export function PixiEditor() {
  const [requestedMap, setRequestedMap] = useState<string | null | undefined>(undefined);
  const [tilePaths, setTilePaths] = useState<string[]>([]);
  const [selectedTile, setSelectedTile] = useState("/tilesets/tile1.png");
  const [blockMode, setBlockMode] = useState(false);
  const [cols, setCols] = useState(80);
  const [rows, setRows] = useState(80);
  const [tilesLayer0, setTilesLayer0] = useState<Matrix<string>>([]);
  const [tilesLayer1, setTilesLayer1] = useState<Matrix<string>>([]);
  const [tilesLayer2, setTilesLayer2] = useState<Matrix<string>>([]);
  const [buildingOverlay, setBuildingOverlay] = useState<Matrix<OverlaySlice>>([]);
  const [blocks, setBlocks] = useState<Matrix<boolean>>([]);
  const [mapName, setMapName] = useState("novo-mapa");
  const [maps, setMaps] = useState<string[]>([]);
  const [mapToLoad, setMapToLoad] = useState("");
  const [status, setStatus] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [sceneVersion, setSceneVersion] = useState(0);
  const [activeLayer, setActiveLayer] = useState<0 | 1 | 2>(0);
  const [brushSize, setBrushSize] = useState<1 | 2 | 3>(1);
  const [eraserMode, setEraserMode] = useState(false);
  const [overlayMode, setOverlayMode] = useState(false);
  const [tileGroup, setTileGroup] = useState("all");

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const worldLayerRef = useRef<Container | null>(null);
  const tileLayer0Ref = useRef<Container | null>(null);
  const tileLayer1Ref = useRef<Container | null>(null);
  const tileLayer2Ref = useRef<Container | null>(null);
  const blockLayerRef = useRef<Container | null>(null);
  const buildingTopLayerRef = useRef<Container | null>(null);
  const gridRef = useRef<Graphics | null>(null);
  const previewLayerRef = useRef<Container | null>(null);
  const tileMatrixLayer0Ref = useRef<Matrix<string>>([]);
  const tileMatrixLayer1Ref = useRef<Matrix<string>>([]);
  const tileMatrixLayer2Ref = useRef<Matrix<string>>([]);
  const buildingOverlayRef = useRef<Matrix<OverlaySlice>>([]);
  const activeLayerRef = useRef<0 | 1 | 2>(0);
  const blockMatrixRef = useRef<Matrix<boolean>>([]);
  const texturesRef = useRef<Record<string, Texture>>({});
  const selectedTileRef = useRef<string>(selectedTile);
  const blockModeRef = useRef(blockMode);
  const eraserRef = useRef(eraserMode);
  const overlayModeRef = useRef(overlayMode);
  const colsRef = useRef(cols);
  const rowsRef = useRef(rows);
  const brushSizeRef = useRef<1 | 2 | 3>(brushSize);
  const baseTileRef = useRef("/tilesets/tile1.png");
  const orbSpriteRef = useRef<AnimatedSprite | null>(null);
  const orbTexturesRef = useRef<Texture[]>([]);
  const orbTileRef = useRef({ x: 0, y: 0 });
  const orbMovingRef = useRef(false);
  const orbMoveElapsedRef = useRef(0);
  const orbTargetRef = useRef<{ x: number; y: number } | null>(null);
  const orbStartRef = useRef({ x: 0, y: 0 });
  const orbHueRef = useRef(0);
  const orbMoveDuration = 0.1;

  const baseTile = useMemo(() => {
    if (!tilePaths.length) return "/tilesets/tile1.png";
    return tilePaths.find((path) => path.includes("tile1")) ?? tilePaths[0];
  }, [tilePaths]);

  const groupedTiles = useMemo(() => {
    const groups: Record<string, string[]> = {};
    tilePaths.forEach((path) => {
      const segments = path.split("/");
      const tilesetsIndex = segments.indexOf("tilesets");
      const group = tilesetsIndex >= 0 && segments[tilesetsIndex + 1] ? segments[tilesetsIndex + 1] : "root";
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(path);
    });
    return groups;
  }, [tilePaths]);

  const visibleTiles = useMemo(() => {
    if (tileGroup === "all") return tilePaths;
    return groupedTiles[tileGroup] ?? [];
  }, [groupedTiles, tileGroup, tilePaths]);

  const applyEditorMatrices = useCallback(
    (next: EditorMatrices) => {
      tileMatrixLayer0Ref.current = next.layer0;
      tileMatrixLayer1Ref.current = next.layer1;
      tileMatrixLayer2Ref.current = next.layer2;
      buildingOverlayRef.current = next.overlay;
      blockMatrixRef.current = next.blocks;
      setTilesLayer0(next.layer0);
      setTilesLayer1(next.layer1);
      setTilesLayer2(next.layer2);
      setBuildingOverlay(next.overlay);
      setBlocks(next.blocks);
    },
    [setTilesLayer0, setTilesLayer1, setTilesLayer2, setBuildingOverlay, setBlocks]
  );

  useEffect(() => {
    selectedTileRef.current = selectedTile;
  }, [selectedTile]);

  useEffect(() => {
    blockModeRef.current = blockMode;
  }, [blockMode]);

  useEffect(() => {
    eraserRef.current = eraserMode;
  }, [eraserMode]);

  useEffect(() => {
    overlayModeRef.current = overlayMode;
  }, [overlayMode]);

  useEffect(() => {
    brushSizeRef.current = brushSize;
  }, [brushSize]);

  useEffect(() => {
    baseTileRef.current = baseTile;
  }, [baseTile]);

  useEffect(() => {
    colsRef.current = cols;
  }, [cols]);

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  useEffect(() => {
    activeLayerRef.current = activeLayer;
    setSceneVersion((version) => version + 1);
  }, [activeLayer]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const value = params.get("map");
    setRequestedMap(value);
  }, []);

  useEffect(() => {
    if (requestedMap === undefined) return;
    const fetchInitial = async () => {
      try {
        const response = await fetch("/api/maps/list");
        if (!response.ok) throw new Error("Failed to list maps");
        const data = (await response.json()) as MapListResponse;
        setMaps(data.maps ?? []);
        setTilePaths(data.tiles ?? []);
        if ((data.tiles ?? []).length > 0) {
          setSelectedTile(data.tiles[0]);
          selectedTileRef.current = data.tiles[0];
        }
        if (requestedMap) {
          await loadMapByName(requestedMap);
        } else if ((data.tiles ?? []).length > 0) {
          const defaults = createDefaultEditorState(rowsRef.current, colsRef.current, data.tiles[0]);
          applyEditorMatrices(defaults);
          setSceneVersion((version) => version + 1);
          setOrbTile(Math.floor(colsRef.current / 2), Math.floor(rowsRef.current / 2));
        }
      } catch (error) {
        console.error(error);
      }
    };
    void fetchInitial();
  }, [applyEditorMatrices, requestedMap, loadMapByName, setOrbTile]);

  useEffect(() => {
    if (!tilePaths.length) return;
    const loadTextures = async () => {
      const paths = [...tilePaths, ...FIRE_FRAMES];
      await Assets.load(paths);
      tilePaths.forEach((path) => {
        const texture = Assets.get<Texture | undefined>(path);
        if (texture) texturesRef.current[path] = texture;
      });
      orbTexturesRef.current = FIRE_FRAMES.map((path) => Assets.get<Texture | undefined>(path)).filter(
        (value): value is Texture => value instanceof Texture
      );
      setSceneVersion((version) => version + 1);
    };
    void loadTextures();
  }, [tilePaths]);

  const handlePaintTile = useCallback(
    (x: number, y: number, layer: 0 | 1 | 2, tilePath: string) => {
      const updated = paintTileMatrices(
        {
          layer0: tileMatrixLayer0Ref.current,
          layer1: tileMatrixLayer1Ref.current,
          layer2: tileMatrixLayer2Ref.current,
          overlay: buildingOverlayRef.current
        },
        {
          tileX: x,
          tileY: y,
          tilePath,
          layer,
          brushSize: brushSizeRef.current,
          cols: colsRef.current,
          rows: rowsRef.current,
          overlayEnabled: overlayModeRef.current,
          baseTile: baseTileRef.current
        }
      );
      tileMatrixLayer0Ref.current = updated.layer0;
      tileMatrixLayer1Ref.current = updated.layer1;
      tileMatrixLayer2Ref.current = updated.layer2;
      buildingOverlayRef.current = updated.overlay;
      setTilesLayer0(updated.layer0);
      setTilesLayer1(updated.layer1);
      setTilesLayer2(updated.layer2);
      setBuildingOverlay(updated.overlay);
    },
    []
  );

  useEffect(() => {
    const target = canvasRef.current;
    if (!target) return;
    const app = new Application();
    const init = async () => {
      await app.init({ resizeTo: target, backgroundAlpha: 0, antialias: true });
      target.appendChild(app.canvas);
      app.stage.sortableChildren = true;

      const worldLayer = new Container();
      worldLayerRef.current = worldLayer;
      app.stage.addChild(worldLayer);

      const grid = new Graphics();
      gridRef.current = grid;
      worldLayer.addChild(grid);

      const tileLayer0 = new Container();
      tileLayer0Ref.current = tileLayer0;
      worldLayer.addChild(tileLayer0);

      const tileLayer1 = new Container();
      tileLayer1Ref.current = tileLayer1;
      worldLayer.addChild(tileLayer1);

      const tileLayer2 = new Container();
      tileLayer2Ref.current = tileLayer2;
      worldLayer.addChild(tileLayer2);

      const previewLayer = new Container();
      previewLayer.eventMode = "none";
      previewLayerRef.current = previewLayer;
      worldLayer.addChild(previewLayer);

      const blockLayer = new Container();
      blockLayerRef.current = blockLayer;
      worldLayer.addChild(blockLayer);

      const buildingTopLayer = new Container();
      buildingTopLayerRef.current = buildingTopLayer;
      worldLayer.addChild(buildingTopLayer);

      worldLayer.eventMode = "static";
      worldLayer.on("pointerdown", (event: FederatedPointerEvent) => {
        if (!tileLayer0Ref.current) return;
        const local = tileLayer0Ref.current.toLocal(event.global);
        const tileX = Math.floor(local.x / TILE_SIZE);
        const tileY = Math.floor(local.y / TILE_SIZE);
        if (tileX < 0 || tileY < 0 || tileX >= colsRef.current || tileY >= rowsRef.current) return;
        if (blockModeRef.current) {
          const nextBlocks = applyBlockMatrix(
            blockMatrixRef.current,
            brushSizeRef.current,
            tileX,
            tileY,
            colsRef.current,
            rowsRef.current,
            !eraserRef.current
          );
          blockMatrixRef.current = nextBlocks;
          setBlocks(nextBlocks);
          setSceneVersion((version) => version + 1);
          return;
        }
        const layer = activeLayerRef.current;
        const fallback = layer === 0 ? baseTileRef.current : "";
        const tilePath = eraserRef.current ? fallback : selectedTileRef.current || fallback;
        handlePaintTile(tileX, tileY, layer, tilePath);
      });

      app.ticker.add((ticker) => updateOrb(ticker.deltaMS));
      appRef.current = app;
      setReady(true);
    };
    void init();

    return () => {
      app.destroy(true);
      appRef.current = null;
    };
  }, [handlePaintTile, updateOrb]);

  useEffect(() => {
    if (!ready || !tilePaths.length || !tilesLayer0.length) return;
    rebuildScene();
  }, [ready, tilePaths, tilesLayer0, tilesLayer1, tilesLayer2, buildingOverlay, blocks, cols, rows, sceneVersion, rebuildScene]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      let moved = false;
      if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") moved = attemptOrbMove(0, -1);
      else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") moved = attemptOrbMove(0, 1);
      else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") moved = attemptOrbMove(-1, 0);
      else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") moved = attemptOrbMove(1, 0);
      if (moved) event.preventDefault();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [attemptOrbMove]);

  const fillLayer = useCallback((layer: 0 | 1 | 2, tilePath: string) => {
    const next = createMatrix(rowsRef.current, colsRef.current, tilePath);
    if (layer === 0) {
      tileMatrixLayer0Ref.current = next;
      setTilesLayer0(next);
    } else if (layer === 1) {
      tileMatrixLayer1Ref.current = next;
      setTilesLayer1(next);
    } else {
      tileMatrixLayer2Ref.current = next;
      setTilesLayer2(next);
    }
    setSceneVersion((version) => version + 1);
  }, []);

  const clearLayer = useCallback(() => {
    const defaultTile = activeLayer === 0 ? baseTileRef.current : "";
    fillLayer(activeLayer, defaultTile);
  }, [activeLayer, fillLayer]);

  const fillAll = useCallback(
    (tilePath: string) => {
      fillLayer(activeLayer, tilePath);
    },
    [activeLayer, fillLayer]
  );

  const unblockAll = useCallback(() => {
    const next = createMatrix(rowsRef.current, colsRef.current, false);
    blockMatrixRef.current = next;
    setBlocks(next);
    setSceneVersion((version) => version + 1);
  }, []);

  const handleResizeMap = (newCols: number, newRows: number) => {
    if (!Number.isFinite(newCols) || !Number.isFinite(newRows)) return;
    if (newCols <= 0 || newRows <= 0) return;
    const resized = resizeEditorState(
      {
        layer0: tileMatrixLayer0Ref.current,
        layer1: tileMatrixLayer1Ref.current,
        layer2: tileMatrixLayer2Ref.current,
        overlay: buildingOverlayRef.current,
        blocks: blockMatrixRef.current
      },
      newCols,
      newRows,
      { ground: selectedTileRef.current || baseTileRef.current, upper: "" }
    );
    setCols(newCols);
    setRows(newRows);
    applyEditorMatrices(resized);
    setOrbTile(orbTileRef.current.x, orbTileRef.current.y, newCols, newRows);
    setSceneVersion((version) => version + 1);
  };

  const rebuildScene = useCallback(() => {
    if (!tileLayer0Ref.current || !tileLayer1Ref.current || !tileLayer2Ref.current || !blockLayerRef.current || !gridRef.current) {
      return;
    }
    const containers: SceneContainers = {
      tileLayer0: tileLayer0Ref.current,
      tileLayer1: tileLayer1Ref.current,
      tileLayer2: tileLayer2Ref.current,
      blockLayer: blockLayerRef.current,
      previewLayer: previewLayerRef.current,
      buildingTopLayer: buildingTopLayerRef.current
    };
    rebuildStage(containers, {
      tilesLayer0,
      tilesLayer1,
      tilesLayer2,
      overlayMatrix: buildingOverlay,
      blocks,
      rows,
      cols,
      tileSize: TILE_SIZE,
      activeLayer,
      textures: texturesRef.current
    });
    drawGrid(gridRef.current, cols, rows);
    ensureOrbSprite();
  }, [tilesLayer0, tilesLayer1, tilesLayer2, buildingOverlay, blocks, rows, cols, activeLayer, ensureOrbSprite]);

  const ensureOrbSprite = useCallback(() => {
    if (!worldLayerRef.current || !orbTexturesRef.current.length) return;
    if (!orbSpriteRef.current) {
      const sprite = new AnimatedSprite(orbTexturesRef.current);
      sprite.anchor.set(0.5);
      sprite.width = TILE_SIZE * 0.9;
      sprite.height = TILE_SIZE * 0.9;
      sprite.animationSpeed = 0.24;
      sprite.play();
      orbSpriteRef.current = sprite;
      worldLayerRef.current.addChild(sprite);
    }
    updateOrbWorldPosition();
  }, [updateOrbWorldPosition]);

  const setOrbTile = useCallback((x: number, y: number, maxCols = colsRef.current, maxRows = rowsRef.current) => {
    orbTileRef.current = {
      x: clamp(x, 0, maxCols - 1),
      y: clamp(y, 0, maxRows - 1)
    };
    orbMovingRef.current = false;
    orbTargetRef.current = null;
    orbMoveElapsedRef.current = 0;
    updateOrbWorldPosition();
  }, [updateOrbWorldPosition]);

  const followOrb = useCallback(() => {
    if (!worldLayerRef.current || !appRef.current || !orbSpriteRef.current) return;
    const renderer = appRef.current.renderer;
    const viewportWidth = renderer.width;
    const viewportHeight = renderer.height;
    const worldWidth = colsRef.current * TILE_SIZE;
    const worldHeight = rowsRef.current * TILE_SIZE;
    const targetX = clamp(orbSpriteRef.current.position.x - viewportWidth / 2, 0, Math.max(0, worldWidth - viewportWidth));
    const targetY = clamp(orbSpriteRef.current.position.y - viewportHeight / 2, 0, Math.max(0, worldHeight - viewportHeight));
    worldLayerRef.current.position.set(-targetX, -targetY);
  }, []);

  const updateOrbWorldPosition = useCallback(() => {
    if (!orbSpriteRef.current) return;
    orbSpriteRef.current.position.set(orbTileRef.current.x * TILE_SIZE + TILE_SIZE / 2, orbTileRef.current.y * TILE_SIZE + TILE_SIZE / 2);
    followOrb();
  }, [followOrb]);

  const attemptOrbMove = useCallback((dx: number, dy: number): boolean => {
    if (orbMovingRef.current) return false;
    const nextX = clamp(orbTileRef.current.x + dx, 0, cols - 1);
    const nextY = clamp(orbTileRef.current.y + dy, 0, rows - 1);
    if (blockMatrixRef.current[nextY]?.[nextX]) return false;
    if (nextX === orbTileRef.current.x && nextY === orbTileRef.current.y) return false;
    orbTileRef.current = { x: nextX, y: nextY };
    const sprite = orbSpriteRef.current;
    if (sprite) {
      orbStartRef.current = { x: sprite.position.x, y: sprite.position.y };
    } else {
      orbStartRef.current = { x: nextX * TILE_SIZE + TILE_SIZE / 2, y: nextY * TILE_SIZE + TILE_SIZE / 2 };
    }
    orbTargetRef.current = { x: nextX * TILE_SIZE + TILE_SIZE / 2, y: nextY * TILE_SIZE + TILE_SIZE / 2 };
    orbMovingRef.current = true;
    orbMoveElapsedRef.current = 0;
    return true;
  }, [cols, rows]);

  const updateOrb = useCallback((deltaMS: number) => {
    if (!orbSpriteRef.current) return;
    orbHueRef.current = (orbHueRef.current + deltaMS * 0.0002) % 1;
    orbSpriteRef.current.tint = hslToHex(orbHueRef.current, 0.75, 0.6);
    if (orbMovingRef.current && orbTargetRef.current) {
      orbMoveElapsedRef.current += deltaMS / 1000;
      const t = Math.min(1, orbMoveElapsedRef.current / orbMoveDuration);
      const sprite = orbSpriteRef.current;
      const start = orbStartRef.current;
      sprite.position.set(start.x + (orbTargetRef.current.x - start.x) * t, start.y + (orbTargetRef.current.y - start.y) * t);
      if (t >= 1) {
        orbMovingRef.current = false;
        orbTargetRef.current = null;
        sprite.position.set(orbTileRef.current.x * TILE_SIZE + TILE_SIZE / 2, orbTileRef.current.y * TILE_SIZE + TILE_SIZE / 2);
      }
    }
    followOrb();
  }, [followOrb]);

  function drawGrid(graphics: Graphics | null, gridCols: number, gridRows: number): void {
    if (!graphics) return;
    const width = gridCols * TILE_SIZE;
    const height = gridRows * TILE_SIZE;

    graphics.clear();
    graphics.stroke({ width: 1, color: 0xffffff, alpha: 0.15 });

    for (let x = 0; x <= width; x += TILE_SIZE) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += TILE_SIZE) {
      graphics.moveTo(0, y);
      graphics.lineTo(width, y);
    }
  }

  const loadMapByName = useCallback(async (name: string) => {
    try {
      const response = await fetch(`/api/maps/load?map=${encodeURIComponent(name)}`);
      if (!response.ok) throw new Error("Map not found");
      const data = (await response.json()) as MapPayload;
      setMapName(data.name);
      setCols(data.cols);
      setRows(data.rows);
      const hydrated = hydrateEditorState(data, selectedTileRef.current || baseTileRef.current);
      applyEditorMatrices(hydrated);
      setSceneVersion((version) => version + 1);
      setOrbTile(Math.floor(data.cols / 2), Math.floor(data.rows / 2), data.cols, data.rows);
      setStatus(`Mapa "${data.name}" carregado`);
    } catch (error) {
      console.error(error);
      setStatus("Erro ao carregar mapa");
    }
  }, [applyEditorMatrices, setOrbTile]);

  const persistMap = async (name: string) => {
    try {
      const payload: MapPayload = {
        name,
        cols,
        rows,
        tilesLayer0: tileMatrixLayer0Ref.current,
        tilesLayer1: tileMatrixLayer1Ref.current,
        tilesLayer2: tileMatrixLayer2Ref.current,
        buildingOverlay: buildingOverlayRef.current,
        blocks: blockMatrixRef.current
      };
      const response = await fetch("/api/maps/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Erro ao salvar");
      setMapName(name);
      setStatus(`Mapa "${name}" salvo com sucesso`);
      const listResponse = await fetch("/api/maps/list");
      if (listResponse.ok) {
        const listData = (await listResponse.json()) as MapListResponse;
        setMaps(listData.maps ?? []);
      }
    } catch (error) {
      console.error(error);
      setStatus("Falha ao salvar mapa");
    }
  };

  const handleSave = () => {
    const safeName = mapName.trim() || "novo-mapa";
    void persistMap(safeName);
  };

  const handleSaveAs = () => {
    const newName = window.prompt("Nome do mapa:", mapName) ?? "";
    if (!newName.trim()) return;
    void persistMap(newName.trim());
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-3xl border border-white/5 bg-[#0a0d16]/80 p-4 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold uppercase tracking-widest text-white/60">Editor PIXI</div>
          <div className="text-xs text-amber-300">{status}</div>
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <div
              ref={canvasRef}
              className="h-[70vh] w-full overflow-hidden rounded-2xl border border-white/5 bg-[#05070c]"
              data-ready={ready}
            />
          </div>
          <aside className="w-80 space-y-4 rounded-2xl border border-white/5 bg-black/30 p-4">
            <MapMeta mapName={mapName} status={status} onMapNameChange={setMapName} onSave={handleSave} onSaveAs={handleSaveAs} />
            <LoadControls maps={maps} selectedMap={mapToLoad} onSelect={setMapToLoad} onLoad={() => mapToLoad && loadMapByName(mapToLoad)} />
            <TileSelect
              groups={Object.keys(groupedTiles)}
              selectedGroup={tileGroup}
              onGroupChange={setTileGroup}
              tiles={visibleTiles}
              selectedTile={selectedTile}
              onSelect={setSelectedTile}
            />
            <LayerControls
              activeLayer={activeLayer}
              onLayerChange={setActiveLayer}
              brushSize={brushSize}
              onBrushChange={setBrushSize}
              eraserMode={eraserMode}
              onToggleEraser={() => setEraserMode((previous) => !previous)}
            />
            <OverlayControls
              overlayMode={overlayMode}
              disabled={activeLayer !== 2}
              onToggle={() => {
                if (activeLayer === 2) {
                  setOverlayMode((previous) => !previous);
                }
              }}
            />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Ferramentas</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillAll(selectedTile || baseTile)}
                  className="flex-1 rounded-lg border border-white/20 bg-amber-500/20 px-3 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-300/60 hover:bg-amber-400/20"
                >
                  Fill Layer
                </button>
                <button
                  type="button"
                  onClick={clearLayer}
                  className="flex-1 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  Clear Layer
                </button>
              </div>
            </div>
            <BlockControls blockMode={blockMode} onToggleBlock={() => setBlockMode((prev) => !prev)} onUnblockAll={unblockAll} />
            <DimensionControls cols={cols} rows={rows} onColsChange={(value) => handleResizeMap(value, rows)} onRowsChange={(value) => handleResizeMap(cols, value)} />
            <p className="text-xs text-white/60">
              Use as setas/WASD para mover o orbe animado. Clique para pintar tiles ou alternar bloqueios (se Block Mode estiver ligado). A câmera segue o
              personagem automaticamente.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
