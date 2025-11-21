"use client";

import { useCallback, useRef } from "react";

import { MAP_TILE_SIZE } from "@/legacy/phaser/game/constants";

export function useSessionPosition(
  onPositionChange?: (position: { x: number; y: number }) => void
) {
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastSync = useRef(0);

  const syncPosition = useCallback(
    (x: number, y: number, force = false) => {
      const deltaX = Math.abs(x - lastX.current);
      const deltaY = Math.abs(y - lastY.current);
      const movedTiles = Math.max(deltaX, deltaY) / MAP_TILE_SIZE;
      if (!force && movedTiles < 2) return;
      const now = performance.now();
      if (!force && now - lastSync.current < 150) return;
      lastX.current = x;
      lastY.current = y;
      lastSync.current = now;
      onPositionChange?.({ x, y });
    },
    [onPositionChange]
  );

  return syncPosition;
}
