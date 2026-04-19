import type { Metadata } from "next";
import { StudentPathIndexBody } from "@/components/student/student-path-index-body";
import { buildStudentIndexFraming } from "@/lib/curriculum/load-student-framing";
import { listStudentLessonsOrdered } from "@/lib/student/student-registry-helpers";

export const metadata: Metadata = {
  title: "Student — Stage 2",
  robots: { index: false, follow: false }
};

export default function StudentPathIndexPage() {
  const framing = buildStudentIndexFraming();
  const lessons = listStudentLessonsOrdered();
  return <StudentPathIndexBody lessons={lessons} framing={framing} />;
}
