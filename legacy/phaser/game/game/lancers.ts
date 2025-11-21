import type * as PhaserType from "phaser";

import type { LancerRecord } from "./types";

import { LANCER_HP, LANCER_SCALE, MonsterType } from "./constants";
import { grantRewards } from "./drops";
import { randomPoint, showFloatingText } from "./utils";

export function createLancer(
  scene: PhaserType.Scene,
  index: number,
  tints: number[],
  worldWidth: number,
  worldHeight: number,
  runSheet: string,
  runAnim: string
): LancerRecord {
  const spawnPoint = randomPoint(scene, worldWidth, worldHeight);
  const sprite = scene.add.sprite(spawnPoint.x, spawnPoint.y, runSheet, 0);
  sprite.setOrigin(0.5, 1);
  sprite.setScale(LANCER_SCALE);
  sprite.setTint(tints[index % tints.length]);
  sprite.play(runAnim);
  sprite.setDepth(sprite.y);
  const label = scene.add
    .text(sprite.x, sprite.y - sprite.displayHeight - 4, "Lanceiro", {
      color: "#fdf5d0",
      fontSize: "14px",
      fontStyle: "bold"
    })
    .setOrigin(0.5, 1)
    .setDepth(sprite.depth + 5);
  return {
    sprite,
    label,
    hp: LANCER_HP,
    lastAttack: 0,
    type: MonsterType.Lancer
  };
}

export type LancerDeathCallbacks = {
  emitXp: () => void;
  playTone: (frequency: number) => void;
  awardGold: (amount: number) => void;
  recordBestiary: (monsterType: MonsterType) => void;
  respawn: (delay: number) => void;
  rewardItems: () => void;
  onRemove: (lancer: LancerRecord) => void;
};

export function handleLancerDeath(
  scene: PhaserType.Scene,
  player: PhaserType.GameObjects.Sprite,
  lancer: LancerRecord,
  callbacks: LancerDeathCallbacks
) {
  showFloatingText(scene, player.x, player.y - player.displayHeight - 30, "+2 XP", "#94f1a4");
  callbacks.emitXp();
  callbacks.playTone(620);
  grantRewards(
    scene,
    player,
    { awardGold: callbacks.awardGold, recordBestiary: callbacks.recordBestiary },
    lancer.type
  );
  callbacks.onRemove(lancer);
  callbacks.rewardItems();
  scene.tweens.add({
    targets: [lancer.sprite, lancer.label],
    alpha: 0,
    duration: 250,
    onComplete: () => {
      lancer.sprite.destroy();
      lancer.label.destroy();
      callbacks.respawn(600);
    }
  });
}
