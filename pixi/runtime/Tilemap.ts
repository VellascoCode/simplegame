import { Container, Sprite, Texture } from "pixi.js";

type Matrix<T> = T[][];

export type TilemapConfig = {
  cols?: number;
  rows?: number;
  tileSize?: number;
  tilesLayer0?: Matrix<string>;
  blocks?: Matrix<boolean>;
  spawn?: { x: number; y: number };
};

const DEFAULT_TILE = "/tilesets/tile1.png";

function createMatrix<T>(rows: number, cols: number, fill: T): Matrix<T> {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
}

export class Tilemap {
  readonly cols: number;
  readonly rows: number;
  readonly tileSize: number;
  readonly container: Container;
  private spawnTile: { x: number; y: number };
  private tiles: Matrix<string>;
  private blocks: Matrix<boolean>;

  constructor({ cols = 80, rows = 80, tileSize = 64, tilesLayer0, blocks, spawn }: TilemapConfig = {}) {
    this.cols = cols;
    this.rows = rows;
    this.tileSize = tileSize;
    this.container = new Container();
    const providedTiles = tilesLayer0 ?? createMatrix(rows, cols, DEFAULT_TILE);
    this.tiles = this.normalizeTiles(providedTiles, DEFAULT_TILE);
    const providedBlocks = blocks ?? createMatrix(rows, cols, false);
    this.blocks = this.normalizeBlocks(providedBlocks);
    this.spawnTile = spawn ?? { x: Math.floor(this.cols / 2), y: Math.floor(this.rows / 2) };
    this.buildSprites();
  }

  get worldWidth(): number {
    return this.cols * this.tileSize;
  }

  get worldHeight(): number {
    return this.rows * this.tileSize;
  }

  getSpawnTile(): { x: number; y: number } {
    return { ...this.spawnTile };
  }

  getTilePath(tileX: number, tileY: number): string {
    if (!this.isInside(tileX, tileY)) return DEFAULT_TILE;
    return this.tiles[tileY][tileX];
  }

  isInside(tileX: number, tileY: number): boolean {
    return tileX >= 0 && tileY >= 0 && tileX < this.cols && tileY < this.rows;
  }

  isWalkable(tileX: number, tileY: number): boolean {
    if (!this.isInside(tileX, tileY)) return false;
    const blocked = this.blocks[tileY]?.[tileX] ?? false;
    return !blocked;
  }

  tileToWorld(tileX: number, tileY: number): { x: number; y: number } {
    return {
      x: tileX * this.tileSize + this.tileSize / 2,
      y: tileY * this.tileSize + this.tileSize / 2
    };
  }

  worldToTile(worldX: number, worldY: number): { x: number; y: number } {
    return {
      x: Math.floor(worldX / this.tileSize),
      y: Math.floor(worldY / this.tileSize)
    };
  }

  setSpawnTile(x: number, y: number): void {
    if (!this.isInside(x, y)) return;
    this.spawnTile = { x, y };
  }

  private buildSprites(): void {
    this.container.removeChildren();
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const texturePath = this.tiles[y]?.[x] ?? DEFAULT_TILE;
        const sprite = new Sprite(Texture.from(texturePath));
        sprite.width = this.tileSize;
        sprite.height = this.tileSize;
        sprite.position.set(x * this.tileSize, y * this.tileSize);
        this.container.addChild(sprite);
      }
    }
  }

  private normalizeTiles(matrix: Matrix<string>, fill: string): Matrix<string> {
    return Array.from({ length: this.rows }, (_, rowIndex) =>
      Array.from({ length: this.cols }, (_, colIndex) => matrix[rowIndex]?.[colIndex] ?? fill)
    );
  }

  private normalizeBlocks(matrix: Matrix<boolean>): Matrix<boolean> {
    return Array.from({ length: this.rows }, (_, rowIndex) =>
      Array.from({ length: this.cols }, (_, colIndex) => Boolean(matrix[rowIndex]?.[colIndex]))
    );
  }
}
