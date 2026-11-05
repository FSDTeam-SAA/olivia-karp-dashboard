import axiosInstance from "@/lib/instance/axios-instance";
import type {
  ClimateProfileQueryParams,
  ClimateProfilesResponse,
  SingleClimateProfileResponse,
  SyncStatusResponse,
} from "../types/climateProfiles.types";

export const getAllClimateProfiles = async (
  params?: ClimateProfileQueryParams,
): Promise<ClimateProfilesResponse> => {
  const cleanParams: Record<string, string | number | boolean> = {
    all: "true",
  };

  if (params?.page) cleanParams.page = params.page;
  if (params?.limit) cleanParams.limit = params.limit;
  if (params?.search && params.search.trim()) {
    cleanParams.search = params.search.trim();
  }
  if (params?.climateInterest && params.climateInterest !== "all") {
    cleanParams.climateInterest = params.climateInterest;
  }
  if (params?.professionalArea && params.professionalArea !== "all") {
    cleanParams.professionalArea = params.professionalArea;
  }
  if (params?.lookingFor && params.lookingFor !== "all") {
    cleanParams.lookingFor = params.lookingFor;
  }
  if (
    params?.isVisible !== undefined &&
    params.isVisible !== "all" &&
    params.isVisible !== ""
  ) {
    cleanParams.isVisible = params.isVisible;
  }
  if (params?.sortBy) cleanParams.sortBy = params.sortBy;
  if (params?.sortOrder) cleanParams.sortOrder = params.sortOrder;

  const response = await axiosInstance.get("/meet-climate-people", {
    params: cleanParams,
  });
  return response.data;
};

export const getClimateProfileById = async (
  id: string,
): Promise<SingleClimateProfileResponse> => {
  const response = await axiosInstance.get(`/meet-climate-people/${id}`);
  return response.data;
};

export const createClimateProfile = async (
  data: FormData | Record<string, unknown>,
): Promise<SingleClimateProfileResponse> => {
  const isFormData = data instanceof FormData;
  const response = await axiosInstance.post(
    "/meet-climate-people/admin/create",
    data,
    isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined,
  );
  return response.data;
};

export const updateClimateProfile = async ({
  id,
  data,
}: {
  id: string;
  data: FormData | Record<string, unknown>;
}): Promise<SingleClimateProfileResponse> => {
  const isFormData = data instanceof FormData;
  const response = await axiosInstance.put(
    `/meet-climate-people/admin/${id}`,
    data,
    isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined,
  );
  return response.data;
};

export const toggleProfileVisibility = async ({
  id,
  isVisible,
}: {
  id: string;
  isVisible: boolean;
}): Promise<SingleClimateProfileResponse> => {
  const response = await axiosInstance.patch(
    `/meet-climate-people/${id}/visibility`,
    { isVisible },
  );
  return response.data;
};

export const deleteClimateProfile = async (
  id: string,
): Promise<{ statusCode: number; success: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/meet-climate-people/${id}`);
  return response.data;
};

export const triggerMightySync = async (): Promise<{
  statusCode: number;
  success: boolean;
  message: string;
  data: unknown;
}> => {
  const response = await axiosInstance.post("/meet-climate-people/sync");
  return response.data;
};

export const getSyncStatus = async (): Promise<SyncStatusResponse> => {
  const response = await axiosInstance.get("/meet-climate-people/sync/status");
  return response.data;
};
