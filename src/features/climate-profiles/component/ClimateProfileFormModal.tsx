/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateClimateProfile,
  useUpdateClimateProfile,
} from "../hooks/useClimateProfiles";
import type { ClimateProfile } from "../types/climateProfiles.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ClimateProfileFormModalProps {
  profile: ClimateProfile | null; // null for create, object for edit
  isOpen: boolean;
  onClose: () => void;
}

const STANDARD_INTERESTS = [
  "Climate Tech",
  "Energy",
  "Policy",
  "Finance",
  "Sustainability",
  "Climate Careers",
  "Biodiversity",
  "Sustainable Business",
];

const STANDARD_AREAS = [
  "Professional",
  "Entrepreneur",
  "Student",
  "Career Changer",
  "Educator",
  "Researcher",
  "Climate-curious",
];

export default function ClimateProfileFormModal({
  profile,
  isOpen,
  onClose,
}: ClimateProfileFormModalProps) {
  const isEdit = !!profile;
  const createMutation = useCreateClimateProfile();
  const updateMutation = useUpdateClimateProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [lookingForInput, setLookingForInput] = useState("");
  const [canHelpWithInput, setCanHelpWithInput] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  // Image handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setProfessionalTitle(profile.professionalTitle || "");
      setOrganization(profile.organization || "");
      setLocation(profile.location || "");
      setAbout(profile.about || "");
      setSkillsInput(profile.skills?.join(", ") || "");
      setSelectedInterests(profile.climateInterests || []);
      setSelectedAreas(profile.professionalAreas || []);
      setLookingForInput(profile.lookingFor?.join(", ") || "");
      setCanHelpWithInput(profile.canHelpWith?.join(", ") || "");
      setLinkedin(profile.linkedin || "");
      setWebsite(profile.website || "");
      setPortfolio(profile.portfolio || "");
      setIsVisible(profile.isVisible !== undefined ? profile.isVisible : true);
      setImagePreview(profile.profileImage || "");
      setImageFile(null);
    } else {
      setName("");
      setEmail("");
      setProfessionalTitle("");
      setOrganization("");
      setLocation("");
      setAbout("");
      setSkillsInput("");
      setSelectedInterests([]);
      setSelectedAreas([]);
      setLookingForInput("");
      setCanHelpWithInput("");
      setLinkedin("");
      setWebsite("");
      setPortfolio("");
      setIsVisible(true);
      setImagePreview("");
      setImageFile(null);
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest],
    );
  };

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area)
        ? prev.filter((item) => item !== area)
        : [...prev, area],
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Member Name is required");
      return;
    }

    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const lookingForArray = lookingForInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const canHelpWithArray = canHelpWithInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const formData = new FormData();
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    const jsonPayload: Record<string, unknown> = {
      name: name.trim(),
      email: email.trim() || undefined,
      professionalTitle: professionalTitle.trim() || undefined,
      organization: organization.trim() || undefined,
      location: location.trim() || undefined,
      about: about.trim() || undefined,
      climateInterests: selectedInterests,
      professionalAreas: selectedAreas,
      skills: skillsArray,
      lookingFor: lookingForArray,
      canHelpWith: canHelpWithArray,
      linkedin: linkedin.trim() || undefined,
      website: website.trim() || undefined,
      portfolio: portfolio.trim() || undefined,
      isVisible,
    };

    if (!imageFile && imagePreview) {
      jsonPayload.profileImage = imagePreview;
    }

    formData.append("data", JSON.stringify(jsonPayload));

    if (isEdit && profile) {
      updateMutation.mutate(
        { id: profile._id, data: formData },
        {
          onSuccess: () => onClose(),
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => onClose(),
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-150 text-left border border-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#181919]">
              {isEdit ? "Edit Member Profile" : "Add New Climate Profile"}
            </h2>
            <p className="text-xs text-gray-500">
              {isEdit
                ? "Update member profile details in the public directory."
                : "Create a member profile manually for the Meet Climate People directory."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Photo */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="file"
                  id="profile-image-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="profile-image-input"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" /> Choose Image
                </label>
                <p className="text-[11px] text-gray-400">
                  PNG, JPG or WebP (square recommended)
                </p>
              </div>
            </div>
          </div>

          {/* Basic Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. Dr. Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="e.g. jane@climate.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Professional Title
              </label>
              <Input
                placeholder="e.g. Senior Carbon Specialist"
                value={professionalTitle}
                onChange={(e) => setProfessionalTitle(e.target.value)}
                className="h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Organization / Company
              </label>
              <Input
                placeholder="e.g. GreenHorizon Ventures"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="h-10 text-xs"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Location
              </label>
              <Input
                placeholder="e.g. London, United Kingdom or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-10 text-xs"
              />
            </div>
          </div>

          {/* About / Bio */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">
              About / Bio
            </label>
            <Textarea
              placeholder="Short bio introducing the member's journey, passions, and background in sustainability..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              className="text-xs"
            />
          </div>

          {/* Climate Interests (Tag Chips) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Climate
              Interests
            </label>
            <div className="flex flex-wrap gap-1.5">
              {STANDARD_INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                      isSelected
                        ? "bg-[#004242] text-white border-[#004242]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {interest} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Professional Areas */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Professional Focus Areas (I am...)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {STANDARD_AREAS.map((area) => {
                const isSelected = selectedAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                      isSelected
                        ? "bg-teal-700 text-white border-teal-700"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {area} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills (Comma-separated) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Skills (comma-separated)
            </label>
            <Input
              placeholder="e.g. Carbon Accounting, LCA, ESG Reporting, Python, Circular Economy"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="h-10 text-xs"
            />
          </div>

          {/* Looking For & Can Help With */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-blue-700">
                Looking For (comma-separated)
              </label>
              <Input
                placeholder="e.g. Mentorship, Jobs, Networking, Collaborators"
                value={lookingForInput}
                onChange={(e) => setLookingForInput(e.target.value)}
                className="h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-purple-700">
                Can Help With (comma-separated)
              </label>
              <Input
                placeholder="e.g. Technology, Career Guidance, Marketing, Policy"
                value={canHelpWithInput}
                onChange={(e) => setCanHelpWithInput(e.target.value)}
                className="h-10 text-xs"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                LinkedIn Profile URL
              </label>
              <Input
                placeholder="https://linkedin.com/in/..."
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Personal Website
              </label>
              <Input
                placeholder="https://..."
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Portfolio URL
              </label>
              <Input
                placeholder="https://..."
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="h-10 text-xs"
              />
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs font-bold text-gray-800">
                Directory Visibility
              </div>
              <div className="text-[11px] text-gray-500">
                When enabled, this member is visible in the public Meet Climate
                People directory.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isVisible ? "bg-emerald-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isVisible ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="border-slate-300 text-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#004242] hover:bg-[#003333] text-white"
            >
              {isPending
                ? "Saving..."
                : isEdit
                  ? "Update Profile"
                  : "Create Member Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
