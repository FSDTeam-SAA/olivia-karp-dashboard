import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllEducationPartners,
  updatePartnerStatus,
  activatePartnerMembership,
} from "../api/education-partner.api";
import type { GetPartnersQueryParams } from "../types/education-partner.types";

export const useEducationPartners = (params?: GetPartnersQueryParams) => {
  return useQuery({
    queryKey: ["education-partners", params],
    queryFn: () => getAllEducationPartners(params),
  });
};

export const useUpdatePartnerStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePartnerStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education-partners"] });
    },
  });
};

export const useActivatePartnerMembership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activatePartnerMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education-partners"] });
    },
  });
};
