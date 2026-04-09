import axiosInstance from "@/lib/instance/axios-instance";
import type { ChangePasswordPayload } from "../types/settings.types";

export const getMyProfile = async () => {
  const response = await axiosInstance.get("/user/my-profile");
  return response.data;
};

export const updateProfile = async (data: FormData) => {
  const response = await axiosInstance.put("/user/update-profile", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const changePassword = async (data: ChangePasswordPayload) => {
  const response = await axiosInstance.post("/auth/change-password", data);
  return response.data;
};
