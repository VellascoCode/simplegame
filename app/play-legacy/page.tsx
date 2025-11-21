"use client";

export const runtime = "nodejs";
export const preferredRegion = "home";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import type { Character, InventoryItem } from "@/lib/models";
import type { BestiaryEntry } from "@/models/Bestiary";

import { BottomMenu } from "@/components/BottomMenu";
import { useChatFeed } from "@/components/ChatPanel";
import { InventoryPanel } from "@/components/InventoryPanel";
import { OnlineBadge } from "@/components/OnlineBadge";
import { PixiGame } from "@/components/PixiGame";
import { useXp } from "@/hooks/useXp";
import { getJSON, postJSON } from "@/lib/clientApi";
import { xpForLevel } from "@/lib/progression";

type SessionState = {
  ownerId: string;
  characterId: string;
  map: string;
  position: { x: number; y: number };
};

type CombatEvent = {
  id: string;
  message: string;
  tone: "damage" | "xp";
  createdAt: number;
};

const BESTIARY_TIER_LABELS = ["Comum", "Incomum", "Raro", "Épico", "Lendário", "Mítico"] as const;

const MAP_ONLY_MODE = true;

const playNavLinks = [
  {
    id: "world",
    label: "Mapa atual",
    description: "Escolha cidade/casa/fazenda",
    icon: "/icons/viewmap.png"
  },
  {
    id: "market",
    label: "Player Market",
    description: "Loja entre jogadores",
    icon: "/icons/playermarket.png"
  },
  {
    id: "achievements",
    label: "Arquivamentos",
    description: "Coleção de títulos e marcos",
    icon: "/icons/achievements.png"
  }
] as const;

