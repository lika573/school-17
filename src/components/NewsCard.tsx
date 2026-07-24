import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { NewsItem } from "@/types";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
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
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <div className="mb-2 flex items-center gap-2 text-[11px] sm:mb-3 sm:gap-3 sm:text-[13px]">
          <span className="gradient-text font-semibold">{item.category}</span>
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
