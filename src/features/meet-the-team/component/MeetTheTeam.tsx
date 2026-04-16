"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { useTeamMembers } from "../hooks/useMeetTheTeam";
import { Meta, SocialLink, TeamMember } from "../types/meetTheTeam.types";
import { TeamFormModal } from "./TeamFormModal";
import { DeleteTeamModal } from "./DeleteTeamModal";

function renderSocialIcon(platform?: string) {
  const key = (platform || "").toLowerCase();
  const className = "h-4 w-4";
  if (key.includes("insta")) return <FaInstagram className={className} />;
  if (key.includes("linkedin") || key === "in")
    return <FaLinkedinIn className={className} />;
  if (key.includes("twitter") || key === "x")
    return <FaTwitter className={className} />;
  if (key.includes("facebook") || key === "fb")
    return <FaFacebookF className={className} />;
  if (key.includes("youtube")) return <FaYoutube className={className} />;
  return <Globe className={className} />;
}

function SocialButton({ link }: { link: SocialLink }) {
  if (!link.url) return null;
  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf4f4] text-[#004f52] transition hover:bg-[#d4ecec]"
      aria-label={link.platform || "Social link"}
    >
      {renderSocialIcon(link.platform)}
    </Link>
  );
}

function TeamCard({
  item,
  onEdit,
  onDelete,
}: {
  item: TeamMember;
  onEdit: (m: TeamMember) => void;
  onDelete: (m: TeamMember) => void;
}) {
  return (
    <div className="relative flex flex-col items-center rounded-[18px] bg-white px-6 py-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="absolute right-4 top-4 flex items-center gap-1">
        <button
          onClick={() => onEdit(item)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf4f4] text-[#004f52] hover:bg-[#d4ecec] cursor-pointer"
          aria-label="Edit"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onDelete(item)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 cursor-pointer"
          aria-label="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full bg-[#eef3f4]">
        <Image
          src={item.profilePicture?.url || "/images/profile.png"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-5 text-[22px] font-bold leading-tight text-[#004f52]">
        {item.name}
      </h3>
      <p className="mt-1 text-[14px] font-semibold text-[#6b8a8c]">
        {item.designation}
      </p>

      {item.description && (
        <p className="mt-4 max-w-[260px] text-[13px] leading-5 text-[#7b8a8c]">
          {item.description}
        </p>
      )}

      {item.socialLinks && item.socialLinks.length > 0 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          {item.socialLinks.map((link, index) => (
            <SocialButton key={link._id || index} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MeetTheTeam() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TeamMember | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);

  const {
    data: response,
    isLoading,
    isError,
  } = useTeamMembers({ page, limit });

  const members: TeamMember[] = response?.data || [];
  const meta: Meta = response?.meta || {
    page: 1,
    limit,
    total: 0,
    totalPage: 0,
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#004f52] border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[#d9534f]">Failed to load team members.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-[1300px]">
        <div className="relative text-center">
          <h1 className="text-[36px] font-extrabold tracking-tight text-[#004f52] md:text-[44px]">
            Meet Our Team
          </h1>
          <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-6 text-[#6b8a8c]">
            Down below will have headshot and position of everyone on the Act on
            Climate team.
          </p>

          <div className="mt-6 flex items-center justify-center md:absolute md:right-0 md:top-2 md:mt-0">
            <button
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#004f52] px-5 py-2.5 text-[14px] font-semibold text-white shadow-md shadow-[#004f52]/20 transition hover:bg-[#003d40] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Team Member
            </button>
          </div>
        </div>

        {members.length === 0 ? (
          <div className="mt-12 flex items-center justify-center py-16">
            <p className="text-[14px] text-[#7b848a]">No team members found.</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {members.map((item) => (
              <TeamCard
                key={item._id}
                item={item}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}

        {meta.totalPage > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] border border-[#7f9da0] text-[#5b6e70] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button className="flex h-[34px] min-w-[34px] items-center justify-center rounded-[4px] bg-[#004f52] px-3 text-white">
              {page}
            </button>

            <button
              className="flex h-[34px] min-w-[34px] items-center justify-center rounded-[4px] border border-[#7f9da0] bg-white px-3 text-[#5b6e70] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= meta.totalPage}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {isAddOpen && (
        <TeamFormModal mode="add" onClose={() => setIsAddOpen(false)} />
      )}

      {editTarget && (
        <TeamFormModal
          mode="edit"
          member={editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <DeleteTeamModal
          member={deleteTarget}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </section>
  );
}
