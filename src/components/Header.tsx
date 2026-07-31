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

function isLinkActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

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

      <header className="sticky top-0 z-[60] border-b border-[#201e1d]/08 bg-[#f5ead8]/95 backdrop-blur-md">
        <div className="relative z-[70] mx-auto flex h-[72px] max-w-[1440px] items-center gap-6 px-5 sm:px-8 md:h-20 md:px-12">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-3"
            onClick={closeMenu}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c67139] font-serif text-[17px] text-[#fff2eb] transition-transform duration-300 group-hover:scale-105 md:h-11 md:w-11 md:text-[18px]">
              14
            </div>
            <div className="hidden min-w-0 flex-col gap-0.5 sm:flex">
              <span className="truncate text-[14px] font-extrabold leading-tight text-[#201e1d] md:text-[15px]">
                {site.name}
              </span>
              <span className="text-[11px] font-medium text-[#645c50]">
                1952 წლიდან · ბათუმი
              </span>
            </div>
          </Link>

          <nav
            className="ml-auto hidden items-center gap-0.5 xl:gap-1 lg:flex"
            aria-label="მთავარი ნავიგაცია"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap px-2.5 py-2 text-[13px] transition-colors duration-200 xl:px-3 ${
                    active
                      ? "font-extrabold text-[#c67139]"
                      : "font-semibold text-[#645c50] hover:text-[#201e1d]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-[#c67139] transition-transform duration-200 xl:inset-x-3 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <Link
              href="/admission"
              className="hidden items-center rounded-full bg-[#c67139] px-5 py-2.5 text-[13px] font-bold text-[#fff2eb] transition-colors hover:bg-[#b2622d] lg:inline-flex"
            >
              მიღება 2026
            </Link>

            <button
              type="button"
              className="relative z-[80] flex h-11 w-11 flex-col items-center justify-center rounded-full border border-[#201e1d]/10 bg-transparent transition-colors hover:bg-[#ebddc5] lg:hidden"
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
        className={`fixed inset-x-0 top-[72px] bottom-0 z-[58] overflow-y-auto overscroll-contain border-t border-[#201e1d]/08 bg-[#f5ead8] px-5 pb-10 pt-6 transition-all duration-300 ease-out md:top-20 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-label="მობილური ნავიგაცია"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div className="mx-auto flex max-w-lg flex-col">
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`border-b border-[#201e1d]/08 py-4 text-[17px] font-bold transition-colors ${
                  active
                    ? "text-[#c67139]"
                    : "text-[#201e1d] hover:text-[#c67139]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/admission"
            onClick={closeMenu}
            className="mt-8 rounded-full bg-[#c67139] py-3.5 text-center text-[15px] font-bold text-[#fff2eb] transition-colors hover:bg-[#b2622d]"
          >
            მიღება 2026
          </Link>
        </div>
      </nav>
    </>
  );
}
