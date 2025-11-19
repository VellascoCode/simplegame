import { Container } from "pixi.js";
import { NPC } from "@/src/entities/NPC";

export class NPCSystem {
  private readonly npcs: NPC[] = [];

  constructor(private readonly layer: Container) {}

  spawnNPC(position: { x: number; y: number }, color?: number): NPC {
    const npc = new NPC(color);
    npc.position.set(position.x, position.y);
    this.layer.addChild(npc);
    this.npcs.push(npc);
    return npc;
  }

  update(deltaSeconds: number): void {
    for (const npc of this.npcs) {
      npc.update(deltaSeconds);
    }
  }

  destroy(): void {
    for (const npc of this.npcs) {
      npc.destroy({ children: true });
    }
    this.npcs.length = 0;
  }
}
