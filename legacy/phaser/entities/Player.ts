import { Container, Graphics, type Point } from "pixi.js";

export class Player extends Container {
  private readonly body: Graphics;
  speed = 180; // pixels per second

  constructor() {
    super();
    this.eventMode = "none";
    this.body = new Graphics();
    this.body.roundRect(-16, -16, 32, 32, 4).fill(0x4caf50);
    this.addChild(this.body);
  }

  move(direction: Point, deltaSeconds: number): void {
    this.x += direction.x * this.speed * deltaSeconds;
    this.y += direction.y * this.speed * deltaSeconds;
  }

  update(deltaSeconds: number): void {
    // Placeholder for future animations
    void deltaSeconds;
  }
}
