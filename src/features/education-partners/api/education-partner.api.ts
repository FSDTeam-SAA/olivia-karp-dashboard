import axiosInstance from "@/lib/instance/axios-instance";
import type {
  GetPartnersQueryParams,
  GetPartnersResponse,
} from "../types/education-partner.types";

export const getAllEducationPartners = async (
  params?: GetPartnersQueryParams,
): Promise<GetPartnersResponse> => {
  const cleanParams: Record<string, string | number | boolean> = {};
  if (params?.page) cleanParams.page = params.page;
  if (params?.limit) cleanParams.limit = params.limit;
  if (params?.search && params.search.trim())
    cleanParams.search = params.search.trim();
  if (params?.membershipStatus && params.membershipStatus !== "all") {
    cleanParams.membershipStatus = params.membershipStatus;
  }
  if (
    params?.isVerified !== undefined &&
    params.isVerified !== "all" &&
    params.isVerified !== ""
  ) {
    cleanParams.isVerified = params.isVerified;
  }

  const response = await axiosInstance.get(
    "/education-partner/admin/partners",
    {
      params: cleanParams,
    },
  );
  return response.data;
};

export const updatePartnerStatus = async ({
  id,
  membershipStatus,
  isVerifiedPartner,
}: {
  id: string;
  membershipStatus?: string;
  isVerifiedPartner?: boolean;
}) => {
  const payload: Record<string, string | boolean> = {};
  if (membershipStatus !== undefined)
    payload.membershipStatus = membershipStatus;
  if (isVerifiedPartner !== undefined)
    payload.isVerifiedPartner = isVerifiedPartner;

  const response = await axiosInstance.put(
    `/education-partner/admin/partners/${id}/status`,
    payload,
  );
  return response.data;
};

export const activatePartnerMembership = async (id: string) => {
  const response = await axiosInstance.put(
    `/education-partner/admin/partners/${id}/activate`,
  );
  return response.data;
};
