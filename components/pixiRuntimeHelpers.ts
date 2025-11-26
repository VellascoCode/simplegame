import type { MutableRefObject } from "react";

import { AnimatedSprite, Assets, Container, Texture } from "pixi.js";

import { Tilemap } from "@/core/runtime/Tilemap";
import { Player } from "@/core/runtime/Player";
import { getCharacterSpriteConfig } from "@/lib/characterSprites";

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

export type EffectHandlers = {
  playTeleportEffect: (worldX: number, worldY: number) => () => void;
  playLevelUpEffect: (worldX: number, worldY: number) => () => void;
};

type EffectHandlerParams = {
  effectLayer: Container;
  teleportFrames: Texture[] | null;
  levelUpFrames: Texture[] | null;
  tileSize: number;
  teleportAnimationSpeed: number;
  levelUpAnimationSpeed: number;
};

export function initializeEffectHandlers({
  effectLayer,
  teleportFrames,
  levelUpFrames,
  tileSize,
  teleportAnimationSpeed,
  levelUpAnimationSpeed
}: EffectHandlerParams): EffectHandlers {
  const playTeleportEffect = (worldX: number, worldY: number) => {
    if (!teleportFrames || teleportFrames.length === 0) {
      return () => undefined;
    }
    const sprite = new AnimatedSprite(teleportFrames);
    sprite.anchor.set(0.5);
    sprite.position.set(worldX, worldY);
    sprite.animationSpeed = teleportAnimationSpeed;
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
    sprite.position.set(worldX, worldY - tileSize * 0.4);
    sprite.animationSpeed = levelUpAnimationSpeed;
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
  mapNameRef: MutableRefObject<string>;
  teleportingRef: MutableRefObject<boolean>;
  tilemap: Tilemap;
  persistPositionRequest: (mapName: string, tileX: number, tileY: number) => Promise<void>;
  playTeleportEffect: (x: number, y: number) => () => void;
};

export function createTeleportHandler({
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

export type PlayerInitializationParams = {
  tilemap: Tilemap;
  playerSpriteKey: string;
  playerTint: number;
  characterName?: string;
  level: number;
  playerClass: string;
  onMove: (tileX: number, tileY: number) => void;
};

export function initializePlayerActor({
  tilemap,
  playerSpriteKey,
  playerTint,
  characterName,
  level,
  playerClass,
  onMove
}: PlayerInitializationParams): Player {
  const playerSpriteConfig = getCharacterSpriteConfig(playerSpriteKey);
  const playerRunTexture = Assets.get<Texture | undefined>(playerSpriteConfig.run.sheet);
  if (!playerRunTexture) {
    throw new Error(`Player sprite not loaded: ${playerSpriteConfig.run.sheet}`);
  }
  const frames: Texture[] = [];
  const frameWidth = playerSpriteConfig.run.frameWidth;
  const frameHeight = playerSpriteConfig.run.frameHeight;
  const safeCount = Math.max(1, playerSpriteConfig.run.frames);
  for (let index = 0; index < safeCount; index += 1) {
    const rect = new Texture({
      source: playerRunTexture.source,
      frame: playerRunTexture.frame.clone()
    });
    rect.frame.x = (frameWidth ?? rect.width ?? 128) * index;
    rect.frame.width = frameWidth ?? rect.width ?? 128;
    rect.frame.height = frameHeight ?? rect.height ?? 128;
    frames.push(rect);
  }
  const player = new Player(tilemap, frames, onMove, characterName, playerTint);
  player.setLevelInfo(level, playerClass);
  return player;
}

