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
} from "lucide-react";
import Image from "next/image";
import { MentorCoach } from "../types/mentor.types";
import { useToggleMentorEmailVisibility } from "../hooks/useMentorsCoaches";

interface MentorProfileModalProps {
  mentor: MentorCoach;
  onClose: () => void;
  onApproveClick?: (mentor: MentorCoach) => void;
}

export function MentorProfileModal({
  mentor,
  onClose,
  onApproveClick,
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

  const fullName = `${mentor.firstName} ${mentor.lastName}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl bg-white border border-slate-200 z-10 overflow-hidden shadow-none animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-20 p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto p-8 md:p-10">
          {/* Header Section */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start border-b border-slate-100 pb-10">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl md:h-44 md:w-44 border border-slate-100 bg-slate-50">
              <Image
                src={mentor.image?.url || "/images/profile.png"}
                alt={fullName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {fullName}
                </h2>
                <div className="flex gap-2">
                  <span className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    {mentor.type}
                  </span>
                  {mentor.roleFunction && (
                    <span className="rounded-md border border-purple-100 bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-600 uppercase tracking-widest">
                      {mentor.roleFunction}
                    </span>
                  )}
                  {mentor.industry && (
                    <span className="rounded-md border border-amber-100 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 uppercase tracking-widest">
                      {mentor.industry}
                    </span>
                  )}
                  {mentor.isApproved && (
                    <span className="rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <p className="text-lg text-slate-600 font-medium leading-tight">
                {mentor.designation || mentor.bio}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pt-1">
                {mentor.address && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    <span>{mentor.address}</span>
                  </div>
                )}
                {mentor.experienceYears !== undefined && (
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-slate-400" />
                    <span>{mentor.experienceYears} Years Experience</span>
                  </div>
                )}
                {mentor.hourlyRate !== undefined && (
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <DollarSign size={16} />
                    <span>${mentor.hourlyRate} / hr</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  {
                    icon: <Mail size={18} />,
                    href: mentor.email ? `mailto:${mentor.email}` : null,
                  },
                  { icon: <Globe size={18} />, href: mentor.website },
                  { icon: <Linkedin size={18} />, href: mentor.linkedin },
                ].map(
                  (social, i) =>
                    social.href && (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                      >
                        {social.icon}
                      </a>
                    ),
                )}
              </div>

              {/* Admin Control: Email Visibility */}
              <div className="mt-4 flex items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${
                      currentEmailPublic
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {currentEmailPublic ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Public Email:{" "}
                      {currentEmailPublic ? (
                        <span className="text-emerald-700">Visible</span>
                      ) : (
                        <span className="text-slate-600">Hidden</span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {currentEmailPublic
                        ? "Email address is visible on the public website profile."
                        : "Email address is kept private and hidden from public visitors."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleEmailVisibility}
                  disabled={isTogglingEmail}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition shrink-0 cursor-pointer ${
                    currentEmailPublic
                      ? "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                      : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {isTogglingEmail
                    ? "Updating..."
                    : currentEmailPublic
                      ? "Hide Email"
                      : "Make Public"}
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="md:col-span-2 space-y-12">
              <section>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  Professional Bio
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {mentor.about || "No additional details provided."}
                </p>
              </section>

              {mentor.experience && mentor.experience.length > 0 && (
                <section>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
                    Work History
                  </h3>
                  <div className="space-y-8">
                    {mentor.experience.map((exp) => (
                      <div
                        key={exp._id}
                        className="relative pl-6 border-l border-slate-200"
                      >
                        <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-slate-300" />
                        <h4 className="font-bold text-slate-900">
                          {exp.title}
                        </h4>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed italic">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {mentor.support && mentor.support.length > 0 && (
                <section>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Support Areas
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {mentor.support.map((sup) => (
                      <div
                        key={sup._id}
                        className="rounded-xl border border-slate-100 bg-slate-50/50 p-5"
                      >
                        <h4 className="font-bold text-slate-800 text-sm">
                          {sup.title}
                        </h4>
                        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                          {sup.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Details */}
            <div className="space-y-10">
              {mentor.skills && mentor.skills.length > 0 && (
                <section>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Core Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {mentor.languages && mentor.languages.length > 0 && (
                <section>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                    Languages
                  </h3>
                  <p className="text-sm font-semibold text-slate-700">
                    {mentor.languages.join(", ")}
                  </p>
                </section>
              )}

              {(mentor.motivation || mentor.goal) && (
                <div className="rounded-xl bg-slate-900 p-8 text-white">
                  {mentor.motivation && (
                    <div className="mb-8">
                      <h4 className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mb-3">
                        Philosophy
                      </h4>
                      <p className="text-base font-medium leading-relaxed italic text-slate-200">
                        &quot;{mentor.motivation}&quot;
                      </p>
                    </div>
                  )}
                  {mentor.goal && (
                    <div>
                      <h4 className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mb-3">
                        Career Goal
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {mentor.goal}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            {!mentor.isApproved && onApproveClick && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onApproveClick(mentor);
                }}
                className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition cursor-pointer flex items-center gap-2"
              >
                <Check size={16} />
                Approve Application
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-8 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
