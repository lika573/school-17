"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
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
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "ყველა"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      {showFilter && categories.length > 0 && (
        <div
          className="mb-10 flex flex-wrap gap-2"
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
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            className="glass-card group relative aspect-[4/3] overflow-hidden p-0 text-left"
            onClick={() => setLightboxItem(item)}
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
        ))}
      </div>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
}
