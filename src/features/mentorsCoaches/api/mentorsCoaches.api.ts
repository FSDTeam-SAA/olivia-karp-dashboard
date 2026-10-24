// src/features/mentorsCoaches/api/mentorsCoaches.api.ts

import axiosInstance from "@/lib/instance/axios-instance";

// get all mentors and coaches

export const getAllMentorsAndCoaches = async (params?: {
  page?: number;
  limit?: number;
  type?: string;
  isApproved?: boolean;
}) => {
  const response = await axiosInstance.get("/mentors-coaches/all", { params });
  return response.data;
};

// approve mentor or coach with email visibility control
export const approveMentorCoach = async (
  payload: string | { id: string; isEmailPublic?: boolean },
) => {
  const id = typeof payload === "string" ? payload : payload.id;
  const isEmailPublic =
    typeof payload === "object" ? payload.isEmailPublic : undefined;
  const response = await axiosInstance.put(`/mentors-coaches/approved/${id}`, {
    isEmailPublic,
  });
  return response.data;
};

// toggle public email visibility
export const toggleMentorEmailVisibility = async ({
  id,
  isEmailPublic,
}: {
  id: string;
  isEmailPublic: boolean;
}) => {
  const response = await axiosInstance.patch(
    `/mentors-coaches/email-visibility/${id}`,
    { isEmailPublic },
  );
  return response.data;
};

// join as a mentor or coach
export const joinMentorCoach = async (data: FormData) => {
  const response = await axiosInstance.post(`/mentors-coaches/join`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// bulk upload mentors or coaches
export const bulkUploadMentorsCoaches = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosInstance.post(
    "/mentors-coaches/bulk-upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
