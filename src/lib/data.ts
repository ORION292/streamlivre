import titlesData from "@/data/titles.json";
import type { Title, ContentType } from "@/types";

export function getAllTitles(): Title[] {
  return titlesData as Title[];
}

export function getTitleById(id: string): Title | undefined {
  return getAllTitles().find((t) => t.id === id);
}

export function getTitlesByType(type: ContentType): Title[] {
  return getAllTitles().filter((t) => t.type === type);
}

export function getFeaturedTitles(): Title[] {
  return getAllTitles().filter((t) => t.featured);
}

export function getPopularTitles(limit = 8): Title[] {
  return [...getAllTitles()]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

export function searchTitles(query: string, type?: ContentType): Title[] {
  const q = query.toLowerCase().trim();
  let results = getAllTitles();
  if (type) results = results.filter((t) => t.type === type);
  if (!q) return results;
  return results.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.synopsis.toLowerCase().includes(q) ||
      t.genres.some((g) => g.toLowerCase().includes(q)) ||
      t.cast.some((c) => c.toLowerCase().includes(q))
  );
}

export const typeLabels: Record<ContentType, string> = {
  anime: "Animes",
  filme: "Filmes",
  serie: "Séries",
  novela: "Novelas",
  canal: "Canais",
};
