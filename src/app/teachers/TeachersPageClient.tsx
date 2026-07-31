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

  // Count teachers per subject
  const getSubjectCount = (subject: string) => {
    if (subject === "ყველა") return teachers.length;
    return teachers.filter((t) => t.subject === subject).length;
  };

  return (
    <div className="container-padding py-10 sm:py-16 md:py-24">
      <ScrollReveal>
        <SectionTitle subtitle={`N17 სკოლის გამოცდილი და ერთგული მასწავლებელთა გუნდი — ${teachers.length} პედაგოგი.`}>
          მასწავლებლები
        </SectionTitle>
      </ScrollReveal>

      {/* Horizontally scrollable filter pills on mobile */}
      <ScrollReveal delay={100}>
        <div
          className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:mt-10 sm:overflow-visible sm:px-0"
          role="group"
          aria-label="საგნის ფილტრი"
        >
          <div className="flex gap-2 pb-2 sm:flex-wrap sm:pb-0">
            {subjects.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => setActiveSubject(subject)}
                className={`btn-glass shrink-0 text-[12px] sm:text-[13px] ${activeSubject === subject ? "active" : ""}`}
                aria-pressed={activeSubject === subject}
              >
                {subject}
                <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-medium">
                  {getSubjectCount(subject)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="stagger-children mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((teacher, i) => (
          <ScrollReveal key={teacher.id} delay={i * 60}>
            <TeacherCard teacher={teacher} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
