"use client";

import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

export type FloatingMenuButton = {
  id: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  active?: boolean;
  ariaLabel?: string;
};

type FloatingHudMenuProps = {
  buttons: ReadonlyArray<FloatingMenuButton>;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export function FloatingHudMenu({ buttons, menuOpen, onToggleMenu }: FloatingHudMenuProps) {
  const { theme } = useTheme();

  return (
    <div className="pointer-events-auto absolute right-3 top-1/2 z-[999] flex -translate-y-1/2 flex-col gap-2">
      <button
        type="button"
        aria-label={menuOpen ? "Fechar HUD lateral" : "Abrir HUD lateral"}
        onClick={onToggleMenu}
        className={`flex h-12 w-12 items-center justify-center rounded-md border-2 shadow-md transition-all duration-200 hover:scale-105 ${
          theme === "dark-fantasy"
            ? "border-amber-400 bg-stone-900 text-amber-100 hover:bg-stone-800"
            : theme === "royal-medieval"
            ? "border-amber-400 bg-amber-900 text-amber-100 hover:bg-amber-800"
            : "border-pink-300 bg-pink-100 text-pink-800 hover:bg-pink-200"
        }`}
      >
        {menuOpen ? "−" : "+"}
      </button>
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ${
          menuOpen ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {buttons.map((button) => (
          <button
            key={button.id}
            type="button"
            onClick={() => button.onClick?.()}
            aria-label={button.ariaLabel ?? button.label}
            className={`flex h-12 w-12 items-center justify-center rounded-md border-2 shadow-md transition-all duration-200 hover:scale-105 ${
              theme === "dark-fantasy"
                ? `border-amber-400 bg-stone-900 text-amber-100 hover:bg-stone-800 ${button.active ? "ring-2 ring-amber-300" : ""}`
                : theme === "royal-medieval"
                ? `border-amber-400 bg-amber-900 text-amber-100 hover:bg-amber-800 ${button.active ? "ring-2 ring-amber-300" : ""}`
                : `border-pink-300 bg-pink-100 text-pink-800 hover:bg-pink-200 ${button.active ? "ring-2 ring-pink-400" : ""}`
            }`}
          >
            {button.icon ? <Image src={button.icon} alt="" className="h-6 w-6" width={24} height={24} /> : button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
