import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSubmittedOpportunities,
  updateSubmittedOpportunityStatus,
  type SubmittedOpportunityStatus,
} from "../api/submittedOpportunity.api";

export const useSubmittedOpportunities = (params?: {
  page?: number;
  limit?: number;
  status?: SubmittedOpportunityStatus;
}) =>
  useQuery({
    queryKey: ["submitted-opportunities", params],
    queryFn: () => getSubmittedOpportunities(params),
  });

export const useUpdateSubmittedOpportunityStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubmittedOpportunityStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submitted-opportunities"] });
    },
  });
};
