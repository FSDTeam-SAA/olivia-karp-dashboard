import React from "react";
import EducationPartnersManagement from "@/features/education-partners/component/EducationPartnersManagement";

export const metadata = {
  title: "Education Partners | Olivia Karp Admin Dashboard",
  description:
    "Manage education partners, review applications, and toggle approval status.",
};

export default function EducationPartnersPage() {
  return <EducationPartnersManagement />;
}
