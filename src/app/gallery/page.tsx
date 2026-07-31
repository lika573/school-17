import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import { getGallery, getGalleryCategories } from "@/lib/server-data";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "გალერეა",
  description:
    "ბათუმის N17 საჯარო სკოლის ფოტო გალერეა — სკოლის ცხოვრება, ღონისძიებები და მიღწევები.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const gallery = await getGallery();
  const categories = await getGalleryCategories();

  return (
    <div className="container-padding py-10 sm:py-16 md:py-24">
      <ScrollReveal>
        <SectionTitle subtitle="სკოლის ყოველდღიური ცხოვრება, ღონისძიებები და მოსწავლეების მიღწევები.">
          გალერეა
        </SectionTitle>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="mt-6 sm:mt-10">
          <GalleryGrid items={gallery} categories={categories} />
        </div>
      </ScrollReveal>
    </div>
  );
}
