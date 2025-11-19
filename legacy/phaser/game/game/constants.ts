export const MAP_TILE_SIZE = 64;
export const PINCH_SCALE = 0.8;
export const PLAYER_SPEED = 220;
export const HERO_SCALE = 1;
export const LANCER_SCALE = 1;
export const LANCER_COUNT = 6;
export const LANCER_HP = 10;
export const LANCER_SPEED = 80;
export const LANCER_COOLDOWN = 1000;
export const ATTACK_DISTANCE = 110;
export const STOP_DISTANCE = 90;
export const HERO_DAMAGE_MIN = 1;
export const HERO_DAMAGE_MAX = 3;
export const LANCER_DAMAGE_MIN = 1;
export const LANCER_DAMAGE_MAX = 4;
export const MAX_ATTACKERS = 8;
export const LANCER_SEPARATION_RADIUS = 70;
export const LANCER_SEPARATION_FORCE = 80;
export const COVER_DEPTH_OFFSET = 220;
export const GOLD_REWARD_MIN = 0;
export const GOLD_REWARD_MAX = 3;
export const LANCER_XP_REWARD = 2;
export const SMALL_CRYSTAL_DROP_CHANCE = 10; // porcentagem
export const MEDIUM_CRYSTAL_DROP_CHANCE = 1; // porcentagem
export const GROUND_DROP_TTL = 2 * 60 * 60 * 1000;

export enum NpcState {
  Idle = 0,
  Wander = 1,
  Chase = 2,
  Attack = 3,
  Dead = 4
}

export enum MonsterType {
  Lancer = 0
}
