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
"[project]/app/editor/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const PIN = "8989";
const DEFAULT_WIDTH = 32;
const DEFAULT_HEIGHT = 20;
const MIN_SIZE = 8;
const MAX_WIDTH = 64;
const MAX_HEIGHT = 40;
const PREVIEW_RADIUS = 3;
const layerLabels = {
    ground: "Piso",
    detail: "Detalhes",
    buildings: "Construções",
    tints: "Tons",
    collision: "Bloqueio",
    cover: "Sobrepor"
};
const layerOrder = [
    "ground",
    "detail",
    "buildings",
    "tints",
    "collision",
    "cover"
];
const brushSizes = [
    1,
    2,
    3
];
const tintPalette = [
    {
        id: 0,
        label: "Sem cor",
        color: "#ffffff"
    },
    {
        id: 1,
        label: "Quente",
        color: "#ffd1dc"
    },
    {
        id: 2,
        label: "Aqua",
        color: "#a6e7ff"
    },
    {
        id: 3,
        label: "Dourado",
        color: "#fff7c2"
    },
    {
        id: 4,
        label: "Violeta",
        color: "#d5b4ff"
    },
    {
        id: 5,
        label: "Verde",
        color: "#94f1a4"
    }
];
const collisionPalette = [
    {
        id: 0,
        label: "Livre",
        helper: "Sem bloqueio"
    },
    {
        id: 1,
        label: "Bloquear",
        helper: "Impede passagem"
    }
];
const coverPalette = [
    {
        id: 0,
        label: "Em frente",
        helper: "Jogador passa na frente"
    },
    {
        id: 1,
        label: "Por trás",
        helper: "Jogador passa por trás"
    }
];
function EditorPage() {
    _s();
    const [pin, setPin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [unlocked, setUnlocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tilesError, setTilesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tileManifest, setTileManifest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mapData, setMapData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "EditorPage.useState": ()=>createEmptyMap(DEFAULT_WIDTH, DEFAULT_HEIGHT)
    }["EditorPage.useState"]);
    const [gridWidth, setGridWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_WIDTH);
    const [gridHeight, setGridHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_HEIGHT);
    const [selectedTile, setSelectedTile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [activeLayer, setActiveLayer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ground");
    const [brushSize, setBrushSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("paint");
    const [hoverCell, setHoverCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorPage.useEffect": ()=>{
            let active = true;
            async function loadTiles() {
                try {
                    const manifest = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])("/api/tiles");
                    if (active) {
                        setTileManifest(manifest);
                        setTilesError(null);
                    }
                } catch (err) {
                    if (active) {
                        setTilesError(getMessage(err));
                    }
                }
            }
            void loadTiles();
            return ({
                "EditorPage.useEffect": ()=>{
                    active = false;
                }
            })["EditorPage.useEffect"];
        }
    }["EditorPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorPage.useEffect": ()=>{
            if (!unlocked) return;
            let active = true;
            async function loadFromServer() {
                try {
                    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJSON"])("/api/city/map");
                    if (active) {
                        setMapData(response.map);
                        setGridWidth(response.map.ground[0]?.length ?? DEFAULT_WIDTH);
                        setGridHeight(response.map.ground.length ?? DEFAULT_HEIGHT);
                    }
                } catch (err) {
                    if (active) setError(getMessage(err));
                }
            }
            void loadFromServer();
            return ({
                "EditorPage.useEffect": ()=>{
                    active = false;
                }
            })["EditorPage.useEffect"];
        }
    }["EditorPage.useEffect"], [
        unlocked
    ]);
    const palette = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditorPage.useMemo[palette]": ()=>{
            if (activeLayer === "ground") {
                return tileManifest?.ground?.map({
                    "EditorPage.useMemo[palette]": (tile)=>({
                            id: tile.id,
                            label: tile.label,
                            image: tile.image
                        })
                }["EditorPage.useMemo[palette]"]) ?? [];
            }
            if (activeLayer === "detail") {
                return tileManifest?.details?.map({
                    "EditorPage.useMemo[palette]": (tile)=>({
                            id: tile.id,
                            label: tile.label,
                            image: tile.image
                        })
                }["EditorPage.useMemo[palette]"]) ?? [];
            }
            if (activeLayer === "buildings") {
                return tileManifest?.buildings?.map({
                    "EditorPage.useMemo[palette]": (tile)=>({
                            id: tile.id,
                            label: tile.label,
                            image: tile.image
                        })
                }["EditorPage.useMemo[palette]"]) ?? [];
            }
            if (activeLayer === "tints") {
                return tintPalette.map({
                    "EditorPage.useMemo[palette]": (item)=>({
                            id: item.id,
                            label: item.label,
                            color: item.color
                        })
                }["EditorPage.useMemo[palette]"]);
            }
            if (activeLayer === "collision") {
                return collisionPalette;
            }
            if (activeLayer === "cover") {
                return coverPalette;
            }
            return [];
        }
    }["EditorPage.useMemo[palette]"], [
        activeLayer,
        tileManifest
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorPage.useEffect": ()=>{
            if (palette.length === 0) return;
            if (!palette.some({
                "EditorPage.useEffect": (item)=>item.id === selectedTile
            }["EditorPage.useEffect"])) {
                setSelectedTile(palette[0].id);
            }
        }
    }["EditorPage.useEffect"], [
        palette,
        selectedTile
    ]);
    const groundLookup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditorPage.useMemo[groundLookup]": ()=>new Map(tileManifest?.ground?.map({
                "EditorPage.useMemo[groundLookup]": (tile)=>[
                        tile.id,
                        tile.image
                    ]
            }["EditorPage.useMemo[groundLookup]"]) ?? [])
    }["EditorPage.useMemo[groundLookup]"], [
        tileManifest
    ]);
    const detailLookup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditorPage.useMemo[detailLookup]": ()=>new Map(tileManifest?.details?.map({
                "EditorPage.useMemo[detailLookup]": (tile)=>[
                        tile.id,
                        tile.image
                    ]
            }["EditorPage.useMemo[detailLookup]"]) ?? [])
    }["EditorPage.useMemo[detailLookup]"], [
        tileManifest
    ]);
    const buildingLookup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditorPage.useMemo[buildingLookup]": ()=>new Map(tileManifest?.buildings?.map({
                "EditorPage.useMemo[buildingLookup]": (tile)=>[
                        tile.id,
                        tile.image
                    ]
            }["EditorPage.useMemo[buildingLookup]"]) ?? [])
    }["EditorPage.useMemo[buildingLookup]"], [
        tileManifest
    ]);
    const tintLookup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditorPage.useMemo[tintLookup]": ()=>{
            const lookup = new Map();
            tintPalette.forEach({
                "EditorPage.useMemo[tintLookup]": (item)=>lookup.set(item.id, item.color)
            }["EditorPage.useMemo[tintLookup]"]);
            return lookup;
        }
    }["EditorPage.useMemo[tintLookup]"], []);
    const fallbackGround = tileManifest?.ground?.[0]?.image ?? "/tilesets/tile1.png";
    const fallbackDetail = tileManifest?.details?.[0]?.image ?? "/tilesets/details/d1.png";
    const fallbackBuilding = tileManifest?.buildings?.[0]?.image ?? "/tilesets/buildings/Tower_Blue.png";
    const previewCells = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditorPage.useMemo[previewCells]": ()=>{
            if (!hoverCell) return null;
            const cells = [];
            for(let row = hoverCell.row - PREVIEW_RADIUS; row <= hoverCell.row + PREVIEW_RADIUS; row += 1){
                const line = [];
                for(let column = hoverCell.column - PREVIEW_RADIUS; column <= hoverCell.column + PREVIEW_RADIUS; column += 1){
                    line.push(buildPreviewCell(mapData, row, column));
                }
                cells.push(line);
            }
            return cells;
        }
    }["EditorPage.useMemo[previewCells]"], [
        hoverCell,
        mapData
    ]);
    function authenticate(event) {
        event.preventDefault();
        if (pin === PIN) {
            setUnlocked(true);
            setError(null);
        } else {
            setError("PIN inválido");
        }
    }
    function handleLayerChange(layer) {
        setActiveLayer(layer);
        setTool("paint");
        const preferred = getDefaultTileForLayer(layer, tileManifest);
        setSelectedTile(preferred);
    }
    function paintCell(rowIndex, columnIndex) {
        const value = tool === "erase" ? 0 : selectedTile;
        setMapData((previous)=>({
                ...previous,
                [activeLayer]: applyBrush(previous[activeLayer], rowIndex, columnIndex, brushSize, value)
            }));
    }
    function clearLayer() {
        setMapData((previous)=>({
                ...previous,
                [activeLayer]: previous[activeLayer].map((row)=>row.map(()=>0))
            }));
    }
    function fillLayer() {
        const value = tool === "erase" ? 0 : selectedTile;
        setMapData((previous)=>({
                ...previous,
                [activeLayer]: previous[activeLayer].map((row)=>row.map(()=>value))
            }));
    }
    function handleDimensionChange(newWidth, newHeight) {
        const width = clamp(newWidth, MIN_SIZE, MAX_WIDTH);
        const height = clamp(newHeight, MIN_SIZE, MAX_HEIGHT);
        setMapData((previous)=>resizeMap(previous, width, height));
        setGridWidth(width);
        setGridHeight(height);
    }
    async function copyToClipboard() {
        await navigator.clipboard.writeText(JSON.stringify(mapData));
    }
    async function saveToServer() {
        setStatus("saving");
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postJSON"])("/api/city/map", {
                map: mapData
            });
            setStatus("saved");
            setTimeout(()=>setStatus("idle"), 2000);
        } catch (err) {
            setStatus("error");
            setError(getMessage(err));
        }
    }
    const grid = mapData[activeLayer];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Admin / Editor de Mapas"
                    }, void 0, false, {
                        fileName: "[project]/app/editor/page.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Restrito. Use o PIN ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "8989"
                            }, void 0, false, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 264,
                                columnNumber: 32
                            }, this),
                            " para habilitar o editor."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/editor/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    !unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: authenticate,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "pin",
                                children: "PIN"
                            }, void 0, false, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "pin",
                                type: "password",
                                value: pin,
                                onChange: (event)=>setPin(event.target.value),
                                placeholder: "****"
                            }, void 0, false, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 275,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                children: "Entrar"
                            }, void 0, false, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/editor/page.tsx",
                        lineNumber: 266,
                        columnNumber: 11
                    }, this),
                    unlocked && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/editor/page.tsx",
                        lineNumber: 279,
                        columnNumber: 31
                    }, this),
                    tilesError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: tilesError
                    }, void 0, false, {
                        fileName: "[project]/app/editor/page.tsx",
                        lineNumber: 280,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/editor/page.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Camadas, ferramentas e dimensões"
                            }, void 0, false, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid",
                                style: {
                                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Camada ativa"
                                            }, void 0, false, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-4",
                                                children: layerOrder.map((layer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "button",
                                                        type: "button",
                                                        style: {
                                                            opacity: activeLayer === layer ? 1 : 0.5
                                                        },
                                                        onClick: ()=>handleLayerChange(layer),
                                                        children: layerLabels[layer]
                                                    }, layer, false, {
                                                        fileName: "[project]/app/editor/page.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Ferramentas"
                                            }, void 0, false, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "button",
                                                        type: "button",
                                                        style: {
                                                            opacity: tool === "paint" ? 1 : 0.5
                                                        },
                                                        onClick: ()=>setTool("paint"),
                                                        children: "Pintar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/editor/page.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "button",
                                                        type: "button",
                                                        style: {
                                                            opacity: tool === "erase" ? 1 : 0.5
                                                        },
                                                        onClick: ()=>setTool("erase"),
                                                        children: "Borracha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/editor/page.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Pincéis"
                                            }, void 0, false, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 326,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: brushSizes.map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "button",
                                                        type: "button",
                                                        style: {
                                                            opacity: brushSize === size ? 1 : 0.5
                                                        },
                                                        onClick: ()=>setBrushSize(size),
                                                        children: [
                                                            size,
                                                            "×",
                                                            size
                                                        ]
                                                    }, size, true, {
                                                        fileName: "[project]/app/editor/page.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Dimensões"
                                            }, void 0, false, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid",
                                                style: {
                                                    gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Largura",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: MIN_SIZE,
                                                                max: MAX_WIDTH,
                                                                value: gridWidth,
                                                                onChange: (event)=>handleDimensionChange(Number(event.target.value), gridHeight)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/editor/page.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/editor/page.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Altura",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: MIN_SIZE,
                                                                max: MAX_HEIGHT,
                                                                value: gridHeight,
                                                                onChange: (event)=>handleDimensionChange(gridWidth, Number(event.target.value))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/editor/page.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/editor/page.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/editor/page.tsx",
                        lineNumber: 285,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: [
                                    "Paleta (",
                                    layerLabels[activeLayer],
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 370,
                                columnNumber: 13
                            }, this),
                            palette.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Carregando paleta…"
                            }, void 0, false, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 371,
                                columnNumber: 38
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-4",
                                children: palette.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "palette-button",
                                        onClick: ()=>{
                                            setTool("paint");
                                            setSelectedTile(item.id);
                                        },
                                        style: {
                                            borderColor: selectedTile === item.id ? "#ffd27f" : "rgba(255,255,255,0.2)",
                                            backgroundImage: item.image ? `url(${item.image})` : undefined,
                                            backgroundColor: item.color
                                        },
                                        title: item.helper ?? item.label,
                                        children: !item.image && !item.color && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "palette-label",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/editor/page.tsx",
                                            lineNumber: 389,
                                            columnNumber: 50
                                        }, this)
                                    }, item.id, false, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 374,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/editor/page.tsx",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: [
                                    "Grid (",
                                    gridWidth,
                                    " × ",
                                    gridHeight,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Cada célula representa 64 px no jogo. Clique ou arraste para pintar, use a lupa para ver o resultado ampliado."
                            }, void 0, false, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "editor-workspace",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "editor-grid",
                                        style: {
                                            gridTemplateColumns: `repeat(${gridWidth}, 24px)`
                                        },
                                        children: grid.map((row, rowIndex)=>row.map((value, columnIndex)=>{
                                                const groundTile = mapData.ground[rowIndex]?.[columnIndex] ?? 0;
                                                const detailValue = mapData.detail[rowIndex]?.[columnIndex] ?? 0;
                                                const buildingValue = mapData.buildings[rowIndex]?.[columnIndex] ?? 0;
                                                const tintValue = mapData.tints[rowIndex]?.[columnIndex] ?? 0;
                                                const collisionValue = mapData.collision[rowIndex]?.[columnIndex] ?? 0;
                                                const coverValue = mapData.cover[rowIndex]?.[columnIndex] ?? 0;
                                                const texture = groundLookup.get(groundTile) ?? fallbackGround;
                                                const overlayValue = activeLayer === "ground" ? value : activeLayer === "detail" ? detailValue : activeLayer === "buildings" ? buildingValue : activeLayer === "tints" ? tintValue : activeLayer === "collision" ? collisionValue : coverValue;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>paintCell(rowIndex, columnIndex),
                                                    onMouseEnter: ()=>setHoverCell({
                                                            row: rowIndex,
                                                            column: columnIndex
                                                        }),
                                                    onMouseLeave: ()=>setHoverCell(null),
                                                    style: {
                                                        width: 24,
                                                        height: 24,
                                                        padding: 0,
                                                        borderRadius: 4,
                                                        border: "1px solid rgba(255,255,255,0.2)",
                                                        backgroundImage: `url(${texture})`,
                                                        backgroundSize: "cover",
                                                        position: "relative"
                                                    },
                                                    children: [
                                                        overlayValue > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `cell-overlay layer-${activeLayer}`,
                                                            style: {
                                                                backgroundColor: activeLayer === "tints" && tintLookup.get(tintValue) ? tintLookup.get(tintValue) : undefined
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/editor/page.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 27
                                                        }, this),
                                                        detailValue > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cell-chip detail"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/editor/page.tsx",
                                                            lineNumber: 454,
                                                            columnNumber: 45
                                                        }, this),
                                                        buildingValue > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cell-chip building"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/editor/page.tsx",
                                                            lineNumber: 455,
                                                            columnNumber: 47
                                                        }, this),
                                                        collisionValue > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cell-chip collision"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/editor/page.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 48
                                                        }, this),
                                                        coverValue > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cell-chip cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/editor/page.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 44
                                                        }, this)
                                                    ]
                                                }, `${rowIndex}-${columnIndex}`, true, {
                                                    fileName: "[project]/app/editor/page.tsx",
                                                    lineNumber: 426,
                                                    columnNumber: 23
                                                }, this);
                                            }))
                                    }, void 0, false, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "editor-preview",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                children: "Lupa"
                                            }, void 0, false, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 464,
                                                columnNumber: 17
                                            }, this),
                                            previewCells ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preview-grid",
                                                style: {
                                                    gridTemplateColumns: `repeat(${previewCells[0].length}, 48px)`
                                                },
                                                children: previewCells.map((row, rowIndex)=>row.map((cell, columnIndex)=>{
                                                        if (!cell) {
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "preview-cell empty"
                                                            }, `${rowIndex}-${columnIndex}`, false, {
                                                                fileName: "[project]/app/editor/page.tsx",
                                                                lineNumber: 473,
                                                                columnNumber: 34
                                                            }, this);
                                                        }
                                                        const ground = groundLookup.get(cell.ground) ?? fallbackGround;
                                                        const detail = cell.detail > 0 ? detailLookup.get(cell.detail) ?? fallbackDetail : null;
                                                        const building = cell.building > 0 ? buildingLookup.get(cell.building) ?? fallbackBuilding : null;
                                                        const tintColor = tintLookup.get(cell.tint ?? 0);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "preview-cell",
                                                            style: {
                                                                backgroundImage: `url(${ground})`
                                                            },
                                                            children: [
                                                                detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "preview-layer",
                                                                    style: {
                                                                        backgroundImage: `url(${detail})`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/editor/page.tsx",
                                                                    lineNumber: 486,
                                                                    columnNumber: 40
                                                                }, this),
                                                                building && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "preview-layer",
                                                                    style: {
                                                                        backgroundImage: `url(${building})`,
                                                                        opacity: 0.85
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/editor/page.tsx",
                                                                    lineNumber: 488,
                                                                    columnNumber: 31
                                                                }, this),
                                                                cell.collision > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "preview-chip collision"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/editor/page.tsx",
                                                                    lineNumber: 490,
                                                                    columnNumber: 52
                                                                }, this),
                                                                cell.cover > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "preview-chip cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/editor/page.tsx",
                                                                    lineNumber: 491,
                                                                    columnNumber: 48
                                                                }, this),
                                                                tintColor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "preview-chip tint",
                                                                    style: {
                                                                        backgroundColor: tintColor
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/editor/page.tsx",
                                                                    lineNumber: 492,
                                                                    columnNumber: 43
                                                                }, this)
                                                            ]
                                                        }, `${rowIndex}-${columnIndex}`, true, {
                                                            fileName: "[project]/app/editor/page.tsx",
                                                            lineNumber: 481,
                                                            columnNumber: 27
                                                        }, this);
                                                    }))
                                            }, void 0, false, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 466,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Passe o cursor sobre o grid para pré-visualizar."
                                            }, void 0, false, {
                                                fileName: "[project]/app/editor/page.tsx",
                                                lineNumber: 499,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 463,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "editor-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button",
                                        type: "button",
                                        onClick: clearLayer,
                                        children: [
                                            "Limpar camada (",
                                            layerLabels[activeLayer],
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 504,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button",
                                        type: "button",
                                        onClick: fillLayer,
                                        children: "Preencher camada"
                                    }, void 0, false, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 507,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button",
                                        type: "button",
                                        onClick: copyToClipboard,
                                        children: "Copiar JSON"
                                    }, void 0, false, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button",
                                        type: "button",
                                        onClick: saveToServer,
                                        children: status === "saving" ? "Salvando…" : status === "saved" ? "Mapa salvo!" : "Salvar mapa"
                                    }, void 0, false, {
                                        fileName: "[project]/app/editor/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/editor/page.tsx",
                                lineNumber: 503,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/editor/page.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/app/editor/page.tsx",
        lineNumber: 261,
        columnNumber: 5
    }, this);
}
_s(EditorPage, "h+vC0sk62yEOq2t+TnAAjEJFgv0=");
_c = EditorPage;
function createEmptyMap(width, height) {
    const buildLayer = ()=>Array.from({
            length: height
        }, ()=>Array.from({
                length: width
            }, ()=>0));
    return {
        ground: buildLayer(),
        detail: buildLayer(),
        buildings: buildLayer(),
        tints: buildLayer(),
        collision: buildLayer(),
        cover: buildLayer()
    };
}
function applyBrush(layer, rowIndex, columnIndex, size, value) {
    return layer.map((row, r)=>row.map((current, c)=>{
            if (r >= rowIndex && r < rowIndex + size && c >= columnIndex && c < columnIndex + size) {
                return value;
            }
            return current;
        }));
}
function resizeMap(map, width, height) {
    return {
        ground: resizeLayer(map.ground, width, height),
        detail: resizeLayer(map.detail, width, height),
        buildings: resizeLayer(map.buildings, width, height),
        tints: resizeLayer(map.tints, width, height),
        collision: resizeLayer(map.collision, width, height),
        cover: resizeLayer(map.cover, width, height)
    };
}
function resizeLayer(layer, width, height) {
    return Array.from({
        length: height
    }, (_, rowIndex)=>Array.from({
            length: width
        }, (_, columnIndex)=>layer[rowIndex]?.[columnIndex] ?? 0));
}
function clamp(value, min, max) {
    const next = Number.isNaN(value) ? min : value;
    return Math.max(min, Math.min(max, next));
}
function getMessage(err) {
    return err instanceof Error ? err.message : "Falha no editor";
}
function buildPreviewCell(map, row, column) {
    if (row < 0 || column < 0) return null;
    if (!map.ground[row] || typeof map.ground[row][column] === "undefined") return null;
    return {
        row,
        column,
        ground: map.ground[row][column],
        detail: map.detail[row]?.[column] ?? 0,
        building: map.buildings[row]?.[column] ?? 0,
        tint: map.tints[row]?.[column] ?? 0,
        collision: map.collision[row]?.[column] ?? 0,
        cover: map.cover[row]?.[column] ?? 0
    };
}
function getDefaultTileForLayer(layer, manifest) {
    if (layer === "ground") return manifest?.ground?.[0]?.id ?? 0;
    if (layer === "detail") return manifest?.details?.[0]?.id ?? 0;
    if (layer === "buildings") return manifest?.buildings?.[0]?.id ?? 0;
    if (layer === "tints") return tintPalette[0].id;
    if (layer === "collision") return collisionPalette[0].id;
    if (layer === "cover") return coverPalette[0].id;
    return 0;
}
var _c;
__turbopack_context__.k.register(_c, "EditorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_3b2f88bd._.js.map