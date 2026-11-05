"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { useDeleteClimateProfile } from "../hooks/useClimateProfiles";
import type { ClimateProfile } from "../types/climateProfiles.types";
import { Button } from "@/components/ui/button";

interface DeleteClimateProfileModalProps {
  profile: ClimateProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteClimateProfileModal({
  profile,
  isOpen,
  onClose,
}: DeleteClimateProfileModalProps) {
  const deleteMutation = useDeleteClimateProfile();

  if (!isOpen || !profile) return null;

  const handleDelete = () => {
    deleteMutation.mutate(profile._id, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#001014]/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-left border border-slate-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f4f4] text-[#5b6e70] transition hover:bg-[#e0e6e6]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-[#181919]">
            Delete Member Profile?
          </h2>
          <p className="mt-2 text-sm text-[#5b6e70] leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#181919]">{profile.name}</span>
            ? This will permanently remove their profile from the &quot;Meet
            Climate People&quot; directory.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}
