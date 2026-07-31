"use client";

const items = [
  { text: "2026–2027 სასწავლო წლის მიღება გახსნილია", color: "#f9f4ed" },
  { text: "მათემატიკის ეროვნულ ოლიმპიადაზე — მეორე ადგილი", color: "#ccdbb2" },
  { text: "გაიხსნა ბუნებისმეტყველების ახალი ლაბორატორია", color: "#f9f4ed" },
  { text: "მშობელთა კრება — 12 სექტემბერი, 18:00", color: "#ffc6a5" },
];

export default function MarqueeTicker() {
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="mx-5 sm:mx-8 md:mx-12 rounded-full bg-[#201e1d] text-[#f9f4ed] overflow-hidden flex items-stretch shadow-md">
      <div className="flex-none bg-[#c67139] rounded-full px-5 sm:px-6 py-3 text-[12px] font-extrabold tracking-wider text-[#fff2eb] flex items-center z-10">
        სიახლეები
      </div>
      <div className="flex-1 overflow-hidden flex items-center py-3">
        <div className="flex gap-10 sm:gap-14 whitespace-nowrap animate-[og-marquee_34s_linear_infinite] pl-7">
          {marqueeItems.map((item, index) => (
            <span
              key={index}
              className="text-[13px] sm:text-[14px] font-semibold"
              style={{ color: item.color }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
