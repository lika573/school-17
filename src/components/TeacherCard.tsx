import Image from "next/image";
import type { Teacher } from "@/types";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <article className="glass-card group overflow-hidden p-4">
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl">
        <Image
          src={teacher.image}
          alt={teacher.imageAlt}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          unoptimized={teacher.image.startsWith("/uploads/")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <h3 className="text-[15px] font-bold text-white">{teacher.name}</h3>
      <p className="gradient-text text-[13px] font-semibold">{teacher.subject}</p>
      {teacher.role && (
        <p className="text-[13px] text-white/40">{teacher.role}</p>
      )}
    </article>
  );
}
