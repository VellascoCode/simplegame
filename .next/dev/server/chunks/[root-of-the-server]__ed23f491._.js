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
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(100000)
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
    "incrementBestiaryEntry",
    ()=>incrementBestiaryEntry,
    "insertCharacter",
    ()=>insertCharacter,
    "insertUser",
    ()=>insertUser,
    "listBestiaryEntries",
    ()=>listBestiaryEntries,
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
    "updateCharacterFaction",
    ()=>updateCharacterFaction,
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
async function listBestiaryEntries(ownerId, characterId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("bestiary");
        const docs = await collection.find({
            ownerId,
            characterId
        }).toArray();
        return docs;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    return memory.bestiary.filter((entry)=>entry.ownerId === ownerId && entry.characterId === characterId);
}
async function incrementBestiaryEntry(ownerId, characterId, monsterId, faction) {
    const updatedAt = new Date().toISOString();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasMongoConnection"])()) {
        const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("bestiary");
        const doc = await collection.findOneAndUpdate({
            ownerId,
            characterId,
            monsterId
        }, {
            $setOnInsert: {
                ownerId,
                characterId,
                monsterId,
                createdAt: updatedAt,
                faction
            },
            $set: {
                updatedAt,
                faction
            },
            $inc: {
                kills: 1
            }
        }, {
            upsert: true,
            returnDocument: "after"
        });
        const entries = await collection.find({
            ownerId,
            characterId
        }).toArray();
        return entries;
    }
    const memory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoryStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMemoryDB"])();
    const existing = memory.bestiary.find((entry)=>entry.ownerId === ownerId && entry.characterId === characterId && entry.monsterId === monsterId);
    if (existing) {
        existing.kills += 1;
        existing.updatedAt = updatedAt;
        existing.faction = faction ?? existing.faction;
    } else {
        memory.bestiary.push({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"]().toHexString(),
            ownerId,
            characterId,
            monsterId,
            kills: 1,
            faction,
            createdAt: updatedAt,
            updatedAt
        });
    }
    return memory.bestiary.filter((entry)=>entry.ownerId === ownerId && entry.characterId === characterId);
}
async function updateCharacterFaction(ownerId, characterId, faction) {
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
                faction,
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
        faction,
        updatedAt
    };
    return {
        ...memory.characters[characterIndex]
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
"[project]/lib/progression.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/factions.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FACTIONS",
    ()=>FACTIONS,
    "getFactionChants",
    ()=>getFactionChants,
    "getRandomFaction",
    ()=>getRandomFaction,
    "isOpposingFaction",
    ()=>isOpposingFaction,
    "pickFactionTeams",
    ()=>pickFactionTeams
]);
const FACTIONS = [
    "ÁGUIA DOURADA",
    "SERPENTE NEGRA",
    "LOBO DE FERRO",
    "CORVO ESCARLATE"
];
const FACTION_CHANTS = {
    "ÁGUIA DOURADA": [
        "Por Águia Dourada!",
        "Voe alto!",
        "Guardem a cidade!"
    ],
    "SERPENTE NEGRA": [
        "Deslizem!",
        "As sombras vencem!",
        "Mordida certeira!"
    ],
    "LOBO DE FERRO": [
        "Uivem!",
        "Aço e coragem!",
        "Protejam o clã!"
    ],
    "CORVO ESCARLATE": [
        "Escarlate eterno!",
        "Corvos no céu!",
        "Ninguém passa!"
    ]
};
function getFactionChants(faction) {
    return FACTION_CHANTS[faction] ?? [];
}
function getRandomFaction() {
    const index = Math.floor(Math.random() * FACTIONS.length);
    return FACTIONS[index];
}
function pickFactionTeams() {
    const shuffled = [
        ...FACTIONS
    ].sort(()=>Math.random() - 0.5);
    return {
        teamA: shuffled.slice(0, 2),
        teamB: shuffled.slice(2, 4)
    };
}
function isOpposingFaction(targetFaction, sourceFaction, warState) {
    if (!targetFaction || !sourceFaction || !warState) return false;
    const { teamA, teamB } = warState;
    const sourceTeam = teamA.includes(sourceFaction) ? "A" : teamB.includes(sourceFaction) ? "B" : null;
    const targetTeam = teamA.includes(targetFaction) ? "A" : teamB.includes(targetFaction) ? "B" : null;
    if (!sourceTeam || !targetTeam) return false;
    return sourceTeam !== targetTeam;
}
}),
"[project]/api/character/service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCharacter",
    ()=>createCharacter,
    "grantCharacterGold",
    ()=>grantCharacterGold,
    "grantCharacterXp",
    ()=>grantCharacterXp,
    "incrementBestiaryEntry",
    ()=>incrementBestiaryEntry,
    "loadCharacterById",
    ()=>loadCharacterById,
    "loadCharacters",
    ()=>loadCharacters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/repositories.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progression$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progression.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/factions.ts [app-route] (ecmascript)");
