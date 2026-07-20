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
    <div className="container-padding py-16 md:py-24">
      <ScrollReveal>
        <SectionTitle>მიღება {site.admission.year}</SectionTitle>
        <p className="mt-4 max-w-2xl text-[15px] text-white/50">
          {site.admission.year} სასწავლო წლის მიღების პროცესის შესახებ
          ინფორმაცია და ონლაინ განაცხადის ფორმა.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="glass-card-static mt-12 p-6 md:p-10">
          <h2 className="mb-6 text-[20px] font-extrabold text-white">
            რეგისტრაციის ვადები
          </h2>
          <div className="divide-y divide-white/5">
            {site.admission.deadlines.map((deadline) => (
              <div
                key={deadline.label}
                className="flex flex-col gap-1 py-4 md:flex-row md:items-center md:justify-between"
              >
                <span className="text-[15px] font-semibold text-white">
                  {deadline.label}
                </span>
                <span className="gradient-text text-[14px] font-semibold">
                  {deadline.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <section className="mt-12">
          <h2 className="mb-6 text-[20px] font-extrabold text-white">
            საჭირო დოკუმენტები
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {site.admission.documents.map((doc) => (
              <li
                key={doc}
                className="glass-card-static flex items-start gap-3 p-4 text-[14px] text-white/70"
              >
                <span className="gradient-text mt-0.5 font-bold">→</span>
                {doc}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <section className="mt-16 border-t border-white/5 pt-16">
          <h2 className="mb-2 text-[20px] font-extrabold text-white">
            ონლაინ განაცხადი
          </h2>
          <p className="mb-8 text-[14px] text-white/45">
            შეავსეთ ფორმა და ჩვენი ადმინისტრაცია დაგიკავშირდებათ.
          </p>
          <div className="glass-card-static p-6 md:p-8">
            <AdmissionForm />
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
