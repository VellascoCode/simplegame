"use client";

export const runtime = "nodejs";
export const preferredRegion = "home";

import { useMemo, useState, type ReactNode } from "react";
import { PixiGame } from "@/components/PixiGame";
import { BottomMenu } from "@/components/BottomMenu";

export default function PlayPixiOnlyPage() {
  const [ready, setReady] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [bestiaryOpen, setBestiaryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [minimapVisible, setMinimapVisible] = useState(false);

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
      }
    ],
    [minimapVisible]
  );

  return (
    <section className="city-shell min-h-screen bg-[#05070c] pt-12">
      <div className="map-layout mx-auto h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] w-full max-w-[1280px] overflow-hidden px-4">
        <div className="map-stage relative h-full">
          <PixiGame onReadyChange={setReady} bottomOverlay={<BottomMenu variant="overlay" square buttons={overlayButtons} />} />
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
