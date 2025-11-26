import type { Metadata } from "next";

import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/ThemeProvider";
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
        <ThemeProvider>
          <Providers>
            <NavHeader />
            <SideMenu />
            <div className="flex min-h-screen pt-16">
              <div className="hidden md:block w-[260px]" aria-hidden />
              <main className="flex-1 p-4 md:p-6 data-[theme='kawaii']:bg-gradient-to-br data-[theme='kawaii']:from-pink-50 data-[theme='kawaii']:via-purple-50 data-[theme='kawaii']:to-blue-50 data-[theme='dark-fantasy']:bg-gradient-to-br data-[theme='dark-fantasy']:from-stone-950 data-[theme='dark-fantasy']:via-amber-950/10 data-[theme='dark-fantasy']:to-stone-900 data-[theme='royal-medieval']:bg-gradient-to-br data-[theme='royal-medieval']:from-amber-950 data-[theme='royal-medieval']:via-orange-950 data-[theme='royal-medieval']:to-red-950">
                <div className="rounded-md border-2 shadow-2xl shadow-black/70 data-[theme='kawaii']:border-pink-200 data-[theme='kawaii']:bg-pink-50/70 data-[theme='dark-fantasy']:border-amber-900 data-[theme='dark-fantasy']:bg-stone-950/70 data-[theme='royal-medieval']:border-amber-800 data-[theme='royal-medieval']:bg-amber-950/70 p-3">
                  {children}
                </div>
              </main>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
