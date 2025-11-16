"use client";

import type * as PhaserType from "phaser";
import { useEffect, useRef, useState } from "react";
import type { CityMapData } from "@/lib/mapTypes";
import type { CharacterStats } from "@/lib/models";
import type { FactionWarState } from "@/lib/factions";
import { getCharacterSpriteConfig, getNpcSpriteConfig } from "@/lib/characterSprites";
import type { TileManifest } from "@/lib/tileManifest";
import { postJSON } from "@/lib/clientApi";
import type { BestiaryEntry } from "@/models/Bestiary";
import {
  MAP_TILE_SIZE,
  PINCH_SCALE,
  PLAYER_SPEED,
  HERO_SCALE,
  LANCER_SCALE,
  LANCER_COUNT,
  LANCER_HP,
  LANCER_SPEED,
  LANCER_COOLDOWN,
  ATTACK_DISTANCE,
  STOP_DISTANCE,
  HERO_DAMAGE_MIN,
  HERO_DAMAGE_MAX,
  LANCER_DAMAGE_MIN,
  LANCER_DAMAGE_MAX,
  MAX_ATTACKERS,
  LANCER_SEPARATION_RADIUS,
  LANCER_SEPARATION_FORCE,
  GOLD_REWARD_MIN,
  GOLD_REWARD_MAX,
  COVER_DEPTH_OFFSET,
  LANCER_XP_REWARD,
  SMALL_CRYSTAL_DROP_CHANCE,
  MEDIUM_CRYSTAL_DROP_CHANCE,
  GROUND_DROP_TTL,
  MonsterType
} from "@/components/game/constants";
import type { CollisionZone, LancerRecord, NPCRecord } from "@/components/game/types";
import { createFloorTexture, renderDetails, renderBuildings, buildCollisionZones } from "@/components/game/layers";
import { handlePlayerMovement } from "@/components/game/movement";
import { spawnNPCs, updateNPCs, updateLancers } from "@/components/game/npcAI";
import { handleCombat } from "@/components/game/combat";
import { clampPlayerDepth, randomPoint } from "@/components/game/utils";
import { triggerHeroAttack, triggerLancerAttack } from "@/components/game/playerActions";
import { setPhaserInstance } from "@/components/game/phaserInstance";
import { scheduleNpcSpeech } from "@/components/game/dialog";
import { createLancer, handleLancerDeath } from "@/components/game/lancers";
import { useSessionPosition } from "@/hooks/useSessionPosition";

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
const BESTIARY_MONSTER_ID = MonsterType.Lancer;
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
  characterXp?: number;
  warState?: FactionWarState | null;
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
  characterXp,
  warState,
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
      setPhaserInstance(Phaser);
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
        private readonly playerOwnerId = ownerId;
        private readonly playerCharacterId = characterId;
        private readonly goldCallback = goldCallbackRef;
        private readonly bestiaryCallback = bestiaryCallbackRef;
        private readonly statsCallback = statsCallbackRef;
        private dropLayer?: Phaser.GameObjects.Layer;
        private groundDrops: Array<{
          sprite: Phaser.GameObjects.Image;
          label: Phaser.GameObjects.Text;
        }> = [];

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
          this.cursors = this.input.keyboard!.createCursorKeys();
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
          } catch {
            this.spawnGroundDrop(def, position);
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

        private handleDropRewards(position: { x: number; y: number }) {
          const highRoll = Phaser.Math.Between(1, 100);
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
                this.lancers = this.lancers.filter((entry) => entry !== lancer);
                this.spawnLancer(Phaser.Math.Between(0, 1000));
              }),
            rewardItems: () => this.handleDropRewards({ x: lancer.sprite.x, y: lancer.sprite.y })
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
  }, [mapData, tileManifest, ownerId, characterId, syncSessionPosition]);

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
