(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/characterSprites.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "characterSprites",
    ()=>characterSprites,
    "getCharacterSpriteConfig",
    ()=>getCharacterSpriteConfig
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
        }
    }
};
function getCharacterSpriteConfig(sprite) {
    return characterSprites[sprite] ?? characterSprites.warriorblue;
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
const HERO_HEIGHT = 140;
const NPC_HEIGHT = 140;
const HERO_CONFIG = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characterSprites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCharacterSpriteConfig"])("warriorblue");
const HERO_RUN_KEY = "hero-run";
const HERO_IDLE_KEY = "hero-idle";
const HERO_RUN_SHEET_KEY = "hero-run-sheet";
const HERO_IDLE_SHEET_KEY = "hero-idle-sheet";
const COVER_DEPTH_OFFSET = 220;
const NPC_COLORS = [
    0x5dade2,
    0xffa07a,
    0xfff176,
    0xa569bd
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
function CityPhaser({ characterName, characterLevel }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            virtualDirectionRef.current = virtualDirection;
        }
    }["CityPhaser.useEffect"], [
        virtualDirection
    ]);
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
            if (!ref.current || !mapData || !tileManifest) return;
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
                        }
                        create() {
                            this.createAnimations();
                            this.buildFloor();
                            this.createPlayer();
                            this.spawnNPCs();
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
                            this.player.setScale(HERO_HEIGHT / HERO_CONFIG.run.frameHeight);
                            this.player.setDepth(this.player.y + COVER_DEPTH_OFFSET);
                            this.player.setPosition(this.worldWidth / 2, this.worldHeight / 2);
                            this.player.play(HERO_IDLE_KEY);
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
                                sprite.setScale(NPC_HEIGHT / HERO_CONFIG.idle.frameHeight);
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
                            }
                            if (dx !== 0 || dy !== 0) {
                                this.player.setFlipX(dx < 0);
                                this.player.play(HERO_RUN_KEY, true);
                            } else {
                                this.player.play(HERO_IDLE_KEY, true);
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
        characterLevel
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
        lineNumber: 543,
        columnNumber: 24
    }, this);
    if (!mapData) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Carregando mapa…"
    }, void 0, false, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 544,
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
                lineNumber: 548,
                columnNumber: 7
            }, this),
            orientationHint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "orientation-hint",
                children: "Melhor experiência na horizontal — gire o dispositivo."
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 550,
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
                        lineNumber: 555,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 553,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 547,
        columnNumber: 5
    }, this);
}
_s(CityPhaser, "p0a2z7M3rWyFz7p2loOy6ggBIMs=");
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
        label: "Admin",
        path: "/editor"
    },
    {
        label: "Cidade",
        path: "/city"
    },
    {
        label: "Casa",
        path: "/house"
    },
    {
        label: "Fazenda",
        path: "/farm"
    },
    {
        label: "Floresta",
        path: "/forest"
    },
    {
        label: "Lojas",
        path: "/shops"
    },
    {
        label: "Chat",
        path: "/chat"
    }
];
function BottomMenu({ variant = "page" } = {}) {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `bottom-menu${variant === "overlay" ? " bottom-menu--overlay" : ""}`,
        children: menuLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>handleNavigate(link.path),
                children: link.label
            }, link.path, false, {
                fileName: "[project]/components/BottomMenu.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/BottomMenu.tsx",
        lineNumber: 31,
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
"[project]/app/city/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CityPhaser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CityPhaser.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlinePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OnlinePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BottomMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BottomMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function CityPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const initialOwnerId = searchParams.get("ownerId") ?? "";
    const initialCharacterId = searchParams.get("characterId") ?? "";
    const [ownerId, setOwnerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialOwnerId);
    const [characterId, setCharacterId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCharacterId);
    const [characterInfo, setCharacterInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingCharacter, setLoadingCharacter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hudEffect, setHudEffect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inventoryOpen, setInventoryOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chatOpen, setChatOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [accountOpen, setAccountOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inventoryVersion, setInventoryVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
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
            setOwnerId(initialOwnerId);
            setCharacterId(initialCharacterId);
            if (initialOwnerId && initialCharacterId) {
                void loadSelectedCharacter(initialOwnerId, initialCharacterId);
            }
        }
    }["CityPage.useEffect"], [
        initialOwnerId,
        initialCharacterId
    ]);
    async function loadSelectedCharacter(currentOwnerId, currentCharacterId) {
        if (!currentOwnerId || !currentCharacterId) {
            setCharacterInfo(null);
            return;
        }
        setLoadingCharacter(true);
        setFeedback(null);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])(`/api/character/get?ownerId=${currentOwnerId}&characterId=${currentCharacterId}`);
            setCharacterInfo(data);
        } catch (err) {
            setCharacterInfo(null);
            setFeedback(getMessage(err));
        } finally{
            setLoadingCharacter(false);
        }
    }
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
            await fetch("/api/auth/logout");
        } catch  {
        // ignore
        }
        router.push("/");
    }
    const actionButtons = [
        {
            id: "inventory",
            label: "INV",
            onClick: ()=>setInventoryOpen(true)
        },
        {
            id: "chat",
            label: "CHAT",
            onClick: ()=>setChatOpen(true)
        },
        {
            id: "logout",
            label: "OUT",
            onClick: handleLogout
        },
        {
            id: "account",
            label: "ACC",
            onClick: ()=>setAccountOpen(true)
        },
        {
            id: "settings",
            label: "CFG",
            onClick: ()=>setSettingsOpen(true)
        }
    ];
    function notifyInventoryChange() {
        setInventoryVersion((previous)=>previous + 1);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Etapas 2 e 3 — Cidade com Phaser e Movimentação Básica"
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Esta é a primeira área após o login. Entre aqui somente através da tela inicial (botão Entrar no primeiro mapa), que envia automaticamente o personagem escolhido."
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    !ownerId || !characterId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Retorne à página inicial e selecione um personagem para receber acesso à cidade."
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            loadingCharacter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Carregando personagem selecionado…"
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 105,
                                columnNumber: 34
                            }, this),
                            feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: feedback
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 106,
                                columnNumber: 26
                            }, this),
                            characterInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 12
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Personagem ativo: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: characterInfo.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/city/page.tsx",
                                            lineNumber: 110,
                                            columnNumber: 37
                                        }, this),
                                        " (sprite ",
                                        characterInfo.sprite,
                                        ") — nível ",
                                        characterInfo.stats.level
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/city/page.tsx",
                                    lineNumber: 109,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "O piso utiliza os tiles ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "public/tilesets/tile1.png"
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 120,
                                columnNumber: 35
                            }, this),
                            " até ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "tile6.png"
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 120,
                                columnNumber: 78
                            }, this),
                            "(100×100) renderizados em blocos de 64 px no Phaser. Construções ocupam uma camada própria e NPCs agora circulam pela cidade."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "map-layout",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "map-stage",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CityPhaser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CityPhaser"], {
                                    characterName: characterInfo?.name,
                                    characterLevel: characterInfo?.stats.level
                                }, void 0, false, {
                                    fileName: "[project]/app/city/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                characterInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CityHud, {
                                    stats: characterInfo.stats
                                }, void 0, false, {
                                    fileName: "[project]/app/city/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 31
                                }, this),
                                ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickSlots, {
                                    ownerId: ownerId,
                                    onItemUsed: handleItemUsed,
                                    refreshKey: inventoryVersion,
                                    onInventoryChange: notifyInventoryChange
                                }, void 0, false, {
                                    fileName: "[project]/app/city/page.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this),
                                ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BottomMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BottomMenu"], {
                                    variant: "overlay",
                                    buttons: actionButtons,
                                    square: true
                                }, void 0, false, {
                                    fileName: "[project]/app/city/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    hudEffect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `potion-effect ${hudEffect.type}`,
                        children: hudEffect.type === "mana" ? "+ Mana" : "+ Vida"
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlinePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnlinePanel"], {
                        ownerId: ownerId
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 148,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 147,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 146,
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
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatDrawer, {
                open: chatOpen,
                onClose: ()=>setChatOpen(false),
                ownerId: ownerId,
                characterName: characterInfo?.name
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 159,
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
                                "E-mail do ownerId: ",
                                characterInfo.ownerId
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 167,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Personagem ativo: ",
                                characterInfo.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 168,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Nível: ",
                                characterInfo.stats.level
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/city/page.tsx",
                            lineNumber: 169,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 166,
                    columnNumber: 13
                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Faça login para visualizar seus dados."
                }, void 0, false, {
                    fileName: "[project]/app/city/page.tsx",
                    lineNumber: 172,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 160,
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
                    lineNumber: 180,
                    columnNumber: 18
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(CityPage, "3hgU3/rhyDc98aqgur9KnJYlX/0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
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
                                lineNumber: 202,
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
                                    lineNumber: 204,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "city-hud-value",
                                children: bar.value
                            }, void 0, false, {
                                fileName: "[project]/app/city/page.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this)
                        ]
                    }, bar.key, true, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "city-hud-level",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "NVL"
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: stats.level
                    }, void 0, false, {
                        fileName: "[project]/app/city/page.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/city/page.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/city/page.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_c1 = CityHud;
var _c, _c1;
__turbopack_context__.k.register(_c, "CityPage");
__turbopack_context__.k.register(_c1, "CityHud");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_56fd6d98._.js.map