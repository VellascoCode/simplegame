"use client";

import Image from "next/image";

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
  return (
    <div className="pointer-events-auto absolute right-3 top-1/2 z-[999] flex -translate-y-1/2 flex-col gap-2">
      <button
        type="button"
        aria-label={menuOpen ? "Fechar HUD lateral" : "Abrir HUD lateral"}
        onClick={onToggleMenu}
        className="flex h-12 w-12 items-center justify-center rounded-md border border-[#fcd34d66] bg-[#0a0a0ad9] text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-100 shadow-[0_4px_10px_rgba(0,0,0,0.45)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.55)]"
      >
        {menuOpen ? "−" : "+"}
      </button>
      <div
        className={`flex flex-col gap-2 transition-all duration-200 ${
          menuOpen ? "opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {buttons.map((button) => (
          <button
            key={button.id}
            type="button"
            onClick={() => button.onClick?.()}
            aria-label={button.ariaLabel ?? button.label}
            className={`flex h-12 w-12 items-center justify-center rounded-md border border-[#fcd34d66] bg-[#0a0a0ad9] text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-100 shadow-[0_4px_10px_rgba(0,0,0,0.45)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.55)] ${button.active ? "ring-2 ring-amber-300/80" : ""}`}
          >
            {button.icon ? <Image src={button.icon} alt="" className="h-6 w-6" width={24} height={24} /> : button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