;
;
;
;
async function createCharacter(payload) {
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["characterCreateSchema"].parse(payload);
    const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["countCharacters"])(data.ownerId);
    if (existing >= 4) {
        throw new Error("Limite de 4 personagens atingido para este usuário");
    }
    const now = new Date().toISOString();
    const character = {
        ownerId: data.ownerId,
        name: data.name,
        sprite: data.sprite,
        inventory: [],
        stats: {
            level: 1,
            xp: 0,
            hp: 100,
            energy: 100
        },
        gold: 0,
        faction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRandomFaction"])(),
        createdAt: now,
        updatedAt: now
    };
    const stored = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insertCharacter"])(character);
    return stored;
}
async function loadCharacters(ownerId) {
    const characters = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listCharacters"])(ownerId);
    return Promise.all(characters.map((character)=>ensureCharacterFaction(character)));
}
async function loadCharacterById(ownerId, characterId) {
    const character = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findCharacterById"])(ownerId, characterId);
    if (!character) {
        throw new Error("Personagem não encontrado");
    }
    const ensured = await ensureCharacterFaction(character);
    const bestiary = await loadBestiaryTable(ownerId, characterId);
    return {
        ...ensured,
        bestiary
    };
}
async function grantCharacterXp(payload) {
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["characterXpSchema"].parse(payload);
    const character = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findCharacterById"])(data.ownerId, data.characterId);
    if (!character) {
        throw new Error("Personagem não encontrado");
    }
    const totalXp = Math.max(0, character.stats.xp + data.amount);
    const { level } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progression$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveLevel"])(totalXp);
    const stats = {
        ...character.stats,
        xp: totalXp,
        level
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateCharacterStats"])(data.ownerId, data.characterId, stats);
    return stats;
}
async function grantCharacterGold(payload) {
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["characterGoldSchema"].parse(payload);
    const character = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findCharacterById"])(data.ownerId, data.characterId);
    if (!character) {
        throw new Error("Personagem não encontrado");
    }
    const currentGold = typeof character.gold === "number" ? character.gold : 0;
    const totalGold = Math.max(0, currentGold + data.amount);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateCharacterGold"])(data.ownerId, data.characterId, totalGold);
    return {
        gold: totalGold
    };
}
async function incrementBestiaryEntry(payload) {
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["characterBestiarySchema"].parse(payload);
    const character = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findCharacterById"])(data.ownerId, data.characterId);
    if (!character) {
        throw new Error("Personagem não encontrado");
    }
    const entries = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["incrementBestiaryEntry"])(data.ownerId, data.characterId, data.monsterId, character.faction);
    const table = entries.reduce((map, entry)=>{
        map[entry.monsterId] = entry.kills;
        return map;
    }, {});
    return table;
}
async function ensureCharacterFaction(character) {
    if (character.faction) return character;
    const faction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRandomFaction"])();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateCharacterFaction"])(character.ownerId, character._id ?? "", faction);
    return {
        ...character,
        faction
    };
}
async function loadBestiaryTable(ownerId, characterId) {
    const entries = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listBestiaryEntries"])(ownerId, characterId);
    return entries.reduce((map, entry)=>{
        map[entry.monsterId] = entry.kills;
        return map;
    }, {});
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
"[project]/app/api/character/gold/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$character$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/api/character/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/apiResponse.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const payload = await request.json();
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$character$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["grantCharacterGold"])(payload);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])(result);
    } catch (err) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["error"])(err instanceof Error ? err.message : "Falha ao atualizar ouro");
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ed23f491._.js.map