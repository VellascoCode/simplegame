import type { ReactNode } from "react";

import { useTheme } from "@/components/ThemeProvider";

type CardWoodenProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  subtitle?: string;
};

export function CardWooden({ title, subtitle, children, className }: CardWoodenProps) {
  const { theme } = useTheme();

  const themeClasses = {
    "dark-fantasy": "bg-gradient-to-br from-stone-900 via-stone-950 to-black border-4 border-stone-950",
    "royal-medieval": "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 border-4 border-amber-800",
    kawaii: "bg-gradient-to-br from-pastel-pink via-pastel-lilac to-pastel-blue border-6 border-pastel-pinkDark shadow-bubble"
  };

  const innerThemeClasses = {
    "dark-fantasy": "border-4 border-amber-900/40 bg-gradient-to-br from-stone-900 to-slate-800",
    "royal-medieval": "border-4 border-amber-600/50 bg-gradient-to-br from-amber-800 to-orange-900",
    kawaii: "border-6 border-pastel-lilacDark/40 bg-gradient-to-br from-pastel-cream to-pastel-mint"
  };

  const contentThemeClasses = {
    "dark-fantasy": "border-2 border-amber-800/30 bg-stone-950",
    "royal-medieval": "border-2 border-amber-500/40 bg-amber-900/80",
    kawaii: "border-4 border-pastel-blueDark/30 bg-pastel-cream"
  };

  return (
    <article className={`relative rounded-sm ${themeClasses[theme]} p-3 shadow-2xl ${className ?? ""}`}>
      <Nails />
      <WoodGrain />
      <div className={`relative rounded-sm ${innerThemeClasses[theme]} p-2`}>
        <div className={`rounded-sm ${contentThemeClasses[theme]} p-2`}>
          {(title || subtitle) && (
            <header className="flex items-center justify-between gap-2 rounded-sm border-2 border-amber-900/50 bg-gradient-to-r from-stone-900 to-stone-950 p-3 mb-2 transition-all duration-200">
              <div className="space-y-1">
                {subtitle && <p className="text-xs uppercase tracking-widest text-amber-700/80">{subtitle}</p>}
                {title && <h3 className="text-base font-semibold text-amber-300">{title}</h3>}
              </div>
              <div className="flex gap-1">
                <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-950 animate-pulse" style={{animationDuration: '3s'}} />
                <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-950 animate-pulse" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
              </div>
            </header>
          )}
          <div className="rounded-sm border-2 border-amber-900/30 bg-gradient-to-br from-stone-800 to-stone-900 p-3 text-stone-300 shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}

type WoodPanelProps = {
  children: ReactNode;
  className?: string;
};

export function WoodPanel({ children, className }: WoodPanelProps) {
  const { theme } = useTheme();

  const themeClasses = {
    "dark-fantasy": "bg-gradient-to-br from-stone-900 via-stone-950 to-slate-900 border-4 border-stone-950",
    "royal-medieval": "bg-gradient-to-br from-amber-800 via-orange-800 to-red-800 border-4 border-amber-700",
    kawaii: "bg-gradient-to-br from-pastel-pink via-pastel-lilac to-pastel-blue border-4 border-pastel-pinkDark"
  };

  const innerThemeClasses = {
    "dark-fantasy": "border-4 border-orange-900/60 bg-gradient-to-br from-stone-800 to-stone-950",
    "royal-medieval": "border-4 border-amber-600/70 bg-gradient-to-br from-amber-700 to-orange-800",
    kawaii: "border-4 border-pastel-lilacDark/60 bg-gradient-to-br from-pastel-mint to-pastel-cream"
  };

  const contentThemeClasses = {
    "dark-fantasy": "border-2 border-amber-800/30 bg-slate-950/50",
    "royal-medieval": "border-2 border-amber-500/40 bg-amber-800/60",
    kawaii: "border-2 border-pastel-blueDark/30 bg-pastel-cream/90"
  };

  return (
    <div className={`relative rounded-md ${themeClasses[theme]} p-3 shadow-2xl ${className ?? ""}`}>
      <Nails />
      <WoodGrain />
      <div className={`relative rounded-md ${innerThemeClasses[theme]} p-2`}>
        <div className={`rounded-md ${contentThemeClasses[theme]} p-2`}>
          <div className="rounded-md border-2 border-amber-900/30 bg-gradient-to-br from-stone-800 to-stone-900 p-3 text-stone-300 shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

type MedievalSectionProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export function MedievalSection({ title, children, className }: MedievalSectionProps) {
  const { theme } = useTheme();

  const borderThemeClasses = {
    "dark-fantasy": "border-amber-900/40",
    "royal-medieval": "border-amber-600/50",
    kawaii: "border-amber-700/60"
  };

  const bgThemeClasses = {
    "dark-fantasy": "from-amber-800/50 via-amber-600/30 to-transparent",
    "royal-medieval": "from-amber-700/60 via-amber-500/40 to-transparent",
    kawaii: "from-pastel-pink/30 via-pastel-lilac/30 to-pastel-blue/30"
  };

  return (
    <WoodPanel className={`p-3 ${className ?? ""}`}>
      <div className={`flex items-center gap-3 border-b-2 ${borderThemeClasses[theme]} pb-3 mb-3`}>
        <MedievalTitle>{title}</MedievalTitle>
        <div className={`h-px flex-1 bg-gradient-to-r ${bgThemeClasses[theme]}`} />
      </div>
      <div className="text-stone-300">{children}</div>
    </WoodPanel>
  );
}

type RoyalSectionProps = {
  title: ReactNode;
  children: ReactNode;
  variant?: "redRoyal" | "blueRoyal";
  className?: string;
};

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
    <div className={`rounded-md ${theme.border} ${theme.bg} p-3 shadow-xl ${className ?? ""}`}>
      <div className={`rounded-md border-2 ${theme.accent} bg-black/30 p-3`}>
        <div className="flex items-center gap-3 border-b border-amber-800 pb-3">
          <MedievalTitle>{title}</MedievalTitle>
        </div>
        <div className="pt-3 text-sm">{children}</div>
      </div>
    </div>
  );
}

type MedievalCardProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function MedievalCard({ title, subtitle, children, className, size = "md" }: MedievalCardProps) {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3"
  };

  const themeClasses = {
    "dark-fantasy": "bg-gradient-to-br from-stone-900 to-black border-4 border-stone-950",
    "royal-medieval": "bg-gradient-to-br from-amber-800 to-orange-900 border-4 border-amber-700",
    kawaii: "bg-gradient-to-br from-pastel-pink via-pastel-lilac to-pastel-blue border-2 border-pastel-pinkDark shadow-soft"
  };

  const innerThemeClasses = {
    "dark-fantasy": "border-4 border-amber-900/40 bg-stone-950",
    "royal-medieval": "border-4 border-amber-600/50 bg-amber-800/80",
    kawaii: "border-2 border-pastel-lilacDark/40 bg-pastel-cream"
  };

  const contentThemeClasses = {
    "dark-fantasy": "border-2 border-amber-800/30 bg-stone-900",
    "royal-medieval": "border-2 border-amber-500/40 bg-amber-700/70",
    kawaii: "border-2 border-pastel-blueDark/30 bg-pastel-mint"
  };

  const headerThemeClasses = {
    "dark-fantasy": "border-2 border-amber-900/50 bg-gradient-to-r from-stone-900 to-stone-950",
    "royal-medieval": "border-2 border-amber-700/60 bg-gradient-to-r from-amber-800 to-orange-800",
    kawaii: "border-2 border-pastel-pinkDark/50 bg-gradient-to-r from-pastel-mint to-pastel-cream"
  };

  const textThemeClasses = {
    "dark-fantasy": "text-amber-300",
    "royal-medieval": "text-amber-200",
    kawaii: "text-pastel-pinkDark drop-shadow-sm"
  };

  return (
    <div className={`relative rounded-xl ${themeClasses[theme]} ${sizeClasses[size]} shadow-kawaii hover:shadow-kawaii-hover transition-all duration-500 transform hover:scale-105 hover:-rotate-1 ${className ?? ""}`}>
      {theme !== "kawaii" && <Nails small />}
      {theme !== "kawaii" && <WoodGrain opacity={0.3} />}
      <div className={`relative rounded-xl ${innerThemeClasses[theme]} p-2`}>
        <div className={`rounded-xl ${contentThemeClasses[theme]} p-2`}>
          {(title || subtitle) && (
            <div className={`flex items-center justify-between gap-2 rounded-lg ${headerThemeClasses[theme]} p-3 mb-2`}>
              <div>
                {subtitle && <p className="text-xs uppercase tracking-widest text-amber-700/80">{subtitle}</p>}
                {title && <p className={`text-sm font-semibold ${textThemeClasses[theme]}`}>{title}</p>}
              </div>
              <span className="h-3 w-3 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-950 shadow-md animate-pulse" />
            </div>
          )}
          <div className={`rounded-lg border-2 ${theme === "kawaii" ? "border-pastel-blueDark/30 bg-gradient-to-br from-pastel-cream to-pastel-mint" : "border-amber-900/30 bg-gradient-to-br from-stone-800 to-stone-900"} p-3 ${theme === "kawaii" ? "text-pastel-pinkDark" : "text-stone-300"} shadow-inner`}>
            {children}
          </div>
        </div>
      </div>
      {theme === "kawaii" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </>
      )}
    </div>
  );
}

type RoyalCardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  variant?: "redRoyal" | "blueRoyal";
  className?: string;
};

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
    <div className={`rounded-md ${theme.border} ${theme.bg} p-3 shadow-xl ${className ?? ""}`}>
      <div className={`rounded-md border-2 ${theme.accent} bg-black/30 p-3`}>
        {(title || subtitle) && (
          <div className="flex items-center justify-between gap-2 border-b border-amber-800 pb-2">
            <div>
              {subtitle && <p className="text-[11px] uppercase tracking-widest text-amber-300">{subtitle}</p>}
              {title && <p className="text-sm font-semibold text-amber-50">{title}</p>}
            </div>
          </div>
        )}
        <div className="pt-2 text-sm">{children}</div>
      </div>
    </div>
  );
}

type MedievalTitleProps = {
  children: ReactNode;
};

export function MedievalTitle({ children }: MedievalTitleProps) {
  const { theme } = useTheme();

  const themeClasses = {
    "dark-fantasy": "border-amber-900/50 bg-gradient-to-r from-stone-900 to-stone-950 text-amber-300",
    "royal-medieval": "border-amber-700/60 bg-gradient-to-r from-amber-800 to-orange-800 text-amber-200",
    kawaii: "border-pastel-pinkDark/50 bg-gradient-to-r from-pastel-mint to-pastel-cream text-pastel-pinkDark"
  };

  const dotThemeClasses = {
    "dark-fantasy": "from-cyan-600 to-cyan-800 border-cyan-950",
    "royal-medieval": "from-amber-500 to-orange-600 border-amber-800",
    kawaii: "from-pink-400 to-purple-500 border-pink-700"
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-sm border-2 ${themeClasses[theme]} px-3 py-2 text-sm font-semibold tracking-widest shadow-lg`}>
      <span className={`h-2 w-2 rounded-sm bg-gradient-to-br ${dotThemeClasses[theme]} shadow-inner`} />
      <span>{children}</span>
      <span className={`h-2 w-2 rounded-sm bg-gradient-to-br ${dotThemeClasses[theme]} shadow-inner`} />
    </div>
  );
}

type MedievalIconFrameProps = {
  className?: string;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
};

export function MedievalIconFrame({ className, children, size = "md" }: MedievalIconFrameProps) {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-20 w-20",
    lg: "h-24 w-24"
  };
  
  return (
    <div
      className={`flex ${sizeClasses[size]} items-center justify-center rounded-xl border bg-gradient-to-br from-pastel-pink via-pastel-lilac to-pastel-mint shadow-kawaii hover:shadow-kawaii-hover transition-all duration-300 transform hover:scale-110 ${className ?? ""}`}
    >
      <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-white/40 via-pastel-cream/30 to-transparent" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

type ProgressWoodenBarProps = {
  value: number;
  max: number;
  colorClass?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
};

export function ProgressWoodenBar({ value, max, colorClass, label, size = "md", showPercentage = false }: ProgressWoodenBarProps) {
  const { theme } = useTheme();
  const safeMax = max > 0 ? max : 1;
  const ratio = Math.max(0, Math.min(1, value / safeMax));
  const width = `${(ratio * 100).toFixed(1)}%`;
  const percentage = `${(ratio * 100).toFixed(0)}%`;
  const innerColor = colorClass ?? "from-pink-400 via-purple-400 to-blue-400";
  
  const sizeClasses = {
    sm: "h-3",
    md: "h-4",
    lg: "h-5"
  };

  const themeClasses = {
    "dark-fantasy": {
      label: "text-amber-800",
      value: "text-amber-900",
      border: "border-amber-800",
      bg: "bg-gradient-to-br from-amber-200 to-orange-300",
      text: "text-amber-900"
    },
    "royal-medieval": {
      label: "text-amber-700",
      value: "text-amber-800",
      border: "border-amber-700",
      bg: "bg-gradient-to-br from-amber-100 to-orange-200",
      text: "text-amber-800"
    },
    kawaii: {
      label: "text-pastel-pinkDark",
      value: "text-pastel-blueDark",
      border: "border-pastel-pinkDark",
      bg: "bg-gradient-to-br from-pastel-cream to-pastel-mint",
      text: "text-pastel-pinkDark"
    }
  };

  const currentTheme = themeClasses[theme as keyof typeof themeClasses];

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm font-bold">
          <span className={`flex items-center gap-2 ${currentTheme.label}`}>
            <span className="animate-pulse">💫</span>
            {label}
          </span>
          <span className={`${currentTheme.value} drop-shadow-sm`}>{showPercentage ? percentage : `${value}/${max}`}</span>
        </div>
      )}
      <div className={`${sizeClasses[size]} w-full rounded-xl border-2 ${currentTheme.border} ${currentTheme.bg} shadow-soft overflow-hidden relative transform hover:scale-102 transition-all duration-300`}>
        <div className={`h-full bg-gradient-to-r ${innerColor} transition-all duration-700 ease-out relative rounded-xl shadow-inner`} style={{ width }}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl animate-pulse" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-bold ${currentTheme.text} drop-shadow-lg`}>{percentage}</span>
        </div>
      </div>
    </div>
  );
}

