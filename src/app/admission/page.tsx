import type { Metadata } from "next";
import AdmissionForm from "@/components/AdmissionForm";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import FaqAccordion from "@/components/FaqAccordion";
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
        <SectionTitle subtitle={`${site.admission.year} სასწავლო წლის მიღების პროცესის შესახებ ინფორმაცია და ონლაინ განაცხადის ფორმა.`}>
          მიღება {site.admission.year}
        </SectionTitle>
      </ScrollReveal>

      {/* Timeline */}
      <ScrollReveal delay={100}>
        <section className="glass-card-static mt-8 p-5 sm:mt-12 sm:p-6 md:p-10">
          <h2 className="mb-6 text-[18px] font-extrabold text-foreground sm:mb-8 sm:text-[20px]">
            რეგისტრაციის ვადები
          </h2>
          <div className="timeline">
            {site.admission.deadlines.map((deadline, index) => (
              <div key={deadline.label} className="timeline-item">
                <div className="timeline-dot" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="text-[14px] font-semibold text-foreground sm:text-[15px]">
                    {deadline.label}
                  </span>
                  <span className="gradient-text shrink-0 text-[13px] font-semibold sm:text-[14px]">
                    {deadline.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Documents with step numbers */}
      <ScrollReveal delay={200}>
        <section className="mt-8 sm:mt-12">
          <h2 className="mb-4 text-[18px] font-extrabold text-foreground sm:mb-6 sm:text-[20px]">
            საჭირო დოკუმენტები
          </h2>
          <ul className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {site.admission.documents.map((doc, index) => (
              <li
                key={doc}
                className="glass-card-static flex items-center gap-4 p-4 sm:p-5"
              >
                <span className="step-number">{index + 1}</span>
                <span className="text-[13px] text-secondary sm:text-[14px]">
                  {doc}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal delay={250}>
        <section className="mt-8 sm:mt-12">
          <h2 className="mb-4 text-[18px] font-extrabold text-foreground sm:mb-6 sm:text-[20px]">
            ხშირად დასმული კითხვები
          </h2>
          <div className="glass-card-static p-4 sm:p-6 md:p-8">
            <FaqAccordion items={site.admission.faq} />
          </div>
        </section>
      </ScrollReveal>

      {/* Online Application Form */}
      <ScrollReveal delay={300}>
        <section className="mt-10 border-t border-border pt-10 sm:mt-16 sm:pt-16">
          <h2 className="mb-2 text-[18px] font-extrabold text-foreground sm:text-[20px]">
            ონლაინ განაცხადი
          </h2>
          <p className="mb-6 text-[13px] text-secondary sm:mb-8 sm:text-[14px]">
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
