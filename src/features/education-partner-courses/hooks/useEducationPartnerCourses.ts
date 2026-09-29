import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminCoursesReviewQueue,
  reviewPartnerCourse,
  getPartnerCourseById,
} from "../api/education-partner-course.api";
import type {
  GetAdminCoursesParams,
  AdminReviewPayload,
} from "../types/education-partner-course.types";

export const useAdminCourseReviewQueue = (params?: GetAdminCoursesParams) => {
  return useQuery({
    queryKey: ["admin-course-review-queue", params],
    queryFn: () => getAdminCoursesReviewQueue(params),
  });
};

export const useReviewPartnerCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      payload,
    }: {
      courseId: string;
      payload: AdminReviewPayload;
    }) => reviewPartnerCourse({ courseId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-course-review-queue"],
      });
    },
  });
};

export const useSinglePartnerCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["partner-course-detail", courseId],
    queryFn: () => getPartnerCourseById(courseId),
    enabled: Boolean(courseId),
  });
};
