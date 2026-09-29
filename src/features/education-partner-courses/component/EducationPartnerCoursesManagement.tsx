"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Eye,
  Building2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  BookOpen,
  GraduationCap,
  Clock,
  Sparkles,
  AlertCircle,
  X,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableSkeleton from "@/features/content-management/component/TableSkeleton";
import {
  AdminPartnerCourse,
  STATUS_CONFIG,
  FORMAT_OPTIONS,
} from "../types/education-partner-course.types";
import { useAdminCourseReviewQueue } from "../hooks/useEducationPartnerCourses";
import CourseDetailsModal from "./CourseDetailsModal";
import CourseReviewModal from "./CourseReviewModal";

export default function EducationPartnerCoursesManagement() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [selectedCourseForDetails, setSelectedCourseForDetails] =
    useState<AdminPartnerCourse | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [selectedCourseForReview, setSelectedCourseForReview] =
    useState<AdminPartnerCourse | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { data, isLoading, refetch, isFetching } = useAdminCourseReviewQueue({
    page,
    limit,
    search,
    status: statusFilter,
  });

  const courses: AdminPartnerCourse[] = data?.data || [];
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
    setStatusFilter("all");
    setPage(1);
  };

  const handleOpenDetails = (course: AdminPartnerCourse) => {
    setSelectedCourseForDetails(course);
    setIsDetailsModalOpen(true);
  };

  const handleOpenReview = (course: AdminPartnerCourse) => {
    setSelectedCourseForReview(course);
    setIsReviewModalOpen(true);
  };

  // Stats calculation
  const approvedCount = courses.filter((c) => c.status === "approved").length;
  const underReviewCount = courses.filter(
    (c) => c.status === "submitted" || c.status === "under_review",
  ).length;
  const revisionRequestedCount = courses.filter(
    (c) => c.status === "revision_requested",
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#181919] tracking-tight">
            Education Partner Courses
          </h1>
          <div className="mt-1 flex items-center gap-2 text-xs text-[#7b848a]">
            <span>Dashboard</span>
            <span>›</span>
            <span>Education Partners</span>
            <span>›</span>
            <span className="font-semibold text-[#004242]">
              Course Review Queue
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading || isFetching}
          className="self-start sm:self-auto h-10 px-4 rounded-xl border-[#d8dfdf] text-xs font-semibold gap-2"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
          />
          <span>Refresh Queue</span>
        </Button>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-[#d8dfdf] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#004242]/10 text-[#004242] flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Total Listed Courses
            </span>
            <span className="text-2xl font-bold text-[#181919]">
              {meta?.total || courses.length}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#d8dfdf] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Approved & Published
            </span>
            <span className="text-2xl font-bold text-emerald-700">
              {approvedCount}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#d8dfdf] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Under Review
            </span>
            <span className="text-2xl font-bold text-amber-700">
              {underReviewCount}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#d8dfdf] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Revision Requested
            </span>
            <span className="text-2xl font-bold text-purple-700">
              {revisionRequestedCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 md:p-5 border border-[#d8dfdf] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 flex-1 max-w-lg"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search course title, syllabus, or partner..."
                className="pl-9 pr-9 h-11 rounded-xl text-xs md:text-sm border-gray-200"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              className="bg-[#004242] hover:bg-[#003333] text-white font-semibold px-4 h-11 rounded-xl text-xs"
            >
              Search
            </Button>
          </form>

          {/* Status Filter */}
          <div className="flex items-center gap-2.5">
            <div className="w-48">
              <Select
                value={statusFilter}
                onValueChange={(val) => {
                  setStatusFilter(val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-11 rounded-xl text-xs font-semibold">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Partner Courses</SelectItem>
                  <SelectItem value="approved">Approved & Live</SelectItem>
                  <SelectItem value="submitted">Under Review</SelectItem>
                  <SelectItem value="under_review">In Review</SelectItem>
                  <SelectItem value="revision_requested">
                    Revision Requested
                  </SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending_queue">
                    Review Queue Only
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(search || statusFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="h-11 rounded-xl text-xs font-bold text-gray-600 hover:text-gray-900 border-dashed"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Course Data Table */}
      <div className="bg-white rounded-xl border border-[#d8dfdf] shadow-2xs overflow-hidden">
        {isLoading ? (
          <TableSkeleton columns={6} rows={6} />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#d8dfdf] bg-[#fbfcfc]">
                  <th className="px-5 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Course Information
                  </th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Education Partner
                  </th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Format & Duration
                  </th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">
                    Tuition
                  </th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#d8dfdf]">
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="max-w-md mx-auto space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-[#004242]/10 text-[#004242] flex items-center justify-center mx-auto">
                          <BookOpen className="w-7 h-7" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">
                          No partner courses found
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {search || statusFilter !== "all"
                            ? "No course offerings matched your current filter criteria."
                            : "There are currently no partner courses waiting in the moderation queue."}
                        </p>
                        {(search || statusFilter !== "all") && (
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleResetFilters}
                              className="rounded-xl text-xs font-semibold"
                            >
                              Reset Filters
                            </Button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => {
                    const statusConfig =
                      STATUS_CONFIG[course.status] || STATUS_CONFIG.draft;
                    const formatLabel =
                      FORMAT_OPTIONS.find(
                        (f: { label: string; value: string }) =>
                          f.value === course.format,
                      )?.label || course.format;
                    const coverUrl =
                      course.coverImage?.url || course.image?.url;

                    return (
                      <tr
                        key={course._id}
                        className="hover:bg-[#fbfcfc] transition-colors"
                      >
                        {/* Course Info */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3.5">
                            {coverUrl ? (
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 bg-slate-900">
                                <Image
                                  src={coverUrl}
                                  alt={course.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-[#004242]/10 text-[#004242] flex items-center justify-center shrink-0 font-bold">
                                <BookOpen className="w-5 h-5" />
                              </div>
                            )}

                            <div className="min-w-0 max-w-xs sm:max-w-sm">
                              <div className="flex items-center gap-2">
                                <h4
                                  onClick={() => handleOpenDetails(course)}
                                  className="text-xs md:text-sm font-bold text-gray-900 hover:text-[#004242] cursor-pointer truncate transition"
                                  title={course.title}
                                >
                                  {course.title}
                                </h4>
                                {course.isFeatured && (
                                  <span className="inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                    <Sparkles className="w-2.5 h-2.5 mr-0.5 text-amber-500" />
                                    Featured #{course.featuredOrder || 1}
                                  </span>
                                )}
                              </div>
                              <p
                                className="text-[11px] text-gray-500 line-clamp-1 mt-0.5"
                                title={course.summary || course.description}
                              >
                                {course.summary || course.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Partner Institution */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          {course.providerId ? (
                            <div>
                              <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5 text-[#004242]" />
                                {course.providerId.organizationName}
                              </span>
                              {course.providerId.contactEmail && (
                                <span className="text-[11px] text-gray-500 block mt-0.5">
                                  {course.providerId.contactEmail}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">
                              Partner Profile Pending
                            </span>
                          )}
                        </td>

                        {/* Format & Duration */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-xs font-semibold text-gray-800 block">
                            {formatLabel}
                          </span>
                          <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-gray-400" />
                            {course.duration}
                          </span>
                        </td>

                        {/* Tuition */}
                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          {course.isFree ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Free
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-gray-900">
                              {course.currency || "USD"} {course.price}
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                          >
                            {statusConfig.label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDetails(course)}
                              className="h-8 text-xs font-semibold text-[#004242] border-[#004242]/20 hover:bg-[#004242]/10 rounded-lg px-2.5"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" />
                              View
                            </Button>

                            <Button
                              size="sm"
                              onClick={() => handleOpenReview(course)}
                              className="h-8 text-xs font-bold bg-[#004242] hover:bg-[#003333] text-white rounded-lg px-3 shadow-xs"
                            >
                              <Pencil className="w-3 h-3 mr-1" />
                              Review
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 md:p-5 border-t border-[#d8dfdf] bg-[#fbfcfc] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <div>
              Showing page{" "}
              <span className="font-bold">{meta?.page || page}</span> of{" "}
              <span className="font-bold">{totalPages}</span> (
              <span className="font-bold">{meta?.total || 0}</span> total
              courses)
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="h-8 rounded-lg text-xs font-semibold"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                .map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                    className={`h-8 w-8 p-0 rounded-lg text-xs font-bold ${
                      page === pageNum
                        ? "bg-[#004242] text-white hover:bg-[#003333]"
                        : "text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </Button>
                ))}

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages || isLoading}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="h-8 rounded-lg text-xs font-semibold"
              >
                Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: VIEW DETAILS */}
      <CourseDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedCourseForDetails(null);
        }}
        course={selectedCourseForDetails}
        onOpenReview={(c) => {
          setSelectedCourseForReview(c);
          setIsReviewModalOpen(true);
        }}
      />

      {/* MODAL 2: REVIEW DECISION */}
      <CourseReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedCourseForReview(null);
        }}
        course={selectedCourseForReview}
      />
    </div>
  );
}
