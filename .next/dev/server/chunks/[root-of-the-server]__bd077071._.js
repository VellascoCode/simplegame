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
"[project]/lib/factions.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FACTION_IDS",
    ()=>FACTION_IDS,
    "FACTION_NAMES",
    ()=>FACTION_NAMES,
    "FactionId",
    ()=>FactionId,
    "getFactionChants",
    ()=>getFactionChants,
    "getRandomFaction",
    ()=>getRandomFaction,
    "isOpposingFaction",
    ()=>isOpposingFaction,
    "pickFactionTeams",
    ()=>pickFactionTeams
]);
var FactionId = /*#__PURE__*/ function(FactionId) {
    FactionId[FactionId["GoldenEagle"] = 0] = "GoldenEagle";
    FactionId[FactionId["BlackSerpent"] = 1] = "BlackSerpent";
    FactionId[FactionId["IronWolf"] = 2] = "IronWolf";
    FactionId[FactionId["ScarletRaven"] = 3] = "ScarletRaven";
    return FactionId;
}({});
const FACTION_IDS = [
    0,
    1,
    2,
    3
];
const FACTION_NAMES = {
    [0]: "ÁGUIA DOURADA",
    [1]: "SERPENTE NEGRA",
    [2]: "LOBO DE FERRO",
    [3]: "CORVO ESCARLATE"
};
const FACTION_CHANTS = {
    [0]: [
        "Por Águia Dourada!",
        "Voe alto!",
        "Guardem a cidade!"
    ],
    [1]: [
        "Deslizem!",
        "As sombras vencem!",
        "Mordida certeira!"
    ],
    [2]: [
        "Uivem!",
        "Aço e coragem!",
        "Protejam o clã!"
    ],
    [3]: [
        "Escarlate eterno!",
        "Corvos no céu!",
        "Ninguém passa!"
    ]
};
function getFactionChants(faction) {
    return FACTION_CHANTS[faction] ?? [];
}
function getRandomFaction() {
    const index = Math.floor(Math.random() * FACTION_IDS.length);
    return FACTION_IDS[index];
}
function pickFactionTeams() {
    const shuffled = [
        ...FACTION_IDS
    ].sort(()=>Math.random() - 0.5);
    return {
        teamA: shuffled.slice(0, 2),
        teamB: shuffled.slice(2, 4)
    };
}
function isOpposingFaction(targetFaction, sourceFaction, warState) {
    if (targetFaction === undefined || sourceFaction === undefined || !warState) return false;
    const { teamA, teamB } = warState;
    const sourceTeam = teamA.includes(sourceFaction) ? "A" : teamB.includes(sourceFaction) ? "B" : null;
    const targetTeam = teamA.includes(targetFaction) ? "A" : teamB.includes(targetFaction) ? "B" : null;
    if (!sourceTeam || !targetTeam) return false;
    return sourceTeam !== targetTeam;
}
}),
"[project]/lib/factionWar.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFactionWarState",
    ()=>getFactionWarState,
    "registerFactionDeath",
    ()=>registerFactionDeath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/factions.ts [app-route] (ecmascript)");
;
const globalWar = globalThis;
const WAR_MEMBERS_PER_FACTION = 10;
const WAR_REFRESH_MS = 10 * 60 * 1000;
const WAR_FORCE_RESET_MS = 5 * 60 * 1000;
function createWarState() {
    const { teamA, teamB } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pickFactionTeams"])();
    const remaining = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FACTION_IDS"].map((faction)=>[
            faction,
            teamA.includes(faction) || teamB.includes(faction) ? WAR_MEMBERS_PER_FACTION : 0
        ]));
    return {
        teamA,
        teamB,
        startedAt: new Date().toISOString(),
        remaining
    };
}
function ensureWarState() {
    if (!globalWar.__FACTION_WAR_STATE__) {
        globalWar.__FACTION_WAR_STATE__ = {
            state: createWarState()
        };
        scheduleWarTimers();
    }
    return globalWar.__FACTION_WAR_STATE__;
}
function scheduleWarTimers() {
    const war = globalWar.__FACTION_WAR_STATE__;
    if (!war) return;
    if (war.timer) {
        clearInterval(war.timer);
    }
    if (war.resetTimer) {
        clearTimeout(war.resetTimer);
    }
    war.timer = setInterval(()=>{
        resetWarState();
    }, WAR_REFRESH_MS);
    war.resetTimer = setTimeout(()=>{
        resetWarState();
    }, WAR_FORCE_RESET_MS);
}
function resetWarState() {
    if (!globalWar.__FACTION_WAR_STATE__) {
        globalWar.__FACTION_WAR_STATE__ = {
            state: createWarState()
        };
    } else {
        globalWar.__FACTION_WAR_STATE__.state = createWarState();
    }
    scheduleWarTimers();
}
function getFactionWarState() {
    return ensureWarState().state;
}
function registerFactionDeath(faction) {
    const war = ensureWarState();
    const { state } = war;
    if (!(state.teamA.includes(faction) || state.teamB.includes(faction))) return;
    state.remaining[faction] = Math.max(0, (state.remaining[faction] ?? 0) - 1);
    const teamZero = (team)=>team.every((entry)=>(state.remaining[entry] ?? 0) <= 0);
    if (teamZero(state.teamA) || teamZero(state.teamB)) {
        resetWarState();
    }
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
"[project]/app/api/factions/war/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factionWar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/factionWar.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/apiResponse.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/factions.ts [app-route] (ecmascript)");
;
;
;
;
const killSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    faction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].nativeEnum(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FactionId"])
});
async function GET() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factionWar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFactionWarState"])());
}
async function POST(request) {
    try {
        const payload = killSchema.parse(await request.json());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factionWar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerFactionDeath"])(payload.faction);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$factionWar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFactionWarState"])());
    } catch (err) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiResponse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["error"])(err instanceof Error ? err.message : "Falha ao registrar batalha", 400);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bd077071._.js.map