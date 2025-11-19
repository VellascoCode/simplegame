"use client";

import React from "react";

type OverlayControlsProps = {
  overlayMode: boolean;
  disabled: boolean;
  onToggle: () => void;
};

export function OverlayControls({ overlayMode, disabled, onToggle }: OverlayControlsProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`w-full rounded-lg border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        overlayMode
          ? "border-indigo-400 bg-indigo-500/20 text-indigo-100 shadow-[0_0_12px_rgba(129,140,248,0.35)]"
          : "border-white/15 bg-black/40 text-white/70 hover:border-amber-200/40"
      }`}
    >
      Sobrepor: {overlayMode && !disabled ? "ON" : "OFF"}
    </button>
  );
}
