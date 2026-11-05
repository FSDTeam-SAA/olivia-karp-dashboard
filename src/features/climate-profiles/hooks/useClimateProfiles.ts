import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllClimateProfiles,
  getClimateProfileById,
  createClimateProfile,
  updateClimateProfile,
  toggleProfileVisibility,
  deleteClimateProfile,
  triggerMightySync,
  getSyncStatus,
} from "../api/climateProfiles.api";
import type { ClimateProfileQueryParams } from "../types/climateProfiles.types";

export const CLIMATE_PROFILES_KEY = "climate-profiles";
export const CLIMATE_PROFILE_DETAIL_KEY = "climate-profile-detail";
export const SYNC_STATUS_KEY = "climate-profiles-sync-status";

export const useClimateProfiles = (params?: ClimateProfileQueryParams) => {
  return useQuery({
    queryKey: [CLIMATE_PROFILES_KEY, params],
    queryFn: () => getAllClimateProfiles(params),
  });
};

export const useClimateProfile = (id?: string) => {
  return useQuery({
    queryKey: [CLIMATE_PROFILE_DETAIL_KEY, id],
    queryFn: () => getClimateProfileById(id as string),
    enabled: !!id,
  });
};

export const useSyncStatus = () => {
  return useQuery({
    queryKey: [SYNC_STATUS_KEY],
    queryFn: () => getSyncStatus(),
    refetchInterval: 60000, // auto-refresh every minute
  });
};

export const useCreateClimateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClimateProfile,
    onSuccess: (res) => {
      toast.success(res?.message || "Profile created successfully");
      queryClient.invalidateQueries({ queryKey: [CLIMATE_PROFILES_KEY] });
      queryClient.invalidateQueries({ queryKey: [SYNC_STATUS_KEY] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to create profile";
      toast.error(message);
    },
  });
};

export const useUpdateClimateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClimateProfile,
    onSuccess: (res) => {
      toast.success(res?.message || "Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: [CLIMATE_PROFILES_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLIMATE_PROFILE_DETAIL_KEY] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update profile";
      toast.error(message);
    },
  });
};

export const useToggleClimateProfileVisibility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleProfileVisibility,
    onSuccess: (res) => {
      const isVisible = res?.data?.isVisible;
      toast.success(
        isVisible
          ? "Profile is now visible in the public directory"
          : "Profile hidden from the public directory",
      );
      queryClient.invalidateQueries({ queryKey: [CLIMATE_PROFILES_KEY] });
      queryClient.invalidateQueries({ queryKey: [SYNC_STATUS_KEY] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to change visibility";
      toast.error(message);
    },
  });
};

export const useDeleteClimateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClimateProfile,
    onSuccess: (res) => {
      toast.success(res?.message || "Profile deleted successfully");
      queryClient.invalidateQueries({ queryKey: [CLIMATE_PROFILES_KEY] });
      queryClient.invalidateQueries({ queryKey: [SYNC_STATUS_KEY] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to delete profile";
      toast.error(message);
    },
  });
};

export const useTriggerMightySync = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: triggerMightySync,
    onSuccess: (res) => {
      toast.success(res?.message || "Mighty Networks synchronization complete");
      queryClient.invalidateQueries({ queryKey: [CLIMATE_PROFILES_KEY] });
      queryClient.invalidateQueries({ queryKey: [SYNC_STATUS_KEY] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to sync Mighty Networks";
      toast.error(message);
    },
  });
};
