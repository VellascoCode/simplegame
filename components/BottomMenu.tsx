"use client";

import { useRouter } from "next/navigation";

const menuLinks: ReadonlyArray<MenuButton> = [
  { id: "admin", label: "Admin", path: "/editor" },
  { id: "play", label: "Jogar", path: "/play" },
  { id: "casa", label: "Casa", path: "/house" },
  { id: "farm", label: "Fazenda", path: "/farm" },
  { id: "forest", label: "Floresta", path: "/forest" },
  { id: "shops", label: "Lojas", path: "/shops" },
  { id: "chat", label: "Chat", path: "/chat" }
] as const;

type MenuButton = {
  id: string;
  label: string;
  path?: string;
  onClick?: () => void;
  icon?: string;
  ariaLabel?: string;
  active?: boolean;
};

type BottomMenuProps = {
  variant?: "page" | "overlay";
  buttons?: ReadonlyArray<MenuButton>;
  square?: boolean;
};

export function BottomMenu({ variant = "page", buttons, square = false }: BottomMenuProps = {}) {
  const router = useRouter();

  function handleNavigate(path: string) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lastRoute", path);
      window.dispatchEvent(new CustomEvent("lastRouteChange", { detail: path }));
    }
    router.push(path);
  }

  const items = buttons ?? menuLinks;

  const baseNavClass =
    variant === "overlay"
      ? "pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 rounded-md border border-white/20 bg-black/70 px-6 py-3 shadow-2xl shadow-black backdrop-blur"
      : "flex flex-wrap justify-center gap-3";

  return (
    <nav className={baseNavClass}>
      {items.map((item) => {
        const baseButtonClass = square
          ? "flex h-14 w-14 items-center justify-center rounded-md border border-white/15 bg-gradient-to-b from-amber-200/80 to-amber-700/70 text-xs font-semibold uppercase tracking-[0.08em] text-stone-900 shadow-lg"
          : "rounded-full border border-white/15 bg-gradient-to-b from-amber-200/80 to-amber-700/70 px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-stone-900 shadow-lg";
        const activeClass = item.active ? "ring-2 ring-amber-300" : "";
        const buttonClass = `${baseButtonClass} ${activeClass}`.trim();
        return (
          <button
            key={item.id}
            type="button"
            className={buttonClass}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              } else if (item.path) {
                handleNavigate(item.path);
              }
            }}
            aria-label={item.ariaLabel ?? item.label}
          >
            {item.icon ? (
              <img src={item.icon} alt="" className="h-auto w-auto object-contain" />
            ) : (
              <span className="text-xs font-semibold uppercase tracking-[0.08em]">{item.label}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
