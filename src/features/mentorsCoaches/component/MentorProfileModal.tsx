import {
  X,
  MapPin,
  Briefcase,
  Languages,
  Globe,
  Linkedin,
  Mail,
  Phone,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { MentorCoach } from "../types/mentor.types";

interface MentorProfileModalProps {
  mentor: MentorCoach;
  onClose: () => void;
}

export function MentorProfileModal({
  mentor,
  onClose,
}: MentorProfileModalProps) {
  const fullName = `${mentor.firstName} ${mentor.lastName}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#001014]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[16px] bg-white p-6 shadow-2xl md:p-8 z-10 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f4f4] text-[#5b6e70] transition hover:bg-[#e0e6e6]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-6 md:flex-row md:items-start border-b border-[#e6ebeb] pb-8">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[16px] md:h-40 md:w-40 border-4 border-[#f0f4f4] shadow-sm">
            <Image
              src={mentor.image?.url || "/images/profile.png"}
              alt={fullName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-[#1a2326] md:text-3xl">
                {fullName}
              </h2>
              <span className="rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-bold text-[#6f8cff] uppercase tracking-wider">
                {mentor.type}
              </span>
              {mentor.isApproved && (
                <span className="rounded-full bg-[#e6f7ec]/80 px-3 py-1 text-[11px] font-bold text-[#1fa653] uppercase tracking-wider">
                  Approved
                </span>
              )}
            </div>
            <p className="text-lg text-[#4a5559] font-medium">
              {mentor.designation || mentor.bio}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-[14px] text-[#7a99b8] pt-2">
              {mentor.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#8db3b5]" />
                  <span>{mentor.address}</span>
                </div>
              )}
              {mentor.experienceYears !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-[#8db3b5]" />
                  <span>{mentor.experienceYears} Years Experience</span>
                </div>
              )}
              {mentor.hourlyRate !== undefined && (
                <div className="flex items-center gap-1.5 font-medium text-[#004f52]">
                  <DollarSign className="h-4 w-4" />
                  <span>${mentor.hourlyRate}/hour</span>
                </div>
              )}
            </div>

            {(mentor.email ||
              mentor.phone ||
              mentor.website ||
              mentor.linkedin) && (
              <div className="flex flex-wrap gap-2 pt-3">
                {mentor.email && (
                  <a
                    href={`mailto:${mentor.email}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f7f7] text-[#004f52] transition hover:bg-[#e0e8e8]"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
                {mentor.phone && (
                  <a
                    href={`tel:${mentor.phone}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f7f7] text-[#004f52] transition hover:bg-[#e0e8e8]"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                )}
                {mentor.website && (
                  <a
                    href={mentor.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f7f7] text-[#004f52] transition hover:bg-[#e0e8e8]"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
                {mentor.linkedin && (
                  <a
                    href={mentor.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f7f7] text-[#004f52] transition hover:bg-[#e0e8e8]"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-10">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#2c3135] flex items-center gap-2">
                About
              </h3>
              <p className="text-[15px] text-[#5b6e70] leading-relaxed">
                {mentor.about || "No additional details provided."}
              </p>
            </div>

            {mentor.experience && mentor.experience.length > 0 && (
              <div>
                <h3 className="mb-5 text-lg font-semibold text-[#2c3135] flex items-center gap-2">
                  Experience
                </h3>
                <div className="space-y-5">
                  {mentor.experience.map((exp) => (
                    <div
                      key={exp._id}
                      className="relative border-l-2 border-[#004f52]/20 pl-5 before:absolute before:left-[-5px] before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[#004f52]"
                    >
                      <h4 className="font-semibold text-[#1a2326]">
                        {exp.title}
                      </h4>
                      <p className="mt-1.5 text-[14px] text-[#7a99b8] leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mentor.support && mentor.support.length > 0 && (
              <div>
                <h3 className="mb-5 text-lg font-semibold text-[#2c3135]">
                  Support Provided
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {mentor.support.map((sup) => (
                    <div
                      key={sup._id}
                      className="rounded-xl bg-[#f8fbfb] p-4 border border-[#eef3f3] shadow-sm shadow-[#0b6770]/5"
                    >
                      <h4 className="font-medium text-[#2c3135]">
                        {sup.title}
                      </h4>
                      <p className="mt-2 text-[13px] text-[#7a99b8] leading-relaxed">
                        {sup.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-10">
            {mentor.skills && mentor.skills.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-[#2c3135]">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-[#f0f4f4] px-4 py-1.5 text-[13px] font-medium text-[#4a5559] border border-[#e0e8e8]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {mentor.languages && mentor.languages.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-[#2c3135] flex items-center gap-2">
                  <Languages className="h-5 w-5 text-[#8db3b5]" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.languages.map((lang, i) => (
                    <span
                      key={i}
                      className="text-[14px] text-[#5b6e70] font-medium"
                    >
                      {lang}
                      {i < mentor.languages!.length - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(mentor.motivation || mentor.goal) && (
              <div className="rounded-[16px] bg-[#004f52] p-6 text-white shadow-lg shadow-[#004f52]/20 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>

                {mentor.motivation && (
                  <div className="mb-6 relative z-10">
                    <h4 className="text-[11px] text-[#80c8cc] uppercase font-bold tracking-widest mb-3">
                      Motivation
                    </h4>
                    <p className="text-[15px] font-medium leading-relaxed italic text-white/90">
                      &quot;{mentor.motivation}&quot;
                    </p>
                  </div>
                )}
                {mentor.goal && (
                  <div className="relative z-10">
                    <h4 className="text-[11px] text-[#80c8cc] uppercase font-bold tracking-widest mb-3">
                      Goal
                    </h4>
                    <p className="text-[14px] leading-relaxed text-white/80">
                      {mentor.goal}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-[#e6ebeb] pt-6 flex justify-end gap-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="rounded-[8px] px-6 py-2.5 text-[14px] font-semibold text-[#5b6e70] transition cursor-pointer bg-[#f0f4f4]"
          >
            Close
          </button>
          {/* {mentor.bookingLink ? (
                        <a href={mentor.bookingLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-[8px] bg-[#004f52] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#003d40] shadow-md shadow-[#004f52]/20">
                            Book Session
                        </a>
                    ) : (
                        <button className="inline-flex items-center justify-center rounded-[8px] bg-[#004f52]/50 cursor-not-allowed px-8 py-2.5 text-[14px] font-semibold text-white shadow-md shadow-[#004f52]/20">
                            Not Available
                        </button>
                    )} */}
        </div>
      </div>
    </div>
  );
}
