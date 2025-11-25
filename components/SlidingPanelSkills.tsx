"use client";

import type { Skill } from "@/lib/models";

type SlidingPanelSkillsProps = {
  open: boolean;
  skills: Skill[];
  onClose: () => void;
};

export function SlidingPanelSkills({ open, skills, onClose }: SlidingPanelSkillsProps) {
  const sortedSkills = [...skills].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <aside
      className={`pointer-events-auto fixed right-4 top-24 z-30 w-[420px] max-h-[80vh] overflow-y-auto rounded-3xl border border-amber-200/20 bg-[#05070c]/95 p-5 text-amber-100 shadow-2xl transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Skills</p>
          <h3 className="text-lg font-semibold text-amber-50">Progresso do personagem</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-amber-200/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100 hover:bg-white/10"
        >
          Fechar
        </button>
      </header>

      <div className="divide-y divide-amber-200/10">
        {sortedSkills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>
    </aside>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  const percent = Math.min(100, Math.max(0, (skill.exp / (skill.expToLevel || 1)) * 100));
  const simulatedBuffs = buildSimulatedBuffs(skill);

  return (
    <div className="py-3">
      <div className="flex items-center justify-between text-sm text-amber-200/80">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/80">Skill</p>
          <p className="text-lg font-semibold text-amber-50 leading-tight">{skill.name}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/80">Level</p>
          <p className="text-xl font-bold text-amber-100 leading-tight">Lv. {skill.level}</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-xs text-amber-300/80">
          <span>XP</span>
          <span>
            {skill.exp} / {skill.expToLevel}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/5">
          <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${percent.toFixed(1)}%` }} />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-amber-200/80">
          <span className="text-[11px] uppercase tracking-[0.25em] text-amber-400/80">Buffs</span>
          {simulatedBuffs.length === 0 && <span className="text-amber-300/60">—</span>}
          {simulatedBuffs.map((buff) => (
            <span
              key={buff.label}
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0c0c0f]"
              style={{ backgroundColor: buff.color }}
            >
              {buff.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

type SimulatedBuff = { label: string; color: string };

const BUFF_COLORS: Record<string, string> = {
  offense: "#fbbf24",
  defense: "#60a5fa",
  utility: "#34d399",
  control: "#a78bfa"
};

function buildSimulatedBuffs(skill: Skill): SimulatedBuff[] {
  const passive = skill.buffs?.passive ?? [];
  const active = skill.buffs?.active ?? [];
  const derived: SimulatedBuff[] = [];

  const addBuff = (label: string, color: string) => derived.push({ label, color });

  passive.forEach((label) => addBuff(label, BUFF_COLORS.utility));
  active.forEach((label) => addBuff(label, BUFF_COLORS.offense));

  if (derived.length === 0) {
    const baseLabel = skill.name.includes("Defense")
      ? "Guard Up +2%"
      : skill.name.includes("Sword") || skill.name.includes("Weapons")
      ? "Dano +2%"
      : skill.name.includes("Archery")
      ? "Precisão +2%"
      : skill.name.includes("Alchemy")
      ? "Potions +2%"
      : "Progresso +1%";
    const baseColor =
      skill.name.includes("Defense") || skill.name.includes("Armoring")
        ? BUFF_COLORS.defense
        : skill.name.includes("Alchemy") || skill.name.includes("Cooking")
        ? BUFF_COLORS.utility
        : BUFF_COLORS.offense;
    addBuff(baseLabel, baseColor);
  }

  return derived;
}
