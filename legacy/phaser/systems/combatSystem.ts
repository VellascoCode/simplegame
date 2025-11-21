import type { Container } from "pixi.js";

import type { Player } from "@/src/entities/Player";

import { Enemy } from "@/src/entities/Enemy";

export type CombatLogEntry = {
  message: string;
  createdAt: number;
};

export class CombatSystem {
  private readonly log: CombatLogEntry[] = [];
  private readonly enemies: Enemy[] = [];

  constructor(private readonly layer: Container, private readonly player: Player) {}

  spawnEnemy(position: { x: number; y: number }, color?: number): Enemy {
    const enemy = new Enemy(color);
    enemy.position.set(position.x, position.y);
    this.layer.addChild(enemy);
    this.enemies.push(enemy);
    return enemy;
  }

  update(): void {
    // Placeholder: later this will contain attack ranges, AI and XP.
  }

  simulateAttack(): void {
    const entry: CombatLogEntry = {
      message: `Player attacked at ${new Date().toLocaleTimeString()}`,
      createdAt: Date.now()
    };
    this.log.push(entry);
    if (this.log.length > 10) this.log.shift();
  }

  getLatestLog(): CombatLogEntry[] {
    return [...this.log];
  }

  destroy(): void {
    for (const enemy of this.enemies) {
      enemy.destroy({ children: true });
    }
    this.enemies.length = 0;
  }
}
