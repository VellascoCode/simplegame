"use client";

import { useCallback } from "react";

import { postJSON } from "@/lib/clientApi";

export function useXp(ownerId: string, characterId?: string) {
  const grantXp = useCallback(
    async (amount: number) => {
      if (!ownerId || !characterId || amount <= 0) return;
      await postJSON("/api/character/xp", {
        ownerId,
        characterId,
        amount
      }).catch(() => undefined);
    },
    [ownerId, characterId]
  );

  return { grantXp };
}
