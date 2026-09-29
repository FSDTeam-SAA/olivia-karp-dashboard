export type CourseFormat =
  | "online_cohort"
  | "online_self_paced"
  | "in_person"
  | "hybrid"
  | "workshop"
  | "short_course"
  | "certificate_program";

export type CourseStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "revision_requested"
  | "approved"
  | "rejected"
  | "archived";

export interface PartnerProvider {
  _id: string;
  organizationName: string;
  slug?: string;
  website?: string;
  contactEmail?: string;
  isVerifiedPartner?: boolean;
  membershipStatus?:
    "active" | "inactive" | "pending" | "cancelled" | "expired";
}

export interface PartnerUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export interface AdminPartnerCourse {
  _id: string;
  title: string;
  slug?: string;
  category?: string;
  categories: string[];
  summary: string;
  description: string;
  learningOutcomes: string[];
  targetAudience: string;
  difficulty?: string;
  durationHours?: number;
  estimatedWeeks?: number;
  courseBoxUrl?: string;
  instructorName?: string;
  instructorBio?: string;
  instructorImage?: {
    url: string;
    public_id: string;
  };
  lessons?: {
    title: string;
    videoUrl: string;
    duration?: string;
    level?: string;
  }[];
  instructorDetails?: string;
  format?: CourseFormat;
  duration?: string;
  isFree: boolean;
  price: number;
  currency: string;
  hasCertificate: boolean;
  certificateDetails?: string;
  prerequisites?: string;
  enrollmentUrl: string;
  image?: {
    url: string;
    public_id: string;
  };
  coverImage?: {
    url: string;
    public_id: string;
  };
  isAvailable?: boolean;
  totalEnrolled?: number;
  source: string;
  status: CourseStatus;
  adminReviewNotes?: string;
  isFeatured?: boolean;
  featuredOrder?: number;
  providerId?: PartnerProvider | null;
  userId?: PartnerUser | null;
  reviewedBy?: string;
  reviewedAt?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminReviewPayload {
  status: CourseStatus;
  adminReviewNotes?: string;
  isFeatured?: boolean;
  featuredOrder?: number;
}

export interface GetAdminCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface GetAdminCoursesMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface GetAdminCoursesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: GetAdminCoursesMeta;
  data: AdminPartnerCourse[];
}

export const FORMAT_OPTIONS: { label: string; value: CourseFormat }[] = [
  { label: "Online Cohort-based", value: "online_cohort" },
  { label: "Online Self-paced", value: "online_self_paced" },
  { label: "In-Person", value: "in_person" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Workshop", value: "workshop" },
  { label: "Short Course", value: "short_course" },
  { label: "Certificate Program", value: "certificate_program" },
];

export const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  approved: {
    label: "Approved & Live",
    bg: "bg-[#e6f4ea]",
    text: "text-[#1e7e34]",
    border: "border-[#b7e1cd]",
  },
  submitted: {
    label: "Under Review",
    bg: "bg-[#fff4e5]",
    text: "text-[#b26a00]",
    border: "border-[#ffd8a8]",
  },
  under_review: {
    label: "In Review",
    bg: "bg-[#e8f0fe]",
    text: "text-[#1a73e8]",
    border: "border-[#aecbfa]",
  },
  revision_requested: {
    label: "Revision Requested",
    bg: "bg-[#f3e8ff]",
    text: "text-[#7e22ce]",
    border: "border-[#e9d5ff]",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-[#fde8e8]",
    text: "text-[#c62828]",
    border: "border-[#f8b4b4]",
  },
  archived: {
    label: "Archived",
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
  },
  draft: {
    label: "Draft",
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-200",
  },
};