type WoodenButtonProps = {
  label: string;
  className?: string;
  variant?: "wood" | "sand" | "secondary" | "danger" | "redRoyal" | "blueRoyal";
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

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

  const base = "relative inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105";
  
  const sizeClasses = {
    sm: "h-8 px-2 text-xs rounded",
    md: "h-10 px-4 text-sm rounded-md",
    lg: "h-12 px-6 text-base rounded-md"
  };

  const getVariantClasses = (variant: string) => {
    const variants = {
      "dark-fantasy": {
        wood: {
          bg: "bg-amber-900",
          border: "border-4 border-amber-950",
          text: "text-amber-50",
          shadow: "shadow-md shadow-black/50 hover:shadow-lg active:shadow-inner",
          hover: "hover:bg-amber-800",
          nails: "from-yellow-600 to-yellow-800 border-yellow-950"
        },
        sand: {
          bg: "bg-yellow-800",
          border: "border-4 border-yellow-950",
          text: "text-yellow-50",
          shadow: "shadow-md shadow-black/50 hover:shadow-lg active:shadow-inner",
          hover: "hover:bg-yellow-700",
          nails: "from-amber-500 to-amber-700 border-amber-900"
        },
        redRoyal: {
          bg: "bg-red-900",
          border: "border-4 border-amber-900",
          text: "text-amber-100",
          shadow: "shadow-lg shadow-black/60 hover:shadow-xl active:shadow-inner",
          hover: "hover:bg-red-800",
          nails: "from-amber-500 to-amber-700 border-amber-900"
        },
        blueRoyal: {
          bg: "bg-blue-900",
          border: "border-4 border-blue-950",
          text: "text-blue-100",
          shadow: "shadow-lg shadow-black/60 hover:shadow-xl active:shadow-inner",
          hover: "hover:bg-blue-800",
          nails: "from-cyan-500 to-cyan-700 border-cyan-900"
        },
        danger: {
          bg: "bg-red-900",
          border: "border-4 border-red-950",
          text: "text-red-50",
          shadow: "shadow-md shadow-black/50 hover:shadow-lg active:shadow-inner",
          hover: "hover:bg-red-800",
          nails: "from-red-600 to-red-800 border-red-950"
        },
        secondary: {
          bg: "bg-stone-800",
          border: "border-4 border-stone-950",
          text: "text-stone-200",
          shadow: "shadow-md shadow-black/50 hover:shadow-lg active:shadow-inner",
          hover: "hover:bg-stone-700",
          nails: "from-slate-500 to-slate-700 border-slate-900"
        }
      },
      "royal-medieval": {
        wood: {
          bg: "bg-gradient-to-br from-amber-600 to-orange-700",
          border: "border-4 border-amber-800",
          text: "text-amber-50",
          shadow: "shadow-lg shadow-amber-900/50 hover:shadow-xl active:shadow-inner",
          hover: "hover:from-amber-700 hover:to-orange-800",
          nails: "from-yellow-500 to-orange-600 border-amber-900"
        },
        sand: {
          bg: "bg-gradient-to-br from-yellow-600 to-amber-700",
          border: "border-4 border-yellow-800",
          text: "text-yellow-50",
          shadow: "shadow-lg shadow-yellow-900/50 hover:shadow-xl active:shadow-inner",
          hover: "hover:from-yellow-700 hover:to-amber-800",
          nails: "from-amber-500 to-yellow-600 border-yellow-900"
        },
        redRoyal: {
          bg: "bg-gradient-to-br from-red-600 to-red-800",
          border: "border-4 border-red-800",
          text: "text-red-50",
          shadow: "shadow-xl shadow-red-900/60 hover:shadow-2xl active:shadow-inner",
          hover: "hover:from-red-700 hover:to-red-900",
          nails: "from-red-500 to-red-700 border-red-900"
        },
        blueRoyal: {
          bg: "bg-gradient-to-br from-blue-600 to-blue-800",
          border: "border-4 border-blue-800",
          text: "text-blue-50",
          shadow: "shadow-xl shadow-blue-900/60 hover:shadow-2xl active:shadow-inner",
          hover: "hover:from-blue-700 hover:to-blue-900",
          nails: "from-cyan-500 to-blue-600 border-blue-900"
        },
        danger: {
          bg: "bg-gradient-to-br from-red-700 to-red-900",
          border: "border-4 border-red-950",
          text: "text-red-50",
          shadow: "shadow-lg shadow-red-900/50 hover:shadow-xl active:shadow-inner",
          hover: "hover:from-red-800 hover:to-red-950",
          nails: "from-red-600 to-red-800 border-red-950"
        },
        secondary: {
          bg: "bg-gradient-to-br from-stone-600 to-stone-800",
          border: "border-4 border-stone-900",
          text: "text-stone-100",
          shadow: "shadow-lg shadow-stone-900/50 hover:shadow-xl active:shadow-inner",
          hover: "hover:from-stone-700 hover:to-stone-900",
          nails: "from-slate-500 to-stone-600 border-stone-900"
        }
      },
      kawaii: {
        wood: {
          bg: "bg-gradient-to-br from-pastel-pink via-pastel-lilac via-pastel-blue to-pastel-mint",
          border: "border",
          text: "text-pastel-pinkDark",
          shadow: "shadow-md",
          hover: "hover:shadow-lg hover:scale-105",
          nails: "from-pastel-mint to-pastel-cream border-pastel-blueDark"
        },
        sand: {
          bg: "bg-gradient-to-br from-pastel-cream via-pastel-mint via-pastel-blue to-pastel-pink",
          border: "border",
          text: "text-pastel-blueDark",
          shadow: "shadow-md",
          hover: "hover:shadow-lg hover:scale-105",
          nails: "from-pastel-pink to-pastel-lilac border-pastel-pinkDark"
        },
        redRoyal: {
          bg: "bg-gradient-to-br from-pastel-pink via-pastel-lilac to-pastel-pink",
          border: "border",
          text: "text-pastel-pinkDark",
          shadow: "shadow-md",
          hover: "hover:shadow-lg hover:scale-105",
          nails: "from-pastel-lilac to-pastel-blue border-pastel-lilacDark"
        },
        blueRoyal: {
          bg: "bg-gradient-to-br from-pastel-blue via-pastel-lilac to-pastel-blue",
          border: "border",
          text: "text-pastel-blueDark",
          shadow: "shadow-md",
          hover: "hover:shadow-lg hover:scale-105",
          nails: "from-pastel-mint to-pastel-cream border-pastel-mintDark"
        },
        danger: {
          bg: "bg-gradient-to-br from-pastel-pink via-red-200 to-pastel-pink",
          border: "border",
          text: "text-pastel-pinkDark",
          shadow: "shadow-md",
          hover: "hover:shadow-lg hover:scale-105",
          nails: "from-red-200 to-pastel-pink border-red-300"
        },
        secondary: {
          bg: "bg-gradient-to-br from-pastel-cream via-pastel-mint to-pastel-cream",
          border: "border",
          text: "text-pastel-mintDark",
          shadow: "shadow-md",
          hover: "hover:shadow-lg hover:scale-105",
          nails: "from-pastel-blue to-pastel-lilac border-pastel-blueDark"
        }
      }
    };

    const themeVariants = variants[theme as keyof typeof variants];
    const variantStyles = themeVariants?.[variant as keyof typeof themeVariants];
    return variantStyles || variants["dark-fantasy"][variant as keyof typeof variants["dark-fantasy"]];
  };

  const currentVariant = getVariantClasses(variant);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizeClasses[size]} ${currentVariant.bg} ${currentVariant.border} ${currentVariant.text} ${currentVariant.shadow} ${currentVariant.hover} ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
    >
      {theme !== "kawaii" && <WoodGrain opacity={0.15} />}
      <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center gap-2">{label}</span>
      {theme === "kawaii" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </>
      ) : (
        <>
          <span className={`absolute top-1 left-1 h-1.5 w-1.5 rounded-md bg-gradient-to-br ${currentVariant.nails} shadow-md`} />
          <span className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-md bg-gradient-to-br ${currentVariant.nails} shadow-md`} />
          <span className={`absolute bottom-1 left-1 h-1.5 w-1.5 rounded-md bg-gradient-to-br ${currentVariant.nails} shadow-md`} />
          <span className={`absolute bottom-1 right-1 h-1.5 w-1.5 rounded-md bg-gradient-to-br ${currentVariant.nails} shadow-md`} />
        </>
      )}
    </button>
  );
}

type InventorySlotProps = {
  item?: string;
  count?: number;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary";
};

export function InventorySlot({ item, count, onClick, active, disabled, rarity = "common" }: InventorySlotProps) {
  const { theme } = useTheme();

  const rarityColors = {
    common: {
      "dark-fantasy": "border-amber-700/60 hover:border-amber-600/80",
      "royal-medieval": "border-amber-600/70 hover:border-amber-500/80",
      kawaii: "border-amber-700/60 hover:border-amber-600/80"
    },
    uncommon: {
      "dark-fantasy": "border-green-600/70 hover:border-green-500/80",
      "royal-medieval": "border-green-600/70 hover:border-green-500/80",
      kawaii: "border-green-600/70 hover:border-green-500/80"
    },
    rare: {
      "dark-fantasy": "border-blue-600/70 hover:border-blue-500/80",
      "royal-medieval": "border-blue-600/70 hover:border-blue-500/80",
      kawaii: "border-blue-600/70 hover:border-blue-500/80"
    },
    epic: {
      "dark-fantasy": "border-purple-600/70 hover:border-purple-500/80",
      "royal-medieval": "border-purple-600/70 hover:border-purple-500/80",
      kawaii: "border-purple-600/70 hover:border-purple-500/80"
    },
    legendary: {
      "dark-fantasy": "border-pink-600/70 hover:border-pink-500/80 shadow-pink-400/30",
      "royal-medieval": "border-pink-600/70 hover:border-pink-500/80 shadow-pink-400/30",
      kawaii: "border-pink-600/70 hover:border-pink-500/80 shadow-pink-400/30"
    }
  };

  const bgColors = {
    "dark-fantasy": active 
      ? "bg-gradient-to-br from-amber-800 to-orange-900 border-amber-600 shadow-2xl scale-110" 
      : `bg-gradient-to-br from-stone-800 to-stone-900 ${rarityColors[rarity][theme]} hover:shadow-xl`,
    "royal-medieval": active 
      ? "bg-gradient-to-br from-amber-700 to-orange-800 border-amber-600 shadow-2xl scale-110" 
      : `bg-gradient-to-br from-amber-700 to-orange-800 ${rarityColors[rarity][theme]} hover:shadow-xl`,
    kawaii: active 
      ? "bg-gradient-to-br from-pastel-pink to-pastel-lilac border-pastel-pinkDark shadow-2xl scale-110" 
      : `bg-gradient-to-br from-pastel-cream to-pastel-mint ${rarityColors[rarity][theme]} hover:shadow-xl`
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-20 h-20 rounded-xl border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${bgColors[theme]}`}
    >
      <WoodGrain opacity={0.15} />
      <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-white/30 to-transparent" />
      {item && (
        <>
          <div className="absolute inset-0 flex items-center justify-center text-4xl z-10 drop-shadow-lg">
            {item}
          </div>
          {count && (
            <div className="absolute bottom-1 right-1 bg-gradient-to-br from-amber-300 to-orange-400 border-2 border-amber-800 rounded-full px-2 py-1 text-xs text-amber-900 font-bold shadow-lg z-20 transform hover:scale-110 transition-all duration-200">
              {count}
            </div>
          )}
        </>
      )}
      {rarity === "legendary" && (
        <div className="absolute -top-1 -right-1 text-yellow-400 text-lg animate-pulse">👑</div>
      )}
    </button>
  );
}

