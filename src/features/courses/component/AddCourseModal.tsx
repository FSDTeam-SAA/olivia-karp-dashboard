import { useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { X, Plus, Trash2, UploadCloud, Info } from "lucide-react";
import { useCreateCourse } from "../hooks/useCourses";

interface AddCourseModalProps {
  onClose: () => void;
}

type FormValues = {
  title: string;
  lessons: {
    title: string;
    duration: string;
    level: string;
    videoUrl: string;
  }[];
};

export function AddCourseModal({ onClose }: AddCourseModalProps) {
  const { mutate: createCourseSubmit, isPending } = useCreateCourse();
  const [file, setFile] = useState<File | null>(null);

  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: "",
      lessons: [{ title: "", duration: "", level: "beginner", videoUrl: "" }],
    },
  });

  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({ control, name: "lessons" });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();

    if (data.title) {
      formData.append("title", data.title);
    }

    data.lessons.forEach((lesson, idx) => {
      if (lesson.title.trim()) {
        formData.append(`lessons[${idx}][title]`, lesson.title.trim());
        formData.append(
          `lessons[${idx}][duration]`,
          lesson.duration.trim() || "0",
        );
        formData.append(`lessons[${idx}][level]`, lesson.level || "beginner");
        formData.append(`lessons[${idx}][videoUrl]`, lesson.videoUrl.trim());
      }
    });

    if (file) {
      formData.append("image", file);
    }

    createCourseSubmit(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#001014]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[16px] bg-white p-6 shadow-2xl z-10 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f4f4] text-[#5b6e70] transition hover:bg-[#e0e6e6] z-20 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-8 border-b border-[#e6ebeb] pb-6">
          <h2 className="text-2xl font-bold text-[#1a2326]">Add New Course</h2>
          <p className="mt-2 text-sm text-[#7a99b8]">
            Create a new course and add its lessons sequentially below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#1a2326] mb-4">
                Course Information
              </h3>
              <label className="block mb-5">
                <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                  Course Title <span className="text-red-500">*</span>
                </span>
                <input
                  {...register("title", { required: true })}
                  className="w-full rounded-lg border border-[#d6dddd] px-4 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52]"
                  placeholder="e.g. Web Development Bootcamp"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                  Course Thumbnail
                </span>
                <div className="mt-1 flex justify-center rounded-lg border border-dashed border-[#8db3b5] px-6 py-8 hover:bg-[#f8fbfb] transition cursor-pointer relative bg-white overflow-hidden">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                  />
                  {file ? (
                    <div className="relative h-32 w-full max-w-[200px]">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        fill
                        className="object-cover rounded-md border border-[#d6dddd]"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition rounded-md flex items-center justify-center text-white text-sm font-medium">
                        Change Image
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <UploadCloud className="mx-auto h-10 w-10 text-[#004f52]" />
                      <div className="mt-4 flex text-sm leading-6 justify-center">
                        <div className="flex flex-col gap-1 items-center">
                          <span className="relative cursor-pointer rounded-md bg-transparent font-semibold text-[#004f52] focus-within:outline-none hover:text-[#003d40]">
                            Upload a thumbnail
                          </span>
                          <p className="text-[#7a99b8]">or drag and drop</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>

            <div className="rounded-xl bg-[#f0f4f4]/50 border border-[#e0e8e8] p-5 flex flex-col justify-center text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f2f2] text-[#004f52] mb-4">
                <Info className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-[#1a2326] mb-2 text-[15px]">
                Building your Curriculum
              </h4>
              <p className="text-sm text-[#7a99b8] leading-relaxed">
                A great course spans across multiple focused lessons. Start by
                adding an introduction video, followed by the core syllabus
                modules step-by-step. Keep lessons concise and specific.
              </p>
            </div>
          </div>

          <div className="border-t border-[#e6ebeb] pt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1a2326]">
                Course Curriculum (Lessons)
              </h3>
              <button
                type="button"
                onClick={() =>
                  appendLesson({
                    title: "",
                    duration: "",
                    level: "beginner",
                    videoUrl: "",
                  })
                }
                className="text-sm font-semibold text-[#004f52] hover:text-[#003d40] flex items-center gap-1 rounded bg-[#f0f4f4] px-3 py-1.5 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Lesson
              </button>
            </div>

            <div className="space-y-4">
              {lessonFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-5 bg-white border border-[#d6dddd] rounded-[10px] relative group shadow-sm shadow-[#0a2325]/5"
                >
                  <div className="absolute left-0 top-0 h-full w-[4px] bg-[#004f52] rounded-l-[10px] opacity-20 group-hover:opacity-100 transition" />

                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-[14px] font-semibold text-[#1a2326] flex items-center gap-2">
                      Lesson {index + 1}
                    </h4>
                    {lessonFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLesson(index)}
                        className="p-1.5 text-red-500 bg-red-50 rounded hover:bg-red-100 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-12 mr-2 ml-2">
                    <div className="md:col-span-12">
                      <label className="block">
                        <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                          Lesson Title <span className="text-red-500">*</span>
                        </span>
                        <input
                          {...register(`lessons.${index}.title` as const, {
                            required: true,
                          })}
                          className="w-full rounded-md border border-[#d6dddd] px-3 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52]"
                          placeholder="e.g. Introduction to HTML"
                        />
                      </label>
                    </div>

                    <div className="md:col-span-4">
                      <label className="block">
                        <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                          Duration (mins){" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <input
                          type="number"
                          {...register(`lessons.${index}.duration` as const, {
                            required: true,
                          })}
                          className="w-full rounded-md border border-[#d6dddd] px-3 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52]"
                          placeholder="15"
                        />
                      </label>
                    </div>

                    <div className="md:col-span-4">
                      <label className="block">
                        <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                          Skill Level <span className="text-red-500">*</span>
                        </span>
                        <select
                          {...register(`lessons.${index}.level` as const, {
                            required: true,
                          })}
                          className="w-full rounded-md border border-[#d6dddd] px-3 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52] bg-white cursor-pointer"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </label>
                    </div>

                    <div className="md:col-span-12">
                      <label className="block">
                        <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                          Video URL <span className="text-red-500">*</span>
                        </span>
                        <input
                          type="url"
                          {...register(`lessons.${index}.videoUrl` as const, {
                            required: true,
                          })}
                          className="w-full rounded-md border border-[#d6dddd] px-3 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52]"
                          placeholder="https://example.com/videos/lesson1.mp4"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-[#e6ebeb] pt-6 pb-2 flex justify-end gap-3 items-center z-20">
            <div className="flex items-center text-xs text-[#7a99b8] mr-auto">
              <Info className="h-4 w-4 mr-1.5" /> Required fields marked with *
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-[8px] border border-[#d6dddd] px-6 py-2.5 text-[14px] font-semibold text-[#5b6e70] transition hover:bg-[#f8fbfb] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-w-[140px] items-center justify-center rounded-[8px] bg-[#004f52] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#003d40] shadow-md shadow-[#004f52]/20 disabled:opacity-70 cursor-pointer"
            >
              {isPending ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Save Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
