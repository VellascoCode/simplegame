"use server";

import { NextRequest, NextResponse } from "next/server";
import { loadMap } from "@/lib/maps";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const map = searchParams.get("map");
  if (!map) {
    return NextResponse.json({ error: "Missing map parameter" }, { status: 400 });
  }
  try {
    const data = await loadMap(map);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Failed to load map "${map}"`, error);
    return NextResponse.json({ error: "Map not found" }, { status: 404 });
  }
}
