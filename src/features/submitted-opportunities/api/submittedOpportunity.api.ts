import axiosInstance from "@/lib/instance/axios-instance";

export type SubmittedOpportunityStatus = "pending" | "reviewed" | "rejected";

export interface SubmittedOpportunity {
  _id: string;
  title: string;
  organizationName: string;
  opportunityType: string;
  location: string;
  officialLink: string;
  shortDescription: string;
  status: SubmittedOpportunityStatus;
  submittedBy?: {
    name?: string;
    email?: string;
  } | null;
  partnerId?: {
    organizationName?: string;
    membershipStatus?: string;
    isVerifiedPartner?: boolean;
  } | null;
  isPartnerOpportunity?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubmittedOpportunitiesResponse {
  data: SubmittedOpportunity[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const getSubmittedOpportunities = async (params?: {
  page?: number;
  limit?: number;
  status?: SubmittedOpportunityStatus;
}) => {
  const response = await axiosInstance.get("/opportunity/all", { params });
  return response.data as SubmittedOpportunitiesResponse;
};

export const updateSubmittedOpportunityStatus = async ({
  id,
  status,
}: {
  id: string;
  status: SubmittedOpportunityStatus;
}) => {
  const response = await axiosInstance.patch(`/opportunity/review/${id}`, {
    status,
  });
  return response.data;
};
