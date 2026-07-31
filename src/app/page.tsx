import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import MarqueeTicker from "@/components/MarqueeTicker";
import RotatingText from "@/components/RotatingText";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="w-full bg-[#f5ead8] text-[#201e1d] font-sans overflow-hidden">
      {/* ── 1. Hero Section ── */}
      <section className="relative px-5 sm:px-8 md:px-12 pt-8 sm:pt-14 pb-16 sm:pb-22 overflow-hidden">
        {/* Floating Organic Blobs */}
        <div
          className="absolute -top-[120px] -right-[80px] w-[520px] h-[520px] rounded-full bg-[#e1eecc] animate-[og-float_16s_ease-in-out_infinite] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-[340px] right-[420px] w-[120px] h-[120px] rounded-full bg-[#ffe1d0] animate-[og-float_11s_1s_ease-in-out_infinite] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-14 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5 bg-[#ebddc5] rounded-full py-2 px-4.5 pr-4 self-start animate-[og-pop_0.8s_both]">
              <span className="w-5.5 h-5.5 rounded-full bg-[#7a8a5e]" />
              <span className="text-[12px] font-bold text-[#3d472b]">
                დაფუძნებულია 1952 წელს · 74 წელი ბათუმში
              </span>
            </div>

            <h1 className="margin-0 text-[48px] sm:text-[66px] md:text-[82px] font-extrabold leading-[1.02] tracking-[-0.03em]">
              <span className="block animate-[og-rise_0.9s_0.1s_cubic-bezier(0.2,0.85,0.25,1)_both]">
                ვასწავლით
              </span>
              <RotatingText />
              <span className="block animate-[og-rise_0.9s_0.25s_cubic-bezier(0.2,0.85,0.25,1)_both]">
                ბათუმში
              </span>
            </h1>

            <p className="margin-0 max-w-[520px] text-[16px] sm:text-[17px] font-medium leading-[1.65] text-[#645c50] pretty animate-[og-rise_0.9s_0.4s_cubic-bezier(0.2,0.85,0.25,1)_both]">
              {site.mission}
            </p>

            <div className="flex flex-wrap gap-3.5 animate-[og-rise_0.9s_0.55s_cubic-bezier(0.2,0.85,0.25,1)_both]">
              <Link
                href="/admission"
                className="rounded-full bg-[#c67139] text-[#fff2eb] font-sans text-[16px] font-bold px-8 py-4.5 hover:bg-[#b2622d] hover:-translate-y-1 transition-all shadow-sm"
              >
                მიღების პროცესი
              </Link>
              <Link
                href="/#about"
                className="rounded-full border-2 border-[#201e1d] bg-transparent text-[#201e1d] font-sans text-[16px] font-bold px-8 py-4 hover:bg-[#ebddc5] hover:-translate-y-1 transition-all"
              >
                სკოლის ტური
              </Link>
            </div>
          </div>

          {/* Hero Schoolyard Frame */}
          <div className="relative animate-[og-pop_1.1s_0.2s_both]">
            <div className="rounded-[28px] overflow-hidden bg-[repeating-linear-gradient(135deg,#dcd3c4_0_14px,#eee7db_14px_28px)] h-[380px] sm:h-[480px] filter saturate-[.6] contrast-[.9] brightness-[1.06] relative shadow-md">
              <Image
                src="https://edu.aris.ge/news/wp-content/uploads/2019/02/1.jpg"
                alt="ბათუმის №14 საჯარო სკოლა"
                fill
                className="object-cover opacity-80"
                priority
              />
              <span className="absolute bottom-4 left-4 font-mono text-[11px] text-[#402310] bg-[#f9f4ed] px-2.5 py-1.5 rounded-full shadow-xs">
                photo · schoolyard, washed
              </span>
            </div>

            {/* Floating Stats Pill Badge */}
            <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-[#7a8a5e] text-[#f0fae1] rounded-[28px] p-5 sm:p-6 animate-[og-float_13s_ease-in-out_infinite] shadow-lg">
              <div className="text-[30px] sm:text-[34px] font-extrabold leading-none tabular-nums">
                <CountUp end={98} suffix="%" />
              </div>
              <div className="text-[12px] font-semibold mt-1">
                უმაღლესში ჩარიცხვა
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Marquee Ticker ── */}
      <MarqueeTicker />

      {/* ── 3. Stats Grid Section ── */}
      <section className="px-5 sm:px-8 md:px-12 py-14 sm:py-18 grid grid-cols-2 md:grid-cols-4 gap-4.5 max-w-[1440px] mx-auto">
        <div className="bg-[#ebddc5] rounded-[28px] p-7 sm:p-7.5 shadow-xs">
          <div className="text-[42px] sm:text-[56px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">
            <CountUp end={site.stats.students} />
          </div>
          <div className="mt-2 text-[14px] font-semibold text-[#645c50]"> მოსწავლე</div>
        </div>

        <div className="bg-[#ebddc5] rounded-[28px] p-7 sm:p-7.5 shadow-xs">
          <div className="text-[42px] sm:text-[56px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">
            <CountUp end={site.stats.teachers} />
          </div>
          <div className="mt-2 text-[14px] font-semibold text-[#645c50]">პედაგოგი</div>
        </div>

        <div className="bg-[#ebddc5] rounded-[28px] p-7 sm:p-7.5 shadow-xs">
          <div className="text-[42px] sm:text-[56px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">
            <CountUp end={site.stats.years} />
          </div>
          <div className="mt-2 text-[14px] font-semibold text-[#645c50]">წლიანი ისტორია</div>
        </div>

        <div className="bg-[#c67139] text-[#fff2eb] rounded-[28px] p-7 sm:p-7.5 shadow-xs">
          <div className="text-[42px] sm:text-[56px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">
            <CountUp end={24} />
          </div>
          <div className="mt-2 text-[14px] font-semibold">საკლასო ოთახი</div>
        </div>
      </section>

      {/* ── 4. About Section ("ჩვენს შესახებ") ── */}
      <section id="about" className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 pb-18 sm:pb-22 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 lg:gap-[62px] items-center">
        <div>
          <span className="inline-block text-[12px] font-extrabold tracking-wider text-[#8c491a] bg-[#ffe1d0] rounded-full px-4 py-1.5 uppercase">
            ჩვენს შესახებ
          </span>
          <h2 className="mt-5.5 mb-0 text-[36px] sm:text-[48px] md:text-[52px] font-extrabold leading-[1.06] tracking-[-0.03em] max-w-[620px]">
            სკოლა ბათუმის ისტორიაში
          </h2>
          <p className="mt-5.5 margin-0 max-w-[620px] text-[16px] font-medium leading-[1.7] text-[#201e1d] pretty">
            1952 წელს გახსნილი №14 სკოლა შვიდ ათწლეულზე მეტია ბათუმის საგანმანათლებლო ცხოვრების ნაწილია. ჭავჭავაძის ქუჩაზე მდებარე კორპუსი დღემდე ინარჩუნებს პირვანდელ არქიტექტურას, სასწავლო პროცესი კი თანამედროვე აკადემიურ სტანდარტებს ეყრდნობა.
          </p>
          <p className="mt-3.5 margin-0 max-w-[620px] text-[16px] font-medium leading-[1.7] text-[#645c50] pretty">
            სკოლა მუშაობს ეროვნული სასწავლო გეგმით, თუმცა თითოეულ საფეხურზე ვამატებთ საკუთარ პროგრამებს — კვლევით სემინარებს, ლაბორატორიულ პრაქტიკას და აკადემიური წერის სავალდებულო კურსს.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <span className="text-[13px] font-bold bg-[#e1eecc] text-[#3d472b] rounded-full px-4.5 py-2.5 shadow-xs">
              ავტორიზებული საჯარო სკოლა
            </span>
            <span className="text-[13px] font-bold bg-[#e1eecc] text-[#3d472b] rounded-full px-4.5 py-2.5 shadow-xs">
              2 ლაბორატორია
            </span>
            <span className="text-[13px] font-bold bg-[#e1eecc] text-[#3d472b] rounded-full px-4.5 py-2.5 shadow-xs">
              ბიბლიოთეკა · 12 000 წიგნი
            </span>
          </div>
        </div>

        {/* Reading Room Card */}
        <div className="relative">
          <div className="rounded-[999px] overflow-hidden h-[380px] sm:h-[460px] bg-[repeating-linear-gradient(90deg,#dcd3c4_0_12px,#eee7db_12px_24px)] filter saturate-[.6] contrast-[.9] brightness-[1.06] relative shadow-md">
            <Image
              src="https://edu.aris.ge/news/wp-content/uploads/2019/02/1.jpg"
              alt="ბათუმის №14 საჯარო სკოლის სამკითხველო"
              fill
              className="object-cover opacity-80"
            />
            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] text-[#402310] bg-[#f9f4ed] px-3 py-1.5 rounded-full whitespace-nowrap shadow-xs">
              photo · reading room
            </span>
          </div>
          {/* Floating Orb */}
          <div
            className="absolute -top-4.5 -right-4.5 w-24 h-24 rounded-full bg-[#c67139] animate-[og-float_12s_ease-in-out_infinite] shadow-md"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ── 5. Programs Section ("სამი საფეხური") ── */}
      <section id="programs" className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 pb-18 sm:pb-22">
        <div className="flex items-end justify-between mb-7">
          <div>
            <span className="inline-block text-[12px] font-extrabold tracking-wider text-[#8c491a] bg-[#ffe1d0] rounded-full px-4 py-1.5 uppercase">
              პროგრამები
            </span>
            <h2 className="mt-5.5 mb-0 text-[36px] sm:text-[48px] md:text-[52px] font-extrabold leading-none tracking-[-0.03em]">
              სამი საფეხური
            </h2>
          </div>
          <Link
            href="/admission"
            className="text-[14px] font-bold text-[#8c491a] bg-[#ffe1d0] rounded-full px-5.5 py-3 hover:bg-[#ffc6a5] transition-all"
          >
            სასწავლო გეგმა →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {/* Level 1 */}
          <article className="bg-[#ebddc5] rounded-[28px] p-8 sm:p-[32px_30px_36px] hover:-translate-y-2 hover:bg-[#eee7db] transition-all duration-300 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#c67139] text-[#fff2eb] flex items-center justify-center text-[17px] font-extrabold tabular-nums">
              01
            </div>
            <div className="mt-5 text-[12px] font-extrabold tracking-wider text-[#8c491a] uppercase">
              I — VI კლასი
            </div>
            <h3 className="mt-2.5 mb-0 text-[26px] sm:text-[29px] font-extrabold leading-[1.12] tracking-[-0.02em]">
              დაწყებითი საფეხური
            </h3>
            <p className="mt-3.5 mb-0 text-[15px] font-medium leading-[1.65] text-[#645c50]">
              ბაზისური უნარები — კითხვა, წერა, მათემატიკური აზროვნება და პირველი უცხო ენა. დღის მეორე ნახევარში შემოქმედებითი სახელოსნოები.
            </p>
            <div className="mt-5.5 text-[13px] font-bold text-[#56633f] bg-[#e1eecc] rounded-full px-4 py-2 inline-block">
              6 პარალელი · 22 მოსწავლე
            </div>
          </article>

          {/* Level 2 */}
          <article className="bg-[#ebddc5] rounded-[28px] p-8 sm:p-[32px_30px_36px] hover:-translate-y-2 hover:bg-[#eee7db] transition-all duration-300 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#7a8a5e] text-[#f0fae1] flex items-center justify-center text-[17px] font-extrabold tabular-nums">
              02
            </div>
            <div className="mt-5 text-[12px] font-extrabold tracking-wider text-[#56633f] uppercase">
              VII — IX კლასი
            </div>
            <h3 className="mt-2.5 mb-0 text-[26px] sm:text-[29px] font-extrabold leading-[1.12] tracking-[-0.02em]">
              საბაზო საფეხური
            </h3>
            <p className="mt-3.5 mb-0 text-[15px] font-medium leading-[1.65] text-[#645c50]">
              საგნობრივი გაღრმავება, ლაბორატორიული სამუშაოები და პირველი კვლევითი პროექტი მასწავლებლის ხელმძღვანელობით.
            </p>
            <div className="mt-5.5 text-[13px] font-bold text-[#56633f] bg-[#e1eecc] rounded-full px-4 py-2 inline-block">
              3 პარალელი · 4 არჩევითი
            </div>
          </article>

          {/* Level 3 */}
          <article className="bg-[#ebddc5] rounded-[28px] p-8 sm:p-[32px_30px_36px] hover:-translate-y-2 hover:bg-[#eee7db] transition-all duration-300 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#c67139] text-[#fff2eb] flex items-center justify-center text-[17px] font-extrabold tabular-nums">
              03
            </div>
            <div className="mt-5 text-[12px] font-extrabold tracking-wider text-[#8c491a] uppercase">
              X — XII კლასი
            </div>
            <h3 className="mt-2.5 mb-0 text-[26px] sm:text-[29px] font-extrabold leading-[1.12] tracking-[-0.02em]">
              საშუალო საფეხური
            </h3>
            <p className="mt-3.5 mb-0 text-[15px] font-medium leading-[1.65] text-[#645c50]">
              აკადემიური მიმართულების არჩევა, ეროვნული გამოცდებისთვის სისტემური მზადება და აკადემიური წერის სავალდებულო კურსი.
            </p>
            <div className="mt-5.5 text-[13px] font-bold text-[#56633f] bg-[#e1eecc] rounded-full px-4 py-2 inline-block">
              3 მიმართულება · 98%
            </div>
          </article>
        </div>
      </section>

      {/* ── 6. Admission Steps ("ოთხი ნაბიჯი") ── */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 pb-18 sm:pb-22">
        <div className="bg-[#ebddc5] rounded-[28px] p-8 sm:p-12 md:p-14 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 relative overflow-hidden shadow-xs">
          <div
            className="absolute -bottom-[140px] -right-[60px] w-[340px] h-[340px] rounded-full bg-[#e1eecc] animate-[og-float_15s_ease-in-out_infinite] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative">
            <span className="inline-block text-[12px] font-extrabold tracking-wider text-[#8c491a] bg-[#ffe1d0] rounded-full px-4 py-1.5 uppercase">
              მიღება
            </span>
            <h2 className="mt-5.5 mb-0 text-[36px] sm:text-[44px] font-extrabold leading-[1.04] tracking-[-0.03em]">
              ოთხი ნაბიჯი
            </h2>
            <p className="mt-4 mb-0 text-[15px] font-medium leading-[1.65] text-[#645c50]">
              განაცხადების მიღება მიმდინარეობს 1 თებერვლიდან 30 ივნისამდე.
            </p>
            <Link
              href="/admission"
              className="inline-block mt-6 rounded-full bg-[#c67139] text-[#fff2eb] font-sans text-[15px] font-bold px-7.5 py-4 hover:bg-[#b2622d] hover:-translate-y-1 transition-all shadow-sm"
            >
              ფორმის შევსება
            </Link>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="bg-[#f5ead8] rounded-[28px] p-[24px_26px] flex gap-4 items-start shadow-xs">
              <span className="flex-none w-9 h-9 rounded-full bg-[#ffe1d0] text-[#8c491a] flex items-center justify-center text-[14px] font-extrabold">
                01
              </span>
              <div>
                <h4 className="margin-0 text-[19px] font-extrabold">განაცხადი</h4>
                <p className="mt-1.5 mb-0 text-[14px] font-medium leading-[1.6] text-[#645c50]">
                  ონლაინ ფორმის შევსება სკოლის საიტზე.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f5ead8] rounded-[28px] p-[24px_26px] flex gap-4 items-start shadow-xs">
              <span className="flex-none w-9 h-9 rounded-full bg-[#ffe1d0] text-[#8c491a] flex items-center justify-center text-[14px] font-extrabold">
                02
              </span>
              <div>
                <h4 className="margin-0 text-[19px] font-extrabold">დოკუმენტაცია</h4>
                <p className="mt-1.5 mb-0 text-[14px] font-medium leading-[1.6] text-[#645c50]">
                  დაბადების მოწმობა, ცნობა, ფოტოსურათი.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f5ead8] rounded-[28px] p-[24px_26px] flex gap-4 items-start shadow-xs">
              <span className="flex-none w-9 h-9 rounded-full bg-[#ffe1d0] text-[#8c491a] flex items-center justify-center text-[14px] font-extrabold">
                03
              </span>
              <div>
                <h4 className="margin-0 text-[19px] font-extrabold">გასაუბრება</h4>
                <p className="mt-1.5 mb-0 text-[14px] font-medium leading-[1.6] text-[#645c50]">
                  შეხვედრა მშობელთან და მოსწავლესთან.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#7a8a5e] text-[#f0fae1] rounded-[28px] p-[24px_26px] flex gap-4 items-start shadow-xs">
              <span className="flex-none w-9 h-9 rounded-full bg-[#f0fae1] text-[#3d472b] flex items-center justify-center text-[14px] font-extrabold">
                04
              </span>
              <div>
                <h4 className="margin-0 text-[19px] font-extrabold">ჩარიცხვა</h4>
                <p className="mt-1.5 mb-0 text-[14px] font-medium leading-[1.6] text-[#e1eecc]">
                  ხელშეკრულება და კლასის განაწილება.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Latest News ("სიახლეები") ── */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 pb-18 sm:pb-22">
        <div className="flex items-end justify-between mb-7">
          <h2 className="margin-0 text-[36px] sm:text-[48px] md:text-[52px] font-extrabold leading-none tracking-[-0.03em]">
            სიახლეები
          </h2>
          <Link
            href="/news"
            className="text-[14px] font-bold text-[#8c491a] bg-[#ffe1d0] rounded-full px-5.5 py-3 hover:bg-[#ffc6a5] transition-all"
          >
            ყველა სიახლე →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {/* News 1 */}
          <Link
            href="/news"
            className="group bg-[#ebddc5] rounded-[28px] overflow-hidden hover:-translate-y-2 transition-all duration-300 block shadow-xs"
          >
            <div className="h-[200px] m-3.5 rounded-[20px] bg-[repeating-linear-gradient(45deg,#dcd3c4_0_12px,#eee7db_12px_24px)] filter saturate-[.6] contrast-[.9] brightness-[1.06] relative overflow-hidden">
              <Image
                src="https://edu.aris.ge/news/wp-content/uploads/2019/02/1.jpg"
                alt="მათემატიკის ეროვნული ოლიმპიადა"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 font-mono text-[11px] bg-[#f9f4ed] px-2.5 py-1.5 rounded-full text-[#402310] shadow-xs">
                photo · olympiad
              </span>
            </div>
            <div className="p-1.5 sm:p-[6px_30px_32px] px-6 pb-7">
              <div className="text-[12px] font-bold text-[#8c491a] tabular-nums">
                14 ივლისი 2026
              </div>
              <h3 className="mt-2.5 mb-0 text-[20px] sm:text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#201e1d]">
                მათემატიკის ეროვნულ ოლიმპიადაზე — მეორე ადგილი
              </h3>
              <p className="mt-2.5 mb-0 text-[14px] font-medium leading-[1.6] text-[#645c50]">
                XI კლასის მოსწავლემ ქვეყნის მასშტაბით მეორე შედეგი დააფიქსირა.
              </p>
            </div>
          </Link>

          {/* News 2 */}
          <Link
            href="/news"
            className="group bg-[#ebddc5] rounded-[28px] overflow-hidden hover:-translate-y-2 transition-all duration-300 block shadow-xs"
          >
            <div className="h-[200px] m-3.5 rounded-[20px] bg-[repeating-linear-gradient(45deg,#dcd3c4_0_12px,#eee7db_12px_24px)] filter saturate-[.6] contrast-[.9] brightness-[1.06] relative overflow-hidden">
              <Image
                src="https://edu.aris.ge/news/wp-content/uploads/2019/02/1.jpg"
                alt="ახალი ლაბორატორია"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 font-mono text-[11px] bg-[#f9f4ed] px-2.5 py-1.5 rounded-full text-[#402310] shadow-xs">
                photo · laboratory
              </span>
            </div>
            <div className="p-1.5 sm:p-[6px_30px_32px] px-6 pb-7">
              <div className="text-[12px] font-bold text-[#8c491a] tabular-nums">
                02 ივლისი 2026
              </div>
              <h3 className="mt-2.5 mb-0 text-[20px] sm:text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#201e1d]">
                გაიხსნა ბუნებისმეტყველების ახალი ლაბორატორია
              </h3>
              <p className="mt-2.5 mb-0 text-[14px] font-medium leading-[1.6] text-[#645c50]">
                ფიზიკის, ქიმიისა და ბიოლოგიის პრაქტიკული სამუშაოები ერთ სივრცეში.
              </p>
            </div>
          </Link>

          {/* News 3 */}
          <Link
            href="/news"
            className="group bg-[#ebddc5] rounded-[28px] overflow-hidden hover:-translate-y-2 transition-all duration-300 block shadow-xs"
          >
            <div className="h-[200px] m-3.5 rounded-[20px] bg-[repeating-linear-gradient(45deg,#dcd3c4_0_12px,#eee7db_12px_24px)] filter saturate-[.6] contrast-[.9] brightness-[1.06] relative overflow-hidden">
              <Image
                src="https://edu.aris.ge/news/wp-content/uploads/2019/02/1.jpg"
                alt="გამოსაშვები ცერემონია"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 font-mono text-[11px] bg-[#f9f4ed] px-2.5 py-1.5 rounded-full text-[#402310] shadow-xs">
                photo · graduation
              </span>
            </div>
            <div className="p-1.5 sm:p-[6px_30px_32px] px-6 pb-7">
              <div className="text-[12px] font-bold text-[#8c491a] tabular-nums">
                20 ივნისი 2026
              </div>
              <h3 className="mt-2.5 mb-0 text-[20px] sm:text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#201e1d]">
                XII კლასის გამოსაშვები ცერემონია
              </h3>
              <p className="mt-2.5 mb-0 text-[14px] font-medium leading-[1.6] text-[#645c50]">
                87 აბიტურიენტმა ატესტატი მიიღო; 85 უმაღლესში ჩაირიცხა.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── 8. Call to Action Banner ── */}
      <section className="mx-5 sm:mx-8 md:mx-12 mb-16 sm:mb-18 rounded-[28px] bg-[#c67139] text-[#fff2eb] p-10 sm:p-14 md:p-[64px_48px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden shadow-sm max-w-[1344px] mx-auto">
        <div
          className="absolute -top-[90px] right-[180px] w-[280px] h-[280px] rounded-full bg-white/14 animate-[og-float_14s_ease-in-out_infinite] pointer-events-none"
          aria-hidden="true"
        />
        <h2 className="margin-0 relative text-[36px] sm:text-[48px] md:text-[56px] font-extrabold leading-[1.04] tracking-[-0.03em] max-w-[760px]">
          მიღება 2026–2027 გახსნილია
        </h2>
        <Link
          href="/admission"
          className="relative flex-none rounded-full bg-[#fff2eb] text-[#8c491a] font-sans text-[16px] font-extrabold px-9 py-4.5 hover:-translate-y-1 transition-all shadow-sm"
        >
          განაცხადის შევსება
        </Link>
      </section>
    </div>
  );
}
