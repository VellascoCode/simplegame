import type { NPCRecord } from "./types";
import { getPhaserInstance } from "./phaserInstance";

const NPC_MESSAGES = [
  "Patrulha em andamento.",
  "A cidade precisa de você.",
  "Alguma troca?",
  "Boas vindas!"
] as const;

export function scheduleNpcSpeech(scene: Phaser.Scene, npc: NPCRecord, messages = NPC_MESSAGES) {
  const Phaser = getPhaserInstance();
  scene.time.addEvent({
    delay: Phaser.Math.Between(4000, 9000),
    callback: () => {
      const message = messages[Phaser.Math.Between(0, messages.length - 1)];
      const text = scene.add
        .text(npc.sprite.x, npc.sprite.y - npc.sprite.displayHeight - 8, message, {
          color: "#fff3d4",
          fontSize: "13px",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: { x: 8, y: 4 }
        })
        .setOrigin(0.5, 1)
        .setDepth(npc.sprite.depth + 10)
        .setAlpha(0);
      scene.tweens.add({
        targets: text,
        alpha: 1,
        duration: 150,
        yoyo: true,
        hold: 2000,
        completeDelay: 300,
        onComplete: () => text.destroy()
      });
      scheduleNpcSpeech(scene, npc, messages);
    }
  });
}
