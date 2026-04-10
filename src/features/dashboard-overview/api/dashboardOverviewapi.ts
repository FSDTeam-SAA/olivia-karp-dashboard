// src/features/dashboard-overview/api/dashboardOverviewapi.ts

import axiosInstance from "@/lib/instance/axios-instance";

export const getDashboardOverview = async () => {
  const response = await axiosInstance.get("/analytics/dashboard");
  return response.data;
};
