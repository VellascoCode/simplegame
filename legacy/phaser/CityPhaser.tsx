"use client";

import type * as PhaserType from "phaser";

import { useCallback, useEffect, useRef, useState } from "react";

import type { CollisionZone, LancerRecord, NPCRecord } from "@/legacy/phaser/game/types";
import type { CityMapData } from "@/lib/mapTypes";
import type { CharacterStats } from "@/lib/models";
import type { TileManifest } from "@/lib/tileManifest";
import type { BestiaryEntry } from "@/models/Bestiary";

import { handleCombat } from "@/legacy/phaser/game/combat";
import {
  COVER_DEPTH_OFFSET,
  GROUND_DROP_TTL,
  HERO_SCALE,
  LANCER_COUNT,
  LANCER_XP_REWARD,
  MAP_TILE_SIZE,
  MEDIUM_CRYSTAL_DROP_CHANCE,
  PINCH_SCALE,
  SMALL_CRYSTAL_DROP_CHANCE
} from "@/legacy/phaser/game/constants";
import { scheduleNpcSpeech } from "@/legacy/phaser/game/dialog";
import { createLancer, handleLancerDeath } from "@/legacy/phaser/game/lancers";
import { buildCollisionZones, createFloorTexture, renderBuildings, renderDetails } from "@/legacy/phaser/game/layers";
import { handlePlayerMovement } from "@/legacy/phaser/game/movement";
import { spawnNPCs, updateLancers, updateNPCs } from "@/legacy/phaser/game/npcAI";
import { setPhaserInstance } from "@/legacy/phaser/game/phaserInstance";
import { triggerHeroAttack, triggerLancerAttack } from "@/legacy/phaser/game/playerActions";
import { clampPlayerDepth } from "@/legacy/phaser/game/utils";
import { useSessionPosition } from "@/legacy/phaser/hooks/useSessionPosition";
import { getCharacterSpriteConfig, getNpcSpriteConfig } from "@/lib/characterSprites";
import { postJSON } from "@/lib/clientApi";

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
const NPC_COLORS = [0x5dade2, 0xffa07a, 0xfff176, 0xa569bd];
const LANCER_TINTS = [0xffe066, 0x7dc8ff, 0xff7d7d, 0x94f1a4, 0xd5b4ff, 0xffc48c];
const DROP_TEXTURES = [
  { key: "drop-item30", path: "/itens/item30.png" },
  { key: "drop-item31", path: "/itens/item31.png" }
] as const;
const CRYSTAL_DROPS = {
  small: { id: "item30", name: "Cristal pequeno de XP", texture: "drop-item30" },
  medium: { id: "item31", name: "Cristal médio de XP", texture: "drop-item31" }
} as const;
type DropDefinition = typeof CRYSTAL_DROPS[keyof typeof CRYSTAL_DROPS];

type MapResponse = {
  map: CityMapData;
};

let phaserModule: typeof PhaserType | null = null;

const loadPhaserModule = async () => {
  if (!phaserModule) {
    phaserModule = (await import("phaser")) as typeof PhaserType;
    setPhaserInstance(phaserModule);
  }
  return phaserModule;
};

