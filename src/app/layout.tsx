import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ChatAssistant } from "@/components/ChatAssistant";
import { siteConfig } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} min-h-screen bg-dark text-white antialiased`}>
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <ChatAssistant />
        <footer className="border-t border-white/10 py-8 text-center text-sm text-white/50">
          <p>
            {siteConfig.name} — Catálogo legal. Apenas conteúdo de domínio público,
            Creative Commons e embeds oficiais.
          </p>
          <p className="mt-1">Nunca hospedamos conteúdo sem licença.</p>
        </footer>
      </body>
    </html>
  );
}
