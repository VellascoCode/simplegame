"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { CityPhaser } from "@/components/CityPhaser";
import { OnlinePanel } from "@/components/OnlinePanel";
import { OnlineBadge } from "@/components/OnlineBadge";
import { BottomMenu } from "@/components/BottomMenu";
import { InventoryPanel } from "@/components/InventoryPanel";
import { ChatPanel } from "@/components/ChatPanel";
import { getJSON, postJSON } from "@/lib/clientApi";
import type { Character, InventoryItem } from "@/lib/models";

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
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number } | null>(null);
  const [inventoryVersion, setInventoryVersion] = useState(0);
  const [combatLog, setCombatLog] = useState<CombatEvent[]>([]);
  const [gameReady, setGameReady] = useState(false);

  const ownerId = sessionState?.ownerId ?? "";
  const characterId = sessionState?.characterId ?? "";

  const loadSelectedCharacter = useCallback(async (currentOwnerId: string, currentCharacterId: string) => {
    if (!currentOwnerId || !currentCharacterId) {
      setCharacterInfo(null);
      return;
    }
    try {
      const data = await getJSON<Character>(
        `/api/character/get?ownerId=${currentOwnerId}&characterId=${currentCharacterId}`
      );
      setCharacterInfo(data);
    } catch (err) {
      setCharacterInfo(null);
      setFeedback(getMessage(err));
    }
  }, []);

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
    }
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

  async function handleLeavePlay() {
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

  const handlePositionChange = useCallback(
    (position: { x: number; y: number }) => {
      setPlayerPosition(position);
      void postJSON("/api/session/position", {
        x: position.x,
        y: position.y,
        map: sessionState?.map ?? "city"
      }).catch(() => undefined);
    },
    [sessionState?.map]
  );

  const handleCombatEvent = useCallback((event: { message: string; tone: "damage" | "xp" }) => {
    setCombatLog((current) => [
      ...current,
      { id: `${Date.now()}-${Math.random()}`, message: event.message, tone: event.tone, createdAt: Date.now() }
    ]);
  }, []);

  if (status === "loading" || loadingSession) {
    return (
      <section>
        <p>Carregando sessão…</p>
      </section>
    );
  }

  return (
    <section className="city-shell">
      {ownerId && (
        <nav
          className="mb-4 flex flex-wrap gap-3 rounded-[32px] border border-white/10 bg-black/70 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          aria-label="Menu do jogo"
        >
          {playNavLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-left text-amber-100 transition hover:bg-white/10"
            >
              <img src={link.icon} alt="" className="h-9 w-9 object-contain" />
              <div>
                <p className="text-sm font-semibold leading-tight">{link.label}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-amber-100/70">{link.description}</p>
              </div>
            </button>
          ))}
        </nav>
      )}
      <div className="map-layout">
        <div className="map-stage">
          {ownerId && characterId ? (
            <CityPhaser
              ownerId={ownerId}
              characterId={characterId}
              characterName={characterInfo?.name}
              characterLevel={characterInfo?.stats.level}
              initialPosition={sessionState?.position}
              onPositionChange={handlePositionChange}
              onCombatEvent={handleCombatEvent}
              onReady={setGameReady}
            />
          ) : (
            <p>Faça login e selecione um personagem para carregar o mapa.</p>
          )}
          {!gameReady && ownerId && characterId && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[28px] bg-black/60">
              <div className="h-20 w-20 animate-pulse rounded-full border-4 border-amber-200/60" />
            </div>
          )}
          {characterInfo && <CityHud stats={characterInfo.stats} />}
          {ownerId && (
            <QuickSlots
              ownerId={ownerId}
              refreshKey={inventoryVersion}
              onItemUsed={handleItemUsed}
              onInventoryChange={notifyInventoryChange}
              onOpenEquipment={() => setEquipOpen(true)}
            />
          )}
          {ownerId && <OnlineBadge />}
          {ownerId && <BottomMenu variant="overlay" buttons={actionButtons} square />}
          <MiniMapOverlay
            visible={Boolean(ownerId && showMiniMap)}
            position={playerPosition ?? sessionState?.position}
          />
        </div>
      </div>
      {hudEffect && (
        <div className={`potion-effect ${hudEffect.type}`}>
          {hudEffect.type === "mana" ? "+ Mana" : "+ Vida"}
        </div>
      )}
      {feedback && (
        <div className="card">
          <p>{feedback}</p>
        </div>
      )}
      {ownerId && (
        <div className="grid">
          <div className="card">
            <OnlinePanel ownerId={ownerId} />
          </div>
        </div>
      )}
      <InventoryDrawer
        open={inventoryOpen}
        onClose={() => setInventoryOpen(false)}
        ownerId={ownerId}
        onItemUsed={handleItemUsed}
        onInventoryChange={notifyInventoryChange}
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
              <button type="button" className="button mt-4" onClick={handleFullLogout}>
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
    </section>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha ao carregar personagem";
}

