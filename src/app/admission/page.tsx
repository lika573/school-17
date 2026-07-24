import type { Metadata } from "next";
import AdmissionForm from "@/components/AdmissionForm";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import { site } from "@/lib/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "მიღება",
  description:
    "2026–2027 სასწავლო წლის მიღების ინფორმაცია, საჭირო დოკუმენტები და ონლაინ განაცხადის ფორმა.",
  path: "/admission",
});

export default function AdmissionPage() {
  return (
    <div className="container-padding py-10 sm:py-16 md:py-24">
      <ScrollReveal>
        <SectionTitle>მიღება {site.admission.year}</SectionTitle>
        <p className="mt-3 max-w-2xl text-[14px] text-white/50 sm:mt-4 sm:text-[15px]">
          {site.admission.year} სასწავლო წლის მიღების პროცესის შესახებ
          ინფორმაცია და ონლაინ განაცხადის ფორმა.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="glass-card-static mt-8 p-4 sm:mt-12 sm:p-6 md:p-10">
          <h2 className="mb-4 text-[18px] font-extrabold text-white sm:mb-6 sm:text-[20px]">
            რეგისტრაციის ვადები
          </h2>
          <div className="divide-y divide-white/5">
            {site.admission.deadlines.map((deadline) => (
              <div
                key={deadline.label}
                className="flex flex-col gap-1 py-3 sm:py-4 md:flex-row md:items-center md:justify-between"
              >
                <span className="text-[14px] font-semibold text-white sm:text-[15px]">
                  {deadline.label}
                </span>
                <span className="gradient-text text-[13px] font-semibold sm:text-[14px]">
                  {deadline.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <section className="mt-8 sm:mt-12">
          <h2 className="mb-4 text-[18px] font-extrabold text-white sm:mb-6 sm:text-[20px]">
            საჭირო დოკუმენტები
          </h2>
          <ul className="grid gap-2 sm:gap-3 md:grid-cols-2">
            {site.admission.documents.map((doc) => (
              <li
                key={doc}
                className="glass-card-static flex items-start gap-3 p-3 text-[13px] text-white/70 sm:p-4 sm:text-[14px]"
              >
                <span className="gradient-text mt-0.5 font-bold">→</span>
                {doc}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <section className="mt-10 border-t border-white/5 pt-10 sm:mt-16 sm:pt-16">
          <h2 className="mb-2 text-[18px] font-extrabold text-white sm:text-[20px]">
            ონლაინ განაცხადი
          </h2>
          <p className="mb-6 text-[13px] text-white/45 sm:mb-8 sm:text-[14px]">
            შეავსეთ ფორმა და ჩვენი ადმინისტრაცია დაგიკავშირდებათ.
          </p>
          <div className="glass-card-static p-4 sm:p-6 md:p-8">
            <AdmissionForm />
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
