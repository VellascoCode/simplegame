import type { ReactNode } from "react";

type CardWoodenProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  subtitle?: string;
};

export function CardWooden({ title, subtitle, children, className }: CardWoodenProps) {
  return (
    <article className={`relative rounded-sm bg-gradient-to-br from-stone-900 via-stone-950 to-black border-4 border-stone-950 p-3 shadow-2xl ${className ?? ""}`}>
      <Nails />
      <WoodGrain />
      <div className="relative rounded-sm border-4 border-amber-900/40 bg-gradient-to-br from-stone-900 to-slate-800 p-2">
        <div className="rounded-sm border-2 border-amber-800/30 bg-stone-950 p-2">
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
  return (
    <div className={`relative rounded-md bg-gradient-to-br from-stone-900 via-stone-950 to-slate-900 border-4 border-stone-950 p-3 shadow-2xl ${className ?? ""}`}>
      <Nails />
      <WoodGrain />
      <div className="relative rounded-md border-4 border-orange-900/60 bg-gradient-to-br from-stone-800 to-stone-950 p-2">
        <div className="rounded-md border-2 border-amber-800/30 bg-slate-950/50 p-2">
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
  return (
    <WoodPanel className={`p-3 ${className ?? ""}`}>
      <div className="flex items-center gap-3 border-b-2 border-amber-900/40 pb-3 mb-3">
        <MedievalTitle>{title}</MedievalTitle>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-800/50 via-amber-600/30 to-transparent" />
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
  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3"
  };
  
  return (
    <div className={`relative rounded-sm bg-gradient-to-br from-stone-900 to-black border-4 border-stone-950 ${sizeClasses[size]} shadow-xl hover:shadow-2xl transition-shadow duration-300 ${className ?? ""}`}>
      <Nails small />
      <WoodGrain opacity={0.3} />
      <div className="relative rounded-sm border-4 border-amber-900/40 bg-stone-950 p-2">
        <div className="rounded-sm border-2 border-amber-800/30 bg-stone-900 p-2">
          {(title || subtitle) && (
            <div className="flex items-center justify-between gap-2 rounded-sm border-2 border-amber-900/50 bg-gradient-to-r from-stone-900 to-stone-950 p-3 mb-2">
              <div>
                {subtitle && <p className="text-xs uppercase tracking-widest text-amber-700/80">{subtitle}</p>}
                {title && <p className="text-sm font-semibold text-amber-300">{title}</p>}
              </div>
              <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-950 shadow-md" />
            </div>
          )}
          <div className="rounded-sm border-2 border-amber-900/30 bg-gradient-to-br from-stone-800 to-stone-900 p-3 text-stone-300 shadow-inner">
            {children}
          </div>
        </div>
      </div>
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
  return (
    <div className="inline-flex items-center gap-2 rounded-sm border-2 border-amber-900/50 bg-gradient-to-r from-stone-900 to-stone-950 px-3 py-2 text-sm font-semibold tracking-widest text-amber-300 shadow-lg">
      <span className="h-2 w-2 rounded-sm bg-gradient-to-br from-cyan-600 to-cyan-800 border border-cyan-950 shadow-inner" />
      <span>{children}</span>
      <span className="h-2 w-2 rounded-sm bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-950 shadow-inner" />
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
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20"
  };
  
  return (
    <div
      className={`flex ${sizeClasses[size]} items-center justify-center rounded-sm border-2 border-amber-900/40 bg-gradient-to-br from-stone-800 to-stone-900 shadow-inner hover:shadow-lg transition-shadow duration-200 ${className ?? ""}`}
    >
      {children}
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
  const safeMax = max > 0 ? max : 1;
  const ratio = Math.max(0, Math.min(1, value / safeMax));
  const width = `${(ratio * 100).toFixed(1)}%`;
  const percentage = `${(ratio * 100).toFixed(0)}%`;
  const innerColor = colorClass ?? "from-emerald-700 to-emerald-800";
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-xs text-amber-400">
          <span>{label}</span>
          <span className="text-amber-300">{showPercentage ? percentage : `${value}/${max}`}</span>
        </div>
      )}
      <div className={`${sizeClasses[size]} w-full rounded-sm border-2 border-stone-950 bg-stone-900 shadow-inner overflow-hidden relative`}>
        <div className={`h-full bg-gradient-to-r ${innerColor} transition-all duration-500 ease-out relative`} style={{ width }}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />
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
  const base = "relative inline-flex items-center justify-center rounded-md font-bold uppercase tracking-widest transition-all duration-200 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none";
  
  const sizeClasses = {
    sm: "h-10 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base"
  };

  const variants = {
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
  };

  const currentVariant = variants[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizeClasses[size]} ${currentVariant.bg} ${currentVariant.border} ${currentVariant.text} ${currentVariant.shadow} ${currentVariant.hover} ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
    >
      <WoodGrain opacity={0.15} />
      <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center gap-2">{label}</span>
      <span className={`absolute top-1 left-1 h-1.5 w-1.5 rounded-md bg-gradient-to-br ${currentVariant.nails} shadow-md`} />
      <span className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-md bg-gradient-to-br ${currentVariant.nails} shadow-md`} />
      <span className={`absolute bottom-1 left-1 h-1.5 w-1.5 rounded-md bg-gradient-to-br ${currentVariant.nails} shadow-md`} />
      <span className={`absolute bottom-1 right-1 h-1.5 w-1.5 rounded-md bg-gradient-to-br ${currentVariant.nails} shadow-md`} />
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
  const rarityColors = {
    common: "border-stone-950 hover:border-amber-900/50",
    uncommon: "border-green-900/70 hover:border-green-700/70",
    rare: "border-blue-900/70 hover:border-blue-700/70",
    epic: "border-purple-900/70 hover:border-purple-700/70",
    legendary: "border-amber-900/70 hover:border-amber-700/70 shadow-amber-900/30"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-16 h-16 rounded-sm border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        active 
          ? 'bg-gradient-to-br from-amber-800 to-amber-900 border-amber-600 shadow-lg scale-105' 
          : `bg-gradient-to-br from-stone-800 to-stone-900 ${rarityColors[rarity]} hover:shadow-md hover:scale-105`
      }`}
    >
      <WoodGrain opacity={0.2} />
      {item && (
        <>
          <div className="absolute inset-0 flex items-center justify-center text-3xl z-10">
            {item}
          </div>
          {count && (
            <div className="absolute bottom-0.5 right-0.5 bg-stone-950 border border-stone-800 rounded-sm px-1.5 py-0.5 text-xs text-amber-300 font-bold shadow-md z-20">
              {count}
            </div>
          )}
        </>
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
  return (
    <div className={`relative ${className ?? ""}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-12 px-4 rounded-sm border-4 border-stone-950 bg-gradient-to-br from-stone-800 to-stone-900 text-amber-200 placeholder:text-amber-900/50 focus:outline-none focus:border-amber-900/60 focus:ring-2 focus:ring-amber-800/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <WoodGrain opacity={0.1} />
    </div>
  );
}

// Novo componente: WoodenBadge
type WoodenBadgeProps = {
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "danger";
  size?: "sm" | "md";
};

export function WoodenBadge({ children, variant = "info", size = "sm" }: WoodenBadgeProps) {
  const variants = {
    info: "bg-gradient-to-br from-blue-800 to-blue-900 border-blue-950 text-blue-100",
    success: "bg-gradient-to-br from-emerald-800 to-emerald-900 border-emerald-950 text-emerald-100",
    warning: "bg-gradient-to-br from-amber-700 to-amber-800 border-amber-950 text-amber-100",
    danger: "bg-gradient-to-br from-red-800 to-red-900 border-red-950 text-red-100"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm"
  };
  
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border-2 ${variants[variant]} ${sizes[size]} font-semibold uppercase tracking-wide shadow-md`}>
      {children}
    </span>
  );
}

function Nails({ small }: { small?: boolean }) {
  const size = small ? "h-2 w-2" : "h-3 w-3";
  return (
    <div className="pointer-events-none absolute inset-3 flex justify-between z-10">
      <div className="flex flex-col justify-between">
        <span className={`${size} rounded-sm bg-gradient-to-br from-cyan-600 to-cyan-800 border border-cyan-950 shadow-md`} />
        <span className={`${size} rounded-sm bg-gradient-to-br from-cyan-600 to-cyan-800 border border-cyan-950 shadow-md`} />
      </div>
      <div className="flex flex-col justify-between">
        <span className={`${size} rounded-sm bg-gradient-to-br from-cyan-600 to-cyan-800 border border-cyan-950 shadow-md`} />
        <span className={`${size} rounded-sm bg-gradient-to-br from-cyan-600 to-cyan-800 border border-cyan-950 shadow-md`} />
      </div>
    </div>
  );
}

function WoodGrain({ opacity = 0.2 }: { opacity?: number }) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none rounded-sm"
      style={{
        opacity,
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 3px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 1px,
            rgba(0, 0, 0, 0.05) 1px,
            rgba(0, 0, 0, 0.05) 2px
          )
        `
      }}
    />
  );
}
