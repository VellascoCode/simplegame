import type * as PhaserType from "phaser";

let phaserInstance: typeof PhaserType | null = null;

export function setPhaserInstance(instance: typeof PhaserType) {
  phaserInstance = instance;
}

export function getPhaserInstance() {
  if (!phaserInstance) {
    throw new Error("Phaser instance not initialized");
  }
  return phaserInstance;
}
