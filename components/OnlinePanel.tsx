"use client";

import { useEffect, useState } from "react";
import { getJSON, postJSON } from "@/lib/clientApi";

type OnlinePresence = {
  ownerId: string;
  lastPing: string;
};

export function OnlinePanel({ ownerId }: { ownerId: string }) {
  const [list, setList] = useState<OnlinePresence[]>([]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const presences = await getJSON<OnlinePresence[]>("/api/online/list");
        if (active) {
          setList(presences);
        }
      } catch (err) {
        console.warn("Falha ao carregar online", err);
      }
    }

    load();
    const interval = setInterval(load, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!ownerId) {
      return;
    }

    async function ping() {
      try {
        await postJSON("/api/online/ping", { ownerId });
      } catch (err) {
        console.warn("Falha ao enviar ping", err);
      }
    }

    ping();
    const interval = setInterval(ping, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [ownerId]);

  return (
    <div>
      <h3>Jogadores online ({list.length})</h3>
      <ul className="list">
        {list.map((presence) => (
          <li key={presence.ownerId}>
            {presence.ownerId} — ping {new Date(presence.lastPing).toLocaleTimeString()}
          </li>
        ))}
        {list.length === 0 && <li>Nenhum jogador ativo.</li>}
      </ul>
    </div>
  );
}
