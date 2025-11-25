import type { ReactNode } from "react";

type CardWoodenProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  subtitle?: string;
};

export function CardWooden({ title, subtitle, children, className }: CardWoodenProps) {
  return (
    <article className={`relative rounded-md border-4 border-black bg-amber-900 p-3 shadow-md ${className ?? ""}`}>
      <Nails />
      <div className="rounded-md border-4 border-amber-800 bg-amber-900 p-2">
        <div className="rounded-md border-2 border-red-900 bg-amber-800 p-2">
          {(title || subtitle) && (
            <header className="flex items-center justify-between gap-2 rounded-md border-2 border-black bg-amber-800 p-3">
              <div className="space-y-1">
                {subtitle && <p className="text-xs uppercase tracking-widest text-stone-800">{subtitle}</p>}
                {title && <h3 className="text-base font-semibold text-stone-900">{title}</h3>}
              </div>
            </header>
          )}
          <div className="rounded-md border-2 border-amber-800 bg-amber-400 p-3 text-stone-900 shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}

// --- Novo tema medieval compartilhado ---
type WoodPanelProps = {
  children: ReactNode;
  className?: string;
};

export function WoodPanel({ children, className }: WoodPanelProps) {
  return (
    <div className={`relative rounded-md border-4 border-black bg-amber-900 p-3 shadow-md ${className ?? ""}`}>
      <Nails />
      <div className="rounded-md border-4 border-amber-800 bg-amber-900 p-2">
        <div className="rounded-md border-2 border-red-900 bg-amber-800 p-2">
          <div className="rounded-md border-2 border-amber-800 bg-amber-400 p-3 text-stone-900 shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

type MedievalSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function MedievalSection({ title, children, className }: MedievalSectionProps) {
  return (
    <WoodPanel className={`p-3 ${className ?? ""}`}>
      <div className="flex items-center gap-3 border-b border-amber-900 p-3">
        <MedievalTitle>{title}</MedievalTitle>
        <div className="h-px flex-1 bg-amber-700" />
      </div>
      <div className="p-3">{children}</div>
    </WoodPanel>
  );
}

type MedievalCardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function MedievalCard({ title, subtitle, children, className }: MedievalCardProps) {
  return (
    <div className={`relative rounded-md border-4 border-black bg-amber-900 p-2 shadow-md ${className ?? ""}`}>
      <Nails small />
      <div className="rounded-md border-4 border-amber-800 bg-amber-900 p-2">
        <div className="rounded-md border-2 border-red-900 bg-amber-800 p-2">
          {(title || subtitle) && (
            <div className="flex items-center justify-between gap-2 rounded-md border-2 border-black bg-amber-800 p-3">
              <div>
                {subtitle && <p className="text-xs uppercase tracking-widest text-stone-800">{subtitle}</p>}
                {title && <p className="text-sm font-semibold text-stone-900">{title}</p>}
              </div>
              <span className="h-3 w-3 rounded-md border-2 border-red-900 bg-amber-500" />
            </div>
          )}
          <div className="rounded-md border-2 border-amber-800 bg-amber-400 p-3 text-stone-900 shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

type MedievalTitleProps = {
  children: ReactNode;
};

export function MedievalTitle({ children }: MedievalTitleProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border-2 border-black bg-amber-900 p-2 text-sm font-semibold tracking-widest text-amber-100">
      <span className="h-2 w-2 rounded-md border-2 border-sky-900 bg-sky-700" />
      <span>{children}</span>
      <span className="h-2 w-2 rounded-md border-2 border-red-900 bg-amber-500" />
    </div>
  );
}

type MedievalIconFrameProps = {
  className?: string;
};

export function MedievalIconFrame({ className }: MedievalIconFrameProps) {
  return (
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-md border-2 border-amber-900 bg-amber-800 ${className ?? ""}`}
    />
  );
}

type ProgressWoodenBarProps = {
  value: number;
  max: number;
  colorClass?: string;
};

export function ProgressWoodenBar({ value, max, colorClass }: ProgressWoodenBarProps) {
  const safeMax = max > 0 ? max : 1;
  const ratio = Math.max(0, Math.min(1, value / safeMax));
  const width = `${(ratio * 100).toFixed(1)}%`;
  const innerColor = colorClass ?? "bg-emerald-700";

  return (
    <div className="h-3 w-full rounded-md border-2 border-black bg-amber-900">
      <div className={`h-3 rounded-md ${innerColor}`} style={{ width }} />
    </div>
  );
}

type WoodenButtonProps = {
  label: string;
  className?: string;
  variant?: "amber" | "vermelha" | "madeira";
};

export function WoodenButton({ label, className, variant = "amber" }: WoodenButtonProps) {
  const base =
    "inline-flex h-12 items-center justify-center rounded-md border-4 border-black text-sm font-bold uppercase tracking-widest transition-transform duration-200 ease-out hover:-translate-y-1 active:translate-y-0 px-4";
  const variants: Record<NonNullable<WoodenButtonProps["variant"]>, string> = {
    amber: "bg-amber-800 text-amber-100 shadow-md",
    vermelha: "bg-red-800 text-amber-100 shadow-md",
    madeira: "bg-amber-900 text-amber-100 shadow-md",
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    >
      {label}
    </button>
  );
}

function Nails({ small }: { small?: boolean }) {
  const size = small ? "h-2 w-2" : "h-3 w-3";
  return (
    <div className="pointer-events-none absolute inset-3 flex justify-between">
      <div className="flex flex-col justify-between">
        <span className={`${size} rounded-full border-2 border-sky-900 bg-sky-700`} />
        <span className={`${size} rounded-full border-2 border-sky-900 bg-sky-700`} />
      </div>
      <div className="flex flex-col justify-between">
        <span className={`${size} rounded-full border-2 border-sky-900 bg-sky-700`} />
        <span className={`${size} rounded-full border-2 border-sky-900 bg-sky-700`} />
      </div>
    </div>
  );
}
