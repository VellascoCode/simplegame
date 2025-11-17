import { Container } from "pixi.js";

export class Camera {
  private readonly container: Container;
  private viewportWidth: number;
  private viewportHeight: number;
  private readonly worldWidth: number;
  private readonly worldHeight: number;
  private scale = 1;
  private readonly baseScale: number;

  constructor(options: {
    container: Container;
    viewportWidth: number;
    viewportHeight: number;
    worldWidth: number;
    worldHeight: number;
    scale?: number;
  }) {
    this.container = options.container;
    this.viewportWidth = options.viewportWidth;
    this.viewportHeight = options.viewportHeight;
    this.worldWidth = options.worldWidth;
    this.worldHeight = options.worldHeight;
    this.baseScale = options.scale ?? 1;
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
    const halfVisibleWidth = visibleWidth / 2;
    const halfVisibleHeight = visibleHeight / 2;
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const canScrollX = this.worldWidth > visibleWidth;
    const canScrollY = this.worldHeight > visibleHeight;
    const pivotX = canScrollX ? clamp(target.x, halfVisibleWidth, this.worldWidth - halfVisibleWidth) : this.worldWidth / 2;
    const pivotY = canScrollY ? clamp(target.y, halfVisibleHeight, this.worldHeight - halfVisibleHeight) : this.worldHeight / 2;
    this.container.pivot.set(pivotX, pivotY);
    const canCenterX = this.worldWidth > this.viewportWidth;
    const canCenterY = this.worldHeight > this.viewportHeight;
    this.container.position.x = canCenterX ? this.viewportWidth / 2 : (this.worldWidth / 2) * this.scale;
    this.container.position.y = canCenterY ? this.viewportHeight / 2 : (this.worldHeight / 2) * this.scale;
  }

  worldFromScreen(x: number, y: number): { x: number; y: number } {
    const local = this.container.toLocal({ x, y });
    return { x: local.x, y: local.y };
  }

  private updateScale(): void {
    const scaleX = this.viewportWidth / this.worldWidth;
    const scaleY = this.viewportHeight / this.worldHeight;
    const fitScale = Math.min(scaleX, scaleY);
    const shouldShrink = this.worldWidth > this.viewportWidth || this.worldHeight > this.viewportHeight;
    if (shouldShrink) {
      this.scale = this.baseScale;
    } else {
      this.scale = Math.min(fitScale, this.baseScale);
    }
    this.container.scale.set(this.scale);
  }
}
