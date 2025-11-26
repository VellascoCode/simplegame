"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { ThemeSelector } from "@/components/ThemeSelector";
import { useTheme } from "@/components/ThemeProvider";
import { navHeaderStyles } from "@/components/themeConfig";

type NavHeaderProps = {
  user?: {
    name: string;
    isAdmin?: boolean;
  };
  isLogged?: boolean;
  onToggleSidebar?: () => void;
};

export default function NavHeader({ user, isLogged = false, onToggleSidebar }: NavHeaderProps) {
  const displayName = useMemo(() => user?.name ?? "Convidado", [user]);
  const { theme } = useTheme();

  const handleToggle = () => {
    onToggleSidebar?.();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("toggle-sidebar"));
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b-4 shadow-2xl shadow-black/70 ${navHeaderStyles.header[theme]}`}
    >
      <div className="flex items-center gap-3 px-4">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex h-10 w-10 items-center justify-center rounded-md border-2 text-lg font-bold shadow-md shadow-black/50 hover:scale-105 transition-all duration-200 md:hidden ${navHeaderStyles.menuButton[theme]}`}
        >
          ☰
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div
            className={`relative h-10 w-10 rounded-md border-2 shadow-md shadow-black/60 ${navHeaderStyles.logoWrapper[theme]}`}
          >
            <Image src="/icons/skills.png" alt="Logo" fill className="object-contain p-1" />
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className={`text-[11px] uppercase tracking-[0.24em] ${navHeaderStyles.brandSmall[theme]}`}
            >
              Mundo 2D
            </span>
            <span
              className={`text-base font-bold ${navHeaderStyles.brandLarge[theme]}`}
            >
              Spinazzi
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3 px-4">
        <ThemeSelector />

        <button
          type="button"
          className={`hidden h-10 items-center rounded-md border-2 px-3 text-xs font-semibold uppercase tracking-widest shadow-md shadow-black/50 hover:scale-105 transition-all duration-200 md:inline-flex ${navHeaderStyles.bellButton[theme]}`}
          aria-label="Notificações"
        >
          🔔
        </button>

        {isLogged ? (
          <div
            className={`flex items-center gap-2 rounded-md border-2 px-3 py-1 shadow-md shadow-black/60 ${navHeaderStyles.userContainer[theme]}`}
          >
            <div
              className={`relative h-9 w-9 rounded-md border-2 shadow-inner shadow-black/50 ${navHeaderStyles.userAvatar[theme]}`}
            >
              <span
                className={`flex h-full w-full items-center justify-center text-sm font-bold ${navHeaderStyles.userInitials[theme]}`}
              >
                {displayName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`text-sm font-semibold ${navHeaderStyles.userName[theme]}`}
              >
                {displayName}
              </span>
              {user?.isAdmin && (
                <span
                  className={`text-[11px] uppercase tracking-[0.24em] ${navHeaderStyles.userAdmin[theme]}`}
                >
                  Admin
                </span>
              )}
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className={`inline-flex h-10 items-center rounded-md border-2 px-4 text-xs font-bold uppercase tracking-widest shadow-md shadow-black/60 hover:scale-105 transition-all duration-200 ${navHeaderStyles.loginButton[theme]}`}
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
