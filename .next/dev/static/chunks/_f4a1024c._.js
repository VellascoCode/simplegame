(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/characterSprites.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "characterSprites",
    ()=>characterSprites,
    "getCharacterSpriteConfig",
    ()=>getCharacterSpriteConfig,
    "getNpcSpriteConfig",
    ()=>getNpcSpriteConfig
]);
const baseSize = {
    frameWidth: 192,
    frameHeight: 192
};
const characterSprites = {
    warriorblue: {
        run: {
            sheet: "/sprites/warriorblue/walk.png",
            ...baseSize,
            frames: 6,
            frameRate: 8
        },
        idle: {
            sheet: "/sprites/warriorblue/idle.png",
            ...baseSize,
            frames: 6,
            frameRate: 4
        },
        attack: {
            sheet: "/sprites/warriorblue/attack1.png",
            ...baseSize,
            frames: 4,
            frameRate: 10
        }
    }
};
const npcSprites = {
    lancer: {
        run: {
            sheet: "/sprites/lancer/walk.png",
            frameWidth: 320,
            frameHeight: 320,
            frames: 6,
            frameRate: 8
        },
        idle: {
            sheet: "/sprites/lancer/walk.png",
            frameWidth: 320,
            frameHeight: 320,
            frames: 6,
            frameRate: 8
        },
        attack: {
            sheet: "/sprites/lancer/attack.png",
            frameWidth: 320,
            frameHeight: 320,
            frames: 3,
            frameRate: 8
        }
    }
};
function getCharacterSpriteConfig(sprite) {
    return characterSprites[sprite] ?? characterSprites.warriorblue;
}
function getNpcSpriteConfig(sprite) {
    return npcSprites[sprite] ?? npcSprites.lancer;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CityPhaser.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CityPhaser",
    ()=>CityPhaser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characterSprites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/characterSprites.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const MAP_TILE_SIZE = 64;
const PINCH_SCALE = 0.95;
const PLAYER_SPEED = 220;
const HERO_SCALE = 1;
const LANCER_SCALE = 1;
const HERO_CONFIG = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characterSprites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCharacterSpriteConfig"])("warriorblue");
const HERO_RUN_KEY = "hero-run";
const HERO_IDLE_KEY = "hero-idle";
const HERO_ATTACK_KEY = "hero-attack";
const HERO_RUN_SHEET_KEY = "hero-run-sheet";
const HERO_IDLE_SHEET_KEY = "hero-idle-sheet";
const HERO_ATTACK_SHEET_KEY = "hero-attack-sheet";
const LANCER_CONFIG = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characterSprites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNpcSpriteConfig"])("lancer");
const LANCER_RUN_KEY = "lancer-run";
const LANCER_ATTACK_KEY = "lancer-attack";
const LANCER_SHEET_RUN = "lancer-run-sheet";
const LANCER_SHEET_ATTACK = "lancer-attack-sheet";
const LANCER_COUNT = 6;
const LANCER_HP = 10;
const LANCER_SPEED = 110;
const LANCER_COOLDOWN = 900;
const ATTACK_DISTANCE = 110;
const STOP_DISTANCE = 90;
const HERO_DAMAGE_MIN = 1;
const HERO_DAMAGE_MAX = 3;
const LANCER_DAMAGE_MIN = 1;
const LANCER_DAMAGE_MAX = 4;
const COVER_DEPTH_OFFSET = 220;
const NPC_COLORS = [
    0x5dade2,
    0xffa07a,
    0xfff176,
    0xa569bd
];
const LANCER_TINTS = [
    0xffe066,
    0x7dc8ff,
    0xff7d7d,
    0x94f1a4,
    0xd5b4ff,
    0xffc48c
];
const tintPalette = [
    0xffffff,
    0xffd1dc,
    0xa6e7ff,
    0xfff7c2,
    0xd5b4ff,
    0x94f1a4
];
const dPad = [
    {
        label: "↑",
        dx: 0,
        dy: -1,
        className: "pad-up"
    },
    {
        label: "↓",
        dx: 0,
        dy: 1,
        className: "pad-down"
    },
    {
        label: "←",
        dx: -1,
        dy: 0,
        className: "pad-left"
    },
    {
        label: "→",
        dx: 1,
        dy: 0,
        className: "pad-right"
    }
];
function CityPhaser({ ownerId, characterId, characterName, characterLevel, initialPosition, onPositionChange, onCombatEvent }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gameInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tileManifest, setTileManifest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mapData, setMapData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPad, setShowPad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [orientationHint, setOrientationHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [virtualDirection, setVirtualDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        dx: 0,
        dy: 0
    });
    const virtualDirectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        dx: 0,
        dy: 0
    });
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            virtualDirectionRef.current = virtualDirection;
        }
    }["CityPhaser.useEffect"], [
        virtualDirection
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            return ({
                "CityPhaser.useEffect": ()=>{
                    audioRef.current?.close().catch({
                        "CityPhaser.useEffect": ()=>undefined
                    }["CityPhaser.useEffect"]);
                }
            })["CityPhaser.useEffect"];
        }
    }["CityPhaser.useEffect"], []);
    const playTone = (frequency, duration = 0.25)=>{
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
        } catch  {
        // ignore audio failures
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            fetch("/api/tiles").then({
                "CityPhaser.useEffect": (response)=>response.json()
            }["CityPhaser.useEffect"]).then({
                "CityPhaser.useEffect": (data)=>setTileManifest(data)
            }["CityPhaser.useEffect"]).catch({
                "CityPhaser.useEffect": ()=>setFeedback("Falha ao carregar tiles.")
            }["CityPhaser.useEffect"]);
        }
    }["CityPhaser.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            const handleResize = {
                "CityPhaser.useEffect.handleResize": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    setShowPad(width < 900);
                    setOrientationHint(width < 700 && height > width);
                }
            }["CityPhaser.useEffect.handleResize"];
            handleResize();
            window.addEventListener("resize", handleResize);
            return ({
                "CityPhaser.useEffect": ()=>window.removeEventListener("resize", handleResize)
            })["CityPhaser.useEffect"];
        }
    }["CityPhaser.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            let active = true;
            async function loadMap() {
                try {
                    const response = await fetch("/api/city/map", {
                        cache: "no-store"
                    });
                    if (!response.ok) {
                        throw new Error(await response.text());
                    }
                    const data = await response.json();
                    if (active) setMapData(data.map);
                } catch (err) {
                    if (active) {
                        setFeedback(err instanceof Error ? err.message : "Falha ao carregar o mapa.");
                    }
                }
            }
            void loadMap();
            return ({
                "CityPhaser.useEffect": ()=>{
                    active = false;
                }
            })["CityPhaser.useEffect"];
        }
    }["CityPhaser.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            if (!ownerId || !characterId) return;
            if (!ref.current || !mapData || !tileManifest) return;
            if (gameInstanceRef.current) {
                gameInstanceRef.current.destroy(true);
                gameInstanceRef.current = null;
                if (ref.current) ref.current.innerHTML = "";
            }
            let game = null;
            const container = ref.current;
            ({
                "CityPhaser.useEffect": async ()=>{
                    const Phaser = await __turbopack_context__.A("[project]/node_modules/phaser/dist/phaser.js [app-client] (ecmascript, async loader)");
                    const mapReference = mapData;
                    const groundTiles = tileManifest.ground;
                    const detailTiles = tileManifest.details;
                    const buildingTiles = tileManifest.buildings;
                    const buildingLookup = new Map(buildingTiles.map({
                        "CityPhaser.useEffect": (tile)=>[
                                tile.id,
                                tile
                            ]
                    }["CityPhaser.useEffect"]));
                    const playerLabel = characterName ?? "Herói";
                    const playerLevel = characterLevel ?? 1;
                    const playToneRef = playTone;
                    const combatEventRef = onCombatEvent;
                    const positionCallbackRef = onPositionChange;
                    class CityScene extends Phaser.Scene {
                        cursors;
                        player;
                        floorLayer;
                        detailLayer;
                        map;
                        npcs = [];
                        collisionZones = [];
                        worldWidth = 0;
                        worldHeight = 0;
                        playerLabel;
                        heroName = playerLabel;
                        heroLevel = playerLevel;
                        lancers = [];
                        heroAttacking = false;
                        lastPositionSent = 0;
                        preload() {
                            groundTiles.forEach({
                                "CityPhaser.useEffect": (tile)=>{
                                    this.load.image(`ground-${tile.id}`, tile.image);
                                }
                            }["CityPhaser.useEffect"]);
                            detailTiles.forEach({
                                "CityPhaser.useEffect": (tile)=>{
                                    this.load.image(`detail-${tile.id}`, tile.image);
                                }
                            }["CityPhaser.useEffect"]);
                            buildingTiles.forEach({
                                "CityPhaser.useEffect": (tile)=>{
                                    this.load.image(`building-${tile.id}`, tile.image);
                                }
                            }["CityPhaser.useEffect"]);
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
                            this.cursors = this.input.keyboard.createCursorKeys();
                            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
                            this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
                        }
                        createAnimations() {
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
                        buildFloor() {
                            this.createFloorTexture();
                            this.map = this.make.tilemap({
                                data: mapReference.ground,
                                tileWidth: MAP_TILE_SIZE,
                                tileHeight: MAP_TILE_SIZE
                            });
                            const tileset = this.map.addTilesetImage("city-floor", "city-floor", MAP_TILE_SIZE, MAP_TILE_SIZE, 0, 0);
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
                            this.applyTints();
                        }
                        renderDetails() {
                            mapReference.detail.forEach({
                                "CityPhaser.useEffect": (row, rowIndex)=>{
                                    row.forEach({
                                        "CityPhaser.useEffect": (cell, columnIndex)=>{
                                            if (cell <= 0) return;
                                            const textureKey = `detail-${cell}`;
                                            if (!this.textures.exists(textureKey)) return;
                                            const sprite = this.add.image(columnIndex * MAP_TILE_SIZE + MAP_TILE_SIZE / 2, rowIndex * MAP_TILE_SIZE + MAP_TILE_SIZE / 2, textureKey);
                                            sprite.setOrigin(0.5, 0.5);
                                            sprite.setDepth(10 + rowIndex);
                                        }
                                    }["CityPhaser.useEffect"]);
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        createFloorTexture() {
                            if (this.textures.exists("city-floor")) return;
                            const canvas = this.textures.createCanvas("city-floor", MAP_TILE_SIZE * groundTiles.length, MAP_TILE_SIZE);
                            if (!canvas) return;
                            const ctx = canvas.getContext();
                            if (!ctx) return;
                            groundTiles.forEach({
                                "CityPhaser.useEffect": (tile, index)=>{
                                    const texture = this.textures.get(`ground-${tile.id}`);
                                    if (!texture) return;
                                    const sourceImage = texture.getSourceImage();
                                    ctx.drawImage(sourceImage, 0, 0, sourceImage.width, sourceImage.height, index * MAP_TILE_SIZE, 0, MAP_TILE_SIZE, MAP_TILE_SIZE);
                                }
                            }["CityPhaser.useEffect"]);
                            canvas.refresh();
                        }
                        renderBuildings() {
                            mapReference.buildings.forEach({
                                "CityPhaser.useEffect": (row, rowIndex)=>{
                                    row.forEach({
                                        "CityPhaser.useEffect": (cell, columnIndex)=>{
                                            if (cell <= 0) return;
                                            const def = buildingLookup.get(cell);
                                            if (!def) return;
                                            const key = `building-${def.id}`;
                                            if (!this.textures.exists(key)) return;
                                            const sprite = this.add.image(columnIndex * MAP_TILE_SIZE + MAP_TILE_SIZE / 2, rowIndex * MAP_TILE_SIZE + MAP_TILE_SIZE, key);
                                            sprite.setOrigin(0.5, 1);
                                            sprite.setDepth(sprite.y);
                                        }
                                    }["CityPhaser.useEffect"]);
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        buildCollisionZones() {
                            this.collisionZones = [];
                            mapReference.collision.forEach({
                                "CityPhaser.useEffect": (row, rowIndex)=>{
                                    row.forEach({
                                        "CityPhaser.useEffect": (value, columnIndex)=>{
                                            if (value <= 0) return;
                                            this.collisionZones.push(new Phaser.Geom.Rectangle(columnIndex * MAP_TILE_SIZE, rowIndex * MAP_TILE_SIZE, MAP_TILE_SIZE, MAP_TILE_SIZE));
                                        }
                                    }["CityPhaser.useEffect"]);
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        applyTints() {
                            if (!this.floorLayer) return;
                            this.floorLayer.forEachTile({
                                "CityPhaser.useEffect": (tile)=>{
                                    const tintValue = mapReference.tints[tile.y]?.[tile.x] ?? 0;
                                    const color = tintPalette[tintValue] ?? 0xffffff;
                                    tile.tint = color;
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        createPlayer() {
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
                            this.playerLabel = this.add.text(this.player.x, this.player.y - this.player.displayHeight - 6, text, {
                                color: "#fffbdd",
                                fontSize: "15px",
                                fontStyle: "bold",
                                stroke: "#2b1408",
                                strokeThickness: 3
                            }).setOrigin(0.5, 1).setDepth(this.player.depth + 5);
                        }
                        spawnNPCs() {
                            const names = [
                                "Sentinela",
                                "Guarda",
                                "Explorador",
                                "Mercador"
                            ];
                            for(let i = 0; i < 4; i++){
                                const sprite = this.add.sprite(Phaser.Math.Between(120, this.worldWidth - 120), Phaser.Math.Between(120, this.worldHeight - 120), HERO_IDLE_SHEET_KEY, 0);
                                sprite.setOrigin(0.5, 1);
                                sprite.setScale(HERO_SCALE);
                                sprite.setTint(NPC_COLORS[i % NPC_COLORS.length]);
                                sprite.play(HERO_IDLE_KEY);
                                sprite.setDepth(sprite.y);
                                const level = Phaser.Math.Between(3, 12);
                                const name = `${names[i % names.length]} Lv.${level}`;
                                const label = this.add.text(sprite.x, sprite.y - sprite.displayHeight - 4, name, {
                                    color: "#fff8d0",
                                    fontSize: "14px",
                                    fontStyle: "bold"
                                }).setOrigin(0.5, 1).setDepth(sprite.depth + 5);
                                const npc = {
                                    sprite,
                                    label,
                                    target: this.randomPoint(),
                                    name
                                };
                                this.scheduleSpeech(npc);
                                this.npcs.push(npc);
                            }
                        }
                        scheduleSpeech(npc) {
                            const messages = [
                                "Patrulha em andamento.",
                                "A cidade precisa de você.",
                                "Alguma troca?",
                                "Boas vindas!"
                            ];
                            this.time.addEvent({
                                delay: Phaser.Math.Between(4000, 9000),
                                callback: {
                                    "CityPhaser.useEffect": ()=>{
                                        const message = messages[Phaser.Math.Between(0, messages.length - 1)];
                                        const text = this.add.text(npc.sprite.x, npc.sprite.y - npc.sprite.displayHeight - 8, message, {
                                            color: "#fff3d4",
                                            fontSize: "13px",
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            padding: {
                                                x: 8,
                                                y: 4
                                            }
                                        }).setOrigin(0.5, 1).setDepth(npc.sprite.depth + 10).setAlpha(0);
                                        this.tweens.add({
                                            targets: text,
                                            alpha: 1,
                                            duration: 150,
                                            yoyo: true,
                                            hold: 2000,
                                            completeDelay: 300,
                                            onComplete: {
                                                "CityPhaser.useEffect": ()=>text.destroy()
                                            }["CityPhaser.useEffect"]
                                        });
                                        this.scheduleSpeech(npc);
                                    }
                                }["CityPhaser.useEffect"]
                            });
                        }
                        spawnLancers(count) {
                            for(let i = 0; i < count; i++){
                                this.spawnLancer(i);
                            }
                        }
                        spawnLancer(index = 0) {
                            const position = this.randomPoint();
                            const sprite = this.add.sprite(position.x, position.y, LANCER_SHEET_RUN, 0);
                            sprite.setOrigin(0.5, 1);
                            sprite.setScale(LANCER_SCALE);
                            sprite.setTint(LANCER_TINTS[index % LANCER_TINTS.length]);
                            sprite.play(LANCER_RUN_KEY);
                            sprite.setDepth(sprite.y);
                            const label = this.add.text(sprite.x, sprite.y - sprite.displayHeight - 4, "Lanceiro", {
                                color: "#fdf5d0",
                                fontSize: "14px",
                                fontStyle: "bold"
                            }).setOrigin(0.5, 1).setDepth(sprite.depth + 5);
                            const lancer = {
                                sprite,
                                label,
                                hp: LANCER_HP,
                                lastAttack: 0
                            };
                            this.lancers.push(lancer);
                        }
                        randomPoint() {
                            return new Phaser.Math.Vector2(Phaser.Math.Between(80, this.worldWidth - 80), Phaser.Math.Between(80, this.worldHeight - 80));
                        }
                        updateNPCs(delta) {
                            const speed = 60;
                            this.npcs.forEach({
                                "CityPhaser.useEffect": (npc)=>{
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
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        updateLancers(delta) {
                            if (!this.player) return;
                            this.lancers.forEach({
                                "CityPhaser.useEffect": (lancer)=>{
                                    if (!lancer.sprite.active) return;
                                    const dir = new Phaser.Math.Vector2(this.player.x - lancer.sprite.x, this.player.y - lancer.sprite.y);
                                    const distance = dir.length();
                                    if (distance > STOP_DISTANCE) {
                                        dir.normalize();
                                        lancer.sprite.x += dir.x * LANCER_SPEED * (delta / 1000);
                                        lancer.sprite.y += dir.y * LANCER_SPEED * (delta / 1000);
                                        lancer.sprite.setFlipX(dir.x < 0);
                                        lancer.sprite.play(LANCER_RUN_KEY, true);
                                    }
                                    lancer.sprite.setDepth(lancer.sprite.y);
                                    lancer.label.setPosition(lancer.sprite.x, lancer.sprite.y - lancer.sprite.displayHeight - 4).setDepth(lancer.sprite.depth + 5);
                                    if (distance < ATTACK_DISTANCE) {
                                        this.handleCombat(lancer);
                                    }
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        handleCombat(lancer) {
                            const now = this.time.now;
                            if (now - lancer.lastAttack < LANCER_COOLDOWN) return;
                            lancer.lastAttack = now;
                            this.triggerHeroAttack();
                            this.triggerLancerAttack(lancer);
                            const heroDamage = Phaser.Math.Between(HERO_DAMAGE_MIN, HERO_DAMAGE_MAX);
                            const lancerDamage = Phaser.Math.Between(LANCER_DAMAGE_MIN, LANCER_DAMAGE_MAX);
                            this.showFloatingText(lancer.sprite.x, lancer.sprite.y - lancer.sprite.displayHeight, `-${heroDamage} HP`, "#fff6c4");
                            this.emitCombatLog({
                                message: `${lancer.label.text} perdeu ${heroDamage} HP`,
                                tone: "damage"
                            });
                            this.showFloatingText(this.player.x, this.player.y - this.player.displayHeight - 6, `-${lancerDamage} HP`, "#ff7a7a");
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
                        triggerHeroAttack() {
                            if (!HERO_CONFIG.attack || this.heroAttacking) return;
                            this.heroAttacking = true;
                            this.player.play(HERO_ATTACK_KEY, true);
                            const duration = HERO_CONFIG.attack.frames / HERO_CONFIG.attack.frameRate * 1000;
                            this.time.delayedCall(duration, {
                                "CityPhaser.useEffect": ()=>{
                                    this.heroAttacking = false;
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        triggerLancerAttack(lancer) {
                            if (!LANCER_CONFIG.attack) return;
                            lancer.sprite.play(LANCER_ATTACK_KEY, true);
                            const duration = LANCER_CONFIG.attack.frames / LANCER_CONFIG.attack.frameRate * 1000;
                            this.time.delayedCall(duration, {
                                "CityPhaser.useEffect": ()=>{
                                    if (lancer.sprite.active) {
                                        lancer.sprite.play(LANCER_RUN_KEY, true);
                                    }
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        handleLancerDeath(lancer) {
                            this.showFloatingText(this.player.x, this.player.y - this.player.displayHeight - 30, "+2 XP", "#94f1a4");
                            this.emitCombatLog({
                                message: "+2 XP",
                                tone: "xp"
                            });
                            playToneRef(620);
                            this.tweens.add({
                                targets: [
                                    lancer.sprite,
                                    lancer.label
                                ],
                                alpha: 0,
                                duration: 250,
                                onComplete: {
                                    "CityPhaser.useEffect": ()=>{
                                        lancer.sprite.destroy();
                                        lancer.label.destroy();
                                        this.lancers = this.lancers.filter({
                                            "CityPhaser.useEffect": (entry)=>entry !== lancer
                                        }["CityPhaser.useEffect"]);
                                        this.time.delayedCall(600, {
                                            "CityPhaser.useEffect": ()=>this.spawnLancer(Phaser.Math.Between(0, 1000))
                                        }["CityPhaser.useEffect"]);
                                    }
                                }["CityPhaser.useEffect"]
                            });
                        }
                        showFloatingText(x, y, text, color) {
                            const floating = this.add.text(x, y, text, {
                                color,
                                fontSize: "16px",
                                fontStyle: "bold"
                            }).setOrigin(0.5, 1).setDepth(2000).setAlpha(0.95);
                            this.tweens.add({
                                targets: floating,
                                y: y - 30,
                                alpha: 0,
                                duration: 600,
                                onComplete: {
                                    "CityPhaser.useEffect": ()=>floating.destroy()
                                }["CityPhaser.useEffect"]
                            });
                        }
                        syncPlayerPosition(x, y) {
                            if (!positionCallbackRef) return;
                            const now = this.time.now;
                            if (now - this.lastPositionSent < 750) return;
                            this.lastPositionSent = now;
                            positionCallbackRef({
                                x,
                                y
                            });
                        }
                        emitCombatLog(event) {
                            combatEventRef?.(event);
                        }
                        update(_, delta) {
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
                            const proposedX = Phaser.Math.Clamp(this.player.x + dx * PLAYER_SPEED * (delta / 1000), this.player.displayWidth / 2, this.worldWidth - this.player.displayWidth / 2);
                            const proposedY = Phaser.Math.Clamp(this.player.y + dy * PLAYER_SPEED * (delta / 1000), this.player.displayHeight / 2, this.worldHeight);
                            const collidesWithNPC = this.npcs.some({
                                "CityPhaser.useEffect.collidesWithNPC": (npc)=>Phaser.Math.Distance.Between(npc.sprite.x, npc.sprite.y, proposedX, proposedY) < 40
                            }["CityPhaser.useEffect.collidesWithNPC"]);
                            const playerFeet = new Phaser.Geom.Circle(proposedX, proposedY - 8, 18);
                            const collidesWithCollision = this.collisionZones.some({
                                "CityPhaser.useEffect.collidesWithCollision": (zone)=>Phaser.Geom.Intersects.CircleToRectangle(playerFeet, zone)
                            }["CityPhaser.useEffect.collidesWithCollision"]);
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
                                this.playerLabel.setPosition(this.player.x, this.player.y - this.player.displayHeight - 6);
                                this.playerLabel.setDepth(this.player.depth + 5);
                            }
                            this.updateNPCs(delta);
                            this.updateLancers(delta);
                        }
                    }
                    const getSize = {
                        "CityPhaser.useEffect.getSize": ()=>{
                            const containerWidth = ref.current?.clientWidth ?? window.innerWidth ?? 960;
                            const targetWidth = Math.min(containerWidth * PINCH_SCALE, (window.innerWidth ?? containerWidth) - 32);
                            const width = Math.max(860, Math.round(targetWidth));
                            const height = Math.min(Math.round(width * 0.75), Math.round((window.innerHeight ?? width) * 0.8));
                            return {
                                width,
                                height
                            };
                        }
                    }["CityPhaser.useEffect.getSize"];
                    const initialSize = getSize();
                    game = new Phaser.Game({
                        type: Phaser.AUTO,
                        width: initialSize.width,
                        height: initialSize.height,
                        parent: ref.current,
                        backgroundColor: "#1a0a05",
                        scene: CityScene,
                        render: {
                            pixelArt: true,
                            antialias: false
                        }
                    });
                    gameInstanceRef.current = game;
                    const handleResize = {
                        "CityPhaser.useEffect.handleResize": ()=>{
                            const size = getSize();
                            game?.scale.resize(size.width, size.height);
                        }
                    }["CityPhaser.useEffect.handleResize"];
                    window.addEventListener("resize", handleResize);
                    const cleanup = {
                        "CityPhaser.useEffect.cleanup": ()=>window.removeEventListener("resize", handleResize)
                    }["CityPhaser.useEffect.cleanup"];
                    game.events?.once("destroy", cleanup);
                }
            })["CityPhaser.useEffect"]();
            return ({
                "CityPhaser.useEffect": ()=>{
                    if (game) {
                        game.destroy(true);
                    }
                    if (gameInstanceRef.current === game) {
                        gameInstanceRef.current = null;
                    }
                    if (container) {
                        container.innerHTML = "";
                    }
                }
            })["CityPhaser.useEffect"];
        }
    }["CityPhaser.useEffect"], [
        mapData,
        tileManifest,
        characterName,
        characterLevel,
        initialPosition,
        onPositionChange,
        onCombatEvent,
        ownerId,
        characterId
    ]);
    const startDirection = (dx, dy)=>()=>setVirtualDirection({
                dx,
                dy
            });
    const stopDirection = ()=>setVirtualDirection({
            dx: 0,
            dy: 0
        });
    if (feedback) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: feedback
    }, void 0, false, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 866,
        columnNumber: 24
    }, this);
    if (!mapData) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Carregando mapa…"
    }, void 0, false, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 867,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "phaser-wrapper",
                ref: ref
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 871,
                columnNumber: 7
            }, this),
            orientationHint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "orientation-hint",
                children: "Melhor experiência na horizontal — gire o dispositivo."
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 873,
                columnNumber: 9
            }, this),
            showPad && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "virtual-pad",
                children: dPad.map((button)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `virtual-pad-button ${button.className}`,
                        onPointerDown: startDirection(button.dx, button.dy),
                        onPointerUp: stopDirection,
                        onPointerLeave: stopDirection,
                        onPointerCancel: stopDirection,
                        type: "button",
                        "aria-label": `Mover ${button.label}`,
                        children: button.label
                    }, button.className, false, {
                        fileName: "[project]/components/CityPhaser.tsx",
                        lineNumber: 878,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 876,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 870,
        columnNumber: 5
    }, this);
}
_s(CityPhaser, "V1gJydjduUhZNfseluFlu98gxi8=");
_c = CityPhaser;
var _c;
__turbopack_context__.k.register(_c, "CityPhaser");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/clientApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getJSON",
    ()=>getJSON,
    "postJSON",
    ()=>postJSON
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const rawBase = ("TURBOPACK compile-time value", "http://localhost:3001/")?.trim() ?? "";
const API_BASE = /^https?:\/\//i.test(rawBase) ? rawBase.replace(/\/$/, "") : "";
function buildUrl(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    if (!API_BASE) return normalizedPath;
    if (API_BASE.endsWith("/api") && normalizedPath.startsWith("/api")) {
        const trimmed = normalizedPath.slice(4) || "/";
        return `${API_BASE}${trimmed}`;
    }
    return `${API_BASE}${normalizedPath}`;
}
async function getJSON(path) {
    const response = await fetch(buildUrl(path), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-store"
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return await response.json();
}
async function postJSON(path, body) {
    const response = await fetch(buildUrl(path), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return await response.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/OnlinePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnlinePanel",
    ()=>OnlinePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function OnlinePanel({ ownerId }) {
    _s();
    const [list, setList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnlinePanel.useEffect": ()=>{
            let active = true;
            async function load() {
                try {
                    const presences = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])("/api/online/list");
                    if (active) {
                        setList(presences);
                    }
                } catch (err) {
                    console.warn("Falha ao carregar online", err);
                }
            }
            load();
            const interval = setInterval(load, 10000);
            return ({
                "OnlinePanel.useEffect": ()=>{
                    active = false;
                    clearInterval(interval);
                }
            })["OnlinePanel.useEffect"];
        }
    }["OnlinePanel.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnlinePanel.useEffect": ()=>{
            if (!ownerId) {
                return;
            }
            async function ping() {
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/online/ping", {
                        ownerId
                    });
                } catch (err) {
                    console.warn("Falha ao enviar ping", err);
                }
            }
            ping();
            const interval = setInterval(ping, 10000);
            return ({
                "OnlinePanel.useEffect": ()=>{
                    clearInterval(interval);
                }
            })["OnlinePanel.useEffect"];
        }
    }["OnlinePanel.useEffect"], [
        ownerId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: [
                    "Jogadores online (",
                    list.length,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/components/OnlinePanel.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "list",
                children: [
                    list.map((presence)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                presence.ownerId,
                                " — ping ",
                                new Date(presence.lastPing).toLocaleTimeString()
                            ]
                        }, presence.ownerId, true, {
                            fileName: "[project]/components/OnlinePanel.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)),
                    list.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "Nenhum jogador ativo."
                    }, void 0, false, {
                        fileName: "[project]/components/OnlinePanel.tsx",
                        lineNumber: 65,
                        columnNumber: 31
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OnlinePanel.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/OnlinePanel.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(OnlinePanel, "eJ5g374pNl+GUKfhAwNu05jzdgs=");
_c = OnlinePanel;
var _c;
__turbopack_context__.k.register(_c, "OnlinePanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/OnlineBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnlineBadge",
    ()=>OnlineBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function OnlineBadge() {
    _s();
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnlineBadge.useEffect": ()=>{
            let active = true;
            async function load() {
                try {
                    const list = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])("/api/online/list");
                    if (active) setCount(list.length);
                } catch  {
                    if (active) setCount(0);
                }
            }
            load();
            const interval = window.setInterval(load, 10000);
            return ({
                "OnlineBadge.useEffect": ()=>{
                    active = false;
                    window.clearInterval(interval);
                }
            })["OnlineBadge.useEffect"];
        }
    }["OnlineBadge.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "online-badge",
        "aria-label": `Jogadores online: ${count}`,
        children: count
    }, void 0, false, {
        fileName: "[project]/components/OnlineBadge.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(OnlineBadge, "/xL7qdScToREtqzbt5GZ1kHtYjQ=");
_c = OnlineBadge;
var _c;
__turbopack_context__.k.register(_c, "OnlineBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/BottomMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BottomMenu",
    ()=>BottomMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const menuLinks = [
    {
        id: "admin",
        label: "Admin",
        path: "/editor"
    },
    {
        id: "cidade",
        label: "Cidade",
        path: "/city"
    },
    {
        id: "casa",
        label: "Casa",
        path: "/house"
    },
    {
        id: "farm",
        label: "Fazenda",
        path: "/farm"
    },
    {
        id: "forest",
        label: "Floresta",
        path: "/forest"
    },
    {
        id: "shops",
        label: "Lojas",
        path: "/shops"
    },
    {
        id: "chat",
        label: "Chat",
        path: "/chat"
    }
];
function BottomMenu({ variant = "page", buttons, square = false } = {}) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    function handleNavigate(path) {
        if ("TURBOPACK compile-time truthy", 1) {
            window.localStorage.setItem("lastRoute", path);
            window.dispatchEvent(new CustomEvent("lastRouteChange", {
                detail: path
            }));
        }
        router.push(path);
    }
    const items = buttons ?? menuLinks;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `bottom-menu${variant === "overlay" ? " bottom-menu--overlay" : ""}`,
        children: items.map((item)=>{
            const classes = [
                square ? "bottom-menu-square" : undefined,
                item.active ? "is-active" : undefined
            ].filter(Boolean).join(" ");
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: classes || undefined,
                onClick: ()=>{
                    if (item.onClick) {
                        item.onClick();
                    } else if (item.path) {
                        handleNavigate(item.path);
                    }
                },
                "aria-label": item.ariaLabel ?? item.label,
                children: [
                    item.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: item.icon,
                        alt: ""
                    }, void 0, false, {
                        fileName: "[project]/components/BottomMenu.tsx",
                        lineNumber: 67,
                        columnNumber: 24
                    }, this) : item.label,
                    !item.icon && item.label
                ]
            }, item.id, true, {
                fileName: "[project]/components/BottomMenu.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/BottomMenu.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(BottomMenu, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BottomMenu;
var _c;
__turbopack_context__.k.register(_c, "BottomMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/InventoryPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InventoryPanel",
    ()=>InventoryPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const SLOT_COUNT = 20;
const GRID_COLUMNS = 5;
const STACK_LIMIT = 10;
const itemDefinitions = {
    item1: {
        name: "Poção de Mana",
        icon: "/itens/item1.png",
        stackable: true,
        maxStack: STACK_LIMIT
    },
    item10: {
        name: "Poção de Vida",
        icon: "/itens/item10.png",
        stackable: true,
        maxStack: STACK_LIMIT
    }
};
const presetItems = [
    {
        id: "item1",
        quantity: 1
    },
    {
        id: "item10",
        quantity: 1
    }
];
function InventoryPanel({ ownerId, onItemsChange, onItemUsed }) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InventoryPanel.useEffect": ()=>{
            if (!ownerId) {
                setItems([]);
                return;
            }
            loadInventory(ownerId);
        }
    }["InventoryPanel.useEffect"], [
        ownerId
    ]);
    async function loadInventory(id) {
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])(`/api/inventory/get?ownerId=${id}`);
            setItems(response);
            setFeedback(null);
            onItemsChange?.(response);
        } catch (err) {
            setFeedback(getMessage(err));
        }
    }
    async function handleQuickAdd(item) {
        if (!ownerId) return;
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/inventory/add", {
                ownerId,
                item: {
                    id: item.id,
                    name: itemDefinitions[item.id].name,
                    quantity: item.quantity
                }
            });
            setItems(response);
            onItemsChange?.(response);
            setFeedback(`${itemDefinitions[item.id].name} adicionado.`);
        } catch (err) {
            setFeedback(getMessage(err));
        }
    }
    async function handleConsume(itemId) {
        if (!ownerId) return;
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/inventory/remove", {
                ownerId,
                itemId,
                quantity: 1
            });
            setItems(response);
            onItemsChange?.(response);
            onItemUsed?.(itemId);
            setFeedback("Item consumido.");
        } catch (err) {
            setFeedback(getMessage(err));
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: "Inventário"
            }, void 0, false, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: feedback
            }, void 0, false, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 91,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inventory-grid",
                style: {
                    gridTemplateColumns: `repeat(${GRID_COLUMNS}, 64px)`
                },
                children: buildSlotItems(items).map((slot, index)=>{
                    if (!slot) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inventory-slot empty"
                        }, index, false, {
                            fileName: "[project]/components/InventoryPanel.tsx",
                            lineNumber: 98,
                            columnNumber: 20
                        }, this);
                    }
                    const def = itemDefinitions[slot.id];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "inventory-slot",
                        type: "button",
                        onClick: ()=>handleConsume(slot.id),
                        children: [
                            def?.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: def.icon,
                                alt: slot.name
                            }, void 0, false, {
                                fileName: "[project]/components/InventoryPanel.tsx",
                                lineNumber: 108,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: slot.name
                            }, void 0, false, {
                                fileName: "[project]/components/InventoryPanel.tsx",
                                lineNumber: 108,
                                columnNumber: 69
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "quantity",
                                children: slot.quantity
                            }, void 0, false, {
                                fileName: "[project]/components/InventoryPanel.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${slot.id}-${index}`, true, {
                        fileName: "[project]/components/InventoryPanel.tsx",
                        lineNumber: 102,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        children: "Adicionar itens comuns"
                    }, void 0, false, {
                        fileName: "[project]/components/InventoryPanel.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid",
                        style: {
                            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))"
                        },
                        children: presetItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                type: "button",
                                onClick: ()=>handleQuickAdd(item),
                                style: {
                                    textAlign: "center"
                                },
                                children: itemDefinitions[item.id].name
                            }, item.id, false, {
                                fileName: "[project]/components/InventoryPanel.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/InventoryPanel.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InventoryPanel.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(InventoryPanel, "ATfrwRrOJ6xLSxKNnF6r/XGtph8=");
_c = InventoryPanel;
function getMessage(err) {
    return err instanceof Error ? err.message : "Erro no inventário";
}
function buildSlotItems(items) {
    const slots = Array.from({
        length: SLOT_COUNT
    }, ()=>null);
    let index = 0;
    for (const item of items){
        if (index >= SLOT_COUNT) break;
        slots[index] = item;
        index += 1;
    }
    return slots;
}
var _c;
__turbopack_context__.k.register(_c, "InventoryPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ChatPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatPanel",
    ()=>ChatPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ChatPanel({ ownerId: forcedOwnerId, characterName }) {
    _s();
    const [ownerId, setOwnerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(forcedOwnerId ?? "");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(characterName ?? "");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPanel.useEffect": ()=>{
            let active = true;
            async function load() {
                try {
                    const list = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])("/api/chat/get");
                    if (active) {
                        setMessages(list);
                    }
                } catch (err) {
                    if (active) {
                        setError(getMessage(err));
                    }
                }
            }
            load();
            const interval = setInterval(load, 3000);
            return ({
                "ChatPanel.useEffect": ()=>{
                    active = false;
                    clearInterval(interval);
                }
            })["ChatPanel.useEffect"];
        }
    }["ChatPanel.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPanel.useEffect": ()=>{
            if (forcedOwnerId) {
                setOwnerId(forcedOwnerId);
            }
        }
    }["ChatPanel.useEffect"], [
        forcedOwnerId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPanel.useEffect": ()=>{
            if (characterName) {
                setName(characterName);
            }
        }
    }["ChatPanel.useEffect"], [
        characterName
    ]);
    async function handleSend(event) {
        event.preventDefault();
        if (!ownerId) {
            setError("Informe o ownerId para enviar ao chat.");
            return;
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/chat/send", {
                ownerId,
                name: name || undefined,
                message
            });
            setMessage("");
            setError(null);
        } catch (err) {
            setError(getMessage(err));
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "chat-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: "Chat Global"
            }, void 0, false, {
                fileName: "[project]/components/ChatPanel.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: error
            }, void 0, false, {
                fileName: "[project]/components/ChatPanel.tsx",
                lineNumber: 73,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chat-log",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "list",
                    children: [
                        messages.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: entry.characterName ?? entry.ownerId
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatPanel.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this),
                                    ": ",
                                    entry.message,
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: new Date(entry.createdAt).toLocaleTimeString()
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatPanel.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, entry.id, true, {
                                fileName: "[project]/components/ChatPanel.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)),
                        messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: "Nenhuma mensagem."
                        }, void 0, false, {
                            fileName: "[project]/components/ChatPanel.tsx",
                            lineNumber: 82,
                            columnNumber: 37
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChatPanel.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ChatPanel.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "chat-form",
                onSubmit: handleSend,
                children: [
                    !forcedOwnerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "chat-owner",
                        value: ownerId,
                        onChange: (event)=>setOwnerId(event.target.value),
                        placeholder: "Owner ID",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/components/ChatPanel.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this),
                    !characterName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "chat-name",
                        value: name,
                        onChange: (event)=>setName(event.target.value),
                        placeholder: "Nome do personagem"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatPanel.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "chat-message",
                        value: message,
                        maxLength: 280,
                        onChange: (event)=>setMessage(event.target.value),
                        placeholder: "Digite sua mensagem",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/components/ChatPanel.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button",
                        children: "Enviar"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatPanel.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatPanel.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatPanel.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(ChatPanel, "Iyd2NNrQTy8eLh1wr/sNo17fZ8E=");
_c = ChatPanel;
function getMessage(err) {
    return err instanceof Error ? err.message : "Falha no chat";
}
var _c;
__turbopack_context__.k.register(_c, "ChatPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/city/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CityPhaser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CityPhaser.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlinePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OnlinePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlineBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OnlineBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BottomMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BottomMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InventoryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InventoryPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChatPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function CityPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const [sessionState, setSessionState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [characterInfo, setCharacterInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingSession, setLoadingSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [hudEffect, setHudEffect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inventoryOpen, setInventoryOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chatOpen, setChatOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [accountOpen, setAccountOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [craftingOpen, setCraftingOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMiniMap, setShowMiniMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [playerPosition, setPlayerPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inventoryVersion, setInventoryVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [combatLog, setCombatLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const ownerId = sessionState?.ownerId ?? "";
    const characterId = sessionState?.characterId ?? "";
    const loadSelectedCharacter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CityPage.useCallback[loadSelectedCharacter]": async (currentOwnerId, currentCharacterId)=>{
            if (!currentOwnerId || !currentCharacterId) {
                setCharacterInfo(null);
                return;
            }
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])(`/api/character/get?ownerId=${currentOwnerId}&characterId=${currentCharacterId}`);
                setCharacterInfo(data);
            } catch (err) {
                setCharacterInfo(null);
                setFeedback(getMessage(err));
            }
        }
    }["CityPage.useCallback[loadSelectedCharacter]"], []);
    const loadSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CityPage.useCallback[loadSession]": async ()=>{
            setLoadingSession(true);
            setFeedback(null);
            try {
                const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])("/api/session/state");
                setSessionState(session);
                setPlayerPosition(session.position);
                await loadSelectedCharacter(session.ownerId, session.characterId);
            } catch (err) {
                setSessionState(null);
                setCharacterInfo(null);
                setFeedback(getMessage(err));
            } finally{
                setLoadingSession(false);
            }
        }
    }["CityPage.useCallback[loadSession]"], [
        loadSelectedCharacter
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPage.useEffect": ()=>{
            if (status === "authenticated") {
                void loadSession();
            } else if (status === "unauthenticated") {
                setSessionState(null);
                setCharacterInfo(null);
                setLoadingSession(false);
                router.replace("/");
            }
        }
    }["CityPage.useEffect"], [
        status,
        loadSession,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPage.useEffect": ()=>{
            if (!hudEffect) return;
            const timeout = window.setTimeout({
                "CityPage.useEffect.timeout": ()=>setHudEffect(null)
            }["CityPage.useEffect.timeout"], 1200);
            return ({
                "CityPage.useEffect": ()=>window.clearTimeout(timeout)
            })["CityPage.useEffect"];
        }
    }["CityPage.useEffect"], [
        hudEffect
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPage.useEffect": ()=>{
            const interval = window.setInterval({
                "CityPage.useEffect.interval": ()=>{
                    setCombatLog({
                        "CityPage.useEffect.interval": (current)=>current.filter({
                                "CityPage.useEffect.interval": (entry)=>Date.now() - entry.createdAt < 5000
                            }["CityPage.useEffect.interval"])
                    }["CityPage.useEffect.interval"]);
                }
            }["CityPage.useEffect.interval"], 1000);
            return ({
                "CityPage.useEffect": ()=>window.clearInterval(interval)
            })["CityPage.useEffect"];
        }
    }["CityPage.useEffect"], []);
    function handleItemUsed(itemId) {
        if (itemId === "item1") {
            setHudEffect({
                type: "mana",
                id: Date.now()
            });
        } else if (itemId === "item10") {
            setHudEffect({
                type: "vida",
                id: Date.now()
            });
        }
    }
    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", {
                method: "POST"
            });
        } catch  {
        // ignore
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])({
            redirect: false
        });
        router.replace("/");
    }
    const actionButtons = [
        {
            id: "inventory",
            label: "INV",
            icon: "/icons/inv.png",
            ariaLabel: "Abrir inventário",
            onClick: ()=>setInventoryOpen(true)
        },
        {
            id: "crafting",
            label: "CRFT",
            icon: "/icons/icon-crafting.svg",
            ariaLabel: "Abrir livro de crafting",
            onClick: ()=>setCraftingOpen(true)
        },
        {
            id: "minimap",
            label: "MAP",
            icon: "/icons/icon-map.svg",
            ariaLabel: "Alternar mini mapa",
            onClick: ()=>setShowMiniMap((previous)=>!previous),
            active: showMiniMap
        },
        {
            id: "chat",
            label: "CHAT",
            icon: "/icons/chat.png",
            ariaLabel: "Abrir chat",
            onClick: ()=>setChatOpen(true)
        },
        {
            id: "account",
            label: "ACC",
            icon: "/icons/icon-board.svg",
            ariaLabel: "Minha conta",
            onClick: ()=>setAccountOpen(true)
        },
        {
            id: "settings",
            label: "CFG",
            ariaLabel: "Configurações",
            onClick: ()=>setSettingsOpen(true)
        },
        {
            id: "logout",
            label: "OUT",
            icon: "/icons/logout.png",
            ariaLabel: "Sair do jogo",
            onClick: handleLogout
        }
    ];
    function notifyInventoryChange() {
        setInventoryVersion((previous)=>previous + 1);
    }
    const handlePositionChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CityPage.useCallback[handlePositionChange]": (position)=>{
            setPlayerPosition(position);
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/session/position", {
                x: position.x,
                y: position.y,
                map: sessionState?.map ?? "city"
            }).catch({
                "CityPage.useCallback[handlePositionChange]": ()=>undefined
            }["CityPage.useCallback[handlePositionChange]"]);
        }
    }["CityPage.useCallback[handlePositionChange]"], [
        sessionState?.map
    ]);
    const handleCombatEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CityPage.useCallback[handleCombatEvent]": (event)=>{
            setCombatLog({
                "CityPage.useCallback[handleCombatEvent]": (current)=>[
                        ...current,
                        {
                            id: `${Date.now()}-${Math.random()}`,
                            message: event.message,
                            tone: event.tone,
                            createdAt: Date.now()
                        }
                    ]
            }["CityPage.useCallback[handleCombatEvent]"]);
        }
    }["CityPage.useCallback[handleCombatEvent]"], []);
    if (status === "loading" || loadingSession) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Carregando sessão…"
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 203,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/city/page.tsx",
            lineNumber: 202,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "city-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "map-layout",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "map-stage",
                    children: [
                        ownerId && characterId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CityPhaser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CityPhaser"], {
                            ownerId: ownerId,
                            characterId: characterId,
                            characterName: characterInfo?.name,
                            characterLevel: characterInfo?.stats.level,
                            initialPosition: sessionState?.position,
                            onPositionChange: handlePositionChange,
                            onCombatEvent: handleCombatEvent
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 213,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Faça login e selecione um personagem para carregar o mapa."
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, this),
                        characterInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CityHud, {
                            stats: characterInfo.stats
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 225,
                            columnNumber: 29
                        }, this),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickSlots, {
                            ownerId: ownerId,
                            refreshKey: inventoryVersion,
                            onItemUsed: handleItemUsed,
                            onInventoryChange: notifyInventoryChange
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlineBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnlineBadge"], {}, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 234,
                            columnNumber: 23
                        }, this),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BottomMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BottomMenu"], {
                            variant: "overlay",
                            buttons: actionButtons,
                            square: true
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 235,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniMapOverlay, {
                            visible: Boolean(ownerId && showMiniMap),
                            position: playerPosition ?? sessionState?.position
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CombatLog, {
                            entries: combatLog
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 211,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            hudEffect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `potion-effect ${hudEffect.type}`,
                children: hudEffect.type === "mana" ? "+ Mana" : "+ Vida"
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this),
            feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: feedback
                }, void 0, false, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 250,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 249,
                columnNumber: 9
            }, this),
            ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlinePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnlinePanel"], {
                        ownerId: ownerId
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 256,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 255,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 254,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InventoryDrawer, {
                open: inventoryOpen,
                onClose: ()=>setInventoryOpen(false),
                ownerId: ownerId,
                onItemUsed: handleItemUsed,
                onInventoryChange: notifyInventoryChange
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatDrawer, {
                open: chatOpen,
                onClose: ()=>setChatOpen(false),
                ownerId: ownerId,
                characterName: characterInfo?.name
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PanelDrawer, {
                title: "Minha conta",
                open: accountOpen,
                onClose: ()=>setAccountOpen(false),
                content: characterInfo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "panel-section",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Owner ID: ",
                                characterInfo.ownerId
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 275,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Personagem ativo: ",
                                characterInfo.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 276,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Nível: ",
                                characterInfo.stats.level
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 277,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 274,
                    columnNumber: 13
                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Nenhum personagem carregado."
                }, void 0, false, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 280,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PanelDrawer, {
                title: "Configurações",
                open: settingsOpen,
                onClose: ()=>setSettingsOpen(false),
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Configurações gerais do jogo serão adicionadas aqui."
                }, void 0, false, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 288,
                    columnNumber: 18
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CraftingDrawer, {
                open: craftingOpen,
                onClose: ()=>setCraftingOpen(false)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
_s(CityPage, "i6EByCJ+n6YhQaNkqOzz72LHUWo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = CityPage;
function getMessage(err) {
    return err instanceof Error ? err.message : "Falha ao carregar personagem";
}
function CityHud({ stats }) {
    const bars = [
        {
            key: "hp",
            label: "HP",
            value: stats.hp,
            max: 100
        },
        {
            key: "energy",
            label: "ENERGIA",
            value: stats.energy,
            max: 100
        },
        {
            key: "xp",
            label: "XP",
            value: stats.xp,
            max: 100
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "city-hud",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "city-hud-bars",
                children: bars.map((bar)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `city-hud-bar city-hud-bar--${bar.key}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "city-hud-label",
                                children: bar.label
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "city-hud-track",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "city-hud-fill",
                                    style: {
                                        width: `${Math.min(100, bar.value)}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/city/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "city-hud-value",
                                children: bar.value
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, this)
                        ]
                    }, bar.key, true, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "city-hud-level",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "NVL"
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 320,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: stats.level
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_c1 = CityHud;
function QuickSlots({ ownerId, refreshKey, onItemUsed, onInventoryChange }) {
    _s1();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [slotRefs, setSlotRefs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        null,
        null,
        null,
        null
    ]);
    const [pickerSlot, setPickerSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const iconMap = {
        item1: "/itens/item1.png",
        item10: "/itens/item10.png"
    };
    if (!ownerId) return null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickSlots.useEffect": ()=>{
            if (!ownerId) return;
            void loadInventory();
            void loadSlotRefs();
            async function loadInventory() {
                try {
                    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])(`/api/inventory/get?ownerId=${ownerId}`);
                    setItems(response);
                    pruneSlots(response);
                } catch  {
                    setItems([]);
                }
            }
            async function loadSlotRefs() {
                try {
                    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])("/api/quickslots");
                    setSlotRefs(response.slots);
                } catch  {
                    setSlotRefs([
                        null,
                        null,
                        null,
                        null
                    ]);
                }
            }
        }
    }["QuickSlots.useEffect"], [
        ownerId,
        refreshKey
    ]);
    const resolvedSlots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickSlots.useMemo[resolvedSlots]": ()=>slotRefs.map({
                "QuickSlots.useMemo[resolvedSlots]": (ref)=>ref ? items.find({
                        "QuickSlots.useMemo[resolvedSlots]": (item)=>item.id === ref
                    }["QuickSlots.useMemo[resolvedSlots]"]) ?? null : null
            }["QuickSlots.useMemo[resolvedSlots]"])
    }["QuickSlots.useMemo[resolvedSlots]"], [
        slotRefs,
        items
    ]);
    async function consumeSlot(index) {
        const slot = resolvedSlots[index];
        if (!slot) {
            setPickerSlot(index);
            return;
        }
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/inventory/remove", {
                ownerId,
                itemId: slot.id,
                quantity: 1
            });
            setItems(updated);
            pruneSlots(updated);
            onItemUsed?.(slot.id);
            onInventoryChange?.();
        } catch  {
        // ignore errors
        }
    }
    async function assignSlot(item, index) {
        const nextRefs = slotRefs.map((ref, slotIndex)=>slotIndex === index ? item.id : ref);
        setSlotRefs(nextRefs);
        setPickerSlot(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/quickslots", {
                slots: nextRefs
            });
        } catch  {
        // ignore
        }
    }
    function pruneSlots(reference) {
        setSlotRefs((previous)=>{
            let changed = false;
            const next = previous.map((ref)=>{
                if (!ref) return null;
                const exists = reference.some((item)=>item.id === ref && item.quantity > 0);
                if (!exists) {
                    changed = true;
                    return null;
                }
                return ref;
            });
            if (changed) {
                void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/quickslots", {
                    slots: next
                }).catch(()=>undefined);
                return next;
            }
            return previous;
        });
    }
    const availableItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickSlots.useMemo[availableItems]": ()=>items.filter({
                "QuickSlots.useMemo[availableItems]": (item)=>item.quantity > 0
            }["QuickSlots.useMemo[availableItems]"])
    }["QuickSlots.useMemo[availableItems]"], [
        items
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "quick-slots",
        children: [
            resolvedSlots.map((slot, index)=>{
                const icon = slot ? iconMap[slot.id] : undefined;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: `quick-slot${slot ? " filled" : ""}`,
                    onClick: ()=>consumeSlot(index),
                    children: [
                        slot && icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: icon,
                            alt: slot.name
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 443,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "+"
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 443,
                            columnNumber: 66
                        }, this),
                        slot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                            children: slot.quantity
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 444,
                            columnNumber: 22
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 437,
                    columnNumber: 11
                }, this);
            }),
            pickerSlot !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "quick-slot-picker",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Escolha o item para o slot ",
                            pickerSlot + 1
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 450,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "picker-grid",
                        children: [
                            availableItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>assignSlot(item, pickerSlot),
                                    children: [
                                        item.name,
                                        " (",
                                        item.quantity,
                                        ")"
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/app/city/page.tsx",
                                    lineNumber: 453,
                                    columnNumber: 15
                                }, this)),
                            availableItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Sem itens disponíveis."
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 457,
                                columnNumber: 45
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 451,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "button",
                        onClick: ()=>setPickerSlot(null),
                        children: "Fechar"
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 459,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 449,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 433,
        columnNumber: 5
    }, this);
}
_s1(QuickSlots, "JGf8QKOgYK3TirCr1p8XFrlKEGI=");
_c2 = QuickSlots;
function Drawer({ open, onClose, children, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `city-drawer ${open ? "open" : ""}`,
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "city-drawer-card",
            onClick: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 480,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 481,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 479,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "city-drawer-content",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 485,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/city/page.tsx",
            lineNumber: 478,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 477,
        columnNumber: 5
    }, this);
}
_c3 = Drawer;
function InventoryDrawer({ open, onClose, ownerId, onItemUsed, onInventoryChange }) {
    if (!ownerId) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: "Inventário",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InventoryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InventoryPanel"], {
            ownerId: ownerId,
            onItemUsed: onItemUsed,
            onItemsChange: ()=>onInventoryChange?.()
        }, void 0, false, {
            fileName: "[project]/app/city/page.tsx",
            lineNumber: 507,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 506,
        columnNumber: 5
    }, this);
}
_c4 = InventoryDrawer;
function ChatDrawer({ open, onClose, ownerId, characterName }) {
    if (!ownerId) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: "Chat global",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatPanel"], {
            ownerId: ownerId,
            characterName: characterName
        }, void 0, false, {
            fileName: "[project]/app/city/page.tsx",
            lineNumber: 530,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 529,
        columnNumber: 5
    }, this);
}
_c5 = ChatDrawer;
function PanelDrawer({ title, open, onClose, content }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: title,
        children: content
    }, void 0, false, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 547,
        columnNumber: 5
    }, this);
}
_c6 = PanelDrawer;
function MiniMapOverlay({ visible, position }) {
    if (!visible) return null;
    const MAP_WIDTH = 3200;
    const MAP_HEIGHT = 2400;
    const xPercent = Math.max(0, Math.min(100, (position?.x ?? MAP_WIDTH / 2) / MAP_WIDTH * 100));
    const yPercent = Math.max(0, Math.min(100, (position?.y ?? MAP_HEIGHT / 2) / MAP_HEIGHT * 100));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mini-map-overlay",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mini-map-title",
                children: "MINI MAPA"
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 567,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mini-map-grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mini-map-pointer",
                    style: {
                        left: `${xPercent}%`,
                        top: `${yPercent}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 569,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 568,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 566,
        columnNumber: 5
    }, this);
}
_c7 = MiniMapOverlay;
const craftingRecipes = [
    {
        id: "life",
        name: "Poção de Vida",
        result: "+50 HP",
        ingredients: "3x Ervas Rubras + 1x Água pura"
    },
    {
        id: "mana",
        name: "Poção de Mana",
        result: "+40 Mana",
        ingredients: "3x Ervas Azuis + 1x Cristal"
    },
    {
        id: "buff",
        name: "Tônico de Batalha",
        result: "+5 ATK por 60s",
        ingredients: "1x Núcleo de Lanceiro + 2x Mel"
    }
];
function CraftingDrawer({ open, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: "Livro de crafting",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "panel-section",
            children: craftingRecipes.map((recipe)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: recipe.name
                        }, void 0, false, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 602,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Resultado: ",
                                recipe.result
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 603,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Ingredientes: ",
                                recipe.ingredients
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 604,
                            columnNumber: 13
                        }, this)
                    ]
                }, recipe.id, true, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 601,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/city/page.tsx",
            lineNumber: 599,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 598,
        columnNumber: 5
    }, this);
}
_c8 = CraftingDrawer;
function CombatLog({ entries }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "combat-log",
        children: entries.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `combat-log-item ${entry.tone}`,
                children: entry.message
            }, entry.id, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 616,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 614,
        columnNumber: 5
    }, this);
}
_c9 = CombatLog;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "CityPage");
__turbopack_context__.k.register(_c1, "CityHud");
__turbopack_context__.k.register(_c2, "QuickSlots");
__turbopack_context__.k.register(_c3, "Drawer");
__turbopack_context__.k.register(_c4, "InventoryDrawer");
__turbopack_context__.k.register(_c5, "ChatDrawer");
__turbopack_context__.k.register(_c6, "PanelDrawer");
__turbopack_context__.k.register(_c7, "MiniMapOverlay");
__turbopack_context__.k.register(_c8, "CraftingDrawer");
__turbopack_context__.k.register(_c9, "CombatLog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_f4a1024c._.js.map