// Novo componente: WoodenInput
type WoodenInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function WoodenInput({ value, onChange, placeholder, disabled, className }: WoodenInputProps) {
  const { theme } = useTheme();

  const themeClasses = {
    "dark-fantasy": {
      border: "border-amber-800",
      bg: "bg-gradient-to-br from-amber-100 to-orange-200",
      text: "text-amber-900",
      placeholder: "placeholder:text-amber-700/60",
      focus: "focus:border-pink-600 focus:ring-pink-400/30"
    },
    "royal-medieval": {
      border: "border-amber-700",
      bg: "bg-gradient-to-br from-amber-50 to-orange-100",
      text: "text-amber-800",
      placeholder: "placeholder:text-amber-600/60",
      focus: "focus:border-pink-500 focus:ring-pink-300/30"
    },
    kawaii: {
      border: "border-pastel-pinkDark",
      bg: "bg-gradient-to-br from-pastel-cream to-pastel-mint",
      text: "text-pastel-pinkDark",
      placeholder: "placeholder:text-pastel-blueDark/60",
      focus: "focus:border-pastel-lilac focus:ring-pastel-lilac/30"
    }
  };

  const currentTheme = themeClasses[theme as keyof typeof themeClasses];

  return (
    <div className={`relative rounded-xl ${className ?? ""}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full h-11 px-4 rounded-xl border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} ${currentTheme.placeholder} focus:outline-none ${currentTheme.focus} transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-medium text-base hover:shadow-lg focus:shadow-lg`}
      />
	      {theme !== "kawaii" && <WoodGrain opacity={0.1} />}
      <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    </div>
  );
}

