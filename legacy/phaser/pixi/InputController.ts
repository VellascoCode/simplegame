import type { FederatedPointerEvent } from "pixi.js";

import { Container, Graphics, Text } from "pixi.js";

import type { CameraController } from "@/src/pixi/Camera";
import type { Direction } from "@/src/pixi/Player";

type InputOptions = {
  camera: CameraController;
  interactionLayer: Container;
  overlayLayer: Container;
  viewport: { width: number; height: number };
  map: { cols: number; rows: number; tileSize: number };
  onDirection: (direction: Direction) => void;
  onPath: (tile: { x: number; y: number }) => void;
};

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right"
};

export class InputController {
  private readonly camera: CameraController;
  private readonly interactionLayer: Container;
  private readonly overlayLayer: Container;
  private readonly mapCols: number;
  private readonly mapRows: number;
  private readonly tileSize: number;
  private readonly onDirection: (direction: Direction) => void;
  private readonly onPath: (tile: { x: number; y: number }) => void;
  private dpadVisible = false;
  private readonly toggleButton: Container;
  private readonly dpadContainer: Container;
  private viewportWidth: number;
  private viewportHeight: number;

  constructor(options: InputOptions) {
    this.camera = options.camera;
    this.interactionLayer = options.interactionLayer;
    this.overlayLayer = options.overlayLayer;
    this.mapCols = options.map.cols;
    this.mapRows = options.map.rows;
    this.tileSize = options.map.tileSize;
    this.onDirection = options.onDirection;
    this.onPath = options.onPath;
    this.viewportWidth = options.viewport.width;
    this.viewportHeight = options.viewport.height;

    this.interactionLayer.eventMode = "static";
    this.interactionLayer.on("pointertap", this.handlePointerTap);

    window.addEventListener("keydown", this.handleKeyDown);

    this.dpadContainer = new Container();
    this.overlayLayer.addChild(this.dpadContainer);
    this.toggleButton = this.createToggleButton();
    this.overlayLayer.addChild(this.toggleButton);
    this.buildDPad();
    this.updateLayout();
  }

  dispose(): void {
    this.interactionLayer.off("pointertap", this.handlePointerTap);
    window.removeEventListener("keydown", this.handleKeyDown);
    this.dpadContainer.destroy({ children: true });
    this.toggleButton.destroy({ children: true });
  }

  resize(width: number, height: number): void {
    this.viewportWidth = width;
    this.viewportHeight = height;
    this.updateLayout();
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    const direction = KEY_MAP[event.code];
    if (!direction) return;
    event.preventDefault();
    this.onDirection(direction);
  };

  private handlePointerTap = (event: FederatedPointerEvent): void => {
    if (!(event.target instanceof Container)) {
      return;
    }
    let current: Container | null = event.target;
    while (current) {
      if (current === this.overlayLayer) {
        return;
      }
      current = current.parent ?? null;
    }
    const world = this.camera.toWorld(event.global.x, event.global.y);
    const tileX = Math.floor(world.x / this.tileSize);
    const tileY = Math.floor(world.y / this.tileSize);
    if (tileX < 0 || tileY < 0 || tileX >= this.mapCols || tileY >= this.mapRows) return;
    this.onPath({ x: tileX, y: tileY });
  };

  private buildDPad(): void {
    this.dpadContainer.removeChildren();
    const background = new Graphics();
    background.roundRect(0, 0, 160, 160, 24).fill(0x151515, 0.8);
    this.dpadContainer.addChild(background);
    const arrows: Array<{ direction: Direction; x: number; y: number; label: string }> = [
      { direction: "up", x: 56, y: 12, label: "↑" },
      { direction: "down", x: 56, y: 92, label: "↓" },
      { direction: "left", x: 12, y: 56, label: "←" },
      { direction: "right", x: 92, y: 56, label: "→" }
    ];
    arrows.forEach((arrow) => {
      const button = this.createArrowButton(arrow.label);
      button.position.set(arrow.x, arrow.y);
      button.on("pointertap", (event) => {
        event.stopPropagation();
        this.onDirection(arrow.direction);
      });
      this.dpadContainer.addChild(button);
    });
    this.dpadContainer.visible = this.dpadVisible;
  }

  private createArrowButton(label: string): Container {
    const container = new Container();
    const bg = new Graphics();
    bg.roundRect(0, 0, 56, 56, 16).fill(0x2b2b2b).stroke({ width: 2, color: 0xffffff, alpha: 0.4 });
    container.addChild(bg);
    const text = new Text({ text: label, style: { fill: 0xffffff, fontSize: 24 } });
    text.anchor.set(0.5);
    text.position.set(28, 28);
    container.addChild(text);
    container.eventMode = "static";
    container.cursor = "pointer";
    return container;
  }

  private createToggleButton(): Container {
    const container = new Container();
    const bg = new Graphics();
    bg.roundRect(0, 0, 56, 56, 16).fill(0x0f0f0f, 0.9).stroke({ width: 2, color: 0xffffff, alpha: 0.4 });
    const text = new Text({ text: "🎮", style: { fontSize: 28 } });
    text.anchor.set(0.5);
    text.position.set(28, 28);
    container.addChild(bg, text);
    container.eventMode = "static";
    container.cursor = "pointer";
    container.on("pointertap", (event) => {
      event.stopPropagation();
      this.dpadVisible = !this.dpadVisible;
      this.dpadContainer.visible = this.dpadVisible;
    });
    return container;
  }

  private updateLayout(): void {
    const padding = 16;
    this.toggleButton.position.set(padding, this.viewportHeight - 72 - padding);
    this.dpadContainer.position.set(padding, this.viewportHeight - 200);
  }
}
