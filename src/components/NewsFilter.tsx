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
      className="mb-10 flex flex-wrap gap-2"
      role="group"
      aria-label="სიახლების ფილტრი"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`btn-glass ${active === cat ? "active" : ""}`}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
