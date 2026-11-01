"use client";

import type { Title } from "@/types";

interface Props {
  title: Title;
}

export function Player({ title }: Props) {
  if (!title.playerUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-dark-card text-white/60">
        <div className="text-center p-6">
          <p className="mb-2 text-lg font-medium">Player não disponível</p>
          <p className="text-sm">
            Este título não possui vídeo de domínio público ou embed oficial.
            Confira a seção &quot;Onde assistir oficialmente&quot; abaixo.
          </p>
        </div>
      </div>
    );
  }

  if (title.playerType === "youtube" || title.playerUrl.includes("youtube.com") || title.playerUrl.includes("youtu.be")) {
    let embedUrl = title.playerUrl;
    if (!embedUrl.includes("/embed/")) {
      const match = embedUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      if (match) embedUrl = `https://www.youtube.com/embed/${match[1]}`;
    }
    return (
      <div className="player-wrapper overflow-hidden rounded-xl">
        <iframe
          src={embedUrl}
          title={title.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (title.playerType === "vimeo" || title.playerUrl.includes("vimeo.com")) {
    return (
      <div className="player-wrapper overflow-hidden rounded-xl">
        <iframe
          src={title.playerUrl}
          title={title.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="player-wrapper overflow-hidden rounded-xl">
      <video controls className="w-full h-full" src={title.playerUrl}>
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
  );
}
