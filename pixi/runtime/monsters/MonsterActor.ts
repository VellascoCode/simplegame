import { AnimatedSprite, Container, Graphics, Text, Texture } from "pixi.js";
import type { MonsterDefinition } from "@/monsters/data";

type MonsterOptions = {
  definition: MonsterDefinition;
  frames: Texture[];
  tileSize: number;
  onDeath: () => void;
  level: number;
};

const randomBetween = (min: number, max: number): number => {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  return lower + Math.floor(Math.random() * (upper - lower + 1));
};

const RARITY_COLORS: Record<string, number> = {
  C: 0xa0aec0,
  B: 0x5bc236,
  A: 0x3fa7d6,
  S: 0xfbbf24,
  SS: 0xff8f3f,
  SSS: 0xb794f4
};

const SKULL_COLORS = {
  green: 0x6ee7b7,
  white: 0xffffff,
  yellow: 0xfacc15,
  orange: 0xf97316,
  red: 0xef4444,
  purple: 0xc084fc
};

function resolveThreat(diff: number) {
  if (diff < 0) return { color: SKULL_COLORS.green, label: "Trivial" };
  if (diff === 0) return { color: SKULL_COLORS.white, label: "Equil." };
  if (diff <= 5) return { color: SKULL_COLORS.yellow, label: "Moderado" };
  if (diff <= 10) return { color: SKULL_COLORS.orange, label: "Perigoso" };
  if (diff <= 20) return { color: SKULL_COLORS.red, label: "Letal" };
  return { color: SKULL_COLORS.purple, label: "Caótico" };
}

export class MonsterActor {
  readonly view: Container;
  readonly sprite: AnimatedSprite;
  readonly definition: MonsterDefinition;
  private hp: number;
  private readonly maxHp: number;
  private readonly onDeath: () => void;
  private readonly baseScaleX: number;
  private readonly baseScaleY: number;
  private messageTimer = 0;
  private nextMessage = 0;
  private readonly messageLabel: Text;
  private dead = false;
  private readonly attackInterval: number;
  private readonly attackDamage: { min: number; max: number };
  private readonly playerAttackInterval: number;
  private readonly playerDamage: { min: number; max: number };
  private readonly attackRange: number;
  private attackTimer = 0;
  private playerAttackTimer = 0;
  private lastDistance = Infinity;
  private readonly lastPosition = { x: 0, y: 0 };
  private readonly homePosition = { x: 0, y: 0 };
  private readonly homeTile = { x: 0, y: 0 };
  private readonly leashRadius: number;
  private readonly tileSize: number;
  private tileX: number;
  private tileY: number;
  private readonly moveDuration: number;
  private moveElapsed = 0;
  private moving = false;
  private nextTile: { x: number; y: number } | null = null;
  private readonly startPos = { x: 0, y: 0 };
  private readonly endPos = { x: 0, y: 0 };
  private battleTile: { x: number; y: number } | null = null;
  private readonly level: number;
  private readonly rarity: string;
  private readonly tagContainer: Container;
  private readonly infoBackground: Graphics;
  private readonly rarityLabel: Text;
  private readonly leftDivider: Text;
  private readonly dangerLabel: Text;
  private readonly rightDivider: Text;
  private readonly hpLabel: Text;
  private readonly nameText: Text;
  private withinBattleRange = false;
  private dangerColor = 0xffffff;

