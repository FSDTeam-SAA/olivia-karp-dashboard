"use client";

import { useState } from "react";
import {
  Briefcase,
  DollarSign,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  X,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  Calendar,
  Trash2,
  ShieldCheck,
  Clock,
  Phone,
  User,
  Quote,
} from "lucide-react";
import Image from "next/image";
import { MentorCoach } from "../types/mentor.types";
import { useToggleMentorEmailVisibility } from "../hooks/useMentorsCoaches";

interface MentorProfileModalProps {
  mentor: MentorCoach;
  onClose: () => void;
  onApproveClick?: (mentor: MentorCoach) => void;
  onDeleteClick?: (mentor: MentorCoach) => void;
}

export function MentorProfileModal({
  mentor,
  onClose,
  onApproveClick,
  onDeleteClick,
}: MentorProfileModalProps) {
  const [overrideEmailPublic, setOverrideEmailPublic] = useState<
    boolean | null
  >(null);
  const currentEmailPublic =
    overrideEmailPublic !== null
      ? overrideEmailPublic
      : Boolean(mentor.isEmailPublic);

  const { mutate: toggleEmailVisibility, isPending: isTogglingEmail } =
    useToggleMentorEmailVisibility();

  const handleToggleEmailVisibility = () => {
    const nextVal = !currentEmailPublic;
    setOverrideEmailPublic(nextVal);
    toggleEmailVisibility(
      { id: mentor._id, isEmailPublic: nextVal },
      {
        onError: () => {
          setOverrideEmailPublic(Boolean(mentor.isEmailPublic));
        },
      },
    );
  };

  const fullName =
    `${mentor.firstName || ""} ${mentor.lastName || ""}`.trim() ||
    "Mentor / Coach";
  const initials =
    `${mentor.firstName?.[0] || ""}${mentor.lastName?.[0] || ""}`.toUpperCase() ||
    "MC";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001014]/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto text-left">
        {/* Top Decorative Banner */}
        <div className="relative h-28 md:h-36 w-full bg-gradient-to-r from-[#00383a] via-[#004f52] to-[#0a727c] shrink-0">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-12 left-1/3 h-36 w-36 rounded-full bg-teal-300/10 blur-xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white/90 hover:bg-black/40 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 pb-8 md:px-8 space-y-6">
          {/* Header Info with Overlapping Avatar */}
          <div className="flex flex-col md:flex-row items-start gap-5 -mt-14 md:-mt-16 relative z-10">
            {/* Avatar */}
            <div className="relative h-28 w-28 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-md">
              {mentor.image?.url ? (
                <Image
                  src={mentor.image.url}
                  alt={fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#004f52] to-[#0a727c] text-white font-bold text-2xl md:text-3xl">
                  {initials}
                </div>
              )}
              {mentor.isActive !== false && (
                <span
                  className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#31c95f]"
                  title="Active"
                />
              )}
            </div>

            {/* Title & Badges */}
            <div className="flex-1 min-w-0 pt-1 md:pt-4 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1f2937] tracking-tight">
                  {fullName}
                </h2>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                    mentor.type === "coach"
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-teal-50 text-[#004f52] border border-teal-200"
                  }`}
                >
                  {mentor.type === "coach" ? "Coach" : "Mentor"}
                </span>

                {mentor.isApproved ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    <ShieldCheck size={13} />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    <Clock size={13} />
                    Pending Approval
                  </span>
                )}

                {mentor.roleFunction && (
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                    {mentor.roleFunction}
                  </span>
                )}

                {mentor.industry && (
                  <span className="rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                    {mentor.industry}
                  </span>
                )}
              </div>

              {/* Designation / Bio Headline */}
              <p className="text-base text-slate-700 font-medium leading-snug">
                {mentor.designation || mentor.bio || "Professional Mentor"}
              </p>

              {/* Meta Chips */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-slate-500 pt-1">
                {mentor.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-slate-400 shrink-0" />
                    <span>{mentor.address}</span>
                  </div>
                )}

                {mentor.experienceYears !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={15} className="text-slate-400 shrink-0" />
                    <span>{mentor.experienceYears} Years Experience</span>
                  </div>
                )}

                {mentor.isPaidSession !== undefined && (
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <DollarSign
                      size={15}
                      className="text-emerald-600 shrink-0"
                    />
                    <span>
                      {mentor.isPaidSession
                        ? mentor.hourlyRate
                          ? `$${mentor.hourlyRate} / hour`
                          : "Paid Session"
                        : "Free Consultation"}
                    </span>
                  </div>
                )}

                {mentor.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone size={14} className="text-slate-400 shrink-0" />
                    <span>{mentor.phone}</span>
                  </div>
                )}
              </div>

              {/* Social & Contact Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {mentor.email && (
                  <a
                    href={`mailto:${mentor.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
                    title={`Email ${mentor.email}`}
                  >
                    <Mail size={14} className="text-[#004f52]" />
                    <span>{mentor.email}</span>
                  </a>
                )}

                {mentor.linkedin && (
                  <a
                    href={mentor.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition shadow-2xs"
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={14} className="text-[#0a66c2]" />
                    <span>LinkedIn</span>
                    <ExternalLink size={12} className="text-slate-400" />
                  </a>
                )}

                {mentor.website && (
                  <a
                    href={
                      mentor.website.startsWith("http")
                        ? mentor.website
                        : `https://${mentor.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
                    title="Personal Website"
                  >
                    <Globe size={14} className="text-[#004f52]" />
                    <span>Website</span>
                    <ExternalLink size={12} className="text-slate-400" />
                  </a>
                )}

                {mentor.bookingLink && (
                  <a
                    href={
                      mentor.bookingLink.startsWith("http")
                        ? mentor.bookingLink
                        : `https://${mentor.bookingLink}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-200 bg-teal-50/50 text-xs font-semibold text-[#004f52] hover:bg-teal-100/60 transition shadow-2xs"
                    title="Booking Link"
                  >
                    <Calendar size={14} className="text-[#004f52]" />
                    <span>Booking Page</span>
                    <ExternalLink size={12} className="text-teal-600" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Admin Email Visibility Card */}
          <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                  currentEmailPublic
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {currentEmailPublic ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    Public Email Visibility:
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      currentEmailPublic
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-slate-200 text-slate-700 border border-slate-300"
                    }`}
                  >
                    {currentEmailPublic
                      ? "Visible on Website"
                      : "Hidden from Public"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {currentEmailPublic
                    ? `Public directory visitors can view and copy ${mentor.email || "the email"}.`
                    : "Email is kept private for platform admins only and masked from public visitors."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleEmailVisibility}
              disabled={isTogglingEmail}
              className={`cursor-pointer inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition shrink-0 ${
                currentEmailPublic
                  ? "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                  : "bg-[#004f52] text-white hover:bg-[#003d40]"
              }`}
            >
              {isTogglingEmail ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Updating...
                </span>
              ) : currentEmailPublic ? (
                <>
                  <EyeOff size={14} />
                  Hide from Public
                </>
              ) : (
                <>
                  <Eye size={14} />
                  Make Public
                </>
              )}
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Left 2 Columns: Bio, Experience, Support */}
            <div className="md:col-span-2 space-y-6">
              {/* Bio / About */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Quote size={14} className="text-[#004f52]" />
                  <span>About & Professional Bio</span>
                </div>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {mentor.about ||
                    mentor.bio ||
                    "No detailed biography provided."}
                </p>
              </div>

              {/* Work History */}
              {mentor.experience && mentor.experience.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Briefcase size={14} className="text-[#004f52]" />
                    <span>Work Experience & History</span>
                  </div>
                  <div className="space-y-4 pl-2">
                    {mentor.experience.map((exp, idx) => (
                      <div
                        key={exp._id || idx}
                        className="relative pl-6 border-l-2 border-[#004f52]/25 pb-2 last:pb-0"
                      >
                        <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#004f52] ring-4 ring-white" />
                        <h4 className="font-bold text-slate-900 text-sm md:text-base">
                          {exp.title}
                        </h4>
                        {exp.description && (
                          <p className="mt-1 text-xs md:text-sm text-slate-600 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Areas */}
              {mentor.support && mentor.support.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <User size={14} className="text-[#004f52]" />
                    <span>Mentorship & Support Areas</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mentor.support.map((sup, idx) => (
                      <div
                        key={sup._id || idx}
                        className="rounded-lg border border-slate-100 bg-[#f8fbfb] p-3.5 space-y-1"
                      >
                        <h4 className="font-bold text-slate-800 text-xs md:text-sm">
                          {sup.title}
                        </h4>
                        {sup.description && (
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {sup.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Skills, Session Info, Philosophy */}
            <div className="space-y-6">
              {/* Session Booking Card */}
              <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Session Details
                </h4>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between py-1 border-b border-teal-100">
                    <span className="text-slate-500">Session Type:</span>
                    <span className="font-bold text-slate-900">
                      {mentor.isPaidSession ? "Paid Session" : "Free"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-teal-100">
                    <span className="text-slate-500">Rate:</span>
                    <span className="font-bold text-emerald-700">
                      {mentor.hourlyRate
                        ? `$${mentor.hourlyRate} / hr`
                        : "Free"}
                    </span>
                  </div>
                  {mentor.experienceYears !== undefined && (
                    <div className="flex items-center justify-between py-1 border-b border-teal-100">
                      <span className="text-slate-500">Experience:</span>
                      <span className="font-bold text-slate-900">
                        {mentor.experienceYears} Years
                      </span>
                    </div>
                  )}
                </div>

                {mentor.bookingLink && (
                  <a
                    href={
                      mentor.bookingLink.startsWith("http")
                        ? mentor.bookingLink
                        : `https://${mentor.bookingLink}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#004f52] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#003d40] shadow-2xs"
                  >
                    <Calendar size={14} />
                    <span>Open Booking Page</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* Core Skills */}
              {mentor.skills && mentor.skills.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Core Skills & Focus
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {mentor.languages && mentor.languages.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-[#eef3f4] px-2.5 py-1 text-xs font-semibold text-[#32545b]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Philosophy & Goal */}
              {(mentor.motivation || mentor.goal) && (
                <div className="rounded-xl bg-[#002d2f] text-white p-5 space-y-4">
                  {mentor.motivation && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-teal-300">
                        Philosophy
                      </span>
                      <p className="text-xs italic text-teal-50/90 leading-relaxed">
                        &quot;{mentor.motivation}&quot;
                      </p>
                    </div>
                  )}

                  {mentor.goal && (
                    <div className="space-y-1 pt-2 border-t border-teal-800">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-teal-300">
                        Career Goal
                      </span>
                      <p className="text-xs text-teal-50/80 leading-relaxed">
                        {mentor.goal}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer with Delete & Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            {onDeleteClick && (
              <button
                type="button"
                onClick={() => {
                  onDeleteClick(mentor);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
                title="Delete Mentor/Coach"
              >
                <Trash2 size={16} />
                <span>Delete Mentor</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!mentor.isApproved && onApproveClick && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onApproveClick(mentor);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-bold text-white bg-[#31c95f] rounded-lg hover:bg-[#24a148] transition cursor-pointer shadow-xs"
              >
                <Check size={16} />
                <span>Approve Application</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs md:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
