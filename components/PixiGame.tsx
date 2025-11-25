"use client";

import type { FederatedPointerEvent } from "pixi.js";

import { AnimatedSprite, Application, Assets, Container, Graphics, Rectangle, Sprite, Text, Texture } from "pixi.js";
import { type ReactNode, useEffect, useRef, useState } from "react";

import type { SpriteColorValue, SpriteOptionValue } from "@/lib/characterSpriteOptions";

import { getSpriteColorTint } from "@/lib/characterSpriteOptions";
import { getCharacterSpriteConfig } from "@/lib/characterSprites";
import { levelUpEffect, teleportEffect } from "@/lib/effects";
import { resolveLevel, xpForLevel, xpNeededForNextLevel } from "@/lib/progression";
import { getMonstersForMap, type MonsterDefinition } from "@/monsters/data";
import { getNpcsForMap, type NpcDefinition } from "@/npc/data";
import { playAttackSound, playDamageSound, playDeathSound, playLevelUpSound, playXpSound } from "@/pixi/runtime/audio";
import { Camera } from "@/pixi/runtime/Camera";
import { FloatingTextManager } from "@/pixi/runtime/effects/FloatingText";
import { Hud } from "@/pixi/runtime/Hud";
import { InputController } from "@/pixi/runtime/InputController";
import { MonsterActor } from "@/pixi/runtime/monsters/MonsterActor";
import { NpcActor } from "@/pixi/runtime/npcs/NpcActor";
import { Player } from "@/pixi/runtime/Player";
import { Tilemap } from "@/pixi/runtime/Tilemap";
import { createOverlayMatrix, type OverlaySlice, splitTexture } from "@/pixi/utils/overlay";

const TILE_SIZE = 64;
const FALLBACK_MAP_NAME = "Cidade Central";
const DEFAULT_POSITION = { x: 4, y: 4 };
const PLAYER_CLASS = "Iniciante";
const CORPSE_TEXTURE = "/itens/dead.png";
const GOLD_NOTICE_ICON = "/icons/achievements.png";

type Matrix<T> = T[][];

type CharacterStatsSnapshot = {
  hp: number;
  energy: number;
  xp: number;
  level: number;
};

type SessionState = {
  ownerId?: string;
  characterId?: string;
  map?: string;
  position?: { x: number; y: number };
  characterName?: string;
  characterSprite?: SpriteOptionValue;
  spriteColor?: SpriteColorValue;
  stats?: CharacterStatsSnapshot;
};

type Teleporter = {
  tile: { x: number; y: number };
  targetMap: string;
  targetTile: { x: number; y: number };
};

type MonsterListItem = {
  id: string;
  name: string;
  rarity: string;
  level: number;
  hpText: string;
  danger: string;
  dangerColor: number;
};

type NpcListItem = {
  id: string;
  name: string;
  rarity: string;
  danger: string;
  hpText: string;
};

export type EntityListSnapshot = {
  monsters: MonsterListItem[];
  npcs: NpcListItem[];
};

type CorpseArtifactPayload = {
  id: string;
  tile: { x: number; y: number };
  expiresAt: number;
};

type LootArtifactPayload = {
  id: string;
  itemId: string;
  name: string;
  icon: string;
  tile: { x: number; y: number };
  quantity: number;
  expiresAt: number;
  stackable?: boolean;
  maxStack?: number;
};

type ArtifactPayload = {
  corpses: CorpseArtifactPayload[];
  loot: LootArtifactPayload[];
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

const MONSTER_SLOT_OFFSETS = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 }
];

const LOOT_OFFSETS = [{ x: 0, y: 0 }, ...MONSTER_SLOT_OFFSETS];

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

type MonsterRuntimeState = {
  actor: MonsterActor | null;
  respawn: number;
  slot: number | null;
};

type CorpseEntry = {
  id: string;
  tile: { x: number; y: number };
  sprite: Sprite;
  timer: number;
  expiresAt: number;
};

type LootDropEntry = {
  artifactId: string;
  itemId: string;
  name: string;
  icon: string;
  tile: { x: number; y: number };
  quantity: number;
  container: Container;
  label: Text;
  timer: number;
  expiresAt: number;
  source: NonNullable<MonsterDefinition["lootTable"]>[number];
};

type PickupNotice = {
  container: Container;
  timer: number;
  duration: number;
};

type ConnectionStatus =
  | "connecting"
  | "online"
  | "offline"
  | "reconnecting"
  | "error"
  | "unreachable";

function createMatrix<T>(rows: number, cols: number, fill: T): Matrix<T> {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
}

function createFramesFromSheet(
  texture: Texture,
  frameCount: number,
  frameWidth?: number,
  frameHeight?: number,
  frameSpacing = 0
): Texture[] {
  const effectiveWidth = frameWidth ?? texture.width ?? 128;
  const resolvedFrameWidth = frameWidth ?? effectiveWidth;
  const resolvedFrameHeight = frameHeight ?? texture.height ?? 128;
  const safeCount = Math.max(1, frameCount);
  const frames: Texture[] = [];
  for (let index = 0; index < safeCount; index += 1) {
    const rect = new Rectangle(index * (resolvedFrameWidth + frameSpacing), 0, resolvedFrameWidth, resolvedFrameHeight);
    frames.push(new Texture({ source: texture.source, frame: rect }));
  }
  return frames;
}

function randomBetween(min: number, max: number): number {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
  onEntityListChange?: (snapshot: EntityListSnapshot) => void;
};

