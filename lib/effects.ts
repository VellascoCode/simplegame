export type EffectConfig = {
  id: string;
  sheet: string;
  frames: number;
  frameWidth?: number;
  frameHeight?: number;
  animationSpeed?: number;
  frameSpacing?: number;
};

export const teleportEffect: EffectConfig = {
  id: "teleport",
  sheet: "/effect/teleport.png",
  frames: 11,
  frameWidth: 128,
  frameHeight: 128,
  frameSpacing: 9,
  animationSpeed: 0.32
};

export const levelUpEffect: EffectConfig = {
  id: "levelup",
  sheet: "/effect/lvlup.png",
  frames: 8,
  frameWidth: 128,
  frameHeight: 116,
  frameSpacing: 0,
  animationSpeed: 0.07
};