const dPad = [
  { label: "↑", dx: 0, dy: -1, className: "pad-up" },
  { label: "↓", dx: 0, dy: 1, className: "pad-down" },
  { label: "←", dx: -1, dy: 0, className: "pad-left" },
  { label: "→", dx: 1, dy: 0, className: "pad-right" }
] as const;

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
  onStatsChange?: (stats: CharacterStats) => void;
  onGoldChange?: (gold: number) => void;
  onBestiaryUpdate?: (table: BestiaryEntry[]) => void;
  soundEnabled?: boolean;
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
  onStatsChange,
  onGoldChange,
  onBestiaryUpdate,
  soundEnabled = true,
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
  const combatHandlerRef = useRef<typeof onCombatEvent | undefined>(undefined);
  const goldHandlerRef = useRef<typeof onGoldChange | undefined>(undefined);
  const bestiaryHandlerRef = useRef<typeof onBestiaryUpdate | undefined>(undefined);
  const readyHandlerRef = useRef<typeof onReady | undefined>(undefined);
  const statsHandlerRef = useRef<typeof onStatsChange | undefined>(undefined);
  const initializedRef = useRef(false);
  const syncSessionPosition = useSessionPosition(onPositionChange);

  useEffect(() => {
    combatHandlerRef.current = onCombatEvent;
  }, [onCombatEvent]);

  useEffect(() => {
    goldHandlerRef.current = onGoldChange;
  }, [onGoldChange]);

  useEffect(() => {
    bestiaryHandlerRef.current = onBestiaryUpdate;
  }, [onBestiaryUpdate]);

  useEffect(() => {
    readyHandlerRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    statsHandlerRef.current = onStatsChange;
  }, [onStatsChange]);

  useEffect(() => {
    if (!soundEnabled) {
      audioRef.current?.suspend?.().catch(() => undefined);
    } else {
      audioRef.current?.resume?.().catch(() => undefined);
    }
  }, [soundEnabled]);

  useEffect(() => {
    virtualDirectionRef.current = virtualDirection;
  }, [virtualDirection]);

  useEffect(() => {
    const game = gameInstanceRef.current;
    if (game?.sound) {
      game.sound.mute = !soundEnabled;
    }
    if (!soundEnabled) {
      audioRef.current?.suspend?.().catch(() => undefined);
    } else {
      audioRef.current?.resume?.().catch(() => undefined);
    }
  }, [soundEnabled]);

  useEffect(() => {
    return () => {
      audioRef.current?.close().catch(() => undefined);
    };
  }, []);

  const playTone = useCallback((frequency: number, duration = 0.25) => {
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
  }, []);

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

    const bootGame = async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      const phaser = await loadPhaserModule();
      const mapReference = mapData;
      const groundTiles = tileManifest.ground;
      const detailTiles = tileManifest.details;
      const buildingTiles = tileManifest.buildings;
      const buildingLookup = new Map(buildingTiles.map((tile) => [tile.id, tile]));
      const playerLabel = characterName ?? "Herói";
      const playerLevel = characterLevel ?? 1;

      const playToneRef = playTone;
      const combatEventRef = combatHandlerRef.current;
      const sessionSync = syncSessionPosition;
      const goldCallbackRef = goldHandlerRef.current;
      const bestiaryCallbackRef = bestiaryHandlerRef.current;
      const statsCallbackRef = statsHandlerRef.current;

      class CityScene extends phaser.Scene {
        private cursors!: PhaserType.Types.Input.Keyboard.CursorKeys;
        private player!: PhaserType.GameObjects.Sprite;
        private floorLayer?: PhaserType.Tilemaps.TilemapLayer;
        private detailLayer?: PhaserType.Tilemaps.TilemapLayer;
        private map?: PhaserType.Tilemaps.Tilemap;
        private npcs: NPCRecord[] = [];
        private collisionZones: CollisionZone[] = [];
        private worldWidth = 0;
        private worldHeight = 0;
        private playerLabel?: PhaserType.GameObjects.Text;
        private heroName = playerLabel;
        private heroLevel = playerLevel;
        private lancers: LancerRecord[] = [];
        private heroAttacking = false;
        private readonly playerOwnerId = ownerId;
        private readonly playerCharacterId = characterId;
        private readonly goldCallback = goldCallbackRef;
        private readonly bestiaryCallback = bestiaryCallbackRef;
        private readonly statsCallback = statsCallbackRef;
        private dropLayer?: PhaserType.GameObjects.Layer;
        private groundDrops: Array<{
          sprite: PhaserType.GameObjects.Image;
          label: PhaserType.GameObjects.Text;
        }> = [];
        private lootNotices: PhaserType.GameObjects.Container[] = [];

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
          DROP_TEXTURES.forEach((texture) => {
            this.load.image(texture.key, texture.path);
          });
        }

        create() {
          this.initializeScene();
          this.configureCamera();
          this.configureInput();
        }

        private initializeScene() {
          this.createAnimations();
          this.buildFloor();
          this.createPlayer();
          this.spawnNPCs();
          this.spawnLancers(LANCER_COUNT);
        }

        private configureCamera() {
          if (!this.map) return;
          this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
          this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
        }

        private configureInput() {
          const keyboard = this.input.keyboard;
          if (keyboard) {
            this.cursors = keyboard.createCursorKeys();
          }
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
          createFloorTexture(this, "city-floor", groundTiles);
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

          renderDetails(this, mapReference.detail, MAP_TILE_SIZE);

          this.worldWidth = this.map.widthInPixels;
          this.worldHeight = this.map.heightInPixels;
          renderBuildings(this, mapReference.buildings, buildingLookup);
          this.collisionZones = buildCollisionZones(mapReference.collision);
          this.dropLayer = this.add.layer();
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
          sessionSync(startX, startY, true);
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
          const initialCount = this.npcs.length;
          spawnNPCs(
            this,
            names.length,
            this.worldWidth,
            this.worldHeight,
            NPC_COLORS,
            names,
            this.npcs
          );
          this.npcs.slice(initialCount).forEach((npc) => scheduleNpcSpeech(this, npc));
        }

        private spawnLancers(count: number) {
          for (let i = 0; i < count; i++) {
            this.spawnLancer(i);
          }
        }

        private spawnLancer(index = 0) {
          const lancer = createLancer(
            this,
            index,
            LANCER_TINTS,
            this.worldWidth,
            this.worldHeight,
            LANCER_SHEET_RUN,
            LANCER_RUN_KEY
          );
          this.lancers.push(lancer);
        }

        private removeLancer(lancer: LancerRecord) {
          lancer.sprite.setActive(false);
          lancer.label.setActive(false);
          this.lancers = this.lancers.filter((entry) => entry !== lancer);
        }

        private grantXp(amount: number) {
          if (!this.playerOwnerId || !this.playerCharacterId || amount <= 0) return;
          void postJSON<CharacterStats>("/api/character/xp", {
            ownerId: this.playerOwnerId,
            characterId: this.playerCharacterId,
            amount
          })
            .then((stats) => {
              this.statsCallback?.(stats);
            })
            .catch(() => undefined);
        }

        private async rewardCrystal(def: DropDefinition, position: { x: number; y: number }) {
          if (!this.playerOwnerId) return;
          try {
            await postJSON("/api/inventory/add", {
              ownerId: this.playerOwnerId,
              item: {
                id: def.id,
                name: def.name,
                quantity: 1,
                stackable: true
              }
            });
            this.emitCombatLog({ message: `${def.name} obtido`, tone: "xp" });
            this.showLootNotification(`+1 ${def.name}`, def.texture);
            playToneRef?.(760);
          } catch {
            this.spawnGroundDrop(def, position);
            this.showLootNotification(`${def.name} caiu no chão`, def.texture);
          }
        }

        private spawnGroundDrop(def: DropDefinition, position: { x: number; y: number }) {
          if (!this.textures.exists(def.texture)) return;
          const sprite = this.add
            .image(position.x, position.y - 4, def.texture)
            .setOrigin(0.5, 1)
            .setScale(0.75);
          const label = this.add
            .text(position.x, position.y + 6, "x1", {
              color: "#ffe9bf",
              fontSize: "12px",
              fontStyle: "bold",
              backgroundColor: "rgba(0,0,0,0.55)",
              padding: { x: 6, y: 2 }
            })
            .setOrigin(0.5, 0);
          const depth = position.y;
          sprite.setDepth(depth + 2);
          label.setDepth(depth + 3);
          this.dropLayer?.add(sprite);
          this.dropLayer?.add(label);
          this.groundDrops.push({ sprite, label });
          if (this.groundDrops.length > 50) {
            const earliest = this.groundDrops.shift();
            earliest?.sprite.destroy();
            earliest?.label.destroy();
          }
          this.time.delayedCall(GROUND_DROP_TTL, () => {
            sprite.destroy();
            label.destroy();
            this.groundDrops = this.groundDrops.filter((entry) => entry.sprite !== sprite);
          });
        }

        private showLootNotification(label: string, textureKey?: string) {
          const maxNotices = 3;
          const positionIndex = Math.min(this.lootNotices.length, maxNotices - 1);
          const baseX = this.cameras.main.worldView.x + 110;
          const baseY = this.cameras.main.worldView.y + 90 + positionIndex * 46;
          const background = this.add
            .rectangle(0, 0, 220, 40, 0x000000, 0.6)
            .setOrigin(0, 0.5)
            .setStrokeStyle(1, 0xfff3c0, 0.35);
          const text = this.add
            .text(52, 0, label, {
              color: "#fff6ce",
              fontSize: "14px",
              fontStyle: "bold"
            })
            .setOrigin(0, 0.5);
          const children: PhaserType.GameObjects.GameObject[] = [background, text];
          if (textureKey && this.textures.exists(textureKey)) {
            const icon = this.add.image(28, 0, textureKey).setOrigin(0.5).setScale(0.7);
            children.push(icon);
          } else {
            const marker = this.add
              .text(28, 0, "★", { color: "#ffe07d", fontSize: "18px" })
              .setOrigin(0.5, 0.5);
            children.push(marker);
          }
          const notice = this.add.container(baseX, baseY, children);
          notice.setScrollFactor(0);
          this.lootNotices.push(notice);
          this.tweens.add({
            targets: notice,
            alpha: { from: 0, to: 1 },
            duration: 150,
            onComplete: () => {
              this.time.delayedCall(2000, () => {
                this.tweens.add({
                  targets: notice,
                  alpha: 0,
                  y: notice.y - 20,
                  duration: 350,
                  onComplete: () => {
                    notice.destroy();
                    this.lootNotices = this.lootNotices.filter((entry) => entry !== notice);
                  }
                });
              });
            }
          });
        }

        private handleDropRewards(position: { x: number; y: number }) {
          const highRoll = phaser.Math.Between(1, 100);
          if (highRoll <= MEDIUM_CRYSTAL_DROP_CHANCE) {
            void this.rewardCrystal(CRYSTAL_DROPS.medium, position);
            return;
          }
          if (highRoll <= MEDIUM_CRYSTAL_DROP_CHANCE + SMALL_CRYSTAL_DROP_CHANCE) {
            void this.rewardCrystal(CRYSTAL_DROPS.small, position);
          }
        }

        private triggerHeroAttack() {
          triggerHeroAttack(this, this.player, {
            isAttacking: this.heroAttacking,
            setAttacking: (state) => {
              this.heroAttacking = state;
            }
          }, HERO_CONFIG.attack ? (HERO_CONFIG.attack.frames / HERO_CONFIG.attack.frameRate) * 1000 : 0);
        }

        private triggerLancerAttack(lancer: LancerRecord) {
          triggerLancerAttack(this, lancer);
        }

        private handleLancerDeath(lancer: LancerRecord) {
          handleLancerDeath(this, this.player, lancer, {
            emitXp: () => {
              this.emitCombatLog({ message: `+${LANCER_XP_REWARD} XP`, tone: "xp" });
              this.grantXp(LANCER_XP_REWARD);
            },
            playTone: playToneRef,
            awardGold: (amount) => this.awardGold(amount),
            recordBestiary: (monsterType) => this.recordBestiaryKill(monsterType),
            respawn: (delay) =>
              this.time.delayedCall(delay, () => {
                this.spawnLancer(phaser.Math.Between(0, 1000));
              }),
            rewardItems: () => this.handleDropRewards({ x: lancer.sprite.x, y: lancer.sprite.y }),
            onRemove: () => this.removeLancer(lancer)
          });
        }

        private awardGold(amount: number) {
          if (!this.playerOwnerId || !this.playerCharacterId || amount <= 0) return;
          void postJSON<{ gold: number }>("/api/character/gold", {
            ownerId: this.playerOwnerId,
            characterId: this.playerCharacterId,
            amount
          })
            .then(({ gold }) => {
              this.goldCallback?.(gold);
              this.showLootNotification(`+${amount} ouro`);
              playToneRef?.(700);
            })
            .catch(() => undefined);
        }

        private recordBestiaryKill(monsterId: number) {
          if (!this.playerOwnerId || !this.playerCharacterId) return;
          void postJSON<BestiaryEntry[]>("/api/bestiary/update", {
            ownerId: this.playerOwnerId,
            characterId: this.playerCharacterId,
            monsterId
          })
            .then((entries) => {
              this.bestiaryCallback?.(entries);
            })
            .catch(() => undefined);
        }

        private emitCombatLog(event: CombatEvent) {
          combatEventRef?.(event);
        }

        update(_: number, delta: number) {
          if (!this.player || !this.map) return;
          handlePlayerMovement({
            player: this.player,
            cursors: this.cursors,
            virtualDirection: virtualDirectionRef.current,
            collisionZones: this.collisionZones,
            npcs: this.npcs,
            worldWidth: this.worldWidth,
            worldHeight: this.worldHeight,
            heroAttacking: this.heroAttacking,
            delta,
            syncPosition: (x, y, force) => sessionSync(x, y, force)
          });
          clampPlayerDepth(this.player, mapReference.cover, this.playerLabel);
          updateNPCs(this, this.npcs, delta, this.worldWidth, this.worldHeight);
          updateLancers(this.player, this.lancers, delta, (lancer) =>
            handleCombat(lancer, {
              scene: this,
              player: this.player,
              heroName: this.heroName,
              emitCombatLog: (event) => this.emitCombatLog(event),
              playTone: playToneRef,
              triggerHeroAttack: () => this.triggerHeroAttack(),
              triggerLancerAttack: (target) => triggerLancerAttack(this, target),
              onLancerDeath: (target) => this.handleLancerDeath(target)
            })
          );
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
      game = new phaser.Game({
        type: phaser.AUTO,
        width: initialSize.width,
        height: initialSize.height,
        parent: container,
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
    };
    void bootGame();

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
  }, [mapData, tileManifest, ownerId, characterId, syncSessionPosition, characterName, characterLevel, initialPosition, playTone]);

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
