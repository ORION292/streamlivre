import { notFound } from "next/navigation";
import Image from "next/image";
import { getTitleById, typeLabels } from "@/lib/data";
import { Player } from "@/components/Player";
import { Star, ExternalLink } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const title = getTitleById(id);
  if (!title) return { title: "Não encontrado" };
  return {
    title: title.title,
    description: title.synopsis.slice(0, 160),
  };
}

export default async function TitlePage({ params }: Props) {
  const { id } = await params;
  const title = getTitleById(id);
  if (!title) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-xl shadow-xl">
          <Image
            src={title.cover}
            alt={title.title}
            fill
            className="object-cover"
            sizes="280px"
            priority
          />
        </div>

        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <span className="rounded bg-primary/20 px-2 py-0.5 text-primary-light">
              {typeLabels[title.type]}
            </span>
            <span>{title.year}</span>
            {title.dubbed && <span className="rounded bg-white/10 px-2 py-0.5">Dublado</span>}
            {title.subtitled && <span className="rounded bg-white/10 px-2 py-0.5">Legendado</span>}
          </div>

          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{title.title}</h1>

          <div className="mb-4 flex items-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" size={20} />
            <span className="font-semibold">{title.rating.toFixed(1)}</span>
          </div>

          <p className="mb-6 text-white/80 leading-relaxed">{title.synopsis}</p>

          {title.genres.length > 0 && (
            <div className="mb-4">
              <p className="mb-1 text-sm text-white/50">Gêneros</p>
              <div className="flex flex-wrap gap-2">
                {title.genres.map((g) => (
                  <span key={g} className="rounded-full bg-white/10 px-3 py-1 text-sm">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {title.cast.length > 0 && (
            <div className="mb-6">
              <p className="mb-1 text-sm text-white/50">Elenco</p>
              <p className="text-sm">{title.cast.join(", ")}</p>
            </div>
          )}

          <ShareButton title={title.title} />
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold">Assistir</h2>
        <Player title={title} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold">Onde assistir oficialmente</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {title.whereToWatch.map((w) => (
            <a
              key={w.platform}
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-white/10 bg-dark-card px-5 py-4 transition hover:border-primary hover:bg-dark-hover"
            >
              <span className="font-medium">{w.platform}</span>
              <ExternalLink size={18} className="text-white/50" />
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/40">
          Todos os links apontam para plataformas oficiais ou fontes de domínio público / Creative Commons.
        </p>
      </section>
    </div>
  );
}
