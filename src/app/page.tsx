import Link from "next/link";
import Image from "next/image";
import { Carousel } from "@/components/Carousel";
import {
  getFeaturedTitles,
  getPopularTitles,
  getTitlesByType,
  typeLabels,
} from "@/lib/data";
import type { ContentType } from "@/types";

export default function HomePage() {
  const featured = getFeaturedTitles();
  const popular = getPopularTitles(10);
  const hero = featured[0] || popular[0];

  const categories: ContentType[] = ["filme", "anime", "serie", "novela", "canal"];

  return (
    <div>
      {hero && (
        <section className="relative h-[50vh] min-h-[320px] w-full overflow-hidden sm:h-[60vh]">
          <Image
            src={hero.cover}
            alt={hero.title}
            fill
            priority
            className="object-cover object-center brightness-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <div className="mx-auto max-w-7xl">
              <span className="mb-2 inline-block rounded-full bg-primary/80 px-3 py-1 text-xs font-medium">
                Destaque
              </span>
              <h1 className="mb-2 text-3xl font-bold sm:text-5xl">{hero.title}</h1>
              <p className="mb-4 max-w-2xl text-sm text-white/80 line-clamp-2 sm:text-base">
                {hero.synopsis}
              </p>
              <Link
                href={`/titulo/${hero.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium transition hover:bg-primary-dark"
              >
                Assistir agora
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/categoria/${cat}`}
              className="rounded-full border border-white/15 px-5 py-2 text-sm transition hover:border-primary hover:bg-primary/10"
            >
              {typeLabels[cat]}
            </Link>
          ))}
        </div>

        <Carousel title="Em destaque" titles={featured} />
        <Carousel title="Mais assistidos" titles={popular} />

        {categories.map((cat) => {
          const items = getTitlesByType(cat);
          if (items.length === 0) return null;
          return (
            <Carousel key={cat} title={typeLabels[cat]} titles={items} />
          );
        })}
      </div>
    </div>
  );
}
