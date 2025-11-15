"use client";

import type * as PhaserType from "phaser";
import { useEffect, useRef, useState } from "react";
import type { CityMapData } from "@/lib/mapTypes";
import { getCharacterSpriteConfig, getNpcSpriteConfig } from "@/lib/characterSprites";
import type { TileManifest } from "@/lib/tileManifest";

const MAP_TILE_SIZE = 64;
const PINCH_SCALE = 0.8;
const PLAYER_SPEED = 220;
const HERO_SCALE = 1;
const LANCER_SCALE = 1;
const HERO_CONFIG = getCharacterSpriteConfig("warriorblue");
const HERO_RUN_KEY = "hero-run";
const HERO_IDLE_KEY = "hero-idle";
const HERO_ATTACK_KEY = "hero-attack";

const HERO_RUN_SHEET_KEY = "hero-run-sheet";
const HERO_IDLE_SHEET_KEY = "hero-idle-sheet";
const HERO_ATTACK_SHEET_KEY = "hero-attack-sheet";

const LANCER_CONFIG = getNpcSpriteConfig("lancer");
const LANCER_RUN_KEY = "lancer-run";
const LANCER_ATTACK_KEY = "lancer-attack";
const LANCER_SHEET_RUN = "lancer-run-sheet";
const LANCER_SHEET_ATTACK = "lancer-attack-sheet";
const LANCER_COUNT = 6;
const LANCER_HP = 10;
const LANCER_SPEED = 80;
const LANCER_COOLDOWN = 1000;
const ATTACK_DISTANCE = 110;
const STOP_DISTANCE = 90;
const HERO_DAMAGE_MIN = 1;
const HERO_DAMAGE_MAX = 3;
const LANCER_DAMAGE_MIN = 1;
const LANCER_DAMAGE_MAX = 4;
const MAX_ATTACKERS = 8;
const LANCER_SEPARATION_RADIUS = 70;
const LANCER_SEPARATION_FORCE = 80;

const COVER_DEPTH_OFFSET = 220;
const NPC_COLORS = [0x5dade2, 0xffa07a, 0xfff176, 0xa569bd];
const LANCER_TINTS = [0xffe066, 0x7dc8ff, 0xff7d7d, 0x94f1a4, 0xd5b4ff, 0xffc48c];

type MapResponse = {
  map: CityMapData;
};

const dPad = [
  { label: "↑", dx: 0, dy: -1, className: "pad-up" },
  { label: "↓", dx: 0, dy: 1, className: "pad-down" },
  { label: "←", dx: -1, dy: 0, className: "pad-left" },
  { label: "→", dx: 1, dy: 0, className: "pad-right" }
] as const;

type NPCRecord = {
  sprite: PhaserType.GameObjects.Sprite;
  label: PhaserType.GameObjects.Text;
  target: PhaserType.Math.Vector2;
  name: string;
};

type CollisionZone = PhaserType.Geom.Rectangle;

type LancerRecord = {
  sprite: PhaserType.GameObjects.Sprite;
  label: PhaserType.GameObjects.Text;
  hp: number;
  lastAttack: number;
};

type CombatEvent = {
  message: string;
  tone: "damage" | "xp";
};

