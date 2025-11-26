import { AnimatedSprite, type Container, Text, Texture } from "pixi.js";

import type { Tilemap } from "@/core/runtime/Tilemap";
import type { NpcDefinition, WanderArea } from "@/npc/data/types";

import { Balloon } from "@/core/runtime/Balloon";
import { normalizeHueCode, resolvePaletteColor } from "@/core/utils/colorPalette";

export class NpcActor {
  readonly sprite: AnimatedSprite;
  private readonly tilemap: Tilemap;
  private readonly definition: NpcDefinition;
  private readonly balloon: Balloon;
  private readonly balloonLayer: Container;
  private readonly wanderArea: WanderArea | null;
  private readonly quotes: string[];
  private readonly talkInterval: { min: number; max: number };
  private readonly nameLabel: Text;
  private readonly baseMoveDuration: number;
  private tileX: number;
  private tileY: number;
  private moveElapsed = 0;
  private targetTile: { x: number; y: number } | null = null;
  private moveDuration: number;
  private readonly startPos = { x: 0, y: 0 };
  private readonly endPos = { x: 0, y: 0 };
  private moving = false;
  private speechTimer = 0;
  private nextSpeech = 4;
  private readonly speechTextColor: number;
  private readonly speechBalloonColor: number;

  constructor(tilemap: Tilemap, definition: NpcDefinition, frames: Texture[], balloonLayer: Container) {
    this.tilemap = tilemap;
    this.definition = definition;
    this.tileX = definition.initialTile.x;
    this.tileY = definition.initialTile.y;
    this.sprite = new AnimatedSprite(frames.length ? frames : [Texture.WHITE]);
    const anchor = definition.anchor ?? { x: 0.5, y: 1 };
    this.sprite.anchor.set(anchor.x, anchor.y);
    const size = this.resolveSpriteSize(frames, definition, tilemap.tileSize);
    this.sprite.width = size.width;
    this.sprite.height = size.height;
    this.sprite.animationSpeed = 0.12;
    this.sprite.loop = true;
    this.sprite.tint = this.resolveTint(definition);
    this.sprite.play();
    this.sprite.eventMode = "none";
    this.nameLabel = new Text({
      text: definition.name,
      style: {
        fill: resolvePaletteColor(definition.nameColor, 0xfacc15),
        fontSize: 16,
        fontWeight: "600",
        stroke: {
          color: 0x000000,
          width: 4
        }
      }
    });
    this.nameLabel.anchor.set(0.5, 1);
    this.nameLabel.resolution = 2;
    this.nameLabel.roundPixels = true;
    this.nameLabel.position.set(0, 0);
    this.balloonLayer = balloonLayer;
    this.balloonLayer.addChild(this.nameLabel);
    this.speechTextColor = resolvePaletteColor(definition.speechTextColor, 0xffffff);
    this.speechBalloonColor = resolvePaletteColor(definition.speechBalloonColor, 0x05070c);
    const basePosition = this.tileToWorld(this.tileX, this.tileY);
    this.sprite.position.set(basePosition.x, basePosition.y);
    this.balloon = new Balloon();
    this.balloonLayer.addChild(this.balloon.view);
    this.wanderArea = definition.wanderArea ?? null;
    this.quotes = definition.quotes && definition.quotes.length > 0 ? definition.quotes : ["Olá!", "Tudo certo?", "Vigília constante."];
    const interval = definition.talkInterval ?? { min: 3, max: 7 };
    this.talkInterval = interval;
    this.nextSpeech = interval.min + Math.random() * (interval.max - interval.min);
    this.baseMoveDuration = this.resolveMoveDuration(definition.speed);
    this.moveDuration = this.baseMoveDuration;
  }

  update(deltaSeconds: number): void {
    if (this.moving && this.targetTile) {
      this.moveElapsed += deltaSeconds;
      const t = Math.min(1, this.moveElapsed / this.moveDuration);
      const lerp = (a: number, b: number) => a + (b - a) * t;
      this.sprite.position.set(lerp(this.startPos.x, this.endPos.x), lerp(this.startPos.y, this.endPos.y));
      if (t >= 1) {
        this.tileX = this.targetTile.x;
        this.tileY = this.targetTile.y;
        this.targetTile = null;
        this.moving = false;
      }
    } else {
      this.chooseStep();
    }
    this.updateSpeech(deltaSeconds);
    this.updateLabelPosition();
  }