// Novo componente: FofoCard - Card com molduras onduladas para o tema pastel
type FofoCardProps = {
  children: ReactNode;
  variant?: "cloud" | "wave";
  className?: string;
};

export function FofoCard({ children, variant = "cloud", className }: FofoCardProps) {
  const variantClasses = {
    cloud: "fofo-cloud",
    wave: "fofo-wave"
  };

  return (
    <div className={`relative ${variantClasses[variant]} ${className ?? ""}`}>
      <div className="relative z-10 p-4">
        {children}
      </div>
    </div>
  );
}
type WoodenBadgeProps = {
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "danger";
  size?: "sm" | "md";
};

export function WoodenBadge({ children, variant = "info", size = "sm" }: WoodenBadgeProps) {
  const { theme } = useTheme();

  const variants = {
    info: {
      "dark-fantasy": "bg-gradient-to-br from-blue-800 to-blue-900 border-blue-950 text-blue-100",
      "royal-medieval": "bg-gradient-to-br from-blue-700 to-blue-800 border-blue-900 text-blue-100",
      kawaii: "bg-gradient-to-br from-blue-300 to-purple-400 border-blue-800 text-blue-900"
    },
    success: {
      "dark-fantasy": "bg-gradient-to-br from-emerald-800 to-emerald-900 border-emerald-950 text-emerald-100",
      "royal-medieval": "bg-gradient-to-br from-emerald-700 to-emerald-800 border-emerald-900 text-emerald-100",
      kawaii: "bg-gradient-to-br from-emerald-300 to-green-400 border-emerald-800 text-emerald-900"
    },
    warning: {
      "dark-fantasy": "bg-gradient-to-br from-amber-800 to-amber-900 border-amber-950 text-amber-100",
      "royal-medieval": "bg-gradient-to-br from-amber-700 to-amber-800 border-amber-900 text-amber-100",
      kawaii: "bg-gradient-to-br from-amber-300 to-orange-400 border-amber-800 text-amber-900"
    },
    danger: {
      "dark-fantasy": "bg-gradient-to-br from-red-800 to-red-900 border-red-950 text-red-100",
      "royal-medieval": "bg-gradient-to-br from-red-700 to-red-800 border-red-900 text-red-100",
      kawaii: "bg-gradient-to-br from-red-300 to-pink-400 border-red-800 text-red-900"
    }
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm"
  };
  
  return (
    <span className={`inline-flex items-center gap-2 rounded-xl border-2 ${variants[variant][theme]} ${sizes[size]} font-bold uppercase tracking-wide shadow-soft transform hover:scale-102 transition-all duration-200`}>
      <span className="animate-pulse">✨</span>
      {children}
      <span className="animate-pulse" style={{animationDelay: '0.5s'}}>⭐</span>
    </span>
  );
}

function Nails({ small }: { small?: boolean }) {
  const size = small ? "h-3 w-3" : "h-4 w-4";
  return (
    <div className="pointer-events-none absolute inset-4 flex justify-between z-10">
      <div className="flex flex-col justify-between">
        <span className={`${size} rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-pink-800 shadow-lg animate-pulse`} />
        <span className={`${size} rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-purple-800 shadow-lg animate-pulse`} style={{animationDelay: '0.5s'}} />
      </div>
      <div className="flex flex-col justify-between">
        <span className={`${size} rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-800 shadow-lg animate-pulse`} style={{animationDelay: '1s'}} />
        <span className={`${size} rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-cyan-800 shadow-lg animate-pulse`} style={{animationDelay: '1.5s'}} />
      </div>
    </div>
  );
}

function WoodGrain({ opacity = 0.2 }: { opacity?: number }) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none rounded-2xl"
      style={{
        opacity,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 105, 180, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 3px,
            rgba(0, 0, 0, 0.05) 3px,
            rgba(0, 0, 0, 0.05) 4px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 3px
          )
        `
      }}
    />
  );
}
