import { Container, Rectangle } from "pixi.js";

import { BaseScene, type GameApp } from "@/src/core/App";
import { CameraController } from "@/src/pixi/Camera";
import { Hud } from "@/src/pixi/Hud";
import { InputController } from "@/src/pixi/InputController";
import { MapRenderer } from "@/src/pixi/MapRenderer";
import { PlayerEntity } from "@/src/pixi/Player";
import { createNpcOrb, type NpcOrb } from "@/src/pixi/sprites/NpcOrb";

const TILE_SIZE = 48;
const MAP_COLS = 40;
const MAP_ROWS = 40;
const MAP_NAME = "Valley of Fire";
const SPAWN_TILE = { x: 5, y: 5 };
const NPC_TINTS = [0xa5d8ff, 0xffc9c9, 0xffe066, 0xb197fc, 0x95e1d3];

export class WorldScene extends BaseScene {
  private cameraLayer!: Container;
  private overlayLayer!: Container;
  private mapRenderer!: MapRenderer;
  private player!: PlayerEntity;
  private camera!: CameraController;
  private input!: InputController;
  private npcs: NpcOrb[] = [];
  private hud!: Hud;
  private lastViewport = { width: 0, height: 0 };

  constructor(game: GameApp) {
    super(game);
  }

  init(): void {
    this.cameraLayer = new Container();
    this.overlayLayer = new Container();
    this.container.removeChildren();
    this.container.addChild(this.cameraLayer);
    this.container.addChild(this.overlayLayer);
    this.container.eventMode = "static";
    this.container.hitArea = new Rectangle(0, 0, this.game.width, this.game.height);

    this.mapRenderer = new MapRenderer({ cols: MAP_COLS, rows: MAP_ROWS, tileSize: TILE_SIZE, spawnTile: SPAWN_TILE });
    this.cameraLayer.addChild(this.mapRenderer.container);

    this.player = new PlayerEntity({
      tileSize: TILE_SIZE,
      initialTile: this.mapRenderer.getSpawnTile()
    });
    this.player.setBounds(MAP_COLS, MAP_ROWS);
    this.cameraLayer.addChild(this.player.view);

    this.npcs = this.createNpcOrbs();
    this.npcs.forEach((npc) => this.cameraLayer.addChild(npc.view));

    this.camera = new CameraController({
      container: this.cameraLayer,
      viewportWidth: this.game.width,
      viewportHeight: this.game.height,
      worldWidth: this.mapRenderer.worldWidth,
      worldHeight: this.mapRenderer.worldHeight
    });

    this.input = new InputController({
      camera: this.camera,
      interactionLayer: this.container,
      overlayLayer: this.overlayLayer,
      viewport: { width: this.game.width, height: this.game.height },
      map: { cols: MAP_COLS, rows: MAP_ROWS, tileSize: TILE_SIZE },
      onDirection: (direction) => this.player.enqueueDirection(direction),
      onPath: (tile) => this.player.enqueuePath(tile)
    });

    this.hud = new Hud(MAP_NAME);
    this.overlayLayer.addChild(this.hud.view);
    this.hud.resize(this.game.width);

    this.lastViewport = { width: this.game.width, height: this.game.height };
  }

  update(deltaSeconds: number): void {
    this.player.update(deltaSeconds);
    this.npcs.forEach((npc) => npc.update(deltaSeconds));
    this.camera.update(this.player.position);
    this.hud.update(this.player.tilePosition);
    this.handleResize();
  }

  destroy(): void {
    this.input?.dispose();
    super.destroy();
  }

  private handleResize(): void {
    if (this.lastViewport.width === this.game.width && this.lastViewport.height === this.game.height) {
      return;
    }
    this.container.hitArea = new Rectangle(0, 0, this.game.width, this.game.height);
    this.camera.resize(this.game.width, this.game.height);
    this.input.resize(this.game.width, this.game.height);
    this.hud.resize(this.game.width);
    this.lastViewport = { width: this.game.width, height: this.game.height };
  }

  private createNpcOrbs(): NpcOrb[] {
    return Array.from({ length: 5 }, (_, index) =>
      createNpcOrb({
        tileSize: TILE_SIZE,
        startTile: this.randomInteriorTile(),
        bounds: { cols: MAP_COLS, rows: MAP_ROWS },
        tint: NPC_TINTS[index % NPC_TINTS.length]
      })
    );
  }

  private randomInteriorTile(): { x: number; y: number } {
    return {
      x: 1 + Math.floor(Math.random() * (MAP_COLS - 2)),
      y: 1 + Math.floor(Math.random() * (MAP_ROWS - 2))
    };
  }
}
