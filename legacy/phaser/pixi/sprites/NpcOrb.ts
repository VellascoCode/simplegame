import { AnimatedSprite, Texture } from "pixi.js";

const WATER_FRAMES = Array.from({ length: 12 }, (_, index) => `${index + 1}.png`);

function buildTextures(prefix: string, frames: string[]): Texture[] {
  return frames.map((name) => Texture.from(`${prefix}${name}`));
}

export type NpcOrbConfig = {
  tileSize: number;
  startTile: { x: number; y: number };
  bounds: { cols: number; rows: number };
  speed?: number;
  tint?: number;
};

type Direction = "up" | "down" | "left" | "right";

const DIRECTIONS: Direction[] = ["up", "down", "left", "right"];
const DIR_VECTORS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

export class NpcOrb {
  readonly view: AnimatedSprite;
  private readonly tileSize: number;
  private readonly bounds: { cols: number; rows: number };
  private currentTile: { x: number; y: number };
  private targetTile: { x: number; y: number } | null = null;
  private moveElapsed = 0;
  private moveDuration: number;
  private startPos = { x: 0, y: 0 };
  private endPos = { x: 0, y: 0 };

  constructor(config: NpcOrbConfig) {
    this.tileSize = config.tileSize;
    this.bounds = config.bounds;
    this.currentTile = { ...config.startTile };
    this.moveDuration = config.speed ?? 0.7;
    const textures = buildTextures("/tester/water/", WATER_FRAMES);
    this.view = new AnimatedSprite(textures);
    this.view.anchor.set(0.5);
    this.view.width = this.tileSize;
    this.view.height = this.tileSize;
    this.view.animationSpeed = 0.12;
    this.view.loop = true;
    this.view.play();
    if (config.tint) {
      this.view.tint = config.tint;
    }
    const initialPosition = this.tileToWorld(this.currentTile.x, this.currentTile.y);
    this.view.position.set(initialPosition.x, initialPosition.y);
  }

  update(deltaSeconds: number): void {
    if (!this.targetTile) {
      this.chooseNextTarget();
    }
    if (!this.targetTile) return;
    this.moveElapsed += deltaSeconds;
    const t = Math.min(1, this.moveElapsed / this.moveDuration);
    const lerp = (a: number, b: number) => a + (b - a) * t;
    this.view.position.set(lerp(this.startPos.x, this.endPos.x), lerp(this.startPos.y, this.endPos.y));
    if (t >= 1) {
      this.currentTile = { ...this.targetTile };
      this.targetTile = null;
    }
  }

  private chooseNextTarget(): void {
    const directions = [...DIRECTIONS];
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }
    for (const direction of directions) {
      const vec = DIR_VECTORS[direction];
      const nextX = this.currentTile.x + vec.x;
      const nextY = this.currentTile.y + vec.y;
      if (!this.isInsideBounds(nextX, nextY)) {
        continue;
      }
      this.targetTile = { x: nextX, y: nextY };
      this.moveElapsed = 0;
      this.startPos = this.tileToWorld(this.currentTile.x, this.currentTile.y);
      this.endPos = this.tileToWorld(nextX, nextY);
      this.moveDuration = 0.4 + Math.random() * 0.6;
      return;
    }
  }

  private tileToWorld(tileX: number, tileY: number): { x: number; y: number } {
    return {
      x: tileX * this.tileSize + this.tileSize / 2,
      y: tileY * this.tileSize + this.tileSize / 2
    };
  }

  private isInsideBounds(tileX: number, tileY: number): boolean {
    return tileX >= 0 && tileY >= 0 && tileX < this.bounds.cols && tileY < this.bounds.rows;
  }
}

export function createNpcOrb(config: NpcOrbConfig): NpcOrb {
  return new NpcOrb(config);
}
