import { promises as fs } from "fs";
import path from "path";

export type RawMapData = {
  name: string;
  cols: number;
  rows: number;
  tilesLayer0?: string[][];
  tilesLayer1?: string[][];
  tilesLayer2?: string[][];
  tiles?: string[][];
  blocks?: boolean[][];
  buildingOverlay?: string[][];
};

export type MapData = {
  name: string;
  cols: number;
  rows: number;
  tilesLayer0: string[][];
  tilesLayer1: string[][];
  tilesLayer2: string[][];
  blocks: boolean[][];
  buildingOverlay: string[][];
};

const MODERN_MAPS_DIR = path.join(process.cwd(), "maps-data");
const LEGACY_MAPS_DIR = path.join(process.cwd(), "maps");
const TILESET_DIR = path.join(process.cwd(), "public", "tilesets");

async function ensureMapsDir(): Promise<void> {
  await fs.mkdir(MODERN_MAPS_DIR, { recursive: true });
}

async function listMapFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json")).map((entry) => entry.name.replace(/\.json$/i, ""));
  } catch {
    return [];
  }
}

export async function listMaps(): Promise<string[]> {
  await ensureMapsDir();
  const [modern, legacy] = await Promise.all([listMapFiles(MODERN_MAPS_DIR), listMapFiles(LEGACY_MAPS_DIR)]);
  return Array.from(new Set([...modern, ...legacy])).sort();
}

async function collectTiles(currentDir: string, relative = ""): Promise<string[]> {
  const directory = relative ? path.join(currentDir, relative) : currentDir;
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const nextRelative = relative ? path.join(relative, entry.name) : entry.name;
    if (entry.isDirectory()) {
      const nested = await collectTiles(currentDir, nextRelative);
      files.push(...nested);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      const normalized = nextRelative.split(path.sep).filter(Boolean).join("/");
      files.push(path.posix.join("/tilesets", normalized));
    }
  }
  return files;
}

export async function listTiles(): Promise<string[]> {
  const files = await collectTiles(TILESET_DIR);
  return files.sort();
}

function normalizeMap(data: RawMapData): MapData {
  const tilesLayer0 = data.tilesLayer0 ?? data.tiles ?? [];
  const tilesLayer1 = data.tilesLayer1 ?? [];
  const tilesLayer2 = data.tilesLayer2 ?? [];
  const blocks = data.blocks ?? [];
  const buildingOverlay = data.buildingOverlay ?? [];
  return {
    name: data.name,
    cols: data.cols,
    rows: data.rows,
    tilesLayer0,
    tilesLayer1,
    tilesLayer2,
    blocks,
    buildingOverlay
  };
}

async function writeModernMap(data: MapData): Promise<void> {
  await ensureMapsDir();
  const sanitizedName = data.name.replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "map";
  const filePath = path.join(MODERN_MAPS_DIR, `${sanitizedName}.json`);
  const payload: MapData & { tiles: string[][] } = {
    ...data,
    name: sanitizedName,
    tiles: data.tilesLayer0
  };
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf-8");
}

export async function loadMap(name: string): Promise<MapData> {
  await ensureMapsDir();
  const candidates = [path.join(MODERN_MAPS_DIR, `${name}.json`), path.join(LEGACY_MAPS_DIR, `${name}.json`)];
  for (const filePath of candidates) {
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const parsed = JSON.parse(content) as RawMapData;
      const normalized = normalizeMap(parsed);
      if (filePath.startsWith(LEGACY_MAPS_DIR)) {
        await writeModernMap({ ...normalized, name });
      }
      return normalized;
    } catch (error) {
      if (isFileMissingError(error)) {
        continue;
      }
      throw error;
    }
  }
  throw new Error("Map not found");
}

export async function saveMap(data: RawMapData): Promise<void> {
  if (!data.name) {
    throw new Error("Map name is required");
  }
  const sanitizedName = data.name.replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "map";
  const normalized = normalizeMap({ ...data, name: sanitizedName });
  await writeModernMap(normalized);
}

export function createEmptyMap(name: string, cols: number, rows: number, tile: string): MapData {
  const tilesLayer0 = Array.from({ length: rows }, () => Array.from({ length: cols }, () => tile));
  const tilesLayer1 = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""));
  const tilesLayer2 = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""));
  const blocks = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
  const buildingOverlay = Array.from({ length: rows }, () => Array.from({ length: cols }, () => "none"));
  return {
    name,
    cols,
    rows,
    tilesLayer0,
    tilesLayer1,
    tilesLayer2,
    blocks,
    buildingOverlay
  };
}

function isFileMissingError(error: unknown): error is { code?: string } {
  return Boolean(error && typeof error === "object" && "code" in error && (error as { code?: unknown }).code === "ENOENT");
}
