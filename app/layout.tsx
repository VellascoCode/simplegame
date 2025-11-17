import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";

export const runtime = "nodejs";
export const preferredRegion = "home";

export const metadata: Metadata = {
  title: "Mundo 2D Spinazzi — MVP",
  description: "MVP do Mundo 2D Spinazzi com Next.js, TypeScript e Phaser"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <main className="content">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
