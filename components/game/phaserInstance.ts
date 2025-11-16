let phaserRef: typeof import("phaser") | null = null;

export function setPhaserInstance(instance: typeof import("phaser")) {
  phaserRef = instance;
}

export function getPhaserInstance() {
  if (!phaserRef) {
    throw new Error("Phaser instance not initialized");
  }
  return phaserRef;
}
