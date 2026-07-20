"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "მთავარი" },
  { href: "/news", label: "სიახლეები" },
  { href: "/admission", label: "მიღება" },
  { href: "/teachers", label: "მასწავლებლები" },
  { href: "/gallery", label: "გალერეა" },
  { href: "/contact", label: "კონტაქტი" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10, 14, 26, 0.75)"
          : "rgba(10, 14, 26, 0.4)",
        backdropFilter: `blur(${scrolled ? "24px" : "16px"})`,
        WebkitBackdropFilter: `blur(${scrolled ? "24px" : "16px"})`,
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
      }}
    >
      <div className="container-padding flex h-14 items-center justify-between sm:h-16 md:h-20">
        <Link
          href="/"
          className="flex items-baseline gap-1 text-[14px] font-extrabold text-foreground sm:gap-1.5 sm:text-[15px] md:text-[17px]"
        >
          <span>ბათუმის</span>
          <span className="gradient-text">{site.shortName}</span>
          <span className="hidden sm:inline">საჯარო სკოლა</span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="მთავარი ნავიგაცია"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-[14px] font-medium transition-colors duration-300 hover:text-white ${
                pathname === link.href ? "text-white" : "text-white/50"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "var(--gradient-accent)" }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Hide CTA on screens smaller than lg to avoid crowding hamburger */}
          <Link
            href="/admission"
            className="btn-primary hidden lg:inline-flex"
          >
            ჩარიცხვა →
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 sm:h-10 sm:w-10 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
          >
            <span
              className={`block h-px w-4 bg-white transition-transform duration-300 sm:w-5 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-white transition-opacity duration-300 sm:w-5 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-white transition-transform duration-300 sm:w-5 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu overlay */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="fixed inset-0 top-14 z-50 overflow-y-auto sm:top-16 lg:hidden"
          style={{
            background: "rgba(10, 14, 26, 0.96)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
          }}
          aria-label="მობილური ნავიგაცია"
        >
          <div className="container-padding flex min-h-full flex-col py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b border-white/5 py-4 text-[16px] font-medium transition-colors ${
                  pathname === link.href
                    ? "gradient-text"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admission"
              className="btn-primary mt-6 justify-center text-[15px]"
            >
              ჩარიცხვა →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
