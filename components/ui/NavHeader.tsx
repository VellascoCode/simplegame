"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { ThemeSelector } from "@/components/ThemeSelector";
import { useTheme } from "@/components/ThemeProvider";

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

  // Estilos por tema — alinhados com UniversalUi
  const headerClass = theme === "kawaii"
    ? "border-pink-300 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-pink-700"
    : theme === "royal-medieval"
      ? "border-amber-700 bg-gradient-to-r from-amber-800 to-orange-900 text-amber-100"
      : "border-amber-900/40 bg-gradient-to-r from-stone-900 to-stone-950 text-amber-300";

  const menuButtonClass = theme === "kawaii"
    ? "border-pink-300 bg-pink-200 text-pink-800 hover:bg-pink-100"
    : theme === "royal-medieval"
      ? "border-amber-700 bg-amber-700 text-amber-100 hover:bg-amber-600"
      : "border-amber-900/40 bg-amber-900 text-amber-100 hover:bg-amber-800";

  const logoWrapperClass = theme === "kawaii"
    ? "border-pink-300 bg-pink-200"
    : theme === "royal-medieval"
      ? "border-amber-700 bg-amber-700"
      : "border-amber-900/40 bg-amber-900";

  const brandSmallClass = theme === "kawaii" ? "text-pink-700" : "text-amber-200";
  const brandLargeClass = theme === "kawaii" ? "text-pink-800" : "text-amber-50";

  const bellButtonClass = theme === "kawaii"
    ? "border-pink-300 bg-pink-100 text-pink-800 hover:bg-pink-50"
    : theme === "royal-medieval"
      ? "border-amber-700 bg-stone-800 text-amber-100 hover:bg-stone-700"
      : "border-amber-900/40 bg-stone-900 text-amber-100 hover:bg-stone-800";

  const userContainerClass = theme === "kawaii"
    ? "border-pink-300 bg-pink-100"
    : theme === "royal-medieval"
      ? "border-amber-700 bg-stone-800"
      : "border-amber-900/40 bg-stone-900";

  const userAvatarClass = theme === "kawaii"
    ? "border-pink-400 bg-pink-300"
    : theme === "royal-medieval"
      ? "border-amber-800 bg-amber-700"
      : "border-amber-900 bg-amber-800";

  const userInitialsClass = theme === "kawaii" ? "text-pink-800" : "text-amber-50";
  const userNameClass = theme === "kawaii" ? "text-pink-800" : "text-amber-50";
  const userAdminClass = theme === "kawaii" ? "text-pink-600" : "text-amber-300";

  const loginButtonClass = theme === "kawaii"
    ? "border-pink-300 bg-pink-200 text-pink-800 hover:bg-pink-100"
    : theme === "royal-medieval"
      ? "border-amber-700 bg-amber-600 text-amber-50 hover:bg-amber-500"
      : "border-amber-900/40 bg-amber-700 text-amber-50 hover:bg-amber-600";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b-4 shadow-2xl shadow-black/70 ${headerClass}`}
    >
      <div className="flex items-center gap-3 px-4">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex h-10 w-10 items-center justify-center rounded-md border-2 text-lg font-bold shadow-md shadow-black/50 hover:scale-105 transition-all duration-200 md:hidden ${menuButtonClass}`}
        >
          ☰
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div
            className={`relative h-10 w-10 rounded-md border-2 shadow-md shadow-black/60 ${logoWrapperClass}`}
          >
            <Image src="/icons/skills.png" alt="Logo" fill className="object-contain p-1" />
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className={`text-[11px] uppercase tracking-[0.24em] ${brandSmallClass}`}
            >
              Mundo 2D
            </span>
            <span
              className={`text-base font-bold ${brandLargeClass}`}
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
          className={`hidden h-10 items-center rounded-md border-2 px-3 text-xs font-semibold uppercase tracking-widest shadow-md shadow-black/50 hover:scale-105 transition-all duration-200 md:inline-flex ${bellButtonClass}`}
          aria-label="Notificações"
        >
          NOTIF.
        </button>

        {isLogged ? (
          <div
            className={`flex items-center gap-2 rounded-md border-2 px-3 py-1 shadow-md shadow-black/60 ${userContainerClass}`}
          >
            <div
              className={`relative h-9 w-9 rounded-md border-2 shadow-inner shadow-black/50 ${userAvatarClass}`}
            >
              <span
                className={`flex h-full w-full items-center justify-center text-sm font-bold ${userInitialsClass}`}
              >
                {displayName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`text-sm font-semibold ${userNameClass}`}
              >
                {displayName}
              </span>
              {user?.isAdmin && (
                <span
                  className={`text-[11px] uppercase tracking-[0.24em] ${userAdminClass}`}
                >
                  Admin
                </span>
              )}
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className={`inline-flex h-10 items-center rounded-md border-2 px-4 text-xs font-bold uppercase tracking-widest shadow-md shadow-black/60 hover:scale-105 transition-all duration-200 ${loginButtonClass}`}
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}