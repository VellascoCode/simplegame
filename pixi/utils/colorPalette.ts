const COLOR_PALETTE: Record<number, number> = {
  1: 0xfefce8,
  2: 0xfcd34d,
  3: 0xf97316,
  4: 0x22d3ee,
  5: 0xa855f7,
  6: 0x4ade80,
  7: 0x2dd4bf,
  8: 0x38bdf8,
  9: 0xf43f5e,
  10: 0x94a3b8,
  11: 0xfacc15,
  12: 0xffffff,
  13: 0x475569,
  14: 0x0f172a,
  15: 0xfff7ed
};

export function resolvePaletteColor(code: number | undefined, fallback: number): number {
  if (typeof code !== "number") {
    return fallback;
  }
  const normalized = Math.trunc(code);
  return COLOR_PALETTE[normalized] ?? fallback;
}

export function normalizeHueCode(code: number | undefined, fallback = 0): number {
  if (typeof code !== "number" || !Number.isFinite(code)) {
    return fallback;
  }
  const normalized = code % 256;
  return normalized < 0 ? normalized + 256 : normalized;
}

export { COLOR_PALETTE };
