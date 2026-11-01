import Link from "next/link";
import Image from "next/image";
import type { Title } from "@/types";
import { typeLabels } from "@/lib/data";

interface Props {
  title: Title;
}

export function TitleCard({ title }: Props) {
  return (
    <Link
      href={`/titulo/${title.id}`}
      className="group relative flex-shrink-0 w-40 sm:w-48 overflow-hidden rounded-xl bg-dark-card transition hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={title.cover}
          alt={title.title}
          fill
          className="object-cover transition group-hover:brightness-110"
          sizes="(max-width: 640px) 160px, 192px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 line-clamp-2">
          {title.title}
        </span>
      </div>
      <div className="p-2">
        <p className="truncate text-sm font-medium">{title.title}</p>
        <p className="text-xs text-white/50">
          {title.year} · {typeLabels[title.type]}
        </p>
      </div>
    </Link>
  );
}
