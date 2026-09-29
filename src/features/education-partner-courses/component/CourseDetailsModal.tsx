"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  ShieldCheck,
  Building2,
  Mail,
  Tag,
  Users,
  User,
  AlertCircle,
  CheckCircle2,
  FileCheck,
  Pencil,
} from "lucide-react";
import {
  AdminPartnerCourse,
  STATUS_CONFIG,
  FORMAT_OPTIONS,
} from "../types/education-partner-course.types";

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: AdminPartnerCourse | null;
  onOpenReview: (course: AdminPartnerCourse) => void;
}

export default function CourseDetailsModal({
  isOpen,
  onClose,
  course,
  onOpenReview,
}: CourseDetailsModalProps) {
  if (!course) return null;

  const statusConfig = STATUS_CONFIG[course.status] || STATUS_CONFIG.draft;
  const formatLabel =
    FORMAT_OPTIONS.find((f) => f.value === course.format)?.label ||
    course.format;
  const coverUrl = course.coverImage?.url || course.image?.url;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-[95vw] sm:max-w-4xl md:max-w-5xl max-w-5xl max-h-[92vh] overflow-y-auto p-0 rounded-2xl bg-white border border-slate-200 shadow-2xl"
      >
        {/* Cover or Header */}
        {coverUrl ? (
          <div className="relative w-full h-56 bg-slate-900 overflow-hidden rounded-t-2xl">
            <Image
              src={coverUrl}
              alt={course.title}
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-md ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                >
                  {statusConfig.label}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-1.5 drop-shadow-sm">
                  {course.title}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#004242] p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-md ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
              >
                {statusConfig.label}
              </span>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full font-medium text-emerald-200 border border-white/20">
                {formatLabel}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {course.title}
            </h2>
          </div>
        )}

        <div className="p-6 md:p-8 space-y-6">
          {/* Provider / Institution Banner */}
          {course.providerId && (
            <div className="p-4 bg-[#f8fafc] border border-gray-200/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#004242]/10 text-[#004242] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      {course.providerId.organizationName}
                    </h3>
                    {course.providerId.isVerifiedPartner && (
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </div>
                  {course.providerId.contactEmail && (
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" />
                      {course.providerId.contactEmail}
                    </p>
                  )}
                </div>
              </div>

              {course.providerId.website && (
                <a
                  href={course.providerId.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#004242] hover:underline inline-flex items-center gap-1"
                >
                  Visit Partner Site <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#fbfcfc] border border-gray-200/80 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Format
              </span>
              <span className="text-xs font-bold text-gray-900 block truncate mt-0.5">
                {formatLabel}
              </span>
            </div>

            <div className="bg-[#fbfcfc] border border-gray-200/80 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Duration
              </span>
              <span className="text-xs font-bold text-gray-900 block truncate mt-0.5">
                {course.duration || "N/A"}
              </span>
            </div>

            <div className="bg-[#fbfcfc] border border-gray-200/80 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Tuition
              </span>
              <span className="text-xs font-bold text-emerald-700 block truncate mt-0.5">
                {course.isFree
                  ? "Free"
                  : `${course.currency || "USD"} ${course.price}`}
              </span>
            </div>

            <div className="bg-[#fbfcfc] border border-gray-200/80 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Certificate
              </span>
              <span className="text-xs font-bold text-gray-900 block truncate mt-0.5">
                {course.hasCertificate ? "Included" : "None"}
              </span>
            </div>
          </div>

          {/* Admin Review Notes (if already reviewed) */}
          {course.adminReviewNotes && (
            <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1">
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                Current Admin Moderation Feedback
              </span>
              <p className="text-xs text-purple-800 leading-relaxed font-medium">
                {course.adminReviewNotes}
              </p>
            </div>
          )}

          {/* Categories */}
          {course.categories && course.categories.length > 0 && (
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                Climate Topics & Categories
              </span>
              <div className="flex flex-wrap gap-1.5">
                {course.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#eef4f5] text-[#004242] border border-[#004242]/10"
                  >
                    <Tag className="w-3 h-3 mr-1 text-[#004242]/70" />
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          {course.summary && (
            <div className="bg-[#fbf4ea]/70 border border-[#004242]/10 p-4 rounded-xl">
              <span className="text-xs font-bold text-[#004242] uppercase tracking-wider block mb-1">
                Course Executive Summary
              </span>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                {course.summary}
              </p>
            </div>
          )}

          {/* Description */}
          {course.description && (
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                Full Curriculum Overview
              </span>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50/60 p-4 rounded-xl border border-gray-100">
                {course.description}
              </p>
            </div>
          )}

          {/* Learning Outcomes */}
          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                Learning Outcomes & Skills
              </span>
              <div className="grid grid-cols-1 gap-2">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-gray-100 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-800 leading-snug">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructor Information */}
          {(course.instructorName ||
            course.instructorBio ||
            course.instructorImage?.url) && (
            <div className="border border-gray-200/80 p-4 rounded-xl bg-[#fbfdfd] flex items-start gap-4">
              {course.instructorImage?.url ? (
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#004242]/20 shrink-0">
                  <Image
                    src={course.instructorImage.url}
                    alt={course.instructorName || "Instructor"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#004242]/10 text-[#004242] flex items-center justify-center font-bold shrink-0">
                  <User className="w-7 h-7" />
                </div>
              )}
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Instructor Information
                </span>
                <h4 className="text-sm font-bold text-gray-900 mt-0.5">
                  {course.instructorName || "Instructor"}
                </h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {course.instructorBio ||
                    course.instructorDetails ||
                    "No bio provided."}
                </p>
              </div>
            </div>
          )}

          {/* Curriculum Lessons */}
          {course.lessons && course.lessons.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Course Curriculum ({course.lessons.length} Lessons)
              </span>
              <div className="space-y-2">
                {course.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between"
                  >
                    <span className="text-xs font-semibold text-gray-800">
                      {idx + 1}. {lesson.title}
                    </span>
                    {lesson.videoUrl && (
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#004242] hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        Watch Video <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audience, Instructor, Prerequisites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {course.targetAudience && (
              <div className="border border-gray-100 p-4 rounded-xl bg-gray-50/40">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-[#004242]" /> Target
                  Audience
                </span>
                <p className="text-xs sm:text-sm text-gray-800">
                  {course.targetAudience}
                </p>
              </div>
            )}

            {course.instructorDetails && (
              <div className="border border-gray-100 p-4 rounded-xl bg-gray-50/40">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-[#004242]" /> Instructor /
                  Leadership
                </span>
                <p className="text-xs sm:text-sm text-gray-800">
                  {course.instructorDetails}
                </p>
              </div>
            )}

            {course.prerequisites && (
              <div className="border border-gray-100 p-4 rounded-xl bg-gray-50/40">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-[#004242]" />{" "}
                  Prerequisites
                </span>
                <p className="text-xs sm:text-sm text-gray-800">
                  {course.prerequisites}
                </p>
              </div>
            )}

            {course.hasCertificate && course.certificateDetails && (
              <div className="border border-gray-100 p-4 rounded-xl bg-emerald-50/30">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                  Certificate Details
                </span>
                <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                  {course.certificateDetails}
                </p>
              </div>
            )}
          </div>

          {/* Enrollment Link */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Direct Enrollment URL
              </span>
              <p className="text-xs text-gray-600 truncate max-w-md mt-0.5">
                {course.enrollmentUrl}
              </p>
            </div>
            <a
              href={course.enrollmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#004242] hover:bg-[#003333] text-white px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 shadow-sm"
            >
              <span>Test External Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between rounded-b-2xl">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl px-5 h-10 text-xs font-semibold text-gray-700"
          >
            Close
          </Button>

          <Button
            type="button"
            onClick={() => {
              onClose();
              onOpenReview(course);
            }}
            className="rounded-xl px-6 h-10 bg-[#004242] hover:bg-[#003333] text-white text-xs font-bold gap-2 shadow-sm"
          >
            <Pencil className="w-3.5 h-3.5" />
            Review & Change Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
