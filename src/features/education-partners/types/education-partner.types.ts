export interface PartnerUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface EducationPartner {
  _id: string;
  userId?: PartnerUser;
  organizationName: string;
  slug: string;
  organizationType: string;
  website: string;
  tagline?: string;
  bio: string;
  areasOfExpertise: string[];
  targetAudience: string[];
  educationalOfferings: string[];
  typesOfClimateEducation: string[];
  instructorNames: string[];
  contactEmail: string;
  contactPhone?: string;
  membershipStatus:
    "pending_payment" | "active" | "past_due" | "canceled" | "expired" | string;
  membershipTier?: string;
  membershipFee?: number;
  isVerifiedPartner: boolean;
  activationEmailSent?: boolean;
  totalCoursesCount: number;
  approvedCoursesCount: number;
  createdAt: string;
  updatedAt: string;
  logo?: { public_id: string; url: string };
  coverImage?: { public_id: string; url: string };
  stripeSessionId?: string;
}

export interface PartnerMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface GetPartnersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: EducationPartner[];
  meta: PartnerMeta;
}

export interface GetPartnersQueryParams {
  page?: number;
  limit?: number;
  membershipStatus?: string;
  isVerified?: string | boolean;
  search?: string;
}
