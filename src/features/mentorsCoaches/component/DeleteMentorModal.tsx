"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { useDeleteMentorCoach } from "../hooks/useMentorsCoaches";
import type { MentorCoach } from "../types/mentor.types";
import { Button } from "@/components/ui/button";

interface DeleteMentorModalProps {
  mentor: MentorCoach | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DeleteMentorModal({
  mentor,
  isOpen,
  onClose,
  onSuccess,
}: DeleteMentorModalProps) {
  const { mutate: deleteMentor, isPending } = useDeleteMentorCoach();

  if (!isOpen || !mentor) return null;

  const fullName =
    `${mentor.firstName || ""} ${mentor.lastName || ""}`.trim() ||
    "this profile";
  const roleType = mentor.type === "coach" ? "Coach" : "Mentor";

  const handleDelete = () => {
    deleteMentor(mentor._id, {
      onSuccess: () => {
        onClose();
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#001014]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-left border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f4f4] text-[#5b6e70] transition hover:bg-[#e0e6e6] cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-[#181919]">
            Delete {roleType} Profile?
          </h2>
          <p className="mt-2 text-sm text-[#5b6e70] leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#181919]">{fullName}</span>?
            All profile details, experience, skills, and session records for
            this {roleType.toLowerCase()} will be permanently removed. This
            action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white min-w-[120px] cursor-pointer"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Deleting...</span>
              </div>
            ) : (
              `Delete ${roleType}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
