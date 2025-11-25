"use client";

import type { Character } from "@/lib/models";

type SlidingPanelCharacterProps = {
  open: boolean;
  character: Character | null;
  onClose: () => void;
};

export function SlidingPanelCharacter({ open, character, onClose }: SlidingPanelCharacterProps) {
  if (!character) return null;

  const classProgress = Math.min(100, Math.max(0, character.classLevel));
  const eliteLabel =
    character.classTier >= 4 && character.classLevel >= 100
      ? "Elite alcançada"
      : "Rumo à Elite na Tier 4 (Lv.100)";

  return (
    <aside
      className={`pointer-events-auto fixed right-4 top-24 z-30 w-96 max-h-[80vh] overflow-y-auto rounded-3xl border border-amber-200/20 bg-[#05070c]/95 p-5 text-amber-100 shadow-2xl transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Personagem</p>
          <h3 className="text-lg font-semibold text-amber-50">{character.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-amber-200/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100 hover:bg-white/10"
        >
          Fechar
        </button>
      </header>

      <div className="space-y-3">
        <InfoRow label="Classe base" value={character.classBase} />
        <InfoRow label="Avançada" value={character.classAdvanced || "—"} />
        <InfoRow label="Elite" value={character.classElite || "—"} />
        <InfoRow label="Tier" value={`Tier ${character.classTier ?? 1}`} />
        <InfoRow label="Nível da classe" value={`Lv. ${character.classLevel}/100`} />
        <ProgressBar label="Progresso da classe" percent={(classProgress / 100) * 100} />
        <InfoRow label="Status" value={eliteLabel} />
      </div>
    </aside>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-amber-200/10 bg-white/5 px-3 py-2 text-sm">
      <span className="text-amber-200/80">{label}</span>
      <span className="font-semibold text-amber-50">{value}</span>
    </div>
  );
}

function ProgressBar({ label, percent }: { label: string; percent: number }) {
  const width = `${Math.min(100, Math.max(0, percent)).toFixed(1)}%`;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-amber-200/80">
        <span>{label}</span>
        <span>{width}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width }} />
      </div>
    </div>
  );
}
