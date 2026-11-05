export interface EducationItem {
  school?: string;
  degree?: string;
  year?: string;
}

export interface ExperienceItem {
  title?: string;
  company?: string;
  duration?: string;
}

export interface ClimateProfile {
  _id: string;
  mightyMemberId?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  professionalTitle?: string;
  organization?: string;
  about?: string;
  climateInterests?: string[];
  professionalAreas?: string[];
  education?: (EducationItem | string)[];
  experience?: (ExperienceItem | string)[];
  skills?: string[];
  areasOfExpertise?: string[];
  lookingFor?: string[];
  canHelpWith?: string[];
  linkedin?: string;
  website?: string;
  portfolio?: string;
  profileImage?: string;
  location?: string;
  excitingProjects?: string[];
  howToConnect?: string;
  isVisible: boolean;
  syncStatus?: "synced" | "manual" | "pending";
  lastSyncedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SyncTelemetry {
  totalFetched?: number;
  created?: number;
  updated?: number;
  deactivated?: number;
  lastSyncedAt?: string;
}

export interface SyncStatusData {
  totalProfiles: number;
  visibleProfiles: number;
  hiddenProfiles: number;
  lastSyncedAt: string | null;
  lastSyncStats?: SyncTelemetry | null;
}

export interface ClimateProfileQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  climateInterest?: string;
  professionalArea?: string;
  lookingFor?: string;
  isVisible?: string;
  all?: string | boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ClimateProfilesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: ClimateProfile[];
}

export interface SingleClimateProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ClimateProfile;
}

export interface SyncStatusResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: SyncStatusData;
}
