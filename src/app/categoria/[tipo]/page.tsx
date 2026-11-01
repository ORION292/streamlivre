import { notFound } from "next/navigation";
import { TitleCard } from "@/components/TitleCard";
import { getTitlesByType, typeLabels } from "@/lib/data";
import type { ContentType } from "@/types";
import type { Metadata } from "next";

const validTypes: ContentType[] = ["anime", "filme", "serie", "novela", "canal"];

interface Props {
  params: Promise<{ tipo: string }>;
  searchParams: Promise<{ ordenar?: string; pagina?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tipo } = await params;
  if (!validTypes.includes(tipo as ContentType)) return { title: "Categoria" };
  return { title: typeLabels[tipo as ContentType] };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { tipo } = await params;
  const { ordenar = "popularidade", pagina = "1" } = await searchParams;

  if (!validTypes.includes(tipo as ContentType)) notFound();

  let titles = getTitlesByType(tipo as ContentType);

  if (ordenar === "nota") {
    titles = [...titles].sort((a, b) => b.rating - a.rating);
  } else if (ordenar === "data") {
    titles = [...titles].sort((a, b) => b.year - a.year);
  } else {
    titles = [...titles].sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  const page = Math.max(1, parseInt(pagina, 10) || 1);
  const perPage = 12;
  const total = titles.length;
  const totalPages = Math.ceil(total / perPage);
  const paginated = titles.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{typeLabels[tipo as ContentType]}</h1>
      <p className="mb-8 text-white/60">{total} título{total !== 1 ? "s" : ""}</p>

      <div className="mb-8 flex flex-wrap gap-2">
        {[
          { key: "popularidade", label: "Popularidade" },
          { key: "nota", label: "Nota" },
          { key: "data", label: "Ano" },
        ].map((opt) => (
          <a
            key={opt.key}
            href={`/categoria/${tipo}?ordenar=${opt.key}`}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              ordenar === opt.key
                ? "bg-primary text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {opt.label}
          </a>
        ))}
      </div>

      {paginated.length === 0 ? (
        <p className="text-white/50">Nenhum título encontrado nesta categoria ainda.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {paginated.map((t) => (
            <TitleCard key={t.id} title={t} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/categoria/${tipo}?ordenar=${ordenar}&pagina=${p}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${
                p === page ? "bg-primary" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
