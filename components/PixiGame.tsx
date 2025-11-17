"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Application, Assets, Container, Rectangle, Sprite, Texture } from "pixi.js";
import type { FederatedPointerEvent } from "pixi.js";
import { Tilemap } from "@/pixi/runtime/Tilemap";
import { Player } from "@/pixi/runtime/Player";
import { Camera } from "@/pixi/runtime/Camera";
import { InputController } from "@/pixi/runtime/InputController";
import { Hud } from "@/pixi/runtime/Hud";
import { createOverlayMatrix, splitTexture, type OverlaySlice } from "@/pixi/utils/overlay";
import { getNpcsForMap, type NpcDefinition } from "@/npc/data";
import { NpcActor } from "@/pixi/runtime/npcs/NpcActor";

const TILE_SIZE = 64;
const FALLBACK_MAP_NAME = "Cidade Central";
const DEFAULT_POSITION = { x: 4, y: 4 };

type Matrix<T> = T[][];

type SessionState = {
  map?: string;
  position?: { x: number; y: number };
  characterName?: string;
};

type Teleporter = {
  tile: { x: number; y: number };
  targetMap: string;
  targetTile: { x: number; y: number };
};

const TELEPORTERS: Record<string, Teleporter[]> = {
  cidadecentral: [
    {
      tile: { x: 6, y: 6 },
      targetMap: "refugio",
      targetTile: { x: 3, y: 3 }
    }
  ],
  refugio: [
    {
      tile: { x: 3, y: 3 },
      targetMap: "cidadecentral",
      targetTile: { x: 6, y: 6 }
    }
  ]
};

type MapPayload = {
  name: string;
  cols: number;
  rows: number;
  tilesLayer0?: Matrix<string>;
  tilesLayer1?: Matrix<string>;
  tilesLayer2?: Matrix<string>;
  blocks?: Matrix<boolean>;
  buildingOverlay?: Matrix<OverlaySlice>;
  spawn?: { x: number; y: number };
};

function createMatrix<T>(rows: number, cols: number, fill: T): Matrix<T> {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
}

