"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { GalleryItem } from "@/types";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const item = currentIndex !== null ? items[currentIndex] : null;
  const total = items.length;

  const goPrev = useCallback(() => {
    if (currentIndex !== null && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex !== null && currentIndex < total - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, total, onNavigate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [onClose, goPrev, goNext],
  );

  useEffect(() => {
    if (!item) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, handleKeyDown]);

  if (!item || currentIndex === null) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: "rgba(6, 9, 17, 0.9)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        animation: "fadeIn 0.3s ease-out",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/70 transition-all hover:bg-white/10 hover:text-white"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onClick={onClose}
        aria-label="დახურვა"
      >
        ×
      </button>

      {/* Counter */}
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white/70 backdrop-blur-md">
        {currentIndex + 1} / {total}
      </div>

      {/* Previous button */}
      {currentIndex > 0 && (
        <button
          type="button"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-[20px] text-white/70 transition-all hover:bg-white/10 hover:text-white sm:left-6 sm:h-12 sm:w-12"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="წინა ფოტო"
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {currentIndex < total - 1 && (
        <button
          type="button"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-[20px] text-white/70 transition-all hover:bg-white/10 hover:text-white sm:right-6 sm:h-12 sm:w-12"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="შემდეგი ფოტო"
        >
          ›
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-h-[85vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-[85vw] max-w-5xl overflow-hidden rounded-2xl">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-contain"
            sizes="85vw"
            priority
          />
        </div>
        <p className="mt-4 text-center text-[15px] font-semibold text-white">
          {item.title}
        </p>
        <p className="mt-1 text-center text-[13px] text-white/40">
          {item.category}
        </p>
      </div>
    </div>
  );
}
