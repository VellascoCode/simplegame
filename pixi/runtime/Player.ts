import { AnimatedSprite, Container, Text } from "pixi.js";
import type { Texture } from "pixi.js";
import type { Tilemap } from "@/pixi/runtime/Tilemap";
import { resolvePaletteColor } from "@/pixi/utils/colorPalette";

export type Direction = "up" | "down" | "left" | "right";

const DIR_VECTORS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};
const DIR_PRIORITY: Direction[] = ["up", "down", "left", "right"];

export class Player {
  readonly view: Container = new Container();
  private readonly tilemap: Tilemap;
  private readonly sprite: AnimatedSprite;
  private readonly baseScaleX: number;
  private readonly baseScaleY: number;
  private tileX: number;
  private tileY: number;
  private readonly moveDuration = 0.18;
  private moving = false;
  private moveElapsed = 0;
  private readonly startPos = { x: 0, y: 0 };
  private readonly endPos = { x: 0, y: 0 };
  private nextTile: { x: number; y: number } | null = null;
  private readonly queue: Array<{ x: number; y: number }> = [];
  private readonly onMove?: (tileX: number, tileY: number) => void;
  private readonly heldDirections = new Set<Direction>();
  private readonly nameLabel: Text;
  private readonly levelLabel: Text;
  private readonly statusLabel: Text;
  private locked = false;
  private teleportTimer = 0;
  private teleportBlinkPhase = 0;
  private teleportCallback?: () => void;

