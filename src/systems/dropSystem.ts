import { Container, Graphics } from "pixi.js";

export type Drop = {
  id: string;
  expiresAt: number;
  node: Graphics;
};

export class DropSystem {
  private readonly drops: Drop[] = [];

  constructor(private readonly layer: Container) {}

  spawnDrop(position: { x: number; y: number }): void {
    const drop = new Graphics();
    drop.circle(0, 0, 6).fill(0xffeb3b).stroke({ width: 2, color: 0x8d6e63 });
    drop.position.set(position.x, position.y);
    drop.eventMode = "static";
    drop.cursor = "pointer";
    drop.on("pointertap", () => this.collectDrop(drop));
    this.layer.addChild(drop);
    this.drops.push({ id: crypto.randomUUID(), expiresAt: Date.now() + 10000, node: drop });
  }

  private collectDrop(node: Graphics): void {
    node.visible = false;
  }

  update(): void {
    const now = Date.now();
    for (const drop of this.drops) {
      if (drop.expiresAt <= now) {
        drop.node.destroy();
      }
    }
    this.drops.splice(0, this.drops.length, ...this.drops.filter((drop) => drop.expiresAt > now));
  }

  destroy(): void {
    for (const drop of this.drops) {
      drop.node.destroy();
    }
    this.drops.length = 0;
  }
}
