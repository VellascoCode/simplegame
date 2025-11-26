"use client";

import type { Character } from "@/lib/models";
import { useTheme } from "@/components/ThemeProvider";

type SlidingPanelCharacterProps = {
  open: boolean;
  character: Character | null;
  onClose: () => void;
};

export function SlidingPanelCharacter({ open, character, onClose }: SlidingPanelCharacterProps) {
  const { theme } = useTheme();

  if (!character) return null;

  const classProgress = Math.min(100, Math.max(0, character.classLevel));
  const eliteLabel =
    character.classTier >= 4 && character.classLevel >= 100
      ? "Elite alcançada"
      : "Rumo à Elite na Tier 4 (Lv.100)";

  return (
    <aside
      className={`pointer-events-auto fixed right-4 top-24 z-30 w-96 max-h-[80vh] overflow-y-auto rounded-3xl border-2 shadow-2xl transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      } ${
        theme === "dark-fantasy"
          ? "border-amber-200/20 bg-stone-950/95 text-amber-100 shadow-black/70"
          : theme === "royal-medieval"
          ? "border-amber-200/20 bg-amber-950/95 text-amber-100 shadow-black/70"
          : "border-pink-200/30 bg-pink-50/95 text-pink-800 shadow-pink-200/50"
      }`}
    >
      <header className="mb-4 flex items-center justify-between p-5">
        <div>
          <p className={`text-xs uppercase tracking-[0.3em] ${
            theme === "dark-fantasy" || theme === "royal-medieval"
              ? "text-amber-300/70"
              : "text-pink-600/70"
          }`}>Personagem</p>
          <h3 className={`text-lg font-semibold ${
            theme === "dark-fantasy" || theme === "royal-medieval"
              ? "text-amber-50"
              : "text-pink-800"
          }`}>{character.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] transition-all duration-200 hover:scale-105 ${
            theme === "dark-fantasy" || theme === "royal-medieval"
              ? "border-amber-200/20 text-amber-100 hover:bg-white/10"
              : "border-pink-200/30 text-pink-800 hover:bg-pink-100/50"
          }`}
        >
          Fechar
        </button>
      </header>

      <div className="space-y-3 px-5 pb-5">
        <InfoRow label="Classe base" value={character.classBase} theme={theme} />
        <InfoRow label="Avançada" value={character.classAdvanced || "—"} theme={theme} />
        <InfoRow label="Elite" value={character.classElite || "—"} theme={theme} />
        <InfoRow label="Tier" value={`Tier ${character.classTier ?? 1}`} theme={theme} />
        <InfoRow label="Nível da classe" value={`Lv. ${character.classLevel}/100`} theme={theme} />
        <ProgressBar label="Progresso da classe" percent={(classProgress / 100) * 100} theme={theme} />
        <InfoRow label="Status" value={eliteLabel} theme={theme} />
      </div>
    </aside>
  );
}

function InfoRow({ label, value, theme }: { label: string; value: string; theme: string }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl border px-3 py-2 ${
      theme === "dark-fantasy" || theme === "royal-medieval"
        ? "border-amber-200/10 bg-white/5 text-amber-200/80"
        : "border-pink-200/20 bg-pink-100/30 text-pink-700"
    }`}>
      <span className={
        theme === "dark-fantasy" || theme === "royal-medieval"
          ? "text-amber-200/80"
          : "text-pink-600"
      }>{label}</span>
      <span className={`font-semibold ${
        theme === "dark-fantasy" || theme === "royal-medieval"
          ? "text-amber-50"
          : "text-pink-800"
      }`}>{value}</span>
    </div>
  );
}

function ProgressBar({ label, percent, theme }: { label: string; percent: number; theme: string }) {
  const width = `${Math.min(100, Math.max(0, percent)).toFixed(1)}%`;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className={
          theme === "dark-fantasy" || theme === "royal-medieval"
            ? "text-amber-200/80"
            : "text-pink-600"
        }>{label}</span>
        <span className={
          theme === "dark-fantasy" || theme === "royal-medieval"
            ? "text-amber-200/80"
            : "text-pink-600"
        }>{width}</span>
      </div>
      <div className={`h-2 w-full rounded-full ${
        theme === "dark-fantasy" || theme === "royal-medieval"
          ? "bg-white/10"
          : "bg-pink-100/50"
      }`}>
        <div className={`h-2 rounded-full transition-all duration-300 ${
          theme === "dark-fantasy" || theme === "royal-medieval"
            ? "bg-gradient-to-r from-amber-400 to-amber-600"
            : "bg-gradient-to-r from-pink-400 to-purple-500"
        }`} style={{ width }} />
      </div>
    </div>
  );
}