  constructor({ definition, frames, tileSize, onDeath, level }: MonsterOptions) {
    this.definition = definition;
    this.maxHp = definition.hp;
    this.hp = this.maxHp;
    this.onDeath = onDeath;
    this.tileSize = tileSize;
    this.level = level;
    this.rarity = definition.rarity;
    this.view = new Container();
    this.sprite = new AnimatedSprite(frames.length ? frames : [Texture.WHITE]);
    const anchor = definition.anchor ?? { x: 0.5, y: 1 };
    this.sprite.anchor.set(anchor.x, anchor.y);
    const baseWidth = frames[0]?.frame?.width ?? tileSize;
    const baseHeight = frames[0]?.frame?.height ?? tileSize;
    const targetWidth = definition.size?.width ?? tileSize;
    const targetHeight = definition.size?.height ?? tileSize;
    this.baseScaleX = targetWidth / Math.max(1, baseWidth);
    this.baseScaleY = targetHeight / Math.max(1, baseHeight);
    this.sprite.scale.set(this.baseScaleX, this.baseScaleY);
    if (typeof definition.tint === "number") {
      this.sprite.tint = definition.tint;
    }
    this.sprite.animationSpeed = 0.12;
    this.sprite.loop = true;
    this.sprite.play();
    this.sprite.eventMode = "none";
    const spawn = definition.spawnTile ?? { x: 2, y: 2 };
    this.tileX = spawn.x;
    this.tileY = spawn.y;
    this.homeTile.x = spawn.x;
    this.homeTile.y = spawn.y;
    const spawnX = spawn.x * tileSize + tileSize / 2;
    const spawnY = spawn.y * tileSize + tileSize;
    this.view.position.set(spawnX, spawnY);
    this.lastPosition.x = spawnX;
    this.lastPosition.y = spawnY;
    this.homePosition.x = spawnX;
    this.homePosition.y = spawnY;
    this.view.addChild(this.sprite);

    this.messageLabel = new Text({
      text: "",
      style: {
        fill: 0xffffff,
        fontSize: 12,
        fontWeight: "700",
        stroke: { color: 0x000000, width: 3 }
      }
    });
    this.messageLabel.anchor.set(0.5, 1.4);
    this.messageLabel.visible = false;
    this.view.addChild(this.messageLabel);
    this.scheduleMessage();

    this.tagContainer = new Container();
    this.tagContainer.position.set(0, -tileSize * 1.35);
    this.tagContainer.alpha = 0.95;
    this.infoBackground = new Graphics();
    this.tagContainer.addChild(this.infoBackground);
    this.rarityLabel = new Text({ text: this.rarity, style: { fill: 0xfcd34d, fontSize: 12, fontWeight: "700", stroke: { color: 0x000000, width: 3 } } });
    this.rarityLabel.anchor.set(0, 1);
    this.tagContainer.addChild(this.rarityLabel);
    this.leftDivider = new Text({
      text: "|",
      style: { fill: 0xffffff, fontSize: 12, fontWeight: "600", stroke: { color: 0x000000, width: 3 } }
    });
    this.leftDivider.anchor.set(0.5, 1);
    this.tagContainer.addChild(this.leftDivider);
    this.dangerLabel = new Text({
      text: "",
      style: { fill: 0xffffff, fontSize: 12, fontWeight: "600", stroke: { color: 0x000000, width: 3 } }
    });
    this.dangerLabel.anchor.set(0.5, 1);
    this.tagContainer.addChild(this.dangerLabel);
    this.rightDivider = new Text({
      text: "|",
      style: { fill: 0xffffff, fontSize: 12, fontWeight: "600", stroke: { color: 0x000000, width: 3 } }
    });
    this.rightDivider.anchor.set(0.5, 1);
    this.tagContainer.addChild(this.rightDivider);
    this.hpLabel = new Text({
      text: "",
      style: { fill: 0xffc5c5, fontSize: 12, fontWeight: "600", stroke: { color: 0x000000, width: 3 } }
    });
    this.hpLabel.anchor.set(1, 1);
    this.tagContainer.addChild(this.hpLabel);
    this.nameText = new Text({
      text: this.definition.name,
      style: { fill: 0xff4d4d, fontSize: 14, fontWeight: "700", stroke: { color: 0x000000, width: 4 } }
    });
    this.nameText.anchor.set(0.5, 0);
    this.nameText.position.set(0, 2);
    this.tagContainer.addChild(this.nameText);
    this.updateRarityLabel();
    this.updateHpLabel();
    this.updateThreatDisplay(level);
    this.view.addChild(this.tagContainer);

    this.attackInterval = Math.max(0.2, definition.attackInterval ?? 1);
    this.attackDamage = {
      min: definition.attackDamage?.min ?? 1,
      max: definition.attackDamage?.max ?? 2
    };
    this.playerAttackInterval = Math.max(0.2, definition.playerAttackInterval ?? 1);
    this.playerDamage = {
      min: definition.playerDamage?.min ?? 1,
      max: definition.playerDamage?.max ?? 3
    };
    this.attackRange = tileSize * (definition.attackRange ?? 0.85);
    const leashTiles = typeof definition.leashRadius === "number" ? definition.leashRadius : 0;
    this.leashRadius = leashTiles > 0 ? leashTiles * tileSize : tileSize * 5;
    const speed = Math.max(30, definition.speed ?? 80);
    this.moveDuration = Math.max(0.12, tileSize / speed);
  }

  isDead(): boolean {
    return this.dead;
  }

