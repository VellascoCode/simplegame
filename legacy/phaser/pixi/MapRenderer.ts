import { Container, Sprite, Texture } from "pixi.js";

type MapTextures = {
  ground: string;
  border: string;
  spawn: string;
};

const DEFAULT_TEXTURES: MapTextures = {
  ground: "/tilesets/tile1.png",
  border: "/tilesets/tile2.png",
  spawn: "/tilesets/tile101.png"
};

export type MapRendererConfig = {
  cols: number;
  rows: number;
  tileSize: number;
  textures?: Partial<MapTextures>;
  spawnTile?: { x: number; y: number };
};

export class MapRenderer {
  readonly container: Container;
  readonly cols: number;
  readonly rows: number;
  readonly tileSize: number;
  private readonly textures: MapTextures;
  private readonly spawnTile: { x: number; y: number };

  constructor(config: MapRendererConfig) {
    this.cols = config.cols;
    this.rows = config.rows;
    this.tileSize = config.tileSize;
    this.textures = { ...DEFAULT_TEXTURES, ...(config.textures ?? {}) };
    this.spawnTile = config.spawnTile ?? { x: 5, y: 5 };
    this.container = new Container();
    this.container.sortableChildren = false;
    this.buildTiles();
  }

  get worldWidth(): number {
    return this.cols * this.tileSize;
  }

  get worldHeight(): number {
    return this.rows * this.tileSize;
  }

  getTileCenter(tileX: number, tileY: number): { x: number; y: number } {
    return {
      x: tileX * this.tileSize + this.tileSize / 2,
      y: tileY * this.tileSize + this.tileSize / 2
    };
  }

  isInside(tileX: number, tileY: number): boolean {
    return tileX >= 0 && tileY >= 0 && tileX < this.cols && tileY < this.rows;
  }

  getSpawnTile(): { x: number; y: number } {
    return { ...this.spawnTile };
  }

  getSpawnWorldPosition(): { x: number; y: number } {
    return this.getTileCenter(this.spawnTile.x, this.spawnTile.y);
  }

  private buildTiles(): void {
    const groundTexture = Texture.from(this.textures.ground);
    const borderTexture = Texture.from(this.textures.border);
    const spawnTexture = Texture.from(this.textures.spawn);
    this.container.removeChildren();
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const isBorder = row === 0 || col === 0 || row === this.rows - 1 || col === this.cols - 1;
        const texture = isBorder ? borderTexture : groundTexture;
        const tile = new Sprite(texture);
        tile.width = this.tileSize;
        tile.height = this.tileSize;
        tile.position.set(col * this.tileSize, row * this.tileSize);
        tile.alpha = 0.98;
        this.container.addChild(tile);
      }
    }
    if (this.isInside(this.spawnTile.x, this.spawnTile.y)) {
      const spawn = new Sprite(spawnTexture);
      spawn.width = this.tileSize;
      spawn.height = this.tileSize;
      spawn.position.set(this.spawnTile.x * this.tileSize, this.spawnTile.y * this.tileSize);
      spawn.alpha = 0.9;
      this.container.addChild(spawn);
    }
  }
}