type CityPhaserProps = {
  ownerId: string;
  characterId: string;
  characterName?: string;
  characterLevel?: number;
  initialPosition?: { x: number; y: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
  onCombatEvent?: (event: CombatEvent) => void;
  onReady?: (ready: boolean) => void;
};

export function CityPhaser({
  ownerId,
  characterId,
  characterName,
  characterLevel,
  initialPosition,
  onPositionChange,
  onCombatEvent,
  onReady
}: CityPhaserProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const gameInstanceRef = useRef<PhaserType.Game | null>(null);
  const [tileManifest, setTileManifest] = useState<TileManifest | null>(null);
  const [mapData, setMapData] = useState<CityMapData | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showPad, setShowPad] = useState(false);
  const [orientationHint, setOrientationHint] = useState(false);
  const [virtualDirection, setVirtualDirection] = useState({ dx: 0, dy: 0 });
  const virtualDirectionRef = useRef({ dx: 0, dy: 0 });
  const audioRef = useRef<AudioContext | null>(null);
  const positionHandlerRef = useRef<typeof onPositionChange | undefined>(undefined);
  const combatHandlerRef = useRef<typeof onCombatEvent | undefined>(undefined);
  const readyHandlerRef = useRef<typeof onReady | undefined>(undefined);
  const initializedRef = useRef(false);

  useEffect(() => {
    positionHandlerRef.current = onPositionChange;
  }, [onPositionChange]);

  useEffect(() => {
    combatHandlerRef.current = onCombatEvent;
  }, [onCombatEvent]);

  useEffect(() => {
    readyHandlerRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    virtualDirectionRef.current = virtualDirection;
  }, [virtualDirection]);

  useEffect(() => {
    return () => {
      audioRef.current?.close().catch(() => undefined);
    };
  }, []);

  const playTone = (frequency: number, duration = 0.25) => {
    try {
      let ctx = audioRef.current;
      if (!ctx || ctx.state === "closed") {
        ctx = new AudioContext();
        audioRef.current = ctx;
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // ignore audio failures
    }
  };

  useEffect(() => {
    fetch("/api/tiles")
      .then((response) => response.json())
      .then((data: TileManifest) => setTileManifest(data))
      .catch(() => setFeedback("Falha ao carregar tiles."));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      setShowPad(width < 900);
      setOrientationHint(width < 700 && height > width);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let active = true;
    async function loadMap() {
      try {
        const response = await fetch("/api/city/map", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = (await response.json()) as MapResponse;
        if (active) setMapData(data.map);
      } catch (err) {
        if (active) {
          setFeedback(err instanceof Error ? err.message : "Falha ao carregar o mapa.");
        }
      }
    }
    void loadMap();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!ownerId || !characterId) return;
    if (!ref.current || !mapData || !tileManifest) return;
    if (initializedRef.current) return;
    initializedRef.current = true;
    readyHandlerRef.current?.(false);
    let game: PhaserType.Game | null = null;
    const container = ref.current;

    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      const Phaser = await import("phaser");
      const mapReference = mapData;
      const groundTiles = tileManifest.ground;
      const detailTiles = tileManifest.details;
      const buildingTiles = tileManifest.buildings;
      const buildingLookup = new Map(buildingTiles.map((tile) => [tile.id, tile]));
      const playerLabel = characterName ?? "Herói";
      const playerLevel = characterLevel ?? 1;

      const playToneRef = playTone;
      const combatEventRef = combatHandlerRef.current;
      const positionCallbackRef = positionHandlerRef.current;

      class CityScene extends Phaser.Scene {
        private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
        private player!: Phaser.GameObjects.Sprite;
        private floorLayer?: Phaser.Tilemaps.TilemapLayer;
        private detailLayer?: Phaser.Tilemaps.TilemapLayer;
        private map?: Phaser.Tilemaps.Tilemap;
        private npcs: NPCRecord[] = [];
        private collisionZones: CollisionZone[] = [];
        private worldWidth = 0;
        private worldHeight = 0;
        private playerLabel?: Phaser.GameObjects.Text;
        private heroName = playerLabel;
        private heroLevel = playerLevel;
        private lancers: LancerRecord[] = [];
        private heroAttacking = false;
        private lastPositionSent = 0;

        preload() {
          groundTiles.forEach((tile) => {
            this.load.image(`ground-${tile.id}`, tile.image);
          });
          detailTiles.forEach((tile) => {
            this.load.image(`detail-${tile.id}`, tile.image);
          });
          buildingTiles.forEach((tile) => {
            this.load.image(`building-${tile.id}`, tile.image);
          });
          this.load.spritesheet(HERO_RUN_SHEET_KEY, HERO_CONFIG.run.sheet, {
            frameWidth: HERO_CONFIG.run.frameWidth,
            frameHeight: HERO_CONFIG.run.frameHeight
          });
          this.load.spritesheet(HERO_IDLE_SHEET_KEY, HERO_CONFIG.idle.sheet, {
            frameWidth: HERO_CONFIG.idle.frameWidth,
            frameHeight: HERO_CONFIG.idle.frameHeight
          });
          if (HERO_CONFIG.attack) {
            this.load.spritesheet(HERO_ATTACK_SHEET_KEY, HERO_CONFIG.attack.sheet, {
              frameWidth: HERO_CONFIG.attack.frameWidth,
              frameHeight: HERO_CONFIG.attack.frameHeight
            });
          }
          this.load.spritesheet(LANCER_SHEET_RUN, LANCER_CONFIG.run.sheet, {
            frameWidth: LANCER_CONFIG.run.frameWidth,
            frameHeight: LANCER_CONFIG.run.frameHeight
          });
          if (LANCER_CONFIG.attack) {
            this.load.spritesheet(LANCER_SHEET_ATTACK, LANCER_CONFIG.attack.sheet, {
              frameWidth: LANCER_CONFIG.attack.frameWidth,
              frameHeight: LANCER_CONFIG.attack.frameHeight
            });
          }
        }

        create() {
          this.createAnimations();
          this.buildFloor();
          this.createPlayer();
          this.spawnNPCs();
          this.spawnLancers(LANCER_COUNT);
          this.cursors = this.input.keyboard!.createCursorKeys();
          this.cameras.main.setBounds(0, 0, this.map!.widthInPixels, this.map!.heightInPixels);
          this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
        }

        private createAnimations() {
          if (!this.anims.exists(HERO_RUN_KEY)) {
            this.anims.create({
              key: HERO_RUN_KEY,
              frames: this.anims.generateFrameNumbers(HERO_RUN_SHEET_KEY, {
                start: 0,
                end: HERO_CONFIG.run.frames - 1
              }),
              frameRate: HERO_CONFIG.run.frameRate,
              repeat: -1
            });
          }
          if (!this.anims.exists(HERO_IDLE_KEY)) {
            this.anims.create({
              key: HERO_IDLE_KEY,
              frames: this.anims.generateFrameNumbers(HERO_IDLE_SHEET_KEY, {
                start: 0,
                end: HERO_CONFIG.idle.frames - 1
              }),
              frameRate: HERO_CONFIG.idle.frameRate,
              repeat: -1
            });
          }
          if (HERO_CONFIG.attack && !this.anims.exists(HERO_ATTACK_KEY)) {
            this.anims.create({
              key: HERO_ATTACK_KEY,
              frames: this.anims.generateFrameNumbers(HERO_ATTACK_SHEET_KEY, {
                start: 0,
                end: HERO_CONFIG.attack.frames - 1
              }),
              frameRate: HERO_CONFIG.attack.frameRate,
              repeat: 0
            });
          }
          if (!this.anims.exists(LANCER_RUN_KEY)) {
            this.anims.create({
              key: LANCER_RUN_KEY,
              frames: this.anims.generateFrameNumbers(LANCER_SHEET_RUN, {
                start: 0,
                end: LANCER_CONFIG.run.frames - 1
              }),
              frameRate: LANCER_CONFIG.run.frameRate,
              repeat: -1
            });
          }
          if (LANCER_CONFIG.attack && !this.anims.exists(LANCER_ATTACK_KEY)) {
            this.anims.create({
              key: LANCER_ATTACK_KEY,
              frames: this.anims.generateFrameNumbers(LANCER_SHEET_ATTACK, {
                start: 0,
                end: LANCER_CONFIG.attack.frames - 1
              }),
              frameRate: LANCER_CONFIG.attack.frameRate,
              repeat: 0
            });
          }
        }

        private buildFloor() {
          this.createFloorTexture();
          this.map = this.make.tilemap({
            data: mapReference.ground,
            tileWidth: MAP_TILE_SIZE,
            tileHeight: MAP_TILE_SIZE
          });
          const tileset = this.map.addTilesetImage(
            "city-floor",
            "city-floor",
            MAP_TILE_SIZE,
            MAP_TILE_SIZE,
            0,
            0
          );
          if (!tileset) {
            throw new Error("Tileset da cidade não pôde ser carregado.");
          }
          this.floorLayer = this.map.createLayer(0, tileset) ?? undefined;
          this.floorLayer?.setOrigin(0);

          this.renderDetails();

          this.worldWidth = this.map.widthInPixels;
          this.worldHeight = this.map.heightInPixels;
          this.renderBuildings();
          this.buildCollisionZones();
        }

        private renderDetails() {
          mapReference.detail.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
              if (cell <= 0) return;
              const textureKey = `detail-${cell}`;
              if (!this.textures.exists(textureKey)) return;
              const sprite = this.add.image(
                columnIndex * MAP_TILE_SIZE + MAP_TILE_SIZE / 2,
                rowIndex * MAP_TILE_SIZE + MAP_TILE_SIZE / 2,
                textureKey
              );
              sprite.setOrigin(0.5, 0.5);
              sprite.setDepth(10 + rowIndex);
            });
          });
        }

        private createFloorTexture() {
          if (this.textures.exists("city-floor")) return;
          const canvas = this.textures.createCanvas(
            "city-floor",
            MAP_TILE_SIZE * groundTiles.length,
            MAP_TILE_SIZE
          );
          if (!canvas) return;
          const ctx = canvas.getContext();
          if (!ctx) return;
          groundTiles.forEach((tile, index) => {
            const texture = this.textures.get(`ground-${tile.id}`);
            if (!texture) return;
            const sourceImage = texture.getSourceImage() as HTMLImageElement;
            ctx.drawImage(
              sourceImage,
              0,
              0,
              sourceImage.width,
              sourceImage.height,
              index * MAP_TILE_SIZE,
              0,
              MAP_TILE_SIZE,
              MAP_TILE_SIZE
            );
          });
          canvas.refresh();
        }

        private renderBuildings() {
          mapReference.buildings.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
              if (cell <= 0) return;
              const def = buildingLookup.get(cell);
              if (!def) return;
              const key = `building-${def.id}`;
              if (!this.textures.exists(key)) return;
              const sprite = this.add.image(
                columnIndex * MAP_TILE_SIZE + MAP_TILE_SIZE / 2,
                rowIndex * MAP_TILE_SIZE + MAP_TILE_SIZE,
                key
              );
              sprite.setOrigin(0.5, 1);
              sprite.setDepth(sprite.y);
            });
          });
        }

        private buildCollisionZones() {
          this.collisionZones = [];
          mapReference.collision.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
              if (value <= 0) return;
              this.collisionZones.push(
                new Phaser.Geom.Rectangle(
                  columnIndex * MAP_TILE_SIZE,
                  rowIndex * MAP_TILE_SIZE,
                  MAP_TILE_SIZE,
                  MAP_TILE_SIZE
                )
              );
            });
          });
        }

        private createPlayer() {
          this.player = this.add.sprite(0, 0, HERO_RUN_SHEET_KEY, 0);
          this.player.setOrigin(0.5, 1);
          this.player.setScale(HERO_SCALE);
          this.player.setDepth(this.player.y + COVER_DEPTH_OFFSET);
          const startX = initialPosition?.x ?? this.worldWidth / 2;
          const startY = initialPosition?.y ?? this.worldHeight / 2;
          this.player.setPosition(startX, startY);
          this.player.play(HERO_IDLE_KEY);
          this.syncPlayerPosition(startX, startY);
          const text = `${this.heroName} Lv.${this.heroLevel}`;
          this.playerLabel = this.add
            .text(this.player.x, this.player.y - this.player.displayHeight - 6, text, {
              color: "#fffbdd",
              fontSize: "15px",
              fontStyle: "bold",
              stroke: "#2b1408",
              strokeThickness: 3
            })
            .setOrigin(0.5, 1)
            .setDepth(this.player.depth + 5);
        }

        private spawnNPCs() {
          const names = ["Sentinela", "Guarda", "Explorador", "Mercador"];
          for (let i = 0; i < 4; i++) {
            const sprite = this.add.sprite(
              Phaser.Math.Between(120, this.worldWidth - 120),
              Phaser.Math.Between(120, this.worldHeight - 120),
              HERO_IDLE_SHEET_KEY,
              0
            );
            sprite.setOrigin(0.5, 1);
            sprite.setScale(HERO_SCALE);
            sprite.setTint(NPC_COLORS[i % NPC_COLORS.length]);
            sprite.play(HERO_IDLE_KEY);
            sprite.setDepth(sprite.y);
            const level = Phaser.Math.Between(3, 12);
            const name = `${names[i % names.length]} Lv.${level}`;
            const label = this.add
              .text(sprite.x, sprite.y - sprite.displayHeight - 4, name, {
                color: "#fff8d0",
                fontSize: "14px",
                fontStyle: "bold"
              })
              .setOrigin(0.5, 1)
              .setDepth(sprite.depth + 5);
            const npc: NPCRecord = {
              sprite,
              label,
              target: this.randomPoint(),
              name
            };
            this.scheduleSpeech(npc);
            this.npcs.push(npc);
          }
        }

        private scheduleSpeech(npc: NPCRecord) {
          const messages = [
            "Patrulha em andamento.",
            "A cidade precisa de você.",
            "Alguma troca?",
            "Boas vindas!"
          ];
          this.time.addEvent({
            delay: Phaser.Math.Between(4000, 9000),
            callback: () => {
              const message = messages[Phaser.Math.Between(0, messages.length - 1)];
              const text = this.add
                .text(npc.sprite.x, npc.sprite.y - npc.sprite.displayHeight - 8, message, {
                  color: "#fff3d4",
                  fontSize: "13px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  padding: { x: 8, y: 4 }
                })
                .setOrigin(0.5, 1)
                .setDepth(npc.sprite.depth + 10)
                .setAlpha(0);
              this.tweens.add({
                targets: text,
                alpha: 1,
                duration: 150,
                yoyo: true,
                hold: 2000,
                completeDelay: 300,
                onComplete: () => text.destroy()
              });
              this.scheduleSpeech(npc);
            }
          });
        }

        private spawnLancers(count: number) {
          for (let i = 0; i < count; i++) {
            this.spawnLancer(i);
          }
        }

        private spawnLancer(index = 0) {
          const position = this.randomPoint();
          const sprite = this.add.sprite(position.x, position.y, LANCER_SHEET_RUN, 0);
          sprite.setOrigin(0.5, 1);
          sprite.setScale(LANCER_SCALE);
          sprite.setTint(LANCER_TINTS[index % LANCER_TINTS.length]);
          sprite.play(LANCER_RUN_KEY);
          sprite.setDepth(sprite.y);
          const label = this.add
            .text(sprite.x, sprite.y - sprite.displayHeight - 4, "Lanceiro", {
              color: "#fdf5d0",
              fontSize: "14px",
              fontStyle: "bold"
            })
            .setOrigin(0.5, 1)
            .setDepth(sprite.depth + 5);
          const lancer: LancerRecord = {
            sprite,
            label,
            hp: LANCER_HP,
            lastAttack: 0
          };
          this.lancers.push(lancer);
        }

        private randomPoint() {
          return new Phaser.Math.Vector2(
            Phaser.Math.Between(80, this.worldWidth - 80),
            Phaser.Math.Between(80, this.worldHeight - 80)
          );
        }

        private updateNPCs(delta: number) {
          const speed = 60;
          this.npcs.forEach((npc) => {
            const dir = new Phaser.Math.Vector2(npc.target.x - npc.sprite.x, npc.target.y - npc.sprite.y);
            if (dir.length() < 10) {
              npc.target = this.randomPoint();
              npc.sprite.play(HERO_IDLE_KEY, true);
              return;
            }
            dir.normalize();
            npc.sprite.x += dir.x * speed * (delta / 1000);
            npc.sprite.y += dir.y * speed * (delta / 1000);
            npc.label.setPosition(npc.sprite.x, npc.sprite.y - npc.sprite.displayHeight - 4);
            npc.sprite.setDepth(npc.sprite.y);
            npc.label.setDepth(npc.sprite.depth + 5);
            npc.sprite.setFlipX(dir.x < 0);
            npc.sprite.play(HERO_RUN_KEY, true);
          });
        }

        private updateLancers(delta: number) {
          if (!this.player) return;
          const activeLancers = this.lancers.filter((lancer) => lancer.sprite.active);
          const ordered = activeLancers
            .map((entry) => ({
              lancer: entry,
              distance: Phaser.Math.Distance.Between(
                entry.sprite.x,
                entry.sprite.y,
                this.player!.x,
                this.player!.y
              )
            }))
            .sort((a, b) => a.distance - b.distance);
          const allowed = new Set(ordered.slice(0, MAX_ATTACKERS).map((entry) => entry.lancer));

          activeLancers.forEach((lancer) => {
            const dir = new Phaser.Math.Vector2(
              this.player!.x - lancer.sprite.x,
              this.player!.y - lancer.sprite.y
            );
            const distance = dir.length();
            const direction = distance > 0 ? dir.clone().normalize() : new Phaser.Math.Vector2();
            const isAllowed = allowed.has(lancer);

            if (isAllowed && distance > STOP_DISTANCE) {
              lancer.sprite.x += direction.x * LANCER_SPEED * (delta / 1000);
              lancer.sprite.y += direction.y * LANCER_SPEED * (delta / 1000);
              lancer.sprite.setFlipX(direction.x < 0);
              lancer.sprite.play(LANCER_RUN_KEY, true);
            } else if (!isAllowed && distance < STOP_DISTANCE + 30 && distance > 0) {
              lancer.sprite.x -= direction.x * (LANCER_SPEED * 0.6) * (delta / 1000);
              lancer.sprite.y -= direction.y * (LANCER_SPEED * 0.6) * (delta / 1000);
              lancer.sprite.setFlipX(direction.x < 0);
              lancer.sprite.play(LANCER_RUN_KEY, true);
            }

            const separation = new Phaser.Math.Vector2();
            activeLancers.forEach((other) => {
              if (other === lancer) return;
              const offset = new Phaser.Math.Vector2(
                lancer.sprite.x - other.sprite.x,
                lancer.sprite.y - other.sprite.y
              );
              const dist = offset.length();
              if (dist > 0 && dist < LANCER_SEPARATION_RADIUS) {
                offset.normalize().scale((LANCER_SEPARATION_RADIUS - dist) / LANCER_SEPARATION_RADIUS);
                separation.add(offset);
              }
            });
            if (separation.lengthSq() > 0) {
              separation.normalize();
              lancer.sprite.x += separation.x * LANCER_SEPARATION_FORCE * (delta / 1000);
              lancer.sprite.y += separation.y * LANCER_SEPARATION_FORCE * (delta / 1000);
            }
            lancer.sprite.setDepth(lancer.sprite.y);
            lancer.label
              .setPosition(lancer.sprite.x, lancer.sprite.y - lancer.sprite.displayHeight - 4)
              .setDepth(lancer.sprite.depth + 5);
            if (isAllowed && distance < ATTACK_DISTANCE) {
              this.handleCombat(lancer);
            }
          });
        }

        private handleCombat(lancer: LancerRecord) {
          const now = this.time.now;
          if (now - lancer.lastAttack < LANCER_COOLDOWN) return;
          lancer.lastAttack = now;
          this.triggerHeroAttack();
          this.triggerLancerAttack(lancer);
          const heroDamage = Phaser.Math.Between(HERO_DAMAGE_MIN, HERO_DAMAGE_MAX);
          const lancerDamage = Phaser.Math.Between(LANCER_DAMAGE_MIN, LANCER_DAMAGE_MAX);
          this.showFloatingText(
            lancer.sprite.x,
            lancer.sprite.y - lancer.sprite.displayHeight,
            `-${heroDamage} HP`,
            "#fff6c4"
          );
          this.emitCombatLog({
            message: `${lancer.label.text} perdeu ${heroDamage} HP`,
            tone: "damage"
          });
          this.showFloatingText(
            this.player.x,
            this.player.y - this.player.displayHeight - 6,
            `-${lancerDamage} HP`,
            "#ff7a7a"
          );
          this.emitCombatLog({
            message: `${this.heroName} perdeu ${lancerDamage} HP`,
            tone: "damage"
          });
          playToneRef(420);
          lancer.hp -= heroDamage;
          if (lancer.hp <= 0) {
            this.handleLancerDeath(lancer);
          }
        }

        private triggerHeroAttack() {
          if (!HERO_CONFIG.attack || this.heroAttacking) return;
          this.heroAttacking = true;
          this.player.play(HERO_ATTACK_KEY, true);
          const duration = (HERO_CONFIG.attack.frames / HERO_CONFIG.attack.frameRate) * 1000;
          this.time.delayedCall(duration, () => {
            this.heroAttacking = false;
          });
        }

        private triggerLancerAttack(lancer: LancerRecord) {
          if (!LANCER_CONFIG.attack) return;
          lancer.sprite.play(LANCER_ATTACK_KEY, true);
          const duration = (LANCER_CONFIG.attack.frames / LANCER_CONFIG.attack.frameRate) * 1000;
          this.time.delayedCall(duration, () => {
            if (lancer.sprite.active) {
              lancer.sprite.play(LANCER_RUN_KEY, true);
            }
          });
        }

        private handleLancerDeath(lancer: LancerRecord) {
          this.showFloatingText(
            this.player.x,
            this.player.y - this.player.displayHeight - 30,
            "+2 XP",
            "#94f1a4"
          );
          this.emitCombatLog({ message: "+2 XP", tone: "xp" });
          playToneRef(620);
          this.tweens.add({
            targets: [lancer.sprite, lancer.label],
            alpha: 0,
            duration: 250,
            onComplete: () => {
              lancer.sprite.destroy();
              lancer.label.destroy();
              this.lancers = this.lancers.filter((entry) => entry !== lancer);
              this.time.delayedCall(600, () => this.spawnLancer(Phaser.Math.Between(0, 1000)));
            }
          });
        }

        private showFloatingText(x: number, y: number, text: string, color: string) {
          const floating = this.add
            .text(x, y, text, {
              color,
              fontSize: "16px",
              fontStyle: "bold"
            })
            .setOrigin(0.5, 1)
            .setDepth(2000)
            .setAlpha(0.95);
          this.tweens.add({
            targets: floating,
            y: y - 30,
            alpha: 0,
            duration: 600,
            onComplete: () => floating.destroy()
          });
        }

        private syncPlayerPosition(x: number, y: number) {
          if (!positionCallbackRef) return;
          const now = this.time.now;
          if (now - this.lastPositionSent < 750) return;
          this.lastPositionSent = now;
          positionCallbackRef({ x, y });
        }

        private emitCombatLog(event: CombatEvent) {
          combatEventRef?.(event);
        }

        update(_: number, delta: number) {
          if (!this.player || !this.cursors || !this.map) return;
          let dx = 0;
          let dy = 0;

          if (this.cursors.left?.isDown) dx -= 1;
          if (this.cursors.right?.isDown) dx += 1;
          if (this.cursors.up?.isDown) dy -= 1;
          if (this.cursors.down?.isDown) dy += 1;

          const virtual = virtualDirectionRef.current;
          dx += virtual.dx;
          dy += virtual.dy;

          const length = Math.hypot(dx, dy) || 1;
          dx /= length;
          dy /= length;

          const proposedX = Phaser.Math.Clamp(
            this.player.x + dx * PLAYER_SPEED * (delta / 1000),
            this.player.displayWidth / 2,
            this.worldWidth - this.player.displayWidth / 2
          );
          const proposedY = Phaser.Math.Clamp(
            this.player.y + dy * PLAYER_SPEED * (delta / 1000),
            this.player.displayHeight / 2,
            this.worldHeight
          );

          const collidesWithNPC = this.npcs.some(
            (npc) => Phaser.Math.Distance.Between(npc.sprite.x, npc.sprite.y, proposedX, proposedY) < 40
          );
          const playerFeet = new Phaser.Geom.Circle(proposedX, proposedY - 8, 18);
          const collidesWithCollision = this.collisionZones.some((zone) =>
            Phaser.Geom.Intersects.CircleToRectangle(playerFeet, zone)
          );

          if (!collidesWithNPC && !collidesWithCollision) {
            this.player.setPosition(proposedX, proposedY);
            this.syncPlayerPosition(proposedX, proposedY);
          }

          if (!this.heroAttacking) {
            if (dx !== 0 || dy !== 0) {
              this.player.setFlipX(dx < 0);
              this.player.play(HERO_RUN_KEY, true);
            } else {
              this.player.play(HERO_IDLE_KEY, true);
            }
          }

          const tileX = Math.max(0, Math.floor(this.player.x / MAP_TILE_SIZE));
          const tileY = Math.max(0, Math.floor(this.player.y / MAP_TILE_SIZE));
          const coverValue = mapReference.cover[tileY]?.[tileX] ?? 0;
          const depthOffset = coverValue > 0 ? -COVER_DEPTH_OFFSET : COVER_DEPTH_OFFSET;
          this.player.setDepth(this.player.y + depthOffset);
          if (this.playerLabel) {
            this.playerLabel.setPosition(
              this.player.x,
              this.player.y - this.player.displayHeight - 6
            );
            this.playerLabel.setDepth(this.player.depth + 5);
          }

          this.updateNPCs(delta);
          this.updateLancers(delta);
        }
      }

      const getSize = () => {
        const containerWidth = ref.current?.clientWidth ?? window.innerWidth ?? 960;
        const viewportWidth = window.innerWidth ?? containerWidth;
        const isDesktop = viewportWidth >= 1200;
        const maxWidth = isDesktop ? 1340 : viewportWidth - 24;
        const baseWidth = Math.min(containerWidth, maxWidth);
        const widthCandidate = Math.round(baseWidth * PINCH_SCALE) + 4 * MAP_TILE_SIZE;
        const width = Math.max(620, Math.min(maxWidth, widthCandidate));
        const baseHeight = Math.round(width * (isDesktop ? 0.5 : 0.66));
        const height = baseHeight + 3 * MAP_TILE_SIZE;
        return { width, height };
      };

      const initialSize = getSize();
      game = new Phaser.Game({
        type: Phaser.AUTO,
        width: initialSize.width,
        height: initialSize.height,
        parent: ref.current!,
        backgroundColor: "#1a0a05",
        scene: CityScene,
        render: { pixelArt: true, antialias: false }
      });
      gameInstanceRef.current = game;
      readyHandlerRef.current?.(true);

      const handleResize = () => {
        const size = getSize();
        game?.scale.resize(size.width, size.height);
      };

      window.addEventListener("resize", handleResize);
      const cleanup = () => window.removeEventListener("resize", handleResize);
      game.events?.once("destroy", cleanup);
    })();

    return () => {
      if (game) {
        game.destroy(true);
      }
      if (gameInstanceRef.current === game) {
        gameInstanceRef.current = null;
      }
      if (container) {
        container.innerHTML = "";
      }
      readyHandlerRef.current?.(false);
    };
  }, [mapData, tileManifest, ownerId, characterId]);

  const startDirection = (dx: number, dy: number) => () => setVirtualDirection({ dx, dy });
  const stopDirection = () => setVirtualDirection({ dx: 0, dy: 0 });

  if (feedback) return <p>{feedback}</p>;
  if (!mapData) return <p>Carregando mapa…</p>;

  return (
    <div className="relative">
      <div className="phaser-wrapper" ref={ref} />
      {orientationHint && (
        <p className="orientation-hint">Melhor experiência na horizontal — gire o dispositivo.</p>
      )}
      {showPad && (
        <div className="virtual-pad">
          {dPad.map((button) => (
            <button
              key={button.className}
              className={`virtual-pad-button ${button.className}`}
              onPointerDown={startDirection(button.dx, button.dy)}
              onPointerUp={stopDirection}
              onPointerLeave={stopDirection}
              onPointerCancel={stopDirection}
              type="button"
              aria-label={`Mover ${button.label}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