  get worldPosition(): { x: number; y: number } {
    if (this.view?.position) {
      this.lastPosition.x = this.view.position.x;
      this.lastPosition.y = this.view.position.y;
    }
    return { x: this.lastPosition.x, y: this.lastPosition.y };
  }

  get distanceToPlayer(): number {
    return this.lastDistance;
  }

  update(deltaSeconds: number, playerPosition: { x: number; y: number }): void {
    if (this.dead) return;
    this.updateMovement(deltaSeconds);
    const playerTile = this.worldToTile(playerPosition.x, playerPosition.y);
    const playerHomeDistance = Math.hypot(playerTile.x - this.homeTile.x, playerTile.y - this.homeTile.y) * this.tileSize;
    const withinTerritory = this.leashRadius <= 0 || playerHomeDistance <= this.leashRadius;
    let targetTile: { x: number; y: number } | null = null;
    if (!withinTerritory) {
      this.attackTimer = 0;
      this.playerAttackTimer = 0;
      this.battleTile = null;
      targetTile = this.homeTile;
      this.lastDistance = Infinity;
      this.withinBattleRange = false;
    } else {
      const dx = playerPosition.x - this.view.position.x;
      const dy = playerPosition.y - this.view.position.y;
      const tileDiffX = playerTile.x - this.tileX;
      const tileDiffY = playerTile.y - this.tileY;
      const isAdjacent = Math.abs(tileDiffX) <= 1 && Math.abs(tileDiffY) <= 1;
      this.withinBattleRange = isAdjacent;
      if (isAdjacent) {
        this.lastDistance = this.tileSize * Math.max(Math.abs(tileDiffX), Math.abs(tileDiffY));
      } else {
        this.lastDistance = Math.max(0.001, Math.hypot(dx, dy));
      }
      if (this.battleTile) {
        targetTile = this.battleTile;
      } else if (!isAdjacent) {
        targetTile = playerTile;
      }
      this.sprite.scale.x = (dx >= 0 ? 1 : -1) * this.baseScaleX;
      this.sprite.scale.y = this.baseScaleY;
    }
    if (targetTile) {
      this.moveToward(targetTile);
    }

    this.messageTimer += deltaSeconds;
    if (this.messageTimer >= this.nextMessage) {
      this.messageTimer = 0;
      this.scheduleMessage();
      const line = this.randomQuote();
      if (line) {
        this.messageLabel.text = line;
        this.messageLabel.visible = true;
        setTimeout(() => {
          this.messageLabel.visible = false;
        }, 1000);
      }
    }
  }

  tryAttackPlayer(deltaSeconds: number): number | null {
    if (this.dead) return null;
    if (!this.withinBattleRange) {
      this.attackTimer = 0;
      return null;
    }
    this.attackTimer += deltaSeconds;
    if (this.attackTimer < this.attackInterval) return null;
    this.attackTimer = 0;
    return randomBetween(this.attackDamage.min, this.attackDamage.max);
  }

  tryReceivePlayerAttack(deltaSeconds: number): { damage: number; killed: boolean } | null {
    if (this.dead) return null;
    if (!this.withinBattleRange) {
      this.playerAttackTimer = 0;
      return null;
    }
    this.playerAttackTimer += deltaSeconds;
    if (this.playerAttackTimer < this.playerAttackInterval) return null;
    this.playerAttackTimer = 0;
    const damage = randomBetween(this.playerDamage.min, this.playerDamage.max);
    const killed = this.takeHit(damage);
    return { damage, killed };
  }

  setBattleTarget(tile: { x: number; y: number } | null): void {
    this.battleTile = tile ? { ...tile } : null;
  }

  getTilePosition(): { x: number; y: number } {
    return { x: this.tileX, y: this.tileY };
  }

