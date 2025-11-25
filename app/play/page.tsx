"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import type { Character, Skill } from "@/lib/models";

import { FloatingHudMenu, type FloatingMenuButton } from "@/components/FloatingHudMenu";
import { type EntityListSnapshot, PixiGame } from "@/components/PixiGame";
import { QuickActionMenu } from "@/components/QuickActionMenu";
import { SlidingPanelCharacter } from "@/components/SlidingPanelCharacter";
import { SlidingPanelSkills } from "@/components/SlidingPanelSkills";
import { getJSON } from "@/lib/clientApi";

export const runtime = "nodejs";
export const preferredRegion = "home";

type SessionStateResponse = {
  ownerId: string;
  characterId: string;
};

export default function PlayPixiOnlyPage() {
  const [ready, setReady] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [bestiaryOpen, setBestiaryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [minimapVisible, setMinimapVisible] = useState(false);
  const [mapListOpen, setMapListOpen] = useState(false);
  const [hudMenuOpen, setHudMenuOpen] = useState(true);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [characterPanelOpen, setCharacterPanelOpen] = useState(false);
  const [skillsPanelOpen, setSkillsPanelOpen] = useState(false);
  const [entitySnapshot, setEntitySnapshot] = useState<EntityListSnapshot>({ monsters: [], npcs: [] });
  const [characterProfile, setCharacterProfile] = useState<Character | null>(null);
  const [skillsProfile, setSkillsProfile] = useState<Skill[]>([]);

  const fetchCharacterProfile = useCallback(async () => {
    try {
      const session = await getJSON<SessionStateResponse>("/api/session/state");
      if (!session.ownerId) return;
      let characterData: Character | null = null;
      if (session.characterId) {
        characterData = await getJSON<Character>(
          `/api/character/get?ownerId=${session.ownerId}&characterId=${session.characterId}`
        );
      } else {
        const list = await getJSON<{ characters: Character[] }>(`/api/character/get?ownerId=${session.ownerId}`);
        characterData = list.characters?.[0] ?? null;
      }
      setCharacterProfile(characterData);
      setSkillsProfile(characterData?.skills ?? []);
    } catch (err) {
      console.warn("Falha ao carregar personagem/skills", err);
    }
  }, []);

  useEffect(() => {
    void fetchCharacterProfile();
  }, [fetchCharacterProfile]);

  const overlayButtons: ReadonlyArray<FloatingMenuButton> = useMemo(
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
        id: "classpanel",
        label: "CLS",
        icon: "/icons/achievements.png",
        ariaLabel: "Classe e progresso",
        onClick: () => {
          void fetchCharacterProfile();
          setCharacterPanelOpen(true);
        }
      },
      {
        id: "skillspanel",
        label: "SKL",
        icon: "/icons/achievements.png",
        ariaLabel: "Skills",
        onClick: () => {
          void fetchCharacterProfile();
          setSkillsPanelOpen(true);
        }
      },
      {
        id: "maplist",
        label: "LIST",
        icon: "/icons/viewmap.png",
        ariaLabel: "Alternar lista do mapa",
        onClick: () => setMapListOpen((previous) => !previous),
        active: mapListOpen
      },
      {
        id: "quickmenu",
        label: "QK",
        ariaLabel: "Alternar menu rápido",
        onClick: () => setQuickMenuOpen((previous) => !previous),
        active: quickMenuOpen
      }
    ],
    [fetchCharacterProfile, minimapVisible, mapListOpen, quickMenuOpen]
  );

  return (
    <section className="city-shell min-h-screen bg-[#05070c]">
      <div className="map-layout mx-auto w-full overflow-hidden px-0">
        <div className="map-stage relative h-full">
          <PixiGame
            onReadyChange={setReady}
            onEntityListChange={setEntitySnapshot}
            bottomOverlay={
              <QuickActionMenu open={quickMenuOpen} />
            }
          />
          <FloatingHudMenu
            buttons={overlayButtons}
            menuOpen={hudMenuOpen}
            onToggleMenu={() => setHudMenuOpen((previous) => !previous)}
          />
          <SlidingPanelCharacter
            open={characterPanelOpen}
            character={characterProfile}
            onClose={() => setCharacterPanelOpen(false)}
          />
          <SlidingPanelSkills open={skillsPanelOpen} skills={skillsProfile} onClose={() => setSkillsPanelOpen(false)} />
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
      <div className="w-full rounded-3xl border border-white/15 bg-[#05070c]/95 p-6 shadow-2xl">
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
