"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useTheme } from "@/components/ThemeProvider";
import { WoodenButton } from "@/components/UniversalUi";

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
  const { theme } = useTheme();
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
    MENU_GROUPS.forEach((group) => (init[group.title] = false));
    setExpanded(init);
  }, []);

  const getSidebarClass = () => {
    if (theme === "kawaii") return "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-r-4 border-pink-300";
    if (theme === "royal-medieval") return "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 border-r-4 border-amber-800";
    return "bg-gradient-to-br from-stone-900 via-stone-950 to-black border-r-4 border-stone-950";
  };

  const getGroupButtonClass = () => {
    if (theme === "kawaii") return "border-pink-300 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-pink-800";
    if (theme === "royal-medieval") return "border-amber-700 bg-gradient-to-r from-amber-800 to-orange-800 text-amber-100";
    return "border-amber-700 bg-gradient-to-r from-stone-800 to-stone-900 text-amber-100";
  };

  const getGroupDotClass = () => {
    if (theme === "kawaii") return "bg-gradient-to-br from-pink-400 to-purple-400";
    if (theme === "royal-medieval") return "bg-gradient-to-br from-amber-500 to-orange-600";
    return "bg-gradient-to-br from-amber-500 to-amber-700";
  };

  const sidebarClasses = useMemo(
    () =>
      `fixed left-0 top-16 z-40 flex h-[calc(100vh-64px)] w-[260px] flex-col shadow-2xl transition-transform duration-300 backdrop-blur-sm ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${drawerOpen ? "translate-x-0" : ""} ${getSidebarClass()}`,
    [isOpen, drawerOpen, theme]
  );

  const isActive = (href: string) => pathname === href;

  const renderItem = (item: MenuItem, depth = 0) => {
    const active = isActive(item.href);
    
    return (
      <WoodenButton
        key={item.href}
        label={item.label}
        variant={active ? "redRoyal" : "wood"}
        size="sm"
        onClick={() => {
          window.location.href = item.href;
        }}
        className={`w-full justify-start text-left ${depth > 0 ? "ml-4" : ""}`}
      />
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
              className={`flex w-full items-center gap-2 rounded-xl border-2 px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.2em] shadow-lg transform hover:scale-102 transition-all duration-200 ${getGroupButtonClass()}`}
            >
              <span
                className={`h-3 w-3 rounded-full shadow-md ${getGroupDotClass()} animate-pulse`}
              />
              <span className="flex-1 truncate drop-shadow-sm text-xs">{group.title}</span>
              <span className="text-sm transition-transform duration-200">{expanded[group.title] ? "−" : "+"}</span>
            </button>
            {expanded[group.title] && (
              <div className="ml-3 space-y-1">
                {group.items.map((item) => renderItem(item))}
              </div>
            )}
          </div>
        ))}

        {user?.isAdmin && (
          <WoodenButton
            label="Admin"
            variant={isActive("/admin") ? "danger" : "wood"}
            size="sm"
            onClick={() => window.location.href = "/admin"}
            className="w-full mt-auto"
          />
        )}

        <WoodenButton
          label="Logout"
          variant="secondary"
          size="sm"
          onClick={() => window.location.href = "/logout"}
          className="w-full mt-auto"
        />
      </div>
    </aside>
  );
}