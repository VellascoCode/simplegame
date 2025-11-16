export type LevelProgress = {
  level: number;
  totalXp: number;
};

const BASE_THRESHOLDS: LevelProgress[] = [
  { level: 1, totalXp: 0 },
  { level: 2, totalXp: 300 },
  { level: 3, totalXp: 700 },
  { level: 4, totalXp: 1500 }
];

const EXTRA_STEP = 1000;

export function xpForLevel(level: number) {
  if (level <= 1) return 0;
  const preset = BASE_THRESHOLDS.find((entry) => entry.level === level);
  if (preset) return preset.totalXp;
  let total = BASE_THRESHOLDS[BASE_THRESHOLDS.length - 1].totalXp;
  for (let current = BASE_THRESHOLDS.length + 1; current <= level; current++) {
    total += EXTRA_STEP;
  }
  return total;
}

export function resolveLevel(totalXp: number) {
  let level = 1;
  while (totalXp >= xpForLevel(level + 1)) {
    level += 1;
  }
  const currentLevelFloor = xpForLevel(level);
  const nextLevelRequirement = xpForLevel(level + 1);
  const progress = totalXp - currentLevelFloor;
  const needed = nextLevelRequirement - currentLevelFloor;
  return {
    level,
    progress,
    needed: needed > 0 ? needed : 1,
    nextLevelXp: nextLevelRequirement
  };
}
