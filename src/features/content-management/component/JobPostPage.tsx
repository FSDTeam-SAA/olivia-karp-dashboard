"use client";

import { useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useJobs, useDeleteJob } from "../hooks/useJobs";
import { Job, Meta } from "../types/content.types";
import JobPostModal from "./JobPostModal";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import TableSkeleton from "./TableSkeleton";
import { toast } from "sonner";

export default function JobPostPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);

  const { data: response, isLoading, isError } = useJobs({ page, limit });
  const deleteMutation = useDeleteJob();

  const jobs: Job[] = response?.data || [];
  const meta: Meta = response?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  };

  const handleDelete = async () => {
    if (!deletingJobId) return;
    try {
      await deleteMutation.mutateAsync(deletingJobId);
      toast.success("Job deleted successfully");
      setDeletingJobId(null);
    } catch {
      toast.error("Failed to delete job");
    }
  };

  if (isError) {
    return (
      <section className="min-h-screen bg-[#f6f8f8] p-4 md:p-6">
        <div className="mx-auto max-w-[1500px] rounded-[10px] border border-[#d8dfdf] bg-[#fbfcfc] p-4 md:p-5">
          <div className="flex items-center justify-center py-20">
            <p className="text-[#d9534f]">
              Failed to load jobs data. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f8f8] p-4 md:p-6">
      <div className="mx-auto max-w-[1500px] rounded-[10px] border border-[#d8dfdf] bg-[#fbfcfc] p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-[20px] font-semibold text-[#2c3135] md:text-[22px]">
              Job Posts
            </h1>
            <div className="mt-2 flex items-center gap-2 text-[13px] text-[#7b848a]">
              <span>Dashboard</span>
              <span>&gt;</span>
              <span>Content Management</span>
              <span>&gt;</span>
              <span>Job Posts</span>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingJob(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#004f52] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[#003d40] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Job Post
          </button>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <TableSkeleton columns={6} />
          ) : (
            <div className="overflow-hidden rounded-[8px] border border-[#d8dfdf] bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#d8dfdf] bg-white">
                      <th className="px-4 py-4 text-left text-[14px] font-semibold text-[#252b2f]">
                        Title
                      </th>
                      <th className="px-4 py-4 text-center text-[14px] font-semibold text-[#252b2f]">
                        Category
                      </th>
                      <th className="px-4 py-4 text-center text-[14px] font-semibold text-[#252b2f]">
                        Company
                      </th>
                      <th className="px-4 py-4 text-center text-[14px] font-semibold text-[#252b2f]">
                        Job Type
                      </th>
                      <th className="px-4 py-4 text-center text-[14px] font-semibold text-[#252b2f]">
                        Status
                      </th>
                      <th className="px-4 py-4 text-center text-[14px] font-semibold text-[#252b2f]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, index) => (
                      <tr
                        key={job._id}
                        className={`border-b border-[#d8dfdf] transition hover:bg-[#f8fbfb] ${index === jobs.length - 1 ? "border-b-0" : ""}`}
                      >
                        <td className="px-4 py-4">
                          <div className="max-w-[250px] truncate font-medium text-[#2c3135] text-[15px]">
                            {job.title}
                          </div>
                          <span className="text-[12px] text-[#7a99b8] block mt-0.5">
                            {job.location}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex rounded-full px-3 py-1 text-[12px] font-medium bg-[#e8f4f5] text-[#004f52]">
                            {job.category}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center text-[14px] font-medium text-[#252b2f]">
                          {job.companyName}
                        </td>
                        <td className="px-4 py-4 text-center text-[14px] text-[#5f686d] capitalize">
                          {job.jobType}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${
                              job.status === "open"
                                ? "bg-[#cdeed9] text-[#0d6b42]"
                                : "bg-[#fde2e2] text-[#d9534f]"
                            }`}
                          >
                            {job.status === "open" ? "Open" : "Closed"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-5 text-[#004f52]">
                            <button
                              onClick={() => setViewingJob(job)}
                              className="transition hover:opacity-70 p-1 cursor-pointer"
                            >
                              <Eye className="h-4.5 w-4.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingJob(job);
                                setIsModalOpen(true);
                              }}
                              className="transition hover:opacity-70 p-1 cursor-pointer"
                            >
                              <Pencil className="h-4.5 w-4.5" />
                            </button>
                            <button
                              onClick={() => setDeletingJobId(job._id)}
                              className="transition hover:opacity-70 p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {jobs.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-12 text-center text-[#7a99b8]"
                        >
                          No job posts found. Create one to get started!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {jobs.length > 0 && (
                <div className="flex flex-col gap-4 bg-[#eef3f4] px-4 py-5 md:flex-row md:items-center md:justify-between md:px-8">
                  <p className="text-[14px] text-[#5f686d]">
                    Showing {(page - 1) * limit + 1} to{" "}
                    {Math.min(page * limit, meta.total)} of {meta.total} results
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] border border-[#7f9da0] text-[#5b6e70] disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button className="flex h-[34px] min-w-[34px] items-center justify-center rounded-[4px] bg-[#004f52] px-3 font-medium text-white shadow-sm">
                      {page}
                    </button>
                    {meta.totalPage > 1 && page < meta.totalPage && (
                      <>
                        <span className="text-[#5b6e70] text-sm">...</span>
                        <button
                          onClick={() => setPage(meta.totalPage)}
                          className="flex h-[34px] min-w-[34px] items-center justify-center rounded-[4px] border border-[#7f9da0] px-3 text-[#5b6e70] transition hover:bg-white"
                        >
                          {meta.totalPage}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(meta.totalPage || 1, p + 1))
                      }
                      disabled={page >= (meta.totalPage || 1)}
                      className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] border border-[#7f9da0] text-[#5b6e70] disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <JobPostModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        editData={editingJob}
      />

      <DeleteConfirmDialog
        open={!!deletingJobId}
        onClose={() => setDeletingJobId(null)}
        onConfirm={handleDelete}
        title="Delete Job Post"
        description="Are you sure you want to delete this job post? This action cannot be undone."
        isLoading={deleteMutation.isPending}
      />

      {/* View Job Details Dialog */}
      {viewingJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setViewingJob(null)}
        >
          <div
            className="bg-white rounded-xl max-w-[600px] w-full mx-4 max-h-[80vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#2c3135]">
                {viewingJob.title}
              </h2>
              <button
                onClick={() => setViewingJob(null)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-[#5f686d]">Category:</span>{" "}
                <span className="text-[#2c3135]">{viewingJob.category}</span>
              </div>
              <div>
                <span className="font-medium text-[#5f686d]">Company:</span>{" "}
                <span className="text-[#2c3135]">{viewingJob.companyName}</span>
              </div>
              <div>
                <span className="font-medium text-[#5f686d]">Location:</span>{" "}
                <span className="text-[#2c3135]">{viewingJob.location}</span>
              </div>
              <div>
                <span className="font-medium text-[#5f686d]">Job Type:</span>{" "}
                <span className="text-[#2c3135] capitalize">
                  {viewingJob.jobType}
                </span>
              </div>
              <div>
                <span className="font-medium text-[#5f686d]">Salary:</span>{" "}
                <span className="text-[#2c3135]">
                  {viewingJob.salary?.min} - {viewingJob.salary?.max}{" "}
                  {viewingJob.salary?.currency}/{viewingJob.salary?.period}
                </span>
              </div>
              <div>
                <span className="font-medium text-[#5f686d]">Deadline:</span>{" "}
                <span className="text-[#2c3135]">
                  {new Date(viewingJob.deathLine).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-[#5f686d]">Skills:</span>{" "}
                <span className="text-[#2c3135]">{viewingJob.skill}</span>
              </div>
              <div>
                <span className="font-medium text-[#5f686d] block mb-1">
                  Description:
                </span>
                <div
                  className="text-[#2c3135] prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: viewingJob.description }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
