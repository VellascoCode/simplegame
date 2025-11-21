import type { Container } from "pixi.js";

import { Point } from "pixi.js";

export type CameraConfig = {
  container: Container;
  viewportWidth: number;
  viewportHeight: number;
  worldWidth: number;
  worldHeight: number;
};

export class CameraController {
  private readonly container: Container;
  private viewportWidth: number;
  private viewportHeight: number;
  private readonly worldWidth: number;
  private readonly worldHeight: number;
  private scale = 1;
  private readonly followLerp: number;
  private currentPivot = new Point();
  private targetPivot = new Point();

  constructor(config: CameraConfig) {
    this.container = config.container;
    this.viewportWidth = config.viewportWidth;
    this.viewportHeight = config.viewportHeight;
    this.worldWidth = config.worldWidth;
    this.worldHeight = config.worldHeight;
     this.followLerp = 0.15;
    this.updateScale();
  }

  resize(width: number, height: number): void {
    this.viewportWidth = width;
    this.viewportHeight = height;
    this.updateScale();
  }

  update(target: { x: number; y: number }): void {
    const visibleWidth = this.viewportWidth / this.scale;
    const visibleHeight = this.viewportHeight / this.scale;
    const halfW = visibleWidth / 2;
    const halfH = visibleHeight / 2;
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const pivotX =
      this.worldWidth <= visibleWidth
        ? this.worldWidth / 2
        : clamp(target.x, halfW, this.worldWidth - halfW);
    const pivotY =
      this.worldHeight <= visibleHeight
        ? this.worldHeight / 2
        : clamp(target.y, halfH, this.worldHeight - halfH);
    this.targetPivot.set(pivotX, pivotY);
    this.currentPivot.x += (this.targetPivot.x - this.currentPivot.x) * this.followLerp;
    this.currentPivot.y += (this.targetPivot.y - this.currentPivot.y) * this.followLerp;
    this.container.pivot.copyFrom(this.currentPivot);
    this.container.position.set(this.viewportWidth / 2, this.viewportHeight / 2);
  }

  toWorld(screenX: number, screenY: number): Point {
    return this.container.toLocal(new Point(screenX, screenY));
  }

  private updateScale(): void {
    const scaleX = this.viewportWidth / this.worldWidth;
    const scaleY = this.viewportHeight / this.worldHeight;
    this.scale = Math.min(scaleX, scaleY, 1);
    this.container.scale.set(this.scale);
    this.currentPivot.set(this.worldWidth / 2, this.worldHeight / 2);
    this.targetPivot.copyFrom(this.currentPivot);
  }
}
