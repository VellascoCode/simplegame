import type * as PhaserType from "phaser";

import { GOLD_REWARD_MAX, GOLD_REWARD_MIN } from "./constants";
import { getPhaserInstance } from "./phaserInstance";

export type DropCallbacks = {
  awardGold: (amount: number) => void;
  recordBestiary: (monsterType: number) => void;
};

export function grantRewards(
  scene: PhaserType.Scene,
  player: PhaserType.GameObjects.Sprite,
  callbacks: DropCallbacks,
  monsterType: number
) {
  const phaser = getPhaserInstance();
  const goldReward = phaser.Math.Between(GOLD_REWARD_MIN, GOLD_REWARD_MAX);
  if (goldReward > 0) {
    scene.add
      .text(player.x, player.y - player.displayHeight - 50, `+${goldReward} ouro`, {
        color: "#ffe78a",
        fontSize: "16px",
        fontStyle: "bold"
      })
      .setOrigin(0.5, 1)
      .setDepth(2000);
    callbacks.awardGold(goldReward);
  }
  callbacks.recordBestiary(monsterType);
}
