"use client";

import type { ReactNode } from "react";

import { createContext, useContext, useEffect, useState } from "react";

import { useThemeSounds } from "@/hooks/useThemeSounds";
import type { ThemeId } from "@/components/themeConfig";
import { ALL_THEMES } from "@/components/themeConfig";

export type ThemeType = ThemeId;

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeType>("dark-fantasy");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playSound } = useThemeSounds();

  useEffect(() => {
    // Load theme from localStorage
    const savedThemeRaw = localStorage.getItem("medieval-theme");
    const migrated = savedThemeRaw === "pastel-fofo" ? "kawaii" : savedThemeRaw;
    if (migrated && (ALL_THEMES as string[]).includes(migrated)) {
      setThemeState(migrated as ThemeType);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("medieval-theme", theme);

    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeType) => {
    if (newTheme === theme || isTransitioning) return;

    setIsTransitioning(true);
    playSound('theme-change');

    // Adicionar classe de transição ao body
    document.body.classList.add('theme-transitioning');

    // Pequeno delay para permitir que a animação comece
    setTimeout(() => {
      setThemeState(newTheme);

      // Remover classe de transição após a mudança
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 300);
    }, 150);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isTransitioning }}>
      {children}
      {/* Overlay de transição */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
          <div className="absolute top-1/4 left-1/4 text-4xl animate-ping">🌟</div>
          <div className="absolute bottom-1/4 right-1/4 text-4xl animate-ping" style={{animationDelay: '0.5s'}}>⭐</div>
          <div className="absolute top-1/2 right-1/4 text-4xl animate-ping" style={{animationDelay: '1s'}}>💫</div>
        </div>
      )}
    </ThemeContext.Provider>
  );
}
