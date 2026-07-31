import type { Metadata } from "next";
import { Caprasimo, Figtree, Noto_Sans_Georgian } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import AnimatedBackground from "@/components/AnimatedBackground";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});

const caprasimo = Caprasimo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caprasimo",
  display: "swap",
});

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: "ბათუმის №14 საჯარო სკოლა",
  description:
    "ბათუმის №14 საჯარო სკოლა — დაფუძნებულია 1952 წელს. 1 274 მოსწავლე, 96 პედაგოგი, 74 წლიანი ისტორია ბათუმში.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ka"
      className={`${figtree.variable} ${caprasimo.variable} ${notoGeorgian.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased bg-[#f5ead8] text-[#201e1d]">
        {/* Animated gradient mesh background */}
        <AnimatedBackground />

        {/* Scrollable content */}
        <div className="site-content flex min-h-full flex-col">
          <SiteChrome>{children}</SiteChrome>
        </div>
      </body>
    </html>
  );
}
