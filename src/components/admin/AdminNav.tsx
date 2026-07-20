"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin/news", label: "სიახლები" },
  { href: "/admin/teachers", label: "მასწავლებელი" },
  { href: "/admin/gallery", label: "გალერეა" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="border-b border-border bg-dark text-white">
      <div className="container-padding flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/admin/news" className="text-[15px] font-extrabold">
            <span className="text-accent">N17</span> ადმინი
          </Link>
          <nav className="hidden gap-4 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-semibold ${
                  pathname === link.href ? "text-accent" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[13px] text-white/60 hover:text-accent">
            საიტი →
          </Link>
          <button
            type="button"
            onClick={logout}
            className="border border-white/20 px-3 py-1.5 text-[13px] font-semibold hover:border-accent"
          >
            გასვლა
          </button>
        </div>
      </div>
    </header>
  );
}
