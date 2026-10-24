"use client";

import { useState } from "react";
import { X, Check, Mail, Eye, EyeOff } from "lucide-react";
import { MentorCoach } from "../types/mentor.types";

interface ApproveMentorModalProps {
  mentor: MentorCoach | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string, isEmailPublic: boolean) => void;
  isPending?: boolean;
}

export function ApproveMentorModal({
  mentor,
  isOpen,
  onClose,
  onConfirm,
  isPending = false,
}: ApproveMentorModalProps) {
  const [prevMentorId, setPrevMentorId] = useState<string | null>(null);
  const [isEmailPublic, setIsEmailPublic] = useState(false);

  if (mentor && mentor._id !== prevMentorId) {
    setPrevMentorId(mentor._id);
    setIsEmailPublic(Boolean(mentor.isEmailPublic));
  }

  if (!isOpen || !mentor) return null;

  const fullName = `${mentor.firstName} ${mentor.lastName}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl z-10 animate-in fade-in zoom-in duration-150">
        <button
          onClick={onClose}
          disabled={isPending}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Check size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Approve Application
            </h3>
            <p className="text-xs text-slate-500">
              Review and configure profile settings before publishing.
            </p>
          </div>
        </div>

        {/* Mentor Info Preview */}
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3.5 mb-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800">
              {fullName}
            </span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase">
              {mentor.type}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Mail size={14} className="text-slate-400 shrink-0" />
            <span className="truncate">{mentor.email}</span>
          </div>
        </div>

        {/* Admin Control: Email Visibility */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 mb-6 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-sm text-slate-900">
                {isEmailPublic ? (
                  <Eye size={16} className="text-emerald-600" />
                ) : (
                  <EyeOff size={16} className="text-slate-500" />
                )}
                <span>Public Email Visibility</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEmailPublic
                  ? "Email address will be displayed on the public website profile."
                  : "Email address will remain private and hidden from public visitors."}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={isEmailPublic}
                onChange={(e) => setIsEmailPublic(e.target.checked)}
                disabled={isPending}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(mentor._id, isEmailPublic)}
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition disabled:opacity-50"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Approving...</span>
              </>
            ) : (
              <span>Approve Mentor</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
