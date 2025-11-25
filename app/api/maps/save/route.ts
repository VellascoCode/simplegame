"use server";

import { type NextRequest, NextResponse } from "next/server";

import type { RawMapData } from "@/lib/maps";

import { saveMap } from "@/lib/maps";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = (await request.json()) as unknown;
    if (!isRawMapData(payload)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await saveMap(payload);
    return NextResponse.json({ success: true, name: payload.name });
  } catch (error) {
    console.error("Failed to save map", error);
    return NextResponse.json({ error: "Failed to save map" }, { status: 500 });
  }
}

function isRawMapData(value: unknown): value is RawMapData {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Partial<RawMapData>;
  return (
    typeof data.name === "string" &&
    typeof data.cols === "number" &&
    typeof data.rows === "number"
  );
}
