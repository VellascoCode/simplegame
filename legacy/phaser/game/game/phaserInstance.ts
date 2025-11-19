let phaserInstance: typeof import("phaser") | null = null;

export function setPhaserInstance(instance: typeof import("phaser")) {
  phaserInstance = instance;
}

export function getPhaserInstance() {
  if (!phaserInstance) {
    throw new Error("Phaser instance not initialized");
  }
  return phaserInstance;
}
