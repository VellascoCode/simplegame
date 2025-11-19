import { AnimatedSprite, Texture } from "pixi.js";

const FIRE_FRAME_NAMES = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"];

function buildTextures(prefix: string, frames: string[]): Texture[] {
  return frames.map((name) => Texture.from(`${prefix}${name}`));
}

export function createPlayerOrb(tileSize: number): AnimatedSprite {
  const textures = buildTextures("/tester/fire/", FIRE_FRAME_NAMES);
  const orb = new AnimatedSprite(textures);
  orb.anchor.set(0.5);
  orb.width = tileSize;
  orb.height = tileSize;
  orb.animationSpeed = 0.15;
  orb.loop = true;
  orb.play();
  orb.eventMode = "none";
  return orb;
}
