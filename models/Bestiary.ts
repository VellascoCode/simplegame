import { z } from "zod";

export type BestiaryEntry = {
  monsterId: number;
  kills: number;
  tier: number;
};

export type BestiaryProfile = {
  ownerId: string;
  characterId: string;
  entries: BestiaryEntry[];
  updatedAt: string;
};

export const BESTIARY_TIER_THRESHOLDS = [0, 5, 15, 30, 60, 120] as const;
export const BESTIARY_TIER_LABELS = ["Comum", "Incomum", "Raro", "Épico", "Lendário", "Mítico"] as const;

export function resolveBestiaryTier(kills: number) {
  let tier = 0;
  for (let i = 0; i < BESTIARY_TIER_THRESHOLDS.length; i++) {
    if (kills >= BESTIARY_TIER_THRESHOLDS[i]) {
      tier = i;
    }
  }
  return Math.min(tier, BESTIARY_TIER_THRESHOLDS.length - 1);
}

export const bestiaryUpdateSchema = z.object({
  ownerId: z.string().min(1),
  characterId: z.string().min(1),
  monsterId: z.number().int().nonnegative()
});

export const bestiaryGetSchema = z.object({
  ownerId: z.string().min(1),
  characterId: z.string().min(1)
});
