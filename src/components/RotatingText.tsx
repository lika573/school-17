"use client";

const words = ["აზროვნებას", "პასუხისმგებლობას", "შემოქმედებას"];

export default function RotatingText() {
  return (
    <span className="relative block h-[58px] sm:h-[76px] md:h-[86px] overflow-hidden text-[#c67139]">
      {words.map((word, idx) => (
        <span
          key={word}
          className="absolute inset-0 block"
          style={{
            animation: `og-word 10.5s ${idx * 3.5}s infinite`,
            opacity: idx === 0 ? 1 : 0,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
