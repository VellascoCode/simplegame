import type * as PhaserType from "phaser";

import { COVER_DEPTH_OFFSET, MAP_TILE_SIZE } from "./constants";
import { getPhaserInstance } from "./phaserInstance";

export function worldToTile(x: number, y: number) {
  return {
    x: Math.max(0, Math.floor(x / MAP_TILE_SIZE)),
    y: Math.max(0, Math.floor(y / MAP_TILE_SIZE))
  };
}

export function clampPlayerDepth(
  player: PhaserType.GameObjects.Sprite,
  coverMatrix: number[][],
  label?: PhaserType.GameObjects.Text
) {
  const tileX = Math.max(0, Math.floor(player.x / MAP_TILE_SIZE));
  const tileY = Math.max(0, Math.floor(player.y / MAP_TILE_SIZE));
  const coverValue = coverMatrix[tileY]?.[tileX] ?? 0;
  const depthOffset = coverValue > 0 ? -COVER_DEPTH_OFFSET : COVER_DEPTH_OFFSET;
  player.setDepth(player.y + depthOffset);
  label?.setPosition(player.x, player.y - player.displayHeight - 6).setDepth(player.depth + 5);
}

export function randomPoint(scene: PhaserType.Scene, width: number, height: number) {
  const phaser = getPhaserInstance();
  return new phaser.Math.Vector2(
    phaser.Math.Between(80, width - 80),
    phaser.Math.Between(80, height - 80)
  );
}

export function showFloatingText(
  scene: PhaserType.Scene,
  x: number,
  y: number,
  text: string,
  color: string
) {
  const floating = scene.add
    .text(x, y, text, {
      color,
      fontSize: "16px",
      fontStyle: "bold"
    })
    .setOrigin(0.5, 1)
    .setDepth(2000)
    .setAlpha(0.95);
  scene.tweens.add({
    targets: floating,
    y: y - 30,
    alpha: 0,
    duration: 600,
    onComplete: () => floating.destroy()
  });
}
