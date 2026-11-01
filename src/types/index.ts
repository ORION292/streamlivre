export type ContentType = "anime" | "filme" | "serie" | "novela" | "canal";

export interface WhereToWatch {
  platform: string;
  url: string;
  logo?: string;
}

export interface Title {
  id: string;
  title: string;
  type: ContentType;
  cover: string;
  synopsis: string;
  year: number;
  genres: string[];
  cast: string[];
  rating: number;
  playerUrl?: string; // URL de vídeo permitido (YouTube, Vimeo, próprio, domínio público)
  playerType?: "youtube" | "vimeo" | "html5" | "embed";
  whereToWatch: WhereToWatch[];
  dubbed: boolean;
  subtitled: boolean;
  featured?: boolean;
  views?: number;
  createdAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
