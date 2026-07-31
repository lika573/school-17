"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import ScrollReveal from "@/components/ScrollReveal";
import type { GalleryItem } from "@/types";

interface GalleryGridProps {
  items: GalleryItem[];
  showFilter?: boolean;
  categories?: string[];
}

export default function GalleryGrid({
  items,
  showFilter = true,
  categories = [],
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("ყველა");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "ყველა"
      ? items
      : items.filter((item) => item.category === activeCategory);

  // Count per category
  const getCategoryCount = (cat: string) => {
    if (cat === "ყველა") return items.length;
    return items.filter((item) => item.category === cat).length;
  };

  return (
    <>
      {showFilter && categories.length > 0 && (
        <div
          className="mb-8 flex flex-wrap gap-2 sm:mb-10"
          role="group"
          aria-label="გალერეის ფილტრი"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`btn-glass ${activeCategory === cat ? "active" : ""}`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
              <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-medium">
                {getCategoryCount(cat)}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 60}>
            <button
              type="button"
              className="glass-card group relative aspect-[4/3] w-full overflow-hidden p-0 text-left"
              onClick={() => setLightboxIndex(index)}
              aria-label={`${item.title} — გახსნა`}
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="rounded-2xl object-cover transition-transform duration-600 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[14px] font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-white/60">{item.category}</p>
                </div>
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>

      <Lightbox
        items={filtered}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
