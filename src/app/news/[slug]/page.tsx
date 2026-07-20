import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getNews, getNewsBySlug } from "@/lib/server-data";
import { createMetadata } from "@/lib/metadata";

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

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) notFound();

  return (
    <article className="container-padding py-16 md:py-24">
      <Link
        href="/news"
        className="link-accent mb-8 inline-block text-[14px] font-semibold"
      >
        ← ყველა სიახლე
      </Link>

      <div className="mb-4 flex items-center gap-3 text-[13px]">
        <span className="gradient-text font-semibold">{item.category}</span>
        <span className="text-white/35">{formatDate(item.date)}</span>
      </div>

      <h1 className="max-w-3xl text-[28px] font-extrabold leading-tight text-white md:text-[40px]">
        {item.title}
      </h1>

      <div className="relative mt-8 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
          priority
          unoptimized={item.image.startsWith("/uploads/")}
        />
      </div>

      <div className="mt-10 max-w-3xl">
        {item.content.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            className="mb-4 text-[15px] leading-relaxed text-white/55 md:text-[17px]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
