export type SpriteOptionValue = "warriorblue" | "pingu";

export type SpriteOption = {
  value: SpriteOptionValue;
  label: string;
  description: string;
};

export const spriteOptionValues = ["warriorblue", "pingu"] as const;

export const spriteOptions: readonly SpriteOption[] = [
  {
    value: "warriorblue",
    label: "Espadachim Iniciante",
    description: "Treinado na cidade de Spinazzi, pronto para cortar tudo pela frente."
  },
  {
    value: "pingu",
    label: "Pingu Explorador",
    description: "Mascote ágil enviado para reconhecer terrenos antes da guilda chegar."
  }
] as const;

export const defaultSprite: SpriteOptionValue = spriteOptions[0].value;

export const spriteColorValues = [1, 2, 3, 4] as const;

export type SpriteColorValue = (typeof spriteColorValues)[number];

export type SpriteColorOption = {
  value: SpriteColorValue;
  label: string;
  description: string;
};

export const spriteColorOptions: readonly SpriteColorOption[] = [
  { value: 1, label: "Tonalidade Padrão", description: "" },
  { value: 2, label: "Tonalidade Âmbar", description: "" },
  { value: 3, label: "Tonalidade Gélida", description: "" },
  { value: 4, label: "Tonalidade Floresta", description: "" }
] as const;

export const defaultSpriteColor: SpriteColorValue = spriteColorOptions[0].value;

const spriteColorFilters: Record<SpriteColorValue, string> = {
  1: "hue-rotate(0deg)",
  2: "hue-rotate(45deg)",
  3: "hue-rotate(170deg)",
  4: "hue-rotate(260deg)"
};
const spriteColorTints: Record<SpriteColorValue, number> = {
  1: 0xffffff,
  2: 0xffd89c,
  3: 0xa9d1ff,
  4: 0x9cf7c1
};

export function getSpriteColorFilter(color?: SpriteColorValue) {
  if (!color) return spriteColorFilters[1];
  return spriteColorFilters[color] ?? spriteColorFilters[1];
}

export function getSpriteColorTint(color?: SpriteColorValue) {
  if (!color) return spriteColorTints[1];
  return spriteColorTints[color] ?? spriteColorTints[1];
}
