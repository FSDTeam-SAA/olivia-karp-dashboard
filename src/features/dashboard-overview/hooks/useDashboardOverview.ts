import { useQuery } from "@tanstack/react-query";
import {
  getDashbaordChartOverview,
  getDashboardOverview,
} from "../api/dashboardOverviewapi";

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: getDashboardOverview,
  });
};

export const useDashboardChartOverview = (filter: string, year: string) => {
  return useQuery({
    queryKey: ["dashboard-chart-overview", filter, year],
    queryFn: () => getDashbaordChartOverview(filter, year),
  });
};
