import { TitleCard } from "@/components/TitleCard";
import { searchTitles, typeLabels } from "@/lib/data";
import type { ContentType } from "@/types";

interface Props {
  searchParams: Promise<{ q?: string; tipo?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", tipo } = await searchParams;
  const results = searchTitles(q, tipo as ContentType | undefined);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Busca</h1>
      <p className="mb-8 text-white/60">
        {q
          ? `${results.length} resultado${results.length !== 1 ? "s" : ""} para “${q}”`
          : "Digite algo na busca do menu para encontrar títulos."}
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {results.map((t) => (
            <TitleCard key={t.id} title={t} />
          ))}
        </div>
      ) : q ? (
        <p className="text-white/50">Nenhum título encontrado. Tente outro termo.</p>
      ) : null}
    </div>
  );
}
