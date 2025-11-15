"use client";

import { useEffect, useRef, useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";

export function ChatModal({ ownerId, characterName }: { ownerId?: string; characterName?: string }) {
  const [open, setOpen] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  function toggle() {
    if (!open) {
      playSound();
    }
    setOpen((prev) => !prev);
  }

  function playSound() {
    try {
      const ctx = audioContextRef.current ?? new AudioContext();
      audioContextRef.current = ctx;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.value = 720;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.3);
    } catch {
      // ignore audio failures
    }
  }

  useEffect(() => {
    return () => {
      audioContextRef.current?.close().catch(() => undefined);
    };
  }, []);

  return (
    <div className="chat-modal-trigger">
      <button className="button" type="button" onClick={toggle}>
        {open ? "Fechar chat" : "Chat global"}
      </button>
      <div className={`chat-drawer ${open ? "open" : ""}`} onClick={toggle}>
        <div className="chat-drawer-card" onClick={(event) => event.stopPropagation()}>
          <button className="chat-drawer-close" type="button" onClick={toggle}>
            ×
          </button>
          <ChatPanel ownerId={ownerId} characterName={characterName} />
        </div>
      </div>
    </div>
  );
}
