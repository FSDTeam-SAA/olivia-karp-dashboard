"use client";

import { useEffect, useReducer } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCreateMedia, useUpdateMedia } from "../hooks/useMedia";
import { Media } from "../types/content.types";
import RichTextEditor from "./RichTextEditor";

interface MediaPostModalProps {
  open: boolean;
  onClose: () => void;
  editData?: Media | null;
}

interface FormState {
  title: string;
  mediaType: string;
  sourceType: string;
  contentUrl: string;
  description: string;
  isPublished: boolean;
  isFeatured: boolean;
}

const initialState: FormState = {
  title: "",
  mediaType: "expert-interview",
  sourceType: "URL",
  contentUrl: "",
  description: "",
  isPublished: true,
  isFeatured: false,
};

type FormAction = {
  type: "SET_FORM" | "UPDATE_FIELD";
  payload: Partial<FormState>;
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FORM":
      return { ...state, ...action.payload };
    case "UPDATE_FIELD":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default function MediaPostModal({
  open,
  onClose,
  editData,
}: MediaPostModalProps) {
  const isEdit = !!editData;
  const createMutation = useCreateMedia();
  const updateMutation = useUpdateMedia();

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const {
    title,
    mediaType,
    sourceType,
    contentUrl,
    description,
    isPublished,
    isFeatured,
  } = formState;

  useEffect(() => {
    if (editData) {
      dispatch({
        type: "SET_FORM",
        payload: {
          title: editData.title || "",
          mediaType: editData.mediaType || "expert-interview",
          sourceType: editData.sourceType || "URL",
          contentUrl: editData.contentUrl || "",
          description: editData.description || "",
          isPublished: editData.isPublished ?? true,
          isFeatured: editData.isFeatured ?? false,
        },
      });
    } else {
      dispatch({
        type: "SET_FORM",
        payload: initialState,
      });
    }
  }, [editData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      mediaType,
      sourceType,
      contentUrl,
      description,
      isPublished,
      isFeatured,
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          mediaId: editData._id,
          data: payload,
        });
        toast.success("Media updated successfully");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Media created successfully");
      }
      onClose();
    } catch {
      toast.error(isEdit ? "Failed to update media" : "Failed to create media");
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#2c3135]">
            {isEdit ? "Edit Media Post" : "Create Media Post"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  payload: { title: e.target.value },
                })
              }
              placeholder="e.g. Future of Green Energy in Canada"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Media Type</Label>
              <select
                value={mediaType}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    payload: { mediaType: e.target.value },
                  })
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
              >
                <option value="expert-interview">Expert Interview</option>
                <option value="video">Video</option>
                <option value="podcast">Podcast</option>
                <option value="event-recording">Event Recording</option>
                <option value="insight">Insight</option>
                <option value="blog">Blog</option>
                <option value="resource">Resource</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Source Type</Label>
              <select
                value={sourceType}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    payload: { sourceType: e.target.value },
                  })
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
              >
                <option value="URL">URL</option>
                {/* <option value="upload">Upload</option> */}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Content URL</Label>
            <Input
              value={contentUrl}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  payload: { contentUrl: e.target.value },
                })
              }
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label>Description</Label>
            <RichTextEditor
              content={description}
              onChange={(value) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  payload: { description: value },
                })
              }
              placeholder="Describe this media content..."
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    payload: { isPublished: e.target.checked },
                  })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    payload: { isFeatured: e.target.checked },
                  })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium">Featured</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#004f52] hover:bg-[#003d40] text-white rounded-lg"
            >
              {isLoading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                  ? "Update Media"
                  : "Create Media"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
