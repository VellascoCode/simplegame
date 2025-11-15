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
    quickSlots: []
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
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/lib/hash.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
function hashPassword(password) {
    const salt = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(16).toString("hex");
    const hash = applyHash(password, salt);
    return {
        hash,
        salt
    };
}
function verifyPassword(password, bundle) {
    return applyHash(password, bundle.salt) === bundle.hash;
}
function applyHash(password, salt) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(`${password}:${salt}`).digest("hex");
}
}),
"[project]/lib/authOptions.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/repositories.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hash$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hash.ts [app-route] (ecmascript)");
;
;
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Senha",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findUserByEmail"])(credentials.email);
                if (!user) return null;
                const isValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hash$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPassword"])(credentials.password, {
                    hash: user.passwordHash,
                    salt: user.salt
                });
                if (!isValid) return null;
                return {
                    id: user._id ?? "",
                    email: user.email
                };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt ({ token, user }) {
            if (user?.id) {
                token.id = user.id;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: "/"
    },
    secret: process.env.NEXTAUTH_SECRET
};
}),
"[project]/lib/authSession.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOwnerIdFromSession",
    ()=>getOwnerIdFromSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authOptions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authOptions.ts [app-route] (ecmascript)");
;
;
async function getOwnerIdFromSession() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authOptions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
    return session?.user?.id ?? null;
}
}),
"[project]/app/api/auth/logout/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/apiResponse.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/repositories.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authSession$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authSession.ts [app-route] (ecmascript)");
;
;
;
async function POST() {
    const ownerId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authSession$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOwnerIdFromSession"])();
    if (ownerId) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$repositories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clearPlayerSession"])(ownerId);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
        success: true
    });
}
async function GET() {
    return POST();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ed342f7c._.js.map