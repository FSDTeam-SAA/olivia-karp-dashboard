// src/features/dashboard-overview/api/dashboardOverviewapi.ts

import axiosInstance from "@/lib/instance/axios-instance";

export const getDashboardOverview = async () => {
  const response = await axiosInstance.get("/analytics/dashboard");
  return response.data;
};

export const getDashbaordChartOverview = async (
  filter: string = "monthly",
  year: string = "2026",
) => {
  const response = await axiosInstance.get(
    `/analytics/chart?filter=${filter}&year=${year}`,
  );
  return response.data;
};
