"use client";

import React from "react";
import {
  X,
  ExternalLink,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Eye,
  EyeOff,
  Sparkles,
  Link2,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import type { ClimateProfile } from "../types/climateProfiles.types";
import { Button } from "@/components/ui/button";

interface ClimateProfileDetailsModalProps {
  profile: ClimateProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleVisibility?: (profile: ClimateProfile) => void;
  isTogglingVisibility?: boolean;
}

export default function ClimateProfileDetailsModal({
  profile,
  isOpen,
  onClose,
  onToggleVisibility,
  isTogglingVisibility = false,
}: ClimateProfileDetailsModalProps) {
  if (!isOpen || !profile) return null;

  const publicUrl = `https://actonclimate.co/meet-climate-people/${profile._id}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 md:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-150 text-left border border-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#004242] text-white flex items-center justify-center font-bold text-xl shadow-md overflow-hidden shrink-0">
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

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl md:text-2xl font-bold text-[#181919]">
                  {profile.name}
                </h2>
                {profile.isVisible ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{" "}
                    Visible in Directory
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                    <EyeOff className="w-3.5 h-3.5 text-amber-600" /> Hidden
                  </span>
                )}
                {profile.mightyMemberId && (
                  <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-purple-200">
                    Mighty Networks #{profile.mightyMemberId}
                  </span>
                )}
              </div>

              {(profile.professionalTitle || profile.organization) && (
                <p className="text-sm text-[#004242] font-semibold flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 shrink-0 text-[#008080]" />
                  <span>
                    {profile.professionalTitle}
                    {profile.professionalTitle &&
                      profile.organization &&
                      " at "}
                    {profile.organization}
                  </span>
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-500 pt-0.5 flex-wrap">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {profile.location}
                  </span>
                )}
                {profile.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    {profile.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#004242] hover:text-[#002f2f] hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Directory Card
            </a>
          </div>

          {onToggleVisibility && (
            <Button
              type="button"
              size="sm"
              variant={profile.isVisible ? "outline" : "default"}
              disabled={isTogglingVisibility}
              onClick={() => onToggleVisibility(profile)}
              className={
                profile.isVisible
                  ? "border-amber-300 text-amber-800 hover:bg-amber-50 h-8 text-xs font-semibold"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white h-8 text-xs font-semibold"
              }
            >
              {profile.isVisible ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 mr-1.5" />
                  Hide from Directory
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Make Visible
                </>
              )}
            </Button>
          )}
        </div>

        {/* About / Bio */}
        {profile.about && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              About &amp; Bio
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed bg-[#f8fbfa] p-4 rounded-xl border border-[#e2ecea]">
              {profile.about}
            </p>
          </div>
        )}

        {/* Categories & Interests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.climateInterests && profile.climateInterests.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Climate
                Interests
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.climateInterests.map((interest, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.professionalAreas &&
            profile.professionalAreas.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-teal-600" /> Professional
                  Focus Areas
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {profile.professionalAreas.map((area, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 text-xs font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Skills & Expertise */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Key Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-md bg-slate-100 text-slate-800 px-2.5 py-1 text-xs font-medium border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Networking tags: Looking For & Can Help With */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {profile.lookingFor && profile.lookingFor.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Looking For
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.lookingFor.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.canHelpWith && profile.canHelpWith.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">
                Can Help With
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.canHelpWith.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          {profile.experience && profile.experience.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-gray-400" /> Experience
              </h4>
              <div className="space-y-2">
                {profile.experience.map((exp, i) => {
                  if (typeof exp === "string") {
                    return (
                      <div
                        key={i}
                        className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-gray-700"
                      >
                        {exp}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200"
                    >
                      <div className="font-semibold text-gray-800">
                        {exp.title || "Role"}
                      </div>
                      <div className="text-gray-500">
                        {exp.company} {exp.duration && `• ${exp.duration}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {profile.education && profile.education.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-gray-400" />{" "}
                Education
              </h4>
              <div className="space-y-2">
                {profile.education.map((edu, i) => {
                  if (typeof edu === "string") {
                    return (
                      <div
                        key={i}
                        className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-gray-700"
                      >
                        {edu}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200"
                    >
                      <div className="font-semibold text-gray-800">
                        {edu.degree || "Degree"}
                      </div>
                      <div className="text-gray-500">
                        {edu.school} {edu.year && `• ${edu.year}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Social Links & Web */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
          <span className="text-xs font-semibold text-gray-500">Links:</span>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#0077b5] font-semibold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              <FaLinkedinIn className="w-3.5 h-3.5" /> LinkedIn
            </a>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> Website
            </a>
          )}
          {profile.portfolio && (
            <a
              href={profile.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Link2 className="w-3.5 h-3.5" /> Portfolio
            </a>
          )}
          {!profile.linkedin && !profile.website && !profile.portfolio && (
            <span className="text-xs text-gray-400 italic">
              No external links provided
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-slate-300 text-slate-700"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
