"use server";

import { NextResponse } from "next/server";

import { listMaps, listTiles } from "@/lib/maps";

export async function GET(): Promise<NextResponse> {
  try {
    const [maps, tiles] = await Promise.all([listMaps(), listTiles()]);
    return NextResponse.json({ maps, tiles });
  } catch (error) {
    console.error("Failed to list maps", error);
    return NextResponse.json({ error: "Failed to list maps" }, { status: 500 });
  }
}
