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
"[project]/components/CityPhaser.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CityPhaser",
    ()=>CityPhaser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characterSprites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/characterSprites.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const MAP_TILE_SIZE = 64;
const PINCH_SCALE = 0.8;
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
const GOLD_REWARD_MIN = 0;
const GOLD_REWARD_MAX = 3;
const BESTIARY_MONSTER_ID = "lancer";
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
function CityPhaser({ ownerId, characterId, characterName, characterLevel, characterXp, warState, initialPosition, onPositionChange, onCombatEvent, onStatsChange, onGoldChange, onBestiaryUpdate, soundEnabled = true, onReady }) {
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
    const positionHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const combatHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const goldHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const bestiaryHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const readyHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const initializedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            positionHandlerRef.current = onPositionChange;
        }
    }["CityPhaser.useEffect"], [
        onPositionChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            combatHandlerRef.current = onCombatEvent;
        }
    }["CityPhaser.useEffect"], [
        onCombatEvent
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            goldHandlerRef.current = onGoldChange;
        }
    }["CityPhaser.useEffect"], [
        onGoldChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            bestiaryHandlerRef.current = onBestiaryUpdate;
        }
    }["CityPhaser.useEffect"], [
        onBestiaryUpdate
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            readyHandlerRef.current = onReady;
        }
    }["CityPhaser.useEffect"], [
        onReady
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            if (!soundEnabled) {
                audioRef.current?.suspend?.().catch({
                    "CityPhaser.useEffect": ()=>undefined
                }["CityPhaser.useEffect"]);
            } else {
                audioRef.current?.resume?.().catch({
                    "CityPhaser.useEffect": ()=>undefined
                }["CityPhaser.useEffect"]);
            }
        }
    }["CityPhaser.useEffect"], [
        soundEnabled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            virtualDirectionRef.current = virtualDirection;
        }
    }["CityPhaser.useEffect"], [
        virtualDirection
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            const game = gameInstanceRef.current;
            if (game?.sound) {
                game.sound.mute = !soundEnabled;
            }
            if (!soundEnabled) {
                audioRef.current?.suspend?.().catch({
                    "CityPhaser.useEffect": ()=>undefined
                }["CityPhaser.useEffect"]);
            } else {
                audioRef.current?.resume?.().catch({
                    "CityPhaser.useEffect": ()=>undefined
                }["CityPhaser.useEffect"]);
            }
        }
    }["CityPhaser.useEffect"], [
        soundEnabled
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
            if (initializedRef.current) return;
            initializedRef.current = true;
            readyHandlerRef.current?.(false);
            let game = null;
            const container = ref.current;
            ({
                "CityPhaser.useEffect": async ()=>{
                    await new Promise({
                        "CityPhaser.useEffect": (resolve)=>setTimeout(resolve, 250)
                    }["CityPhaser.useEffect"]);
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
                    const combatEventRef = combatHandlerRef.current;
                    const positionCallbackRef = positionHandlerRef.current;
                    const goldCallbackRef = goldHandlerRef.current;
                    const bestiaryCallbackRef = bestiaryHandlerRef.current;
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
                        lastSyncedX = 0;
                        lastSyncedY = 0;
                        playerOwnerId = ownerId;
                        playerCharacterId = characterId;
                        goldCallback = goldCallbackRef;
                        bestiaryCallback = bestiaryCallbackRef;
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
                            this.initializeScene();
                            this.configureCamera();
                            this.configureInput();
                        }
                        initializeScene() {
                            this.createAnimations();
                            this.buildFloor();
                            this.createPlayer();
                            this.spawnNPCs();
                            this.spawnLancers(LANCER_COUNT);
                        }
                        configureCamera() {
                            if (!this.map) return;
                            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
                            this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
                        }
                        configureInput() {
                            this.cursors = this.input.keyboard.createCursorKeys();
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
                        createPlayer() {
                            this.player = this.add.sprite(0, 0, HERO_RUN_SHEET_KEY, 0);
                            this.player.setOrigin(0.5, 1);
                            this.player.setScale(HERO_SCALE);
                            this.player.setDepth(this.player.y + COVER_DEPTH_OFFSET);
                            const startX = initialPosition?.x ?? this.worldWidth / 2;
                            const startY = initialPosition?.y ?? this.worldHeight / 2;
                            this.player.setPosition(startX, startY);
                            this.player.play(HERO_IDLE_KEY);
                            this.lastSyncedX = startX;
                            this.lastSyncedY = startY;
                            this.syncPlayerPosition(startX, startY, true);
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
                            const activeLancers = this.lancers.filter({
                                "CityPhaser.useEffect.activeLancers": (lancer)=>lancer.sprite.active
                            }["CityPhaser.useEffect.activeLancers"]);
                            const ordered = activeLancers.map({
                                "CityPhaser.useEffect.ordered": (entry)=>({
                                        lancer: entry,
                                        distance: Phaser.Math.Distance.Between(entry.sprite.x, entry.sprite.y, this.player.x, this.player.y)
                                    })
                            }["CityPhaser.useEffect.ordered"]).sort({
                                "CityPhaser.useEffect.ordered": (a, b)=>a.distance - b.distance
                            }["CityPhaser.useEffect.ordered"]);
                            const allowed = new Set(ordered.slice(0, MAX_ATTACKERS).map({
                                "CityPhaser.useEffect": (entry)=>entry.lancer
                            }["CityPhaser.useEffect"]));
                            activeLancers.forEach({
                                "CityPhaser.useEffect": (lancer)=>{
                                    const dir = new Phaser.Math.Vector2(this.player.x - lancer.sprite.x, this.player.y - lancer.sprite.y);
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
                                    activeLancers.forEach({
                                        "CityPhaser.useEffect": (other)=>{
                                            if (other === lancer) return;
                                            const offset = new Phaser.Math.Vector2(lancer.sprite.x - other.sprite.x, lancer.sprite.y - other.sprite.y);
                                            const dist = offset.length();
                                            if (dist > 0 && dist < LANCER_SEPARATION_RADIUS) {
                                                offset.normalize().scale((LANCER_SEPARATION_RADIUS - dist) / LANCER_SEPARATION_RADIUS);
                                                separation.add(offset);
                                            }
                                        }
                                    }["CityPhaser.useEffect"]);
                                    if (separation.lengthSq() > 0) {
                                        separation.normalize();
                                        lancer.sprite.x += separation.x * LANCER_SEPARATION_FORCE * (delta / 1000);
                                        lancer.sprite.y += separation.y * LANCER_SEPARATION_FORCE * (delta / 1000);
                                    }
                                    lancer.sprite.setDepth(lancer.sprite.y);
                                    lancer.label.setPosition(lancer.sprite.x, lancer.sprite.y - lancer.sprite.displayHeight - 4).setDepth(lancer.sprite.depth + 5);
                                    if (isAllowed && distance < ATTACK_DISTANCE) {
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
                            const goldReward = Phaser.Math.Between(GOLD_REWARD_MIN, GOLD_REWARD_MAX);
                            if (goldReward > 0) {
                                this.showFloatingText(this.player.x, this.player.y - this.player.displayHeight - 50, `+${goldReward} ouro`, "#ffe78a");
                                this.awardGold(goldReward);
                            }
                            this.recordBestiaryKill(BESTIARY_MONSTER_ID);
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
                        awardGold(amount) {
                            if (!this.playerOwnerId || !this.playerCharacterId || amount <= 0) return;
                            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/character/gold", {
                                ownerId: this.playerOwnerId,
                                characterId: this.playerCharacterId,
                                amount
                            }).then({
                                "CityPhaser.useEffect": ({ gold })=>{
                                    this.goldCallback?.(gold);
                                }
                            }["CityPhaser.useEffect"]).catch({
                                "CityPhaser.useEffect": ()=>undefined
                            }["CityPhaser.useEffect"]);
                        }
                        recordBestiaryKill(monsterId) {
                            if (!this.playerOwnerId || !this.playerCharacterId) return;
                            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/bestiary/update", {
                                ownerId: this.playerOwnerId,
                                characterId: this.playerCharacterId,
                                monsterId
                            }).then({
                                "CityPhaser.useEffect": (entries)=>{
                                    this.bestiaryCallback?.(entries);
                                }
                            }["CityPhaser.useEffect"]).catch({
                                "CityPhaser.useEffect": ()=>undefined
                            }["CityPhaser.useEffect"]);
                        }
                        syncPlayerPosition(x, y, force = false) {
                            if (!positionCallbackRef) return;
                            const deltaX = Math.abs(x - this.lastSyncedX);
                            const deltaY = Math.abs(y - this.lastSyncedY);
                            const movedTiles = Math.max(deltaX, deltaY) / MAP_TILE_SIZE;
                            if (!force && movedTiles < 2) return;
                            this.lastSyncedX = x;
                            this.lastSyncedY = y;
                            positionCallbackRef({
                                x,
                                y
                            });
                        }
                        emitCombatLog(event) {
                            combatEventRef?.(event);
                        }
                        update(_, delta) {
                            if (!this.player || !this.map) return;
                            this.handlePlayerMovement(delta);
                            this.refreshPlayerDepth();
                            this.updateNPCs(delta);
                            this.updateLancers(delta);
                        }
                        handlePlayerMovement(delta) {
                            if (!this.player || !this.cursors) return;
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
                        }
                        refreshPlayerDepth() {
                            if (!this.player) return;
                            const tileX = Math.max(0, Math.floor(this.player.x / MAP_TILE_SIZE));
                            const tileY = Math.max(0, Math.floor(this.player.y / MAP_TILE_SIZE));
                            const coverValue = mapReference.cover[tileY]?.[tileX] ?? 0;
                            const depthOffset = coverValue > 0 ? -COVER_DEPTH_OFFSET : COVER_DEPTH_OFFSET;
                            this.player.setDepth(this.player.y + depthOffset);
                            if (this.playerLabel) {
                                this.playerLabel.setPosition(this.player.x, this.player.y - this.player.displayHeight - 6);
                                this.playerLabel.setDepth(this.player.depth + 5);
                            }
                        }
                    }
                    const getSize = {
                        "CityPhaser.useEffect.getSize": ()=>{
                            const containerWidth = ref.current?.clientWidth ?? window.innerWidth ?? 960;
                            const viewportWidth = window.innerWidth ?? containerWidth;
                            const isDesktop = viewportWidth >= 1200;
                            const maxWidth = isDesktop ? 1340 : viewportWidth - 24;
                            const baseWidth = Math.min(containerWidth, maxWidth);
                            const widthCandidate = Math.round(baseWidth * PINCH_SCALE) + 4 * MAP_TILE_SIZE;
                            const width = Math.max(620, Math.min(maxWidth, widthCandidate));
                            const baseHeight = Math.round(width * (isDesktop ? 0.5 : 0.66));
                            const height = baseHeight + 3 * MAP_TILE_SIZE;
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
                    readyHandlerRef.current?.(true);
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
                    readyHandlerRef.current?.(false);
                }
            })["CityPhaser.useEffect"];
        }
    }["CityPhaser.useEffect"], [
        mapData,
        tileManifest,
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
        lineNumber: 1027,
        columnNumber: 24
    }, this);
    if (!mapData) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Carregando mapa…"
    }, void 0, false, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 1028,
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
                lineNumber: 1032,
                columnNumber: 7
            }, this),
            orientationHint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "orientation-hint",
                children: "Melhor experiência na horizontal — gire o dispositivo."
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 1034,
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
                        lineNumber: 1039,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 1037,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 1031,
        columnNumber: 5
    }, this);
}
_s(CityPhaser, "dr+U59dJEy4gs6SgvnmhIhp8QnI=");
_c = CityPhaser;
var _c;
__turbopack_context__.k.register(_c, "CityPhaser");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute top-6 right-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 shadow",
        "aria-label": `Jogadores online: ${count}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-base",
                children: count
            }, void 0, false, {
                fileName: "[project]/components/OnlineBadge.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Online"
            }, void 0, false, {
                fileName: "[project]/components/OnlineBadge.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
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
        id: "play",
        label: "Jogar",
        path: "/play"
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
    const baseNavClass = variant === "overlay" ? "pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 rounded-md border border-white/20 bg-black/70 px-6 py-3 shadow-2xl shadow-black backdrop-blur" : "flex flex-wrap justify-center gap-3";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: baseNavClass,
        children: items.map((item)=>{
            const baseButtonClass = square ? "flex h-14 w-14 items-center justify-center rounded-md border border-white/15 bg-gradient-to-b from-amber-200/80 to-amber-700/70 text-xs font-semibold uppercase tracking-[0.08em] text-stone-900 shadow-lg" : "rounded-full border border-white/15 bg-gradient-to-b from-amber-200/80 to-amber-700/70 px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-stone-900 shadow-lg";
            const activeClass = item.active ? "ring-2 ring-amber-300" : "";
            const buttonClass = `${baseButtonClass} ${activeClass}`.trim();
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: buttonClass,
                onClick: ()=>{
                    if (item.onClick) {
                        item.onClick();
                    } else if (item.path) {
                        handleNavigate(item.path);
                    }
                },
                "aria-label": item.ariaLabel ?? item.label,
                children: item.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: item.icon,
                    alt: "",
                    className: "h-auto w-auto object-contain"
                }, void 0, false, {
                    fileName: "[project]/components/BottomMenu.tsx",
                    lineNumber: 72,
                    columnNumber: 15
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-semibold uppercase tracking-[0.08em]",
                    children: item.label
                }, void 0, false, {
                    fileName: "[project]/components/BottomMenu.tsx",
                    lineNumber: 74,
                    columnNumber: 15
                }, this)
            }, item.id, false, {
                fileName: "[project]/components/BottomMenu.tsx",
                lineNumber: 58,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/BottomMenu.tsx",
        lineNumber: 50,
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
    },
    item30: {
        name: "Cristal pequeno de XP",
        icon: "/itens/item30.png",
        stackable: true,
        maxStack: STACK_LIMIT
    },
    item31: {
        name: "Cristal médio de XP",
        icon: "/itens/item31.png",
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
const consumableXp = {
    item30: 25,
    item31: 60
};
function InventoryPanel({ ownerId, characterId, onItemsChange, onItemUsed }) {
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
            if (characterId && consumableXp[itemId]) {
                await grantXp(itemId);
            }
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
                lineNumber: 112,
                columnNumber: 7
            }, this),
            feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: feedback
            }, void 0, false, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 113,
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
                            lineNumber: 120,
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
                                lineNumber: 130,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: slot.name
                            }, void 0, false, {
                                fileName: "[project]/components/InventoryPanel.tsx",
                                lineNumber: 130,
                                columnNumber: 69
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "quantity",
                                children: slot.quantity
                            }, void 0, false, {
                                fileName: "[project]/components/InventoryPanel.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${slot.id}-${index}`, true, {
                        fileName: "[project]/components/InventoryPanel.tsx",
                        lineNumber: 124,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 114,
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
                        lineNumber: 138,
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
                                lineNumber: 141,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/InventoryPanel.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InventoryPanel.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
    //TURBOPACK unreachable
    ;
    async function grantXp(itemId) {
        if (!characterId) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/character/xp", {
                ownerId,
                characterId,
                amount: consumableXp[itemId]
            });
        } catch  {
        // ignore xp failures
        }
    }
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
    ()=>ChatPanel,
    "useChatFeed",
    ()=>useChatFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function useChatFeed(forcedOwnerId, forcedCharacterName) {
    _s();
    const [ownerId, setOwnerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(forcedOwnerId ?? "");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(forcedCharacterName ?? "");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChatFeed.useEffect": ()=>{
            let active = true;
            async function load() {
                try {
                    const list = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])("/api/chat/get");
                    if (active) {
                        setMessages(list.slice(-20));
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
                "useChatFeed.useEffect": ()=>{
                    active = false;
                    clearInterval(interval);
                }
            })["useChatFeed.useEffect"];
        }
    }["useChatFeed.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChatFeed.useEffect": ()=>{
            if (forcedOwnerId) {
                setOwnerId(forcedOwnerId);
            }
        }
    }["useChatFeed.useEffect"], [
        forcedOwnerId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChatFeed.useEffect": ()=>{
            if (forcedCharacterName) {
                setName(forcedCharacterName);
            }
        }
    }["useChatFeed.useEffect"], [
        forcedCharacterName
    ]);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatFeed.useCallback[sendMessage]": async ()=>{
            if (!ownerId) {
                setError("Informe o ownerId para enviar ao chat.");
                return;
            }
            if (!message.trim()) {
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
    }["useChatFeed.useCallback[sendMessage]"], [
        ownerId,
        name,
        message
    ]);
    return {
        ownerId,
        setOwnerId,
        name,
        setName,
        message,
        setMessage,
        messages,
        error,
        sendMessage
    };
}
_s(useChatFeed, "24i7diGPVxc46VWxYTFr/DnUVgE=");
function ChatPanel({ ownerId: forcedOwnerId, characterName }) {
    _s1();
    const { ownerId, setOwnerId, name, setName, message, setMessage, messages, error, sendMessage } = useChatFeed(forcedOwnerId, characterName);
    async function handleSend(event) {
        event.preventDefault();
        await sendMessage();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "chat-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: "Chat Global"
            }, void 0, false, {
                fileName: "[project]/components/ChatPanel.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: error
            }, void 0, false, {
                fileName: "[project]/components/ChatPanel.tsx",
                lineNumber: 106,
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
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this),
                                    ": ",
                                    entry.message,
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: new Date(entry.createdAt).toLocaleTimeString()
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatPanel.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, entry.id, true, {
                                fileName: "[project]/components/ChatPanel.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)),
                        messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: "Nenhuma mensagem."
                        }, void 0, false, {
                            fileName: "[project]/components/ChatPanel.tsx",
                            lineNumber: 115,
                            columnNumber: 37
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChatPanel.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ChatPanel.tsx",
                lineNumber: 107,
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
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    !characterName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "chat-name",
                        value: name,
                        onChange: (event)=>setName(event.target.value),
                        placeholder: "Nome do personagem"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatPanel.tsx",
                        lineNumber: 129,
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
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button",
                        children: "Enviar"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatPanel.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatPanel.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatPanel.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s1(ChatPanel, "TfjVLCRYFvd/QIkBSqpZ23pYN4o=", false, function() {
    return [
        useChatFeed
    ];
});
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
"[project]/lib/progression.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveLevel",
    ()=>resolveLevel,
    "xpForLevel",
    ()=>xpForLevel
]);
const BASE_THRESHOLDS = [
    {
        level: 1,
        totalXp: 0
    },
    {
        level: 2,
        totalXp: 300
    },
    {
        level: 3,
        totalXp: 700
    },
    {
        level: 4,
        totalXp: 1500
    }
];
const EXTRA_STEP = 1000;
function xpForLevel(level) {
    if (level <= 1) return 0;
    const preset = BASE_THRESHOLDS.find((entry)=>entry.level === level);
    if (preset) return preset.totalXp;
    let total = BASE_THRESHOLDS[BASE_THRESHOLDS.length - 1].totalXp;
    for(let current = BASE_THRESHOLDS.length + 1; current <= level; current++){
        total += EXTRA_STEP;
    }
    return total;
}
function resolveLevel(totalXp) {
    let level = 1;
    while(totalXp >= xpForLevel(level + 1)){
        level += 1;
    }
    const currentLevelFloor = xpForLevel(level);
    const nextLevelRequirement = xpForLevel(level + 1);
    const progress = totalXp - currentLevelFloor;
    const needed = nextLevelRequirement - currentLevelFloor;
    return {
        level,
        progress,
        needed: needed > 0 ? needed : 1,
        nextLevelXp: nextLevelRequirement
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/play/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progression.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
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
;
const BESTIARY_TIER_LABELS = [
    "Comum",
    "Incomum",
    "Raro",
    "Épico",
    "Lendário",
    "Mítico"
];
const playNavLinks = [
    {
        id: "world",
        label: "Mapa atual",
        description: "Escolha cidade/casa/fazenda",
        icon: "/icons/viewmap.png"
    },
    {
        id: "market",
        label: "Player Market",
        description: "Loja entre jogadores",
        icon: "/icons/playermarket.png"
    },
    {
        id: "achievements",
        label: "Arquivamentos",
        description: "Coleção de títulos e marcos",
        icon: "/icons/achievements.png"
    }
];
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
    const [equipOpen, setEquipOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bestiaryOpen, setBestiaryOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMiniMap, setShowMiniMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [warState, setWarState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [playerPosition, setPlayerPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inventoryVersion, setInventoryVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [combatLog, setCombatLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [gameReady, setGameReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [soundEnabled, setSoundEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [bestiaryEntries, setBestiaryEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const ownerId = sessionState?.ownerId ?? "";
    const characterId = sessionState?.characterId ?? "";
    const loadBestiaryProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CityPage.useCallback[loadBestiaryProfile]": async (currentOwnerId, currentCharacterId)=>{
            try {
                const table = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])(`/api/bestiary/get?ownerId=${currentOwnerId}&characterId=${currentCharacterId}`);
                setBestiaryEntries(table);
            } catch  {
                setBestiaryEntries([]);
            }
        }
    }["CityPage.useCallback[loadBestiaryProfile]"], []);
    const loadSelectedCharacter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CityPage.useCallback[loadSelectedCharacter]": async (currentOwnerId, currentCharacterId)=>{
            if (!currentOwnerId || !currentCharacterId) {
                setCharacterInfo(null);
                setBestiaryEntries([]);
                return;
            }
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])(`/api/character/get?ownerId=${currentOwnerId}&characterId=${currentCharacterId}`);
                setCharacterInfo({
                    ...data,
                    gold: data.gold ?? 0
                });
                await loadBestiaryProfile(currentOwnerId, currentCharacterId);
            } catch (err) {
                setCharacterInfo(null);
                setBestiaryEntries([]);
                setFeedback(getMessage(err));
            }
        }
    }["CityPage.useCallback[loadSelectedCharacter]"], [
        loadBestiaryProfile
    ]);
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
            let active = true;
            const loadWar = {
                "CityPage.useEffect.loadWar": async ()=>{
                    try {
                        const state = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])("/api/factions/war");
                        if (active) setWarState(state);
                    } catch  {
                    // ignore
                    }
                }
            }["CityPage.useEffect.loadWar"];
            loadWar();
            const interval = window.setInterval(loadWar, 30000);
            return ({
                "CityPage.useEffect": ()=>{
                    active = false;
                    window.clearInterval(interval);
                }
            })["CityPage.useEffect"];
        }
    }["CityPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPage.useEffect": ()=>{
            if (!ownerId || !characterId) {
                setGameReady(false);
            }
        }
    }["CityPage.useEffect"], [
        ownerId,
        characterId
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
    const goHome = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            window.localStorage.setItem("lastRoute", "/");
            window.dispatchEvent(new CustomEvent("lastRouteChange", {
                detail: "/"
            }));
        }
        router.replace("/");
    };
    async function handleLeavePlay() {
        setGameReady(false);
        setCombatLog([]);
        goHome();
    }
    async function handleFullLogout() {
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
        goHome();
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
            icon: "/icons/crafting.png",
            ariaLabel: "Abrir livro de crafting",
            onClick: ()=>setCraftingOpen(true)
        },
        {
            id: "minimap",
            label: "MAP",
            icon: "/icons/viewmap.png",
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
            id: "bestiary",
            label: "📜",
            ariaLabel: "Abrir bestiário",
            onClick: ()=>setBestiaryOpen(true)
        },
        {
            id: "account",
            label: "ACC",
            icon: "/icons/achievements.png",
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
            onClick: handleLeavePlay
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
                "CityPage.useCallback[handleCombatEvent]": (current)=>{
                    const entry = {
                        id: `${Date.now()}-${Math.random()}`,
                        message: event.message,
                        tone: event.tone,
                        createdAt: Date.now()
                    };
                    return [
                        ...current,
                        entry
                    ].slice(-20);
                }
            }["CityPage.useCallback[handleCombatEvent]"]);
        }
    }["CityPage.useCallback[handleCombatEvent]"], []);
    const handleStatsChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CityPage.useCallback[handleStatsChange]": (stats)=>{
            setCharacterInfo({
                "CityPage.useCallback[handleStatsChange]": (previous)=>previous ? {
                        ...previous,
                        stats: {
                            ...previous.stats,
                            ...stats
                        }
                    } : previous
            }["CityPage.useCallback[handleStatsChange]"]);
        }
    }["CityPage.useCallback[handleStatsChange]"], []);
    const handleGoldChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CityPage.useCallback[handleGoldChange]": (gold)=>{
            setCharacterInfo({
                "CityPage.useCallback[handleGoldChange]": (previous)=>previous ? {
                        ...previous,
                        gold
                    } : previous
            }["CityPage.useCallback[handleGoldChange]"]);
        }
    }["CityPage.useCallback[handleGoldChange]"], []);
    const handleBestiaryUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CityPage.useCallback[handleBestiaryUpdate]": (table)=>{
            setBestiaryEntries(table);
        }
    }["CityPage.useCallback[handleBestiaryUpdate]"], []);
    const toggleSound = ()=>setSoundEnabled((previous)=>!previous);
    if (status === "loading" || loadingSession) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Carregando sessão…"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 339,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "city-shell",
        children: [
            warState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-center text-xs uppercase tracking-[0.3em] text-amber-100",
                children: [
                    "⚔️ Guerra de Facções: ",
                    warState.teamA.join(" & "),
                    " (",
                    warState.teamA.reduce((sum, faction)=>sum + (warState.remaining[faction] ?? 0), 0),
                    ") vs",
                    " ",
                    warState.teamB.join(" & "),
                    " (",
                    warState.teamB.reduce((sum, faction)=>sum + (warState.remaining[faction] ?? 0), 0),
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 348,
                columnNumber: 9
            }, this),
            ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mb-4 flex flex-wrap gap-3 rounded-[32px] border border-white/10 bg-black/70 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)]",
                "aria-label": "Menu do jogo",
                children: playNavLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-left text-amber-100 transition hover:bg-white/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: link.icon,
                                alt: "",
                                className: "h-9 w-9 object-contain"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 364,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold leading-tight",
                                        children: link.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 366,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-[0.18em] text-amber-100/70",
                                        children: link.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 365,
                                columnNumber: 15
                            }, this)
                        ]
                    }, link.id, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 359,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 354,
                columnNumber: 9
            }, this),
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
                            characterXp: characterInfo?.stats.xp,
                            warState: warState,
                            initialPosition: sessionState?.position,
                            onPositionChange: handlePositionChange,
                            onCombatEvent: handleCombatEvent,
                            onStatsChange: handleStatsChange,
                            onGoldChange: handleGoldChange,
                            onBestiaryUpdate: handleBestiaryUpdate,
                            soundEnabled: soundEnabled,
                            onReady: setGameReady
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 376,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Faça login e selecione um personagem para carregar o mapa."
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 393,
                            columnNumber: 13
                        }, this),
                        !gameReady && ownerId && characterId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 z-20 flex items-center justify-center rounded-[28px] bg-black/60",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-20 w-20 animate-pulse rounded-full border-4 border-amber-200/60"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 397,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 396,
                            columnNumber: 13
                        }, this),
                        characterInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CityHud, {
                            stats: characterInfo.stats
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 400,
                            columnNumber: 29
                        }, this),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopCenterSlots, {
                            onOpenEquipment: ()=>setEquipOpen(true)
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 401,
                            columnNumber: 23
                        }, this),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickSlots, {
                            ownerId: ownerId,
                            characterId: characterId,
                            goldAmount: characterInfo?.gold ?? 0,
                            refreshKey: inventoryVersion,
                            onItemUsed: handleItemUsed,
                            onInventoryChange: notifyInventoryChange
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 403,
                            columnNumber: 13
                        }, this),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlineBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnlineBadge"], {}, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 414,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SoundToggleButton, {
                                    enabled: soundEnabled,
                                    onToggle: toggleSound
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 415,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BottomMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BottomMenu"], {
                            variant: "overlay",
                            buttons: actionButtons,
                            square: true
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 418,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniMapOverlay, {
                            visible: Boolean(ownerId && showMiniMap),
                            position: playerPosition ?? sessionState?.position
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 374,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this),
            hudEffect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `potion-effect ${hudEffect.type}`,
                children: hudEffect.type === "mana" ? "+ Mana" : "+ Vida"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 426,
                columnNumber: 9
            }, this),
            feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: feedback
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 432,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 431,
                columnNumber: 9
            }, this),
            ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlinePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnlinePanel"], {
                        ownerId: ownerId
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 438,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 437,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 436,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InventoryDrawer, {
                open: inventoryOpen,
                onClose: ()=>setInventoryOpen(false),
                ownerId: ownerId,
                characterId: characterId,
                onItemUsed: handleItemUsed,
                onInventoryChange: notifyInventoryChange
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BestiaryDrawer, {
                open: bestiaryOpen,
                onClose: ()=>setBestiaryOpen(false),
                entries: bestiaryEntries
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 450,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatDrawer, {
                open: chatOpen,
                onClose: ()=>setChatOpen(false),
                ownerId: ownerId,
                characterName: characterInfo?.name,
                combatLog: combatLog
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 455,
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
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 469,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Personagem ativo: ",
                                characterInfo.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 470,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Nível: ",
                                characterInfo.stats.level
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 471,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "button mt-4",
                            onClick: handleFullLogout,
                            children: "Logout"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 472,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 468,
                    columnNumber: 13
                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Nenhum personagem carregado."
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 477,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PanelDrawer, {
                title: "Configurações",
                open: settingsOpen,
                onClose: ()=>setSettingsOpen(false),
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Configurações gerais do jogo serão adicionadas aqui."
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 485,
                    columnNumber: 18
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 481,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CraftingDrawer, {
                open: craftingOpen,
                onClose: ()=>setCraftingOpen(false)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 487,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EquipmentDrawer, {
                open: equipOpen,
                onClose: ()=>setEquipOpen(false)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 488,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 346,
        columnNumber: 5
    }, this);
}
_s(CityPage, "2Lsfcdsla0op+JKrdKAwHa42rb4=", false, function() {
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
    const levelFloor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["xpForLevel"])(stats.level);
    const nextLevelTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["xpForLevel"])(stats.level + 1);
    const xpCurrent = Math.max(0, stats.xp - levelFloor);
    const xpNeeded = Math.max(1, nextLevelTarget - levelFloor);
    const bars = [
        {
            key: "hp",
            label: "HP",
            value: stats.hp,
            max: 100,
            display: `${stats.hp}`
        },
        {
            key: "energy",
            label: "ENERGIA",
            value: stats.energy,
            max: 100,
            display: `${stats.energy}`
        },
        {
            key: "xp",
            label: `XP LV.${stats.level}`,
            value: xpCurrent,
            max: xpNeeded,
            display: `${xpCurrent}/${xpNeeded}`
        }
    ];
    const gradientMap = {
        hp: "from-red-300 to-red-500",
        energy: "from-yellow-200 to-yellow-500",
        xp: "from-indigo-300 to-indigo-500"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute top-3 left-3 flex w-[190px] flex-col gap-2 rounded-sm border border-white/10 bg-black/70 p-4 text-amber-50 shadow-black shadow-2xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: bars.map((bar)=>{
                const percentage = Math.min(100, bar.value / bar.max * 100);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-amber-100/70",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: bar.label
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 527,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: bar.display
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 528,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 526,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-3 rounded-full bg-black/40",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `h-3 rounded-full bg-gradient-to-r ${gradientMap[bar.key] ?? "from-amber-200 to-amber-500"}`,
                                style: {
                                    width: `${percentage}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 531,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 530,
                            columnNumber: 15
                        }, this)
                    ]
                }, bar.key, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 525,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 521,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 520,
        columnNumber: 5
    }, this);
}
_c1 = CityHud;
function SoundToggleButton({ enabled, onToggle }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: "pointer-events-auto absolute top-6 right-32 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 shadow",
        onClick: onToggle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: enabled ? "🔊" : "🔇"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 551,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Som"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 552,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 546,
        columnNumber: 5
    }, this);
}
_c2 = SoundToggleButton;
function QuickSlots({ ownerId, characterId, refreshKey, goldAmount, onItemUsed, onInventoryChange }) {
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
        item10: "/itens/item10.png",
        item30: "/itens/item30.png",
        item31: "/itens/item31.png"
    };
    const consumableXp = {
        item30: 25,
        item31: 60
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
            if (characterId && consumableXp[slot.id]) {
                await grantItemXp(slot.id, consumableXp[slot.id]);
            }
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
    const quickSlots = [
        0,
        1,
        2,
        3
    ].map((slotIndex)=>resolvedSlots[slotIndex] ?? null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-auto absolute right-2 top-20 flex flex-col items-end gap-4 sm:right-4 md:top-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative rounded-[28px] border border-white/10 bg-black/70 p-2 shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: quickSlots.map((slot, index)=>{
                            const icon = slot ? iconMap[slot.id] : undefined;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-lg text-amber-100 transition hover:border-amber-200 ${slot ? "shadow-lg" : ""}`,
                                onClick: ()=>consumeSlot(index),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute left-1 top-1 text-[10px] text-amber-200",
                                        children: index + 1
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 695,
                                        columnNumber: 17
                                    }, this),
                                    slot && icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: icon,
                                        alt: slot.name,
                                        className: "h-7 w-7 object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 697,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 699,
                                        columnNumber: 19
                                    }, this),
                                    slot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute bottom-1 right-1 rounded-full bg-black/70 px-2 text-xs",
                                        children: slot.quantity
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 702,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 689,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 685,
                        columnNumber: 9
                    }, this),
                    pickerSlot !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-[calc(100%+12px)] top-1/2 w-48 -translate-y-1/2 rounded-2xl border border-white/15 bg-black/90 p-3 text-sm shadow-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-amber-100",
                                children: [
                                    "Escolha o item para o slot ",
                                    pickerSlot + 1
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 712,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-col gap-2",
                                children: [
                                    availableItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-left text-amber-100 hover:border-amber-200",
                                            onClick: ()=>assignSlot(item, pickerSlot),
                                            children: [
                                                item.name,
                                                " (",
                                                item.quantity,
                                                ")"
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/app/play/page.tsx",
                                            lineNumber: 715,
                                            columnNumber: 19
                                        }, this)),
                                    availableItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Sem itens disponíveis."
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 724,
                                        columnNumber: 49
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 713,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-3 w-full rounded-xl bg-gradient-to-r from-amber-200/80 to-amber-500/80 py-1.5 text-xs font-semibold text-stone-900",
                                onClick: ()=>setPickerSlot(null),
                                children: "Fechar"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 726,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 711,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 684,
                columnNumber: 7
            }, this),
            typeof goldAmount === "number" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[20px] border border-yellow-200/40 bg-black/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mr-2",
                        children: "🪙"
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 738,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: goldAmount
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 739,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 737,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 683,
        columnNumber: 5
    }, this);
    //TURBOPACK unreachable
    ;
    async function grantItemXp(itemId, amount) {
        if (!characterId) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/character/xp", {
                ownerId,
                characterId,
                amount
            });
        } catch  {
        // ignore xp failures
        }
    }
}
_s1(QuickSlots, "JGf8QKOgYK3TirCr1p8XFrlKEGI=");
_c3 = QuickSlots;
function TopCenterSlots({ onOpenEquipment }) {
    const slots = [
        {
            id: "necklace",
            label: "Cordão",
            hint: "CD",
            type: "equipment"
        },
        {
            id: "ring",
            label: "Anel",
            hint: "AN",
            type: "equipment"
        },
        {
            id: "weapon",
            label: "Arma",
            hint: "WP",
            type: "equipment"
        },
        {
            id: "skill-primary",
            label: "Skill 1",
            hint: "S1",
            type: "skill"
        },
        {
            id: "skill-secondary",
            label: "Skill 2",
            hint: "S2",
            type: "skill"
        },
        {
            id: "skill-ultimate",
            label: "Skill 3",
            hint: "S3",
            type: "skill"
        },
        {
            id: "skill-extra",
            label: "Skill 4",
            hint: "S4",
            type: "skill"
        }
    ];
    const backgroundMap = {
        necklace: "/icons/neck.png",
        ring: "/icons/ring.png",
        weapon: "/icons/weapon.png"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center gap-2 rounded-[36px] border border-white/10 bg-black/70 px-4 py-2 shadow-[0_15px_40px_rgba(0,0,0,0.6)]",
        children: slots.map((slot)=>{
            const isEquipment = slot.type === "equipment";
            const background = backgroundMap[slot.id];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: isEquipment ? onOpenEquipment : undefined,
                className: `pointer-events-auto flex h-12 w-12 flex-col items-center justify-center rounded-2xl border text-xs font-semibold uppercase tracking-[0.3em] text-amber-100 transition ${isEquipment ? "border-amber-200/30 bg-black/60 hover:border-amber-200" : "border-white/15 bg-black/50 hover:border-amber-200"}`,
                style: background ? {
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                } : undefined,
                "aria-label": slot.label,
                children: !isEquipment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-base",
                    children: slot.hint
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 805,
                    columnNumber: 30
                }, this)
            }, slot.id, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 785,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 780,
        columnNumber: 5
    }, this);
}
_c4 = TopCenterSlots;
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
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 825,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 826,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 824,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "city-drawer-content",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 830,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 823,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 822,
        columnNumber: 5
    }, this);
}
_c5 = Drawer;
function InventoryDrawer({ open, onClose, ownerId, characterId, onItemUsed, onInventoryChange }) {
    if (!ownerId) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: "Inventário",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InventoryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InventoryPanel"], {
            ownerId: ownerId,
            characterId: characterId,
            onItemUsed: onItemUsed,
            onItemsChange: ()=>onInventoryChange?.()
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 854,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 853,
        columnNumber: 5
    }, this);
}
_c6 = InventoryDrawer;
const MONSTER_NAMES = {
    lancer: "Lanceiro"
};
function BestiaryDrawer({ open, onClose, entries }) {
    if (!entries || entries.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
            open: open,
            onClose: onClose,
            title: "Bestiário",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Derrote monstros para registrar no bestiário."
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 880,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 879,
            columnNumber: 7
        }, this);
    }
    const sorted = [
        ...entries
    ].sort((a, b)=>b.kills - a.kills);
    const totalKills = sorted.reduce((sum, entry)=>sum + entry.kills, 0);
    const uniqueKills = sorted.length;
    const topEnemy = sorted[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: "Bestiário",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 grid grid-cols-3 gap-2 text-center text-xs uppercase tracking-[0.2em] text-amber-100/80",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-black/40 px-2 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Total"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 892,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-amber-200",
                                children: totalKills
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 893,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 891,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-black/40 px-2 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Espécies"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 896,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-amber-200",
                                children: uniqueKills
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 897,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 895,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-black/40 px-2 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Top"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 900,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-amber-200",
                                children: topEnemy ? MONSTER_NAMES[topEnemy.monsterId] ?? topEnemy.monsterId : "-"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 901,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 899,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 890,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2 text-sm text-amber-100",
                children: sorted.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "rounded-2xl border border-white/10 bg-black/40 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-xs uppercase tracking-[0.2em] text-amber-100/70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: MONSTER_NAMES[entry.monsterId] ?? entry.monsterId
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 910,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            totalKills > 0 ? (entry.kills / totalKills * 100).toFixed(1) : "0.0",
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 911,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 909,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-sm font-bold text-amber-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Abates"
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 914,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "x",
                                            entry.kills
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 915,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 913,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 h-1 rounded-full bg-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-1 rounded-full bg-amber-300",
                                    style: {
                                        width: `${totalKills > 0 ? Math.min(100, entry.kills / totalKills * 100) : 0}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 918,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 917,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 inline-flex rounded-full border border-amber-200/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-amber-200/90",
                                children: BESTIARY_TIER_LABELS[entry.tier] ?? BESTIARY_TIER_LABELS[0]
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 925,
                                columnNumber: 13
                            }, this)
                        ]
                    }, entry.monsterId, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 908,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 906,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 889,
        columnNumber: 5
    }, this);
}
_c7 = BestiaryDrawer;
function EquipmentDrawer({ open, onClose }) {
    const slots = [
        {
            id: "head",
            label: "Cabeça",
            icon: "/icons/head.png"
        },
        {
            id: "necklace",
            label: "Cordão",
            icon: "/icons/neck.png"
        },
        {
            id: "ring",
            label: "Anel",
            icon: "/icons/ring.png"
        },
        {
            id: "armor",
            label: "Armadura",
            icon: "/icons/body.png"
        },
        {
            id: "weapon",
            label: "Arma",
            icon: "/icons/weapon.png"
        },
        {
            id: "shield",
            label: "Escudo",
            icon: "/icons/scroll.png"
        },
        {
            id: "pants",
            label: "Calça",
            icon: "/icons/body.png"
        },
        {
            id: "boots",
            label: "Bota",
            icon: "/icons/body.png"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: "Equipamentos",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-3",
                    children: slots.map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-20 flex-col items-center justify-center rounded-2xl border border-white/15 bg-black/40 text-amber-100",
                            style: slot.icon ? {
                                backgroundImage: `url(${slot.icon})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                opacity: 0.85
                            } : undefined,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-full bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-amber-100",
                                children: slot.label
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 965,
                                columnNumber: 15
                            }, this)
                        }, slot.id, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 951,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 949,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.25em] text-amber-100/70",
                            children: "Buffs & Debuffs"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 972,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-amber-100/80",
                            children: "Nenhum efeito ativo."
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 973,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 971,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.25em] text-amber-100/70",
                            children: "Atributos"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 978,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-2 space-y-1 text-sm text-amber-100/80",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Força: 0"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 980,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Destreza: 0"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 981,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Inteligência: 0"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 982,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 979,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 977,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 948,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 947,
        columnNumber: 5
    }, this);
}
_c8 = EquipmentDrawer;
function ChatDrawer({ open, onClose, ownerId, characterName, combatLog }) {
    _s2();
    if (!ownerId) return null;
    const tabs = [
        {
            id: "global",
            label: "Global"
        },
        {
            id: "logs",
            label: "Logs"
        },
        {
            id: "guild",
            label: "Guild"
        }
    ];
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("global");
    const { message, setMessage, messages, error, sendMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatFeed"])(ownerId, characterName);
    async function handleSubmit(event) {
        event.preventDefault();
        if (activeTab !== "global") return;
        await sendMessage();
    }
    const disableInput = activeTab !== "global";
    const visibleMessages = messages.slice(-20);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: "Chat",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-[60vh] flex-col gap-4 text-amber-50",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex rounded-full border border-white/10 bg-black/50 p-1 text-sm font-semibold uppercase tracking-[0.3em]",
                    children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: `flex-1 rounded-full px-3 py-2 transition ${activeTab === tab.id ? "bg-amber-200 text-stone-900" : "text-amber-100/70"}`,
                            onClick: ()=>setActiveTab(tab.id),
                            children: tab.label
                        }, tab.id, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1027,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1025,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto rounded-[28px] border border-white/10 bg-black/50 p-4",
                    children: [
                        activeTab === "global" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 text-sm",
                            children: [
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-red-300",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 1042,
                                    columnNumber: 25
                                }, this),
                                visibleMessages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-amber-100/70",
                                    children: "Sem mensagens recentes."
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 1044,
                                    columnNumber: 17
                                }, this),
                                visibleMessages.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-white/10 bg-black/60 px-3 py-2 text-amber-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs uppercase tracking-[0.2em] text-amber-200/70",
                                                children: [
                                                    entry.characterName ?? entry.ownerId,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-[10px] text-amber-100/50",
                                                        children: new Date(entry.createdAt).toLocaleTimeString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/play/page.tsx",
                                                        lineNumber: 1053,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/play/page.tsx",
                                                lineNumber: 1051,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-base",
                                                children: entry.message
                                            }, void 0, false, {
                                                fileName: "[project]/app/play/page.tsx",
                                                lineNumber: 1057,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, entry.id, true, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 1047,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1041,
                            columnNumber: 13
                        }, this),
                        activeTab === "logs" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 text-xs text-amber-100",
                            children: [
                                combatLog.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-amber-100/60",
                                    children: "Sem eventos recentes."
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 1064,
                                    columnNumber: 42
                                }, this),
                                combatLog.slice(-20).map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `rounded-xl border px-3 py-1 font-semibold ${entry.tone === "xp" ? "border-green-200/40 text-green-200" : "border-red-200/40 text-red-200"}`,
                                        children: entry.message
                                    }, entry.id, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 1066,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1063,
                            columnNumber: 13
                        }, this),
                        activeTab === "guild" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-amber-100/70",
                            children: "Chat de guilda em breve."
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1080,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1039,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "flex flex-col gap-2 rounded-[28px] border border-white/10 bg-black/60 p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "drawer-chat-message",
                            className: "text-xs uppercase tracking-[0.3em] text-amber-100/70",
                            children: "Mensagem"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1087,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            id: "drawer-chat-message",
                            className: "min-h-[90px] rounded-2xl border border-white/10 bg-black/40 p-3 text-sm text-amber-50 outline-none focus:border-amber-200",
                            value: message,
                            onChange: (event)=>setMessage(event.target.value),
                            maxLength: 280,
                            placeholder: disableInput ? "Selecione a aba Global para enviar mensagens." : "Digite sua mensagem",
                            disabled: disableInput
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1090,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "rounded-2xl bg-gradient-to-r from-amber-200 to-amber-500 py-2 text-center text-sm font-bold uppercase tracking-[0.4em] text-stone-900 disabled:cursor-not-allowed disabled:opacity-40",
                            disabled: disableInput || message.trim().length === 0,
                            children: "Enviar"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1099,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1083,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 1024,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1023,
        columnNumber: 5
    }, this);
}
_s2(ChatDrawer, "O1H3hKvwlnPJJZ5q3RsNo0abrGM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatFeed"]
    ];
});
_c9 = ChatDrawer;
function PanelDrawer({ title, open, onClose, content }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: title,
        children: content
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1124,
        columnNumber: 5
    }, this);
}
_c10 = PanelDrawer;
function MiniMapOverlay({ visible, position }) {
    if (!visible) return null;
    const MAP_WIDTH = 3200;
    const MAP_HEIGHT = 2400;
    const xPercent = Math.max(0, Math.min(100, (position?.x ?? MAP_WIDTH / 2) / MAP_WIDTH * 100));
    const yPercent = Math.max(0, Math.min(100, (position?.y ?? MAP_HEIGHT / 2) / MAP_HEIGHT * 100));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute bottom-28 left-4 z-30 flex w-40 flex-col gap-1 rounded-3xl border border-white/10 bg-black/70 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.6)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] uppercase tracking-[0.4em] text-amber-100/70",
                children: "Mini mapa"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 1144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-32 w-full overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:12px_12px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(255,231,186,0.7)]",
                    style: {
                        left: `${xPercent}%`,
                        top: `${yPercent}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1146,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 1145,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1143,
        columnNumber: 5
    }, this);
}
_c11 = MiniMapOverlay;
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
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1182,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Resultado: ",
                                recipe.result
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1183,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Ingredientes: ",
                                recipe.ingredients
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1184,
                            columnNumber: 13
                        }, this)
                    ]
                }, recipe.id, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1181,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 1179,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1178,
        columnNumber: 5
    }, this);
}
_c12 = CraftingDrawer;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12;
__turbopack_context__.k.register(_c, "CityPage");
__turbopack_context__.k.register(_c1, "CityHud");
__turbopack_context__.k.register(_c2, "SoundToggleButton");
__turbopack_context__.k.register(_c3, "QuickSlots");
__turbopack_context__.k.register(_c4, "TopCenterSlots");
__turbopack_context__.k.register(_c5, "Drawer");
__turbopack_context__.k.register(_c6, "InventoryDrawer");
__turbopack_context__.k.register(_c7, "BestiaryDrawer");
__turbopack_context__.k.register(_c8, "EquipmentDrawer");
__turbopack_context__.k.register(_c9, "ChatDrawer");
__turbopack_context__.k.register(_c10, "PanelDrawer");
__turbopack_context__.k.register(_c11, "MiniMapOverlay");
__turbopack_context__.k.register(_c12, "CraftingDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_16ca793d._.js.map