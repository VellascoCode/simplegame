import type { Character, Skill } from "./models";

import { buildDefaultSkill, canGainSkillExp, ensureSkillsComplete, grantSkillExp, SKILL_NAMES } from "./skillsRegistry";

const BASE_CLASS_NAME = "Adventurer";
const MAX_CLASS_LEVEL = 100;

function clampClassLevel(level?: number) {
  if (typeof level !== "number" || Number.isNaN(level) || level < 1) return 1;
  return Math.min(MAX_CLASS_LEVEL, Math.floor(level));
}

function deriveClassTier(classLevel: number, currentTier?: number) {
  const tierFromLevel =
    classLevel >= 50 ? 4 : classLevel >= 45 ? 3 : classLevel >= 20 ? 2 : classLevel >= 10 ? 1 : 1;
  if (!currentTier) return tierFromLevel;
  return Math.max(currentTier, tierFromLevel);
}

function normalizeClassFields(character: Character) {
  const classLevel = clampClassLevel(character.classLevel);
  const classTier = deriveClassTier(classLevel, character.classTier);
  return {
    classLevel,
    classTier,
    classBase: character.classBase?.trim() || BASE_CLASS_NAME,
    classAdvanced: character.classAdvanced?.trim() || "",
    classElite: character.classElite?.trim() || ""
  };
}

function normalizeSkills(skills?: Skill[]) {
  return ensureSkillsComplete(skills);
}

export function ensureCharacterProgression(character: Character) {
  const normalizedClass = normalizeClassFields(character);
  const { skills, changed: skillsChanged } = normalizeSkills(character.skills);
  const changed =
    skillsChanged ||
    normalizedClass.classLevel !== character.classLevel ||
    normalizedClass.classTier !== character.classTier ||
    normalizedClass.classBase !== character.classBase ||
    normalizedClass.classAdvanced !== (character.classAdvanced ?? "") ||
    normalizedClass.classElite !== (character.classElite ?? "");
  return {
    character: {
      ...character,
      ...normalizedClass,
      skills
    },
    changed
  };
}

export function createDefaultSkills() {
  return SKILL_NAMES.map((name) => buildDefaultSkill(name));
}

export function tryGrantSkillExp(
  skill: Skill,
  classLevel: number,
  classTier: number,
  expGain: number
): { updated: Skill; leveledUp: boolean } {
  if (!canGainSkillExp(skill, classLevel, classTier)) {
    return { updated: skill, leveledUp: false };
  }
  return grantSkillExp(skill, expGain);
}
