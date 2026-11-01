"use client";

import { Share2 } from "lucide-react";

interface Props {
  title: string;
}

export function ShareButton({ title }: Props) {
  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        // usuário cancelou
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copiado!");
    }
  };

  return (
    <button
      onClick={share}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
    >
      <Share2 size={16} /> Compartilhar
    </button>
  );
}