export default function CityPage() {
  const router = useRouter();
  const { status } = useSession();
  const [sessionState, setSessionState] = useState<SessionState | null>(null);
  const [characterInfo, setCharacterInfo] = useState<Character | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [hudEffect, setHudEffect] = useState<{ type: "mana" | "vida"; id: number } | null>(null);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [craftingOpen, setCraftingOpen] = useState(false);
  const [equipOpen, setEquipOpen] = useState(false);
  const [bestiaryOpen, setBestiaryOpen] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number } | null>(null);
  const [inventoryVersion, setInventoryVersion] = useState(0);
  const [combatLog, setCombatLog] = useState<CombatEvent[]>([]);
  const [gameReady, setGameReady] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bestiaryEntries, setBestiaryEntries] = useState<BestiaryEntry[]>([]);
  const [pixiBootReady, setPixiBootReady] = useState(false);
  const mapOnlyMode = MAP_ONLY_MODE;

  const ownerId = sessionState?.ownerId ?? "";
  const characterId = sessionState?.characterId ?? "";

  const loadBestiaryProfile = useCallback(
    async (currentOwnerId: string, currentCharacterId: string) => {
      try {
        const table = await getJSON<BestiaryEntry[]>(
          `/api/bestiary/get?ownerId=${currentOwnerId}&characterId=${currentCharacterId}`
        );
        setBestiaryEntries(table);
      } catch {
        setBestiaryEntries([]);
      }
    },
    []
  );

  const loadSelectedCharacter = useCallback(async (currentOwnerId: string, currentCharacterId: string) => {
    if (!currentOwnerId || !currentCharacterId) {
      setCharacterInfo(null);
      setBestiaryEntries([]);
      return;
    }
    try {
      const data = await getJSON<Character>(
        `/api/character/get?ownerId=${currentOwnerId}&characterId=${currentCharacterId}`
      );
      setCharacterInfo({
        ...data,
        gold: data.gold ?? 0
      });
      await loadBestiaryProfile(currentOwnerId, currentCharacterId);
    } catch (err) {
      setCharacterInfo(null);
      setBestiaryEntries([]);
      setFeedback(getMessage(err));
    }
  }, [loadBestiaryProfile]);

  const loadSession = useCallback(async () => {
    setLoadingSession(true);
    setFeedback(null);
    try {
      const session = await getJSON<SessionState>("/api/session/state");
      setSessionState(session);
      setPlayerPosition(session.position);
      await loadSelectedCharacter(session.ownerId, session.characterId);
    } catch (err) {
      setSessionState(null);
      setCharacterInfo(null);
      setFeedback(getMessage(err));
    } finally {
      setLoadingSession(false);
    }
  }, [loadSelectedCharacter]);

  useEffect(() => {
    if (status === "authenticated") {
      void loadSession();
    } else if (status === "unauthenticated") {
      setSessionState(null);
      setCharacterInfo(null);
      setLoadingSession(false);
      router.replace("/");
    }
  }, [status, loadSession, router]);

  useEffect(() => {
    if (!ownerId || !characterId) {
      setGameReady(false);
      setPixiBootReady(false);
    }
  }, [ownerId, characterId]);

  useEffect(() => {
    if (!ownerId || !characterId) {
      setPixiBootReady(false);
      return;
    }
    setPixiBootReady(false);
    const id = window.setTimeout(() => setPixiBootReady(true), 250);
    return () => window.clearTimeout(id);
  }, [ownerId, characterId]);

  useEffect(() => {
    if (!hudEffect) return;
    const timeout = window.setTimeout(() => setHudEffect(null), 1200);
    return () => window.clearTimeout(timeout);
  }, [hudEffect]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCombatLog((current) => current.filter((entry) => Date.now() - entry.createdAt < 5000));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  function handleItemUsed(itemId: string) {
    if (itemId === "item1") {
      setHudEffect({ type: "mana", id: Date.now() });
    } else if (itemId === "item10") {
      setHudEffect({ type: "vida", id: Date.now() });
    }
  }

  const goHome = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lastRoute", "/");
      window.dispatchEvent(new CustomEvent("lastRouteChange", { detail: "/" }));
    }
    router.replace("/");
  };

  function handleLeavePlay() {
    setGameReady(false);
    setCombatLog([]);
    goHome();
  }

  async function handleFullLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    await signOut({ redirect: false });
    goHome();
  }

  const actionButtons = [
    {
      id: "inventory",
      label: "INV",
      icon: "/icons/inv.png",
      ariaLabel: "Abrir inventário",
      onClick: () => setInventoryOpen(true)
    },
    {
      id: "crafting",
      label: "CRFT",
      icon: "/icons/crafting.png",
      ariaLabel: "Abrir livro de crafting",
      onClick: () => setCraftingOpen(true)
    },
    {
      id: "minimap",
      label: "MAP",
      icon: "/icons/viewmap.png",
      ariaLabel: "Alternar mini mapa",
      onClick: () => setShowMiniMap((previous) => !previous),
      active: showMiniMap
    },
    {
      id: "chat",
      label: "CHAT",
      icon: "/icons/chat.png",
      ariaLabel: "Abrir chat",
      onClick: () => setChatOpen(true)
    },
    {
      id: "bestiary",
      label: "📜",
      ariaLabel: "Abrir bestiário",
      onClick: () => setBestiaryOpen(true)
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
      id: "logout",
      label: "OUT",
      icon: "/icons/logout.png",
      ariaLabel: "Sair do jogo",
      onClick: handleLeavePlay
    }
  ] as const;

  function notifyInventoryChange() {
    setInventoryVersion((previous) => previous + 1);
  }

  const toggleSound = () => setSoundEnabled((previous) => !previous);

  if (status === "loading" || loadingSession) {
    return (
      <section>
        <p>Carregando sessão…</p>
      </section>
    );
  }

  return (
    <>
      {ownerId && !mapOnlyMode && <PlayTopNav links={playNavLinks} />}
      <section className={`city-shell ${ownerId ? "pt-12" : ""}`}>
        <div className="map-layout">
          <div className="map-stage">
          {ownerId && characterId ? (
            pixiBootReady ? (
              <PixiGame onReadyChange={setGameReady} />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[28px] bg-black/70 text-amber-100">
                Preparando o motor PIXI…
              </div>
            )
          ) : (
            <p>Faça login e selecione um personagem para carregar o mapa.</p>
          )}
          {!gameReady && ownerId && characterId && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-md bg-black/60">
              <div className="h-20 w-20 animate-pulse rounded-full border-4 border-amber-200/60" />
            </div>
          )}
          {!mapOnlyMode && characterInfo && <CityHud stats={characterInfo.stats} />}
          {!mapOnlyMode && ownerId && <TopCenterSlots onOpenEquipment={() => setEquipOpen(true)} />}
          {!mapOnlyMode && ownerId && (
            <QuickSlots
              ownerId={ownerId}
              characterId={characterId}
              goldAmount={characterInfo?.gold ?? 0}
              refreshKey={inventoryVersion}
              onItemUsed={handleItemUsed}
              onInventoryChange={notifyInventoryChange}
            />
          )}
          {!mapOnlyMode && ownerId && (
            <>
              <OnlineBadge enabled={Boolean(ownerId && characterId)} />
              <SoundToggleButton enabled={soundEnabled} onToggle={toggleSound} />
            </>
          )}
          {!mapOnlyMode && ownerId && <BottomMenu variant="overlay" buttons={actionButtons} square />}
          {!mapOnlyMode && (
            <MiniMapOverlay
              visible={Boolean(ownerId && showMiniMap)}
              position={playerPosition ?? sessionState?.position}
            />
          )}
        </div>
      </div>
      {!mapOnlyMode && hudEffect && (
        <div className={`potion-effect ${hudEffect.type}`}>
          {hudEffect.type === "mana" ? "+ Mana" : "+ Vida"}
        </div>
      )}
      {feedback && (
        <div className="card">
          <p>{feedback}</p>
        </div>
      )}
      {!mapOnlyMode && (
        <>
          <InventoryDrawer
            open={inventoryOpen}
            onClose={() => setInventoryOpen(false)}
            ownerId={ownerId}
            characterId={characterId}
            onItemUsed={handleItemUsed}
            onInventoryChange={notifyInventoryChange}
          />
          <BestiaryDrawer
            open={bestiaryOpen}
            onClose={() => setBestiaryOpen(false)}
            entries={bestiaryEntries}
          />
          <ChatDrawer
            open={chatOpen}
            onClose={() => setChatOpen(false)}
            ownerId={ownerId}
            characterName={characterInfo?.name}
            combatLog={combatLog}
          />
          <PanelDrawer
            title="Minha conta"
            open={accountOpen}
            onClose={() => setAccountOpen(false)}
            content={
              characterInfo ? (
                <div className="panel-section">
                  <p>Owner ID: {characterInfo.ownerId}</p>
                  <p>Personagem ativo: {characterInfo.name}</p>
                  <p>Nível: {characterInfo.stats.level}</p>
                  <button
                    type="button"
                    className="button mt-4"
                    onClick={() => {
                      void handleFullLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <p>Nenhum personagem carregado.</p>
              )
            }
          />
          <PanelDrawer
            title="Configurações"
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            content={<p>Configurações gerais do jogo serão adicionadas aqui.</p>}
          />
          <CraftingDrawer open={craftingOpen} onClose={() => setCraftingOpen(false)} />
          <EquipmentDrawer open={equipOpen} onClose={() => setEquipOpen(false)} />
        </>
      )}
    </section>
    </>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao carregar personagem";
}

function CityHud({ stats }: { stats: Character["stats"] }) {
  const levelFloor = xpForLevel(stats.level);
  const nextLevelTarget = xpForLevel(stats.level + 1);
  const xpCurrent = Math.max(0, stats.xp - levelFloor);
  const xpNeeded = Math.max(1, nextLevelTarget - levelFloor);
  const bars = [
    { key: "hp", label: "HP", value: stats.hp, max: 100, display: `${stats.hp}` },
    { key: "energy", label: "ENERGIA", value: stats.energy, max: 100, display: `${stats.energy}` },
    {
      key: "xp",
      label: `XP LV.${stats.level}`,
      value: xpCurrent,
      max: xpNeeded,
      display: `${xpCurrent}/${xpNeeded}`
    }
  ];
  const gradientMap: Record<string, string> = {
    hp: "from-red-300 to-red-500",
    energy: "from-yellow-200 to-yellow-500",
    xp: "from-indigo-300 to-indigo-500"
  };

  return (
    <div className="pointer-events-none absolute top-3 left-3 flex w-[190px] flex-col gap-2 rounded-sm border border-white/10 bg-black/70 p-4 text-amber-50 shadow-black shadow-2xl">
      <div className="space-y-2">
        {bars.map((bar) => {
          const percentage = Math.min(100, (bar.value / bar.max) * 100);
          return (
            <div key={bar.key} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-amber-100/70">
                <span>{bar.label}</span>
                <span>{bar.display}</span>
              </div>
              <div className="h-3 rounded-full bg-black/40">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${gradientMap[bar.key] ?? "from-amber-200 to-amber-500"}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SoundToggleButton({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="pointer-events-auto absolute top-6 right-32 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 shadow"
      onClick={onToggle}
    >
      <span>{enabled ? "🔊" : "🔇"}</span>
      <span>Som</span>
    </button>
  );
}

function PlayTopNav({ links }: { links: typeof playNavLinks }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-black/85 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-8 px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src="/weapons/club/200.png"
            alt="Mystic Tales"
            width={56}
            height={56}
            className="h-14 w-14 rounded-sm border border-white/15 bg-black/40 p-1"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-100">
              Mystic Tales
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200/70">
              Cidade Multiplayer Alpha
            </p>
          </div>
        </div>
        <nav className="flex flex-1 flex-wrap items-center justify-start gap-2" aria-label="Menu do jogo">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-left text-amber-100 transition hover:bg-white/10"
            >
              <Image src={link.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              <div>
                <p className="text-xs font-semibold leading-tight">{link.label}</p>
                <p className="text-[9px] uppercase tracking-[0.18em] text-amber-100/70">
                  {link.description}
                </p>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

type QuickSlotsProps = {
  ownerId: string;
  refreshKey: number;
  characterId?: string;
  goldAmount?: number;
  onItemUsed?: (itemId: string) => void;
  onInventoryChange?: () => void;
};

function QuickSlots({
  ownerId,
  characterId,
  refreshKey,
  goldAmount,
  onItemUsed,
  onInventoryChange
}: QuickSlotsProps) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [slotRefs, setSlotRefs] = useState<Array<string | null>>([null, null, null, null]);
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
  const { grantXp } = useXp(ownerId, characterId);
  const iconMap: Record<string, string> = {
    item1: "/itens/item1.png",
    item10: "/itens/item10.png",
    item30: "/itens/item30.png",
    item31: "/itens/item31.png"
  };
  const consumableXp: Record<string, number> = {
    item30: 25,
    item31: 60
  };

  useEffect(() => {
    if (!ownerId) {
      setItems([]);
      setSlotRefs([null, null, null, null]);
      return;
    }

    const loadInventory = async () => {
      try {
        const response = await getJSON<InventoryItem[]>(`/api/inventory/get?ownerId=${ownerId}`);
        setItems(response);
        pruneSlots(response);
      } catch {
        setItems([]);
      }
    };

    const loadSlotRefs = async () => {
      try {
        const response = await getJSON<{ slots: Array<string | null> }>("/api/quickslots");
        setSlotRefs(response.slots);
      } catch {
        setSlotRefs([null, null, null, null]);
      }
    };

    void loadInventory();
    void loadSlotRefs();
  }, [ownerId, refreshKey]);

  const resolvedSlots = useMemo(
    () => slotRefs.map((ref) => (ref ? items.find((item) => item.id === ref) ?? null : null)),
    [slotRefs, items]
  );

  async function consumeSlot(index: number) {
    if (!ownerId) return;
    const slot = resolvedSlots[index];
    if (!slot) {
      setPickerSlot(index);
      return;
    }
    try {
      const updated = await postJSON<InventoryItem[]>("/api/inventory/remove", {
        ownerId,
        itemId: slot.id,
        quantity: 1
      });
      setItems(updated);
      pruneSlots(updated);
      onItemUsed?.(slot.id);
      onInventoryChange?.();
      const xpAmount = consumableXp[slot.id];
      if (xpAmount) {
        await grantXp(xpAmount);
      }
    } catch {
      // ignore errors
    }
  }

  async function assignSlot(item: InventoryItem, index: number) {
    if (!ownerId) return;
    const nextRefs = slotRefs.map((ref, slotIndex) => (slotIndex === index ? item.id : ref));
    setSlotRefs(nextRefs);
    setPickerSlot(null);
    try {
      await postJSON("/api/quickslots", { slots: nextRefs });
    } catch {
      // ignore
    }
  }

  function pruneSlots(reference: InventoryItem[]) {
    setSlotRefs((previous) => {
      let changed = false;
      const next = previous.map((ref) => {
        if (!ref) return null;
        const exists = reference.some((item) => item.id === ref && item.quantity > 0);
        if (!exists) {
          changed = true;
          return null;
        }
        return ref;
      });
      if (changed) {
        void postJSON("/api/quickslots", { slots: next }).catch(() => undefined);
        return next;
      }
      return previous;
    });
  }

  const availableItems = useMemo(
    () => items.filter((item) => item.quantity > 0),
    [items]
  );

  const quickSlots = [0, 1, 2, 3].map((slotIndex) => resolvedSlots[slotIndex] ?? null);

  if (!ownerId) {
    return null;
  }

  return (
    <div className="pointer-events-auto absolute right-2 top-20 flex flex-col items-end gap-4 sm:right-4 md:top-24">
      <div className="relative rounded-[28px] border border-white/10 bg-black/70 p-2 shadow-xl">
        <div className="flex flex-col gap-2">
          {quickSlots.map((slot, index) => {
            const icon = slot ? iconMap[slot.id] : undefined;
            return (
              <button
                key={index}
                type="button"
                className={`relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-lg text-amber-100 transition hover:border-amber-200 ${slot ? "shadow-lg" : ""}`}
                onClick={() => {
                  void consumeSlot(index);
                }}
              >
                <span className="absolute left-1 top-1 text-[10px] text-amber-200">{index + 1}</span>
                {slot && icon ? (
                  <Image src={icon} alt={slot.name} width={28} height={28} className="h-7 w-7 object-contain" />
                ) : (
                  <span>•</span>
                )}
                {slot && (
                  <span className="absolute bottom-1 right-1 rounded-full bg-black/70 px-2 text-xs">
                      {slot.quantity}
                    </span>
                  )}
                </button>
              );
            })}
        </div>
          {pickerSlot !== null && (
            <div className="absolute right-[calc(100%+12px)] top-1/2 w-48 -translate-y-1/2 rounded-2xl border border-white/15 bg-black/90 p-3 text-sm shadow-2xl">
              <p className="font-semibold text-amber-100">Escolha o item para o slot {pickerSlot + 1}</p>
              <div className="mt-3 flex flex-col gap-2">
                {availableItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-left text-amber-100 hover:border-amber-200"
                    onClick={() => {
                      void assignSlot(item, pickerSlot);
                    }}
                  >
                    {item.name} ({item.quantity})
                  </button>
                ))}
                {availableItems.length === 0 && <span>Sem itens disponíveis.</span>}
              </div>
              <button
                type="button"
                className="mt-3 w-full rounded-xl bg-gradient-to-r from-amber-200/80 to-amber-500/80 py-1.5 text-xs font-semibold text-stone-900"
                onClick={() => setPickerSlot(null)}
              >
                Fechar
              </button>
            </div>
        )}
      </div>
      {typeof goldAmount === "number" && (
        <div className="rounded-[20px] border border-yellow-200/40 bg-black/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 shadow-xl">
          <span className="mr-2">🪙</span>
          <span>{goldAmount}</span>
        </div>
      )}
    </div>
  );
}

type TopCenterSlotsProps = {
  onOpenEquipment?: () => void;
};

function TopCenterSlots({ onOpenEquipment }: TopCenterSlotsProps) {
  const slots = [
    { id: "necklace", label: "Cordão", hint: "CD", type: "equipment" },
    { id: "ring", label: "Anel", hint: "AN", type: "equipment" },
    { id: "weapon", label: "Arma", hint: "WP", type: "equipment" },
    { id: "skill-primary", label: "Skill 1", hint: "S1", type: "skill" },
    { id: "skill-secondary", label: "Skill 2", hint: "S2", type: "skill" },
    { id: "skill-ultimate", label: "Skill 3", hint: "S3", type: "skill" },
    { id: "skill-extra", label: "Skill 4", hint: "S4", type: "skill" }
  ] as const;
  const backgroundMap: Record<string, string> = {
    necklace: "/icons/neck.png",
    ring: "/icons/ring.png",
    weapon: "/icons/weapon.png"
  };

  return (
    <div className="pointer-events-none absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center gap-2 rounded-[36px] border border-white/10 bg-black/70 px-4 py-2 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
      {slots.map((slot) => {
        const isEquipment = slot.type === "equipment";
        const background = backgroundMap[slot.id];
        return (
          <button
            key={slot.id}
            type="button"
            onClick={isEquipment ? onOpenEquipment : undefined}
            className={`pointer-events-auto flex h-12 w-12 flex-col items-center justify-center rounded-2xl border text-xs font-semibold uppercase tracking-[0.3em] text-amber-100 transition ${
              isEquipment
                ? "border-amber-200/30 bg-black/60 hover:border-amber-200"
                : "border-white/15 bg-black/50 hover:border-amber-200"
            }`}
            style={
              background
                ? {
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }
                : undefined
            }
            aria-label={slot.label}
          >
            {!isEquipment && <span className="text-base">{slot.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
};

function Drawer({ open, onClose, children, title }: DrawerProps) {
  return (
    <div className={`city-drawer ${open ? "open" : ""}`} onClick={onClose}>
      <div className="city-drawer-card" onClick={(event) => event.stopPropagation()}>
        <header>
          <h3>{title}</h3>
          <button type="button" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="city-drawer-content">{children}</div>
      </div>
    </div>
  );
}

function InventoryDrawer({
  open,
  onClose,
  ownerId,
  characterId,
  onItemUsed,
  onInventoryChange
}: {
  open: boolean;
  onClose: () => void;
  ownerId: string;
  characterId?: string;
  onItemUsed?: (itemId: string) => void;
  onInventoryChange?: () => void;
}) {
  if (!ownerId) return null;
  return (
    <Drawer open={open} onClose={onClose} title="Inventário">
      <InventoryPanel
        ownerId={ownerId}
        characterId={characterId}
        onItemUsed={onItemUsed}
        onItemsChange={() => onInventoryChange?.()}
      />
    </Drawer>
  );
}

const MONSTER_NAMES = new Map<number, string>([[0, "Lanceiro"]]);

function BestiaryDrawer({
  open,
  onClose,
  entries
}: {
  open: boolean;
  onClose: () => void;
  entries: BestiaryEntry[];
}) {
  if (!entries || entries.length === 0) {
    return (
      <Drawer open={open} onClose={onClose} title="Bestiário">
        <p>Derrote monstros para registrar no bestiário.</p>
      </Drawer>
    );
  }
  const sorted = [...entries].sort((a, b) => b.kills - a.kills);
  const totalKills = sorted.reduce((sum, entry) => sum + entry.kills, 0);
  const uniqueKills = sorted.length;
  const topEnemy = sorted[0];
  return (
    <Drawer open={open} onClose={onClose} title="Bestiário">
      <div className="mb-4 grid grid-cols-3 gap-2 text-center text-xs uppercase tracking-[0.2em] text-amber-100/80">
        <div className="rounded-2xl border border-white/10 bg-black/40 px-2 py-3">
          <p>Total</p>
          <p className="text-2xl font-bold text-amber-200">{totalKills}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 px-2 py-3">
          <p>Espécies</p>
          <p className="text-2xl font-bold text-amber-200">{uniqueKills}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 px-2 py-3">
          <p>Top</p>
          <p className="text-sm font-bold text-amber-200">
            {topEnemy ? MONSTER_NAMES.get(topEnemy.monsterId) ?? `${topEnemy.monsterId}` : "-"}
          </p>
        </div>
      </div>
      <ul className="space-y-2 text-sm text-amber-100">
        {sorted.map((entry) => (
          <li key={entry.monsterId} className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-amber-100/70">
              <span>{MONSTER_NAMES.get(entry.monsterId) ?? `${entry.monsterId}`}</span>
              <span>{totalKills > 0 ? ((entry.kills / totalKills) * 100).toFixed(1) : "0.0"}%</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-amber-200">
              <span>Abates</span>
              <span>x{entry.kills}</span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-white/10">
              <div
                className="h-1 rounded-full bg-amber-300"
                style={{
                  width: `${totalKills > 0 ? Math.min(100, (entry.kills / totalKills) * 100) : 0}%`
                }}
              />
            </div>
            <div className="mt-1 inline-flex rounded-full border border-amber-200/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-amber-200/90">
              {BESTIARY_TIER_LABELS[entry.tier] ?? BESTIARY_TIER_LABELS[0]}
            </div>
          </li>
        ))}
      </ul>
    </Drawer>
  );
}

function EquipmentDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const slots = [
    { id: "head", label: "Cabeça", icon: "/icons/head.png" },
    { id: "necklace", label: "Cordão", icon: "/icons/neck.png" },
    { id: "ring", label: "Anel", icon: "/icons/ring.png" },
    { id: "armor", label: "Armadura", icon: "/icons/body.png" },
    { id: "weapon", label: "Arma", icon: "/icons/weapon.png" },
    { id: "shield", label: "Escudo", icon: "/icons/scroll.png" },
    { id: "pants", label: "Calça", icon: "/icons/body.png" },
    { id: "boots", label: "Bota", icon: "/icons/body.png" }
  ];
  return (
    <Drawer open={open} onClose={onClose} title="Equipamentos">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex h-20 flex-col items-center justify-center rounded-2xl border border-white/15 bg-black/40 text-amber-100"
              style={
                slot.icon
                  ? {
                      backgroundImage: `url(${slot.icon})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0.85
                    }
                  : undefined
              }
            >
              <p className="rounded-full bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-amber-100">
                {slot.label}
              </p>
            </div>
          ))}
        </div>
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-100/70">Buffs &amp; Debuffs</p>
          <div className="mt-2 rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-amber-100/80">
            Nenhum efeito ativo.
          </div>
        </section>
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-100/70">Atributos</p>
          <ul className="mt-2 space-y-1 text-sm text-amber-100/80">
            <li>Força: 0</li>
            <li>Destreza: 0</li>
            <li>Inteligência: 0</li>
          </ul>
        </section>
      </div>
    </Drawer>
  );
}

function ChatDrawer({
  open,
  onClose,
  ownerId,
  characterName,
  combatLog
}: {
  open: boolean;
  onClose: () => void;
  ownerId?: string;
  characterName?: string;
  combatLog: CombatEvent[];
}) {
  const tabs = [
    { id: "global", label: "Global" },
    { id: "logs", label: "Logs" },
    { id: "guild", label: "Guild" }
  ] as const;
  type TabId = (typeof tabs)[number]["id"];
  const [activeTab, setActiveTab] = useState<TabId>("global");
  const effectiveOwnerId = ownerId ?? "";
  const { message, setMessage, messages, error, sendMessage } = useChatFeed(effectiveOwnerId, characterName, {
    enabled: open && Boolean(ownerId),
    intervalMs: 5000
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeTab !== "global") return;
    await sendMessage();
  }

  const disableInput = activeTab !== "global";
  const visibleMessages = messages.slice(-20);

  if (!ownerId) {
    return (
      <Drawer open={open} onClose={onClose} title="Chat">
        <p className="text-sm text-amber-100">Selecione um personagem para acessar o chat.</p>
      </Drawer>
    );
  }

  return (
    <Drawer open={open} onClose={onClose} title="Chat">
      <div className="flex h-[60vh] flex-col gap-4 text-amber-50">
        <div className="flex rounded-full border border-white/10 bg-black/50 p-1 text-sm font-semibold uppercase tracking-[0.3em]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`flex-1 rounded-full px-3 py-2 transition ${
                activeTab === tab.id ? "bg-amber-200 text-stone-900" : "text-amber-100/70"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto rounded-[28px] border border-white/10 bg-black/50 p-4">
          {activeTab === "global" && (
            <div className="flex flex-col gap-2 text-sm">
              {error && <span className="text-red-300">{error}</span>}
              {visibleMessages.length === 0 && (
                <span className="text-amber-100/70">Sem mensagens recentes.</span>
              )}
              {visibleMessages.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-white/10 bg-black/60 px-3 py-2 text-amber-100"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
                    {entry.characterName ?? entry.ownerId}
                    <span className="ml-2 text-[10px] text-amber-100/50">
                      {new Date(entry.createdAt).toLocaleTimeString()}
                    </span>
                  </p>
                  <p className="mt-1 text-base">{entry.message}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "logs" && (
            <div className="flex flex-col gap-2 text-xs text-amber-100">
              {combatLog.length === 0 && <span className="text-amber-100/60">Sem eventos recentes.</span>}
              {combatLog.slice(-20).map((entry) => (
                <div
                  key={entry.id}
                  className={`rounded-xl border px-3 py-1 font-semibold ${
                    entry.tone === "xp"
                      ? "border-green-200/40 text-green-200"
                      : "border-red-200/40 text-red-200"
                  }`}
                >
                  {entry.message}
                </div>
              ))}
            </div>
          )}
          {activeTab === "guild" && (
            <div className="text-sm text-amber-100/70">Chat de guilda em breve.</div>
          )}
        </div>
        <form
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
          className="flex flex-col gap-2 rounded-[28px] border border-white/10 bg-black/60 p-4"
        >
          <label htmlFor="drawer-chat-message" className="text-xs uppercase tracking-[0.3em] text-amber-100/70">
            Mensagem
          </label>
          <textarea
            id="drawer-chat-message"
            className="min-h-[90px] rounded-2xl border border-white/10 bg-black/40 p-3 text-sm text-amber-50 outline-none focus:border-amber-200"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={280}
            placeholder={disableInput ? "Selecione a aba Global para enviar mensagens." : "Digite sua mensagem"}
            disabled={disableInput}
          />
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-amber-200 to-amber-500 py-2 text-center text-sm font-bold uppercase tracking-[0.4em] text-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={disableInput || message.trim().length === 0}
          >
            Enviar
          </button>
        </form>
      </div>
    </Drawer>
  );
}

function PanelDrawer({
  title,
  open,
  onClose,
  content
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  content: ReactNode;
}) {
  return (
    <Drawer open={open} onClose={onClose} title={title}>
      {content}
    </Drawer>
  );
}

function MiniMapOverlay({
  visible,
  position
}: {
  visible: boolean;
  position?: { x: number; y: number } | null;
}) {
  if (!visible) return null;
  const MAP_WIDTH = 3200;
  const MAP_HEIGHT = 2400;
  const xPercent = Math.max(0, Math.min(100, ((position?.x ?? MAP_WIDTH / 2) / MAP_WIDTH) * 100));
  const yPercent = Math.max(0, Math.min(100, ((position?.y ?? MAP_HEIGHT / 2) / MAP_HEIGHT) * 100));
  return (
    <div className="pointer-events-none absolute bottom-28 left-4 z-30 flex w-40 flex-col gap-1 rounded-3xl border border-white/10 bg-black/70 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
      <span className="text-[10px] uppercase tracking-[0.4em] text-amber-100/70">Mini mapa</span>
      <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:12px_12px]">
        <div
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(255,231,186,0.7)]"
          style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
        />
      </div>
    </div>
  );
}

const craftingRecipes = [
  {
    id: "life",
    name: "Poção de Vida",
    result: "+50 HP",
    ingredients: "3x Ervas Rubras + 1x Água pura"
  },
  {
    id: "mana",
    name: "Poção de Mana",
    result: "+40 Mana",
    ingredients: "3x Ervas Azuis + 1x Cristal"
  },
  {
    id: "buff",
    name: "Tônico de Batalha",
    result: "+5 ATK por 60s",
    ingredients: "1x Núcleo de Lanceiro + 2x Mel"
  }
] as const;

function CraftingDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} title="Livro de crafting">
      <div className="panel-section">
        {craftingRecipes.map((recipe) => (
          <article key={recipe.id}>
            <strong>{recipe.name}</strong>
            <p>Resultado: {recipe.result}</p>
            <p>Ingredientes: {recipe.ingredients}</p>
          </article>
        ))}
      </div>
    </Drawer>
  );
}
