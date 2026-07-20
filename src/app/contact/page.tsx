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
    <div className="container-padding py-16 md:py-24">
      <ScrollReveal>
        <SectionTitle>კონტაქტი</SectionTitle>
        <p className="mt-4 max-w-2xl text-[15px] text-white/50">
          გვესტუმრეთ, დაგვიკავშირდით ტელეფონით ან ელფოსტით.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal delay={100}>
          <div>
            <h2 className="mb-6 text-[20px] font-extrabold text-white">
              საკონტაქტო ინფორმაცია
            </h2>
            <address className="space-y-4 text-[15px] not-italic">
              <div className="glass-card-static p-5">
                <p className="text-[13px] font-bold uppercase tracking-wider text-white/35">
                  მისამართი
                </p>
                <p className="mt-1 font-semibold text-white">
                  {site.contact.address}
                </p>
              </div>
              <div className="glass-card-static p-5">
                <p className="text-[13px] font-bold uppercase tracking-wider text-white/35">
                  ტელეფონი
                </p>
                <p className="mt-1">
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="link-accent font-semibold"
                  >
                    {site.contact.phone}
                  </a>
                </p>
              </div>
              <div className="glass-card-static p-5">
                <p className="text-[13px] font-bold uppercase tracking-wider text-white/35">
                  ელფოსტა
                </p>
                <p className="mt-1">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-accent font-semibold"
                  >
                    {site.contact.email}
                  </a>
                </p>
              </div>
            </address>

            <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <iframe
                src={site.contact.mapEmbed}
                title="ბათუმის N17 საჯარო სკოლის მდებარეობა რუკაზე"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div>
            <h2 className="mb-6 text-[20px] font-extrabold text-white">
              მოგვწერეთ
            </h2>
            <div className="glass-card-static p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
