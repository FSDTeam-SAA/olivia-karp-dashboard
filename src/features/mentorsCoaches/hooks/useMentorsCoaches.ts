// src/features/mentorsCoaches/hooks/useMentorsCoaches.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllMentorsAndCoaches,
  approveMentorCoach,
  toggleMentorEmailVisibility,
  joinMentorCoach,
  bulkUploadMentorsCoaches,
  deleteMentorCoach,
} from "../api/mentorsCoaches.api";

export const useMentorsCoaches = (params?: {
  page?: number;
  limit?: number;
  type?: string;
  isApproved?: boolean;
}) => {
  return useQuery({
    queryKey: ["mentors-coaches", params],
    queryFn: () => getAllMentorsAndCoaches(params),
  });
};

export const useApproveMentorCoach = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveMentorCoach,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentors-coaches"] });
    },
  });
};

export const useToggleMentorEmailVisibility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleMentorEmailVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentors-coaches"] });
    },
  });
};

export const useJoinMentorCoach = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinMentorCoach,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentors-coaches"] });
    },
  });
};

export const useBulkUploadMentorsCoaches = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkUploadMentorsCoaches,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentors-coaches"] });
    },
  });
};

export const useDeleteMentorCoach = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMentorCoach,
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Mentor/Coach deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["mentors-coaches"] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to delete mentor/coach";
      toast.error(message);
    },
  });
};
