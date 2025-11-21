import type * as Phaser from "phaser";

import type { MonsterType } from "./constants";

export type NPCRecord = {
  sprite: Phaser.GameObjects.Sprite;
  label: Phaser.GameObjects.Text;
  target: Phaser.Math.Vector2;
  name: string;
};

export type CollisionZone = Phaser.Geom.Rectangle;

export type LancerRecord = {
  sprite: Phaser.GameObjects.Sprite;
  label: Phaser.GameObjects.Text;
  hp: number;
  lastAttack: number;
  type: MonsterType;
};

export type CombatEvent = {
  message: string;
  tone: "damage" | "xp";
};
