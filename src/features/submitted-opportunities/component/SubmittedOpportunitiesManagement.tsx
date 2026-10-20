"use client";

import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  type SubmittedOpportunityStatus,
  type SubmittedOpportunity,
} from "../api/submittedOpportunity.api";
import {
  useSubmittedOpportunities,
  useUpdateSubmittedOpportunityStatus,
} from "../hooks/useSubmittedOpportunities";

const FILTERS: Array<{ label: string; value?: SubmittedOpportunityStatus }> = [
  { label: "All" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "reviewed" },
  { label: "Rejected", value: "rejected" },
];

const statusStyles: Record<SubmittedOpportunityStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  reviewed: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-100 text-rose-800",
};

const statusLabel: Record<SubmittedOpportunityStatus, string> = {
  pending: "Pending",
  reviewed: "Approved",
  rejected: "Rejected",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function SubmittedOpportunitiesManagement() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<
    SubmittedOpportunityStatus | undefined
  >();
  const { data, isLoading, isError } = useSubmittedOpportunities({
    page,
    limit: 10,
    ...(status ? { status } : {}),
  });
  const updateStatus = useUpdateSubmittedOpportunityStatus();
  const opportunities = data?.data ?? [];
  const meta = data?.meta;

  const changeStatus = async (
    opportunity: SubmittedOpportunity,
    nextStatus: SubmittedOpportunityStatus,
  ) => {
    try {
      await updateStatus.mutateAsync({
        id: opportunity._id,
        status: nextStatus,
      });
      toast.success(
        nextStatus === "reviewed"
          ? "Opportunity approved and published"
          : "Opportunity rejected",
      );
    } catch {
      toast.error("Could not update the opportunity status");
    }
  };

  const selectFilter = (nextStatus?: SubmittedOpportunityStatus) => {
    setStatus(nextStatus);
    setPage(1);
  };

  return (
    <section className="min-h-screen bg-[#f8fbfb] p-6">
      <div className="rounded-lg border border-[#cecece] bg-white p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#181919]">
              Submitted Opportunities
            </h1>
            <p className="mt-2 text-sm text-[#6c6c6c]">
              Approve submissions to publish them on the public opportunities
              page.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.label}
                onClick={() => selectFilter(filter.value)}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition ${
                  status === filter.value
                    ? "bg-[#004242] font-semibold text-white"
                    : "bg-[#eef4f5] text-[#004242]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-[980px] w-full border-collapse">
            <thead>
              <tr className="border border-[#e4e4e4] bg-[#f8fbfb]">
                {[
                  "Opportunity",
                  "Organisation",
                  "Source",
                  "Type",
                  "Location",
                  "Submitted",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-4 text-left text-sm font-bold text-black"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-slate-500"
                  >
                    Loading submissions…
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-rose-600"
                  >
                    Failed to load submitted opportunities.
                  </td>
                </tr>
              ) : opportunities.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-slate-500"
                  >
                    No submissions found.
                  </td>
                </tr>
              ) : (
                opportunities.map((opportunity) => (
                  <tr
                    key={opportunity._id}
                    className="border border-[#e4e4e4] bg-white"
                  >
                    <td className="max-w-56 px-4 py-4">
                      <p className="truncate font-medium text-[#181919]">
                        {opportunity.title}
                      </p>
                      <a
                        href={opportunity.officialLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs text-[#004242] hover:underline"
                      >
                        View source <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#444]">
                      {opportunity.organizationName}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#444]">
                      {opportunity.isPartnerOpportunity
                        ? opportunity.partnerId?.organizationName ||
                          "Education Partner"
                        : "Public submission"}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#444]">
                      {opportunity.opportunityType}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#444]">
                      {opportunity.location}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#444]">
                      {formatDate(opportunity.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[opportunity.status]}`}
                      >
                        {statusLabel[opportunity.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        {opportunity.status !== "reviewed" && (
                          <button
                            disabled={updateStatus.isPending}
                            onClick={() =>
                              changeStatus(opportunity, "reviewed")
                            }
                            className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                          >
                            <Check className="h-3.5 w-3.5" /> Approve
                          </button>
                        )}
                        {opportunity.status !== "rejected" && (
                          <button
                            disabled={updateStatus.isPending}
                            onClick={() =>
                              changeStatus(opportunity, "rejected")
                            }
                            className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-3 py-2 text-xs font-medium text-white hover:bg-rose-700 disabled:opacity-50"
                          >
                            <X className="h-3.5 w-3.5" /> Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {meta && meta.totalPage > 1 && (
          <div className="mt-6 flex items-center justify-end gap-3 text-sm text-slate-600">
            <span>
              Page {meta.page} of {meta.totalPage}
            </span>
            <button
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-md border p-2 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              disabled={page === meta.totalPage}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-md border p-2 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
