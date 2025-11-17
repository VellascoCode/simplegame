import { Container } from "pixi.js";
import { createPlayerOrb } from "@/src/pixi/sprites/PlayerOrb";

export type Direction = "up" | "down" | "left" | "right";

const DIRECTION_VECTORS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

export type PlayerConfig = {
  tileSize: number;
  initialTile: { x: number; y: number };
  moveDuration?: number;
};

export class PlayerEntity {
  readonly view: Container;
  readonly tileSize: number;
  private tileX: number;
  private tileY: number;
  private readonly moveDuration: number;
  private moving = false;
  private moveElapsed = 0;
  private readonly startPos = { x: 0, y: 0 };
  private readonly endPos = { x: 0, y: 0 };
  private readonly queue: Array<{ x: number; y: number }> = [];
  private bounds = { cols: 0, rows: 0 };
  private nextTile: { x: number; y: number } | null = null;

  constructor(config: PlayerConfig) {
    this.tileSize = config.tileSize;
    this.tileX = config.initialTile.x;
    this.tileY = config.initialTile.y;
    this.moveDuration = config.moveDuration ?? 0.18;
    this.view = new Container();
    this.view.eventMode = "none";
    const orb = createPlayerOrb(this.tileSize);
    this.view.addChild(orb);
    this.view.position.copyFrom(this.tileToPosition(this.tileX, this.tileY));
  }

  setBounds(cols: number, rows: number): void {
    this.bounds = { cols, rows };
  }

  enqueueDirection(direction: Direction): void {
    const delta = DIRECTION_VECTORS[direction];
    this.enqueueStep(this.tileX + delta.x, this.tileY + delta.y);
  }

  enqueuePath(targetTile: { x: number; y: number }): void {
    if (!this.isInsideBounds(targetTile.x, targetTile.y)) return;
    this.queue.length = 0;
    const dx = targetTile.x - this.tileX;
    const dy = targetTile.y - this.tileY;
    const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
    const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;
    let currentX = this.tileX;
    let currentY = this.tileY;
    for (let ix = 0; ix < Math.abs(dx); ix++) {
      currentX += stepX;
      if (!this.isInsideBounds(currentX, currentY)) return;
      this.queue.push({ x: currentX, y: currentY });
    }
    for (let iy = 0; iy < Math.abs(dy); iy++) {
      currentY += stepY;
      if (!this.isInsideBounds(currentX, currentY)) return;
      this.queue.push({ x: currentX, y: currentY });
    }
  }

  update(deltaSeconds: number): void {
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
        }
      }
      return;
    }

    if (this.queue.length > 0) {
      const next = this.queue.shift();
      if (next) {
        this.startMovement(next.x, next.y);
      }
    }
  }

  get position(): { x: number; y: number } {
    return { x: this.view.position.x, y: this.view.position.y };
  }

  get tilePosition(): { x: number; y: number } {
    return { x: this.tileX, y: this.tileY };
  }

  private enqueueStep(tileX: number, tileY: number): void {
    if (!this.isInsideBounds(tileX, tileY)) return;
    this.queue.push({ x: tileX, y: tileY });
  }

  private startMovement(targetTileX: number, targetTileY: number): void {
    this.moving = true;
    this.moveElapsed = 0;
    this.nextTile = { x: targetTileX, y: targetTileY };
    this.startPos.x = this.view.position.x;
    this.startPos.y = this.view.position.y;
    const target = this.tileToPosition(targetTileX, targetTileY);
    this.endPos.x = target.x;
    this.endPos.y = target.y;
  }

  private tileToPosition(tileX: number, tileY: number): { x: number; y: number } {
    return {
      x: tileX * this.tileSize + this.tileSize / 2,
      y: tileY * this.tileSize + this.tileSize / 2
    };
  }

  private isInsideBounds(tileX: number, tileY: number): boolean {
    if (this.bounds.cols === 0 || this.bounds.rows === 0) return true;
    return tileX >= 0 && tileY >= 0 && tileX < this.bounds.cols && tileY < this.bounds.rows;
  }
}
