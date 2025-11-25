"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { playMenuCloseSound, playMenuOpenSound } from "@/pixi/runtime/audio";

type QuickActionMenuProps = {
  open: boolean;
};

const CLOSE_ANIMATION_DURATION_MS = 300;
const SLOT_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7];
const BASE_CLASSES = "flex items-center gap-3 transition-all duration-300";
const OPEN_CLASSES = ["opacity-100", "-translate-y-1", "ease-out"];
const CLOSED_CLASSES = ["opacity-0", "translate-y-1", "ease-in"];

function playOpenSound() {
  playMenuOpenSound();
}

function playCloseSound() {
  playMenuCloseSound();
}

function renderSlots() {
  return SLOT_INDEXES.map((slotIndex) => (
    <div
      key={`quick-slot-${slotIndex}`}
      className="flex h-14 w-14 items-center justify-center rounded-md border border-amber-300/40 bg-black/30 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100/80 shadow-md shadow-black/40"
    >
      +{slotIndex + 1}
    </div>
  ));
}

export function QuickActionMenu({ open }: QuickActionMenuProps) {
  const [isVisible, setIsVisible] = useState(open);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const closeTimeoutRef = useRef<number>();
  const shouldAnimateOpenRef = useRef(false);

  const setClosedState = useCallback((element: HTMLElement) => {
    CLOSED_CLASSES.forEach((cls) => element.classList.add(cls));
    OPEN_CLASSES.forEach((cls) => element.classList.remove(cls));
  }, []);

  const setOpenState = useCallback((element: HTMLElement) => {
    OPEN_CLASSES.forEach((cls) => element.classList.add(cls));
    CLOSED_CLASSES.forEach((cls) => element.classList.remove(cls));
  }, []);

  const cancelPending = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = undefined;
    }
  }, []);

  const handleOpen = useCallback(() => {
    cancelPending();
    playOpenSound();
    shouldAnimateOpenRef.current = true;
    setIsVisible(true);
  }, [cancelPending]);

  const handleClose = useCallback(() => {
    cancelPending();
    playCloseSound();
    const container = containerRef.current;
    if (container) setClosedState(container);
    shouldAnimateOpenRef.current = false;
    closeTimeoutRef.current = window.setTimeout(() => setIsVisible(false), CLOSE_ANIMATION_DURATION_MS);
  }, [cancelPending, setClosedState]);

  useEffect(() => {
    if (open) {
      handleOpen();
      return cancelPending;
    }

    handleClose();
    return cancelPending;
  }, [cancelPending, handleClose, handleOpen, open]);

  useEffect(() => {
    if (!open || !isVisible) return;
    if (!shouldAnimateOpenRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    cancelPending();
    animationFrameRef.current = requestAnimationFrame(() => {
      setOpenState(container);
      shouldAnimateOpenRef.current = false;
    });
    return cancelPending;
  }, [cancelPending, isVisible, open, setOpenState]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className={`${BASE_CLASSES} ${CLOSED_CLASSES.join(" ")}`}>
      {renderSlots()}
    </div>
  );
}
