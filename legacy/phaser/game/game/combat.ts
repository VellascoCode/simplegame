import type * as PhaserType from "phaser";
import type { LancerRecord } from "./types";
import {
  HERO_DAMAGE_MAX,
  HERO_DAMAGE_MIN,
  LANCER_COOLDOWN,
  LANCER_DAMAGE_MAX,
  LANCER_DAMAGE_MIN
} from "./constants";
import { showFloatingText } from "./utils";
import { getPhaserInstance } from "./phaserInstance";

type CombatDeps = {
  scene: PhaserType.Scene;
  player: PhaserType.GameObjects.Sprite;
  heroName: string;
  emitCombatLog?: (event: { message: string; tone: "damage" | "xp" }) => void;
  playTone: (frequency: number) => void;
  triggerHeroAttack: () => void;
  triggerLancerAttack: (lancer: LancerRecord) => void;
  onLancerDeath: (lancer: LancerRecord) => void;
};

export function handleCombat(lancer: LancerRecord, deps: CombatDeps) {
  const phaser = getPhaserInstance();
  const now = deps.scene.time.now;
  if (now - lancer.lastAttack < LANCER_COOLDOWN) return;
  lancer.lastAttack = now;
  deps.triggerHeroAttack();
  deps.triggerLancerAttack(lancer);
  const heroDamage = phaser.Math.Between(HERO_DAMAGE_MIN, HERO_DAMAGE_MAX);
  const lancerDamage = phaser.Math.Between(LANCER_DAMAGE_MIN, LANCER_DAMAGE_MAX);
  showFloatingText(
    deps.scene,
    lancer.sprite.x,
    lancer.sprite.y - lancer.sprite.displayHeight,
    `-${heroDamage} HP`,
    "#fff6c4"
  );
  deps.emitCombatLog?.({
    message: `${lancer.label.text} perdeu ${heroDamage} HP`,
    tone: "damage"
  });
  showFloatingText(
    deps.scene,
    deps.player.x,
    deps.player.y - deps.player.displayHeight - 6,
    `-${lancerDamage} HP`,
    "#ff7a7a"
  );
  deps.emitCombatLog?.({
    message: `${deps.heroName} perdeu ${lancerDamage} HP`,
    tone: "damage"
  });
  deps.playTone(420);
  lancer.hp -= heroDamage;
  if (lancer.hp <= 0) {
    deps.onLancerDeath(lancer);
  }
}
