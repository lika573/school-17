import Image from "next/image";
import type { Teacher } from "@/types";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <article className="glass-card group overflow-hidden p-3 sm:p-4">
      <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-xl sm:mb-4">
        <Image
          src={teacher.image}
          alt={teacher.imageAlt}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          unoptimized={teacher.image.startsWith("/uploads/")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Subject overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-500 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md sm:text-[12px]">
            {teacher.subject}
          </span>
        </div>
      </div>
      <h3 className="text-[13px] font-bold text-foreground sm:text-[15px]">
        {teacher.name}
      </h3>
      <p className="gradient-text text-[11px] font-semibold sm:text-[13px]">
        {teacher.subject}
      </p>
      {teacher.role && (
        <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-secondary sm:text-[12px]">
          <span className="inline-block h-1 w-1 rounded-full bg-foreground/30" />
          {teacher.role}
        </p>
      )}
    </article>
  );
}
