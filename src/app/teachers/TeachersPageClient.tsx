"use client";

import { useMemo, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import TeacherCard from "@/components/TeacherCard";
import type { Teacher } from "@/types";

interface Props {
  teachers: Teacher[];
  subjects: string[];
}

export default function TeachersPageClient({ teachers, subjects }: Props) {
  const [activeSubject, setActiveSubject] = useState("ყველა");

  const filtered = useMemo(() => {
    if (activeSubject === "ყველა") return teachers;
    return teachers.filter((t) => t.subject === activeSubject);
  }, [activeSubject, teachers]);

  return (
    <div className="container-padding py-16 md:py-24">
      <ScrollReveal>
        <SectionTitle>მასწავლებელი</SectionTitle>
        <p className="mt-4 max-w-2xl text-[15px] text-white/50">
          N17 სკოლის გამოცდილი და ერთგული მასწავლებელთა გუნდი —{" "}
          {teachers.length} პედაგოგი.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label="საგნის ფილტრი"
        >
          {subjects.map((subject) => (
            <button
              key={subject}
              type="button"
              onClick={() => setActiveSubject(subject)}
              className={`btn-glass ${activeSubject === subject ? "active" : ""}`}
              aria-pressed={activeSubject === subject}
            >
              {subject}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="stagger-children mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((teacher, i) => (
          <ScrollReveal key={teacher.id} delay={i * 60}>
            <TeacherCard teacher={teacher} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
