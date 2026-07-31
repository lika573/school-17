"use client";

import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 pb-14 pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-[#201e1d]">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#c67139] text-[#fff2eb] flex items-center justify-center font-serif text-[15px]">
            14
          </div>
          <span className="text-[14px] font-extrabold">{site.name}</span>
        </div>
        <p className="mt-4 text-[13px] font-medium leading-relaxed text-[#645c50] max-w-[290px]">
          დაფუძნებულია 1952 წელს. ავტორიზებული საჯარო სკოლა, აჭარის ავტონომიური რესპუბლიკა.
        </p>
      </div>

      <div>
        <div className="text-[12px] font-extrabold tracking-wider text-[#8c491a] uppercase">
          მისამართი
        </div>
        <p className="mt-3 text-[14px] font-medium leading-relaxed">
          ბათუმი 6000<br />
          ილია ჭავჭავაძის ქ. 14
        </p>
      </div>

      <div>
        <div className="text-[12px] font-extrabold tracking-wider text-[#8c491a] uppercase">
          კონტაქტი
        </div>
        <p className="mt-3 text-[14px] font-medium leading-relaxed tabular-nums">
          <a href="tel:+995422271414" className="hover:text-[#c67139] transition-colors">
            +995 422 27 14 14
          </a>
          <br />
          <a href="mailto:info@school14.ge" className="hover:text-[#c67139] transition-colors">
            info@school14.ge
          </a>
        </p>
      </div>

      <div>
        <div className="text-[12px] font-extrabold tracking-wider text-[#8c491a] uppercase">
          საათები
        </div>
        <p className="mt-3 text-[14px] font-medium leading-relaxed tabular-nums">
          ორშ–პარ 09:00–18:00<br />
          შაბ 10:00–14:00
        </p>
      </div>
    </footer>
  );
}
