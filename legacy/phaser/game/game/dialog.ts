import type * as PhaserType from "phaser";

import { getPhaserInstance } from "./phaserInstance";

const NPC_MESSAGES = ["Bem-vindo!"];

export function scheduleNpcSpeech(
  scene: PhaserType.Scene,
  npc: { sprite: PhaserType.GameObjects.Sprite; label: PhaserType.GameObjects.Text },
  messages = NPC_MESSAGES
) {
  const phaser = getPhaserInstance();
  scene.time.addEvent({
    delay: phaser.Math.Between(4000, 9000),
    loop: true,
    callback: () => {
      const message = messages[phaser.Math.Between(0, messages.length - 1)];
      npc.label.text = message;
    }
  });
}
