"use client";

import { useEffect, useState } from "react";
import { getJSON } from "@/lib/clientApi";
import type { OnlinePresence } from "@/lib/models";

export function OnlineBadge({ enabled = true }: { enabled?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return;
    }
    let active = true;
    let timer: number | null = null;
    const load = async () => {
      if (!active) return;
      try {
        const list = await getJSON<OnlinePresence[]>("/api/online/list");
        if (active) setCount(list.length);
      } catch {
        if (active) setCount(0);
      } finally {
        if (active) {
          timer = window.setTimeout(() => {
            void load();
          }, 10000);
        }
      }
    };
    void load();
    return () => {
      active = false;
      if (timer) window.clearTimeout(timer);
    };
  }, [enabled]);

  return (
    <div
      className="pointer-events-none absolute top-6 right-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 shadow"
      aria-label={`Jogadores online: ${count}`}
    >
      <span className="text-base">{count}</span>
      <span>Online</span>
    </div>
  );
}
