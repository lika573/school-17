import type { Metadata } from "next";
import { getTeachers, getUniqueSubjects } from "@/lib/server-data";
import { createMetadata } from "@/lib/metadata";
import TeachersPageClient from "./TeachersPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "მასწავლებელი",
  description:
    "ბათუმის N17 საჯარო სკოლის მასწავლებელთა გუნდი — გამოცდილი პედაგოგები ყველა საგანში.",
  path: "/teachers",
});

export default async function TeachersPage() {
  const teachers = await getTeachers();
  const subjects = await getUniqueSubjects();
  return <TeachersPageClient teachers={teachers} subjects={subjects} />;
}
