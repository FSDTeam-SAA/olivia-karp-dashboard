import {
  BarChart,
  BookOpen,
  Clock,
  Film,
  Lock,
  PlayCircle,
  Unlock,
  X,
} from "lucide-react";
import { Course } from "../types/courses.types";

interface ViewCourseModalProps {
  course: Course;
  onClose: () => void;
}

export function ViewCourseModal({ course, onClose }: ViewCourseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#001014]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[16px] bg-white p-6 md:p-8 shadow-2xl z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f4f4] text-[#5b6e70] hover:bg-[#e0e6e6] cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center border-b border-[#e6ebeb] pb-8">
          {/* Course Image */}
          <div className="h-24 w-24 md:h-28 md:w-28 shrink-0 rounded-[16px] overflow-hidden shadow-sm">
            {course?.image?.url ? (
              <img
                src={course.image.url}
                alt={course.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#004f52] to-[#0a7a7d] text-white">
                <BookOpen className="h-10 w-10 opacity-90" />
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-[#1a2326] md:text-3xl">
                {course?.title}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                  course?.isLocked
                    ? "bg-[#fff2e8] text-[#d58a53]"
                    : "bg-[#cdeed9] text-[#0d6b42]"
                }`}
              >
                {course?.isLocked ? "Locked" : "Published"}
              </span>
            </div>

            {/* Category + Availability */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#5b6e70]">
              <span className="px-3 py-1 bg-[#eef3f3] rounded-full">
                {course?.category}
              </span>

              <span
                className={`px-3 py-1 rounded-full ${
                  course?.isAvailable
                    ? "bg-[#cdeed9] text-[#0d6b42]"
                    : "bg-[#ffe5e5] text-[#c0392b]"
                }`}
              >
                {course?.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-5 text-[14px] text-[#7a99b8]">
              <div className="flex items-center gap-1.5">
                <PlayCircle className="h-4 w-4 text-[#8db3b5]" />
                <span>{course?.lessonCount || 0} Lessons</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#8db3b5]" />
                <span>{course?.totalDuration || "0 min"}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <BarChart className="h-4 w-4 text-[#8db3b5]" />
                <span>{course?.totalEnrolled || 0} Enrolled</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-lg font-semibold text-[#1a2326]">
              {course?.price === 0
                ? "Free"
                : `${course?.currency} ${course?.price}`}
            </div>

            {/* Created Date */}
            <div className="text-sm text-[#7a99b8]">
              Created:{" "}
              {course?.createdAt
                ? new Date(course.createdAt).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="mt-8">
          <h3 className="mb-5 text-lg font-semibold text-[#2c3135]">
            Curriculum Details
          </h3>

          <div className="space-y-4">
            {course?.lessons && course.lessons.length > 0 ? (
              course.lessons.map((lesson, idx) => (
                <div
                  key={lesson._id || idx}
                  className="rounded-xl bg-[#f8fbfb] p-5 border border-[#eef3f3] shadow-sm flex flex-col md:flex-row gap-4 justify-between md:items-center"
                >
                  {/* Left */}
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-[#e6f2f2] text-[#004f52] flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold">L</span>
                      <span className="font-bold text-[14px]">{idx + 1}</span>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#1a2326]">
                        {lesson.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#7a99b8] mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{lesson.duration} mins</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <BarChart className="h-3.5 w-3.5" />
                          <span className="capitalize">{lesson.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-3 md:pl-14">
                    <a
                      href={lesson.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[13px] font-medium text-[#004f52] border border-[#d6dddd] hover:bg-[#f0f4f4]"
                    >
                      <Film className="h-4 w-4" /> Watch
                    </a>

                    {lesson.isLocked ? (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff2e8] text-[#d58a53]">
                        <Lock className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#cdeed9] text-[#0d6b42]">
                        <Unlock className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-[#d6dddd] p-8 text-center text-[#7a99b8]">
                No lessons available for this course.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-[#e6ebeb] pt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-[8px] px-6 py-2.5 text-[14px] font-semibold text-[#5b6e70] bg-[#f0f4f4] hover:bg-[#e6ebeb]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
