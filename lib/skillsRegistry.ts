import type { Skill } from "./models";

export const SKILL_NAMES: string[] = [
  "Harvesting",
  "Woodcutting",
  "Mining",
  "Fishing",
  "Cooking",
  "Alchemy",
  "Smithing",
  "Armoring",
  "Tailoring",
  "Fletching",
  "Swordsmanship",
  "Archery",
  "Sorcery",
  "Dark Arts",
  "Fire Arts",
  "Air Arts",
  "Nature Arts",
  "Heavy Weapons",
  "Defense",
  "Agility"
];

const EXP_TO_LEVEL = 300;

export function buildDefaultSkill(name: string): Skill {
  return {
    name,
    level: 1,
    exp: 0,
    expToLevel: EXP_TO_LEVEL,
    buffs: {
      passive: [],
      active: []
    }
  };
}

export function ensureSkillsComplete(current?: Skill[]): { skills: Skill[]; changed: boolean } {
  const existingByName = new Map((current ?? []).map((skill) => [skill.name, skill]));
  let changed = false;
  const skills = SKILL_NAMES.map((name) => {
    const found = existingByName.get(name);
    if (!found) {
      changed = true;
      return buildDefaultSkill(name);
    }
    const normalized: Skill = {
      name: found.name,
      level: Math.max(1, found.level ?? 1),
      exp: Math.max(0, found.exp ?? 0),
      expToLevel: found.expToLevel ?? EXP_TO_LEVEL,
      buffs: {
        passive: found.buffs?.passive ?? [],
        active: found.buffs?.active ?? []
      }
    };
    if (
      normalized.expToLevel !== EXP_TO_LEVEL ||
      normalized.level !== found.level ||
      normalized.exp !== found.exp ||
      normalized.buffs?.passive !== found.buffs?.passive ||
      normalized.buffs?.active !== found.buffs?.active
    ) {
      changed = true;
    }
    return normalized;
  });
  if (current && current.length !== skills.length) {
    changed = true;
  }
  return { skills, changed };
}

export function canGainSkillExp(skill: Skill, classLevel: number, classTier: number) {
  return skill.level <= classLevel * classTier;
}

export function grantSkillExp(skill: Skill, gainedExp: number): { updated: Skill; leveledUp: boolean } {
  const expToLevel = skill.expToLevel ?? EXP_TO_LEVEL;
  const newExpTotal = Math.max(0, (skill.exp ?? 0) + gainedExp);
  let level = Math.max(1, skill.level ?? 1);
  let remainingExp = newExpTotal;
  let leveledUp = false;
  while (remainingExp >= expToLevel) {
    remainingExp -= expToLevel;
    level += 1;
    leveledUp = true;
  }
  return {
    updated: {
      ...skill,
      level,
      exp: remainingExp,
      expToLevel
    },
    leveledUp
  };
}
