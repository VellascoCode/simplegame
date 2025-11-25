import { promises as fs } from "node:fs";
import path from "node:path";

import type { TileInfo, TileManifest } from "@/lib/tileManifest";

function sortNaturally(files: string[]) {
  return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

async function listFiles(dir: string) {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
}

function buildTileList(files: string[], basePath: string, startId = 0): TileInfo[] {
  return files.map((file, index) => ({
    id: startId + index,
    label: file.replace(/\.[^.]+$/, ""),
    image: path.posix.join(basePath, file).replace(/\\/g, "/")
  }));
}

export async function GET() {
  const root = path.join(process.cwd(), "public", "tilesets");
  const groundFiles = sortNaturally(
    (await listFiles(root)).filter((file) => /^tile\d+\.(png|jpg|jpeg)$/i.test(file))
  );
  const detailFiles = sortNaturally(
    (await listFiles(path.join(root, "details"))).filter((file) => /^d\d+\.(png|jpg|jpeg)$/i.test(file))
  );
  const buildingFiles = sortNaturally(
    (await listFiles(path.join(root, "buildings"))).filter((file) => /\.(png|jpg|jpeg)$/i.test(file))
  );

  const manifest: TileManifest = {
    ground: buildTileList(groundFiles, "/tilesets"),
    details: buildTileList(detailFiles, "/tilesets/details", 1),
    buildings: buildTileList(buildingFiles, "/tilesets/buildings", 1)
  };

  return Response.json(manifest);
}
