// src/features/courses/hooks/useCourses.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCourses, createCourse } from "../api/courses.api";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
