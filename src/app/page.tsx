import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import TeacherCard from "@/components/TeacherCard";
import {
  getGallery,
  getLatestNews,
  getTeachers,
} from "@/lib/server-data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latestNews = await getLatestNews(3);
  const teachers = await getTeachers();
  const gallery = await getGallery();
  const featuredTeachers = teachers.slice(0, 4);
  const miniGallery = gallery.slice(0, 4);

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="container-padding flex min-h-[60vh] flex-col justify-center py-12 sm:min-h-[70vh] sm:py-16 md:min-h-[85vh] md:py-32">
        <div className="max-w-4xl">
          <h1 className="hero-title hero-animate">
            <span className="accent-gradient">{site.tagline}</span>
          </h1>
          <p className="hero-animate-delay-1 mt-4 max-w-2xl text-[14px] leading-relaxed text-white/55 sm:mt-6 sm:text-[15px] md:text-[17px]">
            {site.mission}
          </p>
        </div>

        <div className="hero-animate-delay-2 mt-8 grid grid-cols-3 gap-2 sm:mt-12 sm:gap-4 md:mt-16 md:max-w-xl">
          {[
            {
              value: site.stats.students.toLocaleString("ka-GE"),
              label: "მოსწავლე",
            },
            { value: String(site.stats.teachers), label: "მასწავლებელი" },
            { value: String(site.stats.years), label: "წელი" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card-static px-3 py-4 text-center sm:px-4 sm:py-6 md:px-6 md:py-8"
            >
              <p className="gradient-text text-[22px] font-extrabold sm:text-[28px] md:text-[36px]">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] text-white/40 sm:text-[13px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="hero-animate-delay-3 mt-6 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
          <Link href="/admission" className="btn-primary text-[13px] sm:text-[14px]">
            ჩარიცხვა →
          </Link>
          <Link href="/contact" className="btn-glass text-[13px] sm:text-[14px]">
            კონტაქტი
          </Link>
        </div>
      </section>

      {/* ── School Image Banner ── */}
      <ScrollReveal>
        <section className="container-padding pb-4 sm:pb-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl sm:aspect-[21/9] md:aspect-[21/7]">
            <Image
              src="https://images.unsplash.com/photo-1580582932707-658abb7726b0?w=1600&h=700&fit=crop"
              alt="ბათუმის N17 საჯარო სკოლის შენობა"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </section>
      </ScrollReveal>

      {/* ── News Section ── */}
      <ScrollReveal>
        <section className="container-padding py-10 sm:py-16 md:py-24">
          <div className="mb-6 flex items-end justify-between sm:mb-10">
            <SectionTitle>სიახლები</SectionTitle>
            <Link
              href="/news"
              className="link-accent hidden text-[14px] font-semibold sm:inline"
            >
              ყველა სიახლე →
            </Link>
          </div>
          <div className="stagger-children grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {latestNews.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 120}>
                <NewsCard item={item} />
              </ScrollReveal>
            ))}
          </div>
          <Link
            href="/news"
            className="link-accent mt-6 inline-block text-[14px] font-semibold sm:hidden"
          >
            ყველა სიახლე →
          </Link>
        </section>
      </ScrollReveal>

      {/* ── Student of the Month ── */}
      <ScrollReveal>
        <section className="container-padding py-10 sm:py-16 md:py-24">
          <div className="glass-card-strong overflow-hidden">
            <div className="grid items-center gap-0 md:grid-cols-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/4] sm:max-w-sm md:rounded-none md:rounded-l-[20px]">
                <Image
                  src={site.studentOfMonth.image}
                  alt={site.studentOfMonth.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-8 md:p-12">
                <p className="gradient-text text-[11px] font-bold uppercase tracking-wider sm:text-[13px]">
                  თვის საუკეთესო მოსწავლე
                </p>
                <h2 className="mt-3 text-[22px] font-extrabold text-white sm:mt-4 sm:text-[28px] md:text-[36px]">
                  {site.studentOfMonth.name}
                </h2>
                <p className="mt-1 text-[13px] text-white/40 sm:text-[14px]">
                  {site.studentOfMonth.grade}
                </p>
                <blockquote className="mt-4 border-l-2 border-white/15 pl-4 text-[14px] leading-relaxed text-white/60 sm:mt-6 sm:pl-6 sm:text-[15px] md:text-[17px]">
                  &ldquo;{site.studentOfMonth.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Teachers Section ── */}
      <ScrollReveal>
        <section className="container-padding py-10 sm:py-16 md:py-24">
          <div className="mb-6 flex items-end justify-between sm:mb-10">
            <SectionTitle>მასწავლებელი</SectionTitle>
            <Link
              href="/teachers"
              className="link-accent hidden text-[14px] font-semibold sm:inline"
            >
              სრული გუნდი →
            </Link>
          </div>
          <div className="stagger-children grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {featuredTeachers.map((teacher, i) => (
              <ScrollReveal key={teacher.id} delay={i * 100}>
                <TeacherCard teacher={teacher} />
              </ScrollReveal>
            ))}
          </div>
          <Link
            href="/teachers"
            className="link-accent mt-6 inline-block text-[14px] font-semibold sm:hidden"
          >
            სრული გუნდი →
          </Link>
        </section>
      </ScrollReveal>

      {/* ── Admission CTA ── */}
      <ScrollReveal>
        <section className="container-padding py-4 sm:py-8">
          <div
            className="overflow-hidden rounded-2xl p-6 sm:p-8 md:p-12"
            style={{
              background: "var(--gradient-accent)",
              boxShadow: "0 8px 40px rgba(120, 100, 255, 0.3)",
            }}
          >
            <div className="flex flex-col gap-5 sm:flex-col sm:items-start md:flex-row md:items-center md:justify-between md:gap-6">
              <div>
                <h2 className="text-[22px] font-extrabold text-white sm:text-[28px] md:text-[36px]">
                  {site.admission.year} სასწავლო წელი
                </h2>
                <p className="mt-2 max-w-lg text-[14px] text-white/80 sm:mt-3 sm:text-[15px]">
                  მიღების რეგისტრაცია გახსნილია. შეავსეთ ონლაინ განაცხადი ან
                  დაგვიკავშირდით დამატებითი ინფორმაციისთვის.
                </p>
              </div>
              <Link
                href="/admission"
                className="w-full shrink-0 rounded-xl bg-white/15 px-6 py-3.5 text-center text-[14px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/25 sm:w-auto"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                განაცხადის შევსება →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Gallery Section ── */}
      <ScrollReveal>
        <section className="container-padding py-10 sm:py-16 md:py-24">
          <div className="mb-6 flex items-end justify-between sm:mb-10">
            <SectionTitle>გალერეა</SectionTitle>
            <Link
              href="/gallery"
              className="link-accent hidden text-[14px] font-semibold sm:inline"
            >
              სრული გალერეა →
            </Link>
          </div>
          <div className="stagger-children grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {miniGallery.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 100}>
                <Link
                  href="/gallery"
                  className="group relative aspect-square overflow-hidden rounded-2xl"
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
