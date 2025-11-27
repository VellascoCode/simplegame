import type { ReactNode } from "react";
import { useTheme } from "@/components/ThemeProvider";

type CardWoodenProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  subtitle?: string;
};

type WoodPanelProps = {
  children: ReactNode;
  className?: string;
};

type MedievalSectionProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

type RoyalSectionProps = {
  title: ReactNode;
  children: ReactNode;
  variant?: "redRoyal" | "blueRoyal";
  className?: string;
};

type MedievalCardProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

type RoyalCardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  variant?: "redRoyal" | "blueRoyal";
  className?: string;
};

type MedievalTitleProps = {
  children: ReactNode;
};

type MedievalIconFrameProps = {
  className?: string;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
};

type ProgressWoodenBarProps = {
  value: number;
  max: number;
  colorClass?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
};

type WoodenButtonProps = {
  label: string;
  className?: string;
  variant?: "wood" | "sand" | "secondary" | "danger" | "redRoyal" | "blueRoyal";
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

type InventorySlotProps = {
  item?: string;
  count?: number;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary";
};

type WoodenInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

type WoodenBadgeProps = {
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "danger";
  size?: "sm" | "md";
};

type FofoCardProps = {
  children: ReactNode;
  variant?: "cloud" | "wave";
  className?: string;
};

// ========== SISTEMA DE TEMAS REFINADO COM ÍCONES SVG E EFEITO 3D CARTOON ==========

const getThemeStyles = (theme: string) => {
  if (theme === "kawaii") {
    return {
      // Tipografia
      font: "font-sans",
      titleFont: "font-sans font-bold tracking-widest uppercase",
      
      // Formas
      borderRadius: "rounded-2xl",
      cardRadius: "rounded-2xl",
      
      // Sombras 3D
      shadow: "shadow-[0_4px_8px_rgba(0,0,0,0.1)]",
      hoverShadow: "hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]",
      innerShadow: "before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:shadow-inset-[0_2px_4px_rgba(255,255,255,0.3)]",
      
      // Cores principais
      primary: "text-pink-700",
      background: "bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100",
      
      // Estilos de card/panel
      card: {
        container: "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 border border-white/60 rounded-2xl relative overflow-hidden",
        inner: "border border-white/40 bg-gradient-to-br from-white to-pink-50 rounded-xl",
        content: "border border-white/30 bg-white/90 rounded-lg",
        header: "border border-white/50 bg-gradient-to-r from-pink-200 to-purple-200 text-pink-800 rounded-xl"
      },
      
      // Botões
      button: {
        wood: "border border-white/60 bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
        sand: "border border-white/60 bg-gradient-to-br from-yellow-300 to-amber-300 text-yellow-900 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
        danger: "border border-white/60 bg-gradient-to-br from-red-300 to-pink-400 text-white shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
        secondary: "border border-white/60 bg-gradient-to-br from-gray-200 to-gray-300 text-gray-800 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
      },
      
      // Progresso
      progress: {
        track: "border border-pink-300 bg-gradient-to-br from-pink-50 to-purple-50 rounded-full",
        fill: "from-pink-400 via-purple-400 to-blue-400",
        text: "text-pink-800"
      },
      
      // Badge
      badge: {
        info: "border border-blue-300 bg-gradient-to-br from-blue-300 to-purple-400 text-blue-900",
        success: "border border-green-300 bg-gradient-to-br from-green-300 to-emerald-400 text-green-900",
        warning: "border border-amber-300 bg-gradient-to-br from-amber-300 to-orange-400 text-amber-900",
        danger: "border border-red-300 bg-gradient-to-br from-red-300 to-pink-400 text-red-900"
      },
      
      // Elementos decorativos
      accent: "pastel",
      grain: "kawaii",
      ornament: "flower"
    };
  }

  if (theme === "dark-fantasy") {
    return {
      font: "font-serif",
      titleFont: "font-serif font-bold tracking-wider uppercase",
      borderRadius: "rounded-xl",
      cardRadius: "rounded-xl",
      shadow: "shadow-[0_6px_16px_rgba(0,0,0,0.5)]",
      hoverShadow: "hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)]",
      innerShadow: "before:content-[''] before:absolute before:inset-0 before:rounded-xl before:shadow-inset-[0_3px_6px_rgba(0,0,0,0.4)]",
      primary: "text-amber-300",
      background: "bg-gradient-to-br from-stone-900 via-stone-800 to-black",
      
      card: {
        container: "bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 border border-amber-900/30 rounded-xl relative overflow-hidden",
        inner: "border border-amber-900/40 bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg",
        content: "border border-amber-800/30 bg-stone-950/90 rounded-md",
        header: "border border-amber-900/50 bg-gradient-to-r from-amber-900/10 to-amber-900/5 text-amber-300 rounded-lg"
      },
      
      panel: {
        container: "bg-gradient-to-br from-stone-900 via-stone-950 to-slate-900 border border-stone-950 rounded-xl relative overflow-hidden",
        inner: "border border-orange-900/60 bg-gradient-to-br from-stone-800 to-stone-950 rounded-lg", 
        content: "border border-amber-800/30 bg-slate-950/50 rounded-md",
        text: "text-stone-300"
      },
      
      button: {
        wood: "border border-amber-900/40 bg-gradient-to-br from-amber-900 to-amber-800 text-amber-100 shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)] active:translate-y-1 active:shadow-[0_3px_8px_rgba(0,0,0,0.4)]",
        sand: "border border-yellow-900/40 bg-gradient-to-br from-yellow-800 to-yellow-700 text-yellow-50 shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)] active:translate-y-1 active:shadow-[0_3px_8px_rgba(0,0,0,0.4)]",
        redRoyal: "border border-amber-900 bg-gradient-to-br from-red-900 to-red-800 text-amber-100 shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)] active:translate-y-1 active:shadow-[0_3px_8px_rgba(0,0,0,0.4)]",
        blueRoyal: "border border-blue-950 bg-gradient-to-br from-blue-900 to-blue-800 text-blue-100 shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)] active:translate-y-1 active:shadow-[0_3px_8px_rgba(0,0,0,0.4)]",
        danger: "border border-red-950 bg-gradient-to-br from-red-900 to-red-800 text-red-100 shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)] active:translate-y-1 active:shadow-[0_3px_8px_rgba(0,0,0,0.4)]",
        secondary: "border border-stone-900 bg-gradient-to-br from-stone-800 to-stone-700 text-stone-200 shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)] active:translate-y-1 active:shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
      },
      
      progress: {
        track: "border border-amber-800 bg-gradient-to-br from-amber-900/20 to-amber-800/10 rounded-full",
        fill: "from-amber-600 to-orange-700",
        text: "text-amber-400"
      },
      
      badge: {
        info: "border border-blue-900 bg-gradient-to-br from-blue-800 to-blue-900 text-blue-100",
        success: "border border-emerald-900 bg-gradient-to-br from-emerald-800 to-emerald-900 text-emerald-100",
        warning: "border border-amber-900 bg-gradient-to-br from-amber-800 to-amber-900 text-amber-100",
        danger: "border border-red-900 bg-gradient-to-br from-red-800 to-red-900 text-red-100"
      },
      
      accent: "amber",
      grain: "dark-fantasy",
      ornament: "spike"
    };
  }

  // ROYAL MEDIEVAL
  return {
    font: "font-serif",
    titleFont: "font-serif font-bold tracking-widest uppercase",
    borderRadius: "rounded-xl",
    cardRadius: "rounded-xl",
    shadow: "shadow-[0_8px_24px_rgba(0,0,0,0.6)]",
    hoverShadow: "hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)]",
    innerShadow: "before:content-[''] before:absolute before:inset-0 before:rounded-xl before:shadow-inset-[0_4px_8px_rgba(255,215,0,0.3)]",
    primary: "text-amber-100",
    background: "bg-gradient-to-br from-red-900 via-amber-900 to-orange-900",
    
    card: {
      container: "bg-gradient-to-br from-amber-800 via-orange-800 to-red-800 border border-amber-800 rounded-xl relative overflow-hidden",
      inner: "border border-amber-600/60 bg-gradient-to-br from-amber-700 to-orange-800 rounded-lg",
      content: "border border-amber-500/40 bg-amber-900/80 rounded-md",
      header: "border border-amber-600/60 bg-gradient-to-r from-amber-700/30 to-amber-600/20 text-amber-200 rounded-lg"
    },
    
    panel: {
      container: "bg-gradient-to-br from-amber-800 via-orange-800 to-red-800 border border-amber-700 rounded-xl relative overflow-hidden",
      inner: "border border-amber-600/70 bg-gradient-to-br from-amber-700 to-orange-800 rounded-lg",
      content: "border border-amber-500/40 bg-amber-800/60 rounded-md",
      text: "text-amber-200"
    },
    
    button: {
      wood: "border border-amber-800 bg-gradient-to-br from-amber-700 to-orange-800 text-amber-50 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)] active:translate-y-1 active:shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
      sand: "border border-yellow-800 bg-gradient-to-br from-yellow-600 to-amber-700 text-yellow-50 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)] active:translate-y-1 active:shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
      redRoyal: "border border-red-800 bg-gradient-to-br from-red-600 to-red-800 text-red-50 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)] active:translate-y-1 active:shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
      blueRoyal: "border border-blue-800 bg-gradient-to-br from-blue-600 to-blue-800 text-blue-50 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)] active:translate-y-1 active:shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
      danger: "border border-red-950 bg-gradient-to-br from-red-700 to-red-900 text-red-50 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)] active:translate-y-1 active:shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
      secondary: "border border-stone-900 bg-gradient-to-br from-stone-600 to-stone-800 text-stone-100 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)] active:translate-y-1 active:shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
    },
    
    progress: {
      track: "border border-amber-700 bg-gradient-to-br from-amber-800/20 to-amber-700/10 rounded-full",
      fill: "from-amber-400 to-orange-500",
      text: "text-amber-200"
    },
    
    badge: {
      info: "border border-blue-800 bg-gradient-to-br from-blue-700 to-blue-800 text-blue-100",
      success: "border border-emerald-800 bg-gradient-to-br from-emerald-700 to-emerald-800 text-emerald-100",
      warning: "border border-amber-800 bg-gradient-to-br from-amber-700 to-amber-800 text-amber-100", 
      danger: "border border-red-800 bg-gradient-to-br from-red-700 to-red-800 text-red-100"
    },
    
    accent: "gold",
    grain: "royal-medieval",
    ornament: "crest"
  };
};

// ========== ÍCONES SVG INTEGRADOS ==========

const FlowerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <path d="M12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
);

const SpikeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5zM2 17l10-5v10L2 17zm20 0l-10-5v10l10-5z"/>
  </svg>
);

const CrestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5zM2 17l10-5v10L2 17zm20 0l-10-5v10l10-5z"/>
    <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
);

// ========== COMPONENTES AUXILIARES COM DETALHES TEMÁTICOS ==========

function ThemeOrnament({ type, theme }: { type: string; theme: string }) {
  if (theme === "kawaii") {
    return (
      <div className="absolute top-2 right-2 text-pink-400 text-lg animate-bounce">
        <FlowerIcon />
      </div>
    );
  }

  if (theme === "dark-fantasy") {
    return (
      <div className="absolute top-2 right-2 text-amber-700 text-sm opacity-60">
        <SpikeIcon />
      </div>
    );
  }

  // royal-medieval
  return (
    <div className="absolute top-2 right-2 text-amber-300 text-sm animate-pulse">
      <CrestIcon />
    </div>
  );
}

function ThemeGrain({ type }: { type: string }) {
  const grainStyles: Record<string, string> = {
    "kawaii": `
      radial-gradient(circle at 30% 30%, rgba(249, 168, 212, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(196, 181, 253, 0.12) 0%, transparent 50%),
      repeating-linear-gradient(60deg, transparent, transparent 5px, rgba(255, 255, 255, 0.3) 5px, rgba(255, 255, 255, 0.3) 6px)
    `,
    "dark-fantasy": `
      radial-gradient(circle at 20% 20%, rgba(120, 53, 15, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(180, 83, 9, 0.1) 0%, transparent 50%),
      repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0, 0, 0, 0.08) 3px, rgba(0, 0, 0, 0.08) 4px)
    `,
    "royal-medieval": `
      radial-gradient(circle at 15% 15%, rgba(245, 158, 11, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 85% 85%, rgba(217, 119, 6, 0.12) 0%, transparent 60%),
      repeating-linear-gradient(30deg, transparent, transparent 2px, rgba(245, 158, 11, 0.05) 2px, rgba(245, 158, 11, 0.05) 3px)
    `
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none rounded-3xl opacity-30"
      style={{
        backgroundImage: grainStyles[type] || grainStyles["dark-fantasy"]
      }}
    />
  );
}

