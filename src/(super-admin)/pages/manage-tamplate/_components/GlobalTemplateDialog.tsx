/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useCreateGlobalTemplateMutation, useUpdateGlobalTemplateMutation } from "@/redux/features/admin/globalTemplateApi";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null;
}

const GlobalTemplateDialog = ({ isOpen, onClose, initialData }: Props) => {
  const [createTemplate, { isLoading: isCreating }] =
    useCreateGlobalTemplateMutation();
  const [updateTemplate, { isLoading: isUpdating }] =
    useUpdateGlobalTemplateMutation();

  const [formData, setFormData] = useState({
    templateName: "",
    type: "survey",
    timeLimit: "15",
    isGlobal: true,
    content: {
      title: "Feedback Form",
      fields: [
        { label: "Name", type: "text", required: true },
        { label: "Rating", type: "number", required: true },
      ],
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        templateName: initialData.templateName || "",
        type: initialData.type || "survey",
        timeLimit: initialData.timeLimit || "15",
        isGlobal: true,
        content: initialData.content || { title: "", fields: [] },
      });
    } else {
      setFormData({
        templateName: "",
        type: "survey",
        timeLimit: "15",
        isGlobal: true,
        content: {
          title: "Feedback Form",
          fields: [
            { label: "Name", type: "text", required: true },
            { label: "Rating", type: "number", required: true },
          ],
        },
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await updateTemplate({ id: initialData.id, data: formData }).unwrap();
        toast.success("Template updated successfully!");
      } else {
        await createTemplate(formData).unwrap();
        toast.success("Template created successfully!");
      }
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {initialData ? "Edit Template" : "Create New Global Template"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label>Template Name *</Label>
            <Input
              value={formData.templateName}
              onChange={(e) =>
                setFormData({ ...formData, templateName: e.target.value })
              }
              placeholder="Enter template name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type *</Label>
              <Input
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                placeholder="survey"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Time Limit (Mins) *</Label>
              <Input
                type="number"
                value={formData.timeLimit}
                onChange={(e) =>
                  setFormData({ ...formData, timeLimit: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Form Title</Label>
            <Input
              value={formData.content.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, title: e.target.value },
                })
              }
              placeholder="Feedback Form"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-[#8A2BE2] hover:bg-[#7A26C1] text-white"
            >
              {isCreating || isUpdating
                ? "Saving..."
                : initialData
                  ? "Update"
                  : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalTemplateDialog;