  private chooseStep(): void {
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ];
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }
    for (const dir of directions) {
      const nextX = this.tileX + dir.x;
      const nextY = this.tileY + dir.y;
      if (!this.isInsideArea(nextX, nextY)) continue;
      if (!this.tilemap.isWalkable(nextX, nextY)) continue;
      const targetWorld = this.tileToWorld(nextX, nextY);
      this.startPos.x = this.sprite.position.x;
      this.startPos.y = this.sprite.position.y;
      this.endPos.x = targetWorld.x;
      this.endPos.y = targetWorld.y;
      this.targetTile = { x: nextX, y: nextY };
      this.moveElapsed = 0;
      this.moving = true;
      this.moveDuration = this.baseMoveDuration * (0.85 + Math.random() * 0.3);
      if (dir.x !== 0) {
        this.sprite.scale.x = Math.sign(dir.x);
      }
      return;
    }
  }

  private updateSpeech(deltaSeconds: number): void {
    this.speechTimer += deltaSeconds;
    if (this.speechTimer >= this.nextSpeech) {
      const line = this.quotes[Math.floor(Math.random() * this.quotes.length)];
      const { x, y } = this.sprite.getGlobalPosition();
      this.balloon.show(line, {
        textColor: this.speechTextColor,
        fillColor: this.speechBalloonColor
      });
      this.balloon.view.position.set(x - this.balloon.view.width / 2, y - 40 - this.balloon.view.height);
      this.speechTimer = 0;
      const interval = this.talkInterval;
      this.nextSpeech = interval.min + Math.random() * (interval.max - interval.min);
    }
  }

  private isInsideArea(tileX: number, tileY: number): boolean {
    if (!this.wanderArea) {
      return this.tilemap.isInside(tileX, tileY);
    }
    const { minX, maxX, minY, maxY } = this.wanderArea;
    return tileX >= minX && tileX <= maxX && tileY >= minY && tileY <= maxY;
  }

  private tileToWorld(tileX: number, tileY: number): { x: number; y: number } {
    const tileSize = this.tilemap.tileSize;
    const anchor = this.definition.anchor ?? { x: 0.5, y: 1 };
    const offsetX = this.definition.tileOffset?.x ?? 0;
    const offsetY = this.definition.tileOffset?.y ?? 0;
    if (anchor.y === 1) {
      return {
        x: tileX * tileSize + tileSize / 2 + offsetX,
        y: (tileY + 1) * tileSize + offsetY
      };
    }
    const center = this.tilemap.tileToWorld(tileX, tileY);
    return { x: center.x + offsetX, y: center.y + offsetY };
  }

  private resolveSpriteSize(frames: Texture[], definition: NpcDefinition, fallback: number): { width: number; height: number } {
    if (definition.size) {
      return {
        width: definition.size.width ?? fallback,
        height: definition.size.height ?? fallback
      };
    }
    const first = frames[0];
    return {
      width: first?.frame?.width ?? first?.width ?? fallback,
      height: first?.frame?.height ?? first?.height ?? fallback
    };
  }

  private resolveTint(definition: NpcDefinition): number {
    if (typeof definition.tint === "number") return definition.tint;
    if (typeof definition.hue === "number") {
      const normalized = normalizeHueCode(definition.hue) / 255;
      return hslToHex(normalized, 0.55, 0.62);
    }
    return 0xffffff;
  }

  private updateLabelPosition(): void {
    const { x, y } = this.sprite.getGlobalPosition();
    const offset = -this.sprite.height * 0.65 + 16;
    this.nameLabel.position.set(x, y + offset);
  }

  private resolveMoveDuration(speedInput?: number): number {
    const clamped = clamp(typeof speedInput === "number" ? speedInput : 100, 0, 200);
    const normalized = clamped / 200;
    const maxDuration = 1.1;
    const minDuration = 0.22;
    return maxDuration - normalized * (maxDuration - minDuration);
  }
}

function hslToHex(h: number, s: number, l: number): number {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return (f(0) << 16) + (f(8) << 8) + f(4);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
