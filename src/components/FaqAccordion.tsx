"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "open" : ""}`}
        >
          <button
            type="button"
            className="faq-trigger"
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <span className="faq-icon">+</span>
          </button>
          <div className="faq-content">
            <p className="text-[14px] leading-relaxed text-white/50">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