function ThemeStatusLights({ theme }: { theme: string }) {
  if (theme === "kawaii") {
    return (
      <div className="flex gap-1">
        <span className="h-2 w-2 rounded-full bg-pink-400 animate-ping" style={{ animationDuration: '2s' }} />
        <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
      </div>
    );
  }

  const color = theme === "royal-medieval" ? "bg-amber-400" : "bg-amber-600";
  return (
    <div className="flex gap-1">
      <span className={`h-3 w-3 rounded-sm ${color} animate-pulse`} style={{ animationDuration: '3s' }} />
      <span className={`h-3 w-3 rounded-sm ${color} animate-pulse`} style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
    </div>
  );
}

// ========== COMPONENTES PRINCIPAIS COM EFEITO 3D CARTOON E ÍCONES SVG ==========

export function CardWooden({ title, subtitle, children, className }: CardWoodenProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  return (
    <article className={`relative ${styles.cardRadius} ${styles.card.container} p-4 ${styles.shadow} ${styles.innerShadow} ${className ?? ""}`}>
      <ThemeOrnament type={styles.ornament} theme={theme} />
      <ThemeGrain type={styles.grain} />
      
      <div className={`relative ${styles.cardRadius} ${styles.card.inner} p-3`}>
        <div className={`rounded-xl ${styles.card.content} p-3`}>
          {(title || subtitle) && (
            <header className={`flex items-center justify-between gap-2 rounded-xl ${styles.card.header} p-3 mb-3 ${styles.titleFont}`}>
              <div className="space-y-1">
                {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
                {title && <h3 className="text-base font-bold">{title}</h3>}
              </div>
              <ThemeStatusLights theme={theme} />
            </header>
          )}
          <div className={`rounded-xl p-3 ${styles.primary} ${styles.font} shadow-inner`}>
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}

export function WoodPanel({ children, className }: WoodPanelProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const panelStyles = styles.panel ?? {
    container: "",
    inner: "",
    content: "",
    text: ""
  };

  return (
    <div className={`relative ${styles.cardRadius} ${panelStyles.container} p-4 ${styles.shadow} ${styles.innerShadow} ${className ?? ""}`}>
      <ThemeOrnament type={styles.ornament} theme={theme} />
      <ThemeGrain type={styles.grain} />
      
      <div className={`relative ${styles.cardRadius} ${panelStyles.inner} p-3`}>
        <div className={`rounded-xl ${panelStyles.content} p-3`}>
          <div className={`rounded-xl p-3 ${panelStyles.text} ${styles.font} shadow-inner`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MedievalSection({ title, children, className }: MedievalSectionProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const borderThemeClasses = {
    "dark-fantasy": "border-amber-900/40",
    "royal-medieval": "border-amber-600/50", 
    "kawaii": "border-pink-300/50"
  };

  const bgThemeClasses = {
    "dark-fantasy": "from-amber-800/50 via-amber-600/30 to-transparent",
    "royal-medieval": "from-amber-700/60 via-amber-500/40 to-transparent",
    "kawaii": "from-pink-300/30 via-purple-300/30 to-blue-300/30"
  };

  return (
    <WoodPanel className={`p-3 ${className ?? ""}`}>
      <div className={`flex items-center gap-3 border-b-2 ${borderThemeClasses[theme]} pb-3 mb-3`}>
        <MedievalTitle>{title}</MedievalTitle>
        <div className={`h-px flex-1 bg-gradient-to-r ${bgThemeClasses[theme]}`} />
      </div>
      <div className={`${styles.primary} ${styles.font}`}>{children}</div>
    </WoodPanel>
  );
}

export function RoyalSection({ title, children, variant = "redRoyal", className }: RoyalSectionProps) {
  const palettes = {
    redRoyal: {
      border: "border-4 border-amber-900",
      bg: "bg-red-900", 
      text: "text-amber-100",
      accent: "border-amber-800"
    },
    blueRoyal: {
      border: "border-4 border-blue-950",
      bg: "bg-blue-900",
      text: "text-blue-100", 
      accent: "border-cyan-900"
    }
  };
  
  const theme = palettes[variant];
  
  return (
    <div className={`rounded-xl ${theme.border} ${theme.bg} p-4 shadow-xl ${className ?? ""}`}>
      <div className={`rounded-xl border-2 ${theme.accent} bg-black/30 p-4`}>
        <div className="flex items-center gap-3 border-b border-amber-800 pb-3">
          <MedievalTitle>{title}</MedievalTitle>
        </div>
        <div className="pt-3 text-sm">{children}</div>
      </div>
    </div>
  );
}

export function MedievalCard({ title, subtitle, children, className, size = "md" }: MedievalCardProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4"
  };

  return (
    <div className={`relative ${styles.cardRadius} ${styles.card.container} ${sizeClasses[size]} ${styles.shadow} ${styles.hoverShadow} transition-all duration-300 ${className ?? ""}`}>
      <ThemeOrnament type={styles.ornament} theme={theme} />
      <ThemeGrain type={styles.grain} />
      
      <div className={`relative ${styles.cardRadius} ${styles.card.inner} p-3`}>
        <div className={`rounded-xl ${styles.card.content} p-3`}>
          {(title || subtitle) && (
            <div className={`flex items-center justify-between gap-2 rounded-xl ${styles.card.header} p-3 mb-3 ${styles.titleFont}`}>
              <div>
                {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
                {title && <p className={`text-sm font-semibold ${styles.primary}`}>{title}</p>}
              </div>
              <ThemeStatusLights theme={theme} />
            </div>
          )}
          <div className={`rounded-xl p-3 ${styles.primary} ${styles.font} shadow-inner`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoyalCard({ title, subtitle, children, variant = "redRoyal", className }: RoyalCardProps) {
  const palettes = {
    redRoyal: {
      border: "border-4 border-amber-900",
      bg: "bg-red-900",
      text: "text-amber-100",
      accent: "border-amber-800"
    },
    blueRoyal: {
      border: "border-4 border-blue-950", 
      bg: "bg-blue-900",
      text: "text-blue-100",
      accent: "border-cyan-900"
    }
  };
  
  const theme = palettes[variant];

  return (
    <div className={`rounded-xl ${theme.border} ${theme.bg} p-4 shadow-xl ${className ?? ""}`}>
      <div className={`rounded-xl border-2 ${theme.accent} bg-black/30 p-4`}>
        {(title || subtitle) && (
          <div className="flex items-center justify-between gap-2 border-b border-amber-800 pb-3">
            <div>
              {subtitle && <p className="text-[11px] uppercase tracking-widest text-amber-300">{subtitle}</p>}
              {title && <p className="text-sm font-semibold text-amber-50">{title}</p>}
            </div>
          </div>
        )}
        <div className="pt-3 text-sm">{children}</div>
      </div>
    </div>
  );
}

export function MedievalTitle({ children }: MedievalTitleProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const dotColor = theme === "kawaii" 
    ? "bg-pink-400" 
    : theme === "royal-medieval" 
      ? "bg-amber-500" 
      : "bg-amber-600";

  return (
    <div className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${styles.titleFont} ${styles.shadow}`}>
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      <span>{children}</span>
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
    </div>
  );
}

export function MedievalIconFrame({ className, children, size = "md" }: MedievalIconFrameProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-20 w-20", 
    lg: "h-24 w-24"
  };

  if (theme === "kawaii") {
    return (
      <div className={`flex ${sizeClasses[size]} items-center justify-center rounded-2xl border border-pink-300 bg-gradient-to-br from-pink-100 to-purple-100 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:scale-110 ${className ?? ""}`}>
        <ThemeGrain type="kawaii" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className={`flex ${sizeClasses[size]} items-center justify-center rounded-xl border border-amber-800 bg-gradient-to-br from-amber-200 to-orange-300 shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:scale-110 ${className ?? ""}`}>
      <ThemeGrain type={styles.grain} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function ProgressWoodenBar({ value, max, colorClass, label, size = "md", showPercentage = false }: ProgressWoodenBarProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);
  
  const safeMax = max > 0 ? max : 1;
  const ratio = Math.max(0, Math.min(1, value / safeMax));
  const width = `${(ratio * 100).toFixed(1)}%`;
  const percentage = `${(ratio * 100).toFixed(0)}%`;
  const innerColor = colorClass ?? styles.progress.fill;
  
  const sizeClasses = {
    sm: "h-3",
    md: "h-4", 
    lg: "h-5"
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm font-bold">
          <span className={styles.progress.text}>{label}</span>
          <span className={styles.progress.text}>{showPercentage ? percentage : `${value}/${max}`}</span>
        </div>
      )}
      <div className={`${sizeClasses[size]} w-full rounded-full ${styles.progress.track} ${styles.shadow} overflow-hidden relative`}>
        <div className={`h-full bg-gradient-to-r ${innerColor} transition-all duration-700 ease-out relative rounded-full`} style={{ width }}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent rounded-full" />
          {theme === "kawaii" && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse" />
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-bold ${styles.progress.text} drop-shadow-sm`}>{percentage}</span>
        </div>
      </div>
    </div>
  );
}

export function WoodenButton({ 
  label, 
  className, 
  variant = "wood", 
  onClick, 
  disabled = false,
  size = "md",
  fullWidth = false
}: WoodenButtonProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const base = "relative inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = {
    sm: "h-9 px-3 text-xs rounded-lg",
    md: "h-11 px-4 text-sm rounded-xl",
    lg: "h-13 px-6 text-base rounded-2xl"
  };

  const buttonStyle = styles.button[variant as keyof typeof styles.button] || styles.button.wood;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizeClasses[size]} ${buttonStyle} ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
    >
      <ThemeGrain type={styles.grain} />
      <span className="relative z-10 flex items-center gap-2">{label}</span>
    </button>
  );
}

export function InventorySlot({ item, count, onClick, active, disabled, rarity = "common" }: InventorySlotProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const rarityBorders = {
    common: theme === "kawaii" ? "border-pink-300" : "border-amber-700",
    uncommon: theme === "kawaii" ? "border-green-400" : "border-green-600",
    rare: theme === "kawaii" ? "border-blue-400" : "border-blue-600",
    epic: theme === "kawaii" ? "border-purple-400" : "border-purple-600",
    legendary: theme === "kawaii" ? "border-pink-400 shadow-lg shadow-pink-400/40" : "border-amber-400 shadow-lg shadow-amber-400/40"
  };

  const bgActive = theme === "kawaii" 
    ? "bg-gradient-to-br from-pink-300 to-purple-400 border-pink-400 scale-110"
    : theme === "royal-medieval"
      ? "bg-gradient-to-br from-amber-700 to-orange-800 border-amber-600 scale-110"
      : "bg-gradient-to-br from-amber-800 to-orange-900 border-amber-600 scale-110";

  const bgDefault = theme === "kawaii"
    ? `bg-gradient-to-br from-pink-100 to-purple-100 ${rarityBorders[rarity]}`
    : theme === "royal-medieval"
      ? `bg-gradient-to-br from-amber-700 to-orange-800 ${rarityBorders[rarity]}`
      : `bg-gradient-to-br from-stone-800 to-stone-900 ${rarityBorders[rarity]}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-20 h-20 rounded-2xl border-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95 ${active ? bgActive : bgDefault} ${styles.shadow}`}
    >
      <ThemeGrain type={styles.grain} />
      
      {item && (
        <>
          <div className="absolute inset-0 flex items-center justify-center text-4xl z-10 drop-shadow-lg">
            {item}
          </div>
          {count !== undefined && (
            <div className="absolute bottom-1 right-1 bg-gradient-to-br from-amber-300 to-orange-400 border-2 border-amber-800 rounded-full px-2 py-1 text-xs text-amber-900 font-bold shadow-lg z-20 transform hover:scale-110 transition-all duration-200">
              {count}
            </div>
          )}
        </>
      )}
      
      {rarity === "legendary" && (
        <div className="absolute -top-1 -right-1 rounded-full border border-amber-300 bg-gradient-to-br from-amber-200 to-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-amber-950 shadow-md">
          L
        </div>
      )}
    </button>
  );
}

export function WoodenInput({ value, onChange, placeholder, disabled, className }: WoodenInputProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const inputStyles = {
    "dark-fantasy": "border-amber-800 bg-gradient-to-br from-amber-100 to-orange-200 text-amber-900 placeholder-amber-700/60 focus:border-pink-600 focus:ring-pink-400/30",
    "royal-medieval": "border-amber-700 bg-gradient-to-br from-amber-50 to-orange-100 text-amber-800 placeholder-amber-600/60 focus:border-pink-500 focus:ring-pink-300/30",
    "kawaii": "border-pink-300 bg-gradient-to-br from-pink-50 to-purple-50 text-pink-800 placeholder-pink-600/60 focus:border-pink-400 focus:ring-pink-300/30"
  };

  return (
    <div className={`relative rounded-2xl ${className ?? ""}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full h-12 px-4 rounded-2xl border-2 ${inputStyles[theme]} focus:outline-none focus:ring-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg font-medium text-base`}
      />
      <ThemeGrain type={styles.grain} />
    </div>
  );
}

export function FofoCard({ children, variant = "cloud", className }: FofoCardProps) {
  const variantClasses = {
    cloud: "rounded-3xl bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 border-2 border-pink-200 shadow-soft",
    wave: "rounded-3xl bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 border-2 border-blue-200 shadow-soft"
  };

  return (
    <div className={`relative ${variantClasses[variant]} p-6 ${className ?? ""}`}>
      <div className="relative z-10">
        {children}
      </div>
      <ThemeGrain type="kawaii" />
    </div>
  );
}

export function WoodenBadge({ children, variant = "info", size = "sm" }: WoodenBadgeProps) {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm"
  };

  return (
    <span
      className={`inline-flex items-center rounded-2xl border-2 ${styles.badge[variant]} ${sizes[size]} font-bold uppercase tracking-wide shadow-lg transform hover:scale-105 transition-all duration-200`}
    >
      {children}
    </span>
  );
}