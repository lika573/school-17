"use client";

import type { NewsCategory } from "@/types";

const categories: (NewsCategory | "ყველა")[] = [
  "ყველა",
  "განცხადება",
  "ღონისძიება",
  "მიღწევა",
];

interface NewsFilterProps {
  active: NewsCategory | "ყველა";
  onChange: (category: NewsCategory | "ყველა") => void;
}

export default function NewsFilter({ active, onChange }: NewsFilterProps) {
  return (
    <div
      className="-mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:mb-10 sm:overflow-visible sm:px-0"
      role="group"
      aria-label="სიახლების ფილტრი"
    >
      <div className="flex gap-2 pb-2 sm:flex-wrap sm:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`btn-glass shrink-0 text-[12px] sm:text-[13px] ${active === cat ? "active" : ""}`}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
