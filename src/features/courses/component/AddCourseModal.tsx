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
  category: string;
  difficulty: string;
  instructorName: string;
  instructorBio: string;
  durationHours: string;
  estimatedWeeks: string;
  lessons: {
    title: string;
    videoUrl: string;
  }[];
};

export function AddCourseModal({ onClose }: AddCourseModalProps) {
  const { mutate: createCourseSubmit, isPending } = useCreateCourse();
  const [file, setFile] = useState<File | null>(null);
  const [instructorFile, setInstructorFile] = useState<File | null>(null);

  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: "",
      category: "Beginner Courses",
      difficulty: "Beginner",
      instructorName: "",
      instructorBio: "",
      durationHours: "",
      estimatedWeeks: "",
      lessons: [{ title: "", videoUrl: "" }],
    },
  });

  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({ control, name: "lessons" });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data Object:", data);
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.category) formData.append("category", data.category);
    if (data.difficulty) formData.append("difficulty", data.difficulty);
    if (data.instructorName)
      formData.append("instructorName", data.instructorName);
    if (data.instructorBio)
      formData.append("instructorBio", data.instructorBio);
    if (data.durationHours)
      formData.append("durationHours", data.durationHours);
    if (data.estimatedWeeks)
      formData.append("estimatedWeeks", data.estimatedWeeks);

    data.lessons.forEach((lesson, idx) => {
      if (lesson.title.trim()) {
        formData.append(`lessons[${idx}][title]`, lesson.title.trim());
        formData.append(`lessons[${idx}][videoUrl]`, lesson.videoUrl.trim());
      }
    });

    if (file) {
      formData.append("image", file);
    }
    if (instructorFile) {
      formData.append("instructorImage", instructorFile);
    }

    // Log FormData entries
    console.log("FormData Entries:");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

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
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-[#1a2326] mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#004f52]/10 text-[12px] text-[#004f52]">
                  1
                </span>
                Course Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                      Course Title <span className="text-red-500">*</span>
                    </span>
                    <input
                      {...register("title", { required: true })}
                      className="w-full rounded-lg border border-[#d6dddd] px-4 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52]"
                      placeholder="e.g. Web Development Bootcamp"
                    />
                  </label>
                </div>

                <div>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                      Category <span className="text-red-500">*</span>
                    </span>
                    <select
                      {...register("category", { required: true })}
                      className="w-full rounded-lg border border-[#d6dddd] px-4 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52] bg-white"
                    >
                      <option value="Beginner Courses">Beginner Courses</option>
                      <option value="Professional Development Courses">
                        Professional Development Courses
                      </option>
                      <option value="Business Courses">Business Courses</option>
                      <option value="Educational Courses">
                        Educational Courses
                      </option>
                      <option value="Insight Courses">Insight Courses</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                      Difficulty Level <span className="text-red-500">*</span>
                    </span>
                    <select
                      {...register("difficulty", { required: true })}
                      className="w-full rounded-lg border border-[#d6dddd] px-4 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52] bg-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                      Duration (Hours) <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="number"
                      {...register("durationHours", { required: true })}
                      className="w-full rounded-lg border border-[#d6dddd] px-4 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52]"
                      placeholder="e.g. 40"
                    />
                  </label>
                </div>

                <div>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                      Estimated Weeks <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="number"
                      {...register("estimatedWeeks", { required: true })}
                      className="w-full rounded-lg border border-[#d6dddd] px-4 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52]"
                      placeholder="e.g. 8"
                    />
                  </label>
                </div>

                <div className="md:col-span-2">
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
                        <div className="relative h-40 w-full max-w-[300px]">
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
              </div>
            </div>

            <div className="border-t border-[#e6ebeb] pt-8">
              <h3 className="text-lg font-semibold text-[#1a2326] mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#004f52]/10 text-[12px] text-[#004f52]">
                  2
                </span>
                Instructor Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-4">
                    <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                      Instructor Full Name{" "}
                      <span className="text-red-500">*</span>
                    </span>
                    <input
                      {...register("instructorName", { required: true })}
                      className="w-full rounded-lg border border-[#d6dddd] px-4 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52]"
                      placeholder="John Doe"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                      Instructor Bio <span className="text-red-500">*</span>
                    </span>
                    <textarea
                      {...register("instructorBio", { required: true })}
                      rows={4}
                      className="w-full rounded-lg border border-[#d6dddd] px-4 py-2 text-sm focus:border-[#004f52] focus:outline-none focus:ring-1 focus:ring-[#004f52] resize-none"
                      placeholder="Write a brief bio about the instructor..."
                    />
                  </label>
                </div>

                <div>
                  <span className="mb-1 block text-sm font-medium text-[#4a5559]">
                    Instructor Image <span className="text-red-500">*</span>
                  </span>
                  <div className="mt-1 flex justify-center rounded-lg border border-dashed border-[#8db3b5] px-6 py-6 hover:bg-[#f8fbfb] transition cursor-pointer relative bg-white overflow-hidden h-[218px]">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={(e) =>
                        setInstructorFile(e.target.files?.[0] || null)
                      }
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                    />
                    {instructorFile ? (
                      <div className="relative h-full w-full max-w-[160px]">
                        <Image
                          src={URL.createObjectURL(instructorFile)}
                          alt="Instructor Preview"
                          fill
                          className="object-cover rounded-full border-2 border-[#004f52]/20"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition rounded-full flex items-center justify-center text-white text-[10px] font-medium">
                          Change Image
                        </div>
                      </div>
                    ) : (
                      <div className="text-center flex flex-col items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-[#f0f4f4] flex items-center justify-center mb-3">
                          <UploadCloud className="h-8 w-8 text-[#004f52]" />
                        </div>
                        <span className="text-sm font-semibold text-[#004f52]">
                          Upload Photo
                        </span>
                        <p className="text-[12px] text-[#7a99b8]">
                          Click or drag
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e6ebeb] pt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1a2326] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#004f52]/10 text-[12px] text-[#004f52]">
                  3
                </span>
                Course Curriculum (Lessons)
              </h3>
              <button
                type="button"
                onClick={() =>
                  appendLesson({
                    title: "",
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

                    {/* Duration and Skill Level removed as requested */}

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
