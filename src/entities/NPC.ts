import { Container, Graphics } from "pixi.js";

export class NPC extends Container {
  private readonly body: Graphics;
  private direction = 1;
  private elapsed = 0;

  constructor(color = 0x2196f3) {
    super();
    this.body = new Graphics();
    this.body.roundRect(-14, -14, 28, 28, 4).fill(color);
    this.addChild(this.body);
  }

  update(deltaSeconds: number): void {
    this.elapsed += deltaSeconds;
    if (this.elapsed > 2) {
      this.elapsed = 0;
      this.direction *= -1;
    }
    this.y += this.direction * 10 * deltaSeconds;
  }
}
