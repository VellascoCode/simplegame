import type { Metadata } from "next";

import { Providers } from "@/components/Providers";
import NavHeader from "@/components/ui/NavHeader";
import SideMenu from "@/components/ui/SideMenu";

import "./globals.css";

export const runtime = "nodejs";
export const preferredRegion = "home";

export const metadata: Metadata = {
  title: "Mundo 2D Spinazzi — MVP",
  description: "MVP do Mundo 2D Spinazzi com Next.js, TypeScript e Phaser"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-stone-950 text-amber-100">
        <Providers>
          <NavHeader />
          <SideMenu />
          <div className="flex min-h-screen pt-16">
            <div className="hidden md:block w-[260px]" aria-hidden />
            <main className="flex-1 bg-gradient-to-br from-stone-950 via-amber-950/10 to-stone-900 p-4 md:p-6">
              <div className="rounded-md border-2 border-amber-900 bg-stone-950/70 p-3 shadow-2xl shadow-black/70">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
