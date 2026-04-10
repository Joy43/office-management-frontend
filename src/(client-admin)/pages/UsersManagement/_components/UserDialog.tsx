/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
// import Swal from "sweetalert2";
import { useCreateUserMutation, useGetAllBranchesQuery, useUpdateUserMutation, type IUser } from "@/redux/features/user-admin/branchApi";
import { toast } from "react-toastify";


interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IUser | null;
}

export const UserDialog = ({
  isOpen,
  onClose,
  initialData,
}: UserDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "TRAINER",
    branchId: "",
  });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { data: branchData } = useGetAllBranchesQuery();

  const branches = branchData?.data?.branches || [];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        role: initialData.role,
        branchId: initialData.branchId,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "TRAINER",
        branchId: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await updateUser({ id: initialData.id, body: formData }).unwrap();
      } else {
        await createUser(formData).unwrap();
      }

      onClose();
      const  text = `User has been ${initialData ? "updated" : "created"} successfully.`
      toast(text)
    } catch (err: any) {
     toast.error("Error!", err?.data?.message || "Operation failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-2xl">
        <div className="p-6 border-b relative">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {initialData ? "Edit User" : "Add User"}
            </DialogTitle>
            <p className="text-sm text-slate-500">Enter user details below</p>
          </DialogHeader>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Name *</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Full Name"
              required
              className="h-11 border-slate-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="email@domain.com"
              required
              className="h-11 border-slate-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Phone Number *
            </label>
            <Input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+1 234..."
              required
              className="h-11 border-slate-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Role *</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-[#8C23CC]"
            >
              <option value="MANAGER">Manager</option>
              <option value="TAINER">Trainer</option>
              <option value="EXECUTIVE">Executive</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Select Branch *
            </label>
            <select
              required
              value={formData.branchId}
              onChange={(e) =>
                setFormData({ ...formData, branchId: e.target.value })
              }
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-[#8C23CC]"
            >
              <option value="">Select a branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.branchName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 px-8 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="h-11 px-8 bg-[#8C23CC] hover:bg-[#761eb0] text-white cursor-pointer font-bold"
            >
              {isCreating || isUpdating
                ? "Saving..."
                : initialData
                  ? "Update User"
                  : "Add User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
