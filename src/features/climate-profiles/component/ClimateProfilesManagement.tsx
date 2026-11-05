"use client";

import React, { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Users,
  EyeOff,
  CheckCircle2,
  RefreshCw,
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import {
  useClimateProfiles,
  useSyncStatus,
  useToggleClimateProfileVisibility,
  useTriggerMightySync,
} from "../hooks/useClimateProfiles";
import type { ClimateProfile } from "../types/climateProfiles.types";
import TableSkeleton from "@/features/content-management/component/TableSkeleton";
import ClimateProfileDetailsModal from "./ClimateProfileDetailsModal";
import ClimateProfileFormModal from "./ClimateProfileFormModal";
import DeleteClimateProfileModal from "./DeleteClimateProfileModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CLIMATE_INTEREST_OPTIONS = [
  "All Interests",
  "Climate Tech",
  "Energy",
  "Policy",
  "Finance",
  "Sustainability",
  "Climate Careers",
  "Biodiversity",
  "Sustainable Business",
];

const PROFESSIONAL_AREA_OPTIONS = [
  "All Roles",
  "Professional",
  "Entrepreneur",
  "Student",
  "Career Changer",
  "Educator",
  "Researcher",
  "Climate-curious",
];

export default function ClimateProfilesManagement() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [isVisibleFilter, setIsVisibleFilter] = useState("all");
  const [climateInterestFilter, setClimateInterestFilter] = useState("all");
  const [professionalAreaFilter, setProfessionalAreaFilter] = useState("all");

  // Modals state
  const [selectedProfileForView, setSelectedProfileForView] =
    useState<ClimateProfile | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [selectedProfileForEdit, setSelectedProfileForEdit] =
    useState<ClimateProfile | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [selectedProfileForDelete, setSelectedProfileForDelete] =
    useState<ClimateProfile | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Queries & Mutations
  const { data: syncStatusData } = useSyncStatus();
  const { data, isLoading } = useClimateProfiles({
    page,
    limit,
    search,
    isVisible: isVisibleFilter,
    climateInterest:
      climateInterestFilter === "All Interests"
        ? undefined
        : climateInterestFilter,
    professionalArea:
      professionalAreaFilter === "All Roles"
        ? undefined
        : professionalAreaFilter,
  });

  const toggleVisibilityMutation = useToggleClimateProfileVisibility();
  const triggerSyncMutation = useTriggerMightySync();

  const profiles: ClimateProfile[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setSearch("");
    setIsVisibleFilter("all");
    setClimateInterestFilter("all");
    setProfessionalAreaFilter("all");
    setPage(1);
  };

  const handleToggleVisibility = async (profile: ClimateProfile) => {
    const newState = !profile.isVisible;
    try {
      await toggleVisibilityMutation.mutateAsync({
        id: profile._id,
        isVisible: newState,
      });
      if (
        selectedProfileForView &&
        selectedProfileForView._id === profile._id
      ) {
        setSelectedProfileForView({
          ...selectedProfileForView,
          isVisible: newState,
        });
      }
    } catch {
      // toast is already handled in mutation hook
    }
  };

  const handleTriggerSync = () => {
    triggerSyncMutation.mutate();
  };

  // Pagination helper
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#181919]">
            Meet Climate People Profiles
          </h1>
          <p className="text-sm text-[#6c6c6c]">
            Dashboard &gt; Meet Climate People Directory Management
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            type="button"
            variant="outline"
            onClick={handleTriggerSync}
            disabled={triggerSyncMutation.isPending}
            className="border-slate-300 text-slate-700 hover:bg-slate-50 h-10 text-xs font-semibold rounded-lg shadow-sm"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 mr-1.5 ${
                triggerSyncMutation.isPending
                  ? "animate-spin text-[#004242]"
                  : ""
              }`}
            />
            {triggerSyncMutation.isPending
              ? "Syncing Mighty Networks..."
              : "Sync from Mighty"}
          </Button>

          <Button
            type="button"
            onClick={() => {
              setSelectedProfileForEdit(null);
              setIsFormModalOpen(true);
            }}
            className="bg-[#004242] hover:bg-[#003333] text-white h-10 text-xs font-semibold rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Member Profile
          </Button>
        </div>
      </div>

      {/* Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Profiles
            </div>
            <div className="text-2xl font-extrabold text-[#053535] mt-1">
              {syncStatusData?.data?.totalProfiles ?? meta?.total ?? "..."}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#e6f4f1] text-[#004242] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Visible in Directory
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">
              {syncStatusData?.data?.visibleProfiles ?? "..."}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Hidden from Directory
            </div>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">
              {syncStatusData?.data?.hiddenProfiles ?? "..."}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <EyeOff className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Last Mighty Sync
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1 truncate max-w-[150px]">
              {syncStatusData?.data?.lastSyncedAt
                ? new Date(syncStatusData.data.lastSyncedAt).toLocaleDateString(
                    undefined,
                    {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )
                : "No sync recorded"}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#d8dfdf] space-y-4">
        <form
          onSubmit={handleSearchSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-3"
        >
          {/* Search box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search member name, title, organization, skills..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 h-10 border-[#d8dfdf] text-xs rounded-lg"
            />
          </div>

          {/* Visibility filter */}
          <div className="md:col-span-2">
            <Select
              value={isVisibleFilter}
              onValueChange={(val) => {
                setIsVisibleFilter(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-10 border-[#d8dfdf] text-xs rounded-lg">
                <SelectValue placeholder="All Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Visibility</SelectItem>
                <SelectItem value="true">Visible Only</SelectItem>
                <SelectItem value="false">Hidden Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Climate Interest filter */}
          <div className="md:col-span-2">
            <Select
              value={climateInterestFilter}
              onValueChange={(val) => {
                setClimateInterestFilter(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-10 border-[#d8dfdf] text-xs rounded-lg">
                <SelectValue placeholder="Climate Interest" />
              </SelectTrigger>
              <SelectContent>
                {CLIMATE_INTEREST_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Professional Area filter */}
          <div className="md:col-span-2">
            <Select
              value={professionalAreaFilter}
              onValueChange={(val) => {
                setProfessionalAreaFilter(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-10 border-[#d8dfdf] text-xs rounded-lg">
                <SelectValue placeholder="Role / Area" />
              </SelectTrigger>
              <SelectContent>
                {PROFESSIONAL_AREA_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex items-center gap-2">
            <Button
              type="submit"
              className="bg-[#053535] hover:bg-[#042a2a] text-white h-10 px-4 text-xs font-semibold rounded-lg flex-1"
            >
              Filter
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleResetFilters}
              title="Reset Filters"
              className="h-10 w-10 p-0 border-[#d8dfdf] rounded-lg text-gray-500 hover:text-gray-700"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Main Table */}
      {isLoading ? (
        <TableSkeleton columns={6} rows={8} />
      ) : profiles.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No Climate Profiles Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No member profiles match your current search and filter criteria.
            Try resetting the filters or sync members from Mighty Networks.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={handleResetFilters}
            className="text-xs font-semibold mt-2 border-slate-300"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#d8dfdf] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#d8dfdf] bg-[#f8fbfa] text-[#053535] font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">Title &amp; Organization</th>
                  <th className="py-3.5 px-4">Interests &amp; Focus</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4 text-center">Visibility</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf3f2]">
                {profiles.map((profile) => (
                  <tr
                    key={profile._id}
                    className="hover:bg-[#fbfdfc] transition-colors"
                  >
                    {/* Member Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#004242] text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden shadow-xs">
                          {profile.profileImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={profile.profileImage}
                              alt={profile.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            profile.name
                              ?.split(" ")
                              .map((p) => p[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase() || "CM"
                          )}
                        </div>
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProfileForView(profile);
                              setIsViewModalOpen(true);
                            }}
                            className="font-bold text-[#181919] hover:text-[#004242] hover:underline text-left truncate block max-w-[180px]"
                          >
                            {profile.name}
                          </button>
                          {profile.email && (
                            <span className="text-[11px] text-gray-500 truncate block max-w-[180px]">
                              {profile.email}
                            </span>
                          )}
                          {profile.location && (
                            <span className="text-[10px] text-gray-400 flex items-center gap-0.5 pt-0.5">
                              <MapPin className="w-2.5 h-2.5" />
                              {profile.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Title & Organization Column */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-gray-800 line-clamp-1">
                          {profile.professionalTitle || "—"}
                        </div>
                        <div className="text-gray-500 text-[11px] line-clamp-1">
                          {profile.organization || "Independent"}
                        </div>
                      </div>
                    </td>

                    {/* Interests & Focus */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[240px]">
                        {profile.climateInterests &&
                        profile.climateInterests.length > 0 ? (
                          profile.climateInterests
                            .slice(0, 2)
                            .map((item, i) => (
                              <span
                                key={i}
                                className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-medium"
                              >
                                {item}
                              </span>
                            ))
                        ) : (
                          <span className="text-gray-400 text-[11px]">
                            No tags
                          </span>
                        )}
                        {profile.climateInterests &&
                          profile.climateInterests.length > 2 && (
                            <span className="text-[10px] text-gray-400 font-medium self-center">
                              +{profile.climateInterests.length - 2}
                            </span>
                          )}
                      </div>
                    </td>

                    {/* Source Column */}
                    <td className="py-3.5 px-4">
                      {profile.mightyMemberId ? (
                        <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-purple-200">
                          Mighty
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                          Manual
                        </span>
                      )}
                    </td>

                    {/* Visibility Switch */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleVisibility(profile)}
                        title={
                          profile.isVisible
                            ? "Click to hide from public directory"
                            : "Click to make visible"
                        }
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors border ${
                          profile.isVisible
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        {profile.isVisible ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Visible
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-amber-600" />
                            Hidden
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions Column */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Details */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProfileForView(profile);
                            setIsViewModalOpen(true);
                          }}
                          title="View Details"
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-[#eef5f4] hover:text-[#004242] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProfileForEdit(profile);
                            setIsFormModalOpen(true);
                          }}
                          title="Edit Profile"
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProfileForDelete(profile);
                            setIsDeleteModalOpen(true);
                          }}
                          title="Delete Profile"
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-[#d8dfdf] bg-[#fafcfb] text-xs">
              <div className="text-gray-500">
                Showing page{" "}
                <span className="font-semibold text-gray-800">{page}</span> of{" "}
                <span className="font-semibold text-gray-800">
                  {totalPages}
                </span>{" "}
                ({meta?.total || profiles.length} total profiles)
              </div>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="h-8 px-2 border-slate-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {getPageNumbers().map((pNum) => (
                  <Button
                    key={pNum}
                    type="button"
                    size="sm"
                    variant={page === pNum ? "default" : "outline"}
                    onClick={() => setPage(pNum)}
                    className={`h-8 w-8 p-0 text-xs ${
                      page === pNum
                        ? "bg-[#004242] text-white hover:bg-[#00362f]"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {pNum}
                  </Button>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="h-8 px-2 border-slate-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <ClimateProfileDetailsModal
        profile={selectedProfileForView}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedProfileForView(null);
        }}
        onToggleVisibility={handleToggleVisibility}
        isTogglingVisibility={toggleVisibilityMutation.isPending}
      />

      <ClimateProfileFormModal
        profile={selectedProfileForEdit}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedProfileForEdit(null);
        }}
      />

      <DeleteClimateProfileModal
        profile={selectedProfileForDelete}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProfileForDelete(null);
        }}
      />
    </div>
  );
}