  constructor(tilemap: Tilemap, frames: Texture[], onMove?: (tileX: number, tileY: number) => void, playerName?: string, tint?: number) {
    this.tilemap = tilemap;
    this.onMove = onMove;
    const spawn = tilemap.getSpawnTile();
    this.tileX = spawn.x;
    this.tileY = spawn.y;
    this.sprite = new AnimatedSprite(frames.map((texture) => texture));
    this.sprite.anchor.set(0.5);
    const baseWidth = frames[0]?.frame?.width ?? frames[0]?.width ?? tilemap.tileSize;
    const baseHeight = frames[0]?.frame?.height ?? frames[0]?.height ?? tilemap.tileSize;
    const scale = tilemap.tileSize / Math.max(baseWidth, baseHeight || tilemap.tileSize);
    this.baseScaleX = scale;
    this.baseScaleY = scale;
    this.sprite.scale.set(this.baseScaleX, this.baseScaleY);
    this.sprite.animationSpeed = 0.15;
    this.sprite.loop = true;
    if (typeof tint === "number") {
      this.sprite.tint = tint;
    }
    this.sprite.play();
    this.view.addChild(this.sprite);
    const labelText = playerName && playerName.trim() ? playerName.trim().slice(0, 24) : "Viajante";
    this.nameLabel = new Text({
      text: labelText,
      style: {
        fill: resolvePaletteColor(11, 0xfacc15),
        fontSize: 18,
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
    this.nameLabel.position.set(0, -tilemap.tileSize * 1.05);
    this.view.addChild(this.nameLabel);
    this.levelLabel = new Text({
      text: "",
      style: {
        fill: 0xffffff,
        fontSize: 14,
        fontWeight: "600",
        stroke: { color: 0x000000, width: 3 }
      }
    });
    this.levelLabel.anchor.set(0.5, 0);
    this.levelLabel.resolution = 2;
    this.levelLabel.roundPixels = true;
    this.levelLabel.position.set(0, -tilemap.tileSize * 0.8);
    this.view.addChild(this.levelLabel);
    this.statusLabel = new Text({
      text: "",
      style: {
        fill: 0xfff5c3,
        fontSize: 14,
        fontWeight: "600",
        stroke: { color: 0x000000, width: 3 }
      }
    });
    this.statusLabel.anchor.set(0.5, 1);
    this.statusLabel.resolution = 2;
    this.statusLabel.roundPixels = true;
    this.statusLabel.visible = false;
    this.statusLabel.position.set(0, -tilemap.tileSize * 1.35);
    this.view.addChild(this.statusLabel);
    const pos = tilemap.tileToWorld(this.tileX, this.tileY);
    this.view.position.set(pos.x, pos.y);
    this.view.eventMode = "none";
  }

  get tilePosition(): { x: number; y: number } {
    return { x: this.tileX, y: this.tileY };
  }

  get position(): { x: number; y: number } {
    return { x: this.view.position.x, y: this.view.position.y };
  }

  tryMove(direction: Direction): void {
    if (this.isMovementLocked()) return;
    const delta = DIR_VECTORS[direction];
    const targetX = this.tileX + delta.x;
    const targetY = this.tileY + delta.y;
    if (!this.tilemap.isWalkable(targetX, targetY)) return;
    this.queue.push({ x: targetX, y: targetY });
  }

  moveTo(tile: { x: number; y: number }): void {
    if (this.isMovementLocked()) return;
    if (!Number.isInteger(tile.x) || !Number.isInteger(tile.y)) return;
    if (!this.tilemap.isWalkable(tile.x, tile.y)) return;
    const path: Array<{ x: number; y: number }> = [];
    let currentX = this.tileX;
    let currentY = this.tileY;
    const targetX = tile.x;
    const targetY = tile.y;
    const stepX = targetX > currentX ? 1 : targetX < currentX ? -1 : 0;
    while (currentX !== targetX) {
      currentX += stepX;
      if (!this.tilemap.isWalkable(currentX, currentY)) {
        return;
      }
      path.push({ x: currentX, y: currentY });
    }
    const stepY = targetY > currentY ? 1 : targetY < currentY ? -1 : 0;
    while (currentY !== targetY) {
      currentY += stepY;
      if (!this.tilemap.isWalkable(currentX, currentY)) {
        return;
      }
      path.push({ x: currentX, y: currentY });
    }
    if (path.length === 0) return;
    this.queue.length = 0;
    path.forEach((point) => this.queue.push(point));
  }

  update(deltaSeconds: number): void {
    if (this.teleportTimer > 0) {
      this.teleportTimer = Math.max(0, this.teleportTimer - deltaSeconds);
      this.teleportBlinkPhase += deltaSeconds * 6;
      this.sprite.alpha = 0.4 + 0.6 * Math.abs(Math.sin(this.teleportBlinkPhase));
      if (this.teleportTimer <= 0) {
        this.sprite.alpha = 1;
        this.statusLabel.visible = false;
        this.locked = false;
        const callback = this.teleportCallback;
        this.teleportCallback = undefined;
        callback?.();
      }
      return;
    }
    if (this.moving) {
      this.moveElapsed += deltaSeconds;
      const t = Math.min(1, this.moveElapsed / this.moveDuration);
      const lerp = (a: number, b: number) => a + (b - a) * t;
      this.view.position.set(lerp(this.startPos.x, this.endPos.x), lerp(this.startPos.y, this.endPos.y));
      if (t >= 1) {
        this.moving = false;
        if (this.nextTile) {
          this.tileX = this.nextTile.x;
          this.tileY = this.nextTile.y;
          this.nextTile = null;
          this.onMove?.(this.tileX, this.tileY);
        }
      }
      return;
    }
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      if (next) {
        this.startMovement(next.x, next.y);
      }
    } else if (this.heldDirections.size > 0) {
      const direction = DIR_PRIORITY.find((dir) => this.heldDirections.has(dir));
      if (direction) {
        this.tryMove(direction);
      }
    }
  }

  setDirectionHeld(direction: Direction, held: boolean): void {
    if (this.isMovementLocked() && held) {
      return;
    }
    if (held) {
      this.heldDirections.add(direction);
    } else {
      this.heldDirections.delete(direction);
    }
  }

  setLevelInfo(level: number, className: string): void {
    const safeLevel = Math.max(1, Math.floor(Number.isFinite(level) ? level : 1));
    const role = className && className.trim().length > 0 ? className.trim() : "Iniciante";
    this.levelLabel.text = `LVL ${safeLevel} | ${role}`;
  }

  private startMovement(tileX: number, tileY: number): void {
    if (this.isMovementLocked()) {
      this.queue.length = 0;
      return;
    }
    this.moving = true;
    this.moveElapsed = 0;
    this.startPos.x = this.view.position.x;
    this.startPos.y = this.view.position.y;
    const world = this.tilemap.tileToWorld(tileX, tileY);
    this.endPos.x = world.x;
    this.endPos.y = world.y;
    const deltaX = tileX - this.tileX;
    if (deltaX !== 0) {
      this.sprite.scale.x = (deltaX > 0 ? 1 : -1) * this.baseScaleX;
    }
    this.sprite.scale.y = this.baseScaleY;
    this.nextTile = { x: tileX, y: tileY };
  }

  private isMovementLocked(): boolean {
    return this.locked || this.teleportTimer > 0;
  }

  beginTeleport(message: string, durationSeconds: number, onComplete: () => void): void {
    this.queue.length = 0;
    this.moving = false;
    this.locked = true;
    this.teleportTimer = durationSeconds;
    this.teleportBlinkPhase = 0;
    this.teleportCallback = onComplete;
    this.statusLabel.text = message;
    this.statusLabel.visible = true;
  }
}
