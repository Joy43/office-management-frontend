/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Swal from "sweetalert2";
import { useCreateBranchMutation, useUpdateBranchMutation, type IBranch } from "@/redux/features/user-admin/branchApi";
import { toast } from "react-toastify";


interface BranchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IBranch | null;
}

export const BranchDialog = ({
  isOpen,
  onClose,
  initialData,
}: BranchDialogProps) => {
  const [formData, setFormData] = useState({
    branchName: "",
    subdomain: "",
    branchEmail: "",
    staffCount: "0",
  });

  const [createBranch, { isLoading: isCreating }] = useCreateBranchMutation();
  const [updateBranch, { isLoading: isUpdating }] = useUpdateBranchMutation();

  useEffect(() => {
    if (initialData) {
      setFormData({
        branchName: initialData.branchName,
        subdomain: initialData.subdomain,
        branchEmail: initialData.branchEmail,
        staffCount: initialData.staffCount,
      });
    } else {
      setFormData({
        branchName: "",
        subdomain: "",
        branchEmail: "",
        staffCount: "0",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await updateBranch({ id: initialData.id, body: formData }).unwrap();
      } else {
        await createBranch(formData).unwrap();
      }

      onClose();
     const  text= `Branch has been ${initialData ? "updated" : "created"} successfully.`
     toast(text)
    } catch (error: any) {
      toast.error(
        "Error!",
        error?.data?.message || "Something went wrong",
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-2xl">
        <div className="p-6 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {initialData ? "Edit Branch" : "Add Branch"}
            </DialogTitle>
            <p className="text-sm text-slate-500">
              Please fill out the branch information
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <InputField
            label="Branch Name"
            value={formData.branchName}
            onChange={(v: any) => setFormData({ ...formData, branchName: v })}
            placeholder="e.g. New York Branch"
          />
          <InputField
            label="Subdomain"
            value={formData.subdomain}
            onChange={(v: any) => setFormData({ ...formData, subdomain: v })}
            placeholder="e.g. new-york"
          />
          <InputField
            label="Branch Email"
            type="email"
            value={formData.branchEmail}
            onChange={(v: any) => setFormData({ ...formData, branchEmail: v })}
            placeholder="branch@company.com"
          />
          <InputField
            label="Staff Count"
            type="number"
            value={formData.staffCount}
            onChange={(v: any) => setFormData({ ...formData, staffCount: v })}
            placeholder="50"
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 px-8"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="h-11 px-8 bg-[#8C23CC] hover:bg-[#761eb0] text-white"
            >
              {isCreating || isUpdating
                ? "Processing..."
                : initialData
                  ? "Update Branch"
                  : "Create Branch"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-slate-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 border-slate-200 focus-visible:ring-[#8C23CC]"
      required
    />
  </div>
);
