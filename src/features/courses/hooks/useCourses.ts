// src/features/courses/hooks/useCourses.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  toggleCourse,
  updateCourse,
} from "../api/courses.api";

export const useCourses = (params?: {
  page?: number;
  limit?: number;
  type?: string;
  isApproved?: boolean;
}) => {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => getAllCourses(params),
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Course created successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        (err as Error)?.message ||
        "Failed to create course";
      toast.error(message);
    },
  });
};

export const useToggleCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleCourse,
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Course availability updated");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        (err as Error)?.message ||
        "Failed to update availability";
      toast.error(message);
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; data: FormData }) =>
      updateCourse(data.id, data.data),
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Course updated successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        (err as Error)?.message ||
        "Failed to update course";
      toast.error(message);
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Course deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        (err as Error)?.message ||
        "Failed to delete course";
      toast.error(message);
    },
  });
};
