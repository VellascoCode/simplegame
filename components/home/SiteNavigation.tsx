import Image from "next/image";
import type { FC } from "react";
import type { siteNavLinks } from "./constants";

type SiteNavLink = (typeof siteNavLinks)[number];

interface SiteNavigationProps {
  links: ReadonlyArray<SiteNavLink>;
}

export const SiteNavigation: FC<SiteNavigationProps> = ({ links }) => {
  return (
    <nav
      className="flex flex-wrap gap-4 rounded-[32px] border border-white/10 bg-black/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
      aria-label="Seções do portal"
    >
      {links.map((link) => (
        <button
          key={link.id}
          type="button"
          className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-left text-amber-100 transition hover:bg-white/10"
        >
          <Image src={link.icon} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
          <div>
            <p className="text-sm font-semibold leading-tight">{link.label}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-100/70">{link.description}</p>
          </div>
        </button>
      ))}
    </nav>
  );
};
