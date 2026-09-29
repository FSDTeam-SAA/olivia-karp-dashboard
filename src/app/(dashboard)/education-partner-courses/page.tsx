import React from "react";
import EducationPartnerCoursesManagement from "@/features/education-partner-courses/component/EducationPartnerCoursesManagement";

export const metadata = {
  title: "Education Partner Courses | Olivia Karp Admin Dashboard",
  description:
    "Review, approve, reject, or request revisions for courses submitted by Education Partners.",
};

export default function EducationPartnerCoursesPage() {
  return <EducationPartnerCoursesManagement />;
}