function CityHud({ stats }: { stats: Character["stats"] }) {
  const bars = [
    { key: "hp", label: "HP", value: stats.hp, max: 100 },
    { key: "energy", label: "ENERGIA", value: stats.energy, max: 100 },
    { key: "xp", label: "XP", value: stats.xp, max: 100 }
  ];
  const gradientMap: Record<string, string> = {
    hp: "from-red-300 to-red-500",
    energy: "from-yellow-200 to-yellow-500",
    xp: "from-indigo-300 to-indigo-500"
  };

  return (
    <div className="pointer-events-none absolute top-3 left-3 flex w-[180px] flex-col gap-2 rounded-sm border border-white/10 bg-black/70 p-4 text-amber-50 shadow-black shadow-2xl">
      <div className="space-y-1">
        {bars.map((bar) => {
          const percentage = Math.min(100, bar.value);
          return (
            <div key={bar.key} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-amber-100/70">
                <span>{bar.label}</span>
                <span>{bar.value}</span>
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
      <div className="flex items-center justify-between rounded-2xl bg-amber-200/20 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-amber-100">
        <span>NVL</span>
        <span className="text-2xl font-bold tracking-normal text-amber-50">{stats.level}</span>
      </div>
    </div>
  );
}

type QuickSlotsProps = {
  ownerId: string;
  refreshKey: number;
  onItemUsed?: (itemId: string) => void;
  onInventoryChange?: () => void;
  onOpenEquipment?: () => void;
};

function QuickSlots({ ownerId, refreshKey, onItemUsed, onInventoryChange, onOpenEquipment }: QuickSlotsProps) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [slotRefs, setSlotRefs] = useState<Array<string | null>>([null, null, null, null]);
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
  const [visibleSlots, setVisibleSlots] = useState(4);
  const iconMap: Record<string, string> = {
    item1: "/itens/item1.png",
    item10: "/itens/item10.png"
  };

  if (!ownerId) return null;

  useEffect(() => {
    const updateSlots = () => {
      if (typeof window === "undefined") return;
      const height = window.innerHeight;
      if (height > 900) setVisibleSlots(4);
      else if (height > 720) setVisibleSlots(3);
      else if (height > 620) setVisibleSlots(2);
      else setVisibleSlots(1);
    };
    updateSlots();
    window.addEventListener("resize", updateSlots);
    return () => window.removeEventListener("resize", updateSlots);
  }, []);

  useEffect(() => {
    if (!ownerId) return;
    void loadInventory();
    void loadSlotRefs();

    async function loadInventory() {
      try {
        const response = await getJSON<InventoryItem[]>(`/api/inventory/get?ownerId=${ownerId}`);
        setItems(response);
        pruneSlots(response);
      } catch {
        setItems([]);
      }
    }

    async function loadSlotRefs() {
      try {
        const response = await getJSON<{ slots: Array<string | null> }>("/api/quickslots");
        setSlotRefs(response.slots);
      } catch {
        setSlotRefs([null, null, null, null]);
      }
    }
  }, [ownerId, refreshKey]);

  const resolvedSlots = useMemo(
    () => slotRefs.map((ref) => (ref ? items.find((item) => item.id === ref) ?? null : null)),
    [slotRefs, items]
  );

  async function consumeSlot(index: number) {
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
    } catch {
      // ignore errors
    }
  }

  async function assignSlot(item: InventoryItem, index: number) {
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
  const equipmentSlots = [
    { id: "cordao", icon: "🔗" },
    { id: "anel", icon: "💍" },
    { id: "arma", icon: "⚔️" }
  ];

  return (
    <div className="pointer-events-auto absolute right-4 top-20 flex w-[120px] flex-col sm:right-6 md:top-24">
      <div className="relative rounded-[28px] border border-white/10 bg-black/70 p-3 shadow-xl">
        <div className="flex flex-col gap-2">
          {quickSlots.map((slot, index) => {
            const icon = slot ? iconMap[slot.id] : undefined;
            return (
              <button
                key={index}
                type="button"
                className={`relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-lg text-amber-100 transition hover:border-amber-200 ${slot ? "shadow-lg" : ""}`}
                onClick={() => consumeSlot(index)}
              >
                <span className="absolute left-1 top-1 text-[10px] text-amber-200">{index + 1}</span>
                {slot && icon ? (
                  <img src={icon} alt={slot.name} className="h-7 w-7 object-contain" />
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
                    onClick={() => assignSlot(item, pickerSlot)}
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
      <div className="mt-3 rounded-[28px] border border-white/10 bg-black/70 p-3 shadow-xl">
        <div className="flex flex-col gap-2">
          {equipmentSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-lg text-amber-100"
              onClick={() => onOpenEquipment?.()}
              aria-label={`Gerenciar ${slot.id}`}
            >
              {slot.icon}
            </button>
          ))}
        </div>
      </div>
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
  onItemUsed,
  onInventoryChange
}: {
  open: boolean;
  onClose: () => void;
  ownerId: string;
  onItemUsed?: (itemId: string) => void;
  onInventoryChange?: () => void;
}) {
  if (!ownerId) return null;
  return (
    <Drawer open={open} onClose={onClose} title="Inventário">
      <InventoryPanel
        ownerId={ownerId}
        onItemUsed={onItemUsed}
        onItemsChange={() => onInventoryChange?.()}
      />
    </Drawer>
  );
}

function EquipmentDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const slots = [
    { id: "head", label: "Cabeça", hint: "HD" },
    { id: "necklace", label: "Cordão", hint: "CD" },
    { id: "ring", label: "Anel", hint: "AN" },
    { id: "armor", label: "Armadura", hint: "AR" },
    { id: "weapon", label: "Arma", hint: "WP" },
    { id: "shield", label: "Escudo", hint: "ES" },
    { id: "pants", label: "Calça", hint: "CL" },
    { id: "boots", label: "Bota", hint: "BT" }
  ];
  return (
    <Drawer open={open} onClose={onClose} title="Equipamentos">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex h-20 flex-col items-center justify-center rounded-2xl border border-white/15 bg-black/40 text-amber-100"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-amber-100/60">{slot.label}</p>
              <p className="text-2xl font-bold">{slot.hint}</p>
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
  if (!ownerId) return null;
  return (
    <Drawer open={open} onClose={onClose} title="Chat">
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-sm uppercase tracking-[0.3em] text-amber-100/70">Global</h4>
          <ChatPanel ownerId={ownerId} characterName={characterName} />
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.3em] text-amber-100/70">Battle</h4>
          <div className="mt-2 flex max-h-60 flex-col gap-2 overflow-y-auto rounded-2xl border border-white/10 bg-black/40 p-3 text-xs text-amber-100">
            {combatLog.length === 0 && <span className="text-amber-100/60">Sem eventos recentes.</span>}
            {combatLog.slice(-20).map((entry) => (
              <div
                key={entry.id}
                className={`rounded-xl border px-3 py-1 font-semibold ${
                  entry.tone === "xp" ? "border-green-200/40 text-green-200" : "border-red-200/40 text-red-200"
                }`}
              >
                {entry.message}
              </div>
            ))}
          </div>
        </div>
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
    <div className="mini-map-overlay">
      <span className="mini-map-title">MINI MAPA</span>
      <div className="mini-map-grid">
        <div className="mini-map-pointer" style={{ left: `${xPercent}%`, top: `${yPercent}%` }} />
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
