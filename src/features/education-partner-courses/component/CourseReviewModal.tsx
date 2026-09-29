"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Sparkles,
  Loader2,
  Building2,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import {
  AdminPartnerCourse,
  CourseStatus,
  AdminReviewPayload,
} from "../types/education-partner-course.types";
import { useReviewPartnerCourse } from "../hooks/useEducationPartnerCourses";

interface CourseReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: AdminPartnerCourse | null;
}

const TEMPLATES: Record<string, string> = {
  approved:
    "Excellent climate finance syllabus, verified instructor credentials and clear outcomes.",
  revision_requested:
    "Please provide more explicit details on prerequisites and whether credential verification is included.",
  rejected:
    "Course syllabus does not meet our climate action standards or verification criteria.",
  under_review:
    "Our education team is currently reviewing curriculum accreditation and lesson outcomes.",
};

export default function CourseReviewModal({
  isOpen,
  onClose,
  course,
}: CourseReviewModalProps) {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-[95vw] sm:max-w-2xl md:max-w-3xl max-w-3xl max-h-[92vh] overflow-y-auto p-0 rounded-2xl bg-white border border-slate-200 shadow-2xl"
      >
        <CourseReviewForm key={course._id} course={course} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

function CourseReviewForm({
  course,
  onClose,
}: {
  course: AdminPartnerCourse;
  onClose: () => void;
}) {
  const initialStatus: CourseStatus =
    course.status === "submitted" ? "approved" : course.status;
  const [status, setStatus] = useState<CourseStatus>(initialStatus);
  const [adminReviewNotes, setAdminReviewNotes] = useState(
    course.adminReviewNotes || TEMPLATES[initialStatus] || "",
  );
  const [isFeatured, setIsFeatured] = useState(Boolean(course.isFeatured));
  const [featuredOrder, setFeaturedOrder] = useState<number>(
    course.featuredOrder || 0,
  );

  const reviewMutation = useReviewPartnerCourse();

  const handleStatusChange = (newStatus: CourseStatus) => {
    setStatus(newStatus);
    // If notes are empty or match another template, offer the default template
    if (
      !adminReviewNotes ||
      Object.values(TEMPLATES).includes(adminReviewNotes)
    ) {
      setAdminReviewNotes(TEMPLATES[newStatus] || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: AdminReviewPayload = {
        status,
        adminReviewNotes: adminReviewNotes.trim() || undefined,
        isFeatured,
        featuredOrder: isFeatured ? Number(featuredOrder) || 0 : undefined,
      };

      await reviewMutation.mutateAsync({
        courseId: course._id,
        payload,
      });

      toast.success(
        `Course review updated to "${status.replace("_", " ")}" successfully!`,
      );
      onClose();
    } catch (err: unknown) {
      console.error("Failed to update course review:", err);
      const errorMsg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to submit course review.";
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <DialogHeader className="p-6 border-b border-[#d8dfdf] bg-[#fbfcfc] rounded-t-2xl text-left">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#004242] bg-[#004242]/10 px-2.5 py-0.5 rounded-full">
            Admin Moderation
          </span>
        </div>
        <DialogTitle className="text-xl font-bold text-[#181919]">
          Review Partner Course Offering
        </DialogTitle>
        <DialogDescription className="text-xs text-[#7b848a]">
          Approve for publication in directory, request revisions, or update
          featured status.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Target Course Summary Box */}
        <div className="bg-[#f8fafc] border border-gray-200/80 p-4 rounded-xl space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#004242]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{course.title}</span>
          </div>
          {course.providerId?.organizationName && (
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-gray-400" />
              <span>
                Offered by:{" "}
                <strong>{course.providerId.organizationName}</strong>
              </span>
            </p>
          )}
          <p className="text-xs text-gray-600 line-clamp-2 pt-1 font-normal">
            {course.summary || course.description}
          </p>
        </div>

        {/* Decision Status Options */}
        <div className="space-y-2.5">
          <Label className="text-xs font-bold text-[#2c3135] uppercase tracking-wider block">
            Moderation Decision <span className="text-red-500">*</span>
          </Label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Approved */}
            <div
              onClick={() => handleStatusChange("approved")}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                status === "approved"
                  ? "border-[#1e7e34] bg-[#e6f4ea] text-[#1e7e34] shadow-xs"
                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
              }`}
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#1e7e34]" />
              <div>
                <h4 className="text-xs font-bold">Approve & Publish</h4>
                <p className="text-[11px] opacity-80 leading-tight mt-0.5">
                  Course becomes available in directory
                </p>
              </div>
            </div>

            {/* Revision Requested */}
            <div
              onClick={() => handleStatusChange("revision_requested")}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                status === "revision_requested"
                  ? "border-[#7e22ce] bg-[#f3e8ff] text-[#7e22ce] shadow-xs"
                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
              }`}
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#7e22ce]" />
              <div>
                <h4 className="text-xs font-bold">Request Revision</h4>
                <p className="text-[11px] opacity-80 leading-tight mt-0.5">
                  Partner must amend details
                </p>
              </div>
            </div>

            {/* Under Review */}
            <div
              onClick={() => handleStatusChange("under_review")}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                status === "under_review"
                  ? "border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8] shadow-xs"
                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
              }`}
            >
              <Clock className="w-5 h-5 shrink-0 mt-0.5 text-[#1a73e8]" />
              <div>
                <h4 className="text-xs font-bold">In Review</h4>
                <p className="text-[11px] opacity-80 leading-tight mt-0.5">
                  Currently under internal evaluation
                </p>
              </div>
            </div>

            {/* Rejected */}
            <div
              onClick={() => handleStatusChange("rejected")}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                status === "rejected"
                  ? "border-[#c62828] bg-[#fde8e8] text-[#c62828] shadow-xs"
                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
              }`}
            >
              <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#c62828]" />
              <div>
                <h4 className="text-xs font-bold">Reject Offering</h4>
                <p className="text-[11px] opacity-80 leading-tight mt-0.5">
                  Decline course submission
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Review Notes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="adminReviewNotes"
              className="text-xs font-bold text-[#2c3135] uppercase tracking-wider"
            >
              Admin Review Notes / Feedback
            </Label>
            <span className="text-[11px] text-gray-400">
              Visible to Education Partner
            </span>
          </div>

          <Textarea
            id="adminReviewNotes"
            rows={3}
            value={adminReviewNotes}
            onChange={(e) => setAdminReviewNotes(e.target.value)}
            placeholder="Provide constructive feedback, reasons for revision, or accreditation confirmation..."
            className="text-xs rounded-xl resize-none border-gray-200"
          />

          {/* Quick Template Chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] text-gray-400 font-semibold mr-1">
              Insert template:
            </span>
            <button
              type="button"
              onClick={() => setAdminReviewNotes(TEMPLATES.approved)}
              className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-lg hover:bg-emerald-100 transition"
            >
              Approval note
            </button>
            <button
              type="button"
              onClick={() => setAdminReviewNotes(TEMPLATES.revision_requested)}
              className="text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-lg hover:bg-purple-100 transition"
            >
              Revision note
            </button>
          </div>
        </div>

        {/* Featured Course Controls */}
        <div className="p-4 bg-[#fbfcfc] border border-[#d8dfdf] rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label
                htmlFor="isFeatured"
                className="text-xs font-bold text-[#2c3135] block cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Feature on Courses Homepage
              </Label>
              <p className="text-[11px] text-[#7b848a] mt-0.5">
                Pin this course with priority placement in the public course
                catalog.
              </p>
            </div>

            {/* Styled Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={isFeatured}
              onClick={() => setIsFeatured(!isFeatured)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isFeatured ? "bg-[#004242]" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isFeatured ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {isFeatured && (
            <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
              <Label
                htmlFor="featuredOrder"
                className="text-xs font-semibold text-gray-700 whitespace-nowrap"
              >
                Display Order Priority:
              </Label>
              <Input
                id="featuredOrder"
                type="number"
                min="0"
                value={featuredOrder}
                onChange={(e) => setFeaturedOrder(Number(e.target.value))}
                className="h-8 w-24 text-xs rounded-lg"
                placeholder="1"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            disabled={reviewMutation.isPending}
            onClick={onClose}
            className="rounded-xl px-5 h-10 text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={reviewMutation.isPending}
            className="bg-[#004242] hover:bg-[#003333] text-white rounded-xl px-6 h-10 text-xs font-bold shadow-sm transition"
          >
            {reviewMutation.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Saving Decision...
              </>
            ) : (
              "Save Review Decision"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
