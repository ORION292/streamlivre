"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TitleCard } from "./TitleCard";
import type { Title } from "@/types";

interface Props {
  title: string;
  titles: Title[];
}

export function Carousel({ title, titles }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    const amount = dir === "left" ? -400 : 400;
    ref.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (titles.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="carousel-scroll flex gap-4 overflow-x-auto pb-2"
      >
        {titles.map((t) => (
          <TitleCard key={t.id} title={t} />
        ))}
      </div>
    </section>
  );
}