export function PixiGame({ onReadyChange, bottomOverlay, onEntityListChange }: PixiGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const mapNameRef = useRef("cidadecentral");
  const positionTrackerRef = useRef({ steps: 0, pending: false });
  const teleportingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const worldLayerRef = useRef<Container | null>(null);
  const corpseLayerRef = useRef<Container | null>(null);
  const lootLayerRef = useRef<Container | null>(null);
  const corpsesRef = useRef<CorpseEntry[]>([]);
  const lootDropsRef = useRef<LootDropEntry[]>([]);
  const pickupNoticesRef = useRef<PickupNotice[]>([]);
  const persistArtifactsRef = useRef<(() => Promise<void>) | null>(null);
  const artifactsDirtyRef = useRef(false);
  const persistInFlightRef = useRef(false);
  const entityListTimerRef = useRef(0);
  const artifactPersistTimerRef = useRef(0);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setConnectionStatus("offline");
      return;
    }
    const app = new Application();
    appRef.current = app;
    let disposed = false;
    let input: InputController | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let pointerHandler: ((event: FederatedPointerEvent) => void) | null = null;
    let player: Player | null = null;
    let floatingTextManager: FloatingTextManager | null = null;

    const start = async () => {
      let sessionState = await loadSessionState(setConnectionStatus);
      if (!sessionState) {
        return;
      }
      const { persistPositionRequest, handleStepPersistence } = createPositionPersistence(mapNameRef, positionTrackerRef);

      const mapSetup = await initializeMapResources({
        app,
        target,
        sessionState,
        mapNameRef,
        teleportingRef,
        positionTrackerRef,
        persistPositionRequest
      });
      sessionState = mapSetup.sessionState;
      const {
        mapData,
        tilemap,
        npcDefinitions,
        monsterDefinitions,
        npcSnapshotBase,
        tilesLayer1,
        tilesLayer2,
        overlayMatrix,
        overlayLayer,
        effectLayer,
        balloonLayer,
        detailsLayer,
        buildingLayer,
        worldLayer,
        corpseLayer,
        lootLayer,
        hpMax,
        manaMax,
        xpStats,
        teleportFrames,
        levelUpFrames,
        playerSpriteConfig,
        playerTint
      } = mapSetup;
      worldLayerRef.current = worldLayer;
      corpseLayerRef.current = corpseLayer;
      lootLayerRef.current = lootLayer;
      floatingTextManager = mapSetup.floatingTextManager;
      const hudState = initializeHudComponents({
        overlayLayer,
        mapName: mapData?.name ?? FALLBACK_MAP_NAME,
        xpStats,
        hpMax,
        manaMax,
        app,
        characterName: sessionState.characterName
      });
      const effectHandlers = initializeEffectHandlers({ effectLayer, teleportFrames, levelUpFrames });
      const tryTeleport = createTeleportHandler({
        mapNameRef,
        teleportingRef,
        tilemap,
        persistPositionRequest,
        playTeleportEffect: effectHandlers.playTeleportEffect
      });

      const showPlayerFloatingText = (text: string, color: number, duration = 1.2) => {
        if (!player) return;
        const headY = player.position.y - TILE_SIZE * 1.3;
        floatingTextManager?.spawn({
          text,
          x: player.position.x,
          y: headY,
          color,
          duration,
          rise: 32,
          fontSize: 15
        });
      };

      const handlePlayerMove = (tileX: number, tileY: number) => {
        hudState.hud.updatePosition({ x: tileX, y: tileY });
        if (tryTeleport(tileX, tileY, player)) return;
        handleStepPersistence(tileX, tileY);
      };

      player = initializePlayerActor({
        tilemap,
        playerSpriteConfig,
        playerTint,
        characterName: sessionState.characterName,
        level: xpStats.level,
        onMove: handlePlayerMove
      });
      worldLayer.addChild(player.view);
      player.view.zIndex = 200;
      hudState.hud.setMapName(mapData?.name ?? FALLBACK_MAP_NAME);
      hudState.syncVitals();
      hudState.hud.updatePosition(player.tilePosition);

      const applyPlayerDamage = (amount: number) => {
        xpStats.hp = clamp(xpStats.hp - amount, 0, hpMax);
        hudState.syncVitals();
        showPlayerFloatingText(`-${amount} HP`, 0xf87171);
      };

      const buildingTopLayer = new Container();
      worldLayer.addChild(buildingTopLayer);

      renderDecorLayers(
        detailsLayer,
        buildingLayer,
        buildingTopLayer,
        tilesLayer1,
        tilesLayer2,
        overlayMatrix,
        tilemap.cols,
        tilemap.rows
      );

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
            frames = createFramesFromSheet(
              sheet,
              definition.frames,
              definition.frameWidth,
              definition.frameHeight,
              definition.frameSpacing
            );
            spriteFrameCache.set(definition.sprite, frames);
          }
          return frames;
        }
        if (definition.sprite) {
          return [Texture.from(definition.sprite)];
        }
        return [Texture.WHITE];
      };

      const monsterState = new Map<string, MonsterRuntimeState>();
      monsterDefinitions.forEach((definition) => {
        monsterState.set(definition.id, { actor: null, respawn: 0, slot: null });
      });
      corpsesRef.current = [];
      lootDropsRef.current = [];
      pickupNoticesRef.current = [];
      entityListTimerRef.current = 0;
      artifactsDirtyRef.current = false;
      artifactPersistTimerRef.current = 0;
      persistInFlightRef.current = false;

      const spawnCorpse = (tile: { x: number; y: number }, existing?: CorpseArtifactPayload) => {
        if (!tilemap.isInside(tile.x, tile.y)) return;
        const expiresAt = existing?.expiresAt ?? Date.now() + 60 * 1000;
        const timer = Math.max(0, (expiresAt - Date.now()) / 1000);
        if (timer <= 0) return;
        const centerX = tile.x * TILE_SIZE + TILE_SIZE / 2;
        const baseY = (tile.y + 1) * TILE_SIZE;
        const sprite = Sprite.from(CORPSE_TEXTURE);
        sprite.anchor.set(0.5, 1);
        sprite.width = 64;
        sprite.height = 64;
        sprite.alpha = 0.85;
        sprite.position.set(centerX, baseY);
        corpseLayer.addChild(sprite);
        const corpses = corpsesRef.current;
        corpses.push({ id: existing?.id ?? makeId(), tile: { ...tile }, sprite, timer, expiresAt });
        if (!existing) {
          artifactsDirtyRef.current = true;
        }
      };

      const updateCorpses = (deltaSeconds: number) => {
        const corpses = corpsesRef.current;
        for (let index = corpses.length - 1; index >= 0; index -= 1) {
          const corpse = corpses[index];
          corpse.timer -= deltaSeconds;
          if (corpse.timer <= 0) {
            corpseLayer.removeChild(corpse.sprite);
            corpse.sprite.destroy();
            corpses.splice(index, 1);
            artifactsDirtyRef.current = true;
          }
        }
      };

      const addLootDrop = (
        entry: NonNullable<MonsterDefinition["lootTable"]>[number],
        tile: { x: number; y: number },
        quantity: number,
        existingPayload?: LootArtifactPayload
      ) => {
        if (!tilemap.isInside(tile.x, tile.y)) return;
        const lootDrops = lootDropsRef.current;
        const existing = lootDrops.find((drop) => drop.itemId === entry.id && drop.tile.x === tile.x && drop.tile.y === tile.y);
        if (existing) {
          existing.quantity += quantity;
          existing.label.text = `x${existing.quantity}`;
          existing.expiresAt = Date.now() + 5 * 60 * 1000;
          existing.timer = Math.max(0, (existing.expiresAt - Date.now()) / 1000);
          artifactsDirtyRef.current = true;
          return;
        }
        const expiresAt = existingPayload?.expiresAt ?? Date.now() + 5 * 60 * 1000;
        const timer = Math.max(0, (expiresAt - Date.now()) / 1000);
        if (timer <= 0) return;
        const container = new Container();
        const worldPoint = tilemap.tileToWorld(tile.x, tile.y);
        container.position.set(worldPoint.x, worldPoint.y - TILE_SIZE * 0.25);
        container.zIndex = 15;
        const iconSprite = Sprite.from(entry.icon);
        iconSprite.anchor.set(0.5, 1);
        iconSprite.width = 28;
        iconSprite.height = 28;
        const qtyLabel = new Text({
          text: `x${quantity}`,
          style: { fill: 0xffffff, fontSize: 12, fontWeight: "700", stroke: { color: 0x000000, width: 4 } }
        });
        qtyLabel.anchor.set(0.5, 0);
        qtyLabel.position.set(0, 4);
        container.addChild(iconSprite);
        container.addChild(qtyLabel);
        lootLayer.addChild(container);
        lootDrops.push({
          artifactId: existingPayload?.id ?? makeId(),
          itemId: entry.id,
          name: entry.name,
          icon: entry.icon,
          tile: { ...tile },
          quantity,
          container,
          label: qtyLabel,
          timer,
          expiresAt,
          source: entry
        });
        if (!existingPayload) {
          artifactsDirtyRef.current = true;
        }
      };

      const serializeArtifacts = (): ArtifactPayload => ({
        corpses: corpsesRef.current.map((corpse) => ({ id: corpse.id, tile: corpse.tile, expiresAt: corpse.expiresAt })),
        loot: lootDropsRef.current.map((drop) => ({
          id: drop.artifactId,
          itemId: drop.itemId,
          name: drop.name,
          icon: drop.icon,
          tile: drop.tile,
          quantity: drop.quantity,
          expiresAt: drop.expiresAt,
          stackable: drop.source.stackable,
          maxStack: drop.source.maxStack
        }))
      });

      const loadMapArtifactsSnapshot = async (map: string): Promise<ArtifactPayload> => {
        try {
          const response = await fetch(`/api/map/artifacts?map=${encodeURIComponent(map)}`);
          if (!response.ok) return { corpses: [], loot: [] };
          return (await response.json()) as ArtifactPayload;
        } catch (error) {
          console.warn("Failed to load map artifacts", error);
          return { corpses: [], loot: [] };
        }
      };

      const persistArtifacts = async (): Promise<void> => {
        if (!artifactsDirtyRef.current || persistInFlightRef.current) return;
        persistInFlightRef.current = true;
        const payload = serializeArtifacts();
        try {
          await fetch("/api/map/artifacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ map: mapNameRef.current, corpses: payload.corpses, loot: payload.loot })
          });
          artifactsDirtyRef.current = false;
        } catch (error) {
          console.warn("Failed to persist map artifacts", error);
          artifactsDirtyRef.current = true;
        } finally {
          persistInFlightRef.current = false;
        }
      };
      persistArtifactsRef.current = persistArtifacts;

      const artifactSnapshot = await loadMapArtifactsSnapshot(mapNameRef.current);
      artifactSnapshot.corpses.forEach((corpse) => spawnCorpse(corpse.tile, corpse));
      artifactSnapshot.loot.forEach((loot) => {
        const entry: NonNullable<MonsterDefinition["lootTable"]>[number] = {
          id: loot.itemId,
          name: loot.name,
          icon: loot.icon,
          chance: 1,
          min: loot.quantity,
          max: loot.quantity,
          stackable: loot.stackable,
          maxStack: loot.maxStack
        };
        addLootDrop(entry, loot.tile, loot.quantity, loot);
      });
      artifactsDirtyRef.current = false;

      const spawnLootDrops = (definition: MonsterDefinition, tile: { x: number; y: number }) => {
        if (!definition.lootTable?.length) return;
        definition.lootTable.forEach((entry) => {
          if (Math.random() > entry.chance) return;
          const quantity = randomBetween(entry.min, entry.max);
          if (quantity > 0) {
            const offset = LOOT_OFFSETS[Math.floor(Math.random() * LOOT_OFFSETS.length)] ?? { x: 0, y: 0 };
            const targetTile = { x: tile.x + offset.x, y: tile.y + offset.y };
            addLootDrop(entry, targetTile, quantity);
          }
        });
      };

      const updateLootDrops = (deltaSeconds: number) => {
        const lootDrops = lootDropsRef.current;
        for (let index = lootDrops.length - 1; index >= 0; index -= 1) {
          const drop = lootDrops[index];
          drop.timer -= deltaSeconds;
          drop.container.alpha = 0.7 + 0.3 * Math.abs(Math.sin(drop.timer * 2));
          if (drop.timer <= 0) {
            lootLayer.removeChild(drop.container);
            drop.container.destroy();
            lootDrops.splice(index, 1);
            artifactsDirtyRef.current = true;
          }
        }
      };

      const showPickupNotice = (text: string, iconPath: string) => {
        if (!player) return;
        const notice = new Container();
        const iconSprite = Sprite.from(iconPath);
        iconSprite.anchor.set(0.5);
        iconSprite.width = 24;
        iconSprite.height = 24;
        const label = new Text({
          text,
          style: { fill: 0xffffff, fontSize: 14, fontWeight: "600", stroke: { color: 0x000000, width: 4 } }
        });
        label.anchor.set(0, 0.5);
        label.position.set(18, 0);
        notice.addChild(iconSprite);
        notice.addChild(label);
        notice.position.set(player.position.x, player.position.y - TILE_SIZE);
        notice.zIndex = 500;
        worldLayer.addChild(notice);
        pickupNoticesRef.current.push({ container: notice, timer: 0, duration: 1.5 });
      };

      const updatePickupNotices = (deltaSeconds: number) => {
        const pickupNotices = pickupNoticesRef.current;
        for (let index = pickupNotices.length - 1; index >= 0; index -= 1) {
          const notice = pickupNotices[index];
          notice.timer += deltaSeconds;
          notice.container.position.y -= 40 * deltaSeconds;
          notice.container.alpha = 1 - notice.timer / notice.duration;
          if (notice.timer >= notice.duration) {
            worldLayer.removeChild(notice.container);
            notice.container.destroy();
            pickupNotices.splice(index, 1);
          }
        }
      };

      const addLootToInventory = async (
        entry: NonNullable<MonsterDefinition["lootTable"]>[number],
        quantity: number
      ): Promise<void> => {
        if (!sessionState.ownerId) return;
        try {
          await fetch("/api/inventory/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ownerId: sessionState.ownerId,
              item: {
                id: entry.id,
                name: entry.name,
                quantity,
                stackable: entry.stackable !== false,
                maxStack: entry.maxStack
              }
            })
          });
        } catch (error) {
          console.warn("Failed to add loot item", error);
        }
      };

      const tryCollectLoot = () => {
        if (!player) return;
        const tile = player.tilePosition;
        const lootDrops = lootDropsRef.current;
        for (let index = lootDrops.length - 1; index >= 0; index -= 1) {
          const drop = lootDrops[index];
          if (drop.tile.x !== tile.x || drop.tile.y !== tile.y) continue;
          lootLayer.removeChild(drop.container);
          drop.container.destroy();
          lootDrops.splice(index, 1);
          void addLootToInventory(drop.source, drop.quantity);
          showPickupNotice(`+${drop.quantity} ${drop.name}`, drop.icon);
          artifactsDirtyRef.current = true;
        }
      };

      const awardXp = async (amount: number) => {
        const previousLevel = xpStats.level;
        xpStats.xp += amount;
        const resolved = resolveLevel(xpStats.xp);
        xpStats.level = resolved.level;
        hudState.syncVitals();
        if (player) {
          floatingTextManager?.spawn({
            text: `+${amount} XP`,
            x: player.position.x,
            y: player.position.y - TILE_SIZE * 1.5,
            color: 0xfacb5a,
            duration: 2,
            rise: 36,
            fontSize: 16
          });
        }
        if (xpStats.level > previousLevel && player) {
          player.setLevelInfo(xpStats.level, PLAYER_CLASS);
          floatingTextManager?.spawn({
            text: `LVL ${xpStats.level} | ${PLAYER_CLASS}`,
            x: player.position.x,
            y: player.position.y - TILE_SIZE * 1.8,
            color: 0x9ef7c2,
            duration: 2.4,
            rise: 40,
            fontSize: 18
          });
          effectHandlers.playLevelUpEffect(player.position.x, player.position.y);
          hudState.showLevelUpBanner(previousLevel, xpStats.level);
          playLevelUpSound();
        }
        playXpSound();
        if (!sessionState.ownerId || !sessionState.characterId) return;
        try {
          await fetch("/api/character/xp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ownerId: sessionState.ownerId,
              characterId: sessionState.characterId,
              amount
            })
          });
        } catch (error: unknown) {
          console.warn("Failed to grant XP", error);
        }
      };

      const awardGold = async (amount: number) => {
        if (amount <= 0) return;
        if (player) {
          floatingTextManager?.spawn({
            text: `+${amount} ouro`,
            x: player.position.x,
            y: player.position.y - TILE_SIZE,
            color: 0xfacc15,
            duration: 1.6,
            rise: 36,
            fontSize: 15
          });
          showPickupNotice(`+${amount} ouro`, GOLD_NOTICE_ICON);
        }
        if (!sessionState.ownerId || !sessionState.characterId) return;
        try {
          await fetch("/api/character/gold", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ownerId: sessionState.ownerId,
              characterId: sessionState.characterId,
              amount
            })
          });
        } catch (error: unknown) {
          console.warn("Failed to grant gold", error);
        }
      };

      const spawnMonster = (definition: MonsterDefinition) => {
        const sheetTexture = Texture.from(definition.sprite);
        const frames = createFramesFromSheet(
          sheetTexture,
          definition.frames,
          definition.frameWidth,
          definition.frameHeight
        );
        const monsterLevel = randomBetween(definition.levelRange.min, definition.levelRange.max);
        const actor = new MonsterActor({
          definition,
          frames,
          tileSize: TILE_SIZE,
          level: monsterLevel,
          onDeath: () => {
            const deathPosition = actor.worldPosition;
            const deathTile = tilemap.worldToTile(deathPosition.x, deathPosition.y);
            playDeathSound();
            const rewardRange = definition.xpReward ?? { min: 1, max: 2 };
            void awardXp(randomBetween(rewardRange.min, rewardRange.max));
            const goldRange = definition.goldRange ?? { min: 1, max: 4 };
            void awardGold(randomBetween(goldRange.min, goldRange.max));
            spawnCorpse(deathTile);
            spawnLootDrops(definition, deathTile);
            const state = monsterState.get(definition.id);
            if (state) {
              state.actor = null;
              if (state.slot !== null) {
                state.slot = null;
              }
              state.respawn = 0;
            }
          }
        });
        worldLayer.addChild(actor.view);
        actor.view.zIndex = 190;
        const state = monsterState.get(definition.id);
        if (state) {
          state.actor = actor;
          state.respawn = 0;
        }
      };

      monsterDefinitions.forEach((definition) => {
        spawnMonster(definition);
      });

      const npcActors = npcDefinitions.map((definition) => {
        const frames = resolveNpcFrames(definition);
        const actor = new NpcActor(tilemap, definition, frames, balloonLayer);
        worldLayer.addChild(actor.sprite);
        actor.sprite.zIndex = 180;
        return actor;
      });

      const rendererWidth = app.renderer?.width ?? target.clientWidth ?? 0;
      const rendererHeight = app.renderer?.height ?? target.clientHeight ?? 0;
      const camera = new Camera({
        container: worldLayer,
        viewportWidth: rendererWidth,
        viewportHeight: rendererHeight,
        worldWidth: tilemap.worldWidth,
        worldHeight: tilemap.worldHeight
      });

      if (!player) {
        throw new Error("Player not initialized");
      }
      const activePlayer = player;

      hudState.hud.updatePosition(activePlayer.tilePosition);

      input = new InputController(
        overlayLayer,
        (direction) => {
          activePlayer.tryMove(direction);
        },
        (direction, held) => {
          activePlayer.setDirectionHeld(direction, held);
        }
      );
      input.updateLayout(rendererWidth, rendererHeight);

      app.stage.eventMode = "static";
      pointerHandler = (event: FederatedPointerEvent) => {
        const worldPoint = camera.worldFromScreen(event.global.x, event.global.y);
        const tilePoint = tilemap.worldToTile(worldPoint.x, worldPoint.y);
        activePlayer.moveTo(tilePoint);
      };
      app.stage.on("pointerdown", pointerHandler);

      resizeObserver = new ResizeObserver(() => {
        const width = app.renderer?.width ?? target.clientWidth ?? 0;
        const height = app.renderer?.height ?? target.clientHeight ?? 0;
        camera.resize(width, height);
        hudState.hud.resize();
        input?.updateLayout(width, height);
        hudState.updateBannerLayout(width);
      });
      resizeObserver.observe(target);

      const showMonsterDamage = (monster: MonsterActor, value: number) => {
        const position = monster.worldPosition;
        floatingTextManager?.spawn({
          text: `-${value} HP`,
          x: position.x,
          y: position.y - TILE_SIZE * 0.8,
          color: 0xfff5c3,
          duration: 1.2,
          rise: 28,
          fontSize: 13
        });
      };

      app.ticker.add((ticker) => {
        const activePlayer = player;
        if (!activePlayer) return;
        const delta = ticker.deltaMS / 1000;
        activePlayer.update(delta);
        npcActors.forEach((npc) => npc.update(delta));
        const playerTile = activePlayer.tilePosition;
        const assignedSlots = new Map<number, string>();
        monsterState.forEach((state, id) => {
          if (state.slot !== null) {
            assignedSlots.set(state.slot, id);
          }
        });

        monsterDefinitions.forEach((definition) => {
          const state = monsterState.get(definition.id);
          if (!state) return;
          if (!state.actor) {
            state.respawn += delta;
            const respawnDelay = definition.respawnDelay ?? 5;
            if (state.respawn >= respawnDelay) {
              spawnMonster(definition);
              state.respawn = 0;
            }
            return;
          }
          const actor = state.actor;
          const monsterTile = actor.getTilePosition();
          const distance = Math.max(Math.abs(monsterTile.x - playerTile.x), Math.abs(monsterTile.y - playerTile.y));
          const engaged = distance <= 3;
          if (!engaged) {
            if (state.slot !== null) {
              assignedSlots.delete(state.slot);
              state.slot = null;
            }
            actor.setBattleTarget(null);
            return;
          }
          let slotIndex = state.slot;
          if (slotIndex !== null) {
            const occupant = assignedSlots.get(slotIndex);
            const offset = MONSTER_SLOT_OFFSETS[slotIndex];
            const tile = { x: playerTile.x + offset.x, y: playerTile.y + offset.y };
            if (occupant !== definition.id || !tilemap.isWalkable(tile.x, tile.y)) {
              assignedSlots.delete(slotIndex);
              slotIndex = null;
              state.slot = null;
            }
          }
          if (slotIndex === null) {
            for (let index = 0; index < MONSTER_SLOT_OFFSETS.length; index += 1) {
              if (assignedSlots.has(index)) continue;
              const offset = MONSTER_SLOT_OFFSETS[index];
              const tile = { x: playerTile.x + offset.x, y: playerTile.y + offset.y };
              if (!tilemap.isWalkable(tile.x, tile.y)) continue;
              slotIndex = index;
              state.slot = index;
              assignedSlots.set(index, definition.id);
              break;
            }
          }
          if (slotIndex !== null) {
            const offset = MONSTER_SLOT_OFFSETS[slotIndex];
            actor.setBattleTarget({ x: playerTile.x + offset.x, y: playerTile.y + offset.y });
          } else {
            actor.setBattleTarget(null);
          }
        });

        monsterState.forEach((state) => {
          const actor = state.actor;
          if (!actor) return;
          actor.update(delta, activePlayer.position);
          actor.updateThreatDisplay(xpStats.level);
          const retaliation = actor.tryReceivePlayerAttack(delta);
          if (retaliation) {
            showMonsterDamage(actor, retaliation.damage);
            playAttackSound();
          }
          const attackDamage = actor.tryAttackPlayer(delta);
          if (attackDamage) {
            applyPlayerDamage(attackDamage);
            playDamageSound();
          }
          if (actor.isDead()) {
            state.actor = null;
            state.respawn = 0;
          }
        });
        tryCollectLoot();
        updateCorpses(delta);
        updateLootDrops(delta);
        updatePickupNotices(delta);
        entityListTimerRef.current += delta;
        if (entityListTimerRef.current >= 0.6) {
          entityListTimerRef.current = 0;
          if (onEntityListChange) {
            const monstersSnapshot: MonsterListItem[] = [];
            monsterState.forEach((state) => {
              if (state.actor) {
                monstersSnapshot.push(state.actor.getSnapshot(xpStats.level));
              }
            });
            onEntityListChange({ monsters: monstersSnapshot, npcs: npcSnapshotBase.map((entry) => ({ ...entry })) });
          }
        }
        artifactPersistTimerRef.current += delta;
        if (artifactPersistTimerRef.current >= 2) {
          artifactPersistTimerRef.current = 0;
          void persistArtifacts();
        }
        camera.update(activePlayer.position);
        hudState.hud.updatePosition(activePlayer.tilePosition);
        floatingTextManager?.update(delta);
        hudState.updateBannerTimer(delta);
      });

      if (disposed) {
        safeDestroyPixiInstance(app);
        appRef.current = null;
        return;
      }
      setReady(true);
      onReadyChange?.(true);
      setConnectionStatus("online");
      function renderDecorLayers(
        details: Container,
        buildingsBottom: Container,
        buildingsTop: Container,
        detailsMatrix: Matrix<string>,
        buildingsMatrix: Matrix<string>,
        overlay: Matrix<OverlaySlice>,
        cols: number,
        rows: number
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
      setConnectionStatus((current) => (current === "offline" || current === "unreachable" ? current : "error"));
    });

    return () => {
      disposed = true;
      if (artifactsDirtyRef.current) {
        void persistArtifactsRef.current?.();
      }
      setReady(false);
      onReadyChange?.(false);
      resizeObserver?.disconnect();
      input?.dispose();
      floatingTextManager?.clear();
      const cleanupLayer = worldLayerRef.current;
      corpsesRef.current.forEach((corpse) => {
        if (cleanupLayer?.children.includes(corpse.sprite)) {
          cleanupLayer.removeChild(corpse.sprite);
        } else {
          corpse.sprite.parent?.removeChild?.(corpse.sprite);
        }
        corpse.sprite.destroy();
      });
      lootDropsRef.current.forEach((drop) => {
        if (cleanupLayer?.children.includes(drop.container)) {
          cleanupLayer.removeChild(drop.container);
        } else {
          drop.container.parent?.removeChild?.(drop.container);
        }
        drop.container.destroy();
      });
      pickupNoticesRef.current.forEach((notice) => {
        if (cleanupLayer?.children.includes(notice.container)) {
          cleanupLayer.removeChild(notice.container);
        } else {
          notice.container.parent?.removeChild?.(notice.container);
        }
        notice.container.destroy();
      });
      floatingTextManager = null;
      const instance = appRef.current;
      if (instance && pointerHandler) {
        instance.stage.off("pointerdown", pointerHandler);
      }
      pointerHandler = null;
      safeDestroyPixiInstance(instance);
      appRef.current = null;
      player = null;
      worldLayerRef.current = null;
      corpseLayerRef.current = null;
      lootLayerRef.current = null;
      persistArtifactsRef.current = null;
      corpsesRef.current = [];
      lootDropsRef.current = [];
      pickupNoticesRef.current = [];
    };
  }, [onReadyChange, onEntityListChange]);

  useEffect(() => {
    const handleOffline = () => {
      setConnectionStatus("offline");
      setReady(false);
      const instance = appRef.current;
      if (instance) {
        safeDestroyPixiInstance(instance);
        appRef.current = null;
      }
    };
    const handleOnline = () => {
      setConnectionStatus("reconnecting");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const connectionMessage =
    connectionStatus === "offline"
      ? { title: "Sem conexão", detail: "Aguardando internet voltar…" }
      : connectionStatus === "reconnecting"
        ? { title: "Reconectando…", detail: "Atualizando o mapa" }
        : connectionStatus === "unreachable"
          ? { title: "Servidor indisponível", detail: "Não foi possível buscar a sessão" }
          : connectionStatus === "error"
            ? { title: "Erro ao carregar", detail: "Verifique sua conexão ou tente recarregar" }
            : connectionStatus === "connecting"
              ? { title: "Conectando…", detail: "Preparando o motor PIXI" }
              : null;

  return (
    <div className="w-full">
      <div className="mx-auto w-full h-screen md:h-[75vh]">
        <div className="relative h-full w-full" data-ready={ready}>
          <div ref={containerRef} className="h-full w-full overflow-hidden rounded-[32px] bg-[#05070c] shadow-2xl" />
          {bottomOverlay ? (
            <div className="pointer-events-none absolute inset-0">
              <div className="pointer-events-auto absolute bottom-5 left-1/2 -translate-x-1/2">
                {bottomOverlay}
              </div>
            </div>
          ) : null}
          {connectionMessage && (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center rounded-[32px] bg-black/70">
              <div className="pointer-events-auto flex flex-col items-center gap-2 rounded-2xl border border-white/20 bg-[#1b0f06]/90 px-10 py-6 text-amber-50 shadow-2xl">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-200 border-t-transparent" />
                <p className="text-xl font-semibold">{connectionMessage.title}</p>
                <p className="text-sm text-amber-100/80">{connectionMessage.detail}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function safeDestroyPixiInstance(instance: Application | null) {
  const appInstance = instance as (Application & { destroyed?: boolean; _cancelResize?: () => void }) | null;
  if (!appInstance) return;
  if (appInstance.destroyed) return;
  if (typeof appInstance.destroy !== "function") return;
  if (typeof appInstance._cancelResize === "undefined") return;
  try {
    appInstance.destroy(true);
  } catch (error) {
    console.warn("PIXI destroy error:", error);
  }
}

async function loadSessionState(setConnectionStatus: (status: ConnectionStatus) => void): Promise<SessionState | null> {
  let sessionState: SessionState = {
    map: "cidadecentral",
    position: { ...DEFAULT_POSITION },
    characterName: "",
    characterSprite: "warriorblue",
    spriteColor: 1 as SpriteColorValue,
    stats: { hp: 100, energy: 100, xp: 0, level: 1 }
  };
  try {
    const sessionResponse = await fetch("/api/session/state");
    if (sessionResponse.ok) {
      sessionState = (await sessionResponse.json()) as SessionState;
    } else {
      console.warn("Session state request failed", sessionResponse.status);
    }
    return sessionState;
  } catch (error: unknown) {
    console.warn("Failed to load session state", error);
    setConnectionStatus("unreachable");
    return null;
  }
}

function createPositionPersistence(
  mapNameRef: React.MutableRefObject<string>,
  positionTrackerRef: React.MutableRefObject<{ steps: number; pending: boolean }>
) {
  const persistPositionRequest = async (mapName: string, tileX: number, tileY: number) => {
    try {
      await fetch("/api/session/position", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ map: mapName, x: tileX, y: tileY })
      });
    } catch (error: unknown) {
      console.warn("Failed to persist position", error);
    }
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

  return { persistPositionRequest, handleStepPersistence };
}

type MapInitializationParams = {
  app: Application;
  target: HTMLDivElement;
  sessionState: SessionState;
  mapNameRef: React.MutableRefObject<string>;
  teleportingRef: React.MutableRefObject<boolean>;
  positionTrackerRef: React.MutableRefObject<{ steps: number; pending: boolean }>;
  persistPositionRequest: (mapName: string, tileX: number, tileY: number) => Promise<void>;
};

type MapInitializationResult = {
  sessionState: SessionState;
  mapData: MapPayload;
  tilemap: Tilemap;
  tilesLayer1: Matrix<string>;
  tilesLayer2: Matrix<string>;
  overlayMatrix: Matrix<OverlaySlice>;
  worldLayer: Container;
  overlayLayer: Container;
  effectLayer: Container;
  balloonLayer: Container;
  detailsLayer: Container;
  buildingLayer: Container;
  corpseLayer: Container;
  lootLayer: Container;
  floatingTextLayer: Container;
  floatingTextManager: FloatingTextManager;
  npcDefinitions: NpcDefinition[];
  monsterDefinitions: MonsterDefinition[];
  npcSnapshotBase: NpcListItem[];
  teleportFrames: Texture[] | null;
  levelUpFrames: Texture[] | null;
  playerSpriteConfig: ReturnType<typeof getCharacterSpriteConfig>;
  playerTint: number;
  hpMax: number;
  manaMax: number;
  xpStats: { hp: number; energy: number; xp: number; level: number };
};

async function initializeMapResources({
  app,
  target,
  sessionState,
  mapNameRef,
  teleportingRef,
  positionTrackerRef,
  persistPositionRequest
}: MapInitializationParams): Promise<MapInitializationResult> {
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
    } catch (error: unknown) {
      console.warn(`Failed to load map ${mapName}`, error);
      return null;
    }
  };

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
  tileTextures.add(CORPSE_TEXTURE);
  tileTextures.add(GOLD_NOTICE_ICON);
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
  const npcSnapshotBase: NpcListItem[] = npcDefinitions.map((definition, index) => ({
    id: definition.id ?? `${definition.name ?? "NPC"}-${index}`,
    name: definition.name ?? `NPC ${index + 1}`,
    rarity: definition.role ?? "NPC",
    danger: "Neutro",
    hpText: "—"
  }));
  const monsterDefinitions = getMonstersForMap(mapNameRef.current);
  const hpMax = Math.max(100, sessionState.stats?.hp ?? 100);
  const manaMax = Math.max(100, sessionState.stats?.energy ?? 100);
  const xpStats = {
    hp: clamp(sessionState.stats?.hp ?? 100, 0, hpMax),
    energy: clamp(sessionState.stats?.energy ?? 100, 0, manaMax),
    xp: sessionState.stats?.xp ?? 0,
    level: sessionState.stats?.level ?? 1
  };
  npcDefinitions.forEach((definition) => {
    if (definition.sprite) tileTextures.add(definition.sprite);
    definition.framePaths?.forEach((path) => tileTextures.add(path));
  });
  monsterDefinitions.forEach((definition) => {
    if (definition.sprite) tileTextures.add(definition.sprite);
    definition.lootTable?.forEach((entry) => tileTextures.add(entry.icon));
  });
  const playerSpriteKey = sessionState.characterSprite ?? "warriorblue";
  const playerSpriteConfig = getCharacterSpriteConfig(playerSpriteKey);
  tileTextures.add(playerSpriteConfig.run.sheet);
  const textureList = Array.from(tileTextures);
  await Assets.load([...textureList, teleportEffect.sheet, levelUpEffect.sheet]);
  const teleportTexture = Assets.get<Texture | undefined>(teleportEffect.sheet);
  const teleportFrames = teleportTexture
    ? createFramesFromSheet(
        teleportTexture,
        teleportEffect.frames,
        teleportEffect.frameWidth,
        teleportEffect.frameHeight,
        teleportEffect.frameSpacing
      )
    : null;
  const levelUpTexture = Assets.get<Texture | undefined>(levelUpEffect.sheet);
  const levelUpFrames = levelUpTexture
    ? createFramesFromSheet(
        levelUpTexture,
        levelUpEffect.frames,
        levelUpEffect.frameWidth,
        levelUpEffect.frameHeight,
        levelUpEffect.frameSpacing
      )
    : null;

  await app.init({ resizeTo: target, backgroundAlpha: 0, antialias: true });
  target.appendChild(app.canvas);

  const worldLayer = new Container();
  worldLayer.sortableChildren = true;
  const balloonLayer = new Container();
  const overlayLayer = new Container();
  const effectLayer = new Container();
  effectLayer.zIndex = 1000;
  app.stage.addChild(worldLayer);
  app.stage.addChild(balloonLayer);
  app.stage.addChild(overlayLayer);
  worldLayer.addChild(effectLayer);

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

  const corpseLayer = new Container();
  corpseLayer.sortableChildren = true;
  corpseLayer.zIndex = 50;
  worldLayer.addChild(corpseLayer);

  const lootLayer = new Container();
  lootLayer.sortableChildren = true;
  lootLayer.zIndex = 120;
  worldLayer.addChild(lootLayer);

  const buildingLayer = new Container();
  worldLayer.addChild(buildingLayer);

  const floatingTextLayer = new Container();
  floatingTextLayer.zIndex = 800;
  worldLayer.addChild(floatingTextLayer);
  const floatingTextManager = new FloatingTextManager(floatingTextLayer);

  return {
    sessionState,
    mapData,
    tilemap,
    tilesLayer1,
    tilesLayer2,
    overlayMatrix,
    worldLayer,
    overlayLayer,
    effectLayer,
    balloonLayer,
    detailsLayer,
    buildingLayer,
    corpseLayer,
    lootLayer,
    floatingTextLayer,
    floatingTextManager,
    npcDefinitions,
    monsterDefinitions,
    npcSnapshotBase,
    teleportFrames,
    levelUpFrames,
    playerSpriteConfig,
    playerTint: getSpriteColorTint(sessionState.spriteColor),
    hpMax,
    manaMax,
    xpStats
  };
}

type HudInitializationParams = {
  overlayLayer: Container;
  mapName: string;
  xpStats: { hp: number; energy: number; xp: number; level: number };
  hpMax: number;
  manaMax: number;
  app: Application;
  characterName?: string;
};

type HudInitializationResult = {
  hud: Hud;
  syncVitals: () => void;
  updateBannerLayout: (width: number) => void;
  showLevelUpBanner: (previous: number, current: number) => void;
  updateBannerTimer: (delta: number) => void;
};

function initializeHudComponents({
  overlayLayer,
  mapName,
  xpStats,
  hpMax,
  manaMax,
  app,
  characterName
}: HudInitializationParams): HudInitializationResult {
  const hud = new Hud(mapName);
  overlayLayer.addChild(hud.view);
  hud.resize();

  const levelUpBanner = new Container();
  const bannerBg = new Graphics().roundRect(-260, -26, 520, 52, 18).fill({ color: 0x050708, alpha: 0.9 }).stroke({ color: 0xfcd34d, alpha: 0.8, width: 2 });
  levelUpBanner.addChild(bannerBg);
  const levelUpText = new Text({
    text: "",
    style: { fill: 0xfff4cf, fontSize: 20, fontWeight: "700", stroke: { color: 0x000000, width: 5 } }
  });
  levelUpText.anchor.set(0.5);
  levelUpBanner.addChild(levelUpText);
  levelUpBanner.visible = false;
  overlayLayer.addChild(levelUpBanner);

  let levelUpBannerTimer = 0;
  const updateBannerLayout = (width: number) => {
    levelUpBanner.position.set(width / 2, 32);
  };
  updateBannerLayout(app.renderer.width);

  const resolveXpBar = () => {
    const base = xpForLevel(xpStats.level);
    const needed = Math.max(1, xpNeededForNextLevel(xpStats.level));
    const value = clamp(xpStats.xp - base, 0, needed);
    return { value, needed };
  };

  const syncVitals = () => {
    const xpBar = resolveXpBar();
    hud.updateVitals({
      hp: { label: "Vida", color: 0xe74c3c, value: xpStats.hp, max: hpMax },
      mana: { label: "Mana", color: 0x3fa7d6, value: xpStats.energy, max: manaMax },
      xp: { label: "XP", color: 0xfacb5a, value: xpBar.value, max: xpBar.needed }
    });
  };

  const showLevelUpBanner = (previous: number, current: number) => {
    const charName = characterName?.trim().length ? characterName.trim() : "Personagem";
    levelUpText.text = `[${charName}] passou de nível: ${previous} → ${current}`;
    levelUpBanner.visible = true;
    levelUpBanner.alpha = 1;
    levelUpBannerTimer = 2;
  };

  const updateBannerTimer = (delta: number) => {
    if (levelUpBannerTimer <= 0) return;
    levelUpBannerTimer = Math.max(0, levelUpBannerTimer - delta);
    levelUpBanner.alpha = 0.7 + 0.3 * Math.abs(Math.sin(levelUpBannerTimer * 6));
    if (levelUpBannerTimer <= 0) {
      levelUpBanner.visible = false;
    }
  };

  return { hud, syncVitals, updateBannerLayout, showLevelUpBanner, updateBannerTimer };
}

type EffectHandlerParams = {
  effectLayer: Container;
  teleportFrames: Texture[] | null;
  levelUpFrames: Texture[] | null;
};

type EffectHandlers = {
  playTeleportEffect: (worldX: number, worldY: number) => () => void;
  playLevelUpEffect: (worldX: number, worldY: number) => () => void;
};

function initializeEffectHandlers({ effectLayer, teleportFrames, levelUpFrames }: EffectHandlerParams): EffectHandlers {
  const playTeleportEffect = (worldX: number, worldY: number) => {
    if (!teleportFrames || teleportFrames.length === 0) {
      return () => undefined;
    }
    const sprite = new AnimatedSprite(teleportFrames);
    sprite.anchor.set(0.5);
    sprite.position.set(worldX, worldY);
    sprite.animationSpeed = teleportEffect.animationSpeed ?? 0.3;
    sprite.loop = true;
    sprite.play();
    effectLayer.addChild(sprite);
    return () => {
      sprite.stop();
      effectLayer.removeChild(sprite);
      sprite.destroy();
    };
  };

  const playLevelUpEffect = (worldX: number, worldY: number) => {
    if (!levelUpFrames || levelUpFrames.length === 0) {
      return () => undefined;
    }
    const sprite = new AnimatedSprite(levelUpFrames);
    sprite.anchor.set(0.5, 1);
    sprite.position.set(worldX, worldY - TILE_SIZE * 0.4);
    sprite.animationSpeed = levelUpEffect.animationSpeed ?? 0.25;
    sprite.loop = false;
    const cleanup = () => {
      sprite.stop();
      effectLayer.removeChild(sprite);
      sprite.destroy();
    };
    sprite.onComplete = cleanup;
    sprite.play();
    effectLayer.addChild(sprite);
    return cleanup;
  };

  return { playTeleportEffect, playLevelUpEffect };
}

type TeleportHandlerParams = {
  mapNameRef: React.MutableRefObject<string>;
  teleportingRef: React.MutableRefObject<boolean>;
  tilemap: Tilemap;
  persistPositionRequest: (mapName: string, tileX: number, tileY: number) => Promise<void>;
  playTeleportEffect: (x: number, y: number) => () => void;
};

function createTeleportHandler({
  mapNameRef,
  teleportingRef,
  tilemap,
  persistPositionRequest,
  playTeleportEffect
}: TeleportHandlerParams) {
  return (tileX: number, tileY: number, player: Player | null): boolean => {
    if (teleportingRef.current) return false;
    const entries = TELEPORTERS[mapNameRef.current] ?? [];
    const teleporter = entries.find((entry) => entry.tile.x === tileX && entry.tile.y === tileY);
    if (!teleporter) return false;
    teleportingRef.current = true;
    const completeTeleport = () => {
      void persistPositionRequest(teleporter.targetMap, teleporter.targetTile.x, teleporter.targetTile.y).finally(() => {
        if (typeof window !== "undefined") {
          window.location.assign("/play");
        }
      });
    };
    const worldPos = player?.position ?? tilemap.tileToWorld(tileX, tileY);
    const stopEffect = playTeleportEffect(worldPos.x, worldPos.y);
    if (player) {
      player.beginTeleport("Teletransportando...", 2, () => {
        stopEffect();
        completeTeleport();
      });
    } else {
      stopEffect();
      completeTeleport();
    }
    return true;
  };
}

type PlayerInitializationParams = {
  tilemap: Tilemap;
  playerSpriteConfig: ReturnType<typeof getCharacterSpriteConfig>;
  playerTint: number;
  characterName?: string;
  level: number;
  onMove: (tileX: number, tileY: number) => void;
};

function initializePlayerActor({
  tilemap,
  playerSpriteConfig,
  playerTint,
  characterName,
  level,
  onMove
}: PlayerInitializationParams): Player {
  const playerRunTexture = Assets.get<Texture | undefined>(playerSpriteConfig.run.sheet);
  if (!playerRunTexture) {
    throw new Error(`Player sprite not loaded: ${playerSpriteConfig.run.sheet}`);
  }
  const playerFrames = createFramesFromSheet(
    playerRunTexture,
    playerSpriteConfig.run.frames,
    playerSpriteConfig.run.frameWidth,
    playerSpriteConfig.run.frameHeight
  );
  const player = new Player(tilemap, playerFrames, onMove, characterName, playerTint);
  player.setLevelInfo(level, PLAYER_CLASS);
  return player;
}
