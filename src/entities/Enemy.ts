import { Container, Graphics } from "pixi.js";

export class Enemy extends Container {
  private readonly body: Graphics;

  constructor(color = 0xe53935) {
    super();
    this.body = new Graphics();
    this.body.roundRect(-12, -12, 24, 24, 4).fill(color);
    this.addChild(this.body);
  }
}
