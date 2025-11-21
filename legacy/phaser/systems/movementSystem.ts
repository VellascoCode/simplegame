import { Point } from "pixi.js";

import type { Player } from "@/src/entities/Player";

const DEFAULT_BOUNDS = { width: 960, height: 540 };

export class MovementSystem {
  private readonly pressedKeys = new Set<string>();
  private readonly direction = new Point(0, 0);
  private readonly onKeyDown = (event: KeyboardEvent): void => {
    this.pressedKeys.add(event.key);
  };
  private readonly onKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.key);
  };

  constructor(private readonly player: Player, private readonly bounds = DEFAULT_BOUNDS) {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("keyup", this.onKeyUp);
    }
  }

  update(deltaSeconds: number): void {
    this.direction.set(0, 0);
    if (this.pressedKeys.has("ArrowUp")) this.direction.y -= 1;
    if (this.pressedKeys.has("ArrowDown")) this.direction.y += 1;
    if (this.pressedKeys.has("ArrowLeft")) this.direction.x -= 1;
    if (this.pressedKeys.has("ArrowRight")) this.direction.x += 1;

    if (this.direction.x !== 0 || this.direction.y !== 0) {
      const length = Math.hypot(this.direction.x, this.direction.y) || 1;
      this.direction.x /= length;
      this.direction.y /= length;
      this.player.move(this.direction, deltaSeconds);
      this.confinePlayer();
    }
  }

  private confinePlayer(): void {
    this.player.x = Math.max(32, Math.min(this.bounds.width - 32, this.player.x));
    this.player.y = Math.max(32, Math.min(this.bounds.height - 32, this.player.y));
  }

  destroy(): void {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.onKeyDown);
      window.removeEventListener("keyup", this.onKeyUp);
    }
  }
}
