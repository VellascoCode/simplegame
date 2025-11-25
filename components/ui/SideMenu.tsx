"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

const MENU_GROUPS: { title: string; items: MenuItem[] }[] = [
  {
    title: "JOGAR",
    items: [
      { label: "Dashboard", href: "/dashboard" },
      {
        label: "Personagens",
        href: "/characters",
        children: [
          { label: "Ativo", href: "/characters/active" },
          { label: "Criar novo", href: "/characters/new" },
          { label: "Selecionar", href: "/characters/select" }
        ]
      },
      { label: "Missões", href: "/quests" },
      { label: "Conquistas", href: "/achievements" },
      { label: "Inventário", href: "/inventory" }
    ]
  },
  {
    title: "WIKI",
    items: [
      { label: "Início", href: "/wiki" },
      { label: "Skills", href: "/wiki/skills" },
      { label: "Classes", href: "/wiki/classes" },
      { label: "Itens", href: "/wiki/items" },
      { label: "Mapas", href: "/wiki/maps" },
      { label: "NPCs", href: "/wiki/npcs" },
      { label: "Monstros", href: "/wiki/monsters" },
      { label: "Drops", href: "/wiki/drops" },
      { label: "Factions", href: "/wiki/factions" }
    ]
  },
  {
    title: "SISTEMA",
    items: [
      { label: "Configurações", href: "/settings" },
      { label: "Créditos", href: "/credits" },
      { label: "Suporte", href: "/support" }
    ]
  }
];

type SideMenuProps = {
  user?: { isAdmin?: boolean };
};

export default function SideMenu({ user }: SideMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsOpen(width >= 1024);
      setDrawerOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const toggleListener = () => {
      if (window.innerWidth < 768) {
        setDrawerOpen((prev) => !prev);
      } else {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("toggle-sidebar", toggleListener as EventListener);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("toggle-sidebar", toggleListener as EventListener);
    };
  }, []);

  useEffect(() => {
    const init: Record<string, boolean> = {};
    MENU_GROUPS.forEach((group) => (init[group.title] = true));
    setExpanded(init);
  }, []);

  const sidebarClasses = useMemo(
    () =>
      `fixed left-0 top-16 z-40 flex h-[calc(100vh-64px)] w-[260px] flex-col bg-stone-950/95 border-r-4 border-amber-950 shadow-2xl shadow-black/70 transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${drawerOpen ? "translate-x-0" : ""}`,
    [isOpen, drawerOpen]
  );

  const isActive = (href: string) => pathname === href;

  const renderItem = (item: MenuItem, depth = 0) => {
    const active = isActive(item.href);
    const base =
      "group flex items-center gap-2 rounded-md border-2 px-3 py-2 text-sm font-semibold transition-colors";
    const stateClasses = active
      ? "border-amber-500 text-amber-50 bg-amber-900/60 shadow-md shadow-black/50"
      : "border-transparent text-amber-200 hover:text-amber-50 hover:border-amber-600";

    return (
      <div key={item.href} className="space-y-1">
        <Link href={item.href} className={`${base} ${stateClasses} ${depth > 0 ? "ml-4" : ""}`}>
          <span className="h-2 w-2 rounded-sm bg-amber-600 shadow-sm shadow-black/40" />
          <span className="truncate">{item.label}</span>
        </Link>
        {item.children && expanded[item.href] && (
          <div className="space-y-1">
            {item.children.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
        {item.children && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => ({ ...prev, [item.href]: !prev[item.href] }))}
            className="ml-4 text-[11px] uppercase tracking-[0.2em] text-amber-300 hover:text-amber-100"
          >
            {expanded[item.href] ? "Recolher" : "Expandir"}
          </button>
        )}
      </div>
    );
  };

  return (
    <aside className={sidebarClasses}>
      <div className="flex h-full flex-col gap-3 overflow-y-auto p-3">
        {MENU_GROUPS.map((group) => (
          <div key={group.title} className="space-y-2">
            <button
              type="button"
              onClick={() => setExpanded((prev) => ({ ...prev, [group.title]: !prev[group.title] }))}
              className="flex w-full items-center gap-2 rounded-md border-2 border-amber-900 bg-amber-950 px-3 py-1 text-left text-[11px] font-bold uppercase tracking-[0.24em] text-amber-100 shadow-md shadow-black/60"
            >
              <span className="h-2 w-2 rounded-sm bg-amber-500" />
              <span className="flex-1 truncate">{group.title}</span>
              <span>{expanded[group.title] ? "−" : "+"}</span>
            </button>
            {expanded[group.title] && (
              <nav className="space-y-1">
                {group.items.map((item) => renderItem(item))}
              </nav>
            )}
          </div>
        ))}

        {user?.isAdmin && (
          <Link
            href="/admin"
            className={`group flex items-center gap-2 rounded-md border-2 px-3 py-2 text-sm font-semibold ${
              isActive("/admin")
                ? "border-amber-500 text-amber-50 bg-amber-900/60 shadow-md shadow-black/50"
                : "border-transparent text-amber-200 hover:text-amber-50 hover:border-amber-600"
            }`}
          >
            <span className="h-2 w-2 rounded-sm bg-red-600 shadow-sm shadow-black/40" />
            <span className="truncate">Admin</span>
          </Link>
        )}

        <Link
          href="/logout"
          className="group mt-auto flex items-center gap-2 rounded-md border-2 border-amber-900 bg-amber-900/40 px-3 py-2 text-sm font-semibold text-amber-100 shadow-md shadow-black/50 hover:bg-amber-800/60"
        >
          <span className="h-2 w-2 rounded-sm bg-amber-500 shadow-sm shadow-black/40" />
          <span className="truncate">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
