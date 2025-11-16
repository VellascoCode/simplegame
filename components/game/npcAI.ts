import {
  MAP_TILE_SIZE,
  LANCER_SPEED,
  STOP_DISTANCE,
  MAX_ATTACKERS,
  LANCER_SEPARATION_FORCE,
  LANCER_SEPARATION_RADIUS
} from "./constants";
import type { NPCRecord, LancerRecord } from "./types";
import { randomPoint } from "./utils";
import { getPhaserInstance } from "./phaserInstance";

export function spawnNPCs(
  scene: Phaser.Scene,
  count: number,
  worldWidth: number,
  worldHeight: number,
  npcColors: number[],
  names: string[],
  records: NPCRecord[]
) {
  const Phaser = getPhaserInstance();
  for (let i = 0; i < count; i++) {
    const sprite = scene.add.sprite(
      Phaser.Math.Between(120, worldWidth - 120),
      Phaser.Math.Between(120, worldHeight - 120),
      "hero-idle-sheet",
      0
    );
    sprite.setOrigin(0.5, 1);
    sprite.setScale(1);
    sprite.setTint(npcColors[i % npcColors.length]);
    sprite.play("hero-idle");
    sprite.setDepth(sprite.y);
    const level = Phaser.Math.Between(3, 12);
    const name = `${names[i % names.length]} Lv.${level}`;
    const label = scene.add
      .text(sprite.x, sprite.y - sprite.displayHeight - 4, name, {
        color: "#fff8d0",
        fontSize: "14px",
        fontStyle: "bold"
      })
      .setOrigin(0.5, 1)
      .setDepth(sprite.depth + 5);
    records.push({
      sprite,
      label,
      target: randomPoint(scene, worldWidth, worldHeight),
      name
    });
  }
}

export function updateNPCs(
  scene: Phaser.Scene,
  npcs: NPCRecord[],
  delta: number,
  worldWidth: number,
  worldHeight: number
) {
  const Phaser = getPhaserInstance();
  const speed = 60;
  npcs.forEach((npc) => {
    const dir = new Phaser.Math.Vector2(npc.target.x - npc.sprite.x, npc.target.y - npc.sprite.y);
    if (dir.length() < 10) {
      npc.target = randomPoint(scene, worldWidth, worldHeight);
      npc.sprite.play("hero-idle", true);
      return;
    }
    dir.normalize();
    npc.sprite.x += dir.x * speed * (delta / 1000);
    npc.sprite.y += dir.y * speed * (delta / 1000);
    npc.label.setPosition(npc.sprite.x, npc.sprite.y - npc.sprite.displayHeight - 4);
    npc.sprite.setDepth(npc.sprite.y);
    npc.label.setDepth(npc.sprite.depth + 5);
    npc.sprite.setFlipX(dir.x < 0);
    npc.sprite.play("hero-run", true);
  });
}

export function updateLancers(
  player: Phaser.GameObjects.Sprite,
  lancers: LancerRecord[],
  delta: number,
  allowCombat: (lancer: LancerRecord) => void
) {
  const Phaser = getPhaserInstance();
  const activeLancers = lancers.filter((lancer) => lancer.sprite.active);
  const ordered = activeLancers
    .map((entry) => ({
      lancer: entry,
      distance: Phaser.Math.Distance.Between(
        entry.sprite.x,
        entry.sprite.y,
        player.x,
        player.y
      )
    }))
    .sort((a, b) => a.distance - b.distance);
  const allowed = new Set(ordered.slice(0, MAX_ATTACKERS).map((entry) => entry.lancer));

  activeLancers.forEach((lancer) => {
    const dir = new Phaser.Math.Vector2(player.x - lancer.sprite.x, player.y - lancer.sprite.y);
    const distance = dir.length();
    const direction = distance > 0 ? dir.clone().normalize() : new Phaser.Math.Vector2();
    const isAllowed = allowed.has(lancer);

    if (isAllowed && distance > STOP_DISTANCE) {
      lancer.sprite.x += direction.x * LANCER_SPEED * (delta / 1000);
      lancer.sprite.y += direction.y * LANCER_SPEED * (delta / 1000);
      lancer.sprite.setFlipX(direction.x < 0);
      lancer.sprite.play("lancer-run", true);
    } else if (!isAllowed && distance < STOP_DISTANCE + 30 && distance > 0) {
      lancer.sprite.x -= direction.x * (LANCER_SPEED * 0.6) * (delta / 1000);
      lancer.sprite.y -= direction.y * (LANCER_SPEED * 0.6) * (delta / 1000);
      lancer.sprite.setFlipX(direction.x < 0);
      lancer.sprite.play("lancer-run", true);
    }

    const separation = new Phaser.Math.Vector2();
    activeLancers.forEach((other) => {
      if (other === lancer) return;
      const offset = new Phaser.Math.Vector2(
        lancer.sprite.x - other.sprite.x,
        lancer.sprite.y - other.sprite.y
      );
      const dist = offset.length();
      if (dist > 0 && dist < LANCER_SEPARATION_RADIUS) {
        offset.normalize().scale((LANCER_SEPARATION_RADIUS - dist) / LANCER_SEPARATION_RADIUS);
        separation.add(offset);
      }
    });
    if (separation.lengthSq() > 0) {
      separation.normalize();
      lancer.sprite.x += separation.x * LANCER_SEPARATION_FORCE * (delta / 1000);
      lancer.sprite.y += separation.y * LANCER_SEPARATION_FORCE * (delta / 1000);
    }
    lancer.sprite.setDepth(lancer.sprite.y);
    lancer.label
      .setPosition(lancer.sprite.x, lancer.sprite.y - lancer.sprite.displayHeight - 4)
      .setDepth(lancer.sprite.depth + 5);
    if (isAllowed && distance < STOP_DISTANCE) {
      allowCombat(lancer);
    }
  });
}
