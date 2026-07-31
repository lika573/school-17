"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "მთავარი" },
  { href: "/#about", label: "ჩვენს შესახებ" },
  { href: "/#programs", label: "პროგრამები" },
  { href: "/admission", label: "მიღება" },
  { href: "/teachers", label: "მასწავლებლები" },
  { href: "/news", label: "სიახლეები" },
  { href: "/contact", label: "კონტაქტი" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%`, background: "#c67139" }}
        aria-hidden="true"
      />

      <header className="sticky top-0 z-50 bg-[#f5ead8]/90 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 flex h-20 items-center justify-between z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-[44px] h-[44px] rounded-full bg-[#c67139] flex items-center justify-center text-[18px] font-normal text-[#fff2eb] font-serif shadow-sm transition-transform duration-300 group-hover:scale-105">
              14
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-extrabold leading-tight text-[#201e1d]">
                {site.name}
              </span>
              <span className="text-[11px] font-medium text-[#645c50]">
                1952 წლიდან · ბათუმი, აჭარა
              </span>
            </div>
          </Link>

          {/* Pill Navigation Bar */}
          <nav
            className="hidden items-center gap-1 bg-[#ebddc5] rounded-full p-1.5 lg:flex"
            aria-label="მთავარი ნავიგაცია"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "font-bold text-[#402310] bg-[#f5ead8] shadow-xs"
                      : "font-semibold text-[#645c50] hover:bg-[#ffe1d0] hover:text-[#8c491a]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/admission"
              className="hidden lg:inline-flex rounded-full bg-[#c67139] text-[#fff2eb] text-[14px] font-bold px-6.5 py-3.5 hover:bg-[#b2622d] hover:-translate-y-0.5 transition-all shadow-sm"
            >
              მიღება 2026
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-[#ebddc5] transition-all hover:bg-[#ffe1d0] lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
            >
              <span
                className={`block h-0.5 w-4 bg-[#201e1d] transition-transform duration-300 ${menuOpen ? "translate-y-[4px] rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-4 bg-[#201e1d] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-4 bg-[#201e1d] transition-transform duration-300 ${menuOpen ? "-translate-y-[4px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            className="fixed inset-0 top-20 z-50 overflow-y-auto lg:hidden bg-[#f5ead8]/98 backdrop-blur-xl p-6"
            aria-label="მობილური ნავიგაცია"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b border-[#ebddc5] pb-3 text-[16px] font-bold transition-colors ${
                    pathname === link.href
                      ? "text-[#c67139]"
                      : "text-[#645c50] hover:text-[#201e1d]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admission"
                className="mt-4 text-center rounded-full bg-[#c67139] text-[#fff2eb] text-[15px] font-bold py-3.5 hover:bg-[#b2622d] transition-all"
              >
                მიღება 2026
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
