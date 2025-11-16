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
"[project]/components/game/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ATTACK_DISTANCE",
    ()=>ATTACK_DISTANCE,
    "COVER_DEPTH_OFFSET",
    ()=>COVER_DEPTH_OFFSET,
    "GOLD_REWARD_MAX",
    ()=>GOLD_REWARD_MAX,
    "GOLD_REWARD_MIN",
    ()=>GOLD_REWARD_MIN,
    "GROUND_DROP_TTL",
    ()=>GROUND_DROP_TTL,
    "HERO_DAMAGE_MAX",
    ()=>HERO_DAMAGE_MAX,
    "HERO_DAMAGE_MIN",
    ()=>HERO_DAMAGE_MIN,
    "HERO_SCALE",
    ()=>HERO_SCALE,
    "LANCER_COOLDOWN",
    ()=>LANCER_COOLDOWN,
    "LANCER_COUNT",
    ()=>LANCER_COUNT,
    "LANCER_DAMAGE_MAX",
    ()=>LANCER_DAMAGE_MAX,
    "LANCER_DAMAGE_MIN",
    ()=>LANCER_DAMAGE_MIN,
    "LANCER_HP",
    ()=>LANCER_HP,
    "LANCER_SCALE",
    ()=>LANCER_SCALE,
    "LANCER_SEPARATION_FORCE",
    ()=>LANCER_SEPARATION_FORCE,
    "LANCER_SEPARATION_RADIUS",
    ()=>LANCER_SEPARATION_RADIUS,
    "LANCER_SPEED",
    ()=>LANCER_SPEED,
    "LANCER_XP_REWARD",
    ()=>LANCER_XP_REWARD,
    "MAP_TILE_SIZE",
    ()=>MAP_TILE_SIZE,
    "MAX_ATTACKERS",
    ()=>MAX_ATTACKERS,
    "MEDIUM_CRYSTAL_DROP_CHANCE",
    ()=>MEDIUM_CRYSTAL_DROP_CHANCE,
    "MonsterType",
    ()=>MonsterType,
    "NpcState",
    ()=>NpcState,
    "PINCH_SCALE",
    ()=>PINCH_SCALE,
    "PLAYER_SPEED",
    ()=>PLAYER_SPEED,
    "SMALL_CRYSTAL_DROP_CHANCE",
    ()=>SMALL_CRYSTAL_DROP_CHANCE,
    "STOP_DISTANCE",
    ()=>STOP_DISTANCE
]);
const MAP_TILE_SIZE = 64;
const PINCH_SCALE = 0.8;
const PLAYER_SPEED = 220;
const HERO_SCALE = 1;
const LANCER_SCALE = 1;
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
const GOLD_REWARD_MIN = 0;
const GOLD_REWARD_MAX = 3;
const LANCER_XP_REWARD = 2;
const SMALL_CRYSTAL_DROP_CHANCE = 10; // porcentagem
const MEDIUM_CRYSTAL_DROP_CHANCE = 1; // porcentagem
const GROUND_DROP_TTL = 2 * 60 * 60 * 1000;
var NpcState = /*#__PURE__*/ function(NpcState) {
    NpcState[NpcState["Idle"] = 0] = "Idle";
    NpcState[NpcState["Wander"] = 1] = "Wander";
    NpcState[NpcState["Chase"] = 2] = "Chase";
    NpcState[NpcState["Attack"] = 3] = "Attack";
    NpcState[NpcState["Dead"] = 4] = "Dead";
    return NpcState;
}({});
var MonsterType = /*#__PURE__*/ function(MonsterType) {
    MonsterType[MonsterType["Lancer"] = 0] = "Lancer";
    return MonsterType;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/phaserInstance.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPhaserInstance",
    ()=>getPhaserInstance,
    "setPhaserInstance",
    ()=>setPhaserInstance
]);
let phaserRef = null;
function setPhaserInstance(instance) {
    phaserRef = instance;
}
function getPhaserInstance() {
    if (!phaserRef) {
        throw new Error("Phaser instance not initialized");
    }
    return phaserRef;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/layers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildCollisionZones",
    ()=>buildCollisionZones,
    "createFloorTexture",
    ()=>createFloorTexture,
    "renderBuildings",
    ()=>renderBuildings,
    "renderDetails",
    ()=>renderDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/phaserInstance.ts [app-client] (ecmascript)");
;
;
function createFloorTexture(scene, key, groundTiles) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"] * groundTiles.length, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"]);
    if (!canvas) return;
    const ctx = canvas.getContext();
    if (!ctx) return;
    groundTiles.forEach((tile, index)=>{
        const texture = scene.textures.get(`ground-${tile.id}`);
        if (!texture) return;
        const sourceImage = texture.getSourceImage();
        ctx.drawImage(sourceImage, 0, 0, sourceImage.width, sourceImage.height, index * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"], 0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"]);
    });
    canvas.refresh();
}
function renderDetails(scene, detailLayer, mapTileSize) {
    detailLayer.forEach((row, rowIndex)=>{
        row.forEach((cell, columnIndex)=>{
            if (cell <= 0) return;
            const textureKey = `detail-${cell}`;
            if (!scene.textures.exists(textureKey)) return;
            const sprite = scene.add.image(columnIndex * mapTileSize + mapTileSize / 2, rowIndex * mapTileSize + mapTileSize / 2, textureKey);
            sprite.setOrigin(0.5, 0.5);
            sprite.setDepth(10 + rowIndex);
        });
    });
}
function renderBuildings(scene, buildings, lookup) {
    buildings.forEach((row, rowIndex)=>{
        row.forEach((cell, columnIndex)=>{
            if (cell <= 0) return;
            const def = lookup.get(cell);
            if (!def) return;
            const key = `building-${def.id}`;
            if (!scene.textures.exists(key)) return;
            const sprite = scene.add.image(columnIndex * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"] + __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"] / 2, rowIndex * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"] + __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"], key);
            sprite.setOrigin(0.5, 1);
            sprite.setDepth(sprite.y);
        });
    });
}
function buildCollisionZones(collision) {
    const Phaser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhaserInstance"])();
    const zones = [];
    collision.forEach((row, rowIndex)=>{
        row.forEach((value, columnIndex)=>{
            if (value <= 0) return;
            zones.push(new Phaser.Geom.Rectangle(columnIndex * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"], rowIndex * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"]));
        });
    });
    return zones;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/movement.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handlePlayerMovement",
    ()=>handlePlayerMovement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/phaserInstance.ts [app-client] (ecmascript)");
