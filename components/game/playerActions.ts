import type Phaser from "phaser";
import { LANCER_COOLDOWN } from "./constants";
import type { LancerRecord } from "./types";
import { showFloatingText } from "./utils";

export function triggerHeroAttack(
  scene: Phaser.Scene,
  player: Phaser.GameObjects.Sprite,
  opts: { isAttacking: boolean; setAttacking: (state: boolean) => void },
  duration: number
) {
  if (!duration || opts.isAttacking) return;
  opts.setAttacking(true);
  player.play("hero-attack", true);
  scene.time.delayedCall(duration, () => {
    opts.setAttacking(false);
  });
}

export function triggerLancerAttack(scene: Phaser.Scene, lancer: LancerRecord) {
  lancer.sprite.play("lancer-attack", true);
  const duration = LANCER_COOLDOWN / 2;
  scene.time.delayedCall(duration, () => {
    if (lancer.sprite.active) {
      lancer.sprite.play("lancer-run", true);
    }
  });
}

export function applyDamageToPlayer(
  scene: Phaser.Scene,
  player: Phaser.GameObjects.Sprite,
  amount: number,
  source: string,
  emitCombatLog?: (event: { message: string; tone: "damage" | "xp" }) => void,
  playTone?: (frequency: number) => void
) {
  showFloatingText(scene, player.x, player.y - player.displayHeight - 6, `-${amount} HP`, "#ff8e8e");
  emitCombatLog?.({
    message: `${source} atingiu o herói em ${amount} HP`,
    tone: "damage"
  });
  playTone?.(360);
}
