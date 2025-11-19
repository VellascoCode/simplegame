import levelingConfig from "@/lib/data/leveling.json";

type LevelEntry = {
  level: number;
  xpToNext: number;
};

type LevelingConfig = {
  xpPerLevel?: number;
  levels?: LevelEntry[];
};

const CONFIG = (levelingConfig ?? {}) as LevelingConfig;
const DEFAULT_STEP = CONFIG.xpPerLevel ?? 50;
const LEVEL_OVERRIDES = CONFIG.levels ?? [];

function xpStep(level: number): number {
  if (level <= 1) return 0;
  const override = LEVEL_OVERRIDES.find((entry) => entry.level === level);
  return override?.xpToNext ?? DEFAULT_STEP;
}

export function xpForLevel(level: number) {
  if (level <= 1) return 0;
  let total = 0;
  for (let current = 2; current <= level; current++) {
    total += xpStep(current);
  }
  return total;
}

export function xpNeededForNextLevel(level: number) {
  return xpStep(level + 1) || DEFAULT_STEP;
}

export function resolveLevel(totalXp: number) {
  let level = 1;
  while (totalXp >= xpForLevel(level + 1)) {
    level += 1;
  }
  const currentLevelFloor = xpForLevel(level);
  const progress = totalXp - currentLevelFloor;
  const needed = xpNeededForNextLevel(level);
  return {
    level,
    progress,
    needed: needed > 0 ? needed : DEFAULT_STEP,
    nextLevelXp: currentLevelFloor + (needed > 0 ? needed : DEFAULT_STEP)
  };
}
