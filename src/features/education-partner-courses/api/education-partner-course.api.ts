import axiosInstance from "@/lib/instance/axios-instance";
import type {
  GetAdminCoursesParams,
  GetAdminCoursesResponse,
  AdminReviewPayload,
} from "../types/education-partner-course.types";

export const getAdminCoursesReviewQueue = async (
  params?: GetAdminCoursesParams,
): Promise<GetAdminCoursesResponse> => {
  const cleanParams: Record<string, string | number> = {};
  if (params?.page) cleanParams.page = params.page;
  if (params?.limit) cleanParams.limit = params.limit;
  if (params?.search && params.search.trim()) {
    cleanParams.search = params.search.trim();
  }
  if (params?.status && params.status !== "pending_queue") {
    cleanParams.status = params.status;
  }

  const response = await axiosInstance.get(
    "/education-partner/admin/courses/review-queue",
    {
      params: cleanParams,
    },
  );
  return response.data;
};

export const reviewPartnerCourse = async ({
  courseId,
  payload,
}: {
  courseId: string;
  payload: AdminReviewPayload;
}) => {
  const response = await axiosInstance.patch(
    `/education-partner/admin/courses/${courseId}/review`,
    payload,
  );
  return response.data;
};

export const getPartnerCourseById = async (courseId: string) => {
  const response = await axiosInstance.get(
    `/education-partner/courses/${courseId}`,
  );
  return response.data;
};
