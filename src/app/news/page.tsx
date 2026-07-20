import type { Metadata } from "next";
import { getNews } from "@/lib/server-data";
import { createMetadata } from "@/lib/metadata";
import NewsPageClient from "./NewsPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "სიახლები",
  description:
    "ბათუმის N17 საჯარო სკოლის სიახლები — განცხადებები, ღონისძიებები და მოსწავლეების მიღწევები.",
  path: "/news",
});

export default async function NewsPage() {
  const news = await getNews();
  return <NewsPageClient news={news} />;
}
