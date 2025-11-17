export type AnimationConfig = {
  sheet: string;
  frameWidth: number;
  frameHeight: number;
  frames: number;
  frameRate: number;
};

export type CharacterSpriteConfig = {
  run: AnimationConfig;
  idle: AnimationConfig;
  attack?: AnimationConfig;
  tint?: number;
};

const baseSize = { frameWidth: 192, frameHeight: 192 };

export const characterSprites: Record<string, CharacterSpriteConfig> = {
  warriorblue: {
    run: {
      sheet: "/sprites/warriorblue/walk.png",
      ...baseSize,
      frames: 6,
      frameRate: 8
    },
    idle: {
      sheet: "/sprites/warriorblue/idle.png",
      ...baseSize,
      frames: 6,
      frameRate: 4
    },
    attack: {
      sheet: "/sprites/warriorblue/attack1.png",
      ...baseSize,
      frames: 4,
      frameRate: 10
    }
  }
};

const npcSprites: Record<string, CharacterSpriteConfig> = {
  lancer: {
    run: {
      sheet: "/sprites/lancer/walk.png",
      frameWidth: 320,
      frameHeight: 320,
      frames: 6,
      frameRate: 8
    },
    idle: {
      sheet: "/sprites/lancer/walk.png",
      frameWidth: 320,
      frameHeight: 320,
      frames: 6,
      frameRate: 8
    },
    attack: {
      sheet: "/sprites/lancer/attack.png",
      frameWidth: 320,
      frameHeight: 320,
      frames: 3,
      frameRate: 8
    }
  }
};

export function getCharacterSpriteConfig(sprite: string): CharacterSpriteConfig {
  return characterSprites[sprite] ?? characterSprites.warriorblue;
}

export function getNpcSpriteConfig(sprite: string): CharacterSpriteConfig {
  return npcSprites[sprite] ?? npcSprites.lancer;
}
