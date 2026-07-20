import type { Metadata } from "next";
import Image from "next/image";
import { Noto_Sans_Georgian } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: "ბათუმის N17 საჯარო სკოლა",
  description:
    "ბათუმის N17 საჯარო სკოლა — ხარისხიანი განათლება 1965 წლიდან. 1 240 მოსწავლე, 86 მასწავლებელი, თანამედროვე სასწავლო პროგრამები.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className={`${notoGeorgian.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        {/* Fixed background image */}
        <div className="fixed-bg" aria-hidden="true">
          <Image
            src="https://p2.piqsels.com/preview/794/131/807/architecture-city-cityscape-apartment.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="fixed-bg-overlay" />
        </div>

        {/* Scrollable content */}
        <div className="site-content flex min-h-full flex-col">
          <SiteChrome>{children}</SiteChrome>
        </div>
      </body>
    </html>
  );
}
