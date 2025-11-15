"use client";

import { useEffect, useState } from "react";
import { getJSON } from "@/lib/clientApi";
import type { OnlinePresence } from "@/lib/models";

export function OnlineBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const list = await getJSON<OnlinePresence[]>("/api/online/list");
        if (active) setCount(list.length);
      } catch {
        if (active) setCount(0);
      }
    }
    load();
    const interval = window.setInterval(load, 10000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

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
