import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        background: "rgba(6, 9, 17, 0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Gradient top line */}
      <div
        className="h-px w-full"
        style={{ background: "var(--gradient-accent)" }}
      />

      <div className="container-padding py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <p className="text-[17px] font-extrabold text-white">
              <span className="gradient-text">{site.shortName}</span> — ბათუმის
              საჯარო სკოლა
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/45">
              {site.tagline}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-white/30">
              ნავიგაცია
            </h2>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link
                  href="/news"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  სიახლეები
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  მიღება
                </Link>
              </li>
              <li>
                <Link
                  href="/teachers"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  მასწავლებლები
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  გალერეა
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  კონტაქტი
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-white/30">
              კონტაქტი
            </h2>
            <address className="space-y-2 text-[14px] not-italic text-white/60">
              <p>{site.contact.address}</p>
              <p>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {site.contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-[13px] text-white/30">
          © {new Date().getFullYear()} {site.name}. ყველა უფლება დაცულია.
        </div>
      </div>
    </footer>
  );
}
