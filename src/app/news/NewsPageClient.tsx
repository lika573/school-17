"use client";

import { useMemo, useState } from "react";
import NewsCard from "@/components/NewsCard";
import NewsFilter from "@/components/NewsFilter";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import type { NewsCategory, NewsItem } from "@/types";

interface Props {
  news: NewsItem[];
}

export default function NewsPageClient({ news }: Props) {
  const [filter, setFilter] = useState<NewsCategory | "ყველა">("ყველა");

  const filtered = useMemo(() => {
    const sorted = [...news].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    if (filter === "ყველა") return sorted;
    return sorted.filter((item) => item.category === filter);
  }, [filter, news]);

  return (
    <div className="container-padding py-10 sm:py-16 md:py-24">
      <ScrollReveal>
        <SectionTitle subtitle="სკოლის უახლესი განცხადებები, ღონისძიებები და მოსწავლეების მიღწევები.">
          სიახლები
        </SectionTitle>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="mt-6 sm:mt-10">
          <NewsFilter active={filter} onChange={setFilter} />
        </div>
      </ScrollReveal>

      {filtered.length === 0 ? (
        <div className="glass-card-static mt-8 p-8 text-center">
          <p className="text-[14px] text-secondary sm:text-[15px]">
            ამ კატეგორიაში სიახლები არ მოიძებნა.
          </p>
        </div>
      ) : (
        <div className="stagger-children grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 80}>
              <NewsCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
