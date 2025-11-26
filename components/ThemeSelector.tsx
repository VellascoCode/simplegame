"use client";

import { useThemeSounds } from "@/hooks/useThemeSounds";

import type { ThemeType } from "./ThemeProvider";

import { useTheme } from "./ThemeProvider";
import { WoodenButton } from "./UniversalUi";
import { THEME_OPTIONS } from "@/components/themeConfig";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { playSound } = useThemeSounds();

  const handleThemeChange = (newTheme: ThemeType) => {
    playSound("button-click");
    setTheme(newTheme);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {THEME_OPTIONS.map((option) => (
        <WoodenButton
          key={option.value}
          label={`${option.emoji} ${option.label}`}
          variant={theme === option.value ? "redRoyal" : "wood"}
          size="sm"
          onClick={() => handleThemeChange(option.value as ThemeType)}
          className="text-xs"
        />
      ))}
    </div>
  );
}