  private randomQuote(): string | null {
    const quotes = this.definition.quotes;
    if (!quotes || quotes.length === 0) return null;
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  private scheduleMessage(): void {
    const interval = this.definition.messageInterval ?? { min: 3, max: 5 };
    this.nextMessage = interval.min + Math.random() * (interval.max - interval.min);
  }

  private takeHit(amount: number): boolean {
    this.hp = Math.max(0, this.hp - amount);
    this.updateHpLabel();
    if (this.hp === 0 && !this.dead) {
      this.dead = true;
      this.onDeath();
      this.view.parent?.removeChild(this.view);
      this.view.destroy();
      return true;
    }
    return this.dead;
  }

  private updateMovement(deltaSeconds: number): void {
    if (!this.moving || !this.nextTile) {
      this.lastPosition.x = this.view.position.x;
      this.lastPosition.y = this.view.position.y;
      return;
    }
    this.moveElapsed += deltaSeconds;
    const t = Math.min(1, this.moveElapsed / this.moveDuration);
    const lerp = (a: number, b: number) => a + (b - a) * t;
    this.view.position.set(lerp(this.startPos.x, this.endPos.x), lerp(this.startPos.y, this.endPos.y));
    if (t >= 1) {
      this.moving = false;
      this.tileX = this.nextTile.x;
      this.tileY = this.nextTile.y;
      this.nextTile = null;
      this.lastPosition.x = this.view.position.x;
      this.lastPosition.y = this.view.position.y;
    }
  }

  private moveToward(targetTile: { x: number; y: number }): void {
    if (this.moving) return;
    const deltaX = targetTile.x - this.tileX;
    const deltaY = targetTile.y - this.tileY;
    if (deltaX === 0 && deltaY === 0) return;
    const stepX = Math.abs(deltaX) >= Math.abs(deltaY) ? Math.sign(deltaX) : 0;
    const stepY = stepX === 0 ? Math.sign(deltaY) : 0;
    this.nextTile = { x: this.tileX + stepX, y: this.tileY + stepY };
    this.startPos.x = this.view.position.x;
    this.startPos.y = this.view.position.y;
    const world = this.tileToWorld(this.nextTile.x, this.nextTile.y);
    this.endPos.x = world.x;
    this.endPos.y = world.y;
    this.moveElapsed = 0;
    this.moving = true;
  }

  private worldToTile(worldX: number, worldY: number): { x: number; y: number } {
    const x = Math.round((worldX - this.tileSize / 2) / this.tileSize);
    const y = Math.round((worldY - this.tileSize) / this.tileSize);
    return { x, y };
  }

  private tileToWorld(tileX: number, tileY: number): { x: number; y: number } {
    return { x: tileX * this.tileSize + this.tileSize / 2, y: tileY * this.tileSize + this.tileSize };
  }

  private updateRarityLabel(): void {
    const color = RARITY_COLORS[this.rarity] ?? 0xfcd34d;
    this.rarityLabel.text = this.rarity;
    this.rarityLabel.style.fill = color;
    this.updateInfoBackground();
  }

  updateThreatDisplay(playerLevel: number): void {
    const { color, label } = resolveThreat(this.level - playerLevel);
    this.dangerColor = color;
    this.dangerLabel.text = label;
    this.dangerLabel.style.fill = color;
    this.updateInfoBackground();
  }

  getLevel(): number {
    return this.level;
  }

  getSnapshot(playerLevel: number) {
    const { color, label } = resolveThreat(this.level - playerLevel);
    return {
      id: this.definition.id,
      name: this.definition.name,
      rarity: this.rarity,
      level: this.level,
      hpText: `${this.hp}/${this.maxHp}`,
      danger: label,
      dangerColor: color
    };
  }


  private updateHpLabel(): void {
    this.hpLabel.text = `${this.hp}/${this.maxHp}`;
    this.updateInfoBackground();
  }

  private updateInfoBackground(): void {
    const width = Math.max(220, this.nameText.width + 40);
    const height = 52;
    this.infoBackground.clear();
    this.infoBackground
      .roundRect(-width / 2, -40, width, height, 16)
      .fill({ color: 0x05070c, alpha: 0.9 })
      .stroke({ color: this.dangerColor, alpha: 0.5, width: 2 });
    const columnWidth = width / 3;
    const topRowY = -10;
    const leftX = -columnWidth;
    const centerX = 0;
    const rightX = columnWidth;
    this.rarityLabel.anchor.set(0.5, 1);
    this.rarityLabel.position.set(leftX, topRowY);
    this.leftDivider.anchor.set(0.5, 1);
    this.leftDivider.position.set((leftX + centerX) / 2, topRowY);
    this.dangerLabel.anchor.set(0.5, 1);
    this.dangerLabel.position.set(centerX, topRowY);
    this.rightDivider.anchor.set(0.5, 1);
    this.rightDivider.position.set((centerX + rightX) / 2, topRowY);
    this.hpLabel.anchor.set(0.5, 1);
    this.hpLabel.position.set(rightX, topRowY);
    this.nameText.position.set(0, 10);
  }
}
