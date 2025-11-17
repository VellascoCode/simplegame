import type Phaser from "phaser";
import type { NPCRecord, CollisionZone } from "./types";
import { PLAYER_SPEED } from "./constants";
import { getPhaserInstance } from "./phaserInstance";

type MovementArgs = {
  player: Phaser.GameObjects.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  virtualDirection: { dx: number; dy: number };
  collisionZones: CollisionZone[];
  npcs: NPCRecord[];
  worldWidth: number;
  worldHeight: number;
  heroAttacking: boolean;
  delta: number;
  syncPosition: (x: number, y: number, force?: boolean) => void;
};

export function handlePlayerMovement({
  player,
  cursors,
  virtualDirection,
  collisionZones,
  npcs,
  worldWidth,
  worldHeight,
  heroAttacking,
  delta,
  syncPosition
}: MovementArgs) {
  const Phaser = getPhaserInstance();
  let dx = 0;
  let dy = 0;

  if (cursors.left?.isDown) dx -= 1;
  if (cursors.right?.isDown) dx += 1;
  if (cursors.up?.isDown) dy -= 1;
  if (cursors.down?.isDown) dy += 1;

  dx += virtualDirection.dx;
  dy += virtualDirection.dy;

  const length = Math.hypot(dx, dy) || 1;
  dx /= length;
  dy /= length;

  const proposedX = Phaser.Math.Clamp(
    player.x + dx * PLAYER_SPEED * (delta / 1000),
    player.displayWidth / 2,
    worldWidth - player.displayWidth / 2
  );
  const proposedY = Phaser.Math.Clamp(
    player.y + dy * PLAYER_SPEED * (delta / 1000),
    player.displayHeight / 2,
    worldHeight
  );

  const collidesWithNPC = npcs.some(
    (npc) => Phaser.Math.Distance.Between(npc.sprite.x, npc.sprite.y, proposedX, proposedY) < 40
  );
  const playerFeet = new Phaser.Geom.Circle(proposedX, proposedY - 8, 18);
  const collidesWithCollision = collisionZones.some((zone) =>
    Phaser.Geom.Intersects.CircleToRectangle(playerFeet, zone)
  );

  if (!collidesWithNPC && !collidesWithCollision) {
    player.setPosition(proposedX, proposedY);
    syncPosition(proposedX, proposedY);
  }

  if (heroAttacking) return;
  if (dx !== 0 || dy !== 0) {
    player.setFlipX(dx < 0);
    player.play("hero-run", true);
  } else {
    player.play("hero-idle", true);
  }
}
