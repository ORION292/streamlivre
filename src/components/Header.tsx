"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/theme";
import { typeLabels } from "@/lib/data";
import type { ContentType } from "@/types";

const categories: ContentType[] = ["anime", "filme", "serie", "novela", "canal"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/categoria/${cat}`}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {typeLabels[cat]}
            </Link>
          ))}
        </nav>

        <form
          action="/busca"
          className="hidden items-center gap-2 md:flex"
          onSubmit={(e) => {
            if (!query.trim()) e.preventDefault();
          }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar títulos..."
              className="w-56 rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white/10"
            />
          </div>
        </form>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-dark px-4 py-4 md:hidden">
          <form action="/busca" className="mb-4">
            <input
              type="search"
              name="q"
              placeholder="Buscar..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none"
            />
          </form>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categoria/${cat}`}
                onClick={() => setOpen(false)}
                className="text-white/80"
              >
                {typeLabels[cat]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