;
;
function handlePlayerMovement({ player, cursors, virtualDirection, collisionZones, npcs, worldWidth, worldHeight, heroAttacking, delta, syncPosition }) {
    const Phaser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhaserInstance"])();
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
    const proposedX = Phaser.Math.Clamp(player.x + dx * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SPEED"] * (delta / 1000), player.displayWidth / 2, worldWidth - player.displayWidth / 2);
    const proposedY = Phaser.Math.Clamp(player.y + dy * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAYER_SPEED"] * (delta / 1000), player.displayHeight / 2, worldHeight);
    const collidesWithNPC = npcs.some((npc)=>Phaser.Math.Distance.Between(npc.sprite.x, npc.sprite.y, proposedX, proposedY) < 40);
    const playerFeet = new Phaser.Geom.Circle(proposedX, proposedY - 8, 18);
    const collidesWithCollision = collisionZones.some((zone)=>Phaser.Geom.Intersects.CircleToRectangle(playerFeet, zone));
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clampPlayerDepth",
    ()=>clampPlayerDepth,
    "randomPoint",
    ()=>randomPoint,
    "showFloatingText",
    ()=>showFloatingText,
    "worldToTile",
    ()=>worldToTile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/phaserInstance.ts [app-client] (ecmascript)");
;
;
function worldToTile(x, y) {
    return {
        x: Math.max(0, Math.floor(x / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"])),
        y: Math.max(0, Math.floor(y / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"]))
    };
}
function clampPlayerDepth(player, coverMatrix, label) {
    const tileX = Math.max(0, Math.floor(player.x / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"]));
    const tileY = Math.max(0, Math.floor(player.y / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"]));
    const coverValue = coverMatrix[tileY]?.[tileX] ?? 0;
    const depthOffset = coverValue > 0 ? -__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COVER_DEPTH_OFFSET"] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COVER_DEPTH_OFFSET"];
    player.setDepth(player.y + depthOffset);
    label?.setPosition(player.x, player.y - player.displayHeight - 6).setDepth(player.depth + 5);
}
function randomPoint(scene, width, height) {
    const Phaser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhaserInstance"])();
    return new Phaser.Math.Vector2(Phaser.Math.Between(80, width - 80), Phaser.Math.Between(80, height - 80));
}
function showFloatingText(scene, x, y, text, color) {
    const floating = scene.add.text(x, y, text, {
        color,
        fontSize: "16px",
        fontStyle: "bold"
    }).setOrigin(0.5, 1).setDepth(2000).setAlpha(0.95);
    scene.tweens.add({
        targets: floating,
        y: y - 30,
        alpha: 0,
        duration: 600,
        onComplete: ()=>floating.destroy()
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/npcAI.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "spawnNPCs",
    ()=>spawnNPCs,
    "updateLancers",
    ()=>updateLancers,
    "updateNPCs",
    ()=>updateNPCs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/phaserInstance.ts [app-client] (ecmascript)");
;
;
;
function spawnNPCs(scene, count, worldWidth, worldHeight, npcColors, names, records) {
    const Phaser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhaserInstance"])();
    for(let i = 0; i < count; i++){
        const sprite = scene.add.sprite(Phaser.Math.Between(120, worldWidth - 120), Phaser.Math.Between(120, worldHeight - 120), "hero-idle-sheet", 0);
        sprite.setOrigin(0.5, 1);
        sprite.setScale(1);
        sprite.setTint(npcColors[i % npcColors.length]);
        sprite.play("hero-idle");
        sprite.setDepth(sprite.y);
        const level = Phaser.Math.Between(3, 12);
        const name = `${names[i % names.length]} Lv.${level}`;
        const label = scene.add.text(sprite.x, sprite.y - sprite.displayHeight - 4, name, {
            color: "#fff8d0",
            fontSize: "14px",
            fontStyle: "bold"
        }).setOrigin(0.5, 1).setDepth(sprite.depth + 5);
        records.push({
            sprite,
            label,
            target: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomPoint"])(scene, worldWidth, worldHeight),
            name
        });
    }
}
function updateNPCs(scene, npcs, delta, worldWidth, worldHeight) {
    const Phaser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhaserInstance"])();
    const speed = 60;
    npcs.forEach((npc)=>{
        const dir = new Phaser.Math.Vector2(npc.target.x - npc.sprite.x, npc.target.y - npc.sprite.y);
        if (dir.length() < 10) {
            npc.target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomPoint"])(scene, worldWidth, worldHeight);
            npc.sprite.play("hero-idle", true);
            return;
        }
        dir.normalize();
        npc.sprite.x += dir.x * speed * (delta / 1000);
        npc.sprite.y += dir.y * speed * (delta / 1000);
        npc.label.setPosition(npc.sprite.x, npc.sprite.y - npc.sprite.displayHeight - 4);
        npc.sprite.setDepth(npc.sprite.y);
        npc.label.setDepth(npc.sprite.depth + 5);
        npc.sprite.setFlipX(dir.x < 0);
        npc.sprite.play("hero-run", true);
    });
}
function updateLancers(player, lancers, delta, allowCombat) {
    const Phaser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhaserInstance"])();
    const activeLancers = lancers.filter((lancer)=>lancer.sprite.active);
    const ordered = activeLancers.map((entry)=>({
            lancer: entry,
            distance: Phaser.Math.Distance.Between(entry.sprite.x, entry.sprite.y, player.x, player.y)
        })).sort((a, b)=>a.distance - b.distance);
    const allowed = new Set(ordered.slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_ATTACKERS"]).map((entry)=>entry.lancer));
    activeLancers.forEach((lancer)=>{
        const dir = new Phaser.Math.Vector2(player.x - lancer.sprite.x, player.y - lancer.sprite.y);
        const distance = dir.length();
        const direction = distance > 0 ? dir.clone().normalize() : new Phaser.Math.Vector2();
        const isAllowed = allowed.has(lancer);
        if (isAllowed && distance > __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STOP_DISTANCE"]) {
            lancer.sprite.x += direction.x * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SPEED"] * (delta / 1000);
            lancer.sprite.y += direction.y * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SPEED"] * (delta / 1000);
            lancer.sprite.setFlipX(direction.x < 0);
            lancer.sprite.play("lancer-run", true);
        } else if (!isAllowed && distance < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STOP_DISTANCE"] + 30 && distance > 0) {
            lancer.sprite.x -= direction.x * (__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SPEED"] * 0.6) * (delta / 1000);
            lancer.sprite.y -= direction.y * (__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SPEED"] * 0.6) * (delta / 1000);
            lancer.sprite.setFlipX(direction.x < 0);
            lancer.sprite.play("lancer-run", true);
        }
        const separation = new Phaser.Math.Vector2();
        activeLancers.forEach((other)=>{
            if (other === lancer) return;
            const offset = new Phaser.Math.Vector2(lancer.sprite.x - other.sprite.x, lancer.sprite.y - other.sprite.y);
            const dist = offset.length();
            if (dist > 0 && dist < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SEPARATION_RADIUS"]) {
                offset.normalize().scale((__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SEPARATION_RADIUS"] - dist) / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SEPARATION_RADIUS"]);
                separation.add(offset);
            }
        });
        if (separation.lengthSq() > 0) {
            separation.normalize();
            lancer.sprite.x += separation.x * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SEPARATION_FORCE"] * (delta / 1000);
            lancer.sprite.y += separation.y * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SEPARATION_FORCE"] * (delta / 1000);
        }
        lancer.sprite.setDepth(lancer.sprite.y);
        lancer.label.setPosition(lancer.sprite.x, lancer.sprite.y - lancer.sprite.displayHeight - 4).setDepth(lancer.sprite.depth + 5);
        if (isAllowed && distance < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STOP_DISTANCE"]) {
            allowCombat(lancer);
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/combat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleCombat",
    ()=>handleCombat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/phaserInstance.ts [app-client] (ecmascript)");
;
;
;
function handleCombat(lancer, deps) {
    const Phaser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhaserInstance"])();
    const now = deps.scene.time.now;
    if (now - lancer.lastAttack < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_COOLDOWN"]) return;
    lancer.lastAttack = now;
    deps.triggerHeroAttack();
    deps.triggerLancerAttack(lancer);
    const heroDamage = Phaser.Math.Between(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_DAMAGE_MIN"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_DAMAGE_MAX"]);
    const lancerDamage = Phaser.Math.Between(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_DAMAGE_MIN"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_DAMAGE_MAX"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showFloatingText"])(deps.scene, lancer.sprite.x, lancer.sprite.y - lancer.sprite.displayHeight, `-${heroDamage} HP`, "#fff6c4");
    deps.emitCombatLog?.({
        message: `${lancer.label.text} perdeu ${heroDamage} HP`,
        tone: "damage"
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showFloatingText"])(deps.scene, deps.player.x, deps.player.y - deps.player.displayHeight - 6, `-${lancerDamage} HP`, "#ff7a7a");
    deps.emitCombatLog?.({
        message: `${deps.heroName} perdeu ${lancerDamage} HP`,
        tone: "damage"
    });
    deps.playTone(420);
    lancer.hp -= heroDamage;
    if (lancer.hp <= 0) {
        deps.onLancerDeath(lancer);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/playerActions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyDamageToPlayer",
    ()=>applyDamageToPlayer,
    "triggerHeroAttack",
    ()=>triggerHeroAttack,
    "triggerLancerAttack",
    ()=>triggerLancerAttack
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/utils.ts [app-client] (ecmascript)");
;
;
function triggerHeroAttack(scene, player, opts, duration) {
    if (!duration || opts.isAttacking) return;
    opts.setAttacking(true);
    player.play("hero-attack", true);
    scene.time.delayedCall(duration, ()=>{
        opts.setAttacking(false);
    });
}
function triggerLancerAttack(scene, lancer) {
    lancer.sprite.play("lancer-attack", true);
    const duration = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_COOLDOWN"] / 2;
    scene.time.delayedCall(duration, ()=>{
        if (lancer.sprite.active) {
            lancer.sprite.play("lancer-run", true);
        }
    });
}
function applyDamageToPlayer(scene, player, amount, source, emitCombatLog, playTone) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showFloatingText"])(scene, player.x, player.y - player.displayHeight - 6, `-${amount} HP`, "#ff8e8e");
    emitCombatLog?.({
        message: `${source} atingiu o herói em ${amount} HP`,
        tone: "damage"
    });
    playTone?.(360);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/dialog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scheduleNpcSpeech",
    ()=>scheduleNpcSpeech
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/phaserInstance.ts [app-client] (ecmascript)");
;
const NPC_MESSAGES = [
    "Patrulha em andamento.",
    "A cidade precisa de você.",
    "Alguma troca?",
    "Boas vindas!"
];
function scheduleNpcSpeech(scene, npc, messages = NPC_MESSAGES) {
    const Phaser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhaserInstance"])();
    scene.time.addEvent({
        delay: Phaser.Math.Between(4000, 9000),
        callback: ()=>{
            const message = messages[Phaser.Math.Between(0, messages.length - 1)];
            const text = scene.add.text(npc.sprite.x, npc.sprite.y - npc.sprite.displayHeight - 8, message, {
                color: "#fff3d4",
                fontSize: "13px",
                backgroundColor: "rgba(0,0,0,0.6)",
                padding: {
                    x: 8,
                    y: 4
                }
            }).setOrigin(0.5, 1).setDepth(npc.sprite.depth + 10).setAlpha(0);
            scene.tweens.add({
                targets: text,
                alpha: 1,
                duration: 150,
                yoyo: true,
                hold: 2000,
                completeDelay: 300,
                onComplete: ()=>text.destroy()
            });
            scheduleNpcSpeech(scene, npc, messages);
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/drops.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "grantRewards",
    ()=>grantRewards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/phaserInstance.ts [app-client] (ecmascript)");
;
;
function grantRewards(scene, player, callbacks, monsterType) {
    const Phaser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhaserInstance"])();
    const goldReward = Phaser.Math.Between(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOLD_REWARD_MIN"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOLD_REWARD_MAX"]);
    if (goldReward > 0) {
        scene.add.text(player.x, player.y - player.displayHeight - 50, `+${goldReward} ouro`, {
            color: "#ffe78a",
            fontSize: "16px",
            fontStyle: "bold"
        }).setOrigin(0.5, 1).setDepth(2000);
        callbacks.awardGold(goldReward);
    }
    callbacks.recordBestiary(monsterType);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/game/lancers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLancer",
    ()=>createLancer,
    "handleLancerDeath",
    ()=>handleLancerDeath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$drops$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/drops.ts [app-client] (ecmascript)");
;
;
;
function createLancer(scene, index, tints, worldWidth, worldHeight, runSheet, runAnim) {
    const spawnPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomPoint"])(scene, worldWidth, worldHeight);
    const sprite = scene.add.sprite(spawnPoint.x, spawnPoint.y, runSheet, 0);
    sprite.setOrigin(0.5, 1);
    sprite.setScale(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_SCALE"]);
    sprite.setTint(tints[index % tints.length]);
    sprite.play(runAnim);
    sprite.setDepth(sprite.y);
    const label = scene.add.text(sprite.x, sprite.y - sprite.displayHeight - 4, "Lanceiro", {
        color: "#fdf5d0",
        fontSize: "14px",
        fontStyle: "bold"
    }).setOrigin(0.5, 1).setDepth(sprite.depth + 5);
    return {
        sprite,
        label,
        hp: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_HP"],
        lastAttack: 0,
        type: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MonsterType"].Lancer
    };
}
function handleLancerDeath(scene, player, lancer, callbacks) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showFloatingText"])(scene, player.x, player.y - player.displayHeight - 30, "+2 XP", "#94f1a4");
    callbacks.emitXp();
    callbacks.playTone(620);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$drops$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["grantRewards"])(scene, player, {
        awardGold: callbacks.awardGold,
        recordBestiary: callbacks.recordBestiary
    }, lancer.type);
    callbacks.rewardItems();
    scene.tweens.add({
        targets: [
            lancer.sprite,
            lancer.label
        ],
        alpha: 0,
        duration: 250,
        onComplete: ()=>{
            lancer.sprite.destroy();
            lancer.label.destroy();
            callbacks.respawn(600);
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useSessionPosition.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSessionPosition",
    ()=>useSessionPosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useSessionPosition(onPositionChange) {
    _s();
    const lastX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastSync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const syncPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSessionPosition.useCallback[syncPosition]": (x, y, force = false)=>{
            const deltaX = Math.abs(x - lastX.current);
            const deltaY = Math.abs(y - lastY.current);
            const movedTiles = Math.max(deltaX, deltaY) / __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"];
            if (!force && movedTiles < 2) return;
            const now = performance.now();
            if (!force && now - lastSync.current < 150) return;
            lastX.current = x;
            lastY.current = y;
            lastSync.current = now;
            onPositionChange?.({
                x,
                y
            });
        }
    }["useSessionPosition.useCallback[syncPosition]"], [
        onPositionChange
    ]);
    return syncPosition;
}
_s(useSessionPosition, "BCdFP7lGON3LogDf+kzhiSO3yKo=");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$layers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/layers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$movement$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/movement.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$npcAI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/npcAI.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$combat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/combat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$playerActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/playerActions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/phaserInstance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$dialog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/dialog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$lancers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/game/lancers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSessionPosition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useSessionPosition.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
;
;
;
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
const BESTIARY_MONSTER_ID = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MonsterType"].Lancer;
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
const DROP_TEXTURES = [
    {
        key: "drop-item30",
        path: "/itens/item30.png"
    },
    {
        key: "drop-item31",
        path: "/itens/item31.png"
    }
];
const CRYSTAL_DROPS = {
    small: {
        id: "item30",
        name: "Cristal pequeno de XP",
        texture: "drop-item30"
    },
    medium: {
        id: "item31",
        name: "Cristal médio de XP",
        texture: "drop-item31"
    }
};
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
    const combatHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const goldHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const bestiaryHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const readyHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const statsHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const initializedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const syncSessionPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSessionPosition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSessionPosition"])(onPositionChange);
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
            statsHandlerRef.current = onStatsChange;
        }
    }["CityPhaser.useEffect"], [
        onStatsChange
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
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$phaserInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setPhaserInstance"])(Phaser);
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
                    const sessionSync = syncSessionPosition;
                    const goldCallbackRef = goldHandlerRef.current;
                    const bestiaryCallbackRef = bestiaryHandlerRef.current;
                    const statsCallbackRef = statsHandlerRef.current;
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
                        playerOwnerId = ownerId;
                        playerCharacterId = characterId;
                        goldCallback = goldCallbackRef;
                        bestiaryCallback = bestiaryCallbackRef;
                        statsCallback = statsCallbackRef;
                        dropLayer;
                        groundDrops = [];
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
                            DROP_TEXTURES.forEach({
                                "CityPhaser.useEffect": (texture)=>{
                                    this.load.image(texture.key, texture.path);
                                }
                            }["CityPhaser.useEffect"]);
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
                            this.spawnLancers(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_COUNT"]);
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
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$layers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFloorTexture"])(this, "city-floor", groundTiles);
                            this.map = this.make.tilemap({
                                data: mapReference.ground,
                                tileWidth: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"],
                                tileHeight: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"]
                            });
                            const tileset = this.map.addTilesetImage("city-floor", "city-floor", __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"], 0, 0);
                            if (!tileset) {
                                throw new Error("Tileset da cidade não pôde ser carregado.");
                            }
                            this.floorLayer = this.map.createLayer(0, tileset) ?? undefined;
                            this.floorLayer?.setOrigin(0);
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$layers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderDetails"])(this, mapReference.detail, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"]);
                            this.worldWidth = this.map.widthInPixels;
                            this.worldHeight = this.map.heightInPixels;
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$layers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderBuildings"])(this, mapReference.buildings, buildingLookup);
                            this.collisionZones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$layers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildCollisionZones"])(mapReference.collision);
                            this.dropLayer = this.add.layer();
                        }
                        createPlayer() {
                            this.player = this.add.sprite(0, 0, HERO_RUN_SHEET_KEY, 0);
                            this.player.setOrigin(0.5, 1);
                            this.player.setScale(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_SCALE"]);
                            this.player.setDepth(this.player.y + __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COVER_DEPTH_OFFSET"]);
                            const startX = initialPosition?.x ?? this.worldWidth / 2;
                            const startY = initialPosition?.y ?? this.worldHeight / 2;
                            this.player.setPosition(startX, startY);
                            this.player.play(HERO_IDLE_KEY);
                            sessionSync(startX, startY, true);
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
                            const initialCount = this.npcs.length;
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$npcAI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spawnNPCs"])(this, names.length, this.worldWidth, this.worldHeight, NPC_COLORS, names, this.npcs);
                            this.npcs.slice(initialCount).forEach({
                                "CityPhaser.useEffect": (npc)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$dialog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleNpcSpeech"])(this, npc)
                            }["CityPhaser.useEffect"]);
                        }
                        spawnLancers(count) {
                            for(let i = 0; i < count; i++){
                                this.spawnLancer(i);
                            }
                        }
                        spawnLancer(index = 0) {
                            const lancer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$lancers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLancer"])(this, index, LANCER_TINTS, this.worldWidth, this.worldHeight, LANCER_SHEET_RUN, LANCER_RUN_KEY);
                            this.lancers.push(lancer);
                        }
                        grantXp(amount) {
                            if (!this.playerOwnerId || !this.playerCharacterId || amount <= 0) return;
                            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/character/xp", {
                                ownerId: this.playerOwnerId,
                                characterId: this.playerCharacterId,
                                amount
                            }).then({
                                "CityPhaser.useEffect": (stats)=>{
                                    this.statsCallback?.(stats);
                                }
                            }["CityPhaser.useEffect"]).catch({
                                "CityPhaser.useEffect": ()=>undefined
                            }["CityPhaser.useEffect"]);
                        }
                        async rewardCrystal(def, position) {
                            if (!this.playerOwnerId) return;
                            try {
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/inventory/add", {
                                    ownerId: this.playerOwnerId,
                                    item: {
                                        id: def.id,
                                        name: def.name,
                                        quantity: 1,
                                        stackable: true
                                    }
                                });
                                this.emitCombatLog({
                                    message: `${def.name} obtido`,
                                    tone: "xp"
                                });
                            } catch  {
                                this.spawnGroundDrop(def, position);
                            }
                        }
                        spawnGroundDrop(def, position) {
                            if (!this.textures.exists(def.texture)) return;
                            const sprite = this.add.image(position.x, position.y - 4, def.texture).setOrigin(0.5, 1).setScale(0.75);
                            const label = this.add.text(position.x, position.y + 6, "x1", {
                                color: "#ffe9bf",
                                fontSize: "12px",
                                fontStyle: "bold",
                                backgroundColor: "rgba(0,0,0,0.55)",
                                padding: {
                                    x: 6,
                                    y: 2
                                }
                            }).setOrigin(0.5, 0);
                            const depth = position.y;
                            sprite.setDepth(depth + 2);
                            label.setDepth(depth + 3);
                            this.dropLayer?.add(sprite);
                            this.dropLayer?.add(label);
                            this.groundDrops.push({
                                sprite,
                                label
                            });
                            if (this.groundDrops.length > 50) {
                                const earliest = this.groundDrops.shift();
                                earliest?.sprite.destroy();
                                earliest?.label.destroy();
                            }
                            this.time.delayedCall(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GROUND_DROP_TTL"], {
                                "CityPhaser.useEffect": ()=>{
                                    sprite.destroy();
                                    label.destroy();
                                    this.groundDrops = this.groundDrops.filter({
                                        "CityPhaser.useEffect": (entry)=>entry.sprite !== sprite
                                    }["CityPhaser.useEffect"]);
                                }
                            }["CityPhaser.useEffect"]);
                        }
                        handleDropRewards(position) {
                            const highRoll = Phaser.Math.Between(1, 100);
                            if (highRoll <= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MEDIUM_CRYSTAL_DROP_CHANCE"]) {
                                void this.rewardCrystal(CRYSTAL_DROPS.medium, position);
                                return;
                            }
                            if (highRoll <= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MEDIUM_CRYSTAL_DROP_CHANCE"] + __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SMALL_CRYSTAL_DROP_CHANCE"]) {
                                void this.rewardCrystal(CRYSTAL_DROPS.small, position);
                            }
                        }
                        triggerHeroAttack() {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$playerActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["triggerHeroAttack"])(this, this.player, {
                                isAttacking: this.heroAttacking,
                                setAttacking: {
                                    "CityPhaser.useEffect": (state)=>{
                                        this.heroAttacking = state;
                                    }
                                }["CityPhaser.useEffect"]
                            }, HERO_CONFIG.attack ? HERO_CONFIG.attack.frames / HERO_CONFIG.attack.frameRate * 1000 : 0);
                        }
                        triggerLancerAttack(lancer) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$playerActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["triggerLancerAttack"])(this, lancer);
                        }
                        handleLancerDeath(lancer) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$lancers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleLancerDeath"])(this, this.player, lancer, {
                                emitXp: {
                                    "CityPhaser.useEffect": ()=>{
                                        this.emitCombatLog({
                                            message: `+${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_XP_REWARD"]} XP`,
                                            tone: "xp"
                                        });
                                        this.grantXp(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANCER_XP_REWARD"]);
                                    }
                                }["CityPhaser.useEffect"],
                                playTone: playToneRef,
                                awardGold: {
                                    "CityPhaser.useEffect": (amount)=>this.awardGold(amount)
                                }["CityPhaser.useEffect"],
                                recordBestiary: {
                                    "CityPhaser.useEffect": (monsterType)=>this.recordBestiaryKill(monsterType)
                                }["CityPhaser.useEffect"],
                                respawn: {
                                    "CityPhaser.useEffect": (delay)=>this.time.delayedCall(delay, {
                                            "CityPhaser.useEffect": ()=>{
                                                this.lancers = this.lancers.filter({
                                                    "CityPhaser.useEffect": (entry)=>entry !== lancer
                                                }["CityPhaser.useEffect"]);
                                                this.spawnLancer(Phaser.Math.Between(0, 1000));
                                            }
                                        }["CityPhaser.useEffect"])
                                }["CityPhaser.useEffect"],
                                rewardItems: {
                                    "CityPhaser.useEffect": ()=>this.handleDropRewards({
                                            x: lancer.sprite.x,
                                            y: lancer.sprite.y
                                        })
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
                        emitCombatLog(event) {
                            combatEventRef?.(event);
                        }
                        update(_, delta) {
                            if (!this.player || !this.map) return;
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$movement$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handlePlayerMovement"])({
                                player: this.player,
                                cursors: this.cursors,
                                virtualDirection: virtualDirectionRef.current,
                                collisionZones: this.collisionZones,
                                npcs: this.npcs,
                                worldWidth: this.worldWidth,
                                worldHeight: this.worldHeight,
                                heroAttacking: this.heroAttacking,
                                delta,
                                syncPosition: {
                                    "CityPhaser.useEffect": (x, y, force)=>sessionSync(x, y, force)
                                }["CityPhaser.useEffect"]
                            });
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampPlayerDepth"])(this.player, mapReference.cover, this.playerLabel);
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$npcAI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateNPCs"])(this, this.npcs, delta, this.worldWidth, this.worldHeight);
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$npcAI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateLancers"])(this.player, this.lancers, delta, {
                                "CityPhaser.useEffect": (lancer)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$combat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleCombat"])(lancer, {
                                        scene: this,
                                        player: this.player,
                                        heroName: this.heroName,
                                        emitCombatLog: {
                                            "CityPhaser.useEffect": (event)=>this.emitCombatLog(event)
                                        }["CityPhaser.useEffect"],
                                        playTone: playToneRef,
                                        triggerHeroAttack: {
                                            "CityPhaser.useEffect": ()=>this.triggerHeroAttack()
                                        }["CityPhaser.useEffect"],
                                        triggerLancerAttack: {
                                            "CityPhaser.useEffect": (target)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$playerActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["triggerLancerAttack"])(this, target)
                                        }["CityPhaser.useEffect"],
                                        onLancerDeath: {
                                            "CityPhaser.useEffect": (target)=>this.handleLancerDeath(target)
                                        }["CityPhaser.useEffect"]
                                    })
                            }["CityPhaser.useEffect"]);
                        }
                    }
                    const getSize = {
                        "CityPhaser.useEffect.getSize": ()=>{
                            const containerWidth = ref.current?.clientWidth ?? window.innerWidth ?? 960;
                            const viewportWidth = window.innerWidth ?? containerWidth;
                            const isDesktop = viewportWidth >= 1200;
                            const maxWidth = isDesktop ? 1340 : viewportWidth - 24;
                            const baseWidth = Math.min(containerWidth, maxWidth);
                            const widthCandidate = Math.round(baseWidth * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PINCH_SCALE"]) + 4 * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"];
                            const width = Math.max(620, Math.min(maxWidth, widthCandidate));
                            const baseHeight = Math.round(width * (isDesktop ? 0.5 : 0.66));
                            const height = baseHeight + 3 * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$game$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_SIZE"];
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
        characterId,
        syncSessionPosition
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
        lineNumber: 741,
        columnNumber: 24
    }, this);
    if (!mapData) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Carregando mapa…"
    }, void 0, false, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 742,
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
                lineNumber: 746,
                columnNumber: 7
            }, this),
            orientationHint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "orientation-hint",
                children: "Melhor experiência na horizontal — gire o dispositivo."
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 748,
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
                        lineNumber: 753,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/CityPhaser.tsx",
                lineNumber: 751,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CityPhaser.tsx",
        lineNumber: 745,
        columnNumber: 5
    }, this);
}
_s(CityPhaser, "m7PLVLulAs74NLA0AkgovNJv1xY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSessionPosition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSessionPosition"]
    ];
});
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
"[project]/hooks/useXp.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useXp",
    ()=>useXp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useXp(ownerId, characterId) {
    _s();
    const grantXp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useXp.useCallback[grantXp]": async (amount)=>{
            if (!ownerId || !characterId || amount <= 0) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/character/xp", {
                ownerId,
                characterId,
                amount
            }).catch({
                "useXp.useCallback[grantXp]": ()=>undefined
            }["useXp.useCallback[grantXp]"]);
        }
    }["useXp.useCallback[grantXp]"], [
        ownerId,
        characterId
    ]);
    return {
        grantXp
    };
}
_s(useXp, "ZN+rBMEqDoF8dFEGDJzrGJXQ5v0=");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useXp$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useXp.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
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
    const { grantXp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useXp$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useXp"])(ownerId, characterId);
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
            const xpAmount = consumableXp[itemId];
            if (xpAmount) {
                await grantXp(xpAmount);
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
                lineNumber: 115,
                columnNumber: 7
            }, this),
            feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: feedback
            }, void 0, false, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 116,
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
                            lineNumber: 123,
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
                                lineNumber: 133,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: slot.name
                            }, void 0, false, {
                                fileName: "[project]/components/InventoryPanel.tsx",
                                lineNumber: 133,
                                columnNumber: 69
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "quantity",
                                children: slot.quantity
                            }, void 0, false, {
                                fileName: "[project]/components/InventoryPanel.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${slot.id}-${index}`, true, {
                        fileName: "[project]/components/InventoryPanel.tsx",
                        lineNumber: 127,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 117,
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
                        lineNumber: 141,
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
                                lineNumber: 144,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/InventoryPanel.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InventoryPanel.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InventoryPanel.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(InventoryPanel, "76G03qaA2TXpoa/DZgMsf/Ch86Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useXp$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useXp"]
    ];
});
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
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useXp$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useXp.ts [app-client] (ecmascript)");
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
                lineNumber: 336,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 335,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlayTopNav, {
                links: playNavLinks
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 343,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: `city-shell ${ownerId ? "pt-32 md:pt-40" : ""}`,
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
                                    lineNumber: 348,
                                    columnNumber: 13
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Faça login e selecione um personagem para carregar o mapa."
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this),
                                !gameReady && ownerId && characterId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-20 flex items-center justify-center rounded-[28px] bg-black/60",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-20 w-20 animate-pulse rounded-full border-4 border-amber-200/60"
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 369,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 368,
                                    columnNumber: 13
                                }, this),
                                characterInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CityHud, {
                                    stats: characterInfo.stats
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 372,
                                    columnNumber: 29
                                }, this),
                                ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopCenterSlots, {
                                    onOpenEquipment: ()=>setEquipOpen(true)
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 373,
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
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this),
                                ownerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnlineBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnlineBadge"], {}, void 0, false, {
                                            fileName: "[project]/app/play/page.tsx",
                                            lineNumber: 386,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SoundToggleButton, {
                                            enabled: soundEnabled,
                                            onToggle: toggleSound
                                        }, void 0, false, {
                                            fileName: "[project]/app/play/page.tsx",
                                            lineNumber: 387,
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
                                    lineNumber: 390,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniMapOverlay, {
                                    visible: Boolean(ownerId && showMiniMap),
                                    position: playerPosition ?? sessionState?.position
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 391,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 346,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    hudEffect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `potion-effect ${hudEffect.type}`,
                        children: hudEffect.type === "mana" ? "+ Mana" : "+ Vida"
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this),
                    feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: feedback
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 403,
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
                                lineNumber: 410,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 409,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 408,
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
                        lineNumber: 414,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BestiaryDrawer, {
                        open: bestiaryOpen,
                        onClose: ()=>setBestiaryOpen(false),
                        entries: bestiaryEntries
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 422,
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
                        lineNumber: 427,
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
                                    lineNumber: 441,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Personagem ativo: ",
                                        characterInfo.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Nível: ",
                                        characterInfo.stats.level
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 443,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "button mt-4",
                                    onClick: handleFullLogout,
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 444,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 440,
                            columnNumber: 13
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Nenhum personagem carregado."
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 449,
                            columnNumber: 13
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 434,
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
                            lineNumber: 457,
                            columnNumber: 18
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 453,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CraftingDrawer, {
                        open: craftingOpen,
                        onClose: ()=>setCraftingOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 459,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EquipmentDrawer, {
                        open: equipOpen,
                        onClose: ()=>setEquipOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 460,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
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
                                    lineNumber: 500,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: bar.display
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 501,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 499,
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
                                lineNumber: 504,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 503,
                            columnNumber: 15
                        }, this)
                    ]
                }, bar.key, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 498,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 494,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 493,
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
                lineNumber: 524,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Som"
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 525,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 519,
        columnNumber: 5
    }, this);
}
_c2 = SoundToggleButton;
function PlayTopNav({ links }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-black/85 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex w-full max-w-6xl items-center gap-8 px-4 py-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/weapons/club/200.png",
                            alt: "Mystic Tales",
                            className: "h-14 w-14 rounded-sm border border-white/15 bg-black/40 p-1"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 535,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold uppercase tracking-[0.25em] text-amber-100",
                                    children: "Mystic Tales"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 541,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] uppercase tracking-[0.2em] text-amber-200/70",
                                    children: "Cidade Multiplayer Alpha"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 544,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 540,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 534,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex flex-1 flex-wrap items-center justify-start gap-2",
                    "aria-label": "Menu do jogo",
                    children: links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-left text-amber-100 transition hover:bg-white/10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: link.icon,
                                    alt: "",
                                    className: "h-8 w-8 object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 556,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold leading-tight",
                                            children: link.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/play/page.tsx",
                                            lineNumber: 558,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[9px] uppercase tracking-[0.18em] text-amber-100/70",
                                            children: link.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/play/page.tsx",
                                            lineNumber: 559,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 557,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, link.id, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 551,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 549,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 533,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 532,
        columnNumber: 5
    }, this);
}
_c3 = PlayTopNav;
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
    const { grantXp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useXp$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useXp"])(ownerId, characterId);
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
            const xpAmount = consumableXp[slot.id];
            if (xpAmount) {
                await grantXp(xpAmount);
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
                                        lineNumber: 711,
                                        columnNumber: 17
                                    }, this),
                                    slot && icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: icon,
                                        alt: slot.name,
                                        className: "h-7 w-7 object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 713,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 715,
                                        columnNumber: 19
                                    }, this),
                                    slot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute bottom-1 right-1 rounded-full bg-black/70 px-2 text-xs",
                                        children: slot.quantity
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 718,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 705,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 701,
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
                                lineNumber: 728,
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
                                            lineNumber: 731,
                                            columnNumber: 19
                                        }, this)),
                                    availableItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Sem itens disponíveis."
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 740,
                                        columnNumber: 49
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 729,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-3 w-full rounded-xl bg-gradient-to-r from-amber-200/80 to-amber-500/80 py-1.5 text-xs font-semibold text-stone-900",
                                onClick: ()=>setPickerSlot(null),
                                children: "Fechar"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 742,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 727,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 700,
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
                        lineNumber: 754,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: goldAmount
                    }, void 0, false, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 755,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 753,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 699,
        columnNumber: 5
    }, this);
}
_s1(QuickSlots, "JfeeCPKWYrDVJpgOuvg3dBOJAGc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useXp$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useXp"]
    ];
});
_c4 = QuickSlots;
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
                    lineNumber: 808,
                    columnNumber: 30
                }, this)
            }, slot.id, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 788,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 783,
        columnNumber: 5
    }, this);
}
_c5 = TopCenterSlots;
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
                            lineNumber: 828,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 829,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 827,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "city-drawer-content",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 833,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 826,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 825,
        columnNumber: 5
    }, this);
}
_c6 = Drawer;
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
            lineNumber: 857,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 856,
        columnNumber: 5
    }, this);
}
_c7 = InventoryDrawer;
const MONSTER_NAMES = new Map([
    [
        0,
        "Lanceiro"
    ]
]);
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
                lineNumber: 881,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 880,
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
                                lineNumber: 893,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-amber-200",
                                children: totalKills
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 894,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 892,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-black/40 px-2 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Espécies"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 897,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-amber-200",
                                children: uniqueKills
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 898,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 896,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 bg-black/40 px-2 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Top"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 901,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-amber-200",
                                children: topEnemy ? MONSTER_NAMES.get(topEnemy.monsterId) ?? `${topEnemy.monsterId}` : "-"
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 902,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 900,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 891,
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
                                        children: MONSTER_NAMES.get(entry.monsterId) ?? `${entry.monsterId}`
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 911,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            totalKills > 0 ? (entry.kills / totalKills * 100).toFixed(1) : "0.0",
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 912,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 910,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-sm font-bold text-amber-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Abates"
                                    }, void 0, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 915,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "x",
                                            entry.kills
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 916,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 914,
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
                                    lineNumber: 919,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 918,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 inline-flex rounded-full border border-amber-200/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-amber-200/90",
                                children: BESTIARY_TIER_LABELS[entry.tier] ?? BESTIARY_TIER_LABELS[0]
                            }, void 0, false, {
                                fileName: "[project]/app/play/page.tsx",
                                lineNumber: 926,
                                columnNumber: 13
                            }, this)
                        ]
                    }, entry.monsterId, true, {
                        fileName: "[project]/app/play/page.tsx",
                        lineNumber: 909,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 907,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 890,
        columnNumber: 5
    }, this);
}
_c8 = BestiaryDrawer;
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
                                lineNumber: 966,
                                columnNumber: 15
                            }, this)
                        }, slot.id, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 952,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 950,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.25em] text-amber-100/70",
                            children: "Buffs & Debuffs"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 973,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-amber-100/80",
                            children: "Nenhum efeito ativo."
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 974,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 972,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.25em] text-amber-100/70",
                            children: "Atributos"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 979,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-2 space-y-1 text-sm text-amber-100/80",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Força: 0"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 981,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Destreza: 0"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 982,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Inteligência: 0"
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 983,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 980,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 978,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 949,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 948,
        columnNumber: 5
    }, this);
}
_c9 = EquipmentDrawer;
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
                            lineNumber: 1028,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1026,
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
                                    lineNumber: 1043,
                                    columnNumber: 25
                                }, this),
                                visibleMessages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-amber-100/70",
                                    children: "Sem mensagens recentes."
                                }, void 0, false, {
                                    fileName: "[project]/app/play/page.tsx",
                                    lineNumber: 1045,
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
                                                        lineNumber: 1054,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/play/page.tsx",
                                                lineNumber: 1052,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-base",
                                                children: entry.message
                                            }, void 0, false, {
                                                fileName: "[project]/app/play/page.tsx",
                                                lineNumber: 1058,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, entry.id, true, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 1048,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1042,
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
                                    lineNumber: 1065,
                                    columnNumber: 42
                                }, this),
                                combatLog.slice(-20).map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `rounded-xl border px-3 py-1 font-semibold ${entry.tone === "xp" ? "border-green-200/40 text-green-200" : "border-red-200/40 text-red-200"}`,
                                        children: entry.message
                                    }, entry.id, false, {
                                        fileName: "[project]/app/play/page.tsx",
                                        lineNumber: 1067,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1064,
                            columnNumber: 13
                        }, this),
                        activeTab === "guild" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-amber-100/70",
                            children: "Chat de guilda em breve."
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1081,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1040,
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
                            lineNumber: 1088,
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
                            lineNumber: 1091,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "rounded-2xl bg-gradient-to-r from-amber-200 to-amber-500 py-2 text-center text-sm font-bold uppercase tracking-[0.4em] text-stone-900 disabled:cursor-not-allowed disabled:opacity-40",
                            disabled: disableInput || message.trim().length === 0,
                            children: "Enviar"
                        }, void 0, false, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1100,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1084,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 1025,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1024,
        columnNumber: 5
    }, this);
}
_s2(ChatDrawer, "O1H3hKvwlnPJJZ5q3RsNo0abrGM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatFeed"]
    ];
});
_c10 = ChatDrawer;
function PanelDrawer({ title, open, onClose, content }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Drawer, {
        open: open,
        onClose: onClose,
        title: title,
        children: content
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1125,
        columnNumber: 5
    }, this);
}
_c11 = PanelDrawer;
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
                lineNumber: 1145,
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
                    lineNumber: 1147,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/play/page.tsx",
                lineNumber: 1146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1144,
        columnNumber: 5
    }, this);
}
_c12 = MiniMapOverlay;
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
                            lineNumber: 1183,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Resultado: ",
                                recipe.result
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1184,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Ingredientes: ",
                                recipe.ingredients
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/play/page.tsx",
                            lineNumber: 1185,
                            columnNumber: 13
                        }, this)
                    ]
                }, recipe.id, true, {
                    fileName: "[project]/app/play/page.tsx",
                    lineNumber: 1182,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/play/page.tsx",
            lineNumber: 1180,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/page.tsx",
        lineNumber: 1179,
        columnNumber: 5
    }, this);
}
_c13 = CraftingDrawer;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13;
__turbopack_context__.k.register(_c, "CityPage");
__turbopack_context__.k.register(_c1, "CityHud");
__turbopack_context__.k.register(_c2, "SoundToggleButton");
__turbopack_context__.k.register(_c3, "PlayTopNav");
__turbopack_context__.k.register(_c4, "QuickSlots");
__turbopack_context__.k.register(_c5, "TopCenterSlots");
__turbopack_context__.k.register(_c6, "Drawer");
__turbopack_context__.k.register(_c7, "InventoryDrawer");
__turbopack_context__.k.register(_c8, "BestiaryDrawer");
__turbopack_context__.k.register(_c9, "EquipmentDrawer");
__turbopack_context__.k.register(_c10, "ChatDrawer");
__turbopack_context__.k.register(_c11, "PanelDrawer");
__turbopack_context__.k.register(_c12, "MiniMapOverlay");
__turbopack_context__.k.register(_c13, "CraftingDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_fd6da157._.js.map