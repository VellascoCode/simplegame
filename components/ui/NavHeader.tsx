"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

type NavHeaderProps = {
  user?: {
    name: string;
    isAdmin?: boolean;
  };
  isLogged?: boolean;
  onToggleSidebar?: () => void;
};

export default function NavHeader({ user, isLogged = false, onToggleSidebar }: NavHeaderProps) {
  const [theme] = useState("dark");
  const displayName = useMemo(() => user?.name ?? "Convidado", [user]);

  const handleToggle = () => {
    onToggleSidebar?.();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("toggle-sidebar"));
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b-4 border-amber-950 bg-amber-900 text-amber-100 shadow-2xl shadow-black/70">
      <div className="flex items-center gap-3 px-4">
        <button
          type="button"
          onClick={handleToggle}
          className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-amber-950 bg-amber-800 text-lg font-bold shadow-md shadow-black/50 hover:bg-amber-700 md:hidden"
        >
          ☰
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 rounded-md border-2 border-amber-950 bg-amber-800 shadow-md shadow-black/60">
            <Image src="/icons/skills.png" alt="Logo" fill className="object-contain p-1" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.24em] text-amber-200">Mundo 2D</span>
            <span className="text-base font-bold text-amber-50">Spinazzi</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3 px-4">
        <button
          type="button"
          className="hidden h-10 items-center rounded-md border-2 border-amber-950 bg-stone-900 px-3 text-xs font-semibold uppercase tracking-widest text-amber-100 shadow-md shadow-black/50 hover:bg-stone-800 md:inline-flex"
        >
          Tema: {theme}
        </button>

        <button
          type="button"
          className="hidden h-10 items-center rounded-md border-2 border-amber-950 bg-stone-900 px-3 text-xs font-semibold uppercase tracking-widest text-amber-100 shadow-md shadow-black/50 hover:bg-stone-800 md:inline-flex"
          aria-label="Notificações"
        >
          🔔
        </button>

        {isLogged ? (
          <div className="flex items-center gap-2 rounded-md border-2 border-amber-950 bg-stone-900 px-3 py-1 shadow-md shadow-black/60">
            <div className="relative h-9 w-9 rounded-md border-2 border-amber-900 bg-amber-800 shadow-inner shadow-black/50">
              <span className="flex h-full w-full items-center justify-center text-sm font-bold text-amber-50">
                {displayName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-amber-50">{displayName}</span>
              {user?.isAdmin && <span className="text-[11px] uppercase tracking-[0.24em] text-amber-300">Admin</span>}
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="inline-flex h-10 items-center rounded-md border-2 border-amber-950 bg-amber-700 px-4 text-xs font-bold uppercase tracking-widest text-amber-50 shadow-md shadow-black/60 hover:bg-amber-600"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
