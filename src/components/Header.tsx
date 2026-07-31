"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "მთავარი" },
  { href: "/#about", label: "ჩვენს შესახებ" },
  { href: "/#programs", label: "პროგრამები" },
  { href: "/admission", label: "მიღება" },
  { href: "/teachers", label: "მასწავლებლები" },
  { href: "/news", label: "სიახლეები" },
  { href: "/gallery", label: "გალერეა" },
  { href: "/contact", label: "კონტაქტი" },
];

export default function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    closeMenu();
    if (href.includes("#")) {
      const id = href.split("#")[1];
      if (!id) return;
      // Allow route change to settle, then scroll to section
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%`, background: "#c67139" }}
        aria-hidden="true"
      />

      <header className="sticky top-0 z-[60] bg-[#f5ead8]/90 backdrop-blur-md">
        <div className="relative z-[70] mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 md:px-12">
          <Link href="/" className="group flex items-center gap-3" onClick={closeMenu}>
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#c67139] font-serif text-[18px] text-[#fff2eb] shadow-sm transition-transform duration-300 group-hover:scale-105">
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

          <nav
            className="hidden items-center gap-1 rounded-full bg-[#ebddc5] p-1.5 lg:flex"
            aria-label="მთავარი ნავიგაცია"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-[13px] transition-all duration-200 ${
                    isActive && !link.href.includes("#")
                      ? "bg-[#f5ead8] font-bold text-[#402310] shadow-xs"
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
              className="hidden rounded-full bg-[#c67139] px-6.5 py-3.5 text-[14px] font-bold text-[#fff2eb] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#b2622d] lg:inline-flex"
            >
              მიღება 2026
            </Link>

            <button
              type="button"
              className="relative z-[80] flex h-11 w-11 flex-col items-center justify-center rounded-full bg-[#ebddc5] transition-all hover:bg-[#ffe1d0] lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
            >
              <span className="sr-only">
                {menuOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
              </span>
              <span
                className={`absolute h-0.5 w-5 bg-[#201e1d] transition-transform duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-[#201e1d] transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-[#201e1d] transition-transform duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Portal-like sibling: outside backdrop-blur so fixed covers the viewport */}
      <div
        className={`fixed inset-0 z-[55] bg-[#201e1d]/25 transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      <nav
        id={menuId}
        className={`fixed inset-x-0 top-20 bottom-0 z-[58] overflow-y-auto overscroll-contain bg-[#f5ead8] px-5 pb-10 pt-4 transition-transform duration-300 ease-out lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-label="მობილური ნავიგაცია"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div className="mx-auto flex max-w-lg flex-col gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : !link.href.includes("#") &&
                  (pathname === link.href ||
                    pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`rounded-2xl px-4 py-3.5 text-[17px] font-bold transition-colors ${
                  isActive
                    ? "bg-[#ebddc5] text-[#c67139]"
                    : "text-[#201e1d] hover:bg-[#ebddc5]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/admission"
            onClick={closeMenu}
            className="mt-4 rounded-full bg-[#c67139] py-3.5 text-center text-[15px] font-bold text-[#fff2eb] transition-all hover:bg-[#b2622d]"
          >
            მიღება 2026
          </Link>
        </div>
      </nav>
    </>
  );
}
