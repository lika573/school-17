import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getNews, getNewsBySlug } from "@/lib/server-data";
import { createMetadata } from "@/lib/metadata";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};

  return createMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/news/${item.slug}`,
    image: item.image,
  });
}

function getCategoryDotClass(category: string): string {
  switch (category) {
    case "განცხადება": return "category-dot--announcement";
    case "ღონისძიება": return "category-dot--event";
    case "მიღწევა": return "category-dot--achievement";
    default: return "category-dot--announcement";
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) notFound();

  // Get related news (same category, exclude current)
  const allNews = await getNews();
  const related = allNews
    .filter((n) => n.category === item.category && n.id !== item.id)
    .slice(0, 2);

  const paragraphs = item.content.split("\n\n");

  return (
    <article className="container-padding py-10 sm:py-16 md:py-24">
      {/* Back link */}
      <Link
        href="/news"
        className="link-accent mb-6 inline-flex items-center gap-2 text-[14px] font-semibold sm:mb-8"
      >
        ← ყველა სიახლე
      </Link>

      {/* Hero image with overlay content */}
      <div className="news-hero">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
          priority
          unoptimized={item.image.startsWith("/uploads/")}
        />
        <div className="news-hero-overlay" />
        <div className="news-hero-content">
          <div className="mb-3 flex items-center gap-3 text-[13px]">
            <span className="flex items-center gap-1.5">
              <span className={`category-dot ${getCategoryDotClass(item.category)}`} />
              <span className="font-semibold text-white/80">{item.category}</span>
            </span>
            <span className="text-white/30">·</span>
            <span className="text-white/50">{formatDate(item.date)}</span>
          </div>
          <h1 className="max-w-3xl text-[24px] font-extrabold leading-tight text-white sm:text-[32px] md:text-[40px]">
            {item.title}
          </h1>
        </div>
      </div>

      {/* Share buttons */}
      <div className="mb-8 flex items-center gap-3 sm:mb-10">
        <span className="text-[13px] font-semibold text-secondary">გაზიარება:</span>
        <CopyLinkButton />
      </div>

      {/* Article content */}
      <div className="max-w-3xl">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className={`mb-4 text-[15px] leading-relaxed text-secondary md:text-[17px] ${
              i === 0 ? "drop-cap" : ""
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Related News */}
      {related.length > 0 && (
        <ScrollReveal>
          <section className="mt-12 border-t border-border pt-10 sm:mt-16 sm:pt-14">
            <h2 className="mb-6 text-[18px] font-extrabold text-foreground sm:text-[20px]">
              მსგავსი სიახლეები
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {related.map((relatedItem) => (
                <Link
                  key={relatedItem.id}
                  href={`/news/${relatedItem.slug}`}
                  className="glass-card group flex items-start gap-4 p-4 sm:p-5"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                    <Image
                      src={relatedItem.image}
                      alt={relatedItem.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="96px"
                      loading="lazy"
                      unoptimized={relatedItem.image.startsWith("/uploads/")}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 flex items-center gap-1.5 text-[11px] sm:text-[12px]">
                      <span className={`category-dot ${getCategoryDotClass(relatedItem.category)}`} />
                      <span className="text-secondary">{formatDate(relatedItem.date)}</span>
                    </p>
                    <h3 className="text-[14px] font-bold leading-snug text-foreground transition-colors group-hover:text-accent sm:text-[15px]">
                      {relatedItem.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </article>
  );
}

function CopyLinkButton() {
  return (
    <button
      type="button"
      className="share-btn"
      onClick={() => {
        if (typeof window !== "undefined") {
          navigator.clipboard.writeText(window.location.href);
        }
      }}
      aria-label="ბმულის კოპირება"
      title="ბმულის კოპირება"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </button>
  );
}
