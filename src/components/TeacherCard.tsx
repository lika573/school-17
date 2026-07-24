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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <h3 className="text-[13px] font-bold text-white sm:text-[15px]">
        {teacher.name}
      </h3>
      <p className="gradient-text text-[11px] font-semibold sm:text-[13px]">
        {teacher.subject}
      </p>
      {teacher.role && (
        <p className="text-[11px] text-white/40 sm:text-[13px]">
          {teacher.role}
        </p>
      )}
    </article>
  );
}
