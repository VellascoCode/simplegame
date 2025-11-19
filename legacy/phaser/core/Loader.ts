import { Assets } from "pixi.js";

const BASE_BUNDLE: Record<string, string> = {
  "/sprites/warriorblue/idle.png": "/sprites/warriorblue/idle.png",
  "/sprites/warriorblue/walk.png": "/sprites/warriorblue/walk.png",
  "/sprites/pinguin1/walk.png": "/sprites/pinguin1/walk.png",
  "/tilesets/tile1.png": "/tilesets/tile1.png",
  "/tilesets/tile2.png": "/tilesets/tile2.png",
  "/tilesets/tile101.png": "/tilesets/tile101.png",
  ...createFrameEntries("/tester/fire/", 8),
  ...createFrameEntries("/tester/water/", 12)
};

function createFrameEntries(basePath: string, count: number) {
  const entries: Record<string, string> = {};
  for (let i = 1; i <= count; i++) {
    const path = `${basePath}${i}.png`;
    entries[path] = path;
  }
  return entries;
}

let bundleRegistered = false;

export class Loader {
  private static ensureBundle(): void {
    if (bundleRegistered) return;
    Assets.addBundle("base", BASE_BUNDLE);
    bundleRegistered = true;
  }

  static async loadBaseAssets(): Promise<void> {
    this.ensureBundle();
    try {
      await Assets.loadBundle("base");
    } catch (err) {
      console.warn("Base asset bundle failed to load", err);
    }
  }
}