function createFramesFromSheet(texture: Texture, frameCount: number): Texture[] {
  const totalWidth = texture.width || 128 * frameCount;
  const frameWidth = frameCount > 0 ? totalWidth / frameCount : totalWidth;
  const frameHeight = texture.height || 128;
  const safeCount = Math.max(1, frameCount);
  const frames: Texture[] = [];
  for (let index = 0; index < safeCount; index += 1) {
    const rect = new Rectangle(index * frameWidth, 0, frameWidth, frameHeight);
    frames.push(new Texture({ source: texture.source, frame: rect }));
  }
  return frames;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function normalizePosition(raw: { x: number; y: number } | undefined, cols: number, rows: number) {
  if (!raw) return { ...DEFAULT_POSITION };
  let x = Number(raw.x);
  let y = Number(raw.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return { ...DEFAULT_POSITION };
  }
  if (x >= cols || y >= rows || x < 0 || y < 0) {
    x = Math.floor(x / TILE_SIZE);
    y = Math.floor(y / TILE_SIZE);
  }
  return {
    x: clamp(Math.round(x), 0, cols - 1),
    y: clamp(Math.round(y), 0, rows - 1)
  };
}

type PixiGameProps = {
  onReadyChange?: (ready: boolean) => void;
  bottomOverlay?: ReactNode;
};

export function PixiGame({ onReadyChange, bottomOverlay }: PixiGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const mapNameRef = useRef("cidadecentral");
  const positionTrackerRef = useRef({ steps: 0, pending: false });
  const teleportingRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    const app = new Application();
    appRef.current = app;
    let disposed = false;
    let input: InputController | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let pointerHandler: ((event: FederatedPointerEvent) => void) | null = null;

    const start = async () => {
      const fireFrames = Array.from({ length: 8 }, (_, index) => `/tester/fire/${index + 1}.png`);
      const persistPositionRequest = async (mapName: string, tileX: number, tileY: number) => {
        try {
          await fetch("/api/session/position", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ map: mapName, x: tileX, y: tileY })
          });
        } catch (error) {
          console.warn("Failed to persist position", error);
        }
      };

      const sanitizeMapName = (value: string) => {
        const normalized = value.replace(/[^a-z0-9_-]/gi, "").toLowerCase();
        if (normalized === "city") return "cidadecentral";
        return normalized || "cidadecentral";
      };

      const loadMapPayload = async (mapName: string): Promise<MapPayload | null> => {
        try {
          const response = await fetch(`/api/maps/load?map=${encodeURIComponent(mapName)}`);
          if (!response.ok) return null;
          return (await response.json()) as MapPayload;
        } catch (error) {
          console.warn(`Failed to load map ${mapName}`, error);
          return null;
        }
      };

      let sessionState: SessionState = {
        map: "cidadecentral",
        position: { ...DEFAULT_POSITION },
        characterName: ""
      };
      try {
        const sessionResponse = await fetch("/api/session/state");
        if (sessionResponse.ok) {
          sessionState = (await sessionResponse.json()) as SessionState;
        }
      } catch (error) {
        console.warn("Failed to load session state", error);
      }

      const requestedMapName = sanitizeMapName(sessionState.map ?? "cidadecentral");
      let mapData = await loadMapPayload(requestedMapName);
      let resolvedMapName = requestedMapName;

      if (!mapData) {
        resolvedMapName = "cidadecentral";
        mapData = await loadMapPayload(resolvedMapName);
      }

      if (!mapData) {
        throw new Error("Falha ao carregar mapa padrão");
      }

      const targetMapName = sanitizeMapName(mapData.name ?? resolvedMapName);
      mapNameRef.current = targetMapName;
      teleportingRef.current = false;
      positionTrackerRef.current.steps = 0;
      positionTrackerRef.current.pending = false;
      const tileTextures = new Set<string>(["/tilesets/tile1.png", "/tilesets/tile2.png", "/tilesets/tile101.png"]);
      const addTiles = (matrix?: Matrix<string>) => {
        matrix?.forEach((row) =>
          row.forEach((path) => {
            if (path) tileTextures.add(path);
          })
        );
      };
      addTiles(mapData?.tilesLayer0);
      addTiles(mapData?.tilesLayer1);
      addTiles(mapData?.tilesLayer2);
      const npcDefinitions = getNpcsForMap(mapNameRef.current);
      npcDefinitions.forEach((definition) => {
        if (definition.sprite) tileTextures.add(definition.sprite);
        definition.framePaths?.forEach((path) => tileTextures.add(path));
      });
      const textureList = Array.from(tileTextures);
      await Assets.load([...textureList, ...fireFrames]);
      const fireTextures = fireFrames.map((path) => {
        const texture = Assets.get<Texture | undefined>(path);
        if (!texture) {
          throw new Error(`Fire texture missing from cache: ${path}`);
        }
        return texture;
      });
      await app.init({ resizeTo: target, backgroundAlpha: 0, antialias: true });
      target.appendChild(app.canvas);

      const worldLayer = new Container();
      const balloonLayer = new Container();
      const overlayLayer = new Container();
      app.stage.addChild(worldLayer);
      app.stage.addChild(balloonLayer);
      app.stage.addChild(overlayLayer);

      const cols = mapData.cols ?? 80;
      const rows = mapData.rows ?? 80;
      const defaultTile = "/tilesets/tile1.png";
      const tilesLayer0 = mapData.tilesLayer0 ?? createMatrix(rows, cols, defaultTile);
      const tilesLayer1 = mapData.tilesLayer1 ?? createMatrix(rows, cols, "");
      const tilesLayer2 = mapData.tilesLayer2 ?? createMatrix(rows, cols, "");
      const overlayMatrix = mapData.buildingOverlay ?? createOverlayMatrix(rows, cols, "none");
      const blocksMatrix = mapData.blocks ?? createMatrix(rows, cols, false);
      let spawn = normalizePosition(sessionState.position ?? mapData.spawn ?? DEFAULT_POSITION, cols, rows);
      if (sessionState.map !== targetMapName || !sessionState.position || sessionState.position.x !== spawn.x || sessionState.position.y !== spawn.y) {
        sessionState = { ...sessionState, map: targetMapName, position: spawn };
        await persistPositionRequest(targetMapName, spawn.x, spawn.y);
      } else {
        spawn = sessionState.position;
      }
      const tilemap = new Tilemap({ cols, rows, tileSize: TILE_SIZE, tilesLayer0, blocks: blocksMatrix, spawn });
      worldLayer.addChild(tilemap.container);

      const detailsLayer = new Container();
      worldLayer.addChild(detailsLayer);

      const buildingLayer = new Container();
      worldLayer.addChild(buildingLayer);

      const hud = new Hud(mapData?.name ?? FALLBACK_MAP_NAME);
      overlayLayer.addChild(hud.view);
      hud.resize(app.renderer.width);

      const tryTeleport = (tileX: number, tileY: number): boolean => {
        if (teleportingRef.current) return false;
        const entries = TELEPORTERS[mapNameRef.current] ?? [];
        const teleporter = entries.find((entry) => entry.tile.x === tileX && entry.tile.y === tileY);
        if (!teleporter) return false;
        teleportingRef.current = true;
        void persistPositionRequest(teleporter.targetMap, teleporter.targetTile.x, teleporter.targetTile.y).finally(() => {
          if (typeof window !== "undefined") {
            window.location.assign("/play");
          }
        });
        return true;
      };

      const handleStepPersistence = (tileX: number, tileY: number) => {
        const tracker = positionTrackerRef.current;
        tracker.steps += 1;
        if (tracker.steps < 2 || tracker.pending) return;
        tracker.steps = 0;
        tracker.pending = true;
        void persistPositionRequest(mapNameRef.current, tileX, tileY).finally(() => {
          tracker.pending = false;
        });
      };

      const handlePlayerMove = (tileX: number, tileY: number) => {
        hud.update({ x: tileX, y: tileY });
        if (tryTeleport(tileX, tileY)) return;
        handleStepPersistence(tileX, tileY);
      };

      const player = new Player(tilemap, fireTextures, handlePlayerMove, sessionState.characterName);
      worldLayer.addChild(player.view);

      const buildingTopLayer = new Container();
      worldLayer.addChild(buildingTopLayer);

      renderDecorLayers(detailsLayer, buildingLayer, buildingTopLayer, tilesLayer1, tilesLayer2, overlayMatrix);

      const spriteFrameCache = new Map<string, Texture[]>();
      const sequenceFrameCache = new Map<string, Texture[]>();
      const resolveNpcFrames = (definition: NpcDefinition): Texture[] => {
        if (definition.framePaths?.length) {
          const key = definition.framePaths.join("|");
          let frames = sequenceFrameCache.get(key);
          if (!frames) {
            frames = definition.framePaths.map((path) => {
              const texture = Assets.get<Texture | undefined>(path);
              if (!texture) throw new Error(`NPC texture missing: ${path}`);
              return texture;
            });
            sequenceFrameCache.set(key, frames);
          }
          return frames;
        }
        if (definition.sprite && definition.frames) {
          let frames = spriteFrameCache.get(definition.sprite);
          if (!frames) {
            const sheet = Texture.from(definition.sprite);
            frames = createFramesFromSheet(sheet, definition.frames);
            spriteFrameCache.set(definition.sprite, frames);
          }
          return frames;
        }
        if (definition.sprite) {
          return [Texture.from(definition.sprite)];
        }
        return [Texture.WHITE];
      };

      const npcActors = npcDefinitions.map((definition) => {
        const frames = resolveNpcFrames(definition);
        const actor = new NpcActor(tilemap, definition, frames, balloonLayer);
        worldLayer.addChild(actor.sprite);
        return actor;
      });

      const camera = new Camera({
        container: worldLayer,
        viewportWidth: app.renderer.width,
        viewportHeight: app.renderer.height,
        worldWidth: tilemap.worldWidth,
        worldHeight: tilemap.worldHeight
      });

      hud.update(player.tilePosition);

      input = new InputController(
        overlayLayer,
        (direction) => {
          player.tryMove(direction);
        },
        (direction, held) => {
          player.setDirectionHeld(direction, held);
        }
      );
      input.updateLayout(app.renderer.width, app.renderer.height);

      app.stage.eventMode = "static";
      pointerHandler = (event: FederatedPointerEvent) => {
        const worldPoint = camera.worldFromScreen(event.global.x, event.global.y);
        const tilePoint = tilemap.worldToTile(worldPoint.x, worldPoint.y);
        player.moveTo(tilePoint);
      };
      app.stage.on("pointerdown", pointerHandler);

      resizeObserver = new ResizeObserver(() => {
        camera.resize(app.renderer.width, app.renderer.height);
        hud.resize(app.renderer.width);
        input?.updateLayout(app.renderer.width, app.renderer.height);
      });
      resizeObserver.observe(target);

      app.ticker.add((ticker) => {
        const delta = ticker.deltaMS / 1000;
        player.update(delta);
        npcActors.forEach((npc) => npc.update(delta));
        camera.update(player.position);
        hud.update(player.tilePosition);
      });

      if (disposed) {
      app.destroy();
        return;
      }
      setReady(true);
      onReadyChange?.(true);
      function renderDecorLayers(
        details: Container,
        buildingsBottom: Container,
        buildingsTop: Container,
        detailsMatrix: Matrix<string>,
        buildingsMatrix: Matrix<string>,
        overlay: Matrix<OverlaySlice>
      ) {
        details.removeChildren();
        buildingsBottom.removeChildren();
        buildingsTop.removeChildren();
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const detailPath = detailsMatrix[y]?.[x];
            if (detailPath) {
              const sprite = Sprite.from(detailPath);
              sprite.anchor.set(0, 1);
              sprite.position.set(x * TILE_SIZE, (y + 1) * TILE_SIZE);
              details.addChild(sprite);
            }
            const buildingPath = buildingsMatrix[y]?.[x];
            if (!buildingPath) continue;
            const slice = overlay[y]?.[x] ?? "none";
            const fullTexture = Texture.from(buildingPath);
            const { texture, height } = splitTexture(fullTexture, slice, TILE_SIZE);
            const sprite = new Sprite(texture);
            sprite.anchor.set(0, 1);
            sprite.position.set(x * TILE_SIZE, (y + 1) * TILE_SIZE);
            if (slice === "top") {
              sprite.height = height;
              buildingsTop.addChild(sprite);
            } else if (slice === "bottom") {
              sprite.height = height;
              buildingsBottom.addChild(sprite);
            } else {
              sprite.height = texture.height || TILE_SIZE;
              buildingsBottom.addChild(sprite);
            }
          }
        }
      }
    };

    void start().catch((error) => {
      console.error("Failed to start PIXI scene", error);
      setReady(false);
      onReadyChange?.(false);
    });

    return () => {
      disposed = true;
      setReady(false);
      onReadyChange?.(false);
      resizeObserver?.disconnect();
      input?.dispose();
      const instance = appRef.current;
      if (instance && pointerHandler) {
        instance.stage.off("pointerdown", pointerHandler);
      }
      pointerHandler = null;
      if (instance) {
        instance.destroy();
      }
      appRef.current = null;
    };
  }, [onReadyChange]);

  return (
    <div className="w-full">
      <div className="mx-auto w-full h-screen md:h-[75vh] max-w-[1280px] px-4">
        <div className="relative h-full w-full" data-ready={ready}>
          <div ref={containerRef} className="h-full w-full overflow-hidden rounded-[32px] bg-[#05070c] shadow-2xl" />
          {bottomOverlay ? (
            <div className="pointer-events-none absolute inset-0">
              <div className="pointer-events-auto absolute bottom-5 left-1/2 -translate-x-1/2">
                {bottomOverlay}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
