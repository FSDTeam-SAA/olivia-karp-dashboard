"use client";

import React from "react";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  User,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";
import type { EducationPartner } from "../types/education-partner.types";
import { Button } from "@/components/ui/button";

interface EducationPartnerDetailsModalProps {
  partner: EducationPartner | null;
  isOpen: boolean;
  onClose: () => void;
  onApproveToggle?: (partner: EducationPartner) => void;
  isUpdating?: boolean;
}

export default function EducationPartnerDetailsModal({
  partner,
  isOpen,
  onClose,
  onApproveToggle,
  isUpdating = false,
}: EducationPartnerDetailsModalProps) {
  if (!isOpen || !partner) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-150 text-left border border-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#053535] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {partner.logo?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={partner.logo.url}
                  alt={partner.organizationName}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Building2 className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#181919]">
                  {partner.organizationName}
                </h2>
                {partner.isVerifiedPartner ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                    Approved
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                    Pending Approval
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 capitalize mt-0.5">
                Type: {partner.organizationType.replace("_", " ")}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f8fafc] p-4 rounded-xl border border-gray-200/80">
          <div>
            <span className="text-[11px] font-medium text-gray-500 block uppercase tracking-wider">
              Membership
            </span>
            <span
              className={`text-xs font-bold uppercase ${
                partner.membershipStatus === "active"
                  ? "text-emerald-600"
                  : "text-amber-600"
              }`}
            >
              {partner.membershipStatus}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-500 block uppercase tracking-wider">
              Annual Fee
            </span>
            <span className="text-xs font-bold text-gray-800">
              ${partner.membershipFee || 50}/yr
            </span>
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-500 block uppercase tracking-wider">
              Total Courses
            </span>
            <span className="text-xs font-bold text-gray-800">
              {partner.totalCoursesCount || 0}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-500 block uppercase tracking-wider">
              Approved Courses
            </span>
            <span className="text-xs font-bold text-emerald-700">
              {partner.approvedCoursesCount || 0}
            </span>
          </div>
        </div>

        {/* Tagline & Bio */}
        {partner.tagline && (
          <div>
            <h4 className="text-xs font-bold text-[#053535] uppercase tracking-wider mb-1">
              Tagline
            </h4>
            <p className="text-xs text-gray-700 italic bg-teal-50/50 p-2.5 rounded-lg border border-teal-100">
              &quot;{partner.tagline}&quot;
            </p>
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold text-[#053535] uppercase tracking-wider mb-1">
            Bio / Description
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200/60">
            {partner.bio}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#053535] uppercase tracking-wider">
            Contact Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {partner.userId && (
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-gray-400" />
                <span>
                  <strong>User:</strong> {partner.userId.firstName}{" "}
                  {partner.userId.lastName} ({partner.userId.email})
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>
                <strong>Contact Email:</strong> {partner.contactEmail}
              </span>
            </div>
            {partner.contactPhone && (
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>
                  <strong>Phone:</strong> {partner.contactPhone}
                </span>
              </div>
            )}
            {partner.website && (
              <div className="flex items-center gap-2 text-gray-700">
                <Globe className="w-4 h-4 text-gray-400" />
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Visit Website <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Taxonomy Arrays */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          {partner.areasOfExpertise?.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Areas of Expertise
              </span>
              <div className="flex flex-wrap gap-1">
                {partner.areasOfExpertise.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-[#E6F4F1] text-[#053535] text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-[#BBE3DC]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {partner.targetAudience?.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Target Audience
              </span>
              <div className="flex flex-wrap gap-1">
                {partner.targetAudience.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {partner.educationalOfferings?.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Educational Offerings
              </span>
              <div className="flex flex-wrap gap-1">
                {partner.educationalOfferings.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-800 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-blue-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {partner.instructorNames?.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Instructors / Faculty
              </span>
              <div className="flex flex-wrap gap-1">
                {partner.instructorNames.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-50 text-purple-800 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-purple-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-[11px] text-gray-400">
            Registered: {new Date(partner.createdAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-2">
            {onApproveToggle && (
              <Button
                disabled={isUpdating}
                onClick={() => onApproveToggle(partner)}
                className={`text-xs font-semibold h-9 px-4 rounded-xl ${
                  partner.isVerifiedPartner
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "bg-emerald-700 hover:bg-emerald-800 text-white"
                }`}
              >
                {partner.isVerifiedPartner
                  ? "Revoke Approval"
                  : "Approve Partner"}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className="text-xs h-9 border-gray-200 rounded-xl"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
