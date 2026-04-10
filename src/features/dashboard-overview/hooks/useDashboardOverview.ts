import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "../api/dashboardOverviewapi";

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: getDashboardOverview,
  });
};
