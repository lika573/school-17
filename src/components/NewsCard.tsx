import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { NewsItem } from "@/types";

interface NewsCardProps {
  item: NewsItem;
}

function getCategoryDotClass(category: string): string {
  switch (category) {
    case "განცხადება": return "category-dot--announcement";
    case "ღონისძიება": return "category-dot--event";
    case "მიღწევა": return "category-dot--achievement";
    default: return "category-dot--announcement";
  }
}

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function NewsCard({ item }: NewsCardProps) {
  const readTime = estimateReadingTime(item.content);

  return (
    <article className="glass-card group flex flex-col overflow-hidden">
      <Link
        href={`/news/${item.slug}`}
        className="img-zoom relative block aspect-[16/10]"
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          unoptimized={item.image.startsWith("/uploads/")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Reading time badge */}
        <div className="absolute right-3 top-3 rounded-lg bg-black/40 px-2 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
          {readTime} წთ
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <div className="mb-2 flex items-center gap-2 text-[11px] sm:mb-3 sm:gap-3 sm:text-[13px]">
          {/* Category with colored dot */}
          <span className="flex items-center gap-1.5">
            <span className={`category-dot ${getCategoryDotClass(item.category)}`} />
            <span className="font-semibold text-white/70">{item.category}</span>
          </span>
          <span className="text-white/25">·</span>
          <span className="text-white/35">{formatDate(item.date)}</span>
        </div>
        <h3 className="mb-2 text-[15px] font-bold leading-snug text-white sm:text-[17px]">
          <Link
            href={`/news/${item.slug}`}
            className="transition-colors hover:text-white/80"
          >
            {item.title}
          </Link>
        </h3>
        <p className="mb-3 flex-1 text-[13px] leading-relaxed text-white/45 sm:mb-4 sm:text-[14px]">
          {item.excerpt}
        </p>
        <Link
          href={`/news/${item.slug}`}
          className="link-accent text-[13px] font-semibold sm:text-[14px]"
        >
          სრულად →
        </Link>
      </div>
    </article>
  );
}
