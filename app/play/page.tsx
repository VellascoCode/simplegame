"use client";

import Image from "next/image";
import { type ReactNode, useMemo, useState } from "react";

import { BottomMenu } from "@/components/BottomMenu";
import { type EntityListSnapshot, PixiGame } from "@/components/PixiGame";

export const runtime = "nodejs";
export const preferredRegion = "home";

export default function PlayPixiOnlyPage() {
  const [ready, setReady] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [bestiaryOpen, setBestiaryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [minimapVisible, setMinimapVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapListOpen, setMapListOpen] = useState(false);
  const [entitySnapshot, setEntitySnapshot] = useState<EntityListSnapshot>({ monsters: [], npcs: [] });

  const overlayButtons = useMemo(
    () => [
      {
        id: "inventory",
        label: "INV",
        icon: "/icons/inv.png",
        ariaLabel: "Abrir inventário",
        onClick: () => setInventoryOpen(true)
      },
      {
        id: "bestiary",
        label: "BST",
        icon: "/icons/achievements.png",
        ariaLabel: "Abrir bestiário",
        onClick: () => setBestiaryOpen(true)
      },
      {
        id: "chat",
        label: "CHAT",
        icon: "/icons/chat.png",
        ariaLabel: "Abrir chat",
        onClick: () => setChatOpen(true)
      },
      {
        id: "minimap",
        label: "MAP",
        icon: "/icons/viewmap.png",
        ariaLabel: "Alternar mini mapa",
        onClick: () => setMinimapVisible((previous) => !previous),
        active: minimapVisible
      },
      {
        id: "account",
        label: "ACC",
        icon: "/icons/achievements.png",
        ariaLabel: "Minha conta",
        onClick: () => setAccountOpen(true)
      },
      {
        id: "settings",
        label: "CFG",
        ariaLabel: "Configurações",
        onClick: () => setSettingsOpen(true)
      },
      {
        id: "maplist",
        label: "LIST",
        icon: "/icons/viewmap.png",
        ariaLabel: "Alternar lista do mapa",
        onClick: () => setMapListOpen((previous) => !previous),
        active: mapListOpen
      }
    ],
    [minimapVisible, mapListOpen]
  );

  return (
    <section className="city-shell min-h-screen bg-[#05070c] pt-6">
      <div className="map-layout mx-auto h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] w-full max-w-[1280px] overflow-hidden px-4">
        <div className="map-stage relative h-full">
          <PixiGame
            onReadyChange={setReady}
            onEntityListChange={setEntitySnapshot}
            bottomOverlay={<BottomMenu square buttons={overlayButtons} />}
          />
          <FloatingMenu
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((prev) => !prev)}
            buttons={overlayButtons}
          />
          {mapListOpen && <MapListPanel snapshot={entitySnapshot} onClose={() => setMapListOpen(false)} />}
          {!ready && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[28px] bg-black/70 text-amber-100">
              Inicializando mapa PIXI…
            </div>
          )}
          {minimapVisible && (
            <div className="pointer-events-auto absolute left-6 top-6 z-10 rounded-2xl border border-white/20 bg-black/70 px-5 py-4 text-amber-100 shadow-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Mini mapa</p>
              <p className="text-sm text-amber-50">Visualização em construção.</p>
            </div>
          )}
          {inventoryOpen && (
            <OverlayPanel title="Inventário rápido" onClose={() => setInventoryOpen(false)}>
              <p className="text-sm text-amber-100/80">A versão PIXI ainda está conectando com o inventário. Use o menu clássico enquanto finalizamos.</p>
            </OverlayPanel>
          )}
          {chatOpen && (
            <OverlayPanel title="Chat global" onClose={() => setChatOpen(false)}>
              <p className="text-sm text-amber-100/80">Integração com o chat em tempo real chega nos próximos commits.</p>
            </OverlayPanel>
          )}
          {bestiaryOpen && (
            <OverlayPanel title="Bestiário" onClose={() => setBestiaryOpen(false)}>
              <p className="text-sm text-amber-100/80">Consulte o bestiário completo na área legacy enquanto migramos para o PIXI.</p>
            </OverlayPanel>
          )}
          {settingsOpen && (
            <OverlayPanel title="Configurações" onClose={() => setSettingsOpen(false)}>
              <p className="text-sm text-amber-100/80">Opções de áudio, HUD e qualidade gráfica ficarão disponíveis aqui.</p>
            </OverlayPanel>
          )}
          {accountOpen && (
            <OverlayPanel title="Conta e personagem" onClose={() => setAccountOpen(false)}>
              <p className="text-sm text-amber-100/80">Gerencie personagem, logout e troca de avatar usando este atalho em breve.</p>
            </OverlayPanel>
          )}
        </div>
      </div>
    </section>
  );
}

type OverlayPanelProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

function OverlayPanel({ title, onClose, children }: OverlayPanelProps) {
  return (
    <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#05070c]/95 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-amber-50">{title}</h3>
          <button type="button" className="rounded-full border border-white/20 px-3 py-1 text-sm text-amber-100 hover:bg-white/10" onClick={onClose}>
            Fechar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FloatingMenu({ menuOpen, onToggleMenu, buttons }: { menuOpen: boolean; onToggleMenu: () => void; buttons: ReadonlyArray<{ id: string; label: string; icon?: string; onClick?: () => void; active?: boolean; ariaLabel?: string }> }) {
  return (
    <div className="pointer-events-none absolute right-6 top-6 z-30 flex flex-col items-end gap-3">
      <button
        type="button"
        className="pointer-events-auto rounded-full border border-white/30 bg-black/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-100 shadow-lg shadow-black"
        onClick={onToggleMenu}
      >
          {menuOpen ? "Fechar Menu" : "Menu Rápido"}
      </button>
      <div
        className={`pointer-events-auto transition-all duration-300 ${
          menuOpen ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0"
        }`}
      >
        <div className="rounded-3xl border border-white/15 bg-[#05070c]/95 p-4 shadow-2xl shadow-black">
          <div className="grid grid-cols-2 gap-3">
            {buttons.map((button) => (
              <button
                key={button.id}
                type="button"
                onClick={() => button.onClick?.()}
                aria-label={button.ariaLabel ?? button.label}
                className={`flex h-12 items-center justify-center rounded-xl border border-orange-700 bg-gradient-to-b from-amber-200/80 to-amber-700/70 text-xs font-semibold uppercase tracking-[0.1em] text-stone-900 shadow-black shadow-lg ${
                  button.active ? "ring-2 ring-amber-300" : ""
                }`}
              >
                {button.icon ? <Image src={button.icon} alt="" className="h-6 w-6" width={24} height={24} /> : button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MapListPanel({ snapshot, onClose }: { snapshot: EntityListSnapshot; onClose: () => void }) {
  const toHex = (color: number) => `#${Math.max(0, color).toString(16).padStart(6, "0")}`;
  type NpcEntry = EntityListSnapshot["npcs"][number];
  type MonsterEntry = EntityListSnapshot["monsters"][number];
  type CombinedEntry =
    | (NpcEntry & { type: "NPC"; dangerColor: number; hpText: string; level?: number })
    | (MonsterEntry & { type: "Monstro" });

  const npcEntries: CombinedEntry[] = snapshot.npcs.map((entry) => ({
    ...entry,
    type: "NPC" as const,
    dangerColor: 0x6ee7b7,
    hpText: entry.hpText ?? "—",
    level: undefined
  }));
  const monsterEntries: CombinedEntry[] = snapshot.monsters.map((entry) => ({
    ...entry,
    type: "Monstro" as const
  }));
  const merged: CombinedEntry[] = [...npcEntries, ...monsterEntries];
  return (
    <div className="pointer-events-auto absolute right-6 top-32 z-20 w-80 max-h-[70vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#05070c]/95 p-4 shadow-2xl shadow-black">
      <div className="mb-3 flex items-center justify-between text-amber-100">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Mapa</p>
          <h3 className="text-lg font-semibold text-amber-50">NPCs e Monstros</h3>
        </div>
        <button type="button" onClick={onClose} className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase text-amber-100 hover:bg-white/10">
          Fechar
        </button>
      </div>
      <div className="space-y-3">
        {merged.map((entry) => {
          const borderColor = toHex(entry.dangerColor ?? 0xffffff);
          const classLabel = entry.type === "Monstro" ? entry.rarity ?? "M" : entry.type;
          const hpLabel = entry.hpText ? `HP ${entry.hpText}` : "HP —";
          const levelLabel =
            entry.type === "Monstro"
              ? typeof entry.level === "number" && entry.level > 0
                ? `Lv.${entry.level}`
                : "Lv.—"
              : "";
          return (
            <div key={`${entry.type}-${entry.id}`} className="rounded-2xl border bg-white/5 px-3 py-2 shadow-inner" style={{ borderColor }}>
              <div className="mb-1 grid grid-cols-[auto,1fr,auto] items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-amber-200">
                <span>{classLabel}</span>
                <p className="text-center text-base font-semibold tracking-normal text-white">{entry.name}</p>
                <span style={{ color: borderColor }}>{entry.danger}</span>
              </div>
              <p className="text-xs text-amber-300/80">
                {levelLabel ? `${levelLabel} | ${hpLabel}` : hpLabel}
              </p>
            </div>
          );
        })}
        {merged.length === 0 && <p className="text-center text-sm text-amber-100/70">Sem entidades visíveis.</p>}
      </div>
    </div>
  );
}
