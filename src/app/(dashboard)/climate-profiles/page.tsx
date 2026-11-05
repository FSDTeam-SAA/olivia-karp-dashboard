import React from "react";
import ClimateProfilesManagement from "@/features/climate-profiles/component/ClimateProfilesManagement";

export const metadata = {
  title: "Meet Climate People Profiles | Act on Climate Admin Dashboard",
  description:
    "Manage member climate profiles, toggle directory visibility, trigger Mighty Networks sync, and review member details.",
};

export default function ClimateProfilesPage() {
  return <ClimateProfilesManagement />;
}
