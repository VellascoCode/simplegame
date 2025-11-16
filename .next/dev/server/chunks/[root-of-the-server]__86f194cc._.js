module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/lib/models.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "characterCreateSchema",
    ()=>characterCreateSchema,
    "characterGoldSchema",
    ()=>characterGoldSchema,
    "characterXpSchema",
    ()=>characterXpSchema,
    "chatSendSchema",
    ()=>chatSendSchema,
    "farmHarvestSchema",
    ()=>farmHarvestSchema,
    "farmPlantSchema",
    ()=>farmPlantSchema,
    "forestKillSchema",
    ()=>forestKillSchema,
    "houseUpdateSchema",
    ()=>houseUpdateSchema,
    "inventoryAddSchema",
    ()=>inventoryAddSchema,
    "inventoryItemSchema",
    ()=>inventoryItemSchema,
    "inventoryRemoveSchema",
    ()=>inventoryRemoveSchema,
    "loginSchema",
    ()=>loginSchema,
    "onlinePingSchema",
    ()=>onlinePingSchema,
    "registerSchema",
    ()=>registerSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const registerSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6)
});
const loginSchema = registerSchema;
const characterCreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(3).max(20),
    sprite: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
const characterGoldSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    characterId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(Number.MAX_SAFE_INTEGER)
});
const characterXpSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    characterId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).max(10000)
});
const onlinePingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
const inventoryItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1),
    stackable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    maxStack: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).optional()
});
const inventoryAddSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    item: inventoryItemSchema
});
const inventoryRemoveSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    itemId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1)
});
const chatSendSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(20).optional(),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(280)
});
const houseUpdateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    furniture: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            x: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0),
            y: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0)
        })
    })).max(4)
});
const farmPlantSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    plotId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    seed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
const farmHarvestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    plotId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
const forestKillSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ownerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCollection",
    ()=>getCollection,
    "hasMongoConnection",
    ()=>hasMongoConnection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
