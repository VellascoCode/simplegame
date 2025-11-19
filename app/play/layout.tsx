"use client";

export const runtime = "nodejs";
export const preferredRegion = "home";

import type { ReactNode } from "react";

export default function PlayLayout({ children }: { children: ReactNode }) {
  return children;
}
