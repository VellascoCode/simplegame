(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characterSprites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/characterSprites.ts [app-client] (ecmascript)");
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
const LANCER_SPEED = 80;
const LANCER_COOLDOWN = 1500;
const LANCER_RESPAWN_DELAY = 40000;
const ATTACK_DISTANCE = 110;
const STOP_DISTANCE = 90;
const HERO_DAMAGE_MIN = 1;
const HERO_DAMAGE_MAX = 3;
const LANCER_DAMAGE_MIN = 1;
const LANCER_DAMAGE_MAX = 4;
const MAX_ATTACKERS = 6;
const LANCER_SEPARATION_RADIUS = 70;
const LANCER_SEPARATION_FORCE = 80;
const SKULL_TEXTURE_KEY = "lancer-skull";
const SKULL_LIMIT = 10;
const SKULL_LIFETIME = 60000;
const GROUND_DROP_LIFETIME = 60000;
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
const LOOT_DROP_TABLE = [
    {
        id: "item30",
        name: "Cristal pequeno de XP",
        quantity: 1,
        chance: 0.1
    },
    {
        id: "item31",
        name: "Cristal médio de XP",
        quantity: 1,
        chance: 0.01
    }
];
const LANCER_TYPES = [
    {
        id: "lancer-amber",
        name: "Lanceiro Âmbar",
        tint: 0xffe066,
        hp: 12,
        xpRange: [
            2,
            3
        ],
        goldRange: [
            1,
            2
        ],
        dropModifier: 1.15
    },
    {
        id: "lancer-cyan",
        name: "Lanceiro Azur",
        tint: 0x7dc8ff,
        hp: 10,
        xpRange: [
            1,
            2
        ],
        goldRange: [
            0,
            1
        ],
        dropModifier: 1
    },
    {
        id: "lancer-crimson",
        name: "Lanceiro Rubro",
        tint: 0xff7d7d,
        hp: 14,
        xpRange: [
            3,
            4
        ],
        goldRange: [
            1,
            3
        ],
        dropModifier: 1.3
    },
    {
        id: "lancer-emerald",
        name: "Lanceiro Esmeralda",
        tint: 0x94f1a4,
        hp: 11,
        xpRange: [
            2,
            3
        ],
        goldRange: [
            1,
            2
        ],
        dropModifier: 1.05
    }
];
const FACTION_LOOT_TABLE = [
    {
        id: "item10",
        name: "Poção de Vida",
        quantity: 1,
        chance: 0.25,
        icon: "/itens/item10.png"
    },
    {
        id: "item30",
        name: "Cristal pequeno de XP",
        quantity: 1,
        chance: 0.35,
        icon: "/itens/item30.png"
    },
    {
        id: "item31",
        name: "Cristal médio de XP",
        quantity: 1,
        chance: 0.12,
        icon: "/itens/item31.png"
    }
];
const LOOT_ICON_PATHS = {
    item10: "/itens/item10.png",
    item30: "/itens/item30.png",
    item31: "/itens/item31.png"
};
const GOLD_NOTIFICATION_GLYPH = "🪙";
const DROP_ACCUMULATION_RANGE = MAP_TILE_SIZE;
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
function CityPhaser({ ownerId, characterId, characterName, characterLevel, characterXp, initialPosition, onPositionChange, onCombatEvent, onStatsChange, onGoldChange, onBestiaryUpdate, playerFaction, warState, onFactionEvent, soundEnabled = true, onReady }) {
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
    const statsHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const goldHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const bestiaryHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const playerFactionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(playerFaction ?? null);
    const warStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(warState ?? null);
    const readyHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const soundEnabledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(soundEnabled);
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
            statsHandlerRef.current = onStatsChange;
        }
    }["CityPhaser.useEffect"], [
        onStatsChange
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
            playerFactionRef.current = playerFaction ?? null;
        }
    }["CityPhaser.useEffect"], [
        playerFaction
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            warStateRef.current = warState ?? null;
        }
    }["CityPhaser.useEffect"], [
        warState
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityPhaser.useEffect": ()=>{
            soundEnabledRef.current = soundEnabled;
            const game = gameInstanceRef.current;
            if (game?.sound) {
                game.sound.mute = !soundEnabled;
            }
            if (!soundEnabled) {
                audioRef.current?.suspend?.().catch({
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
        if (!soundEnabledRef.current) return;
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
                    const playerXp = characterXp ?? 0;
                    const playToneRef = playTone;
                    const combatEventRef = combatHandlerRef.current;
                    const positionCallbackRef = positionHandlerRef.current;
                    const statsCallbackRef = statsHandlerRef.current;
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
                        heroXp = playerXp;
                        lancers = [];
                        heroAttacking = false;
                        lastPositionSent = 0;
                        skulls = [];
                        dropLayer;
                        groundDrops = [];
                        playerOwnerId = ownerId;
                        playerCharacterId = characterId;
                        statsCallback = statsCallbackRef;
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
                            Object.entries(LOOT_ICON_PATHS).forEach({
                                "CityPhaser.useEffect": ([itemId, path])=>{
                                    this.load.image(this.lootTextureKey(itemId), path);
                                }
                            }["CityPhaser.useEffect"]);
                            this.load.image(SKULL_TEXTURE_KEY, "/icons/dead.png");
                        }
                        create() {
                            this.createAnimations();
                            this.buildFloor();
                            this.createPlayer();
                            this.spawnNPCs();
                            this.time.addEvent({
                                delay: 260,
                                loop: true,
                                callback: {
                                    "CityPhaser.useEffect": ()=>this.advanceNPCs()
                                }["CityPhaser.useEffect"]
                            });
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
                            this.dropLayer = this.add.layer();
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
                            this.syncPlayerPosition(startX, startY);
                            this.playerLabel = this.add.text(this.player.x, this.player.y - this.player.displayHeight - 6, "", {
                                color: "#fffbdd",
                                fontSize: "15px",
                                fontStyle: "bold",
                                stroke: "#2b1408",
                                strokeThickness: 3
                            }).setOrigin(0.5, 1).setDepth(this.player.depth + 5);
                            this.updatePlayerLabel();
                        }
                        updatePlayerLabel() {
                            if (!this.playerLabel) return;
                            const text = `${this.heroName} Lv.${this.heroLevel}`;
                            this.playerLabel.setText(text);
                        }
                        spawnNPCs() {
                            const names = [
                                "Sentinela",
                                "Guarda",
                                "Explorador",
                                "Mercador"
                            ];
                            for(let i = 0; i < 4; i++){
                                const spawnPoint = this.findWalkablePoint();
                                const sprite = this.add.sprite(spawnPoint.x, spawnPoint.y, HERO_IDLE_SHEET_KEY, 0);
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
                                    target: this.findWalkablePoint(),
                                    name
                                };
                                this.scheduleSpeech(npc);
                                this.npcs.push(npc);
                            }
                        }
                        lootTextureKey(itemId) {
                            return `loot-item-${itemId}`;
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
                            const position = this.findWalkablePoint();
                            const type = LANCER_TYPES[index % LANCER_TYPES.length];
                            const sprite = this.add.sprite(position.x, position.y, LANCER_SHEET_RUN, 0);
                            sprite.setOrigin(0.5, 1);
                            sprite.setScale(LANCER_SCALE);
                            sprite.setTint(type.tint);
                            sprite.play(LANCER_RUN_KEY);
                            sprite.setDepth(sprite.y);
                            const label = this.add.text(sprite.x, sprite.y - sprite.displayHeight - 4, type.name, {
                                color: "#fdf5d0",
                                fontSize: "14px",
                                fontStyle: "bold"
                            }).setOrigin(0.5, 1).setDepth(sprite.depth + 5);
                            const lancer = {
                                sprite,
                                label,
                                hp: type.hp,
                                lastAttack: 0,
                                type
                            };
                            this.lancers.push(lancer);
                        }
                        randomPoint() {
                            return new Phaser.Math.Vector2(Phaser.Math.Between(80, this.worldWidth - 80), Phaser.Math.Between(80, this.worldHeight - 80));
                        }
                        findWalkablePoint() {
                            for(let attempt = 0; attempt < 40; attempt++){
                                const candidate = this.randomPoint();
                                if (this.canMoveTo(candidate.x, candidate.y)) {
                                    return candidate;
                                }
                            }
                            return new Phaser.Math.Vector2(this.worldWidth / 2, this.worldHeight / 2);
                        }
                        canMoveTo(x, y) {
                            if (x < 0 || y < 0 || x > this.worldWidth || y > this.worldHeight) return false;
                            const circle = new Phaser.Geom.Circle(x, y - 8, 18);
                            return !this.collisionZones.some({
                                "CityPhaser.useEffect": (zone)=>Phaser.Geom.Intersects.CircleToRectangle(circle, zone)
                            }["CityPhaser.useEffect"]);
                        }
                        advanceNPCs() {
                            const step = MAP_TILE_SIZE / 2;
                            this.npcs.forEach({
                                "CityPhaser.useEffect": (npc)=>{
                                    const dir = new Phaser.Math.Vector2(npc.target.x - npc.sprite.x, npc.target.y - npc.sprite.y);
                                    if (dir.length() < 10) {
                                        npc.target = this.findWalkablePoint();
                                        npc.sprite.play(HERO_IDLE_KEY, true);
                                        return;
                                    }
                                    dir.normalize();
                                    const proposedX = npc.sprite.x + Math.sign(dir.x) * step;
                                    const proposedY = npc.sprite.y + Math.sign(dir.y) * step;
                                    if (!this.canMoveTo(proposedX, proposedY)) {
                                        npc.target = this.findWalkablePoint();
                                        return;
                                    }
                                    npc.sprite.x = proposedX;
                                    npc.sprite.y = proposedY;
                                    npc.sprite.setDepth(npc.sprite.y);
                                    npc.sprite.setFlipX(dir.x < 0);
                                    npc.sprite.play(HERO_RUN_KEY, true);
                                    const labelX = npc.sprite.x;
                                    const labelY = npc.sprite.y - npc.sprite.displayHeight - 4;
                                    if (Math.abs(labelX - npc.lastLabelX) > 1 || Math.abs(labelY - npc.lastLabelY) > 1) {
                                        npc.label.setPosition(labelX, labelY);
                                        npc.label.setDepth(npc.sprite.depth + 5);
                                        npc.lastLabelX = labelX;
                                        npc.lastLabelY = labelY;
                                    }
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
                                        const stepX = direction.x * LANCER_SPEED * (delta / 1000);
                                        const stepY = direction.y * LANCER_SPEED * (delta / 1000);
                                        const nextX = lancer.sprite.x + stepX;
                                        const nextY = lancer.sprite.y + stepY;
                                        if (this.canMoveTo(nextX, nextY)) {
                                            lancer.sprite.x = nextX;
                                            lancer.sprite.y = nextY;
                                        }
                                        lancer.sprite.setFlipX(direction.x < 0);
                                        lancer.sprite.play(LANCER_RUN_KEY, true);
                                    } else if (!isAllowed && distance < STOP_DISTANCE + 30 && distance > 0) {
                                        const retreatX = lancer.sprite.x - direction.x * (LANCER_SPEED * 0.6) * (delta / 1000);
                                        const retreatY = lancer.sprite.y - direction.y * (LANCER_SPEED * 0.6) * (delta / 1000);
                                        if (this.canMoveTo(retreatX, retreatY)) {
                                            lancer.sprite.x = retreatX;
                                            lancer.sprite.y = retreatY;
                                        }
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
                                        const offsetX = lancer.sprite.x + separation.x * LANCER_SEPARATION_FORCE * (delta / 1000);
                                        const offsetY = lancer.sprite.y + separation.y * LANCER_SEPARATION_FORCE * (delta / 1000);
                                        if (this.canMoveTo(offsetX, offsetY)) {
                                            lancer.sprite.x = offsetX;
                                            lancer.sprite.y = offsetY;
                                        }
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
                            const dropX = lancer.sprite.x;
                            const dropY = lancer.sprite.y;
                            const xpReward = Phaser.Math.Between(lancer.type.xpRange[0], lancer.type.xpRange[1]);
                            this.showFloatingText(this.player.x, this.player.y - this.player.displayHeight - 30, `+${xpReward} XP`, "#94f1a4");
                            this.emitCombatLog({
                                message: `+${xpReward} XP`,
                                tone: "xp"
                            });
                            playToneRef(620);
                            this.spawnSkull(dropX, dropY);
                            const goldReward = Phaser.Math.Between(lancer.type.goldRange[0], lancer.type.goldRange[1]);
                            if (goldReward > 0) {
                                this.showLootNotification({
                                    label: GOLD_NOTIFICATION_GLYPH,
                                    amount: goldReward,
                                    color: "#ffe78a"
                                });
                                void this.awardGold(goldReward);
                            }
                            this.queueLootDrops(dropX, dropY, lancer.type.dropModifier);
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
                                        this.time.delayedCall(LANCER_RESPAWN_DELAY, {
                                            "CityPhaser.useEffect": ()=>this.spawnLancer(Phaser.Math.Between(0, 1000))
                                        }["CityPhaser.useEffect"]);
                                    }
                                }["CityPhaser.useEffect"]
                            });
                            void this.awardXp(xpReward);
                            void this.recordBestiaryKill(lancer.type.id);
                        }
                        spawnSkull(x, y) {
                            const skull = this.add.image(x, y, SKULL_TEXTURE_KEY);
                            skull.setOrigin(0.5, 1);
                            skull.setDepth(y - 2);
                            skull.setScale(0.85);
                            skull.setAlpha(0);
                            this.dropLayer?.add(skull);
                            this.tweens.add({
                                targets: skull,
                                alpha: 1,
                                duration: 200
                            });
                            this.skulls.push(skull);
                            if (this.skulls.length > SKULL_LIMIT) {
                                const removed = this.skulls.shift();
                                this.fadeSkull(removed);
                            }
                            this.time.delayedCall(SKULL_LIFETIME, {
                                "CityPhaser.useEffect": ()=>this.fadeSkull(skull)
                            }["CityPhaser.useEffect"]);
                        }
                        fadeSkull(skull) {
                            if (!skull || !skull.active) return;
                            this.skulls = this.skulls.filter({
                                "CityPhaser.useEffect": (entry)=>entry !== skull
                            }["CityPhaser.useEffect"]);
                            this.tweens.add({
                                targets: skull,
                                alpha: 0,
                                duration: 350,
                                onComplete: {
                                    "CityPhaser.useEffect": ()=>skull.destroy()
                                }["CityPhaser.useEffect"]
                            });
                        }
                        queueLootDrops(x, y, modifier = 1) {
                            LOOT_DROP_TABLE.forEach({
                                "CityPhaser.useEffect": (drop)=>{
                                    const adjustedChance = Math.min(1, drop.chance * modifier);
                                    if (Math.random() >= adjustedChance) return;
                                    void this.handleItemDrop(drop, x, y);
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        async handleItemDrop(drop, x, y) {
                            const descriptor = {
                                id: drop.id,
                                name: drop.name,
                                icon: LOOT_ICON_PATHS[drop.id]
                            };
                            const stored = await this.persistLoot(drop);
                            if (stored) {
                                this.showLootNotification({
                                    textureKey: descriptor.icon,
                                    amount: drop.quantity,
                                    color: "#d7f4ff"
                                });
                                return;
                            }
                            this.spawnGroundItem(descriptor, drop.quantity, x, y);
                        }
                        async persistLoot(drop) {
                            if (!this.playerOwnerId) return false;
                            try {
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/inventory/add", {
                                    ownerId: this.playerOwnerId,
                                    item: {
                                        id: drop.id,
                                        name: drop.name,
                                        quantity: drop.quantity,
                                        stackable: true
                                    }
                                });
                                return true;
                            } catch  {
                                return false;
                            }
                        }
                        spawnGroundItem(drop, quantity, x, y, durationMs = GROUND_DROP_LIFETIME) {
                            if (!this.dropLayer) return;
                            const existing = this.groundDrops.find({
                                "CityPhaser.useEffect.existing": (record)=>record.itemId === drop.id && Phaser.Math.Distance.Between(record.x, record.y, x, y) <= DROP_ACCUMULATION_RANGE
                            }["CityPhaser.useEffect.existing"]);
                            if (existing) {
                                existing.amount += quantity;
                                existing.label.setText(`x${existing.amount}`);
                                existing.expiresAt = this.time.now + durationMs;
                                this.time.delayedCall(durationMs, {
                                    "CityPhaser.useEffect": ()=>this.fadeGroundDrop(existing)
                                }["CityPhaser.useEffect"]);
                                return;
                            }
                            const container = this.add.container(x, y);
                            const textureKey = drop.icon ?? LOOT_ICON_PATHS[drop.id];
                            let heightOffset = 28;
                            if (textureKey && this.textures.exists(textureKey)) {
                                const icon = this.add.image(0, 0, textureKey).setOrigin(0.5, 1).setScale(0.7);
                                heightOffset = icon.displayHeight + 10;
                                container.add(icon);
                            } else if (drop.glyph) {
                                const glyph = this.add.text(0, 0, drop.glyph, {
                                    fontSize: "22px",
                                    color: "#ffe27a"
                                }).setOrigin(0.5, 1);
                                container.add(glyph);
                            } else {
                                const placeholder = this.add.text(0, 0, "•", {
                                    fontSize: "18px",
                                    color: "#fff"
                                }).setOrigin(0.5, 1);
                                container.add(placeholder);
                            }
                            const label = this.add.text(0, -heightOffset, `x${quantity}`, {
                                color: "#ffe8c3",
                                fontSize: "13px",
                                fontStyle: "bold",
                                stroke: "#1a0a05",
                                strokeThickness: 3
                            }).setOrigin(0.5, 1);
                            container.add(label);
                            container.setDepth(y - 1);
                            this.dropLayer.add(container);
                            const record = {
                                id: `${drop.id}-${Date.now()}-${Math.random()}`,
                                itemId: drop.id,
                                amount: quantity,
                                container,
                                label,
                                x,
                                y,
                                expiresAt: this.time.now + durationMs
                            };
                            this.groundDrops.push(record);
                            this.time.delayedCall(durationMs, {
                                "CityPhaser.useEffect": ()=>this.fadeGroundDrop(record)
                            }["CityPhaser.useEffect"]);
                        }
                        fadeGroundDrop(record) {
                            this.groundDrops = this.groundDrops.filter({
                                "CityPhaser.useEffect": (entry)=>entry !== record
                            }["CityPhaser.useEffect"]);
                            if (!record.container.active) return;
                            this.tweens.add({
                                targets: record.container,
                                alpha: 0,
                                duration: 350,
                                onComplete: {
                                    "CityPhaser.useEffect": ()=>record.container.destroy()
                                }["CityPhaser.useEffect"]
                            });
                        }
                        showLootNotification({ textureKey, label, amount, color = "#fff" }) {
                            if (!this.player) return;
                            const container = this.add.container(this.player.x, this.player.y - this.player.displayHeight - 12);
                            let textOffset = 0;
                            if (textureKey && this.textures.exists(textureKey)) {
                                const icon = this.add.image(0, 0, textureKey).setOrigin(0.5, 1).setScale(0.55);
                                container.add(icon);
                                textOffset = icon.displayWidth / 2 + 6;
                            } else if (label) {
                                const glyph = this.add.text(0, -4, label, {
                                    fontSize: "18px",
                                    color
                                }).setOrigin(0.5, 1);
                                container.add(glyph);
                                textOffset = 12;
                            }
                            const text = this.add.text(textOffset, -2, `x${amount}`, {
                                color,
                                fontSize: "14px",
                                fontStyle: "bold",
                                stroke: "#1a0a05",
                                strokeThickness: 3
                            }).setOrigin(0, 1);
                            container.add(text);
                            container.setDepth(this.player.depth + 10);
                            this.tweens.add({
                                targets: container,
                                y: container.y - 30,
                                alpha: 0,
                                duration: 600,
                                onComplete: {
                                    "CityPhaser.useEffect": ()=>container.destroy()
                                }["CityPhaser.useEffect"]
                            });
                        }
                        async awardGold(amount) {
                            if (!this.playerOwnerId || !this.playerCharacterId) return;
                            try {
                                const { gold } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/character/gold", {
                                    ownerId: this.playerOwnerId,
                                    characterId: this.playerCharacterId,
                                    amount
                                });
                                this.goldCallback?.(gold);
                            } catch  {
                            // ignore gold failures
                            }
                        }
                        async recordBestiaryKill(monsterId) {
                            if (!this.playerOwnerId || !this.playerCharacterId) return;
                            try {
                                const table = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/character/bestiary", {
                                    ownerId: this.playerOwnerId,
                                    characterId: this.playerCharacterId,
                                    monsterId
                                });
                                this.bestiaryCallback?.(table);
                            } catch  {
                            // ignore bestiary failures
                            }
                        }
                        applyDamageToPlayer(amount, source) {
                            if (!this.player) return;
                            this.showFloatingText(this.player.x, this.player.y - this.player.displayHeight - 6, `-${amount} HP`, "#ff8e8e");
                            this.emitCombatLog({
                                message: `${source} atingiu ${this.heroName} em ${amount} HP`,
                                tone: "damage"
                            });
                            playToneRef(360);
                        }
                        async awardXp(amount) {
                            if (!this.playerOwnerId || !this.playerCharacterId) return;
                            try {
                                const stats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/character/xp", {
                                    ownerId: this.playerOwnerId,
                                    characterId: this.playerCharacterId,
                                    amount
                                });
                                const previousLevel = this.heroLevel;
                                this.heroLevel = stats.level;
                                this.heroXp = stats.xp;
                                this.statsCallback?.(stats);
                                this.updatePlayerLabel();
                                if (stats.level > previousLevel) {
                                    this.emitCombatLog({
                                        message: `${this.heroName} alcançou o nível ${stats.level}!`,
                                        tone: "xp"
                                    });
                                    this.showLevelUpEffect();
                                }
                            } catch  {
                            // ignore xp failures
                            }
                        }
                        showLevelUpEffect() {
                            if (!this.player) return;
                            const beam = this.add.rectangle(this.player.x, this.player.y, 12, this.player.displayHeight * 1.6, 0xfff4c5, 0.85);
                            beam.setOrigin(0.5, 1);
                            beam.setDepth(this.player.depth - 1);
                            beam.setScale(0.3, 0.4);
                            this.tweens.add({
                                targets: beam,
                                scaleX: {
                                    from: 0.3,
                                    to: 1.4
                                },
                                alpha: 0,
                                duration: 600,
                                onComplete: {
                                    "CityPhaser.useEffect": ()=>beam.destroy()
                                }["CityPhaser.useEffect"]
                            });
                            playToneRef(780, 0.5);
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
                                "CityPhaser.useEffect.collidesWithCollision": (zone)=>{
                                    if (Math.abs(zone.x - proposedX) > MAP_TILE_SIZE * 2 || Math.abs(zone.y - proposedY) > MAP_TILE_SIZE * 2) {
                                        return false;
                                    }
                                    return Phaser.Geom.Intersects.CircleToRectangle(playerFeet, zone);
                                }
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
                            this.updateLancers(delta);
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
                    if (game.sound) {
                        game.sound.mute = !soundEnabledRef.current;
                    }
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
        lineNumber: 1432,
        columnNumber: 24
    }, this);
    if (!mapData) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Carregando mapa…"
    }, void 0, false, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 1433,
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
                lineNumber: 1437,
                columnNumber: 7
            }, this),
            orientationHint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "orientation-hint",
                children: "Melhor experiência na horizontal — gire o dispositivo."
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 1439,
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
                        lineNumber: 1444,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 1442,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 1436,
        columnNumber: 5
    }, this);
}
_s(CityPhaser, "QtvsV02KTnZWzHA60GXZhhMjhr0=");
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
    const [factionEventActive, setFactionEventActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [playerPosition, setPlayerPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inventoryVersion, setInventoryVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [combatLog, setCombatLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [gameReady, setGameReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [soundEnabled, setSoundEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
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
                setCharacterInfo({
                    ...data,
                    gold: data.gold ?? 0,
                    bestiary: data.bestiary ?? {}
                });
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
            setCharacterInfo({
                "CityPage.useCallback[handleBestiaryUpdate]": (previous)=>previous ? {
                        ...previous,
                        bestiary: table
                    } : previous
            }["CityPage.useCallback[handleBestiaryUpdate]"]);
        }
    }["CityPage.useCallback[handleBestiaryUpdate]"], []);
    const toggleSound = ()=>setSoundEnabled((previous)=>!previous);
    if (status === "loading" || loadingSession) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Carregando sessão…"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 303,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 302,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "city-shell",
        children: [
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
                                lineNumber: 321,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold leading-tight",
                                        children: link.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-[0.18em] text-amber-100/70",
                                        children: link.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 324,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 322,
                                columnNumber: 15
                            }, this)
                        ]
                    }, link.id, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 316,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 311,
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
                            initialPosition: sessionState?.position,
                            onPositionChange: handlePositionChange,
                            onCombatEvent: handleCombatEvent,
                            onStatsChange: handleStatsChange,
                            onGoldChange: handleGoldChange,
                            onBestiaryUpdate: handleBestiaryUpdate,
                            onFactionEvent: setFactionEventActive,
                            soundEnabled: soundEnabled,
                            onReady: setGameReady
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Faça login e selecione um personagem para carregar o mapa."
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 350,
                            columnNumber: 13
                        }, this),
                        !gameReady && ownerId && characterId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 z-20 flex items-center justify-center rounded-[28px] bg-black/60",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-20 w-20 animate-pulse rounded-full border-4 border-amber-200/60"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 354,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this),
                        characterInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CityHud, {
                            stats: characterInfo.stats,
                            gold: characterInfo.gold
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 357,
                            columnNumber: 29
                        }, this),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopCenterSlots, {
                            onOpenEquipment: ()=>setEquipOpen(true)
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 358,
                            columnNumber: 23
                        }, this),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickSlots, {
                            ownerId: ownerId,
                            characterId: characterId,
                            refreshKey: inventoryVersion,
                            onItemUsed: handleItemUsed,
                            onInventoryChange: notifyInventoryChange
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 360,
                            columnNumber: 13
                        }, this),
                        ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlineBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnlineBadge"], {}, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 370,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SoundToggleButton, {
                                    enabled: soundEnabled,
                                    onToggle: toggleSound
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 371,
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
                            lineNumber: 374,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniMapOverlay, {
                            visible: Boolean(ownerId && showMiniMap),
                            position: playerPosition ?? sessionState?.position,
                            factionEventActive: factionEventActive
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 375,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 331,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            hudEffect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `potion-effect ${hudEffect.type}`,
                children: hudEffect.type === "mana" ? "+ Mana" : "+ Vida"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 383,
                columnNumber: 9
            }, this),
            feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: feedback
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 389,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 388,
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
                        lineNumber: 395,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 394,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 393,
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
                lineNumber: 399,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BestiaryDrawer, {
                open: bestiaryOpen,
                onClose: ()=>setBestiaryOpen(false),
                entries: characterInfo?.bestiary
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 407,
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
                lineNumber: 412,
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
                            lineNumber: 426,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Personagem ativo: ",
                                characterInfo.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 427,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Nível: ",
                                characterInfo.stats.level
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 428,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "button mt-4",
                            onClick: handleFullLogout,
                            children: "Logout"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 429,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 425,
                    columnNumber: 13
                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Nenhum personagem carregado."
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 434,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 419,
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
                    lineNumber: 442,
                    columnNumber: 18
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 438,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CraftingDrawer, {
                open: craftingOpen,
                onClose: ()=>setCraftingOpen(false)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 444,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EquipmentDrawer, {
                open: equipOpen,
                onClose: ()=>setEquipOpen(false)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 445,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 309,
        columnNumber: 5
    }, this);
}
_s(CityPage, "E85W/l3WIK9b9sQ23+mIT3hKPpg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = CityPage;
function getMessage(err) {
    return err instanceof Error ? err.message : "Falha ao carregar personagem";
}
function CityHud({ stats, gold = 0 }) {
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
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 484,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: bar.display
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 485,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 483,
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
                                    lineNumber: 488,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 487,
                                columnNumber: 15
                            }, this)
                        ]
                    }, bar.key, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 482,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 478,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-amber-100/80",
                children: [
                    "Ouro: ",
                    gold ?? 0
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 497,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 477,
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
                lineNumber: 511,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Som"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 512,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 506,
        columnNumber: 5
    }, this);
}
_c2 = SoundToggleButton;
function QuickSlots({ ownerId, characterId, refreshKey, onItemUsed, onInventoryChange }) {
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    lineNumber: 647,
                                    columnNumber: 17
                                }, this),
                                slot && icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: icon,
                                    alt: slot.name,
                                    className: "h-7 w-7 object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 649,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 651,
                                    columnNumber: 19
                                }, this),
                                slot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute bottom-1 right-1 rounded-full bg-black/70 px-2 text-xs",
                                    children: slot.quantity
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 654,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 641,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 637,
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
                            lineNumber: 664,
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
                                        lineNumber: 667,
                                        columnNumber: 19
                                    }, this)),
                                availableItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Sem itens disponíveis."
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 676,
                                    columnNumber: 49
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 665,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "mt-3 w-full rounded-xl bg-gradient-to-r from-amber-200/80 to-amber-500/80 py-1.5 text-xs font-semibold text-stone-900",
                            onClick: ()=>setPickerSlot(null),
                            children: "Fechar"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 678,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 663,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 636,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 635,
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
                    lineNumber: 751,
                    columnNumber: 30
                }, this)
            }, slot.id, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 731,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 726,
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
                            lineNumber: 771,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 772,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 770,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "city-drawer-content",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 776,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 769,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 768,
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
            lineNumber: 800,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 799,
        columnNumber: 5
    }, this);
}
_c6 = InventoryDrawer;
const MONSTER_NAMES = {
    lancer: "Lanceiro",
    "lancer-amber": "Lanceiro Âmbar",
    "lancer-cyan": "Lanceiro Azur",
    "lancer-crimson": "Lanceiro Rubro",
    "lancer-emerald": "Lanceiro Esmeralda"
};
function BestiaryDrawer({ open, onClose, entries }) {
    if (!entries || Object.keys(entries).length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
            open: open,
            onClose: onClose,
            title: "Bestiário",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Derrote monstros para registrar no bestiário."
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 830,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 829,
            columnNumber: 7
        }, this);
    }
    const list = Object.entries(entries).sort((a, b)=>b[1] - a[1]);
    const totalKills = list.reduce((sum, [, count])=>sum + count, 0);
    const uniqueKills = list.length;
    const topEnemy = list[0];
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
                                lineNumber: 842,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-amber-200",
                                children: totalKills
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 843,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 841,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-black/40 px-2 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Espécies"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 846,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-amber-200",
                                children: uniqueKills
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 847,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 845,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-black/40 px-2 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Top"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 850,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-amber-200",
                                children: topEnemy ? MONSTER_NAMES[topEnemy[0]] ?? topEnemy[0] : "-"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 851,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 849,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 840,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2 text-sm text-amber-100",
                children: list.map(([monsterId, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "rounded-2xl border border-white/10 bg-black/40 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-xs uppercase tracking-[0.2em] text-amber-100/70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: MONSTER_NAMES[monsterId] ?? monsterId
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 860,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            (count / totalKills * 100).toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 861,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 859,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-sm font-bold text-amber-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Abates"
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 864,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "x",
                                            count
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 865,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 863,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 h-1 rounded-full bg-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-1 rounded-full bg-amber-300",
                                    style: {
                                        width: `${Math.min(100, count / totalKills * 100)}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 868,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 867,
                                columnNumber: 13
                            }, this),
                            getBestiaryBadge(count) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 inline-flex rounded-full border border-amber-200/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-amber-200/90",
                                children: getBestiaryBadge(count)
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 874,
                                columnNumber: 15
                            }, this)
                        ]
                    }, monsterId, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 858,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 856,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 839,
        columnNumber: 5
    }, this);
}
_c7 = BestiaryDrawer;
function getBestiaryBadge(count) {
    if (count >= 100) return "Veterano";
    if (count >= 50) return "Caçador";
    if (count >= 10) return "Aprendiz";
    return null;
}
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
                                lineNumber: 922,
                                columnNumber: 15
                            }, this)
                        }, slot.id, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 908,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 906,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.25em] text-amber-100/70",
                            children: "Buffs & Debuffs"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 929,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-amber-100/80",
                            children: "Nenhum efeito ativo."
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 930,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 928,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.25em] text-amber-100/70",
                            children: "Atributos"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 935,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-2 space-y-1 text-sm text-amber-100/80",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Força: 0"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 937,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Destreza: 0"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 938,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Inteligência: 0"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 939,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 936,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 934,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 905,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 904,
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
                            lineNumber: 984,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 982,
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
                                    lineNumber: 999,
                                    columnNumber: 25
                                }, this),
                                visibleMessages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-amber-100/70",
                                    children: "Sem mensagens recentes."
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 1001,
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
                                                        lineNumber: 1010,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/play/page.tsx",
                                                lineNumber: 1008,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-base",
                                                children: entry.message
                                            }, void 0, false, {
                                                fileName: "[project]/app/play/page.tsx",
                                                lineNumber: 1014,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, entry.id, true, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 1004,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 998,
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
                                    lineNumber: 1021,
                                    columnNumber: 42
                                }, this),
                                combatLog.slice(-20).map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `rounded-xl border px-3 py-1 font-semibold ${entry.tone === "xp" ? "border-green-200/40 text-green-200" : "border-red-200/40 text-red-200"}`,
                                        children: entry.message
                                    }, entry.id, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 1023,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1020,
                            columnNumber: 13
                        }, this),
                        activeTab === "guild" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-amber-100/70",
                            children: "Chat de guilda em breve."
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1037,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 996,
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
                            lineNumber: 1044,
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
                            lineNumber: 1047,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "rounded-2xl bg-gradient-to-r from-amber-200 to-amber-500 py-2 text-center text-sm font-bold uppercase tracking-[0.4em] text-stone-900 disabled:cursor-not-allowed disabled:opacity-40",
                            disabled: disableInput || message.trim().length === 0,
                            children: "Enviar"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1056,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1040,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 981,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 980,
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
        lineNumber: 1081,
        columnNumber: 5
    }, this);
}
_c10 = PanelDrawer;
function MiniMapOverlay({ visible, position, factionEventActive }) {
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
                lineNumber: 1103,
                columnNumber: 7
            }, this),
            factionEventActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center justify-center gap-1 rounded-full bg-red-600/70 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-white",
                children: "⚔️ Guerra ativa"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 1105,
                columnNumber: 9
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
                    lineNumber: 1110,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 1109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1102,
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
                            lineNumber: 1146,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Resultado: ",
                                recipe.result
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1147,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Ingredientes: ",
                                recipe.ingredients
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1148,
                            columnNumber: 13
                        }, this)
                    ]
                }, recipe.id, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1145,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 1143,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1142,
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

//# sourceMappingURL=_42b65d1d._.js.map