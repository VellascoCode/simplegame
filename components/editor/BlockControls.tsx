"use client";

import React from "react";

interface BlockControlsProps {
  blockMode: boolean;
  onToggleBlock(): void;
  onUnblockAll(): void;
}

export function BlockControls({ blockMode, onToggleBlock, onUnblockAll }: BlockControlsProps) {
  const blockButtonStyle = blockMode
    ? "bg-emerald-600 border-emerald-400 text-white"
    : "bg-[#5a1f1f] border-red-700 text-red-100";

  return (
    <div className="flex gap-2">
      <button type="button" onClick={onToggleBlock} className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${blockButtonStyle}`}>
        Block Mode: {blockMode ? "ON" : "OFF"}
      </button>
      <button
        type="button"
        onClick={onUnblockAll}
        className="flex-1 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white transition hover:border-white/40"
      >
        Unblock All
      </button>
    </div>
  );
}
