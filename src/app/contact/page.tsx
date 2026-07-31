import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import { site } from "@/lib/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "კონტაქტი",
  description:
    "დაუკავშირდით ბათუმის N17 საჯარო სკოლას — მისამართი, ტელეფონი, ელფოსტა და საკონტაქტო ფორმა.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-padding py-10 sm:py-16 md:py-24">
      <ScrollReveal>
        <SectionTitle subtitle="გვესტუმრეთ, დაგვიკავშირდით ტელეფონით ან ელფოსტით.">
          კონტაქტი
        </SectionTitle>
      </ScrollReveal>

      <div className="mt-8 grid gap-8 sm:mt-12 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal delay={100}>
          <div>
            <h2 className="mb-4 text-[18px] font-extrabold text-foreground sm:mb-6 sm:text-[20px]">
              საკონტაქტო ინფორმაცია
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {/* Address */}
              <div className="glass-card-static flex items-start gap-4 p-4 sm:p-5">
                <div className="contact-icon" aria-hidden="true">📍</div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-secondary sm:text-[12px]">
                    მისამართი
                  </p>
                  <p className="mt-1 text-[14px] font-semibold text-foreground sm:text-[15px]">
                    {site.contact.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="glass-card-static flex items-start gap-4 p-4 sm:p-5">
                <div className="contact-icon" aria-hidden="true">📞</div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-secondary sm:text-[12px]">
                    ტელეფონი
                  </p>
                  <p className="mt-1">
                    <a
                      href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                      className="link-accent text-[14px] font-semibold sm:text-[15px]"
                    >
                      {site.contact.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="glass-card-static flex items-start gap-4 p-4 sm:p-5">
                <div className="contact-icon" aria-hidden="true">✉️</div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-secondary sm:text-[12px]">
                    ელფოსტა
                  </p>
                  <p className="mt-1">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="link-accent text-[14px] font-semibold sm:text-[15px]"
                    >
                      {site.contact.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="glass-card-static flex items-start gap-4 p-4 sm:p-5">
                <div className="contact-icon" aria-hidden="true">🕐</div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-secondary sm:text-[12px]">
                    სამუშაო საათები
                  </p>
                  <p className="mt-1 text-[14px] font-semibold text-foreground sm:text-[15px]">
                    {site.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl sm:mt-8 sm:aspect-[4/3]">
              <iframe
                src={site.contact.mapEmbed}
                title="ბათუმის N17 საჯარო სკოლის მდებარეობა რუკაზე"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* Glass overlay label */}
              <div
                className="absolute bottom-4 left-4 rounded-xl px-4 py-2 text-[13px] font-semibold text-white"
                style={{
                  background: "rgba(10, 14, 26, 0.7)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                📍 {site.contact.address}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div>
            <h2 className="mb-4 text-[18px] font-extrabold text-foreground sm:mb-6 sm:text-[20px]">
              მოგვწერეთ
            </h2>
            <div className="glass-card-static p-4 sm:p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
