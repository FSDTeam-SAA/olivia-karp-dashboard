"use client";

import React, { useState } from "react";
import {
  Search,
  Eye,
  Building2,
  ShieldCheck,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import {
  useEducationPartners,
  useUpdatePartnerStatus,
} from "../hooks/useEducationPartners";
import type { EducationPartner } from "../types/education-partner.types";
import EducationPartnerDetailsModal from "./EducationPartnerDetailsModal";
import TableSkeleton from "@/features/content-management/component/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EducationPartnersManagement() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("all");
  const [isVerified, setIsVerified] = useState("all");

  const [selectedPartner, setSelectedPartner] =
    useState<EducationPartner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useEducationPartners({
    page,
    limit,
    search,
    membershipStatus,
    isVerified,
  });

  const updateStatusMutation = useUpdatePartnerStatus();

  const partners: EducationPartner[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setSearch("");
    setMembershipStatus("all");
    setIsVerified("all");
    setPage(1);
  };

  const handleViewPartner = (partner: EducationPartner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleToggleApproval = async (partner: EducationPartner) => {
    const newApprovalState = !partner.isVerifiedPartner;
    try {
      await updateStatusMutation.mutateAsync({
        id: partner._id,
        isVerifiedPartner: newApprovalState,
      });
      toast.success(
        `Partner "${partner.organizationName}" ${
          newApprovalState ? "Approved & Verified" : "Approval Revoked"
        } successfully!`,
      );
      if (selectedPartner && selectedPartner._id === partner._id) {
        setSelectedPartner({
          ...selectedPartner,
          isVerifiedPartner: newApprovalState,
        });
      }
    } catch (err: unknown) {
      const errorResponse = err as {
        response?: { data?: { message?: string } };
      };
      toast.error(
        errorResponse?.response?.data?.message ||
          "Failed to update partner approval status",
      );
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="space-y-6 text-left">
      {/* Page Title & Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-[#181919]">
          Education Partners
        </h1>
        <p className="text-sm text-[#6c6c6c]">
          Dashboard &gt; Education Partners
        </p>
      </div>

      {/* Filtering & Search Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#d8dfdf] space-y-4">
        <form
          onSubmit={handleSearchSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-3"
        >
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search partner, email, or website..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 h-10 border-[#d8dfdf] text-xs rounded-lg"
            />
          </div>

          {/* Membership Status Filter */}
          <div className="md:col-span-3">
            <Select
              value={membershipStatus}
              onValueChange={(val) => {
                setMembershipStatus(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-10 border-[#d8dfdf] text-xs rounded-lg">
                <SelectValue placeholder="Filter by Membership" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Membership Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending_payment">Pending Payment</SelectItem>
                <SelectItem value="past_due">Past Due</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Approval / Verification Filter */}
          <div className="md:col-span-3">
            <Select
              value={isVerified}
              onValueChange={(val) => {
                setIsVerified(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-10 border-[#d8dfdf] text-xs rounded-lg">
                <SelectValue placeholder="Filter by Approval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Approval Statuses</SelectItem>
                <SelectItem value="true">Approved / Verified (true)</SelectItem>
                <SelectItem value="false">Pending Approval (false)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex items-center gap-2">
            <Button
              type="submit"
              className="bg-[#053535] hover:bg-[#042a2a] text-white h-10 px-4 text-xs font-semibold rounded-lg flex-1"
            >
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleResetFilters}
              title="Reset Filters"
              className="h-10 w-10 p-0 border-[#d8dfdf] rounded-lg text-gray-500 hover:text-gray-700"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Main Table */}
      {isLoading ? (
        <TableSkeleton columns={7} rows={8} />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#d8dfdf] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#d8dfdf] text-xs font-semibold text-[#053535]">
                  <th className="px-4 py-3.5">Organization</th>
                  <th className="px-4 py-3.5">User Details</th>
                  <th className="px-4 py-3.5">Contact Email & Site</th>
                  <th className="px-4 py-3.5">Membership</th>
                  <th className="px-4 py-3.5">Admin Approval</th>
                  <th className="px-4 py-3.5">Courses</th>
                  <th className="px-4 py-3.5">Registered</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8dfdf] text-xs text-[#181919]">
                {partners.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Building2 className="w-10 h-10 text-gray-300" />
                        <p className="font-semibold text-sm">
                          No Education Partners found
                        </p>
                        <p className="text-xs text-gray-400">
                          Try adjusting your search query or status filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  partners.map((partner) => (
                    <tr
                      key={partner._id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      {/* Organization Column */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#053535]/10 text-[#053535] flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {partner.logo?.url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={partner.logo.url}
                                alt={partner.organizationName}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Building2 className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-[#053535] block leading-tight">
                              {partner.organizationName}
                            </span>
                            <span className="text-[11px] text-gray-500 capitalize">
                              {partner.organizationType.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* User Details */}
                      <td className="px-4 py-3.5">
                        {partner.userId ? (
                          <div>
                            <span className="font-semibold text-gray-800 block">
                              {partner.userId.firstName}{" "}
                              {partner.userId.lastName}
                            </span>
                            <span className="text-[11px] text-gray-500 block">
                              {partner.userId.email}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">
                            No User Linked
                          </span>
                        )}
                      </td>

                      {/* Contact Info */}
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5">
                          <span className="text-gray-700 block font-medium">
                            {partner.contactEmail}
                          </span>
                          {partner.website && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noreferrer"
                              className="text-teal-700 hover:underline text-[11px] inline-flex items-center gap-1 font-semibold"
                            >
                              Website <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Membership Status Badge */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold capitalize border ${
                            partner.membershipStatus === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : partner.membershipStatus === "pending_payment"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {partner.membershipStatus.replace("_", " ")}
                        </span>
                      </td>

                      {/* Admin Approval Status */}
                      <td className="px-4 py-3.5">
                        {partner.isVerifiedPartner ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />{" "}
                            Pending Approval
                          </span>
                        )}
                      </td>

                      {/* Courses Count */}
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-gray-700">
                          {partner.approvedCoursesCount || 0} /{" "}
                          {partner.totalCoursesCount || 0}
                        </span>
                        <span className="text-[10px] text-gray-400 block">
                          Appr. / Total
                        </span>
                      </td>

                      {/* Date Registered */}
                      <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                        {new Date(partner.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Approve Toggle Button */}
                          <Button
                            size="sm"
                            disabled={updateStatusMutation.isPending}
                            onClick={() => handleToggleApproval(partner)}
                            title={
                              partner.isVerifiedPartner
                                ? "Revoke Approval"
                                : "Approve Partner"
                            }
                            className={`h-8 px-2.5 text-[11px] font-bold rounded-lg border ${
                              partner.isVerifiedPartner
                                ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300"
                                : "bg-emerald-700 hover:bg-emerald-800 text-white border-transparent"
                            }`}
                          >
                            {partner.isVerifiedPartner ? "Revoke" : "Approve"}
                          </Button>

                          {/* View Details Button */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewPartner(partner)}
                            title="View Full Profile"
                            className="h-8 w-8 p-0 border-[#d8dfdf] text-gray-600 hover:text-[#053535] rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {meta && (
            <div className="px-4 py-3 border-t border-[#d8dfdf] bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-gray-500">
                Showing{" "}
                <span className="font-bold text-gray-700">
                  {partners.length > 0 ? (page - 1) * limit + 1 : 0}
                </span>{" "}
                to{" "}
                <span className="font-bold text-gray-700">
                  {Math.min(page * limit, meta.total)}
                </span>{" "}
                of <span className="font-bold text-gray-700">{meta.total}</span>{" "}
                partners
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="h-8 w-8 p-0 border-[#d8dfdf] rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {getPageNumbers().map((p, idx) =>
                  typeof p === "number" ? (
                    <Button
                      key={idx}
                      size="sm"
                      onClick={() => setPage(p)}
                      className={`h-8 w-8 p-0 rounded-lg text-xs font-semibold ${
                        page === p
                          ? "bg-[#053535] text-white"
                          : "bg-white text-gray-700 border border-[#d8dfdf] hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </Button>
                  ) : (
                    <span key={idx} className="px-1 text-gray-400">
                      ...
                    </span>
                  ),
                )}

                <Button
                  size="sm"
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="h-8 w-8 p-0 border-[#d8dfdf] rounded-lg"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Details Modal */}
      <EducationPartnerDetailsModal
        partner={selectedPartner}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPartner(null);
        }}
        onApproveToggle={handleToggleApproval}
        isUpdating={updateStatusMutation.isPending}
      />
    </div>
  );
}