let client = null;
const uri = process.env.MONGODB_URI;
const parsedDbName = (()=>{
    if (!uri) return null;
    try {
        const url = new URL(uri);
        const pathname = url.pathname.replace(/^\//, "");
        return pathname || null;
    } catch  {
        return null;
    }
})();
async function getClient() {
    if (!uri) {
        throw new Error("MONGODB_URI não configurado");
    }
    if (!client) {
        client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri);
        await client.connect();
    }
    return client;
}
async function getCollection(name) {
    const cli = await getClient();
    const dbName = process.env.MONGODB_DB || parsedDbName || "simpleapp";
    return cli.db(dbName).collection(name);
}
function hasMongoConnection() {
    return Boolean(uri);
}
}),
"[project]/lib/memoryStore.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMemoryDB",
    ()=>getMemoryDB
]);
const memoryDb = {
    users: [],
    characters: [],
    inventory: {},
    houses: [],
    farms: [],
    chat: [],
    online: [],
    sessions: [],
    quickSlots: [],
    bestiary: []
};
function getMemoryDB() {
    return memoryDb;
}
}),
"[project]/lib/repositories.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addChatMessage",
    ()=>addChatMessage,
    "clearPlayerSession",
    ()=>clearPlayerSession,
    "countCharacters",
    ()=>countCharacters,
    "findCharacterById",
    ()=>findCharacterById,
    "findUserByEmail",
    ()=>findUserByEmail,
    "getBestiaryProfile",
    ()=>getBestiaryProfile,
    "getFarm",
    ()=>getFarm,
    "getHouse",
    ()=>getHouse,
    "getInventory",
    ()=>getInventory,
    "getPlayerSession",
    ()=>getPlayerSession,
    "getQuickSlots",
    ()=>getQuickSlots,
    "incrementBestiaryKill",
    ()=>incrementBestiaryKill,
    "insertCharacter",
    ()=>insertCharacter,
    "insertUser",
    ()=>insertUser,
    "listCharacters",
    ()=>listCharacters,
    "listChatMessages",
    ()=>listChatMessages,
    "listOnline",
    ()=>listOnline,
    "pingOnline",
    ()=>pingOnline,
    "saveFarm",
    ()=>saveFarm,
    "saveInventory",
    ()=>saveInventory,
    "savePlayerSession",
    ()=>savePlayerSession,
    "saveQuickSlots",
    ()=>saveQuickSlots,
    "updateCharacterGold",
    ()=>updateCharacterGold,
    "updateCharacterStats",
    ()=>updateCharacterStats,
    "updateHouse",
    ()=>updateHouse
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/memoryStore.ts [app-route] (ecmascript)");
;
;
;
async function findUserByEmail(email) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
        const doc = await users.findOne({
            email
        });
        return doc ? normalizeUser(doc) : null;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    return memory.users.find((user)=>user.email === email) ?? null;
}
async function insertUser(user) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
        const { _id, ...doc } = user;
        const result = await users.insertOne(doc);
        return {
            ...doc,
            _id: String(result.insertedId)
        };
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const stored = {
        ...user,
        _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"]().toHexString()
    };
    memory.users.push(stored);
    return stored;
}
async function countCharacters(ownerId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const characters = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("characters");
        return characters.countDocuments({
            ownerId
        });
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    return memory.characters.filter((c)=>c.ownerId === ownerId).length;
}
async function insertCharacter(character) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const characters = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("characters");
        const { _id, ...doc } = character;
        const result = await characters.insertOne(doc);
        return {
            ...doc,
            _id: String(result.insertedId)
        };
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const stored = {
        ...character,
        _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"]().toHexString()
    };
    memory.characters.push(stored);
    return stored;
}
async function listCharacters(ownerId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const characters = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("characters");
        const docs = await characters.find({
            ownerId
        }).sort({
            createdAt: 1
        }).limit(4).toArray();
        return docs.map((doc)=>normalizeCharacter(doc));
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    return memory.characters.filter((c)=>c.ownerId === ownerId).map((c)=>({
            ...c
        }));
}
async function findCharacterById(ownerId, characterId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"].isValid(characterId)) {
            return null;
        }
        const characters = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("characters");
        const doc = await characters.findOne({
            ownerId,
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](characterId)
        });
        return doc ? normalizeCharacter(doc) : null;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const character = memory.characters.find((c)=>c.ownerId === ownerId && c._id === characterId);
    return character ? {
        ...character
    } : null;
}
async function updateCharacterStats(ownerId, characterId, stats) {
    const payload = {
        ...stats
    };
    const updatedAt = new Date().toISOString();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"].isValid(characterId)) {
            throw new Error("Personagem inválido");
        }
        const characters = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("characters");
        await characters.updateOne({
            ownerId,
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](characterId)
        }, {
            $set: {
                stats: payload,
                updatedAt
            }
        });
        const updated = await characters.findOne({
            ownerId,
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](characterId)
        });
        if (!updated) {
            throw new Error("Personagem não encontrado");
        }
        return normalizeCharacter(updated);
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const characterIndex = memory.characters.findIndex((c)=>c.ownerId === ownerId && c._id === characterId);
    if (characterIndex < 0) {
        throw new Error("Personagem não encontrado");
    }
    memory.characters[characterIndex] = {
        ...memory.characters[characterIndex],
        stats: payload,
        updatedAt
    };
    return {
        ...memory.characters[characterIndex]
    };
}
async function updateCharacterGold(ownerId, characterId, gold) {
    const updatedAt = new Date().toISOString();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"].isValid(characterId)) {
            throw new Error("Personagem inválido");
        }
        const characters = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("characters");
        await characters.updateOne({
            ownerId,
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](characterId)
        }, {
            $set: {
                gold,
                updatedAt
            }
        });
        const updated = await characters.findOne({
            ownerId,
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](characterId)
        });
        if (!updated) {
            throw new Error("Personagem não encontrado");
        }
        return normalizeCharacter(updated);
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const characterIndex = memory.characters.findIndex((c)=>c.ownerId === ownerId && c._id === characterId);
    if (characterIndex < 0) throw new Error("Personagem não encontrado");
    memory.characters[characterIndex] = {
        ...memory.characters[characterIndex],
        gold,
        updatedAt
    };
    return {
        ...memory.characters[characterIndex]
    };
}
async function getBestiaryProfile(ownerId, characterId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("bestiary");
        const doc = await collection.findOne({
            ownerId,
            characterId
        });
        return doc ?? null;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    return memory.bestiary.find((entry)=>entry.ownerId === ownerId && entry.characterId === characterId) ?? null;
}
async function incrementBestiaryKill(ownerId, characterId, monsterId) {
    const updatedAt = new Date().toISOString();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("bestiary");
        const result = await collection.findOneAndUpdate({
            ownerId,
            characterId
        }, {
            $setOnInsert: {
                ownerId,
                characterId,
                kills: {},
                updatedAt
            },
            $set: {
                updatedAt
            },
            $inc: {
                [`kills.${monsterId}`]: 1
            }
        }, {
            upsert: true,
            returnDocument: "after"
        });
        const updated = result?.value;
        if (!updated) {
            throw new Error("Falha ao atualizar bestiário");
        }
        return updated;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    let profile = memory.bestiary.find((entry)=>entry.ownerId === ownerId && entry.characterId === characterId);
    if (!profile) {
        profile = {
            ownerId,
            characterId,
            kills: {},
            updatedAt
        };
        memory.bestiary.push(profile);
    }
    profile.kills[monsterId] = (profile.kills[monsterId] ?? 0) + 1;
    profile.updatedAt = updatedAt;
    return {
        ...profile
    };
}
async function getInventory(ownerId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const inventory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("inventory");
        const doc = await inventory.findOne({
            ownerId
        });
        return doc?.items ?? [];
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const items = memory.inventory[ownerId] ?? [];
    memory.inventory[ownerId] = items;
    return items;
}
async function saveInventory(ownerId, items) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const inventory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("inventory");
        await inventory.updateOne({
            ownerId
        }, {
            $set: {
                ownerId,
                items
            }
        }, {
            upsert: true
        });
        return items;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    memory.inventory[ownerId] = items;
    return items;
}
async function getHouse(ownerId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const houses = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("houses");
        const doc = await houses.findOne({
            ownerId
        });
        return doc ?? {
            ownerId,
            furniture: defaultFurniture()
        };
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    let house = memory.houses.find((h)=>h.ownerId === ownerId);
    if (!house) {
        house = {
            ownerId,
            furniture: defaultFurniture()
        };
        memory.houses.push(house);
    }
    return house;
}
async function updateHouse(ownerId, furniture) {
    const state = {
        ownerId,
        furniture
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const houses = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("houses");
        await houses.updateOne({
            ownerId
        }, {
            $set: state
        }, {
            upsert: true
        });
        return state;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const index = memory.houses.findIndex((h)=>h.ownerId === ownerId);
    if (index >= 0) {
        memory.houses[index] = state;
        return state;
    }
    memory.houses.push(state);
    return state;
}
async function getFarm(ownerId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const farms = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("farms");
        const doc = await farms.findOne({
            ownerId
        });
        return doc ?? {
            ownerId,
            plots: defaultFarmPlots()
        };
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    let farm = memory.farms.find((f)=>f.ownerId === ownerId);
    if (!farm) {
        farm = {
            ownerId,
            plots: defaultFarmPlots()
        };
        memory.farms.push(farm);
    }
    return farm;
}
async function saveFarm(state) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const farms = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("farms");
        await farms.updateOne({
            ownerId: state.ownerId
        }, {
            $set: state
        }, {
            upsert: true
        });
        return state;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const index = memory.farms.findIndex((f)=>f.ownerId === state.ownerId);
    if (index >= 0) {
        memory.farms[index] = state;
        return state;
    }
    memory.farms.push(state);
    return state;
}
async function getPlayerSession(ownerId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const sessions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("sessions");
        return sessions.findOne({
            ownerId
        });
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    return memory.sessions.find((session)=>session.ownerId === ownerId) ?? null;
}
async function savePlayerSession(state) {
    const payload = {
        ...state,
        updatedAt: new Date().toISOString()
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const sessions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("sessions");
        await sessions.updateOne({
            ownerId: state.ownerId
        }, {
            $set: payload
        }, {
            upsert: true
        });
        return payload;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const index = memory.sessions.findIndex((session)=>session.ownerId === state.ownerId);
    if (index >= 0) {
        memory.sessions[index] = payload;
    } else {
        memory.sessions.push(payload);
    }
    return payload;
}
async function clearPlayerSession(ownerId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const sessions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("sessions");
        await sessions.deleteOne({
            ownerId
        });
        return;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    memory.sessions = memory.sessions.filter((session)=>session.ownerId !== ownerId);
}
async function getQuickSlots(ownerId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const layout = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("quickslots");
        const doc = await layout.findOne({
            ownerId
        });
        return doc?.slots ?? defaultQuickSlots();
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const existing = memory.quickSlots.find((slot)=>slot.ownerId === ownerId);
    if (!existing) {
        const created = {
            ownerId,
            slots: defaultQuickSlots(),
            updatedAt: new Date().toISOString()
        };
        memory.quickSlots.push(created);
        return created.slots;
    }
    return existing.slots;
}
async function saveQuickSlots(ownerId, slots) {
    const payload = {
        ownerId,
        slots,
        updatedAt: new Date().toISOString()
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const layout = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("quickslots");
        await layout.updateOne({
            ownerId
        }, {
            $set: payload
        }, {
            upsert: true
        });
        return payload.slots;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const index = memory.quickSlots.findIndex((slot)=>slot.ownerId === ownerId);
    if (index >= 0) {
        memory.quickSlots[index] = payload;
    } else {
        memory.quickSlots.push(payload);
    }
    return payload.slots;
}
async function addChatMessage(message) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const chat = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("chat");
        await chat.insertOne(message);
        return message;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    memory.chat.push(message);
    memory.chat = memory.chat.slice(-50);
    return message;
}
async function listChatMessages(limit = 20) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const chat = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("chat");
        const docs = await chat.find({}, {
            sort: {
                createdAt: -1
            }
        }).limit(limit).toArray();
        return docs.reverse();
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    return memory.chat.slice(-limit);
}
async function pingOnline(ownerId) {
    const entry = {
        ownerId,
        lastPing: new Date().toISOString()
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const online = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("online");
        await online.updateOne({
            ownerId
        }, {
            $set: entry
        }, {
            upsert: true
        });
        return entry;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const index = memory.online.findIndex((o)=>o.ownerId === ownerId);
    if (index >= 0) {
        memory.online[index] = entry;
    } else {
        memory.online.push(entry);
    }
    return entry;
}
async function listOnline() {
    const cutoff = Date.now() - 1000 * 60;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const online = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("online");
        const docs = await online.find({
            lastPing: {
                $gte: new Date(cutoff).toISOString()
            }
        }).toArray();
        return docs;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    return memory.online.filter((o)=>new Date(o.lastPing).getTime() >= cutoff);
}
function normalizeCharacter(doc) {
    const normalizedId = typeof doc._id === "string" ? doc._id : doc._id?.toString?.();
    return {
        ...structuredCloneCharacter(doc),
        _id: normalizedId
    };
}
function normalizeUser(doc) {
    const normalizedId = typeof doc._id === "string" ? doc._id : doc._id?.toString?.();
    return {
        ...structuredCloneUser(doc),
        _id: normalizedId
    };
}
function structuredCloneCharacter(doc) {
    const { _id, ...rest } = doc;
    return {
        ...rest
    };
}
function structuredCloneUser(doc) {
    const { _id, ...rest } = doc;
    return {
        ...rest
    };
}
function defaultFurniture() {
    return [
        {
            id: "bed",
            name: "Cama Simples",
            position: {
                x: 64,
                y: 32
            }
        },
        {
            id: "table",
            name: "Mesa Madeira",
            position: {
                x: 32,
                y: 96
            }
        },
        {
            id: "shelf",
            name: "Estante Pequena",
            position: {
                x: 96,
                y: 32
            }
        },
        {
            id: "lamp",
            name: "Lamparina",
            position: {
                x: 128,
                y: 96
            }
        }
    ];
}
function defaultQuickSlots() {
    return [
        null,
        null,
        null,
        null
    ];
}
function defaultFarmPlots() {
    return Array.from({
        length: 4
    }).map((_, index)=>({
            id: `plot-${index + 1}`,
            seed: null,
            plantedAt: null,
            harvestReadyAt: null
        }));
}
}),
"[project]/api/online/service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listPresences",
    ()=>listPresences,
    "ping",
    ()=>ping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/repositories.ts [app-route] (ecmascript)");
;
;
async function ping(payload) {
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["onlinePingSchema"].parse(payload);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pingOnline"])(data.ownerId);
}
async function listPresences() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listOnline"])();
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/apiResponse.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "error",
    ()=>error,
    "ok",
    ()=>ok
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
function ok(data, status = 200) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
        status
    });
}
function error(message, status = 400) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: message
    }, {
        status
    });
}
}),
"[project]/app/api/online/list/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$online$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/api/online/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/apiResponse.ts [app-route] (ecmascript)");
;
;
async function GET() {
    const list = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$online$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listPresences"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])(list);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__86f194cc._.js.map